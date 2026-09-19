/* ==================== BÀI 69: LUYỆN TẬP CHUNG
   (SGK tập 2 – tr.87, 88, 89, 90, 91, 92, 93)
   luyện tập 1 (tr.87–89) : bài 1 (Mai tặng bánh – xem đồng hồ, giờ kém),
                            bài 2 (tờ lịch tháng 4: ngày lễ là thứ mấy, cây đậu thần kì),
                            bài 3 (giá cái kẹo và gói bim bim – tiền Việt Nam),
                            bài 4 (Số ? – đổi giờ ra phút, năm ra tháng),
                            bài 5 (Rô-bốt đi học bằng xe buýt – hết bao nhiêu phút)
   luyện tập 2 (tr.90–91) : bài 1 (a, b, c – hoạt động nào diễn ra trước / sau),
                            bài 2 (tờ lịch tháng 12: các ngày Chủ nhật, số buổi học vẽ),
                            bài 3 (Nam mua ba cái bút chì giống nhau),
                            bài 4 (a, b – chọn đồng hồ thích hợp thay vào ô "?"),
                            bài 5 (Số ? – tuần, giờ, năm, ngày)
   luyện tập 3 (tr.92–93) : bài 1 (a, b – chọn câu trả lời đúng, đồng hồ),
                            bài 2 (Số ? – 1 giờ 30 phút, 1 tuần 3 ngày, …),
                            bài 3 (a: Mi tròn tuổi, b: Nam sinh tháng mấy)
   (phần trò chơi "Cuộc đua đến giờ tan học" tr.93 không phải bài tập đánh số)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như SGK: 20 000 */
const SP69 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const SHF69 = a => a.slice().sort(() => Math.random() - .5);
const LET69 = ['A', 'B', 'C', 'D'];
const THU69 = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
const THANG69 = ['', 'MỘT', 'HAI', 'BA', 'TƯ', 'NĂM', 'SÁU', 'BẢY', 'TÁM', 'CHÍN',
  'MƯỜI', 'MƯỜI MỘT', 'MƯỜI HAI'];
const SONGAY69 = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const CHU69 = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

/* mốc thời gian tính bằng phút kể từ 0 giờ */
const HM69 = t => { const h = Math.floor(t / 60) % 24, m = t % 60;
  return m ? h + ' giờ ' + m + ' phút' : h + ' giờ'; };

/* ---- mặt đồng hồ kim: kim giờ theo giờ và phút, kim phút theo phút ---- */
function clock69(t, cap, letter){
  const h = Math.floor(t / 60) % 12, m = t % 60;
  const P = (deg, r) => ({x: 100 + r * Math.sin(deg * Math.PI / 180),
                          y: 100 - r * Math.cos(deg * Math.PI / 180)});
  let ticks = '';
  for (let i = 0; i < 60; i++){
    const big = i % 5 === 0;
    const p1 = P(i * 6, big ? 76 : 80), p2 = P(i * 6, 86);
    ticks += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}"
      x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}"
      stroke="#3a2c12" stroke-width="${big ? 3 : 1.4}" stroke-linecap="round"/>`;
  }
  let nums = '';
  for (let i = 1; i <= 12; i++){
    const p = P(i * 30, 62);
    nums += `<text x="${p.x.toFixed(1)}" y="${(p.y + 8).toFixed(1)}" text-anchor="middle"
      font-size="23" font-weight="700" fill="#1a1a1a">${i}</text>`;
  }
  const ph = P(h * 30 + m * 0.5, 44), pm = P(m * 6, 70);
  return `<div class="b69-clk"><svg viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="95" fill="#f7941e"/>
      <circle cx="100" cy="100" r="87" fill="#fff" stroke="#e07b16" stroke-width="2"/>
      ${ticks}${nums}
      <line x1="100" y1="100" x2="${ph.x.toFixed(1)}" y2="${ph.y.toFixed(1)}"
        stroke="#1a1a1a" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="${pm.x.toFixed(1)}" y2="${pm.y.toFixed(1)}"
        stroke="#1a1a1a" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="7" fill="#e02020"/>
    </svg>${cap ? `<div class="b69-cap">${cap}</div>` : ''}${
      letter ? `<div class="b69-cle">${letter}</div>` : ''}</div>`;
}

/* ---- tờ lịch: fw = thứ của ngày mồng 1 (0 = thứ Hai … 6 = Chủ nhật) ---- */
function cal69(thang, fw){
  const nd = SONGAY69[thang];
  const head = ['THỨ<br>HAI', 'THỨ<br>BA', 'THỨ<br>TƯ', 'THỨ<br>NĂM', 'THỨ<br>SÁU',
    'THỨ<br>BẢY', 'CHỦ<br>NHẬT'];
  const cells = [];
  for (let i = 0; i < fw; i++) cells.push(0);
  for (let d = 1; d <= nd; d++) cells.push(d);
  while (cells.length % 7) cells.push(0);
  let rows = '';
  for (let i = 0; i < cells.length; i += 7){
    rows += '<tr>' + cells.slice(i, i + 7).map((d, j) =>
      `<td class="${j === 6 ? 'cn' : ''}">${d || ''}</td>`).join('') + '</tr>';
  }
  return `<div class="b69-cal"><div class="b69-cal-t">THÁNG ${THANG69[thang]}</div>
    <table><tr>${head.map(x => `<th>${x}</th>`).join('')}</tr>${rows}</table></div>`;
}

/* các ngày trong tháng rơi vào thứ w (0 = thứ Hai … 6 = Chủ nhật) */
const DAY69 = (thang, fw, w) => {
  const out = [];
  for (let d = 1; d <= SONGAY69[thang]; d++) if ((fw + d - 1) % 7 === w) out.push(d);
  return out;
};

/* n mốc thời gian khác mốc đúng, dùng làm phương án nhiễu cho các đồng hồ */
function khac69(dung, offs, n, avoid){
  const bad = (avoid || []).concat([dung]);
  const out = [];
  SHF69(offs).forEach(o => {
    const v = dung + o;
    if (out.length < n && v > 0 && v < 1380 && !bad.includes(v) && !out.includes(v)) out.push(v);
  });
  let k = 7;
  while (out.length < n && k < 300){
    const v = dung + k;
    if (v > 0 && v < 1380 && !bad.includes(v) && !out.includes(v)) out.push(v);
    k += 11;
  }
  let z = 1;
  while (out.length < n && z < 500){
    const v = 60 + ((dung + z * 17) % 1200);
    if (!bad.includes(v) && !out.includes(v)) out.push(v);
    z++;
  }
  return out;
}

/* ---- tờ tiền Việt Nam theo mệnh giá thật ---- */
const TIEN69 = {
  1000:  {chu: 'MỘT NGHÌN ĐỒNG',      nen: '#dfe7d6', vien: '#7c8b66', muc: '#46553a'},
  2000:  {chu: 'HAI NGHÌN ĐỒNG',      nen: '#f2dcd4', vien: '#a5786c', muc: '#7a4a3e'},
  5000:  {chu: 'NĂM NGHÌN ĐỒNG',      nen: '#cfe0f2', vien: '#4a6f9e', muc: '#2b4a76'},
  10000: {chu: 'MƯỜI NGHÌN ĐỒNG',     nen: '#f3d9bf', vien: '#a97a4a', muc: '#7a4f22'},
  20000: {chu: 'HAI MƯƠI NGHÌN ĐỒNG', nen: '#cfe6ea', vien: '#4a8a9e', muc: '#25636f'},
  50000: {chu: 'NĂM MƯƠI NGHÌN ĐỒNG', nen: '#f0d4e2', vien: '#a46a8c', muc: '#7a3f60'}
};
function money69(v){
  const t = TIEN69[v];
  return `<svg viewBox="0 0 200 100">
    <rect x="2" y="2" width="196" height="96" rx="8" fill="${t.nen}" stroke="${t.vien}" stroke-width="3"/>
    <rect x="10" y="10" width="180" height="80" rx="5" fill="none" stroke="${t.vien}" stroke-width="1.5"/>
    <circle cx="50" cy="52" r="27" fill="none" stroke="${t.vien}" stroke-width="1.5"/>
    <path d="M50 30c10 0 17 8 17 18 0 12-8 22-17 22s-17-10-17-22c0-10 7-18 17-18z"
      fill="${t.muc}" opacity=".2"/>
    <path d="M50 34c7 0 12 6 12 13s-5 15-12 15-12-8-12-15 5-13 12-13z" fill="${t.muc}" opacity=".3"/>
    <text x="134" y="46" text-anchor="middle" font-size="25" font-weight="800" fill="${t.muc}">${SP69(v)}</text>
    <text x="134" y="66" text-anchor="middle" font-size="9.5" font-weight="700" fill="${t.muc}">${t.chu}</text>
  </svg>`;
}

/* ---- cái kẹo mút, gói bim bim, cái bút chì ---- */
const KEO69 = `<svg viewBox="0 0 80 104">
  <circle cx="40" cy="34" r="30" fill="#f2703a" stroke="#c14a1c" stroke-width="3"/>
  <circle cx="40" cy="34" r="20" fill="none" stroke="#ffd66b" stroke-width="6"/>
  <circle cx="40" cy="34" r="9" fill="#ffd66b" stroke="#c14a1c" stroke-width="2"/>
  <path d="M40 64v36" stroke="#5fbb46" stroke-width="6" stroke-linecap="round"/>
  <path d="M40 74l-18-8 5 15z" fill="#8cc63f" stroke="#4e8a34" stroke-width="2"/>
</svg>`;
const BIM69 = `<svg viewBox="0 0 90 104">
  <path d="M18 18h54v70H18z" fill="#f6b93b" stroke="#c07d10" stroke-width="3"/>
  <path d="M10 8h70l-8 12H18z" fill="#e8552f" stroke="#a5321a" stroke-width="2.4"/>
  <path d="M10 98h70l-8-12H18z" fill="#e8552f" stroke="#a5321a" stroke-width="2.4"/>
  <ellipse cx="45" cy="53" rx="21" ry="15" fill="#fff" opacity=".85"/>
  <circle cx="38" cy="50" r="4" fill="#f0a027"/><circle cx="50" cy="55" r="4" fill="#f0a027"/>
  <circle cx="46" cy="45" r="3.4" fill="#f0a027"/>
</svg>`;
const BUT69 = `<svg viewBox="0 0 30 112">
  <path d="M8 24h14v70H8z" fill="#f6c344" stroke="#c08f10" stroke-width="2"/>
  <path d="M8 24h14l-7-16z" fill="#e8b07f" stroke="#a5642f" stroke-width="2"/>
  <path d="M11 13h8l-4-5z" fill="#3a3a44"/>
  <path d="M8 94h14v12H8z" fill="#e8552f" stroke="#a5321a" stroke-width="2"/>
</svg>`;

BANKS.b69 = [

/* ===== tr.87 – Luyện tập 1, Bài 1: Mai đến nhà mỗi bạn vào lúc nào? ===== */
() => {
  const q = Q(1, 'Buổi sáng, Mai và bố đến nhà để tặng bánh cho các bạn.<br>'
    + 'Xem đồng hồ và cho biết Mai đến nhà mỗi bạn vào lúc nào?');
  const hs = SHF69([7, 8, 9]);
  const ms = SHF69([35, 40, 45, 50, 55]).slice(0, 3);
  const ts = hs.map((h, i) => h * 60 + ms[i]).sort((a, b) => a - b);
  const ban = SHF69(['Việt', 'Nam', 'Mi']).slice(0, 2);
  const h0 = Math.floor(ts[0] / 60), m0 = ts[0] % 60;
  const line = (ten, t) => {
    const h = Math.floor(t / 60), m = t % 60;
    return `<div class="b69-line">Mai đến nhà ${ten} lúc ${q.num(h)} giờ ${q.num(m)} phút,
      hay ${q.num(h + 1)} giờ kém ${q.num(60 - m)} phút.</div>`;
  };
  const html = noteBox(`Mẫu: Mai đến nhà Rô-bốt lúc ${h0} giờ ${m0} phút,<br>
      hay ${h0 + 1} giờ kém ${60 - m0} phút.`)
    + `<div class="b69-row b69-row3">${clock69(ts[0], 'Nhà Rô-bốt', '')}
      ${clock69(ts[1], 'Nhà ' + ban[0], '')}${clock69(ts[2], 'Nhà ' + ban[1], '')}</div>`
    + line(ban[0], ts[1]) + line(ban[1], ts[2]);
  return q.done(html,
    `Kim ngắn chỉ giờ, kim dài chỉ phút: nhà ${ban[0]} lúc ${HM69(ts[1])}; `
    + `nhà ${ban[1]} lúc ${HM69(ts[2])}. Còn thiếu bao nhiêu phút nữa thì đủ giờ tròn `
    + `thì đọc là "giờ kém" bấy nhiêu phút.`);
},

/* ===== tr.88 – Luyện tập 1, Bài 2: xem tờ lịch tháng 4 ===== */
() => {
  const q = Q(2, 'Xem tờ lịch tháng 4 rồi trả lời câu hỏi.');
  const fw = R(0, 6);                                  /* thứ của ngày 1 tháng 4 */
  const w = (fw + 20) % 7;                             /* thứ của ngày 21 tháng 4 */
  const sat1 = DAY69(4, fw, 5)[0];                     /* thứ Bảy đầu tiên */
  const kmax = Math.min(5, sat1);
  const k = kmax >= 2 ? R(2, kmax) : 1;                /* số bông hoa trên cây hôm đó */
  const batDau = sat1 - k + 1;                         /* ngày cây bắt đầu ra hoa */
  const html = cal69(4, fw)
    + '<div class="b69-sub"><span class="b69-let">a)</span>Ngày Sách Việt Nam 21 tháng 4 là thứ mấy?</div>'
    + `<div class="fill-line b69-wide">Ngày 21 tháng 4 là ${q.pick(THU69[w], THU69)}</div>`
    + `<div class="b69-sub"><span class="b69-let">b)</span>Mỗi ngày, cây đậu thần kì của Rô-bốt
        đều có thêm một bông hoa. Vào thứ Bảy đầu tiên của tháng 4, trên cây có ${CHU69[k]} bông hoa.
        Hỏi cây bắt đầu ra hoa vào ngày nào?</div>`
    + `<div class="bullet">Cây bắt đầu ra hoa vào ngày ${q.num(batDau)} tháng 4.</div>`;
  return q.done(html,
    `Ngày 1 tháng 4 là ${THU69[fw]} nên ngày 21 tháng 4 là ${THU69[w]}. `
    + `Thứ Bảy đầu tiên của tháng 4 là ngày ${sat1}; hôm đó cây có ${k} bông hoa `
    + `nên cây bắt đầu ra hoa trước đó ${k - 1} ngày, tức ngày ${batDau} tháng 4.`);
},

/* ===== tr.88 – Luyện tập 1, Bài 3: giá cái kẹo và gói bim bim ===== */
() => {
  const q = Q(3, 'Mai vừa mua một cái kẹo có giá như hình dưới đây:');
  const KEO = pick([[1000, 2], [1000, 3], [1000, 4], [2000, 2], [2000, 3], [5000, 2]]);
  const gia = KEO[0] * KEO[1];
  const them = pick([2000, 5000, 10000]);
  const bim = gia + them;
  const to = [];
  for (let i = 0; i < KEO[1]; i++) to.push(money69(KEO[0]));
  const html = `<div class="b69-money"><span class="b69-box">${KEO69}</span>
      <span class="b69-link"></span>${to.join('')}</div>
    <p class="wordq">Sau đó, Mai muốn trả lại cái kẹo để mua một gói bim bim, người bán hàng đồng ý.
      Như vậy, Mai phải đưa thêm cho người bán hàng một tờ ${SP69(them)} đồng.</p>
    <div class="b69-money"><span class="b69-box">${BIM69}</span></div>
    <div class="b69-sub">Hỏi:</div>
    <div class="bullet"><span class="b69-let">a)</span>Giá của một cái kẹo là
      ${q.num(gia)} đồng.</div>
    <div class="bullet"><span class="b69-let">b)</span>Giá của một gói bim bim là
      ${q.num(bim)} đồng.</div>`;
  return q.done(html,
    `Cái kẹo giá ${KEO[1]} tờ ${SP69(KEO[0])} đồng, tức ${SP69(gia)} đồng. `
    + `Gói bim bim đắt hơn cái kẹo ${SP69(them)} đồng nên có giá `
    + `${SP69(gia)} + ${SP69(them)} = ${SP69(bim)} (đồng).`);
},

/* ===== tr.88 – Luyện tập 1, Bài 4: Số ? ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const a = R(2, 6), b = R(2, 6);
  const html = `<div class="b69-two">
      <div><span class="b69-let">a)</span>${a} giờ = ${q.num(a * 60)} phút</div>
      <div><span class="b69-let">b)</span>${b} năm = ${q.num(b * 12)} tháng</div>
    </div>`;
  return q.done(html,
    `1 giờ = 60 phút nên ${a} giờ = 60 × ${a} = ${a * 60} (phút); `
    + `1 năm = 12 tháng nên ${b} năm = 12 × ${b} = ${b * 12} (tháng).`);
},

/* ===== tr.88, 89 – Luyện tập 1, Bài 5: Rô-bốt đi học bằng xe buýt ===== */
() => {
  const q = Q(5, 'Hôm nay, Rô-bốt đi học bằng xe buýt. Quan sát rồi cho biết Rô-bốt đi từ nhà '
    + 'đến trường mất bao nhiêu phút và đi từ trường về nhà mất bao nhiêu phút.');
  const t1 = R(6, 7) * 60 + R(0, 5) * 5;
  const d1 = R(3, 8) * 5;
  const t3 = R(16, 17) * 60 + R(0, 5) * 5;
  const d2 = R(3, 8) * 5;
  const html = `<div class="b69-trip">${clock69(t1, 'Lên xe buýt', '')}
      <div class="b69-mid"><div class="b69-arlbl">Đến trường</div>
        <div class="b69-arrow">&rarr;</div></div>
      ${clock69(t1 + d1, 'Tới cổng trường', '')}</div>
    <div class="b69-trip">${clock69(t3, 'Tan học', '')}
      <div class="b69-mid"><div class="b69-arlbl">Về nhà</div>
        <div class="b69-arrow">&rarr;</div></div>
      ${clock69(t3 + d2, 'Về tới nhà', '')}</div>
    <div class="bullet">Rô-bốt đi từ nhà đến trường mất ${q.num(d1)} phút.</div>
    <div class="bullet">Rô-bốt đi từ trường về nhà mất ${q.num(d2)} phút.</div>`;
  return q.done(html,
    `Từ ${HM69(t1)} đến ${HM69(t1 + d1)} là ${d1} phút; `
    + `từ ${HM69(t3)} đến ${HM69(t3 + d2)} là ${d2} phút.`);
},

/* ===== tr.90 – Luyện tập 2, Bài 1: hoạt động nào diễn ra trước / sau ===== */
() => {
  const q = Q(1, '');
  const mk2 = (h1, h2) => {
    const a = R(h1, h2) * 60 + R(0, 11) * 5;
    let b = R(h1, h2) * 60 + R(0, 11) * 5;
    for (let g = 0; g < 30 && Math.abs(b - a) < 20; g++) b = R(h1, h2) * 60 + R(0, 11) * 5;
    if (Math.abs(b - a) < 20) b = a + 45;
    return [a, b];
  };
  const sa = mk2(7, 10), ch = mk2(14, 16), to = mk2(19, 21);
  const A = ['Làm bài tập', 'Sắp xếp giá sách'];
  const B = ['Gấp quần áo', 'Làm bánh'];
  const C = ['Xem phim', 'Đọc truyện'];
  const cards = (ten, ts) => '<div class="b69-acts">' + ten.map((x, i) =>
    `<div>${clock69(ts[i], '', '')}<div>${x}</div></div>`).join('') + '</div>';
  const truoc = (ten, ts) => ts[0] < ts[1] ? ten[0] : ten[1];
  const sau = (ten, ts) => ts[0] > ts[1] ? ten[0] : ten[1];
  const html = `<div class="b69-sub"><span class="b69-let">a)</span>Sáng thứ Bảy, Mai đã thực hiện
      hai hoạt động là: làm bài tập và sắp xếp giá sách. Hỏi Mai thực hiện hoạt động nào trước?</div>
    ${cards(A, sa)}
    <div class="fill-line b69-wide">Mai thực hiện trước: ${q.pick(truoc(A, sa), A)}</div>
    <div class="b69-sub"><span class="b69-let">b)</span>Chiều thứ Bảy, Mai đã thực hiện hai hoạt động
      là: gấp quần áo và làm bánh. Hỏi hoạt động nào diễn ra sau?</div>
    ${cards(B, ch)}
    <div class="fill-line b69-wide">Hoạt động diễn ra sau: ${q.pick(sau(B, ch), B)}</div>
    <div class="b69-sub"><span class="b69-let">c)</span>Tối thứ Bảy, Mai đã thực hiện hai hoạt động
      là: xem phim và đọc truyện. Hỏi hoạt động nào diễn ra trước?</div>
    ${cards(C, to)}
    <div class="fill-line b69-wide">Hoạt động diễn ra trước: ${q.pick(truoc(C, to), C)}</div>`;
  return q.done(html,
    `a) ${A[0]} lúc ${HM69(sa[0])}, ${A[1]} lúc ${HM69(sa[1])} nên ${truoc(A, sa)} diễn ra trước. `
    + `b) ${B[0]} lúc ${HM69(ch[0])}, ${B[1]} lúc ${HM69(ch[1])} nên ${sau(B, ch)} diễn ra sau. `
    + `c) ${C[0]} lúc ${HM69(to[0])}, ${C[1]} lúc ${HM69(to[1])} nên ${truoc(C, to)} diễn ra trước.`);
},

/* ===== tr.90 – Luyện tập 2, Bài 2: xem tờ lịch tháng 12 ===== */
() => {
  const q = Q(2, 'Xem tờ lịch tháng 12 rồi trả lời các câu hỏi.');
  const fw = R(0, 6);
  const cn = DAY69(12, fw, 6);                    /* các ngày Chủ nhật */
  const sat = DAY69(12, fw, 5);                   /* các ngày thứ Bảy */
  const i0 = R(0, sat.length - 2);
  const D = sat[i0];
  const soBuoi = sat.length - i0;
  const html = cal69(12, fw)
    + `<div class="b69-sub"><span class="b69-let">a)</span>Rô-bốt học bóng rổ vào Chủ nhật hằng tuần.
        Hỏi trong tháng 12, Rô-bốt học bóng rổ vào những ngày nào?</div>
      <div class="fill-line">Đó là các ngày:
        ${cn.map(d => q.num(d)).join('<span class="op">,</span>')}</div>
      <div class="b69-sub"><span class="b69-let">b)</span>Bắt đầu từ ngày ${D} tháng 12,
        Mai học vẽ vào chiều thứ Bảy hằng tuần. Hỏi trong tháng 12, Mai có bao nhiêu buổi học vẽ?</div>
      <div class="bullet">Trong tháng 12, Mai có ${q.num(soBuoi)} buổi học vẽ.</div>`;
  return q.done(html,
    `Ngày 1 tháng 12 là ${THU69[fw]}. Các ngày Chủ nhật là ${cn.join(', ')}. `
    + `Các ngày thứ Bảy từ ngày ${D} trở đi là ${sat.slice(i0).join(', ')}, `
    + `tất cả có ${soBuoi} ngày.`);
},

/* ===== tr.90 – Luyện tập 2, Bài 3: Nam mua ba cái bút chì giống nhau ===== */
() => {
  const q = Q(3, 'Nam có một số tiền như hình dưới đây. Nam đã dùng toàn bộ số tiền đó để mua ba '
    + 'cái bút chì giống nhau. Nếu Việt cũng mua một cái bút chì giống như Nam, thì Việt phải trả '
    + 'bao nhiêu tiền?');
  const COMBO = [
    [1000, 1000, 1000], [2000, 1000], [2000, 2000, 2000], [5000, 1000],
    [2000, 2000, 5000], [5000, 5000, 2000], [10000, 2000], [10000, 5000],
    [20000, 1000], [10000, 10000, 10000], [20000, 10000], [20000, 20000, 2000],
    [50000, 10000]
  ];
  const to = pick(COMBO);
  const tong = to.reduce((s, x) => s + x, 0);
  const gia = tong / 3;
  const html = `<div class="b69-money">${SHF69(to).map(money69).join('')}</div>
    <div class="b69-buts">${BUT69}${BUT69}${BUT69}</div>
    <div class="bullet">Nam có tất cả ${q.num(tong)} đồng.</div>
    <div class="bullet">Việt phải trả ${q.num(gia)} đồng.</div>`;
  return q.done(html,
    `Nam có ${to.map(SP69).join(' + ')} = ${SP69(tong)} (đồng). `
    + `Ba cái bút chì giống nhau nên giá một cái bút chì là `
    + `${SP69(tong)} : 3 = ${SP69(gia)} (đồng). Vậy Việt phải trả ${SP69(gia)} đồng.`);
},

/* ===== tr.91 – Luyện tập 2, Bài 4a: chọn đồng hồ thay vào ô "?" (thiếu đồng hồ cuối) ===== */
() => {
  const q = Q(4, 'a) Chọn đồng hồ thích hợp thay vào ô có dấu "?".');
  const step = pick([5, 10, 15, 20, 30]);
  const t0 = R(1, 7) * 60 + pick([0, 15, 30, 45]);
  const ts = [0, 1, 2, 3, 4].map(i => t0 + i * step);
  const dung = ts[4];
  const sai = khac69(dung, [step, -step, 5, -5, 30, -30, 60, -60], 3, ts);
  const all = SHF69([dung].concat(sai));
  const ans = LET69[all.indexOf(dung)];
  const html = '<div class="b69-seq">'
    + ts.slice(0, 4).map(t => clock69(t, '', '')).join('')
    + '<div class="b69-qm">?</div></div>'
    + `<div class="b69-row b69-row4">${all.map((t, i) => clock69(t, '', LET69[i])).join('')}</div>
       <div class="fill-line b69-wide">Chọn: ${q.pick(ans, LET69)}</div>`;
  return q.done(html,
    `Các đồng hồ hơn kém nhau ${step} phút: ${ts.map(HM69).join('; ')}. `
    + `Đồng hồ cần tìm chỉ ${HM69(dung)} nên chọn ${ans}.`);
},

/* ===== tr.91 – Luyện tập 2, Bài 4b: chọn đồng hồ thay vào ô "?" (thiếu đồng hồ đầu) ===== */
() => {
  const q = Q(4, 'b) Chọn đồng hồ thích hợp thay vào ô có dấu "?".');
  const step = pick([5, 10, 15, 20, 30]);
  const t0 = R(2, 8) * 60 + pick([0, 15, 30, 45]);
  const ts = [0, 1, 2, 3, 4].map(i => t0 + i * step);
  const dung = ts[0];
  const sai = khac69(dung, [step, -step, 5, -5, 30, -30, 60, -60], 3, ts);
  const all = SHF69([dung].concat(sai));
  const ans = LET69[all.indexOf(dung)];
  const html = '<div class="b69-seq"><div class="b69-qm">?</div>'
    + ts.slice(1).map(t => clock69(t, '', '')).join('') + '</div>'
    + `<div class="b69-row b69-row4">${all.map((t, i) => clock69(t, '', LET69[i])).join('')}</div>
       <div class="fill-line b69-wide">Chọn: ${q.pick(ans, LET69)}</div>`;
  return q.done(html,
    `Các đồng hồ hơn kém nhau ${step} phút: ${ts.map(HM69).join('; ')}. `
    + `Đồng hồ cần tìm chỉ ${HM69(dung)} nên chọn ${ans}.`);
},

/* ===== tr.91 – Luyện tập 2, Bài 5: Số ? ===== */
() => {
  const q = Q(5, '<span class="tag">Số</span> ?');
  const a = R(2, 6), b = R(2, 6), c = R(2, 6), d = R(2, 5);
  const html = `<div class="b69-two">
      <div><span class="b69-let">a)</span>${a} tuần = ${q.num(a * 7)} ngày</div>
      <div><span class="b69-let">b)</span>${b} giờ = ${q.num(b * 60)} phút</div>
      <div><span class="b69-let">c)</span>${c} năm = ${q.num(c * 12)} tháng</div>
      <div><span class="b69-let">d)</span>${d} ngày = ${q.num(d * 24)} giờ</div>
    </div>`;
  return q.done(html,
    `1 tuần = 7 ngày nên ${a} tuần = ${a * 7} ngày; 1 giờ = 60 phút nên ${b} giờ = ${b * 60} phút; `
    + `1 năm = 12 tháng nên ${c} năm = ${c * 12} tháng; `
    + `1 ngày = 24 giờ nên ${d} ngày = ${d * 24} giờ.`);
},

/* ===== tr.92 – Luyện tập 3, Bài 1a: đồng hồ nào chỉ giờ ăn trưa ===== */
() => {
  const q = Q(1, 'a) Chọn câu trả lời đúng.');
  const bay = 11 * 60 + R(0, 7) * 5;
  const k = pick([5, 10, 15, 20, 25]);
  const dung = bay + k;
  const sai = khac69(dung, [60, -60, 30, -30, 15, -15, 5, -5], 3, [bay]);
  const all = SHF69([dung].concat(sai));
  const ans = LET69[all.indexOf(dung)];
  const html = `<p class="wordq">Bây giờ là ${HM69(bay)}, ${k} phút nữa là đến giờ ăn trưa.
      Hỏi đồng hồ nào dưới đây chỉ giờ ăn trưa?</p>
    <div class="b69-row b69-row4">${clock69(bay, 'Bây giờ', '')}</div>
    <div class="b69-row b69-row4">${all.map((t, i) => clock69(t, '', LET69[i])).join('')}</div>
    <div class="fill-line b69-wide">Chọn: ${q.pick(ans, LET69)}</div>`;
  return q.done(html,
    `${HM69(bay)} thêm ${k} phút nữa là ${HM69(dung)}, nên chọn ${ans}.`);
},

/* ===== tr.92 – Luyện tập 3, Bài 1b: đồng hồ nào chỉ lúc bắt đầu ra chơi ===== */
() => {
  const q = Q(1, 'b) Chọn câu trả lời đúng.');
  const bay = R(2, 4) * 60 + R(3, 11) * 5;
  const k = pick([5, 10, 15, 20, 25]);
  const dung = bay - k;
  const sai = khac69(dung, [60, -60, 30, -30, 15, -15, 5, -5], 3, [bay]);
  const all = SHF69([dung].concat(sai));
  const ans = LET69[all.indexOf(dung)];
  const html = `<p class="wordq">Bây giờ là ${HM69(bay)}, các bạn đã ra chơi được ${k} phút.
      Hỏi đồng hồ nào dưới đây chỉ lúc bắt đầu ra chơi?</p>
    <div class="b69-row b69-row4">${clock69(bay, 'Bây giờ', '')}</div>
    <div class="b69-row b69-row4">${all.map((t, i) => clock69(t, '', LET69[i])).join('')}</div>
    <div class="fill-line b69-wide">Chọn: ${q.pick(ans, LET69)}</div>`;
  return q.done(html,
    `Các bạn đã ra chơi được ${k} phút nên lúc bắt đầu ra chơi là `
    + `${HM69(bay)} bớt đi ${k} phút, tức ${HM69(dung)}. Vậy chọn ${ans}.`);
},

/* ===== tr.92 – Luyện tập 3, Bài 2: Số ? ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const a = R(1, 11) * 5, b = R(1, 6), c = R(1, 11), d = R(1, 12);
  const html = `<div class="b69-two">
      <div><span class="b69-let">a)</span>1 giờ ${a} phút = ${q.num(60 + a)} phút</div>
      <div><span class="b69-let">b)</span>1 tuần ${b} ngày = ${q.num(7 + b)} ngày</div>
      <div><span class="b69-let">c)</span>1 năm ${c} tháng = ${q.num(12 + c)} tháng</div>
      <div><span class="b69-let">d)</span>1 ngày ${d} giờ = ${q.num(24 + d)} giờ</div>
    </div>`;
  return q.done(html,
    `1 giờ ${a} phút = 60 phút + ${a} phút = ${60 + a} phút; `
    + `1 tuần ${b} ngày = 7 ngày + ${b} ngày = ${7 + b} ngày; `
    + `1 năm ${c} tháng = 12 tháng + ${c} tháng = ${12 + c} tháng; `
    + `1 ngày ${d} giờ = 24 giờ + ${d} giờ = ${24 + d} giờ.`);
},

/* ===== tr.93 – Luyện tập 3, Bài 3: tuổi của Mi và tháng sinh của ba bạn ===== */
() => {
  const q = Q(3, '');
  const A = R(5, 8), B = R(1, 11);
  const conLai = 12 - B;
  const v = R(1, 3), m = R(2, 4);
  const n = R(3, Math.min(6, 12 - v - m));
  const thangMai = v + m, thangNam = v + m + n;
  const html = `<div class="b69-sub"><span class="b69-let">a)</span>Hiện nay Mi đã được
      ${A} năm ${B} tháng tuổi. Hỏi sau bao nhiêu tháng nữa thì Mi tròn ${A + 1} tuổi?</div>
    <div class="bullet">Sau ${q.num(conLai)} tháng nữa thì Mi tròn ${A + 1} tuổi.</div>
    <div class="b69-sub"><span class="b69-let">b)</span>Mai, Việt và Nam được sinh ra cùng năm
      nhưng khác tháng. Biết Việt được sinh ra vào tháng ${v}, Mai được sinh ra sau Việt ${m} tháng
      và trước Nam ${n} tháng. Hỏi Nam được sinh ra vào tháng mấy?</div>
    <div class="bullet">Nam được sinh ra vào tháng ${q.num(thangNam)}.</div>`;
  return q.done(html,
    `a) 1 năm có 12 tháng nên Mi cần thêm 12 &minus; ${B} = ${conLai} (tháng) nữa `
    + `thì tròn ${A + 1} tuổi. `
    + `b) Mai sinh vào tháng ${v} + ${m} = ${thangMai}; Nam sinh sau Mai ${n} tháng `
    + `nên Nam sinh vào tháng ${thangMai} + ${n} = ${thangNam}.`);
},
];
