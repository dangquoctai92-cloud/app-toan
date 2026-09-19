/*CSS
.b77adv-eq{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-start;gap:2px 8px;
  font-size:18px;font-weight:800;color:#2b3a5a;margin:9px 0;text-align:left}
.b77adv-eq .qin{width:104px !important;height:34px;font-size:17px;padding:0 3px}
.b77adv-let{color:#d63384;font-weight:800;margin-right:4px}
.b77adv-step{margin-left:30px}
.b77adv-box{margin:8px 0;background:#eef7ff;border:2.5px solid #a8c8ee;border-radius:12px;padding:4px 12px}
.b77adv-note{margin:8px 0;background:#f3fbf3;border:2.5px solid #9ccf9c;border-radius:12px;padding:4px 12px}
.b77adv-cmp{margin:6px 0}
.b77adv-cmp .side{font-size:16px;font-weight:800;color:#2b3a5a;min-width:128px}
.b77adv-flow{margin:16px 0}
.b77adv-flow .fnode{min-width:104px;padding:0 6px;font-size:17px}
.b77adv-flow .qin{width:100px !important;height:36px;font-size:17px;padding:0 3px}
.b77adv-digits{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 10px;margin:10px 0}
.b77adv-digits > span{width:46px;height:46px;display:grid;place-items:center;border-radius:12px;
  background:#fff3d6;border:2.6px solid #e8b95c;font-size:24px;font-weight:800;color:#7a4a10}
.b77adv-line{font-size:17px;font-weight:700;line-height:2.2;text-align:left;margin:4px 0}
CSS*/

/* ===== NÂNG CAO — BÀI 77: ÔN TẬP PHÉP CỘNG, PHÉP TRỪ TRONG PHẠM VI 100 000 =====
   Mọi số liệu và kết quả đều nằm trong phạm vi 100 000, không có kết quả âm.
   Hàm phụ trợ riêng đặt tiền tố b77adv. */

/* viết số có nhóm ba chữ số cách nhau như SGK: 45 274 */
const b77advSP = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* mũi tên của sơ đồ tính */
const b77advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

/* lấy k chữ số khác nhau trong khoảng 1 … 9 */
const b77advDigits = k => {
  const ds = [];
  let g = 0;
  while (ds.length < k && g++ < 80){ const x = R(1, 9); if (ds.indexOf(x) < 0) ds.push(x); }
  return ds;
};

ADV.b77 = [

/* 1. Toán ngược: tìm số hạng, số bị trừ, số trừ chưa biết */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho dấu "?" trong mỗi phép tính sau.');
  const a1 = R(12000, 48000), b1 = R(11000, 39000), c1 = a1 + b1;
  const a2 = R(20000, 45000), b2 = R(12000, 40000), c2 = a2 + b2;
  const b3 = R(10000, 25000), a3 = R(40000, 99999), c3 = a3 - b3;
  const a4 = R(45000, 99999), b4 = R(12000, 30000), c4 = a4 - b4;
  const html = `<div class="b77adv-eq"><span class="b77adv-let">a)</span>
      ${q.num(a1)} <span class="op">+</span> ${b77advSP(b1)}
      <span class="op">=</span> ${b77advSP(c1)}</div>
    <div class="b77adv-eq"><span class="b77adv-let">b)</span>
      ${b77advSP(a2)} <span class="op">+</span> ${q.num(b2)}
      <span class="op">=</span> ${b77advSP(c2)}</div>
    <div class="b77adv-eq"><span class="b77adv-let">c)</span>
      ${q.num(a3)} <span class="op">&minus;</span> ${b77advSP(b3)}
      <span class="op">=</span> ${b77advSP(c3)}</div>
    <div class="b77adv-eq"><span class="b77adv-let">d)</span>
      ${b77advSP(a4)} <span class="op">&minus;</span> ${q.num(b4)}
      <span class="op">=</span> ${b77advSP(c4)}</div>
    <div class="hint-line">Muốn tìm một số hạng ta lấy tổng trừ đi số hạng kia. Muốn tìm số bị trừ
      ta lấy hiệu cộng với số trừ. Muốn tìm số trừ ta lấy số bị trừ trừ đi hiệu.</div>`;
  return q.done(html,
    `a) ${b77advSP(c1)} − ${b77advSP(b1)} = ${b77advSP(a1)}.  `
    + `b) ${b77advSP(c2)} − ${b77advSP(a2)} = ${b77advSP(b2)}.  `
    + `c) ${b77advSP(c3)} + ${b77advSP(b3)} = ${b77advSP(a3)}.  `
    + `d) ${b77advSP(a4)} − ${b77advSP(c4)} = ${b77advSP(b4)}.`);
},

/* 2. Tính giá trị của biểu thức có hai dấu ngoặc */
() => {
  const q = Q(2, 'Tính giá trị của biểu thức.');
  /* a) (a + b) − (c + d) */
  const a = R(10000, 25000), b = R(10000, 25000), c = R(2000, 7000), d = R(2000, 7000);
  const s1 = a + b, s2 = c + d, va = s1 - s2;
  /* b) m − (n − p) */
  const m = R(50000, 99999), n = R(20000, 40000), p = R(5000, 15000);
  const hb = n - p, vb = m - hb;
  /* c) (x − y) + (z − t) */
  const x = R(30000, 60000), y = R(10000, 25000), z = R(8000, 20000), t = R(1000, 7000);
  const h1 = x - y, h2 = z - t, vc = h1 + h2;
  const html = `<div class="b77adv-eq"><span class="b77adv-let">a)</span>
      (${b77advSP(a)} <span class="op">+</span> ${b77advSP(b)}) <span class="op">&minus;</span>
      (${b77advSP(c)} <span class="op">+</span> ${b77advSP(d)})</div>
    <div class="b77adv-eq b77adv-step"><span class="op">=</span> ${q.num(s1)}
      <span class="op">&minus;</span> ${q.num(s2)}</div>
    <div class="b77adv-eq b77adv-step"><span class="op">=</span> ${q.num(va)}</div>
    <div class="b77adv-eq"><span class="b77adv-let">b)</span>
      ${b77advSP(m)} <span class="op">&minus;</span> (${b77advSP(n)}
      <span class="op">&minus;</span> ${b77advSP(p)})</div>
    <div class="b77adv-eq b77adv-step"><span class="op">=</span> ${b77advSP(m)}
      <span class="op">&minus;</span> ${q.num(hb)}</div>
    <div class="b77adv-eq b77adv-step"><span class="op">=</span> ${q.num(vb)}</div>
    <div class="b77adv-eq"><span class="b77adv-let">c)</span>
      (${b77advSP(x)} <span class="op">&minus;</span> ${b77advSP(y)}) <span class="op">+</span>
      (${b77advSP(z)} <span class="op">&minus;</span> ${b77advSP(t)})</div>
    <div class="b77adv-eq b77adv-step"><span class="op">=</span> ${q.num(h1)}
      <span class="op">+</span> ${q.num(h2)}</div>
    <div class="b77adv-eq b77adv-step"><span class="op">=</span> ${q.num(vc)}</div>
    <div class="hint-line">Biểu thức có dấu ngoặc thì tính trong ngoặc trước.</div>`;
  return q.done(html,
    `a) ${b77advSP(a)} + ${b77advSP(b)} = ${b77advSP(s1)}; ${b77advSP(c)} + ${b77advSP(d)} = ${b77advSP(s2)}; `
    + `${b77advSP(s1)} − ${b77advSP(s2)} = ${b77advSP(va)}.  `
    + `b) ${b77advSP(n)} − ${b77advSP(p)} = ${b77advSP(hb)}; ${b77advSP(m)} − ${b77advSP(hb)} = ${b77advSP(vb)}.  `
    + `c) ${b77advSP(x)} − ${b77advSP(y)} = ${b77advSP(h1)}; ${b77advSP(z)} − ${b77advSP(t)} = ${b77advSP(h2)}; `
    + `${b77advSP(h1)} + ${b77advSP(h2)} = ${b77advSP(vc)}.`);
},

/* 3. So sánh giá trị của hai biểu thức */
() => {
  const q = Q(3, 'So sánh giá trị của hai biểu thức rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  /* hai dòng so sánh bằng cách tính giá trị */
  const a1 = R(12000, 38000), b1 = R(12000, 38000), c1 = R(12000, 38000), d1 = R(12000, 38000);
  rows.push({
    tr: `${b77advSP(a1)} + ${b77advSP(b1)}`, ph: `${b77advSP(c1)} + ${b77advSP(d1)}`,
    vt: a1 + b1, vp: c1 + d1
  });
  const a2 = R(45000, 99000), b2 = R(10000, 30000), c2 = R(45000, 99000), d2 = R(10000, 30000);
  rows.push({
    tr: `${b77advSP(a2)} &minus; ${b77advSP(b2)}`, ph: `${b77advSP(c2)} &minus; ${b77advSP(d2)}`,
    vt: a2 - b2, vp: c2 - d2
  });
  /* hai dòng dựa vào tính chất, không cần tính hết */
  const a3 = R(40000, 90000), b3 = R(8000, 20000), c3 = R(5000, 15000);
  rows.push({
    tr: `${b77advSP(a3)} &minus; (${b77advSP(b3)} + ${b77advSP(c3)})`,
    ph: `${b77advSP(a3)} &minus; ${b77advSP(b3)} &minus; ${b77advSP(c3)}`,
    vt: a3 - (b3 + c3), vp: a3 - b3 - c3
  });
  const a4 = R(50000, 95000), b4 = R(15000, 35000), c4 = R(2000, 9000);
  rows.push({
    tr: `${b77advSP(a4)} &minus; ${b77advSP(b4)}`,
    ph: `${b77advSP(a4)} &minus; (${b77advSP(b4)} &minus; ${b77advSP(c4)})`,
    vt: a4 - b4, vp: a4 - (b4 - c4)
  });
  const dau = r => r.vt > r.vp ? '>' : r.vt < r.vp ? '<' : '=';
  const html = `<div class="b77adv-cmp">${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.tr}</span>${q.sign(dau(r))}<span class="side">${r.ph}</span></div>`
    ).join('')}</div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; = . Ở hai dòng cuối em có thể suy luận
      mà không cần tính hết giá trị của hai biểu thức.</div>`;
  const doc = s => s.replace(/&minus;/g, '−');
  return q.done(html, rows.map((r, i) =>
    `Dòng ${i + 1}: ${doc(r.tr)} = ${b77advSP(r.vt)} và ${doc(r.ph)} = ${b77advSP(r.vp)}, `
    + `nên điền dấu ${dau(r)}.`).join('  '));
},

/* 4. Sơ đồ tính ngược: tìm số ban đầu */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const st1 = R(12000, 48000), p1 = R(3000, 9999), m1 = R(2000, 9999);
  const g1 = st1 + p1, k1 = g1 - m1;
  const st2 = R(45000, 89999), m2 = R(10000, 25000), p2 = R(4000, 9999);
  const g2 = st2 - m2, k2 = g2 + p2;
  const html = `<div class="flow b77adv-flow">
      <span class="fnode sq">${q.num(st1)}</span>
      ${b77advArrow('+ ' + b77advSP(p1))}
      <span class="fnode circle">${q.num(g1)}</span>
      ${b77advArrow('&minus; ' + b77advSP(m1))}
      <span class="fnode sq">${b77advSP(k1)}</span>
    </div>
    <div class="flow b77adv-flow">
      <span class="fnode sq">${q.num(st2)}</span>
      ${b77advArrow('&minus; ' + b77advSP(m2))}
      <span class="fnode circle">${q.num(g2)}</span>
      ${b77advArrow('+ ' + b77advSP(p2))}
      <span class="fnode sq">${b77advSP(k2)}</span>
    </div>
    <div class="hint-line">Em hãy tính ngược từ ô cuối cùng trở về: gặp dấu + thì làm phép trừ,
      gặp dấu &minus; thì làm phép cộng.</div>`;
  return q.done(html,
    `Sơ đồ 1: ${b77advSP(k1)} + ${b77advSP(m1)} = ${b77advSP(g1)}; `
    + `${b77advSP(g1)} − ${b77advSP(p1)} = ${b77advSP(st1)}. `
    + `Sơ đồ 2: ${b77advSP(k2)} − ${b77advSP(p2)} = ${b77advSP(g2)}; `
    + `${b77advSP(g2)} + ${b77advSP(m2)} = ${b77advSP(st2)}.`);
},

/* 5. Bài toán giải bằng ba bước tính */
() => {
  const q = Q(5, '');
  const t1 = R(15, 25) * 1000 + R(0, 9) * 100;
  const it = R(2, 6) * 1000 + R(0, 9) * 100;
  const t2 = t1 - it;
  const nh = R(1, 5) * 1000 + R(0, 9) * 100;
  const t3 = t2 + nh;
  const tong = t1 + t2 + t3;
  const html = `<p class="wordq">Tháng thứ nhất một nhà máy sản xuất được ${b77advSP(t1)} sản phẩm.
      Tháng thứ hai sản xuất được ít hơn tháng thứ nhất ${b77advSP(it)} sản phẩm. Tháng thứ ba sản
      xuất được nhiều hơn tháng thứ hai ${b77advSP(nh)} sản phẩm. Hỏi cả ba tháng nhà máy đó sản
      xuất được bao nhiêu sản phẩm?</p>
    <div class="bullet">Tháng thứ hai sản xuất được ${q.num(t2)} sản phẩm.</div>
    <div class="bullet">Tháng thứ ba sản xuất được ${q.num(t3)} sản phẩm.</div>
    <div class="bullet">Cả ba tháng nhà máy đó sản xuất được ${q.num(tong)} sản phẩm.</div>
    <div class="hint-line">Bài toán được giải bằng ba bước tính: tìm số sản phẩm của tháng thứ hai,
      rồi của tháng thứ ba, sau đó cộng cả ba tháng lại.</div>`;
  return q.done(html,
    `Tháng thứ hai: ${b77advSP(t1)} − ${b77advSP(it)} = ${b77advSP(t2)} (sản phẩm). `
    + `Tháng thứ ba: ${b77advSP(t2)} + ${b77advSP(nh)} = ${b77advSP(t3)} (sản phẩm). `
    + `Cả ba tháng: ${b77advSP(t1)} + ${b77advSP(t2)} + ${b77advSP(t3)} = ${b77advSP(tong)} (sản phẩm).`);
},

/* 6. Lập số có năm chữ số rồi tìm tổng, hiệu */
() => {
  const q = Q(6, 'Từ năm chữ số đã cho, hãy lập số lớn nhất và số bé nhất có năm chữ số '
    + '(mỗi chữ số chỉ được dùng một lần).');
  const ds = b77advDigits(5);
  const lon = +[...ds].sort((x, y) => y - x).join('');
  const be = +[...ds].sort((x, y) => x - y).join('');
  const hieu = lon - be;
  const html = `<div class="b77adv-digits">${ds.map(x => `<span>${x}</span>`).join('')}</div>
    <div class="b77adv-line"><span class="b77adv-let">a)</span>Số lớn nhất lập được là
      ${q.num(lon)}<span></span>.</div>
    <div class="b77adv-line"><span class="b77adv-let">b)</span>Số bé nhất lập được là
      ${q.num(be)}<span></span>.</div>
    <div class="b77adv-line"><span class="b77adv-let">c)</span>Số lớn nhất hơn số bé nhất
      ${q.num(hieu)} đơn vị.</div>
    <div class="hint-line">Muốn được số lớn nhất em xếp các chữ số theo thứ tự từ lớn đến bé,
      muốn được số bé nhất em xếp các chữ số theo thứ tự từ bé đến lớn.</div>`;
  return q.done(html,
    `Số lớn nhất là ${b77advSP(lon)}, số bé nhất là ${b77advSP(be)}. `
    + `Hiệu: ${b77advSP(lon)} − ${b77advSP(be)} = ${b77advSP(hieu)}.`);
},
];
