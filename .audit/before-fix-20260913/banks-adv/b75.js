/*CSS
.b75adv-head{font-weight:800;color:#1e6f50;text-align:center;margin:10px 0 2px;font-size:16px}
.b75adv-start{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;
  font-weight:800;color:#2b3a5a;margin:8px 0}
.b75adv-tbl .qin{width:56px !important}
.b75adv-tbl td{white-space:nowrap}
.b75adv-dice{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin:9px 0;
  background:#f4f8ff;border:2.5px solid #a8c8ee;border-radius:12px;padding:8px 6px}
.b75adv-dice svg{width:42px;height:42px;margin:0}
.b75adv-clue{background:#f3fbf3;border:2.5px solid #9ccf9c;border-radius:12px;padding:6px 12px;margin:8px 0}
.b75adv-clue .bullet{justify-content:flex-start;color:#245c24;line-height:1.9}
.b75adv-money{font-weight:700;line-height:1.9;margin:4px 0}
CSS*/

/* ===== NÂNG CAO — BÀI 75: THỰC HÀNH VÀ TRẢI NGHIỆM THU THẬP, PHÂN LOẠI,
   GHI CHÉP SỐ LIỆU, ĐỌC BẢNG SỐ LIỆU =====
   Dùng lại của phần cơ bản: ART.b75Tally, ART.b75Box, ART.b75Row, ART.b75Col,
   ART.b75Die, b75Pad. Hàm riêng của phần nâng cao đặt tiền tố b75adv.
   Phạm vi kiến thức: đọc bảng số liệu, cộng trừ trong phạm vi 100 000,
   nhân/chia với số có một chữ số, chia có dư, xem đồng hồ, tiền Việt Nam. */

/* trộn mảng bằng R(), không dùng Math.random trực tiếp */
const b75advMix = a => {
  const s = a.slice();
  for (let i = s.length - 1; i > 0; i--){ const j = R(0, i); const t = s[i]; s[i] = s[j]; s[j] = t; }
  return s;
};
const b75advTong = a => a.reduce((x, y) => x + y, 0);
const b75advSS = (a, b) => a > b ? '>' : a < b ? '<' : '=';
/* viết số có nhiều chữ số, mỗi lớp cách nhau một khoảng trắng */
const b75advSp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b75advGio = t => Math.floor(t / 60);
const b75advPhut = t => t % 60;

/* ---- bảng nhiều hàng: ô đầu mỗi hàng là tên hàng ---- */
ART.b75advTbl = (goc, cot, hang) =>
  `<div class="b75-wrap"><table class="b75-tbl b75adv-tbl">
    <tr><td class="hd">${goc}</td>${cot.map(c => `<td class="hd">${c}</td>`).join('')}</tr>
    ${hang.map(h => `<tr><td class="hd">${h[0]}</td>${h.slice(1).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
  </table></div>`;

/* ---- đồng hồ điện tử hiện giờ và phút ---- */
ART.b75advLcd = (h, m) => `<svg class="b75-lcd" viewBox="0 0 120 64">
  <rect x="4" y="4" width="112" height="44" rx="7" fill="#1c1c1c" stroke="#6b6b6b" stroke-width="3"/>
  <rect x="10" y="10" width="100" height="32" rx="4" fill="#111"/>
  <text x="60" y="36" text-anchor="middle" font-size="25" font-weight="800"
    fill="#fff" font-family="monospace" letter-spacing="1.5">${b75Pad(h)}:${b75Pad(m)}</text>
  <rect x="20" y="49" width="80" height="7" rx="3.5" fill="#c9c9c9"/>
  <rect x="34" y="55" width="52" height="5" rx="2.5" fill="#9a9a9a"/>
</svg>`;

ADV.b75 = [

/* ===== 1. Hai lớp cùng bình chọn — lập bảng số liệu hai chiều ===== */
() => {
  const q = Q(1, 'Hai lớp 3A và 3B cùng bình chọn trò chơi cho ngày hội cắm trại. '
    + 'Mỗi bạn chỉ được chọn một trò chơi. Kết quả bình chọn của mỗi lớp được ghi lại '
    + 'bằng vạch kiểm như sau:');
  const TRO = ['Kéo co', 'Nhảy bao bố', 'Ném còn', 'Đi cà kheo', 'Bịt mắt bắt dê'];
  const tc = b75advMix(TRO).slice(0, 3);
  /* ba khoảng rời nhau nên tổng của ba trò chơi luôn khác nhau đôi một */
  const cong = b75advMix([R(8, 12), R(14, 18), R(20, 24)]);
  const A = cong.map(t => R(3, t - 3));
  const B = cong.map((t, i) => t - A[i]);
  const tA = b75advTong(A), tB = b75advTong(B), tAll = tA + tB;
  const mx = Math.max(...cong), mn = Math.min(...cong);
  const nhat = tc[cong.indexOf(mx)], itn = tc[cong.indexOf(mn)];
  const dau = b75advSS(tA, tB);

  const html = '<div class="b75adv-head">Lớp 3A</div>' + ART.b75Box(tc, A)
    + '<div class="b75adv-head">Lớp 3B</div>' + ART.b75Box(tc, B)
    + '<div class="note">Mỗi vạch là một bạn. Mỗi nhóm vạch kiểm là 5 bạn.</div>'
    + '<div class="b75-ask">a) Đếm số vạch kiểm rồi hoàn thành bảng số liệu sau.</div>'
    + ART.b75advTbl('Số bạn chọn (người)', [...tc, 'Cả ba trò chơi'], [
        ['Lớp 3A', ...A.map(v => q.num(v)), q.num(tA)],
        ['Lớp 3B', ...B.map(v => q.num(v)), q.num(tB)],
        ['Cả hai lớp', ...cong.map(v => q.num(v)), q.num(tAll)]
      ])
    + '<div class="b75-ask">b) Tính cả hai lớp thì trò chơi nào được nhiều bạn bình chọn nhất, '
    + 'trò chơi nào được ít bạn bình chọn nhất?</div>'
    + `<div class="fill-line b75-wide">Nhiều bạn chọn nhất: ${q.pick(nhat, tc)}</div>
       <div class="fill-line b75-wide">Ít bạn chọn nhất: ${q.pick(itn, tc)}</div>`
    + '<div class="b75-ask">c) So sánh số bạn đã bình chọn của hai lớp.</div>'
    + `<div class="cmp-row"><span class="side">Số bạn lớp 3A</span>${q.sign(dau)}<span class="side">Số bạn lớp 3B</span></div>`
    + '<div class="b75-ask">d) Trò chơi được nhiều bạn chọn nhất hơn trò chơi được ít bạn chọn nhất '
    + 'bao nhiêu bạn?</div>'
    + `<div class="bullet">Nhiều hơn ${q.num(mx - mn)} bạn.</div>`
    + '<div class="hint-line">Số ở cột cuối cùng là tổng số bạn của cả ba trò chơi. '
    + 'Hàng "Cả hai lớp" bằng số bạn lớp 3A cộng với số bạn lớp 3B. '
    + 'Chạm vào ô dấu để đổi &gt; &lt; = .</div>';
  return q.done(html,
    tc.map((t, i) => `${t}: 3A có ${A[i]} bạn, 3B có ${B[i]} bạn, cả hai lớp ${A[i]} + ${B[i]} = ${cong[i]} (bạn)`).join('; ')
    + `. Lớp 3A: ${A.join(' + ')} = ${tA} (bạn); lớp 3B: ${B.join(' + ')} = ${tB} (bạn); `
    + `cả hai lớp ${tA} + ${tB} = ${tAll} (bạn). ${tA} ${dau} ${tB}. `
    + `Trò chơi được chọn nhiều nhất là ${nhat.toLowerCase()} (${mx} bạn), ít nhất là `
    + `${itn.toLowerCase()} (${mn} bạn); ${mx} − ${mn} = ${mx - mn} (bạn).`);
},

/* ===== 2. Lịch trình chuyến đi — tính thời gian kết thúc mỗi hoạt động ===== */
() => {
  const q = Q(2, 'Lớp 3A ghi lại lịch trình chuyến đi trải nghiệm như bảng dưới đây. '
    + 'Các hoạt động diễn ra liên tiếp nhau, hoạt động trước vừa kết thúc thì hoạt động sau '
    + 'bắt đầu ngay. Hãy tính thời gian kết thúc của mỗi hoạt động.');
  const h0 = R(7, 8);
  const VIEC = ['Đi xe ô tô đến nơi', 'Tham quan vườn cây ăn quả',
    'Chơi trò chơi tập thể', 'Ăn trưa và nghỉ ngơi'];
  const d = [pick([40, 45, 50]), pick([50, 55, 60]), pick([35, 40, 45]), pick([55, 60])];
  const moc = [];
  let t = h0 * 60;
  for (let i = 0; i < 4; i++){ t += d[i]; moc.push(t); }
  const tong = b75advTong(d);
  const dau = b75advSS(d[0], d[2]);
  const oGio = x => `${q.num(b75advGio(x))} giờ ${q.num(b75advPhut(x))} phút`;

  const html = `<div class="b75adv-start"><span>Cả lớp xuất phát từ trường lúc</span>
      ${ART.b75advLcd(h0, 0)}</div>`
    + ART.b75advTbl('Hoạt động', ['Thời gian kéo dài', 'Kết thúc lúc'],
        VIEC.map((v, i) => [v, `${d[i]} phút`, oGio(moc[i])]))
    + '<div class="b75-ask">a) Chuyến đi kéo dài tất cả bao nhiêu thời gian '
    + '(tính từ lúc xuất phát đến khi ăn trưa và nghỉ ngơi xong)?</div>'
    + `<div class="fill-line">Chuyến đi kéo dài ${q.num(b75advGio(tong))} giờ
        ${q.num(b75advPhut(tong))} phút.</div>`
    + '<div class="b75-ask">b) So sánh thời gian đi xe ô tô và thời gian chơi trò chơi tập thể.</div>'
    + `<div class="cmp-row"><span class="side">${d[0]} phút</span>${q.sign(dau)}<span class="side">${d[2]} phút</span></div>`
    + '<div class="hint-line">Lấy thời gian bắt đầu cộng với thời gian kéo dài thì được thời gian '
    + 'kết thúc. Cứ 60 phút thì đổi thành 1 giờ. Chạm vào ô dấu để đổi &gt; &lt; = .</div>';
  return q.done(html,
    VIEC.map((v, i) => `${v}: bắt đầu lúc ${b75advGio(i === 0 ? h0 * 60 : moc[i - 1])} giờ `
      + `${b75advPhut(i === 0 ? h0 * 60 : moc[i - 1])} phút, kéo dài ${d[i]} phút nên kết thúc lúc `
      + `${b75advGio(moc[i])} giờ ${b75advPhut(moc[i])} phút`).join('; ')
    + `. Cả chuyến đi: ${d.join(' + ')} = ${tong} (phút) = ${b75advGio(tong)} giờ `
    + `${b75advPhut(tong)} phút. ${d[0]} ${dau} ${d[2]}.`);
},

/* ===== 3. Chuẩn bị đồ ăn — nhân, chia có dư, số hộp ít nhất ===== */
() => {
  const q = Q(3, 'Lớp 3A chuẩn bị bánh mang theo chuyến đi. Số bạn đi của mỗi tổ được ghi lại '
    + 'bằng vạch kiểm như sau:');
  const TO = ['Tổ 1', 'Tổ 2', 'Tổ 3'];
  const so = [R(9, 14), R(9, 14), R(9, 14)];
  const soBan = b75advTong(so);
  const moi = pick([2, 3]);
  const banh = soBan * moi;
  /* chọn số bánh mỗi hộp sao cho phép chia luôn còn dư */
  const KS = [4, 5, 6, 8].filter(x => banh % x !== 0);
  const k = KS.length ? pick(KS) : 7;
  const hop = Math.floor(banh / k), du = banh % k;

  const html = ART.b75Box(TO, so)
    + '<div class="note">Mỗi vạch là một bạn. Mỗi nhóm vạch kiểm là 5 bạn.</div>'
    + '<div class="b75-ask">a) Mỗi tổ có bao nhiêu bạn đi? Cả lớp có bao nhiêu bạn đi?</div>'
    + ART.b75Row('Tổ', TO, 'Số bạn đi (người)', so.map(v => q.num(v)))
    + `<div class="fill-line">Cả lớp có ${q.num(soBan)} bạn đi.</div>`
    + `<div class="b75-ask">b) Mỗi bạn được phát ${moi} chiếc bánh. Cả lớp cần tất cả
        bao nhiêu chiếc bánh?</div>`
    + `<div class="bullet">Cả lớp cần ${q.num(banh)} chiếc bánh.</div>`
    + `<div class="b75-ask">c) Số bánh đó được xếp vào các hộp, mỗi hộp ${k} chiếc bánh.</div>`
    + `<div class="bullet">Xếp được nhiều nhất ${q.num(hop)} hộp đầy và còn thừa
        ${q.num(du)} chiếc bánh.</div>`
    + '<div class="b75-ask">d) Muốn xếp hết số bánh đó thì cần ít nhất bao nhiêu hộp?</div>'
    + `<div class="bullet">Cần ít nhất ${q.num(hop + 1)} hộp.</div>`
    + '<div class="b75-ask">e) Cần mua thêm ít nhất bao nhiêu chiếc bánh nữa để tất cả các hộp '
    + 'đều đầy bánh?</div>'
    + `<div class="bullet">Cần mua thêm ${q.num(k - du)} chiếc bánh.</div>`
    + '<div class="hint-line">Ở câu d) số bánh còn thừa vẫn phải xếp vào một hộp nữa. '
    + `Ở câu e) hộp cuối cùng mới có ${du} chiếc nên còn thiếu ${k} − ${du} chiếc nữa thì đầy.</div>`;
  return q.done(html,
    `Số bạn đi: ${so.join(' + ')} = ${soBan} (bạn). `
    + `Số bánh: ${soBan} × ${moi} = ${banh} (chiếc). `
    + `${banh} : ${k} = ${hop} (dư ${du}) nên xếp được ${hop} hộp đầy, thừa ${du} chiếc. `
    + `Muốn xếp hết cần ${hop} + 1 = ${hop + 1} (hộp). `
    + `Hộp cuối cùng cần thêm ${k} − ${du} = ${k - du} (chiếc bánh).`);
},

/* ===== 4. Bảng số liệu về tiền — cộng, trừ, gấp mấy lần ===== */
() => {
  const q = Q(4, 'Bảng dưới đây ghi lại số tiền lớp 3A đã chi cho chuyến đi trải nghiệm.');
  const nuoc = R(8, 14) * 1000;
  const g = pick([2, 3]);
  const leu = nuoc * g;
  /* số tiền mua bánh khác số tiền thuê lều để câu hỏi "nhiều nhất" có đáp án duy nhất */
  const DS = [];
  for (let x = 15; x <= 28; x++) if (x * 1000 !== leu) DS.push(x * 1000);
  const banh = pick(DS);
  const tong = nuoc + banh + leu;
  const con = R(3, 9) * 1000;
  const quy = tong + con;
  const KHOAN = ['Mua nước uống', 'Mua bánh', 'Thuê lều trại'];
  const tien = [nuoc, banh, leu];
  const mx = Math.max(...tien);
  const nhat = KHOAN[tien.indexOf(mx)];

  const html = ART.b75Col('Khoản chi', 'Số tiền (đồng)',
      KHOAN.map((kh, i) => [kh, b75advSp(tien[i])]))
    + '<div class="b75-ask">a) Lớp 3A đã chi tất cả bao nhiêu tiền cho chuyến đi?</div>'
    + `<div class="b75adv-money">Cả lớp đã chi ${q.num(tong)} đồng.</div>`
    + '<div class="b75-ask">b) Khoản nào lớp chi nhiều tiền nhất? Khoản nào lớp chi ít tiền nhất?</div>'
    + `<div class="fill-line b75-wide">Chi nhiều nhất: ${q.pick(nhat, KHOAN)}</div>
       <div class="fill-line b75-wide">Chi ít nhất: ${q.pick('Mua nước uống', KHOAN)}</div>`
    + '<div class="b75-ask">c) Số tiền thuê lều trại gấp mấy lần số tiền mua nước uống?</div>'
    + `<div class="b75adv-money">Gấp ${q.num(g)} lần.</div>`
    + '<div class="b75-ask">d) Số tiền mua bánh nhiều hơn số tiền mua nước uống bao nhiêu?</div>'
    + `<div class="b75adv-money">Nhiều hơn ${q.num(banh - nuoc)} đồng.</div>`
    + `<div class="b75-ask">e) Quỹ lớp có ${b75advSp(quy)} đồng. Sau khi chi cho chuyến đi,
        quỹ lớp còn lại bao nhiêu tiền?</div>`
    + `<div class="b75adv-money">Quỹ lớp còn lại ${q.num(con)} đồng.</div>`
    + '<div class="hint-line">Muốn biết gấp mấy lần, em lấy số tiền thuê lều trại chia cho '
    + 'số tiền mua nước uống. Viết đáp số vào ô mà không viết dấu cách giữa các chữ số.</div>';
  return q.done(html,
    `Tất cả: ${b75advSp(nuoc)} + ${b75advSp(banh)} + ${b75advSp(leu)} = ${b75advSp(tong)} (đồng). `
    + `Chi nhiều nhất là ${nhat.toLowerCase()} (${b75advSp(mx)} đồng), ít nhất là mua nước uống `
    + `(${b75advSp(nuoc)} đồng). ${b75advSp(leu)} : ${b75advSp(nuoc)} = ${g} nên gấp ${g} lần. `
    + `${b75advSp(banh)} − ${b75advSp(nuoc)} = ${b75advSp(banh - nuoc)} (đồng). `
    + `${b75advSp(quy)} − ${b75advSp(tong)} = ${b75advSp(con)} (đồng).`);
},

/* ===== 5. Gieo xúc xắc — mặt nào dễ ra hơn và ghi chép kết quả 12 lần gieo ===== */
() => {
  const q = Q(5, 'Rô-bốt chọn màu áo đồng phục cho lớp bằng cách gieo xúc xắc theo quy tắc sau:');
  const MAU = b75advMix(['Trắng', 'Đỏ', 'Vàng']);
  const NHOM = [[1, 2, 3], [4, 5], [6]];
  /* mỗi bộ ba số đều có tổng bằng 12 và ba số khác nhau đôi một */
  const dem = b75advMix(pick([[6, 4, 2], [7, 3, 2], [6, 5, 1], [5, 4, 3], [7, 4, 1]]));
  const mx = Math.max(...dem), mn = Math.min(...dem);
  const thang = MAU[dem.indexOf(mx)], itn = MAU[dem.indexOf(mn)];
  const seq = [];
  MAU.forEach((_, i) => { for (let j = 0; j < dem[i]; j++) seq.push(pick(NHOM[i])); });
  const bay = b75advMix(seq);

  const luat = MAU.map((m, i) => `<div class="b75-rule"><span>&ndash; Nếu mặt trên là mặt</span>
      ${NHOM[i].map(n => ART.b75Die(n)).join('<span>hoặc</span>')}
      <span>thì chọn áo màu ${m.toLowerCase()}.</span></div>`).join('');
  const html = luat
    + '<div class="b75-ask">a) Mỗi màu áo ứng với mấy mặt của xúc xắc?</div>'
    + ART.b75Row('Màu áo', MAU, 'Số mặt xúc xắc (mặt)', MAU.map((_, i) => q.num(NHOM[i].length)))
    + '<div class="b75-ask">b) Theo quy tắc trên, màu áo nào ứng với nhiều mặt xúc xắc nhất '
    + 'nên dễ được chọn nhất?</div>'
    + `<div class="fill-line b75-wide">${q.pick(MAU[0], MAU)}</div>`
    + '<div class="b75-ask">c) Cả lớp gieo xúc xắc 12 lần, các mặt trên thu được như sau. '
    + 'Hãy đếm rồi ghi lại số lần chọn được mỗi màu áo.</div>'
    + `<div class="b75adv-dice">${bay.map(n => ART.b75Die(n)).join('')}</div>`
    + ART.b75Row('Màu áo', MAU, 'Số lần chọn được (lần)', MAU.map((_, i) => q.num(dem[i])))
    + '<div class="b75-ask">d) Sau 12 lần gieo, màu áo nào được chọn nhiều lần nhất?</div>'
    + `<div class="fill-line b75-wide">${q.pick(thang, MAU)}</div>`
    + `<div class="b75-ask">e) Màu ${thang.toLowerCase()} được chọn nhiều hơn màu
        ${itn.toLowerCase()} bao nhiêu lần?</div>`
    + `<div class="bullet">Nhiều hơn ${q.num(mx - mn)} lần.</div>`
    + '<div class="hint-line">Xúc xắc có 6 mặt. Màu nào ứng với nhiều mặt hơn thì càng dễ được chọn. '
    + 'Ở câu c) em hãy đếm số xúc xắc của từng nhóm mặt rồi cộng số lần của các mặt cùng một màu.</div>';
  return q.done(html,
    MAU.map((m, i) => `màu ${m.toLowerCase()} ứng với ${NHOM[i].length} mặt (mặt ${NHOM[i].join(', ')})`).join('; ')
    + `. Màu ${MAU[0].toLowerCase()} ứng với 3 mặt, nhiều mặt nhất nên dễ được chọn nhất. `
    + `Đếm 12 lần gieo: ` + MAU.map((m, i) => `màu ${m.toLowerCase()} ${dem[i]} lần`).join(', ')
    + `. Số lớn nhất là ${mx} nên màu ${thang.toLowerCase()} được chọn nhiều lần nhất; `
    + `${mx} − ${mn} = ${mx - mn} (lần).`);
},

/* ===== 6. Bảng số liệu bị mờ một ô — biết tổng, tìm số còn thiếu ===== */
() => {
  const QUA = b75advMix(['Chuối', 'Cam', 'Táo', 'Ổi', 'Xoài']).slice(0, 4);
  /* bốn khoảng rời nhau nên bốn số liệu luôn khác nhau đôi một */
  const sl = b75advMix([R(3, 5), R(7, 9), R(11, 13), R(15, 17)]);
  const tong = b75advTong(sl);
  const k = R(0, 3);
  const mx = Math.max(...sl), mn = Math.min(...sl);
  const nhat = QUA[sl.indexOf(mx)], itn = QUA[sl.indexOf(mn)];
  const sx = sl.slice().sort((a, b) => a - b);
  const q = Q(6, `Mỗi bạn lớp 3A mang theo đúng một loại quả cho chuyến đi. Bảng số liệu ghi lại `
    + `số bạn mang mỗi loại quả nhưng bị mờ mất một ô. Biết cả lớp 3A có ${tong} bạn.`);

  const html = ART.b75Row('Loại quả', QUA, 'Số bạn mang (người)',
      sl.map((v, i) => i === k ? q.num(v) : v))
    + '<div class="b75-ask">a) Tìm số còn thiếu rồi hoàn thành bảng số liệu.</div>'
    + `<div class="b75adv-clue">
        <div class="bullet">Ba loại quả đã biết có tất cả:
          ${q.num(tong - sl[k])} bạn mang.</div>
        <div class="bullet">Vậy số bạn mang ${QUA[k].toLowerCase()} là:
          ${q.num(sl[k])} bạn.</div>
      </div>`
    + '<div class="b75-ask">b) Loại quả nào được nhiều bạn mang nhất? '
    + 'Loại quả nào được ít bạn mang nhất?</div>'
    + `<div class="fill-line b75-wide">Nhiều bạn mang nhất: ${q.pick(nhat, QUA)}</div>
       <div class="fill-line b75-wide">Ít bạn mang nhất: ${q.pick(itn, QUA)}</div>`
    + '<div class="b75-ask">c) Viết số bạn mang mỗi loại quả theo thứ tự từ bé đến lớn.</div>'
    + `<div class="chain pill">${sx.map(v => `<span class="cnode q">${q.num(v)}</span>`).join('')}</div>`
    + '<div class="b75-ask">d) Nếu mỗi bạn mang 2 quả thì cả lớp mang tất cả bao nhiêu quả?</div>'
    + `<div class="bullet">Cả lớp mang ${q.num(tong * 2)} quả.</div>`
    + '<div class="hint-line">Lấy tổng số bạn của cả lớp trừ đi số bạn của ba loại quả đã biết '
    + 'thì tìm được số bạn của loại quả bị mờ.</div>';
  return q.done(html,
    `Ba loại quả đã biết: ${sl.filter((_, i) => i !== k).join(' + ')} = ${tong - sl[k]} (bạn). `
    + `Số bạn mang ${QUA[k].toLowerCase()}: ${tong} − ${tong - sl[k]} = ${sl[k]} (bạn). `
    + QUA.map((c, i) => `${c.toLowerCase()}: ${sl[i]} bạn`).join('; ')
    + `. Nhiều nhất là ${nhat.toLowerCase()} (${mx} bạn), ít nhất là ${itn.toLowerCase()} (${mn} bạn). `
    + `Thứ tự từ bé đến lớn: ${sx.join(', ')}. `
    + `Số quả cả lớp mang: ${tong} × 2 = ${tong * 2} (quả).`);
},
];
