/*CSS
.b58-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:14px 30px;margin:10px 0}
.b58-div{display:inline-grid;grid-template-columns:auto auto;font-size:21px;font-weight:800;line-height:1.5}
.b58-a{grid-area:1/1;text-align:right;padding:0 10px 4px 0;white-space:nowrap}
.b58-b{grid-area:1/2;border-left:2.6px solid #444;border-bottom:2.6px solid #444;padding:0 30px 4px 10px}
.b58-c{grid-area:2/2;border-left:2.6px solid #444;padding:6px 10px 0 10px}
.b58-d{grid-area:2/1;text-align:right;padding:6px 10px 0 0;font-size:17px;font-weight:700;color:#d63384;white-space:nowrap}
.b58-lbl{font-weight:800;color:#d63384;margin-right:6px;font-size:18px}
.b58-side{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 18px}
.b58-side>div:first-child{flex:1 1 280px;min-width:240px}
.b58-team{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px 18px;margin:8px 0}
.b58-one{width:150px;text-align:center;font-weight:700;font-size:15px}
.b58-one em{font-style:normal;display:block;font-weight:800;color:#7a4bbd;font-size:18px;margin:2px 0}
.b58-art{width:96px;height:auto;display:block;margin:0 auto}
.b58-pins{display:flex;justify-content:center;gap:3px;margin-bottom:2px}
.b58-pins svg{width:13px;height:auto}
.b58-leaf{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 12px;margin:6px 0}
.b58-worm{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 14px;margin:6px 0}
.b58-tag{font-weight:800;font-size:19px;padding:3px 12px;border-radius:14px;background:#eaf6ff;border:2px solid #4a90c4}
CSS*/

/* ==================== BÀI 58: LUYỆN TẬP CHUNG
   (SGK tập 2, tr.51, 52, 53, 54, 55)
   luyện tập tr.51–52 : bài 1 (Đặt tính rồi tính), bài 2 (độ cao ba máy bay),
                        bài 3 (Số ? – tìm thừa số, tìm số bị chia),
                        bài 4 (hai con cà cuống và con tôm bơi đến cụm rong),
                        bài 5 (pin và ba rô-bốt)
   luyện tập tr.52–54 : bài 1 (Đặt tính rồi tính), bài 2 (Số ? – dây đèn khối lập phương),
                        bài 3 (mỗi chú sâu đi đường nào về chiếc lá),
                        bài 4 (người khổng lồ nào nâng được nhiều ki-lô-gam nhất)
   luyện tập tr.54–55 : bài 1 (Tính giá trị của biểu thức), bài 2 (tàu chở thùng hàng),
                        bài 3 (Số ? – vị quan lát đường bằng khối đá),
                        bài 4 (Số ? – tường thành hình vuông ABCD)
========================================================================================= */

/* viết số theo kiểu sách: 6 504 */
const NSP58 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* khung phép chia dạng cột */
ART.b58Frame = (a, b, quo, rem) => `<div class="b58-div">
  <span class="b58-a">${NSP58(a)}</span><span class="b58-b">${b}</span>
  <span class="b58-c">${quo}</span>
  <span class="b58-d">${rem || ''}</span></div>`;

/* khung phép nhân dạng cột */
ART.b58Mul = (a, b, res) => `<div class="vcalc"><span class="vop">×</span>
  <span class="vnums"><b>${NSP58(a)}</b><b>${b}</b></span><i class="vbar"></i>
  <span class="vres">${res}</span></div>`;

/* cục pin */
ART.b58Pin = () => `<svg viewBox="0 0 14 34"><rect x="4" y="0" width="6" height="3" rx="1" fill="#7c8794"/>
  <rect x="1" y="3" width="12" height="30" rx="2.5" fill="#d94b3f" stroke="#8f2b23" stroke-width="1.4"/>
  <path d="M7.5 10l-3 7h3l-1 6 4-8h-3z" fill="#ffe066"/></svg>`;

/* rô-bốt */
ART.b58Robot = col => `<svg viewBox="0 0 90 100" class="b58-art">
  <rect x="20" y="16" width="50" height="42" rx="8" fill="${col}" stroke="#3b4453" stroke-width="2.4"/>
  <circle cx="36" cy="34" r="7" fill="#fff" stroke="#3b4453" stroke-width="2"/>
  <circle cx="54" cy="34" r="7" fill="#fff" stroke="#3b4453" stroke-width="2"/>
  <circle cx="36" cy="35" r="3" fill="#1b1b2b"/><circle cx="54" cy="35" r="3" fill="#1b1b2b"/>
  <path d="M34 48h22" stroke="#3b4453" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M45 16V8" stroke="#3b4453" stroke-width="2.4"/><circle cx="45" cy="6" r="3.4" fill="#f2a93b"/>
  <rect x="14" y="60" width="62" height="24" rx="6" fill="#e8ecf2" stroke="#3b4453" stroke-width="2.4"/>
  <circle cx="27" cy="88" r="8" fill="#9aa4b2" stroke="#3b4453" stroke-width="2"/>
  <circle cx="45" cy="88" r="8" fill="#9aa4b2" stroke="#3b4453" stroke-width="2"/>
  <circle cx="63" cy="88" r="8" fill="#9aa4b2" stroke="#3b4453" stroke-width="2"/></svg>`;

/* người khổng lồ nâng vật */
ART.b58Giant = col => `<svg viewBox="0 0 90 110" class="b58-art">
  <rect x="18" y="6" width="54" height="14" rx="4" fill="#b9c2d0" stroke="#5d6672" stroke-width="2"/>
  <path d="M28 44L20 22M62 44l8-22" stroke="#f0c39a" stroke-width="8" stroke-linecap="round"/>
  <circle cx="45" cy="42" r="13" fill="#f7d3ae" stroke="#c99a6e" stroke-width="2"/>
  <circle cx="40" cy="41" r="1.8" fill="#1b1b2b"/><circle cx="50" cy="41" r="1.8" fill="#1b1b2b"/>
  <path d="M40 48q5 4 10 0" stroke="#1b1b2b" stroke-width="1.8" fill="none"/>
  <path d="M30 58q15-8 30 0l4 24H26z" fill="${col}" stroke="#8a5a3b" stroke-width="2"/>
  <path d="M32 82l-6 22M58 82l6 22" stroke="#f0c39a" stroke-width="8" stroke-linecap="round"/></svg>`;

/* chú sâu mang phép tính */
ART.b58Worm = col => `<svg viewBox="0 0 96 56" class="b58-art">
  <circle cx="24" cy="34" r="13" fill="${col}" stroke="#3b4453" stroke-width="2"/>
  <circle cx="46" cy="36" r="11" fill="${col}" stroke="#3b4453" stroke-width="2"/>
  <circle cx="66" cy="38" r="9" fill="${col}" stroke="#3b4453" stroke-width="2"/>
  <circle cx="82" cy="40" r="7" fill="${col}" stroke="#3b4453" stroke-width="2"/>
  <circle cx="20" cy="31" r="4" fill="#fff" stroke="#3b4453" stroke-width="1.6"/>
  <circle cx="30" cy="31" r="4" fill="#fff" stroke="#3b4453" stroke-width="1.6"/>
  <circle cx="20" cy="31" r="1.8" fill="#1b1b2b"/><circle cx="30" cy="31" r="1.8" fill="#1b1b2b"/>
  <path d="M18 21l-4-10M32 21l4-10" stroke="#3b4453" stroke-width="2"/></svg>`;

/* ngôi nhà dạng khối lập phương */
ART.b58Cube = () => `<svg viewBox="0 0 130 120" class="b58-art" style="width:130px">
  <path d="M20 40h70v66H20z" fill="#bfe3ea" stroke="#3b7c8a" stroke-width="2.4"/>
  <path d="M20 40l22-22h70L90 40z" fill="#8fd0dc" stroke="#3b7c8a" stroke-width="2.4"/>
  <path d="M90 40l22-22v66L90 106z" fill="#6fbdcb" stroke="#3b7c8a" stroke-width="2.4"/>
  <rect x="32" y="52" width="16" height="16" fill="#fff" stroke="#3b7c8a" stroke-width="1.8"/>
  <rect x="62" y="52" width="16" height="16" fill="#fff" stroke="#3b7c8a" stroke-width="1.8"/>
  <rect x="46" y="78" width="18" height="28" fill="#fff" stroke="#3b7c8a" stroke-width="1.8"/></svg>`;

/* khu đất hình vuông ABCD có trung điểm I của cạnh AB */
ART.b58Square = () => `<svg viewBox="0 0 150 150" class="b58-art" style="width:150px">
  <rect x="26" y="30" width="98" height="98" fill="none" stroke="#1b1b2b" stroke-width="3"/>
  <circle cx="26" cy="30" r="3.6" fill="#1b1b2b"/><circle cx="124" cy="30" r="3.6" fill="#1b1b2b"/>
  <circle cx="26" cy="128" r="3.6" fill="#1b1b2b"/><circle cx="124" cy="128" r="3.6" fill="#1b1b2b"/>
  <circle cx="75" cy="30" r="3.6" fill="#1b1b2b"/>
  <text x="16" y="22" font-size="15" font-weight="700">A</text>
  <text x="120" y="22" font-size="15" font-weight="700">B</text>
  <text x="120" y="145" font-size="15" font-weight="700">C</text>
  <text x="16" y="145" font-size="15" font-weight="700">D</text>
  <text x="70" y="22" font-size="15" font-weight="700">I</text></svg>`;

BANKS.b58 = [

/* ===== tr.51 – Luyện tập, Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const m1b = R(2, 6), m1a = R(1002, Math.floor(9999 / m1b));
  const m2b = R(5, 9), m2a = R(1002, Math.floor(9999 / m2b));
  const d1b = R(2, 9), d1t = R(Math.ceil(1000 / d1b), Math.floor(9999 / d1b));
  const d2b = R(2, 9), d2t = R(Math.ceil(1000 / d2b), Math.floor(9999 / d2b));
  const all = [
    {k: 'm', a: m1a, b: m1b, r: m1a * m1b},
    {k: 'd', a: d1t * d1b, b: d1b, r: d1t},
    {k: 'm', a: m2a, b: m2b, r: m2a * m2b},
    {k: 'd', a: d2t * d2b, b: d2b, r: d2t}
  ];
  const line = it => `<div class="eq">${NSP58(it.a)}
    <span class="op">${it.k === 'm' ? '×' : ':'}</span> ${it.b}</div>`;
  const frame = it => it.k === 'm'
    ? ART.b58Mul(it.a, it.b, q.num(it.r))
    : ART.b58Frame(it.a, it.b, q.num(it.r));
  return q.done(`<div class="eq-list">${all.map(line).join('')}</div>
      <div class="b58-row">${all.map(frame).join('')}</div>`,
    all.map(x => `${NSP58(x.a)} ${x.k === 'm' ? '×' : ':'} ${x.b} = ${NSP58(x.r)}`).join(';  '));
},

/* ===== tr.51 – Luyện tập, Bài 2: độ cao của ba máy bay ===== */
() => {
  const q = Q(2, '');
  const C = R(200, 1600), B = C * 3, A = B * 2;
  return q.done(`<p class="wordq">Máy bay A đang bay ở độ cao ${NSP58(A)} m.
      Máy bay A đang bay ở độ cao gấp đôi độ cao máy bay B. Máy bay B đang bay ở độ cao
      gấp 3 lần độ cao máy bay C. Hỏi máy bay C đang bay ở độ cao bao nhiêu mét?</p>
    <div class="bullet">Máy bay B đang bay ở độ cao ${q.num(B)} m.</div>
    <div class="bullet">Máy bay C đang bay ở độ cao ${q.num(C)} m.</div>`,
    `${NSP58(A)} : 2 = ${NSP58(B)} (m);  ${NSP58(B)} : 3 = ${NSP58(C)} (m)`);
},

/* ===== tr.51 – Luyện tập, Bài 3: Số ? (tìm thừa số, tìm số bị chia) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const ba = R(2, 9), ta = R(Math.ceil(1000 / ba), Math.floor(9999 / ba));
  const bb = R(2, 9), tb = R(Math.ceil(1000 / bb), Math.floor(9999 / bb));
  return q.done(`<div class="two-col">
      <div class="eq"><span class="b58-lbl">a)</span>${q.num(ta)}
        <span class="op">×</span> ${ba} <span class="op">=</span> ${NSP58(ta * ba)}</div>
      <div class="eq"><span class="b58-lbl">b)</span>${q.num(tb * bb)}
        <span class="op">:</span> ${bb} <span class="op">=</span> ${NSP58(tb)}</div></div>`,
    `a) ${NSP58(ta * ba)} : ${ba} = ${NSP58(ta)};  b) ${NSP58(tb)} × ${bb} = ${NSP58(tb * bb)}`);
},

/* ===== tr.52 – Luyện tập, Bài 4: hai con cà cuống và con tôm ===== */
() => {
  const q = Q(4, '');
  const sA = R(60, 190) * 5;
  let sB = R(600, 999);
  if (sB * 3 === sA * 4) sB += 1;
  const dA = sA * 4, dB = sB * 3;
  const shorter = dA < dB ? 'A' : 'B';
  const tom = dA / 5;
  return q.done(`<p class="wordq">a) Hai con cà cuống A, B và tôm cùng bơi đến chỗ cụm rong.
      Cà cuống A bơi theo đường gấp khúc gồm 4 đoạn bằng nhau, mỗi đoạn dài ${NSP58(sA)} cm.
      Cà cuống B bơi theo đường gấp khúc gồm 3 đoạn bằng nhau, mỗi đoạn dài ${NSP58(sB)} cm.
      Hỏi quãng đường bơi của cà cuống nào ngắn hơn?</p>
    <div class="bullet">Cà cuống A bơi quãng đường dài ${q.num(dA)} cm.</div>
    <div class="bullet">Cà cuống B bơi quãng đường dài ${q.num(dB)} cm.</div>
    <div class="fill-line">Quãng đường bơi của cà cuống ${q.pick(shorter, ['A', 'B'])} ngắn hơn.</div>
    <p class="wordq">b) <span class="tag">Số</span> ? Quãng đường bơi của tôm là đường gấp khúc
      gồm 5 đoạn dài bằng nhau. Biết quãng đường tôm bơi dài bằng quãng đường bơi của cà cuống A.</p>
    <div class="bullet">Mỗi đoạn của đường gấp khúc đó dài ${q.num(tom)} cm.</div>`,
    `${NSP58(sA)} × 4 = ${NSP58(dA)} (cm);  ${NSP58(sB)} × 3 = ${NSP58(dB)} (cm);  `
      + `${NSP58(dA)} : 5 = ${NSP58(tom)} (cm)`);
},

/* ===== tr.52 – Luyện tập, Bài 5: pin và ba rô-bốt ===== */
() => {
  const q = Q(5, '');
  const soPin = R(4, 9), moiPin = R(9, 30) * 10, tong = soPin * moiPin;
  const than = R(15, 30) * 100;
  const cnt = [3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 3);
  const L = ['A', 'B', 'C'];
  const COL = ['#7fd0d8', '#f0a35e', '#79b6f0'];
  const min = Math.min.apply(null, cnt);
  const idx = cnt.indexOf(min);
  const pins = n => '<div class="b58-pins">' + Array.from({length: n}, () => ART.b58Pin()).join('') + '</div>';
  const team = '<div class="b58-team">' + cnt.map((n, i) =>
    `<div class="b58-one">${pins(n)}${ART.b58Robot(COL[i])}<em>${L[i]}</em>lắp ${n} cục pin</div>`).join('')
    + '</div>';
  return q.done(`<p class="wordq">Biết ${soPin} cục pin như nhau nặng ${NSP58(tong)} g.
      Mỗi rô-bốt chưa lắp pin có cân nặng ${NSP58(than)} g.</p>${team}
    <div class="bullet">a) Mỗi cục pin cân nặng ${q.num(moiPin)} g.</div>
    <div class="bullet">b) Rô-bốt nhẹ nhất là rô-bốt ${q.pick(L[idx], L)}
      và cân nặng ${q.num(than + min * moiPin)} g.</div>`,
    `${NSP58(tong)} : ${soPin} = ${moiPin} (g);  rô-bốt ${L[idx]} lắp ít pin nhất: `
      + `${NSP58(than)} + ${moiPin} × ${min} = ${NSP58(than + min * moiPin)} (g)`);
},

/* ===== tr.52 – Luyện tập (tiếp), Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const db = R(3, 9), dr = R(1, db - 1);
  const dt = R(Math.ceil((1000 - dr) / db), Math.floor((9999 - dr) / db));
  const d2b = R(2, 9), d2t = R(Math.ceil(1000 / d2b), Math.floor(9999 / d2b));
  const m1b = R(2, 8), m1a = R(1002, Math.floor(9999 / m1b));
  const m2b = R(2, 9), m2a = R(102, Math.min(999, Math.floor(9999 / m2b)));
  const all = [
    {k: 'd', a: dt * db + dr, b: db, r: dt, du: dr},
    {k: 'm', a: m1a, b: m1b, r: m1a * m1b, du: 0},
    {k: 'd', a: d2t * d2b, b: d2b, r: d2t, du: 0},
    {k: 'm', a: m2a, b: m2b, r: m2a * m2b, du: 0}
  ];
  const line = it => `<div class="eq">${NSP58(it.a)}
    <span class="op">${it.k === 'm' ? '×' : ':'}</span> ${it.b}</div>`;
  const frame = it => it.k === 'm'
    ? ART.b58Mul(it.a, it.b, q.num(it.r))
    : ART.b58Frame(it.a, it.b, q.num(it.r), it.du ? `(dư ${q.num(it.du, 1)})` : '');
  return q.done(`<div class="eq-list">${all.map(line).join('')}</div>
      <div class="b58-row">${all.map(frame).join('')}</div>`,
    all.map(x => `${NSP58(x.a)} ${x.k === 'm' ? '×' : ':'} ${x.b} = ${NSP58(x.r)}`
      + (x.du ? ` (dư ${x.du})` : '')).join(';  '));
},

/* ===== tr.53 – Luyện tập (tiếp), Bài 2: Số ? – dây đèn trên khối lập phương ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const day = R(30, 95) * 10;
  return q.done(`<div class="b58-side">
      <div><p class="wordq">Ở khu vui chơi, bác Nam muốn gắn các dây đèn dọc theo mỗi cạnh
        của ngôi nhà dạng khối lập phương, trừ những cạnh sát mặt đất.
        Mỗi cạnh cần gắn một dây đèn dài ${NSP58(day)} cm.</p></div>
      <div>${ART.b58Cube()}</div></div>
    <div class="bullet">a) Bác Nam cần gắn tất cả ${q.num(8, 1)} dây đèn.</div>
    <div class="bullet">b) Tổng độ dài các dây đèn đó là ${q.num(8 * day)} xăng-ti-mét.</div>`,
    `Khối lập phương có 12 cạnh, trừ 4 cạnh sát mặt đất còn 8 cạnh: 12 − 4 = 8 (dây);  `
      + `${NSP58(day)} × 8 = ${NSP58(8 * day)} (cm)`);
},

/* ===== tr.53 – Luyện tập (tiếp), Bài 3: mỗi chú sâu về chiếc lá nào ===== */
() => {
  const q = Q(3, 'Mỗi chú sâu sẽ đi theo đường nào để đến chiếc lá là ngôi nhà của mình? '
    + 'Biết rằng sâu chỉ bò đến chiếc lá ghi kết quả của phép tính trên mình chú sâu đó.');
  const b = R(2, 9);
  const t = R(Math.max(100, Math.ceil(1000 / b)), Math.floor(9990 / b));
  const r = R(1, b - 1);
  const tich = t * b, bichia = t * b + r;
  const laA = NSP58(tich);
  const laB = NSP58(t);
  const laC = `${NSP58(t)} (dư ${r})`;
  const laD = NSP58(bichia);
  const opts = [laA, laB, laC, laD];
  return q.done(`<div class="b58-worm">${ART.b58Worm('#7fd0e8')}
      <span class="b58-tag">${NSP58(t)} × ${b}</span></div>
    <div class="fill-line">Sâu xanh về chiếc lá ghi ${q.pick(laA, opts)}</div>
    <div class="b58-worm">${ART.b58Worm('#f08a6e')}
      <span class="b58-tag">${NSP58(bichia)} : ${b}</span></div>
    <div class="fill-line">Sâu đỏ về chiếc lá ghi ${q.pick(laC, opts)}</div>`,
    `${NSP58(t)} × ${b} = ${NSP58(tich)};  ${NSP58(bichia)} : ${b} = ${NSP58(t)} (dư ${r})`);
},

/* ===== tr.53 – Luyện tập (tiếp), Bài 4: người khổng lồ nào nâng nhiều ki-lô-gam nhất ===== */
() => {
  const q = Q(4, 'Người khổng lồ nào nâng được nhiều ki-lô-gam nhất?');
  const da = R(2000, 2990), cho = R(15, 35), ngua = R(38, 52) * 10, voi = R(1100, 1400);
  const soNgua = R(2, 3);
  const loads = [
    {t: `${soNgua} con ngựa`, w: soNgua * ngua, e: `${ngua} × ${soNgua} = ${NSP58(soNgua * ngua)}`},
    {t: '1 con voi và 1 con chó', w: voi + cho, e: `${NSP58(voi)} + ${cho} = ${NSP58(voi + cho)}`},
    {t: '1 khối đá', w: da, e: `${NSP58(da)}`}
  ];
  const ord = [0, 1, 2].sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C'];
  const COL = ['#e0714a', '#e8b13c', '#7a6fd0'];
  const items = ord.map(i => loads[i]);
  const best = L[items.indexOf(items.reduce((x, y) => x.w >= y.w ? x : y))];
  const team = '<div class="b58-team">' + items.map((it, i) =>
    `<div class="b58-one">${ART.b58Giant(COL[i])}<em>${L[i]}</em>${it.t}</div>`).join('') + '</div>';
  return q.done(`<div class="hint-line">Mỗi con ngựa nặng ${ngua} kg, mỗi con chó nặng ${cho} kg,
      mỗi con voi nặng ${NSP58(voi)} kg, khối đá nặng ${NSP58(da)} kg.</div>${team}
    <div class="bullet">Người khổng lồ A nâng được ${q.num(items[0].w)} kg.</div>
    <div class="bullet">Người khổng lồ B nâng được ${q.num(items[1].w)} kg.</div>
    <div class="bullet">Người khổng lồ C nâng được ${q.num(items[2].w)} kg.</div>
    <div class="fill-line">Người khổng lồ nâng được nhiều ki-lô-gam nhất là
      ${q.pick(best, L)}</div>`,
    items.map((it, i) => `${L[i]}: ${it.e}`).join(';  ') + `. Nhiều nhất là ${best}.`);
},

/* ===== tr.54 – Luyện tập (tiếp), Bài 1: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức:');
  /* a) (X + Y) : k */
  const ka = R(2, 9);
  const sa = R(Math.ceil(2000 / ka), Math.floor(9999 / ka)) * ka;
  const xa = R(1, Math.max(1, Math.min(7, Math.floor((sa - 500) / 1000)))) * 1000;
  const ya = sa - xa;
  /* b) (X + Y) × k */
  const kb = R(2, 9);
  const sb = R(Math.max(200, Math.ceil(1000 / kb)), Math.floor(9999 / kb));
  const xb = R(100, Math.max(100, sb - 100)), yb = sb - xb;
  /* c) X : (m + n) */
  const mc = R(1, 5), nc = R(1, 9 - mc), dc = mc + nc;
  const tc = R(Math.ceil(1000 / dc), Math.floor(9999 / dc)), xc = tc * dc;
  /* d) X × (m − n) */
  const nd = R(1, 4), dd = R(2, 9 - nd), md = nd + dd;
  const xd = R(102, Math.min(999, Math.floor(9999 / dd)));
  const L = ['a)', 'b)', 'c)', 'd)'];
  const lines = [
    `(${NSP58(xa)} <span class="op">+</span> ${NSP58(ya)}) <span class="op">:</span> ${ka}
      <span class="op">=</span> ${q.num(sa / ka)}`,
    `(${NSP58(xb)} <span class="op">+</span> ${NSP58(yb)}) <span class="op">×</span> ${kb}
      <span class="op">=</span> ${q.num(sb * kb)}`,
    `${NSP58(xc)} <span class="op">:</span> (${mc} <span class="op">+</span> ${nc})
      <span class="op">=</span> ${q.num(tc)}`,
    `${NSP58(xd)} <span class="op">×</span> (${md} <span class="op">−</span> ${nd})
      <span class="op">=</span> ${q.num(xd * dd)}`
  ];
  return q.done('<div class="eq-list">' + lines.map((s, i) =>
      `<div class="eq"><span class="b58-lbl">${L[i]}</span>${s}</div>`).join('') + '</div>',
    `a) ${NSP58(sa)} : ${ka} = ${NSP58(sa / ka)};  b) ${NSP58(sb)} × ${kb} = ${NSP58(sb * kb)};  `
      + `c) ${NSP58(xc)} : ${dc} = ${NSP58(tc)};  d) ${NSP58(xd)} × ${dd} = ${NSP58(xd * dd)}`);
},

/* ===== tr.54 – Luyện tập (tiếp), Bài 2: tàu chở thùng hàng ===== */
() => {
  const q = Q(2, '');
  const lan = R(2, 5);
  const conLai = R(Math.ceil(1000 / lan), Math.floor(9999 / lan));
  const tong = conLai * lan;
  return q.done(`<p class="wordq">Một tàu chở ${NSP58(tong)} thùng hàng. Người ta dỡ xuống một số
      thùng hàng thì số thùng hàng còn lại bằng số thùng hàng ban đầu giảm đi ${lan} lần.
      Hỏi trên tàu còn lại bao nhiêu thùng hàng?</p>
    <div class="bullet">Trên tàu còn lại ${q.num(conLai)} thùng hàng.</div>`,
    `${NSP58(tong)} : ${lan} = ${NSP58(conLai)} (thùng hàng)`);
},

/* ===== tr.54 – Luyện tập (tiếp), Bài 3: Số ? – vị quan lát đường ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const dai = R(2, 9);
  const khoi = R(Math.ceil(1000 / dai), Math.floor(9999 / dai));
  const duong = khoi * dai;
  return q.done(`<p class="wordq">Một vị quan dùng những khối đá giống nhau dạng khối hộp chữ nhật
      để lát một con đường dài ${NSP58(duong)} m. Hình chữ nhật ở mặt trên mỗi khối đá đó
      có chiều dài ${dai} m.</p>
    <div class="bullet">Vị quan ấy đã dùng ${q.num(khoi)} khối đá.</div>`,
    `${NSP58(duong)} : ${dai} = ${NSP58(khoi)} (khối đá)`);
},

/* ===== tr.55 – Luyện tập (tiếp), Bài 4: Số ? – tường thành hình vuông ABCD ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const nua = R(500, 1240);
  const canh = nua * 2;
  return q.done(`<div class="b58-side">
      <div><p class="wordq">Người ta xây một bức tường thành bao quanh một khu đất có dạng
        hình vuông ABCD. Mỗi cạnh dài ${NSP58(canh)} bước chân.</p>
        <div class="bullet">a) Bức tường thành dài ${q.num(canh * 4)} bước chân.</div>
        <div class="bullet">b) Người ta xây một chòi canh gác ở trung điểm I của cạnh AB.
          Đoạn AI dài ${q.num(nua)} bước chân.</div></div>
      <div>${ART.b58Square()}</div></div>`,
    `a) ${NSP58(canh)} × 4 = ${NSP58(canh * 4)} (bước chân);  `
      + `b) ${NSP58(canh)} : 2 = ${NSP58(nua)} (bước chân)`);
},
];
