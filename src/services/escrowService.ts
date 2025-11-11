import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Listen to real-time escrow transactions for a specific client
export const listenToEscrows = (
  clientId: string,
  callback: (escrows: unknown[]) => void
) => {
  const q = query(
    collection(db, "escrowTransactions"),
    where("clientId", "==", clientId),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const escrows = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(escrows);
  });

  return unsubscribe;
};

// Function to add a new escrow transaction
export const createEscrow = async (escrowData: {
  clientId: string;
  providerId: string;
  amount: number;
  status: string;
  milestones?: unknown[];
}) => {
  try {
    const docRef = await addDoc(collection(db, "escrowTransactions"), {
      ...escrowData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Escrow created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating escrow: ", error);
    throw error;
  }
};

// Function to update escrow status (call from Cloud Function or authorized component)
export const updateEscrowStatus = async (
  transactionId: string,
  newStatus: string
) => {
  try {
    const escrowRef = doc(db, "escrowTransactions", transactionId);
    await updateDoc(escrowRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
    console.log(`Escrow ${transactionId} updated to status: ${newStatus}`);
  } catch (error) {
    console.error("Error updating escrow: ", error);
    throw error;
  }
};
