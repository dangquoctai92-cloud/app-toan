/* ===== NÂNG CAO — Bài 62: Luyện tập chung (các số đến 100 000) ===== */

/* viết số theo nhóm ba chữ số như SGK: 51 254 */
const b62advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b62advLen = v => String(v).length;

/* làm tròn n đến hàng u (chỉ dùng số nguyên nên luôn chính xác) */
const b62advRound = (n, u) => { const r = n % u; return n - r + (r * 2 >= u ? u : 0); };

/* ---- đọc số có năm chữ số (readNum của app chỉ đúng với số ≤ 1 000) ---- */
const B62ADV_DV = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

function b62advRead3(n){
  if (n < 10) return B62ADV_DV[n];
  if (n < 100){
    const c = Math.floor(n / 10), d = n % 10;
    const s = c === 1 ? 'mười' : B62ADV_DV[c] + ' mươi';
    if (d === 0) return s;
    if (d === 1) return s + (c === 1 ? ' một' : ' mốt');
    if (d === 4) return s + (c === 1 ? ' bốn' : ' tư');
    if (d === 5) return s + ' lăm';
    return s + ' ' + B62ADV_DV[d];
  }
  const t = Math.floor(n / 100), r = n % 100;
  const s = B62ADV_DV[t] + ' trăm';
  if (r === 0) return s;
  if (r < 10) return s + ' linh ' + B62ADV_DV[r];
  return s + ' ' + b62advRead3(r);
}

function b62advRead5(n){
  const ng = Math.floor(n / 1000), r = n % 1000;
  const s = b62advRead3(ng) + ' nghìn';
  if (r === 0) return s;
  if (r < 10) return s + ' không trăm linh ' + B62ADV_DV[r];
  if (r < 100) return s + ' không trăm ' + b62advRead3(r);
  return s + ' ' + b62advRead3(r);
}

function b62advAlts5(n){
  const swap = (arr, a, b) => arr.concat(arr.filter(s => s.includes(a)).map(s => s.split(a).join(b)));
  let out = [b62advRead5(n)];
  out = swap(out, ' mốt', ' một');
  out = swap(out, ' tư', ' bốn');
  out = swap(out, ' lăm', ' năm');
  out = swap(out, ' linh ', ' lẻ ');
  return [...new Set(out)];
}

/* ô nhập cách đọc số có năm chữ số (dùng chung kho ô nhập B của Q) */
function b62advTxtBlank(q, n){
  q.B.push({a: b62advRead5(n), alts: b62advAlts5(n), text: true});
  return `<input class="qin qtxt" data-b="${q.B.length - 1}" placeholder="?">`;
}

/* một dãy số: vals = mảng giá trị, hide = các vị trí phải điền */
function b62advSeq(q, vals, hide){
  return '<div class="b62adv-seq">' + vals.map((v, i) =>
    (i ? '<span class="ar">&rarr;</span>' : '')
    + (hide.includes(i)
      ? `<span class="n q">${q.num(v, b62advLen(v))}</span>`
      : `<span class="n">${b62advSp(v)}</span>`)).join('') + '</div>';
}

ADV.b62 = [

/* 1. Tìm số có năm chữ số theo nhiều điều kiện (có điều kiện về làm tròn) */
() => {
  const q = Q(1, 'Tìm số có năm chữ số thoả mãn tất cả các điều kiện sau.');
  const sp = b62advSp;
  const k = R(11, 88);                            /* phần nghìn của số cần tìm */
  const tr = R(0, 9), ch = R(0, 9), dv = R(0, 9);
  const n = k * 1000 + tr * 100 + ch * 10 + dv;
  const N = (tr >= 5 ? k + 1 : k) * 1000;         /* làm tròn đến hàng nghìn */
  const cn = b62advRound(n, 10000);
  return q.done(`<div class="b62adv-cond">Chữ số hàng trăm của số đó là ${tr},
      chữ số hàng chục là ${ch}, chữ số hàng đơn vị là ${dv}.</div>
    <div class="b62adv-cond">Làm tròn số đó đến hàng nghìn thì được ${sp(N)}.</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 5)}</div>
    <div class="b62adv-read"><span>Số đó đọc là</span>${b62advTxtBlank(q, n)}</div>
    <div class="fill-line">Làm tròn số đó đến hàng chục nghìn thì được
      ${q.num(cn, b62advLen(cn))}</div>
    <div class="hint-line">Khi làm tròn đến hàng nghìn: nếu chữ số hàng trăm bé hơn 5 thì làm tròn
      xuống, nếu chữ số hàng trăm lớn hơn hoặc bằng 5 thì làm tròn lên. Từ đó tìm được chữ số
      hàng chục nghìn và chữ số hàng nghìn của số cần tìm.</div>`,
    `Chữ số hàng trăm là ${tr} nên số đó được làm tròn ${tr >= 5 ? 'lên' : 'xuống'} thành ${sp(N)}, `
    + `vậy số cần tìm là ${sp(n)}, đọc là ${b62advRead5(n)}. `
    + `Số ${sp(n)} có chữ số hàng nghìn là ${Math.floor(n / 1000) % 10} nên làm tròn đến `
    + `hàng chục nghìn được ${sp(cn)}.`);
},

/* 2. Dãy số — tìm quy luật rồi viết số còn thiếu */
() => {
  const q = Q(2, 'Tìm quy luật của mỗi dãy số rồi viết số thích hợp vào ô trống.');
  const sp = b62advSp;
  const stA = R(30, 58) * 1000 + R(0, 9) * 100;
  const bA = pick([200, 500, 2000]);
  const valA = [0, 1, 2, 3, 4, 5].map(i => stA + i * bA);
  const stB = R(72, 95) * 1000;
  const bB = pick([1000, 3000, 5000]);
  const valB = [0, 1, 2, 3, 4, 5].map(i => stB - i * bB);
  const stC = R(10, 30) * 100;
  const valC = [0, 1, 2, 3, 4, 5].map(i => stC * Math.pow(2, i));
  return q.done(`<div class="b62adv-sub">a)</div>${b62advSeq(q, valA, [3, 5])}
    <div class="b62adv-sub">b)</div>${b62advSeq(q, valB, [2, 5])}
    <div class="b62adv-sub">c)</div>${b62advSeq(q, valC, [4, 5])}
    <div class="hint-line">Ở dãy a) và dãy b), hãy xem mỗi số hơn (hoặc kém) số liền trước
      bao nhiêu đơn vị. Ở dãy c), hãy xem mỗi số gấp mấy lần số liền trước.</div>`,
    `a) Dãy số tăng dần, mỗi số hơn số liền trước ${sp(bA)} đơn vị: ${valA.map(sp).join(', ')}.  `
    + `b) Dãy số giảm dần, mỗi số kém số liền trước ${sp(bB)} đơn vị: ${valB.map(sp).join(', ')}.  `
    + `c) Mỗi số gấp 2 lần số liền trước: ${valC.map(sp).join(', ')}.`);
},

/* 3. So sánh giá trị hai biểu thức */
() => {
  const q = Q(3, 'Tính giá trị mỗi vế rồi điền dấu thích hợp vào ô trống.');
  const sp = b62advSp;
  const rows = [];
  /* a) tổng các hàng so với một số có năm chữ số */
  {
    const a = R(1, 9), b = R(1, 9), c = R(1, 9);
    const trai = a * 10000 + b * 1000 + c * 100;
    const t = R(1, 3);
    const phai = t === 1 ? trai : t === 2 ? trai + R(1, 9) * 100 : trai - R(1, 9) * 100;
    rows.push({l: `${sp(a * 10000)} + ${sp(b * 1000)} + ${c * 100}`, r: sp(phai),
      d: trai > phai ? '>' : trai < phai ? '<' : '='});
  }
  /* b) tổng hai số tròn nghìn so với một số tròn nghìn */
  {
    const x = R(11, 40) * 1000, y = R(5, 30) * 1000;
    const t = R(1, 3);
    const tong = x + y;
    const phai = t === 1 ? tong : t === 2 ? tong + R(1, 9) * 1000 : tong - R(1, 9) * 1000;
    rows.push({l: `${sp(x)} + ${sp(y)}`, r: sp(phai),
      d: tong > phai ? '>' : tong < phai ? '<' : '='});
  }
  /* c) hiệu hai số tròn nghìn so với một số tròn nghìn */
  {
    const x = R(55, 95) * 1000, y = R(5, 40) * 1000;
    const hieu = x - y;
    const t = R(1, 3);
    const phai = t === 1 ? hieu : t === 2 ? hieu + R(1, 9) * 1000 : hieu - R(1, 9) * 1000;
    rows.push({l: `${sp(x)} &minus; ${sp(y)}`, r: sp(phai),
      d: hieu > phai ? '>' : hieu < phai ? '<' : '='});
  }
  /* d) hai số có năm chữ số cùng chữ số hàng chục nghìn và hàng nghìn */
  {
    const cn = R(1, 9), ng = R(0, 9), base = cn * 10000 + ng * 1000;
    const u = base + R(0, 999), v = base + R(0, 999);
    rows.push({l: sp(u), r: sp(v), d: u > v ? '>' : u < v ? '<' : '='});
  }
  const L = ['a)', 'b)', 'c)', 'd)'];
  return q.done(`<div class="two-col"><div>${rows.map((r, i) =>
      `<div class="cmp-row"><span class="side">${L[i]} ${r.l}</span>${q.sign(r.d)}
        <span class="side">${r.r}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map((r, i) => `${L[i]} ${r.l.replace('&minus;', '−')} `
      + `${r.d === '>' ? '>' : r.d === '<' ? '<' : '='} ${r.r}`).join(';  '));
},

/* 4. Suy luận: tìm số theo hai gợi ý rồi sắp xếp các số */
() => {
  const q = Q(4, '');
  const sp = b62advSp;
  const D10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const h = R(1, 9), p = R(0, 9);
  const t = h * 10000 + R(0, 9) * 1000 + p * 100 + R(0, 9) * 10 + R(0, 9);
  const p2 = pick(D10.filter(x => x !== p));
  const s2 = h * 10000 + R(0, 9) * 1000 + p2 * 100 + R(0, 9) * 10 + R(0, 9);
  const h3 = pick(D10.filter(x => x !== 0 && x !== h));
  const s3 = h3 * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
  const h4 = pick(D10.filter(x => x !== 0 && x !== h && x !== h3));
  const s4 = h4 * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
  const ds = [t, s2, s3, s4].sort(() => Math.random() - .5);
  const up = [t, s2, s3, s4].slice().sort((x, y) => x - y);
  return q.done(`<p class="wordq">Mai nghĩ ra một trong bốn số sau:</p>
    <div class="b62adv-cards">${ds.map(v => `<div class="b62adv-card">${sp(v)}</div>`).join('')}</div>
    <div class="b62adv-cond">Số Mai nghĩ có chữ số hàng chục nghìn là ${h}.</div>
    <div class="b62adv-cond">Số Mai nghĩ có chữ số hàng trăm là ${p}.</div>
    <div class="fill-line">a) Số Mai nghĩ là ${q.num(t, 5)}</div>
    <div class="b62adv-sub">b) Viết bốn số trên theo thứ tự từ bé đến lớn.</div>
    <div class="b62adv-order">${q.num(up[0], 5)} &lt; ${q.num(up[1], 5)} &lt; ${q.num(up[2], 5)}
      &lt; ${q.num(up[3], 5)}</div>
    <div class="hint-line">Dùng gợi ý thứ nhất để loại bớt các số, rồi dùng gợi ý thứ hai
      để tìm đúng số Mai nghĩ.</div>`,
    `a) Chỉ có hai số ${sp(t)} và ${sp(s2)} có chữ số hàng chục nghìn là ${h}; `
    + `trong hai số đó chỉ có ${sp(t)} có chữ số hàng trăm là ${p}. Vậy Mai nghĩ số ${sp(t)}.  `
    + `b) ${up.map(sp).join(' < ')}.`);
},

/* 5. Toán ngược về làm tròn số */
() => {
  const q = Q(5, 'Viết số thích hợp vào chỗ chấm.');
  const sp = b62advSp;
  const k = R(12, 88), N = k * 1000;
  const M = R(2, 8) * 10000;
  return q.done(`<p class="wordq">a) Làm tròn số A đến hàng nghìn thì được ${sp(N)}.</p>
    <div class="fill-line">Số A lớn nhất có thể là ${q.num(N + 499, 5)}</div>
    <div class="fill-line">Số A bé nhất có thể là ${q.num(N - 500, 5)}</div>
    <p class="wordq">b) Làm tròn số B đến hàng chục nghìn thì được ${sp(M)}.</p>
    <div class="fill-line">Số B lớn nhất có thể là ${q.num(M + 4999, 5)}</div>
    <div class="fill-line">Số B bé nhất có thể là ${q.num(M - 5000, 5)}</div>
    <div class="hint-line">Số làm tròn xuống được ${sp(N)} thì lớn nhất là số có chữ số hàng trăm
      bằng 4, chữ số hàng chục và hàng đơn vị đều bằng 9. Số làm tròn lên được ${sp(N)} thì
      bé nhất là số có chữ số hàng trăm bằng 5, chữ số hàng chục và hàng đơn vị đều bằng 0.</div>`,
    `a) ${sp(N + 499)} làm tròn xuống được ${sp(N)}, còn ${sp(N + 500)} lại làm tròn lên `
    + `${sp(N + 1000)}, nên số A lớn nhất là ${sp(N + 499)}; số A bé nhất là ${sp(N - 500)}.  `
    + `b) Số B lớn nhất là ${sp(M + 4999)}, số B bé nhất là ${sp(M - 5000)}.`);
},

/* 6. Bài toán ba bước trong phạm vi 100 000 */
() => {
  const q = Q(6, '');
  const sp = b62advSp;
  const a = R(12, 30) * 1000;                 /* ngày thứ Bảy */
  const them = R(3, 15) * 1000;
  const b = a + them;                         /* ngày Chủ nhật */
  const tong = a + b;
  const lt = b62advRound(tong, 10000);
  return q.done(`<p class="wordq">Trong hội chợ sách, ngày thứ Bảy có ${sp(a)} lượt khách đến tham
      quan. Ngày Chủ nhật có nhiều hơn ngày thứ Bảy ${sp(them)} lượt khách.</p>
    <div class="fill-line">a) Ngày Chủ nhật có ${q.num(b, b62advLen(b))} lượt khách.</div>
    <div class="fill-line">b) Cả hai ngày có ${q.num(tong, b62advLen(tong))} lượt khách.</div>
    <div class="fill-line">c) Làm tròn số lượt khách của cả hai ngày đến hàng chục nghìn thì được
      khoảng ${q.num(lt, b62advLen(lt))} lượt khách.</div>
    <div class="hint-line">Muốn biết cả hai ngày có bao nhiêu lượt khách, em phải tìm số lượt khách
      của ngày Chủ nhật trước.</div>`,
    `a) ${sp(a)} + ${sp(them)} = ${sp(b)} (lượt khách).  `
    + `b) ${sp(a)} + ${sp(b)} = ${sp(tong)} (lượt khách).  `
    + `c) ${sp(tong)} có chữ số hàng nghìn là ${Math.floor(tong / 1000) % 10} nên làm tròn đến `
    + `hàng chục nghìn được ${sp(lt)}.`);
},
];
