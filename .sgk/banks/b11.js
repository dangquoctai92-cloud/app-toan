/* ==================== BÀI 11: BẢNG NHÂN 8, BẢNG CHIA 8 (SGK trang 33, 34, 35) ====================
   · Hoạt động (tr.34): bài 1, 2
   · Luyện tập (tr.34–35): bài 1, 2, 3, 4
============================================================================================== */



BANKS.b11 = [

/* ===== Hoạt động tr.34 – Bài 1: Số ? (bảng thừa số – tích, số bị chia – thương) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const ks = [], ms = [];
  let guard = 0;
  while (ks.length < 6 && guard++ < 300){ const k = R(1, 9); if (!ks.includes(k)) ks.push(k); }
  guard = 0;
  while (ms.length < 6 && guard++ < 300){ const m = R(1, 9); if (!ms.includes(m)) ms.push(m); }
  const html = `<div class="sub-lbl">a)</div><div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Thừa số</th>${ks.map(() => '<td>8</td>').join('')}</tr>
      <tr><th>Thừa số</th>${ks.map(k => `<td>${k}</td>`).join('')}</tr>
      <tr><th>Tích</th><td>${8 * ks[0]}</td>${ks.slice(1).map(k => `<td>${q.num(8 * k)}</td>`).join('')}</tr>
    </table></div>
    <div class="sub-lbl">b)</div><div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Số bị chia</th>${ms.map(m => `<td>${8 * m}</td>`).join('')}</tr>
      <tr><th>Số chia</th>${ms.map(() => '<td>8</td>').join('')}</tr>
      <tr><th>Thương</th><td>${ms[0]}</td>${ms.slice(1).map(m => `<td>${q.num(m)}</td>`).join('')}</tr>
    </table></div>`;
  return q.done(html);
},

/* ===== Hoạt động tr.34 – Bài 2: mỗi hộp bút có 8 chiếc bút chì màu ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const COLORS = ['#bfe0f5', '#f8c8d8', '#cbe9c0', '#f2c1ac', '#d5cdee'];
  const ns = [];
  let guard = 0;
  while (ns.length < 5 && guard++ < 300){ const n = R(2, 10); if (!ns.includes(n)) ns.push(n); }
  const right = [...ns].sort(() => Math.random() - .5);
  const PEN = ['#e04b4b', '#f0a02e', '#3fb14e', '#3a7fd0', '#8e5cc4', '#d8c02e', '#e07ab0', '#3b3b3b'];
  const box = `<svg viewBox="0 0 92 108" style="width:76px;height:auto">
    <g stroke="#7a5a2e" stroke-width="1.4">${PEN.map((c, i) =>
      `<rect x="${7 + i * 10}" y="${14 + (i % 2) * 6}" width="8" height="${34 - (i % 2) * 6}" rx="1.5" fill="${c}"/>`).join('')}</g>
    <rect x="3" y="46" width="86" height="56" rx="4" fill="#cfe08a" stroke="#7f8f3a" stroke-width="2.4"/>
    <path d="M3 60h86" stroke="#7f8f3a" stroke-width="1.6"/>
  </svg>`;
  const html = `<div class="fill-line">Mỗi hộp bút có 8 chiếc bút chì màu.</div>
    <div class="art-row plain">${box}</div>
    <div class="two-col">
      <div>${ns.map((n, i) =>
        `<div class="askbox" style="background:${COLORS[i]}">${n} hộp bút có bao nhiêu chiếc bút chì màu?</div>`).join('')}</div>
      <div>${right.map(n => `<div class="calcbox">8 × ${n} = ${q.num(8 * n)}</div>`).join('')}</div>
    </div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.34 – Bài 1: nêu các số còn thiếu ===== */
() => {
  const q = Q(1, 'Nêu các số còn thiếu.');
  const hidden = () => {
    const h = [];
    let guard = 0;
    while (h.length < 4 && guard++ < 200){ const i = R(1, 8); if (!h.includes(i)) h.push(i); }
    return h;
  };
  const hu = hidden(), hd = hidden();
  const up = Array.from({length:10}, (_, i) => 8 * (i + 1));
  const dn = Array.from({length:10}, (_, i) => 80 - 8 * i);
  const node = (v, i, hs) => hs.includes(i)
    ? `<span class="cnode q">${q.num(v)}</span>` : `<span class="cnode">${v}</span>`;
  return q.done(`<div class="sub-lbl">a)</div>
      <div class="chain pill">${up.map((v, i) => node(v, i, hu)).join('')}</div>
    <div class="sub-lbl">b)</div>
      <div class="chain round">${dn.map((v, i) => node(v, i, hd)).join('')}</div>`);
},

/* ===== Luyện tập tr.35 – Bài 2: Số ? (tính theo chiều mũi tên) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const a = R(2, 9), p = 8 * a, b = 8 * R(1, 5);
  const arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
      <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;
  return q.done(`<div class="flow">
      <span class="fnode sq">8</span>${arrow('× ' + a)}
      <span class="fnode circle">${q.num(p)}</span>${arrow('+ ' + b)}
      <span class="fnode tri">${q.num(p + b)}</span>
    </div>`,
    `8 × ${a} = ${p};  ${p} + ${b} = ${p + b}`);
},

/* ===== Luyện tập tr.35 – Bài 3: chọn kết quả cho mỗi phép tính ===== */
() => {
  const q = Q(3, 'Chọn kết quả cho mỗi phép tính.');
  const ks = [], ds = [];
  let guard = 0;
  while (ks.length < 3 && guard++ < 300){ const k = R(2, 9); if (!ks.includes(k)) ks.push(k); }
  guard = 0;
  while (ds.length < 2 && guard++ < 300){ const k = R(1, 9); if (!ds.includes(k)) ds.push(k); }
  // tích luôn ≥ 16, thương luôn ≤ 9 nên 5 kết quả chắc chắn khác nhau
  const items = ks.map(k => ({t:`8 × ${k}`, v:8 * k}))
    .concat(ds.map(k => ({t:`${8 * k} : 8`, v:k})))
    .sort(() => Math.random() - .5);
  const opts = items.map(x => String(x.v)).sort(() => Math.random() - .5);
  const flower = v => `<svg viewBox="0 0 100 100">
    <g fill="#f7cf3f" stroke="#d8a712" stroke-width="2">
      <ellipse cx="50" cy="16" rx="12" ry="16"/><ellipse cx="50" cy="84" rx="12" ry="16"/>
      <ellipse cx="16" cy="50" rx="16" ry="12"/><ellipse cx="84" cy="50" rx="16" ry="12"/>
      <ellipse cx="26" cy="26" rx="14" ry="11" transform="rotate(-45 26 26)"/>
      <ellipse cx="74" cy="26" rx="14" ry="11" transform="rotate(45 74 26)"/>
      <ellipse cx="26" cy="74" rx="14" ry="11" transform="rotate(45 26 74)"/>
      <ellipse cx="74" cy="74" rx="14" ry="11" transform="rotate(-45 74 74)"/>
    </g>
    <circle cx="50" cy="50" r="21" fill="#fff" stroke="#d8a712" stroke-width="2"/>
    <text x="50" y="57" font-size="19" font-weight="700" fill="#7a5a10" text-anchor="middle">${v}</text>
  </svg>`;
  const html = `<div class="bee-row">${items.map(x => flower(x.v)).join('')}</div>`
    + items.map(x => `<div class="fill-line">${x.t} = ${q.pick(String(x.v), opts)}</div>`).join('')
    + '<div class="hint-line">Chạm để chọn kết quả đúng của mỗi phép tính.</div>';
  return q.done(html);
},

/* ===== Luyện tập tr.35 – Bài 4: mỗi con cua có 8 cái chân và 2 cái càng ===== */
() => {
  const q = Q(4, '');
  const a = R(2, 9);
  let b = R(2, 9); if (b === a) b = a === 9 ? 2 : a + 1;
  const crab = `<svg viewBox="0 0 220 130" class="crab-svg">
    <ellipse cx="110" cy="72" rx="46" ry="30" fill="#8fbf9a" stroke="#4d7a58" stroke-width="3"/>
    <path d="M74 92l-22 24M92 100l-12 26M128 100l12 26M146 92l22 24M66 76l-30 8M154 76l30 8"
      stroke="#4d7a58" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M72 44q-20-14-30 2 10 6 18 4-6 8 2 14 12-6 10-20z" fill="#8fbf9a" stroke="#4d7a58" stroke-width="3"/>
    <path d="M148 44q20-14 30 2-10 6-18 4 6 8-2 14-12-6-10-20z" fill="#8fbf9a" stroke="#4d7a58" stroke-width="3"/>
    <circle cx="96" cy="58" r="8" fill="#fff" stroke="#4d7a58" stroke-width="2.4"/>
    <circle cx="124" cy="58" r="8" fill="#fff" stroke="#4d7a58" stroke-width="2.4"/>
    <circle cx="96" cy="59" r="3" fill="#2a3b2f"/><circle cx="124" cy="59" r="3" fill="#2a3b2f"/>
    <path d="M96 84q14 10 28 0" fill="none" stroke="#4d7a58" stroke-width="2.6"/>
  </svg>`;
  return q.done(`<p class="wordq">Mỗi con cua có 8 cái chân và 2 cái càng. Hỏi:</p>
    ${crab}
    <div class="fill-line">a) ${a} con cua có ${q.num(8 * a)} cái chân.</div>
    <div class="fill-line">b) ${b} con cua có ${q.num(2 * b)} cái càng.</div>`,
    `8 × ${a} = ${8 * a} (cái chân);  2 × ${b} = ${2 * b} (cái càng)`);
},
];
