/* ================= BÀI 43: ÔN TẬP HÌNH HỌC VÀ ĐO LƯỜNG (SGK tr.118, 119) =================
   luyện tập tr.118 : bài 1 (góc vuông – góc không vuông – trung điểm), bài 2 (vẽ hình theo mẫu),
                      bài 3a (đường kính, bán kính hình tròn), bài 3b (đếm khối lập phương, khối trụ),
                      bài 4 (khối hộp chữ nhật sơn mặt)
   luyện tập tr.119 : bài 1 (độ dài đường gấp khúc – cân thăng bằng), bài 2 (chọn số đo thích hợp),
                      bài 3 (tính với số đo mm, g, ml), bài 4 (gói mì tôm và hộp sữa)
======================================================================================== */

/* lưới ô vuông có các đoạn thẳng và điểm được đặt tên */
ART.b43Grid = (cols, rows, segs, pts, C, cls) => {
  const u = C || 30, W = cols * u, H = rows * u;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * u} 0V${H}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * u}H${W}`;
  const s = segs.map(v => `M${v[0] * u} ${v[1] * u}L${v[2] * u} ${v[3] * u}`).join('');
  const dots = pts.filter(p => p.n).map(p =>
    `<circle cx="${p.x * u}" cy="${p.y * u}" r="3.4" fill="#111"/>`).join('');
  const tx = pts.filter(p => p.n).map(p =>
    `<text x="${p.x * u + (p.dx || 0)}" y="${p.y * u + (p.dy || 0)}" text-anchor="middle"
      font-size="17" font-weight="700">${p.n}</text>`).join('');
  return `<svg viewBox="-26 -26 ${W + 52} ${H + 52}" class="${cls || 'b43-gs'}">
    <path d="${g}" fill="none" stroke="#7fcdec" stroke-width="1"/>
    <path d="${s}" fill="none" stroke="#111" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${tx}</svg>`;
};

/* hình tròn tâm O với các bán kính được vẽ sẵn */
ART.b43Circle = list => {
  const Rr = 96, cx = 128, cy = 128;
  let seg = '', dot = '', tx = '';
  list.forEach(p => {
    const rad = p.ang * Math.PI / 180;
    const x = cx + Rr * Math.cos(rad), y = cy + Rr * Math.sin(rad);
    const lx = cx + (Rr + 20) * Math.cos(rad), ly = cy + (Rr + 20) * Math.sin(rad);
    seg += `M${cx} ${cy}L${x.toFixed(1)} ${y.toFixed(1)}`;
    dot += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#111"/>`;
    tx += `<text x="${lx.toFixed(1)}" y="${(ly + 6).toFixed(1)}" text-anchor="middle"
      font-size="17" font-weight="700">${p.n}</text>`;
  });
  return `<svg viewBox="0 0 256 256" class="b43-cir">
    <circle cx="${cx}" cy="${cy}" r="${Rr}" fill="#f3c3a6" stroke="#111" stroke-width="2.6"/>
    <path d="${seg}" fill="none" stroke="#111" stroke-width="2.2"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#111"/>
    <text x="${cx - 14}" y="${cy - 8}" text-anchor="middle" font-size="17" font-weight="700">O</text>
    ${dot}${tx}</svg>`;
};

/* một lớp khối lập phương xếp thành hình vuông, phía trên có các khối trụ chồng lên nhau */
ART.b43Slab = (a, b, nCyl) => {
  const ux = 30, uy = 15, hz = 28, ox = b * ux + 20, oy = 150;
  const W = (a + b) * ux + 40, H = oy + (a + b) * uy + hz + 20;
  const P = (i, j) => [ox + (i - j) * ux, oy + (i + j) * uy];
  const cells = [];
  for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) cells.push([i, j]);
  cells.sort((p, r) => (p[0] + p[1]) - (r[0] + r[1]));
  let s = '';
  cells.forEach(cell => {
    const i = cell[0], j = cell[1], y = (i + j) % 2 === 0;
    const cT = y ? '#f5b60f' : '#7b3fa0', cL = y ? '#d99a06' : '#5d2f7d', cR = y ? '#c08805' : '#4b2566';
    const t00 = P(i, j), t10 = P(i + 1, j), t11 = P(i + 1, j + 1), t01 = P(i, j + 1);
    s += `<path d="M${t00}L${t10}L${t11}L${t01}Z" fill="${cT}" stroke="#3b1a4d" stroke-width="1"/>`
      + `<path d="M${t01}L${t11}L${t11[0]},${t11[1] + hz}L${t01[0]},${t01[1] + hz}Z"
          fill="${cL}" stroke="#3b1a4d" stroke-width="1"/>`
      + `<path d="M${t11}L${t10}L${t10[0]},${t10[1] + hz}L${t11[0]},${t11[1] + hz}Z"
          fill="${cR}" stroke="#3b1a4d" stroke-width="1"/>`;
  });
  const mid = P(a / 2, b / 2), mx = mid[0], my = mid[1];
  const cyl = (cy, r, h, side, top) =>
    `<ellipse cx="${mx}" cy="${cy}" rx="${r}" ry="${(r * .36).toFixed(1)}" fill="${side}"/>
     <rect x="${mx - r}" y="${(cy - h).toFixed(1)}" width="${2 * r}" height="${h}" fill="${side}"/>
     <ellipse cx="${mx}" cy="${(cy - h).toFixed(1)}" rx="${r}" ry="${(r * .36).toFixed(1)}" fill="${top}"/>`;
  let c = cyl(my + 6, 44, 36, '#2fa8d8', '#63c8ee');
  if (nCyl >= 2) c += cyl(my - 30, 21, 30, '#d81f1f', '#f24d4d');
  if (nCyl >= 3) c += cyl(my - 60, 9, 62, '#e8a800', '#ffd24a');
  return `<svg viewBox="0 0 ${W} ${H}" class="b43-iso">${s}${c}</svg>`;
};

/* khối hộp chữ nhật xếp từ a × b × c khối lập phương nhỏ */
ART.b43Box = (a, b, c) => {
  const ux = 30, uy = 16, hz = 32, ox = b * ux + 20, oy = c * hz + 26;
  const W = (a + b) * ux + 40, H = oy + (a + b) * uy + 22;
  const P = (i, j, k) => [ox + (i - j) * ux, oy + (i + j) * uy - k * hz];
  const cells = [];
  for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) for (let k = 0; k < c; k++) cells.push([i, j, k]);
  cells.sort((p, r) => (p[0] + p[1]) - (r[0] + r[1]) || p[2] - r[2]);
  let s = '';
  cells.forEach(cell => {
    const i = cell[0], j = cell[1], k = cell[2];
    const t00 = P(i, j, k + 1), t10 = P(i + 1, j, k + 1),
      t11 = P(i + 1, j + 1, k + 1), t01 = P(i, j + 1, k + 1);
    s += `<path d="M${t00}L${t10}L${t11}L${t01}Z" fill="#6fd0ef" stroke="#1c6c96" stroke-width="1.2"/>`
      + `<path d="M${t01}L${t11}L${t11[0]},${t11[1] + hz}L${t01[0]},${t01[1] + hz}Z"
          fill="#3ab6e2" stroke="#1c6c96" stroke-width="1.2"/>`
      + `<path d="M${t11}L${t10}L${t10[0]},${t10[1] + hz}L${t11[0]},${t11[1] + hz}Z"
          fill="#2597c6" stroke="#1c6c96" stroke-width="1.2"/>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" class="b43-iso">${s}</svg>`;
};

/* đường gấp khúc 4 điểm hình mái nhà */
ART.b43Path = (n, l1, l2, l3) => `<svg viewBox="-10 0 500 200" class="b43-path">
  <path d="M60 162L170 74H330L440 162" fill="none" stroke="#111" stroke-width="3.4"
    stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="60" cy="162" r="4.6"/><circle cx="170" cy="74" r="4.6"/>
  <circle cx="330" cy="74" r="4.6"/><circle cx="440" cy="162" r="4.6"/>
  <text x="46" y="188" text-anchor="middle" font-size="18" font-weight="700">${n.A}</text>
  <text x="162" y="58" text-anchor="middle" font-size="18" font-weight="700">${n.B}</text>
  <text x="340" y="58" text-anchor="middle" font-size="18" font-weight="700">${n.C}</text>
  <text x="456" y="188" text-anchor="middle" font-size="18" font-weight="700">${n.D}</text>
  <text x="102" y="120" text-anchor="end" font-size="16">${l1} mm</text>
  <text x="250" y="60" text-anchor="middle" font-size="16">${l2} mm</text>
  <text x="398" y="120" text-anchor="start" font-size="16">${l3} mm</text>
</svg>`;

/* cân thăng bằng: đĩa trái đặt hai quả cân, đĩa phải đặt quả cây và một quả cân */
ART.b43Scale = (w1, w2, w3, fruit) => {
  const wt = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-4 -22h8v8h-8z" fill="none" stroke="#7d8b94" stroke-width="2.4"/>
    <path d="M-14 -14h28l5 30h-38z" fill="#c9d3d9" stroke="#7d8b94" stroke-width="2.2"/></g>`;
  return `<svg viewBox="0 0 420 230" class="b43-scale">
    <path d="M150 196h120l14 22H136z" fill="#a9dcf0" stroke="#4f93b3" stroke-width="2.4"/>
    <rect x="190" y="150" width="40" height="48" fill="#a9dcf0" stroke="#4f93b3" stroke-width="2.4"/>
    <path d="M40 150H380" stroke="#7ec6e2" stroke-width="6" stroke-linecap="round"/>
    <circle cx="210" cy="152" r="15" fill="#f0c860" stroke="#a8802a" stroke-width="2.4"/>
    <path d="M210 152V143M210 152l7 4" stroke="#a8802a" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="105" cy="136" rx="66" ry="12" fill="#c9e9f6" stroke="#4f93b3" stroke-width="2.4"/>
    <ellipse cx="315" cy="136" rx="66" ry="12" fill="#c9e9f6" stroke="#4f93b3" stroke-width="2.4"/>
    ${wt(85, 132, 1)}${wt(128, 132, 1)}
    <path d="M300 82q26 0 30 26t-30 30q-34-2-30-30t30-26z" fill="#b5d97c" stroke="#6d9a35" stroke-width="2.4"/>
    <path d="M300 82q-12-14-30-12 8 14 24 14z" fill="#7cb342" stroke="#4f7a22" stroke-width="2"/>
    ${wt(356, 132, .8)}
    <text x="72" y="70" text-anchor="middle" font-size="16">${w1} g</text>
    <text x="140" y="70" text-anchor="middle" font-size="16">${w2} g</text>
    <text x="380" y="70" text-anchor="middle" font-size="16">${w3} g</text>
    <path d="M78 78L84 112M140 78L132 112M374 78L360 118" stroke="#111" stroke-width="1.4"/>
    <text x="300" y="200" text-anchor="middle" font-size="15">quả ${fruit}</text>
  </svg>`;
};

BANKS.b43 = [

/* ===== tr.118 – Bài 1: góc vuông, góc không vuông, trung điểm ===== */
() => {
  const q = Q(1, 'Trong hình bên:');
  let half = 3, hb = 4, he = 1, hd = 2;
  for (let g = 0; g < 60; g++){
    half = R(2, 3); hb = R(3, 4); he = R(1, half - 1); hd = R(2, 3);
    if (hb !== half && half * (half - he) !== hb * hd) break;
  }
  if (hb === half || half * (half - he) === hb * hd){ half = 3; hb = 4; he = 1; hd = 2; }
  const bag = 'ABCDEGHIKLMNPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const n = {A: bag[0], B: bag[1], C: bag[2], D: bag[3], E: bag[4], I: bag[5], K: bag[6]};
  const cx = half + 1, ay = hb + 1, by = ay + hd;
  const cols = 2 * half + 2, rows = hb + hd + 2;
  const segs = [
    [cx - half, ay, cx, ay - hb], [cx, ay - hb, cx + half, ay], [cx - half, ay, cx + half, ay],
    [cx, ay - hb, cx, by], [cx - half, ay, cx - he, by], [cx + half, ay, cx + he, by],
    [cx - he, by, cx + he, by]
  ];
  const pts = [
    {x: cx, y: ay - hb, n: n.B, dy: -12}, {x: cx - half, y: ay, n: n.A, dx: -16, dy: 6},
    {x: cx + half, y: ay, n: n.C, dx: 16, dy: 6}, {x: cx, y: ay, n: n.K, dx: 16, dy: -8},
    {x: cx - he, y: by, n: n.E, dx: -8, dy: 22}, {x: cx, y: by, n: n.I, dx: 0, dy: 22},
    {x: cx + he, y: by, n: n.D, dx: 10, dy: 22}
  ];
  const names = [n.A, n.B, n.C, n.D, n.E, n.I, n.K].sort(() => Math.random() - .5);
  return q.done(ART.b43Grid(cols, rows, segs, pts)
    + `<div class="fill-line"><b>a)</b> Có ${q.num(6, 1)} góc vuông.</div>
       <div class="fill-line"><b>b)</b> Có ${q.num(3, 1)} góc không vuông đỉnh ${n.A}.</div>
       <div class="fill-line"><b>c)</b> Trung điểm của đoạn thẳng ${n.A}${n.C} là điểm ${q.pick(n.K, names)}</div>
       <div class="fill-line">&nbsp;&nbsp;&nbsp;&nbsp;Trung điểm của đoạn thẳng ${n.E}${n.D} là điểm ${q.pick(n.I, names)}</div>`,
    `a) 4 góc vuông đỉnh ${n.K} và 2 góc vuông đỉnh ${n.I}, tất cả có 6 góc vuông.  `
      + `b) Ba góc không vuông đỉnh ${n.A} là góc ${n.B}${n.A}${n.C}, góc ${n.B}${n.A}${n.E}, góc ${n.C}${n.A}${n.E}.  `
      + `c) ${n.K} là trung điểm của ${n.A}${n.C}; ${n.I} là trung điểm của ${n.E}${n.D}.`);
},

/* ===== tr.118 – Bài 2: Vẽ hình (theo mẫu) ===== */
() => {
  const q = Q(2, 'Vẽ hình (theo mẫu).');
  const bw = R(7, 9), ht = R(4, 5), ax = R(2, 3);
  const w1 = R(5, 6), h1 = R(2, 3);
  const s2 = R(4, 5);
  const x2 = 12 + w1, cols = x2 + s2 + 2, rows = 7;
  const segs = [
    [1, 6, 1 + ax, 6 - ht], [1 + ax, 6 - ht, 1 + bw, 6], [1, 6, 1 + bw, 6],
    [11, 6 - h1, 11 + w1, 6 - h1], [11 + w1, 6 - h1, 11 + w1, 6], [11 + w1, 6, 11, 6], [11, 6, 11, 6 - h1],
    [x2 + 1, 6 - s2, x2 + 1 + s2, 6 - s2], [x2 + 1 + s2, 6 - s2, x2 + 1 + s2, 6],
    [x2 + 1 + s2, 6, x2 + 1, 6], [x2 + 1, 6, x2 + 1, 6 - s2]
  ];
  return q.done(ART.b43Grid(cols, rows, segs, [], 20, 'b43-model')
    + `<div class="hint-line">Đếm số ô của mỗi hình mẫu rồi vẽ lại vào vở ô li.</div>
       <div class="fill-line">Hình tam giác có cạnh đáy dài ${q.num(bw, 1)} ô,
         đỉnh còn lại nằm cách cạnh đáy ${q.num(ht, 1)} ô.</div>
       <div class="fill-line">Hình chữ nhật có chiều dài ${q.num(w1, 1)} ô và chiều rộng ${q.num(h1, 1)} ô.</div>
       <div class="fill-line">Hình vuông có cạnh dài ${q.num(s2, 1)} ô.</div>`,
    `Tam giác: đáy ${bw} ô, cao ${ht} ô. Hình chữ nhật: ${w1} ô × ${h1} ô. Hình vuông: cạnh ${s2} ô.`);
},

/* ===== tr.118 – Bài 3a: nêu tên các đường kính, bán kính của hình tròn ===== */
() => {
  const q = Q(3, 'a) Nêu tên các đường kính, bán kính của hình tròn dưới đây.');
  const bag = 'ABCDEGHIKLMNPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const n = {A: bag[0], B: bag[1], C: bag[2], D: bag[3], M: bag[4], N: bag[5]};
  const a1 = -90 + R(-12, 12), a2 = -55 + R(-10, 10);
  const am = 172 + R(-10, 10), an = 58 + R(-10, 10);
  const list = [{n: n.A, ang: a1}, {n: n.B, ang: a1 + 180}, {n: n.C, ang: a2},
    {n: n.D, ang: a2 + 180}, {n: n.M, ang: am}, {n: n.N, ang: an}];
  const dia = [n.A + n.B, n.C + n.D];
  const optD = dia.concat([n.M + n.N, n.A + n.D, n.C + n.B]).sort(() => Math.random() - .5);
  const rad = [n.A, n.B, n.C, n.D, n.M, n.N].map(x => 'O' + x);
  const optR = rad.concat(dia).sort(() => Math.random() - .5);
  return q.done(ART.b43Circle(list)
    + `<div class="fill-line">Các đường kính là: ${q.pick(dia.slice().sort().join(','), optD)}</div>
       <div class="fill-line">Các bán kính là: ${q.pick(rad.slice().sort().join(','), optR)}</div>`,
    `Đường kính là đoạn thẳng đi qua tâm O và có hai đầu nằm trên đường tròn: ${dia.join(', ')}.  `
      + `Bán kính nối tâm O với một điểm trên đường tròn: ${rad.join(', ')}.`);
},

/* ===== tr.118 – Bài 3b: hình được xếp bởi bao nhiêu khối lập phương, khối trụ ===== */
() => {
  const q = Q(3, 'b) Hình dưới đây được xếp bởi bao nhiêu khối lập phương, bao nhiêu khối trụ?');
  const a = R(3, 4), b = R(3, 4), nc = pick([2, 3]);
  return q.done(ART.b43Slab(a, b, nc)
    + `<div class="fill-line">Hình trên được xếp bởi ${q.num(a * b)} khối lập phương
       và ${q.num(nc, 1)} khối trụ.</div>`,
    `Lớp dưới là ${a} hàng, mỗi hàng ${b} khối lập phương: ${a} × ${b} = ${a * b} (khối lập phương). `
      + `Phía trên có ${nc} khối trụ chồng lên nhau.`);
},

/* ===== tr.118 – Bài 4: khối hộp chữ nhật được sơn tất cả các mặt ===== */
() => {
  const q = Q(4, '');
  const a = R(3, 4), b = 2, c = R(2, 3);
  const ba = 8, hai = 4 * ((a - 2) + (b - 2) + (c - 2));
  return q.done(`<p class="wordq">Người ta xếp các khối lập phương nhỏ màu trắng thành khối hộp chữ nhật,
      rồi sơn tất cả các mặt của khối hộp chữ nhật đó (như hình vẽ).</p>`
    + ART.b43Box(a, b, c)
    + `<div class="bullet">Khối hộp chữ nhật được xếp bởi ${q.num(a * b * c)} khối lập phương nhỏ.</div>
       <div class="bullet">Có ${q.num(ba)} khối lập phương nhỏ được sơn 3 mặt.</div>
       <div class="bullet">Có ${q.num(hai)} khối lập phương nhỏ được sơn 2 mặt.</div>`,
    `Khối hộp gồm ${a} × ${b} × ${c} = ${a * b * c} khối lập phương nhỏ. `
      + `8 khối ở 8 đỉnh được sơn 3 mặt; ${hai} khối nằm giữa các cạnh được sơn 2 mặt.`);
},

/* ===== tr.119 – Bài 1: độ dài đường gấp khúc và cân thăng bằng ===== */
() => {
  const q = Q(1, '');
  const bag = 'ABCDEGHIKLMNPQ'.split('').sort(() => Math.random() - .5);
  const n = {A: bag[0], B: bag[1], C: bag[2], D: bag[3]};
  const l = R(14, 48), l2 = R(14, 48);
  const w1 = pick([200, 500]), w2 = pick([200, 500]), w3 = pick([50, 100, 200]);
  const fruit = pick(['bưởi', 'dưa', 'xoài', 'cam']);
  const gam = w1 + w2 - w3;
  return q.done(`<div class="b43-sub">a) Tính độ dài đường gấp khúc ${n.A}${n.B}${n.C}${n.D}.</div>`
    + ART.b43Path(n, l, l2, l)
    + `<div class="fill-line">Độ dài đường gấp khúc ${n.A}${n.B}${n.C}${n.D} là ${q.num(2 * l + l2)} mm.</div>
       <div class="b43-sub">b) Quả ${fruit} cân nặng bao nhiêu gam?</div>`
    + ART.b43Scale(w1, w2, w3, fruit)
    + `<div class="fill-line">Quả ${fruit} cân nặng ${q.num(gam)} g.</div>`,
    `a) ${l} + ${l2} + ${l} = ${2 * l + l2} (mm).  `
      + `b) ${w1} + ${w2} = ${w1 + w2} (g); quả ${fruit} nặng ${w1 + w2} − ${w3} = ${gam} (g).`);
},

/* ===== tr.119 – Bài 2: Chọn số đo thích hợp ===== */
() => {
  const q = Q(2, 'Chọn số đo thích hợp.');
  const POOL = [
    ['Quyển sách Toán 3 tập một dày khoảng', '5 mm', ['5 cm', '5 dm']],
    ['Chiếc bút mực cân nặng khoảng', '20 g', ['2 g', '2 kg']],
    ['Lượng thuốc nước trong một lọ thuốc nhỏ mắt có khoảng', '15 ml', ['15 l', '150 ml']],
    ['Nhiệt độ cơ thể người bình thường khoảng', '37 °C', ['35 °C', '39 °C']],
    ['Chiếc bàn học của em cao khoảng', '6 dm', ['6 cm', '6 m']],
    ['Một quả trứng gà cân nặng khoảng', '60 g', ['60 kg', '6 g']],
    ['Một chai nước khoáng nhỏ chứa khoảng', '500 ml', ['500 l', '5 ml']],
    ['Cửa ra vào lớp học cao khoảng', '2 m', ['2 dm', '2 cm']],
    ['Nhiệt độ của nước đá đang tan là', '0 °C', ['10 °C', '100 °C']],
    ['Một bao gạo cân nặng khoảng', '50 kg', ['50 g', '5 kg']]
  ];
  const chosen = POOL.slice().sort(() => Math.random() - .5).slice(0, 4);
  const SUB = ['a)', 'b)', 'c)', 'd)'], L = ['A', 'B', 'C'];
  const html = chosen.map((it, k) => {
    const vals = [it[1]].concat(it[2]).sort(() => Math.random() - .5);
    const ok = L[vals.indexOf(it[1])];
    return `<div class="b43-sub">${SUB[k]} ${it[0]}:</div>
      <div class="b43-opt">${vals.map((v, i) => `<span><i>${L[i]}.</i>${v}</span>`).join('')}</div>
      <div class="fill-line">Chọn: ${q.pick(ok, L)}</div>`;
  }).join('');
  return q.done(html, chosen.map((it, k) => `${SUB[k]} ${it[1]}`).join(';  '));
},

/* ===== tr.119 – Bài 3: Tính (với số đo mm, g, ml) ===== */
() => {
  const q = Q(3, 'Tính.');
  const m1 = 10 * R(20, 60), m2 = 10 * R(5, 20);
  const m3 = R(300, 900), m4 = R(15, 95);
  const dm = R(2, 6), tm = 10 * R(8, 30), vm = dm * tm;
  const g1 = R(200, 600), g2 = R(150, 390);
  const g3 = 10 * R(10, 40), kg = R(3, 6);
  const dg = R(3, 9), tg = R(50, 200), vg = dg * tg;
  const v1 = 100 * R(2, 6), v2 = R(101, 399);
  const v3 = 100 * R(1, 9);
  const v4 = 10 * R(10, 40), kv = R(2, 5);
  return q.done(`<div class="b43-cols">
      <div><div class="b43-ex"><span class="b43-let">a)</span>${m1} mm + ${m2} mm = ${q.num(m1 + m2)} mm</div>
        <div class="b43-ex">${m3} mm − ${m4} mm = ${q.num(m3 - m4)} mm</div>
        <div class="b43-ex">${vm} mm : ${dm} = ${q.num(tm)} mm</div></div>
      <div><div class="b43-ex"><span class="b43-let">b)</span>${g1} g + ${g2} g = ${q.num(g1 + g2)} g</div>
        <div class="b43-ex">${g3} g × ${kg} = ${q.num(g3 * kg)} g</div>
        <div class="b43-ex">${vg} g : ${dg} = ${q.num(tg)} g</div></div>
      <div><div class="b43-ex"><span class="b43-let">c)</span>${v1} ml + ${v2} ml = ${q.num(v1 + v2)} ml</div>
        <div class="b43-ex">1 000 ml − ${v3} ml = ${q.num(1000 - v3)} ml</div>
        <div class="b43-ex">${v4} ml × ${kv} = ${q.num(v4 * kv)} ml</div></div>
    </div>`,
    'Tính như với số tự nhiên rồi ghi thêm đơn vị đo vào kết quả.');
},

/* ===== tr.119 – Bài 4: gói mì tôm và hộp sữa ===== */
() => {
  const q = Q(4, '');
  const mi = pick([65, 75, 80, 85, 90]), sua = R(380, 480), sg = R(2, 5);
  return q.done(`<p class="wordq">Một gói mì tôm cân nặng ${mi} g, một hộp sữa cân nặng ${sua} g.
      Hỏi ${sg} gói mì tôm và 1 hộp sữa cân nặng bao nhiêu gam?</p>
    <div class="fill-line">${sg} gói mì tôm và 1 hộp sữa cân nặng ${q.num(mi * sg + sua)} g.</div>`,
    `${mi} × ${sg} + ${sua} = ${mi * sg} + ${sua} = ${mi * sg + sua} (g)`);
},
];
