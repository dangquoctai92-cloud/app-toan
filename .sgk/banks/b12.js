/* ==================== BÀI 12: BẢNG NHÂN 9, BẢNG CHIA 9 (SGK trang 36, 37, 38) ====================
   · Hoạt động (tr.37): bài 1, 2
   · Luyện tập (tr.37): bài 1, 2, 3, 4, 5
   · Luyện tập (tr.38): bài 1, 2, 3, 4
============================================================================================== */



BANKS.b12 = [

/* ===== Hoạt động tr.37 – Bài 1: tính nhẩm ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5);
  const cols = [ks.slice(0, 3), ks.slice(3, 6), ks.slice(6, 9), null];
  const lbl = ['a)', 'b)', 'c)', 'd)'];
  const html = cols.map((c, i) => {
    const cells = c
      ? c.map(k => `<div class="calc-cell">9 × ${k} = ${q.num(9 * k)}</div>`).join('')
      : `<div class="calc-cell">9 × 10 = ${q.num(90)}</div>
         <div class="calc-cell">9 × 0 = ${q.num(0)}</div>
         <div class="calc-cell">0 × 9 = ${q.num(0)}</div>`;
    return `<div class="sub-lbl">${lbl[i]}</div><div class="calc-grid">${cells}</div>`;
  }).join('');
  return q.done(html);
},

/* ===== Hoạt động tr.37 – Bài 2: hai phép tính nào có cùng kết quả ===== */
() => {
  const q = Q(2, 'Hai phép tính nào dưới đây có cùng kết quả?');
  const POOL = [2, 3, 4, 5, 6, 7, 8, 9, 18, 27, 36, 45];
  const vals = [];
  let guard = 0;
  while (vals.length < 4 && guard++ < 300){ const v = pick(POOL); if (!vals.includes(v)) vals.push(v); }
  const leftExp = v => (v % 9 === 0 && v / 9 <= 9) ? `9 × ${v / 9}` : `${9 * v} : 9`;
  const rightExp = (v, ex) => {
    const cand = [];
    for (let a = 2; a <= 9; a++){ const b = v / a; if (v % a === 0 && b >= 2 && b <= 9) cand.push(`${a} × ${b}`); }
    [2, 3, 4, 5].forEach(d => { if (v * d <= 90) cand.push(`${v * d} : ${d}`); });
    const ok = cand.filter(x => x !== ex);
    return ok.length ? pick(ok) : `${v} × 1`;
  };
  const pairs = vals.map(v => { const l = leftExp(v); return {v, l, r:rightExp(v, l)}; });
  const left = [...pairs].sort(() => Math.random() - .5);
  const right = [...pairs].sort(() => Math.random() - .5);
  const opts = right.map(p => p.r);
  const html = `<div class="melon-row">${left.map(p => `<span class="melon">${p.l}</span>`).join('')}</div>
    <div class="melon-row">${right.map(p => `<span class="basket">${p.r}</span>`).join('')}</div>`
    + left.map(p => `<div class="fill-line">${p.l} có cùng kết quả với ${q.pick(p.r, opts)}</div>`).join('')
    + '<div class="hint-line">Chạm để chọn phép tính có cùng kết quả.</div>';
  return q.done(html, pairs.map(p => `${p.l} = ${p.r} = ${p.v}`).join(' · '));
},

/* ===== Luyện tập tr.37 – Bài 1: nêu các số còn thiếu ===== */
() => {
  const q = Q(1, 'Nêu các số còn thiếu.');
  const hidden = () => {
    const h = [];
    let guard = 0;
    while (h.length < 4 && guard++ < 200){ const i = R(1, 8); if (!h.includes(i)) h.push(i); }
    return h;
  };
  const hu = hidden(), hd = hidden();
  const up = Array.from({length:10}, (_, i) => 9 * (i + 1));
  const dn = Array.from({length:10}, (_, i) => 90 - 9 * i);
  const node = (v, i, hs) => hs.includes(i)
    ? `<span class="cnode q">${q.num(v)}</span>` : `<span class="cnode">${v}</span>`;
  return q.done(`<div class="sub-lbl">a)</div>
      <div class="chain dia">${up.map((v, i) => node(v, i, hu)).join('')}</div>
    <div class="sub-lbl">b)</div>
      <div class="chain pill">${dn.map((v, i) => node(v, i, hd)).join('')}</div>`);
},

/* ===== Luyện tập tr.37 – Bài 2: Số ? (sơ đồ mũi tên) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const a = pick([2, 3, 4, 6]);
  const p = 9 * a;
  const b = pick([2, 3, 4, 6, 9].filter(x => p % x === 0 && p / x >= 2));
  const arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
      <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;
  return q.done(`<div class="flow">
      <span class="fnode sq">9</span>${arrow('× ' + a)}
      <span class="fnode circle">${q.num(p)}</span>${arrow(': ' + b)}
      <span class="fnode tri">${q.num(p / b)}</span>
    </div>`,
    `9 × ${a} = ${p};  ${p} : ${b} = ${p / b}`);
},

/* ===== Luyện tập tr.37 – Bài 3: những bông hoa nào ghi phép tính có kết quả... ===== */
() => {
  const q = Q(3, 'Những bông hoa nào ghi phép tính có kết quả:');
  const T = 10;
  const bigK = [];
  let guard = 0;
  while (bigK.length < 2 && guard++ < 200){ const k = R(2, 9); if (!bigK.includes(k)) bigK.push(k); }
  const smallK = [];
  guard = 0;
  while (smallK.length < 2 && guard++ < 200){ const k = R(2, 9); if (!smallK.includes(k)) smallK.push(k); }
  const items = bigK.map(k => ({t:`9 × ${k}`, v:9 * k}))
    .concat(smallK.map(k => ({t:`${9 * k} : 9`, v:k})))
    .concat([{t:'90 : 9', v:10}])
    .sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D', 'E'];
  const list = items.map((x, i) => ({...x, L:L[i]}));
  const big = list.filter(x => x.v > T).map(x => x.L).sort();
  const small = list.filter(x => x.v < T).map(x => x.L).sort();
  const flower = (t, letter) => `<svg viewBox="0 0 110 118">
    <g fill="#f7cf3f" stroke="#d8a712" stroke-width="2">
      <ellipse cx="55" cy="20" rx="13" ry="17"/><ellipse cx="55" cy="80" rx="13" ry="17"/>
      <ellipse cx="21" cy="50" rx="17" ry="13"/><ellipse cx="89" cy="50" rx="17" ry="13"/>
      <ellipse cx="30" cy="28" rx="15" ry="11" transform="rotate(-45 30 28)"/>
      <ellipse cx="80" cy="28" rx="15" ry="11" transform="rotate(45 80 28)"/>
      <ellipse cx="30" cy="72" rx="15" ry="11" transform="rotate(45 30 72)"/>
      <ellipse cx="80" cy="72" rx="15" ry="11" transform="rotate(-45 80 72)"/>
    </g>
    <rect x="14" y="40" width="82" height="22" rx="10" fill="#f08a3c" stroke="#c4641c" stroke-width="2"/>
    <text x="55" y="56" font-size="15" font-weight="700" fill="#fff" text-anchor="middle">${t}</text>
    <text x="55" y="112" font-size="16" font-weight="700" fill="#4a4460" text-anchor="middle">${letter}</text>
  </svg>`;
  const html = `<div class="flower-row">${list.map(x => flower(x.t, x.L)).join('')}</div>
    <div class="fill-line">a) Lớn hơn ${T}? ${q.pick(big.join(','), L)}</div>
    <div class="fill-line">b) Bé hơn ${T}? ${q.pick(small.join(','), L)}</div>`;
  return q.done(html, list.map(x => `${x.L}: ${x.t} = ${x.v}`).join(' · '));
},

/* ===== Luyện tập tr.37 – Bài 4: chia đều nước mắm vào can ===== */
() => {
  const q = Q(4, '');
  const each = R(2, 9), all = 9 * each;
  return q.done(`<p class="wordq">Chia đều ${all} <i>l</i> nước mắm vào 9 cái can.
      Hỏi mỗi can có bao nhiêu lít nước mắm?</p>
    <div class="fill-line">Mỗi can có ${q.num(each)} <i>l</i> nước mắm.</div>`,
    `${all} : 9 = ${each} (l)`);
},

/* ===== Luyện tập tr.37 – Bài 5: bài toán về những chiếc thuyền ===== */
() => {
  const q = Q(5, '');
  const n = R(2, 9);
  return q.done(`<p class="wordq">Trên mỗi thuyền có 9 người. Hỏi trên ${n} thuyền như vậy có bao nhiêu người?</p>
    <div class="fill-line">Trên ${n} thuyền có ${q.num(9 * n)} người.</div>`,
    `9 × ${n} = ${9 * n} (người)`);
},

/* ===== Luyện tập tr.38 – Bài 1: bảng nhân, chia ===== */
() => {
  const q = Q(1, 'a) Giới thiệu bảng nhân, chia:');
  const head = '<tr><th class="hdr"></th>'
    + Array.from({length:10}, (_, j) => `<th class="hdr">${j + 1}</th>`).join('') + '</tr>';
  const body = Array.from({length:8}, (_, i) => {
    const r = i + 2;
    return `<tr><td class="lft">${r}</td>`
      + Array.from({length:10}, (_, j) => `<td>${r * (j + 1)}</td>`).join('') + '</tr>';
  }).join('');
  const a = R(2, 9), b = R(2, 9), c = R(2, 9), d = R(2, 9);
  const e = R(2, 9), f = R(2, 9), g = R(2, 9), h = R(2, 9);
  const html = `<div class="tbl-wrap"><table class="tbl amber mtbl">${head}${body}</table></div>
    ${noteBox('Mẫu: 4 × 3 = ?<br>• Từ số 4 ở cột 1 theo chiều mũi tên dóng sang phải.<br>'
      + '• Từ số 3 ở hàng 1 theo chiều mũi tên dóng xuống.<br>'
      + '• Hai mũi tên gặp nhau ở số 12.<br>• Ta có: 4 × 3 = 12.')}
    ${noteBox('Mẫu: 42 : 6 = ?<br>• Từ số 6 ở cột 1 theo chiều mũi tên dóng sang phải đến số 42.<br>'
      + '• Từ số 42 theo chiều mũi tên dóng lên hàng 1 gặp số 7.<br>• Ta có: 42 : 6 = 7.')}
    <div class="sub-lbl">b) Dựa vào bảng nhân, chia hãy tính.</div>
    <div class="calc-grid">
      <div class="calc-cell">${a} × ${b} = ${q.num(a * b)}</div>
      <div class="calc-cell">${c} × ${d} = ${q.num(c * d)}</div>
      <div class="calc-cell">${e * f} : ${e} = ${q.num(f)}</div>
      <div class="calc-cell">${g * h} : ${g} = ${q.num(h)}</div>
    </div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.38 – Bài 2: Số ? (thừa số – tích, số bị chia – thương) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const x = [R(2, 9), R(2, 9), R(2, 9)], y = [R(2, 9), R(2, 9), R(2, 9)];
  const u = [R(2, 9), R(2, 9), R(2, 9)], w = [R(2, 9), R(2, 9), R(2, 9)];
  const html = `<div class="two-tbl">
    <div><div class="sub-lbl">a)</div><table class="tbl blue">
      <tr><th>Thừa số</th>${x.map(v => `<td>${v}</td>`).join('')}</tr>
      <tr><th>Thừa số</th>${y.map(v => `<td>${v}</td>`).join('')}</tr>
      <tr><th>Tích</th><td>${x[0] * y[0]}</td><td>${q.num(x[1] * y[1])}</td><td>${q.num(x[2] * y[2])}</td></tr>
    </table></div>
    <div><div class="sub-lbl">b)</div><table class="tbl pink">
      <tr><th>Số bị chia</th>${u.map((v, i) => `<td>${v * w[i]}</td>`).join('')}</tr>
      <tr><th>Số chia</th>${w.map(v => `<td>${v}</td>`).join('')}</tr>
      <tr><th>Thương</th><td>${u[0]}</td><td>${q.num(u[1])}</td><td>${q.num(u[2])}</td></tr>
    </table></div>
  </div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.38 – Bài 3: bài toán túi cam ===== */
() => {
  const q = Q(3, '');
  const per = R(6, 9), bags = R(2, 9);
  return q.done(`<p class="wordq">Mỗi túi có ${per} quả cam. Hỏi ${bags} túi như vậy có bao nhiêu quả cam?</p>
    <div class="fill-line">${bags} túi có ${q.num(per * bags)} quả cam.</div>`,
    `${per} × ${bags} = ${per * bags} (quả cam)`);
},

/* ===== Luyện tập tr.38 – Bài 4: tìm hai số lớn hơn 1 và có tích cho trước ===== */
() => {
  const q = Q(4, '');
  const g = pick([[2, 3], [2, 5], [2, 7], [3, 5], [3, 7], [5, 7]]);   // tích chỉ có duy nhất một cặp
  const P = g[0] * g[1];
  return q.done(`<p class="wordq">Tìm hai số lớn hơn 1 và có tích là ${P}.</p>
    <div class="fill-line">Hai số đó là ${q.num(g[0])} và ${q.num(g[1])}.</div>`,
    `${g[0]} × ${g[1]} = ${P}`);
},
];
