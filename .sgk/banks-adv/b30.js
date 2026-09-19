/* ===== NÂNG CAO — Bài 30: Mi-li-mét ===== */

/* đường gấp khúc ABCD, chỉ ghi số đo đoạn AB, hai đoạn còn lại để dấu "?" */
const b30advPath4 = ab => `<svg viewBox="-14 -14 380 162" class="b30adv-path">
  <path d="M18 14L96 116H268L344 26" fill="none" stroke="#2b2b2b" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="18" cy="14" r="4"/><circle cx="96" cy="116" r="4"/>
  <circle cx="268" cy="116" r="4"/><circle cx="344" cy="26" r="4"/>
  <text x="2" y="8" font-size="17" font-weight="700">A</text>
  <text x="88" y="138" font-size="17" font-weight="700">B</text>
  <text x="260" y="138" font-size="17" font-weight="700">C</text>
  <text x="336" y="16" font-size="17" font-weight="700">D</text>
  <text x="26" y="76" font-size="15">${ab} mm</text>
  <text x="182" y="106" text-anchor="middle" font-size="15">? mm</text>
  <text x="316" y="80" font-size="15">? mm</text>
</svg>`;

ADV.b30 = [

/* 1. Đổi đơn vị đo độ dài có hai đơn vị */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const A = [];
  for (let g = 0; g < 60 && A.length < 3; g++){
    const c = R(2, 9), m = R(1, 9);
    if (A.some(x => x.c === c && x.m === m)) continue;
    A.push({c: c, m: m});
  }
  while (A.length < 3) A.push({c: A.length + 2, m: 5});
  const B = [];
  for (let g = 0; g < 80 && B.length < 3; g++){
    const n = R(11, 99);
    if (n % 10 === 0 || B.some(x => x.n === n)) continue;
    B.push({n: n});
  }
  while (B.length < 3) B.push({n: 23 + B.length * 11});
  return q.done(`<div class="sub-lbl">a)</div>
    <div class="eq-list">${A.map(x =>
      `<div class="eq">${x.c} cm ${x.m} mm = ${q.num(x.c * 10 + x.m)} mm</div>`).join('')}</div>
    <div class="sub-lbl">b)</div>
    <div class="eq-list">${B.map(x =>
      `<div class="eq">${x.n} mm = ${q.num(Math.floor(x.n / 10))} cm ${q.num(x.n % 10, 1)} mm</div>`).join('')}</div>
    <div class="hint-line">1 cm = 10 mm, vì vậy mỗi 10 mm đổi được thành 1 cm.</div>`,
    A.map(x => `${x.c} cm ${x.m} mm = ${x.c * 10 + x.m} mm`).join(';  ') + '.  '
    + B.map(x => `${x.n} mm = ${Math.floor(x.n / 10)} cm ${x.n % 10} mm`).join(';  ') + '.');
},

/* 2. So sánh các số đo độ dài khác đơn vị */
() => {
  const q = Q(2, 'Đổi về cùng một đơn vị đo rồi điền dấu thích hợp vào ô trống.');
  const a1 = R(3, 9), b1 = a1 * 10 + pick([-6, -2, 0, 0, 3, 7]);
  const c2 = R(2, 9), d2 = R(1, 9);
  const v2 = c2 * 10 + d2, e2 = v2 + pick([-5, -1, 0, 0, 2, 6]);
  const f3 = pick([94, 98, 100, 100, 103, 107]);
  const k4 = R(3, 9), tot4 = k4 * 10 + pick([-6, -2, 0, 0, 3, 8]);
  const g4 = R(5, tot4 - 5), h4 = tot4 - g4;
  const rows = [
    {t:`${a1} cm`, p:`${b1} mm`, l:a1 * 10, r:b1},
    {t:`${c2} cm ${d2} mm`, p:`${e2} mm`, l:v2, r:e2},
    {t:`1 m`, p:`${f3} cm`, l:100, r:f3},
    {t:`${g4} mm + ${h4} mm`, p:`${k4} cm`, l:tot4, r:k4 * 10}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b30adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b30adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">1 cm = 10 mm · 1 m = 100 cm = 1 000 mm · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.t} = ${x.l} · ${x.p} = ${x.r}`).join('  |  '));
},

/* 3. Chọn các số đo lớn hơn một số đo cho trước */
() => {
  const q = Q(3, 'Quan sát các số đo độ dài dưới đây rồi trả lời.');
  const L = ['A', 'B', 'C', 'D', 'E'];
  let items = [], X = 60;
  for (let g = 0; g < 200; g++){
    const xx = R(40, 80);
    const mm1 = R(25, 95), cm1 = R(3, 9), cm2 = R(2, 8), mm2 = R(1, 9), cm3 = R(3, 9), mm3 = R(25, 95);
    const cand = [
      {s: mm1 + ' mm', v: mm1},
      {s: cm1 + ' cm', v: cm1 * 10},
      {s: cm2 + ' cm ' + mm2 + ' mm', v: cm2 * 10 + mm2},
      {s: cm3 + ' cm', v: cm3 * 10},
      {s: mm3 + ' mm', v: mm3}
    ];
    const vs = cand.map(it => it.v);
    if (vs.some(v => v === xx)) continue;
    if (new Set(vs).size !== 5) continue;
    const nLon = vs.filter(v => v > xx).length;
    if (nLon < 2 || nLon > 4) continue;
    items = cand; X = xx; break;
  }
  if (!items.length){
    items = [{s:'35 mm', v:35}, {s:'8 cm', v:80}, {s:'5 cm 4 mm', v:54},
             {s:'7 cm', v:70}, {s:'92 mm', v:92}];
    X = 60;
  }
  const marked = items.map((it, i) => Object.assign({}, it, {L: L[i]}));
  const lon = marked.filter(x => x.v > X).map(x => x.L).sort().join(',');
  const be = marked.reduce((m, x) => x.v < m.v ? x : m, marked[0]);
  return q.done(`<div class="b30adv-grid">${marked.map(x =>
      `<div class="b30adv-cell"><em>${x.L}</em>${x.s}</div>`).join('')}</div>
    <div class="fill-line">Các số đo lớn hơn ${X} mm là: ${q.pick(lon, L)}</div>
    <div class="fill-line">Số đo bé nhất trong các số đo trên bằng ${q.num(be.v)} mm.</div>
    <div class="hint-line">Hãy đổi tất cả các số đo về đơn vị mi-li-mét rồi so sánh.</div>`,
    marked.map(x => `${x.L}: ${x.s} = ${x.v} mm`).join(' · '));
},

/* 4. Đường gấp khúc ABCD đo bằng mi-li-mét */
() => {
  const ab = R(12, 25), n = R(2, 3), bc = ab * n;
  let d = R(3, 10);
  for (let g = 0; g < 30 && (ab + bc + bc - d) % 10 === 0; g++) d = R(3, 10);
  const cd = bc - d, tong = ab + bc + cd;
  const q = Q(4, `Đường gấp khúc ABCD có đoạn AB dài ${ab} mm, đoạn BC dài gấp ${n} lần đoạn AB,
    đoạn CD ngắn hơn đoạn BC ${d} mm. Tính độ dài đường gấp khúc ABCD.`);
  return q.done(b30advPath4(ab) +
    `<div class="fill-line">Đoạn BC dài ${q.num(bc)} mm.</div>
     <div class="fill-line">Đoạn CD dài ${q.num(cd)} mm.</div>
     <div class="fill-line">Đường gấp khúc ABCD dài ${q.num(tong)} mm.</div>
     <div class="fill-line">Độ dài đó bằng ${q.num(Math.floor(tong / 10))} cm ${q.num(tong % 10, 1)} mm.</div>`,
    `${ab} × ${n} = ${bc} (mm);  ${bc} − ${d} = ${cd} (mm);  ${ab} + ${bc} + ${cd} = ${tong} (mm) `
    + `= ${Math.floor(tong / 10)} cm ${tong % 10} mm.`);
},

/* 5. Dãy số cách đều với đơn vị mi-li-mét */
() => {
  const q = Q(5, '');
  const a = R(20, 60), b = R(5, 15);
  const seq = [0, 1, 2, 3, 4].map(i => a + i * b);
  const tong = seq.reduce((s, v) => s + v, 0);
  return q.done(`<p class="wordq">Ốc sên tập bò. Ngày thứ nhất ốc sên bò được ${a} mm, mỗi ngày sau
      ốc sên bò được nhiều hơn ngày trước đó ${b} mm.</p>
    <div class="chain pill">${seq.map((v, i) =>
      `<span class="cnode${i > 2 ? ' q' : ''}">${i > 2 ? q.num(v) : v}</span>`).join('')}</div>
    <div class="fill-line">Ngày thứ năm ốc sên bò được nhiều hơn ngày thứ nhất ${q.num(4 * b)} mm.</div>
    <div class="fill-line">Cả năm ngày ốc sên bò được ${q.num(tong)} mm.</div>`,
    `Dãy số cách đều ${b} đơn vị: ${seq.join(', ')}.  ${b} × 4 = ${4 * b} (mm).  `
    + `Tổng cả năm ngày là ${tong} mm.`);
},

/* 6. Bài toán ba bước: bớt rồi chia đều, đổi ra cm và mm */
() => {
  const q = Q(6, '');
  const m = R(1, 2) * 10 + R(1, 9), k = R(2, 5), a = R(15, 80);
  const L2 = k * m, L1 = L2 + a;
  return q.done(`<p class="wordq">Sợi dây thứ nhất dài ${L1} mm. Sợi dây thứ hai ngắn hơn sợi dây
      thứ nhất ${a} mm. Người ta cắt sợi dây thứ hai thành ${k} đoạn dài bằng nhau.
      Hỏi mỗi đoạn dây đó dài bao nhiêu mi-li-mét?</p>
    <div class="fill-line">Sợi dây thứ hai dài ${q.num(L2)} mm.</div>
    <div class="fill-line">Mỗi đoạn dây dài ${q.num(m)} mm.</div>
    <div class="fill-line">Mỗi đoạn dây dài ${q.num(Math.floor(m / 10), 1)} cm ${q.num(m % 10, 1)} mm.</div>`,
    `${L1} − ${a} = ${L2} (mm);  ${L2} : ${k} = ${m} (mm) = ${Math.floor(m / 10)} cm ${m % 10} mm.`);
},
];
