/*CSS
.b71-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:14px 30px;margin:10px 0}
.b71-div{display:inline-grid;grid-template-columns:auto auto;font-size:21px;font-weight:800;line-height:1.5}
.b71-a{grid-area:1/1;text-align:right;padding:0 10px 4px 0;white-space:nowrap}
.b71-b{grid-area:1/2;border-left:2.6px solid #444;border-bottom:2.6px solid #444;padding:0 30px 4px 10px}
.b71-c{grid-area:2/2;border-left:2.6px solid #444;padding:6px 10px 0 10px}
.b71-d{grid-area:2/1;text-align:right;padding:6px 10px 0 0;font-size:16px;font-weight:700;color:#d63384;white-space:nowrap}
.b71-div .qin{width:96px !important;height:32px;font-size:17px;padding:0 3px}
.b71-d .qin{width:34px !important;height:28px;font-size:15px}
.b71-let{color:#d63384;font-weight:800;margin-right:6px}
.b71-sub{font-weight:700;margin:9px 0 3px}
.b71-line{font-size:18px;font-weight:700;line-height:2.05;margin:2px 0}
.b71-nham{font-size:16px;font-weight:700;line-height:2;margin:0 0 6px 26px;color:#4a4460}
.b71-exp{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 16px;margin:8px 0}
.b71-exp > span{background:#fde7c8;border:2px solid #e0a93c;border-radius:12px;padding:5px 16px;
  font-size:18px;font-weight:800;white-space:nowrap}
.b71-wide .picker{flex-wrap:wrap;justify-content:center;margin:5px 0 0}
.b71-wide .pk{width:auto;min-width:36px;padding:0 10px;font-size:14px}
.b71-side{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 16px}
.b71-side > div:first-child{flex:1 1 280px;min-width:230px}
.b71-art{width:160px;height:auto;display:block;margin:0 auto}
CSS*/

/* ==================== BÀI 71: CHIA SỐ CÓ NĂM CHỮ SỐ CHO SỐ CÓ MỘT CHỮ SỐ
   (SGK tập 2 – tr.97, 98, 99, 100)
   khám phá tr.97      : 17 486 : 2 = 8 743 (phần lí thuyết, không ra bài tập)
   hoạt động tr.98     : bài 1 (Tính – hai phép chia hết),
                         bài 2 (Đặt tính rồi tính – ba phép chia hết),
                         bài 3 (kho muối chia đều vào các ô tô)
   khám phá tr.98–99   : 10 450 : 3 = 3 483 (dư 1) — phép chia có dư (lí thuyết)
   hoạt động tr.99     : bài 1 (a) Tính (A), (B); b) Số ? – bảng phép chia có dư),
                         bài 2 (Đặt tính rồi tính – hai phép chia có dư),
                         bài 3 (viên thuốc đóng vào các vỉ)
   luyện tập tr.99–100 : bài 1 (Tính nhẩm theo mẫu), bài 2 (Số ? – bảng "Viết là"),
                         bài 3 (a) Đặt tính rồi tính; b) kết quả lớn nhất, bé nhất),
                         bài 4 (bút sáp màu đóng vào các hộp)
========================================================================================= */

/* viết số theo kiểu sách: 17 486 */
const NSP71 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* khung phép chia dạng cột: số bị chia | số chia — thương ở dưới, (dư r) bên trái */
ART.b71Frame = (a, b, quo, rem) => `<div class="b71-div">
  <span class="b71-a">${NSP71(a)}</span><span class="b71-b">${b}</span>
  <span class="b71-c">${quo}</span>
  <span class="b71-d">${rem || ''}</span></div>`;

/* một phép chia hết: số bị chia có năm chữ số, thương có bốn chữ số */
function het71(){
  const b = R(2, 9);
  const lo = Math.max(1000, Math.ceil(10000 / b));
  const hi = Math.min(9999, Math.floor(99999 / b));
  const t = R(lo, hi);
  return {b, t, r: 0, a: t * b};
}

/* một phép chia có dư: số bị chia có năm chữ số, thương có bốn chữ số */
function du71(){
  const b = R(3, 9);
  const r = R(1, b - 1);
  const lo = Math.max(1000, Math.ceil((10000 - r) / b));
  const hi = Math.min(9999, Math.floor((99999 - r) / b));
  const t = R(lo, hi);
  return {b, t, r, a: t * b + r};
}

/* ---- xe tải chở muối ---- */
ART.b71Truck = () => `<svg viewBox="0 0 200 120" class="b71-art">
  <rect x="10" y="34" width="104" height="52" rx="5" fill="#f0f2f6" stroke="#5b6478" stroke-width="2.6"/>
  <path d="M18 46h88M18 60h88M18 74h88" stroke="#c3cad6" stroke-width="2.2"/>
  <path d="M118 48h34l24 24v14h-58z" fill="#2aa7de" stroke="#1d6f97" stroke-width="2.6"/>
  <rect x="124" y="54" width="24" height="16" rx="3" fill="#d9eef9" stroke="#1d6f97" stroke-width="2"/>
  <path d="M6 86h182" stroke="#5b6478" stroke-width="3.4" stroke-linecap="round"/>
  <circle cx="46" cy="96" r="12" fill="#4a4a55"/><circle cx="46" cy="96" r="5" fill="#b9bcc9"/>
  <circle cx="150" cy="96" r="12" fill="#4a4a55"/><circle cx="150" cy="96" r="5" fill="#b9bcc9"/>
  <text x="62" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="#4a4460">MUỐI</text>
</svg>`;

/* ---- vỉ thuốc ---- */
ART.b71Pills = () => `<svg viewBox="0 0 200 120" class="b71-art">
  <g transform="rotate(-8 100 60)">
    <rect x="26" y="26" width="150" height="66" rx="9" fill="#cfe6f7" stroke="#4a7fa5" stroke-width="2.6"/>
    ${[0, 1, 2, 3].map(i => [0, 1].map(j =>
      `<ellipse cx="${50 + i * 34}" cy="${47 + j * 26}" rx="13" ry="9.5" fill="#fff"
        stroke="#4a7fa5" stroke-width="1.8"/>`).join('')).join('')}
  </g>
</svg>`;

/* ---- hộp bút sáp màu ---- */
ART.b71Crayons = () => {
  const C = ['#5fbb46', '#7a4bbd', '#f0703a', '#f7d117', '#2aa7de', '#e8478f'];
  const bt = C.map((c, i) => `<g transform="translate(${34 + i * 21},22)">
      <path d="M0 0l9 16H-9z" fill="${c}"/>
      <rect x="-9" y="16" width="18" height="34" fill="${c}"/>
    </g>`).join('');
  return `<svg viewBox="0 0 200 120" class="b71-art">${bt}
    <rect x="18" y="46" width="164" height="58" rx="7" fill="#fff" stroke="#9aa4b5" stroke-width="2.6"/>
    <rect x="30" y="58" width="140" height="20" rx="10" fill="#fbe6b4"/>
    <text x="100" y="96" text-anchor="middle" font-size="17" font-weight="800" fill="#e8483f">BÚT SÁP</text>
  </svg>`;
};

BANKS.b71 = [

/* ===== tr.98 – Hoạt động, Bài 1: Tính (hai phép chia hết) ===== */
() => {
  const q = Q(1, 'Tính.');
  const A = het71(), B = het71();
  const html = `<div class="b71-row">
      ${ART.b71Frame(A.a, A.b, q.num(A.t))}
      ${ART.b71Frame(B.a, B.b, q.num(B.t))}
    </div>
    <div class="hint-line">Chia lần lượt từ trái sang phải.</div>`;
  return q.done(html,
    `${NSP71(A.a)} : ${A.b} = ${NSP71(A.t)};  ${NSP71(B.a)} : ${B.b} = ${NSP71(B.t)}`);
},

/* ===== tr.98 – Hoạt động, Bài 2: Đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const its = [het71(), het71(), het71()];
  const html = '<div class="b71-exp">'
    + its.map(it => `<span>${NSP71(it.a)} : ${it.b}</span>`).join('') + '</div>'
    + '<div class="b71-row">'
    + its.map(it => ART.b71Frame(it.a, it.b, q.num(it.t))).join('') + '</div>';
  return q.done(html,
    its.map(it => `${NSP71(it.a)} : ${it.b} = ${NSP71(it.t)}`).join(';  '));
},

/* ===== tr.98 – Hoạt động, Bài 3: kho muối chia đều vào các ô tô ===== */
() => {
  const q = Q(3, '');
  const b = R(2, 9);
  const lo = Math.max(1000, Math.ceil(10000 / b));
  const hi = Math.min(9999, Math.floor(99999 / b));
  const moi = R(lo, hi);
  const tong = moi * b;
  const html = `<div class="b71-side">
      <div><p class="wordq">Một kho chứa ${NSP71(tong)} kg muối. Người ta chia đều số muối đó
        vào ${b} ô tô để chở lên miền núi. Hỏi mỗi ô tô chở bao nhiêu ki-lô-gam muối?</p></div>
      <div>${ART.b71Truck()}</div></div>
    <div class="bullet">Mỗi ô tô chở ${q.num(moi)} kg muối.</div>`;
  return q.done(html, `${NSP71(tong)} : ${b} = ${NSP71(moi)} (kg)`);
},

/* ===== tr.99 – Hoạt động, Bài 1: a) Tính  b) Số ? (bảng phép chia có dư) ===== */
() => {
  const q = Q(1, 'a) Tính.');
  const A = du71(), B = du71();
  const frames = `<div class="b71-row">
      <div><div class="b71-sub" style="text-align:center">(A)</div>
        ${ART.b71Frame(A.a, A.b, q.num(A.t), `(dư ${q.num(A.r, 1)})`)}</div>
      <div><div class="b71-sub" style="text-align:center">(B)</div>
        ${ART.b71Frame(B.a, B.b, q.num(B.t), `(dư ${q.num(B.r, 1)})`)}</div>
    </div>`;
  const row = (nhan, it) => `<tr><td>(${nhan})</td><td>${q.num(it.a)}</td><td>${q.num(it.b, 1)}</td>
    <td>${q.num(it.t)}</td><td>${q.num(it.r, 1)}</td></tr>`;
  const bang = `<div class="b71-sub">b) <span class="tag">Số</span> ?</div>
    <div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Phép chia</th><th>Số bị chia</th><th>Số chia</th><th>Thương</th><th>Số dư</th></tr>
      ${row('A', A)}${row('B', B)}</table></div>`;
  return q.done(frames + bang,
    `(A) ${NSP71(A.a)} : ${A.b} = ${NSP71(A.t)} (dư ${A.r});  `
    + `(B) ${NSP71(B.a)} : ${B.b} = ${NSP71(B.t)} (dư ${B.r})`);
},

/* ===== tr.99 – Hoạt động, Bài 2: Đặt tính rồi tính (phép chia có dư) ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const its = [du71(), du71()];
  const html = '<div class="b71-exp">'
    + its.map(it => `<span>${NSP71(it.a)} : ${it.b}</span>`).join('') + '</div>'
    + '<div class="b71-row">'
    + its.map(it => ART.b71Frame(it.a, it.b, q.num(it.t), `(dư ${q.num(it.r, 1)})`)).join('')
    + '</div>';
  return q.done(html,
    its.map(it => `${NSP71(it.a)} : ${it.b} = ${NSP71(it.t)} (dư ${it.r})`).join(';  '));
},

/* ===== tr.99 – Hoạt động, Bài 3: viên thuốc đóng vào các vỉ ===== */
() => {
  const q = Q(3, '');
  const it = du71();
  const html = `<div class="b71-side">
      <div><p class="wordq">Có ${NSP71(it.a)} viên thuốc, người ta đóng vào các vỉ,
        mỗi vỉ ${it.b} viên thuốc. Hỏi đóng được nhiều nhất bao nhiêu vỉ thuốc
        và còn thừa ra mấy viên?</p></div>
      <div>${ART.b71Pills()}</div></div>
    <div class="bullet">Đóng được nhiều nhất ${q.num(it.t)} vỉ thuốc.</div>
    <div class="bullet">Còn thừa ra ${q.num(it.r, 1)} viên thuốc.</div>`;
  return q.done(html,
    `${NSP71(it.a)} : ${it.b} = ${NSP71(it.t)} (dư ${it.r}) nên đóng được ${NSP71(it.t)} vỉ, `
    + `thừa ${it.r} viên.`);
},

/* ===== tr.99 – Luyện tập, Bài 1: Tính nhẩm (theo mẫu) ===== */
() => {
  const q = Q(1, 'Tính nhẩm (theo mẫu).');
  const its = [];
  for (let g = 0; g < 200 && its.length < 3; g++){
    const b = R(2, 9), y = R(2, 9), X = b * y;
    if (X < 12 || X > 99) continue;
    if (its.some(o => o.X === X && o.b === b)) continue;
    its.push({b, y, X});
  }
  const FB = [{b: 3, y: 7, X: 21}, {b: 4, y: 6, X: 24}, {b: 7, y: 8, X: 56},
    {b: 5, y: 3, X: 15}, {b: 6, y: 8, X: 48}, {b: 8, y: 9, X: 72}];
  for (let k = 0; k < FB.length && its.length < 3; k++){
    const o = FB[k];
    if (!its.some(x => x.X === o.X && x.b === o.b)) its.push(o);
  }
  const L = ['a)', 'b)', 'c)'];
  const html = noteBox('Mẫu:  15 000 : 5 = ?<br>Nhẩm:  15 nghìn : 5 = 3 nghìn<br>'
      + '15 000 : 5 = 3 000')
    + its.map((it, i) => `<div class="b71-line"><span class="b71-let">${L[i]}</span>
        ${NSP71(it.X * 1000)} <span class="op">:</span> ${it.b}</div>
      <div class="b71-nham">Nhẩm: ${it.X} nghìn : ${it.b} = ${q.num(it.y, 1)} nghìn</div>
      <div class="b71-nham">${NSP71(it.X * 1000)} : ${it.b} = ${q.num(it.y * 1000)}</div>`).join('');
  return q.done(html,
    its.map(it => `${NSP71(it.X * 1000)} : ${it.b} = ${NSP71(it.y * 1000)}`).join(';  '));
},

/* ===== tr.100 – Luyện tập, Bài 2: Số ? (bảng "Viết là") ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const M = du71(), N = du71();
  const html = `<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số bị chia</th><th>Số chia</th><th>Thương</th><th>Số dư</th><th>Viết là</th></tr>
      <tr><td>${NSP71(M.a)}</td><td>${M.b}</td><td>${NSP71(M.t)}</td><td>${M.r}</td>
        <td>${NSP71(M.a)} : ${M.b} = ${NSP71(M.t)} (dư ${M.r})</td></tr>
      <tr><td>${NSP71(N.a)}</td><td>${N.b}</td><td>${q.num(N.t)}</td><td>${q.num(N.r, 1)}</td>
        <td>${NSP71(N.a)} : ${N.b} = ${q.num(N.t)} (dư ${q.num(N.r, 1)})</td></tr>
    </table></div>
    <div class="hint-line">Dòng thứ nhất là dòng mẫu đã điền sẵn.</div>`;
  return q.done(html, `${NSP71(N.a)} : ${N.b} = ${NSP71(N.t)} (dư ${N.r})`);
},

/* ===== tr.100 – Luyện tập, Bài 3: a) Đặt tính rồi tính  b) lớn nhất, bé nhất ===== */
() => {
  const q = Q(3, 'a) Đặt tính rồi tính.');
  const its = [];
  for (let g = 0; g < 300 && its.length < 3; g++){
    const it = het71();
    if (!its.some(x => x.t === it.t)) its.push(it);
  }
  while (its.length < 3){
    let t = 9050;
    for (let k = 0; k < 80 && its.some(x => x.t === t); k++) t += 7;
    its.push({b: 5, t, r: 0, a: t * 5});
  }
  const nhan = it => `${NSP71(it.a)} : ${it.b}`;
  const opts = its.map(nhan);
  const sx = its.slice().sort((x, y) => x.t - y.t);
  const html = '<div class="b71-exp">'
      + its.map(it => `<span>${nhan(it)}</span>`).join('') + '</div>'
    + '<div class="b71-row">'
      + its.map(it => ART.b71Frame(it.a, it.b, q.num(it.t))).join('') + '</div>'
    + `<div class="b71-sub">b) Trong các phép tính ở câu a:</div>
       <div class="fill-line b71-wide">&ndash; Phép tính có kết quả lớn nhất:
         ${q.pick(nhan(sx[2]), opts)}</div>
       <div class="fill-line b71-wide">&ndash; Phép tính có kết quả bé nhất:
         ${q.pick(nhan(sx[0]), opts)}</div>`;
  return q.done(html,
    its.map(it => `${nhan(it)} = ${NSP71(it.t)}`).join(';  ')
    + `. Lớn nhất: ${NSP71(sx[2].t)};  bé nhất: ${NSP71(sx[0].t)}.`);
},

/* ===== tr.100 – Luyện tập, Bài 4: bút sáp màu đóng vào các hộp ===== */
() => {
  const q = Q(4, '');
  const b = R(2, 9);
  const m = R(Math.ceil(10 / b), Math.floor(99 / b));
  const hop = m * 1000;
  const but = hop * b;
  const html = `<div class="b71-side">
      <div><p class="wordq">Có ${NSP71(but)} bút sáp màu. Người ta đóng hết số bút sáp màu đó
        vào các hộp, mỗi hộp ${b} bút sáp. Hỏi đóng được tất cả bao nhiêu hộp bút sáp màu?</p></div>
      <div>${ART.b71Crayons()}</div></div>
    <div class="bullet">Đóng được tất cả ${q.num(hop)} hộp bút sáp màu.</div>`;
  return q.done(html, `${NSP71(but)} : ${b} = ${NSP71(hop)} (hộp)`);
},
];
