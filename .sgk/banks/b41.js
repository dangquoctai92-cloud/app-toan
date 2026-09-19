/* ============ BÀI 41: ÔN TẬP PHÉP NHÂN, PHÉP CHIA TRONG PHẠM VI 100, 1 000 (SGK tr.112, 113, 114) ============
   luyện tập tr.112 : bài 1 (Tính nhẩm), bài 2 (Đặt tính rồi tính), bài 3 (Đ, S ?),
                      bài 4 (hai xe ô tô chở học sinh), bài 5 (số can nước mắm)
   luyện tập tr.113 : bài 1 (Tính nhẩm với số tròn trăm), bài 2 (Đặt tính rồi tính), bài 3 (Đ, S ?),
                      bài 4 (xếp bánh vào hộp), bài 5 (Tìm chữ số thích hợp)
   luyện tập tr.114 : bài 1 (Chọn câu trả lời đúng), bài 2 (Tìm thành phần chưa biết),
                      bài 3 (Mi và Mai hái hoa), bài 4 (Số ? – một phần mấy của số ngôi sao),
                      bài 5 (Đố em! – chọn chữ số 1, 2, 3)
========================================================================================================= */

/* khung đặt tính chia (dùng lớp .dv của bài 37) */
ART.b41Div = (bi, chia, thuong, cls) => `<div class="dv ${cls || 'dv-am'}">
  <span class="dv-a">${bi}</span><span class="dv-b">${chia}</span><span class="dv-q">${thuong}</span></div>`;

/* đặt tính nhân theo cột: a = mảng ô của thừa số thứ nhất, res = mảng ô của tích */
ART.b41Mul = (a, b, res) => `<div class="b41-col">
  <div class="b41-line">${a.map(c => `<span class="b41-d">${c}</span>`).join('')}</div>
  <div class="b41-line"><span class="b41-op">×</span><span class="b41-d">${b}</span></div>
  <div class="b41-bar"></div>
  <div class="b41-line">${res.map(c => `<span class="b41-d">${c}</span>`).join('')}</div></div>`;

ART.b41Stars = (rows, cols) => {
  const S = 56, W = cols * S + 16, H = rows * S + 16;
  const star = (cx, cy) => {
    let d = '';
    for (let i = 0; i < 10; i++){
      const ang = (-90 + i * 36) * Math.PI / 180, r = i % 2 ? 9 : 22;
      d += (i ? 'L' : 'M') + (cx + r * Math.cos(ang)).toFixed(1) + ' ' + (cy + r * Math.sin(ang)).toFixed(1);
    }
    return `<path d="${d}z" fill="#ffcf3f" stroke="#d8a72e" stroke-width="2"/>`;
  };
  let g = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) g += star(8 + c * S + S / 2, 8 + r * S + S / 2);
  return `<svg viewBox="0 0 ${W} ${H}" class="b41-stars">
    <rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="16" fill="none" stroke="#e08a2e" stroke-width="3"/>
    ${g}</svg>`;
};

ART.b41Bee = n => `<svg viewBox="0 0 96 120" class="b41-bee">
  <rect x="46" y="4" width="44" height="36" rx="5" fill="#f7edd0" stroke="#3b2a1c" stroke-width="2.4"/>
  <text x="68" y="30" text-anchor="middle" font-size="22" font-weight="800" fill="#3b2a1c">${n}</text>
  <path d="M60 40l-14 26" stroke="#c07a16" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="40" cy="86" rx="28" ry="22" fill="#ffcf3f" stroke="#3b2a1c" stroke-width="2.4"/>
  <path d="M28 66v40M42 64v44" stroke="#3b2a1c" stroke-width="6"/>
  <path d="M20 62q-14-16-2-20 10-2 14 14z" fill="#cfe8f5" stroke="#3b2a1c" stroke-width="2" opacity=".9"/>
  <circle cx="24" cy="80" r="2.4" fill="#3b2a1c"/>
  <path d="M14 78q6 6 14 2" fill="none" stroke="#3b2a1c" stroke-width="2"/>
  <path d="M18 62l-8-12M26 60l-2-14" stroke="#3b2a1c" stroke-width="2"/></svg>`;

ART.b41Bus = `<svg viewBox="0 0 250 96" class="b41-bus">
  <rect x="8" y="20" width="180" height="52" rx="10" fill="#f0b429" stroke="#a8761e" stroke-width="2.4"/>
  <path d="M188 34h34l20 20v18h-54z" fill="#f0b429" stroke="#a8761e" stroke-width="2.4"/>
  <rect x="20" y="30" width="34" height="22" rx="3" fill="#cfe8f5" stroke="#6f97b0" stroke-width="2"/>
  <rect x="62" y="30" width="34" height="22" rx="3" fill="#cfe8f5" stroke="#6f97b0" stroke-width="2"/>
  <rect x="104" y="30" width="34" height="22" rx="3" fill="#cfe8f5" stroke="#6f97b0" stroke-width="2"/>
  <rect x="146" y="30" width="34" height="22" rx="3" fill="#cfe8f5" stroke="#6f97b0" stroke-width="2"/>
  <rect x="196" y="40" width="28" height="18" rx="3" fill="#cfe8f5" stroke="#6f97b0" stroke-width="2"/>
  <circle cx="58" cy="76" r="14" fill="#3b3b46" stroke="#22222a" stroke-width="2.4"/>
  <circle cx="196" cy="76" r="14" fill="#3b3b46" stroke="#22222a" stroke-width="2.4"/>
  <circle cx="58" cy="76" r="5" fill="#cfd3d8"/><circle cx="196" cy="76" r="5" fill="#cfd3d8"/></svg>`;

BANKS.b41 = [

/* ===== tr.112 – Luyện tập Bài 1: Tính nhẩm (trong phạm vi 100) ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const nhan = [];
  for (let g = 0; g < 80 && nhan.length < 4; g++){
    const t = R(2, 5) * 10, k = R(2, 5);
    if (t * k <= 100 && !nhan.some(x => x.t === t && x.k === k)) nhan.push({t, k});
  }
  while (nhan.length < 4) nhan.push({t:20, k:nhan.length + 2});
  const chia = [];
  for (let g = 0; g < 80 && chia.length < 4; g++){
    const r = R(1, 5) * 10, d = R(2, 5), n = r * d;
    if (n <= 100 && !chia.some(x => x.n === n && x.d === d)) chia.push({n, d, r});
  }
  while (chia.length < 4) chia.push({n:60, d:2, r:30});
  return q.done(`<div class="sub-lbl">a)</div>
    <div class="calc-grid">${nhan.map(x =>
      `<div class="calc-cell">${x.t} × ${x.k} = ${q.num(x.t * x.k)}</div>`).join('')}</div>
    <div class="sub-lbl">b)</div>
    <div class="calc-grid">${chia.map(x =>
      `<div class="calc-cell">${x.n} : ${x.d} = ${q.num(x.r)}</div>`).join('')}</div>`,
    'Nhẩm theo chục: 2 chục × 3 = 6 chục; 6 chục : 2 = 3 chục.');
},

/* ===== tr.112 – Luyện tập Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const nhan = [];
  for (let g = 0; g < 80 && nhan.length < 3; g++){
    const a = R(11, 49), b = R(2, 9);
    if (a * b <= 100 && !nhan.some(x => x.a === a && x.b === b)) nhan.push({a, b});
  }
  while (nhan.length < 3) nhan.push({a:12, b:nhan.length + 2});
  const het = () => { const d = R(2, 9), t = R(Math.ceil(10 / d), Math.floor(99 / d)); return {n:d * t, d, t, r:0}; };
  const du = () => { const d = R(3, 9), t = R(Math.ceil(10 / d), Math.floor(98 / d)), r = R(1, d - 1);
    return {n:d * t + r, d, t, r}; };
  const chia = [het(), het(), du()];
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a * it.b)}</span></div>`;
  return q.done(`<div class="sub-lbl">a)</div><div class="vrow">${nhan.map(vc).join('')}</div>
    <div class="sub-lbl">b)</div>
    <div class="dv-row">${chia.map(it => `<div class="dv-item">
      ${ART.b41Div(it.n, it.d, q.num(it.t), 'dv-gr')}
      <div class="dv-du">(dư ${q.num(it.r, 1)})</div></div>`).join('')}</div>
    <div class="hint-line">Phép chia hết thì viết số dư là 0.</div>`,
    nhan.map(x => `${x.a} × ${x.b} = ${x.a * x.b}`).join(';  ') + ';  '
      + chia.map(x => `${x.n} : ${x.d} = ${x.t}${x.r ? ' (dư ' + x.r + ')' : ''}`).join(';  '));
},

/* ===== tr.112 – Luyện tập Bài 3: Đ, S ? (nhân có nhớ · chia có dư) ===== */
() => {
  const q = Q(3, '<span class="tag">Đ, S</span> ?');
  let a = 17, k = 5;
  for (let g = 0; g < 60; g++){
    a = R(12, 29); k = R(3, 9);
    if ((a % 10) * k >= 10 && a * k <= 100) break;
  }
  const dung = a * k, quen = Math.floor(a / 10) * k * 10 + dung % 10;
  const d = R(3, 9), t = R(Math.ceil(10 / d), Math.floor(95 / d)), r = R(1, d - 1), n = d * t + r;
  const KQ = pick([['Đ', 'S'], ['S', 'Đ'], ['Đ', 'Đ'], ['S', 'S']]);
  const hienA = KQ[0] === 'Đ' ? dung : quen;
  const tSai = t + pick([-1, 1]) || t + 2;
  const hienT = KQ[1] === 'Đ' ? t : tSai;
  return q.done(`<div class="b41-row">
      <div class="b41-item"><div class="sub-lbl">a)</div>
        ${ART.b41Mul(String(a).split(''), k, String(hienA).split(''))}
        <div class="dv-du">${q.pick(KQ[0], ['Đ', 'S'])}</div></div>
      <div class="b41-item"><div class="sub-lbl">b)</div>
        ${ART.b41Div(n, d, hienT, 'dv-bl')}
        <div class="dv-du">Vậy ${n} : ${d} = ${hienT} (dư ${r}).</div>
        <div class="dv-du">${q.pick(KQ[1], ['Đ', 'S'])}</div></div>
    </div>`,
    `${a} × ${k} = ${dung};  ${n} : ${d} = ${t} (dư ${r})`);
},

/* ===== tr.112 – Luyện tập Bài 4: Hai xe ô tô chở học sinh ===== */
() => {
  const q = Q(4, '');
  const moi = R(30, 49);
  return q.done(`<p class="wordq">Hai xe ô tô chở học sinh đi thăm Lăng Bác Hồ, mỗi xe chở ${moi} học sinh.
      Hỏi có tất cả bao nhiêu học sinh đi thăm Lăng Bác Hồ?</p>
    ${ART.b41Bus}
    <div class="fill-line">Có tất cả ${q.num(moi * 2)} học sinh đi thăm Lăng Bác Hồ.</div>`,
    `${moi} × 2 = ${moi * 2} (học sinh)`);
},

/* ===== tr.112 – Luyện tập Bài 5: Cần ít nhất bao nhiêu cái can ===== */
() => {
  const q = Q(5, '');
  const c = R(4, 9), n = R(3, 9), r = R(1, c - 1), V = c * n + r;
  return q.done(`<p class="wordq">Trong thùng có ${V} <i>l</i> nước mắm. Hỏi cần ít nhất bao nhiêu cái can
      loại ${c} <i>l</i> để chứa hết lượng nước mắm đó?</p>
    <div class="bullet">${V} : ${c} = ${q.num(n)} (dư ${q.num(r, 1)})</div>
    <div class="bullet">Cần ít nhất ${q.num(n + 1)} cái can.</div>`,
    `${V} : ${c} = ${n} (dư ${r}) nên còn ${r} l phải đổ vào thêm 1 can nữa: ${n} + 1 = ${n + 1} (can)`);
},

/* ===== tr.113 – Luyện tập Bài 1: Tính nhẩm (số tròn trăm) ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const nhan = [];
  for (let g = 0; g < 80 && nhan.length < 4; g++){
    const t = R(2, 5) * 100, k = R(2, 5);
    if (t * k <= 1000 && !nhan.some(x => x.t === t && x.k === k)) nhan.push({t, k});
  }
  while (nhan.length < 4) nhan.push({t:200, k:nhan.length + 2});
  const DIVS = {2:[2], 3:[3], 4:[2, 4], 5:[5], 6:[2, 3, 6], 7:[7], 8:[2, 4, 8], 9:[3, 9]};
  const pool = [];
  Object.keys(DIVS).forEach(b => DIVS[b].forEach(d => pool.push([+b, d])));
  const chia = pool.sort(() => Math.random() - .5).slice(0, 4);
  return q.done(`<div class="sub-lbl">a)</div>
    <div class="calc-grid">${nhan.map(x =>
      `<div class="calc-cell">${x.t} × ${x.k} = ${nf(x.t * x.k)}${''}${q.num(x.t * x.k)}</div>`).join('')}</div>
    <div class="sub-lbl">b)</div>
    <div class="calc-grid">${chia.map(x =>
      `<div class="calc-cell">${x[0] * 100} : ${x[1]} = ${q.num(x[0] / x[1] * 100)}</div>`).join('')}</div>`,
    'Nhẩm theo trăm: 3 trăm × 3 = 9 trăm; 8 trăm : 4 = 2 trăm.');
},

/* ===== tr.113 – Luyện tập Bài 2: Đặt tính rồi tính (trong phạm vi 1 000) ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const nhan = [];
  for (let g = 0; g < 80 && nhan.length < 3; g++){
    const a = pick([R(101, 480), R(101, 480), R(11, 99)]), b = R(2, 9);
    if (a * b <= 999 && a * b >= 100 && !nhan.some(x => x.a === a && x.b === b)) nhan.push({a, b});
  }
  while (nhan.length < 3) nhan.push({a:111, b:nhan.length + 2});
  const het = () => { const d = R(2, 9), t = R(Math.ceil(100 / d), Math.floor(999 / d)); return {n:d * t, d, t, r:0}; };
  const du = () => { const d = R(3, 9), t = R(Math.ceil(100 / d), Math.floor((999 - d) / d)), r = R(1, d - 1);
    return {n:d * t + r, d, t, r}; };
  const chia = [het(), het(), du()];
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a * it.b)}</span></div>`;
  return q.done(`<div class="sub-lbl">a)</div><div class="vrow">${nhan.map(vc).join('')}</div>
    <div class="sub-lbl">b)</div>
    <div class="dv-row">${chia.map(it => `<div class="dv-item">
      ${ART.b41Div(it.n, it.d, q.num(it.t), 'dv-gr')}
      <div class="dv-du">(dư ${q.num(it.r, 1)})</div></div>`).join('')}</div>
    <div class="hint-line">Phép chia hết thì viết số dư là 0.</div>`,
    nhan.map(x => `${x.a} × ${x.b} = ${x.a * x.b}`).join(';  ') + ';  '
      + chia.map(x => `${x.n} : ${x.d} = ${x.t}${x.r ? ' (dư ' + x.r + ')' : ''}`).join(';  '));
},

/* ===== tr.113 – Luyện tập Bài 3: Đ, S ? (nhân số có ba chữ số · chia có chữ số 0 ở thương) ===== */
() => {
  const q = Q(3, '<span class="tag">Đ, S</span> ?');
  let a = 114, k = 6;
  for (let g = 0; g < 60; g++){
    a = R(102, 180); k = R(2, 8);
    if (a * k <= 999 && a * k >= 200) break;
  }
  const dung = a * k;
  const sd = String(dung).split('');
  const sai = +[sd[0], sd[2], sd[1]].join('');            // đổi chỗ chữ số hàng chục và hàng đơn vị
  const b = R(1, 9), t = 100 + b, d = R(3, 9), n = d * t;  // thương dạng 10b
  const tSai = 10 + b;
  const KQ = pick([['Đ', 'S'], ['S', 'Đ'], ['Đ', 'Đ'], ['S', 'S']]);
  const hienA = KQ[0] === 'Đ' || sai === dung ? dung : sai;
  const okA = hienA === dung ? 'Đ' : 'S';
  const hienT = KQ[1] === 'Đ' ? t : tSai;
  return q.done(`<div class="b41-row">
      <div class="b41-item"><div class="sub-lbl">a)</div>
        ${ART.b41Mul(String(a).split(''), k, String(hienA).split(''))}
        <div class="dv-du">${q.pick(okA, ['Đ', 'S'])}</div></div>
      <div class="b41-item"><div class="sub-lbl">b)</div>
        ${ART.b41Div(n, d, hienT, 'dv-bl')}
        <div class="dv-du">Vậy ${n} : ${d} = ${hienT}.</div>
        <div class="dv-du">${q.pick(KQ[1], ['Đ', 'S'])}</div></div>
    </div>`,
    `${a} × ${k} = ${dung};  ${n} : ${d} = ${t}`);
},

/* ===== tr.113 – Luyện tập Bài 4: Xếp bánh vào hộp ===== */
() => {
  const q = Q(4, '');
  const moi = R(4, 9), hop = R(20, Math.floor(999 / moi)), tong = moi * hop;
  return q.done(`<p class="wordq">Các bạn xếp ${tong} cái bánh vào các hộp, mỗi hộp ${moi} cái bánh.
      Hỏi các bạn xếp được bao nhiêu hộp bánh như vậy?</p>
    <div class="fill-line">Các bạn xếp được ${q.num(hop)} hộp bánh.</div>`,
    `${tong} : ${moi} = ${hop} (hộp)`);
},

/* ===== tr.113 – Luyện tập Bài 5: Tìm chữ số thích hợp ===== */
() => {
  const q = Q(5, 'Tìm chữ số thích hợp.');
  /* a) h ? u × k = P (giấu chữ số hàng chục của thừa số và chữ số hàng đơn vị của tích) */
  let A = 152, k1 = 4, P1 = 608;
  for (let g = 0; g < 80; g++){
    const h = R(1, 4), x = R(1, 9), u = R(1, 9);
    const kk = R(2, 9), n = h * 100 + x * 10 + u;
    if (n * kk <= 999 && n * kk >= 100){ A = n; k1 = kk; P1 = n * kk; break; }
  }
  const sA = String(A).split(''), sP1 = String(P1).split('');
  /* b) a ? × k = ? ? u (k lẻ không chia hết cho 5 nên chữ số bị giấu là duy nhất) */
  let B = 38, k2 = 7, P2 = 266;
  for (let g = 0; g < 80; g++){
    const a2 = R(2, 9), b2 = R(1, 9), kk = pick([3, 7, 9]), n = a2 * 10 + b2;
    if (n * kk <= 999 && n * kk >= 100){ B = n; k2 = kk; P2 = n * kk; break; }
  }
  const sB = String(B).split(''), sP2 = String(P2).split('');

  const cauA = ART.b41Mul([sA[0], q.num(+sA[1], 1), sA[2]], k1,
    [sP1[0], sP1[1], q.num(+sP1[2], 1)]);
  const cauB = ART.b41Mul([sB[0], q.num(+sB[1], 1)], k2,
    [q.num(+sP2[0], 1), q.num(+sP2[1], 1), sP2[2]]);
  return q.done(`<div class="b41-row">
      <div class="b41-item"><div class="sub-lbl">a)</div>${cauA}</div>
      <div class="b41-item"><div class="sub-lbl">b)</div>${cauB}</div>
    </div>`,
    `${A} × ${k1} = ${P1};  ${B} × ${k2} = ${P2}`);
},

/* ===== tr.114 – Luyện tập Bài 1: Chọn câu trả lời đúng ===== */
() => {
  const q = Q(1, 'Chọn câu trả lời đúng.');
  const L = ['A', 'B', 'C', 'D'];
  /* a) kết quả phép nhân */
  let A = 192, k = 4, P = 768;
  for (let g = 0; g < 80; g++){
    const n = R(102, 480), kk = R(2, 9);
    const p = n * kk;
    if (p >= 100 && p <= 999 && new Set(String(p).split('')).size === 3){ A = n; k = kk; P = p; break; }
  }
  const dp = String(P).split('');
  const nhanOpts = [P, +[dp[0], dp[2], dp[1]].join(''), +[dp[1], dp[0], dp[2]].join(''),
    +[dp[2], dp[1], dp[0]].join('')];
  const optA = [...new Set(nhanOpts)].filter(v => String(v).length === 3);
  let pad = 1;
  while (optA.length < 4 && pad < 40){ const v = P + pad * 10;
    if (v <= 999 && !optA.includes(v)) optA.push(v); pad++; }
  const listA = optA.slice(0, 4).sort(() => Math.random() - .5);
  const letA = L[listA.indexOf(P)];
  /* b) kết quả phép chia có chữ số 0 ở giữa thương */
  const d2 = R(2, 3), a2 = R(1, Math.floor(999 / (100 * d2)));
  let b2 = R(1, 9);
  if (b2 === a2) b2 = a2 === 9 ? 1 : a2 + 1;
  const thuong = a2 * 100 + b2, biChia = thuong * d2;
  const listB = [thuong, a2 * 100 + b2 * 10, b2 * 100 + a2, a2 * 10 + b2].sort(() => Math.random() - .5);
  const letB = L[listB.indexOf(thuong)];
  /* c) số dư của phép chia */
  const d3 = R(5, 9), r3 = R(1, d3 - 1), t3 = R(60, Math.floor((999 - r3) / d3)), n3 = d3 * t3 + r3;
  const others = [];
  for (let g = 0; g < 60 && others.length < 3; g++){
    const v = R(1, d3 - 1);
    if (v !== r3 && !others.includes(v)) others.push(v);
  }
  const listC = others.concat([r3]).sort((x, y) => x - y);
  const letC = L[listC.indexOf(r3)];
  const row = arr => '<div class="opt-row">' + arr.map((v, i) => `<span><i>${L[i]}.</i>${v}</span>`).join('') + '</div>';

  return q.done(`<div class="fill-line">a) Kết quả của phép nhân ${A} × ${k} là:</div>${row(listA)}${q.pick(letA, L)}
    <div class="fill-line">b) Kết quả của phép chia ${biChia} : ${d2} là:</div>${row(listB)}${q.pick(letB, L)}
    <div class="fill-line">c) Số dư của phép chia ${n3} : ${d3} là:</div>${row(listC)}${q.pick(letC, L)}`,
    `${A} × ${k} = ${P};  ${biChia} : ${d2} = ${thuong};  ${n3} : ${d3} = ${t3} (dư ${r3})`);
},

/* ===== tr.114 – Luyện tập Bài 2: Tìm thành phần chưa biết trong phép tính ===== */
() => {
  const q = Q(2, 'Tìm thành phần chưa biết trong phép tính.');
  const k1 = R(2, 9), t1 = R(20, Math.floor(999 / k1)), p1 = t1 * k1;
  const k2 = R(2, 9), t2 = R(100, Math.floor(999 / k2)), p2 = t2 * k2;
  const t3 = R(2, 9), d3 = R(2, 9), n3 = t3 * d3;
  return q.done(`<div class="b38-ex"><span class="b38-let">a)</span>${q.num(t1)} × ${k1} = ${p1}</div>
    <div class="b38-ex"><span class="b38-let">b)</span>${q.num(p2)} : ${k2} = ${t2}</div>
    <div class="b38-ex"><span class="b38-let">c)</span>${n3} : ${q.num(d3, 1)} = ${t3}</div>
    <div class="hint-line">Thừa số = tích : thừa số kia; số bị chia = thương × số chia; số chia = số bị chia : thương.</div>`,
    `${p1} : ${k1} = ${t1};  ${t2} × ${k2} = ${p2};  ${n3} : ${t3} = ${d3}`);
},

/* ===== tr.114 – Luyện tập Bài 3: Mi và Mai hái hoa ===== */
() => {
  const q = Q(3, '');
  const mi = R(12, 45), k = R(2, 4), mai = mi * k;
  return q.done(`<p class="wordq">Mi hái được ${mi} bông hoa, Mai hái được số bông hoa gấp ${k} lần của Mi.
      Hỏi cả hai chị em hái được bao nhiêu bông hoa?</p>
    <div class="bullet">Mai hái được ${q.num(mai)} bông hoa.</div>
    <div class="bullet">Cả hai chị em hái được ${q.num(mi + mai)} bông hoa.</div>`,
    `${mi} × ${k} = ${mai} (bông);  ${mi} + ${mai} = ${mi + mai} (bông)`);
},

/* ===== tr.114 – Luyện tập Bài 4: Số ? (một phần mấy của số ngôi sao) ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const rows = R(3, 4);
  let cols = R(4, 6);
  if (cols === rows) cols = rows === 4 ? 5 : 4;
  const frac = m => `<span class="frac41"><b>1</b><i>${m}</i></span>`;
  return q.done(`<div class="two-col">
      <div>
        <div class="fill-line">a) ${frac(rows)} số ngôi sao là ${q.num(cols, 2)} ngôi sao.</div>
        <div class="fill-line">b) ${frac(cols)} số ngôi sao là ${q.num(rows, 1)} ngôi sao.</div>
      </div>
      <div>${ART.b41Stars(rows, cols)}</div>
    </div>`,
    `Có ${rows * cols} ngôi sao: ${rows * cols} : ${rows} = ${cols};  ${rows * cols} : ${cols} = ${rows}`);
},

/* ===== tr.114 – Luyện tập Bài 5: Đố em! Chọn chữ số 1, 2, 3 thích hợp ===== */
() => {
  const q = Q(5, 'Đố em!');
  const D = [1, 2, 3];
  const perms = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]];
  const p = pick(perms);
  const a = p[0], b = p[1], c = p[2];
  const P = (a * 10 + b) * c;
  return q.done(`<div class="fill-line">Chọn chữ số 1, 2, 3 thích hợp thay cho dấu "?".</div>
    <div class="b41-row">
      ${ART.b41Mul([q.num(a, 1), q.num(b, 1)], q.num(c, 1), [String(P)])}
    </div>
    <div class="b41-bees">${D.map(n => ART.b41Bee(n)).join('')}</div>
    <div class="hint-line">Mỗi chữ số 1, 2, 3 chỉ dùng đúng một lần.</div>`,
    `${a * 10 + b} × ${c} = ${P}`);
},
];
