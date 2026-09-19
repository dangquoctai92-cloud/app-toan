/* ===== NÂNG CAO — Bài 72: Luyện tập chung =====
   Dùng lại các hàm của phần cơ bản trong cùng bài: NSP72, het72, du72, nhan72,
   ART.b72Tien. Hàm riêng của phần nâng cao đặt tiền tố b72adv. */

/* mũi tên có nhãn cho sơ đồ "máy tính số" */
ART.b72advArrow = lbl => `<span class="farrow"><i>${lbl}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

/* dấu so sánh của hai giá trị */
const b72advDau = (l, r) => l > r ? '>' : l < r ? '<' : '=';

/* một chữ số trong 2..9 khác chữ số c */
const b72advKhac = c => { const d = R(2, 8); return d >= c ? d + 1 : d; };

ADV.b72 = [

/* 1. Tìm thành phần chưa biết của phép nhân, phép chia (toán ngược) */
() => {
  const q = Q(1, 'Tìm số còn thiếu trong mỗi phép tính sau.');
  const A = du72();                     /* a) tìm số bị chia (phép chia có dư) */
  const B = nhan72();                   /* b) tìm thừa số                      */
  const C = het72();                    /* c) tìm số chia                      */
  const D = du72();                     /* d) tìm số chia (phép chia có dư)    */
  const html = `<div class="b72adv-box">
      <div class="b72adv-eq"><span class="b72-let">a)</span>${q.num(A.a)}
        <span class="op">:</span> ${A.b} <span class="op">=</span> ${NSP72(A.t)}
        <span class="b72adv-du">(dư ${A.r})</span></div>
      <div class="b72adv-eq"><span class="b72-let">b)</span>${q.num(B.a)}
        <span class="op">×</span> ${B.b} <span class="op">=</span> ${NSP72(B.r)}</div>
      <div class="b72adv-eq"><span class="b72-let">c)</span>${NSP72(C.a)}
        <span class="op">:</span> ${q.num(C.b, 1)} <span class="op">=</span> ${NSP72(C.t)}</div>
      <div class="b72adv-eq"><span class="b72-let">d)</span>${NSP72(D.a)}
        <span class="op">:</span> ${q.num(D.b, 1)} <span class="op">=</span> ${NSP72(D.t)}
        <span class="b72adv-du">(dư ${D.r})</span></div>
    </div>
    <div class="hint-line">Muốn tìm số bị chia của phép chia có dư thì lấy thương nhân với số chia
      rồi cộng với số dư. Muốn tìm một thừa số thì lấy tích chia cho thừa số kia.
      Muốn tìm số chia thì lấy số bị chia trừ số dư rồi chia cho thương.</div>`;
  return q.done(html,
    `a) Số bị chia = ${NSP72(A.t)} × ${A.b} + ${A.r} = ${NSP72(A.a)}.  `
    + `b) Thừa số = ${NSP72(B.r)} : ${B.b} = ${NSP72(B.a)}.  `
    + `c) Số chia = ${NSP72(C.a)} : ${NSP72(C.t)} = ${C.b}.  `
    + `d) ${NSP72(D.a)} − ${D.r} = ${NSP72(D.a - D.r)};  ${NSP72(D.a - D.r)} : ${NSP72(D.t)} = ${D.b}.`);
},

/* 2. So sánh giá trị của hai biểu thức */
() => {
  const q = Q(2, 'Tính giá trị của hai biểu thức rồi điền dấu thích hợp vào ô trống.');
  /* a) A × c  và  A × d  (c khác d) */
  const ca = R(2, 9), da = b72advKhac(ca);
  const Aa = R(1000, Math.min(9999, Math.floor(99999 / Math.max(ca, da))));
  const la = Aa * ca, ra = Aa * da;
  /* b) (A + B) × c  và  A × c + B × e */
  const cb = R(2, 5);
  let eb = pick([cb, cb + 1, cb - 1]);
  if (eb < 2) eb = cb + 1;
  const Ab = R(1000, 4000), Bb = R(1000, 4000);
  const lb = (Ab + Bb) * cb, rb = Ab * cb + Bb * eb;
  /* c) N : c : d  và  N : (c × d) */
  const cc = R(2, 5), dc = R(2, 5);
  const tc = R(1000, Math.floor(99999 / (cc * dc)));
  const Nc = tc * cc * dc;
  const lc = tc, rc = tc;
  /* d) A × c  và  một số cho trước */
  const cd = R(2, 9);
  const Ad = R(1000, Math.min(9999, Math.floor(99999 / cd)));
  const ld = Ad * cd;
  const rd = ld + pick([0, R(1, 900), -R(1, 900)]);
  const rows = [
    {L: 'a)', t: `${NSP72(Aa)} <span class="op">×</span> ${ca}`,
     p: `${NSP72(Aa)} <span class="op">×</span> ${da}`, d: b72advDau(la, ra)},
    {L: 'b)', t: `(${NSP72(Ab)} <span class="op">+</span> ${NSP72(Bb)}) <span class="op">×</span> ${cb}`,
     p: `${NSP72(Ab)} <span class="op">×</span> ${cb} <span class="op">+</span> ${NSP72(Bb)} <span class="op">×</span> ${eb}`,
     d: b72advDau(lb, rb)},
    {L: 'c)', t: `${NSP72(Nc)} <span class="op">:</span> ${cc} <span class="op">:</span> ${dc}`,
     p: `${NSP72(Nc)} <span class="op">:</span> (${cc} <span class="op">×</span> ${dc})`,
     d: b72advDau(lc, rc)},
    {L: 'd)', t: `${NSP72(Ad)} <span class="op">×</span> ${cd}`,
     p: `${NSP72(rd)}`, d: b72advDau(ld, rd)}
  ];
  const html = '<div class="b72adv-cmp">' + rows.map(r =>
    `<div class="cmp-row"><span class="b72-let">${r.L}</span><span class="side">${r.t}</span>
      ${q.sign(r.d)}<span class="side">${r.p}</span></div>`).join('') + '</div>'
    + `<div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; = . Hãy tính giá trị của từng vế
        rồi mới so sánh.</div>`;
  return q.done(html,
    `a) ${NSP72(la)} và ${NSP72(ra)} nên điền dấu ${rows[0].d}.  `
    + `b) ${NSP72(lb)} và ${NSP72(rb)} nên điền dấu ${rows[1].d}.  `
    + `c) ${NSP72(Nc)} : ${cc} : ${dc} = ${NSP72(lc)};  ${cc} × ${dc} = ${cc * dc}, `
    + `${NSP72(Nc)} : ${cc * dc} = ${NSP72(rc)} nên điền dấu ${rows[2].d}.  `
    + `d) ${NSP72(ld)} và ${NSP72(rd)} nên điền dấu ${rows[3].d}.`);
},

/* 3. Bài toán rút về đơn vị (chia rồi nhân) */
() => {
  const q = Q(3, '');
  const s = R(4, 9);
  const g = R(1000, 9999);
  const A = s * g;
  const k = R(2, s - 1);
  const lay = k * g;
  const con = A - lay;
  const html = `<p class="wordq">Một nhà máy sản xuất được ${NSP72(A)} chiếc khẩu trang và đóng đều
      vào ${s} thùng. Nhà máy đã chuyển đi ${k} thùng khẩu trang như thế.</p>
    <div class="b72adv-ask">
      <div class="b72-line"><span class="b72-let">a)</span>Mỗi thùng có ${q.num(g)} chiếc khẩu trang.</div>
      <div class="b72-line"><span class="b72-let">b)</span>Nhà máy đã chuyển đi ${q.num(lay)} chiếc khẩu trang.</div>
      <div class="b72-line"><span class="b72-let">c)</span>Nhà máy còn lại ${q.num(con)} chiếc khẩu trang.</div>
    </div>
    <div class="hint-line">Trước hết hãy tìm số khẩu trang của một thùng, sau đó mới tính
      số khẩu trang của ${k} thùng.</div>`;
  return q.done(html,
    `${NSP72(A)} : ${s} = ${NSP72(g)} (chiếc);  ${NSP72(g)} × ${k} = ${NSP72(lay)} (chiếc);  `
    + `${NSP72(A)} − ${NSP72(lay)} = ${NSP72(con)} (chiếc).`);
},

/* 4. Chia có dư — số hộp cần dùng để đóng hết */
() => {
  const q = Q(4, '');
  const D = du72();
  const can = D.t + 1;
  const them = D.b - D.r;
  const html = `<p class="wordq">Một xưởng sản xuất được ${NSP72(D.a)} quyển vở. Người ta đóng số vở
      đó vào các hộp, mỗi hộp ${D.b} quyển.</p>
    <div class="b72adv-ask">
      <div class="b72-line"><span class="b72-let">a)</span>Đóng được ${q.num(D.t)} hộp đầy vở và
        còn thừa ${q.num(D.r, 1)} quyển.</div>
      <div class="b72-line"><span class="b72-let">b)</span>Muốn đóng hết số vở đó thì cần ít nhất
        ${q.num(can)} hộp.</div>
      <div class="b72-line"><span class="b72-let">c)</span>Cần sản xuất thêm ít nhất ${q.num(them, 1)}
        quyển vở nữa để hộp cuối cùng cũng đầy.</div>
    </div>
    <div class="hint-line">Số vở thừa vẫn phải xếp vào một hộp nữa, nên số hộp cần dùng
      nhiều hơn số hộp đầy 1 hộp.</div>`;
  return q.done(html,
    `${NSP72(D.a)} : ${D.b} = ${NSP72(D.t)} (dư ${D.r}) nên đóng được ${NSP72(D.t)} hộp đầy, `
    + `thừa ${D.r} quyển. Số vở thừa xếp vào thêm 1 hộp nữa, vậy cần ${NSP72(D.t)} + 1 = ${NSP72(can)} hộp. `
    + `Hộp cuối còn thiếu ${D.b} − ${D.r} = ${them} (quyển).`);
},

/* 5. Sơ đồ máy tính số: tính xuôi và tính ngược theo chiều mũi tên */
() => {
  const q = Q(5, '<span class="tag">Số</span> ? (tính theo chiều mũi tên)');
  /* a) tính xuôi */
  const da = R(2, 5), ca = R(2, 5);
  const ua = R(500, 1900);
  const N1 = ua * da;
  const m1 = N1 * ca;
  const p1 = ua * ca;
  const e1 = R(101, 999);
  const k1 = p1 + e1;
  /* b) tính ngược */
  const cb = R(2, 7);
  const xb = R(1000, Math.floor(99999 / cb));
  const yb = xb * cb;
  const eb = R(101, 999);
  const kb = yb - eb;
  const html = `<div class="sub-lbl">a)</div>
    <div class="flow b72adv-flow">
      <span class="fnode circle">${NSP72(N1)}</span>${ART.b72advArrow('&times; ' + ca)}
      <span class="fnode sq">${q.num(m1)}</span>${ART.b72advArrow(': ' + da)}
      <span class="fnode sq">${q.num(p1)}</span>${ART.b72advArrow('+ ' + e1)}
      <span class="fnode sq">${q.num(k1)}</span></div>
    <div class="sub-lbl">b)</div>
    <div class="flow b72adv-flow">
      <span class="fnode circle">${q.num(xb)}</span>${ART.b72advArrow('&times; ' + cb)}
      <span class="fnode sq">${q.num(yb)}</span>${ART.b72advArrow('&minus; ' + eb)}
      <span class="fnode sq">${NSP72(kb)}</span></div>
    <div class="hint-line">Ở phần b) đã biết số cuối cùng, em hãy tính ngược theo chiều mũi tên:
      muốn tìm số trước dấu &minus; thì lấy kết quả cộng thêm ${eb}, muốn tìm số trước dấu &times;
      thì lấy kết quả chia cho ${cb}.</div>`;
  return q.done(html,
    `a) ${NSP72(N1)} × ${ca} = ${NSP72(m1)};  ${NSP72(m1)} : ${da} = ${NSP72(p1)};  `
    + `${NSP72(p1)} + ${e1} = ${NSP72(k1)}.  `
    + `b) ${NSP72(kb)} + ${eb} = ${NSP72(yb)};  ${NSP72(yb)} : ${cb} = ${NSP72(xb)}.`);
},

/* 6. Bài toán về tiền Việt Nam — nhiều bước tính */
() => {
  const q = Q(6, '');
  const co = 100000;
  const k = R(4, 8);
  const gia = R(4, 14) * 500;
  const vo = k * gia;
  const but = pick([4000, 5000, 8000, 10000, 12000, 15000]);
  const tong = vo + but;
  const con = co - tong;
  const them = Math.floor(con / gia);
  const html = `<p class="wordq">Mẹ đưa cho Mai hai tờ tiền loại 50 000 đồng. Mai mua ${k} quyển vở,
      mỗi quyển giá ${NSP72(gia)} đồng và mua một chiếc bút giá ${NSP72(but)} đồng.</p>
    <div class="b72-money">${ART.b72Tien(50000)}${ART.b72Tien(50000)}</div>
    <div class="b72adv-ask">
      <div class="b72-line"><span class="b72-let">a)</span>Mẹ đưa cho Mai ${q.num(co)} đồng.</div>
      <div class="b72-line"><span class="b72-let">b)</span>Mai mua vở hết ${q.num(vo)} đồng.</div>
      <div class="b72-line"><span class="b72-let">c)</span>Mai mua cả vở và bút hết ${q.num(tong)} đồng.</div>
      <div class="b72-line"><span class="b72-let">d)</span>Mai còn lại ${q.num(con)} đồng.</div>
      <div class="b72-line"><span class="b72-let">e)</span>Với số tiền còn lại, Mai mua được nhiều nhất
        ${q.num(them, 1)} quyển vở nữa.</div>
    </div>
    <div class="hint-line">Ở câu e) hãy lấy số tiền còn lại chia cho giá một quyển vở,
      phần dư không đủ mua thêm một quyển nào nữa.</div>`;
  return q.done(html,
    `50 000 × 2 = ${NSP72(co)} (đồng);  ${NSP72(gia)} × ${k} = ${NSP72(vo)} (đồng);  `
    + `${NSP72(vo)} + ${NSP72(but)} = ${NSP72(tong)} (đồng);  `
    + `${NSP72(co)} − ${NSP72(tong)} = ${NSP72(con)} (đồng).  `
    + `${NSP72(con)} : ${NSP72(gia)} = ${them} (dư ${NSP72(con - them * gia)}) nên mua thêm được `
    + `nhiều nhất ${them} quyển vở.`);
},
];
