import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCx7kLbqN4wzxFu4TeGdrgwuyAh3DjZFqQ",
  authDomain: "pascal-login-9b82c.firebaseapp.com",
  projectId: "pascal-login-9b82c",
  storageBucket: "pascal-login-9b82c.firebasestorage.app",
  messagingSenderId: "792775672964",
  appId: "1:792775672964:web:e17f530a76c1ffc54e2ed1",
  measurementId: "G-QLY0L6HCG2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("year").textContent = new Date().getFullYear();

const btnSignup = document.getElementById("btnSignup");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

btnSignup.addEventListener("click", async () => {
  const email = document.getElementById("suEmail").value;
  const password = document.getElementById("suPass").value;
  const msg = document.getElementById("suMsg");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      bestScore: 0
    });

    msg.textContent = "Account created successfully!";
  } catch (error) {
    msg.textContent = error.message;
  }
});

btnLogin.addEventListener("click", async () => {
  const email = document.getElementById("liEmail").value;
  const password = document.getElementById("liPass").value;
  const msg = document.getElementById("liMsg");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    msg.textContent = "Logged in successfully!";
  } catch (error) {
    msg.textContent = error.message;
  }
});

btnLogout.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, async (user) => {
  const who = document.getElementById("who");
  const bestScoreUi = document.getElementById("bestScoreUi");

  if (user) {
    who.textContent = user.email;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      bestScoreUi.textContent = userSnap.data().bestScore || 0;
    }
  } else {
    who.textContent = "Guest";
    bestScoreUi.textContent = "0";
  }
});