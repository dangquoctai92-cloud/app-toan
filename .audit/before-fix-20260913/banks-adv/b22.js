/*CSS
.b22adv-wide{width:100%;max-width:340px;height:auto;display:block;margin:8px auto}
.b22adv-fig{width:100%;max-width:300px;height:auto;display:block;margin:8px auto}
CSS*/

/* ===== NÂNG CAO — Bài 22: Luyện tập chung ===== */

const b22advBag = n => 'ABCDEGHIKLMNPQ'.split('').sort(() => Math.random() - .5).slice(0, n);

/* đoạn thẳng có bốn điểm: đầu — trung điểm của nửa đầu — trung điểm — cuối */
const b22advSeg = nm => {
  const y = 58, x0 = 26, x1 = 314, W = 340, H = 92;
  const xs = [x0, x0 + (x1 - x0) / 4, x0 + (x1 - x0) / 2, x1];
  const dot = xs.map(x => `<circle cx="${x.toFixed(1)}" cy="${y}" r="4.6"/>`).join('');
  const lab = xs.map((x, i) =>
    `<text x="${x.toFixed(1)}" y="${y - 14}" text-anchor="middle" font-size="19" font-weight="700">${nm[i]}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="b22adv-wide">
    <path d="M${x0} ${y}H${x1}" stroke="#2b2b2b" stroke-width="3.4" stroke-linecap="round"/>
    ${dot}${lab}</svg>`;
};

/* khay hình chữ nhật xếp k chiếc bánh hình tròn sát nhau thành một hàng */
const b22advTray = k => {
  const S = 44, W = k * S, H = S;
  let c = '';
  for (let i = 0; i < k; i++)
    c += `<circle cx="${i * S + S / 2}" cy="${S / 2}" r="${S / 2 - 3}" fill="#f0c070" stroke="#a9721f" stroke-width="2.4"/>
      <circle cx="${i * S + S / 2}" cy="${S / 2}" r="2.6" fill="#a9721f"/>`;
  return `<svg viewBox="-10 -10 ${W + 20} ${H + 20}" class="b22adv-wide">
    <rect x="-7" y="-7" width="${W + 14}" height="${H + 14}" rx="5" fill="#fdf1e0" stroke="#8a5a2b" stroke-width="3"/>
    ${c}</svg>`;
};

/* hình có n đỉnh, vẽ tất cả các đường chéo xuất phát từ đỉnh thứ nhất */
const b22advPoly = (n, nm) => {
  const cx = 152, cy = 138, R0 = 106;
  const pt = i => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n;
    return [cx + R0 * Math.cos(a), cy + R0 * Math.sin(a)];
  };
  const P = [];
  for (let i = 0; i < n; i++) P.push(pt(i));
  const d = P.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('') + 'Z';
  let ch = '';
  for (let i = 2; i <= n - 2; i++)
    ch += `<path d="M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}L${P[i][0].toFixed(1)} ${P[i][1].toFixed(1)}"
      fill="none" stroke="#c2185b" stroke-width="2.4"/>`;
  const dot = P.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4"/>`).join('');
  const lab = P.map((p, i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n;
    const x = cx + (R0 + 20) * Math.cos(a), yy = cy + (R0 + 20) * Math.sin(a) + 6;
    return `<text x="${x.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="middle"
      font-size="18" font-weight="700">${nm[i]}</text>`;
  }).join('');
  return `<svg viewBox="0 0 304 290" class="b22adv-fig">
    <path d="${d}" fill="#fbe6f2" stroke="#c2185b" stroke-width="3" stroke-linejoin="round"/>
    ${ch}${dot}${lab}</svg>`;
};

/* khối lập phương lớn ghép từ 8 khối lập phương nhỏ */
const b22advCube8 = col => `<svg viewBox="10 10 220 220" class="b22adv-fig">
  <path d="M40 90h120v120H40z" fill="${col}" stroke="#7a2f24" stroke-width="2.4"/>
  <path d="M40 90l50-50h120l-50 50z" fill="${col}" opacity=".78" stroke="#7a2f24" stroke-width="2.4"/>
  <path d="M160 90l50-50v120l-50 50z" fill="${col}" opacity=".6" stroke="#7a2f24" stroke-width="2.4"/>
  <g fill="none" stroke="#7a2f24" stroke-width="2">
    <path d="M100 90v120M40 150h120"/>
    <path d="M65 65h120M150 40L100 90"/>
    <path d="M185 65v120M160 150l50-50"/></g>
</svg>`;

/* cái ao hình chữ nhật L × W (dm) với các lá súng viền sát mép ao */
const b22advPond = (L, W) => {
  const C = 26, wid = L * C, hei = W * C;
  let p = '';
  for (let i = 0; i < L; i++) for (let j = 0; j < W; j++){
    if (i === 0 || j === 0 || i === L - 1 || j === W - 1)
      p += `<circle cx="${i * C + C / 2}" cy="${j * C + C / 2}" r="${C / 2 - 1.6}"
        fill="#4fae4a" stroke="#2f7a2c" stroke-width="1.6"/>`;
  }
  return `<svg viewBox="-12 -12 ${wid + 24} ${hei + 24}" class="b22adv-wide">
    <rect x="-8" y="-8" width="${wid + 16}" height="${hei + 16}" fill="#8ec24a" stroke="#5f8f2e" stroke-width="2"/>
    <rect x="0" y="0" width="${wid}" height="${hei}" fill="#5cc4e8" stroke="#1c6c96" stroke-width="2.4"/>
    ${p}</svg>`;
};

ADV.b22 = [

/* 1. Trung điểm lồng nhau */
() => {
  const q = Q(1, '');
  const nm = b22advBag(4);
  const A = nm[0], N = nm[1], M = nm[2], B = nm[3];
  const a = R(2, 9);
  return q.done(b22advSeg([A, N, M, B])
    + `<p class="wordq">Trên đoạn thẳng ${A}${B}, điểm ${M} là trung điểm của đoạn thẳng ${A}${B},
        điểm ${N} là trung điểm của đoạn thẳng ${A}${M}. Biết ${A}${N} = ${a} cm.</p>
       <div class="fill-line">Độ dài đoạn thẳng ${A}${M} là ${q.num(2 * a, 2)} cm.</div>
       <div class="fill-line">Độ dài đoạn thẳng ${A}${B} là ${q.num(4 * a, 2)} cm.</div>
       <div class="fill-line">Độ dài đoạn thẳng ${N}${B} là ${q.num(3 * a, 2)} cm.</div>
       <div class="fill-line">Độ dài đoạn thẳng ${M}${B} là ${q.num(2 * a, 2)} cm.</div>`,
    `${N} là trung điểm ${A}${M} nên ${A}${M} = ${a} + ${a} = ${2 * a} (cm).  `
    + `${M} là trung điểm ${A}${B} nên ${A}${B} = ${2 * a} + ${2 * a} = ${4 * a} (cm).  `
    + `${N}${B} = ${4 * a} − ${a} = ${3 * a} (cm);  ${M}${B} = ${A}${M} = ${2 * a} (cm).`);
},

/* 2. Bài toán ngược: những chiếc bánh hình tròn xếp trong khay hình chữ nhật */
() => {
  const q = Q(2, '');
  const d = pick([2, 4, 6]), k = R(3, 6), L = d * k;
  return q.done(b22advTray(k)
    + `<p class="wordq">Trong một chiếc khay hình chữ nhật có chiều dài ${L} cm, người ta xếp sát nhau
        thành một hàng những chiếc bánh hình tròn có đường kính ${d} cm, vừa kín chiều dài của khay
        (như hình vẽ).</p>
       <div class="fill-line">Mỗi chiếc bánh có bán kính ${q.num(d / 2, 1)} cm.</div>
       <div class="fill-line">Trong khay có ${q.num(k, 1)} chiếc bánh.</div>
       <div class="fill-line">Chiều rộng của chiếc khay là ${q.num(d, 1)} cm.</div>
       <div class="fill-line">Tổng độ dài bốn cạnh của chiếc khay là ${q.num(2 * (L + d), 2)} cm.</div>`,
    `${d} : 2 = ${d / 2} (cm);  ${L} : ${d} = ${k} (chiếc bánh);  `
    + `${L} + ${d} + ${L} + ${d} = ${2 * (L + d)} (cm).`);
},

/* 3. Đếm hình tam giác và hình tứ giác */
() => {
  const q = Q(3, 'Tìm các hình tam giác và các hình tứ giác có trong hình sau:');
  const n = R(5, 6);
  const nm = b22advBag(n);
  return q.done(b22advPoly(n, nm)
    + `<div class="fill-line">Từ đỉnh ${nm[0]} vẽ được ${q.num(n - 3, 1)} đường chéo.</div>
       <div class="fill-line">Hình vẽ có ${q.num(n - 2, 1)} hình tam giác.</div>
       <div class="fill-line">Hình vẽ có ${q.num(n - 3, 1)} hình tứ giác.</div>
       <div class="hint-line">Mỗi hình tứ giác được ghép từ hai hình tam giác nhỏ nằm cạnh nhau.</div>`,
    `${n - 3} đường chéo chia hình thành ${n - 2} hình tam giác nhỏ. `
    + `Ghép hai hình tam giác nhỏ nằm cạnh nhau được một hình tứ giác, có ${n - 3} cách ghép như vậy.`);
},

/* 4. Sơn màu khối lập phương lớn ghép từ 8 khối nhỏ */
() => {
  const q = Q(4, 'Ghép 8 khối lập phương nhỏ giống nhau được một khối lập phương lớn (như hình vẽ).');
  const m = pick([['đỏ', '#ef7d6a'], ['xanh', '#6aa9ef'], ['vàng', '#efc76a']]);
  const sl = R(2, 5);
  return q.done(b22advCube8(m[1])
    + `<p class="wordq">Người ta sơn màu ${m[0]} vào tất cả các mặt của khối lập phương lớn,
        sau đó tách rời 8 khối lập phương nhỏ ra.</p>
       <div class="fill-line">Mỗi khối lập phương nhỏ nằm ở một đỉnh của khối lớn nên có
         ${q.num(3, 1)} mặt được sơn màu ${m[0]}.</div>
       <div class="fill-line">Cả 8 khối nhỏ có ${q.num(24, 2)} mặt được sơn màu ${m[0]}.</div>
       <div class="fill-line">Cả 8 khối nhỏ có tất cả ${q.num(48, 2)} mặt, vậy có
         ${q.num(24, 2)} mặt không được sơn màu.</div>
       <div class="fill-line">Cả 8 khối nhỏ có tất cả ${q.num(96, 2)} cạnh.</div>
       <div class="fill-line">Muốn ghép ${sl} khối lập phương lớn như vậy cần
         ${q.num(8 * sl, 2)} khối lập phương nhỏ.</div>`,
    `3 × 8 = 24 (mặt được sơn);  6 × 8 = 48 (mặt);  48 − 24 = 24 (mặt không sơn);  `
    + `12 × 8 = 96 (cạnh);  8 × ${sl} = ${8 * sl} (khối nhỏ).`);
},

/* 5. Suy luận: viền lá súng quanh cái ao */
() => {
  const q = Q(5, '');
  const L = R(5, 9), W = R(3, 6);
  const vien = 2 * (L + W) - 4;
  return q.done(b22advPond(L, W)
    + `<p class="wordq">Cái ao của chú ếch có dạng hình chữ nhật, chiều dài ${L} dm, chiều rộng ${W} dm.
        Chú ếch thả những lá súng hình tròn đường kính 1 dm, xếp sát nhau thành một vòng sát mép ao
        (như hình vẽ).</p>
       <div class="fill-line">Hai cạnh dài của ao cần ${q.num(2 * L, 2)} lá súng.</div>
       <div class="fill-line">Hai cạnh ngắn của ao cần ${q.num(2 * W, 2)} lá súng.</div>
       <div class="fill-line">Bốn lá súng ở bốn góc đã được đếm hai lần nên phải bớt đi
         ${q.num(4, 1)} lá súng.</div>
       <div class="fill-line">Chú ếch đã thả ${q.num(vien, 2)} lá súng.</div>`,
    `${L} + ${L} = ${2 * L};  ${W} + ${W} = ${2 * W};  `
    + `${2 * L} + ${2 * W} = ${2 * (L + W)};  ${2 * (L + W)} − 4 = ${vien} (lá súng).`);
},

/* 6. So sánh hai vế */
() => {
  const q = Q(6, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(2, 9), b = 2 * a + pick([-3, -1, 0, 0, 2, 5]);
    rows.push({t:`Độ dài đoạn thẳng có trung điểm chia thành hai đoạn dài ${a} cm`, p:`${b} cm`,
      l:2 * a, r:b});
  }
  {
    const a = R(2, 9), c = R(2, 9);
    rows.push({t:`Đường kính của hình tròn có bán kính ${a} cm`,
      p:`Cạnh của hình vuông có tổng độ dài bốn cạnh là ${4 * c} cm`, l:2 * a, r:c});
  }
  {
    const a = R(2, 6), b = R(2, 6);
    rows.push({t:`Số mặt của ${a} khối lập phương`, p:`Số cạnh của ${b} khối hộp chữ nhật`,
      l:6 * a, r:12 * b});
  }
  {
    const s = R(3, 9), d = R(4, 9), w = R(2, 3);
    rows.push({t:`Tổng độ dài bốn cạnh của hình vuông cạnh ${s} cm`,
      p:`Tổng độ dài bốn cạnh của hình chữ nhật ${d} cm và ${w} cm`, l:4 * s, r:2 * (d + w)});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Trung điểm chia đoạn thẳng thành hai đoạn bằng nhau · Đường kính dài gấp 2 lần bán kính ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},
];
