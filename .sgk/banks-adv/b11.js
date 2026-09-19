/* ===== NÂNG CAO — Bài 11: Bảng nhân 8, bảng chia 8 ===== */

const b11advM8 = [16, 24, 32, 40, 48, 56, 64, 72];

const b11advCrab = `<svg viewBox="0 0 220 130" class="crab-svg">
  <ellipse cx="110" cy="72" rx="46" ry="30" fill="#8fbf9a" stroke="#4d7a58" stroke-width="3"/>
  <path d="M74 92l-22 24M92 100l-12 26M128 100l12 26M146 92l22 24M66 76l-30 8M154 76l30 8"
    stroke="#4d7a58" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M72 44q-20-14-30 2 10 6 18 4-6 8 2 14 12-6 10-20z" fill="#8fbf9a" stroke="#4d7a58" stroke-width="3"/>
  <path d="M148 44q20-14 30 2-10 6-18 4 6 8-2 14-12-6-10-20z" fill="#8fbf9a" stroke="#4d7a58" stroke-width="3"/>
  <circle cx="96" cy="58" r="8" fill="#fff" stroke="#4d7a58" stroke-width="2.4"/>
  <circle cx="124" cy="58" r="8" fill="#fff" stroke="#4d7a58" stroke-width="2.4"/>
  <circle cx="96" cy="59" r="3" fill="#2a3b2f"/><circle cx="124" cy="59" r="3" fill="#2a3b2f"/>
  <path d="M96 84q14 10 28 0" fill="none" stroke="#4d7a58" stroke-width="2.6"/>
</svg>`;

const b11advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

ADV.b11 = [

/* 1. Tìm số theo nhiều điều kiện */
() => {
  const q = Q(1, 'Tìm số thoả mãn tất cả các điều kiện sau.');
  const m = pick(b11advM8);
  const lo = m - R(9, 15), hi = m + R(9, 15);
  const tong = Math.floor(m / 10) + m % 10;
  return q.done(`<div class="bullet">Số đó là kết quả của một phép nhân trong bảng nhân 8.</div>
    <div class="bullet">Số đó lớn hơn ${lo} và bé hơn ${hi}.</div>
    <div class="bullet">Tổng hai chữ số của số đó bằng ${tong}.</div>
    <div class="fill-line">Số đó là ${q.num(m, 2)}</div>
    <div class="fill-line">Số đó chia cho 8 được ${q.num(m / 8, 2)}</div>`,
    `Trong bảng nhân 8, chỉ có ${m} vừa lớn hơn ${lo}, vừa bé hơn ${hi} và có tổng hai chữ số bằng ${tong}.`);
},

/* 2. Đàn cua — bài toán ngược từ số chân tìm số con */
() => {
  const q = Q(2, '');
  const con = R(4, 9), chan = 8 * con;
  return q.done(`<p class="wordq">Mỗi con cua có 8 cái chân và 2 cái càng. Một đàn cua có tất cả ${chan} cái chân.</p>
    ${b11advCrab}
    <div class="fill-line">Đàn cua đó có ${q.num(con, 2)} con cua.</div>
    <div class="fill-line">Đàn cua đó có ${q.num(2 * con, 2)} cái càng.</div>
    <div class="fill-line">Đàn cua đó có tất cả ${q.num(chan + 2 * con, 2)} cái chân và càng.</div>`,
    `${chan} : 8 = ${con} (con);  2 × ${con} = ${2 * con} (cái càng);  ${chan} + ${2 * con} = ${chan + 2 * con}`);
},

/* 3. Dãy số đếm thêm 8 */
() => {
  const q = Q(3, 'Viết các số còn thiếu vào dãy số sau.');
  const st = pick([8, 16, 24, 32]);
  const hide = [2, 4, 6];
  const seq = Array.from({length:7}, (_, i) => st + i * 8);
  return q.done(`<div class="chain pill">${seq.map((v, i) =>
      `<span class="cnode${hide.includes(i) ? ' q' : ''}">${hide.includes(i) ? q.num(v, 2) : v}</span>`).join('')}</div>
    <div class="fill-line">Hai số liền nhau trong dãy hơn kém nhau ${q.num(8)} đơn vị.</div>
    <div class="fill-line">Số thứ mười của dãy số đó là ${q.num(st + 72, 3)}</div>`,
    `Số thứ mười = ${st} + 8 × 9 = ${st} + 72 = ${st + 72}`);
},

/* 4. So sánh hai biểu thức */
() => {
  const q = Q(4, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(2, 10), b = R(2, 10);
    rows.push({t:`8 × ${a}`, p:`${b} × 8`, l:8 * a, r:8 * b});
  }
  {
    const a = R(2, 10), b = R(2, 10);
    rows.push({t:`${8 * a} : 8`, p:`${7 * b} : 7`, l:a, r:b});
  }
  {
    const a = R(2, 8), b = a + pick([0, 1, 1, 2]);
    rows.push({t:`8 × ${a} + 8`, p:`8 × ${b}`, l:8 * a + 8, r:8 * b});
  }
  {
    const a = R(2, 9), c = Math.max(1, a + pick([-1, 0, 0, 1]));
    rows.push({t:`${8 * a} : 8`, p:`${6 * c} : 6`, l:a, r:c});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính giá trị của mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},

/* 5. Bài toán ba bước: hộp bánh rồi chia đều */
() => {
  const q = Q(5, '');
  const hop = R(7, 10), ban = pick([2, 3, 4, 5]), moi = R(4, 9);
  const tong = 8 * hop, conlai = ban * moi, an = tong - conlai;
  return q.done(`<p class="wordq">Có ${hop} hộp bánh, mỗi hộp có 8 chiếc bánh. Mọi người đã ăn hết ${an} chiếc bánh.
      Số bánh còn lại được chia đều cho ${ban} bạn.</p>
    <div class="fill-line">Lúc đầu có tất cả ${q.num(tong, 2)} chiếc bánh.</div>
    <div class="fill-line">Số bánh còn lại là ${q.num(conlai, 2)} chiếc.</div>
    <div class="fill-line">Mỗi bạn được ${q.num(moi, 2)} chiếc bánh.</div>`,
    `8 × ${hop} = ${tong};  ${tong} − ${an} = ${conlai};  ${conlai} : ${ban} = ${moi}`);
},

/* 6. Sơ đồ phép tính có nhân 8 — tìm số ban đầu */
() => {
  const q = Q(6, 'Tìm các số còn thiếu, biết kết quả cuối cùng đã cho.');
  const st = R(2, 9), n2 = 8 * st;
  const x = R(5, n2 - 1), n3 = n2 - x;
  const z = R(5, 40), n4 = n3 + z;
  return q.done(`<div class="flow">
      <span class="fnode sq">${q.num(st)}</span>${b11advArrow('× 8')}
      <span class="fnode circle">${q.num(n2, 2)}</span>${b11advArrow('− ' + x)}
      <span class="fnode sq">${q.num(n3, 2)}</span>${b11advArrow('+ ' + z)}
      <span class="fnode circle">${n4}</span>
    </div>
    <div class="hint-line">Hãy tính ngược từ kết quả cuối cùng trở về số ban đầu.</div>`,
    `${n4} − ${z} = ${n3};  ${n3} + ${x} = ${n2};  ${n2} : 8 = ${st}`);
},
];
