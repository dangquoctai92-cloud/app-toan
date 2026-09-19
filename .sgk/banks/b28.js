/* ==================== BÀI 28: BÀI TOÁN GIẢI BẰNG HAI BƯỚC TÍNH (SGK tr.81, 82) ====================
   hoạt động tr.82 : bài 1 (can nước mắm – gấp một số lần), bài 2 (Mai – Nam gấp thuyền)
   luyện tập tr.82 : bài 1 (cửa hàng bán máy tính), bài 2 (đường gấp khúc ABC),
                     bài 3 (nêu bài toán theo tóm tắt – bao ngô, bao gạo)
================================================================================================= */

/* sơ đồ đoạn thẳng: hàng trên 1 đoạn, hàng dưới gấp "times" lần, ngoặc chung bên phải */
ART.b28Times = (lab1, lab2, topLab, times, totLab) => {
  const X = 168, U = 62, y1 = 42, y2 = 96;
  const x1 = X + U, x2 = X + U * times;
  const bx = Math.max(x1, x2) + 16;
  const yT = y1 - 14, yB = y2 + 14, yc = (yT + yB) / 2, seg = (yB - yT) / 2 - 18;
  let ticks = '';
  for (let i = 1; i < times; i++) ticks += `M${X + U * i} ${y2 - 8}v16`;
  return `<svg viewBox="0 0 ${bx + 96} 124" class="b28-bar">
    <text x="4" y="${y1 + 6}" font-size="15">${lab1}</text>
    <path d="M${X} ${y1}H${x1}M${X} ${y1 - 9}v18M${x1} ${y1 - 9}v18" fill="none" stroke="#222" stroke-width="2.4"/>
    <text x="${X + U / 2}" y="${y1 - 14}" text-anchor="middle" font-size="14">${topLab}</text>
    <text x="4" y="${y2 + 6}" font-size="15">${lab2}</text>
    <path d="M${X} ${y2}H${x2}M${X} ${y2 - 9}v18M${x2} ${y2 - 9}v18${ticks}" fill="none" stroke="#222" stroke-width="2.4"/>
    <path d="M${bx} ${yT}q9 0 9 9v${seg}q0 9 9 9q-9 0-9 9v${seg}q0 9-9 9" fill="none" stroke="#222" stroke-width="1.8"/>
    <text x="${bx + 26}" y="${yc + 5}" font-size="14">${totLab}</text>
  </svg>`;
};

/* sơ đồ đoạn thẳng: hàng dưới nhiều hơn (more) hoặc ít hơn hàng trên một đoạn */
ART.b28Bar = (lab1, lab2, topLab, dLab, more, totLab) => {
  const X = 168, W = 186, E = 72, y1 = 42, y2 = 96;
  const x1 = X + W, x2 = more ? X + W + E : X + W - E;
  const dA = Math.min(x1, x2), dB = Math.max(x1, x2), ym = (y1 + y2) / 2;
  const bx = dB + 16;
  const yT = y1 - 14, yB = y2 + 14, yc = (yT + yB) / 2, seg = (yB - yT) / 2 - 18;
  return `<svg viewBox="0 0 ${bx + 96} 124" class="b28-bar">
    <text x="4" y="${y1 + 6}" font-size="15">${lab1}</text>
    <path d="M${X} ${y1}H${x1}M${X} ${y1 - 9}v18M${x1} ${y1 - 9}v18" fill="none" stroke="#222" stroke-width="2.4"/>
    <text x="${X + W / 2}" y="${y1 - 14}" text-anchor="middle" font-size="14">${topLab}</text>
    <text x="4" y="${y2 + 6}" font-size="15">${lab2}</text>
    <path d="M${X} ${y2}H${x2}M${X} ${y2 - 9}v18M${x2} ${y2 - 9}v18" fill="none" stroke="#222" stroke-width="2.4"/>
    <path d="M${dA} ${y1 - 6}V${y2 + 6}" fill="none" stroke="#666" stroke-width="1.3" stroke-dasharray="5 4"/>
    <path d="M${dA} ${ym}H${dB}M${dA} ${ym - 6}v12M${dB} ${ym - 6}v12" fill="none" stroke="#222" stroke-width="1.8"/>
    <text x="${(dA + dB) / 2}" y="${ym - 10}" text-anchor="middle" font-size="14">${dLab}</text>
    <path d="M${bx} ${yT}q9 0 9 9v${seg}q0 9 9 9q-9 0-9 9v${seg}q0 9-9 9" fill="none" stroke="#222" stroke-width="1.8"/>
    <text x="${bx + 26}" y="${yc + 5}" font-size="14">${totLab}</text>
  </svg>`;
};

/* đường gấp khúc ABC, ghi số đo đoạn AB, đoạn BC để dấu "?" */
ART.b28Path = ab => `<svg viewBox="-16 -16 400 152" class="b28-path">
  <path d="M20 16L124 104H352" fill="none" stroke="#2b2b2b" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="20" cy="16" r="4"/><circle cx="124" cy="104" r="4"/><circle cx="352" cy="104" r="4"/>
  <text x="6" y="8" font-size="17" font-weight="700">A</text>
  <text x="116" y="126" font-size="17" font-weight="700">B</text>
  <text x="346" y="126" font-size="17" font-weight="700">C</text>
  <text x="30" y="72" font-size="15">${ab} cm</text>
  <text x="238" y="94" text-anchor="middle" font-size="15">? cm</text>
</svg>`;

BANKS.b28 = [

/* ===== tr.82 – Hoạt động Bài 1: Số ? (hai can nước mắm, can hai gấp n lần can một) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const a = R(3, 9), n = R(2, 4), b = a * n, t = a + b;
  return q.done(`<p class="wordq">Can thứ nhất đựng ${a} <i>l</i> nước mắm, can thứ hai đựng số lít nước mắm
      gấp ${n} lần can thứ nhất. Hỏi cả hai can đựng bao nhiêu lít nước mắm?</p>
    <div class="b28-tt">Tóm tắt</div>
    ${ART.b28Times('Can thứ nhất:', 'Can thứ hai:', a + ' l', n, '? l')}
    <div class="b28-sol"><div class="bg-h">Bài giải</div>
      <div>Số lít nước mắm ở can thứ hai là:</div>
      <div class="b28-eq">${a} × ${q.num(n, 1)} = ${q.num(b)} (<i>l</i>)</div>
      <div>Số lít nước mắm cả hai can là:</div>
      <div class="b28-eq">${q.num(a)} + ${q.num(b)} = ${q.num(t)} (<i>l</i>)</div>
      <div class="b28-eq">Đáp số: ${q.num(t)} <i>l</i> nước mắm.</div>
    </div>`,
    `${a} × ${n} = ${b} (l);  ${a} + ${b} = ${t} (l)`);
},

/* ===== tr.82 – Hoạt động Bài 2: Mai gấp thuyền, Nam gấp ít hơn Mai ===== */
() => {
  const m = R(9, 24), k = R(2, 6), nam = m - k, t = m + nam;
  const q = Q(2, `Mai gấp được ${m} cái thuyền, Nam gấp được ít hơn Mai ${k} cái thuyền.
    Hỏi cả hai bạn gấp được bao nhiêu cái thuyền?`);
  return q.done(`<div class="b28-tt">Tóm tắt</div>
    ${ART.b28Bar('Mai:', 'Nam:', m + ' cái', k + ' cái', false, '? cái')}
    <div class="b28-sol"><div class="bg-h">Bài giải</div>
      <div>Số cái thuyền Nam gấp được là:</div>
      <div class="b28-eq">${m} − ${q.num(k)} = ${q.num(nam)} (cái)</div>
      <div>Số cái thuyền cả hai bạn gấp được là:</div>
      <div class="b28-eq">${q.num(m)} + ${q.num(nam)} = ${q.num(t)} (cái)</div>
      <div class="b28-eq">Đáp số: ${q.num(t)} cái thuyền.</div>
    </div>`,
    `${m} − ${k} = ${nam} (cái);  ${m} + ${nam} = ${t} (cái)`);
},

/* ===== tr.82 – Luyện tập Bài 1: cửa hàng bán máy tính buổi sáng, buổi chiều ===== */
() => {
  const s = R(12, 30), k = R(3, 9), c = s - k, t = s + c;
  const q = Q(1, `Buổi sáng cửa hàng bán được ${s} máy tính, buổi chiều cửa hàng bán được ít hơn
    buổi sáng ${k} máy tính. Hỏi cả hai buổi cửa hàng bán được bao nhiêu máy tính?`);
  return q.done(`<div class="b28-tt">Tóm tắt</div>
    ${ART.b28Bar('Buổi sáng:', 'Buổi chiều:', s + ' máy', k + ' máy', false, '? máy')}
    <div class="b28-sol"><div class="bg-h">Bài giải</div>
      <div>Số máy tính buổi chiều cửa hàng bán được là:</div>
      <div class="b28-eq">${s} − ${q.num(k)} = ${q.num(c)} (máy tính)</div>
      <div>Số máy tính cả hai buổi cửa hàng bán được là:</div>
      <div class="b28-eq">${q.num(s)} + ${q.num(c)} = ${q.num(t)} (máy tính)</div>
      <div class="b28-eq">Đáp số: ${q.num(t)} máy tính.</div>
    </div>`,
    `${s} − ${k} = ${c} (máy tính);  ${s} + ${c} = ${t} (máy tính)`);
},

/* ===== tr.82 – Luyện tập Bài 2: đường gấp khúc ABC, BC gấp n lần AB ===== */
() => {
  const ab = R(5, 15), n = R(2, 4), bc = ab * n, t = ab + bc;
  const q = Q(2, `Đường gấp khúc ABC có AB = ${ab} cm, đoạn BC dài gấp ${n} lần đoạn AB.
    Hỏi đường gấp khúc ABC dài bao nhiêu xăng-ti-mét?`);
  return q.done(ART.b28Path(ab) +
    `<div class="b28-sol"><div class="bg-h">Bài giải</div>
      <div>Độ dài đoạn BC là:</div>
      <div class="b28-eq">${ab} × ${q.num(n, 1)} = ${q.num(bc)} (cm)</div>
      <div>Độ dài đường gấp khúc ABC là:</div>
      <div class="b28-eq">${q.num(ab)} + ${q.num(bc)} = ${q.num(t)} (cm)</div>
      <div class="b28-eq">Đáp số: ${q.num(t)} cm.</div>
    </div>`,
    `${ab} × ${n} = ${bc} (cm);  ${ab} + ${bc} = ${t} (cm)`);
},

/* ===== tr.82 – Luyện tập Bài 3: nêu bài toán theo tóm tắt rồi giải (bao ngô, bao gạo) ===== */
() => {
  const q = Q(3, 'Nêu bài toán theo tóm tắt sau rồi giải bài toán đó.');
  const ngo = R(20, 60), them = R(5, 20), gao = ngo + them, t = ngo + gao;
  return q.done(`<div class="b28-tt">Tóm tắt</div>
    ${ART.b28Bar('Bao ngô:', 'Bao gạo:', ngo + ' kg', them + ' kg', true, '? kg')}
    <div class="hint-line">Bao ngô cân nặng ${ngo} kg, bao gạo cân nặng hơn bao ngô ${them} kg.
      Hỏi cả hai bao cân nặng bao nhiêu ki-lô-gam?</div>
    <div class="b28-sol"><div class="bg-h">Bài giải</div>
      <div>Bao gạo cân nặng là:</div>
      <div class="b28-eq">${ngo} + ${q.num(them)} = ${q.num(gao)} (kg)</div>
      <div>Cả hai bao cân nặng là:</div>
      <div class="b28-eq">${q.num(ngo)} + ${q.num(gao)} = ${q.num(t)} (kg)</div>
      <div class="b28-eq">Đáp số: ${q.num(t)} kg.</div>
    </div>`,
    `${ngo} + ${them} = ${gao} (kg);  ${ngo} + ${gao} = ${t} (kg)`);
},
];
