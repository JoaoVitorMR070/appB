// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/functions'; // Importe o módulo de funções

const firebaseConfig = {
  apiKey: "AIzaSyDDffz3FOfOychT0I0oGLA80giIYDINi5g",
  authDomain: "belezaexpress-a248a.firebaseapp.com",
  databaseURL: "https://belezaexpress-a248a-default-rtdb.firebaseio.com",
  projectId: "belezaexpress-a248a",
  storageBucket: "belezaexpress-a248a.appspot.com",
  messagingSenderId: "497969415020",
  appId: "1:497969415020:web:2097fc5e39aeb69643e949"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase
