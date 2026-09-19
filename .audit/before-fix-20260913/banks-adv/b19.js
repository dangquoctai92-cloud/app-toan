/*CSS
.b19adv-fig{width:100%;max-width:320px;height:auto;display:block;margin:8px auto}
.b19adv-wide{width:100%;max-width:360px;height:auto;display:block;margin:8px auto}
CSS*/

/* ===== NÂNG CAO — Bài 19: Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông ===== */

const b19advBag = n => 'ABCDEGHIKLMNPQ'.split('').sort(() => Math.random() - .5).slice(0, n);

/* tam giác lớn: đỉnh trên là nm[0], trên cạnh đáy có k điểm được nối lên đỉnh;
   các điểm của cạnh đáy lần lượt mang tên nm[1] … nm[k+2] */
const b19advTri = (k, nm) => {
  const W = 320, H = 214, ax = 160, ay = 28, by = 178, x0 = 22, x1 = 298;
  const xs = [];
  for (let i = 0; i <= k + 1; i++) xs.push(x0 + (x1 - x0) * i / (k + 1));
  const seg = xs.slice(1, -1).map(x =>
    `<path d="M${ax} ${ay}L${x.toFixed(1)} ${by}" fill="none" stroke="#c2185b" stroke-width="2.4"/>`).join('');
  const dot = xs.map(x => `<circle cx="${x.toFixed(1)}" cy="${by}" r="3.6"/>`).join('');
  const lab = xs.map((x, i) =>
    `<text x="${x.toFixed(1)}" y="${by + 26}" text-anchor="middle" font-size="18" font-weight="700">${nm[i + 1]}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="b19adv-fig">
    <path d="M${ax} ${ay}L${x0} ${by}H${x1}Z" fill="#fdf0f6" stroke="#c2185b" stroke-width="3.2" stroke-linejoin="round"/>
    ${seg}${dot}<circle cx="${ax}" cy="${ay}" r="3.6"/>
    <text x="${ax}" y="${ay - 9}" text-anchor="middle" font-size="18" font-weight="700">${nm[0]}</text>
    ${lab}</svg>`;
};

/* hình chữ nhật lớn được chia bởi v đoạn thẳng đứng và h đoạn nằm ngang */
const b19advGrid = (v, h) => {
  const C = 52, W = (v + 1) * C, H = (h + 1) * C;
  let g = '';
  for (let i = 1; i <= v; i++) g += `M${i * C} 0V${H}`;
  for (let j = 1; j <= h; j++) g += `M0 ${j * C}H${W}`;
  return `<svg viewBox="-8 -8 ${W + 16} ${H + 16}" class="b19adv-wide">
    <rect x="0" y="0" width="${W}" height="${H}" fill="#e8f4fd" stroke="#1f6fb2" stroke-width="3.4"/>
    <path d="${g}" fill="none" stroke="#1f6fb2" stroke-width="2.4"/></svg>`;
};

/* tấm bìa hình chữ nhật được cắt thành k hình vuông bằng nhau */
const b19advCut = k => {
  const C = 44, W = k * C, H = C;
  let g = '';
  for (let i = 1; i < k; i++) g += `M${i * C} 0V${H}`;
  return `<svg viewBox="-8 -8 ${W + 16} ${H + 16}" class="b19adv-wide">
    <rect x="0" y="0" width="${W}" height="${H}" fill="#fff4dd" stroke="#c07f16" stroke-width="3.2"/>
    <path d="${g}" fill="none" stroke="#c07f16" stroke-width="2.2" stroke-dasharray="7 5"/></svg>`;
};

/* n hình vuông ghép liền nhau bằng các que tính bằng nhau */
const b19advStick = n => {
  const C = 42, W = n * C, H = C;
  const st = (x1, y1, x2, y2) =>
    `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#a9721f" stroke-width="6" stroke-linecap="round"/>`;
  let s = '';
  for (let i = 0; i <= n; i++) s += st(i * C, 0, i * C, H);
  for (let i = 0; i < n; i++){ s += st(i * C, 0, (i + 1) * C, 0); s += st(i * C, H, (i + 1) * C, H); }
  return `<svg viewBox="-10 -10 ${W + 20} ${H + 20}" class="b19adv-wide">${s}</svg>`;
};

const b19advPairs = [[1, 0], [2, 0], [3, 0], [1, 1]];

ADV.b19 = [

/* 1. Đếm hình tam giác trong hình vẽ */
() => {
  const q = Q(1, 'Đếm số hình tam giác có trong hình vẽ dưới đây.');
  const k = R(2, 3);
  const nm = b19advBag(k + 3);
  const diem = k + 2, tong = diem * (diem - 1) / 2;
  const cong = [];
  for (let i = diem - 1; i >= 1; i--) cong.push(i);
  return q.done(b19advTri(k, nm)
    + `<div class="fill-line">Trên cạnh đáy ${nm[1]}${nm[diem]} có tất cả ${q.num(diem, 1)} điểm đã được đánh dấu.</div>
       <div class="fill-line">Hình vẽ có ${q.num(k + 1, 1)} hình tam giác nhỏ nhất (không bị chia nhỏ nữa).</div>
       <div class="fill-line">Hình vẽ có tất cả ${q.num(tong, 2)} hình tam giác.</div>
       <div class="hint-line">Cứ hai điểm trên cạnh đáy cùng với đỉnh ${nm[0]} cho một hình tam giác.</div>`,
    `Số hình tam giác là ${cong.join(' + ')} = ${tong} (hình).`);
},

/* 2. Đếm hình chữ nhật trong hình vẽ */
() => {
  const q = Q(2, 'Đếm số hình chữ nhật có trong hình vẽ dưới đây.');
  const p = pick(b19advPairs), v = p[0], h = p[1];
  const cot = (v + 1) * (v + 2) / 2, hang = (h + 1) * (h + 2) / 2;
  const nho = (v + 1) * (h + 1), tong = cot * hang;
  return q.done(b19advGrid(v, h)
    + `<div class="fill-line">Hình vẽ được chia thành ${q.num(nho, 2)} hình chữ nhật nhỏ nhất.</div>
       <div class="fill-line">Ghép các hình nhỏ lại, hình vẽ có tất cả ${q.num(tong, 2)} hình chữ nhật.</div>
       <div class="hint-line">Đếm lần lượt: hình ghép từ 1 ô, từ 2 ô, từ 3 ô, … rồi cộng lại.</div>`,
    `Theo chiều ngang chọn được ${cot} đoạn, theo chiều dọc chọn được ${hang} đoạn, `
    + `nên có ${cot} × ${hang} = ${tong} (hình chữ nhật).`);
},

/* 3. Hình chữ nhật có chiều dài gấp một số lần chiều rộng */
() => {
  const q = Q(3, '');
  const r = R(2, 6), k = R(2, 4), d = k * r;
  return q.done(`<p class="wordq">Một mảnh vườn hình chữ nhật có chiều rộng ${r} m,
      chiều dài gấp ${k} lần chiều rộng.</p>
    <div class="fill-line">Chiều dài mảnh vườn là ${q.num(d, 2)} m.</div>
    <div class="fill-line">Chiều dài hơn chiều rộng ${q.num(d - r, 2)} m.</div>
    <div class="fill-line">Tổng độ dài bốn cạnh của mảnh vườn là ${q.num(2 * (d + r), 2)} m.</div>`,
    `${r} × ${k} = ${d} (m);  ${d} − ${r} = ${d - r} (m);  `
    + `${d} + ${r} + ${d} + ${r} = ${2 * (d + r)} (m).`);
},

/* 4. Cắt tấm bìa hình chữ nhật thành các hình vuông — bài toán ngược */
() => {
  const q = Q(4, '');
  const r = R(2, 5), k = R(3, 6), L = k * r;
  return q.done(b19advCut(k)
    + `<p class="wordq">Một tấm bìa hình chữ nhật có chiều dài ${L} cm và chiều rộng ${r} cm.
        Bác thợ cắt tấm bìa đó thành các hình vuông có cạnh ${r} cm (như hình vẽ).</p>
       <div class="fill-line">Bác thợ cắt được ${q.num(k, 1)} hình vuông.</div>
       <div class="fill-line">Tổng độ dài bốn cạnh của mỗi hình vuông đó là ${q.num(4 * r, 2)} cm.</div>
       <div class="fill-line">Tổng độ dài bốn cạnh của tấm bìa lúc đầu là ${q.num(2 * (L + r), 2)} cm.</div>`,
    `${L} : ${r} = ${k} (hình vuông);  ${r} + ${r} + ${r} + ${r} = ${4 * r} (cm);  `
    + `${L} + ${r} + ${L} + ${r} = ${2 * (L + r)} (cm).`);
},

/* 5. Quy luật xếp hình vuông bằng que tính */
() => {
  const q = Q(5, 'Quan sát hình xếp bằng que tính dưới đây rồi trả lời.');
  const p = R(2, 4), n = p + R(2, 4), m = R(7, 9), tong = 3 * m + 1;
  return q.done(b19advStick(p)
    + `<div class="fill-line">Xếp 1 hình vuông cần ${q.num(4, 1)} que tính.</div>
       <div class="fill-line">Xếp ${p} hình vuông liền nhau như hình trên cần ${q.num(3 * p + 1, 2)} que tính.</div>
       <div class="fill-line">Cứ thêm một hình vuông thì cần thêm ${q.num(3, 1)} que tính.</div>
       <div class="fill-line">Xếp ${n} hình vuông liền nhau như vậy cần ${q.num(3 * n + 1, 2)} que tính.</div>
       <div class="fill-line">Với ${tong} que tính thì xếp được ${q.num(m, 2)} hình vuông liền nhau.</div>`,
    `Xếp ${p} hình vuông: 4 + 3 × ${p - 1} = ${3 * p + 1} (que).  `
    + `Xếp ${n} hình vuông: 4 + 3 × ${n - 1} = ${3 * n + 1} (que).  `
    + `Ngược lại: ${tong} − 1 = ${3 * m}; ${3 * m} : 3 = ${m} (hình vuông).`);
},

/* 6. So sánh hai vế */
() => {
  const q = Q(6, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(2, 8), b = R(2, 6);
    rows.push({t:`Số cạnh của ${a} hình tam giác`, p:`Số cạnh của ${b} hình tứ giác`, l:3 * a, r:4 * b});
  }
  {
    const a = R(2, 6), b = a + pick([-1, 0, 0, 1]);
    rows.push({t:`Số đỉnh của ${a} hình tứ giác`, p:`Số đỉnh của ${b} hình chữ nhật`, l:4 * a, r:4 * b});
  }
  {
    const d = R(4, 9), wr = R(2, d - 1), nua = d + wr;
    const s = (nua % 2 === 0 && R(1, 3) === 1) ? nua / 2 : R(3, 9);
    rows.push({t:`Tổng độ dài bốn cạnh của hình vuông cạnh ${s} cm`,
      p:`Tổng độ dài bốn cạnh của hình chữ nhật có chiều dài ${d} cm, chiều rộng ${wr} cm`,
      l:4 * s, r:2 * nua});
  }
  {
    const a = R(2, 9), b = R(2, 9);
    rows.push({t:`Số góc vuông của ${a} hình chữ nhật`, p:`4 × ${b}`, l:4 * a, r:4 * b});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Hình tam giác có 3 cạnh, 3 đỉnh; hình tứ giác, hình chữ nhật, hình vuông có 4 cạnh,
      4 đỉnh và hình chữ nhật, hình vuông có 4 góc vuông · Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},
];
