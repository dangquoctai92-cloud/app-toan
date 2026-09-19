/* ===== NÂNG CAO — Bài 55: Phép trừ trong phạm vi 10 000 ===== */

/* viết số có nhóm ba chữ số cách nhau: 5 274 */
const b55advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b55advLen = v => String(v).length;

/* trộn một mảng bằng R() */
const b55advTron = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){ const j = R(0, i); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
};

/* một dãy số dạng chuỗi ô */
const b55advDay = items => `<div class="b55adv-chain">${items.map(x =>
  `<span class="b55adv-node${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

/* sơ đồ ô – mũi tên có ghi phép tính */
const b55advSo = items => `<div class="b55adv-chain">${items.map((x, i) =>
  (x.arr ? `<span class="b55adv-arr"><i>${x.arr}</i><s>&rarr;</s></span>`
         : `<span class="b55adv-node${x.q ? ' q' : ''}">${x.h}</span>`)).join('')}</div>`;

ADV.b55 = [

/* 1. Toán ngược: tìm số bị trừ, số trừ */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho dấu ? trong mỗi phép trừ sau.');
  const b1 = R(1000, 4000), c1 = R(1000, 9999 - b1), a1 = b1 + c1;
  const a2 = R(4000, 9999), c2 = R(1000, a2 - 1000);
  const b3 = R(10, 35) * 100, c3 = R(10, Math.floor((9900 - b3) / 100)) * 100, a3 = b3 + c3;
  const sbt = R(60, 98) * 100, hieu = R(10, 45) * 100;
  return q.done(`<div class="b55adv-eq"><b>a)</b> ${q.num(a1, b55advLen(a1))} &minus; ${b55advSp(b1)}
      = ${b55advSp(c1)}</div>
    <div class="b55adv-eq"><b>b)</b> ${b55advSp(a2)} &minus; ${q.num(a2 - c2, b55advLen(a2 - c2))}
      = ${b55advSp(c2)}</div>
    <div class="b55adv-eq"><b>c)</b> ${q.num(a3, b55advLen(a3))} &minus; ${b55advSp(b3)}
      = ${b55advSp(c3)}</div>
    <div class="fill-line">Số bị trừ là ${b55advSp(sbt)}, hiệu là ${b55advSp(hieu)}.
      Số trừ là ${q.num(sbt - hieu, b55advLen(sbt - hieu))}</div>
    <div class="hint-line">Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.
      Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.</div>`,
    `a) ${b55advSp(c1)} + ${b55advSp(b1)} = ${b55advSp(a1)}.  `
    + `b) ${b55advSp(a2)} − ${b55advSp(c2)} = ${b55advSp(a2 - c2)}.  `
    + `c) ${b55advSp(c3)} + ${b55advSp(b3)} = ${b55advSp(a3)}.  `
    + `${b55advSp(sbt)} − ${b55advSp(hieu)} = ${b55advSp(sbt - hieu)}.`);
},

/* 2. Dãy số giảm dần và quy luật */
() => {
  const q = Q(2, 'Tìm quy luật rồi viết tiếp các số của mỗi dãy số sau.');
  const bA = pick([100, 200, 500, 1000]);
  const stA = R(6 * bA / 100 + 5, 99) * 100;
  const A = [0, 1, 2, 3, 4, 5, 6].map(i => stA - i * bA);
  const bB = pick([100, 200]);
  const stB = R(45, 95) * 100;
  const B = [0, 1, 2, 3, 4, 5].map(i => stB - bB * i * (i + 1) / 2);
  const rowA = b55advDay(A.map((v, i) =>
    i < 4 ? {h:b55advSp(v)} : {q:1, h:q.num(v, b55advLen(v))}));
  const rowB = b55advDay(B.map((v, i) =>
    i < 4 ? {h:b55advSp(v)} : {q:1, h:q.num(v, b55advLen(v))}));
  return q.done(`<div class="b55adv-sub"><span class="b55adv-let">a)</span>Dãy số cách đều:</div>
    ${rowA}
    <div class="b55adv-sub"><span class="b55adv-let">b)</span>Dãy số có khoảng cách tăng dần:</div>
    ${rowB}
    <div class="hint-line">Ở dãy b), mỗi số kém số liền trước lần lượt là
      ${bB}, ${bB * 2}, ${bB * 3}, … đơn vị. Mỗi lần khoảng cách lại tăng thêm ${bB} đơn vị.</div>`,
    `a) Mỗi số kém số liền trước ${b55advSp(bA)} đơn vị.  `
    + `b) ${b55advSp(B[3])} − ${b55advSp(bB * 4)} = ${b55advSp(B[4])};  `
    + `${b55advSp(B[4])} − ${b55advSp(bB * 5)} = ${b55advSp(B[5])}.`);
},

/* 3. So sánh hai biểu thức */
() => {
  const q = Q(3, 'So sánh hai biểu thức rồi điền dấu thích hợp.');
  const a = R(5000, 9999), b = R(1000, 4000);
  let c = R(1000, 4000);
  for (let g = 0; g < 40 && c === b; g++) c = R(1000, 4000);
  if (c === b) c = b + 100;
  const e = R(4000, 9999), f = R(1000, e - 1000), hi = e - f;
  const k = R(1, 3);
  const gg = k === 1 ? hi : k === 2 ? hi + R(10, 300) : hi - R(10, Math.min(300, hi - 1));
  const A3 = R(6000, 9999), B3 = R(1000, 2500), C3 = R(1000, 2500);
  const p = R(5000, 9999), q1 = R(1000, 4000), r = R(5000, 9999), s = R(1000, 4000);
  const rows = [
    {t:`${b55advSp(a)} &minus; ${b55advSp(b)}`, p:`${b55advSp(a)} &minus; ${b55advSp(c)}`,
      d:b < c ? '>' : b > c ? '<' : '='},
    {t:`${b55advSp(e)} &minus; ${b55advSp(f)}`, p:`${b55advSp(gg)}`,
      d:hi > gg ? '>' : hi < gg ? '<' : '='},
    {t:`${b55advSp(A3)} &minus; ${b55advSp(B3)} &minus; ${b55advSp(C3)}`,
      p:`${b55advSp(A3)} &minus; (${b55advSp(B3)} + ${b55advSp(C3)})`, d:'='},
    {t:`${b55advSp(p)} &minus; ${b55advSp(q1)}`, p:`${b55advSp(r)} &minus; ${b55advSp(s)}`,
      d:p - q1 > r - s ? '>' : p - q1 < r - s ? '<' : '='}
  ];
  return q.done(rows.map(x =>
      `<div class="cmp-row"><span class="side b55adv-side">${x.t}</span>${q.sign(x.d)}<span
        class="side b55adv-side">${x.p}</span></div>`).join('')
    + `<div class="hint-line">Dòng đầu em không cần tính: cùng một số bị trừ, số trừ nào bé hơn
      thì hiệu lớn hơn. Dòng thứ ba cũng vậy: trừ liên tiếp hai số cũng chính là trừ đi tổng của
      hai số đó. Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `Dòng 1: cùng số bị trừ ${b55advSp(a)}, so sánh ${b55advSp(b)} với ${b55advSp(c)}.  `
    + `Dòng 2: ${b55advSp(e)} − ${b55advSp(f)} = ${b55advSp(hi)}.  `
    + `Dòng 3: hai biểu thức bằng nhau (đều bằng ${b55advSp(A3 - B3 - C3)}).  `
    + `Dòng 4: ${b55advSp(p - q1)} và ${b55advSp(r - s)}.`);
},

/* 4. Bài toán ba bước */
() => {
  const q = Q(4, '');
  const co = R(70, 95) * 100, sang = R(15, 25) * 100, it = R(2, 8) * 100;
  const chieu = sang - it, hai = sang + chieu, lai = co - hai;
  return q.done(`<p class="wordq">Một cửa hàng có ${b55advSp(co)} kg gạo. Buổi sáng cửa hàng bán được
      ${b55advSp(sang)} kg gạo, buổi chiều bán được ít hơn buổi sáng ${it} kg gạo.
      Hỏi sau hai buổi bán, cửa hàng còn lại bao nhiêu ki-lô-gam gạo?</p>
    <div class="b55adv-step">Buổi chiều cửa hàng bán được ${q.num(chieu, b55advLen(chieu))} kg gạo.</div>
    <div class="b55adv-step">Cả hai buổi cửa hàng bán được ${q.num(hai, b55advLen(hai))} kg gạo.</div>
    <div class="b55adv-step">Cửa hàng còn lại ${q.num(lai, b55advLen(lai))} kg gạo.</div>
    <div class="hint-line">Em hãy tìm số gạo bán buổi chiều trước, sau đó tìm số gạo bán cả hai buổi,
      cuối cùng mới tìm số gạo còn lại.</div>`,
    `${b55advSp(sang)} − ${it} = ${b55advSp(chieu)} (kg);  `
    + `${b55advSp(sang)} + ${b55advSp(chieu)} = ${b55advSp(hai)} (kg);  `
    + `${b55advSp(co)} − ${b55advSp(hai)} = ${b55advSp(lai)} (kg).`);
},

/* 5. Sơ đồ mũi tên – toán ngược và toán xuôi */
() => {
  const q = Q(5, 'Tìm số thích hợp cho mỗi ô trống.');
  const st = R(1500, 5000), th = R(500, 2000), bt = R(500, 2500);
  const mid = st + th, end = mid - bt;
  const X = R(5000, 8500), c = R(1000, 3000), d = R(500, 1400);
  const m2 = X - c, e2 = m2 + d;
  return q.done(`<div class="b55adv-sub"><span class="b55adv-let">a)</span>Đi ngược từ kết quả:</div>
    ${b55advSo([{q:1, h:q.num(st, b55advLen(st))}, {arr:`+ ${b55advSp(th)}`},
      {q:1, h:q.num(mid, b55advLen(mid))}, {arr:`&minus; ${b55advSp(bt)}`},
      {h:b55advSp(end)}])}
    <div class="b55adv-sub"><span class="b55adv-let">b)</span>Đi xuôi từ số đã cho:</div>
    ${b55advSo([{h:b55advSp(X)}, {arr:`&minus; ${b55advSp(c)}`},
      {q:1, h:q.num(m2, b55advLen(m2))}, {arr:`+ ${b55advSp(d)}`},
      {q:1, h:q.num(e2, b55advLen(e2))}])}
    <div class="hint-line">Ở câu a) em làm ngược lại: gặp dấu trừ thì cộng lại,
      gặp dấu cộng thì trừ đi.</div>`,
    `a) ${b55advSp(end)} + ${b55advSp(bt)} = ${b55advSp(mid)};  `
    + `${b55advSp(mid)} − ${b55advSp(th)} = ${b55advSp(st)}.  `
    + `b) ${b55advSp(X)} − ${b55advSp(c)} = ${b55advSp(m2)};  `
    + `${b55advSp(m2)} + ${b55advSp(d)} = ${b55advSp(e2)}.`);
},

/* 6. Chọn hai tấm thẻ để được hiệu lớn nhất, hiệu bé nhất */
() => {
  const q = Q(6, 'Trên mỗi tấm thẻ có ghi một số. Hãy trả lời các câu hỏi sau.');
  const kc = b55advTron([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, 3).map(x => x * 100);
  const v0 = R(10, 30) * 100;
  const sap = [v0, v0 + kc[0], v0 + kc[0] + kc[1], v0 + kc[0] + kc[1] + kc[2]];
  const val = b55advTron(sap);
  const L = ['A', 'B', 'C', 'D'];
  const beNhat = Math.min(kc[0], kc[1], kc[2]);
  const lonNhat = sap[3] - sap[0];
  const cap = L.filter((_, i) => val[i] === sap[0] || val[i] === sap[3]).sort().join(',');
  return q.done(`<div class="b55adv-cards">${val.map((v, i) =>
      `<div class="b55adv-card"><b>${L[i]}</b><span>${b55advSp(v)}</span></div>`).join('')}</div>
    <div class="fill-line">Hiệu lớn nhất của hai tấm thẻ là ${q.num(lonNhat, b55advLen(lonNhat))}</div>
    <div class="fill-line">Đó là hai tấm thẻ ${q.pick(cap, L)}</div>
    <div class="fill-line">Hiệu bé nhất của hai tấm thẻ là ${q.num(beNhat, b55advLen(beNhat))}</div>
    <div class="fill-line">Số lớn nhất hơn số bé thứ hai là
      ${q.num(sap[3] - sap[1], b55advLen(sap[3] - sap[1]))}</div>
    <div class="hint-line">Muốn được hiệu lớn nhất, em lấy số lớn nhất trừ đi số bé nhất.
      Muốn được hiệu bé nhất, em xếp bốn số theo thứ tự từ bé đến lớn rồi tìm hai số gần nhau nhất.</div>`,
    `Xếp bốn số từ bé đến lớn: ${sap.map(b55advSp).join(' ; ')}.  `
    + `${b55advSp(sap[3])} − ${b55advSp(sap[0])} = ${b55advSp(lonNhat)};  `
    + `hiệu bé nhất là ${b55advSp(beNhat)};  `
    + `${b55advSp(sap[3])} − ${b55advSp(sap[1])} = ${b55advSp(sap[3] - sap[1])}.`);
},
];
