/*CSS
.b50adv-two{width:100%;max-width:250px;height:auto;display:block;margin:8px auto}
.b50adv-side{min-width:190px}
.b50adv-sub{font-weight:700;margin:9px 0 2px}
.b50adv-let{color:#d63384;font-weight:800;margin-right:5px}
CSS*/

/* ===== NÂNG CAO — Bài 50: Chu vi hình tam giác, hình tứ giác,
   hình chữ nhật, hình vuông ===== */

/* hai hình vuông cạnh a ghép sát nhau thành một hình chữ nhật */
const b50advTwoSq = a => `<svg viewBox="-42 -26 236 112" class="b50adv-two">
  <rect x="0" y="0" width="70" height="70" fill="#fdf0c8" stroke="#c98a00" stroke-width="2.6"/>
  <rect x="70" y="0" width="70" height="70" fill="#dff0fb" stroke="#3f7fa5" stroke-width="2.6"/>
  <text x="35" y="-9" text-anchor="middle" font-size="14" font-weight="700">${a} cm</text>
  <text x="105" y="-9" text-anchor="middle" font-size="14" font-weight="700">${a} cm</text>
  <text x="-8" y="42" text-anchor="end" font-size="14" font-weight="700">${a} cm</text>
</svg>`;

ADV.b50 = [

/* 1. Bài toán ngược: tìm cạnh khi đã biết chu vi */
() => {
  const q = Q(1, 'Tìm độ dài cạnh còn thiếu của mỗi hình.');
  const s = R(4, 25), P1 = s * 4;
  const d = R(8, 20), r = R(3, d - 1), P2 = (d + r) * 2, nua = d + r;
  const c1 = R(6, 15), c2 = R(6, 15), c3 = R(6, 15), P3 = c1 + c2 + c3;
  return q.done(`<div class="b50adv-sub"><span class="b50adv-let">a)</span>Một hình vuông có chu vi
      ${P1} cm.</div>
    <div class="fill-line">Cạnh của hình vuông đó dài ${q.num(s)} cm.</div>
    <div class="b50adv-sub"><span class="b50adv-let">b)</span>Một hình chữ nhật có chu vi ${P2} cm,
      chiều dài ${d} cm.</div>
    <div class="fill-line">Nửa chu vi hình chữ nhật đó là ${q.num(nua)} cm.</div>
    <div class="fill-line">Chiều rộng hình chữ nhật đó là ${q.num(r)} cm.</div>
    <div class="b50adv-sub"><span class="b50adv-let">c)</span>Một hình tam giác có chu vi ${P3} cm,
      trong đó hai cạnh dài ${c1} cm và ${c2} cm.</div>
    <div class="fill-line">Cạnh còn lại của hình tam giác đó dài ${q.num(c3)} cm.</div>
    <div class="hint-line">Chu vi hình vuông bằng cạnh nhân với 4;
      chu vi hình chữ nhật bằng nửa chu vi nhân với 2.</div>`,
    `a) ${P1} : 4 = ${s} (cm).  b) ${P2} : 2 = ${nua} (cm); ${nua} − ${d} = ${r} (cm).  `
    + `c) ${P3} − ${c1} − ${c2} = ${c3} (cm).`);
},

/* 2. Tìm chiều dài, chiều rộng theo chu vi và số lần gấp */
() => {
  const q = Q(2, '');
  const r = R(3, 12), k = pick([2, 3]), d = k * r;
  const nua = d + r, P = nua * 2;
  return q.done(`<p class="wordq">Một mảnh vườn hình chữ nhật có chu vi ${P} m,
      chiều dài gấp ${k} lần chiều rộng. Tính chiều dài và chiều rộng mảnh vườn đó.</p>
    <div class="fill-line">Nửa chu vi mảnh vườn là ${q.num(nua)} m.</div>
    <div class="fill-line">Coi chiều rộng là 1 phần thì chiều dài là ${k} phần,
      nửa chu vi gồm ${q.num(k + 1, 1)} phần bằng nhau.</div>
    <div class="fill-line">Chiều rộng mảnh vườn là ${q.num(r)} m.</div>
    <div class="fill-line">Chiều dài mảnh vườn là ${q.num(d)} m.</div>`,
    `${P} : 2 = ${nua} (m);  ${nua} : ${k + 1} = ${r} (m);  ${r} × ${k} = ${d} (m).`);
},

/* 3. So sánh chu vi các hình */
() => {
  const q = Q(3, 'So sánh chu vi của các hình rồi điền dấu thích hợp vào ô trống.');
  const a1 = R(5, 12), d1 = R(6, 14), r1 = R(3, d1 - 1);
  const x = R(6, 15), y = R(6, 15), z = R(6, 15);
  const a3 = R(2, 6);
  const V1 = a1 * 4, W1 = (d1 + r1) * 2;
  const V2 = x + y + z, W2 = V2 + pick([-8, -4, 0, 0, 5, 9]);
  const V3 = a3 * 40, W3 = V3 + pick([-20, -10, 0, 0, 10, 20]);
  const rows = [
    {t: `Chu vi hình vuông cạnh ${a1} cm`, p: `Chu vi hình chữ nhật<br>dài ${d1} cm, rộng ${r1} cm`,
      l: V1, r: W1},
    {t: `Chu vi hình tam giác có ba cạnh<br>${x} cm, ${y} cm, ${z} cm`, p: `${W2} cm`, l: V2, r: W2},
    {t: `Chu vi hình vuông cạnh ${a3} dm`, p: `${W3} cm`, l: V3, r: W3}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(v =>
      `<div class="cmp-row"><span class="side b50adv-side">${v.t}</span>${
        q.sign(v.l > v.r ? '>' : v.l < v.r ? '<' : '=')}<span class="side b50adv-side">${v.p}</span></div>`
    ).join('')}</div></div>
    <div class="hint-line">1 dm = 10 cm · Tính chu vi của mỗi hình rồi so sánh ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `${a1} × 4 = ${V1} (cm); (${d1} + ${r1}) × 2 = ${W1} (cm).  `
    + `${x} + ${y} + ${z} = ${V2} (cm).  ${a3} × 4 = ${a3 * 4} (dm) = ${V3} (cm).`);
},

/* 4. Ghép hai hình vuông thành một hình chữ nhật */
() => {
  const q = Q(4, '');
  const a = R(3, 12);
  const cvV = a * 4, tong = cvV * 2, dai = a * 2, cvCN = (dai + a) * 2;
  return q.done(`<p class="wordq">Ghép hai hình vuông có cạnh ${a} cm lại với nhau
      để được một hình chữ nhật như hình vẽ.</p>`
    + b50advTwoSq(a)
    + `<div class="fill-line">Chu vi mỗi hình vuông là ${q.num(cvV)} cm.</div>
       <div class="fill-line">Tổng chu vi hai hình vuông là ${q.num(tong)} cm.</div>
       <div class="fill-line">Hình chữ nhật ghép được có chiều dài ${q.num(dai)} cm
         và chiều rộng ${q.num(a)} cm.</div>
       <div class="fill-line">Chu vi hình chữ nhật đó là ${q.num(cvCN)} cm.</div>
       <div class="fill-line">Chu vi hình chữ nhật bé hơn tổng chu vi hai hình vuông
         ${q.num(tong - cvCN)} cm.</div>`,
    `${a} × 4 = ${cvV} (cm); ${cvV} × 2 = ${tong} (cm); ${a} × 2 = ${dai} (cm); `
    + `(${dai} + ${a}) × 2 = ${cvCN} (cm); ${tong} − ${cvCN} = ${tong - cvCN} (cm).`);
},

/* 5. Bài toán ba bước: rào nhiều vòng dây thép quanh vườn */
() => {
  const q = Q(5, '');
  const d = R(8, 20), r = R(4, d - 2), c = R(1, 3), k = pick([2, 3]);
  const cv = (d + r) * 2, mot = cv - c, all = mot * k;
  return q.done(`<p class="wordq">Bác Ba rào xung quanh một mảnh vườn hình chữ nhật có chiều dài ${d} m,
      chiều rộng ${r} m. Bác rào ${k} vòng dây thép, mỗi vòng đều chừa lại một cửa ra vào rộng ${c} m.
      Hỏi bác Ba cần bao nhiêu mét dây thép?</p>
    <div class="fill-line">Chu vi mảnh vườn là ${q.num(cv)} m.</div>
    <div class="fill-line">Mỗi vòng dây thép dài ${q.num(mot)} m.</div>
    <div class="fill-line">Bác Ba cần ${q.num(all)} m dây thép.</div>`,
    `(${d} + ${r}) × 2 = ${cv} (m);  ${cv} − ${c} = ${mot} (m);  ${mot} × ${k} = ${all} (m).`);
},

/* 6. So sánh ba hình, chọn hình có chu vi lớn nhất và bé nhất */
() => {
  const q = Q(6, 'Cho ba hình dưới đây.');
  let a = 5, d = 8, r = 3, x = 6, y = 7, z = 8;
  for (let g = 0; g < 200; g++){
    const aa = R(4, 10), dd = R(6, 13), rr = R(3, dd - 1);
    const xx = R(5, 12), yy = R(5, 12), zz = R(5, 12);
    if (new Set([4 * aa, (dd + rr) * 2, xx + yy + zz]).size === 3){
      a = aa; d = dd; r = rr; x = xx; y = yy; z = zz; break;
    }
  }
  const P = [a * 4, (d + r) * 2, x + y + z];
  const L = ['A', 'B', 'C'];
  const maxL = L[P.indexOf(Math.max.apply(null, P))];
  const minL = L[P.indexOf(Math.min.apply(null, P))];
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Hình</th><th>Mô tả</th></tr>
      <tr><td>A</td><td>Hình vuông cạnh ${a} cm</td></tr>
      <tr><td>B</td><td>Hình chữ nhật chiều dài ${d} cm, chiều rộng ${r} cm</td></tr>
      <tr><td>C</td><td>Hình tam giác có ba cạnh ${x} cm, ${y} cm, ${z} cm</td></tr>
    </table></div>
    <div class="fill-line">Chu vi hình A là ${q.num(P[0])} cm.</div>
    <div class="fill-line">Chu vi hình B là ${q.num(P[1])} cm.</div>
    <div class="fill-line">Chu vi hình C là ${q.num(P[2])} cm.</div>
    <div class="fill-line">Hình có chu vi lớn nhất là hình ${q.pick(maxL, L)}</div>
    <div class="fill-line">Hình có chu vi bé nhất là hình ${q.pick(minL, L)}</div>
    <div class="fill-line">Chu vi hình lớn nhất hơn chu vi hình bé nhất
      ${q.num(Math.max.apply(null, P) - Math.min.apply(null, P))} cm.</div>`,
    `A: ${a} × 4 = ${P[0]} (cm); B: (${d} + ${r}) × 2 = ${P[1]} (cm); `
    + `C: ${x} + ${y} + ${z} = ${P[2]} (cm).`);
},
];
