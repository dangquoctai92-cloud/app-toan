/*CSS
.b59adv-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b59adv-card{width:50px;height:68px;border:3px solid #7fb4e0;border-radius:9px;background:#eef6ff;
  display:flex;align-items:center;justify-content:center;font-size:29px;font-weight:800;color:#1c5a8f}
.b59adv-eq{margin:8px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#f3eeff;
  border:2.5px solid #c3b4ea;border-radius:12px;padding:8px 14px;display:flex;flex-wrap:wrap;
  align-items:center;gap:6px}
.b59adv-eq b{color:#d63384;margin-right:2px}
.b59adv-chain{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:8px 0}
.b59adv-node{background:#d9f0e2;border:2.5px solid #6fbf95;border-radius:11px;padding:6px 10px;
  font-size:17px;font-weight:800;color:#155c3a;white-space:nowrap}
.b59adv-node.q{background:#fff5d6;border-color:#e8c05a}
.b59adv-arr{color:#1f9fc4;font-size:19px;font-weight:800}
.b59adv-read{display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;font-size:18px;
  font-weight:700;line-height:1.9;margin:4px 0}
CSS*/

/* ===== NÂNG CAO — Bài 59: Các số có năm chữ số. Số 100 000 ===== */

/* viết số theo kiểu sách: 42 305 */
const b59advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b59advLen = v => String(v).length;

/* ----- đọc số đến 100 000 (readNum của app chỉ đúng với số ≤ 1 000) ----- */
const B59ADV_DV = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

function b59advTwo(n){                       /* 0 – 99 */
  if (n < 10) return B59ADV_DV[n];
  const c = Math.floor(n / 10), d = n % 10;
  const s = c === 1 ? 'mười' : B59ADV_DV[c] + ' mươi';
  if (d === 0) return s;
  if (d === 1) return s + (c === 1 ? ' một' : ' mốt');
  if (d === 4) return s + (c === 1 ? ' bốn' : ' tư');
  if (d === 5) return s + ' lăm';
  return s + ' ' + B59ADV_DV[d];
}

function b59advThree(n, full){               /* 0 – 999; full = đọc cả "không trăm" */
  const t = Math.floor(n / 100), r = n % 100;
  if (t === 0){
    if (!full) return b59advTwo(r);
    if (r === 0) return '';
    return 'không trăm ' + (r < 10 ? 'linh ' + (r === 4 ? 'tư' : B59ADV_DV[r]) : b59advTwo(r));
  }
  const s = B59ADV_DV[t] + ' trăm';
  if (r === 0) return s;
  if (r < 10) return s + ' linh ' + (r === 4 ? 'tư' : B59ADV_DV[r]);
  return s + ' ' + b59advTwo(r);
}

function b59advRead(n){                      /* 0 – 100 000 */
  if (n === 100000) return 'một trăm nghìn';
  const ng = Math.floor(n / 1000), r = n % 1000;
  if (ng === 0) return b59advThree(r, false);
  const s = b59advTwo(ng) + ' nghìn';
  return r === 0 ? s : s + ' ' + b59advThree(r, true);
}

function b59advAlts(n){
  const swap = (arr, a, b) => arr.concat(arr.filter(s => s.includes(a)).map(s => s.split(a).join(b)));
  let out = [b59advRead(n)];
  out = swap(out, ' mốt', ' một');
  out = swap(out, ' tư', ' bốn');
  out = swap(out, ' lăm', ' năm');
  out = swap(out, ' linh ', ' lẻ ');
  out = swap(out, ' không trăm ', ' ');
  return [...new Set(out)];
}

/* ô nhập chữ cho số có năm chữ số (dùng đúng cấu trúc blank của app) */
function b59advTxt(q, n){
  q.B.push({a: b59advRead(n), alts: b59advAlts(n), text: true});
  return `<input class="qin qtxt" data-b="${q.B.length - 1}" placeholder="?">`;
}

/* năm chữ số khác nhau, có thể có chữ số 0 */
const b59advThe = () => {
  const nz = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5);
  return Math.random() < .5 ? nz.slice(0, 4).concat([0]).sort(() => Math.random() - .5)
                            : nz.slice(0, 5);
};

/* số bé nhất lập được từ năm chữ số (chữ số hàng chục nghìn khác 0) */
const b59advBe = ds => {
  const s = ds.slice().sort((a, b) => a - b);
  if (s[0] === 0){ s[0] = s[1]; s[1] = 0; }
  return s.reduce((x, d) => x * 10 + d, 0);
};

const b59advChain = items => `<div class="b59adv-chain">${items.map((x, i) =>
  `<span class="b59adv-node${x.q ? ' q' : ''}">${x.h}</span>`
  + (i === items.length - 1 ? '' : '<span class="b59adv-arr">&rarr;</span>')).join('')}</div>`;

ADV.b59 = [

/* 1. Lập số có năm chữ số từ năm tấm thẻ số */
() => {
  const q = Q(1, 'Từ năm tấm thẻ số dưới đây, hãy lập các số có năm chữ số '
    + '(mỗi tấm thẻ dùng một lần).');
  const ds = b59advThe();
  const lon = ds.slice().sort((a, b) => b - a).reduce((x, d) => x * 10 + d, 0);
  const be = b59advBe(ds);
  const dauBe = Math.floor(be / 10000);
  const nz = ds.filter(d => d !== 0);
  const khac = nz.filter(d => d !== dauBe);
  const d0 = pick(khac.length ? khac : nz);
  const conLai = (() => { const c = ds.slice(); c.splice(c.indexOf(d0), 1); return c.sort((a, b) => a - b); })();
  const v0 = conLai.reduce((x, d) => x * 10 + d, d0);
  return q.done(`<div class="b59adv-cards">${ds.map(d => `<div class="b59adv-card">${d}</div>`).join('')}</div>
    <div class="fill-line">Số lớn nhất lập được là ${q.num(lon, 5)}</div>
    <div class="fill-line">Số bé nhất lập được là ${q.num(be, 5)}</div>
    <div class="fill-line">Số bé nhất lập được mà có chữ số hàng chục nghìn là ${d0}:
      ${q.num(v0, 5)}</div>
    <div class="b59adv-read"><span>Đọc số lớn nhất vừa lập được:</span>${b59advTxt(q, lon)}</div>
    <div class="hint-line">Muốn được số lớn nhất thì xếp các chữ số từ lớn đến bé.
      Muốn được số bé nhất thì xếp các chữ số từ bé đến lớn, nhưng chữ số hàng chục nghìn
      phải khác 0.</div>`,
    `Số lớn nhất: ${b59advSp(lon)};  số bé nhất: ${b59advSp(be)};  `
    + `hàng chục nghìn là ${d0} thì bốn chữ số còn lại xếp tăng dần: ${b59advSp(v0)};  `
    + `${b59advSp(lon)} đọc là ${b59advRead(lon)}.`);
},

/* 2. Tìm số có năm chữ số thoả mãn nhiều điều kiện */
() => {
  const q = Q(2, 'Tìm số có năm chữ số thoả mãn tất cả các điều kiện sau.');
  const cn = R(1, 9), ng = R(0, 9), tr = R(0, 9), ch = R(0, 9), dv = R(0, 9);
  const n = cn * 10000 + ng * 1000 + tr * 100 + ch * 10 + dv;
  const S = cn + ng + tr + ch + dv;
  return q.done(`<div class="bullet">Chữ số hàng chục nghìn là ${cn}.</div>
    <div class="bullet">Chữ số hàng nghìn là ${ng}.</div>
    <div class="bullet">Chữ số hàng trăm là ${tr}.</div>
    <div class="bullet">Chữ số hàng chục là ${ch}.</div>
    <div class="bullet">Tổng năm chữ số của số đó bằng ${S}.</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 5)}</div>
    <div class="fill-line">Số liền trước của số đó là ${q.num(n - 1, b59advLen(n - 1))}</div>
    <div class="fill-line">Số liền sau của số đó là ${q.num(n + 1, b59advLen(n + 1))}</div>
    <div class="hint-line">Lấy tổng năm chữ số trừ đi bốn chữ số đã biết
      thì được chữ số hàng đơn vị.</div>`,
    `Chữ số hàng đơn vị = ${S} − ${cn} − ${ng} − ${tr} − ${ch} = ${dv}, `
    + `nên số cần tìm là ${b59advSp(n)}.`);
},

/* 3. Dãy số cách đều trong phạm vi 100 000 */
() => {
  const q = Q(3, 'Viết tiếp ba số của mỗi dãy số sau.');
  const bA = pick([1, 2, 5, 10, 100, 1000]);
  const stA = R(1, 8) * 10000 + R(0, 99) * 10;
  const bB = pick([1, 10, 100]);
  const k = R(2, 9), stB = k * 10000 + 3 * bB;
  const mkA = i => stA + i * bA;
  const mkB = i => stB - i * bB;
  const rowA = b59advChain([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h: b59advSp(mkA(i))} : {q: 1, h: q.num(mkA(i), b59advLen(mkA(i)))}));
  const rowB = b59advChain([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h: b59advSp(mkB(i))} : {q: 1, h: q.num(mkB(i), b59advLen(mkB(i)))}));
  return q.done(`<div class="sub-lbl">a)</div>${rowA}
    <div class="sub-lbl">b)</div>${rowB}
    <div class="hint-line">Hãy tìm xem mỗi số hơn (hoặc kém) số liền trước bao nhiêu đơn vị.</div>`,
    `a) Dãy số tăng dần, mỗi số hơn số liền trước ${bA} đơn vị: ${[0,1,2,3,4,5,6].map(i => b59advSp(mkA(i))).join(', ')}.  `
    + `b) Dãy số giảm dần, mỗi số kém số liền trước ${bB} đơn vị: ${[0,1,2,3,4,5,6].map(i => b59advSp(mkB(i))).join(', ')}.`);
},

/* 4. Viết số thành tổng và từ tổng tìm số */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const A = {cn: R(1, 9), ng: R(1, 9), tr: R(1, 9), ch: R(1, 9), dv: R(1, 9)};
  const B = {cn: R(1, 9), ng: R(1, 9), tr: R(1, 9), ch: R(1, 9), dv: R(1, 9)};
  const val = x => x.cn * 10000 + x.ng * 1000 + x.tr * 100 + x.ch * 10 + x.dv;
  const nA = val(A), nB = val(B);
  const phanA = [b59advSp(A.tr * 100), String(A.dv), b59advSp(A.cn * 10000),
    String(A.ch * 10), b59advSp(A.ng * 1000)];
  const C = {cn: R(1, 9), ng: 0, tr: R(1, 9), ch: 0, dv: R(1, 9)};
  const nC = val(C);
  return q.done(`<div class="b59adv-eq"><b>a)</b> ${phanA.join(' + ')} = ${q.num(nA, 5)}</div>
    <div class="b59adv-eq"><b>b)</b> ${b59advSp(nB)} = ${b59advSp(B.cn * 10000)}
      + ${q.num(B.ng * 1000, 4)} + ${q.num(B.tr * 100, 3)} + ${B.ch * 10} + ${B.dv}</div>
    <div class="b59adv-eq"><b>c)</b> Số gồm ${C.cn} chục nghìn, ${C.tr} trăm và ${C.dv} đơn vị
      là ${q.num(nC, 5)}</div>
    <div class="hint-line">Ở câu a) các số hạng không được viết theo thứ tự các hàng,
      em hãy sắp xếp lại theo hàng rồi cộng. Ở câu c) hàng nghìn và hàng chục không có
      nên viết chữ số 0.</div>`,
    `a) ${b59advSp(A.cn * 10000)} + ${b59advSp(A.ng * 1000)} + ${A.tr * 100} + ${A.ch * 10} `
    + `+ ${A.dv} = ${b59advSp(nA)}.  `
    + `b) ${b59advSp(nB)} = ${b59advSp(B.cn * 10000)} + ${b59advSp(B.ng * 1000)} + ${B.tr * 100} `
    + `+ ${B.ch * 10} + ${B.dv}.  c) ${b59advSp(nC)}.`);
},

/* 5. Số liền trước, số liền sau, số tròn nghìn và tròn chục nghìn */
() => {
  const q = Q(5, 'Trả lời các câu hỏi sau.');
  const k = R(2, 9), M = k * 10000;
  const X = R(1, 8) * 10000 + R(1, 9) * 1000 + R(1, 9) * 100 + R(1, 9) * 10 + R(1, 9);
  const nghinTruoc = Math.floor(X / 1000) * 1000;
  const nghinSau = nghinTruoc + 1000;
  const cnSau = Math.floor(X / 10000) * 10000 + 10000;
  return q.done(`<div class="fill-line">Số liền trước của số ${b59advSp(M)}
      là ${q.num(M - 1, 5)}</div>
    <div class="fill-line">Số liền sau của số ${b59advSp(99999)} là ${q.num(100000, 6)}</div>
    <div class="fill-line">Số tròn nghìn lớn nhất mà bé hơn ${b59advSp(X)}
      là ${q.num(nghinTruoc, 5)}</div>
    <div class="fill-line">Số tròn nghìn bé nhất mà lớn hơn ${b59advSp(X)}
      là ${q.num(nghinSau, b59advLen(nghinSau))}</div>
    <div class="fill-line">Số tròn chục nghìn bé nhất mà lớn hơn ${b59advSp(X)}
      là ${q.num(cnSau, b59advLen(cnSau))}</div>
    <div class="hint-line">Số tròn nghìn có ba chữ số tận cùng là 0,
      số tròn chục nghìn có bốn chữ số tận cùng là 0.</div>`,
    `${b59advSp(M)} − 1 = ${b59advSp(M - 1)};  99 999 + 1 = 100 000;  `
    + `${b59advSp(nghinTruoc)} < ${b59advSp(X)} < ${b59advSp(nghinSau)};  `
    + `số tròn chục nghìn liền sau ${b59advSp(X)} là ${b59advSp(cnSau)}.`);
},

/* 6. Số lớn nhất, số bé nhất có năm chữ số theo điều kiện */
() => {
  const q = Q(6, 'Viết số thích hợp vào chỗ chấm.');
  const d = R(1, 9);
  const e = R(1, 9);
  return q.done(`<div class="fill-line">a) Số bé nhất có năm chữ số là ${q.num(10000, 5)}</div>
    <div class="fill-line">b) Số lớn nhất có năm chữ số là ${q.num(99999, 5)}</div>
    <div class="fill-line">c) Số lớn nhất có năm chữ số mà chữ số hàng chục nghìn là ${d}
      là ${q.num(d * 10000 + 9999, 5)}</div>
    <div class="fill-line">d) Số bé nhất có năm chữ số mà chữ số hàng đơn vị là ${e}
      là ${q.num(10000 + e, 5)}</div>
    <div class="fill-line">e) Số bé nhất có năm chữ số mà các chữ số đều khác nhau
      là ${q.num(10234, 5)}</div>
    <div class="fill-line">g) Số lớn nhất có năm chữ số mà các chữ số đều khác nhau
      là ${q.num(98765, 5)}</div>
    <div class="hint-line">Muốn được số bé nhất thì mỗi hàng, kể từ hàng chục nghìn,
      đều chọn chữ số bé nhất có thể (chữ số hàng chục nghìn phải khác 0).
      Muốn được số lớn nhất thì mỗi hàng đều chọn chữ số lớn nhất có thể.</div>`,
    `a) 10 000;  b) 99 999;  c) ${b59advSp(d * 10000 + 9999)};  d) ${b59advSp(10000 + e)};  `
    + `e) 10 234;  g) 98 765.`);
},
];
