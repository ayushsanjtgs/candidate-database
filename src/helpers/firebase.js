import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9nOWP7V1ePg69Dl6_Jao-A_X-6gBs1gg",
  authDomain: "candidate-database-3c3f7.firebaseapp.com",
  projectId: "candidate-database-3c3f7",
  storageBucket: "candidate-database-3c3f7.appspot.com",
  messagingSenderId: "281380498802",
  appId: "1:281380498802:web:72068fd40ce3c5a00a01eb",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { firestore, auth, storage };
