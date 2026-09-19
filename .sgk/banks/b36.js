/* ==================== BÀI 36: NHÂN SỐ CÓ BA CHỮ SỐ VỚI SỐ CÓ MỘT CHỮ SỐ
   (SGK tr.97, 98) ====================
   hoạt động tr.97–98 : bài 1, 2, 3
   luyện tập tr.98    : bài 1, 2, 3, 4
================================================================================ */

/* sinh phép nhân số có ba chữ số với số có một chữ số, tích không quá 999 */
const b36Mul = n => {
  const out = [];
  let guard = 0;
  while (out.length < n && guard++ < 300){
    const b = R(2, 9), a = R(101, Math.floor(999 / b));
    if (out.some(x => x.a === a && x.b === b)) continue;
    out.push({a, b, r: a * b});
  }
  while (out.length < n){ const k = out.length; out.push({a: 111 + k, b: 2, r: (111 + k) * 2}); }
  return out;
};

/* một phép nhân đặt tính dọc; mode 'res' chỉ điền tích, 'all' điền cả thừa số */
const b36Vc = (q, it, mode) => `<div class="vcalc"><span class="vop">×</span>
  <span class="vnums">${mode === 'all'
    ? `<b>${q.num(it.a)}</b><b>${q.num(it.b, 1)}</b>`
    : `<b>${it.a}</b><b>${it.b}</b>`}</span><i class="vbar"></i>
  <span class="vres">${q.num(it.r, String(it.r).length)}</span></div>`;

ART.b36Meo = `<svg viewBox="0 0 120 110" class="b36-art">
  <path d="M30 46q-6-24 6-30 10 4 14 14 12-4 24 0 4-10 14-14 12 6 6 30z" fill="#4a4a55" stroke="#26262e" stroke-width="2.4"/>
  <ellipse cx="60" cy="56" rx="30" ry="26" fill="#5a5a66" stroke="#26262e" stroke-width="2.4"/>
  <circle cx="49" cy="52" r="5" fill="#f7e07a"/><circle cx="71" cy="52" r="5" fill="#f7e07a"/>
  <circle cx="49" cy="52" r="2" fill="#26262e"/><circle cx="71" cy="52" r="2" fill="#26262e"/>
  <path d="M60 62l-5 5h10z" fill="#e2739a"/>
  <path d="M30 58H12M32 66l-18 6M90 58h18M88 66l18 6" stroke="#26262e" stroke-width="1.8"/>
  <path d="M42 80q18 14 36 0v24H42z" fill="#5a5a66" stroke="#26262e" stroke-width="2.4"/>
  <path d="M84 96q22 4 22-14" fill="none" stroke="#26262e" stroke-width="6" stroke-linecap="round"/>
</svg>`;

ART.b36Hai = `<svg viewBox="0 0 120 110" class="b36-art">
  <ellipse cx="58" cy="66" rx="34" ry="20" fill="#fff" stroke="#8296ad" stroke-width="2.4"/>
  <circle cx="88" cy="46" r="15" fill="#fff" stroke="#8296ad" stroke-width="2.4"/>
  <circle cx="93" cy="43" r="2.6" fill="#26262e"/>
  <path d="M102 48l16 4-16 6z" fill="#f0912a" stroke="#c2410c" stroke-width="1.8"/>
  <path d="M34 58q22-16 42-2-18 12-42 2z" fill="#cfd9e4" stroke="#8296ad" stroke-width="2"/>
  <path d="M48 86v14M68 86v14" stroke="#f0912a" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M40 100h16M60 100h16" stroke="#f0912a" stroke-width="3.4" stroke-linecap="round"/>
</svg>`;

/* hũ mật ong */
ART.b36Hu = ml => `<svg viewBox="0 0 70 96" class="b36-hu">
  <rect x="16" y="6" width="38" height="10" rx="3" fill="#b8722a" stroke="#7d4a12" stroke-width="2.2"/>
  <path d="M12 16h46v62a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10z" fill="#f3c04a" stroke="#a8761c" stroke-width="2.6"/>
  <rect x="14" y="38" width="42" height="24" rx="3" fill="#fff6e0" stroke="#a8761c" stroke-width="1.8"/>
  <text x="35" y="55" text-anchor="middle" font-size="11" font-weight="700" fill="#a8761c">${ml}</text>
</svg>`;

/* cân đĩa thăng bằng: ấm ở đĩa trái, các chén ở đĩa phải */
ART.b36Scale = n => {
  const am = `<g transform="translate(-28,-40)">
    <path d="M8 18h36q6 0 6 10t-6 10H8q-6 0-6-10t6-10z" fill="#f3f7fa" stroke="#5a7a8f" stroke-width="2.2"/>
    <path d="M44 22q12 2 12 8t-12 8" fill="none" stroke="#5a7a8f" stroke-width="2.4"/>
    <path d="M18 18q8-8 16 0" fill="none" stroke="#5a7a8f" stroke-width="2.2"/>
    <circle cx="26" cy="12" r="3.4" fill="#5a7a8f"/></g>`;
  const chen = `<g transform="translate(-12,-19)">
    <path d="M2 4h20l-3 14H5z" fill="#f3f7fa" stroke="#5a7a8f" stroke-width="1.8"/>
    <ellipse cx="12" cy="4" rx="10" ry="3" fill="#e2eef5" stroke="#5a7a8f" stroke-width="1.6"/></g>`;
  const cups = Array.from({length: n}, (_, i) =>
    `<g transform="translate(${216 + (i - (n - 1) / 2) * 26},73)">${chen}</g>`).join('');
  return `<svg viewBox="0 0 278 150" class="b36-scale">
    <rect x="96" y="132" width="68" height="9" rx="3" fill="#bfe3f2" stroke="#4e93b5" stroke-width="2"/>
    <rect x="124" y="66" width="12" height="66" fill="#bfe3f2" stroke="#4e93b5" stroke-width="2"/>
    <path d="M44 62H216" stroke="#4e93b5" stroke-width="4" stroke-linecap="round"/>
    <path d="M44 62v12M216 62v12" stroke="#4e93b5" stroke-width="2"/>
    <ellipse cx="44" cy="75" rx="36" ry="6" fill="#d9f0fb" stroke="#4e93b5" stroke-width="1.8"/>
    <ellipse cx="216" cy="75" rx="36" ry="6" fill="#d9f0fb" stroke="#4e93b5" stroke-width="1.8"/>
    <g transform="translate(44,73)">${am}</g>${cups}
    <circle cx="130" cy="62" r="9" fill="#f0c419" stroke="#b8901c" stroke-width="2"/>
  </svg>`;
};

BANKS.b36 = [

/* ===== tr.98 – Bài 1 (hoạt động): Tính ===== */
() => {
  const q = Q(1, 'Tính.');
  const list = b36Mul(4);
  return q.done('<div class="b36-cards">' + list.map(it =>
      `<div class="b36-card">${b36Vc(q, it, 'res')}</div>`).join('') + '</div>'
    + '<div class="hint-line">Nhân lần lượt từ hàng đơn vị, rồi đến hàng chục, hàng trăm.</div>',
    list.map(it => `${it.a} × ${it.b} = ${it.r}`).join(' · '));
},

/* ===== tr.98 – Bài 2 (hoạt động): Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const list = b36Mul(4);
  return q.done('<div class="b36-cards">' + list.map(it =>
      `<div class="b36-col"><span class="b36-pill">${it.a} × ${it.b}</span>
        <div class="b36-card gr">${b36Vc(q, it, 'all')}</div></div>`).join('') + '</div>'
    + '<div class="hint-line">Viết thừa số thứ hai thẳng cột với hàng đơn vị của thừa số thứ nhất.</div>',
    list.map(it => `${it.a} × ${it.b} = ${it.r}`).join(' · '));
},

/* ===== tr.98 – Bài 3 (hoạt động): số ngày tuổi của mèo ===== */
() => {
  const q = Q(3, '');
  const k = R(2, 5), n = R(101, Math.floor(999 / k));
  return q.done(`<p class="wordq">Hôm nay, hải âu được ${n} ngày tuổi, số ngày tuổi của mèo
      gấp ${k} lần số ngày tuổi của hải âu. Hỏi hôm nay mèo được bao nhiêu ngày tuổi?</p>
    <div class="b36-row">${ART.b36Hai}${ART.b36Meo}</div>
    <div class="fill-line">Hôm nay mèo được ${q.num(n * k)} ngày tuổi.</div>`,
    `${n} × ${k} = ${n * k} (ngày)`);
},

/* ===== tr.98 – Luyện tập, Bài 1: Số ? (bảng thừa số – tích) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const list = b36Mul(4);
  return q.done(`<div class="tbl-wrap"><table class="tbl green">
      <tr><th>Thừa số</th>${list.map(it => `<td>${it.a}</td>`).join('')}</tr>
      <tr><th>Thừa số</th>${list.map(it => `<td>${it.b}</td>`).join('')}</tr>
      <tr><th>Tích</th>${list.map(it => `<td>${q.num(it.r)}</td>`).join('')}</tr>
    </table></div>`,
    list.map(it => `${it.a} × ${it.b} = ${it.r}`).join(' · '));
},

/* ===== tr.98 – Luyện tập, Bài 2: Tính nhẩm (theo mẫu) ===== */
() => {
  const q = Q(2, 'Tính nhẩm (theo mẫu).');
  let mt = 2, mm = 2;
  for (let g = 0; g < 200; g++){
    const t = R(2, 4), m = R(2, 4);
    if (t * m <= 9){ mt = t; mm = m; break; }
  }
  const items = [];
  for (let g = 0; g < 400 && items.length < 3; g++){
    const t = R(1, 4), m = R(2, 9);
    if (t * m > 9) continue;
    if (t === mt && m === mm) continue;
    if (items.some(x => x.t === t && x.m === m)) continue;
    items.push({t, m});
  }
  while (items.length < 3){ const k = items.length; items.push({t: 1, m: 2 + k}); }
  const box = noteBox(`Mẫu: ${mt * 100} × ${mm} = ?<br>
    &nbsp;&nbsp;Nhẩm: ${mt} trăm × ${mm} = ${mt * mm} trăm<br>
    &nbsp;&nbsp;${mt * 100} × ${mm} = ${mt * mm * 100}`);
  const grid = '<div class="calc-grid">' + items.map(x =>
    `<div class="calc-cell">${x.t * 100} × ${x.m} = ${q.num(x.t * x.m * 100)}</div>`).join('') + '</div>';
  return q.done(box + grid, items.map(x => `${x.t} trăm × ${x.m} = ${x.t * x.m} trăm`).join(' · '));
},

/* ===== tr.98 – Luyện tập, Bài 3: Số ? (cái ấm và những cái chén) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const k = R(2, 4), g = R(101, Math.floor(999 / k));
  return q.done(ART.b36Scale(k)
    + `<div class="fill-line">Trong hình bên, mỗi cái chén cân nặng ${g} g.
        Vậy cái ấm cân nặng ${q.num(g * k)} g.</div>`,
    `${g} × ${k} = ${g * k} (g)`);
},

/* ===== tr.98 – Luyện tập, Bài 4: hũ mật ong của gấu đen ===== */
() => {
  const q = Q(4, '');
  const k = R(2, 3), x = pick([150, 200, 250, 300]);
  const tong = k * x;
  const dung = R(1, tong / 50 - 1) * 50;
  return q.done(`<p class="wordq">Gấu đen có ${k} hũ mật ong, mỗi hũ đựng ${x} ml mật ong.
      Gấu đen đã dùng ${dung} ml mật ong để làm bánh. Hỏi gấu đen còn lại bao nhiêu mi-li-lít mật ong?</p>
    <div class="b36-row">${Array.from({length: k}, () => ART.b36Hu(x + ' ml')).join('')}</div>
    <div class="bullet">Gấu đen có tất cả ${q.num(tong)} ml mật ong.</div>
    <div class="bullet">Gấu đen còn lại ${q.num(tong - dung)} ml mật ong.</div>`,
    `${x} × ${k} = ${tong} (ml);  ${tong} − ${dung} = ${tong - dung} (ml)`);
},
];
