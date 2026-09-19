/*CSS
.b23adv-eq{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;
  font-size:21px;font-weight:800;color:#4a4460;margin:12px 0}
.b23adv-eq b{font-weight:800}
.b23adv-blot{display:inline-block;min-width:24px;padding:0 6px;border-radius:8px;
  background:#efe9fb;color:#a99ccd;text-align:center}
.b23adv-lbl{font-size:15px;font-weight:800;color:#8a83a6;margin-top:10px;text-align:left}
CSS*/

/* ===== NÂNG CAO — Bài 23: Nhân số có hai chữ số với số có một chữ số ===== */

/* ba chữ số khác nhau từ 1 đến 9 */
const b23advDigits = () => {
  const ds = [];
  for (let g = 0; g < 80 && ds.length < 3; g++){
    const x = R(1, 9);
    if (!ds.includes(x)) ds.push(x);
  }
  for (let x = 1; x <= 9 && ds.length < 3; x++) if (!ds.includes(x)) ds.push(x);
  return ds;
};

/* độ dài ô nhập theo số chữ số của đáp án */
const b23advLen = v => String(v).length;

ADV.b23 = [

/* 1. Lập số có hai chữ số lớn nhất, bé nhất rồi nhân */
() => {
  const q = Q(1, 'Từ ba tấm thẻ ghi chữ số dưới đây, hãy lập các số có hai chữ số khác nhau.');
  const ds = b23advDigits();
  const sx = ds.slice().sort((a, b) => b - a);
  const lon = sx[0] * 10 + sx[1];
  const be = sx[2] * 10 + sx[1];
  const m = R(2, 4);
  const tich = lon * m;
  return q.done(`<div class="given-nums">${ds.map(x => `<span class="cnode">${x}</span>`).join('')}</div>
    <div class="fill-line">Số lớn nhất lập được là ${q.num(lon, 2)}</div>
    <div class="fill-line">Số bé nhất lập được là ${q.num(be, 2)}</div>
    <div class="fill-line">Hiệu của hai số đó là ${q.num(lon - be, 2)}</div>
    <div class="fill-line">Lấy số lớn nhất nhân với ${m} được ${q.num(tich, b23advLen(tich))}</div>
    <div class="hint-line">Muốn số lớn nhất thì chữ số lớn nhất đặt ở hàng chục.</div>`,
    `Số lớn nhất là ${lon}, số bé nhất là ${be}. ${lon} − ${be} = ${lon - be}; ${lon} × ${m} = ${tich}.`);
},

/* 2. Tìm số có hai chữ số theo nhiều điều kiện rồi nhân */
() => {
  const q = Q(2, 'Tìm số có hai chữ số thoả mãn tất cả các điều kiện sau.');
  const t = R(1, 5), d = R(1, 4);
  const u = t + d;
  const n = t * 10 + u;
  const m = R(2, 5);
  const lo = Math.max(9, n - R(4, 9)), hi = n + R(4, 9);
  const tich = n * m;
  return q.done(`<div class="bullet">Số đó lớn hơn ${lo} và bé hơn ${hi}.</div>
    <div class="bullet">Chữ số hàng chục của số đó là ${t}.</div>
    <div class="bullet">Chữ số hàng đơn vị hơn chữ số hàng chục ${d} đơn vị.</div>
    <div class="fill-line">Số đó là ${q.num(n, 2)}</div>
    <div class="fill-line">Tổng hai chữ số của số đó là ${q.num(t + u, b23advLen(t + u))}</div>
    <div class="fill-line">Số đó nhân với ${m} được ${q.num(tich, b23advLen(tich))}</div>`,
    `Chữ số hàng đơn vị là ${t} + ${d} = ${u} nên số đó là ${n}. ${n} × ${m} = ${tich}.`);
},

/* 3. So sánh hai biểu thức có phép nhân */
() => {
  const q = Q(3, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(11, 32), m = R(2, 4);
    const a2 = Math.max(10, a + pick([-2, -1, 0, 0, 1, 2]));
    rows.push({t:`${a} × ${m}`, p:`${a2} × ${m}`, l:a * m, r:a2 * m});
  }
  {
    const a = R(11, 30), k = pick([2, 3, 3, 4]);
    rows.push({t:`${a} + ${a} + ${a}`, p:`${a} × ${k}`, l:3 * a, r:a * k});
  }
  {
    const a = R(12, 30), m = R(2, 4), dd = pick([-20, -10, 0, 0, 10, 20]);
    rows.push({t:`${a} × ${m}`, p:`${a * m + dd}`, l:a * m, r:a * m + dd});
  }
  {
    const a = R(11, 24), m = R(2, 3);
    const k = Math.max(2, m + 1 + pick([-1, 0, 0, 1]));
    rows.push({t:`${a} × ${m} + ${a}`, p:`${a} × ${k}`, l:a * m + a, r:a * k});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính giá trị của mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},

/* 4. Bài toán ba bước */
() => {
  const q = Q(4, '');
  const thung = R(3, 6), moi = R(11, 16), ban = R(10, 30), them = R(2, 4);
  const tong = thung * moi;
  const con = tong - ban;
  const nhap = them * moi;
  return q.done(`<p class="wordq">Một cửa hàng nhận về ${thung} thùng sữa, mỗi thùng ${moi} hộp.
      Cửa hàng đã bán được ${ban} hộp sữa, sau đó nhập thêm ${them} thùng nữa, mỗi thùng cũng ${moi} hộp.</p>
    <div class="fill-line">Lúc đầu cửa hàng nhận về ${q.num(tong, b23advLen(tong))} hộp sữa.</div>
    <div class="fill-line">Sau khi bán, cửa hàng còn ${q.num(con, b23advLen(con))} hộp sữa.</div>
    <div class="fill-line">Số sữa nhập thêm là ${q.num(nhap, b23advLen(nhap))} hộp.</div>
    <div class="fill-line">Cuối cùng cửa hàng có ${q.num(con + nhap, b23advLen(con + nhap))} hộp sữa.</div>`,
    `${moi} × ${thung} = ${tong};  ${tong} − ${ban} = ${con};  ${moi} × ${them} = ${nhap};  `
    + `${con} + ${nhap} = ${con + nhap}.`);
},

/* 5. Tìm chữ số bị che trong phép nhân */
() => {
  const q = Q(5, 'Mỗi phép nhân dưới đây bị che mất một chữ số. Tìm chữ số bị che.');
  const t = R(1, 4), u = R(0, 9), m = R(2, 4);
  const a = t * 10 + u, p = a * m;
  const a2 = R(12, 34), m2 = R(2, 3);
  const p2 = a2 * m2, dv = p2 % 10, dau = Math.floor(p2 / 10);
  const a3 = R(11, 24), m3 = R(2, 5);
  const p3 = a3 * m3;
  const bl = '<span class="b23adv-blot">?</span>';
  return q.done(`<div class="b23adv-lbl">a) Chữ số bị che ở hàng chục của thừa số thứ nhất:</div>
      <div class="b23adv-eq"><b>${bl}${u}</b><span>×</span><b>${m}</b><span>=</span><b>${p}</b></div>
      <div class="fill-line">Chữ số bị che là ${q.num(t, 1)}, phép nhân đúng là
        ${q.num(a, 2)} × ${m} = ${p}</div>
    <div class="b23adv-lbl">b) Chữ số bị che ở hàng đơn vị của tích:</div>
      <div class="b23adv-eq"><b>${a2}</b><span>×</span><b>${m2}</b><span>=</span><b>${dau}${bl}</b></div>
      <div class="fill-line">Chữ số bị che là ${q.num(dv, 1)}</div>
    <div class="b23adv-lbl">c) Chữ số bị che ở thừa số thứ hai:</div>
      <div class="b23adv-eq"><b>${a3}</b><span>×</span><b>${bl}</b><span>=</span><b>${p3}</b></div>
      <div class="fill-line">Chữ số bị che là ${q.num(m3, 1)}</div>`,
    `a) ${a} × ${m} = ${p};  b) ${a2} × ${m2} = ${p2};  c) ${a3} × ${m3} = ${p3}.`);
},

/* 6. Bài toán ngược: tìm số lúc đầu */
() => {
  const q = Q(6, '');
  const xe = R(3, 5), moi = R(12, 18), con = R(10, 40), themBao = R(3, 6);
  const cho = xe * moi;
  const dau = cho + con;
  return q.done(`<p class="wordq">Người ta dùng xe chở gạo từ trong kho ra, mỗi xe chở ${moi} bao gạo.
      Sau khi ${xe} xe chở gạo đi, trong kho còn lại ${con} bao gạo.
      Hỏi lúc đầu trong kho có bao nhiêu bao gạo?</p>
    <div class="fill-line">${xe} xe đã chở đi ${q.num(cho, b23advLen(cho))} bao gạo.</div>
    <div class="fill-line">Lúc đầu trong kho có ${q.num(dau, b23advLen(dau))} bao gạo.</div>
    <div class="fill-line">Nếu mỗi xe chở thêm ${themBao} bao nữa thì ${xe} xe chở được
      ${q.num(xe * (moi + themBao), b23advLen(xe * (moi + themBao)))} bao gạo.</div>`,
    `${moi} × ${xe} = ${cho};  ${cho} + ${con} = ${dau};  `
    + `${moi + themBao} × ${xe} = ${xe * (moi + themBao)}.`);
},
];
