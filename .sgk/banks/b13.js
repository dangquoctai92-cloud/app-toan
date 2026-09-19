/* ============ BÀI 13: TÌM THÀNH PHẦN TRONG PHÉP NHÂN, PHÉP CHIA (SGK tr.39, 40, 41) ============
   · Hoạt động tr.39 : bài 1 (Tìm thừa số theo mẫu), bài 2 (Số ? – bảng Thừa số/Tích)
   · Hoạt động tr.40 : bài 3 (bài toán ca-bin)
   · Hoạt động tr.41 : bài 1 (Tìm số bị chia, tìm số chia theo mẫu), bài 2 (Số ? – bảng chia)
   · Luyện tập  tr.41: bài 1 (Số ? – sơ đồ mũi tên), bài 2 (bài toán đĩa cam)
=============================================================================================== */

ART.b13Arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.6"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

ART.b13Cabin = n => {
  let g = '';
  for (let i = 0; i < n; i++){
    const x = 34 + i * (352 / n), y = 96 - i * 7;
    g += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})">
      <path d="M10 0v10" stroke="#3b3b3b" stroke-width="2.4"/>
      <path d="M2 10h16" stroke="#3b3b3b" stroke-width="2.6"/>
      <rect x="1" y="12" width="18" height="26" rx="4" fill="#f4c530" stroke="#8a6a12" stroke-width="2"/>
      <rect x="4" y="16" width="12" height="12" rx="2" fill="#cfe9f7" stroke="#8a6a12" stroke-width="1.4"/>
    </g>`;
  }
  return `<svg viewBox="0 0 420 150" class="b13-cab">
    <rect x="0" y="0" width="420" height="150" rx="10" fill="#d9eef7"/>
    <path d="M0 120q70-46 150-30t130 22 140-20v58H0z" fill="#8fc98a"/>
    <path d="M14 112L406 44" stroke="#5a5a5a" stroke-width="2.4" fill="none"/>${g}</svg>`;
};

ART.b13Dish = (n, per) => {
  const cols = Math.min(n, 5), rows = Math.ceil(n / cols);
  const W = 400, H = rows * 84 + 10;
  let g = '';
  for (let i = 0; i < n; i++){
    const cx = 44 + (i % cols) * ((W - 88) / Math.max(cols - 1, 1)), cy = 44 + Math.floor(i / cols) * 84;
    let f = '';
    for (let k = 0; k < per; k++){
      const a = (k * 360 / per - 90) * Math.PI / 180;
      f += `<circle cx="${(cx + 17 * Math.cos(a)).toFixed(1)}" cy="${(cy + 12 * Math.sin(a)).toFixed(1)}"
        r="7" fill="#ff9f2e" stroke="#cf6f16" stroke-width="1.6"/>`;
    }
    g += `<ellipse cx="${cx.toFixed(1)}" cy="${cy}" rx="34" ry="22" fill="#eef4fa" stroke="#8296ad" stroke-width="2"/>${f}`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="b13-dish">${g}</svg>`;
};

BANKS.b13 = [

/* ===== Hoạt động tr.39 – Bài 1: Tìm thừa số (theo mẫu) ===== */
() => {
  const q = Q(1, 'Tìm thừa số (theo mẫu).');
  const m1 = R(3, 9), m2 = R(3, 9);
  const a1 = R(2, 9), b1 = R(2, 9);
  const a2 = R(2, 9), b2 = R(2, 9);
  const a3 = R(2, 9), b3 = R(2, 9);
  const html = noteBox(`Mẫu: <b>?</b> × ${m2} = ${m1 * m2}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${m1 * m2} : ${m2} = ${m1}.`)
    + `<div class="b13-eq"><span class="lb">a)</span>${q.num(a1)}<span class="op">×</span>${b1}<span class="op">=</span>${a1 * b1}</div>
       <div class="b13-eq"><span class="lb">b)</span>${q.num(a2)}<span class="op">×</span>${b2}<span class="op">=</span>${a2 * b2}</div>
       <div class="b13-eq"><span class="lb">c)</span>${a3}<span class="op">×</span>${q.num(b3)}<span class="op">=</span>${a3 * b3}</div>`;
  return q.done(html,
    `${a1 * b1} : ${b1} = ${a1};  ${a2 * b2} : ${b2} = ${a2};  ${a3 * b3} : ${a3} = ${b3}`);
},

/* ===== Hoạt động tr.39 – Bài 2: Số ? (bảng Thừa số – Thừa số – Tích) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const HIDE = [-1, 0, 1, 1, 0];                       // -1: không ẩn · 0: ẩn thừa số trên · 1: ẩn thừa số dưới
  const cols = HIDE.map(() => ({a:R(2, 9), b:R(2, 9)}));
  const r1 = cols.map((c, i) => HIDE[i] === 0 ? `<td>${q.num(c.a, 2)}</td>` : `<td>${c.a}</td>`).join('');
  const r2 = cols.map((c, i) => HIDE[i] === 1 ? `<td>${q.num(c.b, 2)}</td>` : `<td>${c.b}</td>`).join('');
  const r3 = cols.map(c => `<td>${c.a * c.b}</td>`).join('');
  const html = `<div class="tbl-wrap"><table class="tbl green">
      <tr><th>Thừa số</th>${r1}</tr>
      <tr><th>Thừa số</th>${r2}</tr>
      <tr><th>Tích</th>${r3}</tr>
    </table></div>
    <div class="hint-line">Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia.</div>`;
  return q.done(html,
    cols.map((c, i) => HIDE[i] === 0 ? `${c.a * c.b} : ${c.b} = ${c.a}`
      : HIDE[i] === 1 ? `${c.a * c.b} : ${c.a} = ${c.b}` : '').filter(Boolean).join(';  '));
},

/* ===== Hoạt động tr.40 – Bài 3: bài toán ca-bin ===== */
() => {
  const q = Q(3, '');
  const cabin = R(4, 8), each = R(3, 8), all = cabin * each;
  return q.done(ART.b13Cabin(cabin) +
    `<p class="wordq">${cabin} ca-bin chở tất cả ${all} người. Biết rằng số người ở mỗi ca-bin như nhau.
       Hỏi mỗi ca-bin chở bao nhiêu người?</p>
     <div class="fill-line">Mỗi ca-bin chở ${q.num(each)} người.</div>`,
    `${all} : ${cabin} = ${each} (người)`);
},

/* ===== Hoạt động tr.41 – Bài 1: a) Tìm số bị chia · b) Tìm số chia (theo mẫu) ===== */
() => {
  const q = Q(1, 'a) Tìm số bị chia (theo mẫu).');
  const ma = R(3, 9), mb = R(3, 9);
  const A = [[R(2, 9), R(2, 9)], [R(2, 9), R(2, 9)], [R(2, 9), R(2, 9)]];
  const mc = R(3, 9), md = R(3, 9);
  const Bp = [[R(2, 9), R(2, 9)], [R(2, 9), R(2, 9)], [R(2, 9), R(2, 9)]];
  const partA = noteBox(`Mẫu: <b>?</b> : ${mb} = ${ma}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${ma} × ${mb} = ${ma * mb}.`)
    + A.map(([x, y]) =>
      `<div class="b13-eq">${q.num(x * y)}<span class="op">:</span>${y}<span class="op">=</span>${x}</div>`).join('');
  const partB = '<div class="sub-lbl">b) Tìm số chia (theo mẫu).</div>'
    + noteBox(`Mẫu: ${mc * md} : <b>?</b> = ${mc}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${mc * md} : ${mc} = ${md}.`)
    + Bp.map(([x, y]) =>
      `<div class="b13-eq">${x * y}<span class="op">:</span>${q.num(y)}<span class="op">=</span>${x}</div>`).join('');
  return q.done(partA + partB,
    'Muốn tìm số bị chia, ta lấy thương nhân với số chia. Muốn tìm số chia, ta lấy số bị chia chia cho thương.');
},

/* ===== Hoạt động tr.41 – Bài 2: Số ? (bảng Số bị chia – Số chia – Thương) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const HIDE = [-1, 0, 1, 0, 1];                       // 0: ẩn số bị chia · 1: ẩn số chia
  const cols = HIDE.map(() => { const d = R(2, 9), t = R(2, 10); return {d, t, n:d * t}; });
  const r1 = cols.map((c, i) => HIDE[i] === 0 ? `<td>${q.num(c.n)}</td>` : `<td>${c.n}</td>`).join('');
  const r2 = cols.map((c, i) => HIDE[i] === 1 ? `<td>${q.num(c.d, 2)}</td>` : `<td>${c.d}</td>`).join('');
  const r3 = cols.map(c => `<td>${c.t}</td>`).join('');
  const html = `<div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Số bị chia</th>${r1}</tr>
      <tr><th>Số chia</th>${r2}</tr>
      <tr><th>Thương</th>${r3}</tr>
    </table></div>
    <div class="hint-line">Số bị chia = thương × số chia · Số chia = số bị chia : thương</div>`;
  return q.done(html,
    cols.map((c, i) => HIDE[i] === 0 ? `${c.t} × ${c.d} = ${c.n}`
      : HIDE[i] === 1 ? `${c.n} : ${c.t} = ${c.d}` : '').filter(Boolean).join(';  '));
},

/* ===== Luyện tập tr.41 – Bài 1: Số ? (sơ đồ mũi tên) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const COL = ['#cfe8b8', '#ffe08a', '#ffc4d2', '#a9dcf5'];
  const items = [];
  {
    const x = R(2, 9), k = R(2, 5);  items.push({x, k, op:'×', v:x * k});          // a) ? × k = v
  }
  {
    const v = R(2, 9), k = R(2, 6);  items.push({x:v * k, k, op:':', v});          // b) ? : k = v
  }
  {
    const v = R(2, 9), k = R(2, 6);  items.push({x:v * k, k, op:':', v});          // c) ? : k = v
  }
  {
    const x = R(2, 9), k = R(2, 5);  items.push({x, k, op:'×', v:x * k});          // d) ? × k = v
  }
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = items.map((it, i) =>
    `<div class="b13-flow"><span class="lb">${L[i]}</span>
      <span class="fnode sq" style="background:#fff">${q.num(it.x)}</span>
      ${ART.b13Arrow(it.op + ' ' + it.k)}
      <span class="fnode circle" style="background:${COL[i]}">${it.v}</span></div>`).join('');
  return q.done(html,
    items.map((it, i) => `${L[i]} ${it.x} ${it.op} ${it.k} = ${it.v}`).join(';  '));
},

/* ===== Luyện tập tr.41 – Bài 2: bài toán đĩa cam ===== */
() => {
  const q = Q(2, '');
  const per = R(3, 7), dia = R(3, 9), all = per * dia;
  return q.done(`<p class="wordq">Có ${all} quả cam xếp vào các đĩa, mỗi đĩa ${per} quả.
      Hỏi xếp được mấy đĩa cam như vậy?</p>
    ${ART.b13Dish(dia, per)}
    <div class="fill-line">Xếp được ${q.num(dia)} đĩa cam như vậy.</div>`,
    `${all} : ${per} = ${dia} (đĩa)`);
},
];
