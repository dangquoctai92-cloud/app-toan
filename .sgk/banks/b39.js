/* ============ BÀI 39: SO SÁNH SỐ LỚN GẤP MẤY LẦN SỐ BÉ (SGK tr.108, 109) ============
   hoạt động tr.108 : bài 1 (Số ? – bảng số lớn, số bé), bài 2 (Số ? – bút chì, bút sáp, cái ghim)
   luyện tập tr.109 : bài 1 (Số ? – bảng hơn bao nhiêu đơn vị / gấp mấy lần),
                      bài 2 (32 quả bóng xếp thành hàng, cột), bài 3 (thuyền lớn – thuyền nhỏ)
============================================================================================ */

/* thước đo phía trên vật, dài cm × u (px) */
ART.b39Ruler = (cm, u, art) => {
  const W = cm * u, T = W + 12;
  return `<svg viewBox="0 0 ${T} 72" style="width:${T}px;max-width:100%" class="b39-obj">
    <text x="${T / 2}" y="12" text-anchor="middle" font-size="12" font-weight="700" fill="#222">${cm} cm</text>
    <path d="M6 18v34M${W + 6} 18v34" stroke="#8a8a8a" stroke-width="1.4" stroke-dasharray="4 3"/>
    <path d="M6 24h${W}" stroke="#444" stroke-width="1.6"/>
    <path d="M6 24l9-4.5v9zM${W + 6} 24l-9-4.5v9z" fill="#444"/>
    ${art(W)}</svg>`;
};

ART.b39Pencil = W => `<g>
  <rect x="6" y="34" width="${W * 0.12}" height="16" rx="4" fill="#f3c9d6" stroke="#b8788c" stroke-width="1.4"/>
  <rect x="${6 + W * 0.12}" y="34" width="${W * 0.08}" height="16" fill="#cfe4f7" stroke="#7fa8c9" stroke-width="1.4"/>
  <rect x="${6 + W * 0.2}" y="34" width="${W * 0.68}" height="16" fill="#f0a12e" stroke="#c07a16" stroke-width="1.4"/>
  <path d="M${6 + W * 0.88} 34L${6 + W} 42l-${W * 0.12} 8z" fill="#f7dca8" stroke="#c07a16" stroke-width="1.4"/>
  <path d="M${6 + W * 0.97} 40l${W * 0.03} 2-${W * 0.03} 2z" fill="#3b2a1c"/></g>`;

ART.b39Crayon = W => `<g>
  <rect x="6" y="34" width="${W * 0.1}" height="16" fill="#2e8b57" stroke="#1c6b3d" stroke-width="1.4"/>
  <rect x="${6 + W * 0.1}" y="34" width="${W * 0.68}" height="16" fill="#a8e6c1" stroke="#1c6b3d" stroke-width="1.4"/>
  <rect x="${6 + W * 0.78}" y="34" width="${W * 0.07}" height="16" fill="#2e8b57" stroke="#1c6b3d" stroke-width="1.4"/>
  <path d="M${6 + W * 0.85} 34L${6 + W} 42l-${W * 0.15} 8z" fill="#3cb371" stroke="#1c6b3d" stroke-width="1.4"/></g>`;

ART.b39Clip = W => `<g fill="none" stroke="#7f8fa6" stroke-width="2.6" stroke-linejoin="round">
  <path d="M8 48L${6 + W * 0.9} 36 ${6 + W} 44 10 44"/>
  <path d="M12 44L${6 + W * 0.82} 39"/></g>`;

ART.b39Boat = c => `<svg viewBox="0 0 124 50" class="b39-boat">
  <path d="M4 28h116l-16 18H20z" fill="${c}" stroke="#7a5227" stroke-width="2.2"/>
  <path d="M24 28v-9h56l10 9z" fill="#e6eef5" stroke="#7a8fa0" stroke-width="2"/>
  <path d="M32 10h36v7H32z" fill="#f0a12e" stroke="#c07a16" stroke-width="1.8"/></svg>`;

ART.b39Balls = (rows, cols) => {
  const S = 30, W = cols * S + 6, H = rows * S + 6;
  let g = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
    const cx = 6 + c * S + (S - 6) / 2, cy = 6 + r * S + (S - 6) / 2, rr = (S - 6) / 2;
    g += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="#fff" stroke="#2b2b2b" stroke-width="1.6"/>
      <path d="M${cx} ${cy - 5.5}l5.5 4-2 6.5h-7l-2-6.5z" fill="#2b2b2b"/>
      <path d="M${cx - 5.5} ${cy - 4}l-4.5-3M${cx + 5.5} ${cy - 4}l4.5-3M${cx - 3.5} ${cy + 6}l-2 5M${cx + 3.5} ${cy + 6}l2 5"
        stroke="#2b2b2b" stroke-width="1.2"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="b39-balls">${g}</svg>`;
};

BANKS.b39 = [

/* ===== tr.108 – Hoạt động Bài 1: Số ? (bảng số lớn – số bé) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const cols = [];
  for (let g = 0; g < 60 && cols.length < 3; g++){
    const be = R(2, 9), k = R(2, 9), lon = be * k;
    if (!cols.some(c => c.lon === lon && c.be === be)) cols.push({be, k, lon});
  }
  while (cols.length < 3) cols.push({be:2, k:cols.length + 2, lon:2 * (cols.length + 2)});
  const html = `<div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Số lớn</th>${cols.map(c => `<td>${c.lon}</td>`).join('')}</tr>
      <tr><th>Số bé</th>${cols.map(c => `<td>${c.be}</td>`).join('')}</tr>
      <tr><th>Số lớn gấp mấy lần số bé?</th>
        <td>${cols[0].k}</td>${cols.slice(1).map(c => `<td>${q.num(c.k, 1)}</td>`).join('')}</tr>
    </table></div>
    <div class="hint-line">Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé.</div>`;
  return q.done(html, cols.map(c => `${c.lon} : ${c.be} = ${c.k}`).join(';  '));
},

/* ===== tr.108 – Hoạt động Bài 2: Số ? (bút chì, bút sáp, cái ghim) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const p = pick([[10, 5, 2], [12, 6, 2], [12, 6, 3], [12, 4, 2], [12, 4, 3], [14, 7, 2],
    [15, 5, 3], [16, 8, 2], [16, 8, 4], [18, 6, 2], [18, 6, 3], [18, 9, 3],
    [20, 10, 2], [20, 10, 5], [20, 5, 2], [21, 7, 3], [24, 8, 2], [24, 12, 3], [24, 6, 3]]);
  const chi = p[0], sap = p[1], ghim = p[2];
  const u = Math.max(9, Math.min(18, Math.floor(290 / chi)));
  return q.done(`<div class="b39-objs">
      ${ART.b39Ruler(chi, u, ART.b39Pencil)}
      ${ART.b39Ruler(sap, u, ART.b39Crayon)}
      ${ART.b39Ruler(ghim, u, ART.b39Clip)}
    </div>
    <div class="fill-line">a) Bút chì dài gấp ${q.num(chi / sap)} lần bút sáp.</div>
    <div class="fill-line">b) Bút chì dài gấp ${q.num(chi / ghim)} lần cái ghim.</div>`,
    `${chi} : ${sap} = ${chi / sap} (lần);  ${chi} : ${ghim} = ${chi / ghim} (lần)`);
},

/* ===== tr.109 – Luyện tập Bài 1: Số ? (hơn bao nhiêu đơn vị · gấp mấy lần) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const cols = [];
  for (let g = 0; g < 80 && cols.length < 5; g++){
    const be = R(2, 9), k = R(2, 6), lon = be * k;
    if (!cols.some(c => c.lon === lon && c.be === be)) cols.push({be, k, lon});
  }
  while (cols.length < 5) cols.push({be:3, k:cols.length + 1, lon:3 * (cols.length + 1)});
  const html = `<div class="tbl-wrap"><table class="tbl green">
      <tr><th>Số lớn</th>${cols.map(c => `<td>${c.lon}</td>`).join('')}</tr>
      <tr><th>Số bé</th>${cols.map(c => `<td>${c.be}</td>`).join('')}</tr>
      <tr><th>Số lớn hơn số bé bao nhiêu đơn vị?</th>
        <td>${cols[0].lon - cols[0].be}</td>
        ${cols.slice(1).map(c => `<td>${q.num(c.lon - c.be, 2)}</td>`).join('')}</tr>
      <tr><th>Số lớn gấp mấy lần số bé?</th>
        <td>${cols[0].k}</td>${cols.slice(1).map(c => `<td>${q.num(c.k, 1)}</td>`).join('')}</tr>
    </table></div>
    <div class="hint-line">Hơn bao nhiêu đơn vị thì làm tính trừ, gấp mấy lần thì làm tính chia.</div>`;
  return q.done(html,
    cols.map(c => `${c.lon} − ${c.be} = ${c.lon - c.be};  ${c.lon} : ${c.be} = ${c.k}`).join('  ·  '));
},

/* ===== tr.109 – Luyện tập Bài 2: Quả bóng xếp thành hàng, cột ===== */
() => {
  const q = Q(2, '');
  const hang = pick([2, 3, 4]);
  const k = hang === 4 ? 2 : hang === 3 ? R(2, 4) : R(2, 5);
  const cot = hang * k, tong = hang * cot;
  return q.done(`<p class="wordq">Có ${tong} quả bóng xếp thành các hàng, các cột như sau:</p>
    ${ART.b39Balls(hang, cot)}
    <div class="sub-lbl">a) <span class="tag">Số</span> ?</div>
    <div class="bullet">Mỗi hàng có ${q.num(cot, 2)} quả bóng.</div>
    <div class="bullet">Mỗi cột có ${q.num(hang, 1)} quả bóng.</div>
    <div class="sub-lbl">b) Số quả bóng trong một hàng gấp mấy lần số quả bóng trong một cột?</div>
    <div class="fill-line">Số quả bóng trong một hàng gấp ${q.num(k, 1)} lần số quả bóng trong một cột.</div>`,
    `Mỗi hàng ${cot} quả, mỗi cột ${hang} quả; ${cot} : ${hang} = ${k} (lần)`);
},

/* ===== tr.109 – Luyện tập Bài 3: Thuyền lớn – thuyền nhỏ ===== */
() => {
  const q = Q(3, '');
  const nho = R(4, 9), k = R(2, 6), lon = nho * k;
  return q.done(`<p class="wordq">Thuyền lớn chở ${lon} khách du lịch, thuyền nhỏ chở ${nho} khách du lịch. Hỏi:</p>
    <div class="b39-two">
      <figure><span style="display:block;width:150px">${ART.b39Boat('#2f7d9e')}</span>
        <figcaption>Thuyền lớn: ${lon} khách</figcaption></figure>
      <figure><span style="display:block;width:96px">${ART.b39Boat('#c0623a')}</span>
        <figcaption>Thuyền nhỏ: ${nho} khách</figcaption></figure>
    </div>
    <div class="fill-line">a) Thuyền lớn chở nhiều hơn thuyền nhỏ ${q.num(lon - nho)} khách du lịch.</div>
    <div class="fill-line">b) Số khách ở thuyền lớn gấp ${q.num(k, 1)} lần số khách ở thuyền nhỏ.</div>`,
    `${lon} − ${nho} = ${lon - nho} (khách);  ${lon} : ${nho} = ${k} (lần)`);
},
];
