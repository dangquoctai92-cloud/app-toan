/* ==================== BÀI 25: PHÉP CHIA HẾT, PHÉP CHIA CÓ DƯ (SGK tr.72, 73, 74) ====================
   hoạt động tr.73 : bài 1 (Tính – a) chia hết, b) chia có dư), bài 2 (chia táo vào các đĩa)
   luyện tập tr.74 : bài 1 (a) Tính ở 4 chậu cây, b) chậu nào có số dư là 3), bài 2 (chọn số dư),
                     bài 3 (chia cá vào các rổ)
=================================================================================================== */

/* một phép chia đặt tính, thương có 1 chữ số (điều kiện: chục của số bị chia < số chia) */
const b25Div = (q, a, b, show) => {
  const t = Math.floor(a / b), r = a - t * b, p = t * b;
  const c = (v, cls) => `<span class="${cls || ''}">${v}</span>`;
  return '<div class="b25-dv">'
    + c(a) + c(b, 'r ub')
    + c(show ? p : q.num(p, 2), 'ub') + c(show ? t : q.num(t, 1), 'r')
    + c(show ? r : q.num(r, 1)) + c('', 'e')
    + '</div>';
};

/* sinh phép chia 1 lượt: dư = rem (0 là chia hết) */
const b25Make = rem => {
  for (let g = 0; g < 400; g++){
    const b = R(rem + 1 < 2 ? 2 : rem + 1, 9);
    const t = R(2, 9);
    const a = t * b + rem;
    if (a < 10 || a > 99) continue;
    if (Math.floor(a / 10) >= b) continue;
    return {a, b, t, r:rem};
  }
  const bb = Math.max(rem + 1, 2);
  return {a:9 * bb + rem, b:bb, t:9, r:rem};
};

ART.b25Peng = `<svg viewBox="0 0 60 80" class="b25-peng">
  <ellipse cx="30" cy="45" rx="24" ry="31" fill="#6f9bc9" stroke="#3d618c" stroke-width="2"/>
  <ellipse cx="30" cy="51" rx="17" ry="25" fill="#f2f8fd"/>
  <path d="M6 40q-9 15 1 24 6-7 6-17z" fill="#6f9bc9" stroke="#3d618c" stroke-width="2"/>
  <path d="M54 40q9 15-1 24-6-7-6-17z" fill="#6f9bc9" stroke="#3d618c" stroke-width="2"/>
  <circle cx="23" cy="29" r="2.6" fill="#22303f"/><circle cx="37" cy="29" r="2.6" fill="#22303f"/>
  <path d="M30 33l8 4-8 4-8-4z" fill="#f5a623"/>
  <path d="M16 74q7 6 13 0M31 74q7 6 13 0" fill="#f5a623" stroke="#d98d10" stroke-width="1.6"/></svg>`;

ART.b25Pot = c => `<svg viewBox="0 0 100 74">
  <g stroke="#3f8b3a" stroke-width="2.6" fill="none" stroke-linecap="round">
    <path d="M50 30V8M50 18l-11-8M50 18l11-8M38 30V14M62 30V14"/></g>
  <path d="M14 30h72l-9 42H23z" fill="${c}" stroke="#6b4a35" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M11 26h78v9H11z" fill="${c}" stroke="#6b4a35" stroke-width="2.6"/></svg>`;

ART.b25Flower = txt => `<svg viewBox="0 0 110 104">
  <g fill="#f6a93b" stroke="#d1811b" stroke-width="1.8">
    ${Array.from({length:10}, (_, i) => {
      const a = i * 36 * Math.PI / 180;
      return `<ellipse cx="${(55 + 27 * Math.cos(a)).toFixed(1)}" cy="${(40 + 20 * Math.sin(a)).toFixed(1)}"
        rx="12" ry="8" transform="rotate(${i * 36} ${(55 + 27 * Math.cos(a)).toFixed(1)} ${(40 + 20 * Math.sin(a)).toFixed(1)})"/>`;
    }).join('')}</g>
  <ellipse cx="55" cy="40" rx="30" ry="20" fill="#fdf3c8" stroke="#e0bf5c" stroke-width="1.8"/>
  <text x="55" y="46" text-anchor="middle" font-size="17" font-weight="800" fill="#4a3a06">${txt}</text>
  <path d="M55 60v42" stroke="#4f9a3f" stroke-width="3.4" fill="none"/>
  <path d="M55 78q-20-12-26 2 16 8 26-2z" fill="#67b455" stroke="#3f8b3a" stroke-width="1.8"/></svg>`;

ART.b25Vase = (r, c) => `<svg viewBox="0 0 74 96">
  <path d="M27 6h20v14l14 22v42a8 8 0 0 1-8 8H21a8 8 0 0 1-8-8V42l14-22z"
    fill="${c}" stroke="#3d6b7d" stroke-width="2.6" stroke-linejoin="round"/>
  <text x="37" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">Dư</text>
  <text x="37" y="76" text-anchor="middle" font-size="24" font-weight="800" fill="#fff">${r}</text></svg>`;

ART.b25Table = n => {
  const per = Math.min(n, 7);
  const plates = Array.from({length:per}, (_, i) => {
    const x = 40 + (i % 4) * 78, y = 66 + Math.floor(i / 4) * 40;
    return `<ellipse cx="${x}" cy="${y}" rx="30" ry="12" fill="#fff" stroke="#8fb6c9" stroke-width="2.4"/>`;
  }).join('');
  return `<svg viewBox="0 0 360 176" class="b25-tbl">
    <path d="M10 40h340l-22 96H32z" fill="#cfe9f4" stroke="#7ba9bf" stroke-width="2.6"/>
    <rect x="44" y="136" width="12" height="34" fill="#a5713f"/><rect x="304" y="136" width="12" height="34" fill="#a5713f"/>
    ${plates}
    <ellipse cx="180" cy="36" rx="46" ry="16" fill="#d8a460" stroke="#96652c" stroke-width="2.6"/>
    <path d="M134 36q46 30 92 0" fill="#c53b3b" stroke="#8f2222" stroke-width="2.4"/></svg>`;
};

ART.b25Basket = `<svg viewBox="0 0 130 96" class="b25-bask">
  <path d="M12 34h106l-14 56H26z" fill="#e0b177" stroke="#96652c" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M12 34h106M20 56h90M24 74h82" stroke="#96652c" stroke-width="2.2" fill="none"/>
  <g fill="#7fc4e8" stroke="#2f7ea8" stroke-width="2">
    <path d="M34 22q14-12 28 0-14 12-28 0zM62 26l10-6v12z"/>
    <path d="M74 20q14-12 28 0-14 12-28 0zM102 24l10-6v12z"/></g></svg>`;

BANKS.b25 = [

/* ===== tr.73 – Bài 1: Tính (a) phép chia hết  b) phép chia có dư) ===== */
() => {
  const q = Q(1, 'Tính.');
  const uniq = (list, it) => !list.some(x => x.a === it.a && x.b === it.b);
  const A = [];
  for (let g = 0; g < 400 && A.length < 3; g++){ const it = b25Make(0); if (uniq(A, it)) A.push(it); }
  while (A.length < 3) A.push({a:12 + A.length * 6, b:3, t:(12 + A.length * 6) / 3, r:0});
  const B = [];
  for (let g = 0; g < 400 && B.length < 3; g++){
    const it = b25Make(R(1, 5));
    if (it.b > it.r && uniq(B, it)) B.push(it);
  }
  while (B.length < 3) B.push({a:32 + B.length, b:6, t:5, r:2 + B.length});
  const line = list => '<div class="b25-row">' + list.map((it, i) =>
    `<div class="b25-item">${ART.b25Peng}${b25Div(q, it.a, it.b, i === 0)}</div>`).join('') + '</div>';
  return q.done(`<div class="sub-lbl">a)</div>${line(A)}
      ${noteBox(`Mẫu: ${A[0].a} : ${A[0].b} = ${A[0].t}`)}
      <div class="sub-lbl">b)</div>${line(B)}
      ${noteBox(`Mẫu: ${B[0].a} : ${B[0].b} = ${B[0].t} (dư ${B[0].r})`)}`,
    A.slice(1).map(x => `${x.a} : ${x.b} = ${x.t}`).join(' · ') + ' · '
      + B.slice(1).map(x => `${x.a} : ${x.b} = ${x.t} (dư ${x.r})`).join(' · '));
},

/* ===== tr.73 – Bài 2: chia táo vào các đĩa ===== */
() => {
  const q = Q(2, '');
  const d0 = R(2, 6), N = d0 * R(3, 6);
  const bad = [];
  for (let g = 0; g < 400 && bad.length < 2; g++){
    const d = R(2, 7);
    if (d === d0 || N % d === 0 || bad.includes(d)) continue;
    bad.push(d);
  }
  let f = 2;
  while (bad.length < 2){ if (f !== d0 && N % f !== 0 && !bad.includes(f)) bad.push(f); f++; }
  const NAME = ['Nam', 'Mai', 'Rô-bốt'];
  const ds = [d0, bad[0], bad[1]];
  const ord = [0, 1, 2].sort(() => Math.random() - .5);
  const who = {};
  ord.forEach((k, i) => { who[NAME[i]] = ds[k]; });
  const het = NAME.filter(n => N % who[n] === 0);
  const du = NAME.filter(n => N % who[n] !== 0);
  const says = NAME.map((n, i) => `<div class="b25-say"><b>${n}:</b>
      <span class="b25-bub">Chia ${N} quả táo vào các đĩa, mỗi đĩa ${who[n]} quả.</span></div>`).join('');
  return q.done(ART.b25Table(6) + says
    + `<div class="fill-line">Cách chia táo của bạn ${q.pick(het.slice().sort().join(','), NAME.slice())}
        cho ta phép chia hết.</div>
       <div class="fill-line">Cách chia táo của bạn ${q.pick(du.slice().sort().join(','), NAME.slice())}
        cho ta phép chia có dư.</div>`,
    NAME.map(n => `${N} : ${who[n]} = ${Math.floor(N / who[n])}`
      + (N % who[n] ? ` (dư ${N % who[n]})` : '')).join(' · '));
},

/* ===== tr.74 – Luyện tập bài 1: a) Tính  b) chậu nào có số dư là 3 ===== */
() => {
  const q = Q(1, 'a) Tính.');
  const L = ['A', 'B', 'C', 'D'];
  const COL = ['#3f8f9c', '#b57a6a', '#3f8f9c', '#b57a6a'];
  const list = [];
  for (let g = 0; g < 400 && list.length < 3; g++){
    const it = b25Make(pick([0, 1, 2, 4, 5]));
    if (it.b > it.r && !list.some(x => x.a === it.a && x.b === it.b)) list.push(it);
  }
  while (list.length < 3) list.push({a:18 + list.length * 4, b:2, t:(18 + list.length * 4) / 2, r:0});
  let three = b25Make(3);
  for (let g = 0; g < 200; g++){
    if (three.b > 3 && !list.some(x => x.a === three.a && x.b === three.b)) break;
    three = b25Make(3);
  }
  const pos = R(0, 3);
  const all = list.slice();
  all.splice(pos, 0, three);
  const row = '<div class="b25-row">' + all.map((it, i) =>
    `<div class="b25-pot">${b25Div(q, it.a, it.b, false)}${ART.b25Pot(COL[i])}<em>${L[i]}</em></div>`).join('') + '</div>';
  return q.done(row
    + `<div class="fill-line"><b>b)</b> Chậu cây nào ở câu a ghi phép chia có số dư là 3?
        ${q.pick(L[pos], L.slice())}</div>`,
    all.map((x, i) => `${L[i]}: ${x.a} : ${x.b} = ${x.t}` + (x.r ? ` (dư ${x.r})` : '')).join(' · '));
},

/* ===== tr.74 – Luyện tập bài 2: chọn số dư của mỗi phép chia ===== */
() => {
  const q = Q(2, 'Chọn số dư của mỗi phép chia dưới đây.');
  const rs = [];
  for (let g = 0; g < 200 && rs.length < 3; g++){ const r = R(1, 5); if (!rs.includes(r)) rs.push(r); }
  let f = 1;
  while (rs.length < 3){ if (!rs.includes(f)) rs.push(f); f++; }
  const kinds = [rs[0], rs[1], rs[2], pick(rs), pick(rs), pick(rs)].sort(() => Math.random() - .5);
  const items = [];
  kinds.forEach(r => {
    let it = b25Make(r);
    for (let g = 0; g < 200; g++){
      if (it.b > r && !items.some(x => x.a === it.a && x.b === it.b)) break;
      it = b25Make(r);
    }
    items.push(it);
  });
  const OPT = rs.slice().sort(() => Math.random() - .5).map(r => 'Dư ' + r);
  const VC = ['#4aa3c4', '#7bb85f', '#e0b04a'];
  const vases = '<div class="b25-row">' + rs.map((r, i) =>
    `<div class="b25-vase">${ART.b25Vase(r, VC[i])}</div>`).join('') + '</div>';
  const flowers = '<div class="b25-row">' + items.map(it =>
    `<div class="b25-fl">${ART.b25Flower(it.a + ' : ' + it.b)}${q.pick('Dư ' + it.r, OPT)}</div>`).join('') + '</div>';
  return q.done(vases + flowers,
    items.map(x => `${x.a} : ${x.b} = ${x.t} (dư ${x.r})`).join(' · '));
},

/* ===== tr.74 – Luyện tập bài 3: chia cá vào các rổ ===== */
() => {
  const q = Q(3, '');
  const moi = R(4, 9), ro = R(4, 9), tong = moi * ro;
  return q.done(ART.b25Basket
    + `<p class="wordq">Rô-bốt chia ${tong} con cá vào các rổ, mỗi rổ ${moi} con cá.
        Hỏi Rô-bốt chia được bao nhiêu rổ cá như vậy?</p>
       <div class="fill-line">Rô-bốt chia được ${q.num(ro)} rổ cá như vậy.</div>`,
    `${tong} : ${moi} = ${ro} (rổ)`);
},
];
