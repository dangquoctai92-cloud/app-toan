/* ============ BÀI 46: SO SÁNH CÁC SỐ TRONG PHẠM VI 10 000 (SGK tập 2, tr.9 – 11) ============
   hoạt động tr.10   : bài 1 (>; <; = ?), bài 2 (mê cung), bài 3 (bốn cây cầu)
   luyện tập tr.11–12: bài 1 (Đ, S ?), bài 2 (bốn túi hạt dẻ), bài 3 (bốn đỉnh núi),
                       bài 4 (Số ? – các số bé nhất, lớn nhất có bốn chữ số), bài 5 (bốn tấm thẻ số)
========================================================================================== */

ART.spNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

ART.b46Kid = (i, name) => {
  const HAIR = ['#2b2b3a', '#4a2f18', '#1e2b4a'];
  return `<circle cx="0" cy="0" r="13" fill="#f7d3b0" stroke="#c08a5c" stroke-width="2"/>
    <path d="M-13 -2a13 13 0 0 1 26 0q-7-7-13-4-6-3-13 4z" fill="${HAIR[i]}"/>
    <circle cx="-5" cy="2" r="1.9" fill="#2b2b2b"/><circle cx="5" cy="2" r="1.9" fill="#2b2b2b"/>
    <path d="M-4 7q4 4 8 0" fill="none" stroke="#b06a4a" stroke-width="1.6" stroke-linecap="round"/>
    <text x="0" y="30" text-anchor="middle" font-size="13" font-weight="800" fill="#8a2020">${name}</text>`;
};

ART.b46Maze = (names, nums) => {
  const S = [[56, 62], [56, 158], [56, 250]];
  const P = ['M56 62H130V36H214V92H294V44H404',
             'M56 158H110V190H190V126H272V176H346V150H404',
             'M56 250H142V214H224V264H314V224H404'];
  const EY = [44, 150, 224];
  return `<svg viewBox="0 0 520 302" class="b46-maze">
    <rect x="18" y="18" width="388" height="266" rx="10" fill="#8fc95a" stroke="#4e8b2a" stroke-width="4"/>
    <g fill="none" stroke="#f3fbe8" stroke-width="20" stroke-linecap="round" stroke-linejoin="round">
      ${P.map(d => `<path d="${d}"/>`).join('')}
    </g>
    <g fill="none" stroke="#4e8b2a" stroke-width="5" stroke-linecap="round">
      <path d="M60 110H100M310 100H380M60 212H100M250 205H300"/>
    </g>
    ${EY.map((y, i) => `<rect x="396" y="${y - 17}" width="11" height="34" rx="3"
        fill="#b07c40" stroke="#7a4a20" stroke-width="2"/>
      <text x="415" y="${y + 7}" font-size="19" font-weight="800" fill="#2b2b2b">${ART.spNum(nums[i])}</text>`).join('')}
    ${S.map((p, i) => `<g transform="translate(${p[0]},${p[1]})">${ART.b46Kid(i, names[i])}</g>`).join('')}
  </svg>`;
};

ART.b46Bridge = k => {
  if (k === 'nhattan') return `<svg viewBox="0 0 200 112" class="b46-brg">
    <rect x="0" y="0" width="200" height="112" rx="8" fill="#c6e6f7"/>
    <path d="M0 84h200v28H0z" fill="#79b7e6"/>
    <path d="M0 78h200v10H0z" fill="#8fc95a"/>
    <path d="M0 66h200v12H0z" fill="#d6dee6" stroke="#8895a3" stroke-width="1.6"/>
    <g fill="none" stroke="#6b8fb5" stroke-width="1.6">
      <path d="M48 18v48M110 12v54M164 22v44"/>
      <path d="M48 18L18 66M48 18L78 66M110 12L80 66M110 12L142 66M164 22L136 66M164 22L192 66"/>
    </g></svg>`;
  if (k === 'dinhvu') return `<svg viewBox="0 0 200 112" class="b46-brg">
    <rect x="0" y="0" width="200" height="112" rx="8" fill="#bfe1f5"/>
    <path d="M0 58h200v54H0z" fill="#4f9fd6"/>
    <path d="M0 52h200v10H0z" fill="#7d8b99" stroke="#5a6773" stroke-width="1.4"/>
    <g stroke="#93a1ae" stroke-width="5"><path d="M22 62v18M62 62v18M102 62v18M142 62v18M182 62v18"/></g>
    <g fill="#f2b13a"><rect x="30" y="42" width="6" height="10"/><rect x="82" y="42" width="6" height="10"/>
      <rect x="134" y="42" width="6" height="10"/><rect x="186" y="42" width="6" height="10"/></g></svg>`;
  if (k === 'cantho') return `<svg viewBox="0 0 200 112" class="b46-brg">
    <rect x="0" y="0" width="200" height="112" rx="8" fill="#f7c98f"/>
    <circle cx="42" cy="30" r="15" fill="#f79a4a"/>
    <path d="M0 86h200v26H0z" fill="#8f6fc0"/>
    <path d="M0 74q60-24 200-30v12Q60 62 0 84z" fill="#6b4a2a"/>
    <g fill="none" stroke="#e07a3a" stroke-width="1.6">
      <path d="M92 8v58M150 18v46"/>
      <path d="M92 8L52 72M92 8L128 62M150 18L120 64M150 18L184 58"/></g>
    <g stroke="#7a5a3a" stroke-width="4"><path d="M40 78v10M62 76v12M170 62v10"/></g></svg>`;
  return `<svg viewBox="0 0 200 112" class="b46-brg">
    <rect x="0" y="0" width="200" height="112" rx="8" fill="#c6e6f7"/>
    <path d="M0 50h200v62H0z" fill="#6fb2e2"/>
    <path d="M0 66q100-26 200-30v9Q100 51 0 76z" fill="#c9d3dc" stroke="#8895a3" stroke-width="1.4"/>
    <g stroke="#9aa7b4" stroke-width="4.5"><path d="M34 72v18M74 66v20M114 60v22M154 56v22"/></g>
    <path d="M0 40h200v12H0z" fill="#8fc95a" opacity=".85"/></svg>`;
};

ART.b46Bag = (c, g) => `<svg viewBox="0 0 92 116" class="b46-bag">
  <path d="M46 28c-23 0-35 23-35 46 0 21 15 34 35 34s35-13 35-34c0-23-12-46-35-46z"
    fill="${c}" stroke="#8a8a8a" stroke-width="2.2"/>
  <path d="M27 26q19-12 38 0l-7 9q-12-6-24 0z" fill="${c}" stroke="#8a8a8a" stroke-width="2.2"/>
  <path d="M30 14q16-9 32 0" fill="none" stroke="#8a8a8a" stroke-width="2.2"/>
  <text x="46" y="82" text-anchor="middle" font-size="14" font-weight="800" fill="#3a3a3a">${ART.spNum(g)} g</text>
</svg>`;

ART.b46Peak = c => `<svg viewBox="0 0 132 92" class="b46-peak">
  <rect x="0" y="0" width="132" height="92" rx="6" fill="#d3ecfa"/>
  <path d="M0 92L38 34 66 64 98 18 132 92z" fill="${c}" stroke="#48684a" stroke-width="2"/>
  <path d="M98 18l15 26-13-5-8 6-7-11z" fill="#fff"/>
  <path d="M38 34l10 16-8-3-6 5z" fill="#fff"/>
</svg>`;

BANKS.b46 = [

/* ===== tr.10 – Hoạt động Bài 1: >; <; = ? ===== */
() => {
  const q = Q(1, '<span class="tag">&gt;; &lt;; =</span> ?');
  const cmp = (l, r) => l > r ? '>' : l < r ? '<' : '=';
  const sp = ART.spNum;

  const a1l = R(120, 989), a1r = R(1200, 9800);                 // ít chữ số hơn thì bé hơn
  const t = R(1, 9), u = R(0, 9);
  let h = R(0, 9), te = R(0, 9);
  if (h === te) te = (te + R(1, 8)) % 10;
  const a2l = t * 1000 + h * 100 + te * 10 + u;                 // hoán vị trăm – chục
  const a2r = t * 1000 + te * 100 + h * 10 + u;

  const k1 = R(1, 8);
  const b1l = k1 * 1000 + R(0, 999);                            // khác nhau ở hàng nghìn
  const b1r = (k1 + R(1, 9 - k1)) * 1000 + R(0, 999);

  const kk = R(1, 9), hh = R(0, 9), uu = R(0, 9);
  const c1 = R(0, 9);
  const eq = Math.random() < .25;
  const c2 = eq ? c1 : (c1 + R(1, 9)) % 10;
  const b2l = kk * 1000 + hh * 100 + c1 * 10 + uu;              // khác nhau ở hàng chục
  const b2r = kk * 1000 + hh * 100 + c2 * 10 + uu;

  const line = (l, r) => `<div class="cmp-row"><span class="side">${sp(l)}</span>${q.sign(cmp(l, r))}<span class="side">${sp(r)}</span></div>`;
  return q.done(`<div class="two-col">
      <div><div class="sub-lbl">a)</div>${line(a1l, a1r)}${line(a2l, a2r)}</div>
      <div><div class="sub-lbl">b)</div>${line(b1l, b1r)}${line(b2l, b2r)}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    'Số nào ít chữ số hơn thì bé hơn. Nếu cùng số chữ số thì so sánh từng cặp chữ số ở cùng một hàng, kể từ trái sang phải.');
},

/* ===== tr.10 – Hoạt động Bài 2: Mê cung ===== */
() => {
  const q = Q(2, 'Các bạn Mai, Nam và Việt đang ở trong mê cung (như hình vẽ). Hỏi:');
  const ds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 4);
  const perms = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) for (let l = 0; l < 4; l++){
    if (new Set([i, j, k, l]).size !== 4 || ds[i] === 0) continue;
    perms.push(ds[i] * 1000 + ds[j] * 100 + ds[k] * 10 + ds[l]);
  }
  const nums = [...new Set(perms)].sort(() => Math.random() - .5).slice(0, 3);

  const NAMES = ['Mai', 'Nam', 'Việt'];
  const placed = NAMES.slice().sort(() => Math.random() - .5);   // placed[i] = bạn ở lối vào thứ i
  const gate = n => nums[placed.indexOf(n)];
  const hi = Math.max(...nums), lo = Math.min(...nums);
  const nameHi = placed[nums.indexOf(hi)], nameLo = placed[nums.indexOf(lo)];

  return q.done(ART.b46Maze(placed, nums) +
    `<div class="sub-lbl">a) Mỗi bạn ra khỏi mê cung qua cửa ghi số nào?</div>
     ${NAMES.map(n => `<div class="bullet">Bạn ${n} ra khỏi mê cung qua cửa ghi số ${q.num(gate(n))}.</div>`).join('')}
     <div class="sub-lbl">b) Bạn nào ra khỏi mê cung qua cửa ghi số lớn nhất?</div>
     <div class="fill-line">Đó là bạn ${q.pick(nameHi, NAMES)}</div>
     <div class="sub-lbl">c) Bạn nào ra khỏi mê cung qua cửa ghi số bé nhất?</div>
     <div class="fill-line">Đó là bạn ${q.pick(nameLo, NAMES)}</div>`,
    `${ART.spNum(hi)} > ... > ${ART.spNum(lo)} nên bạn ${nameHi} qua cửa số lớn nhất, bạn ${nameLo} qua cửa số bé nhất.`);
},

/* ===== tr.10–11 – Hoạt động Bài 3: Bốn cây cầu ===== */
() => {
  const q = Q(3, 'Rô-bốt từng đi qua bốn cây cầu có chiều dài như sau:');
  const BR = [{k:'nhattan', n:'Cầu Nhật Tân'}, {k:'dinhvu', n:'Cầu Đình Vũ – Cát Hải'},
              {k:'cantho', n:'Cầu Cần Thơ'}, {k:'vinhthinh', n:'Cầu Vĩnh Thịnh'}];
  const lens = [];
  for (let g = 0; g < 300 && lens.length < 4; g++){
    const v = R(200, 600) * 10;
    if (!lens.includes(v)) lens.push(v);
  }
  while (lens.length < 4) lens.push(6200 + lens.length * 10);
  const items = BR.map((b, i) => ({...b, L:lens[i]}));
  const up = items.slice().sort((x, y) => x.L - y.L);
  const opts = items.map(b => b.n);

  return q.done(`<div class="b46-brow">${items.map(b =>
      `<div class="b46-bcell">${ART.b46Bridge(b.k)}
        <span class="b46-bcap">${b.n}: ${ART.spNum(b.L)} m</span></div>`).join('')}</div>
    <div class="sub-lbl">a) Trong những cây cầu đó, cây cầu nào dài nhất, cây cầu nào ngắn nhất?</div>
    <div class="fill-line">Cây cầu dài nhất là: ${q.pick(up[3].n, opts)}</div>
    <div class="fill-line">Cây cầu ngắn nhất là: ${q.pick(up[0].n, opts)}</div>
    <div class="sub-lbl">b) Nêu tên các cây cầu đó theo thứ tự từ ngắn nhất đến dài nhất.</div>
    ${up.map((b, i) => `<div class="fill-line">${i + 1}. ${q.pick(b.n, opts)}</div>`).join('')}`,
    up.map(b => `${b.n}: ${ART.spNum(b.L)} m`).join(' < '));
},

/* ===== tr.11 – Luyện tập Bài 1: Đ, S ? ===== */
() => {
  const q = Q(1, '<span class="tag">Đ, S</span> ?');
  const DS = ['Đ', 'S'];
  const sp = ART.spNum;
  const cmpLine = (l, r) => {
    const sg = Math.random() < .5 ? '>' : '<';
    const ok = (sg === '>' ? l > r : l < r) ? 'Đ' : 'S';
    return {html:`${sp(l)} ${sg} ${sp(r)}`, ok};
  };
  const parts = n => { const s = String(n), out = [];
    for (let i = 0; i < s.length; i++){ const v = (+s[i]) * Math.pow(10, s.length - 1 - i); if (v) out.push(v); }
    return out; };
  const sumLine = n => {
    const arr = parts(n);
    let use = arr;
    if (Math.random() < .45){
      const i = R(0, arr.length - 1);
      const unit = Math.pow(10, String(arr[i]).length - 1);
      const c = arr.slice();
      c[i] = arr[i] - unit > 0 && Math.random() < .5 ? arr[i] - unit : arr[i] + unit;
      use = c;
    }
    const tong = use.reduce((x, y) => x + y, 0);
    return {html:`${sp(n)} = ${use.map(sp).join(' + ')}`, ok:tong === n ? 'Đ' : 'S'};
  };

  const k0 = R(1, 10);
  const a1 = cmpLine(k0 * 1000, k0 * 1000 - 1);
  const x = R(1002, 9998);
  const a2 = cmpLine(x, x + pick([-1, 1, 10, -10]));
  const b1 = sumLine(R(1, 9) * 1000 + R(1, 9) * 10);
  const b2 = sumLine(R(1, 9) * 1000 + R(1, 9) * 100 + R(1, 9) * 10 + R(1, 9));

  const row = o => `<div class="fill-line">${o.html} &nbsp;${q.pick(o.ok, DS)}</div>`;
  return q.done(`<div class="two-col">
      <div><div class="sub-lbl">a)</div>${row(a1)}${row(a2)}</div>
      <div><div class="sub-lbl">b)</div>${row(b1)}${row(b2)}</div></div>`,
    'Đ nếu khẳng định đúng, S nếu khẳng định sai.');
},

/* ===== tr.11 – Luyện tập Bài 2: Bốn túi hạt dẻ ===== */
() => {
  const q = Q(2, '');
  const ds = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 4);
  const perms = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) for (let l = 0; l < 4; l++){
    if (new Set([i, j, k, l]).size !== 4) continue;
    perms.push(ds[i] * 1000 + ds[j] * 100 + ds[k] * 10 + ds[l]);
  }
  const ms = [...new Set(perms)].sort(() => Math.random() - .5).slice(0, 4);
  const COLORS = ['#a8d97a', '#8ed3ef', '#f5b8d0', '#f5b878'];
  const lo = Math.min(...ms), hi = Math.max(...ms);
  const opts = ms.map(String);

  return q.done(`<p class="wordq">Hai chú sóc đi du lịch vòng quanh thế giới bằng khinh khí cầu.
      Hai chú đã chuẩn bị bốn túi hạt dẻ để ăn dần theo thứ tự từ túi nặng nhất đến túi nhẹ nhất.
      Hỏi túi nào được ăn cuối cùng?</p>
    <div class="b46-bagrow">${ms.map((g, i) => ART.b46Bag(COLORS[i], g)).join('')}</div>
    <div class="fill-line">Túi được ăn đầu tiên là túi ghi ${q.pick(String(hi), opts)} g.</div>
    <div class="fill-line">Túi được ăn cuối cùng là túi ghi ${q.pick(String(lo), opts)} g.</div>`,
    `Sắp xếp từ nặng đến nhẹ: ${ms.slice().sort((a, b) => b - a).map(ART.spNum).join(' > ')} (g).`);
},

/* ===== tr.11 – Luyện tập Bài 3: Bốn đỉnh núi ===== */
() => {
  const q = Q(3, 'Rô-bốt đã đến bốn đỉnh núi ở Việt Nam trong hai tháng hè:');
  const NM = ['Pu Si Lung', 'Phan-xi-păng', 'Lảo Thẩn', 'Tây Côn Lĩnh'];
  const COLORS = ['#7f9f6a', '#6f8fae', '#8f7f5f', '#6f9f8a'];
  const hs = [];
  for (let g = 0; g < 300 && hs.length < 4; g++){
    const v = R(2100, 3200);
    if (!hs.includes(v)) hs.push(v);
  }
  while (hs.length < 4) hs.push(3300 + hs.length);
  const items = NM.map((n, i) => ({n, h:hs[i], c:COLORS[i]}));
  const up = items.slice().sort((x, y) => x.h - y.h);
  const opts = NM.slice();

  return q.done(`<div class="bullet">Tháng 6: đỉnh ${items[0].n} cao ${ART.spNum(items[0].h)} m,
      đỉnh ${items[1].n} cao ${ART.spNum(items[1].h)} m.</div>
    <div class="bullet">Tháng 7: đỉnh ${items[2].n} cao ${ART.spNum(items[2].h)} m,
      đỉnh ${items[3].n} cao ${ART.spNum(items[3].h)} m.</div>
    <div class="b46-prow">${items.map(x =>
      `<div class="b46-pcell">${ART.b46Peak(x.c)}<span class="b46-pcap">${x.n}</span></div>`).join('')}</div>
    <div class="fill-line">Nêu tên các đỉnh núi đó theo thứ tự từ đỉnh núi thấp nhất đến đỉnh núi cao nhất:</div>
    ${up.map((x, i) => `<div class="fill-line">${i + 1}. đỉnh ${q.pick(x.n, opts)}</div>`).join('')}`,
    up.map(x => `${x.n} (${ART.spNum(x.h)} m)`).join(' < '));
},

/* ===== tr.12 – Luyện tập Bài 4: Số ? (các số bé nhất, lớn nhất có bốn chữ số) ===== */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const items = [
    {t:'Số bé nhất có bốn chữ số', v:1000},
    {t:'Số bé nhất có bốn chữ số khác nhau', v:1023},
    {t:'Số bé nhất có bốn chữ số giống nhau', v:1111},
    {t:'Số lớn nhất có bốn chữ số khác nhau', v:9876},
    {t:'Số lớn nhất có bốn chữ số', v:9999}
  ].sort(() => Math.random() - .5);
  return q.done(`<div class="b46-sky">${items.map((x, i) =>
      `<span class="b46-bub c${i + 1}"><span class="b46-star">${i + 1}</span>${x.t}<br>${q.num(x.v)}</span>`).join('')}</div>`,
    '1 000 < 1 023 < 1 111 < 9 876 < 9 999.');
},

/* ===== tr.12 – Luyện tập Bài 5: Bốn tấm thẻ số của Mai ===== */
() => {
  const q = Q(5, '');
  const nz = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 3);
  const ds = nz.concat([0]).sort(() => Math.random() - .5);
  const up = ds.slice().sort((a, b) => a - b);
  if (up[0] === 0){ up[0] = up[1]; up[1] = 0; }
  const be = up[0] * 1000 + up[1] * 100 + up[2] * 10 + up[3];
  return q.done(`<p class="wordq">Mai có bốn tấm thẻ ghi các số: ${ds.join(', ')}.
      Hỏi số có bốn chữ số bé nhất mà Mai có thể tạo ra là số nào?</p>
    <div class="b46-cards">${ds.map(d => `<div class="b46-card">${d}</div>`).join('')}</div>
    <div class="fill-line">Số có bốn chữ số bé nhất Mai tạo ra được là ${q.num(be)}.</div>`,
    `Chữ số hàng nghìn phải bé nhất nhưng khác 0, các chữ số sau xếp tăng dần: ${ART.spNum(be)}.`);
},
];
