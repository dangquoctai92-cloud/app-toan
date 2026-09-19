/* ==================== BÀI 68: TIỀN VIỆT NAM
   (SGK tập 2 – tr.84, 85, 86, 87)
   khám phá tr.84–85 : các tờ tiền từ 1 000 đồng trở lên (phần lí thuyết, không ra bài tập)
   hoạt động tr.85–86 : bài 1 (Chú lợn nào đựng nhiều tiền nhất?),
                        bài 2 (Chọn những cách trả lại tiền thừa),
                        bài 3 (Tìm giá tiền của mỗi món hàng)
   luyện tập tr.86–87 : bài 1 (Tìm giá tiền của từng loại rau củ),
                        bài 2 (Số ? – giá bắp ngô đầu vụ và giữa vụ),
                        bài 3 (Nam và Mai làm nước chanh),
                        bài 4 (Số ? – đổi tiền)
========================================================================================= */

const SHF68 = a => a.slice().sort(() => Math.random() - .5);

/* ---- các tờ tiền Việt Nam đang lưu hành ---- */
const TIEN68 = {
  1000:   {mau: '#d7ddc9', vien: '#7f8c68', ten: 'MỘT NGHÌN'},
  2000:   {mau: '#e9c5b6', vien: '#a9755f', ten: 'HAI NGHÌN'},
  5000:   {mau: '#b7cce6', vien: '#4f74a3', ten: 'NĂM NGHÌN'},
  10000:  {mau: '#f2c68b', vien: '#b8813a', ten: 'MƯỜI NGHÌN'},
  20000:  {mau: '#a9d6ec', vien: '#3f88b0', ten: 'HAI MƯƠI NGHÌN'},
  50000:  {mau: '#f3b9ca', vien: '#b5647f', ten: 'NĂM MƯƠI NGHÌN'},
  100000: {mau: '#aeddb6', vien: '#4d9563', ten: 'MỘT TRĂM NGHÌN'}
};

function to68(v){
  const t = TIEN68[v];
  return `<span class="b68-note"><svg viewBox="0 0 200 100">
    <rect x="2" y="2" width="196" height="96" rx="8" fill="${t.mau}" stroke="${t.vien}" stroke-width="3"/>
    <rect x="10" y="10" width="180" height="80" rx="5" fill="none" stroke="${t.vien}"
      stroke-width="1.4" opacity=".65"/>
    <circle cx="150" cy="50" r="27" fill="#fff" opacity=".45"/>
    <path d="M150 33c8 0 13 7 13 14 0 5-2 8-2 8h-22s-2-3-2-8c0-7 5-14 13-14z" fill="${t.vien}" opacity=".5"/>
    <path d="M134 57h32c7 0 11 6 12 14h-56c1-8 5-14 12-14z" fill="${t.vien}" opacity=".5"/>
    <text x="16" y="32" font-size="21" font-weight="800" fill="${t.vien}">${nf(v)}</text>
    <text x="16" y="54" font-size="11.5" font-weight="700" fill="#3a3a3a">${t.ten}</text>
    <text x="16" y="70" font-size="11.5" font-weight="700" fill="#3a3a3a">ĐỒNG</text>
    <text x="184" y="90" font-size="13" font-weight="800" fill="${t.vien}" text-anchor="end">${nf(v)}</text>
  </svg></span>`;
}

/* ---- tranh minh hoạ rau củ ---- */
const NGO68 = `<svg class="b68-veg" viewBox="0 0 60 60">
  <path d="M30 8c9 0 15 10 15 22s-6 22-15 22-15-10-15-22S21 8 30 8z" fill="#f4c93c"
    stroke="#c99a10" stroke-width="2"/>
  <path d="M20 20h20M18 30h24M18 40h24M20 49h20M30 12v38" stroke="#d8a520" stroke-width="1.7"/>
  <path d="M15 32q-11-14-3-24 11 5 13 18z" fill="#5fbb46" stroke="#3a862a" stroke-width="2"/>
  <path d="M45 32q11-14 3-24-11 5-13 18z" fill="#7ecb5e" stroke="#3a862a" stroke-width="2"/>
</svg>`;
const CAROT68 = `<svg class="b68-veg" viewBox="0 0 60 60">
  <path d="M21 22h18l-9 34z" fill="#f5901e" stroke="#c96f10" stroke-width="2" stroke-linejoin="round"/>
  <path d="M24 30h12M26 38h9M28 46h5" stroke="#c96f10" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M30 22q-9-4-11-13 9 0 13 9zM30 22q4-11 13-11-2 9-11 13z" fill="#5fbb46"
    stroke="#3a862a" stroke-width="1.8"/>
</svg>`;
const DUA68 = `<svg class="b68-veg" viewBox="0 0 60 60">
  <path d="M14 46q-7-9 2-19T44 12q8 7 1 19T22 50q-6 0-8-4z" fill="#6fbf4a" stroke="#3f8a2a" stroke-width="2"/>
  <path d="M22 34l4 4M30 26l4 4M38 20l4 4M27 42l3 3" stroke="#3f8a2a" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

/* ---- tranh minh hoạ các món hàng ---- */
const MON68 = {
  'Bóng đèn': `<svg class="b68-item" viewBox="0 0 60 70">
    <path d="M30 6c11 0 18 8 18 18 0 9-7 13-8 20H20c-1-7-8-11-8-20 0-10 7-18 18-18z"
      fill="#fbe28a" stroke="#c9a020" stroke-width="2.4"/>
    <rect x="21" y="45" width="18" height="6" rx="2" fill="#cdcdcd" stroke="#8a8a8a" stroke-width="1.6"/>
    <rect x="22" y="52" width="16" height="6" rx="2" fill="#cdcdcd" stroke="#8a8a8a" stroke-width="1.6"/>
    <path d="M24 24q6-7 12 0" fill="none" stroke="#c9a020" stroke-width="2"/>
    <path d="M8 14l5 3M52 14l-5 3M10 30h5M50 30h-5" stroke="#e8a020" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  'Quyển sách': `<svg class="b68-item" viewBox="0 0 60 70">
    <path d="M10 12h34a6 6 0 0 1 6 6v42a6 6 0 0 0-6-6H10z" fill="#2f6fb8" stroke="#1c4a80" stroke-width="2.4"/>
    <path d="M10 12v42" stroke="#1c4a80" stroke-width="2.6"/>
    <rect x="18" y="22" width="24" height="4" rx="2" fill="#ffd54a"/>
    <rect x="18" y="32" width="17" height="4" rx="2" fill="#fff" opacity=".85"/>
    <circle cx="40" cy="43" r="5" fill="#ff7043"/>
  </svg>`,
  'Cái lược': `<svg class="b68-item" viewBox="0 0 60 70">
    <path d="M8 20h44a4 4 0 0 1 4 4v10H4V24a4 4 0 0 1 4-4z" fill="#dba463" stroke="#a06e30" stroke-width="2.4"/>
    <path d="M9 34v20M16 34v20M23 34v20M30 34v20M37 34v20M44 34v20M51 34v20"
      stroke="#a06e30" stroke-width="2.6" stroke-linecap="round"/>
  </svg>`,
  'Rô-bốt': `<svg class="b68-item" viewBox="0 0 60 70">
    <path d="M30 4v7" stroke="#3f8a2a" stroke-width="2.4"/><circle cx="30" cy="4" r="3.4" fill="#e04a2f"/>
    <rect x="14" y="11" width="32" height="23" rx="6" fill="#6ec24a" stroke="#3f8a2a" stroke-width="2.4"/>
    <circle cx="23" cy="22" r="5" fill="#fff" stroke="#3f8a2a" stroke-width="1.6"/>
    <circle cx="23" cy="22" r="2.2" fill="#1a1a1a"/>
    <circle cx="37" cy="22" r="5" fill="#fff" stroke="#3f8a2a" stroke-width="1.6"/>
    <circle cx="37" cy="22" r="2.2" fill="#1a1a1a"/>
    <rect x="17" y="37" width="26" height="20" rx="4" fill="#6ec24a" stroke="#3f8a2a" stroke-width="2.4"/>
    <rect x="23" y="43" width="14" height="8" rx="2" fill="#dcf3ca"/>
    <path d="M17 41l-9 8M43 41l9 8M23 57v8M37 57v8" stroke="#e8724a" stroke-width="3.4" stroke-linecap="round"/>
  </svg>`
};

/* ---- các cách gộp tờ 5 000, 2 000, 1 000 để có đúng "tong" đồng ---- */
function cach68(tong, maxTo){
  const out = [];
  for (let n5 = 0; n5 * 5000 <= tong && n5 <= maxTo; n5++){
    for (let n2 = 0; n5 * 5000 + n2 * 2000 <= tong && n5 + n2 <= maxTo; n2++){
      const con = tong - n5 * 5000 - n2 * 2000;
      if (con % 1000) continue;
      const n1 = con / 1000;
      const to = n5 + n2 + n1;
      if (to >= 1 && to <= maxTo) out.push({n5, n2, n1, tong});
    }
  }
  return out;
}
const veCach68 = c => to68(5000).repeat(c.n5) + to68(2000).repeat(c.n2) + to68(1000).repeat(c.n1);
const key68 = c => c.n5 + '-' + c.n2 + '-' + c.n1;

/* ---- các cặp đổi tiền luôn đúng ---- */
const DOI68 = [                       /* [A, B, k]: k tờ A đổi được 1 tờ B */
  [1000, 2000, 2], [1000, 5000, 5], [1000, 10000, 10], [2000, 10000, 5],
  [5000, 10000, 2], [10000, 20000, 2], [10000, 50000, 5], [10000, 100000, 10],
  [20000, 100000, 5], [50000, 100000, 2], [2000, 20000, 10], [5000, 50000, 10]
];
const DOI2_68 = [                     /* [B, C, A, k]: 1 tờ B = 1 tờ C và k tờ A */
  [5000, 1000, 1000, 4], [5000, 1000, 2000, 2], [10000, 2000, 2000, 4],
  [10000, 5000, 1000, 5], [20000, 10000, 5000, 2], [20000, 10000, 2000, 5],
  [50000, 10000, 20000, 2], [50000, 20000, 10000, 3], [50000, 10000, 10000, 4],
  [100000, 50000, 10000, 5], [100000, 20000, 20000, 4]
];

const LET68 = ['A', 'B', 'C', 'D'];

BANKS.b68 = [

/* ===== tr.85 – Bài 1: Chú lợn nào đựng nhiều tiền nhất? ===== */
() => {
  const q = Q(1, 'Chú lợn nào đựng nhiều tiền nhất?');
  const MG = [2000, 5000, 10000, 20000, 50000, 100000];
  const mkSet = () => Array.from({length: R(1, 3)}, () => pick(MG));
  let sets = [mkSet(), mkSet(), mkSet()];
  let tong = sets.map(s => s.reduce((a, b) => a + b, 0));
  for (let g = 0; g < 80; g++){
    const mx = Math.max(...tong);
    if (tong.filter(v => v === mx).length === 1) break;
    sets = [mkSet(), mkSet(), mkSet()];
    tong = sets.map(s => s.reduce((a, b) => a + b, 0));
  }
  if (tong.filter(v => v === Math.max(...tong)).length > 1){
    sets = [[10000], [20000, 20000], [100000]];
    tong = [10000, 40000, 100000];
  }
  const LON = [
    {ten: 'Lợn hồng', mau: '#fbd0dc'},
    {ten: 'Lợn xanh', mau: '#bfe6f7'},
    {ten: 'Lợn tím', mau: '#d3cdf0'}
  ];
  const nhat = tong.indexOf(Math.max(...tong));
  const html = '<div class="b68-pigs">' + LON.map((l, i) =>
      `<div class="b68-pig">${ART.pig(l.mau)}
        <div class="b68-notes">${sets[i].map(to68).join('')}</div>
        <div class="nm">${l.ten}</div></div>`).join('') + '</div>'
    + `<div class="fill-line b68-wide">Chú đựng nhiều tiền nhất:
        ${q.pick(LON[nhat].ten, LON.map(l => l.ten))}</div>
      <div class="b68-line">Chú lợn đó đựng ${q.num(tong[nhat])} đồng.</div>`;
  return q.done(html,
    LON.map((l, i) => `${l.ten}: ${sets[i].map(nf).join(' + ')} = ${nf(tong[i])} đồng`).join(';  ')
    + `. Nhiều nhất là ${LON[nhat].ten}.`);
},

/* ===== tr.85 – Bài 2: Chọn những cách trả lại tiền thừa ===== */
() => {
  const q = Q(2, 'Chọn những cách cô bán hàng có thể trả lại tiền thừa cho mẹ.');
  const MON = SHF68(['chanh', 'hành', 'cà chua', 'rau muống', 'đậu phụ']);
  const a = R(1, 4) * 1000, b = R(1, 4) * 1000;
  const dua = 10000;
  const thua = dua - a - b;
  const dung = SHF68(cach68(thua, 5)).slice(0, 2);
  const khacTong = SHF68([thua - 1000, thua + 1000, thua - 2000, thua + 2000]
    .filter(v => v >= 1000 && v <= 12000 && v !== thua));
  const sai = [];
  khacTong.forEach(v => { if (sai.length < 2){ const c = pick(cach68(v, 5)); if (c) sai.push(c); } });
  khacTong.forEach(v => SHF68(cach68(v, 5)).forEach(c => {
    if (sai.length < 2 && !sai.some(x => key68(x) === key68(c))) sai.push(c); }));
  while (sai.length < 2) sai.push({n5: 0, n2: 0, n1: (thua + 3000) / 1000, tong: thua + 3000});
  const all = SHF68(dung.concat(sai.slice(0, 2)));
  const ans = all.map((c, i) => c.tong === thua ? LET68[i] : null)
    .filter(Boolean).sort().join(',');
  const html = `<p class="wordq">Mẹ đi chợ mua ${MON[0]} hết ${nf(a)} đồng và mua ${MON[1]}
      hết ${nf(b)} đồng. Mẹ đưa cho cô bán hàng ${nf(dua)} đồng.</p>
    <div class="b68-opts">${all.map((c, i) =>
      `<div class="b68-opt"><div class="b68-notes">${veCach68(c)}</div>
        <div class="lb">${LET68[i]}</div></div>`).join('')}</div>
    <div class="fill-line b68-wide">${q.pick(ans, LET68)}</div>
    <div class="hint-line">Chạm để chọn tất cả các cách trả lại đúng số tiền thừa.</div>`;
  return q.done(html,
    `Mẹ phải trả ${nf(a)} + ${nf(b)} = ${nf(a + b)} đồng, tiền thừa là `
    + `${nf(dua)} − ${nf(a + b)} = ${nf(thua)} đồng. Các cách đúng: ${ans}.`);
},

/* ===== tr.85–86 – Bài 3: Tìm giá tiền của mỗi món hàng ===== */
() => {
  const q = Q(3, 'Khi mua mỗi món hàng dưới đây, ta cần trả một tờ tiền có trong hình bên. '
    + 'Em hãy tìm giá tiền của mỗi món hàng, biết:');
  const MG = SHF68([5000, 10000, 20000, 50000, 100000]).slice(0, 4).sort((x, y) => x - y);
  const gia = {
    'Bóng đèn': MG[0],                 /* thấp nhất */
    'Cái lược': MG[1],
    'Rô-bốt': MG[2],                   /* cao hơn cái lược */
    'Quyển sách': MG[3]                /* cao nhất */
  };
  const hienThi = SHF68(Object.keys(gia));
  const to = SHF68(MG);
  const html = `<div class="bullet">Giá tiền của bóng đèn thấp nhất;</div>
    <div class="bullet">Giá tiền của quyển sách cao nhất;</div>
    <div class="bullet">Giá tiền của rô-bốt cao hơn giá tiền của cái lược.</div>
    <div class="b68-notes">${to.map(to68).join('')}</div>
    <div class="b68-items">${hienThi.map(t =>
      `<div>${MON68[t]}${t}</div>`).join('')}</div>`
    + hienThi.map(t =>
      `<div class="b68-line">Giá tiền của ${t.toLowerCase()} là ${q.num(gia[t])} đồng.</div>`).join('');
  return q.done(html,
    `Bóng đèn ${nf(MG[0])} đồng; cái lược ${nf(MG[1])} đồng; `
    + `rô-bốt ${nf(MG[2])} đồng; quyển sách ${nf(MG[3])} đồng.`);
},

/* ===== tr.86 – Luyện tập, Bài 1: Tìm giá tiền của từng loại rau củ ===== */
() => {
  const q = Q(1, 'Tìm giá tiền của từng loại: bắp ngô, cà rốt, dưa chuột.');
  const ngo = R(2, 6) * 1000, carot = R(1, 5) * 1000, dua = R(1, 5) * 1000;
  const g1 = ngo + carot + dua, g2 = ngo + carot, g3 = ngo;
  const nhom = [
    {ve: DUA68 + CAROT68 + NGO68, gia: g1, nen: '#fbdce8'},
    {ve: CAROT68 + NGO68, gia: g2, nen: '#cfeaf7'},
    {ve: NGO68, gia: g3, nen: '#e6efc4'}
  ];
  const html = '<div class="b68-groups">' + nhom.map(n =>
      `<div class="b68-grp"><div class="b68-oval" style="background:${n.nen}">${n.ve}</div>
        <div class="b68-price">${nf(n.gia)} đồng</div></div>`).join('') + '</div>'
    + `<div class="b68-line">Giá tiền 1 bắp ngô là ${q.num(ngo)} đồng.</div>
      <div class="b68-line">Giá tiền 1 củ cà rốt là ${q.num(carot)} đồng.</div>
      <div class="b68-line">Giá tiền 1 quả dưa chuột là ${q.num(dua)} đồng.</div>`;
  return q.done(html,
    `Bắp ngô: ${nf(g3)} đồng. Cà rốt: ${nf(g2)} − ${nf(g3)} = ${nf(carot)} đồng. `
    + `Dưa chuột: ${nf(g1)} − ${nf(g2)} = ${nf(dua)} đồng.`);
},

/* ===== tr.86 – Luyện tập, Bài 2: Số ? (giá bắp ngô đầu vụ và giữa vụ) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const giua = R(2, 5) * 1000;
  const k = R(2, 3);
  const soTien = k * giua;
  const dau = giua + R(1, 4) * 1000;
  const html = `<p class="wordq">Vào đầu vụ ngô, mẹ Lan mua 1 bắp ngô giá ${nf(dau)} đồng.
      Giữa vụ, với ${nf(soTien)} đồng, mẹ Lan mua được ${k} bắp ngô.</p>
    <div class="b68-line"><span class="b68-let">a)</span>Giữa vụ, giá tiền 1 bắp ngô là
      ${q.num(giua)} đồng.</div>
    <div class="b68-line"><span class="b68-let">b)</span>Giá tiền 1 bắp ngô ở đầu vụ nhiều hơn
      giá tiền 1 bắp ngô ở giữa vụ là ${q.num(dau - giua)} đồng.</div>`;
  return q.done(html,
    `a) ${nf(soTien)} : ${k} = ${nf(giua)} (đồng).  `
    + `b) ${nf(dau)} − ${nf(giua)} = ${nf(dau - giua)} (đồng).`);
},

/* ===== tr.86–87 – Luyện tập, Bài 3: Nam và Mai làm nước chanh ===== */
() => {
  const q = Q(3, '');
  const loai = [
    {ten: 'Nước', tien: R(2, 5) * 5000},
    {ten: 'Đường kính', tien: R(3, 8) * 2000},
    {ten: 'Chanh', tien: R(2, 6) * 5000}
  ];
  const tong = loai.reduce((s, x) => s + x.tien, 0);
  const ban = tong + R(4, 12) * 5000;
  const html = `<p class="wordq">Trong hội chợ do nhà trường tổ chức, Nam và Mai làm nước chanh
      để bán lấy tiền ủng hộ quỹ từ thiện. Dưới đây là số tiền để mua những nguyên liệu
      làm nước chanh của các bạn ấy.</p>
    <div class="tbl-wrap"><table class="tbl green">
      <tr><th>Loại</th><th>Số tiền</th></tr>
      ${loai.map(x => `<tr><td>${x.ten}</td><td>${nf(x.tien)} đồng</td></tr>`).join('')}
    </table></div>
    <div class="b68-line"><span class="b68-let">a)</span>Nam và Mai cần
      ${q.num(tong)} đồng để mua số nguyên liệu trên.</div>
    <div class="b68-line"><span class="b68-let">b)</span>Nam và Mai bán nước chanh được
      ${nf(ban)} đồng. Sau khi trừ đi tiền mua nguyên liệu, hai bạn còn
      ${q.num(ban - tong)} đồng.</div>`;
  return q.done(html,
    `a) ${loai.map(x => nf(x.tien)).join(' + ')} = ${nf(tong)} (đồng).  `
    + `b) ${nf(ban)} − ${nf(tong)} = ${nf(ban - tong)} (đồng).`);
},

/* ===== tr.87 – Luyện tập, Bài 4: Số ? (đổi tiền) ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const ds = SHF68(DOI68).slice(0, 3);
  const d2 = pick(DOI2_68);
  const html = `<div class="bullet">${ds[0][2]} tờ ${nf(ds[0][0])} đồng đổi được
      1 tờ ${nf(ds[0][1])} đồng.</div>
    <div class="bullet">${q.num(ds[1][2])} tờ ${nf(ds[1][0])} đồng đổi được
      1 tờ ${nf(ds[1][1])} đồng.</div>
    <div class="bullet">1 tờ ${nf(d2[0])} đồng đổi được 1 tờ ${nf(d2[1])} đồng và
      ${q.num(d2[3])} tờ ${nf(d2[2])} đồng.</div>
    <div class="bullet">1 tờ ${nf(ds[2][1])} đồng đổi được ${q.num(ds[2][2])} tờ
      ${nf(ds[2][0])} đồng.</div>`;
  return q.done(html,
    `${nf(ds[1][1])} : ${nf(ds[1][0])} = ${ds[1][2]};  `
    + `${nf(d2[0])} − ${nf(d2[1])} = ${nf(d2[0] - d2[1])} và ${nf(d2[0] - d2[1])} : `
    + `${nf(d2[2])} = ${d2[3]};  ${nf(ds[2][1])} : ${nf(ds[2][0])} = ${ds[2][2]}.`);
},
];
