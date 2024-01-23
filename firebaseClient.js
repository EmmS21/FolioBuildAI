import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import getConfig from 'next/config'
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const { publicRuntimeConfig } = getConfig()
const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID,
  } = publicRuntimeConfig;

  const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
  };


const apps = getApps();

if (!apps.length) {
    initializeApp(firebaseConfig);
}
  
export const auth = getAuth();
export const storage = getStorage();
export const db = getDatabase();