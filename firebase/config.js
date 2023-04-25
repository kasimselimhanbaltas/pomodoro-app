import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6eHpcFWT0au8RgZmJmGfxBASWBetyiHY",
  authDomain: "pomodoro-c3e2e.firebaseapp.com",
  projectId: "pomodoro-c3e2e",
  storageBucket: "pomodoro-c3e2e.appspot.com",
  messagingSenderId: "1074935073713",
  appId: "1:1074935073713:web:d944ba0ed439b834b38b90",
  measurementId: "G-F08M1CDGBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
