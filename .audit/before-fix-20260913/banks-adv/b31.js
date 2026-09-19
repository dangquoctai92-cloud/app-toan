/* ===== NÂNG CAO — Bài 31: Gam ===== */

/* bộ quả cân tăng nhanh: mọi tổng con đều khác nhau nên đáp án chọn quả cân là duy nhất */
const b31advW = [500, 200, 100, 50, 20, 10];
const b31advTong = b31advW.reduce((s, x) => s + x, 0);   // 880
const b31advLab = g => g + ' g';

ADV.b31 = [

/* 1. Cân thăng bằng hai đĩa — bài toán ngược */
() => {
  const q = Q(1, 'Một cân đĩa đang thăng bằng như mô tả dưới đây.');
  const a = pick([200, 500]), b = pick([100, 200]), c = pick([50, 100]);
  const x = pick([20, 50, 100]);
  const tong = a + b + c, vat = tong - x;
  return q.done(`<div class="bullet">Đĩa bên trái có một gói đường và một quả cân ${x} g.</div>
    <div class="bullet">Đĩa bên phải có ba quả cân: ${a} g, ${b} g và ${c} g.</div>
    <div class="fill-line">Các quả cân ở đĩa bên phải cân nặng tất cả ${q.num(tong)} g.</div>
    <div class="fill-line">Gói đường cân nặng ${q.num(vat)} g.</div>
    <div class="fill-line">Gói đường nhẹ hơn 1 kg là ${q.num(1000 - vat)} g.</div>
    <div class="hint-line">Cân thăng bằng nên hai đĩa cân nặng bằng nhau · 1 kg = 1 000 g</div>`,
    `${a} + ${b} + ${c} = ${tong} (g);  ${tong} − ${x} = ${vat} (g);  1 000 − ${vat} = ${1000 - vat} (g)`);
},

/* 2. Chọn các quả cân thích hợp — tổng con là duy nhất */
() => {
  const q = Q(2, 'Chọn các quả cân thích hợp, mỗi quả cân chỉ dùng nhiều nhất một lần.');
  const idx = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - .5).slice(0, R(2, 3)).sort((u, v) => u - v);
  const chon = idx.map(i => b31advW[i]);
  const tong = chon.reduce((s, x) => s + x, 0);
  return q.done(`<div class="given-nums">${b31advW.map(g =>
      `<span class="cnode">${g} g</span>`).join('')}</div>
    <div class="fill-line">Các quả cân cân được đúng ${tong} g là:
      ${q.pick(chon.map(b31advLab).sort().join(','), b31advW.map(b31advLab))}</div>
    <div class="fill-line">Những quả cân còn lại cân nặng tất cả ${q.num(b31advTong - tong)} g.</div>
    <div class="fill-line">Cả sáu quả cân cân nặng ${q.num(b31advTong)} g.</div>`,
    `${chon.join(' + ')} = ${tong} (g);  ${b31advTong} − ${tong} = ${b31advTong - tong} (g)`);
},

/* 3. So sánh các số đo khối lượng */
() => {
  const q = Q(3, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const x = pick([1000, 1000, R(3, 9) * 100, R(2, 9) * 100 + R(1, 9) * 10]);
    rows.push({t:'1 kg', p:`${x} g`, l:1000, r:x});
  }
  {
    const a = R(12, 45) * 10, b = R(5, 30) * 10;
    const c = pick([a + b, a + b, a + b + R(1, 5) * 10, a + b - R(1, 5) * 10]);
    rows.push({t:`${a} g + ${b} g`, p:`${c} g`, l:a + b, r:c});
  }
  {
    const a = R(50, 120), k = R(2, 5);
    const b = pick([a * k, a * k, a * k + R(1, 30), a * k - R(1, 30)]);
    rows.push({t:`${a} g × ${k}`, p:`${b} g`, l:a * k, r:b});
  }
  {
    const k = R(2, 5), m = R(30, 150), a = m * k;
    const b = pick([m, m, m + R(1, 20), m - R(1, 20)]);
    rows.push({t:`${a} g : ${k}`, p:`${b} g`, l:m, r:b});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Đổi 1 kg = 1 000 g rồi tính giá trị mỗi vế · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.t} = ${x.l} g`).join(' · '));
},

/* 4. Bài toán ba bước */
() => {
  const q = Q(4, '');
  const m = R(2, 4), x = pick([50, 100, 150]), d = pick([100, 200, 250, 300]);
  const goi = m * x, tong = goi + d;
  return q.done(`<p class="wordq">Mẹ mua ${m} gói mì chính, mỗi gói cân nặng ${x} g và mua thêm
      một túi đường cân nặng ${d} g.</p>
    <div class="fill-line">${m} gói mì chính cân nặng ${q.num(goi)} g.</div>
    <div class="fill-line">Mẹ đã mua tất cả ${q.num(tong)} g hàng.</div>
    <div class="fill-line">Số hàng mẹ mua nhẹ hơn 1 kg là ${q.num(1000 - tong)} g.</div>`,
    `${x} × ${m} = ${goi} (g);  ${goi} + ${d} = ${tong} (g);  1 000 − ${tong} = ${1000 - tong} (g)`);
},

/* 5. Tìm số đo theo nhiều điều kiện */
() => {
  const q = Q(5, 'Tìm cân nặng của gói hàng, biết:');
  const m = R(2, 9) * 100;
  const lo = m - pick([50, 60, 70, 80, 90]);
  const hi = m + pick([50, 60, 70, 80, 90]);
  return q.done(`<div class="bullet">Cân nặng của gói hàng là một số tròn trăm gam.</div>
    <div class="bullet">Cân nặng đó lớn hơn ${lo} g và bé hơn ${hi} g.</div>
    <div class="fill-line">Gói hàng cân nặng ${q.num(m)} g.</div>
    <div class="fill-line">Cần dùng ${q.num(m / 100, 1)} quả cân loại 100 g để cân đúng gói hàng đó.</div>
    <div class="fill-line">Gói hàng đó nhẹ hơn 1 kg là ${q.num(1000 - m)} g.</div>
    <div class="hint-line">Hãy viết các số tròn trăm lớn hơn ${lo} rồi chọn số bé hơn ${hi}.</div>`,
    `Số tròn trăm duy nhất lớn hơn ${lo} và bé hơn ${hi} là ${m}. `
    + `${m} : 100 = ${m / 100};  1 000 − ${m} = ${1000 - m} (g)`);
},

/* 6. Suy luận qua ba cân thăng bằng */
() => {
  const q = Q(6, 'Quan sát các cân thăng bằng sau rồi trả lời.');
  const x = pick([20, 30, 40, 50]);
  const k1 = R(2, 3), k2 = R(2, 3);
  const banh = k2 * x, sua = k1 * banh;
  return q.done(`<div class="bullet">Một hộp sữa cân nặng bằng ${k1} gói bánh.</div>
    <div class="bullet">Một gói bánh cân nặng bằng ${k2} thanh sô-cô-la.</div>
    <div class="bullet">Một thanh sô-cô-la cân nặng ${x} g.</div>
    <div class="fill-line">Một gói bánh cân nặng ${q.num(banh)} g.</div>
    <div class="fill-line">Một hộp sữa cân nặng ${q.num(sua)} g.</div>
    <div class="fill-line">Một hộp sữa cân nặng bằng ${q.num(k1 * k2, 1)} thanh sô-cô-la.</div>
    <div class="fill-line">Một hộp sữa nặng hơn một gói bánh ${q.num(sua - banh)} g.</div>`,
    `${x} × ${k2} = ${banh} (g);  ${banh} × ${k1} = ${sua} (g);  `
    + `${k2} × ${k1} = ${k1 * k2} (thanh);  ${sua} − ${banh} = ${sua - banh} (g)`);
},
];
