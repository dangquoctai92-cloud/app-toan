/*CSS
.b60-tree{width:100%;max-width:560px;height:auto;display:block;margin:6px auto}
.b60-gauges{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 12px;margin:8px 0}
.b60-gauge{width:148px;height:auto}
.b60-line{font-size:19px;font-weight:700;line-height:2.1;margin:2px 0}
.b60-let{color:#d63384;font-weight:800;margin-right:6px}
.b60-cols{display:flex;flex-wrap:wrap;gap:2px 26px;margin:6px 0}
.b60-cols > div{min-width:252px}
.b60-sub{font-weight:700;margin:9px 0 3px}
.b60-dig{font-size:21px;font-weight:800;letter-spacing:.5px}
.b60-dots{display:flex;flex-wrap:wrap;gap:2px 30px;margin:4px 0}
.b60-dots > div{min-width:238px;font-size:18px;font-weight:700;line-height:2}
CSS*/

/* ==================== BÀI 60: SO SÁNH CÁC SỐ TRONG PHẠM VI 100 000
   (SGK tập 2 – tr.61, 62, 63)
   hoạt động tr.62 : bài 1 (Đ, S ?), bài 2 (>; <; = ?), bài 3 (cây thần kì – bạn khỉ hái quả)
   luyện tập tr.62 : bài 1 (số dân bốn huyện A, B, C, D),
                     bài 2 (sức chứa của một số sân vận động)
   luyện tập tr.63 : bài 3 (công-tơ-mét của ba xe máy), bài 4 (Tìm chữ số thích hợp)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như trong SGK: 41 217 */
ART.b60sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* viết số thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị */
ART.b60Sum = n => {
  const out = [];
  [10000, 1000, 100, 10, 1].forEach(u => {
    const d = Math.floor(n / u) % 10;
    if (d) out.push(ART.b60sp(d * u));
  });
  return out.join(' + ');
};

/* cây thần kì: 3 cành lớn, mỗi cành lớn chia thành 2 cành nhỏ mang một quả */
ART.b60Tree = (main, leaf, cols) => {
  const BR = ['M310 302L140 232', 'M310 302L310 196', 'M310 302L480 232'];
  const LB = ['M140 232L62 146', 'M140 232L186 122',
    'M310 200L250 112', 'M310 200L370 112',
    'M480 232L424 122', 'M480 232L558 152'];
  const MP = [[225, 267], [310, 250], [395, 267]];
  const LP = [[101, 189], [163, 177], [280, 156], [340, 156], [452, 177], [519, 192]];
  const FP = [[62, 146], [186, 122], [250, 112], [370, 112], [424, 122], [558, 152]];
  const pill = (p, t, big) => {
    const w = big ? 82 : 70, h = big ? 26 : 22, fs = big ? 17 : 14;
    return `<g><rect x="${p[0] - w / 2}" y="${p[1] - h / 2}" width="${w}" height="${h}" rx="${h / 2}"
        fill="#6b5526" opacity=".95"/>
      <text x="${p[0]}" y="${p[1] + fs * 0.36}" text-anchor="middle" font-size="${fs}"
        font-weight="800" fill="#fff">${t}</text></g>`;
  };
  const fruit = (p, c) => `<g><path d="M${p[0]} ${p[1] - 16}v-9" stroke="#4e7a2e" stroke-width="3"
      stroke-linecap="round"/>
    <circle cx="${p[0]}" cy="${p[1]}" r="16" fill="${c}" stroke="#5a4020" stroke-width="2"/>
    <circle cx="${p[0] - 5}" cy="${p[1] - 6}" r="4.5" fill="#fff" opacity=".55"/></g>`;
  const monkey = `<g transform="translate(556,300) scale(.86)">
    <path d="M28 46q22 4 24 22t-16 22" fill="none" stroke="#c87a3c" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="0" cy="44" rx="21" ry="26" fill="#e39a55" stroke="#a5622a" stroke-width="2.4"/>
    <ellipse cx="0" cy="50" rx="13" ry="17" fill="#f6d3a8"/>
    <circle cx="-23" cy="6" r="8" fill="#e39a55" stroke="#a5622a" stroke-width="2.4"/>
    <circle cx="23" cy="6" r="8" fill="#e39a55" stroke="#a5622a" stroke-width="2.4"/>
    <circle cx="0" cy="6" r="22" fill="#e8a763" stroke="#a5622a" stroke-width="2.4"/>
    <ellipse cx="0" cy="13" rx="15" ry="12" fill="#f8ddb8"/>
    <circle cx="-7" cy="1" r="3" fill="#3a2410"/><circle cx="7" cy="1" r="3" fill="#3a2410"/>
    <path d="M-5 15q5 5 10 0" fill="none" stroke="#8a5424" stroke-width="2.2" stroke-linecap="round"/>
  </g>`;
  return `<svg viewBox="0 0 620 400" class="b60-tree">
    <ellipse cx="310" cy="392" rx="245" ry="17" fill="#bfe3a0"/>
    <ellipse cx="180" cy="178" rx="132" ry="96" fill="#f6c6da"/>
    <ellipse cx="330" cy="138" rx="142" ry="100" fill="#fbdbe8"/>
    <ellipse cx="472" cy="184" rx="132" ry="96" fill="#f6c6da"/>
    <ellipse cx="310" cy="214" rx="205" ry="88" fill="#fbdbe8" opacity=".9"/>
    <path d="M310 396V300" stroke="#8d7539" stroke-width="30" stroke-linecap="round"/>
    ${BR.map(d => `<path d="${d}" fill="none" stroke="#8d7539" stroke-width="19"
      stroke-linecap="round"/>`).join('')}
    ${LB.map(d => `<path d="${d}" fill="none" stroke="#8d7539" stroke-width="12"
      stroke-linecap="round"/>`).join('')}
    ${FP.map((p, i) => fruit(p, cols[i])).join('')}
    ${MP.map((p, i) => pill(p, ART.b60sp(main[i]), true)).join('')}
    ${LP.map((p, i) => pill(p, ART.b60sp(leaf[i]))).join('')}
    ${monkey}
  </svg>`;
};

/* công-tơ-mét của một xe máy */
ART.b60Gauge = (n, letter, col) => {
  let tick = '';
  for (let i = 0; i <= 10; i++){
    const a = Math.PI * (1 - i / 10);
    const cx = 85, cy = 108;
    tick += `<path d="M${(cx + 63 * Math.cos(a)).toFixed(1)} ${(cy - 63 * Math.sin(a)).toFixed(1)}
      L${(cx + 50 * Math.cos(a)).toFixed(1)} ${(cy - 50 * Math.sin(a)).toFixed(1)}"
      stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 170 152" class="b60-gauge">
    <path d="M18 108A67 67 0 0 1 152 108" fill="none" stroke="${col}" stroke-width="28"
      stroke-linecap="round"/>
    ${tick}
    <rect x="45" y="84" width="80" height="25" rx="4" fill="#e9edd7" stroke="#333" stroke-width="2"/>
    <text x="85" y="103" text-anchor="middle" font-size="17" font-weight="800"
      font-family="monospace" fill="#1a1a1a">${n}</text>
    <path d="M85 116L36 96" stroke="#f2e14a" stroke-width="5" stroke-linecap="round"/>
    <circle cx="85" cy="116" r="9" fill="#d63030" stroke="#8f1c1c" stroke-width="2.4"/>
    <text x="85" y="146" text-anchor="middle" font-size="18" font-weight="800" fill="#d63384">${letter}</text>
  </svg>`;
};

BANKS.b60 = [

/* ===== tr.62 – Bài 1: Đ, S ? ===== */
() => {
  const q = Q(1, '<span class="tag">Đ, S</span> ?');
  const sp = ART.b60sp;
  const items = [];
  /* a) số có bốn chữ số so với số có năm chữ số */
  {
    const x = R(1000, 9999), y = R(10000, 99999), s = pick(['<', '>']);
    items.push({x, y, s, a: s === '<' ? 'Đ' : 'S'});
  }
  /* b) hai số có năm chữ số khác nhau ở hàng nghìn */
  {
    const cn = R(1, 9), n1 = R(1, 8), n2 = R(n1 + 1, 9);
    const x = cn * 10000 + n1 * 1000 + R(0, 999);
    const y = cn * 10000 + n2 * 1000 + R(0, 999);
    const s = pick(['<', '>']);
    items.push({x, y, s, a: s === '<' ? 'Đ' : 'S'});
  }
  /* c) số có năm chữ số so với số 9 999 hoặc số nhỏ hơn */
  {
    const x = R(4, 9) * 10000 + R(0, 999);
    const y = R(1, 3) * 10000 + R(0, 9999);
    const s = pick(['<', '>']);
    items.push({x, y, s, a: s === '>' ? 'Đ' : 'S'});
  }
  const L = ['a)', 'b)', 'c)'];
  const html = '<div class="b60-dots">' + items.map((it, i) =>
    `<div><span class="b60-let">${L[i]}</span>${sp(it.x)}
      <span class="op">${it.s === '<' ? '&lt;' : '&gt;'}</span> ${sp(it.y)}
      ${q.pick(it.a, ['Đ', 'S'])}</div>`).join('') + '</div>';
  return q.done(html, items.map((it, i) =>
    `${L[i]} ${sp(it.x)} ${it.s} ${sp(it.y)} là ${it.a === 'Đ' ? 'đúng' : 'sai'}`).join(';  '));
},

/* ===== tr.62 – Bài 2: >; <; = ? ===== */
() => {
  const q = Q(2, '&gt;; &lt;; = ?');
  const sp = ART.b60sp;
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  /* a) khác nhau ở hàng nghìn */
  const cnA = R(1, 9), a1 = R(0, 9), a2 = pick([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => v !== a1));
  const xa = cnA * 10000 + a1 * 1000 + R(0, 999);
  const ya = cnA * 10000 + a2 * 1000 + R(0, 999);
  /* b) giống hàng chục nghìn và hàng nghìn, khác ở hàng trăm */
  const cnB = R(1, 9), nB = R(0, 9), b1 = R(0, 8), b2 = R(b1 + 1, 9);
  const hi = cnB * 10000 + nB * 1000;
  const xb = hi + b1 * 100 + R(0, 99);
  const yb = hi + b2 * 100 + R(0, 99);
  /* c) so sánh một số với tổng các hàng */
  let n = R(2, 8) * 10000 + R(1, 9) * 1000 + R(1, 9) * 100 + R(1, 9) * 10;
  const mode = pick(['eq', 'gt', 'lt']);
  const m = mode === 'eq' ? n : mode === 'gt' ? n - pick([10, 100, 1000])
    : n + pick([10, 100, 1000]);
  const rows = [
    ['a)', sp(xa), sp(ya), cmp(xa, ya)],
    ['b)', sp(xb), sp(yb), cmp(xb, yb)],
    ['c)', sp(n), ART.b60Sum(m), cmp(n, m)]
  ];
  const html = rows.map(r =>
    `<div class="b60-line"><span class="b60-let">${r[0]}</span>${r[1]}
      ${q.sign(r[3])} ${r[2]}</div>`).join('')
    + '<div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>';
  return q.done(html,
    `c) ${ART.b60Sum(m)} = ${sp(m)} nên ${sp(n)} ${cmp(n, m)} ${sp(m)}`);
},

/* ===== tr.62 – Bài 3: cây thần kì – bạn khỉ leo theo cành ghi số lớn hơn ===== */
() => {
  const q = Q(3, 'Một cây thần kì ra các quả với màu sắc khác nhau. Bạn khỉ sẽ leo theo '
    + 'các cành ghi số lớn hơn để lấy quả. Hỏi bạn khỉ lấy được quả màu gì?');
  const nums = [];
  for (let g = 0; g < 400 && nums.length < 9; g++){
    const k = R(1, 4);
    const v = k === 1 ? R(1, 9) * 10000 : k === 2 ? R(10, 99) * 1000
      : k === 3 ? R(10000, 99999) : R(1000, 9999);
    if (!nums.includes(v)) nums.push(v);
  }
  while (nums.length < 9){
    let v = 10001;
    for (let t = 0; t < 60 && nums.includes(v); t++) v++;
    nums.push(v);
  }
  const main = nums.slice(0, 3), leaf = nums.slice(3, 9);
  const COLORS = [['đỏ', '#e0483a'], ['cam', '#f5941f'], ['vàng', '#f2ce2b'],
    ['xanh lá', '#4fb352'], ['xanh dương', '#3a8fd8'], ['tím', '#8e4fbf']]
    .slice().sort(() => Math.random() - .5);
  /* cành lớn có số lớn nhất */
  let bi = 0;
  for (let i = 1; i < 3; i++) if (main[i] > main[bi]) bi = i;
  /* trong hai cành nhỏ của cành đó, chọn cành ghi số lớn hơn */
  const li = leaf[bi * 2] > leaf[bi * 2 + 1] ? bi * 2 : bi * 2 + 1;
  const ans = COLORS[li][0];
  const html = ART.b60Tree(main, leaf, COLORS.map(c => c[1]))
    + `<div class="fill-line">Bạn khỉ lấy được quả màu ${q.pick(ans, COLORS.map(c => c[0]))}</div>`;
  return q.done(html,
    `Ở gốc: chọn cành ${ART.b60sp(main[bi])} vì đó là số lớn nhất. `
    + `Tiếp đó chọn cành ${ART.b60sp(leaf[li])} vì ${ART.b60sp(leaf[li])} > `
    + `${ART.b60sp(leaf[li === bi * 2 ? bi * 2 + 1 : bi * 2])}. Vậy bạn khỉ lấy được quả màu ${ans}.`);
},

/* ===== tr.62 – Bài 1 (luyện tập): số dân bốn huyện A, B, C, D ===== */
() => {
  const q = Q(1, 'Bốn huyện A, B, C, D có số dân là:');
  const sp = ART.b60sp;
  const vals = [];
  for (let g = 0; g < 300 && vals.length < 4; g++){
    const v = R(70, 89) * 1000 + R(0, 999);
    if (!vals.includes(v)) vals.push(v);
  }
  while (vals.length < 4){
    let v = 70000;
    for (let t = 0; t < 60 && vals.includes(v); t++) v += 137;
    vals.push(v);
  }
  const NM = ['A', 'B', 'C', 'D'];
  const up = vals.slice().sort((x, y) => x - y);
  const maxN = NM[vals.indexOf(up[3])], minN = NM[vals.indexOf(up[0])];
  const html = '<div class="b60-dots">' + NM.map((c, i) =>
      `<div><span class="b60-let">&bull;</span>Huyện ${c}: ${sp(vals[i])} người</div>`).join('') + '</div>'
    + `<div class="b60-sub">a) Sắp xếp các số trên theo thứ tự từ bé đến lớn.</div>
       <div class="fill-line">${up.map(v => q.num(v)).join('<span class="op">,</span>')}</div>
       <div class="b60-sub">b) Huyện nào có đông dân nhất?</div>
       <div class="fill-line">Huyện ${q.pick(maxN, NM)}</div>
       <div class="b60-sub">c) Huyện nào có ít dân nhất?</div>
       <div class="fill-line">Huyện ${q.pick(minN, NM)}</div>`;
  return q.done(html,
    `Từ bé đến lớn: ${up.map(sp).join(' < ')}. Huyện ${maxN} đông dân nhất, huyện ${minN} ít dân nhất.`);
},

/* ===== tr.62 – Bài 2 (luyện tập): sức chứa của một số sân vận động ===== */
() => {
  const q = Q(2, 'Dưới đây là sức chứa của một số sân vận động ở Việt Nam.');
  const sp = ART.b60sp;
  const SAN = ['Mỹ Đình', 'Lạch Tray', 'Thiên Trường', 'Thống Nhất', 'Hàng Đẫy', 'Cẩm Phả']
    .slice().sort(() => Math.random() - .5).slice(0, 4);
  const vals = [R(40, 49) * 1000 + R(1, 999)];
  for (let g = 0; g < 300 && vals.length < 4; g++){
    const v = R(15, 39) * 1000;
    if (!vals.includes(v)) vals.push(v);
  }
  while (vals.length < 4){
    let v = 15000;
    for (let t = 0; t < 60 && vals.includes(v); t++) v += 1000;
    vals.push(v);
  }
  /* xáo trộn để sân có sức chứa lớn nhất không luôn đứng đầu bảng */
  const idx = [0, 1, 2, 3].sort(() => Math.random() - .5);
  const rows = idx.map(i => ({ten: SAN[i], v: vals[i]}));
  const up = rows.map(r => r.v).slice().sort((x, y) => x - y);
  const lonNhat = rows.find(r => r.v === up[3]).ten;
  const nhoNhat = rows.find(r => r.v === up[0]).ten;
  const tens = rows.map(r => r.ten);
  const html = `<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>STT</th><th>Sân vận động</th><th>Sức chứa (người)</th></tr>
      ${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r.ten}</td><td>${sp(r.v)}</td></tr>`).join('')}
    </table></div>
    <div class="b60-sub">Trong các sân vận động trên:</div>
    <div class="b60-sub">a) Sân vận động nào có sức chứa lớn nhất? Sân vận động nào có sức chứa nhỏ nhất?</div>
    <div class="fill-line">Sức chứa lớn nhất: sân ${q.pick(lonNhat, tens)}</div>
    <div class="fill-line">Sức chứa nhỏ nhất: sân ${q.pick(nhoNhat, tens)}</div>
    <div class="b60-sub">b) Sân vận động nào có sức chứa trên 40 000 người?</div>
    <div class="fill-line">Sân ${q.pick(lonNhat, tens)}</div>`;
  return q.done(html,
    `Sắp xếp: ${up.map(sp).join(' < ')}. Sân ${lonNhat} có sức chứa lớn nhất và là sân duy nhất `
    + `có sức chứa trên 40 000 người; sân ${nhoNhat} có sức chứa nhỏ nhất.`);
},

/* ===== tr.63 – Bài 3 (luyện tập): công-tơ-mét của ba xe máy ===== */
() => {
  const q = Q(3, 'Công-tơ-mét của một xe máy xác định số ki-lô-mét xe máy đó đã đi được. '
    + 'Dưới đây là công-tơ-mét của ba xe máy:');
  const sp = ART.b60sp;
  const vals = [];
  for (let g = 0; g < 300 && vals.length < 3; g++){
    const v = pick([0, 1]) ? R(1, 9) * 10000 : R(10000, 99999);
    if (!vals.includes(v)) vals.push(v);
  }
  while (vals.length < 3){
    let v = 41000;
    for (let t = 0; t < 60 && vals.includes(v); t++) v += 111;
    vals.push(v);
  }
  const NM = ['A', 'B', 'C'], COL = ['#2f6fb5', '#d63a63', '#3f9e46'];
  const up = vals.slice().sort((x, y) => x - y);
  const nhieu = NM[vals.indexOf(up[2])], it = NM[vals.indexOf(up[0])];
  const html = '<div class="b60-gauges">'
    + vals.map((v, i) => ART.b60Gauge(v, NM[i], COL[i])).join('') + '</div>'
    + `<div class="b60-sub">Xe máy nào đã đi được số ki-lô-mét nhiều nhất?
        Xe máy nào đã đi được số ki-lô-mét ít nhất?</div>
       <div class="fill-line">Đi được nhiều ki-lô-mét nhất: xe ${q.pick(nhieu, NM)}</div>
       <div class="fill-line">Đi được ít ki-lô-mét nhất: xe ${q.pick(it, NM)}</div>`;
  return q.done(html,
    `${up.map(sp).join(' < ')} nên xe ${nhieu} đi được nhiều ki-lô-mét nhất, `
    + `xe ${it} đi được ít ki-lô-mét nhất.`);
},

/* ===== tr.63 – Bài 4 (luyện tập): Tìm chữ số thích hợp ===== */
() => {
  const q = Q(4, 'Tìm chữ số thích hợp.');
  /* mỗi câu chỉ có duy nhất một chữ số thoả mãn */
  const mk = kind => {
    const d = [R(1, 9), R(0, 9), R(0, 9), R(0, 9), R(0, 9)];
    const p = R(1, 4);                       // vị trí ô "?" (không đặt ở hàng chục nghìn)
    const box = kind === 'gt1' || kind === 'lt2' ? 9 : 0;
    const other = box === 9 ? 8 : 1;
    const left = d.slice(), right = d.slice();
    if (kind === 'gt1' || kind === 'lt1'){    // ô "?" ở số bên trái
      left[p] = null; right[p] = other;
    } else {                                  // ô "?" ở số bên phải
      left[p] = other; right[p] = null;
    }
    const sign = kind === 'gt1' || kind === 'gt2' ? '>' : '<';
    return {left, right, p, box, sign};
  };
  const kinds = ['gt1', 'lt1', 'gt2', 'lt2'].sort(() => Math.random() - .5).slice(0, 2);
  const its = kinds.map(mk);
  const show = (arr, p, box) => arr.map((v, i) =>
    (i === 2 ? ' ' : '') + (v === null ? q.num(box, 1) : v)).join('');
  const L = ['a)', 'b)'];
  const html = '<div class="b60-cols">' + its.map((it, i) =>
    `<div class="b60-line"><span class="b60-let">${L[i]}</span>
      <span class="b60-dig">${show(it.left, it.p, it.box)}</span>
      <span class="op">${it.sign === '>' ? '&gt;' : '&lt;'}</span>
      <span class="b60-dig">${show(it.right, it.p, it.box)}</span></div>`).join('') + '</div>';
  return q.done(html, its.map((it, i) => {
    const lo = it.left.map((v, k) => v === null ? it.box : v).join('');
    const ro = it.right.map((v, k) => v === null ? it.box : v).join('');
    return `${L[i]} ${ART.b60sp(+lo)} ${it.sign} ${ART.b60sp(+ro)}`;
  }).join(';  '));
},
];
