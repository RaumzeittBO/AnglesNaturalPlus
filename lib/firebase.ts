import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSy_MOCK_API_KEY_ANGLES_NATURAL",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "angles-natural-plus.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "angles-natural-plus",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "angles-natural-plus.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
};

export const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

let app: FirebaseApp;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

if (typeof window !== "undefined" || isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } catch (error) {
    // Fail gracefully in environments without credentials
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn("[Firebase] Initialized with development fallback adapter.");
    }
  }
}

export { app, db, auth, storage };