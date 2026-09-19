/* ==================== BÀI 42: ÔN TẬP BIỂU THỨC SỐ (SGK tr.116, 117) ====================
   luyện tập tr.116 : bài 1 (tính giá trị của biểu thức), bài 2 (bao gạo – bao ngô),
                      bài 3 (những biểu thức nào có giá trị lớn hơn ... – hình cái kẹo),
                      bài 4 (Đố em! chọn dấu "+ ; −")
   luyện tập tr.117 : bài 1 (biểu thức có dấu ngoặc), bài 2 (chọn số là giá trị – cá heo và quả bóng),
                      bài 3 (tính giá trị của biểu thức – tính thuận tiện), bài 4 (bánh xe ô tô),
                      bài 5 (Đố em! chọn dấu "+ ; − ; × ; :" để giá trị bé nhất)
======================================================================================== */

/* cái kẹo có ghi biểu thức */
ART.b42Candy = t => `<svg viewBox="0 0 268 100" class="b42-candy">
  <path d="M40 50 6 20q10 30 0 60z" fill="#f0dcee" stroke="#9b6f97" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M228 50 262 20q-10 30 0 60z" fill="#f0dcee" stroke="#9b6f97" stroke-width="2.2" stroke-linejoin="round"/>
  <ellipse cx="134" cy="50" rx="96" ry="34" fill="#f9eef8" stroke="#9b6f97" stroke-width="2.4"/>
  <path d="M20 34q8 16 0 32M248 34q-8 16 0 32" fill="none" stroke="#9b6f97" stroke-width="1.6"/>
  <text x="134" y="58" text-anchor="middle" font-size="21" font-weight="800" fill="#43293f">${t}</text>
</svg>`;

/* con cá heo có ghi biểu thức */
ART.b42Dolphin = t => `<svg viewBox="0 0 250 122" class="b42-dolp">
  <path d="M34 68q4-32 54-42 68-14 118 15 14 8 26 5-10 13-8 22-48 29-118 23-58-5-72-23z"
    fill="#d5ecfa" stroke="#5b9fc4" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M34 68Q12 62 4 44q24 2 34 14z" fill="#a8d7f0" stroke="#5b9fc4" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M118 30q22-22 46-16-9 13-26 19z" fill="#a8d7f0" stroke="#5b9fc4" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M74 88q-15 12-7 23 17-3 25-17z" fill="#a8d7f0" stroke="#5b9fc4" stroke-width="2.2" stroke-linejoin="round"/>
  <circle cx="200" cy="56" r="3.2" fill="#123"/>
  <text x="122" y="74" text-anchor="middle" font-size="20" font-weight="800" fill="#12405c">${t}</text>
</svg>`;

/* quả bóng có ghi số */
ART.b42Ball = n => `<svg viewBox="0 0 88 88" class="b42-ball">
  <circle cx="44" cy="44" r="40" fill="#e2467c" stroke="#ad2a57" stroke-width="2.4"/>
  <path d="M12 20q30 22 60 50M76 20q-30 22-60 50" fill="none" stroke="#fdf2f6" stroke-width="12" stroke-linecap="round"/>
  <circle cx="44" cy="44" r="18" fill="#fdf2f6" stroke="#e6a9c1" stroke-width="1.6"/>
  <text x="44" y="51" text-anchor="middle" font-size="19" font-weight="800" fill="#8d1f42">${n}</text>
</svg>`;

BANKS.b42 = [

/* ===== tr.116 – Bài 1: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức.');
  const a1 = R(700, 960), d1 = R(20, 90), b1 = a1 - d1, c1 = R(11, 49);      // a) a − b + c
  const m2 = pick([2, 3]), d2 = R(3, 9), u2 = R(4, 12), a2 = d2 * u2;        // b) a × m : d
  const a3 = R(11, 29), b3 = R(3, 9), c3 = R(10, a3 * b3 - 5);               // c) a × b − c
  const c4 = R(3, 9), t4 = R(8, 20), b4 = c4 * t4, a4 = R(120, 520);         // d) a + b : c
  return q.done(`<div class="b42-two">
      <div class="b42-ex"><span class="b42-let">a)</span>${a1} − ${b1} + ${c1} = ${q.num(a1 - b1 + c1)}</div>
      <div class="b42-ex"><span class="b42-let">b)</span>${a2} × ${m2} : ${d2} = ${q.num(a2 * m2 / d2)}</div>
      <div class="b42-ex"><span class="b42-let">c)</span>${a3} × ${b3} − ${c3} = ${q.num(a3 * b3 - c3)}</div>
      <div class="b42-ex"><span class="b42-let">d)</span>${a4} + ${b4} : ${c4} = ${q.num(a4 + b4 / c4)}</div>
    </div>`,
    `a) ${a1} − ${b1} = ${d1};  b) ${a2} × ${m2} = ${a2 * m2};  `
      + `c) ${a3} × ${b3} = ${a3 * b3};  d) ${b4} : ${c4} = ${b4 / c4}`);
},

/* ===== tr.116 – Bài 2: bao gạo và bao ngô ===== */
() => {
  const q = Q(2, '');
  const g = pick([20, 25, 30, 35, 40, 50]), n = pick([40, 45, 55, 60]), sb = R(2, 5);
  return q.done(`<p class="wordq">Mỗi bao gạo cân nặng ${g} kg, mỗi bao ngô cân nặng ${n} kg.
      Hỏi ${sb} bao gạo và 1 bao ngô cân nặng bao nhiêu ki-lô-gam?</p>
    <div class="fill-line">${sb} bao gạo và 1 bao ngô cân nặng ${q.num(g * sb + n)} kg.</div>`,
    `${g} × ${sb} + ${n} = ${g * sb} + ${n} = ${g * sb + n} (kg)`);
},

/* ===== tr.116 – Bài 3: những biểu thức nào có giá trị lớn hơn ... (cái kẹo) ===== */
() => {
  const T = pick([60, 70, 80, 90, 100]);
  const q = Q(3, `Những biểu thức nào dưới đây có giá trị lớn hơn ${T}?`);
  const L = ['A', 'B', 'C', 'D', 'E'];
  const ord = [0, 1, 2, 3, 4].sort(() => Math.random() - .5);
  const above = ord.slice(0, 3);
  const vals = L.map((_, i) => above.includes(i) ? T + 5 * R(1, 8) : T - 5 * R(1, 6));
  const build = [
    v => { const x = R(5, Math.min(Math.floor((v - 5) / 2), 40)); return `${x} × 2 + ${v - 2 * x}`; },
    v => { const h = R(5, Math.min(Math.floor(v / 2), 50)); return `${v - h} + ${2 * h} : 2`; },
    v => { const h = R(5, Math.min(v - 5, 40)); return `${3 * h} : 3 + ${v - h}`; },
    v => { const z = R(5, Math.min(Math.floor((v - 5) / 2), 40)); return `${v - 2 * z} + ${z} × 2`; },
    v => { const x = Math.ceil((v + 5) / 5) + R(0, 6); return `${x} × 5 − ${5 * x - v}`; }
  ];
  const ex = L.map((l, i) => ({L: l, t: build[i](vals[i]), v: vals[i]}));
  const ok = ex.filter(e => e.v > T).map(e => e.L);
  return q.done(`<div class="b42-row">${ex.map(e =>
      `<div class="b42-cell">${ART.b42Candy(e.t)}<div class="b42-cap">${e.L}</div></div>`).join('')}</div>
    <div class="fill-line">Các biểu thức có giá trị lớn hơn ${T} là: ${q.pick(ok.slice().sort().join(','), L)}</div>`,
    ex.map(e => `${e.L} = ${e.v}`).join(';  '));
},

/* ===== tr.116 – Bài 4: Đố em! chọn dấu "+ ; −" ===== */
() => {
  const q = Q(4, 'Đố em!<br>Chọn dấu phép tính "+ ; −" thích hợp thay cho dấu "?".');
  const b = R(2, 20);
  let c = R(2, 20);
  if (c === b) c = b === 20 ? 3 : b + 1;
  const a = b + c + R(1, 30);
  const s1 = pick(['+', '−']), s2 = pick(['+', '−']);
  const v1 = s1 === '+' ? a + b : a - b;
  const t = s2 === '+' ? v1 + c : v1 - c;
  const OP = ['+', '−'];
  return q.done(`<div class="b42-puz">${a} ${q.pick(s1, OP)} ${b} ${q.pick(s2, OP)} ${c} = ${t}</div>
      <div class="hint-line">Chạm chọn dấu ở mỗi ô "?" rồi tính lần lượt từ trái sang phải.</div>`,
    `${a} ${s1} ${b} ${s2} ${c} = ${v1} ${s2} ${c} = ${t}`);
},

/* ===== tr.117 – Bài 1: Tính giá trị của biểu thức (có dấu ngoặc) ===== */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức.');
  const a1 = R(120, 210), b1 = R(60, 99), c1 = R(20, b1 - 10);   // a) a − (b − c)
  const n2 = R(3, 9), t2 = R(3, 9), m2 = n2 * t2, k2 = R(3, 9);  // b) k × (m : n)
  return q.done(`<div class="b42-two">
      <div class="b42-ex"><span class="b42-let">a)</span>${a1} − (${b1} − ${c1}) = ${q.num(a1 - (b1 - c1))}</div>
      <div class="b42-ex"><span class="b42-let">b)</span>${k2} × (${m2} : ${n2}) = ${q.num(k2 * t2)}</div>
    </div>`,
    `a) ${b1} − ${c1} = ${b1 - c1};  b) ${m2} : ${n2} = ${t2}`);
},

/* ===== tr.117 – Bài 2: Chọn số là giá trị của mỗi biểu thức (cá heo và quả bóng) ===== */
() => {
  const q = Q(2, 'Chọn số là giá trị của mỗi biểu thức dưới đây.');
  let ex = null;
  for (let g = 0; g < 60; g++){
    const kA = R(3, 9), dA = R(4, 12), bA = R(20, 60), aA = bA + dA;         // A: k × (a − b)
    const hB = R(20, 60), yB = R(5, hB - 4), xB = 2 * hB - yB;               // B: (x + y) : 2
    const sC = R(20, 45), pC = R(5, sC - 4), qC = sC - pC, mC = pick([3, 4]); // C: (p + q) × m
    const nD = R(10, 40), zD = R(20, 80);                                    // D: z + n × 2
    const cand = [
      {L: 'A', t: `${kA} × (${aA} − ${bA})`, v: kA * dA},
      {L: 'B', t: `(${xB} + ${yB}) : 2`, v: hB},
      {L: 'C', t: `(${pC} + ${qC}) × ${mC}`, v: sC * mC},
      {L: 'D', t: `${zD} + ${nD} × 2`, v: zD + 2 * nD}
    ];
    if (new Set(cand.map(e => e.v)).size === 4){ ex = cand; break; }
  }
  if (!ex) ex = [
    {L: 'A', t: '4 × (54 − 44)', v: 40},
    {L: 'B', t: '(33 + 67) : 2', v: 50},
    {L: 'C', t: '(25 + 45) × 3', v: 210},
    {L: 'D', t: '52 + 24 × 2', v: 100}
  ];
  const opts = ex.map(e => String(e.v)).sort(() => Math.random() - .5);
  const balls = ex.map(e => e.v).sort(() => Math.random() - .5);
  return q.done(`<div class="b42-vals">${balls.map(v => ART.b42Ball(v)).join('')}</div>
    <div class="b42-row">${ex.map(e => `<div class="b42-cell">${ART.b42Dolphin(e.t)}
      <div class="b42-cap">${e.L}</div>
      <div class="fill-line">${q.pick(String(e.v), opts)}</div></div>`).join('')}</div>`,
    ex.map(e => `${e.L}: ${e.t} = ${e.v}`).join(';  '));
},

/* ===== tr.117 – Bài 3: Tính giá trị của biểu thức (tính thuận tiện) ===== */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  const a1 = R(15, 90), b1 = R(11, 89), c1 = 100 - b1;
  const p2 = R(3, 9), pr = pick([[5, 2], [2, 5]]);
  return q.done(`<div class="b42-two">
      <div class="b42-ex"><span class="b42-let">a)</span>${a1} + ${b1} + ${c1} = ${q.num(a1 + 100)}</div>
      <div class="b42-ex"><span class="b42-let">b)</span>${p2} × ${pr[0]} × ${pr[1]} = ${q.num(p2 * 10)}</div>
    </div>
    <div class="hint-line">Có thể nhóm hai số cho kết quả tròn trăm, tròn chục để tính thuận tiện hơn.</div>`,
    `a) ${b1} + ${c1} = 100 nên ${a1} + ${b1} + ${c1} = ${a1} + 100 = ${a1 + 100};  `
      + `b) ${pr[0]} × ${pr[1]} = 10 nên ${p2} × ${pr[0]} × ${pr[1]} = ${p2} × 10 = ${p2 * 10}`);
},

/* ===== tr.117 – Bài 4: đóng bánh xe ô tô vào hộp rồi vào thùng ===== */
() => {
  const q = Q(4, '');
  const perBox = pick([4, 5, 6]), perCase = pick([6, 8, 10]), cases = R(6, 12);
  const boxes = perCase * cases, total = perBox * boxes;
  return q.done(`<p class="wordq">Người ta đóng ${total} bánh xe ô tô vào các hộp, mỗi hộp ${perBox} bánh xe.
      Sau đó đóng các hộp vào các thùng, mỗi thùng ${perCase} hộp.
      Hỏi người ta đóng được bao nhiêu thùng bánh xe ô tô như vậy?</p>
    <div class="bullet">Số hộp bánh xe đóng được là ${q.num(boxes)} hộp.</div>
    <div class="bullet">Số thùng bánh xe đóng được là ${q.num(cases)} thùng.</div>`,
    `${total} : ${perBox} = ${boxes} (hộp);  ${boxes} : ${perCase} = ${cases} (thùng)`);
},

/* ===== tr.117 – Bài 5: Đố em! chọn dấu để biểu thức có giá trị bé nhất ===== */
() => {
  const q = Q(5, 'Đố em!<br>Chọn dấu phép tính "+ ; − ; × ; :" thích hợp thay cho dấu "?" '
    + 'để được biểu thức có giá trị bé nhất.');
  const n = R(4, 9);
  const OP = ['+', '−', '×', ':'];
  return q.done(`<div class="b42-puz">${n} × (${n} ${q.pick('−', OP)} ${n})</div>
      <div class="fill-line">Khi đó biểu thức có giá trị bé nhất là ${q.num(0, 1)}.</div>`,
    `${n} × (${n} + ${n}) = ${2 * n * n};  ${n} × (${n} − ${n}) = 0;  `
      + `${n} × (${n} × ${n}) = ${n * n * n};  ${n} × (${n} : ${n}) = ${n}.  Bé nhất là 0 nên chọn dấu "−".`);
},
];
