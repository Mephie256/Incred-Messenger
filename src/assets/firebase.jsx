import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDWfmbTdaBEQDWvXJ_sbVqLL0YsRIpypQc",
    authDomain: "incred-messenger-clone.firebaseapp.com",
    projectId: "incred-messenger-clone",
    storageBucket: "incred-messenger-clone.appspot.com",
    messagingSenderId: "518152507407",
    appId: "1:518152507407:web:4871babe15c84fabc0137a",
    measurementId: "G-ZJTSLWJEBE"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;

