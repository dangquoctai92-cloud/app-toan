/* ===== NÂNG CAO — Bài 7: Ôn tập hình học và đo lường ===== */



/* dải hình chữ nhật chia thành n ô bằng nhau */
const b7advStrip = n => {
  const w = 46, h = 34, W = n * w + 8, H = h + 12;
  let lines = '';
  for (let i = 1; i < n; i++) lines += `<path d="M${4 + i * w} 6V${6 + h}"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="b7adv-fig">
    <rect x="4" y="6" width="${n * w}" height="${h}" fill="#fff7e6" stroke="#2b2b2b" stroke-width="3"/>
    <g fill="none" stroke="#2b2b2b" stroke-width="2.4">${lines}</g></svg>`;
};

const b7advWeek = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

/* 4 lựa chọn thứ trong tuần, chắc chắn có đáp án đúng */
const b7advDayOpts = ok => b7advWeek.filter(x => x !== ok)
  .sort(() => Math.random() - .5).slice(0, 3).concat([ok]).sort(() => Math.random() - .5);

ADV.b7 = [

/* 1. Đường gấp khúc — bài toán ngược: biết cả đường và hai đoạn, tìm đoạn còn lại */
() => {
  const q = Q(1, 'Đường gấp khúc ABCD gồm ba đoạn thẳng AB, BC và CD.');
  const pool = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70].sort(() => Math.random() - .5);
  const ab = pool[0], bc = pool[1], cd = pool[2];
  const tong = ab + bc + cd;
  const ten = ['AB', 'BC', 'CD'], val = [ab, bc, cd];
  const lon = Math.max(ab, bc, cd), be = Math.min(ab, bc, cd);
  return q.done(`<div class="bullet">Đoạn thẳng AB dài ${ab} cm.</div>
    <div class="bullet">Đoạn thẳng BC dài ${bc} cm.</div>
    <div class="bullet">Cả đường gấp khúc ABCD dài ${tong} cm.</div>
    <div class="fill-line">Đoạn thẳng CD dài ${q.num(cd)} cm.</div>
    <div class="fill-line">Đoạn thẳng dài nhất là ${q.pick(ten[val.indexOf(lon)], ten)}</div>
    <div class="fill-line">Đoạn dài nhất hơn đoạn ngắn nhất ${q.num(lon - be)} cm.</div>`,
    `${tong} − ${ab} − ${bc} = ${cd} (cm);  ${lon} − ${be} = ${lon - be} (cm)`);
},

/* 2. Bài toán đo lường ba bước: rót dầu ra can */
() => {
  const q = Q(2, '');
  const a = pick([2, 3, 4, 5]);
  const b = pick([2, 3, 4, 5].filter(x => x !== a));
  const n = R(3, 6), so = R(2, 6);
  const rot = a * n, con = b * so, T = rot + con;
  return q.done(`<p class="wordq">Một thùng chứa ${T} <i>l</i> dầu. Người ta rót dầu từ thùng ra ${n} can,
      mỗi can ${a} <i>l</i>. Số dầu còn lại trong thùng được rót đầy vào các can loại ${b} <i>l</i>.</p>
    <div class="fill-line">Số dầu đã rót ra ${n} can là ${q.num(rot, 2)} <i>l</i>.</div>
    <div class="fill-line">Số dầu còn lại trong thùng là ${q.num(con, 2)} <i>l</i>.</div>
    <div class="fill-line">Số dầu còn lại rót đầy được ${q.num(so, 2)} can loại ${b} <i>l</i>.</div>`,
    `${a} × ${n} = ${rot};  ${T} − ${rot} = ${con};  ${con} : ${b} = ${so}`);
},

/* 3. Xem giờ và xem lịch */
() => {
  const q = Q(3, '');
  const h = R(6, 9);
  const m = pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
  let k = pick([15, 20, 25, 30, 40, 45, 50, 70, 80, 90]);
  if ((m + k) % 60 === 0) k += 5;
  const tot = m + k, gio = h + Math.floor(tot / 60), phut = tot % 60;
  const d = R(1, 9), thang = R(1, 12), g = pick([9, 10, 11, 12, 13]);
  const w1 = R(0, 6);
  const okA = b7advWeek[w1], okB = b7advWeek[(w1 + g) % 7];
  return q.done(`<div class="bullet">a) Bạn Mai bắt đầu làm bài lúc ${h} giờ ${m} phút và làm bài trong ${k} phút.</div>
    <div class="fill-line">Bạn Mai làm xong bài lúc ${q.num(gio, 2)} giờ ${q.num(phut, 2)} phút.</div>
    <div class="bullet">b) Ngày ${d} tháng ${thang} là ${okA}.</div>
    <div class="fill-line">Ngày ${d + 7} tháng ${thang} là ${q.pick(okA, b7advDayOpts(okA))}</div>
    <div class="fill-line">Ngày ${d + g} tháng ${thang} là ${q.pick(okB, b7advDayOpts(okB))}</div>`,
    `a) ${m} + ${k} = ${tot} (phút) = ${Math.floor(tot / 60)} giờ ${phut} phút, nên xong lúc ${gio} giờ ${phut} phút.
     b) Cứ sau 7 ngày lại lặp lại cùng một thứ.`);
},

/* 4. Đếm hình chữ nhật trong dải chia đều */
() => {
  const q = Q(4, 'Quan sát hình chữ nhật lớn được chia thành các ô bằng nhau dưới đây.');
  const n = R(3, 5), a = pick([2, 3, 4, 5]);
  const so = n * (n + 1) / 2;
  const cach = Array.from({length:n}, (_, i) => n - i).join(' + ');
  return q.done(b7advStrip(n) +
    `<div class="fill-line">Trong hình bên có tất cả ${q.num(so, 2)} hình chữ nhật.</div>
     <div class="fill-line">Mỗi ô nhỏ có chiều dài ${a} cm nên hình chữ nhật lớn có chiều dài ${q.num(n * a, 2)} cm.</div>
     <div class="hint-line">Đếm lần lượt: hình gồm 1 ô, hình gồm 2 ô liền nhau, hình gồm 3 ô liền nhau, ...</div>`,
    `${cach} = ${so} (hình);  ${a} × ${n} = ${n * a} (cm)`);
},

/* 5. Bài toán ngược: tìm lượng nước lúc đầu */
() => {
  const q = Q(5, '');
  const lan1 = R(30, 90), lan2 = R(25, 80), con = R(120, 400);
  return q.done(`<p class="wordq">Người ta lấy ở một bể nước ra ${lan1} <i>l</i>, sau đó lấy tiếp ${lan2} <i>l</i> nữa
      thì trong bể còn lại ${con} <i>l</i> nước. Hỏi lúc đầu bể có bao nhiêu lít nước?</p>
    <div class="fill-line">Trước khi lấy lần thứ hai, trong bể có ${q.num(con + lan2)} <i>l</i> nước.</div>
    <div class="fill-line">Lúc đầu trong bể có ${q.num(con + lan2 + lan1)} <i>l</i> nước.</div>
    <div class="fill-line">Cả hai lần đã lấy ra ${q.num(lan1 + lan2)} <i>l</i> nước.</div>`,
    `${con} + ${lan2} = ${con + lan2};  ${con + lan2} + ${lan1} = ${con + lan2 + lan1} (l)`);
},

/* 6. So sánh các số đo */
() => {
  const q = Q(6, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const x = R(3, 9), y = R(2, 8), z = x + y + pick([-2, -1, 0, 0, 1, 2]);
    rows.push({t:`${x} <i>l</i> + ${y} <i>l</i>`, p:`${z} <i>l</i>`, l:x + y, r:z});
  }
  {
    const r0 = R(8, 25), x = r0 + R(5, 30), y = r0 + pick([-3, -2, 0, 0, 2, 3]);
    rows.push({t:`${x} kg − ${x - r0} kg`, p:`${y} kg`, l:r0, r:y});
  }
  {
    const t = pick([30, 45, 50, 60, 70, 90]);
    rows.push({t:'1 giờ', p:`${t} phút`, l:60, r:t});
  }
  {
    const u = R(10, 45), v = R(10, 45), w = u + v + pick([-5, 0, 0, 5]);
    rows.push({t:`${u} cm + ${v} cm`, p:`${w} cm`, l:u + v, r:w});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; = · Nhớ rằng 1 giờ = 60 phút.</div>`);
},
];
