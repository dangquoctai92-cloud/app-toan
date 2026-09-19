/* ===== NÂNG CAO — Bài 65: Luyện tập chung
   (cộng, trừ trong phạm vi 100 000; tính giá trị biểu thức; giải toán nhiều bước) ===== */

/* viết số theo kiểu sách: 42 758 */
const b65advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b65advLen = v => String(v).length;

/* dãy số dạng các ô nối tiếp nhau */
const b65advSeq = items => `<div class="b65adv-seq">${items.map(x =>
  `<span class="b65adv-node${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

/* ba số khác nhau đôi một (nên chỉ có duy nhất một số lớn nhất) */
const b65advBaSo = () => {
  for (let g = 0; g < 80; g++){
    const v = [0, 1, 2].map(() => R(12, 30) * 1000 + R(0, 9) * 100);
    if (new Set(v).size === 3) return {A: v[0], B: v[1], C: v[2]};
  }
  return {A: 21500, B: 18300, C: 25700};
};

ADV.b65 = [

/* 1. Tính nhẩm ngược — tìm số tròn nghìn, tròn chục nghìn còn thiếu */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho dấu ?');
  const sp = b65advSp;
  /* a) A + ? − B = Ka */
  const a1 = R(4, 9), a2 = R(1, a1 - 1), am = R(1, 9);
  const Ka = (a1 - a2) * 10000 + am * 1000;
  /* b) T − (? + W) = Kb */
  const bu = R(1, 4), bw = R(1, 4), bt = R(bu + bw + 1, 9);
  const Kb = (bt - bu - bw) * 10000;
  /* c) ? − C + D = Kc */
  const cx = R(11, 30), cc = R(2, 9), cd = R(2, 6);
  const Kc = (cx - cc) * 1000 + cd * 10000;
  /* d) E + F − ? = Kd */
  const de = R(3, 8), df = R(1, 9), dg = R(1, 9);
  const Kd = de * 10000 + df * 1000 - dg * 1000;
  return q.done(`<div class="b65adv-eq"><span class="b65adv-let">a)</span>
      ${sp(a1 * 10000)} <span class="op">+</span> ${q.num(am * 1000, 4)}
      <span class="op">−</span> ${sp(a2 * 10000)} <span class="op">=</span> ${sp(Ka)}</div>
    <div class="b65adv-eq"><span class="b65adv-let">b)</span>
      ${sp(bt * 10000)} <span class="op">−</span> (${q.num(bu * 10000, 5)}
      <span class="op">+</span> ${sp(bw * 10000)}) <span class="op">=</span> ${sp(Kb)}</div>
    <div class="b65adv-eq"><span class="b65adv-let">c)</span>
      ${q.num(cx * 1000, b65advLen(cx * 1000))} <span class="op">−</span> ${sp(cc * 1000)}
      <span class="op">+</span> ${sp(cd * 10000)} <span class="op">=</span> ${sp(Kc)}</div>
    <div class="b65adv-eq"><span class="b65adv-let">d)</span>
      ${sp(de * 10000)} <span class="op">+</span> ${sp(df * 1000)}
      <span class="op">−</span> ${q.num(dg * 1000, 4)} <span class="op">=</span> ${sp(Kd)}</div>
    <div class="hint-line">Em hãy nhẩm theo hàng nghìn, hàng chục nghìn. Muốn tìm số hạng
      chưa biết thì lấy tổng trừ đi số hạng kia; muốn tìm số trừ thì lấy số bị trừ trừ đi hiệu.</div>`,
    `a) ${sp(Ka)} + ${sp(a2 * 10000)} = ${sp(Ka + a2 * 10000)}; `
    + `${sp(Ka + a2 * 10000)} − ${sp(a1 * 10000)} = ${sp(am * 1000)}.  `
    + `b) Trong ngoặc là ${sp(bt * 10000)} − ${sp(Kb)} = ${sp((bu + bw) * 10000)}, `
    + `nên số cần tìm là ${sp((bu + bw) * 10000)} − ${sp(bw * 10000)} = ${sp(bu * 10000)}.  `
    + `c) ${sp(Kc)} − ${sp(cd * 10000)} = ${sp(Kc - cd * 10000)}; `
    + `${sp(Kc - cd * 10000)} + ${sp(cc * 1000)} = ${sp(cx * 1000)}.  `
    + `d) ${sp(de * 10000)} + ${sp(df * 1000)} = ${sp(de * 10000 + df * 1000)}; `
    + `${sp(de * 10000 + df * 1000)} − ${sp(Kd)} = ${sp(dg * 1000)}.`);
},

/* 2. Dãy số và quy luật trong phạm vi 100 000 */
() => {
  const q = Q(2, 'Viết tiếp ba số của mỗi dãy số sau.');
  const sp = b65advSp;
  /* a) dãy cách đều */
  const b = pick([1000, 2000, 5000, 10000]);
  const st = R(11, 25) * 1000 + R(0, 9) * 100;
  const A = i => st + i * b;
  /* b) khoảng cách tăng dần: hơn số liền trước lần lượt u, 2u, 3u, ... */
  const u = pick([1000, 2000]);
  const st2 = R(5, 20) * 1000;
  const B = i => st2 + u * (i * (i + 1) / 2);
  const rowA = b65advSeq([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h: sp(A(i))} : {q: 1, h: q.num(A(i), b65advLen(A(i)))}));
  const rowB = b65advSeq([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h: sp(B(i))} : {q: 1, h: q.num(B(i), b65advLen(B(i)))}));
  return q.done(`<div class="sub-lbl">a) Dãy số cách đều.</div>${rowA}
    <div class="sub-lbl">b) Mỗi số hơn số đứng liền trước nó lần lượt ${sp(u)} đơn vị,
      ${sp(2 * u)} đơn vị, ${sp(3 * u)} đơn vị, ...</div>${rowB}
    <div class="hint-line">Hãy tìm hiệu của hai số liền nhau để nhận ra quy luật của dãy số.</div>`,
    `a) Mỗi số hơn số liền trước ${sp(b)} đơn vị: ${[0,1,2,3,4,5,6].map(i => sp(A(i))).join(', ')}.  `
    + `b) Các hiệu lần lượt là ${sp(u)}, ${sp(2 * u)}, ${sp(3 * u)}, ${sp(4 * u)}, ${sp(5 * u)}, `
    + `${sp(6 * u)} nên dãy số là ${[0,1,2,3,4,5,6].map(i => sp(B(i))).join(', ')}.`);
},

/* 3. So sánh hai biểu thức mà không cần tính hết */
() => {
  const q = Q(3, 'So sánh giá trị hai biểu thức rồi điền dấu thích hợp (&gt;, &lt;, =).');
  const sp = b65advSp;
  const A = R(31, 48) * 1000 + R(0, 999);
  const B = R(11, 25) * 1000 + R(0, 999);
  const d = R(1, 9) * 100 + R(1, 9) * 10;
  const C = R(0, 1) ? B + d : B - d;
  const D = R(1, 9) * 1000;
  const M = R(11, 20) * 1000 + R(0, 999), N = R(10, 19) * 1000 + R(0, 999);
  const T = R(70, 95) * 1000 + R(0, 999);
  const E1 = R(21, 35) * 1000 + R(0, 999), E2 = R(15, 30) * 1000 + R(0, 999);
  const lech = pick([0, R(100, 900), -R(100, 900)]);
  const P = E1 + E2 + lech;
  const dau = (x, y) => x > y ? '>' : x < y ? '<' : '=';
  const rows = [
    {t: `${sp(A)} + ${sp(B)}`, p: `${sp(B)} + ${sp(A)}`, d: '='},
    {t: `${sp(A)} − ${sp(B)}`, p: `${sp(A)} − ${sp(C)}`, d: dau(B, C) === '>' ? '<' : dau(B, C) === '<' ? '>' : '='},
    {t: `${sp(A)} + ${sp(B)} − ${sp(D)}`, p: `${sp(A)} + (${sp(B)} − ${sp(D)})`, d: '='},
    {t: `${sp(T)} − (${sp(M)} + ${sp(N)})`, p: `${sp(T)} − ${sp(M)} − ${sp(N)}`, d: '='},
    {t: `${sp(E1)} + ${sp(E2)}`, p: sp(P), d: dau(E1 + E2, P)}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.t}</span>${q.sign(r.d)}<span class="side">${r.p}</span></div>`
    ).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =. Bốn dòng đầu em có thể so sánh
      mà không cần tính giá trị: khi đổi chỗ hai số hạng thì tổng không đổi; hai số bị trừ
      bằng nhau thì số trừ nào bé hơn sẽ cho hiệu lớn hơn; trừ đi một tổng cũng chính là
      trừ lần lượt từng số hạng của tổng đó.</div>`,
    `Dòng 1: đổi chỗ hai số hạng thì tổng không đổi nên hai vế bằng nhau.  `
    + `Dòng 2: số bị trừ bằng nhau, ${sp(B)} ${dau(B, C)} ${sp(C)} nên hiệu thứ nhất `
    + `${rows[1].d} hiệu thứ hai (${sp(A - B)} ${rows[1].d} ${sp(A - C)}).  `
    + `Dòng 3: cả hai vế đều bằng ${sp(A + B - D)}.  `
    + `Dòng 4: cả hai vế đều bằng ${sp(T - M - N)}.  `
    + `Dòng 5: ${sp(E1)} + ${sp(E2)} = ${sp(E1 + E2)}, mà ${sp(E1 + E2)} `
    + `${dau(E1 + E2, P)} ${sp(P)}.`);
},

/* 4. Toán ngược — tìm số lúc đầu */
() => {
  const q = Q(4, '');
  const sp = b65advSp;
  const chuyen = R(80, 150) * 100;             /* số ki-lô-gam thóc chuyển đi */
  const them = R(50, 120) * 100;               /* số ki-lô-gam thóc nhập thêm */
  const cuoi = R(300, 500) * 100;              /* số ki-lô-gam thóc lúc sau */
  const giua = cuoi - them;                    /* sau khi chuyển đi, trước khi nhập thêm */
  const dau = giua + chuyen;                   /* số ki-lô-gam thóc lúc đầu */
  return q.done(`<p class="wordq">Một kho chứa thóc. Người ta chuyển đi ${sp(chuyen)} kg thóc,
      sau đó nhập thêm vào kho ${sp(them)} kg thóc thì trong kho có ${sp(cuoi)} kg thóc.
      Hỏi lúc đầu trong kho có bao nhiêu ki-lô-gam thóc?</p>
    <div class="bullet">Trước khi nhập thêm, trong kho có ${q.num(giua, b65advLen(giua))} kg thóc.</div>
    <div class="bullet">Lúc đầu trong kho có ${q.num(dau, b65advLen(dau))} kg thóc.</div>
    <div class="hint-line">Em hãy làm ngược lại: kho đã được nhập thêm thì nay phải trừ đi,
      kho đã chuyển đi thì nay phải cộng vào.</div>`,
    `Trước khi nhập thêm: ${sp(cuoi)} − ${sp(them)} = ${sp(giua)} (kg).  `
    + `Lúc đầu: ${sp(giua)} + ${sp(chuyen)} = ${sp(dau)} (kg).`);
},

/* 5. Bài toán có lời văn ba bước */
() => {
  const q = Q(5, '');
  const sp = b65advSp;
  const co = R(700, 950) * 100;                /* số quyển sách của thư viện */
  const t1 = R(80, 150) * 100;                 /* tuần đầu cho mượn */
  const hon = R(20, 60) * 100;
  const t2 = t1 + hon;                         /* tuần sau cho mượn */
  const caHai = t1 + t2;
  const conLai = co - caHai;
  return q.done(`<p class="wordq">Một thư viện có ${sp(co)} quyển sách. Tuần đầu thư viện
      cho mượn ${sp(t1)} quyển sách, tuần sau cho mượn nhiều hơn tuần đầu ${sp(hon)} quyển sách.
      Hỏi thư viện đó còn lại bao nhiêu quyển sách chưa cho mượn?</p>
    <div class="bullet">Tuần sau thư viện cho mượn ${q.num(t2, b65advLen(t2))} quyển sách.</div>
    <div class="bullet">Cả hai tuần thư viện cho mượn ${q.num(caHai, b65advLen(caHai))} quyển sách.</div>
    <div class="bullet">Thư viện còn lại ${q.num(conLai, b65advLen(conLai))} quyển sách chưa cho mượn.</div>
    <div class="hint-line">Phải tìm số sách cho mượn tuần sau trước, rồi mới tìm được số sách
      cho mượn của cả hai tuần.</div>`,
    `Tuần sau: ${sp(t1)} + ${sp(hon)} = ${sp(t2)} (quyển).  `
    + `Cả hai tuần: ${sp(t1)} + ${sp(t2)} = ${sp(caHai)} (quyển).  `
    + `Còn lại: ${sp(co)} − ${sp(caHai)} = ${sp(conLai)} (quyển).`);
},

/* 6. Suy luận từ các tổng đã cho */
() => {
  const q = Q(6, 'Đọc kĩ các điều kiện rồi trả lời.');
  const sp = b65advSp;
  const s = b65advBaSo();
  const A = s.A, B = s.B, C = s.C;
  const X = A + B, Y = B + C, tong = A + B + C;
  const ten = ['Đội Một', 'Đội Hai', 'Đội Ba'];
  const iMax = [A, B, C].indexOf(Math.max(A, B, C));
  const nhieuNhat = ten[iMax];
  const nhieuNhatThuong = ['đội Một', 'đội Hai', 'đội Ba'][iMax];
  return q.done(`<div class="b65adv-fact">Đội Một và đội Hai trồng được tất cả ${sp(X)} cây.</div>
    <div class="b65adv-fact">Đội Hai và đội Ba trồng được tất cả ${sp(Y)} cây.</div>
    <div class="b65adv-fact">Đội Một trồng được ${sp(A)} cây.</div>
    <div class="fill-line">a) Đội Hai trồng được ${q.num(B, b65advLen(B))} cây.</div>
    <div class="fill-line">b) Đội Ba trồng được ${q.num(C, b65advLen(C))} cây.</div>
    <div class="fill-line">c) Cả ba đội trồng được ${q.num(tong, b65advLen(tong))} cây.</div>
    <div class="fill-line">d) Đội nào trồng được nhiều cây nhất? ${q.pick(nhieuNhat, ten)}</div>
    <div class="hint-line">Biết tổng số cây của đội Một và đội Hai, lại biết số cây của đội Một
      thì tìm được số cây của đội Hai. Từ đó tìm tiếp số cây của đội Ba.</div>`,
    `a) ${sp(X)} − ${sp(A)} = ${sp(B)} (cây).  b) ${sp(Y)} − ${sp(B)} = ${sp(C)} (cây).  `
    + `c) ${sp(A)} + ${sp(B)} + ${sp(C)} = ${sp(tong)} (cây).  `
    + `d) So sánh ${sp(A)}, ${sp(B)}, ${sp(C)} thì ${nhieuNhatThuong} trồng được nhiều cây nhất.`);
},
];
