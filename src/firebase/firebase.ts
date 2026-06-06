import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC5HVVNvGrkgpFVqk27Fe3_uh5Jy7kYz7s",
    authDomain: "accessra-bfe6c.firebaseapp.com",
    projectId: "accessra-bfe6c",
    storageBucket: "accessra-bfe6c.firebasestorage.app",
    messagingSenderId: "918645087862",
    appId: "1:918645087862:web:d9ec1246d979161fcc0957",
    measurementId: "G-FLE0DXD6NJ"
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;