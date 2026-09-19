/*CSS
.b46adv-side{min-width:150px}
.b46adv-nums{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 12px;margin:10px 0}
.b46adv-cell{min-width:96px;padding:8px 12px;border:2.5px solid #9ec7d6;border-radius:12px;
  background:#eef8fc;font-size:19px;font-weight:800;color:#26506b;text-align:center}
.b46adv-cell em{display:block;font-style:normal;font-size:13px;color:#d63384;margin-bottom:2px}
.b46adv-dig{display:inline-flex;flex-wrap:wrap;align-items:center;gap:5px;font-size:20px;
  font-weight:800;color:#2b3a5a}
.b46adv-row{margin:8px 0;display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:18px;
  font-weight:700;color:#2b3a5a}
.b46adv-row b{color:#d63384;margin-right:2px}
.b46adv-blank{display:inline-block;min-width:26px;padding:1px 6px;border:2px dashed #d63384;
  border-radius:6px;color:#d63384;text-align:center}
CSS*/

/* ===== NÂNG CAO — Bài 46: So sánh các số trong phạm vi 10 000 ===== */

const b46advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b46advLen = v => String(v).length;

/* n số có bốn chữ số khác nhau đôi một */
const b46advSo = n => {
  const out = [];
  for (let g = 0; g < 400 && out.length < n; g++){
    const v = R(1000, 9999);
    if (!out.includes(v)) out.push(v);
  }
  while (out.length < n) out.push(1000 + out.length);
  return out;
};

/* số lớn nhất (hoặc bé nhất) có bốn chữ số khác nhau, biết chữ số hàng nghìn */
const b46advKhacNhau = (d, lon) => {
  const con = [];
  const nguon = lon ? [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (const x of nguon){ if (x !== d && con.length < 3) con.push(x); }
  return d * 1000 + con[0] * 100 + con[1] * 10 + con[2];
};

ADV.b46 = [

/* 1. So sánh số với số và số với tổng */
() => {
  const q = Q(1, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const n1 = R(1101, 9800);
  const v1 = n1 + pick([-10, -1, 1, 10, 100, -100]);
  const ng = R(1, 9), tr = R(1, 9), ch = R(1, 9), dv = R(1, 9);
  const n2 = ng * 1000 + tr * 100 + ch * 10 + dv;
  const v2 = n2 + pick([0, 0, -1, 1, -10, 10]);
  const dao = Math.random() < .5;
  const n4 = R(1, 9) * 1000 + R(0, 9) * 100, ch4 = R(0, 8);
  const nho4 = n4 + ch4 * 10 + R(0, 9);
  const to4 = n4 + (ch4 + 1) * 10 + R(0, 9);
  const doi4 = Math.random() < .5;
  const a4 = doi4 ? to4 : nho4, b4 = doi4 ? nho4 : to4;
  const p5 = b46advSo(2);
  const rows = [
    {t:b46advSp(n1), p:b46advSp(v1), l:n1, r:v1},
    {t:`${b46advSp(ng * 1000)} + ${tr * 100} + ${ch * 10} + ${dv}`, p:b46advSp(v2), l:n2, r:v2},
    dao ? {t:b46advSp(9999), p:b46advSp(10000), l:9999, r:10000}
        : {t:b46advSp(10000), p:b46advSp(9999), l:10000, r:9999},
    {t:b46advSp(a4), p:b46advSp(b4), l:a4, r:b4},
    {t:b46advSp(p5[0]), p:b46advSp(p5[1]), l:p5[0], r:p5[1]}
  ];
  const L = ['a)', 'b)', 'c)', 'd)', 'e)'];
  return q.done(`<div class="two-col"><div>${rows.map((x, i) =>
      `<div class="cmp-row"><b>${L[i]}</b><span class="side b46adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')
      }<span class="side b46adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Số nào có nhiều chữ số hơn thì lớn hơn. Nếu cùng số chữ số thì so sánh
      lần lượt từng cặp chữ số kể từ hàng cao nhất · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map((x, i) => `${L[i]} ${b46advSp(x.l)} và ${b46advSp(x.r)}`).join(';  '));
},

/* 2. Sắp xếp và chọn các số theo điều kiện */
() => {
  const q = Q(2, 'Cho các số sau.');
  const ms = b46advSo(5);
  const L = ['A', 'B', 'C', 'D', 'E'];
  const sx = ms.slice().sort((a, b) => a - b);
  const giua = sx[2];
  const lonHon = ms.map((v, i) => ({v, L:L[i]})).filter(x => x.v > giua).map(x => x.L).sort();
  const beHon = ms.map((v, i) => ({v, L:L[i]})).filter(x => x.v < giua).map(x => x.L).sort();
  return q.done(`<div class="b46adv-nums">${ms.map((v, i) =>
      `<div class="b46adv-cell"><em>${L[i]}</em>${b46advSp(v)}</div>`).join('')}</div>
    <div class="fill-line">Số lớn nhất trong các số đó là ${q.num(sx[4], 4)}</div>
    <div class="fill-line">Số bé nhất trong các số đó là ${q.num(sx[0], 4)}</div>
    <div class="fill-line">Số lớn thứ hai trong các số đó là ${q.num(sx[3], 4)}</div>
    <div class="fill-line">Các số lớn hơn ${b46advSp(giua)} là: ${q.pick(lonHon.join(','), L)}</div>
    <div class="fill-line">Các số bé hơn ${b46advSp(giua)} là: ${q.pick(beHon.join(','), L)}</div>
    <div class="hint-line">Hãy sắp xếp các số theo thứ tự từ bé đến lớn rồi trả lời.</div>`,
    `Thứ tự từ bé đến lớn: ${sx.map(b46advSp).join(' < ')}.`);
},

/* 3. Tìm số nằm giữa hai số cho trước */
() => {
  const q = Q(3, 'Trả lời các câu hỏi sau.');
  const goc = R(1, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10;
  const A = goc + R(0, 2), B = goc + R(7, 9);
  const d = R(A % 10 + 2, B % 10 - 2);
  const n = goc + d;
  return q.done(`<div class="bullet">Số cần tìm là số có bốn chữ số, lớn hơn ${b46advSp(A)}
      và bé hơn ${b46advSp(B)}.</div>
    <div class="bullet">Chữ số hàng đơn vị của số cần tìm là ${d}.</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 4)}</div>
    <div class="fill-line">Số bé nhất lớn hơn ${b46advSp(A)} là ${q.num(A + 1, 4)}</div>
    <div class="fill-line">Số lớn nhất bé hơn ${b46advSp(B)} là ${q.num(B - 1, 4)}</div>
    <div class="fill-line">Có tất cả ${q.num(B - A - 1, 1)} số lớn hơn ${b46advSp(A)}
      và bé hơn ${b46advSp(B)}.</div>
    <div class="hint-line">Hãy viết lần lượt các số từ ${b46advSp(A + 1)} đến ${b46advSp(B - 1)}
      rồi chọn số có chữ số hàng đơn vị là ${d}.</div>`,
    `Các số lớn hơn ${b46advSp(A)} và bé hơn ${b46advSp(B)} là: `
    + Array.from({length: B - A - 1}, (_, i) => b46advSp(A + 1 + i)).join(', ')
    + `. Số có chữ số hàng đơn vị là ${d} nên số cần tìm là ${b46advSp(n)}.`);
},

/* 4. Số lớn nhất, số bé nhất có bốn chữ số thoả mãn điều kiện */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const d1 = R(0, 8), d2 = R(1, 9);
  const d3 = R(1, 9), d4 = R(1, 9);
  const v1 = 9 * 1000 + d1 * 100 + 99;
  const v2 = 1000 + d2 * 10;
  const v3 = b46advKhacNhau(d3, true);
  const v4 = b46advKhacNhau(d4, false);
  return q.done(`<div class="b46adv-row"><b>a)</b> Số lớn nhất có bốn chữ số mà chữ số hàng trăm
      là ${d1}: ${q.num(v1, 4)}</div>
    <div class="b46adv-row"><b>b)</b> Số bé nhất có bốn chữ số mà chữ số hàng chục
      là ${d2}: ${q.num(v2, 4)}</div>
    <div class="b46adv-row"><b>c)</b> Số lớn nhất có bốn chữ số khác nhau mà chữ số hàng nghìn
      là ${d3}: ${q.num(v3, 4)}</div>
    <div class="b46adv-row"><b>d)</b> Số bé nhất có bốn chữ số khác nhau mà chữ số hàng nghìn
      là ${d4}: ${q.num(v4, 4)}</div>
    <div class="hint-line">Muốn được số lớn nhất thì các hàng còn lại chọn chữ số lớn nhất có thể;
      muốn được số bé nhất thì chọn chữ số bé nhất có thể.</div>`,
    `a) ${b46advSp(v1)}.  b) ${b46advSp(v2)}.  c) ${b46advSp(v3)}.  d) ${b46advSp(v4)}.`);
},

/* 5. Suy luận: ba bạn và ba số */
() => {
  const q = Q(5, '');
  const ten = ['Mai', 'Nam', 'Việt'].sort(() => Math.random() - .5);
  let ms = b46advSo(3).sort((a, b) => a - b);
  for (let g = 0; g < 200; g++){
    ms = b46advSo(3).sort((a, b) => a - b);
    if (ms[2] - ms[1] >= 20) break;
  }
  const M = ms[1] + Math.floor((ms[2] - ms[1]) / 2);
  const owner = {};
  owner[ten[0]] = ms[2];
  owner[ten[1]] = ms[0];
  owner[ten[2]] = ms[1];
  const hienThi = ms.slice().sort(() => Math.random() - .5);
  const opts = hienThi.map(b46advSp);
  return q.done(`<p class="wordq">Mỗi bạn Mai, Nam và Việt viết một số có bốn chữ số.
      Ba số các bạn viết được là ${hienThi.map(b46advSp).join(', ')} (không theo thứ tự).</p>
    <div class="bullet">Số của bạn ${ten[0]} lớn hơn ${b46advSp(M)}.</div>
    <div class="bullet">Số của bạn ${ten[1]} bé hơn số của bạn ${ten[2]}.</div>
    <div class="fill-line">Số của bạn ${ten[0]} là ${q.pick(b46advSp(owner[ten[0]]), opts)}</div>
    <div class="fill-line">Số của bạn ${ten[1]} là ${q.pick(b46advSp(owner[ten[1]]), opts)}</div>
    <div class="fill-line">Số của bạn ${ten[2]} là ${q.pick(b46advSp(owner[ten[2]]), opts)}</div>
    <div class="hint-line">Trong ba số đã cho, chỉ có một số lớn hơn ${b46advSp(M)}.</div>`,
    `Chỉ có ${b46advSp(ms[2])} lớn hơn ${b46advSp(M)} nên đó là số của ${ten[0]}. `
    + `Hai số còn lại: ${b46advSp(ms[0])} < ${b46advSp(ms[1])} nên ${ten[1]} viết ${b46advSp(ms[0])}, `
    + `${ten[2]} viết ${b46advSp(ms[1])}.`);
},

/* 6. Tìm chữ số thích hợp để so sánh đúng */
() => {
  const q = Q(6, 'Tìm chữ số thích hợp viết vào ô trống.');
  const a = R(1, 9), c = R(0, 9), dv = R(0, 9), e = R(0, 8);
  const p = R(1, 9), r = R(0, 9), s = R(0, 9), t = R(1, 9);
  const g = R(1, 9), h = R(0, 9), u = R(0, 9), w = R(2, 9);
  return q.done(`<div class="b46adv-row"><b>a)</b> Chữ số bé nhất viết vào ô trống để
      <span class="b46adv-dig">${a} ${q.num(e + 1, 1)} ${c} ${dv} &gt; ${a} ${e} ${c} ${dv}</span></div>
    <div class="b46adv-row"><b>b)</b> Chữ số lớn nhất viết vào ô trống để
      <span class="b46adv-dig">${p} ${r} ${q.num(t - 1, 1)} ${s} &lt; ${p} ${r} ${t} ${s}</span></div>
    <div class="b46adv-row"><b>c)</b> Có tất cả ${q.num(w, 1)} chữ số viết được vào ô trống để
      <span class="b46adv-dig">${g} ${h} ${u} <span class="b46adv-blank">?</span>
      &lt; ${g} ${h} ${u} ${w}</span></div>
    <div class="hint-line">Hai số có cùng bốn chữ số và chỉ khác nhau ở một hàng thì
      hàng đó số nào có chữ số lớn hơn thì số đó lớn hơn.</div>`,
    `a) Chữ số bé nhất lớn hơn ${e} là ${e + 1}.  b) Chữ số lớn nhất bé hơn ${t} là ${t - 1}.  `
    + `c) Các chữ số bé hơn ${w} là ${Array.from({length: w}, (_, i) => i).join(', ')}, `
    + `có tất cả ${w} chữ số.`);
},
];
