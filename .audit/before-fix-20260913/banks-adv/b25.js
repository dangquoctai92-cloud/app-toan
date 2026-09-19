/*CSS
.b25adv-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 14px;margin:10px 0}
.b25adv-cell{min-width:104px;padding:8px 12px;border:2.5px solid #b0aac6;border-radius:12px;
  background:#fff;font-size:18px;font-weight:800;color:#4a4460;text-align:center}
.b25adv-cell em{display:block;font-style:normal;font-size:13px;color:#d63384;margin-bottom:2px}
.b25adv-side{min-width:150px}
CSS*/

/* ===== NÂNG CAO — Bài 25: Phép chia hết, phép chia có dư ===== */

/* một phép chia số có hai chữ số cho số có một chữ số, thương có một chữ số,
   số dư cho trước (0 là phép chia hết) — giữ đúng phạm vi của bài */
const b25advMake = rem => {
  for (let g = 0; g < 400; g++){
    const b = R(Math.max(rem + 1, 2), 9);
    const t = R(2, 9);
    const a = t * b + rem;
    if (a < 10 || a > 99) continue;
    if (Math.floor(a / 10) >= b) continue;
    return {a, b, t, r:rem};
  }
  const bb = Math.max(rem + 1, 3);
  return {a:9 * bb + rem, b:bb, t:9, r:rem};
};

/* n phép chia khác nhau, số dư lấy trong danh sách rems */
const b25advSet = (n, rems) => {
  const out = [];
  for (let g = 0; g < 600 && out.length < n; g++){
    const it = b25advMake(pick(rems));
    if (it.b <= it.r) continue;
    if (out.some(x => x.a === it.a && x.b === it.b)) continue;
    out.push(it);
  }
  while (out.length < n){ const it = b25advMake(out.length % 2); out.push(it); }
  return out;
};

const b25advLen = v => String(v).length;

ADV.b25 = [

/* 1. Số dư lớn nhất của phép chia */
() => {
  const q = Q(1, 'Trả lời các câu hỏi sau về số dư của phép chia.');
  const bs = [];
  for (let g = 0; g < 60 && bs.length < 3; g++){
    const x = R(3, 9);
    if (!bs.includes(x)) bs.push(x);
  }
  for (let x = 3; x <= 9 && bs.length < 3; x++) if (!bs.includes(x)) bs.push(x);
  const b0 = bs[0], t = R(2, 9);
  const sbc = t * b0 + b0 - 1;
  return q.done(bs.map(b =>
      `<div class="fill-line">Trong phép chia cho ${b}, số dư lớn nhất là ${q.num(b - 1, 1)}</div>`).join('')
    + `<div class="fill-line">Một phép chia có số chia là ${b0}, thương là ${t} và số dư là số dư lớn nhất.
        Số bị chia của phép chia đó là ${q.num(sbc, b25advLen(sbc))}</div>
       <div class="fill-line">Nếu phép chia đó là phép chia hết thì số bị chia là
        ${q.num(t * b0, b25advLen(t * b0))}</div>
       <div class="hint-line">Số dư luôn bé hơn số chia.</div>`,
    `Số dư lớn nhất bé hơn số chia 1 đơn vị. ${t} × ${b0} = ${t * b0}; ${t * b0} + ${b0 - 1} = ${sbc}.`);
},

/* 2. Tìm số bị chia theo nhiều điều kiện */
() => {
  const q = Q(2, 'Tìm số thoả mãn tất cả các điều kiện sau.');
  let b = 5, r = 2, t = 3, n = 17;
  for (let g = 0; g < 400; g++){
    const bb = R(4, 9), rr = R(1, bb - 1), tt = R(2, 9);
    const nn = tt * bb + rr;
    if (nn < 10 || nn > 99) continue;
    if (Math.floor(nn / 10) >= bb) continue;
    b = bb; r = rr; t = tt; n = nn; break;
  }
  const lo = n - R(2, b - 1), hi = n + R(2, b - 1);
  return q.done(`<div class="bullet">Số đó là số có hai chữ số.</div>
    <div class="bullet">Số đó lớn hơn ${lo} và bé hơn ${hi}.</div>
    <div class="bullet">Số đó chia cho ${b} thì được số dư là ${r}.</div>
    <div class="fill-line">Số đó là ${q.num(n, 2)}</div>
    <div class="fill-line">Số đó chia cho ${b} được thương là ${q.num(t, 1)}</div>
    <div class="fill-line">Muốn có phép chia hết cho ${b} thì phải bớt số đó đi
      ${q.num(r, 1)} đơn vị.</div>
    <div class="fill-line">Hoặc thêm vào số đó ${q.num(b - r, 1)} đơn vị.</div>`,
    `Các số chia cho ${b} dư ${r} hơn kém nhau ${b} đơn vị, trong khoảng đã cho chỉ có ${n}. `
    + `${n} : ${b} = ${t} (dư ${r}).`);
},

/* 3. So sánh thương và số dư của các phép chia */
() => {
  const q = Q(3, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const s = b25advSet(6, [0, 1, 2, 3, 4, 5]);
  const rows = [
    {t:`Số dư của ${s[0].a} : ${s[0].b}`, p:`Số dư của ${s[1].a} : ${s[1].b}`, l:s[0].r, r:s[1].r},
    {t:`Thương của ${s[2].a} : ${s[2].b}`, p:`Thương của ${s[3].a} : ${s[3].b}`, l:s[2].t, r:s[3].t},
    {t:`Số dư của ${s[4].a} : ${s[4].b}`, p:`${s[4].r + pick([-1, 0, 0, 1, 2])}`, l:s[4].r, r:0},
    {t:`Thương của ${s[5].a} : ${s[5].b}`, p:`${Math.max(1, s[5].t + pick([-2, -1, 0, 0, 1, 2]))}`, l:s[5].t, r:0}
  ];
  rows[2].r = +rows[2].p; if (rows[2].r < 0){ rows[2].p = '0'; rows[2].r = 0; }
  rows[3].r = +rows[3].p;
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b25adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b25adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Thực hiện từng phép chia rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    s.map(x => `${x.a} : ${x.b} = ${x.t}` + (x.r ? ` (dư ${x.r})` : '')).join(' · '));
},

/* 4. Bài toán chia có dư nhiều bước */
() => {
  const q = Q(4, '');
  let it = b25advMake(R(1, 4));
  for (let g = 0; g < 200; g++){
    if (it.r >= 1 && it.b > it.r && it.t >= 3) break;
    it = b25advMake(R(1, 4));
  }
  if (it.r < 1 || it.b <= it.r){ it = {a:23, b:4, t:5, r:3}; }
  return q.done(`<p class="wordq">Bạn Mai có ${it.a} quả cam, bạn xếp vào các đĩa, mỗi đĩa ${it.b} quả cam.</p>
    <div class="fill-line">Bạn Mai xếp được ${q.num(it.t, 1)} đĩa cam như vậy.</div>
    <div class="fill-line">Sau khi xếp còn thừa ${q.num(it.r, 1)} quả cam.</div>
    <div class="fill-line">Muốn xếp hết số cam đó thì cần ít nhất ${q.num(it.t + 1, b25advLen(it.t + 1))} cái đĩa.</div>
    <div class="fill-line">Nếu muốn các đĩa đều có đủ ${it.b} quả cam thì bạn Mai cần thêm
      ${q.num(it.b - it.r, 1)} quả cam nữa.</div>`,
    `${it.a} : ${it.b} = ${it.t} (dư ${it.r}). Cần thêm 1 đĩa cho ${it.r} quả cam còn thừa, `
    + `hoặc thêm ${it.b} − ${it.r} = ${it.b - it.r} quả cam.`);
},

/* 5. Chọn phép chia hết, phép chia có dư */
() => {
  const q = Q(5, 'Quan sát các phép chia dưới đây rồi trả lời.');
  const nHet = R(2, 3);
  const het = b25advSet(nHet, [0]);
  const du = b25advSet(6 - nHet, [1, 2, 3, 4, 5]);
  const all = het.concat(du).sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const items = all.map((x, i) => ({...x, L:L[i]}));
  const dsHet = items.filter(x => x.r === 0).map(x => x.L).sort();
  const dsDu = items.filter(x => x.r !== 0).map(x => x.L).sort();
  return q.done(`<div class="b25adv-grid">${items.map(x =>
      `<div class="b25adv-cell"><em>${x.L}</em>${x.a} : ${x.b}</div>`).join('')}</div>
    <div class="fill-line">Các phép chia hết là ${q.pick(dsHet.join(','), L)}</div>
    <div class="fill-line">Các phép chia có dư là ${q.pick(dsDu.join(','), L)}</div>
    <div class="fill-line">Trong các phép chia trên có ${q.num(dsDu.length, 1)} phép chia có dư.</div>`,
    items.map(x => `${x.L}: ${x.a} : ${x.b} = ${x.t}` + (x.r ? ` (dư ${x.r})` : '')).join(' · '));
},
];
