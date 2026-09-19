BANKS.b27 = [

/* ① Số ? — hai sơ đồ gấp / giảm nối tiếp */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

  const a = R(3, 9) * 2, k1 = R(3, 7), g1 = 2;
  const a2 = a * k1, a3 = a2 / g1;

  const g2 = R(2, 4), k2 = R(2, 4);
  const b1 = g2 * R(4, 13), b2 = b1 / g2, b3 = b2 * k2;

  return q.done(`<div class="flow">
      <span class="fnode sq" style="background:#cfe8b0">${a}</span>${arrow('gấp ' + k1 + ' lần')}
      <span class="fnode sq">${q.num(a2)}</span>${arrow('giảm ' + g1 + ' lần')}
      <span class="fnode sq">${q.num(a3)}</span>
    </div>
    <div class="flow">
      <span class="fnode sq" style="background:#cfe8b0">${b1}</span>${arrow('giảm ' + g2 + ' lần')}
      <span class="fnode sq">${q.num(b2)}</span>${arrow('gấp ' + k2 + ' lần')}
      <span class="fnode sq">${q.num(b3)}</span>
    </div>`,
    `Gấp thì nhân, giảm thì chia`);
},

/* ② Rô-bốt đi qua các ngã rẽ để có đúng số đồng vàng */
() => {
  const q = Q(2, '');
  const start = R(2, 6) * 10;
  const k = R(2, 4), g = R(2, 3);
  const dich = start * k / g;
  const opts = ['A','B','C','D'];
  const cach = [
    {t:`gấp ${k} lần rồi giảm ${g} lần`, v:start * k / g},
    {t:`giảm ${g} lần rồi gấp ${k} lần`, v:start / g * k},
    {t:`gấp ${k + 1} lần`, v:start * (k + 1)},
    {t:`giảm ${g} lần`, v:start / g}
  ];
  const dung = cach.map((c, i) => c.v === dich ? opts[i] : null).filter(Boolean);
  return q.done(`<p class="wordq">Rô-bốt có ${start} đồng vàng. Khi đi qua mỗi ngã rẽ, số đồng vàng của Rô-bốt
      thay đổi theo phép tính ghi ở con đường Rô-bốt đi qua.
      Tìm đường đi để Rô-bốt có ${dich} đồng vàng.</p>
    <div class="path-row"><div class="path-line">
      <span class="coin">${start}</span>
      <svg viewBox="0 0 60 16" style="width:56px"><path d="M2 8h44" stroke="#8a8aa0" stroke-width="2.4"/><path d="M46 3l12 5-12 5z" fill="#8a8aa0"/></svg>
      <span class="coin">${dich}</span></div></div>
    <div class="maze">${cach.map((c, i) => `<span class="maze-cell">${opts[i]}. ${c.t}</span>`).join('')}</div>
    <div class="fill-line">Chọn đường đi đúng: ${q.pick(dung.sort().join(','), opts)}</div>`,
    cach.map((c, i) => opts[i] + ' → ' + c.v).join(' · '));
},

/* ③ Bài toán bút màu giảm đi số lần */
() => {
  const q = Q(3, '');
  const g = R(2, 5), con = R(4, 12), tong = con * g;
  return q.done(`<p class="wordq">Mai có ${tong} chiếc bút màu. Sau khoá học vẽ, số chiếc bút màu còn lại của Mai
      so với lúc đầu giảm đi ${g} lần. Hỏi Mai còn lại bao nhiêu chiếc bút màu?</p>
    <div class="fill-line">Mai còn lại ${q.num(con)} chiếc bút màu.</div>`,
    `${tong} : ${g} = ${con}`);
},

/* ④ Tìm số chia */
() => {
  const q = Q(4, 'Tìm số chia.');
  const items = [];
  let guard = 0;
  while (items.length < 3 && guard++ < 40){
    const thuong = R(4, 9), chia = R(4, 9), bi = thuong * chia;
    if (items.some(x => x.bi === bi)) continue;
    items.push({bi, chia, thuong});
  }
  return q.done(`<div class="easel-row">${items.map(it =>
    `<div class="easel">${it.bi} : ${q.num(it.chia, 1)} = ${it.thuong}</div>`).join('')}</div>`,
    'Số chia = số bị chia : thương');
},
];
