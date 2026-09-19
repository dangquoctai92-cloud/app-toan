/* ==================== BÀI 52: DIỆN TÍCH HÌNH CHỮ NHẬT, DIỆN TÍCH HÌNH VUÔNG
   (SGK tập 2 – tr.30, 31, 32, 33, 34)
   hoạt động tr.31 : bài 1 (bảng ABCD – BEGC – AEGD), bài 2 (tấm gỗ hình chữ nhật),
                     bài 3 (Bu-ra-ti-nô bẻ miếng sô-cô-la thành bốn miếng)
   hoạt động tr.33 : bài 1 (bảng cạnh – chu vi – diện tích hình vuông),
                     bài 2 (miếng bánh hình vuông, cắt đi một hình vuông ở góc),
                     bài 3 (ghép bốn tấm bìa thành một hình vuông)
   luyện tập tr.34 : bài 1 (hình H gồm hình vuông ABCD và hình chữ nhật DMNP),
                     bài 2 (ba bác kiến rào đất trồng nấm), bài 3 (tấm bìa hình vuông và miếng bìa đỏ),
                     bài 4 (tấm kính lớn cắt ra 3 tấm kính hình chữ nhật)
=========================================================================================== */

/* lưới ô vuông: trả về chuỗi "d" của path */
ART.b52Grid = (cols, rows, u) => {
  let g = '';
  for (let i = 0; i <= cols; i++) g += `M${i * u} 0V${rows * u}`;
  for (let j = 0; j <= rows; j++) g += `M0 ${j * u}H${cols * u}`;
  return g;
};

/* hình chữ nhật lớn chia thành hai hình chữ nhật nhỏ bởi một đoạn thẳng đứng */
ART.b52Split = (d1, d2, h, n) => {
  const u = 30, W = (d1 + d2) * u, H = h * u;
  return `<svg viewBox="-64 -38 ${W + 100} ${H + 76}" class="b52-wide">
    <path d="${ART.b52Grid(d1 + d2, h, u)}" fill="none" stroke="#7fcdec" stroke-width="1"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#111" stroke-width="2.8"/>
    <path d="M${d1 * u} 0V${H}" stroke="#111" stroke-width="2.8"/>
    <text x="0" y="-14" text-anchor="middle" font-size="17" font-weight="700">${n.A}</text>
    <text x="${d1 * u}" y="-14" text-anchor="middle" font-size="17" font-weight="700">${n.B}</text>
    <text x="${W}" y="-14" text-anchor="middle" font-size="17" font-weight="700">${n.E}</text>
    <text x="0" y="${H + 24}" text-anchor="middle" font-size="17" font-weight="700">${n.D}</text>
    <text x="${d1 * u}" y="${H + 24}" text-anchor="middle" font-size="17" font-weight="700">${n.C}</text>
    <text x="${W}" y="${H + 24}" text-anchor="middle" font-size="17" font-weight="700">${n.G}</text>
    <text x="${d1 * u / 2}" y="-14" text-anchor="middle" font-size="15">${d1} cm</text>
    <text x="${d1 * u + d2 * u / 2}" y="-14" text-anchor="middle" font-size="15">${d2} cm</text>
    <text x="-14" y="${H / 2 + 5}" text-anchor="end" font-size="15">${h} cm</text>
  </svg>`;
};

/* tấm gỗ hình chữ nhật */
ART.b52Wood = (d, r) => {
  const u = Math.round(300 / d), W = d * u, H = r * u;
  return `<svg viewBox="-24 -28 ${W + 120} ${H + 60}" class="b52-fig">
    <rect x="0" y="0" width="${W}" height="${H}" rx="3" fill="#d9a066" stroke="#8a5a2b" stroke-width="2.6"/>
    <path d="M0 ${(H * .3).toFixed(1)}H${W}M0 ${(H * .68).toFixed(1)}H${W}" stroke="#bb823f" stroke-width="1.6"/>
    <text x="${W / 2}" y="-10" text-anchor="middle" font-size="15">${d} cm</text>
    <text x="${W + 12}" y="${H / 2 + 5}" text-anchor="start" font-size="15">${r} cm</text>
  </svg>`;
};

/* miếng sô-cô-la ô vuông 1 cm chia thành 4 miếng: vàng | xanh | trắng | tím */
ART.b52Choc = (W, H, a, b, c) => {
  const u = 30, Wp = W * u, Hp = H * u;
  const rc = (x, y, w, h, f) =>
    `<rect x="${x * u}" y="${y * u}" width="${w * u}" height="${h * u}" fill="${f}"/>`;
  return `<svg viewBox="-72 -46 ${Wp + 116} ${Hp + 70}" class="b52-fig">
    ${rc(0, 0, a, H, '#ffe000')}
    ${rc(a, 0, W - a - c, H - b, '#29b6e8')}
    ${rc(W - c, 0, c, H - b, '#ffffff')}
    ${rc(a, H - b, W - a, b, '#5b4ba8')}
    <path d="${ART.b52Grid(W, H, u)}" fill="none" stroke="#333" stroke-width="1.2"/>
    <rect x="0" y="0" width="${Wp}" height="${Hp}" fill="none" stroke="#111" stroke-width="2.6"/>
    <path d="M0 -16h${u}M0 -21v10M${u} -21v10" stroke="#111" stroke-width="1.5"/>
    <path d="M-16 0v${u}M-21 0h10M-21 ${u}h10" stroke="#111" stroke-width="1.5"/>
    <text x="${u / 2}" y="-24" text-anchor="middle" font-size="14">1 cm</text>
    <text x="-24" y="${u / 2 + 5}" text-anchor="end" font-size="14">1 cm</text>
  </svg>`;
};

/* miếng bánh hình vuông, góc trên bên phải là hình vuông bị cắt đi (nét đứt) */
ART.b52Cake = (c, k) => {
  const u = Math.round(210 / c), W = c * u, Kp = k * u;
  return `<svg viewBox="-26 -30 ${W + 130} ${W + 62}" class="b52-fig">
    <rect x="0" y="0" width="${W}" height="${W}" rx="4" fill="#8a5323" stroke="#5a3313" stroke-width="2.6"/>
    <rect x="${W - Kp}" y="0" width="${Kp}" height="${Kp}" fill="#c98a4b"/>
    <path d="M${W - Kp} 0V${Kp}H${W}" fill="none" stroke="#fff" stroke-width="2.2" stroke-dasharray="6 4"/>
    <text x="${W / 2}" y="-11" text-anchor="middle" font-size="15">${c} cm</text>
    <text x="${W + 12}" y="${W / 2 + 5}" text-anchor="start" font-size="15">${c} cm</text>
    <text x="${W - Kp / 2}" y="${Kp + 18}" text-anchor="middle" font-size="14" fill="#fff">${k} cm</text>
  </svg>`;
};

/* bốn tấm bìa ghép được thành một hình vuông 4 x 4 ô, mỗi ô cạnh a cm */
ART.b52Pieces = a => {
  const u = 26;
  const P = [
    {cells: [[0, 0], [1, 0], [0, 1]], f: '#a9d3f0', s: '#3f7fa5'},
    {cells: [[2, 0], [3, 0], [1, 1], [2, 1], [3, 1]], f: '#f6c6d8', s: '#c2185b'},
    {cells: [[0, 2], [0, 3], [1, 3], [2, 3]], f: '#ffe08a', s: '#c99000'},
    {cells: [[1, 2], [2, 2], [3, 2], [3, 3]], f: '#f6a24a', s: '#b45f0c'}
  ];
  return '<div class="b52-row">' + P.map((p, i) => {
    const xs = p.cells.map(c => c[0]), ys = p.cells.map(c => c[1]);
    const mx = Math.min.apply(null, xs), my = Math.min.apply(null, ys);
    const w = Math.max.apply(null, xs) - mx + 1, h = Math.max.apply(null, ys) - my + 1;
    const rects = p.cells.map(c =>
      `<rect x="${(c[0] - mx) * u}" y="${(c[1] - my) * u}" width="${u}" height="${u}"
        fill="${p.f}" stroke="${p.s}" stroke-width="2"/>`).join('');
    const lab = i === 0
      ? `<text x="${u / 2}" y="${h * u + 17}" text-anchor="middle" font-size="13">${a} cm</text>` : '';
    return `<svg viewBox="-5 -5 ${w * u + 10} ${h * u + (i === 0 ? 26 : 10)}"
      class="b52-pc" style="width:${w * u + 10}px">${rects}${lab}</svg>`;
  }).join('') + '</div>';
};

/* hình H: hình vuông ABCD đặt trên hình chữ nhật DMNP */
ART.b52H = (s, L, Wd, n) => {
  const u = 13, S = s * u, LL = L * u, WW = Wd * u;
  return `<svg viewBox="-34 -30 ${LL + 128} ${S + WW + 66}" class="b52-fig">
    <rect x="0" y="0" width="${S}" height="${S}" fill="none" stroke="#111" stroke-width="2.6"/>
    <rect x="0" y="${S}" width="${LL}" height="${WW}" fill="none" stroke="#111" stroke-width="2.6"/>
    <text x="-13" y="-9" text-anchor="middle" font-size="16" font-weight="700">${n.A}</text>
    <text x="${S}" y="-9" text-anchor="middle" font-size="16" font-weight="700">${n.B}</text>
    <text x="-13" y="${S - 4}" text-anchor="middle" font-size="16" font-weight="700">${n.D}</text>
    <text x="${S}" y="${S + 18}" text-anchor="middle" font-size="16" font-weight="700">${n.C}</text>
    <text x="${LL + 13}" y="${S - 4}" text-anchor="middle" font-size="16" font-weight="700">${n.M}</text>
    <text x="-13" y="${S + WW}" text-anchor="middle" font-size="16" font-weight="700">${n.P}</text>
    <text x="${LL + 13}" y="${S + WW}" text-anchor="middle" font-size="16" font-weight="700">${n.N}</text>
    <text x="${S + 10}" y="${S / 2 + 5}" text-anchor="start" font-size="14">${s} cm</text>
    <text x="${LL + 24}" y="${S + WW / 2 + 5}" text-anchor="start" font-size="14">${Wd} cm</text>
    <text x="${LL / 2}" y="${S + WW + 22}" text-anchor="middle" font-size="14">${L} cm</text>
  </svg>`;
};

/* ba mảnh đất trên lưới ô vuông: mảnh hình vuông vẽ nghiêng, hai mảnh hình chữ nhật */
ART.b52Land = plots => {
  const u = 22, rows = 8;
  let x = 1, body = '', lab = '';
  plots.forEach(p => {
    if (p.sq){
      const k = p.sq, vx = k * 4 / 5, vy = k * 3 / 5, y0 = rows - (vx + vy);
      const P = [[x, y0 + vy], [x + vx, y0], [x + vx + vy, y0 + vx], [x + vy, rows]];
      const cx = P.reduce((s, t) => s + t[0], 0) / 4, cy = P.reduce((s, t) => s + t[1], 0) / 4;
      body += `<path d="${P.map((t, i) => (i ? 'L' : 'M') + t[0] * u + ' ' + t[1] * u).join('')}Z"
        fill="${p.fill}" stroke="${p.stroke}" stroke-width="2.4" stroke-linejoin="round"/>`;
      for (let i = 0; i < 4; i++){
        const A = P[i], B = P[(i + 1) % 4];
        const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
        lab += `<text x="${(mx * u + (mx > cx ? 20 : -20)).toFixed(1)}"
          y="${(my * u + (my > cy ? 16 : -6)).toFixed(1)}" text-anchor="middle"
          font-size="13" font-weight="700">${k} cm</text>`;
      }
      x += 7 + 3;
    } else {
      body += `<rect x="${x * u}" y="${(rows - p.h) * u}" width="${p.w * u}" height="${p.h * u}"
        fill="${p.fill}" stroke="${p.stroke}" stroke-width="2.4"/>`;
      lab += `<text x="${(x + p.w / 2) * u}" y="${(rows - p.h) * u - 7}" text-anchor="middle"
          font-size="13" font-weight="700">${p.w} cm</text>
        <text x="${(x + p.w) * u + 7}" y="${(rows - p.h / 2) * u + 5}" text-anchor="start"
          font-size="13" font-weight="700">${p.h} cm</text>`;
      x += p.w + 3;
    }
  });
  const cols = x - 1;
  return `<svg viewBox="-16 -26 ${cols * u + 56} ${rows * u + 50}" class="b52-wide">
    <path d="${ART.b52Grid(cols, rows, u)}" fill="none" stroke="#5b6bbf" stroke-width="1"/>
    ${body}${lab}</svg>`;
};

/* tấm bìa hình vuông, phần bên phải là miếng bìa màu đỏ */
ART.b52Card = (c, r) => {
  const u = Math.round(190 / c), W = c * u, Rw = r * u;
  return `<svg viewBox="-26 -30 ${W + 118} ${W + 58}" class="b52-fig">
    <rect x="${W - Rw}" y="0" width="${Rw}" height="${W}" fill="#e8352e"/>
    <path d="M${W - Rw} 0V${W}" stroke="#111" stroke-width="2" stroke-dasharray="6 4"/>
    <rect x="0" y="0" width="${W}" height="${W}" fill="none" stroke="#111" stroke-width="2.6"/>
    <text x="${W - Rw / 2}" y="-11" text-anchor="middle" font-size="14">${r} cm</text>
    <text x="${W + 12}" y="${W / 2 + 5}" text-anchor="start" font-size="14">${c} cm</text>
  </svg>`;
};

/* tấm kính lớn hình chữ nhật đứng */
ART.b52Glass = (D, Wd) => {
  const u = 2.4, H = (D * u).toFixed(1), W = (Wd * u).toFixed(1);
  return `<svg viewBox="-92 -18 ${(+W + 150).toFixed(1)} ${(+H + 56).toFixed(1)}" class="b52-narrow">
    <rect x="0" y="0" width="${W}" height="${H}" fill="#bfe4f5" stroke="#6b4fa8" stroke-width="3"/>
    <path d="M9 ${(+H - 12).toFixed(1)}L${(+W - 14).toFixed(1)} 22
      M${(+W * .46).toFixed(1)} ${(+H - 12).toFixed(1)}L${(+W - 9).toFixed(1)} ${(+H * .52).toFixed(1)}"
      stroke="#e8f6fd" stroke-width="9" stroke-linecap="round"/>
    <text x="-16" y="${(+H / 2 + 5).toFixed(1)}" text-anchor="end" font-size="15">${D} cm</text>
    <text x="${(+W / 2).toFixed(1)}" y="${(+H + 26).toFixed(1)}" text-anchor="middle" font-size="15">${Wd} cm</text>
  </svg>`;
};

BANKS.b52 = [

/* ===== tr.31 – Bài 1: Số ? (bảng chiều dài – chiều rộng – diện tích của ba hình chữ nhật) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const bag = 'ABCDEGHIKLMNPQ'.split('').sort(() => Math.random() - .5);
  const n = {A: bag[0], B: bag[1], E: bag[2], D: bag[3], C: bag[4], G: bag[5]};
  const h = R(2, 3), d1 = R(h + 2, 8), d2 = R(h + 1, 6);
  const t1 = n.A + n.B + n.C + n.D, t2 = n.B + n.E + n.G + n.C, t3 = n.A + n.E + n.G + n.D;
  const html = ART.b52Split(d1, d2, h, n)
    + `<div class="tbl-wrap"><table class="tbl amber">
        <tr><th>Hình chữ nhật</th><th>${t1}</th><th>${t2}</th><th>${t3}</th></tr>
        <tr><td>Chiều dài</td><td>${d1} cm</td><td>${q.num(d2)} cm</td><td>${q.num(d1 + d2)} cm</td></tr>
        <tr><td>Chiều rộng</td><td>${h} cm</td><td>${q.num(h)} cm</td><td>${q.num(h)} cm</td></tr>
        <tr><td>Diện tích</td><td>${d1 * h} cm<sup>2</sup></td>
          <td>${q.num(d2 * h)} cm<sup>2</sup></td><td>${q.num((d1 + d2) * h)} cm<sup>2</sup></td></tr>
      </table></div>`;
  return q.done(html,
    `${t2}: ${d2} × ${h} = ${d2 * h} (cm2);  ${t3}: ${d1 + d2} × ${h} = ${(d1 + d2) * h} (cm2).`);
},

/* ===== tr.31 – Bài 2: tấm gỗ hình chữ nhật ===== */
() => {
  const q = Q(2, '');
  const r = R(4, 9), d = R(11, 20);
  return q.done(`<p class="wordq">Một tấm gỗ hình chữ nhật có chiều rộng ${r} cm,
      chiều dài ${d} cm. Tính diện tích tấm gỗ đó.</p>`
    + ART.b52Wood(d, r)
    + `<div class="bullet">Diện tích tấm gỗ đó là ${q.num(d * r)} cm<sup>2</sup>.</div>`,
    `${d} × ${r} = ${d * r} (cm2)`);
},

/* ===== tr.31 – Bài 3: Bu-ra-ti-nô bẻ miếng sô-cô-la thành bốn miếng ===== */
() => {
  const q = Q(3, '');
  const a = R(1, 2), c = R(1, 2), b = R(2, 3);
  const W = a + c + R(3, 4), H = b + R(2, 3);
  const vang = a * H, xanh = (W - a - c) * (H - b), trang = c * (H - b), tim = (W - a) * b;
  return q.done(`<p class="wordq">Bu-ra-ti-nô bẻ miếng sô-cô-la thành bốn miếng nhỏ rồi chia cho bốn bạn
      như hình vẽ. Hỏi mỗi bạn nhận được miếng sô-cô-la bao nhiêu xăng-ti-mét vuông?</p>`
    + ART.b52Choc(W, H, a, b, c)
    + `<div class="bullet">Miếng màu vàng: ${q.num(vang)} cm<sup>2</sup>.</div>
       <div class="bullet">Miếng màu xanh: ${q.num(xanh)} cm<sup>2</sup>.</div>
       <div class="bullet">Miếng màu trắng: ${q.num(trang)} cm<sup>2</sup>.</div>
       <div class="bullet">Miếng màu tím: ${q.num(tim)} cm<sup>2</sup>.</div>`,
    `Vàng ${a} × ${H} = ${vang}; xanh ${W - a - c} × ${H - b} = ${xanh}; `
      + `trắng ${c} × ${H - b} = ${trang}; tím ${W - a} × ${b} = ${tim} (cm2).`);
},

/* ===== tr.33 – Bài 1: Số ? (cạnh – chu vi – diện tích hình vuông) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const s = [];
  for (let g = 0; g < 60 && s.length < 3; g++){
    const v = R(2, 9);
    if (!s.includes(v)) s.push(v);
  }
  while (s.length < 3) s.push(s.length + 2);
  const html = `<div class="tbl-wrap"><table class="tbl amber">
      <tr><td>Độ dài cạnh<br>hình vuông</td><td>${s[0]} cm</td><td>${s[1]} cm</td><td>${s[2]} cm</td></tr>
      <tr><td>Chu vi<br>hình vuông</td><td>${s[0] * 4} cm</td>
        <td>${q.num(s[1] * 4)} cm</td><td>${q.num(s[2] * 4)} cm</td></tr>
      <tr><td>Diện tích<br>hình vuông</td><td>${s[0] * s[0]} cm<sup>2</sup></td>
        <td>${q.num(s[1] * s[1])} cm<sup>2</sup></td><td>${q.num(s[2] * s[2])} cm<sup>2</sup></td></tr>
    </table></div>`;
  return q.done(html,
    `Chu vi = cạnh × 4; diện tích = cạnh × cạnh. `
      + `${s[1]}: ${s[1] * 4} cm và ${s[1] * s[1]} cm2;  ${s[2]}: ${s[2] * 4} cm và ${s[2] * s[2]} cm2.`);
},

/* ===== tr.33 – Bài 2: miếng bánh hình vuông, cắt đi một hình vuông ở góc ===== */
() => {
  const q = Q(2, '');
  const c = R(6, 12), k = R(2, c - 3);
  return q.done(`<p class="wordq">Có một miếng bánh hình vuông cạnh ${c} cm.</p>
      <div class="b52-sub"><span class="b52-let">a)</span>Tính diện tích miếng bánh hình vuông đó.</div>
      <div class="b52-sub"><span class="b52-let">b)</span>Nếu cắt đi một hình vuông có cạnh ${k} cm
        ở góc của miếng bánh thì diện tích phần miếng bánh còn lại là bao nhiêu xăng-ti-mét vuông?</div>`
    + ART.b52Cake(c, k)
    + `<div class="bullet">Diện tích miếng bánh hình vuông là ${q.num(c * c)} cm<sup>2</sup>.</div>
       <div class="bullet">Diện tích phần miếng bánh còn lại là ${q.num(c * c - k * k)} cm<sup>2</sup>.</div>`,
    `a) ${c} × ${c} = ${c * c} (cm2).  b) ${k} × ${k} = ${k * k} (cm2); `
      + `${c * c} − ${k * k} = ${c * c - k * k} (cm2).`);
},

/* ===== tr.33 – Bài 3: ghép bốn tấm bìa thành một hình vuông ===== */
() => {
  const q = Q(3, 'Ghép bốn tấm bìa trong hình bên thành một hình vuông. Tính diện tích của hình vuông đó.');
  const a = pick([2, 3]);
  const canh = 4 * a, dt = canh * canh;
  return q.done(ART.b52Pieces(a)
    + `<div class="hint-line">Bốn tấm bìa gồm tất cả 16 ô vuông, mỗi ô vuông có cạnh ${a} cm.</div>
       <div class="bullet">Hình vuông ghép được có cạnh dài ${q.num(canh)} cm.</div>
       <div class="bullet">Diện tích hình vuông đó là ${q.num(dt)} cm<sup>2</sup>.</div>`,
    `16 ô xếp thành hình vuông 4 ô × 4 ô nên cạnh là ${a} × 4 = ${canh} (cm); `
      + `diện tích ${canh} × ${canh} = ${dt} (cm2).`);
},

/* ===== tr.34 – Bài 1: hình H gồm hình vuông ABCD và hình chữ nhật DMNP ===== */
() => {
  const q = Q(1, '');
  const bag = 'ABCDEGHIKLMNPQ'.split('').sort(() => Math.random() - .5);
  const n = {A: bag[0], B: bag[1], C: bag[2], D: bag[3], M: bag[4], N: bag[5], P: bag[6]};
  const s = R(5, 9), L = R(15, 24), Wd = R(6, 12);
  const sq = n.A + n.B + n.C + n.D, rc = n.D + n.M + n.N + n.P;
  return q.done(`<p class="wordq">Hình <i>H</i> gồm hình vuông ${sq} và hình chữ nhật ${rc} như hình bên.</p>`
    + ART.b52H(s, L, Wd, n)
    + `<div class="b52-sub"><span class="b52-let">a)</span>Tính diện tích hình vuông ${sq}
        và diện tích hình chữ nhật ${rc}.</div>
       <div class="bullet">Diện tích hình vuông ${sq} là ${q.num(s * s)} cm<sup>2</sup>.</div>
       <div class="bullet">Diện tích hình chữ nhật ${rc} là ${q.num(L * Wd)} cm<sup>2</sup>.</div>
       <div class="b52-sub"><span class="b52-let">b)</span>Tính diện tích hình <i>H</i>.</div>
       <div class="bullet">Diện tích hình <i>H</i> là ${q.num(s * s + L * Wd)} cm<sup>2</sup>.</div>`,
    `a) ${s} × ${s} = ${s * s} (cm2); ${L} × ${Wd} = ${L * Wd} (cm2).  `
      + `b) ${s * s} + ${L * Wd} = ${s * s + L * Wd} (cm2).`);
},

/* ===== tr.34 – Bài 2: ba bác kiến rào đất trồng nấm ===== */
() => {
  const q = Q(2, 'Ba bác kiến rào đất để trồng nấm. Kiến lửa rào mảnh đất màu đỏ. Kiến gió rào mảnh đất màu xanh. Kiến bọ dọt rào mảnh đất màu nâu.');
  const PAIRS = [[2, 8], [3, 7], [4, 6]].sort(() => Math.random() - .5).slice(0, 2);
  const shapes = [{sq: 5},
    {w: PAIRS[0][0], h: PAIRS[0][1]}, {w: PAIRS[1][1], h: PAIRS[1][0]}]
    .sort(() => Math.random() - .5);
  const NAME = ['Đỏ', 'Xanh', 'Nâu'];
  const FILL = ['#e8352e', '#9fdcf5', '#cf8a5a'], STK = ['#a01810', '#3f8fb5', '#8a5228'];
  const plots = shapes.map((sh, i) => Object.assign({}, sh, {fill: FILL[i], stroke: STK[i]}));
  const dt = shapes.map(sh => sh.sq ? sh.sq * sh.sq : sh.w * sh.h);
  const lonNhat = NAME[dt.indexOf(Math.max.apply(null, dt))];
  const html = ART.b52Land(plots)
    + `<div class="b52-sub"><span class="b52-let">a)</span><span class="tag">Số</span> ?</div>
       <div class="tbl-wrap"><table class="tbl amber">
        <tr><th>Mảnh đất</th><th>${NAME[0]}</th><th>${NAME[1]}</th><th>${NAME[2]}</th></tr>
        <tr><td>Chu vi (cm)</td><td>${q.num(20)}</td><td>${q.num(20)}</td><td>${q.num(20)}</td></tr>
        <tr><td>Diện tích (cm<sup>2</sup>)</td>
          <td>${q.num(dt[0])}</td><td>${q.num(dt[1])}</td><td>${q.num(dt[2])}</td></tr>
      </table></div>
      <div class="b52-sub"><span class="b52-let">b)</span>Mảnh đất nào có diện tích lớn nhất?</div>
      <div class="fill-line">Mảnh đất có diện tích lớn nhất là mảnh màu ${q.pick(lonNhat, NAME)}</div>`;
  return q.done(html,
    `Ba mảnh đất đều có chu vi 20 cm. Diện tích: ${NAME[0]} ${dt[0]} cm2, `
      + `${NAME[1]} ${dt[1]} cm2, ${NAME[2]} ${dt[2]} cm2 nên mảnh ${lonNhat.toLowerCase()} lớn nhất.`);
},

/* ===== tr.34 – Bài 3: tấm bìa hình vuông và miếng bìa màu đỏ ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const c = pick([6, 8, 10, 12]), r = c / 2;
  return q.done(ART.b52Card(c, r)
    + `<p class="wordq">Diện tích tấm bìa hình vuông gấp đôi diện tích miếng bìa màu đỏ.</p>
       <div class="fill-line">Diện tích miếng bìa màu đỏ là ${q.num(r * c)} cm<sup>2</sup>.</div>
       <div class="fill-line">Diện tích tấm bìa hình vuông là ${q.num(c * c)} cm<sup>2</sup>.</div>`,
    `Miếng bìa đỏ: ${r} × ${c} = ${r * c} (cm2); tấm bìa hình vuông: ${r * c} × 2 = ${c * c} (cm2).`);
},

/* ===== tr.34 – Bài 4: tấm kính lớn cắt ra ba tấm kính hình chữ nhật ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const soTam = 3, rong = 10, dai = pick([80, 90, 100]);
  const Wd = soTam * rong, D = dai + pick([5, 10, 15]);
  const conLai = D * Wd - soTam * dai * rong;
  return q.done(`<p class="wordq">Có một tấm kính lớn như hình vẽ bên. Người ta cắt ra ${soTam} tấm kính
      hình chữ nhật để lắp vào cửa chớp, mỗi tấm có chiều dài ${dai} cm, chiều rộng ${rong} cm.</p>`
    + ART.b52Glass(D, Wd)
    + `<div class="bullet">Diện tích tấm kính lớn là ${q.num(D * Wd)} cm<sup>2</sup>.</div>
       <div class="bullet">Diện tích ${soTam} tấm kính đã cắt là ${q.num(soTam * dai * rong)} cm<sup>2</sup>.</div>
       <div class="bullet">Phần kính còn lại có diện tích là ${q.num(conLai)} cm<sup>2</sup>.</div>`,
    `${D} × ${Wd} = ${D * Wd} (cm2); ${dai} × ${rong} × ${soTam} = ${soTam * dai * rong} (cm2); `
      + `${D * Wd} − ${soTam * dai * rong} = ${conLai} (cm2).`);
},
];
