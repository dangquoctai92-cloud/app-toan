/* ===== NÂNG CAO — Bài 49: Luyện tập chung (các số trong phạm vi 10 000) ===== */

const b49advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b49advR10 = n => Math.floor(n / 10) * 10 + (n % 10 >= 5 ? 10 : 0);
const b49advR100 = n => Math.floor(n / 100) * 100 + (Math.floor(n / 10) % 10 >= 5 ? 100 : 0);

const b49advRom = n => {
  const V = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = '', r = n;
  for (let i = 0; i < V.length; i++) while (r >= V[i][0]){ s += V[i][1]; r -= V[i][0]; }
  return s;
};

/* bốn chữ số khác nhau, đều khác 0 */
const b49advThe = () => {
  const ds = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 4);
  return ds;
};

const b49advChain = items => `<div class="b49adv-chain">${items.map(x =>
  `<span class="b49adv-cn${x.q ? ' q' : ''}">${x.h}</span>`).join('')}</div>`;

ADV.b49 = [

/* 1. Lập số từ bốn tấm thẻ rồi so sánh và làm tròn */
() => {
  const q = Q(1, 'Từ bốn tấm thẻ số dưới đây, hãy lập các số có bốn chữ số (mỗi tấm thẻ dùng một lần).');
  const ds = b49advThe();
  const lon = ds.slice().sort((a, b) => b - a).reduce((s, d) => s * 10 + d, 0);
  const be = ds.slice().sort((a, b) => a - b).reduce((s, d) => s * 10 + d, 0);
  return q.done(`<div class="b49adv-cards">${ds.map(d => `<div class="b49adv-card">${d}</div>`).join('')}</div>
    <div class="fill-line">Số lớn nhất lập được là ${q.num(lon, 4)}</div>
    <div class="fill-line">Số bé nhất lập được là ${q.num(be, 4)}</div>
    <div class="fill-line">Số lớn nhất hơn số bé nhất ${q.num(lon - be, 4)} đơn vị.</div>
    <div class="fill-line">Làm tròn số lớn nhất đến hàng trăm ta được ${q.num(b49advR100(lon), 4)}</div>
    <div class="fill-line">Làm tròn số bé nhất đến hàng chục ta được ${q.num(b49advR10(be), 4)}</div>
    <div class="hint-line">Muốn được số lớn nhất thì xếp các chữ số từ lớn đến bé, muốn được số bé nhất
      thì xếp các chữ số từ bé đến lớn.</div>`,
    `Số lớn nhất: ${b49advSp(lon)}; số bé nhất: ${b49advSp(be)}; `
    + `${b49advSp(lon)} − ${b49advSp(be)} = ${b49advSp(lon - be)}. `
    + `${b49advSp(lon)} → ${b49advSp(b49advR100(lon))} (hàng trăm); `
    + `${b49advSp(be)} → ${b49advSp(b49advR10(be))} (hàng chục).`);
},

/* 2. Tìm số có bốn chữ số theo chuỗi điều kiện */
() => {
  const q = Q(2, 'Tìm số có bốn chữ số thoả mãn tất cả các điều kiện sau.');
  const a = R(1, 4);
  const t = R(1, 9 - a);
  const b = a + t;
  const c = t;
  const d = R(0, 9);
  const n = a * 1000 + b * 100 + c * 10 + d;
  const S = a + b + c + d;
  return q.done(`<div class="bullet">Chữ số hàng nghìn là ${a}.</div>
    <div class="bullet">Chữ số hàng trăm hơn chữ số hàng nghìn ${t} đơn vị.</div>
    <div class="bullet">Chữ số hàng chục bằng hiệu của chữ số hàng trăm và chữ số hàng nghìn.</div>
    <div class="bullet">Tổng bốn chữ số của số đó bằng ${S}.</div>
    <div class="fill-line">Chữ số hàng trăm là ${q.num(b, 1)}</div>
    <div class="fill-line">Chữ số hàng chục là ${q.num(c, 1)}</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 4)}</div>
    <div class="fill-line">Làm tròn số đó đến hàng trăm ta được ${q.num(b49advR100(n), 4)}</div>
    <div class="hint-line">Hãy tìm lần lượt chữ số hàng trăm, chữ số hàng chục, rồi dựa vào tổng
      bốn chữ số để tìm chữ số hàng đơn vị.</div>`,
    `Hàng trăm: ${a} + ${t} = ${b}. Hàng chục: ${b} − ${a} = ${c}. `
    + `Hàng đơn vị: ${S} − ${a} − ${b} − ${c} = ${d}. Vậy số cần tìm là ${b49advSp(n)}, `
    + `làm tròn đến hàng trăm được ${b49advSp(b49advR100(n))}.`);
},

/* 3. Dãy số La Mã viết theo quy luật */
() => {
  const q = Q(3, 'Dãy số La Mã sau được viết theo một quy luật.');
  const k = pick([1, 2, 3]);
  const st = k === 1 ? R(1, 14) : k === 2 ? R(1, 8) : R(1, 2);
  const v = i => st + i * k;
  const cuoi = v(6);
  const row = b49advChain([0, 1, 2, 3, 4, 5, 6].map(i =>
    i < 4 ? {h:b49advRom(v(i))} : {q:1, h:q.num(v(i), 2)}));
  const opts = [cuoi, cuoi - 1, cuoi - 2, cuoi + 1].sort(() => Math.random() - .5).map(b49advRom);
  return q.done(`<div class="b49adv-sub">a) Viết giá trị của ba số còn thiếu bằng số tự nhiên.</div>
    ${row}
    <div class="fill-line">Mỗi số hơn số liền trước ${q.num(k, 1)} đơn vị.</div>
    <div class="b49adv-sub">b) Số cuối cùng của dãy viết bằng số La Mã là:</div>
    <div class="fill-line">${q.pick(b49advRom(cuoi), opts)}</div>
    <div class="hint-line">Hãy đổi các số La Mã đã cho thành số tự nhiên để tìm ra quy luật của dãy số.</div>`,
    `Dãy số đã cho là ${[0, 1, 2, 3, 4, 5, 6].map(i => v(i)).join(', ')}, `
    + `mỗi số hơn số liền trước ${k} đơn vị. Số cuối cùng là ${cuoi}, viết là ${b49advRom(cuoi)}.`);
},

/* 4. So sánh: cấu tạo số, số La Mã và kết quả làm tròn */
() => {
  const q = Q(4, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const ng = R(1, 9), tr = R(1, 9), ch = R(1, 9), dv = R(1, 9);
  const N = ng * 1000 + tr * 100 + ch * 10 + dv;
  const M = N + pick([-100, -10, -1, 0, 0, 1, 10, 100]);
  const x = R(4, 18), y = x + pick([-3, -1, 0, 0, 1, 3]);
  const A = R(1200, 9700);
  const E = b49advR100(A) + pick([-100, 0, 0, 100]);
  const P = R(1200, 9700), Q2 = P + pick([-120, -40, -6, 6, 40, 120]);
  const rows = [
    {t:`${b49advSp(ng * 1000)} + ${tr * 100} + ${ch * 10} + ${dv}`, p:b49advSp(M), l:N, r:M},
    {t:`<span class="b49adv-rom">${b49advRom(x)}</span>`, p:`${y}`, l:x, r:y},
    {t:`Làm tròn ${b49advSp(A)} đến hàng trăm`, p:b49advSp(E), l:b49advR100(A), r:E},
    {t:`Làm tròn ${b49advSp(P)} đến hàng chục`, p:`Làm tròn ${b49advSp(Q2)} đến hàng chục`,
     l:b49advR10(P), r:b49advR10(Q2)}
  ];
  const L = ['a)', 'b)', 'c)', 'd)'];
  return q.done(`<div class="two-col"><div>${rows.map((r, i) =>
      `<div class="cmp-row"><b>${L[i]}</b><span class="side b49adv-side">${r.t}</span>${
        q.sign(r.l > r.r ? '>' : r.l < r.r ? '<' : '=')
      }<span class="side b49adv-side">${r.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Hãy tính (hoặc làm tròn, hoặc đổi số La Mã ra số tự nhiên) từng vế trước
      rồi mới so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `a) ${b49advSp(N)} và ${b49advSp(M)};  b) ${b49advRom(x)} = ${x} và ${y};  `
    + `c) ${b49advSp(b49advR100(A))} và ${b49advSp(E)};  `
    + `d) ${b49advSp(b49advR10(P))} và ${b49advSp(b49advR10(Q2))}.`);
},

/* 5. Tìm tất cả các chữ số thích hợp thoả mãn hai điều kiện */
() => {
  const q = Q(5, '');
  let a = 3, b = 4, d = 7, L = 3412, U = 3485, valid = [];
  for (let g = 0; g < 80; g++){
    a = R(1, 9); b = R(0, 9); d = R(0, 9);
    const lo = R(0, 7), ld = R(0, 9), hi = R(lo + 1, 9), hd = R(0, 9);
    const nen = a * 1000 + b * 100;
    L = nen + lo * 10 + ld;
    U = nen + hi * 10 + hd;
    valid = [];
    for (let x = 0; x <= 9; x++){
      const v = nen + x * 10 + d;
      if (v > L && v < U) valid.push(x);
    }
    if (valid.length >= 2 && valid.length <= 8) break;
  }
  if (valid.length < 2 || valid.length > 8){
    a = 3; b = 4; d = 7; L = 3412; U = 3485; valid = [2, 3, 4, 5, 6, 7];
  }
  const opts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const ans = valid.map(String).sort().join(',');
  const so = `<span class="b49adv-dig">${a} ${b} <span class="b49adv-blank">?</span> ${d}</span>`;
  return q.done(`<p class="wordq">Việt có các thẻ số từ 0 đến 9. Việt muốn đặt một thẻ số vào vị trí
      dấu "?" để được một số có bốn chữ số lớn hơn ${b49advSp(L)} và bé hơn ${b49advSp(U)}.</p>
    <div class="b49adv-row">${so}</div>
    <div class="b49adv-sub">a) Việt có thể đặt những thẻ số nào vào vị trí dấu "?" ?</div>
    <div class="fill-line">${q.pick(ans, opts)}</div>
    <div class="b49adv-sub">b) Việt có tất cả bao nhiêu cách chọn thẻ số?</div>
    <div class="fill-line">Việt có ${q.num(valid.length, 1)} cách chọn.</div>
    <div class="hint-line">Ba số ${b49advSp(L)}, số cần tìm và ${b49advSp(U)} đều có chữ số hàng nghìn
      là ${a} và chữ số hàng trăm là ${b}, nên chỉ cần so sánh hai chữ số cuối.</div>`,
    `Các số lập được thoả mãn là: ${valid.map(x => b49advSp(a * 1000 + b * 100 + x * 10 + d)).join(', ')}. `
    + `Vậy thẻ số đặt được là ${valid.join(', ')} — có ${valid.length} cách chọn.`);
},

/* 6. Bài toán nhiều bước rồi làm tròn kết quả */
() => {
  const q = Q(6, '');
  const A = R(2400, 4800), B = R(300, 1200);
  const hai = A - B;
  const tong = A + hai;
  return q.done(`<p class="wordq">Ngày thứ nhất một cửa hàng bán được ${b49advSp(A)} kg gạo.
      Ngày thứ hai cửa hàng bán được ít hơn ngày thứ nhất ${b49advSp(B)} kg gạo.</p>
    <div class="fill-line">a) Ngày thứ hai cửa hàng bán được ${q.num(hai, 4)} kg gạo.</div>
    <div class="fill-line">b) Cả hai ngày cửa hàng bán được ${q.num(tong, 4)} kg gạo.</div>
    <div class="fill-line">c) Làm tròn số gạo bán được trong ngày thứ hai đến hàng chục ta được
      ${q.num(b49advR10(hai), 4)} kg.</div>
    <div class="fill-line">d) Làm tròn số gạo bán được trong cả hai ngày đến hàng trăm ta được
      ${q.num(b49advR100(tong), 4)} kg.</div>
    <div class="hint-line">Hãy tìm số gạo bán trong ngày thứ hai trước, sau đó tính số gạo bán được
      trong cả hai ngày rồi mới làm tròn.</div>`,
    `Ngày thứ hai: ${b49advSp(A)} − ${b49advSp(B)} = ${b49advSp(hai)} (kg). `
    + `Cả hai ngày: ${b49advSp(A)} + ${b49advSp(hai)} = ${b49advSp(tong)} (kg). `
    + `${b49advSp(hai)} → ${b49advSp(b49advR10(hai))} (hàng chục); `
    + `${b49advSp(tong)} → ${b49advSp(b49advR100(tong))} (hàng trăm).`);
},
];
