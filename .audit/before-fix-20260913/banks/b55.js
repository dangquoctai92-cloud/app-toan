/*CSS
.b55-list{display:flex;flex-wrap:wrap;gap:2px 30px;margin:6px 0}
.b55-list > div{min-width:210px;font-size:19px;font-weight:700;line-height:2}
.b55-let{color:#d63384;font-weight:800;margin-right:6px}
.b55-truck{width:100%;max-width:330px;height:auto;display:block;margin:6px auto}
.b55-river{width:100%;max-width:420px;height:auto;display:block;margin:6px auto}
CSS*/

/* ==================== BÀI 55: PHÉP TRỪ TRONG PHẠM VI 10 000
   (SGK tập 2 – tr.41, 42)
   hoạt động tr.41 : bài 1 (Tính – trừ theo cột dọc), bài 2 (Đặt tính rồi tính),
                     bài 3 (sông dài hơn sông bao nhiêu ki-lô-mét)
   luyện tập tr.41 : bài 1 (Tính nhẩm theo mẫu – các số tròn nghìn)
   luyện tập tr.42 : bài 2 (Tính nhẩm theo mẫu – trừ đi số tròn trăm, số tròn nghìn),
                     bài 3 (Đặt tính rồi tính), bài 4 (xe chở dầu bơm vào hai trạm xăng)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như trong SGK: 5 274 */
ART.b55sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* hai con sông có chiều dài khác nhau */
ART.b55River = (n1, l1, n2, l2) => {
  const W = 380, u = (W - 60) / l1;
  const bar = (y, L, nm, len, col) => `<path d="M10 ${y}q${L * .28} -14 ${L * .5} 0t${L * .5} 0"
      fill="none" stroke="${col}" stroke-width="11" stroke-linecap="round"/>
    <text x="10" y="${y - 20}" font-size="14" font-weight="700">Sông ${nm}: ${ART.b55sp(len)} km</text>`;
  return `<svg viewBox="0 0 ${W} 120" class="b55-river">
    ${bar(44, l1 * u, n1, l1, '#3aa0d8')}
    ${bar(104, l2 * u, n2, l2, '#63c06a')}
  </svg>`;
};

/* xe bồn chở dầu */
ART.b55Truck = t => `<svg viewBox="0 0 320 132" class="b55-truck">
  <rect x="96" y="34" width="176" height="58" rx="26" fill="#bfe4f5" stroke="#3f7fa5" stroke-width="2.6"/>
  <path d="M140 34v58M188 34v58M236 34v58" stroke="#3f7fa5" stroke-width="2"/>
  <path d="M26 92V56h44l22 24v12z" fill="#f0a13a" stroke="#a4610f" stroke-width="2.6"/>
  <rect x="36" y="60" width="30" height="20" rx="3" fill="#d8f0fb" stroke="#a4610f" stroke-width="2"/>
  <path d="M8 92h296" stroke="#555" stroke-width="4" stroke-linecap="round"/>
  <circle cx="66" cy="102" r="14" fill="#3a3a3a"/><circle cx="66" cy="102" r="5" fill="#c9c9c9"/>
  <circle cx="212" cy="102" r="14" fill="#3a3a3a"/><circle cx="212" cy="102" r="5" fill="#c9c9c9"/>
  <circle cx="252" cy="102" r="14" fill="#3a3a3a"/><circle cx="252" cy="102" r="5" fill="#c9c9c9"/>
  <text x="184" y="70" text-anchor="middle" font-size="17" font-weight="800" fill="#134a68">${ART.b55sp(t)}
    <tspan font-style="italic"> l</tspan></text>
</svg>`;

BANKS.b55 = [

/* ===== tr.41 – Bài 1: Tính (trừ theo cột dọc) ===== */
() => {
  const q = Q(1, 'Tính.');
  const items = [];
  for (let g = 0; g < 60 && items.length < 2; g++){
    const a = R(3000, 9999), b = R(1000, a - 500);
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 2) items.push({a: 5000 + items.length, b: 2345});
  items.push({a: R(2000, 9999), b: R(100, 999)});
  items.push({a: R(2000, 9999), b: R(11, 99)});
  const vc = it => `<div class="vcalc"><span class="vop">&minus;</span>
    <span class="vnums"><b>${ART.b55sp(it.a)}</b><b>${ART.b55sp(it.b)}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a - it.b)}</span></div>`;
  return q.done(`<div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${ART.b55sp(x.a)} − ${ART.b55sp(x.b)} = ${ART.b55sp(x.a - x.b)}`).join(';  '));
},

/* ===== tr.41 – Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const items = [];
  for (let g = 0; g < 60 && items.length < 2; g++){
    const a = R(3000, 9999), b = R(1000, a - 300);
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 2) items.push({a: 4000 + items.length, b: 1876});
  items.push({a: R(2000, 9999), b: R(100, 999)});
  const line = it => `<div class="eq">${ART.b55sp(it.a)} <span class="op">&minus;</span> ${ART.b55sp(it.b)}</div>`;
  const vc = it => `<div class="vcalc"><span class="vop">&minus;</span>
    <span class="vnums"><b>${ART.b55sp(it.a)}</b><b>${ART.b55sp(it.b)}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a - it.b)}</span></div>`;
  return q.done(`<div class="eq-list">${items.map(line).join('')}</div>
      <div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${ART.b55sp(x.a)} − ${ART.b55sp(x.b)} = ${ART.b55sp(x.a - x.b)}`).join(';  '));
},

/* ===== tr.41 – Bài 3: sông này dài hơn sông kia bao nhiêu ki-lô-mét ===== */
() => {
  const q = Q(3, '');
  const LON = [['Nin', 6650], ['A-ma-dôn', 6400], ['Trường Giang', 6300], ['Mê Kông', 4350]];
  const NHO = [['Hồng', 1149], ['Đà', 910], ['Đồng Nai', 586], ['Mã', 512]];
  const A = pick(LON), B = pick(NHO);
  return q.done(`<p class="wordq">Sông ${A[0]} có chiều dài ${ART.b55sp(A[1])} km.
      Sông ${B[0]} dài ${ART.b55sp(B[1])} km.
      Hỏi sông ${A[0]} dài hơn sông ${B[0]} bao nhiêu ki-lô-mét?</p>`
    + ART.b55River(A[0], A[1], B[0], B[1])
    + `<div class="bullet">Sông ${A[0]} dài hơn sông ${B[0]} là ${q.num(A[1] - B[1])} km.</div>`,
    `${ART.b55sp(A[1])} − ${ART.b55sp(B[1])} = ${ART.b55sp(A[1] - B[1])} (km)`);
},

/* ===== tr.41 – Bài 1 (luyện tập): Tính nhẩm với các số tròn nghìn ===== */
() => {
  const q = Q(1, 'Tính nhẩm (theo mẫu).');
  const m1 = R(5, 9), m2 = R(1, m1 - 1);
  const items = [];
  for (let g = 0; g < 90 && items.length < 4; g++){
    const a = R(3, 10), b = R(1, a - 1);
    if (!items.some(x => x.a === a && x.b === b)) items.push({a, b});
  }
  while (items.length < 4) items.push({a: 9, b: items.length + 1});
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = noteBox(`Mẫu: ${m1} 000 &minus; ${m2} 000 = ?<br>
      Nhẩm: ${m1} nghìn &minus; ${m2} nghìn = ${m1 - m2} nghìn<br>
      ${m1} 000 &minus; ${m2} 000 = ${ART.b55sp((m1 - m2) * 1000)}`)
    + '<div class="b55-list">' + items.map((it, i) =>
      `<div><span class="b55-let">${L[i]}</span>${ART.b55sp(it.a * 1000)}
        <span class="op">&minus;</span> ${ART.b55sp(it.b * 1000)}
        <span class="op">=</span> ${q.num((it.a - it.b) * 1000)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.a} nghìn − ${x.b} nghìn = ${x.a - x.b} nghìn`).join(';  '));
},

/* ===== tr.42 – Bài 2 (luyện tập): Tính nhẩm trừ số tròn trăm, số tròn nghìn ===== */
() => {
  const q = Q(2, 'Tính nhẩm (theo mẫu).');
  const ma = R(3, 9), mb = R(3, 9), mc = R(1, mb - 1);
  const na = R(3, 9), nb = R(1, 9), nc = R(1, na - 1);
  const items = [];
  for (let i = 0; i < 2; i++){
    const a = R(2, 9), b = R(2, 9), c = R(1, b - 1);
    items.push({t: 1, a, b, c, v: a * 1000 + b * 100, u: c * 100, r: a * 1000 + (b - c) * 100});
    const p = R(3, 9), Qq = R(1, 9), s = R(1, p - 1);
    items.push({t: 2, a: p, b: Qq, c: s, v: p * 1000 + Qq * 100, u: s * 1000,
      r: (p - s) * 1000 + Qq * 100});
  }
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = noteBox(`Mẫu: ${ART.b55sp(ma * 1000 + mb * 100)} &minus; ${mc}00 = ?<br>
      Nhẩm: ${mb} trăm &minus; ${mc} trăm = ${mb - mc} trăm<br>
      ${ma} nghìn ${mb} trăm &minus; ${mc} trăm = ${ma} nghìn ${mb - mc} trăm<br>
      ${ART.b55sp(ma * 1000 + mb * 100)} &minus; ${mc}00 = ${ART.b55sp(ma * 1000 + (mb - mc) * 100)}
      <br><br>
      Mẫu: ${ART.b55sp(na * 1000 + nb * 100)} &minus; ${ART.b55sp(nc * 1000)} = ?<br>
      Nhẩm: ${na} nghìn &minus; ${nc} nghìn = ${na - nc} nghìn<br>
      ${na} nghìn ${nb} trăm &minus; ${nc} nghìn = ${na - nc} nghìn ${nb} trăm<br>
      ${ART.b55sp(na * 1000 + nb * 100)} &minus; ${ART.b55sp(nc * 1000)}
        = ${ART.b55sp((na - nc) * 1000 + nb * 100)}`)
    + '<div class="b55-list">' + items.map((it, i) =>
      `<div><span class="b55-let">${L[i]}</span>${ART.b55sp(it.v)}
        <span class="op">&minus;</span> ${ART.b55sp(it.u)}
        <span class="op">=</span> ${q.num(it.r)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${ART.b55sp(x.v)} − ${ART.b55sp(x.u)} = ${ART.b55sp(x.r)}`).join(';  '));
},

/* ===== tr.42 – Bài 3 (luyện tập): Đặt tính rồi tính ===== */
() => {
  const q = Q(3, 'Đặt tính rồi tính.');
  const items = [];
  for (let g = 0; g < 60 && items.length < 2; g++){
    const a = R(4000, 9999), b = R(1000, a - 400);
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 2) items.push({a: 6000 + items.length, b: 2549});
  items.push({a: R(2000, 9999), b: R(100, 999)});
  items.push({a: R(2000, 9999), b: R(11, 99)});
  const line = it => `<div class="eq">${ART.b55sp(it.a)} <span class="op">&minus;</span> ${ART.b55sp(it.b)}</div>`;
  const vc = it => `<div class="vcalc"><span class="vop">&minus;</span>
    <span class="vnums"><b>${ART.b55sp(it.a)}</b><b>${ART.b55sp(it.b)}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a - it.b)}</span></div>`;
  return q.done(`<div class="eq-list">${items.map(line).join('')}</div>
      <div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${ART.b55sp(x.a)} − ${ART.b55sp(x.b)} = ${ART.b55sp(x.a - x.b)}`).join(';  '));
},

/* ===== tr.42 – Bài 4 (luyện tập): xe chở dầu bơm vào hai trạm xăng ===== */
() => {
  const q = Q(4, '');
  const t = pick([8000, 9000, 10000]);
  const m1 = R(15, 30) * 100, m2 = R(15, 30) * 100;
  const conLai = t - m1 - m2;
  return q.done(`<p class="wordq">Một xe chở ${ART.b55sp(t)} <i>l</i> dầu.
      Lần đầu, xe bơm ${ART.b55sp(m1)} <i>l</i> dầu vào một trạm xăng dầu.
      Lần sau, xe bơm ${ART.b55sp(m2)} <i>l</i> dầu vào một trạm khác.
      Hỏi trong xe còn lại bao nhiêu lít dầu?</p>`
    + ART.b55Truck(t)
    + `<div class="bullet">Cả hai lần xe bơm được ${q.num(m1 + m2)} <i>l</i> dầu.</div>
       <div class="bullet">Trong xe còn lại ${q.num(conLai)} <i>l</i> dầu.</div>`,
    `${ART.b55sp(m1)} + ${ART.b55sp(m2)} = ${ART.b55sp(m1 + m2)} (l);  `
      + `${ART.b55sp(t)} − ${ART.b55sp(m1 + m2)} = ${ART.b55sp(conLai)} (l)`);
},
];
