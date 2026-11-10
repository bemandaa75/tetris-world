/* =====================================================
   BACKGROUND
   Taruh foto di folder bg/ dengan nama: bg1 (png / jpg / jpeg / webp)
   bg1 = background Opening Screen
   ===================================================== */
var EXTS = ["png", "jpg", "jpeg", "webp"];

function pic(el, base, overlay) {
  var i = 0;
  (function next() {
    if (i >= EXTS.length) return;
    var u = base + "." + EXTS[i++], im = new Image();
    im.onload = function () {
      el.style.backgroundImage = (overlay ? overlay + "," : "") + 'url("' + u + '")';
    };
    im.onerror = next;
    im.src = u;
  })();
}

document.querySelectorAll("[data-bg]").forEach(function (w) {
  pic(w, "bg/" + w.dataset.bg, null);
});


/* =====================================================
   WARNA + GERAK HURUF JUDUL
   - LETTER_COLORS : daftar warna huruf TETRIS WORLD! (bergantian)
   ===================================================== */
var LETTER_COLORS = ["#ff4fa0", "#ff7a4d", "#ffb02e", "#ffd83a", "#c4e83a", "#5fd35a"];
var idx = 0;

/* =====================================================
   GERAK HURUF LUCU (loncat + goyang + gepeng saat mendarat)
   Memakai Web Animations API, jadi jalan tanpa bergantung pada file CSS.
   - DURASI : makin kecil makin cepat (ms)  - JEDA : selisih antar huruf (ms)
   - Arahkan kursor / ketuk huruf untuk membuatnya loncat sendiri
   ===================================================== */
var DURASI = 2000, JEDA = 90;
var LONCAT = [
  { transform: "translateY(0) rotate(0deg) scale(1,1)", offset: 0 },
  { transform: "translateY(-.14em) rotate(-8deg) scale(.94,1.1)", offset: .14 },
  { transform: "translateY(-.26em) rotate(-5deg) scale(.96,1.08)", offset: .22 },
  { transform: "translateY(0) rotate(0deg) scale(1.14,.86)", offset: .34 },
  { transform: "translateY(-.1em) rotate(7deg) scale(1,1)", offset: .44 },
  { transform: "translateY(0) rotate(0deg) scale(1,1)", offset: .54 },
  { transform: "translateY(0) rotate(0deg) scale(1,1)", offset: 1 }
];
function wiggle(s, i) {
  if (!s.animate) return;
  s.style.transformOrigin = "50% 88%";
  s.animate(LONCAT, { duration: DURASI, delay: i * JEDA, iterations: Infinity, easing: "ease-in-out" });
  s.addEventListener("pointerenter", function () {
    s.animate(LONCAT.slice(0, 6).map(function (k, n) { return { transform: k.transform, offset: n / 5 }; }), { duration: 600, easing: "ease-out" });
  });
}
function splitLetters(el, colors, offset) {
  var txt = el.textContent, n = offset || 0;
  el.textContent = "";
  txt.split("").forEach(function (ch) {
    var s = document.createElement("span");
    s.className = "ch";
    s.textContent = ch;
    var i = idx++;
    s.style.setProperty("--i", i);
    if (colors && ch !== " ") s.style.color = colors[n++ % colors.length];
    el.appendChild(s);
    if (ch !== " ") wiggle(s, i);
  });
}
splitLetters(document.querySelector(".title .l1"), null);
splitLetters(document.getElementById("t1"), LETTER_COLORS, 0);
splitLetters(document.getElementById("t2"), LETTER_COLORS, 3);

/* =====================================================
   TOMBOL START GAME -> buka slide 2
   ===================================================== */
document.getElementById("start").onclick = function () { location.href = "slide2.html"; };