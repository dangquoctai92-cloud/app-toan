/* ===== NÂNG CAO — Bài 70: Nhân số có năm chữ số với số có một chữ số =====
   Dùng lại các hàm của phần cơ bản trong cùng bài: SP70, NUM70, NGHIN70,
   ART.b70Mul, ART.b70Bao, ART.b70Cay, ART.b70Tank, ART.b70Vo.
   Hàm riêng của phần nâng cao đặt tiền tố b70adv.
   Mọi tích đều bé hơn 100 000 đúng phạm vi số của lớp 3. ============================ */

/* khung phép nhân dạng cột, nhận sẵn HTML của thừa số và của tích */
const b70advMul = (aHtml, b, resHtml) => `<div class="vcalc"><span class="vop">×</span>
  <span class="vnums"><b>${aHtml}</b><b>${b}</b></span><i class="vbar"></i>
  <span class="vres">${resHtml}</span></div>`;

/* viết số có năm chữ số nhưng che một vài chữ số bằng ô điền
   boxes = { vị trí chữ số (0 là chữ số đầu) : HTML ô điền } */
const b70advMask = (n, boxes) => {
  const d = String(n).split('').map((c, k) => boxes[k] !== undefined ? boxes[k] : c);
  const cut = d.length - 3;
  return `<span class="b70adv-mask">${d.slice(0, cut).join('')}`
    + `<span class="b70adv-gap"></span>${d.slice(cut).join('')}</span>`;
};

/* dấu so sánh của hai số */
const b70advDau = (a, b) => a > b ? '>' : a < b ? '<' : '=';

ADV.b70 = [

/* 1. Bảng thừa số – tích: có cột thiếu thừa số, có cột thiếu tích */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho dấu ? trong bảng sau.');
  const cols = [0, 1, 2, 3].map(() => { const b = R(2, 9), a = NUM70(b); return {a, b, r: a * b}; });
  const an = [0, 1, 0, 1];                 /* 0: giấu thừa số một chữ số · 1: giấu tích */
  const ts = cols.map(c => c.r);
  const lon = Math.max(...ts), be = Math.min(...ts);
  const html = `<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Thừa số</th>${cols.map(c => `<td>${SP70(c.a)}</td>`).join('')}</tr>
      <tr><th>Thừa số</th>${cols.map((c, i) =>
        `<td>${an[i] === 0 ? q.num(c.b) : c.b}</td>`).join('')}</tr>
      <tr><th>Tích</th>${cols.map((c, i) =>
        `<td>${an[i] === 1 ? q.num(c.r) : SP70(c.r)}</td>`).join('')}</tr>
    </table></div>
    <div class="bullet">Trong bảng trên, tích lớn nhất là ${q.num(lon)}.</div>
    <div class="bullet">Trong bảng trên, tích bé nhất là ${q.num(be)}.</div>
    <div class="hint-line">Muốn tìm thừa số một chữ số còn thiếu, em hãy thử lần lượt các số
      2, 3, 4, ..., 9 sao cho tích đúng bằng số đã cho.</div>`;
  return q.done(html,
    `Cột 1: ${SP70(cols[0].a)} × ${cols[0].b} = ${SP70(cols[0].r)} nên thừa số cần tìm là ${cols[0].b}. `
    + `Cột 2: ${SP70(cols[1].a)} × ${cols[1].b} = ${SP70(cols[1].r)}. `
    + `Cột 3: ${SP70(cols[2].a)} × ${cols[2].b} = ${SP70(cols[2].r)} nên thừa số cần tìm là ${cols[2].b}. `
    + `Cột 4: ${SP70(cols[3].a)} × ${cols[3].b} = ${SP70(cols[3].r)}. `
    + `Bốn tích là ${ts.map(SP70).join(', ')} nên tích lớn nhất là ${SP70(lon)}, `
    + `tích bé nhất là ${SP70(be)}.`);
},

/* 2. Tìm chữ số bị che trong phép nhân đặt tính */
() => {
  const q = Q(2, 'Tìm chữ số thích hợp thay cho dấu ? trong mỗi phép nhân.');
  const bA = R(2, 9), aA = NUM70(bA), rA = aA * bA, iA = R(0, 4);
  const bB = R(2, 9), aB = NUM70(bB), rB = aB * bB, iB = R(0, 4);
  const bC = R(2, 9), aC = NUM70(bC), rC = aC * bC;
  let i1 = R(0, 4), i2 = R(0, 4);
  for (let g = 0; g < 20 && i2 === i1; g++) i2 = R(0, 4);
  if (i2 === i1) i2 = (i1 + 2) % 5;
  const c1 = Math.min(i1, i2), c2 = Math.max(i1, i2);
  const oA = {}; oA[iA] = q.num(+String(aA)[iA]);
  const oB = {}; oB[iB] = q.num(+String(rB)[iB]);
  const oC = {};
  oC[c1] = q.num(+String(aC)[c1]);
  oC[c2] = q.num(+String(aC)[c2]);
  const html = `<div class="b70-sub"><span class="b70-lbl">a)</span>Thừa số thứ nhất bị che một chữ số.</div>
    <div class="b70-row">${b70advMul(b70advMask(aA, oA), bA, SP70(rA))}</div>
    <div class="b70-sub"><span class="b70-lbl">b)</span>Tích bị che một chữ số.</div>
    <div class="b70-row">${b70advMul(SP70(aB), bB, b70advMask(rB, oB))}</div>
    <div class="b70-sub"><span class="b70-lbl">c)</span>Thừa số thứ nhất bị che hai chữ số.</div>
    <div class="b70-row">${b70advMul(b70advMask(aC, oC), bC, SP70(rC))}</div>
    <div class="hint-line">Ở câu a) và câu c), em hãy nhân lần lượt từ hàng đơn vị và thử các chữ số
      0, 1, 2, ..., 9 sao cho tích đúng bằng số đã cho.</div>`;
  return q.done(html,
    `a) ${SP70(aA)} × ${bA} = ${SP70(rA)} nên chữ số bị che là ${String(aA)[iA]}. `
    + `b) ${SP70(aB)} × ${bB} = ${SP70(rB)} nên chữ số bị che là ${String(rB)[iB]}. `
    + `c) ${SP70(aC)} × ${bC} = ${SP70(rC)} nên hai chữ số bị che là `
    + `${String(aC)[c1]} và ${String(aC)[c2]}.`);
},

/* 3. Tính giá trị của biểu thức (hai phép tính, có dấu ngoặc) */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  const b1 = R(2, 7), A1 = R(10000, Math.floor(79999 / b1)), P1 = A1 * b1;
  const C1 = R(1000, 99999 - P1);
  const b2 = R(2, 7), A2 = R(10000, Math.floor(79999 / b2)), P2 = A2 * b2;
  const D2 = R(P2 + 1000, 99999);
  const c3 = R(2, 9), S3 = R(10000, Math.floor(99999 / c3));
  const x3 = R(1000, S3 - 1000), y3 = S3 - x3;
  const html = `<div class="eq-list">
      <div class="eq"><span class="b70-lbl">a)</span>${SP70(A1)} <span class="op">×</span> ${b1}
        <span class="op">+</span> ${SP70(C1)} <span class="op">=</span> ${q.num(P1 + C1)}</div>
      <div class="eq"><span class="b70-lbl">b)</span>${SP70(D2)} <span class="op">&minus;</span>
        ${SP70(A2)} <span class="op">×</span> ${b2} <span class="op">=</span> ${q.num(D2 - P2)}</div>
      <div class="eq"><span class="b70-lbl">c)</span>(${SP70(x3)} <span class="op">+</span> ${SP70(y3)})
        <span class="op">×</span> ${c3} <span class="op">=</span> ${q.num(S3 * c3)}</div>
    </div>
    <div class="hint-line">Trong biểu thức không có dấu ngoặc mà có phép nhân thì làm phép nhân trước.
      Biểu thức có dấu ngoặc thì làm trong ngoặc trước.</div>`;
  return q.done(html,
    `a) ${SP70(A1)} × ${b1} = ${SP70(P1)}; ${SP70(P1)} + ${SP70(C1)} = ${SP70(P1 + C1)}. `
    + `b) ${SP70(A2)} × ${b2} = ${SP70(P2)}; ${SP70(D2)} − ${SP70(P2)} = ${SP70(D2 - P2)}. `
    + `c) ${SP70(x3)} + ${SP70(y3)} = ${SP70(S3)}; ${SP70(S3)} × ${c3} = ${SP70(S3 * c3)}.`);
},

/* 4. So sánh giá trị hai biểu thức */
() => {
  const q = Q(4, 'Tính rồi điền dấu &gt;, &lt;, = thích hợp vào ô trống.');
  /* hàng 1: hai tích bằng nhau (một thừa số gấp đôi, thừa số kia giảm một nửa) */
  const k1 = pick([4, 6, 8]);
  const N1 = R(10000, Math.min(49999, Math.floor(99999 / k1)));
  /* hàng 2: cùng thừa số thứ nhất, khác thừa số thứ hai */
  let p1 = R(2, 9), p2 = R(2, 9);
  for (let g = 0; g < 20 && p2 === p1; g++) p2 = R(2, 9);
  if (p2 === p1) p2 = p1 === 9 ? 2 : p1 + 1;
  const A2 = R(10000, Math.floor(99999 / Math.max(p1, p2)));
  /* hàng 3: một tích so với một số cho sẵn */
  const k3 = R(2, 9), B3 = R(10000, Math.floor(99099 / k3)), P3 = B3 * k3;
  const V3 = P3 + pick([0, 1, -1]) * R(100, 900);
  /* hàng 4: hai tích khác nhau hoàn toàn */
  const m4 = R(2, 9), C4 = R(10000, Math.floor(99999 / m4));
  const n4 = R(2, 9), D4 = R(10000, Math.floor(99999 / n4));
  const rows = [
    [`${SP70(N1)} × ${k1}`, `${SP70(2 * N1)} × ${k1 / 2}`, b70advDau(N1 * k1, 2 * N1 * (k1 / 2))],
    [`${SP70(A2)} × ${p1}`, `${SP70(A2)} × ${p2}`, b70advDau(A2 * p1, A2 * p2)],
    [`${SP70(B3)} × ${k3}`, `${SP70(V3)}`, b70advDau(P3, V3)],
    [`${SP70(C4)} × ${m4}`, `${SP70(D4)} × ${n4}`, b70advDau(C4 * m4, D4 * n4)]
  ];
  const html = `<div class="b70adv-cmp">${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r[0]}</span>${q.sign(r[2])}<span class="side">${r[1]}</span></div>`
    ).join('')}</div>
    <div class="hint-line">Chạm vào ô dấu để đổi &gt; &lt; = . Ở hàng thứ hai, hai tích có cùng
      thừa số thứ nhất nên tích nào có thừa số thứ hai lớn hơn thì lớn hơn.</div>`;
  return q.done(html,
    `${SP70(N1)} × ${k1} = ${SP70(N1 * k1)} và ${SP70(2 * N1)} × ${k1 / 2} = ${SP70(N1 * k1)} `
    + `nên hai vế bằng nhau. `
    + `${SP70(A2)} × ${p1} = ${SP70(A2 * p1)}; ${SP70(A2)} × ${p2} = ${SP70(A2 * p2)}. `
    + `${SP70(B3)} × ${k3} = ${SP70(P3)} so với ${SP70(V3)}. `
    + `${SP70(C4)} × ${m4} = ${SP70(C4 * m4)}; ${SP70(D4)} × ${n4} = ${SP70(D4 * n4)}.`);
},

/* 5. Bài toán gấp một số lên nhiều lần rồi tính tổng và hiệu */
() => {
  const q = Q(5, '');
  const lan = R(2, 4);
  const ngay1 = R(10000, Math.floor(99999 / (lan + 1)));
  const ngay2 = ngay1 * lan;
  const tong = ngay1 + ngay2;
  const hieu = ngay2 - ngay1;
  const html = `<p class="wordq">Ngày thứ nhất một kho nhập vào ${SP70(ngay1)} kg thóc.
      Ngày thứ hai kho đó nhập vào số thóc gấp ${lan} lần ngày thứ nhất.
      Hỏi cả hai ngày kho nhập vào bao nhiêu ki-lô-gam thóc? Ngày thứ hai nhập vào nhiều hơn
      ngày thứ nhất bao nhiêu ki-lô-gam thóc?</p>
    <div class="b70-art b70-bao">
      <div class="b70-grp"><div class="in">${ART.b70Bao()}</div>
        <div class="b70-cap">Ngày thứ nhất</div></div>
      <div class="b70-grp"><div class="in">${Array.from({length: lan}, ART.b70Bao).join('')}</div>
        <div class="b70-cap">Ngày thứ hai: gấp ${lan} lần</div></div>
    </div>
    <div class="bullet">Ngày thứ hai kho nhập vào ${q.num(ngay2)} kg thóc.</div>
    <div class="bullet">Cả hai ngày kho nhập vào ${q.num(tong)} kg thóc.</div>
    <div class="bullet">Ngày thứ hai nhập vào nhiều hơn ngày thứ nhất ${q.num(hieu)} kg thóc.</div>
    <div class="hint-line">Muốn gấp một số lên nhiều lần thì lấy số đó nhân với số lần.</div>`;
  return q.done(html,
    `Ngày thứ hai: ${SP70(ngay1)} × ${lan} = ${SP70(ngay2)} (kg). `
    + `Cả hai ngày: ${SP70(ngay1)} + ${SP70(ngay2)} = ${SP70(tong)} (kg). `
    + `Nhiều hơn: ${SP70(ngay2)} − ${SP70(ngay1)} = ${SP70(hieu)} (kg).`);
},

/* 6. So sánh hai trại ươm cây giống */
() => {
  const q = Q(6, '');
  let v1 = 2, c1 = 10000, t1 = 20000, v2 = 2, c2 = 10000, t2 = 20000;
  for (let g = 0; g < 30; g++){
    v1 = R(2, 4);
    c1 = R(10000, Math.floor(49999 / v1));
    t1 = v1 * c1;
    v2 = R(2, 4);
    c2 = R(10000, Math.floor((99999 - t1) / v2));
    t2 = v2 * c2;
    if (t1 !== t2) break;
  }
  if (t1 === t2){ c1 = c1 - 1; t1 = v1 * c1; }   /* bảo đảm hai trại khác nhau */
  const nhieu = t1 > t2 ? 'Trại thứ nhất' : 'Trại thứ hai';
  const hieu = Math.abs(t1 - t2);
  const lonHon = Math.max(t1, t2), beHon = Math.min(t1, t2);
  const html = `<p class="wordq">Trại ươm thứ nhất có ${v1} vườn ươm, mỗi vườn có ${SP70(c1)} cây giống.
      Trại ươm thứ hai có ${v2} vườn ươm, mỗi vườn có ${SP70(c2)} cây giống.
      Hỏi cả hai trại ươm có bao nhiêu cây giống? Trại ươm nào có nhiều cây giống hơn và
      nhiều hơn bao nhiêu cây?</p>
    <div class="b70-art b70-cay">
      <div class="b70-grp"><div class="in">${Array.from({length: v1}, ART.b70Cay).join('')}</div>
        <div class="b70-cap">Trại thứ nhất: ${v1} vườn ươm</div></div>
      <div class="b70-grp"><div class="in">${Array.from({length: v2}, ART.b70Cay).join('')}</div>
        <div class="b70-cap">Trại thứ hai: ${v2} vườn ươm</div></div>
    </div>
    <div class="bullet">Trại ươm thứ nhất có ${q.num(t1)} cây giống.</div>
    <div class="bullet">Trại ươm thứ hai có ${q.num(t2)} cây giống.</div>
    <div class="bullet">Cả hai trại ươm có ${q.num(t1 + t2)} cây giống.</div>
    <div class="bullet">Trại có nhiều cây giống hơn là ${q.pick(nhieu, ['Trại thứ nhất', 'Trại thứ hai'])}</div>
    <div class="bullet">Trại đó có nhiều hơn trại kia ${q.num(hieu)} cây giống.</div>
    <div class="hint-line">Tính số cây của từng trại trước rồi mới so sánh hai số đó với nhau.</div>`;
  return q.done(html,
    `Trại thứ nhất: ${SP70(c1)} × ${v1} = ${SP70(t1)} (cây). `
    + `Trại thứ hai: ${SP70(c2)} × ${v2} = ${SP70(t2)} (cây). `
    + `Cả hai trại: ${SP70(t1)} + ${SP70(t2)} = ${SP70(t1 + t2)} (cây). `
    + `Vì ${SP70(t1)} ${b70advDau(t1, t2)} ${SP70(t2)} nên ${nhieu.toLowerCase()} có nhiều cây hơn, `
    + `nhiều hơn ${SP70(lonHon)} − ${SP70(beHon)} = ${SP70(hieu)} (cây).`);
},
];
