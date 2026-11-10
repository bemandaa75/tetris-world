/* =====================================================
   SLIDE 6 — GAME TETRIS SEDERHANA (MODE CHALLENGE)
   Menang kalau berhasil membersihkan TARGET baris. Tidak ada skor.
   Background : bg/bg6 (png / jpg / jpeg / webp)
   Tombol NEXT di bawah -> slide7.html (Letter Box, nanti kita buat)
   Kecepatan, skor, dan warna blok bisa diubah di bagian ATURAN
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

(function () {
    /* ---------- ATURAN ---------- */
    var COLS = 8, ROWS = 10, S = 60;                    /* ukuran papan: lebar x tinggi (kotak besar) */
    var BISA_KALAH = false;                             /* false = papan penuh otomatis dibersihkan, jadi pasti bisa menang */
    var TARGET = 5;                                     /* jumlah baris yang harus dibersihkan */
    function kecepatan(baris) { return Math.max(300, 900 - baris * 70); }   /* ms per turun, makin cepat tiap baris */
    var WARNA = { I: "#00d1ff", O: "#ffd400", T: "#a15cff", S: "#6dff3a", Z: "#ff3fa4", J: "#2f7bff", L: "#ff7a00" };
    var BENTUK = {
        I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
        O: [[1, 1], [1, 1]],
        T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
        S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
        Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
        J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
        L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]]
    };

    /* ---------- elemen ---------- */
    var cv = document.getElementById("board"), cx = cv.getContext("2d");
    var nv = document.getElementById("next"), nx = nv.getContext("2d");
    var ov = document.getElementById("ov"), ovt = document.getElementById("ovt"), ovp = document.getElementById("ovp"), ovb = document.getElementById("ovb");
    var ovn = document.getElementById("ovn"), elLn = document.getElementById("ln"), elBar = document.getElementById("bar");

    var grid, cur, nxt, bag = [], lines = 0, state = "ready", acc = 0, last = 0;

    /* ---------- logika ---------- */
    function take() {
        if (!bag.length) {
            bag = Object.keys(BENTUK);
            for (var i = bag.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = bag[i]; bag[i] = bag[j]; bag[j] = t; }
        }
        return bag.pop();
    }
    function piece(t) {
        var m = BENTUK[t].map(function (r) { return r.slice(); });
        return { t: t, m: m, x: Math.floor((COLS - m[0].length) / 2), y: 0 };
    }
    function collide(m, px, py) {
        for (var y = 0; y < m.length; y++) for (var x = 0; x < m[y].length; x++) if (m[y][x]) {
            var gx = px + x, gy = py + y;
            if (gx < 0 || gx >= COLS || gy >= ROWS) return true;
            if (gy >= 0 && grid[gy][gx]) return true;
        }
        return false;
    }
    function rotate(m) {
        var n = m.length, r = [];
        for (var y = 0; y < n; y++) { r.push([]); for (var x = 0; x < n; x++) r[y].push(0); }
        for (y = 0; y < n; y++) for (x = 0; x < n; x++) r[x][n - 1 - y] = m[y][x];
        return r;
    }
    function reset() {
        grid = []; for (var y = 0; y < ROWS; y++) { grid.push([]); for (var x = 0; x < COLS; x++) grid[y].push(null); }
        lines = 0; bag = [];
        nxt = piece(take()); spawn(); hud();
    }
    function spawn() {
        cur = nxt; nxt = piece(take());
        if (collide(cur.m, cur.x, cur.y)) { if (BISA_KALAH) gameOver(); else penuh(); }
    }
    /* papan penuh: bersihkan papan, progres baris tetap */
    function penuh() {
        state = "wait";
        for (var y = 0; y < ROWS; y++) for (var x = 0; x < COLS; x++) grid[y][x] = null;
        show("PAPAN PENUH!", "Tenang, papan dibersihkan.<br>Lanjut lagi ya ♥", null);
        setTimeout(function () { if (state === "wait") { state = "play"; ov.classList.add("hide"); acc = 0; } }, 1500);
    }
    function lock() {
        cur.m.forEach(function (row, y) { row.forEach(function (v, x) { if (v && cur.y + y >= 0) grid[cur.y + y][cur.x + x] = cur.t; }); });
        var n = 0;
        for (var y = ROWS - 1; y >= 0; y--) {
            if (grid[y].every(function (c) { return c; })) {
                grid.splice(y, 1);
                var e = []; for (var x = 0; x < COLS; x++) e.push(null);
                grid.unshift(e); n++; y++;
            }
        }
        if (n) lines += n;
        hud();
        if (lines >= TARGET) return win();
        spawn();
    }
    function move(dx) { if (state === "play" && !collide(cur.m, cur.x + dx, cur.y)) cur.x += dx; }
    function turn() {
        if (state !== "play") return;
        var r = rotate(cur.m), k = [0, -1, 1, -2, 2];
        for (var i = 0; i < k.length; i++) if (!collide(r, cur.x + k[i], cur.y)) { cur.m = r; cur.x += k[i]; return; }
    }
    function down(manual) {
        if (state !== "play") return;
        if (!collide(cur.m, cur.x, cur.y + 1)) cur.y++; else lock();
        acc = 0;
    }
    function drop() {
        if (state !== "play") return;
        while (!collide(cur.m, cur.x, cur.y + 1)) cur.y++;
        lock(); acc = 0;
    }
    function hud() {
        elLn.textContent = Math.min(lines, TARGET) + " / " + TARGET;
        elBar.style.width = Math.min(100, lines / TARGET * 100) + "%";
    }

    /* ---------- status permainan ---------- */
    function show(t, p, b, lanjut) {
        ovt.textContent = t; ovp.innerHTML = p;
        ovb.style.display = b ? "" : "none"; if (b) ovb.textContent = b;
        ovn.style.display = lanjut ? "" : "none";
        ov.classList.remove("hide");
    }
    function start() { reset(); state = "play"; ov.classList.add("hide"); acc = 0; }
    function gameOver() { state = "over"; show("GAME OVER", "Yah, papannya penuh.<br>Tapi tetap seru kan ♥", null, true); }
    function win() { state = "win"; show("KAMU MENANG! 🎉", "Berhasil membersihkan " + TARGET + " baris!<br>Hebat banget ♥", null, true); }
    function pause() {
        if (state === "play") { state = "pause"; show("JEDA", "Tekan lanjut untuk meneruskan", "LANJUT ▶"); }
        else if (state === "pause") { state = "play"; ov.classList.add("hide"); }
    }
    ovb.onclick = function () { if (state === "pause") pause(); else start(); };
    ovn.onclick = function () { location.href = "slide7.html"; };

    /* ---------- gambar ---------- */
    function cell(c, x, y, col, s, a) {
        var px = x * s, py = y * s, k = s / 30, e = 3 * k, h = 5 * k;     /* tebal garis & kilau ikut ukuran kotak */
        c.globalAlpha = a || 1;
        c.fillStyle = col; c.fillRect(px, py, s, s);
        c.fillStyle = "rgba(255,255,255,.45)"; c.fillRect(px + e, py + e, s - 2 * e, h); c.fillRect(px + e, py + e, h, s - 2 * e);
        c.fillStyle = "rgba(0,0,0,.22)"; c.fillRect(px + e, py + s - e - h, s - 2 * e, h); c.fillRect(px + s - e - h, py + e, h, s - 2 * e);
        c.strokeStyle = "#1a1a5e"; c.lineWidth = e; c.strokeRect(px + e / 2, py + e / 2, s - e, s - e);
        c.globalAlpha = 1;
    }
    function draw() {
        cx.fillStyle = "#17154f"; cx.fillRect(0, 0, cv.width, cv.height);
        cx.strokeStyle = "rgba(255,255,255,.07)"; cx.lineWidth = 1;
        for (var i = 1; i < COLS; i++) { cx.beginPath(); cx.moveTo(i * S, 0); cx.lineTo(i * S, ROWS * S); cx.stroke(); }
        for (i = 1; i < ROWS; i++) { cx.beginPath(); cx.moveTo(0, i * S); cx.lineTo(COLS * S, i * S); cx.stroke(); }
        if (!grid) return;
        grid.forEach(function (row, y) { row.forEach(function (t, x) { if (t) cell(cx, x, y, WARNA[t], S); }); });
        if (state === "play" || state === "pause") {
            var gy = cur.y; while (!collide(cur.m, cur.x, gy + 1)) gy++;
            cur.m.forEach(function (row, y) { row.forEach(function (v, x) { if (v) cell(cx, cur.x + x, gy + y, WARNA[cur.t], S, .22); }); });
            cur.m.forEach(function (row, y) { row.forEach(function (v, x) { if (v) cell(cx, cur.x + x, cur.y + y, WARNA[cur.t], S); }); });
        }
        nx.clearRect(0, 0, 120, 120);
        if (nxt) {
            var m = nxt.m, w = m[0].length, off = (4 - w) / 2, cs = 30;
            m.forEach(function (row, y) { row.forEach(function (v, x) { if (v) cell(nx, off + x, (4 - m.length) / 2 + y - (nxt.t === "I" ? 0.5 : 0), WARNA[nxt.t], cs); }); });
        }
    }
    function frame(t) {
        if (state === "play") { acc += t - last; if (acc > kecepatan(lines)) { acc = 0; down(false); } }
        last = t; draw(); requestAnimationFrame(frame);
    }
    requestAnimationFrame(function (t) { last = t; frame(t); });

    /* ---------- kontrol keyboard ---------- */
    document.addEventListener("keydown", function (e) {
        var k = e.key;
        if (state !== "play" && state !== "pause" && (k === "Enter" || k === " ")) { e.preventDefault(); start(); return; }
        if (k === "p" || k === "P" || k === "Escape") { pause(); return; }
        if (state !== "play") return;
        if (k === "ArrowLeft") { e.preventDefault(); move(-1); }
        else if (k === "ArrowRight") { e.preventDefault(); move(1); }
        else if (k === "ArrowDown") { e.preventDefault(); down(true); }
        else if (k === "ArrowUp" || k === "x" || k === "X") { e.preventDefault(); turn(); }
        else if (k === " ") { e.preventDefault(); drop(); }
    });

    /* ---------- kontrol sentuh (tahan = ulang) ---------- */
    var ACT = { left: function () { move(-1); }, right: function () { move(1); }, down: function () { down(true); }, rot: turn, drop: drop };
    document.querySelectorAll("#pad button").forEach(function (b) {
        var f = ACT[b.dataset.act], t1, t2, rep = b.dataset.act === "left" || b.dataset.act === "right" || b.dataset.act === "down";
        function stop() { clearTimeout(t1); clearInterval(t2); }
        b.addEventListener("pointerdown", function (e) {
            e.preventDefault(); f();
            if (rep) t1 = setTimeout(function () { t2 = setInterval(f, 90); }, 220);
        });
        ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) { b.addEventListener(ev, stop); });
    });

    /* geser jari di papan: kiri-kanan = geser, ketuk = putar */
    var sx, sy, sxl;
    cv.addEventListener("pointerdown", function (e) { sx = sxl = e.clientX; sy = e.clientY; });
    cv.addEventListener("pointermove", function (e) {
        if (sx == null || state !== "play") return;
        var step = cv.getBoundingClientRect().width / COLS;
        while (e.clientX - sxl > step) { move(1); sxl += step; }
        while (sxl - e.clientX > step) { move(-1); sxl -= step; }
    });
    cv.addEventListener("pointerup", function (e) {
        if (sx != null && state === "play" && Math.abs(e.clientX - sx) < 8 && Math.abs(e.clientY - sy) < 8) turn();
        sx = null;
    });

    /* auto jeda kalau tab ditinggal */
    document.addEventListener("visibilitychange", function () { if (document.hidden && state === "play") pause(); });

    /* tombol NEXT -> slide 7 */
    document.getElementById("nextbtn").onclick = function () { location.href = "slide7.html"; };

    /* kalau ada error, tampilkan di layar supaya mudah dicari */
    window.addEventListener("error", function (e) { show("ERROR", String(e.message), "MULAI ▶"); });

    reset(); state = "ready"; show("TETRIS", "Challenge: bersihkan <b>" + TARGET + " baris</b> untuk menang!", "MULAI ▶");
})();