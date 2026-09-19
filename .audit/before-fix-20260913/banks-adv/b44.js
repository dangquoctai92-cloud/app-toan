/*CSS
.b44adv-eq{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:19px;font-weight:800;
  color:#2f4a3a;background:#eef9f1;border:2.5px solid #a9d9bd;border-radius:12px;
  padding:8px 14px;margin:8px 0}
.b44adv-eq b{color:#d63384;font-weight:800;margin-right:2px}
.b44adv-side{min-width:150px}
.b44adv-path{width:100%;max-width:420px;height:auto;display:block;margin:6px auto}
.b44adv-jarrow{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;gap:8px 14px;margin:8px 0}
.b44adv-jar{width:58px;height:auto;display:block}
.b44adv-cap{font-size:13px;font-weight:700;color:#1f63b8;text-align:center;display:block;margin-top:2px}
CSS*/

/* ===== NÂNG CAO — Bài 44: Luyện tập chung ===== */

const b44advLen = v => String(v).length;

/* độ lệch nhỏ để hai vế khi bằng nhau, khi hơn kém nhau */
const b44advLech = n => pick([-R(1, n), -R(1, n), 0, R(1, n), R(1, n)]);

/* đường gấp khúc ba đoạn kèm tên đỉnh và số đo (mm) */
const b44advPath = (nm, a, b, c) => `<svg viewBox="0 0 420 148" class="b44adv-path">
  <path d="M24 118L134 34L262 118L396 40" fill="none" stroke="#2f6fb5" stroke-width="4.5"
    stroke-linecap="round" stroke-linejoin="round"/>
  <g fill="#d63384">
    <circle cx="24" cy="118" r="5"/><circle cx="134" cy="34" r="5"/>
    <circle cx="262" cy="118" r="5"/><circle cx="396" cy="40" r="5"/>
  </g>
  <g font-size="17" font-weight="800" fill="#2b2b2b">
    <text x="14" y="140">${nm.A}</text><text x="128" y="24">${nm.B}</text>
    <text x="256" y="140">${nm.C}</text><text x="390" y="30">${nm.D}</text>
  </g>
  <g font-size="14" font-weight="700" fill="#1f7a4a">
    <text x="52" y="72">${a} mm</text><text x="188" y="66">${b} mm</text>
    <text x="318" y="96">? mm</text>
  </g>
</svg>`;

/* can dầu */
const b44advCan = c => `<svg viewBox="0 0 62 78" class="b44adv-jar">
  <rect x="8" y="20" width="46" height="52" rx="6" fill="${c}" stroke="#7a5a2b" stroke-width="2.4"/>
  <rect x="24" y="8" width="14" height="14" rx="3" fill="${c}" stroke="#7a5a2b" stroke-width="2.4"/>
  <path d="M14 34h34" stroke="#7a5a2b" stroke-width="2"/>
</svg>`;

ADV.b44 = [

/* 1. Tìm thành phần chưa biết trong biểu thức có ngoặc */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho ô trống.');
  const k1 = R(2, 4), x1 = R(101, Math.floor(999 / k1));
  const d2 = R(2, 9), t2 = R(11, Math.floor(999 / d2));
  const k3 = R(2, 5);
  const s3 = R(24, Math.min(160, Math.floor(999 / k3)));
  const m3 = R(10, s3 - 12), x3 = s3 - m3;
  const d4 = R(2, 6), k4 = R(2, 3);
  const t4 = R(11, Math.min(Math.floor(999 / d4), Math.floor(999 / k4)));
  const x4 = d4 * t4, V4 = t4 * k4;
  return q.done(`<div class="b44adv-eq"><b>a)</b> ${q.num(x1, 3)} × ${k1} = ${x1 * k1}</div>
    <div class="b44adv-eq"><b>b)</b> ${d2 * t2} : ${q.num(d2, 1)} = ${t2}</div>
    <div class="b44adv-eq"><b>c)</b> (${q.num(x3, b44advLen(x3))} + ${m3}) × ${k3} = ${s3 * k3}</div>
    <div class="b44adv-eq"><b>d)</b> ${q.num(x4, b44advLen(x4))} : ${d4} × ${k4} = ${V4}</div>
    <div class="hint-line">Hãy làm ngược lại từ kết quả: gặp phép nhân thì chia,
      gặp phép cộng thì trừ. Với câu c) tìm giá trị trong ngoặc trước.</div>`,
    `a) ${x1 * k1} : ${k1} = ${x1}.  b) Vì ${t2} × ${d2} = ${d2 * t2} nên số chia là ${d2}.  `
    + `c) ${s3 * k3} : ${k3} = ${s3}; ${s3} − ${m3} = ${x3}.  `
    + `d) ${V4} : ${k4} = ${t4}; ${t4} × ${d4} = ${x4}.`);
},

/* 2. So sánh giá trị của hai biểu thức */
() => {
  const q = Q(2, 'Tính giá trị mỗi vế rồi điền dấu thích hợp vào ô trống.');
  const b1 = R(2, 9), a1 = R(21, Math.floor(999 / b1));
  const d1 = R(2, 9), c1 = R(21, Math.floor(999 / d1));
  const e2 = R(2, 9), t2 = R(21, Math.floor(999 / e2));
  const v2 = t2 + b44advLech(12);
  const k3 = R(2, 5);
  const s3 = R(30, Math.min(180, Math.floor(999 / k3)));
  const p3 = R(10, s3 - 10), r3 = s3 - p3;
  const v3 = s3 * k3 + b44advLech(20);
  const k4 = R(2, 5);
  const s4 = R(30, Math.min(180, Math.floor(999 / k4)));
  const p4 = R(10, s4 - 10), r4 = s4 - p4;
  const rows = [
    {t:`${a1} × ${b1}`, p:`${c1} × ${d1}`, l:a1 * b1, r:c1 * d1},
    {t:`${e2 * t2} : ${e2}`, p:`${v2}`, l:t2, r:v2},
    {t:`(${p3} + ${r3}) × ${k3}`, p:`${v3}`, l:s3 * k3, r:v3},
    {t:`${p4} × ${k4} + ${r4} × ${k4}`, p:`(${p4} + ${r4}) × ${k4}`, l:p4 * k4 + r4 * k4, r:s4 * k4}
  ];
  const L = ['a)', 'b)', 'c)', 'd)'];
  return q.done(`<div class="two-col"><div>${rows.map((x, i) =>
      `<div class="cmp-row"><b>${L[i]}</b><span class="side b44adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')
      }<span class="side b44adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Trong biểu thức có dấu ngoặc thì tính trong ngoặc trước ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map((x, i) => `${L[i]} ${x.l} và ${x.r}`).join(';  '));
},

/* 3. Bài toán ngược về đường gấp khúc, kết hợp trung điểm */
() => {
  const q = Q(3, '');
  const bag = 'ABCDEGHIKMNPQ'.split('').sort(() => Math.random() - .5);
  const nm = {A:bag[0], B:bag[1], C:bag[2], D:bag[3], M:bag[4]};
  let a = 2 * R(8, 40), b = R(15, 95), c = R(15, 95);
  for (let g = 0; g < 80; g++){
    a = 2 * R(8, 40); b = R(15, 95); c = R(15, 95);
    const mx = Math.max(a, b, c);
    if ([a, b, c].filter(v => v === mx).length === 1) break;
  }
  const L = a + b + c;
  const ten = [`${nm.A}${nm.B}`, `${nm.B}${nm.C}`, `${nm.C}${nm.D}`];
  const dai = [a, b, c];
  let iMax = 0;
  dai.forEach((v, i) => { if (v > dai[iMax]) iMax = i; });
  return q.done(`<p class="wordq">Đường gấp khúc ${nm.A}${nm.B}${nm.C}${nm.D} dài ${L} mm.
      Biết đoạn thẳng ${nm.A}${nm.B} dài ${a} mm, đoạn thẳng ${nm.B}${nm.C} dài ${b} mm.</p>`
    + b44advPath(nm, a, b, c)
    + `<div class="fill-line">Đoạn thẳng ${nm.C}${nm.D} dài ${q.num(c, b44advLen(c))} mm.</div>
       <div class="fill-line">${nm.M} là trung điểm của đoạn thẳng ${nm.A}${nm.B}.
         Đoạn thẳng ${nm.A}${nm.M} dài ${q.num(a / 2, b44advLen(a / 2))} mm.</div>
       <div class="fill-line">Trong ba đoạn thẳng trên, đoạn thẳng dài nhất là ${q.pick(ten[iMax], ten)}</div>
       <div class="hint-line">Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng của nó.
         Trung điểm chia đoạn thẳng thành hai phần bằng nhau.</div>`,
    `${a} + ${b} = ${a + b}; ${L} − ${a + b} = ${c} (mm).  ${a} : 2 = ${a / 2} (mm).  `
    + `Đoạn dài nhất là ${ten[iMax]} (${dai[iMax]} mm).`);
},

/* 4. Bài toán ba bước với đơn vị lít */
() => {
  const q = Q(4, '');
  const n = R(3, 6), a = pick([20, 25, 30, 50]), c = pick([5, 10, 15, 20]);
  const tong = n * a + c;
  const ban = 5 * R(2, Math.floor((tong - 20) / 5));
  const COLORS = ['#e0a03a', '#d68a2a', '#e8b45a', '#cf9a3a', '#e3a848', '#d99230'];
  const cans = Array.from({length: n}, (_, i) =>
    `<div>${b44advCan(COLORS[i % 6])}<span class="b44adv-cap">${a} l</span></div>`).join('');
  return q.done(`<p class="wordq">Một cửa hàng có ${n} thùng dầu, mỗi thùng đựng ${a} <i>l</i> dầu
      và một can đựng ${c} <i>l</i> dầu. Cửa hàng đã bán được ${ban} <i>l</i> dầu.</p>
    <div class="b44adv-jarrow">${cans}<div>${b44advCan('#8fc95a')}<span class="b44adv-cap">${c} l</span></div></div>
    <div class="bullet">${n} thùng dầu đựng ${q.num(n * a, b44advLen(n * a))} <i>l</i> dầu.</div>
    <div class="bullet">Lúc đầu cửa hàng có tất cả ${q.num(tong, b44advLen(tong))} <i>l</i> dầu.</div>
    <div class="bullet">Sau khi bán, cửa hàng còn lại ${q.num(tong - ban, b44advLen(tong - ban))} <i>l</i> dầu.</div>`,
    `${a} × ${n} = ${n * a} (l);  ${n * a} + ${c} = ${tong} (l);  ${tong} − ${ban} = ${tong - ban} (l).`);
},

/* 5. Bài toán về khối lượng: chia rồi nhân, so với 1 kg */
() => {
  const q = Q(5, '');
  const m = pick([50, 100, 150]);
  const ten = pick(['kẹo', 'bánh', 'đậu xanh']);
  return q.done(`<p class="wordq">Ba túi ${ten} giống nhau cân nặng ${3 * m} g.</p>
    <div class="bullet">Mỗi túi ${ten} cân nặng ${q.num(m, b44advLen(m))} g.</div>
    <div class="bullet">Năm túi ${ten} như thế cân nặng ${q.num(5 * m, b44advLen(5 * m))} g.</div>
    <div class="bullet">Năm túi ${ten} đó nhẹ hơn 1 kg là ${q.num(1000 - 5 * m, b44advLen(1000 - 5 * m))} g.</div>
    <div class="hint-line">1 kg = 1 000 g.</div>`,
    `${3 * m} : 3 = ${m} (g);  ${m} × 5 = ${5 * m} (g);  1 000 − ${5 * m} = ${1000 - 5 * m} (g).`);
},

/* 6. Bài toán ngược: tìm số qua hai phép tính liên tiếp */
() => {
  const q = Q(6, 'Tìm số thích hợp trong mỗi trường hợp sau.');
  const k1 = R(2, 5), m1 = R(10, 90);
  const x1 = R(21, Math.floor((999 - m1) / k1)), V1 = x1 * k1 + m1;
  const d2 = R(2, 7), m2 = R(10, 40);
  const V2 = R(10, Math.floor(999 / d2) - m2);
  const t2 = V2 + m2, x2 = d2 * t2;
  const g3 = R(2, 5), V3 = R(20, Math.floor(999 / g3));
  const m3 = R(10, V3 * g3 - 10), x3 = V3 * g3 - m3;
  return q.done(`<div class="bullet"><b>a)</b> Lấy một số nhân với ${k1} rồi cộng với ${m1}
      thì được ${V1}. Số đó là ${q.num(x1, b44advLen(x1))}</div>
    <div class="bullet"><b>b)</b> Lấy một số chia cho ${d2} rồi trừ đi ${m2}
      thì được ${V2}. Số đó là ${q.num(x2, b44advLen(x2))}</div>
    <div class="bullet"><b>c)</b> Lấy một số cộng với ${m3} rồi giảm đi ${g3} lần
      thì được ${V3}. Số đó là ${q.num(x3, b44advLen(x3))}</div>
    <div class="hint-line">Hãy làm ngược lại từ kết quả cuối cùng.</div>`,
    `a) ${V1} − ${m1} = ${x1 * k1}; ${x1 * k1} : ${k1} = ${x1}.  `
    + `b) ${V2} + ${m2} = ${t2}; ${t2} × ${d2} = ${x2}.  `
    + `c) ${V3} × ${g3} = ${V3 * g3}; ${V3 * g3} − ${m3} = ${x3}.`);
},
];
