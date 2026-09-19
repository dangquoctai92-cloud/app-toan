/* ===== NÂNG CAO — Bài 4: Ôn tập bảng nhân 2; 5, bảng chia 2; 5 ===== */

const b4advArrow = `<svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg>`;

const b4advCmpRow = () => {
  const k = R(1, 4);
  if (k === 1){ const a = R(2, 10), b = R(2, 10); return {t:`2 × ${a}`, p:`5 × ${b}`, tv:2 * a, pv:5 * b}; }
  if (k === 2){ const a = R(2, 10), b = R(2, 10); return {t:`${2 * a} : 2`, p:`${5 * b} : 5`, tv:a, pv:b}; }
  if (k === 3){ const a = R(2, 10), b = R(2, 8), c = R(1, 9); return {t:`5 × ${a}`, p:`2 × ${b} + ${c}`, tv:5 * a, pv:2 * b + c}; }
  const a = R(2, 10), b = R(2, 10), c = R(1, 9);
  return {t:`${5 * a} : 5 + ${c}`, p:`${2 * b} : 2`, tv:a + c, pv:b};
};

ADV.b4 = [

/* 1. Sơ đồ ngược: biết kết quả cuối, tìm số ban đầu */
() => {
  const q = Q(1, 'Biết kết quả cuối cùng, hãy tìm các số còn thiếu trong sơ đồ.');
  const s = R(2, 10), base = 2 * s;
  const t = 5 * (Math.floor(base / 5) + R(1, 2));
  const m = t - base, e = t / 5;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(s)}</span>
      <span class="farrow"><i>× 2</i>${b4advArrow}</span>
      <span class="fnode circle">${q.num(base)}</span>
      <span class="farrow"><i>+ ${m}</i>${b4advArrow}</span>
      <span class="fnode sq">${q.num(t)}</span>
      <span class="farrow"><i>: 5</i>${b4advArrow}</span>
      <span class="fnode tri">${e}</span>
    </div>
    <div class="hint-line">Làm ngược từ phải sang trái: ${e} × 5 = ... , rồi bớt ${m}, rồi chia cho 2.</div>`,
    `${e} × 5 = ${t};  ${t} − ${m} = ${base};  ${base} : 2 = ${s}`);
},

/* 2. Số vừa có trong bảng nhân 2 vừa có trong bảng nhân 5 */
() => {
  const q = Q(2, 'Suy nghĩ rồi chọn tất cả các số đúng.');
  const dung = [10, 20];
  const sai = [6, 14, 18, 15, 25, 35, 45, 8, 12, 16].sort(() => Math.random() - .5).slice(0, 4);
  const opts = [...dung, ...sai].sort(() => Math.random() - .5).map(String);
  const ans = dung.map(String).sort().join(',');
  return q.done(`<div class="fill-line">a) Những số nào vừa có trong bảng nhân 2, vừa có trong bảng nhân 5?</div>
    ${q.pick(ans, opts)}
    <div class="fill-line">b) Số bé nhất trong các số vừa tìm được là ${q.num(10)}</div>
    <div class="fill-line">c) Tổng của các số vừa tìm được là ${q.num(30)}</div>`,
    'Bảng nhân 2 có 2; 4; …; 20 · Bảng nhân 5 có 5; 10; …; 50 · Hai bảng cùng có 10 và 20.');
},

/* 3. So sánh giá trị hai biểu thức */
() => {
  const q = Q(3, 'Tính rồi so sánh giá trị hai biểu thức.');
  const rows = Array.from({length:4}, () => b4advCmpRow());
  return q.done(`<div class="two-col"><div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.t}</span>${q.sign(r.tv > r.pv ? '>' : r.tv < r.pv ? '<' : '=')}<span class="side">${r.p}</span></div>`
    ).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(r => `${r.tv} và ${r.pv}`).join(' · '));
},

/* 4. Bảng: tìm thừa số và tìm số chia */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const HIDE_A = [1, 2, 1, 2, 1];       // 1 = ẩn thừa số thứ nhất · 2 = ẩn thừa số thứ hai
  const HIDE_B = [2, 1, 2, 1, 2];       // 1 = ẩn số bị chia · 2 = ẩn số chia
  const A = Array.from({length:5}, () => { const f = pick([2, 5]), k = R(2, 10); return {f, k, t:f * k}; });
  const B = Array.from({length:5}, () => { const c = pick([2, 5]), t = R(2, 10); return {c, t, a:c * t}; });
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

/* 5. Bài toán ba bước tính */
() => {
  const q = Q(5, '');
  const hop = R(2, 5) * 2, ban = R(2, 8) * 2;
  const tong = 5 * hop, conlai = tong - ban, tui = conlai / 2;
  return q.done(`<p class="wordq">Một cửa hàng có ${hop} hộp bánh, mỗi hộp có 5 cái bánh. Cửa hàng đã bán
      ${ban} cái bánh. Số bánh còn lại được xếp đều vào các túi, mỗi túi 2 cái bánh.</p>
    <div class="fill-line">a) Cửa hàng có tất cả ${q.num(tong)} cái bánh.</div>
    <div class="fill-line">b) Sau khi bán, cửa hàng còn ${q.num(conlai)} cái bánh.</div>
    <div class="fill-line">c) Số bánh còn lại xếp được ${q.num(tui)} túi.</div>`,
    `5 × ${hop} = ${tong};  ${tong} − ${ban} = ${conlai};  ${conlai} : 2 = ${tui}`);
},
];
