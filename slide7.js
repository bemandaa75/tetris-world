/* =====================================================
   SLIDE 7 — LETTER BOX / KARTU UCAPAN
   Background : bg/bg7 (png / jpg / jpeg / webp)
   Isi surat  : edit LETTER di data.js
   Tombol NEXT -> slide8.html (penutup, nanti kita buat)
   ===================================================== */
var EXTS = ["png", "jpg", "jpeg", "webp"];
function pic(el, base, fail) {
    var i = 0;
    (function next() {
        if (i >= EXTS.length) { if (fail) fail(); return; }
        var u = base + "." + EXTS[i++], im = new Image();
        im.onload = function () { el.style.backgroundImage = 'url("' + u + '")'; };
        im.onerror = next;
        im.src = u;
    })();
}
document.querySelectorAll("[data-bg]").forEach(function (w) { pic(w, "bg/" + w.dataset.bg, hiasan); });

/* =====================================================
   HIASAN CADANGAN — suasana malam berbintang (beda dari slide lain)
   Dipakai kalau bg/bg7 belum ada. Kalau bg7 sudah ada, hiasan ini tidak dipakai.
   Ubah jumlahnya di angka-angka di bawah.
   ===================================================== */
function hiasan() {
    var main = document.getElementById("letterbox"), deco = document.createElement("div");
    deco.className = "deco"; main.insertBefore(deco, main.firstChild);
    function R(a, b) { return a + Math.random() * (b - a); }
    function add(cls, st, txt) {
        var e = document.createElement("div"); e.className = cls;
        for (var k in st) e.style[k] = st[k];
        if (txt) e.textContent = txt;
        deco.appendChild(e); return e;
    }

    add("moon", {});                                                     /* bulan sabit */
    for (var i = 0; i < 70; i++) {                                       /* bintang kecil berkelip */
        var s = R(2, 5);
        add("star", {
            left: R(0, 100) + "%", top: R(0, 72) + "%", width: s + "px", height: s + "px",
            animationDuration: R(1.5, 4) + "s", animationDelay: -R(0, 4) + "s"
        });
    }
    for (i = 0; i < 9; i++) {                                            /* bintang besar */
        add("bigstar", {
            left: R(3, 97) + "%", top: R(4, 60) + "%", fontSize: R(14, 30) + "px",
            animationDuration: R(2, 4) + "s", animationDelay: -R(0, 3) + "s"
        }, "✦");
    }
    add("shoot", { top: "10%", left: "70%" });                           /* bintang jatuh */
    add("shoot s2", { top: "24%", left: "92%" });

    add("hill h1", {}); add("hill h2", {}); add("hill h3", {});          /* awan merah muda di bawah */

    for (i = 0; i < 12; i++) {                                           /* hati naik pelan */
        add("heart", {
            left: R(3, 97) + "%", fontSize: R(14, 30) + "px",
            animationDuration: R(8, 15) + "s", animationDelay: -R(0, 14) + "s"
        }, "♥");
    }
    for (i = 0; i < 6; i++) {                                            /* amplop mini ikut terbang */
        add("mini", {
            left: R(5, 95) + "%", fontSize: R(18, 30) + "px",
            animationDuration: R(10, 18) + "s", animationDelay: -R(0, 16) + "s"
        }, "💌");
    }
}

/* isi kartu dari data.js */
document.getElementById("ctitle").textContent = LETTER.title;
document.getElementById("cfrom").textContent = LETTER.from;
var body = document.getElementById("cbody");
LETTER.body.forEach(function (t) {
    var p = document.createElement("p");
    p.textContent = t;
    body.appendChild(p);
});

var env = document.getElementById("env"), ov = document.getElementById("ov");
var openBtn = document.getElementById("open"), nextBtn = document.getElementById("nextbtn");
var opened = false;

function goNext() { location.href = "slide8.html"; }

/* buka amplop -> kartu ucapan muncul */
function openLetter() {
    if (opened) { ov.classList.add("on"); return; }
    opened = true;
    openBtn.style.display = "none";
    env.classList.add("open");
    setTimeout(function () { ov.classList.add("on"); }, 1700);
}
openBtn.onclick = openLetter;
env.onclick = openLetter;

/* tutup kartu -> tombol NEXT di layar utama */
function closeCard() {
    ov.classList.remove("on");
    nextBtn.style.display = "";
}
document.getElementById("x").onclick = closeCard;
document.getElementById("cnext").onclick = goNext;
nextBtn.onclick = goNext;
document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ov.classList.contains("on")) closeCard(); });