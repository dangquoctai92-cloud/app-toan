/* ==================== BÀI 81: ÔN TẬP CHUNG
   (SGK tập 2 – tr.124, 125)
   luyện tập 1 (tr.124) : bài 1 (Hoàn thành bảng sau theo mẫu – hàng, viết số, đọc số),
                          bài 2 (cho bốn số: a) số lớn nhất, số bé nhất;
                                 b) viết theo thứ tự từ bé đến lớn, từ lớn đến bé),
                          bài 3 (Đặt tính rồi tính – cộng, trừ, nhân, chia),
                          bài 4 (cửa hàng văn phòng phẩm bán hộp bút chì màu
                                 thứ Bảy và Chủ nhật)
   luyện tập 2 (tr.125) : bài 1 (Quan sát hình rồi trả lời câu hỏi – hai cái cân đĩa
                                 với các quả cân, túi đường và túi muối),
                          bài 2 (bạn Núi đi từ nhà đến trường hết bao nhiêu phút),
                          bài 3 (Tính giá trị của biểu thức – bốn câu a, b, c, d),
                          bài 4 (a: diện tích hình vuông biết chu vi;
                                 b: chu vi hình chữ nhật có chiều rộng bằng cạnh hình vuông)
   Số liệu sinh ngẫu nhiên, mọi ô "?" của sách đều thành ô điền, đáp án luôn duy nhất.
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như SGK: 27 641 */
const SP81 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b81Mix = a => a.slice().sort(() => Math.random() - .5);
const LET81 = ['A', 'B', 'C', 'D'];
const CS81 = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

/* ---- đọc số có hai chữ số (0 – 99) ---- */
function b81Hai(n){
  if (n < 10) return CS81[n];
  const c = Math.floor(n / 10), d = n % 10;
  if (c === 1) return 'mười' + (d === 0 ? '' : d === 5 ? ' lăm' : ' ' + CS81[d]);
  const s = CS81[c] + ' mươi';
  if (d === 0) return s;
  if (d === 1) return s + ' mốt';
  if (d === 4) return s + ' tư';
  if (d === 5) return s + ' lăm';
  return s + ' ' + CS81[d];
}

/* ---- đọc nhóm ba chữ số; du = true thì đọc đủ "không trăm", "linh" ---- */
function b81Ba(n, du){
  const t = Math.floor(n / 100), r = n % 100;
  if (t === 0){
    if (!du) return b81Hai(r);
    if (r === 0) return '';
    return r < 10 ? 'không trăm linh ' + CS81[r] : 'không trăm ' + b81Hai(r);
  }
  const s = CS81[t] + ' trăm';
  if (r === 0) return s;
  if (r < 10) return s + ' linh ' + CS81[r];
  return s + ' ' + b81Hai(r);
}

/* ---- đọc số trong phạm vi 100 000 (readNum của app chỉ đúng với số ≤ 1 000) ---- */
function b81Doc(n){
  if (n < 1000) return b81Ba(n, false);
  const ng = Math.floor(n / 1000), du = n % 1000;
  const s = b81Hai(ng) + ' nghìn';
  if (du === 0) return s;
  const t = b81Ba(du, true);
  return t ? s + ' ' + t : s;
}

/* ---- tất cả các hoán vị của một mảng (dùng cho bài 2: bốn số cùng các chữ số) ---- */
function b81Hoan(ds){
  const out = [];
  const di = (cur, con) => {
    if (!con.length){ out.push(cur.slice()); return; }
    for (let i = 0; i < con.length; i++)
      di(cur.concat([con[i]]), con.slice(0, i).concat(con.slice(i + 1)));
  };
  di([], ds);
  return out;
}

/* ---- viết giờ theo số phút tính từ 0 giờ ---- */
const b81Gio = t => Math.floor(t / 60) + ' giờ' + (t % 60 ? ' ' + (t % 60) + ' phút' : '');

/* ---- khung đặt tính cột dọc cho phép cộng, phép trừ ---- */
ART.b81Vc = (q, a, b, op) => `<div class="vcalc"><span class="vop">${op === '+' ? '+' : '−'}</span>
  <span class="vnums"><b>${SP81(a)}</b><b>${SP81(b)}</b></span><i class="vbar"></i>
  <span class="vres">${q.num(op === '+' ? a + b : a - b)}</span></div>`;

/* ---- khung phép nhân dạng cột ---- */
ART.b81Mul = (a, b, res) => `<div class="b81-mul">
  <span class="s"></span><span class="v">${SP81(a)}</span>
  <span class="s">&times;</span><span class="v">${b}</span>
  <span class="bar"></span>
  <span class="s"></span><span class="v">${res}</span></div>`;

/* ---- khung phép chia dạng cột ---- */
ART.b81Div = (a, b, thuong) => `<div class="b81-div">
  <span class="b81-da">${SP81(a)}</span><span class="b81-db">${b}</span>
  <span class="b81-dc">${thuong}</span></div>`;

/* ---- cái cân đĩa: đĩa trái đặt các quả cân, đĩa phải đặt túi hàng ---- */
ART.b81Can = (qc, ten) => {
  const n = qc.length;
  const x0 = 60 - (n - 1) * 15;
  const nang = qc.map((v, i) => {
    const x = x0 + i * 30, ly = i % 2 ? 50 : 32;
    return `<text x="${x}" y="${ly}" text-anchor="middle" class="b81-ctxt">${v} g</text>
      <line x1="${x}" y1="${ly + 5}" x2="${x}" y2="76" stroke="#4aa8dd" stroke-width="2"
        stroke-linecap="round"/>
      <g transform="translate(${x},116)">
        <rect x="-11" y="-28" width="22" height="28" rx="4" fill="#dbe1e9" stroke="#7f8794" stroke-width="2"/>
        <path d="M-5 -28v-7a5 5 0 0 1 10 0v7" fill="none" stroke="#7f8794" stroke-width="2.4"/>
      </g>`;
  }).join('');
  const tui = `<path d="M214 80q0-11 11-11h50q11 0 11 11v28q0 8-8 8h-56q-8 0-8-8z"
      fill="#f5e4bb" stroke="#c9a95f" stroke-width="2.8" stroke-linejoin="round"/>
    <rect x="224" y="84" width="52" height="18" rx="5" fill="#fbd7e4" stroke="#e089a8" stroke-width="2"/>
    <text x="250" y="97" text-anchor="middle" class="b81-clbl">${ten}</text>`;
  return `<svg viewBox="0 0 320 200" class="b81-can">
    <rect x="86" y="176" width="148" height="16" rx="7" fill="#4ec2a6" stroke="#2a8570" stroke-width="3"/>
    <rect x="150" y="128" width="20" height="50" fill="#4ec2a6" stroke="#2a8570" stroke-width="3"/>
    <circle cx="160" cy="138" r="11" fill="#ffe9a8" stroke="#c9a227" stroke-width="2.6"/>
    <path d="M160 138v-7" stroke="#c9a227" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="24" y="118" width="272" height="9" rx="4.5" fill="#4ec2a6" stroke="#2a8570" stroke-width="2.6"/>
    <path d="M16 92v18q0 8 8 8h72q8 0 8-8V92" fill="#bdeade" stroke="#2a8570" stroke-width="3.2"
      stroke-linejoin="round"/>
    <path d="M206 92v18q0 8 8 8h72q8 0 8-8V92" fill="#bdeade" stroke="#2a8570" stroke-width="3.2"
      stroke-linejoin="round"/>
    ${nang}${tui}
  </svg>`;
};

/* ---- mặt đồng hồ kim: kim giờ theo giờ và phút, kim phút theo phút ---- */
ART.b81Clock = (h, m) => {
  const P = (r, deg) => [(100 + r * Math.sin(deg * Math.PI / 180)).toFixed(1),
                         (100 - r * Math.cos(deg * Math.PI / 180)).toFixed(1)];
  let ticks = '';
  for (let i = 0; i < 60; i++){
    const big = i % 5 === 0;
    const a = P(big ? 76 : 81, i * 6), b = P(87, i * 6);
    ticks += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"
      stroke="#4a4460" stroke-width="${big ? 2.6 : 1.3}" stroke-linecap="round"/>`;
  }
  let nums = '';
  for (let i = 1; i <= 12; i++){
    const p = P(63, i * 30);
    nums += `<text x="${p[0]}" y="${(+p[1] + 6).toFixed(1)}" text-anchor="middle"
      font-size="17" font-weight="800" fill="#2b2b38">${i}</text>`;
  }
  const kg = P(46, (h % 12) * 30 + m * 0.5), kp = P(72, m * 6);
  return `<svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="96" fill="#f0a027" stroke="#d1791a" stroke-width="3"/>
    <circle cx="100" cy="100" r="87" fill="#fff"/>
    ${ticks}${nums}
    <line x1="100" y1="100" x2="${kg[0]}" y2="${kg[1]}" stroke="#2b2b38" stroke-width="6.4"
      stroke-linecap="round"/>
    <line x1="100" y1="100" x2="${kp[0]}" y2="${kp[1]}" stroke="#e8352f" stroke-width="4.4"
      stroke-linecap="round"/>
    <circle cx="100" cy="100" r="6" fill="#2b2b38"/>
  </svg>`;
};

/* ---- các bộ quả cân dùng ở bài 1 (tr.125) ---- */
const QC81_BA = [[100, 200, 500], [200, 200, 500], [100, 100, 500], [200, 500, 500],
  [100, 200, 200], [100, 500, 500], [200, 200, 200], [100, 100, 200]];
const QC81_HAI = [[100, 200], [200, 200], [100, 100], [100, 500], [200, 500], [500, 500]];

BANKS.b81 = [

/* ===== tr.124 – Luyện tập 1, Bài 1: Hoàn thành bảng sau (theo mẫu) ===== */
() => {
  const q = Q(1, 'Hoàn thành bảng sau (theo mẫu).');
  const nz = () => R(1, 9);
  /* dòng mẫu: số có bốn chữ số, hàng chục là 0 (ví dụ 6 305) */
  const m = nz() * 1000 + nz() * 100 + nz();
  const d2 = [nz(), nz(), nz(), nz(), nz()];
  if (d2.every(x => x === d2[0])) d2[1] = d2[0] % 9 + 1;
  const d3 = [nz(), 0, nz(), nz(), nz()];
  const dd = R(2, 9);
  const rows = [
    {d: d2, n: +d2.join('')},
    {d: d3, n: +d3.join('')},
    {d: [dd, dd, dd, dd, dd], n: dd * 11111}
  ];
  const LET = ['A', 'B', 'C'];
  const thu = b81Mix([0, 1, 2]);                     /* thu[j] = dòng có cách đọc thứ j */

  let html = '<div class="b81-wrap"><table class="b81-tbl">'
    + '<tr><th colspan="5">Hàng</th><th rowspan="2">Viết số</th><th rowspan="2">Đọc số</th></tr>'
    + '<tr><th>Chục nghìn</th><th>Nghìn</th><th>Trăm</th><th>Chục</th><th>Đơn vị</th></tr>'
    + `<tr><td class="sh"></td><td>${Math.floor(m / 1000)}</td><td>${Math.floor(m / 100) % 10}</td>`
    + `<td>0</td><td>${m % 10}</td><td>${SP81(m)}</td><td class="rd">${b81Doc(m)}</td></tr>`;
  rows.forEach((r, i) => {
    html += '<tr>' + r.d.map(x => `<td>${x}</td>`).join('')
      + `<td>${q.num(r.n)}</td><td class="rd">${q.pick(LET[thu.indexOf(i)], LET)}</td></tr>`;
  });
  html += '</table></div>'
    + '<div class="b81-ask">Chọn chữ cái ứng với cách đọc đúng của mỗi số.</div>'
    + '<div class="b81-read">' + thu.map((idx, j) =>
      `<div><i>${LET[j]}.</i>${b81Doc(rows[idx].n)}</div>`).join('') + '</div>';

  return q.done(html,
    rows.map(r => `${SP81(r.n)} đọc là ${b81Doc(r.n)}`).join('; ') + '.');
},

/* ===== tr.124 – Luyện tập 1, Bài 2: cho bốn số – lớn nhất, bé nhất, sắp thứ tự ===== */
() => {
  const q = Q(2, 'Cho các số sau:');
  const ds = [];
  for (let g = 0; g < 60 && ds.length < 5; g++){
    const d = R(0, 9);
    if (!ds.includes(d)) ds.push(d);
  }
  for (let d = 0; d <= 9 && ds.length < 5; d++) if (!ds.includes(d)) ds.push(d);
  const tatca = b81Hoan(ds).filter(p => p[0] !== 0).map(p => +p.join(''));
  const ns = b81Mix([...new Set(tatca)]).slice(0, 4);

  const max = Math.max(...ns), min = Math.min(...ns);
  const tang = [...ns].sort((x, y) => x - y);
  const giam = [...ns].sort((x, y) => y - x);
  const mcq = '<div class="b81-mcq">' + ns.map((v, i) =>
    `<span><i>${LET81[i]}.</i>${SP81(v)}</span>`).join('') + '</div>';

  const html = '<div class="b81-nums">' + ns.map(v => `<span>${SP81(v)}</span>`).join('') + '</div>'
    + '<div class="b81-ask">a) Chọn câu trả lời đúng. Trong các số đã cho:</div>'
    + `<div class="b81-sub">&ndash; Số lớn nhất là:</div>${mcq}`
    + `<div class="fill-line b81-wide">Chọn: ${q.pick(LET81[ns.indexOf(max)], LET81)}</div>`
    + `<div class="b81-sub">&ndash; Số bé nhất là:</div>${mcq}`
    + `<div class="fill-line b81-wide">Chọn: ${q.pick(LET81[ns.indexOf(min)], LET81)}</div>`
    + '<div class="b81-ask">b) Viết các số đã cho theo thứ tự:</div>'
    + `<div class="b81-line"><span class="b81-let">&ndash;</span>Từ bé đến lớn:
        ${tang.map(v => q.num(v)).join('<span class="op">,</span> ')}</div>`
    + `<div class="b81-line"><span class="b81-let">&ndash;</span>Từ lớn đến bé:
        ${giam.map(v => q.num(v)).join('<span class="op">,</span> ')}</div>`;

  return q.done(html,
    `Bốn số đều có năm chữ số nên so sánh lần lượt từng cặp chữ số kể từ trái sang phải. `
    + `Số lớn nhất là ${SP81(max)}, số bé nhất là ${SP81(min)}. `
    + `Từ bé đến lớn: ${tang.map(SP81).join(', ')}. `
    + `Từ lớn đến bé: ${giam.map(SP81).join(', ')}.`);
},

/* ===== tr.124 – Luyện tập 1, Bài 3: Đặt tính rồi tính ===== */
() => {
  const q = Q(3, 'Đặt tính rồi tính.');
  /* cộng: hai số có năm chữ số, tổng không quá 99 999 */
  const ca = R(21000, 58000), cb = R(11000, 39000);
  /* trừ: hai số có năm chữ số, số bị trừ luôn lớn hơn */
  const ta = R(60000, 99999), tb = R(11000, 49999);
  /* nhân: số có bốn chữ số nhân số có một chữ số */
  const nb = R(2, 9);
  const na = R(1000, Math.min(9999, Math.floor(99999 / nb)));
  /* chia: số có năm chữ số chia hết cho số có một chữ số, thương có bốn chữ số */
  const chb = R(2, 9);
  const thuong = R(Math.ceil(10000 / chb), 9999);
  const cha = thuong * chb;

  const html = '<div class="b81-exp">'
    + `<span>${SP81(ca)} + ${SP81(cb)}</span><span>${SP81(ta)} &minus; ${SP81(tb)}</span>`
    + `<span>${SP81(na)} &times; ${nb}</span><span>${SP81(cha)} : ${chb}</span></div>`
    + '<div class="vrow">' + ART.b81Vc(q, ca, cb, '+') + ART.b81Vc(q, ta, tb, '−') + '</div>'
    + '<div class="b81-row">' + ART.b81Mul(na, nb, q.num(na * nb))
    + ART.b81Div(cha, chb, q.num(thuong)) + '</div>';

  return q.done(html,
    `${SP81(ca)} + ${SP81(cb)} = ${SP81(ca + cb)};  ${SP81(ta)} − ${SP81(tb)} = ${SP81(ta - tb)};  `
    + `${SP81(na)} × ${nb} = ${SP81(na * nb)};  ${SP81(cha)} : ${chb} = ${SP81(thuong)}. `
    + 'Với phép cộng, phép trừ thì viết các chữ số cùng hàng thẳng cột rồi tính từ phải sang trái.');
},

/* ===== tr.124 – Luyện tập 1, Bài 4: cửa hàng văn phòng phẩm bán hộp bút chì màu ===== */
() => {
  const q = Q(4, '');
  const mon = pick(['hộp bút chì màu', 'hộp bút sáp màu', 'hộp màu vẽ', 'quyển vở ô li']);
  const t7 = R(11, 29), k = R(2, 5);
  const cn = t7 * k, ca = t7 + cn;

  const html = `<p class="wordq">Một cửa hàng văn phòng phẩm, thứ Bảy đã bán ${t7} ${mon},
      Chủ nhật bán được số ${mon} gấp ${k} lần thứ Bảy. Hỏi sau hai ngày bán, cửa hàng đó
      bán được bao nhiêu ${mon}?</p>
    <div class="b81-bul">Chủ nhật cửa hàng bán được ${q.num(cn)} ${mon}.</div>
    <div class="b81-bul">Sau hai ngày, cửa hàng bán được ${q.num(ca)} ${mon}.</div>`;

  return q.done(html,
    `Số ${mon} bán được trong ngày Chủ nhật là: ${t7} × ${k} = ${cn} (${mon}). `
    + `Số ${mon} bán được sau hai ngày là: ${t7} + ${cn} = ${ca} (${mon}).`);
},

/* ===== tr.125 – Luyện tập 2, Bài 1: quan sát hai cái cân rồi trả lời câu hỏi ===== */
() => {
  const q = Q(1, 'Quan sát hình rồi trả lời câu hỏi.');
  let duong = pick(QC81_BA), muoi = pick(QC81_HAI);
  const tong = a => a.reduce((x, y) => x + y, 0);
  for (let g = 0; g < 30 && tong(duong) <= tong(muoi); g++){
    duong = pick(QC81_BA);
    muoi = pick(QC81_HAI);
  }
  if (tong(duong) <= tong(muoi)){ duong = [100, 200, 500]; muoi = [200, 200]; }
  const D = tong(duong), M = tong(muoi);

  const html = '<div class="b81-scales">'
    + `<div>${ART.b81Can(duong, 'ĐƯỜNG')}</div><div>${ART.b81Can(muoi, 'MUỐI')}</div></div>`
    + `<div class="b81-line"><span class="b81-let">a)</span>Túi đường cân nặng ${q.num(D)} g.</div>
       <div class="b81-line"><span class="b81-let">b)</span>Túi muối cân nặng ${q.num(M)} g.</div>
       <div class="b81-line"><span class="b81-let">c)</span>Túi đường và túi muối cân nặng
         tất cả ${q.num(D + M)} g.</div>
       <div class="b81-line"><span class="b81-let">d)</span>Túi đường nặng hơn túi muối
         ${q.num(D - M)} g.</div>`;

  return q.done(html,
    'Vật ở đĩa bên này cân nặng bằng tổng các quả cân ở đĩa bên kia. '
    + `a) ${duong.join(' + ')} = ${SP81(D)} (g). b) ${muoi.join(' + ')} = ${SP81(M)} (g). `
    + `c) ${SP81(D)} + ${SP81(M)} = ${SP81(D + M)} (g). `
    + `d) ${SP81(D)} − ${SP81(M)} = ${SP81(D - M)} (g).`);
},

/* ===== tr.125 – Luyện tập 2, Bài 2: bạn Núi đi từ nhà đến trường hết bao nhiêu phút ===== */
() => {
  const q = Q(2, '');
  const bd = 6 * 60 + R(0, 11) * 5;
  const lau = R(3, 11) * 5;
  const kt = bd + lau;
  const ten = pick(['Núi', 'Nam', 'Việt', 'Mai', 'Mi']);
  const h1 = Math.floor(bd / 60), m1 = bd % 60, h2 = Math.floor(kt / 60), m2 = kt % 60;
  const giai = h1 === h2
    ? `Hai đồng hồ cùng chỉ ${h1} giờ; kim phút quay từ vạch ${m1} phút đến vạch ${m2} phút. `
      + `Bạn ${ten} đi hết ${m2} − ${m1} = ${lau} (phút).`
    : m2 === 0
      ? `Từ ${b81Gio(bd)} đến ${b81Gio(kt)} là ${60 - m1} phút. `
        + `Vậy bạn ${ten} đi từ nhà đến trường hết ${lau} phút.`
      : `Từ ${b81Gio(bd)} đến ${h2} giờ là ${60 - m1} phút, từ ${h2} giờ đến ${b81Gio(kt)} `
        + `là ${m2} phút. Bạn ${ten} đi hết ${60 - m1} + ${m2} = ${lau} (phút).`;

  const html = `<p class="wordq">Bạn ${ten} đi học từ nhà lúc ${b81Gio(bd)} và đến trường
      lúc ${b81Gio(kt)}. Hỏi bạn ${ten} đi từ nhà đến trường hết bao nhiêu phút?</p>
    <div class="b81-clocks">
      <div>${ART.b81Clock(Math.floor(bd / 60), bd % 60)}
        <div class="b81-ctime">Lúc rời nhà<br>${b81Gio(bd)}</div></div>
      <div>${ART.b81Clock(Math.floor(kt / 60), kt % 60)}
        <div class="b81-ctime">Lúc đến trường<br>${b81Gio(kt)}</div></div>
    </div>
    <div class="b81-bul">Bạn ${ten} đi từ nhà đến trường hết ${q.num(lau)} phút.</div>`;

  return q.done(html, giai);
},

/* ===== tr.125 – Luyện tập 2, Bài 3: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  /* a) A + B − C */
  const Aa = R(2000, 5000), Ba = R(1000, 3000);
  const Ca = R(1000, Aa + Ba - 1000);
  /* b) A × k : m  (k chia hết cho m) */
  const km = pick([[6, 2], [6, 3], [8, 2], [8, 4], [9, 3], [4, 2]]);
  const Ab = R(1000, 2999);
  /* c) x × (y − z) */
  const hieu = R(2, 9);
  const yc = R(700, 999), zc = yc - hieu, xc = R(200, 900);
  /* d) (a + b) : c – hai số hạng đều có ba chữ số, tổng chia hết cho c */
  const cd = R(2, 9), ad = R(100, 800);
  let bd2 = R(100, 999);
  bd2 += (cd - (ad + bd2) % cd) % cd;
  if (bd2 > 999) bd2 -= cd;
  const sd = ad + bd2, td = sd / cd;

  const html = `<div class="b81-two">
      <div class="b81-line"><span class="b81-let">a)</span>${SP81(Aa)} + ${SP81(Ba)} &minus; ${SP81(Ca)}
        = ${q.num(Aa + Ba)} &minus; ${SP81(Ca)} = ${q.num(Aa + Ba - Ca)}</div>
      <div class="b81-line"><span class="b81-let">b)</span>${SP81(Ab)} &times; ${km[0]} : ${km[1]}
        = ${q.num(Ab * km[0])} : ${km[1]} = ${q.num(Ab * km[0] / km[1])}</div>
      <div class="b81-line"><span class="b81-let">c)</span>${xc} &times; (${yc} &minus; ${zc})
        = ${xc} &times; ${q.num(hieu, 1)} = ${q.num(xc * hieu)}</div>
      <div class="b81-line"><span class="b81-let">d)</span>(${ad} + ${bd2}) : ${cd}
        = ${q.num(sd)} : ${cd} = ${q.num(td)}</div>
    </div>
    <div class="hint-line">Biểu thức có dấu ngoặc thì tính trong ngoặc trước;
      biểu thức chỉ có cộng, trừ (hoặc chỉ có nhân, chia) thì tính từ trái sang phải.</div>`;

  return q.done(html,
    `a) ${SP81(Aa)} + ${SP81(Ba)} = ${SP81(Aa + Ba)};  ${SP81(Aa + Ba)} − ${SP81(Ca)} = ${SP81(Aa + Ba - Ca)}. `
    + `b) ${SP81(Ab)} × ${km[0]} = ${SP81(Ab * km[0])};  ${SP81(Ab * km[0])} : ${km[1]} = ${SP81(Ab * km[0] / km[1])}. `
    + `c) ${yc} − ${zc} = ${hieu};  ${xc} × ${hieu} = ${SP81(xc * hieu)}. `
    + `d) ${ad} + ${bd2} = ${SP81(sd)};  ${SP81(sd)} : ${cd} = ${td}.`);
},

/* ===== tr.125 – Luyện tập 2, Bài 4: diện tích hình vuông, chu vi hình chữ nhật ===== */
() => {
  const q = Q(4, '');
  const canh = R(4, 12), k = R(2, 4);
  const chuviV = canh * 4, dienV = canh * canh;
  const dai = canh * k, chuviN = (canh + dai) * 2;

  const html = `<div class="b81-ask">a) Tính diện tích hình vuông có chu vi ${chuviV} cm.</div>
    <div class="b81-bul">Cạnh hình vuông dài ${q.num(canh)} cm.</div>
    <div class="b81-bul">Diện tích hình vuông là ${q.num(dienV)} <span>cm<sup>2</sup>.</span></div>
    <div class="b81-ask">b) Tính chu vi hình chữ nhật có chiều rộng bằng cạnh hình vuông ở câu a
      và có chiều dài gấp ${k} lần chiều rộng.</div>
    <div class="b81-bul">Chiều rộng hình chữ nhật là ${q.num(canh)} cm.</div>
    <div class="b81-bul">Chiều dài hình chữ nhật là ${q.num(dai)} cm.</div>
    <div class="b81-bul">Chu vi hình chữ nhật là ${q.num(chuviN)} cm.</div>`;

  return q.done(html,
    `a) Cạnh hình vuông là: ${chuviV} : 4 = ${canh} (cm). `
    + `Diện tích hình vuông là: ${canh} × ${canh} = ${dienV} (cm2). `
    + `b) Chiều rộng hình chữ nhật là ${canh} cm, chiều dài là: ${canh} × ${k} = ${dai} (cm). `
    + `Chu vi hình chữ nhật là: (${canh} + ${dai}) × 2 = ${chuviN} (cm).`);
},
];
