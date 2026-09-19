/* ===== NÂNG CAO — Bài 9: Bảng nhân 6, bảng chia 6 ===== */

const b9advM6 = [12, 18, 24, 30, 36, 42, 48, 54, 60];

ADV.b9 = [

/* 1. Tìm số theo nhiều điều kiện */
() => {
  const q = Q(1, 'Tìm số thoả mãn tất cả các điều kiện sau.');
  const m = pick(b9advM6);
  const lo = m - R(7, 12), hi = m + R(7, 12);
  return q.done(`<div class="bullet">Số đó là kết quả của một phép nhân trong bảng nhân 6.</div>
    <div class="bullet">Số đó lớn hơn ${lo} và bé hơn ${hi}.</div>
    <div class="bullet">Chữ số hàng đơn vị của số đó là ${m % 10}.</div>
    <div class="fill-line">Số đó là ${q.num(m, 2)}</div>
    <div class="fill-line">Số đó chia cho 6 được ${q.num(m / 6, 2)}</div>`,
    `Trong bảng nhân 6, chỉ có ${m} vừa lớn hơn ${lo}, vừa bé hơn ${hi} và có chữ số hàng đơn vị là ${m % 10}.`);
},

/* 2. Dãy số đếm thêm 6 */
() => {
  const q = Q(2, 'Viết các số còn thiếu vào dãy số sau.');
  const st = pick([6, 12, 18, 24]);
  const hide = [2, 4, 6];
  const seq = Array.from({length:7}, (_, i) => st + i * 6);
  return q.done(`<div class="chain pill">${seq.map((v, i) =>
      `<span class="cnode${hide.includes(i) ? ' q' : ''}">${hide.includes(i) ? q.num(v, 2) : v}</span>`).join('')}</div>
    <div class="fill-line">Hai số liền nhau trong dãy hơn kém nhau ${q.num(6)} đơn vị.</div>
    <div class="fill-line">Số thứ mười của dãy số đó là ${q.num(st + 54, 2)}</div>`,
    `Số thứ mười = ${st} + 6 × 9 = ${st} + 54 = ${st + 54}`);
},

/* 3. So sánh hai biểu thức */
() => {
  const q = Q(3, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(2, 10), b = R(2, 10);
    rows.push({t:`6 × ${a}`, p:`${b} × 6`, l:6 * a, r:6 * b});
  }
  {
    const a = R(2, 10), b = R(2, 10);
    rows.push({t:`${6 * a} : 6`, p:`${5 * b} : 5`, l:a, r:b});
  }
  {
    const a = R(2, 8), b = a + pick([0, 1, 1, 2]);
    rows.push({t:`6 × ${a} + 6`, p:`6 × ${b}`, l:6 * a + 6, r:6 * b});
  }
  {
    const a = R(2, 10), c = Math.max(1, a + pick([-1, 0, 0, 1]));
    rows.push({t:`${6 * a} : 6`, p:`${4 * c} : 4`, l:a, r:c});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính giá trị của mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},

/* 4. Bài toán ngược: tìm số bánh lúc đầu */
() => {
  const q = Q(4, '');
  const ban = R(3, 5), lai = R(3, 5);
  const con = lai * 6, dau = (ban + lai) * 6;
  return q.done(`<p class="wordq">Một cửa hàng bán bánh, mỗi hộp có 6 chiếc bánh. Cửa hàng đã bán hết ${ban} hộp,
      sau đó đếm lại thì còn ${con} chiếc bánh. Hỏi lúc đầu cửa hàng có bao nhiêu chiếc bánh?</p>
    <div class="fill-line">Cửa hàng đã bán ${q.num(ban * 6, 2)} chiếc bánh.</div>
    <div class="fill-line">Lúc đầu cửa hàng có ${q.num(dau, 2)} chiếc bánh.</div>
    <div class="fill-line">Lúc đầu cửa hàng có ${q.num(ban + lai, 2)} hộp bánh.</div>`,
    `6 × ${ban} = ${ban * 6};  ${con} + ${ban * 6} = ${dau};  ${dau} : 6 = ${ban + lai}`);
},

/* 5. Trồng cây cách đều — suy luận về số khoảng */
() => {
  const q = Q(5, '');
  const cay = R(5, 10), p = R(4, 9);
  return q.done(`<p class="wordq">Người ta trồng ${cay} cây thành một hàng thẳng, hai cây liền nhau cách nhau 6 m.</p>
    <div class="fill-line">Hàng cây đó có ${q.num(cay - 1, 2)} khoảng cách giữa hai cây liền nhau.</div>
    <div class="fill-line">Từ cây đầu tiên đến cây cuối cùng dài ${q.num((cay - 1) * 6, 2)} m.</div>
    <p class="wordq">Một hàng cây khác cũng trồng như vậy, từ cây đầu tiên đến cây cuối cùng dài ${p * 6} m.</p>
    <div class="fill-line">Hàng cây khác đó có ${q.num(p + 1, 2)} cây.</div>`,
    `Số khoảng = số cây − 1. ${cay - 1} × 6 = ${(cay - 1) * 6} (m);  ${p * 6} : 6 = ${p} khoảng nên có ${p + 1} cây.`);
},

/* 6. Bài toán nhiều bước với bảng nhân 6 */
() => {
  const q = Q(6, '');
  const a = R(2, 4), b = a + R(1, 2);
  return q.done(`<p class="wordq">Mỗi hộp bút chì màu có 6 chiếc bút. Bạn An có ${a} hộp, bạn Bình có ${b} hộp.</p>
    <div class="fill-line">Bạn An có ${q.num(6 * a, 2)} chiếc bút chì màu.</div>
    <div class="fill-line">Bạn Bình có ${q.num(6 * b, 2)} chiếc bút chì màu.</div>
    <div class="fill-line">Cả hai bạn có ${q.num(6 * (a + b), 2)} chiếc bút chì màu.</div>
    <div class="fill-line">Bạn Bình có nhiều hơn bạn An ${q.num(6 * (b - a), 2)} chiếc bút chì màu.</div>`,
    `6 × ${a} = ${6 * a};  6 × ${b} = ${6 * b};  6 × ${a + b} = ${6 * (a + b)};  6 × ${b - a} = ${6 * (b - a)}`);
},
];
