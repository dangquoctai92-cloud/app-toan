/* ===== NÂNG CAO — Bài 8: Luyện tập chung ===== */

const b8advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

ADV.b8 = [

/* 1. Tháp gạch ngược: biết viên trên đỉnh, tìm viên còn thiếu ở đáy */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const a = R(15, 60), b = R(15, 60), c = R(15, 60);
  const m1 = a + b, m2 = b + c, dinh = m1 + m2;
  return q.done(`<div class="pyr">
      <div class="pyr-row"><div class="brick">${dinh}</div></div>
      <div class="pyr-row"><div class="brick">${q.num(m1)}</div><div class="brick">${q.num(m2)}</div></div>
      <div class="pyr-row"><div class="brick">${a}</div><div class="brick">${b}</div><div class="brick">${q.num(c)}</div></div>
    </div>
    <div class="hint-line">Mỗi viên gạch ghi tổng của hai viên gạch ngay dưới nó.</div>`,
    `${a} + ${b} = ${m1};  ${dinh} − ${m1} = ${m2};  ${m2} − ${b} = ${c}`);
},

/* 2. Bảng Số bị trừ – Số trừ – Hiệu, ô trống ở nhiều dòng khác nhau */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const cols = Array.from({length:5}, (_, i) => {
    const st = R(45, 380), hi = R(60, 500);
    return {sbt:st + hi, st, hi, an:i === 0 ? -1 : R(0, 2)};
  });
  const cell = (co, k) => co.an === k
    ? `<td>${q.num([co.sbt, co.st, co.hi][k])}</td>`
    : `<td>${nf([co.sbt, co.st, co.hi][k])}</td>`;
  return q.done(`<div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Số bị trừ</th>${cols.map(co => cell(co, 0)).join('')}</tr>
      <tr><th>Số trừ</th>${cols.map(co => cell(co, 1)).join('')}</tr>
      <tr><th>Hiệu</th>${cols.map(co => cell(co, 2)).join('')}</tr>
    </table></div>
    <div class="hint-line">Số bị trừ = Số trừ + Hiệu · Số trừ = Số bị trừ − Hiệu · Hiệu = Số bị trừ − Số trừ</div>`);
},

/* 3. Nhân, chia với 1 và với 0 — chọn nhiều đáp án */
() => {
  const q = Q(3, 'Cho các phép tính dưới đây.');
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const n = R(3, 9);
  const items = [
    {t:`${n} × 1`, v:n},
    {t:`${n} × 0`, v:0},
    {t:`0 : ${n}`, v:0},
    {t:`${n} : 1`, v:n},
    {t:`${n} : ${n}`, v:1},
    {t:`1 × ${n}`, v:n}
  ].sort(() => Math.random() - .5).map((x, i) => ({...x, L:L[i]}));
  const lay = v => items.filter(x => x.v === v).map(x => x.L).sort().join(',');
  return q.done(`<div class="calc-grid">${items.map(x =>
      `<div class="calc-cell"><b>${x.L}.</b>&nbsp; ${x.t}</div>`).join('')}</div>
    <div class="fill-line">a) Những phép tính có kết quả bằng 0 là ${q.pick(lay(0), L)}</div>
    <div class="fill-line">b) Những phép tính có kết quả bằng ${n} là ${q.pick(lay(n), L)}</div>
    <div class="fill-line">c) Phép tính có kết quả bằng 1 là ${q.pick(lay(1), L)}</div>`,
    items.map(x => x.L + ' = ' + x.v).join(' · '));
},

/* 4. Bài toán ba bước với phép cộng, phép trừ trong phạm vi 1 000 */
() => {
  const q = Q(4, '');
  const sang = R(120, 260), it = R(20, 90);
  const chieu = sang - it, hai = sang + chieu;
  const kho = hai + R(80, 300);
  return q.done(`<p class="wordq">Một kho có ${kho} bao gạo. Buổi sáng kho chuyển đi ${sang} bao,
      buổi chiều chuyển đi ít hơn buổi sáng ${it} bao.</p>
    <div class="fill-line">Buổi chiều kho chuyển đi ${q.num(chieu)} bao gạo.</div>
    <div class="fill-line">Cả hai buổi kho chuyển đi ${q.num(hai)} bao gạo.</div>
    <div class="fill-line">Trong kho còn lại ${q.num(kho - hai)} bao gạo.</div>`,
    `${sang} − ${it} = ${chieu};  ${sang} + ${chieu} = ${hai};  ${kho} − ${hai} = ${kho - hai}`);
},

/* 5. Đường gấp khúc ABCDE — bài toán ngược */
() => {
  const q = Q(5, 'Đường gấp khúc ABCDE gồm bốn đoạn thẳng AB, BC, CD và DE.');
  const pool = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65].sort(() => Math.random() - .5);
  const ab = pool[0], bc = pool[1], cd = pool[2], de = pool[3];
  const tong = ab + bc + cd + de;
  const ten = ['AB', 'BC', 'CD', 'DE'], val = [ab, bc, cd, de];
  const lon = Math.max(...val);
  return q.done(`<div class="bullet">AB = ${ab} cm, BC = ${bc} cm, DE = ${de} cm.</div>
    <div class="bullet">Cả đường gấp khúc ABCDE dài ${tong} cm.</div>
    <div class="fill-line">Đoạn thẳng CD dài ${q.num(cd)} cm.</div>
    <div class="fill-line">Đường gấp khúc ABC dài ${q.num(ab + bc)} cm.</div>
    <div class="fill-line">Đoạn thẳng dài nhất là ${q.pick(ten[val.indexOf(lon)], ten)}</div>`,
    `${tong} − ${ab} − ${bc} − ${de} = ${cd} (cm)`);
},

/* 6. Sơ đồ phép tính — tìm số ban đầu */
() => {
  const q = Q(6, 'Tìm các số còn thiếu, biết kết quả cuối cùng đã cho.');
  const st = R(100, 400), p = R(20, 150), m = R(30, 110), k = R(10, 120);
  const n2 = st + p, n3 = n2 - m, n4 = n3 + k;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(st)}</span>${b8advArrow('+ ' + p)}
      <span class="fnode circle">${q.num(n2)}</span>${b8advArrow('− ' + m)}
      <span class="fnode sq">${q.num(n3)}</span>${b8advArrow('+ ' + k)}
      <span class="fnode circle">${n4}</span>
    </div>
    <div class="hint-line">Hãy tính ngược từ kết quả cuối cùng trở về số ban đầu.</div>`,
    `${n4} − ${k} = ${n3};  ${n3} + ${m} = ${n2};  ${n2} − ${p} = ${st}`);
},
];
