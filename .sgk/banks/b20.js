/* ==================== BÀI 20: THỰC HÀNH VẼ GÓC VUÔNG, VẼ ĐƯỜNG TRÒN, HÌNH VUÔNG,
   HÌNH CHỮ NHẬT VÀ VẼ TRANG TRÍ (SGK tr.61, 62)
   hoạt động tr.61 : bài 1, bài 2, bài 3
   hoạt động tr.62 : bài 1, bài 2
=================================================================================== */

ART.b20Lat = (cols, rows, C) => {
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * C} 0V${rows * C}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * C}H${cols * C}`;
  return `<path d="${g}" fill="none" stroke="#9fd0ef" stroke-width="1"/>`;
};

/* góc vuông đỉnh A: cạnh AB nằm ngang a ô, cạnh AC thẳng đứng b ô */
ART.b20Ang = (a, b, A, B, C) => {
  const S = 28, cols = a + 2, rows = b + 2, W = cols * S, H = rows * S;
  const ax = S, ay = H - S, bx = ax + a * S, cy = ay - b * S;
  return `<svg viewBox="-18 -14 ${W + 36} ${H + 34}" class="b20-grid">
    ${ART.b20Lat(cols, rows, S)}
    <path d="M${bx} ${ay}L${ax} ${ay}L${ax} ${cy}" fill="none" stroke="#2b2b2b"
      stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M${ax} ${ay - 14}h14v14" fill="none" stroke="#e03b3b" stroke-width="2.2"/>
    <circle cx="${ax}" cy="${ay}" r="3.6"/><circle cx="${bx}" cy="${ay}" r="3.6"/><circle cx="${ax}" cy="${cy}" r="3.6"/>
    <text x="${ax - 12}" y="${ay + 21}" text-anchor="middle" font-size="18" font-weight="700">${A}</text>
    <text x="${bx + 2}" y="${ay + 21}" text-anchor="middle" font-size="18" font-weight="700">${B}</text>
    <text x="${ax - 14}" y="${cy + 6}" text-anchor="middle" font-size="18" font-weight="700">${C}</text>
  </svg>`;
};

/* đường tròn tâm I bán kính rr ô */
ART.b20Circ = (rr, I) => {
  const S = 28, cols = 2 * rr + 2, rows = 2 * rr + 2, W = cols * S, H = rows * S;
  const cx = W / 2, cy = H / 2;
  return `<svg viewBox="-18 -14 ${W + 36} ${H + 34}" class="b20-grid">
    ${ART.b20Lat(cols, rows, S)}
    <circle cx="${cx}" cy="${cy}" r="${rr * S}" fill="none" stroke="#2b2b2b" stroke-width="3.2"/>
    <circle cx="${cx}" cy="${cy}" r="3.6"/>
    <text x="${cx + 12}" y="${cy - 6}" text-anchor="middle" font-size="18" font-weight="700">${I}</text>
  </svg>`;
};

/* các bước gấp ê ke giấy */
ART.b20Fold = k => {
  const box = (inner, mark) => `<svg viewBox="0 0 70 96" class="b20-fold">
    <rect x="8" y="6" width="54" height="84" rx="3" fill="#f4efb4" stroke="#a09437" stroke-width="2.4"/>
    ${inner || ''}${mark || ''}</svg>`;
  if (k === 1) return box('');
  if (k === 2) return box('<path d="M8 48h54" fill="none" stroke="#a09437" stroke-width="2" stroke-dasharray="5 4"/>');
  if (k === 3) return box('<path d="M35 6v84" fill="none" stroke="#a09437" stroke-width="2" stroke-dasharray="5 4"/>');
  return box('', '<path d="M8 90h18M8 90V72" fill="none" stroke="#e03b3b" stroke-width="3"/>');
};

/* hình chữ nhật bị cắt bớt 0, 1 hoặc 2 góc trên */
ART.b20CutFig = (cutTL, cutTR) => {
  const W = 280, H = 168, k = 78, p = [];
  p.push(cutTL ? [k, 0] : [0, 0]);
  if (cutTR){ p.push([W - k, 0]); p.push([W, k]); } else p.push([W, 0]);
  p.push([W, H]);
  p.push([0, H]);
  if (cutTL) p.push([0, k]);
  const d = p.map((q, i) => (i ? 'L' : 'M') + q[0] + ' ' + q[1]).join('') + 'Z';
  return `<svg viewBox="-6 -6 ${W + 12} ${H + 12}" class="b20-cut">
    <path d="${d}" fill="#f7efb0" stroke="#2b2b2b" stroke-width="3.4" stroke-linejoin="round"/></svg>`;
};

/* lưới ô vuông có một hình chữ nhật và một hình vuông */
ART.b20RectSq = (w, h, s) => {
  const S = 26, cols = w + s + 4, rows = Math.max(h, s) + 2, W = cols * S, H = rows * S;
  const y1 = (rows - h - 1) * S, y2 = (rows - s - 1) * S;
  return `<svg viewBox="-8 -8 ${W + 16} ${H + 16}" class="b20-wide">
    ${ART.b20Lat(cols, rows, S)}
    <rect x="${S}" y="${y1}" width="${w * S}" height="${h * S}" fill="none" stroke="#2b2b2b" stroke-width="3.2"/>
    <rect x="${(w + 3) * S}" y="${y2}" width="${s * S}" height="${s * S}" fill="none" stroke="#2b2b2b" stroke-width="3.2"/>
  </svg>`;
};

/* hình trang trí ghép từ các hình vuông / hình chữ nhật */
ART.b20Fig = parts => {
  const S = 26;
  const cols = parts.reduce((m, r) => Math.max(m, r[0] + r[2]), 0) + 2;
  const rows = parts.reduce((m, r) => Math.max(m, r[1] + r[3]), 0) + 2;
  const W = cols * S, H = rows * S;
  const rc = parts.map(r =>
    `<rect x="${(r[0] + 1) * S}" y="${(r[1] + 1) * S}" width="${r[2] * S}" height="${r[3] * S}"
      fill="none" stroke="#2b2b2b" stroke-width="3"/>`).join('');
  return `<svg viewBox="-8 -8 ${W + 16} ${H + 16}" class="b20-wide">
    ${ART.b20Lat(cols, rows, S)}${rc}</svg>`;
};

/* n đường tròn bán kính rr ô (bước vẽ trang trí) */
ART.b20Rings = (n, rr) => {
  const S = 22, cols = 4 * rr + 2, rows = 4 * rr + 2, W = cols * S, H = rows * S;
  const cx = W / 2, cy = H / 2, d = rr * S;
  const cen = [[cx - d, cy - d], [cx + d, cy - d], [cx, cy + d]].slice(0, n);
  const cc = cen.map(c =>
    `<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="${rr * S}" fill="none" stroke="#2b2b2b" stroke-width="2.6"/>
     <circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="2.6"/>`).join('');
  return `<svg viewBox="-6 -6 ${W + 12} ${H + 12}" class="b20-grid">
    ${ART.b20Lat(cols, rows, S)}${cc}</svg>`;
};

BANKS.b20 = [

/* ===== tr.61 – Bài 1: a) vẽ góc vuông đỉnh A  b) vẽ đường tròn tâm I ===== */
() => {
  const q = Q(1, 'a) Vẽ góc vuông đỉnh A; cạnh AB, AC. &nbsp; b) Vẽ đường tròn tâm I.');
  const a = R(3, 5), b = R(2, 4), rr = R(2, 3);
  return q.done(`<div class="b20-row">
      <div class="b20-item">${ART.b20Ang(a, b, 'A', 'B', 'C')}<span class="b20-cap">Góc vuông đỉnh A</span></div>
      <div class="b20-item">${ART.b20Circ(rr, 'I')}<span class="b20-cap">Đường tròn tâm I</span></div></div>
    <div class="fill-line"><b>a)</b> Trên hình vẽ, cạnh AB dài ${q.num(a, 1)} ô và cạnh AC dài ${q.num(b, 1)} ô.</div>
    <div class="fill-line"><b>b)</b> Đường tròn tâm I có bán kính ${q.num(rr, 1)} ô, đường kính ${q.num(2 * rr, 1)} ô.</div>
    <div class="hint-line">Dùng ê ke để vẽ góc vuông, dùng com-pa để vẽ đường tròn vào vở.</div>`,
    `Đường kính dài gấp 2 lần bán kính: ${rr} × 2 = ${2 * rr} (ô).`);
},

/* ===== tr.61 – Bài 2: tự làm ê ke giấy rồi đếm góc vuông ===== */
() => {
  const q = Q(2, 'Tự làm ê ke giấy: Gấp tờ giấy làm đôi, rồi lại gấp làm đôi tiếp (như hình vẽ).');
  const nc = R(0, 2);
  const cutTL = nc >= 1, cutTR = nc === 2;
  const goc = 4 - nc;
  return q.done(`<div class="b20-step">
      <span>${ART.b20Fold(1)}</span><span class="b20-arr">&#8594;</span>
      <span>${ART.b20Fold(2)}</span><span class="b20-arr">&#8594;</span>
      <span>${ART.b20Fold(3)}</span><span class="b20-arr">&#8594;</span>
      <span>${ART.b20Fold(4)}</span></div>
    <div class="fill-line"><b>a)</b> Dùng ê ke trong bộ đồ dùng học tập của em, hãy kiểm tra lại góc vuông ở ê ke giấy
      vừa làm. Ê ke giấy vừa gấp có ${q.num(1, 1)} góc vuông.</div>
    <div class="fill-line"><b>b)</b> Dùng ê ke giấy vừa làm, em hãy tìm xem trong hình bên có mấy góc vuông.</div>
    ${ART.b20CutFig(cutTL, cutTR)}
    <div class="fill-line">Trong hình bên có ${q.num(goc, 1)} góc vuông.</div>`,
    `Gấp đôi hai lần được một góc vuông. Hình bên có ${goc} góc vuông (${nc ? nc + ' góc đã bị cắt vát' : 'cả 4 góc đều vuông'}).`);
},

/* ===== tr.61 – Bài 3: vẽ hình chữ nhật và hình vuông (theo mẫu) ===== */
() => {
  const q = Q(3, 'Vẽ hình chữ nhật và hình vuông (theo mẫu).');
  const w = R(4, 6), h = R(2, 3), s = R(3, 4);
  return q.done(ART.b20RectSq(w, h, s)
    + `<div class="fill-line">Hình chữ nhật mẫu có chiều dài ${q.num(w, 1)} ô và chiều rộng ${q.num(h, 1)} ô.</div>
       <div class="fill-line">Hình vuông mẫu có cạnh dài ${q.num(s, 1)} ô.</div>
       <div class="fill-line">Hình chữ nhật mẫu có chiều dài hơn chiều rộng ${q.num(w - h, 1)} ô.</div>
       <div class="hint-line">Dùng thước và ê ke vẽ lại hai hình đó trên lưới ô vuông trong vở.</div>`,
    `${w} − ${h} = ${w - h} (ô)`);
},

/* ===== tr.62 – Bài 1: vẽ một hình em thích từ hình vuông hoặc hình chữ nhật ===== */
() => {
  const q = Q(1, 'Vẽ một hình mà em thích từ những hình vuông hoặc hình chữ nhật (theo mẫu).');
  const TPL = [
    [[0, 2, 4, 2], [1, 0, 2, 2]],
    [[0, 3, 5, 2], [1, 1, 2, 2], [3, 1, 2, 2], [2, 0, 1, 1]],
    [[2, 0, 1, 1], [1, 1, 3, 1], [0, 2, 5, 1], [2, 3, 1, 2]],
    [[1, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 1], [2, 1, 1, 1], [1, 2, 1, 1]],
    [[0, 0, 3, 1], [0, 1, 1, 3], [1, 3, 3, 1], [2, 1, 2, 2]]
  ];
  const t = pick(TPL);
  const tong = t.length, vuong = t.filter(r => r[2] === r[3]).length;
  return q.done(ART.b20Fig(t)
    + `<div class="fill-line">Hình mẫu bên được ghép từ tất cả ${q.num(tong, 1)} hình.</div>
       <div class="fill-line">Trong đó có ${q.num(vuong, 1)} hình vuông
         và ${q.num(tong - vuong, 1)} hình chữ nhật có chiều dài khác chiều rộng.</div>
       <div class="hint-line">Em hãy vẽ một hình mà em thích từ những hình vuông hoặc hình chữ nhật vào vở.</div>`,
    `${tong} hình, trong đó ${vuong} hình vuông và ${tong - vuong} hình chữ nhật.`);
},

/* ===== tr.62 – Bài 2: quan sát rồi vẽ hình theo mẫu, tô màu trang trí ===== */
() => {
  const q = Q(2, 'a) Quan sát rồi vẽ hình theo mẫu.');
  const rr = R(2, 3);
  return q.done(`<div class="b20-row">
      <div class="b20-item">${ART.b20Rings(1, rr)}<span class="b20-cap">Bước 1</span></div>
      <div class="b20-item">${ART.b20Rings(2, rr)}<span class="b20-cap">Bước 2</span></div>
      <div class="b20-item">${ART.b20Rings(3, rr)}<span class="b20-cap">Bước 3</span></div></div>
    <div class="fill-line">Mỗi bước vẽ thêm ${q.num(1, 1)} đường tròn, hình ở Bước 3 có
      ${q.num(3, 1)} đường tròn.</div>
    <div class="fill-line">Các đường tròn đó đều có bán kính ${q.num(rr, 1)} ô
      và đường kính ${q.num(2 * rr, 1)} ô.</div>
    <div class="fill-line"><b>b)</b> Tô màu trang trí hình em vừa vẽ được.</div>
    <div class="hint-line">Dùng com-pa mở rộng ${rr} ô rồi vẽ lần lượt ba đường tròn vào vở, sau đó tô màu.</div>`,
    `3 đường tròn bằng nhau, bán kính ${rr} ô, đường kính ${rr} × 2 = ${2 * rr} (ô).`);
},
];
