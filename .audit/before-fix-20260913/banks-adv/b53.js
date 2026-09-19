/*CSS
.b53adv-fig{width:100%;max-width:320px;height:auto;display:block;margin:6px auto}
.cmp-row .b53adv-side{min-width:132px;font-size:17px;font-weight:700;text-align:left}
.b53adv-sub{font-weight:700;margin:9px 0 2px}
.b53adv-let{color:#d63384;font-weight:800;margin-right:5px}
.b53adv-step{margin:5px 0}
CSS*/

/* ===== NÂNG CAO — Bài 53: Luyện tập chung (chu vi và diện tích) ===== */

/* ba giá trị khác nhau lấy trong mảng */
const b53advBa = arr => {
  const v = [];
  for (let g = 0; g < 60 && v.length < 3; g++){ const x = pick(arr); if (!v.includes(x)) v.push(x); }
  while (v.length < 3) v.push(arr[v.length]);
  return v;
};

/* hình chữ nhật bị cắt đi một hình vuông cạnh c ở góc trên bên phải */
const b53advNotch = (D, W, c) => {
  const u = Math.round(232 / D), Wp = D * u, Hp = W * u, cp = c * u;
  return `<svg viewBox="-34 -34 ${Wp + 120} ${Hp + 74}" class="b53adv-fig">
    <path d="M0 0H${Wp - cp}V${cp}H${Wp}V${Hp}H0Z" fill="#cfe9f7" stroke="#111"
      stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M${Wp - cp} 0H${Wp}V${cp}" fill="none" stroke="#c2185b" stroke-width="2"
      stroke-dasharray="6 4"/>
    <text x="${Wp / 2}" y="${Hp + 26}" text-anchor="middle" font-size="15">${D} cm</text>
    <text x="-12" y="${Hp / 2 + 5}" text-anchor="end" font-size="15">${W} cm</text>
    <text x="${Wp - cp / 2}" y="-11" text-anchor="middle" font-size="13" fill="#c2185b">${c} cm</text>
    <text x="${Wp + 10}" y="${cp / 2 + 5}" text-anchor="start" font-size="13" fill="#c2185b">${c} cm</text>
    <text x="${Wp / 2 - cp}" y="${Hp / 2 + 6}" text-anchor="middle" font-size="17"
      font-weight="700">Hình <tspan font-style="italic">H</tspan></text>
  </svg>`;
};

ADV.b53 = [

/* 1. Bảng cạnh – chu vi – diện tích hình vuông (có bài toán ngược) */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const s = b53advBa([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Hình vuông</th><th>(1)</th><th>(2)</th><th>(3)</th></tr>
      <tr><td>Độ dài cạnh</td><td>${s[0]} cm</td><td>${q.num(s[1], 2)} cm</td>
        <td>${q.num(s[2], 2)} cm</td></tr>
      <tr><td>Chu vi</td><td>${q.num(s[0] * 4, 2)} cm</td><td>${s[1] * 4} cm</td>
        <td>${q.num(s[2] * 4, 2)} cm</td></tr>
      <tr><td>Diện tích</td><td>${q.num(s[0] * s[0], 3)} cm<sup>2</sup></td>
        <td>${q.num(s[1] * s[1], 3)} cm<sup>2</sup></td><td>${s[2] * s[2]} cm<sup>2</sup></td></tr>
    </table></div>
    <div class="hint-line">Chu vi = cạnh × 4; cạnh = chu vi : 4; diện tích = cạnh × cạnh.
      Biết diện tích, em hãy tìm số nào nhân với chính nó thì được diện tích đó.</div>`,
    `(1) ${s[0]} × 4 = ${s[0] * 4} (cm); ${s[0]} × ${s[0]} = ${s[0] * s[0]} (cm2).  `
    + `(2) ${s[1] * 4} : 4 = ${s[1]} (cm); ${s[1]} × ${s[1]} = ${s[1] * s[1]} (cm2).  `
    + `(3) ${s[2]} × ${s[2]} = ${s[2] * s[2]} nên cạnh là ${s[2]} cm; ${s[2]} × 4 = ${s[2] * 4} (cm).`);
},

/* 2. Đổi đơn vị đo rồi tính chu vi, diện tích và so sánh */
() => {
  const q = Q(2, '');
  const a = R(2, 4), b = R(3, 9);
  const dai = a * 10, cvHcn = (dai + b) * 2, dtHcn = dai * b;
  const c = R(2, 3), cvHv = c * 4, cvHvCm = c * 40;
  return q.done(`<div class="b53adv-sub"><span class="b53adv-let">a)</span>Một hình chữ nhật có
      chiều dài ${a} dm, chiều rộng ${b} cm.</div>
    <div class="b53adv-step">Đổi ${a} dm = ${q.num(dai, 2)} cm.</div>
    <div class="b53adv-step">Chu vi hình chữ nhật đó là ${q.num(cvHcn, 3)} cm.</div>
    <div class="b53adv-step">Diện tích hình chữ nhật đó là ${q.num(dtHcn, 3)} cm<sup>2</sup>.</div>
    <div class="b53adv-sub"><span class="b53adv-let">b)</span>Một hình vuông có cạnh ${c} dm.</div>
    <div class="b53adv-step">Chu vi hình vuông đó là ${q.num(cvHv, 2)} dm, tức là
      ${q.num(cvHvCm, 3)} cm.</div>
    <div class="b53adv-sub"><span class="b53adv-let">c)</span>So sánh chu vi hai hình trên.</div>
    <div class="cmp-row"><span class="side b53adv-side">Chu vi hình vuông</span>${
      q.sign(cvHvCm > cvHcn ? '>' : cvHvCm < cvHcn ? '<' : '=')
    }<span class="side b53adv-side">Chu vi hình chữ nhật</span></div>
    <div class="hint-line">Phải đổi về cùng một đơn vị đo rồi mới tính và so sánh ·
      1 dm = 10 cm</div>`,
    `a) ${a} dm = ${dai} cm; (${dai} + ${b}) × 2 = ${cvHcn} (cm); ${dai} × ${b} = ${dtHcn} (cm2).  `
    + `b) ${c} × 4 = ${cvHv} (dm) = ${cvHvCm} cm.  c) ${cvHvCm} cm và ${cvHcn} cm.`);
},

/* 3. Ba mảnh vườn có cùng chu vi nhưng diện tích khác nhau */
() => {
  const q = Q(3, 'Ba mảnh vườn A, B, C đều có chu vi bằng nhau. Quan sát bảng rồi trả lời.');
  const k = pick([10, 12, 14, 16, 18]);
  const rs = b53advBa([1, 2, 3, 4, 5, 6, 7, 8, 9].filter(x => x <= k / 2));
  const P = k * 2;
  const NAME = ['A', 'B', 'C'];
  const dt = rs.map(r => r * (k - r));
  const maxV = Math.max.apply(null, dt), minV = Math.min.apply(null, dt);
  const lon = NAME[dt.indexOf(maxV)], be = NAME[dt.indexOf(minV)];
  return q.done(`<div class="tbl-wrap"><table class="tbl green">
      <tr><th>Mảnh vườn</th><th>A</th><th>B</th><th>C</th></tr>
      <tr><td>Chiều dài</td><td>${k - rs[0]} m</td><td>${k - rs[1]} m</td><td>${k - rs[2]} m</td></tr>
      <tr><td>Chiều rộng</td><td>${rs[0]} m</td><td>${rs[1]} m</td><td>${rs[2]} m</td></tr>
      <tr><td>Chu vi</td><td>${q.num(P, 2)} m</td><td>${q.num(P, 2)} m</td><td>${q.num(P, 2)} m</td></tr>
      <tr><td>Diện tích</td><td>${q.num(dt[0], 2)} m<sup>2</sup></td>
        <td>${q.num(dt[1], 2)} m<sup>2</sup></td><td>${q.num(dt[2], 2)} m<sup>2</sup></td></tr>
    </table></div>
    <div class="fill-line">Mảnh vườn có diện tích lớn nhất là mảnh ${q.pick(lon, NAME)}</div>
    <div class="fill-line">Mảnh vườn có diện tích bé nhất là mảnh ${q.pick(be, NAME)}</div>
    <div class="fill-line">Diện tích mảnh lớn nhất hơn diện tích mảnh bé nhất
      ${q.num(maxV - minV, 2)} m<sup>2</sup>.</div>
    <div class="hint-line">Các hình chữ nhật có cùng chu vi vẫn có thể có diện tích khác nhau.</div>`,
    `Ba mảnh đều có chu vi (${k - rs[0]} + ${rs[0]}) × 2 = ${P} (m). `
    + `Diện tích: A ${dt[0]} m2, B ${dt[1]} m2, C ${dt[2]} m2; ${maxV} − ${minV} = ${maxV - minV} (m2).`);
},

/* 4. Toán ngược: từ diện tích tìm chu vi rồi tìm hình vuông có cùng chu vi */
() => {
  const q = Q(4, '');
  const r = R(2, 6), d = r + 2 * R(1, 4);
  const S = d * r, P = (d + r) * 2, s = (d + r) / 2;
  return q.done(`<p class="wordq">Một tấm bìa hình chữ nhật có diện tích ${S} cm<sup>2</sup>,
      chiều rộng ${r} cm. Một tấm bìa hình vuông có chu vi bằng chu vi tấm bìa hình chữ nhật đó.</p>
    <div class="b53adv-step">Chiều dài tấm bìa hình chữ nhật là ${q.num(d, 2)} cm.</div>
    <div class="b53adv-step">Chu vi tấm bìa hình chữ nhật là ${q.num(P, 2)} cm.</div>
    <div class="b53adv-step">Cạnh tấm bìa hình vuông là ${q.num(s, 2)} cm.</div>
    <div class="b53adv-step">Diện tích tấm bìa hình vuông là ${q.num(s * s, 3)} cm<sup>2</sup>.</div>
    <div class="b53adv-step">Diện tích tấm bìa hình vuông hơn diện tích tấm bìa hình chữ nhật
      ${q.num(s * s - S, 3)} cm<sup>2</sup>.</div>
    <div class="hint-line">Lấy diện tích chia cho chiều rộng thì được chiều dài.</div>`,
    `${S} : ${r} = ${d} (cm);  (${d} + ${r}) × 2 = ${P} (cm);  ${P} : 4 = ${s} (cm);  `
    + `${s} × ${s} = ${s * s} (cm2);  ${s * s} − ${S} = ${s * s - S} (cm2).`);
},

/* 5. Cắt tấm bìa hình chữ nhật thành các hình vuông bằng nhau */
() => {
  const q = Q(5, '');
  const c = pick([2, 3]), n1 = R(4, 9), n2 = R(2, n1 - 1);
  const D = c * n1, W = c * n2;
  const so = n1 * n2, dtNho = c * c;
  return q.done(`<p class="wordq">Một tấm bìa hình chữ nhật có chiều dài ${D} cm,
      chiều rộng ${W} cm. Người ta cắt tấm bìa đó thành các hình vuông có cạnh ${c} cm.</p>
    <div class="b53adv-step">Mỗi hàng cắt được ${q.num(n1, 1)} hình vuông.</div>
    <div class="b53adv-step">Cắt được ${q.num(n2, 1)} hàng như thế.</div>
    <div class="b53adv-step">Cắt được tất cả ${q.num(so, 2)} hình vuông.</div>
    <div class="b53adv-step">Diện tích mỗi hình vuông là ${q.num(dtNho, 2)} cm<sup>2</sup>.</div>
    <div class="b53adv-step">Diện tích tấm bìa là ${q.num(so * dtNho, 3)} cm<sup>2</sup>.</div>
    <div class="b53adv-step">Chu vi tấm bìa là ${q.num((D + W) * 2, 3)} cm.</div>
    <div class="hint-line">Lấy chiều dài chia cho cạnh hình vuông để biết mỗi hàng cắt được
      bao nhiêu hình, lấy chiều rộng chia cho cạnh hình vuông để biết có bao nhiêu hàng.</div>`,
    `${D} : ${c} = ${n1} (hình);  ${W} : ${c} = ${n2} (hàng);  ${n1} × ${n2} = ${so} (hình);  `
    + `${c} × ${c} = ${dtNho} (cm2);  ${dtNho} × ${so} = ${so * dtNho} (cm2);  `
    + `(${D} + ${W}) × 2 = ${(D + W) * 2} (cm).`);
},

/* 6. Hình H: hình chữ nhật cắt đi một hình vuông ở góc */
() => {
  const q = Q(6, '');
  const W = R(5, 8), D = R(9, 14), c = R(2, W - 2);
  const dtHcn = D * W, dtCat = c * c;
  return q.done(`<p class="wordq">Từ một tấm bìa hình chữ nhật có chiều dài ${D} cm,
      chiều rộng ${W} cm, người ta cắt đi ở một góc một hình vuông cạnh ${c} cm
      để được hình <i>H</i> như hình vẽ.</p>`
    + b53advNotch(D, W, c)
    + `<div class="b53adv-step">Diện tích tấm bìa hình chữ nhật là
        ${q.num(dtHcn, 3)} cm<sup>2</sup>.</div>
       <div class="b53adv-step">Diện tích hình vuông cắt đi là ${q.num(dtCat, 2)} cm<sup>2</sup>.</div>
       <div class="b53adv-step">Diện tích hình <i>H</i> là ${q.num(dtHcn - dtCat, 3)} cm<sup>2</sup>.</div>
       <div class="b53adv-step">Chu vi hình <i>H</i> là ${q.num((D + W) * 2, 3)} cm.</div>
       <div class="hint-line">Hai cạnh mới của hình <i>H</i> dài đúng bằng hai phần vừa bị cắt đi,
         nên chu vi hình <i>H</i> bằng chu vi tấm bìa hình chữ nhật lúc đầu.</div>`,
    `${D} × ${W} = ${dtHcn} (cm2);  ${c} × ${c} = ${dtCat} (cm2);  `
    + `${dtHcn} − ${dtCat} = ${dtHcn - dtCat} (cm2);  (${D} + ${W}) × 2 = ${(D + W) * 2} (cm).`);
},
];
