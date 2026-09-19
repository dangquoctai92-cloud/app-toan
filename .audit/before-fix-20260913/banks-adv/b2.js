/* ===== NÂNG CAO — Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1 000 ===== */

const b2advArrow = `<svg viewBox="0 0 120 20"><path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/><path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg>`;

/* sinh một dòng so sánh: trả về {t, p, tv, pv} */
const b2advCmpRow = () => {
  const k = R(1, 4);
  if (k === 1){
    const a = R(120, 470), b = R(110, 380);
    return {t:`${a} + ${b}`, p:`${b} + ${a}`, tv:a + b, pv:b + a};
  }
  if (k === 2){
    const a = R(120, 460), b = R(110, 290), d = R(5, 60);
    return {t:`${a} + ${b}`, p:`${a} + ${b + d}`, tv:a + b, pv:a + b + d};
  }
  if (k === 3){
    const a = R(420, 900), b = R(60, 200), d = R(5, 60);
    return {t:`${a} − ${b}`, p:`${a} − ${b + d}`, tv:a - b, pv:a - b - d};
  }
  const a = R(220, 600), b = R(110, 300), c = a + b + pick([-1, 1]) * R(6, 45);
  return {t:`${a} + ${b}`, p:`${c}`, tv:a + b, pv:c};
};

ADV.b2 = [

/* 1. Bài toán ngược trên sơ đồ: biết kết quả cuối, tìm số ban đầu */
() => {
  const q = Q(1, 'Số ban đầu là số nào? Biết kết quả cuối cùng của sơ đồ đã cho sẵn.');
  const st = R(120, 480), p = R(105, 305), m = R(60, 260);
  const giua = st + p, cuoi = giua - m;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(st)}</span>
      <span class="farrow"><i>+ ${p}</i>${b2advArrow}</span>
      <span class="fnode circle">${q.num(giua)}</span>
      <span class="farrow"><i>− ${m}</i>${b2advArrow}</span>
      <span class="fnode tri">${cuoi}</span>
    </div>
    <div class="hint-line">Hãy làm ngược từ phải sang trái: lấy ${cuoi} cộng lại ${m}, rồi bớt đi ${p}.</div>`,
    `${cuoi} + ${m} = ${giua};  ${giua} − ${p} = ${st}`);
},

/* 2. Bài toán ngược bằng lời: Rô-bốt nghĩ ra một số */
() => {
  const q = Q(2, 'Đọc kĩ rồi tìm số Rô-bốt đã nghĩ.');
  const so = R(140, 460), a = R(105, 290), b = R(60, 240), d = R(30, 120);
  const kq = so + a - b;
  return q.done(`<p class="wordq">Rô-bốt nghĩ ra một số. Rô-bốt lấy số đó cộng với ${a},
      rồi trừ đi ${b} thì được ${kq}.</p>
    <div class="fill-line">a) Trước khi trừ đi ${b}, Rô-bốt có số ${q.num(so + a)}</div>
    <div class="fill-line">b) Số Rô-bốt đã nghĩ là ${q.num(so)}</div>
    <div class="fill-line">c) Nếu lấy số Rô-bốt nghĩ trừ đi ${d} thì được ${q.num(so - d)}</div>`,
    `${kq} + ${b} = ${so + a};  ${so + a} − ${a} = ${so};  ${so} − ${d} = ${so - d}`);
},

/* 3. Tháp số: mỗi ô ở trên bằng tổng hai ô kề nhau ở dưới */
() => {
  const q = Q(3, 'Tìm các số còn thiếu trong tháp số.');
  const x = R(50, 170), y = R(50, 170), z = R(50, 170);
  const t1 = x + y, t2 = y + z, dinh = t1 + t2;
  return q.done(`<div class="chain pill"><span class="cnode q">${q.num(dinh)}</span></div>
    <div class="chain pill"><span class="cnode">${t1}</span><span class="cnode q">${q.num(t2)}</span></div>
    <div class="chain pill"><span class="cnode">${x}</span><span class="cnode q">${q.num(y)}</span><span class="cnode">${z}</span></div>
    <div class="hint-line">Mỗi ô ở hàng trên bằng tổng của hai ô kề nhau ở hàng dưới.</div>`,
    `${t1} − ${x} = ${y};  ${y} + ${z} = ${t2};  ${t1} + ${t2} = ${dinh}`);
},

/* 4. So sánh hai biểu thức (không cần tính hết) */
() => {
  const q = Q(4, 'So sánh giá trị hai biểu thức rồi điền dấu thích hợp.');
  const rows = Array.from({length:4}, () => b2advCmpRow());
  return q.done(`<div class="two-col"><div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${r.t}</span>${q.sign(r.tv > r.pv ? '>' : r.tv < r.pv ? '<' : '=')}<span class="side">${r.p}</span></div>`
    ).join('')}</div></div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(r => `${r.tv} và ${r.pv}`).join(' · '));
},

/* 5. Bài toán ba bước tính */
() => {
  const q = Q(5, '');
  const kho = R(60, 90) * 10, n1 = R(80, 180), them = R(20, 90);
  const n2 = n1 + them, hai = n1 + n2, con = kho - hai;
  return q.done(`<p class="wordq">Một kho có ${kho} kg gạo. Ngày thứ nhất kho bán được ${n1} kg gạo,
      ngày thứ hai bán được nhiều hơn ngày thứ nhất ${them} kg gạo.</p>
    <div class="fill-line">a) Ngày thứ hai kho bán được ${q.num(n2)} kg gạo.</div>
    <div class="fill-line">b) Cả hai ngày kho bán được ${q.num(hai)} kg gạo.</div>
    <div class="fill-line">c) Sau hai ngày, kho còn lại ${q.num(con)} kg gạo.</div>`,
    `${n1} + ${them} = ${n2};  ${n1} + ${n2} = ${hai};  ${kho} − ${hai} = ${con}`);
},

/* 6. Suy luận: ba bạn và số bông hoa */
() => {
  const q = Q(6, 'Suy luận rồi tìm số bông hoa của mỗi bạn.');
  const mai = R(25, 90), nam = R(25, 90), viet = R(25, 90);
  const T = mai + nam + viet, M = mai + nam, N = nam + viet;
  return q.done(`<p class="wordq">Ba bạn Mai, Nam và Việt có tất cả ${T} bông hoa. Mai và Nam có ${M} bông hoa.
      Nam và Việt có ${N} bông hoa.</p>
    <div class="fill-line">a) Việt có ${q.num(viet)} bông hoa.</div>
    <div class="fill-line">b) Mai có ${q.num(mai)} bông hoa.</div>
    <div class="fill-line">c) Nam có ${q.num(nam)} bông hoa.</div>`,
    `${T} − ${M} = ${viet};  ${T} − ${N} = ${mai};  ${M} − ${mai} = ${nam}`);
},
];
