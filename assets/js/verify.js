// ===== Import Firebase SDKs =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// ===== Your Firebase configuration =====
const firebaseConfig = {
  apiKey: "AIzaSyDUrJ2-9C7sWc0O9Cq-B500Dhkl_kyWkoU",
  authDomain: "coders-verse.firebaseapp.com",
  databaseURL: "https://coders-verse-default-rtdb.firebaseio.com",
  projectId: "coders-verse",
  storageBucket: "coders-verse.firebasestorage.app",
  messagingSenderId: "1095974201668",
  appId: "1:1095974201668:web:6eed2abebc7e3847200f11"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ===== Select DOM elements =====
const certInput = document.getElementById("certIdInput");
const verifyBtn = document.getElementById("verifyBtn");
const resultDiv = document.getElementById("result");

// ===== Verification logic =====
verifyBtn.addEventListener("click", () => {
  const certId = certInput.value.trim(); // Get user input

  if (certId === "") {
    resultDiv.textContent = "Please enter a Certificate ID";
    resultDiv.style.color = "red";
    return;
  }

  const dbRef = ref(database);
  get(child(dbRef, `Certificate_ID/${certId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Display certificate info
        resultDiv.innerHTML = `
          <p style="color:green;">Certificate Verified ✅</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Internship Title:</strong> ${data.internship_title}</p>
          <p><strong>Issue Date:</strong> ${data.issue_date}</p>
          <p><strong>Status:</strong> ${data.status}</p>
          <img src="${data.Image_url}" alt="Certificate Image" style="max-width:100%; margin-top:10px; border:1px solid #ccc; border-radius:4px;" />
        `;
      } else {
        resultDiv.innerHTML = `<p style="color:red;">Invalid Certificate ❌</p>`;
      }
    })
    .catch((error) => {
      console.error(error);
      resultDiv.textContent = "Error fetching data. Please try again later.";
      resultDiv.style.color = "red";
    });
});
