/* ==================== BÀI 74: KHẢ NĂNG XẢY RA CỦA MỘT SỰ KIỆN
   (SGK tập 2 – tr.107, 108)
   khám phá tr.107  : lấy 1 quả bóng trong hộp – hai khả năng xảy ra (phần lí thuyết, không viết)
   hoạt động tr.107 : Rô-bốt tung một đồng xu gồm hai mặt, quan sát mặt trên
   luyện tập tr.108 : bài 1 (Đ, S ? – khay 4 cái bánh, Mi nhắm mắt lấy 2 cái bánh)
                      bài 2 (xúc xắc tự làm, nhìn từ hai hướng thấy 6 mặt, gieo một lần)
   Mỗi dạng bài của sách được viết thành hai đề khác nhau về đồ vật và số liệu.
   Mọi câu "chắc chắn / có thể / không thể" đều trả lời bằng Đ, S hoặc bằng số nên đáp án là duy nhất.
========================================================================================= */

/* trộn một mảng */
const b74Mix = a => a.slice().sort(() => Math.random() - .5);
/* đáp án chọn nhiều phải xếp đúng thứ tự chuỗi như khi máy chấm */
const b74Set = a => a.slice().sort().join(',');

/* ---- các hình vẽ nhỏ dùng cho mặt đồng xu và mặt xúc xắc ---- */
ART.b74Sym = (ten, cx, cy, s) => {
  let m;
  if (ten === 'ngôi sao') m = `<path d="M20 3l5.4 11 12.1 1.8-8.8 8.5 2.1 12.1L20 30.7 9.2 36.4l2.1-12.1
    -8.8-8.5L14.6 14z" fill="#f7c11e" stroke="#b8860b" stroke-width="2" stroke-linejoin="round"/>`;
  else if (ten === 'cỏ bốn lá') m = `<path d="M20 20l6 15" fill="none" stroke="#2e7d32"
      stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="20" cy="11" r="7.4" fill="#4caf50" stroke="#2e7d32" stroke-width="1.8"/>
    <circle cx="29" cy="20" r="7.4" fill="#4caf50" stroke="#2e7d32" stroke-width="1.8"/>
    <circle cx="20" cy="29" r="7.4" fill="#4caf50" stroke="#2e7d32" stroke-width="1.8"/>
    <circle cx="11" cy="20" r="7.4" fill="#4caf50" stroke="#2e7d32" stroke-width="1.8"/>`;
  else if (ten === 'bông hoa') m = `<circle cx="20" cy="10" r="7" fill="#f06292" stroke="#ad1457" stroke-width="1.6"/>
    <circle cx="29.5" cy="16.9" r="7" fill="#f06292" stroke="#ad1457" stroke-width="1.6"/>
    <circle cx="25.9" cy="28.1" r="7" fill="#f06292" stroke="#ad1457" stroke-width="1.6"/>
    <circle cx="14.1" cy="28.1" r="7" fill="#f06292" stroke="#ad1457" stroke-width="1.6"/>
    <circle cx="10.5" cy="16.9" r="7" fill="#f06292" stroke="#ad1457" stroke-width="1.6"/>
    <circle cx="20" cy="20" r="6" fill="#ffd54f" stroke="#e0a800" stroke-width="1.6"/>`;
  else if (ten === 'trái tim') m = `<path d="M20 34.5C7 24.5 5.5 17.5 9.6 13.2c3.4-3.6 8.3-1.8 10.4 1.9
    2.1-3.7 7-5.5 10.4-1.9 4.1 4.3 2.6 11.3-10.4 21.3z" fill="#e8443a" stroke="#a5321a"
    stroke-width="1.8" stroke-linejoin="round"/>`;
  else if (ten === 'chiếc lá') m = `<path d="M7 33C7 17 19 6 33 6c0 16-12 27-26 27z" fill="#6aba3f"
      stroke="#3f7a1e" stroke-width="2" stroke-linejoin="round"/>
    <path d="M9 31L31 9" fill="none" stroke="#3f7a1e" stroke-width="1.8" stroke-linecap="round"/>`;
  else if (ten === 'hình tròn') m = `<circle cx="20" cy="20" r="14" fill="#e8443a" stroke="#a5321a" stroke-width="2"/>`;
  else if (ten === 'hình vuông') m = `<rect x="6" y="6" width="28" height="28" rx="2" fill="#f7d117"
    stroke="#b39100" stroke-width="2"/>`;
  else if (ten === 'hình tam giác') m = `<path d="M20 5l15 29H5z" fill="#4aa8dd" stroke="#2b6ea8"
    stroke-width="2" stroke-linejoin="round"/>`;
  else if (ten === 'cái kẹo') m = `<path d="M10 20L2 13v14z" fill="#f6b93b" stroke="#c07d10"
      stroke-width="2" stroke-linejoin="round"/>
    <path d="M30 20l8-7v14z" fill="#f6b93b" stroke="#c07d10" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="20" cy="20" rx="10.5" ry="8.5" fill="#ffd166" stroke="#c07d10" stroke-width="2"/>`;
  else if (ten === 'bút chì') m = `<rect x="14" y="4" width="12" height="5" fill="#e8552f"
      stroke="#a5321a" stroke-width="1.6"/>
    <path d="M14 9h12v19H14z" fill="#f6c344" stroke="#c08f10" stroke-width="2"/>
    <path d="M14 28h12l-6 8z" fill="#e8b07f" stroke="#a5642f" stroke-width="2" stroke-linejoin="round"/>
    <path d="M17.2 32.3h5.6L20 36z" fill="#3a3a44"/>`;
  else m = `<circle cx="20" cy="20" r="13" fill="#9aa4b5" stroke="#5a6472" stroke-width="2"/>`;
  return `<g transform="translate(${cx},${cy}) scale(${s}) translate(-20,-20)">${m}</g>`;
};

/* ---- đồng xu: một mặt có vẽ một hình ---- */
ART.b74Coin = ten => `<svg class="b74-coin" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="55" fill="#f2b90c" stroke="#c08f10" stroke-width="4"/>
  <circle cx="60" cy="60" r="44" fill="#ffd95e" stroke="#e0a91d" stroke-width="3"/>
  ${ART.b74Sym(ten, 60, 60, 1.5)}
</svg>`;

/* ---- xúc xắc nhìn nghiêng: thấy mặt trước, mặt trên và mặt bên phải ---- */
ART.b74Cube = (truoc, tren, phai) => `<svg class="b74-cube" viewBox="0 0 148 140">
  <path d="M18 48h82v82H18z" fill="#d6edf8" stroke="#3f87a6" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M18 48l28-28h82l-28 28z" fill="#eaf7fd" stroke="#3f87a6" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M100 48l28-28v82l-28 28z" fill="#a9d8ec" stroke="#3f87a6" stroke-width="2.8" stroke-linejoin="round"/>
  ${ART.b74Sym(truoc, 59, 89, 1.15)}
  ${ART.b74Sym(tren, 73, 34, 0.78)}
  ${ART.b74Sym(phai, 114, 76, 0.78)}
</svg>`;

/* ---- khay bánh: t cái bánh táo và d cái bánh dâu ---- */
ART.b74Khay = (t, d) => {
  const loai = [];
  for (let i = 0; i < t; i++) loai.push('tao');
  for (let i = 0; i < d; i++) loai.push('dau');
  const n = loai.length, W = 44 * n + 26;
  const cake = (x, k) => `<g transform="translate(${x},9)">
    <path d="M3 18h34l-5 20H8z" fill="#f0c67a" stroke="#c08b3a" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M8 25h24M9.6 31h20.8" fill="none" stroke="#d9a95e" stroke-width="1.6"/>
    <path d="M1 18q19-15 38 0z" fill="#fff3d6" stroke="#c08b3a" stroke-width="2.2" stroke-linejoin="round"/>
    ${k === 'tao'
      ? `<circle cx="20" cy="9" r="6.4" fill="#e8443a" stroke="#a5321a" stroke-width="1.8"/>
         <path d="M20 3.2q3-3.6 6.4-2.6" fill="none" stroke="#3f8f2e" stroke-width="2" stroke-linecap="round"/>`
      : `<path d="M20 2.4c4.4 0 7.4 2.6 7.4 5.6 0 3.6-3.6 7.4-7.4 7.4s-7.4-3.8-7.4-7.4c0-3 3-5.6 7.4-5.6z"
           fill="#f0567a" stroke="#b3244a" stroke-width="1.8"/>
         <circle cx="17.4" cy="7" r="1" fill="#fff"/><circle cx="22.6" cy="8.6" r="1" fill="#fff"/>
         <circle cx="20" cy="11.8" r="1" fill="#fff"/>`}
  </g>`;
  return `<svg class="b74-art" viewBox="0 0 ${W} 78">
    <rect x="4" y="48" width="${W - 8}" height="15" rx="6" fill="#9fdbe0" stroke="#3f8f96" stroke-width="2.6"/>
    <rect x="12" y="63" width="${W - 24}" height="7" rx="3.5" fill="#7ec6cd" stroke="#3f8f96" stroke-width="2"/>
    ${b74Mix(loai).map((k, i) => cake(13 + i * 44, k)).join('')}
  </svg>`;
};

/* ---- hộp bóng: x quả bóng xanh và y quả bóng đỏ ---- */
ART.b74Hop = (x, y) => {
  const mau = [];
  for (let i = 0; i < x; i++) mau.push('#3fa34d');
  for (let i = 0; i < y; i++) mau.push('#e8443a');
  const n = mau.length, W = 40 * n + 28;
  const vien = {'#3fa34d': '#1f6b2a', '#e8443a': '#a5321a'};
  return `<svg class="b74-art" viewBox="0 0 ${W} 86">
    <rect x="4" y="22" width="${W - 8}" height="12" rx="5" fill="#e0a86a" stroke="#a5764a" stroke-width="2.6"/>
    <rect x="9" y="34" width="${W - 18}" height="44" rx="6" fill="#f7d0a4" stroke="#a5764a" stroke-width="2.6"/>
    ${b74Mix(mau).map((c, i) =>
      `<circle cx="${24 + i * 40}" cy="56" r="14.5" fill="${c}" stroke="${vien[c]}" stroke-width="2.4"/>
       <circle cx="${19 + i * 40}" cy="50" r="4" fill="#fff" opacity=".55"/>`).join('')}
  </svg>`;
};

/* ---- các khả năng khi lấy 2 vật từ n1 vật loại A và n2 vật loại B ---- */
const b74KQ = (A, B, n1, n2) => {
  const kq = [];
  if (n1 >= 2) kq.push(`2 ${A}`);
  if (n1 >= 1 && n2 >= 1) kq.push(`1 ${A} và 1 ${B}`);
  if (n2 >= 2) kq.push(`2 ${B}`);
  return kq;
};

/* ---- ba câu Đ/S: một câu "chắc chắn", một câu "có thể", một câu "không thể" ----
   hai1 = lấy được 2 vật loại A; hai2 = lấy được 2 vật loại B; mot = lấy được 1 A và 1 B.
   k = khả năng mà câu nói tới (0: hai vật loại A, 1: mỗi loại một vật, 2: hai vật loại B);
   ba câu phải nói về ba khả năng khác nhau thì mới không trùng ý.                       */
const b74DS3 = (A, B, n1, n2) => {
  const hai1 = n1 >= 2, hai2 = n2 >= 2, mot = n1 >= 1 && n2 >= 1;
  const cc = [
    {t: `chắc chắn lấy được 2 ${A}.`, v: hai1 && !hai2 && !mot, k: 0},
    {t: `chắc chắn lấy được ít nhất 1 ${A}.`, v: !hai2, k: 2},
    {t: `chắc chắn lấy được ít nhất 1 ${B}.`, v: !hai1, k: 0}
  ];
  const ct = [
    {t: `có thể lấy được 1 ${A} và 1 ${B}.`, v: mot, k: 1},
    {t: `có thể lấy được 2 ${A}.`, v: hai1, k: 0},
    {t: `có thể lấy được 2 ${B}.`, v: hai2, k: 2}
  ];
  const kt = [
    {t: `không thể lấy được 2 ${B}.`, v: !hai2, k: 2},
    {t: `không thể lấy được 2 ${A}.`, v: !hai1, k: 0},
    {t: `không thể lấy được 1 ${A} và 1 ${B}.`, v: !mot, k: 1}
  ];
  const moi = [], deu = [];
  cc.forEach(a => ct.forEach(b => kt.forEach(c => {
    if (a.k === b.k || b.k === c.k || a.k === c.k) return;
    const bo = [a, b, c];
    deu.push(bo);
    if (!bo.every(s => s.v === bo[0].v)) moi.push(bo);     /* có cả Đ lẫn S thì hay hơn */
  })));
  /* phần lớn lấy bộ có cả Đ lẫn S, thỉnh thoảng lấy bộ bất kì cho khỏi đoán mò */
  const bo = (R(1, 4) === 1 || !moi.length) ? pick(deu) : pick(moi);
  return b74Mix(bo);                                      /* đảo thứ tự ba câu a, b, c */
};

/* ---- một câu Đ/S về việc tung đồng xu hay gieo xúc xắc ---- */
const b74Gieo1 = (ai, co, khong) => pick([
  {t: `${ai} chắc chắn được mặt có vẽ ${pick(co)}.`, v: 'S'},
  {t: `${ai} có thể được mặt có vẽ ${pick(co)}.`, v: 'Đ'},
  {t: `${ai} không thể được mặt có vẽ ${pick(khong)}.`, v: 'Đ'},
  {t: `${ai} có thể được mặt có vẽ ${pick(khong)}.`, v: 'S'}
]);

/* ---- kho hình vẽ cho mặt đồng xu, mặt xúc xắc ---- */
const B74_HINH = ['ngôi sao', 'cỏ bốn lá', 'bông hoa', 'trái tim', 'chiếc lá',
  'hình tròn', 'hình vuông', 'hình tam giác', 'cái kẹo', 'bút chì'];

BANKS.b74 = [

/* ===== tr.107 – Hoạt động: Rô-bốt tung một đồng xu gồm hai mặt ===== */
() => {
  const q = Q(1, 'Rô-bốt có một đồng xu gồm hai mặt như sau:');
  const mat = b74Mix(B74_HINH).slice(0, 2);
  const gia = b74Mix(B74_HINH.filter(x => !mat.includes(x))).slice(0, 2);
  const opts = b74Mix(mat.concat(gia));
  const st = b74Mix([
    {t: `Rô-bốt chắc chắn được mặt có vẽ ${mat[0]}.`, v: 'S'},
    {t: `Rô-bốt có thể được mặt có vẽ ${mat[1]}.`, v: 'Đ'},
    {t: `Rô-bốt không thể được mặt có vẽ ${gia[0]}.`, v: 'Đ'},
    {t: `Rô-bốt có thể được mặt có vẽ ${gia[1]}.`, v: 'S'}
  ]).slice(0, 2);

  const html = `<div class="b74-row">${ART.b74Coin(mat[0])}${ART.b74Coin(mat[1])}</div>
    <div class="b74-note">Hai mặt của đồng xu</div>
    <p class="wordq">Hỏi khi Rô-bốt tung đồng xu đó và quan sát mặt trên của đồng xu
      thì những sự kiện nào có thể xảy ra?</p>
    <div class="b74-ask">a) Khi tung đồng xu đó, có bao nhiêu sự kiện có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(2)} sự kiện có thể xảy ra.</div>
    <div class="b74-ask">b) Chọn những sự kiện có thể xảy ra.</div>
    <div class="fill-line b74-wide">Mặt trên của đồng xu có vẽ: ${q.pick(b74Set(mat), opts)}</div>
    <div class="b74-ask">c) <span class="tag">Đ, S</span> ?</div>`
    + st.map(s => `<div class="b74-ds"><span>&ndash; ${s.t}</span>${q.pick(s.v, ['Đ', 'S'])}</div>`).join('');

  return q.done(html,
    `Đồng xu chỉ có hai mặt: mặt có vẽ ${mat[0]} và mặt có vẽ ${mat[1]}. `
    + `Vì thế khi tung đồng xu chỉ có 2 sự kiện có thể xảy ra là mặt trên có vẽ ${mat[0]} `
    + `hoặc mặt trên có vẽ ${mat[1]}; không sự kiện nào là chắc chắn xảy ra. `
    + `Trên đồng xu không có mặt nào vẽ ${gia.join(' hay ')} nên các sự kiện đó không thể xảy ra.`);
},

/* ===== tr.108 – Luyện tập 1: Đ, S ? – khay bánh của Rô-bốt ===== */
() => {
  const q = Q(1, '<span class="tag">Đ, S</span> ?');
  let t = R(1, 4), d = R(1, 4);
  for (let g = 0; g < 24 && t + d < 3; g++){ t = R(1, 4); d = R(1, 4); }
  if (t + d < 3){ t = 3; d = 1; }
  const ba = b74DS3('bánh táo', 'bánh dâu', t, d);
  const kq = b74KQ('bánh táo', 'bánh dâu', t, d);
  const LET = ['a', 'b', 'c'];

  const html = `<p class="wordq">Rô-bốt bê khay có ${t + d} cái bánh: ${t} bánh táo và ${d} bánh dâu.
      Mi nhắm mắt và lấy 2 cái bánh trên khay.</p>
    ${ART.b74Khay(t, d)}`
    + ba.map((s, i) => `<div class="b74-ds"><span>${LET[i]}) Mi ${s.t}</span>${
      q.pick(s.v ? 'Đ' : 'S', ['Đ', 'S'])}</div>`).join('');

  return q.done(html,
    `Khay có ${t} bánh táo và ${d} bánh dâu. Khi lấy 2 cái bánh, các khả năng xảy ra là: `
    + `${kq.join('; ')}. Dựa vào đó: `
    + ba.map((s, i) => `${LET[i]}) ${s.v ? 'Đ' : 'S'}`).join('; ') + '.');
},

/* ===== tr.108 – Luyện tập 1 (đề khác): Đ, S ? – hộp bóng xanh và bóng đỏ ===== */
() => {
  const q = Q(1, '<span class="tag">Đ, S</span> ?');
  let x = R(1, 4), y = R(1, 4);
  for (let g = 0; g < 24 && x + y < 3; g++){ x = R(1, 4); y = R(1, 4); }
  if (x + y < 3){ x = 2; y = 2; }
  const ba = b74DS3('quả bóng xanh', 'quả bóng đỏ', x, y);
  const kq = b74KQ('quả bóng xanh', 'quả bóng đỏ', x, y);
  const LET = ['a', 'b', 'c'];

  const html = `<p class="wordq">Trong hộp có ${x + y} quả bóng: ${x} quả bóng xanh và ${y} quả bóng đỏ.
      Việt nhắm mắt và lấy 2 quả bóng trong hộp.</p>
    ${ART.b74Hop(x, y)}`
    + ba.map((s, i) => `<div class="b74-ds"><span>${LET[i]}) Việt ${s.t}</span>${
      q.pick(s.v ? 'Đ' : 'S', ['Đ', 'S'])}</div>`).join('');

  return q.done(html,
    `Trong hộp có ${x} quả bóng xanh và ${y} quả bóng đỏ. Khi lấy 2 quả bóng, `
    + `các khả năng xảy ra là: ${kq.join('; ')}. Dựa vào đó: `
    + ba.map((s, i) => `${LET[i]}) ${s.v ? 'Đ' : 'S'}`).join('; ') + '.');
},

/* ===== tr.108 – Luyện tập 2: xúc xắc tự làm của Việt, 6 mặt vẽ 6 hình khác nhau ===== */
() => {
  const q = Q(2, 'Việt có một xúc xắc tự làm. Khi quan sát từ hai hướng ta thấy 6 mặt của xúc xắc đó '
    + 'như hình vẽ dưới đây.');
  const mat = b74Mix(B74_HINH).slice(0, 6);
  const gia = b74Mix(B74_HINH.filter(z => !mat.includes(z))).slice(0, 2);
  const opts = b74Mix(mat.concat(gia));
  const st = b74Gieo1('Việt', mat, gia);

  const html = `<div class="b74-row">${ART.b74Cube(mat[0], mat[1], mat[2])}
      ${ART.b74Cube(mat[3], mat[4], mat[5])}</div>
    <p class="wordq">Nếu Việt gieo xúc xắc đó một lần và quan sát mặt trên của xúc xắc
      thì sự kiện nào có thể xảy ra?</p>
    <div class="b74-ask">a) Khi gieo xúc xắc đó một lần, có bao nhiêu sự kiện có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(6)} sự kiện có thể xảy ra.</div>
    <div class="b74-ask">b) Chọn những sự kiện có thể xảy ra.</div>
    <div class="fill-line b74-wide">Mặt trên của xúc xắc có vẽ: ${q.pick(b74Set(mat), opts)}</div>
    <div class="b74-ask">c) <span class="tag">Đ, S</span> ?</div>
    <div class="b74-ds"><span>&ndash; ${st.t}</span>${q.pick(st.v, ['Đ', 'S'])}</div>`;

  return q.done(html,
    `Sáu mặt của xúc xắc vẽ 6 hình khác nhau: ${mat.join(', ')}. `
    + `Mỗi mặt đều có thể là mặt trên nên có 6 sự kiện có thể xảy ra, `
    + `không sự kiện nào chắc chắn xảy ra. `
    + `Xúc xắc không có mặt nào vẽ ${gia.join(' hay ')} nên các sự kiện đó không thể xảy ra.`);
},

/* ===== tr.108 – Luyện tập 2 (đề khác): xúc xắc của Mai có nhiều mặt vẽ giống nhau ===== */
() => {
  const q = Q(2, 'Mai có một xúc xắc tự làm. Khi quan sát từ hai hướng ta thấy 6 mặt của xúc xắc đó '
    + 'như hình vẽ dưới đây.');
  const sl = pick([[4, 2], [3, 3], [5, 1], [3, 2, 1], [2, 2, 2], [4, 1, 1]]);
  const k = sl.length;
  const loai = b74Mix(B74_HINH).slice(0, k);
  const gia = b74Mix(B74_HINH.filter(z => !loai.includes(z))).slice(0, 3);
  const mat = [];
  loai.forEach((h, i) => { for (let j = 0; j < sl[i]; j++) mat.push(h); });
  const f = b74Mix(mat);
  const i0 = R(0, k - 1);
  const opts = b74Mix(loai.concat(gia));
  const st = b74Gieo1('Mai', loai, gia);

  const html = `<div class="b74-row">${ART.b74Cube(f[0], f[1], f[2])}
      ${ART.b74Cube(f[3], f[4], f[5])}</div>
    <p class="wordq">Nếu Mai gieo xúc xắc đó một lần và quan sát mặt trên của xúc xắc
      thì sự kiện nào có thể xảy ra?</p>
    <div class="b74-ask">a) Xúc xắc đó có bao nhiêu mặt vẽ ${loai[i0]}?</div>
    <div class="bullet">Có ${q.num(sl[i0])} mặt vẽ ${loai[i0]}.</div>
    <div class="b74-ask">b) Khi gieo xúc xắc đó một lần, có bao nhiêu sự kiện khác nhau
      có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(k)} sự kiện khác nhau có thể xảy ra.</div>
    <div class="b74-ask">c) Chọn những sự kiện có thể xảy ra.</div>
    <div class="fill-line b74-wide">Mặt trên của xúc xắc có vẽ: ${q.pick(b74Set(loai), opts)}</div>
    <div class="b74-ask">d) <span class="tag">Đ, S</span> ?</div>
    <div class="b74-ds"><span>&ndash; ${st.t}</span>${q.pick(st.v, ['Đ', 'S'])}</div>`;

  return q.done(html,
    `Xúc xắc có 6 mặt: ${loai.map((h, i) => sl[i] + ' mặt vẽ ' + h).join(', ')}. `
    + `Trên xúc xắc chỉ có ${k} hình khác nhau nên khi gieo một lần có ${k} sự kiện `
    + `khác nhau có thể xảy ra. `
    + `Xúc xắc không có mặt nào vẽ ${gia.join(' hay ')} nên các sự kiện đó không thể xảy ra.`);
},
];
