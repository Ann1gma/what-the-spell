import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { CollectionReference, collection, getFirestore } from "firebase/firestore";
import { Character, NewCharacter } from "../types/Character.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth Instance
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

// Get Firestore Instance
export const db = getFirestore(app);

// Collection reference
export const characterCol = collection(db, "characters") as CollectionReference<Character>;
export const newCharacterCol = collection(db, "characters") as CollectionReference<NewCharacter>;
