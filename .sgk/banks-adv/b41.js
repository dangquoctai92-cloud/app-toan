/* ===== NÂNG CAO — Bài 41: Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000 ===== */

/* một phép nhân có tích không quá max */
const b41advMul = max => {
  const b = R(2, 9), a = R(11, Math.floor(max / b));
  return {t:`${a} × ${b}`, v:a * b};
};

/* một phép chia hết có số bị chia không quá max */
const b41advDiv = max => {
  const b = R(2, 9), t = R(11, Math.floor(max / b));
  return {t:`${b * t} : ${b}`, v:t};
};

/* phép nhân hoặc phép chia có giá trị đúng bằng v */
const b41advFrom = v => {
  const ds = [];
  for (let b = 2; b <= 9; b++) if (v % b === 0 && v / b >= 2) ds.push(b);
  if (R(1, 2) === 1 && ds.length){ const b = pick(ds); return {t:`${v / b} × ${b}`, v}; }
  const b2 = R(2, 9);
  if (v * b2 <= 999) return {t:`${v * b2} : ${b2}`, v};
  if (ds.length){ const b = pick(ds); return {t:`${v / b} × ${b}`, v}; }
  return {t:String(v), v};
};

ADV.b41 = [

/* 1. Tìm thành phần chưa biết của phép nhân, phép chia */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho ô trống.');
  const k1 = R(2, 9), x1 = R(101, Math.floor(999 / k1));
  const d2 = R(2, 9), t2 = R(101, Math.floor(999 / d2)), x2 = t2 * d2;
  const d3 = R(2, 9), t3 = R(30, Math.floor(999 / d3)), x3 = d3 * t3;
  const k4 = R(2, 9), x4 = R(11, Math.floor(880 / k4)), m4 = R(11, 99);
  return q.done(`<div class="b41adv-eq"><b>a)</b> ${q.num(x1)} × ${k1} = ${x1 * k1}</div>
    <div class="b41adv-eq"><b>b)</b> ${q.num(x2)} : ${d2} = ${t2}</div>
    <div class="b41adv-eq"><b>c)</b> ${x3} : ${q.num(d3, 1)} = ${t3}</div>
    <div class="b41adv-eq"><b>d)</b> ${q.num(x4)} × ${k4} + ${m4} = ${x4 * k4 + m4}</div>
    <div class="hint-line">Muốn tìm thừa số chưa biết ta lấy tích chia cho thừa số kia.
      Muốn tìm số bị chia ta lấy thương nhân với số chia.
      Muốn tìm số chia ta lấy số bị chia chia cho thương.</div>`,
    `a) ${x1 * k1} : ${k1} = ${x1}.  b) ${t2} × ${d2} = ${x2}.  c) ${x3} : ${t3} = ${d3}.  `
    + `d) ${x4 * k4 + m4} − ${m4} = ${x4 * k4}; ${x4 * k4} : ${k4} = ${x4}.`);
},

/* 2. Suy luận về số dư và số bị chia */
() => {
  const q = Q(2, 'Trả lời các câu hỏi sau.');
  const d = R(3, 9), t = R(30, Math.floor((1000 - d) / d));
  const be = t * d, lon = t * d + d - 1;
  return q.done(`<p class="wordq">Một phép chia có số chia là ${d} và thương là ${t}.</p>
    <div class="fill-line">Số dư lớn nhất có thể của phép chia đó là ${q.num(d - 1, 1)}</div>
    <div class="fill-line">Số bị chia bé nhất có thể là ${q.num(be)}</div>
    <div class="fill-line">Số bị chia lớn nhất có thể là ${q.num(lon)}</div>
    <div class="fill-line">Có tất cả ${q.num(d, 1)} số bị chia như vậy.</div>
    <div class="hint-line">Số dư luôn bé hơn số chia. Số bị chia bằng thương nhân với số chia
      rồi cộng với số dư.</div>`,
    `Số dư có thể là 0; 1; ...; ${d - 1} nên số dư lớn nhất là ${d - 1}.  `
    + `${t} × ${d} = ${be} là số bị chia bé nhất (phép chia hết);  `
    + `${be} + ${d - 1} = ${lon} là số bị chia lớn nhất.  Có ${d} số bị chia thoả mãn.`);
},

/* 3. So sánh giá trị của các biểu thức nhân, chia */
() => {
  const q = Q(3, 'Tính rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  for (let i = 0; i < 4; i++){
    const trai = i % 2 === 0 ? b41advMul(999) : b41advDiv(999);
    let v = trai.v + pick([-60, -18, -4, 0, 0, 4, 18, 60]);
    if (v < 2) v = trai.v + 6;
    let phai = i < 2 ? b41advFrom(v) : {t:String(v), v};
    for (let g = 0; g < 20 && phai.t === trai.t; g++) phai = b41advFrom(v);
    if (phai.t === trai.t) phai = {t:String(v), v};
    rows.push({t:trai.t, p:phai.t, l:trai.v, r:phai.v});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b41adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b41adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính giá trị của mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.t} = ${x.l}; ${x.p} = ${x.r}`).join('  ·  '));
},

/* 4. Bài toán ba bước: chia rồi trừ rồi nhân */
() => {
  const q = Q(4, '');
  const m = R(4, 9), n = R(8, Math.min(40, Math.floor(999 / m))), T = m * n, ban = R(2, n - 2);
  return q.done(`<p class="wordq">Một hiệu sách có ${T} quyển vở, xếp đều vào các thùng,
      mỗi thùng ${m} quyển. Hiệu sách đã bán được ${ban} thùng vở như thế.</p>
    <div class="bullet">Hiệu sách xếp được ${q.num(n)} thùng vở.</div>
    <div class="bullet">Hiệu sách đã bán được ${q.num(ban * m)} quyển vở.</div>
    <div class="bullet">Hiệu sách còn lại ${q.num(n - ban)} thùng vở.</div>
    <div class="bullet">Số vở còn lại là ${q.num((n - ban) * m)} quyển.</div>`,
    `${T} : ${m} = ${n} (thùng);  ${m} × ${ban} = ${ban * m} (quyển);  `
    + `${n} − ${ban} = ${n - ban} (thùng);  ${m} × ${n - ban} = ${(n - ban) * m} (quyển).`);
},

/* 5. Bài toán chia có dư: cần ít nhất bao nhiêu */
() => {
  const q = Q(5, '');
  const m = R(4, 9), t = R(4, 12), r = R(1, m - 1), tong = m * t + r;
  let A = R(Math.floor(tong / 3), Math.floor(tong * 2 / 3));
  if (A * 2 === tong) A = A + 1;
  const B = tong - A;
  return q.done(`<p class="wordq">Có ${A} bạn nam và ${B} bạn nữ cùng đi tham quan bằng thuyền.
      Mỗi chiếc thuyền chở được nhiều nhất ${m} bạn. Hỏi cần ít nhất bao nhiêu chiếc thuyền
      để chở hết số bạn đó?</p>
    <div class="bullet">Tất cả có ${q.num(tong)} bạn đi tham quan.</div>
    <div class="bullet">${tong} : ${m} = ${q.num(t)} (dư ${q.num(r, 1)})</div>
    <div class="bullet">Cần ít nhất ${q.num(t + 1)} chiếc thuyền.</div>
    <div class="hint-line">Còn thừa ra mấy bạn thì vẫn phải thêm một chiếc thuyền nữa.</div>`,
    `${A} + ${B} = ${tong} (bạn);  ${tong} : ${m} = ${t} (dư ${r}) nên còn ${r} bạn phải đi thêm `
    + `1 thuyền nữa: ${t} + 1 = ${t + 1} (chiếc thuyền).`);
},

/* 6. Chọn các phép tính có kết quả lớn hơn một số cho trước */
() => {
  const T = pick([100, 150, 200, 250, 300]);
  const q = Q(6, 'Quan sát các phép tính dưới đây rồi trả lời.');
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const nTren = R(2, 4);
  let items = [];
  for (let attempt = 0; attempt < 60; attempt++){
    items = [];
    for (let i = 0; i < 6; i++){
      const tren = i < nTren;
      let it = null;
      for (let g = 0; g < 300; g++){
        const c = R(1, 2) === 1 ? b41advMul(999) : b41advDiv(999);
        if (Math.abs(c.v - T) < 5) continue;
        if (tren !== (c.v > T)) continue;
        if (items.some(x => x.v === c.v)) continue;
        it = c; break;
      }
      if (!it) it = tren
        ? {t:`${T + 20 + i} × 2`, v:(T + 20 + i) * 2}
        : {t:`${(11 + i) * 3} : 3`, v:11 + i};
      items.push(it);
    }
    if (new Set(items.map(x => x.v)).size === 6) break;
  }
  const dat = items.sort(() => Math.random() - .5).map((x, i) => ({...x, L:L[i]}));
  const tren = dat.filter(x => x.v > T).map(x => x.L).sort();
  const maxV = Math.max(...dat.map(x => x.v));
  const maxL = dat.find(x => x.v === maxV).L;
  return q.done(`<div class="b41adv-grid">${dat.map(x =>
      `<div class="b41adv-cell"><em>${x.L}</em>${x.t}</div>`).join('')}</div>
    <div class="fill-line">Các phép tính có kết quả lớn hơn ${T} là: ${q.pick(tren.join(','), L)}</div>
    <div class="fill-line">Có ${q.num(tren.length, 1)} phép tính như vậy.</div>
    <div class="fill-line">Phép tính có kết quả lớn nhất là: ${q.pick(maxL, L)}</div>
    <div class="fill-line">Kết quả lớn nhất đó là ${q.num(maxV)}</div>`,
    dat.map(x => `${x.L}: ${x.t} = ${x.v}`).join(' · '));
},
];
