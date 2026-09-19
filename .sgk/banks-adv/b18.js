/* ===== NÂNG CAO — Bài 18: Góc, góc vuông, góc không vuông ===== */

const b18advBag = n => 'ABCDEGHIKMNOPQ'.split('').sort(() => Math.random() - .5).slice(0, n);

/* các bộ tia chung gốc: mọi tia nằm trong nửa mặt phẳng nên mỗi cặp tia cho đúng một góc */
const b18advFanT = [
  [0, 45, 90, 135], [0, 30, 90, 120], [0, 60, 90, 150], [0, 40, 90, 130],
  [0, 35, 90, 125], [0, 25, 90, 115], [0, 50, 90, 140], [0, 20, 90, 110],
  [0, 30, 60, 120], [0, 40, 70, 130], [0, 20, 50, 110], [0, 35, 65, 125],
  [0, 45, 90], [0, 30, 90], [0, 60, 90], [0, 55, 90], [0, 25, 90], [0, 70, 90]
];

/* n tia chung gốc, tia thứ i mang tên names[i + 1], gốc là names[0] */
const b18advFan = (base, offs, names) => {
  const cx = 116, cy = 146, len = 92, lab = 110, rd = d => d * Math.PI / 180;
  const s = offs.map((o, i) => {
    const d = base + o;
    const x = cx + len * Math.cos(rd(d)), y = cy - len * Math.sin(rd(d));
    const lx = cx + lab * Math.cos(rd(d)), ly = cy - lab * Math.sin(rd(d));
    return `<path d="M${cx} ${cy}L${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="#2b2b2b"
        stroke-width="3" stroke-linecap="round"/>
      <text x="${lx.toFixed(1)}" y="${(ly + 6).toFixed(1)}" text-anchor="middle"
        font-size="18" font-weight="700">${names[i + 1]}</text>`;
  }).join('');
  return `<svg viewBox="-8 -12 248 192" class="b18adv-fan">${s}
    <circle cx="${cx}" cy="${cy}" r="4"/>
    <text x="${cx - 8}" y="${cy + 24}" text-anchor="middle" font-size="18" font-weight="700">${names[0]}</text></svg>`;
};

/* đường gấp khúc: các đoạn nằm ngang / thẳng đứng và các đoạn xiên */
const b18advAx = [[3, 0], [-3, 0], [0, 3], [0, -3]];
const b18advSl = [[3, -2], [3, 2], [-3, 2], [-3, -2], [2, 3], [2, -3], [-2, 3], [-2, -3]];
const b18advDot = (a, b) => a[0] * b[0] + a[1] * b[1];
const b18advCross = (a, b) => a[0] * b[1] - a[1] * b[0];
const b18advIsAx = v => v[0] === 0 || v[1] === 0;

/* sinh đường gấp khúc m đoạn: không có hai đoạn xiên liền nhau nên góc vuông
   luôn là góc giữa một đoạn ngang và một đoạn thẳng đứng — nhìn là nhận ra ngay */
const b18advPath = m => {
  for (let g = 0; g < 60; g++){
    const dirs = [pick(b18advAx.concat(b18advSl))];
    let ok = true;
    for (let i = 1; i < m; i++){
      const pool = (b18advIsAx(dirs[i - 1]) ? b18advAx.concat(b18advSl) : b18advAx)
        .slice().sort(() => Math.random() - .5);
      let found = null;
      for (let k = 0; k < pool.length; k++){
        if (b18advCross(dirs[i - 1], pool[k]) === 0) continue;
        found = pool[k]; break;
      }
      if (!found){ ok = false; break; }
      dirs.push(found);
    }
    if (!ok) continue;
    let v = 0;
    for (let i = 1; i < dirs.length; i++) if (b18advDot(dirs[i - 1], dirs[i]) === 0) v++;
    if (v >= 1 && v <= dirs.length - 2) return {dirs: dirs, vuong: v};
  }
  return {dirs: [[3, 0], [0, -3], [3, 0], [3, 2], [0, 3]], vuong: 2};
};

const b18advSh = dirs => {
  const C = 20, pts = [[0, 0]];
  let x = 0, y = 0;
  dirs.forEach(d => { x += d[0]; y += d[1]; pts.push([x, y]); });
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const mx = Math.min.apply(null, xs), my = Math.min.apply(null, ys);
  const W = (Math.max.apply(null, xs) - mx) * C + 24, H = (Math.max.apply(null, ys) - my) * C + 24;
  const d = pts.map((p, i) => (i ? 'L' : 'M') + ((p[0] - mx) * C + 12) + ' ' + ((p[1] - my) * C + 12)).join('');
  const dots = pts.map(p =>
    `<circle cx="${(p[0] - mx) * C + 12}" cy="${(p[1] - my) * C + 12}" r="3.4"/>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="b18adv-sh">
    <path d="${d}" fill="none" stroke="#2b2b2b" stroke-width="3.2"
      stroke-linecap="round" stroke-linejoin="round"/>${dots}</svg>`;
};

/* mặt đồng hồ lúc đúng h giờ */
const b18advClock = h => {
  const cx = 62, cy = 62, r = 54, rd = d => d * Math.PI / 180;
  let tick = '';
  for (let i = 0; i < 12; i++){
    const a = rd(i * 30);
    const x1 = cx + (r - 8) * Math.sin(a), y1 = cy - (r - 8) * Math.cos(a);
    const x2 = cx + (r - 2) * Math.sin(a), y2 = cy - (r - 2) * Math.cos(a);
    tick += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"
      stroke="#4a4460" stroke-width="${i % 3 === 0 ? 3 : 1.6}"/>`;
  }
  const num = [12, 3, 6, 9].map((n, k) => {
    const a = rd(k * 90);
    const x = cx + (r - 17) * Math.sin(a), y = cy - (r - 17) * Math.cos(a);
    return `<text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle"
      font-size="13" font-weight="700" fill="#4a4460">${n}</text>`;
  }).join('');
  const ah = rd(h % 12 * 30);
  const hx = cx + 30 * Math.sin(ah), hy = cy - 30 * Math.cos(ah);
  return `<svg viewBox="0 0 124 124" class="b18adv-clock">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#4a4460" stroke-width="3"/>
    ${tick}${num}
    <path d="M${cx} ${cy}L${hx.toFixed(1)} ${hy.toFixed(1)}" stroke="#d63384" stroke-width="5" stroke-linecap="round"/>
    <path d="M${cx} ${cy}V${cy - 44}" stroke="#2b6fd6" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#4a4460"/></svg>`;
};

ADV.b18 = [

/* 1. Đếm số góc tạo bởi nhiều tia chung gốc */
() => {
  const q = Q(1, 'Đếm số góc có trong hình vẽ dưới đây.');
  const offs = pick(b18advFanT);
  const base = R(1, 3) * 10;
  const names = b18advBag(offs.length + 1);
  const n = offs.length, tong = n * (n - 1) / 2;
  let v = 0;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (offs[j] - offs[i] === 90) v++;
  const tia = offs.map((o, i) => names[0] + names[i + 1]);
  return q.done(b18advFan(base, offs, names)
    + `<div class="fill-line">Từ đỉnh ${names[0]} vẽ được ${q.num(n, 1)} tia: ${tia.join(', ')}.</div>
       <div class="fill-line">Cứ hai tia chung đỉnh ${names[0]} tạo thành một góc, vậy hình vẽ có tất cả
         ${q.num(tong, 2)} góc đỉnh ${names[0]}.</div>
       <div class="fill-line">Dùng ê ke kiểm tra, trong đó có ${q.num(v, 1)} góc vuông
         và ${q.num(tong - v, 1)} góc không vuông.</div>`,
    `Với ${n} tia chung đỉnh, số góc là ${Array.from({length: n - 1}, (_, i) => n - 1 - i).join(' + ')} = ${tong} (góc). `
    + `Trong đó có ${v} góc vuông.`);
},

/* 2. Đếm góc vuông của một đường gấp khúc dài */
() => {
  const q = Q(2, 'Quan sát đường gấp khúc dưới đây rồi trả lời.');
  const m = R(5, 7);
  const P = b18advPath(m);
  const so = P.dirs.length, goc = so - 1, v = P.vuong;
  return q.done(b18advSh(P.dirs)
    + `<div class="fill-line">Đường gấp khúc trên gồm ${q.num(so, 1)} đoạn thẳng.</div>
       <div class="fill-line">Ở mỗi điểm nối hai đoạn thẳng có một góc, vậy đường gấp khúc có
         ${q.num(goc, 1)} góc.</div>
       <div class="fill-line">Trong đó có ${q.num(v, 1)} góc vuông và ${q.num(goc - v, 1)} góc không vuông.</div>
       <div class="hint-line">Góc vuông là góc có một cạnh nằm ngang và một cạnh thẳng đứng.</div>`,
    `Đường gấp khúc ${so} đoạn thẳng có ${so} − 1 = ${goc} góc; đếm được ${v} góc vuông `
    + `nên số góc không vuông là ${goc} − ${v} = ${goc - v}.`);
},

/* 3. Kim đồng hồ tạo thành góc vuông */
() => {
  const q = Q(3, 'Hai kim của đồng hồ nào dưới đây tạo thành một góc vuông?');
  const co = [3, 9].sort(() => Math.random() - .5).slice(0, R(1, 2));
  const khac = [1, 2, 4, 5, 6, 7, 8, 10, 11, 12].sort(() => Math.random() - .5).slice(0, 4 - co.length);
  const hours = co.concat(khac).sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D'];
  const ans = hours.map((h, i) => ({h: h, n: L[i]}))
    .filter(x => x.h === 3 || x.h === 9).map(x => x.n).sort().join(',');
  const row = '<div class="b18adv-row">' + hours.map((h, i) =>
    `<div class="b18adv-item">${b18advClock(h)}<em>${L[i]}. ${h} giờ</em></div>`).join('') + '</div>';
  return q.done(row
    + `<div class="fill-line">Trong bốn đồng hồ trên có ${q.num(co.length, 1)} đồng hồ mà hai kim
         tạo thành góc vuông.</div>
       <div class="fill-line">Đó là các đồng hồ: ${q.pick(ans, L)}</div>
       <div class="hint-line">Kim phút luôn chỉ số 12. Hãy xem kim giờ chỉ vào số nào.</div>`,
    `Lúc 3 giờ và lúc 9 giờ, kim giờ và kim phút tạo thành một góc vuông.`);
},

/* 4. Bài toán ngược: biết tổng số góc vuông, tìm số hình */
() => {
  const q = Q(4, '');
  const cn = R(3, 9), tg = R(2, 8), tong = 4 * cn + tg;
  return q.done(`<p class="wordq">Bạn Nam vẽ một số hình chữ nhật và ${tg} hình tam giác vuông.
      Mỗi hình chữ nhật có 4 góc vuông, mỗi hình tam giác vuông có 1 góc vuông.
      Tất cả các hình bạn Nam vẽ có ${tong} góc vuông. Hỏi bạn Nam vẽ mấy hình chữ nhật?</p>
    <div class="fill-line">${tg} hình tam giác vuông có ${q.num(tg, 2)} góc vuông.</div>
    <div class="fill-line">Các hình chữ nhật có ${q.num(4 * cn, 2)} góc vuông.</div>
    <div class="fill-line">Bạn Nam đã vẽ ${q.num(cn, 2)} hình chữ nhật.</div>
    <div class="fill-line">Bạn Nam đã vẽ tất cả ${q.num(cn + tg, 2)} hình.</div>`,
    `1 × ${tg} = ${tg} (góc vuông);  ${tong} − ${tg} = ${4 * cn} (góc vuông);  `
    + `${4 * cn} : 4 = ${cn} (hình chữ nhật);  ${cn} + ${tg} = ${cn + tg} (hình).`);
},

/* 5. So sánh số góc của các hình */
() => {
  const q = Q(5, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const x = R(2, 6), y = 4 * x + pick([-3, -1, 0, 0, 2, 5]);
    rows.push({t: `Số góc vuông của ${x} hình chữ nhật`, p: `Số góc vuông của ${y} hình tam giác vuông`,
      l: 4 * x, r: y});
  }
  {
    const p = R(2, 8), k = 4 * p + pick([-4, -2, 0, 0, 3, 6]);
    rows.push({t: `Số góc vuông của ${p} hình vuông`, p: `${k} góc vuông`, l: 4 * p, r: k});
  }
  {
    const m = R(2, 6), n = R(2, 8);
    rows.push({t: `Số góc của ${m} hình tứ giác`, p: `Số góc của ${n} hình tam giác`, l: 4 * m, r: 3 * n});
  }
  {
    const a = R(2, 7), b = a + pick([-1, 0, 0, 1]);
    rows.push({t: `Số góc vuông của ${a} hình vuông`, p: `Số góc vuông của ${b} hình chữ nhật`,
      l: 4 * a, r: 4 * b});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Hình vuông và hình chữ nhật đều có 4 góc vuông; hình tam giác vuông có 1 góc vuông ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},
];
