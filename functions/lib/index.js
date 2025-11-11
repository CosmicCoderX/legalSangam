"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayment = exports.getPaymentInfo = exports.capturePayment = exports.razorpayWebhook = exports.createOrder = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const crypto = __importStar(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
admin.initializeApp();
const razorpay = new razorpay_1.default({
    key_id: (functions.config().razorpay || {}).key_id || 'rzp_test_RNGxUuJ6Fjiq5s', // Use test key for dev
    key_secret: (functions.config().razorpay || {}).key_secret || 'z6hntHKX3W15ulu9R2pfVFWH', // Use test secret for dev
});
const db = admin.database();
// Create Razorpay order (server-side for security)
exports.createOrder = functions.https.onCall(async (data, context) => {
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
            notes: Object.assign({ buyerId, sellerId }, notes),
        });
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
    }
    catch (error) {
        console.error('Error creating order:', error);
        throw new functions.https.HttpsError('internal', 'Failed to create order');
    }
});
// Razorpay webhook handler
exports.razorpayWebhook = functions.https.onRequest(async (req, res) => {
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
        }
        else if (event === 'payment.captured') {
            newStatus = 'captured';
        }
        else if (event === 'payment.failed') {
            newStatus = 'failed';
        }
        await db.ref(`escrowTransactions/${escrowKey}`).update({
            status: newStatus,
            lastUpdate: admin.database.ServerValue.TIMESTAMP,
            payment: paymentEntity,
        });
        console.log(`Escrow ${escrowKey} updated to ${newStatus}`);
        res.status(200).send('OK');
    }
    catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Internal error');
    }
});
// Capture payment (after consultation)
exports.capturePayment = functions.https.onCall(async (data, context) => {
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
    }
    catch (error) {
        console.error('Capture error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to capture payment');
    }
});
// Get payment info for user
exports.getPaymentInfo = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    const { orderId } = data;
    try {
        const queryRef = db.ref('escrowTransactions');
        let query;
        if (orderId) {
            query = queryRef.orderByChild('orderId').equalTo(orderId);
        }
        else {
            query = queryRef.orderByChild('buyerId').equalTo(context.auth.uid);
        }
        const snapshot = await query.once('value');
        if (!snapshot.exists()) {
            return { payments: [] };
        }
        const payments = [];
        snapshot.forEach((childSnapshot) => {
            const payment = childSnapshot.val();
            // Only return payments for the authenticated user
            if (payment.buyerId === context.auth.uid || payment.sellerId === context.auth.uid) {
                payments.push(Object.assign({ id: childSnapshot.key }, payment));
            }
        });
        return { payments };
    }
    catch (error) {
        console.error('Error getting payment info:', error);
        throw new functions.https.HttpsError('internal', 'Failed to get payment info');
    }
});
// Refund payment
exports.refundPayment = functions.https.onCall(async (data, context) => {
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
    }
    catch (error) {
        console.error('Refund error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to process refund');
    }
});
//# sourceMappingURL=index.js.map