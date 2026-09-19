/*CSS
.b63-list{display:flex;flex-wrap:wrap;gap:2px 30px;margin:6px 0}
.b63-list > div{min-width:210px;font-size:19px;font-weight:700;line-height:2}
.b63-let{color:#d63384;font-weight:800;margin-right:6px}
.b63-sub{font-weight:700;margin:9px 0 3px}
.b63-add{display:grid;grid-template-columns:30px repeat(5,36px);justify-content:center;
  gap:3px 4px;margin:12px 0;font-size:21px;font-weight:800}
.b63-add span{display:grid;place-items:center;height:38px}
.b63-add .bar{grid-column:1 / 7;border-top:2.8px solid #333;height:0;margin:1px 0}
.b63-add .qin{width:32px !important;height:34px;font-size:18px;padding:0;text-align:center}
.b63-shop{width:100%;max-width:330px;height:auto;display:block;margin:6px auto}
CSS*/

/* ==================== BÀI 63: PHÉP CỘNG TRONG PHẠM VI 100 000
   (SGK tập 2 – tr.70, 71, 72)
   hoạt động tr.70 : bài 1 (Tính – cộng theo cột dọc), bài 2 (Đặt tính rồi tính),
                     bài 3 (Tính nhẩm theo mẫu – các số tròn nghìn),
                     bài 4 (cửa hàng nhập sách giáo khoa, sách tham khảo và vở)
   luyện tập tr.71 : bài 1a (Tính nhẩm – các số tròn chục nghìn),
                     bài 1b (Tính nhẩm – số nghìn cộng số tròn nghìn),
                     bài 2 (Đặt tính rồi tính), bài 3 (Tính giá trị của biểu thức)
   luyện tập tr.72 : bài 4 (bác Tư thả cá ba sa), bài 5 (Tìm chữ số thích hợp)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như trong SGK: 36 175 */
ART.b63sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* khung đặt tính cột dọc, ô kết quả là ô điền */
ART.b63Vc = (q, a, b) => `<div class="vcalc"><span class="vop">+</span>
  <span class="vnums"><b>${ART.b63sp(a)}</b><b>${ART.b63sp(b)}</b></span><i class="vbar"></i>
  <span class="vres">${q.num(a + b)}</span></div>`;

/* giá sách của cửa hàng */
ART.b63Shop = () => `<svg viewBox="0 0 330 190" class="b63-shop">
  <rect x="10" y="10" width="310" height="168" rx="8" fill="#f6ead3" stroke="#a87c3e" stroke-width="3"/>
  <path d="M10 96h310M10 142h310" stroke="#a87c3e" stroke-width="3"/>
  <g>
    <rect x="26" y="40" width="18" height="54" fill="#e8552f" stroke="#8f2f18" stroke-width="2"/>
    <rect x="48" y="32" width="16" height="62" fill="#2aa7de" stroke="#175f80" stroke-width="2"/>
    <rect x="68" y="46" width="20" height="48" fill="#f0a027" stroke="#a06713" stroke-width="2"/>
    <rect x="92" y="36" width="15" height="58" fill="#5fbb46" stroke="#357a24" stroke-width="2"/>
    <rect x="111" y="50" width="19" height="44" fill="#8e6fd0" stroke="#553f8c" stroke-width="2"/>
  </g>
  <g>
    <rect x="180" y="52" width="17" height="42" fill="#e8478f" stroke="#93245a" stroke-width="2"/>
    <rect x="201" y="42" width="20" height="52" fill="#f2ce2b" stroke="#a68c0f" stroke-width="2"/>
    <rect x="225" y="56" width="15" height="38" fill="#4fb352" stroke="#2c6e2f" stroke-width="2"/>
    <rect x="244" y="46" width="18" height="48" fill="#3a8fd8" stroke="#215a8c" stroke-width="2"/>
  </g>
  <g>
    <rect x="30" y="106" width="70" height="34" rx="3" fill="#fff" stroke="#7a6a4e" stroke-width="2"/>
    <path d="M65 106v34" stroke="#7a6a4e" stroke-width="2"/>
    <rect x="112" y="112" width="64" height="28" rx="3" fill="#fdf3d8" stroke="#7a6a4e" stroke-width="2"/>
    <rect x="188" y="108" width="70" height="32" rx="3" fill="#fff" stroke="#7a6a4e" stroke-width="2"/>
    <path d="M223 108v32" stroke="#7a6a4e" stroke-width="2"/>
  </g>
  <g>
    <rect x="36" y="150" width="86" height="22" rx="3" fill="#cfe6f7" stroke="#3d6f9e" stroke-width="2"/>
    <rect x="132" y="150" width="86" height="22" rx="3" fill="#ffe0ea" stroke="#c04a76" stroke-width="2"/>
    <rect x="228" y="150" width="66" height="22" rx="3" fill="#e2f5cf" stroke="#5c8a2f" stroke-width="2"/>
  </g>
</svg>`;

BANKS.b63 = [

/* ===== tr.70 – Bài 1: Tính (cộng theo cột dọc) ===== */
() => {
  const q = Q(1, 'Tính.');
  const sp = ART.b63sp;
  const items = [
    {a: R(50000, 98000), b: R(100, 999)},
    {a: R(50000, 93000), b: R(1000, 6000)},
    {a: R(20000, 59000), b: R(10000, 39000)}
  ];
  return q.done(`<div class="vrow">${items.map(it => ART.b63Vc(q, it.a, it.b)).join('')}</div>`,
    items.map(it => `${sp(it.a)} + ${sp(it.b)} = ${sp(it.a + it.b)}`).join(';  '));
},

/* ===== tr.70 – Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const sp = ART.b63sp;
  const items = [
    {a: R(20000, 55000), b: R(20000, 44000)},
    {a: R(20000, 55000), b: R(20000, 44000)},
    {a: R(20000, 99000), b: R(11, 99)},
    {a: R(3000, 7000), b: R(2000, 6000)}
  ];
  const line = it => `<div class="eq">${sp(it.a)} <span class="op">+</span> ${sp(it.b)}</div>`;
  return q.done(`<div class="eq-list">${items.map(line).join('')}</div>
      <div class="vrow">${items.map(it => ART.b63Vc(q, it.a, it.b)).join('')}</div>`,
    items.map(it => `${sp(it.a)} + ${sp(it.b)} = ${sp(it.a + it.b)}`).join(';  '));
},

/* ===== tr.70 – Bài 3: Tính nhẩm (theo mẫu) — các số tròn nghìn ===== */
() => {
  const q = Q(3, 'Tính nhẩm (theo mẫu).');
  const sp = ART.b63sp;
  const m1 = R(5, 9), m2 = R(5, 9);
  const items = [];
  for (let g = 0; g < 90 && items.length < 4; g++){
    const a = R(1, 9), b = R(1, 9);
    if (!items.some(x => x.a === a && x.b === b)) items.push({a, b});
  }
  while (items.length < 4) items.push({a: 1, b: items.length + 1});
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = noteBox(`Mẫu: ${m1} 000 + ${m2} 000 = ?<br>
      Nhẩm: ${m1} nghìn + ${m2} nghìn = ${m1 + m2} nghìn<br>
      ${m1} 000 + ${m2} 000 = ${sp((m1 + m2) * 1000)}`)
    + '<div class="b63-list">' + items.map((it, i) =>
      `<div><span class="b63-let">${L[i]}</span>${it.a} 000 <span class="op">+</span> ${it.b} 000
        <span class="op">=</span> ${q.num((it.a + it.b) * 1000)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.a} nghìn + ${x.b} nghìn = ${x.a + x.b} nghìn`).join(';  '));
},

/* ===== tr.70 – Bài 4: cửa hàng nhập sách giáo khoa, sách tham khảo và vở ===== */
() => {
  const q = Q(4, '');
  const sp = ART.b63sp;
  const sgk = R(50, 79) * 100, tk = R(300, 499) * 10, vo = R(60, 89) * 100;
  const tong = sgk + tk + vo;
  return q.done(`<p class="wordq">Để phục vụ học sinh chuẩn bị vào năm học mới, một cửa hàng
      đã nhập về ${sp(sgk)} cuốn sách giáo khoa, ${sp(tk)} cuốn sách tham khảo
      và ${sp(vo)} cuốn vở. Hỏi cửa hàng đó đã nhập về tất cả bao nhiêu cuốn sách và vở?</p>
    ${ART.b63Shop()}
    <div class="bullet">Cửa hàng đó đã nhập về tất cả ${q.num(tong)} cuốn sách và vở.</div>`,
    `${sp(sgk)} + ${sp(tk)} + ${sp(vo)} = ${sp(tong)} (cuốn)`);
},

/* ===== tr.71 – Bài 1a (luyện tập): Tính nhẩm — các số tròn chục nghìn ===== */
() => {
  const q = Q(1, 'a) Tính nhẩm (theo mẫu).');
  const sp = ART.b63sp;
  const m1 = R(2, 6), m2 = R(2, 10 - m1);
  const items = [];
  for (let g = 0; g < 90 && items.length < 3; g++){
    const a = R(1, 8), b = R(1, 10 - a);
    if (!items.some(x => x.a === a && x.b === b)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 1, b: items.length + 1});
  const html = noteBox(`Mẫu: ${sp(m1 * 10000)} + ${sp(m2 * 10000)} = ?<br>
      Nhẩm: ${m1} chục nghìn + ${m2} chục nghìn = ${m1 + m2} chục nghìn<br>
      ${sp(m1 * 10000)} + ${sp(m2 * 10000)} = ${sp((m1 + m2) * 10000)}`)
    + '<div class="b63-list">' + items.map(it =>
      `<div>${sp(it.a * 10000)} <span class="op">+</span> ${sp(it.b * 10000)}
        <span class="op">=</span> ${q.num((it.a + it.b) * 10000)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.a} chục nghìn + ${x.b} chục nghìn = ${x.a + x.b} chục nghìn`).join(';  '));
},

/* ===== tr.71 – Bài 1b (luyện tập): Tính nhẩm — số nghìn cộng số tròn nghìn ===== */
() => {
  const q = Q(1, 'b) Tính nhẩm (theo mẫu).');
  const sp = ART.b63sp;
  const m1 = R(21, 68), m2 = R(2, 9);
  const items = [];
  for (let g = 0; g < 120 && items.length < 3; g++){
    const a = R(21, 90), b = R(2, 9);
    if (a + b <= 100 && !items.some(x => x.a === a && x.b === b)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 30 + items.length, b: 5});
  const html = noteBox(`Mẫu: ${sp(m1 * 1000)} + ${sp(m2 * 1000)} = ?<br>
      Nhẩm: ${m1} nghìn + ${m2} nghìn = ${m1 + m2} nghìn<br>
      ${sp(m1 * 1000)} + ${sp(m2 * 1000)} = ${sp((m1 + m2) * 1000)}`)
    + '<div class="b63-list">' + items.map(it =>
      `<div>${sp(it.a * 1000)} <span class="op">+</span> ${sp(it.b * 1000)}
        <span class="op">=</span> ${q.num((it.a + it.b) * 1000)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.a} nghìn + ${x.b} nghìn = ${x.a + x.b} nghìn`).join(';  '));
},

/* ===== tr.71 – Bài 2 (luyện tập): Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const sp = ART.b63sp;
  const items = [
    {a: R(20000, 50000), b: R(20000, 45000)},
    {a: R(50000, 95000), b: R(100, 999)},
    {a: R(2000, 5000), b: R(80000, 94000)}
  ];
  const line = it => `<div class="eq">${sp(it.a)} <span class="op">+</span> ${sp(it.b)}</div>`;
  return q.done(`<div class="eq-list">${items.map(line).join('')}</div>
      <div class="vrow">${items.map(it => ART.b63Vc(q, it.a, it.b)).join('')}</div>`,
    items.map(it => `${sp(it.a)} + ${sp(it.b)} = ${sp(it.a + it.b)}`).join(';  '));
},

/* ===== tr.71 – Bài 3 (luyện tập): Tính giá trị của biểu thức ===== */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  const sp = ART.b63sp;
  const a1 = R(20, 45) * 1000, a2 = R(15, 30) * 1000, a3 = R(10, 20) * 1000;
  const b1 = R(20, 40) * 1000 + R(1, 9) * 100;
  const b2 = R(20, 40) * 1000 + R(1, 9) * 100;
  const b3 = R(5, 9) * 1000 + R(1, 9) * 100;
  const html = `<div class="eq-list">
      <div class="eq"><span class="b63-let">a)</span>${sp(a1)} <span class="op">+</span> ${sp(a2)}
        <span class="op">+</span> ${sp(a3)} <span class="op">=</span> ${q.num(a1 + a2 + a3)}</div>
      <div class="eq"><span class="b63-let">b)</span>${sp(b1)} <span class="op">+</span> ${sp(b2)}
        <span class="op">+</span> ${sp(b3)} <span class="op">=</span> ${q.num(b1 + b2 + b3)}</div>
    </div>`;
  return q.done(html,
    `a) ${sp(a1)} + ${sp(a2)} = ${sp(a1 + a2)}; ${sp(a1 + a2)} + ${sp(a3)} = ${sp(a1 + a2 + a3)}.  `
    + `b) ${sp(b1)} + ${sp(b2)} = ${sp(b1 + b2)}; ${sp(b1 + b2)} + ${sp(b3)} = ${sp(b1 + b2 + b3)}.`);
},

/* ===== tr.72 – Bài 4 (luyện tập): bác Tư thả cá ba sa ===== */
() => {
  const q = Q(4, '');
  const sp = ART.b63sp;
  const lan1 = R(100, 180) * 100, hon = R(50, 99) * 10;
  const lan2 = lan1 + hon;
  return q.done(`<p class="wordq">Trong một hồ nuôi cá của bác Tư, lần thứ nhất bác thả xuống hồ
      ${sp(lan1)} con cá ba sa, lần thứ hai bác thả nhiều hơn lần thứ nhất ${hon} con cá ba sa.
      Hỏi cả hai lần bác Tư đã thả xuống hồ bao nhiêu con cá ba sa?</p>
    <div class="bullet">Lần thứ hai bác Tư thả ${q.num(lan2)} con cá ba sa.</div>
    <div class="bullet">Cả hai lần bác Tư đã thả ${q.num(lan1 + lan2)} con cá ba sa.</div>`,
    `${sp(lan1)} + ${hon} = ${sp(lan2)} (con);  ${sp(lan1)} + ${sp(lan2)} = ${sp(lan1 + lan2)} (con)`);
},

/* ===== tr.72 – Bài 5 (luyện tập): Tìm chữ số thích hợp ===== */
() => {
  const q = Q(5, 'Tìm chữ số thích hợp.');
  const sp = ART.b63sp;
  /* số có năm chữ số cộng số có bốn chữ số, tổng vẫn có năm chữ số */
  let a = R(20000, 88000), b = R(1000, 9999);
  for (let g = 0; g < 40 && a + b > 99999; g++) b = R(1000, 9999);
  if (a + b > 99999) { a = 63121; b = 8294; }
  const s = a + b;
  const dA = String(a).split('');            /* 5 chữ số */
  const dB = ('' + b).split('');             /* 4 chữ số */
  const dS = String(s).split('');            /* 5 chữ số */
  /* ẩn: hàng trăm của số hạng thứ nhất; hàng nghìn và đơn vị của số hạng thứ hai;
     hàng chục nghìn và hàng chục của tổng — mỗi cột chỉ có một ô trống nên đáp án duy nhất */
  const cell = v => `<span>${v}</span>`;
  const blank = v => `<span>${q.num(+v, 1)}</span>`;
  const rowA = '<span></span>' + dA.map((v, i) => i === 2 ? blank(v) : cell(v)).join('');
  const rowB = '<span class="op">+</span><span></span>'
    + dB.map((v, i) => (i === 0 || i === 3) ? blank(v) : cell(v)).join('');
  const rowS = '<span></span>' + dS.map((v, i) => (i === 0 || i === 3) ? blank(v) : cell(v)).join('');
  const html = `<div class="b63-add">${rowA}${rowB}<i class="bar"></i>${rowS}</div>`;
  return q.done(html, `${sp(a)} + ${sp(b)} = ${sp(s)}`);
},
];
