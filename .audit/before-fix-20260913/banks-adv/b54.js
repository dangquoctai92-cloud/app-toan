/*CSS
.b54adv-eq{margin:7px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#eef4ff;
  border:2.5px solid #b8cdf0;border-radius:12px;padding:8px 14px;display:flex;flex-wrap:wrap;
  align-items:center;gap:6px}
.b54adv-eq b{color:#d63384;margin-right:2px}
.b54adv-chain{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:8px 0}
.b54adv-node{background:#dff0c8;border:2.5px solid #94c46a;border-radius:11px;padding:6px 10px;
  font-size:17px;font-weight:800;color:#2f5320;white-space:nowrap}
.b54adv-node.q{background:#fff5d6;border-color:#e8c05a}
.b54adv-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin:8px 0}
.b54adv-card{min-width:78px;padding:7px 6px;border:3px solid #f0a35a;border-radius:10px;
  background:#fff8ef;text-align:center}
.b54adv-card b{display:block;color:#c2541b;font-size:15px}
.b54adv-card span{display:block;font-size:19px;font-weight:800;color:#7a3b10}
.b54adv-step{margin:5px 0;font-size:17px;font-weight:700}
.b54adv-sub{font-weight:800;margin:9px 0 2px}
.b54adv-let{color:#d63384;font-weight:800;margin-right:5px}
.cmp-row .b54adv-side{min-width:158px;font-size:17px;font-weight:700;text-align:left}
CSS*/

/* ===== NÂNG CAO — Bài 54: Phép cộng trong phạm vi 10 000 ===== */

/* viết số có nhóm ba chữ số cách nhau: 6 428 */
const b54advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b54advLen = v => String(v).length;

/* trộn một mảng bằng R() */
const b54advTron = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){ const j = R(0, i); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
};

/* một dãy số dạng chuỗi ô */
const b54advDay = items => `<div class="b54adv-chain">${items.map(x =>
  `<span class="b54adv-node${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

ADV.b54 = [

/* 1. Toán ngược: tìm số hạng chưa biết */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho dấu ? trong mỗi phép cộng sau.');
  const a1 = R(1200, 5000), b1 = R(1000, 9999 - a1), s1 = a1 + b1;
  const a2 = R(1200, 4000), b2 = R(1500, 9999 - a2), s2 = a2 + b2;
  const a3 = R(20, 45) * 100, b3 = R(10, Math.floor((9900 - a3) / 100)) * 100, s3 = a3 + b3;
  const t4 = R(50, 95) * 100, h4 = R(10, 40) * 100;
  return q.done(`<div class="b54adv-eq"><b>a)</b> ${b54advSp(a1)} + ${q.num(b1, b54advLen(b1))}
      = ${b54advSp(s1)}</div>
    <div class="b54adv-eq"><b>b)</b> ${q.num(a2, b54advLen(a2))} + ${b54advSp(b2)}
      = ${b54advSp(s2)}</div>
    <div class="b54adv-eq"><b>c)</b> ${b54advSp(a3)} + ${q.num(b3, b54advLen(b3))}
      = ${b54advSp(s3)}</div>
    <div class="fill-line">Tổng của hai số là ${b54advSp(t4)}, một số hạng là ${b54advSp(h4)}.
      Số hạng kia là ${q.num(t4 - h4, b54advLen(t4 - h4))}</div>
    <div class="hint-line">Muốn tìm một số hạng, ta lấy tổng trừ đi số hạng kia.</div>`,
    `a) ${b54advSp(s1)} − ${b54advSp(a1)} = ${b54advSp(b1)}.  `
    + `b) ${b54advSp(s2)} − ${b54advSp(b2)} = ${b54advSp(a2)}.  `
    + `c) ${b54advSp(s3)} − ${b54advSp(a3)} = ${b54advSp(b3)}.  `
    + `${b54advSp(t4)} − ${b54advSp(h4)} = ${b54advSp(t4 - h4)}.`);
},

/* 2. Dãy số và quy luật */
() => {
  const q = Q(2, 'Tìm quy luật rồi viết tiếp các số của mỗi dãy số sau.');
  const bA = pick([100, 200, 500, 1000]);
  const stA = R(10, Math.floor((9900 - 6 * bA) / 100)) * 100;
  const A = [0, 1, 2, 3, 4, 5, 6].map(i => stA + i * bA);
  const bB = pick([100, 200]);
  const stB = R(10, 40) * 100;
  const B = [0, 1, 2, 3, 4, 5].map(i => stB + bB * i * (i + 1) / 2);
  const rowA = b54advDay(A.map((v, i) =>
    i < 4 ? {h:b54advSp(v)} : {q:1, h:q.num(v, b54advLen(v))}));
  const rowB = b54advDay(B.map((v, i) =>
    i < 4 ? {h:b54advSp(v)} : {q:1, h:q.num(v, b54advLen(v))}));
  return q.done(`<div class="b54adv-sub"><span class="b54adv-let">a)</span>Dãy số cách đều:</div>
    ${rowA}
    <div class="b54adv-sub"><span class="b54adv-let">b)</span>Dãy số có khoảng cách tăng dần:</div>
    ${rowB}
    <div class="hint-line">Ở dãy b), khoảng cách giữa hai số liền nhau lần lượt là
      ${bB}, ${bB * 2}, ${bB * 3}, … Mỗi lần khoảng cách lại tăng thêm ${bB} đơn vị.</div>`,
    `a) Mỗi số hơn số liền trước ${b54advSp(bA)} đơn vị.  `
    + `b) ${b54advSp(B[3])} + ${b54advSp(bB * 4)} = ${b54advSp(B[4])};  `
    + `${b54advSp(B[4])} + ${b54advSp(bB * 5)} = ${b54advSp(B[5])}.`);
},

/* 3. So sánh hai biểu thức */
() => {
  const q = Q(3, 'So sánh hai biểu thức rồi điền dấu thích hợp.');
  const a = R(1000, 4000), b = R(1000, 4000);
  let c = R(1000, 4000);
  for (let g = 0; g < 40 && c === b; g++) c = R(1000, 4000);
  if (c === b) c = b + 100;
  const e = R(1500, 5000), f = R(1000, Math.min(9500 - e, 4000));
  const k = R(1, 3);
  const gg = k === 1 ? e + f : k === 2 ? e + f + R(10, 400) : e + f - R(10, 400);
  const p = R(1000, 4500), q1 = R(1000, 4500), r = R(1000, 4500), s = R(1000, 4500);
  const rows = [
    {t:`${b54advSp(a)} + ${b54advSp(b)}`, p:`${b54advSp(b)} + ${b54advSp(a)}`, d:'='},
    {t:`${b54advSp(a)} + ${b54advSp(b)}`, p:`${b54advSp(a)} + ${b54advSp(c)}`,
      d:b > c ? '>' : b < c ? '<' : '='},
    {t:`${b54advSp(e)} + ${b54advSp(f)}`, p:`${b54advSp(gg)}`,
      d:e + f > gg ? '>' : e + f < gg ? '<' : '='},
    {t:`${b54advSp(p)} + ${b54advSp(q1)}`, p:`${b54advSp(r)} + ${b54advSp(s)}`,
      d:p + q1 > r + s ? '>' : p + q1 < r + s ? '<' : '='}
  ];
  return q.done(rows.map(x =>
      `<div class="cmp-row"><span class="side b54adv-side">${x.t}</span>${q.sign(x.d)}<span
        class="side b54adv-side">${x.p}</span></div>`).join('')
    + `<div class="hint-line">Hai dòng đầu em không cần tính kết quả: khi đổi chỗ các số hạng thì
      tổng không thay đổi; hai tổng có chung một số hạng thì tổng nào có số hạng kia lớn hơn
      sẽ lớn hơn. Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `Dòng 1: đổi chỗ các số hạng nên hai tổng bằng nhau.  `
    + `Dòng 2: so sánh ${b54advSp(b)} với ${b54advSp(c)}.  `
    + `Dòng 3: ${b54advSp(e)} + ${b54advSp(f)} = ${b54advSp(e + f)}.  `
    + `Dòng 4: ${b54advSp(p + q1)} và ${b54advSp(r + s)}.`);
},

/* 4. Tính bằng cách thuận tiện (nhóm các số hạng) */
() => {
  const q = Q(4, 'Tính bằng cách thuận tiện nhất.');
  const p1 = R(1, 9);
  const x1 = R(1, 3) * 1000 + p1 * 100;
  const x3 = R(1, 2) * 1000 + (10 - p1) * 100;
  const x2 = R(10, 30) * 100;
  const tongX = x1 + x3;
  const p2 = R(1, 9), p3 = R(1, 9);
  const y1 = R(1, 2) * 1000 + p2 * 100, y4 = 1000 + (10 - p2) * 100;
  const y2 = R(1, 2) * 1000 + p3 * 100, y3 = 1000 + (10 - p3) * 100;
  const tongY1 = y1 + y4, tongY2 = y2 + y3;
  return q.done(`<div class="b54adv-sub"><span class="b54adv-let">a)</span>${b54advSp(x1)}
      + ${b54advSp(x2)} + ${b54advSp(x3)}</div>
    <div class="b54adv-step">${b54advSp(x1)} + ${b54advSp(x3)}
      = ${q.num(tongX, b54advLen(tongX))}</div>
    <div class="b54adv-step">Giá trị của biểu thức là ${q.num(tongX + x2, b54advLen(tongX + x2))}</div>
    <div class="b54adv-sub"><span class="b54adv-let">b)</span>${b54advSp(y1)} + ${b54advSp(y2)}
      + ${b54advSp(y3)} + ${b54advSp(y4)}</div>
    <div class="b54adv-step">${b54advSp(y1)} + ${b54advSp(y4)}
      = ${q.num(tongY1, b54advLen(tongY1))}</div>
    <div class="b54adv-step">${b54advSp(y2)} + ${b54advSp(y3)}
      = ${q.num(tongY2, b54advLen(tongY2))}</div>
    <div class="b54adv-step">Giá trị của biểu thức là
      ${q.num(tongY1 + tongY2, b54advLen(tongY1 + tongY2))}</div>
    <div class="hint-line">Hãy tìm hai số hạng cộng lại được số tròn nghìn rồi ghép chúng
      với nhau, phép tính sẽ dễ nhẩm hơn.</div>`,
    `a) ${b54advSp(x1)} + ${b54advSp(x3)} = ${b54advSp(tongX)}; `
    + `${b54advSp(tongX)} + ${b54advSp(x2)} = ${b54advSp(tongX + x2)}.  `
    + `b) ${b54advSp(tongY1)} + ${b54advSp(tongY2)} = ${b54advSp(tongY1 + tongY2)}.`);
},

/* 5. Bài toán ba bước */
() => {
  const q = Q(5, '');
  const m1 = R(1200, 2000), hon2 = R(100, 500), hon3 = R(100, 600);
  const m2 = m1 + hon2, m3 = m2 + hon3;
  return q.done(`<p class="wordq">Một trường tiểu học tổ chức quyên góp sách cho thư viện.
      Khối lớp Một quyên góp được ${b54advSp(m1)} quyển sách. Khối lớp Hai quyên góp được nhiều hơn
      khối lớp Một ${hon2} quyển sách. Khối lớp Ba quyên góp được nhiều hơn khối lớp Hai
      ${hon3} quyển sách. Hỏi cả ba khối quyên góp được bao nhiêu quyển sách?</p>
    <div class="b54adv-step">Khối lớp Hai quyên góp được ${q.num(m2, b54advLen(m2))} quyển sách.</div>
    <div class="b54adv-step">Khối lớp Ba quyên góp được ${q.num(m3, b54advLen(m3))} quyển sách.</div>
    <div class="b54adv-step">Cả ba khối quyên góp được
      ${q.num(m1 + m2 + m3, b54advLen(m1 + m2 + m3))} quyển sách.</div>
    <div class="hint-line">Muốn biết cả ba khối quyên góp được bao nhiêu quyển sách, trước hết
      em phải tìm số sách của khối lớp Hai, rồi tìm số sách của khối lớp Ba.</div>`,
    `${b54advSp(m1)} + ${hon2} = ${b54advSp(m2)} (quyển);  `
    + `${b54advSp(m2)} + ${hon3} = ${b54advSp(m3)} (quyển);  `
    + `${b54advSp(m1)} + ${b54advSp(m2)} + ${b54advSp(m3)} = ${b54advSp(m1 + m2 + m3)} (quyển).`);
},

/* 6. Chọn hai tấm thẻ để được tổng lớn nhất, tổng bé nhất */
() => {
  const q = Q(6, 'Trên mỗi tấm thẻ có ghi một số. Hãy trả lời các câu hỏi sau.');
  const pool = b54advTron([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
  const val = pool.slice(0, 4).map(x => x * 100);
  const L = ['A', 'B', 'C', 'D'];
  const sap = val.slice().sort((a, b) => b - a);
  const lonNhat = sap[0] + sap[1], beNhat = sap[2] + sap[3];
  const tong4 = val[0] + val[1] + val[2] + val[3];
  const cap = L.filter((_, i) => val[i] === sap[0] || val[i] === sap[1]).sort().join(',');
  return q.done(`<div class="b54adv-cards">${val.map((v, i) =>
      `<div class="b54adv-card"><b>${L[i]}</b><span>${b54advSp(v)}</span></div>`).join('')}</div>
    <div class="fill-line">Tổng lớn nhất của hai tấm thẻ là ${q.num(lonNhat, b54advLen(lonNhat))}</div>
    <div class="fill-line">Đó là hai tấm thẻ ${q.pick(cap, L)}</div>
    <div class="fill-line">Tổng bé nhất của hai tấm thẻ là ${q.num(beNhat, b54advLen(beNhat))}</div>
    <div class="fill-line">Tổng của cả bốn số trên các tấm thẻ là ${q.num(tong4, b54advLen(tong4))}</div>
    <div class="hint-line">Muốn được tổng lớn nhất, em chọn hai số lớn nhất; muốn được tổng bé nhất,
      em chọn hai số bé nhất.</div>`,
    `Hai số lớn nhất là ${b54advSp(sap[0])} và ${b54advSp(sap[1])}: `
    + `${b54advSp(sap[0])} + ${b54advSp(sap[1])} = ${b54advSp(lonNhat)}.  `
    + `Hai số bé nhất là ${b54advSp(sap[3])} và ${b54advSp(sap[2])}: `
    + `${b54advSp(sap[2])} + ${b54advSp(sap[3])} = ${b54advSp(beNhat)}.  `
    + `Tổng bốn số là ${b54advSp(tong4)}.`);
},
];
