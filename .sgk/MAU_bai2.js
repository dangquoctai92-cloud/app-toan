/* ==================== BÀI 2: Ôn tập phép cộng, phép trừ trong phạm vi 1 000 (tr.9–10) ==================== */
ART.jar = (label, letter) => `<div class="jar"><svg viewBox="0 0 120 130">
  <ellipse cx="60" cy="120" rx="42" ry="7" fill="rgba(60,40,20,.13)"/>
  <path d="M60 16c-26 0-44 22-44 52s18 50 44 50 44-20 44-50-18-52-44-52z" fill="#c69a76" stroke="#8a5f3e" stroke-width="2.5"/>
  <path d="M36 22q24 10 48 0" fill="none" stroke="#8a5f3e" stroke-width="2.5"/>
  <ellipse cx="60" cy="20" rx="24" ry="7" fill="#dbb794" stroke="#8a5f3e" stroke-width="2.5"/>
  </svg><span class="jar-txt">${label}</span><span class="jar-let">${letter}</span></div>`;

ART.buffalo = `<svg viewBox="0 0 190 130" class="art-big">
  <ellipse cx="95" cy="118" rx="70" ry="8" fill="rgba(60,40,20,.12)"/>
  <ellipse cx="92" cy="70" rx="52" ry="30" fill="#6d5548" stroke="#4a382f" stroke-width="2.5"/>
  <path d="M54 92v22M78 96v18M110 96v18M132 92v22" stroke="#4a382f" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="150" cy="52" rx="24" ry="18" fill="#7a6053" stroke="#4a382f" stroke-width="2.5"/>
  <path d="M132 40q-14-16-30-8M168 40q14-16 30-8" fill="none" stroke="#4a382f" stroke-width="5" stroke-linecap="round"/>
  <circle cx="158" cy="48" r="2.6" fill="#241c17"/>
  <ellipse cx="166" cy="62" rx="9" ry="6" fill="#5c473d"/>
  <path d="M40 66q-16 6-14 24" fill="none" stroke="#4a382f" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="52" cy="102" rx="26" ry="15" fill="#a08876" stroke="#4a382f" stroke-width="2"/>
  <ellipse cx="26" cy="96" rx="12" ry="9" fill="#a08876" stroke="#4a382f" stroke-width="2"/>
  <circle cx="21" cy="93" r="1.8" fill="#241c17"/>
</svg>`;

BANKS.b2 = [

/* ① Tính nhẩm */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const mk = () => { const a = pick([90, 100, 900, 1000]);
    const b = a >= 900 ? R(1, 8) * 100 : R(1, 8) * 10;
    return {a, b, r:a - b}; };
  const items = [];
  while (items.length < 8){ const it = mk(); if (!items.some(x => x.a === it.a && x.b === it.b)) items.push(it); }
  const html = '<div class="calc-grid">' + items.map(it =>
    `<div class="calc-cell">${it.a} − ${it.b} = ${q.num(it.r)}</div>`).join('') + '</div>';
  return q.done(html);
},

/* ② Đặt tính rồi tính (theo mẫu) */
() => {
  const q = Q(2, 'Đặt tính rồi tính (theo mẫu).');
  const items = [];
  while (items.length < 4){
    if (items.length < 2){ const a = R(21, 89), b = 100 - a; items.push({a, b, op:'+', r:100}); }
    else { const b = R(21, 89); items.push({a:100, b, op:'−', r:100 - b}); }
  }
  const vc = it => `<div class="vcalc"><span class="vop">${it.op}</span>
    <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.r)}</span></div>`;
  const sample = `<div class="note vsample"><span class="lbl">Mẫu:</span>
    <div class="vcalc static"><span class="vop">+</span><span class="vnums"><b>84</b><b>16</b></span><i class="vbar"></i><span class="vres">100</span></div>
    <div class="vcalc static"><span class="vop">−</span><span class="vnums"><b>100</b><b>37</b></span><i class="vbar"></i><span class="vres">63</span></div></div>`;
  return q.done(sample + '<div class="vrow">' + items.map(vc).join('') + '</div>');
},

/* ③ Đặt tính rồi tính */
() => {
  const q = Q(3, 'Đặt tính rồi tính.');
  const items = [
    (() => { const a = R(21, 79), b = R(21, 79); return {a, b, op:'+', r:a + b}; })(),
    (() => { const a = R(110, 480), b = R(11, 89); return {a, b, op:'+', r:a + b}; })(),
    (() => { const a = R(41, 99), b = R(21, 39); return {a, b, op:'−', r:a - b}; })(),
    (() => { const a = R(210, 890), b = R(110, 199); return {a, b, op:'−', r:a - b}; })()
  ];
  const vc = it => `<div class="vcalc"><span class="vop">${it.op}</span>
    <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.r)}</span></div>`;
  return q.done('<div class="vrow">' + items.map(vc).join('') + '</div>');
},

/* ④ Bảng Số hạng – Số hạng – Tổng */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const it = Array.from({length:5}, () => { const a = R(11, 140), b = R(11, 90); return {a, b, s:a + b}; });
  const html = `<div class="tbl-wrap"><table class="tbl blue">
    <tr><th>Số hạng</th>${it.map(x => `<td>${x.a}</td>`).join('')}</tr>
    <tr><th>Số hạng</th>${it.map(x => `<td>${x.b}</td>`).join('')}</tr>
    <tr><th>Tổng</th><td>${it[0].s}</td>${it.slice(1).map(x => `<td>${q.num(x.s)}</td>`).join('')}</tr>
  </table></div>`;
  return q.done(html);
},

/* ⑤ Bài toán con trâu – con nghé */
() => {
  const q = Q(5, '');
  const a = R(40, 80) * 10, b = R(10, 25) * 10;
  return q.done(`<p class="wordq">Con trâu cân nặng ${a} kg, con nghé cân nặng ${b} kg. Hỏi:</p>
    <div class="fill-line">a) Con trâu và con nghé cân nặng tất cả bao nhiêu ki-lô-gam? ${q.num(a + b)} kg</div>
    <div class="fill-line">b) Con trâu nặng hơn con nghé bao nhiêu ki-lô-gam? ${q.num(a - b)} kg</div>
    <div class="art-row plain">${ART.buffalo}</div>`,
    `${a} + ${b} = ${a+b};  ${a} − ${b} = ${a-b}`);
},

/* ⑥ Bảng Số bị trừ – Số trừ – Hiệu */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const it = Array.from({length:5}, (_, i) => {
    const a = i === 0 ? 1000 : R(120, 990), b = i === 0 ? 200 : R(20, 140);
    return {a, b, h:a - b}; });
  const html = `<div class="tbl-wrap"><table class="tbl pink">
    <tr><th>Số bị trừ</th>${it.map(x => `<td>${nf(x.a)}</td>`).join('')}</tr>
    <tr><th>Số trừ</th>${it.map(x => `<td>${x.b}</td>`).join('')}</tr>
    <tr><th>Hiệu</th><td>${it[0].h}</td>${it.slice(1).map(x => `<td>${q.num(x.h)}</td>`).join('')}</tr>
  </table></div>`;
  return q.done(html);
},

/* ⑦ Sơ đồ cộng trừ */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const st = R(200, 600), p = R(1, 4) * 100 + 5, m = R(1, 3) * 100 + 5;
  return q.done(`<div class="flow">
    <span class="fnode sq">${st}</span>
    <span class="farrow"><i>+ ${p}</i><svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>
    <span class="fnode circle">${q.num(st + p)}</span>
    <span class="farrow"><i>− ${m}</i><svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>
    <span class="fnode tri">${q.num(st + p - m)}</span>
  </div>`);
},

/* ⑧ Những chum nào… (chọn nhiều) */
() => {
  const q = Q(3, 'Trả lời câu hỏi.');
  const L = ['A','B','C','D','E'];
  const eqv = R(120, 180);
  const a1 = R(30, 90), items = [
    {t:`${a1} + ${eqv - a1}`, v:eqv},
    {t:`${eqv + R(120, 300)} − ${R(120, 300)}`, v:0},
    {t:`${R(60, 130)} + ${R(15, 40)}`, v:0},
    {t:`${R(200, 400)} − ${R(60, 150)}`, v:0},
    {t:`${eqv + 100} − 100`, v:eqv}
  ];
  items.forEach((x, i) => { if (!x.v){ const m = x.t.match(/(\d+) ([+−]) (\d+)/);
    x.v = m[2] === '+' ? +m[1] + +m[3] : +m[1] - +m[3]; } });
  const ord = [0,1,2,3,4].sort(() => Math.random() - .5);
  const list = ord.map((k, j) => ({...items[k], L:L[j]}));
  const big = list.filter(x => x.v > 150).map(x => x.L).sort();
  const same = list.filter(x => list.filter(y => y.v === x.v).length > 1).map(x => x.L).sort();
  const jars = '<div class="jar-row">' + list.map(x => ART.jar(x.t, x.L)).join('') + '</div>';
  return q.done(jars +
    `<div class="fill-line">a) Những chum nào ghi phép tính có kết quả lớn hơn 150? ${q.pick(big.join(','), L)}</div>
     <div class="fill-line">b) Những chum nào ghi phép tính có kết quả bằng nhau? ${q.pick(same.join(','), L)}</div>`,
    list.map(x => x.L + ' = ' + x.v).join(' · '));
},

/* ⑨ Bài toán khối lớp Ba – khối lớp Bốn */
() => {
  const q = Q(4, '');
  const a = R(100, 190), d = R(10, 40);
  return q.done(`<p class="wordq">Ở một trường học, khối lớp Ba có ${a} học sinh, khối lớp Bốn có ít hơn khối lớp Ba ${d} học sinh. Hỏi:</p>
    <div class="fill-line">a) Khối lớp Bốn có bao nhiêu học sinh? ${q.num(a - d)} học sinh</div>
    <div class="fill-line">b) Cả hai khối lớp có bao nhiêu học sinh? ${q.num(a + (a - d))} học sinh</div>`,
    `${a} − ${d} = ${a-d};  ${a} + ${a-d} = ${a + (a-d)}`);
},
];













