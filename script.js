// SIMPUS - Script.js + Firebase Logging

// Firebase v8 (CDN style)
const firebaseConfig = {
  apiKey: "AIzaSyC3CzIeL1P2fLMaVRF8fXxH4lTWqXAHVJ8",
  authDomain: "mkpfiks.firebaseapp.com",
  projectId: "mkpfiks",
  storageBucket: "mkpfiks.firebasestorage.app",
  messagingSenderId: "337193895182",
  appId: "1:337193895182:web:b41c5b50cbd8ba8e2b835f"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("✅ Firebase terhubung:", db);

// Event handler saat form pendaftaran disubmit
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM loaded. Menunggu submit form...");

  document.body.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "form-pendaftaran") {
      e.preventDefault();
      const name = document.getElementById("patient-name").value.trim();
      const dob = document.getElementById("patient-dob").value;
      const gender = document.getElementById("patient-gender").value;
      const visitType = document.getElementById("visit-type").value;
      const feedback = document.getElementById("pendaftaran-feedback");

      if (!name || !dob || !gender || !visitType) {
        feedback.textContent = "⚠️ Mohon lengkapi semua kolom!";
        feedback.style.color = "#e67e22";
        console.warn("⚠️ Form tidak lengkap.");
        return;
      }

      const data = {
        name: name,
        dob: dob,
        gender: gender,
        visitType: visitType,
        lastVisit: new Date().toISOString().split("T")[0]
      };

      console.log("📦 Mengirim data ke Firestore:", data);

      db.collection("patients").add(data)
        .then(() => {
          console.log("✅ Data berhasil disimpan ke Firestore!");
          feedback.textContent = "✅ Data berhasil didaftarkan dan disimpan ke Firebase.";
          feedback.style.color = "green";
        })
        .catch((error) => {
          console.error("❌ Gagal menyimpan ke Firestore:", error);
          feedback.textContent = "❌ Gagal menyimpan ke Firebase: " + error.message;
          feedback.style.color = "red";
        });
    }
  });
});