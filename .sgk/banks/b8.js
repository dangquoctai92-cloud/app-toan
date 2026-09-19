/* ==================== BÀI 8: LUYỆN TẬP CHUNG (SGK trang 24, 25, 26, 27) ====================
   Gồm 3 phần luyện tập:
   · tr.24–25: bài 1(a,b), 2, 3, 4, 5
   · tr.25–26: bài 1, 2, 3, 4(a,b)
   · tr.26–27: bài 1(a,b), 2, 3, 4, 5
========================================================================================= */



ART.beast = kind => {
  const P = {
    bear: {b:'#f7f5f1', s:'#b3aa9c'},
    ho:   {b:'#f2a13d', s:'#bf6a14'},
    bao:  {b:'#f2cd6a', s:'#bd9a22'},
    sutu: {b:'#e3b271', s:'#a97c37'}
  }[kind];
  const stripes = kind === 'ho'
    ? '<path d="M64 44v28M82 40v32M100 42v30M118 44v28" stroke="#5a3410" stroke-width="4" stroke-linecap="round" opacity=".85"/>'
    : '';
  const spots = kind === 'bao'
    ? '<g fill="#7a5a18" opacity=".8"><circle cx="64" cy="54" r="3.4"/><circle cx="82" cy="48" r="3.4"/>'
      + '<circle cx="100" cy="58" r="3.4"/><circle cx="118" cy="50" r="3.4"/><circle cx="74" cy="70" r="3.4"/>'
      + '<circle cx="106" cy="72" r="3.4"/></g>'
    : '';
  const mane = kind === 'sutu'
    ? '<circle cx="146" cy="46" r="27" fill="#c98b3c" stroke="#a97c37" stroke-width="2.5"/>' : '';
  return `<svg viewBox="0 0 195 122">
    <ellipse cx="95" cy="112" rx="66" ry="7" fill="rgba(60,40,20,.12)"/>
    <path d="M46 96V68M70 100V70M118 100V70M142 96V68" stroke="${P.s}" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="94" cy="60" rx="56" ry="25" fill="${P.b}" stroke="${P.s}" stroke-width="3"/>
    ${stripes}${spots}
    <path d="M40 54q-22-6-30 12" fill="none" stroke="${P.s}" stroke-width="5" stroke-linecap="round"/>
    ${mane}
    <ellipse cx="146" cy="46" rx="22" ry="17" fill="${P.b}" stroke="${P.s}" stroke-width="3"/>
    <path d="M131 33l-6-13 14 5M161 33l6-13-14 5" fill="${P.b}" stroke="${P.s}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="140" cy="43" r="2.8" fill="#2b1f16"/><circle cx="154" cy="43" r="2.8" fill="#2b1f16"/>
    <ellipse cx="147" cy="55" rx="7" ry="5" fill="#6b4a2e"/>
  </svg>`;
};

BANKS.b8 = [

/* ===== Luyện tập tr.24 – Bài 1a: xếp thứ tự cân nặng các con vật ===== */
() => {
  const q = Q(1, 'a) Cân nặng của mỗi con vật được cho dưới đây. Viết tên các con vật theo thứ tự cân nặng từ bé đến lớn.');
  const wBear = R(215, 300);
  const wHo = R(140, 205);
  let wSu = R(140, 205);
  if (wSu === wHo) wSu = wHo === 205 ? 204 : wHo + 1;
  const wBao = R(62, 118);
  const list = [
    {k:'bear', n:'Gấu trắng Bắc Cực', w:wBear},
    {k:'ho',   n:'Hổ',                w:wHo},
    {k:'bao',  n:'Báo',               w:wBao},
    {k:'sutu', n:'Sư tử',             w:wSu}
  ];
  const shown = [...list].sort(() => Math.random() - .5);
  const opts = list.map(x => x.n).sort(() => Math.random() - .5);
  const asc = [...list].sort((a, b) => a.w - b.w);
  const html = `<div class="beast-row">${shown.map(x =>
      `<div class="beast-item">${ART.beast(x.k)}${x.n}: ${x.w} kg</div>`).join('')}</div>
    <div class="fill-line">Theo thứ tự cân nặng từ bé đến lớn:</div>`
    + asc.map((x, i) => `<div class="bullet ord-pick">${i + 1}. ${q.pick(x.n, opts)}</div>`).join('');
  return q.done(html, asc.map(x => `${x.n} (${x.w} kg)`).join(' &lt; '));
},

/* ===== Luyện tập tr.24 – Bài 1b: viết số thành tổng các trăm, chục và đơn vị ===== */
() => {
  const q = Q(1, 'b) Viết các số sau thành tổng các trăm, chục và đơn vị (theo mẫu).');
  const ns = [];
  let guard = 0;
  while (ns.length < 4 && guard++ < 200){
    const n = R(1, 9) * 100 + R(1, 9) * 10 + R(1, 9);
    if (!ns.includes(n)) ns.push(n);
  }
  const html = noteBox('Mẫu: 356 = 300 + 50 + 6.')
    + '<div class="eq-list">' + ns.map(n => {
        const t = Math.floor(n / 100) * 100, c = Math.floor(n / 10) % 10 * 10, d = n % 10;
        return `<div class="eq">${n} = ${q.num(t)} <span class="op">+</span> ${q.num(c)} <span class="op">+</span> ${q.num(d)}</div>`;
      }).join('') + '</div>';
  return q.done(html);
},

/* ===== Luyện tập tr.24 – Bài 2: đặt tính rồi tính ===== */
() => {
  const q = Q(2, 'Đặt tính rồi tính.');
  const a1 = R(21, 89), b1 = R(21, 89);
  const a2 = R(120, 890), b2 = R(21, 79);
  const a3 = R(110, 460), b3 = R(120, 530);
  const a4 = R(120, 199), b4 = R(21, 99);
  const a5 = R(520, 989), b5 = R(120, 499);
  const a6 = R(610, 899), d6 = R(12, 80);
  const A = [{a:a1, b:b1, op:'+', r:a1 + b1}, {a:a2, b:b2, op:'+', r:a2 + b2}, {a:a3, b:b3, op:'+', r:a3 + b3}];
  const B = [{a:a4, b:b4, op:'−', r:a4 - b4}, {a:a5, b:b5, op:'−', r:a5 - b5}, {a:a6, b:a6 - d6, op:'−', r:d6}];
  const vc = it => `<div class="vcalc"><span class="vop">${it.op}</span>
    <span class="vnums"><b>${it.a}</b><b>${it.b}</b></span><i class="vbar"></i>
    <span class="vres">${q.num(it.r)}</span></div>`;
  const html = `<div class="sub-lbl">a)</div><div class="vrow">${A.map(vc).join('')}</div>
    <div class="sub-lbl">b)</div><div class="vrow">${B.map(vc).join('')}</div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.25 – Bài 3: bài toán hai trường tiểu học ===== */
() => {
  const q = Q(3, '');
  const a = R(320, 860), d = R(12, 68);
  return q.done(`<p class="wordq">Trường Tiểu học Quang Trung có ${a} học sinh,
      Trường Tiểu học Lê Lợi có nhiều hơn Trường Tiểu học Quang Trung ${d} học sinh.
      Hỏi Trường Tiểu học Lê Lợi có bao nhiêu học sinh?</p>
    <div class="fill-line">Trường Tiểu học Lê Lợi có ${q.num(a + d)} học sinh.</div>`,
    `${a} + ${d} = ${a + d}`);
},

/* ===== Luyện tập tr.25 – Bài 4: bảng số hạng – tổng, số bị trừ – hiệu ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const x1 = R(21, 49), y1 = R(21, 49);
  const x2 = R(30, 59), y2 = R(11, 39);
  const x3 = R(20, 49), y3 = R(11, 29);
  const s1 = R(41, 69), h1 = R(11, 39);
  const s2 = R(60, 99), h2 = R(21, 49);
  const t3 = R(11, 39), h3 = R(30, 59);
  const html = `<div class="two-tbl">
    <div><div class="sub-lbl">a)</div><table class="tbl blue">
      <tr><th>Số hạng</th><td>${x1}</td><td>${x2}</td><td>${q.num(x3)}</td></tr>
      <tr><th>Số hạng</th><td>${y1}</td><td>${q.num(y2)}</td><td>${y3}</td></tr>
      <tr><th>Tổng</th><td>${q.num(x1 + y1)}</td><td>${x2 + y2}</td><td>${x3 + y3}</td></tr>
    </table></div>
    <div><div class="sub-lbl">b)</div><table class="tbl pink">
      <tr><th>Số bị trừ</th><td>${s1 + h1}</td><td>${s2}</td><td>${q.num(t3 + h3)}</td></tr>
      <tr><th>Số trừ</th><td>${s1}</td><td>${q.num(s2 - h2)}</td><td>${t3}</td></tr>
      <tr><th>Hiệu</th><td>${q.num(h1)}</td><td>${h2}</td><td>${h3}</td></tr>
    </table></div>
  </div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.25 – Bài 5: tháp gạch (mỗi viên = tổng hai viên ngay dưới) ===== */
() => {
  const q = Q(5, '<span class="tag">Số</span> ?');
  const rows = [Array.from({length:6}, () => R(5, 9))];
  for (let i = 1; i < 6; i++){
    const prev = rows[i - 1], cur = [];
    for (let j = 0; j + 1 < prev.length; j++) cur.push(prev[j] + prev[j + 1]);
    rows.push(cur);
  }
  const shownCount = [6, 3, 1, 0, 0, 0];   // theo chỉ số hàng: 0 = hàng đáy
  const html = '<div class="pyr">' + [5, 4, 3, 2, 1, 0].map(ri => {
      const r = rows[ri], sh = shownCount[ri];
      return '<div class="pyr-row">' + r.map((v, j) =>
        `<div class="brick">${j < sh ? v : q.num(v)}</div>`).join('') + '</div>';
    }).join('') + '</div>'
    + '<div class="hint-line">Mỗi viên gạch ghi tổng của hai viên gạch ngay dưới nó.</div>';
  return q.done(html);
},

/* ===== Luyện tập tr.25 – Bài 1: tính nhẩm nhân 1, chia 1 ===== */
() => {
  const q = Q(1, 'Tính nhẩm.');
  const ns = [];
  let guard = 0;
  while (ns.length < 4 && guard++ < 200){ const n = R(2, 9); if (!ns.includes(n)) ns.push(n); }
  const html = `<div class="sub-lbl">a)</div>
    <div class="calc-grid">${ns.map(n => `<div class="calc-cell">${n} × 1 = ${q.num(n)}</div>`).join('')}</div>
    <div class="sub-lbl">b)</div>
    <div class="calc-grid">${ns.map(n => `<div class="calc-cell">${n} : 1 = ${q.num(n)}</div>`).join('')}</div>`
    + noteBox('Nhận xét: • Số nào nhân với 1 cũng bằng chính số đó.<br>• Số nào chia cho 1 cũng bằng chính số đó.');
  return q.done(html);
},

/* ===== Luyện tập tr.25 – Bài 2: tính (theo mẫu) 1 × a ===== */
() => {
  const q = Q(2, 'Tính (theo mẫu).');
  const ns = [];
  let guard = 0;
  while (ns.length < 4 && guard++ < 200){ const n = R(3, 9); if (!ns.includes(n)) ns.push(n); }
  const html = noteBox('Mẫu: &nbsp;1 × 2 = ?<br>1 × 2 = 1 + 1 = 2<br>1 × 2 = 2')
    + `<div class="calc-grid">${ns.map(n => `<div class="calc-cell">1 × ${n} = ${q.num(n)}</div>`).join('')}</div>`
    + noteBox('Nhận xét: Số 1 nhân với số nào cũng bằng chính số đó.');
  return q.done(html);
},

/* ===== Luyện tập tr.26 – Bài 3: dãy phép tính trên con đường đua ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const mk = () => {
    if (Math.random() < .5){ const a = R(1, 6), b = R(1, 9); return {t:`${a} × ${b}`, v:a * b}; }
    const b = R(1, 6), r = R(1, 9); return {t:`${b * r} : ${b}`, v:r};
  };
  const items = [];
  let guard = 0;
  while (items.length < 12 && guard++ < 400){
    const it = mk();
    if (!items.some(x => x.t === it.t)) items.push(it);
  }
  const html = '<div class="road-grid">'
    + items.map(it => `<span class="rcell">${it.t} = ${q.num(it.v)}</span>`).join('')
    + '</div>';
  return q.done(html);
},

/* ===== Luyện tập tr.26 – Bài 4a: tìm thừa số, tìm số chia ===== */
() => {
  const q = Q(4, 'a) <span class="tag">Số</span> ?');
  const a1 = R(2, 5), b1 = R(2, 9);
  const a2 = R(2, 5), b2 = R(2, 9);
  const a3 = R(2, 5), b3 = R(2, 9);
  const a4 = R(2, 5), b4 = R(2, 9);
  const html = `<div class="eq-list">
    <div class="eq">${a1} × ${q.num(b1)} = ${a1 * b1}</div>
    <div class="eq">${a2 * b2} : ${q.num(a2)} = ${b2}</div>
    <div class="eq">${a3} × ${q.num(b3)} = ${a3 * b3}</div>
    <div class="eq">${a4 * b4} : ${q.num(b4)} = ${a4}</div>
  </div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.26 – Bài 4b: tháp bóng (mỗi quả = tích hai quả ngay dưới) ===== */
() => {
  const q = Q(4, 'b) <span class="tag">Số</span> ?');
  const base = pick([[1,2,1,2], [2,1,2,1], [1,3,1,2], [2,1,3,1], [3,1,2,1], [1,2,1,3], [2,1,2,3], [3,1,2,2]]);
  const rows = [base];
  for (let i = 1; i < 4; i++){
    const prev = rows[i - 1], cur = [];
    for (let j = 0; j + 1 < prev.length; j++) cur.push(prev[j] * prev[j + 1]);
    rows.push(cur);
  }
  const shownCount = [4, 2, 0, 0];
  const html = '<div class="bpyr">' + [3, 2, 1, 0].map(ri => {
      const r = rows[ri], sh = shownCount[ri];
      return '<div class="bpyr-row">' + r.map((v, j) =>
        `<div class="ballx">${j < sh ? v : q.num(v)}</div>`).join('') + '</div>';
    }).join('') + '</div>'
    + '<div class="hint-line">Mỗi quả bóng ghi tích của hai quả bóng ngay dưới nó.</div>';
  return q.done(html);
},

/* ===== Luyện tập tr.26 – Bài 1a: tính (theo mẫu) 0 × a ===== */
() => {
  const q = Q(1, 'a) Tính (theo mẫu).');
  const ns = [];
  let guard = 0;
  while (ns.length < 3 && guard++ < 200){ const n = R(3, 9); if (!ns.includes(n)) ns.push(n); }
  const html = noteBox('Mẫu: &nbsp;0 × 2 = ?<br>0 × 2 = 0 + 0 = 0<br>0 × 2 = 0')
    + `<div class="calc-grid">${ns.map(n => `<div class="calc-cell">0 × ${n} = ${q.num(0)}</div>`).join('')}</div>`
    + `<div class="art-row">${speech('Ta còn có: Số nào nhân với 0 cũng bằng 0.')}${ART.robot}</div>`
    + noteBox('Nhận xét: Số 0 nhân với số nào cũng bằng 0.');
  return q.done(html);
},

/* ===== Luyện tập tr.27 – Bài 1b: tính nhẩm với số 0 ===== */
() => {
  const q = Q(1, 'b) Tính nhẩm.');
  const ns = [];
  let guard = 0;
  while (ns.length < 4 && guard++ < 200){ const n = R(2, 9); if (!ns.includes(n)) ns.push(n); }
  const html = `<div class="calc-grid">${ns.map(n => `<div class="calc-cell">0 × ${n} = ${q.num(0)}</div>`).join('')}</div>
    <div class="calc-grid">${ns.map(n => `<div class="calc-cell">0 : ${n} = ${q.num(0)}</div>`).join('')}</div>`
    + noteBox('Nhận xét: Số 0 chia cho số nào khác 0 cũng bằng 0.');
  return q.done(html);
},

/* ===== Luyện tập tr.27 – Bài 2: hai phép tính nào có cùng kết quả ===== */
() => {
  const q = Q(2, 'Hai phép tính nào dưới đây có cùng kết quả?');
  const k0 = R(2, 9), m0 = R(2, 9);
  const v2 = R(3, 9);
  let v4 = R(3, 9);
  if (v4 === v2) v4 = v2 === 9 ? 3 : v2 + 1;
  const g3 = pick([{v:12, f:[[2,6], [3,4]]}, {v:16, f:[[2,8], [4,4]]}, {v:18, f:[[2,9], [3,6]]}, {v:24, f:[[3,8], [4,6]]}]);
  const d2a = pick([2, 3]), d2b = pick([4, 5]);
  const d4a = pick([2, 3]), d4b = pick([4, 5]);
  const pairs = [
    {l:`0 : ${k0}`,            r:`${m0} × 0`,             v:0},
    {l:`${v2 * d2a} : ${d2a}`, r:`${v2 * d2b} : ${d2b}`,  v:v2},
    {l:`${g3.f[0][0]} × ${g3.f[0][1]}`, r:`${g3.f[1][0]} × ${g3.f[1][1]}`, v:g3.v},
    {l:`${v4 * d4a} : ${d4a}`, r:`${v4 * d4b} : ${d4b}`,  v:v4}
  ];
  const left = [...pairs].sort(() => Math.random() - .5);
  const right = [...pairs].sort(() => Math.random() - .5);
  const opts = right.map(p => p.r);
  const html = `<div class="heli-row">${left.map(p => `<span class="heli">${p.l}</span>`).join('')}</div>
    <div class="heli-row">${right.map(p => `<span class="heli dark">${p.r}</span>`).join('')}</div>`
    + left.map(p => `<div class="fill-line">${p.l} có cùng kết quả với ${q.pick(p.r, opts)}</div>`).join('')
    + '<div class="hint-line">Chạm để chọn phép tính có cùng kết quả.</div>';
  return q.done(html, pairs.map(p => `${p.l} = ${p.r} = ${p.v}`).join(' · '));
},

/* ===== Luyện tập tr.27 – Bài 3: bài toán góp vở ===== */
() => {
  const q = Q(3, '');
  const n = R(5, 9), m = R(2, 5);
  return q.done(`<p class="wordq">Tổ Một có ${n} bạn, mỗi bạn góp ${m} quyển vở để giúp đỡ các bạn vùng bị lũ lụt.
      Hỏi tổ Một góp được bao nhiêu quyển vở?</p>
    <div class="fill-line">Tổ Một góp được ${q.num(n * m)} quyển vở.</div>`,
    `${m} × ${n} = ${m * n}`);
},

/* ===== Luyện tập tr.27 – Bài 4: độ dài đường gấp khúc ABCDE ===== */
() => {
  const q = Q(4, 'Tính độ dài đường gấp khúc ABCDE.');
  const d = R(2, 5);
  const svg = `<svg viewBox="0 0 300 140" class="gk-svg">
    <polyline points="34,112 96,26 158,112 220,26 282,112" fill="none" stroke="#2b3a8f" stroke-width="3"/>
    <g fill="#2b3a8f">
      <circle cx="34" cy="112" r="4"/><circle cx="96" cy="26" r="4"/><circle cx="158" cy="112" r="4"/>
      <circle cx="220" cy="26" r="4"/><circle cx="282" cy="112" r="4"/>
    </g>
    <g font-size="15" font-weight="700" fill="#2b3a8f" text-anchor="middle">
      <text x="30" y="132">A</text><text x="96" y="18">B</text><text x="158" y="132">C</text>
      <text x="220" y="18">D</text><text x="286" y="132">E</text>
    </g>
    <g font-size="12" fill="#555" text-anchor="middle">
      <text x="48" y="66">${d} cm</text><text x="140" y="66">${d} cm</text>
      <text x="176" y="66">${d} cm</text><text x="268" y="66">${d} cm</text>
    </g>
  </svg>`;
  return q.done(`${svg}
    <div class="art-row">${speech(`Đường gấp khúc ABCDE gồm bốn đoạn thẳng có cùng độ dài là ${d} cm.`)}</div>
    <div class="fill-line">Độ dài đường gấp khúc ABCDE là: ${d} × 4 = ${q.num(4 * d)} (cm)</div>`,
    `${d} × 4 = ${4 * d} (cm)`);
},

/* ===== Luyện tập tr.27 – Bài 5: dãy phép tính của ốc sên ===== */
() => {
  const q = Q(5, '<span class="tag">Số</span> ?');
  const s = R(2, 4), a = R(4, 6), p = s * a;
  const b = pick([2, 3, 4, 5].filter(x => p % x === 0));
  const r = p / b;
  const arrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
      <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;
  return q.done(`<div class="flow">
      <span class="fnode circle">${s}</span>${arrow('× ' + a)}
      <span class="fnode sq">${q.num(p)}</span>${arrow(': ' + b)}
      <span class="fnode sq">${q.num(r)}</span>${arrow('× 0')}
      <span class="fnode tri">${q.num(0)}</span>
    </div>`,
    `${s} × ${a} = ${p};  ${p} : ${b} = ${r};  ${r} × 0 = 0`);
},
];
