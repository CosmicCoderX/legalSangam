import { createEscrow } from './escrowService';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: new (options: unknown) => {
      open: () => void;
    };
  }
}

// Note: Order creation moved to Firebase Cloud Function for security

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export interface PaymentData {
  amount: number; // in rupees
  currency: string;
  receipt: string;
  buyerId: string;
  sellerId: string;
  notes?: Record<string, string>;
}

export interface OrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export const createRazorpayOrder = async (paymentData: PaymentData): Promise<OrderResponse> => {
  const createOrder = httpsCallable(functions, 'createOrder');
  const result = await createOrder(paymentData);
  return result.data as OrderResponse;
};

export const initiateRazorpayPayment = (
  order: OrderResponse,
  userDetails: {
    name: string;
    email: string;
    contact: string;
  },
  onSuccess: (response: unknown) => void,
  onFailure: (error: unknown) => void
) => {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'LegalSangam',
    description: 'Consultation Payment',
    order_id: order.orderId,
    prefill: {
      name: userDetails.name,
      email: userDetails.email,
      contact: userDetails.contact,
    },
    theme: {
      color: '#2563eb',
    },
    handler: onSuccess,
    modal: {
      ondismiss: onFailure,
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

export const handlePaymentSuccess = async (
  response: unknown,
  bookingData: unknown,
  userId: string
) => {
  // Create escrow after successful payment
  const data = bookingData as { lawyer?: { id: string }; total: number };
  const escrowData = {
    clientId: userId,
    providerId: data.lawyer?.id || 'lawyer_id',
    amount: data.total,
    status: 'pending',
    milestones: [
      {
        description: 'Consultation Payment',
        amount: data.total,
        status: 'completed',
      },
    ],
  };

  await createEscrow(escrowData);

  // You can also verify payment on server-side here
  console.log('Payment successful:', response);
};

export interface PaymentInfo {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: number;
  lastUpdate: number;
  payment: unknown;
  milestones?: unknown[];
}

export const getPaymentInfo = async (orderId?: string): Promise<PaymentInfo[]> => {
  const getPaymentInfoFunc = httpsCallable(functions, 'getPaymentInfo');
  const result = await getPaymentInfoFunc({ orderId });
  const data = result.data as { payments: PaymentInfo[] };
  return data.payments;
};
