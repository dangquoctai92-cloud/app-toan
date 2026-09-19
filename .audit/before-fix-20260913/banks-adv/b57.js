/*CSS
.b57adv-eq{margin:8px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#eef4ff;
  border:2.5px solid #b8cdf0;border-radius:12px;padding:8px 14px;display:flex;flex-wrap:wrap;
  align-items:center;gap:6px}
.b57adv-eq b{color:#d63384;margin-right:2px}
.b57adv-chain{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:8px 0}
.b57adv-node{background:#d9ecf7;border:2.5px solid #6aaed0;border-radius:11px;padding:6px 10px;
  font-size:17px;font-weight:800;color:#164a63;white-space:nowrap}
.b57adv-node.q{background:#fff5d6;border-color:#e8c05a}
.b57adv-lbl{font-weight:800;color:#d63384;margin-right:6px;font-size:18px}
CSS*/

/* ===== NÂNG CAO — Bài 57: Chia số có bốn chữ số cho số có một chữ số ===== */

/* viết số có bốn chữ số theo kiểu sách: 6 408 */
const b57advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* bội chung nhỏ nhất của hai số bé */
const b57advBcnn = (a, b) => {
  for (let k = 1; k <= 90; k++) if ((a * k) % b === 0) return a * k;
  return a * b;
};

/* dãy số, mỗi phần tử {h, q} */
const b57advChain = items => `<div class="b57adv-chain">${items.map(x =>
  `<span class="b57adv-node${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

ADV.b57 = [

/* 1. Tính giá trị của biểu thức có phép chia (hai bước, có dấu ngoặc) */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức.');
  const b = R(2, 9);
  const t = R(Math.ceil(1000 / b), Math.floor(9999 / b)), A = t * b, c = R(101, 899);
  const b2 = R(2, 9);
  const t2 = R(Math.max(200, Math.ceil(1000 / b2)), Math.floor(9999 / b2));
  const A2 = t2 * b2, c2 = R(50, Math.min(199, t2 - 1));
  const c3 = R(2, 9);
  const t3 = R(Math.ceil(1101 / c3), Math.floor(9999 / c3)), S = t3 * c3;
  const b3 = R(101, Math.min(899, S - 1000)), a3 = S - b3;
  return q.done(`<div class="b57adv-eq"><b>a)</b> ${b57advSp(A)} : ${b} + ${c} = ${q.num(t + c)}</div>
    <div class="b57adv-eq"><b>b)</b> ${b57advSp(A2)} : ${b2} − ${c2} = ${q.num(t2 - c2)}</div>
    <div class="b57adv-eq"><b>c)</b> (${b57advSp(a3)} + ${b3}) : ${c3} = ${q.num(t3)}</div>
    <div class="hint-line">Trong biểu thức có phép chia và phép cộng (hoặc phép trừ) thì thực hiện
      phép chia trước. Nếu có dấu ngoặc thì thực hiện phép tính trong ngoặc trước.</div>`,
    `a) ${b57advSp(A)} : ${b} = ${b57advSp(t)}, ${b57advSp(t)} + ${c} = ${b57advSp(t + c)}.  `
    + `b) ${b57advSp(A2)} : ${b2} = ${b57advSp(t2)}, ${b57advSp(t2)} − ${c2} = ${b57advSp(t2 - c2)}.  `
    + `c) ${b57advSp(a3)} + ${b3} = ${b57advSp(S)}, ${b57advSp(S)} : ${c3} = ${b57advSp(t3)}.`);
},

/* 2. Dãy số theo quy luật giảm đi một số lần */
() => {
  const q = Q(2, 'Viết tiếp ba số của mỗi dãy số sau.');
  const mA = R(150, 300);
  const seqA = [mA * 32, mA * 16, mA * 8, mA * 4, mA * 2, mA];
  const mB = R(20, 120);
  const seqB = [mB * 81, mB * 27, mB * 9, mB * 3, mB];
  const row = (seq, gi) => b57advChain(seq.map((v, i) => i < gi
    ? {h: b57advSp(v)} : {q: 1, h: q.num(v)}));
  return q.done(`<div class="sub-lbl">a)</div>${row(seqA, 3)}
    <div class="sub-lbl">b)</div>${row(seqB, 2)}
    <div class="hint-line">Hãy xem mỗi số kém số liền trước nó mấy lần
      (số liền trước chia cho mấy thì được số đứng sau).</div>`,
    `a) Mỗi số bằng số liền trước giảm đi 2 lần: ${seqA.map(b57advSp).join(', ')}.  `
    + `b) Mỗi số bằng số liền trước giảm đi 3 lần: ${seqB.map(b57advSp).join(', ')}.`);
},

/* 3. So sánh hai biểu thức có phép chia */
() => {
  const q = Q(3, '&gt; ; &lt; ; = ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  /* a) cùng số bị chia, hai số chia khác nhau */
  const cap = pick([[2, 4], [2, 3], [3, 6], [2, 5], [4, 8], [3, 9], [2, 6], [2, 8]]);
  const bA = pick([cap[0], cap[1]]), cA = bA === cap[0] ? cap[1] : cap[0];
  const L = b57advBcnn(cap[0], cap[1]);
  const tA = R(Math.ceil(1000 / L), Math.floor(9999 / L)), A = tA * L;
  /* b) chia một tổng cho một số */
  const k = R(2, 9);
  const ta = R(Math.ceil(1000 / k), Math.floor(8800 / k)), Ab = ta * k;
  const tb = R(20, 90), Bb = tb * k;
  const tc = pick([tb, tb + R(1, 30), tb - R(1, 19)]), Cb = tc * k;
  /* c) một thương so với một số */
  const kc = R(2, 9);
  const tcc = R(Math.max(400, Math.ceil(1000 / kc)), Math.floor(9999 / kc)), Ac = tcc * kc;
  const mc = pick([tcc, tcc + R(1, 300), tcc - R(1, 300)]);
  const row = (l, s, r) => `<div class="cmp-row"><span class="side">${l}</span>
    ${q.sign(s)}<span class="side">${r}</span></div>`;
  return q.done(`<div class="sub-lbl">a)</div>
      ${row(`${b57advSp(A)} : ${bA}`, cmp(A / bA, A / cA), `${b57advSp(A)} : ${cA}`)}
    <div class="sub-lbl">b)</div>
      ${row(`(${b57advSp(Ab)} + ${b57advSp(Bb)}) : ${k}`, cmp(ta + tb, ta + tc),
        `${b57advSp(Ab)} : ${k} + ${b57advSp(Cb)} : ${k}`)}
    <div class="sub-lbl">c)</div>
      ${row(`${b57advSp(Ac)} : ${kc}`, cmp(tcc, mc), b57advSp(mc))}
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =.
      Ở câu a) hai phép chia có cùng số bị chia, số chia lớn hơn thì thương bé hơn.</div>`,
    `a) ${b57advSp(A)} : ${bA} = ${b57advSp(A / bA)}, ${b57advSp(A)} : ${cA} = ${b57advSp(A / cA)}.  `
    + `b) ${b57advSp(Ab + Bb)} : ${k} = ${b57advSp(ta + tb)}, `
    + `${b57advSp(ta)} + ${b57advSp(tc)} = ${b57advSp(ta + tc)}.  `
    + `c) ${b57advSp(Ac)} : ${kc} = ${b57advSp(tcc)} và ${b57advSp(mc)}.`);
},

/* 4. Bài toán ngược: tìm số bị chia trong phép chia có dư */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const b = R(4, 9), r = R(1, b - 2);
  const t = R(Math.ceil(1000 / b), Math.floor(9990 / b));
  const a = t * b + r;
  const rMax = b - 1, aMax = t * b + rMax;
  return q.done(`<p class="wordq">Trong một phép chia, số chia là ${b}, thương là ${b57advSp(t)}
      và số dư là ${r}.</p>
    <div class="fill-line">Số bị chia của phép chia đó là ${q.num(a)}</div>
    <div class="fill-line">Trong phép chia cho ${b}, số dư lớn nhất có thể có là ${q.num(rMax, 1)}</div>
    <div class="fill-line">Nếu số chia và thương vẫn như trên nhưng số dư là số dư lớn nhất
      thì số bị chia là ${q.num(aMax)}</div>
    <div class="hint-line">Số bị chia = thương × số chia + số dư. Số dư luôn bé hơn số chia.</div>`,
    `${b57advSp(t)} × ${b} + ${r} = ${b57advSp(a)};  số dư lớn nhất khi chia cho ${b} là ${rMax};  `
    + `${b57advSp(t)} × ${b} + ${rMax} = ${b57advSp(aMax)}.`);
},

/* 5. Bài toán chia có dư trong thực tế (cần ít nhất bao nhiêu hộp) */
() => {
  const q = Q(5, '');
  const k = R(6, 9), r = R(1, k - 1);
  const t = R(Math.ceil(1000 / k), Math.floor((9990 - r) / k));
  const N = t * k + r;
  return q.done(`<p class="wordq">Một cửa hàng có ${b57advSp(N)} quyển vở, mỗi hộp đựng được
      ${k} quyển vở. Hỏi cửa hàng đó xếp đầy được bao nhiêu hộp, còn thừa mấy quyển vở
      và cần ít nhất bao nhiêu hộp để đựng hết số vở đó?</p>
    <div class="bullet">Cửa hàng đó xếp đầy được ${q.num(t)} hộp và còn thừa ${q.num(r, 1)} quyển vở.</div>
    <div class="bullet">Cần ít nhất ${q.num(t + 1)} hộp để đựng hết số vở đó.</div>
    <div class="hint-line">Số vở còn thừa vẫn phải xếp thêm vào một hộp nữa.</div>`,
    `${b57advSp(N)} : ${k} = ${b57advSp(t)} (dư ${r}), vậy đựng đầy ${b57advSp(t)} hộp, thừa ${r} quyển;  `
    + `${b57advSp(t)} + 1 = ${b57advSp(t + 1)} (hộp)`);
},

/* 6. Bài toán có lời văn ba bước (giảm đi một số lần) */
() => {
  const q = Q(6, '');
  const k = R(2, 5);
  const t = R(Math.max(400, Math.ceil(1000 / k)), Math.floor(9999 / k));
  const A = t * k, m = R(105, 300);
  return q.done(`<p class="wordq">Một kho chứa ${b57advSp(A)} kg gạo. Ngày đầu người ta chuyển đi
      số gạo bằng số gạo trong kho giảm đi ${k} lần. Ngày thứ hai chuyển đi ${m} kg gạo.
      Hỏi trong kho còn lại bao nhiêu ki-lô-gam gạo?</p>
    <div class="bullet">Ngày đầu chuyển đi ${q.num(t)} kg gạo.</div>
    <div class="bullet">Cả hai ngày chuyển đi ${q.num(t + m)} kg gạo.</div>
    <div class="bullet">Trong kho còn lại ${q.num(A - t - m)} kg gạo.</div>`,
    `${b57advSp(A)} : ${k} = ${b57advSp(t)} (kg);  `
    + `${b57advSp(t)} + ${m} = ${b57advSp(t + m)} (kg);  `
    + `${b57advSp(A)} − ${b57advSp(t + m)} = ${b57advSp(A - t - m)} (kg)`);
},
];
