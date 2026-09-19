/*CSS
.b53-wide{width:100%;max-width:520px;height:auto;display:block;margin:6px auto}
.b53-fig{width:100%;max-width:330px;height:auto;display:block;margin:6px auto}
.b53-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px 18px;margin:8px 0}
.b53-hs{height:auto;max-width:100%}
.b53-pp{height:auto;max-width:100%}
.b53-sub{font-weight:700;margin:9px 0 2px}
.b53-let{color:#d63384;font-weight:800;margin-right:5px}
CSS*/

/* ==================== BÀI 53: LUYỆN TẬP CHUNG (SGK tập 2 – tr.35, 36, 37) ====================
   luyện tập tr.35 : bài 1 (bảng cạnh – chu vi hình vuông), bài 2 (chu vi hình chữ nhật, đổi đơn vị),
                     bài 3 (ghép 3 viên gạch hình vuông), bài 4 (đóng cọc rào các vườn hoa)
   luyện tập tr.36 : bài 1 (diện tích hình vuông, diện tích hình chữ nhật),
                     bài 2 (hình chữ nhật có chiều dài gấp đôi chiều rộng),
                     bài 3 (ba miếng bìa hình ngôi nhà), bài 4 (võ đài hình vuông biết chu vi)
   luyện tập tr.37 : bài 1 (9 tấm gỗ lát sàn), bài 2 (hình H gồm hai hình chữ nhật),
                     bài 3 (ba tờ giấy màu của Mai, Nam, Việt)
============================================================================================ */

ART.b53Grid = (cols, rows, u) => {
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * u} 0V${rows * u}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * u}H${cols * u}`;
  return g;
};

/* ba viên gạch hình vuông ghép thành một hình chữ nhật */
ART.b53Tiles = (a, n) => {
  const u = 62, W = n * u;
  let s = '';
  for (let i = 0; i < n; i++)
    s += `<rect x="${i * u}" y="0" width="${u}" height="${u}" fill="#7fc241" stroke="#2f6d1a" stroke-width="2.4"/>
      <path d="M${i * u + 12} 12h${u - 24}v${u - 24}h${-(u - 24)}z" fill="none" stroke="#a8e06a" stroke-width="2"/>`;
  return `<svg viewBox="-24 -28 ${W + 104} ${u + 62}" class="b53-fig">${s}
    <path d="M0 ${u + 14}H${W}" stroke="#1f7ec4" stroke-width="2"/>
    <path d="M0 ${u + 9}v10M${W} ${u + 9}v10" stroke="#1f7ec4" stroke-width="2"/>
    <text x="${W / 2}" y="${u + 36}" text-anchor="middle" font-size="15">?</text>
    <text x="${u / 2}" y="-10" text-anchor="middle" font-size="15">${a} cm</text>
    <text x="${W + 10}" y="${u / 2 + 5}" text-anchor="start" font-size="15">${a} cm</text>
  </svg>`;
};

/* các vườn hoa hình chữ nhật, quanh vườn đóng cọc cách nhau 1 m */
ART.b53Garden = gs => {
  const u = 24, gap = 2;
  let x = 0, body = '', maxH = 0;
  gs.forEach(g => { if (g.h > maxH) maxH = g.h; });
  gs.forEach(g => {
    const X = x * u, Y = (maxH - g.h) * u;
    body += `<rect x="${X}" y="${Y}" width="${g.w * u}" height="${g.h * u}"
      fill="${g.fill}" stroke="#8a5a2b" stroke-width="2.4"/>`;
    for (let i = 0; i <= g.w; i++)
      for (let j = 0; j <= g.h; j++)
        if (i === 0 || i === g.w || j === 0 || j === g.h)
          body += `<circle cx="${X + i * u}" cy="${Y + j * u}" r="3.6" fill="#7a4b1e"/>`;
    for (let i = 0; i < g.w; i++)
      for (let j = 0; j < g.h; j++)
        body += `<circle cx="${X + (i + .5) * u}" cy="${Y + (j + .5) * u}" r="4" fill="${g.flower}"/>`;
    body += `<text x="${X + g.w * u / 2}" y="${maxH * u + 24}" text-anchor="middle"
      font-size="16" font-weight="800" fill="#d63384">${g.name}</text>`;
    x += g.w + gap;
  });
  const cols = x - gap;
  return `<svg viewBox="-12 -14 ${cols * u + 24} ${maxH * u + 52}" class="b53-wide">${body}</svg>`;
};

/* miếng bìa hình ngôi nhà trên lưới ô vuông, có thể khoét cửa / cửa sổ */
ART.b53House = (b, hb, holes, fill, stroke, name) => {
  const u = 22, rh = b / 2, rows = rh + hb, cols = b;
  const out = `M${b / 2 * u} 0L${b * u} ${rh * u}V${rows * u}H0V${rh * u}Z`;
  const hs = holes.map(r =>
    `<rect x="${r[0] * u}" y="${(rh + r[1]) * u}" width="${r[2] * u}" height="${r[3] * u}"
      fill="#fff" stroke="#111" stroke-width="2"/>`).join('');
  return `<svg viewBox="-8 -8 ${cols * u + 16} ${rows * u + 42}"
    class="b53-hs" style="width:${cols * u + 16}px;max-width:100%">
    <path d="${ART.b53Grid(cols, rows, u)}" fill="none" stroke="#7fcdec" stroke-width="1"/>
    <path d="${out}" fill="${fill}" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
    ${hs}
    <text x="${cols * u / 2}" y="${rows * u + 30}" text-anchor="middle"
      font-size="17" font-weight="800" fill="#d63384">${name}</text>
  </svg>`;
};

/* hình H gồm hình chữ nhật ABCD ở trên và hình chữ nhật DMNP ở dưới */
ART.b53H = (w, ht, L, Wd, n) => {
  const u = 14, Wt = w * u, Ht = ht * u, LL = L * u, WW = Wd * u;
  return `<svg viewBox="-34 -30 ${LL + 130} ${Ht + WW + 78}" class="b53-fig">
    <rect x="0" y="0" width="${Wt}" height="${Ht}" fill="none" stroke="#111" stroke-width="2.6"/>
    <rect x="0" y="${Ht}" width="${LL}" height="${WW}" fill="none" stroke="#111" stroke-width="2.6"/>
    <text x="-13" y="-9" text-anchor="middle" font-size="16" font-weight="700">${n.A}</text>
    <text x="${Wt}" y="-9" text-anchor="middle" font-size="16" font-weight="700">${n.B}</text>
    <text x="-13" y="${Ht - 4}" text-anchor="middle" font-size="16" font-weight="700">${n.D}</text>
    <text x="${Wt}" y="${Ht + 18}" text-anchor="middle" font-size="16" font-weight="700">${n.C}</text>
    <text x="${LL + 13}" y="${Ht - 4}" text-anchor="middle" font-size="16" font-weight="700">${n.M}</text>
    <text x="-13" y="${Ht + WW}" text-anchor="middle" font-size="16" font-weight="700">${n.P}</text>
    <text x="${LL + 13}" y="${Ht + WW}" text-anchor="middle" font-size="16" font-weight="700">${n.N}</text>
    <text x="${Wt / 2}" y="-9" text-anchor="middle" font-size="14">${w} cm</text>
    <text x="${Wt + 10}" y="${Ht / 2 + 5}" text-anchor="start" font-size="14">${ht} cm</text>
    <text x="${LL + 24}" y="${Ht + WW / 2 + 5}" text-anchor="start" font-size="14">${Wd} cm</text>
    <text x="${LL / 2}" y="${Ht + WW + 22}" text-anchor="middle" font-size="14">${L} cm</text>
    <text x="${LL / 2}" y="${Ht + WW + 48}" text-anchor="middle" font-size="16" font-weight="700">Hình <tspan font-style="italic">H</tspan></text>
  </svg>`;
};

/* tờ giấy màu hình chữ nhật có ghi kích thước */
ART.b53Paper = (w, h, fill, name) => {
  const u = 15, W = w * u, H = h * u;
  return `<svg viewBox="-28 -26 ${W + 96} ${H + 58}"
    class="b53-pp" style="width:${W + 96}px;max-width:100%">
    <rect x="0" y="0" width="${W}" height="${H}" fill="${fill}" stroke="#5a5a5a" stroke-width="2"/>
    <text x="${W / 2}" y="-9" text-anchor="middle" font-size="14">${w} cm</text>
    <text x="${W + 8}" y="${H / 2 + 5}" text-anchor="start" font-size="14">${h} cm</text>
    <text x="${W / 2}" y="${H + 24}" text-anchor="middle" font-size="17" font-weight="800" fill="#d63384">${name}</text>
  </svg>`;
};

BANKS.b53 = [

/* ===== tr.35 – Bài 1: Số ? (cạnh hình vuông – chu vi hình vuông) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const s = [];
  for (let g = 0; g < 80 && s.length < 4; g++){
    const v = pick([5, 8, 10, 12, 15, 20, 25, 30]);
    if (!s.includes(v)) s.push(v);
  }
  while (s.length < 4) s.push(3 + s.length);
  const html = `<div class="tbl-wrap"><table class="tbl amber">
      <tr><td>Cạnh hình vuông</td><td>${s[0]} cm</td><td>${s[1]} cm</td>
        <td>${q.num(s[2])} cm</td><td>${q.num(s[3])} cm</td></tr>
      <tr><td>Chu vi hình vuông</td><td>${q.num(s[0] * 4)} cm</td><td>${q.num(s[1] * 4)} cm</td>
        <td>${s[2] * 4} cm</td><td>${s[3] * 4} cm</td></tr>
    </table></div>`;
  return q.done(html,
    `Chu vi = cạnh × 4; cạnh = chu vi : 4. ${s[2] * 4} : 4 = ${s[2]} (cm); ${s[3] * 4} : 4 = ${s[3]} (cm).`);
},

/* ===== tr.35 – Bài 2: chu vi hình chữ nhật (phải đổi đơn vị đo) ===== */
() => {
  const q = Q(2, 'Tính chu vi hình chữ nhật.');
  const a = R(2, 4), b = R(3, 9);
  const c = R(1, 2), d = R(2, 9);
  const html = `<div class="b53-sub"><span class="b53-let">a)</span>Tính chu vi hình chữ nhật
      có chiều dài ${a} dm và chiều rộng ${b} cm.</div>`
    + noteBox(`Mẫu: <i>Bài giải</i><br>Đổi ${a} dm = ${a * 10} cm.<br>
      Chu vi hình chữ nhật là:<br>(${a * 10} + ${b}) × 2 = ${(a * 10 + b) * 2} (cm)<br>
      <i>Đáp số</i>: ${(a * 10 + b) * 2} cm.`)
    + `<div class="b53-sub"><span class="b53-let">b)</span>Tính chu vi hình chữ nhật
        có chiều dài ${c} m và chiều rộng ${d} dm.</div>
       <div class="fill-line">Đổi ${c} m = ${q.num(c * 10)} dm.</div>
       <div class="fill-line">Chu vi hình chữ nhật là ${q.num((c * 10 + d) * 2)} dm.</div>`;
  return q.done(html,
    `b) ${c} m = ${c * 10} dm;  (${c * 10} + ${d}) × 2 = ${(c * 10 + d) * 2} (dm).`);
},

/* ===== tr.35 – Bài 3: ghép ba viên gạch hình vuông ===== */
() => {
  const q = Q(3, '');
  const a = pick([20, 25, 30, 40]), n = 3;
  const dai = a * n, cv = (dai + a) * 2;
  return q.done(`<p class="wordq">Một viên gạch hình vuông có cạnh ${a} cm.
      Tính chu vi hình chữ nhật ghép bởi ${n} viên gạch như thế.</p>`
    + ART.b53Tiles(a, n)
    + `<div class="bullet">Hình chữ nhật ghép được có chiều dài ${q.num(dai)} cm
        và chiều rộng ${q.num(a)} cm.</div>
       <div class="bullet">Chu vi hình chữ nhật đó là ${q.num(cv)} cm.</div>`,
    `${a} × ${n} = ${dai} (cm);  (${dai} + ${a}) × 2 = ${cv} (cm).`);
},

/* ===== tr.35 – Bài 4: đóng cọc rào các vườn hoa ===== */
() => {
  const q = Q(4, 'Người ta đóng cọc để rào các vườn hoa. Biết rằng hai cọc cạnh nhau cách nhau 1 m (như hình vẽ).');
  const s = R(4, 5);
  const shapes = [{w: 2 * s - 1, h: 2}, {w: s, h: s}, {w: s + 1, h: s - 1}]
    .sort(() => Math.random() - .5);
  const NAME = ['A', 'B', 'C'];
  const FILL = ['#e9f5cf', '#fdf1c7', '#fbe0ea'];
  const FLW = ['#f0c419', '#e0453b', '#e878a8'];
  const gs = shapes.map((sh, i) =>
    Object.assign({}, sh, {name: NAME[i], fill: FILL[i], flower: FLW[i]}));
  const cv = gs.map(g => (g.w + g.h) * 2), dt = gs.map(g => g.w * g.h);
  const ong = NAME[cv.indexOf(Math.max.apply(null, cv))];
  const chuon = NAME[dt.indexOf(Math.max.apply(null, dt))];
  const html = ART.b53Garden(gs)
    + `<div class="tbl-wrap"><table class="tbl green">
        <tr><th>Vườn hoa</th><th>${NAME[0]}</th><th>${NAME[1]}</th><th>${NAME[2]}</th></tr>
        <tr><td>Chiều dài hàng rào (m)</td>
          <td>${q.num(cv[0])}</td><td>${q.num(cv[1])}</td><td>${q.num(cv[2])}</td></tr>
        <tr><td>Diện tích (m<sup>2</sup>)</td>
          <td>${q.num(dt[0])}</td><td>${q.num(dt[1])}</td><td>${q.num(dt[2])}</td></tr>
      </table></div>
      <p class="wordq">Bạn ong tìm đến vườn hoa có hàng rào dài nhất, bạn chuồn chuồn tìm đến
        vườn hoa có diện tích lớn nhất. Hỏi mỗi bạn tìm đến vườn hoa nào?</p>
      <div class="fill-line">Bạn ong tìm đến vườn hoa ${q.pick(ong, NAME)}</div>
      <div class="fill-line">Bạn chuồn chuồn tìm đến vườn hoa ${q.pick(chuon, NAME)}</div>`;
  return q.done(html,
    `Hàng rào (chu vi): ${cv.join(' m, ')} m → dài nhất là vườn ${ong}. `
      + `Diện tích: ${dt.join(' m2, ')} m2 → lớn nhất là vườn ${chuon}.`);
},

/* ===== tr.36 – Bài 1: diện tích hình vuông và diện tích hình chữ nhật ===== */
() => {
  const q = Q(1, '');
  const c = R(4, 9), d = R(7, 12), r = R(3, 6);
  return q.done(`<div class="b53-sub"><span class="b53-let">a)</span>Tính diện tích hình vuông
      có cạnh ${c} cm.</div>
    <div class="fill-line">Diện tích hình vuông đó là ${q.num(c * c)} cm<sup>2</sup>.</div>
    <div class="b53-sub"><span class="b53-let">b)</span>Tính diện tích hình chữ nhật
      có chiều dài ${d} cm và chiều rộng ${r} cm.</div>
    <div class="fill-line">Diện tích hình chữ nhật đó là ${q.num(d * r)} cm<sup>2</sup>.</div>`,
    `a) ${c} × ${c} = ${c * c} (cm2).  b) ${d} × ${r} = ${d * r} (cm2).`);
},

/* ===== tr.36 – Bài 2: hình chữ nhật có chiều dài gấp đôi chiều rộng ===== */
() => {
  const q = Q(2, '');
  const r = R(4, 9), dai = r * 2;
  return q.done(`<p class="wordq">Một hình chữ nhật có chiều rộng ${r} cm,
      chiều dài gấp đôi chiều rộng. Tính diện tích hình chữ nhật đó.</p>
    <div class="bullet">Chiều dài hình chữ nhật là ${q.num(dai)} cm.</div>
    <div class="bullet">Diện tích hình chữ nhật đó là ${q.num(dai * r)} cm<sup>2</sup>.</div>`,
    `${r} × 2 = ${dai} (cm);  ${dai} × ${r} = ${dai * r} (cm2).`);
},

/* ===== tr.36 – Bài 3: hai miếng bìa nào có diện tích bằng nhau ===== */
() => {
  const q = Q(3, 'Việt cắt được các miếng bìa như hình dưới đây. Hai miếng bìa nào có diện tích bằng nhau?');
  const b = pick([6, 8]), hb = R(4, 5);
  const cua = [[Math.floor(b / 2) - 1, hb - 3, 2, 3]];                       // 6 ô
  const so1 = [[Math.floor((b - 3) / 2), 0, 3, 1], [Math.floor((b - 3) / 2), 2, 3, 1]];  // 6 ô
  const so2 = [[Math.floor((b - 2) / 2), 0, 2, 1], [Math.floor((b - 2) / 2), 2, 2, 1]];  // 4 ô
  const kinds = [{h: cua, k: 6}, {h: so1, k: 6}, {h: so2, k: 4}].sort(() => Math.random() - .5);
  const NAME = ['A', 'B', 'C'];
  const FILL = ['#cfe9f7', '#fbf0a8', '#fbdce8'], STK = ['#2b6f92', '#a8890c', '#b8477a'];
  const tong = b * hb + b * b / 4;
  const dt = kinds.map(x => tong - x.k);
  const bang = NAME.filter((nm, i) => kinds[i].k === 6).sort();
  const html = '<div class="b53-row">' + kinds.map((x, i) =>
      ART.b53House(b, hb, x.h, FILL[i], STK[i], NAME[i])).join('') + '</div>'
    + `<div class="hint-line">Mỗi ô vuông nhỏ trên hình có cạnh dài 1 cm.</div>
       <div class="fill-line">Diện tích miếng bìa ${NAME[0]} là ${q.num(dt[0])} cm<sup>2</sup>.</div>
       <div class="fill-line">Diện tích miếng bìa ${NAME[1]} là ${q.num(dt[1])} cm<sup>2</sup>.</div>
       <div class="fill-line">Diện tích miếng bìa ${NAME[2]} là ${q.num(dt[2])} cm<sup>2</sup>.</div>
       <div class="fill-line">Hai miếng bìa có diện tích bằng nhau là: ${q.pick(bang.join(','), NAME)}</div>`;
  return q.done(html,
    `Mỗi ngôi nhà nguyên vẹn có ${tong} ô vuông. Diện tích: ${NAME[0]} ${dt[0]} cm2, `
      + `${NAME[1]} ${dt[1]} cm2, ${NAME[2]} ${dt[2]} cm2 nên ${bang.join(' và ')} bằng nhau.`);
},

/* ===== tr.36 – Bài 4: võ đài hình vuông biết chu vi ===== */
() => {
  const q = Q(4, '');
  const cv = pick([24, 28, 32, 36, 40, 44, 48]), canh = cv / 4;
  return q.done(`<p class="wordq">Một võ đài hình vuông có chu vi ${cv} cm.
      Tính diện tích của võ đài đó.</p>
    <div class="bullet">Cạnh của võ đài đó dài ${q.num(canh)} cm.</div>
    <div class="bullet">Diện tích của võ đài đó là ${q.num(canh * canh)} cm<sup>2</sup>.</div>`,
    `${cv} : 4 = ${canh} (cm);  ${canh} × ${canh} = ${canh * canh} (cm2).`);
},

/* ===== tr.37 – Bài 1: các tấm gỗ lát sàn ===== */
() => {
  const q = Q(1, '');
  const n = R(6, 12), d = pick([40, 45, 50, 60]), r = pick([8, 9, 10, 12]);
  return q.done(`<p class="wordq">Để sửa chữa một mảng nền nhà cần dùng ${n} tấm gỗ lát sàn,
      mỗi tấm có dạng hình chữ nhật với chiều dài ${d} cm và chiều rộng ${r} cm.
      Hỏi diện tích mảng nền nhà cần sửa chữa là bao nhiêu xăng-ti-mét vuông?</p>
    <div class="bullet">Diện tích mỗi tấm gỗ là ${q.num(d * r)} cm<sup>2</sup>.</div>
    <div class="bullet">Diện tích mảng nền nhà cần sửa chữa là ${q.num(n * d * r)} cm<sup>2</sup>.</div>`,
    `${d} × ${r} = ${d * r} (cm2);  ${d * r} × ${n} = ${n * d * r} (cm2).`);
},

/* ===== tr.37 – Bài 2: hình H gồm hai hình chữ nhật ===== */
() => {
  const q = Q(2, '');
  const bag = 'ABCDEGHIKLMNPQ'.split('').sort(() => Math.random() - .5);
  const n = {A: bag[0], B: bag[1], C: bag[2], D: bag[3], M: bag[4], N: bag[5], P: bag[6]};
  const w = R(5, 8), ht = R(6, 10), L = R(w + 3, 14), Wd = R(5, 9);
  const r1 = n.A + n.B + n.C + n.D, r2 = n.D + n.M + n.N + n.P;
  return q.done(`<p class="wordq">Hình <i>H</i> gồm hình chữ nhật ${r1} và hình chữ nhật ${r2}
      như hình bên.</p>`
    + ART.b53H(w, ht, L, Wd, n)
    + `<div class="b53-sub"><span class="b53-let">a)</span>Tính diện tích mỗi hình chữ nhật
        có trong hình vẽ.</div>
       <div class="bullet">Diện tích hình chữ nhật ${r1} là ${q.num(w * ht)} cm<sup>2</sup>.</div>
       <div class="bullet">Diện tích hình chữ nhật ${r2} là ${q.num(L * Wd)} cm<sup>2</sup>.</div>
       <div class="b53-sub"><span class="b53-let">b)</span>Tính diện tích hình <i>H</i>.</div>
       <div class="bullet">Diện tích hình <i>H</i> là ${q.num(w * ht + L * Wd)} cm<sup>2</sup>.</div>`,
    `a) ${w} × ${ht} = ${w * ht} (cm2); ${L} × ${Wd} = ${L * Wd} (cm2).  `
      + `b) ${w * ht} + ${L * Wd} = ${w * ht + L * Wd} (cm2).`);
},

/* ===== tr.37 – Bài 3: ba tờ giấy màu của Mai, Nam và Việt ===== */
() => {
  const q = Q(3, 'Mai, Nam và Việt cắt được ba tờ giấy màu có kích thước như hình vẽ dưới đây. Biết tờ giấy màu của Nam có chu vi bằng tờ giấy màu của Việt nhưng có diện tích bé hơn. Em hãy xác định tờ giấy màu của mỗi bạn.');
  const k = R(11, 14);
  const wN = R(2, 3), hN = k - wN;                 // tờ của Nam
  const wV = Math.floor(k / 2), hV = k - wV;       // tờ của Việt (cùng chu vi, diện tích lớn hơn)
  let sM = 4;
  for (let g = 0; g < 40; g++){ sM = R(4, 9); if (2 * sM !== k) break; }
  if (2 * sM === k) sM = sM + 1;                   // tờ của Mai (chu vi khác)
  const items = [
    {w: hN, h: wN, who: 'Nam', fill: '#cfe9f7'},
    {w: hV, h: wV, who: 'Việt', fill: '#fbf0a8'},
    {w: sM, h: sM, who: 'Mai', fill: '#fbdce8'}
  ].sort(() => Math.random() - .5);
  const NAME = ['A', 'B', 'C'];
  const ans = who => NAME[items.findIndex(x => x.who === who)];
  const html = '<div class="b53-row">' + items.map((x, i) =>
      ART.b53Paper(x.w, x.h, x.fill, NAME[i])).join('') + '</div>'
    + `<div class="fill-line">Tờ giấy màu của Mai là tờ ${q.pick(ans('Mai'), NAME)}</div>
       <div class="fill-line">Tờ giấy màu của Nam là tờ ${q.pick(ans('Nam'), NAME)}</div>
       <div class="fill-line">Tờ giấy màu của Việt là tờ ${q.pick(ans('Việt'), NAME)}</div>`;
  return q.done(html,
    `Chu vi: tờ ${ans('Nam')} và tờ ${ans('Việt')} đều bằng ${2 * k} cm, tờ ${ans('Mai')} bằng ${4 * sM} cm. `
      + `Diện tích tờ ${ans('Nam')} là ${wN * hN} cm2 bé hơn tờ ${ans('Việt')} là ${wV * hV} cm2.`);
},
];
