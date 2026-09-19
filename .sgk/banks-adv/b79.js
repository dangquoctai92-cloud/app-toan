/* ===== NÂNG CAO — Bài 79: Ôn tập hình học và đo lường =====
   Dùng lại của phần cơ bản: SP79 (viết 60 000), TEN79 (bộ bốn chữ cái),
   ART.b79HinhH, ART.b79Clock, VO79, HOP79.
   Hàm riêng của phần nâng cao đặt tiền tố b79adv. */

/* so sánh: cho vế trái, sinh vế phải bằng / lớn hơn / bé hơn rồi trả về dấu đúng */
const b79advCmp = (v, step, maxd) => {
  const k = R(1, 3);
  const d = R(1, maxd || 9) * step;
  let right = v;
  if (k === 2) right = v + d;
  else if (k === 3) right = (v - d > 0) ? v - d : v + d;
  return {right, s: v > right ? '>' : (v < right ? '<' : '=')};
};

/* ---- đoạn thẳng AB với hai trung điểm N, M (N là trung điểm của AM) ---- */
ART.b79advSeg = (A, N, M, B, L) => {
  const y = 60, x0 = 46, x1 = 326, mid = (x0 + x1) / 2;
  const px = f => x0 + (x1 - x0) * f;
  const pt = (x, t) => `<circle cx="${x}" cy="${y}" r="4.6" fill="#2b2b38"/>
    <text x="${x}" y="${y - 14}" text-anchor="middle" font-size="18" font-weight="700"
      fill="#2b2b38">${t}</text>`;
  return `<svg viewBox="0 0 372 116" class="b79adv-seg">
    <line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#2b2b38" stroke-width="3.2"/>
    ${pt(px(0), A)}${pt(px(0.25), N)}${pt(px(0.5), M)}${pt(px(1), B)}
    <line x1="${x0}" y1="${y + 26}" x2="${x1}" y2="${y + 26}" stroke="#5b7fa8" stroke-width="2"/>
    <line x1="${x0}" y1="${y + 18}" x2="${x0}" y2="${y + 34}" stroke="#5b7fa8" stroke-width="2"/>
    <line x1="${x1}" y1="${y + 18}" x2="${x1}" y2="${y + 34}" stroke="#5b7fa8" stroke-width="2"/>
    <rect x="${mid - 36}" y="${y + 14}" width="72" height="24" fill="#fff"/>
    <text x="${mid}" y="${y + 32}" text-anchor="middle" font-size="15" font-weight="700"
      fill="#2b5b8a">${L} cm</text>
  </svg>`;
};

ADV.b79 = [

/* 1. Trung điểm của trung điểm — độ dài các đoạn thẳng */
() => {
  const T = pick(TEN79);
  const A = T[0], B = T[1], M = T[2], N = T[3];
  const k = R(3, 15);
  const L = 4 * k;
  const q = Q(1, `Đoạn thẳng ${A}${B} dài ${L} cm. ${M} là trung điểm của đoạn thẳng ${A}${B},
    ${N} là trung điểm của đoạn thẳng ${A}${M} (như hình vẽ).`);
  const html = ART.b79advSeg(A, N, M, B, L)
    + `<div class="b79-line">Đoạn thẳng ${A}${M} dài ${q.num(2 * k)} cm.</div>
      <div class="b79-line">Đoạn thẳng ${A}${N} dài ${q.num(k)} cm.</div>
      <div class="b79-line">Đoạn thẳng ${N}${M} dài ${q.num(k)} cm.</div>
      <div class="b79-line">Đoạn thẳng ${N}${B} dài ${q.num(3 * k)} cm.</div>
      <div class="b79-line">Trên hình vẽ có tất cả ${q.num(6, 1)} đoạn thẳng.</div>
      <div class="hint-line">Trung điểm chia đoạn thẳng thành hai phần bằng nhau.
        Đếm đoạn thẳng thì đếm lần lượt các đoạn thẳng có đầu là ${A}, rồi đến ${N},
        rồi đến ${M}<span></span>.</div>`;
  return q.done(html,
    `${A}${M} = ${M}${B} = ${L} : 2 = ${2 * k} (cm). `
    + `${A}${N} = ${N}${M} = ${2 * k} : 2 = ${k} (cm). `
    + `${N}${B} = ${L} &minus; ${k} = ${3 * k} (cm). `
    + `Các đoạn thẳng có trên hình vẽ là: ${A}${N}, ${A}${M}, ${A}${B}, ${N}${M}, `
    + `${N}${B}, ${M}${B}, tất cả có 6 đoạn thẳng.`);
},

/* 2. Biết chu vi và chiều dài — so với hình vuông có cùng chu vi */
() => {
  const q = Q(2, '');
  const rong = R(4, 12), them = R(1, 5) * 2;
  const dai = rong + them;
  const cv = (dai + rong) * 2;
  const canh = cv / 4;
  const dtcn = dai * rong, dtv = canh * canh;
  const html = `<p class="wordq">Một mảnh vườn hình chữ nhật có chu vi ${cv} m,
      chiều dài ${dai} m. Một mảnh vườn hình vuông có chu vi bằng chu vi mảnh vườn
      hình chữ nhật đó.</p>
    <div class="bullet">Chiều rộng mảnh vườn hình chữ nhật là ${q.num(rong)} m.</div>
    <div class="bullet">Diện tích mảnh vườn hình chữ nhật là ${q.num(dtcn)} m<sup>2</sup>.</div>
    <div class="bullet">Cạnh mảnh vườn hình vuông là ${q.num(canh)} m.</div>
    <div class="bullet">Diện tích mảnh vườn hình vuông là ${q.num(dtv)} m<sup>2</sup>.</div>
    <div class="bullet">Diện tích mảnh vườn hình vuông hơn diện tích mảnh vườn hình chữ nhật
      ${q.num(dtv - dtcn)} m<sup>2</sup>.</div>
    <div class="hint-line">Nửa chu vi hình chữ nhật bằng tổng của chiều dài và chiều rộng.
      Cạnh hình vuông bằng chu vi chia cho 4.</div>`;
  return q.done(html,
    `Nửa chu vi: ${cv} : 2 = ${dai + rong} (m). Chiều rộng: ${dai + rong} &minus; ${dai} = ${rong} (m). `
    + `Diện tích hình chữ nhật: ${dai} × ${rong} = ${dtcn} (m2). `
    + `Cạnh hình vuông: ${cv} : 4 = ${canh} (m). `
    + `Diện tích hình vuông: ${canh} × ${canh} = ${dtv} (m2). `
    + `${dtv} &minus; ${dtcn} = ${dtv - dtcn} (m2).`);
},

/* 3. Chu vi hình H và diện tích hình H tính bằng hai cách */
() => {
  const q = Q(3, 'Hình H được ghép bởi hai hình chữ nhật, có kích thước như hình vẽ.');
  const lw = R(3, 6), lh = R(2, 4);
  const rw = R(4, 7), rh = lh + R(2, 4);
  const day = lw + rw;
  const cv = (day + rh) * 2;
  const s1 = lw * lh, s2 = rw * rh, dt = s1 + s2;
  const big = day * rh, cut = lw * (rh - lh);
  const html = ART.b79HinhH(lw, lh, rw, rh)
    + `<div class="b79-sub"><span class="b79-let">a)</span>Tính chu vi hình H.</div>
      <div class="b79-line">Cạnh đáy của hình H dài ${q.num(day)} cm.</div>
      <div class="b79-line">Chu vi hình H là ${q.num(cv)} cm.</div>
      <div class="b79-sub"><span class="b79-let">b)</span>Tính diện tích hình H bằng hai cách.</div>
      <div class="b79adv-box">
        <div class="b79-line">Cách 1: chia hình H thành hai hình chữ nhật.</div>
        <div class="b79-line">Hình chữ nhật bên trái có diện tích ${q.num(s1)} cm<sup>2</sup>,
          hình chữ nhật bên phải có diện tích ${q.num(s2)} cm<sup>2</sup>.</div>
        <div class="b79-line">Diện tích hình H là ${q.num(dt)} cm<sup>2</sup>.</div>
      </div>
      <div class="b79adv-note">
        <div class="b79-line">Cách 2: lấy hình chữ nhật lớn bớt đi phần khuyết ở góc trên bên trái.</div>
        <div class="b79-line">Hình chữ nhật lớn có diện tích ${q.num(big)} cm<sup>2</sup>,
          phần khuyết có diện tích ${q.num(cut)} cm<sup>2</sup>.</div>
        <div class="b79-line">Diện tích hình H là ${q.num(dt)} cm<sup>2</sup>.</div>
      </div>
      <div class="hint-line">Phần khuyết ở góc trên bên trái là hình chữ nhật có hai cạnh là
        ${lw} cm và ${rh} &minus; ${lh} = ${rh - lh} (cm). Hai cách tính đều cho cùng
        một kết quả.</div>`;
  return q.done(html,
    `a) Cạnh đáy: ${lw} + ${rw} = ${day} (cm). Chu vi hình H: (${day} + ${rh}) × 2 = ${cv} (cm). `
    + `b) Cách 1: ${lw} × ${lh} = ${s1} (cm2); ${rw} × ${rh} = ${s2} (cm2); `
    + `${s1} + ${s2} = ${dt} (cm2). `
    + `Cách 2: ${day} × ${rh} = ${big} (cm2); ${lw} × ${rh - lh} = ${cut} (cm2); `
    + `${big} &minus; ${cut} = ${dt} (cm2).`);
},

/* 4. Đổi đơn vị đo rồi tính, so sánh các số đo */
() => {
  const q = Q(4, 'Đổi ra cùng một đơn vị đo rồi tính và so sánh.');
  const L = '<i>l</i>';
  /* a) tính với hai đơn vị đo khác nhau */
  const a1 = R(2, 9), b1 = R(1, 9);
  const a2 = R(2, 9), b2 = R(1, 9);
  const a3 = R(2, 9), b3 = R(1, 9) * 100;
  const a4 = R(2, 9), b4 = R(1, 9) * 100;
  /* b) so sánh hai số đo */
  const c1 = R(2, 9), v1 = c1 * 10, r1 = b79advCmp(v1, 1, 9);
  const c2 = R(2, 9), v2 = c2 * 1000, r2 = b79advCmp(v2, 100, 9);
  const c3 = R(3, 9), k3 = R(2, 4), v3 = c3 * k3 * 10, r3 = b79advCmp(v3, 10, 5);
  const c4 = R(2, 9), k4 = R(2, 4), v4 = c4 * 1000, r4 = b79advCmp(v4, 100, 5);
  const cmp = (t, r, p) => `<div class="cmp-row"><span class="side">${t}</span>${
    q.sign(r.s)}<span class="side">${SP79(r.right)} ${p}</span></div>`;
  const html = `<div class="b79-sub"><span class="b79-let">a)</span><span class="tag">Số</span> ?</div>
    <div class="b79adv-two">
      <div>
        <div class="b79-conv">${a1} m + ${b1} dm = ${q.num(a1 * 10 + b1)} dm</div>
        <div class="b79-conv">${a2} cm + ${b2} mm = ${q.num(a2 * 10 + b2)} mm</div>
      </div>
      <div>
        <div class="b79-conv">${a3} kg &minus; ${SP79(b3)} g = ${q.num(a3 * 1000 - b3)} g</div>
        <div class="b79-conv">${a4} ${L} + ${SP79(b4)} ml = ${q.num(a4 * 1000 + b4)} ml</div>
      </div>
    </div>
    <div class="b79-sub"><span class="b79-let">b)</span>Điền dấu &gt;, &lt;, = thích hợp.</div>
    <div class="b79adv-cmp">
      ${cmp(`${c1} m`, r1, 'dm')}
      ${cmp(`${SP79(c2)} kg`, r2, 'g')}
      ${cmp(`${c3} cm × ${k3}`, r3, 'mm')}
      ${cmp(`${SP79(c4 * k4)} ${L} : ${k4}`, r4, 'ml')}
    </div>
    <div class="hint-line">Chạm vào ô dấu để đổi &gt; &lt; = . Muốn so sánh hai số đo, trước hết
      phải đổi chúng về cùng một đơn vị đo.</div>`;
  return q.done(html,
    `a) ${a1} m = ${a1 * 10} dm nên ${a1} m + ${b1} dm = ${a1 * 10 + b1} dm; `
    + `${a2} cm + ${b2} mm = ${a2 * 10 + b2} mm; `
    + `${a3} kg &minus; ${SP79(b3)} g = ${SP79(a3 * 1000)} g &minus; ${SP79(b3)} g `
    + `= ${SP79(a3 * 1000 - b3)} g; `
    + `${a4} l + ${SP79(b4)} ml = ${SP79(a4 * 1000 + b4)} ml. `
    + `b) ${c1} m = ${v1} dm; ${SP79(c2)} kg = ${SP79(v2)} g; `
    + `${c3} cm × ${k3} = ${c3 * k3} cm = ${SP79(v3)} mm; `
    + `${SP79(c4 * k4)} l : ${k4} = ${c4} l = ${SP79(v4)} ml.`);
},

/* 5. Xem đồng hồ: cách đọc giờ kém và khoảng thời gian giữa hai đồng hồ */
() => {
  const q = Q(5, 'Xem hai đồng hồ dưới đây rồi trả lời các câu hỏi.');
  const h1 = R(1, 10);
  const m1 = pick([35, 40, 45, 50, 55]);
  const them = pick([10, 15, 20, 25, 30].filter(d => (m1 + d) % 60 !== 0));
  const tong = m1 + them;
  const h2 = h1 + Math.floor(tong / 60), m2 = tong % 60;
  const html = `<div class="b79-clocks">
      <div>${ART.b79Clock(h1, m1)}<div class="b79-ctime">Đồng hồ A</div></div>
      <div>${ART.b79Clock(h2, m2)}<div class="b79-ctime">Đồng hồ B</div></div>
    </div>
    <div class="b79-sub"><span class="b79-let">a)</span>Đồng hồ A chỉ mấy giờ?</div>
    <div class="b79-line">Đồng hồ A chỉ ${q.num(h1)} giờ ${q.num(m1, 2)} phút,
      hay còn đọc là ${q.num(h1 + 1)} giờ kém ${q.num(60 - m1, 2)} phút.</div>
    <div class="b79-sub"><span class="b79-let">b)</span>Đồng hồ B chỉ mấy giờ?</div>
    <div class="b79-line">Đồng hồ B chỉ ${q.num(h2)} giờ ${q.num(m2, 2)} phút.</div>
    <div class="b79-sub"><span class="b79-let">c)</span>Từ giờ ở đồng hồ A đến giờ ở đồng hồ B
      là bao nhiêu phút?</div>
    <div class="b79-line">Từ giờ ở đồng hồ A đến giờ ở đồng hồ B là ${q.num(them, 2)} phút.</div>
    <div class="hint-line">Kim ngắn chỉ giờ, kim dài chỉ phút. Khi kim dài đã đi quá số 6 thì có
      thể đọc giờ theo cách "giờ kém": còn thiếu bao nhiêu phút nữa thì đến giờ tiếp theo.</div>`;
  const giaiC = tong >= 60
    ? `Từ ${h1} giờ ${m1} phút đến ${h1 + 1} giờ là ${60 - m1} phút, `
      + `từ ${h1 + 1} giờ đến ${h2} giờ ${m2} phút là ${them - (60 - m1)} phút, `
      + `tất cả là ${60 - m1} + ${them - (60 - m1)} = ${them} (phút).`
    : `Hai đồng hồ cùng chỉ ${h1} giờ nên lấy ${m2} &minus; ${m1} = ${them} (phút).`;
  return q.done(html,
    `a) Đồng hồ A chỉ ${h1} giờ ${m1} phút. Còn ${60 - m1} phút nữa thì đến ${h1 + 1} giờ `
    + `nên còn đọc là ${h1 + 1} giờ kém ${60 - m1} phút. `
    + `b) Đồng hồ B chỉ ${h2} giờ ${m2} phút. c) ` + giaiC);
},

/* 6. Bài toán về tiền Việt Nam — mua hàng và tiền trả lại */
() => {
  const q = Q(6, '');
  const sl = R(3, 6);
  const giaVo = R(5, 9) * 1000;
  const tienVo = sl * giaVo;
  /* giá hộp bút luôn khác tiền mua vở để câu so sánh cuối cùng có nghĩa */
  let giaHop = R(2, 4) * 10000;
  if (giaHop === tienVo) giaHop = (tienVo === 20000) ? 30000 : 20000;
  const tong = tienVo + giaHop;
  const traLai = 100000 - tong;
  const hieu = Math.abs(tienVo - giaHop);
  const soSanh = tienVo > giaHop ? 'nhiều hơn' : 'ít hơn';
  const html = `<p class="wordq">Mai mua ${sl} quyển vở, mỗi quyển giá ${SP79(giaVo)} đồng và
      một hộp bút chì màu giá ${SP79(giaHop)} đồng. Mai đưa cô bán hàng một tờ tiền
      ${SP79(100000)} đồng.</p>
    <div class="b79-shop">${Array.from({length: Math.min(sl, 5)}, () => VO79).join('')}${HOP79}</div>
    <div class="bullet">Mua ${sl} quyển vở hết ${q.num(tienVo)} đồng.</div>
    <div class="bullet">Mai phải trả tất cả ${q.num(tong)} đồng.</div>
    <div class="bullet">Cô bán hàng trả lại Mai ${q.num(traLai)} đồng.</div>
    <div class="bullet">Số tiền mua vở ${soSanh} số tiền mua hộp bút chì màu
      ${q.num(hieu)} đồng.</div>
    <div class="hint-line">Muốn biết số tiền trả lại, em lấy số tiền đã đưa trừ đi
      số tiền phải trả.</div>`;
  return q.done(html,
    `Tiền mua vở: ${SP79(giaVo)} × ${sl} = ${SP79(tienVo)} (đồng). `
    + `Tiền phải trả: ${SP79(tienVo)} + ${SP79(giaHop)} = ${SP79(tong)} (đồng). `
    + `Tiền trả lại: ${SP79(100000)} &minus; ${SP79(tong)} = ${SP79(traLai)} (đồng). `
    + `So sánh: ${SP79(Math.max(tienVo, giaHop))} &minus; ${SP79(Math.min(tienVo, giaHop))} `
    + `= ${SP79(hieu)} (đồng).`);
},
];
