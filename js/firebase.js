import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCS16jl0FbBKnDJcWYT-LR1BlSWX4ZjXCc",
  authDomain: "scheduling-system-b58f1.firebaseapp.com",
  databaseURL: "https://scheduling-system-b58f1-default-rtdb.firebaseio.com",
  projectId: "scheduling-system-b58f1",
  storageBucket: "scheduling-system-b58f1.firebasestorage.app",
  messagingSenderId: "533371693788",
  appId: "1:533371693788:web:acdb55279021266a476219",
  measurementId: "G-1636D1JZS0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
