/* ==================== NGÂN HÀNG BÀI TẬP — BÀI 1 (SGK trang 6, 7, 8) ====================
   Mỗi câu là NGUYÊN một bài trong sách, nhiều ô "?" điền trực tiếp.
======================================================================================= */
function Q(no, cmd){
  const B = [];
  const inp = (i, cls, extra) =>
    `<input class="${cls}" data-b="${i}" ${cls.includes('qtxt') ? '' : 'inputmode="numeric" pattern="[0-9]*"'} ${extra || ''} placeholder="?">`;
  return {
    B,
    num(v, len){ B.push({a:String(v), len:len || String(v).length}); return inp(B.length - 1, 'qin'); },
    txt(n){ B.push({a:readNum(n), alts:readAlts(n), text:true}); return inp(B.length - 1, 'qin qtxt'); },
    pick(a, opts){ B.push({a, pickList:opts});
      const i = B.length - 1;
      return '<span class="picker" data-b="' + i + '">' +
        opts.map(o => '<button type="button" class="pk" data-b="' + i + '" data-v="' + o + '">' + o + '</button>').join('') + '</span>'; },
    sign(a){ B.push({a, sign:true}); return `<button type="button" class="qsign" data-b="${B.length - 1}">?</button>`; },
    done(body, e, extra){ return Object.assign({no, cmd, type:'multi', blanks:B, body, a:B.map(x => x.a).join('|'), e}, extra || {}); }
  };
}

ART.slot = kind => {
  const R = ART.rabbitPart;
  if (kind === 'basket') return `<svg viewBox="0 0 170 150" class="slot-art">
    <g transform="translate(42,4) scale(1.05)">${R}</g>
    <path d="M18 66h134l-14 74H32z" fill="#e3b378" stroke="#95602f" stroke-width="3"/>
    <path d="M18 66h134" stroke="#95602f" stroke-width="5" stroke-linecap="round"/>
    <path d="M24 90h122M28 114h114" stroke="#b07d43" stroke-width="2.4"/>
    <path d="M44 66l5 74M85 66v74M126 66l-5 74" stroke="#b07d43" stroke-width="2.2" opacity=".85"/>
  </svg>`;
  if (kind === 'carrot') return `<svg viewBox="0 0 200 150" class="slot-art">
    <g transform="translate(112,10) scale(1.05)">${R}</g>
    <path d="M16 92q-8 4-4 12t14 4l120-14 4-26-124 12z" fill="#ff9f2e" stroke="#cf6f16" stroke-width="3"/>
    <path d="M150 68l18-16 2 16 16 6-18 14z" fill="#5fbb46" stroke="#3a862a" stroke-width="2.6"/>
    <path d="M44 92l4 14M74 88l4 14M104 84l4 14" stroke="#cf6f16" stroke-width="2.4" opacity=".9"/>
  </svg>`;
  if (kind === 'board') return `<svg viewBox="0 0 200 150" class="slot-art">
    <g transform="translate(124,6) scale(1.05)">${R}</g>
    <rect x="12" y="62" width="132" height="66" rx="7" fill="#fff" stroke="#5b86bd" stroke-width="3.5"/>
    <rect x="20" y="70" width="116" height="50" rx="4" fill="#eef5ff"/>
  </svg>`;
  return `<svg viewBox="0 0 190 160" class="slot-art">
    <g transform="translate(116,2) scale(1.05)">${R}</g>
    <rect x="12" y="50" width="122" height="98" rx="5" fill="#fff" stroke="#b98a55" stroke-width="3.5"/>
    <path d="M12 64h122" stroke="#e8d6bd" stroke-width="2.4"/>
  </svg>`;
};

const BOX_COLORS = ['#2f7d32', '#1f63b8', '#2b3a8f', '#8f2f2f'];

const B1 = [

/* ===== Bài 1 (tr.6): Nêu số và cách đọc số ===== */
() => {
  const q = Q(1, 'Nêu số và cách đọc số.');
  const mk = () => { const t = R(1,3), c = R(0,9), d = R(0,9); return {t, c, d, n:t*100+c*10+d}; };
  const rows = [mk(), mk(), mk(), mk()];
  rows[2].c = 0; rows[2].n = rows[2].t*100 + rows[2].d;
  [1, 3].forEach(i => { const r = rows[i];
    if (!r.c) r.c = R(1,9);
    if (!r.d) r.d = R(1,9);
    r.n = r.t*100 + r.c*10 + r.d; });

  let html = '<div class="tbl-wrap"><table class="tbl amber sgk1">'
    + '<tr><th></th><th>Trăm</th><th>Chục</th><th>Đơn vị</th><th>Viết số</th><th>Đọc số</th></tr>';
  const r0 = rows[0];
  html += `<tr><td class="cell-bl">${blocks(r0.t, r0.c, r0.d)}</td><td>${r0.t}</td><td>${r0.c}</td><td>${r0.d}</td>
    <td>${r0.n}</td><td class="rd">${readNum(r0.n)}</td></tr>`;
  [1, 2].forEach(i => { const r = rows[i];
    html += `<tr><td class="cell-bl">${blocks(r.t, r.c, r.d)}</td><td>${r.t}</td><td>${r.c}</td><td>${r.d}</td>
      <td>${q.num(r.n)}</td><td class="rd">${q.txt(r.n)}</td></tr>`; });
  const r3 = rows[3];
  html += `<tr><td class="cell-bl">${blocks(r3.t, r3.c, r3.d)}</td>
    <td>${q.num(r3.t, 1)}</td><td>${q.num(r3.c, 1)}</td><td>${q.num(r3.d, 1)}</td>
    <td>${q.num(r3.n)}</td><td class="rd">${readNum(r3.n)}</td></tr></table></div>`;
  return q.done(html);
},

/* ===== Bài 2 (tr.6): Số ? — đường nối in sẵn, viết số vào ô "?" ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const rows = [];
  while (rows.length < 4){
    const t = R(1,9), c = R(0,9), d = R(0,9), n = t*100 + c*10 + d;
    if (!rows.some(r => r.n === n || r.t === t)) rows.push({t, c, d, n});
  }
  const order = [0,1,2,3].sort(() => Math.random() - .5);   // slot j nối với ô trái order[j]
  const givenSlot = R(0, 3);
  const KINDS = ['basket', 'carrot', 'board', 'card'];
  const slots = order.map((leftIdx, j) => ({left:leftIdx, given:j === givenSlot, n:rows[leftIdx].n, kind:KINDS[j]}));

  const left = rows.map((r, i) =>
    `<div class="m-item"><span class="m-art">${ART.turtleV(i)}</span>
      <div class="mbox" data-l="${i}" style="border-color:${BOX_COLORS[i]};color:${BOX_COLORS[i]}">
        Số gồm ${r.t} trăm,<br>${r.c} chục và ${r.d} đơn vị.</div></div>`).join('');

  const OFF = [0, 26, 8, 40];
  const right = slots.map((sl, j) =>
    `<div class="m-item right" style="margin-left:${OFF[j]}px">
      <div class="mtarget k-${sl.kind}" data-r="${j}">${ART.slot(sl.kind)}
        <span class="val">${sl.given ? sl.n : q.num(sl.n)}</span>
      </div></div>`).join('');

  const pairs = slots.map((sl, j) => [sl.left, j]);
  return q.done(`<div class="match2" id="match2"><svg class="m-lines" id="m-lines"></svg>
      <div class="m-col">${left}</div><div class="m-col m-right">${right}</div></div>
      <div class="hint-line">Nhìn theo đường nối rồi viết số vào ô "?"</div>`,
    'Mỗi đường nối chỉ tới số của câu mô tả bên trái', {pairs, rows, slots});
},

/* ===== Bài 3a (tr.7): hai bảng cấu tạo số ===== */
() => {
  const q = Q(3, 'a) <span class="tag">Số</span> ?');
  const pick3 = () => { const s = []; while (s.length < 3){ const n = R(101, 999); if (!s.includes(n)) s.push(n); } return s; };
  const A = pick3(), Bn = pick3();
  const head = ['Số','Số trăm','Số chục','Số đơn vị'];
  const rowA = (n, i) => { const s = String(n);
    return `<tr><td>${n}</td>` + (i === 0
      ? `<td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td>`
      : `<td>${q.num(+s[0], 1)}</td><td>${q.num(+s[1], 1)}</td><td>${q.num(+s[2], 1)}</td>`) + '</tr>'; };
  const rowB = n => { const s = String(n);
    return `<tr><td>${n}</td><td>${q.num(+s[0], 1)}</td><td>${q.num(+s[1], 1)}</td><td>${q.num(+s[2], 1)}</td></tr>`; };
  const html = `<div class="two-tbl">
    <table class="tbl green"><tr>${head.map(x => `<th>${x}</th>`).join('')}</tr>${A.map(rowA).join('')}</table>
    <table class="tbl pink"><tr>${head.map(x => `<th>${x}</th>`).join('')}</tr>${Bn.map(rowB).join('')}</table>
  </div>`;
  return q.done(html);
},

/* ===== Bài 3b (tr.7): viết số thành tổng ===== */
() => {
  const q = Q(3, 'b) Viết các số sau thành tổng các trăm, chục và đơn vị.');
  const ns = [];
  while (ns.length < 4){ const n = R(1,9)*100 + R(1,9)*10 + R(1,9); if (!ns.includes(n)) ns.push(n); }
  const html = noteBox('Mẫu:  385 = 300 + 80 + 5')
    + '<div class="eq-list">' + ns.map(n => {
      const t = Math.floor(n/100)*100, c = Math.floor(n/10)%10*10, d = n%10;
      return `<div class="eq">${n} = ${q.num(t)} <span class="op">+</span> ${q.num(c)} <span class="op">+</span> ${q.num(d)}</div>`;
    }).join('') + '</div>';
  return q.done(html);
},

/* ===== Bài 4 (tr.7): số liền trước – số liền sau ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const a = R(41, 98), b = R(120, 899), c = R(120, 899), d = R(200, 989);
  const rows = [
    `<tr><td>${a}</td><td>${a+1}</td><td>${a+2}</td></tr>`,
    `<tr><td>${q.num(b-1)}</td><td>${b}</td><td>${q.num(b+1)}</td></tr>`,
    `<tr><td>${q.num(c-1)}</td><td>${c}</td><td>${q.num(c+1)}</td></tr>`,
    `<tr><td>${q.num(998)}</td><td>999</td><td>${q.num(1000, 4)}</td></tr>`,
    `<tr><td>${d}</td><td>${q.num(d+1)}</td><td>${q.num(d+2)}</td></tr>`
  ];
  const html = `<div class="tbl-art">
    <div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số liền trước</th><th>Số đã cho</th><th>Số liền sau</th></tr>${rows.join('')}
    </table></div>${ART.robot}</div>`;
  return q.done(html);
},

/* ===== Bài 5a (tr.7): tia số – ba số liên tiếp ===== */
() => {
  const q = Q(5, 'a) <span class="tag">Số</span> ?');
  const st = R(10, 980);
  const items = Array.from({length:11}, (_, i) => st + i);
  const x = st + R(3, 8);
  const html = ruler(items.map(String), items.indexOf(x))
    + noteBox(`Mẫu: Số liền trước của ${st+1} là ${st}, số liền sau của ${st+1} là ${st+2}.<br>
      Ta có: ${st}, ${st+1}, ${st+2} là ba số liên tiếp.`)
    + `<div class="fill-line">Số liền trước của <b>${x}</b> là ${q.num(x-1)}, số liền sau của <b>${x}</b> là ${q.num(x+1)}.</div>
       <div class="fill-line">Ta có: ${x-1}, ${x}, ${q.num(x+1)} là ba số liên tiếp;
         ${x+1}, ${x}, ${q.num(x-1)} là ba số liên tiếp.</div>`;
  return q.done(html);
},

/* ===== Bài 5b (tr.7): tìm số để được ba số liên tiếp ===== */
() => {
  const q = Q(5, 'b) Tìm số ở ô có dấu "?" để được ba số liên tiếp.');
  const a = R(105, 980), b = R(105, 980);
  const html = `<div class="chain pill">${['<span class="cnode">' + a + '</span>',
      '<span class="cnode">' + (a+1) + '</span>', '<span class="cnode q">' + q.num(a+2) + '</span>'].join('')}</div>
    <div class="chain pill">${['<span class="cnode">' + b + '</span>',
      '<span class="cnode q">' + q.num(b-1) + '</span>', '<span class="cnode">' + (b-2) + '</span>'].join('')}</div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.8 – Bài 1: >, <, = ===== */
() => {
  const q = Q(1, '&gt; ; &lt; ; = ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  const A = [], Bp = [];
  for (let i = 0; i < 3; i++){
    const l = R(100, 999);
    const r = Math.random() < .25 ? l : R(100, 999);
    A.push([String(l), String(r), cmp(l, r)]);
  }
  for (let i = 0; i < 3; i++){
    const n = R(111, 999);
    const other = Math.random() < .35 ? n : n + pick([-100, -10, -1, 1, 10, 100]);
    if (i % 2) Bp.push([sumForm(n), String(other), cmp(n, other)]);
    else Bp.push([String(other), sumForm(n), cmp(other, n)]);
  }
  const line = ([l, r, a]) => `<div class="cmp-row"><span class="side">${l}</span>${q.sign(a)}<span class="side">${r}</span></div>`;
  const html = `<div class="two-col">
    <div><div class="sub-lbl">a)</div>${A.map(line).join('')}</div>
    <div><div class="sub-lbl">b)</div>${Bp.map(line).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.8 – Bài 2: dãy số ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const s1 = R(200, 980);
  const upSeq = Array.from({length:10}, (_, i) => s1 + i);
  const hideUp = [2, 3, 4, 6, 7, 8];
  const s2 = R(300, 1000);
  const dnSeq = Array.from({length:10}, (_, i) => s2 - i);
  const hideDn = [2, 3, 4, 6, 7, 8];
  const nodeUp = (v, i) => hideUp.includes(i)
    ? `<span class="cnode q">${q.num(v)}</span>` : `<span class="cnode">${v}</span>`;
  const nodeDn = (v, i) => hideDn.includes(i)
    ? `<span class="cnode q">${q.num(v, String(v).length)}</span>` : `<span class="cnode">${v}</span>`;
  const html = `<div class="sub-lbl">a)</div><div class="chain round">${upSeq.map(nodeUp).join('')}</div>
    <div class="sub-lbl">b)</div><div class="chain dia">${dnSeq.map(nodeDn).join('')}</div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.8 – Bài 3: sắp xếp thứ tự ===== */
() => {
  const q = Q(3, 'Sắp xếp các số sau theo thứ tự:');
  const pool = [1,2,3,4,5,6,7,8,9].sort(() => Math.random()-.5).slice(0, 3);
  const combos = [];
  pool.forEach(x => pool.forEach(y => pool.forEach(z => combos.push(+[x,y,z].join('')))));
  const ds = [...new Set(combos)].sort(() => Math.random()-.5).slice(0, 4);
  const up = [...ds].sort((x, y) => x - y), dn = [...ds].sort((x, y) => y - x);
  const html = `<div class="given-nums">${ds.map(x => `<span class="cnode">${x}</span>`).join('')}</div>
    <div class="fill-line"><b>a)</b> Từ bé đến lớn: ${up.map(v => q.num(v)).join('<span class="op">,</span>')}</div>
    <div class="fill-line"><b>b)</b> Từ lớn đến bé: ${dn.map(v => q.num(v)).join('<span class="op">,</span>')}</div>`;
  return q.done(html);
},

/* ===== Luyện tập tr.8 – Bài 4: ba con lợn ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const w = [R(90, 128), R(90, 128), R(90, 128)].sort((a, b) => a - b);
  if (w[0] === w[1]) w[1] = w[0] + 3;
  if (w[1] >= w[2]) w[2] = w[1] + 4;
  const shown = [...w].sort(() => Math.random() - .5);
  const html = `<p class="wordq">Ba con lợn có cân nặng lần lượt là ${shown[0]} kg, ${shown[1]} kg và ${shown[2]} kg.
      Biết lợn trắng nặng nhất và lợn đen nhẹ hơn lợn khoang.</p>
    <div class="bullet">Con lợn trắng cân nặng ${q.num(w[2])} kg.</div>
    <div class="bullet">Con lợn đen cân nặng ${q.num(w[0])} kg.</div>
    <div class="bullet">Con lợn khoang cân nặng ${q.num(w[1])} kg.</div>
    <div class="art-row">${ART.pig('#fff5f7')}${ART.pig('#dcdce4', true)}${ART.pig('#4a4a55')}</div>`;
  return q.done(html);
},
];

/* ==================== NGÂN HÀNG BÀI TẬP THEO SGK ====================
   Mỗi bài học có một ngân hàng dạng bài bám đúng các dạng trong SGK,
   số liệu sinh ngẫu nhiên nên không trùng với sách.
   Kiểu trả lời: 'num' (bàn phím số) · 'choice' (chọn đáp án) · 'order' (sắp thứ tự)
==================================================================== */
const BANKS = { b1: B1 };

function generateQuestions(code, count = 10){
  const bank = BANKS[code];
  if (!bank || !bank.length) return [];
  const plain = s => String(s || '').replace(/<[^>]*>/g, ' ')
    .replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
  const order = bank.map((_, i) => i);
  const out = [], seen = new Set();
  let gi = 0, guard = 0;
  while (out.length < count && guard++ < count * 40){
    const item = bank[order[gi % order.length]]();
    gi++;
    const key = (item.cmd || '') + '|' + (item.body || '');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      q:plain(item.cmd) + ' — ' + plain(item.body), a:String(item.a),
      no:item.no || 1, cmd:item.cmd || '', body:item.body || '',
      type:item.type || 'num', opts:item.opts || null, sep:item.sep || '',
      rows:item.rows || null, slots:item.slots || null, pairs:item.pairs || null,
      blanks:item.blanks || ((item.type || 'num') === 'num'
        ? [{a:String(item.a), len:String(item.a).length}] : null),
      big:!!item.big, explanation:item.e
    });
  }
  return out;
}

