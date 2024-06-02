import { initializeApp } from "firebase/app";
import { getDatabase, ref} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArAUz8Scr-jPsdYlkABK4oON3vHEAU9Fs",
    authDomain: "class-project-js.firebaseapp.com",
    databaseURL: "https://class-project-js-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "class-project-js",
    storageBucket: "class-project-js.appspot.com",
    messagingSenderId: "154212509812",
    appId: "1:154212509812:web:3567827ec58c92b3534921"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);
  export const assignmentsRef = ref(db, '/assignments'); 
  

