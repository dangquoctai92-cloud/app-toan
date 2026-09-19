/* ===== NÂNG CAO — Bài 39: So sánh số lớn gấp mấy lần số bé ===== */

const b39advLen = v => String(v).length;

ADV.b39 = [

/* 1. Bảng hỗn hợp: điền số lớn, số bé, hiệu, số lần */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const cols = [];
  for (let g = 0; g < 200 && cols.length < 4; g++){
    const be = R(2, 9), k = R(2, 9), lon = be * k;
    if (cols.some(c => c.be === be && c.lon === lon)) continue;
    cols.push({be, k, lon, hieu:lon - be});
  }
  while (cols.length < 4) cols.push({be:2, k:cols.length + 2, lon:2 * (cols.length + 2),
    hieu:2 * (cols.length + 2) - 2});
  const modes = [0, 1, 2, 3].sort(() => Math.random() - .5);
  cols.forEach((c, i) => c.m = modes[i]);
  /* m = 0: cho số bé và số lần · 1: cho số lớn và số lần
     m = 2: cho số bé và số lớn · 3: cho số lớn và hiệu */
  const cell = (c, which) => {
    const hien = (c.m === 0 && (which === 'be' || which === 'k'))
      || (c.m === 1 && (which === 'lon' || which === 'k'))
      || (c.m === 2 && (which === 'be' || which === 'lon'))
      || (c.m === 3 && (which === 'lon' || which === 'hieu'));
    const v = c[which];
    return `<td>${hien ? v : q.num(v, which === 'k' ? 1 : b39advLen(v))}</td>`;
  };
  return q.done(`<div class="tbl-wrap"><table class="tbl green">
      <tr><th>Số bé</th>${cols.map(c => cell(c, 'be')).join('')}</tr>
      <tr><th>Số lớn</th>${cols.map(c => cell(c, 'lon')).join('')}</tr>
      <tr><th>Số lớn hơn số bé bao nhiêu đơn vị?</th>${cols.map(c => cell(c, 'hieu')).join('')}</tr>
      <tr><th>Số lớn gấp mấy lần số bé?</th>${cols.map(c => cell(c, 'k')).join('')}</tr>
    </table></div>
    <div class="hint-line">Hơn bao nhiêu đơn vị thì làm tính trừ, gấp mấy lần thì làm tính chia.
      Biết số lớn và số lần thì lấy số lớn chia cho số lần để tìm số bé.</div>`,
    cols.map(c => `${c.lon} và ${c.be}: ${c.lon} − ${c.be} = ${c.hieu}; ${c.lon} : ${c.be} = ${c.k}`)
      .join('  ·  '));
},

/* 2. Gấp mấy lần bắc cầu qua ba đại lượng */
() => {
  const q = Q(2, '');
  const vang = R(4, 9), r = R(2, 5), p = R(2, 4);
  const do_ = vang * r, xanh = do_ * p;
  return q.done(`<p class="wordq">Sợi dây màu vàng dài ${vang} cm. Sợi dây màu đỏ dài gấp ${r} lần
      sợi dây màu vàng. Sợi dây màu xanh dài gấp ${p} lần sợi dây màu đỏ.</p>
    <div class="bullet">Sợi dây màu đỏ dài ${q.num(do_)} cm.</div>
    <div class="bullet">Sợi dây màu xanh dài ${q.num(xanh)} cm.</div>
    <div class="bullet">Sợi dây màu xanh dài gấp ${q.num(r * p, b39advLen(r * p))} lần sợi dây màu vàng.</div>
    <div class="bullet">Sợi dây màu xanh dài hơn sợi dây màu vàng ${q.num(xanh - vang)} cm.</div>`,
    `${vang} × ${r} = ${do_} (cm);  ${do_} × ${p} = ${xanh} (cm);  `
    + `${xanh} : ${vang} = ${r * p} (lần);  ${xanh} − ${vang} = ${xanh - vang} (cm).`);
},

/* 3. Đổi đơn vị đo độ dài rồi so sánh */
() => {
  const q = Q(3, 'Đổi ra cùng một đơn vị đo rồi trả lời.');
  const m1 = R(1, 3), x1 = pick([10, 20, 25, 50]);
  const d2 = R(4, 9), y2 = pick([2, 5]);
  const cm1 = m1 * 100, cm2 = d2 * 10;
  return q.done(`<div class="sub-lbl">a)</div>
    <p class="wordq">Sợi dây dài ${m1} m, chiếc thước kẻ dài ${x1} cm.</p>
    <div class="bullet">Sợi dây dài ${q.num(cm1)} cm.</div>
    <div class="bullet">Sợi dây dài gấp ${q.num(cm1 / x1, b39advLen(cm1 / x1))} lần chiếc thước kẻ.</div>
    <div class="bullet">Sợi dây dài hơn chiếc thước kẻ ${q.num(cm1 - x1)} cm.</div>
    <div class="sub-lbl">b)</div>
    <p class="wordq">Thanh gỗ dài ${d2} dm, chiếc kẹp giấy dài ${y2} cm.</p>
    <div class="bullet">Thanh gỗ dài ${q.num(cm2)} cm.</div>
    <div class="bullet">Thanh gỗ dài gấp ${q.num(cm2 / y2, b39advLen(cm2 / y2))} lần chiếc kẹp giấy.</div>
    <div class="hint-line">1 m = 100 cm ; 1 dm = 10 cm.</div>`,
    `a) ${m1} m = ${cm1} cm; ${cm1} : ${x1} = ${cm1 / x1} (lần); ${cm1} − ${x1} = ${cm1 - x1} (cm).  `
    + `b) ${d2} dm = ${cm2} cm; ${cm2} : ${y2} = ${cm2 / y2} (lần).`);
},

/* 4. Chọn các cặp số mà số lớn gấp đúng k lần số bé */
() => {
  const q = Q(4, 'Chọn tất cả các cặp số mà số lớn gấp đúng số lần đã cho.');
  const k = R(2, 5);
  const nDung = R(2, 3);
  const items = [];
  for (let g = 0; g < 400 && items.length < nDung; g++){
    const be = R(3, 12), lon = be * k;
    if (items.some(x => x.be === be)) continue;
    items.push({be, lon});
  }
  for (let g = 0; g < 600 && items.length < 6; g++){
    const be = R(3, 12), lon = be * R(2, 6) + pick([0, 0, 1, 2, 3]);
    if (lon % be === 0 && lon / be === k) continue;
    if (lon <= be) continue;
    if (items.some(x => x.be === be && x.lon === lon)) continue;
    items.push({be, lon});
  }
  while (items.length < 6) items.push({be:3, lon:3 * (k + 1) + items.length});
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  const list = items.sort(() => Math.random() - .5).map((x, i) => ({...x, L:L[i]}));
  const ds = list.filter(x => x.lon % x.be === 0 && x.lon / x.be === k).map(x => x.L).sort();
  let hi = list[0].lon - list[0].be;
  list.forEach(x => { if (x.lon - x.be > hi) hi = x.lon - x.be; });
  return q.done(`<div class="b39adv-pair">${list.map(x =>
      `<div class="b39adv-card"><em>${x.L}</em>${x.lon} và ${x.be}<i>số lớn · số bé</i></div>`).join('')}</div>
    <div class="fill-line">Các cặp có số lớn gấp đúng ${k} lần số bé: ${q.pick(ds.join(','), L)}</div>
    <div class="fill-line">Có ${q.num(ds.length, 1)} cặp như vậy.</div>
    <div class="fill-line">Trong các cặp trên, số lớn hơn số bé nhiều nhất là
      ${q.num(hi, b39advLen(hi))} đơn vị.</div>`,
    list.map(x => `${x.L}: ${x.lon} : ${x.be} = ${Math.floor(x.lon / x.be)}`
      + (x.lon % x.be ? ` (dư ${x.lon % x.be})` : '') + `, hiệu ${x.lon - x.be}`).join(' · '));
},

/* 5. Bài toán nhiều bước: thêm vào rồi so sánh gấp mấy lần */
() => {
  const q = Q(5, '');
  const quyt = R(4, 9), k = R(2, 6), camSau = quyt * k;
  const m = R(3, Math.min(18, camSau - 4)), camDau = camSau - m;
  return q.done(`<p class="wordq">Rổ quýt có ${quyt} quả, rổ cam có ${camDau} quả.
      Mẹ mua thêm ${m} quả cam bỏ vào rổ cam.</p>
    <div class="bullet">Lúc này rổ cam có ${q.num(camSau)} quả.</div>
    <div class="bullet">Lúc này số quả ở rổ cam gấp ${q.num(k, 1)} lần số quả ở rổ quýt.</div>
    <div class="bullet">Lúc này rổ cam có nhiều hơn rổ quýt ${q.num(camSau - quyt)} quả.</div>`,
    `${camDau} + ${m} = ${camSau} (quả);  ${camSau} : ${quyt} = ${k} (lần);  `
    + `${camSau} − ${quyt} = ${camSau - quyt} (quả).`);
},

/* 6. Bài toán ngược: biết hiệu, tìm số lần */
() => {
  const q = Q(6, '');
  const gao = R(4, 12), k = R(2, 5);
  const ngo = gao * k, d = ngo - gao;
  return q.done(`<p class="wordq">Túi gạo cân nặng ${gao} kg. Túi ngô cân nặng hơn túi gạo ${d} kg.</p>
    <div class="bullet">Túi ngô cân nặng ${q.num(ngo)} kg.</div>
    <div class="bullet">Túi ngô cân nặng gấp ${q.num(k, 1)} lần túi gạo.</div>
    <div class="bullet">Cả hai túi cân nặng ${q.num(gao + ngo)} kg.</div>
    <div class="hint-line">Tìm cân nặng túi ngô trước rồi mới so sánh gấp mấy lần.</div>`,
    `${gao} + ${d} = ${ngo} (kg);  ${ngo} : ${gao} = ${k} (lần);  ${gao} + ${ngo} = ${gao + ngo} (kg).`);
},
];
