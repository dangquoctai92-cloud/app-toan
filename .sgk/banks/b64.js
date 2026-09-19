/* ==================== BÀI 64: PHÉP TRỪ TRONG PHẠM VI 100 000
   (SGK tập 2 – tr.72, 73, 74, 75)
   hoạt động tr.73 : bài 1 (Tính – trừ theo cột dọc), bài 2 (Đặt tính rồi tính),
                     bài 3 (Tính nhẩm theo mẫu – các số tròn nghìn),
                     bài 4 (nhà máy sản xuất xe ô tô đồ chơi)
   luyện tập tr.73 : bài 1a (Tính nhẩm – các số tròn chục nghìn)
   luyện tập tr.74 : bài 1b (Tính nhẩm – số nghìn trừ số tròn nghìn),
                     bài 2 (Đặt tính rồi tính),
                     bài 3 (Trong hai biểu thức, biểu thức nào có giá trị lớn hơn?),
                     bài 4 (đường từ nhà An đến thị xã)
   luyện tập tr.75 : bài 5 (Đố bạn – tìm hiệu)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như trong SGK: 84 758 */
ART.b64sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* khung đặt tính cột dọc phép trừ, ô kết quả là ô điền */
ART.b64Vc = (q, a, b) => `<div class="vcalc"><span class="vop">−</span>
  <span class="vnums"><b>${ART.b64sp(a)}</b><b>${ART.b64sp(b)}</b></span><i class="vbar"></i>
  <span class="vres">${q.num(a - b)}</span></div>`;

/* xe ô tô đồ chơi */
ART.b64Car = i => {
  const C = ['#e8552f', '#2aa7de', '#f0a027', '#5fbb46'];
  const S = ['#8f2f18', '#175f80', '#a06713', '#357a24'];
  return `<svg viewBox="0 0 120 70" class="b64-car">
    <path d="M8 52V38l18-14h34l14 14h30q8 0 8 8v6z" fill="${C[i % 4]}"
      stroke="${S[i % 4]}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M30 38V27h24v11z" fill="#dff1fb" stroke="${S[i % 4]}" stroke-width="2"/>
    <circle cx="34" cy="56" r="9" fill="#3a3a44" stroke="#1e1e26" stroke-width="2.4"/>
    <circle cx="88" cy="56" r="9" fill="#3a3a44" stroke="#1e1e26" stroke-width="2.4"/>
    <circle cx="34" cy="56" r="3.4" fill="#e9e9ef"/><circle cx="88" cy="56" r="3.4" fill="#e9e9ef"/>
  </svg>`;
};

/* con đường từ nhà An đến thị xã: một đoạn lên dốc, một đoạn xuống dốc */
ART.b64Road = up => `<svg viewBox="0 0 340 160" class="b64-art">
  <path d="M6 132L150 34l184 98z" fill="#cfe9b0" stroke="#6f9c3f" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M22 128L150 46l160 82" fill="none" stroke="#9aa0a6" stroke-width="9" stroke-linecap="round"/>
  <path d="M22 128L150 46l160 82" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="9 8"/>
  <text x="60" y="74" font-size="13" font-weight="700" fill="#2f6d1a"
    transform="rotate(-33 60 74)">lên dốc: ${up} m</text>
  <text x="196" y="80" font-size="13" font-weight="700" fill="#2f6d1a"
    transform="rotate(27 196 80)">xuống dốc: ? m</text>
  <text x="4" y="152" font-size="14" font-weight="700">Nhà An</text>
  <text x="336" y="152" font-size="14" font-weight="700" text-anchor="end">Thị xã</text>
</svg>`;

BANKS.b64 = [

/* ===== tr.73 – Bài 1: Tính (trừ theo cột dọc) ===== */
() => {
  const q = Q(1, 'Tính.');
  const sp = ART.b64sp;
  const items = [
    {a: R(60000, 99999), b: R(10000, 49999)},
    {a: R(20000, 99999), b: R(1000, 9999)},
    {a: R(20000, 99999), b: R(100, 999)}
  ];
  return q.done(`<div class="vrow">${items.map(it => ART.b64Vc(q, it.a, it.b)).join('')}</div>`,
    items.map(it => `${sp(it.a)} − ${sp(it.b)} = ${sp(it.a - it.b)}`).join(';  '));
},

/* ===== tr.73 – Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const sp = ART.b64sp;
  const items = [
    {a: R(90000, 99999), b: R(80000, 89999)},
    {a: R(20000, 99999), b: R(11, 99)},
    {a: R(60000, 99999), b: R(20000, 59999)},
    {a: R(10000, 99999), b: R(1000, 9999)}
  ];
  const line = it => `<div class="eq">${sp(it.a)} <span class="op">−</span> ${sp(it.b)}</div>`;
  return q.done(`<div class="eq-list">${items.map(line).join('')}</div>
      <div class="vrow">${items.map(it => ART.b64Vc(q, it.a, it.b)).join('')}</div>`,
    items.map(it => `${sp(it.a)} − ${sp(it.b)} = ${sp(it.a - it.b)}`).join(';  '));
},

/* ===== tr.73 – Bài 3: Tính nhẩm (theo mẫu) — các số tròn nghìn ===== */
() => {
  const q = Q(3, 'Tính nhẩm (theo mẫu).');
  const sp = ART.b64sp;
  const mb = R(2, 9), ma = R(11, Math.min(18, mb + 9));
  const items = [];
  for (let g = 0; g < 90 && items.length < 3; g++){
    const b = R(2, 9), a = R(11, Math.min(18, b + 9));
    if (!items.some(x => x.a === a && x.b === b)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 12 + items.length, b: 4});
  const L = ['a)', 'b)', 'c)'];
  const html = noteBox(`Mẫu: ${sp(ma * 1000)} − ${mb} 000 = ?<br>
      Nhẩm: ${ma} nghìn − ${mb} nghìn = ${ma - mb} nghìn<br>
      ${sp(ma * 1000)} − ${mb} 000 = ${sp((ma - mb) * 1000)}`)
    + '<div class="b64-list">' + items.map((it, i) =>
      `<div><span class="b64-let">${L[i]}</span>${sp(it.a * 1000)} <span class="op">−</span>
        ${it.b} 000 <span class="op">=</span> ${q.num((it.a - it.b) * 1000)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.a} nghìn − ${x.b} nghìn = ${x.a - x.b} nghìn`).join(';  '));
},

/* ===== tr.73 – Bài 4: nhà máy sản xuất xe ô tô đồ chơi ===== */
() => {
  const q = Q(4, '');
  const sp = ART.b64sp;
  const t1 = R(80, 120) * 100, t2 = R(70, 110) * 100;
  const tong = t1 + t2 + R(30, 90) * 100;
  const conLai = tong - t1 - t2;
  return q.done(`<p class="wordq">Trong ba tháng đầu năm, một nhà máy sản xuất đồ chơi đã sản xuất
      được ${sp(tong)} xe ô tô. Tháng 1 nhà máy bán đi ${sp(t1)} xe ô tô, tháng 2 nhà máy bán đi
      ${sp(t2)} xe ô tô. Hỏi nhà máy còn lại bao nhiêu xe ô tô đồ chơi?</p>
    <div class="b64-cars">${ART.b64Car(0)}${ART.b64Car(1)}${ART.b64Car(2)}</div>
    <div class="bullet">Trong hai tháng, nhà máy đã bán đi ${q.num(t1 + t2)} xe ô tô.</div>
    <div class="bullet">Nhà máy còn lại ${q.num(conLai)} xe ô tô đồ chơi.</div>`,
    `${sp(t1)} + ${sp(t2)} = ${sp(t1 + t2)} (xe);  ${sp(tong)} − ${sp(t1 + t2)} = ${sp(conLai)} (xe)`);
},

/* ===== tr.73 – Bài 1a (luyện tập): Tính nhẩm — các số tròn chục nghìn ===== */
() => {
  const q = Q(1, 'a) Tính nhẩm (theo mẫu).');
  const sp = ART.b64sp;
  const ma = R(4, 9), mb = R(1, ma - 1);
  const items = [];
  for (let g = 0; g < 90 && items.length < 2; g++){
    const a = R(3, 9), b = R(1, a - 1);
    if (!items.some(x => x.a === a && x.b === b)) items.push({a, b});
  }
  while (items.length < 2) items.push({a: 5 + items.length, b: 2});
  items.push({a: 10, b: R(1, 9)});
  const html = noteBox(`Mẫu: ${sp(ma * 10000)} − ${sp(mb * 10000)} = ?<br>
      Nhẩm: ${ma} chục nghìn − ${mb} chục nghìn = ${ma - mb} chục nghìn<br>
      ${sp(ma * 10000)} − ${sp(mb * 10000)} = ${sp((ma - mb) * 10000)}`)
    + '<div class="b64-list">' + items.map(it =>
      `<div>${sp(it.a * 10000)} <span class="op">−</span> ${sp(it.b * 10000)}
        <span class="op">=</span> ${q.num((it.a - it.b) * 10000)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.a} chục nghìn − ${x.b} chục nghìn = ${x.a - x.b} chục nghìn`).join(';  '));
},

/* ===== tr.74 – Bài 1b (luyện tập): Tính nhẩm — số nghìn trừ số tròn nghìn ===== */
() => {
  const q = Q(1, 'b) Tính nhẩm (theo mẫu).');
  const sp = ART.b64sp;
  const ma = R(21, 98), mb = R(2, 9);
  const items = [];
  for (let g = 0; g < 120 && items.length < 3; g++){
    const a = R(21, 98), b = R(2, 9);
    if (!items.some(x => x.a === a && x.b === b)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 40 + items.length, b: 6});
  const html = noteBox(`Mẫu: ${sp(ma * 1000)} − ${sp(mb * 1000)} = ?<br>
      Nhẩm: ${ma} nghìn − ${mb} nghìn = ${ma - mb} nghìn<br>
      ${sp(ma * 1000)} − ${sp(mb * 1000)} = ${sp((ma - mb) * 1000)}`)
    + '<div class="b64-list">' + items.map(it =>
      `<div>${sp(it.a * 1000)} <span class="op">−</span> ${sp(it.b * 1000)}
        <span class="op">=</span> ${q.num((it.a - it.b) * 1000)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.a} nghìn − ${x.b} nghìn = ${x.a - x.b} nghìn`).join(';  '));
},

/* ===== tr.74 – Bài 2 (luyện tập): Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const sp = ART.b64sp;
  const items = [
    {a: R(90000, 99999), b: R(70000, 89999)},
    {a: R(40000, 89999), b: R(1000, 9999)},
    {a: R(30000, 99999), b: R(100, 999)}
  ];
  const line = it => `<div class="eq">${sp(it.a)} <span class="op">−</span> ${sp(it.b)}</div>`;
  return q.done(`<div class="eq-list">${items.map(line).join('')}</div>
      <div class="vrow">${items.map(it => ART.b64Vc(q, it.a, it.b)).join('')}</div>`,
    items.map(it => `${sp(it.a)} − ${sp(it.b)} = ${sp(it.a - it.b)}`).join(';  '));
},

/* ===== tr.74 – Bài 3 (luyện tập): biểu thức nào có giá trị lớn hơn? ===== */
() => {
  const q = Q(3, 'Trong hai biểu thức dưới đây, biểu thức nào có giá trị lớn hơn?');
  const sp = ART.b64sp;
  const a1 = R(6, 9) * 10000, a2 = R(3, 9) * 1000;
  let a3 = R(1000, 9999);
  const k = R(6, 9), tail = R(1000, 9999);
  const b1 = k * 10000 + tail, b2 = tail, b3 = R(1, k - 1) * 10000;
  const valB = k * 10000 - b3;
  let valA = a1 - a2 + a3;
  for (let g = 0; g < 40 && valA === valB; g++){ a3 = R(1000, 9999); valA = a1 - a2 + a3; }
  if (valA === valB){ a3 = a3 > 1000 ? a3 - 1 : a3 + 1; valA = a1 - a2 + a3; }
  const ans = valA > valB ? 'a' : 'b';
  const html = `<div class="b64-exp">
      <div>a) ${sp(a1)} <span class="op">−</span> ${sp(a2)} <span class="op">+</span> ${sp(a3)}</div>
      <div>b) ${sp(b1)} <span class="op">−</span> ${sp(b2)} <span class="op">−</span> ${sp(b3)}</div>
    </div>
    <div class="fill-line">Giá trị của biểu thức a) là ${q.num(valA)}.</div>
    <div class="fill-line">Giá trị của biểu thức b) là ${q.num(valB)}.</div>
    <div class="fill-line">Biểu thức có giá trị lớn hơn là biểu thức ${q.pick(ans, ['a', 'b'])}</div>`;
  return q.done(html,
    `a) ${sp(a1)} − ${sp(a2)} = ${sp(a1 - a2)}; ${sp(a1 - a2)} + ${sp(a3)} = ${sp(valA)}.  `
    + `b) ${sp(b1)} − ${sp(b2)} = ${sp(k * 10000)}; ${sp(k * 10000)} − ${sp(b3)} = ${sp(valB)}.  `
    + `Vì ${sp(Math.max(valA, valB))} > ${sp(Math.min(valA, valB))} nên biểu thức ${ans} lớn hơn.`);
},

/* ===== tr.74 – Bài 4 (luyện tập): đường từ nhà An đến thị xã ===== */
() => {
  const q = Q(4, '');
  const sp = ART.b64sp;
  const len = R(50, 90) * 100, ngan = R(20, 40) * 100;
  const xuong = len - ngan;
  return q.done(`<p class="wordq">Đường từ nhà An đến thị xã gồm một đoạn lên dốc và một đoạn
      xuống dốc. Đoạn đường lên dốc dài ${sp(len)} m, đoạn đường xuống dốc ngắn hơn đoạn đường
      lên dốc là ${sp(ngan)} m. Hỏi đường từ nhà An đến thị xã dài bao nhiêu mét?</p>
    ${ART.b64Road(sp(len))}
    <div class="bullet">Đoạn đường xuống dốc dài ${q.num(xuong)} m.</div>
    <div class="bullet">Đường từ nhà An đến thị xã dài ${q.num(len + xuong)} m.</div>`,
    `${sp(len)} − ${sp(ngan)} = ${sp(xuong)} (m);  ${sp(len)} + ${sp(xuong)} = ${sp(len + xuong)} (m)`);
},

/* ===== tr.75 – Bài 5 (luyện tập): Đố bạn – tìm hiệu ===== */
() => {
  const q = Q(5, 'Đố bạn.');
  const sp = ART.b64sp;
  const BIG = [
    {t: 'số lớn nhất có năm chữ số', v: 99999},
    {t: 'số lớn nhất có năm chữ số khác nhau', v: 98765},
    {t: 'số lớn nhất có bốn chữ số', v: 9999}
  ];
  const SML = [
    {t: 'số bé nhất có ba chữ số khác nhau', v: 102},
    {t: 'số bé nhất có ba chữ số', v: 100},
    {t: 'số bé nhất có bốn chữ số', v: 1000},
    {t: 'số bé nhất có bốn chữ số khác nhau', v: 1023}
  ];
  const big = pick(BIG);
  const sml = pick(SML.filter(x => x.v < big.v));
  const hieu = big.v - sml.v;
  return q.done(`<p class="wordq">Tìm hiệu của ${big.t} và ${sml.t}.</p>
    <div class="bullet">${big.t.charAt(0).toUpperCase() + big.t.slice(1)} là ${q.num(big.v)}.</div>
    <div class="bullet">${sml.t.charAt(0).toUpperCase() + sml.t.slice(1)} là ${q.num(sml.v)}.</div>
    <div class="bullet">Hiệu của hai số đó là ${q.num(hieu)}.</div>`,
    `${sp(big.v)} − ${sp(sml.v)} = ${sp(hieu)}`);
},
];
