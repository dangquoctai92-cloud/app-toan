/* ==================== BÀI 10: BẢNG NHÂN 7, BẢNG CHIA 7 (SGK trang 31, 32) ====================
   · Hoạt động (tr.31–32): bài 1, 2, 3
   · Luyện tập (tr.32): bài 1, 2, 3, 4
=========================================================================================== */



BANKS.b10 = [

/* ===== Hoạt động tr.31 – Bài 1: Số ? (sơ đồ mũi tên) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
      <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;
  const ms = [], ds = [];
  let guard = 0;
  while (ms.length < 3 && guard++ < 200){ const k = R(2, 9); if (!ms.includes(k)) ms.push(k); }
  guard = 0;
  while (ds.length < 3 && guard++ < 200){ const k = R(2, 9); if (!ds.includes(k)) ds.push(k); }
  const rowA = ms.map(k => `<div class="flow">
      <span class="fnode circle">7</span>${arrow('× ' + k)}<span class="fnode sq">${q.num(7 * k)}</span>
    </div>`).join('');
  const rowB = ds.map(k => `<div class="flow">
      <span class="fnode sq">${7 * k}</span>${arrow(': 7')}<span class="fnode circle">${q.num(k)}</span>
    </div>`).join('');
  return q.done(`<div class="sub-lbl">a)</div>${rowA}<div class="sub-lbl">b)</div>${rowB}`);
},

/* ===== Hoạt động tr.32 – Bài 2: Rô-bốt lấy quả bóng có kết quả bé hơn ... ===== */
() => {
  const q = Q(2, '');
  const T = pick([21, 28, 35]);
  const mk = [], dk = [];
  let guard = 0;
  while (mk.length < 4 && guard++ < 200){ const k = R(1, 9); if (!mk.includes(k)) mk.push(k); }
  guard = 0;
  while (dk.length < 4 && guard++ < 200){ const k = R(1, 9); if (!dk.includes(k)) dk.push(k); }
  const items = mk.map(k => ({t:`7 × ${k}`, v:7 * k}))
    .concat(dk.map(k => ({t:`${7 * k} : 7`, v:k})))
    .sort(() => Math.random() - .5);
  const cnt = items.filter(x => x.v < T).length;
  const ball = t => `<svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill="#7fd0f0" stroke="#2f8fb5" stroke-width="3"/>
    <path d="M6 50a44 44 0 0 1 44-44v44z" fill="#f2d24a"/>
    <path d="M50 6a44 44 0 0 1 44 44H50z" fill="#e8514b"/>
    <path d="M50 94a44 44 0 0 1-44-44h44z" fill="#7cc45a"/>
    <circle cx="50" cy="50" r="44" fill="none" stroke="#2f8fb5" stroke-width="3"/>
    <rect x="16" y="38" width="68" height="24" rx="9" fill="rgba(255,255,255,.88)"/>
    <text x="50" y="56" font-size="17" font-weight="700" fill="#25506e" text-anchor="middle">${t}</text>
  </svg>`;
  const html = `<p class="wordq">Rô-bốt lấy các quả bóng ghi phép tính có kết quả bé hơn ${T}.
      Hỏi Rô-bốt lấy được bao nhiêu quả bóng như vậy?</p>
    <div class="ball-row">${items.map(x => ball(x.t)).join('')}</div>
    <div class="fill-line">Rô-bốt lấy được ${q.num(cnt)} quả bóng.</div>`;
  return q.done(html, items.map(x => `${x.t} = ${x.v}`).join(' · '));
},

/* ===== Hoạt động tr.32 – Bài 3: bài toán tuần lễ ===== */
() => {
  const q = Q(3, '');
  const n = R(2, 9);
  return q.done(`<p class="wordq">Mỗi tuần lễ có 7 ngày. Bố của Mai đi công tác ${n} tuần lễ.
      Hỏi bố của Mai đi công tác bao nhiêu ngày?</p>
    <div class="fill-line">Bố của Mai đi công tác ${q.num(7 * n)} ngày.</div>`,
    `7 × ${n} = ${7 * n} (ngày)`);
},

/* ===== Luyện tập tr.32 – Bài 1: nêu các số còn thiếu ===== */
() => {
  const q = Q(1, 'Nêu các số còn thiếu.');
  const hidden = () => {
    const h = [];
    let guard = 0;
    while (h.length < 4 && guard++ < 200){ const i = R(1, 8); if (!h.includes(i)) h.push(i); }
    return h;
  };
  const hu = hidden(), hd = hidden();
  const up = Array.from({length:10}, (_, i) => 7 * (i + 1));
  const dn = Array.from({length:10}, (_, i) => 70 - 7 * i);
  const node = (v, i, hs) => hs.includes(i)
    ? `<span class="cnode q">${q.num(v)}</span>` : `<span class="cnode">${v}</span>`;
  return q.done(`<div class="sub-lbl">a)</div>
      <div class="chain dia">${up.map((v, i) => node(v, i, hu)).join('')}</div>
    <div class="sub-lbl">b)</div>
      <div class="chain round">${dn.map((v, i) => node(v, i, hd)).join('')}</div>`);
},

/* ===== Luyện tập tr.32 – Bài 2: Số ? (bảng nhân, bảng chia) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const ks = [], ms = [];
  let guard = 0;
  while (ks.length < 6 && guard++ < 300){ const k = R(1, 9); if (!ks.includes(k)) ks.push(k); }
  guard = 0;
  while (ms.length < 6 && guard++ < 300){ const m = R(1, 9); if (!ms.includes(m)) ms.push(m); }
  const html = `<div class="sub-lbl">a)</div><div class="tbl-wrap"><table class="tbl blue">
      <tr><td rowspan="3" class="opcell">×</td>${ks.map(() => '<td>7</td>').join('')}</tr>
      <tr>${ks.map(k => `<td>${k}</td>`).join('')}</tr>
      <tr><td>${7 * ks[0]}</td>${ks.slice(1).map(k => `<td>${q.num(7 * k)}</td>`).join('')}</tr>
    </table></div>
    <div class="sub-lbl">b)</div><div class="tbl-wrap"><table class="tbl pink">
      <tr><td rowspan="3" class="opcell">:</td>${ms.map(m => `<td>${7 * m}</td>`).join('')}</tr>
      <tr>${ms.map(() => '<td>7</td>').join('')}</tr>
      <tr><td>${ms[0]}</td>${ms.slice(1).map(m => `<td>${q.num(m)}</td>`).join('')}</tr>
    </table></div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.32 – Bài 3: bài toán xếp cốc vào hộp ===== */
() => {
  const q = Q(3, '');
  const each = R(2, 9), all = 7 * each;
  return q.done(`<p class="wordq">Có ${all} cái cốc xếp đều vào 7 hộp. Hỏi mỗi hộp có mấy cái cốc?</p>
    <div class="fill-line">Mỗi hộp có ${q.num(each)} cái cốc.</div>`,
    `${all} : 7 = ${each} (cái cốc)`);
},

/* ===== Luyện tập tr.32 – Bài 4: >, <, = ? ===== */
() => {
  const q = Q(4, '&gt; ; &lt; ; = ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  const a1 = R(2, 9);
  let b1 = R(2, 9); if (b1 === a1) b1 = a1 === 9 ? 2 : a1 + 1;
  const a2 = R(2, 9);
  const a3 = R(2, 9);
  let b3 = R(2, 9); if (b3 === a3) b3 = a3 === 2 ? 9 : a3 - 1;
  const k = pick([2, 3, 6]), N = 7 * k;
  const v = R(2, 9), j = pick([2, 3, 4, 5]);
  let w = v + pick([-1, 0, 1]); if (w < 2) w = 2; if (w > 9) w = 9;
  const c1 = R(2, 9);
  let c2 = R(2, 9); if (c2 === c1) c2 = c1 === 9 ? 2 : c1 + 1;
  const A = [
    [`7 × ${a1}`, `7 × ${b1}`, cmp(7 * a1, 7 * b1)],
    [`7 × ${a2}`, `${a2} × 7`, '='],
    [`7 × ${a3}`, `7 × ${b3}`, cmp(7 * a3, 7 * b3)]
  ];
  const B = [
    [`${N} : 7`, `${N} : ${k}`, cmp(N / 7, N / k)],
    [`${7 * v} : 7`, `${j * w} : ${j}`, cmp(v, w)],
    [`${7 * c1} : 7`, `${7 * c2} : 7`, cmp(c1, c2)]
  ];
  const line = ([l, r, a]) =>
    `<div class="cmp-row"><span class="side">${l}</span>${q.sign(a)}<span class="side">${r}</span></div>`;
  return q.done(`<div class="two-col">
      <div><div class="sub-lbl">a)</div>${A.map(line).join('')}</div>
      <div><div class="sub-lbl">b)</div>${B.map(line).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},
];
