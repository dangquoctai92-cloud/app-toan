/* ===== NÂNG CAO — Bài 15: Luyện tập chung ===== */

const b15advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

/* các số chia được của n, lấy trong khoảng từ lo đến hi */
const b15advDiv = (n, lo, hi) => {
  const r = [];
  for (let i = lo; i <= hi; i++) if (n % i === 0) r.push(i);
  return r;
};

/* các tích chỉ viết được thành một cặp thừa số duy nhất (hai thừa số đều lớn hơn 1) */
const b15advTich = [6, 10, 14, 15, 21, 35];

ADV.b15 = [

/* 1. Tìm hai số biết tích của chúng */
() => {
  const P = pick(b15advTich);
  const q = Q(1, `Tìm hai số, biết mỗi số đều lớn hơn 1 và tích của hai số đó bằng ${P}.`);
  const ps = b15advDiv(P, 2, 9).filter(x => P / x >= 2 && P / x <= 9);
  const be = Math.min(...ps), lon = Math.max(...ps);
  return q.done(`<div class="given-nums"><span class="cnode">${P}</span></div>
    <div class="fill-line">Số bé là ${q.num(be, 1)}</div>
    <div class="fill-line">Số lớn là ${q.num(lon, 1)}</div>
    <div class="fill-line">Tổng của hai số đó là ${q.num(be + lon)}</div>`,
    `${be} × ${lon} = ${P};  ${be} + ${lon} = ${be + lon}`);
},

/* 2. So sánh hai biểu thức nhân, chia */
() => {
  const q = Q(2, 'Tính rồi điền dấu thích hợp vào ô trống.');
  const a = R(2, 9), b = R(2, 9), c = R(2, 9), d = R(2, 9);
  const e = R(2, 9), f = R(2, 9), g = R(2, 9), h = R(2, 9);
  const rows = [
    {l:`${a} × ${b}`, r:`${c} × ${d}`, v1:a * b, v2:c * d},
    {l:`${e * f} : ${f}`, r:`${g} × ${h}`, v1:e, v2:g * h},
    {l:`${a} × ${b}`, r:`${b} × ${a}`, v1:a * b, v2:a * b}
  ];
  return q.done(`<div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.l}</span>${
        q.sign(r.v1 > r.v2 ? '>' : r.v1 < r.v2 ? '<' : '=')}<span class="side">${r.r}</span></div>`).join('')}</div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(r => `${r.l} = ${r.v1} và ${r.r} = ${r.v2}`).join('  ·  '));
},

/* 3. Sơ đồ ba phép tính — tìm số ban đầu */
() => {
  const q = Q(3, 'Tìm các số còn thiếu, biết kết quả cuối cùng đã cho.');
  const st = R(2, 9), a = R(2, 9);
  const n2 = st * a;
  const hop = b15advDiv(n2, 2, 9).filter(x => n2 / x >= 2);
  const ds = hop.filter(x => x !== a);
  const b = pick(ds.length ? ds : hop);
  const n3 = n2 / b;
  const c = R(2, 4);
  const n4 = n3 * c;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(st, 1)}</span>${b15advArrow('× ' + a)}
      <span class="fnode circle">${q.num(n2)}</span>${b15advArrow(': ' + b)}
      <span class="fnode sq">${q.num(n3)}</span>${b15advArrow('× ' + c)}
      <span class="fnode circle">${n4}</span>
    </div>
    <div class="hint-line">Hãy tính ngược từ kết quả cuối cùng trở về số ban đầu.</div>`,
    `${n4} : ${c} = ${n3};  ${n3} × ${b} = ${n2};  ${n2} : ${a} = ${st}`);
},

/* 4. Bài toán ba bước: nhân rồi lấy một phần mấy */
() => {
  const q = Q(4, '');
  const a = R(3, 9), b = 2 * R(2, 4);
  const tong = a * b;
  const ds = b15advDiv(tong, 2, 5);
  const k = ds.length ? pick(ds) : 2;
  const ban = tong / k;
  return q.done(`<p class="wordq">Một cửa hàng có ${a} hộp bút, mỗi hộp có ${b} chiếc bút.
      Cửa hàng đã bán được ${ART.b14Frac(1, k)} số bút đó.</p>
    <div class="fill-line">Cửa hàng có tất cả ${q.num(tong)} chiếc bút.</div>
    <div class="fill-line">Cửa hàng đã bán được ${q.num(ban)} chiếc bút.</div>
    <div class="fill-line">Cửa hàng còn lại ${q.num(tong - ban)} chiếc bút.</div>`,
    `${b} × ${a} = ${tong};  ${tong} : ${k} = ${ban};  ${tong} − ${ban} = ${tong - ban} (chiếc)`);
},

/* 5. Bài toán ba bước: nhân rồi nhiều hơn */
() => {
  const q = Q(5, '');
  const to = R(3, 6), moi = R(4, 8), c = R(2, 6);
  const a3 = to * moi, b3 = a3 + c;
  return q.done(`<p class="wordq">Lớp 3A có ${to} tổ, mỗi tổ có ${moi} bạn.
      Lớp 3B có nhiều hơn lớp 3A ${c} bạn.</p>
    <div class="fill-line">Lớp 3A có ${q.num(a3)} bạn.</div>
    <div class="fill-line">Lớp 3B có ${q.num(b3)} bạn.</div>
    <div class="fill-line">Cả hai lớp có ${q.num(a3 + b3)} bạn.</div>`,
    `${moi} × ${to} = ${a3};  ${a3} + ${c} = ${b3};  ${a3} + ${b3} = ${a3 + b3} (bạn)`);
},

/* 6. Suy luận: tìm số bi theo hai cách chia đều */
() => {
  const q = Q(6, '');
  const CAP = [{p:4, q:6, l:12}, {p:3, q:4, l:12}, {p:4, q:5, l:20},
    {p:6, q:9, l:18}, {p:2, q:9, l:18}, {p:3, q:8, l:24}];
  const c = pick(CAP);
  const n = c.l * R(2, 3);
  const lo = n - 4, hi = n + 4;
  return q.done(`<p class="wordq">Bạn Nam có nhiều hơn ${lo} viên bi và ít hơn ${hi} viên bi.
      Nếu Nam xếp đều số bi đó vào các túi, mỗi túi ${c.p} viên thì vừa hết;
      nếu mỗi túi ${c.q} viên thì cũng vừa hết.</p>
    <div class="fill-line">Nam có ${q.num(n)} viên bi.</div>
    <div class="fill-line">Nếu mỗi túi ${c.p} viên thì Nam cần ${q.num(n / c.p)} cái túi.</div>
    <div class="fill-line">Nếu mỗi túi ${c.q} viên thì Nam cần ${q.num(n / c.q)} cái túi.</div>`,
    `Từ ${lo + 1} đến ${hi - 1} chỉ có ${n} vừa chia hết cho ${c.p} vừa chia hết cho ${c.q}. `
    + `${n} : ${c.p} = ${n / c.p};  ${n} : ${c.q} = ${n / c.q}`);
},
];
