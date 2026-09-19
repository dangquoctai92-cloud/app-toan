/* ==================== BÀI 67: THỰC HÀNH XEM ĐỒNG HỒ, XEM LỊCH
   (SGK tập 2 – tr.80, 81, 82, 83, 84)
   hoạt động tr.80–82 : bài 1 (sáng Chủ nhật – xem đồng hồ),
                        bài 2 (Chọn câu trả lời đúng: a) nồi cơm, b) món rau trộn, c) món gà nướng),
                        bài 3 (bảng công việc buổi chiều – thứ tự làm việc),
                        bài 4 (tờ lịch tháng 5 – các ngày Chủ nhật)
   hoạt động tr.82–84 : bài 1 (trại hè kéo dài bao nhiêu ngày – tờ lịch tháng 6),
                        bài 2 (thứ Sáu đầu tiên, thứ Hai tuần kế tiếp),
                        bài 3 (a) chuẩn bị đồ dùng, b) nướng bánh quy – hai đồng hồ),
                        bài 4 (các hoạt động của ngày đầu tiên ở trại hè)
========================================================================================= */

const SHF67 = a => a.slice().sort(() => Math.random() - .5);

/* mốc thời gian tính bằng phút kể từ 0 giờ */
const HM67 = t => { const h = Math.floor(t / 60) % 24, m = t % 60;
  return m ? h + ' giờ ' + m + ' phút' : h + ' giờ'; };

/* đồng hồ điện tử kiểu 15:45 */
const DIG67 = t => '<span class="b67-dig">'
  + String(Math.floor(t / 60) % 24).padStart(2, '0') + ':'
  + String(t % 60).padStart(2, '0') + '</span>';

/* ---- mặt đồng hồ kim: kim giờ và kim phút đặt theo góc tính từ giờ - phút ---- */
function clock67(t, lbl, letter){
  const h = Math.floor(t / 60) % 12, m = t % 60;
  const rad = d => d * Math.PI / 180;
  const P = (a, r) => ({x: 100 + r * Math.sin(a), y: 100 - r * Math.cos(a)});
  let ticks = '';
  for (let i = 0; i < 60; i++){
    const big = i % 5 === 0;
    const p1 = P(rad(i * 6), big ? 76 : 80), p2 = P(rad(i * 6), 86);
    ticks += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}"
      x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}"
      stroke="#3a2c12" stroke-width="${big ? 3 : 1.4}" stroke-linecap="round"/>`;
  }
  let nums = '';
  for (let i = 1; i <= 12; i++){
    const p = P(rad(i * 30), 62);
    nums += `<text x="${p.x.toFixed(1)}" y="${(p.y + 8).toFixed(1)}" text-anchor="middle"
      font-size="23" font-weight="700" fill="#1a1a1a">${i}</text>`;
  }
  const ph = P(rad(h * 30 + m * 0.5), 44), pm = P(rad(m * 6), 70);
  return `<div class="b67-clk"><svg viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="95" fill="#f7941e"/>
      <circle cx="100" cy="100" r="87" fill="#fff" stroke="#e07b16" stroke-width="2"/>
      ${ticks}${nums}
      <line x1="100" y1="100" x2="${ph.x.toFixed(1)}" y2="${ph.y.toFixed(1)}"
        stroke="#1a1a1a" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="${pm.x.toFixed(1)}" y2="${pm.y.toFixed(1)}"
        stroke="#1a1a1a" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="7" fill="#e02020"/>
    </svg>${lbl ? `<div class="b67-clbl">${lbl}</div>` : ''}${
      letter ? `<div class="b67-cle">${letter}</div>` : ''}</div>`;
}

/* ---- tờ lịch: fw = thứ của ngày mồng 1 (0 = thứ Hai … 6 = Chủ nhật) ---- */
const THANG67 = ['', 'MỘT', 'HAI', 'BA', 'TƯ', 'NĂM', 'SÁU', 'BẢY', 'TÁM', 'CHÍN',
  'MƯỜI', 'MƯỜI MỘT', 'MƯỜI HAI'];
const SONGAY67 = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function cal67(thang, fw){
  const nd = SONGAY67[thang];
  const head = ['THỨ<br>HAI', 'THỨ<br>BA', 'THỨ<br>TƯ', 'THỨ<br>NĂM', 'THỨ<br>SÁU',
    'THỨ<br>BẢY', 'CHỦ<br>NHẬT'];
  const cells = [];
  for (let i = 0; i < fw; i++) cells.push(0);
  for (let d = 1; d <= nd; d++) cells.push(d);
  while (cells.length % 7) cells.push(0);
  let rows = '';
  for (let i = 0; i < cells.length; i += 7){
    rows += '<tr>' + cells.slice(i, i + 7).map((d, j) =>
      `<td class="${j === 6 ? 'cn' : ''}">${d || ''}</td>`).join('') + '</tr>';
  }
  return `<div class="b67-cal"><div class="b67-cal-t">THÁNG ${THANG67[thang]}</div>
    <table><tr>${head.map(x => `<th>${x}</th>`).join('')}</tr>${rows}</table></div>`;
}

/* các ngày Chủ nhật của tháng */
const CN67 = (thang, fw) => {
  const out = [];
  for (let d = 1; d <= SONGAY67[thang]; d++) if ((fw + d - 1) % 7 === 6) out.push(d);
  return out;
};
/* ngày đầu tiên trong tháng rơi vào thứ w (0 = thứ Hai … 6 = Chủ nhật) */
const NGAY67 = (fw, w) => ((w - fw) % 7 + 7) % 7 + 1;

/* n mốc thời gian khác mốc đúng, dùng làm phương án nhiễu cho các đồng hồ */
function khac67(dung, offs, n){
  const out = [];
  SHF67(offs).forEach(o => {
    const v = dung + o;
    if (out.length < n && v > 0 && v < 1380 && v !== dung && !out.includes(v)) out.push(v);
  });
  let k = 11;
  while (out.length < n && k < 400){
    const v = dung + k;
    if (v > 0 && v < 1380 && v !== dung && !out.includes(v)) out.push(v);
    k += 13;
  }
  return out;
}

const LET67 = ['A', 'B', 'C', 'D'];

BANKS.b67 = [

/* ===== tr.80 – Bài 1: Vào sáng Chủ nhật (xem đồng hồ kim) ===== */
() => {
  const q = Q(1, 'Vào sáng Chủ nhật, các đồng hồ chỉ những thời điểm dưới đây. '
    + 'Mỗi đồng hồ chỉ mấy giờ?');
  const t1 = R(5, 7) * 60 + R(1, 11) * 5;
  let t2 = t1 + R(4, 12) * 5;
  if (t2 % 60 === 0) t2 += 5;
  let t3 = t2 + R(6, 18) * 5;
  if (t3 % 60 === 0) t3 += 5;
  const TS = [t1, t2, t3];
  const LB = ['Thức dậy', 'Ăn sáng', 'Cùng bố mẹ dọn nhà'];
  const html = `<div class="b67-row b67-row2">
      ${TS.map((t, i) => clock67(t, LB[i], '')).join('')}</div>
    <div class="b67-line"><span class="b67-let">a)</span>Bạn thức dậy lúc
      ${q.num(Math.floor(t1 / 60))} giờ ${q.num(t1 % 60)} phút.</div>
    <div class="b67-line"><span class="b67-let">b)</span>Bạn ăn sáng lúc
      ${q.num(Math.floor(t2 / 60))} giờ ${q.num(t2 % 60)} phút.</div>
    <div class="b67-line"><span class="b67-let">c)</span>Bạn cùng bố mẹ dọn nhà lúc
      ${q.num(Math.floor(t3 / 60))} giờ ${q.num(t3 % 60)} phút.</div>`;
  return q.done(html,
    `Kim ngắn chỉ số giờ, kim dài chỉ số phút: ${HM67(t1)}; ${HM67(t2)}; ${HM67(t3)}.`);
},

/* ===== tr.80 – Bài 2a: Chọn câu trả lời đúng (nồi cơm) ===== */
() => {
  const q = Q(2, 'a) Chọn câu trả lời đúng.');
  const start = R(9, 10) * 60 + R(0, 11) * 5;
  const k = R(4, 10) * 5;
  const end = start + k;
  const sai = khac67(end, [60, -60, 30, -30, 15, -15, 20, -20], 3);
  const all = SHF67([end].concat(sai));
  const ans = LET67[all.indexOf(end)];
  const html = `<p class="wordq">Nồi cơm được cắm điện vào lúc ${HM67(start)}.
      Sau ${k} phút nữa, điện sẽ tự ngắt và cơm sẽ chín.
      Hỏi đồng hồ nào dưới đây chỉ lúc cơm chín?</p>
    <div class="b67-row b67-row4">
      ${all.map((t, i) => clock67(t, '', LET67[i])).join('')}</div>
    <div class="fill-line b67-wide">Chọn: ${q.pick(ans, LET67)}</div>`;
  return q.done(html,
    `${HM67(start)} thêm ${k} phút nữa là ${HM67(end)}, nên chọn ${ans}.`);
},

/* ===== tr.81 – Bài 2b: Chọn câu trả lời đúng (món rau trộn) ===== */
() => {
  const q = Q(2, 'b) Chọn câu trả lời đúng.');
  const start = R(10, 11) * 60 + pick([45, 50, 55]);
  const k = R(3, 9);
  const end = start + k;
  const sai = khac67(end, [10, -10, 20, -20, 30, -30, 60, -60], 3);
  const all = SHF67([end].concat(sai));
  const ans = LET67[all.indexOf(end)];
  const html = `<p class="wordq">Mẹ làm món rau trộn mất ${k} phút.
      Mẹ bắt đầu làm vào lúc ${HM67(start)}.
      Hỏi đồng hồ nào dưới đây chỉ lúc mẹ làm xong món rau trộn?</p>
    <div class="b67-row b67-row4">
      ${all.map((t, i) => clock67(t, '', LET67[i])).join('')}</div>
    <div class="fill-line b67-wide">Chọn: ${q.pick(ans, LET67)}</div>`;
  return q.done(html,
    `${HM67(start)} thêm ${k} phút là ${HM67(end)}, nên chọn ${ans}.`);
},

/* ===== tr.81 – Bài 2c: Món gà nướng trong bao nhiêu phút ===== */
() => {
  const q = Q(2, 'c) Chọn câu trả lời đúng.');
  const start = R(10, 11) * 60 + R(0, 11) * 5;
  const d = R(4, 7) * 5;                       /* 20, 25, 30 hoặc 35 phút */
  const end = start + d;
  const dau = d - R(0, 3) * 5;                 /* bốn phương án liên tiếp cách nhau 5 phút */
  const opts = [dau, dau + 5, dau + 10, dau + 15];
  const ans = LET67[opts.indexOf(d)];
  const html = `<p class="wordq">Món gà được nướng bằng lò điện.
      Thời gian bắt đầu và kết thúc như sau:</p>
    <div class="b67-row b67-row2">
      ${clock67(start, 'Bắt đầu', '')}${clock67(end, 'Kết thúc', '')}</div>
    <p class="wordq">Hỏi món gà được nướng trong bao nhiêu phút?</p>
    <div class="b67-opts">${opts.map((v, i) =>
      `<span><b>${LET67[i]}.</b>${v} phút</span>`).join('')}</div>
    <div class="fill-line b67-wide">Chọn: ${q.pick(ans, LET67)}</div>`;
  return q.done(html,
    `Từ ${HM67(start)} đến ${HM67(end)} là ${d} phút, nên chọn ${ans}.`);
},

/* ===== tr.81 – Bài 3: bảng công việc buổi chiều Chủ nhật ===== */
() => {
  const q = Q(3, 'Vào buổi chiều Chủ nhật, cả nhà sẽ cùng nhau làm các công việc:');
  const t2 = pick([15 * 60 + 30, 16 * 60, 16 * 60 + 30]);   /* bắt đầu xem đá bóng */
  const t3 = t2 + pick([90, 105, 120]);                     /* kết thúc trận đấu */
  const t1 = t2 - R(1, 4) * 15;                             /* hạn dọn nhà xong */
  const t4 = t3 + R(1, 4) * 15;                             /* hạn nấu bữa tối xong */
  const viec = [
    {ten: 'Dọn nhà', tg: 'Trước<br>' + DIG67(t1), xong: t1},
    {ten: 'Xem đá bóng', tg: DIG67(t2) + '<br>đến<br>' + DIG67(t3), xong: t3},
    {ten: 'Nấu bữa tối', tg: 'Trước<br>' + DIG67(t4), xong: t4}
  ];
  const cot = SHF67(viec);                                  /* đổi thứ tự các cột */
  const thutu = viec.slice().sort((a, b) => a.xong - b.xong).map(v => v.ten);
  const TEN = cot.map(v => v.ten);
  const html = `<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Công việc</th>${cot.map(v => `<th>${v.ten}</th>`).join('')}</tr>
      <tr><td><b>Thời gian</b></td>${cot.map(v => `<td>${v.tg}</td>`).join('')}</tr>
    </table></div>
    <div class="b67-sub">Hỏi cả nhà sẽ làm những việc đó theo thứ tự như thế nào?</div>
    <div class="fill-line b67-wide">Việc làm trước tiên: ${q.pick(thutu[0], TEN)}</div>
    <div class="fill-line b67-wide">Việc làm tiếp theo: ${q.pick(thutu[1], TEN)}</div>
    <div class="fill-line b67-wide">Việc làm sau cùng: ${q.pick(thutu[2], TEN)}</div>
    <div class="hint-line">Sắp xếp theo thời gian làm xong từ sớm đến muộn.</div>`;
  return q.done(html,
    `Dọn nhà xong trước ${HM67(t1)}, xem đá bóng đến ${HM67(t3)}, `
    + `nấu bữa tối xong trước ${HM67(t4)}. Thứ tự: ${thutu.join(' → ')}.`);
},

/* ===== tr.81–82 – Bài 4: tờ lịch – chọn ngày Chủ nhật đi chơi ===== */
() => {
  const thang = R(3, 12);
  const q = Q(4, `Buổi tối, cả nhà cùng nhau lên kế hoạch đi chơi vào một ngày Chủ nhật
    trong tháng sau (tháng ${thang}). Quan sát tờ lịch dưới đây và cho biết cả nhà có thể
    đi chơi vào những ngày nào trong tháng ${thang}.`);
  const fw = R(0, 6);
  const cn = CN67(thang, fw);
  const html = cal67(thang, fw)
    + `<div class="b67-line">Cả nhà có thể đi chơi vào các ngày Chủ nhật:
        ${cn.map(d => q.num(d)).join('<span class="op">,</span>')} của tháng ${thang}.</div>
      <div class="b67-line">Tháng ${thang} có ${q.num(cn.length)} ngày Chủ nhật.</div>`;
  return q.done(html,
    `Các ngày Chủ nhật của tháng ${thang} là ${cn.join(', ')} — tất cả có ${cn.length} ngày.`);
},

/* ===== tr.82 – Bài 1 (hoạt động 2): trại hè kéo dài bao nhiêu ngày ===== */
() => {
  const q = Q(1, '');
  const fw = R(0, 6);
  const b = R(26, 30);
  const a = b - R(4, 7);
  const html = cal67(6, fw)
    + `<p class="wordq">Trại hè được tổ chức từ ngày ${a} tháng 6 đến hết ngày ${b} tháng 6.
        Hỏi trại hè được tổ chức trong bao nhiêu ngày?</p>
      <div class="bullet">Trại hè được tổ chức trong ${q.num(b - a + 1)} ngày.</div>`;
  return q.done(html,
    `Từ ngày ${a} đến hết ngày ${b} có ${b} − ${a} + 1 = ${b - a + 1} (ngày).`);
},

/* ===== tr.82 – Bài 2 (hoạt động 2): thứ Sáu đầu tiên, thứ Hai tuần kế tiếp ===== */
() => {
  const q = Q(2, '');
  const fw = R(0, 6);
  const sau = NGAY67(fw, 4);            /* thứ Sáu đầu tiên của tháng 6 */
  const hai = sau + 3;                  /* thứ Hai của tuần kế tiếp */
  const html = cal67(6, fw)
    + `<div class="b67-line"><span class="b67-let">a)</span>Thời hạn đăng kí tham dự trại hè
        là hết ngày thứ Sáu đầu tiên của tháng 6. Vậy thời hạn đăng kí là hết ngày nào?</div>
      <div class="bullet">Thời hạn đăng kí là hết ngày ${q.num(sau)} tháng 6.</div>
      <div class="b67-line"><span class="b67-let">b)</span>Danh sách những người tham dự sự kiện
        này sẽ được thông báo vào thứ Hai tuần kế tiếp. Đó là ngày nào?</div>
      <div class="bullet">Đó là ngày ${q.num(hai)} tháng 6.</div>`;
  return q.done(html,
    `Nhìn cột thứ Sáu: ngày thứ Sáu đầu tiên là ngày ${sau}. `
    + `Thứ Hai tuần kế tiếp là ngày ${sau} + 3 = ${hai}.`);
},

/* ===== tr.83 – Bài 3a: Nam chuẩn bị đồ dùng trong bao lâu ===== */
() => {
  const q = Q(3, 'a) Một ngày trước thời điểm diễn ra trại hè, buổi sáng Nam chuẩn bị '
    + 'những đồ dùng cần thiết. Thời gian bắt đầu và kết thúc như sau:');
  const start = R(7, 8) * 60 + R(0, 11) * 5;
  const gio = R(1, 2), phut = R(1, 11) * 5;
  const d = gio * 60 + phut;
  const end = start + d;
  const html = `<div class="b67-row b67-row2">
      ${clock67(start, 'Bắt đầu', '')}${clock67(end, 'Kết thúc', '')}</div>
    <p class="wordq">Hỏi Nam đã chuẩn bị đồ dùng trong bao lâu?</p>
    <div class="bullet">Nam đã chuẩn bị đồ dùng trong ${q.num(gio)} giờ ${q.num(phut)} phút.</div>`;
  return q.done(html,
    `Từ ${HM67(start)} đến ${HM67(end)} là ${gio} giờ ${phut} phút.`);
},

/* ===== tr.83 – Bài 3b: Nam nướng bánh quy trong bao lâu ===== */
() => {
  const q = Q(3, 'b) Buổi chiều, Nam nướng bánh quy để tặng các bạn. '
    + 'Thời gian bắt đầu và kết thúc như sau:');
  const start = R(14, 16) * 60 + R(0, 11) * 5;
  const d = R(3, 11) * 5;
  const end = start + d;
  const html = `<div class="b67-row b67-row2">
      ${clock67(start, 'Bắt đầu', '')}${clock67(end, 'Kết thúc', '')}</div>
    <p class="wordq">Hỏi Nam đã nướng bánh trong bao lâu?</p>
    <div class="bullet">Nam đã nướng bánh trong ${q.num(d)} phút.</div>`;
  return q.done(html,
    `Từ ${HM67(start)} đến ${HM67(end)} là ${d} phút.`);
},

/* ===== tr.83–84 – Bài 4: các hoạt động của ngày đầu tiên ở trại hè ===== */
() => {
  const q = Q(4, 'Vào ngày đầu tiên tham dự trại hè, mỗi bạn được chọn tham gia hai hoặc ba '
    + 'hoạt động (không trùng thời gian) trong các hoạt động sau:');
  const hetSang = 11 * 60 + 30;
  const tenSang = SHF67(['Vẽ tranh trên gỗ', 'Rung chuông vàng', 'Làm đồ chơi tái chế']);
  const batSang = SHF67([0, 2, 3, 4, 6]).slice(0, 3).map(k => 10 * 60 + k * 5);
  const sang = tenSang.map((ten, i) => ({ten, s: batSang[i], e: hetSang}));
  const t0 = pick([13 * 60 + 30, 14 * 60, 14 * 60 + 30]);
  const chieu = [
    {ten: 'Làm đồ gốm', s: t0, e: t0 + 60},
    {ten: 'Làm bánh giầy', s: t0 + 60, e: t0 + 120}
  ];
  const all = sang.concat(chieu);
  const hienThi = SHF67(all);
  const hoi = pick(all);                          /* hoạt động được hỏi ở câu a */
  const chon = sang[R(0, 2)];                     /* hoạt động buổi sáng Nam đã chọn */
  const themTen = chieu.map(x => x.ten);          /* hai hoạt động buổi chiều đều hợp lệ */
  const dapAnThem = themTen.slice().sort().join(',');
  const moiTen = all.map(x => x.ten);
  const ba = [chon, chieu[0], chieu[1]];
  const tenBa = ba.map(x => x.ten);
  const html = '<div class="b67-act">' + hienThi.map(x =>
      `<div>${x.ten}<div class="tm">${DIG67(x.s)} <b>&minus;</b> ${DIG67(x.e)}</div></div>`).join('')
    + '</div>'
    + `<div class="b67-line"><span class="b67-let">a)</span>Hoạt động
        <b>${hoi.ten}</b> kéo dài ${q.num(hoi.e - hoi.s)} phút.</div>
      <div class="b67-sub">b) Nam đã chọn hoạt động <b>${chon.ten}</b>.
        Nam còn có thể chọn thêm những hoạt động nào?</div>
      <div class="fill-line b67-wide">${q.pick(dapAnThem, moiTen)}</div>
      <div class="hint-line">Chạm để chọn tất cả các hoạt động không trùng thời gian
        với hoạt động Nam đã chọn.</div>
      <div class="b67-sub">c) Ba hoạt động của Nam diễn ra theo thứ tự nào?</div>
      <div class="fill-line b67-wide">Đầu tiên: ${q.pick(tenBa[0], tenBa)}</div>
      <div class="fill-line b67-wide">Tiếp theo: ${q.pick(tenBa[1], tenBa)}</div>
      <div class="fill-line b67-wide">Sau cùng: ${q.pick(tenBa[2], tenBa)}</div>`;
  return q.done(html,
    `${hoi.ten}: từ ${HM67(hoi.s)} đến ${HM67(hoi.e)} là ${hoi.e - hoi.s} phút. `
    + `Ba hoạt động buổi sáng đều kết thúc lúc ${HM67(hetSang)} nên trùng thời gian với nhau; `
    + `chỉ còn ${themTen.join(' và ')} là không trùng. `
    + `Thứ tự: ${tenBa.join(' → ')}.`);
},
];
