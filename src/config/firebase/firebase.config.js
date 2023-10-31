import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaVnUx1as_7wSIqdTEXKfVLm6IqQeqbIQ",
  authDomain: "free-chat--app.firebaseapp.com",
  projectId: "free-chat--app",
  storageBucket: "free-chat--app.appspot.com",
  messagingSenderId: "813075595608",
  appId: "1:813075595608:web:21605a6043e072f75ae52d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
