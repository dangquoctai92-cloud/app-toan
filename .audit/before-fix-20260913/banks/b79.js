/*CSS
.b79-let{color:#d63384;font-weight:800;margin-right:6px}
.b79-sub{font-weight:700;margin:9px 0 3px;line-height:1.5;text-align:left}
.b79-ask{margin:8px 0 2px;font-weight:700;color:#d63384;text-align:left}
.b79-line{font-size:17px;font-weight:700;line-height:2.35;text-align:left;margin:4px 0}
.b79-line .qin{margin:0 3px;vertical-align:middle;height:34px;font-size:16px;min-width:0;width:64px}
.b79-conv{font-size:15px;line-height:2.45;font-weight:700;text-align:left;margin:3px 0}
.b79-conv .qin{margin:0 2px;vertical-align:middle;height:31px;font-size:15px;min-width:0;width:48px;padding:0 2px}
.b79-two{display:flex;flex-wrap:wrap;gap:0 26px}
.b79-two > div{flex:1 1 262px;min-width:236px}
.b79-wide .picker{flex-wrap:wrap;justify-content:flex-start;margin:4px 0 0}
.b79-wide .pk{width:auto;min-width:34px;padding:0 12px;font-size:14px;height:32px}
.b79-fig{width:100%;max-width:330px;height:auto;display:block;margin:8px auto}
.b79-figw{width:100%;max-width:430px;height:auto;display:block;margin:8px auto}
.b79-exp{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 14px;margin:6px 0 10px}
.b79-exp > span{background:#fdeecd;border:2px solid #e0a93c;border-radius:12px;padding:5px 10px;
  font-size:15.5px;font-weight:800;white-space:nowrap}
.b79-exp .qin{height:32px;font-size:15.5px;min-width:0;width:58px;margin:0 3px;padding:0 2px}
.b79-clocks{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 8px;margin:8px 0}
.b79-clocks > div{flex:1 1 132px;max-width:168px;text-align:center}
.b79-clocks svg{width:100%;max-width:112px;height:auto;display:block;margin:0 auto}
.b79-ctime{font-size:14.5px;font-weight:800;color:#26324a;margin-top:4px;line-height:2.1;white-space:nowrap}
.b79-ctime .qin{height:30px;font-size:14.5px;min-width:0;width:42px;margin:0 2px;padding:0 2px}
.b79-mcq{display:flex;flex-wrap:wrap;gap:3px 22px;margin:2px 0 4px 16px}
.b79-mcq > span{font-size:17px;font-weight:700;white-space:nowrap}
.b79-mcq i{font-style:normal;color:#d63384;font-weight:800;margin-right:5px}
.b79-shop{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px;margin:8px 0}
.b79-shop svg{height:96px;width:auto;display:block}
CSS*/

/* ==================== BÀI 79: ÔN TẬP HÌNH HỌC VÀ ĐO LƯỜNG
   (SGK tập 2 – tr.120, 121)
   luyện tập 1 (tr.120) : bài 1 (hình vuông ABCD, hình tròn tâm O – điểm thẳng hàng,
                                 trung điểm, góc vuông đỉnh O),
                          bài 2 (chu vi hình tam giác ABD, BCD và chu vi hình tứ giác ABCD),
                          bài 3 (mảnh đất hình chữ nhật – tính chu vi),
                          bài 4 (Số ? – diện tích hình H)
   luyện tập 2 (tr.121) : bài 1 (Số ? – đổi đơn vị đo độ dài, khối lượng, dung tích),
                          bài 2 (Tính – cộng, trừ, nhân, chia số đo),
                          bài 3 (a: đồng hồ chỉ mấy giờ, b: tháng có 31 ngày và 30 ngày,
                                 c: chọn câu trả lời đúng về thứ trong tuần),
                          bài 4 (Mai mua vở và hộp bút chì màu)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như SGK: 60 000 */
const SP79 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b79Mix = a => a.slice().sort(() => Math.random() - .5);
/* đáp án chọn nhiều phải xếp theo thứ tự chuỗi */
const b79Set = a => a.slice().sort().join(',');
const LET79 = ['A', 'B', 'C', 'D'];
/* bốn đỉnh của hình, không dùng chữ O vì O là tâm hình tròn */
const TEN79 = [['A', 'B', 'C', 'D'], ['M', 'N', 'P', 'Q'], ['E', 'G', 'H', 'K']];
const THU79 = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
/* số ngày của tháng (bỏ tháng 2 vì số ngày thay đổi theo năm) */
const NGAY79 = {1: 31, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};

/* ---- hình vuông nội tiếp hình tròn tâm O, có hai đường chéo ---- */
ART.b79Vuong = V => {
  const c = 124, r = 84, h = +(84 / Math.SQRT2).toFixed(1);
  const P = [[c - h, c - h], [c + h, c - h], [c + h, c + h], [c - h, c + h]];
  const pts = P.map(p => p.join(',')).join(' ');
  const lb = (x, y, an, t) => `<text x="${x}" y="${y}" text-anchor="${an}" font-size="18"
    font-weight="700" fill="#2b2b38">${t}</text>`;
  return `<svg viewBox="0 0 248 252" class="b79-fig">
    <circle cx="${c}" cy="${c}" r="${r}" fill="#fff" stroke="#2b2b38" stroke-width="2.6"/>
    <polygon points="${pts}" fill="none" stroke="#2b2b38" stroke-width="2.6"/>
    <line x1="${P[0][0]}" y1="${P[0][1]}" x2="${P[2][0]}" y2="${P[2][1]}"
      stroke="#2b2b38" stroke-width="2.6"/>
    <line x1="${P[1][0]}" y1="${P[1][1]}" x2="${P[3][0]}" y2="${P[3][1]}"
      stroke="#2b2b38" stroke-width="2.6"/>
    <circle cx="${c}" cy="${c}" r="3.6" fill="#2b2b38"/>
    ${lb(P[0][0] - 8, P[0][1] - 7, 'end', V[0])}
    ${lb(P[1][0] + 8, P[1][1] - 7, 'start', V[1])}
    ${lb(P[2][0] + 8, P[2][1] + 19, 'start', V[2])}
    ${lb(P[3][0] - 8, P[3][1] + 19, 'end', V[3])}
    ${lb(c + 11, c + 25, 'start', 'O')}
  </svg>`;
};

/* ---- hình tứ giác có một đường chéo, ghi số đo các cạnh ---- */
ART.b79Tugiac = (V, s) => {
  const lb = (x, y, an, t, sz) => `<text x="${x}" y="${y}" text-anchor="${an}"
    font-size="${sz}" font-weight="${sz > 15 ? 700 : 400}" fill="#2b2b38">${t}</text>`;
  return `<svg viewBox="0 0 314 216" class="b79-figw">
    <polygon points="66,68 214,40 246,172 66,172" fill="none" stroke="#2b2b38" stroke-width="2.6"/>
    <line x1="214" y1="40" x2="66" y2="172" stroke="#2b2b38" stroke-width="2.6"/>
    ${lb(58, 62, 'end', V[0], 17)}${lb(222, 34, 'start', V[1], 17)}
    ${lb(254, 180, 'start', V[2], 17)}${lb(58, 186, 'end', V[3], 17)}
    ${lb(126, 36, 'middle', s.ab + ' cm', 15)}
    ${lb(262, 106, 'start', s.bc + ' cm', 15)}
    ${lb(156, 198, 'middle', s.cd + ' cm', 15)}
    ${lb(56, 126, 'end', s.da + ' cm', 15)}
    ${lb(152, 120, 'start', s.bd + ' cm', 15)}
  </svg>`;
};

/* ---- hình H ghép từ hai hình chữ nhật, kẻ ô vuông 1 cm ---- */
ART.b79HinhH = (lw, lh, rw, rh) => {
  const u = 24, px = 62, py = 26;
  const W = (lw + rw) * u, H = rh * u, y0 = py + H;
  let g = '';
  for (let i = 0; i <= lw + rw; i++) g += `M${px + i * u} ${py}V${y0}`;
  for (let j = 0; j <= rh; j++) g += `M${px} ${py + j * u}H${px + W}`;
  const out = `M${px} ${y0}V${y0 - lh * u}H${px + lw * u}V${py}H${px + W}V${y0}Z`;
  const lb = (x, y, an, t, sz) => `<text x="${x}" y="${y}" text-anchor="${an}"
    font-size="${sz}" fill="#2b2b38">${t}</text>`;
  return `<svg viewBox="0 0 ${W + 134} ${H + 76}" class="b79-figw">
    <path d="${g}" fill="none" stroke="#5fc8e8" stroke-width="1.2"/>
    <rect x="${px - 2}" y="${py - 2}" width="${lw * u + 2}" height="${(rh - lh) * u + 2}" fill="#fff"/>
    <path d="${out}" fill="none" stroke="#2b2b38" stroke-width="3"/>
    ${lb(px + lw * u / 2, y0 - lh * u - 9, 'middle', lw + ' cm', 15)}
    ${lb(px + lw * u + rw * u / 2, py - 9, 'middle', rw + ' cm', 15)}
    ${lb(px - 9, y0 - lh * u / 2 + 5, 'end', lh + ' cm', 15)}
    ${lb(px + W + 9, py + H / 2 + 5, 'start', rh + ' cm', 15)}
    <text x="${px + W / 2}" y="${y0 + 28}" text-anchor="middle" font-size="16"
      font-weight="700" fill="#2b2b38">Hình H</text>
  </svg>`;
};

/* ---- mặt đồng hồ kim: kim giờ theo giờ và phút, kim phút theo phút ---- */
ART.b79Clock = (h, m) => {
  const P = (r, deg) => [(100 + r * Math.sin(deg * Math.PI / 180)).toFixed(1),
                         (100 - r * Math.cos(deg * Math.PI / 180)).toFixed(1)];
  let ticks = '';
  for (let i = 0; i < 60; i++){
    const big = i % 5 === 0;
    const a = P(big ? 76 : 81, i * 6), b = P(87, i * 6);
    ticks += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"
      stroke="#4a4460" stroke-width="${big ? 2.6 : 1.3}" stroke-linecap="round"/>`;
  }
  let nums = '';
  for (let i = 1; i <= 12; i++){
    const p = P(63, i * 30);
    nums += `<text x="${p[0]}" y="${(+p[1] + 6).toFixed(1)}" text-anchor="middle"
      font-size="17" font-weight="800" fill="#2b2b38">${i}</text>`;
  }
  const kg = P(46, (h % 12) * 30 + m * 0.5), kp = P(72, m * 6);
  return `<svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="96" fill="#f0a027" stroke="#d1791a" stroke-width="3"/>
    <circle cx="100" cy="100" r="87" fill="#fff"/>
    ${ticks}${nums}
    <line x1="100" y1="100" x2="${kg[0]}" y2="${kg[1]}" stroke="#2b2b38" stroke-width="6.4"
      stroke-linecap="round"/>
    <line x1="100" y1="100" x2="${kp[0]}" y2="${kp[1]}" stroke="#e8352f" stroke-width="4.4"
      stroke-linecap="round"/>
    <circle cx="100" cy="100" r="6" fill="#e8352f"/>
  </svg>`;
};

/* ---- quyển vở và hộp bút chì màu ---- */
const VO79 = `<svg viewBox="0 0 76 100">
  <path d="M10 6h58v88H10z" fill="#8fd0f0" stroke="#1f7fa5" stroke-width="3"/>
  <path d="M10 6h9v88h-9z" fill="#e8552f" stroke="#a5321a" stroke-width="2.6"/>
  <path d="M28 26h32M28 40h32M28 54h32M28 68h20" stroke="#1f7fa5" stroke-width="3"
    stroke-linecap="round"/>
</svg>`;
const HOP79 = `<svg viewBox="0 0 128 100">
  <path d="M8 30h112v62H8z" fill="#f6b93b" stroke="#c07d10" stroke-width="3"/>
  <path d="M8 30h112v14H8z" fill="#e8b45c" stroke="#c07d10" stroke-width="2.4"/>
  <path d="M22 12h16v18H22z" fill="#e8352f" stroke="#a5321a" stroke-width="2.2"/>
  <path d="M44 12h16v18H44z" fill="#2f9e4f" stroke="#1c6b33" stroke-width="2.2"/>
  <path d="M66 12h16v18H66z" fill="#2f7dc4" stroke="#1c4f7d" stroke-width="2.2"/>
  <path d="M88 12h16v18H88z" fill="#8a4fc4" stroke="#5a2f85" stroke-width="2.2"/>
  <path d="M26 56h76" stroke="#c07d10" stroke-width="3" stroke-linecap="round"/>
</svg>`;

BANKS.b79 = [

/* ===== tr.120 – Luyện tập 1, Bài 1: hình vuông và hình tròn tâm O ===== */
() => {
  const V = pick(TEN79);
  const q = Q(1, `Cho hình vuông ${V.join('')}, hình tròn tâm O (như hình vẽ).`);
  const cheo = [`${V[0]}${V[2]}`, `${V[1]}${V[3]}`];
  const canh = [`${V[0]}${V[1]}`, `${V[1]}${V[2]}`, `${V[2]}${V[3]}`, `${V[0]}${V[3]}`];
  const hang = [`${V[0]} – O – ${V[2]}`, `${V[1]} – O – ${V[3]}`];
  const sai = [`${V[0]} – O – ${V[1]}`, `${V[1]} – O – ${V[2]}`,
    `${V[2]} – O – ${V[3]}`, `${V[0]} – ${V[1]} – ${V[2]}`];
  const optH = b79Mix(hang.concat(sai));
  const optD = b79Mix(cheo.concat(canh));

  const html = ART.b79Vuong(V)
    + '<div class="b79-sub"><span class="b79-let">a)</span>Nêu tên ba điểm thẳng hàng.</div>'
    + `<div class="fill-line b79-wide">Ba điểm thẳng hàng: ${q.pick(b79Set(hang), optH)}</div>`
    + '<div class="b79-sub"><span class="b79-let">b)</span>O là trung điểm của những đoạn thẳng nào?</div>'
    + `<div class="fill-line b79-wide">O là trung điểm của: ${q.pick(b79Set(cheo), optD)}</div>`
    + `<div class="b79-line">O là trung điểm của ${q.num(2, 1)} đoạn thẳng.</div>`
    + '<div class="b79-sub"><span class="b79-let">c)</span>Dùng ê ke kiểm tra rồi nêu tên '
    + 'các góc vuông đỉnh O.</div>'
    + `<div class="b79-line">Có ${q.num(4, 1)} góc vuông đỉnh O.</div>`;
  return q.done(html,
    `a) Hai đường chéo của hình vuông đi qua O nên ${hang[0]} thẳng hàng và ${hang[1]} thẳng hàng. `
    + `b) O là trung điểm của đoạn thẳng ${cheo[0]} và đoạn thẳng ${cheo[1]}. `
    + `c) Hai đường chéo cắt nhau tại O tạo thành 4 góc vuông đỉnh O là: góc đỉnh O cạnh `
    + `O${V[0]}, O${V[1]}; góc đỉnh O cạnh O${V[1]}, O${V[2]}; góc đỉnh O cạnh O${V[2]}, O${V[3]}; `
    + `góc đỉnh O cạnh O${V[3]}, O${V[0]}.`);
},

/* ===== tr.120 – Luyện tập 1, Bài 2: chu vi tam giác và chu vi tứ giác ===== */
() => {
  const q = Q(2, '');
  const V = pick(TEN79);
  /* bd là đường chéo; cách chọn dưới đây luôn thoả mãn bất đẳng thức tam giác */
  const bd = R(4, 7);
  const nua = Math.ceil((bd + 1) / 2);
  const s = {ab: R(nua, bd), bc: R(nua, bd), cd: R(nua, bd + 1), da: R(nua, bd), bd};
  const T1 = `${V[0]}${V[1]}${V[3]}`, T2 = `${V[1]}${V[2]}${V[3]}`;
  const TG = V.join('');
  const p1 = s.ab + s.bd + s.da;
  const p2 = s.bc + s.cd + s.bd;
  const p3 = s.ab + s.bc + s.cd + s.da;
  const hon = p1 + p2 - p3;

  const html = ART.b79Tugiac(V, s)
    + `<div class="b79-sub"><span class="b79-let">a)</span>Tính chu vi hình tam giác ${T1}
        và chu vi hình tam giác ${T2}.</div>
      <div class="b79-line">Chu vi hình tam giác ${T1} là ${q.num(p1)} cm.</div>
      <div class="b79-line">Chu vi hình tam giác ${T2} là ${q.num(p2)} cm.</div>
      <div class="b79-sub"><span class="b79-let">b)</span>Tính chu vi hình tứ giác ${TG}.</div>
      <div class="b79-line">Chu vi hình tứ giác ${TG} là ${q.num(p3)} cm.</div>
      <div class="b79-sub"><span class="b79-let">c)</span><span class="tag">Số</span> ?</div>
      <div class="b79-line">Tổng chu vi của các hình tam giác ${T1} và ${T2} hơn chu vi
        hình tứ giác ${TG} là ${q.num(hon)} cm.</div>`;
  return q.done(html,
    `a) Chu vi hình tam giác ${T1}: ${s.ab} + ${s.bd} + ${s.da} = ${p1} (cm). `
    + `Chu vi hình tam giác ${T2}: ${s.bc} + ${s.cd} + ${s.bd} = ${p2} (cm). `
    + `b) Chu vi hình tứ giác ${TG}: ${s.ab} + ${s.bc} + ${s.cd} + ${s.da} = ${p3} (cm). `
    + `c) Tổng chu vi hai hình tam giác: ${p1} + ${p2} = ${p1 + p2} (cm); `
    + `${p1 + p2} &minus; ${p3} = ${hon} (cm). Phần hơn đúng bằng hai lần độ dài `
    + `đoạn thẳng ${V[1]}${V[3]}.`);
},

/* ===== tr.120 – Luyện tập 1, Bài 3: chu vi mảnh đất hình chữ nhật ===== */
() => {
  const q = Q(3, '');
  const rong = R(5, 15), them = R(3, 12);
  const dai = rong + them;
  const cv = (dai + rong) * 2;
  const html = `<p class="wordq">Một mảnh đất hình chữ nhật có chiều rộng ${rong} m,
      chiều dài hơn chiều rộng ${them} m. Tính chu vi mảnh đất đó.</p>
    <div class="bullet">Chiều dài mảnh đất là ${q.num(dai)} m.</div>
    <div class="bullet">Chu vi mảnh đất là ${q.num(cv)} m.</div>`;
  return q.done(html,
    `Chiều dài mảnh đất: ${rong} + ${them} = ${dai} (m). `
    + `Chu vi mảnh đất: (${dai} + ${rong}) × 2 = ${cv} (m).`);
},

/* ===== tr.120 – Luyện tập 1, Bài 4: Số ? – diện tích hình H ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const lw = R(3, 5), lh = R(3, 5);
  const rw = R(5, 7), rh = lh + R(1, 3);
  const s1 = lw * lh, s2 = rw * rh;
  const dt = s1 + s2;
  const html = '<p class="wordq">Hình H có kích thước như hình vẽ dưới đây.</p>'
    + ART.b79HinhH(lw, lh, rw, rh)
    + `<div class="b79-line">Diện tích hình H là ${q.num(dt)} cm<sup>2</sup>.</div>`;
  return q.done(html,
    `Chia hình H thành hai hình chữ nhật. Hình chữ nhật bên trái có diện tích: `
    + `${lw} × ${lh} = ${s1} (cm2). Hình chữ nhật bên phải có diện tích: `
    + `${rw} × ${rh} = ${s2} (cm2). Diện tích hình H: ${s1} + ${s2} = ${dt} (cm2).`);
},

/* ===== tr.121 – Luyện tập 2, Bài 1: Số ? (đổi đơn vị đo) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const k1 = R(2, 9), k2 = R(2, 9), k3 = R(2, 9), k4 = R(2, 9), k5 = R(2, 9);
  const L = '<i>l</i>';
  const html = `<div class="b79-sub"><span class="b79-let">a)</span></div>
    <div class="b79-two">
      <div>
        <div class="b79-conv">1 cm = ${q.num(10)} mm</div>
        <div class="b79-conv">1 dm = ${q.num(10)} cm = ${q.num(100)} mm</div>
        <div class="b79-conv">1 m = ${q.num(10)} dm = ${q.num(100)} cm = ${q.num(1000)} mm</div>
      </div>
      <div>
        <div class="b79-conv">${k1} cm = ${q.num(k1 * 10)} mm</div>
        <div class="b79-conv">${k2} dm = ${q.num(k2 * 10)} cm = ${q.num(k2 * 100)} mm</div>
        <div class="b79-conv">${k3} m = ${q.num(k3 * 10)} dm = ${q.num(k3 * 100)} cm
          = ${q.num(k3 * 1000)} mm</div>
      </div>
    </div>
    <div class="b79-two">
      <div>
        <div class="b79-sub"><span class="b79-let">b)</span></div>
        <div class="b79-conv">1 kg = ${q.num(1000)} g</div>
        <div class="b79-conv">1 000 g = ${q.num(1, 1)} kg</div>
        <div class="b79-conv">${k4} kg = ${q.num(k4 * 1000)} g</div>
      </div>
      <div>
        <div class="b79-sub"><span class="b79-let">c)</span></div>
        <div class="b79-conv">1 ${L} = ${q.num(1000)} ml</div>
        <div class="b79-conv">1 000 ml = ${q.num(1, 1)} ${L}</div>
        <div class="b79-conv">${k5} ${L} = ${q.num(k5 * 1000)} ml</div>
      </div>
    </div>`;
  return q.done(html,
    '1 cm = 10 mm; 1 dm = 10 cm = 100 mm; 1 m = 10 dm = 100 cm = 1 000 mm; '
    + '1 kg = 1 000 g; 1 l = 1 000 ml. Muốn đổi ra đơn vị bé hơn thì lấy số đo nhân với '
    + `số lần tương ứng, ví dụ ${k3} m = ${SP79(k3 * 1000)} mm.`);
},

/* ===== tr.121 – Luyện tập 2, Bài 2: Tính (số đo) ===== */
() => {
  const q = Q(2, 'Tính.');
  const bo = u => {
    const s1 = R(2, 6) * 100, s2 = R(1, 3) * 100;      /* cộng */
    const t1 = R(4, 9) * 100, t2 = R(1, 3) * 100;      /* trừ  */
    const m1 = R(1, 3) * 100, mk = R(2, 4);            /* nhân */
    const dk = R(2, 5), dq = R(1, 4) * 100;            /* chia */
    return b79Mix([
      [`${SP79(s1)} ${u} + ${SP79(s2)} ${u}`, s1 + s2],
      [`${SP79(t1)} ${u} &minus; ${SP79(t2)} ${u}`, t1 - t2],
      [`${SP79(m1)} ${u} × ${mk}`, m1 * mk],
      [`${SP79(dq * dk)} ${u} : ${dk}`, dq]
    ]);
  };
  const A = bo('mm'), B = bo('g'), C = bo('ml');
  const khoi = (l, ds, u) => `<div class="b79-sub"><span class="b79-let">${l})</span></div>
    <div class="b79-exp">${ds.map(d =>
      `<span>${d[0]} = ${q.num(d[1])} ${u}</span>`).join('')}</div>`;
  const html = khoi('a', A, 'mm') + khoi('b', B, 'g') + khoi('c', C, 'ml');
  return q.done(html,
    'Tính với các số như bình thường rồi viết thêm đơn vị đo vào kết quả: '
    + A.concat(B, C).map(d => `${d[0]} = ${SP79(d[1])}`).join(';  ') + '.');
},

/* ===== tr.121 – Luyện tập 2, Bài 3: đồng hồ, tháng trong năm, thứ trong tuần ===== */
() => {
  const q = Q(3, '');
  /* a) ba đồng hồ, đồng hồ đầu tiên đã cho sẵn như trong sách */
  const PH = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const gio = b79Mix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 3);
  const phut = b79Mix(PH).slice(0, 3);
  const dh = gio.map((h, i) => ({h, m: phut[i]}));

  /* b) số tháng có 31 ngày, số tháng có 30 ngày và số ngày của hai tháng bất kì */
  const thang = b79Mix([1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 2);

  /* c) biết thứ của một ngày, tìm thứ của một ngày ở tháng sau */
  const m = pick([3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const len = NGAY79[m];
  const d = R(len - 4, len);
  const s = R(0, 6);
  const td = R(1, 3);
  const ans = (s + (len - d) + td) % 7;
  const base = (ans - R(0, 3) + 7) % 7;
  const opts = [0, 1, 2, 3].map(i => THU79[(base + i) % 7]);
  const ansLet = LET79[opts.indexOf(THU79[ans])];

  const html = '<div class="b79-sub"><span class="b79-let">a)</span><span class="tag">Số</span> ? '
    + 'Đồng hồ chỉ mấy giờ?</div>'
    + '<div class="b79-clocks">' + dh.map((t, i) =>
      `<div>${ART.b79Clock(t.h, t.m)}<div class="b79-ctime">` + (i === 0
        ? `${t.h} giờ ${t.m} phút`
        : `${q.num(t.h)} giờ ${q.num(t.m)} phút`) + '</div></div>').join('') + '</div>'
    + '<div class="b79-sub"><span class="b79-let">b)</span>Nêu tên các tháng có 31 ngày '
    + 'và các tháng có 30 ngày trong năm.</div>'
    + `<div class="b79-line">Trong một năm có ${q.num(7, 1)} tháng có 31 ngày
        và ${q.num(4, 1)} tháng có 30 ngày.</div>`
    + thang.map(t => `<div class="b79-line">Tháng ${t} có ${q.num(NGAY79[t], 2)} ngày.</div>`).join('')
    + '<div class="b79-sub"><span class="b79-let">c)</span>Chọn câu trả lời đúng.</div>'
    + `<div class="b79-line">Nếu ngày ${d} tháng ${m} là ${THU79[s]} thì ngày ${td}
        tháng ${m + 1} cùng năm đó là:</div>`
    + `<div class="b79-mcq">${opts.map((v, i) =>
      `<span><i>${LET79[i]}.</i>${v}</span>`).join('')}</div>`
    + `<div class="fill-line b79-wide">Chọn: ${q.pick(ansLet, LET79)}</div>`;
  return q.done(html,
    `a) Kim ngắn chỉ giờ, kim dài chỉ phút: các đồng hồ chỉ `
    + dh.map(t => `${t.h} giờ ${t.m} phút`).join('; ') + '. '
    + 'b) Các tháng có 31 ngày là tháng 1, 3, 5, 7, 8, 10, 12 (7 tháng); '
    + 'các tháng có 30 ngày là tháng 4, 6, 9, 11 (4 tháng). '
    + `c) Tháng ${m} có ${len} ngày. Từ ngày ${d} tháng ${m} đến ngày ${td} tháng ${m + 1} `
    + `là ${(len - d) + td} ngày. Đếm tiếp từ ${THU79[s]} thêm ${(len - d) + td} ngày `
    + `được ${THU79[ans]} nên chọn ${ansLet}.`);
},

/* ===== tr.121 – Luyện tập 2, Bài 4: Mai mua vở và hộp bút chì màu ===== */
() => {
  const q = Q(4, '');
  const sl = R(3, 8);
  const giaVo = R(5, 9) * 1000;
  const giaHop = R(4, 9) * 10000;
  const tienVo = sl * giaVo;
  const tong = tienVo + giaHop;
  const html = `<p class="wordq">Mai vào cửa hàng mua ${sl} quyển vở, mỗi quyển giá
      ${SP79(giaVo)} đồng và mua một hộp bút chì màu giá ${SP79(giaHop)} đồng.
      Hỏi Mai đã mua hết tất cả là bao nhiêu tiền?</p>
    <div class="b79-shop">${Array.from({length: Math.min(sl, 5)}, () => VO79).join('')}${HOP79}</div>
    <div class="bullet">Mua ${sl} quyển vở hết ${q.num(tienVo)} đồng.</div>
    <div class="bullet">Mai đã mua hết tất cả là ${q.num(tong)} đồng.</div>`;
  return q.done(html,
    `Tiền mua ${sl} quyển vở: ${SP79(giaVo)} × ${sl} = ${SP79(tienVo)} (đồng). `
    + `Mai đã mua hết tất cả: ${SP79(tienVo)} + ${SP79(giaHop)} = ${SP79(tong)} (đồng).`);
},
];
