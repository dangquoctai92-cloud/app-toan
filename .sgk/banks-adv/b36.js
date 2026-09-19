/* ===== NÂNG CAO — Bài 36: Nhân số có ba chữ số với số có một chữ số ===== */

/* n phép nhân khác nhau, tích không quá 999 */
const b36advMul = n => {
  const out = [];
  for (let g = 0; g < 500 && out.length < n; g++){
    const b = R(2, 9), a = R(101, Math.floor(999 / b));
    if (out.some(x => x.a === a && x.b === b)) continue;
    out.push({a, b, r: a * b});
  }
  while (out.length < n){ const a = 111 + out.length; out.push({a, b: 2, r: a * 2}); }
  return out;
};

/* số có ba chữ số mà mọi chữ số nhân với k đều không quá 9 (nhân không nhớ) */
const b36advKhongNho = k => {
  const m = Math.floor(9 / k);
  const a = R(1, m), b = R(0, m), c = R(0, m);
  return a * 100 + b * 10 + c;
};

ADV.b36 = [

/* 1. Tìm thừa số chưa biết (nhân không nhớ nên nhẩm được từng hàng) */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const rows = [];
  for (let i = 0; i < 2; i++){
    const k = R(2, 4);
    const n = b36advKhongNho(k);
    rows.push({loai: 'tso', n, k, r: n * k});
  }
  for (let i = 0; i < 2; i++){
    const k = R(2, 4);
    const n = b36advKhongNho(k);
    rows.push({loai: 'nhan', n, k, r: n * k});
  }
  const html = rows.map(x => x.loai === 'tso'
    ? `<div class="eq">${q.num(x.n, 3)} × ${x.k} = ${x.r}</div>`
    : `<div class="eq">${x.n} × ${q.num(x.k, 1)} = ${x.r}</div>`).join('');
  return q.done(`<div class="eq-list">${html}</div>
    <div class="hint-line">Ở các phép nhân này không có nhớ, em hãy nhẩm theo từng hàng
      trăm, chục, đơn vị.</div>`,
    rows.map(x => `${x.n} × ${x.k} = ${x.r}`).join(' · '));
},

/* 2. So sánh giá trị các biểu thức có phép nhân */
() => {
  const q = Q(2, 'Tính giá trị mỗi vế rồi điền dấu thích hợp vào ô trống.');
  const s = b36advMul(4);
  const rows = [];
  rows.push({t: `${s[0].a} × ${s[0].b}`, p: `${s[1].a} × ${s[1].b}`, l: s[0].r, r: s[1].r});
  {
    const d = R(1, 9) * 10;
    const len = s[2].r + d <= 999 ? s[2].r + d : s[2].r - d;
    const v = pick([s[2].r, s[2].r, len, s[2].r - d]);
    rows.push({t: `${s[2].a} × ${s[2].b}`, p: `${v}`, l: s[2].r, r: v});
  }
  {
    const a = s[3].a;
    const hi = Math.floor(999 / a);
    const b2 = hi > 2 ? R(2, hi) : 2;
    rows.push({t: `${a} × ${s[3].b}`, p: `${a} × ${b2}`, l: s[3].r, r: a * b2});
  }
  {
    const a = R(101, 300), k = R(2, 3), s = a * k;
    const u = R(5, Math.floor(s / 10) - 5) * 10;
    const v0 = s - u;
    const v = pick([v0, v0, v0 + R(1, 4) * 10, v0 - R(1, 4) * 10]);
    rows.push({t: `${a} × ${k}`, p: `${u} + ${v}`, l: s, r: u + v});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.l} và ${x.r}`).join(' · '));
},

/* 3. Tìm số có ba chữ số theo nhiều điều kiện rồi nhân */
() => {
  const q = Q(3, 'Tìm số có ba chữ số thoả mãn tất cả các điều kiện sau, rồi trả lời câu hỏi.');
  const t = R(1, 3);
  const n = 123 * t;
  const k = R(2, Math.floor(999 / n));
  return q.done(`<div class="bullet">Chữ số hàng trăm của số đó là ${t}.</div>
    <div class="bullet">Chữ số hàng chục gấp 2 lần chữ số hàng trăm.</div>
    <div class="bullet">Chữ số hàng đơn vị bằng tổng của chữ số hàng trăm và chữ số hàng chục.</div>
    <div class="fill-line">Số cần tìm là ${q.num(n, 3)}</div>
    <div class="fill-line">Tổng ba chữ số của số đó là ${q.num(6 * t)}</div>
    <div class="fill-line">Số đó nhân với ${k} được ${q.num(n * k)}</div>`,
    `Hàng trăm ${t}, hàng chục ${2 * t}, hàng đơn vị ${3 * t} nên số đó là ${n};  ${n} × ${k} = ${n * k}`);
},

/* 4. Dãy số theo quy luật gấp lên nhiều lần */
() => {
  const q = Q(4, 'Tìm quy luật rồi viết tiếp ba số của dãy số sau.');
  const b = pick([105, 110, 111, 120, 123, 125, 130, 140]);
  const seq = [1, 2, 3, 4].map(i => b * i);
  return q.done(`<div class="chain pill">${seq.map(x => `<span class="cnode">${x}</span>`).join('')}
      <span class="cnode q">${q.num(b * 5)}</span>
      <span class="cnode q">${q.num(b * 6)}</span>
      <span class="cnode q">${q.num(b * 7)}</span></div>
    <div class="fill-line">Mỗi số trong dãy hơn số đứng ngay trước nó ${q.num(b)} đơn vị.</div>
    <div class="fill-line">Số thứ bảy của dãy hơn số thứ tư ${q.num(3 * b)} đơn vị.</div>
    <div class="hint-line">Số thứ nhất là ${b} × 1, số thứ hai là ${b} × 2, ...</div>`,
    `Dãy số: ${seq.concat([b * 5, b * 6, b * 7]).join(', ')}`);
},

/* 5. Bài toán ba bước với phép nhân */
() => {
  const q = Q(5, '');
  const p = pick([20, 25, 30, 40, 50]);
  const m = R(2, 4), k = R(2, 3);
  const tong = p * m * k;
  const ban = R(1, Math.floor(tong / 10) - 1) * 10;
  return q.done(`<p class="wordq">Một cửa hàng nhận về ${k} thùng vở, mỗi thùng có ${m} hộp,
      mỗi hộp có ${p} quyển vở. Cửa hàng đã bán được ${ban} quyển vở.</p>
    <div class="fill-line">Mỗi thùng có ${q.num(p * m)} quyển vở.</div>
    <div class="fill-line">Cửa hàng nhận về tất cả ${q.num(tong)} quyển vở.</div>
    <div class="fill-line">Cửa hàng còn lại ${q.num(tong - ban)} quyển vở.</div>`,
    `${p} × ${m} = ${p * m} (quyển);  ${p * m} × ${k} = ${tong} (quyển);  `
    + `${tong} − ${ban} = ${tong - ban} (quyển)`);
},

/* 6. Chọn các phép nhân có tích thoả mãn điều kiện */
() => {
  const q = Q(6, 'Quan sát các phép nhân dưới đây rồi trả lời.');
  const N = pick([400, 500, 600]);
  let list = [];
  for (let g = 0; g < 200; g++){
    const th = b36advMul(6);
    const tr = th.filter(x => x.r > N).length;
    if (tr < 2 || tr > 4) continue;
    if (th.some(x => x.r === N)) continue;
    const mx = Math.max.apply(null, th.map(x => x.r));
    if (th.filter(x => x.r === mx).length !== 1) continue;
    list = th; break;
  }
  if (!list.length){
    list = [{a: 111, b: 2, r: 222}, {a: 123, b: 3, r: 369}, {a: 201, b: 4, r: 804},
      {a: 152, b: 5, r: 760}, {a: 130, b: 2, r: 260}, {a: 111, b: 6, r: 666}];
  }
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const items = list.map((x, i) => ({...x, L: L[i]}));
  const tren = items.filter(x => x.r > N).map(x => x.L);
  const duoi = items.filter(x => x.r < N).map(x => x.L);
  const maxR = Math.max.apply(null, items.map(x => x.r));
  const lon = items.find(x => x.r === maxR).L;
  return q.done(`<div class="calc-grid">${items.map(x =>
      `<div class="calc-cell">${x.L}. ${x.a} × ${x.b}</div>`).join('')}</div>
    <div class="fill-line">Các phép nhân có tích lớn hơn ${N}: ${q.pick(tren.join(','), L)}</div>
    <div class="fill-line">Các phép nhân có tích bé hơn ${N}: ${q.pick(duoi.join(','), L)}</div>
    <div class="fill-line">Có ${q.num(tren.length, 1)} phép nhân có tích lớn hơn ${N}.</div>
    <div class="fill-line">Phép nhân có tích lớn nhất là ${q.pick(lon, L)}</div>`,
    items.map(x => `${x.L}: ${x.a} × ${x.b} = ${x.r}`).join(' · '));
},
];
