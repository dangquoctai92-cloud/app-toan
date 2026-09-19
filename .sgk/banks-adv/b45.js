/* ===== NÂNG CAO — Bài 45: Các số có bốn chữ số. Số 10 000 ===== */

const b45advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b45advLen = v => String(v).length;

/* bốn chữ số khác nhau, có thể có chữ số 0 */
const b45advThe = () => {
  const nz = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5);
  return Math.random() < .5 ? nz.slice(0, 3).concat([0]).sort(() => Math.random() - .5)
                            : nz.slice(0, 4);
};

/* số bé nhất lập được từ bốn chữ số (chữ số hàng nghìn khác 0) */
const b45advBe = ds => {
  const s = ds.slice().sort((a, b) => a - b);
  if (s[0] === 0){ s[0] = s[1]; s[1] = 0; }
  return s[0] * 1000 + s[1] * 100 + s[2] * 10 + s[3];
};

const b45advChain = items => `<div class="b45adv-chain">${items.map((x, i) =>
  `<span class="b45adv-node${x.q ? ' q' : ''}">${x.h}</span>`
  + (i === items.length - 1 ? '' : '<span class="b45adv-arr">&rarr;</span>')).join('')}</div>`;

ADV.b45 = [

/* 1. Lập số lớn nhất, số bé nhất từ bốn tấm thẻ */
() => {
  const q = Q(1, 'Từ bốn tấm thẻ số dưới đây, hãy lập các số có bốn chữ số (mỗi tấm thẻ dùng một lần).');
  const ds = b45advThe();
  const lon = ds.slice().sort((a, b) => b - a).reduce((s, d) => s * 10 + d, 0);
  const be = b45advBe(ds);
  const nz = ds.filter(d => d !== 0);
  const khac = nz.filter(d => d !== Math.floor(be / 1000));
  const d0 = pick(khac.length ? khac : nz);
  const conLai = (() => { const c = ds.slice(); c.splice(c.indexOf(d0), 1); return c.sort((a, b) => a - b); })();
  const v0 = d0 * 1000 + conLai[0] * 100 + conLai[1] * 10 + conLai[2];
  return q.done(`<div class="b45adv-cards">${ds.map(d => `<div class="b45adv-card">${d}</div>`).join('')}</div>
    <div class="fill-line">Số lớn nhất lập được là ${q.num(lon, 4)}</div>
    <div class="fill-line">Số bé nhất lập được là ${q.num(be, 4)}</div>
    <div class="fill-line">Số bé nhất lập được mà có chữ số hàng nghìn là ${d0}: ${q.num(v0, 4)}</div>
    <div class="hint-line">Muốn được số lớn nhất thì xếp các chữ số từ lớn đến bé.
      Muốn được số bé nhất thì xếp các chữ số từ bé đến lớn, nhưng chữ số hàng nghìn phải khác 0.</div>`,
    `Số lớn nhất: ${b45advSp(lon)};  số bé nhất: ${b45advSp(be)};  `
    + `hàng nghìn là ${d0} thì ba chữ số còn lại xếp tăng dần: ${b45advSp(v0)}.`);
},

/* 2. Tìm số có bốn chữ số theo nhiều điều kiện */
() => {
  const q = Q(2, 'Tìm số có bốn chữ số thoả mãn tất cả các điều kiện sau.');
  const ng = R(1, 9), tr = R(0, 9), ch = R(0, 9), dv = R(0, 9);
  const n = ng * 1000 + tr * 100 + ch * 10 + dv;
  const S = ng + tr + ch + dv;
  return q.done(`<div class="bullet">Chữ số hàng nghìn là ${ng}.</div>
    <div class="bullet">Chữ số hàng trăm là ${tr}.</div>
    <div class="bullet">Chữ số hàng chục là ${ch}.</div>
    <div class="bullet">Tổng bốn chữ số của số đó bằng ${S}.</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 4)}</div>
    <div class="fill-line">Số liền trước của số đó là ${q.num(n - 1, b45advLen(n - 1))}</div>
    <div class="fill-line">Số liền sau của số đó là ${q.num(n + 1, b45advLen(n + 1))}</div>`,
    `Chữ số hàng đơn vị = ${S} − ${ng} − ${tr} − ${ch} = ${dv}, nên số đó là ${b45advSp(n)}.`);
},

/* 3. Dãy số cách đều trong phạm vi 10 000 */
() => {
  const q = Q(3, 'Viết tiếp ba số của mỗi dãy số sau.');
  const bA = pick([2, 5, 20, 100]);
  const stA = R(1, 7) * 1000 + R(0, 49) * 10;
  const bB = pick([1, 10]);
  const k = R(2, 9), stB = k * 1000 + 3 * bB;
  const mkA = i => stA + i * bA;
  const mkB = i => stB - i * bB;
  const rowA = b45advChain([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h:b45advSp(mkA(i))} : {q:1, h:q.num(mkA(i), b45advLen(mkA(i)))}));
  const rowB = b45advChain([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h:b45advSp(mkB(i))} : {q:1, h:q.num(mkB(i), b45advLen(mkB(i)))}));
  return q.done(`<div class="sub-lbl">a)</div>${rowA}
    <div class="sub-lbl">b)</div>${rowB}
    <div class="hint-line">Hãy tìm xem mỗi số hơn (hoặc kém) số liền trước bao nhiêu đơn vị.</div>`,
    `a) Dãy số tăng dần, mỗi số hơn số liền trước ${bA} đơn vị.  `
    + `b) Dãy số giảm dần, mỗi số kém số liền trước ${bB} đơn vị.`);
},

/* 4. Viết số thành tổng và từ tổng tìm số */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const A = {ng:R(1, 9), tr:R(1, 9), ch:R(1, 9), dv:R(1, 9)};
  const B = {ng:R(1, 9), tr:R(1, 9), ch:R(1, 9), dv:R(1, 9)};
  const val = x => x.ng * 1000 + x.tr * 100 + x.ch * 10 + x.dv;
  const nA = val(A), nB = val(B);
  const phanA = [`${b45advSp(A.tr * 100)}`, `${A.dv}`, `${b45advSp(A.ng * 1000)}`, `${A.ch * 10}`];
  const C = {ng:R(1, 9), tr:0, ch:R(1, 9), dv:R(1, 9)};
  const nC = val(C);
  return q.done(`<div class="b45adv-eq"><b>a)</b> ${phanA.join(' + ')} = ${q.num(nA, 4)}</div>
    <div class="b45adv-eq"><b>b)</b> ${b45advSp(nB)} = ${b45advSp(B.ng * 1000)} + ${q.num(B.tr * 100, 3)}
      + ${q.num(B.ch * 10, 2)} + ${B.dv}</div>
    <div class="b45adv-eq"><b>c)</b> Số gồm ${C.ng} nghìn, ${C.ch} chục và ${C.dv} đơn vị
      là ${q.num(nC, 4)}</div>
    <div class="hint-line">Ở câu a) các số hạng không được viết theo thứ tự các hàng,
      em hãy sắp xếp lại rồi cộng. Ở câu c) hàng trăm không có nên viết chữ số 0.</div>`,
    `a) ${b45advSp(A.ng * 1000)} + ${A.tr * 100} + ${A.ch * 10} + ${A.dv} = ${b45advSp(nA)}.  `
    + `b) ${b45advSp(nB)} = ${b45advSp(B.ng * 1000)} + ${B.tr * 100} + ${B.ch * 10} + ${B.dv}.  `
    + `c) ${b45advSp(nC)}.`);
},

/* 5. Số liền trước, số liền sau và các số tròn nghìn */
() => {
  const q = Q(5, 'Trả lời các câu hỏi sau.');
  const k = R(2, 9), M = k * 1000;
  const X = R(1, 8) * 1000 + R(1, 8) * 100 + R(1, 9) * 10 + R(1, 9);
  const nghinTruoc = Math.floor(X / 1000) * 1000;
  const nghinSau = nghinTruoc + 1000;
  const tramSau = Math.floor(X / 100) * 100 + 100;
  return q.done(`<div class="fill-line">Số liền trước của số ${b45advSp(M)} là ${q.num(M - 1, 4)}</div>
    <div class="fill-line">Số liền sau của số ${b45advSp(9999)} là ${q.num(10000, 5)}</div>
    <div class="fill-line">Số tròn nghìn lớn nhất mà bé hơn ${b45advSp(X)} là ${q.num(nghinTruoc, 4)}</div>
    <div class="fill-line">Số tròn nghìn bé nhất mà lớn hơn ${b45advSp(X)}
      là ${q.num(nghinSau, b45advLen(nghinSau))}</div>
    <div class="fill-line">Số tròn trăm bé nhất mà lớn hơn ${b45advSp(X)} là ${q.num(tramSau, 4)}</div>
    <div class="hint-line">Số tròn nghìn có ba chữ số tận cùng là 0,
      số tròn trăm có hai chữ số tận cùng là 0.</div>`,
    `${b45advSp(M)} − 1 = ${b45advSp(M - 1)};  9 999 + 1 = 10 000;  `
    + `${b45advSp(nghinTruoc)} < ${b45advSp(X)} < ${b45advSp(nghinSau)};  `
    + `số tròn trăm liền sau ${b45advSp(X)} là ${b45advSp(tramSau)}.`);
},

/* 6. Đổi chỗ các chữ số của một số có bốn chữ số */
() => {
  const q = Q(6, '');
  const ng = R(1, 9), tr = R(0, 9), ch = R(0, 9), dv = R(1, 9);
  const X = ng * 1000 + tr * 100 + ch * 10 + dv;
  const doiCho = dv * 1000 + tr * 100 + ch * 10 + ng;
  const nguoc = dv * 1000 + ch * 100 + tr * 10 + ng;
  return q.done(`<p class="wordq">Cho số ${b45advSp(X)}.</p>
    <div class="fill-line">Chữ số hàng chục của số đó là ${q.num(ch, 1)}</div>
    <div class="fill-line">Số nhận được khi đổi chỗ chữ số hàng nghìn với chữ số hàng đơn vị
      là ${q.num(doiCho, 4)}</div>
    <div class="fill-line">Số nhận được khi viết các chữ số của số đó theo thứ tự ngược lại
      là ${q.num(nguoc, 4)}</div>
    <div class="hint-line">Hãy tách số đã cho thành các nghìn, trăm, chục và đơn vị,
      rồi xếp lại các chữ số đó theo yêu cầu của từng câu.</div>`,
    `Đổi chỗ chữ số hàng nghìn với chữ số hàng đơn vị được ${b45advSp(doiCho)};  `
    + `viết ngược lại các chữ số ${ng}, ${tr}, ${ch}, ${dv} được ${b45advSp(nguoc)}.`);
},
];
