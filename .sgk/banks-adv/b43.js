/* ===== NÂNG CAO — Bài 43: Ôn tập hình học và đo lường ===== */

/* hình tam giác có ghi độ dài ba cạnh */
const b43advTam = (n, c1, c2, c3) => `<svg viewBox="0 0 320 210" class="b43adv-fig">
  <path d="M40 172L160 34L280 172Z" fill="#fdf1e0" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="40" cy="172" r="4.4"/><circle cx="160" cy="34" r="4.4"/><circle cx="280" cy="172" r="4.4"/>
  <text x="22" y="196" font-size="17" font-weight="700">${n.A}</text>
  <text x="152" y="24" font-size="17" font-weight="700">${n.B}</text>
  <text x="286" y="196" font-size="17" font-weight="700">${n.C}</text>
  <text x="66" y="98" text-anchor="end" font-size="16">${c1}</text>
  <text x="252" y="98" text-anchor="start" font-size="16">${c2}</text>
  <text x="160" y="196" text-anchor="middle" font-size="16">${c3}</text>
</svg>`;

/* ba hình tròn bằng nhau xếp liền nhau trên đoạn thẳng AB */
const b43advBaTron = (n, nhan) => {
  const r = 44, y = 76, cs = [54, 142, 230];
  return `<svg viewBox="0 0 296 150" class="b43adv-fig">
    ${cs.map(x => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fdeef2" stroke="#111" stroke-width="2.6"/>`).join('')}
    <path d="M10 ${y}H274" stroke="#111" stroke-width="2.4"/>
    ${cs.map(x => `<circle cx="${x}" cy="${y}" r="3.4" fill="#111"/>`).join('')}
    <circle cx="10" cy="${y}" r="4.4" fill="#111"/><circle cx="274" cy="${y}" r="4.4" fill="#111"/>
    <text x="4" y="${y - 12}" font-size="17" font-weight="700">${n.A}</text>
    <text x="266" y="${y - 12}" font-size="17" font-weight="700">${n.B}</text>
    <text x="16" y="${y + 26}" font-size="15">${nhan}</text>
  </svg>`;
};

const b43advChu = 'ABCDEGHIKLMNPQRSTUVXY';

ADV.b43 = [

/* 1. Chu vi hình tam giác — bài toán ngược và đổi đơn vị */
() => {
  const q = Q(1, 'Trả lời các câu hỏi sau.');
  const bag = b43advChu.split('').sort(() => Math.random() - .5);
  const n = {A:bag[0], B:bag[1], C:bag[2], M:bag[3]};
  /* ba cạnh luôn thoả mãn: tổng hai cạnh bất kì lớn hơn cạnh còn lại */
  const ab = 2 * R(4, 12), bc = R(6, 25);
  const ac = R(Math.max(6, Math.abs(ab - bc) + 2), Math.min(30, ab + bc - 2));
  const cv = ab + bc + ac;
  return q.done(b43advTam(n, `${ab} cm`, `${bc} cm`, '? cm')
    + `<p class="wordq">Hình tam giác ${n.A}${n.B}${n.C} có chu vi là ${cv} cm,
        cạnh ${n.A}${n.B} dài ${ab} cm, cạnh ${n.B}${n.C} dài ${bc} cm.</p>
      <div class="fill-line">Cạnh ${n.A}${n.C} dài ${q.num(ac)} cm.</div>
      <div class="fill-line">Chu vi hình tam giác đó bằng ${q.num(cv * 10)} mm.</div>
      <div class="fill-line">${n.M} là trung điểm của cạnh ${n.A}${n.B} nên ${n.A}${n.M} dài
        ${q.num(ab / 2)} cm.</div>
      <div class="hint-line">Chu vi hình tam giác bằng tổng độ dài ba cạnh. 1 cm = 10 mm.
        Trung điểm chia đoạn thẳng thành hai phần bằng nhau.</div>`,
    `${cv} − ${ab} − ${bc} = ${ac} (cm);  ${cv} cm = ${cv * 10} mm;  ${ab} : 2 = ${ab / 2} (cm).`);
},

/* 2. Bán kính, đường kính của hình tròn */
() => {
  const q = Q(2, 'Trả lời các câu hỏi sau.');
  const bag = b43advChu.split('').sort(() => Math.random() - .5);
  const n = {A:bag[0], B:bag[1]};
  const r = R(3, 9), d = 2 * R(4, 12), rr = R(3, 8);
  return q.done(`<div class="fill-line"><b>a)</b> Một hình tròn có bán kính ${r} cm thì
      đường kính hình tròn đó dài ${q.num(2 * r)} cm.</div>
    <div class="fill-line"><b>b)</b> Một hình tròn có đường kính ${d} cm thì
      bán kính hình tròn đó dài ${q.num(d / 2)} cm.</div>
    <div class="b43adv-sub">c) Ba hình tròn bằng nhau, bán kính ${rr} cm, được xếp liền nhau
      trên đoạn thẳng ${n.A}${n.B} (như hình vẽ).</div>`
    + b43advBaTron(n, `${rr} cm`)
    + `<div class="fill-line">Đường kính mỗi hình tròn dài ${q.num(2 * rr)} cm.</div>
      <div class="fill-line">Đoạn thẳng ${n.A}${n.B} dài ${q.num(6 * rr)} cm.</div>
      <div class="hint-line">Đường kính dài gấp 2 lần bán kính.
        Đoạn thẳng ${n.A}${n.B} gồm ba đường kính nối tiếp nhau.</div>`,
    `a) ${r} × 2 = ${2 * r} (cm).  b) ${d} : 2 = ${d / 2} (cm).  `
    + `c) ${rr} × 2 = ${2 * rr} (cm); ${2 * rr} × 3 = ${6 * rr} (cm).`);
},

/* 3. Đếm khối lập phương xếp thành khối hộp chữ nhật */
() => {
  const q = Q(3, '');
  const a = R(3, 6), b = R(2, 4), c = R(2, 4), k = R(2, 3);
  const lop = a * b, tong = lop * c;
  return q.done(`<p class="wordq">Người ta xếp các khối lập phương nhỏ như nhau thành một khối hộp
      chữ nhật gồm ${c} lớp, mỗi lớp có ${a} hàng, mỗi hàng ${b} khối lập phương nhỏ (như hình vẽ).</p>`
    + ART.b43Box(a, b, c)
    + `<div class="bullet">Mỗi lớp có ${q.num(lop)} khối lập phương nhỏ.</div>
      <div class="bullet">Khối hộp chữ nhật đó được xếp bởi ${q.num(tong)} khối lập phương nhỏ.</div>
      <div class="bullet">Muốn xếp thêm ${k} lớp như thế thì cần thêm ${q.num(k * lop)} khối lập phương nhỏ.</div>
      <div class="bullet">Khi đó có tất cả ${q.num((c + k) * lop)} khối lập phương nhỏ.</div>`,
    `${a} × ${b} = ${lop} (khối);  ${lop} × ${c} = ${tong} (khối);  ${lop} × ${k} = ${k * lop} (khối);  `
    + `${tong} + ${k * lop} = ${(c + k) * lop} (khối).`);
},

/* 4. Đổi đơn vị rồi so sánh các số đo */
() => {
  const q = Q(4, 'Đổi ra cùng một đơn vị đo rồi điền dấu thích hợp vào ô trống.');
  const x1 = R(3, 9), y1 = R(1, 9), z1 = 10 * x1 + y1 + pick([-10, -1, 0, 0, 1, 10]);
  const a2 = R(3, 8), b2 = 10 * a2 + pick([-20, -5, 0, 0, 5, 20]);
  const v3 = 10 * R(85, 100);
  const g4 = 10 * R(85, 100);
  const m5 = R(2, 6), d5 = 10 * m5 + pick([-10, -3, 0, 0, 3, 10]);
  const rows = [
    {t:`${x1} cm ${y1} mm`, p:`${z1} mm`, l:10 * x1 + y1, r:z1},
    {t:`${a2} dm`, p:`${b2} cm`, l:10 * a2, r:b2},
    {t:'1 <i>l</i>', p:`${nf(v3)} ml`, l:1000, r:v3},
    {t:'1 kg', p:`${nf(g4)} g`, l:1000, r:g4},
    {t:`${m5} m`, p:`${d5} dm`, l:10 * m5, r:d5}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b43adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b43adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">1 cm = 10 mm · 1 dm = 10 cm · 1 m = 10 dm · 1 l = 1 000 ml · 1 kg = 1 000 g
      · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `${x1} cm ${y1} mm = ${10 * x1 + y1} mm;  ${a2} dm = ${10 * a2} cm;  1 l = 1 000 ml;  `
    + `1 kg = 1 000 g;  ${m5} m = ${10 * m5} dm.`);
},

/* 5. Bài toán khối lượng ba bước */
() => {
  const q = Q(5, '');
  const m = R(40, 110), sl = 3, tui = R(4, 6), hop = R(100, Math.min(300, 990 - tui * m));
  return q.done(`<p class="wordq">${sl} túi kẹo như nhau cân nặng ${sl * m} g.
      Hỏi ${tui} túi kẹo như thế và một hộp bánh nặng ${hop} g thì cân nặng tất cả bao nhiêu gam?</p>
    <div class="bullet">Mỗi túi kẹo cân nặng ${q.num(m)} g.</div>
    <div class="bullet">${tui} túi kẹo cân nặng ${q.num(tui * m)} g.</div>
    <div class="bullet">Tất cả cân nặng ${q.num(tui * m + hop)} g.</div>`,
    `${sl * m} : ${sl} = ${m} (g);  ${m} × ${tui} = ${tui * m} (g);  `
    + `${tui * m} + ${hop} = ${tui * m + hop} (g).`);
},

/* 6. Bài toán về dung tích, đổi l ra ml */
() => {
  const q = Q(6, '');
  const k = pick([2, 4, 5, 8]), moi = 1000 / k, uong = R(1, k - 1);
  const v = pick([120, 150, 180, 200, 240, 250, 300]);
  const s = R(2, Math.min(4, Math.floor(900 / v)));
  return q.done(`<div class="b43adv-sub">a)</div>
    <p class="wordq">Một can đựng 1 <i>l</i> nước quả được rót đều vào ${k} cốc.
      Các bạn đã uống hết ${uong} cốc nước quả đó.</p>
    <div class="bullet">1 <i>l</i> = ${q.num(1000)} ml.</div>
    <div class="bullet">Mỗi cốc chứa ${q.num(moi)} ml nước quả.</div>
    <div class="bullet">Các bạn đã uống hết ${q.num(uong * moi)} ml nước quả.</div>
    <div class="bullet">Trong các cốc còn lại ${q.num((k - uong) * moi)} ml nước quả.</div>
    <div class="b43adv-sub">b)</div>
    <p class="wordq">Mỗi chai nước lọc chứa ${v} ml. Mẹ mua ${s} chai nước như thế.</p>
    <div class="bullet">Cả ${s} chai chứa ${q.num(v * s)} ml nước.</div>
    <div class="bullet">Số nước đó còn thiếu ${q.num(1000 - v * s)} ml nữa thì được 1 <i>l</i>.</div>`,
    `a) 1 l = 1 000 ml; 1 000 : ${k} = ${moi} (ml); ${moi} × ${uong} = ${uong * moi} (ml); `
    + `1 000 − ${uong * moi} = ${(k - uong) * moi} (ml).  `
    + `b) ${v} × ${s} = ${v * s} (ml); 1 000 − ${v * s} = ${1000 - v * s} (ml).`);
},
];
