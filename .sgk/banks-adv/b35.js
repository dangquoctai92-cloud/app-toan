/* ===== NÂNG CAO — Bài 35: Luyện tập chung
   (mi-li-mét, gam, mi-li-lít — cộng, trừ, nhân, chia số đo) ===== */

/* xáo trộn thứ tự các nhãn A, B, C */
const b35advTron = a => a.slice().sort(() => Math.random() - .5);

ADV.b35 = [

/* 1. So sánh hai vế có đơn vị đo khác nhau */
() => {
  const q = Q(1, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const c = R(3, 9);
    const x = pick([c * 10, c * 10, c * 10 + R(1, 9), c * 10 - R(1, 9)]);
    rows.push({t: `${c} cm`, p: `${x} mm`, l: c * 10, r: x});
  }
  {
    const a = R(4, 9) * 10, b = R(2, 9) * 10;
    const y = pick([a + b, a + b, a + b + R(1, 3) * 10, a + b - R(1, 3) * 10]);
    rows.push({t: `${a} mm + ${b} mm`, p: `${y} mm`, l: a + b, r: y});
  }
  {
    const g = pick([100, 120, 150, 200, 250]), k = R(2, 3);
    const z = pick([g * k, g * k, g * k + R(1, 5) * 10, g * k - R(1, 5) * 10]);
    rows.push({t: `${g} g × ${k}`, p: `${z} g`, l: g * k, r: z});
  }
  {
    const m = R(1, 8) * 50;
    const w = pick([1000 - m, 1000 - m, 1000 - m + R(1, 4) * 10, 1000 - m - R(1, 4) * 10]);
    rows.push({t: `1 <i>l</i> − ${m} ml`, p: `${w} ml`, l: 1000 - m, r: w});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">1 cm = 10 mm · 1 <i>l</i> = 1 000 ml ·
      Tính giá trị mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.l} và ${x.r}`).join(' · '));
},

/* 2. Cân đĩa: tìm khối lượng của vật rồi tính tiếp */
() => {
  const q = Q(2, 'Quan sát hai cân thăng bằng dưới đây rồi trả lời.');
  const cam = pick([50, 100, 150]);
  const sua = cam + pick([50, 100, 150]);
  const T = cam + sua;
  const k = R(2, 3);
  return q.done(`<div class="bullet">Cân thứ nhất thăng bằng: một hộp sữa và một quả cam
      nặng bằng một quả cân ${T} g.</div>
    <div class="bullet">Cân thứ hai thăng bằng: một quả cam nặng bằng một quả cân ${cam} g.</div>
    <div class="fill-line">Một hộp sữa cân nặng ${q.num(sua)} g.</div>
    <div class="fill-line">Một hộp sữa nặng hơn một quả cam ${q.num(sua - cam)} g.</div>
    <div class="fill-line">${k} hộp sữa như thế cân nặng ${q.num(sua * k)} g.</div>
    <div class="hint-line">Lấy khối lượng của cả hai vật trừ đi khối lượng quả cam.</div>`,
    `${T} − ${cam} = ${sua} (g);  ${sua} − ${cam} = ${sua - cam} (g);  ${sua} × ${k} = ${sua * k} (g)`);
},

/* 3. Bài toán ngược với mi-li-lít */
() => {
  const q = Q(3, '');
  const coc = pick([50, 100, 150]);
  const n = R(3, Math.floor(600 / coc) > 5 ? 5 : Math.floor(600 / coc));
  const con = pick([100, 150, 200, 250, 300]);
  const dau = coc * n + con;
  return q.done(`<p class="wordq">Một can đựng đầy nước. Bác Hà rót nước từ can đó vào ${n} chiếc cốc,
      mỗi cốc ${coc} ml, thì trong can còn lại ${con} ml nước.</p>
    <div class="fill-line">Số nước bác Hà đã rót ra là ${q.num(coc * n)} ml.</div>
    <div class="fill-line">Lúc đầu can đựng ${q.num(dau)} ml nước.</div>
    <div class="fill-line">Số nước còn lại trong can rót đầy được ${q.num(con / 50)} chiếc cốc loại 50 ml.</div>
    <div class="hint-line">Muốn tìm số nước lúc đầu, hãy lấy số nước đã rót ra cộng với số nước còn lại.</div>`,
    `${coc} × ${n} = ${coc * n} (ml);  ${coc * n} + ${con} = ${dau} (ml);  ${con} : 50 = ${con / 50} (cốc)`);
},

/* 4. Dãy số đo cách đều — tìm quy luật */
() => {
  const q = Q(4, 'Tìm quy luật rồi viết tiếp ba số đo của dãy sau.');
  const dv = pick(['ml', 'g', 'mm']);
  const st = R(2, 9) * 10, b = pick([15, 20, 25, 30, 45, 50]);
  const seq = [0, 1, 2, 3].map(i => st + i * b);
  return q.done(`<div class="chain pill">${seq.map(x => `<span class="cnode">${x}</span>`).join('')}
      <span class="cnode q">${q.num(st + 4 * b)}</span>
      <span class="cnode q">${q.num(st + 5 * b)}</span>
      <span class="cnode q">${q.num(st + 6 * b)}</span></div>
    <div class="fill-line">Hai số đo liền nhau trong dãy hơn kém nhau ${q.num(b)} ${dv}.</div>
    <div class="fill-line">Số đo thứ nhất và số đo cuối cùng của dãy hơn kém nhau
      ${q.num(6 * b)} ${dv}.</div>
    <div class="hint-line">Đơn vị đo của dãy số là ${dv}. Hãy lấy một số trừ đi số đứng ngay trước nó.</div>`,
    `Dãy số cách đều ${b} ${dv}: ${seq.concat([st + 4 * b, st + 5 * b, st + 6 * b]).join(', ')}`);
},

/* 5. Bài toán ba bước */
() => {
  const q = Q(5, '');
  const goi = pick([50, 100, 120, 150]);
  const k = R(2, Math.floor(600 / goi) > 4 ? 4 : Math.floor(600 / goi));
  const hop = R(2, 6) * 50;
  const tong = goi * k + hop;
  const dung = R(1, Math.floor(tong / 50) - 1) * 50;
  return q.done(`<p class="wordq">Mẹ mua ${k} gói kẹo, mỗi gói nặng ${goi} g và một hộp bánh
      nặng ${hop} g. Sau đó cả nhà đã ăn hết ${dung} g kẹo và bánh.</p>
    <div class="fill-line">${k} gói kẹo cân nặng ${q.num(goi * k)} g.</div>
    <div class="fill-line">Số kẹo và bánh mẹ mua cân nặng ${q.num(tong)} g.</div>
    <div class="fill-line">Số kẹo và bánh còn lại cân nặng ${q.num(tong - dung)} g.</div>`,
    `${goi} × ${k} = ${goi * k} (g);  ${goi * k} + ${hop} = ${tong} (g);  ${tong} − ${dung} = ${tong - dung} (g)`);
},

/* 6. Suy luận: ba túi gạo nặng nhẹ khác nhau */
() => {
  const q = Q(6, 'Ba túi gạo A, B, C có khối lượng khác nhau. Hãy trả lời các câu hỏi sau.');
  const L = b35advTron(['A', 'B', 'C']);
  const nhe = R(2, 3) * 50;
  const giua = nhe + R(1, 3) * 50;
  const nang = giua + R(1, 3) * 50;
  const tong = nhe + giua + nang;
  return q.done(`<div class="bullet">Cả ba túi cân nặng ${tong} g.</div>
    <div class="bullet">Túi ${L[0]} cân nặng ${nang} g.</div>
    <div class="bullet">Túi ${L[2]} cân nặng ${nhe} g.</div>
    <div class="fill-line">Túi ${L[1]} cân nặng ${q.num(giua)} g.</div>
    <div class="fill-line">Túi nặng nhất là túi ${q.pick(L[0], ['A', 'B', 'C'])}</div>
    <div class="fill-line">Túi nhẹ nhất là túi ${q.pick(L[2], ['A', 'B', 'C'])}</div>
    <div class="fill-line">Túi nặng nhất nặng hơn túi nhẹ nhất ${q.num(nang - nhe)} g.</div>
    <div class="hint-line">Lấy khối lượng của cả ba túi trừ đi khối lượng hai túi đã biết.</div>`,
    `${tong} − ${nang} − ${nhe} = ${giua} (g);  ${nang} > ${giua} > ${nhe};  ${nang} − ${nhe} = ${nang - nhe} (g)`);
},
];
