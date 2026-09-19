/* ==================== BÀI 66: XEM ĐỒNG HỒ. THÁNG – NĂM
   (SGK tập 2 – tr.77, 78, 79, 80)
   hoạt động (xem đồng hồ) : bài 1 (Số ? – bốn bức tranh có đồng hồ),
                             bài 2 (Hai đồng hồ nào chỉ cùng thời gian vào buổi chiều?),
                             bài 3 (Chọn đồng hồ thích hợp với mỗi bức tranh),
                             bài 4 (Số ? – cộng, trừ, nhân, chia số đo thời gian)
   hoạt động (tháng – năm) : quan sát tờ lịch năm nay (tháng 30 ngày, 31 ngày, tháng 2)
   luyện tập               : bài 1 (xem tờ lịch một tháng rồi trả lời câu hỏi),
                             bài 2 (Chọn câu trả lời đúng – chuyến đi kéo dài bao nhiêu ngày)
========================================================================================= */

/* ---- mặt đồng hồ kim: kim giờ theo giờ và phút, kim phút theo phút ---- */
ART.b66Clock = (h, m) => {
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
  return `<svg viewBox="0 0 200 200" class="b66-clock">
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

/* ---- đồng hồ điện tử: 24 giờ, hai chữ số ---- */
ART.b66hai = n => (n < 10 ? '0' : '') + n;
ART.b66Dig = (h, m) => `<span class="b66-dig">${ART.b66hai(h)}:${ART.b66hai(m)}</span>`;

/* ---- tranh minh hoạ nhỏ cho mỗi hoạt động ---- */
ART.b66Scene = kind => {
  const head = (x, y, c) => `<circle cx="${x}" cy="${y}" r="11" fill="#f7c9a8" stroke="#c98a4b"
      stroke-width="1.8"/><path d="M${x - 11} ${y - 2}q11-15 22 0z" fill="${c}"/>`;
  if (kind === 'toan') return `<svg viewBox="0 0 120 90" class="b66-sc">
    <rect x="8" y="58" width="104" height="9" rx="3" fill="#c98a4b"/>
    <rect x="16" y="67" width="8" height="20" fill="#a86f36"/>
    <rect x="96" y="67" width="8" height="20" fill="#a86f36"/>
    <rect x="24" y="42" width="42" height="17" rx="3" fill="#5fbb46" stroke="#357a24" stroke-width="2"/>
    <path d="M74 58l16-22 12 22z" fill="none" stroke="#e8478f" stroke-width="3" stroke-linejoin="round"/>
    ${head(44, 26, '#2b3a4a')}
    <path d="M32 58q12-22 24 0z" fill="#eaf2fb" stroke="#8fb4d6" stroke-width="1.8"/>
  </svg>`;
  if (kind === 'nhac') return `<svg viewBox="0 0 120 90" class="b66-sc">
    <rect x="14" y="48" width="92" height="22" rx="4" fill="#fff" stroke="#4a4460" stroke-width="2.4"/>
    <path d="M26 48v22M38 48v22M50 48v22M62 48v22M74 48v22M86 48v22" stroke="#4a4460" stroke-width="2"/>
    <rect x="20" y="48" width="7" height="13" fill="#2b2b38"/>
    <rect x="44" y="48" width="7" height="13" fill="#2b2b38"/>
    <rect x="68" y="48" width="7" height="13" fill="#2b2b38"/>
    <rect x="14" y="70" width="92" height="8" rx="3" fill="#a86f36"/>
    ${head(36, 26, '#5a3b2a')}
    <path d="M84 20v20a7 7 0 1 1-5-6V22z" fill="#2b3a8f"/>
  </svg>`;
  if (kind === 'mithuat') return `<svg viewBox="0 0 120 90" class="b66-sc">
    <path d="M40 84l14-40M92 84l-14-40" stroke="#a86f36" stroke-width="4" stroke-linecap="round"/>
    <rect x="40" y="14" width="52" height="38" rx="3" fill="#eaf7ff" stroke="#a86f36" stroke-width="3"/>
    <circle cx="78" cy="24" r="6" fill="#f7d34a"/>
    <path d="M42 50q12-16 24-4t24-6v10z" fill="#5fbb46"/>
    ${head(20, 30, '#8f2f2f')}
    <path d="M24 40l14 6" stroke="#e8552f" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
  if (kind === 'theduc') return `<svg viewBox="0 0 120 90" class="b66-sc">
    <rect x="16" y="10" width="10" height="72" fill="#8b93a8"/>
    <rect x="26" y="16" width="28" height="24" rx="2" fill="#eaf2fb" stroke="#4a4460" stroke-width="2.4"/>
    <path d="M40 40l-6 14h18z" fill="none" stroke="#e8552f" stroke-width="2.6"/>
    <circle cx="76" cy="30" r="13" fill="#f0a027" stroke="#a06713" stroke-width="2.4"/>
    <path d="M63 30h26M76 17v26" stroke="#a06713" stroke-width="2"/>
    ${head(66, 62, '#2b3a4a')}
    <path d="M74 62l10-18" stroke="#f7c9a8" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
  if (kind === 'banh') return `<svg viewBox="0 0 120 90" class="b66-sc">
    <rect x="8" y="58" width="104" height="10" rx="3" fill="#c98a4b"/>
    <rect x="14" y="46" width="52" height="12" rx="5" fill="#f5e3c6" stroke="#c98a4b" stroke-width="2"/>
    <circle cx="80" cy="50" r="10" fill="#fff" stroke="#c98a4b" stroke-width="2"/>
    <circle cx="76" cy="48" r="3" fill="#f7d34a"/><circle cx="84" cy="52" r="3" fill="#f7d34a"/>
    ${head(34, 26, '#3a2c12')}${head(70, 24, '#5a3b2a')}
    <path d="M8 68h104v18H8z" fill="#eaf2fb"/>
  </svg>`;
  return `<svg viewBox="0 0 120 90" class="b66-sc">
    <rect x="6" y="70" width="108" height="16" fill="#cfe0c5"/>
    <rect x="70" y="40" width="26" height="34" rx="6" fill="#3f5aa6" stroke="#26356b" stroke-width="2.4"/>
    <path d="M70 52q-24 6-30 22" fill="none" stroke="#4a4460" stroke-width="4"/>
    <rect x="26" y="70" width="24" height="8" rx="3" fill="#2b2b38"/>
    ${head(36, 30, '#8f2f2f')}
    <path d="M44 40l22 10" stroke="#f7c9a8" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
};

/* thứ trong tuần, 0 = Chủ nhật theo Date.getDay() */
const B66_THU = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
/* thứ tự cột của tờ lịch: Thứ Hai … Chủ nhật */
const B66_COT = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
const B66_TEN = ['Một', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười',
  'Mười một', 'Mười hai'];
/* số ngày của tháng m năm y */
function b66Ngay(y, m){ return new Date(y, m, 0).getDate(); }
/* cột (0 = Thứ Hai … 6 = Chủ nhật) của ngày d tháng m năm y */
function b66Cot(y, m, d){ return (new Date(y, m - 1, d).getDay() + 6) % 7; }
/* tờ lịch tháng m năm y */
function b66Lich(y, m){
  const dim = b66Ngay(y, m);
  const rows = [];
  let row = ['', '', '', '', '', '', ''];
  for (let d = 1; d <= dim; d++){
    const c = b66Cot(y, m, d);
    row[c] = d;
    if (c === 6 || d === dim){ rows.push(row); row = ['', '', '', '', '', '', '']; }
  }
  return `<table class="b66-cal"><caption>THÁNG ${B66_TEN[m - 1].toUpperCase()}</caption>
    <tr>${B66_COT.map(t => `<th>${t.toUpperCase()}</th>`).join('')}</tr>
    ${rows.map(r => '<tr>' + r.map((v, i) =>
      `<td class="${i === 6 ? 'cn' : ''}">${v}</td>`).join('') + '</tr>').join('')}</table>`;
}

BANKS.b66 = [

/* ===== tr.77 – Bài 1: Số ? (bốn bức tranh có đồng hồ) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const acts = [
    {ten: 'Nam học Toán', sc: 'toan', buoi: 'sáng'},
    {ten: 'Mai học Âm nhạc', sc: 'nhac', buoi: 'sáng'},
    {ten: 'Rô-bốt học Mĩ thuật', sc: 'mithuat', buoi: 'chiều'},
    {ten: 'Việt học Giáo dục thể chất', sc: 'theduc', buoi: 'chiều'}
  ];
  const L = ['a)', 'b)', 'c)', 'd)'];
  const list = acts.map(a => {
    const gio = a.buoi === 'sáng' ? R(7, 11) : R(1, 5);
    return Object.assign({gio, phut: R(1, 59)}, a);
  });
  const html = '<div class="b66-grid">' + list.map((it, i) =>
    `<div class="b66-card"><div class="top">${ART.b66Scene(it.sc)}${ART.b66Clock(it.gio, it.phut)}</div>
      <div class="b66-cap"><span class="b66-let">${L[i]}</span>${it.ten}<br>
        lúc ${q.num(it.gio)} giờ ${q.num(it.phut)} phút ${it.buoi}.</div></div>`).join('') + '</div>';
  return q.done(html, list.map((it, i) =>
    `${L[i]} ${it.gio} giờ ${it.phut} phút ${it.buoi}`).join(';  '));
},

/* ===== tr.78 – Bài 2: Hai đồng hồ nào chỉ cùng thời gian vào buổi chiều? ===== */
() => {
  const q = Q(2, 'Hai đồng hồ nào chỉ cùng thời gian vào buổi chiều?');
  const ts = [];
  for (let g = 0; g < 300 && ts.length < 7; g++){
    const h = R(13, 18), m = R(0, 59);
    if (!ts.some(t => t.h === h && t.m === m)) ts.push({h, m});
  }
  for (let k = 0; k < 60 && ts.length < 7; k++){
    if (!ts.some(t => t.h === 13 && t.m === k)) ts.push({h: 13, m: k});
  }
  const T = ts[0];
  const LA = ['A', 'B', 'C', 'D'], LD = ['E', 'G', 'H', 'K'];
  const kim = [ts[0], ts[1], ts[2], ts[3]].sort(() => Math.random() - .5);
  const dien = [ts[0], ts[4], ts[5], ts[6]].sort(() => Math.random() - .5);
  const lblKim = LA[kim.findIndex(t => t.h === T.h && t.m === T.m)];
  const lblDien = LD[dien.findIndex(t => t.h === T.h && t.m === T.m)];
  const dap = [lblKim, lblDien].sort().join(',');
  const html = '<div class="b66-row">' + kim.map((t, i) =>
      `<div class="b66-item">${ART.b66Clock(t.h - 12, t.m)}<span class="lbl">${LA[i]}</span></div>`).join('')
    + '</div><div class="b66-row">' + dien.map((t, i) =>
      `<div class="b66-item">${ART.b66Dig(t.h, t.m)}<span class="lbl">${LD[i]}</span></div>`).join('')
    + `</div><div class="fill-line b66-wide">Hai đồng hồ chỉ cùng thời gian là:
      ${q.pick(dap, LA.concat(LD))}</div>
      <div class="hint-line">Chạm để chọn hai đồng hồ.</div>`;
  return q.done(html,
    `Đồng hồ ${lblKim} chỉ ${T.h - 12} giờ ${T.m} phút chiều, tức là ${ART.b66hai(T.h)}:${ART.b66hai(T.m)}, `
    + `giống đồng hồ ${lblDien}.`);
},

/* ===== tr.78 – Bài 3: Chọn đồng hồ thích hợp với mỗi bức tranh ===== */
() => {
  const q = Q(3, 'Chọn đồng hồ thích hợp với mỗi bức tranh.');
  const KHUYA = [0, 1, 2, 3, 4, 5, 22, 23];
  const mk = () => {
    const h = R(8, 17);
    const m = pick(KHUYA.filter(v => v !== h));
    return {h, m};
  };
  const items = [
    Object.assign({ten: 'Mai cùng mẹ làm bánh', sc: 'banh'}, mk()),
    Object.assign({ten: 'Mi cùng bố hút bụi', sc: 'hutbui'}, mk())
  ];
  const L = ['a)', 'b)'];
  const html = '<div class="b66-grid">' + items.map((it, i) => {
    const dung = R(0, 1) === 1 ? 'A' : 'B';
    it.dung = dung;
    const o1 = dung === 'A' ? [it.h, it.m] : [it.m, it.h];
    const o2 = dung === 'A' ? [it.m, it.h] : [it.h, it.m];
    return `<div class="b66-card"><div class="top">${ART.b66Scene(it.sc)}</div>
      <div class="b66-cap"><span class="b66-let">${L[i]}</span>${it.ten} lúc:</div>
      <div class="b66-two">
        <div>${ART.b66Dig(o1[0], o1[1])}<br>A.</div>
        <div>${ART.b66Dig(o2[0], o2[1])}<br>B.</div></div>
      <div class="b66-cap">Chọn ${q.pick(dung, ['A', 'B'])}</div></div>`;
  }).join('') + '</div>';
  return q.done(html, items.map((it, i) =>
    `${L[i]} ${ART.b66hai(it.m)}:${ART.b66hai(it.h)} là lúc đêm khuya nên không hợp; `
    + `chọn ${ART.b66hai(it.h)}:${ART.b66hai(it.m)} (đồng hồ ${it.dung})`).join('.  '));
},

/* ===== tr.78 – Bài 4: Số ? (cộng, trừ, nhân, chia số đo thời gian) ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const a1 = R(2, 9) * 5, a2 = R(2, 9) * 5;
  const b1 = R(2, 20);
  const c1 = R(2, 12), c2 = R(2, 4);
  const d2 = pick([2, 3, 4, 5, 6, 10, 12]);
  const html = noteBox('Mẫu:  1 giờ + 2 giờ = 3 giờ &nbsp;&nbsp;&nbsp; 30 phút − 10 phút = 20 phút<br>'
      + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10 phút × 3 = 30 phút &nbsp;&nbsp;&nbsp; 8 giờ : 4 = 2 giờ')
    + `<div class="b66-list">
      <div><span class="b66-let">a)</span>${a1} phút <span class="op">+</span> ${a2} phút
        <span class="op">=</span> ${q.num(a1 + a2)} phút</div>
      <div><span class="b66-let">b)</span>24 giờ <span class="op">−</span> ${b1} giờ
        <span class="op">=</span> ${q.num(24 - b1)} giờ</div>
      <div><span class="b66-let">c)</span>${c1} giờ <span class="op">×</span> ${c2}
        <span class="op">=</span> ${q.num(c1 * c2)} giờ</div>
      <div><span class="b66-let">d)</span>60 phút <span class="op">:</span> ${d2}
        <span class="op">=</span> ${q.num(60 / d2)} phút</div></div>`;
  return q.done(html,
    `a) ${a1} + ${a2} = ${a1 + a2};  b) 24 − ${b1} = ${24 - b1};  `
    + `c) ${c1} × ${c2} = ${c1 * c2};  d) 60 : ${d2} = ${60 / d2}`);
},

/* ===== tr.79 – hoạt động: Quan sát tờ lịch rồi cho biết số ngày của các tháng ===== */
() => {
  const nam = R(2024, 2035);
  const q = Q(1, `Quan sát tờ lịch năm ${nam} và cho biết:`);
  const MS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const ba0 = ['4', '6', '9', '11'];
  const ba1 = ['1', '3', '5', '7', '8', '10', '12'];
  const nhuan = (nam % 4 === 0 && nam % 100 !== 0) || nam % 400 === 0;
  const hai = nhuan ? 29 : 28;
  const html = `<div class="b66-sub b66-wide">a) Những tháng nào có 30 ngày?</div>
      <div class="fill-line b66-wide">${q.pick(ba0.slice().sort().join(','), MS)}</div>
    <div class="b66-sub b66-wide">b) Những tháng nào có 31 ngày?</div>
      <div class="fill-line b66-wide">${q.pick(ba1.slice().sort().join(','), MS)}</div>
    <div class="b66-sub">c) Tháng 2 năm ${nam} có bao nhiêu ngày?</div>
      ${b66Lich(nam, 2)}
      <div class="bullet">Tháng 2 năm ${nam} có ${q.num(hai)} ngày.</div>
    <div class="hint-line">Chạm để chọn các tháng.</div>`;
  return q.done(html,
    `Các tháng có 30 ngày: 4, 6, 9, 11. Các tháng có 31 ngày: 1, 3, 5, 7, 8, 10, 12. `
    + `Năm ${nam} ${nhuan ? 'là năm nhuận nên tháng 2 có 29 ngày' : 'không phải năm nhuận nên tháng 2 có 28 ngày'}.`);
},

/* ===== tr.79 – Bài 1 (luyện tập): Xem tờ lịch rồi trả lời các câu hỏi ===== */
() => {
  const nam = R(2024, 2035), thang = R(1, 11);
  const q = Q(1, `Xem tờ lịch tháng ${thang} năm ${nam} rồi trả lời các câu hỏi.`);
  const dim = b66Ngay(nam, thang);
  let cn = dim;
  for (let d = dim; d >= dim - 6 && d >= 1; d--){
    if (new Date(nam, thang - 1, d).getDay() === 0){ cn = d; break; }
  }
  const thuCuoi = B66_THU[new Date(nam, thang - 1, dim).getDay()];
  const thuDau = B66_THU[new Date(nam, thang, 1).getDay()];
  const html = b66Lich(nam, thang)
    + `<div class="b66-sub">a) Trường của Rô-bốt sẽ đi cắm trại vào Chủ nhật cuối cùng của
        tháng ${thang}. Hỏi đó là ngày nào?</div>
      <div class="bullet">Đó là ngày ${q.num(cn)} tháng ${thang}.</div>
      <div class="b66-sub">b) Ngày cuối cùng của tháng ${thang} là thứ mấy?
        Ngày đầu tiên của tháng ${thang + 1} cùng năm là thứ mấy?</div>
      <div class="bullet b66-wide">Ngày cuối cùng của tháng ${thang} là ${q.pick(thuCuoi, B66_COT)}</div>
      <div class="bullet b66-wide">Ngày đầu tiên của tháng ${thang + 1} là ${q.pick(thuDau, B66_COT)}</div>`;
  return q.done(html,
    `Tháng ${thang} năm ${nam} có ${dim} ngày. Chủ nhật cuối cùng là ngày ${cn}. `
    + `Ngày ${dim} tháng ${thang} là ${thuCuoi}, ngày 1 tháng ${thang + 1} là ${thuDau}.`);
},

/* ===== tr.80 – Bài 2 (luyện tập): Chọn câu trả lời đúng ===== */
() => {
  const q = Q(2, 'Chọn câu trả lời đúng.');
  const nam = R(2024, 2035), thang = R(1, 11);
  const dim = b66Ngay(nam, thang);
  const batDau = dim - R(1, 3);
  const ketThuc = R(1, 4);
  const soNgay = (dim - batDau + 1) + ketThuc;
  const khac = [soNgay - 2, soNgay - 1, soNgay + 1, soNgay + 2]
    .filter(v => v > 0 && v !== soNgay).sort(() => Math.random() - .5).slice(0, 3);
  const opts = khac.concat([soNgay]).sort((x, y) => x - y);
  const L = ['A', 'B', 'C', 'D'];
  const dung = L[opts.indexOf(soNgay)];
  const html = `<p class="wordq">Rô-bốt có một chuyến đi đến Tây Nguyên từ ngày ${batDau}
      tháng ${thang} đến hết ngày ${ketThuc} tháng ${thang + 1} cùng năm.
      Vậy chuyến đi đó kéo dài bao nhiêu ngày?</p>
    <div class="b66-list">${opts.map((v, i) =>
      `<div><span class="b66-let">${L[i]}.</span>${v} ngày</div>`).join('')}</div>
    <div class="fill-line">Đáp án: ${q.pick(dung, L)}</div>`;
  return q.done(html,
    `Tháng ${thang} có ${dim} ngày nên từ ngày ${batDau} đến hết ngày ${dim} tháng ${thang} `
    + `có ${dim - batDau + 1} ngày; thêm ${ketThuc} ngày của tháng ${thang + 1} `
    + `được ${soNgay} ngày. Chọn ${dung}.`);
},
];
