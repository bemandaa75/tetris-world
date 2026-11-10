/* =====================================================
   SLIDE 5 — ALBUM FOTO PER ACARA
   Dibuka dari peta: slide5.html?id=<key acara>

   LETAK FOTO: album/<key acara>/   (maba, chapter1, chapter2, connection, next)
   CARA 1 (tanpa rename): masukkan foto dengan nama apa saja, lalu klik 2x
           buat-daftar.bat  -> membuat album/daftar.js otomatis.
   CARA 2 (tanpa script): namai foto angka urut 1, 2, 3, ... (png / jpg / jpeg / webp)
   Jumlah foto bebas.
   Background : bg/bg5
   ===================================================== */
var EXTS = ["png", "jpg", "jpeg", "webp"];

function pic(el, base) {
    var i = 0;
    (function next() {
        if (i >= EXTS.length) return;
        var u = base + "." + EXTS[i++], im = new Image();
        im.onload = function () { el.style.backgroundImage = 'url("' + u + '")'; };
        im.onerror = next;
        im.src = u;
    })();
}
document.querySelectorAll("[data-bg]").forEach(function (w) { pic(w, "bg/" + w.dataset.bg); });

/* acara yang dipilih */
var key = new URLSearchParams(location.search).get("id") || CHAPTERS[0].key;
var chap = CHAPTERS.filter(function (c) { return c.key === key; })[0] || CHAPTERS[0];
key = chap.key;
document.title = "TETRIS – " + chap.label;

var box = document.getElementById("photos"), count = 0;
var lb = document.getElementById("lb"), lbimg = document.getElementById("lbimg");

/* satu foto polaroid (posisi miring dibuat selang-seling) */
function addPolaroid(content, src) {
    var d = document.createElement("div");
    d.className = "pl" + (count % 3 === 0 ? " t" : "");
    d.style.setProperty("--r", ((count % 5) - 2) * 1.6 + "deg");
    d.style.setProperty("--tr", ((count % 2) ? 8 : -8) + "deg");
    d.style.animationDelay = Math.min(count * 0.05, 1.2) + "s";
    d.appendChild(content);
    if (src) d.onclick = function () { lbimg.src = src; lb.classList.add("on"); };
    box.appendChild(d);
    count++;
}

/* CARA 1: pakai daftar dari album/daftar.js (hasil buat-daftar.bat) */
function fromList(list) {
    list.forEach(function (name) {
        var u = "album/" + key + "/" + name, im = new Image();
        im.alt = "";
        im.src = u;
        addPolaroid(im, u);
        var card = box.lastChild;
        im.onerror = function () { if (card.parentNode) card.parentNode.removeChild(card); };
    });
}

/* CARA 2: cari foto bernama 1, 2, 3, ... sampai tidak ada lagi */
function probe(n, miss) {
    if (miss >= 2 || n > 200) { if (count === 0) placeholders(); return; }
    var i = 0;
    (function tryExt() {
        if (i >= EXTS.length) return probe(n + 1, miss + 1);
        var u = "album/" + key + "/" + n + "." + EXTS[i++], im = new Image();
        im.onload = function () { addPolaroid(im, u); probe(n + 1, 0); };
        im.onerror = tryExt;
        im.src = u;
    })();
}

if (typeof ALBUM !== "undefined" && ALBUM[key] && ALBUM[key].length) fromList(ALBUM[key]);
else probe(1, 0);

/* kalau belum ada foto sama sekali: tampil kotak contoh */
function placeholders() {
    for (var i = 0; i < 8; i++) {
        var p = document.createElement("div");
        p.className = "ph"; p.textContent = "📷";
        p.style.aspectRatio = i % 3 === 0 ? "3/4" : "4/3";
        addPolaroid(p, null);
    }
}

/* tutup foto besar */
lb.onclick = function () { lb.classList.remove("on"); };

/* tombol ✕ (pojok kanan atas) dan tombol Esc -> kembali ke slide 4 (peta) */
function back() { location.href = "slide4.html"; }
document.getElementById("x").onclick = back;
document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (lb.classList.contains("on")) lb.classList.remove("on"); else back();
});