/* =====================================================
   ROTATE.JS — minta pengguna HP memutar ke landscape
   Website TIDAK bisa memaksa HP berputar sendiri (itu diatur HP-nya),
   jadi saat HP dipegang tegak, muncul layar petunjuk "putar HP".
   Kalau HP sudah landscape, layar ini hilang otomatis.
   - Batas lebar HP : ubah 600px di bawah (tablet tidak terkena)
   - Tombol "Tetap di mode tegak" menyembunyikannya sampai tab ditutup
   ===================================================== */
(function () {
  var KEY = "tetris26:rotasi";
  var css =
    "#rotasi{display:none;position:fixed;inset:0;z-index:99999;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:24px;" +
    "background:linear-gradient(160deg,#1b1464,#5b2aa8 55%,#c94fae);color:#fff;font-family:Nunito,system-ui,sans-serif}" +
    "#rotasi .ph{font-size:76px;line-height:1;display:inline-block;filter:drop-shadow(0 4px 0 #1a1a5e);animation:rotasi 2.6s ease-in-out infinite}" +
    "@keyframes rotasi{0%,20%{transform:rotate(0)}55%,100%{transform:rotate(-90deg)}}" +
    "#rotasi h2{font:400 30px/1.15 'Lilita One',Nunito,sans-serif;color:#ffd400;text-shadow:0 3px 0 #1a1a5e}" +
    "#rotasi p{font-weight:800;font-size:16px;line-height:1.5;max-width:300px}" +
    "#rotasi small{font-weight:700;font-size:13px;opacity:.85;max-width:300px;line-height:1.5}" +
    "#rotasi button{margin-top:6px;font:800 13px Nunito,sans-serif;color:#fff;background:transparent;border:2px solid rgba(255,255,255,.6);border-radius:999px;padding:.5em 1.2em;cursor:pointer}" +
    "@media (orientation:portrait) and (max-width:600px){#rotasi{display:flex}}" +
    "#rotasi.off{display:none!important}";

  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var d = document.createElement("div");
  d.id = "rotasi";
  d.innerHTML =
    '<span class="ph">📱</span>' +
    "<h2>Putar HP kamu dulu ya ♥</h2>" +
    "<p>Website ini paling pas dilihat dalam mode <b>landscape</b> (HP dimiringkan).</p>" +
    "<small>Kalau layar tidak mau berputar, matikan dulu “Kunci rotasi / Auto-rotate” di pengaturan cepat HP.</small>" +
    '<button type="button">Tetap di mode tegak</button>';
  document.body.appendChild(d);

  try { if (sessionStorage.getItem(KEY)) d.classList.add("off"); } catch (e) {}
  d.querySelector("button").onclick = function () {
    d.classList.add("off");
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
  };
})();