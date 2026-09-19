/* ===== NÂNG CAO — Bài 81: Ôn tập chung ===== */
ADV.b81 = [

/* 1. Lập số năm chữ số theo điều kiện */
() => {
  const q = Q(1, 'Từ bốn chữ số đã cho, hãy lập số lớn nhất và số bé nhất có bốn chữ số (các chữ số khác nhau).');
  const ds = [];
  let g = 0;
  while (ds.length < 4 && g++ < 60){ const x = R(1, 9); if (!ds.includes(x)) ds.push(x); }
  const lon = +[...ds].sort((a, b) => b - a).join('');
  const be = +[...ds].sort((a, b) => a - b).join('');
  return q.done(`<div class="given-nums">${ds.map(x => `<span class="cnode">${x}</span>`).join('')}</div>
    <div class="fill-line">Số lớn nhất là ${q.num(lon)}</div>
    <div class="fill-line">Số bé nhất là ${q.num(be)}</div>
    <div class="fill-line">Tổng hai số đó là ${q.num(lon + be)}</div>`,
    `${lon} + ${be} = ${lon + be}`);
},

/* 2. Biểu thức có ngoặc, nhiều bước */
() => {
  const q = Q(2, 'Tính giá trị của biểu thức.');
  const a = R(2, 9) * 1000, b = R(2, 9) * 100, k = R(2, 5), c = R(2, 9);
  const v1 = (a + b) * 1;
  const bt1 = `(${a} + ${b}) : ${1}`;
  const d = R(2, 9), e = d * k;
  return q.done(`<div class="eq-list">
      <div class="eq">${a} + ${b} × ${c} = ${q.num(a + b * c)}</div>
      <div class="eq">(${a} + ${b}) : ${k === 0 ? 1 : 1} − ${b} = ${q.num(a)}</div>
      <div class="eq">${e} : ${d} × ${c} = ${q.num(k * c)}</div>
    </div>`,
    'Nhân chia trước, cộng trừ sau; có ngoặc thì tính trong ngoặc trước');
},

/* 3. Bài toán ngược hai bước */
() => {
  const q = Q(3, '');
  const con = R(120, 480), cho = R(30, 90), k = R(2, 4);
  const dau = (con + cho) * k;
  return q.done(`<p class="wordq">Một kho gạo, sau khi chuyển đi ${'một phần ' + k} số gạo thì
      người ta lấy tiếp ${cho} bao nữa, trong kho còn lại ${con} bao gạo.</p>
    <div class="fill-line">Trước khi lấy ${cho} bao, trong kho có ${q.num(con + cho)} bao.</div>
    <div class="fill-line">Lúc đầu kho có ${q.num(dau)} bao gạo.</div>`,
    `${con} + ${cho} = ${con + cho};  ${con + cho} × ${k} = ${dau}`);
},

/* 4. Chu vi – diện tích liên hoàn */
() => {
  const q = Q(4, '');
  const c = R(6, 20);
  const dai = c * 2, rong = c;
  return q.done(`<p class="wordq">Một mảnh vườn hình chữ nhật có chiều rộng ${rong} m,
      chiều dài gấp 2 lần chiều rộng.</p>
    <div class="fill-line">Chiều dài mảnh vườn là ${q.num(dai)} m.</div>
    <div class="fill-line">Chu vi mảnh vườn là ${q.num((dai + rong) * 2)} m.</div>
    <div class="fill-line">Diện tích mảnh vườn là ${q.num(dai * rong)} m vuông.</div>`,
    `(${dai} + ${rong}) × 2 = ${(dai + rong) * 2};  ${dai} × ${rong} = ${dai * rong}`);
},

/* 5. So sánh biểu thức lớn */
() => {
  const q = Q(5, 'So sánh rồi điền dấu thích hợp.');
  const rows = [];
  for (let i = 0; i < 3; i++){
    const a = R(2, 9) * 10000, b = R(1, 9) * 1000;
    const trai = a + b;
    const k = R(1, 3);
    const phai = k === 1 ? trai : k === 2 ? trai + R(1, 900) : trai - R(1, 900);
    rows.push({t:`${a} + ${b}`, p:String(phai), d:trai > phai ? '>' : trai < phai ? '<' : '='});
  }
  return q.done(`<div class="two-col"><div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.t}</span>${q.sign(r.d)}<span class="side">${r.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},

/* 6. Toán thời gian – tiền */
() => {
  const q = Q(6, '');
  const gia = R(3, 9) * 1000, sl = R(3, 8);
  const dua = Math.max(50000, Math.ceil(gia * sl / 10000) * 10000);
  return q.done(`<p class="wordq">Mai mua ${sl} quyển vở, mỗi quyển giá ${nf(gia)} đồng.
      Mai đưa cô bán hàng tờ ${nf(dua)} đồng.</p>
    <div class="fill-line">Mai phải trả ${q.num(gia * sl)} đồng.</div>
    <div class="fill-line">Cô bán hàng trả lại Mai ${q.num(dua - gia * sl)} đồng.</div>`,
    `${gia} × ${sl} = ${gia * sl};  ${dua} − ${gia * sl} = ${dua - gia * sl}`);
},
];
