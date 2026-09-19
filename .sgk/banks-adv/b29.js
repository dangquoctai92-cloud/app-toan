/* ===== NÂNG CAO — Bài 29: Luyện tập chung ===== */

const b29advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

/* một phép chia hết, số chia và thương từ 2 đến 9 */
const b29advDiv = () => { const b = R(2, 9), t = R(2, 9); return {a: b * t, b: b, t: t}; };

/* một phép chia số có hai chữ số cho số có một chữ số
   loai 0 = chia hết · 1 = số dư lớn nhất (bằng số chia trừ 1) · 2 = số dư khác */
const b29advChia = loai => {
  const b = R(3, 9), t = R(2, 9);
  const r = loai === 0 ? 0 : (loai === 1 ? b - 1 : R(1, b - 2));
  return {a: b * t + r, b: b, t: t, r: r, loai: loai};
};

ADV.b29 = [

/* 1. Tìm số có hai chữ số theo nhiều điều kiện (phép chia có dư) */
() => {
  const q = Q(1, 'Tìm số có hai chữ số thoả mãn tất cả các điều kiện sau.');
  let a = 5, r = 2, N = 47, L = 45, H = 49;
  for (let g = 0; g < 400; g++){
    const aa = R(4, 9), rr = R(1, aa - 2), tt = R(3, 9);
    const nn = aa * tt + rr;
    if (nn < 20 || nn > 95) continue;
    const p = R(1, aa - 1);
    const ll = nn - p, hh = nn + (aa - p);
    if (ll < 10 || hh > 99) continue;
    a = aa; r = rr; N = nn; L = ll; H = hh; break;
  }
  return q.done(`<div class="bullet">Số đó lớn hơn ${L} và bé hơn ${H}.</div>
    <div class="bullet">Số đó chia cho ${a} thì có số dư là ${r}.</div>
    <div class="fill-line">Số đó là ${q.num(N)}</div>
    <div class="fill-line">Số đó chia cho ${a} được thương là ${q.num((N - r) / a)}</div>
    <div class="fill-line">Số liền sau của số đó chia cho ${a} có số dư là ${q.num(r + 1)}</div>
    <div class="hint-line">Hãy thử lần lượt các số lớn hơn ${L} và bé hơn ${H}.</div>`,
    `${N} : ${a} = ${(N - r) / a} (dư ${r});  ${N + 1} : ${a} = ${(N - r) / a} (dư ${r + 1}).`);
},

/* 2. Bài toán chia có dư: cần ít nhất bao nhiêu thuyền */
() => {
  const q = Q(2, '');
  const k = R(4, 9), t = R(4, 9), r = R(1, k - 1), N = k * t + r;
  return q.done(`<p class="wordq">Có ${N} bạn học sinh đi tham quan hồ. Mỗi chiếc thuyền chở được
      nhiều nhất ${k} bạn. Hỏi cần ít nhất bao nhiêu chiếc thuyền để chở hết số bạn đó?</p>
    <div class="fill-line">Ta có: ${N} : ${k} = ${q.num(t)} (dư ${q.num(r, 1)})</div>
    <div class="fill-line">Có ${q.num(t)} chiếc thuyền chở đủ ${k} bạn và còn ${q.num(r, 1)} bạn nữa.</div>
    <div class="fill-line">Vậy cần ít nhất ${q.num(t + 1)} chiếc thuyền.</div>`,
    `${N} : ${k} = ${t} (dư ${r}), còn ${r} bạn nên phải thêm 1 thuyền: ${t} + 1 = ${t + 1} (thuyền).`);
},

/* 3. Sơ đồ mũi tên ba bước và sơ đồ ngược */
() => {
  const q = Q(3, 'Tìm số còn thiếu trong mỗi sơ đồ sau.');
  const b1 = R(2, 5), s1 = R(3, 9), k1 = R(2, 4), c1 = R(2, 9);
  const n1 = b1 * s1, m1 = n1 * k1, p1 = s1 * k1, e1 = p1 + c1;
  const k2 = R(2, 5), m2 = R(3, 12), g2 = R(2, 5);
  const E2 = m2 * k2, A2 = m2 * g2;
  return q.done(`<div class="flow">
      <span class="fnode circle" style="background:#cfe8b0">${n1}</span>${b29advArrow('gấp ' + k1 + ' lần')}
      <span class="fnode sq">${q.num(m1)}</span>${b29advArrow('giảm ' + b1 + ' lần')}
      <span class="fnode sq">${q.num(p1)}</span>${b29advArrow('thêm ' + c1 + ' đơn vị')}
      <span class="fnode tri">${q.num(e1)}</span>
    </div>
    <div class="flow">
      <span class="fnode sq">${q.num(A2)}</span>${b29advArrow('giảm ' + g2 + ' lần')}
      <span class="fnode sq">${q.num(m2)}</span>${b29advArrow('gấp ' + k2 + ' lần')}
      <span class="fnode circle" style="background:#cfe8b0">${E2}</span>
    </div>
    <div class="hint-line">Sơ đồ thứ hai chỉ cho biết số ở ô cuối cùng, hãy tính ngược trở lại.</div>`,
    `Sơ đồ 1: ${n1} × ${k1} = ${m1};  ${m1} : ${b1} = ${p1};  ${p1} + ${c1} = ${e1}. `
    + `Sơ đồ 2: ${E2} : ${k2} = ${m2};  ${m2} × ${g2} = ${A2}.`);
},

/* 4. So sánh giá trị hai biểu thức */
() => {
  const q = Q(4, 'Tính giá trị mỗi vế rồi điền dấu thích hợp vào ô trống.');
  const x1 = R(11, 33), m1 = R(2, 3), x2 = R(11, 33), m2 = R(2, 3);
  const d1 = b29advDiv(), d2 = b29advDiv();
  const d3 = b29advDiv(), h3 = R(1, 9), x3 = R(2, 9), m3 = R(2, 4);
  const x4 = R(6, 12), m4 = R(3, 5), d4 = b29advDiv();
  const h4 = R(1, Math.max(1, x4 * m4 - 4));
  const rows = [
    {t:`${x1} × ${m1}`, p:`${x2} × ${m2}`, l:x1 * m1, r:x2 * m2},
    {t:`${d1.a} : ${d1.b}`, p:`${d2.a} : ${d2.b}`, l:d1.t, r:d2.t},
    {t:`${d3.a} : ${d3.b} + ${h3}`, p:`${x3} × ${m3}`, l:d3.t + h3, r:x3 * m3},
    {t:`${x4} × ${m4} − ${h4}`, p:`${d4.a} : ${d4.b}`, l:x4 * m4 - h4, r:d4.t}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b29adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b29adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.t} = ${x.l} · ${x.p} = ${x.r}`).join('  |  '));
},

/* 5. Bài toán ba bước: giảm đi, gấp lên rồi tìm phần còn lại */
() => {
  const q = Q(5, '');
  const n = R(2, 3), a = n + 2 + R(0, 2), s = R(6, 15), A = a * s;
  const chieu = s * n, con = A - s - chieu;
  return q.done(`<p class="wordq">Một cửa hàng có ${A} kg gạo. Buổi sáng cửa hàng bán được số gạo bằng
      số gạo đó giảm đi ${a} lần. Buổi chiều bán được số gạo gấp ${n} lần buổi sáng.
      Hỏi sau hai buổi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?</p>
    <div class="fill-line">Buổi sáng cửa hàng bán được ${q.num(s)} kg gạo.</div>
    <div class="fill-line">Buổi chiều cửa hàng bán được ${q.num(chieu)} kg gạo.</div>
    <div class="fill-line">Cả hai buổi cửa hàng bán được ${q.num(s + chieu)} kg gạo.</div>
    <div class="fill-line">Cửa hàng còn lại ${q.num(con)} kg gạo.</div>`,
    `${A} : ${a} = ${s} (kg);  ${s} × ${n} = ${chieu} (kg);  ${s} + ${chieu} = ${s + chieu} (kg);  `
    + `${A} − ${s + chieu} = ${con} (kg).`);
},

/* 6. Chọn phép chia hết và phép chia có số dư lớn nhất */
() => {
  const q = Q(6, 'Quan sát các phép chia dưới đây rồi trả lời.');
  const n0 = R(1, 2), n1 = R(1, 2);
  const loai = [];
  for (let i = 0; i < n0; i++) loai.push(0);
  for (let i = 0; i < n1; i++) loai.push(1);
  while (loai.length < 6) loai.push(2);
  const items = [];
  for (let g = 0; g < 600 && items.length < 6; g++){
    const it = b29advChia(loai[items.length]);
    if (items.some(x => x.a === it.a && x.b === it.b)) continue;
    items.push(it);
  }
  while (items.length < 6) items.push(b29advChia(loai[items.length]));
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const all = items.sort(() => Math.random() - .5).map((x, i) => Object.assign({}, x, {L: L[i]}));
  const het = all.filter(x => x.r === 0).map(x => x.L).sort().join(',');
  const lon = all.filter(x => x.r === x.b - 1).map(x => x.L).sort().join(',');
  return q.done(`<div class="b29adv-grid">${all.map(x =>
      `<div class="b29adv-cell"><em>${x.L}</em>${x.a} : ${x.b}</div>`).join('')}</div>
    <div class="fill-line">Các phép chia hết là: ${q.pick(het, L)}</div>
    <div class="fill-line">Các phép chia có số dư lớn nhất là: ${q.pick(lon, L)}</div>
    <div class="fill-line">Có ${q.num(all.filter(x => x.r > 0).length, 1)} phép chia có dư.</div>
    <div class="hint-line">Trong một phép chia, số dư luôn bé hơn số chia nên số dư lớn nhất
      bằng số chia bớt đi 1 đơn vị.</div>`,
    all.map(x => `${x.L}: ${x.a} : ${x.b} = ${x.t}` + (x.r ? ` (dư ${x.r})` : ' (chia hết)')).join(' · '));
},
];
