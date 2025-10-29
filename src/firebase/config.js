import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA4Ou3gqtpoPA2BpcWcXehMqBEmujiJCUc',
    authDomain: 'barjsx-ab894.firebaseapp.com',
    projectId: 'barjsx-ab894',
    storageBucket: 'barjsx-ab894.firebasestorage.app',
    messagingSenderId: '451018890822',
    appId: '1:451018890822:web:8b3c8ce1d927ea46343447',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;