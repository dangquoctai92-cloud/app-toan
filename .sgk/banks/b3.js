/* ==================== BÀI 3: TÌM THÀNH PHẦN TRONG PHÉP CỘNG, PHÉP TRỪ (SGK tr.11, 12, 13) ====================
   hoạt động tr.11–12: bài 1, 2, 3   ·   hoạt động tr.13: bài 1, 2   ·   luyện tập tr.13: bài 1, 2
========================================================================================================== */

ART.b3Boat = `<svg viewBox="0 0 230 120" class="art-big">
  <rect x="0" y="86" width="230" height="34" fill="#cfe9f8"/>
  <path d="M0 92q28-9 56 0t56 0 56 0 62 0" fill="none" stroke="#8cc4e4" stroke-width="3"/>
  <path d="M0 106q28-9 56 0t56 0 56 0 62 0" fill="none" stroke="#8cc4e4" stroke-width="3" opacity=".7"/>
  <path d="M30 64h170l-24 26H54z" fill="#e0a55f" stroke="#8f5a24" stroke-width="3"/>
  <path d="M112 62V14l46 32-46 6z" fill="#fdf6e5" stroke="#8f5a24" stroke-width="3"/>
  <path d="M104 62V16l-38 30 38 6z" fill="#f7e3c2" stroke="#8f5a24" stroke-width="3"/>
  <rect x="104" y="10" width="8" height="54" rx="3" fill="#8f5a24"/>
</svg>`;

ART.b3Duck = `<svg viewBox="0 0 160 120" class="art-big">
  <ellipse cx="76" cy="108" rx="62" ry="8" fill="rgba(60,60,60,.12)"/>
  <ellipse cx="64" cy="76" rx="46" ry="26" fill="#fdfdfd" stroke="#c9a227" stroke-width="2.6"/>
  <path d="M96 70q7-24 16-30" fill="none" stroke="#fdfdfd" stroke-width="17" stroke-linecap="round"/>
  <path d="M96 70q7-24 16-30" fill="none" stroke="#d9bc55" stroke-width="2" opacity=".5"/>
  <circle cx="118" cy="36" r="16" fill="#fdfdfd" stroke="#c9a227" stroke-width="2.6"/>
  <circle cx="124" cy="32" r="2.6" fill="#333"/>
  <path d="M133 38l20 5-20 8z" fill="#f5a623" stroke="#c9781a" stroke-width="2"/>
  <path d="M36 70q26-14 52 0" fill="none" stroke="#d9bc55" stroke-width="2.2"/>
  <path d="M50 100v8M74 100v8" stroke="#f5a623" stroke-width="5" stroke-linecap="round"/>
</svg>`;

BANKS.b3 = [

/* ===== hoạt động tr.11 – Bài 1: Tìm số hạng (theo mẫu) ===== */
() => {
  const q = Q(1, 'Tìm số hạng (theo mẫu).');
  const mb = R(10, 20), mx = R(11, 26), ms = mx + mb;
  const t1 = (() => { const x = R(11, 30), b = R(10, 30); return {x, b, s:x + b}; })();
  const t2 = (() => { const x = R(11, 30), b = R(10, 30); return {x, b, s:x + b}; })();
  const t3 = (() => { const a = R(10, 30), x = R(11, 30); return {a, x, s:a + x}; })();
  const sample = noteBox(`Mẫu: <span class="mau-b">?</span> + ${mb} = ${ms}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${ms} − ${mb} = ${mx}.`);
  const body = `<div class="two-col">${sample}
    <div class="eq-list">
      <div class="eq"><b>a)</b> ${q.num(t1.x)} <span class="op">+</span> ${t1.b} <span class="op">=</span> ${t1.s}</div>
      <div class="eq"><b>b)</b> ${q.num(t2.x)} <span class="op">+</span> ${t2.b} <span class="op">=</span> ${t2.s}</div>
      <div class="eq"><b>c)</b> ${t3.a} <span class="op">+</span> ${q.num(t3.x)} <span class="op">=</span> ${t3.s}</div>
    </div></div>`;
  return q.done(body, 'Muốn tìm một số hạng, ta lấy tổng trừ đi số hạng kia.');
},

/* ===== hoạt động tr.12 – Bài 2: Số ? (Số hạng – Số hạng – Tổng) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const it = Array.from({length:5}, () => { const a = R(11, 60), b = R(11, 60); return {a, b, s:a + b}; });
  it[4] = (() => { const a = R(50, 90), b = R(60, 120); return {a, b, s:a + b}; })();
  const HIDE = [0, 1, 2, 1, 2];           // 1 = ẩn số hạng thứ nhất · 2 = ẩn số hạng thứ hai
  const r1 = it.map((x, i) => HIDE[i] === 1 ? `<td>${q.num(x.a)}</td>` : `<td>${x.a}</td>`).join('');
  const r2 = it.map((x, i) => HIDE[i] === 2 ? `<td>${q.num(x.b)}</td>` : `<td>${x.b}</td>`).join('');
  const r3 = it.map(x => `<td>${x.s}</td>`).join('');
  return q.done(`<div class="tbl-wrap"><table class="tbl blue">
    <tr><th>Số hạng</th>${r1}</tr>
    <tr><th>Số hạng</th>${r2}</tr>
    <tr><th>Tổng</th>${r3}</tr>
  </table></div>`, 'Số hạng = tổng − số hạng kia');
},

/* ===== hoạt động tr.12 – Bài 3: Bài toán hai bến thuyền ===== */
() => {
  const q = Q(3, '');
  const b1 = R(20, 60), tot = b1 + R(15, 45);
  return q.done(`<p class="wordq">Hai bến có tất cả ${tot} thuyền để chở khách đi tham quan,
      trong đó bến thứ nhất có ${b1} thuyền. Hỏi bến thứ hai có bao nhiêu thuyền?</p>
    <div class="fill-line">Bến thứ hai có ${q.num(tot - b1)} thuyền.</div>
    <div class="art-row plain">${ART.b3Boat}</div>`,
    `${tot} − ${b1} = ${tot - b1} (thuyền)`);
},

/* ===== hoạt động tr.13 – Bài 1: a) Tìm số bị trừ · b) Tìm số trừ (theo mẫu) ===== */
() => {
  const q = Q(1, 'a) Tìm số bị trừ (theo mẫu).');
  const ma = R(10, 20), mh = R(20, 40), mx = ma + mh;
  const A = Array.from({length:3}, () => { const b = R(10, 25), h = R(15, 45); return {b, h, x:b + h}; });
  const na = R(10, 25), nh = R(15, 40), nx = na + nh;
  const Bq = Array.from({length:3}, () => { const x = R(10, 30), h = R(10, 30); return {x, h, a:x + h}; });
  const boxA = noteBox(`Mẫu: <span class="mau-b">?</span> − ${ma} = ${mh}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${mh} + ${ma} = ${mx}.`);
  const listA = '<div class="eq-list">' + A.map(t =>
    `<div class="eq">${q.num(t.x)} <span class="op">−</span> ${t.b} <span class="op">=</span> ${t.h}</div>`).join('') + '</div>';
  const boxB = noteBox(`Mẫu: ${nx} − <span class="mau-b">?</span> = ${nh}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${nx} − ${nh} = ${na}.`);
  const listB = '<div class="eq-list">' + Bq.map(t =>
    `<div class="eq">${t.a} <span class="op">−</span> ${q.num(t.x)} <span class="op">=</span> ${t.h}</div>`).join('') + '</div>';
  return q.done(`<div class="two-col">${boxA}${listA}</div>
    <div class="sub-lbl">b) Tìm số trừ (theo mẫu).</div>
    <div class="two-col">${boxB}${listB}</div>`,
    'Số bị trừ = hiệu + số trừ · Số trừ = số bị trừ − hiệu');
},

/* ===== hoạt động tr.13 – Bài 2: Số ? (Số bị trừ – Số trừ – Hiệu) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const it = Array.from({length:5}, () => { const b = R(11, 30), h = R(10, 50); return {b, h, a:b + h}; });
  const HIDE = [0, 1, 2, 1, 2];           // 1 = ẩn số bị trừ · 2 = ẩn số trừ
  const r1 = it.map((x, i) => HIDE[i] === 1 ? `<td>${q.num(x.a)}</td>` : `<td>${x.a}</td>`).join('');
  const r2 = it.map((x, i) => HIDE[i] === 2 ? `<td>${q.num(x.b)}</td>` : `<td>${x.b}</td>`).join('');
  const r3 = it.map(x => `<td>${x.h}</td>`).join('');
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
    <tr><th>Số bị trừ</th>${r1}</tr>
    <tr><th>Số trừ</th>${r2}</tr>
    <tr><th>Hiệu</th>${r3}</tr>
  </table></div>`, 'Số bị trừ = hiệu + số trừ · Số trừ = số bị trừ − hiệu');
},

/* ===== luyện tập tr.13 – Bài 1: Chọn câu trả lời đúng ===== */
() => {
  const q = Q(1, 'Chọn câu trả lời đúng.');
  const L = ['A', 'B', 'C'];
  // a) biết số trừ và hiệu, tìm số bị trừ
  const ha = R(11, 30), sta = ha + R(3, 25);
  const okA = sta + ha, listA = [okA, sta - ha, okA - 10].sort(() => Math.random() - .5);
  const letA = L[listA.indexOf(okA)];
  // b) biết số bị trừ và hiệu, tìm số trừ
  const hb = R(11, 35), sbt = hb + R(11, 40);
  const okB = sbt - hb, listB = [okB, sbt + hb, okB + 10].sort(() => Math.random() - .5);
  const letB = L[listB.indexOf(okB)];
  const row = arr => '<div class="opt-row">' + arr.map((v, i) => `<span><i>${L[i]}.</i>${v}</span>`).join('') + '</div>';
  return q.done(`<div class="fill-line">a) Biết số trừ là <b>${ha}</b>, hiệu là <b>${sta}</b>, số bị trừ là:</div>
      ${row(listA)}${q.pick(letA, L)}
    <div class="fill-line">b) Biết số bị trừ là <b>${sbt}</b>, hiệu là <b>${hb}</b>, số trừ là:</div>
      ${row(listB)}${q.pick(letB, L)}`,
    `a) ${sta} + ${ha} = ${okA};  b) ${sbt} − ${hb} = ${okB}`);
},

/* ===== luyện tập tr.13 – Bài 2: Bài toán đàn vịt ===== */
() => {
  const q = Q(2, '');
  const tot = R(45, 95), left = R(12, tot - 12);
  return q.done(`<p class="wordq">Lúc đầu có ${tot} con vịt ở trên bờ. Lúc sau có một số con vịt xuống ao bơi lội,
      số vịt còn lại ở trên bờ là ${left} con. Hỏi có bao nhiêu con vịt xuống ao?</p>
    <div class="fill-line">Có ${q.num(tot - left)} con vịt xuống ao.</div>
    <div class="art-row plain">${ART.b3Duck}</div>`,
    `${tot} − ${left} = ${tot - left} (con)`);
},
];
