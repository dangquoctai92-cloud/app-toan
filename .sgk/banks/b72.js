/* ==================== BÀI 72: LUYỆN TẬP CHUNG
   (SGK tập 2 – tr.101, 102)
   luyện tập tr.101 : bài 1 (Tính nhẩm), bài 2 (Đ, S ?),
                      bài 3 (Đặt tính rồi tính), bài 4 (Nam mua vở bằng tiền 20 000 đồng),
                      bài 5 (Tính giá trị của biểu thức)
   luyện tập tr.102 : bài 1 (Rô-bốt đi đường nào tới toà lâu đài – kết quả bé hơn 8 000),
                      bài 2 (Đặt tính rồi tính), bài 3 (Tính giá trị của biểu thức),
                      bài 4 (nông trường cây chanh và cây cam), bài 5 (Tìm chữ số thích hợp)
========================================================================================= */

/* viết số theo kiểu sách: 24 132 */
const NSP72 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* khung phép chia dạng cột */
ART.b72Frame = (a, b, quo, rem) => `<div class="b72-div">
  <span class="b72-a">${NSP72(a)}</span><span class="b72-b">${b}</span>
  <span class="b72-c">${quo}</span>
  <span class="b72-d">${rem || ''}</span></div>`;

/* khung phép nhân dạng cột */
ART.b72Mul = (a, b, res) => `<div class="b72-mul">
  <span class="s"></span><span class="v">${NSP72(a)}</span>
  <span class="s">&times;</span><span class="v">${b}</span>
  <span class="bar"></span>
  <span class="s"></span><span class="v">${res}</span></div>`;

/* phép nhân viết theo từng chữ số (bài "Tìm chữ số thích hợp") */
function col72(top, opSign, mid, bot){
  const w = Math.max(top.length, mid.length, bot.length);
  const row = (cells, op) => '<div class="r">'
    + `<u>${op || ''}</u>`
    + Array.from({length: w - cells.length}, () => '<i></i>').join('')
    + cells.map(c => `<i>${c}</i>`).join('') + '</div>';
  return `<div class="b72-col">${row(top)}${row(mid, opSign)}<div class="bar"></div>${row(bot)}</div>`;
}

/* phép chia hết: số bị chia năm chữ số, thương bốn chữ số */
function het72(){
  const b = R(2, 9);
  const lo = Math.max(1000, Math.ceil(10000 / b));
  const hi = Math.min(9999, Math.floor(99999 / b));
  const t = R(lo, hi);
  return {b, t, r: 0, a: t * b};
}

/* phép chia có dư: số bị chia năm chữ số, thương bốn chữ số */
function du72(){
  const b = R(3, 9);
  const r = R(1, b - 1);
  const lo = Math.max(1000, Math.ceil((10000 - r) / b));
  const hi = Math.min(9999, Math.floor((99999 - r) / b));
  const t = R(lo, hi);
  return {b, t, r, a: t * b + r};
}

/* phép nhân số có bốn chữ số với số có một chữ số, tích có năm chữ số */
function nhan72(){
  const b = R(2, 9);
  const lo = Math.max(1000, Math.ceil(10000 / b));
  const hi = Math.min(9999, Math.floor(99999 / b));
  const a = R(lo, hi);
  return {a, b, r: a * b};
}

/* tờ tiền Việt Nam (mệnh giá thật đang lưu hành) */
const TIEN72 = {
  1000:  {mau: '#d7ddc9', vien: '#7f8c68'},
  2000:  {mau: '#e9c5b6', vien: '#a9755f'},
  5000:  {mau: '#b7cce6', vien: '#4f74a3'},
  10000: {mau: '#f2c68b', vien: '#b8813a'},
  20000: {mau: '#a9d6ec', vien: '#3f88b0'},
  50000: {mau: '#f3b9ca', vien: '#b5647f'}
};
ART.b72Tien = v => {
  const t = TIEN72[v];
  return `<svg viewBox="0 0 200 100" class="b72-note">
    <rect x="3" y="3" width="194" height="94" rx="9" fill="${t.mau}" stroke="${t.vien}" stroke-width="3"/>
    <rect x="12" y="12" width="176" height="76" rx="6" fill="none" stroke="${t.vien}" stroke-width="1.6"/>
    <circle cx="44" cy="50" r="21" fill="none" stroke="${t.vien}" stroke-width="1.8"/>
    <circle cx="44" cy="44" r="8" fill="${t.vien}" opacity=".55"/>
    <path d="M31 62q13-13 26 0" fill="${t.vien}" opacity=".55"/>
    <text x="128" y="46" text-anchor="middle" font-size="26" font-weight="800"
      fill="${t.vien}">${NSP72(v)}</text>
    <text x="128" y="68" text-anchor="middle" font-size="13" font-weight="700"
      fill="${t.vien}">ĐỒNG</text>
  </svg>`;
};

/* rô-bốt cưỡi ngựa và toà lâu đài */
ART.b72Robot = () => `<svg viewBox="0 0 70 90" class="b72-mz-art">
  <rect x="18" y="10" width="34" height="28" rx="7" fill="#cfe0f2" stroke="#3b4453" stroke-width="2.4"/>
  <circle cx="29" cy="23" r="6" fill="#fff" stroke="#3b4453" stroke-width="1.8"/>
  <circle cx="43" cy="23" r="6" fill="#fff" stroke="#3b4453" stroke-width="1.8"/>
  <circle cx="29" cy="24" r="2.6" fill="#1b1b2b"/><circle cx="43" cy="24" r="2.6" fill="#1b1b2b"/>
  <path d="M35 10V4" stroke="#3b4453" stroke-width="2.2"/><circle cx="35" cy="3" r="3" fill="#e8483f"/>
  <rect x="24" y="40" width="22" height="20" rx="5" fill="#e8483f" stroke="#3b4453" stroke-width="2.2"/>
  <path d="M10 74h50l-6 12H16z" fill="#b98a55" stroke="#7c5a33" stroke-width="2.2"/>
  <path d="M24 60v14M46 60v14" stroke="#3b4453" stroke-width="2.4"/>
</svg>`;
ART.b72Castle = () => `<svg viewBox="0 0 80 90" class="b72-mz-art">
  <rect x="10" y="34" width="60" height="48" fill="#e6dcc8" stroke="#8a7a5e" stroke-width="2.4"/>
  <rect x="4" y="24" width="18" height="58" fill="#efe6d4" stroke="#8a7a5e" stroke-width="2.4"/>
  <rect x="58" y="24" width="18" height="58" fill="#efe6d4" stroke="#8a7a5e" stroke-width="2.4"/>
  <path d="M4 24l9-14 9 14zM58 24l9-14 9 14zM28 34l12-16 12 16z" fill="#c9463a" stroke="#8f2b23" stroke-width="2"/>
  <rect x="33" y="56" width="14" height="26" rx="7" fill="#7a5a34"/>
  <rect x="9" y="44" width="8" height="10" fill="#7aa9d6"/><rect x="63" y="44" width="8" height="10" fill="#7aa9d6"/>
</svg>`;

/* tìm mọi nghiệm của bài "Tìm chữ số thích hợp" */
function solve72(shownN, m, shownP){
  const idx = [];
  for (let i = 0; i < 5; i++) if (shownN[i] === null) idx.push(i);
  const out = [];
  const total = Math.pow(10, idx.length);
  for (let v = 0; v < total; v++){
    const d = shownN.slice();
    let x = v;
    for (let k = idx.length - 1; k >= 0; k--){ d[idx[k]] = x % 10; x = Math.floor(x / 10); }
    if (d[0] === 0) continue;
    const N = +d.join('');
    const ps = String(N * m);
    if (ps.length !== 5) continue;
    let ok = true;
    for (let i = 0; i < 5; i++) if (shownP[i] !== null && +ps[i] !== shownP[i]) ok = false;
    if (ok) out.push(N);
  }
  return out;
}

BANKS.b72 = [

/* ===== tr.101 – Luyện tập, Bài 1: Tính nhẩm ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  /* a1: A × c × d */
  const A1 = R(1, 4) * 1000, c1 = R(2, 5), d1 = R(2, 5);
  const r1 = A1 * c1 * d1;
  /* a2: N : c : d */
  const c2 = R(2, 6), d2 = R(2, 3);
  const t2 = R(1, Math.max(1, Math.min(9, Math.floor(96 / (c2 * d2))))) * 1000;
  const N2 = t2 * c2 * d2;
  /* a3: N : c × d */
  const c3 = R(2, 6), d3 = R(2, 6);
  const t3 = R(1, Math.max(1, Math.min(9, Math.floor(99 / c3), Math.floor(99 / d3)))) * 1000;
  const N3 = t3 * c3, r3 = t3 * d3;
  /* b1: A × (c : d) */
  const k4 = R(2, 5), d4 = R(2, 5), c4 = k4 * d4;
  const A4 = R(1, Math.max(1, Math.floor(10 / k4))) * 10000;
  const r4 = A4 * k4;
  /* b2: N : (c × d) */
  const c5 = R(2, 5), d5 = R(2, 5);
  const t5 = R(1, Math.max(1, Math.min(9, Math.floor(99 / (c5 * d5))))) * 1000;
  const N5 = t5 * c5 * d5;
  /* b3: N : (c : d) */
  const k6 = R(2, 6), d6 = R(2, 4), c6 = k6 * d6;
  const t6 = R(1, Math.max(1, Math.min(9, Math.floor(99 / k6)))) * 1000;
  const N6 = t6 * k6;
  const ln = (s, v) => `<div class="b72-line">${s} <span class="op">=</span> ${q.num(v)}</div>`;
  const html = `<div class="b72-two">
      <div><div class="sub-lbl">a)</div>
        ${ln(`${NSP72(A1)} <span class="op">×</span> ${c1} <span class="op">×</span> ${d1}`, r1)}
        ${ln(`${NSP72(N2)} <span class="op">:</span> ${c2} <span class="op">:</span> ${d2}`, t2)}
        ${ln(`${NSP72(N3)} <span class="op">:</span> ${c3} <span class="op">×</span> ${d3}`, r3)}
      </div>
      <div><div class="sub-lbl">b)</div>
        ${ln(`${NSP72(A4)} <span class="op">×</span> (${c4} <span class="op">:</span> ${d4})`, r4)}
        ${ln(`${NSP72(N5)} <span class="op">:</span> (${c5} <span class="op">×</span> ${d5})`, t5)}
        ${ln(`${NSP72(N6)} <span class="op">:</span> (${c6} <span class="op">:</span> ${d6})`, t6)}
      </div></div>`;
  return q.done(html,
    `${NSP72(A1)} × ${c1} = ${NSP72(A1 * c1)};  ${NSP72(A1 * c1)} × ${d1} = ${NSP72(r1)}.  `
    + `${NSP72(N2)} : ${c2} = ${NSP72(t2 * d2)};  ${NSP72(t2 * d2)} : ${d2} = ${NSP72(t2)}.  `
    + `${NSP72(N3)} : ${c3} = ${NSP72(t3)};  ${NSP72(t3)} × ${d3} = ${NSP72(r3)}.  `
    + `${c4} : ${d4} = ${k4};  ${NSP72(A4)} × ${k4} = ${NSP72(r4)}.  `
    + `${c5} × ${d5} = ${c5 * d5};  ${NSP72(N5)} : ${c5 * d5} = ${NSP72(t5)}.  `
    + `${c6} : ${d6} = ${k6};  ${NSP72(N6)} : ${k6} = ${NSP72(t6)}.`);
},

/* ===== tr.101 – Luyện tập, Bài 2: Đ, S ? ===== */
() => {
  const q = Q(2, '<span class="tag">Đ, S</span> ?');
  const DS = ['Đ', 'S'];
  const lech = () => pick([-2000, -1000, -200, -100, -20, -10, 10, 20, 100, 200, 1000, 2000]);
  const M1 = nhan72(), M2 = nhan72(), D1 = het72();
  const ok1 = R(0, 1) === 1, ok2 = R(0, 1) === 1, ok3 = R(0, 1) === 1;
  let v1 = M1.r, v2 = M2.r, v3 = D1.t;
  if (!ok1){ let d = lech(); if (M1.r + d < 10000) d = Math.abs(d); v1 = M1.r + d; }
  if (!ok2){ let d = lech(); if (M2.r + d < 10000) d = Math.abs(d); v2 = M2.r + d; }
  if (!ok3){ let d = pick([-100, -10, 10, 100, 1000]); if (D1.t + d < 1000) d = Math.abs(d); v3 = D1.t + d; }
  const html = `<div class="b72-dsrow">
      <div><div class="lb">a)</div>${ART.b72Mul(M1.a, M1.b, NSP72(v1))}
        <div class="b72-wide">${q.pick(ok1 ? 'Đ' : 'S', DS)}</div></div>
      <div><div class="lb">b)</div>${ART.b72Mul(M2.a, M2.b, NSP72(v2))}
        <div class="b72-wide">${q.pick(ok2 ? 'Đ' : 'S', DS)}</div></div>
      <div><div class="lb">c)</div>${ART.b72Frame(D1.a, D1.b, NSP72(v3))}
        <div class="b72-wide">${q.pick(ok3 ? 'Đ' : 'S', DS)}</div></div>
    </div>`;
  return q.done(html,
    `a) ${NSP72(M1.a)} × ${M1.b} = ${NSP72(M1.r)};  b) ${NSP72(M2.a)} × ${M2.b} = ${NSP72(M2.r)};  `
    + `c) ${NSP72(D1.a)} : ${D1.b} = ${NSP72(D1.t)}`);
},

/* ===== tr.101 – Luyện tập, Bài 3: Đặt tính rồi tính ===== */
() => {
  const q = Q(3, 'Đặt tính rồi tính.');
  const M1 = nhan72(), M2 = nhan72(), D1 = het72(), D2 = du72();
  const its = [
    {k: 'n', it: M1}, {k: 'c', it: D1}, {k: 'n', it: M2}, {k: 'c', it: D2}
  ];
  const nhan = o => o.k === 'n'
    ? `${NSP72(o.it.a)} × ${o.it.b}` : `${NSP72(o.it.a)} : ${o.it.b}`;
  const frame = o => o.k === 'n'
    ? ART.b72Mul(o.it.a, o.it.b, q.num(o.it.r))
    : ART.b72Frame(o.it.a, o.it.b, q.num(o.it.t), o.it.r ? `(dư ${q.num(o.it.r, 1)})` : '');
  const html = '<div class="b72-exp">' + its.map(o => `<span>${nhan(o)}</span>`).join('') + '</div>'
    + '<div class="b72-row">' + its.map(frame).join('') + '</div>';
  return q.done(html, its.map(o => o.k === 'n'
    ? `${NSP72(o.it.a)} × ${o.it.b} = ${NSP72(o.it.r)}`
    : `${NSP72(o.it.a)} : ${o.it.b} = ${NSP72(o.it.t)}` + (o.it.r ? ` (dư ${o.it.r})` : '')).join(';  '));
},

/* ===== tr.101 – Luyện tập, Bài 4: Nam mua vở bằng tiền 20 000 đồng ===== */
() => {
  const q = Q(4, '');
  const m = pick([10000, 20000, 50000]);
  const k = R(2, 4);
  const tong = k * m;
  const cand = [4, 5, 6, 8, 10].filter(s => tong % s === 0 && tong / s >= 1000 && tong / s <= 20000);
  const s = cand.length ? pick(cand) : 10;
  const gia = tong / s;
  const html = `<p class="wordq">Nam có ${k} tờ tiền loại ${NSP72(m)} đồng, số tiền đó vừa đủ
      để mua ${s} cuốn vở. Hỏi mỗi cuốn vở giá bao nhiêu tiền?</p>
    <div class="b72-money">${Array.from({length: k}, () => ART.b72Tien(m)).join('')}</div>
    <div class="bullet">Nam có tất cả ${q.num(tong)} đồng.</div>
    <div class="bullet">Mỗi cuốn vở giá ${q.num(gia)} đồng.</div>`;
  return q.done(html,
    `${NSP72(m)} × ${k} = ${NSP72(tong)} (đồng);  ${NSP72(tong)} : ${s} = ${NSP72(gia)} (đồng)`);
},

/* ===== tr.101 – Luyện tập, Bài 5: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(5, 'Tính giá trị của biểu thức.');
  /* a) A : c × d */
  const ca = R(2, 9);
  const ta = R(Math.max(1000, Math.ceil(10000 / ca)), Math.min(9999, Math.floor(99999 / ca)));
  const da = R(2, Math.max(2, Math.min(9, Math.floor(99999 / ta))));
  const A = ta * ca, ra = ta * da;
  /* b) B × c : d */
  const cb = R(2, 6), db = R(2, 9);
  const kLo = Math.ceil(10000 / db), kHi = Math.floor(Math.floor(99999 / cb) / db);
  const kb = R(kLo, Math.max(kLo, kHi));
  const B = kb * db, rb = kb * cb;
  const html = `<div class="b72-two">
      <div>${`<div class="b72-line"><span class="b72-let">a)</span>${NSP72(A)}
        <span class="op">:</span> ${ca} <span class="op">×</span> ${da}
        <span class="op">=</span> ${q.num(ra)}</div>`}</div>
      <div>${`<div class="b72-line"><span class="b72-let">b)</span>${NSP72(B)}
        <span class="op">×</span> ${cb} <span class="op">:</span> ${db}
        <span class="op">=</span> ${q.num(rb)}</div>`}</div></div>
    <div class="hint-line">Biểu thức chỉ có phép nhân và phép chia thì tính lần lượt từ trái sang phải.</div>`;
  return q.done(html,
    `a) ${NSP72(A)} : ${ca} = ${NSP72(ta)};  ${NSP72(ta)} × ${da} = ${NSP72(ra)}.  `
    + `b) ${NSP72(B)} × ${cb} = ${NSP72(B * cb)};  ${NSP72(B * cb)} : ${db} = ${NSP72(rb)}.`);
},

/* ===== tr.102 – Luyện tập, Bài 1: Rô-bốt đi đường nào tới toà lâu đài ===== */
() => {
  const q = Q(1, 'Để đến toà lâu đài, Rô-bốt phải đi qua các đoạn đường ghi phép tính có '
    + 'kết quả bé hơn 8 000. Hỏi Rô-bốt phải đi theo đường nào?');
  /* mỗi chặng có hai đoạn: đúng một đoạn có kết quả bé hơn 8 000 */
  const beOk = () => {                     /* kết quả bé hơn 8 000 */
    const t = R(1, 7) * 1000, c = R(2, 9);
    return {s: `${NSP72(t * c)} <span class="op">:</span> ${c}`, v: t};
  };
  const lonOk = () => {                    /* kết quả lớn hơn 8 000 */
    const t = R(9, 20) * 1000, c = R(2, 9);
    return R(0, 1)
      ? {s: `${NSP72(t * c)} <span class="op">:</span> ${c}`, v: t}
      : {s: `${NSP72(t / 2)} <span class="op">×</span> 2`, v: t};
  };
  const L = [['A', 'B'], ['C', 'D'], ['M', 'N']];
  const dung = [];
  const stages = L.map(pair => {
    const iOk = R(0, 1);
    const segs = [beOk(), lonOk()];
    if (iOk === 1) segs.reverse();
    dung.push(pair[iOk]);
    return pair.map((lb, j) => ({lb, s: segs[j].s, v: segs[j].v}));
  });
  const html = '<div class="b72-maze">' + ART.b72Robot()
    + stages.map(st => '<div class="b72-stage">'
      + st.map(sg => `<div class="b72-seg"><b>${sg.lb}</b>${sg.s}</div>`).join('') + '</div>').join('')
    + ART.b72Castle() + '</div>'
    + `<div class="fill-line b72-wide">Rô-bốt đi theo đường:
        ${q.pick(dung.slice().sort().join(','), ['A', 'B', 'C', 'D', 'M', 'N'])}</div>
       <div class="hint-line">Chạm để chọn đủ ba đoạn đường Rô-bốt phải đi qua.</div>`;
  return q.done(html,
    stages.map(st => st.map(sg => `${sg.lb} = ${NSP72(sg.v)}`).join('; ')).join(';  ')
    + `. Các đoạn có kết quả bé hơn 8 000 là ${dung.join(', ')}.`);
},

/* ===== tr.102 – Luyện tập, Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const its = [
    {k: 'c', it: du72()}, {k: 'n', it: nhan72()},
    {k: 'n', it: nhan72()}, {k: 'c', it: het72()}
  ];
  const nhan = o => o.k === 'n'
    ? `${NSP72(o.it.a)} × ${o.it.b}` : `${NSP72(o.it.a)} : ${o.it.b}`;
  const frame = o => o.k === 'n'
    ? ART.b72Mul(o.it.a, o.it.b, q.num(o.it.r))
    : ART.b72Frame(o.it.a, o.it.b, q.num(o.it.t), o.it.r ? `(dư ${q.num(o.it.r, 1)})` : '');
  const html = '<div class="b72-exp">' + its.map(o => `<span>${nhan(o)}</span>`).join('') + '</div>'
    + '<div class="b72-row">' + its.map(frame).join('') + '</div>';
  return q.done(html, its.map(o => o.k === 'n'
    ? `${NSP72(o.it.a)} × ${o.it.b} = ${NSP72(o.it.r)}`
    : `${NSP72(o.it.a)} : ${o.it.b} = ${NSP72(o.it.t)}` + (o.it.r ? ` (dư ${o.it.r})` : '')).join(';  '));
},

/* ===== tr.102 – Luyện tập, Bài 3: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  /* a) A + B × c */
  const ca = R(2, 9);
  const Ba = R(1000, Math.min(9999, Math.floor(90000 / ca)));
  const Aa = R(1000, Math.min(9999, 99999 - Ba * ca));
  const ra = Aa + Ba * ca;
  /* b) (A − B) : c */
  const cb = R(2, 9), Bb = R(1000, 9999);
  const tb = R(1000, Math.max(1000, Math.min(9999, Math.floor((99999 - Bb) / cb))));
  const Ab = tb * cb + Bb, rb = tb;
  /* c) A + B + C */
  const Ac = R(10000, 80000), Bc = R(100, 999), Cc = R(1000, 9999);
  const rc = Ac + Bc + Cc;
  /* d) A × c × d */
  const cd = R(2, 5), dd = R(2, 3);
  const Ad = R(1000, Math.min(9999, Math.floor(99999 / (cd * dd))));
  const rd = Ad * cd * dd;
  const ln = (L, s, v) => `<div class="b72-line"><span class="b72-let">${L}</span>${s}
    <span class="op">=</span> ${q.num(v)}</div>`;
  const html = `<div class="b72-two">
      <div>${ln('a)', `${NSP72(Aa)} <span class="op">+</span> ${NSP72(Ba)} <span class="op">×</span> ${ca}`, ra)}
        ${ln('c)', `${NSP72(Ac)} <span class="op">+</span> ${NSP72(Bc)} <span class="op">+</span> ${NSP72(Cc)}`, rc)}</div>
      <div>${ln('b)', `(${NSP72(Ab)} <span class="op">&minus;</span> ${NSP72(Bb)}) <span class="op">:</span> ${cb}`, rb)}
        ${ln('d)', `${NSP72(Ad)} <span class="op">×</span> ${cd} <span class="op">×</span> ${dd}`, rd)}</div>
    </div>`;
  return q.done(html,
    `a) ${NSP72(Ba)} × ${ca} = ${NSP72(Ba * ca)};  ${NSP72(Aa)} + ${NSP72(Ba * ca)} = ${NSP72(ra)}.  `
    + `b) ${NSP72(Ab)} − ${NSP72(Bb)} = ${NSP72(Ab - Bb)};  ${NSP72(Ab - Bb)} : ${cb} = ${NSP72(rb)}.  `
    + `c) ${NSP72(Ac)} + ${NSP72(Bc)} = ${NSP72(Ac + Bc)};  ${NSP72(Ac + Bc)} + ${NSP72(Cc)} = ${NSP72(rc)}.  `
    + `d) ${NSP72(Ad)} × ${cd} = ${NSP72(Ad * cd)};  ${NSP72(Ad * cd)} × ${dd} = ${NSP72(rd)}.`);
},

/* ===== tr.102 – Luyện tập, Bài 4: nông trường cây chanh và cây cam ===== */
() => {
  const q = Q(4, '');
  const chanh = R(101, 999) * 10;
  const k = R(2, 4);
  const cam = chanh * k;
  const tong = chanh + cam;
  const html = `<p class="wordq">Một nông trường có ${NSP72(chanh)} cây chanh, số cây cam gấp
      ${k} lần số cây chanh. Hỏi nông trường đó có tất cả bao nhiêu cây chanh và cây cam?</p>
    <div class="bullet">Nông trường có ${q.num(cam)} cây cam.</div>
    <div class="bullet">Nông trường có tất cả ${q.num(tong)} cây chanh và cây cam.</div>`;
  return q.done(html,
    `${NSP72(chanh)} × ${k} = ${NSP72(cam)} (cây);  ${NSP72(chanh)} + ${NSP72(cam)} = ${NSP72(tong)} (cây)`);
},

/* ===== tr.102 – Luyện tập, Bài 5: Tìm chữ số thích hợp ===== */
() => {
  const q = Q(5, 'Tìm chữ số thích hợp.');
  const m = R(2, 9);
  const N = R(10000, Math.floor(99999 / m));
  const P = N * m;
  const dN = String(N).split('').map(Number);
  const dP = String(P).split('').map(Number);
  /* giấu 2 chữ số của thừa số (không giấu chữ số đầu) */
  const posN = [1, 2, 3, 4].sort(() => Math.random() - .5).slice(0, 2).sort((x, y) => x - y);
  /* giấu tối đa 3 chữ số của tích, bỏ bớt cho tới khi lời giải là duy nhất */
  let posP = [0, 1, 2, 3, 4].sort(() => Math.random() - .5).slice(0, 3).sort((x, y) => x - y);
  const shownN = dN.map((d, i) => posN.includes(i) ? null : d);
  let shownP = dP.map((d, i) => posP.includes(i) ? null : d);
  for (let g = 0; g < 4; g++){
    if (solve72(shownN, m, shownP).length === 1) break;
    posP = posP.slice(0, posP.length - 1);
    shownP = dP.map((d, i) => posP.includes(i) ? null : d);
  }
  const cellsN = dN.map((d, i) => posN.includes(i) ? q.num(d, 1) : String(d));
  const cellsP = dP.map((d, i) => posP.includes(i) ? q.num(d, 1) : String(d));
  const html = col72(cellsN, '&times;', [String(m)], cellsP)
    + '<div class="hint-line">Nhân lần lượt từ hàng đơn vị để tìm từng chữ số còn thiếu.</div>';
  return q.done(html, `${NSP72(N)} × ${m} = ${NSP72(P)}`);
},
];
