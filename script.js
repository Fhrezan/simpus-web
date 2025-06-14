// SIMPUS - script.js versi eksplisit render langsung + Firebase

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

// Saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM ready");

  const mainContent = document.querySelector("main.content");
  if (!mainContent) {
    console.error("❌ Elemen <main> tidak ditemukan!");
    return;
  }

  // Render form langsung
  console.log("🧩 Menyisipkan form pendaftaran...");
  mainContent.innerHTML = `
    <h2>Pendaftaran Pasien Baru / Kunjungan</h2>
    <form id="form-pendaftaran" novalidate>
      <div class="form-group">
        <label for="patient-name">Nama Pasien</label>
        <input type="text" id="patient-name" required placeholder="Masukkan nama lengkap pasien" />
      </div>
      <div class="form-group">
        <label for="patient-dob">Tanggal Lahir</label>
        <input type="date" id="patient-dob" required />
      </div>
      <div class="form-group">
        <label for="patient-gender">Jenis Kelamin</label>
        <select id="patient-gender" required>
          <option value="">Pilih jenis kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>
      <div class="form-group">
        <label for="visit-type">Jenis Kunjungan</label>
        <select id="visit-type" required>
          <option value="">Pilih jenis kunjungan</option>
          <option value="Rawat Jalan">Rawat Jalan</option>
          <option value="Rawat Inap">Rawat Inap</option>
          <option value="Dirujuk">Dirujuk</option>
        </select>
      </div>
      <button type="submit" class="btn">Daftarkan Pasien</button>
    </form>
    <div id="pendaftaran-feedback" aria-live="polite"></div>
  `;

  // Tangani submit
  document.getElementById("form-pendaftaran").addEventListener("submit", function (e) {
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

    console.log("📦 Menyimpan ke Firebase:", data);

    db.collection("patients").add(data)
      .then(() => {
        console.log("✅ Berhasil simpan ke Firestore!");
        feedback.textContent = "✅ Pasien berhasil didaftarkan dan disimpan ke Firebase.";
        feedback.style.color = "green";
      })
      .catch((error) => {
        console.error("❌ Gagal simpan:", error);
        feedback.textContent = "❌ Gagal menyimpan ke Firebase: " + error.message;
        feedback.style.color = "red";
      });
  });
});