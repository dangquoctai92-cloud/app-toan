/*CSS
.b69adv-box{margin:8px 0;background:#f3fbf3;border:2.5px solid #9ccf9c;border-radius:12px;padding:6px 10px}
.b69adv-ten{font-size:16px;font-weight:800;color:#245c24;text-align:center;margin:2px 0 3px}
.b69adv-clue{background:#fff3e0;border:2.5px solid #e8bd72;border-radius:12px;padding:6px 12px;margin:8px 0}
.b69adv-clue .bullet{justify-content:flex-start;color:#7a4b12;line-height:1.95}
.b69adv-cmp{max-width:420px;margin:6px auto}
.b69adv-cmp .cmp-row{margin:5px 0}
.b69adv-cmp .side{font-size:16px;font-weight:700;color:#2b3a5a}
.b69adv-goods{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px;margin:6px 0}
.b69adv-item{border:2.4px solid #9aa4b5;border-radius:12px;background:#fff;padding:5px 8px;text-align:center}
.b69adv-item svg{height:74px;width:auto;display:inline-block;vertical-align:bottom}
.b69adv-nm{font-size:13px;font-weight:700;color:#4a4460;margin-top:2px}
CSS*/

/* ===== NÂNG CAO — Bài 69: Luyện tập chung (đồng hồ, lịch, tiền Việt Nam, đơn vị đo thời gian)
   Dùng lại các hàm của phần cơ bản trong cùng bài: clock69, cal69, DAY69, HM69, SP69,
   money69, SHF69, THU69, SONGAY69, KEO69, BIM69, BUT69.
   Hàm riêng của phần nâng cao đặt tiền tố b69adv. ================================== */

const b69advGio = t => Math.floor(t / 60) % 24;
const b69advPhut = t => t % 60;

/* đổi một số tiền (bội của 1 000, không quá 50 000) ra các tờ tiền thật */
const B69ADV_MG = [50000, 20000, 10000, 5000, 2000, 1000];
function b69advTo(n){
  const out = [];
  let r = n, g = 0;
  for (let i = 0; i < B69ADV_MG.length; i++){
    const v = B69ADV_MG[i];
    while (r >= v && g++ < 30){ out.push(v); r -= v; }
  }
  return out;
}

/* thứ của ngày d, biết ngày mồng 1 là thứ fw (0 = thứ Hai … 6 = Chủ nhật) */
const b69advThu = (fw, d) => (fw + d - 1) % 7;

ADV.b69 = [

/* 1. Tính ngược thời gian từ thời điểm phải có mặt */
() => {
  const q = Q(1, 'Xem đồng hồ rồi tính ngược thời gian để trả lời.');
  let tDen = 0, tXe = 0, tRoi = 0, tAn = 0;
  let dXe = 20, dBo = 10, dAn = 15;
  for (let i = 0; i < 30; i++){
    dXe = R(3, 6) * 5;                       /* đi xe buýt          */
    dBo = R(2, 4) * 5;                       /* đi bộ ra bến xe     */
    dAn = R(3, 5) * 5;                       /* ăn sáng             */
    tDen = 7 * 60 + R(1, 11) * 5;
    tXe = tDen - dXe;
    tRoi = tXe - dBo;
    tAn = tRoi - dAn;
    if (tXe % 60 && tRoi % 60 && tAn % 60) break;
  }
  const tong = dXe + dBo + dAn;
  const html = `<div class="b69-row b69-row3">${clock69(tDen, 'Có mặt ở trường', '')}</div>
    <p class="wordq">Sáng nay Rô-bốt phải có mặt ở trường vào đúng thời điểm đồng hồ trên chỉ.
      Rô-bốt đi xe buýt từ bến xe đến trường hết ${dXe} phút, đi bộ từ nhà ra bến xe hết
      ${dBo} phút và ăn sáng hết ${dAn} phút.</p>
    <div class="b69-line"><span class="b69-let">a)</span>Rô-bốt phải lên xe buýt lúc
      ${q.num(b69advGio(tXe))} giờ ${q.num(b69advPhut(tXe))} phút.</div>
    <div class="b69-line"><span class="b69-let">b)</span>Rô-bốt phải rời khỏi nhà lúc
      ${q.num(b69advGio(tRoi))} giờ ${q.num(b69advPhut(tRoi))} phút.</div>
    <div class="b69-line"><span class="b69-let">c)</span>Rô-bốt phải bắt đầu ăn sáng lúc
      ${q.num(b69advGio(tAn))} giờ ${q.num(b69advPhut(tAn))} phút.</div>
    <div class="b69-line"><span class="b69-let">d)</span>Từ lúc bắt đầu ăn sáng đến lúc có mặt
      ở trường, Rô-bốt mất tất cả ${q.num(tong)} phút.</div>
    <div class="hint-line">Muốn tìm thời điểm bắt đầu thì lấy thời điểm kết thúc trừ đi khoảng
      thời gian đã dùng. Hãy tính lùi lần lượt từ lúc có mặt ở trường.</div>`;
  return q.done(html,
    `Đồng hồ chỉ ${HM69(tDen)}. Lên xe buýt: ${HM69(tDen)} lùi ${dXe} phút được ${HM69(tXe)}. `
    + `Rời khỏi nhà: ${HM69(tXe)} lùi ${dBo} phút được ${HM69(tRoi)}. `
    + `Bắt đầu ăn sáng: ${HM69(tRoi)} lùi ${dAn} phút được ${HM69(tAn)}. `
    + `Tất cả: ${dAn} + ${dBo} + ${dXe} = ${tong} (phút).`);
},

/* 2. Tiền Việt Nam: mua nhiều món rồi tính tiền trả lại */
() => {
  const q = Q(2, 'Quan sát số tiền và giá các món hàng rồi trả lời.');
  const gia = pick([2000, 3000, 5000]);
  const soBut = R(3, 4);
  const bim = pick([5000, 10000]);
  const phaiTra = gia * soBut + bim;
  const thua = pick([1000, 2000, 5000, 10000]);
  const tong = phaiTra + thua;
  const to = b69advTo(tong);
  const buts = [];
  for (let i = 0; i < soBut; i++) buts.push(BUT69);
  const html = `<div class="b69adv-box"><div class="b69adv-ten">Số tiền Nam có</div>
      <div class="b69-money">${SHF69(to).map(money69).join('')}</div></div>
    <div class="b69adv-goods">
      <div class="b69adv-item">${BUT69}<div class="b69adv-nm">${SP69(gia)} đồng một cái</div></div>
      <div class="b69adv-item">${BIM69}<div class="b69adv-nm">${SP69(bim)} đồng một gói</div></div>
    </div>
    <p class="wordq">Nam mua ${soBut} cái bút chì giống nhau và một gói bim bim.</p>
    <div class="b69-buts">${buts.join('')}</div>
    <div class="bullet"><span class="b69-let">a)</span>Nam có tất cả ${q.num(tong)} đồng.</div>
    <div class="bullet"><span class="b69-let">b)</span>${soBut} cái bút chì giá
      ${q.num(gia * soBut)} đồng.</div>
    <div class="bullet"><span class="b69-let">c)</span>Nam phải trả tất cả
      ${q.num(phaiTra)} đồng.</div>
    <div class="bullet"><span class="b69-let">d)</span>Người bán hàng trả lại Nam
      ${q.num(thua)} đồng.</div>
    <div class="hint-line">Cộng các tờ tiền để biết Nam có bao nhiêu, rồi lấy số tiền Nam có
      trừ đi số tiền phải trả.</div>`;
  return q.done(html,
    `Nam có ${to.map(SP69).join(' + ')} = ${SP69(tong)} (đồng). `
    + `${soBut} cái bút chì giá ${SP69(gia)} × ${soBut} = ${SP69(gia * soBut)} (đồng). `
    + `Phải trả: ${SP69(gia * soBut)} + ${SP69(bim)} = ${SP69(phaiTra)} (đồng). `
    + `Trả lại: ${SP69(tong)} − ${SP69(phaiTra)} = ${SP69(thua)} (đồng).`);
},

/* 3. Xem lịch: nhiều câu hỏi suy luận trên một tờ lịch */
() => {
  const thang = R(3, 11);
  const q = Q(3, `Xem tờ lịch tháng ${thang} rồi trả lời các câu hỏi.`);
  const fw = R(0, 6);
  const nd = SONGAY69[thang];
  const cn = DAY69(thang, fw, 6);                  /* các ngày Chủ nhật */
  const bay = DAY69(thang, fw, 5);                 /* các ngày thứ Bảy  */
  const tu = DAY69(thang, fw, 2);                  /* các ngày thứ Tư   */
  const i0 = R(0, tu.length - 2);
  const D = tu[i0];
  const soBuoi = tu.length - i0;
  const thuCuoi = b69advThu(fw, nd);
  const thuSau = (fw + nd) % 7;                    /* thứ của ngày 1 tháng sau */
  const html = cal69(thang, fw)
    + `<div class="b69-line"><span class="b69-let">a)</span>Tháng ${thang} có ${q.num(nd)} ngày,
        trong đó có ${q.num(bay.length)} ngày thứ Bảy và ${q.num(cn.length)} ngày Chủ nhật.</div>
      <div class="b69-line"><span class="b69-let">b)</span>Ngày Chủ nhật thứ ba của tháng ${thang}
        là ngày ${q.num(cn[2])}.</div>
      <div class="b69-line b69-wide"><span class="b69-let">c)</span>Ngày cuối cùng của tháng ${thang}
        là ${q.pick(THU69[thuCuoi], THU69)}</div>
      <div class="b69-line b69-wide"><span class="b69-let">d)</span>Ngày 1 tháng ${thang + 1}
        là ${q.pick(THU69[thuSau], THU69)}</div>
      <div class="b69-sub"><span class="b69-let">e)</span>Bắt đầu từ ngày ${D} tháng ${thang},
        Rô-bốt học bơi vào thứ Tư hằng tuần. Hỏi trong tháng ${thang}, Rô-bốt có bao nhiêu
        buổi học bơi?</div>
      <div class="bullet">Rô-bốt có ${q.num(soBuoi)} buổi học bơi.</div>
      <div class="hint-line">Ở câu d) tờ lịch không có tháng ${thang + 1}. Em hãy xem ngày cuối cùng
        của tháng ${thang} là thứ mấy, ngày hôm sau chính là ngày 1 tháng ${thang + 1}.</div>`;
  return q.done(html,
    `Ngày 1 tháng ${thang} là ${THU69[fw]}, tháng ${thang} có ${nd} ngày. `
    + `Các ngày thứ Bảy: ${bay.join(', ')} (có ${bay.length} ngày). `
    + `Các ngày Chủ nhật: ${cn.join(', ')} nên Chủ nhật thứ ba là ngày ${cn[2]}. `
    + `Ngày ${nd} là ${THU69[thuCuoi]}, vậy ngày 1 tháng ${thang + 1} là ${THU69[thuSau]}. `
    + `Các ngày thứ Tư từ ngày ${D} trở đi là ${tu.slice(i0).join(', ')}, tất cả ${soBuoi} ngày.`);
},

/* 4. Đổi và so sánh các đơn vị đo thời gian */
() => {
  const q = Q(4, 'Đổi rồi so sánh các đơn vị đo thời gian.');
  const m1 = R(1, 11) * 5, t1 = 60 + m1, p1 = t1 + pick([-15, -10, -5, 0, 5, 10, 15]);
  const d2 = R(1, 6), t2 = 14 + d2, p2 = t2 + pick([-3, -2, -1, 0, 1, 2, 3]);
  const g3 = R(1, 11), t3 = 12 + g3, p3 = t3 + pick([-4, -3, -2, 0, 2, 3, 4]);
  const h4 = R(1, 12), t4 = 24 + h4, p4 = t4 + pick([-6, -4, -2, 0, 2, 4, 6]);
  const dau = (a, b) => a > b ? '>' : a < b ? '<' : '=';
  const rows = [
    [`1 giờ ${m1} phút`, `${p1} phút`, dau(t1, p1)],
    [`2 tuần ${d2} ngày`, `${p2} ngày`, dau(t2, p2)],
    [`1 năm ${g3} tháng`, `${p3} tháng`, dau(t3, p3)],
    [`1 ngày ${h4} giờ`, `${p4} giờ`, dau(t4, p4)]
  ];
  const kA = R(1, 3), mA = R(1, 11) * 5, NA = kA * 60 + mA;
  const kB = R(2, 4), dB = R(1, 6), NB = kB * 7 + dB;
  const kC = R(2, 3), tC = R(1, 11), NC = kC * 12 + tC;
  const html = `<div class="b69-sub"><span class="b69-let">a)</span>Điền dấu &gt;, &lt;, = thích hợp.</div>
    <div class="b69adv-cmp">${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r[0]}</span>${q.sign(r[2])}<span class="side">${r[1]}</span></div>`
      ).join('')}</div>
    <div class="b69-sub"><span class="b69-let">b)</span><span class="tag">Số</span> ?</div>
    <div class="b69-two">
      <div>${NA} phút = ${q.num(kA)} giờ ${q.num(mA)} phút</div>
      <div>${NB} ngày = ${q.num(kB)} tuần ${q.num(dB)} ngày</div>
      <div>${NC} tháng = ${q.num(kC)} năm ${q.num(tC)} tháng</div>
    </div>
    <div class="hint-line">Chạm vào ô dấu để đổi &gt; &lt; = . Ở câu b), số phút còn lại phải bé hơn 60,
      số ngày còn lại phải bé hơn 7, số tháng còn lại phải bé hơn 12.</div>`;
  return q.done(html,
    `1 giờ ${m1} phút = ${t1} phút nên ${t1} ${rows[0][2]} ${p1}. `
    + `2 tuần ${d2} ngày = ${t2} ngày nên ${t2} ${rows[1][2]} ${p2}. `
    + `1 năm ${g3} tháng = ${t3} tháng nên ${t3} ${rows[2][2]} ${p3}. `
    + `1 ngày ${h4} giờ = ${t4} giờ nên ${t4} ${rows[3][2]} ${p4}. `
    + `b) ${NA} phút = ${kA} giờ ${mA} phút; ${NB} ngày = ${kB} tuần ${dB} ngày; `
    + `${NC} tháng = ${kC} năm ${tC} tháng.`);
},

/* 5. Quy luật dãy đồng hồ cách đều */
() => {
  const q = Q(5, 'Các đồng hồ dưới đây được xếp theo một quy luật. Tìm quy luật rồi trả lời.');
  let step = 15, t0 = 7 * 60 + 5;
  for (let i = 0; i < 30; i++){
    step = pick([10, 15, 20, 25, 30]);
    t0 = R(6, 8) * 60 + R(1, 11) * 5;
    let ok = true;
    for (let k = 0; k < 8; k++) if ((t0 + k * step) % 60 === 0) ok = false;
    if (ok) break;
  }
  const ts = [0, 1, 2, 3, 4, 5, 6, 7].map(i => t0 + i * step);
  const html = `<div class="b69-seq">${ts.slice(0, 3).map(t => clock69(t, '', '')).join('')}
      <div class="b69-qm">?</div><div class="b69-qm">?</div></div>
    <div class="b69-line"><span class="b69-let">a)</span>Đồng hồ sau chỉ nhiều hơn đồng hồ liền
      trước nó ${q.num(step)} phút.</div>
    <div class="b69-line"><span class="b69-let">b)</span>Đồng hồ thứ tư chỉ
      ${q.num(b69advGio(ts[3]))} giờ ${q.num(b69advPhut(ts[3]))} phút.</div>
    <div class="b69-line"><span class="b69-let">c)</span>Đồng hồ thứ năm chỉ
      ${q.num(b69advGio(ts[4]))} giờ ${q.num(b69advPhut(ts[4]))} phút.</div>
    <div class="b69-line"><span class="b69-let">d)</span>Đồng hồ thứ tám chỉ
      ${q.num(b69advGio(ts[7]))} giờ ${q.num(b69advPhut(ts[7]))} phút.</div>
    <div class="b69-line"><span class="b69-let">e)</span>Từ đồng hồ thứ nhất đến đồng hồ thứ sáu
      cách nhau ${q.num(5 * step)} phút.</div>
    <div class="hint-line">Từ đồng hồ thứ nhất đến đồng hồ thứ tám cách nhau 7 lần,
      mỗi lần ${step} phút.</div>`;
  return q.done(html,
    `Ba đồng hồ đầu chỉ ${ts.slice(0, 3).map(HM69).join('; ')} nên mỗi đồng hồ hơn đồng hồ `
    + `liền trước ${step} phút. Đồng hồ thứ tư: ${HM69(ts[3])}; đồng hồ thứ năm: ${HM69(ts[4])}. `
    + `Đồng hồ thứ tám: ${HM69(t0)} thêm 7 × ${step} = ${7 * step} phút, được ${HM69(ts[7])}. `
    + `Từ đồng hồ thứ nhất đến đồng hồ thứ sáu cách nhau 5 × ${step} = ${5 * step} (phút).`);
},

/* 6. Suy luận về tuổi và tháng sinh */
() => {
  const q = Q(6, '');
  const A = R(5, 8), B = R(1, 11);
  const m = R(1, 4), n = R(2, 5);
  const X = R(m + n + 1, 12);
  const thangMai = X - n, thangViet = X - n - m;
  const html = `<div class="b69-sub"><span class="b69-let">a)</span>Hiện nay Mi được
      ${A} năm ${B} tháng tuổi.</div>
    <div class="bullet">Mi đã được ${q.num(A * 12 + B)} tháng tuổi.</div>
    <div class="bullet">Sau ${q.num(24 - B)} tháng nữa thì Mi tròn ${A + 2} tuổi.</div>
    <div class="b69-sub"><span class="b69-let">b)</span>Mai, Việt và Nam được sinh ra cùng một năm
      nhưng khác tháng.</div>
    <div class="b69adv-clue">
      <div class="bullet">Nam được sinh ra vào tháng ${X}.</div>
      <div class="bullet">Mai được sinh ra trước Nam ${n} tháng.</div>
      <div class="bullet">Việt được sinh ra trước Mai ${m} tháng.</div>
    </div>
    <div class="bullet">Mai được sinh ra vào tháng ${q.num(thangMai)}.</div>
    <div class="bullet">Việt được sinh ra vào tháng ${q.num(thangViet)}.</div>
    <div class="bullet">Việt được sinh ra trước Nam ${q.num(m + n)} tháng.</div>
    <div class="hint-line">1 năm = 12 tháng. Ở câu b), sinh ra trước thì tháng sinh bé hơn,
      em hãy tính lùi từ tháng sinh của Nam.</div>`;
  return q.done(html,
    `a) 1 năm = 12 tháng nên ${A} năm ${B} tháng = 12 × ${A} + ${B} = ${A * 12 + B} (tháng). `
    + `Từ ${A} tuổi đến ${A + 2} tuổi là 24 tháng, Mi đã qua ${B} tháng nên còn `
    + `24 − ${B} = ${24 - B} (tháng). `
    + `b) Mai sinh tháng ${X} − ${n} = ${thangMai}; Việt sinh tháng ${thangMai} − ${m} = ${thangViet}; `
    + `Việt sinh trước Nam ${m} + ${n} = ${m + n} (tháng).`);
},
];
