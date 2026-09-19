/* ===== NÂNG CAO — Bài 12: Bảng nhân 9, bảng chia 9 ===== */

const b12advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

ADV.b12 = [

/* 1. Tìm số theo nhiều điều kiện */
() => {
  const q = Q(1, 'Tìm số thoả mãn tất cả các điều kiện sau.');
  const k = R(3, 8);
  const n = 9 * k;
  return q.done(`<div class="bullet">Số đó là kết quả của một phép nhân trong bảng nhân 9.</div>
    <div class="bullet">Số đó lớn hơn ${9 * (k - 1)}.</div>
    <div class="bullet">Số đó bé hơn ${9 * (k + 1)}.</div>
    <div class="fill-line">Số đó là ${q.num(n)}</div>
    <div class="fill-line">Số đó bằng 9 × ${q.num(k, 1)}</div>
    <div class="fill-line">Số đó chia cho 9 được ${q.num(k, 1)}</div>`,
    `Trong bảng nhân 9, chỉ có ${n} vừa lớn hơn ${9 * (k - 1)} vừa bé hơn ${9 * (k + 1)}: ${n} = 9 × ${k}.`);
},

/* 2. Tìm quy luật dãy số cách đều 9 */
() => {
  const q = Q(2, 'Tìm quy luật của dãy số rồi viết số còn thiếu vào ô trống.');
  const s = R(1, 3);
  const seq = Array.from({length:8}, (_, i) => 9 * (s + i));
  const hid = [];
  let g = 0;
  while (hid.length < 3 && g++ < 60){ const i = R(1, 7); if (!hid.includes(i)) hid.push(i); }
  const nodes = seq.map((v, i) => hid.includes(i)
    ? `<span class="cnode q">${q.num(v)}</span>` : `<span class="cnode">${v}</span>`).join('');
  return q.done(`<div class="chain pill">${nodes}</div>
    <div class="fill-line">Hai số liền nhau trong dãy hơn kém nhau ${q.num(9, 1)} đơn vị.</div>
    <div class="fill-line">Số tiếp theo của dãy là ${q.num(9 * (s + 8))}</div>`,
    `Dãy số cách đều 9 đơn vị: ${seq.join(', ')}, ${9 * (s + 8)}, ...`);
},

/* 3. So sánh biểu thức trong bảng nhân 9, bảng chia 9 */
() => {
  const q = Q(3, 'Tính rồi điền dấu thích hợp vào ô trống.');
  const a = R(2, 9), b = R(2, 9), c = R(2, 8), d = R(2, 9), e = R(2, 9);
  const rows = [
    {l:`9 × ${a}`, r:`9 × ${b}`, v1:9 * a, v2:9 * b},
    {l:`${9 * d} : 9`, r:`${9 * e} : 9`, v1:d, v2:e},
    {l:`9 × ${c} + 9`, r:`9 × ${c + 1}`, v1:9 * c + 9, v2:9 * (c + 1)}
  ];
  return q.done(`<div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.l}</span>${
        q.sign(r.v1 > r.v2 ? '>' : r.v1 < r.v2 ? '<' : '=')}<span class="side">${r.r}</span></div>`).join('')}</div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(r => `${r.l} = ${r.v1} và ${r.r} = ${r.v2}`).join(' · '));
},

/* 4. Bài toán ba bước tính */
() => {
  const q = Q(4, '');
  const moi = R(3, 9), tong = 9 * moi, lay = R(2, 4);
  return q.done(`<p class="wordq">Mẹ mua ${tong} cái bánh rồi xếp đều vào 9 hộp. Mai lấy ${lay} hộp bánh
      mang đến lớp.</p>
    <div class="fill-line">Mỗi hộp có ${q.num(moi, 1)} cái bánh.</div>
    <div class="fill-line">Mai đã mang đến lớp ${q.num(lay * moi)} cái bánh.</div>
    <div class="fill-line">Ở nhà còn lại ${q.num(tong - lay * moi)} cái bánh.</div>`,
    `${tong} : 9 = ${moi};  ${moi} × ${lay} = ${lay * moi};  ${tong} − ${lay * moi} = ${tong - lay * moi}`);
},

/* 5. Bài toán ngược: biết kết quả cuối, tìm số ban đầu */
() => {
  const q = Q(5, 'Tìm các số còn thiếu, biết kết quả cuối cùng đã cho.');
  const st = R(2, 9);
  const n2 = 9 * st;
  const p = R(15, 90);
  const n3 = n2 + p;
  const m = R(10, n3 - 10);
  const n4 = n3 - m;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(st, 1)}</span>${b12advArrow('× 9')}
      <span class="fnode circle">${q.num(n2)}</span>${b12advArrow('+ ' + p)}
      <span class="fnode sq">${q.num(n3)}</span>${b12advArrow('− ' + m)}
      <span class="fnode circle">${n4}</span>
    </div>
    <div class="hint-line">Hãy tính ngược từ kết quả cuối cùng trở về số ban đầu.</div>`,
    `${n4} + ${m} = ${n3};  ${n3} − ${p} = ${n2};  ${n2} : 9 = ${st}`);
},

/* 6. Suy luận: cùng một số vở, nhiều cách xếp */
() => {
  const q = Q(6, '');
  const x = R(2, 9), tong = 9 * x;
  return q.done(`<p class="wordq">Bạn Mai có một số quyển vở. Nếu Mai xếp đều số vở đó vào 9 ngăn
      thì mỗi ngăn có ${x} quyển.</p>
    <div class="fill-line">Mai có tất cả ${q.num(tong)} quyển vở.</div>
    <div class="fill-line">Nếu xếp đều số vở đó vào 3 ngăn thì mỗi ngăn có ${q.num(3 * x)} quyển.</div>
    <div class="fill-line">Nếu mỗi ngăn xếp 9 quyển thì Mai cần dùng ${q.num(x, 1)} ngăn.</div>`,
    `9 × ${x} = ${tong};  ${tong} : 3 = ${3 * x};  ${tong} : 9 = ${x}`);
},
];
