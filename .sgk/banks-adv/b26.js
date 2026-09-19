/* ===== NÂNG CAO — Bài 26: Chia số có hai chữ số cho số có một chữ số ===== */

/* một phép chia "số có hai chữ số : số có một chữ số"
   two = true  : thương có hai chữ số
   two = false : thương có một chữ số */
const b26advMake = (two, rem) => {
  for (let g = 0; g < 500; g++){
    const b = R(Math.max(rem + 1, 2), 9);
    const hi = Math.floor((99 - rem) / b);
    if (two && hi < 10) continue;
    const t = two ? R(10, hi) : R(2, 9);
    const a = t * b + rem;
    if (a < 10 || a > 99) continue;
    if (two && Math.floor(a / 10) < b) continue;
    if (!two && Math.floor(a / 10) >= b) continue;
    return {a, b, t, r:rem};
  }
  if (two) return {a:30 + rem, b:3, t:10, r:rem};
  const bb = Math.max(rem + 1, 3);
  return {a:9 * bb + rem, b:bb, t:9, r:rem};
};

/* n phép chia khác nhau */
const b26advSet = (n, two, rems) => {
  const out = [];
  for (let g = 0; g < 800 && out.length < n; g++){
    const it = b26advMake(two, pick(rems));
    if (out.some(x => x.a === it.a && x.b === it.b)) continue;
    out.push(it);
  }
  while (out.length < n) out.push(b26advMake(two, 0));
  return out;
};

const b26advLen = v => String(v).length;

ADV.b26 = [

/* 1. Số có hai chữ số lớn nhất, bé nhất chia hết cho một số */
() => {
  const q = Q(1, 'Trả lời các câu hỏi sau.');
  const b = R(3, 9);
  const lon = Math.floor(99 / b) * b;
  const be = Math.ceil(10 / b) * b;
  let X = R(50, 99);
  for (let g = 0; g < 60 && X % b === 0; g++) X = R(50, 99);
  if (X % b === 0) X = X - 1;
  const du = X % b, duoi = X - du;
  return q.done(`<div class="fill-line">Số có hai chữ số lớn nhất chia hết cho ${b} là
      ${q.num(lon, 2)}, khi đó thương là ${q.num(lon / b, b26advLen(lon / b))}</div>
    <div class="fill-line">Số có hai chữ số bé nhất chia hết cho ${b} là
      ${q.num(be, 2)}, khi đó thương là ${q.num(be / b, b26advLen(be / b))}</div>
    <div class="fill-line">Số ${X} chia cho ${b} được thương là
      ${q.num(Math.floor(X / b), b26advLen(Math.floor(X / b)))} và số dư là ${q.num(du, 1)}</div>
    <div class="fill-line">Số lớn nhất bé hơn hoặc bằng ${X} mà chia hết cho ${b} là ${q.num(duoi, 2)}</div>
    <div class="hint-line">Hãy chia rồi bớt đi phần dư.</div>`,
    `99 : ${b} = ${Math.floor(99 / b)}` + (99 % b ? ` (dư ${99 % b})` : '') + `, nên số lớn nhất là ${lon}. `
    + `${X} : ${b} = ${Math.floor(X / b)}` + (du ? ` (dư ${du})` : '') + `, nên ${X} − ${du} = ${duoi}.`);
},

/* 2. Tìm số có hai chữ số theo hai điều kiện */
() => {
  const q = Q(2, 'Tìm số có hai chữ số thoả mãn cả hai điều kiện sau.');
  let b = 7, n = 98, S = 17;
  for (let g = 0; g < 300; g++){
    const bb = R(3, 9);
    const cands = [];
    for (let x = 10; x <= 99; x++) if (x % bb === 0) cands.push(x);
    const nn = pick(cands);
    const ss = Math.floor(nn / 10) + nn % 10;
    if (cands.filter(x => Math.floor(x / 10) + x % 10 === ss).length !== 1) continue;
    b = bb; n = nn; S = ss; break;
  }
  return q.done(`<div class="bullet">Số đó chia hết cho ${b}.</div>
    <div class="bullet">Tổng hai chữ số của số đó bằng ${S}.</div>
    <div class="fill-line">Số đó là ${q.num(n, 2)}</div>
    <div class="fill-line">Số đó chia cho ${b} được thương là ${q.num(n / b, b26advLen(n / b))}</div>
    <div class="hint-line">Hãy viết các số có hai chữ số chia hết cho ${b} rồi tính tổng hai chữ số của chúng.</div>`,
    `Số cần tìm là ${n} vì ${n} : ${b} = ${n / b} và ${Math.floor(n / 10)} + ${n % 10} = ${S}.`);
},

/* 3. Bài toán ngược: tìm số bị chia */
() => {
  const q = Q(3, 'Tìm số bị chia của mỗi phép chia sau.');
  let b = 3, t = 10;
  for (let g = 0; g < 200; g++){
    const bb = R(3, 9);
    const hi = Math.floor((99 - (bb - 1)) / bb);
    if (hi < 10) continue;
    b = bb; t = R(10, hi); break;
  }
  const a = t * b + b - 1;
  const it = b26advMake(true, 0);
  return q.done(`<div class="fill-line"><b>a)</b> Một phép chia có số chia là ${b}, thương là ${t}
      và số dư là số dư lớn nhất.</div>
    <div class="fill-line">Số dư của phép chia đó là ${q.num(b - 1, 1)}</div>
    <div class="fill-line">Số bị chia của phép chia đó là ${q.num(a, 2)}</div>
    <div class="fill-line"><b>b)</b> Một phép chia hết có số chia là ${it.b} và thương là ${it.t}.</div>
    <div class="fill-line">Số bị chia của phép chia đó là ${q.num(it.a, 2)}</div>
    <div class="hint-line">Số bị chia bằng thương nhân với số chia rồi cộng với số dư.</div>`,
    `a) ${t} × ${b} = ${t * b}; ${t * b} + ${b - 1} = ${a}.  b) ${it.t} × ${it.b} = ${it.a}.`);
},

/* 4. So sánh giá trị các biểu thức có phép chia */
() => {
  const q = Q(4, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const s = b26advSet(4, true, [0]);
  const u = b26advSet(2, false, [0]);
  const v1 = Math.max(1, s[1].t + pick([-3, -1, 0, 0, 2, 4]));
  const c = R(2, 9), d = Math.max(2, Math.round(s[2].t / c) + pick([-1, 0, 0, 1]));
  const rows = [
    {t:`${s[0].a} : ${s[0].b}`, p:`${u[0].a} : ${u[0].b}`, l:s[0].t, r:u[0].t},
    {t:`${s[1].a} : ${s[1].b}`, p:`${v1}`, l:s[1].t, r:v1},
    {t:`${s[2].a} : ${s[2].b}`, p:`${c} × ${d}`, l:s[2].t, r:c * d},
    {t:`${s[3].a} : ${s[3].b}`, p:`${u[1].a} : ${u[1].b}`, l:s[3].t, r:u[1].t}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b26adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b26adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính giá trị của mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    s.concat(u).map(x => `${x.a} : ${x.b} = ${x.t}`).join(' · '));
},

/* 5. Bài toán ba bước với phép chia */
() => {
  const q = Q(5, '');
  const k = R(2, 4), m = R(11, 24), ban = R(1, k - 1);
  const T = k * m;
  return q.done(`<p class="wordq">Một cửa hàng có ${T} kg gạo, người ta chia đều số gạo đó vào ${k} túi.
      Cửa hàng đã bán được ${ban} túi gạo.</p>
    <div class="fill-line">Mỗi túi có ${q.num(m, 2)} kg gạo.</div>
    <div class="fill-line">Cửa hàng đã bán được ${q.num(ban * m, b26advLen(ban * m))} kg gạo.</div>
    <div class="fill-line">Cửa hàng còn lại ${q.num(k - ban, 1)} túi gạo.</div>
    <div class="fill-line">Số gạo còn lại là ${q.num((k - ban) * m, b26advLen((k - ban) * m))} kg.</div>`,
    `${T} : ${k} = ${m} (kg);  ${m} × ${ban} = ${ban * m} (kg);  ${k} − ${ban} = ${k - ban} (túi);  `
    + `${m} × ${k - ban} = ${(k - ban) * m} (kg).`);
},

/* 6. Chọn các phép chia có thương là số có hai chữ số */
() => {
  const q = Q(6, 'Quan sát các phép chia dưới đây rồi trả lời.');
  const nHai = R(2, 4);
  const hai = b26advSet(nHai, true, [0, 1, 2, 3]);
  const mot = b26advSet(6 - nHai, false, [0, 1, 2, 3]);
  const all = hai.concat(mot).sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const items = all.map((x, i) => ({...x, L:L[i]}));
  const ds2 = items.filter(x => x.t >= 10).map(x => x.L).sort();
  const ds1 = items.filter(x => x.t < 10).map(x => x.L).sort();
  return q.done(`<div class="b26adv-grid">${items.map(x =>
      `<div class="b26adv-cell"><em>${x.L}</em>${x.a} : ${x.b}</div>`).join('')}</div>
    <div class="fill-line">Các phép chia có thương là số có hai chữ số: ${q.pick(ds2.join(','), L)}</div>
    <div class="fill-line">Các phép chia có thương là số có một chữ số: ${q.pick(ds1.join(','), L)}</div>
    <div class="fill-line">Có ${q.num(ds2.length, 1)} phép chia có thương là số có hai chữ số.</div>
    <div class="hint-line">Nếu chữ số hàng chục của số bị chia lớn hơn hoặc bằng số chia
      thì thương có hai chữ số.</div>`,
    items.map(x => `${x.L}: ${x.a} : ${x.b} = ${x.t}` + (x.r ? ` (dư ${x.r})` : '')).join(' · '));
},
];
