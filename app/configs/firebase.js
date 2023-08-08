import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported  } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyB_0naDP00CaMJUn10CBYf8iCeoYQhHh38",
  authDomain: "backupcmandifood.firebaseapp.com",
  databaseURL: "https://backupcmandifood-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "backupcmandifood",
  storageBucket: "backupcmandifood.appspot.com",
  messagingSenderId: "138633964711",
  appId: "1:138633964711:web:1e20c5f3af357d37b1bf82",
  measurementId: "G-Y2EFCHFJWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

const auth = getAuth(app);
const db = getFirestore(app);
const timestamp = serverTimestamp();


export { auth, db, timestamp };
