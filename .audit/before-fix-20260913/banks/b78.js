/*CSS
.b78-let{color:#d63384;font-weight:800;margin-right:6px}
.b78-sub{font-weight:700;margin:9px 0 3px;line-height:1.5;text-align:left}
.b78-ask{margin:8px 0 2px;font-weight:700;color:#d63384;text-align:left}
.b78-line{font-size:17px;font-weight:700;line-height:2.4;text-align:left;margin:4px 0}
.b78-line .qin{margin:0 3px;vertical-align:middle;height:34px;font-size:16px;min-width:62px}
.b78-two{display:flex;flex-wrap:wrap;gap:0 24px}
.b78-two > div{flex:1 1 264px;min-width:238px}
.b78-exp{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 16px;margin:8px 0}
.b78-exp > span{background:#fde7c8;border:2px solid #e0a93c;border-radius:12px;padding:5px 16px;
  font-size:18px;font-weight:800;white-space:nowrap}
.b78-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:14px 28px;margin:10px 0}
.b78-div{display:inline-grid;grid-template-columns:auto auto;font-size:21px;font-weight:800;line-height:1.5}
.b78-da{grid-area:1/1;text-align:right;padding:0 10px 4px 0;white-space:nowrap}
.b78-db{grid-area:1/2;border-left:2.6px solid #444;border-bottom:2.6px solid #444;padding:0 28px 4px 10px}
.b78-dc{grid-area:2/2;border-left:2.6px solid #444;padding:6px 10px 0 10px}
.b78-dd{grid-area:2/1;text-align:right;padding:6px 10px 0 0;font-size:15px;font-weight:700;color:#d63384;white-space:nowrap}
.b78-div .qin{width:92px !important;height:32px;font-size:17px;padding:0 3px}
.b78-dd .qin{width:34px !important;height:28px;font-size:15px}
.b78-mul{display:inline-grid;grid-template-columns:auto auto;font-size:21px;font-weight:800;
  line-height:1.45;justify-items:end}
.b78-mul .s{grid-column:1;text-align:left;width:22px}
.b78-mul .v{grid-column:2;min-width:124px;text-align:right}
.b78-mul .bar{grid-column:1/3;border-top:2.6px solid #444;width:100%;margin:3px 0}
.b78-mul .qin{width:114px !important;height:32px;font-size:17px;padding:0 3px}
.b78-vois{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0}
.b78-vois > div{flex:1 1 148px;max-width:190px;border:2.4px solid #9aa4b5;border-radius:14px;
  background:#eef7e2;padding:5px 5px 3px;text-align:center}
.b78-vois svg{width:100%;height:auto;display:block}
.b78-vexp{font-size:15.5px;font-weight:800;color:#26324a;line-height:1.35}
.b78-vlet{font-size:17px;font-weight:800;color:#d63384;line-height:1.2}
.b78-mcq{display:flex;flex-wrap:wrap;gap:3px 22px;margin:2px 0 4px 16px}
.b78-mcq > span{font-size:17px;font-weight:700;white-space:nowrap}
.b78-mcq i{font-style:normal;color:#d63384;font-weight:800;margin-right:5px}
.b78-wide .picker{flex-wrap:wrap;justify-content:flex-start;margin:4px 0 0}
.b78-wide .pk{width:auto;min-width:34px;padding:0 12px;font-size:14px;height:32px}
.b78-do{font-size:23px;font-weight:800;text-align:center;margin:10px 0;line-height:2.1}
.b78-do .picker{display:inline-flex;vertical-align:middle;margin:0 5px}
.b78-do .pk{width:38px;min-width:38px;padding:0;font-size:19px;height:38px}
.b78-art{width:128px;height:auto;display:block;margin:6px auto}
CSS*/

/* ==================== BÀI 78: ÔN TẬP PHÉP NHÂN, PHÉP CHIA TRONG PHẠM VI 100 000
   (SGK tập 2 – tr.118, 119, 120)
   luyện tập 1 (tr.118) : bài 1 (Đặt tính rồi tính),
                          bài 2 (những phép tính nào có kết quả bằng nhau – đàn voi),
                          bài 3 (Tính giá trị của biểu thức),
                          bài 4 (Việt mua 1 quyển truyện thiếu nhi và 2 cái bút)
   luyện tập 2 (tr.119) : bài 1 (Chọn câu trả lời đúng – tích, thương, giá trị biểu thức),
                          bài 2 (Tính giá trị của biểu thức – bốn câu),
                          bài 3 (Tính giá trị của biểu thức – hai câu),
                          bài 4 (cô Hoa mua gạo), bài 5 (tuổi bố gấp mấy lần tuổi Nam)
   luyện tập 3 (tr.120) : bài 1 (Chọn câu trả lời đúng – kết quả lớn nhất, bé nhất),
                          bài 2 (Tính giá trị của biểu thức – bốn câu),
                          bài 3 (cửa hàng gạo giảm đi 3 lần),
                          bài 4 (bác Hải mua gạch), bài 5 (Đố bạn – chọn dấu "×" hoặc ":")
========================================================================================= */

/* viết số theo kiểu sách: 57 436 */
const SP78 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const b78Mix = a => a.slice().sort(() => Math.random() - .5);
/* đáp án chọn nhiều phải xếp theo thứ tự chuỗi */
const b78Set = a => a.slice().sort().join(',');
const LET78 = ['A', 'B', 'C', 'D'];

/* các số khác n dùng làm phương án nhiễu (luôn có số vòng tối đa) */
function khac78(n, sl){
  const off = b78Mix([-2000, -1000, -300, -200, -100, -60, -40, -20, -9, -6,
    6, 9, 20, 40, 60, 100, 200, 300, 1000, 2000]);
  const out = [];
  for (let i = 0; i < off.length && out.length < sl; i++){
    const v = n + off[i];
    if (v > 0 && v !== n && !out.includes(v)) out.push(v);
  }
  let k = 3;
  while (out.length < sl && k < 400){
    const v = n + k;
    if (v > 0 && v !== n && !out.includes(v)) out.push(v);
    k += 7;
  }
  return out;
}

/* khung phép nhân dạng cột */
ART.b78Mul = (a, b, res) => `<div class="b78-mul">
  <span class="s"></span><span class="v">${SP78(a)}</span>
  <span class="s">&times;</span><span class="v">${b}</span>
  <span class="bar"></span>
  <span class="s"></span><span class="v">${res}</span></div>`;

/* khung phép chia dạng cột */
ART.b78Div = (a, b, thuong, du) => `<div class="b78-div">
  <span class="b78-da">${SP78(a)}</span><span class="b78-db">${b}</span>
  <span class="b78-dc">${thuong}</span>
  <span class="b78-dd">${du || ''}</span></div>`;

/* ---- chú voi ---- */
ART.b78Voi = () => `<svg viewBox="0 0 210 150">
  <ellipse cx="105" cy="141" rx="70" ry="7" fill="rgba(60,40,20,.12)"/>
  <ellipse cx="92" cy="80" rx="56" ry="36" fill="#c2c6ce" stroke="#8b8f98" stroke-width="3"/>
  <path d="M52 110v28M78 114v24M112 114v24M138 110v28" stroke="#8b8f98" stroke-width="13"
    stroke-linecap="round"/>
  <path d="M38 62q-16-8-20 4 9 2 11 11" fill="none" stroke="#8b8f98" stroke-width="3"
    stroke-linecap="round"/>
  <circle cx="158" cy="62" r="34" fill="#c9cdd5" stroke="#8b8f98" stroke-width="3"/>
  <ellipse cx="142" cy="56" rx="20" ry="26" fill="#eec3cf" stroke="#8b8f98" stroke-width="2.6"/>
  <path d="M184 80q11 22 3 40-5 11-15 9" fill="none" stroke="#8b8f98" stroke-width="12"
    stroke-linecap="round"/>
  <path d="M170 92q9 9 18 6" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
  <circle cx="170" cy="50" r="6" fill="#fff" stroke="#3a3a44" stroke-width="2"/>
  <circle cx="171" cy="50" r="2.8" fill="#2b2b33"/>
</svg>`;

/* ---- quyển truyện, cái bút ---- */
const TRUYEN78 = `<svg viewBox="0 0 90 110" class="b78-art">
  <path d="M14 10h62v92H14z" fill="#f6b93b" stroke="#c07d10" stroke-width="3"/>
  <path d="M14 10h10v92H14z" fill="#e8552f" stroke="#a5321a" stroke-width="2.6"/>
  <path d="M34 30h32M34 44h32M34 58h22" stroke="#a5741a" stroke-width="3" stroke-linecap="round"/>
</svg>`;
const BUT78 = `<svg viewBox="0 0 34 110" class="b78-art">
  <path d="M9 26h16v66H9z" fill="#57cdf5" stroke="#1f7fa5" stroke-width="2.4"/>
  <path d="M9 26h16l-8-16z" fill="#e8b07f" stroke="#a5642f" stroke-width="2.4"/>
  <path d="M13 15h8l-4-5z" fill="#3a3a44"/>
  <path d="M9 92h16v12H9z" fill="#e8552f" stroke="#a5321a" stroke-width="2.4"/>
</svg>`;

BANKS.b78 = [

/* ===== tr.118 – Luyện tập 1, Bài 1: Đặt tính rồi tính ===== */
() => {
  const q = Q(1, 'Đặt tính rồi tính.');
  /* số có ba chữ số nhân số có một chữ số, tích có bốn chữ số */
  const b1 = R(3, 9);
  const a1 = R(Math.ceil(1000 / b1), 999);
  /* số có bốn chữ số nhân số có một chữ số, tích có năm chữ số */
  const b2 = R(2, 9);
  const a2 = R(Math.max(1000, Math.ceil(10000 / b2)), Math.min(9999, Math.floor(99999 / b2)));
  /* số có bốn chữ số chia hết cho số có một chữ số */
  const b3 = R(3, 9);
  const t3 = R(Math.ceil(1000 / b3), 999);
  /* số có năm chữ số chia cho số có một chữ số, có dư */
  const b4 = R(3, 9);
  const t4 = R(Math.ceil(10000 / b4), 9999);
  const r4 = R(1, b4 - 1);

  const its = [
    {k: 'n', a: a1, b: b1, r: a1 * b1},
    {k: 'n', a: a2, b: b2, r: a2 * b2},
    {k: 'c', a: t3 * b3, b: b3, t: t3, du: 0},
    {k: 'c', a: t4 * b4 + r4, b: b4, t: t4, du: r4}
  ];
  const chu = o => o.k === 'n' ? `${SP78(o.a)} × ${o.b}` : `${SP78(o.a)} : ${o.b}`;
  const khung = o => o.k === 'n'
    ? ART.b78Mul(o.a, o.b, q.num(o.r))
    : ART.b78Div(o.a, o.b, q.num(o.t), o.du ? `(dư ${q.num(o.du, 1)})` : '');
  const html = '<div class="b78-exp">' + its.map(o => `<span>${chu(o)}</span>`).join('') + '</div>'
    + '<div class="b78-row">' + its.map(khung).join('') + '</div>';
  return q.done(html, its.map(o => o.k === 'n'
    ? `${SP78(o.a)} × ${o.b} = ${SP78(o.r)}`
    : `${SP78(o.a)} : ${o.b} = ${SP78(o.t)}` + (o.du ? ` (dư ${o.du})` : '')).join(';  '));
},

/* ===== tr.118 – Luyện tập 1, Bài 2: những phép tính nào có kết quả bằng nhau ===== */
() => {
  const q = Q(2, 'Những phép tính nào dưới đây có kết quả bằng nhau?');
  /* c có hai cách phân tích thành tích hai thừa số một chữ số */
  const CAP78 = {12: [[2, 6], [3, 4]], 16: [[2, 8], [4, 4]], 18: [[2, 9], [3, 6]],
    24: [[3, 8], [4, 6]], 36: [[4, 9], [6, 6]]};
  const c = pick([12, 16, 18, 24, 36]);
  const V = c * 1000;
  const cap = CAP78[c];
  const dv = V * 3 <= 99000 ? R(2, 3) : 2;

  /* hai phép tính có kết quả khác V và khác nhau */
  const kk = R(3, 9), dd = R(2, 9);                       /* kk × 1 000 luôn bé hơn V */
  const CAND78 = [[2, 5], [3, 5], [3, 7], [4, 5], [5, 7], [5, 8], [7, 8], [2, 7], [4, 7],
    [5, 9], [7, 9], [6, 7], [3, 9], [5, 6], [8, 9], [4, 8], [6, 8]].filter(x => x[0] * x[1] !== c);
  const pm = pick(CAND78);

  const bang = b78Mix([
    {t: `${SP78(cap[0][0] * 1000)} × ${cap[0][1]}`, v: V},
    {t: `${SP78(cap[1][0] * 1000)} × ${cap[1][1]}`, v: V},
    {t: `${SP78(V * dv)} : ${dv}`, v: V},
    {t: `${SP78(pm[0] * 1000)} × ${pm[1]}`, v: pm[0] * pm[1] * 1000},
    {t: `${SP78(kk * dd * 1000)} : ${dd}`, v: kk * 1000}
  ]);
  const CHU = ['A', 'B', 'C', 'D', 'E'];
  const dung = bang.map((x, i) => x.v === V ? CHU[i] : '').filter(x => x);

  const html = '<div class="b78-vois">' + bang.map((x, i) =>
      `<div>${ART.b78Voi()}<div class="b78-vexp">${x.t}</div>
        <div class="b78-vlet">${CHU[i]}</div></div>`).join('') + '</div>'
    + `<div class="fill-line b78-wide">Những phép tính có kết quả bằng nhau:
        ${q.pick(b78Set(dung), CHU)}</div>
       <div class="b78-line">Kết quả bằng nhau đó là ${q.num(V)}.</div>`;
  return q.done(html,
    bang.map((x, i) => `${CHU[i]}: ${x.t} = ${SP78(x.v)}`).join(';  ')
    + `. Vậy ${dung.join(', ')} có kết quả bằng nhau và cùng bằng ${SP78(V)}.`);
},

/* ===== tr.118 – Luyện tập 1, Bài 3: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  /* a) A × b : c  (A chia hết cho c nên tích chia hết cho c) */
  const ca = R(2, 9), ba = R(2, 9);
  const ka = R(Math.ceil(1000 / ca), Math.floor(9999 / ca));
  const Aa = ka * ca, giuaA = Aa * ba, resA = ka * ba;
  /* b) A : (b × c) */
  const cap = pick([[2, 2], [2, 3], [3, 2], [2, 4], [4, 2], [3, 3]]);
  const tich = cap[0] * cap[1];
  const tb = R(Math.ceil(10000 / tich), 9999);
  const Ab = tb * tich;

  const html = `<div class="b78-two">
      <div class="b78-line"><span class="b78-let">a)</span>${SP78(Aa)} × ${ba} : ${ca}
        = ${q.num(giuaA)} : ${ca} = ${q.num(resA)}</div>
      <div class="b78-line"><span class="b78-let">b)</span>${SP78(Ab)} : (${cap[0]} × ${cap[1]})
        = ${SP78(Ab)} : ${q.num(tich, String(tich).length)} = ${q.num(tb)}</div>
    </div>`;
  return q.done(html,
    `a) ${SP78(Aa)} × ${ba} = ${SP78(giuaA)};  ${SP78(giuaA)} : ${ca} = ${SP78(resA)}. `
    + `b) ${cap[0]} × ${cap[1]} = ${tich};  ${SP78(Ab)} : ${tich} = ${SP78(tb)}.`);
},

/* ===== tr.118 – Luyện tập 1, Bài 4: Việt mua truyện thiếu nhi và bút ===== */
() => {
  const q = Q(4, '');
  const truyen = R(15, 25) * 1000;
  const but = R(50, 95) * 100;
  const sl = R(2, 3);
  const tienBut = but * sl;
  const tong = truyen + tienBut;
  const html = `<p class="wordq">Việt mua 1 quyển truyện thiếu nhi và ${sl} cái bút.
      Giá 1 quyển truyện thiếu nhi là ${SP78(truyen)} đồng, giá 1 cái bút là ${SP78(but)} đồng.
      Hỏi Việt phải trả người bán hàng bao nhiêu tiền?</p>
    <div class="b78-row">${TRUYEN78}${Array.from({length: sl}, () => BUT78).join('')}</div>
    <div class="bullet">${sl} cái bút giá ${q.num(tienBut)} đồng.</div>
    <div class="bullet">Việt phải trả người bán hàng ${q.num(tong)} đồng.</div>`;
  return q.done(html,
    `Tiền mua ${sl} cái bút: ${SP78(but)} × ${sl} = ${SP78(tienBut)} (đồng). `
    + `Việt phải trả: ${SP78(truyen)} + ${SP78(tienBut)} = ${SP78(tong)} (đồng).`);
},

/* ===== tr.119 – Luyện tập 2, Bài 1: Chọn câu trả lời đúng ===== */
() => {
  const q = Q(1, 'Chọn câu trả lời đúng.');
  /* a) tích của một số có bốn chữ số và một số có một chữ số */
  const ba = R(3, 9);
  const Aa = R(Math.max(1000, Math.ceil(10000 / ba)), Math.min(9999, Math.floor(99999 / ba)));
  const resA = Aa * ba;
  /* b) thương của một số có năm chữ số và một số có một chữ số */
  const bb = R(3, 9);
  const tb = R(Math.ceil(10000 / bb), 9999);
  const Ab = tb * bb;
  /* c) giá trị của biểu thức A : (b × c) */
  const cap = pick([[2, 3], [3, 2], [2, 4], [4, 2], [3, 3], [2, 2]]);
  const tich = cap[0] * cap[1];
  const tc = R(Math.ceil(10000 / tich), 9999);
  const Ac = tc * tich;

  const cau = (nhan, dung) => {
    const all = b78Mix([dung].concat(khac78(dung, 3)));
    const ans = LET78[all.indexOf(dung)];
    return {nhan, dung, all, ans};
  };
  const A = cau(`Tích của ${SP78(Aa)} và ${ba} là:`, resA);
  const B = cau(`Thương của ${SP78(Ab)} và ${bb} là:`, tb);
  const C = cau(`Giá trị của biểu thức ${SP78(Ac)} : (${cap[0]} × ${cap[1]}) là:`, tc);

  const khoi = (l, o) => `<div class="b78-sub"><span class="b78-let">${l})</span>${o.nhan}</div>
    <div class="b78-mcq">${o.all.map((v, i) =>
      `<span><i>${LET78[i]}.</i>${SP78(v)}</span>`).join('')}</div>
    <div class="fill-line b78-wide">Chọn: ${q.pick(o.ans, LET78)}</div>`;
  return q.done(khoi('a', A) + khoi('b', B) + khoi('c', C),
    `a) ${SP78(Aa)} × ${ba} = ${SP78(resA)} nên chọn ${A.ans}. `
    + `b) ${SP78(Ab)} : ${bb} = ${SP78(tb)} nên chọn ${B.ans}. `
    + `c) ${cap[0]} × ${cap[1]} = ${tich};  ${SP78(Ac)} : ${tich} = ${SP78(tc)} nên chọn ${C.ans}.`);
},

/* ===== tr.119 – Luyện tập 2, Bài 2: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(2, 'Tính giá trị của biểu thức.');
  /* a) (A + B) × c */
  const sa = R(3, 12) * 1000;
  const Aa = R(1, sa / 1000 - 1) * 1000, Ba = sa - Aa;
  const ca = R(2, Math.min(9, Math.floor(99000 / sa)));
  /* b) A : b × c */
  const bb = R(2, 9), tb = R(1, 9) * 1000, cb = R(2, 9);
  const Ab = bb * tb;
  /* c) (A − B) : c */
  const cc = R(2, 9), tc = R(1, 9) * 1000, Bc = R(1, 9) * 1000;
  const hieu = tc * cc, Ac = hieu + Bc;
  /* d) A × (b × c) */
  const cap = pick([[2, 2], [2, 3], [3, 2], [2, 4], [4, 2], [3, 3]]);
  const tich = cap[0] * cap[1];
  const Ad = R(1, Math.min(9, Math.floor(99 / tich))) * 1000;

  const html = `<div class="b78-two">
      <div class="b78-line"><span class="b78-let">a)</span>(${SP78(Aa)} + ${SP78(Ba)}) × ${ca}
        = ${q.num(sa)} × ${ca} = ${q.num(sa * ca)}</div>
      <div class="b78-line"><span class="b78-let">b)</span>${SP78(Ab)} : ${bb} × ${cb}
        = ${q.num(tb)} × ${cb} = ${q.num(tb * cb)}</div>
      <div class="b78-line"><span class="b78-let">c)</span>(${SP78(Ac)} &minus; ${SP78(Bc)}) : ${cc}
        = ${q.num(hieu)} : ${cc} = ${q.num(tc)}</div>
      <div class="b78-line"><span class="b78-let">d)</span>${SP78(Ad)} × (${cap[0]} × ${cap[1]})
        = ${SP78(Ad)} × ${q.num(tich, String(tich).length)} = ${q.num(Ad * tich)}</div>
    </div>`;
  return q.done(html,
    `a) ${SP78(Aa)} + ${SP78(Ba)} = ${SP78(sa)};  ${SP78(sa)} × ${ca} = ${SP78(sa * ca)}. `
    + `b) ${SP78(Ab)} : ${bb} = ${SP78(tb)};  ${SP78(tb)} × ${cb} = ${SP78(tb * cb)}. `
    + `c) ${SP78(Ac)} &minus; ${SP78(Bc)} = ${SP78(hieu)};  ${SP78(hieu)} : ${cc} = ${SP78(tc)}. `
    + `d) ${cap[0]} × ${cap[1]} = ${tich};  ${SP78(Ad)} × ${tich} = ${SP78(Ad * tich)}.`);
},

/* ===== tr.119 – Luyện tập 2, Bài 3: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(3, 'Tính giá trị của biểu thức.');
  /* a) A × b × c */
  const cap = pick([[2, 2], [2, 3], [3, 2], [2, 4], [4, 2], [3, 3]]);
  const tich = cap[0] * cap[1];
  const Aa = R(1000, Math.min(9999, Math.floor(99999 / tich)));
  /* b) A + B + C */
  const Ab = R(100, 999), Bb = R(1000, 9999), Cb = R(1000, 9999);

  const html = `<div class="b78-two">
      <div class="b78-line"><span class="b78-let">a)</span>${SP78(Aa)} × ${cap[0]} × ${cap[1]}
        = ${q.num(Aa * cap[0])} × ${cap[1]} = ${q.num(Aa * tich)}</div>
      <div class="b78-line"><span class="b78-let">b)</span>${SP78(Ab)} + ${SP78(Bb)} + ${SP78(Cb)}
        = ${q.num(Ab + Bb)} + ${SP78(Cb)} = ${q.num(Ab + Bb + Cb)}</div>
    </div>`;
  return q.done(html,
    `a) ${SP78(Aa)} × ${cap[0]} = ${SP78(Aa * cap[0])};  `
    + `${SP78(Aa * cap[0])} × ${cap[1]} = ${SP78(Aa * tich)}. `
    + `b) ${SP78(Ab)} + ${SP78(Bb)} = ${SP78(Ab + Bb)};  `
    + `${SP78(Ab + Bb)} + ${SP78(Cb)} = ${SP78(Ab + Bb + Cb)}.`);
},

/* ===== tr.119 – Luyện tập 2, Bài 4: cô Hoa mua gạo ===== */
() => {
  const q = Q(4, '');
  const gia = R(12, 19) * 1000;
  const n1 = R(3, 5), n2 = R(2, 4);
  const tong = n1 * gia, tra = n2 * gia;
  const html = `<p class="wordq">Cô Hoa mua ${n1} kg gạo hết ${SP78(tong)} đồng. Hỏi:</p>
    <div class="fill-line"><span class="b78-let">a)</span>Mỗi ki-lô-gam gạo như vậy giá bao nhiêu tiền?
      ${q.num(gia)} đồng</div>
    <div class="fill-line"><span class="b78-let">b)</span>Bác Hiền mua ${n2} kg gạo như thế thì bác Hiền
      phải trả người bán hàng bao nhiêu tiền? ${q.num(tra)} đồng</div>`;
  return q.done(html,
    `a) Giá mỗi ki-lô-gam gạo: ${SP78(tong)} : ${n1} = ${SP78(gia)} (đồng). `
    + `b) Bác Hiền phải trả: ${SP78(gia)} × ${n2} = ${SP78(tra)} (đồng).`);
},

/* ===== tr.119 – Luyện tập 2, Bài 5: tuổi bố gấp mấy lần tuổi Nam ===== */
() => {
  const q = Q(5, '');
  const nam = R(7, 10), lan = R(3, 5);
  const bo = nam * lan, hon = bo - nam;
  const html = `<p class="wordq">Năm nay Nam ${nam} tuổi, bố hơn Nam ${hon} tuổi.
      Hỏi năm nay, tuổi bố gấp mấy lần tuổi Nam?</p>
    <div class="bullet">Năm nay bố ${q.num(bo)} tuổi.</div>
    <div class="bullet">Tuổi bố gấp ${q.num(lan)} lần tuổi Nam.</div>`;
  return q.done(html,
    `Tuổi bố: ${nam} + ${hon} = ${bo} (tuổi). `
    + `Tuổi bố gấp tuổi Nam số lần là: ${bo} : ${nam} = ${lan} (lần).`);
},

/* ===== tr.120 – Luyện tập 3, Bài 1: Chọn câu trả lời đúng ===== */
() => {
  const q = Q(1, 'Chọn câu trả lời đúng.');
  const CHU = ['A', 'B', 'C'];
  /* a) phép nhân nào có kết quả lớn nhất */
  const ms = b78Mix([5, 6, 7, 8, 9]).slice(0, 3);
  const as = ms.map(() => R(1200, 1900));
  for (let i = 1; i < 3; i++){
    let g = 0;
    while (g++ < 80 && as.slice(0, i).some((x, j) => x * ms[j] === as[i] * ms[i])) as[i]++;
  }
  const tich = as.map((x, i) => x * ms[i]);
  const maxV = Math.max(...tich);
  const ansA = CHU[tich.indexOf(maxV)];
  /* b) phép chia nào có kết quả bé nhất */
  const ds = b78Mix([3, 4, 6, 7, 8, 9]).slice(0, 3);
  const ts = ds.map(() => R(4500, 6500));
  for (let i = 1; i < 3; i++){
    let g = 0;
    while (g++ < 80 && ts.slice(0, i).includes(ts[i])) ts[i]++;
  }
  const minV = Math.min(...ts);
  const ansB = CHU[ts.indexOf(minV)];

  const html = `<div class="b78-sub"><span class="b78-let">a)</span>Phép tính nào dưới đây
      có kết quả lớn nhất?</div>
    <div class="b78-mcq">${as.map((x, i) =>
      `<span><i>${CHU[i]}.</i>${SP78(x)} × ${ms[i]}</span>`).join('')}</div>
    <div class="fill-line b78-wide">Chọn: ${q.pick(ansA, CHU)}</div>
    <div class="b78-sub"><span class="b78-let">b)</span>Phép tính nào dưới đây
      có kết quả bé nhất?</div>
    <div class="b78-mcq">${ts.map((t, i) =>
      `<span><i>${CHU[i]}.</i>${SP78(t * ds[i])} : ${ds[i]}</span>`).join('')}</div>
    <div class="fill-line b78-wide">Chọn: ${q.pick(ansB, CHU)}</div>`;
  return q.done(html,
    'a) ' + tich.map((v, i) => `${CHU[i]} = ${SP78(v)}`).join('; ')
    + ` nên ${ansA} có kết quả lớn nhất. `
    + 'b) ' + ts.map((v, i) => `${CHU[i]} = ${SP78(v)}`).join('; ')
    + ` nên ${ansB} có kết quả bé nhất.`);
},

/* ===== tr.120 – Luyện tập 3, Bài 2: Tính giá trị của biểu thức ===== */
() => {
  const q = Q(2, 'Tính giá trị của biểu thức.');
  /* a) A × b − C */
  const ba = R(2, 9);
  const Aa = R(Math.max(1000, Math.ceil(10000 / ba)), 9999);
  const Ca = R(1000, 9999);
  const tichA = Aa * ba;
  /* b) A : b + C */
  const bb = R(2, 9), tb = R(1000, 5000), Cb = R(10, 95) * 100;
  const Ab = tb * bb;
  /* c) (A + B) × c */
  const Ac = R(100, 999), Bc = R(1000, 9999), cc = R(2, 9);
  const tongC = Ac + Bc;
  /* d) A − B : c */
  const cd = R(3, 9), td = R(1000, 5000);
  const Bd = td * cd;
  const Ad = R(Math.max(10000, td + 1000), 99999);

  const html = `<div class="b78-two">
      <div class="b78-line"><span class="b78-let">a)</span>${SP78(Aa)} × ${ba} &minus; ${SP78(Ca)}
        = ${q.num(tichA)} &minus; ${SP78(Ca)} = ${q.num(tichA - Ca)}</div>
      <div class="b78-line"><span class="b78-let">b)</span>${SP78(Ab)} : ${bb} + ${SP78(Cb)}
        = ${q.num(tb)} + ${SP78(Cb)} = ${q.num(tb + Cb)}</div>
      <div class="b78-line"><span class="b78-let">c)</span>(${SP78(Ac)} + ${SP78(Bc)}) × ${cc}
        = ${q.num(tongC)} × ${cc} = ${q.num(tongC * cc)}</div>
      <div class="b78-line"><span class="b78-let">d)</span>${SP78(Ad)} &minus; ${SP78(Bd)} : ${cd}
        = ${SP78(Ad)} &minus; ${q.num(td)} = ${q.num(Ad - td)}</div>
    </div>`;
  return q.done(html,
    `a) ${SP78(Aa)} × ${ba} = ${SP78(tichA)};  ${SP78(tichA)} &minus; ${SP78(Ca)} = ${SP78(tichA - Ca)}. `
    + `b) ${SP78(Ab)} : ${bb} = ${SP78(tb)};  ${SP78(tb)} + ${SP78(Cb)} = ${SP78(tb + Cb)}. `
    + `c) ${SP78(Ac)} + ${SP78(Bc)} = ${SP78(tongC)};  ${SP78(tongC)} × ${cc} = ${SP78(tongC * cc)}. `
    + `d) ${SP78(Bd)} : ${cd} = ${SP78(td)};  ${SP78(Ad)} &minus; ${SP78(td)} = ${SP78(Ad - td)}.`);
},

/* ===== tr.120 – Luyện tập 3, Bài 3: cửa hàng gạo ===== */
() => {
  const q = Q(3, '');
  const lan = R(2, 6), conLai = R(150, 900);
  const tong = conLai * lan;
  const html = `<p class="wordq">Một cửa hàng có ${SP78(tong)} kg gạo, sau khi bán thì số gạo
      giảm đi ${lan} lần. Hỏi cửa hàng đó còn lại bao nhiêu ki-lô-gam gạo?</p>
    <div class="bullet">Cửa hàng đó còn lại ${q.num(conLai)} kg gạo.</div>`;
  return q.done(html,
    `Số gạo giảm đi ${lan} lần nghĩa là lấy số gạo ban đầu chia cho ${lan}: `
    + `${SP78(tong)} : ${lan} = ${SP78(conLai)} (kg).`);
},

/* ===== tr.120 – Luyện tập 3, Bài 4: bác Hải mua gạch ===== */
() => {
  const q = Q(4, '');
  const duTinh = R(75, 95) * 1000;
  const lan = R(3, 4);
  const moi = R(120, Math.min(195, Math.floor((duTinh - 5000) / (lan * 100)))) * 100;
  const daMua = lan * moi;
  const conLai = duTinh - daMua;
  const html = `<p class="wordq">Bác Hải dự tính xây một ngôi nhà hết ${SP78(duTinh)} viên gạch.
      Bác Hải đã mua ${lan} lần, mỗi lần ${SP78(moi)} viên gạch. Hỏi theo dự tính, bác Hải còn phải
      mua bao nhiêu viên gạch nữa?</p>
    <div class="bullet">Bác Hải đã mua ${q.num(daMua)} viên gạch.</div>
    <div class="bullet">Bác Hải còn phải mua ${q.num(conLai)} viên gạch nữa.</div>`;
  return q.done(html,
    `Số gạch đã mua: ${SP78(moi)} × ${lan} = ${SP78(daMua)} (viên). `
    + `Số gạch còn phải mua: ${SP78(duTinh)} &minus; ${SP78(daMua)} = ${SP78(conLai)} (viên).`);
},

/* ===== tr.120 – Luyện tập 3, Bài 5: Đố bạn – chọn dấu "×; :" ===== */
() => {
  const q = Q(5, 'Đố bạn.<br>Chọn dấu phép tính "×; :" thích hợp thay cho dấu "?".');
  const DAU = ['×', ':'];
  const cap = pick([[4, 2], [6, 2], [6, 3], [8, 2], [8, 4], [9, 3]]);
  const a = cap[0], b = cap[1];
  const dang = R(1, 2);
  let N, kq, d1, d2;
  if (dang === 1){
    /* N : (a × b) = kq — ba cách chọn dấu còn lại đều cho kết quả khác kq */
    kq = R(2, 9);
    N = kq * a * b;
    d1 = ':'; d2 = '×';
  } else {
    /* N × (a : b) = kq — a chia hết cho b và a khác b nên đáp án là duy nhất */
    N = R(2, 12);
    kq = N * (a / b);
    d1 = '×'; d2 = ':';
  }
  const html = `<div class="b78-do">${N} ${q.pick(d1, DAU)} (${a} ${q.pick(d2, DAU)} ${b}) = ${kq}</div>
    <div class="hint-line">Chạm để chọn dấu "×" hoặc ":" cho mỗi ô "?"</div>`;
  return q.done(html, dang === 1
    ? `${a} × ${b} = ${a * b};  ${N} : ${a * b} = ${kq}. `
      + `Vậy ô thứ nhất là dấu ":", ô thứ hai là dấu "×".`
    : `${a} : ${b} = ${a / b};  ${N} × ${a / b} = ${kq}. `
      + `Vậy ô thứ nhất là dấu "×", ô thứ hai là dấu ":".`);
},
];
