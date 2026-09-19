/* ==================== BÀI 22: LUYỆN TẬP CHUNG (SGK tr.65, 66) ====================
   luyện tập tr.65 : bài 1, bài 2, bài 3
   luyện tập tr.66 : bài 1, bài 2, bài 3
================================================================================ */

/* hình chữ nhật (hoặc hình vuông) trên lưới ô vuông kèm 4 điểm đánh dấu trên các cạnh;
   dx khác 0 nghĩa là điểm trên cạnh trên/dưới bị lệch, không phải trung điểm */
ART.b22Mid = (w, h, dx) => {
  const C = 22, cols = w + 2, rows = h + 2, W = cols * C, H = rows * C;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * C} 0V${H}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * C}H${W}`;
  const x0 = C, y0 = C, x1 = x0 + w * C, y1 = y0 + h * C;
  const mx = x0 + (w / 2 + dx) * C, my = y0 + h / 2 * C;
  return `<svg viewBox="-4 -4 ${W + 8} ${H + 8}" class="b22-gs">
    <path d="${g}" fill="none" stroke="#7fcdec" stroke-width="1"/>
    <rect x="${x0}" y="${y0}" width="${w * C}" height="${h * C}" fill="none" stroke="#2b2b2b" stroke-width="2.8"/>
    <circle cx="${mx}" cy="${y0}" r="4"/><circle cx="${mx}" cy="${y1}" r="4"/>
    <circle cx="${x0}" cy="${my}" r="4"/><circle cx="${x1}" cy="${my}" r="4"/>
  </svg>`;
};

/* tờ giấy hình tròn dán vào tờ giấy hình vuông */
ART.b22CircSq = r => {
  const C = 34, S = 2 * r * C;
  return `<svg viewBox="-10 -10 ${S + 20} ${S + 20}" class="b22-sq">
    <rect x="0" y="0" width="${S}" height="${S}" fill="#f2c9bb" stroke="#b3705c" stroke-width="3"/>
    <circle cx="${S / 2}" cy="${S / 2}" r="${r * C}" fill="#8ec97f" stroke="#3f7c34" stroke-width="3"/>
    <circle cx="${S / 2}" cy="${S / 2}" r="3" fill="#2b2b2b"/>
    <path d="M${S / 2} ${S / 2}H${S}" fill="none" stroke="#2b2b2b" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="${S * .75}" y="${S / 2 - 8}" text-anchor="middle" font-size="15" font-weight="700">${r} cm</text>
  </svg>`;
};

/* cái ao hình chữ nhật với các lá súng đường kính 1 dm */
ART.b22Pond = (L, W) => {
  const C = 40, wid = L * C, hei = W * C;
  const pad = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="${C / 2 - 1}" fill="#4fae4a" stroke="#2f7a2c" stroke-width="2"/>
    <path d="M${cx} ${cy}l-6 ${C / 2 - 2}" fill="none" stroke="#2f7a2c" stroke-width="2"/>`;
  let p = '';
  for (let i = 0; i < L; i++) p += pad(i * C + C / 2, C / 2);
  for (let j = 1; j < W; j++) p += pad(C / 2, j * C + C / 2);
  return `<svg viewBox="-10 -10 ${wid + 20} ${hei + 20}" class="b22-pond">
    <rect x="-7" y="-7" width="${wid + 14}" height="${hei + 14}" fill="#8ec24a" stroke="#5f8f2e" stroke-width="2"/>
    <rect x="0" y="0" width="${wid}" height="${hei}" fill="#5cc4e8" stroke="#1c6c96" stroke-width="2.4"/>
    ${p}
    <g fill="#2f7a2c"><circle cx="${wid - C / 2}" cy="${hei - C / 2}" r="9"/>
      <circle cx="${wid - C / 2 - 6}" cy="${hei - C / 2 - 8}" r="3.4"/>
      <circle cx="${wid - C / 2 + 6}" cy="${hei - C / 2 - 8}" r="3.4"/></g>
  </svg>`;
};

/* hình ngũ giác ABCDE có thêm hai đường chéo AC và AD */
ART.b22Five = n => `<svg viewBox="-8 -16 316 278" class="b22-five">
  <path d="M150 20L30 120L60 220H215L265 120z" fill="#fbe6f2" stroke="#c2185b" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M150 20L60 220M150 20L215 220" fill="none" stroke="#c2185b" stroke-width="2.6"/>
  <circle cx="150" cy="20" r="4"/><circle cx="30" cy="120" r="4"/><circle cx="60" cy="220" r="4"/>
  <circle cx="215" cy="220" r="4"/><circle cx="265" cy="120" r="4"/>
  <text x="150" y="12" text-anchor="middle" font-size="19" font-weight="700">${n.A}</text>
  <text x="16" y="115" text-anchor="middle" font-size="19" font-weight="700">${n.B}</text>
  <text x="52" y="242" text-anchor="middle" font-size="19" font-weight="700">${n.C}</text>
  <text x="224" y="242" text-anchor="middle" font-size="19" font-weight="700">${n.D}</text>
  <text x="280" y="115" text-anchor="middle" font-size="19" font-weight="700">${n.E}</text>
</svg>`;

/* hình tròn tâm O với bốn bán kính */
ART.b22Radii = list => {
  const cx = 120, cy = 120, r = 96, rd = d => d * Math.PI / 180;
  const COL = ['#d0342c', '#2b2b2b', '#1f9ad6', '#8e44ad'];
  const s = list.map((it, i) => {
    const x = cx + r * Math.cos(rd(it.a)), y = cy - r * Math.sin(rd(it.a));
    const lx = cx + (r + 17) * Math.cos(rd(it.a)), ly = cy - (r + 17) * Math.sin(rd(it.a));
    return `<path d="M${cx} ${cy}L${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${COL[i % 4]}" stroke-width="3"/>
      <text x="${lx.toFixed(1)}" y="${(ly + 6).toFixed(1)}" text-anchor="middle" font-size="18" font-weight="700">${it.n}</text>`;
  }).join('');
  return `<svg viewBox="-12 -16 268 272" class="b22-circ">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#cfe8c4" stroke="#3f7c34" stroke-width="2.6"/>
    ${s}<circle cx="${cx}" cy="${cy}" r="3.4"/>
    <text x="${cx + 15}" y="${cy - 8}" text-anchor="middle" font-size="18" font-weight="700">O</text>
  </svg>`;
};

/* khối lập phương lớn ghép từ 8 khối lập phương nhỏ */
ART.b22Cube8 = col => `<svg viewBox="10 10 220 220" class="b22-cube">
  <path d="M40 90h120v120H40z" fill="${col}" stroke="#7a2f24" stroke-width="2.4"/>
  <path d="M40 90l50-50h120l-50 50z" fill="${col}" opacity=".78" stroke="#7a2f24" stroke-width="2.4"/>
  <path d="M160 90l50-50v120l-50 50z" fill="${col}" opacity=".6" stroke="#7a2f24" stroke-width="2.4"/>
  <g fill="none" stroke="#7a2f24" stroke-width="2">
    <path d="M100 90v120M40 150h120"/>
    <path d="M65 65h120M150 40L100 90"/>
    <path d="M185 65v120M160 150l50-50"/></g>
</svg>`;

BANKS.b22 = [

/* ===== tr.65 – Bài 1: hình vẽ đúng của Mai (hình vuông và trung điểm mỗi cạnh) ===== */
() => {
  const q = Q(1, 'Bạn Mai vẽ một hình vuông trên giấy ô vuông rồi vẽ trung điểm mỗi cạnh của hình vuông đó. Hình nào sau đây là hình vẽ đúng của Mai?');
  const s = pick([4, 6]);
  const shapes = [
    {w: s + 2, h: s, dx: 0, ok: false},
    {w: s, h: s, dx: pick([-1, 1]), ok: false},
    {w: s, h: s, dx: 0, ok: true}
  ].sort(() => Math.random() - .5);
  const L = ['Hình 1', 'Hình 2', 'Hình 3'];
  let bi = 0;
  shapes.forEach((x, i) => { if (x.ok) bi = i; });
  const row = '<div class="b22-row">' + shapes.map((x, i) =>
    `<div class="b22-item">${ART.b22Mid(x.w, x.h, x.dx)}<em>${L[i]}</em></div>`).join('') + '</div>';
  return q.done(row + `<div class="fill-line">Hình vẽ đúng của Mai là ${q.pick(L[bi], L)}.</div>`,
    `${L[bi]}: bốn cạnh bằng nhau (${s} ô) và mỗi điểm đánh dấu đều chia đôi cạnh (${s / 2} ô mỗi bên).`);
},

/* ===== tr.65 – Bài 2: hình tròn dán vào hình vuông ===== */
() => {
  const q = Q(2, 'Một tờ giấy hình tròn được dán vào tờ giấy hình vuông (như hình vẽ).');
  const r = R(2, 5);
  return q.done(ART.b22CircSq(r)
    + `<p class="wordq">Biết bán kính của hình tròn là ${r} cm. Hỏi cạnh hình vuông dài bao nhiêu xăng-ti-mét?</p>
       <div class="fill-line">Đường kính của hình tròn dài ${q.num(2 * r)} cm.</div>
       <div class="fill-line">Cạnh hình vuông dài ${q.num(2 * r)} cm.</div>`,
    `Cạnh hình vuông bằng đường kính hình tròn: ${r} × 2 = ${2 * r} (cm).`);
},

/* ===== tr.65 – Bài 3: cái ao hình chữ nhật và những lá súng ===== */
() => {
  const q = Q(3, 'Cái ao của chú ếch có dạng hình chữ nhật (như hình vẽ). Mỗi lá súng có dạng hình tròn đường kính 1 dm. Em hãy tìm:');
  const L = R(6, 8), W = R(3, 5);
  return q.done(ART.b22Pond(L, W)
    + `<div class="bullet">a) Chiều dài của cái ao là ${q.num(L, 1)} dm.</div>
       <div class="bullet">b) Chiều rộng của cái ao là ${q.num(W, 1)} dm.</div>
       <div class="hint-line">Đếm số lá súng xếp sát nhau theo mỗi chiều của cái ao.</div>`,
    `Chiều dài ${L} lá súng = ${L} dm; chiều rộng ${W} lá súng = ${W} dm.`);
},

/* ===== tr.66 – Bài 1: tìm các hình tam giác và các hình tứ giác ===== */
() => {
  const q = Q(1, 'Tìm các hình tam giác và các hình tứ giác có trong hình sau:');
  const b = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const n = {A: b[0], B: b[1], C: b[2], D: b[3], E: b[4]};
  const t = k => k.split('').map(c => n[c]).join('');
  const tri = [t('ABC'), t('ACD'), t('ADE')];
  const triBad = [t('ABD'), t('ACE'), t('BCD')];
  const qua = [t('ABCD'), t('ACDE')];
  const quaBad = [t('ABCE'), t('ABDE'), t('BCDE')];
  const optT = tri.concat(triBad).sort(() => Math.random() - .5);
  const optQ = qua.concat(quaBad).sort(() => Math.random() - .5);
  return q.done(ART.b22Five(n)
    + `<div class="fill-line">Các hình tam giác: ${q.pick(tri.slice().sort().join(','), optT)}</div>
       <div class="fill-line">Các hình tứ giác: ${q.pick(qua.slice().sort().join(','), optQ)}</div>`,
    `3 hình tam giác: ${tri.join(', ')};  2 hình tứ giác: ${qua.join(', ')}.`);
},

/* ===== tr.66 – Bài 2: hai bán kính nào tạo thành một góc vuông ===== */
() => {
  const q = Q(2, 'Trong hình dưới đây, hãy dùng ê ke kiểm tra xem hai bán kính nào của hình tròn tâm O tạo thành một góc vuông.');
  const base = R(0, 35) * 10;
  const ang = [base % 360, (base + 90) % 360];
  for (let g = 0; g < 400 && ang.length < 4; g++){
    const c = R(0, 35) * 10;
    const okC = ang.every(x => {
      const d = ((c - x) % 360 + 360) % 360;
      const dd = Math.min(d, 360 - d);
      return dd >= 30 && dd !== 90;
    });
    if (okC) ang.push(c);
  }
  while (ang.length < 4) ang.push((base + (ang.length === 2 ? 40 : 200)) % 360);
  const LT = ['A', 'B', 'C', 'D'].sort(() => Math.random() - .5);
  const list = ang.map((a, i) => ({a, n: LT[i]}));
  const opts = ['OA', 'OB', 'OC', 'OD'];
  const ans = ['O' + list[0].n, 'O' + list[1].n].sort().join(',');
  return q.done(ART.b22Radii(list)
    + `<div class="fill-line">Hai bán kính tạo thành một góc vuông là: ${q.pick(ans, opts)}</div>`,
    `${ans.split(',').join(' và ')} tạo thành một góc vuông.`);
},

/* ===== tr.66 – Bài 3: sơn màu khối lập phương lớn ghép từ 8 khối nhỏ ===== */
() => {
  const q = Q(3, 'Ghép 8 khối lập phương nhỏ được khối lập phương lớn (như hình vẽ).');
  const m = pick([['đỏ', '#ef7d6a'], ['xanh', '#6aa9ef'], ['vàng', '#efc76a']]);
  return q.done(ART.b22Cube8(m[1])
    + `<p class="wordq">Người ta sơn màu ${m[0]} vào tất cả các mặt của khối lập phương lớn.
        Hỏi có tất cả bao nhiêu mặt của các khối lập phương nhỏ được sơn màu ${m[0]}?</p>
       <div class="fill-line">Khối lập phương lớn có ${q.num(6, 1)} mặt,
         mỗi mặt gồm ${q.num(4, 1)} mặt của khối lập phương nhỏ.</div>
       <div class="fill-line">Có tất cả ${q.num(24, 2)} mặt của các khối lập phương nhỏ được sơn màu ${m[0]}.</div>`,
    `6 × 4 = 24 (mặt). Mỗi khối nhỏ nằm ở một đỉnh nên có 3 mặt được sơn: 3 × 8 = 24 (mặt).`);
},
];
