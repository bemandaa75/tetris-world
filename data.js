
var KAKAK = {
    n: "Hemaaa",
    q: "Pendamping Imup",
    l: "Pesan untuk kalian:",
m: "Makasii yaa udah hadir dan jadi bagian dari Tetris. aku seneng banget bisa kenal kalian, bisa ketawa, seru seruan barengg, dan bikin banyak cerita. Jangan berubah jadi orang asing yaaw, tetap jadi anak-anak yang kahem kenal. Jangan lupa bahagia ya adek adek gwehh."
};

/* Tiap anak punya pesan sendiri. Ganti teks di m: "..." untuk masing-masing. */
var ANAK = [
   { n: "Ziko Imup", q: "The Life of Tetris", m: "Ketua satu ini emang ga pernah gagal bikin suasana hidup. Dari pertama ketemu aja udah keliatan kalau kamu bakal jadi salah satu sumber keramaian Tetris. Tetap jadi Ziko yang aktif dan penuh energi yaaw" },

{ n: "Sakhila Imup", q: "The Little Yapper", m: "Si paling banyak cerita, asik deh dia ni diajak ngobrol, apalagi jago ngedit tuhhh.. kondisikan suasana hati kill nanti mukamu merah wkwk. Tetap jadi Sakhila yang ceria dan ga kehabisan bahan cerita yaaw" },

{ n: "Ra'uf Imup", q: "The Little Sunshine", m: "Si paling bontot yang baliknya jauh, tapi selalu berhasil bawa keceriaan. Tetap jadi Ra'uf yang sopan, lucu, dan penuh senyum. Jangan kalah sama jarak buat tetap jadi anak yang luar biasa yaaw" },

{ n: "Mafida Imup", q: "The Positive Energy", m: "Si pembawa energi positif yang ga pernah kehabisan cerita. Kadang panikan, kadang yapping, tapi justru itu yang bikin kamu punya warna sendiri aw. Tetap jadi Mafida yang ceria dan penuh energi yaaw" },

{ n: "Rendy Imup", q: "The Monthly Shopper", m: "Satu ini jangan ditanya soal belanja bulanan. Masih inget banget drama izin telatnya, jangan lupa kasi cokyatt ke semua orang loh renn. Awas banyak alasan nih, wkwk. tetap jadi Rendy yang seru dan menyenangkan yaaw" },

{ n: "Felycia Imup", q: "The Happy Cat Lover", m: "Si pecinta kucing yang cerianya gaada obat deh, asik diajak nongkrong, jago badminton, tapi punya deadline pulang jam 12 malemm wkwk. Tetap jadi Felycia yang penuh senyum dan energi positif yaaw♥" },

{ n: "Sabil Imup", q: "The King of Words", m: "Si King yang kalau ngomong selalu punya bahan, jago debat, jago ngoding, dan paling hati-hati dalam memilih kata. Salut sama cara kamu membawa diri. Tetap rendah hati dan terus kembangkan kemampuanmu yaaw" },

{ n: "Abrar Imup", q: "The Noise Maker", m: "Si paling rajin ngerjain tugas, aktif, dan ga pernah kehabisan energi buat meramaikan suasana. Grup sepi? Kayanyaa tinggal tunggu abrororo muncul wkwk. Tetap jadi Abrar yang asik, jangan berhenti bikin suasana hidup yaaw" },

{ n: "Yumna Imup", q: "The Little Smiley", m: "Kecil-kecil tapi kalau foto selalu punya strategi buat ngumpet di belakang nihhh yumi. Sekali nongkrong bisa betah lama, dan senyumnya ga pernah absen. Tetap jadi Yumii yupi yupi yang imut, ceria, dan penuh senyum yaaw" },

{ n: "Afdel Imup", q: "The Walking Anomaly", m: "Si Opung yang kadang tiba-tiba menghilang karena punya agenda sendiri wkwk. Anomali satu ini emang punya timing keberangkatan yang beda dari yang lain. Asbun boleh, random boleh, tapi jangan hilang terus yaaw ♥" },

{ n: "Tegar Imup", q: "The Future Game Dev", m: "Si produktif yang selalu punya rasa penasaran dan ga ragu buat bertanya, keren berani speak up. Semoga cita-citamu jadi game developer bisa tercapai ya tegar. Tetap semangat belajar dalam meraih cita cita yaaw" },

{ n: "Allen Imup", q: "The Silent Genius", m: "Si pinter yang kalau diajak nongkrong seringnya malah lagi sibuk belajar wkwk. Tetap jaga kesehatan yaa allen, Jangan terlalu keras sama diri sendiri, tetap produktif tapi jangan lupa istirahat. Semoga semua hal baik selalu menyertaimu yaaw" },
];

/* =====================================================
   DATA CHAPTER (dipakai slide 4 peta dan slide 5 detail chapter)
   key   = nama file foto: foto/<key>, foto/<key>-1, <key>-2, <key>-3
   icon  = gambar di pulau | label = tulisan di peta
   t = judul | d = tanggal | x = cerita
   ===================================================== */
var CHAPTERS = [
    { key: "maba", icon: "👥", label: "Welcoming Maba", t: "Welcoming Maba", d: "Tanggal : ...", x: "Awal perjalanan kita dimulai di sini." },
    { key: "chapter1", icon: "⭐", label: "Chapter 1", t: "Chapter 1 — Getting to Know Each Other", d: "Tanggal : ...", x: "Hari pertama kita bertemu, mulai mengenal satu sama lain, dan membangun kehangatan di antara kita ♥" },
    { key: "chapter2", icon: "⭐", label: "Chapter 2", t: "Chapter 2", d: "Tanggal : ...", x: "Cerita chapter kedua kita." },
    { key: "connection", icon: "🤝", label: "Connection Chapter", t: "Connection Chapter", d: "Tanggal : ...", x: "Saat kita makin terhubung." },
    { key: "next", icon: "🏁", label: "Next Chapter", t: "Next Chapter", d: "Tanggal : ...", x: "Cerita selanjutnya masih ditulis..." }
];

/* =====================================================
   ISI SURAT / KARTU UCAPAN (slide 7)
   title = judul kartu | body = paragraf-paragraf (tiap "..." satu paragraf) | from = tanda tangan
   ===================================================== */
var LETTER = {
    title: "buat anak anak tetris yang menggemaskan",
    body: [
        "Makasi ya guys udah menjadi bagian dari perjalanan aku di tahun 2026 ini.",
        "Jujur... aku ngerasa seneng banget bisa dipertemukan sama kalian yang membawa energi sangat baik. mungkin awalnya kita cuma sekumpulan orang yang dipertemukan dalam satu kelompok, tapi ternyata banyak banget cerita yang akhirnya kita lewatin bareng barenggg.",
        "Sekali lagi makasiiiiiii udah jadi bagian dari perjalanan kahemmm. Tetap jadi diri kalian sendiri, jangan berhenti berkembang, dan jangan lupa bahagia ya guys.. Semoga setelah semua ini, kita ga cuma jadi orang-orang yang pernah satu kelompok, tapi juga tetap jadi bagian dari cerita satu sama lain ♥"
    ],
    from: "– Hemaaa"
};