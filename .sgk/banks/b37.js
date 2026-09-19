/* ============ BÀI 37: CHIA SỐ CÓ BA CHỮ SỐ CHO SỐ CÓ MỘT CHỮ SỐ (SGK tr.100, 101, 102) ============
   hoạt động : bài 1 (Tính), bài 2 (bài toán xếp bánh vào hộp), bài 3 (Đ, S ?)
   luyện tập : bài 1 (Đặt tính rồi tính theo mẫu), bài 2 (Tính nhẩm theo mẫu),
               bài 3 (Số ? – rô-bốt và các khối ru-bích), bài 4 (chọn câu trả lời đúng – tung quân cờ),
               bài 5 (bài toán đàn lạc đà)
=================================================================================================== */

/* khung đặt tính chia:  bị chia | chia
                                 -----
                                 thương            */
ART.b37Div = (bi, chia, thuong, cls) => `<div class="dv ${cls || 'dv-am'}">
  <span class="dv-a">${bi}</span><span class="dv-b">${chia}</span><span class="dv-q">${thuong}</span></div>`;

/* cân thăng bằng: rô-bốt ở đĩa trái, k khối ru-bích ở đĩa phải */
ART.b37Bal = k => {
  const cols = k <= 4 ? k : Math.ceil(k / 2);
  const rows = Math.ceil(k / cols);
  const S = 19, x0 = 232 - (cols * S) / 2, yBase = 116 - rows * S;
  let cubes = '';
  let left = k;
  for (let r = 0; r < rows; r++){
    const n = Math.min(cols, left);
    left -= n;
    for (let c = 0; c < n; c++){
      const x = x0 + c * S, y = yBase + r * S;
      cubes += `<rect x="${x}" y="${y}" width="${S - 1}" height="${S - 1}" rx="2"
        fill="#e2483c" stroke="#2b2b2b" stroke-width="1.4"/>
        <path d="M${x + (S - 1) / 3} ${y}v${S - 1}M${x + (S - 1) * 2 / 3} ${y}v${S - 1}
          M${x} ${y + (S - 1) / 3}h${S - 1}M${x} ${y + (S - 1) * 2 / 3}h${S - 1}"
          stroke="#2b2b2b" stroke-width=".8" opacity=".8"/>`;
    }
  }
  return `<svg viewBox="0 0 300 178" class="b37-bal">
    <rect x="52" y="60" width="40" height="40" rx="7" fill="#e2483c" stroke="#a3281e" stroke-width="2"/>
    <circle cx="64" cy="76" r="6.5" fill="#fff" stroke="#2b2b2b" stroke-width="1.6"/>
    <circle cx="80" cy="76" r="6.5" fill="#fff" stroke="#2b2b2b" stroke-width="1.6"/>
    <circle cx="65" cy="77" r="3" fill="#2b4a8a"/><circle cx="81" cy="77" r="3" fill="#2b4a8a"/>
    <path d="M60 60v-9M84 60v-9" stroke="#2b2b2b" stroke-width="2"/>
    <circle cx="60" cy="49" r="3" fill="#2b2b2b"/><circle cx="84" cy="49" r="3" fill="#2b2b2b"/>
    <rect x="60" y="102" width="24" height="16" rx="3" fill="#e2483c" stroke="#a3281e" stroke-width="2"/>
    <path d="M60 106q-12 4-10 12M84 106q12 4 10 12" fill="none" stroke="#2b2b2b" stroke-width="2.6"/>
    ${cubes}
    <path d="M142 150h18v18h-18z" fill="#a9d8ee" stroke="#5f9ec4" stroke-width="2"/>
    <path d="M118 168h66v8h-66z" fill="#7fc2e0" stroke="#4b86ab" stroke-width="2"/>
    <path d="M72 140H232" stroke="#5f9ec4" stroke-width="4" stroke-linecap="round"/>
    <path d="M72 122v18M232 122v18" stroke="#5f9ec4" stroke-width="2"/>
    <ellipse cx="72" cy="122" rx="46" ry="8" fill="#cfe8f5" stroke="#5f9ec4" stroke-width="2"/>
    <ellipse cx="232" cy="122" rx="46" ry="8" fill="#cfe8f5" stroke="#5f9ec4" stroke-width="2"/>
    <circle cx="151" cy="140" r="9" fill="#f2c94c" stroke="#b8892a" stroke-width="2"/>
  </svg>`;
};

/* tấm bảng tung quân cờ: n quân rơi vào vòng vàng, 3 - n quân rơi ra ngoài */
ART.b37Board = n => {
  const IN = [[36, 60], [86, 58], [82, 98]];
  const OUT = [[24, 20], [96, 18], [22, 44]];
  let d = '';
  for (let i = 0; i < n; i++) d += `<circle cx="${IN[i][0]}" cy="${IN[i][1]}" r="6.5" fill="#212529"/>`;
  for (let i = 0; i < 3 - n; i++) d += `<circle cx="${OUT[i][0]}" cy="${OUT[i][1]}" r="6.5" fill="#212529"/>`;
  return `<svg viewBox="0 0 120 132" class="b37-board">
    <rect x="4" y="4" width="112" height="124" rx="9" fill="#fff" stroke="#5cb85c" stroke-width="2.6"/>
    <circle cx="60" cy="76" r="40" fill="#ffe066" stroke="#c92a2a" stroke-width="2.4"/>
    <circle cx="60" cy="76" r="14" fill="#e03131" stroke="#a01c1c" stroke-width="2"/>${d}
  </svg>`;
};

ART.b37Camel = `<svg viewBox="0 0 240 130" class="b37-camel">
  <rect x="0" y="86" width="240" height="44" fill="#8fc96b"/>
  <rect x="0" y="0" width="240" height="86" fill="#bfe3f5"/>
  <ellipse cx="112" cy="74" rx="42" ry="19" fill="#b98a5a" stroke="#7a5227" stroke-width="2.4"/>
  <path d="M92 56q10-18 20 0zM126 54q11-19 22 1z" fill="#b98a5a" stroke="#7a5227" stroke-width="2.4"/>
  <path d="M72 70q-16-6-18-26" fill="none" stroke="#7a5227" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="50" cy="38" rx="12" ry="9" fill="#c9975f" stroke="#7a5227" stroke-width="2.2"/>
  <circle cx="44" cy="35" r="2" fill="#222"/>
  <path d="M88 90v22M106 90v22M124 90v22M142 90v20" stroke="#7a5227" stroke-width="6" stroke-linecap="round"/>
  <path d="M154 66q10 6 6 18" fill="none" stroke="#7a5227" stroke-width="2.6"/>
  <ellipse cx="196" cy="66" rx="24" ry="11" fill="#c9975f" stroke="#7a5227" stroke-width="2"/>
  <path d="M188 56q6-11 12 0z" fill="#c9975f" stroke="#7a5227" stroke-width="2"/>
  <path d="M176 62q-9-4-10-15" fill="none" stroke="#7a5227" stroke-width="6" stroke-linecap="round"/>
  <circle cx="164" cy="45" r="7" fill="#d3a878" stroke="#7a5227" stroke-width="2"/>
  <path d="M182 76v14M196 76v14M208 76v14" stroke="#7a5227" stroke-width="4" stroke-linecap="round"/>
</svg>`;

BANKS.b37 = [

/* ===== tr.100–101 – Hoạt động Bài 1: Tính (đặt tính chia đã cho sẵn) ===== */
() => {
  const q = Q(1, 'Tính.');
  /* a) phép chia hết, thương là số tròn chục */
  const mkA = () => {
    const a = R(2, 9), th = a * 10;
    const d = R(Math.max(2, Math.ceil(100 / th)), Math.min(9, Math.floor(999 / th)));
    return {bi: d * th, chia: d, thuong: th, du: 0};
  };
  /* b) phép chia có dư */
  const mkB = () => {
    const d = R(3, 9);
    const th = R(Math.ceil(100 / d), Math.floor((999 - d) / d));
    const du = R(1, d - 1);
    return {bi: d * th + du, chia: d, thuong: th, du};
  };
  const take = (fn, n) => {
    const out = [];
    for (let g = 0; g < 60 && out.length < n; g++){
      const it = fn();
      if (!out.some(x => x.bi === it.bi && x.chia === it.chia)) out.push(it);
    }
    while (out.length < n) out.push(fn());
    return out;
  };
  const A = take(mkA, 3), Bt = take(mkB, 3);

  const cellA = it => `<div class="dv-item">${ART.b37Div(it.bi, it.chia, q.num(it.thuong), 'dv-am')}</div>`;
  const cellB = it => `<div class="dv-item">${ART.b37Div(it.bi, it.chia, q.num(it.thuong), 'dv-gr')}
      <div class="dv-du">(dư ${q.num(it.du, 1)})</div></div>`;

  return q.done(`<div class="sub-lbl">a)</div><div class="dv-row">${A.map(cellA).join('')}</div>
      <div class="sub-lbl">b)</div><div class="dv-row">${Bt.map(cellB).join('')}</div>`,
    A.map(it => `${it.bi} : ${it.chia} = ${it.thuong}`).join(';  ') + ';  '
      + Bt.map(it => `${it.bi} : ${it.chia} = ${it.thuong} (dư ${it.du})`).join(';  '));
},

/* ===== tr.101 – Hoạt động Bài 2: Bài toán xếp bánh vào hộp ===== */
() => {
  const q = Q(2, '');
  const moi = R(3, 8);
  const hop = R(Math.ceil(100 / moi), Math.floor(999 / moi));
  const tong = moi * hop;
  return q.done(`<p class="wordq">Cửa hàng nướng được ${tong} cái bánh. Người ta muốn xếp toàn bộ số bánh đó
      vào hộp, mỗi hộp đựng ${moi} cái bánh. Hỏi cửa hàng xếp được bao nhiêu hộp bánh như vậy?</p>
    <div class="fill-line">Cửa hàng xếp được ${q.num(hop)} hộp bánh.</div>`,
    `${tong} : ${moi} = ${hop} (hộp)`);
},

/* ===== tr.101 – Hoạt động Bài 3: Đ, S ? (kiểm tra kết quả phép chia) ===== */
() => {
  const q = Q(3, '<span class="tag">Đ, S</span> ?');
  const mk = () => {
    if (Math.random() < .5){                       // thương tròn chục, lỗi hay gặp: quên chữ số 0
      const a = R(2, 9), th = a * 10;
      const d = R(Math.max(3, Math.ceil(100 / th)), Math.min(9, Math.floor(990 / th)));
      const du = R(0, d - 1);
      return {bi: d * th + du, chia: d, thuong: th, sai: a, du};
    }
    const b = R(1, 9), th = 100 + b, d = R(3, 9);  // thương dạng 10b, lỗi hay gặp: bỏ chữ số 0 ở giữa
    const du = R(0, d - 1);
    return {bi: d * th + du, chia: d, thuong: th, sai: 10 + b, du};
  };
  const items = [];
  for (let g = 0; g < 60 && items.length < 3; g++){
    const it = mk();
    if (!items.some(x => x.bi === it.bi)) items.push(it);
  }
  while (items.length < 3) items.push(mk());

  const KQ = pick([['Đ','S','S'], ['S','Đ','S'], ['S','S','Đ'], ['Đ','Đ','S'], ['Đ','S','Đ'], ['S','Đ','Đ']]);
  const L = ['a)', 'b)', 'c)'];
  const html = '<div class="dv-row">' + items.map((it, i) => {
    const hien = KQ[i] === 'Đ' ? it.thuong : it.sai;
    const duTxt = it.du ? ` (dư ${it.du})` : '';
    return `<div class="dv-item"><div class="sub-lbl">${L[i]}</div>
      ${ART.b37Div(it.bi, it.chia, hien, 'dv-bl')}
      <div class="dv-du">Vậy ${it.bi} : ${it.chia} = ${hien}${duTxt}.</div>
      <div class="dv-du">${q.pick(KQ[i], ['Đ', 'S'])}</div></div>`;
  }).join('') + '</div>';

  return q.done(html,
    items.map(it => `${it.bi} : ${it.chia} = ${it.thuong}${it.du ? ' (dư ' + it.du + ')' : ''}`).join(';  '));
},

/* ===== tr.101 – Luyện tập Bài 1: Đặt tính rồi tính (theo mẫu) ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính (theo mẫu).');
  const sd = R(2, 6);
  const sth = R(Math.ceil(100 / sd), Math.floor(999 / sd));
  const sbi = sd * sth;

  const mkHet = () => {
    const d = R(2, 9);
    const th = R(Math.ceil(100 / d), Math.floor(999 / d));
    return {bi: d * th, chia: d, thuong: th, du: 0};
  };
  const mkDu = () => {
    const d = R(3, 9);
    const th = R(Math.ceil(100 / d), Math.floor((999 - d) / d));
    const du = R(1, d - 1);
    return {bi: d * th + du, chia: d, thuong: th, du};
  };
  const items = [mkHet(), mkHet(), mkDu(), mkDu()].sort(() => Math.random() - .5);
  const L = ['a)', 'b)', 'c)', 'd)'];

  const html = noteBox(`<div>Mẫu:  ${sbi} : ${sd} = ?</div>${ART.b37Div(sbi, sd, sth, 'dv-am')}
      <div>${sbi} : ${sd} = ${sth}</div>`)
    + '<div class="dv-row">' + items.map((it, i) =>
      `<div class="dv-item"><div class="sub-lbl">${L[i]}</div>
        ${ART.b37Div(it.bi, it.chia, q.num(it.thuong), 'dv-gr')}
        <div class="dv-du">(dư ${q.num(it.du, 1)})</div></div>`).join('') + '</div>'
    + '<div class="hint-line">Phép chia hết thì viết số dư là 0.</div>';

  return q.done(html,
    items.map(it => `${it.bi} : ${it.chia} = ${it.thuong}${it.du ? ' (dư ' + it.du + ')' : ''}`).join(';  '));
},

/* ===== tr.102 – Luyện tập Bài 2: Tính nhẩm (theo mẫu) ===== */
() => {
  const q = Q(2, 'Tính nhẩm (theo mẫu).');
  const DIVS = {2:[2], 3:[3], 4:[2,4], 5:[5], 6:[2,3,6], 7:[7], 8:[2,4,8], 9:[3,9]};
  const pool = [];
  Object.keys(DIVS).forEach(b => DIVS[b].forEach(d => pool.push([+b, d])));
  const chon = pool.sort(() => Math.random() - .5).slice(0, 4);
  const m = chon[0], items = chon.slice(1);
  return q.done(noteBox(`Mẫu: ${m[0] * 100} : ${m[1]} = ?<br>
      &nbsp;&nbsp;&nbsp;&nbsp;Nhẩm: ${m[0]} trăm : ${m[1]} = ${m[0] / m[1]} trăm<br>
      &nbsp;&nbsp;&nbsp;&nbsp;${m[0] * 100} : ${m[1]} = ${m[0] / m[1] * 100}`)
    + '<div class="eq-list">' + items.map(it =>
      `<div class="eq">${it[0] * 100} : ${it[1]} = ${q.num(it[0] / it[1] * 100)}</div>`).join('') + '</div>',
    items.map(it => `${it[0]} trăm : ${it[1]} = ${it[0] / it[1]} trăm`).join(';  '));
},

/* ===== tr.102 – Luyện tập Bài 3: Số ? (rô-bốt và các khối ru-bích) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const p = pick([[400, 4], [600, 4], [600, 6], [800, 4], [900, 6], [800, 8], [600, 8], [750, 6], [900, 4]]);
  const W = p[0], k = p[1];
  return q.done(`<p class="wordq">Biết con rô-bốt cân nặng ${W} g và các khối ru-bích giống nhau.
      Vậy mỗi khối ru-bích cân nặng ${q.num(W / k)} g.</p>${ART.b37Bal(k)}`,
    `${W} : ${k} = ${W / k} (g)`);
},

/* ===== tr.102 – Luyện tập Bài 4: Chọn câu trả lời đúng (tung quân cờ) ===== */
() => {
  const q = Q(4, 'Chọn câu trả lời đúng.');
  const donvi = pick([105, 115, 120, 125, 135, 145, 150]);
  const diemMai = donvi * 3;
  const k = R(1, 2);
  const dap = donvi * k;
  const L = ['A', 'B', 'C'];
  const vals = [dap - 10, dap, dap + 10].sort(() => Math.random() - .5);
  const ok = L[vals.indexOf(dap)];
  return q.done(`<p class="wordq">Rô-bốt, Mai và Việt lần lượt tung 3 quân cờ của mình vào một tấm bảng.
      Kết quả tung và số điểm của mỗi bạn nhận được như sau:</p>
    <div class="b37-brow">
      <div class="b37-bcell">${ART.b37Board(0)}<b>Rô-bốt: 0 điểm</b></div>
      <div class="b37-bcell">${ART.b37Board(3)}<b>Mai: ${diemMai} điểm</b></div>
      <div class="b37-bcell">${ART.b37Board(k)}<b>Việt: ... điểm?</b></div>
    </div>
    <div class="fill-line">Số điểm Việt nhận được là:</div>
    <div class="opt-row">${vals.map((v, i) => `<span><i>${L[i]}.</i>${v} điểm</span>`).join('')}</div>
    ${q.pick(ok, L)}`,
    `Mỗi quân vào vòng vàng được ${diemMai} : 3 = ${donvi} (điểm); Việt có ${k} quân nên được ${dap} điểm`);
},

/* ===== tr.102 – Luyện tập Bài 5: Bài toán đàn lạc đà ===== */
() => {
  const q = Q(5, '');
  const mot = R(11, 40);
  const hai = R(50, Math.floor((980 - mot) / 2));
  const tong = mot + 2 * hai;
  return q.done(`<p class="wordq">Một trang trại có ${mot} con lạc đà có 1 bướu, còn lại là lạc đà có 2 bướu.
      Biết rằng chúng có tất cả ${tong} cái bướu. Hỏi trang trại đó có bao nhiêu con lạc đà có 2 bướu?</p>
    ${ART.b37Camel}
    <div class="fill-line">Trang trại đó có ${q.num(hai)} con lạc đà có 2 bướu.</div>`,
    `Số bướu của lạc đà 2 bướu: ${tong} − ${mot} = ${tong - mot}; ${tong - mot} : 2 = ${hai} (con)`);
},
];
