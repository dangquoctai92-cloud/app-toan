/* ==================== BÀI 14: MỘT PHẦN MẤY (SGK trang 42, 43, 44, 45) ====================
   · Hoạt động tr.43 : bài 1 (Đ, S ? – hình chữ nhật), bài 2 (chọn cách đọc), bài 3 (khoanh hạt dẻ)
   · Luyện tập  tr.44: bài 1 (Đ, S ? – hình tròn), bài 2 (đã tô màu một phần mấy hình nào)
   · Luyện tập  tr.45: bài 3 (khoanh cải bắp, xà lách), bài 4 (Số ? – một phần mấy của một nhóm)
========================================================================================== */

ART.b14Frac = (a, b) => `<span class="frc"><b>${a}</b><u>${b}</u></span>`;

ART.b14Doc = n => ({2:'hai', 3:'ba', 4:'tư', 5:'năm', 6:'sáu', 7:'bảy', 8:'tám', 9:'chín', 10:'mười'})[n] || n;

ART.b14Sec = (cx, cy, r, a0, a1) => {
  const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
  const s = p(a0), e = p(a1);
  return `M${cx} ${cy}L${s[0].toFixed(2)} ${s[1].toFixed(2)}`
    + `A${r} ${r} 0 ${(a1 - a0) > 180 ? 1 : 0} 1 ${e[0].toFixed(2)} ${e[1].toFixed(2)}Z`;
};

/* hình chữ nhật chia n phần bằng nhau, tô màu phần thứ k */
ART.b14Rect = (n, k) => {
  const W = 156, H = 82, w = W / n;
  let g = '';
  for (let i = 0; i < n; i++)
    g += `<rect x="${(2 + i * w).toFixed(2)}" y="2" width="${w.toFixed(2)}" height="${H}"
      fill="${i === k ? '#29a8e0' : '#fff'}" stroke="#222" stroke-width="2.4"/>`;
  return `<svg viewBox="0 0 ${W + 4} ${H + 4}" class="b14-rect">${g}</svg>`;
};

/* hình tròn chia n phần bằng nhau, tô màu 1 phần */
ART.b14Circle = n => {
  const st = 360 / n;
  let g = '';
  for (let i = 0; i < n; i++)
    g += `<path d="${ART.b14Sec(60, 60, 54, -90 + i * st, -90 + (i + 1) * st)}"
      fill="${i === 0 ? '#29a8e0' : '#fff'}" stroke="#222" stroke-width="2.2"/>`;
  return `<svg viewBox="0 0 120 120" class="b14-circ">${g}
    <circle cx="60" cy="60" r="54" fill="none" stroke="#222" stroke-width="2.6"/></svg>`;
};

/* cái bánh chia n phần bằng nhau, ghi 1/n vào một phần */
ART.b14Pizza = n => {
  const st = 360 / n;
  let g = '';
  for (let i = 0; i < n; i++)
    g += `<path d="${ART.b14Sec(62, 62, 50, -90 + i * st, -90 + (i + 1) * st)}"
      fill="#f6e5b4" stroke="#3b2b12" stroke-width="1.8"/>`;
  const a = (-90 + st / 2) * Math.PI / 180;
  const tx = (62 + 30 * Math.cos(a)).toFixed(1), ty = (62 + 30 * Math.sin(a)).toFixed(1);
  return `<svg viewBox="0 0 124 124" class="b14-pizza">
    <circle cx="62" cy="62" r="58" fill="#e8a33d" stroke="#a9691a" stroke-width="2.4"/>${g}
    <text x="${tx}" y="${(+ty - 3)}" text-anchor="middle" font-size="15" font-weight="800" fill="#2b2b2b">1</text>
    <path d="M${(+tx - 8)} ${ty}h16" stroke="#2b2b2b" stroke-width="2"/>
    <text x="${tx}" y="${(+ty + 15)}" text-anchor="middle" font-size="15" font-weight="800" fill="#2b2b2b">${n}</text>
  </svg>`;
};

/* hình vuông có hình thoi trong: 8 phần bằng nhau, tô 1 phần */
ART.b14Dia8 = () => `<svg viewBox="0 0 120 120" class="b14-shape">
  <rect x="6" y="6" width="108" height="108" fill="#fff" stroke="#222" stroke-width="3"/>
  <path d="M60 6L6 60L60 114L114 60z" fill="none" stroke="#222" stroke-width="3"/>
  <path d="M6 60h108M60 6v108" stroke="#222" stroke-width="3"/>
  <path d="M60 6L6 60h54z" fill="#f5b820" stroke="#222" stroke-width="3"/></svg>`;

/* lưới r × c ô bằng nhau, tô 1 ô */
ART.b14Grid = (r, c) => {
  const s = 108 / Math.max(r, c), W = c * s + 12, H = r * s + 12;
  const hr = Math.floor(r / 2), hc = Math.floor(c / 2);
  let g = '';
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++)
    g += `<rect x="${(6 + j * s).toFixed(2)}" y="${(6 + i * s).toFixed(2)}" width="${s.toFixed(2)}" height="${s.toFixed(2)}"
      fill="${i === hr && j === hc ? '#f5b820' : '#fff'}" stroke="#222" stroke-width="2.6"/>`;
  return `<svg viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" class="b14-shape">${g}</svg>`;
};

/* hình vuông chia k dải dọc bằng nhau, tô 1 dải */
ART.b14Strip = k => {
  const W = 108, w = W / k;
  let g = '';
  for (let i = 0; i < k; i++)
    g += `<rect x="${(6 + i * w).toFixed(2)}" y="6" width="${w.toFixed(2)}" height="${W}"
      fill="${i === 0 ? '#f5b820' : '#fff'}" stroke="#222" stroke-width="2.6"/>`;
  return `<svg viewBox="0 0 ${W + 12} ${W + 12}" class="b14-shape">${g}</svg>`;
};

ART.b14Thing = k => {
  if (k === 'nut') return `<g><path d="M9 17q11-7 22 0 1 5-11 5T9 17z" fill="#c39a63" stroke="#5e3a17" stroke-width="1.5"/>
    <path d="M20 8v5" stroke="#5e3a17" stroke-width="2" stroke-linecap="round"/>
    <path d="M10 20q10 15 20 0 0 14-10 14T10 20z" fill="#8a5a2b" stroke="#5e3a17" stroke-width="1.5"/></g>`;
  if (k === 'cab') return `<g><path d="M5 25q-3 8 6 8 5 0 8-5zM35 25q3 8-6 8-5 0-8-5z" fill="#7cc45f" stroke="#3f7a2c" stroke-width="1.4"/>
    <circle cx="20" cy="21" r="12" fill="#9ad36f" stroke="#3f7a2c" stroke-width="1.6"/>
    <path d="M20 9v24M9 15q11 7 22 0M9 27q11-7 22 0" fill="none" stroke="#3f7a2c" stroke-width="1.3"/></g>`;
  if (k === 'let') return `<g><path d="M20 34q-9 0-11-5 5-2 7-6-5-2-5-7 5 0 9 5 0-7 4-10 4 3 4 10 4-5 9-5 0 5-5 7 2 4 7 6-2 5-11 5z"
    fill="#9ad36f" stroke="#3f7a2c" stroke-width="1.4"/><path d="M20 34V16" stroke="#3f7a2c" stroke-width="1.3"/></g>`;
  if (k === 'app') return `<g><path d="M20 12q6-6 12 0 4 8-2 16-4 6-10 6t-10-6q-6-8-2-16 6-6 12 0z" fill="#e8402c" stroke="#a3281e" stroke-width="1.5"/>
    <path d="M20 12V7" stroke="#5a3d12" stroke-width="2" stroke-linecap="round"/>
    <path d="M21 8q6-5 9-1-3 5-9 1z" fill="#5cb84a" stroke="#3d8a30" stroke-width="1.2"/></g>`;
  return `<g><circle cx="20" cy="23" r="12" fill="#f5b820" stroke="#c1811a" stroke-width="1.5"/>
    <path d="M20 11V7" stroke="#5a3d12" stroke-width="2" stroke-linecap="round"/>
    <path d="M21 8q6-5 9-1-3 5-9 1z" fill="#5cb84a" stroke="#3d8a30" stroke-width="1.2"/></g>`;
};

/* nhóm rows × cols đồ vật, khoanh p cột (mode 'col') hoặc p hàng (mode 'row') */
ART.b14Group = (rows, cols, mode, p, kind) => {
  const C = 44, W = cols * C + 14, H = rows * C + 14;
  let g = '';
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++)
    g += `<g transform="translate(${7 + j * C + 2},${7 + i * C + 2})">${ART.b14Thing(kind)}</g>`;
  const rw = mode === 'col' ? p * C : cols * C;
  const rh = mode === 'col' ? rows * C : p * C;
  return `<svg viewBox="0 0 ${W} ${H}" class="b14-grp">
    <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="10" fill="#fff" stroke="#2b2b2b" stroke-width="2.6"/>
    ${g}<rect x="${7 - 2}" y="${7 - 2}" width="${rw + 4}" height="${rh + 4}" rx="${Math.min(rw, rh) / 2 + 2}"
      fill="none" stroke="#e03b3b" stroke-width="3"/></svg>`;
};

/* n đồ vật chia thành groups phần bằng nhau (mỗi phần per đồ vật) */
ART.b14Split = (groups, per, kind, col) => {
  const C = 40, bw = per * C + 16, W = groups * (bw + 12) + 12, H = C + 28;
  let g = '';
  for (let b = 0; b < groups; b++){
    const x0 = 12 + b * (bw + 12);
    g += `<rect x="${x0}" y="12" width="${bw}" height="${C + 8}" rx="${(C + 8) / 2}" fill="#d9eefb" stroke="#7fb3d5" stroke-width="2"/>`;
    for (let i = 0; i < per; i++)
      g += `<g transform="translate(${x0 + 8 + i * C},${16})">${ART.b14Thing(kind)}</g>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="b14-split">
    <rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="10" fill="#fff" stroke="${col}" stroke-width="3"/>${g}</svg>`;
};

BANKS.b14 = [

/* ===== Hoạt động tr.43 – Bài 1: Đ, S ? (hình chữ nhật) ===== */
() => {
  const q = Q(1, '<span class="tag">Đ, S</span> ?');
  const L = ['a)', 'b)', 'c)', 'd)'];
  const okList = [true, true, false, true].sort(() => Math.random() - .5);
  const ns = [];
  const pool = [2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - .5);
  for (let i = 0; i < 4; i++) ns.push(pool[i]);
  const rows = ns.map((n, i) => {
    const m = okList[i] ? n : pick([2, 3, 4, 5, 6, 7, 8].filter(x => x !== n));
    return {n, m, a:m === n ? 'Đ' : 'S'};
  });
  const html = '<div class="b14-row">' + rows.map((r, i) =>
    `<div class="b14-item"><div class="lb">${L[i]}</div>${ART.b14Rect(r.n, R(0, r.n - 1))}
      <div class="cap">Đã tô màu ${ART.b14Frac(1, r.m)} hình chữ nhật.
        <span class="wpick">${q.pick(r.a, ['Đ', 'S'])}</span></div></div>`).join('') + '</div>';
  return q.done(html,
    rows.map((r, i) => `${L[i]} chia ${r.n} phần bằng nhau, tô 1 phần nên đã tô màu 1/${r.n} → ${r.a}`).join('; '));
},

/* ===== Hoạt động tr.43 – Bài 2: Chọn cách đọc phù hợp với cách viết ===== */
() => {
  const q = Q(2, 'Chọn cách đọc phù hợp với cách viết một phần mấy ở mỗi hình.');
  const L = ['A', 'B', 'C', 'D'];
  const dens = [2, 3, 4, 5, 6, 8].sort(() => Math.random() - .5).slice(0, 4);
  const cakes = '<div class="b14-row">' + dens.map((n, i) =>
    `<div class="b14-item">${ART.b14Pizza(n)}<div class="lb">${L[i]}</div></div>`).join('') + '</div>';
  const says = dens.map((n, i) => ({n, letter:L[i]})).sort(() => Math.random() - .5);
  const lines = says.map(s =>
    `<div class="fill-line"><span class="b14-say">Một phần ${ART.b14Doc(s.n)}.</span>
      là hình <span class="wpick">${q.pick(s.letter, L)}</span></div>`).join('');
  return q.done(cakes + lines,
    dens.map((n, i) => `${L[i]}: 1/${n} đọc là một phần ${ART.b14Doc(n)}`).join(' · '));
},

/* ===== Hoạt động tr.43 – Bài 3: Đã khoanh vào một phần mấy số hạt dẻ? ===== */
() => {
  const LAY = [{rows:2, cols:4, ds:[2, 4]}, {rows:2, cols:6, ds:[2, 3, 6]},
    {rows:3, cols:4, ds:[2, 3, 4]}, {rows:2, cols:5, ds:[2, 5]}, {rows:3, cols:5, ds:[3, 5]}];
  const lay = pick(LAY);
  const ds = [...lay.ds].sort(() => Math.random() - .5);
  const dOk = ds[0], dNo = ds[1];
  const q = Q(3, `Đã khoanh vào ${ART.b14Frac(1, dOk)} số hạt dẻ của hình nào?`);
  const shape = d => { const k = lay.rows * lay.cols / d;
    return k % lay.rows === 0 ? {mode:'col', p:k / lay.rows} : {mode:'row', p:k / lay.cols}; };
  const sOk = shape(dOk), sNo = shape(dNo);
  const okFirst = Math.random() < .5;
  const figs = okFirst ? [{s:sOk, d:dOk}, {s:sNo, d:dNo}] : [{s:sNo, d:dNo}, {s:sOk, d:dOk}];
  const L = ['A', 'B'];
  const html = '<div class="b14-row">' + figs.map((f, i) =>
    `<div class="b14-item" style="width:246px">${ART.b14Group(lay.rows, lay.cols, f.s.mode, f.s.p, 'nut')}
      <div class="lb">${L[i]}</div></div>`).join('') + '</div>'
    + `<div class="fill-line">Đã khoanh vào ${ART.b14Frac(1, dOk)} số hạt dẻ của hình
        <span class="wpick">${q.pick(okFirst ? 'A' : 'B', L)}</span></div>`;
  return q.done(html,
    `Cả hai hình đều có ${lay.rows * lay.cols} hạt dẻ; hình đúng khoanh ${lay.rows * lay.cols / dOk} hạt dẻ.`);
},

/* ===== Luyện tập tr.44 – Bài 1: Đ, S ? (hình tròn) ===== */
() => {
  const q = Q(1, '<span class="tag">Đ, S</span> ?');
  const L = ['a)', 'b)', 'c)', 'd)'];
  const okList = [true, true, false, true].sort(() => Math.random() - .5);
  const pool = [3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5);
  const rows = pool.slice(0, 4).map((n, i) => {
    const m = okList[i] ? n : pick([3, 4, 5, 6, 7, 8, 9].filter(x => x !== n));
    return {n, m, a:m === n ? 'Đ' : 'S'};
  });
  const html = '<div class="b14-row">' + rows.map((r, i) =>
    `<div class="b14-item"><div class="lb">${L[i]}</div>${ART.b14Circle(r.n)}
      <div class="cap">Đã tô màu ${ART.b14Frac(1, r.m)} hình tròn.
        <span class="wpick">${q.pick(r.a, ['Đ', 'S'])}</span></div></div>`).join('') + '</div>';
  return q.done(html,
    rows.map((r, i) => `${L[i]} hình tròn chia ${r.n} phần bằng nhau, tô 1 phần → ${r.a}`).join('; '));
},

/* ===== Luyện tập tr.44 – Bài 2: Đã tô màu một phần mấy hình nào? ===== */
() => {
  const k = pick([5, 6, 7, 9, 10]);
  const gc = [[2, 3], [3, 3], [3, 4], [2, 5], [4, 3], [2, 6], [3, 5]]
    .filter(g => g[0] * g[1] !== k).sort(() => Math.random() - .5);
  const g1 = gc[0];
  const g2 = gc.find(g => g[0] * g[1] !== g1[0] * g1[1]);
  const shapes = [
    {n:8, svg:ART.b14Dia8()},
    {n:k, svg:ART.b14Strip(k)},
    {n:g1[0] * g1[1], svg:ART.b14Grid(g1[0], g1[1])},
    {n:g2[0] * g2[1], svg:ART.b14Grid(g2[0], g2[1])}
  ].sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D'];
  const T = shapes[R(0, 3)].n;
  const ok = L[shapes.findIndex(s => s.n === T)];
  const q = Q(2, `Đã tô màu ${ART.b14Frac(1, T)} hình nào?`);
  const html = '<div class="b14-row">' + shapes.map((s, i) =>
    `<div class="b14-item" style="width:134px">${s.svg}<div class="lb">${L[i]}</div></div>`).join('') + '</div>'
    + `<div class="fill-line">Đã tô màu ${ART.b14Frac(1, T)} hình
        <span class="wpick">${q.pick(ok, L)}</span></div>`;
  return q.done(html, shapes.map((s, i) => `${L[i]}: ${s.n} phần bằng nhau`).join(' · '));
},

/* ===== Luyện tập tr.45 – Bài 3: khoanh cải bắp, xà lách ===== */
() => {
  const LAY = [{rows:2, cols:3, ds:[2, 3]}, {rows:2, cols:4, ds:[2, 4]},
    {rows:3, cols:4, ds:[2, 3, 4]}, {rows:3, cols:5, ds:[3, 5]}, {rows:2, cols:5, ds:[2, 5]}];
  const shape = (lay, d) => { const n = lay.rows * lay.cols / d;
    return n % lay.rows === 0 ? {mode:'col', p:n / lay.rows} : {mode:'row', p:n / lay.cols}; };
  const l1 = pick(LAY), d1 = [...l1.ds].sort(() => Math.random() - .5);
  const l2 = pick(LAY), d2 = [...l2.ds].sort(() => Math.random() - .5);
  const q = Q(3, `Đã khoanh vào ${ART.b14Frac(1, d1[0])} số cây cải bắp của hình nào?
    Đã khoanh vào ${ART.b14Frac(1, d2[0])} số cây xà lách của hình nào?`);
  const okAB = Math.random() < .5 ? 0 : 1, okCD = Math.random() < .5 ? 0 : 1;
  const ab = [d1[okAB === 0 ? 0 : 1], d1[okAB === 0 ? 1 : 0]];
  const cd = [d2[okCD === 0 ? 0 : 1], d2[okCD === 0 ? 1 : 0]];
  const L = ['A', 'B', 'C', 'D'];
  const cell = (lay, d, kind, i) => { const s = shape(lay, d);
    return `<div class="b14-item" style="width:246px">${ART.b14Group(lay.rows, lay.cols, s.mode, s.p, kind)}
      <div class="lb">${L[i]}</div></div>`; };
  const html = '<div class="b14-row">' + cell(l1, ab[0], 'cab', 0) + cell(l1, ab[1], 'cab', 1) + '</div>'
    + '<div class="b14-row">' + cell(l2, cd[0], 'let', 2) + cell(l2, cd[1], 'let', 3) + '</div>'
    + `<div class="fill-line">Đã khoanh vào ${ART.b14Frac(1, d1[0])} số cây cải bắp của hình
        <span class="wpick">${q.pick(L[okAB], ['A', 'B'])}</span></div>
       <div class="fill-line">Đã khoanh vào ${ART.b14Frac(1, d2[0])} số cây xà lách của hình
        <span class="wpick">${q.pick(L[2 + okCD], ['C', 'D'])}</span></div>`;
  return q.done(html,
    `Vườn cải bắp có ${l1.rows * l1.cols} cây, khoanh ${l1.rows * l1.cols / d1[0]} cây.
     Vườn xà lách có ${l2.rows * l2.cols} cây, khoanh ${l2.rows * l2.cols / d2[0]} cây.`);
},

/* ===== Luyện tập tr.45 – Bài 4: Số ? (một phần mấy của một nhóm) ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const dM = pick([2, 3]), perM = R(2, 4), nM = dM * perM;
  const dC = pick([3, 4, 5].filter(x => x !== dM)), perC = R(2, 4), nC = dC * perC;
  const html = noteBox(`Mẫu:<br>Chia ${nM} quả táo thành ${dM} phần bằng nhau.<br>
      ${ART.b14Frac(1, dM)} số quả táo là <b>${perM}</b> quả táo.`)
    + ART.b14Split(dM, perM, 'app', '#c0392b')
    + `<div class="fill-line">Chia ${nC} quả cam thành ${dC} phần bằng nhau.</div>
       <div class="fill-line">${ART.b14Frac(1, dC)} số quả cam là ${q.num(perC, 2)} quả cam.</div>`
    + ART.b14Split(dC, perC, 'org', '#2f7d32');
  return q.done(html, `${nC} : ${dC} = ${perC} (quả cam)`);
},
];
