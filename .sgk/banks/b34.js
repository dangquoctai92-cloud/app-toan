/* ==================== BÀI 34: THỰC HÀNH VÀ TRẢI NGHIỆM VỚI CÁC ĐƠN VỊ
   MI-LI-MÉT, GAM, MI-LI-LÍT, ĐỘ C (SGK tr.93, 94) ====================
   hoạt động tr.93 : bài 1, 2, 3, 4
   hoạt động tr.94 : bài 1, 2, 3
================================================================================ */

/* đồ vật đặt trên thước có vạch mi-li-mét, kèm mũi tên đo độ dài */
ART.b34Do = (kind, mm) => {
  const S = 4, w = mm * S, x0 = 30, x1 = x0 + w, H = 152, Y = 90;
  const cm = Math.ceil(mm / 10) + 1;
  const rulerWidth = cm * 10 * S, W = x0 + rulerWidth + 30;
  let rk = '';
  for (let i = 0; i <= cm * 10; i++){
    const x = (x0 + i * S).toFixed(1), big = i % 10 === 0;
    rk += `<path d="M${x} ${Y}v${big ? 13 : (i % 5 ? 5 : 9)}" stroke="#7a6a52" stroke-width="1.2"/>`;
    if (big) rk += `<text x="${x}" y="${Y + 24}" text-anchor="middle" font-size="10" fill="#5a4c38">${i / 10}</text>`;
  }
  let obj = '';
  const cx = (x0 + x1) / 2;
  if (kind === 'xu') obj = `<circle cx="${cx}" cy="${Y - w / 2}" r="${w / 2}" fill="#f0cf72" stroke="#b08a22" stroke-width="2.4"/>
      <circle cx="${cx}" cy="${Y - w / 2}" r="${w / 2 - 5}" fill="none" stroke="#b08a22" stroke-width="1.4"/>
      <text x="${cx}" y="${Y + 4 - w / 2}" text-anchor="middle" font-size="11" font-weight="700" fill="#8a6a12">1000</text>`;
  else if (kind === 'kep') obj = `<path d="M${x0} ${Y}V${Y - 38}h${w}v38z" fill="#2f8fbd" stroke="#1c6285" stroke-width="2.4"/>
      <path d="M${x0 + 6} ${Y - 38}l${w - 12} -20M${x0 + 6} ${Y - 28}l${w - 12} -20"
        fill="none" stroke="#9fc9dd" stroke-width="3"/>`;
  else obj = `<rect x="${x0}" y="${Y - 36}" width="${w * .62}" height="36" fill="#bcd9f0" stroke="#5b86bd" stroke-width="2.2"/>
      <rect x="${x0 + w * .62}" y="${Y - 36}" width="${w * .1}" height="36" fill="#fff" stroke="#5b86bd" stroke-width="2.2"/>
      <rect x="${x0 + w * .72}" y="${Y - 36}" width="${w * .28}" height="36" fill="#f0a0a8" stroke="#b45f68" stroke-width="2.2"/>`;
  return `<svg viewBox="0 -18 ${W} ${H + 18}" class="b34-do">
    <rect x="${x0 - 10}" y="${Y}" width="${rulerWidth + 20}" height="28" rx="3" fill="#efe6d4" stroke="#a08f74" stroke-width="1.6"/>
    ${rk}${obj}
    <path d="M${x0} ${Y + 42}h${w}" stroke="#2b2b2b" stroke-width="1.8"/>
    <path d="M${x0} ${Y + 42}l9-5v10zM${x1} ${Y + 42}l-9-5v10z" fill="#2b2b2b"/>
    <path d="M${x0} ${Y + 28}v20M${x1} ${Y + 28}v20" stroke="#8a8a8a" stroke-width="1.2" stroke-dasharray="3 3"/>
  </svg>`;
};

/* quả cân có ghi số gam */
ART.b34Can = g => `<svg viewBox="0 0 70 84" class="b34-can">
  <path d="M28 10h14v8h-14z" fill="none" stroke="#5a5a6a" stroke-width="3"/>
  <path d="M20 22h30l8 52H12z" fill="#cfd4dc" stroke="#5a5a6a" stroke-width="2.6"/>
  <text x="35" y="56" text-anchor="middle" font-size="14" font-weight="700" fill="#3a3a48">${g}</text>
</svg>`;

/* nhiệt kế nhỏ, thang -10 đến 50 độ C */
ART.b34Nk = t => {
  const LO = -10, HI = 50, Y0 = 168, Y1 = 20;
  const yOf = v => Y0 - (v - LO) * (Y0 - Y1) / (HI - LO);
  let sc = '';
  for (let v = LO; v <= HI; v += 10){
    const y = yOf(v).toFixed(1);
    sc += `<path d="M24 ${y}h8" stroke="${v < 0 ? '#2b6f9e' : '#c0392b'}" stroke-width="1.5"/>
      <text x="21" y="${(+y + 4).toFixed(1)}" text-anchor="end" font-size="9"
        fill="${v < 0 ? '#2b6f9e' : '#c0392b'}">${Math.abs(v)}</text>`;
  }
  const yt = yOf(Math.max(LO, Math.min(HI, t))).toFixed(1);
  return `<svg viewBox="0 0 60 196" class="b34-nk">
    <rect x="10" y="8" width="40" height="168" rx="18" fill="#fff" stroke="#9fc4d8" stroke-width="2.2"/>
    <rect x="26" y="14" width="8" height="158" rx="4" fill="#f2f6f8" stroke="#c3d6e0" stroke-width="1.2"/>
    <rect x="27.5" y="${yt}" width="5" height="${(172 - +yt).toFixed(1)}" fill="#e03b3b"/>
    ${sc}<circle cx="30" cy="178" r="10" fill="#e03b3b" stroke="#b02222" stroke-width="1.5"/>
  </svg>`;
};

/* ca đựng nước có ghi số mi-li-lít */
ART.b34Ca = ml => `<svg viewBox="0 0 100 116" class="b34-ca">
  <path d="M68 34h14a12 12 0 0 1 0 24H68" fill="none" stroke="#5f9fc4" stroke-width="3.4"/>
  <rect x="12" y="20" width="56" height="86" rx="6" fill="#eaf7fd" stroke="#5f9fc4" stroke-width="2.8"/>
  <rect x="8" y="14" width="64" height="8" rx="4" fill="#dff1f9" stroke="#5f9fc4" stroke-width="2.4"/>
  <text x="40" y="70" text-anchor="middle" font-size="15" font-weight="700" fill="#2f6a86">${ml} ml</text>
</svg>`;

/* vật để chọn số cân nặng */
ART.b34Vat = k => {
  if (k === 'tay') return `<svg viewBox="0 0 120 90">
    <rect x="30" y="34" width="38" height="28" fill="#bcd9f0" stroke="#5b86bd" stroke-width="2.4"/>
    <rect x="68" y="34" width="6" height="28" fill="#fff" stroke="#5b86bd" stroke-width="2.4"/>
    <rect x="74" y="34" width="20" height="28" fill="#f0a0a8" stroke="#b45f68" stroke-width="2.4"/>
    <text x="49" y="53" text-anchor="middle" font-size="12" fill="#3d6a95">TẨY</text></svg>`;
  if (k === 'sua') return `<svg viewBox="0 0 120 90">
    <rect x="42" y="24" width="36" height="52" rx="4" fill="#f3f7fa" stroke="#8296ad" stroke-width="2.4"/>
    <rect x="42" y="40" width="36" height="20" fill="#e04b3c"/>
    <text x="60" y="55" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">SỮA</text>
    <rect x="50" y="18" width="20" height="7" rx="2" fill="#c9d4de" stroke="#8296ad" stroke-width="2"/></svg>`;
  if (k === 'bi') return `<svg viewBox="0 0 120 90">
    <ellipse cx="60" cy="52" rx="44" ry="17" fill="#7ec24a" stroke="#4e8a26" stroke-width="2.4"/>
    <path d="M22 48q38-12 76 0" fill="none" stroke="#a8d97a" stroke-width="3"/>
    <path d="M104 46l10-8" stroke="#4e8a26" stroke-width="3" stroke-linecap="round"/></svg>`;
  if (k === 'trung') return `<svg viewBox="0 0 120 90">
    <ellipse cx="60" cy="50" rx="22" ry="30" fill="#f3d7b6" stroke="#c09660" stroke-width="2.4"/>
    <ellipse cx="52" cy="36" rx="7" ry="10" fill="#fff" opacity=".6"/></svg>`;
  if (k === 'ta') return `<svg viewBox="0 0 120 90">
    <rect x="30" y="42" width="60" height="7" rx="3" fill="#9aa2ad" stroke="#5a5f68" stroke-width="2"/>
    <rect x="14" y="28" width="18" height="36" rx="5" fill="#3f4550" stroke="#23262c" stroke-width="2.2"/>
    <rect x="88" y="28" width="18" height="36" rx="5" fill="#3f4550" stroke="#23262c" stroke-width="2.2"/></svg>`;
  return `<svg viewBox="0 0 120 90">
    <path d="M34 34h52l-6 48H40z" fill="#e9f6ea" stroke="#7fae82" stroke-width="2.4"/>
    <path d="M46 34q14-16 28 0" fill="none" stroke="#7fae82" stroke-width="2.4"/>
    <circle cx="50" cy="58" r="11" fill="#e04b3c" stroke="#a63025" stroke-width="2"/>
    <circle cx="70" cy="60" r="11" fill="#e04b3c" stroke="#a63025" stroke-width="2"/>
    <circle cx="60" cy="74" r="9" fill="#e04b3c" stroke="#a63025" stroke-width="2"/></svg>`;
};

/* bức tranh gợi ý thời tiết */
ART.b34Pic = k => {
  if (k === 'lanh') return `<svg viewBox="0 0 130 100" class="b34-pic">
    <rect width="130" height="100" rx="8" fill="#fdf6d8"/>
    <path d="M46 76q18-30 38 0z" fill="#f0912a" stroke="#c2410c" stroke-width="2.4"/>
    <path d="M58 68q4-16 10-6 3-8 8 6z" fill="#ffd24a"/>
    <path d="M30 84h70" stroke="#8a6a3a" stroke-width="4" stroke-linecap="round"/>
    <circle cx="34" cy="30" r="10" fill="#bcd9f0" stroke="#5b86bd" stroke-width="2"/>
    <path d="M34 18v24M24 24l20 12M44 24L24 36" stroke="#5b86bd" stroke-width="2"/></svg>`;
  if (k === 'nong') return `<svg viewBox="0 0 130 100" class="b34-pic">
    <rect width="130" height="100" rx="8" fill="#e6f3fd"/>
    <circle cx="34" cy="28" r="14" fill="#ffd24a" stroke="#e0a020" stroke-width="2.4"/>
    <path d="M34 6v-6M34 56v6M12 28H6M62 28h6M18 12l-4-4M50 12l4-4" stroke="#e0a020" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M88 74l-20-26 34 6z" fill="#8fd3f0" stroke="#3a8ab0" stroke-width="2.4"/>
    <path d="M88 74v14" stroke="#3a8ab0" stroke-width="4" stroke-linecap="round"/>
    <path d="M62 40q10 6 6 16" fill="none" stroke="#3a8ab0" stroke-width="2"/></svg>`;
  return `<svg viewBox="0 0 130 100" class="b34-pic">
    <rect width="130" height="100" rx="8" fill="#fbe8e2"/>
    <rect x="24" y="62" width="82" height="8" rx="3" fill="#c98a4b" stroke="#8a5a25" stroke-width="2"/>
    <rect x="34" y="70" width="8" height="24" fill="#c98a4b"/><rect x="88" y="70" width="8" height="24" fill="#c98a4b"/>
    <path d="M44 62l18-12h26l-18 12z" fill="#8ad84a" stroke="#4e8a26" stroke-width="2"/>
    <circle cx="44" cy="34" r="11" fill="#f6c9a8" stroke="#c07a5c" stroke-width="2"/>
    <path d="M34 62q10-20 20 0z" fill="#e2739a" stroke="#a83f66" stroke-width="2"/></svg>`;
};

BANKS.b34 = [

/* ===== tr.93 – Bài 1: Đo độ dài các đồ vật theo đơn vị mi-li-mét ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const xu = R(15, 24), kep = R(28, 44), tay = R(30, 52);
  return q.done(`<div class="fill-line">Đo độ dài các đồ vật theo đơn vị mi-li-mét.</div>
    <div class="b34-row">
      <div class="b34-item">${ART.b34Do('xu', xu)}<span class="b34-pill">${xu} mm</span></div>
      <div class="b34-item">${ART.b34Do('kep', kep)}<span class="b34-pill">${q.num(kep, 2)} mm</span></div>
      <div class="b34-item">${ART.b34Do('tay', tay)}<span class="b34-pill">${q.num(tay, 2)} mm</span></div>
    </div>
    <div class="hint-line">Mỗi vạch nhỏ trên thước dài 1 mm, mỗi xăng-ti-mét có 10 mm.</div>`,
    `Đồng xu ${xu} mm · Cái kẹp ${kep} mm · Cục tẩy ${tay} mm`);
},

/* ===== tr.93 – Bài 2: Chọn số đo phù hợp với mỗi đồ vật trong thực tế ===== */
() => {
  const q = Q(2, 'Chọn số đo phù hợp với mỗi đồ vật trong thực tế.');
  const a = pick([20, 25, 30]), b = pick([300, 400, 500]), c = pick([2, 3, 4]);
  const items = [
    {art: ART.b34Vat('tay'), cap: 'Cục tẩy', ok: a + ' g', bad: a + ' kg'},
    {art: ART.b34Vat('sua'), cap: 'Hộp sữa', ok: b + ' g', bad: (b / 10) + ' g'},
    {art: ART.b34Vat('bi'), cap: 'Quả bí đao', ok: c + ' kg', bad: c + ' g'}
  ];
  const html = '<div class="b34-row">' + items.map(it => {
    const opts = [it.ok, it.bad].sort(() => Math.random() - .5);
    return `<div class="b34-box">${it.art}<div><b>${it.cap}</b></div>${q.pick(it.ok, opts)}</div>`;
  }).join('') + '</div>';
  return q.done(html, `Cục tẩy ${a} g · Hộp sữa ${b} g · Quả bí đao ${c} kg`);
},

/* ===== tr.93 – Bài 3: Chọn các quả cân thích hợp ===== */
() => {
  const q = Q(3, '');
  const W = [500, 200, 100, 50, 20];                 // dãy tăng nhanh: mỗi tổng con là duy nhất
  const idx = [0, 1, 2, 3, 4].sort(() => Math.random() - .5).slice(0, R(2, 3)).sort((x, y) => x - y);
  const chon = idx.map(i => W[i]);
  const tong = chon.reduce((s, x) => s + x, 0);
  return q.done(`<p class="wordq">Em hãy giúp Mai chọn các quả cân thích hợp để cân được đúng
      ${tong} g gạo từ một thúng gạo.</p>
    <div class="b34-row">${W.map(g => `<div style="width:74px">${ART.b34Can(g + ' g')}</div>`).join('')}</div>
    <div class="fill-line">Chọn các quả cân: ${q.pick(chon.map(g => g + ' g').sort().join(','), W.map(g => g + ' g'))}</div>`,
    `${chon.join(' + ')} = ${tong} (g)`);
},

/* ===== tr.93 – Bài 4: Đo nhiệt độ không khí một số ngày trong tuần ===== */
() => {
  const q = Q(4, 'Sử dụng nhiệt kế, em hãy đo nhiệt độ không khí vào một số ngày trong tuần rồi ghi lại theo bảng.');
  const NG = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư'];
  const v = [];
  let guard = 0;
  while (v.length < 3 && guard++ < 60){
    const x = R(12, 36);
    if (!v.includes(x)) v.push(x);
  }
  return q.done(`<div class="b34-row">${NG.map((d, i) =>
      `<div class="b34-item">${ART.b34Nk(v[i])}<em>${d}</em></div>`).join('')}</div>
    <div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Ngày</th>${NG.map(d => `<td>${d}</td>`).join('')}</tr>
      <tr><th>Nhiệt độ</th>${v.map(x => `<td>${q.num(x, 2)} °C</td>`).join('')}</tr>
    </table></div>
    <div class="hint-line">Đọc mức thuỷ ngân trên mỗi nhiệt kế rồi ghi vào bảng.</div>`,
    NG.map((d, i) => d + ': ' + v[i] + ' °C').join(' · '));
},

/* ===== tr.94 – Bài 1: Nhiệt kế nào phù hợp với mỗi bức tranh ===== */
() => {
  const q = Q(1, 'Nhiệt kế nào chỉ nhiệt độ không khí phù hợp với mỗi bức tranh?');
  const L = ['A', 'B', 'C'];
  const nhiet = [{k: 'lanh', t: R(2, 12)}, {k: 'mat', t: R(18, 26)}, {k: 'nong', t: R(33, 41)}];
  const ord = [0, 1, 2].sort(() => Math.random() - .5);
  const nk = ord.map((i, j) => ({lab: L[j], k: nhiet[i].k, t: nhiet[i].t}));
  const CAP = {lanh: 'Rô-bốt ngồi sưởi lửa, mặc áo ấm', mat: 'Bạn nhỏ ngồi đọc sách, trời mát mẻ',
    nong: 'Bạn nhỏ phải quạt vì trời nóng'};
  const tranh = ['lanh', 'mat', 'nong'].sort(() => Math.random() - .5);
  const findLab = k => nk.filter(x => x.k === k)[0].lab;
  return q.done(`<div class="b34-row">${nk.map(x =>
      `<div class="b34-item">${ART.b34Nk(x.t)}<em>${x.lab}</em></div>`).join('')}</div>
    <div class="b34-row">${tranh.map(k =>
      `<div class="b34-box">${ART.b34Pic(k)}<div>${CAP[k]}</div>
        ${q.pick(findLab(k), L)}</div>`).join('')}</div>`,
    nk.map(x => x.lab + ': ' + x.t + ' °C').join(' · '));
},

/* ===== tr.94 – Bài 2: Chọn số cân nặng thích hợp với mỗi vật ===== */
() => {
  const q = Q(2, 'Chọn số cân nặng thích hợp với mỗi vật.');
  const g = pick([50, 60, 100]), kg1 = pick([1, 2, 3]), kg2 = pick([50, 80, 100]);
  const vals = [g + ' g', kg1 + ' kg', kg2 + ' kg'].sort(() => Math.random() - .5);
  const items = [{k: 'trung', cap: 'Quả trứng', ok: g + ' g'},
    {k: 'ta', cap: 'Quả tạ', ok: kg2 + ' kg'},
    {k: 'ca', cap: 'Túi cà chua', ok: kg1 + ' kg'}].sort(() => Math.random() - .5);
  return q.done(`<div class="b34-row">${items.map(it =>
      `<div class="b34-box">${ART.b34Vat(it.k)}<div><b>${it.cap}</b></div>${q.pick(it.ok, vals)}</div>`).join('')}</div>
    <div class="b34-row">${vals.map(v => `<span class="b34-pill">${v}</span>`).join('')}</div>`,
    `Quả trứng ${g} g · Túi cà chua ${kg1} kg · Quả tạ ${kg2} kg`);
},

/* ===== tr.94 – Bài 3: Bốn ca đựng lượng nước ===== */
() => {
  const q = Q(3, 'Cho bốn ca đựng lượng nước như sau:');
  const L = ['A', 'B', 'C', 'D'];
  let v = [], s1 = 0, s2 = 0, ok1 = '', ok2 = '';
  for (let g = 0; g < 60; g++){
    v = [];
    let h = 0;
    while (v.length < 4 && h++ < 60){
      const x = R(2, 9) * 50;
      if (!v.includes(x)) v.push(x);
    }
    if (v.length < 4) continue;
    const pairs = [];
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) pairs.push({s: v[i] + v[j], a: L[i], b: L[j]});
    const uniq = pairs.filter(p => pairs.filter(x => x.s === p.s).length === 1);
    if (uniq.length < 2) continue;
    const two = uniq.sort(() => Math.random() - .5).slice(0, 2);
    s1 = two[0].s; ok1 = [two[0].a, two[0].b].sort().join(',');
    s2 = two[1].s; ok2 = [two[1].a, two[1].b].sort().join(',');
    break;
  }
  if (!ok1){ v = [300, 150, 200, 250]; s1 = 350; ok1 = 'B,C'; s2 = 550; ok2 = 'A,D'; }
  const it = v.indexOf(Math.min.apply(null, v));
  return q.done(`<div class="b34-row">${v.map((x, i) =>
      `<div class="b34-item">${ART.b34Ca(x)}<em>${L[i]}</em></div>`).join('')}</div>
    <div class="bullet">a) Ca ít nước nhất là ca ${q.pick(L[it], L)}</div>
    <div class="bullet">b) Hai ca khác nhau để được ${s1} ml nước là: ${q.pick(ok1, L)}</div>
    <div class="bullet">c) Hai ca khác nhau để được ${s2} ml nước là: ${q.pick(ok2, L)}</div>`,
    `${v.map((x, i) => L[i] + ' = ' + x + ' ml').join(' · ')}`);
},
];
