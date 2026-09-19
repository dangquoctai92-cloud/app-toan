/* ==================== BÀI 4: ÔN TẬP BẢNG NHÂN 2; 5, BẢNG CHIA 2; 5 (SGK tr.14, 15) ====================
   luyện tập tr.14 (bảng nhân 2, bảng chia 2): bài 1, 2, 3, 4, 5
   luyện tập tr.15 (bảng nhân 5, bảng chia 5): bài 1, 2, 3, 4
======================================================================================================= */

ART.arrow = `<svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg>`;

ART.b4Pomelo = t => `<span class="pomelo"><svg viewBox="0 0 110 104">
  <ellipse cx="55" cy="58" rx="41" ry="39" fill="#f4f18e" stroke="#b9ad33" stroke-width="2.6"/>
  <ellipse cx="41" cy="42" rx="12" ry="8" fill="#fdfbc8" opacity=".8"/>
  <path d="M55 20q4-11 15-14" fill="none" stroke="#6f9a3a" stroke-width="4" stroke-linecap="round"/>
  <path d="M60 12q12-10 24-4-10 12-24 4z" fill="#6cb03f" stroke="#4a7d28" stroke-width="2"/>
</svg><b>${t}</b></span>`;

ART.b4Basket = n => `<span class="bskt"><svg viewBox="0 0 120 96">
  <ellipse cx="60" cy="88" rx="46" ry="6" fill="rgba(60,40,20,.14)"/>
  <path d="M12 24h96l-13 62H25z" fill="#e0574c" stroke="#a63c33" stroke-width="3"/>
  <ellipse cx="60" cy="24" rx="48" ry="10" fill="#f08d84" stroke="#a63c33" stroke-width="3"/>
  <path d="M20 44h80M24 62h72" stroke="#a63c33" stroke-width="2" opacity=".55"/>
</svg><b>${n}</b></span>`;

BANKS.b4 = [

/* ===== tr.14 – Bài 1: Số ? (bảng nhân 2, bảng chia 2) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const K = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const keep = () => [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - .5).slice(0, 2);
  const kA = keep(), kB = keep();
  const shown = (i, k) => i === 0 || i === 9 || k.includes(i);
  const a1 = K.map(() => '<td>2</td>').join('');
  const a2 = K.map(k => `<td>${k}</td>`).join('');
  const a3 = K.map((k, i) => shown(i, kA) ? `<td>${2 * k}</td>` : `<td>${q.num(2 * k, 2)}</td>`).join('');
  const c1 = K.map(k => `<td>${2 * k}</td>`).join('');
  const c2 = K.map(() => '<td>2</td>').join('');
  const c3 = K.map((k, i) => shown(i, kB) ? `<td>${k}</td>` : `<td>${q.num(k, 2)}</td>`).join('');
  return q.done(`<div class="sect">Ôn tập bảng nhân 2, bảng chia 2</div>
    <div class="sub-lbl">a)</div>
    <div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Thừa số</th>${a1}</tr><tr><th>Thừa số</th>${a2}</tr><tr><th>Tích</th>${a3}</tr></table></div>
    <div class="sub-lbl">b)</div>
    <div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số bị chia</th>${c1}</tr><tr><th>Số chia</th>${c2}</tr><tr><th>Thương</th>${c3}</tr></table></div>`);
},

/* ===== tr.14 – Bài 2: Nêu các số còn thiếu (đếm thêm 2, bớt 2) ===== */
() => {
  const q = Q(2, 'Nêu các số còn thiếu.');
  const hid = () => [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - .5).slice(0, 5);
  const hA = hid(), hB = hid();
  const up = Array.from({length:10}, (_, i) => 2 * (i + 1));
  const dn = Array.from({length:10}, (_, i) => 20 - 2 * i);
  const rowA = up.map((v, i) => hA.includes(i)
    ? `<span class="cnode q">${q.num(v, 2)}</span>` : `<span class="cnode">${v}</span>`).join('');
  const rowB = dn.map((v, i) => hB.includes(i)
    ? `<span class="cnode q">${q.num(v, 2)}</span>` : `<span class="cnode">${v}</span>`).join('');
  return q.done(`<div class="sub-lbl">a)</div><div class="chain pill">${rowA}</div>
    <div class="sub-lbl">b)</div><div class="chain dia">${rowB}</div>`,
    'a) đếm thêm 2 · b) đếm bớt 2');
},

/* ===== tr.14 – Bài 3: Số ? (sơ đồ nhân rồi cộng) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const k = R(3, 10), m = R(5, 20);
  return q.done(`<div class="flow">
    <span class="fnode sq">2</span>
    <span class="farrow"><i>× ${k}</i>${ART.arrow}</span>
    <span class="fnode circle">${q.num(2 * k)}</span>
    <span class="farrow"><i>+ ${m}</i>${ART.arrow}</span>
    <span class="fnode tri">${q.num(2 * k + m)}</span>
  </div>`, `2 × ${k} = ${2 * k};  ${2 * k} + ${m} = ${2 * k + m}`);
},

/* ===== tr.14 – Bài 4: Bài toán bàn học ===== */
() => {
  const q = Q(4, '');
  const ban = R(5, 10), hs = ban * 2;
  return q.done(`<p class="wordq">Có ${hs} học sinh ngồi vào các bàn học, mỗi bàn 2 bạn.
      Hỏi có bao nhiêu bàn học như vậy?</p>
    <div class="fill-line">Có ${q.num(ban)} bàn học như vậy.</div>`,
    `${hs} : 2 = ${ban} (bàn)`);
},

/* ===== tr.14 – Bài 5: Bài toán hội đấu vật ===== */
() => {
  const q = Q(5, '');
  const cap = R(5, 10);
  return q.done(`<p class="wordq">Trong ngày hội đấu vật đầu xuân có ${cap} cặp đô vật tham gia thi đấu.
      Hỏi có bao nhiêu đô vật tham gia thi đấu?</p>
    <div class="fill-line">Có ${q.num(cap * 2)} đô vật tham gia thi đấu.</div>`,
    `${cap} × 2 = ${cap * 2} (đô vật)`);
},

/* ===== tr.15 – Bài 1: Số ? (bảng nhân 5, bảng chia 5) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const K = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const KD = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const keep = () => [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - .5).slice(0, 2);
  const kA = keep(), kB = keep();
  const shown = (i, k) => i === 0 || i === 9 || k.includes(i);
  const a1 = K.map(() => '<td>5</td>').join('');
  const a2 = K.map(k => `<td>${k}</td>`).join('');
  const a3 = K.map((k, i) => shown(i, kA) ? `<td>${5 * k}</td>` : `<td>${q.num(5 * k, 2)}</td>`).join('');
  const c1 = KD.map(k => `<td>${5 * k}</td>`).join('');
  const c2 = KD.map(() => '<td>5</td>').join('');
  const c3 = KD.map((k, i) => shown(i, kB) ? `<td>${k}</td>` : `<td>${q.num(k, 2)}</td>`).join('');
  return q.done(`<div class="sect">Ôn tập bảng nhân 5, bảng chia 5</div>
    <div class="sub-lbl">a)</div>
    <div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Thừa số</th>${a1}</tr><tr><th>Thừa số</th>${a2}</tr><tr><th>Tích</th>${a3}</tr></table></div>
    <div class="sub-lbl">b)</div>
    <div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số bị chia</th>${c1}</tr><tr><th>Số chia</th>${c2}</tr><tr><th>Thương</th>${c3}</tr></table></div>`);
},

/* ===== tr.15 – Bài 2: Rô-bốt hái bưởi cho vào các sọt ===== */
() => {
  const q = Q(2, 'Rô-bốt sẽ hái hết những quả bưởi rồi cho vào các sọt (như hình vẽ). Hỏi:');
  const exprFor = v => {
    const o = [];
    if (v % 5 === 0 && v / 5 <= 10) o.push(`5 × ${v / 5}`, `${v / 5} × 5`);
    if (v % 2 === 0 && v / 2 <= 10) o.push(`2 × ${v / 2}`);
    if (v <= 10) o.push(`${v * 5} : 5`, `${v * 2} : 2`);
    return pick(o);
  };
  const vals = [2, 4, 5, 10, 15, 20, 25].sort(() => Math.random() - .5).slice(0, 3);
  const cnt = [3, 2, 1].sort(() => Math.random() - .5);
  const sot = vals.map((v, i) => ({v, n:cnt[i]}));
  const fruits = [];
  sot.forEach(s => { for (let i = 0; i < s.n; i++) fruits.push(exprFor(s.v)); });
  fruits.sort(() => Math.random() - .5);
  const most = sot.reduce((a, b) => b.n > a.n ? b : a).v;
  const least = sot.reduce((a, b) => b.n < a.n ? b : a).v;
  const opts = sot.map(s => String(s.v));
  return q.done(`<div class="fruit-row">${fruits.map(t => ART.b4Pomelo(t)).join('')}</div>
    <div class="basket-row">${sot.map(s => ART.b4Basket(s.v)).join('')}</div>
    <div class="fill-line">a) Sọt nào sẽ có nhiều bưởi nhất? ${q.pick(String(most), opts)}</div>
    <div class="fill-line">b) Sọt nào sẽ có ít bưởi nhất? ${q.pick(String(least), opts)}</div>`,
    sot.map(s => `sọt ${s.v}: ${s.n} quả`).join(' · '));
},

/* ===== tr.15 – Bài 3: >; <; = ? ===== */
() => {
  const q = Q(3, '&gt; ; &lt; ; = ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  const k1 = R(2, 10), n1 = Math.random() < .4 ? k1 : R(2, 10);
  const k2 = R(2, 10), n2 = Math.random() < .4 ? k2 : R(2, 10);
  const k3 = R(2, 10), m3 = Math.random() < .4 ? k3 : R(2, 10);
  const rows = [
    [`${5 * k1} : 5`, String(n1), cmp(k1, n1)],
    [`${5 * k2} : 5`, String(n2), cmp(k2, n2)],
    [`5 × ${k3}`, `${5 * m3} : 5`, cmp(5 * k3, m3)]
  ];
  const lbl = ['a)', 'b)', 'c)'];
  const line = ([l, r, a], i) =>
    `<div class="cmp-row"><b>${lbl[i]}</b> <span class="side">${l}</span>${q.sign(a)}<span class="side">${r}</span></div>`;
  return q.done(rows.map(line).join('') +
    '<div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>');
},

/* ===== tr.15 – Bài 4: Bài toán chia gạo nếp ===== */
() => {
  const q = Q(4, '');
  const tui = 5, moi = R(3, 12), tong = tui * moi;
  return q.done(`<p class="wordq">Cửa hàng có ${tong} kg gạo nếp. Người ta chia đều số gạo nếp đó vào ${tui} túi.
      Hỏi mỗi túi có bao nhiêu ki-lô-gam gạo nếp?</p>
    <div class="fill-line">Mỗi túi có ${q.num(moi)} kg gạo nếp.</div>`,
    `${tong} : ${tui} = ${moi} (kg)`);
},
];
