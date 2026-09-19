/*CSS
.b56adv-eq{margin:8px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#eef4ff;
  border:2.5px solid #b8cdf0;border-radius:12px;padding:8px 14px;display:flex;flex-wrap:wrap;
  align-items:center;gap:6px}
.b56adv-eq b{color:#d63384;margin-right:2px}
.b56adv-chain{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:8px 0}
.b56adv-node{background:#dff0c8;border:2.5px solid #94c46a;border-radius:11px;padding:6px 10px;
  font-size:17px;font-weight:800;color:#2f5320;white-space:nowrap}
.b56adv-node.q{background:#fff5d6;border-color:#e8c05a}
.b56adv-arr{color:#1f9fc4;font-size:15px;font-weight:800;white-space:nowrap;text-align:center;
  line-height:1.1}
.b56adv-arr i{display:block;font-style:normal;font-size:19px;line-height:1}
.b56adv-lbl{font-weight:800;color:#d63384;margin-right:6px;font-size:18px}
CSS*/

/* ===== NÂNG CAO — Bài 56: Nhân số có bốn chữ số với số có một chữ số ===== */

/* viết số có bốn chữ số theo kiểu sách: 1 216 */
const b56advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* dãy các ô nối bằng mũi tên, ops[i] là phép biến đổi ghi trên mũi tên thứ i */
const b56advFlow = (nodes, ops) => `<div class="b56adv-chain">${nodes.map((x, i) =>
  `<span class="b56adv-node${x.q ? ' q' : ''}">${x.h}</span>`
  + (i === nodes.length - 1 ? ''
     : `<span class="b56adv-arr">${ops[i]}<i>&rarr;</i></span>`)).join('')}</div>`;

/* dãy số, mỗi phần tử {h, q} */
const b56advChain = items => `<div class="b56adv-chain">${items.map(x =>
  `<span class="b56adv-node${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

ADV.b56 = [

/* 1. Tính giá trị của biểu thức có phép nhân (hai bước, có dấu ngoặc) */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức.');
  const k = R(2, 4), A = R(1002, Math.floor(9000 / k)), m = R(11, 89) * 10;
  const j = R(2, 5), B = R(1002, Math.floor(9500 / j)), n = R(105, 980);
  const c = R(2, 4), S = R(1101, Math.floor(9500 / c));
  const b3 = R(101, Math.min(899, S - 1000)), a3 = S - b3;
  return q.done(`<div class="b56adv-eq"><b>a)</b> ${b56advSp(A)} × ${k} + ${m}
      = ${q.num(A * k + m)}</div>
    <div class="b56adv-eq"><b>b)</b> ${b56advSp(B)} × ${j} − ${n} = ${q.num(B * j - n)}</div>
    <div class="b56adv-eq"><b>c)</b> (${b56advSp(a3)} + ${b3}) × ${c} = ${q.num(S * c)}</div>
    <div class="hint-line">Trong biểu thức có phép nhân và phép cộng (hoặc phép trừ) thì thực hiện
      phép nhân trước. Nếu có dấu ngoặc thì thực hiện phép tính trong ngoặc trước.</div>`,
    `a) ${b56advSp(A)} × ${k} = ${b56advSp(A * k)}, `
    + `${b56advSp(A * k)} + ${m} = ${b56advSp(A * k + m)}.  `
    + `b) ${b56advSp(B)} × ${j} = ${b56advSp(B * j)}, `
    + `${b56advSp(B * j)} − ${n} = ${b56advSp(B * j - n)}.  `
    + `c) ${b56advSp(a3)} + ${b3} = ${b56advSp(S)}, `
    + `${b56advSp(S)} × ${c} = ${b56advSp(S * c)}.`);
},

/* 2. Tìm số có bốn chữ số theo nhiều điều kiện rồi gấp số đó lên nhiều lần */
() => {
  const q = Q(2, 'Tìm số có bốn chữ số thoả mãn tất cả các điều kiện sau, rồi trả lời câu hỏi.');
  const ng = R(1, 4), tr = 2 * ng;
  const d = R(0, tr), ch = tr - d;
  const dv = R(0, 9);
  const n = ng * 1000 + tr * 100 + ch * 10 + dv;
  const S = ng + tr + ch + dv;
  const k = R(2, Math.floor(9999 / n));
  const dkChuc = d === 0 ? 'Chữ số hàng chục bằng chữ số hàng trăm.'
                         : `Chữ số hàng chục kém chữ số hàng trăm ${d} đơn vị.`;
  return q.done(`<div class="bullet">Chữ số hàng nghìn là ${ng}.</div>
    <div class="bullet">Chữ số hàng trăm gấp 2 lần chữ số hàng nghìn.</div>
    <div class="bullet">${dkChuc}</div>
    <div class="bullet">Tổng bốn chữ số của số đó bằng ${S}.</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 4)}</div>
    <div class="fill-line">Gấp số đó lên ${k} lần thì được số ${q.num(n * k)}</div>
    <div class="fill-line">Số mới hơn số cần tìm ${q.num(n * (k - 1))} đơn vị</div>
    <div class="hint-line">Tìm lần lượt chữ số hàng nghìn, hàng trăm, hàng chục;
      chữ số hàng đơn vị bằng tổng bốn chữ số trừ đi ba chữ số đã biết.</div>`,
    `Hàng trăm: ${ng} × 2 = ${tr}; hàng chục: ${tr} − ${d} = ${ch}; `
    + `hàng đơn vị: ${S} − ${ng} − ${tr} − ${ch} = ${dv}, vậy số đó là ${b56advSp(n)}.  `
    + `${b56advSp(n)} × ${k} = ${b56advSp(n * k)};  `
    + `${b56advSp(n * k)} − ${b56advSp(n)} = ${b56advSp(n * (k - 1))}.`);
},

/* 3. Dãy số theo quy luật gấp lên một số lần */
() => {
  const q = Q(3, 'Viết tiếp ba số của mỗi dãy số sau.');
  const mk = (s, r) => { const a = [s]; for (let i = 1; i < 7; i++) a.push(a[i - 1] * r); return a; };
  const rA = 2, sA = R(31, 150), seqA = mk(sA, rA);
  const rB = 3, sB = R(4, 13), seqB = mk(sB, rB);
  const row = seq => b56advChain(seq.map((v, i) => i < 4
    ? {h: b56advSp(v)} : {q: 1, h: q.num(v)}));
  return q.done(`<div class="sub-lbl">a)</div>${row(seqA)}
    <div class="sub-lbl">b)</div>${row(seqB)}
    <div class="hint-line">Hãy xem mỗi số gấp mấy lần số liền trước nó.</div>`,
    `a) Mỗi số gấp ${rA} lần số liền trước: ${seqA.map(b56advSp).join(', ')}.  `
    + `b) Mỗi số gấp ${rB} lần số liền trước: ${seqB.map(b56advSp).join(', ')}.`);
},

/* 4. So sánh hai biểu thức có phép nhân */
() => {
  const q = Q(4, '&gt; ; &lt; ; = ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  /* a) tách một thừa số: A × k  và  A × (k − 1) + số hạng */
  const k1 = R(3, 6), A1 = R(1002, Math.floor(9999 / k1));
  const s1 = pick([A1, A1 + R(1, 300), A1 - R(1, 300)]);
  const traiA = A1 * k1, phaiA = A1 * (k1 - 1) + s1;
  /* b) nhân liên tiếp hai lần so với nhân một lần */
  const mn = pick([[2, 2], [2, 3], [3, 2], [2, 4], [4, 2], [3, 3]]);
  const m2 = mn[0], n2 = mn[1], t2 = m2 * n2;
  const opts = [t2, t2 - 1];
  if (t2 < 9) opts.push(t2 + 1);
  const p2 = pick(opts);
  const A2 = R(1002, Math.floor(9999 / Math.max(t2, p2)));
  const traiB = A2 * m2 * n2, phaiB = A2 * p2;
  /* c) nhân một tổng với một số */
  const k3 = R(2, 4), lim = Math.floor(9999 / k3);
  const a3 = R(1002, lim - 1010), b3 = R(101, 900);
  const c3 = pick([b3, b3 + R(1, 100), b3 - R(1, 100)]);
  const traiC = (a3 + b3) * k3, phaiC = a3 * k3 + c3 * k3;
  const row = (l, s, r) => `<div class="cmp-row"><span class="side">${l}</span>
    ${q.sign(s)}<span class="side">${r}</span></div>`;
  return q.done(`<div class="sub-lbl">a)</div>
      ${row(`${b56advSp(A1)} × ${k1}`, cmp(traiA, phaiA), `${b56advSp(A1)} × ${k1 - 1} + ${b56advSp(s1)}`)}
    <div class="sub-lbl">b)</div>
      ${row(`${b56advSp(A2)} × ${m2} × ${n2}`, cmp(traiB, phaiB), `${b56advSp(A2)} × ${p2}`)}
    <div class="sub-lbl">c)</div>
      ${row(`(${b56advSp(a3)} + ${b3}) × ${k3}`, cmp(traiC, phaiC),
        `${b56advSp(a3)} × ${k3} + ${b56advSp(c3)} × ${k3}`)}
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =.
      Em có thể tính giá trị hai vế rồi so sánh.</div>`,
    `a) ${b56advSp(traiA)} và ${b56advSp(phaiA)}.  `
    + `b) ${b56advSp(A2)} × ${m2} × ${n2} = ${b56advSp(A2)} × ${t2} = ${b56advSp(traiB)}, `
    + `${b56advSp(A2)} × ${p2} = ${b56advSp(phaiB)}.  `
    + `c) ${b56advSp(traiC)} và ${b56advSp(phaiC)}.`);
},

/* 5. Bài toán có lời văn ba bước */
() => {
  const q = Q(5, '');
  const a = R(320, 900), k = R(2, 3), m = R(50, 200);
  const hai = a * k, ba = hai - m, tong = a + hai + ba;
  return q.done(`<p class="wordq">Một xưởng may có ba tổ. Tổ Một may được ${a} chiếc áo.
      Số áo tổ Hai may được gấp ${k} lần số áo tổ Một may được. Tổ Ba may được ít hơn tổ Hai
      ${m} chiếc áo. Hỏi cả ba tổ may được bao nhiêu chiếc áo?</p>
    <div class="bullet">Tổ Hai may được ${q.num(hai)} chiếc áo.</div>
    <div class="bullet">Tổ Ba may được ${q.num(ba)} chiếc áo.</div>
    <div class="bullet">Cả ba tổ may được ${q.num(tong)} chiếc áo.</div>`,
    `${a} × ${k} = ${b56advSp(hai)} (chiếc);  ${b56advSp(hai)} − ${m} = ${b56advSp(ba)} (chiếc);  `
    + `${a} + ${b56advSp(hai)} + ${b56advSp(ba)} = ${b56advSp(tong)} (chiếc)`);
},

/* 6. Sơ đồ xuôi và sơ đồ ngược (tìm số ban đầu) */
() => {
  const q = Q(6, '<span class="tag">Số</span> ?');
  const k1 = R(2, 4), A = R(1002, Math.floor(9000 / k1)), m1 = R(11, 89) * 10;
  const P1 = A * k1, K1 = P1 + m1;
  const t = R(1, 4), k2 = R(2, Math.floor(9 / t));
  const bd = t * 1000, P2 = bd * k2, m2 = R(1, 9) * 100, F = P2 - m2;
  return q.done(`<div class="sub-lbl">a)</div>
    ${b56advFlow([{h: b56advSp(A)}, {q: 1, h: q.num(P1)}, {q: 1, h: q.num(K1)}],
      [`× ${k1}`, `+ ${m1}`])}
    <div class="sub-lbl">b)</div>
    ${b56advFlow([{q: 1, h: q.num(bd)}, {q: 1, h: q.num(P2)}, {h: b56advSp(F)}],
      [`× ${k2}`, `− ${m2}`])}
    <div class="hint-line">Ở câu b) em hãy làm ngược lại: cộng trả lại số đã trừ để tìm số ở ô giữa,
      rồi tìm xem số nào nhân với ${k2} thì được số đó.</div>`,
    `a) ${b56advSp(A)} × ${k1} = ${b56advSp(P1)};  ${b56advSp(P1)} + ${m1} = ${b56advSp(K1)}.  `
    + `b) ${b56advSp(F)} + ${m2} = ${b56advSp(P2)}; `
    + `${t} nghìn × ${k2} = ${t * k2} nghìn nên số ban đầu là ${b56advSp(bd)}.`);
},
];
