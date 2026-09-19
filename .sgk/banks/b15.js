/* ==================== BÀI 15: LUYỆN TẬP CHUNG (SGK trang 46, 47, 48) ====================
   · Luyện tập tr.46: bài 1, 2, 3, 4, 5
   · Luyện tập tr.47: bài 1, 2, 3 (a và b)
   (tr.48 là trò chơi "Cầu thang – Cầu trượt", không có bài tập đánh số)
======================================================================================= */

ART.b15Arrow = inner => `<span class="b15-ar"><i>${inner}</i><svg viewBox="0 0 126 20">
  <path d="M2 10h108" stroke="#4a4460" stroke-width="2.6"/><path d="M108 4l16 6-16 6z" fill="#4a4460"/></svg></span>`;

ART.b15Rhino = t => `<svg viewBox="-4 0 164 108">
  <rect x="2" y="6" width="96" height="34" rx="4" fill="#fdf1a8" stroke="#c9b23a" stroke-width="2"/>
  <text x="50" y="30" text-anchor="middle" font-size="19" font-weight="800" fill="#2b2b2b">${t}</text>
  <path d="M104 52q0-16 16-16t18 14q10 2 10 14v26q0 6-6 6h-6l-2-14h-16l-2 14h-8q-6 0-6-6z"
    fill="#b7bdd6" stroke="#6d739a" stroke-width="2.2"/>
  <path d="M104 46l-8-6 10-2z" fill="#e6e9f5" stroke="#6d739a" stroke-width="2"/>
  <path d="M118 34q4-8 8 0z" fill="#e6e9f5" stroke="#6d739a" stroke-width="2"/>
  <circle cx="114" cy="50" r="2.6" fill="#3b3b52"/>
  <path d="M148 66q8 6 2 16" fill="none" stroke="#6d739a" stroke-width="2.4"/></svg>`;

ART.b15Tri = () => `<svg viewBox="0 0 230 190">
  <g stroke="#2b2b2b" stroke-width="2.4" fill="none">
    <path d="M115 23L59 85M59 85L20 160M115 23L171 85M171 85L210 160M20 160H210"/></g></svg>`;

ART.b15Cross = s0 => {
  const s = 36, o = 6;
  const cells = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
  const g = cells.map(([c, r], i) => `<rect x="${o + c * s}" y="${o + r * s}" width="${s}" height="${s}"
    fill="${i === s0 ? '#f5b820' : '#fff'}" stroke="#222" stroke-width="2.6"/>`).join('');
  return `<svg viewBox="0 0 ${3 * s + 12} ${3 * s + 12}" class="b15-shape">${g}</svg>`;
};

ART.b15Poly = (k, s0) => {
  const cx = 62, cy = 62, R = 56;
  const P = i => { const a = (-90 + i * 360 / k) * Math.PI / 180;
    return `${(cx + R * Math.cos(a)).toFixed(1)} ${(cy + R * Math.sin(a)).toFixed(1)}`; };
  let g = '';
  for (let i = 0; i < k; i++)
    g += `<path d="M${cx} ${cy}L${P(i)}L${P(i + 1)}Z" fill="${i === s0 ? '#f5b820' : '#fff'}"
      stroke="#222" stroke-width="2.4"/>`;
  return `<svg viewBox="0 0 124 124" class="b15-shape">${g}</svg>`;
};

ART.b15Star = s0 => {
  const cx = 62, cy = 62;
  const P = i => { const a = (-90 + i * 36) * Math.PI / 180, r = i % 2 ? 24 : 56;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; };
  const outline = 'M' + Array.from({length:10}, (_, i) => P(i)).join('L') + 'Z';
  const spokes = [1, 3, 5, 7, 9].map(i => `M${cx} ${cy}L${P(i)}`).join('');
  const j = 2 * s0;
  return `<svg viewBox="0 0 124 124" class="b15-shape">
    <path d="M${cx} ${cy}L${P((j + 9) % 10)}L${P(j)}L${P(j + 1)}Z" fill="#f5b820"/>
    <path d="${outline}" fill="none" stroke="#222" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="${spokes}" stroke="#222" stroke-width="2.2"/></svg>`;
};

ART.b15Frogs = (rows, cols) => {
  const C = 52, W = cols * C + 16, H = rows * C + 16;
  let g = '';
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++)
    g += `<g transform="translate(${8 + j * C},${8 + i * C})">
      <ellipse cx="24" cy="42" rx="20" ry="6" fill="#4f9e3a"/>
      <ellipse cx="24" cy="30" rx="16" ry="12" fill="#7dc95c" stroke="#3f7a2c" stroke-width="1.6"/>
      <circle cx="17" cy="18" r="6" fill="#7dc95c" stroke="#3f7a2c" stroke-width="1.6"/>
      <circle cx="31" cy="18" r="6" fill="#7dc95c" stroke="#3f7a2c" stroke-width="1.6"/>
      <circle cx="17" cy="18" r="2.4" fill="#1e1e1e"/><circle cx="31" cy="18" r="2.4" fill="#1e1e1e"/>
      <path d="M18 33q6 4 12 0" fill="none" stroke="#3f7a2c" stroke-width="1.6" stroke-linecap="round"/>
      <ellipse cx="24" cy="33" rx="6" ry="4" fill="#f2f7e6"/></g>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="b15-frog">
    <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="12" fill="#fdf6c8"/>${g}</svg>`;
};

BANKS.b15 = [

/* ===== Luyện tập tr.46 – Bài 1: Tính nhẩm ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const mk = () => ({a:R(2, 9), b:R(2, 9)});
  const A = [mk(), mk(), mk(), {a:R(2, 9), b:10}];
  const Bp = [mk(), mk(), mk(), mk()];
  const grid = list => '<div class="calc-grid">' + list.map(x =>
    `<div class="calc-cell">${x.a} × ${x.b} = ${q.num(x.a * x.b)}</div>`).join('') + '</div>';
  return q.done(`<div class="sub-lbl">a)</div>${grid(A)}<div class="sub-lbl">b)</div>${grid(Bp)}`);
},

/* ===== Luyện tập tr.46 – Bài 2: Những phép tính nào có kết quả bé hơn ...? ===== */
() => {
  const T = pick([6, 7, 8]);
  const q = Q(2, `Những phép tính nào dưới đây có kết quả bé hơn ${T}?`);
  const small = [2, 3, 4, 5, 6, 7].filter(x => x < T).sort(() => Math.random() - .5);
  const big = [6, 7, 8, 9, 10].filter(x => x >= T).sort(() => Math.random() - .5);
  const nS = R(2, 3), nB = 5 - nS;
  const qs = small.slice(0, nS).concat(big.slice(0, nB));
  const items = qs.map(v => { const d = R(2, 9); return {t:`${v * d} : ${d}`, v}; })
    .sort(() => Math.random() - .5);
  const ok = items.filter(x => x.v < T).map(x => x.t).sort().join(',');
  const html = '<div class="b15-rhi">' + items.map(x => `<span>${ART.b15Rhino(x.t)}</span>`).join('') + '</div>'
    + `<div class="fill-line">Chọn tất cả phép tính có kết quả bé hơn ${T}:
        <span class="wpick">${q.pick(ok, items.map(x => x.t))}</span></div>`;
  return q.done(html, items.map(x => `${x.t} = ${x.v}`).join(' · '));
},

/* ===== Luyện tập tr.46 – Bài 3: Số ? (sơ đồ mũi tên) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const COL = ['#cfe8b8', '#ffe08a', '#ffc4d2', '#a9dcf5'];
  const L = ['a)', 'b)', 'c)', 'd)'];
  const x1 = R(2, 9), k1 = R(2, 9);
  const v2 = R(2, 9), k2 = R(2, 9);
  const x3 = R(2, 9), k3 = R(2, 9);
  const v4 = R(2, 9), k4 = R(2, 9);
  const items = [
    {left:q.num(x1), lab:`× ${k1}`, right:x1 * k1, e:`${x1} × ${k1} = ${x1 * k1}`},
    {left:q.num(v2 * k2), lab:`: ${k2}`, right:v2, e:`${v2 * k2} : ${k2} = ${v2}`},
    {left:x3, lab:`× ${q.num(k3, 1)}`, right:x3 * k3, e:`${x3} × ${k3} = ${x3 * k3}`},
    {left:v4 * k4, lab:`: ${q.num(k4, 1)}`, right:v4, e:`${v4 * k4} : ${k4} = ${v4}`}
  ];
  const html = items.map((it, i) =>
    `<div class="b15-fl"><span class="lb">${L[i]}</span>
      <span class="fnode sq" style="background:#fff">${it.left}</span>
      ${ART.b15Arrow(it.lab)}
      <span class="fnode circle" style="background:${COL[i]}">${it.right}</span></div>`).join('');
  return q.done(html, items.map((it, i) => `${L[i]} ${it.e}`).join(';  '));
},

/* ===== Luyện tập tr.46 – Bài 4: bài toán xếp li ===== */
() => {
  const q = Q(4, '');
  const ban = R(3, 8), li = R(4, 9);
  return q.done(`<p class="wordq">Khi chuẩn bị buổi chúc mừng sinh nhật cho Nam, Việt xếp li vào ${ban} bàn.
      Mỗi bàn Việt xếp ${li} cái li. Hỏi Việt xếp tất cả bao nhiêu cái li?</p>
    <div class="fill-line">Việt xếp tất cả ${q.num(ban * li)} cái li.</div>`,
    `${li} × ${ban} = ${li * ban} (cái li)`);
},

/* ===== Luyện tập tr.46 – Bài 5: Số ? (ba hình tam giác) ===== */
() => {
  const q = Q(5, '<span class="tag">Số</span> ?');
  const mk = () => { const t = R(2, 9), a = R(2, 9), b = R(2, 9); return {t, a, b}; };
  const T = [mk(), mk(), mk()];
  const HIDE = [[], ['r'], ['l', 'r', 'b']];        // tam giác 1 là mẫu, đã điền sẵn
  const one = (o, hide) => {
    const l = o.t * o.a, r = o.t * o.b, b = o.a * o.b;
    return `<div class="b15-tri">${ART.b15Tri()}
      <span class="nd cir" style="left:95px;top:0">${o.t}</span>
      <span class="nd sq${hide.includes('l') ? ' q' : ''}" style="left:26px;top:62px">${hide.includes('l') ? q.num(l, 2) : l}</span>
      <span class="nd sq${hide.includes('r') ? ' q' : ''}" style="left:138px;top:62px">${hide.includes('r') ? q.num(r, 2) : r}</span>
      <span class="nd cir" style="left:0;top:140px">${o.a}</span>
      <span class="nd sq${hide.includes('b') ? ' q' : ''}" style="left:82px;top:138px">${hide.includes('b') ? q.num(b, 2) : b}</span>
      <span class="nd cir" style="left:190px;top:140px">${o.b}</span></div>`;
  };
  const html = '<div class="b15-tri-row">' + T.map((o, i) => one(o, HIDE[i])).join('') + '</div>'
    + '<div class="hint-line">Mỗi ô vuông là tích của hai số ở hai hình tròn nối với nó.</div>';
  return q.done(html,
    `Ô vuông = tích hai hình tròn kề nó, ví dụ ${T[0].t} × ${T[0].a} = ${T[0].t * T[0].a}.`);
},

/* ===== Luyện tập tr.47 – Bài 1: Tính nhẩm (nhân, chia trong cùng một bảng) ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const mk = () => { const a = R(2, 9), b = R(2, 9); return {a, b, p:a * b}; };
  const cols = [mk(), mk(), mk()];
  const html = '<div class="b15-card">' + cols.map(c => `<div class="b15-col">
      <div>${c.a} × ${c.b} = ${q.num(c.p)}</div>
      <div>${c.b} × ${c.a} = ${q.num(c.p)}</div>
      <div>${c.p} : ${c.a} = ${q.num(c.b, 1)}</div>
      <div>${c.p} : ${c.b} = ${q.num(c.a, 1)}</div>
    </div>`).join('') + '</div>';
  return q.done(html);
},

/* ===== Luyện tập tr.47 – Bài 2: bài toán cắm hoa vào lọ ===== */
() => {
  const q = Q(2, '');
  const per = R(4, 9), lo = R(3, 9), all = per * lo;
  return q.done(`<p class="wordq">Mẹ của Mai mua về ${all} bông hoa. Mẹ bảo Mai mang hoa cắm hết vào các lọ,
      mỗi lọ có ${per} bông. Hỏi Mai cắm được bao nhiêu lọ hoa như thế?</p>
    <div class="fill-line">Mai cắm được ${q.num(lo)} lọ hoa như thế.</div>`,
    `${all} : ${per} = ${lo} (lọ)`);
},

/* ===== Luyện tập tr.47 – Bài 3a: Đã tô màu một phần mấy những hình nào? ===== */
() => {
  const DOC = {5:'năm', 6:'sáu', 8:'tám', 9:'chín', 10:'mười'};
  const k = pick([6, 8, 9, 10]);
  const d = pick([5, k]);
  const q = Q(3, `a) Đã tô màu <span class="frc"><b>1</b><u>${d}</u></span> những hình nào?`);
  const L = ['A', 'B', 'C'];
  const shapes = [{n:5, svg:ART.b15Cross(R(0, 4))}, {n:k, svg:ART.b15Poly(k, R(0, k - 1))},
    {n:5, svg:ART.b15Star(R(0, 4))}].sort(() => Math.random() - .5);
  const ok = shapes.map((s, i) => s.n === d ? L[i] : '').filter(Boolean).sort().join(',');
  const html = '<div class="b15-sh-row">' + shapes.map((s, i) =>
    `<span>${s.svg}<em>${L[i]}</em></span>`).join('') + '</div>'
    + `<div class="fill-line">Chọn tất cả hình đã tô màu một phần ${DOC[d]}:
        <span class="wpick">${q.pick(ok, L)}</span></div>`;
  return q.done(html, shapes.map((s, i) => `${L[i]}: ${s.n} phần bằng nhau`).join(' · '));
},

/* ===== Luyện tập tr.47 – Bài 3b: Số ? (một phần mấy số con ếch) ===== */
() => {
  const q = Q(3, 'b) <span class="tag">Số</span> ?');
  const LAY = [[3, 6], [3, 8], [4, 5], [3, 4], [2, 6], [4, 6]];
  const lay = pick(LAY), N = lay[0] * lay[1];
  const divs = [];
  for (let d = 2; d <= N; d++) if (N % d === 0 && N / d >= 2 && N / d <= 9) divs.push(d);
  const sh = [...divs].sort(() => Math.random() - .5);
  const d1 = sh[0], d2 = sh.find(x => x !== d1);
  return q.done(ART.b15Frogs(lay[0], lay[1]) +
    `<div class="fill-line"><span class="frc"><b>1</b><u>${d1}</u></span> số con ếch là ${q.num(N / d1, 2)} con ếch.</div>
     <div class="fill-line"><span class="frc"><b>1</b><u>${d2}</u></span> số con ếch là ${q.num(N / d2, 2)} con ếch.</div>`,
    `Có tất cả ${N} con ếch: ${N} : ${d1} = ${N / d1};  ${N} : ${d2} = ${N / d2}`);
},
];
