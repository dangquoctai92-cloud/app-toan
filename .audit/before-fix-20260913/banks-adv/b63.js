/*CSS
.b63adv-let{color:#d63384;font-weight:800;margin-right:6px}
.b63adv-seq{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:8px 0}
.b63adv-node{background:#d9f0e2;border:2.5px solid #6fbf95;border-radius:11px;padding:6px 10px;
  font-size:18px;font-weight:800;color:#155c3a;white-space:nowrap}
.b63adv-node.q{background:#fff5d6;border-color:#e8c05a}
.b63adv-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b63adv-card{min-width:96px;border:3px solid #7fb4e0;border-radius:10px;background:#eef6ff;
  padding:5px 8px;text-align:center}
.b63adv-card b{display:block;font-size:15px;color:#1c5a8f}
.b63adv-card span{display:block;font-size:21px;font-weight:800;color:#123f66}
.b63adv-eq{margin:7px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#f3eeff;
  border:2.5px solid #c3b4ea;border-radius:12px;padding:8px 12px;display:flex;flex-wrap:wrap;
  align-items:center;gap:6px}
CSS*/

/* ===== NÂNG CAO — Bài 63: Phép cộng trong phạm vi 100 000 ===== */

/* viết số theo kiểu sách: 36 175 */
const b63advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b63advLen = v => String(v).length;

/* dãy số dạng các ô nối tiếp nhau */
const b63advSeq = items => `<div class="b63adv-seq">${items.map(x =>
  `<span class="b63adv-node${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

/* năm số khác nhau, trong đó CHỈ CÓ MỘT cặp có tổng bằng S */
const b63advBoSo = () => {
  for (let g = 0; g < 200; g++){
    const vs = [];
    for (let t = 0; t < 40 && vs.length < 5; t++){
      const v = R(11, 45) * 1000 + R(0, 9) * 100;
      if (!vs.includes(v)) vs.push(v);
    }
    if (vs.length < 5) continue;
    const S = vs[0] + vs[1];
    let dem = 0;
    for (let i = 0; i < 5; i++)
      for (let j = i + 1; j < 5; j++) if (vs[i] + vs[j] === S) dem++;
    if (dem !== 1) continue;
    if (Math.max(...vs) + Math.min(...vs) === S) continue;   /* tránh trùng với câu b) */
    const cap = [vs[0], vs[1]];
    const tron = vs.slice().sort(() => Math.random() - .5);
    return {vs: tron, S, cap};
  }
  return {vs: [31000, 12000, 44000, 23000, 15000], S: 35000, cap: [12000, 23000]};
};

ADV.b63 = [

/* 1. Toán ngược — tìm số hạng chưa biết trong phạm vi 100 000 */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho dấu ?');
  const sp = b63advSp;
  const a1 = R(12, 45) * 1000 + R(0, 999), b1 = R(11, 40) * 1000 + R(0, 999);
  const a2 = R(20, 55) * 1000 + R(0, 999), b2 = R(10, 30) * 1000 + R(0, 999);
  const a3 = R(15, 40) * 1000 + R(0, 99) * 10, b3 = R(20, 50) * 1000 + R(0, 99) * 10;
  const m = R(11, 25) * 1000, n = R(3, 9) * 1000 + R(0, 999);
  const x = R(10, 30) * 1000 + R(0, 999), K = x + m + n;
  return q.done(`<div class="eq-list">
      <div class="eq"><span class="b63adv-let">a)</span>${sp(a1)} <span class="op">+</span>
        ${q.num(b1, 5)} <span class="op">=</span> ${sp(a1 + b1)}</div>
      <div class="eq"><span class="b63adv-let">b)</span>${q.num(a2, 5)} <span class="op">+</span>
        ${sp(b2)} <span class="op">=</span> ${sp(a2 + b2)}</div>
      <div class="eq"><span class="b63adv-let">c)</span>${sp(a3)} <span class="op">+</span>
        ${q.num(b3, 5)} <span class="op">=</span> ${sp(a3 + b3)}</div>
    </div>
    <div class="fill-line">d) Một số cộng với ${sp(m)}, được bao nhiêu lại cộng tiếp với ${sp(n)}
      thì được ${sp(K)}. Số đó là ${q.num(x, b63advLen(x))}</div>
    <div class="hint-line">Muốn tìm một số hạng chưa biết, ta lấy tổng trừ đi số hạng kia.
      Ở câu d) em hãy làm ngược lại: trừ dần từ kết quả cuối cùng.</div>`,
    `a) ${sp(a1 + b1)} − ${sp(a1)} = ${sp(b1)}.  b) ${sp(a2 + b2)} − ${sp(b2)} = ${sp(a2)}.  `
    + `c) ${sp(a3 + b3)} − ${sp(a3)} = ${sp(b3)}.  `
    + `d) ${sp(K)} − ${sp(n)} = ${sp(K - n)}; ${sp(K - n)} − ${sp(m)} = ${sp(x)}.`);
},

/* 2. Tìm số theo nhiều điều kiện rồi cộng */
() => {
  const q = Q(2, 'Đọc kĩ các điều kiện rồi tìm số thích hợp.');
  const sp = b63advSp;
  const cn = R(1, 2), ng = R(0, 9), tr = R(0, 9), ch = R(0, 9), dv = R(0, 9);
  const n1 = cn * 10000 + ng * 1000 + tr * 100 + ch * 10 + dv;
  const S = cn + ng + tr + ch + dv;
  const k = R(11, 25) * 1000;
  const n2 = n1 + k, tong = n1 + n2;
  return q.done(`<div class="bullet">Số thứ nhất là số có năm chữ số.</div>
    <div class="bullet">Chữ số hàng chục nghìn của số thứ nhất là ${cn}, chữ số hàng nghìn
      là ${ng}, chữ số hàng trăm là ${tr}, chữ số hàng chục là ${ch}.</div>
    <div class="bullet">Tổng năm chữ số của số thứ nhất bằng ${S}.</div>
    <div class="bullet">Số thứ hai lớn hơn số thứ nhất ${sp(k)} đơn vị.</div>
    <div class="fill-line">Số thứ nhất là ${q.num(n1, 5)}</div>
    <div class="fill-line">Số thứ hai là ${q.num(n2, b63advLen(n2))}</div>
    <div class="fill-line">Tổng của hai số đó là ${q.num(tong, b63advLen(tong))}</div>
    <div class="hint-line">Lấy tổng năm chữ số trừ đi bốn chữ số đã biết thì được
      chữ số hàng đơn vị.</div>`,
    `Chữ số hàng đơn vị = ${S} − ${cn} − ${ng} − ${tr} − ${ch} = ${dv}, nên số thứ nhất `
    + `là ${sp(n1)}.  Số thứ hai: ${sp(n1)} + ${sp(k)} = ${sp(n2)}.  `
    + `Tổng: ${sp(n1)} + ${sp(n2)} = ${sp(tong)}.`);
},

/* 3. Dãy số và quy luật */
() => {
  const q = Q(3, 'Viết tiếp ba số của mỗi dãy số sau.');
  const sp = b63advSp;
  /* a) dãy cách đều */
  const b = pick([1000, 2000, 5000, 100, 500]);
  const st = R(11, 30) * 1000 + R(0, 9) * 100;
  const A = i => st + i * b;
  /* b) mỗi số bằng tổng hai số liền trước */
  const t1 = R(1, 9) * 100, t2 = R(1, 9) * 100;
  const T = [t1, t2];
  for (let i = 2; i < 7; i++) T.push(T[i - 2] + T[i - 1]);
  const rowA = b63advSeq([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h: sp(A(i))} : {q: 1, h: q.num(A(i), b63advLen(A(i)))}));
  const rowB = b63advSeq([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h: sp(T[i])} : {q: 1, h: q.num(T[i], b63advLen(T[i]))}));
  return q.done(`<div class="sub-lbl">a) Dãy số cách đều.</div>${rowA}
    <div class="sub-lbl">b) Mỗi số, kể từ số thứ ba, bằng tổng của hai số đứng liền trước nó.</div>${rowB}
    <div class="hint-line">Ở câu a) hãy tìm xem mỗi số hơn số liền trước bao nhiêu đơn vị.</div>`,
    `a) Mỗi số hơn số liền trước ${sp(b)} đơn vị: ${[0,1,2,3,4,5,6].map(i => sp(A(i))).join(', ')}.  `
    + `b) ${sp(T[2])} = ${sp(T[0])} + ${sp(T[1])}; ... dãy số là `
    + `${T.map(v => sp(v)).join(', ')}.`);
},

/* 4. So sánh hai tổng mà không cần tính hết */
() => {
  const q = Q(4, 'So sánh rồi điền dấu thích hợp (&gt;, &lt;, =).');
  const sp = b63advSp;
  const A = R(21, 44) * 1000 + R(0, 999);
  const B = R(15, 38) * 1000 + R(0, 999);
  const d = R(1, 9) * 100 + R(1, 9) * 10;
  const C = B + (R(0, 1) ? d : -d);
  const k = R(1, 9) * 1000;
  const A2 = A + k, B2 = B - k;
  const E1 = R(12, 30) * 1000 + R(0, 999);
  const E2 = R(11, 28) * 1000 + R(0, 999);
  const E3 = R(10, 25) * 1000 + R(0, 999);
  const tongE = E1 + E2 + E3;
  const lech = pick([0, R(100, 900), -R(100, 900)]);
  const P = tongE + lech;
  const dau = (x, y) => x > y ? '>' : x < y ? '<' : '=';
  const rows = [
    {t: `${sp(A)} + ${sp(B)}`, p: `${sp(B)} + ${sp(A)}`, d: '='},
    {t: `${sp(A)} + ${sp(B)}`, p: `${sp(A)} + ${sp(C)}`, d: dau(B, C)},
    {t: `${sp(A)} + ${sp(B)}`, p: `${sp(A2)} + ${sp(B2)}`, d: '='},
    {t: `${sp(E1)} + ${sp(E2)} + ${sp(E3)}`, p: sp(P), d: dau(tongE, P)}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.t}</span>${q.sign(r.d)}<span class="side">${r.p}</span></div>`
    ).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =. Ba dòng đầu em có thể so sánh
      mà không cần tính tổng: khi đổi chỗ các số hạng thì tổng không đổi; khi một số hạng
      tăng thêm bao nhiêu, số hạng kia giảm đi bấy nhiêu thì tổng cũng không đổi.</div>`,
    `Dòng 1: đổi chỗ hai số hạng, tổng không đổi nên hai vế bằng nhau.  `
    + `Dòng 2: ${sp(B)} ${dau(B, C)} ${sp(C)} nên ${sp(A + B)} ${dau(B, C)} ${sp(A + C)}.  `
    + `Dòng 3: ${sp(A)} tăng thêm ${sp(k)}, ${sp(B)} giảm đi ${sp(k)} nên tổng vẫn `
    + `bằng ${sp(A + B)}.  Dòng 4: ${sp(E1)} + ${sp(E2)} + ${sp(E3)} = ${sp(tongE)}, `
    + `mà ${sp(tongE)} ${dau(tongE, P)} ${sp(P)}.`);
},

/* 5. Bài toán có lời văn ba bước */
() => {
  const q = Q(5, '');
  const sp = b63advSp;
  const n1 = R(80, 120) * 100;
  const hon = R(12, 20) * 100;
  const n2 = n1 + hon;
  const n3 = n1 + n2;
  const ca3 = n1 + n2 + n3;
  return q.done(`<p class="wordq">Một cửa hàng bán gạo trong ba ngày. Ngày thứ nhất cửa hàng
      bán được ${sp(n1)} kg gạo. Ngày thứ hai bán được nhiều hơn ngày thứ nhất ${sp(hon)} kg gạo.
      Ngày thứ ba bán được số ki-lô-gam gạo bằng tổng số gạo đã bán của hai ngày đầu.
      Hỏi cả ba ngày cửa hàng đó bán được bao nhiêu ki-lô-gam gạo?</p>
    <div class="bullet">Ngày thứ hai cửa hàng bán được ${q.num(n2, b63advLen(n2))} kg gạo.</div>
    <div class="bullet">Ngày thứ ba cửa hàng bán được ${q.num(n3, b63advLen(n3))} kg gạo.</div>
    <div class="bullet">Cả ba ngày cửa hàng bán được ${q.num(ca3, b63advLen(ca3))} kg gạo.</div>
    <div class="hint-line">Tìm số gạo ngày thứ hai trước, rồi mới tìm được số gạo ngày thứ ba.</div>`,
    `Ngày thứ hai: ${sp(n1)} + ${sp(hon)} = ${sp(n2)} (kg).  `
    + `Ngày thứ ba: ${sp(n1)} + ${sp(n2)} = ${sp(n3)} (kg).  `
    + `Cả ba ngày: ${sp(n1)} + ${sp(n2)} + ${sp(n3)} = ${sp(ca3)} (kg).`);
},

/* 6. Suy luận: chọn hai tấm thẻ có tổng bằng số đã cho */
() => {
  const q = Q(6, 'Quan sát năm tấm thẻ số rồi trả lời.');
  const sp = b63advSp;
  const bo = b63advBoSo();
  const L = ['A', 'B', 'C', 'D', 'E'];
  const nhan = bo.cap.map(v => L[bo.vs.indexOf(v)]).sort().join(',');
  const lon = Math.max(...bo.vs), be = Math.min(...bo.vs);
  const cards = `<div class="b63adv-cards">${bo.vs.map((v, i) =>
    `<div class="b63adv-card"><b>${L[i]}</b><span>${sp(v)}</span></div>`).join('')}</div>`;
  return q.done(`${cards}
    <div class="fill-line">a) Hai tấm thẻ nào ghi hai số có tổng bằng ${sp(bo.S)}?
      <span class="wpick">${q.pick(nhan, L)}</span></div>
    <div class="fill-line">b) Tổng của số lớn nhất và số bé nhất trong năm số trên
      là ${q.num(lon + be, b63advLen(lon + be))}</div>
    <div class="hint-line">Ở câu a) chỉ có duy nhất một cặp thẻ thoả mãn. Em hãy nhẩm theo
      hàng nghìn trước cho nhanh.</div>`,
    `a) ${bo.cap.map(v => sp(v)).join(' + ')} = ${sp(bo.S)}, đó là hai thẻ ${nhan.split(',').join(' và ')}.  `
    + `b) ${sp(lon)} + ${sp(be)} = ${sp(lon + be)}.`);
},
];
