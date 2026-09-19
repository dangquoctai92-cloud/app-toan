/* ===== NÂNG CAO — Bài 67: Thực hành xem đồng hồ, xem lịch =====
   Dùng lại các hàm của phần cơ bản trong cùng bài: clock67, cal67, HM67, DIG67,
   SHF67, CN67, SONGAY67, LET67. Hàm riêng của phần nâng cao đặt tiền tố b67adv. */

const b67advGio = t => Math.floor(t / 60) % 24;
const b67advPhut = t => t % 60;

/* thứ trong tuần: 0 = thứ Hai … 6 = Chủ nhật */
const B67ADV_THU = ['thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy', 'Chủ nhật'];

/* fw = thứ của ngày mồng 1; trả về thứ của ngày d */
const b67advThu = (fw, d) => (fw + d - 1) % 7;

/* biết ngày d là thứ w thì ngày mồng 1 của tháng là thứ mấy */
const b67advFw = (d, w) => ((w - (d - 1)) % 7 + 7) % 7;

/* số ngày trong tháng rơi vào thứ w */
const b67advDem = (thang, fw, w) => {
  let n = 0;
  for (let d = 1; d <= SONGAY67[thang]; d++) if (b67advThu(fw, d) === w) n++;
  return n;
};

ADV.b67 = [

/* 1. Toán ngược: biết thời điểm kết thúc, tìm các thời điểm bắt đầu */
() => {
  const q = Q(1, 'Xem đồng hồ rồi tính ngược thời gian để trả lời.');
  const dDuong = R(3, 6) * 5;                 /* thời gian đi đường  */
  const dAn = R(3, 5) * 5;                    /* thời gian ăn sáng   */
  const dCb = R(2, 6) * 5;                    /* thời gian chuẩn bị  */
  let tDen = 0, tRoi = 0, tAn = 0, tCb = 0;
  for (let i = 0; i < 30; i++){
    tDen = R(7, 8) * 60 + R(1, 11) * 5;
    tRoi = tDen - dDuong;
    tAn = tRoi - dAn;
    tCb = tAn - dCb;
    if (tRoi % 60 && tAn % 60 && tCb % 60) break;
  }
  const tong = dDuong + dAn + dCb;
  const html = `<div class="b67-row b67-row2">${clock67(tDen, 'Có mặt ở nơi tập trung', '')}</div>
    <p class="wordq">Nam phải có mặt ở nơi tập trung trại hè vào đúng thời điểm đồng hồ trên chỉ.
      Nam đi từ nhà đến nơi tập trung hết ${dDuong} phút, ăn sáng hết ${dAn} phút và
      chuẩn bị đồ dùng hết ${dCb} phút.</p>
    <div class="b67-line"><span class="b67-let">a)</span>Nam phải rời khỏi nhà lúc
      ${q.num(b67advGio(tRoi))} giờ ${q.num(b67advPhut(tRoi))} phút.</div>
    <div class="b67-line"><span class="b67-let">b)</span>Nam phải bắt đầu ăn sáng lúc
      ${q.num(b67advGio(tAn))} giờ ${q.num(b67advPhut(tAn))} phút.</div>
    <div class="b67-line"><span class="b67-let">c)</span>Nam phải bắt đầu chuẩn bị đồ dùng lúc
      ${q.num(b67advGio(tCb))} giờ ${q.num(b67advPhut(tCb))} phút.</div>
    <div class="b67-line"><span class="b67-let">d)</span>Từ lúc bắt đầu chuẩn bị đồ dùng đến lúc
      có mặt ở nơi tập trung, Nam mất tất cả ${q.num(tong)} phút.</div>
    <div class="hint-line">Muốn tìm thời điểm bắt đầu thì lấy thời điểm kết thúc trừ đi
      khoảng thời gian đã dùng. Hãy tính lùi lần lượt từ lúc có mặt ở nơi tập trung.</div>`;
  return q.done(html,
    `Đồng hồ chỉ ${HM67(tDen)}. Rời nhà: ${HM67(tDen)} lùi ${dDuong} phút được ${HM67(tRoi)}. `
    + `Bắt đầu ăn sáng: ${HM67(tRoi)} lùi ${dAn} phút được ${HM67(tAn)}. `
    + `Bắt đầu chuẩn bị đồ dùng: ${HM67(tAn)} lùi ${dCb} phút được ${HM67(tCb)}. `
    + `Tất cả: ${dCb} + ${dAn} + ${dDuong} = ${tong} (phút).`);
},

/* 2. So sánh hai khoảng thời gian (đồng hồ kim và đồng hồ điện tử) */
() => {
  const q = Q(2, 'Tính rồi so sánh thời gian làm việc của hai bạn.');
  const dV = R(4, 11) * 5;
  const lech = pick([5, 10, 15, 20]) * (R(1, 2) === 1 ? 1 : -1);
  const dM = dV + lech >= 10 ? dV + lech : dV + Math.abs(lech);
  const v1 = R(8, 9) * 60 + R(0, 11) * 5, v2 = v1 + dV;
  const m1 = R(14, 15) * 60 + R(0, 11) * 5, m2 = m1 + dM;
  const dau = dV > dM ? '>' : dV < dM ? '<' : '=';
  const lau = dV > dM ? 'Việt' : 'Mai';
  const hieu = Math.abs(dV - dM);
  const html = `<div class="b67adv-box"><div class="b67adv-ten">Việt làm đồ chơi tái chế</div>
      <div class="b67-row b67-row2">${clock67(v1, 'Bắt đầu', '')}${clock67(v2, 'Kết thúc', '')}</div>
    </div>
    <div class="b67adv-box"><div class="b67adv-ten">Mai vẽ tranh trên gỗ</div>
      <div class="b67adv-tm"><span>Bắt đầu ${DIG67(m1)}</span><span>Kết thúc ${DIG67(m2)}</span></div>
    </div>
    <div class="b67-line"><span class="b67-let">a)</span>Việt làm đồ chơi tái chế hết
      ${q.num(dV)} phút.</div>
    <div class="b67-line"><span class="b67-let">b)</span>Mai vẽ tranh trên gỗ hết
      ${q.num(dM)} phút.</div>
    <div class="b67-line"><span class="b67-let">c)</span>So sánh:</div>
    <div class="cmp-row"><span class="side">Thời gian của Việt</span>${q.sign(dau)}<span class="side">Thời gian của Mai</span></div>
    <div class="b67-line"><span class="b67-let">d)</span>Bạn làm lâu hơn là bạn
      ${q.pick(lau, ['Việt', 'Mai'])}</div>
    <div class="b67-line">Bạn đó làm lâu hơn bạn kia ${q.num(hieu)} phút.</div>
    <div class="hint-line">Chạm vào ô dấu để đổi &gt; &lt; = . Đồng hồ điện tử ${DIG67(m1)}
      chỉ ${HM67(m1)}.</div>`;
  return q.done(html,
    `Việt: từ ${HM67(v1)} đến ${HM67(v2)} là ${dV} phút. `
    + `Mai: từ ${HM67(m1)} đến ${HM67(m2)} là ${dM} phút. `
    + `${dV} ${dau} ${dM} nên bạn ${lau} làm lâu hơn, lâu hơn ${hieu} phút.`);
},

/* 3. Quy luật: các chuyến xe buýt cách đều nhau */
() => {
  const q = Q(3, 'Các chuyến xe buýt rời bến cách đều nhau. Tìm quy luật rồi trả lời.');
  const k = pick([10, 15, 20, 30]);
  const T0 = R(6, 7) * 60 + pick([5, 25, 35, 55]);
  const mocs = [0, 1, 2, 3, 4, 5].map(i => T0 + i * k);
  const le = [];
  for (let v = 5; v < k; v += 5) le.push(v);
  const r = pick(le);
  const j = R(2, 4);                                  /* Nam đến sau chuyến thứ j+1 */
  const X = T0 + j * k + r;
  const chuyen = j + 2;                               /* chuyến gần nhất Nam đi được */
  const cho = k - r;
  const thu8 = T0 + 7 * k;
  const rows = mocs.map((t, i) => `<div><b>Chuyến ${i + 1}:</b> ` + (i < 3 ? HM67(t)
    : `${q.num(b67advGio(t))} giờ ${q.num(b67advPhut(t))} phút`) + '</div>').join('');
  const html = `<div class="b67adv-list">${rows}</div>
    <div class="b67-line"><span class="b67-let">a)</span>Cứ sau ${q.num(k)} phút lại có
      một chuyến xe buýt rời bến.</div>
    <div class="b67-line"><span class="b67-let">b)</span>Chuyến thứ 8 rời bến lúc
      ${q.num(b67advGio(thu8))} giờ ${q.num(b67advPhut(thu8))} phút.</div>
    <div class="b67-line"><span class="b67-let">c)</span>Nam đến bến xe lúc ${HM67(X)}.
      Nam sẽ đi chuyến thứ ${q.num(chuyen)} và phải chờ ${q.num(cho)} phút.</div>
    <div class="hint-line">Ở câu b) từ chuyến 1 đến chuyến 8 cách nhau 7 lần,
      mỗi lần ${k} phút.</div>`;
  return q.done(html,
    `Mỗi chuyến cách chuyến trước ${k} phút. Các chuyến: `
    + `${mocs.map(t => HM67(t)).join(', ')}. `
    + `Chuyến thứ 8: ${HM67(T0)} thêm 7 × ${k} = ${7 * k} phút, được ${HM67(thu8)}. `
    + `Nam đến lúc ${HM67(X)}, chuyến thứ ${chuyen} rời bến lúc ${HM67(T0 + (chuyen - 1) * k)} `
    + `nên Nam phải chờ ${cho} phút.`);
},

/* 4. Xem lịch: nhiều câu hỏi suy luận trên một tờ lịch */
() => {
  const thang = R(3, 11);
  const q = Q(4, `Quan sát tờ lịch tháng ${thang} rồi trả lời các câu hỏi.`);
  const fw = R(0, 6);
  const nd = SONGAY67[thang];
  const d = R(11, 25);
  const cn = CN67(thang, fw);
  const soBay = b67advDem(thang, fw, 5);
  const thuCuoi = b67advThu(fw, nd);
  const thuSau = (fw + nd) % 7;                      /* thứ của ngày 1 tháng sau */
  const html = cal67(thang, fw)
    + `<div class="b67-line"><span class="b67-let">a)</span>Tháng ${thang} có
        ${q.num(nd)} ngày và có ${q.num(soBay)} ngày thứ Bảy.</div>
      <div class="b67-line"><span class="b67-let">b)</span>Ngày ${d} tháng ${thang} là
        ${q.pick(B67ADV_THU[b67advThu(fw, d)], B67ADV_THU)}</div>
      <div class="b67-line"><span class="b67-let">c)</span>Ngày Chủ nhật thứ hai của
        tháng ${thang} là ngày ${q.num(cn[1])}.</div>
      <div class="b67-line"><span class="b67-let">d)</span>Ngày cuối cùng của tháng ${thang} là
        ${q.pick(B67ADV_THU[thuCuoi], B67ADV_THU)}</div>
      <div class="b67-line"><span class="b67-let">e)</span>Ngày 1 tháng ${thang + 1} là
        ${q.pick(B67ADV_THU[thuSau], B67ADV_THU)}</div>
      <div class="hint-line">Ở câu e) tờ lịch không có tháng ${thang + 1}. Em hãy xem ngày
        cuối cùng của tháng ${thang} là thứ mấy, ngày hôm sau chính là ngày 1
        tháng ${thang + 1}.</div>`;
  return q.done(html,
    `Tháng ${thang} có ${nd} ngày, có ${soBay} ngày thứ Bảy. `
    + `Ngày ${d} là ${B67ADV_THU[b67advThu(fw, d)]}. `
    + `Các ngày Chủ nhật là ${cn.join(', ')} nên Chủ nhật thứ hai là ngày ${cn[1]}. `
    + `Ngày ${nd} là ${B67ADV_THU[thuCuoi]}, vậy ngày 1 tháng ${thang + 1} là ${B67ADV_THU[thuSau]}.`);
},

/* 5. Quy luật thứ trong tuần — không có tờ lịch */
() => {
  const thang = R(3, 11);
  const d1 = R(3, 9);
  const w = R(0, 6);
  const q = Q(5, `Biết ngày ${d1} tháng ${thang} là ${B67ADV_THU[w]}. Không cần tờ lịch,
    em hãy trả lời các câu hỏi sau.`);
  const nd = SONGAY67[thang];
  const fw = b67advFw(d1, w);
  const d2 = d1 + 7 * R(1, 2) + R(1, 6);
  const d3 = d1 - R(1, 2);
  const cn = CN67(thang, fw);
  const thuSau = (fw + nd) % 7;
  const html = `<div class="b67-line"><span class="b67-let">a)</span>Ngày ${d2} tháng ${thang} là
      ${q.pick(B67ADV_THU[b67advThu(fw, d2)], B67ADV_THU)}</div>
    <div class="b67-line"><span class="b67-let">b)</span>Ngày ${d3} tháng ${thang} là
      ${q.pick(B67ADV_THU[b67advThu(fw, d3)], B67ADV_THU)}</div>
    <div class="b67-line"><span class="b67-let">c)</span>Ngày 1 tháng ${thang} là
      ${q.pick(B67ADV_THU[fw], B67ADV_THU)}</div>
    <div class="b67-line"><span class="b67-let">d)</span>Các ngày Chủ nhật của tháng ${thang}
      là các ngày: ${cn.map(x => q.num(x)).join('<span class="op">, </span>')}</div>
    <div class="b67-line"><span class="b67-let">e)</span>Ngày 1 tháng ${thang + 1} là
      ${q.pick(B67ADV_THU[thuSau], B67ADV_THU)}</div>
    <div class="hint-line">Cứ sau 7 ngày thì lại đến đúng thứ đó trong tuần.
      Tháng ${thang} có ${nd} ngày.</div>`;
  return q.done(html,
    `Từ ngày ${d1} đếm thêm ${d2 - d1} ngày được ngày ${d2}, đó là ${B67ADV_THU[b67advThu(fw, d2)]}. `
    + `Đếm lùi ${d1 - d3} ngày được ngày ${d3}, đó là ${B67ADV_THU[b67advThu(fw, d3)]}. `
    + `Ngày 1 tháng ${thang} là ${B67ADV_THU[fw]}. `
    + `Các ngày Chủ nhật cách nhau 7 ngày: ${cn.join(', ')}. `
    + `Tháng ${thang} có ${nd} ngày, ngày ${nd} là ${B67ADV_THU[b67advThu(fw, nd)]} `
    + `nên ngày 1 tháng ${thang + 1} là ${B67ADV_THU[thuSau]}.`);
},

/* 6. Suy luận lô-gic: ghép mỗi bạn với một đồng hồ */
() => {
  const q = Q(6, 'Ba bạn đến nơi tập trung trại hè vào ba thời điểm khác nhau. '
    + 'Ba đồng hồ dưới đây chỉ ba thời điểm đó.');
  const t1 = R(7, 8) * 60 + R(1, 5) * 5;
  const t2 = t1 + R(2, 5) * 5;
  const t3 = t2 + R(2, 5) * 5;
  const ts = [t1, t2, t3];
  const hien = SHF67(ts);
  const LT = LET67.slice(0, 3);
  const nm = SHF67(['Mai', 'Việt', 'Rô-bốt']);
  const gio = {};
  gio[nm[0]] = t1; gio[nm[1]] = t2; gio[nm[2]] = t3;
  const chu = n => LT[hien.indexOf(gio[n])];
  const DS = ['Mai', 'Việt', 'Rô-bốt'];
  const html = `<div class="b67-row b67-row4">
      ${hien.map((t, i) => clock67(t, '', LT[i])).join('')}</div>
    <div class="b67adv-clue">
      <div class="bullet">${nm[2]} đến muộn nhất.</div>
      <div class="bullet">${nm[0]} đến trước ${nm[1]}.</div>
    </div>
    ${DS.map(n => `<div class="b67-line b67-wide">Đồng hồ chỉ thời điểm bạn ${n} đến là:
      ${q.pick(chu(n), LT)}</div>`).join('')}
    <div class="b67-line b67-wide">Bạn đến sớm nhất là bạn ${q.pick(nm[0], DS)}</div>
    <div class="b67-line">Bạn đến sớm nhất đến lúc ${q.num(b67advGio(t1))} giờ
      ${q.num(b67advPhut(t1))} phút.</div>
    <div class="b67-line">Bạn đến muộn nhất đến sau bạn đến sớm nhất ${q.num(t3 - t1)} phút.</div>
    <div class="hint-line">Xếp ba thời điểm trên ba đồng hồ từ sớm đến muộn rồi đối chiếu
      với hai dữ kiện đã cho.</div>`;
  return q.done(html,
    `Ba thời điểm xếp từ sớm đến muộn là ${HM67(t1)}, ${HM67(t2)}, ${HM67(t3)}. `
    + `${nm[2]} đến muộn nhất nên ${nm[2]} đến lúc ${HM67(t3)}. `
    + `Còn lại ${nm[0]} và ${nm[1]}, mà ${nm[0]} đến trước nên ${nm[0]} đến lúc ${HM67(t1)} `
    + `và ${nm[1]} đến lúc ${HM67(t2)}. `
    + `Từ ${HM67(t1)} đến ${HM67(t3)} là ${t3 - t1} phút.`);
},
];
