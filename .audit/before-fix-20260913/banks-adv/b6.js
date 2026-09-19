/* ===== NÂNG CAO — Bài 6: Bảng nhân 4, bảng chia 4 ===== */

const b6advArrow = `<svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg>`;

const b6advCmpRow = () => {
  const k = R(1, 4);
  if (k === 1){ const a = R(2, 10), b = R(2, 10); return {t:`4 × ${a}`, p:`${4 * b} : 4`, tv:4 * a, pv:b}; }
  if (k === 2){ const a = R(2, 10), b = R(2, 10); return {t:`4 × ${a}`, p:`3 × ${b}`, tv:4 * a, pv:3 * b}; }
  if (k === 3){ const a = R(2, 10), b = R(2, 9), c = R(1, 6); return {t:`${4 * a} : 4`, p:`${4 * b} : 4 + ${c}`, tv:a, pv:b + c}; }
  const a = R(2, 9), b = R(2, 10), c = R(1, 6);
  return {t:`4 × ${a} + ${c}`, p:`4 × ${b}`, tv:4 * a + c, pv:4 * b};
};

ADV.b6 = [

/* 1. Bảng: tìm thừa số và tìm số chia của bảng 4 */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const HIDE_A = [1, 2, 1, 2, 1];       // 1 = ẩn thừa số thứ nhất · 2 = ẩn thừa số thứ hai
  const HIDE_B = [2, 1, 2, 1, 2];       // 1 = ẩn số bị chia · 2 = ẩn số chia
  const A = Array.from({length:5}, () => { const f = 4, k = R(2, 10); return {f, k, t:f * k}; });
  const B = Array.from({length:5}, () => { const c = 4, t = R(2, 10); return {c, t, a:c * t}; });
  const a1 = A.map((x, i) => HIDE_A[i] === 1 ? `<td>${q.num(x.f)}</td>` : `<td>${x.f}</td>`).join('');
  const a2 = A.map((x, i) => HIDE_A[i] === 2 ? `<td>${q.num(x.k)}</td>` : `<td>${x.k}</td>`).join('');
  const a3 = A.map(x => `<td>${x.t}</td>`).join('');
  const b1 = B.map((x, i) => HIDE_B[i] === 1 ? `<td>${q.num(x.a)}</td>` : `<td>${x.a}</td>`).join('');
  const b2 = B.map((x, i) => HIDE_B[i] === 2 ? `<td>${q.num(x.c)}</td>` : `<td>${x.c}</td>`).join('');
  const b3 = B.map(x => `<td>${x.t}</td>`).join('');
  return q.done(`<div class="sub-lbl">a)</div>
    <div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Thừa số</th>${a1}</tr><tr><th>Thừa số</th>${a2}</tr><tr><th>Tích</th>${a3}</tr></table></div>
    <div class="sub-lbl">b)</div>
    <div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số bị chia</th>${b1}</tr><tr><th>Số chia</th>${b2}</tr><tr><th>Thương</th>${b3}</tr></table></div>
    <div class="hint-line">Thừa số = tích : thừa số kia · Số chia = số bị chia : thương</div>`,
    'Lấy tích chia cho thừa số đã biết · Lấy số bị chia chia cho thương.');
},

/* 2. Số vừa có trong bảng nhân 4 vừa có trong bảng nhân 3 */
() => {
  const q = Q(2, 'Suy nghĩ rồi chọn tất cả các số đúng.');
  const dung = [12, 24];
  const sai = [8, 16, 20, 28, 32, 40, 9, 15, 21, 27].sort(() => Math.random() - .5).slice(0, 4);
  const opts = [...dung, ...sai].sort(() => Math.random() - .5).map(String);
  const ans = dung.map(String).sort().join(',');
  return q.done(`<div class="fill-line">a) Những số nào vừa có trong bảng nhân 4, vừa có trong bảng nhân 3?</div>
    ${q.pick(ans, opts)}
    <div class="fill-line">b) Số bé nhất trong các số vừa tìm được là ${q.num(12)}</div>
    <div class="fill-line">c) Hiệu của hai số vừa tìm được là ${q.num(12)}</div>`,
    'Bảng nhân 3 có 3; 6; …; 30 · Bảng nhân 4 có 4; 8; …; 40 · Hai bảng cùng có 12 và 24.');
},

/* 3. Sơ đồ ngược ba bước với bảng nhân 4, bảng chia 4 */
() => {
  const q = Q(3, 'Biết kết quả cuối cùng, hãy tìm các số còn thiếu trong sơ đồ.');
  const s = R(2, 10), base = 4 * s, m = 4 * R(1, 5);
  const t = base + m, e = t / 4;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(s)}</span>
      <span class="farrow"><i>× 4</i>${b6advArrow}</span>
      <span class="fnode circle">${q.num(base)}</span>
      <span class="farrow"><i>+ ${m}</i>${b6advArrow}</span>
      <span class="fnode sq">${q.num(t)}</span>
      <span class="farrow"><i>: 4</i>${b6advArrow}</span>
      <span class="fnode tri">${e}</span>
    </div>
    <div class="hint-line">Làm ngược từ phải sang trái: ${e} × 4 = ... , rồi bớt ${m}, rồi chia cho 4.</div>`,
    `${e} × 4 = ${t};  ${t} − ${m} = ${base};  ${base} : 4 = ${s}`);
},

/* 4. So sánh giá trị hai biểu thức */
() => {
  const q = Q(4, 'Tính rồi so sánh giá trị hai biểu thức.');
  const rows = Array.from({length:4}, () => b6advCmpRow());
  return q.done(`<div class="two-col"><div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.t}</span>${q.sign(r.tv > r.pv ? '>' : r.tv < r.pv ? '<' : '=')}<span class="side">${r.p}</span></div>`
    ).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(r => `${r.tv} và ${r.pv}`).join(' · '));
},

/* 5. Bài toán ba bước tính */
() => {
  const q = Q(5, '');
  const thung = R(5, 10), ban = 4 * R(1, 4);
  const tong = 4 * thung, conlai = tong - ban, tui = conlai / 4;
  return q.done(`<p class="wordq">Một cửa hàng có ${thung} thùng sữa, mỗi thùng có 4 hộp sữa.
      Cửa hàng đã bán ${ban} hộp sữa. Số hộp sữa còn lại được xếp đều vào các túi, mỗi túi 4 hộp.</p>
    <div class="fill-line">a) Cửa hàng có tất cả ${q.num(tong)} hộp sữa.</div>
    <div class="fill-line">b) Sau khi bán, cửa hàng còn ${q.num(conlai)} hộp sữa.</div>
    <div class="fill-line">c) Số hộp sữa còn lại xếp được ${q.num(tui)} túi.</div>`,
    `4 × ${thung} = ${tong};  ${tong} − ${ban} = ${conlai};  ${conlai} : 4 = ${tui}`);
},

/* 6. Tìm quy luật của dãy số */
() => {
  const q = Q(6, 'Tìm quy luật rồi viết tiếp ba số của dãy số sau.');
  const st = R(1, 5) * 4, b = pick([4, 8, 12]);
  const seq = [0, 1, 2, 3].map(i => st + i * b);
  const t8 = st + 7 * b;
  return q.done(`<div class="chain pill">${seq.map(x => `<span class="cnode">${x}</span>`).join('')}
      <span class="cnode q">${q.num(st + 4 * b)}</span>
      <span class="cnode q">${q.num(st + 5 * b)}</span>
      <span class="cnode q">${q.num(st + 6 * b)}</span></div>
    <div class="fill-line">Số thứ tám của dãy số đó là ${q.num(t8)}</div>`,
    `Dãy số cách đều ${b} đơn vị · số thứ tám = ${st} + 7 × ${b} = ${t8}`);
},
];
