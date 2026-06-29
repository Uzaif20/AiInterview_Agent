import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "interviewiq-bbaaf.firebaseapp.com",
  projectId: "interviewiq-bbaaf",
  storageBucket: "interviewiq-bbaaf.firebasestorage.app",
  messagingSenderId: "492183258686",
  appId: "1:492183258686:web:37566d600c9fbac083f36f",
  measurementId: "G-723RJS1GPG"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider}