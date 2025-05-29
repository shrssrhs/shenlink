// app/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAzA1k9kae5n7q4BnRnNGJx55A6zzBoCcg",
  authDomain: "shenlink-cc3bc.firebaseapp.com",
  projectId: "shenlink-cc3bc",
  storageBucket: "shenlink-cc3bc.firebasestorage.app",
  messagingSenderId: "852250486216",
  appId: "1:852250486216:web:c9bd2dd11fe351c9458cfd"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
