/*CSS
.b62-let{color:#d63384;font-weight:800;margin-right:6px}
.b62-sub{font-weight:700;margin:9px 0 3px}
.b62-seq{display:flex;align-items:center;flex-wrap:nowrap;overflow-x:auto;gap:4px;margin:7px 0;padding-bottom:4px}
.b62-seq .n{flex:0 0 auto;min-width:74px;padding:8px 5px;border-radius:9px;background:#ffd66b;font-weight:800;font-size:16px;text-align:center}
.b62-seq .ar{flex:0 0 auto;color:#2aa7de;font-size:20px;font-weight:800}
.b62-seq .qin{width:66px !important;height:32px;font-size:15px;padding:0 2px}
.b62-ds{display:flex;flex-wrap:wrap;gap:2px 26px;margin:6px 0}
.b62-ds > div{min-width:250px;font-size:18px;font-weight:700;line-height:2.1}
.b62-opts{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 24px;margin:6px 0;font-size:18px;font-weight:700}
.b62-opts b{color:#d63384;margin-right:5px}
.b62-abc{margin:4px 0;font-size:17px;font-weight:700;line-height:1.6}
.b62-abc b{color:#d63384;margin-right:5px}
.b62-bub{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:8px 0}
.b62-bub > div{flex:1 1 200px;max-width:280px;border:2.4px solid #9aa4b5;border-radius:16px;padding:8px 10px;text-align:center;font-weight:700;font-size:15px;background:#fff}
.b62-wide .picker{flex-wrap:wrap;justify-content:center;margin:6px 0 0}
.b62-wide .pk{width:auto;min-width:34px;padding:0 9px;font-size:14px}
.b62-art{width:100%;max-width:620px;height:auto;display:block;margin:6px auto}
.b62-art2{width:100%;max-width:340px;height:auto;display:block;margin:6px auto}
.b62-train{display:flex;align-items:flex-end;gap:4px;overflow-x:auto;padding-bottom:6px;margin:8px 0}
.b62-loco{flex:0 0 auto;width:74px;height:auto}
.b62-car{flex:0 0 auto;width:88px}
.b62-car .top{height:13px;border-radius:9px 9px 0 0}
.b62-car .bd{height:46px;display:grid;place-items:center;font-weight:800;font-size:15px;color:#1a1a1a;border-radius:0 0 5px 5px}
.b62-car .pill{background:#fff;border-radius:999px;padding:2px 7px}
.b62-car .wh{display:flex;justify-content:space-around;margin-top:-5px}
.b62-car .wh i{width:15px;height:15px;border-radius:50%;background:#41527e;display:block}
.b62-car .qin{width:70px !important;height:30px;font-size:14px;padding:0 2px}
.b62-wash{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b62-wash > div{flex:1 1 190px;max-width:270px;border:2.4px solid #7aa93c;border-radius:10px;padding:7px 8px;text-align:center;font-weight:800;font-size:15px;background:#eaf6d8}
.b62-wash b{display:block;color:#d63384;font-size:17px}
.b62-cars{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:6px 0}
.b62-cars > div{width:132px;text-align:center;font-weight:800}
.b62-cars svg{width:118px;height:auto;display:block;margin:0 auto}
CSS*/

/* ==================== BÀI 62: LUYỆN TẬP CHUNG
   (SGK tập 2 – tr.66, 67, 68, 69)
   luyện tập tr.66 : bài 1 (bảng viết số – đọc số), bài 2 (Số ? – dãy số),
                     bài 3 (ong vàng và các vườn hoa), bài 4 (Đ, S ?)
   luyện tập tr.67 : bài 1 (toa tàu cuối cùng), bài 2 (ô tô tìm chỗ rửa xe),
                     bài 3 (lượt nghe bài hát), bài 4 (ba bạn viết số lên bảng con)
   luyện tập tr.68 : bài 1 (số lớn nhất nằm ở vị trí nào), bài 2 (đàn ong)
   (phần trò chơi "Thả bóng vào rổ" tr.69 không phải bài tập đánh số)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như trong SGK: 51 254 */
ART.b62sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* làm tròn n đến hàng u — chỉ dùng số nguyên nên luôn chính xác */
ART.b62round = (n, u) => { const r = n % u; return n - r + (r * 2 >= u ? u : 0); };

/* viết số thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị */
ART.b62tong = n => {
  const out = [];
  [10000, 1000, 100, 10, 1].forEach(u => {
    const d = Math.floor(n / u) % 10;
    if (d) out.push(ART.b62sp(d * u));
  });
  return out.join(' + ');
};

/* ---- đọc số có năm chữ số (readNum của app chỉ đúng với số ≤ 1 000) ---- */
const B62_DV = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function b62Read3(n){
  if (n < 10) return B62_DV[n];
  if (n < 100){
    const c = Math.floor(n / 10), d = n % 10;
    const s = c === 1 ? 'mười' : B62_DV[c] + ' mươi';
    if (d === 0) return s;
    if (d === 1) return s + (c === 1 ? ' một' : ' mốt');
    if (d === 4) return s + (c === 1 ? ' bốn' : ' tư');
    if (d === 5) return s + ' lăm';
    return s + ' ' + B62_DV[d];
  }
  const t = Math.floor(n / 100), r = n % 100;
  const s = B62_DV[t] + ' trăm';
  if (r === 0) return s;
  if (r < 10) return s + ' linh ' + B62_DV[r];
  return s + ' ' + b62Read3(r);
}
function b62Read5(n){
  const ng = Math.floor(n / 1000), r = n % 1000;
  const s = b62Read3(ng) + ' nghìn';
  if (r === 0) return s;
  if (r < 10) return s + ' không trăm linh ' + B62_DV[r];
  if (r < 100) return s + ' không trăm ' + b62Read3(r);
  return s + ' ' + b62Read3(r);
}
function b62Alts5(n){
  let out = [b62Read5(n)];
  const swap = (arr, a, b) => arr.concat(arr.filter(s => s.includes(a)).map(s => s.split(a).join(b)));
  out = swap(out, ' mốt', ' một');
  out = swap(out, ' tư', ' bốn');
  out = swap(out, ' lăm', ' năm');
  out = swap(out, ' linh ', ' lẻ ');
  return [...new Set(out)];
}
/* ô nhập cách đọc số có năm chữ số (dùng chung kho ô nhập B của Q) */
function b62TxtBlank(q, n){
  q.B.push({a: b62Read5(n), alts: b62Alts5(n), text: true});
  return `<input class="qin qtxt" data-b="${q.B.length - 1}" placeholder="?">`;
}

/* ---- con ong ---- */
ART.b62Bee = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="-4" cy="-16" rx="22" ry="13" fill="#eaf4ff" stroke="#8fb4d6" stroke-width="2"
    transform="rotate(-28 -4 -16)"/>
  <ellipse cx="16" cy="-16" rx="20" ry="12" fill="#eaf4ff" stroke="#8fb4d6" stroke-width="2"
    transform="rotate(24 16 -16)"/>
  <ellipse cx="0" cy="4" rx="30" ry="20" fill="#f7c11e" stroke="#8a6210" stroke-width="2.4"/>
  <path d="M-6 -14v36M8 -13v34" stroke="#3a2c12" stroke-width="7" stroke-linecap="round"/>
  <circle cx="-26" cy="-2" r="12" fill="#3a2c12"/>
  <circle cx="-30" cy="-5" r="3.4" fill="#fff"/><circle cx="-22" cy="-5" r="3.4" fill="#fff"/>
  <circle cx="-30" cy="-5" r="1.6" fill="#1a1208"/><circle cx="-22" cy="-5" r="1.6" fill="#1a1208"/>
  <path d="M-30 -14l-6-9M-22 -14l3-10" stroke="#3a2c12" stroke-width="2.4" stroke-linecap="round"/>
</g>`;

/* ---- bông hoa nhỏ ---- */
ART.b62Flower = (x, y, c) => {
  let p = '';
  for (let i = 0; i < 6; i++){
    const a = Math.PI * i / 3;
    p += `<ellipse cx="${(x + 11 * Math.cos(a)).toFixed(1)}" cy="${(y + 11 * Math.sin(a)).toFixed(1)}"
      rx="7" ry="5" fill="${c}" transform="rotate(${(i * 60).toFixed(0)} ${(x + 11 * Math.cos(a)).toFixed(1)} ${(y + 11 * Math.sin(a)).toFixed(1)})"/>`;
  }
  return `<g>${p}<circle cx="${x}" cy="${y}" r="6" fill="#f7d34a" stroke="#c99a10" stroke-width="1.6"/>
    <path d="M${x} ${y + 16}v14" stroke="#4e8a34" stroke-width="3" stroke-linecap="round"/></g>`;
};

/* ---- ong vàng ở giữa, bốn vườn hoa ở bốn góc ---- */
ART.b62Vuon = list => {
  const OV = [
    {cx: 108, cy: 96, path: 'M288 176 Q222 138 176 116', lx: 236, ly: 116},
    {cx: 532, cy: 92, path: 'M352 176 Q424 138 466 112', lx: 408, ly: 112},
    {cx: 104, cy: 300, path: 'M288 214 Q220 258 172 278', lx: 232, ly: 284},
    {cx: 536, cy: 300, path: 'M352 214 Q426 258 470 280', lx: 412, ly: 286}
  ];
  const body = list.map((g, i) => {
    const o = OV[i];
    return `<path d="${o.path}" fill="none" stroke="${g.mau}" stroke-width="15"
        stroke-linecap="round"/>
      <ellipse cx="${o.cx}" cy="${o.cy}" rx="88" ry="58" fill="#fff" stroke="${g.mau}" stroke-width="3"/>
      <text x="${o.cx}" y="${o.cy - 22}" text-anchor="middle" font-size="14" font-weight="800"
        fill="${g.mau}">VƯỜN</text>
      <text x="${o.cx}" y="${o.cy - 5}" text-anchor="middle" font-size="14" font-weight="800"
        fill="${g.mau}">${g.ten.toUpperCase()}</text>
      ${ART.b62Flower(o.cx, o.cy + 22, g.mau)}
      <text x="${o.lx}" y="${o.ly}" text-anchor="middle" font-size="19" font-weight="800"
        fill="#1a1a1a" stroke="#fff" stroke-width="5" paint-order="stroke">${ART.b62sp(g.km)} m</text>`;
  }).join('');
  return `<svg viewBox="0 0 640 380" class="b62-art">${body}
    <ellipse cx="320" cy="204" rx="42" ry="16" fill="#8ecb5a"/>
    ${ART.b62Bee(320, 186, 1)}</svg>`;
};

/* ---- đầu tàu hoả ---- */
ART.b62Loco = () => `<svg viewBox="0 0 90 78" class="b62-loco">
  <path d="M22 30h14v26H22z" fill="#e8482f" stroke="#a52c18" stroke-width="2"/>
  <rect x="14" y="18" width="9" height="16" rx="2" fill="#5fbb46" stroke="#357a24" stroke-width="2"/>
  <path d="M36 22h40v34H36z" fill="#e8482f" stroke="#a52c18" stroke-width="2"/>
  <rect x="44" y="28" width="24" height="16" rx="2" fill="#cfe6f7" stroke="#3d6f9e" stroke-width="2"/>
  <path d="M8 56h72v6H8z" fill="#c33a20"/>
  <circle cx="26" cy="66" r="9" fill="#41527e"/><circle cx="26" cy="66" r="4" fill="#9aa6c4"/>
  <circle cx="56" cy="66" r="9" fill="#41527e"/><circle cx="56" cy="66" r="4" fill="#9aa6c4"/>
  <circle cx="76" cy="68" r="7" fill="#41527e"/>
</svg>`;

/* ---- ô tô con ---- */
ART.b62Car = (col, label) => `<svg viewBox="0 0 150 84">
  <path d="M18 56q6-26 22-30h34q16 6 28 26" fill="${col}" stroke="#5b4a58" stroke-width="2.4"/>
  <path d="M40 30h22v20H36z" fill="#cfe6f7" stroke="#5b4a58" stroke-width="2"/>
  <path d="M68 30h14q10 5 16 20H68z" fill="#cfe6f7" stroke="#5b4a58" stroke-width="2"/>
  <rect x="8" y="52" width="134" height="16" rx="7" fill="${col}" stroke="#5b4a58" stroke-width="2.4"/>
  <rect x="46" y="52" width="58" height="16" rx="5" fill="#fff"/>
  <text x="75" y="65" text-anchor="middle" font-size="15" font-weight="800" fill="#1a1a1a">${label}</text>
  <circle cx="38" cy="70" r="10" fill="#4a4a55"/><circle cx="38" cy="70" r="4" fill="#b9bcc9"/>
  <circle cx="112" cy="70" r="10" fill="#4a4a55"/><circle cx="112" cy="70" r="4" fill="#b9bcc9"/>
</svg>`;

/* ---- tổ ong ---- */
ART.b62Hive = n => `<svg viewBox="0 0 340 200" class="b62-art2">
  <rect x="6" y="6" width="328" height="188" rx="10" fill="#bfe6f7"/>
  <path d="M6 150q60-16 120 2t208-6v42q0 10-10 10H16q-10 0-10-10z" fill="#eaf7ff"/>
  <path d="M18 6h34v188H18z" fill="#7a5a34"/>
  <path d="M40 60q46-14 78 6" fill="none" stroke="#7a5a34" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="60" cy="34" rx="42" ry="26" fill="#4e9b34"/>
  <ellipse cx="112" cy="30" rx="34" ry="21" fill="#5fbb46"/>
  <g>
    <ellipse cx="104" cy="98" rx="40" ry="44" fill="#f4c331" stroke="#c1900f" stroke-width="2.4"/>
    <path d="M66 82h76M64 98h80M68 116h72" stroke="#c1900f" stroke-width="2.4"/>
    <ellipse cx="104" cy="140" rx="10" ry="6" fill="#8a6210"/>
    <ellipse cx="54" cy="94" rx="18" ry="22" fill="#f4c331" stroke="#c1900f" stroke-width="2"/>
  </g>
  ${ART.b62Bee(196, 96, .62)}${ART.b62Bee(252, 130, .48)}${ART.b62Bee(300, 108, .42)}
  <g><rect x="176" y="12" width="152" height="46" rx="10" fill="#fff" stroke="#9aa4b5" stroke-width="2.4"/>
    <path d="M196 58l-8 16 22-16z" fill="#fff" stroke="#9aa4b5" stroke-width="2.4"/>
    <text x="252" y="32" text-anchor="middle" font-size="15" font-weight="700" fill="#1a1a1a">Xin chào</text>
    <text x="252" y="50" text-anchor="middle" font-size="15" font-weight="700" fill="#1a1a1a">${ART.b62sp(n)} anh em!</text>
  </g>
</svg>`;

/* ---- hình vuông và hình tròn cắt nhau, bốn số ở bốn vị trí ---- */
ART.b62Hinh = v => `<svg viewBox="0 0 400 310" class="b62-art2">
  <rect x="150" y="26" width="204" height="186" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <circle cx="176" cy="200" r="88" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <text x="66" y="118" text-anchor="middle" font-size="18" font-weight="800" fill="#1a1a1a">${ART.b62sp(v.ngoai)}</text>
  <text x="284" y="76" text-anchor="middle" font-size="18" font-weight="800" fill="#1a1a1a">${ART.b62sp(v.vuong)}</text>
  <text x="204" y="176" text-anchor="middle" font-size="18" font-weight="800" fill="#1a1a1a">${ART.b62sp(v.giao)}</text>
  <text x="142" y="256" text-anchor="middle" font-size="18" font-weight="800" fill="#1a1a1a">${ART.b62sp(v.tron)}</text>
</svg>`;

BANKS.b62 = [

/* ===== tr.66 – Bài 1 (luyện tập 1): Hoàn thành bảng sau ===== */
() => {
  const q = Q(1, 'Hoàn thành bảng sau.');
  const sp = ART.b62sp;
  const ns = [];
  for (let g = 0; g < 80 && ns.length < 3; g++){
    const v = R(10, 99) * 1000 + R(1, 999);
    if (!ns.includes(v)) ns.push(v);
  }
  while (ns.length < 3) ns.push(51254 + ns.length * 1111);
  const n4 = R(10, 99) * 1000 + R(1, 9) * 100;      /* số tròn trăm */
  const rows = [
    `<tr><td>${sp(ns[0])}</td><td>${b62TxtBlank(q, ns[0])}</td></tr>`,
    `<tr><td>${q.num(ns[1])}</td><td>${b62Read5(ns[1])}</td></tr>`,
    `<tr><td>${sp(ns[2])}</td><td>${b62TxtBlank(q, ns[2])}</td></tr>`,
    `<tr><td>${q.num(n4)}</td><td>${b62Read5(n4)}</td></tr>`
  ];
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Viết số</th><th>Đọc số</th></tr>${rows.join('')}</table></div>`,
    `${sp(ns[0])} đọc là ${b62Read5(ns[0])};  ${sp(ns[2])} đọc là ${b62Read5(ns[2])}`);
},

/* ===== tr.66 – Bài 2 (luyện tập 1): Số ? (dãy số) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const sp = ART.b62sp;
  const mk = (start, step, hide) => {
    const vals = [0, 1, 2, 3, 4].map(i => start + i * step);
    return '<div class="b62-seq">' + vals.map((v, i) =>
      (i ? '<span class="ar">&rarr;</span>' : '')
      + `<span class="n">${hide.includes(i) ? q.num(v) : sp(v)}</span>`).join('') + '</div>';
  };
  const a = R(60, 79) * 1000 + R(0, 95) * 10;        /* bước 10 */
  const b = R(40, 59) * 1000 + R(0, 5) * 100;        /* bước 100 */
  const c = R(70, 90) * 1000;                        /* bước 1 000 */
  const html = '<div class="b62-sub">a)</div>' + mk(a, 10, [3, 4])
    + '<div class="b62-sub">b)</div>' + mk(b, 100, [2, 4])
    + '<div class="b62-sub">c)</div>' + mk(c, 1000, [1, 4]);
  return q.done(html,
    `a) đếm thêm 10;  b) đếm thêm 100;  c) đếm thêm 1 000`);
},

/* ===== tr.66 – Bài 3 (luyện tập 1): ong vàng và các vườn hoa ===== */
() => {
  const q = Q(3, 'Khoảng cách từ vị trí ong vàng đến các vườn hoa được cho như hình sau:');
  const sp = ART.b62sp;
  const TEN = ['hoa hồng', 'hoa lan', 'hoa cúc', 'hoa hướng dương'];
  const MAU = ['#e8552f', '#e8478f', '#2aa7de', '#f0a027'];
  const km = [];
  for (let g = 0; g < 200 && km.length < 4; g++){
    const v = R(20, 49) * 1000 + R(0, 99) * 10;
    if (!km.includes(v)) km.push(v);
  }
  while (km.length < 4){
    let v = 20000;
    for (let t = 0; t < 60 && km.includes(v); t++) v += 130;
    km.push(v);
  }
  const list = TEN.map((ten, i) => ({ten, mau: MAU[i], km: km[i]}));
  const up = km.slice().sort((x, y) => x - y);
  const xa = TEN[km.indexOf(up[3])], gan = TEN[km.indexOf(up[0])];
  const html = ART.b62Vuon(list)
    + `<div class="b62-sub">Từ vị trí ong vàng đến vườn hoa nào xa nhất?
        Từ vị trí ong vàng đến vườn hoa nào gần nhất?</div>
      <div class="fill-line b62-wide">Xa nhất: vườn ${q.pick(xa, TEN)}</div>
      <div class="fill-line b62-wide">Gần nhất: vườn ${q.pick(gan, TEN)}</div>`;
  return q.done(html,
    `${up.map(sp).join(' m < ')} m nên vườn ${xa} xa nhất, vườn ${gan} gần nhất.`);
},

/* ===== tr.67 – Bài 4 (luyện tập 1): Đ, S ? ===== */
() => {
  const q = Q(4, '<span class="tag">Đ, S</span> ?');
  const sp = ART.b62sp;
  const rows = [];
  /* a) số có năm chữ số so với số có bốn chữ số */
  {
    const x = R(10000, 99999), y = R(1000, 9999), s = pick(['>', '<']);
    rows.push({l: sp(x), r: sp(y), s, a: s === '>' ? 'Đ' : 'S'});
  }
  /* b) số có năm chữ số so với số tròn chục nghìn */
  {
    const x = R(1, 8) * 10000 + R(1, 9) * 1000 + R(0, 999);
    const y = R(1, 9) * 10000, s = pick(['>', '<']);
    const dung = x > y ? '>' : '<';
    rows.push({l: sp(x), r: sp(y), s, a: s === dung ? 'Đ' : 'S'});
  }
  /* c) tổng của số tròn nghìn và số tròn trăm so với một số tròn nghìn */
  {
    const A = R(1, 8) * 1000, B = R(1, 9) * 100, C = R(1, 9) * 1000;
    const s = pick(['>', '<']);
    const dung = A + B > C ? '>' : '<';
    rows.push({l: `${sp(A)} + ${B}`, r: sp(C), s, a: s === dung ? 'Đ' : 'S'});
  }
  /* d) hiệu của số tròn trăm */
  {
    const hn = R(1, 9), tr = R(1, 9);
    const X = hn * 1000 + tr * 100, Y = tr * 100, dung = hn * 1000;
    const ok = R(0, 1) === 1;
    const kq = ok ? dung : dung + pick([100, 200, 1000]);
    rows.push({l: `${sp(X)} &minus; ${Y}`, r: sp(kq), s: '=', a: ok ? 'Đ' : 'S'});
  }
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = '<div class="b62-ds">' + rows.map((r, i) =>
    `<div><span class="b62-let">${L[i]}</span>${r.l}
      <span class="op">${r.s === '>' ? '&gt;' : r.s === '<' ? '&lt;' : '='}</span> ${r.r}
      ${q.pick(r.a, ['Đ', 'S'])}</div>`).join('') + '</div>';
  return q.done(html, rows.map((r, i) =>
    `${L[i]} ${r.a === 'Đ' ? 'đúng' : 'sai'}`).join(';  '));
},

/* ===== tr.67 – Bài 1 (luyện tập 2): Toa tàu cuối cùng ghi số nào? ===== */
() => {
  const q = Q(1, 'Toa tàu cuối cùng ghi số nào?');
  const sp = ART.b62sp;
  const st = R(1, 5) * 10000;
  const vals = [0, 1, 2, 3, 4, 5].map(i => st + i * 10000);
  const COL = ['#8cc63f', '#f7d117', '#f5911e', '#5ec8c8', '#f26fa0', '#f0703a'];
  const car = (i) => `<div class="b62-car">
      <div class="top" style="background:${COL[i]}"></div>
      <div class="bd" style="background:${COL[i]}">${
        i < 3 ? `<span class="pill">${sp(vals[i])}</span>`
        : i === 5 ? q.num(vals[5]) : ''}</div>
      <div class="wh"><i></i><i></i><i></i></div></div>`;
  const html = `<div class="b62-train">${ART.b62Loco()}${[0, 1, 2, 3, 4, 5].map(car).join('')}</div>`;
  return q.done(html,
    `Các toa tàu ghi số đếm thêm 10 000: ${vals.map(sp).join(', ')}. `
    + `Vậy toa tàu cuối cùng ghi số ${sp(vals[5])}.`);
},

/* ===== tr.67 – Bài 2 (luyện tập 2): ô tô tìm chỗ rửa xe ===== */
() => {
  const q = Q(2, 'Mỗi ô tô sẽ đến chỗ rửa xe ghi biểu thức có giá trị là số ghi trên ô tô đó. '
    + 'Tìm chỗ rửa cho mỗi ô tô.');
  const sp = ART.b62sp;
  const vals = [];
  for (let g = 0; g < 200 && vals.length < 3; g++){
    const v = R(2, 4) * 10000 + R(1, 9) * 1000 + R(1, 9) * 100 + R(1, 9) * 10 + R(0, 9);
    if (!vals.includes(v)) vals.push(v);
  }
  while (vals.length < 3){
    let v = 28716;
    for (let t = 0; t < 60 && vals.includes(v); t++) v += 129;
    vals.push(v);
  }
  const L = ['A', 'B', 'C'];
  const tram = vals.slice().sort(() => Math.random() - .5);     /* thứ tự các chỗ rửa xe */
  const xe = vals.slice().sort(() => Math.random() - .5);       /* thứ tự các ô tô */
  const COL = ['#e8483f', '#5ec2e8', '#c07ce0'];
  const html = '<div class="b62-wash">' + tram.map((v, i) =>
      `<div><b>${L[i]}</b>${ART.b62tong(v)}</div>`).join('') + '</div>'
    + '<div class="b62-cars">' + xe.map((v, i) =>
      `<div>${ART.b62Car(COL[i], sp(v))}${q.pick(L[tram.indexOf(v)], L)}</div>`).join('') + '</div>';
  return q.done(html, xe.map(v =>
    `${sp(v)} = ${ART.b62tong(v)} nên đến chỗ rửa ${L[tram.indexOf(v)]}`).join(';  '));
},

/* ===== tr.67 – Bài 3 (luyện tập 2): lượt nghe bài hát ===== */
() => {
  const q = Q(3, '');
  const sp = ART.b62sp;
  const n = R(10, 98) * 1000 + R(1, 999);
  const duoi = Math.floor(n / 1000) * 1000, tren = duoi + 1000;
  const tram = Math.floor(n / 100) % 10;
  const ai = tram >= 5 ? 'Nam' : 'Việt';
  const html = `<div class="b62-bub">
      <div>Bài hát có gần ${sp(tren)} lượt nghe.<br><b>Nam</b></div>
      <div>Không! Bài hát này chỉ có khoảng ${sp(duoi)} lượt nghe thôi.<br><b>Việt</b></div>
    </div>
    <p class="wordq">Biết rằng bài hát có ${sp(n)} lượt nghe.
      Nam và Việt làm tròn số đến hàng nghìn, ai đã làm tròn đúng?</p>
    <div class="fill-line b62-wide">Bạn ${q.pick(ai, ['Nam', 'Việt'])} đã làm tròn đúng.</div>`;
  return q.done(html,
    `${sp(n)} có chữ số hàng trăm là ${tram} nên làm tròn ${tram >= 5 ? 'lên' : 'xuống'} `
    + `được ${sp(tram >= 5 ? tren : duoi)}. Vậy bạn ${ai} đã làm tròn đúng.`);
},

/* ===== tr.67 – Bài 4 (luyện tập 2): ba bạn viết số lên bảng con ===== */
() => {
  const q = Q(4, '');
  const sp = ART.b62sp;
  const p = R(0, 9), t = R(0, 9);
  const q2 = pick([0,1,2,3,4,5,6,7,8,9].filter(v => v !== p));
  const u = pick([0,1,2,3,4,5,6,7,8,9].filter(v => v !== t));
  const nam = R(1, 9) * 10000 + p * 1000 + u * 10;
  const mai = R(1, 9) * 10000 + p * 1000 + t * 10;
  const viet = R(1, 9) * 10000 + q2 * 1000 + t * 10;
  const cho = [nam, mai, viet].sort((x, y) => x - y);
  const html = `<p class="wordq">Mỗi bạn viết một trong các số ${cho.map(sp).join(', ')} lên bảng con.</p>
    <div class="b62-bub">
      <div>Số tớ viết có chữ số hàng nghìn giống chữ số hàng nghìn của số Mai viết.<br><b>Nam</b></div>
      <div>Số tớ viết có chữ số hàng chục giống chữ số hàng chục của số Mai viết.<br><b>Việt</b></div>
    </div>
    <div class="b62-sub">Mỗi bạn đã viết số nào?</div>
    <div class="bullet">Nam viết số ${q.num(nam)}.</div>
    <div class="bullet">Mai viết số ${q.num(mai)}.</div>
    <div class="bullet">Việt viết số ${q.num(viet)}.</div>`;
  return q.done(html,
    `Hai số ${sp(nam)} và ${sp(mai)} có cùng chữ số hàng nghìn là ${p}; `
    + `hai số ${sp(mai)} và ${sp(viet)} có cùng chữ số hàng chục là ${t}. `
    + `Số Mai viết có mặt ở cả hai lần nên Mai viết ${sp(mai)}, `
    + `Nam viết ${sp(nam)}, Việt viết ${sp(viet)}.`);
},

/* ===== tr.68 – Bài 1 (luyện tập 3): số lớn nhất nằm ở vị trí nào ===== */
() => {
  const q = Q(1, 'Quan sát hình rồi chọn câu trả lời đúng.');
  const sp = ART.b62sp;
  const ns = [];
  for (let g = 0; g < 200 && ns.length < 4; g++){
    const v = ns.length === 3 ? R(1000, 9999) : R(10000, 99999);
    if (!ns.includes(v)) ns.push(v);
  }
  while (ns.length < 4){
    let v = 30829;
    for (let t = 0; t < 60 && ns.includes(v); t++) v += 137;
    ns.push(v);
  }
  const dn = ns.slice().sort((x, y) => y - x);
  const max = dn[0], con = dn.slice(1).sort(() => Math.random() - .5);
  const VT = ['giao', 'vuong', 'tron'];                 /* ba vị trí có thể là đáp án */
  const oVT = pick(VT);
  /* số lớn nhất vào vị trí đã chọn, ba số còn lại vào ba vị trí kia */
  const conLai = con.slice();
  const val = {};
  ['ngoai', 'vuong', 'tron', 'giao'].forEach(k => { val[k] = k === oVT ? max : null; });
  ['ngoai', 'vuong', 'tron', 'giao'].forEach(k => { if (val[k] === null) val[k] = conLai.shift(); });
  const OPT = {
    giao: 'A', vuong: 'B', tron: 'C'
  };
  const ok = OPT[oVT];
  const html = ART.b62Hinh(val)
    + '<div class="b62-sub">Số lớn nhất nằm ở vị trí nào?</div>'
    + `<div class="b62-abc"><b>A.</b>Ở trong hình tròn và ở trong hình vuông.</div>
       <div class="b62-abc"><b>B.</b>Ở trong hình vuông nhưng ở ngoài hình tròn.</div>
       <div class="b62-abc"><b>C.</b>Ở trong hình tròn nhưng ở ngoài hình vuông.</div>
       <div class="fill-line">Đáp án: ${q.pick(ok, ['A', 'B', 'C'])}</div>`;
  return q.done(html,
    `Số lớn nhất là ${sp(max)}. Số đó nằm ở vị trí `
    + (oVT === 'giao' ? 'trong hình tròn và trong hình vuông'
      : oVT === 'vuong' ? 'trong hình vuông nhưng ngoài hình tròn'
      : 'trong hình tròn nhưng ngoài hình vuông') + ` nên chọn ${ok}.`);
},

/* ===== tr.68 – Bài 2 (luyện tập 3): đàn ong ===== */
() => {
  const q = Q(2, '');
  const sp = ART.b62sp, rd = ART.b62round;
  const n = R(21, 88) * 1000 + R(1, 999);
  const base = Math.floor(n / 1000) * 1000;
  const dung = rd(n, 1000);
  const opts = [base - 1000, base, base + 1000].sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C'];
  const ok = L[opts.indexOf(dung)];
  const kcn = rd(n, 10000);
  const tram = Math.floor(n / 100) % 10, ng = Math.floor(n / 1000) % 10;
  const html = ART.b62Hive(n)
    + '<div class="b62-sub">a) Dựa vào số lượng ong, chọn câu trả lời đúng.</div>'
    + '<div class="b62-sub">Làm tròn đến hàng nghìn, đàn ong có khoảng:</div>'
    + `<div class="b62-opts">${opts.map((v, i) =>
        `<span><b>${L[i]}.</b>${sp(v)} con ong</span>`).join('')}</div>
       <div class="fill-line">Đáp án: ${q.pick(ok, L)}</div>
       <div class="b62-sub">b) Làm tròn đến hàng chục nghìn, đàn ong có khoảng bao nhiêu con ong?</div>
       <div class="bullet">Đàn ong có khoảng ${q.num(kcn)} con ong.</div>`;
  return q.done(html,
    `${sp(n)} có chữ số hàng trăm là ${tram} nên làm tròn đến hàng nghìn được ${sp(dung)} `
    + `(chọn ${ok}); có chữ số hàng nghìn là ${ng} nên làm tròn đến hàng chục nghìn được ${sp(kcn)}.`);
},
];
