/* ====== BÀI 17: HÌNH TRÒN. TÂM, BÁN KÍNH, ĐƯỜNG KÍNH CỦA HÌNH TRÒN (SGK trang 52, 53) ======
   · Hoạt động tr.53 : Tìm tâm, bán kính, đường kính của mỗi hình tròn (a và b)
   · Luyện tập  tr.53: bài 1 (vẽ đường tròn, bán kính, đường kính), bài 2 (bọ ngựa bò theo ABCD)
========================================================================================= */

ART.b17Pt = (x, y, t, dx, dy) =>
  `<circle cx="${(+x).toFixed(1)}" cy="${(+y).toFixed(1)}" r="4.4"/>
   <text x="${(+x + dx).toFixed(1)}" y="${(+y + dy).toFixed(1)}" font-size="18" font-weight="700">${t}</text>`;

/* hình tròn tâm O, đường kính MN đi qua tâm, bán kính OP */
ART.b17CircA = (P, col) => {
  const cx = 100, cy = 100, R = 78;
  const a1 = 158 * Math.PI / 180, a2 = -34 * Math.PI / 180;
  const mx = cx + R * Math.cos(a1), my = cy + R * Math.sin(a1);
  const nx = cx - R * Math.cos(a1), ny = cy - R * Math.sin(a1);
  const px = cx + R * Math.cos(a2), py = cy + R * Math.sin(a2);
  return `<svg viewBox="0 0 200 200" class="b17-fig">
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="${col}" stroke="#1e1e1e" stroke-width="3"/>
    <g stroke="#1e1e1e" stroke-width="2.8" fill="none">
      <path d="M${mx.toFixed(1)} ${my.toFixed(1)}L${nx.toFixed(1)} ${ny.toFixed(1)}"/>
      <path d="M${cx} ${cy}L${px.toFixed(1)} ${py.toFixed(1)}"/></g>
    <g fill="#1e1e1e" stroke="none">${ART.b17Pt(cx, cy, P.O, -6, 24)}
      ${ART.b17Pt(mx, my, P.M, -22, -6)}${ART.b17Pt(nx, ny, P.N, 8, 20)}
      ${ART.b17Pt(px, py, P.P, 8, -4)}</g></svg>`;
};

/* hình tròn tâm I, đường kính AB, dây CD không đi qua tâm */
ART.b17CircB = (P, col) => {
  const cx = 100, cy = 100, R = 78;
  const c1 = 74 * Math.PI / 180, c2 = -52 * Math.PI / 180;
  const dx1 = cx + R * Math.cos(c1), dy1 = cy + R * Math.sin(c1);
  const dx2 = cx + R * Math.cos(c2), dy2 = cy + R * Math.sin(c2);
  return `<svg viewBox="0 0 200 200" class="b17-fig">
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="${col}" stroke="#1e1e1e" stroke-width="3"/>
    <g stroke="#1e1e1e" stroke-width="2.8" fill="none">
      <path d="M${cx - R} ${cy}H${cx + R}"/>
      <path d="M${dx1.toFixed(1)} ${dy1.toFixed(1)}L${dx2.toFixed(1)} ${dy2.toFixed(1)}"/></g>
    <g fill="#1e1e1e" stroke="none">${ART.b17Pt(cx, cy, P.I, -6, 24)}
      ${ART.b17Pt(cx - R, cy, P.A, -22, 6)}${ART.b17Pt(cx + R, cy, P.B, 9, 6)}
      ${ART.b17Pt(dx1, dy1, P.D, 8, -4)}${ART.b17Pt(dx2, dy2, P.C, -6, 26)}</g></svg>`;
};

/* đường tròn tâm O, bán kính OA, đường kính CD */
ART.b17Draw = (P, r) => {
  const cx = 110, cy = 110, R = 86;
  const a = -50 * Math.PI / 180;
  const ax = cx + R * Math.cos(a), ay = cy + R * Math.sin(a);
  return `<svg viewBox="0 0 220 220" class="b17-fig">
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="#1e1e1e" stroke-width="3"/>
    <g stroke="#1e1e1e" stroke-width="2.8" fill="none">
      <path d="M${cx - R} ${cy}H${cx + R}"/><path d="M${cx} ${cy}L${ax.toFixed(1)} ${ay.toFixed(1)}"/></g>
    <g fill="#1e1e1e" stroke="none">${ART.b17Pt(cx, cy, P.O, -8, 22)}
      ${ART.b17Pt(cx - R, cy, P.C, -24, 6)}${ART.b17Pt(cx + R, cy, P.D, 10, 6)}
      ${ART.b17Pt(ax, ay, P.A, 8, 16)}</g>
    <text x="${(cx + 26)}" y="${(cy + 24)}" font-size="15" font-weight="700" fill="#1e1e1e">${r} cm</text></svg>`;
};

/* ba bông hoa hình tròn tiếp xúc nhau, đường gấp khúc ABCD */
ART.b17Flowers = (r, COL) => {
  const R = 52, cy = 104, c1 = 66, c2 = c1 + 2 * R, c3 = c1 + 4 * R;
  const flower = (cx, i) => {
    let pet = '';
    for (let k = 0; k < 14; k++){
      const a = k * 360 / 14 * Math.PI / 180;
      pet += `<ellipse cx="${(cx + 34 * Math.cos(a)).toFixed(1)}" cy="${(cy + 34 * Math.sin(a)).toFixed(1)}"
        rx="11" ry="7" transform="rotate(${(k * 360 / 14).toFixed(1)} ${(cx + 34 * Math.cos(a)).toFixed(1)} ${(cy + 34 * Math.sin(a)).toFixed(1)})"
        fill="${COL[i][1]}" stroke="#7a4a12" stroke-width="1.2"/>`;
    }
    return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${COL[i][0]}" stroke="#1e1e1e" stroke-width="2.4"/>
      ${pet}<circle cx="${cx}" cy="${cy}" r="21" fill="#fbe9a8" stroke="#c9a83a" stroke-width="1.6"/>`;
  };
  return `<svg viewBox="0 0 ${c3 + 66} 200" class="b17-fig wide">
    ${flower(c1, 0)}${flower(c2, 1)}${flower(c3, 2)}
    <g stroke="#1e1e1e" stroke-width="3" fill="none">
      <path d="M${c1} ${cy - R}V${cy}H${c3}V${cy - R}"/></g>
    <g fill="#1e1e1e" stroke="none">
      ${ART.b17Pt(c1, cy - R, 'A', -20, -8)}${ART.b17Pt(c1, cy, 'B', -6, 24)}
      ${ART.b17Pt(c3, cy, 'C', -6, 24)}${ART.b17Pt(c3, cy - R, 'D', 8, -8)}</g>
    <text x="${c1 + 8}" y="${cy - 20}" font-size="15" font-weight="700" fill="#1e1e1e">${r} cm</text></svg>`;
};

BANKS.b17 = [

/* ===== Hoạt động tr.53 – a) Tìm tâm, bán kính, đường kính của hình tròn ===== */
() => {
  const ls = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'K', 'M', 'N', 'O', 'P', 'Q'].sort(() => Math.random() - .5);
  const P = {O:ls[0], M:ls[1], N:ls[2], P:ls[3]};
  const q = Q(1, 'a) Tìm tâm, bán kính, đường kính của hình tròn.');
  const rad = [P.O + P.M, P.O + P.N, P.O + P.P];
  const bad = [P.M + P.N, P.M + P.P, P.N + P.P];
  const opts = rad.concat(bad).sort(() => Math.random() - .5);
  const cent = [P.O, P.M, P.N, P.P].sort();
  const html = ART.b17CircA(P, '#f5b820') +
    `<div class="fill-line">Hình tròn có tâm là điểm
       <span class="wpick">${q.pick(P.O, cent)}</span></div>
     <div class="fill-line">Chọn tất cả các bán kính của hình tròn:
       <span class="wpick">${q.pick([...rad].sort().join(','), opts)}</span></div>
     <div class="fill-line">Đường kính của hình tròn là
       <span class="wpick">${q.pick(P.M + P.N, opts)}</span></div>`;
  return q.done(html,
    `Hình tròn tâm ${P.O}, bán kính ${rad.join(', ')}, đường kính ${P.M}${P.N}. `
    + `Đường kính đi qua tâm và dài bằng hai lần bán kính.`);
},

/* ===== Hoạt động tr.53 – b) Tìm tâm, bán kính, đường kính của hình tròn ===== */
() => {
  const ls = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'K', 'M', 'N', 'O', 'P', 'Q'].sort(() => Math.random() - .5);
  const P = {I:ls[0], A:ls[1], B:ls[2], C:ls[3], D:ls[4]};
  const q = Q(1, 'b) Tìm tâm, bán kính, đường kính của hình tròn.');
  const rad = [P.I + P.A, P.I + P.B];
  const bad = [P.A + P.B, P.C + P.D, P.A + P.D, P.B + P.C];
  const opts = rad.concat(bad).sort(() => Math.random() - .5);
  const cent = [P.I, P.A, P.B, P.C, P.D].sort();
  const html = ART.b17CircB(P, '#5ec6f0') +
    `<div class="fill-line">Hình tròn có tâm là điểm
       <span class="wpick">${q.pick(P.I, cent)}</span></div>
     <div class="fill-line">Chọn tất cả các bán kính đã vẽ trong hình tròn:
       <span class="wpick">${q.pick([...rad].sort().join(','), opts)}</span></div>
     <div class="fill-line">Đường kính của hình tròn là
       <span class="wpick">${q.pick(P.A + P.B, opts)}</span></div>`;
  return q.done(html,
    `Hình tròn tâm ${P.I}, bán kính ${P.I}${P.A} và ${P.I}${P.B}, đường kính ${P.A}${P.B}. `
    + `Đoạn thẳng ${P.C}${P.D} không đi qua tâm nên không phải là đường kính.`);
},

/* ===== Luyện tập tr.53 – Bài 1: vẽ đường tròn tâm O, bán kính OA, đường kính CD ===== */
() => {
  const ls = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'K', 'M', 'N', 'O', 'P', 'Q'].sort(() => Math.random() - .5);
  const P = {O:ls[0], A:ls[1], C:ls[2], D:ls[3]};
  const r = R(2, 9);
  const q = Q(1, `a) Vẽ đường tròn tâm ${P.O}.<br>b) Vẽ bán kính ${P.O}${P.A},
    đường kính ${P.C}${P.D} của đường tròn đó.`);
  const html = ART.b17Draw(P, r) +
    `<div class="fill-line">Bán kính ${P.O}${P.A} dài ${r} cm nên bán kính ${P.O}${P.C} cũng dài ${q.num(r, 1)} cm.</div>
     <div class="fill-line">Đường kính ${P.C}${P.D} dài ${q.num(2 * r, 2)} cm.</div>
     <div class="fill-line">Đường kính dài gấp ${q.num(2, 1)} lần bán kính.</div>
     <div class="hint-line">Tâm ${P.O} là trung điểm của đường kính ${P.C}${P.D}.</div>`;
  return q.done(html, `${r} + ${r} = ${2 * r} (cm)`);
},

/* ===== Luyện tập tr.53 – Bài 2: bọ ngựa bò theo đường gấp khúc ABCD ===== */
() => {
  const q = Q(2, '');
  const r = R(3, 12);
  const COL = [['#bfe3b0', '#f0913a'], ['#f6b8cf', '#e8548c'], ['#bfe0f5', '#a889d6'],
    ['#fbe3a8', '#d8a020'], ['#d8ccf0', '#7a5bbd']].sort(() => Math.random() - .5).slice(0, 3);
  return q.done(`<p class="wordq">Trong bức tranh sau, mỗi hình tròn đều có bán kính ${r} cm.
      Bọ ngựa đang ở điểm A bò theo đường gấp khúc ABCD để đến chỗ vòi voi ở điểm D.
      Hỏi bọ ngựa phải bò bao nhiêu xăng-ti-mét?</p>
    ${ART.b17Flowers(r, COL)}
    <div class="bullet">AB là bán kính nên AB dài ${q.num(r, 2)} cm.</div>
    <div class="bullet">BC gồm 2 đường kính nên BC dài ${q.num(4 * r, 2)} cm.</div>
    <div class="bullet">CD là bán kính nên CD dài ${q.num(r, 2)} cm.</div>
    <div class="fill-line">Bọ ngựa phải bò ${q.num(6 * r, 2)} cm.</div>`,
    `${r} + ${4 * r} + ${r} = ${6 * r} (cm)`);
},
];
