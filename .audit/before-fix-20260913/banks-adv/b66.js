/*CSS
.b66adv-eq{margin:7px 0;font-size:19px;font-weight:800;color:#2b3a5a;background:#f3eeff;
  border:2.5px solid #c3b4ea;border-radius:12px;padding:8px 12px;display:flex;flex-wrap:wrap;
  align-items:center;gap:6px}
.b66adv-eq b{color:#d63384;margin-right:2px}
.b66adv-fact{background:#eef6ff;border:2.5px solid #7fb4e0;border-radius:12px;padding:7px 12px;
  margin:6px 0;font-size:18px;font-weight:700;color:#123f66;line-height:1.9}
.b66adv-sub{font-weight:700;margin:9px 0 3px;line-height:1.7}
CSS*/

/* ===== NÂNG CAO — Bài 66: Xem đồng hồ. Tháng – năm =====
   Dùng lại ART.b66Clock, ART.b66Dig, b66Ngay, B66_THU, B66_COT của phần cơ bản.
   Dạng bài: đổi và so sánh số đo thời gian, toán ngược về thời điểm – thời lượng,
   suy luận logic với đồng hồ, tìm số trong biểu thức có số đo thời gian,
   suy luận về thứ trong tháng, toán ngược về ngày – tháng.
========================================================================= */

/* thứ của ngày d tháng m năm y */
const b66advThu = (y, m, d) => B66_THU[new Date(y, m - 1, d).getDay()];
/* so sánh hai số */
const b66advCmp = (x, y) => x > y ? '>' : x < y ? '<' : '=';
/* một ô hình có nhãn ở dưới */
const b66advItem = (inner, lbl) => `<div class="b66-item">${inner}<span class="lbl">${lbl}</span></div>`;

ADV.b66 = [

/* 1. Đổi ra cùng đơn vị rồi so sánh — so sánh biểu thức số đo thời gian */
() => {
  const q = Q(1, 'Đổi ra cùng một đơn vị đo rồi so sánh.');
  const rows = [];
  for (let i = 0; i < 3; i++){
    const g = R(1, 3), p = R(1, 11) * 5;
    const tong = g * 60 + p;
    const n = tong + pick([0, 0, 5, 10, 15, -5, -10, -15]);
    if (i === 1) rows.push({tr: `${n} phút`, ph: `${g} giờ ${p} phút`, d: b66advCmp(n, tong)});
    else rows.push({tr: `${g} giờ ${p} phút`, ph: `${n} phút`, d: b66advCmp(tong, n)});
  }
  const g2 = R(1, 3), p2 = R(1, 11) * 5;
  const T = R(2, 4) * 60 + R(1, 11) * 5;
  const Tg = Math.floor(T / 60), Tp = T % 60;
  return q.done(`<div class="b66adv-sub">a) &gt; ; &lt; ; = ?</div>
    <div>${rows.map(r => `<div class="cmp-row"><span class="side">${r.tr}</span>${q.sign(r.d)}`
      + `<span class="side">${r.ph}</span></div>`).join('')}</div>
    <div class="b66adv-sub">b) <span class="tag">Số</span> ?</div>
    <div class="fill-line">${g2} giờ ${p2} phút = ${q.num(g2 * 60 + p2)} phút</div>
    <div class="fill-line">${T} phút = ${q.num(Tg)} giờ ${q.num(Tp)} phút</div>
    <div class="hint-line">1 giờ = 60 phút. Muốn so sánh, em hãy đổi số đo có hai đơn vị
      ra phút rồi mới so sánh. Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map((r, i) => `${r.tr} ${r.d} ${r.ph}`).join(';  ')
    + `.  ${g2} giờ ${p2} phút = ${g2} × 60 + ${p2} = ${g2 * 60 + p2} (phút);  `
    + `${T} phút = ${Tg} giờ ${Tp} phút.`);
},

/* 2. Thời điểm bắt đầu – thời lượng – thời điểm kết thúc (có toán ngược) */
() => {
  const q = Q(2, 'Xem đồng hồ rồi viết số thích hợp vào chỗ chấm.');
  /* a) biết lúc bắt đầu và thời lượng, tìm lúc kết thúc */
  const h1 = R(7, 10), m1 = R(1, 9) * 5;
  let d1 = pick([25, 30, 35, 40, 45, 50]);
  if ((m1 + d1) % 60 === 0) d1 += 5;
  const e1 = h1 * 60 + m1 + d1, eh1 = Math.floor(e1 / 60), em1 = e1 % 60;
  /* b) biết lúc kết thúc và thời lượng, tìm lúc bắt đầu */
  const h2 = R(3, 6), m2 = R(1, 11) * 5;
  let d2 = pick([20, 25, 30, 35, 40, 45, 50, 55]);
  if ((m2 - d2) % 60 === 0) d2 += 5;
  const s2 = h2 * 60 + m2 - d2, sh2 = Math.floor(s2 / 60), sm2 = s2 % 60;
  /* c) biết lúc bắt đầu và lúc kết thúc, tìm thời lượng */
  const h3 = R(1, 4), m3 = R(1, 11) * 5, m4 = R(0, 11) * 5;
  const dur = 60 - m3 + m4;
  return q.done(`<div class="b66adv-sub">a) Tiết học Toán của Nam bắt đầu lúc đồng hồ chỉ như hình
      dưới đây và kéo dài ${d1} phút.</div>
    <div class="b66-row">${b66advItem(ART.b66Clock(h1, m1), 'Bắt đầu')}</div>
    <div class="fill-line">Tiết học bắt đầu lúc ${q.num(h1)} giờ ${q.num(m1)} phút sáng.</div>
    <div class="fill-line">Tiết học kết thúc lúc ${q.num(eh1)} giờ ${q.num(em1)} phút sáng.</div>
    <div class="b66adv-sub">b) Buổi tập múa của Mai kéo dài ${d2} phút và kết thúc lúc đồng hồ
      điện tử chỉ như hình dưới đây.</div>
    <div class="b66-row">${b66advItem(ART.b66Dig(h2 + 12, m2), 'Kết thúc')}</div>
    <div class="fill-line">Buổi tập múa kết thúc lúc ${q.num(h2)} giờ ${q.num(m2)} phút chiều.</div>
    <div class="fill-line">Buổi tập múa bắt đầu lúc ${q.num(sh2)} giờ ${q.num(sm2)} phút chiều.</div>
    <div class="b66adv-sub">c) Chiều nay Rô-bốt tưới cây từ lúc đồng hồ thứ nhất chỉ
      đến lúc đồng hồ thứ hai chỉ.</div>
    <div class="b66-row">${b66advItem(ART.b66Clock(h3, m3), 'Bắt đầu')}
      ${b66advItem(ART.b66Clock(h3 + 1, m4), 'Tưới xong')}</div>
    <div class="fill-line">Rô-bốt đã tưới cây trong ${q.num(dur)} phút.</div>
    <div class="hint-line">Đồng hồ điện tử chỉ ${ART.b66hai(h2 + 12)}:${ART.b66hai(m2)}
      tức là ${h2} giờ ${m2} phút chiều. Ở câu c) em hãy đếm số phút từ ${m3} phút
      đến ${h3 + 1} giờ, rồi cộng thêm ${m4} phút.</div>`,
    `a) ${h1} giờ ${m1} phút + ${d1} phút = ${eh1} giờ ${em1} phút.  `
    + `b) ${h2} giờ ${m2} phút − ${d2} phút = ${sh2} giờ ${sm2} phút.  `
    + `c) Từ ${h3} giờ ${m3} phút đến ${h3 + 1} giờ có ${60 - m3} phút, `
    + `thêm ${m4} phút nữa được ${dur} phút.`);
},

/* 3. Suy luận logic: ba bạn – ba đồng hồ */
() => {
  const q = Q(3, 'Trả lời các câu hỏi sau.');
  const h = R(2, 5);
  const m1 = R(0, 10), m2 = m1 + R(5, 15), m3 = m2 + R(5, 20);
  const L = ['A', 'B', 'C'];
  const ts = [{ten: 'Việt', m: m1}, {ten: 'Nam', m: m2}, {ten: 'Mai', m: m3}]
    .sort(() => Math.random() - .5);
  const nhan = {};
  ts.forEach((t, i) => { nhan[t.ten] = L[i]; });
  return q.done(`<p class="wordq">Chiều nay Việt, Nam và Mai cùng đến sân bóng, mỗi bạn đến vào
      một thời điểm khác nhau. Ba đồng hồ A, B, C dưới đây chỉ thời điểm ba bạn đến sân,
      mỗi bạn ứng với một đồng hồ. Biết rằng Việt đến sớm nhất và Mai đến sau Nam.</p>
    <div class="b66-row">${ts.map((t, i) => b66advItem(ART.b66Clock(h, t.m), L[i])).join('')}</div>
    <div class="fill-line">Việt ứng với đồng hồ ${q.pick(nhan['Việt'], L)}</div>
    <div class="fill-line">Nam ứng với đồng hồ ${q.pick(nhan['Nam'], L)}</div>
    <div class="fill-line">Mai ứng với đồng hồ ${q.pick(nhan['Mai'], L)}</div>
    <div class="fill-line">Nam đến sân lúc ${q.num(h)} giờ ${q.num(m2)} phút chiều.</div>
    <div class="fill-line">Mai đến sân sau Việt ${q.num(m3 - m1)} phút.</div>
    <div class="hint-line">Việt đến sớm nhất nên ứng với đồng hồ chỉ giờ sớm nhất.
      Mai đến sau Nam nên Mai là bạn đến muộn nhất.</div>`,
    `Việt đến lúc ${h} giờ ${m1} phút (đồng hồ ${nhan['Việt']}), `
    + `Nam đến lúc ${h} giờ ${m2} phút (đồng hồ ${nhan['Nam']}), `
    + `Mai đến lúc ${h} giờ ${m3} phút (đồng hồ ${nhan['Mai']}).  `
    + `Mai đến sau Việt: ${m3} − ${m1} = ${m3 - m1} (phút).`);
},

/* 4. Số ? — tìm thành phần chưa biết trong biểu thức có số đo thời gian */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const a = R(1, 11) * 5;                       /* ? phút + a phút = 1 giờ */
  const k = R(2, 4), x = R(2, 6);               /* ? giờ × k = x*k giờ */
  const k2 = pick([2, 3, 4, 5]), c = pick([5, 10, 12, 15]);   /* b phút : ? = c phút */
  const b = c * k2;
  const a2 = R(3, 9), b2 = R(4, 12);            /* ? giờ − a2 giờ = b2 giờ */
  const t = R(1, 5) * 5;                        /* (? phút + t phút) × 2 = 60 phút */
  return q.done(`<div class="b66adv-eq"><b>a)</b> ${q.num(60 - a)} phút <span class="op">+</span>
      ${a} phút <span class="op">=</span> 1 giờ</div>
    <div class="b66adv-eq"><b>b)</b> ${q.num(x)} giờ <span class="op">×</span> ${k}
      <span class="op">=</span> ${x * k} giờ</div>
    <div class="b66adv-eq"><b>c)</b> ${b} phút <span class="op">:</span> ${q.num(k2)}
      <span class="op">=</span> ${c} phút</div>
    <div class="b66adv-eq"><b>d)</b> ${q.num(a2 + b2)} giờ <span class="op">−</span> ${a2} giờ
      <span class="op">=</span> ${b2} giờ</div>
    <div class="b66adv-eq"><b>e)</b> ( ${q.num(30 - t)} phút <span class="op">+</span> ${t} phút )
      <span class="op">×</span> 2 <span class="op">=</span> 60 phút</div>
    <div class="hint-line">1 giờ = 60 phút. Ở câu e) em hãy tìm tổng trong ngoặc trước:
      tổng đó nhân với 2 được 60 phút.</div>`,
    `a) 60 − ${a} = ${60 - a};  b) ${x * k} : ${k} = ${x};  c) ${b} : ${c} = ${k2};  `
    + `d) ${a2} + ${b2} = ${a2 + b2};  e) 60 : 2 = 30, rồi 30 − ${t} = ${30 - t}.`);
},

/* 5. Suy luận về thứ trong tháng (không cần tờ lịch) */
() => {
  const nam = R(2024, 2035), thang = R(1, 12);
  const q = Q(5, `Không cần xem tờ lịch, hãy trả lời các câu hỏi về tháng ${thang} năm ${nam}.`);
  const dim = b66Ngay(nam, thang);
  const thu1 = b66advThu(nam, thang, 1);
  const d2 = R(9, dim);
  const thuD2 = b66advThu(nam, thang, d2);
  const thuCuoi = b66advThu(nam, thang, dim);
  let cn1 = 0, soCN = 0;
  for (let d = 1; d <= dim; d++){
    if (new Date(nam, thang - 1, d).getDay() === 0){ soCN++; if (!cn1) cn1 = d; }
  }
  return q.done(`<div class="b66adv-fact">Ngày 1 tháng ${thang} năm ${nam} là ${thu1}.<br>
      Tháng ${thang} năm ${nam} có ${dim} ngày.</div>
    <div class="bullet b66-wide">a) Ngày ${d2} tháng ${thang} là ${q.pick(thuD2, B66_COT)}</div>
    <div class="bullet">b) Chủ nhật đầu tiên của tháng ${thang} là ngày ${q.num(cn1)}.</div>
    <div class="bullet">c) Tháng ${thang} năm ${nam} có ${q.num(soCN)} ngày Chủ nhật.</div>
    <div class="bullet b66-wide">d) Ngày ${dim} tháng ${thang} là ${q.pick(thuCuoi, B66_COT)}</div>
    <div class="hint-line">Cứ sau 7 ngày thì lại đúng thứ đó: các ngày 1, 8, 15, 22, 29
      của một tháng đều cùng một thứ. Chạm để chọn thứ.</div>`,
    `Ngày 1, 8, 15, 22, 29 tháng ${thang} đều là ${thu1}. `
    + `a) Ngày ${d2} là ${thuD2}. b) Chủ nhật đầu tiên là ngày ${cn1}. `
    + `c) Từ ngày ${cn1}, cứ cách 7 ngày lại có một Chủ nhật, tháng có ${dim} ngày `
    + `nên tháng ${thang} năm ${nam} có ${soCN} ngày Chủ nhật. d) Ngày ${dim} là ${thuCuoi}.`);
},

/* 6. Toán ngược về ngày – tháng */
() => {
  const q = Q(6, 'Trả lời các câu hỏi sau.');
  const nam = R(2024, 2035), thang = R(2, 12);
  const dimTruoc = b66Ngay(nam, thang - 1);
  const ve = R(2, 6);
  const j = R(4, 12);
  const batDau = dimTruoc - j + 1;
  const tong = j + ve;
  return q.done(`<p class="wordq">Bác Hải có một chuyến đi kéo dài ${tong} ngày (tính cả ngày
      khởi hành và ngày trở về). Bác trở về nhà vào ngày ${ve} tháng ${thang} năm ${nam}.
      Hỏi bác Hải khởi hành vào ngày nào?</p>
    <div class="bullet">Số ngày của chuyến đi thuộc tháng ${thang} là ${q.num(ve)} ngày.</div>
    <div class="bullet">Số ngày của chuyến đi thuộc tháng ${thang - 1} là ${q.num(j)} ngày.</div>
    <div class="bullet">Tháng ${thang - 1} năm ${nam} có ${q.num(dimTruoc)} ngày.</div>
    <div class="bullet">Bác Hải khởi hành vào ngày ${q.num(batDau)} tháng ${q.num(thang - 1)}.</div>
    <div class="hint-line">Chuyến đi gồm những ngày cuối của tháng ${thang - 1} và
      ${ve} ngày đầu của tháng ${thang}. Ngày khởi hành là ngày thứ ${j} tính ngược
      từ ngày cuối cùng của tháng ${thang - 1}.</div>`,
    `Tháng ${thang} có ${ve} ngày của chuyến đi nên tháng ${thang - 1} có `
    + `${tong} − ${ve} = ${j} (ngày). Tháng ${thang - 1} năm ${nam} có ${dimTruoc} ngày, `
    + `vậy ngày khởi hành là ${dimTruoc} − ${j} + 1 = ${batDau}, tức ngày ${batDau} `
    + `tháng ${thang - 1} năm ${nam}.`);
},
];
