/* =========================================================================
   SCRIPT.JS — Beasiswa Pendidikan Berbudaya, Kabupaten Kediri
   =========================================================================
   Catatan untuk developer junior:
   - Logika di file ini TIDAK diubah sama sekali. Yang ditambahkan hanya
     KOMENTAR PENJELAS supaya lebih mudah dipahami.
   - File ini mengatur 4 hal:
     1) Pindah halaman/tab utama (Beranda, Alur, Jenis, Jadwal, Kontak)
     2) Pindah tab KATEGORI beasiswa (Berdaya/Bakti/Kapal Pesiar/Bandara)
     3) Pindah tab JENJANG pendidikan (khusus kategori Berdaya)
     4) Buka/tutup accordion FAQ
========================================================================= */


/* =========================================================================
   1. PINDAH HALAMAN / TAB UTAMA (Beranda, Alur, Jenis, Jadwal, Kontak)
   -------------------------------------------------------------------------
   Fungsi goTo(id) dipanggil dari 2 tempat:
     a) Saat tombol menu navbar (nav.tabs button) diklik.
     b) Saat tombol-tombol lain di dalam halaman diklik lewat atribut
        onclick="goTo('...')" di index.html, misalnya tombol
        "Lihat Syarat Beasiswa" atau "Lihat Detail ›".

   Cara kerjanya:
     - id yang dikirim harus SAMA PERSIS dengan:
         * nilai atribut data-target pada tombol menu navbar, dan
         * atribut id pada <section class="page" id="...">.
     - Semua tombol menu di-cek satu per satu: kalau data-target-nya
       sama dengan id yang dituju, tombol itu diberi class "active"
       (jadi terlihat menyala/terpilih); tombol lain class "active"-nya
       dilepas.
     - Begitu juga semua <section class="page">: yang id-nya sama
       dengan id tujuan diberi class "active" (jadi ditampilkan),
       sisanya disembunyikan (lihat aturan CSS section.page vs
       section.page.active di style.css).
     - Terakhir, halaman di-scroll halus (smooth) ke paling atas,
       supaya pengguna langsung melihat bagian atas halaman yang baru.
========================================================================= */
function goTo(id){
  // Aktifkan tombol menu navbar yang data-target-nya cocok dengan id tujuan,
  // dan nonaktifkan (lepas class "active") dari tombol menu lainnya.
  document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('active', b.dataset.target===id));

  // Tampilkan <section class="page"> yang id-nya cocok dengan id tujuan,
  // dan sembunyikan section halaman lainnya.
  document.querySelectorAll('section.page').forEach(s=>s.classList.toggle('active', s.id===id));

  // Scroll halaman ke paling atas dengan animasi halus.
  window.scrollTo({top:0, behavior:'smooth'});
}

// Pasang event listener klik ke SETIAP tombol menu di navbar.
// Saat tombol diklik, otomatis panggil goTo() dengan id sesuai
// data-target milik tombol tersebut.
document.querySelectorAll('nav.tabs button').forEach(btn=>{
  btn.addEventListener('click', ()=>goTo(btn.dataset.target));
});

// Saat halaman pertama kali dimuat, paksa kembali ke posisi awal dan
// tampilkan tab beranda agar halaman selalu terbuka dari bagian awal.
document.addEventListener('DOMContentLoaded', ()=>{
  window.scrollTo({top:0, behavior:'auto'});
  goTo('beranda');
});


function goToCategory(category){
  goTo('jenis');

  const chip = document.querySelector(`#kategoriTabs .jchip[data-cat="${category}"]`);
  const panel = document.getElementById('cat-'+category);
  if(!chip || !panel) return;

  document.querySelectorAll('#kategoriTabs .jchip').forEach(item=>item.classList.remove('active'));
  chip.classList.add('active');
  document.querySelectorAll('.cat-panel').forEach(item=>item.classList.remove('active'));
  panel.classList.add('active');

  requestAnimationFrame(()=>panel.scrollIntoView({behavior:'smooth', block:'start'}));
}

/* =========================================================================
  2. TAB KATEGORI BEASISWA (di halaman "Jenis & Syarat")
   -------------------------------------------------------------------------
   Mengatur tombol-tombol kategori di dalam #kategoriTabs, yaitu:
   🎓 Beasiswa Berdaya, 🤝 Beasiswa Bakti, ⚓ Beasiswa Kapal Pesiar,
   ✈️ Beasiswa Sambut Bandara.

   Setiap tombol kategori punya atribut data-cat (contoh: data-cat="bakti").
   Saat tombol kategori diklik:
     - Semua tombol kategori dilepas class "active"-nya dulu.
     - Tombol yang baru diklik diberi class "active".
     - Semua panel kategori (.cat-panel) disembunyikan (dilepas class
       "active") terlebih dahulu.
     - Panel kategori yang sesuai ditampilkan, dicari lewat id gabungan
       "cat-" + nilai data-cat. Contoh: data-cat="bakti" akan mencari
       elemen dengan id="cat-bakti" di index.html.
========================================================================= */
document.querySelectorAll('#kategoriTabs .jchip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    // Lepas class "active" dari semua tombol kategori, lalu nyalakan
    // hanya pada tombol yang baru diklik.
    document.querySelectorAll('#kategoriTabs .jchip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');

    // Sembunyikan semua panel kategori, lalu tampilkan panel yang
    // id-nya cocok dengan "cat-" + data-cat tombol yang diklik.
    document.querySelectorAll('.cat-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById('cat-'+chip.dataset.cat).classList.add('active');
  });
});


/* =========================================================================
   3. TAB JENJANG PENDIDIKAN (khusus kategori "Beasiswa Berdaya")
   -------------------------------------------------------------------------
   Mengatur tombol-tombol jenjang di dalam #jenjangTabs, yaitu:
   Guru PAUD, SD/MI, SMP/MTs, SMA/SMK/MA, Mahasiswa.

   Cara kerjanya SAMA PERSIS seperti tab kategori di atas, hanya
   bedanya memakai atribut data-jp dan mencari panel dengan id
   gabungan "jp-" + nilai data-jp. Contoh: data-jp="sma" akan mencari
   elemen dengan id="jp-sma" di index.html.
========================================================================= */
document.querySelectorAll('#jenjangOptions .pill').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    // Lepas class "active" dari semua tombol jenjang, lalu nyalakan
    // hanya pada tombol yang baru diklik.
    document.querySelectorAll('#jenjangOptions .pill').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');

    // Sembunyikan semua panel jenjang, lalu tampilkan panel yang
    // id-nya cocok dengan "jp-" + data-jp tombol yang diklik.
    document.querySelectorAll('.jpanel').forEach(p=>p.classList.remove('active'));
    document.getElementById('jp-'+chip.dataset.jp).classList.add('active');
    console.log('Jenjang dipilih:', chip.dataset.value);
  });
});

const panelFiles = {
  'jp-paud': {
    application: 'file/GURU%20PAUD/Surat_Permohonan_Beasiswa.pdf',
    teaching: 'file/GURU%20PAUD/Surat_Keterangan_Aktif_Mengajar.pdf',
    study: 'file/GURU%20PAUD/Surat_Keterangan_Aktif_Kuliah.pdf',
    sktm: 'file/GURU%20PAUD/contoh%20surat%20keterangan%20tidak%20mampu.pdf',
    electricity: 'file/GURU%20PAUD/CONTOH%20BUKTI%20PEMBELIAN%20TOKEN%20LISTRIK.pdf',
    photo: 'file/GURU%20PAUD/contoh%20foto%20rumah.pdf',
    map: 'file/mahasiswa/contoh%20denah%20rumah.pdf',
    registration: 'file/GURU%20PAUD/contoh%20nomor%20pendaftaran.pdf',
    mahasiswa: 'file/mahasiswa/Mahasiswa.pdf'
  },
  'jp-sd': {
    application: 'file/SD/Surat_Permohonan_Beasiswa.pdf',
    statement: 'file/SD/Surat_Pernyataan_Tidak_Menerima_Beasiswa.pdf',
    accepted: 'file/SMP/Surat_Keterangan_Aktif_Sekolah.pdf',
    electricity: 'file/SMP/CONTOH%20BUKTI%20PEMBELIAN%20TOKEN%20LISTRIK.pdf',
    sktm: 'file/SD/contoh%20surat%20keterangan%20tidak%20mampu.pdf',
    photo: 'file/SD/contoh%20foto%20rumah.pdf',
    coloredMap: 'file/SD/Warna_Map_Pendaftaran.pdf',
    schoolMap: 'file/SD/SD.MI.pdf'
  },
  'jp-smp': {
    application: 'file/SMP/SMPMTS.Surat_Permohonan_Beasiswa_Kediri.pdf',
    statement: 'file/SMP/Surat_Pernyataan_Tidak_Menerima_Beasiswa.pdf',
    accepted: 'file/SMP/Surat_Keterangan_Aktif_Sekolah.pdf',
    electricity: 'file/SMP/CONTOH%20BUKTI%20PEMBELIAN%20TOKEN%20LISTRIK.pdf',
    sktm: 'file/SMP/contoh%20surat%20keterangan%20tidak%20mampu.pdf',
    photo: 'file/SMP/contoh%20foto%20rumah.pdf',
    coloredMap: 'file/SMP/Warna_Map_Pendaftaran.pdf',
    schoolMap: 'file/SMP/SMP.MTS.pdf'
  },
  'jp-sma': {
    application: 'file/SMA/SMK.SMA.Surat_Permohonan_Beasiswa_Kediri_SMA.pdf',
    statement: 'file/SMA/Surat_Pernyataan_Tidak_Menerima_Beasiswa.pdf',
    accepted: 'file/SMP/Surat_Keterangan_Aktif_Sekolah.pdf',
    electricity: 'file/SMP/CONTOH%20BUKTI%20PEMBELIAN%20TOKEN%20LISTRIK.pdf',
    sktm: 'file/SMA/contoh%20surat%20keterangan%20tidak%20mampu.pdf',
    photo: 'file/SMA/contoh%20foto%20rumah.pdf',
    coloredMap: 'file/SMA/Warna_Map_Pendaftaran.pdf',
    schoolMap: 'file/SMA/SMA.SMK.MA.pdf'
  }, 
  'jp-mhsbaru': {
    application: 'file/mahasiswa/Surat_Permohonan_Beasiswa.pdf',
    statement: 'file/mahasiswa/Surat_Pernyataan_Tidak_Menerima_Beasiswa.pdf',
    electricity: 'file/SMP/CONTOH%20BUKTI%20PEMBELIAN%20TOKEN%20LISTRIK.pdf',
    accepted: 'file/mahasiswa/contoh%20surat%20diterima.pdf',
    khs: 'file/mahasiswa/contoh%20khs.pdf',
    pddikti: 'file/mahasiswa/Contoh%20PDDIKTI.pdf',
    sktm: 'file/mahasiswa/contoh%20surat%20keterangan%20tidak%20mampu.pdf',
    unmarried: 'file/mahasiswa/surat%20pernyataan%20belum%20menikah.pdf',
    photo: 'file/mahasiswa/contoh%20foto%20rumah.pdf',
    map: 'file/mahasiswa/contoh%20denah%20rumah.pdf',
    coloredMap: 'file/mahasiswa/Warna_Map_Pendaftaran.pdf',
    mahasiswa: 'file/mahasiswa/Mahasiswa.pdf',
    registration: 'filemahasiswa/contoh%20nomor%20pendaftaran.pdf'
  },
  'jp-mhson': {
    statement: 'file/mahasiswa/Surat_Pernyataan_Tidak_Menerima_Beasiswa.pdf'
  },
  'cat-bakti': {
    application: 'file/BHAKTA/Surat_Permohonan_Beasiswa_2.pdf',
    electricity: 'file/BHAKTA/CONTOH%20BUKTI%20PEMBELIAN%20TOKEN%20LISTRIK%202026.pdf',
    photoId: 'file/BHAKTA/Foto_Pas_2.pdf',
    photo: 'file/BHAKTA/contoh%20foto%20rumah.pdf',
    registration: 'file/mahasiswa/Mahasiswa.pdf'
  },
  'cat-kapal': {
    application: 'file/KAPAL%20PESIAR/Surat_Permohonan_Beasiswa%20(4).pdf',
    photoId: 'file/KAPAL%20PESIAR/Foto_Pas.pdf',
    sktm: 'file/KAPAL%20PESIAR/contoh%20surat%20keterangan%20tidak%20mampu.pdf',
    electricity: 'file/KAPAL%20PESIAR/CONTOH%20BUKTI%20PEMBELIAN%20TOKEN%20LISTRIK.pdf',
    photo: 'file/KAPAL%20PESIAR/contoh%20foto%20rumah.pdf',
    registration: 'file/KAPAL%20PESIAR/Cetak_Pendaftaran_Biru.pdf'
  },
  'cat-bandara': {
    application: 'file/SAMBUT%20BANDARA/Surat_Permohonan_Beasiswa.pdf',
    photoId: 'file/SAMBUT%20BANDARA/Foto.pdf',
    sktm: 'file/mahasiswa/contoh%20surat%20keterangan%20tidak%20mampu.pdf',
    electricity: 'file/SAMBUT%20BANDARA/CONTOH%20BUKTI%20PEMBELIAN%20TOKEN%20LISTRIK.pdf',
    photo: 'file/SAMBUT%20BANDARA/contoh%20foto%20rumah.pdf',
    registration: 'file/SAMBUT%20BANDARA/Cetak_Pendaftaran_Merah_v2.pdf'
  }
};

let documentPreviewCounter = 0;

function addFileActions(item, panelId){
  const files = panelFiles[panelId];
  if(!files) return;

  const text = item.textContent.toLowerCase();
  const studentRequirementNumber = item.querySelector('.req-number').textContent.trim();
  const isStudentRegistrationRequirement = panelId === 'jp-mhsbaru' && studentRequirementNumber === '17';
  const isStudentMapRequirement = panelId === 'jp-mhsbaru' && studentRequirementNumber === '18';
  const file = panelId === 'cat-bakti' && studentRequirementNumber === '7' ? files.photoId
    : panelId === 'cat-bakti' && studentRequirementNumber === '10' ? files.photo
    : panelId === 'cat-bakti' && ['12', '13'].includes(studentRequirementNumber) ? files.registration
    : panelId === 'cat-kapal' && studentRequirementNumber === '7' ? files.photoId
    : panelId === 'cat-kapal' && studentRequirementNumber === '8' ? files.sktm
    : panelId === 'cat-kapal' && studentRequirementNumber === '9' ? files.electricity
    : panelId === 'cat-kapal' && studentRequirementNumber === '11' ? files.photo
    : panelId === 'cat-kapal' && ['13', '14'].includes(studentRequirementNumber) ? files.registration
    : panelId === 'cat-bandara' && studentRequirementNumber === '7' ? files.photoId
    : panelId === 'cat-bandara' && studentRequirementNumber === '8' ? files.sktm
    : panelId === 'cat-bandara' && studentRequirementNumber === '9' ? files.electricity
    : panelId === 'cat-bandara' && studentRequirementNumber === '11' ? files.photo
    : panelId === 'cat-bandara' && ['13', '14'].includes(studentRequirementNumber) ? files.registration
    : ['jp-sd', 'jp-smp', 'jp-sma'].includes(panelId) && studentRequirementNumber === '5' ? files.accepted
    : panelId === 'jp-paud' && studentRequirementNumber === '1' ? files.application
    : panelId === 'jp-paud' && studentRequirementNumber === '2' ? files.teaching
    : panelId === 'jp-paud' && studentRequirementNumber === '3' ? files.study
    : panelId === 'jp-paud' && studentRequirementNumber === '14' ? files.mahasiswa
    : panelId === 'jp-sd' && studentRequirementNumber === '6' ? files.sktm
    : panelId === 'jp-sd' && studentRequirementNumber === '8' ? files.photo
    : panelId === 'jp-sd' && studentRequirementNumber === '10' ? files.coloredMap
    : panelId === 'jp-sd' && studentRequirementNumber === '11' ? files.schoolMap
    : panelId === 'jp-smp' && studentRequirementNumber === '10' ? files.coloredMap
    : panelId === 'jp-smp' && studentRequirementNumber === '11' ? files.schoolMap
    : panelId === 'jp-sma' && studentRequirementNumber === '10' ? files.coloredMap
    : panelId === 'jp-sma' && studentRequirementNumber === '11' ? files.schoolMap
    : isStudentRegistrationRequirement ? files.coloredMap
    : isStudentMapRequirement ? files.mahasiswa
    : panelId === 'jp-mhsbaru' && text.includes('map warna') ? files.coloredMap
    : text.includes('listrik') ? files.electricity
    : text.includes('pddikti') ? files.pddikti
    : text.includes('nomor pendaftaran') ? files.registration
    : text.includes('denah') ? files.map
    : text.includes('foto rumah') ? files.photo
    : text.includes('surat keterangan diterima') ? files.accepted
    : text.includes('khs') ? files.khs
    : text.includes('tidak mampu') ? files.sktm
    : text.includes('belum menikah') ? files.unmarried
    : text.includes('pernyataan') ? files.statement
    : text.includes('surat permohonan') ? files.application
    : null;
  if(!file) return;

  const actions = document.createElement('div');
  actions.className = 'req-actions';
  const previewId = `requirement-preview-${++documentPreviewCounter}`;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'req-preview-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', previewId);
  const label = item.classList.contains('example-file-label')
    ? 'Klik Untuk Melihat Contoh Berkas'
    : panelId === 'jp-paud'
      || panelId === 'jp-sd'
      || panelId === 'jp-smp'
      || panelId === 'jp-sma'
      || panelId === 'cat-kapal'
      || panelId === 'cat-bandara'
      || panelId === 'cat-bakti'
      ? 'Klik untuk lihat contoh format'
    : 'Klik untuk lihat & unduh contoh surat';
  toggle.textContent = label;

  const preview = document.createElement('div');
  preview.className = 'req-preview';
  preview.id = previewId;
  preview.hidden = true;

  const downloadLink = document.createElement('a');
  downloadLink.href = file;
  downloadLink.download = '';
  downloadLink.className = 'req-download-link';
  downloadLink.textContent = 'Unduh PDF';

  const frame = document.createElement('iframe');
  frame.dataset.src = file;
  frame.title = 'Pratinjau dokumen persyaratan';
  frame.loading = 'lazy';

  preview.append(frame);
  const paudItemsWithoutDownload = new Set([2, 3, 4, 8, 9, 11, 12, 14]);
  const sdItemsWithoutDownload = new Set([5, 6, 7, 8, 10, 11]);
  const smpItemsWithoutDownload = new Set([5, 6, 7, 8, 10, 11]);
  const smaItemsWithoutDownload = new Set([5, 6, 7, 8, 10, 11]);
  const cruiseItemsWithoutDownload = new Set([7, 8, 9, 11, 13, 14]);
  const airportItemsWithoutDownload = new Set([7, 8, 9, 10, 11, 13, 14]);
  const bhaktaItemsWithoutDownload = new Set([7, 10, 12, 13]);
  const hideDownload = panelId === 'jp-paud' && paudItemsWithoutDownload.has(Number(studentRequirementNumber))
    || panelId === 'jp-sd' && sdItemsWithoutDownload.has(Number(studentRequirementNumber))
    || panelId === 'jp-smp' && smpItemsWithoutDownload.has(Number(studentRequirementNumber))
    || panelId === 'jp-sma' && smaItemsWithoutDownload.has(Number(studentRequirementNumber))
    || panelId === 'cat-kapal' && cruiseItemsWithoutDownload.has(Number(studentRequirementNumber))
    || panelId === 'cat-bandara' && airportItemsWithoutDownload.has(Number(studentRequirementNumber))
    || panelId === 'cat-bakti' && bhaktaItemsWithoutDownload.has(Number(studentRequirementNumber));
  if(!item.classList.contains('example-file-label') && !hideDownload) preview.prepend(downloadLink);
  toggle.addEventListener('click', ()=>{
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if(!isOpen && !frame.hasAttribute('src')) frame.src = frame.dataset.src;
    toggle.setAttribute('aria-expanded', String(!isOpen));
    preview.hidden = isOpen;
    toggle.textContent = isOpen ? label : 'Tutup pratinjau dokumen';
  });

  actions.append(toggle);
  const body = item.querySelector('.req-body');
  body.append(actions, preview);
}

document.querySelectorAll('#jenis .jpanel, #jenis .cat-panel').forEach(panel=>{
  panel.querySelectorAll('.req-list').forEach(list=>{
    if(list.closest('.jpanel, .cat-panel') !== panel) return;
    if(list.closest('.requirement-groups')) return;

    const items = [...list.querySelectorAll('.req-item')];
    if(!items.length) return;

    const generalItems = items.filter(item=>item.dataset.requirement === 'general');
    const applicationItems = items.filter(item=>item.dataset.requirement !== 'general');
    const groups = document.createElement('div');
    groups.className = 'requirement-groups';
    const studentItemsWithoutExample = new Set([2, 3, 4, 5, 12, 15]);
    const studentItemsWithFileLabel = new Set([7, 8, 9, 10, 12, 14, 15, 17, 18]);
    const schoolItemsWithoutExample = new Set([3, 4, 5, 9]);
    const paudItemsWithoutExample = new Set([5, 6, 7, 10, 13]);
    const airportItemsWithoutExample = new Set([2, 3, 4, 5, 6, 10, 12]);
    const cruiseItemsWithoutExample = new Set([2, 3, 4, 5, 6, 10, 12]);
    const bhaktaItemsWithoutExample = new Set([2, 3, 4, 5, 6, 8, 9, 11]);

    const createGroup = (title, subtitle, groupItems, groupClass)=>{
      const group = document.createElement('section');
      group.className = `requirement-group ${groupClass}`;

      // Blok judul: judul besar berwarna + kalimat penjelas singkat,
      // lalu garis pemisah tipis (diatur lewat CSS pada .requirement-group-head)
      const head = document.createElement('div');
      head.className = 'requirement-group-head';
      const heading = document.createElement('h5');
      heading.textContent = title;
      const desc = document.createElement('p');
      desc.textContent = subtitle;
      head.append(heading, desc);
      group.append(head);
      const groupList = document.createElement('div');
      groupList.className = 'req-list';
      groupItems.forEach((item, index)=>{
        item.querySelector('.req-number').textContent = index + 1;
        if(panel.id === 'jp-mhsbaru' && groupClass === 'application-requirements' && studentItemsWithFileLabel.has(index + 1)){
          item.classList.add('example-file-label');
        }
        if(panel.id === 'jp-mhsbaru' && groupClass === 'application-requirements' && studentItemsWithoutExample.has(index)){
          item.classList.add('no-example-action');
        }
        if(['jp-sd', 'jp-smp', 'jp-sma'].includes(panel.id) && groupClass === 'application-requirements' && schoolItemsWithoutExample.has(index + 1) && index + 1 !== 5){
          item.classList.add('no-example-action');
        }
        if(panel.id === 'jp-paud' && groupClass === 'application-requirements' && paudItemsWithoutExample.has(index + 1)){
          item.classList.add('no-example-action');
        }
        if(panel.id === 'cat-bandara' && groupClass === 'application-requirements' && airportItemsWithoutExample.has(index + 1)){
          item.classList.add('no-example-action');
        }
        if(panel.id === 'cat-kapal' && groupClass === 'application-requirements' && cruiseItemsWithoutExample.has(index + 1)){
          item.classList.add('no-example-action');
        }
        if(panel.id === 'cat-bakti' && groupClass === 'application-requirements' && bhaktaItemsWithoutExample.has(index + 1)){
          item.classList.add('no-example-action');
        }
        // Syarat Umum ditampilkan sebagai teks biasa (tanpa tombol pratinjau/unduh).
        if(groupClass !== 'general-requirements') addFileActions(item, panel.id);
        groupList.append(item);
      });
      group.append(groupList);
      groups.append(group);
    };

    createGroup(
      'Syarat Umum',
      'Persyaratan yang wajib dipenuhi oleh calon penerima beasiswa.',
      generalItems,
      'general-requirements'
    );

    createGroup(
      'Syarat Pengajuan',
      'Lampiran Persyaratan khusus yang harus terpenuhi oleh calon penerima beasiswa.',
      applicationItems,
      'application-requirements'
    );
    list.replaceWith(groups);
  });
});

document.querySelectorAll('#jenis .syarat-card').forEach(card=>{
  card.querySelectorAll(':scope > .map-note').forEach(note=>note.remove());

  const note = document.createElement('div');
  note.className = 'map-note';
  note.setAttribute('role', 'note');
  note.textContent = '📁 Seluruh berkas disusun rapi dan diserahkan sesuai instruksi pada saat pendaftaran.';
  card.append(note);
});


/* =========================================================================
   4. ACCORDION FAQ (di halaman "Kontak / FAQ")
   -------------------------------------------------------------------------
   Setiap pertanyaan FAQ (.faq-item > .faq-q) bisa diklik untuk
   membuka/menutup jawabannya (.faq-a, diatur tampil/sembunyi lewat
   CSS berdasarkan class "open" pada .faq-item induknya).

   Perilakunya seperti accordion "hanya satu yang bisa terbuka":
     - Saat sebuah pertanyaan diklik, dicek dulu apakah item tersebut
       SUDAH terbuka (wasOpen) sebelum diklik.
     - Semua item FAQ ditutup (class "open" dilepas dari semuanya).
     - Kalau item yang diklik tadi BELUM terbuka (wasOpen === false),
       maka item itu dibuka (diberi class "open").
     - Efeknya: kalau klik pertanyaan yang sedang tertutup -> item itu
       terbuka (dan yang lain otomatis tertutup). Kalau klik pertanyaan
       yang sedang terbuka -> item itu ikut tertutup juga (toggle).
========================================================================= */
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click', ()=>{
    // Simpan dulu status item ini SEBELUM ditutup, supaya nanti bisa
    // dibedakan: ini "membuka" atau "menutup" item yang sama.
    const wasOpen = item.classList.contains('open');

    // Tutup semua item FAQ lebih dulu.
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));

    // Kalau item ini tadinya TERTUTUP, berarti aksi klik ini bermaksud
    // MEMBUKA-nya, jadi tambahkan lagi class "open" ke item ini.
    // Kalau item ini tadinya SUDAH TERBUKA, biarkan tetap tertutup
    // (efek klik-untuk-menutup / toggle).
    if(!wasOpen) item.classList.add('open');
  });
});