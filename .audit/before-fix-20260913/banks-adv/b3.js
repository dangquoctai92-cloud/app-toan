/* ===== NÂNG CAO — Bài 3: Tìm thành phần trong phép cộng, phép trừ ===== */

/* một cặp phép tính có ô ?, dùng để tìm rồi so sánh */
const b3advPair = () => {
  const x1 = R(20, 200);
  const x2 = R(1, 3) === 1 ? x1 : R(20, 200);
  const a = R(20, 150), b = x1 + a;
  const d = R(20, 150), c = x2 + d;
  return {e1:`? + ${a} = ${b}`, x1, e2:`${c} − ? = ${d}`, x2,
    s:x1 > x2 ? '>' : x1 < x2 ? '<' : '='};
};

ADV.b3 = [

/* 1. Tìm thành phần chưa biết khi một vế là biểu thức */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho dấu ? (tính giá trị một vế trước).');
  // a) ? + a = b + c
  const xa = R(20, 120), aa = R(20, 90), sa = xa + aa;
  const ba = R(10, sa - 10), ca = sa - ba;
  // b) a − ? = b − c
  const xb = R(20, 90), hb = R(20, 120), ab = xb + hb;
  const cb = R(10, 60), bb = hb + cb;
  // c) ? − a = b + c
  const ac = R(20, 90), hc = R(60, 300), xc = ac + hc;
  const bc = R(10, hc - 10), cc = hc - bc;
  return q.done(`<div class="eq-list">
      <div class="eq"><b>a)</b> ${q.num(xa)} <span class="op">+</span> ${aa} <span class="op">=</span> ${ba} <span class="op">+</span> ${ca}</div>
      <div class="eq"><b>b)</b> ${ab} <span class="op">−</span> ${q.num(xb)} <span class="op">=</span> ${bb} <span class="op">−</span> ${cb}</div>
      <div class="eq"><b>c)</b> ${q.num(xc)} <span class="op">−</span> ${ac} <span class="op">=</span> ${bc} <span class="op">+</span> ${cc}</div>
    </div>
    <div class="hint-line">Tính giá trị vế đã biết trước, sau đó mới tìm thành phần chưa biết.</div>`,
    `a) ${ba} + ${ca} = ${sa}, ${sa} − ${aa} = ${xa} · b) ${bb} − ${cb} = ${hb}, ${ab} − ${hb} = ${xb} · c) ${bc} + ${cc} = ${hc}, ${hc} + ${ac} = ${xc}`);
},

/* 2. Bài toán ngược ba bước */
() => {
  const q = Q(2, '');
  const ban = R(120, 260), con = R(150, 380), them = R(60, 200), tiep = R(40, 150);
  const dau = ban + con, sau = dau + them;
  return q.done(`<p class="wordq">Một cửa hàng có một số quyển vở. Sau khi bán ${ban} quyển thì cửa hàng
      còn lại ${con} quyển. Sau đó cửa hàng nhập thêm ${them} quyển vở.</p>
    <div class="fill-line">a) Lúc đầu cửa hàng có ${q.num(dau)} quyển vở.</div>
    <div class="fill-line">b) Sau khi nhập thêm, cửa hàng có ${q.num(sau)} quyển vở.</div>
    <div class="fill-line">c) Nếu bán tiếp ${tiep} quyển thì cửa hàng còn ${q.num(sau - tiep)} quyển vở.</div>`,
    `${ban} + ${con} = ${dau};  ${dau} + ${them} = ${sau};  ${sau} − ${tiep} = ${sau - tiep}`);
},

/* 3. Suy luận: tổng và hiệu thay đổi thế nào */
() => {
  const q = Q(3, 'Không cần tìm từng số, hãy điền số thích hợp.');
  const S = R(150, 700), k = R(10, 90), m = R(10, 90);
  const H = R(120, 600), p = R(10, 80);
  return q.done(`<div class="bullet">Tổng của hai số bằng ${S}.</div>
    <div class="fill-line">a) Giữ nguyên số thứ nhất, thêm vào số thứ hai ${k} đơn vị thì tổng mới bằng ${q.num(S + k)}</div>
    <div class="fill-line">b) Giữ nguyên số thứ hai, bớt ở số thứ nhất ${m} đơn vị thì tổng mới bằng ${q.num(S - m)}</div>
    <div class="fill-line">c) Thêm vào mỗi số 10 đơn vị thì tổng mới bằng ${q.num(S + 20)}</div>
    <div class="bullet">Hiệu của hai số bằng ${H}.</div>
    <div class="fill-line">d) Thêm vào số bị trừ ${p} đơn vị, giữ nguyên số trừ thì hiệu mới bằng ${q.num(H + p)}</div>
    <div class="fill-line">e) Thêm vào cả số bị trừ và số trừ 8 đơn vị thì hiệu mới bằng ${q.num(H)}</div>`,
    'Tổng thay đổi theo số hạng · Hiệu không đổi khi cả hai số cùng thêm một lượng như nhau.');
},

/* 4. Tìm số ? trong mỗi phép tính rồi so sánh */
() => {
  const q = Q(4, 'Tìm số thay cho dấu ? trong mỗi phép tính, rồi so sánh hai số đó.');
  const L = ['a)', 'b)', 'c)'];
  const rows = Array.from({length:3}, () => b3advPair());
  return q.done(rows.map((r, i) =>
    `<div class="fill-line">${L[i]} ${r.e1} &rarr; ? = ${q.num(r.x1)}
      &nbsp;&nbsp; ${r.e2} &rarr; ? = ${q.num(r.x2)}
      &nbsp;&nbsp; so sánh hai số ? : ${q.sign(r.s)}</div>`).join('') +
    `<div class="hint-line">Chạm vào ô dấu để đổi &gt; &lt; =</div>`,
    rows.map(r => `${r.x1} và ${r.x2}`).join(' · '));
},

/* 5. Bảng số bị trừ – số trừ – hiệu, ẩn xen kẽ, số có ba chữ số */
() => {
  const q = Q(5, '<span class="tag">Số</span> ?');
  const HIDE = [1, 2, 3, 2, 1];
  const it = Array.from({length:5}, () => {
    const b = R(110, 380), h = R(150, 520);
    return {b, h, a:b + h};
  });
  const r1 = it.map((x, i) => HIDE[i] === 1 ? `<td>${q.num(x.a)}</td>` : `<td>${x.a}</td>`).join('');
  const r2 = it.map((x, i) => HIDE[i] === 2 ? `<td>${q.num(x.b)}</td>` : `<td>${x.b}</td>`).join('');
  const r3 = it.map((x, i) => HIDE[i] === 3 ? `<td>${q.num(x.h)}</td>` : `<td>${x.h}</td>`).join('');
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số bị trừ</th>${r1}</tr>
      <tr><th>Số trừ</th>${r2}</tr>
      <tr><th>Hiệu</th>${r3}</tr>
    </table></div>
    <div class="hint-line">Số bị trừ = hiệu + số trừ · Số trừ = số bị trừ − hiệu · Hiệu = số bị trừ − số trừ</div>`,
    it.map(x => `${x.a} − ${x.b} = ${x.h}`).join(' · '));
},
];
