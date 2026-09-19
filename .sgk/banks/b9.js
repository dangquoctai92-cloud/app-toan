/* ==================== BÀI 9: BẢNG NHÂN 6, BẢNG CHIA 6 (SGK trang 28, 29, 30) ====================
   · Hoạt động (tr.29): bài 1, 2
   · Luyện tập (tr.29–30): bài 1, 2, 3, 4, 5
============================================================================================== */



BANKS.b9 = [

/* ===== Hoạt động tr.29 – Bài 1: tính nhẩm ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const ma = [];
  let guard = 0;
  while (ma.length < 3 && guard++ < 200){ const k = R(1, 9); if (!ma.includes(k)) ma.push(k); }
  const da = [];
  guard = 0;
  while (da.length < 3 && guard++ < 200){ const k = R(2, 9); if (!da.includes(k)) da.push(k); }
  const v = pick([2, 3, 4, 5, 7, 8, 9]);   // tránh v = 6 làm hai phép chia trùng nhau
  const html = `<div class="sub-lbl">a)</div>
    <div class="calc-grid">${ma.map(k => `<div class="calc-cell">6 × ${k} = ${q.num(6 * k)}</div>`).join('')}</div>
    <div class="sub-lbl">b)</div>
    <div class="calc-grid">${da.map(k => `<div class="calc-cell">${6 * k} : 6 = ${q.num(k)}</div>`).join('')}</div>
    <div class="sub-lbl">c)</div>
    <div class="calc-grid">
      <div class="calc-cell">6 × ${v} = ${q.num(6 * v)}</div>
      <div class="calc-cell">${6 * v} : 6 = ${q.num(v)}</div>
      <div class="calc-cell">${6 * v} : ${v} = ${q.num(6)}</div>
    </div>`;
  return q.done(html);
},

/* ===== Hoạt động tr.29 – Bài 2: hai phép tính nào có cùng kết quả ===== */
() => {
  const q = Q(2, 'Hai phép tính nào dưới đây có cùng kết quả?');
  const POOL = [2, 3, 4, 5, 7, 8, 9, 6, 12, 18, 24, 30, 36, 42, 48];
  const vals = [];
  let guard = 0;
  while (vals.length < 5 && guard++ < 300){ const v = pick(POOL); if (!vals.includes(v)) vals.push(v); }
  const leftExp = v => (v % 6 === 0 && v / 6 <= 9) ? `6 × ${v / 6}` : `${6 * v} : 6`;
  const rightExp = (v, ex) => {
    const cand = [];
    for (let a = 2; a <= 9; a++){ const b = v / a; if (v % a === 0 && b >= 2 && b <= 9) cand.push(`${a} × ${b}`); }
    [2, 3, 4, 5].forEach(d => { if (v * d <= 90) cand.push(`${v * d} : ${d}`); });
    const ok = cand.filter(x => x !== ex);
    return ok.length ? pick(ok) : `${v} × 1`;
  };
  const pairs = vals.map(v => { const l = leftExp(v); return {v, l, r:rightExp(v, l)}; });
  const left = [...pairs].sort(() => Math.random() - .5);
  const opts = [...pairs].sort(() => Math.random() - .5).map(p => p.r);
  const html = `<div class="truck-row">${left.map(p => `<span class="truck-tag">${p.l}</span>`).join('')}</div>`
    + left.map(p => `<div class="fill-line">${p.l} có cùng kết quả với ${q.pick(p.r, opts)}</div>`).join('')
    + '<div class="hint-line">Chạm để chọn phép tính có cùng kết quả.</div>';
  return q.done(html, pairs.map(p => `${p.l} = ${p.r} = ${p.v}`).join(' · '));
},

/* ===== Luyện tập tr.29 – Bài 1: nêu các số còn thiếu ===== */
() => {
  const q = Q(1, 'Nêu các số còn thiếu.');
  const hidden = () => {
    const h = [];
    let guard = 0;
    while (h.length < 4 && guard++ < 200){ const i = R(1, 8); if (!h.includes(i)) h.push(i); }
    return h;
  };
  const hu = hidden(), hd = hidden();
  const up = Array.from({length:10}, (_, i) => 6 * (i + 1));
  const dn = Array.from({length:10}, (_, i) => 60 - 6 * i);
  const node = (v, i, hs) => hs.includes(i)
    ? `<span class="cnode q">${q.num(v)}</span>` : `<span class="cnode">${v}</span>`;
  const html = `<div class="sub-lbl">a)</div>
      <div class="chain round">${up.map((v, i) => node(v, i, hu)).join('')}</div>
    <div class="sub-lbl">b)</div>
      <div class="chain dia">${dn.map((v, i) => node(v, i, hd)).join('')}</div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.30 – Bài 2: dãy phép tính của bươm bướm ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const a = pick([4, 6, 8]);
  const p = 6 * a;
  const b = pick([2, 3, 4, 6].filter(x => p % x === 0));
  const r = p / b;
  const c = pick([2, 3, 4].filter(x => r % x === 0));
  const arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
      <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;
  return q.done(`<div class="flow">
      <span class="fnode circle">6</span>${arrow('× ' + a)}
      <span class="fnode circle">${q.num(p)}</span>${arrow(': ' + b)}
      <span class="fnode circle">${q.num(r)}</span>${arrow(': ' + c)}
      <span class="fnode circle">${q.num(r / c)}</span>
    </div>`,
    `6 × ${a} = ${p};  ${p} : ${b} = ${r};  ${r} : ${c} = ${r / c}`);
},

/* ===== Luyện tập tr.30 – Bài 3: bảng thừa số – tích, số bị chia – thương ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const ks = [], ms = [];
  let guard = 0;
  while (ks.length < 6 && guard++ < 300){ const k = R(1, 9); if (!ks.includes(k)) ks.push(k); }
  guard = 0;
  while (ms.length < 6 && guard++ < 300){ const m = R(1, 9); if (!ms.includes(m)) ms.push(m); }
  const html = `<div class="sub-lbl">a)</div><div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Thừa số</th>${ks.map(() => '<td>6</td>').join('')}</tr>
      <tr><th>Thừa số</th>${ks.map(k => `<td>${k}</td>`).join('')}</tr>
      <tr><th>Tích</th><td>${6 * ks[0]}</td>${ks.slice(1).map(k => `<td>${q.num(6 * k)}</td>`).join('')}</tr>
    </table></div>
    <div class="sub-lbl">b)</div><div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Số bị chia</th>${ms.map(m => `<td>${6 * m}</td>`).join('')}</tr>
      <tr><th>Số chia</th>${ms.map(() => '<td>6</td>').join('')}</tr>
      <tr><th>Thương</th><td>${ms[0]}</td>${ms.slice(1).map(m => `<td>${q.num(m)}</td>`).join('')}</tr>
    </table></div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.30 – Bài 4: các hộp bút chì màu ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const boxes = R(3, 6);
  const PEN = ['#e04b4b', '#f0a02e', '#3fb14e', '#3a7fd0', '#8e5cc4', '#d8c02e'];
  const box = `<svg viewBox="0 0 72 108">
    <g stroke="#7a5a2e" stroke-width="1.4">${PEN.map((c, i) =>
      `<rect x="${7 + i * 10}" y="${14 + (i % 2) * 6}" width="8" height="${34 - (i % 2) * 6}" rx="1.5" fill="${c}"/>`).join('')}</g>
    <rect x="3" y="46" width="66" height="56" rx="4" fill="#dcd58f" stroke="#8a7a3a" stroke-width="2.4"/>
    <path d="M3 60h66" stroke="#8a7a3a" stroke-width="1.6"/>
  </svg>`;
  const html = `<div class="penbox-row">${Array.from({length:boxes}, () => box).join('')}</div>
    <div class="fill-line">a) Mỗi hộp có ${q.num(6)} chiếc bút chì màu.</div>
    <div class="fill-line">b) Số bút chì màu ở ${boxes} hộp là: ${q.num(6)} <span class="op">×</span> ${q.num(boxes)}
      = ${q.num(6 * boxes)} (chiếc).</div>`;
  return q.done(html, `6 × ${boxes} = ${6 * boxes} (chiếc)`);
},

/* ===== Luyện tập tr.30 – Bài 5: bài toán cưa thanh gỗ ===== */
() => {
  const q = Q(5, '');
  const each = R(4, 15), L = each * 6;
  const wood = `<svg viewBox="0 0 300 60" class="wood-svg">
    <rect x="6" y="18" width="288" height="26" rx="4" fill="#d9a25c" stroke="#96652c" stroke-width="2.4"/>
    <g stroke="#96652c" stroke-width="2" stroke-dasharray="4 3">
      <path d="M54 18v26M102 18v26M150 18v26M198 18v26M246 18v26"/>
    </g>
  </svg>`;
  return q.done(`<p class="wordq">Một thanh gỗ dài ${L} cm được cưa thành 6 đoạn bằng nhau.
      Hỏi mỗi đoạn gỗ đó dài bao nhiêu xăng-ti-mét?</p>
    ${wood}
    <div class="fill-line">Mỗi đoạn gỗ dài ${q.num(each)} cm.</div>`,
    `${L} : 6 = ${each} (cm)`);
},
];
