/* ==================== BÀI 35: LUYỆN TẬP CHUNG (SGK tr.95, 96) ====================
   luyện tập tr.95 : bài 1, 2, 3, 4
   luyện tập tr.96 : bài 1, 2
================================================================================ */

/* cân đĩa: mỗi đĩa là một mảng vật, tilt = -1 (đĩa trái nặng hơn), 0 (thăng bằng), 1 (đĩa phải nặng hơn) */
ART.b35Scale = (L, Rt, tilt) => {
  const rad = tilt * 8 * Math.PI / 180, px = 130, py = 62;
  const rot = (x, y) => [(px + (x - px) * Math.cos(rad) - (y - py) * Math.sin(rad)),
    (py + (x - px) * Math.sin(rad) + (y - py) * Math.cos(rad))];
  const l = rot(44, 62), r = rot(216, 62);
  const ico = (it, cx, by) => {
    if (it.t === 'can') return `<g transform="translate(${(cx - 14).toFixed(1)},${(by - 32).toFixed(1)})">
      <path d="M5 7h3V3h12v4h3l6 25H-1z" fill="#cfd4dc" stroke="#5a5a6a" stroke-width="1.6"/>
      <text x="14" y="26" text-anchor="middle" font-size="9" font-weight="700" fill="#333">${it.v}</text></g>`;
    if (it.t === 'hop') return `<g transform="translate(${(cx - 17).toFixed(1)},${(by - 32).toFixed(1)})">
      <rect x="0" y="8" width="34" height="24" fill="#67c7e8" stroke="#2f7fa0" stroke-width="1.8"/>
      <rect x="0" y="8" width="34" height="6" fill="#3ea9d0" stroke="#2f7fa0" stroke-width="1.6"/>
      <path d="M17 8V32M10 8q7-10 7 0 0-10 7 0" fill="none" stroke="#e2739a" stroke-width="2"/></g>`;
    if (it.t === 'nho') return `<g transform="translate(${(cx - 15).toFixed(1)},${(by - 34).toFixed(1)})">
      <path d="M15 4v6" stroke="#5f8f2e" stroke-width="2"/>
      <circle cx="9" cy="16" r="5" fill="#8a5fbf"/><circle cx="21" cy="16" r="5" fill="#8a5fbf"/>
      <circle cx="15" cy="23" r="5" fill="#9b6fd0"/><circle cx="6" cy="26" r="5" fill="#8a5fbf"/>
      <circle cx="24" cy="26" r="5" fill="#8a5fbf"/><circle cx="15" cy="32" r="5" fill="#9b6fd0"/></g>`;
    return `<g transform="translate(${(cx - 18).toFixed(1)},${(by - 36).toFixed(1)})">
      <path d="M4 36q-3-24 14-28 17 4 14 28z" fill="${it.c || '#f2d98c'}" stroke="#8a7a3a" stroke-width="1.8"/>
      <path d="M11 9q7-9 14 0" fill="none" stroke="#5f8f2e" stroke-width="2"/>
      <text x="18" y="30" text-anchor="middle" font-size="12" font-weight="800" fill="#3a3a2a">${it.v}</text></g>`;
  };
  const pan = (arr, p) => {
    const x = p[0], y = p[1];
    const items = arr.map((it, i) =>
      ico(it, x + (i - (arr.length - 1) / 2) * 30, y + 12)).join('');
    return `<path d="M${(x).toFixed(1)} ${(y).toFixed(1)}v12" stroke="#4e93b5" stroke-width="2"/>
      <ellipse cx="${x.toFixed(1)}" cy="${(y + 13).toFixed(1)}" rx="36" ry="6"
        fill="#d9f0fb" stroke="#4e93b5" stroke-width="1.8"/>${items}`;
  };
  return `<svg viewBox="0 0 260 150" class="b35-scale">
    <rect x="96" y="132" width="68" height="9" rx="3" fill="#bfe3f2" stroke="#4e93b5" stroke-width="2"/>
    <path d="M124 66h12v66h-12z" fill="#bfe3f2" stroke="#4e93b5" stroke-width="2"/>
    <path d="M${l[0].toFixed(1)} ${l[1].toFixed(1)}L${r[0].toFixed(1)} ${r[1].toFixed(1)}"
      stroke="#4e93b5" stroke-width="4" stroke-linecap="round"/>
    ${pan(L, l)}${pan(Rt, r)}
    <circle cx="130" cy="62" r="9" fill="#f0c419" stroke="#b8901c" stroke-width="2"/>
  </svg>`;
};

/* cốc nước có ghi dung tích */
ART.b35Coc = (ml, big) => `<svg viewBox="0 0 70 ${big ? 100 : 78}" class="b35-coc">
  <path d="M10 ${big ? 12 : 22}h50l-6 ${big ? 82 : 52}H16z" fill="#eaf7fd" stroke="#5f9fc4" stroke-width="2.6"/>
  <ellipse cx="35" cy="${big ? 12 : 22}" rx="25" ry="6" fill="#dff1f9" stroke="#5f9fc4" stroke-width="2.4"/>
  <text x="35" y="${big ? 64 : 56}" text-anchor="middle" font-size="13" font-weight="700" fill="#2f6a86">${ml} ml</text>
</svg>`;

/* cúc áo và sợi chỉ */
ART.b35Cuc = n => {
  let s = '';
  for (let i = 0; i < n; i++){
    const x = 24 + i * 34;
    s += `<circle cx="${x}" cy="40" r="14" fill="#f0e2b8" stroke="#a08f5a" stroke-width="2.2"/>
      <circle cx="${x - 5}" cy="37" r="2.4" fill="#a08f5a"/><circle cx="${x + 5}" cy="37" r="2.4" fill="#a08f5a"/>
      <circle cx="${x - 5}" cy="45" r="2.4" fill="#a08f5a"/><circle cx="${x + 5}" cy="45" r="2.4" fill="#a08f5a"/>`;
  }
  return `<svg viewBox="0 0 ${24 + n * 34 + 12} 74" class="b35-cuc">
    <path d="M6 62h${n * 34 + 18}" stroke="#e2739a" stroke-width="2.4" stroke-dasharray="6 4"/>${s}</svg>`;
};

BANKS.b35 = [

/* ===== tr.95 – Bài 1: Tính ===== */
() => {
  const q = Q(1, 'Tính.');
  const x1 = R(300, 900), y1 = R(105, 290);
  const g1 = R(15, 90) * 10, g2 = R(2, g1 / 10 - 2) * 10;
  const m1 = R(150, 900), m2 = R(20, 99);
  const x2 = R(150, 450), y2 = R(150, 450);
  const e1 = R(20, 60), e2 = R(20, 60), e3 = R(10, e1 + e2 - 10);
  const h1 = R(50, 99), h2 = R(10, h1 - 20), h3 = R(5, 40);
  const eq = (s, v) => `<div class="eq">${s} = ${q.num(v)}</div>`;
  return q.done(`<div class="sub-lbl">a)</div><div class="eq-list">
      ${eq(`${x1} ml − ${y1} ml`, x1 - y1)}${eq(`${g1} g − ${g2} g`, g1 - g2)}${eq(`${m1} mm + ${m2} mm`, m1 + m2)}
    </div>
    <div class="sub-lbl">b)</div><div class="eq-list">
      ${eq(`${x2} ml + ${y2} ml`, x2 + y2)}${eq(`${e1} g + ${e2} g − ${e3} g`, e1 + e2 - e3)}
      ${eq(`${h1} mm − ${h2} mm + ${h3} mm`, h1 - h2 + h3)}
    </div>
    <div class="hint-line">Tính rồi viết kết quả kèm theo đơn vị đo.</div>`,
    'Cộng, trừ như với số tự nhiên rồi viết thêm đơn vị đo.');
},

/* ===== tr.95 – Bài 2: Số ? (cân đĩa thăng bằng) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const m = pick([50, 100, 200]);
  const M = m + pick([100, 200, 300, 400]);
  const k = R(2, 3), n = pick([20, 50]);
  const nho = 100 * k - n;
  return q.done(`<div class="b35-row">
      <div class="b35-item"><div class="sub-lbl">a)</div>
        ${ART.b35Scale([{t: 'can', v: m + ' g'}, {t: 'hop'}], [{t: 'can', v: M + ' g'}], 0)}
        <div class="fill-line">Hộp quà cân nặng ${q.num(M - m)} g.</div></div>
      <div class="b35-item"><div class="sub-lbl">b)</div>
        ${ART.b35Scale([{t: 'nho'}, {t: 'can', v: n + ' g'}],
          Array.from({length: k}, () => ({t: 'can', v: '100 g'})), 0)}
        <div class="fill-line">Chùm nho cân nặng ${q.num(nho)} g.</div></div>
    </div>`,
    `a) ${M} − ${m} = ${M - m} (g);  b) ${100 * k} − ${n} = ${nho} (g)`);
},

/* ===== tr.95 – Bài 3: chỉ đơm cúc áo ===== */
() => {
  const q = Q(3, '');
  const mm = R(5, 9) * 10, n = R(3, 7);
  return q.done(`<p class="wordq">Cô Ba đơm 1 chiếc cúc áo hết ${mm} mm chỉ.
      Hỏi để đơm ${n} chiếc cúc áo như vậy, cô Ba cần bao nhiêu mi-li-mét chỉ?</p>
    ${ART.b35Cuc(n)}
    <div class="fill-line">Cô Ba cần ${q.num(mm * n)} mm chỉ.</div>`,
    `${mm} × ${n} = ${mm * n} (mm)`);
},

/* ===== tr.95 – Bài 4: hai cái cốc lấy đúng số nước ===== */
() => {
  const q = Q(4, '');
  const a = R(2, 7) * 50, b = a + R(2, 8) * 50;
  return q.done(`<p class="wordq">Rô-bốt có hai cái cốc loại ${a} ml và ${b} ml.
      Chỉ dùng hai cái cốc đó, làm thế nào để Rô-bốt lấy được ${b - a} ml nước từ thùng nước?</p>
    <div class="b35-row">${ART.b35Coc(a)}${ART.b35Coc(b, true)}</div>
    <div class="bullet">Đổ đầy cốc ${b} ml, khi đó cốc lớn có ${q.num(b)} ml nước.</div>
    <div class="bullet">Rót nước từ cốc lớn sang cốc ${a} ml cho đến khi đầy,
      cốc nhỏ nhận ${q.num(a)} ml nước.</div>
    <div class="bullet">Lượng nước còn lại trong cốc lớn là ${q.num(b - a)} ml.</div>`,
    `${b} − ${a} = ${b - a} (ml)`);
},

/* ===== tr.96 – Bài 1: Số ? (sơ đồ hai phép tính nối tiếp) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const ar = lbl => `<span class="b35-ar"><i>${lbl}</i>
    <svg viewBox="0 0 60 16" style="width:56px"><path d="M2 8h44" stroke="#4a4460" stroke-width="2.2"/>
    <path d="M46 3l12 5-12 5z" fill="#4a4460"/></svg></span>`;

  const ma = R(2, 5), sa = R(2, 9), va = ma * sa, ka = R(2, 4);
  const a1 = va * ka, a2 = a1 / ma;

  const kb = R(2, 6), ub = R(4, 15), vb = kb * ub, mb = R(2, 5);
  const b1 = ub, b2 = ub * mb;

  const mc = pick([2, 4, 5, 8]), sc = R(2, 6), vc = mc * sc, kc = R(2, 4);
  const c1 = vc * kc, c2 = c1 / mc;

  const line = (lbl, cls, v0, u, op1, r1, op2, r2) => `<div class="b35-flow">
      <b>${lbl}</b><span class="b35-cell ${cls}">${v0} ${u}</span>${ar(op1)}
      <span class="b35-cell">${q.num(r1)} ${u}</span>${ar(op2)}
      <span class="b35-cell">${q.num(r2)} ${u}</span></div>`;
  return q.done(
    line('a)', 'st', va, 'ml', '× ' + ka, a1, ': ' + ma, a2) +
    line('b)', 'st2', vb, 'g', ': ' + kb, b1, '× ' + mb, b2) +
    line('c)', 'st3', vc, 'mm', '× ' + kc, c1, ': ' + mc, c2),
    `a) ${va} × ${ka} = ${a1}; ${a1} : ${ma} = ${a2}
     · b) ${vb} : ${kb} = ${b1}; ${b1} × ${mb} = ${b2}
     · c) ${vc} × ${kc} = ${c1}; ${c1} : ${mc} = ${c2}`);
},

/* ===== tr.96 – Bài 2: Túi nào nặng nhất ===== */
() => {
  const q = Q(2, 'Túi nào nặng nhất trong ba túi A, B, C như hình dưới đây?');
  const L = ['A', 'B', 'C'].sort(() => Math.random() - .5);
  const bal = L[0], hv = L[1], lt = L[2];
  const w = [50, 100, 200].sort(() => Math.random() - .5).slice(0, 2);
  const M = pick([500, 1000]);
  const CL = {A: '#f2d98c', B: '#a8d98c', C: '#a8cff0'};
  return q.done(`<div class="b35-row">
      <div class="b35-item">${ART.b35Scale(w.map(g => ({t: 'can', v: g + ' g'})),
        [{t: 'tui', v: bal, c: CL[bal]}], 0)}</div>
      <div class="b35-item">${ART.b35Scale([{t: 'can', v: M + ' g'}],
        [{t: 'tui', v: hv, c: CL[hv]}], 1)}</div>
      <div class="b35-item">${ART.b35Scale([{t: 'tui', v: hv, c: CL[hv]}],
        [{t: 'tui', v: lt, c: CL[lt]}], -1)}</div>
    </div>
    <div class="fill-line">Túi nặng nhất là túi ${q.pick(hv, ['A', 'B', 'C'])}</div>`,
    `Túi ${bal} nặng ${w[0] + w[1]} g; túi ${hv} nặng hơn ${M} g nên nặng hơn túi ${bal};
     túi ${hv} lại nặng hơn túi ${lt}. Vậy túi ${hv} nặng nhất.`);
},
];
