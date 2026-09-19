/* ========= BÀI 16: ĐIỂM Ở GIỮA, TRUNG ĐIỂM CỦA ĐOẠN THẲNG (SGK trang 49, 50, 51) =========
   · Hoạt động tr.50 : bài 1 (Đ, S ?), bài 2 (ba điểm thẳng hàng – điểm ở giữa – trung điểm),
                       bài 3 (nêu tên trung điểm của hai đoạn thẳng)
   · Luyện tập  tr.51: bài 1 (quan sát hình vẽ trên thước), bài 2 (xác định trung điểm trên lưới ô),
                       bài 3 (cào cào nhảy), bài 4 (cắt đoạn dây không dùng thước)
========================================================================================= */

ART.b16Grid = (cols, rows, C, inner) => {
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * C} 0V${rows * C}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * C}H${cols * C}`;
  return `<svg viewBox="-32 -36 ${cols * C + 76} ${rows * C + 90}" class="b16-fig">
    <path d="${g}" fill="none" stroke="#9fd0ef" stroke-width="1.2"/>${inner}</svg>`;
};

ART.b16Dot = (x, y, t, dx, dy) => {
  const X = +x, Y = +y;
  return `<circle cx="${X.toFixed(1)}" cy="${Y.toFixed(1)}" r="4.6"/>
    <text x="${(X + dx).toFixed(1)}" y="${(Y + dy).toFixed(1)}" font-size="17" font-weight="700">${t}</text>`;
};

/* Bài 1 tr.50: A—M—B thẳng rồi gấp khúc B—N—C */
ART.b16Bent = (P, u, v, p, r) => {
  const S = 15, ax = 24, ay = 124;
  const mx = ax + u * S, bx = ax + (u + v) * S;
  const ca = Math.cos(-34 * Math.PI / 180), sa = Math.sin(-34 * Math.PI / 180);
  const nx = bx + p * S * ca, ny = ay + p * S * sa;
  const cx = bx + (p + r) * S * ca, cy = ay + (p + r) * S * sa;
  return `<svg viewBox="0 0 ${(cx + 44).toFixed(0)} 168" class="b16-fig wide">
    <g stroke="#2b2b2b" stroke-width="2.8" fill="none">
      <path d="M${ax} ${ay}H${bx}"/><path d="M${bx} ${ay}L${cx.toFixed(1)} ${cy.toFixed(1)}"/></g>
    <g fill="#2b2b2b" stroke="none">
      ${ART.b16Dot(ax, ay, P.A, -6, 26)}${ART.b16Dot(mx, ay, P.M, -6, 26)}${ART.b16Dot(bx, ay, P.B, -6, 26)}
      ${ART.b16Dot(nx, ny, P.N, -6, 24)}${ART.b16Dot(cx, cy, P.C, 9, 5)}</g>
    <g font-size="15" fill="#2b2b2b" text-anchor="middle">
      <text x="${((ax + mx) / 2).toFixed(1)}" y="${ay - 12}">${u} cm</text>
      <text x="${((mx + bx) / 2).toFixed(1)}" y="${ay - 12}">${v} cm</text>
      <text x="${((bx + nx) / 2 - 14).toFixed(1)}" y="${((ay + ny) / 2 - 9).toFixed(1)}">${p} cm</text>
      <text x="${((nx + cx) / 2 - 14).toFixed(1)}" y="${((ny + cy) / 2 - 9).toFixed(1)}">${r} cm</text>
    </g></svg>`;
};

/* Bài 1 tr.51: thước kẻ có vạch xăng-ti-mét */
ART.b16Ruler = (max, pts) => {
  const S = 30, x0 = 26, y = 44;
  let t = '';
  for (let i = 0; i <= max; i++){
    const x = x0 + i * S;
    t += `<path d="M${x} 72v${i % 5 === 0 ? 15 : 9}" stroke="#8a4a6a" stroke-width="1.6"/>
      <text x="${x}" y="106" text-anchor="middle" font-size="14" fill="#5a3048">${i}</text>`;
  }
  const dots = pts.map(p => `<circle cx="${x0 + p.v * S}" cy="${y}" r="5"/>
    <text x="${x0 + p.v * S}" y="${y - 14}" text-anchor="middle" font-size="17" font-weight="700">${p.t}</text>`).join('');
  return `<svg viewBox="0 0 ${x0 * 2 + max * S} 118" class="b16-fig wide">
    <rect x="${x0 - 16}" y="68" width="${max * S + 32}" height="46" rx="10" fill="#ffc7dd"/>
    <path d="M${x0} ${y}H${x0 + max * S}" stroke="#2b2b2b" stroke-width="2.8"/>
    <g fill="#2b2b2b" stroke="none">${dots}</g>${t}</svg>`;
};

/* Bài 3 tr.51: cây tre có n đốt, cào cào đã nhảy j bước */
ART.b16Bamboo = (n, j, LA, LB) => {
  const S = 44, x0 = 30, y = 64, W = x0 * 2 + n * S;
  let seg = '';
  for (let i = 0; i < n; i++)
    seg += `<rect x="${x0 + i * S + 2}" y="${y + 4}" width="${S - 4}" height="30" rx="5"
      fill="#8fd44f" stroke="#4d8a1f" stroke-width="2"/>`;
  let hop = '';
  for (let i = 0; i < j; i++)
    hop += `<path d="M${x0 + i * S} ${y}q${S / 2} -32 ${S} 0" fill="none" stroke="#2b2b2b" stroke-width="2"/>`;
  const gx = x0 + j * S;
  return `<svg viewBox="0 0 ${W} 116" class="b16-fig wide">
    ${seg}<path d="M${x0} ${y}H${x0 + n * S}" stroke="#c0392b" stroke-width="3"/>${hop}
    <g fill="#2b2b2b" stroke="none">
      <text x="${x0 - 22}" y="${y - 4}" font-size="17" font-weight="700">${LA}</text>
      <text x="${x0 + n * S + 6}" y="${y - 4}" font-size="17" font-weight="700">${LB}</text></g>
    <g transform="translate(${gx - 16},${y - 32})">
      <ellipse cx="16" cy="18" rx="15" ry="6" fill="#7dc95c" stroke="#3f7a2c" stroke-width="1.6"/>
      <circle cx="29" cy="13" r="6" fill="#8fd44f" stroke="#3f7a2c" stroke-width="1.6"/>
      <circle cx="31" cy="12" r="2" fill="#1e1e1e"/>
      <path d="M33 9l8-7M34 11l9-4" stroke="#3f7a2c" stroke-width="1.6" stroke-linecap="round" fill="none"/>
      <path d="M14 22l-6 10M20 22l4 10" stroke="#3f7a2c" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M4 14q10-8 20-2" fill="none" stroke="#4d8a1f" stroke-width="2"/></g></svg>`;
};

/* Bài 4 tr.51: đoạn dây dài L cm */
ART.b16Rope = L => `<svg viewBox="0 0 380 76" class="b16-fig">
  <path d="M28 42h324" stroke="#c98a3a" stroke-width="9" stroke-linecap="round"/>
  <circle cx="28" cy="42" r="5" fill="#7a4a12"/><circle cx="352" cy="42" r="5" fill="#7a4a12"/>
  <text x="190" y="24" text-anchor="middle" font-size="16" font-weight="700" fill="#2b2b2b">${L} cm</text>
  <g stroke="#8a8a9a" stroke-width="1.6" fill="none"><path d="M28 62h324"/><path d="M28 56v12M352 56v12"/></g></svg>`;

BANKS.b16 = [

/* ===== Hoạt động tr.50 – Bài 1: Đ, S ? ===== */
() => {
  const q = Q(1, '<span class="tag">Đ, S</span> ?');
  const ls = ['A', 'B', 'C', 'M', 'N', 'P', 'Q', 'H', 'K'].sort(() => Math.random() - .5);
  const P = {A:ls[0], M:ls[1], B:ls[2], N:ls[3], C:ls[4]};
  const same1 = Math.random() < .6, same2 = Math.random() < .5;
  const u = R(2, 5), v = same1 ? u : pick([2, 3, 4, 5].filter(x => x !== u));
  const p = R(2, 4), r = same2 ? p : pick([2, 3, 4].filter(x => x !== p));
  const html = ART.b16Bent(P, u, v, p, r) + `<div class="b16-ds">
      a) ${P.M} là trung điểm của đoạn thẳng ${P.A}${P.B}.
        <span class="wpick">${q.pick(same1 ? 'Đ' : 'S', ['Đ', 'S'])}</span><br>
      b) ${P.N} là điểm ở giữa hai điểm ${P.B} và ${P.C}.
        <span class="wpick">${q.pick('Đ', ['Đ', 'S'])}</span><br>
      c) ${P.N} là trung điểm của đoạn thẳng ${P.B}${P.C}.
        <span class="wpick">${q.pick(same2 ? 'Đ' : 'S', ['Đ', 'S'])}</span><br>
      d) ${P.B} là điểm ở giữa hai điểm ${P.M} và ${P.N}.
        <span class="wpick">${q.pick('S', ['Đ', 'S'])}</span></div>`;
  return q.done(html,
    `${P.A}${P.M} = ${u} cm, ${P.M}${P.B} = ${v} cm; ${P.B}${P.N} = ${p} cm, ${P.N}${P.C} = ${r} cm. `
    + `Ba điểm ${P.M}, ${P.B}, ${P.N} không thẳng hàng nên câu d) sai.`);
},

/* ===== Hoạt động tr.50 – Bài 2: ba điểm thẳng hàng · điểm ở giữa · trung điểm ===== */
() => {
  const ls = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'K', 'M', 'N', 'P', 'Q'].sort(() => Math.random() - .5);
  const P = {A:ls[0], H:ls[1], B:ls[2], C:ls[3], K:ls[4], D:ls[5], M:ls[6]};
  const q = Q(2, 'Trong hình bên:');
  const C = 34, cols = 10, rows = 9;
  const xL = 2, xR = 8, yMid = 4, half = (xR - xL) / 2;
  const yA = R(0, 2), yB = R(7, 9), yC = R(0, 2), yD = R(7, 9);
  const px = c => c * C, py = rr => rr * C;
  const inner = `<g stroke="#2b2b2b" stroke-width="2.8" fill="none">
      <path d="M${px(xL)} ${py(yA)}V${py(yB)}"/><path d="M${px(xR)} ${py(yC)}V${py(yD)}"/>
      <path d="M${px(xL)} ${py(yMid)}H${px(xR)}"/></g>
    <g fill="#2b2b2b" stroke="none">
      ${ART.b16Dot(px(xL), py(yA), P.A, -24, 2)}${ART.b16Dot(px(xL), py(yMid), P.H, -24, 24)}
      ${ART.b16Dot(px(xL), py(yB), P.B, -24, 20)}${ART.b16Dot(px(xR), py(yC), P.C, 10, -8)}
      ${ART.b16Dot(px(xR), py(yMid), P.K, 10, 24)}${ART.b16Dot(px(xR), py(yD), P.D, 10, 22)}
      ${ART.b16Dot(px(xL + half), py(yMid), P.M, -6, 26)}</g>`;
  const t = (...k) => k.map(x => P[x]).join('');
  const ok = [t('A', 'H', 'B'), t('H', 'M', 'K'), t('C', 'K', 'D')];
  const bad = [t('A', 'M', 'K'), t('B', 'M', 'D'), t('A', 'H', 'C'), t('C', 'M', 'D')];
  const opts = ok.concat(bad).sort(() => Math.random() - .5);
  const pairs = [`${P.A} và ${P.B}`, `${P.C} và ${P.D}`, `${P.M} và ${P.K}`, `${P.A} và ${P.C}`]
    .sort(() => Math.random() - .5);
  const segs = [t('H', 'K'), t('A', 'B'), t('C', 'D'), t('H', 'M')].sort(() => Math.random() - .5);
  const html = ART.b16Grid(cols, rows, C, inner) +
    `<div class="fill-line">a) Tìm ba điểm thẳng hàng.
       <span class="wpick">${q.pick([...ok].sort().join(','), opts)}</span></div>
     <div class="fill-line">b) Điểm ${P.H} ở giữa hai điểm nào?
       <span class="wpick">${q.pick(`${P.A} và ${P.B}`, pairs)}</span></div>
     <div class="fill-line">c) Điểm ${P.M} là trung điểm của đoạn thẳng nào?
       <span class="wpick">${q.pick(t('H', 'K'), segs)}</span></div>`;
  return q.done(html,
    `Ba điểm thẳng hàng: ${ok.join(' · ')}. Điểm ${P.M} cách đều ${P.H} và ${P.K} nên là trung điểm của ${t('H', 'K')}.`);
},

/* ===== Hoạt động tr.50 – Bài 3: nêu tên trung điểm của các đoạn thẳng ===== */
() => {
  const ls = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'K', 'M', 'N', 'P', 'Q'].sort(() => Math.random() - .5);
  const P = {A:ls[0], B:ls[1], C:ls[2], D:ls[3], G:ls[4], H:ls[5]};
  const q = Q(3, `Nêu tên trung điểm của các đoạn thẳng ${P.A}${P.C}, ${P.B}${P.D} trong hình vẽ.`);
  const C = 34, cols = 9, rows = 8;
  const xA = 1, xC = 7, yMid = 4, xG = 3, xH = (xA + xC) / 2;
  const dy = R(2, 3);
  const px = c => c * C, py = r => r * C;
  const inner = `<g stroke="#2b2b2b" stroke-width="2.6" fill="none">
      <path d="M${px(xA)} ${py(yMid)}H${px(xC)}"/><path d="M${px(xG)} ${py(yMid - dy)}V${py(yMid + dy)}"/>
      <path d="M${px(xA)} ${py(yMid)}L${px(xG)} ${py(yMid - dy)}L${px(xC)} ${py(yMid)}L${px(xG)} ${py(yMid + dy)}Z"/></g>
    <g fill="#2b2b2b" stroke="none">
      ${ART.b16Dot(px(xA), py(yMid), P.A, -22, 24)}${ART.b16Dot(px(xC), py(yMid), P.C, 10, 24)}
      ${ART.b16Dot(px(xG), py(yMid - dy), P.B, -6, -10)}${ART.b16Dot(px(xG), py(yMid + dy), P.D, -6, 26)}
      ${ART.b16Dot(px(xG), py(yMid), P.G, -22, 26)}${ART.b16Dot(px(xH), py(yMid), P.H, -6, 26)}</g>`;
  const opts = [P.A, P.B, P.C, P.D, P.G, P.H].sort();
  const html = ART.b16Grid(cols, rows, C, inner) +
    `<div class="fill-line">Trung điểm của đoạn thẳng ${P.A}${P.C} là điểm
       <span class="wpick">${q.pick(P.H, opts)}</span></div>
     <div class="fill-line">Trung điểm của đoạn thẳng ${P.B}${P.D} là điểm
       <span class="wpick">${q.pick(P.G, opts)}</span></div>`;
  return q.done(html,
    `${P.A}${P.H} = ${P.H}${P.C} nên ${P.H} là trung điểm của ${P.A}${P.C}; `
    + `${P.B}${P.G} = ${P.G}${P.D} nên ${P.G} là trung điểm của ${P.B}${P.D}.`);
},

/* ===== Luyện tập tr.51 – Bài 1: quan sát hình vẽ rồi trả lời câu hỏi ===== */
() => {
  const ls = ['A', 'B', 'C', 'D', 'M', 'N', 'P', 'Q'].sort(() => Math.random() - .5);
  const P = {A:ls[0], M:ls[1], B:ls[2], C:ls[3]};
  const q = Q(1, 'Quan sát hình vẽ rồi trả lời câu hỏi.');
  const b = 2 * R(2, 3);                                  // 4 hoặc 6
  const okM = Math.random() < .6;
  const m = okM ? b / 2 : b / 2 + pick([-1, 1]);
  const okB = Math.random() < .4;
  const c = okB ? 2 * b : 2 * b + pick([-2, -1, 1, 2]);
  const pts = [{v:0, t:P.A}, {v:m, t:P.M}, {v:b, t:P.B}, {v:c, t:P.C}];
  const html = ART.b16Ruler(15, pts) +
    `<div class="fill-line">a) Điểm ${P.M} có là trung điểm của đoạn thẳng ${P.A}${P.B} hay không?
       <span class="wpick">${q.pick(okM ? 'Có' : 'Không', ['Có', 'Không'])}</span></div>
     <div class="fill-line">b) Điểm ${P.B} có là trung điểm của đoạn thẳng ${P.A}${P.C} hay không?
       <span class="wpick">${q.pick(okB ? 'Có' : 'Không', ['Có', 'Không'])}</span></div>`;
  return q.done(html,
    `${P.A}${P.M} = ${m} cm, ${P.M}${P.B} = ${b - m} cm; ${P.A}${P.B} = ${b} cm, ${P.B}${P.C} = ${c - b} cm.`);
},

/* ===== Luyện tập tr.51 – Bài 2: xác định trung điểm trên lưới ô vuông ===== */
() => {
  const ls = ['A', 'B', 'D', 'E', 'G', 'H', 'I', 'K', 'M', 'N', 'P', 'Q'].sort(() => Math.random() - .5);
  const P = {M:ls[0], I:ls[1], N:ls[2], K:ls[3], E:ls[4], V:ls[5]};
  const q = Q(2, `Xác định trung điểm của đoạn thẳng ${P.M}${P.N} và đoạn thẳng ${P.N}${P.V}.`);
  const C = 34, hv = R(1, 2), hw = R(2, 4);
  const cols = 2 * hw + 3, rows = 2 * hv + 2;
  const x0 = 1, yTop = 1, yBot = yTop + 2 * hv;
  const extra = R(hw + 1, 2 * hw - 1);                    // điểm phụ nằm giữa trung điểm và đầu mút
  const px = c => c * C, py = r => r * C;
  const inner = `<g stroke="#2b2b2b" stroke-width="2.8" fill="none">
      <path d="M${px(x0)} ${py(yTop)}V${py(yBot)}"/><path d="M${px(x0)} ${py(yBot)}H${px(x0 + 2 * hw)}"/></g>
    <g fill="#2b2b2b" stroke="none">
      ${ART.b16Dot(px(x0), py(yTop), P.M, -24, -8)}${ART.b16Dot(px(x0), py(yTop + hv), P.I, -24, 6)}
      ${ART.b16Dot(px(x0), py(yBot), P.N, -24, 26)}${ART.b16Dot(px(x0 + hw), py(yBot), P.K, -6, 26)}
      ${ART.b16Dot(px(x0 + extra), py(yBot), P.E, -6, 26)}${ART.b16Dot(px(x0 + 2 * hw), py(yBot), P.V, 8, 26)}</g>`;
  const opts = [P.M, P.I, P.N, P.K, P.E, P.V].sort();
  const html = ART.b16Grid(cols, rows, C, inner) +
    `<div class="fill-line">Trung điểm của đoạn thẳng ${P.M}${P.N} là điểm
       <span class="wpick">${q.pick(P.I, opts)}</span></div>
     <div class="fill-line">Trung điểm của đoạn thẳng ${P.N}${P.V} là điểm
       <span class="wpick">${q.pick(P.K, opts)}</span></div>`;
  return q.done(html,
    `${P.M}${P.I} = ${P.I}${P.N} = ${hv} ô; ${P.N}${P.K} = ${P.K}${P.V} = ${hw} ô.`);
},

/* ===== Luyện tập tr.51 – Bài 3: cào cào nhảy đến trung điểm ===== */
() => {
  const q = Q(3, 'Quan sát tranh rồi trả lời.');
  const ls = ['A', 'B', 'C', 'D', 'M', 'N', 'P', 'Q'].sort(() => Math.random() - .5);
  const LA = ls[0], LB = ls[1];
  const n = pick([6, 8, 10, 12, 14]), j = R(1, n / 2 - 1);
  return q.done(`<p class="wordq">Cào cào cần nhảy thêm mấy bước để đến trung điểm của đoạn thẳng ${LA}${LB}?
      (Mỗi bước cào cào nhảy qua một đốt tre.)</p>
    ${ART.b16Bamboo(n, j, LA, LB)}
    <div class="fill-line">Đoạn thẳng ${LA}${LB} dài ${n} đốt tre nên trung điểm của ${LA}${LB}
      cách ${LA} ${q.num(n / 2, 2)} đốt tre.</div>
    <div class="fill-line">Cào cào đã nhảy ${j} bước nên cần nhảy thêm ${q.num(n / 2 - j, 2)} bước nữa.</div>`,
    `${n} : 2 = ${n / 2};  ${n / 2} − ${j} = ${n / 2 - j} (bước)`);
},

/* ===== Luyện tập tr.51 – Bài 4: cắt đoạn dây mà không dùng thước ===== */
() => {
  const q = Q(4, '');
  const L = 2 * R(5, 25);
  return q.done(`<p class="wordq">Việt có một đoạn dây dài ${L} cm. Nếu Việt không dùng thước có vạch chia
      xăng-ti-mét thì bạn ấy làm như thế nào để cắt được một đoạn dây có độ dài ${L / 2} cm từ đoạn dây ban đầu?</p>
    ${ART.b16Rope(L)}
    <div class="bullet">Gấp đôi đoạn dây sao cho hai đầu dây trùng nhau, nếp gấp chính là trung điểm của đoạn dây.</div>
    <div class="fill-line">Cắt ở nếp gấp, Việt được hai đoạn dây bằng nhau, mỗi đoạn dài ${q.num(L / 2, 2)} cm.</div>`,
    `${L} : 2 = ${L / 2} (cm)`);
},
];
