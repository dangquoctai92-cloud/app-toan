/*CSS
.b71adv-eq{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:2px 8px;
  font-size:20px;font-weight:800;color:#2b3a5a;margin:9px 0}
.b71adv-eq .qin{width:112px !important;height:34px;font-size:18px;padding:0 3px}
.b71adv-eq .b71-let{margin-right:2px}
.b71adv-box{margin:8px 0;background:#eef7ff;border:2.5px solid #a8c8ee;border-radius:12px;padding:4px 10px}
.b71adv-note{margin:8px 0;background:#f3fbf3;border:2.5px solid #9ccf9c;border-radius:12px;padding:5px 12px}
.b71adv-note .b71-line{color:#245c24}
.b71adv-cmp{margin:6px 0}
.b71adv-cmp .side{font-size:18px;font-weight:800;color:#2b3a5a}
CSS*/

/* ===== NÂNG CAO — Bài 71: Chia số có năm chữ số cho số có một chữ số =====
   Dùng lại của phần cơ bản: NSP71 (viết số kiểu 17 486), ART.b71Frame,
   het71, du71. Hàm riêng của phần nâng cao đặt tiền tố b71adv. */

/* phép chia hết: số bị chia có năm chữ số, thương có bốn chữ số */
const b71advHet = (bmin, bmax) => {
  const b = R(bmin || 2, bmax || 9);
  const lo = Math.max(1000, Math.ceil(10000 / b));
  const hi = Math.min(9999, Math.floor(99999 / b));
  const t = R(lo, hi);
  return {b, t, r: 0, a: t * b};
};

/* phép chia có dư: số bị chia có năm chữ số, thương có bốn chữ số */
const b71advDu = (bmin, bmax) => {
  const b = R(bmin || 3, bmax || 9);
  const r = R(1, b - 1);
  const lo = Math.max(1000, Math.ceil((10000 - r) / b));
  const hi = Math.min(9999, Math.floor((99999 - r) / b));
  const t = R(lo, hi);
  return {b, t, r, a: t * b + r};
};

/* bộ ba số chia cùng chia hết cho bs (bs = số nhỏ nhất chia hết cho cả ba) */
const B71ADV_BO = [
  {ds: [2, 3, 6], bs: 6}, {ds: [2, 4, 8], bs: 8}, {ds: [3, 6, 9], bs: 18},
  {ds: [2, 3, 4], bs: 12}, {ds: [3, 4, 6], bs: 12}, {ds: [2, 4, 6], bs: 12},
  {ds: [4, 6, 8], bs: 24}, {ds: [3, 5, 6], bs: 30}, {ds: [4, 5, 8], bs: 40}
];

/* ---- bao gạo ---- */
ART.b71advSack = () => `<svg viewBox="0 0 200 120" class="b71-art">
  ${[0, 1, 2].map(i => `<g transform="translate(${18 + i * 60},${i === 1 ? 6 : 16})">
      <path d="M10 22q22-12 44 0l8 62q-30 10-60 0z" fill="#f2dfb4" stroke="#a2814a" stroke-width="2.6"/>
      <path d="M10 22q10 10 22 10t22-10" fill="none" stroke="#a2814a" stroke-width="2.2"/>
      <rect x="18" y="46" width="28" height="16" rx="3" fill="#fff" stroke="#a2814a" stroke-width="1.8"/>
      <text x="32" y="59" text-anchor="middle" font-size="11" font-weight="800" fill="#8a5b1f">GẠO</text>
    </g>`).join('')}
</svg>`;

/* ---- vỉ trứng ---- */
ART.b71advEggs = () => `<svg viewBox="0 0 200 120" class="b71-art">
  <rect x="12" y="26" width="176" height="72" rx="11" fill="#e8d6b8" stroke="#a2814a" stroke-width="2.8"/>
  ${[0, 1].map(j => [0, 1, 2, 3, 4].map(i =>
    `<ellipse cx="${34 + i * 33}" cy="${48 + j * 30}" rx="14" ry="11" fill="#fffaf0"
      stroke="#c2a06a" stroke-width="2"/>`).join('')).join('')}
</svg>`;

ADV.b71 = [

/* 1. Toán ngược: tìm số bị chia, tìm số chia */
() => {
  const q = Q(1, 'Tìm số còn thiếu trong mỗi phép chia sau.');
  const A = b71advHet(2, 9);
  const B = b71advDu(3, 9);
  const C = b71advHet(2, 9);
  const html = `<div class="b71adv-eq"><span class="b71-let">a)</span>
      ${q.num(A.a)} <span class="op">:</span> ${A.b} <span class="op">=</span> ${NSP71(A.t)}</div>
    <div class="b71adv-eq"><span class="b71-let">b)</span>
      ${q.num(B.a)} <span class="op">:</span> ${B.b} <span class="op">=</span> ${NSP71(B.t)} (dư ${B.r})</div>
    <div class="b71adv-eq"><span class="b71-let">c)</span>
      ${NSP71(C.a)} <span class="op">:</span> ${q.num(C.b, 1)} <span class="op">=</span> ${NSP71(C.t)}</div>
    <div class="hint-line">Muốn tìm số bị chia ta lấy thương nhân với số chia rồi cộng với số dư
      (nếu có). Ở câu c) em hãy thử nhân thương với 2, với 3, ... để tìm ra số chia.</div>`;
  return q.done(html,
    `a) ${NSP71(A.t)} × ${A.b} = ${NSP71(A.a)}. `
    + `b) ${NSP71(B.t)} × ${B.b} = ${NSP71(B.t * B.b)}; ${NSP71(B.t * B.b)} + ${B.r} = ${NSP71(B.a)}. `
    + `c) ${NSP71(C.t)} × ${C.b} = ${NSP71(C.a)} nên số chia là ${C.b}.`);
},

/* 2. Số dư lớn nhất — số bị chia lớn nhất, bé nhất */
() => {
  const b = R(3, 9);
  const lo = Math.max(1000, Math.ceil(10000 / b));
  const hi = Math.min(9999, Math.floor((100000 - b) / b));
  const t = R(lo, hi);
  const het = t * b;
  const q = Q(2, 'Đọc điều Rô-bốt nói rồi trả lời các câu hỏi.');
  const html = speech(`Tớ vừa viết một phép chia có số chia là ${b} và thương là ${NSP71(t)}.`)
    + `<div class="b71-line"><span class="b71-let">a)</span>Trong phép chia cho ${b}<span></span>,
        số dư lớn nhất có thể là ${q.num(b - 1, 1)}.</div>
      <div class="b71-line"><span class="b71-let">b)</span>Nếu phép chia của Rô-bốt là phép chia hết
        thì số bị chia là ${q.num(het)}.</div>
      <div class="b71-line"><span class="b71-let">c)</span>Nếu phép chia của Rô-bốt là phép chia có dư
        thì số bị chia bé nhất có thể là ${q.num(het + 1)}.</div>
      <div class="b71-line"><span class="b71-let">d)</span>Nếu phép chia của Rô-bốt là phép chia có dư
        thì số bị chia lớn nhất có thể là ${q.num(het + b - 1)}.</div>
      <div class="hint-line">Số dư luôn luôn bé hơn số chia. Số bị chia bằng thương nhân với
        số chia rồi cộng với số dư.</div>`;
  return q.done(html,
    `Số dư lớn nhất khi chia cho ${b} là ${b - 1}. `
    + `Chia hết: ${NSP71(t)} × ${b} = ${NSP71(het)}. `
    + `Chia có dư, số dư bé nhất là 1: ${NSP71(het)} + 1 = ${NSP71(het + 1)}. `
    + `Số dư lớn nhất là ${b - 1}: ${NSP71(het)} + ${b - 1} = ${NSP71(het + b - 1)}.`);
},

/* 3. Tính giá trị của biểu thức có phép chia số có năm chữ số */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  const A = b71advHet(2, 9);
  const c1 = R(1000, 9999);
  const B = b71advHet(2, 9);
  const c2 = R(Math.floor(B.t / 4), Math.floor(B.t * 3 / 4));
  const b3 = R(2, 9);
  const t3 = R(Math.max(1000, Math.ceil(20000 / b3)), Math.min(9999, Math.floor(99999 / b3)));
  const S = t3 * b3;
  const c3 = R(1000, Math.min(9999, S - 10000));
  const a3 = S - c3;
  const html = `<div class="b71-line"><span class="b71-let">a)</span>
      ${NSP71(A.a)} <span class="op">:</span> ${A.b} <span class="op">+</span> ${NSP71(c1)}</div>
    <div class="b71-nham"><span class="op">=</span> ${q.num(A.t)} <span class="op">+</span> ${NSP71(c1)}</div>
    <div class="b71-nham"><span class="op">=</span> ${q.num(A.t + c1)}</div>
    <div class="b71-line"><span class="b71-let">b)</span>
      ${NSP71(B.a)} <span class="op">:</span> ${B.b} <span class="op">&minus;</span> ${NSP71(c2)}</div>
    <div class="b71-nham"><span class="op">=</span> ${q.num(B.t)} <span class="op">&minus;</span> ${NSP71(c2)}</div>
    <div class="b71-nham"><span class="op">=</span> ${q.num(B.t - c2)}</div>
    <div class="b71-line"><span class="b71-let">c)</span>
      (${NSP71(a3)} <span class="op">+</span> ${NSP71(c3)}) <span class="op">:</span> ${b3}</div>
    <div class="b71-nham"><span class="op">=</span> ${q.num(S)} <span class="op">:</span> ${b3}</div>
    <div class="b71-nham"><span class="op">=</span> ${q.num(t3)}</div>
    <div class="hint-line">Trong biểu thức chỉ có phép nhân, chia với phép cộng, trừ thì làm
      phép nhân, chia trước. Nếu có dấu ngoặc thì làm trong ngoặc trước.</div>`;
  return q.done(html,
    `a) ${NSP71(A.a)} : ${A.b} = ${NSP71(A.t)}; ${NSP71(A.t)} + ${NSP71(c1)} = ${NSP71(A.t + c1)}. `
    + `b) ${NSP71(B.a)} : ${B.b} = ${NSP71(B.t)}; ${NSP71(B.t)} − ${NSP71(c2)} = ${NSP71(B.t - c2)}. `
    + `c) ${NSP71(a3)} + ${NSP71(c3)} = ${NSP71(S)}; ${NSP71(S)} : ${b3} = ${NSP71(t3)}.`);
},

/* 4. Cùng một số bị chia — số chia càng lớn thì thương càng bé */
() => {
  const bo = pick(B71ADV_BO);
  const ds = bo.ds, bs = bo.bs;
  const lo = Math.ceil(Math.max(10000, 1000 * ds[2]) / bs) * bs;
  const hi = Math.floor(Math.min(99999, 9999 * ds[0]) / bs) * bs;
  const A = bs * R(lo / bs, hi / bs);
  const th = ds.map(b => A / b);
  const q = Q(4, 'Tính rồi so sánh các thương của ba phép chia có cùng số bị chia.');
  const nhan = i => `${NSP71(A)} : ${ds[i]}`;
  const opts = [0, 1, 2].map(nhan);
  const nx1 = 'Số chia càng lớn thì thương càng bé';
  const nx2 = 'Số chia càng lớn thì thương càng lớn';
  const nxOpts = R(1, 2) === 1 ? [nx1, nx2] : [nx2, nx1];
  const html = `<div class="b71adv-box">
      ${[0, 1, 2].map(i => `<div class="b71-line">${nhan(i)}
        <span class="op">=</span> ${q.num(th[i])}</div>`).join('')}
    </div>
    <div class="b71-sub">a) So sánh:</div>
    <div class="b71adv-cmp">
      <div class="cmp-row"><span class="side">${nhan(0)}</span>${q.sign('>')}<span class="side">${nhan(1)}</span></div>
      <div class="cmp-row"><span class="side">${nhan(1)}</span>${q.sign('>')}<span class="side">${nhan(2)}</span></div>
    </div>
    <div class="b71-sub">b) Phép chia có thương lớn nhất là:</div>
    <div class="fill-line b71-wide">${q.pick(nhan(0), opts)}</div>
    <div class="b71-sub">c) Em có nhận xét gì khi chia cùng một số cho các số khác nhau?</div>
    <div class="fill-line b71-wide">${q.pick(nx1, nxOpts)}</div>
    <div class="hint-line">Chạm vào ô dấu để đổi &gt; &lt; = . Ba phép chia đều có
      số bị chia là ${NSP71(A)}<span></span>.</div>`;
  return q.done(html,
    `${nhan(0)} = ${NSP71(th[0])}; ${nhan(1)} = ${NSP71(th[1])}; ${nhan(2)} = ${NSP71(th[2])}. `
    + `${NSP71(th[0])} > ${NSP71(th[1])} > ${NSP71(th[2])} nên phép chia cho ${ds[0]} có thương lớn nhất. `
    + `Cùng một số bị chia thì số chia càng lớn thương càng bé.`);
},

/* 5. Bài toán hai bước: bớt đi rồi chia đều */
() => {
  const q = Q(5, '');
  const b = R(2, 9);
  const moi = R(Math.max(1000, Math.ceil(10000 / b)), Math.min(9999, Math.floor(90000 / b)));
  const conLai = moi * b;
  const chuyen = R(12, 95) * 100;
  const tong = conLai + chuyen;
  const html = `<div class="b71-side">
      <div><p class="wordq">Một kho chứa ${NSP71(tong)} kg gạo. Người ta chuyển đi
        ${NSP71(chuyen)} kg gạo, số gạo còn lại được đóng đều vào ${b} bao lớn.
        Hỏi mỗi bao có bao nhiêu ki-lô-gam gạo?</p></div>
      <div>${ART.b71advSack()}</div></div>
    <div class="bullet">Số gạo còn lại trong kho là ${q.num(conLai)} kg.</div>
    <div class="bullet">Mỗi bao có ${q.num(moi)} kg gạo.</div>
    <div class="hint-line">Bài toán giải bằng hai bước tính: tìm số gạo còn lại trước
      rồi mới chia đều cho ${b}<span></span>.</div>`;
  return q.done(html,
    `Số gạo còn lại: ${NSP71(tong)} − ${NSP71(chuyen)} = ${NSP71(conLai)} (kg). `
    + `Mỗi bao: ${NSP71(conLai)} : ${b} = ${NSP71(moi)} (kg).`);
},

/* 6. Chia có dư: xếp đầy và xếp hết (cần thêm một vỉ) */
() => {
  const q = Q(6, '');
  const it = b71advDu(4, 9);
  const html = `<div class="b71-side">
      <div><p class="wordq">Một trang trại thu hoạch được ${NSP71(it.a)} quả trứng.
        Người ta xếp trứng vào các vỉ, mỗi vỉ ${it.b} quả trứng.</p></div>
      <div>${ART.b71advEggs()}</div></div>
    <div class="b71-line"><span class="b71-let">a)</span>Xếp được nhiều nhất
      ${q.num(it.t)} vỉ trứng đầy và còn thừa ${q.num(it.r, 1)} quả trứng.</div>
    <div class="b71-line"><span class="b71-let">b)</span>Muốn xếp hết tất cả số trứng đó thì
      cần ít nhất ${q.num(it.t + 1)} vỉ.</div>
    <div class="b71-line">Khi đó vỉ cuối cùng chỉ có ${q.num(it.r, 1)} quả trứng.</div>
    <div class="hint-line">Ở câu b) số trứng còn thừa vẫn phải xếp vào một vỉ nữa
      nên số vỉ nhiều hơn ở câu a) là 1 vỉ.</div>`;
  return q.done(html,
    `${NSP71(it.a)} : ${it.b} = ${NSP71(it.t)} (dư ${it.r}) nên xếp được ${NSP71(it.t)} vỉ đầy, `
    + `thừa ${it.r} quả. Muốn xếp hết thì cần ${NSP71(it.t)} + 1 = ${NSP71(it.t + 1)} (vỉ), `
    + `vỉ cuối cùng có ${it.r} quả trứng.`);
},
];
