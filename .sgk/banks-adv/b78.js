/* ===== NÂNG CAO — Bài 78: Ôn tập phép nhân, phép chia trong phạm vi 100 000 =====
   Dùng lại của phần cơ bản: SP78 (viết số kiểu 57 436), b78Mix.
   Hàm phụ trợ riêng của phần nâng cao đặt tiền tố b78adv. */

/* phép chia hết: thương có bốn chữ số, số bị chia không quá 99 999 */
const b78advHet = (bmin, bmax) => {
  const b = R(bmin || 2, bmax || 9);
  const lo = 1000;
  const hi = Math.min(9999, Math.floor(99999 / b));
  const t = R(lo, hi);
  return {b, t, a: t * b};
};

/* mũi tên của sơ đồ máy tính */
const b78advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

/* ---- thùng dầu ---- */
ART.b78advThung = () => `<svg viewBox="0 0 200 120" class="b78-art" style="width:190px">
  ${[0, 1, 2].map(i => `<g transform="translate(${16 + i * 60},14)">
      <rect x="6" y="10" width="46" height="82" rx="9" fill="#f3c14a" stroke="#a5711a" stroke-width="2.8"/>
      <rect x="6" y="30" width="46" height="16" fill="#e88b2f" stroke="#a5711a" stroke-width="2.2"/>
      <rect x="20" y="2" width="18" height="10" rx="3" fill="#c9d3de" stroke="#7d8896" stroke-width="2.2"/>
    </g>`).join('')}
</svg>`;

/* ---- bao thóc ---- */
ART.b78advThoc = () => `<svg viewBox="0 0 200 120" class="b78-art" style="width:190px">
  ${[0, 1].map(i => `<g transform="translate(${26 + i * 84},10)">
      <path d="M12 24q24-13 48 0l9 68q-33 11-66 0z" fill="#f2dfb4" stroke="#a2814a" stroke-width="2.8"/>
      <path d="M12 24q11 11 24 11t24-11" fill="none" stroke="#a2814a" stroke-width="2.4"/>
      <rect x="21" y="50" width="30" height="17" rx="3" fill="#fff" stroke="#a2814a" stroke-width="1.9"/>
      <text x="36" y="63" text-anchor="middle" font-size="11" font-weight="800" fill="#8a5b1f">THÓC</text>
    </g>`).join('')}
</svg>`;

ADV.b78 = [

/* 1. Tìm thành phần chưa biết của phép nhân, phép chia */
() => {
  const q = Q(1, 'Tìm số còn thiếu trong mỗi phép tính sau.');
  /* a) ? × b = tích */
  const ba = R(2, 9);
  const fa = R(1000, Math.min(9999, Math.floor(99999 / ba)));
  const Pa = fa * ba;
  /* b) A : ? = thương */
  const bb = R(2, 9);
  const tb = R(Math.max(1000, Math.ceil(10000 / bb)), Math.min(9999, Math.floor(99999 / bb)));
  const Ab = tb * bb;
  /* c) ? : b = thương (dư r) */
  const bc = R(3, 9);
  const rc = R(1, bc - 1);
  const tc = R(Math.max(1000, Math.ceil(10000 / bc)), Math.floor((99999 - (bc - 1)) / bc));
  const Ac = tc * bc + rc;
  /* d) cùng số chia, cùng thương nhưng số dư lớn nhất */
  const Ad = tc * bc + bc - 1;

  const html = `<div class="b78adv-box">
      <div class="b78-line"><span class="b78-let">a)</span>${q.num(fa)}
        <span class="op">×</span> ${ba} <span class="op">=</span> ${SP78(Pa)}</div>
      <div class="b78-line"><span class="b78-let">b)</span>${SP78(Ab)}
        <span class="op">:</span> ${q.num(bb, 1)} <span class="op">=</span> ${SP78(tb)}</div>
      <div class="b78-line"><span class="b78-let">c)</span>${q.num(Ac)}
        <span class="op">:</span> ${bc} <span class="op">=</span> ${SP78(tc)} (dư ${rc})</div>
    </div>
    <div class="b78-line"><span class="b78-let">d)</span>Nếu phép chia ở câu c) vẫn có số chia là ${bc}
      và thương là ${SP78(tc)} nhưng có số dư lớn nhất thì số dư đó là ${q.num(bc - 1, 1)}
      và số bị chia là ${q.num(Ad)}.</div>
    <div class="hint-line">Muốn tìm thừa số chưa biết ta lấy tích chia cho thừa số kia.
      Muốn tìm số chia ta lấy số bị chia chia cho thương. Muốn tìm số bị chia ta lấy thương
      nhân với số chia rồi cộng với số dư. Số dư luôn bé hơn số chia.</div>`;
  return q.done(html,
    `a) ${SP78(Pa)} : ${ba} = ${SP78(fa)}. `
    + `b) ${SP78(Ab)} : ${SP78(tb)} = ${bb}. `
    + `c) ${SP78(tc)} × ${bc} = ${SP78(tc * bc)}; ${SP78(tc * bc)} + ${rc} = ${SP78(Ac)}. `
    + `d) Chia cho ${bc} thì số dư lớn nhất là ${bc - 1}; `
    + `${SP78(tc * bc)} + ${bc - 1} = ${SP78(Ad)}.`);
},

/* 2. Tính giá trị của biểu thức nhiều bước */
() => {
  const q = Q(2, 'Tính giá trị của biểu thức.');
  /* a) (A + B) : c × d */
  const ca = R(2, 9), da = R(2, 9);
  const ta = R(1000, 9999);
  const Sa = ta * ca;
  const Aa = R(1000, Sa - 1000), Ba = Sa - Aa;
  /* b) A : b + C × d */
  const bb = R(2, 9);
  const tb = R(1000, 9999);
  const Ab = tb * bb;
  const Cb = R(100, 999), db = R(2, 9);
  const tichB = Cb * db;
  /* c) (A − B) : (c × d) */
  const cap = pick([[2, 2], [2, 3], [3, 2], [2, 4], [4, 2], [3, 3], [3, 4], [4, 3]]);
  const tich = cap[0] * cap[1];
  const tc = R(1000, Math.floor(88000 / tich));
  const hieu = tc * tich;
  const Bc = R(1000, 9999);
  const Ac = hieu + Bc;

  const html = `<div class="b78-line"><span class="b78-let">a)</span>(${SP78(Aa)} + ${SP78(Ba)})
      <span class="op">:</span> ${ca} <span class="op">×</span> ${da}</div>
    <div class="b78adv-step"><span class="op">=</span> ${q.num(Sa)}
      <span class="op">:</span> ${ca} <span class="op">×</span> ${da}</div>
    <div class="b78adv-step"><span class="op">=</span> ${q.num(ta)}
      <span class="op">×</span> ${da}</div>
    <div class="b78adv-step"><span class="op">=</span> ${q.num(ta * da)}</div>
    <div class="b78-line"><span class="b78-let">b)</span>${SP78(Ab)} <span class="op">:</span> ${bb}
      <span class="op">+</span> ${SP78(Cb)} <span class="op">×</span> ${db}</div>
    <div class="b78adv-step"><span class="op">=</span> ${q.num(tb)}
      <span class="op">+</span> ${q.num(tichB)}</div>
    <div class="b78adv-step"><span class="op">=</span> ${q.num(tb + tichB)}</div>
    <div class="b78-line"><span class="b78-let">c)</span>(${SP78(Ac)} <span class="op">&minus;</span>
      ${SP78(Bc)}) <span class="op">:</span> (${cap[0]} <span class="op">×</span> ${cap[1]})</div>
    <div class="b78adv-step"><span class="op">=</span> ${q.num(hieu)}
      <span class="op">:</span> ${q.num(tich, 2)}</div>
    <div class="b78adv-step"><span class="op">=</span> ${q.num(tc)}</div>
    <div class="hint-line">Có dấu ngoặc thì làm trong ngoặc trước. Nếu chỉ có phép nhân và phép chia
      thì làm lần lượt từ trái sang phải.</div>`;
  return q.done(html,
    `a) ${SP78(Aa)} + ${SP78(Ba)} = ${SP78(Sa)}; ${SP78(Sa)} : ${ca} = ${SP78(ta)}; `
    + `${SP78(ta)} × ${da} = ${SP78(ta * da)}. `
    + `b) ${SP78(Ab)} : ${bb} = ${SP78(tb)}; ${SP78(Cb)} × ${db} = ${SP78(tichB)}; `
    + `${SP78(tb)} + ${SP78(tichB)} = ${SP78(tb + tichB)}. `
    + `c) ${SP78(Ac)} &minus; ${SP78(Bc)} = ${SP78(hieu)}; ${cap[0]} × ${cap[1]} = ${tich}; `
    + `${SP78(hieu)} : ${tich} = ${SP78(tc)}.`);
},

/* 3. Tính rồi so sánh giá trị của hai biểu thức */
() => {
  const q = Q(3, 'Tính giá trị của hai biểu thức rồi điền dấu thích hợp vào ô trống.');
  /* hai phép nhân */
  const a1 = R(1000, 9999), b1 = R(2, 9);
  const a2 = R(1000, 9999), b2 = R(2, 9);
  /* hai phép chia hết */
  const H1 = b78advHet(2, 9), H2 = b78advHet(2, 9);
  /* nhân rồi chia cho chính số đó */
  const a3 = R(1000, 9999), b3 = R(2, 9);
  const k3 = R(1, 3), them = R(1, 999);
  const v32 = k3 === 1 ? a3 : k3 === 2 ? a3 + them : a3 - them;

  const rows = b78Mix([
    {trai: `${SP78(a1)} × ${b1}`, phai: `${SP78(a2)} × ${b2}`, v1: a1 * b1, v2: a2 * b2},
    {trai: `${SP78(H1.a)} : ${H1.b}`, phai: `${SP78(H2.a)} : ${H2.b}`, v1: H1.t, v2: H2.t},
    {trai: `${SP78(a3)} × ${b3} : ${b3}`, phai: `${SP78(v32)}`, v1: a3, v2: v32}
  ]);
  rows.forEach(r => { r.d = r.v1 > r.v2 ? '>' : r.v1 < r.v2 ? '<' : '='; });

  const html = `<div class="b78adv-cmp">${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.trai}</span>${q.sign(r.d)}<span class="side">${r.phai}</span></div>`).join('')}</div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; = . Có một biểu thức em không cần tính hết:
      một số nhân với một số rồi lại chia cho chính số đó thì được kết quả là số ban đầu.</div>`;
  return q.done(html,
    rows.map(r => `${r.trai} = ${SP78(r.v1)} ${r.d} ${SP78(r.v2)} = ${r.phai}`).join('. ') + '.');
},

/* 4. Bài toán rút về đơn vị, ba bước tính */
() => {
  const q = Q(4, '');
  const n1 = R(5, 8);
  const moi = R(20, Math.floor(990 / n1)) * 100;
  const tong = moi * n1;
  const n2 = R(2, n1 - 2);
  const ban = moi * n2;
  const conLai = tong - ban;
  const html = `<div class="b78-two">
      <div><p class="wordq">Một cửa hàng nhập về ${n1} thùng dầu như nhau, chứa tất cả
        ${SP78(tong)} l dầu. Cửa hàng đã bán hết ${n2} thùng dầu.
        Hỏi cửa hàng còn lại bao nhiêu lít dầu?</p></div>
      <div>${ART.b78advThung()}</div>
    </div>
    <div class="bullet">Mỗi thùng chứa ${q.num(moi)} l dầu.</div>
    <div class="bullet">Cửa hàng đã bán ${q.num(ban)} l dầu.</div>
    <div class="bullet">Cửa hàng còn lại ${q.num(conLai)} l dầu.</div>
    <div class="hint-line">Trước hết em tìm số dầu của một thùng (rút về đơn vị), sau đó mới
      tính được số dầu đã bán và số dầu còn lại.</div>`;
  return q.done(html,
    `Mỗi thùng chứa: ${SP78(tong)} : ${n1} = ${SP78(moi)} (l). `
    + `Số dầu đã bán: ${SP78(moi)} × ${n2} = ${SP78(ban)} (l). `
    + `Số dầu còn lại: ${SP78(tong)} &minus; ${SP78(ban)} = ${SP78(conLai)} (l).`);
},

/* 5. Bài toán gấp một số lên nhiều lần rồi chuyển bớt */
() => {
  const q = Q(5, '');
  const k = R(3, 5);
  const A = R(60, Math.floor(990 / (k + 1))) * 100;
  const B = A * k;
  const c = R(10, 55) * 100;
  const html = `<div class="b78-two">
      <div><p class="wordq">Kho A chứa ${SP78(A)} kg thóc, số thóc ở kho B gấp ${k} lần số thóc
        ở kho A. Sau đó người ta chuyển ${SP78(c)} kg thóc từ kho B sang kho A.</p></div>
      <div>${ART.b78advThoc()}</div>
    </div>
    <div class="bullet">Lúc đầu kho B chứa ${q.num(B)} kg thóc.</div>
    <div class="bullet">Lúc đầu cả hai kho chứa ${q.num(A + B)} kg thóc.</div>
    <div class="bullet">Sau khi chuyển, kho A có ${q.num(A + c)} kg thóc.</div>
    <div class="bullet">Sau khi chuyển, kho B còn ${q.num(B - c)} kg thóc.</div>
    <div class="hint-line">Chuyển thóc từ kho này sang kho kia thì tổng số thóc của cả hai kho
      không thay đổi. Em hãy thử cộng lại để kiểm tra hai kết quả cuối.</div>`;
  return q.done(html,
    `Kho B lúc đầu: ${SP78(A)} × ${k} = ${SP78(B)} (kg). `
    + `Cả hai kho: ${SP78(A)} + ${SP78(B)} = ${SP78(A + B)} (kg). `
    + `Kho A sau khi chuyển: ${SP78(A)} + ${SP78(c)} = ${SP78(A + c)} (kg). `
    + `Kho B sau khi chuyển: ${SP78(B)} &minus; ${SP78(c)} = ${SP78(B - c)} (kg).`);
},

/* 6. Máy tính kì lạ — tính ngược từ kết quả */
() => {
  const q = Q(6, 'Tìm số ở mỗi ô trống của sơ đồ sau.');
  const a = R(2, 9);
  const s = R(1000, Math.min(9999, Math.floor(90000 / a)));
  const P = s * a;
  const b = R(2, 9);
  const c0 = (b - P % b) % b;
  const c = c0 + b * R(60, 400);
  const S = P + c;
  const KQ = S / b;
  const html = `${speech(`Tớ nghĩ ra một số. Lấy số đó nhân với ${a}, được bao nhiêu cộng với
      ${SP78(c)}, rồi lấy kết quả chia cho ${b} thì được ${SP78(KQ)}.`)}
    <div class="flow b78adv-flow">
      <span class="fnode sq">${q.num(s)}</span>
      ${b78advArrow(`× ${a}`)}
      <span class="fnode circle">${q.num(P)}</span>
      ${b78advArrow(`+ ${SP78(c)}`)}
      <span class="fnode sq">${q.num(S)}</span>
      ${b78advArrow(`: ${b}`)}
      <span class="fnode circle">${SP78(KQ)}</span>
    </div>
    <div class="b78adv-note"><div class="b78-line">Vậy số Rô-bốt nghĩ ra là ${q.num(s)}.</div></div>
    <div class="hint-line">Em hãy tính ngược từ kết quả cuối cùng: lấy thương nhân với số chia
      để tìm số bị chia, rồi lấy tổng trừ đi số hạng đã biết để tìm số hạng kia,
      cuối cùng lấy tích chia cho thừa số đã biết.</div>`;
  return q.done(html,
    `Số trước khi chia: ${SP78(KQ)} × ${b} = ${SP78(S)}. `
    + `Số trước khi cộng: ${SP78(S)} &minus; ${SP78(c)} = ${SP78(P)}. `
    + `Số Rô-bốt nghĩ ra: ${SP78(P)} : ${a} = ${SP78(s)}.`);
},
];
