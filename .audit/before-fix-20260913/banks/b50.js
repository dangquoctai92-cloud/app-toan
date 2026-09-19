/*CSS
.b50-boat{width:100%;max-width:400px;height:auto;display:block;margin:6px auto}
.b50-st{width:100%;max-width:170px;height:auto;display:block;margin:6px auto}
.b50-fc{height:auto;display:block;margin:0 auto}
.b50-hs{width:100%;max-width:172px;height:auto;display:block;margin:0 auto}
.b50-gd{width:100%;max-width:330px;height:auto;display:block;margin:6px auto}
.b50-desk{width:100%;max-width:300px;height:auto;display:block;margin:6px auto}
.b50-srow{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px 18px;margin:8px 0}
.b50-scell{width:150px;text-align:center}
.b50-scell em{font-style:normal;font-weight:800;color:#d63384;display:block;margin-top:3px}
.b50-say{background:#fff;border:2.2px solid #8a8aa0;border-radius:14px;padding:4px 8px;font-size:12.5px;
  font-weight:700;font-style:italic;color:#3a3550;display:inline-block;margin-bottom:4px;line-height:1.25}
.b50-dim{font-size:13px;font-weight:700;color:#2f5f8a;margin-top:2px}
.b50-hrow{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 14px;margin:8px 0}
.b50-hcell{width:150px;text-align:center}
.b50-hcell em{font-style:normal;font-weight:800;color:#d63384;display:block}
.b50-bub{background:#fff;border:2.2px solid #8a8aa0;border-radius:15px;padding:6px 10px;font-size:13px;
  font-weight:700;font-style:italic;color:#3a3550;max-width:210px;line-height:1.3;margin:4px auto}
.b50-brow{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 12px;margin:6px 0}
.b50-sub{font-weight:700;margin:8px 0 2px}
CSS*/

/* ==================== BÀI 50: CHU VI HÌNH TAM GIÁC, HÌNH TỨ GIÁC,
   HÌNH CHỮ NHẬT, HÌNH VUÔNG (SGK tập 2, tr.21, 22, 23, 24, 25)
   hoạt động tr.22 : bài 1 (chu vi hình tam giác), bài 2 (chu vi hình tứ giác),
                     bài 3 (dây đèn nháy trang trí thuyền)
   hoạt động tr.24 : bài 1 (bảng cạnh – chu vi hình vuông), bài 2 (chu vi hình chữ nhật),
                     bài 3 (xếp hình vuông bằng que tính)
   luyện tập tr.25 : bài 1 (chọn chu vi của mỗi hình), bài 2 (chu vi mặt bàn – đúng hay sai),
                     bài 3 (hàng rào quanh vườn rau)
================================================================================================= */

ART.b50Boat = (t, b, s) => `<svg viewBox="0 0 420 262" class="b50-boat">
  <rect x="0" y="0" width="420" height="262" rx="18" fill="#f7d94e"/>
  <path d="M196 34L252 148H196z" fill="#fff" stroke="#333" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M252 34v114" stroke="#333" stroke-width="2.6"/>
  <path d="M96 150h236l-40 88H136z" fill="#fff" stroke="#e03b3b" stroke-width="5"
    stroke-dasharray="2 7" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="266" y="144" font-size="16" font-weight="600">${t} cm</text>
  <text x="34" y="200" font-size="16" font-weight="600">${s} cm</text>
  <text x="340" y="200" font-size="16" font-weight="600">${s} cm</text>
  <text x="214" y="256" text-anchor="middle" font-size="16" font-weight="600">${b} cm</text>
</svg>`;

ART.b50Sticks = k => {
  const L = 34, W = k * L + 20;
  let s = '';
  for (let i = 0; i < k; i++){
    const p = 10 + i * L + 3, len = L - 6;
    s += `<rect x="${p}" y="4" width="${len}" height="8" rx="4" fill="#e0563a" stroke="#a03020" stroke-width="1.6"/>`;
    s += `<rect x="${p}" y="${W - 12}" width="${len}" height="8" rx="4" fill="#e0563a" stroke="#a03020" stroke-width="1.6"/>`;
    s += `<rect x="4" y="${p}" width="8" height="${len}" rx="4" fill="#e0563a" stroke="#a03020" stroke-width="1.6"/>`;
    s += `<rect x="${W - 12}" y="${p}" width="8" height="${len}" rx="4" fill="#e0563a" stroke="#a03020" stroke-width="1.6"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${W}" class="b50-st">${s}</svg>`;
};

ART.b50Face = (w, h, fill, stroke) => {
  const S = 13, W = w * S, H = h * S;
  const ex = W * .3, ex2 = W * .68, ey = H * .38, r = Math.min(W, H) * .07 + 2;
  return `<svg viewBox="-5 -5 ${W + 10} ${H + 10}" width="${W + 10}" class="b50-fc">
    <rect x="0" y="0" width="${W}" height="${H}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
    <ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 1.15).toFixed(1)}" fill="#2b2b2b"/>
    <ellipse cx="${ex2.toFixed(1)}" cy="${ey.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 1.15).toFixed(1)}" fill="#2b2b2b"/>
    <path d="M${(W * .34).toFixed(1)} ${(H * .64).toFixed(1)}q${(W * .16).toFixed(1)} ${(H * .16).toFixed(1)}
      ${(W * .32).toFixed(1)} 0" fill="none" stroke="#c0392b" stroke-width="2.6" stroke-linecap="round"/>
  </svg>`;
};

ART.b50House = txt => `<svg viewBox="0 0 200 152" class="b50-hs">
  <path d="M8 58L100 10l92 48z" fill="#e0505c" stroke="#333" stroke-width="2.4" stroke-linejoin="round"/>
  <rect x="26" y="58" width="148" height="84" fill="#fff" stroke="#333" stroke-width="2.4"/>
  <text x="100" y="108" text-anchor="middle" font-size="17" font-weight="700" fill="#2b2b2b">${txt}</text>
</svg>`;

ART.b50Garden = (a, b, c) => {
  const S = 26, W = a * S, H = b * S, g = c * S;
  return `<svg viewBox="-26 -24 ${W + 52} ${H + 56}" class="b50-gd">
    <rect x="0" y="0" width="${W}" height="${H}" fill="#d9f0c8" stroke="#4f8f36" stroke-width="3"/>
    <path d="M${(W - g) / 2} ${H}h${g}" stroke="#f7d94e" stroke-width="7"/>
    <g fill="none" stroke="#7fbf5a" stroke-width="2">
      <path d="M${W * .22} ${H * .3}v${H * .3}M${W * .5} ${H * .28}v${H * .34}M${W * .78} ${H * .3}v${H * .3}"/>
    </g>
    <text x="${W / 2}" y="-8" text-anchor="middle" font-size="15" font-weight="700">${a} m</text>
    <text x="${W + 8}" y="${H / 2}" font-size="15" font-weight="700">${b} m</text>
    <text x="${W / 2}" y="${H + 22}" text-anchor="middle" font-size="15" font-weight="700">cổng ${c} m</text>
  </svg>`;
};

ART.b50Desk = (d, r) => `<svg viewBox="-26 -24 352 190" class="b50-desk">
  <path d="M0 24h300l-26 66H26z" fill="#9fc7e8" stroke="#3f6f96" stroke-width="3" stroke-linejoin="round"/>
  <path d="M26 90v42M274 90v42" stroke="#3f6f96" stroke-width="6" stroke-linecap="round"/>
  <path d="M0 24h300" stroke="#3f6f96" stroke-width="3"/>
  <text x="150" y="14" text-anchor="middle" font-size="15" font-weight="700">chiều dài ${d}</text>
  <text x="310" y="60" font-size="15" font-weight="700">${r} cm</text>
</svg>`;

BANKS.b50 = [

/* ===== tr.22 – Bài 1: Tính chu vi hình tam giác ===== */
() => {
  const q = Q(1, 'Tính chu vi hình tam giác có độ dài các cạnh là:');
  const m = [R(5, 12), R(8, 15), R(10, 20)];
  const u0 = 'cm';
  const u1 = pick(['dm', 'm']), u2 = pick(['cm', 'dm']);
  const b = [R(2, 9) * 10, R(2, 9) * 10, R(2, 9) * 10];
  const c1 = R(6, 25), c2 = R(6, 25);
  const sumM = m[0] + m[1] + m[2], sumB = b[0] + b[1] + b[2], sumC = c1 + c2 + c1;
  return q.done(noteBox(`<b>Mẫu:</b> a) ${m[0]} ${u0}, ${m[1]} ${u0} và ${m[2]} ${u0}.<br>
      <i>Bài giải</i><br>Chu vi hình tam giác là:<br>
      ${m[0]} + ${m[1]} + ${m[2]} = ${sumM} (${u0})<br><i>Đáp số:</i> ${sumM} ${u0}.`)
    + `<div class="fill-line"><b>b)</b> ${b[0]} ${u1}, ${b[1]} ${u1} và ${b[2]} ${u1}.</div>
       <div class="fill-line">Chu vi hình tam giác là ${q.num(sumB)} ${u1}.</div>
       <div class="fill-line"><b>c)</b> ${c1} ${u2}, ${c2} ${u2} và ${c1} ${u2}.</div>
       <div class="fill-line">Chu vi hình tam giác là ${q.num(sumC)} ${u2}.</div>`,
    `b) ${b[0]} + ${b[1]} + ${b[2]} = ${sumB} (${u1});  c) ${c1} + ${c2} + ${c1} = ${sumC} (${u2}).`);
},

/* ===== tr.22 – Bài 2: Tính chu vi hình tứ giác ===== */
() => {
  const q = Q(2, 'Tính chu vi hình tứ giác có độ dài các cạnh là:');
  const ua = pick(['dm', 'm']), ub = 'cm';
  const a = [R(2, 9), R(2, 9), R(2, 9), R(2, 9)];
  const x = R(5, 20) * 5, y = R(5, 20) * 5;
  const sa = a[0] + a[1] + a[2] + a[3], sb = (x + y) * 2;
  return q.done(`<div class="fill-line"><b>a)</b> ${a[0]} ${ua}, ${a[1]} ${ua}, ${a[2]} ${ua} và ${a[3]} ${ua}.</div>
      <div class="fill-line">Chu vi hình tứ giác là ${q.num(sa)} ${ua}.</div>
    <div class="fill-line"><b>b)</b> ${x} ${ub}, ${y} ${ub}, ${x} ${ub} và ${y} ${ub}.</div>
      <div class="fill-line">Chu vi hình tứ giác là ${q.num(sb)} ${ub}.</div>`,
    `a) ${a.join(' + ')} = ${sa} (${ua});  b) ${x} + ${y} + ${x} + ${y} = ${sb} (${ub}).`);
},

/* ===== tr.22 – Bài 3: dây đèn nháy trang trí thuyền ===== */
() => {
  const q = Q(3, 'Rô-bốt dùng đèn nháy để trang trí thuyền như hình vẽ. '
    + 'Hỏi chiều dài đoạn dây đèn nháy là bao nhiêu xăng-ti-mét?');
  const t = R(9, 16) * 5, b = t - R(2, 5) * 5, s = R(4, 8) * 5;
  const cv = t + b + 2 * s;
  return q.done(ART.b50Boat(t, b, s)
    + `<div class="fill-line">Đoạn dây đèn nháy chính là chu vi hình tứ giác, dài ${q.num(cv)} cm.</div>`,
    `${t} + ${s} + ${b} + ${s} = ${cv} (cm)`);
},

/* ===== tr.24 – Bài 1: Số ? (bảng cạnh và chu vi hình vuông) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const us = ['cm', 'm', 'cm', 'm'];
  const cs = [R(3, 9), R(4, 12), R(3, 9), R(5, 15)];
  const key = i => cs[i] + ' ' + us[i];
  for (let i = 1; i < 4; i++)
    for (let g = 0; g < 30 && [0, 1, 2].slice(0, i).some(j => key(j) === key(i)); g++) cs[i] += 1;
  const head = '<tr><th>Cạnh hình vuông</th>' + cs.map((c, i) => `<td>${c} ${us[i]}</td>`).join('') + '</tr>';
  const body = '<tr><th>Chu vi hình vuông</th>' + cs.map((c, i) =>
    `<td>${i === 0 ? c * 4 + ' ' + us[i] : q.num(c * 4) + ' ' + us[i]}</td>`).join('') + '</tr>';
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">${head}${body}</table></div>
    <div class="hint-line">Muốn tính chu vi hình vuông ta lấy độ dài một cạnh nhân với 4.</div>`,
    cs.map((c, i) => `${c} × 4 = ${c * 4} (${us[i]})`).join(';  '));
},

/* ===== tr.24 – Bài 2: Tính chu vi hình chữ nhật ===== */
() => {
  const q = Q(2, 'Tính chu vi hình chữ nhật có:');
  const da = R(5, 12), ra = R(2, da - 1);
  const ub = pick(['m', 'dm']);
  const db = R(6, 15), rb = R(2, db - 2);
  const dc = R(11, 25), rc = R(5, dc - 3);
  const pa = (da + ra) * 2, pb = (db + rb) * 2, pc = (dc + rc) * 2;
  return q.done(noteBox(`<b>Mẫu:</b> a) Chiều dài ${da} cm, chiều rộng ${ra} cm.<br>
      <i>Bài giải</i><br>Chu vi hình chữ nhật là:<br>
      (${da} + ${ra}) × 2 = ${pa} (cm)<br><i>Đáp số:</i> ${pa} cm.`)
    + `<div class="fill-line"><b>b)</b> Chiều dài ${db} ${ub}, chiều rộng ${rb} ${ub}.</div>
       <div class="fill-line">Chu vi hình chữ nhật là ${q.num(pb)} ${ub}.</div>
       <div class="fill-line"><b>c)</b> Chiều dài ${dc} dm, chiều rộng ${rc} dm.</div>
       <div class="fill-line">Chu vi hình chữ nhật là ${q.num(pc)} dm.</div>`,
    `b) (${db} + ${rb}) × 2 = ${pb} (${ub});  c) (${dc} + ${rc}) × 2 = ${pc} (dm).`);
},

/* ===== tr.24 – Bài 3: xếp hình vuông bằng que tính ===== */
() => {
  const q = Q(3, '');
  const k = R(2, 6);
  return q.done(`<div class="b50-brow">
      <span class="b50-bub">${k} que tính xếp thành một cạnh hình vuông.</span>
      <span class="b50-bub">Tớ dùng các que tính xếp thành một hình vuông.</span>
      <span class="b50-bub">Nam cần bao nhiêu que tính nhỉ?</span></div>`
    + ART.b50Sticks(k)
    + `<p class="wordq">Đố em biết, Nam cần dùng bao nhiêu que tính để xếp thành một hình vuông
        có cạnh gồm ${k} que tính như hình vẽ?</p>
       <div class="bullet">Hình vuông có 4 cạnh, mỗi cạnh gồm ${k} que tính.</div>
       <div class="fill-line">Nam cần dùng ${q.num(k * 4)} que tính.</div>`,
    `${k} × 4 = ${k * 4} (que tính)`);
},

/* ===== tr.25 – Luyện tập Bài 1: Chọn chu vi của mỗi hình ===== */
() => {
  const q = Q(1, 'Chọn chu vi của mỗi hình.');
  let w1 = 8, h1 = 5, s2 = 7, w3 = 5, h3 = 10;
  for (let g = 0; g < 200; g++){
    w1 = R(6, 11); h1 = R(3, w1 - 2); s2 = R(5, 9); w3 = R(4, 7); h3 = R(9, 13);
    const ps = [(w1 + h1) * 2, s2 * 4, (w3 + h3) * 2];
    if (new Set(ps).size === 3) break;
  }
  const P = [(w1 + h1) * 2, s2 * 4, (w3 + h3) * 2];
  const shapes = [
    {say: 'Tớ là hình chữ nhật.', art: ART.b50Face(w1, h1, '#f7cfe0', '#333'),
      dim: `${w1} cm và ${h1} cm`, p: P[0]},
    {say: 'Tớ là hình vuông.', art: ART.b50Face(s2, s2, '#f7dc9a', '#333'),
      dim: `cạnh ${s2} cm`, p: P[1]},
    {say: 'Tớ là hình chữ nhật.', art: ART.b50Face(w3, h3, '#a8dcf5', '#333'),
      dim: `${w3} cm và ${h3} cm`, p: P[2]}
  ];
  const L = ['A', 'B', 'C'];
  const ord = P.slice().sort(() => Math.random() - .5);
  const houses = '<div class="b50-hrow">' + ord.map((v, i) =>
    `<div class="b50-hcell">${ART.b50House('Chu vi ' + v + ' cm')}<em>${L[i]}</em></div>`).join('') + '</div>';
  const row = '<div class="b50-srow">' + shapes.map(s =>
    `<div class="b50-scell"><span class="b50-say">${s.say}</span>${s.art}
      <div class="b50-dim">${s.dim}</div></div>`).join('') + '</div>';
  const lines = shapes.map((s, i) =>
    `<div class="fill-line">Hình thứ ${i + 1} có chu vi ở ngôi nhà ${q.pick(L[ord.indexOf(s.p)], L)}</div>`).join('');
  return q.done(row + houses + lines,
    `(${w1} + ${h1}) × 2 = ${P[0]} (cm);  ${s2} × 4 = ${P[1]} (cm);  (${w3} + ${h3}) × 2 = ${P[2]} (cm).`);
},

/* ===== tr.25 – Luyện tập Bài 2: chu vi mặt bàn – Việt tính đúng hay sai? ===== */
() => {
  const q = Q(2, '');
  const r = R(4, 14) * 5, dm = R(1, 2);
  const dcm = dm * 100, sai = (r + dm) * 2, dung = (dcm + r) * 2;
  return q.done(`<div class="b50-brow">
      <span class="b50-bub">Mặt bàn này hình chữ nhật, có chiều rộng ${r} cm và chiều dài ${dm} m.</span>
      <span class="b50-bub">Chu vi mặt bàn này tính thế nào nhỉ?</span>
      <span class="b50-bub">Dễ mà, (${r} + ${dm}) × 2 = ${sai} (cm).</span></div>`
    + ART.b50Desk(dm + ' m', r)
    + `<div class="fill-line">Theo em, Việt tính đúng hay sai? ${q.pick('S', ['Đ', 'S'])}</div>
       <div class="fill-line">Phải đổi ${dm} m = ${q.num(dcm)} cm rồi mới tính.</div>
       <div class="fill-line">Chu vi mặt bàn là ${q.num(dung)} cm.</div>`,
    `Việt tính sai vì hai cạnh chưa cùng đơn vị đo. ${dm} m = ${dcm} cm; `
      + `(${dcm} + ${r}) × 2 = ${dung} (cm).`);
},

/* ===== tr.25 – Luyện tập Bài 3: hàng rào quanh vườn rau ===== */
() => {
  const q = Q(3, '');
  const a = R(7, 15), b = R(4, a - 2), c = R(2, 4);
  const cv = (a + b) * 2, rao = cv - c;
  return q.done(`<p class="wordq">Bác nông dân làm hàng rào quanh một vườn rau có dạng hình chữ nhật
      với chiều dài ${a} m, chiều rộng ${b} m. Bác có để cổng vào ${c} m.
      Hỏi hàng rào dài bao nhiêu mét?</p>`
    + ART.b50Garden(a, b, c)
    + `<div class="bullet">Chu vi vườn rau là ${q.num(cv)} m.</div>
       <div class="bullet">Hàng rào dài ${q.num(rao)} m.</div>`,
    `(${a} + ${b}) × 2 = ${cv} (m);  ${cv} − ${c} = ${rao} (m)`);
},
];
