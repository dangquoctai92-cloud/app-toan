/* ==================== BÀI 32: MI-LI-LÍT (SGK tr.89, 90) ====================
   hoạt động tr.89–90 : bài 1, 2
   luyện tập tr.90    : bài 1, 2
=========================================================================== */

/* ca đong 1 l, có vạch 500 ml và vạch 1 l, mực nước theo số mi-li-lít */
ART.b32Ca = ml => {
  const TOP = 20, H = 78, W = 58, X = 14;
  const h = Math.round(H * Math.min(ml, 1000) / 1000);
  const y = TOP + H - h;
  let vach = '';
  for (let i = 1; i <= 9; i++){
    const yy = TOP + H - Math.round(H * i / 10);
    vach += `<path d="M${X} ${yy}h${i === 5 ? 16 : 9}" stroke="#5f9fc4" stroke-width="1.8"/>`;
  }
  return `<svg viewBox="0 0 104 112" class="b32-ca">
    <path d="M${X + W} 40h16a13 13 0 0 1 0 26h-16" fill="none" stroke="#5f9fc4" stroke-width="4"/>
    <rect x="${X}" y="${TOP}" width="${W}" height="${H}" rx="5" fill="#f2fafd" stroke="#5f9fc4" stroke-width="3"/>
    <rect x="${X + 2}" y="${y}" width="${W - 4}" height="${h}" fill="#a5dcf2"/>
    ${vach}
    <path d="M${X} ${TOP}h18" stroke="#5f9fc4" stroke-width="2.4"/>
    <text x="${X + 22}" y="${TOP + 9}" font-size="11" fill="#2f6a86">1 <tspan font-style="italic">l</tspan></text>
    <text x="${X + 20}" y="${TOP + Math.round(H / 2) + 9}" font-size="11" fill="#2f6a86">500 ml</text>
    <rect x="${X - 3}" y="${TOP - 6}" width="${W + 6}" height="7" rx="3" fill="#dff1f9" stroke="#5f9fc4" stroke-width="2.4"/>
  </svg>`;
};

/* bình nước có quai */
ART.b32Binh = () => `<svg viewBox="0 0 70 150" class="b32-binh">
  <rect x="14" y="6" width="30" height="16" rx="5" fill="#5ec6e8" stroke="#2f7fa0" stroke-width="2.6"/>
  <rect x="8" y="22" width="44" height="120" rx="12" fill="#eef8fc" stroke="#2f7fa0" stroke-width="2.8"/>
  <rect x="10" y="44" width="40" height="14" fill="#5ec6e8"/>
  <path d="M52 34q14 6 14 30t-14 30" fill="none" stroke="#2f7fa0" stroke-width="3"/>
  <rect x="12" y="70" width="36" height="66" rx="8" fill="#d6eef8"/>
</svg>`;

/* phích nước (bình giữ nhiệt) */
ART.b32Phich = () => `<svg viewBox="0 0 90 160" class="b32-phich">
  <rect x="30" y="4" width="30" height="14" rx="4" fill="#c0392b" stroke="#7d2018" stroke-width="2.4"/>
  <path d="M22 18h46l6 18v106a8 8 0 0 1-8 8H24a8 8 0 0 1-8-8V36z" fill="#f0e6d2" stroke="#8a6b3a" stroke-width="2.8"/>
  <rect x="16" y="54" width="58" height="26" fill="#e2483c" opacity=".85"/>
  <path d="M74 60q14 10 14 26t-14 24" fill="none" stroke="#8a6b3a" stroke-width="3"/>
  <text x="45" y="74" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">1 <tspan font-style="italic">l</tspan></text>
</svg>`;

/* cốc nước, có ghi số mi-li-lít */
ART.b32Coc = ml => `<svg viewBox="0 0 60 86" class="b32-coc">
  <path d="M8 10h44l-5 66H13z" fill="#f4fbfe" stroke="#5f9fc4" stroke-width="2.6"/>
  <path d="M10.5 34h39l-3.6 42H14.1z" fill="#a5dcf2"/>
  <ellipse cx="30" cy="10" rx="22" ry="5" fill="#dff1f9" stroke="#5f9fc4" stroke-width="2.4"/>
  <text x="30" y="58" text-anchor="middle" font-size="12" font-weight="700" fill="#2f6a86">${ml} ml</text>
</svg>`;

/* chai dầu ăn */
ART.b32Oil = ml => `<svg viewBox="0 0 120 150" class="b32-oil">
  <rect x="48" y="4" width="24" height="14" rx="3" fill="#e0a020" stroke="#96690c" stroke-width="2.2"/>
  <path d="M50 18h20l14 22v96a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8V40z" fill="#fdf3d6" stroke="#96690c" stroke-width="2.8"/>
  <path d="M38 60h44v78a6 6 0 0 1-6 6H44a6 6 0 0 1-6-6z" fill="#f4c744"/>
  <rect x="36" y="72" width="48" height="30" rx="3" fill="#fff8e2" stroke="#96690c" stroke-width="2"/>
  <text x="60" y="93" text-anchor="middle" font-size="15" font-weight="700" fill="#96690c">${ml} ml</text>
</svg>`;

BANKS.b32 = [

/* ===== tr.89 – Bài 1 (hoạt động): Rót hết nước từ bình sang 3 ca ===== */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const a = pick([300, 400, 500, 600]);
  const b = R(1, 4) * 100, c = R(1, 4) * 100;
  return q.done(`<p class="wordq">Rót hết nước từ bình sang 3 ca (như hình vẽ).</p>
    <div class="b32-row">
      <div class="b32-item">${ART.b32Binh()}<span class="cap">Bình</span></div>
      <div class="b32-item">${ART.b32Ca(a)}<em>A</em></div>
      <div class="b32-item">${ART.b32Ca(b)}<em>B</em></div>
      <div class="b32-item">${ART.b32Ca(c)}<em>C</em></div>
    </div>
    <div class="bullet">a) Ca A có ${a} ml nước, ca B có ${q.num(b)} ml nước, ca C có ${q.num(c)} ml nước.</div>
    <div class="bullet">b) Lúc đầu, lượng nước trong bình có là ${q.num(a + b + c)} ml.</div>
    <div class="hint-line">Mỗi vạch trên ca 1 <i>l</i> ứng với 100 mi-li-lít.</div>`,
    `${a} + ${b} + ${c} = ${a + b + c} (ml)`);
},

/* ===== tr.90 – Bài 2 (hoạt động): rót nước từ phích 1 l ra các cốc ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const p = pick([[100, 2], [100, 3], [100, 4], [150, 2], [150, 3], [150, 4],
    [200, 2], [200, 3], [200, 4], [250, 2], [250, 3], [300, 2]]);
  const x = p[0], n = p[1];
  const dung = x * n;
  return q.done(`<p class="wordq">Một phích nước chứa đầy 1 <i>l</i> nước.
      Rót nước từ phích ra ${n} cốc, mỗi cốc ${x} ml nước (như hình vẽ).</p>
    <div class="b32-row">
      <div class="b32-item">${ART.b32Phich()}<span class="cap">Phích 1 <i>l</i></span></div>
      ${Array.from({length: n}, () => `<div class="b32-item">${ART.b32Coc(x)}</div>`).join('')}
    </div>
    <div class="bullet">a) 1 <i>l</i> = ${q.num(1000, 4)} ml.</div>
    <div class="bullet">b) Sau khi rót, lượng nước còn lại trong phích là ${q.num(1000 - dung)} ml.</div>`,
    `${x} × ${n} = ${dung} (ml);  1000 − ${dung} = ${1000 - dung} (ml)`);
},

/* ===== tr.90 – Luyện tập, Bài 1: Tính (theo mẫu) ===== */
() => {
  const q = Q(1, 'Tính (theo mẫu).');
  const a1 = R(12, 95) * 10, b1 = R(1, 9) * 10;
  const c1 = R(11, 42), d1 = R(2, 5);
  return q.done(noteBox('Mẫu:  100 ml + 20 ml = 120 ml<br>8 ml × 4 = 32 ml')
    + `<div class="eq-list">
        <div class="eq"><b>a)</b> ${a1} ml − ${b1} ml = ${q.num(a1 - b1)} ml</div>
        <div class="eq"><b>b)</b> ${c1} ml × ${d1} = ${q.num(c1 * d1)} ml</div>
      </div>`,
    `${a1} − ${b1} = ${a1 - b1};  ${c1} × ${d1} = ${c1 * d1}`);
},

/* ===== tr.90 – Luyện tập, Bài 2: chai dầu ăn ===== */
() => {
  const q = Q(2, '');
  const t = R(11, 19) * 50;
  const con = R(3, t / 50 - 2) * 50;
  return q.done(`<p class="wordq">Một chai dầu ăn có ${t} ml dầu. Sau khi mẹ đã dùng để nấu ăn thì
      trong chai còn lại ${con} ml dầu. Hỏi mẹ đã dùng bao nhiêu mi-li-lít dầu để nấu ăn?</p>
    ${ART.b32Oil(t)}
    <div class="fill-line">Mẹ đã dùng ${q.num(t - con)} ml dầu để nấu ăn.</div>`,
    `${t} − ${con} = ${t - con} (ml)`);
},
];
