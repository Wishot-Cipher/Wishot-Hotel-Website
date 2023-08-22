// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBr_lGs2R-yF2FKUscW1ebztkwHCg1C628",
  authDomain: "ageless-hotel.firebaseapp.com",
  projectId: "ageless-hotel",
  storageBucket: "ageless-hotel.appspot.com",
  messagingSenderId: "552410082026",
  appId: "1:552410082026:web:58b7a6868d0870838ec593",
  measurementId: "G-791PN48NW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider();

export const database = getFirestore(app)
export const firestore = getStorage(app)
