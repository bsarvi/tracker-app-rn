import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6ZZui5jIP-MOPq5Yh2PueEn4w-R97bDw",
  authDomain: "tracker-dev-17385.firebaseapp.com",
  projectId: "tracker-dev-17385",
  storageBucket: "tracker-dev-17385.appspot.com",
  messagingSenderId: "218362449848",
  appId: "1:218362449848:web:7e3f7daaedacdc09c1894d",
};

export const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
