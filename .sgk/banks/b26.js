/* ============== BÀI 26: CHIA SỐ CÓ HAI CHỮ SỐ CHO SỐ CÓ MỘT CHỮ SỐ (SGK tr.75, 76, 77, 78) ==============
   hoạt động tr.75 : bài 1 (Tính – chia hết)
   hoạt động tr.76 : bài 2 (Tính nhẩm theo mẫu), bài 3 (Tìm thừa số)
   hoạt động tr.77 : bài 1 (Tính – chia có dư), bài 2 (75 quả trứng gà), bài 3 (phép chia có số dư là 3)
   luyện tập tr.78 : bài 1 (Đặt tính rồi tính), bài 2 (Số ? – cân mèo, chó, rô-bốt),
                     bài 3 (lớp học – số bàn), bài 4 (Tìm số bị chia)
====================================================================================================== */

/* một phép chia đặt tính đầy đủ (1 hoặc 2 lượt chia) */
const b26Div = (q, a, b, show) => {
  const d1 = Math.floor(a / 10), u = a % 10;
  const t1 = Math.floor(d1 / b), rem1 = d1 - t1 * b;
  const cur = rem1 * 10 + u, t0 = Math.floor(cur / b), r = cur - t0 * b;
  const t = t1 * 10 + t0;
  const c = (v, cls) => `<span class="${cls || ''}">${v}</span>`;
  let h = c(a) + c(b, 'r ub');
  if (t1 > 0){
    const p1 = t1 * b, p2 = t0 * b;
    h += c(show ? p1 : q.num(p1), 'ub') + c(show ? t : q.num(t), 'r')
      + c(show ? (rem1 ? cur : '0' + cur) : q.num(cur)) + c('', 'e')
      + c(show ? p2 : q.num(p2), 'ub') + c('', 'e')
      + c(show ? r : q.num(r), 'e2') + c('', 'e');
  } else {
    const p = t0 * b;
    h += c(show ? p : q.num(p), 'ub') + c(show ? t : q.num(t), 'r')
      + c(show ? r : q.num(r), 'e2') + c('', 'e');
  }
  return `<div class="b26-dv">${h}</div>`;
};

/* phép chia số có hai chữ số cho số có một chữ số, số dư cho trước, thương có 2 chữ số hay không */
const b26Make = (rem, two) => {
  for (let g = 0; g < 500; g++){
    const b = R(Math.max(rem + 1, 2), 9);
    const t = two ? R(10, Math.floor((99 - rem) / b)) : R(2, 9);
    if (!Number.isFinite(t) || t < (two ? 10 : 2)) continue;
    const a = t * b + rem;
    if (a < 10 || a > 99) continue;
    if (two && Math.floor(a / 10) < b) continue;
    if (!two && Math.floor(a / 10) >= b) continue;
    return {a, b, t, r:rem};
  }
  const bb = Math.max(rem + 1, 2);
  const tt = two ? Math.max(10, Math.floor((99 - rem) / bb)) : 9;
  return {a:tt * bb + rem, b:bb, t:tt, r:rem};
};

ART.b26Boat = txt => `<svg viewBox="0 0 190 120">
  <path d="M18 74h154l-24 34H42z" fill="#a8794c" stroke="#6d4a26" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M18 74h154" stroke="#6d4a26" stroke-width="3"/>
  <ellipse cx="95" cy="66" rx="62" ry="12" fill="#7fc45e" stroke="#4d8a34" stroke-width="2"/>
  <g fill="#ffd35c" stroke="#c99a12" stroke-width="1.6">
    <circle cx="58" cy="60" r="9"/><circle cx="80" cy="57" r="9"/><circle cx="104" cy="58" r="9"/><circle cx="126" cy="61" r="9"/></g>
  <path d="M150 62q10-22 22-4" fill="none" stroke="#8d6a3f" stroke-width="4" stroke-linecap="round"/>
  <text x="95" y="98" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">${txt}</text>
  <path d="M4 112q22-8 44 0t44 0 44 0 44 0" fill="none" stroke="#8fd3ef" stroke-width="4"/></svg>`;

ART.b26Pet = (kind, n, kg) => {
  const one = (k, x) => {
    if (k === 'meo') return `<g transform="translate(${x},0)">
      <ellipse cx="14" cy="30" rx="12" ry="10" fill="#8c8c96" stroke="#4d4d57" stroke-width="1.6"/>
      <circle cx="14" cy="16" r="8" fill="#8c8c96" stroke="#4d4d57" stroke-width="1.6"/>
      <path d="M8 10l-2-8 7 4zM20 10l2-8-7 4z" fill="#8c8c96" stroke="#4d4d57" stroke-width="1.4"/>
      <path d="M26 30q10-4 6-14" fill="none" stroke="#4d4d57" stroke-width="3" stroke-linecap="round"/></g>`;
    if (k === 'cho') return `<g transform="translate(${x},0)">
      <ellipse cx="16" cy="28" rx="14" ry="11" fill="#c69355" stroke="#7a5527" stroke-width="1.6"/>
      <circle cx="16" cy="13" r="8.5" fill="#c69355" stroke="#7a5527" stroke-width="1.6"/>
      <path d="M8 8q-6 2-4 12 5 0 7-6zM24 8q6 2 4 12-5 0-7-6z" fill="#a97a3e" stroke="#7a5527" stroke-width="1.4"/>
      <path d="M30 26q10-2 6-12" fill="none" stroke="#7a5527" stroke-width="3" stroke-linecap="round"/></g>`;
    return `<g transform="translate(${x},0)">
      <path d="M4 40q0-20 12-20t12 20z" fill="#e2564c" stroke="#95271f" stroke-width="1.6"/>
      <rect x="6" y="6" width="20" height="14" rx="6" fill="#e2564c" stroke="#95271f" stroke-width="1.6"/>
      <circle cx="12" cy="13" r="2.4" fill="#fff"/><circle cx="20" cy="13" r="2.4" fill="#fff"/>
      <path d="M16 6V0" stroke="#95271f" stroke-width="2"/><circle cx="16" cy="-1" r="2.4" fill="#95271f"/>
      <circle cx="16" cy="30" r="5" fill="#fff" stroke="#95271f" stroke-width="1.4"/></g>`;
  };
  const gs = Array.from({length:n}, (_, i) => one(kind, 8 + i * 26)).join('');
  const W = 30 + n * 26;
  return `<svg viewBox="-6 -6 ${W} 96"><g transform="translate(0,6)">${gs}</g>
    <rect x="0" y="48" width="${W - 12}" height="10" rx="3" fill="#cfe4e6" stroke="#7fa5a8" stroke-width="2"/>
    <rect x="${(W - 12) / 2 - 34}" y="58" width="68" height="24" rx="4" fill="#fff" stroke="#7fa5a8" stroke-width="2"/>
    <text x="${(W - 12) / 2}" y="76" text-anchor="middle" font-size="16" font-weight="800" fill="#2b4a4c">${kg} kg</text></svg>`;
};

BANKS.b26 = [

/* ===== tr.75 – Bài 1: Tính (phép chia hết, thương có hai chữ số) ===== */
() => {
  const q = Q(1, 'Tính.');
  const list = [];
  for (let g = 0; g < 500 && list.length < 4; g++){
    const it = b26Make(0, true);
    if (!list.some(x => x.a === it.a && x.b === it.b)) list.push(it);
  }
  while (list.length < 4) list.push({a:36 + list.length * 3, b:3, t:(36 + list.length * 3) / 3, r:0});
  return q.done('<div class="b26-row">' + list.map((it, i) =>
      `<div class="b26-sail">${b26Div(q, it.a, it.b, i === 0)}</div>`).join('') + '</div>'
    + noteBox(`Mẫu: ${list[0].a} : ${list[0].b} = ${list[0].t}`),
    list.slice(1).map(x => `${x.a} : ${x.b} = ${x.t}`).join(' · '));
},

/* ===== tr.76 – Bài 2: Tính nhẩm (theo mẫu) ===== */
() => {
  const q = Q(2, 'Tính nhẩm (theo mẫu).');
  let mc = 9, mm = 3;
  for (let g = 0; g < 300; g++){
    const c = R(4, 9), m = R(2, 9);
    if (c % m === 0 && m > 1){ mc = c; mm = m; break; }
  }
  const items = [];
  for (let g = 0; g < 500 && items.length < 4; g++){
    const c = R(2, 9), m = R(2, 9);
    if (c % m !== 0) continue;
    if (c === mc && m === mm) continue;
    if (items.some(x => x.c === c && x.m === m)) continue;
    items.push({c, m});
  }
  let f = 2;
  while (items.length < 4){ if (!items.some(x => x.c === f && x.m === 2) && f % 2 === 0) items.push({c:f, m:2}); f++; }
  const box = noteBox(`Mẫu: ${mc * 10} : ${mm} = ?<br>
    &nbsp;&nbsp;Nhẩm: ${mc} chục : ${mm} = ${mc / mm} chục<br>
    &nbsp;&nbsp;${mc * 10} : ${mm} = ${mc / mm * 10}`);
  const grid = '<div class="calc-grid">' + items.map(x =>
    `<div class="calc-cell">${x.c * 10} : ${x.m} = ${q.num(x.c / x.m * 10)}</div>`).join('') + '</div>';
  return q.done(box + grid, items.map(x => `${x.c * 10} : ${x.m} = ${x.c / x.m * 10}`).join(' · '));
},

/* ===== tr.76 – Bài 3: Tìm thừa số ===== */
() => {
  const q = Q(3, 'Tìm thừa số.');
  const items = [];
  for (let g = 0; g < 500 && items.length < 4; g++){
    const b = R(2, 9), hi = Math.floor(99 / b);
    if (hi < 11) continue;
    const x = R(11, hi);
    if (items.some(it => it.b === b && it.x === x)) continue;
    items.push({b, x, left:Math.random() < .5});
  }
  while (items.length < 4) items.push({b:3, x:11 + items.length, left:true});
  return q.done('<div class="b26-row">' + items.map(it =>
      `<span class="b26-leaf">${it.left ? it.b + ' × ' + q.num(it.x, 2) : q.num(it.x, 2) + ' × ' + it.b}
        = ${it.b * it.x}</span>`).join('') + '</div>'
    + '<div class="hint-line">Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết.</div>',
    items.map(it => `${it.b * it.x} : ${it.b} = ${it.x}`).join(' · '));
},

/* ===== tr.77 – Bài 1: Tính (phép chia có dư) ===== */
() => {
  const q = Q(1, 'Tính.');
  const list = [];
  for (let g = 0; g < 600 && list.length < 4; g++){
    const two = list.length === 0 ? true : Math.random() < .7;
    const b = R(2, 9), r = R(1, b - 1);
    const it = b26Make(r, two);
    if (it.r !== r) continue;
    if (!list.some(x => x.a === it.a && x.b === it.b)) list.push(it);
  }
  while (list.length < 4) list.push(b26Make(1, true));
  return q.done('<div class="b26-row">' + list.map((it, i) =>
      `<div class="b26-card">${b26Div(q, it.a, it.b, i === 0)}</div>`).join('') + '</div>'
    + noteBox(`Mẫu: ${list[0].a} : ${list[0].b} = ${list[0].t} (dư ${list[0].r})`),
    list.slice(1).map(x => `${x.a} : ${x.b} = ${x.t} (dư ${x.r})`).join(' · '));
},

/* ===== tr.77 – Bài 2: bác Hoa chia trứng gà vào các rổ ===== */
() => {
  const q = Q(2, '');
  const ro = R(2, 5), moi = R(11, Math.floor(99 / R(2, 2) / 1));
  const m2 = R(11, Math.floor(99 / ro)), tong = m2 * ro;
  return q.done(`<p class="wordq">Bác Hoa mang ${tong} quả trứng gà ra chợ bán. Bác chia đều số trứng gà đó
      vào ${ro} rổ. Hỏi mỗi rổ có bao nhiêu quả trứng gà?</p>
    <div class="fill-line">Mỗi rổ có ${q.num(m2)} quả trứng gà.</div>`,
    `${tong} : ${ro} = ${m2} (quả trứng gà)`);
},

/* ===== tr.77 – Bài 3: tìm các phép chia có số dư là 3 ===== */
() => {
  const q = Q(3, 'Tìm các phép chia có số dư là 3.');
  const list = [];
  for (let g = 0; g < 600 && list.length < 2; g++){
    const it = b26Make(3, Math.random() < .6);
    if (!list.some(x => x.a === it.a && x.b === it.b)) list.push(it);
  }
  while (list.length < 2) list.push(b26Make(3, true));
  for (let g = 0; g < 600 && list.length < 5; g++){
    const b = R(2, 9), r = R(0, b - 1);
    if (r === 3) continue;
    const it = b26Make(r, Math.random() < .6);
    if (it.r === 3) continue;
    if (!list.some(x => x.a === it.a && x.b === it.b)) list.push(it);
  }
  while (list.length < 5) list.push(b26Make(0, true));
  const show = list.slice().sort(() => Math.random() - .5);
  const ok = show.filter(x => x.r === 3).map(x => `${x.a} : ${x.b}`);
  const opts = show.map(x => `${x.a} : ${x.b}`);
  return q.done('<div class="b26-row">' + show.map(x =>
      `<div class="b26-boat">${ART.b26Boat(x.a + ' : ' + x.b)}</div>`).join('') + '</div>'
    + `<div class="fill-line">Các phép chia có số dư là 3: ${q.pick(ok.slice().sort().join(','), opts)}</div>`,
    show.map(x => `${x.a} : ${x.b} = ${x.t}` + (x.r ? ` (dư ${x.r})` : '')).join(' · '));
},

/* ===== tr.78 – Luyện tập bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const A = [], B = [];
  for (let g = 0; g < 500 && A.length < 2; g++){
    const it = b26Make(0, true);
    if (!A.some(x => x.a === it.a && x.b === it.b)) A.push(it);
  }
  while (A.length < 2) A.push(b26Make(0, true));
  for (let g = 0; g < 600 && B.length < 2; g++){
    const b = R(3, 9), r = R(1, b - 1);
    const it = b26Make(r, true);
    if (it.r === 0) continue;
    if (!B.some(x => x.a === it.a && x.b === it.b)) B.push(it);
  }
  while (B.length < 2) B.push(b26Make(1, true));
  const eqA = A.map(x => `<div class="b26-eq">${x.a} : ${x.b} = ${q.num(x.t, 2)}</div>`).join('');
  const eqB = B.map(x => `<div class="b26-eq">${x.a} : ${x.b} = ${q.num(x.t, 2)}
      (dư ${q.num(x.r, 1)})</div>`).join('');
  return q.done(`<div class="sub-lbl">a)</div><div class="b26-eqs">${eqA}</div>
      <div class="sub-lbl">b)</div><div class="b26-eqs">${eqB}</div>
      <div class="hint-line">Đặt tính ra nháp rồi điền kết quả vào ô trống.</div>`,
    A.map(x => `${x.a} : ${x.b} = ${x.t}`).join(' · ') + ' · '
      + B.map(x => `${x.a} : ${x.b} = ${x.t} (dư ${x.r})`).join(' · '));
},

/* ===== tr.78 – Luyện tập bài 2: Số ? (cân mèo, chó, rô-bốt) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const nm = R(3, 5), wm = R(2, 5);
  const nc = R(3, 5), wc = R(11, 19);
  const nr = R(3, 5), wr = R(6, 12);
  return q.done(`<p class="wordq">Trong hình dưới đây, các con mèo có cân nặng bằng nhau,
      các con chó và rô-bốt cũng vậy.</p>
    <div class="b26-row">
      <div class="b26-scale">${ART.b26Pet('meo', nm, nm * wm)}
        <div>Mỗi con mèo cân nặng ${q.num(wm, 2)} kg.</div></div>
      <div class="b26-scale">${ART.b26Pet('cho', nc, nc * wc)}
        <div>Mỗi con chó cân nặng ${q.num(wc, 2)} kg.</div></div>
      <div class="b26-scale">${ART.b26Pet('robot', nr, nr * wr)}
        <div>Mỗi rô-bốt cân nặng ${q.num(wr, 2)} kg.</div></div>
    </div>`,
    `${nm * wm} : ${nm} = ${wm};  ${nc * wc} : ${nc} = ${wc};  ${nr * wr} : ${nr} = ${wr}`);
},

/* ===== tr.78 – Luyện tập bài 3: lớp học cần ít nhất bao nhiêu bàn ===== */
() => {
  const q = Q(3, '');
  const moi = R(2, 4);
  let hs = R(21, 45);
  for (let g = 0; g < 60 && hs % moi === 0; g++) hs = R(21, 45);
  if (hs % moi === 0) hs += 1;
  const ban = Math.floor(hs / moi) + (hs % moi ? 1 : 0);
  return q.done(`<p class="wordq">Một lớp học có ${hs} học sinh. Mỗi bàn chỉ xếp chỗ ngồi cho ${moi} học sinh.
      Hỏi cần ít nhất bao nhiêu bàn cho lớp học đó?</p>
    <div class="fill-line">Cần ít nhất ${q.num(ban)} cái bàn.</div>`,
    `${hs} : ${moi} = ${Math.floor(hs / moi)} (dư ${hs % moi}) nên cần thêm 1 bàn nữa, tất cả ${ban} bàn.`);
},

/* ===== tr.78 – Luyện tập bài 4: Tìm số bị chia ===== */
() => {
  const q = Q(4, 'Tìm số bị chia.');
  const items = [];
  for (let g = 0; g < 500 && items.length < 3; g++){
    const b = R(2, 9), hi = Math.floor(99 / b);
    if (hi < 11) continue;
    const t = R(11, hi);
    if (items.some(x => x.b === b && x.t === t)) continue;
    items.push({b, t});
  }
  while (items.length < 3) items.push({b:3, t:11 + items.length});
  return q.done('<div class="b26-step">' + items.map(it =>
      `<div class="b26-stbox">${q.num(it.b * it.t, 2)} : ${it.b} = ${it.t}</div>`).join('') + '</div>'
    + '<div class="hint-line">Muốn tìm số bị chia, ta lấy thương nhân với số chia.</div>',
    items.map(it => `${it.t} × ${it.b} = ${it.b * it.t}`).join(' · '));
},
];
