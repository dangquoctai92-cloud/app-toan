/* ========== BÀI 48: LÀM TRÒN SỐ ĐẾN HÀNG CHỤC, HÀNG TRĂM (SGK tập 2, tr.15 – 16) ==========
   hoạt động tr.16: bài 1 (Làm tròn ba số đến hàng chục, hàng trăm),
                    bài 2 (1 242 con gà – Mai nói, Việt nói, ai đúng?)
   luyện tập tr.16: bài 1 (6 745 cuốn sách – mỗi bạn làm tròn đến hàng nào?),
                    bài 2 (Số ? – các máy "làm tròn số")
========================================================================================= */

ART.spNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
ART.b48R10 = n => Math.floor(n / 10) * 10 + (n % 10 >= 5 ? 10 : 0);
ART.b48R100 = n => Math.floor(n / 100) * 100 + (Math.floor(n / 10) % 10 >= 5 ? 100 : 0);

ART.b48Machine = `<svg viewBox="0 0 120 124">
  <path d="M40 2h40l-8 14H48z" fill="#f0912a" stroke="#c06a10" stroke-width="2"/>
  <rect x="24" y="16" width="72" height="74" rx="8" fill="#5b8fd6" stroke="#2f5a9e" stroke-width="3"/>
  <circle cx="46" cy="36" r="9" fill="#fff" stroke="#2f5a9e" stroke-width="2"/>
  <circle cx="74" cy="36" r="9" fill="#fff" stroke="#2f5a9e" stroke-width="2"/>
  <circle cx="48" cy="38" r="4" fill="#1b1b1b"/><circle cx="76" cy="38" r="4" fill="#1b1b1b"/>
  <rect x="30" y="58" width="60" height="24" rx="5" fill="#eaf3ff" stroke="#2f5a9e" stroke-width="2"/>
  <path d="M24 44h-13M96 44h13M24 70h-13M96 70h13" stroke="#e0709a" stroke-width="4" stroke-linecap="round"/>
  <path d="M40 90v14H30v8h60v-8H80V90z" fill="#3f6fb0" stroke="#2f5a9e" stroke-width="2.5"/>
</svg>`;

ART.b48Lib = `<svg viewBox="0 0 240 130" class="b48-lib">
  <rect width="240" height="130" rx="9" fill="#e8f3e4"/>
  <rect x="14" y="14" width="96" height="94" rx="4" fill="#d9b98a" stroke="#9b7a4a" stroke-width="2.5"/>
  <rect x="130" y="14" width="96" height="94" rx="4" fill="#d9b98a" stroke="#9b7a4a" stroke-width="2.5"/>
  <g stroke="#9b7a4a" stroke-width="2.5"><path d="M14 46h96M14 78h96M130 46h96M130 78h96"/></g>
  ${[0, 1, 2].map(r => [14, 130].map(x0 => Array.from({length:11}, (_, i) =>
    `<rect x="${x0 + 5 + i * 8}" y="${20 + r * 32}" width="6" height="${20 - (i % 3) * 3}"
      fill="${['#e2653f', '#4f9fd6', '#5fbb46', '#f0b429', '#a06ac0'][(i + r) % 5]}"/>`).join('')).join('')).join('')}
  <rect x="0" y="108" width="240" height="22" fill="#c9a06a"/></svg>`;

ART.b48Ga = `<svg viewBox="0 0 150 100" class="b48-ga">
  <ellipse cx="70" cy="62" rx="38" ry="26" fill="#f3e2c0" stroke="#b08a4a" stroke-width="2.2"/>
  <path d="M46 46q14-16 30-6-10 6-14 18z" fill="#e8cf9a" stroke="#b08a4a" stroke-width="1.8"/>
  <circle cx="108" cy="38" r="16" fill="#f3e2c0" stroke="#b08a4a" stroke-width="2.2"/>
  <path d="M100 22q4-10 8 0 4-10 8 0-4 4-16 0z" fill="#e2483c" stroke="#a5281e" stroke-width="1.6"/>
  <path d="M122 38l14 5-14 5z" fill="#f0a12e" stroke="#c07a16" stroke-width="1.6"/>
  <circle cx="112" cy="34" r="2.6" fill="#2b2b2b"/>
  <path d="M110 52q-2 8 2 12" fill="none" stroke="#e2483c" stroke-width="3"/>
  <path d="M34 54q-16-10-22 2 12 4 22 8z" fill="#e8cf9a" stroke="#b08a4a" stroke-width="1.8"/>
  <path d="M58 86v10M82 86v10" stroke="#f0a12e" stroke-width="4" stroke-linecap="round"/>
  <path d="M52 96h12M76 96h12" stroke="#f0a12e" stroke-width="4" stroke-linecap="round"/></svg>`;

BANKS.b48 = [

/* ===== tr.16 – Hoạt động Bài 1: Làm tròn đến hàng chục, hàng trăm ===== */
() => {
  const q = Q(1, '');
  const mk = u => R(1, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + u;
  const ns = [mk(R(1, 4)), mk(R(6, 9)), mk(5)];   // ba số khác nhau vì chữ số hàng đơn vị khác nhau
  const list = ns.slice().sort(() => Math.random() - .5);
  const rows = list.map(n => `<tr><td>${ART.spNum(n)}</td>
      <td>${q.num(ART.b48R10(n))}</td><td>${q.num(ART.b48R100(n))}</td></tr>`).join('');
  return q.done(`<p class="wordq">Làm tròn các số ${list.map(ART.spNum).join(', ')}
      đến hàng chục, hàng trăm.</p>
    <div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số</th><th>Làm tròn đến<br>hàng chục</th><th>Làm tròn đến<br>hàng trăm</th></tr>${rows}
    </table></div>`,
    list.map(n => `${ART.spNum(n)} → ${ART.spNum(ART.b48R10(n))} (hàng chục), `
      + `${ART.spNum(ART.b48R100(n))} (hàng trăm)`).join(';  '));
},

/* ===== tr.16 – Hoạt động Bài 2: Trang trại có bao nhiêu con gà? ===== */
() => {
  const q = Q(2, '');
  const n = R(1, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(1, 9);
  const dung = ART.b48R10(n);
  const duoi = Math.floor(n / 10) * 10;
  const sai = dung === duoi ? duoi + 10 : duoi;
  const NAMES = ['Mai', 'Việt'].sort(() => Math.random() - .5);
  const say = [{n:NAMES[0], v:dung}, {n:NAMES[1], v:sai}].sort(() => Math.random() - .5);
  return q.done(`<p class="wordq">Rô-bốt, Việt và Mai cùng ghé thăm một trang trại,
      Rô-bốt đếm được có ${ART.spNum(n)} con gà. Khi làm tròn số đến hàng chục:</p>
    ${ART.b48Ga}
    ${say.map(s => `<div class="bullet">${s.n} nói: “Trang trại có khoảng ${ART.spNum(s.v)} con gà”.</div>`).join('')}
    <div class="fill-line">Theo em, bạn nói đúng là ${q.pick(NAMES[0], ['Mai', 'Việt'])}</div>
    <div class="fill-line">Làm tròn ${ART.spNum(n)} đến hàng chục ta được ${q.num(dung)}.</div>`,
    `Chữ số hàng đơn vị của ${ART.spNum(n)} là ${n % 10} nên làm tròn `
      + `${n % 10 >= 5 ? 'lên' : 'xuống'} được ${ART.spNum(dung)}.`);
},

/* ===== tr.16 – Luyện tập Bài 1: Mỗi bạn làm tròn đến hàng nào? ===== */
() => {
  const q = Q(1, '');
  let n = 6745;
  for (let g = 0; g < 200; g++){
    const v = R(1, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(1, 9);
    if (ART.b48R10(v) !== ART.b48R100(v)){ n = v; break; }
  }
  if (ART.b48R10(n) === ART.b48R100(n)) n = 6745;
  const HANG = ['hàng chục', 'hàng trăm'];
  const kids = [{n:'Nam', v:ART.b48R10(n), h:'hàng chục'}, {n:'Mai', v:ART.b48R100(n), h:'hàng trăm'}]
    .sort(() => Math.random() - .5);
  return q.done(`<p class="wordq">Trong thư viện có ${ART.spNum(n)} cuốn sách.
      Hỏi mỗi bạn đã làm tròn số sách đó đến hàng nào?</p>
    ${ART.b48Lib}
    ${kids.map(k => speech(`${k.n}: “Trong thư viện có khoảng ${ART.spNum(k.v)} cuốn sách.”`)).join('')}
    ${kids.map(k => `<div class="fill-line">Bạn ${k.n} đã làm tròn đến ${q.pick(k.h, HANG)}</div>`).join('')}`,
    `${ART.spNum(n)} làm tròn đến hàng chục được ${ART.spNum(ART.b48R10(n))}, `
      + `đến hàng trăm được ${ART.spNum(ART.b48R100(n))}.`);
},

/* ===== tr.16 – Luyện tập Bài 2: Số ? – các máy "làm tròn số" ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const hang = pick([10, 100]);
  const lam = hang === 10 ? ART.b48R10 : ART.b48R100;
  const ns = [];
  for (let g = 0; g < 400 && ns.length < 4; g++){
    const v = R(1, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
    if (ns.includes(v)) continue;
    if (hang === 10 && lam(v) % 100 === 0) continue;          // giữ dấu hiệu "làm tròn đến hàng chục"
    if (hang === 100 && ART.b48R10(v) === lam(v)) continue;    // hai cách làm tròn phải cho kết quả khác nhau
    if (v % hang === 0) continue;                              // số đã tròn sẵn thì không rõ quy luật
    ns.push(v);
  }
  while (ns.length < 4) ns.push(1234 + ns.length * 111);
  const cell = (v, hide) => `<div class="b48-machw"><div class="b48-in">${ART.spNum(v)}</div>
    ${ART.b48Machine}<span class="val">${hide ? q.num(lam(v)) : ART.spNum(lam(v))}</span></div>`;
  return q.done(`<p class="wordq">Quan sát các máy “làm tròn số” rồi tìm số thích hợp với máy cuối cùng.</p>
    <div class="b48-mrow">${ns.map((v, i) => cell(v, i === 3)).join('')}</div>
    <div class="fill-line">Các máy đã làm tròn số đến
      ${q.pick(hang === 10 ? 'hàng chục' : 'hàng trăm', ['hàng chục', 'hàng trăm'])}</div>`,
    ns.slice(0, 3).map(v => `${ART.spNum(v)} → ${ART.spNum(lam(v))}`).join(';  ')
      + `. Vậy ${ART.spNum(ns[3])} → ${ART.spNum(lam(ns[3]))}.`);
},
];
