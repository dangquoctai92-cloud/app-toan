/* ==================== BÀI 45: CÁC SỐ CÓ BỐN CHỮ SỐ. SỐ 10 000
   (SGK tập 2, tr.4, 5, 6, 7, 8)
   hoạt động tr.5 : bài 1 (chọn số thích hợp với cách đọc), bài 2 (tia số),
                    bài 3 (bảng hàng nghìn – trăm – chục – đơn vị), bài 4 (biển số tròn nghìn)
   hoạt động tr.7 : bài 1 (viết số rồi đọc số), bài 2 (số liền trước – số liền sau),
                    bài 3 (chọn câu trả lời đúng – chữ số ở mỗi hàng), bài 4 (nhà của Nam, Việt, Mai)
   luyện tập tr.8 : bài 1 (viết số rồi đọc số), bài 2 (dãy số), bài 3 (viết thành tổng),
                    bài 4 (hai cuốn sách bị mất tờ), bài 5 (lập số từ bốn tấm thẻ)
=================================================================================== */

ART.spNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
ART.b45Cap = s => s.charAt(0).toUpperCase() + s.slice(1);
ART.b45DV = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

/* đọc số có bốn chữ số (và số 10 000) */
ART.b45Read = n => {
  const D = ART.b45DV;
  if (n === 10000) return 'mười nghìn';
  const ng = Math.floor(n / 1000), tr = Math.floor(n / 100) % 10;
  const ch = Math.floor(n / 10) % 10, dv = n % 10;
  let s = D[ng] + ' nghìn';
  if (tr === 0 && ch === 0 && dv === 0) return s;
  s += tr === 0 ? ' không trăm' : ' ' + D[tr] + ' trăm';
  if (ch === 0) return dv === 0 ? s : s + ' linh ' + D[dv];
  s += ch === 1 ? ' mười' : ' ' + D[ch] + ' mươi';
  if (dv === 0) return s;
  if (dv === 1) return s + (ch === 1 ? ' một' : ' mốt');
  if (dv === 4) return s + (ch === 1 ? ' bốn' : ' tư');
  if (dv === 5) return s + ' lăm';
  return s + ' ' + D[dv];
};

/* hai cách đọc "gần giống" để làm phương án nhiễu, luôn khác cách đọc đúng */
ART.b45Alt = n => {
  const right = ART.b45Read(n), out = [];
  const push = v => {
    if (v < 1000 || v > 9999 || v === n) return;
    const r = ART.b45Read(v);
    if (r !== right && !out.includes(r)) out.push(r);
  };
  const ng = Math.floor(n / 1000), tr = Math.floor(n / 100) % 10;
  const ch = Math.floor(n / 10) % 10, dv = n % 10;
  push(ng * 1000 + ch * 100 + tr * 10 + dv);
  push(ng * 1000 + tr * 100 + dv * 10 + ch);
  push(ng * 1000 + tr * 100 + ch * 10 + (dv + 1) % 10);
  push(ng * 1000 + ((tr + 1) % 10) * 100 + ch * 10 + dv);
  push(ng * 1000 + tr * 100 + ((ch + 1) % 10) * 10 + dv);
  for (let g = 0; g < 60 && out.length < 2; g++) push(R(1000, 9999));
  return out;
};

/* ba phương án đọc số, chỉ một phương án đúng */
ART.b45ReadOpts = n => {
  const right = ART.b45Read(n), alt = ART.b45Alt(n);
  return {right, opts: [right, alt[0], alt[1]].sort(() => Math.random() - .5)};
};

/* tia số kiểu SGK, mỗi phần tử là chuỗi HTML đã dựng sẵn */
ART.b45Line = items => `<div class="b45-nwrap"><div class="b45-nline">${
  items.map(x => `<span class="b45-nk"><i></i><b>${x}</b></span>`).join('')}</div></div>`;

ART.b45Squirrel = c => `<svg viewBox="0 0 92 86" class="b45-sq">
  <path d="M64 76q22-11 20-35-2-24-20-30 14 16 8 30-5 13-14 17z" fill="${c}" stroke="#8a5a2b" stroke-width="2.2"/>
  <ellipse cx="40" cy="58" rx="20" ry="22" fill="${c}" stroke="#8a5a2b" stroke-width="2.2"/>
  <circle cx="34" cy="28" r="16" fill="${c}" stroke="#8a5a2b" stroke-width="2.2"/>
  <path d="M22 16q-6-11 2-12 6-1 8 9z" fill="${c}" stroke="#8a5a2b" stroke-width="2"/>
  <path d="M44 14q4-10 10-7 6 4 0 13z" fill="${c}" stroke="#8a5a2b" stroke-width="2"/>
  <circle cx="28" cy="26" r="2.6" fill="#2b2b2b"/><circle cx="40" cy="26" r="2.6" fill="#2b2b2b"/>
  <path d="M30 35q4 4 8 0" fill="none" stroke="#8a5a2b" stroke-width="2" stroke-linecap="round"/>
  <path d="M30 78l-6 6M50 78l6 6" stroke="#8a5a2b" stroke-width="2.6" stroke-linecap="round"/>
</svg>`;

ART.b45Hollow = (c, txt) => `<svg viewBox="0 0 112 130" class="b45-hollow">
  <path d="M24 20h64v106H24z" fill="${c}" stroke="#5c4326" stroke-width="2.6"/>
  <path d="M24 20q16-9 64 0" fill="none" stroke="#5c4326" stroke-width="2.6"/>
  <ellipse cx="56" cy="84" rx="23" ry="29" fill="#3e3126"/>
  <path d="M16 62q-9 15 8 24M96 68q9 15-8 24" fill="none" stroke="#4f7a34" stroke-width="4.4" stroke-linecap="round"/>
  <rect x="18" y="26" width="76" height="26" rx="4" fill="#fdf0c4" stroke="#b08a3a" stroke-width="2"/>
  <text x="56" y="45" text-anchor="middle" font-size="18" font-weight="800" fill="#3a2f12">${txt}</text>
</svg>`;

ART.b45House = (kind, txt) => {
  const BODY = {cay: '#f7c3d8', tron: '#f6dc9c', thuong: '#bfe0f2'};
  const ROOF = {cay: '#3f6fb5', tron: '#e0603c', thuong: '#e0603c'};
  const win = kind === 'tron'
    ? `<circle cx="46" cy="72" r="11" fill="#8fd0f0" stroke="#2f6f96" stroke-width="2.4"/>
       <circle cx="82" cy="72" r="11" fill="#8fd0f0" stroke="#2f6f96" stroke-width="2.4"/>
       <path d="M46 61v22M35 72h22M82 61v22M71 72h22" stroke="#2f6f96" stroke-width="1.8"/>`
    : `<rect x="36" y="62" width="21" height="21" fill="#8fd0f0" stroke="#2f6f96" stroke-width="2.4"/>
       <rect x="72" y="62" width="21" height="21" fill="#8fd0f0" stroke="#2f6f96" stroke-width="2.4"/>
       <path d="M46.5 62v21M36 72.5h21M82.5 62v21M72 72.5h21" stroke="#2f6f96" stroke-width="1.6"/>`;
  const tree = kind === 'cay'
    ? `<path d="M18 128v-22" stroke="#8a5a2b" stroke-width="5"/>
       <circle cx="18" cy="96" r="15" fill="#5fae4a" stroke="#3d7a2c" stroke-width="2"/>`
    : '';
  return `<svg viewBox="0 0 140 132" class="b45-house">
    <path d="M28 52h84v76H28z" fill="${BODY[kind]}" stroke="#8a6a5a" stroke-width="2.6"/>
    <path d="M18 54L70 14l52 40z" fill="${ROOF[kind]}" stroke="#7a3a24" stroke-width="2.6" stroke-linejoin="round"/>
    ${win}
    <rect x="56" y="96" width="28" height="32" rx="3" fill="#e6a06a" stroke="#8a5a2b" stroke-width="2.4"/>
    <circle cx="78" cy="112" r="2.4" fill="#5c3a18"/>
    <rect x="30" y="76" width="80" height="22" rx="5" fill="#fff" opacity=".92"/>
    <text x="70" y="93" text-anchor="middle" font-size="17" font-weight="800" fill="#2b2b2b">${txt}</text>
    ${tree}
  </svg>`;
};

ART.b45Book = (l, r) => `<svg viewBox="0 0 244 152" class="b45-book">
  <path d="M10 14h106v124H10z" fill="#e2c47c" stroke="#8a6a2b" stroke-width="2.6"/>
  <path d="M128 14h106v124H128z" fill="#e2c47c" stroke="#8a6a2b" stroke-width="2.6"/>
  <path d="M116 14h12v124h-12z" fill="#c9a95c" stroke="#8a6a2b" stroke-width="2.2"/>
  <path d="M10 14q10 6 0 12M10 34q10 6 0 12M10 54q10 6 0 12M10 74q10 6 0 12M10 94q10 6 0 12M10 114q10 6 0 12"
    fill="none" stroke="#b8934c" stroke-width="1.6"/>
  <path d="M234 14q-10 6 0 12M234 34q-10 6 0 12M234 54q-10 6 0 12M234 74q-10 6 0 12M234 94q-10 6 0 12M234 114q-10 6 0 12"
    fill="none" stroke="#b8934c" stroke-width="1.6"/>
  <g fill="none" stroke="#9a7a3a" stroke-width="2">
    <circle cx="60" cy="62" r="18"/><path d="M60 44v36M42 62h36"/>
    <path d="M150 78h60l-12-26h-36z"/><path d="M158 52l10-12h26l8 12"/>
  </g>
  <text x="26" y="130" font-size="17" font-weight="800" fill="#3a2a10">${l}</text>
  <text x="218" y="130" text-anchor="end" font-size="17" font-weight="800" fill="#3a2a10">${r}</text>
</svg>`;

BANKS.b45 = [

/* ===== tr.5 – Hoạt động Bài 1: Chọn số thích hợp với cách đọc ===== */
() => {
  const q = Q(1, 'Chọn số thích hợp với cách đọc.');
  const nz = () => R(1, 9);
  const nums = [
    nz() * 1000 + nz() * 100 + nz() * 10 + nz(),   // đủ bốn chữ số khác 0
    nz() * 1000 + nz() * 10 + nz(),                // không trăm
    nz() * 1000 + nz(),                            // không trăm linh ...
    nz() * 1000 + nz() * 100 + nz() * 10           // tận cùng bằng 0
  ];
  for (let i = 1; i < 4; i++){
    for (let g = 0; g < 40 && nums.slice(0, i).includes(nums[i]); g++) nums[i] += 1;
  }
  const LS = ['A', 'B', 'C', 'D'], LH = ['E', 'G', 'H', 'K'];
  const ordS = [0, 1, 2, 3].sort(() => Math.random() - .5);   // sóc thứ j đọc số nums[ordS[j]]
  const ordH = [0, 1, 2, 3].sort(() => Math.random() - .5);   // hốc thứ k ghi số nums[ordH[k]]
  const FUR = ['#d99a55', '#c98a45', '#e0a866', '#c07a3a'];
  const BARK = ['#7a6a4a', '#8a7a52', '#6f6a58', '#84745a'];

  const rowS = '<div class="b45-row">' + ordS.map((idx, j) =>
    `<div class="b45-cell"><div class="b45-bub">${ART.b45Cap(ART.b45Read(nums[idx]))}.</div>
      ${ART.b45Squirrel(FUR[j])}<em>${LS[j]}</em></div>`).join('') + '</div>';
  const rowH = '<div class="b45-row">' + ordH.map((idx, k) =>
    `<div class="b45-cell">${ART.b45Hollow(BARK[k], ART.spNum(nums[idx]))}<em>${LH[k]}</em></div>`).join('') + '</div>';

  const lines = ordS.map((idx, j) =>
    `<div class="fill-line">Bạn sóc ${LS[j]} chọn số ở hốc cây ${q.pick(LH[ordH.indexOf(idx)], LH)}</div>`).join('');
  return q.done(rowS + rowH + lines,
    ordS.map((idx, j) => `${LS[j]}: ${ART.spNum(nums[idx])} (hốc ${LH[ordH.indexOf(idx)]})`).join(';  '));
},

/* ===== tr.5 – Hoạt động Bài 2: Số ? (hai tia số) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const s1 = R(1, 8) * 1000 + R(100, 940);              // dãy 9 số không vượt hàng nghìn
  const hide1 = [3, 4, 5, 7, 8];
  const k = R(2, 9), s2 = k * 1000 - 2;                 // dãy 9 số vượt qua mốc nghìn
  const hide2 = [2, 4, 5, 7];
  const mk = (st, hide) => ART.b45Line(Array.from({length: 9}, (_, i) => {
    const v = st + i;
    return hide.includes(i) ? q.num(v, 4) : ART.spNum(v);
  }));
  return q.done(`<div class="sub-lbl">a)</div>${mk(s1, hide1)}
    <div class="sub-lbl">b)</div>${mk(s2, hide2)}`,
    `Trên tia số, mỗi vạch tiếp theo hơn vạch trước 1 đơn vị: từ ${ART.spNum(s1)} đến ${ART.spNum(s1 + 8)}
     và từ ${ART.spNum(s2)} đến ${ART.spNum(s2 + 8)}.`);
},

/* ===== tr.5 – Hoạt động Bài 3: Số ? (bảng cấu tạo số có bốn chữ số) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const n1 = R(1, 9) * 1000 + R(1, 9) * 100 + R(1, 9) * 10 + R(1, 9);
  let n2 = R(1, 9) * 1000 + R(1, 9) * 100 + R(1, 9) * 10;
  for (let g = 0; g < 30 && n2 === n1; g++) n2 += 10;
  let n3 = R(1, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
  for (let g = 0; g < 30 && (n3 === n1 || n3 === n2); g++) n3 += 1;
  const dg = n => [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
  const d1 = dg(n1), d2 = dg(n2), d3 = dg(n3);
  const rd = n => `<span class="b45-rd">${ART.b45Cap(ART.b45Read(n))}</span>`;
  const html = `<div class="tbl-wrap"><table class="tbl amber">
    <tr><th>Hàng nghìn</th><th>Hàng trăm</th><th>Hàng chục</th><th>Hàng đơn vị</th><th>Viết số</th><th>Đọc số</th></tr>
    <tr><td>${d1[0]}</td><td>${d1[1]}</td><td>${d1[2]}</td><td>${d1[3]}</td>
      <td>${q.num(n1, 4)}</td><td>${rd(n1)}</td></tr>
    <tr><td>${d2[0]}</td><td>${q.num(d2[1], 1)}</td><td>${q.num(d2[2], 1)}</td><td>${d2[3]}</td>
      <td>${q.num(n2, 4)}</td><td>${rd(n2)}</td></tr>
    <tr><td>${q.num(d3[0], 1)}</td><td>${q.num(d3[1], 1)}</td><td>${q.num(d3[2], 1)}</td><td>${q.num(d3[3], 1)}</td>
      <td>${ART.spNum(n3)}</td><td>${rd(n3)}</td></tr>
  </table></div>`;
  return q.done(html,
    `${ART.spNum(n1)};  ${ART.spNum(n2)};  ${ART.spNum(n3)}.`);
},

/* ===== tr.6 – Hoạt động Bài 4: các số tròn nghìn trên đường đến toà lâu đài ===== */
() => {
  const q = Q(4, 'Rô-bốt viết các số tròn nghìn lên mỗi tấm biển trên đường đến toà lâu đài (như hình vẽ). '
    + 'Hỏi mỗi tấm biển có dấu "?" viết số nào?');
  const extra = [2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - .5).slice(0, 2);
  const show = [0, 1].concat(extra);           // cho sẵn 4 tấm biển, 5 tấm còn lại là dấu "?"
  const signs = Array.from({length: 9}, (_, i) => {
    const v = (i + 1) * 1000;
    return `<div class="b45-sign"><div class="b45-plate">${
      show.includes(i) ? ART.spNum(v) : q.num(v, 4)}</div><div class="b45-post"></div></div>`;
  }).join('');
  return q.done(`<div class="b45-signs">${signs}</div>
    <div class="hint-line">Các số tròn nghìn xếp theo thứ tự từ bé đến lớn.</div>`,
    'Thứ tự các số tròn nghìn: 1 000, 2 000, 3 000, 4 000, 5 000, 6 000, 7 000, 8 000, 9 000.');
},

/* ===== tr.7 – Hoạt động Bài 1: Viết số rồi đọc số ===== */
() => {
  const q = Q(1, 'Viết số rồi đọc số, biết số đó gồm:');
  const L = ['a)', 'b)', 'c)', 'd)'];
  const items = [
    {ng: R(1, 9), tr: R(1, 9), ch: R(1, 9), dv: R(1, 9)},
    {ng: R(1, 9), tr: 0, ch: R(1, 9), dv: R(1, 9)},
    {ng: R(1, 9), tr: R(1, 9), ch: 0, dv: R(1, 9)},
    {ng: R(1, 9), tr: 0, ch: R(1, 9), dv: 0}
  ].map(x => Object.assign(x, {n: x.ng * 1000 + x.tr * 100 + x.ch * 10 + x.dv}));
  const mau = R(1, 9) * 1000 + R(1, 9) * 100 + R(1, 9) * 10 + R(1, 9);
  const mg = Math.floor(mau / 1000), mt = Math.floor(mau / 100) % 10;
  const mc = Math.floor(mau / 10) % 10, md = mau % 10;

  const rows = items.map((x, i) => {
    const o = ART.b45ReadOpts(x.n);
    return `<div class="fill-line"><b>${L[i]}</b> ${x.ng} nghìn, ${x.tr} trăm, ${x.ch} chục và ${x.dv} đơn vị.</div>
      <div class="fill-line">Viết số: ${q.num(x.n, 4)} &nbsp; Đọc số: ${q.pick(o.right, o.opts)}</div>`;
  }).join('');
  return q.done(noteBox(`Mẫu: ${mg} nghìn, ${mt} trăm, ${mc} chục và ${md} đơn vị.<br>
      Viết số: ${ART.spNum(mau)}. Đọc số: ${ART.b45Cap(ART.b45Read(mau))}.`) + rows,
    items.map((x, i) => `${L[i]} ${ART.spNum(x.n)} – ${ART.b45Read(x.n)}`).join(';  '));
},

/* ===== tr.7 – Hoạt động Bài 2: số liền trước, số liền sau ===== */
() => {
  const q = Q(2, '');
  const b = R(2, 9) * 1000 - 1;                 // ví dụ 8 999
  const c = R(2, 9) * 1000;                     // ví dụ 9 000
  const d = R(1, 8) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 8);
  return q.done(`<div class="fill-line"><b>a)</b> Số liền trước của số 10 000 là số ${q.num(9999, 4)}.</div>
    <div class="fill-line"><b>b)</b> Số liền sau của số ${ART.spNum(b)} là số ${q.num(b + 1, 4)}.</div>
    <div class="fill-line"><b>c)</b> Số ${ART.spNum(c)} là số liền sau của số ${q.num(c - 1, 4)}.</div>
    <div class="fill-line"><b>d)</b> Số ${ART.spNum(d)} là số liền trước của số ${q.num(d + 1, 4)}.</div>`,
    `Số liền trước bớt đi 1 đơn vị, số liền sau thêm 1 đơn vị: 10 000 − 1 = 9 999; `
      + `${ART.spNum(b)} + 1 = ${ART.spNum(b + 1)}; ${ART.spNum(c)} − 1 = ${ART.spNum(c - 1)}; `
      + `${ART.spNum(d)} + 1 = ${ART.spNum(d + 1)}.`);
},

/* ===== tr.7 – Hoạt động Bài 3: Chọn câu trả lời đúng (chữ số ở mỗi hàng) ===== */
() => {
  const q = Q(3, 'Chọn câu trả lời đúng.');
  const d = R(1, 9);
  const rest = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(x => x !== d).sort(() => Math.random() - .5).slice(0, 3);
  const nums = [0, 1, 2, 3].map(p => {
    const o = rest.slice().sort(() => Math.random() - .5);
    let k = 0, s = '';
    for (let i = 0; i < 4; i++) s += (i === p ? d : o[k++]);
    return +s;
  });
  const L = ['A', 'B', 'C', 'D'];
  const ord = [0, 1, 2, 3].sort(() => Math.random() - .5);      // ô thứ j hiển thị nums[ord[j]]
  const letterOf = p => L[ord.indexOf(p)];
  const row = '<div class="b45-opt">' + ord.map((p, j) =>
    `<span><i>${L[j]}.</i>${ART.spNum(nums[p])}</span>`).join('') + '</div>';
  return q.done(`<div class="fill-line"><b>a)</b> Số nào dưới đây có chữ số hàng trăm là ${d}?</div>
      ${row}${q.pick(letterOf(1), L)}
    <div class="fill-line"><b>b)</b> Số nào dưới đây có chữ số hàng chục là ${d}?</div>
      ${row}${q.pick(letterOf(2), L)}
    <div class="fill-line"><b>c)</b> Số nào dưới đây có chữ số hàng nghìn là ${d}?</div>
      ${row}${q.pick(letterOf(0), L)}`,
    `Hàng trăm là ${d}: ${ART.spNum(nums[1])};  hàng chục là ${d}: ${ART.spNum(nums[2])};  `
      + `hàng nghìn là ${d}: ${ART.spNum(nums[0])}.`);
},

/* ===== tr.7 – Hoạt động Bài 4: nhà của Nam, Việt và Mai ===== */
() => {
  const q = Q(4, 'Dưới đây là nhà của Nam, Việt và Mai.');
  let a = R(1, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
  let b = R(1, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
  for (let g = 0; g < 40 && b === a; g++) b = R(1000, 9999);
  const KIND = {'Việt': 'cay', 'Mai': 'tron', 'Nam': 'thuong'};
  const owners = ['Nam', 'Việt', 'Mai'];
  const vals = [a, b, 10000].sort(() => Math.random() - .5);
  const num = {};
  owners.forEach((o, i) => { num[o] = vals[i]; });
  const shown = owners.slice().sort(() => Math.random() - .5);
  const rowH = '<div class="b45-row">' + shown.map(o =>
    `<div class="b45-cell">${ART.b45House(KIND[o], ART.spNum(num[o]))}</div>`).join('') + '</div>';
  const doc = owners.filter(o => num[o] !== 10000)[0] || 'Nam';
  const o3 = ART.b45ReadOpts(num[doc]);
  return q.done(rowH
    + `<div class="bullet">Nhà của Việt có trồng cây trước nhà.</div>
       <div class="bullet">Nhà của Mai có ô cửa sổ dạng hình tròn.</div>
       <div class="hint-line">Em hãy tìm xem số được ghi trên nhà của mỗi bạn là số nào rồi đọc số đó.</div>
       <div class="fill-line">Số ghi trên nhà bạn Nam là ${q.num(num['Nam'], 5)}.</div>
       <div class="fill-line">Số ghi trên nhà bạn Việt là ${q.num(num['Việt'], 5)}.</div>
       <div class="fill-line">Số ghi trên nhà bạn Mai là ${q.num(num['Mai'], 5)}.</div>
       <div class="fill-line">Số ghi trên nhà bạn ${doc} đọc là: ${q.pick(o3.right, o3.opts)}</div>`,
    `Nam: ${ART.spNum(num['Nam'])};  Việt: ${ART.spNum(num['Việt'])};  Mai: ${ART.spNum(num['Mai'])}.`);
},

/* ===== tr.8 – Luyện tập Bài 1: Viết số rồi đọc số ===== */
() => {
  const q = Q(1, 'Viết số rồi đọc số, biết số đó gồm:');
  const W = ART.b45DV;
  const L = ['a)', 'b)', 'c)'];
  const g1 = {ng: R(1, 9), tr: R(1, 9), ch: R(1, 9), dv: R(1, 9), kind: 0};
  const g2 = {ng: R(1, 9), tr: R(1, 9), ch: 0, dv: R(1, 9), kind: 1};
  const g3 = {ng: R(1, 9), tr: R(1, 9), ch: R(1, 9), dv: 0, kind: 2};
  const items = [g1, g2, g3].map(x => Object.assign(x, {n: x.ng * 1000 + x.tr * 100 + x.ch * 10 + x.dv}));
  const words = x => {
    const p = [ART.b45Cap(W[x.ng]) + ' nghìn', W[x.tr] + ' trăm'];
    if (x.kind !== 1) p.push(W[x.ch] + ' chục');
    if (x.kind !== 2) p.push(W[x.dv] + ' đơn vị');
    return p.join(', ') + '.';
  };
  const rows = items.map((x, i) => {
    const o = ART.b45ReadOpts(x.n);
    return `<div class="fill-line"><b>${L[i]}</b> ${words(x)}</div>
      <div class="fill-line">Viết số: ${q.num(x.n, 4)} &nbsp; Đọc số: ${q.pick(o.right, o.opts)}</div>`;
  }).join('');
  return q.done(rows,
    items.map((x, i) => `${L[i]} ${ART.spNum(x.n)} – ${ART.b45Read(x.n)}`).join(';  '));
},

/* ===== tr.8 – Luyện tập Bài 2: Số ? (dãy số) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const s1 = R(30, 85) * 100, s2 = R(300, 985) * 10;
  const showA = [0, 1, 2], showB = [0, 1, 3];
  const mk = (st, step, show, cls) => '<div class="b45-flow">' + Array.from({length: 5}, (_, i) => {
    const v = st + i * step;
    const node = `<span class="b45-fn ${cls}">${show.includes(i) ? ART.spNum(v) : q.num(v, 4)}</span>`;
    return i === 4 ? node : node + '<span class="b45-fa">&rarr;</span>';
  }).join('') + '</div>';
  return q.done(`<div class="sub-lbl">a)</div>${mk(s1, 100, showA, '')}
    <div class="sub-lbl">b)</div>${mk(s2, 10, showB, 'g')}`,
    `a) Mỗi số hơn số liền trước 100 đơn vị.  b) Mỗi số hơn số liền trước 10 đơn vị.`);
},

/* ===== tr.8 – Luyện tập Bài 3: Số ? (viết số thành tổng) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const A = {ng: R(1, 9), tr: R(1, 9), ch: R(1, 9), dv: R(1, 9)};
  const B = {ng: R(1, 9), tr: R(1, 9), ch: 0, dv: R(1, 9)};
  const C = {ng: R(1, 9), tr: 0, ch: 0, dv: R(1, 9)};
  const D = {ng: R(1, 9), tr: 0, ch: R(1, 9), dv: R(1, 9)};
  const val = x => x.ng * 1000 + x.tr * 100 + x.ch * 10 + x.dv;
  const sp = ART.spNum;
  return q.done(`<div class="two-col">
      <div><div class="b45-eq">a) ${sp(val(A))} = ${sp(A.ng * 1000)} + ${A.tr * 100} + ${A.ch * 10}
        + ${q.num(A.dv, 1)}</div>
        <div class="b45-eq">c) ${sp(val(C))} = ${sp(C.ng * 1000)} + ${q.num(C.dv, 1)}</div></div>
      <div><div class="b45-eq">b) ${sp(val(B))} = ${sp(B.ng * 1000)} + ${q.num(B.tr * 100, 3)}
        + ${B.dv}</div>
        <div class="b45-eq">d) ${sp(val(D))} = ${sp(D.ng * 1000)} + ${q.num(D.ch * 10, 2)}
        + ${q.num(D.dv, 1)}</div></div>
    </div>`,
    `Viết số thành tổng các nghìn, trăm, chục và đơn vị; hàng nào có chữ số 0 thì bỏ qua.`);
},

/* ===== tr.8 – Luyện tập Bài 4: hai cuốn sách cũ bị mất một tờ ===== */
() => {
  const q = Q(4, 'Việt có hai cuốn sách cũ, mỗi cuốn đã bị mất một tờ, các trang còn lại như hình vẽ. '
    + 'Hỏi mỗi cuốn sách đó bị mất những trang nào?');
  const p1 = R(600, 4990) * 2;                    // trang chẵn bên trái
  const k = R(2, 9), p2 = k * 1000 - 2;           // tờ bị mất vắt qua mốc nghìn
  const bk = (l) => `<div>${ART.b45Book(ART.spNum(l), ART.spNum(l + 3))}</div>`;
  return q.done(`<div class="b45-brow">${bk(p1)}${bk(p2)}</div>
    <div class="bullet">Cuốn sách thứ nhất bị mất tờ có trang ${q.num(p1 + 1, 4)}
      và trang ${q.num(p1 + 2, 4)}.</div>
    <div class="bullet">Cuốn sách thứ hai bị mất tờ có trang ${q.num(p2 + 1, 4)}
      và trang ${q.num(p2 + 2, 4)}.</div>`,
    `Giữa trang ${ART.spNum(p1)} và trang ${ART.spNum(p1 + 3)} là hai trang ${ART.spNum(p1 + 1)},
     ${ART.spNum(p1 + 2)};  giữa trang ${ART.spNum(p2)} và trang ${ART.spNum(p2 + 3)} là hai trang
     ${ART.spNum(p2 + 1)}, ${ART.spNum(p2 + 2)}.`);
},

/* ===== tr.8 – Luyện tập Bài 5: Chọn câu trả lời đúng (lập số từ bốn tấm thẻ) ===== */
() => {
  const q = Q(5, 'Chọn câu trả lời đúng.');
  const two = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 2);
  const cards = [0, 0, two[0], two[1]].sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D'];
  const vals = [4, 6, 12, 24].sort(() => Math.random() - .5);
  const ok = L[vals.indexOf(6)];
  return q.done(`<p class="wordq">Từ các thẻ số bên, lập được tất cả bao nhiêu số có bốn chữ số?</p>
    <div class="b45-cards">${cards.map(d => `<div class="b45-card">${d}</div>`).join('')}</div>
    <div class="b45-opt">${vals.map((v, i) => `<span><i>${L[i]}.</i>${v}</span>`).join('')}</div>
    ${q.pick(ok, L)}`,
    `Chữ số hàng nghìn chỉ có thể là ${two[0]} hoặc ${two[1]}; với mỗi cách chọn còn 3 cách xếp ba thẻ `
      + `còn lại nên lập được 2 × 3 = 6 số có bốn chữ số.`);
},
];
