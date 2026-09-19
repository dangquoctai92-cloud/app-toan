/*CSS
.b61adv-big{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b61adv-big span{background:#fff3e6;border:2.5px solid #f0b070;border-radius:10px;padding:5px 14px;
  font-size:21px;font-weight:800;color:#9a5116}
.b61adv-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:8px 0;
  font-size:19px;font-weight:700;color:#2b3a5a}
.b61adv-let{color:#d63384;font-weight:800;margin-right:4px}
.b61adv-box{margin:8px 0;background:#eef7ff;border:2.5px solid #a8c8ee;border-radius:12px;padding:8px 12px}
.b61adv-chain{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:8px 0}
.b61adv-node{background:#e4f0d6;border:2.5px solid #94c46a;border-radius:11px;padding:6px 10px;
  font-size:17px;font-weight:800;color:#2f5320;white-space:nowrap}
.b61adv-node.q{background:#fff5d6;border-color:#e8c05a}
.b61adv-arr{color:#1f9fc4;font-size:19px;font-weight:800}
.b61adv-list{display:flex;flex-wrap:wrap;gap:2px 26px;margin:6px 0}
.b61adv-list > div{min-width:246px;font-size:19px;font-weight:700;line-height:2}
CSS*/

/* ===== NÂNG CAO — Bài 61: Làm tròn số đến hàng nghìn, hàng chục nghìn ===== */

/* viết số có nhóm ba chữ số cách nhau: 35 786 */
const b61advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* làm tròn n đến hàng u (u = 100, 1 000, 10 000) — chỉ dùng số nguyên nên luôn chính xác */
const b61advRd = (n, u) => { const r = n % u; return n - r + (r * 2 >= u ? u : 0); };

const b61advChain = items => `<div class="b61adv-chain">${items.map((x, i) =>
  `<span class="b61adv-node${x.q ? ' q' : ''}">${x.h}</span>`
  + (i === items.length - 1 ? '' : '<span class="b61adv-arr">&rarr;</span>')).join('')}</div>`;

ADV.b61 = [

/* 1. Một số làm tròn đến ba hàng khác nhau */
() => {
  const q = Q(1, 'Làm tròn mỗi số sau đến hàng trăm, hàng nghìn, hàng chục nghìn.');
  const sp = b61advSp, rd = b61advRd;
  /* số thứ nhất: chữ số hàng trăm khác 0 và bé hơn 5 nên ba kết quả làm tròn đều khác nhau */
  const n1 = R(1, 8) * 10000 + R(1, 8) * 1000 + R(1, 4) * 100 + R(1, 9) * 10 + R(1, 9);
  /* số thứ hai: chữ số hàng trăm là 9 và hàng chục lớn hơn 4 nên làm tròn đến hàng trăm phải nhớ */
  const n2 = R(1, 8) * 10000 + R(0, 9) * 1000 + 900 + R(5, 9) * 10 + R(0, 9);
  const ns = [n1, n2];
  const html = ns.map((v, i) => `<div class="b61adv-box">
      <div class="b61adv-row"><span class="b61adv-let">${i === 0 ? 'a)' : 'b)'}</span>${sp(v)}</div>
      <div class="fill-line">Làm tròn đến hàng trăm: ${q.num(rd(v, 100))}</div>
      <div class="fill-line">Làm tròn đến hàng nghìn: ${q.num(rd(v, 1000))}</div>
      <div class="fill-line">Làm tròn đến hàng chục nghìn: ${q.num(rd(v, 10000))}</div>
    </div>`).join('')
    + `<div class="hint-line">Làm tròn đến hàng nào thì xét chữ số ở hàng liền sau hàng đó:
        bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên. Chú ý trường hợp làm tròn lên
        mà phải nhớ sang hàng trước.</div>`;
  return q.done(html, ns.map((v, i) =>
    `${i === 0 ? 'a)' : 'b)'} ${sp(v)} &rarr; ${sp(rd(v, 100))} (hàng trăm), `
    + `${sp(rd(v, 1000))} (hàng nghìn), ${sp(rd(v, 10000))} (hàng chục nghìn)`).join(';  '));
},

/* 2. Toán ngược: biết kết quả làm tròn, tìm số ban đầu */
() => {
  const q = Q(2, 'Tìm số bé nhất và số lớn nhất có thể có trong mỗi trường hợp sau.');
  const sp = b61advSp;
  const X = R(2, 9) * 10000 + R(0, 9) * 1000;            /* số tròn nghìn */
  const k = R(2, 9), Y = k * 10000;                      /* số tròn chục nghìn */
  const html = `<div class="b61adv-box">
      <div class="b61adv-row"><span class="b61adv-let">a)</span>Làm tròn số A đến hàng nghìn
        ta được ${sp(X)}.</div>
      <div class="fill-line">Số A bé nhất có thể là ${q.num(X - 500)}</div>
      <div class="fill-line">Số A lớn nhất có thể là ${q.num(X + 499)}</div>
      <div class="fill-line">Có tất cả ${q.num(1000)} số A như vậy.</div>
    </div>
    <div class="b61adv-box">
      <div class="b61adv-row"><span class="b61adv-let">b)</span>Làm tròn số B đến hàng chục nghìn
        ta được ${sp(Y)}.</div>
      <div class="fill-line">Số B bé nhất có thể là ${q.num(Y - 5000)}</div>
      <div class="fill-line">Số B lớn nhất có thể là ${q.num(Y + 4999)}</div>
    </div>
    <div class="hint-line">Số bé nhất là số nhỏ nhất mà còn được làm tròn lên, số lớn nhất là số lớn nhất
      mà còn được làm tròn xuống. Các số cần tìm nằm liền nhau nên chỉ cần đếm từ số bé nhất
      đến số lớn nhất là biết có tất cả bao nhiêu số.</div>`;
  return q.done(html,
    `a) Các số làm tròn đến hàng nghìn được ${sp(X)} là các số từ ${sp(X - 500)} đến ${sp(X + 499)}, `
    + `có tất cả 1 000 số.  `
    + `b) Các số làm tròn đến hàng chục nghìn được ${sp(Y)} là các số từ ${sp(Y - 5000)} `
    + `đến ${sp(Y + 4999)}.`);
},

/* 3. Tìm số có năm chữ số theo nhiều điều kiện */
() => {
  const q = Q(3, 'Tìm số có năm chữ số thoả mãn tất cả các điều kiện sau.');
  const sp = b61advSp, rd = b61advRd;
  const X = R(2, 9) * 10000 + R(0, 9) * 1000;            /* kết quả làm tròn đến hàng nghìn */
  const t = R(0, 9), c = R(0, 9), d = R(0, 9);
  const goc = t < 5 ? X : X - 1000;
  const n = goc + t * 100 + c * 10 + d;
  return q.done(`<div class="bullet">Làm tròn số đó đến hàng nghìn thì được ${sp(X)}.</div>
    <div class="bullet">Chữ số hàng trăm của số đó là ${t}.</div>
    <div class="bullet">Chữ số hàng chục của số đó là ${c}.</div>
    <div class="bullet">Chữ số hàng đơn vị của số đó là ${d}.</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 5)}</div>
    <div class="fill-line">Làm tròn số đó đến hàng chục nghìn ta được ${q.num(rd(n, 10000))}</div>
    <div class="hint-line">Chữ số hàng trăm là ${t}, mà ${t} ${t < 5 ? 'bé hơn' : 'không bé hơn'} 5
      nên số cần tìm đã được làm tròn ${t < 5 ? 'xuống' : 'lên'}.</div>`,
    `Vì chữ số hàng trăm là ${t} nên số đó làm tròn ${t < 5 ? 'xuống' : 'lên'}, `
    + `phần nghìn của số đó là ${sp(goc)}. Vậy số cần tìm là ${sp(n)}; `
    + `làm tròn ${sp(n)} đến hàng chục nghìn được ${sp(rd(n, 10000))}.`);
},

/* 4. Làm tròn rồi so sánh hai số */
() => {
  const q = Q(4, 'Làm tròn mỗi số rồi so sánh hai kết quả.');
  const sp = b61advSp, rd = b61advRd;
  const cmp = (a, b) => a > b ? '>' : a < b ? '<' : '=';
  /* a) làm tròn đến hàng nghìn */
  const X1 = R(2, 8) * 10000 + R(0, 9) * 1000;
  const cungA = R(1, 2) === 1;
  const X2 = cungA ? X1 : X1 + pick([1000, 2000, 3000]);
  let a1 = X1 - 500 + R(0, 999), a2 = X2 - 500 + R(0, 999);
  if (a1 === a2) a2 = a2 === X2 + 499 ? a2 - 1 : a2 + 1;
  /* b) làm tròn đến hàng chục nghìn */
  const k = R(2, 8), Y1 = k * 10000;
  const cungB = R(1, 2) === 1;
  const Y2 = cungB ? Y1 : Y1 + 10000;
  let b1 = Y1 - 5000 + R(0, 9999), b2 = Y2 - 5000 + R(0, 9999);
  if (b1 === b2) b2 = b2 === Y2 + 4999 ? b2 - 1 : b2 + 1;
  const html = `<div class="b61adv-box">
      <div class="b61adv-row"><span class="b61adv-let">a)</span>Làm tròn ${sp(a1)} và ${sp(a2)}
        đến hàng nghìn.</div>
      <div class="b61adv-row">${q.num(rd(a1, 1000))} ${q.sign(cmp(rd(a1, 1000), rd(a2, 1000)))}
        ${q.num(rd(a2, 1000))}</div>
    </div>
    <div class="b61adv-box">
      <div class="b61adv-row"><span class="b61adv-let">b)</span>Làm tròn ${sp(b1)} và ${sp(b2)}
        đến hàng chục nghìn.</div>
      <div class="b61adv-row">${q.num(rd(b1, 10000))} ${q.sign(cmp(rd(b1, 10000), rd(b2, 10000)))}
        ${q.num(rd(b2, 10000))}</div>
    </div>
    <div class="hint-line">Hai số khác nhau vẫn có thể cho cùng một kết quả khi làm tròn.
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`;
  return q.done(html,
    `a) ${sp(a1)} &rarr; ${sp(rd(a1, 1000))}; ${sp(a2)} &rarr; ${sp(rd(a2, 1000))}, `
    + `nên ${sp(rd(a1, 1000))} ${cmp(rd(a1, 1000), rd(a2, 1000))} ${sp(rd(a2, 1000))}.  `
    + `b) ${sp(b1)} &rarr; ${sp(rd(b1, 10000))}; ${sp(b2)} &rarr; ${sp(rd(b2, 10000))}, `
    + `nên ${sp(rd(b1, 10000))} ${cmp(rd(b1, 10000), rd(b2, 10000))} ${sp(rd(b2, 10000))}.`);
},

/* 5. Dãy số cách đều rồi làm tròn */
() => {
  const q = Q(5, 'Viết tiếp hai số của dãy số, rồi làm tròn ba số cuối của dãy đến hàng nghìn.');
  const sp = b61advSp, rd = b61advRd;
  const b = pick([300, 400, 600, 700]);
  const st = R(21, 58) * 1000 + R(0, 9) * 100;
  const s = [0, 1, 2, 3, 4].map(i => st + i * b);
  const row = b61advChain(s.map((v, i) => i < 3 ? {h:sp(v)} : {q:1, h:q.num(v)}));
  const html = row
    + `<div class="b61adv-list">${[2, 3, 4].map(i =>
        `<div>${sp(s[i])} <span class="op">&rarr;</span> ${q.num(rd(s[i], 1000))}</div>`).join('')}</div>
       <div class="hint-line">Trước hết tìm xem mỗi số hơn số liền trước bao nhiêu đơn vị,
         sau đó mới làm tròn từng số.</div>`;
  return q.done(html,
    `Dãy số tăng dần, mỗi số hơn số liền trước ${b} đơn vị nên hai số tiếp theo là `
    + `${sp(s[3])} và ${sp(s[4])}. Làm tròn đến hàng nghìn: ${[2, 3, 4].map(i =>
      `${sp(s[i])} &rarr; ${sp(rd(s[i], 1000))}`).join('; ')}.`);
},

/* 6. Bài toán thực tế: ba nhà máy */
() => {
  const q = Q(6, 'Trong một năm, ba nhà máy A, B, C sản xuất được số sản phẩm như sau.');
  const sp = b61advSp, rd = b61advRd;
  const k = R(2, 7);
  const v1 = k * 10000 - 5000 + R(0, 9999);
  let v2 = k * 10000 - 5000 + R(0, 9999);
  if (v2 === v1) v2 = v2 === k * 10000 + 4999 ? v2 - 1 : v2 + 1;
  const v3 = (k + 2) * 10000 - 5000 + R(0, 9999);
  const NM = ['A', 'B', 'C'];
  const vals = [v1, v2, v3].sort(() => Math.random() - .5);
  const trong = NM.filter((c, i) => rd(vals[i], 10000) === k * 10000).sort();
  const lon = NM[[0, 1, 2].find(i => rd(vals[i], 10000) !== k * 10000)];
  const html = `<div class="b61adv-list">${NM.map((c, i) =>
      `<div><span class="b61adv-let">&bull;</span>Nhà máy ${c}: ${sp(vals[i])} sản phẩm</div>`).join('')}</div>
    <div class="b61adv-row">Làm tròn số sản phẩm của mỗi nhà máy đến hàng chục nghìn.</div>
    ${NM.map((c, i) => `<div class="fill-line">Nhà máy ${c}: khoảng ${q.num(rd(vals[i], 10000))}
      sản phẩm</div>`).join('')}
    <div class="fill-line">Hai nhà máy có số làm tròn bằng nhau là ${q.pick(trong.join(','), NM)}</div>
    <div class="fill-line">Nhà máy có số làm tròn lớn nhất là ${q.pick(lon, NM)}</div>
    <div class="hint-line">Hãy làm tròn từng số đến hàng chục nghìn rồi so sánh các kết quả
      vừa tìm được.</div>`;
  return q.done(html,
    NM.map((c, i) => `${c}: ${sp(vals[i])} &rarr; ${sp(rd(vals[i], 10000))}`).join(';  ')
    + `. Vậy hai nhà máy ${trong.join(' và ')} có cùng số làm tròn là ${sp(k * 10000)}, `
    + `nhà máy ${lon} có số làm tròn lớn nhất.`);
},
];
