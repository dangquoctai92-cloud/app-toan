/* ============ BÀI 40: LUYỆN TẬP CHUNG (SGK tr.110, 111) ============
   luyện tập tr.110     : bài 1 (Đặt tính rồi tính), bài 2 (Số ? – hai bảng), bài 3 (con bê – con bò)
   luyện tập tr.110–111 : bài 1 (số ở cánh hoa là giá trị của biểu thức nào),
                          bài 2 (cây cau cao gấp mấy lần), bài 3 (ngỗng – chó – lợn, nhân ba số)
==================================================================== */

ART.b40Flower = vals => {
  const P = [[95, 34], [148, 72], [128, 132], [62, 132], [42, 72]];
  const petals = P.map(p => `<ellipse cx="${p[0]}" cy="${p[1]}" rx="30" ry="26"
    fill="#f7c2ce" stroke="#e08fa4" stroke-width="2"/>`).join('');
  const texts = P.map((p, i) => `<text x="${p[0]}" y="${p[1] + 6}" text-anchor="middle"
    font-size="17" font-weight="800" fill="#5a2a3a">${vals[i]}</text>`).join('');
  return `<svg viewBox="0 0 190 178" class="b40-flower">${petals}
    <circle cx="95" cy="86" r="22" fill="#e2726f" stroke="#b8504d" stroke-width="2"/>${texts}
    <path d="M95 108v58" stroke="#4f9a3f" stroke-width="4"/>
    <path d="M95 138q-26-14-34 6 22 12 34-6z" fill="#6fbb4f" stroke="#3f7a3f" stroke-width="2"/></svg>`;
};

/* khung đặt tính chia (dùng lớp .dv của bài 37) */
ART.b40Div = (bi, chia, thuong) => `<div class="dv dv-gr">
  <span class="dv-a">${bi}</span><span class="dv-b">${chia}</span><span class="dv-q">${thuong}</span></div>`;

ART.b40Dog = `<svg viewBox="0 0 120 110" class="b40-animal">
  <ellipse cx="58" cy="58" rx="34" ry="20" fill="#d9a25e" stroke="#8a5f30" stroke-width="2"/>
  <circle cx="94" cy="42" r="16" fill="#e2b273" stroke="#8a5f30" stroke-width="2"/>
  <path d="M84 30q-7-15 4-15t8 13z" fill="#b8874a" stroke="#8a5f30" stroke-width="1.6"/>
  <circle cx="98" cy="40" r="2.2" fill="#222"/>
  <ellipse cx="110" cy="48" rx="6" ry="5" fill="#4a3524"/>
  <path d="M24 52q-16-10-18 3 5 10 18 5z" fill="#d9a25e" stroke="#8a5f30" stroke-width="1.8"/>
  <path d="M38 76v22M54 76v22M72 76v22M86 76v20" stroke="#8a5f30" stroke-width="6" stroke-linecap="round"/></svg>`;

ART.b40Pig = `<svg viewBox="0 0 120 110" class="b40-animal">
  <ellipse cx="58" cy="60" rx="36" ry="22" fill="#f6c9d4" stroke="#c98a9c" stroke-width="2"/>
  <circle cx="94" cy="46" r="17" fill="#f9d7e0" stroke="#c98a9c" stroke-width="2"/>
  <path d="M84 32q-4-14 6-12t6 11z" fill="#f6c9d4" stroke="#c98a9c" stroke-width="1.6"/>
  <circle cx="98" cy="44" r="2.2" fill="#222"/>
  <ellipse cx="110" cy="52" rx="7" ry="6" fill="#e8a8b8" stroke="#c98a9c" stroke-width="1.4"/>
  <circle cx="108" cy="51" r="1.4" fill="#8a5566"/><circle cx="113" cy="51" r="1.4" fill="#8a5566"/>
  <path d="M24 58q-14 2-10 12 8 4 12-6z" fill="#f6c9d4" stroke="#c98a9c" stroke-width="1.8"/>
  <path d="M38 80v20M56 80v20M74 80v20M88 80v18" stroke="#c98a9c" stroke-width="6" stroke-linecap="round"/></svg>`;

ART.b40Goose = `<svg viewBox="0 0 120 110" class="b40-animal">
  <ellipse cx="62" cy="70" rx="30" ry="20" fill="#fff" stroke="#9a9a9a" stroke-width="2"/>
  <path d="M46 56q-4-30 14-34 16-4 16 10" fill="none" stroke="#9a9a9a" stroke-width="12" stroke-linecap="round"/>
  <path d="M46 56q-4-30 14-34 16-4 16 10" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
  <circle cx="76" cy="28" r="9" fill="#fff" stroke="#9a9a9a" stroke-width="2"/>
  <circle cx="79" cy="26" r="1.8" fill="#222"/>
  <path d="M85 28l12 4-12 5z" fill="#f0a12e" stroke="#c07a16" stroke-width="1.4"/>
  <path d="M46 66q22-10 40 2-16 12-40-2z" fill="#eee" stroke="#9a9a9a" stroke-width="1.6"/>
  <path d="M54 88v12M70 88v12" stroke="#f0a12e" stroke-width="3"/>
  <path d="M46 100h16M62 100h16" stroke="#f0a12e" stroke-width="3" stroke-linecap="round"/></svg>`;

BANKS.b40 = [

/* ===== tr.110 – Luyện tập Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const mkNhan = () => {
    const b = R(2, 4);
    const a = R(101, Math.floor(999 / b));
    return {a, b, r:a * b};
  };
  const mkChia = () => {
    const d = R(2, 9);
    const t = R(Math.ceil(100 / d), Math.floor(999 / d));
    return {a:d * t, b:d, r:t};
  };
  const n1 = mkNhan(), n2 = mkNhan(), c1 = mkChia(), c2 = mkChia();
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.r)}</span></div>`;
  return q.done(`<div class="vrow">${vc(n1)}${vc(n2)}</div>
    <div class="dv-row">
      <div class="dv-item">${ART.b40Div(c1.a, c1.b, q.num(c1.r))}</div>
      <div class="dv-item">${ART.b40Div(c2.a, c2.b, q.num(c2.r))}</div>
    </div>`,
    `${n1.a} × ${n1.b} = ${n1.r};  ${n2.a} × ${n2.b} = ${n2.r};  `
      + `${c1.a} : ${c1.b} = ${c1.r};  ${c2.a} : ${c2.b} = ${c2.r}`);
},

/* ===== tr.110 – Luyện tập Bài 2: Số ? (bảng giảm – gấp · bảng số lớn – số bé) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const g = R(2, 5);
  let k = R(2, 5);
  if (k === g) k = g === 5 ? 2 : g + 1;
  const ns = [];
  for (let t = 0; t < 60 && ns.length < 3; t++){
    const n = g * R(3, 12);
    if (!ns.includes(n)) ns.push(n);
  }
  while (ns.length < 3) ns.push(g * (12 + ns.length));

  const cols = [];
  for (let t = 0; t < 80 && cols.length < 3; t++){
    const be = R(2, 9), m = R(2, 8), lon = be * m;
    if (!cols.some(c => c.lon === lon && c.be === be)) cols.push({be, m, lon});
  }
  while (cols.length < 3) cols.push({be:2, m:cols.length + 2, lon:2 * (cols.length + 2)});

  return q.done(`<div class="sub-lbl">a)</div>
    <div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Số đã cho</th>${ns.map(n => `<td>${n}</td>`).join('')}</tr>
      <tr><th>Giảm ${g} lần</th><td>${ns[0] / g}</td>
        ${ns.slice(1).map(n => `<td>${q.num(n / g, 2)}</td>`).join('')}</tr>
      <tr><th>Gấp ${k} lần</th><td>${ns[0] * k}</td>
        ${ns.slice(1).map(n => `<td>${q.num(n * k, 3)}</td>`).join('')}</tr>
    </table></div>
    <div class="sub-lbl">b)</div>
    <div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Số lớn</th>${cols.map(c => `<td>${c.lon}</td>`).join('')}</tr>
      <tr><th>Số bé</th>${cols.map(c => `<td>${c.be}</td>`).join('')}</tr>
      <tr><th>Số lớn gấp mấy lần số bé?</th><td>${cols[0].m}</td>
        ${cols.slice(1).map(c => `<td>${q.num(c.m, 1)}</td>`).join('')}</tr>
    </table></div>`,
    `Giảm ${g} lần thì chia cho ${g}, gấp ${k} lần thì nhân với ${k};  `
      + cols.map(c => `${c.lon} : ${c.be} = ${c.m}`).join(';  '));
},

/* ===== tr.110 – Luyện tập Bài 3: Con bê – con bò ===== */
() => {
  const q = Q(3, '');
  const be = R(8, 16) * 10, k = R(2, 4), bo = be * k;
  return q.done(`<p class="wordq">Con bê cân nặng ${be} kg, con bò nặng gấp ${k} lần con bê.
      Hỏi cả hai con cân nặng bao nhiêu ki-lô-gam?</p>
    <div class="bullet">Con bò cân nặng ${q.num(bo)} kg.</div>
    <div class="bullet">Cả hai con cân nặng ${q.num(be + bo)} kg.</div>`,
    `${be} × ${k} = ${bo} (kg);  ${be} + ${bo} = ${be + bo} (kg)`);
},

/* ===== tr.110–111 – Luyện tập Bài 1: Mỗi số ở cánh hoa là giá trị của biểu thức nào? ===== */
() => {
  const q = Q(1, 'Mỗi số ghi ở cánh hoa là giá trị của biểu thức nào?');
  /* E: (a + b) : c — giá trị 20..49 */
  const vE = R(20, 49), cE = R(2, 9), sE = vE * cE, aE = R(10, sE - 10), bE = sE - aE;
  /* B: a − (b − c) — giá trị 50..99 */
  const vB = R(50, 99), bB = R(300, 400), cB = R(10, 60), aB = vB + bB - cB;
  /* D: a + b × c — giá trị 100..199 */
  const cD = 2, bD = R(20, 40), pD = bD * cD, vD = R(100, 199), aD = vD - pD;
  /* A: a + b − c — giá trị 200..299 */
  const vA = R(200, 299), bA = R(20, 60), cA = R(80, 150), aA = vA + cA - bA;
  /* C: a × (b − c) — giá trị 300..600 */
  const dC = R(2, 4), aC = R(Math.ceil(300 / dC), Math.floor(600 / dC));
  const cC = R(2, 12), bC = cC + dC, vC = aC * dC;

  const ex = [
    {L:'A', t:`${aA} + ${bA} − ${cA}`, v:vA},
    {L:'B', t:`${aB} − (${bB} − ${cB})`, v:vB},
    {L:'C', t:`${aC} × (${bC} − ${cC})`, v:vC},
    {L:'D', t:`${aD} + ${bD} × ${cD}`, v:vD},
    {L:'E', t:`(${aE} + ${bE}) : ${cE}`, v:vE}
  ];
  const opts = ex.map(e => String(e.v)).sort(() => Math.random() - .5);
  const petals = ex.map(e => e.v).sort(() => Math.random() - .5);

  return q.done(ART.b40Flower(petals)
    + `<div class="b40-row">${ex.map(e => `<div class="b40-cell">
        <span class="b40-board">${e.t}</span>
        <div class="fill-line"><span class="b38-let">${e.L}.</span>${q.pick(String(e.v), opts)}</div>
      </div>`).join('')}</div>`,
    ex.map(e => `${e.L}: ${e.t} = ${e.v}`).join(';  '));
},

/* ===== tr.111 – Luyện tập Bài 2: Cây cau cao gấp mấy lần lúc mới trồng ===== */
() => {
  const q = Q(2, '');
  const dau = R(2, 4), k = R(2, 5), nay = dau * k;
  return q.done(`<p class="wordq">Cây cau nhà em lúc mới trồng cao ${dau} m. Hiện nay, cây cau đã cao ${nay} m.
      Hỏi hiện nay cây cau cao gấp mấy lần lúc mới trồng?</p>
    <div class="fill-line">Hiện nay cây cau cao gấp ${q.num(k, 1)} lần lúc mới trồng.</div>`,
    `${nay} : ${dau} = ${k} (lần)`);
},

/* ===== tr.111 – Luyện tập Bài 3: Ngỗng – chó – lợn · nhân ba số ===== */
() => {
  const q = Q(3, '');
  const ngong = R(4, 8), p = R(2, 3), r = R(4, 6);
  const cho = ngong * p, lon = cho * r;
  const x1 = R(2, 9), y1 = pick([2, 5]), z1 = y1 === 5 ? 2 : 5;
  const x2 = R(2, 9), y2 = pick([2, 5]), z2 = y2 === 5 ? 2 : 5;
  return q.done(`<div class="sub-lbl">a)</div>
    <div class="b40-arow">
      <div class="b40-acell">${ART.b40Goose}Con ngỗng cân nặng ${ngong} kg.</div>
      <div class="b40-acell">${ART.b40Dog}Con chó nặng gấp ${p} lần con ngỗng.</div>
      <div class="b40-acell">${ART.b40Pig}Con lợn nặng gấp ${r} lần con chó.</div>
    </div>
    <div class="fill-line">Con lợn cân nặng bao nhiêu ki-lô-gam?</div>
    <div class="b40-eq"><span class="b40-pink">${ngong} × ${p} × ${r} = ${q.num(lon)}</span></div>
    ${noteBox(`Nhận xét: (${ngong} × ${p}) × ${r} = ${ngong} × (${p} × ${r}).`)}
    <div class="sub-lbl">b) Tính giá trị của biểu thức.</div>
    <div class="b40-eq"><span class="b40-pink">${x1} × ${y1} × ${z1} = ${q.num(x1 * y1 * z1)}</span></div>
    <div class="b40-eq"><span class="b40-pink">${x2} × ${y2} × ${z2} = ${q.num(x2 * y2 * z2)}</span></div>`,
    `Con chó: ${ngong} × ${p} = ${cho} (kg); con lợn: ${cho} × ${r} = ${lon} (kg).  `
      + `Nhân với 2 rồi nhân với 5 thì được nhân với 10 nên tính rất nhanh.`);
},
];
