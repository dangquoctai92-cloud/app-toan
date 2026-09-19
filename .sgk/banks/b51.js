/* ==================== BÀI 51: DIỆN TÍCH CỦA MỘT HÌNH. XĂNG-TI-MÉT VUÔNG
   (SGK tập 2, tr.26, 27, 28, 29)
   hoạt động tr.27 : bài 1 (so sánh diện tích hai hình tam giác), bài 2 (hình con vật nào lớn hơn),
                     bài 3 (so sánh diện tích hình A với hình B)
   hoạt động tr.29 : bài 1 (bảng đọc – viết xăng-ti-mét vuông), bài 2 (đếm ô vuông 1 cm2)
   luyện tập tr.29 : bài 1 (tính theo mẫu với đơn vị cm2), bài 2 (hai cánh diều)
================================================================================================= */

ART.b51Read = n => {
  const D = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const two = (c, d, force) => {
    if (c === 0) return d === 0 ? '' : (force ? 'linh ' : '') + D[d];
    const s = c === 1 ? 'mười' : D[c] + ' mươi';
    if (d === 0) return s;
    if (d === 1) return s + (c === 1 ? ' một' : ' mốt');
    if (d === 4) return s + (c === 1 ? ' bốn' : ' tư');
    if (d === 5) return s + ' lăm';
    return s + ' ' + D[d];
  };
  const three = (t, c, d, force) => {
    if (t === 0 && !force) return two(c, d, false);
    const r = two(c, d, true);
    return r ? D[t] + ' trăm ' + r : D[t] + ' trăm';
  };
  if (n === 10000) return 'mười nghìn';
  if (n < 100) return two(Math.floor(n / 10), n % 10, false);
  if (n < 1000) return three(Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10, false);
  const ng = Math.floor(n / 1000), r = n % 1000;
  const s = D[ng] + ' nghìn';
  return r === 0 ? s : s + ' ' + three(Math.floor(r / 100), Math.floor(r / 10) % 10, r % 10, true);
};

ART.b51Cap = s => s.charAt(0).toUpperCase() + s.slice(1);
ART.spNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* hai cách đọc nhiễu, luôn khác cách đọc đúng */
ART.b51Alt = n => {
  const right = ART.b51Read(n), out = [];
  const push = v => {
    if (v < 10 || v > 10000) return;
    const r = ART.b51Read(v);
    if (r !== right && !out.includes(r)) out.push(r);
  };
  [n + 1, n - 1, n + 10, n - 10, n + 100, n - 100, n + 4, n - 4].forEach(push);
  for (let g = 0; g < 60 && out.length < 2; g++) push(R(11, 9999));
  return out;
};

ART.b51ReadOpts = n => {
  const right = ART.b51Read(n), alt = ART.b51Alt(n);
  return {right, opts: [right, alt[0], alt[1]].sort(() => Math.random() - .5)};
};

/* lưới ô vuông với các ô được tô màu; eye = [x, y] vẽ con mắt */
ART.b51Grid = (cols, rows, cells, eye, cls) => {
  const C = 25, W = cols * C, H = rows * C;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * C} 0V${H}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * C}H${W}`;
  const f = cells.map(c => `<rect x="${c[0] * C}" y="${c[1] * C}" width="${C}" height="${C}"
    fill="${c[2]}" stroke="${c[3] || '#c0392b'}" stroke-width="2"/>`).join('');
  const ey = eye ? `<circle cx="${eye[0] * C + C / 2}" cy="${eye[1] * C + C / 2}" r="4.6"
      fill="#fff" stroke="#2b2b2b" stroke-width="2"/>
    <circle cx="${eye[0] * C + C / 2}" cy="${eye[1] * C + C / 2}" r="2.2" fill="#2b2b2b"/>` : '';
  return `<svg viewBox="-3 -3 ${W + 6} ${H + 6}" class="${cls || 'b51-gs'}">
    <path d="${g}" fill="none" stroke="#7fcdec" stroke-width="1"/>${f}${ey}</svg>`;
};

/* hình tam giác nhỏ nằm trong hình tam giác lớn, chung cạnh đáy */
ART.b51Tri = n => `<svg viewBox="-24 -24 288 256" class="b51-tri">
  <path d="M10 200L60 20L230 200z" fill="none" stroke="#2b2b2b" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M10 200L96 120L230 200z" fill="none" stroke="#2b2b2b" stroke-width="2.6" stroke-linejoin="round"/>
  <text x="4" y="216" text-anchor="middle" font-size="17" font-weight="700">${n.A}</text>
  <text x="56" y="10" text-anchor="middle" font-size="17" font-weight="700">${n.D}</text>
  <text x="96" y="110" text-anchor="middle" font-size="17" font-weight="700">${n.B}</text>
  <text x="240" y="216" text-anchor="middle" font-size="17" font-weight="700">${n.C}</text>
</svg>`;

/* hình vuông A cắt theo đường chéo ghép thành hình tam giác B */
ART.b51AB = (k, nA, nB) => {
  const C = 26, cols = 3 * k + 5, rows = k + 2, W = cols * C, H = rows * C;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * C} 0V${H}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * C}H${W}`;
  const ax = C, ay = C, aw = k * C;
  const bx = (k + 3) * C, by = (1 + k) * C, bw = 2 * k * C;
  return `<svg viewBox="-6 -6 ${W + 12} ${H + 30}" class="b51-ab">
    <path d="${g}" fill="none" stroke="#7fcdec" stroke-width="1"/>
    <rect x="${ax}" y="${ay}" width="${aw}" height="${aw}" fill="#f8f0a0" stroke="#3f8f3f" stroke-width="3"/>
    <path d="M${ax} ${ay}L${ax + aw} ${ay + aw}" stroke="#3f8f3f" stroke-width="2.4" stroke-dasharray="5 4"/>
    <path d="M${bx} ${by}L${bx + bw / 2} ${C}L${bx + bw} ${by}z" fill="#fbdcef" stroke="#d63384" stroke-width="3"
      stroke-linejoin="round"/>
    <path d="M${bx + bw / 2} ${C}V${by}" stroke="#d63384" stroke-width="2.4" stroke-dasharray="5 4"/>
    <text x="${ax + aw / 2}" y="${H + 20}" text-anchor="middle" font-size="18" font-weight="700"
      font-style="italic">${nA}</text>
    <text x="${bx + bw / 2}" y="${H + 20}" text-anchor="middle" font-size="18" font-weight="700"
      font-style="italic">${nB}</text>
  </svg>`;
};

ART.b51Kite = c => `<svg viewBox="0 0 120 150" class="b51-kite">
  <path d="M60 8L104 58L60 118L16 58z" fill="${c}" stroke="#8a5a2b" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M60 8v110M16 58h88" stroke="#8a5a2b" stroke-width="1.8"/>
  <path d="M60 118q-12 12 0 20 12 8 0 12" fill="none" stroke="#8a5a2b" stroke-width="2"/>
  <path d="M52 128h16M50 140h16" stroke="#e05a3a" stroke-width="3" stroke-linecap="round"/>
</svg>`;

BANKS.b51 = [

/* ===== tr.27 – Bài 1: So sánh diện tích hai hình tam giác ===== */
() => {
  const q = Q(1, '');
  const b = 'ABCDEGHIKLMNPQ'.split('').sort(() => Math.random() - .5);
  const n = {A: b[0], B: b[1], C: b[2], D: b[3]};
  const small = n.A + n.B + n.C, big = n.A + n.D + n.C;
  const flip = Math.random() < .5;
  const l = flip ? big : small, r = flip ? small : big;
  return q.done(`<p class="wordq">So sánh diện tích hình tam giác ${l} với diện tích hình tam giác ${r}.</p>`
    + ART.b51Tri(n)
    + `<div class="b51-cmp"><span class="s">Diện tích hình tam giác ${l}</span>
        ${q.sign(flip ? '>' : '<')}<span class="s">diện tích hình tam giác ${r}</span></div>
       <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `Hình tam giác ${small} nằm hoàn toàn trong hình tam giác ${big} nên diện tích hình tam giác `
      + `${small} bé hơn diện tích hình tam giác ${big}.`);
},

/* ===== tr.27 – Bài 2: Hình con vật nào có diện tích lớn hơn ===== */
() => {
  const q = Q(2, 'Hình con vật nào dưới đây có diện tích lớn hơn?');
  let w1 = 4, h1 = 3, w2 = 5, h2 = 2;
  for (let g = 0; g < 200; g++){
    w1 = R(3, 5); h1 = R(2, 4); w2 = R(3, 6); h2 = R(2, 3);
    if (w1 * h1 + 4 !== w2 * h2 + 3) break;
  }
  if (w1 * h1 + 4 === w2 * h2 + 3){ w1 = 4; h1 = 3; w2 = 5; h2 = 2; }
  const n1 = w1 * h1 + 4, n2 = w2 * h2 + 3;

  const x0 = 2, y0 = 1, cE = [];
  for (let i = 0; i < w1; i++) for (let j = 0; j < h1; j++) cE.push([x0 + i, y0 + j, '#fbeaa0']);
  cE.push([x0 - 2, y0 + h1 - 1, '#fbeaa0'], [x0 - 1, y0 + h1 - 1, '#fbeaa0']);
  cE.push([x0, y0 + h1, '#fbeaa0'], [x0 + w1 - 1, y0 + h1, '#fbeaa0']);
  const eE = [x0, y0];

  const x1 = 1, y1 = 1, cW = [];
  for (let i = 0; i < w2; i++) for (let j = 0; j < h2; j++) cW.push([x1 + i, y1 + j, '#a9dcf5', '#2b4f9e']);
  cW.push([x1 + w2, y1 - 1, '#a9dcf5', '#2b4f9e'], [x1 + w2 + 1, y1 - 1, '#a9dcf5', '#2b4f9e'],
    [x1 + w2 + 1, y1, '#a9dcf5', '#2b4f9e']);
  const eW = [x1, y1];

  const NM = ['con voi', 'con cá voi'];
  const bigger = n1 > n2 ? NM[0] : NM[1];
  return q.done(`<div class="b51-arow">
      <div class="b51-acell">${ART.b51Grid(x0 + w1 + 1, y0 + h1 + 2, cE, eE)}<em>Con voi</em></div>
      <div class="b51-acell">${ART.b51Grid(x1 + w2 + 3, y1 + h2 + 1, cW, eW)}<em>Con cá voi</em></div>
    </div>
    <div class="fill-line">Hình con voi gồm ${q.num(n1, 2)} ô vuông.</div>
    <div class="fill-line">Hình con cá voi gồm ${q.num(n2, 2)} ô vuông.</div>
    <div class="fill-line">Hình có diện tích lớn hơn là hình ${q.pick(bigger, NM)}</div>`,
    `Con voi ${n1} ô vuông, con cá voi ${n2} ô vuông nên hình ${bigger} có diện tích lớn hơn.`);
},

/* ===== tr.27 – Bài 3: So sánh diện tích hình A với hình B ===== */
() => {
  const q = Q(3, '');
  const b = 'ABCDEGHIKMNPQ'.split('').sort(() => Math.random() - .5);
  const nA = b[0], nB = b[1];
  const k = R(2, 3);
  return q.done(`<p class="wordq">So sánh diện tích hình ${nA} với diện tích hình ${nB}.</p>`
    + ART.b51AB(k, nA, nB)
    + `<div class="fill-line">Hình ${nA} gồm ${q.num(k * k, 2)} ô vuông.</div>
       <div class="fill-line">Cắt hình ${nA} theo đường chéo rồi ghép lại được hình ${nB},
         hình ${nB} cũng gồm ${q.num(k * k, 2)} ô vuông.</div>
       <div class="b51-cmp"><span class="s">Diện tích hình ${nA}</span>${q.sign('=')}
         <span class="s">diện tích hình ${nB}</span></div>
       <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `Hình ${nA} và hình ${nB} cùng gồm ${k * k} ô vuông nên hai hình có diện tích bằng nhau.`);
},

/* ===== tr.29 – Bài 1: Hoàn thành bảng (theo mẫu) ===== */
() => {
  const q = Q(1, 'Hoàn thành bảng sau (theo mẫu).');
  const v0 = R(11, 99);
  const v1 = R(101, 999);
  const v2 = R(1, 9) * 100 + R(1, 9) * 1000;
  const v3 = 10000;
  const o2 = ART.b51ReadOpts(v2);
  const cell = v => `${ART.spNum(v)} cm<sup>2</sup>`;
  const rd = v => ART.b51Cap(ART.b51Read(v)) + ' xăng-ti-mét vuông';
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Đọc</th><th>Viết</th></tr>
      <tr><td>${rd(v0)}</td><td>${cell(v0)}</td></tr>
      <tr><td>${rd(v1)}</td><td>${q.num(v1, 4)} cm<sup>2</sup></td></tr>
      <tr><td>${q.pick(o2.right, o2.opts)} xăng-ti-mét vuông</td><td>${cell(v2)}</td></tr>
      <tr><td>${rd(v3)}</td><td>${q.num(v3, 5)} cm<sup>2</sup></td></tr>
    </table></div>`,
    `${rd(v1)} viết là ${ART.spNum(v1)} cm2;  ${ART.spNum(v2)} cm2 đọc là ${rd(v2)};  `
      + `${rd(v3)} viết là ${ART.spNum(v3)} cm2.`);
},

/* ===== tr.29 – Bài 2: Số ? (đếm ô vuông 1 cm2) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const s = R(3, 6);                                   // con sâu: s ô vuông
  const neck = R(2, 3), body = R(3, 4);                // con hươu cao cổ
  const gir = 2 + neck + body + 2;
  const cS = [];
  for (let i = 0; i < s; i++) cS.push([i, 0, i % 2 ? '#8fd04a' : '#c8e86a', '#2f7a2c']);
  const cG = [];
  const cx = 1;
  cG.push([cx - 1, 0, '#f0a04a'], [cx, 0, '#f7e04a']);          // đầu
  for (let j = 1; j <= neck; j++) cG.push([cx, j, j % 2 ? '#f0a04a' : '#f7e04a']);   // cổ
  const by = neck + 1;
  for (let i = 0; i < body; i++) cG.push([cx + i, by, i % 2 ? '#f7e04a' : '#f0a04a']); // thân
  cG.push([cx, by + 1, '#f7e04a'], [cx + body - 1, by + 1, '#f7e04a']);              // chân
  return q.done(`<div class="b51-arow">
      <div class="b51-acell">${ART.b51Grid(s + 1, 2, cS, [0, 0])}<em>Con sâu</em></div>
      <div class="b51-acell">${ART.b51Grid(cx + body + 1, by + 3, cG, [cx, 0])}<em>Con hươu cao cổ</em></div>
    </div>
    <div class="hint-line">Mỗi ô vuông trên lưới có diện tích 1 cm<sup>2</sup>.</div>
    <div class="fill-line"><b>a)</b> Hình con sâu gồm ${q.num(s, 2)} ô vuông 1 cm<sup>2</sup>.</div>
    <div class="fill-line">Diện tích hình con sâu bằng ${q.num(s, 2)} cm<sup>2</sup>.</div>
    <div class="fill-line"><b>b)</b> Hình con hươu cao cổ gồm ${q.num(gir, 2)} ô vuông 1 cm<sup>2</sup>.</div>
    <div class="fill-line">Diện tích hình con hươu cao cổ bằng ${q.num(gir, 2)} cm<sup>2</sup>.</div>`,
    `Con sâu ${s} ô vuông nên có diện tích ${s} cm2; con hươu cao cổ ${gir} ô vuông nên có diện tích ${gir} cm2.`);
},

/* ===== tr.29 – Luyện tập Bài 1: Tính (theo mẫu) ===== */
() => {
  const q = Q(1, 'Tính (theo mẫu).');
  const m1 = R(2, 6), m2 = R(2, 6), m3 = R(3, 8);
  const a1 = R(21, 79), a2 = R(11, 49);
  const a3 = R(40, 90), a4 = R(10, 35);
  const k = R(3, 6), u = R(11, 25);
  const d = R(3, 9), t = R(6, 20), v = d * t;
  const cm = 'cm<sup>2</sup>';
  return q.done(noteBox(`<b>Mẫu:</b> &nbsp; ${m1} ${cm} + ${m2} ${cm} = ${m1 + m2} ${cm}
      &nbsp;&nbsp;&nbsp; ${m3} ${cm} × 2 = ${m3 * 2} ${cm}`)
    + `<div class="b51-cols">
        <div><div class="b51-ex"><span class="b51-let">a)</span>${a1} ${cm} + ${a2} ${cm}
            = ${q.num(a1 + a2, 3)} ${cm}</div>
          <div class="b51-ex">${a3} ${cm} − ${a4} ${cm} = ${q.num(a3 - a4, 3)} ${cm}</div></div>
        <div><div class="b51-ex"><span class="b51-let">b)</span>${u} ${cm} × ${k}
            = ${q.num(u * k, 3)} ${cm}</div>
          <div class="b51-ex">${v} ${cm} : ${d} = ${q.num(t, 3)} ${cm}</div></div>
      </div>`,
    `a) ${a1} + ${a2} = ${a1 + a2}; ${a3} − ${a4} = ${a3 - a4}.  `
      + `b) ${u} × ${k} = ${u * k}; ${v} : ${d} = ${t}.`);
},

/* ===== tr.29 – Luyện tập Bài 2: hai cánh diều ===== */
() => {
  const q = Q(2, '');
  const do_ = R(60, 99) * 10, hieu = R(2, 12) * 10, vang = do_ - hieu;
  return q.done(`<p class="wordq">Cánh diều màu đỏ có diện tích ${ART.spNum(do_)} cm<sup>2</sup>.
      Cánh diều màu vàng có diện tích ${ART.spNum(vang)} cm<sup>2</sup>.
      Hỏi diện tích cánh diều màu đỏ hơn diện tích cánh diều màu vàng bao nhiêu xăng-ti-mét vuông?</p>
    <div class="b51-krow">
      <div class="b51-kcell">${ART.b51Kite('#f0603a')}Cánh diều màu đỏ<br>${ART.spNum(do_)} cm<sup>2</sup></div>
      <div class="b51-kcell">${ART.b51Kite('#f7d94e')}Cánh diều màu vàng<br>${ART.spNum(vang)} cm<sup>2</sup></div>
    </div>
    <div class="fill-line">Diện tích cánh diều màu đỏ hơn diện tích cánh diều màu vàng
      ${q.num(hieu, 3)} cm<sup>2</sup>.</div>`,
    `${ART.spNum(do_)} − ${ART.spNum(vang)} = ${hieu} (cm2)`);
},
];
