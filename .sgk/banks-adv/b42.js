/* ===== NÂNG CAO — Bài 42: Ôn tập biểu thức số ===== */

const b42advDau = ['+', '−', '×', ':'];

const b42advAp = (x, o, y) => {
  if (o === '+') return x + y;
  if (o === '−') return x - y;
  if (o === '×') return x * y;
  return (y !== 0 && x % y === 0) ? x / y : null;
};

const b42advUu = o => (o === '×' || o === ':') ? 2 : 1;

/* giá trị của biểu thức a o1 b o2 c (nhân chia trước, cộng trừ sau);
   trả về null nếu chia không hết hoặc có kết quả âm */
const b42advTinh = (a, o1, b, o2, c) => {
  let r;
  if (b42advUu(o1) >= b42advUu(o2)){
    const v = b42advAp(a, o1, b);
    if (v === null || v < 0) return null;
    r = b42advAp(v, o2, c);
  } else {
    const v = b42advAp(b, o2, c);
    if (v === null || v < 0) return null;
    r = b42advAp(a, o1, v);
  }
  return (r === null || r < 0) ? null : r;
};

/* các cách chọn dấu để biểu thức có giá trị V */
const b42advCach = (a, b, c, V) => {
  const kq = [];
  b42advDau.forEach(o1 => b42advDau.forEach(o2 => {
    if (b42advTinh(a, o1, b, o2, c) === V) kq.push([o1, o2]);
  }));
  return kq;
};

/* một câu đố chọn dấu có duy nhất một đáp án */
const b42advDo = () => {
  for (let g = 0; g < 500; g++){
    const a = R(2, 40), b = R(2, 9), c = R(2, 9);
    const V = b42advTinh(a, pick(b42advDau), b, pick(b42advDau), c);
    if (V === null || V > 999) continue;
    if (V < 15) continue;
    const sol = b42advCach(a, b, c, V);
    if (sol.length !== 1) continue;
    if (!sol[0].some(o => o === '×' || o === ':')) continue;
    return {a, b, c, o1:sol[0][0], o2:sol[0][1], V};
  }
  return {a:7, b:3, c:2, o1:'×', o2:'−', V:19};
};

/* một biểu thức có giá trị đúng bằng v */
const b42advTu = v => {
  for (let g = 0; g < 60; g++){
    const k = R(1, 4);
    if (k === 1){
      const c = R(2, 9);
      if (v % c === 0 && v / c >= 12){ const s = v / c, a = R(5, s - 5); return {t:`(${a} + ${s - a}) × ${c}`, v}; }
    } else if (k === 2){
      const c = R(2, 9), y = R(2, 30);
      if (v - y * c >= 10) return {t:`${v - y * c} + ${y} × ${c}`, v};
    } else if (k === 3){
      const c = R(2, 9), y = R(2, 30);
      if (v + y * c <= 999) return {t:`${v + y * c} − ${y} × ${c}`, v};
    } else {
      const c = R(2, 9), y = R(10, 200);
      if (v >= 2 && v * c + y <= 999) return {t:`(${y + v * c} − ${y}) : ${c}`, v};
    }
  }
  return {t:String(v), v};
};

/* một biểu thức bất kì và giá trị của nó */
const b42advBt = () => {
  const k = R(1, 4);
  if (k === 1){
    const c = R(2, 9), s = R(12, Math.floor(600 / c)), a = R(5, s - 5);
    return {t:`(${a} + ${s - a}) × ${c}`, v:s * c};
  }
  if (k === 2){
    const b = R(11, 60), c = R(2, 9), a = R(20, 300);
    return {t:`${a} + ${b} × ${c}`, v:a + b * c};
  }
  if (k === 3){
    const c = R(2, 9), t = R(12, 60), b = R(10, 200), a = b + c * t;
    return {t:`(${a} − ${b}) : ${c}`, v:t};
  }
  const b = R(11, 60), c = R(2, 9), a = R(b * c + 12, 950);
  return {t:`${a} − ${b} × ${c}`, v:a - b * c};
};

ADV.b42 = [

/* 1. Tính giá trị của biểu thức có ba phép tính */
() => {
  const q = Q(1, 'Tính giá trị của biểu thức.');
  const c1 = R(2, 5), s1 = R(21, Math.floor(900 / c1)), a1 = R(10, s1 - 10), b1 = s1 - a1;
  const d1 = R(11, s1 * c1 - 10);
  const b2 = R(11, 40), c2 = R(2, 9), a2 = R(100, 500), d2 = R(20, 99);
  const c3 = R(2, 9), t3 = R(11, 60), b3 = R(10, 200), a3 = b3 + c3 * t3, d3 = R(11, 99);
  const d4 = R(2, 9), t4 = R(11, 60), s4 = d4 * t4, b4 = R(10, s4 - 10), c4 = s4 - b4,
    a4 = R(t4 + 20, 900);
  return q.done(`<div class="b42-two">
      <div>
        <div class="b42-ex"><span class="b42-let">a)</span>(${a1} + ${b1}) × ${c1} − ${d1}
          = ${q.num(s1 * c1 - d1)}</div>
        <div class="b42-ex"><span class="b42-let">b)</span>${a2} + ${b2} × ${c2} − ${d2}
          = ${q.num(a2 + b2 * c2 - d2)}</div>
      </div>
      <div>
        <div class="b42-ex"><span class="b42-let">c)</span>(${a3} − ${b3}) : ${c3} + ${d3}
          = ${q.num(t3 + d3)}</div>
        <div class="b42-ex"><span class="b42-let">d)</span>${a4} − (${b4} + ${c4}) : ${d4}
          = ${q.num(a4 - t4)}</div>
      </div>
    </div>
    <div class="hint-line">Trong biểu thức có dấu ngoặc thì tính trong ngoặc trước;
      nếu không có dấu ngoặc thì tính nhân, chia trước, cộng, trừ sau.</div>`,
    `a) ${a1} + ${b1} = ${s1}; ${s1} × ${c1} = ${s1 * c1}; ${s1 * c1} − ${d1} = ${s1 * c1 - d1}.  `
    + `b) ${b2} × ${c2} = ${b2 * c2}; ${a2} + ${b2 * c2} = ${a2 + b2 * c2}; `
    + `${a2 + b2 * c2} − ${d2} = ${a2 + b2 * c2 - d2}.  `
    + `c) ${a3} − ${b3} = ${c3 * t3}; ${c3 * t3} : ${c3} = ${t3}; ${t3} + ${d3} = ${t3 + d3}.  `
    + `d) ${b4} + ${c4} = ${s4}; ${s4} : ${d4} = ${t4}; ${a4} − ${t4} = ${a4 - t4}.`);
},

/* 2. Chọn dấu phép tính thích hợp (đáp án duy nhất) */
() => {
  const q = Q(2, 'Đố em!<br>Chọn dấu phép tính "+ ; − ; × ; :" thích hợp thay cho dấu "?".');
  const A = b42advDo();
  let B = b42advDo();
  for (let g = 0; g < 20 && B.a === A.a && B.b === A.b && B.c === A.c; g++) B = b42advDo();
  const OP = b42advDau;
  return q.done(`<div class="b42-puz"><span class="b42-let">a)</span>
      ${A.a} ${q.pick(A.o1, OP)} ${A.b} ${q.pick(A.o2, OP)} ${A.c} = ${A.V}</div>
    <div class="b42-puz"><span class="b42-let">b)</span>
      ${B.a} ${q.pick(B.o1, OP)} ${B.b} ${q.pick(B.o2, OP)} ${B.c} = ${B.V}</div>
    <div class="hint-line">Nhớ tính nhân, chia trước rồi mới tính cộng, trừ.
      Chạm chọn dấu ở mỗi ô "?".</div>`,
    `a) ${A.a} ${A.o1} ${A.b} ${A.o2} ${A.c} = ${A.V}.  b) ${B.a} ${B.o1} ${B.b} ${B.o2} ${B.c} = ${B.V}.`);
},

/* 3. So sánh giá trị của hai biểu thức */
() => {
  const q = Q(3, 'Tính giá trị của mỗi biểu thức rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  for (let i = 0; i < 4; i++){
    const trai = b42advBt();
    let v = trai.v + pick([-90, -25, -6, 0, 0, 6, 25, 90]);
    if (v < 5) v = trai.v + 12;
    let phai = i === 3 ? {t:String(v), v} : b42advTu(v);
    if (phai.t === trai.t) phai = {t:String(v), v};
    rows.push({t:trai.t, p:phai.t, l:trai.v, r:phai.v});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b42adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b42adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.t} = ${x.l}; ${x.p} = ${x.r}`).join('  ·  '));
},

/* 4. Bài toán ba bước rồi viết thành một biểu thức */
() => {
  const q = Q(4, '');
  const b = R(20, 90), m = R(2, 4), a = R(b * (m + 1) + 20, 999);
  const chieu = b * m, ca = b + chieu, con = a - ca;
  return q.done(`<p class="wordq">Một cửa hàng có ${a} kg gạo. Buổi sáng cửa hàng bán được ${b} kg gạo,
      buổi chiều bán được số gạo gấp ${m} lần buổi sáng.
      Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?</p>
    <div class="bullet">Buổi chiều cửa hàng bán được ${q.num(chieu)} kg gạo.</div>
    <div class="bullet">Cả ngày cửa hàng bán được ${q.num(ca)} kg gạo.</div>
    <div class="bullet">Cửa hàng còn lại ${q.num(con)} kg gạo.</div>
    <div class="fill-line">Viết gộp lại: ${a} − (${b} + ${b} × ${m}) = ${q.num(con)} (kg)</div>`,
    `${b} × ${m} = ${chieu} (kg);  ${b} + ${chieu} = ${ca} (kg);  ${a} − ${ca} = ${con} (kg).`);
},

/* 5. Bài toán ngược: tìm số chưa biết trong biểu thức */
() => {
  const q = Q(5, 'Tìm số thích hợp thay cho ô trống.');
  const b1 = R(2, 9), s1 = R(22, Math.floor(999 / b1)), a1 = R(10, s1 - 11), X1 = s1 - a1;
  const V1 = s1 * b1;
  const b2 = R(2, 9), x2 = R(11, Math.floor(950 / b2)), a2 = R(10, x2 * b2 - 10);
  const b3 = R(2, 9), t3 = R(11, 60), a3 = R(10, 200), x3 = a3 + b3 * t3;
  const b4 = R(2, 9), t4 = R(11, Math.floor(999 / b4)), a4 = R(11, 99);
  return q.done(`<div class="b42-ex"><span class="b42-let">a)</span>
      (${q.num(X1)} + ${a1}) × ${b1} = ${V1}</div>
    <div class="b42-ex"><span class="b42-let">b)</span>
      ${q.num(x2)} × ${b2} − ${a2} = ${x2 * b2 - a2}</div>
    <div class="b42-ex"><span class="b42-let">c)</span>
      (${q.num(x3)} − ${a3}) : ${b3} = ${t3}</div>
    <div class="b42-ex"><span class="b42-let">d)</span>
      ${q.num(b4 * t4)} : ${b4} + ${a4} = ${t4 + a4}</div>
    <div class="hint-line">Hãy tính ngược lại từ kết quả: làm ngược thứ tự các phép tính.</div>`,
    `a) ${V1} : ${b1} = ${X1 + a1}; ${X1 + a1} − ${a1} = ${X1}.  `
    + `b) ${x2 * b2 - a2} + ${a2} = ${x2 * b2}; ${x2 * b2} : ${b2} = ${x2}.  `
    + `c) ${t3} × ${b3} = ${b3 * t3}; ${b3 * t3} + ${a3} = ${x3}.  `
    + `d) ${t4 + a4} − ${a4} = ${t4}; ${t4} × ${b4} = ${b4 * t4}.`);
},

/* 6. Chọn các biểu thức có giá trị bằng một số cho trước */
() => {
  const V = R(60, 300);
  const q = Q(6, `Những biểu thức nào dưới đây có giá trị bằng ${V}?`);
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const nOk = R(2, 3);
  const dat = [];
  for (let i = 0; i < 6; i++){
    let v = V;
    if (i >= nOk){
      v = V + pick([-40, -18, -7, 7, 18, 40]);
      if (v < 8) v = V + 20;
    }
    let e = b42advTu(v);
    for (let g = 0; g < 30 && dat.some(x => x.t === e.t); g++) e = b42advTu(v);
    dat.push(e);
  }
  const items = dat.sort(() => Math.random() - .5).map((x, i) => ({...x, L:L[i]}));
  const ok = items.filter(x => x.v === V).map(x => x.L).sort();
  return q.done(`<div class="b42adv-grid">${items.map(x =>
      `<div class="b42adv-cell"><em>${x.L}</em>${x.t}</div>`).join('')}</div>
    <div class="fill-line">Các biểu thức có giá trị bằng ${V} là: ${q.pick(ok.join(','), L)}</div>
    <div class="fill-line">Có ${q.num(ok.length, 1)} biểu thức như vậy.</div>`,
    items.map(x => `${x.L}: ${x.t} = ${x.v}`).join(' · '));
},
];
