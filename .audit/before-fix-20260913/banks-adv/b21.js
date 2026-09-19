/*CSS
.b21adv-box{width:100%;max-width:280px;height:auto;display:block;margin:8px auto}
.b21adv-stack{width:100%;max-width:300px;height:auto;display:block;margin:8px auto}
CSS*/

/* ===== NÂNG CAO — Bài 21: Khối lập phương, khối hộp chữ nhật ===== */

const b21advV = {
  FBL:[24, 182], FBR:[178, 182], FTR:[178, 64], FTL:[24, 64],
  BBL:[80, 144], BBR:[234, 144], BTR:[234, 26], BTL:[80, 26]
};

const b21advE = [
  ['FTL', 'FTR'], ['FTR', 'FBR'], ['FBR', 'FBL'], ['FBL', 'FTL'],
  ['BTL', 'BTR'], ['BTR', 'BBR'], ['BBR', 'BBL'], ['BBL', 'BTL'],
  ['FTL', 'BTL'], ['FTR', 'BTR'], ['FBR', 'BBR'], ['FBL', 'BBL']
];

const b21advWire = extra => {
  const P = b21advV;
  const e = b21advE.map(x =>
    `<path d="M${P[x[0]][0]} ${P[x[0]][1]}L${P[x[1]][0]} ${P[x[1]][1]}" fill="none"
      stroke="#1f6fb2" stroke-width="3.4" stroke-linecap="round"/>`).join('');
  const d = Object.keys(P).map(k => `<circle cx="${P[k][0]}" cy="${P[k][1]}" r="4"/>`).join('');
  return `<svg viewBox="2 4 256 214" class="b21adv-box">${e}${d}${extra || ''}</svg>`;
};

/* khung khối hộp chữ nhật có ghi độ dài ba loại cạnh */
const b21advFrame = (a, b, c) => {
  const P = b21advV;
  const mid = (u, v) => [(P[u][0] + P[v][0]) / 2, (P[u][1] + P[v][1]) / 2];
  const m1 = mid('FBL', 'FBR'), m2 = mid('FBR', 'BBR'), m3 = mid('FBR', 'FTR');
  const t = (p, dx, dy, s) =>
    `<text x="${p[0] + dx}" y="${p[1] + dy}" text-anchor="middle" font-size="15"
      font-weight="700" fill="#c2185b">${s}</text>`;
  return b21advWire(t(m1, 0, 20, a + ' cm') + t(m2, 22, 14, b + ' cm') + t(m3, 24, 5, c + ' cm'));
};

/* khung khối hộp chữ nhật, đánh dấu đỉnh xuất phát và đỉnh đích */
const b21advTrip = (nA, nB) => {
  const P = b21advV;
  const A = P.FBL, B = P.BTR;
  return b21advWire(`
    <circle cx="${A[0]}" cy="${A[1]}" r="8" fill="#ef7d2e" stroke="#8d3b1e" stroke-width="2"/>
    <circle cx="${B[0]}" cy="${B[1]}" r="8" fill="#efe0b0" stroke="#b79a4f" stroke-width="2"/>
    <text x="${A[0] - 14}" y="${A[1] + 20}" text-anchor="middle" font-size="17" font-weight="700">${nA}</text>
    <text x="${B[0] + 14}" y="${B[1] - 8}" text-anchor="middle" font-size="17" font-weight="700">${nB}</text>`);
};

/* khối hộp chữ nhật xếp từ các khối lập phương nhỏ: a khối theo chiều dài,
   b khối theo chiều rộng, h tầng */
const b21advStack = (a, b, h) => {
  const W2 = 15, H2 = 8, Hz = 20;
  const P = (i, j, k) => [((i - j) * W2).toFixed(1), ((i + j) * H2 - k * Hz).toFixed(1)];
  const ln = (p, r) => `M${p[0]} ${p[1]}L${r[0]} ${r[1]}`;
  const poly = pts => pts.map(p => p[0] + ',' + p[1]).join(' ');
  let g = '';
  for (let i = 0; i <= a; i++) g += ln(P(i, 0, h), P(i, b, h));
  for (let j = 0; j <= b; j++) g += ln(P(0, j, h), P(a, j, h));
  for (let i = 0; i <= a; i++) g += ln(P(i, 0, h), P(i, 0, 0));
  for (let k = 0; k <= h; k++) g += ln(P(0, 0, k), P(a, 0, k));
  for (let j = 0; j <= b; j++) g += ln(P(a, j, h), P(a, j, 0));
  for (let k = 0; k <= h; k++) g += ln(P(a, 0, k), P(a, b, k));
  const x0 = -b * W2 - 12, y0 = -h * Hz - 12;
  const W = (a + b) * W2 + 24, H = (a + b) * H2 + h * Hz + 24;
  return `<svg viewBox="${x0} ${y0} ${W} ${H}" class="b21adv-stack">
    <polygon points="${poly([P(0, 0, h), P(a, 0, h), P(a, b, h), P(0, b, h)])}" fill="#f7d9a8"/>
    <polygon points="${poly([P(0, 0, h), P(a, 0, h), P(a, 0, 0), P(0, 0, 0)])}" fill="#e8bd7d"/>
    <polygon points="${poly([P(a, 0, h), P(a, b, h), P(a, b, 0), P(a, 0, 0)])}" fill="#cf9f60"/>
    <path d="${g}" fill="none" stroke="#8a5a2b" stroke-width="1.8" stroke-linecap="round"/></svg>`;
};

ADV.b21 = [

/* 1. Tổng số mặt, cạnh, đỉnh của nhiều khối */
() => {
  const q = Q(1, '');
  const a = R(2, 5), b = R(2, 4), t = a + b;
  return q.done(`<p class="wordq">Trong hộp đồ dùng học tập có ${a} khối lập phương và
      ${b} khối hộp chữ nhật.</p>
    <div class="fill-line">Trong hộp có tất cả ${q.num(t, 1)} khối.</div>
    <div class="fill-line">Mỗi khối đều có 6 mặt nên tất cả các khối đó có ${q.num(6 * t, 2)} mặt.</div>
    <div class="fill-line">Mỗi khối đều có 8 đỉnh nên tất cả các khối đó có ${q.num(8 * t, 2)} đỉnh.</div>
    <div class="fill-line">Mỗi khối đều có 12 cạnh nên tất cả các khối đó có ${q.num(12 * t, 3)} cạnh.</div>`,
    `${a} + ${b} = ${t} (khối);  6 × ${t} = ${6 * t} (mặt);  8 × ${t} = ${8 * t} (đỉnh);  `
    + `12 × ${t} = ${12 * t} (cạnh).`);
},

/* 2. Bài toán ngược: từ số tờ giấy tìm số khối */
() => {
  const q = Q(2, '');
  const k = R(3, 8), giay = 6 * k;
  return q.done(`<p class="wordq">Bạn Nam dán giấy màu kín tất cả các mặt của một số khối lập phương giống nhau,
      mỗi mặt dán một tờ giấy màu. Bạn Nam đã dùng hết ${giay} tờ giấy màu.</p>
    <div class="fill-line">Mỗi khối lập phương cần ${q.num(6, 1)} tờ giấy màu.</div>
    <div class="fill-line">Bạn Nam đã dán ${q.num(k, 1)} khối lập phương.</div>
    <div class="fill-line">Muốn làm khung cho ngần ấy khối lập phương thì cần ${q.num(12 * k, 3)} nan tre.</div>
    <div class="fill-line">Ngần ấy khối lập phương có tất cả ${q.num(8 * k, 2)} đỉnh.</div>`,
    `${giay} : 6 = ${k} (khối);  12 × ${k} = ${12 * k} (nan tre);  8 × ${k} = ${8 * k} (đỉnh).`);
},

/* 3. Xếp khối hộp chữ nhật từ các khối lập phương nhỏ */
() => {
  const q = Q(3, 'Xếp các khối lập phương nhỏ giống nhau thành một khối hộp chữ nhật (như hình vẽ).');
  const a = R(3, 6), b = R(2, 4), tang = a * b;
  return q.done(b21advStack(a, b, 2)
    + `<div class="fill-line">Mỗi tầng có ${a} hàng, mỗi hàng ${b} khối nên mỗi tầng có
         ${q.num(tang, 2)} khối lập phương nhỏ.</div>
       <div class="fill-line">Khối hộp chữ nhật trên có 2 tầng nên được xếp từ
         ${q.num(2 * tang, 2)} khối lập phương nhỏ.</div>
       <div class="fill-line">Muốn xếp thêm một tầng nữa thì cần thêm ${q.num(tang, 2)} khối nhỏ.</div>
       <div class="fill-line">Khi đó khối hộp chữ nhật được xếp từ ${q.num(3 * tang, 2)} khối nhỏ.</div>`,
    `${a} × ${b} = ${tang} (khối);  ${tang} + ${tang} = ${2 * tang} (khối);  `
    + `${2 * tang} + ${tang} = ${3 * tang} (khối).`);
},

/* 4. Khung khối hộp chữ nhật: tổng độ dài các nan */
() => {
  const q = Q(4, '');
  const a = R(5, 9);
  let b = R(3, 8), c = R(2, 7);
  if (b === a) b = a === 8 ? 3 : b + 1;
  if (c === a || c === b) c = c === 7 ? 2 : c + 1;
  if (c === a || c === b) c = c === 7 ? 2 : c + 1;
  const tong = 4 * a + 4 * b + 4 * c;
  return q.done(b21advFrame(a, b, c)
    + `<p class="wordq">Bác thợ làm một chiếc khung dạng khối hộp chữ nhật bằng các nan tre
        có độ dài như hình vẽ.</p>
       <div class="fill-line">Chiếc khung đó có tất cả ${q.num(12, 2)} nan tre.</div>
       <div class="fill-line">Có ${q.num(4, 1)} nan tre dài ${a} cm, tổng độ dài của chúng
         là ${q.num(4 * a, 2)} cm.</div>
       <div class="fill-line">Có 4 nan tre dài ${b} cm và 4 nan tre dài ${c} cm, tổng độ dài của chúng
         là ${q.num(4 * b + 4 * c, 2)} cm.</div>
       <div class="fill-line">Tổng độ dài tất cả các nan tre của chiếc khung là ${q.num(tong, 3)} cm.</div>`,
    `Khối hộp chữ nhật có 12 cạnh, gồm 3 nhóm, mỗi nhóm 4 cạnh bằng nhau.  `
    + `4 × ${a} = ${4 * a};  4 × ${b} = ${4 * b};  4 × ${c} = ${4 * c};  `
    + `${4 * a} + ${4 * b} + ${4 * c} = ${tong} (cm).`);
},

/* 5. Suy luận: con kiến bò trên khung khối hộp chữ nhật */
() => {
  const q = Q(5, '');
  const nm = 'ABCDEGHIKMNP'.split('').sort(() => Math.random() - .5);
  const nA = nm[0], nB = nm[1];
  return q.done(b21advTrip(nA, nB)
    + `<p class="wordq">Con kiến đứng ở đỉnh ${nA} của một chiếc khung nhôm dạng khối hộp chữ nhật.
        Nó muốn bò theo các cạnh của khung để đến chỗ hạt gạo ở đỉnh ${nB}
        (đỉnh ${nB} không nằm trên mặt nào chứa đỉnh ${nA}).</p>
       <div class="fill-line">Từ mỗi đỉnh của chiếc khung có ${q.num(3, 1)} cạnh đi ra.</div>
       <div class="fill-line">Muốn đến một đỉnh nằm cùng một cạnh với đỉnh ${nA}, con kiến bò qua
         ít nhất ${q.num(1, 1)} cạnh.</div>
       <div class="fill-line">Muốn đến đỉnh đối diện với ${nA} trên cùng một mặt, con kiến bò qua
         ít nhất ${q.num(2, 1)} cạnh.</div>
       <div class="fill-line">Muốn đến đỉnh ${nB}, con kiến bò qua ít nhất ${q.num(3, 1)} cạnh.</div>`,
    `Mỗi đỉnh của khối hộp chữ nhật là điểm chung của 3 cạnh. Từ ${nA} bò 1 cạnh tới 3 đỉnh gần nhất, `
    + `bò 2 cạnh tới 3 đỉnh chéo trên các mặt, còn đỉnh ${nB} chỉ tới được sau ít nhất 3 cạnh.`);
},

/* 6. So sánh hai vế */
() => {
  const q = Q(6, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(2, 6), b = R(2, 9);
    rows.push({t:`Số mặt của ${a} khối lập phương`, p:`Số cạnh của ${b} khối hộp chữ nhật`,
      l:6 * a, r:12 * b});
  }
  {
    const a = R(2, 6), b = 2 * a + pick([-2, -1, 0, 0, 1, 3]);
    rows.push({t:`Số đỉnh của ${a} khối hộp chữ nhật`, p:`Số mặt của ${b} khối lập phương`,
      l:8 * a, r:6 * b});
  }
  {
    const a = R(2, 8), b = a + pick([-1, 0, 0, 1]);
    rows.push({t:`Số cạnh của ${a} khối lập phương`, p:`Số cạnh của ${b} khối hộp chữ nhật`,
      l:12 * a, r:12 * b});
  }
  {
    const a = R(2, 9), b = R(3, 9);
    rows.push({t:`Số đỉnh của ${a} khối lập phương`, p:`8 × ${b}`, l:8 * a, r:8 * b});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Khối lập phương và khối hộp chữ nhật đều có 6 mặt, 8 đỉnh và 12 cạnh ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},
];
