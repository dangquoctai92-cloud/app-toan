/*CSS
.b61-list{display:flex;flex-wrap:wrap;gap:2px 28px;margin:6px 0}
.b61-list > div{min-width:250px;font-size:19px;font-weight:700;line-height:2}
.b61-let{color:#d63384;font-weight:800;margin-right:6px}
.b61-sub{font-weight:700;margin:9px 0 3px}
.b61-opts{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 24px;margin:6px 0;font-size:19px;font-weight:700}
.b61-opts b{color:#d63384;margin-right:5px}
.b61-bub{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:8px 0}
.b61-bub > div{flex:1 1 190px;max-width:250px;border:2.4px solid #9aa4b5;border-radius:16px;padding:8px 10px;text-align:center;font-weight:700;background:#fff}
.b61-bub .picker{flex-wrap:wrap;justify-content:center;margin:6px 0 0}
.b61-bub .pk{width:auto;min-width:34px;padding:0 9px;font-size:14px}
.b61-sat{width:100%;max-width:330px;height:auto;display:block;margin:4px auto}
CSS*/

/* ==================== BÀI 61: LÀM TRÒN SỐ ĐẾN HÀNG NGHÌN, HÀNG CHỤC NGHÌN
   (SGK tập 2 – tr.63, 64, 65)
   hoạt động tr.64 : bài 1a (làm tròn đến hàng nghìn), bài 1b (làm tròn đến hàng chục nghìn),
                     bài 2 (gia đình thu hoạch cà phê)
   luyện tập tr.64 : bài 1 (Chọn câu trả lời đúng – số dân của một huyện)
   luyện tập tr.65 : bài 2a (ba bạn nói về độ cao của vệ tinh), bài 2b (làm tròn đến hai hàng)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như trong SGK: 35 786 */
ART.b61sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* làm tròn n đến hàng u (u = 100, 1000, 10000) — chỉ dùng số nguyên nên luôn chính xác */
ART.b61round = (n, u) => { const r = n % u; return n - r + (r * 2 >= u ? u : 0); };

/* Trái Đất và vệ tinh */
ART.b61Sat = () => `<svg viewBox="0 0 320 150" class="b61-sat">
  <circle cx="58" cy="92" r="48" fill="#3aa0dd" stroke="#1e6ea3" stroke-width="2.6"/>
  <path d="M26 62q18 6 26 0t22 6-10 18-30 2-8-26z" fill="#5fbb46"/>
  <path d="M40 116q16-10 32-2t22-2" fill="none" stroke="#e8a33d" stroke-width="7"
    stroke-linecap="round" opacity=".85"/>
  <path d="M74 118q14 8 26 2" fill="none" stroke="#2b7fb5" stroke-width="3" stroke-linecap="round"/>
  <g transform="translate(212,44)">
    <rect x="-16" y="-13" width="32" height="26" rx="4" fill="#d9dde6" stroke="#5b6c85" stroke-width="2.4"/>
    <rect x="-58" y="-11" width="36" height="22" rx="3" fill="#7fb4e0" stroke="#3d6f9e" stroke-width="2.2"/>
    <rect x="22" y="-11" width="36" height="22" rx="3" fill="#7fb4e0" stroke="#3d6f9e" stroke-width="2.2"/>
    <path d="M-58 0h36M22 0h36" stroke="#3d6f9e" stroke-width="1.8"/>
    <path d="M0 13v14" stroke="#5b6c85" stroke-width="3" stroke-linecap="round"/>
    <circle cx="0" cy="31" r="6" fill="#f2c94c" stroke="#b98a1e" stroke-width="2"/>
  </g>
  <path d="M118 116q64-70 150-84" fill="none" stroke="#9aa4b5" stroke-width="2.4"
    stroke-dasharray="7 7" stroke-linecap="round"/>
</svg>`;

BANKS.b61 = [

/* ===== tr.64 – Bài 1a: Làm tròn các số đến hàng nghìn ===== */
() => {
  const q = Q(1, 'a) Làm tròn các số sau đến hàng nghìn.');
  const sp = ART.b61sp, rd = ART.b61round;
  const ns = [];
  for (let g = 0; g < 60 && ns.length < 2; g++){
    const v = R(1, 8) * 10000 + R(0, 9) * 1000 + R(1, 999);
    if (!ns.includes(v)) ns.push(v);
  }
  while (ns.length < 2) ns.push(21345 + ns.length * 1111);
  ns.push(R(1, 9) * 1000 + R(1, 999));            /* một số có bốn chữ số */
  const L = ['&bull;', '&bull;', '&bull;'];
  const html = noteBox('Khi làm tròn số đến hàng nghìn, ta so sánh chữ số hàng trăm với 5. '
      + 'Nếu chữ số hàng trăm bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.')
    + '<div class="b61-list">' + ns.map((v, i) =>
      `<div><span class="b61-let">${L[i]}</span>${sp(v)}
        <span class="op">&rarr;</span> ${q.num(rd(v, 1000))}</div>`).join('') + '</div>';
  return q.done(html, ns.map(v => {
    const t = Math.floor(v / 100) % 10;
    return `${sp(v)} có chữ số hàng trăm là ${t} nên làm tròn ${t < 5 ? 'xuống' : 'lên'}, `
      + `được ${sp(rd(v, 1000))}`;
  }).join(';  '));
},

/* ===== tr.64 – Bài 1b: Làm tròn các số đến hàng chục nghìn ===== */
() => {
  const q = Q(1, 'b) Làm tròn các số sau đến hàng chục nghìn.');
  const sp = ART.b61sp, rd = ART.b61round;
  const ns = [];
  for (let g = 0; g < 60 && ns.length < 2; g++){
    const v = R(1, 8) * 10000 + R(0, 9) * 1000 + R(1, 999);
    if (!ns.includes(v)) ns.push(v);
  }
  while (ns.length < 2) ns.push(52134 + ns.length * 1111);
  ns.push(R(1, 8) * 10000 + R(1, 9) * 1000);      /* một số tròn nghìn */
  const html = noteBox('Khi làm tròn số đến hàng chục nghìn, ta so sánh chữ số hàng nghìn với 5. '
      + 'Nếu chữ số hàng nghìn bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.')
    + '<div class="b61-list">' + ns.map(v =>
      `<div><span class="b61-let">&bull;</span>${sp(v)}
        <span class="op">&rarr;</span> ${q.num(rd(v, 10000))}</div>`).join('') + '</div>';
  return q.done(html, ns.map(v => {
    const n = Math.floor(v / 1000) % 10;
    return `${sp(v)} có chữ số hàng nghìn là ${n} nên làm tròn ${n < 5 ? 'xuống' : 'lên'}, `
      + `được ${sp(rd(v, 10000))}`;
  }).join(';  '));
},

/* ===== tr.64 – Bài 2: gia đình thu hoạch cà phê ===== */
() => {
  const q = Q(2, '');
  const sp = ART.b61sp, rd = ART.b61round;
  const n = R(10, 79) * 1000 + R(1, 999);
  const kq = rd(n, 1000);
  const t = Math.floor(n / 100) % 10;
  return q.done(`<p class="wordq">Một gia đình thu hoạch được ${sp(n)} kg cà phê.
      Hỏi nếu làm tròn số đến hàng nghìn, ta nói gia đình đó thu hoạch được khoảng
      bao nhiêu ki-lô-gam cà phê?</p>
    <div class="bullet">Gia đình đó thu hoạch được khoảng ${q.num(kq)} kg cà phê.</div>`,
    `${sp(n)} có chữ số hàng trăm là ${t} nên làm tròn ${t < 5 ? 'xuống' : 'lên'}, `
      + `được ${sp(kq)} kg.`);
},

/* ===== tr.64 – Bài 1 (luyện tập): Chọn câu trả lời đúng – số dân của một huyện ===== */
() => {
  const q = Q(1, 'Chọn câu trả lời đúng.');
  const sp = ART.b61sp;
  const d = R(1, 8);
  const r = pick([1, 2, 3, 4, 6, 7, 8, 9]);        /* bỏ 0 và 5 để bốn lựa chọn khác nhau */
  const n = d * 10000 + r * 1000 + R(1, 499);      /* hàng trăm < 5 */
  const dung = r < 5 ? d * 10000 : (d + 1) * 10000;
  const sai1 = r < 5 ? (d + 1) * 10000 : d * 10000;
  const sai2 = d * 10000 + r * 1000;               /* làm tròn đến hàng nghìn */
  const sai3 = d * 10000 + 5000;
  const vals = [dung, sai1, sai2, sai3].sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D'];
  const ok = L[vals.indexOf(dung)];
  const html = `<p class="wordq">Số dân của một huyện là ${sp(n)} người. Trong bài báo,
      cô phóng viên đã làm tròn số dân của huyện đó đến hàng chục nghìn.
      Hỏi số dân đã làm tròn đến hàng chục nghìn là số nào?</p>
    <div class="b61-opts">${vals.map((v, i) =>
      `<span><b>${L[i]}.</b>${sp(v)}</span>`).join('')}</div>
    <div class="fill-line">Đáp án: ${q.pick(ok, L)}</div>`;
  return q.done(html,
    `${sp(n)} có chữ số hàng nghìn là ${r} nên làm tròn ${r < 5 ? 'xuống' : 'lên'}, `
      + `được ${sp(dung)}. Vậy chọn ${ok}.`);
},

/* ===== tr.65 – Bài 2a: ba bạn nói về độ cao của vệ tinh ===== */
() => {
  const q = Q(2, 'a)');
  const sp = ART.b61sp;
  const a = R(1, 8), b = R(5, 8), c = R(5, 8), dv = R(5, 9), e = R(0, 9);
  const n = a * 10000 + b * 1000 + c * 100 + dv * 10 + e;
  const HANG = ['hàng trăm', 'hàng nghìn', 'hàng chục nghìn'];
  const items = [
    {v: a * 10000 + b * 1000 + (c + 1) * 100, h: HANG[0]},
    {v: a * 10000 + (b + 1) * 1000, h: HANG[1]},
    {v: (a + 1) * 10000, h: HANG[2]}
  ].sort(() => Math.random() - .5);
  const html = `<p class="wordq">Một vệ tinh bay ở độ cao cách mặt đất ${sp(n)} km.
      Mỗi bạn dưới đây đã làm tròn số chỉ độ cao đó đến hàng nào?</p>
    ${ART.b61Sat()}
    <div class="b61-bub">${items.map(it =>
      `<div>Vệ tinh cách mặt đất khoảng ${sp(it.v)} km.<br>${q.pick(it.h, HANG)}</div>`).join('')}</div>
    ${noteBox('Cả ba bạn đều nói đúng, chỉ là làm tròn đến các hàng khác nhau mà thôi!')}`;
  return q.done(html, items.map(it =>
    `${sp(n)} làm tròn đến ${it.h} được ${sp(it.v)}`).join(';  '));
},

/* ===== tr.65 – Bài 2b: làm tròn độ cao đến hàng nghìn, hàng chục nghìn ===== */
() => {
  const q = Q(2, 'b)');
  const sp = ART.b61sp, rd = ART.b61round;
  const n = R(1, 8) * 10000 + R(0, 9) * 1000 + R(1, 999);
  const kn = rd(n, 1000), kcn = rd(n, 10000);
  const t = Math.floor(n / 100) % 10, ng = Math.floor(n / 1000) % 10;
  const html = `<p class="wordq">Trường hợp vệ tinh bay ở độ cao cách mặt đất ${sp(n)} km.
      Khi làm tròn số chỉ độ cao đó đến hàng nghìn, hàng chục nghìn em được các số nào?</p>
    ${ART.b61Sat()}
    <div class="bullet">Làm tròn đến hàng nghìn: ${q.num(kn)} km.</div>
    <div class="bullet">Làm tròn đến hàng chục nghìn: ${q.num(kcn)} km.</div>`;
  return q.done(html,
    `Chữ số hàng trăm là ${t} nên làm tròn đến hàng nghìn được ${sp(kn)}; `
      + `chữ số hàng nghìn là ${ng} nên làm tròn đến hàng chục nghìn được ${sp(kcn)}.`);
},
];
