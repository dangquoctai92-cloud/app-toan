/* ==================== BÀI 31: GAM (SGK tr.87, 88) ====================
   hoạt động tr.87–88 : bài 1 (Số ? – cân đĩa với các quả cân),
                        bài 2 (Số ? – cân đồng hồ, so sánh và tính tổng)
   luyện tập tr.88    : bài 1 (Tính theo mẫu với số đo gam),
                        bài 2 (chọn số cân nặng thích hợp cho mỗi con vật)
====================================================================================== */

/* cân đĩa hai đĩa: đĩa trái đặt các quả cân ws, đĩa phải đặt gói hàng */
ART.b31Bal = (ws, item) => {
  const n = ws.length;
  let g = '';
  for (let i = 0; i < n; i++){
    const x = 80 + (i - (n - 1) / 2) * 26;
    const ly = 28 + (i % 2) * 17;
    g += `<text x="${x}" y="${ly}" text-anchor="middle" font-size="13" fill="#333">${ws[i]}</text>
      <path d="M${x} ${ly + 5}L${x} 96" stroke="#777" stroke-width="1" fill="none"/>
      <path d="M${x - 7} 116q0-15 4-17v-5h6v5q4 2 4 17z" fill="#cfd3d8" stroke="#7b8188" stroke-width="1.5"/>`;
  }
  return `<svg viewBox="0 0 300 168" class="b31-bal">${g}
    <path d="M150 112h18v34h-18z" fill="#a9d8ee" stroke="#5f9ec4" stroke-width="2"/>
    <path d="M118 146h82v12h-82z" fill="#7fc2e0" stroke="#4b86ab" stroke-width="2"/>
    <path d="M80 108H236" stroke="#5f9ec4" stroke-width="4" stroke-linecap="round"/>
    <path d="M80 108v12M236 108v12" stroke="#5f9ec4" stroke-width="2"/>
    <ellipse cx="80" cy="120" rx="46" ry="7" fill="#cfe8f5" stroke="#5f9ec4" stroke-width="2"/>
    <ellipse cx="236" cy="120" rx="46" ry="7" fill="#cfe8f5" stroke="#5f9ec4" stroke-width="2"/>
    <circle cx="158" cy="108" r="9" fill="#f2c94c" stroke="#b8892a" stroke-width="2"/>
    <path d="M210 98q26-11 52-2l-5 18q-24-7-47 2z" fill="#fff" stroke="#c0392b" stroke-width="1.8"/>
    <text x="236" y="112" text-anchor="middle" font-size="10" fill="#c0392b">${item}</text>
  </svg>`;
};

/* cân đồng hồ loại 1 kg, kim chỉ g gam, phía trên đặt vật cần cân */
ART.b31Dial = (g, kind) => {
  const CX = 70, CY = 112, RR = 40;
  const ang = v => (v / 1000 * 360 - 90) * Math.PI / 180;
  const a = ang(g);
  const nx = (CX + (RR - 9) * Math.cos(a)).toFixed(1), ny = (CY + (RR - 9) * Math.sin(a)).toFixed(1);
  let marks = '';
  for (let i = 0; i < 20; i++){
    const t = ang(i * 50);
    const r1 = i % 5 === 0 ? RR - 8 : RR - 4;
    marks += `M${(CX + r1 * Math.cos(t)).toFixed(1)} ${(CY + r1 * Math.sin(t)).toFixed(1)}`
      + `L${(CX + RR * Math.cos(t)).toFixed(1)} ${(CY + RR * Math.sin(t)).toFixed(1)}`;
  }
  const lab = (v, txt) => `<text x="${(CX + (RR - 17) * Math.cos(ang(v))).toFixed(1)}"
    y="${(CY + (RR - 17) * Math.sin(ang(v)) + 3).toFixed(1)}" text-anchor="middle"
    font-size="8" fill="#2c4a2c">${txt}</text>`;
  const top = kind === 'tao'
    ? `<circle cx="54" cy="24" r="13" fill="#e2483c" stroke="#a52a1e" stroke-width="1.6"/>
       <circle cx="82" cy="22" r="14" fill="#d93a2e" stroke="#a52a1e" stroke-width="1.6"/>
       <circle cx="68" cy="34" r="13" fill="#f05a4c" stroke="#a52a1e" stroke-width="1.6"/>`
    : `<path d="M38 40q12-26 32-26t32 26z" fill="#f4ead2" stroke="#b8a071" stroke-width="1.8"/>
       <path d="M56 26q12-7 24 0" fill="none" stroke="#d98a3a" stroke-width="2.4"/>`;
  return `<svg viewBox="0 0 140 190" class="b31-dial">${top}
    <ellipse cx="70" cy="46" rx="54" ry="9" fill="#e8eef2" stroke="#8fa3b0" stroke-width="2"/>
    <path d="M22 54h96l-9 122H31z" fill="#57b45b" stroke="#2f7a33" stroke-width="2.4"/>
    <circle cx="${CX}" cy="${CY}" r="${RR + 5}" fill="#fff" stroke="#2f7a33" stroke-width="2.4"/>
    <path d="${marks}" stroke="#2c4a2c" stroke-width="1.2" fill="none"/>
    ${lab(250, '250 g')}${lab(500, '500 g')}${lab(750, '750 g')}${lab(0, '1 kg')}
    <line x1="${CX}" y1="${CY}" x2="${nx}" y2="${ny}" stroke="#e03b3b" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="${CX}" cy="${CY}" r="3.4" fill="#2f7a33"/>
  </svg>`;
};

ART.b31Animal = k => {
  if (k === 'ga') return `<svg viewBox="0 0 120 110" class="b31-animal">
    <ellipse cx="64" cy="62" rx="32" ry="23" fill="#c98b3f" stroke="#8a5a1e" stroke-width="2"/>
    <path d="M86 48q16-6 24 8-12 12-26 4z" fill="#a86f2a" stroke="#8a5a1e" stroke-width="1.8"/>
    <circle cx="36" cy="38" r="14" fill="#d59a4c" stroke="#8a5a1e" stroke-width="2"/>
    <path d="M28 24q4-11 10-2 5-10 8 2z" fill="#e2483c" stroke="#a52a1e" stroke-width="1.6"/>
    <circle cx="32" cy="36" r="2.2" fill="#222"/>
    <path d="M24 40l-12 5 12 4z" fill="#f0a12e" stroke="#c07a16" stroke-width="1.4"/>
    <path d="M30 50q-5 9 2 11" fill="#e2483c" stroke="#a52a1e" stroke-width="1.6"/>
    <path d="M54 84v14M74 84v14" stroke="#f0a12e" stroke-width="3"/>
    <path d="M46 98h16M66 98h16" stroke="#f0a12e" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
  if (k === 'cho') return `<svg viewBox="0 0 120 110" class="b31-animal">
    <ellipse cx="58" cy="58" rx="34" ry="20" fill="#b8875a" stroke="#7a5227" stroke-width="2"/>
    <circle cx="94" cy="42" r="16" fill="#c9975f" stroke="#7a5227" stroke-width="2"/>
    <path d="M84 30q-7-15 4-15t8 13z" fill="#8a5f30" stroke="#7a5227" stroke-width="1.6"/>
    <circle cx="98" cy="40" r="2.2" fill="#222"/>
    <ellipse cx="110" cy="48" rx="6" ry="5" fill="#4a3524"/>
    <path d="M24 52q-16-10-18 3 5 10 18 5z" fill="#b8875a" stroke="#7a5227" stroke-width="1.8"/>
    <path d="M38 76v22M54 76v22M72 76v22M86 76v20" stroke="#7a5227" stroke-width="6" stroke-linecap="round"/>
  </svg>`;
  if (k === 'chim') return `<svg viewBox="0 0 120 110" class="b31-animal">
    <ellipse cx="62" cy="58" rx="26" ry="19" fill="#c8a06a" stroke="#8a6a34" stroke-width="2"/>
    <circle cx="40" cy="42" r="14" fill="#d8b078" stroke="#8a6a34" stroke-width="2"/>
    <circle cx="35" cy="39" r="2.2" fill="#222"/>
    <path d="M26 44l-13 5 13 4z" fill="#e0a03c" stroke="#a8761e" stroke-width="1.4"/>
    <path d="M60 46q23-13 35 4-17 13-35 4z" fill="#a8814c" stroke="#8a6a34" stroke-width="1.8"/>
    <path d="M86 60l23 10-23 9z" fill="#a8814c" stroke="#8a6a34" stroke-width="1.8"/>
    <path d="M54 76v14M66 76v14" stroke="#e0a03c" stroke-width="2.4"/>
  </svg>`;
  return `<svg viewBox="0 0 130 110" class="b31-animal">
    <ellipse cx="76" cy="54" rx="40" ry="24" fill="#d3a05e" stroke="#8a6127" stroke-width="2"/>
    <ellipse cx="28" cy="46" rx="18" ry="15" fill="#dcae70" stroke="#8a6127" stroke-width="2"/>
    <path d="M14 34q-9-13 2-13t8 11zM42 34q9-13-2-13t-8 11z" fill="#e6d3a8" stroke="#8a6127" stroke-width="1.6"/>
    <circle cx="22" cy="44" r="2.4" fill="#222"/><circle cx="34" cy="44" r="2.4" fill="#222"/>
    <ellipse cx="28" cy="58" rx="9" ry="6" fill="#b8895a" stroke="#8a6127" stroke-width="1.4"/>
    <path d="M52 76v26M70 76v26M94 76v26M110 76v24" stroke="#8a6127" stroke-width="7" stroke-linecap="round"/>
    <path d="M114 40q11 9 6 32" fill="none" stroke="#8a6127" stroke-width="2.6"/>
  </svg>`;
};

BANKS.b31 = [

/* ===== tr.87–88 – Hoạt động Bài 1: Số ? (cân đĩa thăng bằng với các quả cân) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const w1 = pick([100, 200, 500]);
  const w2a = pick([100, 200]), w2b = pick([20, 50]);
  const w3 = pick([10, 20, 50]);
  const w4 = pick([100, 200, 500]);
  const cell = (lb, ws, item, val) => `<div class="b31-cell"><div class="sub-lbl">${lb}</div>
      ${ART.b31Bal(ws.map(x => x + ' g'), item)}
      <div class="fill-line">Gói ${item.toLowerCase()} cân nặng ${q.num(val)} g.</div></div>`;
  return q.done(`<div class="b31-grid">
      ${cell('a)', [w1], 'Đường', w1)}
      ${cell('b)', [w2a, w2b], 'Mì chính', w2a + w2b)}
      ${cell('c)', [w3, w3], 'Hạt tiêu', 2 * w3)}
      ${cell('d)', [w4, w4], 'Muối', 2 * w4)}
    </div>
    <div class="hint-line">Cân thăng bằng nên gói hàng cân nặng bằng tổng cân nặng các quả cân.</div>`,
    `${w2a} + ${w2b} = ${w2a + w2b} (g);  ${w3} + ${w3} = ${2 * w3} (g);  ${w4} + ${w4} = ${2 * w4} (g)`);
},

/* ===== tr.88 – Hoạt động Bài 2: Số ? (cân đồng hồ – túi táo, gói bột mì) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const tao = pick([500, 600, 700, 750, 800]);
  const bot = pick([100, 150, 200, 250, 300]);
  return q.done(`<div class="b31-grid">
      <div class="b31-dcell"><div class="sub-lbl">a)</div>${ART.b31Dial(tao, 'tao')}
        <div class="fill-line">Túi táo cân nặng ${q.num(tao)} g.</div></div>
      <div class="b31-dcell"><div class="sub-lbl">b)</div>${ART.b31Dial(bot, 'bot')}
        <div class="fill-line">Gói bột mì cân nặng ${q.num(bot)} g.</div></div>
    </div>
    <div class="sub-lbl">c)</div>
    <div class="bullet">Túi táo cân nặng hơn gói bột mì là ${q.num(tao - bot)} g.</div>
    <div class="bullet">Túi táo và gói bột mì cân nặng tất cả là ${q.num(tao + bot)} g.</div>`,
    `${tao} − ${bot} = ${tao - bot} (g);  ${tao} + ${bot} = ${tao + bot} (g)`);
},

/* ===== tr.88 – Luyện tập Bài 1: Tính (theo mẫu) ===== */
() => {
  const q = Q(1, 'Tính (theo mẫu).');
  const m1 = R(15, 45) * 10, m2 = R(10, 40) * 10;
  const k0 = R(2, 5), m3 = k0 * R(4, 9);
  const a1 = R(45, 95) * 10, b1 = R(10, 40) * 10;
  const a2 = R(30, 90) * 10, b2 = R(10, 25) * 10;
  const c1 = R(11, 25), k1 = R(2, 4);
  const k2 = R(2, 5), c2 = k2 * R(6, 20);
  return q.done(noteBox(`Mẫu:  ${m1} g + ${m2} g = ${m1 + m2} g<br>${m3} g : ${k0} = ${m3 / k0} g`) +
    `<div class="sub-lbl">a)</div>
     <div class="eq-list">
       <div class="eq">${a1} g − ${b1} g = ${q.num(a1 - b1)} g</div>
       <div class="eq">${a2} g − ${b2} g = ${q.num(a2 - b2)} g</div>
     </div>
     <div class="sub-lbl">b)</div>
     <div class="eq-list">
       <div class="eq">${c1} g × ${k1} = ${q.num(c1 * k1)} g</div>
       <div class="eq">${c2} g : ${k2} = ${q.num(c2 / k2)} g</div>
     </div>`,
    `${a1} − ${b1} = ${a1 - b1} (g);  ${c1} × ${k1} = ${c1 * k1} (g);  ${c2} : ${k2} = ${c2 / k2} (g)`);
},

/* ===== tr.88 – Luyện tập Bài 2: Chọn số cân nặng thích hợp cho mỗi con vật ===== */
() => {
  const q = Q(2, 'Chọn số cân nặng thích hợp cho mỗi con vật.');
  const vGa = pick([2, 3]) + ' kg';
  const vCho = pick([15, 20, 25]) + ' kg';
  const vChim = pick([50, 100, 200]) + ' g';
  const vBo = pick([150, 200, 250]) + ' kg';
  const opts = [vGa, vCho, vChim, vBo].sort(() => Math.random() - .5);
  const list = [
    {k: 'ga', n: 'Con gà', v: vGa},
    {k: 'cho', n: 'Con chó', v: vCho},
    {k: 'chim', n: 'Con chim sẻ', v: vChim},
    {k: 'bo', n: 'Con bò', v: vBo}
  ].sort(() => Math.random() - .5);
  return q.done(`<div class="b31-arow">${list.map(it =>
      `<div class="b31-acell"><b>${it.n}</b>${ART.b31Animal(it.k)}${q.pick(it.v, opts)}</div>`).join('')}</div>
    <div class="hint-line">Nhớ rằng 1 kg = 1 000 g.</div>`,
    list.map(it => `${it.n}: ${it.v}`).join(';  '));
},
];
