// Firebase v8
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

// Fungsi render menu
function renderPendaftaran() {
  const mainContent = document.querySelector("main.content");
  mainContent.innerHTML = `
    <h2>Pendaftaran Pasien Baru / Kunjungan</h2>
    <form id="form-pendaftaran" novalidate>
      <div class="form-group">
        <label for="patient-name">Nama Pasien</label>
        <input type="text" id="patient-name" required />
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
    <div id="pendaftaran-feedback"></div>
  `;
}

function renderDataPasien() {
  const mainContent = document.querySelector("main.content");
  mainContent.innerHTML = `<h2>Data Pasien</h2><p>(Fitur menampilkan data akan ditambahkan)</p>`;
}

function renderRekamMedis() {
  const mainContent = document.querySelector("main.content");
  mainContent.innerHTML = `<h2>Rekam Medis</h2><p>Form rekam medis di sini</p>`;
}

function renderLaporan() {
  const mainContent = document.querySelector("main.content");
  mainContent.innerHTML = `<h2>Laporan</h2><p>Ringkasan kunjungan pasien</p>`;
}

function renderStrukturTim() {
  const mainContent = document.querySelector("main.content");
  mainContent.innerHTML = `<h2>Struktur Tim</h2><p>Anggota tim SIMPUS dan perannya</p>`;
}

// Kontrol menu
function renderMainContent(menu) {
  switch (menu) {
    case "pendaftaran":
      renderPendaftaran();
      break;
    case "pasien":
      renderDataPasien();
      break;
    case "rekam-medis":
      renderRekamMedis();
      break;
    case "laporan":
      renderLaporan();
      break;
    case "struktur-tim":
      renderStrukturTim();
      break;
    default:
      renderPendaftaran();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM Loaded");

  let currentMenu = "pendaftaran";
  renderMainContent(currentMenu);

  // Tangani klik menu
  document.querySelectorAll("[data-menu]").forEach(item => {
    item.addEventListener("click", () => {
      const selected = item.getAttribute("data-menu");
      currentMenu = selected;
      console.log("🔁 Navigasi ke:", selected);
      renderMainContent(currentMenu);
    });
  });

  // Tangani form pendaftaran
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
        feedback.style.color = "orange";
        return;
      }

      const data = {
        name: name,
        dob: dob,
        gender: gender,
        visitType: visitType,
        lastVisit: new Date().toISOString().split("T")[0]
      };

      console.log("📦 Menyimpan:", data);

      db.collection("patients").add(data)
        .then(() => {
          console.log("✅ Disimpan di Firebase");
          feedback.textContent = "✅ Pasien berhasil disimpan.";
          feedback.style.color = "green";
        })
        .catch((err) => {
          console.error("❌ Error:", err);
          feedback.textContent = "❌ Gagal simpan: " + err.message;
          feedback.style.color = "red";
        });
    }
  });
});
