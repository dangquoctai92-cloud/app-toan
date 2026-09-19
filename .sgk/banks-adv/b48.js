/* ===== NÂNG CAO — Bài 48: Làm tròn số đến hàng chục, hàng trăm ===== */

const b48advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b48advR10 = n => Math.floor(n / 10) * 10 + (n % 10 >= 5 ? 10 : 0);
const b48advR100 = n => Math.floor(n / 100) * 100 + (Math.floor(n / 10) % 10 >= 5 ? 100 : 0);

/* dãy số có bốn chữ số khác nhau đôi một, thoả mãn điều kiện ok(v) */
const b48advSo = (n, ok) => {
  const out = [];
  for (let g = 0; g < 500 && out.length < n; g++){
    const v = R(1000, 9899);
    if (!out.includes(v) && (!ok || ok(v))) out.push(v);
  }
  for (let i = 1013; i < 9900 && out.length < n; i += 111)
    if (!out.includes(i) && (!ok || ok(i))) out.push(i);
  return out;
};

const b48advChain = items => `<div class="b48adv-chain">${items.map((x, i) =>
  `<span class="b48adv-node${x.q ? ' q' : ''}">${x.h}</span>`
  + (i === items.length - 1 ? '' : '<span class="b48adv-arr">&rarr;</span>')).join('')}</div>`;

ADV.b48 = [

/* 1. Toán ngược: biết kết quả làm tròn, tìm số bé nhất và số lớn nhất */
() => {
  const q = Q(1, 'Trả lời các câu hỏi sau.');
  const X = R(101, 999) * 10;      /* số tròn chục có bốn chữ số */
  const Y = R(11, 99) * 100;       /* số tròn trăm có bốn chữ số */
  return q.done(`<div class="b48adv-sub">a) Làm tròn số A đến hàng chục ta được ${b48advSp(X)}.</div>
    <div class="fill-line">Số A bé nhất có thể là ${q.num(X - 5, 4)}</div>
    <div class="fill-line">Số A lớn nhất có thể là ${q.num(X + 4, 4)}</div>
    <div class="fill-line">Có tất cả ${q.num(10, 2)} số A như vậy.</div>
    <div class="b48adv-sub">b) Làm tròn số B đến hàng trăm ta được ${b48advSp(Y)}.</div>
    <div class="fill-line">Số B bé nhất có thể là ${q.num(Y - 50, 4)}</div>
    <div class="fill-line">Số B lớn nhất có thể là ${q.num(Y + 49, 4)}</div>
    <div class="fill-line">Có tất cả ${q.num(100, 3)} số B như vậy.</div>
    <div class="hint-line">Khi làm tròn đến hàng chục, ta nhìn chữ số hàng đơn vị: bé hơn 5 thì làm tròn
      xuống, lớn hơn hoặc bằng 5 thì làm tròn lên. Khi làm tròn đến hàng trăm, ta nhìn chữ số hàng chục.</div>`,
    `a) Các số làm tròn đến hàng chục được ${b48advSp(X)} là từ ${b48advSp(X - 5)} đến ${b48advSp(X + 4)}, `
    + `có tất cả 10 số.  `
    + `b) Các số làm tròn đến hàng trăm được ${b48advSp(Y)} là từ ${b48advSp(Y - 50)} đến `
    + `${b48advSp(Y + 49)}, có tất cả 100 số.`);
},

/* 2. Bảng làm tròn hai hàng và tìm số có hai kết quả bằng nhau */
() => {
  const q = Q(2, 'Làm tròn mỗi số sau đến hàng chục, đến hàng trăm rồi trả lời câu hỏi.');
  const H = R(11, 99) * 100;
  const nEq = H + R(-5, 4);                                   /* hai kết quả làm tròn bằng nhau */
  const khac = b48advSo(3, v => b48advR10(v) !== b48advR100(v) && v !== nEq);
  const ns = khac.concat([nEq]).sort(() => Math.random() - .5);
  const rows = ns.map(n => `<tr><td>${b48advSp(n)}</td>
      <td>${q.num(b48advR10(n), 4)}</td><td>${q.num(b48advR100(n), 4)}</td></tr>`).join('');
  const opts = ns.map(b48advSp);
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số</th><th>Làm tròn đến<br>hàng chục</th><th>Làm tròn đến<br>hàng trăm</th></tr>${rows}
    </table></div>
    <div class="b48adv-sub">Số nào có kết quả làm tròn đến hàng chục bằng kết quả làm tròn
      đến hàng trăm?</div>
    <div class="fill-line">${q.pick(b48advSp(nEq), opts)}</div>
    <div class="hint-line">Hai kết quả làm tròn chỉ bằng nhau khi kết quả làm tròn đến hàng chục
      cũng là một số tròn trăm.</div>`,
    ns.map(n => `${b48advSp(n)} → ${b48advSp(b48advR10(n))} (hàng chục), `
      + `${b48advSp(b48advR100(n))} (hàng trăm)`).join(';  ')
    + `. Vậy số cần tìm là ${b48advSp(nEq)}.`);
},

/* 3. So sánh các kết quả làm tròn */
() => {
  const q = Q(3, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const A = R(1050, 9800);
  const B = R(1200, 9700);
  const C = B + pick([-120, -40, -5, 5, 40, 120]);
  const D = R(1050, 9800);
  const E = b48advR10(D) + pick([-10, 0, 0, 10]);
  const rows = [
    {t:`Làm tròn ${b48advSp(A)} đến hàng chục`, p:`Làm tròn ${b48advSp(A)} đến hàng trăm`,
     l:b48advR10(A), r:b48advR100(A)},
    {t:`Làm tròn ${b48advSp(B)} đến hàng trăm`, p:`Làm tròn ${b48advSp(C)} đến hàng trăm`,
     l:b48advR100(B), r:b48advR100(C)},
    {t:`Làm tròn ${b48advSp(D)} đến hàng chục`, p:`${b48advSp(E)}`,
     l:b48advR10(D), r:E}
  ];
  const L = ['a)', 'b)', 'c)'];
  return q.done(`<div class="two-col"><div>${rows.map((x, i) =>
      `<div class="cmp-row"><b>${L[i]}</b><span class="side b48adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')
      }<span class="side b48adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Hãy làm tròn từng số trước rồi mới so sánh hai kết quả với nhau ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map((x, i) => `${L[i]} ${b48advSp(x.l)} và ${b48advSp(x.r)}`).join(';  '));
},

/* 4. Tìm số theo nhiều điều kiện có liên quan tới làm tròn */
() => {
  const q = Q(4, 'Tìm số thoả mãn tất cả các điều kiện sau.');
  const P = R(11, 99) * 100;
  const ch = R(0, 9), dv = R(0, 9);
  const e = ch * 10 + dv;
  const n = e <= 49 ? P + e : P - 100 + e;
  return q.done(`<div class="bullet">Số cần tìm là số có bốn chữ số.</div>
    <div class="bullet">Làm tròn số đó đến hàng trăm ta được ${b48advSp(P)}.</div>
    <div class="bullet">Chữ số hàng chục của số đó là ${ch}.</div>
    <div class="bullet">Chữ số hàng đơn vị của số đó là ${dv}.</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 4)}</div>
    <div class="fill-line">Làm tròn số đó đến hàng chục ta được ${q.num(b48advR10(n), 4)}</div>
    <div class="hint-line">Các số làm tròn đến hàng trăm được ${b48advSp(P)} là các số từ
      ${b48advSp(P - 50)} đến ${b48advSp(P + 49)}. Trong đó chỉ có một số có hai chữ số cuối
      là ${ch}${dv}.</div>`,
    `Số cần tìm nằm trong khoảng từ ${b48advSp(P - 50)} đến ${b48advSp(P + 49)} và có hai chữ số cuối `
    + `là ${ch}${dv}, đó là ${b48advSp(n)}. Chữ số hàng đơn vị là ${dv} nên làm tròn đến hàng chục `
    + `được ${b48advSp(b48advR10(n))}.`);
},

/* 5. Bài toán nhiều bước rồi làm tròn kết quả */
() => {
  const q = Q(5, '');
  const A = R(1200, 3600), B = R(120, 900);
  const tong = 2 * A + B;
  return q.done(`<p class="wordq">Thư viện của một trường học có ${b48advSp(A)} cuốn sách thiếu nhi.
      Số sách khoa học nhiều hơn số sách thiếu nhi ${b48advSp(B)} cuốn.</p>
    <div class="fill-line">a) Thư viện có ${q.num(A + B, 4)} cuốn sách khoa học.</div>
    <div class="fill-line">b) Cả hai loại sách có ${q.num(tong, 4)} cuốn.</div>
    <div class="fill-line">c) Làm tròn số sách của cả hai loại đến hàng chục ta được
      ${q.num(b48advR10(tong), 4)} cuốn.</div>
    <div class="fill-line">d) Làm tròn số sách của cả hai loại đến hàng trăm ta được
      ${q.num(b48advR100(tong), 4)} cuốn.</div>
    <div class="hint-line">Hãy tìm số sách khoa học trước, sau đó tính tổng số sách rồi mới làm tròn.</div>`,
    `Sách khoa học: ${b48advSp(A)} + ${b48advSp(B)} = ${b48advSp(A + B)} (cuốn). `
    + `Cả hai loại: ${b48advSp(A)} + ${b48advSp(A + B)} = ${b48advSp(tong)} (cuốn). `
    + `Làm tròn: ${b48advSp(tong)} → ${b48advSp(b48advR10(tong))} (hàng chục), `
    + `${b48advSp(b48advR100(tong))} (hàng trăm).`);
},

/* 6. Dãy số theo quy luật rồi làm tròn số cuối cùng */
() => {
  const q = Q(6, 'Viết tiếp ba số của dãy số sau rồi làm tròn số cuối cùng.');
  const b = pick([3, 4, 6, 7, 8, 9, 12, 15]);
  const st = R(1200, 4000);
  const v = i => st + i * b;
  const cuoi = v(6);
  const row = b48advChain([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h:b48advSp(v(i))} : {q:1, h:q.num(v(i), 4)}));
  return q.done(row
    + `<div class="fill-line">Mỗi số hơn số liền trước ${q.num(b, 2)} đơn vị.</div>
    <div class="fill-line">Làm tròn số cuối cùng của dãy đến hàng chục ta được
      ${q.num(b48advR10(cuoi), 4)}</div>
    <div class="fill-line">Làm tròn số cuối cùng của dãy đến hàng trăm ta được
      ${q.num(b48advR100(cuoi), 4)}</div>
    <div class="hint-line">Hãy lấy một số bất kì trừ đi số liền trước nó để tìm ra quy luật của dãy số.</div>`,
    `${b48advSp(v(1))} − ${b48advSp(v(0))} = ${b} nên dãy số tăng đều ${b} đơn vị: `
    + `${[4, 5, 6].map(i => b48advSp(v(i))).join(', ')}. `
    + `Số cuối cùng ${b48advSp(cuoi)} làm tròn đến hàng chục được ${b48advSp(b48advR10(cuoi))}, `
    + `đến hàng trăm được ${b48advSp(b48advR100(cuoi))}.`);
},
];
