/* ==================== BÀI 7: ÔN TẬP HÌNH HỌC VÀ ĐO LƯỜNG (SGK tr.21, 22, 23) ====================
   luyện tập tr.21–22 (Ôn tập hình học): bài 1, 2, 3, 4, 5
   luyện tập tr.23  (Ôn tập đo lường):   bài 1, 2, 3, 4, 5
================================================================================================= */

ART.b7Solid = k => {
  if (k === 'hop') return `<svg viewBox="0 0 80 90" class="solid">
    <path d="M12 30h36v48H12z" fill="#f05a4c" stroke="#a3281e" stroke-width="2"/>
    <path d="M12 30l18-14h36l-18 14z" fill="#ff8073" stroke="#a3281e" stroke-width="2"/>
    <path d="M48 30l18-14v48l-18 14z" fill="#c03a2e" stroke="#a3281e" stroke-width="2"/></svg>`;
  if (k === 'lp') return `<svg viewBox="0 0 80 90" class="solid">
    <path d="M14 32h36v36H14z" fill="#5ec6f0" stroke="#2b6f9e" stroke-width="2"/>
    <path d="M14 32l18-14h36l-18 14z" fill="#8fdcfa" stroke="#2b6f9e" stroke-width="2"/>
    <path d="M50 32l18-14v36l-18 14z" fill="#3aa6d6" stroke="#2b6f9e" stroke-width="2"/></svg>`;
  if (k === 'tru') return `<svg viewBox="0 0 80 90" class="solid">
    <path d="M18 30h44v34a22 9 0 0 1-44 0z" fill="#f2cf52" stroke="#b8901c" stroke-width="2"/>
    <ellipse cx="40" cy="30" rx="22" ry="9" fill="#ffe680" stroke="#b8901c" stroke-width="2"/></svg>`;
  return `<svg viewBox="0 0 80 90" class="solid">
    <circle cx="40" cy="48" r="24" fill="#c3d4f0" stroke="#5a76ad" stroke-width="2"/>
    <ellipse cx="31" cy="38" rx="8" ry="5" fill="#fff" opacity=".7"/></svg>`;
};

ART.b7Obj = k => {
  if (k === 'hutbui') return `<svg viewBox="0 0 120 96" class="obj-art">
    <path d="M14 42h92v20a46 16 0 0 1-92 0z" fill="#dfe8f2" stroke="#8296ad" stroke-width="2.6"/>
    <ellipse cx="60" cy="42" rx="46" ry="16" fill="#f4f8fc" stroke="#8296ad" stroke-width="2.6"/>
    <ellipse cx="60" cy="40" rx="26" ry="8" fill="#e3eef8" stroke="#a8bccd" stroke-width="2"/>
    <circle cx="60" cy="40" r="4" fill="#8296ad"/>
    <path d="M20 62q40 14 80 0" fill="none" stroke="#5b7fa6" stroke-width="4"/></svg>`;
  if (k === 'beca') return `<svg viewBox="0 0 120 96" class="obj-art">
    <path d="M18 28h68l16 12v42l-16 12H18z" fill="#bfe7f7" stroke="#4e93b5" stroke-width="2.6"/>
    <path d="M18 28v66M86 28v54l16 12V40zM18 28h68l16 12H18z" fill="none" stroke="#4e93b5" stroke-width="2.4"/>
    <path d="M18 70h68l16-10" fill="none" stroke="#d9c08a" stroke-width="8"/>
    <path d="M34 66q5-16 11-2 5-12 9 2" fill="none" stroke="#e2739a" stroke-width="3"/>
    <path d="M64 66q5-13 9-2" fill="none" stroke="#7bc47f" stroke-width="3"/></svg>`;
  if (k === 'rubich') return `<svg viewBox="0 0 120 96" class="obj-art">
    <path d="M24 36h48v48H24z" fill="#e2483c" stroke="#333" stroke-width="2.4"/>
    <path d="M24 36l20-16h48L72 36z" fill="#8ad84a" stroke="#333" stroke-width="2.4"/>
    <path d="M72 36l20-16v48L72 84z" fill="#3aa6d6" stroke="#333" stroke-width="2.4"/>
    <path d="M40 36v48M56 36v48M24 52h48M24 68h48" stroke="#333" stroke-width="1.8"/>
    <path d="M30.7 29.3h48M37.3 22.7h48M92 36L72 52M92 52L72 68" stroke="#333" stroke-width="1.6" opacity=".75"/></svg>`;
  return `<svg viewBox="0 0 120 96" class="obj-art">
    <circle cx="60" cy="42" r="30" fill="#9ec6ee" stroke="#3f6ba8" stroke-width="2.6"/>
    <path d="M40 26q22 10 42 2M32 46q30 12 56-2M46 62q16 6 30 0" fill="none" stroke="#5c9a5c" stroke-width="3"/>
    <path d="M60 12v60" stroke="#3f6ba8" stroke-width="1.6" opacity=".5"/>
    <path d="M56 72h8v12h-8z" fill="#7d92b5" stroke="#3f6ba8" stroke-width="2"/>
    <path d="M42 92h36l-8-8H50z" fill="#7d92b5" stroke="#3f6ba8" stroke-width="2.4"/></svg>`;
};

ART.b7Tri = P => `<svg viewBox="0 0 300 200" class="tri-art">
  <path d="M150 22L40 172H260z" fill="none" stroke="#2b2b2b" stroke-width="2.4"/>
  <path d="M89 104L260 172M211 104L40 172" fill="none" stroke="#2b2b2b" stroke-width="2.4"/>
  <circle cx="150" cy="22" r="4"/><circle cx="40" cy="172" r="4"/><circle cx="260" cy="172" r="4"/>
  <circle cx="89" cy="104" r="4"/><circle cx="211" cy="104" r="4"/><circle cx="150" cy="128" r="4"/>
  <text x="150" y="14" text-anchor="middle" font-size="17" font-weight="700">${P.A}</text>
  <text x="26" y="192" font-size="17" font-weight="700">${P.B}</text>
  <text x="258" y="192" font-size="17" font-weight="700">${P.C}</text>
  <text x="68" y="102" font-size="17" font-weight="700">${P.N}</text>
  <text x="220" y="102" font-size="17" font-weight="700">${P.M}</text>
  <text x="158" y="123" font-size="17" font-weight="700">${P.O}</text>
</svg>`;

ART.b7Path = (ab, bc, cd) => `<svg viewBox="0 0 470 160" class="path-art">
  <path d="M50 52L155 100H320L425 58" fill="none" stroke="#2b2b2b" stroke-width="3"/>
  <circle cx="50" cy="52" r="4"/><circle cx="155" cy="100" r="4"/>
  <circle cx="320" cy="100" r="4"/><circle cx="425" cy="58" r="4"/>
  <ellipse cx="34" cy="34" rx="17" ry="13" fill="#f2b9a0" stroke="#c07a5c" stroke-width="2"/>
  <circle cx="30" cy="34" r="8" fill="#efd0b6" stroke="#c07a5c" stroke-width="2"/>
  <path d="M48 24v-8M54 26v-8" stroke="#c07a5c" stroke-width="2" stroke-linecap="round"/>
  <path d="M420 46q-14-14-2-20 10 12 2 20zM430 46q14-14 2-20-10 12-2 20z" fill="#5cb84a" stroke="#3d8a30" stroke-width="2"/>
  <path d="M421 46h10v14h-10z" fill="#a06a3a"/>
  <text x="34" y="66" font-size="16" font-weight="700">A</text>
  <text x="150" y="122" font-size="16" font-weight="700">B</text>
  <text x="315" y="122" font-size="16" font-weight="700">C</text>
  <text x="436" y="54" font-size="16" font-weight="700">D</text>
  <text x="66" y="90" font-size="15">${ab} cm</text>
  <text x="205" y="94" font-size="15">${bc} cm</text>
  <text x="348" y="94" font-size="15">${cd} cm</text>
</svg>`;

ART.b7House = (w, h, rh) => {
  const C = 22, cols = w + 4, rows = h + rh + 2, W = cols * C, H = rows * C;
  let g = '';
  for (let i = 0; i <= cols; i++) g += `<path d="M${i * C} 0V${H}"/>`;
  for (let j = 0; j <= rows; j++) g += `<path d="M0 ${j * C}H${W}"/>`;
  const x0 = 2 * C, y0 = (rh + 1) * C, x1 = x0 + w * C, y1 = y0 + h * C;
  const dx = x0 + Math.floor(w / 2) * C, dh = (h - 2) * C;
  return `<svg viewBox="0 0 ${W} ${H}" class="grid-art">
    <g fill="none" stroke="#9fd0ef" stroke-width="1">${g}</g>
    <g fill="none" stroke="#2b2b2b" stroke-width="3">
      <path d="M${x0} ${y0}H${x1}V${y1}H${x0}z"/>
      <path d="M${x0 - C} ${y0}L${(x0 + x1) / 2} ${y0 - rh * C}L${x1 + C} ${y0}"/></g>
    <g fill="none" stroke="#2b2b2b" stroke-width="2.4">
      <path d="M${x0 + C} ${y0 + C}h${2 * C}v${2 * C}h${-2 * C}z"/>
      <path d="M${dx} ${y1}v${-dh}h${2 * C}v${dh}"/></g>
  </svg>`;
};

ART.b7Quad = vert => `<svg viewBox="0 0 360 170" class="quad-art">
  <path d="M110 20H250L320 150H40z" fill="none" stroke="#2b2b2b" stroke-width="2.6"/>
  <path d="M69.6 95H290.4" fill="none" stroke="#2b2b2b" stroke-width="2.6"/>
  ${vert ? '<path d="M180 95V150" fill="none" stroke="#2b2b2b" stroke-width="2.6"/>' : ''}
</svg>`;

ART.b7Scale = (v, fruit) => {
  const a = (v * 36 - 90) * Math.PI / 180;
  const nx = (60 + 21 * Math.cos(a)).toFixed(1), ny = (78 + 21 * Math.sin(a)).toFixed(1);
  const marks = Array.from({length:10}, (_, i) => {
    const t = ((i + 1) * 36 - 90) * Math.PI / 180;
    return `<text x="${(60 + 26 * Math.cos(t)).toFixed(1)}" y="${(78 + 26 * Math.sin(t) + 3.2).toFixed(1)}"
      text-anchor="middle" font-size="8" fill="#2c4a2c">${i + 1}</text>`;
  }).join('');
  const top = fruit === 'mit'
    ? `<ellipse cx="60" cy="26" rx="38" ry="19" fill="#a8b34a" stroke="#6f7a24" stroke-width="2"/>
       <path d="M24 20h72M24 28h72M24 35h72" stroke="#8b9636" stroke-width="1.4" opacity=".8"/>
       <path d="M96 16l14-8" stroke="#6f7a24" stroke-width="3" stroke-linecap="round"/>`
    : `<circle cx="60" cy="26" r="22" fill="#4fae4a" stroke="#2f7a2c" stroke-width="2"/>
       <path d="M46 10q6 16 0 32M60 4v44M74 10q-6 16 0 32" fill="none" stroke="#2f7a2c" stroke-width="2"/>`;
  return `<svg viewBox="0 0 120 118" class="scale-art">${top}
    <ellipse cx="60" cy="47" rx="43" ry="8" fill="#e6f3e6" stroke="#2f7a2c" stroke-width="2"/>
    <path d="M22 52h76l-8 60H30z" fill="#4fae4a" stroke="#2f7a2c" stroke-width="2.4"/>
    <circle cx="60" cy="78" r="29" fill="#fff" stroke="#2f7a2c" stroke-width="2.4"/>${marks}
    <line x1="60" y1="78" x2="${nx}" y2="${ny}" stroke="#e03b3b" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="60" cy="78" r="3" fill="#2f7a2c"/></svg>`;
};

ART.b7Can = (l, big) => `<span class="canw${big ? ' big' : ''}"><svg viewBox="0 0 90 120">
  <rect x="10" y="26" width="70" height="88" rx="9" fill="#dcdcee" stroke="#6a6a8a" stroke-width="3"/>
  <rect x="33" y="8" width="24" height="20" rx="5" fill="#cfcfe4" stroke="#6a6a8a" stroke-width="3"/>
  <path d="M20 34h50v16H20z" fill="none" stroke="#6a6a8a" stroke-width="2.4"/>
</svg><b>${l} <i>l</i></b></span>`;

ART.b7Clock = (h, m) => {
  const rad = d => d * Math.PI / 180;
  const ha = rad((h % 12) * 30 + m * .5 - 90), ma = rad(m * 6 - 90);
  const hx = (50 + 22 * Math.cos(ha)).toFixed(1), hy = (50 + 22 * Math.sin(ha)).toFixed(1);
  const mx = (50 + 33 * Math.cos(ma)).toFixed(1), my = (50 + 33 * Math.sin(ma)).toFixed(1);
  const nums = Array.from({length:12}, (_, i) => {
    const a = rad(i * 30 - 60);
    return `<text x="${(50 + 37 * Math.cos(a)).toFixed(1)}" y="${(50 + 37 * Math.sin(a) + 4).toFixed(1)}"
      text-anchor="middle" font-size="10" fill="#444">${i + 1}</text>`;
  }).join('');
  return `<svg viewBox="0 0 100 100" class="clock-art">
    <circle cx="50" cy="50" r="46" fill="#fff" stroke="#f0912a" stroke-width="6"/>${nums}
    <line x1="50" y1="50" x2="${hx}" y2="${hy}" stroke="#333" stroke-width="4.4" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="${mx}" y2="${my}" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="3.4" fill="#e03b3b"/></svg>`;
};

ART.b7Digi = t => `<svg viewBox="0 0 120 58" class="digi-art">
  <rect x="4" y="6" width="112" height="46" rx="8" fill="#2b2b2b" stroke="#666" stroke-width="2"/>
  <text x="60" y="41" text-anchor="middle" font-size="27" font-weight="700" fill="#f6c344">${t}</text>
</svg>`;

BANKS.b7 = [

/* ===== tr.21 – Bài 1: a) Nhận dạng hình khối · b) Chọn hình thích hợp ===== */
() => {
  const q = Q(1, 'a) Mỗi đồ vật dưới đây có dạng hình khối gì?');
  const NAME = {hutbui:'trụ', beca:'hộp chữ nhật', rubich:'lập phương', diacau:'cầu'};
  const CAP = {hutbui:'Rô-bốt hút bụi', beca:'Bể cá', rubich:'Khối ru-bích', diacau:'Quả địa cầu'};
  const OPTS = ['lập phương', 'hộp chữ nhật', 'trụ', 'cầu'].sort(() => Math.random() - .5);
  const objs = ['hutbui', 'beca', 'rubich', 'diacau'].sort(() => Math.random() - .5);
  const partA = '<div class="obj-row">' + objs.map(k =>
    `<div class="obj-item">${ART.b7Obj(k)}<span class="obj-cap">${CAP[k]}</span>
      <div>khối ${q.pick(NAME[k], OPTS)}</div></div>`).join('') + '</div>';

  const L = ['A', 'B', 'C', 'D'];
  const unit = ['hop', 'tru', 'lp', 'cau'].sort(() => Math.random() - .5);
  const seq = [].concat(unit, unit, unit);
  const hidden = R(4, 10);
  const solOpts = ['hop', 'tru', 'lp', 'cau'].sort(() => Math.random() - .5);
  const okB = L[solOpts.indexOf(seq[hidden])];
  const partB = `<div class="sub-lbl">b) Chọn hình thích hợp đặt vào dấu "?".</div>
    <div class="pat-row">${seq.map((k, i) => i === hidden
      ? '<span class="pat-q">?</span>' : `<span>${ART.b7Solid(k)}</span>`).join('')}</div>
    <div class="pick-row">${solOpts.map((k, i) =>
      `<span><em>${L[i]}.</em>${ART.b7Solid(k)}</span>`).join('')}</div>
    ${q.pick(okB, L)}`;
  return q.done(partA + partB, 'Hình lặp lại theo nhóm 4 khối.');
},

/* ===== tr.22 – Bài 2: Nêu tên ba điểm thẳng hàng ===== */
() => {
  const q = Q(2, 'Nêu tên ba điểm thẳng hàng có trong hình bên.');
  const ls = ['A', 'B', 'C', 'M', 'N', 'O'].sort(() => Math.random() - .5);
  const P = {A:ls[0], B:ls[1], C:ls[2], N:ls[3], M:ls[4], O:ls[5]};
  const t = (...ks) => ks.map(k => P[k]).join('');
  const ok = [t('A', 'N', 'B'), t('A', 'M', 'C'), t('N', 'O', 'C'), t('M', 'O', 'B')];
  const bad = [t('A', 'O', 'B'), t('A', 'O', 'C'), t('N', 'O', 'M'), t('B', 'O', 'C')];
  const opts = ok.concat(bad).sort(() => Math.random() - .5);
  return q.done(ART.b7Tri(P) +
    `<div class="fill-line">Chọn tất cả các bộ ba điểm thẳng hàng: ${q.pick([...ok].sort().join(','), opts)}</div>`,
    'Ba điểm thẳng hàng là ba điểm cùng nằm trên một đường thẳng.');
},

/* ===== tr.22 – Bài 3: Độ dài đường gấp khúc ABCD ===== */
() => {
  const q = Q(3, 'Con ốc sên bò đến cây chuối theo đường gấp khúc ABCD. Tính độ dài quãng đường ốc sên phải bò.');
  const ab = R(10, 25) * 5, bc = R(30, 60) * 5, cd = R(20, 50) * 5;
  return q.done(ART.b7Path(ab, bc, cd) +
    `<div class="fill-line">Quãng đường ốc sên phải bò dài ${q.num(ab + bc + cd)} cm.</div>`,
    `${ab} + ${bc} + ${cd} = ${ab + bc + cd} (cm)`);
},

/* ===== tr.22 – Bài 4: Vẽ hình (theo mẫu) ===== */
() => {
  const q = Q(4, 'Vẽ hình (theo mẫu).');
  const w = R(8, 10), h = R(5, 6), rh = R(2, 3);
  return q.done(ART.b7House(w, h, rh) +
    `<div class="fill-line">Thân nhà là hình chữ nhật rộng ${q.num(w, 2)} ô và cao ${q.num(h, 2)} ô.</div>
     <div class="fill-line">Mái nhà cao ${q.num(rh, 2)} ô.</div>
     <div class="hint-line">Đếm số ô vuông rồi vẽ lại hình vào vở theo mẫu.</div>`);
},

/* ===== tr.22 – Bài 5: Chọn câu trả lời đúng (đếm hình tứ giác) ===== */
() => {
  const q = Q(5, 'Chọn câu trả lời đúng.');
  const L = ['A', 'B', 'C', 'D'];
  const vert = Math.random() < .5;
  const n = vert ? 5 : 3;
  const vals = [3, 4, 5, 6];
  const ok = L[vals.indexOf(n)];
  return q.done(ART.b7Quad(vert) +
    `<div class="fill-line">Trong hình bên có bao nhiêu hình tứ giác?</div>
     <div class="opt-row">${vals.map((v, i) => `<span><i>${L[i]}.</i>${v} hình</span>`).join('')}</div>
     ${q.pick(ok, L)}`,
    vert ? 'Hình lớn, hình trên, hình dưới và 2 hình nhỏ ở dưới.' : 'Hình lớn, hình trên và hình dưới.');
},

/* ===== tr.23 – Bài 1: Số ? (cân nặng, dung tích) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const mit = R(5, 9), dua = R(1, mit - 1);
  const nho = R(2, 8), to = R(10, 20);
  return q.done(`<div class="sect">Ôn tập đo lường</div>
    <div class="sub-lbl">a)</div>
    <div class="scale-row">${ART.b7Scale(mit, 'mit')}${ART.b7Scale(dua, 'dua')}</div>
    <div class="bullet">Quả mít cân nặng ${q.num(mit, 2)} kg.</div>
    <div class="bullet">Quả dưa hấu cân nặng ${q.num(dua, 2)} kg.</div>
    <div class="bullet">Quả mít nặng hơn quả dưa hấu ${q.num(mit - dua, 2)} kg.</div>
    <div class="sub-lbl">b) Hai can dưới đây chứa đầy dầu.</div>
    <div class="can-row">${ART.b7Can(nho)}${ART.b7Can(to, true)}</div>
    <div class="fill-line">Cả hai can có ${q.num(nho + to)} <i>l</i> dầu.</div>`,
    `${mit} − ${dua} = ${mit - dua} (kg);  ${nho} + ${to} = ${nho + to} (l)`);
},

/* ===== tr.23 – Bài 2: Chọn câu trả lời đúng (xem giờ, xem lịch) ===== */
() => {
  const q = Q(2, 'Chọn câu trả lời đúng.');
  const L = ['A', 'B', 'C', 'D'];
  const m = pick([15, 30, 45]);
  let h = R(1, 12);
  if (h === m / 5) h = h % 12 + 1;
  const m2 = pick([15, 30, 45].filter(x => x !== m));
  const oa = `${h} giờ ${m} phút`;
  const listA = [oa, `${m / 5} giờ ${h} phút`, `${h} giờ ${m2} phút`, `${m / 5} giờ ${m2} phút`]
    .sort(() => Math.random() - .5);
  const letA = L[listA.indexOf(oa)];

  const W = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const d1 = R(1, 18), gap = R(3, 9), thang = R(1, 12);
  const w1 = R(0, 6), w2 = (w1 + gap) % 7;
  const ob = W[w2];
  const listB = W.filter(x => x !== ob).sort(() => Math.random() - .5).slice(0, 3)
    .concat([ob]).sort(() => Math.random() - .5);
  const letB = L[listB.indexOf(ob)];
  const row = arr => '<div class="opt-row">' + arr.map((v, i) => `<span><i>${L[i]}.</i>${v}</span>`).join('') + '</div>';

  return q.done(`<div class="fill-line">a) Đồng hồ bên đổ chuông lúc:</div>
      <div class="clk-row">${ART.b7Clock(h, m)}</div>${row(listA)}${q.pick(letA, L)}
    <div class="fill-line">b) Nếu ngày ${d1} tháng ${thang} là ${W[w1]} thì ngày ${d1 + gap} tháng ${thang} là:</div>
      ${row(listB)}${q.pick(letB, L)}`,
    `a) ${oa};  b) từ ${W[w1]} đếm thêm ${gap} ngày được ${ob}`);
},

/* ===== tr.23 – Bài 3: Bài toán ăn gạo theo tuần ===== */
() => {
  const q = Q(3, '');
  const moi = pick([2, 3, 4, 5]), tuan = R(3, 8), tong = moi * tuan;
  return q.done(`<p class="wordq">Mỗi tuần gia đình cô Hoa ăn hết ${moi} kg gạo. Cô Hoa mua về ${tong} kg gạo.
      Hỏi gia đình cô Hoa ăn trong mấy tuần thì hết số gạo đó?</p>
    <div class="fill-line">Gia đình cô Hoa ăn trong ${q.num(tuan)} tuần thì hết số gạo đó.</div>`,
    `${tong} : ${moi} = ${tuan} (tuần)`);
},

/* ===== tr.23 – Bài 4: Tìm hai đồng hồ chỉ cùng giờ vào buổi chiều hoặc buổi tối ===== */
() => {
  const q = Q(4, 'Tìm hai đồng hồ chỉ cùng giờ vào buổi chiều hoặc buổi tối.');
  const L1 = ['A', 'B', 'C', 'D'], L2 = ['M', 'N', 'P', 'Q'];
  const an = [];
  for (let g = 0; g < 300 && an.length < 4; g++){
    const h = R(1, 11), m = pick([0, 15, 30, 45]);
    if (!an.some(x => x.h === h && x.m === m)) an.push({h, m});
  }
  const i = R(0, 3);
  const other = [];
  for (let g = 0; g < 300 && other.length < 3; g++){
    const h = R(1, 11), m = pick([0, 15, 30, 45]);
    if (!an.some(x => x.h === h && x.m === m) && !other.some(x => x.h === h && x.m === m)) other.push({h, m});
  }
  const j = R(0, 3);
  const di = other.slice();
  di.splice(j, 0, {h:an[i].h, m:an[i].m});
  const fmt = x => `${x.h + 12}:${x.m < 10 ? '0' + x.m : x.m}`;
  const rowA = an.map((x, k) => `<div class="clk-item"><em>${L1[k]}</em>${ART.b7Clock(x.h, x.m)}</div>`).join('');
  const rowD = di.map((x, k) => `<div class="clk-item"><em>${L2[k]}</em>${ART.b7Digi(fmt(x))}</div>`).join('');
  return q.done(`<div class="clk-row">${rowA}</div><div class="clk-row">${rowD}</div>
    <div class="fill-line">Hai đồng hồ chỉ cùng giờ là: ${q.pick([L1[i], L2[j]].sort().join(','), L1.concat(L2))}</div>`,
    `${L1[i]} chỉ ${an[i].h} giờ ${an[i].m} phút (buổi chiều, tối) = ${fmt(an[i])} ở đồng hồ ${L2[j]}`);
},

/* ===== tr.23 – Bài 5: Đố bạn! (hai chiếc can) ===== */
() => {
  const q = Q(5, 'Đố bạn!');
  const p = pick([[3, 5], [4, 7], [5, 9], [5, 8], [4, 6], [5, 7]]);
  const a = p[0], b = p[1], con = 2 * a - b;
  return q.done(`<p class="wordq">Có một can ${a} <i>l</i> và một can ${b} <i>l</i>. Chỉ dùng hai cái can đó,
      làm thế nào lấy được ${con} <i>l</i> nước từ bể nước?</p>
    <div class="can-row">${ART.b7Can(a)}${ART.b7Can(b, true)}</div>
    <div class="bullet">Đổ đầy can ${a} <i>l</i> rồi rót hết sang can ${b} <i>l</i>.
      Khi đó can ${b} <i>l</i> có ${q.num(a)} <i>l</i> nước.</div>
    <div class="bullet">Can ${b} <i>l</i> cần thêm ${q.num(b - a)} <i>l</i> nữa thì đầy.</div>
    <div class="bullet">Đổ đầy can ${a} <i>l</i> lần nữa rồi rót sang can ${b} <i>l</i> cho đến khi đầy.
      Can ${a} <i>l</i> còn lại ${q.num(con)} <i>l</i> nước.</div>`,
    `Đổ đầy can ${a} l hai lần vào can ${b} l thì can nhỏ còn lại ${con} l.`);
},
];
