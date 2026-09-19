/* ===== NÂNG CAO — Bài 32: Mi-li-lít ===== */

/* bộ ca đong tăng nhanh: mọi tổng con đều khác nhau nên đáp án chọn ca là duy nhất */
const b32advCa = [400, 200, 100, 50];
const b32advTong = b32advCa.reduce((s, x) => s + x, 0);   // 750
const b32advLab = v => v + ' ml';

ADV.b32 = [

/* 1. Bài toán ngược: rót đều ra các cốc bằng nhau */
() => {
  const q = Q(1, '');
  const n = R(2, 4), x = pick([50, 100, 150]);
  const con = x + pick([50, 100]);
  const dau = n * x + con;
  return q.done(`<p class="wordq">Một bình đựng ${dau} ml nước. Người ta rót hết nước từ bình ra ${n} cốc
      như nhau thì trong bình còn lại ${con} ml nước.</p>
    <div class="fill-line">Số nước đã rót ra các cốc là ${q.num(n * x)} ml.</div>
    <div class="fill-line">Mỗi cốc có ${q.num(x)} ml nước.</div>
    <div class="fill-line">Nếu rót thêm một cốc như thế nữa thì trong bình còn lại ${q.num(con - x)} ml nước.</div>`,
    `${dau} − ${con} = ${n * x} (ml);  ${n * x} : ${n} = ${x} (ml);  ${con} − ${x} = ${con - x} (ml)`);
},

/* 2. So sánh các số đo dung tích */
() => {
  const q = Q(2, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const x = pick([1000, 1000, R(3, 9) * 100, R(2, 9) * 100 + R(1, 9) * 10]);
    rows.push({t:'1 <i>l</i>', p:`${x} ml`, l:1000, r:x, s:'1 l'});
  }
  {
    const a = R(10, 45) * 10, b = pick([100, 150, 200, 250, 300]);
    const c = pick([1000 - a - b, 1000 - a - b, 1000 - a - b + R(1, 5) * 10, 1000 - a - b - R(1, 5) * 10]);
    rows.push({t:`1 <i>l</i> − ${a + b} ml`, p:`${c} ml`, l:1000 - a - b, r:c, s:`1 l − ${a + b} ml`});
  }
  {
    const a = R(30, 120), k = R(2, 5);
    const b = pick([a * k, a * k, a * k + R(1, 25), a * k - R(1, 25)]);
    rows.push({t:`${a} ml × ${k}`, p:`${b} ml`, l:a * k, r:b, s:`${a} ml × ${k}`});
  }
  {
    const k = R(2, 5), m = R(30, 150), a = m * k;
    const b = pick([m, m, m + R(1, 20), m - R(1, 20)]);
    rows.push({t:`${a} ml : ${k}`, p:`${b} ml`, l:m, r:b, s:`${a} ml : ${k}`});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Đổi 1 <i>l</i> = 1 000 ml rồi tính giá trị mỗi vế · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.s} = ${x.l} ml`).join(' · '));
},

/* 3. Dãy số cách đều — lượng nước trong các cốc */
() => {
  const q = Q(3, 'Lượng nước trong các cốc xếp theo một quy luật. Viết số còn thiếu vào chỗ trống.');
  const st = pick([50, 100, 150, 200]), b = pick([25, 50, 75, 100]);
  const hide = [2, 4, 6];
  const seq = Array.from({length:7}, (_, i) => st + i * b);
  return q.done(`<div class="chain pill">${seq.map((v, i) =>
      `<span class="cnode${hide.includes(i) ? ' q' : ''}">${hide.includes(i) ? q.num(v) : v}</span>`).join('')}</div>
    <div class="fill-line">Hai cốc liền nhau hơn kém nhau ${q.num(b)} ml nước.</div>
    <div class="fill-line">Cốc thứ tám có ${q.num(st + 7 * b)} ml nước.</div>
    <div class="fill-line">Cốc thứ nhất và cốc thứ bảy có tất cả ${q.num(st + seq[6])} ml nước.</div>
    <div class="hint-line">Số đo trong dãy được viết theo đơn vị mi-li-lít.</div>`,
    `Dãy số cách đều ${b} ml. Cốc thứ tám = ${st} + ${b} × 7 = ${st + 7 * b} (ml)`);
},

/* 4. Bài toán ba bước: gấp một số lần và ít hơn */
() => {
  const q = Q(4, '');
  const a = pick([80, 100, 120]), k = R(2, 3), c = pick([20, 50]);
  const B = k * a, C = B - c;
  return q.done(`<p class="wordq">Ca A đựng ${a} ml nước. Ca B đựng số nước gấp ${k} lần ca A.
      Ca C đựng ít hơn ca B là ${c} ml nước.</p>
    <div class="fill-line">Ca B đựng ${q.num(B)} ml nước.</div>
    <div class="fill-line">Ca C đựng ${q.num(C)} ml nước.</div>
    <div class="fill-line">Cả ba ca đựng ${q.num(a + B + C)} ml nước.</div>
    <div class="fill-line">Ca C đựng nhiều hơn ca A là ${q.num(C - a)} ml nước.</div>`,
    `${a} × ${k} = ${B} (ml);  ${B} − ${c} = ${C} (ml);  ${a} + ${B} + ${C} = ${a + B + C} (ml);  `
    + `${C} − ${a} = ${C - a} (ml)`);
},

/* 5. Bài toán ngược với chai 1 lít */
() => {
  const q = Q(5, '');
  const a = pick([100, 150, 200]), c = pick([50, 100]), d = pick([100, 150, 200]);
  const B = a + c, C = 1000 - d - a - B;
  return q.done(`<p class="wordq">Một chai đựng đầy 1 <i>l</i> nước. Người ta rót nước từ chai đó ra ba cốc A,
      B và C. Cốc A có ${a} ml nước, cốc B có nhiều hơn cốc A ${c} ml nước, trong chai còn lại ${d} ml nước.</p>
    <div class="fill-line">Cốc B có ${q.num(B)} ml nước.</div>
    <div class="fill-line">Số nước đã rót ra ba cốc là ${q.num(1000 - d)} ml.</div>
    <div class="fill-line">Cốc C có ${q.num(C)} ml nước.</div>
    <div class="hint-line">1 <i>l</i> = 1 000 ml</div>`,
    `${a} + ${c} = ${B} (ml);  1 000 − ${d} = ${1000 - d} (ml);  `
    + `${1000 - d} − ${a} − ${B} = ${C} (ml)`);
},

/* 6. Chọn các ca để rót được đúng một lượng nước */
() => {
  const q = Q(6, 'Có bốn ca đựng nước như sau. Mỗi ca chỉ dùng nhiều nhất một lần.');
  const L = ['A', 'B', 'C', 'D'];
  const idx = [0, 1, 2, 3].sort(() => Math.random() - .5).slice(0, R(2, 3)).sort((u, v) => u - v);
  const chon = idx.map(i => b32advCa[i]);
  const tong = chon.reduce((s, x) => s + x, 0);
  return q.done(`<div class="given-nums">${b32advCa.map((v, i) =>
      `<span class="cnode">${L[i]}: ${v} ml</span>`).join('')}</div>
    <div class="fill-line">Các ca rót được đúng ${tong} ml nước là:
      ${q.pick(idx.map(i => L[i]).sort().join(','), L)}</div>
    <div class="fill-line">Những ca còn lại đựng tất cả ${q.num(b32advTong - tong)} ml nước.</div>
    <div class="fill-line">Cả bốn ca đựng ${q.num(b32advTong)} ml nước, còn thiếu
      ${q.num(1000 - b32advTong)} ml nữa thì được 1 <i>l</i>.</div>`,
    `${chon.join(' + ')} = ${tong} (ml);  ${b32advTong} − ${tong} = ${b32advTong - tong} (ml);  `
    + `1 000 − ${b32advTong} = ${1000 - b32advTong} (ml)`);
},
];
