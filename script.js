(function() { // Seluruh kode dibungkus dalam IIFE
    // Demo data

    // Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3CzIeL1P2fLMaVRF8fXxH4lTWqXAHVJ8",
  authDomain: "mkpfiks.firebaseapp.com",
  projectId: "mkpfiks",
  storageBucket: "mkpfiks.firebasestorage.app",
  messagingSenderId: "337193895182",
  appId: "1:337193895182:web:b41c5b50cbd8ba8e2b835f"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submit
const form = document.getElementById("form-pendaftaran");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("nama").value.trim(),
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    visitType: document.getElementById("kunjungan").value,
    lastVisit: new Date().toISOString().split("T")[0]
  };

  try {
    await db.collection("patients").add(data);
    result.textContent = "✅ Data pasien berhasil disimpan ke Firebase.";
    result.style.color = "green";
    form.reset();
  } catch (error) {
    console.error("❌ Error saat menyimpan:", error);
    result.textContent = "Gagal menyimpan data ke Firebase.";
    result.style.color = "red";
  }
    // Organization team data: members and UTTW
    const teamMembers = [
      {
        name: "Az-Zahra Puteri Nur Intan",
        role: "Koordinator Tim SIMPUS",
        UTTW: {
          uraian: "Mengkoordinasikan seluruh aktivitas pengembangan dan pemeliharaan SIMPUS.",
          tugas: "Pengelolaan proyek, pengawasan proses pengembangan, evaluasi sistem.",
          tanggungJawab: "Menjamin kelancaran dan keberhasilan implementasi SIMPUS.",
          wewenang: "Mengambil keputusan strategis, delegasi tugas."
        }
      },
      {
        name: "Shally Angelita Amanda",
        role: "Pengembang Frontend",
        UTTW: {
          uraian: "Mengembangkan antarmuka pengguna SIMPUS yang responsif dan intuitif.",
          tugas: "Mendesain UI, membuat layout, mengimplementasikan interaktivitas.",
          tanggungJawab: "Memastikan UI mudah digunakan dan responsif di berbagai perangkat.",
          wewenang: "Penentuan desain frontend, penggunaan teknologi UI."
        }
      },
      {
        name: "Wyandra Fahrezan Angkasa",
        role: "Pengembang Backend",
        UTTW: {
          uraian: "Mengelola data dan logika bisnis SIMPUS secara server-side.",
          tugas: "Membangun API, integrasi data pasien, keamanan data.",
          tanggungJawab: "Menjamin integritas dan keamanan informasi pasien.",
          wewenang: "Memilih arsitektur backend, pengaturan database."
        }
      },
      {
        name: "Chairunisa Putri Wirdani",
        role: "Penguji Sistem",
        UTTW: {
          uraian: "Melakukan pengujian dan validasi kualitas SIMPUS.",
          tugas: "Membuat skenario testing, bug tracking, validasi fitur.",
          tanggungJawab: "Menjamin SIMPUS bebas dari bug kritis dan berfungsi baik.",
          wewenang: "Memberikan rekomendasi perbaikan, menghentikan rilis jika ada masalah."
        }
      },
      {
        name: "Ni Kadek Bintang Listia Maharani Putri",
        role: "Dokumentasi & Pelatihan",
        UTTW: {
          uraian: "Menyusun dokumentasi penggunaan dan pelatihan pengguna SIMPUS.",
          tugas: "Membuat manual, video pelatihan, bantuan pengguna.",
          tanggungJawab: "Menjamin pengguna memahami dan dapat menggunakan SIMPUS dengan baik.",
          wewenang: "Menetapkan materi pelatihan dan dokumentasi."
        }
      },
      {
        name: "Raffi Bagja Rivaldi",
        role: "Maintenance & Support",
        UTTW: {
          uraian: "Memberikan dukungan teknis dan pemeliharaan SIMPUS.",
          tugas: "Monitoring sistem, penanganan error, update perangkat lunak.",
          tanggungJawab: "Menjamin SIMPUS selalu tersedia dan stabil.",
          wewenang: "Intervensi teknis dan koordinasi perbaikan."
        }
      }
    ];
  
    // Role access rights map: which menu items are accessible per role
    const roleAccess = {
      admin: ["pendaftaran", "pasien", "rekam-medis", "laporan", "struktur-tim"],
      dokter: ["pasien", "rekam-medis", "laporan"],
      perawat: ["pendaftaran", "pasien", "rekam-medis"],
      apoteker: ["pasien", "laporan"],
      simpus: ["pendaftaran", "pasien", "rekam-medis", "laporan", "struktur-tim"]
    };
  
    // Patient data >10 patients including rawat jalan, rawat inap, dan dirujuk faskes
    // Patient status: "Rawat Jalan" | "Rawat Inap" | "Dirujuk"
  
    const patients = [
      {
        id: "P001",
        name: "Ayu Lestari",
        dob: "1990-06-12",
        gender: "Perempuan",
        visitType: "Rawat Jalan",
        lastVisit: "2024-06-15",
      },
      {
        id: "P002",
        name: "Budi Santoso",
        dob: "1985-11-05",
        gender: "Laki-laki",
        visitType: "Rawat Inap",
        lastVisit: "2024-06-20",
      },
      {
        id: "P003",
        name: "Citra Dewi",
        dob: "2001-02-21",
        gender: "Perempuan",
        visitType: "Dirujuk",
        lastVisit: "2024-06-18",
      },
      {
        id: "P004",
        name: "Dedi Prasetyo",
        dob: "1977-09-28",
        gender: "Laki-laki",
        visitType: "Rawat Jalan",
        lastVisit: "2024-06-19",
      },
      {
        id: "P005",
        name: "Ella Nur",
        dob: "1995-12-02",
        gender: "Perempuan",
        visitType: "Rawat Inap",
        lastVisit: "2024-06-21",
      },
      {
        id: "P006",
        name: "Fajar Maulana",
        dob: "1982-04-15",
        gender: "Laki-laki",
        visitType: "Dirujuk",
        lastVisit: "2024-06-17",
      },
      {
        id: "P007",
        name: "Gina Oktavia",
        dob: "1999-08-08",
        gender: "Perempuan",
        visitType: "Rawat Jalan",
        lastVisit: "2024-06-22",
      },
      {
        id: "P008",
        name: "Hadi Pranoto",
        dob: "1970-01-30",
        gender: "Laki-laki",
        visitType: "Rawat Inap",
        lastVisit: "2024-06-16",
      },
      {
        id: "P009",
        name: "Intan Permata",
        dob: "2003-07-11",
        gender: "Perempuan",
        visitType: "Dirujuk",
        lastVisit: "2024-06-20",
      },
      {
        id: "P010",
        name: "Joko Susilo",
        dob: "1989-03-25",
        gender: "Laki-laki",
        visitType: "Rawat Jalan",
        lastVisit: "2024-06-19",
      },
      {
        id: "P011",
        name: "Ketut Sari",
        dob: "1991-10-10",
        gender: "Perempuan",
        visitType: "Rawat Inap",
        lastVisit: "2024-06-21",
      }
    ];
  
    // Medical records mapped by patient id
    const medicalRecords = {
      "P001": [
        {
          date: "2024-06-15",
          diagnosis: "Demam Berdarah",
          treatment: "Rawat Jalan, infus dan obat demam",
          doctor: "Dr. Andi",
          notes: "Pasien menunjukkan progres positif."
        }
      ],
      "P002": [
        {
          date: "2024-06-20",
          diagnosis: "Pneumonia",
          treatment: "Rawat Inap, antibiotik IV",
          doctor: "Dr. Budi",
          notes: "Rawat inap 3 hari, kondisi membaik."
        }
      ],
      "P003": [
        {
          date: "2024-06-18",
          diagnosis: "Covid-19",
          treatment: "Dirujuk ke RSUD",
          doctor: "Dr. Citra",
          notes: "Pasien dirujuk untuk perawatan intensif."
        }
      ],
      "P004": [
        {
          date: "2024-06-19",
          diagnosis: "Flu dan Batuk",
          treatment: "Rawat Jalan, obat flu dan vitamin",
          doctor: "Dr. Dedi",
          notes: "Saran istirahat dan pola makan sehat."
        }
      ],
      "P005": [
        {
          date: "2024-06-21",
          diagnosis: "Cedera Lutut",
          treatment: "Rawat Inap, terapi fisik dan pengobatan",
          doctor: "Dr. Ella",
          notes: "Evaluasi tiap 2 hari."
        }
      ],
      "P006": [
        {
          date: "2024-06-17",
          diagnosis: "Diabetes Melitus",
          treatment: "Dirujuk ke RS Spesialis",
          doctor: "Dr. Fajar",
          notes: "Pasien membutuhkan perawatan khusus."
        }
      ],
      "P007": [
        {
          date: "2024-06-22",
          diagnosis: "Asma Ringan",
          treatment: "Rawat Jalan, obat inhaler",
          doctor: "Dr. Gina",
          notes: "Pantau penggunaan obat."
        }
      ],
      "P008": [
        {
          date: "2024-06-16",
          diagnosis: "Stroke Ringan",
          treatment: "Rawat Inap, observasi dan terapi",
          doctor: "Dr. Hadi",
          notes: "Pemeriksaan rutin dan fisioterapi."
        }
      ],
      "P009": [
        {
          date: "2024-06-20",
          diagnosis: "Hipertensi",
          treatment: "Dirujuk ke RS untuk pengobatan lebih lanjut",
          doctor: "Dr. Intan",
          notes: "Kontrol rutin dianjurkan."
        }
      ],
      "P010": [
        {
          date: "2024-06-19",
          diagnosis: "Maag Kronis",
          treatment: "Rawat Jalan, diet dan obat maag",
          doctor: "Dr. Joko",
          notes: "Perlu pengaturan pola makan."
        }
      ],
      "P011": [
        {
          date: "2024-06-21",
          diagnosis: "Radang Tenggorokan",
          treatment: "Rawat Inap, antibiotik dan observasi",
          doctor: "Dr. Ketut",
          notes: "Kondisi stabil setelah 2 hari."
        }
      ]
    };
  
    // Selected menu state
    let currentMenu = "pendaftaran";
    let currentRole = "admin"; // Gunakan 'let' karena nilainya bisa berubah
  
    // Cache dom
    const sidebarMenu = document.getElementById('sidebar-menu');
    const mainContent = document.querySelector('main.content');
    const roleSelect = document.getElementById('role-select');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  
    // Function to set active menu item
    function setActiveMenu(menu) {
      const items = sidebarMenu.querySelectorAll('ul li');
      items.forEach(i => {
        if(i.dataset.menu === menu) i.classList.add('active');
        else i.classList.remove('active');
      });
      currentMenu = menu;
      renderMainContent();
    }
  
    // Function to render team structure content
    function renderTeamStructure() {
      let html = `<h2>Struktur Organisasi Tim SIMPUS</h2>`;
      html += `<div role="list">`;
      teamMembers.forEach(member => {
        html += `<section class="team-member" role="listitem" tabindex="0" aria-label="Anggota tim ${member.name}, peran ${member.role}">`;
        html += `<h3>${member.name}</h3>`;
        html += `<p><strong>Peran:</strong> ${member.role}</p>`;
        html += `<p><strong>Uraian Tugas:</strong> ${member.UTTW.uraian}</p>`;
        html += `<p><strong>Tugas:</strong> ${member.UTTW.tugas}</p>`;
        html += `<p><strong>Tanggung Jawab:</strong> ${member.UTTW.tanggungJawab}</p>`;
        html += `<p><strong>Wewenang:</strong> ${member.UTTW.wewenang}</p>`;
        html += `</section>`;
      });
      html += `</div>`;
      mainContent.innerHTML = html;
    }
  
    // Function to render pendaftaran form
    function renderPendaftaran() {
      if(!roleAccess[currentRole].includes("pendaftaran")) {
        mainContent.innerHTML = `<p class="access-denied">Anda tidak memiliki akses ke menu Pendaftaran.</p>`;
        return;
      }
      // Form to register new patient visit
      mainContent.innerHTML = `
        <h2>Pendaftaran Pasien Baru / Kunjungan</h2>
        <form id="form-pendaftaran" novalidate>
          <div class="form-group">
            <label for="patient-name">Nama Pasien</label>
            <input type="text" id="patient-name" name="patientName" required placeholder="Masukkan nama lengkap pasien" aria-required="true" />
          </div>
          <div class="form-group">
            <label for="patient-dob">Tanggal Lahir</label>
            <input type="date" id="patient-dob" name="patientDob" required aria-required="true" />
          </div>
          <div class="form-group">
            <label for="patient-gender">Jenis Kelamin</label>
            <select id="patient-gender" name="patientGender" required aria-required="true">
              <option value="">Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div class="form-group">
            <label for="visit-type">Jenis Kunjungan</label>
            <select id="visit-type" name="visitType" required aria-required="true">
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
  
      const form = document.getElementById('form-pendaftaran');
      const feedback = document.getElementById('pendaftaran-feedback');
  
      form.addEventListener('submit', e => {
        e.preventDefault();
        // Validate inputs
        if(!form.patientName.value.trim() || !form.patientDob.value || !form.patientGender.value || !form.visitType.value) {
          // Mengganti alert dengan elemen feedback di DOM
          feedback.textContent = "Mohon lengkapi semua kolom pendaftaran.";
          feedback.style.color = "#c0392b";
          return;
        }
        // Create new patient with a generated id
        const newId = "P" + String(patients.length + 1).padStart(3, "0");
        patients.push({
          id: newId,
          name: form.patientName.value.trim(),
          dob: form.patientDob.value,
          gender: form.patientGender.value,
          visitType: form.visitType.value,
          lastVisit: new Date().toISOString().split('T')[0],
        });
        medicalRecords[newId] = [];
        saveToLocalStorage();
        feedback.textContent = `Pasien berhasil didaftarkan dengan ID: ${newId}`;
        feedback.style.color = "#27ae60";
        form.reset();
      });
    }
  
    // Function to render patient list
    function renderPatients() {
      if(!roleAccess[currentRole].includes("pasien")) {
        mainContent.innerHTML = `<p class="access-denied">Anda tidak memiliki akses ke menu Data Pasien.</p>`;
        return;
      }
      let html = `<h2>Data Pasien</h2><div class="table-wrapper"><table aria-label="Daftar pasien"><thead><tr><th>ID</th><th>Nama</th><th>Tgl Lahir</th><th>Jenis Kelamin</th><th>Jenis Kunjungan</th><th>Kunjungan Terakhir</th></tr></thead><tbody>`;
      patients.forEach(p => {
        html += `<tr tabindex="0" role="button" data-pid="${p.id}" aria-label="Klik untuk melihat rekam medis pasien ${p.name} (${p.visitType})">
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.dob}</td>
          <td>${p.gender}</td>
          <td>${p.visitType}</td>
          <td>${p.lastVisit}</td>
        </tr>`;
      });
      html += `</tbody></table></div><small class="italic">Klik baris pasien untuk melihat rekam medis</small>`;
      mainContent.innerHTML = html;
  
      // Add click event on rows to select patient for record if role allows
      if(roleAccess[currentRole].includes("rekam-medis")) {
        const rows = mainContent.querySelectorAll('tbody tr');
        rows.forEach(row => {
          row.addEventListener('click', () => {
            const pid = row.dataset.pid;
            renderMedicalRecord(pid);
            // Highlight menu as rekam-medis
            setActiveMenu('rekam-medis');
            // Store selected patient in global state for rekam-medis
            currentPatientId = pid;
          });
        });
      }
    }
  
    let currentPatientId = null; // Gunakan 'let' karena nilainya bisa berubah
  
    // Function to render medical records
    function renderMedicalRecord(patientId = null) {
      if(!roleAccess[currentRole].includes("rekam-medis")) {
        mainContent.innerHTML = `<p class="access-denied">Anda tidak memiliki akses ke menu Rekam Medis.</p>`;
        return;
      }
      // If patientId is null, display message to select patient
      if(!patientId) {
        mainContent.innerHTML = `<h2>Rekam Medis</h2><p class="italic">Silakan pilih pasien untuk melihat rekam medisnya.</p>`;
        return;
      }
      currentPatientId = patientId;
      const patient = patients.find(p => p.id === patientId);
      if(!patient) {
        mainContent.innerHTML = `<p class="access-denied">Pasien tidak ditemukan.</p>`;
        return;
      }
  
      // Display medical record list for this patient
      const records = medicalRecords[patientId] || [];
      let html = `
        <h2>Rekam Medis Pasien: ${patient.name} (${patient.id})</h2>
        <p><strong>Tanggal Lahir:</strong> ${patient.dob} &nbsp;&nbsp; <strong>Jenis Kelamin:</strong> ${patient.gender} &nbsp;&nbsp; <strong>Jenis Kunjungan:</strong> ${patient.visitType}</p>
        <div class="table-wrapper">
        <table aria-label="Rekam medis pasien ${patient.name}">
          <thead><tr><th>Tanggal</th><th>Diagnosa</th><th>Pengobatan</th><th>Dokter</th><th>Catatan</th></tr></thead>
          <tbody>
      `;
      if(records.length === 0) {
        html += `<tr><td colspan="5" class="text-center italic">Belum ada rekam medis tersedia.</td></tr>`;
      } else {
        records.forEach(r => {
          html += `<tr>
            <td>${r.date}</td>
            <td>${r.diagnosis}</td>
            <td>${r.treatment}</td>
            <td>${r.doctor}</td>
            <td>${r.notes}</td>
          </tr>`;
        });
      }
      html += `</tbody></table></div>`;
  
      // Show form to add new medical record if role permits (admin, dokter, perawat, simpus)
      if(["admin","dokter","perawat","simpus"].includes(currentRole)) {
        html += `
          <section aria-label="Form tambah rekam medis">
            <h3>Tambah Rekam Medis Baru</h3>
            <form id="form-add-record" novalidate>
              <div class="form-group">
                <label for="record-date">Tanggal</label>
                <input type="date" id="record-date" name="recordDate" required aria-required="true" value="${new Date().toISOString().substring(0,10)}" />
              </div>
              <div class="form-group">
                <label for="record-diagnosis">Diagnosa</label>
                <textarea id="record-diagnosis" name="recordDiagnosis" rows="2" required aria-required="true" placeholder="Masukkan diagnosa"></textarea>
              </div>
              <div class="form-group">
                <label for="record-treatment">Pengobatan</label>
                <textarea id="record-treatment" name="recordTreatment" rows="2" required aria-required="true" placeholder="Masukkan pengobatan"></textarea>
              </div>
              <div class="form-group">
                <label for="record-doctor">Dokter Penanggung Jawab</label>
                <input type="text" id="record-doctor" name="recordDoctor" required aria-required="true" placeholder="Nama dokter" />
              </div>
              <div class="form-group">
                <label for="record-notes">Catatan Tambahan</label>
                <textarea id="record-notes" name="recordNotes" rows="2" placeholder="Catatan tambahan"></textarea>
              </div>
              <button type="submit" class="btn">Simpan Rekam Medis</button>
            </form>
            <div id="add-record-feedback" aria-live="polite"></div>
          </section>
        `;
      }
  
      mainContent.innerHTML = html;
  
      if(document.getElementById('form-add-record')) {
        const form = document.getElementById('form-add-record');
        const feedback = document.getElementById('add-record-feedback');
        form.addEventListener('submit', e => {
          e.preventDefault();
          let valid = true;
          ['recordDate', 'recordDiagnosis', 'recordTreatment', 'recordDoctor'].forEach(id => {
            if(!form[id].value.trim()){
              valid = false;
            }
          });
          if(!valid){
            feedback.textContent = "Harap lengkapi semua kolom yang wajib diisi.";
            feedback.style.color = "#c0392b";
            return;
          }
          // Save record
          if(!medicalRecords[patientId]) medicalRecords[patientId] = [];
          medicalRecords[patientId].push({
            date: form.recordDate.value,
            diagnosis: form.recordDiagnosis.value.trim(),
            treatment: form.recordTreatment.value.trim(),
            doctor: form.recordDoctor.value.trim(),
            notes: form.recordNotes.value.trim() || "-"
          });
          feedback.textContent = "Rekam medis berhasil disimpan.";
          feedback.style.color = "#27ae60";
          form.reset();
          saveToLocalStorage();
          form.recordDate.value = new Date().toISOString().substring(0,10);
          // Refresh the list
          setTimeout(() => {
            renderMedicalRecord(patientId);
          }, 1000);
        });
      }
    }
  
    // Function to render laporan - For demo: Show counts of patients by visit type and role access
    function renderLaporan() {
      if(!roleAccess[currentRole].includes("laporan")) {
        mainContent.innerHTML = `<p class="access-denied">Anda tidak memiliki akses ke menu Laporan.</p>`;
        return;
      }
      // Count patients by visit type
      const counts = {
        "Rawat Jalan": 0,
        "Rawat Inap": 0,
        "Dirujuk": 0
      };
      patients.forEach(p => {
        if(counts[p.visitType] !== undefined) counts[p.visitType]++;
      });
      let html = `<h2>Laporan Kunjungan Pasien</h2>`;
      html += `<ul>
        <li>Total Pasien Rawat Jalan: <strong>${counts["Rawat Jalan"]}</strong></li>
        <li>Total Pasien Rawat Inap: <strong>${counts["Rawat Inap"]}</strong></li>
        <li>Total Pasien Dirujuk ke Faskes: <strong>${counts["Dirujuk"]}</strong></li>
      </ul>`;
  
      html += `
        <h3>Data Pasien Lengkap</h3>
        <div class="table-wrapper">
        <table aria-label="Laporan data pasien lengkap">
          <thead><tr><th>ID</th><th>Nama</th><th>Tanggal Lahir</th><th>Jenis Kelamin</th><th>Jenis Kunjungan</th><th>Kunjungan Terakhir</th></tr></thead>
          <tbody>`;
      patients.forEach(p => {
        html += `<tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.dob}</td>
          <td>${p.gender}</td>
          <td>${p.visitType}</td>
          <td>${p.lastVisit}</td>
        </tr>`;
      });
      html += `</tbody></table></div>`;
  
      mainContent.innerHTML = html;
    }
  
    // Render main content based on currentMenu
    function renderMainContent() {
      switch (currentMenu) {
        case "struktur-tim": renderTeamStructure(); break;
        case "pendaftaran": renderPendaftaran(); break;
        case "pasien": renderPatients(); break;
        case "rekam-medis": renderMedicalRecord(currentPatientId); break;
        case "laporan": renderLaporan(); break;
        default:
          mainContent.innerHTML = "<p>Menu tidak ditemukan.</p>";
      }
    }
  
    // Handle sidebar menu clicks and accessibility
    sidebarMenu.querySelectorAll('ul li').forEach(item => {
      item.addEventListener('click', () => {
        // Mengganti alert dengan pesan di konsol atau elemen feedback di DOM jika diperlukan
        if(!roleAccess[currentRole].includes(item.dataset.menu)) {
          console.warn("Akses ditolak untuk menu ini.");
          // Anda bisa menambahkan elemen feedback di sini jika ingin menampilkan pesan di UI
          // Contoh: mainContent.innerHTML = `<p class="access-denied">Anda tidak memiliki akses ke menu ini.</p>`;
          return;
        }
        setActiveMenu(item.dataset.menu);
        if(document.body.clientWidth <= 640){
          sidebarMenu.classList.remove('show');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  
    // Role change handling
    roleSelect.addEventListener('change', e => {
      currentRole = e.target.value;
      // Set default menu accessible for role
      const accessibleMenus = roleAccess[currentRole] || [];
      if(!accessibleMenus.includes(currentMenu)) {
        setActiveMenu(accessibleMenus[0] || 'struktur-tim');
      } else {
        renderMainContent();
      }
    });
  
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
      sidebarMenu.classList.toggle('show');
      const expanded = sidebarMenu.classList.contains('show');
      mobileMenuBtn.setAttribute('aria-expanded', expanded.toString());
    });
  
    
// Local Storage Utilities
function saveToLocalStorage() {
  localStorage.setItem('patients', JSON.stringify(patients));
  localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
}

function loadFromLocalStorage() {
  const storedPatients = localStorage.getItem('patients');
  const storedRecords = localStorage.getItem('medicalRecords');

  if (storedPatients) {
    try {
      const parsed = JSON.parse(storedPatients);
      if (Array.isArray(parsed)) patients.splice(0, patients.length, ...parsed);
    } catch (e) {
      console.error("Gagal memuat data pasien dari localStorage.");
    }
  }

  if (storedRecords) {
    try {
      const parsed = JSON.parse(storedRecords);
      if (typeof parsed === 'object') {
        Object.keys(parsed).forEach(k => {
          medicalRecords[k] = parsed[k];
        });
      }
    } catch (e) {
      console.error("Gagal memuat rekam medis dari localStorage.");
    }
  }
}


// Initialize
    function init() {
  loadFromLocalStorage();
      roleSelect.value = currentRole;
      setActiveMenu(currentMenu);
    }
    init();
  
  })(); // Akhir dari IIFE
  
