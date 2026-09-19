/* ===== NÂNG CAO — Bài 1: Ôn tập các số đến 1 000 ===== */
ADV.b1 = [

/* 1. Lập số lớn nhất / bé nhất từ ba chữ số */
() => {
  const q = Q(1, 'Từ ba chữ số đã cho, hãy lập số lớn nhất và số bé nhất (các chữ số khác nhau).');
  const ds = [];
  let g = 0;
  while (ds.length < 3 && g++ < 40){ const x = R(1, 9); if (!ds.includes(x)) ds.push(x); }
  const sap = [...ds].sort((a, b) => b - a);
  const lon = +sap.join(''), be = +[...ds].sort((a, b) => a - b).join('');
  return q.done(`<div class="given-nums">${ds.map(x => `<span class="cnode">${x}</span>`).join('')}</div>
    <div class="fill-line">Số lớn nhất là ${q.num(lon)}</div>
    <div class="fill-line">Số bé nhất là ${q.num(be)}</div>
    <div class="fill-line">Hiệu của hai số đó là ${q.num(lon - be)}</div>`,
    `${lon} − ${be} = ${lon - be}`);
},

/* 2. Tìm số theo điều kiện các hàng */
() => {
  const q = Q(2, 'Tìm số có ba chữ số thoả mãn tất cả các điều kiện sau.');
  const t = R(2, 9), d = R(0, 9);
  const c = R(0, 9);
  const n = t * 100 + c * 10 + d;
  const tong = t + c + d;
  return q.done(`<div class="bullet">Chữ số hàng trăm là ${t}.</div>
    <div class="bullet">Chữ số hàng chục là ${c}.</div>
    <div class="bullet">Tổng ba chữ số bằng ${tong}.</div>
    <div class="fill-line">Số đó là ${q.num(n)}</div>`,
    `Chữ số hàng đơn vị = ${tong} − ${t} − ${c} = ${d}`);
},

/* 3. Dãy số cách đều nâng cao */
() => {
  const q = Q(3, 'Viết tiếp ba số của dãy số sau.');
  const st = R(100, 400), b = pick([5, 15, 25, 50, 100]);
  const seq = [0,1,2,3].map(i => st + i * b);
  return q.done(`<div class="chain pill">${seq.map(x => `<span class="cnode">${x}</span>`).join('')}
      <span class="cnode q">${q.num(st + 4*b)}</span>
      <span class="cnode q">${q.num(st + 5*b)}</span>
      <span class="cnode q">${q.num(st + 6*b)}</span></div>`,
    `Dãy số cách đều ${b} đơn vị`);
},

/* 4. So sánh biểu thức */
() => {
  const q = Q(4, 'So sánh hai vế rồi điền dấu thích hợp.');
  const rows = [];
  for (let i = 0; i < 3; i++){
    const a = R(2, 9) * 100, b = R(1, 9) * 10, c = R(1, 9);
    const traiV = a + b + c;
    const k = R(1, 3);
    const phaiV = k === 1 ? traiV : k === 2 ? traiV + R(1, 40) : traiV - R(1, 40);
    rows.push({trai:`${a} + ${b} + ${c}`, phai:String(phaiV), d:traiV > phaiV ? '>' : traiV < phaiV ? '<' : '='});
  }
  return q.done(`<div class="two-col"><div>${rows.map(r =>
    `<div class="cmp-row"><span class="side">${r.trai}</span>${q.sign(r.d)}<span class="side">${r.phai}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},

/* 5. Bài toán suy luận hai bước */
() => {
  const q = Q(5, '');
  const nam = R(120, 380), them = R(20, 90), bot = R(10, 60);
  return q.done(`<p class="wordq">Một cửa hàng buổi sáng bán được ${nam} quyển vở. Buổi chiều bán được
      nhiều hơn buổi sáng ${them} quyển. Sau đó cửa hàng nhập thêm ${bot} quyển vở.</p>
    <div class="fill-line">Buổi chiều bán được ${q.num(nam + them)} quyển.</div>
    <div class="fill-line">Cả ngày bán được ${q.num(nam + nam + them)} quyển.</div>`,
    `${nam} + ${them} = ${nam+them};  ${nam} + ${nam+them} = ${2*nam+them}`);
},
];
