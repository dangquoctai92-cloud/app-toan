/* ==================== BÀI 49: LUYỆN TẬP CHUNG (SGK tập 2, tr.17, 18, 19, 20) ====================
   luyện tập tr.17    : bài 1 (nối cách đọc với số – điện thoại vỏ hộp), bài 2 (hai tia số),
                        bài 3 (chọn câu trả lời đúng: chữ số hàng chục, làm tròn đến hàng chục)
   luyện tập tr.18–19 : bài 1 (bảng cấu tạo số và làm tròn đến hàng trăm),
                        bài 2 (chọn số lớn nhất, số bé nhất), bài 3 (bình bị vỡ ghi số La Mã nào),
                        bài 4 (ba con vật trong khu bảo tồn)
   luyện tập tr.19–20 : bài 1 (viết số thành tổng trên tia số), bài 2 (thẻ số cho phép so sánh đúng),
                        bài 3 (làm tròn số học sinh đến hàng trăm)
================================================================================================= */

ART.spNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
ART.b49Cap = s => s.charAt(0).toUpperCase() + s.slice(1);
ART.b49DV = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

ART.b49Read = n => {
  const D = ART.b49DV;
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

ART.b49Rom = n => {
  const V = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = '', r = n;
  for (let i = 0; i < V.length; i++) while (r >= V[i][0]){ s += V[i][1]; r -= V[i][0]; }
  return s;
};

ART.b49R10 = n => Math.floor(n / 10) * 10 + (n % 10 >= 5 ? 10 : 0);
ART.b49R100 = n => Math.floor(n / 100) * 100 + (Math.floor(n / 10) % 10 >= 5 ? 100 : 0);
ART.b49R1000 = n => Math.floor(n / 1000) * 1000 + (Math.floor(n / 100) % 10 >= 5 ? 1000 : 0);

ART.b49Line = items => `<div class="b49-nwrap"><div class="b49-nline">${
  items.map(x => `<span class="b49-nk"><i></i><b>${x}</b></span>`).join('')}</div></div>`;

ART.b49Cup = c => `<svg viewBox="0 0 44 52" class="b49-cup">
  <path d="M6 8h32l-5 38H11z" fill="${c}" stroke="#7a7a8a" stroke-width="2.2"/>
  <ellipse cx="22" cy="8" rx="16" ry="5" fill="#fff" stroke="#7a7a8a" stroke-width="2.2"/>
  <circle cx="14" cy="20" r="2.2" fill="#fff" opacity=".8"/>
  <circle cx="27" cy="28" r="2.6" fill="#fff" opacity=".8"/>
  <circle cx="19" cy="36" r="2" fill="#fff" opacity=".8"/>
</svg>`;

ART.b49Vase = (lab, vo) => vo
  ? `<svg viewBox="0 0 90 110" class="b49-vase">
      <path d="M30 62l-12 34h54l-14-30-10 12-8-10z" fill="#b07a4a" stroke="#7a4a20" stroke-width="2.4"
        stroke-linejoin="round"/>
      <path d="M46 24l6 18M62 30l-8 14M30 30l10 12" stroke="#e0a030" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 44l14 6M70 46l-14 6" stroke="#e0a030" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  : `<svg viewBox="0 0 90 110" class="b49-vase">
      <path d="M34 14h22v10q16 12 16 40 0 30-27 42-27-12-27-42 0-28 16-40z" fill="#c08a58"
        stroke="#7a4a20" stroke-width="2.4"/>
      <path d="M34 24q11-6 22 0" fill="none" stroke="#7a4a20" stroke-width="2.2"/>
      <rect x="24" y="46" width="42" height="24" rx="4" fill="#e6c79a" stroke="#7a4a20" stroke-width="2"/>
      <text x="45" y="64" text-anchor="middle" font-size="15" font-weight="800" fill="#4a2a10">${lab}</text>
    </svg>`;

ART.b49Animal = k => {
  if (k === 'voi') return `<svg viewBox="-4 -12 138 112" class="b49-an">
    <ellipse cx="66" cy="50" rx="38" ry="26" fill="#9aa3ad" stroke="#5f6870" stroke-width="2.4"/>
    <circle cx="30" cy="42" r="21" fill="#9aa3ad" stroke="#5f6870" stroke-width="2.4"/>
    <path d="M30 20q-18-6-20 12-2 16 14 16" fill="#8b949e" stroke="#5f6870" stroke-width="2.4"/>
    <path d="M16 52q-8 18 2 30 8 8 12-2" fill="none" stroke="#5f6870" stroke-width="5" stroke-linecap="round"/>
    <path d="M42 84V70M62 90V70M86 90V70M100 84V70" stroke="#5f6870" stroke-width="6" stroke-linecap="round"/>
    <circle cx="26" cy="38" r="2.6" fill="#2b2b2b"/></svg>`;
  if (k === 'huou') return `<svg viewBox="-4 -12 138 112" class="b49-an">
    <ellipse cx="72" cy="62" rx="30" ry="20" fill="#e0b05c" stroke="#8a5f22" stroke-width="2.4"/>
    <path d="M52 50L36 14" stroke="#e0b05c" stroke-width="12" stroke-linecap="round"/>
    <path d="M52 50L36 14" stroke="#8a5f22" stroke-width="2" fill="none" opacity=".4"/>
    <ellipse cx="32" cy="12" rx="13" ry="9" fill="#e0b05c" stroke="#8a5f22" stroke-width="2.2"/>
    <path d="M26 4v-8M38 4v-8" stroke="#8a5f22" stroke-width="3" stroke-linecap="round"/>
    <circle cx="27" cy="10" r="2.2" fill="#2b2b2b"/>
    <path d="M54 80V64M70 86V64M88 86V64M96 80V64" stroke="#8a5f22" stroke-width="5.6" stroke-linecap="round"/>
    <circle cx="64" cy="56" r="4" fill="#a8752c"/><circle cx="80" cy="62" r="4" fill="#a8752c"/>
    <circle cx="72" cy="72" r="4" fill="#a8752c"/></svg>`;
  return `<svg viewBox="-4 -12 138 112" class="b49-an">
    <ellipse cx="70" cy="52" rx="38" ry="24" fill="#cfd4d8" stroke="#6b7278" stroke-width="2.4"/>
    <path d="M34 40q-14 2-14 14 0 12 16 12" fill="#cfd4d8" stroke="#6b7278" stroke-width="2.4"/>
    <path d="M22 46l-8-14 12 4z" fill="#e6e9ec" stroke="#6b7278" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M44 78V70M62 84V72M86 84V72M100 78V70" stroke="#6b7278" stroke-width="6" stroke-linecap="round"/>
    <circle cx="30" cy="44" r="2.4" fill="#2b2b2b"/>
    <path d="M100 44q12-4 14 6" fill="none" stroke="#6b7278" stroke-width="3" stroke-linecap="round"/></svg>`;
};

BANKS.b49 = [

/* ===== tr.17 – Bài 1: Số ? (nối cách đọc với số) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const nz = () => R(1, 9);
  const nums = [
    nz() * 1000 + nz() * 100 + nz() * 10 + nz(),
    10000,
    nz() * 1000 + nz() * 100 + nz(),      // ... trăm linh ...
    nz() * 1000 + nz()                    // ... không trăm linh ...
  ];
  for (let i = 2; i < 4; i++)
    for (let g = 0; g < 40 && nums.slice(0, i).includes(nums[i]); g++) nums[i] += 1;
  const ord = [0, 1, 2, 3].sort(() => Math.random() - .5);
  const given = R(0, 3);
  const CUP = ['#bfe4f5', '#f6c8b0', '#f7c2d8', '#cfe8b8'];
  const rows = ord.map((idx, j) => {
    const n = nums[idx];
    return `<div class="b49-crow">
      <div class="b49-bub c${j + 1}">${ART.b49Cap(ART.b49Read(n))}</div>
      ${ART.b49Cup(CUP[j])}<span class="b49-str"></span>${ART.b49Cup(CUP[3 - j])}
      <div class="b49-val">${j === given ? ART.spNum(n) : q.num(n, 5)}</div></div>`;
  }).join('');
  return q.done(rows + '<div class="hint-line">Mỗi sợi dây nối cách đọc với số thích hợp.</div>',
    ord.map(idx => `${ART.b49Read(nums[idx])} = ${ART.spNum(nums[idx])}`).join(';  '));
},

/* ===== tr.17 – Bài 2: Số ? (hai tia số) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const s1 = R(1000, 9991);
  const h1 = [2, 3, 4, 5, 6, 7].sort(() => Math.random() - .5).slice(0, 2);
  const h2 = [1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - .5).slice(0, 2).concat([8]);
  const mk = (st, hide) => ART.b49Line(Array.from({length: 9}, (_, i) => {
    const v = st + i;
    return hide.includes(i) ? q.num(v, 5) : ART.spNum(v);
  }));
  return q.done(`<div class="sub-lbl">a)</div>${mk(s1, h1)}
    <div class="sub-lbl">b)</div>${mk(9992, h2)}`,
    `Hai số liền nhau trên tia số hơn kém nhau 1 đơn vị; số liền sau của 9 999 là 10 000.`);
},

/* ===== tr.17 – Bài 3: Chọn câu trả lời đúng (chữ số hàng chục, làm tròn đến hàng chục) ===== */
() => {
  const q = Q(3, 'Chọn câu trả lời đúng.');
  let ng = 1, tr = 1, ch = 2, dv = 3;
  for (let g = 0; g < 200; g++){
    ng = R(1, 9); tr = R(1, 8); ch = R(2, 7); dv = R(1, 9);
    if (new Set([ng, tr, ch, dv]).size === 4) break;
  }
  if (new Set([ng, tr, ch, dv]).size !== 4){ ng = 2; tr = 8; ch = 4; dv = 6; }
  const n = ng * 1000 + tr * 100 + ch * 10 + dv;
  const L = ['A', 'B', 'C', 'D'];

  const dsA = [ng, tr, ch, dv].sort(() => Math.random() - .5);
  const okA = L[dsA.indexOf(ch)];

  const r10 = ART.b49R10(n), r100 = ART.b49R100(n), r1000 = ART.b49R1000(n);
  const truncWrong = dv >= 5 ? n - dv : n - dv + 10;
  const dsB = [r10, r100, r1000, truncWrong].sort(() => Math.random() - .5);
  const okB = L[dsB.indexOf(r10)];
  const row = arr => '<div class="b49-opt">' + arr.map((v, i) =>
    `<span><i>${L[i]}.</i>${ART.spNum(v)}</span>`).join('') + '</div>';

  return q.done(`<div class="fill-line"><b>a)</b> Số ${ART.spNum(n)} có chữ số hàng chục là:</div>
      <div class="b49-opt">${dsA.map((v, i) => `<span><i>${L[i]}.</i>${v}</span>`).join('')}</div>
      ${q.pick(okA, L)}
    <div class="fill-line"><b>b)</b> Số ${ART.spNum(n)} làm tròn đến hàng chục là:</div>
      ${row(dsB)}${q.pick(okB, L)}`,
    `a) Chữ số hàng chục của ${ART.spNum(n)} là ${ch}.  `
      + `b) Chữ số hàng đơn vị là ${dv} nên ${ART.spNum(n)} làm tròn đến hàng chục được ${ART.spNum(r10)}.`);
},

/* ===== tr.18 – Bài 4: Đuổi hình bắt chữ ===== */
() => {
  const q = Q(4, 'Các bạn Mai, Nam, Việt và Rô-bốt cùng chơi "Đuổi hình bắt chữ" và lần lượt nhận được số điểm là:');
  const NAMES = ['Mai', 'Nam', 'Việt', 'Rô-bốt'];
  const hi = [], lo = [];
  for (let g = 0; g < 200 && hi.length < 2; g++){
    const v = R(41, 59) * 50;                       // 2 050 … 2 950
    if (!hi.includes(v)) hi.push(v);
  }
  for (let g = 0; g < 200 && lo.length < 2; g++){
    const v = R(21, 39) * 50;                       // 1 050 … 1 950
    if (!lo.includes(v)) lo.push(v);
  }
  while (hi.length < 2) hi.push(2100 + hi.length * 50);
  while (lo.length < 2) lo.push(1600 + lo.length * 50);
  const pts = hi.concat(lo).sort(() => Math.random() - .5);
  const sc = {};
  NAMES.forEach((n, i) => { sc[n] = pts[i]; });
  const best = NAMES.slice().sort((x, y) => sc[y] - sc[x])[0];
  const more = NAMES.filter(n => sc[n] > 2000).slice().sort().join(',');
  const less = NAMES.filter(n => sc[n] < 2000).slice().sort().join(',');
  return q.done(`<p class="wordq">${NAMES.map(n => `${n}: ${ART.spNum(sc[n])} điểm`).join(', ')}.</p>
    <div class="b49-sub">a) Bạn nào nhận được số điểm cao nhất?</div>
    <div class="fill-line">${q.pick(best, NAMES)}</div>
    <div class="b49-sub">b) Những bạn nào nhận được nhiều hơn 2 000 điểm?</div>
    <div class="fill-line">${q.pick(more, NAMES)}</div>
    <div class="b49-sub">c) Những bạn nào nhận được ít hơn 2 000 điểm?</div>
    <div class="fill-line">${q.pick(less, NAMES)}</div>`,
    NAMES.slice().sort((x, y) => sc[y] - sc[x]).map(n => `${n} ${ART.spNum(sc[n])}`).join(' > '));
},

/* ===== tr.18 – Bài 5: bộ sách đánh số từ I đến VIII ===== */
() => {
  const q = Q(5, 'Trên giá sách có một bộ sách gồm 8 cuốn được đánh số từ I đến VIII. '
    + 'Bố của Mai đã lấy 2 cuốn sách để đọc. Hỏi đó là những cuốn được đánh số nào?');
  const all = [1, 2, 3, 4, 5, 6, 7, 8];
  const taken = all.slice().sort(() => Math.random() - .5).slice(0, 2).sort((a, b) => a - b);
  const left = all.filter(x => !taken.includes(x));
  const COL = ['#8fd04a', '#f5e04a', '#f08a6a', '#5fd0d0', '#b18ae0', '#f0a84a'];
  const shelf = '<div class="b49-shelf">' + left.map((v, i) =>
    `<span class="b49-bk" style="background:${COL[i % COL.length]}">${ART.b49Rom(v)}</span>`).join('') + '</div>';
  const opts = all.map(ART.b49Rom);
  const ans = taken.map(ART.b49Rom).slice().sort().join(',');
  return q.done(shelf
    + `<div class="fill-line">Bố của Mai đã lấy hai cuốn được đánh số: ${q.pick(ans, opts)}</div>`,
    `Trên giá còn các cuốn ${left.map(ART.b49Rom).join(', ')} nên hai cuốn đã lấy là `
      + `${taken.map(ART.b49Rom).join(' và ')}.`);
},

/* ===== tr.18–19 – Bài 1: Số ? (bảng cấu tạo số) và làm tròn đến hàng trăm ===== */
() => {
  const q = Q(1, 'a) <span class="tag">Số</span> ?');
  const ns = [];
  for (let g = 0; g < 300 && ns.length < 4; g++){
    const v = R(1, 9) * 1000 + R(0, 8) * 100 + R(0, 9) * 10 + R(0, 9);
    if (!ns.includes(v)) ns.push(v);
  }
  while (ns.length < 4) ns.push(4100 + ns.length);
  ns.sort((a, b) => a - b);
  const dg = n => [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
  const rows = ns.map(n => {
    const d = dg(n);
    const hide = [0, 1, 2, 3].sort(() => Math.random() - .5).slice(0, 2);
    return `<tr><td>${ART.spNum(n)}</td>${d.map((v, i) =>
      `<td>${hide.includes(i) ? q.num(v, 1) : v}</td>`).join('')}</tr>`;
  }).join('');
  const tb = `<div class="tbl-wrap"><table class="tbl amber">
    <tr><th>Số</th><th>Hàng nghìn</th><th>Hàng trăm</th><th>Hàng chục</th><th>Hàng đơn vị</th></tr>
    ${rows}</table></div>`;
  const partB = `<div class="b49-sub">b) Làm tròn các số ${ns.map(ART.spNum).join(', ')} đến hàng trăm.</div>`
    + ns.map(n => `<div class="bullet">Số ${ART.spNum(n)} làm tròn đến hàng trăm được
        ${q.num(ART.b49R100(n), 5)}.</div>`).join('');
  return q.done(tb + partB,
    ns.map(n => `${ART.spNum(n)} → ${ART.spNum(ART.b49R100(n))}`).join(';  '));
},

/* ===== tr.19 – Bài 2: Chọn câu trả lời đúng (số lớn nhất, số bé nhất) ===== */
() => {
  const q = Q(2, 'Chọn câu trả lời đúng.');
  const ds = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 4);
  const perms = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) for (let l = 0; l < 4; l++){
    if (new Set([i, j, k, l]).size !== 4) continue;
    perms.push(ds[i] * 1000 + ds[j] * 100 + ds[k] * 10 + ds[l]);
  }
  const ns = [...new Set(perms)].sort(() => Math.random() - .5).slice(0, 4);
  const L = ['A', 'B', 'C', 'D'];
  const hi = Math.max.apply(null, ns), lo = Math.min.apply(null, ns);
  const row = '<div class="b49-opt">' + ns.map((v, i) =>
    `<span><i>${L[i]}.</i>${ART.spNum(v)}</span>`).join('') + '</div>';
  const list = ns.map(ART.spNum).join(', ');
  return q.done(`<div class="fill-line"><b>a)</b> Trong các số ${list}, số lớn nhất là:</div>
      ${row}${q.pick(L[ns.indexOf(hi)], L)}
    <div class="fill-line"><b>b)</b> Trong các số ${list}, số bé nhất là:</div>
      ${row}${q.pick(L[ns.indexOf(lo)], L)}`,
    `Sắp xếp từ bé đến lớn: ${ns.slice().sort((a, b) => a - b).map(ART.spNum).join(' < ')}.`);
},

/* ===== tr.19 – Bài 3: chiếc bình bị vỡ ghi số La Mã nào ===== */
() => {
  const q = Q(3, '');
  const st = R(11, 17);
  const vals = [st, st + 1, st + 2, st + 3];
  const broken = R(0, 3);
  const row = '<div class="b49-vrow">' + vals.map((v, i) =>
    `<span>${ART.b49Vase(ART.b49Rom(v), i === broken)}</span>`).join('') + '</div>';
  const opts = vals.map(ART.b49Rom);
  return q.done(`<p class="wordq">Mỗi bình ghi một trong các số từ ${ART.b49Rom(st)} đến ${ART.b49Rom(st + 3)}.
      Hỏi bình bị vỡ ghi số nào?</p>${row}
    <div class="fill-line">Bình bị vỡ ghi số ${q.pick(ART.b49Rom(vals[broken]), opts)}</div>`,
    `Bốn bình xếp theo thứ tự ${vals.map(ART.b49Rom).join(', ')} nên bình bị vỡ ghi số `
      + `${ART.b49Rom(vals[broken])}.`);
},

/* ===== tr.19 – Bài 4: ba con vật trong khu bảo tồn ===== */
() => {
  const q = Q(4, '');
  const ws = [];
  for (let g = 0; g < 300 && ws.length < 3; g++){
    const v = R(1200, 6900);
    if (!ws.some(x => Math.abs(x - v) < 60)) ws.push(v);
  }
  while (ws.length < 3) ws.push(1500 + ws.length * 700);
  const up = ws.slice().sort((a, b) => a - b);
  const nang = {'voi châu Phi': up[2], 'tê giác trắng': up[1], 'hươu cao cổ': up[0]};
  const shown = ws.slice().sort(() => Math.random() - .5);
  const AN = [['voi châu Phi', 'voi'], ['hươu cao cổ', 'huou'], ['tê giác trắng', 'tegiac']]
    .sort(() => Math.random() - .5);
  return q.done(`<p class="wordq">Có ba con vật trong một khu bảo tồn là: voi châu Phi, hươu cao cổ
      và tê giác trắng. Trong số đó một con nặng ${ART.spNum(shown[0])} kg, một con nặng
      ${ART.spNum(shown[1])} kg và một con nặng ${ART.spNum(shown[2])} kg. Biết voi châu Phi nặng nhất
      và hươu cao cổ nhẹ hơn tê giác trắng. Hỏi mỗi con nặng bao nhiêu ki-lô-gam?</p>
    <div class="b49-arow">${AN.map(a =>
      `<div class="b49-acell">${ART.b49Animal(a[1])}${a[0]}</div>`).join('')}</div>
    <div class="bullet">Voi châu Phi nặng ${q.num(nang['voi châu Phi'], 4)} kg.</div>
    <div class="bullet">Tê giác trắng nặng ${q.num(nang['tê giác trắng'], 4)} kg.</div>
    <div class="bullet">Hươu cao cổ nặng ${q.num(nang['hươu cao cổ'], 4)} kg.</div>`,
    `${ART.spNum(up[2])} > ${ART.spNum(up[1])} > ${ART.spNum(up[0])} nên voi châu Phi nặng
     ${ART.spNum(up[2])} kg, tê giác trắng nặng ${ART.spNum(up[1])} kg, hươu cao cổ nặng
     ${ART.spNum(up[0])} kg.`);
},

/* ===== tr.19 – Bài 1: Số ? (viết số thành tổng trên tia số) ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const ng = R(1, 9), tr = R(1, 9);
  const n0 = ng * 1000 + tr * 100 + 9;
  const N = ng * 1000, T = tr * 100, sp = ART.spNum;
  const e1 = `${sp(n0)} = ${sp(N)} + ${q.num(T, 3)} + 9`;
  const e2 = `${sp(n0 + 1)} = ${sp(N)} + ${T} + ${q.num(10, 2)}`;
  const e3 = `${sp(n0 + 2)} = ${q.num(N, 4)} + ${T} + ${q.num(10, 2)} + 1`;
  const e4 = `${sp(n0 + 3)} = ${sp(N)} + ${q.num(T, 3)} + 10 + ${q.num(2, 1)}`;
  return q.done(`<div class="b49-eqrow"><span class="b49-eqbox">${e1}</span>
      <span class="b49-eqbox">${e3}</span></div>
    <div class="b49-tape"></div>
    <div class="b49-eqrow"><span class="b49-eqbox">${e2}</span>
      <span class="b49-eqbox">${e4}</span></div>`,
    `Bốn số ${sp(n0)}, ${sp(n0 + 1)}, ${sp(n0 + 2)}, ${sp(n0 + 3)} là bốn số liên tiếp; `
      + `mỗi số được viết thành tổng các nghìn, trăm, chục và đơn vị.`);
},

/* ===== tr.20 – Bài 2: thẻ số đặt vào dấu "?" để được phép so sánh đúng ===== */
() => {
  const q = Q(2, 'a) Mai có các thẻ số từ 0 đến 9. Mai có thể đặt thẻ số nào vào vị trí dấu "?" '
    + 'để được phép so sánh đúng?');
  const A = R(1, 9), E = R(6, 7);
  const fg = R(11, 99);
  const bc = R(0, fg - 1);
  const left = [String(A), '?', String(Math.floor(bc / 10)), String(bc % 10)];
  const right = String(A) + String(E) + (fg < 10 ? '0' + fg : String(fg));
  const ok = [];
  for (let d = E + 1; d <= 9; d++) ok.push(String(d));
  const opts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const cd = (v, cls) => `<span class="b49-cd ${cls || ''}">${v}</span>`;
  const cards = left.map(v => cd(v, v === '?' ? 'q' : '')).join('')
    + cd('&gt;', 'op') + right.split('').map(v => cd(v)).join('');
  return q.done(`<div class="b49-cards">${cards}</div>
    <div class="fill-line">Chọn tất cả các thẻ số phù hợp: ${q.pick(ok.slice().sort().join(','), opts)}</div>
    <div class="b49-sub">b) Mai có tất cả bao nhiêu cách chọn thẻ số phù hợp với yêu cầu trên?</div>
    <div class="fill-line">Mai có ${q.num(ok.length, 1)} cách chọn.</div>`,
    `Hai số đều có chữ số hàng nghìn là ${A}. Muốn số bên trái lớn hơn thì chữ số hàng trăm phải lớn hơn `
      + `${E}, nên thẻ số là ${ok.join(' hoặc ')} — có ${ok.length} cách.`);
},

/* ===== tr.20 – Bài 3: Chọn câu trả lời đúng (làm tròn số học sinh đến hàng trăm) ===== */
() => {
  const q = Q(3, 'Chọn câu trả lời đúng.');
  const k = R(10, 98), m = R(55, 94), n = k * 100 + m;
  const f = k * 100;
  const r100 = f + 100, r10 = ART.b49R10(n);
  const L = ['A', 'B', 'C', 'D'];
  const vals = [r100, f, f + 50, r10].sort(() => Math.random() - .5);
  const ok = L[vals.indexOf(r100)];
  return q.done(`<p class="wordq">Trường học của Rô-bốt có ${ART.spNum(n)} học sinh.
      Nếu làm tròn số học sinh đến hàng trăm, ta có thể nói:</p>
    <div class="fill-line">Trường học của Rô-bốt có khoảng:</div>
    <div class="b49-opt">${vals.map((v, i) =>
      `<span><i>${L[i]}.</i>${ART.spNum(v)} học sinh.</span>`).join('')}</div>
    ${q.pick(ok, L)}`,
    `Chữ số hàng chục của ${ART.spNum(n)} là ${Math.floor(m / 10)} (lớn hơn hoặc bằng 5) nên
     ${ART.spNum(n)} làm tròn đến hàng trăm được ${ART.spNum(r100)}.`);
},
];
