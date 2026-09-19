/*CSS
.b64adv-eq{margin:8px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#f3eeff;
  border:2.5px solid #c3b4ea;border-radius:12px;padding:8px 14px;display:flex;flex-wrap:wrap;
  align-items:center;gap:6px}
.b64adv-eq b{color:#d63384;margin-right:2px}
.b64adv-flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;margin:10px 0}
.b64adv-node{min-width:84px;text-align:center;background:#e8f4ff;border:2.6px solid #7fb4e0;
  border-radius:12px;padding:7px 10px;font-size:18px;font-weight:800;color:#1c5a8f}
.b64adv-node.q{background:#fff6da;border-color:#e8c05a}
.b64adv-arr{display:flex;flex-direction:column;align-items:center;color:#c2185b;
  font-size:14px;font-weight:800;line-height:1.2}
.b64adv-arr i{font-style:normal;font-size:21px;line-height:1}
.b64adv-vsub{width:max-content;margin:10px auto;background:#fffdf3;border:2.6px solid #f0c419;
  border-radius:14px;padding:10px 16px}
.b64adv-vrow{display:flex;align-items:center;gap:2px}
.b64adv-vop{width:24px;font-size:22px;font-weight:800;color:#d63384;text-align:center}
.b64adv-cell{min-width:36px;height:40px;display:flex;align-items:center;justify-content:center;
  font-size:22px;font-weight:800;color:#2b3a5a}
.b64adv-cell.gap{min-width:13px}
.b64adv-cell .qin{width:34px;text-align:center;padding-left:2px;padding-right:2px}
.b64adv-vbar{height:3px;background:#2b3a5a;border-radius:2px;margin:4px 0 4px 26px}
CSS*/

/* ===== NÂNG CAO — Bài 64: Phép trừ trong phạm vi 100 000 ===== */

/* viết số theo kiểu sách: 84 758 */
const b64advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* trộn mảng bằng R() (không dùng Math.random cho đáp án) */
const b64advTron = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){ const j = R(0, i); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
};

/* sơ đồ mũi tên: [{h, q, lab}] — lab là phép tính ghi trên mũi tên đứng trước ô đó */
const b64advFlow = items => `<div class="b64adv-flow">${items.map((x, i) =>
  (i ? `<span class="b64adv-arr"><i>&rarr;</i>${x.lab}</span>` : '')
  + `<span class="b64adv-node${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

/* tên các hàng của số có năm chữ số, theo thứ tự viết */
const B64ADV_HANG = ['chục nghìn', 'nghìn', 'trăm', 'chục', 'đơn vị'];

ADV.b64 = [

/* 1. Tìm số bị trừ, số trừ chưa biết (toán ngược) */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho dấu ? trong mỗi phép tính sau.');
  const sp = b64advSp;
  const s1 = R(120, 480) * 100, d1 = R(150, 500) * 100, x1 = s1 + d1;
  const a2 = R(600, 950) * 100, d2 = R(100, 400) * 100, x2 = a2 - d2;
  const p3 = R(400, 700) * 100, q3 = R(100, 300) * 100, s3 = R(50, 200) * 100;
  const x3 = p3 - q3 + s3;
  return q.done(`<div class="b64adv-eq"><b>a)</b> ${q.num(x1, 5)} <span class="op">−</span>
      ${sp(s1)} <span class="op">=</span> ${sp(d1)}</div>
    <div class="b64adv-eq"><b>b)</b> ${sp(a2)} <span class="op">−</span> ${q.num(x2, 5)}
      <span class="op">=</span> ${sp(d2)}</div>
    <div class="b64adv-eq"><b>c)</b> ${q.num(x3, 5)} <span class="op">−</span> ${sp(s3)}
      <span class="op">=</span> ${sp(p3)} <span class="op">−</span> ${sp(q3)}</div>
    <div class="hint-line">Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ. Muốn tìm số trừ,
      ta lấy số bị trừ trừ đi hiệu. Ở câu c) hãy tính giá trị vế phải trước.</div>`,
    `a) ? = ${sp(d1)} + ${sp(s1)} = ${sp(x1)}.  `
    + `b) ? = ${sp(a2)} − ${sp(d2)} = ${sp(x2)}.  `
    + `c) ${sp(p3)} − ${sp(q3)} = ${sp(p3 - q3)}; ? = ${sp(p3 - q3)} + ${sp(s3)} = ${sp(x3)}.`);
},

/* 2. Dãy số giảm dần trong phạm vi 100 000 */
() => {
  const q = Q(2, 'Viết tiếp ba số của mỗi dãy số sau rồi cho biết mỗi số kém số liền trước '
    + 'bao nhiêu đơn vị.');
  const sp = b64advSp;
  const stA = R(85, 99) * 1000, bA = pick([2000, 3000, 4000, 5000]);
  const stB = R(62, 90) * 1000 + R(1, 9) * 100, bB = pick([1100, 1200, 1500, 2000, 2500]);
  const mk = (st, b, i) => st - i * b;
  const row = (st, b) => `<div class="chain pill">` + [0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? `<span class="cnode">${sp(mk(st, b, i))}</span>`
          : `<span class="cnode q">${q.num(mk(st, b, i), 5)}</span>`).join('') + `</div>`;
  const rowA = row(stA, bA), rowB = row(stB, bB);
  const dayA = [0, 1, 2, 3, 4, 5, 6].map(i => sp(mk(stA, bA, i))).join(', ');
  const dayB = [0, 1, 2, 3, 4, 5, 6].map(i => sp(mk(stB, bB, i))).join(', ');
  return q.done(`<div class="sub-lbl">a)</div>${rowA}
    <div class="fill-line">Ở dãy a), mỗi số kém số liền trước ${q.num(bA, 5)} đơn vị.</div>
    <div class="sub-lbl">b)</div>${rowB}
    <div class="fill-line">Ở dãy b), mỗi số kém số liền trước ${q.num(bB, 5)} đơn vị.</div>
    <div class="hint-line">Lấy một số trừ đi số liền sau nó để tìm ra quy luật của dãy số.</div>`,
    `a) ${sp(stA)} − ${sp(mk(stA, bA, 1))} = ${sp(bA)}, dãy số là: ${dayA}.  `
    + `b) ${sp(stB)} − ${sp(mk(stB, bB, 1))} = ${sp(bB)}, dãy số là: ${dayB}.`);
},

/* 3. So sánh giá trị hai biểu thức */
() => {
  const q = Q(3, 'Tính giá trị của mỗi biểu thức rồi điền dấu (&gt;, &lt;, =) thích hợp.');
  const sp = b64advSp;

  const a1 = R(70, 95) * 1000, b1 = R(11, 29) * 1000, c1 = R(5, 18) * 1000;
  const dd = pick([1, 2, 3, 4, 5]) * 1000;
  let e1 = R(0, 1) === 1 ? c1 + dd : c1 - dd;
  if (e1 < 2000) e1 = c1 + dd;
  const t1 = a1 - b1 - c1, u1 = a1 - b1 - e1;

  const p2 = R(52, 99) * 1000 + R(0, 9) * 100, q2 = R(11, 40) * 1000;
  const r2 = R(52, 99) * 1000 + R(0, 9) * 100, s2 = R(11, 40) * 1000;
  const t2 = p2 - q2, u2 = r2 - s2;

  const a3 = R(60, 98) * 1000 + R(0, 9) * 100, b3 = R(10, 25) * 1000, c3 = R(6, 20) * 1000;
  const t3 = a3 - b3 - c3, u3 = a3 - (b3 + c3);

  const dau = (x, y) => x > y ? '>' : x < y ? '<' : '=';
  const rows = [
    {tr: `${sp(a1)} − ${sp(b1)} − ${sp(c1)}`, ph: `${sp(a1)} − ${sp(b1)} − ${sp(e1)}`, d: dau(t1, u1)},
    {tr: `${sp(p2)} − ${sp(q2)}`, ph: `${sp(r2)} − ${sp(s2)}`, d: dau(t2, u2)},
    {tr: `${sp(a3)} − ${sp(b3)} − ${sp(c3)}`, ph: `${sp(a3)} − (${sp(b3)} + ${sp(c3)})`, d: dau(t3, u3)}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.tr}</span>${q.sign(r.d)}<span class="side">${r.ph}</span></div>`).join('')}</div></div>
    <div class="fill-line">Giá trị của biểu thức ${sp(p2)} <span class="op">−</span> ${sp(q2)}
      là ${q.num(t2, 5)}.</div>
    <div class="fill-line">Giá trị của biểu thức ${sp(r2)} <span class="op">−</span> ${sp(s2)}
      là ${q.num(u2, 5)}.</div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =. Một số trừ đi hai số liên tiếp
      thì bằng số đó trừ đi tổng của hai số kia.</div>`,
    `Dòng 1: ${sp(t1)} ${rows[0].d} ${sp(u1)} (cùng trừ đi ${sp(b1)}, số nào trừ đi nhiều hơn `
    + `thì kết quả bé hơn).  Dòng 2: ${sp(p2)} − ${sp(q2)} = ${sp(t2)}; ${sp(r2)} − ${sp(s2)} `
    + `= ${sp(u2)}, nên ${sp(t2)} ${rows[1].d} ${sp(u2)}.  Dòng 3: ${sp(b3)} + ${sp(c3)} `
    + `= ${sp(b3 + c3)}; cả hai biểu thức đều bằng ${sp(t3)} nên điền dấu =.`);
},

/* 4. Bài toán giải bằng ba bước tính */
() => {
  const q = Q(4, '');
  const sp = b64advSp;
  const sang = R(120, 200) * 100;
  const itHon = R(20, 60) * 100;
  const chieu = sang - itHon;
  const banHai = sang + chieu;
  const co = banHai + R(80, 300) * 100;
  const conLai = co - banHai;
  return q.done(`<p class="wordq">Một cửa hàng có ${sp(co)} kg gạo. Buổi sáng cửa hàng bán được
      ${sp(sang)} kg gạo, buổi chiều bán được ít hơn buổi sáng ${sp(itHon)} kg gạo.
      Hỏi sau hai buổi bán, cửa hàng còn lại bao nhiêu ki-lô-gam gạo?</p>
    <div class="bullet">Buổi chiều cửa hàng bán được ${q.num(chieu, 5)} kg gạo.</div>
    <div class="bullet">Cả hai buổi cửa hàng bán được ${q.num(banHai, 5)} kg gạo.</div>
    <div class="bullet">Cửa hàng còn lại ${q.num(conLai, 5)} kg gạo.</div>
    <div class="hint-line">Tìm số gạo bán buổi chiều trước, rồi tìm số gạo bán cả hai buổi,
      sau đó mới tìm số gạo còn lại.</div>`,
    `${sp(sang)} − ${sp(itHon)} = ${sp(chieu)} (kg);  ${sp(sang)} + ${sp(chieu)} = ${sp(banHai)} (kg);  `
    + `${sp(co)} − ${sp(banHai)} = ${sp(conLai)} (kg).`);
},

/* 5. Toán ngược theo sơ đồ mũi tên */
() => {
  const q = Q(5, 'Tìm số thích hợp thay cho dấu ? trong mỗi sơ đồ sau.');
  const sp = b64advSp;
  const x = R(200, 700) * 100, m = R(50, 150) * 100, n = R(30, 120) * 100;
  const gx = x - m, kx = gx + n;
  const y = R(250, 600) * 100, p = R(50, 200) * 100, r = R(60, 200) * 100;
  const gy = y + p, ky = gy - r;
  const soDoA = b64advFlow([
    {q: 1, h: q.num(x, 5)},
    {lab: `− ${sp(m)}`, q: 1, h: q.num(gx, 5)},
    {lab: `+ ${sp(n)}`, h: sp(kx)}
  ]);
  const soDoB = b64advFlow([
    {q: 1, h: q.num(y, 5)},
    {lab: `+ ${sp(p)}`, q: 1, h: q.num(gy, 5)},
    {lab: `− ${sp(r)}`, h: sp(ky)}
  ]);
  return q.done(`<p class="wordq">a) Lấy một số trừ đi ${sp(m)} rồi cộng với ${sp(n)}
      thì được ${sp(kx)}.</p>${soDoA}
    <p class="wordq">b) Lấy một số cộng với ${sp(p)} rồi trừ đi ${sp(r)}
      thì được ${sp(ky)}.</p>${soDoB}
    <div class="hint-line">Hãy làm ngược lại từ kết quả cuối cùng: gặp phép cộng thì làm phép trừ,
      gặp phép trừ thì làm phép cộng.</div>`,
    `a) ${sp(kx)} − ${sp(n)} = ${sp(gx)}; ${sp(gx)} + ${sp(m)} = ${sp(x)}.  `
    + `b) ${sp(ky)} + ${sp(r)} = ${sp(gy)}; ${sp(gy)} − ${sp(p)} = ${sp(y)}.`);
},

/* 6. Suy luận: tìm chữ số bị che trong phép trừ đặt tính */
() => {
  const q = Q(6, 'Tìm chữ số thích hợp thay cho mỗi dấu ? trong phép trừ sau.');
  const sp = b64advSp;
  const A = [], B = [];
  A[0] = R(5, 9); B[0] = R(1, A[0] - 1);
  for (let i = 1; i < 5; i++){ A[i] = R(1, 9); B[i] = R(0, A[i]); }
  const D = A.map((v, i) => v - B[i]);
  const val = arr => arr.reduce((s, d) => s * 10 + d, 0);
  const nA = val(A), nB = val(B), nD = val(D);

  const vt = b64advTron([0, 1, 2, 3, 4]).slice(0, 3);
  const ai = vt[0], bi = vt[1], di = vt[2];

  const o = (v, an) => an ? `<span class="b64adv-cell q">${q.num(v, 1)}</span>`
                          : `<span class="b64adv-cell">${v}</span>`;
  const dong = (arr, an, op) => `<div class="b64adv-vrow"><span class="b64adv-vop">${op}</span>`
    + arr.map((v, i) => (i === 2 ? '<span class="b64adv-cell gap"></span>' : '') + o(v, i === an)).join('')
    + '</div>';

  const giai = [ai, bi, di].slice().sort((u, v) => u - v).map(p => {
    if (p === ai) return `hàng ${B64ADV_HANG[p]}: ? − ${B[p]} = ${D[p]} nên ? = ${D[p]} + ${B[p]} = ${A[p]}`;
    if (p === bi) return `hàng ${B64ADV_HANG[p]}: ${A[p]} − ? = ${D[p]} nên ? = ${A[p]} − ${D[p]} = ${B[p]}`;
    return `hàng ${B64ADV_HANG[p]}: ${A[p]} − ${B[p]} = ${D[p]} nên ? = ${D[p]}`;
  }).join(';  ');

  return q.done(`<div class="b64adv-vsub">${dong(A, ai, '&nbsp;')}${dong(B, bi, '−')}
      <div class="b64adv-vbar"></div>${dong(D, di, '&nbsp;')}</div>
    <div class="fill-line">Số bị trừ là ${q.num(nA, 5)}</div>
    <div class="fill-line">Số trừ là ${q.num(nB, 5)}</div>
    <div class="fill-line">Hiệu là ${q.num(nD, 5)}</div>
    <div class="hint-line">Phép trừ này không phải nhớ, em hãy xét từng hàng: hàng đơn vị,
      hàng chục, hàng trăm, hàng nghìn rồi hàng chục nghìn.</div>`,
    `Xét ${giai}. Vậy phép trừ là ${sp(nA)} − ${sp(nB)} = ${sp(nD)}.`);
},
];
