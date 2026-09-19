/* ===== NÂNG CAO — Bài 68: Tiền Việt Nam =====
   Dùng lại các hàm của phần cơ bản trong cùng bài: to68, SHF68, MON68, TIEN68.
   Hàm riêng của phần nâng cao đặt tiền tố b68adv. */

/* các cặp mệnh giá đổi được cho nhau: [A, B] với B chia hết cho A */
const B68ADV_DOI = [
  [1000, 2000], [1000, 5000], [1000, 10000], [2000, 10000], [5000, 10000],
  [2000, 20000], [5000, 20000], [10000, 20000], [10000, 50000], [5000, 50000],
  [10000, 100000], [20000, 100000], [50000, 100000]
];

/* 1 tờ T đồng đổi được các tờ X đồng và các tờ Y đồng: [T, X, Y] */
const B68ADV_TACH = [
  [100000, 20000, 10000], [100000, 20000, 5000], [100000, 10000, 5000],
  [100000, 50000, 10000], [50000, 10000, 5000], [50000, 20000, 5000],
  [50000, 10000, 2000], [20000, 5000, 2000], [20000, 5000, 1000],
  [50000, 5000, 1000], [100000, 10000, 2000]
];

/* chọn số tờ X sao cho số tờ Y còn lại là số tự nhiên từ 1 đến 9 */
function b68advTach(){
  const t = pick(B68ADV_TACH);
  const ok = [];
  for (let n1 = 1; n1 <= 9; n1++){
    const con = t[0] - n1 * t[1];
    if (con > 0 && con % t[2] === 0 && con / t[2] <= 9) ok.push(n1);
  }
  if (!ok.length) return {T: 100000, X: 20000, Y: 10000, n1: 2, n2: 6};
  const n1 = pick(ok);
  return {T: t[0], X: t[1], Y: t[2], n1, n2: (t[0] - n1 * t[1]) / t[2]};
}

/* vẽ một thẻ món hàng: tranh + tên + giá (giá có thể là ô điền) */
const b68advThe = (ten, gia) => `<div class="b68adv-card">${MON68[ten]}
  <div class="nm">${ten}</div><div class="gia">${gia}</div></div>`;

ADV.b68 = [

/* 1. Mua nhiều món cùng loại: nhân – cộng – trừ – so sánh */
() => {
  const q = Q(1, 'Đọc bài toán rồi hoàn thành các câu trả lời.');
  const gSach = R(3, 9) * 1000, sSach = R(3, 5);
  const gLuoc = R(2, 8) * 1000, sLuoc = R(2, 4);
  const tSach = gSach * sSach, tLuoc = gLuoc * sLuoc;
  const tong = tSach + tLuoc;
  const dua = 100000;
  const thua = dua - tong;
  const dau = tSach > tLuoc ? '>' : tSach < tLuoc ? '<' : '=';
  const html = `<div class="b68adv-shop">
      ${b68advThe('Quyển sách', nf(gSach) + ' đồng')}
      ${b68advThe('Cái lược', nf(gLuoc) + ' đồng')}</div>
    <p class="wordq">Mẹ mua ${sSach} quyển sách và ${sLuoc} cái lược với giá như trên.
      Mẹ đưa cho cô bán hàng 1 tờ ${nf(dua)} đồng.</p>
    <div class="b68-line"><span class="b68-let">a)</span>Mẹ mua sách hết
      ${q.num(tSach)} đồng.</div>
    <div class="b68-line"><span class="b68-let">b)</span>Mẹ mua lược hết
      ${q.num(tLuoc)} đồng.</div>
    <div class="b68-line"><span class="b68-let">c)</span>Mẹ phải trả tất cả
      ${q.num(tong)} đồng.</div>
    <div class="b68-line"><span class="b68-let">d)</span>Cô bán hàng trả lại mẹ
      ${q.num(thua)} đồng.</div>
    <div class="b68-line"><span class="b68-let">e)</span>So sánh số tiền mua hai loại:</div>
    <div class="cmp-row"><span class="side">Tiền mua sách</span>${q.sign(dau)}<span class="side">Tiền mua lược</span></div>
    <div class="hint-line">Muốn biết mua ${sSach} quyển sách hết bao nhiêu tiền thì lấy giá
      1 quyển sách nhân với ${sSach}. Chạm vào ô dấu để đổi &gt; &lt; =</div>`;
  return q.done(html,
    `a) ${nf(gSach)} × ${sSach} = ${nf(tSach)} (đồng).  `
    + `b) ${nf(gLuoc)} × ${sLuoc} = ${nf(tLuoc)} (đồng).  `
    + `c) ${nf(tSach)} + ${nf(tLuoc)} = ${nf(tong)} (đồng).  `
    + `d) ${nf(dua)} − ${nf(tong)} = ${nf(thua)} (đồng).  `
    + `e) ${nf(tSach)} ${dau} ${nf(tLuoc)}.`);
},

/* 2. Tìm giá tiền từng món khi biết giá của hai lần mua */
() => {
  const q = Q(2, 'Tìm giá tiền của mỗi món hàng rồi trả lời.');
  const gSach = R(4, 9) * 1000, gLuoc = R(2, 8) * 1000;
  const lan1 = 2 * gSach + gLuoc;          /* 2 quyển sách và 1 cái lược */
  const lan2 = gSach + gLuoc;              /* 1 quyển sách và 1 cái lược */
  const mua = 3 * gSach + 2 * gLuoc;
  const co = 50000;
  const html = `<div class="b68adv-shop">
      ${b68advThe('Quyển sách', '? đồng')}
      ${b68advThe('Cái lược', '? đồng')}</div>
    <div class="b68adv-clue">
      <div class="bullet">Mua 2 quyển sách và 1 cái lược hết ${nf(lan1)} đồng.</div>
      <div class="bullet">Mua 1 quyển sách và 1 cái lược hết ${nf(lan2)} đồng.</div>
    </div>
    <div class="b68-line"><span class="b68-let">a)</span>Giá tiền 1 quyển sách là
      ${q.num(gSach)} đồng.</div>
    <div class="b68-line"><span class="b68-let">b)</span>Giá tiền 1 cái lược là
      ${q.num(gLuoc)} đồng.</div>
    <div class="b68-line"><span class="b68-let">c)</span>Mua 3 quyển sách và 2 cái lược hết
      ${q.num(mua)} đồng.</div>
    <div class="b68-line"><span class="b68-let">d)</span>Bạn An có ${nf(co)} đồng. Mua 3 quyển sách
      và 2 cái lược xong, bạn An còn ${q.num(co - mua)} đồng.</div>
    <div class="hint-line">Lần mua thứ nhất nhiều hơn lần mua thứ hai đúng 1 quyển sách.</div>`;
  return q.done(html,
    `a) ${nf(lan1)} − ${nf(lan2)} = ${nf(gSach)} (đồng) là giá 1 quyển sách.  `
    + `b) ${nf(lan2)} − ${nf(gSach)} = ${nf(gLuoc)} (đồng) là giá 1 cái lược.  `
    + `c) ${nf(gSach)} × 3 + ${nf(gLuoc)} × 2 = ${nf(mua)} (đồng).  `
    + `d) ${nf(co)} − ${nf(mua)} = ${nf(co - mua)} (đồng).`);
},

/* 3. Ba bạn – cộng các tờ tiền, so sánh, chọn những bạn đủ tiền mua */
() => {
  const q = Q(3, 'Ba bạn có số tiền như hình dưới đây.');
  const MG = [2000, 5000, 10000, 20000, 50000];
  const mk = () => Array.from({length: R(2, 3)}, () => pick(MG));
  const ten = SHF68(['Mai', 'Nam', 'Việt']);
  let bo = [mk(), mk(), mk()];
  let tg = bo.map(s => s.reduce((a, b) => a + b, 0));
  const dat = v => { const s = [...v].sort((a, b) => a - b);
    return s[0] !== s[1] && s[1] !== s[2] && s[2] - s[0] >= 5000 && s[2] <= 100000; };
  for (let g = 0; g < 90 && !dat(tg); g++){
    bo = [mk(), mk(), mk()];
    tg = bo.map(s => s.reduce((a, b) => a + b, 0));
  }
  if (!dat(tg)){ bo = [[10000, 5000], [20000, 10000], [50000, 20000]]; tg = [15000, 30000, 70000]; }
  const sx = [...tg].sort((a, b) => a - b);
  const cand = [];
  for (let v = sx[0] + 1000; v <= sx[2] - 1000; v += 1000) if (v !== sx[1]) cand.push(v);
  const gia = pick(cand);
  const nhieu = ten[tg.indexOf(sx[2])];
  const it = ten[tg.indexOf(sx[0])];
  const duoc = ten.filter((n, i) => tg[i] > gia).sort();
  const html = '<div class="b68adv-pers">' + ten.map((n, i) =>
      `<div class="b68adv-one"><div class="nm">${n}</div>
        <div class="b68-notes">${bo[i].map(to68).join('')}</div></div>`).join('') + '</div>'
    + ten.map((n, i) => `<div class="b68-line">Bạn ${n} có ${q.num(tg[i])} đồng.</div>`).join('')
    + `<div class="b68-line b68-wide">Bạn có nhiều tiền nhất là bạn
        ${q.pick(nhieu, ten)}</div>
      <div class="b68-line">Bạn có nhiều tiền nhất hơn bạn có ít tiền nhất
        ${q.num(sx[2] - sx[0])} đồng.</div>
      <div class="b68-line b68-wide">Một quyển truyện tranh giá ${nf(gia)} đồng.
        Những bạn có đủ tiền mua quyển truyện tranh đó là:
        ${q.pick(duoc.join(','), ten)}</div>
      <div class="hint-line">Cộng các tờ tiền của mỗi bạn để biết mỗi bạn có bao nhiêu đồng.
        Ở câu cuối hãy chạm chọn tất cả các bạn có số tiền nhiều hơn ${nf(gia)} đồng.</div>`;
  return q.done(html,
    ten.map((n, i) => `${n}: ${bo[i].map(nf).join(' + ')} = ${nf(tg[i])} đồng`).join(';  ')
    + `. Nhiều tiền nhất là ${nhieu}, ít tiền nhất là ${it}, `
    + `${nf(sx[2])} − ${nf(sx[0])} = ${nf(sx[2] - sx[0])} (đồng). `
    + `Đủ tiền mua truyện: ${duoc.join(', ')}.`);
},

/* 4. Đổi tiền nâng cao */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const ds = SHF68(B68ADV_DOI);
  const pa = ds[0];
  const dsB = ds.filter(p => p !== pa && p[1] / p[0] <= 5);
  const pb = dsB.length ? dsB[0] : [10000, 20000];
  const m = R(2, 3);
  const soTo = m * (pb[1] / pb[0]);
  const t = b68advTach();
  const M = pick([20000, 50000]);
  const x = M === 50000 ? 1 : R(2, 3);
  const N = pick([10000, 5000]);
  const y = N === 5000 ? pick([2, 4, 6]) : R(2, 4);
  const tongD = M * x + N * y;
  const html = `<div class="b68adv-doi">
      <div><b>a)</b>1 tờ ${nf(pa[1])} đồng đổi được ${q.num(pa[1] / pa[0])} tờ ${nf(pa[0])} đồng.</div>
      <div><b>b)</b>${soTo} tờ ${nf(pb[0])} đồng đổi được ${q.num(m)} tờ ${nf(pb[1])} đồng.</div>
      <div><b>c)</b>1 tờ ${nf(t.T)} đồng đổi được ${t.n1} tờ ${nf(t.X)} đồng và
        ${q.num(t.n2)} tờ ${nf(t.Y)} đồng.</div>
    </div>
    <p class="wordq">Bà có ${x} tờ ${nf(M)} đồng và ${y} tờ ${nf(N)} đồng.</p>
    <div class="b68-line"><span class="b68-let">d)</span>Bà có tất cả ${q.num(tongD)} đồng.</div>
    <div class="b68-line"><span class="b68-let">e)</span>Bà đổi tất cả số tiền đó thành các tờ
      ${nf(10000)} đồng thì được ${q.num(tongD / 10000)} tờ.</div>
    <div class="hint-line">Ở câu c) em hãy tính xem ${t.n1} tờ ${nf(t.X)} đồng là bao nhiêu đồng,
      rồi tìm số tiền còn lại.</div>`;
  return q.done(html,
    `a) ${nf(pa[1])} : ${nf(pa[0])} = ${pa[1] / pa[0]}.  `
    + `b) ${soTo} × ${nf(pb[0])} = ${nf(soTo * pb[0])} đồng, `
    + `${nf(soTo * pb[0])} : ${nf(pb[1])} = ${m}.  `
    + `c) ${t.n1} tờ ${nf(t.X)} đồng là ${nf(t.n1 * t.X)} đồng; `
    + `${nf(t.T)} − ${nf(t.n1 * t.X)} = ${nf(t.T - t.n1 * t.X)} đồng; `
    + `${nf(t.T - t.n1 * t.X)} : ${nf(t.Y)} = ${t.n2}.  `
    + `d) ${nf(M)} × ${x} + ${nf(N)} × ${y} = ${nf(tongD)} (đồng).  `
    + `e) ${nf(tongD)} : ${nf(10000)} = ${tongD / 10000} (tờ).`);
},

/* 5. Đủ tiền hay còn thiếu */
() => {
  const q = Q(5, 'Đọc bài toán rồi hoàn thành các câu trả lời.');
  const MG = [5000, 10000, 20000];
  const mk = () => Array.from({length: R(2, 3)}, () => pick(MG));
  let bo = mk();
  let co = bo.reduce((a, b) => a + b, 0);
  for (let g = 0; g < 90 && (co < 20000 || co > 45000); g++){
    bo = mk();
    co = bo.reduce((a, b) => a + b, 0);
  }
  if (co < 20000 || co > 45000){ bo = [20000, 10000, 5000]; co = 35000; }
  const re = co - R(2, 10) * 1000;
  const dat = co + R(2, 9) * 1000;
  const mon = SHF68(['Rô-bốt', 'Quyển sách']);
  const gia = {};
  gia[mon[0]] = re; gia[mon[1]] = dat;
  const tongGia = re + dat;
  const thieu = tongGia - co;
  const html = `<div class="b68adv-shop">
      ${b68advThe(mon[0], nf(gia[mon[0]]) + ' đồng')}
      ${b68advThe(mon[1], nf(gia[mon[1]]) + ' đồng')}</div>
    <p class="wordq">Việt có số tiền như dưới đây. Việt muốn mua cả hai món hàng trên.</p>
    <div class="b68-notes">${bo.map(to68).join('')}</div>
    <div class="b68-line"><span class="b68-let">a)</span>Việt có tất cả ${q.num(co)} đồng.</div>
    <div class="b68-line"><span class="b68-let">b)</span>Cả hai món hàng giá
      ${q.num(tongGia)} đồng.</div>
    <div class="b68-line"><span class="b68-let">c)</span>Việt còn thiếu ${q.num(thieu)} đồng.</div>
    <div class="b68-line b68-wide"><span class="b68-let">d)</span>Nếu chỉ mua một món thì Việt
      mua được món: ${q.pick(mon[0], ['Rô-bốt', 'Quyển sách'])}</div>
    <div class="b68-line"><span class="b68-let">e)</span>Mua xong món đó, Việt còn
      ${q.num(co - re)} đồng.</div>
    <div class="hint-line">Hãy cộng các tờ tiền của Việt rồi so sánh với giá của từng món hàng.</div>`;
  return q.done(html,
    `a) ${bo.map(nf).join(' + ')} = ${nf(co)} (đồng).  `
    + `b) ${nf(re)} + ${nf(dat)} = ${nf(tongGia)} (đồng).  `
    + `c) ${nf(tongGia)} − ${nf(co)} = ${nf(thieu)} (đồng).  `
    + `d) ${nf(co)} < ${nf(dat)} nên Việt chỉ mua được ${mon[0].toLowerCase()} giá ${nf(re)} đồng.  `
    + `e) ${nf(co)} − ${nf(re)} = ${nf(co - re)} (đồng).`);
},
];
