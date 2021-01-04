import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import * as config from "./Config";

const firebaseConfig: object = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance: typeof firebase = firebase;
export const authService: firebase.auth.Auth = firebase.auth();
export const dbService: firebase.firestore.Firestore = firebase.firestore();
export const storageService: firebase.storage.Storage = firebase.storage();
