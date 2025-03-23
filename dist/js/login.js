// document.getElementById("loginForm").addEventListener("submit", (e) => {
//   e.preventDefault();
// });

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// import {
//   getFirestore,
//   doc,
//   getDoc,
// } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// import firebaseConfig from "./firebase.js";

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// function login() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       sessionStorage.setItem("userID", user.uid);
//     })
//     .then(() => {
//       const docRef = doc(db, "users", sessionStorage.getItem("userID"));
//       getDoc(docRef)
//         .then((doc) => {
//           sessionStorage.setItem("userRole", doc.data().role);
//         })
//         .then(() => {
//           location.replace("map.html");
//         });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(errorCode);
//     });
// }

// const loginBtn = document.getElementById("loginBtn");

// loginBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("login");
//   login();
// });
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import firebaseConfig from "./firebase.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user.uid);
      sessionStorage.setItem("userID", user.uid);
      return user.uid;  // Return UID for next step
    })
    .then((uid) => {
      const docRef = doc(db, "users", uid);
      console.log("Fetching Firestore document for:", uid);
      return getDoc(docRef);
    })
    .then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        sessionStorage.setItem("userRole", docSnap.data().role);
        window.location.href = "map.html";  // Ensure redirection
      } else {
        console.error("User document not found in Firestore.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
}

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Login button clicked");
  login();
});
