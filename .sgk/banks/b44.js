/* ==================== BÀI 44: ÔN TẬP CHUNG (SGK tr.120, 121) ====================
   luyện tập tr.120 : bài 1 (Đặt tính rồi tính – nhân), bài 2 (Tính – chia),
                      bài 3 (trung điểm và góc vuông trong hình ngôi nhà),
                      bài 4 (Tính giá trị của biểu thức), bài 5 (thùng và can nước mắm)
   luyện tập tr.121 : bài 1 (Đặt tính rồi tính – nhân), bài 2 (Tính – chia số có ba chữ số),
                      bài 3 (độ dài đường gấp khúc – túi muối trên cân),
                      bài 4 (Tính giá trị của biểu thức), bài 5 (thùng sách vở ủng hộ vùng lũ)
=============================================================================== */

/* khung đặt tính chia */
ART.b44Div = (bi, chia, thuong) => `<div class="b44-dv">
  <span class="dva">${bi}</span><span class="dvb">${chia}</span><span class="dvq">${thuong}</span></div>`;

/* lưới ô vuông có các đoạn thẳng và điểm được đặt tên */
ART.b44Grid = (cols, rows, segs, pts) => {
  const u = 26, W = cols * u, H = rows * u;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * u} 0V${H}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * u}H${W}`;
  const s = segs.map(v => `M${v[0] * u} ${v[1] * u}L${v[2] * u} ${v[3] * u}`).join('');
  const dots = pts.map(p => `<circle cx="${p.x * u}" cy="${p.y * u}" r="3.4" fill="#111"/>`).join('');
  const tx = pts.map(p => `<text x="${p.x * u + (p.dx || 0)}" y="${p.y * u + (p.dy || 0)}"
    text-anchor="middle" font-size="16" font-weight="700">${p.n}</text>`).join('');
  return `<svg viewBox="-24 -24 ${W + 48} ${H + 48}" class="b44-gs">
    <path d="${g}" fill="none" stroke="#7fcdec" stroke-width="1"/>
    <path d="${s}" fill="none" stroke="#111" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${tx}</svg>`;
};

/* đường gấp khúc bốn điểm dạng zíc-zắc */
ART.b44Path = (n, l1, l2, l3) => `<svg viewBox="-12 24 520 208" class="b44-path">
  <path d="M60 178L200 92L340 186L470 100" fill="none" stroke="#111" stroke-width="3.2"
    stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="60" cy="178" r="4.6"/><circle cx="200" cy="92" r="4.6"/>
  <circle cx="340" cy="186" r="4.6"/><circle cx="470" cy="100" r="4.6"/>
  <text x="42" y="184" text-anchor="middle" font-size="18" font-weight="700">${n.A}</text>
  <text x="200" y="74" text-anchor="middle" font-size="18" font-weight="700">${n.B}</text>
  <text x="340" y="208" text-anchor="middle" font-size="18" font-weight="700">${n.C}</text>
  <text x="472" y="82" text-anchor="middle" font-size="18" font-weight="700">${n.D}</text>
  <text x="104" y="118" text-anchor="middle" font-size="16">${l1} mm</text>
  <text x="272" y="120" text-anchor="middle" font-size="16">${l2} mm</text>
  <text x="418" y="122" text-anchor="middle" font-size="16">${l3} mm</text>
</svg>`;

/* cân thăng bằng: đĩa trái ba quả cân, đĩa phải một túi muối */
ART.b44Scale = (ws, ten) => {
  const wt = (x, s) => `<g transform="translate(${x},132) scale(${s})">
    <path d="M-4 -22h8v8h-8z" fill="none" stroke="#7d8b94" stroke-width="2.4"/>
    <path d="M-14 -14h28l5 30h-38z" fill="#c9d3d9" stroke="#7d8b94" stroke-width="2.2"/></g>`;
  const X = [66, 106, 146];
  return `<svg viewBox="0 0 420 232" class="b44-scale">
    <path d="M150 198h120l14 22H136z" fill="#a9dcf0" stroke="#4f93b3" stroke-width="2.4"/>
    <rect x="190" y="152" width="40" height="48" fill="#a9dcf0" stroke="#4f93b3" stroke-width="2.4"/>
    <path d="M40 152H380" stroke="#7ec6e2" stroke-width="6" stroke-linecap="round"/>
    <circle cx="210" cy="154" r="15" fill="#f0c860" stroke="#a8802a" stroke-width="2.4"/>
    <path d="M210 154v-9M210 154l7 4" stroke="#a8802a" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="106" cy="138" rx="70" ry="12" fill="#c9e9f6" stroke="#4f93b3" stroke-width="2.4"/>
    <ellipse cx="314" cy="138" rx="70" ry="12" fill="#c9e9f6" stroke="#4f93b3" stroke-width="2.4"/>
    ${X.map(x => wt(x, .92)).join('')}
    <path d="M270 132l14-52 66 8 8 46z" fill="#eaf4fb" stroke="#4f7a9a" stroke-width="2.4"
      stroke-linejoin="round"/>
    <path d="M284 80l10-14 58 10-2 12z" fill="#cfe4f2" stroke="#4f7a9a" stroke-width="2.2"
      stroke-linejoin="round"/>
    <text x="316" y="116" text-anchor="middle" font-size="15" font-weight="700" fill="#1f5f8a">${ten}</text>
    ${ws.map((w, i) => `<text x="${X[i] - 14 + i * 6}" y="${52 + i * 14}" text-anchor="middle"
       font-size="15">${w} g</text>`).join('')}
    <path d="M58 60L64 108M104 74L106 108M152 88L146 108" stroke="#111" stroke-width="1.3"/>
  </svg>`;
};

/* một thùng lớn và n chiếc can nhỏ */
ART.b44Jar = (big, n, small) => {
  const can = x => `<g transform="translate(${x},70)">
    <rect x="0" y="14" width="34" height="46" rx="6" fill="#bfe3f5" stroke="#3f7fa5" stroke-width="2.2"/>
    <rect x="11" y="2" width="12" height="13" rx="3" fill="#a3d3ec" stroke="#3f7fa5" stroke-width="2.2"/>
    <text x="17" y="44" text-anchor="middle" font-size="13" font-weight="800" fill="#134a68">${small}
      <tspan font-style="italic"> l</tspan></text></g>`;
  let s = '';
  for (let i = 0; i < n; i++) s += can(120 + i * 42);
  return `<svg viewBox="0 0 ${140 + n * 42} 140" class="b44-jar">
    <ellipse cx="55" cy="34" rx="42" ry="12" fill="#d8b283" stroke="#8a5a2b" stroke-width="2.4"/>
    <path d="M13 34v76q42 14 84 0V34" fill="#e0bd8f" stroke="#8a5a2b" stroke-width="2.4"/>
    <path d="M13 60q42 14 84 0M13 88q42 14 84 0" fill="none" stroke="#8a5a2b" stroke-width="2"/>
    <text x="55" y="82" text-anchor="middle" font-size="17" font-weight="800" fill="#4a2c10">${big}
      <tspan font-style="italic"> l</tspan></text>
    ${s}</svg>`;
};

BANKS.b44 = [

/* ===== tr.120 – Bài 1: Đặt tính rồi tính (nhân số có ba chữ số) ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const items = [];
  for (let g = 0; g < 120 && items.length < 3; g++){
    const b = R(3, 8), a = R(101, Math.floor(999 / b));
    if (a >= 101 && !items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 111 + items.length, b: 3});
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a * it.b)}</span></div>`;
  return q.done(`<div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${x.a} × ${x.b} = ${x.a * x.b}`).join(';  '));
},

/* ===== tr.120 – Bài 2: Tính (chia số có hai chữ số cho số có một chữ số) ===== */
() => {
  const q = Q(2, 'Tính.');
  const items = [];
  for (let g = 0; g < 120 && items.length < 3; g++){
    const d = R(3, 7), t = R(10, Math.floor(99 / d)), n = d * t;
    if (!items.some(x => x.n === n)) items.push({n, d, t});
  }
  while (items.length < 3) items.push({n: 36, d: 3, t: 12});
  return q.done(`<div class="b44-dvrow">${items.map(it =>
      `<div>${ART.b44Div(it.n, it.d, q.num(it.t))}</div>`).join('')}</div>`,
    items.map(x => `${x.n} : ${x.d} = ${x.t}`).join(';  '));
},

/* ===== tr.120 – Bài 3: trung điểm và góc vuông trong hình ngôi nhà ===== */
() => {
  const q = Q(3, 'Trong hình bên:');
  let k = 2, ha = 3, ht = 4;
  for (let g = 0; g < 60; g++){
    k = R(1, 3); ha = R(2, 3); ht = R(3, 5);
    if (ha !== 2 * k) break;
  }
  if (ha === 2 * k){ k = 2; ha = 3; ht = 4; }
  const bag = 'ABCDEGHIKLMNPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const n = {A: bag[0], B: bag[1], C: bag[2], D: bag[3], E: bag[4],
    M: bag[5], N: bag[6], P: bag[7], Q: bag[8]};
  const x0 = 1, hy = ha + 1, by = hy + ht, cols = 4 * k + 2, rows = ha + ht + 2;
  const segs = [
    [x0, hy, x0 + 2 * k, hy - ha], [x0 + 2 * k, hy - ha, x0 + 4 * k, hy],
    [x0, hy, x0 + 4 * k, hy], [x0, hy, x0, by], [x0 + 4 * k, hy, x0 + 4 * k, by],
    [x0, by, x0 + 4 * k, by]
  ];
  const pts = [
    {x: x0 + 2 * k, y: hy - ha, n: n.A, dy: -11},
    {x: x0, y: hy, n: n.B, dx: -14, dy: 4}, {x: x0 + 4 * k, y: hy, n: n.C, dx: 14, dy: 4},
    {x: x0 + k, y: hy, n: n.Q, dy: 20}, {x: x0 + 2 * k, y: hy, n: n.M, dy: 20},
    {x: x0, y: by, n: n.E, dx: -14, dy: 4}, {x: x0 + 4 * k, y: by, n: n.D, dx: 14, dy: 4},
    {x: x0 + 2 * k, y: by, n: n.N, dy: 20}, {x: x0 + 3 * k, y: by, n: n.P, dy: 20}
  ];
  const all = [n.A, n.B, n.C, n.D, n.E, n.M, n.N, n.P, n.Q].sort(() => Math.random() - .5);
  const goc = [n.B, n.C, n.D, n.E].slice().sort().join(',');
  return q.done(ART.b44Grid(cols, rows, segs, pts)
    + `<div class="b44-sub">a) Nêu tên trung điểm của các đoạn thẳng
        ${n.B}${n.C}, ${n.E}${n.D}, ${n.B}${n.M}, ${n.N}${n.D}.</div>
       <div class="fill-line">Trung điểm của ${n.B}${n.C} là ${q.pick(n.M, all)}</div>
       <div class="fill-line">Trung điểm của ${n.E}${n.D} là ${q.pick(n.N, all)}</div>
       <div class="fill-line">Trung điểm của ${n.B}${n.M} là ${q.pick(n.Q, all)}</div>
       <div class="fill-line">Trung điểm của ${n.N}${n.D} là ${q.pick(n.P, all)}</div>
       <div class="b44-sub">b) Có mấy góc vuông? Nêu tên đỉnh của mỗi góc vuông đó.</div>
       <div class="fill-line">Trong hình có ${q.num(4, 1)} góc vuông.</div>
       <div class="fill-line">Các đỉnh của góc vuông là: ${q.pick(goc, all)}</div>`,
    `a) ${n.M} là trung điểm ${n.B}${n.C}; ${n.N} là trung điểm ${n.E}${n.D}; `
      + `${n.Q} là trung điểm ${n.B}${n.M}; ${n.P} là trung điểm ${n.N}${n.D}.  `
      + `b) 4 góc vuông: đỉnh ${n.B} cạnh ${n.B}${n.C} và ${n.B}${n.E}; đỉnh ${n.C} cạnh ${n.C}${n.B} và ${n.C}${n.D}; `
      + `đỉnh ${n.E} cạnh ${n.E}${n.B} và ${n.E}${n.D}; đỉnh ${n.D} cạnh ${n.D}${n.C} và ${n.D}${n.E}.`);
},

/* ===== tr.120 – Bài 4: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(4, 'Tính giá trị của biểu thức.');
  const a1 = R(120, 260), b1 = R(21, 79), c1 = R(20, a1 - 20);
  const k2 = R(6, 12), m2 = R(8, 15), n2 = R(2, m2 - 2);
  return q.done(`<div class="b44-cols">
      <div class="b44-ex"><span class="b44-let">a)</span>${a1} + ${b1} − ${c1} = ${q.num(a1 + b1 - c1)}</div>
      <div class="b44-ex"><span class="b44-let">b)</span>${k2} × (${m2} − ${n2}) = ${q.num(k2 * (m2 - n2))}</div>
    </div>`,
    `a) ${a1} + ${b1} = ${a1 + b1}; ${a1 + b1} − ${c1} = ${a1 + b1 - c1}.  `
      + `b) ${m2} − ${n2} = ${m2 - n2}; ${k2} × ${m2 - n2} = ${k2 * (m2 - n2)}.`);
},

/* ===== tr.120 – Bài 5: thùng và can nước mắm ===== */
() => {
  const q = Q(5, '');
  const thung = pick([100, 150, 200]), soCan = R(3, 6), moiCan = pick([5, 10, 20]);
  const tong = thung + soCan * moiCan;
  return q.done(`<p class="wordq">Cửa hàng nhà bà Năm có 1 thùng đựng ${thung} <i>l</i> nước mắm
      và ${soCan} can, mỗi can đựng ${moiCan} <i>l</i> nước mắm.
      Hỏi cửa hàng nhà bà Năm có tất cả bao nhiêu lít nước mắm?</p>`
    + ART.b44Jar(thung, soCan, moiCan)
    + `<div class="bullet">${soCan} can đựng ${q.num(soCan * moiCan)} <i>l</i> nước mắm.</div>
       <div class="bullet">Cửa hàng có tất cả ${q.num(tong)} <i>l</i> nước mắm.</div>`,
    `${moiCan} × ${soCan} = ${soCan * moiCan} (l);  ${thung} + ${soCan * moiCan} = ${tong} (l)`);
},

/* ===== tr.121 – Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const b0 = R(3, 9), a0 = R(21, Math.min(99, Math.floor(999 / b0)));
  const items = [{a: a0, b: b0}];
  for (let g = 0; g < 120 && items.length < 3; g++){
    const b = R(4, 9), a = R(101, Math.floor(999 / b));
    if (a >= 101 && !items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 108 + items.length, b: 4});
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a * it.b)}</span></div>`;
  return q.done(`<div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${x.a} × ${x.b} = ${x.a * x.b}`).join(';  '));
},

/* ===== tr.121 – Bài 2: Tính (chia số có ba chữ số cho số có một chữ số) ===== */
() => {
  const q = Q(2, 'Tính.');
  const items = [];
  for (let g = 0; g < 150 && items.length < 3; g++){
    const d = R(3, 8), t = R(Math.ceil(100 / d), Math.floor(999 / d)), n = d * t;
    if (n >= 100 && n <= 999 && !items.some(x => x.n === n)) items.push({n, d, t});
  }
  while (items.length < 3) items.push({n: 366, d: 3, t: 122});
  return q.done(`<div class="b44-dvrow">${items.map(it =>
      `<div>${ART.b44Div(it.n, it.d, q.num(it.t))}</div>`).join('')}</div>`,
    items.map(x => `${x.n} : ${x.d} = ${x.t}`).join(';  '));
},

/* ===== tr.121 – Bài 3: độ dài đường gấp khúc và túi muối trên cân ===== */
() => {
  const q = Q(3, '');
  const bag = 'ABCDEGHIKLMNPQ'.split('').sort(() => Math.random() - .5);
  const n = {A: bag[0], B: bag[1], C: bag[2], D: bag[3]};
  const l1 = R(15, 49), l2 = R(15, 49), l3 = R(15, 49);
  const ws = [pick([100, 200, 500]), pick([100, 200]), pick([50, 100, 200])];
  const ten = pick(['Muối', 'Đường', 'Gạo']);
  const tong = ws[0] + ws[1] + ws[2];
  return q.done(`<div class="b44-sub">a) Tính độ dài đường gấp khúc ${n.A}${n.B}${n.C}${n.D}.</div>`
    + ART.b44Path(n, l1, l2, l3)
    + `<div class="fill-line">Độ dài đường gấp khúc ${n.A}${n.B}${n.C}${n.D}
        là ${q.num(l1 + l2 + l3)} mm.</div>
       <div class="b44-sub">b) Túi ${ten.toLowerCase()} cân nặng bao nhiêu gam?</div>`
    + ART.b44Scale(ws, ten)
    + `<div class="fill-line">Túi ${ten.toLowerCase()} cân nặng ${q.num(tong)} g.</div>`,
    `a) ${l1} + ${l2} + ${l3} = ${l1 + l2 + l3} (mm).  `
      + `b) ${ws[0]} + ${ws[1]} + ${ws[2]} = ${tong} (g).`);
},

/* ===== tr.121 – Bài 4: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(4, 'Tính giá trị của biểu thức.');
  const d1 = R(3, 8), t1 = R(11, 40), a1 = d1 * t1, k1 = R(2, 5);
  const b2 = R(2, 6), c2 = R(2, 6), t2 = R(4, 20), a2 = b2 * c2 * t2;
  return q.done(`<div class="b44-cols">
      <div class="b44-ex"><span class="b44-let">a)</span>${a1} : ${d1} × ${k1} = ${q.num(t1 * k1)}</div>
      <div class="b44-ex"><span class="b44-let">b)</span>${a2} : (${b2} × ${c2}) = ${q.num(t2)}</div>
    </div>`,
    `a) ${a1} : ${d1} = ${t1}; ${t1} × ${k1} = ${t1 * k1}.  `
      + `b) ${b2} × ${c2} = ${b2 * c2}; ${a2} : ${b2 * c2} = ${t2}.`);
},

/* ===== tr.121 – Bài 5: thùng sách vở ủng hộ các bạn vùng lũ ===== */
() => {
  const q = Q(5, '');
  const dau = pick([15, 20, 24, 25, 30]), lan = R(2, 4);
  const sau = dau * lan;
  return q.done(`<p class="wordq">Để giúp đỡ các bạn học sinh bị ảnh hưởng bởi lũ lụt,
      tuần đầu trường em góp được ${dau} thùng sách vở và đồ dùng học tập.
      Tuần sau trường em góp được số thùng gấp ${lan} lần số thùng ở tuần đầu.
      Hỏi sau hai tuần trường em góp được tất cả bao nhiêu thùng sách vở và đồ dùng học tập?</p>
    <div class="bullet">Tuần sau trường em góp được ${q.num(sau)} thùng.</div>
    <div class="bullet">Sau hai tuần trường em góp được tất cả ${q.num(dau + sau)} thùng.</div>`,
    `${dau} × ${lan} = ${sau} (thùng);  ${dau} + ${sau} = ${dau + sau} (thùng)`);
},
];
