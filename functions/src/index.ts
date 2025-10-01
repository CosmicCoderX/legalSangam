import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as ZegoUIKitPrebuilt from '@zegocloud/zego-uikit-prebuilt';

admin.initializeApp();

const razorpay = new Razorpay({
  key_id: (functions.config().razorpay || {}).key_id || 'rzp_test_RNGxUuJ6Fjiq5s', // Use test key for dev
  key_secret: (functions.config().razorpay || {}).key_secret || 'z6hntHKX3W15ulu9R2pfVFWH', // Use test secret for dev
});

const db = admin.database();

// Create Razorpay order (server-side for security)
export const createOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { amount, currency = 'INR', receipt, buyerId, sellerId, notes } = data;

  if (!amount || amount <= 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid amount');
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects paise
      currency,
      receipt,
      payment_capture: true, // Auto capture
      notes: { buyerId, sellerId, ...notes },
    }) as any;

    // Save to Realtime Database
    await db.ref('escrowTransactions').push({
      orderId: order.id,
      buyerId,
      sellerId,
      amount,
      currency,
      status: 'created',
      createdAt: admin.database.ServerValue.TIMESTAMP,
      lastUpdate: admin.database.ServerValue.TIMESTAMP,
      payment: order,
    });

    return { orderId: order.id, amount: order.amount, currency: order.currency };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new functions.https.HttpsError('internal', 'Failed to create order');
  }
});

// Razorpay webhook handler
export const razorpayWebhook = functions.https.onRequest(async (req, res) => {
  const secret = functions.config().razorpay.webhook_secret || 'your_webhook_secret'; // Set in Firebase config

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body) + req.headers['x-razorpay-signature'])
    .digest('hex');

  if (expectedSignature !== req.headers['x-razorpay-signature']) {
    console.error('Invalid signature');
    res.status(400).send('Invalid signature');
    return;
  }

  const event = req.body.event;
  const paymentEntity = req.body.payload.payment.entity;

  try {
    const escrowRef = db.ref('escrowTransactions').orderByChild('orderId').equalTo(paymentEntity.order_id);
    const snapshot = await escrowRef.once('value');
    if (!snapshot.exists()) {
      console.error('Escrow not found for order:', paymentEntity.order_id);
      res.status(404).send('Escrow not found');
      return;
    }

    const escrowKey = Object.keys(snapshot.val())[0];
    const escrowData = snapshot.val()[escrowKey];

    let newStatus = escrowData.status;
    if (event === 'payment.authorized') {
      newStatus = 'authorized';
    } else if (event === 'payment.captured') {
      newStatus = 'captured';
    } else if (event === 'payment.failed') {
      newStatus = 'failed';
    }

    await db.ref(`escrowTransactions/${escrowKey}`).update({
      status: newStatus,
      lastUpdate: admin.database.ServerValue.TIMESTAMP,
      payment: paymentEntity,
    });

    console.log(`Escrow ${escrowKey} updated to ${newStatus}`);
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal error');
  }
});

// Capture payment (after consultation)
export const capturePayment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { orderId } = data;

  try {
    const escrowRef = db.ref('escrowTransactions').orderByChild('orderId').equalTo(orderId);
    const snapshot = await escrowRef.once('value');
    if (!snapshot.exists()) {
      throw new functions.https.HttpsError('not-found', 'Escrow not found');
    }

    const escrowKey = Object.keys(snapshot.val())[0];
    const escrowData = snapshot.val()[escrowKey];

    if (escrowData.buyerId !== context.auth.uid && escrowData.sellerId !== context.auth.uid) {
      throw new functions.https.HttpsError('permission-denied', 'Unauthorized');
    }

    if (escrowData.status !== 'authorized') {
      throw new functions.https.HttpsError('failed-precondition', 'Payment not authorized');
    }

    const capture = await razorpay.payments.capture(orderId, escrowData.amount * 100, 'INR');

    await db.ref(`escrowTransactions/${escrowKey}`).update({
      status: 'captured',
      lastUpdate: admin.database.ServerValue.TIMESTAMP,
      milestones: [
        ...escrowData.milestones || [],
        { description: 'Funds Released', amount: escrowData.amount, status: 'completed' }
      ],
    });

    return { success: true, capture };
  } catch (error) {
    console.error('Capture error:', error);
    throw new functions.https.HttpsError('internal', 'Failed to capture payment');
  }
});

// Get payment info for user
export const getPaymentInfo = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { orderId } = data;

  try {
    const queryRef = db.ref('escrowTransactions');
    let query: admin.database.Query;
    if (orderId) {
      query = queryRef.orderByChild('orderId').equalTo(orderId);
    } else {
      query = queryRef.orderByChild('buyerId').equalTo(context.auth!.uid);
    }

    const snapshot = await query.once('value');
    if (!snapshot.exists()) {
      return { payments: [] };
    }

    const payments: any[] = [];
    snapshot.forEach((childSnapshot) => {
      const payment = childSnapshot.val();
      // Only return payments for the authenticated user
      if (payment.buyerId === context.auth!.uid || payment.sellerId === context.auth!.uid) {
        payments.push({
          id: childSnapshot.key,
          ...payment,
        });
      }
    });

    return { payments };
  } catch (error) {
    console.error('Error getting payment info:', error);
    throw new functions.https.HttpsError('internal', 'Failed to get payment info');
  }
});

// Refund payment
export const refundPayment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { paymentId, amount } = data;

  try {
    const refund = await razorpay.payments.refund(paymentId, { amount: amount * 100 });

    // Update escrow status
    const escrowRef = db.ref('escrowTransactions').orderByChild('payment/id').equalTo(paymentId);
    const snapshot = await escrowRef.once('value');
    if (snapshot.exists()) {
      const escrowKey = Object.keys(snapshot.val())[0];
      await db.ref(`escrowTransactions/${escrowKey}`).update({
        status: 'refunded',
        lastUpdate: admin.database.ServerValue.TIMESTAMP,
        milestones: [
          ...snapshot.val()[escrowKey].milestones || [],
          { description: 'Refund Processed', amount, status: 'completed' }
        ],
      });
    }

    return { success: true, refund };
  } catch (error) {
    console.error('Refund error:', error);
    throw new functions.https.HttpsError('internal', 'Failed to process refund');
  }
});

// Chatbot using Gemini API
export const chatbot = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { query, legalArea } = data;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Query is required');
  }

  try {
    const genAI = new GoogleGenerativeAI(functions.config().gemini?.api_key || process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const systemPrompt = `You are AskCounsel, a helpful AI legal assistant providing preliminary guidance based on Indian laws. Always emphasize that this is not a substitute for professional legal advice. Be accurate, concise, and helpful. If the query is outside your knowledge or requires specific legal counsel, recommend consulting a qualified lawyer from LegalSangam.`;

    const userPrompt = legalArea ? `Legal Area: ${legalArea}\nQuestion: ${query}` : `Question: ${query}`;

    const prompt = `${systemPrompt}\n\n${userPrompt}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text().trim();

    if (!response) {
      throw new Error('No response from Gemini');
    }

    return { response };
  } catch (error) {
    console.error('Chatbot error:', error);
    throw new functions.https.HttpsError('internal', 'Failed to process query');
  }
});

// Generate Zego token server-side for security
export const generateZegoToken = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { roomID, userID, userName } = data;

  if (!roomID || !userID || !userName) {
    throw new functions.https.HttpsError('invalid-argument', 'roomID, userID, and userName are required');
  }

  try {
    const appID = functions.config().zego?.app_id || 642713127;
    const serverSecret = functions.config().zego?.server_secret || '8760851a8177d375dd756eb1e789f63c';

    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    return { token };
  } catch (error) {
    console.error('Zego token generation error:', error);
    throw new functions.https.HttpsError('internal', 'Failed to generate token');
  }
});
