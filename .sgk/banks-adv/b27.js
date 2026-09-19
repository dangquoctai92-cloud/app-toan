/* ===== NÂNG CAO — Bài 27: Giảm một số đi một số lần ===== */

const b27advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

/* một phép chia hết "số : số" với thương và số chia từ 2 đến 9 */
const b27advDiv = () => { const b = R(2, 9), t = R(2, 9); return {a: b * t, b: b, t: t}; };

ADV.b27 = [

/* 1. Bài toán ngược trên sơ đồ mũi tên: biết số cuối, tìm các số trước đó */
() => {
  const q = Q(1, 'Biết số ở ô cuối cùng, hãy tìm các số còn thiếu trong mỗi sơ đồ.');
  const k1 = R(2, 5), g1 = R(2, 5), t1 = R(2, 9);
  const A1 = g1 * t1, B1 = A1 * k1, C1 = t1 * k1;
  const g2 = R(2, 5), m2 = R(4, 14), d2 = R(2, 9);
  const A2 = g2 * m2, E2 = m2 + d2;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(A1)}</span>${b27advArrow('gấp ' + k1 + ' lần')}
      <span class="fnode sq">${q.num(B1)}</span>${b27advArrow('giảm ' + g1 + ' lần')}
      <span class="fnode circle" style="background:#cfe8b0">${C1}</span>
    </div>
    <div class="flow">
      <span class="fnode sq">${q.num(A2)}</span>${b27advArrow('giảm ' + g2 + ' lần')}
      <span class="fnode sq">${q.num(m2)}</span>${b27advArrow('thêm ' + d2 + ' đơn vị')}
      <span class="fnode circle" style="background:#cfe8b0">${E2}</span>
    </div>
    <div class="hint-line">Đi ngược từ ô cuối: làm ngược lại của giảm là gấp, làm ngược lại của gấp là giảm.</div>`,
    `Sơ đồ 1: ${C1} × ${g1} = ${B1};  ${B1} : ${k1} = ${A1}. `
    + `Sơ đồ 2: ${E2} − ${d2} = ${m2};  ${m2} × ${g2} = ${A2}.`);
},

/* 2. Tìm số có hai chữ số thoả mãn nhiều điều kiện */
() => {
  const q = Q(2, 'Tìm số có hai chữ số thoả mãn tất cả các điều kiện sau.');
  let a = 7, d = 9, N = 49;
  for (let g = 0; g < 300; g++){
    const aa = R(3, 9), dd = R(0, 9);
    const cands = [];
    for (let x = 10; x <= 99; x++)
      if (x % aa === 0 && x / aa <= 9 && x % 10 === dd) cands.push(x);
    if (cands.length !== 1) continue;
    a = aa; d = dd; N = cands[0]; break;
  }
  const k = R(2, 4);
  return q.done(`<div class="bullet">Số đó là số có hai chữ số.</div>
    <div class="bullet">Giảm số đó đi ${a} lần thì được một số có một chữ số.</div>
    <div class="bullet">Chữ số hàng đơn vị của số đó là ${d}.</div>
    <div class="fill-line">Số đó là ${q.num(N)}</div>
    <div class="fill-line">Giảm số đó đi ${a} lần thì được ${q.num(N / a)}</div>
    <div class="fill-line">Gấp số đó lên ${k} lần thì được ${q.num(N * k)}</div>
    <div class="hint-line">Hãy viết các số có hai chữ số giảm đi ${a} lần được số có một chữ số,
      rồi chọn số có chữ số hàng đơn vị là ${d}.</div>`,
    `Số cần tìm là ${N} vì ${N} : ${a} = ${N / a} và ${N} có chữ số hàng đơn vị là ${d}. `
    + `${N} × ${k} = ${N * k}.`);
},

/* 3. So sánh giá trị hai biểu thức có gấp, giảm */
() => {
  const q = Q(3, 'Tính giá trị mỗi vế rồi điền dấu thích hợp vào ô trống.');
  const d1 = b27advDiv(), d2 = b27advDiv();
  const d3 = b27advDiv(), e3 = R(2, 5), f3 = R(2, 5);
  const d4 = b27advDiv(), h4 = R(1, 9), d5 = b27advDiv();
  const x6 = R(2, 9), m6 = R(2, 4), d6 = b27advDiv();
  const rows = [
    {t:`${d1.a} : ${d1.b}`, p:`${d2.a} : ${d2.b}`, l:d1.t, r:d2.t},
    {t:`${d3.a} : ${d3.b}`, p:`${e3} × ${f3}`, l:d3.t, r:e3 * f3},
    {t:`${d4.a} : ${d4.b} + ${h4}`, p:`${d5.a} : ${d5.b}`, l:d4.t + h4, r:d5.t},
    {t:`${x6} × ${m6}`, p:`${d6.a} : ${d6.b}`, l:x6 * m6, r:d6.t}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b27adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b27adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.t} = ${x.l} · ${x.p} = ${x.r}`).join('  |  '));
},

/* 4. Bài toán ba bước: giảm một số lần rồi gấp một số lần */
() => {
  const q = Q(4, '');
  const a = R(2, 5), n = R(6, 18), k = R(2, 3);
  const cam = a * n, chanh = n, buoi = n * k;
  return q.done(`<p class="wordq">Vườn nhà bác Tư có ${cam} cây cam. Số cây chanh bằng số cây cam
      giảm đi ${a} lần. Số cây bưởi gấp ${k} lần số cây chanh.</p>
    <div class="fill-line">Vườn nhà bác Tư có ${q.num(chanh)} cây chanh.</div>
    <div class="fill-line">Vườn nhà bác Tư có ${q.num(buoi)} cây bưởi.</div>
    <div class="fill-line">Cả ba loại cây có tất cả ${q.num(cam + chanh + buoi)} cây.</div>
    <div class="fill-line">Số cây cam nhiều hơn số cây chanh là ${q.num(cam - chanh)} cây.</div>`,
    `${cam} : ${a} = ${chanh} (cây);  ${chanh} × ${k} = ${buoi} (cây);  `
    + `${cam} + ${chanh} + ${buoi} = ${cam + chanh + buoi} (cây);  ${cam} − ${chanh} = ${cam - chanh} (cây).`);
},

/* 5. Bài toán ngược: hai lần giảm liên tiếp */
() => {
  const q = Q(5, '');
  const a = R(2, 4), b = R(2, 3), c = R(3, 9);
  const giua = c * b, dau = giua * a;
  return q.done(`<p class="wordq">Rô-bốt có một số đồng vàng. Khi đi qua ngã rẽ thứ nhất, số đồng vàng
      của Rô-bốt giảm đi ${a} lần. Khi đi qua ngã rẽ thứ hai, số đồng vàng lại giảm đi ${b} lần và
      Rô-bốt chỉ còn ${c} đồng vàng. Hỏi lúc đầu Rô-bốt có bao nhiêu đồng vàng?</p>
    <div class="fill-line">Sau ngã rẽ thứ nhất, Rô-bốt có ${q.num(giua)} đồng vàng.</div>
    <div class="fill-line">Lúc đầu Rô-bốt có ${q.num(dau)} đồng vàng.</div>
    <div class="fill-line">So với lúc đầu, số đồng vàng của Rô-bốt đã giảm đi ${q.num(a * b)} lần.</div>`,
    `${c} × ${b} = ${giua} (đồng);  ${giua} × ${a} = ${dau} (đồng);  ${a} × ${b} = ${a * b} (lần).`);
},

/* 6. Bảng: gấp lên và giảm đi một số lần */
() => {
  const q = Q(6, 'Số ? (cột thứ nhất đã làm mẫu).');
  const ts = [];
  for (let g = 0; g < 60 && ts.length < 4; g++){ const t = R(2, 9); if (!ts.includes(t)) ts.push(t); }
  while (ts.length < 4) ts.push(ts.length + 2);
  const k = R(3, 4);
  const nums = ts.map(t => t * 10);
  const cell = (v, i) => i === 0 ? `<td>${v}</td>` : `<td>${q.num(v)}</td>`;
  return q.done(`<div class="tbl-wrap"><table class="tbl green">
      <tr><th>Số đã cho</th>${nums.map(v => `<td>${v}</td>`).join('')}</tr>
      <tr><th>Giảm đi 2 lần</th>${nums.map((v, i) => cell(v / 2, i)).join('')}</tr>
      <tr><th>Giảm đi 5 lần</th>${nums.map((v, i) => cell(v / 5, i)).join('')}</tr>
      <tr><th>Gấp ${k} lần</th>${nums.map((v, i) => cell(v * k, i)).join('')}</tr>
    </table></div>
    <div class="hint-line">Giảm đi một số lần thì làm phép chia, gấp lên một số lần thì làm phép nhân.</div>`,
    nums.map(v => `${v}: ${v / 2} · ${v / 5} · ${v * k}`).join('  |  '));
},
];
