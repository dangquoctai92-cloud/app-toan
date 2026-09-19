/* ===== NÂNG CAO — Bài 20: Thực hành vẽ góc vuông, vẽ đường tròn,
   hình vuông, hình chữ nhật và vẽ trang trí ===== */

/* hai đường tròn: đường tròn tâm O vẽ bán kính, đường tròn tâm I vẽ đường kính */
const b20advPx = v => 15 + v * 5;

const b20advPair = (r1, r2) => {
  const a = b20advPx(r1), b = b20advPx(r2);
  const H = 2 * Math.max(a, b) + 40, W = 2 * a + 2 * b + 64, cy = H / 2;
  const c1 = a + 14, c2 = 2 * a + b + 46;
  return `<svg viewBox="0 0 ${W} ${H}" class="b20adv-wide">
    <circle cx="${c1}" cy="${cy}" r="${a}" fill="#eaf5ff" stroke="#1f6fb2" stroke-width="2.8"/>
    <path d="M${c1} ${cy}H${c1 + a}" stroke="#c2185b" stroke-width="2.6"/>
    <circle cx="${c1}" cy="${cy}" r="3.2"/>
    <text x="${c1 - 12}" y="${cy - 7}" text-anchor="middle" font-size="15" font-weight="700">O</text>
    <text x="${c1 + a / 2}" y="${cy - 7}" text-anchor="middle" font-size="14" font-weight="700" fill="#c2185b">${r1} cm</text>
    <circle cx="${c2}" cy="${cy}" r="${b}" fill="#f2fbe9" stroke="#3f7c34" stroke-width="2.8"/>
    <path d="M${c2 - b} ${cy}H${c2 + b}" stroke="#c2185b" stroke-width="2.6"/>
    <circle cx="${c2}" cy="${cy}" r="3.2"/>
    <text x="${c2 - 12}" y="${cy - 7}" text-anchor="middle" font-size="15" font-weight="700">I</text>
    <text x="${c2}" y="${cy + 20}" text-anchor="middle" font-size="14" font-weight="700" fill="#c2185b">${2 * r2} cm</text>
  </svg>`;
};

/* n đường tròn bằng nhau, tâm cùng nằm trên một đường thẳng, hai hình liền nhau chạm nhau */
const b20advChainC = (n, r) => {
  const p = 12 + r * 6, W = 2 * p * n + 20, H = 2 * p + 26, cy = H / 2;
  let s = `<path d="M6 ${cy}H${W - 6}" stroke="#c2185b" stroke-width="1.6" stroke-dasharray="6 4"/>`;
  for (let i = 0; i < n; i++){
    const cx = 10 + p + i * 2 * p;
    s += `<circle cx="${cx}" cy="${cy}" r="${p}" fill="none" stroke="#1f6fb2" stroke-width="2.6"/>
      <circle cx="${cx}" cy="${cy}" r="3"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="b20adv-wide">${s}</svg>`;
};

/* lưới ô vuông có một hình chữ nhật a × b ô và một hình vuông cạnh c ô */
const b20advLat = (a, b, c) => {
  const S = 22, cols = a + c + 3, rows = Math.max(b, c) + 2, W = cols * S, H = rows * S;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * S} 0V${H}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * S}H${W}`;
  const y1 = (rows - b - 1) * S, y2 = (rows - c - 1) * S;
  return `<svg viewBox="-6 -6 ${W + 12} ${H + 12}" class="b20adv-wide">
    <path d="${g}" fill="none" stroke="#9fd0ef" stroke-width="1"/>
    <rect x="${S}" y="${y1}" width="${a * S}" height="${b * S}" fill="#fdeaf2" stroke="#c2185b" stroke-width="3"/>
    <rect x="${(a + 2) * S}" y="${y2}" width="${c * S}" height="${c * S}" fill="#eaf7e4" stroke="#3f7c34" stroke-width="3"/>
  </svg>`;
};

/* hình trang trí gồm m đường tròn bằng nhau: một đường tròn ở giữa, các đường còn lại xếp đều xung quanh */
const b20advDeco = m => {
  const cx = 80, cy = 80, R0 = 25;
  let s = `<circle cx="${cx}" cy="${cy}" r="${R0}" fill="none" stroke="#2b2b2b" stroke-width="2.4"/>
    <circle cx="${cx}" cy="${cy}" r="2.4"/>`;
  for (let i = 1; i < m; i++){
    const t = (i - 1) * 2 * Math.PI / (m - 1) - Math.PI / 2;
    const x = cx + R0 * Math.cos(t), y = cy + R0 * Math.sin(t);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R0}" fill="none" stroke="#2b2b2b" stroke-width="2.4"/>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4"/>`;
  }
  return `<svg viewBox="0 0 160 160" class="b20adv-deco">${s}</svg>`;
};

ADV.b20 = [

/* 1. Bán kính và đường kính của hai đường tròn */
() => {
  const q = Q(1, 'Quan sát hai đường tròn dưới đây rồi trả lời.');
  const r1 = R(2, 9);
  let r2 = R(2, 9);
  for (let g = 0; g < 40 && r2 === r1; g++) r2 = R(2, 9);
  if (r2 === r1) r2 = r1 === 9 ? 8 : r1 + 1;
  const ten = r1 > r2 ? 'O' : 'I';
  return q.done(b20advPair(r1, r2)
    + `<div class="fill-line">Đường tròn tâm O có bán kính ${r1} cm nên đường kính dài ${q.num(2 * r1, 2)} cm.</div>
       <div class="fill-line">Đường tròn tâm I có đường kính ${2 * r2} cm nên bán kính dài ${q.num(r2, 1)} cm.</div>
       <div class="fill-line">Đường tròn có bán kính dài hơn là đường tròn tâm ${q.pick(ten, ['O', 'I'])}</div>
       <div class="fill-line">Bán kính đường tròn đó dài hơn bán kính đường tròn kia
         ${q.num(Math.abs(r1 - r2), 1)} cm.</div>`,
    `Đường kính dài gấp 2 lần bán kính: ${r1} × 2 = ${2 * r1} (cm);  ${2 * r2} : 2 = ${r2} (cm).  `
    + `${Math.max(r1, r2)} − ${Math.min(r1, r2)} = ${Math.abs(r1 - r2)} (cm).`);
},

/* 2. Dãy đường tròn bằng nhau chạm nhau — bài toán nhiều bước */
() => {
  const q = Q(2, '');
  const n = R(3, 4), r = R(2, 5);
  return q.done(b20advChainC(n, r)
    + `<p class="wordq">Bạn Mai dùng com-pa vẽ ${n} đường tròn bằng nhau, mỗi đường tròn có bán kính ${r} cm.
        Tâm của chúng cùng nằm trên một đường thẳng, hai đường tròn liền nhau chạm vào nhau (như hình vẽ).</p>
       <div class="fill-line">Mỗi đường tròn có đường kính dài ${q.num(2 * r, 2)} cm.</div>
       <div class="fill-line">Khoảng cách giữa hai tâm liền nhau là ${q.num(2 * r, 2)} cm.</div>
       <div class="fill-line">Từ tâm đường tròn đầu tiên đến tâm đường tròn cuối cùng dài
         ${q.num(2 * r * (n - 1), 2)} cm.</div>
       <div class="fill-line">Cả hình vẽ đó dài ${q.num(2 * r * n, 2)} cm.</div>`,
    `${r} × 2 = ${2 * r} (cm).  Có ${n - 1} khoảng cách giữa hai tâm: ${2 * r} × ${n - 1} = ${2 * r * (n - 1)} (cm).  `
    + `Cả hình dài thêm 2 bán kính ở hai đầu: ${2 * r * (n - 1)} + ${r} + ${r} = ${2 * r * n} (cm).`);
},

/* 3. Hình chữ nhật và hình vuông trên lưới ô vuông */
() => {
  const q = Q(3, 'Trên lưới ô vuông có một hình chữ nhật và một hình vuông (như hình vẽ).');
  const a = R(5, 9), b = R(2, 4);
  let c = R(3, 5);
  if (a * b === c * c) c = c === 5 ? 3 : c + 1;
  const oCN = a * b, oV = c * c;
  const nhieu = oCN > oV ? 'hình chữ nhật' : 'hình vuông';
  return q.done(b20advLat(a, b, c)
    + `<div class="fill-line">Hình chữ nhật có chiều dài ${q.num(a, 1)} ô, chiều rộng ${q.num(b, 1)} ô
         và gồm ${q.num(oCN, 2)} ô vuông nhỏ.</div>
       <div class="fill-line">Hình vuông có cạnh dài ${q.num(c, 1)} ô và gồm ${q.num(oV, 2)} ô vuông nhỏ.</div>
       <div class="fill-line">Hình có nhiều ô vuông nhỏ hơn là
         ${q.pick(nhieu, ['hình chữ nhật', 'hình vuông'])}</div>
       <div class="fill-line">Hình đó nhiều hơn hình kia ${q.num(Math.abs(oCN - oV), 2)} ô vuông nhỏ.</div>
       <div class="fill-line">Tổng độ dài bốn cạnh của hình chữ nhật là ${q.num(2 * (a + b), 2)} ô,
         của hình vuông là ${q.num(4 * c, 2)} ô.</div>`,
    `${a} × ${b} = ${oCN} (ô);  ${c} × ${c} = ${oV} (ô);  `
    + `${Math.max(oCN, oV)} − ${Math.min(oCN, oV)} = ${Math.abs(oCN - oV)} (ô).`);
},

/* 4. Quy luật của một hình vẽ trang trí */
() => {
  const q = Q(4, 'Rô-bốt vẽ trang trí bằng những đường tròn bằng nhau theo các bước dưới đây.');
  const t = R(2, 3), n = R(5, 7), m = R(6, 9), tong = 1 + t * (m - 1);
  const steps = [1, 1 + t, 1 + 2 * t];
  const row = '<div class="b20adv-row">' + steps.map((v, i) =>
    `<div class="b20adv-item">${b20advDeco(v)}<em>Bước ${i + 1}</em></div>`).join('') + '</div>';
  return q.done(row
    + `<div class="fill-line">Bước 1 có 1 đường tròn, bước 2 có ${q.num(steps[1], 1)} đường tròn,
         bước 3 có ${q.num(steps[2], 1)} đường tròn.</div>
       <div class="fill-line">Mỗi bước sau vẽ thêm ${q.num(t, 1)} đường tròn.</div>
       <div class="fill-line">Bước ${n} có ${q.num(1 + t * (n - 1), 2)} đường tròn.</div>
       <div class="fill-line">Bước có ${tong} đường tròn là bước ${q.num(m, 1)}.</div>`,
    `Bước ${n}: 1 + ${t} × ${n - 1} = ${1 + t * (n - 1)} (đường tròn).  `
    + `Ngược lại: ${tong} − 1 = ${t * (m - 1)};  ${t * (m - 1)} : ${t} = ${m - 1} nên đó là bước ${m}.`);
},

/* 5. So sánh hai vế */
() => {
  const q = Q(5, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(2, 9), b = 2 * a + pick([-3, -1, 0, 0, 2, 4]);
    rows.push({t:`Đường kính của đường tròn có bán kính ${a} cm`, p:`${b} cm`, l:2 * a, r:b});
  }
  {
    const a = R(2, 9), b = R(2, 9);
    rows.push({t:`Bán kính của đường tròn có đường kính ${2 * a} cm`,
      p:`Bán kính của đường tròn có đường kính ${2 * b} cm`, l:a, r:b});
  }
  {
    const s = R(3, 9), d = R(4, 9), w = R(2, 3);
    rows.push({t:`Tổng độ dài bốn cạnh của hình vuông cạnh ${s} ô`,
      p:`Tổng độ dài bốn cạnh của hình chữ nhật ${d} ô và ${w} ô`, l:4 * s, r:2 * (d + w)});
  }
  {
    const a = R(5, 9), b = R(2, 4), c = R(3, 6);
    rows.push({t:`Số ô vuông nhỏ của hình chữ nhật ${a} ô và ${b} ô`,
      p:`Số ô vuông nhỏ của hình vuông cạnh ${c} ô`, l:a * b, r:c * c});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Đường kính dài gấp 2 lần bán kính · Tính giá trị của mỗi vế rồi so sánh ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},
];
