/*CSS
.b75-sub{font-weight:700;margin:9px 0 3px;line-height:1.5}
.b75-ask{margin:7px 0 2px;font-weight:700;color:#d63384}
.b75-box{border:2.6px solid #f0a027;border-radius:10px;padding:8px 12px;margin:8px auto;background:#fffdf5;display:table}
.b75-box .r{display:flex;align-items:center;gap:10px;margin:5px 0}
.b75-box .nm{min-width:126px;font-weight:700;font-size:16px}
.b75-tg{margin-right:7px;vertical-align:middle}
.b75-wrap{overflow-x:auto;padding-bottom:4px}
.b75-tbl{border-collapse:collapse;margin:9px auto;background:#fff}
.b75-tbl td{border:1.8px solid #e08a6a;padding:6px 12px;text-align:center;font-size:16px;font-weight:700;white-space:nowrap}
.b75-tbl td.hd{background:#ffe8cc}
.b75-tbl .qin{width:72px !important;height:32px;font-size:15px;padding:0 2px}
.b75-lcd{width:78px;height:auto;vertical-align:middle;display:inline-block}
.b75-dash{font-size:18px;font-weight:800;color:#8a6210;padding:0 4px}
.b75-die{width:50px;height:50px;vertical-align:middle;margin:0 3px}
.b75-rule{display:flex;align-items:center;flex-wrap:wrap;gap:3px;margin:7px 0;font-size:16px;font-weight:700;line-height:1.6}
.b75-throw{display:flex;justify-content:center;margin:8px 0}
.b75-throw svg{width:76px;height:76px}
.b75-wide .picker{flex-wrap:wrap;justify-content:center;margin:5px 0 0}
.b75-wide .pk{width:auto;min-width:36px;padding:0 11px;font-size:14px}
CSS*/

/* ==================== BÀI 75: THỰC HÀNH VÀ TRẢI NGHIỆM THU THẬP, PHÂN LOẠI,
   GHI CHÉP SỐ LIỆU, ĐỌC BẢNG SỐ LIỆU (SGK tập 2 – tr.110, 111)
   hoạt động tr.110 : bài 1 (việc cần làm để chuẩn bị chuyến đi chơi),
                      bài 2 (bảng số liệu địa điểm cắm trại),
                      bài 3 (Số ? – bảng thời gian xuất phát – kết thúc)
   hoạt động tr.111 : bài 1 (ba món ăn được nhiều bạn lựa chọn nhất),
                      bài 2a (bảng số liệu màu áo đồng phục),
                      bài 2b (gieo xúc xắc để chọn màu áo theo cách của Rô-bốt)
   Lớp học thật thì tự khảo sát, ở đây số liệu đã được ghi chép sẵn bằng vạch kiểm
   nên mọi câu hỏi đều có đáp án xác định.
========================================================================================= */

/* trộn một mảng */
const b75Mix = a => a.slice().sort(() => Math.random() - .5);
/* đáp án nhiều lựa chọn phải xếp theo thứ tự chuỗi */
const b75Set = a => a.slice().sort().join(',');
/* viết giờ hai chữ số kiểu đồng hồ điện tử */
const b75Pad = n => (n < 10 ? '0' : '') + n;

/* ---- vạch kiểm: mỗi nhóm 5 vạch (4 vạch dọc + 1 vạch chéo) ---- */
ART.b75Tally = n => {
  const bar = x => `<line x1="${x}" y1="4" x2="${x}" y2="26" stroke="#e8443a"
    stroke-width="2.6" stroke-linecap="round"/>`;
  const nhom = Math.floor(n / 5), le = n % 5;
  let out = '';
  for (let i = 0; i < nhom; i++){
    out += `<svg class="b75-tg" width="31" height="30" viewBox="0 0 31 30">
      ${[4, 10, 16, 22].map(bar).join('')}
      <line x1="1" y1="27" x2="28" y2="3" stroke="#e8443a" stroke-width="2.6" stroke-linecap="round"/></svg>`;
  }
  if (le){
    const w = le * 6 + 4;
    out += `<svg class="b75-tg" width="${w}" height="30" viewBox="0 0 ${w} 30">
      ${Array.from({length: le}, (_, i) => bar(3 + i * 6)).join('')}</svg>`;
  }
  return out;
};

/* ---- khung ghi chép bằng vạch kiểm ---- */
ART.b75Box = (ten, sl) => '<div class="b75-box">' + ten.map((t, i) =>
  `<div class="r"><span class="nm">${t}:</span><span>${ART.b75Tally(sl[i])}</span></div>`).join('')
  + '</div>';

/* ---- bảng ngang: hàng trên là tên cột, hàng dưới là số liệu ---- */
ART.b75Row = (ten1, cot, ten2, so) =>
  `<div class="b75-wrap"><table class="b75-tbl">
    <tr><td class="hd">${ten1}</td>${cot.map(c => `<td class="hd">${c}</td>`).join('')}</tr>
    <tr><td class="hd">${ten2}</td>${so.map(v => `<td>${v}</td>`).join('')}</tr>
  </table></div>`;

/* ---- bảng dọc hai cột ---- */
ART.b75Col = (h1, h2, hang) =>
  `<div class="b75-wrap"><table class="b75-tbl">
    <tr><td class="hd">${h1}</td><td class="hd">${h2}</td></tr>
    ${hang.map(h => `<tr><td>${h[0]}</td><td>${h[1]}</td></tr>`).join('')}
  </table></div>`;

/* ---- đồng hồ điện tử hiện giờ tròn ---- */
ART.b75Lcd = h => `<svg class="b75-lcd" viewBox="0 0 120 64">
  <rect x="4" y="4" width="112" height="44" rx="7" fill="#1c1c1c" stroke="#6b6b6b" stroke-width="3"/>
  <rect x="10" y="10" width="100" height="32" rx="4" fill="#111"/>
  <text x="60" y="36" text-anchor="middle" font-size="25" font-weight="800"
    fill="#fff" font-family="monospace" letter-spacing="1.5">${b75Pad(h)}:00</text>
  <rect x="20" y="49" width="80" height="7" rx="3.5" fill="#c9c9c9"/>
  <rect x="34" y="55" width="52" height="5" rx="2.5" fill="#9a9a9a"/>
</svg>`;

/* ---- mặt xúc xắc có n chấm ---- */
ART.b75Die = n => {
  const P = {
    1: [[50, 50]],
    2: [[30, 30], [70, 70]],
    3: [[28, 28], [50, 50], [72, 72]],
    4: [[30, 30], [70, 30], [30, 70], [70, 70]],
    5: [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]],
    6: [[30, 26], [70, 26], [30, 50], [70, 50], [30, 74], [70, 74]]
  };
  return `<svg class="b75-die" viewBox="0 0 100 100">
    <rect x="5" y="5" width="90" height="90" rx="12" fill="#fff" stroke="#26324a" stroke-width="4"/>
    ${P[n].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="8.5" fill="#26324a"/>`).join('')}
  </svg>`;
};

BANKS.b75 = [

/* ===== tr.110 – Hoạt động 1: những việc cần làm để chuẩn bị chuyến đi chơi ===== */
() => {
  const q = Q(1, 'Hãy nêu một vài việc cần làm để chuẩn bị cho một chuyến đi chơi.');
  const POOL = ['Chọn địa điểm', 'Chuẩn bị đồ ăn', 'Chuẩn bị nước uống',
    'Chuẩn bị mũ nón', 'Chuẩn bị lều trại', 'Chuẩn bị thuốc y tế'];
  const viec = b75Mix(POOL).slice(0, 3);
  const sl = b75Mix([R(3, 7), R(9, 13), R(15, 20)]);
  const nhieu = viec[sl.indexOf(Math.max(...sl))];
  const it = viec[sl.indexOf(Math.min(...sl))];

  const html = noteBox('Gợi ý: Chúng mình muốn đi đâu, sẽ làm gì ở đó, sẽ ăn gì, uống gì?...')
    + '<div class="b75-sub">Các bạn lớp 3A đã nêu ý kiến. Số bạn nêu mỗi việc '
    + 'được ghi chép lại như sau:</div>'
    + ART.b75Box(viec, sl)
    + '<div class="note">Mỗi vạch là một bạn. Mỗi nhóm vạch kiểm là 5 bạn.</div>'
    + '<div class="b75-ask">a) Mỗi việc có bao nhiêu bạn nêu?</div>'
    + viec.map((t, i) => `<div class="bullet">${t}: ${q.num(sl[i])} bạn.</div>`).join('')
    + '<div class="b75-ask">b) Việc nào được nhiều bạn nêu nhất? '
    + 'Việc nào được ít bạn nêu nhất?</div>'
    + `<div class="fill-line b75-wide">Nhiều bạn nêu nhất: ${q.pick(nhieu, viec)}</div>
       <div class="fill-line b75-wide">Ít bạn nêu nhất: ${q.pick(it, viec)}</div>`;
  return q.done(html,
    'Đếm số vạch kiểm ở mỗi dòng: '
    + viec.map((t, i) => `${t.toLowerCase()}: ${sl[i]} bạn`).join(';  ')
    + `. Số lớn nhất là ${Math.max(...sl)} nên "${nhieu}" được nhiều bạn nêu nhất; `
    + `số bé nhất là ${Math.min(...sl)} nên "${it}" được ít bạn nêu nhất.`);
},

/* ===== tr.110 – Hoạt động 2: bảng số liệu về địa điểm cắm trại ===== */
() => {
  const q = Q(2, 'Đầu tiên, cả lớp sẽ cùng nhau chọn địa điểm để cắm trại. Rô-bốt gợi ý rằng '
    + 'chúng mình có thể chọn một trong ba địa điểm sau: vườn quốc gia, trang trại hoặc công viên.'
    + '<br>Ý kiến của các bạn trong lớp đã được ghi chép lại như dưới đây. '
    + 'Hãy hoàn thành bảng số liệu sau:');
  const DD = ['Vườn quốc gia', 'Trang trại', 'Công viên'];
  const sl = b75Mix([R(4, 8), R(10, 14), R(16, 21)]);
  const chon = DD[sl.indexOf(Math.max(...sl))];

  const html = ART.b75Box(DD, sl)
    + '<div class="note">Mỗi vạch là một bạn. Mỗi nhóm vạch kiểm là 5 bạn.</div>'
    + '<div class="b75-ask">a) Có bao nhiêu bạn muốn cắm trại ở vườn quốc gia? '
    + 'Ở trong trang trại? Ở trong công viên?</div>'
    + ART.b75Row('Địa điểm cắm trại', DD, 'Số bạn chọn (người)', sl.map(v => q.num(v)))
    + '<div class="b75-ask">b) Địa điểm được chọn là địa điểm có nhiều bạn chọn nhất. '
    + 'Vậy lớp mình sẽ cắm trại ở đâu?</div>'
    + `<div class="fill-line b75-wide">${q.pick(chon, DD)}</div>`;
  return q.done(html,
    DD.map((d, i) => `${d.toLowerCase()}: ${sl[i]} bạn`).join(';  ')
    + `. Số bạn chọn nhiều nhất là ${Math.max(...sl)} nên lớp mình sẽ cắm trại ở `
    + `${chon.toLowerCase()}.`);
},

/* ===== tr.110 – Hoạt động 3: Số ? – thời gian xuất phát và kết thúc chuyến đi ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?<br>Các bạn trong lớp đã cho ý kiến về thời gian '
    + 'xuất phát và thời gian kết thúc chuyến đi, kết quả được ghi chép lại như dưới đây. '
    + 'Hãy hoàn thành bảng số liệu.');
  const dai = R(8, 9);                      /* chuyến đi kéo dài mấy giờ */
  const h1 = R(6, 7);                       /* giờ xuất phát của phương án thứ nhất */
  const dau = [h1, h1 + 1];
  const cuoi = [h1 + dai, h1 + dai + 1];
  const nhan = [0, 1].map(i => `${b75Pad(dau[i])}:00 – ${b75Pad(cuoi[i])}:00`);
  const sl = b75Mix([R(8, 13), R(15, 22)]);
  const w = sl[0] > sl[1] ? 0 : 1;          /* phương án được nhiều bạn chọn hơn */

  const oGio = [0, 1].map(i =>
    `${ART.b75Lcd(dau[i])}<span class="b75-dash">–</span>${ART.b75Lcd(cuoi[i])}`);
  const html = ART.b75Box(nhan, sl)
    + '<div class="note">Mỗi vạch là một bạn. Mỗi nhóm vạch kiểm là 5 bạn.</div>'
    + ART.b75Row('Thời gian<br>xuất phát – kết thúc', oGio,
        'Số bạn chọn (người)', sl.map(v => q.num(v)))
    + `<div class="fill-line">Theo số đông các bạn trong lớp, chúng mình thống nhất sẽ xuất phát
        vào lúc ${q.num(dau[w])} giờ và kết thúc chuyến đi vào lúc ${q.num(cuoi[w])} giờ.</div>`;
  return q.done(html,
    `Có ${sl[0]} bạn chọn ${nhan[0]} và ${sl[1]} bạn chọn ${nhan[1]}. `
    + `Vì ${Math.max(...sl)} > ${Math.min(...sl)} nên theo số đông, cả lớp xuất phát lúc `
    + `${dau[w]} giờ và kết thúc chuyến đi lúc ${cuoi[w]} giờ.`);
},

/* ===== tr.111 – Hoạt động 1: ba món ăn được nhiều bạn lựa chọn nhất ===== */
() => {
  const q = Q(1, 'Bây giờ, cả lớp hãy cùng nhau lựa chọn đồ ăn mang theo chuyến đi. '
    + 'Số bạn lựa chọn mỗi món ăn được ghi chép lại như sau:');
  const POOL = ['Bánh mì', 'Xôi', 'Cơm nắm', 'Bánh ngọt', 'Hoa quả',
    'Sữa hộp', 'Xúc xích', 'Bánh bao'];
  const mon = b75Mix(POOL).slice(0, 5);
  const sl = b75Mix([R(2, 4), R(6, 8), R(10, 12), R(14, 16), R(18, 21)]);
  const xep = mon.map((m, i) => ({m, v: sl[i]})).sort((a, b) => b.v - a.v);
  const top3 = xep.slice(0, 3).map(x => x.m);

  const html = ART.b75Box(mon, sl)
    + '<div class="note">Mỗi vạch là một bạn. Mỗi nhóm vạch kiểm là 5 bạn.</div>'
    + '<div class="b75-ask">a) Mỗi món ăn được bao nhiêu bạn lựa chọn?</div>'
    + ART.b75Row('Món ăn', mon, 'Số bạn chọn (người)', sl.map(v => q.num(v)))
    + '<div class="b75-ask">b) Ba món ăn nào được nhiều bạn lựa chọn nhất? (Chọn 3 món ăn)</div>'
    + `<div class="fill-line b75-wide">${q.pick(b75Set(top3), mon)}</div>`;
  return q.done(html,
    'Xếp số bạn chọn từ lớn đến bé: '
    + xep.map(x => `${x.m.toLowerCase()} ${x.v} bạn`).join(' > ')
    + `. Vậy ba món ăn được nhiều bạn lựa chọn nhất là ${top3.join(', ').toLowerCase()}.`);
},

/* ===== tr.111 – Hoạt động 2a: bảng số liệu về màu áo đồng phục ===== */
() => {
  const q = Q(2, 'Cuối cùng, chúng mình sẽ cùng nhau chọn màu áo đồng phục lớp. Do cửa hàng chỉ có '
    + 'đủ số lượng áo với ba màu: trắng, đỏ và vàng, nên cả lớp sẽ chỉ chọn một trong số ba màu áo đó.'
    + '<br>a) Ý kiến của các bạn đã được thu thập như dưới đây. '
    + 'Hãy ghi lại kết quả vào bảng số liệu.');
  const MAU = ['Trắng', 'Đỏ', 'Vàng'];
  const sl = b75Mix([R(5, 9), R(11, 15), R(17, 22)]);
  const nhat = MAU[sl.indexOf(Math.max(...sl))];

  const html = ART.b75Box(MAU, sl)
    + '<div class="note">Mỗi vạch là một bạn. Mỗi nhóm vạch kiểm là 5 bạn.</div>'
    + ART.b75Col('Màu áo', 'Số bạn chọn (người)', MAU.map((m, i) => [m, q.num(sl[i])]))
    + '<div class="b75-ask">Dựa vào bảng số liệu, cho biết màu áo được nhiều bạn chọn nhất '
    + 'là màu nào.</div>'
    + `<div class="fill-line b75-wide">${q.pick(nhat, MAU)}</div>`;
  return q.done(html,
    MAU.map((m, i) => `màu ${m.toLowerCase()}: ${sl[i]} bạn`).join(';  ')
    + `. Số lớn nhất là ${Math.max(...sl)} nên màu áo được nhiều bạn chọn nhất là màu `
    + `${nhat.toLowerCase()}.`);
},

/* ===== tr.111 – Hoạt động 2b: gieo xúc xắc để chọn màu áo theo cách của Rô-bốt ===== */
() => {
  const q = Q(2, 'b) Ngoài ra, Rô-bốt gợi ý một cách chọn màu áo tiết kiệm thời gian hơn bằng cách '
    + 'gieo xúc xắc, quan sát mặt trên của xúc xắc rồi lựa chọn màu áo như sau:');
  const MAU = ['Trắng', 'Đỏ', 'Vàng'];
  const luat = b75Mix(MAU);                 /* mỗi cặp mặt ứng với một màu áo */
  const CAP = [[1, 6], [2, 5], [3, 4]];
  const n = R(1, 6);                        /* số chấm ở mặt trên khi gieo */
  const k = CAP.findIndex(c => c.indexOf(n) >= 0);
  const ans = luat[k];

  const html = CAP.map((c, i) =>
      `<div class="b75-rule"><span>&ndash; Nếu mặt trên là mặt</span>${ART.b75Die(c[0])}
        <span>hoặc</span>${ART.b75Die(c[1])}
        <span>thì chọn áo màu ${luat[i].toLowerCase()}.</span></div>`).join('')
    + '<div class="b75-sub">Bây giờ chúng mình hãy gieo xúc xắc và quan sát số chấm ở mặt trên '
    + 'của xúc xắc.</div>'
    + `<div class="b75-throw">${ART.b75Die(n)}</div>`
    + `<div class="fill-line">Mặt trên của xúc xắc có ${q.num(n)} chấm.</div>`
    + '<div class="b75-ask">Theo cách chọn của Rô-bốt thì màu áo đồng phục của chúng mình '
    + 'là màu nào?</div>'
    + `<div class="fill-line b75-wide">${q.pick(ans, MAU)}</div>`;
  return q.done(html,
    `Mặt trên của xúc xắc có ${n} chấm. Mặt ${CAP[k][0]} chấm hoặc mặt ${CAP[k][1]} chấm `
    + `thì chọn áo màu ${ans.toLowerCase()}, nên màu áo đồng phục của lớp là màu `
    + `${ans.toLowerCase()}.`);
},
];
