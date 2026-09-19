/* ==================== BÀI 56: NHÂN SỐ CÓ BỐN CHỮ SỐ VỚI SỐ CÓ MỘT CHỮ SỐ
   (SGK tập 2, tr.43, 44, 45, 46)
   hoạt động tr.44 : bài 1 (Tính), bài 2 (Đặt tính rồi tính), bài 3 (Tính nhẩm theo mẫu),
                     bài 4 (chu vi khu đất hình vuông)
   luyện tập tr.44–45 : bài 1 (Tính), bài 2 (Số ? – thừa số, tích), bài 3 (>, <, =),
                        bài 4 (dầu cho tàu đánh cá của bác Sáu)
   luyện tập tr.45–46 : bài 1 (Đặt tính rồi tính), bài 2 (sư đoàn – trung đoàn),
                        bài 3 (Số ? – lực sĩ mèo và rùa nâng tạ), bài 4 (Tìm chữ số thích hợp)
======================================================================================= */

/* viết số có bốn chữ số theo kiểu sách: 1 216 */
const NSP56 = n => String(n).replace(/(\d)(\d{3})$/, '$1 $2');

/* đĩa tạ nhìn nghiêng */
ART.b56Disc = w => {
  const h = w === 1000 ? 30 : w === 500 ? 22 : 14;
  const c = w === 1000 ? '#2b3a8f' : w === 500 ? '#c0392b' : '#1e7d32';
  return `<i style="height:${h}px;background:${c}"></i>`;
};

/* thanh tạ đối xứng, mỗi bên xếp các đĩa trong mảng plates (tính từ trong ra ngoài) */
ART.b56Bar = plates => {
  const H = w => w === 1000 ? 74 : w === 500 ? 54 : 34;
  const C = w => w === 1000 ? '#2b3a8f' : w === 500 ? '#c0392b' : '#1e7d32';
  let s = `<rect x="34" y="72" width="292" height="11" rx="5.5" fill="#a7b0bd" stroke="#5d6672" stroke-width="2"/>`;
  for (let i = 0; i < plates.length; i++){
    const w = plates[i], h = H(w), c = C(w);
    const xs = [130 - i * 21, 230 + i * 21];
    for (let k = 0; k < 2; k++){
      const x = xs[k];
      s += `<rect x="${x - 9}" y="${(77.5 - h / 2).toFixed(1)}" width="18" height="${h}" rx="8"
        fill="${c}" stroke="#1b1b2b" stroke-width="1.8"/>`;
      s += `<text x="${x}" y="81" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff"
        transform="rotate(-90 ${x} 81)">${w} g</text>`;
    }
  }
  return `<svg viewBox="0 0 360 156" class="b56-bar">${s}</svg>`;
};

BANKS.b56 = [

/* ===== tr.44 – Bài 1: Tính (nhân không nhớ) ===== */
() => {
  const q = Q(1, 'Tính.');
  const items = [];
  for (let g = 0; g < 200 && items.length < 3; g++){
    const b = R(2, 4), mx = Math.floor(9 / b);
    const t = R(1, mx), a = t * 1000 + R(0, mx) * 100 + R(0, mx) * 10 + R(0, mx);
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 1102 + items.length, b: 3});
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${NSP56(it.a)}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a * it.b)}</span></div>`;
  return q.done(`<div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${NSP56(x.a)} × ${x.b} = ${NSP56(x.a * x.b)}`).join(';  '));
},

/* ===== tr.44 – Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const items = [];
  for (let g = 0; g < 200 && items.length < 3; g++){
    const b = R(3, 9), mx = Math.floor(9 / b);
    const t = R(1, mx), a = t * 1000 + R(0, mx) * 100 + R(0, mx) * 10 + R(0, mx);
    if (a >= 1000 && !items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 1021 + items.length, b: 4});
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${NSP56(it.a)}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a * it.b)}</span></div>`;
  return q.done(`<div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${NSP56(x.a)} × ${x.b} = ${NSP56(x.a * x.b)}`).join(';  '));
},

/* ===== tr.44 – Bài 3: Tính nhẩm (theo mẫu) ===== */
() => {
  const q = Q(3, 'Tính nhẩm (theo mẫu).');
  const mk = () => { const k = R(2, 4), b = R(2, Math.floor(9 / k)); return {k, b}; };
  const rows = [];
  for (let g = 0; g < 200 && rows.length < 3; g++){
    const r = mk();
    if (!rows.some(x => x.k === r.k && x.b === r.b)) rows.push(r);
  }
  while (rows.length < 3) rows.push({k: 2, b: 3});
  const L = ['a)', 'b)', 'c)'];
  const html = noteBox('Mẫu:  2 000 × 3 = ?<br>Nhẩm:  2 nghìn × 3 = 6 nghìn<br>2 000 × 3 = 6 000')
    + '<div class="b56-nh">' + rows.map((r, i) =>
      `<div class="fill-line"><span class="b56-lbl">${L[i]}</span>
        ${r.k} nghìn × ${r.b} = ${q.num(r.k * r.b, 1)} nghìn;&nbsp;&nbsp;
        ${NSP56(r.k * 1000)} × ${r.b} = ${q.num(r.k * r.b * 1000)}</div>`).join('') + '</div>';
  return q.done(html,
    rows.map(r => `${NSP56(r.k * 1000)} × ${r.b} = ${NSP56(r.k * r.b * 1000)}`).join(';  '));
},

/* ===== tr.44 – Bài 4: Chu vi khu đất dạng hình vuông ===== */
() => {
  const q = Q(4, '');
  const c = R(1005, 2480);
  return q.done(`<p class="wordq">Một khu đất dạng hình vuông có độ dài cạnh là ${NSP56(c)} m.
      Hỏi chu vi của khu đất đó là bao nhiêu mét?</p>
    <div class="bullet">Chu vi của khu đất đó là ${q.num(c * 4)} m.</div>`,
    `${NSP56(c)} × 4 = ${NSP56(c * 4)} (m)`);
},

/* ===== tr.44 – Luyện tập, Bài 1: Tính (nhân có nhớ) ===== */
() => {
  const q = Q(1, 'Tính.');
  const items = [];
  for (let g = 0; g < 200 && items.length < 3; g++){
    const b = R(5, 8), a = R(1002, Math.min(1999, Math.floor(9999 / b)));
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 3) items.push({a: 1205 + items.length, b: 6});
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${NSP56(it.a)}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a * it.b)}</span></div>`;
  return q.done(`<div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${NSP56(x.a)} × ${x.b} = ${NSP56(x.a * x.b)}`).join(';  '));
},

/* ===== tr.45 – Luyện tập, Bài 2: Số ? (thừa số – thừa số – tích) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const items = [];
  for (let g = 0; g < 200 && items.length < 4; g++){
    const b = R(2, 9), a = R(1002, Math.floor(9999 / b));
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 4) items.push({a: 1011 + items.length, b: 3});
  const r1 = items.map(x => `<td>${NSP56(x.a)}</td>`).join('');
  const r2 = items.map(x => `<td>${x.b}</td>`).join('');
  const r3 = items.map((x, i) => i === 0
    ? `<td>${NSP56(x.a * x.b)}</td>` : `<td>${q.num(x.a * x.b)}</td>`).join('');
  return q.done(`<div class="tbl-wrap"><table class="tbl green">
      <tr><th>Thừa số</th>${r1}</tr>
      <tr><th>Thừa số</th>${r2}</tr>
      <tr><th>Tích</th>${r3}</tr></table></div>`,
    items.slice(1).map(x => `${NSP56(x.a)} × ${x.b} = ${NSP56(x.a * x.b)}`).join(';  '));
},

/* ===== tr.45 – Luyện tập, Bài 3: >, <, = ? ===== */
() => {
  const q = Q(3, '&gt; ; &lt; ; = ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  const A = [], B = [];
  for (let g = 0; g < 200 && A.length < 2; g++){
    const b = R(2, 6), a = R(1002, Math.floor(9999 / b)), p = a * b;
    const r = pick([p, p + R(1, 400), p - R(1, 400)]);
    if (r > 0 && !A.some(x => x.a === a)) A.push({a, b, r, s: cmp(p, r)});
  }
  while (A.length < 2) A.push({a: 1234, b: 2, r: 2468, s: '='});
  for (let g = 0; g < 200 && B.length < 2; g++){
    const b1 = R(2, 5), a1 = R(1002, Math.floor(9999 / b1));
    const b2 = R(2, 5), a2 = R(1002, Math.floor(9999 / b2));
    if (!B.some(x => x.a1 === a1)) B.push({a1, b1, a2, b2, s: cmp(a1 * b1, a2 * b2)});
  }
  while (B.length < 2) B.push({a1: 1003, b1: 3, a2: 1004, b2: 3, s: '<'});
  const rowA = x => `<div class="cmp-row"><span class="side">${NSP56(x.a)} × ${x.b}</span>
    ${q.sign(x.s)}<span class="side">${NSP56(x.r)}</span></div>`;
  const rowB = x => `<div class="cmp-row"><span class="side">${NSP56(x.a1)} × ${x.b1}</span>
    ${q.sign(x.s)}<span class="side">${NSP56(x.a2)} × ${x.b2}</span></div>`;
  return q.done(`<div class="two-col">
      <div><div class="sub-lbl">a)</div>${A.map(rowA).join('')}</div>
      <div><div class="sub-lbl">b)</div>${B.map(rowB).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    A.map(x => `${NSP56(x.a)} × ${x.b} = ${NSP56(x.a * x.b)}`).join(';  ') + ';  '
      + B.map(x => `${NSP56(x.a1)} × ${x.b1} = ${NSP56(x.a1 * x.b1)}, `
        + `${NSP56(x.a2)} × ${x.b2} = ${NSP56(x.a2 * x.b2)}`).join(';  '));
},

/* ===== tr.45 – Luyện tập, Bài 4: dầu cho tàu đánh cá của bác Sáu ===== */
() => {
  const q = Q(4, '');
  const tau = R(2, 3), moi = R(1050, Math.floor(9990 / tau) - 50);
  const dau = Math.floor(moi / 10) * 10;
  return q.done(`<p class="wordq">Bác Sáu có ${tau} tàu đánh cá, bác cần ${NSP56(dau)} <i>l</i> dầu cho mỗi tàu.
      Hỏi bác Sáu cần tất cả bao nhiêu lít dầu cho ${tau} tàu đánh cá đó?</p>
    <div class="bullet">Bác Sáu cần tất cả ${q.num(dau * tau)} <i>l</i> dầu.</div>`,
    `${NSP56(dau)} × ${tau} = ${NSP56(dau * tau)} (l)`);
},

/* ===== tr.45 – Luyện tập (tiếp), Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const items = [];
  for (let g = 0; g < 240 && items.length < 4; g++){
    const b = R(5, 9), a = R(1002, Math.min(1999, Math.floor(9999 / b)));
    if (!items.some(x => x.a === a)) items.push({a, b});
  }
  while (items.length < 4) items.push({a: 1041 + items.length, b: 6});
  const vc = it => `<div class="vcalc"><span class="vop">×</span>
    <span class="vnums"><b>${NSP56(it.a)}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.a * it.b)}</span></div>`;
  return q.done(`<div class="vrow">${items.map(vc).join('')}</div>`,
    items.map(x => `${NSP56(x.a)} × ${x.b} = ${NSP56(x.a * x.b)}`).join(';  '));
},

/* ===== tr.46 – Luyện tập (tiếp), Bài 2: sư đoàn và các trung đoàn ===== */
() => {
  const q = Q(2, '');
  const trung = R(3, 5);
  const moi = R(10, Math.floor(90 / trung)) * 100;
  const them = R(2, 9) * 50;
  return q.done(`<p class="wordq">Một sư đoàn có ${trung} trung đoàn, mỗi trung đoàn có ${NSP56(moi)} người.
      Sau đó sư đoàn được bổ sung thêm ${them} người.
      Hỏi lúc này, sư đoàn có tất cả bao nhiêu người?</p>
    <div class="bullet">${trung} trung đoàn có ${q.num(trung * moi)} người.</div>
    <div class="bullet">Lúc này sư đoàn có tất cả ${q.num(trung * moi + them)} người.</div>`,
    `${NSP56(moi)} × ${trung} = ${NSP56(trung * moi)} (người);  `
      + `${NSP56(trung * moi)} + ${them} = ${NSP56(trung * moi + them)} (người)`);
},

/* ===== tr.46 – Luyện tập (tiếp), Bài 3: Số ? (lực sĩ mèo và rùa thi tài) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const mkPlates = () => {
    const a = R(1, 2), b = R(0, 1), c = R(0, 2);
    const p = [];
    for (let i = 0; i < a; i++) p.push(1000);
    for (let i = 0; i < b; i++) p.push(500);
    for (let i = 0; i < c; i++) p.push(100);
    return p;
  };
  let meo = mkPlates(), rua = mkPlates();
  const sum = p => p.reduce((s, x) => s + x, 0);
  for (let g = 0; g < 60 && sum(meo) <= sum(rua); g++) rua = mkPlates();
  if (sum(meo) <= sum(rua)) { meo = [1000, 1000, 500]; rua = [1000, 500]; }
  const wm = sum(meo), wr = sum(rua);
  const leg = `<div class="b56-leg">
    <span>${ART.b56Disc(1000)}1000 g</span><span>${ART.b56Disc(500)}500 g</span>
    <span>${ART.b56Disc(100)}100 g</span></div>`;
  return q.done(`<p class="wordq">Lực sĩ mèo và rùa thi tài.</p>
    <div class="b56-lift">
      <div class="b56-who">${ART.b56Bar(meo)}<em>Mèo</em></div>
      <div class="b56-who">${ART.b56Bar(rua)}<em>Rùa</em></div></div>${leg}
    <div class="bullet">a) Mỗi bên tạ của mèo cân nặng ${q.num(wm)} g.
      Mèo nâng được ${q.num(wm * 2)} g.</div>
    <div class="bullet">b) Mỗi bên tạ của rùa cân nặng ${q.num(wr)} g.
      Rùa nâng được ${q.num(wr * 2)} g.</div>`,
    `a) ${NSP56(wm)} × 2 = ${NSP56(wm * 2)} (g);  b) ${NSP56(wr)} × 2 = ${NSP56(wr * 2)} (g)`);
},

/* ===== tr.46 – Luyện tập (tiếp), Bài 4: Tìm chữ số thích hợp ===== */
() => {
  const q = Q(4, 'Tìm chữ số thích hợp.');
  const mk = () => {
    for (let g = 0; g < 400; g++){
      const b = R(2, 9);
      const n = R(1000, Math.floor(9999 / b));
      const p = n * b;
      const ds = String(n).split(''), ps = String(p).split('');
      if (ps.length !== 4) continue;
      const k = R(1, 3);
      const h1 = R(0, 3);
      let h2 = R(0, 3);
      if (h2 === h1) h2 = (h1 + 1) % 4;
      let cnt = 0;
      for (let v = 0; v <= 9; v++){
        const arr = ds.slice(); arr[k] = String(v);
        const p2 = String(+arr.join('') * b);
        if (p2.length !== 4) continue;
        let ok = true;
        for (let i = 0; i < 4; i++) if (i !== h1 && i !== h2 && p2[i] !== ps[i]) ok = false;
        if (ok) cnt++;
      }
      if (cnt === 1) return {b, ds, ps, k, hid: [h1, h2]};
    }
    return {b: 4, ds: ['1', '2', '1', '5'], ps: ['4', '8', '6', '0'], k: 1, hid: [2, 3]};
  };
  const A = mk(), B = mk();
  const cell = v => `<span class="b56-dg">${v}</span>`;
  const vt = it => {
    const top = it.ds.map((d, i) => i === it.k ? cell(q.num(+d, 1)) : cell(d)).join('');
    const res = it.ps.map((d, i) => it.hid.indexOf(i) >= 0 ? cell(q.num(+d, 1)) : cell(d)).join('');
    return `<div class="b56-vt"><div class="b56-row">${top}</div>
      <div class="b56-row"><span class="b56-op">×</span>${cell(it.b)}</div>
      <div class="b56-row b56-line">${res}</div></div>`;
  };
  return q.done(`<div class="b56-two">
      <div><span class="b56-lbl">a)</span>${vt(A)}</div>
      <div><span class="b56-lbl">b)</span>${vt(B)}</div></div>
    <div class="hint-line">Nhân lần lượt từ hàng đơn vị để tìm chữ số ở mỗi ô "?"</div>`,
    `a) ${NSP56(+A.ds.join(''))} × ${A.b} = ${NSP56(+A.ps.join(''))};  `
      + `b) ${NSP56(+B.ds.join(''))} × ${B.b} = ${NSP56(+B.ps.join(''))}`);
},
];
