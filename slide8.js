/* =====================================================
   SLIDE 8 — CLOSING SCREEN
   Background : bg/bg8 (png / jpg / jpeg / webp)
   Tombol PLAY AGAIN -> kembali ke awal (index.html)
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

/* judul: tiap huruf bergerak bergantian */
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

["r1", "r2"].forEach(function (id) {
    var el = document.getElementById(id), txt = el.textContent;
    el.textContent = "";
    txt.split("").forEach(function (ch) {
        var s = document.createElement("span");
        s.className = "ch"; s.textContent = ch;
        var i = idx++;
        s.style.setProperty("--i", i);
        el.appendChild(s);
        if (ch !== " ") wiggle(s, i);
    });
});

/* konfeti balok tetris jatuh (ubah jumlah / warna di sini) */
var JUMLAH = 22, WARNA = ["#ff3fa4", "#ffd400", "#00d1ff", "#6dff3a", "#ff7a00", "#a15cff", "#2f7bff"];
var cf = document.getElementById("cf");
for (var i = 0; i < JUMLAH; i++) {
    var d = document.createElement("i"), s = 12 + Math.random() * 14;
    d.className = "cf";
    d.style.left = Math.random() * 100 + "%";
    d.style.width = d.style.height = s + "px";
    d.style.background = WARNA[i % WARNA.length];
    d.style.animationDuration = 6 + Math.random() * 7 + "s";
    d.style.animationDelay = -Math.random() * 10 + "s";
    d.style.setProperty("--rot", (Math.random() < .5 ? -1 : 1) * (180 + Math.random() * 360) + "deg");
    cf.appendChild(d);
}

/* PLAY AGAIN -> kembali ke slide 1 */
document.getElementById("again").onclick = function () { location.href = "index.html"; };