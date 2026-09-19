/* ===== NÂNG CAO — Bài 13: Tìm thành phần trong phép nhân, phép chia ===== */

const b13advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

/* các cặp thừa số từ 2 đến 9 có tích bằng P */
const b13advPairs = P => {
  const r = [];
  for (let b = 2; b <= 9; b++){ const c = P / b; if (P % b === 0 && c >= 2 && c <= 9) r.push([b, c]); }
  return r;
};

/* các số chia được của n, lấy trong khoảng từ lo đến hi */
const b13advDiv = (n, lo, hi) => {
  const r = [];
  for (let i = lo; i <= hi; i++) if (n % i === 0) r.push(i);
  return r;
};

ADV.b13 = [

/* 1. Tìm thừa số khi vế phải là một biểu thức */
() => {
  const q = Q(1, 'Tìm số chưa biết.');
  const L = ['a)', 'b)', 'c)', 'd)'];
  const rows = [];
  for (let i = 0; i < 4; i++){
    const x = R(2, 9), a = R(2, 9), P = x * a;
    const ps = b13advPairs(P).filter(p =>
      !(p[0] === x && p[1] === a) && !(p[0] === a && p[1] === x));
    let phai;
    if (ps.length){ const p = pick(ps); phai = `${p[0]} × ${p[1]}`; }
    else { const k = R(2, 4); phai = `${P * k} : ${k}`; }
    const trai = R(1, 2) === 1 ? `${q.num(x, 1)} × ${a}` : `${a} × ${q.num(x, 1)}`;
    rows.push({trai, phai, e:`${phai} = ${P};  ${P} : ${a} = ${x}`});
  }
  return q.done(rows.map((r, i) =>
      `<div class="fill-line">${L[i]} ${r.trai} = ${r.phai}</div>`).join('')
    + '<div class="hint-line">Hãy tính vế phải trước, sau đó tìm thừa số chưa biết.</div>',
    rows.map((r, i) => `${L[i]} ${r.e}`).join('  ·  '));
},

/* 2. Bảng Số bị chia – Số chia – Thương, ô trống ở cả ba hàng */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const cols = Array.from({length:5}, (_, i) => {
    const d = R(2, 9), t = R(2, 9);
    return {d, t, n:d * t, an:i === 0 ? -1 : R(0, 2)};
  });
  const cell = (co, k) => {
    const v = [co.n, co.d, co.t][k];
    return co.an === k ? `<td>${q.num(v)}</td>` : `<td>${v}</td>`;
  };
  return q.done(`<div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Số bị chia</th>${cols.map(co => cell(co, 0)).join('')}</tr>
      <tr><th>Số chia</th>${cols.map(co => cell(co, 1)).join('')}</tr>
      <tr><th>Thương</th>${cols.map(co => cell(co, 2)).join('')}</tr>
    </table></div>
    <div class="hint-line">Số bị chia = Thương × Số chia · Số chia = Số bị chia : Thương ·
      Thương = Số bị chia : Số chia</div>`,
    cols.filter(co => co.an >= 0).map(co => `${co.n} : ${co.d} = ${co.t}`).join('  ·  '));
},

/* 3. Suy luận về các thành phần của phép chia */
() => {
  const q = Q(3, 'Trong một phép chia hết:');
  const c = R(2, 9), t = R(3, 9);
  const n = c * t;
  return q.done(`<div class="bullet">Số chia là ${c}.</div>
    <div class="bullet">Thương là ${t}.</div>
    <div class="fill-line">Số bị chia là ${q.num(n)}</div>
    <div class="fill-line">Nếu số bị chia bớt đi ${c} đơn vị và giữ nguyên số chia thì thương mới là ${q.num(t - 1)}</div>
    <div class="fill-line">Nếu số bị chia thêm ${2 * c} đơn vị và giữ nguyên số chia thì thương mới là ${q.num(t + 2)}</div>`,
    `${t} × ${c} = ${n};  ${n - c} : ${c} = ${t - 1};  ${n + 2 * c} : ${c} = ${t + 2}`);
},

/* 4. Sơ đồ ba phép tính — tìm số ban đầu */
() => {
  const q = Q(4, 'Tìm các số còn thiếu, biết kết quả cuối cùng đã cho.');
  const st = R(2, 9), a = R(2, 9);
  const n2 = st * a;
  const hop = b13advDiv(n2, 2, 9).filter(x => n2 / x >= 2);
  const ds = hop.filter(x => x !== a);
  const b = pick(ds.length ? ds : hop);
  const n3 = n2 / b;
  const c = R(2, 5);
  const n4 = n3 * c;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(st, 1)}</span>${b13advArrow('× ' + a)}
      <span class="fnode circle">${q.num(n2)}</span>${b13advArrow(': ' + b)}
      <span class="fnode sq">${q.num(n3)}</span>${b13advArrow('× ' + c)}
      <span class="fnode circle">${n4}</span>
    </div>
    <div class="hint-line">Tính ngược: muốn tìm thừa số ta lấy tích chia cho thừa số kia,
      muốn tìm số bị chia ta lấy thương nhân với số chia.</div>`,
    `${n4} : ${c} = ${n3};  ${n3} × ${b} = ${n2};  ${n2} : ${a} = ${st}`);
},

/* 5. Bài toán ngược: tìm số bị chia rồi chia lại cách khác */
() => {
  const q = Q(5, '');
  const a = R(3, 9);
  const m = pick([2, 3, 4, 5, 6, 7, 8, 9].filter(x => x !== a));
  const tong = a * m;
  const ds = b13advDiv(tong, 2, 9).filter(x => x !== a && tong / x >= 2);
  const b = ds.length ? pick(ds) : m;
  return q.done(`<p class="wordq">Cô giáo có một số quyển vở. Nếu cô chia đều số vở đó cho ${a} bạn
      thì mỗi bạn được ${m} quyển.</p>
    <div class="fill-line">Cô giáo có tất cả ${q.num(tong)} quyển vở.</div>
    <div class="fill-line">Nếu chia đều số vở đó cho ${b} bạn thì mỗi bạn được ${q.num(tong / b)} quyển.</div>
    <div class="fill-line">Nếu mỗi bạn được ${tong / b} quyển thì cô chia được cho ${q.num(b, 1)} bạn.</div>`,
    `${m} × ${a} = ${tong};  ${tong} : ${b} = ${tong / b};  ${tong} : ${tong / b} = ${b}`);
},

/* 6. Tìm số chưa biết rồi so sánh với một số cho trước */
() => {
  const q = Q(6, 'Tìm số chưa biết rồi so sánh số đó với số bên phải.');
  const L = ['a)', 'b)', 'c)'];
  const rows = [];
  for (let i = 0; i < 3; i++){
    const x = R(3, 9), a = R(2, 9);
    const k = Math.max(1, x + pick([-2, -1, 0, 1, 2]));
    rows.push({x, a, k, P:x * a});
  }
  return q.done(rows.map((r, i) =>
      `<div class="fill-line">${L[i]} ${q.num(r.x, 1)} × ${r.a} = ${r.P}
        &nbsp;&nbsp;nên số vừa tìm được ${q.sign(r.x > r.k ? '>' : r.x < r.k ? '<' : '=')} ${r.k}</div>`).join('')
    + '<div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>',
    rows.map((r, i) => `${L[i]} ${r.P} : ${r.a} = ${r.x}`).join('  ·  '));
},
];
