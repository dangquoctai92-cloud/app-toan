/* ==================== BÀI 5: BẢNG NHÂN 3, BẢNG CHIA 3 (SGK tr.16, 17, 18) ====================
   hoạt động tr.17: bài 1, 2, 3   ·   hoạt động tr.18: bài 1, 2   ·   luyện tập tr.18: bài 1, 2
============================================================================================== */

ART.b5Bee = t => `<span class="bee"><svg viewBox="0 0 130 74">
  <path d="M42 26q18-20 42-10-18 14-42 10z" fill="#fdf6d0" stroke="#a8792a" stroke-width="2"/>
  <ellipse cx="58" cy="46" rx="44" ry="19" fill="#f2c14e" stroke="#a8792a" stroke-width="2.4"/>
  <path d="M18 34q6 24 0 24M36 30q-8 32 0 32M56 30q-8 32 0 32" fill="none" stroke="#a8792a" stroke-width="2" opacity=".5"/>
  <ellipse cx="105" cy="42" rx="17" ry="16" fill="#4a3b28"/>
  <circle cx="112" cy="37" r="3.2" fill="#fff"/>
  <path d="M108 24l8-12M116 28l13-7" stroke="#4a3b28" stroke-width="2.4" stroke-linecap="round"/>
</svg><b>${t}</b></span>`;

ART.b5Flower = vals => {
  const cx = 90, cy = 72, r = 42;
  const p = vals.map((v, i) => {
    const a = (i * 60 - 90) * Math.PI / 180;
    const x = +(cx + r * Math.cos(a)).toFixed(1), y = +(cy + r * Math.sin(a)).toFixed(1);
    return `<ellipse cx="${x}" cy="${y}" rx="20" ry="27" fill="#fbe98a" stroke="#d8b93a" stroke-width="2"
        transform="rotate(${i * 60} ${x} ${y})"/>
      <text x="${x}" y="${y + 7}" text-anchor="middle" font-size="19" font-weight="700" fill="#4a4460">${v}</text>`;
  }).join('');
  return `<svg viewBox="0 0 180 212" class="flower-art">
    <path d="M90 112v58" stroke="#4a9b3a" stroke-width="6"/>
    <path d="M90 138q-28-16-36 4 24 12 36-4z" fill="#5cb84a" stroke="#3d8a30" stroke-width="2"/>
    <path d="M90 152q28-16 36 4-24 12-36-4z" fill="#5cb84a" stroke="#3d8a30" stroke-width="2"/>
    <path d="M64 170h52l-9 38H73z" fill="#e2764a" stroke="#a8502c" stroke-width="2.5"/>
    ${p}
    <circle cx="90" cy="72" r="25" fill="#8a5a2b" stroke="#6a4420" stroke-width="2"/>
  </svg>`;
};

ART.b5Cup = t => `<span class="cupw"><svg viewBox="0 0 124 96">
  <path d="M18 28h76v32a38 30 0 0 1-76 0z" fill="#f4f8e6" stroke="#9aa87a" stroke-width="2.5"/>
  <path d="M94 36q24 3 24 16t-24 13" fill="none" stroke="#9aa87a" stroke-width="2.5"/>
  <ellipse cx="56" cy="28" rx="38" ry="10" fill="#e8f0d0" stroke="#9aa87a" stroke-width="2.5"/>
</svg><b>${t}</b></span>`;

ART.b5Plate = (t, L) => `<span class="platew"><svg viewBox="0 0 130 62">
  <ellipse cx="65" cy="30" rx="60" ry="22" fill="#eef4dd" stroke="#9aa87a" stroke-width="2.5"/>
  <ellipse cx="65" cy="30" rx="46" ry="14" fill="#f8fbee" stroke="#b7c39a" stroke-width="1.6"/>
</svg><b>${t}</b><i>${L}</i></span>`;

BANKS.b5 = [

/* ===== hoạt động tr.17 – Bài 1: Số ? (Thừa số – Thừa số – Tích) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - .5).slice(0, 6).sort((a, b) => a - b);
  const r1 = ks.map(() => '<td>3</td>').join('');
  const r2 = ks.map(k => `<td>${k}</td>`).join('');
  const r3 = ks.map((k, i) => i === 0 ? `<td>${3 * k}</td>` : `<td>${q.num(3 * k, 2)}</td>`).join('');
  return q.done(`<div class="tbl-wrap"><table class="tbl blue">
    <tr><th>Thừa số</th>${r1}</tr><tr><th>Thừa số</th>${r2}</tr><tr><th>Tích</th>${r3}</tr>
  </table></div>`, 'Dùng bảng nhân 3');
},

/* ===== hoạt động tr.17 – Bài 2: Nêu các số còn thiếu (đếm thêm 3, bớt 3) ===== */
() => {
  const q = Q(2, 'Nêu các số còn thiếu.');
  const hid = () => [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - .5).slice(0, 5);
  const hA = hid(), hB = hid();
  const up = Array.from({length:10}, (_, i) => 3 * (i + 1));
  const dn = Array.from({length:10}, (_, i) => 30 - 3 * i);
  const rowA = up.map((v, i) => hA.includes(i)
    ? `<span class="cnode q">${q.num(v, 2)}</span>` : `<span class="cnode">${v}</span>`).join('');
  const rowB = dn.map((v, i) => hB.includes(i)
    ? `<span class="cnode q">${q.num(v, 2)}</span>` : `<span class="cnode">${v}</span>`).join('');
  return q.done(`<div class="sub-lbl">a)</div><div class="chain round">${rowA}</div>
    <div class="sub-lbl">b)</div><div class="chain dia">${rowB}</div>`,
    'a) đếm thêm 3 · b) đếm bớt 3');
},

/* ===== hoạt động tr.17 – Bài 3: Bài toán bàn đấu cờ vua ===== */
() => {
  const q = Q(3, '');
  const ban = R(4, 10);
  return q.done(`<p class="wordq">Mỗi bàn đấu cờ vua có 3 người. Hỏi ${ban} bàn đấu cờ vua như vậy
      có bao nhiêu người?</p>
    <div class="fill-line">${ban} bàn đấu cờ vua có ${q.num(3 * ban)} người.</div>`,
    `3 × ${ban} = ${3 * ban} (người)`);
},

/* ===== hoạt động tr.18 – Bài 1: Số ? (Số bị chia – Số chia – Thương) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - .5).slice(0, 6).sort((a, b) => a - b);
  const r1 = ks.map(k => `<td>${3 * k}</td>`).join('');
  const r2 = ks.map(() => '<td>3</td>').join('');
  const r3 = ks.map((k, i) => i === 0 ? `<td>${k}</td>` : `<td>${q.num(k, 2)}</td>`).join('');
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
    <tr><th>Số bị chia</th>${r1}</tr><tr><th>Số chia</th>${r2}</tr><tr><th>Thương</th>${r3}</tr>
  </table></div>`, 'Dùng bảng chia 3');
},

/* ===== hoạt động tr.18 – Bài 2: Chọn kết quả cho mỗi phép tính (ong – hoa) ===== */
() => {
  const q = Q(2, 'Chọn kết quả cho mỗi phép tính.');
  const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - .5).slice(0, 6);
  const petals = [...ks].sort(() => Math.random() - .5);
  const bees = ks.map(k => `<div class="bee-item">${ART.b5Bee(`${3 * k} : 3`)}
      <span class="op">=</span> ${q.num(k, 2)}</div>`).join('');
  return q.done(ART.b5Flower(petals) + `<div class="bee-grid">${bees}</div>
    <div class="hint-line">Mỗi cánh hoa là kết quả của một phép tính trên lưng ong.</div>`,
    ks.map(k => `${3 * k} : 3 = ${k}`).join(' · '));
},

/* ===== luyện tập tr.18 – Bài 1: Hai phép tính nào có cùng kết quả? ===== */
() => {
  const q = Q(1, 'Hai phép tính nào dưới đây có cùng kết quả?');
  const L = ['A', 'B', 'C', 'D', 'E'];
  const vals = [4, 6, 8, 9, 10, 12, 15].sort(() => Math.random() - .5).slice(0, 5);
  const expr = (v, kind) => {
    const o = [];
    if (kind === 'x'){
      if (v % 3 === 0 && v / 3 <= 10) o.push(`3 × ${v / 3}`, `${v / 3} × 3`);
      if (v % 2 === 0 && v / 2 <= 10) o.push(`2 × ${v / 2}`, `${v / 2} × 2`);
      if (v % 5 === 0 && v / 5 <= 10) o.push(`5 × ${v / 5}`, `${v / 5} × 5`);
    } else {
      if (v <= 10) o.push(`${v * 3} : 3`, `${v * 2} : 2`, `${v * 5} : 5`);
      if (v % 3 === 0 && v * 3 <= 30) o.push(`${v * 3} : 3`);
    }
    return o.length ? pick(o) : `3 × ${v / 3}`;
  };
  const cups = vals.map(v => ({v, t:expr(v, Math.random() < .5 ? 'x' : ':')}));
  const plateVals = [...vals].sort(() => Math.random() - .5);
  const plates = plateVals.map((v, i) => {
    const cupT = cups.find(c => c.v === v).t;
    let t = expr(v, Math.random() < .5 ? 'x' : ':');
    for (let g = 0; g < 8 && t === cupT; g++) t = expr(v, g % 2 ? 'x' : ':');
    return {v, L:L[i], t};
  });
  const lines = cups.map(c => {
    const ok = plates.find(p => p.v === c.v).L;
    return `<div class="fill-line">Cốc ghi <b>${c.t}</b> có cùng kết quả với đĩa ${q.pick(ok, L)}</div>`;
  }).join('');
  return q.done(`<div class="cup-row">${cups.map(c => ART.b5Cup(c.t)).join('')}</div>
    <div class="plate-row">${plates.map(p => ART.b5Plate(p.t, p.L)).join('')}</div>${lines}`,
    cups.map(c => `${c.t} = ${c.v}`).join(' · '));
},

/* ===== luyện tập tr.18 – Bài 2: Bài toán chia que tính ===== */
() => {
  const q = Q(2, '');
  const bo = 3, moi = R(4, 12), tong = bo * moi;
  return q.done(`<p class="wordq">Chia đều ${tong} que tính thành ${bo} bó.
      Hỏi mỗi bó có bao nhiêu que tính?</p>
    <div class="fill-line">Mỗi bó có ${q.num(moi)} que tính.</div>`,
    `${tong} : ${bo} = ${moi} (que tính)`);
},
];
