/* ===== NÂNG CAO — Bài 37: Chia số có ba chữ số cho số có một chữ số ===== */

/* một phép chia "số có ba chữ số : số có một chữ số" với số dư cho trước */
const b37advChia = du => {
  for (let g = 0; g < 400; g++){
    const b = R(du + 1 > 2 ? du + 1 : 2, 9);
    const lo = Math.ceil((100 - du) / b), hi = Math.floor((999 - du) / b);
    if (hi < lo) continue;
    const t = R(lo, hi);
    const a = t * b + du;
    if (a < 100 || a > 999) continue;
    return {a, b, t, du};
  }
  const b = du + 1 > 2 ? du + 1 : 2;
  const t = Math.ceil((100 - du) / b);
  return {a: t * b + du, b, t, du};
};

/* n phép chia khác nhau, số dư lấy trong mảng dus */
const b37advBo = (n, dus) => {
  const out = [];
  for (let g = 0; g < 600 && out.length < n; g++){
    const it = b37advChia(pick(dus));
    if (out.some(x => x.a === it.a && x.b === it.b)) continue;
    out.push(it);
  }
  while (out.length < n) out.push(b37advChia(0));
  return out;
};

const b37advLen = v => String(v).length;

ADV.b37 = [

/* 1. Số có ba chữ số lớn nhất, bé nhất chia hết cho một số */
() => {
  const q = Q(1, 'Trả lời các câu hỏi sau.');
  const b = R(3, 9);
  const lon = Math.floor(999 / b) * b;
  const be = Math.ceil(100 / b) * b;
  let X = R(200, 999);
  for (let g = 0; g < 80 && X % b === 0; g++) X = R(200, 999);
  if (X % b === 0) X = X - 1;
  const du = X % b, duoi = X - du;
  return q.done(`<div class="fill-line">Số có ba chữ số lớn nhất chia hết cho ${b} là
      ${q.num(lon, 3)}, khi đó thương là ${q.num(lon / b, b37advLen(lon / b))}</div>
    <div class="fill-line">Số có ba chữ số bé nhất chia hết cho ${b} là
      ${q.num(be, 3)}, khi đó thương là ${q.num(be / b, b37advLen(be / b))}</div>
    <div class="fill-line">Số ${X} chia cho ${b} được số dư là ${q.num(du, 1)}</div>
    <div class="fill-line">Số lớn nhất bé hơn ${X} mà chia hết cho ${b} là ${q.num(duoi, 3)}</div>
    <div class="hint-line">Hãy chia rồi bớt đi phần dư.</div>`,
    `999 : ${b} = ${Math.floor(999 / b)}` + (999 % b ? ` (dư ${999 % b})` : '')
    + `, nên số lớn nhất là ${lon}.  ${X} : ${b} = ${Math.floor(X / b)} (dư ${du}), `
    + `nên ${X} − ${du} = ${duoi}.`);
},

/* 2. Bài toán ngược: tìm số bị chia */
() => {
  const q = Q(2, 'Tìm số bị chia của mỗi phép chia sau.');
  let b = 3, t = 100;
  for (let g = 0; g < 300; g++){
    const bb = R(3, 9);
    const lo = Math.ceil((100 - bb + 1) / bb), hi = Math.floor((999 - bb + 1) / bb);
    if (hi < lo) continue;
    b = bb; t = R(lo, hi); break;
  }
  const a = t * b + b - 1;
  const it = b37advChia(0);
  return q.done(`<div class="fill-line"><b>a)</b> Một phép chia có số chia là ${b}, thương là ${t}
      và số dư là số dư lớn nhất.</div>
    <div class="fill-line">Số dư của phép chia đó là ${q.num(b - 1, 1)}</div>
    <div class="fill-line">Số bị chia của phép chia đó là ${q.num(a, b37advLen(a))}</div>
    <div class="fill-line"><b>b)</b> Một phép chia hết có số chia là ${it.b} và thương là ${it.t}.</div>
    <div class="fill-line">Số bị chia của phép chia đó là ${q.num(it.a, 3)}</div>
    <div class="hint-line">Số dư luôn bé hơn số chia · Số bị chia bằng thương nhân với số chia
      rồi cộng với số dư.</div>`,
    `a) ${t} × ${b} = ${t * b};  ${t * b} + ${b - 1} = ${a}.  b) ${it.t} × ${it.b} = ${it.a}.`);
},

/* 3. Bài toán chia có dư nhiều bước */
() => {
  const q = Q(3, '');
  const it = b37advChia(R(1, 5));
  const them = it.b - it.du;
  return q.done(`<p class="wordq">Nhà trường có ${it.a} quyển vở, muốn chia đều cho ${it.b} lớp.</p>
    <div class="fill-line">Mỗi lớp được nhiều nhất ${q.num(it.t, b37advLen(it.t))} quyển vở.</div>
    <div class="fill-line">Sau khi chia, nhà trường còn thừa ${q.num(it.du, 1)} quyển vở.</div>
    <div class="fill-line">Muốn chia hết mà mỗi lớp được thêm 1 quyển nữa thì nhà trường
      cần có thêm ít nhất ${q.num(them, b37advLen(them))} quyển vở.</div>
    <div class="fill-line">Khi đó mỗi lớp được ${q.num(it.t + 1, b37advLen(it.t + 1))} quyển vở.</div>
    <div class="hint-line">Số vở cần thêm bằng số lớp trừ đi số vở còn thừa.</div>`,
    `${it.a} : ${it.b} = ${it.t} (dư ${it.du});  ${it.b} − ${it.du} = ${them} (quyển)`);
},

/* 4. So sánh giá trị các biểu thức có phép chia */
() => {
  const q = Q(4, 'Tính giá trị mỗi vế rồi điền dấu thích hợp vào ô trống.');
  const s = b37advBo(4, [0]);
  const rows = [];
  rows.push({t: `${s[0].a} : ${s[0].b}`, p: `${s[1].a} : ${s[1].b}`, l: s[0].t, r: s[1].t});
  {
    const v = pick([s[2].t, s[2].t, s[2].t + R(1, 9), s[2].t - R(1, 9)]);
    rows.push({t: `${s[2].a} : ${s[2].b}`, p: `${v}`, l: s[2].t, r: v});
  }
  {
    const c = R(2, 9);
    const d = Math.round(s[3].t / c) + pick([-1, 0, 0, 1]);
    const dd = d < 2 ? 2 : d;
    rows.push({t: `${s[3].a} : ${s[3].b}`, p: `${c} × ${dd}`, l: s[3].t, r: c * dd});
  }
  {
    const u = b37advChia(0);
    const lech = u.t - 1 > 20 ? 20 : u.t - 1;
    const w = pick([u.t, u.t, u.t + R(1, 20), u.t - R(1, lech)]);
    rows.push({t: `${u.a} : ${u.b}`, p: `${w}`, l: u.t, r: w});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.l} và ${x.r}`).join(' · '));
},

/* 5. Bài toán ba bước với phép chia */
() => {
  const q = Q(5, '');
  const k = R(3, 8);
  const m = R(Math.ceil(100 / k), 99);
  const T = k * m;
  const ban = R(1, k - 1);
  return q.done(`<p class="wordq">Một cửa hàng có ${T} kg gạo được chia đều vào ${k} bao.
      Cửa hàng đã bán được ${ban} bao gạo.</p>
    <div class="fill-line">Mỗi bao có ${q.num(m, b37advLen(m))} kg gạo.</div>
    <div class="fill-line">Cửa hàng đã bán được ${q.num(ban * m, b37advLen(ban * m))} kg gạo.</div>
    <div class="fill-line">Cửa hàng còn lại ${q.num(k - ban, 1)} bao gạo.</div>
    <div class="fill-line">Số gạo còn lại là ${q.num((k - ban) * m, b37advLen((k - ban) * m))} kg.</div>`,
    `${T} : ${k} = ${m} (kg);  ${m} × ${ban} = ${ban * m} (kg);  ${k} − ${ban} = ${k - ban} (bao);  `
    + `${m} × ${k - ban} = ${(k - ban) * m} (kg)`);
},

/* 6. Chọn phép chia hết, phép chia có dư */
() => {
  const q = Q(6, 'Quan sát các phép chia dưới đây rồi trả lời.');
  let items = [];
  for (let g = 0; g < 200; g++){
    const nHet = R(2, 4);
    const het = b37advBo(nHet, [0]);
    const codu = b37advBo(6 - nHet, [1, 2, 3, 4, 5]);
    const all = het.concat(codu).sort(() => Math.random() - .5);
    if (all.some((x, i) => all.findIndex(y => y.a === x.a && y.b === x.b) !== i)) continue;
    const mx = Math.max.apply(null, all.map(x => x.t));
    if (all.filter(x => x.t === mx).length !== 1) continue;
    items = all; break;
  }
  if (!items.length){
    items = [{a: 246, b: 2, t: 123, du: 0}, {a: 369, b: 3, t: 123, du: 0},
      {a: 505, b: 5, t: 101, du: 0}, {a: 247, b: 3, t: 82, du: 1},
      {a: 358, b: 4, t: 89, du: 2}, {a: 179, b: 6, t: 29, du: 5}];
  }
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const list = items.map((x, i) => ({...x, L: L[i]}));
  const het = list.filter(x => x.du === 0).map(x => x.L);
  const du = list.filter(x => x.du > 0).map(x => x.L);
  const mx = Math.max.apply(null, list.map(x => x.t));
  const lon = list.find(x => x.t === mx).L;
  return q.done(`<div class="calc-grid">${list.map(x =>
      `<div class="calc-cell">${x.L}. ${x.a} : ${x.b}</div>`).join('')}</div>
    <div class="fill-line">Các phép chia hết là: ${q.pick(het.join(','), L)}</div>
    <div class="fill-line">Các phép chia có dư là: ${q.pick(du.join(','), L)}</div>
    <div class="fill-line">Có ${q.num(het.length, 1)} phép chia hết.</div>
    <div class="fill-line">Phép chia có thương lớn nhất là: ${q.pick(lon, L)}</div>`,
    list.map(x => `${x.L}: ${x.a} : ${x.b} = ${x.t}` + (x.du ? ` (dư ${x.du})` : '')).join(' · '));
},
];
