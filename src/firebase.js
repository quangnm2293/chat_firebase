// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD4sySK4FoJKVEGJvJSfXnDSLQqbx3MHYw',
	authDomain: 'chat-a9f44.firebaseapp.com',
	projectId: 'chat-a9f44',
	storageBucket: 'chat-a9f44.appspot.com',
	messagingSenderId: '222711337154',
	appId: '1:222711337154:web:0ddaa2bbf0898d528d6b5b',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
