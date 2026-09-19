/* ==================== BÀI 21: KHỐI LẬP PHƯƠNG, KHỐI HỘP CHỮ NHẬT (SGK tr.63, 64) ====================
   hoạt động tr.64 : bài 1 (a, b), bài 2
   luyện tập tr.64 : bài 1, bài 2
================================================================================================== */

ART.b21V = {
  FBL: [20, 180], FBR: [180, 180], FTR: [180, 60], FTL: [20, 60],
  BBL: [80, 140], BBR: [240, 140], BTR: [240, 20], BTL: [80, 20]
};

ART.b21Seg = (a, b, col, w) => {
  const P = ART.b21V;
  return `<path d="M${P[a][0]} ${P[a][1]}L${P[b][0]} ${P[b][1]}" fill="none" stroke="${col}"
    stroke-width="${w || 4}" stroke-linecap="round"/>`;
};

/* khung sắt khối hộp chữ nhật: 4 cạnh đứng màu cV, 8 cạnh của mặt trên và mặt dưới màu cH */
ART.b21Frame = (cV, cH) => {
  const V = [['FTL', 'FBL'], ['FTR', 'FBR'], ['BTL', 'BBL'], ['BTR', 'BBR']];
  const H = [['FTL', 'FTR'], ['BTL', 'BTR'], ['FTL', 'BTL'], ['FTR', 'BTR'],
             ['FBL', 'FBR'], ['BBL', 'BBR'], ['FBL', 'BBL'], ['FBR', 'BBR']];
  return `<svg viewBox="4 4 252 192" class="b21-box">
    ${H.map(e => ART.b21Seg(e[0], e[1], cH, 5)).join('')}
    ${V.map(e => ART.b21Seg(e[0], e[1], cV, 5)).join('')}
  </svg>`;
};

/* khung nhôm + đường đi màu cam của con kiến */
ART.b21Ant = path => {
  const P = ART.b21V;
  const all = [['FTL', 'FTR'], ['FTR', 'FBR'], ['FBR', 'FBL'], ['FBL', 'FTL'],
               ['BTL', 'BTR'], ['BTR', 'BBR'], ['BBR', 'BBL'], ['BBL', 'BTL'],
               ['FTL', 'BTL'], ['FTR', 'BTR'], ['FBR', 'BBR'], ['FBL', 'BBL']];
  const way = path.map((k, i) => (i ? 'L' : 'M') + P[k][0] + ' ' + P[k][1]).join('');
  const s = P[path[0]], e = P[path[path.length - 1]];
  return `<svg viewBox="-12 -4 280 212" class="b21-box">
    ${all.map(x => ART.b21Seg(x[0], x[1], '#1f6fb2', 3.4)).join('')}
    <path d="${way}" fill="none" stroke="#ef7d2e" stroke-width="5"
      stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="${s[0] - 9}" cy="${s[1] + 5}" rx="7" ry="4.4" fill="#8d3b1e"/>
    <circle cx="${s[0] - 16}" cy="${s[1] + 4}" r="3.4" fill="#8d3b1e"/>
    <path d="M${s[0] - 19} ${s[1] + 1}l-4-4M${s[0] - 19} ${s[1] + 6}l-4 3" stroke="#8d3b1e" stroke-width="1.4"/>
    <ellipse cx="${e[0] + 8}" cy="${e[1] - 6}" rx="8" ry="4.6" fill="#efe0b0" stroke="#b79a4f" stroke-width="1.6"/>
  </svg>`;
};

/* hộp gỗ dạng khối lập phương, gần mỗi đỉnh chạm k bông hoa */
ART.b21Cube = k => {
  const fl = (x, y) => `<g transform="translate(${x},${y})" fill="#8a6a3a" opacity=".85">
    <circle cx="0" cy="-4" r="2.4"/><circle cx="3.8" cy="-1.2" r="2.4"/><circle cx="2.4" cy="3.2" r="2.4"/>
    <circle cx="-2.4" cy="3.2" r="2.4"/><circle cx="-3.8" cy="-1.2" r="2.4"/>
    <circle cx="0" cy="0" r="1.6" fill="#5d4522"/></g>`;
  const corners = [[46, 96], [154, 96], [154, 204], [46, 204], [100, 44], [208, 44], [208, 152]];
  let f = '';
  corners.forEach(c => {
    for (let i = 0; i < k; i++) f += fl(c[0] + (i % 2 ? 15 : 0), c[1] + (i > 1 ? 15 : 0));
  });
  return `<svg viewBox="20 20 220 210" class="b21-cube">
    <path d="M36 86h132v132H36z" fill="#d8b183" stroke="#8a6a3a" stroke-width="2.6"/>
    <path d="M36 86l54-52h132l-54 52z" fill="#e9c99f" stroke="#8a6a3a" stroke-width="2.6"/>
    <path d="M168 86l54-52v132l-54 52z" fill="#c39a69" stroke="#8a6a3a" stroke-width="2.6"/>
    ${f}</svg>`;
};

/* chiếc đèn lồng dạng khối lập phương */
ART.b21Lan = (giay, mau) => `<svg viewBox="0 0 120 140" class="b21-lan">
  ${giay ? `<path d="M22 46h56v72H22z" fill="${mau || '#e2483c'}" opacity=".9"/>
    <path d="M22 46l24-22h56L78 46z" fill="#7fd0f0" opacity=".9"/>
    <path d="M78 46l24-22v72l-24 22z" fill="#a8d36a" opacity=".9"/>` : ''}
  <g fill="none" stroke="#c39a55" stroke-width="4" stroke-linecap="round">
    <path d="M22 46h56v72H22z"/><path d="M46 24h56v72H46"/>
    <path d="M22 46l24-22M78 46l24-22M78 118l24-22M22 118l24-22"/></g>
</svg>`;

BANKS.b21 = [

/* ===== tr.64 – Bài 1: khung sắt dạng khối hộp chữ nhật ===== */
() => {
  const q = Q(1, 'Một chiếc khung sắt dạng khối hộp chữ nhật có các cạnh được sơn màu như hình vẽ.');
  const dungXanh = Math.random() < .5;
  const cV = dungXanh ? '#1f9ad6' : '#d0342c';
  const cH = dungXanh ? '#d0342c' : '#1f9ad6';
  const xanh = dungXanh ? 4 : 8, do_ = dungXanh ? 8 : 4;
  const L = ['A', 'B', 'C'];
  const list = ['Hình tròn', 'Hình tam giác', 'Hình chữ nhật'].sort(() => Math.random() - .5);
  const ok = L[list.indexOf('Hình chữ nhật')];
  return q.done(ART.b21Frame(cV, cH)
    + `<div class="b21-leg"><span><b style="background:#1f9ad6"></b>màu xanh</span>
        <span><b style="background:#d0342c"></b>màu đỏ</span></div>
       <div class="fill-line"><b>a)</b> Có ${q.num(xanh, 1)} cạnh được sơn màu xanh
         và ${q.num(do_, 1)} cạnh được sơn màu đỏ.</div>
       <div class="fill-line"><b>b)</b> Chọn câu trả lời đúng. Người ta lắp một tấm gỗ vừa khít vào mặt trước
         của chiếc khung sắt đó. Miếng gỗ cần lắp có dạng hình gì?</div>
       <div class="b21-opt">${list.map((v, i) => `<span><i>${L[i]}.</i>${v}</span>`).join('')}</div>
       ${q.pick(ok, L)}`,
    `Khối hộp chữ nhật có 12 cạnh: ${xanh} cạnh xanh và ${do_} cạnh đỏ. Mỗi mặt của khối hộp chữ nhật đều là hình chữ nhật.`);
},

/* ===== tr.64 – Bài 2: Số ? (bông hoa chạm ở gần mỗi đỉnh) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const k = R(2, 4), doc = ['hai', 'ba', 'bốn'][k - 2];
  return q.done(ART.b21Cube(k)
    + `<p class="wordq">Ở gần mỗi đỉnh của một chiếc hộp gỗ dạng khối lập phương, bác Hà chạm ${doc} bông hoa
        (như hình vẽ). Bác Hà đã chạm tất cả ${q.num(8 * k)} bông hoa.</p>
       <div class="fill-line">Khối lập phương có ${q.num(8, 1)} đỉnh, ${q.num(6, 1)} mặt
         và ${q.num(12, 2)} cạnh.</div>`,
    `${k} × 8 = ${8 * k} (bông hoa)`);
},

/* ===== tr.64 – luyện tập 1: con kiến bò qua mấy cạnh ===== */
() => {
  const q = Q(1, 'Con kiến bò theo đường màu cam trên chiếc khung nhôm dạng khối hộp chữ nhật để đến chỗ hạt gạo (như hình vẽ). Hỏi con kiến cần bò qua mấy cạnh?');
  const WAYS = [
    ['FBL', 'FBR', 'FTR'],
    ['FBL', 'FBR', 'BBR', 'BTR'],
    ['FBL', 'FTL', 'FTR', 'BTR'],
    ['FBL', 'FBR', 'BBR', 'BTR', 'BTL'],
    ['FBL', 'BBL', 'BBR', 'BTR']
  ];
  const w = pick(WAYS), n = w.length - 1;
  return q.done(ART.b21Ant(w)
    + `<div class="fill-line">Con kiến cần bò qua ${q.num(n, 1)} cạnh.</div>`,
    `Đếm số đoạn màu cam trên khung: ${n} cạnh.`);
},

/* ===== tr.64 – luyện tập 2: Số ? (đèn lồng khối lập phương) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const m = R(3, 8);
  return q.done(`<p class="wordq">Chú Ba làm những chiếc đèn lồng có dạng khối lập phương.
      Mỗi cạnh dùng một nan tre, mỗi mặt dán một tờ giấy màu.</p>
    <div class="b21-row">${ART.b21Lan(false)}${ART.b21Lan(true, '#e2483c')}${ART.b21Lan(true, '#f0a92e')}</div>
    <div class="fill-line"><b>a)</b> Mỗi chiếc đèn lồng cần dùng ${q.num(12, 2)} nan tre.</div>
    <div class="fill-line"><b>b)</b> ${m} chiếc đèn lồng như vậy cần dùng ${q.num(6 * m)} tờ giấy màu.</div>
    <div class="fill-line">Và ${m} chiếc đèn lồng đó cần dùng tất cả ${q.num(12 * m)} nan tre.</div>`,
    `Khối lập phương có 12 cạnh, 6 mặt.  6 × ${m} = ${6 * m} (tờ giấy);  12 × ${m} = ${12 * m} (nan tre).`);
},
];
