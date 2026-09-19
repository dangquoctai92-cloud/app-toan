/*CSS
.b76-let{color:#d63384;font-weight:800;margin-right:6px}
.b76-sub{font-weight:700;margin:9px 0 3px;line-height:1.5;text-align:left}
.b76-ask{margin:8px 0 2px;font-weight:700;color:#d63384;text-align:left}
.b76-line{font-size:17px;font-weight:700;line-height:2.3;text-align:left;margin:5px 0}
.b76-line .qin{margin:0 3px;vertical-align:middle;height:34px;font-size:16px;min-width:64px}
.b76-wide .picker{flex-wrap:wrap;justify-content:flex-start;margin:4px 0 0}
.b76-wide .pk{width:auto;min-width:34px;padding:0 10px;font-size:13.5px;height:32px}
.b76-banner{display:flex;align-items:center;justify-content:center;gap:10px;margin:6px 0 4px;flex-wrap:wrap}
.b76-nums{background:#fbd7e4;border-radius:12px;padding:10px 20px;font-size:19px;font-weight:800;
  color:#3a3550;text-align:center;line-height:1.7}
.b76-banner .art-sm{width:52px;height:auto}
.b76-read{border:2.4px solid #f0a027;border-radius:12px;background:#fffdf5;padding:7px 12px;margin:8px 0;text-align:left}
.b76-read div{font-size:14.5px;font-weight:700;line-height:1.75;color:#4a4460}
.b76-read i{font-style:normal;color:#d63384;font-weight:800;margin-right:6px}
.b76-cmp{display:flex;flex-wrap:wrap;gap:2px 30px;justify-content:center;margin-top:6px}
.b76-cmp > div{min-width:214px}
.b76-cmp .cmp-row{justify-content:center;font-size:19px}
.b76-cmp .cmp-row .side{min-width:88px}
.b76-fish{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin:8px 0}
.b76-fish > div{flex:1 1 172px;max-width:236px}
.b76-fbox{background:#57cdf5;border-radius:20px;padding:5px}
.b76-fbox svg{width:100%;height:auto;display:block}
.b76-fcap{font-size:13.5px;font-weight:700;color:#0d4a63;margin-top:3px;line-height:1.35;text-align:center}
.b76-seals{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b76-seals > div{flex:1 1 172px;max-width:238px;border:2.4px solid #9aa4b5;border-radius:14px;
  background:#f4fbff;padding:5px;text-align:center}
.b76-seals svg{width:100%;height:auto;display:block}
.b76-sexp{font-size:14.5px;font-weight:800;color:#26324a;line-height:1.3}
.b76-slet{font-size:17px;font-weight:800;color:#d63384;line-height:1.2}
.b76-balls{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:8px 0}
.b76-ball{width:92px;height:92px;border-radius:50%;background:#fdf7c8;border:2.6px solid #ddc95e;
  display:grid;place-items:center;font-size:16.5px;font-weight:800;color:#4a4460}
.b76-eq{font-size:19px;font-weight:800;margin:9px 0;text-align:center;line-height:2.1}
.b76-eq .qin{height:38px;font-size:19px}
.b76-say{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b76-say > div{flex:1 1 210px;max-width:290px;border:2.4px solid #9aa4b5;border-radius:16px;
  background:#fff;padding:8px 12px;font-size:14.5px;font-weight:700;line-height:1.5;
  color:#26324a;font-style:italic;text-align:left}
CSS*/

/* ==================== BÀI 76: ÔN TẬP CÁC SỐ TRONG PHẠM VI 10 000, 100 000
   (SGK tập 2 – tr.111, 112, 113, 114)
   luyện tập 1 (tr.111–112) : bài 1 (đọc các số),
                              bài 2 (Số ? – dãy số đếm thêm 1, thêm 10, thêm 100),
                              bài 3 (>; <; = ?),
                              bài 4 (con cá nào nặng nhất, con cá nào nhẹ nhất),
                              bài 5 (bác Ba Phi – số con vịt ở trang trại)
   luyện tập 2 (tr.113–114) : bài 1 (số khẩu trang của bốn công ty),
                              bài 2 (viết mỗi số thành tổng theo mẫu),
                              bài 3 (chọn số là giá trị của mỗi biểu thức – hải cẩu),
                              bài 4 (Số ? – tìm số hạng còn thiếu trong tổng),
                              bài 5 (Nam tìm số học sinh của trường)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như SGK: 35 760 */
const SP76 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b76Mix = a => a.slice().sort(() => Math.random() - .5);
const CS76 = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

/* ---- đọc số có hai chữ số (0 – 99) ---- */
function b76Hai(n){
  if (n < 10) return CS76[n];
  const c = Math.floor(n / 10), d = n % 10;
  if (c === 1) return 'mười' + (d === 0 ? '' : d === 5 ? ' lăm' : ' ' + CS76[d]);
  const s = CS76[c] + ' mươi';
  if (d === 0) return s;
  if (d === 1) return s + ' mốt';
  if (d === 4) return s + ' tư';
  if (d === 5) return s + ' lăm';
  return s + ' ' + CS76[d];
}

/* ---- đọc nhóm ba chữ số; du = true thì đọc đủ "không trăm", "linh" ---- */
function b76Ba(n, du){
  const t = Math.floor(n / 100), r = n % 100;
  if (t === 0){
    if (!du) return b76Hai(r);
    if (r === 0) return '';
    return r < 10 ? 'không trăm linh ' + CS76[r] : 'không trăm ' + b76Hai(r);
  }
  const s = CS76[t] + ' trăm';
  if (r === 0) return s;
  if (r < 10) return s + ' linh ' + CS76[r];
  return s + ' ' + b76Hai(r);
}

/* ---- đọc số trong phạm vi 100 000 (readNum của app chỉ đúng với số ≤ 1 000) ---- */
function b76Doc(n){
  if (n < 1000) return b76Ba(n, false);
  const ng = Math.floor(n / 1000), du = n % 1000;
  const s = b76Hai(ng) + ' nghìn';
  if (du === 0) return s;
  const t = b76Ba(du, true);
  return t ? s + ' ' + t : s;
}

/* ---- tách một số thành tổng các trăm nghìn, nghìn, trăm, chục, đơn vị (bỏ chữ số 0) ---- */
function b76Tach(n){
  const s = String(n), out = [];
  let p = 1;
  for (let i = s.length - 1; i >= 0; i--){
    if (+s[i]) out.unshift(+s[i] * p);
    p *= 10;
  }
  return out;
}

/* ---- tranh các loài cá ---- */
ART.b76Fish = kind => {
  const mat = (x, y) => `<circle cx="${x}" cy="${y}" r="5.2" fill="#fff" stroke="#12324a"
    stroke-width="1.6"/><circle cx="${x + 1.2}" cy="${y}" r="2.4" fill="#12324a"/>`;
  if (kind === 'voi') return `<svg viewBox="0 0 200 110">
    <path d="M188 56q-24-28-70-28-40 0-66 16-14 8-30 4 8 12 6 24 16-4 28 4 26 16 64 12 46-6 68-32z"
      fill="#2f6fa8" stroke="#1c4a75" stroke-width="3" stroke-linejoin="round"/>
    <path d="M92 78q34 8 68-6" fill="none" stroke="#9fc6e6" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M112 30q12 12 8 24" fill="none" stroke="#1c4a75" stroke-width="2.6"/>
    ${mat(168, 48)}</svg>`;
  if (kind === 'nhatang') return `<svg viewBox="0 0 200 110">
    <path d="M190 34q6 34-28 44-40 12-74 0-16-6-32 4 8-14 2-26 18 6 32-2 32-18 68-16 28 2 32-4z"
      fill="#3a5f9e" stroke="#22406e" stroke-width="3" stroke-linejoin="round"/>
    <path d="M20 44q-12-12-16-14 6 16 2 30 8-8 18-10z"
      fill="#3a5f9e" stroke="#22406e" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M96 74q22 10 46 2" fill="none" stroke="#a8c2e4" stroke-width="3" stroke-linecap="round"/>
    ${mat(166, 44)}</svg>`;
  if (kind === 'mattrang') return `<svg viewBox="0 0 200 110">
    <path d="M104 6l18 36h-34z" fill="#aab6c8" stroke="#6f7d92" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M104 104l18-36h-34z" fill="#aab6c8" stroke="#6f7d92" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M48 55q0-26 30-26h12q42 0 60 26-18 26-60 26H78q-30 0-30-26z"
      fill="#ccd6e4" stroke="#6f7d92" stroke-width="3"/>
    <path d="M48 38q-16 7-18 17 2 10 18 17z" fill="#aab6c8" stroke="#6f7d92" stroke-width="2.6"/>
    <path d="M118 40q10 14 0 30" fill="none" stroke="#8b96a8" stroke-width="2.4"/>
    ${mat(140, 47)}</svg>`;
  if (kind === 'maicheo') return `<svg viewBox="0 0 200 110">
    <path d="M12 66q42-16 94-11 44 4 82 1-36 14-82 16-52 2-94-6z"
      fill="#dde5f0" stroke="#8b96a8" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M18 60q32-13 88-8 46 4 82 0" fill="none" stroke="#e0453a" stroke-width="4.2"
      stroke-linecap="round"/>
    <path d="M178 46q12-12 20-9-8 10-6 21z" fill="#e0453a" stroke="#a5321a" stroke-width="2.2"
      stroke-linejoin="round"/>
    <path d="M52 72l-4 12M84 72l-3 12M116 73l-3 12" stroke="#8b96a8" stroke-width="2.2"
      stroke-linecap="round"/>
    ${mat(176, 62)}</svg>`;
  if (kind === 'map') return `<svg viewBox="0 0 200 110">
    <path d="M190 62q-20-24-64-26-34-2-62 10-16 6-30-2 10 12 8 24 14-6 28 2 26 14 62 8 40-6 58-16z"
      fill="#8fa4b8" stroke="#5a6d80" stroke-width="3" stroke-linejoin="round"/>
    <path d="M104 38q4-20 16-24-2 14 4 24z" fill="#8fa4b8" stroke="#5a6d80" stroke-width="2.6"
      stroke-linejoin="round"/>
    <path d="M120 74q10 14 22 14" fill="none" stroke="#5a6d80" stroke-width="2.6"/>
    <path d="M150 62q16 2 28-2" fill="none" stroke="#5a6d80" stroke-width="2.4"/>
    ${mat(166, 50)}</svg>`;
  return `<svg viewBox="0 0 200 110">
    <path d="M186 54q-18-24-60-24-36 0-62 14-16 8-30 0 8 12 6 24 14-6 28 0 26 14 60 10 42-6 58-24z"
      fill="#7fa8c8" stroke="#4a6d88" stroke-width="3" stroke-linejoin="round"/>
    <path d="M96 32q6-16 18-18-4 12 2 20z" fill="#7fa8c8" stroke="#4a6d88" stroke-width="2.6"
      stroke-linejoin="round"/>
    <path d="M162 60q14-2 22 4" fill="none" stroke="#4a6d88" stroke-width="2.4"/>
    ${mat(164, 46)}</svg>`;
};

/* ---- tranh chú hải cẩu ---- */
ART.b76Seal = () => `<svg viewBox="0 0 210 108">
  <path d="M20 40q16 4 22 16 8-14 24-16-8 16 0 26-14 10-26 6-14-6-20-32z"
    fill="#b9cbe8" stroke="#7d90b5" stroke-width="2.6" stroke-linejoin="round"/>
  <ellipse cx="112" cy="70" rx="76" ry="25" fill="#c8d8f2" stroke="#7d90b5" stroke-width="3"/>
  <circle cx="170" cy="44" r="24" fill="#c8d8f2" stroke="#7d90b5" stroke-width="3"/>
  <circle cx="182" cy="50" r="11" fill="#dbe6fa" stroke="#7d90b5" stroke-width="2.2"/>
  <circle cx="190" cy="46" r="3.6" fill="#6b5a4a"/>
  <circle cx="170" cy="36" r="4.4" fill="#2b2b33"/>
  <circle cx="171.4" cy="34.6" r="1.5" fill="#fff"/>
  <path d="M96 88q18 12 36 5" fill="none" stroke="#7d90b5" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M172 56q8 4 16 3M172 60q7 6 14 7" fill="none" stroke="#7d90b5" stroke-width="1.8"
    stroke-linecap="round"/>
</svg>`;

/* ---- các cách hỏi ở bài 5 (tr.112) và bài 5 (tr.114) ---- */
const LON76 = [
  ['tròn chục lớn nhất có bốn chữ số khác nhau', 9870,
    'Số tròn chục nên chữ số hàng đơn vị là 0. Muốn số lớn nhất thì hàng nghìn là 9, '
    + 'hàng trăm là 8, hàng chục là 7. Vậy số đó là 9 870.'],
  ['lớn nhất có bốn chữ số khác nhau', 9876,
    'Bốn chữ số khác nhau và lớn nhất là 9, 8, 7, 6 xếp từ lớn đến bé, được số 9 876.'],
  ['tròn chục lớn nhất có bốn chữ số', 9990,
    'Số tròn chục nên chữ số hàng đơn vị là 0; ba chữ số còn lại lớn nhất đều là 9, '
    + 'được số 9 990.'],
  ['tròn trăm lớn nhất có bốn chữ số', 9900,
    'Số tròn trăm nên hàng chục và hàng đơn vị đều là 0; hai chữ số còn lại lớn nhất '
    + 'đều là 9, được số 9 900.']
];
const BE76 = [
  ['tròn chục bé nhất có bốn chữ số khác nhau', 1230,
    'Số tròn chục nên chữ số hàng đơn vị là 0. Muốn số bé nhất thì hàng nghìn là 1, '
    + 'hàng trăm là 2, hàng chục là 3 (vì các chữ số phải khác nhau). Vậy số đó là 1 230.'],
  ['bé nhất có bốn chữ số khác nhau', 1023,
    'Hàng nghìn bé nhất là 1, rồi đến 0, 2, 3 nên số đó là 1 023.'],
  ['tròn chục bé nhất có bốn chữ số', 1000,
    'Số bé nhất có bốn chữ số là 1 000; số này có hàng đơn vị là 0 nên cũng là số tròn chục.'],
  ['lớn nhất có bốn chữ số khác nhau mà chữ số hàng nghìn là 1', 1987,
    'Chữ số hàng nghìn là 1; ba chữ số còn lại khác nhau và lớn nhất là 9, 8, 7. '
    + 'Vậy số đó là 1 987.']
];

BANKS.b76 = [

/* ===== tr.111 – Luyện tập 1, Bài 1: Đọc các số sau ===== */
() => {
  const q = Q(1, 'Đọc các số sau.');
  const nz = () => R(1, 9);
  const ns = [
    nz() * 1000 + nz() * 10 + nz(),                                  /* không trăm … */
    R(10, 29) * 1000 + nz() * 100 + nz() * 10 + nz(),
    R(30, 59) * 1000 + nz() * 100 + nz() * 10 + nz(),
    R(60, 79) * 1000 + nz() * 100 + nz(),                            /* … linh … */
    R(80, 99) * 1000 + nz() * 10 + nz()
  ];
  const LET = ['A', 'B', 'C', 'D', 'E'];
  const thu = b76Mix([0, 1, 2, 3, 4]);                               /* thu[j] = số ở dòng j */

  const bang = '<div class="b76-read">' + thu.map((idx, j) =>
    `<div><i>${LET[j]}.</i>${b76Doc(ns[idx])}</div>`).join('') + '</div>';
  const html = `<div class="b76-banner"><div class="b76-nums">${ns.slice(0, 3).map(SP76).join('; ')};<br>
      ${ns.slice(3).map(SP76).join('; ')}</div>${ART.robot}</div>
    <div class="b76-ask">Chọn chữ cái ứng với cách đọc đúng của mỗi số.</div>${bang}`
    + ns.map((n, i) =>
      `<div class="fill-line b76-wide">${SP76(n)}: ${q.pick(LET[thu.indexOf(i)], LET)}</div>`).join('');
  return q.done(html,
    ns.map(n => `${SP76(n)} đọc là ${b76Doc(n)}`).join('; ') + '.');
},

/* ===== tr.112 – Luyện tập 1, Bài 2: Số ? (dãy số) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const day = (st, buoc, sl, an) => {
    const v = Array.from({length: sl}, (_, i) => st + i * buoc);
    return v.map((x, i) => an.includes(i) ? q.num(x) : SP76(x)).join('; ') + '.';
  };
  const a0 = 9992 + R(0, 6);
  const b0 = R(12, 89) * 1000 + R(0, 9) * 100 + R(0, 9) * 10;
  const c0 = R(11, 95) * 1000 + R(2, 4) * 100;
  const html = `<div class="b76-line"><span class="b76-let">a)</span>${day(a0, 1, 9, [3, 5, 6, 8])}</div>
    <div class="b76-line"><span class="b76-let">b)</span>${day(b0, 10, 8, [2, 4, 6, 7])}</div>
    <div class="b76-line"><span class="b76-let">c)</span>${day(c0, 100, 8, [1, 4, 5, 7])}</div>`;
  return q.done(html,
    `a) Đếm thêm 1 đơn vị. b) Đếm thêm 10 đơn vị. c) Đếm thêm 100 đơn vị.`);
},

/* ===== tr.112 – Luyện tập 1, Bài 3: >; <; = ? ===== */
() => {
  const q = Q(3, '<span class="tag">&gt;; &lt;; =</span> ?');
  const dau = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  const doi = p => Math.random() < .5 ? [p[1], p[0]] : p;
  const dong = p => `<div class="cmp-row"><span class="side">${SP76(p[0])}</span>
    ${q.sign(dau(p[0], p[1]))}<span class="side">${SP76(p[1])}</span></div>`;

  const t1 = R(2, 9);
  const a1 = doi([t1 * 1000 + R(5, 9) * 100 + R(0, 99), t1 * 1000 + R(0, 4) * 100 + R(0, 99)]);
  const k1 = R(1, 8), k2 = k1 + R(1, 9 - k1);
  const a2 = doi([k1 * 1000 + R(0, 999), k2 * 1000 + R(0, 999)]);

  const b1 = doi([R(9000, 9999), R(10000, 10999)]);
  const nen = 10000 + R(0, 8) * 1000, h = R(1, 9);
  const b2 = doi([nen + h * 100 + R(0, 99), nen + R(0, h - 1) * 100 + R(0, 99)]);

  const eq = R(10, 99) * 1000 + R(0, 999);
  const c1 = [eq, eq];
  const x = R(3, 9), y = R(0, x - 1);
  const nen2 = R(1, 9) * 10000 + R(0, 9) * 1000, le = R(0, 9);
  const c2 = doi([nen2 + x * 100 + y * 10 + le, nen2 + y * 100 + x * 10 + le]);

  const cc = Math.random() < .5 ? [c1, c2] : [c2, c1];      /* đổi chỗ hai dòng của phần c) */
  const html = `<div class="b76-cmp">
      <div><div class="sub-lbl">a)</div>${dong(a1)}${dong(a2)}</div>
      <div><div class="sub-lbl">b)</div>${dong(b1)}${dong(b2)}</div>
      <div><div class="sub-lbl">c)</div>${dong(cc[0])}${dong(cc[1])}</div>
    </div><div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`;
  return q.done(html,
    'So sánh số chữ số trước: số nào ít chữ số hơn thì bé hơn. Nếu cùng số chữ số thì '
    + 'so sánh lần lượt từng cặp chữ số kể từ trái sang phải.');
},

/* ===== tr.112 – Luyện tập 1, Bài 4: con cá nào nặng nhất, nhẹ nhất ===== */
() => {
  const q = Q(4, 'Trong các con cá dưới đây, con cá nào nặng nhất, con cá nào nhẹ nhất?');
  const POOL = [
    {t: 'Cá voi xanh',  k: 'voi',      w: () => R(80, 99) * 1000},
    {t: 'Cá nhà táng',  k: 'nhatang',  w: () => R(40, 59) * 1000},
    {t: 'Cá mập trắng', k: 'map',      w: () => R(11, 20) * 100},
    {t: 'Cá mặt trăng', k: 'mattrang', w: () => R(8, 16) * 100},
    {t: 'Cá heo',       k: 'heo',      w: () => R(15, 30) * 10},
    {t: 'Cá mái chèo',  k: 'maicheo',  w: () => R(20, 29) * 10}
  ];
  const ca = b76Mix(POOL).slice(0, 4);
  const w = ca.map(c => c.w());
  for (let i = 1; i < w.length; i++){                       /* bảo đảm bốn số khác nhau */
    let g = 0;
    while (w.slice(0, i).includes(w[i]) && g++ < 50) w[i] += 10;
  }
  const ten = ca.map(c => c.t);
  const nang = ten[w.indexOf(Math.max(...w))];
  const nhe = ten[w.indexOf(Math.min(...w))];

  const html = '<div class="b76-fish">' + ca.map((c, i) =>
      `<div><div class="b76-fbox">${ART.b76Fish(c.k)}</div>
        <div class="b76-fcap">${c.t} cân nặng ${SP76(w[i])} kg</div></div>`).join('') + '</div>'
    + `<div class="fill-line b76-wide">Con cá nặng nhất: ${q.pick(nang, ten)}</div>
       <div class="fill-line b76-wide">Con cá nhẹ nhất: ${q.pick(nhe, ten)}</div>`;
  return q.done(html,
    `Số lớn nhất trong các số ${w.map(SP76).join(', ')} là ${SP76(Math.max(...w))} nên ${nang} `
    + `nặng nhất; số bé nhất là ${SP76(Math.min(...w))} nên ${nhe} nhẹ nhất.`);
},

/* ===== tr.112 – Luyện tập 1, Bài 5: trang trại nhà bác Ba Phi có bao nhiêu con vịt ===== */
() => {
  const q = Q(5, 'Bác An hỏi bác Ba Phi: "Năm nay, trang trại nhà bác có bao nhiêu con vịt?".');
  const v = pick(LON76);
  const html = `<div class="b76-say">
      <div>Năm nay, trang trại nhà bác có bao nhiêu con vịt?</div>
      <div>Bác tính nhé! Năm nay, số con vịt ở trang trại nhà tôi là số ${v[0]}.</div>
    </div>
    <p class="wordq">Em hãy giúp bác An tìm số con vịt ở trang trại nhà bác Ba Phi năm nay.</p>
    <div class="bullet">Trang trại nhà bác Ba Phi có ${q.num(v[1])} con vịt.</div>`;
  return q.done(html, v[2]);
},

/* ===== tr.113 – Luyện tập 2, Bài 1: số khẩu trang của bốn công ty ===== */
() => {
  const q = Q(1, 'Dưới đây là số khẩu trang của bốn công ty may được trong một ngày.');
  const POOL = ['Hồng Hà', 'Hoà Bình', 'Cửu Long', 'Thăng Long', 'Sông Hồng', 'Bạch Đằng',
    'Đại Việt', 'Trường Sơn'];
  const ten = b76Mix(POOL).slice(0, 4);
  const sl = b76Mix([R(20, 29), R(31, 39), R(41, 49), R(51, 59)]).map(x => x * 1000);
  const nhieu = ten[sl.indexOf(Math.max(...sl))];
  const it = ten[sl.indexOf(Math.min(...sl))];
  const thutu = ten.map((t, i) => i).sort((i, j) => sl[j] - sl[i]).map(i => ten[i]);
  const BAC = ['Thứ nhất', 'Thứ hai', 'Thứ ba', 'Thứ tư'];

  const html = ten.map((t, i) =>
      `<div class="bullet">Công ty ${t}: ${SP76(sl[i])} cái</div>`).join('')
    + '<div class="b76-ask">a) Trong một ngày, công ty nào may được nhiều khẩu trang nhất, '
    + 'công ty nào may được ít khẩu trang nhất?</div>'
    + `<div class="fill-line b76-wide">Nhiều nhất: ${q.pick(nhieu, ten)}</div>
       <div class="fill-line b76-wide">Ít nhất: ${q.pick(it, ten)}</div>`
    + '<div class="b76-ask">b) Sắp xếp các công ty trên theo thứ tự số khẩu trang may được '
    + 'trong một ngày từ nhiều nhất đến ít nhất.</div>'
    + thutu.map((t, i) =>
      `<div class="fill-line b76-wide">${BAC[i]}: ${q.pick(t, ten)}</div>`).join('');
  return q.done(html,
    'Sắp xếp các số từ lớn đến bé: '
    + thutu.map(t => `${SP76(sl[ten.indexOf(t)])} (công ty ${t})`).join(' > ') + '.');
},

/* ===== tr.113 – Luyện tập 2, Bài 2: viết mỗi số thành tổng (theo mẫu) ===== */
() => {
  const nz = () => R(1, 9);
  const ns = [
    nz() * 1000 + nz() * 100 + nz() * 10 + nz(),
    nz() * 1000 + nz() * 10 + nz(),
    nz() * 10000 + nz() * 1000 + nz() * 100 + nz() * 10 + nz(),
    nz() * 10000 + nz() * 1000 + nz() * 100 + nz() * 10
  ];
  const q = Q(2, `Viết mỗi số ${ns.map(SP76).join('; ')} thành tổng (theo mẫu).`);
  const m = nz() * 1000 + nz() * 100 + nz() * 10 + nz();
  const html = noteBox(`Mẫu: ${SP76(m)} = ${b76Tach(m).map(SP76).join(' + ')}`)
    + '<div class="eq-list">' + ns.map(n =>
      `<div class="eq">${SP76(n)} = ${b76Tach(n).map(v => q.num(v))
        .join('<span class="op">+</span>')}</div>`).join('') + '</div>';
  return q.done(html,
    ns.map(n => `${SP76(n)} = ${b76Tach(n).map(SP76).join(' + ')}`).join('; ') + '.');
},

/* ===== tr.113 – Luyện tập 2, Bài 3: chọn số là giá trị của mỗi biểu thức ===== */
() => {
  const q = Q(3, 'Chọn số là giá trị của mỗi biểu thức.');
  const nz = () => R(1, 9);
  const MAU = [
    () => nz() * 10000 + nz() * 1000 + nz() * 100,                   /* 34 500 */
    () => nz() * 1000 + nz() * 100 + nz() * 10 + nz(),               /*  7 623 */
    () => nz() * 10000 + nz() * 100 + nz() * 10 + nz(),              /* 80 819 */
    () => nz() * 10000 + nz() * 100 + nz()                           /* 90 502 */
  ];
  const LET = ['A', 'B', 'C', 'D'];
  const ns = b76Mix(MAU).map(f => f());
  const bong = b76Mix(ns).map(SP76);

  const html = '<div class="b76-seals">' + ns.map((n, i) =>
      `<div>${ART.b76Seal()}<div class="b76-sexp">${b76Tach(n).map(SP76).join(' + ')}</div>
        <div class="b76-slet">${LET[i]}</div></div>`).join('') + '</div>'
    + '<div class="b76-balls">' + bong.map(v =>
      `<div class="b76-ball">${v}</div>`).join('') + '</div>'
    + ns.map((n, i) =>
      `<div class="fill-line b76-wide">${LET[i]}: ${q.pick(SP76(n), bong)}</div>`).join('');
  return q.done(html,
    ns.map((n, i) => `${LET[i]}: ${b76Tach(n).map(SP76).join(' + ')} = ${SP76(n)}`).join('; ') + '.');
},

/* ===== tr.113 – Luyện tập 2, Bài 4: Số ? (tìm số hạng còn thiếu) ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const nz = () => R(1, 9);
  const dong = n => {
    const t = b76Tach(n);
    const k = R(1, t.length - 1);
    return `<div class="b76-eq">${t.map((v, i) => i === k ? q.num(v) : SP76(v))
      .join(' <span class="op">+</span> ')} <span class="op">=</span> ${SP76(n)}</div>`;
  };
  const a1 = nz() * 1000 + nz() * 100 + nz();
  const a2 = nz() * 1000 + nz() * 100 + nz() * 10;
  const b1 = nz() * 10000 + nz() * 1000 + nz() * 100 + nz() * 10;
  const b2 = nz() * 10000 + nz() * 1000 + nz();
  const html = `<div class="sub-lbl">a)</div>${dong(a1)}${dong(a2)}
    <div class="sub-lbl">b)</div>${dong(b1)}${dong(b2)}`;
  return q.done(html,
    'Viết số ở bên phải dấu "=" thành tổng các chục nghìn, nghìn, trăm, chục và đơn vị '
    + 'rồi tìm số hạng còn thiếu: '
    + [a1, a2, b1, b2].map(n => `${SP76(n)} = ${b76Tach(n).map(SP76).join(' + ')}`).join('; ') + '.');
},

/* ===== tr.114 – Luyện tập 2, Bài 5: trường của Nam có bao nhiêu học sinh ===== */
() => {
  const q = Q(5, 'Em hãy cùng Nam tìm xem trường của Nam có bao nhiêu học sinh.');
  const v = pick(BE76);
  const html = `<div class="b76-say">
      <div>Mai ơi! Trường của chúng mình có bao nhiêu học sinh nhỉ?</div>
      <div>Bạn tính nhé! Số học sinh của trường chúng mình là số ${v[0]}.</div>
    </div>
    <div class="bullet">Trường của Nam có ${q.num(v[1])} học sinh.</div>`;
  return q.done(html, v[2]);
},
];
