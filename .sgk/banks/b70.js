/* ==================== BÀI 70: NHÂN SỐ CÓ NĂM CHỮ SỐ VỚI SỐ CÓ MỘT CHỮ SỐ
   (SGK tập 2 – tr.94, 95, 96)
   hoạt động tr.94  : bài 1 (Tính – ba phép nhân đặt sẵn theo cột),
                      bài 2 (Đặt tính rồi tính),
                      bài 3 (mỗi lần chuyển ... kg thóc vào kho)
   luyện tập tr.95  : bài 1 (Số ? – bảng Thừa số, Thừa số, Tích),
                      bài 2 (Đặt tính rồi tính),
                      bài 3 (Tính nhẩm theo mẫu),
                      bài 4 (ba kho chứa dầu)
   luyện tập tr.96  : bài 1 (Số ? – sơ đồ hai lần nhân),
                      bài 2 (a: Đặt tính rồi tính, b: Tính giá trị của biểu thức),
                      bài 3 (Việt mua vở, cô bán hàng trả lại bao nhiêu tiền),
                      bài 4 (hai trại ươm cây giống)
   Mọi tích đều nằm trong phạm vi 100 000 đúng như chủ đề 14.
========================================================================================= */

/* viết số theo kiểu sách: 47 253 */
const SP70 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* số có năm chữ số sao cho tích với b vẫn bé hơn 100 000 */
const NUM70 = b => R(10000, Math.floor(99999 / b));

/* số tròn nghìn có năm chữ số sao cho tích với b vẫn bé hơn 100 000 */
const NGHIN70 = b => R(10, Math.floor(99 / b)) * 1000;

/* khung phép nhân dạng cột */
ART.b70Mul = (a, b, res) => `<div class="vcalc"><span class="vop">×</span>
  <span class="vnums"><b>${SP70(a)}</b><b>${b}</b></span><i class="vbar"></i>
  <span class="vres">${res}</span></div>`;

/* bồn chứa dầu */
ART.b70Tank = () => `<svg viewBox="0 0 70 90">
  <ellipse cx="35" cy="18" rx="30" ry="10" fill="#dfe8f0" stroke="#5b7f9e" stroke-width="2.4"/>
  <path d="M5 18v54a30 10 0 0 0 60 0V18" fill="#eef4f9" stroke="#5b7f9e" stroke-width="2.4"/>
  <ellipse cx="35" cy="72" rx="30" ry="10" fill="none" stroke="#5b7f9e" stroke-width="2.4"/>
  <path d="M14 26v46M56 26v46" stroke="#a9c0d4" stroke-width="2"/>
  <path d="M35 24v50" stroke="#f0a027" stroke-width="2.6"/>
  <path d="M27 34h16M27 46h16M27 58h16" stroke="#f0a027" stroke-width="2"/>
</svg>`;

/* quyển vở */
ART.b70Vo = col => `<svg viewBox="0 0 34 46">
  <rect x="4" y="3" width="26" height="40" rx="3" fill="${col}" stroke="#3b4453" stroke-width="2"/>
  <rect x="4" y="3" width="7" height="40" fill="#fff" opacity=".55"/>
  <path d="M15 12h11M15 20h11M15 28h11" stroke="#fff" stroke-width="1.8" opacity=".9"/>
</svg>`;

/* cây giống trong bầu ươm */
ART.b70Cay = () => `<svg viewBox="0 0 38 48">
  <path d="M9 30h20l-3 16H12z" fill="#a97a4a" stroke="#7a5228" stroke-width="2"/>
  <path d="M19 30V14" stroke="#4e8a34" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M19 20q-10-2-12-10 10-1 12 10z" fill="#5fbb46" stroke="#3a7a26" stroke-width="1.6"/>
  <path d="M19 24q10-2 12-10-10-1-12 10z" fill="#7ecb56" stroke="#3a7a26" stroke-width="1.6"/>
</svg>`;

/* bao thóc */
ART.b70Bao = () => `<svg viewBox="0 0 56 66">
  <path d="M14 18h28q8 10 8 24t-8 20H14q-8-6-8-20t8-24z" fill="#e8c579" stroke="#a9822f" stroke-width="2.4"/>
  <path d="M14 18q6-8 14-8t14 8" fill="#f2dca8" stroke="#a9822f" stroke-width="2.4"/>
  <path d="M16 40h24" stroke="#a9822f" stroke-width="2"/>
  <circle cx="28" cy="50" r="6" fill="#f2dca8" stroke="#a9822f" stroke-width="1.8"/>
</svg>`;

BANKS.b70 = [

/* ===== tr.94 – Hoạt động, Bài 1: Tính ===== */
() => {
  const q = Q(1, 'Tính.');
  const items = [0, 1, 2].map(() => { const b = R(2, 9), a = NUM70(b); return {a, b, r: a * b}; });
  const html = `<div class="b70-row">${items.map(it =>
    ART.b70Mul(it.a, it.b, q.num(it.r))).join('')}</div>`;
  return q.done(html,
    items.map(it => `${SP70(it.a)} × ${it.b} = ${SP70(it.r)}`).join(';  '));
},

/* ===== tr.94 – Hoạt động, Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const items = [0, 1].map(() => { const b = R(2, 9), a = NUM70(b); return {a, b, r: a * b}; });
  const html = `<div class="b70-eqs">${items.map(it =>
      `<span>${SP70(it.a)} × ${it.b}</span>`).join('')}</div>
    <div class="b70-row">${items.map(it => ART.b70Mul(it.a, it.b, q.num(it.r))).join('')}</div>`;
  return q.done(html,
    items.map(it => `${SP70(it.a)} × ${it.b} = ${SP70(it.r)}`).join(';  '));
},

/* ===== tr.94 – Hoạt động, Bài 3: chuyển thóc vào kho ===== */
() => {
  const q = Q(3, '');
  const lan = R(2, 6);
  const moiLan = R(1000, Math.floor(9999 / lan)) * 10;
  const tong = moiLan * lan;
  const html = `<p class="wordq">Mỗi lần người ta chuyển ${SP70(moiLan)} kg thóc vào kho.
      Hỏi sau ${lan} lần chuyển như vậy, người ta chuyển được bao nhiêu ki-lô-gam thóc vào kho?</p>
    <div class="b70-art b70-bao">${Array.from({length: lan}, ART.b70Bao).join('')}</div>
    <div class="bullet">Sau ${lan} lần chuyển, người ta chuyển được ${q.num(tong)} kg thóc vào kho.</div>`;
  return q.done(html,
    `${SP70(moiLan)} × ${lan} = ${SP70(tong)} (kg)`);
},

/* ===== tr.95 – Luyện tập 1, Bài 1: Số ? (bảng thừa số – tích) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const cols = [0, 1, 2].map(() => { const b = R(2, 9), a = NUM70(b); return {a, b, r: a * b}; });
  const html = `<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Thừa số</th>${cols.map(c => `<td>${SP70(c.a)}</td>`).join('')}</tr>
      <tr><th>Thừa số</th>${cols.map(c => `<td>${c.b}</td>`).join('')}</tr>
      <tr><th>Tích</th><td>${SP70(cols[0].r)}</td>
        <td>${q.num(cols[1].r)}</td><td>${q.num(cols[2].r)}</td></tr>
    </table></div>`;
  return q.done(html,
    `Tích bằng thừa số nhân thừa số: ${SP70(cols[1].a)} × ${cols[1].b} = ${SP70(cols[1].r)};  `
    + `${SP70(cols[2].a)} × ${cols[2].b} = ${SP70(cols[2].r)}`);
},

/* ===== tr.95 – Luyện tập 1, Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const items = [0, 1, 2].map(() => { const b = R(5, 9), a = NUM70(b); return {a, b, r: a * b}; });
  const html = `<div class="b70-eqs">${items.map(it =>
      `<span>${SP70(it.a)} × ${it.b}</span>`).join('')}</div>
    <div class="b70-row">${items.map(it => ART.b70Mul(it.a, it.b, q.num(it.r))).join('')}</div>`;
  return q.done(html,
    items.map(it => `${SP70(it.a)} × ${it.b} = ${SP70(it.r)}`).join(';  '));
},

/* ===== tr.95 – Luyện tập 1, Bài 3: Tính nhẩm (theo mẫu) ===== */
() => {
  const q = Q(3, 'Tính nhẩm (theo mẫu).');
  const bm = R(2, 8), am = NGHIN70(bm);
  const items = [0, 1, 2].map(() => { const b = R(2, 9), a = NGHIN70(b); return {a, b, r: a * b}; });
  const L = ['a)', 'b)', 'c)'];
  const html = noteBox(`<div class="b70-nham">Mẫu: ${SP70(am)} × ${bm} = ?<br>
      Nhẩm: ${am / 1000} nghìn × ${bm} = ${am / 1000 * bm} nghìn<br>
      ${SP70(am)} × ${bm} = ${SP70(am * bm)}</div>`)
    + '<div class="eq-list">' + items.map((it, i) =>
      `<div class="eq"><span class="b70-lbl">${L[i]}</span>${SP70(it.a)}
        <span class="op">×</span> ${it.b} <span class="op">=</span> ${q.num(it.r)}</div>`).join('')
    + '</div>';
  return q.done(html,
    items.map((it, i) => `${L[i]} ${it.a / 1000} nghìn × ${it.b} = ${it.r / 1000} nghìn `
      + `nên ${SP70(it.a)} × ${it.b} = ${SP70(it.r)}`).join(';  '));
},

/* ===== tr.95 – Luyện tập 1, Bài 4: ba kho chứa dầu ===== */
() => {
  const q = Q(4, '');
  const moiKho = R(10, 33) * 1000;
  const tong = moiKho * 3;
  const chuyen = R(1, Math.floor((tong - 1000) / 1000)) * 1000;
  const conLai = tong - chuyen;
  const html = `<p class="wordq">Có ba kho chứa dầu, mỗi kho chứa ${SP70(moiKho)} <i>l</i>.
      Người ta đã chuyển đi ${SP70(chuyen)} <i>l</i> dầu.
      Hỏi ba kho đó còn lại bao nhiêu lít dầu?</p>
    <div class="b70-art b70-tank">${ART.b70Tank()}${ART.b70Tank()}${ART.b70Tank()}</div>
    <div class="bullet">Ba kho chứa tất cả ${q.num(tong)} <i>l</i> dầu.</div>
    <div class="bullet">Ba kho đó còn lại ${q.num(conLai)} <i>l</i> dầu.</div>`;
  return q.done(html,
    `${SP70(moiKho)} × 3 = ${SP70(tong)} (l);  ${SP70(tong)} − ${SP70(chuyen)} = ${SP70(conLai)} (l)`);
},

/* ===== tr.96 – Luyện tập 2, Bài 1: Số ? (sơ đồ hai lần nhân) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const CAP = [[2, 3], [3, 2], [2, 4], [4, 2], [2, 2], [3, 3]];
  const c = pick(CAP), p = c[0], k = c[1];
  const N = R(10, Math.floor(99 / (p * k))) * 1000;
  const day = (x, y) => `<div class="b70-flow">
      <div class="b70-node">${SP70(N)}</div>
      <div class="b70-ar"><i>&rarr;</i>× ${x}</div>
      <div class="b70-node q">${q.num(N * x)}</div>
      <div class="b70-ar"><i>&rarr;</i>× ${y}</div>
      <div class="b70-node q">${q.num(N * x * y)}</div>
    </div>`;
  const html = `<div class="b70-sub"><span class="b70-lbl">a)</span></div>${day(p, k)}
    <div class="b70-sub"><span class="b70-lbl">b)</span></div>${day(k, p)}`;
  return q.done(html,
    `a) ${SP70(N)} × ${p} = ${SP70(N * p)};  ${SP70(N * p)} × ${k} = ${SP70(N * p * k)}. `
    + `b) ${SP70(N)} × ${k} = ${SP70(N * k)};  ${SP70(N * k)} × ${p} = ${SP70(N * k * p)}.`);
},

/* ===== tr.96 – Luyện tập 2, Bài 2: Đặt tính rồi tính · Tính giá trị của biểu thức ===== */
() => {
  const q = Q(2, '');
  const items = [0, 1].map(() => { const b = R(2, 9), a = NUM70(b); return {a, b, r: a * b}; });
  const k = R(2, 8);
  const B = R(10000, Math.floor(89999 / k));
  const A = R(10000, 99999 - B * k);
  const html = `<div class="b70-sub"><span class="b70-lbl">a)</span>Đặt tính rồi tính.</div>
    <div class="b70-eqs">${items.map(it => `<span>${SP70(it.a)} × ${it.b}</span>`).join('')}</div>
    <div class="b70-row">${items.map(it => ART.b70Mul(it.a, it.b, q.num(it.r))).join('')}</div>
    <div class="b70-sub"><span class="b70-lbl">b)</span>Tính giá trị của biểu thức.</div>
    <div class="eq-list"><div class="eq">${SP70(A)} <span class="op">+</span> ${SP70(B)}
      <span class="op">×</span> ${k} <span class="op">=</span> ${q.num(A + B * k)}</div></div>`;
  return q.done(html,
    items.map(it => `${SP70(it.a)} × ${it.b} = ${SP70(it.r)}`).join(';  ')
    + `.  Trong biểu thức có phép nhân thì làm phép nhân trước: `
    + `${SP70(B)} × ${k} = ${SP70(B * k)}; ${SP70(A)} + ${SP70(B * k)} = ${SP70(A + B * k)}.`);
},

/* ===== tr.96 – Luyện tập 2, Bài 3: Việt mua vở ===== */
() => {
  const q = Q(3, '');
  const gia = pick([5000, 6000, 7000, 8000, 9000, 10000]);
  const soVo = R(4, Math.min(12, Math.floor(99000 / gia)));
  const tien = gia * soVo;
  const traLai = 100000 - tien;
  const COL = ['#e8552f', '#4a90c4', '#5fbb46', '#f0a027', '#a46a8c', '#4aa8dd'];
  const html = `<p class="wordq">Việt mua ${soVo} quyển vở, mỗi quyển giá ${SP70(gia)} đồng.
      Việt đưa cô bán hàng tờ 100 000 đồng.
      Hỏi cô bán hàng trả lại cho Việt bao nhiêu tiền?</p>
    <div class="b70-art b70-vo">${Array.from({length: soVo},
      (_, i) => ART.b70Vo(COL[i % COL.length])).join('')}</div>
    <div class="bullet">Việt mua vở hết ${q.num(tien)} đồng.</div>
    <div class="bullet">Cô bán hàng trả lại cho Việt ${q.num(traLai)} đồng.</div>`;
  return q.done(html,
    `${SP70(gia)} × ${soVo} = ${SP70(tien)} (đồng);  `
    + `100 000 − ${SP70(tien)} = ${SP70(traLai)} (đồng)`);
},

/* ===== tr.96 – Luyện tập 2, Bài 4: hai trại ươm cây giống ===== */
() => {
  const q = Q(4, '');
  const moiVuon = R(10, 40) * 1000;
  const hai = moiVuon * 2;
  const traiKhac = R(10, Math.floor((99000 - hai) / 1000)) * 1000;
  const tong = hai + traiKhac;
  const html = `<p class="wordq">Trong một trại ươm cây giống có hai vườn ươm, mỗi vườn có
      ${SP70(moiVuon)} cây giống. Trong một trại ươm khác có ${SP70(traiKhac)} cây giống.
      Hỏi cả hai trại ươm đó có bao nhiêu cây giống?</p>
    <div class="b70-art b70-cay">
      <div class="b70-grp"><div class="in">${ART.b70Cay()}${ART.b70Cay()}</div>
        <div class="b70-cap">Trại thứ nhất: hai vườn ươm</div></div>
      <div class="b70-grp"><div class="in">${ART.b70Cay()}</div>
        <div class="b70-cap">Trại thứ hai</div></div></div>
    <div class="bullet">Trại ươm thứ nhất có ${q.num(hai)} cây giống.</div>
    <div class="bullet">Cả hai trại ươm có ${q.num(tong)} cây giống.</div>`;
  return q.done(html,
    `${SP70(moiVuon)} × 2 = ${SP70(hai)} (cây);  `
    + `${SP70(hai)} + ${SP70(traiKhac)} = ${SP70(tong)} (cây)`);
},
];
