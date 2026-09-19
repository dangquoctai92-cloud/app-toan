BANKS.b24 = [

/* ① Số ? — sơ đồ gấp lên / thêm đơn vị */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const a = R(3, 8), ka = R(3, 6);
  const b = R(3, 9), kb = R(3, 6);
  const row = (n, k) => `<div class="flow">
      <span class="fnode circle">${n}</span>
      <span class="farrow"><i>gấp ${k} lần</i><svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>
      <span class="fnode sq">${q.num(n * k)}</span>
    </div>
    <div class="flow">
      <span class="fnode circle">${n}</span>
      <span class="farrow"><i>thêm ${k} đơn vị</i><svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>
      <span class="fnode sq">${q.num(n + k)}</span>
    </div>`;
  return q.done(row(a, ka) + row(b, kb),
    `Gấp lên thì nhân, thêm đơn vị thì cộng`);
},

/* ② Đ, S ? */
() => {
  const q = Q(2, '<span class="tag">Đ, S</span> ?');
  const items = [];
  for (let i = 0; i < 4; i++){
    const n = R(4, 24), k = R(2, 9);
    const gap = Math.random() < .5;                 // ô đích ghi kết quả của phép gấp hay phép thêm
    const out = gap ? n * k : n + k;
    items.push({n, k, out, gapDung: gap});
  }
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = '<div class="ant-row">' + items.map((it, i) => {
    const first = i === 0
      ? `<span class="ant-card" style="background:#fff8e2;border-color:#e0b000">${it.gapDung ? 'Đ' : 'S'}</span>`
      : q.pick(it.gapDung ? 'Đ' : 'S', ['Đ', 'S']);
    const second = q.pick(it.gapDung ? 'S' : 'Đ', ['Đ', 'S']);
    return `<div class="ant-item"><span class="ant-lbl">${L[i]}</span>
      <div class="ant-line">gấp ${it.k} lần ${first}</div>
      <div class="ant-mid"><span class="ant-card">${it.n}</span>
        <svg viewBox="0 0 60 16" style="width:60px"><path d="M2 8h44" stroke="#8a8aa0" stroke-width="2.4"/><path d="M46 3l12 5-12 5z" fill="#8a8aa0"/></svg>
        <span class="ant-hill">${it.out}</span></div>
      <div class="ant-line">thêm ${it.k} đơn vị ${second}</div></div>`;
  }).join('') + '</div>';
  return q.done(html, 'Kiểm tra xem số ở ụ đất là kết quả của phép nào');
},

/* ③ Bài toán bàn ghế */
() => {
  const q = Q(3, '');
  const ban = R(6, 12), ghe = R(2, 4);
  return q.done(`<p class="wordq">Trong phòng có ${ban} cái bàn. Nam muốn xếp vào mỗi bàn ${ghe} cái ghế.
      Hỏi Nam cần bao nhiêu cái ghế?</p>
    <div class="fill-line">Nam cần ${q.num(ban * ghe)} cái ghế.</div>`,
    `${ban} × ${ghe} = ${ban * ghe}`);
},

/* ④ Mê cung — chọn các phép tính có kết quả bằng N */
() => {
  const q = Q(4, '');
  const N = pick([36, 42, 45, 48, 54, 63]);
  const L = ['A','B','C','D','E','F'];
  const dung = [];
  const a1 = R(2, 9); if (N % a1 === 0) dung.push(`${a1} × ${N / a1}`);
  dung.push(`${N + R(10, 40)} − ${dung.length ? R(10, 40) : 0}`);
  const cells = [];
  const seen = new Set();
  const addTrue = t => { if (!seen.has(t)){ seen.add(t); cells.push({t, v:N}); } };
  const d1 = [1,2,3,4,5,6,7,8,9].filter(x => N % x === 0 && N / x <= 20 && x > 1);
  const f = pick(d1); addTrue(`${f} × ${N / f}`);
  const s1 = R(15, 40); addTrue(`${N + s1} − ${s1}`);
  const g = pick(d1.filter(x => x !== f)) || f; addTrue(`${N / g} × ${g}`);
  let guard = 0;
  while (cells.length < 6 && guard++ < 60){
    const kind = R(1, 2);
    let t, v;
    if (kind === 1){ const x = R(2, 9), y = R(2, 19); t = `${x} × ${y}`; v = x * y; }
    else { const x = R(30, 90), y = R(5, 29); t = `${x} − ${y}`; v = x - y; }
    if (v === N || seen.has(t)) continue;
    seen.add(t); cells.push({t, v});
  }
  const ord = cells.sort(() => Math.random() - .5).map((c, i) => ({...c, L:L[i]}));
  const dungList = ord.filter(c => c.v === N).map(c => c.L).sort();
  return q.done(`<p class="wordq">Tìm đường đi qua mê cung để tới toà thành theo các phép tính
      có kết quả bằng ${N}.</p>
    <div class="maze">${ord.map(c => `<span class="maze-cell">${c.L}. ${c.t}</span>`).join('')}</div>
    <div class="fill-line">Chọn các phép tính đi qua: ${q.pick(dungList.join(','), L)}</div>`,
    ord.map(c => c.L + ' = ' + c.v).join(' · '));
},
];
