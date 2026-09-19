/*CSS
.b38adv-eq{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:19px;font-weight:800;
  color:#2b3a55;background:#f2f7ff;border:2.5px solid #b9cde8;border-radius:12px;
  padding:8px 14px;margin:8px 0}
.b38adv-eq b{color:#d63384;font-weight:800;margin-right:2px}
.b38adv-side{min-width:150px}
.b38adv-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 14px;margin:10px 0}
.b38adv-cell{min-width:126px;padding:8px 12px;border:2.5px solid #f0b8c8;border-radius:12px;
  background:#fff2f6;font-size:18px;font-weight:800;color:#5a2a3a;text-align:center}
.b38adv-cell em{display:block;font-style:normal;font-size:13px;color:#1f63b8;margin-bottom:2px}
CSS*/

/* ===== NÂNG CAO — Bài 38: Biểu thức số. Tính giá trị của biểu thức ===== */

/* mũi tên cho sơ đồ máy tính */
ART.b38advArrow = `<svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg>`;

/* dựng một biểu thức có giá trị đúng bằng T (T từ 30 đến 70) */
const b38advExpr = (kind, T) => {
  if (kind === 0){ const b = R(2, 5), c = R(2, 5); return `${T - b * c} + ${b} × ${c}`; }
  if (kind === 1){ const c = R(5, 15), t = T - c, b = R(2, 9); return `${b * t} : ${b} + ${c}`; }
  if (kind === 2){ const b = R(10, 30), c = R(5, 20); return `${T + b - c} − ${b} + ${c}`; }
  if (kind === 3){ const b = R(10, 30), c = R(5, 20); return `${T + b + c} − (${b} + ${c})`; }
  if (kind === 4){ const c = R(2, 9), s = T * c, a = R(10, s - 10); return `(${a} + ${s - a}) : ${c}`; }
  const b = R(2, 5), c = R(2, 5); return `${T + b * c} − ${b} × ${c}`;
};

ADV.b38 = [

/* 1. Bài toán ngược: tìm số còn thiếu trong biểu thức */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho ô trống.');
  /* a) (A + ?) : c = t */
  const c1 = R(2, 9), t1 = R(3, 9), s1 = t1 * c1, a1 = R(1, s1 - 1);
  /* b) k × (? − b) = P */
  const k2 = R(2, 9), d2 = R(2, 9), b2 = R(2, 15);
  /* c) M : ? + m = V */
  const d3 = R(2, 9), t3 = R(2, 9), m3 = R(5, 20);
  /* d) ? − A × b = D */
  const a4 = R(2, 9), b4 = R(2, 9), d4 = R(10, 50);
  return q.done(`<div class="b38adv-eq"><b>a)</b> (${a1} + ${q.num(s1 - a1)}) : ${c1} = ${t1}</div>
    <div class="b38adv-eq"><b>b)</b> ${k2} × (${q.num(b2 + d2)} − ${b2}) = ${k2 * d2}</div>
    <div class="b38adv-eq"><b>c)</b> ${d3 * t3} : ${q.num(d3, 1)} + ${m3} = ${t3 + m3}</div>
    <div class="b38adv-eq"><b>d)</b> ${q.num(d4 + a4 * b4)} − ${a4} × ${b4} = ${d4}</div>
    <div class="hint-line">Hãy tính phần đã biết trước rồi tìm số còn thiếu.</div>`,
    `a) ${t1} × ${c1} = ${s1}; ${s1} − ${a1} = ${s1 - a1}.  `
    + `b) ${k2 * d2} : ${k2} = ${d2}; ${d2} + ${b2} = ${b2 + d2}.  `
    + `c) ${t3 + m3} − ${m3} = ${t3}; ${d3 * t3} : ${t3} = ${d3}.  `
    + `d) ${a4} × ${b4} = ${a4 * b4}; ${d4} + ${a4 * b4} = ${d4 + a4 * b4}.`);
},

/* 2. So sánh giá trị của biểu thức */
() => {
  const q = Q(2, 'Tính giá trị của mỗi biểu thức rồi điền dấu thích hợp vào ô trống.');
  const lech = () => pick([-R(1, 9), -R(1, 9), 0, R(1, 9), R(1, 9)]);
  /* a) a + b × c  ▢  số */
  const aA = R(20, 60), bA = R(2, 9), cA = R(2, 9), vA = aA + bA * cA;
  const nA = vA + lech();
  /* b) a − b : c  ▢  số */
  const cB = R(2, 9), tB = R(2, 9), aB = R(tB + 10, 90), vB = aB - tB;
  const nB = vB + lech();
  /* c) (a + b) : c  ▢  số */
  const cC = R(2, 9), tC = R(3, 9), sC = tC * cC, aC = R(1, sC - 1), vC = tC;
  const nC = Math.max(1, vC + pick([-R(1, 2), -R(1, 2), 0, R(1, 2), R(1, 2)]));
  /* d) a − (b − c)  ▢  a − b + c  (luôn bằng nhau) */
  const bD = R(10, 40), cD = R(2, bD - 1), aD = R(bD, 200);
  const traiD = aD - (bD - cD), phaiD = aD - bD + cD;
  const rows = [
    {t:`${aA} + ${bA} × ${cA}`, p:String(nA), l:vA, r:nA},
    {t:`${aB} − ${cB * tB} : ${cB}`, p:String(nB), l:vB, r:nB},
    {t:`(${aC} + ${sC - aC}) : ${cC}`, p:String(nC), l:vC, r:nC},
    {t:`${aD} − (${bD} − ${cD})`, p:`${aD} − ${bD} + ${cD}`, l:traiD, r:phaiD}
  ];
  const L = ['a)', 'b)', 'c)', 'd)'];
  return q.done(`<div class="two-col"><div>${rows.map((x, i) =>
      `<div class="cmp-row"><b>${L[i]}</b><span class="side b38adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')
      }<span class="side b38adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Trong biểu thức có ngoặc thì tính trong ngoặc trước; có nhân, chia thì
      tính nhân, chia trước · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `a) ${rows[0].t} = ${vA};  b) ${rows[1].t} = ${vB};  c) ${rows[2].t} = ${vC};  `
    + `d) hai vế đều bằng ${traiD}.`);
},

/* 3. Chọn các biểu thức có giá trị bằng số đã cho */
() => {
  const q = Q(3, 'Chọn tất cả các biểu thức có giá trị bằng số ghi trong ô màu hồng.');
  const V = R(32, 60);
  const nDung = R(2, 4);
  const kinds = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const items = kinds.map((k, i) => {
    const dung = i < nDung;
    const T = dung ? V : V + pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
    return {L:'', t:b38advExpr(k, T), v:T};
  }).sort(() => Math.random() - .5).map((x, i) => ({...x, L:L[i]}));
  const dsD = items.filter(x => x.v === V).map(x => x.L).sort();
  return q.done(`<div class="given-nums"><span class="b38adv-cell">${V}</span></div>
    <div class="b38adv-grid">${items.map(x =>
      `<div class="b38adv-cell"><em>${x.L}</em>${x.t}</div>`).join('')}</div>
    <div class="fill-line">Các biểu thức có giá trị bằng ${V} là: ${q.pick(dsD.join(','), L)}</div>
    <div class="fill-line">Có ${q.num(dsD.length, 1)} biểu thức như vậy.</div>`,
    items.map(x => `${x.L}: ${x.t} = ${x.v}`).join(' · '));
},

/* 4. Tìm một số theo lời văn (bài toán ngược nhiều bước) */
() => {
  const q = Q(4, 'Tìm số thích hợp trong mỗi trường hợp sau.');
  const k1 = R(2, 9), x1 = R(3, 12), m1 = R(5, 30);
  const d2 = R(2, 9), t2 = R(5, 12), s2 = d2 * t2, p2 = R(5, Math.min(25, s2 - 5));
  const d3 = R(2, 9), x3 = R(3, 12), m3 = R(2, x3 - 1);
  return q.done(`<div class="bullet">a) Lấy một số nhân với ${k1} rồi cộng với ${m1}
      thì được ${k1 * x1 + m1}. Số đó là ${q.num(x1)}</div>
    <div class="bullet">b) Lấy một số cộng với ${p2} rồi chia cho ${d2}
      thì được ${t2}. Số đó là ${q.num(t2 * d2 - p2)}</div>
    <div class="bullet">c) Lấy một số chia cho ${d3} rồi trừ đi ${m3}
      thì được ${x3 - m3}. Số đó là ${q.num(d3 * x3)}</div>
    <div class="hint-line">Hãy làm ngược lại: cộng thì trừ, trừ thì cộng, nhân thì chia, chia thì nhân.</div>`,
    `a) ${k1 * x1 + m1} − ${m1} = ${k1 * x1}; ${k1 * x1} : ${k1} = ${x1}.  `
    + `b) ${t2} × ${d2} = ${t2 * d2}; ${t2 * d2} − ${p2} = ${t2 * d2 - p2}.  `
    + `c) ${x3 - m3} + ${m3} = ${x3}; ${x3} × ${d3} = ${d3 * x3}.`);
},

/* 5. Sơ đồ máy tính: tính xuôi và tính ngược */
() => {
  const q = Q(5, '<span class="tag">Số</span> ?');
  /* a) xuôi */
  const a = R(3, 9), k = R(2, 9), d = R(2, 5), m0 = R(5, 30);
  const m = m0 + ((d - (a * k + m0) % d) % d);
  const kq = (a * k + m) / d;
  /* b) ngược */
  const d2 = R(2, 5), r2 = R(4, 15), m2 = R(5, 30);
  const x = r2 * d2 + m2;
  const A = ART.b38advArrow;
  return q.done(`<div class="sub-lbl">a) Tính từ trái sang phải.</div>
    <div class="flow">
      <span class="fnode sq">${a}</span>
      <span class="farrow"><i>× ${k}</i>${A}</span>
      <span class="fnode circle">${q.num(a * k)}</span>
      <span class="farrow"><i>+ ${m}</i>${A}</span>
      <span class="fnode circle">${q.num(a * k + m)}</span>
      <span class="farrow"><i>: ${d}</i>${A}</span>
      <span class="fnode sq">${q.num(kq)}</span>
    </div>
    <div class="hint-line">Sơ đồ trên chính là biểu thức (${a} × ${k} + ${m}) : ${d}.</div>
    <div class="sub-lbl">b) Tìm số ở ô đầu tiên.</div>
    <div class="flow">
      <span class="fnode sq">${q.num(x)}</span>
      <span class="farrow"><i>− ${m2}</i>${A}</span>
      <span class="fnode circle">${q.num(x - m2)}</span>
      <span class="farrow"><i>: ${d2}</i>${A}</span>
      <span class="fnode sq">${r2}</span>
    </div>`,
    `a) ${a} × ${k} = ${a * k}; ${a * k} + ${m} = ${a * k + m}; ${a * k + m} : ${d} = ${kq}.  `
    + `b) ${r2} × ${d2} = ${r2 * d2}; ${r2 * d2} + ${m2} = ${x}.`);
},

/* 6. Bài toán ba bước viết thành một biểu thức */
() => {
  const q = Q(6, '');
  const sang = R(10, 30), k = R(2, 4), con = R(20, 150);
  const chieu = sang * k, ban = sang + chieu, tong = ban + con;
  return q.done(`<p class="wordq">Một cửa hàng bán gạo. Buổi sáng bán được ${sang} kg gạo,
      buổi chiều bán được gấp ${k} lần buổi sáng. Sau khi bán, cửa hàng còn lại ${con} kg gạo.</p>
    <div class="bullet">Buổi chiều cửa hàng bán được ${q.num(chieu)} kg gạo.</div>
    <div class="bullet">Cả hai buổi cửa hàng bán được ${q.num(ban)} kg gạo.</div>
    <div class="bullet">Lúc đầu cửa hàng có ${q.num(tong)} kg gạo.</div>
    <div class="b38adv-eq">Giá trị của biểu thức ${sang} + ${sang} × ${k} + ${con}
      là ${q.num(tong)}</div>`,
    `${sang} × ${k} = ${chieu} (kg);  ${sang} + ${chieu} = ${ban} (kg);  `
    + `${ban} + ${con} = ${tong} (kg).`);
},
];
