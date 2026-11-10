/* =====================================================
   SLIDE 3 — MEMBER DETAIL
   Data diambil dari data.js, orangnya dari alamat: slide3.html?id=anak1
   Background : bg/bg3 (png / jpg / jpeg / webp)
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

/* siapa yang ditampilkan */
var id = new URLSearchParams(location.search).get("id") || "kakak";
var m = id.match(/^anak(\d+)$/), data, badge, label;

if (m && ANAK[+m[1] - 1]) {
  var no = +m[1];
  data = ANAK[no - 1];
  badge = "👑 Player " + (no < 10 ? "0" : "") + no + " <span class=\"h\" style=\"color:#ff3fa4\">♡</span>";
  label = "Pesan dari Kakak:";
} else {
  id = "kakak";
  data = KAKAK;
  badge = "👑 Kakak Pendamping";
  label = KAKAK.l;
}

document.getElementById("badge").innerHTML = badge;
document.getElementById("nm").innerHTML = data.n + " <i>♡</i>";
document.getElementById("q").textContent = "“" + data.q + "”";
document.getElementById("lbl").textContent = label;
document.getElementById("msg").textContent = data.m;
document.title = "TETRIS – " + data.n;
pic(document.getElementById("ph"), "foto/" + id);

/* tombol ✕ (pojok kanan atas) dan tombol Esc -> kembali ke slide 2 */
function back() { location.href = "slide2.html"; }
document.getElementById("xbtn").onclick = back;
document.addEventListener("keydown", function (e) { if (e.key === "Escape") back(); });