/* ==================== BÀI 57: CHIA SỐ CÓ BỐN CHỮ SỐ CHO SỐ CÓ MỘT CHỮ SỐ
   (SGK tập 2, tr.46, 47, 48, 49, 50, 51)
   hoạt động tr.47 : bài 1 (Tính – chia hết), bài 2 (nhà máy sản xuất bánh răng),
                     bài 3 (Số ? – hai trang trại nuôi vịt)
   hoạt động tr.49–50 : bài 1 (a) Tính – chia có dư; b) Số ? – bảng phép chia),
                     bài 2 (đội quân của tướng Cao Lỗ), bài 3 (tuổi thọ kiến chúa và ve sầu)
   luyện tập tr.50–51 : bài 1 (Đặt tính rồi tính), bài 2 (Tính nhẩm theo mẫu),
                     bài 3 (>, <, =), bài 4 (Số ? – ba vệ tinh bay quanh thiên thể)
========================================================================================= */

/* viết số có bốn chữ số theo kiểu sách: 6 408 */
const NSP57 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* bánh răng */
ART.b57Gear = col => {
  let t = '';
  for (let i = 0; i < 10; i++)
    t += `<rect x="45" y="2" width="10" height="18" rx="2.5" fill="${col}"
      stroke="#8a6a1e" stroke-width="1.6" transform="rotate(${i * 36} 50 50)"/>`;
  return `<svg viewBox="0 0 100 100" class="b57-art">${t}
    <circle cx="50" cy="50" r="33" fill="${col}" stroke="#8a6a1e" stroke-width="2.4"/>
    <circle cx="50" cy="50" r="12" fill="#fff" stroke="#8a6a1e" stroke-width="2.4"/></svg>`;
};

/* con vịt bơi */
ART.b57Duck = () => `<svg viewBox="0 0 96 72" class="b57-art">
  <path d="M4 62q42 9 88 0" stroke="#5aa9e6" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="42" cy="48" rx="30" ry="15" fill="#f4f4f7" stroke="#8b8b96" stroke-width="2"/>
  <path d="M18 46q16-12 34-3" stroke="#8b8b96" stroke-width="2" fill="none"/>
  <path d="M62 42q6-6 4-12" stroke="#1e6b42" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="68" cy="24" r="12" fill="#2f8f5b" stroke="#1e6b42" stroke-width="2"/>
  <path d="M78 22h13l-5 7h-8z" fill="#f2a93b" stroke="#c07d18" stroke-width="1.6"/>
  <circle cx="71" cy="21" r="1.9" fill="#1b1b2b"/></svg>`;

/* ba vệ tinh bay quanh một thiên thể */
ART.b57Orbit = (labA, labB, labC) => {
  const sat = (x, y, c) => `<g transform="translate(${x} ${y})">
    <rect x="-10" y="-2.6" width="20" height="5.2" rx="1.6" fill="#9aa4b2" stroke="#5d6672" stroke-width="1.2"/>
    <rect x="-3.5" y="-5" width="7" height="10" rx="1.6" fill="${c}" stroke="#7a2b2b" stroke-width="1.2"/></g>`;
  return `<svg viewBox="0 0 250 250" class="b57-orb">
    <circle cx="125" cy="125" r="118" fill="none" stroke="#6b7280" stroke-width="1.5"/>
    <circle cx="125" cy="125" r="88" fill="none" stroke="#6b7280" stroke-width="1.5"/>
    <circle cx="125" cy="125" r="58" fill="none" stroke="#6b7280" stroke-width="1.5"/>
    <circle cx="125" cy="125" r="32" fill="#e79a6a" stroke="#c2703c" stroke-width="2"/>
    <ellipse cx="121" cy="123" rx="13" ry="7" fill="#f7cba6"/>
    ${sat(183, 125, '#d9534f')}
    <text x="196" y="120" font-size="13" font-weight="800" fill="#1b1b2b">A</text>
    <text x="128" y="60" font-size="13" font-weight="700" fill="#1b1b2b">${labA}</text>
    ${sat(63, 63, '#d9534f')}
    <text x="46" y="52" font-size="13" font-weight="800" fill="#1b1b2b">B</text>
    <text x="96" y="26" font-size="13" font-weight="700" fill="#1b1b2b">${labB}</text>
    ${sat(125, 243, '#d9534f')}
    <text x="100" y="247" font-size="13" font-weight="800" fill="#1b1b2b">C</text>
    <text x="140" y="247" font-size="13" font-weight="700" fill="#1b1b2b">${labC}</text></svg>`;
};

/* khung phép chia dạng cột như SGK */
ART.b57Frame = (a, b, quo, rem) => `<div class="b57-div">
  <span class="b57-a">${NSP57(a)}</span><span class="b57-b">${b}</span>
  <span class="b57-c">${quo}</span>
  <span class="b57-d">${rem || ''}</span></div>`;

BANKS.b57 = [

/* ===== tr.47 – Bài 1: Tính (chia hết) ===== */
() => {
  const q = Q(1, 'Tính.');
  const items = [];
  for (let g = 0; g < 200 && items.length < 3; g++){
    const b = R(2, 9);
    const t = R(Math.ceil(1000 / b), Math.floor(9999 / b));
    const a = t * b;
    if (!items.some(x => x.a === a)) items.push({a, b, t});
  }
  const FB = [{a: 6393, b: 3, t: 2131}, {a: 6606, b: 6, t: 1101}, {a: 3652, b: 4, t: 913}];
  while (items.length < 3) items.push(FB[items.length]);
  const html = '<div class="b57-row">'
    + items.map(it => ART.b57Frame(it.a, it.b, q.num(it.t))).join('') + '</div>';
  return q.done(html,
    items.map(x => `${NSP57(x.a)} : ${x.b} = ${NSP57(x.t)}`).join(';  '));
},

/* ===== tr.47 – Bài 2: nhà máy sản xuất bánh răng ===== */
() => {
  const q = Q(2, '');
  const ngay = R(2, 9);
  const moi = R(Math.ceil(1000 / ngay), Math.floor(9999 / ngay));
  const tong = moi * ngay;
  return q.done(`<div class="b57-side">
      <div><p class="wordq">Một nhà máy sản xuất được ${NSP57(tong)} bánh răng trong ${ngay} ngày.
        Hỏi mỗi ngày nhà máy sản xuất được bao nhiêu bánh răng? Biết rằng số bánh răng
        nhà máy sản xuất được trong mỗi ngày là như nhau.</p></div>
      <div>${ART.b57Gear('#e0b13c')}</div></div>
    <div class="bullet">Mỗi ngày nhà máy sản xuất được ${q.num(moi)} bánh răng.</div>`,
    `${NSP57(tong)} : ${ngay} = ${NSP57(moi)} (bánh răng)`);
},

/* ===== tr.47 – Bài 3: Số ? – hai trang trại nuôi vịt ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const lan = R(2, 5);
  const hai = R(Math.ceil(1000 / (lan * 100)), Math.floor(9999 / (lan * 100))) * 100;
  const mot = hai * lan;
  return q.done(`<p class="wordq">Có hai trang trại nuôi vịt, trang trại thứ nhất có ${NSP57(mot)} con vịt,
      số con vịt ở trang trại thứ hai bằng số con vịt ở trang trại thứ nhất giảm đi ${lan} lần.</p>
    <div class="bullet">a) Trang trại thứ hai có ${q.num(hai)} con vịt.</div>
    <div class="bullet">b) Cả hai trang trại có ${q.num(mot + hai)} con vịt.</div>
    <div class="art-row">${ART.b57Duck()}${ART.b57Duck()}${ART.b57Duck()}</div>`,
    `a) ${NSP57(mot)} : ${lan} = ${NSP57(hai)} (con);  `
      + `b) ${NSP57(mot)} + ${NSP57(hai)} = ${NSP57(mot + hai)} (con)`);
},

/* ===== tr.49 – Bài 1: a) Tính (chia có dư); b) Số ? (bảng phép chia) ===== */
() => {
  const q = Q(1, 'a) Tính.');
  const items = [];
  for (let g = 0; g < 300 && items.length < 2; g++){
    const b = R(3, 9), r = R(1, b - 1);
    const t = R(Math.ceil((1000 - r) / b), Math.floor((9999 - r) / b));
    const a = t * b + r;
    if (a >= 1000 && a <= 9999 && !items.some(x => x.a === a)) items.push({a, b, t, r});
  }
  const FB = [{a: 6729, b: 6, t: 1121, r: 3}, {a: 4163, b: 8, t: 520, r: 3}];
  while (items.length < 2) items.push(FB[items.length]);
  const frames = '<div class="b57-row">' + items.map(it =>
    ART.b57Frame(it.a, it.b, q.num(it.t), `(dư ${q.num(it.r, 1)})`)).join('') + '</div>';
  const head = ['Phép chia', 'Số bị chia', 'Số chia', 'Thương', 'Số dư'];
  const rows = items.map(it => `<tr><td>${NSP57(it.a)} : ${it.b}</td>
    <td>${q.num(it.a)}</td><td>${q.num(it.b, 1)}</td>
    <td>${q.num(it.t)}</td><td>${q.num(it.r, 1)}</td></tr>`).join('');
  return q.done(`${frames}
    <div class="sub-lbl">b) <span class="tag">Số</span> ?</div>
    <div class="tbl-wrap"><table class="tbl amber">
      <tr>${head.map(x => `<th>${x}</th>`).join('')}</tr>${rows}</table></div>`,
    items.map(x => `${NSP57(x.a)} : ${x.b} = ${NSP57(x.t)} (dư ${x.r})`).join(';  '));
},

/* ===== tr.50 – Bài 2: đội quân của tướng Cao Lỗ ===== */
() => {
  const q = Q(2, '');
  let b = R(4, 9), r = R(1, b - 1);
  let t = R(Math.ceil((1000 - r) / b), Math.floor((9999 - r) / b));
  let a = t * b + r;
  if (a < 1000 || a > 9999){ b = 7; r = 1; t = 901; a = 6308; }
  return q.done(`<p class="wordq">Đội quân của tướng Cao Lỗ có ${NSP57(a)} người.
      Tướng quân muốn chia số người ấy thành các nhóm nhỏ, mỗi nhóm ${b} người.
      Hỏi có thể chia thành bao nhiêu nhóm và còn dư mấy người?</p>
    <div class="bullet">Có thể chia thành ${q.num(t)} nhóm và còn dư ${q.num(r, 1)} người.</div>`,
    `${NSP57(a)} : ${b} = ${NSP57(t)} (dư ${r})`);
},

/* ===== tr.50 – Bài 3: tuổi thọ của kiến chúa và ve sầu ===== */
() => {
  const q = Q(3, '');
  const ve = R(1200, 4900);
  const kien = ve * 2;
  return q.done(`<p class="wordq">a) Một con kiến chúa có tuổi thọ là ${NSP57(kien)} ngày
      và gấp đôi tuổi thọ của ve sầu. Hỏi ve sầu có tuổi thọ là bao nhiêu ngày?</p>
    <div class="bullet">Ve sầu có tuổi thọ là ${q.num(ve)} ngày.</div>`,
    `${NSP57(kien)} : 2 = ${NSP57(ve)} (ngày)`);
},

/* ===== tr.50 – Luyện tập, Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const items = [];
  for (let g = 0; g < 200 && items.length < 2; g++){
    const b = R(2, 9);
    const t = R(Math.ceil(1000 / b), Math.floor(9999 / b));
    const a = t * b;
    if (!items.some(x => x.a === a)) items.push({a, b, t, r: 0});
  }
  const FB1 = [{a: 5025, b: 5, t: 1005, r: 0}, {a: 3296, b: 4, t: 824, r: 0}];
  while (items.length < 2) items.push(FB1[items.length]);
  const du = [];
  for (let g = 0; g < 300 && du.length < 2; g++){
    const b = R(2, 9), r = R(1, b - 1);
    const t = R(Math.ceil((1000 - r) / b), Math.floor((9999 - r) / b));
    const a = t * b + r;
    if (a >= 1000 && a <= 9999 && !du.some(x => x.a === a)) du.push({a, b, t, r});
  }
  const FB2 = [{a: 2487, b: 2, t: 1243, r: 1}, {a: 7369, b: 8, t: 921, r: 1}];
  while (du.length < 2) du.push(FB2[du.length]);
  const all = [items[0], items[1], du[0], du[1]];
  const line = it => `<div class="eq">${NSP57(it.a)} <span class="op">:</span> ${it.b}</div>`;
  const frame = it => ART.b57Frame(it.a, it.b, q.num(it.t),
    it.r ? `(dư ${q.num(it.r, 1)})` : '');
  return q.done(`<div class="eq-list">${all.map(line).join('')}</div>
      <div class="b57-row">${all.map(frame).join('')}</div>`,
    all.map(x => `${NSP57(x.a)} : ${x.b} = ${NSP57(x.t)}` + (x.r ? ` (dư ${x.r})` : '')).join(';  '));
},

/* ===== tr.50 – Luyện tập, Bài 2: Tính nhẩm (theo mẫu) ===== */
() => {
  const q = Q(2, 'Tính nhẩm (theo mẫu).');
  const mb = R(2, 4), mq = R(1, Math.floor(9 / mb)), ma = mb * mq;
  const rows = [];
  for (let g = 0; g < 200 && rows.length < 3; g++){
    const b = rows.length ? R(2, 9) : R(2, 4);
    const t = rows.length ? R(1, Math.floor(9 / b)) : R(2, Math.floor(9 / b));
    const a = b * t;
    if (!rows.some(x => x.a === a && x.b === b)) rows.push({a, b, t});
  }
  const FB = [{a: 7, b: 7, t: 1}, {a: 9, b: 3, t: 3}, {a: 8, b: 4, t: 2}];
  while (rows.length < 3) rows.push(FB[rows.length]);
  const L = ['a)', 'b)', 'c)'];
  const html = noteBox(`Mẫu:  ${ma} 000 : ${mb} = ?<br>Nhẩm:  ${ma} nghìn : ${mb} = ${mq} nghìn<br>
      ${ma} 000 : ${mb} = ${NSP57(mq * 1000)}`)
    + '<div class="b57-nh">' + rows.map((r, i) =>
      `<div class="fill-line"><span class="b57-lbl">${L[i]}</span>
        ${r.a} nghìn : ${r.b} = ${q.num(r.t, 1)} nghìn;&nbsp;&nbsp;
        ${r.a} 000 : ${r.b} = ${q.num(r.t * 1000)}</div>`).join('') + '</div>';
  return q.done(html,
    rows.map(r => `${NSP57(r.a * 1000)} : ${r.b} = ${NSP57(r.t * 1000)}`).join(';  '));
},

/* ===== tr.50–51 – Luyện tập, Bài 3: >, <, = ? ===== */
() => {
  const q = Q(3, '&gt; ; &lt; ; = ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  /* a) một phép chia số tròn nghìn so với một số */
  const ba = R(2, 9), ta = R(1, Math.floor(9 / ba)), la = ta * 1000;
  const ra = pick([la, la + R(1, 600), la - R(1, 600)]);
  /* b) một phép chia so với một phép nhân */
  const bb = R(2, 9), tb = R(1, Math.floor(9 / bb)), lb = tb * 1000;
  const nb = R(2, 5), mb = R(1, 9) * 100;
  /* c) hai phép chia cùng số chia */
  const bc = R(2, 9);
  const t1 = R(Math.ceil(1000 / bc), Math.floor(9999 / bc));
  const t2 = pick([t1, R(Math.ceil(1000 / bc), Math.floor(9999 / bc))]);
  const a1 = t1 * bc, a2 = t2 * bc;
  const row = (lbl, l, s, r) => `<div class="cmp-row"><span class="side">${lbl} ${l}</span>
    ${q.sign(s)}<span class="side">${r}</span></div>`;
  return q.done(`${row('a)', `${NSP57(ba * ta * 1000)} : ${ba}`, cmp(la, ra), NSP57(ra))}
      ${row('b)', `${NSP57(bb * tb * 1000)} : ${bb}`, cmp(lb, mb * nb), `${NSP57(mb)} × ${nb}`)}
      ${row('c)', `${NSP57(a1)} : ${bc}`, cmp(t1, t2), `${NSP57(a2)} : ${bc}`)}
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    `a) ${NSP57(la)} và ${NSP57(ra)};  b) ${NSP57(lb)} và ${NSP57(mb * nb)};  `
      + `c) ${NSP57(t1)} và ${NSP57(t2)}`);
},

/* ===== tr.51 – Luyện tập, Bài 4: Số ? – ba vệ tinh bay quanh một thiên thể ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const A = R(340, 900);
  const B = A * 3, C = A * 4;
  return q.done(`<div class="b57-side">
      <div><p class="wordq">Có ba vệ tinh bay quanh một thiên thể. Vệ tinh B bay một vòng được
          ${NSP57(B)} km, dài gấp 3 lần một vòng của vệ tinh A.</p>
        <div class="bullet">Vậy vệ tinh A bay một vòng được ${q.num(A)} km.</div>
        <p class="wordq">Vệ tinh C bay một vòng dài gấp 4 lần một vòng của vệ tinh A.</p>
        <div class="bullet">Vậy vệ tinh C bay một vòng được ${q.num(C)} km.</div></div>
      <div>${ART.b57Orbit('? km', NSP57(B) + ' km', '? km')}</div></div>`,
    `${NSP57(B)} : 3 = ${NSP57(A)} (km);  ${NSP57(A)} × 4 = ${NSP57(C)} (km)`);
},
];
