/* ============ BÀI 38: BIỂU THỨC SỐ. TÍNH GIÁ TRỊ CỦA BIỂU THỨC SỐ (SGK tr.103 – 107) ============
   hoạt động tr.103–104 : bài 1 (Tính giá trị của biểu thức theo mẫu), bài 2 (Chọn số là giá trị – tổ ong)
   hoạt động tr.105     : bài 1 (nhân, chia trước – cộng, trừ sau), bài 2 (Chọn số là giá trị – mèo câu cá)
   hoạt động tr.106–107 : bài 1 (biểu thức có dấu ngoặc), bài 2 (Chọn số là giá trị – thuyền và bến)
   luyện tập tr.107     : bài 1 (giá trị lớn nhất, bé nhất), bài 2 (bài toán hộp bút màu),
                          bài 3 (ba thùng nước mắm và tính thuận tiện)
================================================================================================== */

ART.b38Hive = n => `<svg viewBox="0 0 92 84" class="b38-hive">
  <ellipse cx="46" cy="18" rx="24" ry="10" fill="#f5c33b" stroke="#c08a12" stroke-width="2"/>
  <ellipse cx="46" cy="33" rx="32" ry="11" fill="#f7cf58" stroke="#c08a12" stroke-width="2"/>
  <ellipse cx="46" cy="48" rx="34" ry="11" fill="#f5c33b" stroke="#c08a12" stroke-width="2"/>
  <ellipse cx="46" cy="63" rx="29" ry="10" fill="#f7cf58" stroke="#c08a12" stroke-width="2"/>
  <ellipse cx="46" cy="70" rx="7" ry="5" fill="#8a5a1e"/>
  <text x="46" y="43" text-anchor="middle" font-size="18" font-weight="800" fill="#4a3200">${n}</text>
</svg>`;

ART.b38Fish = n => `<svg viewBox="0 0 118 62" class="b38-fish">
  <path d="M22 31q24-23 62-17 22 4 26 17-4 13-26 17-38 6-62-17z" fill="#f6d24a" stroke="#d18a12" stroke-width="2.2"/>
  <path d="M22 31L4 13v36z" fill="#f0952e" stroke="#d18a12" stroke-width="2.2"/>
  <path d="M62 14q10-9 18-2" fill="#f0952e" stroke="#d18a12" stroke-width="2"/>
  <circle cx="96" cy="26" r="3.2" fill="#2b2b2b"/>
  <text x="58" y="38" text-anchor="middle" font-size="18" font-weight="800" fill="#4a3200">${n}</text>
</svg>`;

ART.b38Dock = n => `<svg viewBox="0 0 132 72" class="b38-dock">
  <path d="M8 8h116v14H30v28h94v14H8z" fill="#9dc6e0" stroke="#5f93b5" stroke-width="2.2"/>
  <text x="66" y="43" text-anchor="middle" font-size="19" font-weight="800" fill="#173b4f">${n}</text>
</svg>`;

ART.b38Boat = c => `<svg viewBox="0 0 124 50" class="b38-boat">
  <path d="M4 28h116l-16 18H20z" fill="${c}" stroke="#7a5227" stroke-width="2.2"/>
  <path d="M24 28v-9h56l10 9z" fill="#e6eef5" stroke="#7a8fa0" stroke-width="2"/>
  <path d="M32 10h36v7H32z" fill="#f0a12e" stroke="#c07a16" stroke-width="1.8"/>
</svg>`;

ART.b38Bear = `<svg viewBox="0 0 72 80" class="b38-mini">
  <circle cx="18" cy="18" r="8" fill="#b98a5a" stroke="#7a5227" stroke-width="2"/>
  <circle cx="52" cy="18" r="8" fill="#b98a5a" stroke="#7a5227" stroke-width="2"/>
  <ellipse cx="35" cy="32" rx="21" ry="18" fill="#c9975f" stroke="#7a5227" stroke-width="2.2"/>
  <ellipse cx="35" cy="40" rx="10" ry="8" fill="#e6d3a8" stroke="#7a5227" stroke-width="1.6"/>
  <ellipse cx="35" cy="36" rx="4" ry="3" fill="#4a3524"/>
  <circle cx="27" cy="28" r="2.4" fill="#2b2b2b"/><circle cx="43" cy="28" r="2.4" fill="#2b2b2b"/>
  <ellipse cx="35" cy="66" rx="20" ry="12" fill="#c9975f" stroke="#7a5227" stroke-width="2.2"/>
</svg>`;

ART.b38Cat = c => `<svg viewBox="0 0 72 84" class="b38-mini">
  <path d="M18 24l2-15 13 9zM54 24l-2-15-13 9z" fill="${c}" stroke="#5b4a6a" stroke-width="2"/>
  <circle cx="36" cy="29" r="16" fill="${c}" stroke="#5b4a6a" stroke-width="2.2"/>
  <circle cx="30" cy="27" r="2.4" fill="#2b2b2b"/><circle cx="42" cy="27" r="2.4" fill="#2b2b2b"/>
  <path d="M32 35h8l-4 4z" fill="#e2739a"/>
  <ellipse cx="36" cy="62" rx="17" ry="17" fill="${c}" stroke="#5b4a6a" stroke-width="2.2"/>
  <path d="M52 68q16 4 10-15" fill="none" stroke="#5b4a6a" stroke-width="3.4" stroke-linecap="round"/>
</svg>`;

ART.b38Can = l => `<svg viewBox="0 0 72 104" class="b38-can">
  <rect x="9" y="22" width="54" height="74" rx="8" fill="#cfe9f7" stroke="#5f93b5" stroke-width="2.4"/>
  <rect x="27" y="6" width="18" height="17" rx="4" fill="#a9d8ee" stroke="#5f93b5" stroke-width="2.4"/>
  <path d="M14 32h44v12H14z" fill="none" stroke="#8fc0da" stroke-width="2"/>
  <text x="36" y="70" text-anchor="middle" font-size="16" font-weight="800" fill="#123e55">${l}
    <tspan font-style="italic"> l</tspan></text>
</svg>`;

BANKS.b38 = [

/* ===== tr.103 – Hoạt động Bài 1: Tính giá trị của biểu thức (theo mẫu) ===== */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức (theo mẫu).');
  const m1 = R(40, 90), m2 = R(11, 30), m3 = R(5, 20);
  const x = R(20, 60), y = R(2, 15), z = R(10, 40);
  const a = R(30, 70), b = R(20, 50), c = R(10, 40);
  return q.done(noteBox(`Mẫu: ${m1} − ${m2} + ${m3} = ${m1 - m2} + ${m3}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;= ${m1 - m2 + m3}.`)
    + `<div class="b38-ex"><span class="b38-let">a)</span>${x} − ${y} + ${z} = ${q.num(x - y)} + ${z}
        <span class="l2">= ${q.num(x - y + z)}</span></div>
      <div class="b38-ex"><span class="b38-let">b)</span>${a} + ${b} − ${c} = ${q.num(a + b)} − ${c}
        <span class="l2">= ${q.num(a + b - c)}</span></div>`,
    `Biểu thức chỉ có cộng, trừ thì tính lần lượt từ trái sang phải.`);
},

/* ===== tr.104 – Hoạt động Bài 2: Chọn số là giá trị của mỗi biểu thức (tổ ong) ===== */
() => {
  const q = Q(2, 'Chọn số là giá trị của mỗi biểu thức.');
  const n1 = R(3, 9), n2 = R(3, 9), vB = n1 * n2;            // B: phép nhân
  const t = R(2, 9), d = R(2, 9), aD = t * d;
  let kD = R(5, 20);
  if (t + kD === vB) kD += 1;                                // D: chia rồi cộng, khác giá trị của B
  const vD = t + kD;
  const rest = [];
  for (let g = 0; g < 200 && rest.length < 2; g++){
    const v = R(20, 60);
    if (v !== vB && v !== vD && !rest.includes(v)) rest.push(v);
  }
  while (rest.length < 2) rest.push(rest.length ? vB + 101 : vB + 100);
  const vA = rest[0], vC = rest[1];

  const bA = R(2, 9), cA = R(5, 15), aA = vA + cA - bA;       // A: a + b − c
  const cC = R(5, Math.min(19, vC - 1)), bC = R(10, 30), aC = vC + bC - cC;   // C: a − b + c

  const ex = [
    {L:'A', t:`${aA} + ${bA} − ${cA}`, v:vA},
    {L:'B', t:`${n1} × ${n2}`, v:vB},
    {L:'C', t:`${aC} − ${bC} + ${cC}`, v:vC},
    {L:'D', t:`${aD} : ${d} + ${kD}`, v:vD}
  ];
  const opts = ex.map(e => String(e.v)).sort(() => Math.random() - .5);
  const hives = ex.map(e => e.v).sort(() => Math.random() - .5);

  return q.done(`<div class="b38-vals">${hives.map(v => ART.b38Hive(v)).join('')}</div>
    <div class="b38-row">${ex.map(e => `<div class="b38-cell">${ART.b38Bear}
      <span class="b38-sign">${e.t}</span>
      <div class="fill-line"><span class="b38-let">${e.L}.</span>${q.pick(String(e.v), opts)}</div>
    </div>`).join('')}</div>`,
    ex.map(e => `${e.L}: ${e.t} = ${e.v}`).join(';  '));
},

/* ===== tr.105 – Hoạt động Bài 1: Tính giá trị của biểu thức (nhân, chia trước) ===== */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức (theo mẫu).');
  const md = R(2, 9), mt = R(2, 9), mb = md * mt, ma = R(15, 40);   // mẫu: ma + mb : md
  const d1 = R(2, 9), t1 = R(2, 9), m1 = d1 * t1, p1 = R(2, 5);     // a) m : d × p
  const a2 = R(15, 40), b2 = R(3, 9), c2 = R(3, 9);                 // b) a + b × c
  const d3 = R(2, 9), t3 = R(2, 9), b3 = d3 * t3, a3 = R(t3 + 5, 60); // c) a − b : d
  return q.done(noteBox(`Mẫu:<br>${ma} + ${mb} : ${md} = ${ma} + ${mb / md}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= ${ma + mb / md}.`)
    + `<div class="b38-ex"><span class="b38-let">a)</span>${m1} : ${d1} × ${p1} = ${q.num(t1)} × ${p1}
        <span class="l2">= ${q.num(t1 * p1)}</span></div>
      <div class="b38-ex"><span class="b38-let">b)</span>${a2} + ${b2} × ${c2} = ${a2} + ${q.num(b2 * c2)}
        <span class="l2">= ${q.num(a2 + b2 * c2)}</span></div>
      <div class="b38-ex"><span class="b38-let">c)</span>${a3} − ${b3} : ${d3} = ${a3} − ${q.num(t3)}
        <span class="l2">= ${q.num(a3 - t3)}</span></div>`,
    'Trong biểu thức có nhân, chia thì làm nhân, chia trước, cộng, trừ sau.');
},

/* ===== tr.105 – Hoạt động Bài 2: Chọn số là giá trị của mỗi biểu thức (mèo câu cá) ===== */
() => {
  const q = Q(2, 'Chọn số là giá trị của mỗi biểu thức.');
  const vs = [];
  for (let g = 0; g < 200 && vs.length < 4; g++){
    const v = R(20, 55);
    if (!vs.includes(v)) vs.push(v);
  }
  while (vs.length < 4) vs.push(60 + vs.length);
  const [vA, vB, vC, vD] = vs;

  const bA = R(2, 9), cA = R(5, 15), aA = vA + cA - bA;              // A: a + b − c
  const bB = R(2, 6), cB = R(2, 6), aB = vB + bB * cB;               // B: a − b × c
  const cC = R(2, 9), tC = R(2, 9), bC = cC * tC, aC = vC - tC;      // C: a + b : c
  const bD = R(10, 25), cD = R(5, 15), aD = vD + bD + cD;            // D: a − b − c

  const ex = [
    {L:'A', t:`${aA} + ${bA} − ${cA}`, v:vA},
    {L:'B', t:`${aB} − ${bB} × ${cB}`, v:vB},
    {L:'C', t:`${aC} + ${bC} : ${cC}`, v:vC},
    {L:'D', t:`${aD} − ${bD} − ${cD}`, v:vD}
  ];
  const opts = ex.map(e => String(e.v)).sort(() => Math.random() - .5);
  const fish = ex.map(e => e.v).sort(() => Math.random() - .5);
  const COLORS = ['#c9a3e0', '#f2f2f2', '#b9c6e8', '#a9998c'];

  return q.done(`<div class="b38-vals">${fish.map(v => ART.b38Fish(v)).join('')}</div>
    <div class="b38-row">${ex.map((e, i) => `<div class="b38-cell">${ART.b38Cat(COLORS[i])}
      <span class="b38-sign">${e.t}</span>
      <div class="fill-line"><span class="b38-let">${e.L}.</span>${q.pick(String(e.v), opts)}</div>
    </div>`).join('')}</div>`,
    ex.map(e => `${e.L}: ${e.t} = ${e.v}`).join(';  '));
},

/* ===== tr.106 – Hoạt động Bài 1: Tính giá trị của biểu thức có dấu ngoặc (theo mẫu) ===== */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức (theo mẫu).');
  const mp = R(12, 30), mq = R(2, mp - 2), ms = mp - mq, mt = R(2, 9), mm = ms * mt;  // mẫu: mm : (mp − mq)
  const p1 = R(2, 7), q1 = R(2, 7), s1 = p1 + q1, t1 = R(2, 9), m1 = s1 * t1;         // a) m : (p + q)
  const k2 = R(2, 9), p2 = R(6, 15), q2 = R(2, p2 - 1);                               // b) k × (p − q)
  const a3 = R(20, 60), b3 = R(2, 15);                                                // c) a − (a − b)
  return q.done(noteBox(`Mẫu: ${mm} : (${mp} − ${mq}) = ${mm} : ${ms}<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= ${mt}.`)
    + `<div class="b38-ex"><span class="b38-let">a)</span>${m1} : (${p1} + ${q1}) = ${m1} : ${q.num(s1)}
        <span class="l2">= ${q.num(t1)}</span></div>
      <div class="b38-ex"><span class="b38-let">b)</span>${k2} × (${p2} − ${q2}) = ${k2} × ${q.num(p2 - q2)}
        <span class="l2">= ${q.num(k2 * (p2 - q2))}</span></div>
      <div class="b38-ex"><span class="b38-let">c)</span>${a3} − (${a3} − ${b3}) = ${a3} − ${q.num(a3 - b3)}
        <span class="l2">= ${q.num(b3)}</span></div>`,
    'Biểu thức có dấu ngoặc thì thực hiện các phép tính trong ngoặc trước.');
},

/* ===== tr.107 – Hoạt động Bài 2: Chọn số là giá trị của mỗi biểu thức (thuyền và bến) ===== */
() => {
  const q = Q(2, 'Chọn số là giá trị của mỗi biểu thức.');
  const vA = R(3, 9);
  let vD = R(3, 9);
  for (let g = 0; g < 30 && vD === vA; g++) vD = R(3, 9);
  if (vD === vA) vD = vA === 9 ? 3 : vA + 1;
  const vB = R(10, 29);
  const vC = R(30, 60);

  const cA = R(2, 9), sA = vA * cA, aA = R(1, sA - 1), bA = sA - aA;    // (a + b) : c
  const yB = R(5, 25), zB = R(5, 25), xB = vB + yB + zB;                // x − (y + z)
  const mC = R(5, vC - 5);                                             // m + (n − m)
  const dD = R(2, 9), pD = vD * dD, rD = R(2, 15), qD = rD + dD;        // p : (q − r)

  const ex = [
    {t:`(${aA} + ${bA}) : ${cA}`, v:vA},
    {t:`${xB} − (${yB} + ${zB})`, v:vB},
    {t:`${mC} + (${vC} − ${mC})`, v:vC},
    {t:`${pD} : (${qD} − ${rD})`, v:vD}
  ].sort(() => Math.random() - .5);
  const opts = ex.map(e => String(e.v)).sort(() => Math.random() - .5);
  const docks = ex.map(e => e.v).sort(() => Math.random() - .5);
  const COLORS = ['#f2b8c6', '#8fd18f', '#8fd18f', '#f2b8c6'];

  return q.done(`<div class="b38-vals">${docks.map(v => ART.b38Dock(v)).join('')}</div>
    <div class="b38-row">${ex.map((e, i) => `<div class="b38-cell">${ART.b38Boat(COLORS[i])}
      <span class="b38-sign blue">${e.t}</span>
      <div class="fill-line">${q.pick(String(e.v), opts)}</div>
    </div>`).join('')}</div>`,
    ex.map(e => `${e.t} = ${e.v}`).join(';  '));
},

/* ===== tr.107 – Luyện tập Bài 1: Biểu thức nào có giá trị lớn nhất, bé nhất? ===== */
() => {
  const q = Q(1, 'Biểu thức nào có giá trị lớn nhất? Biểu thức nào có giá trị bé nhất?');
  let k = 5, a = 6, b = 2, d = 4, t = 6, m = 16;
  for (let g = 0; g < 80; g++){
    k = R(3, 9); a = R(4, 9); b = R(2, a - 1);
    d = R(2, 9); t = R(2, 9); m = d * R(2, 9);
    const vs = [k * (a - b), k * a - b, m / d + t, m + t];
    if (new Set(vs).size === 4) break;
  }
  const n = d * t;
  const ex = [
    {L:'A', t:`${k} × (${a} − ${b})`, v:k * (a - b)},
    {L:'B', t:`${k} × ${a} − ${b}`, v:k * a - b},
    {L:'C', t:`(${m} + ${n}) : ${d}`, v:(m + n) / d},
    {L:'D', t:`${m} + ${n} : ${d}`, v:m + n / d}
  ];
  const L = ex.map(e => e.L);
  let hi = ex[0], lo = ex[0];
  ex.forEach(e => { if (e.v > hi.v) hi = e; if (e.v < lo.v) lo = e; });
  return q.done(`<div class="b38-row">${ex.map(e =>
      `<div class="b38-cell"><span class="b38-sign blue">${e.t}</span>
        <div class="b38-let">${e.L}</div></div>`).join('')}</div>
    <div class="fill-line">Biểu thức có giá trị lớn nhất là: ${q.pick(hi.L, L)}</div>
    <div class="fill-line">Biểu thức có giá trị bé nhất là: ${q.pick(lo.L, L)}</div>`,
    ex.map(e => `${e.L} = ${e.v}`).join(';  '));
},

/* ===== tr.107 – Luyện tập Bài 2: Bài toán hộp bút màu ===== */
() => {
  const q = Q(2, '');
  const hop = R(3, 6), cho = R(1, hop - 1), moi = pick([10, 12, 15, 20]);
  return q.done(`<p class="wordq">Mai có ${hop} hộp bút màu, Mai cho Mi ${cho} hộp.
      Hỏi Mai còn lại bao nhiêu chiếc bút màu? Biết rằng mỗi hộp có ${moi} chiếc bút màu.</p>
    <div class="fill-line">Mai còn lại ${q.num((hop - cho) * moi)} chiếc bút màu.</div>`,
    `(${hop} − ${cho}) × ${moi} = ${hop - cho} × ${moi} = ${(hop - cho) * moi} (chiếc)`);
},

/* ===== tr.107 – Luyện tập Bài 3: Ba thùng nước mắm · tính giá trị của biểu thức ===== */
() => {
  const q = Q(3, '');
  const b = R(15, 85), c = 100 - b, a = R(30, 95);
  const a1 = R(110, 190), b1 = R(15, 85), c1 = 100 - b1;
  const a2 = R(210, 290), b2 = R(15, 85), c2 = 100 - b2;
  return q.done(`<div class="sub-lbl">a) Cả ba thùng có bao nhiêu lít nước mắm?</div>
    <div class="b38-vals">${ART.b38Can(a)}${ART.b38Can(b)}${ART.b38Can(c)}</div>
    <div class="b38-ex"><span class="b38-sign">${a} + ${b} + ${c} = ?</span></div>
    <div class="fill-line">Cả ba thùng có ${q.num(a + b + c)} <i>l</i> nước mắm.</div>
    ${noteBox(`Nhận xét: (${a} + ${b}) + ${c} = ${a} + (${b} + ${c}).`)}
    <div class="sub-lbl">b) Tính giá trị của biểu thức.</div>
    <div class="b38-ex">${a1} + ${b1} + ${c1} = ${q.num(a1 + b1 + c1)}</div>
    <div class="b38-ex">${a2} − ${b2} − ${c2} = ${q.num(a2 - b2 - c2)}</div>`,
    `${b} + ${c} = 100 nên ${a} + ${b} + ${c} = ${a} + 100 = ${a + b + c};  `
      + `${b1} + ${c1} = 100;  ${b2} + ${c2} = 100`);
},
];
