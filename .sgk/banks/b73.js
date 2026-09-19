/* ==================== BÀI 73: THU THẬP, PHÂN LOẠI, GHI CHÉP SỐ LIỆU.
   BẢNG SỐ LIỆU (SGK tập 2 – tr.102, 103, 104, 105, 106)
   hoạt động tr.103 : bài 1 (đồ dùng học tập ghi bằng vạch kiểm), bài 2 (phân loại hình)
   hoạt động tr.104 : bài 1 (bảng số vật nuôi), bài 2 (bảng số sách bán được)
   luyện tập tr.105 : bài 1 (bảng số giờ đọc sách), bài 2 (nhiệt độ Sa Pa)
   luyện tập tr.106 : bài 3 (bảng số học sinh khối lớp 3)
========================================================================================= */

/* trộn một mảng */
const b73Mix = a => a.slice().sort(() => Math.random() - .5);
/* đáp án nhiều lựa chọn phải xếp theo thứ tự chuỗi */
const b73Set = a => a.slice().sort().join(',');

/* ---- vạch kiểm: mỗi nhóm 5 vạch (4 vạch dọc + 1 vạch chéo) ---- */
ART.b73Tally = n => {
  const bar = x => `<line x1="${x}" y1="4" x2="${x}" y2="26" stroke="#e8443a"
    stroke-width="2.6" stroke-linecap="round"/>`;
  const nhom = Math.floor(n / 5), le = n % 5;
  let out = '';
  for (let i = 0; i < nhom; i++){
    out += `<svg class="b73-tg" width="31" height="30" viewBox="0 0 31 30">
      ${[4, 10, 16, 22].map(bar).join('')}
      <line x1="1" y1="27" x2="28" y2="3" stroke="#e8443a" stroke-width="2.6" stroke-linecap="round"/></svg>`;
  }
  if (le){
    const w = le * 6 + 4;
    out += `<svg class="b73-tg" width="${w}" height="30" viewBox="0 0 ${w} 30">
      ${Array.from({length: le}, (_, i) => bar(3 + i * 6)).join('')}</svg>`;
  }
  return out;
};

/* ---- ba dạng hình dùng cho bài phân loại ---- */
ART.b73Shape = kind => {
  if (kind === 'Hình tròn') return `<svg class="b73-sh" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="16" fill="#6fc2ea" stroke="#2a6f92" stroke-width="2.4"/></svg>`;
  if (kind === 'Hình tam giác') return `<svg class="b73-sh" viewBox="0 0 40 40">
    <path d="M20 4L36 34H4z" fill="#8cc63f" stroke="#4e7a1c" stroke-width="2.4" stroke-linejoin="round"/></svg>`;
  return `<svg class="b73-sh" viewBox="0 0 40 40">
    <rect x="5" y="5" width="30" height="30" rx="3" fill="#f7c11e" stroke="#a2790a" stroke-width="2.4"/></svg>`;
};

/* ---- bảng: cột đầu là tên hàng, ô góc có gạch chéo ---- */
ART.b73Tbl2 = (goc1, goc2, cot, hang) =>
  `<div class="b73-wrap"><table class="b73-tbl">
    <tr><td class="b73-diag"><span class="t1">${goc1}</span><span class="t2">${goc2}</span></td>
      ${cot.map(c => `<td class="tp">${c}</td>`).join('')}</tr>
    ${hang.map(h => `<tr><td class="hd">${h[0]}</td>
      ${h.slice(1).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
  </table></div>`;

/* ---- bảng hai hàng đơn giản (không có ô góc gạch chéo) ---- */
ART.b73Tbl1 = (ten1, cot, ten2, so) =>
  `<div class="b73-wrap"><table class="b73-tbl">
    <tr><td class="tp">${ten1}</td>${cot.map(c => `<td class="tp">${c}</td>`).join('')}</tr>
    <tr><td class="hd">${ten2}</td>${so.map(v => `<td>${v}</td>`).join('')}</tr>
  </table></div>`;

BANKS.b73 = [

/* ===== tr.103 – Hoạt động 1: đồ dùng học tập ghi bằng vạch kiểm ===== */
() => {
  const q = Q(1, 'Để thực hiện kế hoạch nhỏ của lớp, các bạn lớp 3A đã góp một số đồ dùng học tập '
    + 'với số lượng được ghi chép lại như sau:');
  const POOL = ['Vở', 'Bút chì', 'Bút mực', 'Thước kẻ', 'Tẩy'];
  const ten = b73Mix(POOL).slice(0, 3);
  const sl = b73Mix([R(4, 9), R(11, 17), R(19, 26)]);
  const nhieu = ten[sl.indexOf(Math.max(...sl))];
  const it = ten[sl.indexOf(Math.min(...sl))];

  const box = '<div class="b73-box">' + ten.map((t, i) =>
    `<div class="r"><span class="nm">${t}:</span><span>${ART.b73Tally(sl[i])}</span></div>`).join('')
    + '</div>';
  const html = box
    + '<div class="note">Mỗi vạch là một đồ vật. Mỗi nhóm vạch kiểm là 5 đồ vật.</div>'
    + '<div class="b73-ask">a) Các bạn lớp 3A đã góp những loại đồ dùng học tập nào?</div>'
    + `<div class="fill-line b73-wide">${q.pick(b73Set(ten), POOL)}</div>`
    + '<div class="b73-ask">b) Các bạn đã góp được bao nhiêu đồ vật mỗi loại?</div>'
    + ten.map((t, i) => `<div class="bullet">${t}: ${q.num(sl[i])} đồ vật.</div>`).join('')
    + '<div class="b73-ask">c) Trong số đồ vật góp được, đồ vật nào có nhiều nhất? '
    + 'Đồ vật nào có ít nhất?</div>'
    + `<div class="fill-line b73-wide">Nhiều nhất: ${q.pick(nhieu, ten)}</div>
       <div class="fill-line b73-wide">Ít nhất: ${q.pick(it, ten)}</div>`;
  return q.done(html,
    ten.map((t, i) => `${t}: ${sl[i]} đồ vật`).join(';  ')
    + `. Vậy ${nhieu} có nhiều nhất, ${it} có ít nhất.`);
},

/* ===== tr.103 – Hoạt động 2: phân loại, đếm và ghi chép theo dạng hình ===== */
() => {
  const q = Q(2, 'Quan sát, phân loại, đếm và ghi chép số lượng đồ vật theo dạng hình tròn, '
    + 'hình tam giác, hình vuông.');
  const KIND = ['Hình tròn', 'Hình tam giác', 'Hình vuông'];
  const sl = b73Mix([R(3, 5), R(6, 8), R(9, 12)]);
  const nhieu = KIND[sl.indexOf(Math.max(...sl))];
  const it = KIND[sl.indexOf(Math.min(...sl))];

  const hinh = [];
  KIND.forEach((k, i) => { for (let j = 0; j < sl[i]; j++) hinh.push(k); });
  const html = '<div class="b73-shapes">'
      + b73Mix(hinh).map(k => ART.b73Shape(k)).join('') + '</div>'
    + '<div class="b73-ask">a) Đếm và ghi lại số lượng mỗi dạng hình.</div>'
    + ART.b73Tbl1('Dạng hình', KIND, 'Số lượng (hình)', sl.map(v => q.num(v)))
    + '<div class="b73-ask">b) Dạng hình nào có nhiều nhất? Dạng hình nào có ít nhất?</div>'
    + `<div class="fill-line b73-wide">Nhiều nhất: ${q.pick(nhieu, KIND)}</div>
       <div class="fill-line b73-wide">Ít nhất: ${q.pick(it, KIND)}</div>`;
  return q.done(html,
    KIND.map((k, i) => `${k.toLowerCase()}: ${sl[i]}`).join(';  ')
    + `. Vậy ${nhieu.toLowerCase()} có nhiều nhất, ${it.toLowerCase()} có ít nhất.`);
},

/* ===== tr.104 – Hoạt động 1: bảng số liệu về số vật nuôi ===== */
() => {
  const q = Q(1, 'Dưới đây là bảng số liệu về số vật nuôi trong một trang trại.');
  const POOL = ['Bò', 'Gà', 'Lợn', 'Dê', 'Vịt', 'Ngựa', 'Trâu'];
  const ten = b73Mix(POOL).slice(0, 4);
  const sl = b73Mix([R(20, 39), R(41, 59), R(61, 89), R(95, 140)]);
  const nhieu = ten[sl.indexOf(Math.max(...sl))];
  const it = ten[sl.indexOf(Math.min(...sl))];

  const html = ART.b73Tbl1('Loại vật nuôi', ten, 'Số lượng (con)', sl)
    + '<div class="b73-sub">Dựa vào bảng trên, trả lời câu hỏi:</div>'
    + '<div class="b73-ask">a) Trong trang trại, mỗi loại vật nuôi có bao nhiêu con?</div>'
    + ten.map((t, i) => `<div class="bullet">${t}: ${q.num(sl[i])} con.</div>`).join('')
    + '<div class="b73-ask">b) Trong trang trại, loại vật nuôi nào ít nhất? '
    + 'Loại vật nuôi nào nhiều nhất?</div>'
    + `<div class="fill-line b73-wide">Ít nhất: ${q.pick(it, ten)}</div>
       <div class="fill-line b73-wide">Nhiều nhất: ${q.pick(nhieu, ten)}</div>`;
  return q.done(html,
    `Trong bảng, số bé nhất là ${Math.min(...sl)} nên ${it} ít nhất; `
    + `số lớn nhất là ${Math.max(...sl)} nên ${nhieu} nhiều nhất.`);
},

/* ===== tr.104 – Hoạt động 2: bảng số quyển sách bán được trong ba tháng ===== */
() => {
  const q = Q(2, 'Cho bảng số liệu về số quyển sách bán được trong ba tháng đầu năm '
    + 'của một cửa hàng sách.');
  const kh = [R(20, 35) * 10, R(20, 35) * 10, R(20, 35) * 10];
  const tt = [R(40, 65) * 10, R(40, 65) * 10, R(40, 65) * 10];
  const t1 = kh[0] + tt[0];

  const html = ART.b73Tbl2('Tháng', 'Loại sách', ['1', '2', '3'], [
      ['Sách khoa học', ...kh.map(v => v + ' quyển')],
      ['Truyện tranh', ...tt.map(v => v + ' quyển')]
    ])
    + '<div class="b73-sub">Dựa vào bảng trên, trả lời câu hỏi:</div>'
    + '<div class="b73-ask">a) Trong tháng 2, cửa hàng bán được bao nhiêu quyển sách mỗi loại?</div>'
    + `<div class="bullet">Sách khoa học: ${q.num(kh[1])} quyển.</div>
       <div class="bullet">Truyện tranh: ${q.num(tt[1])} quyển.</div>`
    + '<div class="b73-ask">b) Mỗi tháng cửa hàng bán được bao nhiêu quyển truyện tranh?</div>'
    + tt.map((v, i) => `<div class="bullet">Tháng ${i + 1}: ${q.num(v)} quyển.</div>`).join('')
    + '<div class="b73-ask">c) Trong tháng 1, cửa hàng bán được tất cả bao nhiêu quyển sách?</div>'
    + `<div class="bullet">Tháng 1 bán được tất cả ${q.num(t1)} quyển sách.</div>`;
  return q.done(html,
    `c) Tháng 1 bán được: ${kh[0]} + ${tt[0]} = ${t1} (quyển sách).`);
},

/* ===== tr.105 – Luyện tập 1: bảng số giờ đọc sách ===== */
() => {
  const q = Q(1, 'Cho bảng số liệu về số giờ đọc sách của các bạn Việt, Mai, Nam và Rô-bốt '
    + 'trong tuần vừa qua.');
  const ten = b73Mix(['Việt', 'Mai', 'Nam', 'Rô-bốt']);
  const gio = b73Mix([R(4, 5), R(6, 7), R(8, 9), R(10, 12)]);
  const nhat = ten[gio.indexOf(Math.max(...gio))];

  const html = ART.b73Tbl1('Bạn', ten, 'Số giờ đọc sách (giờ)', gio)
    + '<div class="b73-sub">Dựa vào bảng trên, hãy cho biết trong tuần qua:</div>'
    + '<div class="b73-ask">a) Mỗi bạn dành bao nhiêu giờ để đọc sách?</div>'
    + ten.map((t, i) => `<div class="bullet">${t}: ${q.num(gio[i])} giờ.</div>`).join('')
    + '<div class="b73-ask">b) Bạn nào dành nhiều thời gian để đọc sách nhất?</div>'
    + `<div class="fill-line b73-wide">${q.pick(nhat, ten)}</div>`;
  return q.done(html,
    `Số giờ lớn nhất trong bảng là ${Math.max(...gio)} giờ nên bạn ${nhat} `
    + 'dành nhiều thời gian đọc sách nhất.');
},

/* ===== tr.105 – Luyện tập 2: nhiệt độ ở Sa Pa trong ba ngày ===== */
() => {
  const q = Q(2, 'Rô-bốt vừa ghé thăm Sa Pa trong một chuyến đi dài ba ngày. '
    + 'Nhiệt độ không khí thấp nhất và cao nhất trong ba ngày tại đó được Rô-bốt ghi chép lại như sau:');
  const lanh = R(0, 2);                                  /* đúng một ngày xuống dưới 10 độ C */
  const thap = [0, 1, 2].map(i => i === lanh ? R(4, 9) : R(10, 15));
  const cao = thap.map(v => v + R(4, 9));
  const NGAY = ['Ngày 1', 'Ngày 2', 'Ngày 3'];

  const html = thap.map((v, i) =>
      `<div class="bullet">Ngày ${i + 1}: ${v} &deg;C &ndash; ${cao[i]} &deg;C.</div>`).join('')
    + '<div class="b73-ask">a) <span class="tag">Số</span> ?</div>'
    + '<div class="b73-sub">Dựa vào thông tin ở trên, hãy hoàn thành bảng số liệu sau:</div>'
    + ART.b73Tbl2('Ngày', 'Nhiệt độ', ['1', '2', '3'], [
        ['Cao nhất', cao[0] + ' &deg;C', q.num(cao[1]) + ' &deg;C', q.num(cao[2]) + ' &deg;C'],
        ['Thấp nhất', thap[0] + ' &deg;C', q.num(thap[1]) + ' &deg;C', q.num(thap[2]) + ' &deg;C']
      ])
    + '<div class="b73-ask">b) Dựa vào bảng trên, hãy cho biết ngày nào có nhiệt độ '
    + 'xuống dưới 10 &deg;C.</div>'
    + `<div class="fill-line b73-wide">${q.pick(NGAY[lanh], NGAY)}</div>`;
  return q.done(html,
    `Nhiệt độ thấp nhất của ba ngày lần lượt là ${thap.join(' °C, ')} °C. `
    + `Chỉ có ${thap[lanh]} °C bé hơn 10 °C nên ${NGAY[lanh].toLowerCase()} `
    + 'có nhiệt độ xuống dưới 10 °C.');
},

/* ===== tr.106 – Luyện tập 3: bảng số học sinh khối lớp 3 ===== */
() => {
  const q = Q(3, 'a) Hoàn thành bảng số liệu về số học sinh khối lớp 3 tại một trường tiểu học.');
  const LOP = ['3A', '3B', '3C'];
  /* số học sinh nam: đúng hai lớp bằng nhau */
  const base = R(13, 19);
  const nam = [base, base, base];
  const khac = R(0, 2);
  nam[khac] = base + pick([-3, -2, 2, 3]);
  /* số học sinh nữ: ba lớp khác nhau */
  const nu = b73Mix([R(10, 12), R(14, 16), R(18, 20)]);
  /* bảo đảm có ít nhất một lớp nhiều hơn 30 học sinh (tăng lớp có nhiều nữ nhất) */
  const jMax = nu.indexOf(Math.max(...nu));
  if (nam[jMax] + nu[jMax] <= 30) nu[jMax] = 31 - nam[jMax];
  const ca = LOP.map((_, i) => nam[i] + nu[i]);

  /* ba ô "?" nằm ở ba lớp khác nhau, mỗi hàng đúng một ô */
  const oNam = R(0, 2);
  const oNu = (oNam + 1 + R(0, 1)) % 3;
  const oCa = 3 - oNam - oNu;

  const hangNam = ['Nam', ...LOP.map((_, i) => i === oNam ? q.num(nam[i]) : nam[i])];
  const hangNu = ['Nữ', ...LOP.map((_, i) => i === oNu ? q.num(nu[i]) : nu[i])];
  const hangCa = ['Cả lớp', ...LOP.map((_, i) => i === oCa ? q.num(ca[i]) : ca[i])];

  const hon30 = LOP.filter((_, i) => ca[i] > 30);
  const nhieuNu = LOP[nu.indexOf(Math.max(...nu))];
  const itNu = LOP[nu.indexOf(Math.min(...nu))];
  const bangNhau = LOP.filter((_, i) => i !== khac);

  const html = ART.b73Tbl2('Lớp', 'Số học sinh', LOP, [hangNam, hangNu, hangCa])
    + '<div class="b73-ask">b) Dựa vào bảng số liệu trên, trả lời câu hỏi:</div>'
    + '<div class="b73-sub">&ndash; Lớp nào có nhiều hơn 30 học sinh?</div>'
    + `<div class="fill-line b73-wide">${q.pick(b73Set(hon30), LOP)}</div>`
    + '<div class="b73-sub">&ndash; Lớp nào có nhiều học sinh nữ nhất? '
    + 'Lớp nào có ít học sinh nữ nhất?</div>'
    + `<div class="fill-line b73-wide">Nhiều nhất: ${q.pick(nhieuNu, LOP)}</div>
       <div class="fill-line b73-wide">Ít nhất: ${q.pick(itNu, LOP)}</div>`
    + '<div class="b73-sub">&ndash; Những lớp nào có số học sinh nam bằng nhau?</div>'
    + `<div class="fill-line b73-wide">${q.pick(b73Set(bangNhau), LOP)}</div>`;
  return q.done(html,
    `Số học sinh cả lớp: ${LOP.map((l, i) => l + ' có ' + ca[i]).join(', ')} học sinh. `
    + `Hai lớp ${bangNhau.join(' và ')} cùng có ${base} học sinh nam.`);
},
];
