/*CSS
.b77-let{color:#d63384;font-weight:800;margin-right:6px}
.b77-sub{font-weight:700;margin:9px 0 3px;line-height:1.5;text-align:left}
.b77-ask{margin:8px 0 2px;font-weight:700;color:#d63384;text-align:left}
.b77-line{font-size:17px;font-weight:700;line-height:2.2;text-align:left;margin:4px 0}
.b77-list{display:flex;flex-wrap:wrap;gap:2px 30px;margin:8px 0;justify-content:center}
.b77-list > div{min-width:250px;font-size:18px;font-weight:700;line-height:2.2;text-align:left}
.b77-wide .picker{flex-wrap:wrap;justify-content:center;margin:5px 0 0}
.b77-wide .pk{width:auto;min-width:34px;padding:0 11px;font-size:14px;height:32px}
.b77-clouds{display:flex;flex-wrap:wrap;justify-content:center;gap:9px 12px;margin:9px 0}
.b77-cloud{background:#fbe0ea;border:2.4px solid #f2a8c4;border-radius:34px;padding:11px 18px;
  font-size:17px;font-weight:800;color:#3a3550;white-space:nowrap}
.b77-opt{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 22px;margin:5px 0}
.b77-opt > div{min-width:128px;font-size:17px;font-weight:700;text-align:left}
.b77-fdrow{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 34px;margin:8px 0}
.b77-fd{display:inline-block}
.b77-fdg{display:grid;grid-template-columns:26px repeat(5,40px);gap:2px 2px;justify-items:center}
.b77-fdg > span{height:38px;display:grid;place-items:center;font-size:20px;font-weight:800;color:#26324a}
.b77-fdg .b77-nop{font-size:22px;color:#4a4460}
.b77-fdbar{display:block;height:2.6px;background:#4a4460;border-radius:2px;margin:4px 0 5px}
.b77-fd .qin{width:38px !important;min-width:38px;height:36px;font-size:19px;padding:0 1px;text-align:center}
.b77-map{width:100%;max-width:540px;height:auto;display:block;margin:8px auto}
.b77-mtxt{font-size:15px;font-weight:800;fill:#1f4d7a;paint-order:stroke;stroke:#ffffff;
  stroke-width:4;stroke-linejoin:round}
.b77-mnm{font-size:12.5px;font-weight:800;fill:#7a3f18;paint-order:stroke;stroke:#ffffff;
  stroke-width:4;stroke-linejoin:round}
CSS*/

/* ==================== BÀI 77: ÔN TẬP PHÉP CỘNG, PHÉP TRỪ TRONG PHẠM VI 100 000
   (SGK tập 2 – tr.114, 115, 116)
   luyện tập 1 (tr.114–115) : bài 1 (Đặt tính rồi tính),
                              bài 2 (phép tính nào có kết quả bé hơn 6 000, lớn hơn 20 000),
                              bài 3 (Tính giá trị của biểu thức – a, b),
                              bài 4 (Mai mua gấu bông và keo dán – cô bán hàng trả lại),
                              bài 5 (Tìm chữ số thích hợp – a: phép cộng, b: phép trừ)
   luyện tập 2 (tr.115–116) : bài 1 (Đặt tính rồi tính),
                              bài 2 (Chọn kết quả đúng – a: tổng, b: hiệu, c: giá trị biểu thức),
                              bài 3 (Đ, S ? – bản đồ công viên: đường tới vườn thú và rạp xiếc),
                              bài 4 (trung tâm y tế dự phòng – số liều vắc-xin còn lại),
                              bài 5 (Chiếu dời đô của vua Lý Thái Tổ năm 1010)
========================================================================================= */

/* viết số có nhóm ba chữ số cách nhau như SGK: 45 274 */
const SP77 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const MIX77 = a => a.slice().sort(() => Math.random() - .5);
const LET77 = ['A', 'B', 'C', 'D'];

/* khung đặt tính cột dọc, ô kết quả là ô điền */
ART.b77Vc = (q, a, b, op) => `<div class="vcalc"><span class="vop">${op === '+' ? '+' : '−'}</span>
  <span class="vnums"><b>${SP77(a)}</b><b>${SP77(b)}</b></span><i class="vbar"></i>
  <span class="vres">${q.num(op === '+' ? a + b : a - b)}</span></div>`;

/* ---- khung "tìm chữ số thích hợp": mỗi chữ số một ô, ô bị giấu thành ô điền ----
   hid = mảng vị trí chữ số bị giấu, đếm từ trái sang phải trong chính số đó      */
function b77Fd(q, top, bot, res, hidT, hidB, hidR, op){
  const row = (n, hid, sym) => {
    const ds = String(n).split('');
    let out = `<span class="b77-nop">${sym}</span>`;
    for (let i = ds.length; i < 5; i++) out += '<span></span>';
    ds.forEach((d, i) => {
      out += hid.indexOf(i) >= 0 ? `<span>${q.num(+d, 1)}</span>` : `<span>${d}</span>`;
    });
    return out;
  };
  return `<div class="b77-fd">
    <div class="b77-fdg">${row(top, hidT, '')}${row(bot, hidB, op)}</div>
    <i class="b77-fdbar"></i>
    <div class="b77-fdg">${row(res, hidR, '')}</div>
  </div>`;
}

/* ---- bản đồ công viên: năm đoạn đường có ghi số đo ---- */
ART.b77Map = d => {
  const road = p => `<path d="${p}" fill="none" stroke="#b0c49a" stroke-width="26"
      stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${p}" fill="none" stroke="#fdfcf2" stroke-width="19"
      stroke-linecap="round" stroke-linejoin="round"/>`;
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="#e8352f" stroke="#fff" stroke-width="2"/>`;
  const tree = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-4" y="0" width="8" height="20" rx="3" fill="#a5773a"/>
    <circle cx="0" cy="-8" r="19" fill="#7ab84f"/><circle cx="-14" cy="2" r="14" fill="#8cc95f"/>
    <circle cx="14" cy="2" r="14" fill="#8cc95f"/></g>`;
  return `<svg viewBox="0 0 560 344" class="b77-map">
    <rect x="2" y="2" width="556" height="340" rx="16" fill="#d3ebba" stroke="#8fb26a" stroke-width="4"/>
    <ellipse cx="195" cy="170" rx="66" ry="42" fill="#a9dcf0" stroke="#5fa8cd" stroke-width="3"/>
    ${road('M70 288 L120 152')}${road('M120 152 L246 84')}${road('M70 288 L258 296')}
    ${road('M258 296 L268 205')}${road('M268 205 L432 186')}
    ${tree(330, 60, .9)}${tree(400, 96, .8)}${tree(96, 92, .9)}${tree(452, 268, 1)}
    ${tree(360, 296, .85)}${tree(150, 246, .8)}${tree(516, 76, .85)}
    <g>
      <path d="M212 76 Q246 28 280 76 Z" fill="#e8483f" stroke="#a52c18" stroke-width="2.6"/>
      <path d="M232 76 Q246 44 260 76 Z" fill="#ffd66b" stroke="#a52c18" stroke-width="2.2"/>
      <path d="M246 30 V18" stroke="#a52c18" stroke-width="2.6"/>
      <circle cx="246" cy="15" r="4.6" fill="#f7d34a" stroke="#a52c18" stroke-width="1.6"/>
      <text x="246" y="106" text-anchor="middle" class="b77-mnm">RẠP XIẾC</text>
    </g>
    <g>
      <rect x="440" y="150" width="80" height="48" rx="6" fill="#e8c48a" stroke="#a5773a" stroke-width="2.6"/>
      <rect x="446" y="136" width="68" height="17" rx="5" fill="#f7d34a" stroke="#a5773a" stroke-width="2.4"/>
      <circle cx="462" cy="178" r="11" fill="#b9b9c4" stroke="#7c7c8a" stroke-width="2"/>
      <circle cx="492" cy="176" r="13" fill="#d8b06a" stroke="#9a7530" stroke-width="2"/>
      <text x="480" y="128" text-anchor="middle" class="b77-mnm">VƯỜN THÚ</text>
    </g>
    <g>
      <path d="M44 302 q26 -40 52 0" fill="none" stroke="#f0a027" stroke-width="10" stroke-linecap="round"/>
      <rect x="38" y="298" width="14" height="24" rx="4" fill="#f0a027" stroke="#a06713" stroke-width="2"/>
      <rect x="88" y="298" width="14" height="24" rx="4" fill="#f0a027" stroke="#a06713" stroke-width="2"/>
      <text x="70" y="338" text-anchor="middle" class="b77-mnm">CỔNG CÔNG VIÊN</text>
    </g>
    ${dot(70, 288)}${dot(120, 152)}${dot(246, 84)}${dot(258, 296)}${dot(268, 205)}${dot(432, 186)}
    <text x="48" y="226" text-anchor="middle" class="b77-mtxt">${d.r1} m</text>
    <text x="146" y="98" text-anchor="middle" class="b77-mtxt">${d.r2} m</text>
    <text x="150" y="322" text-anchor="middle" class="b77-mtxt">${d.t1} m</text>
    <text x="216" y="256" text-anchor="middle" class="b77-mtxt">${d.t2} m</text>
    <text x="352" y="226" text-anchor="middle" class="b77-mtxt">${d.t3} m</text>
  </svg>`;
};

BANKS.b77 = [

/* ===== tr.114 – Luyện tập 1, Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const it = [
    {a: R(101, 999), b: R(1000, 8999), op: '+'},
    {a: R(11000, 29999), b: R(1000, 9999), op: '−'},
    {a: R(40000, 89999), b: R(1000, 9999), op: '+'},
    {a: R(60000, 99999), b: R(20000, 55000), op: '−'}
  ];
  const html = '<div class="vrow">'
    + it.map(x => ART.b77Vc(q, x.a, x.b, x.op)).join('') + '</div>';
  return q.done(html, it.map(x =>
    `${SP77(x.a)} ${x.op} ${SP77(x.b)} = ${SP77(x.op === '+' ? x.a + x.b : x.a - x.b)}`).join(';  ')
    + '. Viết các chữ số cùng hàng thẳng cột với nhau rồi tính từ phải sang trái.');
},

/* ===== tr.114 – Luyện tập 1, Bài 2: kết quả bé hơn 6 000, lớn hơn 20 000 ===== */
() => {
  const q = Q(2, 'Trong các phép tính dưới đây, những phép tính nào có kết quả bé hơn 6 000, '
    + 'những phép tính nào có kết quả lớn hơn 20 000?');
  /* hai phép tính có kết quả bé hơn 6 000 */
  const a1 = R(35, 49) * 100 + R(1, 99);                    /* 3 501 … 4 999 */
  const v1 = a1 + 1000;
  const v2 = R(30, 58) * 100 + R(1, 99);                    /* 3 001 … 5 899 */
  const b2 = R(30, 45) * 100;
  const a2 = v2 + b2;
  /* hai phép tính có kết quả lớn hơn 20 000 */
  const a3 = R(14, 28) * 1000, b3 = R(7, 15) * 1000;
  const v3 = a3 + b3;
  const v4 = R(201, 398) * 100;                             /* 20 100 … 39 800 */
  const b4 = R(150, 300) * 100;
  const a4 = v4 + b4;
  /* một phép tính không thuộc nhóm nào: bằng đúng 6 000 hoặc nằm giữa 6 000 và 20 000 */
  let e5;
  if (R(0, 1)){
    const x = R(5, 55) * 100;
    e5 = {t: `${SP77(x)} + ${SP77(6000 - x)}`, v: 6000};
  } else {
    const v5 = R(70, 190) * 100, b5 = R(20, 50) * 100;
    e5 = {t: `${SP77(v5 + b5)} − ${SP77(b5)}`, v: v5};
  }
  const items = MIX77([
    {t: `${SP77(a1)} + 1 000`, v: v1},
    {t: `${SP77(a2)} − ${SP77(b2)}`, v: v2},
    {t: `${SP77(a3)} + ${SP77(b3)}`, v: v3},
    {t: `${SP77(a4)} − ${SP77(b4)}`, v: v4},
    e5
  ]);
  const opts = items.map(x => x.t);
  const be = items.filter(x => x.v < 6000).map(x => x.t).sort().join(',');
  const lon = items.filter(x => x.v > 20000).map(x => x.t).sort().join(',');
  const html = '<div class="b77-clouds">'
    + items.map(x => `<span class="b77-cloud">${x.t}</span>`).join('') + '</div>'
    + `<div class="b77-ask">a) Những phép tính có kết quả bé hơn 6 000:</div>
       <div class="fill-line b77-wide">${q.pick(be, opts)}</div>
       <div class="b77-ask">b) Những phép tính có kết quả lớn hơn 20 000:</div>
       <div class="fill-line b77-wide">${q.pick(lon, opts)}</div>
       <div class="hint-line">Chạm để chọn các phép tính.</div>`;
  return q.done(html, items.map(x => `${x.t} = ${SP77(x.v)}`).join(';  ') + '.');
},

/* ===== tr.115 – Luyện tập 1, Bài 3: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  const a = R(2000, 5999), b = R(2000, 4999), c = R(1, 9) * 100;
  const va = a + b - c;
  const cb = R(1001, 8999), k = R(2, 8) * 1000, bb = cb + k, ab = R(20, 95) * 100;
  const vb = ab + k;
  const html = `<div class="b77-list">
      <div><span class="b77-let">a)</span>${SP77(a)} <span class="op">+</span> ${SP77(b)}
        <span class="op">−</span> ${SP77(c)} <span class="op">=</span> ${q.num(va)}</div>
      <div><span class="b77-let">b)</span>${SP77(ab)} <span class="op">+</span> (${SP77(bb)}
        <span class="op">−</span> ${SP77(cb)}) <span class="op">=</span> ${q.num(vb)}</div>
    </div>`;
  return q.done(html,
    `a) Tính lần lượt từ trái sang phải: ${SP77(a)} + ${SP77(b)} = ${SP77(a + b)}, `
    + `rồi ${SP77(a + b)} − ${SP77(c)} = ${SP77(va)}.  `
    + `b) Tính trong ngoặc trước: ${SP77(bb)} − ${SP77(cb)} = ${SP77(k)}, `
    + `rồi ${SP77(ab)} + ${SP77(k)} = ${SP77(vb)}.`);
},

/* ===== tr.115 – Luyện tập 1, Bài 4: Mai mua gấu bông và keo dán ===== */
() => {
  const q = Q(4, '');
  const gau = R(15, 40) * 1000, keo = R(2, 9) * 1000, dua = 50000;
  const het = gau + keo, lai = dua - het;
  const html = `<p class="wordq">Mai mua gấu bông hết ${SP77(gau)} đồng, mua keo dán hết
      ${SP77(keo)} đồng. Mai đưa cho cô bán hàng ${SP77(dua)} đồng. Hỏi cô bán hàng trả lại
      cho Mai bao nhiêu tiền?</p>
    <div class="bullet">Mai đã mua hết tất cả ${q.num(het)} đồng.</div>
    <div class="bullet">Cô bán hàng trả lại cho Mai ${q.num(lai)} đồng.</div>`;
  return q.done(html,
    `Mai mua hết: ${SP77(gau)} + ${SP77(keo)} = ${SP77(het)} (đồng). `
    + `Cô bán hàng trả lại: ${SP77(dua)} − ${SP77(het)} = ${SP77(lai)} (đồng).`);
},

/* ===== tr.115 – Luyện tập 1, Bài 5: Tìm chữ số thích hợp ===== */
() => {
  const q = Q(5, 'Tìm chữ số thích hợp.');
  /* a) số có năm chữ số + số có bốn chữ số, tổng vẫn có năm chữ số */
  const x = R(10000, 89999), y = R(1000, 9999), s = x + y;
  /* b) hiệu của hai số có năm chữ số cũng là số có năm chữ số */
  const bb = R(10000, 44999), cc = R(10000, 44999), aa = bb + cc;

  const html = '<div class="b77-fdrow">'
    + `<div><div class="b77-sub"><span class="b77-let">a)</span></div>`
    + b77Fd(q, x, y, s, [1], [1, 3], [0, 3], '+') + '</div>'
    + `<div><div class="b77-sub"><span class="b77-let">b)</span></div>`
    + b77Fd(q, aa, bb, cc, [1, 4], [0, 3], [2], '−') + '</div>'
    + '</div><div class="hint-line">Mỗi ô "?" chỉ điền một chữ số.</div>';
  return q.done(html,
    `a) ${SP77(x)} + ${SP77(y)} = ${SP77(s)}.  b) ${SP77(aa)} − ${SP77(bb)} = ${SP77(cc)}. `
    + 'Tìm lần lượt từng cột, bắt đầu từ cột hàng đơn vị bên phải, nhớ tính cả số nhớ.');
},

/* ===== tr.115 – Luyện tập 2, Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  const it = [
    {a: R(1000, 9899), b: R(11, 99), op: '+'},
    {a: R(20000, 49999), b: R(20000, 49999), op: '+'},
    {a: R(2000, 9999), b: R(101, 999), op: '−'},
    {a: R(50000, 99999), b: R(10000, 45000), op: '−'}
  ];
  const html = '<div class="vrow">'
    + it.map(x => ART.b77Vc(q, x.a, x.b, x.op)).join('') + '</div>';
  return q.done(html, it.map(x =>
    `${SP77(x.a)} ${x.op} ${SP77(x.b)} = ${SP77(x.op === '+' ? x.a + x.b : x.a - x.b)}`).join(';  ')
    + '. Viết các chữ số cùng hàng thẳng cột với nhau rồi tính từ phải sang trái.');
},

/* ===== tr.115, 116 – Luyện tập 2, Bài 2: Chọn kết quả đúng ===== */
() => {
  const q = Q(2, 'Chọn kết quả đúng.');
  /* a) tổng của hai số */
  const b1 = R(2000, 4999), a1 = b1 + R(1500, 3999);
  const t1 = a1 + b1;
  const o1 = MIX77([t1, t1 - 1000, t1 - 10, a1 - b1]);
  const k1 = LET77[o1.indexOf(t1)];
  /* b) hiệu của hai số */
  const b2 = R(12000, 19999), a2 = b2 + R(1001, 9999);
  const t2 = a2 - b2;
  const o2 = MIX77([t2, t2 + 10, t2 + 10000, a2 + b2]);
  const k2 = LET77[o2.indexOf(t2)];
  /* c) giá trị của biểu thức a − b + c */
  const b3 = R(6000, 9999), h3 = R(4000, 9999), a3 = b3 + h3, c3 = R(1, 3) * 1000;
  const t3 = h3 + c3;
  const o3 = MIX77([t3, h3, t3 + 100, h3 - c3]);
  const k3 = LET77[o3.indexOf(t3)];

  const line = os => '<div class="b77-opt">' + os.map((v, i) =>
    `<div><span class="b77-let">${LET77[i]}.</span>${SP77(v)}</div>`).join('') + '</div>';
  const html = `<div class="b77-sub"><span class="b77-let">a)</span>Tổng của ${SP77(a1)}
      và ${SP77(b1)} là:</div>${line(o1)}
    <div class="fill-line b77-wide">Chọn: ${q.pick(k1, LET77)}</div>
    <div class="b77-sub"><span class="b77-let">b)</span>Hiệu của ${SP77(a2)}
      và ${SP77(b2)} là:</div>${line(o2)}
    <div class="fill-line b77-wide">Chọn: ${q.pick(k2, LET77)}</div>
    <div class="b77-sub"><span class="b77-let">c)</span>Giá trị của biểu thức ${SP77(a3)}
      <span class="op">−</span> ${SP77(b3)} <span class="op">+</span> ${SP77(c3)} là:</div>${line(o3)}
    <div class="fill-line b77-wide">Chọn: ${q.pick(k3, LET77)}</div>`;
  return q.done(html,
    `a) ${SP77(a1)} + ${SP77(b1)} = ${SP77(t1)} nên chọn ${k1}.  `
    + `b) ${SP77(a2)} − ${SP77(b2)} = ${SP77(t2)} nên chọn ${k2}.  `
    + `c) ${SP77(a3)} − ${SP77(b3)} = ${SP77(h3)}, rồi ${SP77(h3)} + ${SP77(c3)} = ${SP77(t3)} `
    + `nên chọn ${k3}.`);
},

/* ===== tr.115, 116 – Luyện tập 2, Bài 3: Đ, S ? (bản đồ công viên) ===== */
() => {
  const q = Q(3, '<span class="tag">Đ, S</span> ?');
  const r1 = R(35, 65) * 10, r2 = R(35, 65) * 10;
  const rap = r1 + r2;
  const t1 = R(30, 50) * 10, t2 = R(20, 35) * 10;
  let t3 = rap + pick([-50, -40, -30, -20, -10, 10, 20, 30, 40, 50]) - t1 - t2;
  if (t3 < 150 || t3 > 700) t3 = R(25, 45) * 10;
  let thu = t1 + t2 + t3;
  if (thu === rap){ t3 += 10; thu += 10; }
  const gan = thu < rap;                       /* đến vườn thú gần hơn đến rạp xiếc? */
  const html = ART.b77Map({r1, r2, t1, t2, t3})
    + '<div class="b77-ask">a) <span class="tag">Số</span> ?</div>'
    + `<div class="b77-line">Đường đi từ cổng công viên đến rạp xiếc dài ${q.num(rap)} m.</div>
       <div class="b77-line">Đường đi từ cổng công viên đến vườn thú dài ${q.num(thu)} m.</div>`
    + '<div class="b77-ask">b) <span class="tag">Đ, S</span> ?</div>'
    + `<div class="fill-line b77-wide">Đường đi từ cổng công viên đến vườn thú gần hơn đến
        rạp xiếc. ${q.pick(gan ? 'Đ' : 'S', ['Đ', 'S'])}</div>
       <div class="fill-line b77-wide">Đường đi từ cổng công viên đến vườn thú xa hơn đến
        rạp xiếc. ${q.pick(gan ? 'S' : 'Đ', ['Đ', 'S'])}</div>`;
  return q.done(html,
    `Đến rạp xiếc: ${r1} + ${r2} = ${SP77(rap)} (m). `
    + `Đến vườn thú: ${t1} + ${t2} + ${t3} = ${SP77(thu)} (m). `
    + `Vì ${SP77(thu)} ${gan ? '<' : '>'} ${SP77(rap)} nên đường đi đến vườn thú `
    + `${gan ? 'gần hơn' : 'xa hơn'} đường đi đến rạp xiếc.`);
},

/* ===== tr.116 – Luyện tập 2, Bài 4: trung tâm y tế dự phòng ===== */
() => {
  const q = Q(4, '');
  const con = R(1, 5) * 1000 + R(0, 9) * 100;
  const d1 = R(14, 18) * 1000 + R(0, 9) * 100;
  const d2 = R(15, 19) * 1000 + R(0, 9) * 100;
  const tong = con + d1 + d2, dung = d1 + d2;
  const html = `<p class="wordq">Một trung tâm y tế dự phòng đã nhập về ${SP77(tong)} liều
      vắc-xin COVID-19. Đợt thứ nhất dùng hết ${SP77(d1)} liều vắc-xin, đợt thứ hai dùng hết
      ${SP77(d2)} liều vắc-xin. Hỏi sau hai đợt sử dụng, trung tâm y tế đó còn lại bao nhiêu
      liều vắc-xin COVID-19?</p>
    <div class="bullet">Cả hai đợt dùng hết ${q.num(dung)} liều vắc-xin.</div>
    <div class="bullet">Trung tâm y tế đó còn lại ${q.num(con)} liều vắc-xin.</div>`;
  return q.done(html,
    `Cả hai đợt dùng hết: ${SP77(d1)} + ${SP77(d2)} = ${SP77(dung)} (liều). `
    + `Còn lại: ${SP77(tong)} − ${SP77(dung)} = ${SP77(con)} (liều vắc-xin).`);
},

/* ===== tr.116 – Luyện tập 2, Bài 5: Chiếu dời đô của vua Lý Thái Tổ ===== */
() => {
  const q = Q(5, '');
  const nam = new Date().getFullYear();
  const moc = 1010;
  const html = `<p class="wordq">Vua Lý Thái Tổ hạ Chiếu dời kinh đô từ Hoa Lư (nay thuộc tỉnh
      Ninh Bình) về thành Đại La và đổi tên thành Thăng Long (nay thuộc Thủ đô Hà Nội) vào năm
      ${moc}. Hỏi đến năm nay (năm ${nam}), Chiếu dời đô của vua Lý Thái Tổ đã được bao nhiêu năm?</p>
    <div class="bullet">Đến năm ${nam}, Chiếu dời đô đã được ${q.num(nam - moc)} năm.</div>`;
  return q.done(html,
    `Lấy năm nay trừ đi năm hạ Chiếu dời đô: ${nam} − ${moc} = ${nam - moc} (năm).`);
},
];
