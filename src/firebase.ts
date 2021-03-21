import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyDH2rnL0Mi-IYN-Zmb952ZorrffOUf8hUM",
    authDomain: "whatsapp-clone-73c9f.firebaseapp.com",
    projectId: "whatsapp-clone-73c9f",
    storageBucket: "whatsapp-clone-73c9f.appspot.com",
    messagingSenderId: "974401174901",
    appId: "1:974401174901:web:531dd767b80f4ab418673c",
    measurementId: "G-G00ZR2E4R4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export const auth = firebaseApp.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export default db;
