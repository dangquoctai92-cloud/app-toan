/* ==================== BÀI 29: LUYỆN TẬP CHUNG (SGK tr.83, 84) ====================
   luyện tập tr.83 : bài 1 (tính nhẩm), bài 2 (qua cây cầu lấy giỏ táo),
                     bài 3 (tấm thiệp – gấp một số lần), bài 4 (gạo – giảm một số lần)
   luyện tập tr.84 : bài 1 (đặt tính rồi tính – chia có dư), bài 2 (Số ? – sơ đồ mũi tên),
                     bài 3 (may quần áo – chia có dư), bài 4 (trồng cây – hai bước tính)
================================================================================================ */

ART.b29Arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

ART.b29Kid = i => {
  const shirt = ['#4aa3df', '#e8734a', '#f2c14e', '#7ec46a'][i % 4];
  const pant = ['#2f5d8a', '#3a6ea5', '#8a5a2b', '#4a4a6a'][i % 4];
  return `<svg viewBox="0 0 60 106" class="b29-kid-art">
    <circle cx="30" cy="20" r="13" fill="#f6d3b4" stroke="#c99a72" stroke-width="1.6"/>
    <path d="M17 17q3-13 13-13t13 13q-6-6-13-6t-13 6z" fill="#2b2b2b"/>
    <circle cx="25" cy="21" r="1.8" fill="#333"/><circle cx="35" cy="21" r="1.8" fill="#333"/>
    <path d="M26 27q4 3 8 0" fill="none" stroke="#b5745a" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M18 36h24v30H18z" fill="${shirt}"/>
    <path d="M18 38l-9 22 6 3 7-16zM42 38l9 22-6 3-7-16z" fill="${shirt}"/>
    <path d="M20 66h20v22H20z" fill="${pant}"/>
    <path d="M21 88h7v6h-7zM32 88h7v6h-7z" fill="#f6d3b4"/>
    <path d="M17 94h14v6H17zM31 94h14v6H31z" fill="#555"/>
  </svg>`;
};

ART.b29Card = n => `<svg viewBox="0 0 70 50" class="b29-card-art">
  <rect x="3" y="3" width="64" height="44" rx="4" fill="#fff" stroke="#8a8a8a" stroke-width="2"/>
  <text x="35" y="36" text-anchor="middle" font-size="25" font-weight="700" fill="#222">${n}</text>
</svg>`;

ART.b29Bridge = (L, lab) => `<svg viewBox="0 0 220 98" class="b29-bridge-art">
  <path d="M6 78q104-54 208 0v14H6z" fill="#d79a58" stroke="#96652f" stroke-width="2.4"/>
  <path d="M6 62q104-54 208 0" fill="none" stroke="#96652f" stroke-width="4"/>
  <path d="M30 68v14M70 60v20M110 57v22M150 60v20M190 68v14" stroke="#96652f" stroke-width="2.6"/>
  <text x="110" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="#5a3a12">${lab}</text>
  <text x="110" y="88" text-anchor="middle" font-size="17" font-weight="800" fill="#d63384">${L}</text>
</svg>`;

ART.b29Basket = n => `<svg viewBox="0 0 110 100" class="b29-basket-art">
  <path d="M22 36a33 24 0 0 1 66 0" fill="none" stroke="#b07d43" stroke-width="4"/>
  <circle cx="40" cy="42" r="10" fill="#e2483c"/><circle cx="60" cy="39" r="11" fill="#d93a2e"/>
  <circle cx="78" cy="44" r="9" fill="#e2483c"/><circle cx="50" cy="50" r="10" fill="#f05a4c"/>
  <path d="M12 48h86l-10 46H22z" fill="#e3b378" stroke="#95602f" stroke-width="2.6"/>
  <path d="M12 48h86" stroke="#95602f" stroke-width="4.4" stroke-linecap="round"/>
  <rect x="30" y="60" width="50" height="24" rx="4" fill="#fff" stroke="#95602f" stroke-width="1.8"/>
  <text x="55" y="79" text-anchor="middle" font-size="19" font-weight="700" fill="#222">${n}</text>
</svg>`;

BANKS.b29 = [

/* ===== tr.83 – Bài 1: Tính nhẩm (nhân, chia số tròn chục) ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const MUL = [], DIV = [];
  for (let d = 2; d <= 9; d++) for (let k = 1; k * d <= 9; k++){
    MUL.push({a: k * 10, b: d, r: k * d * 10});
    DIV.push({a: k * d * 10, b: d, r: k * 10});
  }
  const A = MUL.slice().sort(() => Math.random() - .5).slice(0, 4);
  const B = DIV.slice().sort(() => Math.random() - .5).slice(0, 4);
  const cellM = it => `<div class="calc-cell">${it.a} × ${it.b} = ${q.num(it.r)}</div>`;
  const cellD = it => `<div class="calc-cell">${it.a} : ${it.b} = ${q.num(it.r)}</div>`;
  return q.done(`<div class="sub-lbl">a)</div>
      <div class="calc-grid">${A.map(cellM).join('')}</div>
    <div class="sub-lbl">b)</div>
      <div class="calc-grid">${B.map(cellD).join('')}</div>`,
    `${A[0].a} × ${A[0].b} = ${A[0].r};  ${B[0].a} : ${B[0].b} = ${B[0].r}`);
},

/* ===== tr.83 – Bài 2: Mỗi bạn đi qua cây cầu nào để lấy được giỏ táo thích hợp? ===== */
() => {
  const q = Q(2, 'Mỗi bạn cần đi qua cây cầu nào để lấy được giỏ táo thích hợp?');
  const two = (lo, hi) => {
    const s = [];
    for (let i = 0; i < 60 && s.length < 2; i++){ const v = R(lo, hi); if (!s.includes(v)) s.push(v); }
    if (s.length < 2) s.push(s[0] + 1);
    return s;
  };
  let kA = 2, mB = 3, nA = [8, 16], nB = [7, 11], rA = [4, 8], rB = [21, 33];
  for (let g = 0; g < 300; g++){
    const k = pick([2, 3]);
    let m = pick([3, 4, 5]);
    if (m === k) m = 5;
    const ra = two(3, 9), na = ra.map(x => x * k);
    const nb = two(7, 15), rb = nb.map(y => y * m);
    const nums = na.concat(nb), res = ra.concat(rb);
    if (new Set(nums).size !== 4 || new Set(res).size !== 4) continue;
    if (na.some(x => res.indexOf(x * m) >= 0)) continue;
    if (nb.some(y => y % k === 0 && res.indexOf(y / k) >= 0)) continue;
    kA = k; mB = m; nA = na; nB = nb; rA = ra; rB = rb;
    break;
  }
  const kids = nA.map(x => ({n: x, br: 'A', r: x / kA}))
    .concat(nB.map(y => ({n: y, br: 'B', r: y * mB})))
    .sort(() => Math.random() - .5);
  const baskets = rA.concat(rB).sort(() => Math.random() - .5);
  const kidHtml = kids.map((kd, i) => `<div class="b29-kid">${ART.b29Kid(i)}${ART.b29Card(kd.n)}
      ${i === 0 ? `<div class="b29-given">cầu ${kd.br}</div>` : q.pick(kd.br, ['A', 'B'])}</div>`).join('');
  return q.done(`<div class="b29-row">${baskets.map(v => ART.b29Basket(v)).join('')}</div>
    <div class="b29-row">${ART.b29Bridge('A', 'giảm ' + kA + ' lần')}${ART.b29Bridge('B', 'gấp ' + mB + ' lần')}</div>
    <div class="b29-row">${kidHtml}</div>
    <div class="hint-line">Bạn cầm thẻ số ${kids[0].n} nói: "Tớ sẽ đi qua cây cầu ${kids[0].br}."
      Chọn cây cầu cho ba bạn còn lại.</div>`,
    kids.map(kd => `${kd.n} qua cầu ${kd.br} được ${kd.r}`).join('; '));
},

/* ===== tr.83 – Bài 3: Mai làm thiệp, Rô-bốt gấp n lần ===== */
() => {
  const m = R(11, 33), n = R(2, 3), rb = m * n;
  const q = Q(3, `Mai làm được ${m} tấm thiệp, số tấm thiệp làm được của Rô-bốt gấp ${n} lần của Mai.
    Hỏi Rô-bốt làm được bao nhiêu tấm thiệp?`);
  return q.done(`<div class="fill-line">Số tấm thiệp Rô-bốt làm được là:</div>
    <div class="eq">${m} <span class="op">×</span> ${q.num(n, 1)} = ${q.num(rb)} (tấm thiệp)</div>
    <div class="fill-line">Đáp số: ${q.num(rb)} tấm thiệp.</div>`,
    `${m} × ${n} = ${rb} (tấm thiệp)`);
},

/* ===== tr.83 – Bài 4: gạo buổi chiều bằng buổi sáng giảm đi n lần ===== */
() => {
  const n = R(2, 5), c = R(5, 30), s = n * c;
  const q = Q(4, `Buổi sáng cửa hàng bán được ${s} kg gạo. Số gạo buổi chiều bán được bằng
    số gạo buổi sáng giảm đi ${n} lần. Hỏi buổi chiều cửa hàng đó bán được bao nhiêu ki-lô-gam gạo?`);
  return q.done(`<div class="fill-line">Số ki-lô-gam gạo buổi chiều cửa hàng bán được là:</div>
    <div class="eq">${s} <span class="op">:</span> ${q.num(n, 1)} = ${q.num(c)} (kg)</div>
    <div class="fill-line">Đáp số: ${q.num(c)} kg gạo.</div>`,
    `${s} : ${n} = ${c} (kg)`);
},

/* ===== tr.84 – Bài 1: Đặt tính rồi tính (theo mẫu) ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính (theo mẫu).');
  const items = [];
  for (let g = 0; g < 200 && items.length < 4; g++){
    const d = R(2, 9), lo = Math.max(2, Math.ceil(10 / d));
    if (lo > 9) continue;
    const qt = R(lo, 9), r = R(0, d - 1), N = d * qt + r;
    if (N < 10 || N > 99) continue;
    if (items.some(x => x.N === N && x.d === d)) continue;
    items.push({N: N, d: d, qt: qt, r: r, p: d * qt});
  }
  while (items.length < 4) items.push({N: 45, d: 7, qt: 6, r: 3, p: 42});
  const box = (it, given) => `<div class="b29-jar">
      <div class="jb"><div class="dvbox">
        <div class="dvL"><span>${it.N}</span><span class="u">${given ? it.p : q.num(it.p)}</span>
          <span>${given ? it.r : q.num(it.r)}</span></div>
        <div class="dvR"><span>${it.d}</span><span class="hr">${given ? it.qt : q.num(it.qt)}</span></div>
      </div></div>
      <div class="jc">${it.N} : ${it.d}</div></div>`;
  return q.done(`<div class="b29-jars">${items.map((it, i) => box(it, i === 0)).join('')}</div>
    <div class="hint-line">Mẫu là phép chia ${items[0].N} : ${items[0].d} = ${items[0].qt}
      ${items[0].r ? '(dư ' + items[0].r + ')' : '(dư 0)'}.</div>`,
    items.slice(1).map(it => `${it.N} : ${it.d} = ${it.qt} (dư ${it.r})`).join(';  '));
},

/* ===== tr.84 – Bài 2: Số ? (tính theo chiều mũi tên) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const b1 = R(2, 5), a1 = R(2, 4), n1 = b1 * R(3, 9), m1 = n1 * a1, e1 = m1 / b1;
  const c2 = R(2, 5), t2 = R(4, 12), n2 = c2 * t2, m2 = t2, d2 = R(1, t2 - 1), e2 = m2 - d2;
  const f3 = R(2, 4), n3 = R(8, 20), m3 = n3 * f3, g3 = R(2, 9), e3 = m3 + g3;
  const row = (n, l1, mid, l2, end) => `<div class="flow">
      <span class="fnode circle">${n}</span>${ART.b29Arrow(l1)}
      <span class="fnode sq">${mid}</span>${ART.b29Arrow(l2)}
      <span class="fnode tri">${end}</span></div>`;
  return q.done(
    row(n1, 'gấp ' + a1 + ' lần', q.num(m1), 'giảm ' + b1 + ' lần', q.num(e1)) +
    row(n2, 'giảm ' + c2 + ' lần', q.num(m2), 'bớt ' + d2 + ' đơn vị', q.num(e2)) +
    row(n3, 'gấp ' + f3 + ' lần', q.num(m3), 'thêm ' + g3 + ' đơn vị', q.num(e3)),
    `${n1} × ${a1} = ${m1}; ${m1} : ${b1} = ${e1} — ${n2} : ${c2} = ${m2}; ${m2} − ${d2} = ${e2} — ${n3} × ${f3} = ${m3}; ${m3} + ${g3} = ${e3}`);
},

/* ===== tr.84 – Bài 3: Rô-bốt may quần áo công nhân (chia có dư) ===== */
() => {
  const k = R(2, 5), qt = R(5, 15), r = R(1, k - 1), M = k * qt + r;
  const q = Q(3, `Rô-bốt dùng ${M} m vải để may quần áo công nhân. Mỗi bộ quần áo công nhân may hết
    ${k} m vải. Hỏi Rô-bốt có thể may được nhiều nhất bao nhiêu bộ quần áo công nhân và còn thừa mấy mét vải?`);
  return q.done(`<div class="fill-line">Ta có: ${M} <span class="op">:</span> ${k} =
      ${q.num(qt)} (dư ${q.num(r, 1)})</div>
    <div class="bullet">Rô-bốt may được nhiều nhất ${q.num(qt)} bộ quần áo công nhân.</div>
    <div class="bullet">Sau khi may còn thừa ${q.num(r, 1)} m vải.</div>`,
    `${M} : ${k} = ${qt} (dư ${r})`);
},

/* ===== tr.84 – Bài 4: ngày hội trồng cây (bài toán hai bước tính) ===== */
() => {
  const v = R(4, 12), n = R(2, 4), rb = v * n, t = v + rb;
  const q = Q(4, `Trong ngày hội trồng cây, Việt trồng được ${v} cây. Số cây Rô-bốt trồng được
    gấp ${n} lần số cây của Việt. Hỏi cả hai bạn trồng được bao nhiêu cây?`);
  return q.done(`<div class="fill-line">Số cây Rô-bốt trồng được là:</div>
    <div class="eq">${v} <span class="op">×</span> ${q.num(n, 1)} = ${q.num(rb)} (cây)</div>
    <div class="fill-line">Số cây cả hai bạn trồng được là:</div>
    <div class="eq">${q.num(v)} <span class="op">+</span> ${q.num(rb)} = ${q.num(t)} (cây)</div>
    <div class="fill-line">Đáp số: ${q.num(t)} cây.</div>`,
    `${v} × ${n} = ${rb} (cây);  ${v} + ${rb} = ${t} (cây)`);
},
];
