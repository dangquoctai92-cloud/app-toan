/*CSS
.b60adv-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b60adv-card{width:48px;height:66px;border:3px solid #6aa9e0;border-radius:9px;background:#f2f8ff;
  display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#1f5c96}
.b60adv-nums{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b60adv-nums span{background:#eaf4ff;border:2.5px solid #8fb8e6;border-radius:10px;padding:5px 12px;
  font-size:19px;font-weight:800;color:#1f4e86}
.b60adv-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:8px 0;font-size:19px;font-weight:700}
.b60adv-let{color:#d63384;font-weight:800;margin-right:4px}
.b60adv-dig{font-size:22px;font-weight:800;letter-spacing:1px;color:#22406b}
.b60adv-dig i{display:inline-block;width:9px}
.b60adv-dig u{text-decoration:none;color:#d63384;background:#ffe9f2;border:2px solid #f0a6c4;
  border-radius:6px;padding:0 5px}
.b60adv-chain{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:8px 0}
.b60adv-node{background:#dff0c8;border:2.5px solid #94c46a;border-radius:11px;padding:6px 10px;
  font-size:17px;font-weight:800;color:#2f5320;white-space:nowrap}
.b60adv-node.q{background:#fff5d6;border-color:#e8c05a}
.b60adv-arr{color:#1f9fc4;font-size:19px;font-weight:800}
.b60adv-eq{margin:8px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#eef4ff;
  border:2.5px solid #b8cdf0;border-radius:12px;padding:8px 14px;display:flex;flex-wrap:wrap;
  align-items:center;gap:7px}
.b60adv-eq b{color:#d63384;margin-right:2px}
CSS*/

/* ===== NÂNG CAO — Bài 60: So sánh các số trong phạm vi 100 000 ===== */

/* viết số có nhóm ba chữ số cách nhau: 41 217 */
const b60advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* viết số thành tổng các chục nghìn, nghìn, trăm, chục, đơn vị */
const b60advSum = n => {
  const out = [];
  [10000, 1000, 100, 10, 1].forEach(u => {
    const d = Math.floor(n / u) % 10;
    if (d) out.push(b60advSp(d * u));
  });
  return out.join(' + ');
};

/* năm chữ số khác nhau, có thể có chữ số 0 */
const b60advThe = () => {
  const nz = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5);
  return Math.random() < .5 ? nz.slice(0, 4).concat([0]).sort(() => Math.random() - .5)
                            : nz.slice(0, 5);
};

/* dãy năm chữ số, cách nhóm nghìn; mark = vị trí ô "?" */
const b60advCells = (arr, mark) => '<span class="b60adv-dig">' + arr.map((c, i) =>
  (i === 2 ? '<i></i>' : '') + (i === mark ? `<u>${c}</u>` : c)).join('') + '</span>';

const b60advChain = items => `<div class="b60adv-chain">${items.map((x, i) =>
  `<span class="b60adv-node${x.q ? ' q' : ''}">${x.h}</span>`
  + (i === items.length - 1 ? '' : '<span class="b60adv-arr">&rarr;</span>')).join('')}</div>`;

const b60advCmp = (a, b) => a > b ? '>' : a < b ? '<' : '=';

ADV.b60 = [

/* 1. Lập số có năm chữ số từ năm tấm thẻ */
() => {
  const q = Q(1, 'Từ năm tấm thẻ số dưới đây, hãy lập các số có năm chữ số (mỗi tấm thẻ dùng một lần).');
  const ds = b60advThe();
  const gi = ds.slice().sort((a, b) => b - a);          /* giảm dần */
  const lon = gi.reduce((s, d) => s * 10 + d, 0);
  const t2 = gi.slice(0, 3).concat([gi[4], gi[3]]);     /* đổi chỗ hai chữ số cuối */
  const lon2 = t2.reduce((s, d) => s * 10 + d, 0);
  const ta = ds.slice().sort((a, b) => a - b);          /* tăng dần */
  if (ta[0] === 0){ ta[0] = ta[1]; ta[1] = 0; }
  const be = ta.reduce((s, d) => s * 10 + d, 0);
  const dv = pick(ds);
  const conLai = (() => { const c = ds.slice(); c.splice(c.indexOf(dv), 1); return c.sort((a, b) => b - a); })();
  const vdv = conLai.reduce((s, d) => s * 10 + d, 0) * 10 + dv;
  return q.done(`<div class="b60adv-cards">${ds.map(d => `<div class="b60adv-card">${d}</div>`).join('')}</div>
    <div class="fill-line">Số lớn nhất lập được là ${q.num(lon, 5)}</div>
    <div class="fill-line">Số bé nhất lập được là ${q.num(be, 5)}</div>
    <div class="fill-line">Số lớn nhất trong những số còn lại (số lớn thứ hai) là ${q.num(lon2, 5)}</div>
    <div class="fill-line">Số lớn nhất lập được mà có chữ số hàng đơn vị là ${dv}: ${q.num(vdv, 5)}</div>
    <div class="hint-line">Muốn được số lớn nhất thì xếp các chữ số từ lớn đến bé; muốn được số bé nhất
      thì xếp từ bé đến lớn nhưng chữ số hàng chục nghìn phải khác 0. Muốn được số lớn thứ hai thì chỉ
      cần đổi chỗ hai chữ số cuối của số lớn nhất.</div>`,
    `Số lớn nhất: ${b60advSp(lon)};  số bé nhất: ${b60advSp(be)};  `
    + `số lớn thứ hai: ${b60advSp(lon2)};  giữ chữ số hàng đơn vị là ${dv}, bốn chữ số còn lại `
    + `xếp giảm dần được ${b60advSp(vdv)}.`);
},

/* 2. Tìm tất cả các chữ số thích hợp */
() => {
  const q = Q(2, 'Tìm tất cả các chữ số thích hợp thay cho dấu ? trong mỗi câu sau.');
  const mk = sign => {
    const p = R(1, 2);                                   /* ô ? ở hàng nghìn hoặc hàng trăm */
    const head = [R(1, 9)];
    while (head.length < p) head.push(R(0, 9));
    const m = R(1, 8);                                   /* chữ số của số bên kia tại vị trí đó */
    const tail = 4 - p, lt = [], rt = [];
    for (let i = 0; i < tail; i++){ lt.push(R(0, 9)); rt.push(R(0, 9)); }
    if (lt.join('') === rt.join('')) rt[tail - 1] = (rt[tail - 1] + 1) % 10;
    const val = a => +a.join('');
    const right = val(head.concat([m], rt));
    const ok = [];
    for (let d = 0; d <= 9; d++){
      const left = val(head.concat([d], lt));
      if (sign === '<' ? left < right : left > right) ok.push(String(d));
    }
    return {head, p, m, lt, rt, sign, ok, right};
  };
  const its = ['<', '>'].sort(() => Math.random() - .5).map(mk);
  const DIGS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const L = ['a)', 'b)'];
  const html = its.map((it, i) =>
    `<div class="b60adv-row"><span class="b60adv-let">${L[i]}</span>
      ${b60advCells(it.head.concat(['?'], it.lt), it.p)}
      <span class="op">${it.sign === '<' ? '&lt;' : '&gt;'}</span>
      ${b60advCells(it.head.concat([it.m], it.rt))}</div>
     <div class="fill-line">Các chữ số thích hợp: ${q.pick(it.ok.join(','), DIGS)}</div>`).join('')
    + `<div class="hint-line">Hãy so sánh từng hàng từ trái sang phải. Nhớ xét cả trường hợp chữ số
        cần tìm bằng chữ số cùng hàng của số kia rồi mới so sánh các hàng đứng sau.</div>`;
  return q.done(html, its.map((it, i) =>
    `${L[i]} thay ? bởi ${it.ok.join(', ')} thì được ${it.sign === '<' ? 'số bé hơn' : 'số lớn hơn'} `
    + `${b60advSp(it.right)}`).join(';  '));
},

/* 3. Suy luận: số dân của bốn huyện */
() => {
  const q = Q(3, 'Bốn huyện A, B, C, D có số dân (không theo thứ tự) là các số dưới đây.');
  const sp = b60advSp;
  const vals = [];
  for (let g = 0; g < 300 && vals.length < 4; g++){
    const v = R(21, 89) * 1000 + R(0, 999);
    if (!vals.includes(v)) vals.push(v);
  }
  while (vals.length < 4){
    let v = 21000;
    for (let t = 0; t < 60 && vals.includes(v); t++) v += 137;
    vals.push(v);
  }
  const gi = vals.slice().sort((x, y) => y - x);          /* từ lớn đến bé */
  const L = ['A', 'B', 'C', 'D'].sort(() => Math.random() - .5);
  const soDan = {};
  L.forEach((c, i) => { soDan[c] = gi[i]; });
  const xao = vals.slice().sort(() => Math.random() - .5);
  const NM = ['A', 'B', 'C', 'D'];
  const html = `<div class="b60adv-nums">${xao.map(v => `<span>${sp(v)}</span>`).join('')}</div>
    <div class="bullet">Huyện ${L[0]} có số dân nhiều nhất.</div>
    <div class="bullet">Huyện ${L[1]} có số dân nhiều hơn huyện ${L[2]}.</div>
    <div class="bullet">Huyện ${L[3]} có số dân ít hơn huyện ${L[2]}.</div>
    ${NM.map(c => `<div class="fill-line">Huyện ${c} có ${q.num(soDan[c])} người.</div>`).join('')}
    <div class="fill-line">Huyện có số dân ít nhất là huyện ${q.pick(L[3], NM)}</div>
    <div class="hint-line">Trước hết hãy sắp xếp bốn số đã cho từ lớn đến bé, sau đó dựa vào các
      dữ kiện để tìm chỗ của từng huyện.</div>`;
  return q.done(html,
    `Sắp xếp từ lớn đến bé: ${gi.map(sp).join(' > ')}. Theo các dữ kiện thì `
    + `${L[0]} > ${L[1]} > ${L[2]} > ${L[3]}, nên huyện ${L[0]}: ${sp(gi[0])} người; `
    + `huyện ${L[1]}: ${sp(gi[1])} người; huyện ${L[2]}: ${sp(gi[2])} người; `
    + `huyện ${L[3]}: ${sp(gi[3])} người.`);
},

/* 4. Toán ngược: tìm số theo điều kiện lớn hơn, bé hơn */
() => {
  const q = Q(4, 'Cho số dưới đây, hãy tìm các số theo yêu cầu.');
  const sp = b60advSp;
  const cn = R(1, 8), ng = R(1, 8), tr = R(1, 9), ch = R(1, 9), dv = R(1, 9);
  const N = cn * 10000 + ng * 1000 + tr * 100 + ch * 10 + dv;
  const tnTruoc = cn * 10000 + ng * 1000;
  const tnSau = tnTruoc + 1000;
  const cnSau = (cn + 1) * 10000;
  return q.done(`<div class="b60adv-nums"><span>${sp(N)}</span></div>
    <div class="fill-line">Số lớn nhất có năm chữ số mà bé hơn ${sp(N)} là ${q.num(N - 1, 5)}</div>
    <div class="fill-line">Số bé nhất có năm chữ số mà lớn hơn ${sp(N)} là ${q.num(N + 1, 5)}</div>
    <div class="fill-line">Số tròn nghìn lớn nhất mà bé hơn ${sp(N)} là ${q.num(tnTruoc, 5)}</div>
    <div class="fill-line">Số tròn nghìn bé nhất mà lớn hơn ${sp(N)} là ${q.num(tnSau, 5)}</div>
    <div class="fill-line">Số tròn chục nghìn bé nhất mà lớn hơn ${sp(N)} là ${q.num(cnSau, 5)}</div>
    <div class="hint-line">Số tròn nghìn có ba chữ số tận cùng là 0, số tròn chục nghìn có bốn chữ số
      tận cùng là 0.</div>`,
    `${sp(N - 1)} < ${sp(N)} < ${sp(N + 1)};  `
    + `${sp(tnTruoc)} < ${sp(N)} < ${sp(tnSau)};  số tròn chục nghìn liền sau là ${sp(cnSau)}.`);
},

/* 5. So sánh biểu thức viết theo các hàng */
() => {
  const q = Q(5, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const sp = b60advSp;
  const mkN = () => R(2, 8) * 10000 + R(1, 8) * 1000 + R(1, 8) * 100 + R(1, 8) * 10 + R(1, 8);
  const lech = () => pick([0, 0, 10, -10, 100, -100, 1000, -1000, 10000, -10000]);
  const n1 = mkN(), m1 = n1 + lech();
  const n2 = mkN(), m2 = n2 + lech();
  const a3 = R(2, 8), b3 = R(1, 9), c3 = R(1, 9), d3 = R(1, 9);
  const v3 = a3 * 10000 + b3 * 1000 + c3 * 100 + d3;
  const m3 = v3 + pick([0, 0, 1, -1, 10, -10, 100, -100]);
  const html = `<div class="b60adv-eq"><b>a)</b> ${b60advSum(n1)} ${q.sign(b60advCmp(n1, m1))} ${sp(m1)}</div>
    <div class="b60adv-eq"><b>b)</b> ${sp(n2)} ${q.sign(b60advCmp(n2, m2))} ${b60advSum(m2)}</div>
    <div class="b60adv-eq"><b>c)</b> Số gồm ${a3} chục nghìn, ${b3} nghìn, ${c3} trăm và ${d3} đơn vị
      ${q.sign(b60advCmp(v3, m3))} ${sp(m3)}</div>
    <div class="hint-line">Hãy tính giá trị của mỗi vế trước rồi mới so sánh.
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`;
  return q.done(html,
    `a) ${b60advSum(n1)} = ${sp(n1)} nên ${sp(n1)} ${b60advCmp(n1, m1)} ${sp(m1)};  `
    + `b) ${b60advSum(m2)} = ${sp(m2)} nên ${sp(n2)} ${b60advCmp(n2, m2)} ${sp(m2)};  `
    + `c) số đó là ${sp(v3)} (hàng chục không có nên viết chữ số 0), `
    + `${sp(v3)} ${b60advCmp(v3, m3)} ${sp(m3)}.`);
},

/* 6. Dãy số cách đều trong phạm vi 100 000 */
() => {
  const q = Q(6, 'Tìm quy luật rồi viết tiếp ba số của mỗi dãy số sau.');
  const bA = pick([100, 500, 1000, 2000]);
  const stA = R(10, 45) * 1000 + (bA === 100 ? R(0, 9) * 100 : 0);
  const bB = pick([100, 500, 1000, 2000]);
  const stB = R(60, 95) * 1000 + (bB === 100 ? R(0, 9) * 100 : 0);
  const mkA = i => stA + i * bA;
  const mkB = i => stB - i * bB;
  const rowA = b60advChain([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h:b60advSp(mkA(i))} : {q:1, h:q.num(mkA(i))}));
  const rowB = b60advChain([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h:b60advSp(mkB(i))} : {q:1, h:q.num(mkB(i))}));
  return q.done(`<div class="sub-lbl">a)</div>${rowA}
    <div class="sub-lbl">b)</div>${rowB}
    <div class="hint-line">Hãy xem mỗi số hơn (hoặc kém) số liền trước bao nhiêu đơn vị.</div>`,
    `a) Dãy số tăng dần, mỗi số hơn số liền trước ${b60advSp(bA)} đơn vị.  `
    + `b) Dãy số giảm dần, mỗi số kém số liền trước ${b60advSp(bB)} đơn vị.`);
},
];
