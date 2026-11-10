/* =====================================================
   SLIDE 4 — OUR JOURNEY (PETA)
   Background : bg/bg4 (png / jpg / jpeg / webp)
   Data chapter diambil dari data.js (CHAPTERS)
   Klik pulau -> slide5.html?id=<key chapter>

   FOTO/LOGO TIAP ACARA (di atas pulau): folder logo/
     logo/maba        -> Welcoming Maba
     logo/chapter1    -> Chapter 1
     logo/chapter2    -> Chapter 2
     logo/connection  -> Connection Chapter
     logo/next        -> Next Chapter
   (png / jpg / jpeg / webp, bebas). Kalau belum ada, tampil emoji cadangan dari data.js
   ===================================================== */
var EXTS = ["png", "jpg", "jpeg", "webp"];

function pic(el, base) {
    var i = 0;
    (function next() {
        if (i >= EXTS.length) return;
        var u = base + "." + EXTS[i++], im = new Image();
        im.onload = function () { el.style.backgroundImage = 'url("' + u + '")'; el.classList.add("has"); };
        im.onerror = next;
        im.src = u;
    })();
}
document.querySelectorAll("[data-bg]").forEach(function (w) { pic(w, "bg/" + w.dataset.bg); });

/* posisi pulau di peta (persen) — ubah kalau mau geser */
var POS = [[10, 12], [30, 34], [50, 18], [70, 38], [90, 10]];   /* [kiri%, atas%] */
var FLAGS = ["#ff3fa4", "#ffd400", "#00d1ff", "#ff7a00", "#7a1fff"];  /* warna bendera */

var map = document.getElementById("map");
CHAPTERS.forEach(function (c, i) {
    var d = document.createElement("div");
    d.className = "isl";
    d.style.left = POS[i % POS.length][0] + "%";
    d.style.top = POS[i % POS.length][1] + "%";
    d.style.setProperty("--fl", FLAGS[i % FLAGS.length]);
    d.innerHTML =
        '<div class="land"><div class="logo"><span>' + c.icon + '</span></div><div class="base"></div><div class="top"></div></div>' +
        '<span class="lab">' + c.label + "</span>";
    pic(d.querySelector(".logo"), "logo/" + c.key);
    d.onclick = function () { location.href = "slide5.html?id=" + c.key; };
    map.appendChild(d);
});

/* tombol NEXT -> slide 6 (game Tetris) */
document.getElementById("next").onclick = function () { location.href = "slide6.html"; };