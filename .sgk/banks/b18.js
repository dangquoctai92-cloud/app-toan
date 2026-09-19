/* ==================== BÀI 18: GÓC, GÓC VUÔNG, GÓC KHÔNG VUÔNG (SGK tr.54, 55) ====================
   hoạt động tr.55 : Dùng ê ke, hãy tìm góc vuông, góc không vuông trong các hình dưới đây
   luyện tập tr.55 : bài 1 (vẽ một góc vuông trên lưới ô vuông), bài 2 (hình nào nhiều góc vuông nhất)
================================================================================================ */

/* một góc: đỉnh V, hai cạnh VL1, VL2 theo hai hướng d1, d2 (độ, ngược chiều kim đồng hồ) */
ART.b18Ang = (V, L1, L2, d1, d2, cls) => {
  const cx = 90, cy = 92, r = 58, rd = d => d * Math.PI / 180;
  const X = (d, k) => (cx + k * Math.cos(rd(d))).toFixed(1);
  const Y = (d, k) => (cy - k * Math.sin(rd(d))).toFixed(1);
  const bi = (d1 + d2) / 2 + 180;
  return `<svg viewBox="0 0 180 180" class="${cls || 'b18-art'}">
    <path d="M${X(d1, r)} ${Y(d1, r)}L${cx} ${cy}L${X(d2, r)} ${Y(d2, r)}" fill="none"
      stroke="#2b2b2b" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${cx}" cy="${cy}" r="3.4"/>
    <text x="${X(d1, r + 18)}" y="${(+Y(d1, r + 18) + 7).toFixed(1)}" text-anchor="middle" font-size="21" font-weight="700">${L1}</text>
    <text x="${X(d2, r + 18)}" y="${(+Y(d2, r + 18) + 7).toFixed(1)}" text-anchor="middle" font-size="21" font-weight="700">${L2}</text>
    <text x="${X(bi, 21)}" y="${(+Y(bi, 21) + 7).toFixed(1)}" text-anchor="middle" font-size="21" font-weight="700">${V}</text>
  </svg>`;
};

/* góc vuông vẽ trên lưới ô vuông: cạnh ngang a ô, cạnh dọc b ô */
ART.b18Grid = (a, b, O, X, Y) => {
  const C = 30, cols = a + 3, rows = b + 3, W = cols * C, H = rows * C;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * C} 0V${H}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * C}H${W}`;
  const ox = C, oy = H - C, xx = ox + a * C, yy = oy - b * C;
  return `<svg viewBox="-16 -8 ${W + 32} ${H + 30}" class="b18-grid">
    <path d="${g}" fill="none" stroke="#9fd0ef" stroke-width="1"/>
    <path d="M${xx} ${oy}L${ox} ${oy}L${ox} ${yy}" fill="none" stroke="#2b2b2b"
      stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M${ox} ${oy - 15}h15v15" fill="none" stroke="#e03b3b" stroke-width="2.2"/>
    <circle cx="${ox}" cy="${oy}" r="3.6"/><circle cx="${xx}" cy="${oy}" r="3.6"/><circle cx="${ox}" cy="${yy}" r="3.6"/>
    <text x="${ox - 10}" y="${oy + 22}" text-anchor="middle" font-size="19" font-weight="700">${O}</text>
    <text x="${xx + 2}" y="${oy + 22}" text-anchor="middle" font-size="19" font-weight="700">${X}</text>
    <text x="${ox - 13}" y="${yy + 6}" text-anchor="middle" font-size="19" font-weight="700">${Y}</text>
  </svg>`;
};

/* đường gấp khúc từ danh sách vec-tơ [dx, dy] (dy dương là đi xuống) */
ART.b18Sh = dirs => {
  const C = 22, pts = [[0, 0]];
  let x = 0, y = 0;
  dirs.forEach(d => { x += d[0]; y += d[1]; pts.push([x, y]); });
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const mx = Math.min.apply(null, xs), my = Math.min.apply(null, ys);
  const W = (Math.max.apply(null, xs) - mx) * C + 20, H = (Math.max.apply(null, ys) - my) * C + 20;
  const d = pts.map((p, i) => (i ? 'L' : 'M') + ((p[0] - mx) * C + 10) + ' ' + ((p[1] - my) * C + 10)).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="b18-sh">
    <path d="${d}" fill="none" stroke="#2b2b2b" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
};

ART.b18Eke = `<svg viewBox="0 0 120 110" class="b18-eke">
  <path d="M16 12h14v82h74v14H16z" fill="#f6d8a8" stroke="#c08b3c" stroke-width="2.4"/>
  <path d="M30 12l74 82" fill="none" stroke="#c08b3c" stroke-width="2.4"/>
  <path d="M16 94h16v-16" fill="none" stroke="#e03b3b" stroke-width="2.4"/>
  <path d="M16 22h9M16 32h9M16 42h9M16 52h9M16 62h9M16 72h9M16 82h9" stroke="#c08b3c" stroke-width="1.6"/>
</svg>`;

BANKS.b18 = [

/* ===== tr.55 – hoạt động: tìm góc vuông, góc không vuông ===== */
() => {
  const q = Q(1, 'Dùng ê ke, hãy tìm góc vuông, góc không vuông trong các hình dưới đây:');
  const bag = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const nOk = R(2, 3);
  const flags = [];
  for (let i = 0; i < 6; i++) flags.push(i < nOk);
  flags.sort(() => Math.random() - .5);
  const items = flags.map((ok, i) => {
    const base = R(0, 11) * 30;
    const delta = ok ? 90 : pick([35, 45, 55, 60, 120, 130, 145]);
    return {V: bag[i * 3], A: bag[i * 3 + 1], B: bag[i * 3 + 2], d1: base, d2: base + delta, ok};
  });
  const row = '<div class="b18-row">' + items.map(it =>
    `<div class="b18-item">${ART.b18Ang(it.V, it.A, it.B, it.d1, it.d2)}<em>Góc đỉnh ${it.V}</em></div>`).join('')
    + '</div>';
  const opts = items.map(it => it.V);
  const ans = items.filter(it => it.ok).map(it => it.V).sort().join(',');
  return q.done(row + ART.b18Eke
    + `<div class="fill-line">Chọn tất cả các góc vuông: ${q.pick(ans, opts)}</div>
       <div class="hint-line">Đặt ê ke trùng vào góc: góc khớp với góc của ê ke là góc vuông.</div>`,
    `Các góc vuông: ${items.filter(it => it.ok).map(it => 'góc đỉnh ' + it.V).join(', ')}.`);
},

/* ===== tr.55 – hoạt động (tiếp): nêu tên đỉnh, cạnh của góc ===== */
() => {
  const q = Q(1, 'Nêu tên đỉnh và các cạnh của góc dưới đây, rồi cho biết đó là góc vuông hay góc không vuông.');
  const bag = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const V = bag[0], A = bag[1], B = bag[2];
  const ok = Math.random() < .5;
  const base = R(0, 11) * 30;
  const delta = ok ? 90 : pick([40, 50, 60, 125, 135, 150]);
  const kinds = ['góc vuông', 'góc không vuông'];
  const sides = [V + A, V + B, A + B].sort(() => Math.random() - .5);
  return q.done(ART.b18Ang(V, A, B, base, base + delta, 'b18-one')
    + `<div class="fill-line">Góc này có đỉnh là ${q.pick(V, [V, A, B].sort(() => Math.random() - .5))}.</div>
       <div class="fill-line">Hai cạnh của góc là ${q.pick([V + A, V + B].sort().join(','), sides)}.</div>
       <div class="fill-line">Đó là ${q.pick(ok ? kinds[0] : kinds[1], kinds)}.</div>`,
    `Góc ${ok ? 'vuông' : 'không vuông'} đỉnh ${V}; cạnh ${V + A}, ${V + B}.`);
},

/* ===== tr.55 – luyện tập 1: vẽ một góc vuông trên lưới ô vuông ===== */
() => {
  const q = Q(1, 'Hãy vẽ một góc vuông trên lưới ô vuông.');
  const bag = 'ABCDEGHIKLMNOPQRSTUVXY'.split('').sort(() => Math.random() - .5);
  const O = bag[0], X = bag[1], Y = bag[2];
  const a = R(3, 5), b = R(2, 4);
  return q.done(noteBox(`Mẫu: góc vuông đỉnh ${O} có một cạnh nằm ngang và một cạnh thẳng đứng.`)
    + ART.b18Grid(a, b, O, X, Y)
    + `<div class="fill-line">Góc vuông đỉnh ${O} có cạnh ${O}${X} dài ${q.num(a, 1)} ô
         và cạnh ${O}${Y} dài ${q.num(b, 1)} ô.</div>
       <div class="hint-line">Em hãy vẽ lại góc vuông đó trên lưới ô vuông trong vở.</div>`,
    `Đếm số ô trên lưới: ${O}${X} dài ${a} ô, ${O}${Y} dài ${b} ô.`);
},

/* ===== tr.55 – luyện tập 2: hình nào có nhiều góc vuông nhất ===== */
() => {
  const q = Q(2, 'Trong các hình sau, hình nào có nhiều góc vuông nhất?');
  const T = {
    1: [[3, -2], [3, 0], [0, -3]],
    2: [[3, 0], [0, -3], [3, 0]],
    3: [[3, 0], [0, -3], [3, 0], [0, 3]],
    4: [[0, -3], [3, 0], [0, 3], [3, 0], [0, -3]],
    5: [[0, -3], [3, 0], [0, 3], [3, 0], [0, -3], [3, 0]]
  };
  const ks = [1, 2, 3, 4, 5].sort(() => Math.random() - .5).slice(0, 3).sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C'];
  let bi = 0;
  ks.forEach((k, i) => { if (k > ks[bi]) bi = i; });
  const row = '<div class="b18-shrow">' + ks.map((k, i) =>
    `<div class="b18-shitem">${ART.b18Sh(T[k])}<em>Hình ${L[i]}</em></div>`).join('') + '</div>';
  return q.done(row + `<div class="fill-line">Hình có nhiều góc vuông nhất là ${q.pick(L[bi], L)}.</div>
      <div class="hint-line">Dùng ê ke kiểm tra từng góc của mỗi hình rồi đếm số góc vuông.</div>`,
    `Hình ${L[bi]} có ${ks[bi]} góc vuông, nhiều hơn hai hình còn lại (${ks.filter((_, i) => i !== bi).join(' và ')} góc vuông).`);
},
];
