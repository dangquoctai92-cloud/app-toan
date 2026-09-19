/*CSS
.b58adv-eq{margin:8px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#eef4ff;
  border:2.5px solid #b8cdf0;border-radius:12px;padding:8px 14px;display:flex;flex-wrap:wrap;
  align-items:center;gap:6px}
.b58adv-eq b{color:#d63384;margin-right:2px}
.b58adv-chain{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:8px 0}
.b58adv-node{background:#ffe6cc;border:2.5px solid #e79a4d;border-radius:11px;padding:6px 10px;
  font-size:17px;font-weight:800;color:#7a3d09;white-space:nowrap}
.b58adv-node.q{background:#fff5d6;border-color:#e8c05a}
.b58adv-flow{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 2px;margin:10px 0}
.b58adv-box{min-width:72px;padding:6px 9px;text-align:center;font-size:18px;font-weight:800;
  color:#164a63;background:#d9ecf7;border:2.5px solid #6aaed0;border-radius:10px}
.b58adv-box.q{background:#fff5d6;border-color:#e8c05a}
.b58adv-op{display:grid;place-items:center;padding:0 4px;line-height:1.15;color:#1f9fc4;
  font-size:20px;font-weight:800}
.b58adv-op em{font-style:normal;display:block;font-size:14px;font-weight:800;color:#d63384;
  white-space:nowrap}
CSS*/

/* ===== NÂNG CAO — Bài 58: Luyện tập chung (nhân, chia số có bốn chữ số) ===== */

/* viết số theo kiểu sách: 6 504 */
const b58advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* bội chung nhỏ nhất của hai số có một chữ số */
const b58advBcnn = (a, b) => {
  for (let k = 1; k <= 90; k++) if ((a * k) % b === 0) return a * k;
  return a * b;
};

/* dãy số: mỗi phần tử {h, q} */
const b58advChain = items => `<div class="b58adv-chain">${items.map(x =>
  `<span class="b58adv-node${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

/* sơ đồ máy tính */
const b58advBox = (h, isQ) => `<span class="b58adv-box${isQ ? ' q' : ''}">${h}</span>`;
const b58advOp = lbl => `<span class="b58adv-op"><em>${lbl}</em>&rarr;</span>`;
const b58advFlow = parts => `<div class="b58adv-flow">${parts.join('')}</div>`;

ADV.b58 = [

/* 1. Tính giá trị của biểu thức nhiều bước (nhân, chia, có dấu ngoặc) */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức.');
  /* a) A : b + c × d */
  const b1 = R(2, 9);
  const t1 = R(Math.ceil(1000 / b1), Math.floor(9999 / b1)), A1 = t1 * b1;
  const c1 = R(2, 9), d1 = R(11, 99);
  const kq1 = t1 + c1 * d1;
  /* b) (A + B) : k − c */
  const k2 = R(2, 9);
  const t2 = R(Math.ceil(1100 / k2), Math.floor(9999 / k2)), S2 = t2 * k2;
  const B2 = R(100, Math.min(899, S2 - 1000)), A2 = S2 - B2;
  const c2 = R(20, Math.min(99, t2 - 1));
  const kq2 = t2 - c2;
  /* c) A × k − B : m */
  const k3 = R(2, 9), A3 = R(1002, Math.floor(9999 / k3));
  const m3 = R(2, 9), u3 = R(Math.ceil(1000 / m3), 999), B3 = u3 * m3;
  const kq3 = A3 * k3 - u3;
  return q.done(`<div class="b58adv-eq"><b>a)</b> ${b58advSp(A1)} : ${b1} + ${c1} × ${d1}
      = ${q.num(kq1)}</div>
    <div class="b58adv-eq"><b>b)</b> (${b58advSp(A2)} + ${B2}) : ${k2} − ${c2} = ${q.num(kq2)}</div>
    <div class="b58adv-eq"><b>c)</b> ${b58advSp(A3)} × ${k3} − ${b58advSp(B3)} : ${m3}
      = ${q.num(kq3)}</div>
    <div class="hint-line">Trong biểu thức chỉ có phép nhân, phép chia và phép cộng (phép trừ)
      thì làm phép nhân, phép chia trước. Nếu có dấu ngoặc thì làm trong ngoặc trước.</div>`,
    `a) ${b58advSp(A1)} : ${b1} = ${b58advSp(t1)}, ${c1} × ${d1} = ${c1 * d1}, `
    + `${b58advSp(t1)} + ${c1 * d1} = ${b58advSp(kq1)}.  `
    + `b) ${b58advSp(A2)} + ${B2} = ${b58advSp(S2)}, ${b58advSp(S2)} : ${k2} = ${b58advSp(t2)}, `
    + `${b58advSp(t2)} − ${c2} = ${b58advSp(kq2)}.  `
    + `c) ${b58advSp(A3)} × ${k3} = ${b58advSp(A3 * k3)}, ${b58advSp(B3)} : ${m3} = ${u3}, `
    + `${b58advSp(A3 * k3)} − ${u3} = ${b58advSp(kq3)}.`);
},

/* 2. Tìm thành phần chưa biết của phép nhân, phép chia (toán ngược) */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const ka = R(2, 9), ta = R(Math.ceil(1000 / ka), Math.floor(9999 / ka));   /* ? × ka */
  const kb = R(2, 9), tb = R(Math.ceil(1000 / kb), Math.floor(9999 / kb));   /* ? : kb = tb */
  const kc = R(2, 9), tc = R(Math.ceil(1000 / kc), Math.floor(9999 / kc));   /* Pc : ? = tc */
  const Pc = tc * kc;
  const kd = R(2, 9), xd = R(1002, Math.floor(9999 / kd)), cd = R(105, 900);
  const Dd = xd * kd - cd;
  return q.done(`<div class="b58adv-eq"><b>a)</b> ${q.num(ta)} × ${ka} = ${b58advSp(ta * ka)}</div>
    <div class="b58adv-eq"><b>b)</b> ${q.num(tb * kb)} : ${kb} = ${b58advSp(tb)}</div>
    <div class="b58adv-eq"><b>c)</b> ${b58advSp(Pc)} : ${q.num(kc, 1)} = ${b58advSp(tc)}</div>
    <p class="wordq">d) Gấp một số lên ${kd} lần rồi bớt đi ${cd} đơn vị thì được ${b58advSp(Dd)}.</p>
    <div class="fill-line">Số đó là ${q.num(xd)}</div>
    <div class="hint-line">Muốn tìm thừa số chưa biết ta lấy tích chia cho thừa số kia.
      Muốn tìm số bị chia ta lấy thương nhân với số chia.
      Muốn tìm số chia ta lấy số bị chia chia cho thương.</div>`,
    `a) ${b58advSp(ta * ka)} : ${ka} = ${b58advSp(ta)}.  `
    + `b) ${b58advSp(tb)} × ${kb} = ${b58advSp(tb * kb)}.  `
    + `c) ${b58advSp(Pc)} : ${b58advSp(tc)} = ${kc}.  `
    + `d) ${b58advSp(Dd)} + ${cd} = ${b58advSp(xd * kd)}, ${b58advSp(xd * kd)} : ${kd} = ${b58advSp(xd)}.`);
},

/* 3. Dãy số theo quy luật */
() => {
  const q = Q(3, 'Viết tiếp các số của mỗi dãy số sau.');
  const mA = R(12, 41);
  const seqA = [mA, mA * 3, mA * 9, mA * 27, mA * 81, mA * 243];
  const x0 = R(60, 150), cB = R(5, 25) * 10;
  const seqB = [x0];
  for (let i = 0; i < 4; i++) seqB.push(seqB[i] * 2 + cB);
  const rowA = b58advChain(seqA.map((v, i) => i < 3
    ? {h: b58advSp(v)} : {q: 1, h: q.num(v)}));
  const rowB = b58advChain(seqB.map((v, i) => i < 3
    ? {h: b58advSp(v)} : {q: 1, h: q.num(v)}));
  return q.done(`<div class="sub-lbl">a)</div>${rowA}
    <div class="sub-lbl">b)</div>${rowB}
    <div class="hint-line">Ở dãy a) hãy xem mỗi số gấp mấy lần số liền trước nó.
      Ở dãy b) hãy thử xem mỗi số có bằng số liền trước gấp lên một số lần
      rồi cộng thêm cùng một số hay không.</div>`,
    `a) Mỗi số gấp 3 lần số liền trước: ${seqA.map(b58advSp).join(', ')}.  `
    + `b) Mỗi số bằng số liền trước nhân với 2 rồi cộng thêm ${cB}: `
    + `${seqB.map(b58advSp).join(', ')}.`);
},

/* 4. So sánh giá trị hai biểu thức */
() => {
  const q = Q(4, '&gt; ; &lt; ; = ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  /* a) cùng một thừa số, hai thừa số kia khác nhau */
  const kA = R(2, 9);
  let mA = R(2, 9); if (mA === kA) mA = kA % 9 + 1;
  const A = R(102, Math.floor(9999 / Math.max(kA, mA)));
  /* b) nhân một tổng với một số */
  const kB = R(2, 9);
  const sB = R(200, Math.floor(9999 / kB));
  const aB = R(100, sB - 100), bB = sB - aB;
  /* c) cùng số bị chia, hai số chia khác nhau */
  const cap = pick([[2, 4], [2, 3], [3, 6], [2, 5], [4, 8], [3, 9], [2, 6], [2, 8], [4, 6]]);
  const L = b58advBcnn(cap[0], cap[1]);
  const kC = pick([cap[0], cap[1]]), mC = kC === cap[0] ? cap[1] : cap[0];
  const tC = R(Math.ceil(1000 / L), Math.floor(9999 / L)), C = tC * L;
  /* d) một tích so với một số */
  const kD = R(2, 9), D = R(102, Math.floor(9999 / kD));
  const P = pick([D * kD, D * kD + R(1, 300), D * kD - R(1, 300)]);
  const row = (l, s, r) => `<div class="cmp-row"><span class="side">${l}</span>
    ${q.sign(s)}<span class="side">${r}</span></div>`;
  return q.done(`<div class="sub-lbl">a)</div>
      ${row(`${b58advSp(A)} × ${kA}`, cmp(A * kA, A * mA), `${b58advSp(A)} × ${mA}`)}
    <div class="sub-lbl">b)</div>
      ${row(`(${aB} + ${bB}) × ${kB}`, cmp(sB * kB, aB * kB + bB * kB),
        `${aB} × ${kB} + ${bB} × ${kB}`)}
    <div class="sub-lbl">c)</div>
      ${row(`${b58advSp(C)} : ${kC}`, cmp(C / kC, C / mC), `${b58advSp(C)} : ${mC}`)}
    <div class="sub-lbl">d)</div>
      ${row(`${b58advSp(D)} × ${kD}`, cmp(D * kD, P), b58advSp(P))}
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =.
      Ở câu a) hai tích có chung một thừa số, thừa số kia lớn hơn thì tích lớn hơn.
      Ở câu c) hai phép chia có chung số bị chia, số chia lớn hơn thì thương bé hơn.</div>`,
    `a) ${b58advSp(A * kA)} và ${b58advSp(A * mA)}.  `
    + `b) ${b58advSp(sB)} × ${kB} = ${b58advSp(sB * kB)}; `
    + `${b58advSp(aB * kB)} + ${b58advSp(bB * kB)} = ${b58advSp(aB * kB + bB * kB)}.  `
    + `c) ${b58advSp(C)} : ${kC} = ${b58advSp(C / kC)}; ${b58advSp(C)} : ${mC} = ${b58advSp(C / mC)}.  `
    + `d) ${b58advSp(D)} × ${kD} = ${b58advSp(D * kD)} và ${b58advSp(P)}.`);
},

/* 5. Sơ đồ máy tính: tính xuôi và tính ngược */
() => {
  const q = Q(5, '<span class="tag">Số</span> ?');
  /* a) tính xuôi */
  const a1 = R(2, 9);
  const X1 = R(1002, Math.floor(9999 / a1));
  const c1 = R(2, 9);
  const b1 = R(101, 900);
  const b1f = b1 + ((X1 * a1 - b1) % c1);
  const m1 = X1 * a1, n1 = m1 - b1f, r1 = n1 / c1;
  /* b) tính ngược */
  const a2 = R(2, 8);
  const X2 = R(1002, Math.floor(9000 / a2));
  const c2 = R(2, 9);
  const b2 = R(110, 900);
  const b2f = b2 - ((X2 * a2 + b2) % c2);
  const m2 = X2 * a2, n2 = m2 + b2f, r2 = n2 / c2;
  const rowA = b58advFlow([
    b58advBox(b58advSp(X1)), b58advOp(`× ${a1}`),
    b58advBox(q.num(m1), 1), b58advOp(`− ${b1f}`),
    b58advBox(q.num(n1), 1), b58advOp(`: ${c1}`),
    b58advBox(q.num(r1), 1)]);
  const rowB = b58advFlow([
    b58advBox(q.num(X2), 1), b58advOp(`× ${a2}`),
    b58advBox(q.num(m2), 1), b58advOp(`+ ${b2f}`),
    b58advBox(q.num(n2), 1), b58advOp(`: ${c2}`),
    b58advBox(b58advSp(r2))]);
  return q.done(`<div class="sub-lbl">a)</div>${rowA}
    <div class="sub-lbl">b)</div>${rowB}
    <div class="hint-line">Câu a) tính lần lượt từ trái sang phải.
      Câu b) phải làm ngược lại từ phải sang trái: muốn tìm số trước phép chia
      thì lấy kết quả nhân với số chia, trước phép cộng thì lấy kết quả trừ đi số đã cộng,
      trước phép nhân thì lấy kết quả chia cho số đã nhân.</div>`,
    `a) ${b58advSp(X1)} × ${a1} = ${b58advSp(m1)}; ${b58advSp(m1)} − ${b1f} = ${b58advSp(n1)}; `
    + `${b58advSp(n1)} : ${c1} = ${b58advSp(r1)}.  `
    + `b) ${b58advSp(r2)} × ${c2} = ${b58advSp(n2)}; ${b58advSp(n2)} − ${b2f} = ${b58advSp(m2)}; `
    + `${b58advSp(m2)} : ${a2} = ${b58advSp(X2)}.`);
},

/* 6. Bài toán nhiều bước với sợi dây thép uốn thành hình vuông */
() => {
  const q = Q(6, '');
  const sh = R(2, 6);
  const canh = R(Math.ceil(1000 / (4 * sh)), 190);
  const L = canh * 4 * sh;
  return q.done(`<p class="wordq">Bác thợ có một sợi dây thép dài ${b58advSp(L)} cm.
      Bác dùng hết sợi dây thép đó để uốn thành ${sh} hình vuông bằng nhau.</p>
    <div class="bullet">a) Chu vi của mỗi hình vuông đó là ${q.num(L / sh)} cm.</div>
    <div class="bullet">b) Cạnh của mỗi hình vuông đó dài ${q.num(canh)} cm.</div>
    <div class="bullet">c) Nếu dùng cả sợi dây thép đó để uốn thành một hình vuông duy nhất
      thì hình vuông ấy có cạnh dài ${q.num(canh * sh)} cm.</div>
    <div class="hint-line">Chu vi hình vuông bằng độ dài cạnh nhân với 4,
      nên độ dài cạnh bằng chu vi chia cho 4.</div>`,
    `a) ${b58advSp(L)} : ${sh} = ${b58advSp(L / sh)} (cm);  `
    + `b) ${b58advSp(L / sh)} : 4 = ${b58advSp(canh)} (cm);  `
    + `c) ${b58advSp(L)} : 4 = ${b58advSp(canh * sh)} (cm)`);
},
];
