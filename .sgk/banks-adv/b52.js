/* ===== NÂNG CAO — Bài 52: Diện tích hình chữ nhật, diện tích hình vuông ===== */

/* một hình chữ nhật có chiều dài lớn hơn chiều rộng */
const b52advHcn = () => { const r = R(2, 8); return {r: r, d: r + R(1, 7)}; };
const b52advCv = h => (h.d + h.r) * 2;
const b52advDt = h => h.d * h.r;

/* các cách viết diện tích s × s thành chiều dài × chiều rộng */
const b52advCap = {4: [2], 6: [2, 3], 8: [2, 4], 9: [3], 10: [2, 5], 12: [2, 3, 4, 6]};

/* mảnh giấy hình vuông cạnh A cm, kẻ lưới thành n × n ô vuông cạnh b cm */
const b52advPaper = (n, b, A) => {
  const u = Math.round(216 / n), W = n * u;
  let g = '';
  for (let i = 0; i <= n; i++) g += `M${i * u} 0V${W}M0 ${i * u}H${W}`;
  return `<svg viewBox="-28 -30 ${W + 116} ${W + 58}" class="b52adv-fig">
    <rect x="0" y="0" width="${W}" height="${W}" fill="#ffeec2"/>
    <path d="${g}" fill="none" stroke="#c98a00" stroke-width="1.5"/>
    <rect x="0" y="0" width="${W}" height="${W}" fill="none" stroke="#111" stroke-width="2.6"/>
    <text x="${W / 2}" y="-11" text-anchor="middle" font-size="15">${A} cm</text>
    <text x="${W + 12}" y="${W / 2 + 5}" text-anchor="start" font-size="15">${A} cm</text>
    <text x="${u / 2}" y="${u / 2 + 5}" text-anchor="middle" font-size="12" fill="#8a5a00">${b} cm</text>
  </svg>`;
};

ADV.b52 = [

/* 1. Bảng chiều dài – chiều rộng – chu vi – diện tích (có bài toán ngược) */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const A = b52advHcn(), B = b52advHcn(), C = b52advHcn();
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Hình chữ nhật</th><th>(1)</th><th>(2)</th><th>(3)</th></tr>
      <tr><td>Chiều dài</td><td>${A.d} cm</td><td>${q.num(B.d, 2)} cm</td><td>${C.d} cm</td></tr>
      <tr><td>Chiều rộng</td><td>${A.r} cm</td><td>${B.r} cm</td><td>${q.num(C.r, 1)} cm</td></tr>
      <tr><td>Chu vi</td><td>${q.num(b52advCv(A), 2)} cm</td><td>${q.num(b52advCv(B), 2)} cm</td>
        <td>${q.num(b52advCv(C), 2)} cm</td></tr>
      <tr><td>Diện tích</td><td>${q.num(b52advDt(A), 3)} cm<sup>2</sup></td>
        <td>${b52advDt(B)} cm<sup>2</sup></td><td>${b52advDt(C)} cm<sup>2</sup></td></tr>
    </table></div>
    <div class="hint-line">Biết diện tích và một cạnh của hình chữ nhật thì lấy diện tích chia cho
      cạnh đã biết để tìm cạnh còn lại.</div>`,
    `(1) ${A.d} × ${A.r} = ${b52advDt(A)} (cm2); (${A.d} + ${A.r}) × 2 = ${b52advCv(A)} (cm).  `
    + `(2) ${b52advDt(B)} : ${B.r} = ${B.d} (cm); (${B.d} + ${B.r}) × 2 = ${b52advCv(B)} (cm).  `
    + `(3) ${b52advDt(C)} : ${C.d} = ${C.r} (cm); (${C.d} + ${C.r}) × 2 = ${b52advCv(C)} (cm).`);
},

/* 2. So sánh diện tích hai hình */
() => {
  const q = Q(2, 'So sánh diện tích của hai hình rồi điền dấu thích hợp vào ô trống.');
  const a1 = R(4, 9), d1 = R(5, 12), r1 = R(2, 8);
  const r2 = pick([2, 4, 6, 8]), d2 = R(5, 11);
  const bang = R(1, 3) === 1;
  const d3 = bang ? d2 * 2 : R(5, 12), r3 = bang ? r2 / 2 : R(2, 8);
  const r4 = R(2, 7), s4 = R(3, 9);
  const rows = [
    {t: `Hình vuông cạnh ${a1} cm`,
      p: `Hình chữ nhật dài ${d1} cm, rộng ${r1} cm`, l: a1 * a1, v: d1 * r1},
    {t: `Hình chữ nhật dài ${d2} cm, rộng ${r2} cm`,
      p: `Hình chữ nhật dài ${d3} cm, rộng ${r3} cm`, l: d2 * r2, v: d3 * r3},
    {t: `Hình chữ nhật có chiều rộng ${r4} cm, chiều dài gấp đôi chiều rộng`,
      p: `Hình vuông cạnh ${s4} cm`, l: r4 * 2 * r4, v: s4 * s4}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b52adv-side">${x.t}</span>${
        q.sign(x.l > x.v ? '>' : x.l < x.v ? '<' : '=')
      }<span class="side b52adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính diện tích của mỗi hình rồi so sánh ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `a) ${a1} × ${a1} = ${a1 * a1}; ${d1} × ${r1} = ${d1 * r1}.  `
    + `b) ${d2} × ${r2} = ${d2 * r2}; ${d3} × ${r3} = ${d3 * r3}.  `
    + `c) ${r4} × 2 = ${r4 * 2}; ${r4 * 2} × ${r4} = ${r4 * 2 * r4}; ${s4} × ${s4} = ${s4 * s4}.`);
},

/* 3. Biết chu vi và chiều dài gấp mấy lần chiều rộng, tìm diện tích */
() => {
  const q = Q(3, '');
  const r = R(3, 9), k = pick([2, 3]), d = r * k, P = (r + d) * 2;
  return q.done(`<p class="wordq">Một mảnh vườn hình chữ nhật có chu vi ${P} m,
      chiều dài gấp ${k} lần chiều rộng. Tính diện tích mảnh vườn đó.</p>
    <div class="b52adv-step">Nửa chu vi (tổng chiều dài và chiều rộng) là ${q.num(P / 2, 2)} m.</div>
    <div class="b52adv-step">Coi chiều rộng là 1 phần thì chiều dài là ${k} phần,
      nửa chu vi gồm ${q.num(k + 1, 1)} phần bằng nhau.</div>
    <div class="b52adv-step">Chiều rộng mảnh vườn là ${q.num(r, 2)} m.</div>
    <div class="b52adv-step">Chiều dài mảnh vườn là ${q.num(d, 2)} m.</div>
    <div class="b52adv-step">Diện tích mảnh vườn là ${q.num(d * r, 3)} m<sup>2</sup>.</div>`,
    `${P} : 2 = ${P / 2} (m);  ${P / 2} : ${k + 1} = ${r} (m);  ${r} × ${k} = ${d} (m);  `
    + `${d} × ${r} = ${d * r} (m2).`);
},

/* 4. Hình vuông có diện tích bằng diện tích hình chữ nhật */
() => {
  const q = Q(4, '');
  const s = pick([4, 6, 8, 9, 10, 12]);
  const m = pick(b52advCap[s]);
  const d = s * m, r = s / m;
  const cvHv = s * 4, cvHcn = (d + r) * 2;
  const hoi = pick(['lớn hơn', 'bé hơn']);
  const ten = ['hình vuông', 'hình chữ nhật'];
  const dap = hoi === 'lớn hơn' ? 'hình chữ nhật' : 'hình vuông';
  return q.done(`<p class="wordq">Một hình chữ nhật có chiều dài ${d} cm, chiều rộng ${r} cm.
      Một hình vuông có diện tích bằng diện tích hình chữ nhật đó.</p>
    <div class="b52adv-step">Diện tích hình chữ nhật là ${q.num(d * r, 3)} cm<sup>2</sup>.</div>
    <div class="b52adv-step">Cạnh của hình vuông đó dài ${q.num(s, 2)} cm.</div>
    <div class="b52adv-step">Chu vi hình vuông là ${q.num(cvHv, 2)} cm.</div>
    <div class="b52adv-step">Chu vi hình chữ nhật là ${q.num(cvHcn, 3)} cm.</div>
    <div class="fill-line">Hình có chu vi ${hoi} là ${q.pick(dap, ten)}</div>
    <div class="hint-line">Muốn tìm cạnh hình vuông, em hãy tìm số nào nhân với chính nó
      thì được diện tích đã cho.</div>`,
    `${d} × ${r} = ${d * r} (cm2); ${s} × ${s} = ${d * r} nên cạnh hình vuông là ${s} cm.  `
    + `Chu vi: ${s} × 4 = ${cvHv} (cm) và (${d} + ${r}) × 2 = ${cvHcn} (cm).`);
},

/* 5. Cắt mảnh giấy hình vuông thành các hình vuông nhỏ */
() => {
  const q = Q(5, '');
  const n = R(3, 6), b = pick([2, 3]), A = n * b;
  const so = n * n, dtNho = b * b;
  return q.done(`<p class="wordq">Một mảnh giấy hình vuông có cạnh ${A} cm được cắt thành các
      hình vuông nhỏ có cạnh ${b} cm như hình vẽ.</p>`
    + b52advPaper(n, b, A)
    + `<div class="b52adv-step">Mỗi hàng cắt được ${q.num(n, 1)} hình vuông nhỏ.</div>
       <div class="b52adv-step">Cắt được tất cả ${q.num(so, 2)} hình vuông nhỏ.</div>
       <div class="b52adv-step">Diện tích mỗi hình vuông nhỏ là ${q.num(dtNho, 2)} cm<sup>2</sup>.</div>
       <div class="b52adv-step">Diện tích mảnh giấy đó là ${q.num(so * dtNho, 3)} cm<sup>2</sup>.</div>
       <div class="hint-line">Lấy cạnh mảnh giấy chia cho cạnh hình vuông nhỏ để biết mỗi hàng
         có bao nhiêu hình vuông nhỏ.</div>`,
    `${A} : ${b} = ${n} (hình);  ${n} × ${n} = ${so} (hình);  ${b} × ${b} = ${dtNho} (cm2);  `
    + `${dtNho} × ${so} = ${so * dtNho} (cm2).`);
},

/* 6. Dãy hình chữ nhật cùng chiều rộng, chiều dài cách đều */
() => {
  const q = Q(6, '<span class="tag">Số</span> ?');
  const r = R(2, 6), d0 = R(3, 8), b = R(2, 5);
  const L = [0, 1, 2, 3].map(i => d0 + i * b);
  const S = L.map(x => x * r);
  const tenE = S[3] + r * b;
  return q.done(`<p class="wordq">Bốn hình chữ nhật A, B, C, D đều có chiều rộng ${r} cm.
      Chiều dài của chúng được ghi trong bảng sau.</p>
    <div class="tbl-wrap"><table class="tbl green">
      <tr><th>Hình chữ nhật</th><th>A</th><th>B</th><th>C</th><th>D</th></tr>
      <tr><td>Chiều dài</td><td>${L[0]} cm</td><td>${L[1]} cm</td><td>${L[2]} cm</td><td>${L[3]} cm</td></tr>
      <tr><td>Diện tích</td><td>${S[0]} cm<sup>2</sup></td><td>${q.num(S[1], 3)} cm<sup>2</sup></td>
        <td>${q.num(S[2], 3)} cm<sup>2</sup></td><td>${q.num(S[3], 3)} cm<sup>2</sup></td></tr>
    </table></div>
    <div class="b52adv-step">Chiều dài hình sau hơn chiều dài hình trước ${q.num(b, 1)} cm.</div>
    <div class="b52adv-step">Diện tích hình sau hơn diện tích hình trước ${q.num(r * b, 2)} cm<sup>2</sup>.</div>
    <div class="b52adv-step">Hình chữ nhật E cũng có chiều rộng ${r} cm và chiều dài hơn chiều dài
      hình D là ${b} cm thì diện tích hình E là ${q.num(tenE, 3)} cm<sup>2</sup>.</div>`,
    `Diện tích: ${S.join(' cm2, ')} cm2. Mỗi lần chiều dài tăng ${b} cm thì diện tích tăng `
    + `${b} × ${r} = ${r * b} (cm2), nên hình E có diện tích ${S[3]} + ${r * b} = ${tenE} (cm2).`);
},
];
