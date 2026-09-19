/* ===== NÂNG CAO — Bài 51: Diện tích của một hình. Xăng-ti-mét vuông ===== */

/* hình trên lưới ô vuông: rows = mảng số ô của từng hàng (căn trái) */
const b51advGrid = (rows, fill, stroke) => {
  const C = 24;
  const cols = Math.max.apply(null, rows);
  const W = cols * C, H = rows.length * C;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * C} 0V${H}`;
  for (let j = 0; j <= rows.length; j++) g += `M0 ${j * C}H${W}`;
  let f = '';
  rows.forEach((len, j) => {
    for (let i = 0; i < len; i++)
      f += `<rect x="${i * C}" y="${j * C}" width="${C}" height="${C}"
        fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  });
  return `<svg viewBox="-3 -3 ${W + 6} ${H + 6}" class="b51adv-gs" style="width:${W + 6}px">
    <path d="${g}" fill="none" stroke="#7fcdec" stroke-width="1"/>${f}</svg>`;
};

/* một hình ngẫu nhiên gồm 2–3 hàng ô vuông, tổng số ô nằm trong khoảng cho trước */
const b51advShape = () => {
  const n = R(2, 3), rows = [];
  for (let i = 0; i < n; i++) rows.push(R(2, 5));
  return rows;
};

const b51advSum = rows => rows.reduce((s, v) => s + v, 0);

ADV.b51 = [

/* 1. Tính giá trị biểu thức hai bước với đơn vị xăng-ti-mét vuông */
() => {
  const q = Q(1, 'Tính giá trị của mỗi biểu thức sau.');
  const cm = 'cm<sup>2</sup>';
  const k1 = R(2, 5), b1 = R(6, 30), a1 = R(20, 80);
  const k2 = R(2, 5), t2 = R(4, 20), b2 = t2 * k2, a2 = t2 + R(10, 60);
  const k3 = R(2, 5), a3 = R(10, 40), b3 = R(5, a3 * k3 - 5);
  const k4 = R(2, 5), t4 = R(6, 30), a4 = t4 * k4, b4 = R(10, 60);
  const v1 = a1 + b1 * k1, v2 = a2 - t2, v3 = a3 * k3 - b3, v4 = t4 + b4;
  return q.done(`<div class="b51adv-cols">
      <div>
        <div class="b51adv-ex"><span class="b51adv-let">a)</span>${a1} ${cm} + ${b1} ${cm} × ${k1}
          = ${q.num(v1, 3)} ${cm}</div>
        <div class="b51adv-ex"><span class="b51adv-let">b)</span>${a2} ${cm} − ${b2} ${cm} : ${k2}
          = ${q.num(v2, 3)} ${cm}</div>
      </div>
      <div>
        <div class="b51adv-ex"><span class="b51adv-let">c)</span>${a3} ${cm} × ${k3} − ${b3} ${cm}
          = ${q.num(v3, 3)} ${cm}</div>
        <div class="b51adv-ex"><span class="b51adv-let">d)</span>${a4} ${cm} : ${k4} + ${b4} ${cm}
          = ${q.num(v4, 3)} ${cm}</div>
      </div>
    </div>
    <div class="hint-line">Trong biểu thức có phép nhân, phép chia và phép cộng, phép trừ
      thì ta làm phép nhân, phép chia trước.</div>`,
    `a) ${b1} × ${k1} = ${b1 * k1}; ${a1} + ${b1 * k1} = ${v1}.  `
    + `b) ${b2} : ${k2} = ${t2}; ${a2} − ${t2} = ${v2}.  `
    + `c) ${a3} × ${k3} = ${a3 * k3}; ${a3 * k3} − ${b3} = ${v3}.  `
    + `d) ${a4} : ${k4} = ${t4}; ${t4} + ${b4} = ${v4}.`);
},

/* 2. Đếm ô vuông, so sánh diện tích ba hình */
() => {
  const q = Q(2, 'Mỗi ô vuông trên lưới có diện tích 1 cm<sup>2</sup>. Quan sát rồi trả lời.');
  let A = [3, 3], B = [4, 2, 2], C = [5, 4];
  for (let g = 0; g < 300; g++){
    const a = b51advShape(), b = b51advShape(), c = b51advShape();
    const s = [b51advSum(a), b51advSum(b), b51advSum(c)];
    if (new Set(s).size === 3 && Math.min.apply(null, s) >= 4){ A = a; B = b; C = c; break; }
  }
  const S = [b51advSum(A), b51advSum(B), b51advSum(C)];
  const L = ['A', 'B', 'C'];
  const maxL = L[S.indexOf(Math.max.apply(null, S))];
  const minL = L[S.indexOf(Math.min.apply(null, S))];
  const hieu = Math.max.apply(null, S) - Math.min.apply(null, S);
  return q.done(`<div class="b51adv-row">
      <div class="b51adv-cell">${b51advGrid(A, '#fbeaa0', '#c98a00')}<em>Hình A</em></div>
      <div class="b51adv-cell">${b51advGrid(B, '#a9dcf5', '#2b4f9e')}<em>Hình B</em></div>
      <div class="b51adv-cell">${b51advGrid(C, '#f6c6d8', '#c2185b')}<em>Hình C</em></div>
    </div>
    <div class="fill-line">Diện tích hình A là ${q.num(S[0], 2)} cm<sup>2</sup>.</div>
    <div class="fill-line">Diện tích hình B là ${q.num(S[1], 2)} cm<sup>2</sup>.</div>
    <div class="fill-line">Diện tích hình C là ${q.num(S[2], 2)} cm<sup>2</sup>.</div>
    <div class="fill-line">Hình có diện tích lớn nhất là hình ${q.pick(maxL, L)}</div>
    <div class="fill-line">Hình có diện tích bé nhất là hình ${q.pick(minL, L)}</div>
    <div class="fill-line">Diện tích hình lớn nhất hơn diện tích hình bé nhất
      ${q.num(hieu, 2)} cm<sup>2</sup>.</div>`,
    `Hình A ${S[0]} ô vuông, hình B ${S[1]} ô vuông, hình C ${S[2]} ô vuông. `
    + `${Math.max.apply(null, S)} − ${Math.min.apply(null, S)} = ${hieu} (cm2).`);
},

/* 3. Bài toán ngược: biết tổng diện tích và số lần gấp */
() => {
  const q = Q(3, '');
  const A = R(6, 30), k = pick([2, 3, 4]), B = A * k, T = A + B;
  return q.done(`<p class="wordq">Hai tấm bìa có tổng diện tích là ${T} cm<sup>2</sup>.
      Diện tích tấm bìa màu xanh gấp ${k} lần diện tích tấm bìa màu vàng.
      Tính diện tích mỗi tấm bìa.</p>
    <div class="fill-line">Coi diện tích tấm bìa màu vàng là 1 phần thì diện tích tấm bìa màu xanh
      là ${k} phần, cả hai tấm bìa gồm ${q.num(k + 1, 1)} phần bằng nhau.</div>
    <div class="fill-line">Diện tích tấm bìa màu vàng là ${q.num(A, 3)} cm<sup>2</sup>.</div>
    <div class="fill-line">Diện tích tấm bìa màu xanh là ${q.num(B, 3)} cm<sup>2</sup>.</div>
    <div class="fill-line">Diện tích tấm bìa màu xanh hơn diện tích tấm bìa màu vàng
      ${q.num(B - A, 3)} cm<sup>2</sup>.</div>`,
    `${T} : ${k + 1} = ${A} (cm2);  ${A} × ${k} = ${B} (cm2);  ${B} − ${A} = ${B - A} (cm2).`);
},

/* 4. So sánh giá trị hai vế có đơn vị xăng-ti-mét vuông */
() => {
  const q = Q(4, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const cm = 'cm<sup>2</sup>';
  const a = R(20, 90), b = R(10, 60), k1 = R(2, 5), c = Math.max(2, Math.round((a + b) / k1) + pick([-2, -1, 0, 0, 1, 3]));
  const m = R(2, 6), t = R(11, 40), d = t * m, e = t + pick([-6, -3, 0, 0, 4, 7]);
  const f = R(15, 60), g2 = R(10, 45), h = R(10, 45);
  const rows = [
    {t: `${a} ${cm} + ${b} ${cm}`, p: `${c} ${cm} × ${k1}`, l: a + b, r: c * k1},
    {t: `${d} ${cm} : ${m}`, p: `${Math.max(1, e)} ${cm}`, l: t, r: Math.max(1, e)},
    {t: `${f} ${cm} × 2`, p: `${g2} ${cm} + ${h} ${cm}`, l: f * 2, r: g2 + h}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(v =>
      `<div class="cmp-row"><span class="side b51adv-side">${v.t}</span>${
        q.sign(v.l > v.r ? '>' : v.l < v.r ? '<' : '=')}<span class="side b51adv-side">${v.p}</span></div>`
    ).join('')}</div></div>
    <div class="hint-line">Tính giá trị của mỗi vế rồi so sánh ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `${a} + ${b} = ${a + b}; ${c} × ${k1} = ${c * k1}.  ${d} : ${m} = ${t}.  `
    + `${f} × 2 = ${f * 2}; ${g2} + ${h} = ${g2 + h}.`);
},

/* 5. Sắp xếp các số đo diện tích theo thứ tự */
() => {
  const q = Q(5, 'Cho các số đo diện tích sau.');
  const vs = [];
  for (let g = 0; g < 200 && vs.length < 4; g++){
    const v = pick([R(51, 99), R(101, 999), R(1001, 9999), R(1001, 9999)]);
    if (!vs.includes(v)) vs.push(v);
  }
  while (vs.length < 4) vs.push(vs.length * 111 + 137);
  const tang = [...vs].sort((p, r) => p - r);
  const giam = [...vs].sort((p, r) => r - p);
  return q.done(`<div class="given-nums">${vs.map(v =>
      `<span class="cnode">${v} cm<sup>2</sup></span>`).join('')}</div>
    <div class="b51adv-sub"><span class="b51adv-let">a)</span>Viết các số đo trên theo thứ tự
      từ bé đến lớn.</div>
    <div class="fill-line">${tang.map(v => q.num(v, 4)).join(' ; ')}</div>
    <div class="b51adv-sub"><span class="b51adv-let">b)</span>Viết các số đo trên theo thứ tự
      từ lớn đến bé.</div>
    <div class="fill-line">${giam.map(v => q.num(v, 4)).join(' ; ')}</div>
    <div class="fill-line"><b>c)</b> Số đo lớn nhất hơn số đo bé nhất
      ${q.num(giam[0] - tang[0], 4)} cm<sup>2</sup>.</div>`,
    `Từ bé đến lớn: ${tang.join(' ; ')} (cm2). ${giam[0]} − ${tang[0]} = ${giam[0] - tang[0]} (cm2).`);
},

/* 6. Bài toán ba bước với đơn vị xăng-ti-mét vuông */
() => {
  const q = Q(6, '');
  const k = R(3, 6), m = R(8, 25), conLai = 2 * R(10, 60), T = k * m + conLai;
  return q.done(`<p class="wordq">Một tờ giấy màu có diện tích ${T} cm<sup>2</sup>.
      Bạn Mai cắt ra ${k} mảnh bằng nhau, mỗi mảnh có diện tích ${m} cm<sup>2</sup> để dán thủ công.
      Phần giấy còn lại Mai cắt thành 2 mảnh có diện tích bằng nhau.</p>
    <div class="fill-line">Diện tích ${k} mảnh giấy Mai đã cắt để dán thủ công là
      ${q.num(k * m, 3)} cm<sup>2</sup>.</div>
    <div class="fill-line">Phần giấy còn lại có diện tích ${q.num(conLai, 3)} cm<sup>2</sup>.</div>
    <div class="fill-line">Mỗi mảnh giấy cắt sau cùng có diện tích
      ${q.num(conLai / 2, 3)} cm<sup>2</sup>.</div>`,
    `${m} × ${k} = ${k * m} (cm2);  ${T} − ${k * m} = ${conLai} (cm2);  `
    + `${conLai} : 2 = ${conLai / 2} (cm2).`);
},
];
