/* ==================== BÀI 19: HÌNH TAM GIÁC, HÌNH TỨ GIÁC. HÌNH CHỮ NHẬT, HÌNH VUÔNG
   (SGK tr.56, 57, 58, 59, 60)
   hoạt động tr.57 : bài 1, 2, 3      hoạt động tr.59 : bài 1, 2, 3
   luyện tập tr.60 : bài 1, 2, 3
=================================================================================== */

/* đa giác bất kì, toạ độ theo ô, tự canh nhãn ra phía ngoài */
ART.b19Poly = (pts, names, cls, S) => {
  const C = S || 26;
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const mx = Math.min.apply(null, xs), my = Math.min.apply(null, ys);
  const W = (Math.max.apply(null, xs) - mx) * C, H = (Math.max.apply(null, ys) - my) * C;
  const P = pts.map(p => [(p[0] - mx) * C, (p[1] - my) * C]);
  const gx = P.reduce((a, p) => a + p[0], 0) / P.length;
  const gy = P.reduce((a, p) => a + p[1], 0) / P.length;
  const d = P.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('') + 'Z';
  const tx = P.map((p, i) => `<text x="${(p[0] + (p[0] > gx ? 13 : -13)).toFixed(1)}"
      y="${(p[1] + (p[1] > gy ? 20 : -7)).toFixed(1)}" text-anchor="middle" font-size="17" font-weight="700">${names[i]}</text>`).join('');
  return `<svg viewBox="-24 -24 ${W + 48} ${H + 48}" class="${cls || 'b19-poly'}">
    <path d="${d}" fill="none" stroke="#2b2b2b" stroke-width="2.8" stroke-linejoin="round"/>${tx}</svg>`;
};

/* đa giác vẽ trên lưới ô vuông */
ART.b19Gs = (cols, rows, pts, names) => {
  const C = 24, W = cols * C, H = rows * C;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * C} 0V${H}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * C}H${W}`;
  const P = pts.map(p => [p[0] * C, p[1] * C]);
  const gx = P.reduce((a, p) => a + p[0], 0) / P.length;
  const gy = P.reduce((a, p) => a + p[1], 0) / P.length;
  const d = P.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join('') + 'Z';
  const tx = P.map((p, i) => `<text x="${p[0] + (p[0] > gx ? 12 : -12)}" y="${p[1] + (p[1] > gy ? 19 : -6)}"
      text-anchor="middle" font-size="16" font-weight="700">${names[i]}</text>`).join('');
  return `<svg viewBox="-30 -30 ${W + 60} ${H + 60}" class="b19-gs">
    <path d="${g}" fill="none" stroke="#7fcdec" stroke-width="1"/>
    <path d="${d}" fill="none" stroke="#2b2b2b" stroke-width="2.8" stroke-linejoin="round"/>${tx}</svg>`;
};

/* hình gồm 5 điểm: A, B ở trên; D, C, E thẳng hàng ở dưới; các đoạn AB, DE, AD, AC, BC, BE */
ART.b19Five = n => `<svg viewBox="0 0 300 190" class="b19-five">
  <path d="M70 26H230M20 154H280M70 26L20 154M70 26L150 154M230 26L150 154M230 26L280 154"
    fill="none" stroke="#c2185b" stroke-width="2.8" stroke-linejoin="round"/>
  <circle cx="70" cy="26" r="3.6"/><circle cx="230" cy="26" r="3.6"/><circle cx="20" cy="154" r="3.6"/>
  <circle cx="150" cy="154" r="3.6"/><circle cx="280" cy="154" r="3.6"/>
  <text x="64" y="18" text-anchor="middle" font-size="18" font-weight="700">${n.A}</text>
  <text x="238" y="18" text-anchor="middle" font-size="18" font-weight="700">${n.B}</text>
  <text x="12" y="178" text-anchor="middle" font-size="18" font-weight="700">${n.D}</text>
  <text x="150" y="178" text-anchor="middle" font-size="18" font-weight="700">${n.C}</text>
  <text x="286" y="178" text-anchor="middle" font-size="18" font-weight="700">${n.E}</text>
</svg>`;

/* tờ giấy màu hình chữ nhật, có đánh dấu M trên cạnh trên và N trên cạnh dưới */
ART.b19Cut = n => `<svg viewBox="0 0 320 200" class="b19-cut">
  <rect x="34" y="34" width="252" height="132" fill="#3ab0e8" stroke="#1c6c96" stroke-width="3"/>
  <circle cx="34" cy="34" r="5" fill="#e03b3b"/><circle cx="160" cy="34" r="5" fill="#e03b3b"/>
  <circle cx="286" cy="34" r="5" fill="#e03b3b"/><circle cx="34" cy="166" r="5" fill="#e03b3b"/>
  <circle cx="160" cy="166" r="5" fill="#e03b3b"/><circle cx="286" cy="166" r="5" fill="#e03b3b"/>
  <text x="18" y="28" text-anchor="middle" font-size="18" font-weight="700">${n.A}</text>
  <text x="160" y="22" text-anchor="middle" font-size="18" font-weight="700">${n.M}</text>
  <text x="302" y="28" text-anchor="middle" font-size="18" font-weight="700">${n.B}</text>
  <text x="18" y="184" text-anchor="middle" font-size="18" font-weight="700">${n.D}</text>
  <text x="160" y="192" text-anchor="middle" font-size="18" font-weight="700">${n.N}</text>
  <text x="302" y="184" text-anchor="middle" font-size="18" font-weight="700">${n.C}</text>
</svg>`;

/* tờ giấy ô vuông có mép phải bị xé, đánh dấu M, P ở trên và N, Q ở dưới */
ART.b19Paper = (h, mc, pc, n) => {
  const C = 26, cols = pc + 3, W = cols * C, H = h * C, Wi = W - 42;
  let g = '';
  for (let i = 0; i * C <= Wi; i++) g += `M${i * C} 0V${H}`;
  for (let j = 0; j <= h; j++) g += `M0 ${j * C}H${Wi}`;
  const torn = `M${W} 0q-14 ${(H * .3).toFixed(0)} -30 ${(H * .5).toFixed(0)}q-4 ${(H * .2).toFixed(0)} -12 ${(H * .3).toFixed(0)}`;
  return `<svg viewBox="-16 -26 ${W + 32} ${H + 56}" class="b19-paper">
    <path d="M0 0H${W}L${W - 42} ${H}H0z" fill="#cdeaf7" stroke="none"/>
    <path d="${g}" fill="none" stroke="#5bb8de" stroke-width="1"/>
    <path d="M0 0H${W}M0 ${H}H${W - 42}M0 0V${H}" fill="none" stroke="#123" stroke-width="2.6"/>
    <path d="${torn}" fill="none" stroke="#123" stroke-width="2"/>
    <circle cx="${mc * C}" cy="0" r="4.6"/><circle cx="${pc * C}" cy="0" r="4.6"/>
    <circle cx="${mc * C}" cy="${H}" r="4.6"/><circle cx="${pc * C}" cy="${H}" r="4.6"/>
    <text x="${mc * C}" y="-9" text-anchor="middle" font-size="17" font-weight="700">${n.M}</text>
    <text x="${pc * C}" y="-9" text-anchor="middle" font-size="17" font-weight="700">${n.P}</text>
    <text x="${mc * C}" y="${H + 20}" text-anchor="middle" font-size="17" font-weight="700">${n.N}</text>
    <text x="${pc * C}" y="${H + 20}" text-anchor="middle" font-size="17" font-weight="700">${n.Q}</text>
  </svg>`;
};

/* hình chữ nhật có ghi tên bốn đỉnh và số đo hai cạnh */
ART.b19Rect = (n, wLab, hLab) => `<svg viewBox="-34 -32 430 236" class="b19-rect">
  <rect x="0" y="0" width="320" height="168" fill="#d9f0fb" stroke="#1c6c96" stroke-width="3"/>
  <circle cx="0" cy="0" r="4.6"/><circle cx="320" cy="0" r="4.6"/>
  <circle cx="320" cy="168" r="4.6"/><circle cx="0" cy="168" r="4.6"/>
  <text x="-14" y="-8" text-anchor="middle" font-size="18" font-weight="700">${n.A}</text>
  <text x="334" y="-8" text-anchor="middle" font-size="18" font-weight="700">${n.B}</text>
  <text x="334" y="188" text-anchor="middle" font-size="18" font-weight="700">${n.C}</text>
  <text x="-14" y="188" text-anchor="middle" font-size="18" font-weight="700">${n.D}</text>
  <text x="160" y="188" text-anchor="middle" font-size="16">${wLab}</text>
  <text x="352" y="88" text-anchor="middle" font-size="16">${hLab}</text>
</svg>`;

/* con đường thẳng A – C – D – B và đường tránh C – M – N – D */
ART.b19Road = (h, w) => `<svg viewBox="-16 -20 470 170" class="b19-road">
  <path d="M0 24H440" fill="none" stroke="#1f7ec4" stroke-width="5"/>
  <path d="M120 24H320" fill="none" stroke="#e03b3b" stroke-width="5"/>
  <path d="M120 24V120H320V24" fill="none" stroke="#1f7ec4" stroke-width="5"/>
  <ellipse cx="220" cy="76" rx="86" ry="40" fill="#cdeecb" stroke="#5aa657" stroke-width="2"/>
  <circle cx="0" cy="24" r="5" fill="#123"/><circle cx="120" cy="24" r="5" fill="#123"/>
  <circle cx="320" cy="24" r="5" fill="#123"/><circle cx="440" cy="24" r="5" fill="#123"/>
  <circle cx="120" cy="120" r="5" fill="#123"/><circle cx="320" cy="120" r="5" fill="#123"/>
  <text x="0" y="14" text-anchor="middle" font-size="17" font-weight="700">A</text>
  <text x="110" y="14" text-anchor="middle" font-size="17" font-weight="700">C</text>
  <text x="330" y="14" text-anchor="middle" font-size="17" font-weight="700">D</text>
  <text x="440" y="14" text-anchor="middle" font-size="17" font-weight="700">B</text>
  <text x="106" y="140" text-anchor="middle" font-size="17" font-weight="700">M</text>
  <text x="334" y="140" text-anchor="middle" font-size="17" font-weight="700">N</text>
  <text x="220" y="140" text-anchor="middle" font-size="15">${w} km</text>
  <text x="94" y="76" text-anchor="end" font-size="15">${h} km</text>
</svg>`;

/* hình chữ nhật xếp bằng que tính: a que mỗi cạnh dài, b que mỗi cạnh ngắn */
ART.b19Sticks = (a, b) => {
  const L = 40, W = a * L + 24, H = b * L + 24;
  let s = '';
  for (let i = 0; i < a; i++){
    s += `<rect x="${12 + i * L + 3}" y="6" width="${L - 6}" height="9" rx="4" fill="#a8d36a" stroke="#5f8f2e" stroke-width="1.6"/>`;
    s += `<rect x="${12 + i * L + 3}" y="${H - 15}" width="${L - 6}" height="9" rx="4" fill="#a8d36a" stroke="#5f8f2e" stroke-width="1.6"/>`;
  }
  for (let j = 0; j < b; j++){
    s += `<rect x="6" y="${12 + j * L + 3}" width="9" height="${L - 6}" rx="4" fill="#a8d36a" stroke="#5f8f2e" stroke-width="1.6"/>`;
    s += `<rect x="${W - 15}" y="${12 + j * L + 3}" width="9" height="${L - 6}" rx="4" fill="#a8d36a" stroke="#5f8f2e" stroke-width="1.6"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="b19-st">${s}</svg>`;
};

BANKS.b19 = [

/* ===== tr.57 – Bài 1: nêu tên các đỉnh và các cạnh của mỗi hình (theo mẫu) ===== */
() => {
  const q = Q(1, 'Nêu tên các đỉnh và các cạnh của mỗi hình (theo mẫu).');
  const bag = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const T1 = bag.slice(0, 3), T2 = bag.slice(3, 6), Q4 = bag.slice(6, 10);
  const tri = [[1, 0], [0, 2], [2, 2]];
  const quad = [[0.5, 0], [2.2, 0], [2.7, 1.8], [0, 1.8]];
  const sd = (a, b) => a + b;
  const s1 = [sd(T1[0], T1[1]), sd(T1[1], T1[2]), sd(T1[2], T1[0])];
  const s2 = [sd(T2[0], T2[1]), sd(T2[1], T2[2]), sd(T2[2], T2[0])];
  const s4 = [sd(Q4[0], Q4[1]), sd(Q4[1], Q4[2]), sd(Q4[2], Q4[3]), sd(Q4[3], Q4[0])];
  const dia = [sd(Q4[0], Q4[2]), sd(Q4[1], Q4[3])];
  const optV2 = T2.concat(Q4.slice(0, 3)).sort(() => Math.random() - .5);
  const optV4 = Q4.concat(T2.slice(0, 2)).sort(() => Math.random() - .5);
  const optS2 = s2.concat(s4.slice(0, 3)).sort(() => Math.random() - .5);
  const optS4 = s4.concat(dia).sort(() => Math.random() - .5);
  const head = `<tr><th></th>
    <th>${ART.b19Poly(tri, T1)}Hình tam giác<br>${T1.join('')}</th>
    <th>${ART.b19Poly(tri, T2)}Hình tam giác<br>${T2.join('')}</th>
    <th>${ART.b19Poly(quad, Q4)}Hình tứ giác<br>${Q4.join('')}</th></tr>`;
  const r1 = `<tr><td><b>Các đỉnh</b></td><td>${T1.join(', ')}</td>
    <td>${q.pick(T2.slice().sort().join(','), optV2)}</td>
    <td>${q.pick(Q4.slice().sort().join(','), optV4)}</td></tr>`;
  const r2 = `<tr><td><b>Các cạnh</b></td><td>${s1.join(', ')}</td>
    <td>${q.pick(s2.slice().sort().join(','), optS2)}</td>
    <td>${q.pick(s4.slice().sort().join(','), optS4)}</td></tr>`;
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">${head}${r1}${r2}</table></div>`,
    `Hình tam giác có 3 đỉnh, 3 cạnh; hình tứ giác có 4 đỉnh, 4 cạnh (${dia.join(', ')} là đường chéo, không phải cạnh).`);
},

/* ===== tr.57 – Bài 2: nêu tên các hình tam giác và các hình tứ giác ===== */
() => {
  const q = Q(2, 'Nêu tên các hình tam giác và các hình tứ giác có trong hình dưới đây:');
  const b = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const n = {A: b[0], B: b[1], C: b[2], D: b[3], E: b[4]};
  const t = k => k.split('').map(c => n[c]).join('');
  const tri = [t('ADC'), t('ABC'), t('BCE')];
  const triBad = [t('ABD'), t('ABE'), t('ACE')];
  const qua = [t('ABCD'), t('ABEC'), t('ABED')];
  const quaBad = [t('ADCE'), t('BDCE')];
  const optT = tri.concat(triBad).sort(() => Math.random() - .5);
  const optQ = qua.concat(quaBad).sort(() => Math.random() - .5);
  return q.done(ART.b19Five(n)
    + `<div class="fill-line">Các hình tam giác: ${q.pick(tri.slice().sort().join(','), optT)}</div>
       <div class="fill-line">Các hình tứ giác: ${q.pick(qua.slice().sort().join(','), optQ)}</div>`,
    `3 hình tam giác: ${tri.join(', ')};  3 hình tứ giác: ${qua.join(', ')}.`);
},

/* ===== tr.57 – Bài 3: cắt tờ giấy theo đoạn thẳng nào ===== */
() => {
  const q = Q(3, 'Mai đánh dấu một số điểm trên tờ giấy màu (như hình vẽ). Qua hai điểm trong các điểm đã đánh dấu, Mai có thể cắt tờ giấy theo đoạn thẳng nào để được:');
  const b = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const n = {A: b[0], M: b[1], B: b[2], D: b[3], N: b[4], C: b[5]};
  const s = k => k.split('').map(c => n[c]).join('');
  const two4 = s('MN');
  const mix = [s('MD'), s('MC'), s('AN'), s('BN')];
  const two3 = [s('AC'), s('BD')];
  const opts = [two4].concat(mix, two3).sort(() => Math.random() - .5);
  return q.done(ART.b19Cut(n)
    + `<div class="fill-line"><b>a)</b> Cắt được 2 hình tứ giác: ${q.pick(two4, opts)}</div>
       <div class="fill-line"><b>b)</b> Cắt được 1 hình tam giác và 1 hình tứ giác: ${q.pick(mix.slice().sort().join(','), opts)}</div>`,
    `a) ${two4};  b) ${mix.join(', ')} (cắt theo ${two3.join(' hoặc ')} thì được 2 hình tam giác).`);
},

/* ===== tr.59 – Bài 1: a) hình nào là hình vuông  b) những hình nào là hình chữ nhật ===== */
() => {
  const q = Q(1, 'a) Trong các hình dưới đây, hình nào là hình vuông?');
  const b = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const g = i => b.slice(i * 4, i * 4 + 4);
  const L = [g(0), g(1), g(2)];
  const w = R(3, 4), h = R(1, 2), s = R(3, 4), dx = R(3, 4), dy = 2;
  const shapes = [
    {pts: [[1, 1], [1 + w, 1], [1 + w, 1 + h], [1, 1 + h]], cols: w + 2, rows: h + 2, ok: false},
    {pts: [[0, dy], [dx, 0], [2 * dx, dy], [dx, 2 * dy]], cols: 2 * dx, rows: 2 * dy, ok: false},
    {pts: [[1, 1], [1 + s, 1], [1 + s, 1 + s], [1, 1 + s]], cols: s + 2, rows: s + 2, ok: true}
  ];
  const ord = [0, 1, 2].sort(() => Math.random() - .5);
  const items = ord.map((k, i) => ({sh: shapes[k], nm: L[i]}));
  const okName = items.filter(x => x.sh.ok).map(x => x.nm.join(''))[0];
  const opts = items.map(x => x.nm.join(''));
  const row = '<div class="b19-row">' + items.map(x =>
    `<div class="b19-item">${ART.b19Gs(x.sh.cols, x.sh.rows, x.sh.pts, x.nm)}<em>${x.nm.join('')}</em></div>`).join('')
    + '</div>';
  return q.done(row + `<div class="fill-line">Hình vuông là hình ${q.pick(okName, opts)}.</div>`,
    `Hình ${okName} có 4 góc vuông và 4 cạnh bằng nhau (${s} ô).`);
},

/* ===== tr.59 – Bài 1b: những hình nào là hình chữ nhật ===== */
() => {
  const q = Q(1, 'b) Trong các hình dưới đây, những hình nào là hình chữ nhật?');
  const b = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const g = i => b.slice(i * 4, i * 4 + 4);
  const L = [g(0), g(1), g(2), g(3)];
  const w1 = R(3, 4), h1 = R(2, 3), w2 = R(4, 5), h2 = R(2, 3), w3 = R(2, 3), h3 = w3 + R(1, 2);
  const shapes = [
    {pts: [[1, 0], [1 + w1, 0], [w1, h1], [0, h1]], cols: w1 + 2, rows: h1 + 1, ok: false},
    {pts: [[0, 0], [w2, 0], [w2, h2], [0, h2]], cols: w2 + 1, rows: h2 + 1, ok: true},
    {pts: [[1, 0], [1 + w3, 0], [2 + w3, h3], [0, h3]], cols: w3 + 3, rows: h3 + 1, ok: false},
    {pts: [[0, 0], [w3, 0], [w3, h3], [0, h3]], cols: w3 + 1, rows: h3 + 1, ok: true}
  ];
  const ord = [0, 1, 2, 3].sort(() => Math.random() - .5);
  const items = ord.map((k, i) => ({sh: shapes[k], nm: L[i]}));
  const oks = items.filter(x => x.sh.ok).map(x => x.nm.join(''));
  const opts = items.map(x => x.nm.join(''));
  const row = '<div class="b19-row">' + items.map(x =>
    `<div class="b19-item">${ART.b19Gs(x.sh.cols, x.sh.rows, x.sh.pts, x.nm)}<em>${x.nm.join('')}</em></div>`).join('')
    + '</div>';
  return q.done(row + `<div class="fill-line">Các hình chữ nhật là: ${q.pick(oks.slice().sort().join(','), opts)}</div>`,
    `Hình chữ nhật có 4 góc vuông, 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau: ${oks.join(', ')}.`);
},

/* ===== tr.59 – Bài 2: Số ? (đo cạnh hình vuông, hình chữ nhật) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const b = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const S = b.slice(0, 4), Rn = b.slice(4, 8);
  const c = R(2, 4), d = R(4, 5), r = R(2, 3);
  const sq = ART.b19Gs(c + 1, c + 1, [[0, 0], [c, 0], [c, c], [0, c]], S);
  const rc = ART.b19Gs(d + 1, r + 1, [[0, 0], [d, 0], [d, r], [0, r]], Rn);
  return q.done(`<div class="b19-row">
      <div class="b19-item">${sq}<em>${S.join('')}</em></div>
      <div class="b19-item">${rc}<em>${Rn.join('')}</em></div></div>
    <div class="fill-line">Bằng cách đo trên hình vẽ, hình vuông ${S.join('')} có độ dài cạnh là ${q.num(c, 1)} cm;</div>
    <div class="fill-line">hình chữ nhật ${Rn.join('')} có chiều dài là ${q.num(d, 1)} cm
      và chiều rộng là ${q.num(r, 1)} cm.</div>
    <div class="hint-line">Mỗi ô vuông nhỏ trên hình có cạnh dài 1 cm.</div>`,
    `Cạnh hình vuông ${c} cm; chiều dài ${d} cm, chiều rộng ${r} cm.`);
},

/* ===== tr.59 – Bài 3: chọn câu trả lời đúng (cắt thành một hình vuông) ===== */
() => {
  const q = Q(3, 'Chọn câu trả lời đúng.');
  const b = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const n = {M: b[0], P: b[1], N: b[2], Q: b[3]};
  const h = R(4, 5), gap = R(1, 2);
  const list = [n.M + n.Q, n.P + n.N, n.P + n.Q, n.M + n.N].sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D'];
  const ok = L[list.indexOf(n.M + n.N)];
  return q.done(ART.b19Paper(h, h, h + gap, n)
    + `<p class="wordq">Để cắt tờ giấy như hình bên thành một hình vuông, Rô-bốt cần cắt theo đoạn thẳng nào dưới đây?</p>
       <div class="b19-opt">${list.map((v, i) => `<span><i>${L[i]}.</i>Đoạn thẳng ${v}.</span>`).join('')}</div>
       ${q.pick(ok, L)}`,
    `Cắt theo ${n.M + n.N} được hình vuông cạnh ${h} ô.`);
},

/* ===== tr.60 – Bài 1: nhà bốn bạn ở bốn đỉnh hình chữ nhật ===== */
() => {
  const q = Q(1, 'Nhà các bạn dế mèn, dế trũi, châu chấu voi và xén tóc ở bốn đỉnh của hình chữ nhật ABCD (như hình vẽ).');
  const bc = R(8, 19), cd = R(20, 39);
  return q.done(`<p class="wordq">Biết rằng BC = ${bc} dm, CD = ${cd} dm.</p>`
    + ART.b19Rect({A: 'A', B: 'B', C: 'C', D: 'D'}, cd + ' dm', bc + ' dm')
    + `<div class="hint-line">Nhà dế mèn ở đỉnh A, nhà dế trũi ở đỉnh B,
        nhà châu chấu voi ở đỉnh C, nhà xén tóc ở đỉnh D.</div>
       <div class="bullet">a) Nhà dế mèn cách nhà xén tóc ${q.num(bc)} đề-xi-mét.</div>
       <div class="bullet">b) Nhà dế mèn cách nhà dế trũi ${q.num(cd)} đề-xi-mét.</div>`,
    `AD = BC = ${bc} dm;  AB = CD = ${cd} dm.`);
},

/* ===== tr.60 – Bài 2: con đường tránh CMND ===== */
() => {
  const q = Q(2, 'Một con đường thẳng nối từ địa điểm A đến địa điểm B. Do đoạn đường CD bị hỏng nên người ta phải làm một đường tránh CMND có kích thước như hình vẽ. Biết CDNM là hình chữ nhật.');
  const h = R(1, 4), w = R(2, 6);
  const L = ['A', 'B', 'C'];
  const vals = [2 * h, h, w + 2 * h].sort(() => Math.random() - .5);
  const ok = L[vals.indexOf(2 * h)];
  return q.done(ART.b19Road(h, w)
    + `<div class="fill-line"><b>a)</b> <span class="tag">Số</span> ?
        Độ dài đoạn đường CD là ${q.num(w)} km.</div>
       <div class="fill-line"><b>b)</b> Chọn câu trả lời đúng. Đi từ địa điểm A đến địa điểm B theo đường tránh
        dài hơn đi theo đường thẳng bao nhiêu ki-lô-mét?</div>
       <div class="b19-opt">${vals.map((v, i) => `<span><i>${L[i]}.</i>${v} km</span>`).join('')}</div>
       ${q.pick(ok, L)}`,
    `CD = MN = ${w} km. Đường tránh CM + MN + ND = ${h} + ${w} + ${h} = ${w + 2 * h} km, dài hơn CD là ${2 * h} km.`);
},

/* ===== tr.60 – Bài 3: xếp hình chữ nhật bằng que tính ===== */
() => {
  const q = Q(3, 'Với 6 que tính, Rô-bốt xếp được một hình chữ nhật như hình bên.');
  const s = pick([5, 7, 9]), n = 2 * s, cach = (s - 1) / 2;
  const ways = [];
  for (let a = 1; a * 2 < s; a++) ways.push(a + ' và ' + (s - a));
  return q.done(ART.b19Sticks(2, 1)
    + `<p class="wordq">Sử dụng ${n} que tính, em hãy xếp một hình chữ nhật. Em tìm được mấy cách xếp?</p>
       <div class="fill-line">Mỗi cạnh dài xếp <i>a</i> que, mỗi cạnh ngắn xếp <i>b</i> que thì
         <i>a</i> + <i>b</i> = ${q.num(s)} que.</div>
       <div class="fill-line">Em tìm được ${q.num(cach)} cách xếp.</div>`,
    `${n} : 2 = ${s}. Các cách xếp (số que cạnh ngắn và cạnh dài): ${ways.join('; ')} → ${cach} cách.`);
},
];
