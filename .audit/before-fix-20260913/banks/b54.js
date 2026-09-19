/*CSS
.b54-list{display:flex;flex-wrap:wrap;gap:2px 30px;margin:6px 0}
.b54-list > div{min-width:200px;font-size:19px;font-weight:700;line-height:2}
.b54-let{color:#d63384;font-weight:800;margin-right:6px}
.b54-shop{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px 16px;margin:8px 0}
.b54-shop > div{text-align:center}
.b54-shop b{display:block;color:#d63384;font-size:17px}
.b54-shop span{display:block;font-weight:700;font-size:18px;margin-bottom:2px}
.b54-hole{width:110px;max-width:100%;height:auto;display:block;margin:0 auto}
CSS*/

/* ==================== BÀI 54: PHÉP CỘNG TRONG PHẠM VI 10 000
   (SGK tập 2 – tr.38, 39, 40)
   hoạt động tr.39 : bài 1 (Tính – cộng theo cột dọc), bài 2 (Đặt tính rồi tính),
                     bài 3 (bác Hùng, bác Dương thu hoạch thóc)
   luyện tập tr.39 : bài 1 (Tính nhẩm theo mẫu – các số tròn nghìn)
   luyện tập tr.40 : bài 2 (Tính nhẩm theo mẫu – các số tròn trăm),
                     bài 3 (Dế mèn đến cửa hàng ghi phép tính có kết quả lớn nhất),
                     bài 4 (số khán giả ở hai khán đài)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như trong SGK: 6 428 */
ART.b54sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* cửa hang của dế mèn */
ART.b54Hole = i => {
  const C = ['#c98a5b', '#b8794a', '#d09a6b'];
  return `<svg viewBox="0 0 110 96" class="b54-hole">
    <path d="M4 92V52q0-40 51-40t51 40v40z" fill="${C[i % 3]}" stroke="#7a4b1e" stroke-width="2.6"/>
    <path d="M22 92V56q0-26 33-26t33 26v36z" fill="#2f2118"/>
    <path d="M0 92h110" stroke="#6b8f3a" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
};

BANKS.b54 = [

/* ===== tr.39 – Bài 1: Tính (cộng theo cột dọc) ===== */
() => {
  const q = Q(1, 'Tính.');
  const items = [];
  for (let g = 0; g < 60 && items.length < 2; g++){
    const a = R(1000, 8000), b = R(1000, 9999 - a);
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 2) items.push({a: 2000 + items.length, b: 3456});
  const a3 = R(4000, 9000);
  items.push({a: a3, b: R(100, Math.min(999, 9999 - a3))});
  items.push({a: R(300, 999), b: R(300, 999)});
  const vc = it => `<div class="vcalc"><span class="vop">+</span>
    <span class="vnums"><b>${ART.b54sp(it.a)}</b><b>${ART.b54sp(it.b)}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a + it.b)}</span></div>`;
  return q.done(`<div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${ART.b54sp(x.a)} + ${ART.b54sp(x.b)} = ${ART.b54sp(x.a + x.b)}`).join(';  '));
},

/* ===== tr.39 – Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const items = [];
  for (let g = 0; g < 60 && items.length < 2; g++){
    const a = R(1000, 8000), b = R(1000, 9999 - a);
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 2) items.push({a: 3000 + items.length, b: 4123});
  const a3 = R(3000, 9000);
  items.push({a: a3, b: R(100, Math.min(999, 9999 - a3))});
  const line = it => `<div class="eq">${ART.b54sp(it.a)} <span class="op">+</span> ${ART.b54sp(it.b)}</div>`;
  const vc = it => `<div class="vcalc"><span class="vop">+</span>
    <span class="vnums"><b>${ART.b54sp(it.a)}</b><b>${ART.b54sp(it.b)}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a + it.b)}</span></div>`;
  return q.done(`<div class="eq-list">${items.map(line).join('')}</div>
      <div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${ART.b54sp(x.a)} + ${ART.b54sp(x.b)} = ${ART.b54sp(x.a + x.b)}`).join(';  '));
},

/* ===== tr.39 – Bài 3: bác Hùng và bác Dương thu hoạch thóc ===== */
() => {
  const q = Q(3, '');
  const hung = R(200, 450) * 10, hon = R(30, 90) * 10;
  return q.done(`<p class="wordq">Vụ mùa năm nay, bác Hùng thu hoạch được ${ART.b54sp(hung)} kg thóc,
      bác Dương thu hoạch được nhiều hơn bác Hùng ${hon} kg thóc.
      Hỏi vụ mùa năm nay, bác Dương thu hoạch được bao nhiêu ki-lô-gam thóc?</p>
    <div class="bullet">Vụ mùa năm nay, bác Dương thu hoạch được ${q.num(hung + hon)} kg thóc.</div>`,
    `${ART.b54sp(hung)} + ${hon} = ${ART.b54sp(hung + hon)} (kg)`);
},

/* ===== tr.39 – Bài 1 (luyện tập): Tính nhẩm các số tròn nghìn ===== */
() => {
  const q = Q(1, 'Tính nhẩm (theo mẫu).');
  const m1 = R(2, 6), m2 = R(2, 10 - m1);
  const items = [];
  for (let g = 0; g < 80 && items.length < 4; g++){
    const a = R(1, 8), b = R(1, 10 - a);
    if (!items.some(x => x.a === a && x.b === b)) items.push({a, b});
  }
  while (items.length < 4) items.push({a: 1, b: items.length + 1});
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = noteBox(`Mẫu: ${m1} 000 + ${m2} 000 = ?<br>
      Nhẩm: ${m1} nghìn + ${m2} nghìn = ${m1 + m2} nghìn<br>
      ${m1} 000 + ${m2} 000 = ${ART.b54sp((m1 + m2) * 1000)}`)
    + '<div class="b54-list">' + items.map((it, i) =>
      `<div><span class="b54-let">${L[i]}</span>${it.a} 000 <span class="op">+</span> ${it.b} 000
        <span class="op">=</span> ${q.num((it.a + it.b) * 1000)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.a} nghìn + ${x.b} nghìn = ${x.a + x.b} nghìn`).join(';  '));
},

/* ===== tr.40 – Bài 2 (luyện tập): Tính nhẩm các số tròn trăm ===== */
() => {
  const q = Q(2, 'Tính nhẩm (theo mẫu).');
  const ma = R(2, 8), mb = R(1, 5), mc = R(1, 9 - mb);
  const items = [];
  for (let g = 0; g < 90 && items.length < 4; g++){
    const a = R(1, 8), b = R(0, 7), c = R(1, 9 - b);
    if (!items.some(x => x.a === a && x.b === b && x.c === c)) items.push({a, b, c});
  }
  while (items.length < 4) items.push({a: 1, b: 1, c: items.length + 1});
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = noteBox(`Mẫu: ${ART.b54sp(ma * 1000 + mb * 100)} + ${mc}00 = ?<br>
      Nhẩm: ${mb} trăm + ${mc} trăm = ${mb + mc} trăm<br>
      ${ma} nghìn ${mb} trăm + ${mc} trăm = ${ma} nghìn ${mb + mc} trăm<br>
      ${ART.b54sp(ma * 1000 + mb * 100)} + ${mc}00 = ${ART.b54sp(ma * 1000 + (mb + mc) * 100)}`)
    + '<div class="b54-list">' + items.map((it, i) =>
      `<div><span class="b54-let">${L[i]}</span>${ART.b54sp(it.a * 1000 + it.b * 100)}
        <span class="op">+</span> ${it.c}00 <span class="op">=</span>
        ${q.num(it.a * 1000 + (it.b + it.c) * 100)}</div>`).join('') + '</div>';
  return q.done(html,
    items.map(x => `${x.b} trăm + ${x.c} trăm = ${x.b + x.c} trăm nên kết quả là `
      + ART.b54sp(x.a * 1000 + (x.b + x.c) * 100)).join(';  '));
},

/* ===== tr.40 – Bài 3 (luyện tập): Dế mèn đến cửa hang ghi phép tính có kết quả lớn nhất ===== */
() => {
  const q = Q(3, 'Dế mèn sẽ đến cửa hang ghi phép tính có kết quả lớn nhất. Dế mèn sẽ đến cửa hang nào?');
  const base = R(31, 70) * 100;
  const maxAdd = Math.floor((9900 - base) / 100);      // luôn >= 29
  const cands = [];
  for (let v = 10; v <= maxAdd; v++) cands.push(v * 100);
  const add = cands.sort(() => Math.random() - .5).slice(0, 3);
  const L = ['A', 'B', 'C'];
  const sums = add.map(v => base + v);
  const ok = L[sums.indexOf(Math.max.apply(null, sums))];
  const html = '<div class="b54-shop">' + add.map((v, i) =>
      `<div><b>${L[i]}</b><span>${ART.b54sp(base)} + ${ART.b54sp(v)}</span>${ART.b54Hole(i)}</div>`).join('')
    + '</div>'
    + `<div class="fill-line">Dế mèn sẽ đến cửa hang ${q.pick(ok, L)}</div>`;
  return q.done(html,
    add.map((v, i) => `${L[i]}: ${ART.b54sp(base)} + ${ART.b54sp(v)} = ${ART.b54sp(base + v)}`).join(';  ')
      + ` nên kết quả lớn nhất là ở cửa hang ${ok}.`);
},

/* ===== tr.40 – Bài 4 (luyện tập): số khán giả ở hai khán đài ===== */
() => {
  const q = Q(4, '');
  const a = R(3500, 4500), hon = R(200, 900);
  const b = a + hon;
  return q.done(`<p class="wordq">Trong một trận bóng đá, số khán giả ở khán đài A là
      ${ART.b54sp(a)} người. Số khán giả ở khán đài B nhiều hơn số khán giả ở khán đài A
      là ${hon} người. Hỏi số khán giả ở cả hai khán đài là bao nhiêu người?</p>
    <div class="bullet">Số khán giả ở khán đài B là ${q.num(b)} người.</div>
    <div class="bullet">Số khán giả ở cả hai khán đài là ${q.num(a + b)} người.</div>`,
    `${ART.b54sp(a)} + ${hon} = ${ART.b54sp(b)} (người);  `
      + `${ART.b54sp(a)} + ${ART.b54sp(b)} = ${ART.b54sp(a + b)} (người)`);
},
];
