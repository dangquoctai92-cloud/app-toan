/* ==================== BÀI 65: LUYỆN TẬP CHUNG
   (SGK tập 2 – tr.75, 76)
   luyện tập tr.75 : bài 1 (Tính nhẩm – biểu thức với số tròn nghìn, tròn chục nghìn),
                     bài 2 (Đ, S ? – bốn phép cộng, trừ đặt tính dọc)
   luyện tập tr.76 : bài 3 (Đặt tính rồi tính),
                     bài 4 (cửa hàng xăng: có – nhập thêm – bán đi),
                     bài 5 (Tính giá trị của biểu thức)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như trong SGK: 42 758 */
ART.b65sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* khung đặt tính cột dọc, ô kết quả là ô điền */
ART.b65Vc = (q, a, b, op) => `<div class="vcalc"><span class="vop">${op === '+' ? '+' : '−'}</span>
  <span class="vnums"><b>${ART.b65sp(a)}</b><b>${ART.b65sp(b)}</b></span><i class="vbar"></i>
  <span class="vres">${q.num(op === '+' ? a + b : a - b)}</span></div>`;

/* khung đặt tính cột dọc đã ghi sẵn kết quả (dùng cho bài Đ, S ?) */
ART.b65Vs = (a, b, op, kq) => `<div class="vcalc static"><span class="vop">${op === '+' ? '+' : '−'}</span>
  <span class="vnums"><b>${ART.b65sp(a)}</b><b>${ART.b65sp(b)}</b></span><i class="vbar"></i>
  <span class="vres">${ART.b65sp(kq)}</span></div>`;

/* một kết quả sai nhưng vẫn có cùng số chữ số với kết quả đúng */
function b65Sai(c){
  const out = [];
  [9000, 2000, 1000, 900, 200, 100, 90, 20, 10].forEach(d => {
    if (c - d > 0 && String(c - d).length === String(c).length) out.push(c - d);
    if (String(c + d).length === String(c).length) out.push(c + d);
  });
  return out.length ? pick(out) : c + 1;
}

/* cây xăng của cửa hàng */
ART.b65Pump = () => `<svg viewBox="0 0 300 200" class="b65-art">
  <rect x="6" y="150" width="288" height="44" rx="8" fill="#d9dee8"/>
  <rect x="30" y="60" width="120" height="98" rx="10" fill="#e8552f" stroke="#a52c18" stroke-width="3"/>
  <rect x="44" y="74" width="92" height="42" rx="6" fill="#fff" stroke="#a52c18" stroke-width="2.4"/>
  <path d="M54 88h72M54 100h52" stroke="#a52c18" stroke-width="5" stroke-linecap="round"/>
  <rect x="44" y="126" width="92" height="20" rx="5" fill="#ffd66b" stroke="#a52c18" stroke-width="2"/>
  <path d="M150 90h26q10 0 10 10v46" fill="none" stroke="#4a4460" stroke-width="5" stroke-linecap="round"/>
  <rect x="176" y="140" width="22" height="30" rx="5" fill="#4a4460"/>
  <path d="M24 60h132l-10-16H34z" fill="#f0a027" stroke="#a06713" stroke-width="2.6"/>
  <g><rect x="204" y="96" width="72" height="62" rx="8" fill="#5fbb46" stroke="#357a24" stroke-width="3"/>
    <rect x="216" y="82" width="20" height="16" rx="4" fill="#357a24"/>
    <path d="M216 116h48M216 132h48" stroke="#eaf6d8" stroke-width="5" stroke-linecap="round"/></g>
</svg>`;

BANKS.b65 = [

/* ===== tr.75 – Bài 1: Tính nhẩm ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const sp = ART.b65sp;
  /* a) chục nghìn + nghìn − chục nghìn */
  const a1 = R(3, 9), a3 = R(1, a1 - 1), a2 = R(1, 9);
  const va = a1 * 10000 + a2 * 1000 - a3 * 10000;
  /* b) chục nghìn − (chục nghìn + chục nghìn) */
  const bu = R(1, 4), bv = R(1, 4), bt = R(bu + bv + 1, 9);
  const vb = bt * 10000 - (bu + bv) * 10000;
  /* c) nghìn − nghìn + chục nghìn */
  const c1 = R(11, 18), c2 = R(2, 9), c3 = R(2, 9);
  const vc = c1 * 1000 - c2 * 1000 + c3 * 10000;
  /* d) chục nghìn − (chục nghìn − chục nghìn) */
  const du = R(4, 9), dv = R(1, du - 1), dt = R(du - dv + 1, 9);
  const vd = dt * 10000 - (du - dv) * 10000;

  const rows = [
    `${sp(a1 * 10000)} <span class="op">+</span> ${sp(a2 * 1000)}
      <span class="op">−</span> ${sp(a3 * 10000)} <span class="op">=</span> ${q.num(va)}`,
    `${sp(bt * 10000)} <span class="op">−</span> (${sp(bu * 10000)}
      <span class="op">+</span> ${sp(bv * 10000)}) <span class="op">=</span> ${q.num(vb)}`,
    `${sp(c1 * 1000)} <span class="op">−</span> ${sp(c2 * 1000)}
      <span class="op">+</span> ${sp(c3 * 10000)} <span class="op">=</span> ${q.num(vc)}`,
    `${sp(dt * 10000)} <span class="op">−</span> (${sp(du * 10000)}
      <span class="op">−</span> ${sp(dv * 10000)}) <span class="op">=</span> ${q.num(vd)}`
  ];
  return q.done('<div class="b65-list">' + rows.map(r => `<div>${r}</div>`).join('') + '</div>',
    `${sp(a1 * 10000)} + ${sp(a2 * 1000)} = ${sp(a1 * 10000 + a2 * 1000)}, `
    + `rồi trừ ${sp(a3 * 10000)} được ${sp(va)};  `
    + `trong ngoặc ${sp(bu * 10000)} + ${sp(bv * 10000)} = ${sp((bu + bv) * 10000)} nên được ${sp(vb)};  `
    + `${sp(c1 * 1000)} − ${sp(c2 * 1000)} = ${sp((c1 - c2) * 1000)}, `
    + `rồi cộng ${sp(c3 * 10000)} được ${sp(vc)};  `
    + `trong ngoặc ${sp(du * 10000)} − ${sp(dv * 10000)} = ${sp((du - dv) * 10000)} nên được ${sp(vd)}.`);
},

/* ===== tr.75 – Bài 2: Đ, S ? ===== */
() => {
  const q = Q(2, '<span class="tag">Đ, S</span> ?');
  const sp = ART.b65sp;
  const items = [
    {a: R(30000, 89999), b: R(1000, 9999), op: '+'},
    {a: R(50000, 99999), b: R(100, 999), op: '−'},
    {a: R(70000, 99999), b: R(60000, 69999), op: '−'},
    {a: R(40000, 59999), b: R(30000, 39999), op: '+'}
  ];
  /* hai câu đúng, hai câu sai — xáo trộn vị trí */
  const flag = [true, true, false, false].sort(() => Math.random() - .5);
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = '<div class="b65-ds">' + items.map((it, i) => {
    const dung = it.op === '+' ? it.a + it.b : it.a - it.b;
    it.dung = dung;
    it.kq = flag[i] ? dung : b65Sai(dung);
    it.ok = flag[i] ? 'Đ' : 'S';
    return `<div><span class="b65-let">${L[i]}</span>
      ${ART.b65Vs(it.a, it.b, it.op, it.kq)}${q.pick(it.ok, ['Đ', 'S'])}</div>`;
  }).join('') + '</div>';
  return q.done(html, items.map((it, i) =>
    `${L[i]} ${sp(it.a)} ${it.op} ${sp(it.b)} = ${sp(it.dung)} nên ghi ${it.ok}`).join(';  '));
},

/* ===== tr.76 – Bài 3: Đặt tính rồi tính ===== */
() => {
  const q = Q(3, 'Đặt tính rồi tính.');
  const sp = ART.b65sp;
  const items = [
    {a: R(5000, 9499), b: R(5000, 9499), op: '+'},
    {a: R(40000, 89999), b: R(5000, 9999), op: '+'},
    {a: R(20000, 99999), b: R(100, 999), op: '−'},
    {a: R(80000, 99999), b: R(70000, 79999), op: '−'}
  ];
  const line = it => `<div>${sp(it.a)} <span class="op">${it.op === '+' ? '+' : '−'}</span> ${sp(it.b)}</div>`;
  return q.done('<div class="b65-box">' + items.map(line).join('') + '</div>'
      + '<div class="vrow">' + items.map(it => ART.b65Vc(q, it.a, it.b, it.op)).join('') + '</div>',
    items.map(it => `${sp(it.a)} ${it.op} ${sp(it.b)} = `
      + sp(it.op === '+' ? it.a + it.b : it.a - it.b)).join(';  '));
},

/* ===== tr.76 – Bài 4: cửa hàng xăng ===== */
() => {
  const q = Q(4, '');
  const sp = ART.b65sp;
  const co = R(100, 199) * 100;              /* số lít xăng cửa hàng có */
  const them = R(5, 15) * 1000;              /* số lít nhập thêm */
  const conLai = R(40, 120) * 50;            /* số lít còn lại */
  const ban = co + them - conLai;            /* số lít đã bán */
  return q.done(`<p class="wordq">Một cửa hàng có ${sp(co)} <i>l</i> xăng, cửa hàng nhập thêm về
      ${sp(them)} <i>l</i> xăng. Hỏi sau khi bán đi ${sp(ban)} <i>l</i> xăng, cửa hàng đó còn lại
      bao nhiêu lít xăng?</p>
    ${ART.b65Pump()}
    <div class="bullet">Sau khi nhập thêm, cửa hàng có ${q.num(co + them)} <i>l</i> xăng.</div>
    <div class="bullet">Cửa hàng đó còn lại ${q.num(conLai)} <i>l</i> xăng.</div>`,
    `${sp(co)} + ${sp(them)} = ${sp(co + them)} (l);  `
    + `${sp(co + them)} − ${sp(ban)} = ${sp(conLai)} (l)`);
},

/* ===== tr.76 – Bài 5: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(5, 'Tính giá trị của biểu thức.');
  const sp = ART.b65sp;
  const a1 = R(5000, 9999), a2 = R(50, 95) * 100;
  const a3 = R(9000, a1 + a2 - 1000);
  const va1 = a1 + a2, va = va1 - a3;
  const b1 = R(11000, 19999), b2 = R(4000, 8999);
  const b3 = R(1000, b1 - b2 - 500);
  const vb1 = b2 + b3, vb = b1 - vb1;
  const html = `<div class="b65-step"><span class="b65-let">a)</span>
      ${sp(a1)} <span class="op">+</span> ${sp(a2)} <span class="op">−</span> ${sp(a3)}
      <span class="op">=</span> ${q.num(va1)} <span class="op">−</span> ${sp(a3)}
      <span class="op">=</span> ${q.num(va)}</div>
    <div class="b65-step"><span class="b65-let">b)</span>
      ${sp(b1)} <span class="op">−</span> (${sp(b2)} <span class="op">+</span> ${sp(b3)})
      <span class="op">=</span> ${sp(b1)} <span class="op">−</span> ${q.num(vb1)}
      <span class="op">=</span> ${q.num(vb)}</div>
    <div class="hint-line">Biểu thức có dấu ngoặc thì tính trong ngoặc trước.</div>`;
  return q.done(html,
    `a) ${sp(a1)} + ${sp(a2)} = ${sp(va1)}; ${sp(va1)} − ${sp(a3)} = ${sp(va)}.  `
    + `b) ${sp(b2)} + ${sp(b3)} = ${sp(vb1)}; ${sp(b1)} − ${sp(vb1)} = ${sp(vb)}.`);
},
];
