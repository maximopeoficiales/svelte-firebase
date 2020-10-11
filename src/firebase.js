import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD0V6z-iAKpdcgEyFmOnah9hqvy6r_Iaac",
  authDomain: "svelte-crud-2a06a.firebaseapp.com",
  databaseURL: "https://svelte-crud-2a06a.firebaseio.com",
  projectId: "svelte-crud-2a06a",
  storageBucket: "svelte-crud-2a06a.appspot.com",
  messagingSenderId: "922565710537",
  appId: "1:922565710537:web:4c7ed2428dfe5d5d10f318",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
