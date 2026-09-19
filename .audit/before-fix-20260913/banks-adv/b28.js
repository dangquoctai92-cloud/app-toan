/*CSS
.b28adv-path{width:100%;max-width:350px;height:auto;display:block;margin:6px auto}
.b28adv-way{display:block;background:#fff7e8;border:2px solid #e8cd94;border-radius:10px;
  padding:6px 12px;margin:6px auto;max-width:420px;font-size:16px;font-weight:600;color:#6b4d12}
.b28adv-way em{font-style:normal;color:#d63384;margin-right:8px}
CSS*/

/* ===== NÂNG CAO — Bài 28: Bài toán giải bằng hai bước tính ===== */

/* đường gấp khúc ABCD, chỉ ghi số đo đoạn AB, hai đoạn còn lại để dấu "?" */
const b28advPath4 = ab => `<svg viewBox="-14 -14 380 162" class="b28adv-path">
  <path d="M18 14L96 116H268L344 26" fill="none" stroke="#2b2b2b" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="18" cy="14" r="4"/><circle cx="96" cy="116" r="4"/>
  <circle cx="268" cy="116" r="4"/><circle cx="344" cy="26" r="4"/>
  <text x="2" y="8" font-size="17" font-weight="700">A</text>
  <text x="88" y="138" font-size="17" font-weight="700">B</text>
  <text x="260" y="138" font-size="17" font-weight="700">C</text>
  <text x="336" y="16" font-size="17" font-weight="700">D</text>
  <text x="26" y="76" font-size="15">${ab} cm</text>
  <text x="182" y="106" text-anchor="middle" font-size="15">? cm</text>
  <text x="316" y="80" font-size="15">? cm</text>
</svg>`;

ADV.b28 = [

/* 1. Bài toán ba bước: gấp một số lần rồi ít hơn */
() => {
  const q = Q(1, '');
  const a = R(5, 15), n = R(2, 3);
  const t2 = a * n, d = R(2, t2 - 2), t3 = t2 - d;
  return q.done(`<p class="wordq">Thùng thứ nhất đựng ${a} <i>l</i> dầu. Thùng thứ hai đựng số lít dầu
      gấp ${n} lần thùng thứ nhất. Thùng thứ ba đựng ít hơn thùng thứ hai ${d} <i>l</i> dầu.
      Hỏi cả ba thùng đựng bao nhiêu lít dầu?</p>
    <div class="fill-line">Thùng thứ hai đựng ${q.num(t2)} <i>l</i> dầu.</div>
    <div class="fill-line">Thùng thứ ba đựng ${q.num(t3)} <i>l</i> dầu.</div>
    <div class="fill-line">Cả ba thùng đựng ${q.num(a + t2 + t3)} <i>l</i> dầu.</div>`,
    `${a} × ${n} = ${t2} (l);  ${t2} − ${d} = ${t3} (l);  `
    + `${a} + ${t2} + ${t3} = ${a + t2 + t3} (l).`);
},

/* 2. Bài toán ngược: biết số còn lại, tìm số lúc đầu */
() => {
  const q = Q(2, '');
  const a = R(15, 40), b = R(5, 20), c = R(20, 60);
  const chieu = a + b, hai = a + chieu, dau = hai + c;
  return q.done(`<p class="wordq">Một cửa hàng có một số ki-lô-gam gạo. Buổi sáng cửa hàng bán được ${a} kg gạo,
      buổi chiều bán được nhiều hơn buổi sáng ${b} kg gạo. Sau hai buổi, cửa hàng còn lại ${c} kg gạo.
      Hỏi lúc đầu cửa hàng có bao nhiêu ki-lô-gam gạo?</p>
    <div class="fill-line">Buổi chiều cửa hàng bán được ${q.num(chieu)} kg gạo.</div>
    <div class="fill-line">Cả hai buổi cửa hàng bán được ${q.num(hai)} kg gạo.</div>
    <div class="fill-line">Lúc đầu cửa hàng có ${q.num(dau)} kg gạo.</div>`,
    `${a} + ${b} = ${chieu} (kg);  ${a} + ${chieu} = ${hai} (kg);  ${hai} + ${c} = ${dau} (kg).`);
},

/* 3. Đường gấp khúc ABCD với ba đoạn */
() => {
  const ab = R(4, 12), n = R(2, 3);
  const bc = ab * n, d = R(2, bc - 2), cd = bc - d;
  const q = Q(3, `Đường gấp khúc ABCD có đoạn AB dài ${ab} cm, đoạn BC dài gấp ${n} lần đoạn AB,
    đoạn CD ngắn hơn đoạn BC ${d} cm. Tính độ dài đường gấp khúc ABCD.`);
  return q.done(b28advPath4(ab) +
    `<div class="fill-line">Đoạn BC dài ${q.num(bc)} cm.</div>
     <div class="fill-line">Đoạn CD dài ${q.num(cd)} cm.</div>
     <div class="fill-line">Đường gấp khúc ABCD dài ${q.num(ab + bc + cd)} cm.</div>`,
    `${ab} × ${n} = ${bc} (cm);  ${bc} − ${d} = ${cd} (cm);  `
    + `${ab} + ${bc} + ${cd} = ${ab + bc + cd} (cm).`);
},

/* 4. Bài toán ba bước: bớt rồi chia đều */
() => {
  const q = Q(4, '');
  const m = R(3, 9), k = R(2, 5), a = R(3, 12);
  const con = k * m, L = con + a;
  return q.done(`<p class="wordq">Một tấm vải dài ${L} m. Người ta cắt ra ${a} m vải để may áo,
      số vải còn lại được cắt thành ${k} mảnh dài bằng nhau.
      Hỏi mỗi mảnh vải đó dài bao nhiêu mét?</p>
    <div class="fill-line">Số vải còn lại sau khi may áo dài ${q.num(con)} m.</div>
    <div class="fill-line">Mỗi mảnh vải dài ${q.num(m)} m.</div>
    <div class="fill-line">Mỗi mảnh vải ngắn hơn tấm vải lúc đầu ${q.num(L - m)} m.</div>`,
    `${L} − ${a} = ${con} (m);  ${con} : ${k} = ${m} (m);  ${L} − ${m} = ${L - m} (m).`);
},

/* 5. Bài toán ba bước: nhân rồi chia đều */
() => {
  const q = Q(5, '');
  const p = R(5, 12), h = R(2, 4), tong = p * h;
  const ds = [];
  for (let x = 2; x <= 8; x++) if (tong % x === 0) ds.push(x);
  const n = ds.length ? pick(ds) : 2;
  return q.done(`<p class="wordq">Mỗi hộp bút chì màu có ${p} chiếc bút. Cô giáo mua ${h} hộp bút chì màu
      rồi chia đều số bút đó cho ${n} bạn. Hỏi mỗi bạn được bao nhiêu chiếc bút chì màu?</p>
    <div class="fill-line">Cô giáo mua tất cả ${q.num(tong)} chiếc bút chì màu.</div>
    <div class="fill-line">Mỗi bạn được ${q.num(tong / n)} chiếc bút chì màu.</div>
    <div class="fill-line">Nếu cô giáo mua thêm 1 hộp nữa thì cô có ${q.num(tong + p)} chiếc bút chì màu.</div>`,
    `${p} × ${h} = ${tong} (chiếc);  ${tong} : ${n} = ${tong / n} (chiếc);  `
    + `${tong} + ${p} = ${tong + p} (chiếc).`);
},

/* 6. Chọn cách giải đúng theo tóm tắt */
() => {
  const q = Q(6, 'Chọn cách giải đúng cho bài toán theo tóm tắt sau.');
  const a = R(12, 30), n = R(2, 4), b = a * n;
  const L = ['A', 'B', 'C', 'D'];
  const ways = [
    {ok:true,  s:`${a} × ${n} = ${b};  ${a} + ${b} = ${a + b}`},
    {ok:false, s:`${a} × ${n} = ${b};  ${b} − ${a} = ${b - a}`},
    {ok:false, s:`${a} + ${n} = ${a + n};  ${a} + ${a + n} = ${a + a + n}`},
    {ok:false, s:`${a} × ${n} = ${b};  ${b} × 2 = ${b * 2}`}
  ].sort(() => Math.random() - .5);
  const dung = ways.map((w, i) => w.ok ? L[i] : null).filter(Boolean).sort().join(',');
  return q.done(`<p class="wordq">Gà: ${a} con. Vịt: gấp ${n} lần số con gà. Cả gà và vịt: ? con</p>
    ${ways.map((w, i) => `<span class="b28adv-way"><em>${L[i]}.</em>${w.s}</span>`).join('')}
    <div class="fill-line">Cách giải đúng là: ${q.pick(dung, L)}</div>
    <div class="fill-line">Cả gà và vịt có ${q.num(a + b)} con.</div>`,
    `${a} × ${n} = ${b} (con);  ${a} + ${b} = ${a + b} (con).`);
},
];
