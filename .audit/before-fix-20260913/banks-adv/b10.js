/* ===== NÂNG CAO — Bài 10: Bảng nhân 7, bảng chia 7 ===== */

const b10advM7 = [14, 21, 28, 35, 42, 49, 56, 63];
const b10advWeek = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const b10advDayOpts = ok => b10advWeek.filter(x => x !== ok)
  .sort(() => Math.random() - .5).slice(0, 3).concat([ok]).sort(() => Math.random() - .5);

ADV.b10 = [

/* 1. Tìm số theo nhiều điều kiện */
() => {
  const q = Q(1, 'Tìm số thoả mãn tất cả các điều kiện sau.');
  const m = pick(b10advM7);
  const lo = m - R(7, 14), hi = m + R(7, 14);
  const tong = Math.floor(m / 10) + m % 10;
  return q.done(`<div class="bullet">Số đó là kết quả của một phép nhân trong bảng nhân 7.</div>
    <div class="bullet">Số đó lớn hơn ${lo} và bé hơn ${hi}.</div>
    <div class="bullet">Tổng hai chữ số của số đó bằng ${tong}.</div>
    <div class="fill-line">Số đó là ${q.num(m, 2)}</div>
    <div class="fill-line">Số đó chia cho 7 được ${q.num(m / 7, 2)}</div>`,
    `Trong bảng nhân 7, chỉ có ${m} vừa lớn hơn ${lo}, vừa bé hơn ${hi} và có tổng hai chữ số bằng ${tong}.`);
},

/* 2. Tuần lễ và tờ lịch */
() => {
  const q = Q(2, '');
  const d = R(1, 7), k = R(2, 3), thang = R(1, 12), g = pick([9, 10, 11, 12, 13]);
  const w1 = R(0, 6);
  const okA = b10advWeek[w1], okB = b10advWeek[(w1 + g) % 7];
  return q.done(`<p class="wordq">Một tuần lễ có 7 ngày. Ngày ${d} tháng ${thang} là ${okA}.</p>
    <div class="fill-line">${k} tuần lễ có ${q.num(7 * k, 2)} ngày.</div>
    <div class="fill-line">Sau ${k} tuần lễ nữa là ngày ${q.num(d + 7 * k, 2)} tháng ${thang}.</div>
    <div class="fill-line">Ngày đó là ${q.pick(okA, b10advDayOpts(okA))}</div>
    <div class="fill-line">Ngày ${d + g} tháng ${thang} là ${q.pick(okB, b10advDayOpts(okB))}</div>`,
    `7 × ${k} = ${7 * k} (ngày). Cứ sau 7 ngày lại lặp lại đúng thứ đó trong tuần.`);
},

/* 3. Dãy số đếm thêm 7 */
() => {
  const q = Q(3, 'Viết các số còn thiếu vào dãy số sau.');
  const st = pick([7, 14, 21, 28]);
  const hide = [2, 4, 6];
  const seq = Array.from({length:7}, (_, i) => st + i * 7);
  return q.done(`<div class="chain pill">${seq.map((v, i) =>
      `<span class="cnode${hide.includes(i) ? ' q' : ''}">${hide.includes(i) ? q.num(v, 2) : v}</span>`).join('')}</div>
    <div class="fill-line">Hai số liền nhau trong dãy hơn kém nhau ${q.num(7)} đơn vị.</div>
    <div class="fill-line">Số thứ mười của dãy số đó là ${q.num(st + 63, 2)}</div>`,
    `Số thứ mười = ${st} + 7 × 9 = ${st} + 63 = ${st + 63}`);
},

/* 4. So sánh hai biểu thức */
() => {
  const q = Q(4, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(2, 10), b = R(2, 10);
    rows.push({t:`7 × ${a}`, p:`${b} × 7`, l:7 * a, r:7 * b});
  }
  {
    const a = R(2, 10), b = R(2, 10);
    rows.push({t:`${7 * a} : 7`, p:`${6 * b} : 6`, l:a, r:b});
  }
  {
    const a = R(2, 8), b = a + pick([0, 1, 1, 2]);
    rows.push({t:`7 × ${a} + 7`, p:`7 × ${b}`, l:7 * a + 7, r:7 * b});
  }
  {
    const a = R(2, 9), c = Math.max(1, a + pick([-1, 0, 0, 1]));
    rows.push({t:`${7 * a} : 7`, p:`${5 * c} : 5`, l:a, r:c});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính giá trị của mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},

/* 5. Bài toán nhiều bước: gấp ngôi sao mỗi ngày */
() => {
  const q = Q(5, '');
  const ngay = R(3, 5), tong = R(7, 10);
  return q.done(`<p class="wordq">Mỗi ngày bạn Lan gấp được 7 ngôi sao giấy. Bạn Lan cần gấp đủ ${7 * tong} ngôi sao.
      Bạn Lan đã gấp trong ${ngay} ngày.</p>
    <div class="fill-line">Bạn Lan đã gấp được ${q.num(7 * ngay, 2)} ngôi sao.</div>
    <div class="fill-line">Bạn Lan còn thiếu ${q.num(7 * (tong - ngay), 2)} ngôi sao.</div>
    <div class="fill-line">Bạn Lan phải gấp thêm ${q.num(tong - ngay, 2)} ngày nữa mới đủ.</div>`,
    `7 × ${ngay} = ${7 * ngay};  ${7 * tong} − ${7 * ngay} = ${7 * (tong - ngay)};  ${7 * (tong - ngay)} : 7 = ${tong - ngay}`);
},

/* 6. Bài toán ngược: tìm số bi lúc đầu */
() => {
  const q = Q(6, '');
  const tui = R(4, 7), j = R(1, 3), cho = 7 * j;
  return q.done(`<p class="wordq">Bạn An cho bạn Bình ${cho} viên bi. Số bi còn lại của An vừa đủ xếp vào ${tui} túi,
      mỗi túi 7 viên bi. Hỏi lúc đầu bạn An có bao nhiêu viên bi?</p>
    <div class="fill-line">Sau khi cho, bạn An còn lại ${q.num(7 * tui, 2)} viên bi.</div>
    <div class="fill-line">Lúc đầu bạn An có ${q.num(7 * (tui + j), 2)} viên bi.</div>
    <div class="fill-line">Số bi lúc đầu của bạn An xếp vừa đủ vào ${q.num(tui + j, 2)} túi, mỗi túi 7 viên.</div>`,
    `7 × ${tui} = ${7 * tui};  ${7 * tui} + ${cho} = ${7 * (tui + j)};  ${7 * (tui + j)} : 7 = ${tui + j}`);
},
];
