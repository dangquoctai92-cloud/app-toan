/* ============ BÀI 23: NHÂN SỐ CÓ HAI CHỮ SỐ VỚI SỐ CÓ MỘT CHỮ SỐ (SGK tr.67, 68, 69) ============
   hoạt động tr.67 : bài 1 (đặt tính, không nhớ), bài 2 (tính nhẩm theo mẫu), bài 3 (bài toán con quạ)
   hoạt động tr.68 : Tính (đặt tính, có nhớ)
   luyện tập tr.68 : bài 1 (gắn chữ vào ô — CHÙA MỘT CỘT)
   luyện tập tr.69 : bài 2 (đổi chỗ hai thẻ số của các bạn ong)
================================================================================================ */

/* một bình nước có sỏi ở đáy */
ART.b23Jar = `<svg viewBox="0 0 64 96" class="b23-jar">
  <path d="M24 5h16v17l10 15v51a5 5 0 0 1-5 5H19a5 5 0 0 1-5-5V37l10-15z"
    fill="#e6f6fd" stroke="#4e9cc0" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M14 60h36v28a5 5 0 0 1-5 5H19a5 5 0 0 1-5-5z" fill="#7fd0ee"/>
  <g fill="#9aa0a8" stroke="#6d737b" stroke-width="1.4">
    <circle cx="23" cy="82" r="6"/><circle cx="36" cy="85" r="7"/>
    <circle cx="30" cy="72" r="5"/><circle cx="44" cy="76" r="5"/></g>
  <path d="M22 6h20" stroke="#4e9cc0" stroke-width="3" stroke-linecap="round"/>
</svg>`;

/* một chú ong */
ART.b23Bee = `<svg viewBox="0 0 76 62" class="b23-bee">
  <ellipse cx="28" cy="18" rx="15" ry="10" fill="#fbf5d6" stroke="#c3b66c" stroke-width="2" transform="rotate(-20 28 18)"/>
  <ellipse cx="46" cy="18" rx="14" ry="10" fill="#fbf5d6" stroke="#c3b66c" stroke-width="2" transform="rotate(20 46 18)"/>
  <ellipse cx="34" cy="40" rx="20" ry="14" fill="#f7c93f" stroke="#8a6a12" stroke-width="2.2"/>
  <g stroke="#3b2f12" stroke-width="5" stroke-linecap="round">
    <path d="M28 30v20"/><path d="M40 30v20"/></g>
  <circle cx="58" cy="38" r="10" fill="#f7c93f" stroke="#8a6a12" stroke-width="2.2"/>
  <circle cx="62" cy="35" r="2.4" fill="#3b2f12"/>
  <path d="M56 29l-3-9M63 30l3-9" fill="none" stroke="#3b2f12" stroke-width="2" stroke-linecap="round"/>
  <path d="M50 28q3 6 0 10" fill="none" stroke="#8a6a12" stroke-width="2"/>
</svg>`;

/* sinh một phép nhân "số có hai chữ số × số có một chữ số".
   carry = false : không nhớ (mọi chữ số nhân xong đều < 10)
   carry = true  : có nhớ ở hàng đơn vị, tích vẫn là số có hai chữ số */
const b23Mul = carry => {
  for (let t = 0; t < 400; t++){
    const m = R(2, carry ? 6 : 8);
    const u = R(0, 9);
    if (carry ? u * m < 10 : u * m > 9) continue;
    const c = Math.floor(u * m / 10);
    const mx = Math.floor((9 - c) / m);
    if (mx < 1) continue;
    const d = R(1, mx);
    const a = d * 10 + u;
    return {a, b:m, r:a * m};
  }
  return carry ? {a:16, b:4, r:64} : {a:12, b:3, r:36};
};

/* n phép nhân khác nhau */
const b23Set = (n, carry) => {
  const out = [];
  for (let g = 0; g < 400 && out.length < n; g++){
    const it = b23Mul(carry);
    if (!out.some(x => x.a === it.a && x.b === it.b)) out.push(it);
  }
  while (out.length < n){
    const a = (carry ? 15 : 11) + out.length, b = carry ? 4 : 3;
    out.push({a, b, r:a * b});
  }
  return out;
};

/* một phép nhân đặt tính dọc, ô trống là kết quả */
const b23Vc = (q, it) => `<div class="b23-card"><div class="vcalc"><span class="vop">×</span>
  <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
  <span class="vres">${q.num(it.r, String(it.r).length)}</span></div></div>`;

BANKS.b23 = [

/* ===== tr.67 – Bài 1: Tính (nhân không nhớ) ===== */
() => {
  const q = Q(1, 'Tính.');
  const list = b23Set(3, false);
  return q.done('<div class="b23-cards">' + list.map(it => b23Vc(q, it)).join('') + '</div>'
    + '<div class="hint-line">Nhân lần lượt từ hàng đơn vị sang hàng chục.</div>',
    list.map(it => `${it.a} × ${it.b} = ${it.r}`).join(' · '));
},

/* ===== tr.67 – Bài 2: Tính nhẩm (theo mẫu) ===== */
() => {
  const q = Q(2, 'Tính nhẩm (theo mẫu).');
  let mt = 2, mm = 3;
  for (let g = 0; g < 200; g++){
    const t = R(2, 4), m = R(2, 4);
    if (t * m <= 9){ mt = t; mm = m; break; }
  }
  const items = [];
  for (let g = 0; g < 400 && items.length < 4; g++){
    const t = R(1, 4), m = R(2, 9);
    if (t * m > 9) continue;
    if (t === mt && m === mm) continue;
    if (items.some(x => x.t === t && x.m === m)) continue;
    items.push({t, m});
  }
  while (items.length < 4){ const k = items.length; items.push({t:1, m:2 + k}); }
  const box = noteBox(`Mẫu: ${mt * 10} × ${mm} = ?<br>
    &nbsp;&nbsp;Nhẩm: ${mt} chục × ${mm} = ${mt * mm} chục<br>
    &nbsp;&nbsp;${mt * 10} × ${mm} = ${mt * mm * 10}`);
  const grid = '<div class="calc-grid">' + items.map(x =>
    `<div class="calc-cell">${x.t * 10} × ${x.m} = ${q.num(x.t * x.m * 10)}</div>`).join('') + '</div>';
  return q.done(box + grid,
    items.map(x => `${x.t * 10} × ${x.m} = ${x.t * x.m * 10}`).join(' · '));
},

/* ===== tr.67 – Bài 3: bài toán con quạ thả sỏi ===== */
() => {
  const q = Q(3, '');
  const b = R(2, 4);
  const mx = Math.floor(9 / b);
  const td = R(1, mx), ud = R(1, mx);
  const n = td * 10 + ud;
  const jars = '<div class="b23-jars">' + Array.from({length:b}, () => ART.b23Jar).join('') + '</div>';
  return q.done(jars
    + `<p class="wordq">Có ${b} bình chứa nước. Quạ phải thả ${n} viên sỏi vào mỗi bình
        để nước dâng lên thì mới có thể uống được nước.
        Hỏi quạ phải thả bao nhiêu viên sỏi thì mới uống được nước ở cả ${b} bình đó?</p>
       <div class="fill-line">Quạ phải thả tất cả ${q.num(n * b)} viên sỏi.</div>`,
    `${n} × ${b} = ${n * b} (viên sỏi).`);
},

/* ===== tr.68 – Hoạt động: Tính (nhân có nhớ) ===== */
() => {
  const q = Q(4, 'Tính.');
  const list = b23Set(4, true);
  return q.done('<div class="b23-cards">' + list.map(it => b23Vc(q, it)).join('') + '</div>'
    + '<div class="hint-line">Nhân hàng đơn vị trước, nhớ sang hàng chục rồi cộng thêm.</div>',
    list.map(it => `${it.a} × ${it.b} = ${it.r}`).join(' · '));
},

/* ===== tr.68 – Luyện tập bài 1: gắn chữ vào ô (CHÙA MỘT CỘT) ===== */
() => {
  const q = Q(1, 'Kết quả của mỗi phép tính được gắn với một chữ như sau:');
  const pool = [];
  for (let a = 11; a <= 49; a++)
    for (let m = 1; m <= 9; m++){ const p = a * m; if (p >= 21 && p <= 99) pool.push({a, m, p}); }
  pool.sort(() => Math.random() - .5);
  const LET = ['A', 'C', 'H', 'M', 'N', 'Ô', 'T', 'Ù'];
  const val = {}, tags = [], usedP = new Set();
  for (const it of pool){
    if (tags.length >= LET.length) break;
    if (usedP.has(it.p)) continue;
    usedP.add(it.p);
    const L = LET[tags.length];
    val[L] = it.p;
    tags.push({L, a:it.a, m:it.m, p:it.p});
  }
  const show = tags.slice().sort(() => Math.random() - .5);
  const W = [['C', 'H', 'Ù', 'A'], ['M', 'Ô', 'T'], ['C', 'Ô', 'T']];

  const head = '<div class="b23-tags">' + show.map(t =>
    `<span class="b23-tag"><i>${t.L}</i>${t.a} × ${t.m}</span>`).join('') + '</div>'
    + '<p class="wordq">Hãy gắn các chữ vào các ô thích hợp để biết tên một di tích nổi tiếng ở nước ta.</p>';

  const words = '<div class="wpick">' + W.map((w, wi) =>
    '<div class="b23-w"><div class="b23-nrow">'
    + w.map(L => `<span class="b23-nc">${val[L]}</span>`).join('') + '</div>'
    + w.map((L, ci) => `<div class="b23-pl"><span class="b23-nc">${val[L]}</span><span class="b23-ar">&rarr;</span>`
        + (wi === 0 && ci === 3 ? `<b class="b23-ans">${L}</b>` : q.pick(L, LET)) + '</div>').join('')
    + '</div>').join('') + '</div>';

  return q.done(head + words
    + '<div class="hint-line">Tính kết quả từng phép tính rồi tìm chữ ứng với mỗi ô số.</div>',
    'Tên di tích: CHÙA MỘT CỘT. ' + tags.map(t => `${t.L}: ${t.a} × ${t.m} = ${t.p}`).join(' · '));
},

/* ===== tr.69 – Luyện tập bài 2: đổi chỗ hai thẻ số ===== */
() => {
  const q = Q(2, 'Em hãy giúp các bạn ong đổi chỗ hai thẻ số trong hình dưới đây để được phép tính đúng.');
  const PAIRS = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]];
  const okEq = d => (d[0] * 10 + d[1]) * d[2] === d[3] * 10 + d[4];
  const sw = (d, i, j) => { const c = d.slice(); c[i] = d[j]; c[j] = d[i]; return c; };
  let base = null, scr = null;
  for (let g = 0; g < 500 && !scr; g++){
    const n = R(11, 49), m = R(2, 9), p = n * m;
    if (p < 11 || p > 99) continue;
    const d = [Math.floor(n / 10), n % 10, m, Math.floor(p / 10), p % 10];
    if (d.some(x => x === 0)) continue;
    const pr = pick(PAIRS);
    const s = sw(d, pr[0], pr[1]);
    if (okEq(s)) continue;
    const sols = new Set();
    PAIRS.forEach(([i, j]) => { const t = sw(s, i, j); if (okEq(t)) sols.add(t.join('-')); });
    if (sols.size !== 1) continue;
    base = d; scr = s;
  }
  if (!scr){ base = [2, 1, 4, 8, 4]; scr = [4, 1, 2, 8, 4]; }
  const f = base[0] * 10 + base[1], m2 = base[2], p2 = base[3] * 10 + base[4];
  const tile = v => `<span class="b23-tile">${v}</span>`;
  const board = `<div class="b23-swapwrap"><div class="b23-swap">
      <i></i>${tile(scr[0])}${tile(scr[1])}
      <span class="b23-op">×</span><i></i>${tile(scr[2])}
      <span class="b23-bar"></span>
      <i></i>${tile(scr[3])}${tile(scr[4])}
    </div></div>`;
  return q.done(board + `<div class="b23-bees">${ART.b23Bee}${ART.b23Bee}${ART.b23Bee}</div>
      <div class="fill-line">Đổi chỗ hai thẻ số, ta được phép tính đúng:
        ${q.num(f, 2)} <span class="op">×</span> ${q.num(m2, 1)} <span class="op">=</span> ${q.num(p2, 2)}</div>`,
    `${f} × ${m2} = ${p2}.`);
},
];
