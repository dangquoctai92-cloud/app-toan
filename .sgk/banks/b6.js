/* ==================== BÀI 6: BẢNG NHÂN 4, BẢNG CHIA 4 (SGK tr.19, 20) ====================
   hoạt động tr.19: bài 1, 2, 3   ·   hoạt động tr.20: bài 1, 2   ·   luyện tập tr.20: bài 1, 2
=========================================================================================== */

ART.arrow = `<svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg>`;

ART.b6Loco = `<svg viewBox="0 0 110 76" class="loco-art">
  <path d="M10 50V24h32V10h54v40z" fill="#e2483c" stroke="#a02e25" stroke-width="3"/>
  <rect x="52" y="18" width="20" height="16" rx="3" fill="#fdf3d8" stroke="#a02e25" stroke-width="2.4"/>
  <rect x="18" y="4" width="12" height="20" rx="3" fill="#c03a2e" stroke="#a02e25" stroke-width="2.4"/>
  <circle cx="34" cy="60" r="10" fill="#f6d97a" stroke="#8a6a17" stroke-width="3"/>
  <circle cx="76" cy="60" r="10" fill="#f6d97a" stroke="#8a6a17" stroke-width="3"/>
</svg>`;

ART.b6Wagon = (t, L) => `<span class="wagon"><svg viewBox="0 0 120 76">
  <rect x="6" y="10" width="108" height="38" rx="6" fill="#ffe08a" stroke="#c99b23" stroke-width="3"/>
  <path d="M6 30h108" stroke="#c99b23" stroke-width="1.6" opacity=".5"/>
  <circle cx="30" cy="60" r="10" fill="#f6d97a" stroke="#8a6a17" stroke-width="3"/>
  <circle cx="90" cy="60" r="10" fill="#f6d97a" stroke="#8a6a17" stroke-width="3"/>
</svg><b>${t}</b><i>${L}</i></span>`;

BANKS.b6 = [

/* ===== hoạt động tr.19 – Bài 1: Số ? (bảng nhân 4) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - .5).slice(0, 6).sort((a, b) => a - b);
  const r1 = ks.map(() => '<td>4</td>').join('');
  const r2 = ks.map(k => `<td>${k}</td>`).join('');
  const r3 = ks.map((k, i) => i === 0 ? `<td>${4 * k}</td>` : `<td>${q.num(4 * k, 2)}</td>`).join('');
  return q.done(`<div class="tbl-wrap"><table class="tbl blue">
    <tr><th rowspan="2">×</th>${r1}</tr><tr>${r2}</tr><tr><th></th>${r3}</tr>
  </table></div>`, 'Dùng bảng nhân 4');
},

/* ===== hoạt động tr.19 – Bài 2: Nêu các số còn thiếu (đếm thêm 4, bớt 4) ===== */
() => {
  const q = Q(2, 'Nêu các số còn thiếu.');
  const hid = () => [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - .5).slice(0, 5);
  const hA = hid(), hB = hid();
  const up = Array.from({length:10}, (_, i) => 4 * (i + 1));
  const dn = Array.from({length:10}, (_, i) => 40 - 4 * i);
  const rowA = up.map((v, i) => hA.includes(i)
    ? `<span class="cnode q">${q.num(v, 2)}</span>` : `<span class="cnode">${v}</span>`).join('');
  const rowB = dn.map((v, i) => hB.includes(i)
    ? `<span class="cnode q">${q.num(v, 2)}</span>` : `<span class="cnode">${v}</span>`).join('');
  return q.done(`<div class="sub-lbl">a)</div><div class="chain pill">${rowA}</div>
    <div class="sub-lbl">b)</div><div class="chain round">${rowB}</div>`,
    'a) đếm thêm 4 · b) đếm bớt 4');
},

/* ===== hoạt động tr.19 – Bài 3: Bài toán bánh xe ô tô ===== */
() => {
  const q = Q(3, '');
  const xe = R(4, 10);
  return q.done(`<p class="wordq">Mỗi ô tô con có 4 bánh xe. Hỏi ${xe} ô tô như vậy có bao nhiêu bánh xe?</p>
    <div class="fill-line">${xe} ô tô có ${q.num(4 * xe)} bánh xe.</div>`,
    `4 × ${xe} = ${4 * xe} (bánh xe)`);
},

/* ===== hoạt động tr.20 – Bài 1: Số ? (bảng chia 4) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - .5).slice(0, 6);
  const r1 = ks.map(k => `<td>${4 * k}</td>`).join('');
  const r2 = ks.map(() => '<td>4</td>').join('');
  const r3 = ks.map((k, i) => i === 0 ? `<td>${k}</td>` : `<td>${q.num(k, 2)}</td>`).join('');
  return q.done(`<div class="tbl-wrap"><table class="tbl pink">
    <tr><th rowspan="2">:</th>${r1}</tr><tr>${r2}</tr><tr><th></th>${r3}</tr>
  </table></div>`, 'Dùng bảng chia 4');
},

/* ===== hoạt động tr.20 – Bài 2: Toa tàu nào ghi phép tính có kết quả lớn nhất? ===== */
() => {
  const q = Q(2, 'Toa tàu nào ghi phép tính có kết quả lớn nhất?');
  const L = ['A', 'B', 'C', 'D'];
  const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - .5).slice(0, 4);
  const toa = ks.map((k, i) => ({L:L[i], k, t:`${4 * k} : 4`}));
  const best = toa.reduce((a, b) => b.k > a.k ? b : a).L;
  return q.done(`<div class="train-row">${ART.b6Loco}${toa.map(x => ART.b6Wagon(x.t, x.L)).join('')}</div>
    <div class="fill-line">Toa tàu ${q.pick(best, L)} ghi phép tính có kết quả lớn nhất.</div>`,
    toa.map(x => `${x.t} = ${x.k}`).join(' · '));
},

/* ===== luyện tập tr.20 – Bài 1: Số ? (sơ đồ nhân 4 và chia 4) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const lbl = ['a)', 'b)', 'c)'];
  const ks = [2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - .5).slice(0, 3);
  const ms = [2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - .5).slice(0, 3);
  const parts = ks.map((k, i) => `<div>
    <div class="sub-lbl">${lbl[i]}</div>
    <div class="flow"><span class="fnode circle">4</span>
      <span class="farrow"><i>× ${k}</i>${ART.arrow}</span>
      <span class="fnode sq">${q.num(4 * k)}</span></div>
    <div class="flow"><span class="fnode sq">${4 * ms[i]}</span>
      <span class="farrow"><i>: 4</i>${ART.arrow}</span>
      <span class="fnode circle">${q.num(ms[i], 2)}</span></div>
  </div>`).join('');
  return q.done(`<div class="flow-col">${parts}</div>`,
    ks.map((k, i) => `4 × ${k} = ${4 * k};  ${4 * ms[i]} : 4 = ${ms[i]}`).join(' · '));
},

/* ===== luyện tập tr.20 – Bài 2: Bài toán chia bánh vào hộp ===== */
() => {
  const q = Q(2, '');
  const hop = R(3, 10), tong = hop * 4;
  return q.done(`<p class="wordq">Có ${tong} chiếc bánh chia vào các hộp, mỗi hộp 4 chiếc bánh.
      Hỏi được bao nhiêu hộp bánh?</p>
    <div class="fill-line">Được ${q.num(hop)} hộp bánh.</div>`,
    `${tong} : 4 = ${hop} (hộp)`);
},
];
