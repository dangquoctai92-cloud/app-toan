/* ===== NÂNG CAO — Bài 5: Bảng nhân 3, bảng chia 3 ===== */

const b5advArrow = `<svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg>`;

const b5advCmpRow = () => {
  const k = R(1, 4);
  if (k === 1){ const a = R(2, 10), b = R(2, 10); return {t:`3 × ${a}`, p:`${3 * b} : 3`, tv:3 * a, pv:b}; }
  if (k === 2){ const a = R(2, 10), b = R(2, 10); return {t:`3 × ${a}`, p:`2 × ${b}`, tv:3 * a, pv:2 * b}; }
  if (k === 3){ const a = R(2, 10), b = R(2, 9), c = R(1, 6); return {t:`${3 * a} : 3`, p:`${3 * b} : 3 + ${c}`, tv:a, pv:b + c}; }
  const a = R(2, 9), b = R(2, 10), c = R(1, 6);
  return {t:`3 × ${a} + ${c}`, p:`3 × ${b}`, tv:3 * a + c, pv:3 * b};
};

ADV.b5 = [

/* 1. Sơ đồ ngược ba bước với bảng nhân 3, bảng chia 3 */
() => {
  const q = Q(1, 'Biết kết quả cuối cùng, hãy tìm các số còn thiếu trong sơ đồ.');
  const s = R(2, 10), base = 3 * s, m = 3 * R(1, 5);
  const t = base + m, e = t / 3;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(s)}</span>
      <span class="farrow"><i>× 3</i>${b5advArrow}</span>
      <span class="fnode circle">${q.num(base)}</span>
      <span class="farrow"><i>+ ${m}</i>${b5advArrow}</span>
      <span class="fnode sq">${q.num(t)}</span>
      <span class="farrow"><i>: 3</i>${b5advArrow}</span>
      <span class="fnode tri">${e}</span>
    </div>
    <div class="hint-line">Làm ngược từ phải sang trái: ${e} × 3 = ... , rồi bớt ${m}, rồi chia cho 3.</div>`,
    `${e} × 3 = ${t};  ${t} − ${m} = ${base};  ${base} : 3 = ${s}`);
},

/* 2. Số vừa có trong bảng nhân 3 vừa có trong bảng nhân 2 */
() => {
  const q = Q(2, 'Suy nghĩ rồi chọn tất cả các số đúng.');
  const dung = [6, 12, 18];
  const sai = [9, 15, 21, 27, 4, 8, 14, 16, 20].sort(() => Math.random() - .5).slice(0, 4);
  const opts = [...dung, ...sai].sort(() => Math.random() - .5).map(String);
  const ans = dung.map(String).sort().join(',');
  return q.done(`<div class="fill-line">a) Những số nào vừa có trong bảng nhân 3, vừa có trong bảng nhân 2?</div>
    ${q.pick(ans, opts)}
    <div class="fill-line">b) Số lớn nhất trong các số vừa tìm được là ${q.num(18)}</div>
    <div class="fill-line">c) Tổng của các số vừa tìm được là ${q.num(36)}</div>`,
    'Bảng nhân 2 có 2; 4; …; 20 · Bảng nhân 3 có 3; 6; …; 30 · Hai bảng cùng có 6; 12 và 18.');
},

/* 3. So sánh giá trị hai biểu thức */
() => {
  const q = Q(3, 'Tính rồi so sánh giá trị hai biểu thức.');
  const rows = Array.from({length:4}, () => b5advCmpRow());
  return q.done(`<div class="two-col"><div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.t}</span>${q.sign(r.tv > r.pv ? '>' : r.tv < r.pv ? '<' : '=')}<span class="side">${r.p}</span></div>`
    ).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(r => `${r.tv} và ${r.pv}`).join(' · '));
},

/* 4. Bài toán ba bước tính */
() => {
  const q = Q(4, '');
  const h1 = R(3, 9), h2 = 3 * h1;
  const bot = R(2, Math.min(10, h2 - 2)), h3 = h2 - bot;
  const tong = h1 + h2 + h3;
  return q.done(`<p class="wordq">Có ba hộp bi. Hộp thứ nhất có ${h1} viên bi. Số bi ở hộp thứ hai gấp
      3 lần số bi ở hộp thứ nhất. Hộp thứ ba có ít hơn hộp thứ hai ${bot} viên bi.</p>
    <div class="fill-line">a) Hộp thứ hai có ${q.num(h2)} viên bi.</div>
    <div class="fill-line">b) Hộp thứ ba có ${q.num(h3)} viên bi.</div>
    <div class="fill-line">c) Cả ba hộp có ${q.num(tong)} viên bi.</div>`,
    `3 × ${h1} = ${h2};  ${h2} − ${bot} = ${h3};  ${h1} + ${h2} + ${h3} = ${tong}`);
},

/* 5. Tìm thành phần chưa biết trong phép nhân, phép chia 3 */
() => {
  const q = Q(5, 'Tìm số thích hợp thay cho dấu ?');
  const xa = R(2, 10), A = 3 * xa;                    // ? × 3 = A
  const kb = R(2, 10), xb = 3 * kb;                   // ? : 3 = kb
  const xc = pick([2, 3, 5]), kc = R(2, 9), C = xc * kc;  // C : ? = kc
  const xd = R(2, 5), D = 9 * xd, Vd = D / 3;         // ? × 3 = D : 3
  return q.done(`<div class="eq-list">
      <div class="eq"><b>a)</b> ${q.num(xa)} <span class="op">×</span> 3 <span class="op">=</span> ${A}</div>
      <div class="eq"><b>b)</b> ${q.num(xb)} <span class="op">:</span> 3 <span class="op">=</span> ${kb}</div>
      <div class="eq"><b>c)</b> ${C} <span class="op">:</span> ${q.num(xc)} <span class="op">=</span> ${kc}</div>
      <div class="eq"><b>d)</b> ${q.num(xd)} <span class="op">×</span> 3 <span class="op">=</span> ${D} <span class="op">:</span> 3</div>
    </div>
    <div class="hint-line">Câu d) hãy tính giá trị vế phải trước.</div>`,
    `a) ${A} : 3 = ${xa} · b) ${kb} × 3 = ${xb} · c) ${C} : ${kc} = ${xc} · d) ${D} : 3 = ${Vd}, ${Vd} : 3 = ${xd}`);
},
];
