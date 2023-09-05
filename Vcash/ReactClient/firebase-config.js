// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import {FB_API_KEY,FB_AUTH_DOMAIN,FB_DATABASE_URL
 ,FB_PROJECT_ID,FB_STORAGE_BUCKET, FB_MSG_SENDER_ID
,FB_APP_ID,FB_MSUREMENT_ID} from "@env"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DATABASE_URL,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MSG_SENDER_ID,
  appId: FB_APP_ID,
  measurementId: FB_MSUREMENT_ID
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}


export {firebase}
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);