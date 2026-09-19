/* ==================== BÀI 30: MI-LI-MÉT (SGK tr.85, 86) ====================
   hoạt động tr.85 : bài 1 (đo đoạn thẳng trên thước – Số ?), bài 2 (Số ? – đổi đơn vị)
   hoạt động tr.86 : bài 3 (bạn nào dài hơn?)
   luyện tập tr.86 : bài 1 (tính với số đo mi-li-mét), bài 2 (Số ? – gấp, giảm số lần),
                     bài 3 (ốc sên đi học), bài 4 (cào cào tập nhảy)
========================================================================================= */

ART.b30Arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

/* thước kẻ 0–5 cm có vạch mi-li-mét, phía trên là đoạn thẳng dài "cm" xăng-ti-mét */
ART.b30Seg = (cm, p1, p2) => {
  const U = 52, X0 = 20, W = X0 * 2 + U * 5;
  let ticks = '';
  for (let i = 0; i <= 50; i++){
    const x = (X0 + i * U / 10).toFixed(1);
    const h = i % 10 === 0 ? 15 : (i % 5 === 0 ? 11 : 7);
    ticks += `M${x} 56v${h}`;
  }
  let nums = '';
  for (let i = 0; i <= 5; i++)
    nums += `<text x="${X0 + i * U}" y="88" text-anchor="middle" font-size="12" fill="#333">${i === 0 ? '0 cm' : i}</text>`;
  const x2 = X0 + cm * U;
  return `<svg viewBox="0 0 ${W} 98" class="b30-ruler">
    <rect x="6" y="52" width="${W - 12}" height="42" rx="4" fill="#e4e0d1" stroke="#c5bfab" stroke-width="1.4"/>
    <path d="${ticks}" stroke="#555" stroke-width="1" fill="none"/>${nums}
    <path d="M${X0} 32v20M${x2} 32v20" stroke="#999" stroke-width="1" stroke-dasharray="3 3" fill="none"/>
    <path d="M${X0} 32H${x2}" stroke="#222" stroke-width="2.6" fill="none"/>
    <circle cx="${X0}" cy="32" r="3.6"/><circle cx="${x2}" cy="32" r="3.6"/>
    <text x="${X0 - 10}" y="26" text-anchor="middle" font-size="15" font-weight="700">${p1}</text>
    <text x="${x2 + 12}" y="26" text-anchor="middle" font-size="15" font-weight="700">${p2}</text>
  </svg>`;
};

ART.b30Bug = k => {
  if (k === 'vesau') return `<svg viewBox="0 0 130 100" class="b30-bug">
    <ellipse cx="66" cy="56" rx="34" ry="19" fill="#e2703a" stroke="#a84c1e" stroke-width="2"/>
    <path d="M62 40q34-10 54 8-22 20-54 10z" fill="#f0a882" stroke="#a84c1e" stroke-width="1.8" opacity=".9"/>
    <path d="M62 44q30-4 48 10" fill="none" stroke="#a84c1e" stroke-width="1.2"/>
    <circle cx="34" cy="52" r="17" fill="#2f4a7a" stroke="#1d3054" stroke-width="2"/>
    <circle cx="26" cy="46" r="6" fill="#fff" stroke="#1d3054" stroke-width="1.6"/>
    <circle cx="42" cy="44" r="6" fill="#fff" stroke="#1d3054" stroke-width="1.6"/>
    <circle cx="26" cy="46" r="2.6" fill="#222"/><circle cx="42" cy="44" r="2.6" fill="#222"/>
    <path d="M22 34l-8-12M40 32l4-14" stroke="#1d3054" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M40 68l-8 16M60 72l-4 18M82 70l8 16" stroke="#a84c1e" stroke-width="2.8" stroke-linecap="round"/>
  </svg>`;
  return `<svg viewBox="0 0 130 100" class="b30-bug">
    <ellipse cx="92" cy="56" rx="22" ry="15" fill="#e08a3c" stroke="#a85e18" stroke-width="2"/>
    <ellipse cx="64" cy="54" rx="11" ry="9" fill="#e89a4c" stroke="#a85e18" stroke-width="2"/>
    <circle cx="42" cy="50" r="14" fill="#e08a3c" stroke="#a85e18" stroke-width="2"/>
    <circle cx="36" cy="46" r="2.6" fill="#333"/>
    <path d="M34 38l-8-12M48 36l6-13" stroke="#a85e18" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M58 62l-8 18M72 64l-2 18M86 66l8 16M96 62l14 12" stroke="#a85e18" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`;
};

ART.b30Snail = `<svg viewBox="0 0 300 120" class="b30-snail">
  <path d="M4 108q60-16 140-14t152 4v20H4z" fill="#8fbf6a" stroke="#5d8f3d" stroke-width="2"/>
  <path d="M30 106q54-30 130-26" fill="none" stroke="#c9a97a" stroke-width="16" stroke-linecap="round"/>
  <path d="M18 60q-8-40 26-44t34 26" fill="#7a5a3a" stroke="#4d3822" stroke-width="2"/>
  <rect x="34" y="42" width="16" height="22" rx="3" fill="#4a90c4" stroke="#2f6b96" stroke-width="1.6"/>
  <path d="M196 96q-18 0-24-8t8-12h22z" fill="#f0e2a8" stroke="#b8a45c" stroke-width="2"/>
  <circle cx="228" cy="72" r="22" fill="#7ec4a8" stroke="#3f8a6c" stroke-width="2.4"/>
  <path d="M228 72a12 12 0 1 1-8 -11" fill="none" stroke="#3f8a6c" stroke-width="2.4"/>
  <path d="M182 66q-6-8-2-14M190 64q-2-10 3-15" fill="none" stroke="#b8a45c" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="180" cy="50" r="2.6" fill="#333"/><circle cx="193" cy="48" r="2.6" fill="#333"/>
  <path d="M246 58h16v20h-16z" fill="#a9743c" stroke="#6f4a20" stroke-width="2"/>
</svg>`;

BANKS.b30 = [

/* ===== tr.85 – Bài 1: Số ? (đo đoạn thẳng bằng thước, ghi số đo theo mi-li-mét) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const bag = 'ABCDEGHIKMNPQ'.split('').sort(() => Math.random() - .5);
  const c1 = R(2, 4);
  const c2 = c1 === 4 ? R(2, 3) : c1 + 1;
  return q.done(`<div class="b30-two">
      <div class="b30-item"><div class="b30-lab">${q.num(c1 * 10)} mm</div>${ART.b30Seg(c1, bag[0], bag[1])}</div>
      <div class="b30-item"><div class="b30-lab">${q.num(c2 * 10)} mm</div>${ART.b30Seg(c2, bag[2], bag[3])}</div>
    </div>
    <div class="hint-line">Mỗi xăng-ti-mét trên thước được chia thành 10 phần bằng nhau, mỗi phần dài 1 mm.</div>`,
    `${bag[0]}${bag[1]} = ${c1} cm = ${c1 * 10} mm;  ${bag[2]}${bag[3]} = ${c2} cm = ${c2 * 10} mm`);
},

/* ===== tr.85 – Bài 2: Số ? (đổi đơn vị đo độ dài) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const x = R(3, 9), y = R(3, 9), z = x === y ? (y === 9 ? 3 : y + 1) : y;
  return q.done(`<div class="two-col">
      <div><div class="sub-lbl">a)</div>
        <div class="eq">1 cm = ${q.num(10)} mm</div>
        <div class="eq">1 m = ${q.num(1000)} mm</div></div>
      <div><div class="sub-lbl">b)</div>
        <div class="eq">10 mm = ${q.num(1, 1)} cm</div>
        <div class="eq">1 000 mm = ${q.num(1, 1)} m</div></div>
    </div>
    <div class="sub-lbl">c)</div>
    <div class="eq-list">
      <div class="eq">${x} cm = ${q.num(x * 10)} mm</div>
      <div class="eq">${z} cm = ${q.num(z * 10)} mm</div>
    </div>`,
    `1 cm = 10 mm; 1 m = 1 000 mm; ${x} cm = ${x * 10} mm; ${z} cm = ${z * 10} mm`);
},

/* ===== tr.86 – Bài 3: Bạn nào dài hơn? (ve sầu – kiến) ===== */
() => {
  const q = Q(3, 'Bạn nào dài hơn?');
  const a = R(2, 5), b = R(2, 9);
  return q.done(`<div class="b30-bugs">
      <div>${ART.b30Bug('vesau')}<em>Ve sầu: "Tớ có chiều dài là ${a} cm."</em></div>
      <div>${ART.b30Bug('kien')}<em>Kiến: "Tớ có chiều dài là ${b} mm."</em></div>
    </div>
    <div class="bullet">Ve sầu dài ${q.num(a * 10)} mm.</div>
    <div class="bullet">Kiến dài ${q.num(b)} mm.</div>
    <div class="fill-line">Bạn dài hơn là: ${q.pick('Ve sầu', ['Ve sầu', 'Kiến'])}</div>`,
    `${a} cm = ${a * 10} mm; ${a * 10} mm > ${b} mm nên ve sầu dài hơn.`);
},

/* ===== tr.86 – Luyện tập Bài 1: Tính (với số đo mi-li-mét) ===== */
() => {
  const q = Q(1, 'Tính.');
  const a1 = R(12, 60) * 10, b1 = R(5, 30) * 10;
  const a2 = R(20, 70), b2 = R(2, 9);
  const a3 = R(10, 25), k3 = R(2, 4);
  const a4 = R(30, 80) * 10, b4 = R(10, 25) * 10;
  const a5 = R(45, 99), b5 = R(10, 39);
  const k6 = R(2, 5), a6 = k6 * R(10, 30);
  const cell = t => `<div class="calc-cell">${t}</div>`;
  return q.done(`<div class="calc-grid">
      ${cell(`${a1} mm + ${b1} mm = ${q.num(a1 + b1)} mm`)}
      ${cell(`${a2} mm + ${b2} mm = ${q.num(a2 + b2)} mm`)}
      ${cell(`${a3} mm × ${k3} = ${q.num(a3 * k3)} mm`)}
      ${cell(`${a4} mm − ${b4} mm = ${q.num(a4 - b4)} mm`)}
      ${cell(`${a5} mm − ${b5} mm = ${q.num(a5 - b5)} mm`)}
      ${cell(`${a6} mm : ${k6} = ${q.num(a6 / k6)} mm`)}
    </div>`,
    `${a1} + ${b1} = ${a1 + b1};  ${a6} : ${k6} = ${a6 / k6}`);
},

/* ===== tr.86 – Luyện tập Bài 2: Số ? (gấp, giảm một số lần) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const k1 = R(2, 5), v1 = k1 * R(4, 25);
  const k2 = R(2, 6), v2 = k2 * R(5, 30);
  const k3 = R(2, 5), v3 = R(8, 24);
  const k4 = R(2, 5), v4 = R(8, 24);
  const rows = [
    {v: v1 + ' cm', op: 'giảm ' + k1 + ' lần', r: v1 / k1, u: 'cm'},
    {v: v2 + ' mm', op: 'giảm ' + k2 + ' lần', r: v2 / k2, u: 'mm'},
    {v: v3 + ' mm', op: 'gấp ' + k3 + ' lần', r: v3 * k3, u: 'mm'},
    {v: v4 + ' mm', op: 'gấp ' + k4 + ' lần', r: v4 * k4, u: 'mm'}
  ].sort(() => Math.random() - .5);
  const gi = R(0, 3);
  const html = rows.map((rw, i) => `<div class="b30-mrow">
      <span class="b30-mv">${rw.v}</span>${ART.b30Arrow(rw.op)}
      <span class="b30-mr">${i === gi ? rw.r : q.num(rw.r)} ${rw.u}</span></div>`).join('');
  return q.done(html + '<div class="hint-line">Một kết quả đã được điền sẵn làm mẫu.</div>',
    rows.map(rw => `${rw.v} ${rw.op} = ${rw.r} ${rw.u}`).join(';  '));
},

/* ===== tr.86 – Luyện tập Bài 3: ốc sên đi từ nhà đến trường ===== */
() => {
  const a = R(110, 400), b = R(150, 520), t = a + b;
  const q = Q(3, `Ốc sên đi từ nhà đến trường. Bạn ấy đã đi được ${a} mm. Quãng đường còn phải đi
    dài ${b} mm. Hỏi quãng đường ốc sên đi từ nhà đến trường dài bao nhiêu mi-li-mét?`);
  return q.done(ART.b30Snail +
    `<div class="fill-line">Quãng đường ốc sên đi từ nhà đến trường dài:</div>
     <div class="eq">${a} <span class="op">+</span> ${q.num(b)} = ${q.num(t)} (mm)</div>
     <div class="fill-line">Đáp số: ${q.num(t)} mm.</div>`,
    `${a} + ${b} = ${t} (mm)`);
},

/* ===== tr.86 – Luyện tập Bài 4: cào cào tập nhảy ===== */
() => {
  const a = R(8, 20), n = R(2, 4), t = a * n;
  const q = Q(4, `Cào cào tập nhảy mỗi ngày. Ngày đầu tiên cào cào nhảy xa được ${a} mm.
    Một tuần sau thì cào cào nhảy xa được gấp ${n} lần ngày đầu tiên.
    Hỏi khi đó cào cào nhảy xa được bao nhiêu mi-li-mét?`);
  return q.done(`<div class="b30-bugs"><div>${ART.b30Bug('kien')}<em>Cào cào tập nhảy</em></div></div>
    <div class="fill-line">Một tuần sau cào cào nhảy xa được:</div>
    <div class="eq">${a} <span class="op">×</span> ${q.num(n, 1)} = ${q.num(t)} (mm)</div>
    <div class="fill-line">Đáp số: ${q.num(t)} mm.</div>`,
    `${a} × ${n} = ${t} (mm)`);
},
];
