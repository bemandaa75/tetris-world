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
   PLAYER COLLECTION
   ===================================================== */
var SIL = '<svg viewBox="0 0 100 100"><use href="#sil"/></svg>';
var hand = document.getElementById("hand"), tapped = false;

function makeCard(id, name, extra, cls) {
  var d = document.createElement("div");
  d.className = "card" + (cls ? " " + cls : "");
  d.innerHTML = SIL + (extra || "") + '<div class="nm">' + name + "</div>";
  pic(d, "foto/" + id);
  /* pic() menambah background; tandai 'has' saat foto ada */
  var chk = new MutationObserver(function () { if (d.style.backgroundImage) d.classList.add("has"); });
  chk.observe(d, { attributes: true, attributeFilter: ["style"] });
  d.onclick = function () { location.href = "slide3.html?id=" + id; };
  return d;
}

document.getElementById("lead").appendChild(
  makeCard("kakak", KAKAK.n, '<div class="crown">👑</div><div class="badge">PENDAMPING</div>', "kakak")
);
var gridEl = document.getElementById("players");
ANAK.forEach(function (a, i) { gridEl.appendChild(makeCard("anak" + (i + 1), a.n)); });

/* tangan penunjuk di kartu anak pertama sampai ada yang diketuk */
function showHand() {
  if (tapped) return;
  setTimeout(function () {
    var c = gridEl.children[2]; if (!c || tapped) return;
    var r = c.getBoundingClientRect();
    hand.style.left = (r.right - r.width * 0.45) + "px";
    hand.style.top = (r.bottom - r.height * 0.4) + "px";
    hand.classList.add("on");
  }, 700);
}

showHand();

/* tombol NEXT -> slide 4 (peta journey) */
document.getElementById("next").onclick = function () { location.href = "slide4.html"; };