import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMDRFPgQHuR-k-pcIo9N-zsBxieDT0QTs",
  authDomain: "storage-firebase-app-9cfc0.firebaseapp.com",
  projectId: "storage-firebase-app-9cfc0",
  storageBucket: "storage-firebase-app-9cfc0.appspot.com",
  messagingSenderId: "490757762761",
  appId: "1:490757762761:web:02ce26590b592cfb546718",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, storage, db };
