/* ===== NÂNG CAO — Bài 34: Thực hành và trải nghiệm với các đơn vị
   mi-li-mét, gam, mi-li-lít, độ C ===== */

/* các cặp (số hộp; số mi-li-lít mỗi hộp) sao cho tổng luôn bé hơn 1 000 ml */
const b34advSua = [[2, 150], [2, 180], [2, 200], [2, 250], [3, 150], [3, 180],
  [3, 200], [3, 250], [4, 150], [4, 180], [4, 200]];

const b34advLen = v => String(v).length;

ADV.b34 = [

/* 1. So sánh các số đo có đơn vị khác nhau */
() => {
  const q = Q(1, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const x = pick([10, 10, R(3, 9), R(11, 30)]);
    rows.push({t:'1 cm', p:`${x} mm`, l:10, r:x});
  }
  {
    const a = R(2, 9);
    const b = pick([a * 10, a * 10, a * 10 + R(1, 9), a * 10 - R(1, 9)]);
    rows.push({t:`${a} cm`, p:`${b} mm`, l:a * 10, r:b});
  }
  {
    const x = R(3, 7) * 100;
    const y = pick([1000 - x, 1000 - x, 1000 - x + R(1, 9) * 10, 1000 - x - R(1, 9) * 10]);
    rows.push({t:'1 kg', p:`${x} g + ${y} g`, l:1000, r:x + y});
  }
  {
    const k = pick([2, 4, 5]), base = 1000 / k;
    const m = pick([base, base, base + pick([10, 20, 50]), base - pick([10, 20, 50])]);
    rows.push({t:'1 <i>l</i>', p:`${m} ml × ${k}`, l:1000, r:m * k});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">1 cm = 10 mm · 1 kg = 1 000 g · 1 <i>l</i> = 1 000 ml ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.l} và ${x.r}`).join(' · '));
},

/* 2. Đo độ dài theo mi-li-mét — bài toán nhiều bước */
() => {
  const q = Q(2, '');
  const kep = R(25, 40), them = R(5, 20), c = R(9, 16);
  const tay = kep + them, but = c * 10;
  return q.done(`<p class="wordq">Một chiếc kẹp giấy dài ${kep} mm. Một cục tẩy dài hơn chiếc kẹp giấy
      ${them} mm. Một chiếc bút chì dài ${c} cm.</p>
    <div class="fill-line">Cục tẩy dài ${q.num(tay, 2)} mm.</div>
    <div class="fill-line">Chiếc bút chì dài ${q.num(but, b34advLen(but))} mm.</div>
    <div class="fill-line">Chiếc bút chì dài hơn cục tẩy ${q.num(but - tay, b34advLen(but - tay))} mm.</div>
    <div class="fill-line">Đặt nối tiếp chiếc kẹp giấy và cục tẩy thành một hàng thì hàng đó dài
      ${q.num(kep + tay, b34advLen(kep + tay))} mm.</div>
    <div class="hint-line">1 cm = 10 mm</div>`,
    `${kep} + ${them} = ${tay} (mm);  ${c} cm = ${but} mm;  ${but} − ${tay} = ${but - tay} (mm);  `
    + `${kep} + ${tay} = ${kep + tay} (mm)`);
},

/* 3. Chọn tất cả các số đo bằng 1 kg */
() => {
  const q = Q(3, 'Chọn tất cả các số đo bằng 1 kg.');
  const a = R(3, 7) * 100, k = pick([2, 4, 5]);
  const dung = [{s:`${a} g + ${1000 - a} g`, v:1000},
    {s:`${1000 / k} g × ${k}`, v:1000},
    {s:'1 000 g', v:1000}];
  const sai = [];
  const co = s => dung.some(x => x.s === s) || sai.some(x => x.s === s);
  let g = 0;
  while (sai.length < 3 && g++ < 300){
    const t = R(1, 3);
    let s = '', v = 0;
    if (t === 1){ const x = R(2, 7) * 100, y = R(1, 10 - x / 100) * 100; v = x + y; s = `${x} g + ${y} g`; }
    else if (t === 2){ const m = R(2, 5), x = R(11, Math.floor(100 / m)) * 10; v = x * m; s = `${x} g × ${m}`; }
    else { const x = R(2, 9) * 100 + R(1, 9) * 10; v = x; s = `${x} g`; }
    if (v === 1000 || co(s)) continue;
    sai.push({s, v});
  }
  for (const x of [900, 800, 750, 650, 550]){
    if (sai.length >= 3) break;
    if (!co(x + ' g')) sai.push({s:x + ' g', v:x});
  }
  const all = dung.concat(sai).sort(() => Math.random() - .5);
  return q.done(`<div class="fill-line">Các số đo bằng 1 kg là:
      ${q.pick(dung.map(x => x.s).sort().join(','), all.map(x => x.s))}</div>
    <div class="fill-line">Số đo ${sai[0].s} bằng ${q.num(sai[0].v, b34advLen(sai[0].v))} g.</div>
    <div class="fill-line">Số đo ${sai[1].s} bằng ${q.num(sai[1].v, b34advLen(sai[1].v))} g.</div>
    <div class="hint-line">Tính giá trị của từng số đo rồi so sánh với 1 000 g.</div>`,
    all.map(x => `${x.s} = ${x.v} g`).join(' · '));
},

/* 4. Bài toán tổng hợp gam và mi-li-lít */
() => {
  const q = Q(4, '');
  const p = pick(b34advSua);
  const n = p[0], x = p[1];
  const sua = n * x;
  const st = R(3, 5), tw = pick([50, 60, 70]);
  const banh = pick([200, 250, 300]);
  const trung = st * tw;
  return q.done(`<p class="wordq">Mẹ đi chợ mua ${n} hộp sữa, mỗi hộp có ${x} ml sữa;
      một gói bánh cân nặng ${banh} g và ${st} quả trứng, mỗi quả cân nặng ${tw} g.</p>
    <div class="fill-line">${n} hộp sữa có tất cả ${q.num(sua, b34advLen(sua))} ml sữa.</div>
    <div class="fill-line">Số sữa đó còn thiếu ${q.num(1000 - sua, b34advLen(1000 - sua))} ml nữa thì được 1 <i>l</i>.</div>
    <div class="fill-line">${st} quả trứng cân nặng ${q.num(trung, b34advLen(trung))} g.</div>
    <div class="fill-line">Gói bánh và ${st} quả trứng cân nặng tất cả ${q.num(banh + trung, b34advLen(banh + trung))} g.</div>`,
    `${x} × ${n} = ${sua} (ml);  1 000 − ${sua} = ${1000 - sua} (ml);  `
    + `${tw} × ${st} = ${trung} (g);  ${banh} + ${trung} = ${banh + trung} (g)`);
},

/* 5. Nhiệt độ trong ngày — bài toán ngược */
() => {
  const q = Q(5, '');
  const s = R(15, 22), e = s + R(2, 6), t = e + R(3, 9);
  return q.done(`<p class="wordq">Một bạn nhỏ dùng nhiệt kế đo nhiệt độ không khí trong ngày và ghi lại:
      buổi sáng ${s} °C, buổi trưa ${t} °C, buổi tối ${e} °C.</p>
    <div class="fill-line">Từ buổi sáng đến buổi trưa, nhiệt độ tăng thêm ${q.num(t - s, 2)} °C.</div>
    <div class="fill-line">Từ buổi trưa đến buổi tối, nhiệt độ giảm đi ${q.num(t - e, 2)} °C.</div>
    <div class="fill-line">Nhiệt độ buổi tối cao hơn nhiệt độ buổi sáng ${q.num(e - s, 1)} °C.</div>
    <div class="fill-line">Buổi có nhiệt độ thấp nhất trong ngày là
      ${q.pick('buổi sáng', ['buổi sáng', 'buổi trưa', 'buổi tối'])}</div>`,
    `${t} − ${s} = ${t - s} (°C);  ${t} − ${e} = ${t - e} (°C);  ${e} − ${s} = ${e - s} (°C)`);
},

/* 6. Tìm số đo theo nhiều điều kiện */
() => {
  const q = Q(6, 'Tìm chiều dài của chiếc bút, biết:');
  const m = R(9, 16) * 10;
  const lo = m - pick([4, 5, 6, 7, 8, 9]);
  const hi = m + pick([4, 5, 6, 7, 8, 9]);
  const kep = R(25, 45);
  return q.done(`<div class="bullet">Chiều dài của chiếc bút tính theo mi-li-mét là một số tròn chục.</div>
    <div class="bullet">Chiều dài đó lớn hơn ${lo} mm và bé hơn ${hi} mm.</div>
    <div class="fill-line">Chiếc bút dài ${q.num(m, 3)} mm.</div>
    <div class="fill-line">Chiếc bút dài ${q.num(m / 10, 2)} cm.</div>
    <div class="fill-line">Chiếc bút dài hơn một chiếc kẹp giấy dài ${kep} mm là
      ${q.num(m - kep, b34advLen(m - kep))} mm.</div>
    <div class="hint-line">Hãy viết các số tròn chục lớn hơn ${lo} rồi chọn số bé hơn ${hi} · 1 cm = 10 mm</div>`,
    `Số tròn chục duy nhất lớn hơn ${lo} và bé hơn ${hi} là ${m}. `
    + `${m} mm = ${m / 10} cm;  ${m} − ${kep} = ${m - kep} (mm)`);
},
];
