/*CSS
.b80-wrap{overflow-x:auto;padding-bottom:4px}
.b80-tbl{border-collapse:collapse;margin:9px auto;background:#fff}
.b80-tbl td{border:1.8px solid #e08a6a;padding:6px 9px;text-align:center;font-size:15.5px;font-weight:700;white-space:nowrap}
.b80-tbl td.hd{background:#ffe8cc}
.b80-tbl td.tp{background:#ffe8cc}
.b80-tbl .qin{width:80px !important;height:32px;font-size:15px;padding:0 2px}
.b80-diag{position:relative;min-width:118px;height:58px;padding:0 !important;
  background-image:linear-gradient(to top right,#ffe8cc 0,#ffe8cc calc(50% - 1px),#e08a6a calc(50% - 1px),#e08a6a calc(50% + 1px),#ffe8cc calc(50% + 1px),#ffe8cc 100%)}
.b80-diag .t1{position:absolute;right:9px;top:5px;font-size:14px}
.b80-diag .t2{position:absolute;left:9px;bottom:5px;font-size:14px}
.b80-ask{margin:8px 0 2px;font-weight:700;color:#d63384;text-align:left;line-height:1.5}
.b80-sub{font-weight:700;margin:9px 0 3px;line-height:1.5;text-align:left}
.b80-line{font-size:16.5px;font-weight:700;line-height:2.2;text-align:left;margin:4px 0}
.b80-line .qin{margin:0 3px;vertical-align:middle;height:34px;font-size:16px;min-width:70px}
.b80-wide .picker{flex-wrap:wrap;justify-content:flex-start;margin:4px 0 0}
.b80-wide .pk{width:auto;min-width:36px;padding:0 12px;font-size:13.5px;height:32px}
.b80-ds{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;
  font-size:16px;font-weight:700;line-height:1.55;margin:7px 0;padding:6px 9px;
  border:2.2px solid #f0a027;border-radius:11px;background:#fffdf5}
.b80-ds > span{flex:1 1 200px;text-align:left}
.b80-ds .picker{margin:0;flex:0 0 auto}
.b80-ds .pk{width:38px;min-width:38px;padding:0;font-size:16px}
.b80-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:12px;margin:9px 0}
.b80-box{width:88px;height:auto;display:block}
.b80-hat{width:200px;max-width:100%;height:auto;display:block}
.b80-tho{width:46px;height:auto;display:block}
.b80-note{font-size:14px;font-weight:700;color:#4a4460;text-align:center;margin:2px 0 6px}
CSS*/

/* ==================== BÀI 80: ÔN TẬP BẢNG SỐ LIỆU, KHẢ NĂNG XẢY RA CỦA MỘT SỰ KIỆN
   (SGK tập 2 – tr.122, 123)
   luyện tập tr.122 : bài 1 (bảng số học sinh đến thư viện mỗi buổi sáng và chiều trong tuần),
                      bài 2 (bảng số tờ tiền trong hộp tiết kiệm của ba bạn)
   luyện tập tr.123 : bài 3 (Rô-bốt gói ba món quà vào ba chiếc hộp giống hệt nhau),
                      bài 4 (chiếc mũ ảo thuật có 2 con thỏ trắng và 1 con thỏ nâu,
                             lấy cùng một lúc 2 con thỏ)
   Bài 1 và bài 4 được viết thêm một đề khác để đổi dạng bảng và đổi số loại đồ vật.
   Mọi câu "chắc chắn / có thể / không thể" đều trả lời bằng Đ, S hoặc bằng số
   nên đáp án luôn là duy nhất.
========================================================================================= */

/* trộn một mảng */
const b80Mix = a => a.slice().sort(() => Math.random() - .5);
/* đáp án chọn nhiều phải xếp đúng thứ tự chuỗi như khi máy chấm */
const b80Set = a => a.slice().sort().join(',');
/* viết số tiền theo kiểu sách: 10 000 */
const SP80 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* ---- bảng số liệu: ô góc trên bên trái có gạch chéo ---- */
const b80Tbl2 = (goc1, goc2, cot, hang) =>
  `<div class="b80-wrap"><table class="b80-tbl">
    <tr><td class="b80-diag"><span class="t1">${goc1}</span><span class="t2">${goc2}</span></td>
      ${cot.map(c => `<td class="tp">${c}</td>`).join('')}</tr>
    ${hang.map(h => `<tr><td class="hd">${h[0]}</td>
      ${h.slice(1).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
  </table></div>`;

/* ---- các sự kiện CÓ THỂ xảy ra khi lấy cùng một lúc 2 vật ----
   ds = [{ten, n}] : mỗi loại vật và số lượng của loại đó                */
const b80KQ = ds => {
  const out = [];
  for (let i = 0; i < ds.length; i++){
    if (ds[i].n >= 2) out.push(`2 ${ds[i].ten}`);
    for (let j = i + 1; j < ds.length; j++)
      if (ds[i].n >= 1 && ds[j].n >= 1) out.push(`1 ${ds[i].ten} và 1 ${ds[j].ten}`);
  }
  return out;
};

/* ---- mọi sự kiện được nêu làm phương án (kể cả sự kiện không thể xảy ra) ---- */
const b80MoiSK = ds => {
  const out = [];
  for (let i = 0; i < ds.length; i++){
    out.push(`2 ${ds[i].ten}`);
    for (let j = i + 1; j < ds.length; j++) out.push(`1 ${ds[i].ten} và 1 ${ds[j].ten}`);
  }
  return out;
};

/* ---- các câu Đ/S dựa trên danh sách sự kiện có thể và không thể xảy ra ---- */
const b80DS = (kq, moi, ai, sl) => {
  const khong = moi.filter(x => !kq.includes(x));
  const cau = [
    {t: `${ai} chắc chắn lấy được ${pick(kq)}.`, v: kq.length === 1 ? 'Đ' : 'S'},
    {t: `${ai} có thể lấy được ${pick(kq)}.`, v: 'Đ'}
  ];
  if (khong.length){
    cau.push({t: `${ai} không thể lấy được ${pick(khong)}.`, v: 'Đ'});
    cau.push({t: `${ai} có thể lấy được ${pick(khong)}.`, v: 'S'});
  }
  return b80Mix(cau).slice(0, sl || 2);
};

/* ---- hộp quà (ba chiếc hộp giống hệt nhau nên vẽ y như nhau) ---- */
ART.b80Box = () => `<svg class="b80-box" viewBox="0 0 100 98">
  <ellipse cx="50" cy="93" rx="42" ry="5" fill="rgba(60,40,20,.12)"/>
  <path d="M10 36h80v56H10z" fill="#f6c94a" stroke="#c08f10" stroke-width="3" stroke-linejoin="round"/>
  <path d="M5 22h90v16H5z" fill="#ffd76a" stroke="#c08f10" stroke-width="3" stroke-linejoin="round"/>
  <path d="M42 22h16v70H42z" fill="#e8443a" stroke="#a5321a" stroke-width="2.6"/>
  <path d="M50 22q-19-2-17-11 2-9 17 11z" fill="#e8443a" stroke="#a5321a" stroke-width="2.4"
    stroke-linejoin="round"/>
  <path d="M50 22q19-2 17-11-2-9-17 11z" fill="#e8443a" stroke="#a5321a" stroke-width="2.4"
    stroke-linejoin="round"/>
  <path d="M18 46h64" stroke="#e0b23a" stroke-width="2"/>
</svg>`;

/* ---- con thỏ nhỏ ---- */
ART.b80Tho = mau => `<svg class="b80-tho" viewBox="0 0 60 82">
  <ellipse cx="21" cy="21" rx="7" ry="19" fill="${mau}" stroke="#7a7290" stroke-width="2.6"/>
  <ellipse cx="39" cy="21" rx="7" ry="19" fill="${mau}" stroke="#7a7290" stroke-width="2.6"/>
  <ellipse cx="21" cy="22" rx="3" ry="12" fill="#ffc9d8"/>
  <ellipse cx="39" cy="22" rx="3" ry="12" fill="#ffc9d8"/>
  <circle cx="30" cy="56" r="20" fill="${mau}" stroke="#7a7290" stroke-width="2.6"/>
  <circle cx="23" cy="52" r="2.8" fill="#4d4463"/><circle cx="37" cy="52" r="2.8" fill="#4d4463"/>
  <path d="M30 59l-3.5 3.5h7z" fill="#ff96b3"/>
  <path d="M25 66q5 4 10 0" fill="none" stroke="#7a7290" stroke-width="2" stroke-linecap="round"/>
</svg>`;

/* ---- chiếc mũ ảo thuật, một chú thỏ đang nhô lên ---- */
ART.b80Hat = () => `<svg class="b80-hat" viewBox="0 0 300 210">
  <path d="M20 60l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill="#f7c11e" opacity=".9"/>
  <path d="M276 34l5 11 11 5-11 5-5 11-5-11-11-5 11-5z" fill="#f7c11e" opacity=".9"/>
  <ellipse cx="134" cy="44" rx="9" ry="27" fill="#fff" stroke="#8c84a6" stroke-width="3"/>
  <ellipse cx="166" cy="44" rx="9" ry="27" fill="#fff" stroke="#8c84a6" stroke-width="3"/>
  <ellipse cx="134" cy="46" rx="4" ry="17" fill="#ffc9d8"/>
  <ellipse cx="166" cy="46" rx="4" ry="17" fill="#ffc9d8"/>
  <circle cx="150" cy="84" r="26" fill="#fff" stroke="#8c84a6" stroke-width="3"/>
  <circle cx="141" cy="79" r="3.4" fill="#4d4463"/><circle cx="159" cy="79" r="3.4" fill="#4d4463"/>
  <path d="M150 88l-4 4h8z" fill="#ff96b3"/>
  <path d="M143 96q7 5 14 0" fill="none" stroke="#8c84a6" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M96 176V108q0-10 10-10h88q10 0 10 10v68z" fill="#2b3350" stroke="#171d33"
    stroke-width="4" stroke-linejoin="round"/>
  <rect x="94" y="140" width="112" height="20" fill="#e0453a" stroke="#a5321a" stroke-width="3"/>
  <ellipse cx="150" cy="176" rx="96" ry="19" fill="#2b3350" stroke="#171d33" stroke-width="4"/>
  <path d="M62 190h176" stroke="#bcd3ee" stroke-width="6" stroke-linecap="round"/>
</svg>`;

BANKS.b80 = [

/* ===== tr.122 – Bài 1: bảng số học sinh đến thư viện mỗi buổi sáng và chiều ===== */
() => {
  const NOI = pick([
    {t: 'thư viện', d: 'đã đến thư viện'},
    {t: 'phòng máy tính', d: 'đã đến phòng máy tính'},
    {t: 'phòng đọc sách', d: 'đã đến phòng đọc sách'}
  ]);
  const q = Q(1, `Cho bảng số liệu về số học sinh ${NOI.d} vào mỗi buổi sáng và chiều `
    + 'trong một tuần học.');
  const NGAY = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];
  const sang = NGAY.map(() => R(6, 15) * 5);
  const chieu = NGAY.map(() => R(6, 15) * 5);
  const k = R(0, 4);

  const html = b80Tbl2('Thứ', 'Buổi', NGAY,
      [['Sáng'].concat(sang), ['Chiều'].concat(chieu)])
    + '<div class="b80-sub">Dựa vào bảng trên, trả lời câu hỏi:</div>'
    + '<div class="b80-ask">a) Mỗi cột của bảng cho biết điều gì? Mỗi hàng của bảng cho biết điều gì?</div>'
    + `<div class="fill-line b80-wide">Mỗi cột của bảng cho biết số học sinh đến ${NOI.t}
        vào buổi sáng và buổi chiều của một
        ${q.pick('ngày', ['ngày', 'buổi', 'tuần', 'tháng'])}</div>`
    + `<div class="fill-line b80-wide">Mỗi hàng của bảng cho biết số học sinh đến ${NOI.t}
        vào một ${q.pick('buổi', ['buổi', 'ngày', 'tuần', 'tháng'])} của các ngày trong tuần</div>`
    + `<div class="b80-ask">b) Trong ngày ${NGAY[k]}, có bao nhiêu học sinh đến ${NOI.t}
        vào mỗi buổi?</div>`
    + `<div class="bullet">Buổi sáng có ${q.num(sang[k])} học sinh.</div>`
    + `<div class="bullet">Buổi chiều có ${q.num(chieu[k])} học sinh.</div>`
    + `<div class="b80-ask">c) Có bao nhiêu học sinh đến ${NOI.t} vào mỗi buổi chiều?</div>`
    + NGAY.map((d, i) =>
      `<div class="bullet">${d}: ${q.num(chieu[i])} học sinh</div>`).join('');

  return q.done(html,
    `Mỗi cột của bảng ứng với một ngày trong tuần, mỗi hàng của bảng ứng với một buổi (sáng hoặc chiều). `
    + `Ngày ${NGAY[k]}: buổi sáng ${sang[k]} học sinh, buổi chiều ${chieu[k]} học sinh. `
    + `Đọc hàng "Chiều" ta được số học sinh của các buổi chiều lần lượt là `
    + `${chieu.join('; ')}.`);
},

/* ===== tr.122 – Bài 2: bảng số tờ tiền trong hộp tiết kiệm của ba bạn ===== */
() => {
  const TEN = b80Mix(['Nam', 'Việt', 'Mai', 'Mi', 'Rô-bốt']).slice(0, 3);
  const q = Q(2, `Cho bảng số liệu về số tiền tiết kiệm được của các bạn `
    + `${TEN[0]}, ${TEN[1]} và ${TEN[2]} trong một tuần.`);
  const MG = [1000, 2000, 5000, 10000];
  const tien = r => r.reduce((s, v, i) => s + v * MG[i], 0);

  const mkRow = () => {
    let r = [R(0, 5), R(0, 5), R(0, 3), R(0, 2)];
    for (let g = 0; g < 60; g++){
      const t = tien(r), so = r.reduce((s, v) => s + v, 0);
      if (t >= 5000 && t <= 60000 && so >= 2) return r;
      r = [R(0, 5), R(0, 5), R(0, 3), R(0, 2)];
    }
    return [3, 1, 1, 0];
  };
  const rows = [mkRow(), mkRow(), mkRow()];
  const tong = rows.map(tien);
  for (let i = 1; i < 3; i++){                       /* ba tổng phải khác nhau */
    let g = 0;
    while (g++ < 60 && tong.slice(0, i).includes(tong[i])){ rows[i][0] += 1; tong[i] += 1000; }
  }
  const nhieu = TEN[tong.indexOf(Math.max(...tong))];
  const it = TEN[tong.indexOf(Math.min(...tong))];
  /* giá truyện: luôn có bạn đủ tiền và có bạn chưa đủ tiền */
  const gia = R(Math.min(...tong) / 1000 + 1, Math.max(...tong) / 1000) * 1000;
  const du = TEN.filter((t, i) => tong[i] >= gia);

  const bang = `<div class="b80-wrap"><table class="b80-tbl">
      <tr><td class="hd" rowspan="2">Bạn</td>
        <td class="tp" colspan="4">Số tờ tiền trong hộp tiết kiệm (tờ)</td>
        <td class="hd" rowspan="2">Tổng số tiền<br>tiết kiệm</td></tr>
      <tr>${MG.map(m => `<td class="tp">${SP80(m)}<br>đồng</td>`).join('')}</tr>
      ${TEN.map((t, i) => `<tr><td class="hd">${t}</td>
        ${rows[i].map(v => `<td>${v}</td>`).join('')}
        <td>${i === 0 ? SP80(tong[0]) + ' đồng' : q.num(tong[i])}</td></tr>`).join('')}
    </table></div>`;

  const html = bang
    + `<div class="b80-ask">a) Tính số tiền tiết kiệm được của ${TEN[1]} và của ${TEN[2]}.</div>`
    + '<div class="b80-note">(Viết kết quả vào ô có dấu "?" ở cột cuối của bảng.)</div>'
    + '<div class="b80-ask">b) Bạn nào tiết kiệm được nhiều tiền nhất? '
    + 'Bạn nào tiết kiệm được ít tiền nhất?</div>'
    + `<div class="fill-line b80-wide">Tiết kiệm được nhiều tiền nhất: ${q.pick(nhieu, TEN)}</div>
       <div class="fill-line b80-wide">Tiết kiệm được ít tiền nhất: ${q.pick(it, TEN)}</div>`
    + `<div class="b80-ask">c) Các bạn dự định dùng tiền tiết kiệm trong tuần đó để mua truyện.
        Biết 1 quyển truyện có giá ${SP80(gia)} đồng. Hỏi những bạn nào đã có đủ tiền
        mua truyện?</div>`
    + `<div class="fill-line b80-wide">Những bạn đã có đủ tiền mua truyện: ${q.pick(b80Set(du), TEN)}</div>`;

  return q.done(html,
    TEN.map((t, i) => `${t}: `
      + rows[i].map((v, j) => v ? `${SP80(MG[j])} × ${v}` : '').filter(x => x).join(' + ')
      + ` = ${SP80(tong[i])} (đồng)`).join('; ') + '. '
    + `Vậy ${nhieu} tiết kiệm được nhiều tiền nhất, ${it} tiết kiệm được ít tiền nhất. `
    + `Quyển truyện giá ${SP80(gia)} đồng nên chỉ những bạn có số tiền từ ${SP80(gia)} đồng `
    + `trở lên mới đủ tiền mua: ${du.join(', ')}.`);
},

/* ===== tr.123 – Bài 3: Rô-bốt gói các món quà vào những chiếc hộp giống hệt nhau ===== */
() => {
  const n = pick([3, 3, 4]);
  const SO = {3: 'ba', 4: 'bốn'};
  const POOL = ['tháp vòng', 'quả bóng', 'khối ru-bích', 'con gấu bông', 'hộp bút màu',
    'chiếc ô tô đồ chơi', 'quyển truyện tranh', 'bộ xếp hình', 'con búp bê'];
  const tron = b80Mix(POOL);
  const QUA = tron.slice(0, n);
  const gia = tron.slice(n, n + 2);
  const BAN = b80Mix(['Mai', 'Việt', 'Nam', 'Mi', 'Rô-bốt']).slice(0, 3);
  const q = Q(3, `Rô-bốt gói ${SO[n]} món quà (${QUA.join(', ')}) `
    + `vào ${SO[n]} chiếc hộp giống hệt nhau:`);
  const opts = b80Mix(QUA.concat(gia));
  const st = b80Mix([
    {t: `${BAN[0]} chắc chắn chọn được chiếc hộp đựng ${QUA[0]}.`, v: 'S'},
    {t: `${BAN[0]} có thể chọn được chiếc hộp đựng ${QUA[1]}.`, v: 'Đ'},
    {t: `${BAN[0]} không thể chọn được chiếc hộp đựng ${gia[0]}.`, v: 'Đ'},
    {t: `${BAN[0]} có thể chọn được chiếc hộp đựng ${gia[1]}.`, v: 'S'}
  ]).slice(0, 2);

  const html = `<div class="b80-row">${ART.robot}
      ${Array.from({length: n}, () => ART.b80Box()).join('')}</div>
    <div class="b80-note">${SO[n].charAt(0).toUpperCase() + SO[n].slice(1)} chiếc hộp giống hệt nhau</div>
    <p class="wordq">Mỗi bạn ${BAN[0]}, ${BAN[1]} và ${BAN[2]} lần lượt chọn một hộp quà bất kì.
      Vậy ${BAN[0]} có thể chọn được chiếc hộp đựng món quà nào?</p>
    <div class="b80-ask">a) ${BAN[0]} là người chọn đầu tiên. Khi đó có bao nhiêu sự kiện
      có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(n)} sự kiện có thể xảy ra.</div>
    <div class="b80-ask">b) Chọn những món quà mà ${BAN[0]} có thể chọn được.</div>
    <div class="fill-line b80-wide">${BAN[0]} có thể chọn được chiếc hộp đựng:
      ${q.pick(b80Set(QUA), opts)}</div>
    <div class="b80-ask">c) <span class="tag">Đ, S</span> ?</div>`
    + st.map(s => `<div class="b80-ds"><span>&ndash; ${s.t}</span>${q.pick(s.v, ['Đ', 'S'])}</div>`).join('');

  return q.done(html,
    `${SO[n].charAt(0).toUpperCase() + SO[n].slice(1)} chiếc hộp giống hệt nhau nên nhìn bên ngoài `
    + `không biết hộp nào đựng món quà gì. ${BAN[0]} chọn đầu tiên nên có thể chọn phải bất kì `
    + `hộp nào trong ${SO[n]} hộp, tức là có ${n} sự kiện có thể xảy ra: chọn được hộp đựng `
    + `${QUA.join(', ')}; không sự kiện nào chắc chắn xảy ra. `
    + `Rô-bốt không gói ${gia.join(' hay ')} nên các sự kiện đó không thể xảy ra.`);
},

/* ===== tr.123 – Bài 4: chiếc mũ ảo thuật có thỏ trắng và thỏ nâu ===== */
() => {
  let x = R(1, 3), y = R(1, 3);
  for (let g = 0; g < 30 && (x + y < 3 || x + y > 5); g++){ x = R(1, 3); y = R(1, 3); }
  if (x + y < 3 || x + y > 5){ x = 2; y = 1; }
  const A = 'con thỏ trắng', B = 'con thỏ nâu';
  const q = Q(4, `Trong chiếc mũ ảo thuật có ${x} ${A} và ${y} ${B}.`);
  const ds = [{ten: A, n: x}, {ten: B, n: y}];
  const kq = b80KQ(ds);
  const opts = b80Mix(b80MoiSK(ds).concat(['2 con thỏ đen']));
  const st = b80Mix([
    {t: `Nhà ảo thuật chắc chắn lấy được 2 ${A}.`, v: 'S'},
    {t: `Nhà ảo thuật có thể lấy được 2 ${A}.`, v: x >= 2 ? 'Đ' : 'S'},
    {t: `Nhà ảo thuật có thể lấy được 1 ${A} và 1 ${B}.`, v: 'Đ'},
    {t: `Nhà ảo thuật không thể lấy được 2 ${B}.`, v: y >= 2 ? 'S' : 'Đ'},
    {t: `Nhà ảo thuật chắc chắn lấy được ít nhất 1 ${A}.`, v: y >= 2 ? 'S' : 'Đ'},
    {t: `Nhà ảo thuật không thể lấy được 2 con thỏ đen.`, v: 'Đ'}
  ]).slice(0, 3);

  const html = `<div class="b80-row">${ART.b80Hat()}
      ${Array.from({length: x}, () => ART.b80Tho('#ffffff')).join('')}
      ${Array.from({length: y}, () => ART.b80Tho('#b07a4a')).join('')}</div>
    <div class="b80-note">Trong mũ có ${x} ${A} và ${y} ${B}</div>
    <p class="wordq">Nếu nhà ảo thuật cú mèo lấy cùng một lúc 2 con thỏ ra khỏi chiếc mũ đó,
      thì những sự kiện nào có thể xảy ra?</p>
    <div class="b80-ask">a) Có bao nhiêu sự kiện có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(kq.length)} sự kiện có thể xảy ra.</div>
    <div class="b80-ask">b) Chọn những sự kiện có thể xảy ra.</div>
    <div class="fill-line b80-wide">Nhà ảo thuật lấy được: ${q.pick(b80Set(kq), opts)}</div>
    <div class="b80-ask">c) <span class="tag">Đ, S</span> ?</div>`
    + st.map(s => `<div class="b80-ds"><span>&ndash; ${s.t}</span>${q.pick(s.v, ['Đ', 'S'])}</div>`).join('');

  return q.done(html,
    `Trong mũ có ${x} ${A} và ${y} ${B}. Lấy cùng một lúc 2 con thỏ thì các sự kiện có thể `
    + `xảy ra là: ${kq.join('; ')} — tất cả có ${kq.length} sự kiện. `
    + (x < 2 ? `Chỉ có 1 ${A} nên không thể lấy được 2 ${A}. ` : '')
    + (y < 2 ? `Chỉ có 1 ${B} nên không thể lấy được 2 ${B}. ` : '')
    + `Trong mũ không có con thỏ đen nào nên không thể lấy được 2 con thỏ đen.`);
},

/* ===== tr.122 – Bài 1 (đề khác): bảng số quyển sách ba bạn đọc được trong mỗi tháng ===== */
() => {
  const TEN = b80Mix(['Mai', 'Việt', 'Nam', 'Mi', 'Rô-bốt']).slice(0, 3);
  const q = Q(1, 'Cho bảng số liệu về số quyển sách mỗi bạn đọc được trong bốn tháng.');
  const t0 = R(1, 9);
  const THANG = [0, 1, 2, 3].map(i => 'Tháng ' + (t0 + i));
  const dat = TEN.map(() => THANG.map(() => R(3, 12)));
  const tong = dat.map(r => r.reduce((s, v) => s + v, 0));
  for (let i = 1; i < 3; i++){                       /* ba tổng phải khác nhau */
    let g = 0;
    while (g++ < 60 && tong.slice(0, i).includes(tong[i])){ dat[i][0] += 1; tong[i] += 1; }
  }
  const k = R(0, 3);                                 /* tháng hỏi ở câu b */
  const h = R(0, 2);                                 /* bạn hỏi ở câu c */
  const nhieu = TEN[tong.indexOf(Math.max(...tong))];

  const html = b80Tbl2('Tháng', 'Bạn', THANG,
      TEN.map((t, i) => [t].concat(dat[i])))
    + '<div class="b80-sub">Dựa vào bảng trên, trả lời câu hỏi:</div>'
    + '<div class="b80-ask">a) Mỗi cột của bảng cho biết điều gì? Mỗi hàng của bảng cho biết điều gì?</div>'
    + `<div class="fill-line b80-wide">Mỗi cột của bảng cho biết số quyển sách cả ba bạn đọc được
        trong một ${q.pick('tháng', ['tháng', 'bạn', 'tuần', 'năm'])}</div>`
    + `<div class="fill-line b80-wide">Mỗi hàng của bảng cho biết số quyển sách của một
        ${q.pick('bạn', ['bạn', 'tháng', 'tuần', 'năm'])} trong bốn tháng</div>`
    + `<div class="b80-ask">b) Trong ${THANG[k].toLowerCase()}, mỗi bạn đọc được bao nhiêu quyển sách?</div>`
    + TEN.map((t, i) => `<div class="bullet">${t}: ${q.num(dat[i][k])} quyển</div>`).join('')
    + `<div class="b80-ask">c) Bạn ${TEN[h]} đọc được bao nhiêu quyển sách trong mỗi tháng?</div>`
    + THANG.map((m, j) => `<div class="bullet">${m}: ${q.num(dat[h][j])} quyển</div>`).join('')
    + '<div class="b80-ask">d) Trong cả bốn tháng, bạn nào đọc được nhiều sách nhất?</div>'
    + `<div class="fill-line b80-wide">Đọc được nhiều sách nhất: ${q.pick(nhieu, TEN)}</div>`;

  return q.done(html,
    'Mỗi cột của bảng ứng với một tháng, mỗi hàng của bảng ứng với một bạn. '
    + `${THANG[k]}: ` + TEN.map((t, i) => `${t} đọc ${dat[i][k]} quyển`).join(', ') + '. '
    + `Hàng của bạn ${TEN[h]} cho biết số sách mỗi tháng lần lượt là ${dat[h].join('; ')}. `
    + 'Tổng số sách cả bốn tháng: '
    + TEN.map((t, i) => `${t} ${tong[i]} quyển`).join(', ')
    + `. Vậy ${nhieu} đọc được nhiều sách nhất.`);
},

/* ===== tr.123 – Bài 4 (đề khác): trong mũ có thỏ của ba màu khác nhau ===== */
() => {
  const MAU = b80Mix([
    {ten: 'con thỏ trắng', m: '#ffffff'},
    {ten: 'con thỏ nâu', m: '#b07a4a'},
    {ten: 'con thỏ xám', m: '#b9bcc6'},
    {ten: 'con thỏ đen', m: '#4a4a55'}
  ]).slice(0, 3);
  let sl = [R(1, 2), R(1, 2), R(1, 2)];
  for (let g = 0; g < 30 && sl.reduce((s, v) => s + v, 0) > 5; g++) sl = [R(1, 2), R(1, 2), R(1, 2)];
  if (sl.reduce((s, v) => s + v, 0) > 5) sl = [2, 1, 1];
  const ds = MAU.map((c, i) => ({ten: c.ten, n: sl[i]}));
  const q = Q(4, 'Trong chiếc mũ ảo thuật có '
    + ds.map(c => `${c.n} ${c.ten}`).join(', ') + '.');
  const kq = b80KQ(ds);
  const moi = b80MoiSK(ds);
  const opts = b80Mix(moi);
  const st = b80DS(kq, moi, 'Nhà ảo thuật', 3);

  const html = `<div class="b80-row">${ART.b80Hat()}
      ${ds.map((c, i) => Array.from({length: c.n}, () => ART.b80Tho(MAU[i].m)).join('')).join('')}</div>
    <div class="b80-note">Trong mũ có ${ds.map(c => `${c.n} ${c.ten}`).join(', ')}</div>
    <p class="wordq">Nếu nhà ảo thuật cú mèo lấy cùng một lúc 2 con thỏ ra khỏi chiếc mũ đó,
      thì những sự kiện nào có thể xảy ra?</p>
    <div class="b80-ask">a) Có bao nhiêu sự kiện có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(kq.length)} sự kiện có thể xảy ra.</div>
    <div class="b80-ask">b) Chọn những sự kiện có thể xảy ra.</div>
    <div class="fill-line b80-wide">Nhà ảo thuật lấy được: ${q.pick(b80Set(kq), opts)}</div>
    <div class="b80-ask">c) <span class="tag">Đ, S</span> ?</div>`
    + st.map(s => `<div class="b80-ds"><span>&ndash; ${s.t}</span>${q.pick(s.v, ['Đ', 'S'])}</div>`).join('');

  return q.done(html,
    `Trong mũ có ${ds.map(c => `${c.n} ${c.ten}`).join(', ')}. `
    + `Lấy cùng một lúc 2 con thỏ thì các sự kiện có thể xảy ra là: ${kq.join('; ')} `
    + `— tất cả có ${kq.length} sự kiện. `
    + `Loại thỏ nào chỉ có 1 con thì không thể lấy được 2 con thỏ cùng loại đó.`);
},
];
