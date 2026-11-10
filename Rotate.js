/* =====================================================
   ROTATE.JS — minta pengguna HP memutar ke landscape
   Website TIDAK bisa memaksa HP berputar sendiri (itu diatur HP-nya),
   jadi saat HP dipegang tegak, muncul layar petunjuk "putar HP".
   Deteksi HP memakai ukuran layar FISIK (screen.width), jadi tetap jalan
   walaupun browser HP memakai mode "Desktop site".
   - BATAS_HP : sisi terpendek layar yang dianggap HP (px). Tablet tidak terkena.
   - Tombol "Tetap di mode tegak" menyembunyikannya sampai tab ditutup
   - TES: tambahkan ?rotasi=1 di alamat (contoh: alamat-web.vercel.app/?rotasi=1)
     untuk memaksa layar petunjuk tampil di perangkat apa pun, termasuk laptop.
   - CEK : tambahkan ?rotasi=cek untuk menampilkan kotak info ukuran layar (untuk cari penyebab kalau tidak muncul).
   ===================================================== */
(function () {
    var BATAS_HP = 600, KEY = "tetris26:rotasi";

    var css =
        "#rotasi{display:none;position:fixed;inset:0;z-index:99999;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:24px;" +
        "background:linear-gradient(160deg,#1b1464,#5b2aa8 55%,#c94fae);color:#fff;font-family:Nunito,system-ui,sans-serif}" +
        "#rotasi.on{display:flex}" +
        "#rotasi .ph{font-size:76px;line-height:1;display:inline-block;filter:drop-shadow(0 4px 0 #1a1a5e);animation:rotasi 2.6s ease-in-out infinite}" +
        "@keyframes rotasi{0%,20%{transform:rotate(0)}55%,100%{transform:rotate(-90deg)}}" +
        "#rotasi h2{font:400 30px/1.15 'Lilita One',Nunito,sans-serif;color:#ffd400;text-shadow:0 3px 0 #1a1a5e}" +
        "#rotasi p{font-weight:800;font-size:16px;line-height:1.5;max-width:300px}" +
        "#rotasi small{font-weight:700;font-size:13px;opacity:.85;max-width:300px;line-height:1.5}" +
        "#rotasi button{margin-top:6px;font:800 13px Nunito,sans-serif;color:#fff;background:transparent;border:2px solid rgba(255,255,255,.6);border-radius:999px;padding:.5em 1.2em;cursor:pointer}";
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

    var paksa = /[?&]rotasi=1/.test(location.search);                     /* mode tes */
    var cekMode = /[?&]rotasi=cek/.test(location.search);                 /* mode info */
    var dismissed = false;
    try { dismissed = !!sessionStorage.getItem(KEY); } catch (e) { }
    d.querySelector("button").onclick = function () {
        dismissed = true; paksa = false; d.classList.remove("on");
        try { sessionStorage.setItem(KEY, "1"); } catch (e) { }
    };

    var info = null;
    if (cekMode) {
        info = document.createElement("pre");
        info.style.cssText = "position:fixed;left:6px;top:6px;z-index:100000;margin:0;padding:8px 10px;background:#000;color:#0f0;font:12px/1.4 monospace;border-radius:8px;white-space:pre-wrap;max-width:92vw";
        document.body.appendChild(info);
    }

    function cek() {
        var tegak = window.innerHeight > window.innerWidth;                          /* sedang dipegang tegak */
        var kecil = Math.min(screen.width, screen.height) <= BATAS_HP;               /* layar fisik kecil */
        var sentuh = (window.matchMedia && matchMedia("(pointer:coarse)").matches) || navigator.maxTouchPoints > 0;
        var ua = /iPhone|iPod|Android.*Mobile|Mobile.*Safari/i.test(navigator.userAgent);
        var hp = kecil || (sentuh && ua);                                            /* dianggap HP */
        var tampil = paksa || (tegak && hp && !dismissed);
        d.classList.toggle("on", tampil);
        if (info) info.textContent =
            "rotate.js AKTIF\n" +
            "inner: " + innerWidth + " x " + innerHeight + "\n" +
            "screen: " + screen.width + " x " + screen.height + "\n" +
            "tegak: " + tegak + " | kecil: " + kecil + "\n" +
            "sentuh: " + sentuh + " | ua-hp: " + ua + "\n" +
            "dianggap HP: " + hp + " | ditutup: " + dismissed + "\n" +
            "TAMPIL: " + tampil;
    }
    cek();
    window.addEventListener("resize", cek);
    window.addEventListener("orientationchange", function () { setTimeout(cek, 200); });
})();