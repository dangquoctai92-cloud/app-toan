/* ================ BÀI 47: LÀM QUEN VỚI CHỮ SỐ LA MÃ (SGK tập 2, tr.12 – 14) ================
   hoạt động tr.12–13: bài 1 (Mỗi đồng hồ chỉ mấy giờ?), bài 2 (Chọn cặp số và số La Mã thích hợp),
                       bài 3 (a. Đọc các số La Mã · b. Viết các số từ 1 đến 15 bằng chữ số La Mã)
   luyện tập tr.13–14: bài 1 (xếp số La Mã bằng que tính), bài 2 (a. Tìm số La Mã thích hợp trên cầu
                       · b. Sắp xếp các số La Mã), bài 3 (đồng hồ mặt trời – đồng hồ điện tử),
                       bài 4 (đường đi của chú linh dương theo thứ tự I đến XX)
============================================================================================ */

ART.b47Rom = n => {
  const V = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = '', k = n;
  for (let i = 0; i < V.length; i++){
    while (k >= V[i][0]){ s += V[i][1]; k -= V[i][0]; }
  }
  return s;
};
ART.b47Que = n => ART.b47Rom(n).split('').reduce((t, c) => t + (c === 'I' ? 1 : 2), 0);

ART.b47Clock = (h, m) => {
  const rad = d => d * Math.PI / 180;
  const ha = rad((h % 12) * 30 + m * .5 - 90), ma = rad(m * 6 - 90);
  const hx = (50 + 21 * Math.cos(ha)).toFixed(1), hy = (50 + 21 * Math.sin(ha)).toFixed(1);
  const mx = (50 + 33 * Math.cos(ma)).toFixed(1), my = (50 + 33 * Math.sin(ma)).toFixed(1);
  const nums = Array.from({length:12}, (_, i) => {
    const a = rad(i * 30 - 60);
    return `<text x="${(50 + 37 * Math.cos(a)).toFixed(1)}" y="${(50 + 37 * Math.sin(a) + 3.6).toFixed(1)}"
      text-anchor="middle" font-size="9" font-family="Georgia,serif" fill="#5a4a3a">${ART.b47Rom(i + 1)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 100 100" class="b47-clock">
    <circle cx="50" cy="50" r="46" fill="#fdfaf3" stroke="#7a5227" stroke-width="6"/>${nums}
    <line x1="50" y1="50" x2="${hx}" y2="${hy}" stroke="#6a4a2a" stroke-width="4.4" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="${mx}" y2="${my}" stroke="#6a4a2a" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="3.2" fill="#8a5a2a"/></svg>`;
};

ART.b47Beast = k => {
  const C = {ho:'#f0932e', saola:'#8a5a3a', bao:'#e8c489', gautui:'#a9b0b8'};
  const c = C[k] || '#c9a066';
  const marks = k === 'ho'
    ? '<g stroke="#3a2a1a" stroke-width="3" stroke-linecap="round"><path d="M52 42v18M64 38v20M76 40v18M88 44v14"/></g>'
    : k === 'bao'
    ? '<g fill="#7a5230"><circle cx="52" cy="46" r="3"/><circle cx="66" cy="41" r="3"/><circle cx="80" cy="48" r="3"/><circle cx="92" cy="43" r="3"/><circle cx="60" cy="58" r="3"/><circle cx="84" cy="60" r="3"/></g>'
    : '';
  const horns = k === 'saola'
    ? '<g fill="none" stroke="#3a2818" stroke-width="4" stroke-linecap="round"><path d="M108 26L122 4M118 28L134 8"/></g>' : '';
  const ears = k === 'gautui'
    ? `<circle cx="106" cy="22" r="10" fill="#c2c9d0" stroke="#6a727a" stroke-width="2"/>
       <circle cx="130" cy="26" r="10" fill="#c2c9d0" stroke="#6a727a" stroke-width="2"/>` : '';
  return `<svg viewBox="0 0 150 100" class="b47-beast">
    <path d="M40 68v24M56 68v24M88 68v24M102 68v24" stroke="${c}" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M26 44q-18-6-22 8" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="70" cy="50" rx="44" ry="21" fill="${c}" stroke="#5a4020" stroke-width="2.2"/>
    ${marks}${ears}
    <circle cx="116" cy="36" r="17" fill="${c}" stroke="#5a4020" stroke-width="2.2"/>
    ${horns}
    <circle cx="123" cy="32" r="2.6" fill="#2b2b2b"/>
    <path d="M128 42q6 2 6 6" fill="none" stroke="#5a4020" stroke-width="2"/>
  </svg>`;
};

ART.b47Scene = k => {
  if (k === 'song') return `<svg viewBox="0 0 180 100" class="b47-scene">
    <rect width="180" height="100" rx="9" fill="#cfe9f7"/>
    <path d="M0 100L48 26 96 100z" fill="#5a9c4e"/><path d="M74 100L126 18 180 100z" fill="#3f7a3e"/>
    <path d="M84 100q12-48 32-72 10 28 2 72z" fill="#dbe9f2"/></svg>`;
  if (k === 'rung') return `<svg viewBox="0 0 180 100" class="b47-scene">
    <rect width="180" height="100" rx="9" fill="#d8eec9"/>
    <path d="M0 74h180v26H0z" fill="#6fb05a"/>
    ${[16, 46, 76, 106, 136, 164].map((x, i) => `<g><rect x="${x - 3}" y="${34 + i % 2 * 6}" width="6" height="44" fill="#8a6a44"/>
      <ellipse cx="${x}" cy="${32 + i % 2 * 6}" rx="17" ry="20" fill="${i % 2 ? '#4f9440' : '#3f7f36'}"/></g>`).join('')}</svg>`;
  if (k === 'dongco') return `<svg viewBox="0 0 180 100" class="b47-scene">
    <rect width="180" height="100" rx="9" fill="#cfe3f0"/>
    <path d="M0 44q40-18 80-2t100-6v64H0z" fill="#e2c46a"/>
    <path d="M0 68h180v32H0z" fill="#d9b657"/>
    ${[30, 92, 152].map(x => `<g><rect x="${x - 2}" y="46" width="4" height="24" fill="#7a5a34"/>
      <ellipse cx="${x}" cy="46" rx="18" ry="7" fill="#5f8f4a"/></g>`).join('')}</svg>`;
  return `<svg viewBox="0 0 180 100" class="b47-scene">
    <rect width="180" height="100" rx="9" fill="#cfe9f7"/>
    <path d="M0 40L44 12 96 44 140 16 180 44v56H0z" fill="#8fb2c9"/>
    <path d="M0 60q46-14 92 2t88-6v44H0z" fill="#6fa85a"/>
    <g fill="none" stroke="#c9e08a" stroke-width="3"><path d="M8 78q60-14 164-4M8 88q60-14 164-4"/></g></svg>`;
};

ART.b47Sticks = `<svg viewBox="0 0 160 78" class="b47-sticks">
  <rect width="160" height="78" rx="7" fill="#fdf3c4"/>
  <g stroke="#2ba6dd" stroke-width="7" stroke-linecap="round">
    <path d="M28 14v50"/><path d="M62 14L74 64 86 14"/><path d="M110 14l38 50M148 14l-38 50"/></g></svg>`;

ART.b47Aqua = n => {
  const W = 470, gap = W / n;
  let arcs = '';
  for (let i = 0; i < n; i++){
    const cx = gap * i + gap / 2;
    arcs += `<path d="M${(cx - gap * .36).toFixed(1)} 130V96a${(gap * .36).toFixed(1)} 30 0 0 1 ${(gap * .72).toFixed(1)} 0v34z"
      fill="#cfe4f2" stroke="#8fa8bb" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 ${W} 140" class="b47-aqua">
    <rect width="${W}" height="140" rx="8" fill="#d6eefa"/>
    <path d="M0 116h${W}v24H0z" fill="#8fc95a"/>
    <path d="M0 58h${W}v18H0z" fill="#c3ccd4" stroke="#8fa8bb" stroke-width="2"/>
    ${arcs}
    <path d="M0 76h${W}v10H0z" fill="#b6c2cc"/></svg>`;
};

ART.b47Sun = r => {
  const cx = 90, cy = 62, rx = 74, ry = 40;
  const pos = (k, f) => { const a = (90 - 30 * k) * Math.PI / 180;
    return [cx + rx * f * Math.cos(a), cy + ry * f * Math.sin(a)]; };
  const nums = Array.from({length:12}, (_, i) => {
    const p = pos(i + 1, 1.02);
    return `<text x="${p[0].toFixed(1)}" y="${(p[1] + 3.4).toFixed(1)}" text-anchor="middle"
      font-size="9" font-family="Georgia,serif" fill="#6a5a20">${ART.b47Rom(i + 1)}</text>`;
  }).join('');
  const s = pos(r, .74);
  return `<svg viewBox="0 0 180 118" class="b47-sun">
    <ellipse cx="${cx}" cy="${cy}" rx="${rx + 12}" ry="${ry + 10}" fill="#f2d64f" stroke="#c9a41c" stroke-width="2"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#f7edb0" stroke="#c9a41c" stroke-width="1.6"/>
    ${nums}
    <line x1="${cx}" y1="${cy}" x2="${s[0].toFixed(1)}" y2="${s[1].toFixed(1)}"
      stroke="#8a7a2a" stroke-width="3" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="14" stroke="#6a5a2a" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#8a7a2a"/></svg>`;
};

ART.b47Digi = t => `<svg viewBox="0 0 130 56" class="b47-digi">
  <rect x="3" y="4" width="124" height="48" rx="7" fill="#2b2b2b" stroke="#7a7a7a" stroke-width="2"/>
  <text x="65" y="40" text-anchor="middle" font-size="27" font-weight="700"
    font-family="Courier New,monospace" fill="#f6c344">${t}</text></svg>`;

ART.b47Grid = (cells, cols, rows) => {
  const C = 34, W = cols * C, H = rows * C;
  let s = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
    const x = c * C, y = r * C, t = cells[r * cols + c];
    s += `<rect x="${x}" y="${y}" width="${C}" height="${C}" fill="#fff" stroke="#e8a07a" stroke-width="1.5"/>
      <text x="${x + C / 2}" y="${y + C / 2 + 5}" text-anchor="middle"
        font-size="${t.length > 4 ? 10 : 13}" font-family="Georgia,serif" fill="#2b2b2b">${t}</text>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="b47-grid">${s}</svg>`;
};

BANKS.b47 = [

/* ===== tr.12–13 – Hoạt động Bài 1: Mỗi đồng hồ chỉ mấy giờ? ===== */
() => {
  const q = Q(1, 'Mỗi đồng hồ chỉ mấy giờ?');
  const L = ['A', 'B', 'C', 'D'];
  const hs = [];
  for (let g = 0; g < 300 && hs.length < 4; g++){
    const h = R(1, 12);
    if (!hs.includes(h)) hs.push(h);
  }
  while (hs.length < 4) hs.push(hs.length + 1);
  const items = hs.map((h, i) => ({h, m:i < 2 ? 0 : pick([15, 30, 45])}))
    .sort(() => Math.random() - .5);
  return q.done(`<div class="b47-crow">${items.map((x, i) =>
      `<div class="b47-citem"><em>${L[i]}</em>${ART.b47Clock(x.h, x.m)}</div>`).join('')}</div>
    ${items.map((x, i) => x.m === 0
      ? `<div class="bullet">Đồng hồ ${L[i]} chỉ ${q.num(x.h, 2)} giờ.</div>`
      : `<div class="bullet">Đồng hồ ${L[i]} chỉ ${q.num(x.h, 2)} giờ ${q.num(x.m, 2)} phút.</div>`).join('')}
    <div class="hint-line">Mặt đồng hồ ghi số bằng chữ số La Mã: I, II, III, ..., XII.</div>`,
    items.map((x, i) => `${L[i]}: ${x.h} giờ${x.m ? ' ' + x.m + ' phút' : ''}`).join(';  '));
},

/* ===== tr.13 – Hoạt động Bài 2: Chọn cặp số và số La Mã thích hợp ===== */
() => {
  const q = Q(2, 'Chọn cặp số và số La Mã thích hợp.');
  const ANIMAL = [{k:'ho', n:'Hổ'}, {k:'saola', n:'Sao la'}, {k:'bao', n:'Báo hoa mai'}, {k:'gautui', n:'Gấu túi'}];
  const SCENE = ['song', 'rung', 'dongco', 'ruong'];
  const vs = [];
  for (let g = 0; g < 300 && vs.length < 4; g++){
    const v = R(1, 20);
    if (!vs.includes(v)) vs.push(v);
  }
  while (vs.length < 4) vs.push(20 + vs.length);
  const items = ANIMAL.map((a, i) => ({...a, v:vs[i], s:SCENE[i]}));
  const shownRom = items.map(x => ART.b47Rom(x.v)).sort(() => Math.random() - .5);
  const scenes = items.slice().sort(() => Math.random() - .5);

  return q.done(`<div class="b47-mrow">${scenes.map((x, i) =>
      `<div class="b47-mcell sc">${ART.b47Scene(x.s)}
        <span class="b47-badge rom">${shownRom[i]}</span></div>`).join('')}</div>
    <div class="b47-mrow">${items.map(x =>
      `<div class="b47-mcell">${ART.b47Beast(x.k)}<span class="b47-badge">${x.v}</span>
        <div class="fill-line">${x.n}: ${q.pick(ART.b47Rom(x.v), shownRom)}</div></div>`).join('')}</div>`,
    items.map(x => `${x.v} = ${ART.b47Rom(x.v)}`).join(';  '));
},

/* ===== tr.13 – Hoạt động Bài 3: Đọc – viết số La Mã ===== */
() => {
  const q = Q(3, 'a) Đọc các số La Mã sau:');
  const vs = [];
  for (let g = 0; g < 300 && vs.length < 6; g++){
    const v = R(1, 20);
    if (!vs.includes(v)) vs.push(v);
  }
  while (vs.length < 6) vs.push(20 + vs.length);
  const partA = '<div class="eq-list">' + vs.map(v =>
    `<div class="eq"><span class="b47-rom">${ART.b47Rom(v)}</span> là số ${q.num(v, 2)}</div>`).join('') + '</div>';

  const hide = [];
  for (let g = 0; g < 300 && hide.length < 5; g++){
    const i = R(0, 14);
    if (!hide.includes(i)) hide.push(i);
  }
  while (hide.length < 5) hide.push(hide.length);
  const opts = hide.map(i => ART.b47Rom(i + 1)).sort(() => Math.random() - .5);
  const cell = i => hide.includes(i)
    ? q.pick(ART.b47Rom(i + 1), opts)
    : `<span class="b47-rom">${ART.b47Rom(i + 1)}</span>`;
  const tbl = (from, to) => `<div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Số</th>${Array.from({length:to - from + 1}, (_, j) => `<td>${from + j}</td>`).join('')}</tr>
      <tr><th>La Mã</th>${Array.from({length:to - from + 1}, (_, j) => `<td>${cell(from + j - 1)}</td>`).join('')}</tr>
    </table></div>`;

  return q.done(partA +
    `<div class="sub-lbl">b) Viết các số từ 1 đến 15 bằng chữ số La Mã.</div>${tbl(1, 8)}${tbl(9, 15)}`,
    vs.map(v => `${ART.b47Rom(v)} = ${v}`).join(';  '));
},

/* ===== tr.13–14 – Luyện tập Bài 1: Xếp số La Mã bằng que tính ===== */
() => {
  const q = Q(1, 'Dùng que tính có thể xếp thành các số La Mã như hình bên:');
  const k = pick([3, 4, 5]);
  const same = [];
  for (let v = 1; v <= 20; v++) if (ART.b47Que(v) === k) same.push(v);
  const two = same.slice().sort(() => Math.random() - .5).slice(0, 2).sort((a, b) => a - b);
  const other = [];
  for (let g = 0; g < 300 && other.length < 3; g++){
    const v = R(1, 20);
    if (!two.includes(v) && !other.includes(v)) other.push(v);
  }
  while (other.length < 3) other.push(20 + other.length);
  const opts = two.concat(other).map(v => ART.b47Rom(v)).sort(() => Math.random() - .5);

  const cnt = pick([3, 4]);
  const TU = {3:'ba', 4:'bốn'};
  const n9 = pick([4, 6, 8, 9, 11, 12]);

  return q.done(ART.b47Sticks +
    `<div class="sub-lbl">a) Dùng ${k} que tính hãy xếp thành số ${two[0]}, số ${two[1]} bằng chữ số La Mã.</div>
     <div class="fill-line">Số ${two[0]} viết là ${q.pick(ART.b47Rom(two[0]), opts)}</div>
     <div class="fill-line">Số ${two[1]} viết là ${q.pick(ART.b47Rom(two[1]), opts)}</div>
     <div class="sub-lbl">b) Để xếp được ${TU[cnt]} số ${n9} bằng chữ số La Mã thì cần bao nhiêu que tính?</div>
     <div class="fill-line">Cần ${q.num(cnt * ART.b47Que(n9), 2)} que tính.</div>`,
    `Chữ số I xếp bằng 1 que tính, chữ số V và X mỗi chữ số xếp bằng 2 que tính. `
      + `${ART.b47Rom(n9)} cần ${ART.b47Que(n9)} que, ${TU[cnt]} số cần ${cnt} × ${ART.b47Que(n9)} = ${cnt * ART.b47Que(n9)} que.`);
},

/* ===== tr.14 – Luyện tập Bài 2: Tìm số La Mã thích hợp · Sắp xếp ===== */
() => {
  const q = Q(2, 'a) Tìm số La Mã thích hợp.');
  const st = R(6, 13);
  const seq = Array.from({length:7}, (_, i) => st + i);
  const hide = [2, 4, 5];
  const optsA = hide.map(i => ART.b47Rom(seq[i])).sort(() => Math.random() - .5);
  const cards = seq.map((v, i) => `<div class="b47-card">${hide.includes(i)
    ? '?' : ART.b47Rom(v)}</div>`).join('');
  const fills = hide.map(i =>
    `<div class="fill-line">Ô thứ ${i + 1} là ${q.pick(ART.b47Rom(seq[i]), optsA)}</div>`).join('');

  const vs = [];
  for (let g = 0; g < 300 && vs.length < 4; g++){
    const v = R(1, 20);
    if (!vs.includes(v)) vs.push(v);
  }
  while (vs.length < 4) vs.push(20 + vs.length);
  const optsB = vs.map(v => ART.b47Rom(v)).sort(() => Math.random() - .5);
  const up = vs.slice().sort((a, b) => a - b);

  return q.done(ART.b47Aqua(7) + `<div class="b47-cards">${cards}</div>${fills}
    <div class="sub-lbl">b) Sắp xếp các số ${vs.map(v => ART.b47Rom(v)).join(', ')} theo thứ tự từ bé đến lớn.</div>
    ${up.map((v, i) => `<div class="fill-line">${i + 1}. ${q.pick(ART.b47Rom(v), optsB)}</div>`).join('')}`,
    `a) Các số La Mã liên tiếp: ${seq.map(v => ART.b47Rom(v)).join(', ')}.  `
      + `b) ${up.map(v => ART.b47Rom(v)).join(' < ')}`);
},

/* ===== tr.14 – Luyện tập Bài 3: Đồng hồ mặt trời – đồng hồ điện tử ===== */
() => {
  const q = Q(3, 'Chọn đồng hồ điện tử thích hợp với đồng hồ mặt trời.');
  const L1 = ['A', 'B', 'C'], L2 = ['D', 'E', 'G'];
  const sang = [6, 7, 8, 9, 10, 11].sort(() => Math.random() - .5);
  const chieu = [1, 2, 3, 4, 5].sort(() => Math.random() - .5);
  const marks = [chieu[0], sang[0], sang[1]].sort(() => Math.random() - .5);
  const gio = r => r <= 5 ? r + 12 : r;
  const fmt = g => g + ':00';
  const dig = marks.slice().sort(() => Math.random() - .5);

  return q.done(`${speech(`Bóng của kim chỉ vào ${ART.b47Rom(chieu[0])}, lúc đó là ${gio(chieu[0])} giờ.`)}
    <div class="b47-srow">${marks.map((r, i) =>
      `<div class="b47-sitem">${ART.b47Sun(r)}<em>${L1[i]}</em></div>`).join('')}</div>
    <div class="b47-srow">${dig.map((r, i) =>
      `<div class="b47-sitem">${ART.b47Digi(fmt(gio(r)))}<em>${L2[i]}</em></div>`).join('')}</div>
    ${marks.map((r, i) => `<div class="bullet">Đồng hồ ${L1[i]} hợp với đồng hồ
      ${q.pick(L2[dig.indexOf(r)], L2)}</div>`).join('')}`,
    marks.map((r, i) => `${L1[i]}: bóng chỉ ${ART.b47Rom(r)} nên là ${gio(r)} giờ`).join(';  '));
},

/* ===== tr.14 – Luyện tập Bài 4: Đường đi của chú linh dương ===== */
() => {
  const q = Q(4, 'Tìm đường đi cho chú linh dương đến hồ uống nước theo thứ tự các số La Mã từ I đến XX.');
  const cols = 9, rows = 12;
  const moves = [];
  for (let i = 0; i < cols - 1; i++) moves.push(1);
  for (let i = 0; i < rows - 1; i++) moves.push(0);
  moves.sort(() => Math.random() - .5);
  let r = 0, c = 0;
  const path = [0];
  moves.forEach(m => { if (m) c++; else r++; path.push(r * cols + c); });

  const cells = Array.from({length:cols * rows}, () => ART.b47Rom(R(1, 20)));
  path.forEach((idx, i) => { cells[idx] = ART.b47Rom(i + 1); });

  const hide = [];
  for (let g = 0; g < 300 && hide.length < 5; g++){
    const i = R(1, 19);
    if (!hide.includes(i)) hide.push(i);
  }
  while (hide.length < 5) hide.push(hide.length + 1);
  const opts = hide.map(i => ART.b47Rom(i + 1)).sort(() => Math.random() - .5);

  const chain = Array.from({length:20}, (_, i) => `<span class="b47-cn">${hide.includes(i)
    ? q.pick(ART.b47Rom(i + 1), opts) : ART.b47Rom(i + 1)}</span>`).join('');

  return q.done(`<div class="b47-gwrap">${ART.b47Grid(cells, cols, rows)}</div>
    <div class="sub-lbl">Nêu các số La Mã còn thiếu trên đường đi:</div>
    <div class="b47-chain">${chain}</div>`,
    'Thứ tự các số La Mã từ I đến XX: I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII, XIII, XIV, XV, XVI, XVII, XVIII, XIX, XX.');
},
];
