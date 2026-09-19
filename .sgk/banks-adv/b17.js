/* ===== NÂNG CAO — Bài 17: Hình tròn, tâm, đường kính, bán kính ===== */

const b17advBag = n => 'ABCDEGHIKMNOPQ'.split('').sort(() => Math.random() - .5).slice(0, n);

const b17advCOL = [['#bfe3b0', '#f0913a'], ['#f6b8cf', '#e8548c'], ['#bfe0f5', '#a889d6'],
  ['#fbe3a8', '#d8a020'], ['#d8ccf0', '#7a5bbd']];

/* một hàng hình tròn to dần, dùng cho bài tìm quy luật */
const b17advRow = vals => {
  const mx = Math.max.apply(null, vals);
  let x = 4, s = '';
  vals.forEach((v, i) => {
    const rr = 17 + (v / mx) * 33;
    x += rr + 11;
    s += `<circle cx="${x.toFixed(1)}" cy="62" r="${rr.toFixed(1)}" fill="none" stroke="#1e1e1e" stroke-width="2.8"/>
      <circle cx="${x.toFixed(1)}" cy="62" r="3"/>
      <text x="${x.toFixed(1)}" y="126" text-anchor="middle" font-size="15" font-weight="700">Hình ${i + 1}</text>`;
    x += rr + 11;
  });
  return `<svg viewBox="0 0 ${Math.round(x + 4)} 136" class="b17-fig wide">${s}</svg>`;
};

ADV.b17 = [

/* 1. Tổng bán kính và đường kính — chia thành ba phần bằng nhau */
() => {
  const q = Q(1, 'Tìm độ dài bán kính và đường kính của hình tròn theo điều kiện đã cho.');
  const L = b17advBag(4);
  const P = {O: L[0], C: L[1], D: L[2], A: L[3]};
  const r = R(3, 15), tong = 3 * r, them = R(2, 9);
  return q.done(ART.b17Draw(P, '?')
    + `<div class="bullet">Hình tròn tâm ${P.O} có bán kính ${P.O}${P.A} và đường kính ${P.C}${P.D}.</div>
       <div class="bullet">Tổng độ dài của bán kính ${P.O}${P.A} và đường kính ${P.C}${P.D} bằng ${tong} cm.</div>
       <div class="fill-line">Đường kính ${P.C}${P.D} dài gấp ${q.num(2, 1)} lần bán kính ${P.O}${P.A}.</div>
       <div class="fill-line">Vậy ${tong} cm gồm ${q.num(3, 1)} lần bán kính ${P.O}${P.A}.</div>
       <div class="fill-line">Bán kính ${P.O}${P.A} dài ${q.num(r)} cm.</div>
       <div class="fill-line">Đường kính ${P.C}${P.D} dài ${q.num(2 * r)} cm.</div>
       <div class="fill-line">Nếu bán kính dài thêm ${them} cm thì đường kính dài ${q.num(2 * (r + them))} cm.</div>`,
    `${tong} : 3 = ${r} (cm);  ${r} × 2 = ${2 * r} (cm);  (${r} + ${them}) × 2 = ${2 * (r + them)} (cm)`);
},

/* 2. Bài toán ngược: biết quãng đường, tìm bán kính mỗi bông hoa */
() => {
  const q = Q(2, '');
  const r = R(3, 14), tong = 6 * r;
  const COL = b17advCOL.slice().sort(() => Math.random() - .5).slice(0, 3);
  return q.done(`<p class="wordq">Ba bông hoa hình tròn bằng nhau đặt sát nhau như hình vẽ. Bọ ngựa bò từ điểm A
      theo đường gấp khúc ABCD và bò được tất cả ${tong} cm. Hỏi mỗi bông hoa có bán kính dài bao nhiêu xăng-ti-mét?</p>
    ${ART.b17Flowers('?', COL)}
    <div class="bullet">AB và CD đều là bán kính, BC gồm 4 bán kính.</div>
    <div class="fill-line">Cả đường gấp khúc ABCD gồm ${q.num(6, 1)} bán kính.</div>
    <div class="fill-line">Mỗi bông hoa có bán kính dài ${q.num(r)} cm.</div>
    <div class="fill-line">Mỗi bông hoa có đường kính dài ${q.num(2 * r)} cm.</div>
    <div class="fill-line">Đoạn BC dài ${q.num(4 * r)} cm.</div>`,
    `${tong} : 6 = ${r} (cm);  ${r} × 2 = ${2 * r} (cm);  ${r} × 4 = ${4 * r} (cm)`);
},

/* 3. So sánh bán kính với đường kính */
() => {
  const q = Q(3, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(3, 9), b = 2 * a + pick([-3, -1, 0, 0, 2, 4]);
    rows.push({t: `Đường kính của hình tròn bán kính ${a} cm`, p: `${b} cm`, l: 2 * a, r: b});
  }
  {
    const c = R(3, 9), d = c + pick([-2, -1, 0, 0, 1, 3]);
    rows.push({t: `Bán kính của hình tròn đường kính ${2 * c} cm`, p: `${d} cm`, l: c, r: d});
  }
  {
    const e = R(2, 9), f = e + pick([-1, 0, 0, 1, 2]);
    rows.push({t: `Đường kính của hình tròn bán kính ${e} cm`,
      p: `Đường kính của hình tròn bán kính ${f} cm`, l: 2 * e, r: 2 * f});
  }
  {
    const g = R(4, 9), h = R(1, 5);
    rows.push({t: `Bán kính của hình tròn đường kính ${2 * g} cm`,
      p: `Đường kính của hình tròn bán kính ${h} cm`, l: g, r: 2 * h});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Đường kính dài gấp 2 lần bán kính · Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},

/* 4. Tìm quy luật của dãy bán kính */
() => {
  const q = Q(4, 'Các hình tròn được vẽ theo một quy luật. Hãy tìm quy luật đó rồi viết tiếp.');
  const st = R(2, 8), b = pick([2, 3, 4, 5]);
  const seq = [0, 1, 2, 3].map(i => st + i * b);
  return q.done(b17advRow(seq)
    + `<div class="fill-line">Bán kính (cm) của các hình tròn lần lượt là:</div>
       <div class="chain pill">${seq.map(v => `<span class="cnode">${v}</span>`).join('')}
         <span class="cnode q">${q.num(st + 4 * b)}</span>
         <span class="cnode q">${q.num(st + 5 * b)}</span></div>
       <div class="fill-line">Bán kính của hai hình liền nhau hơn kém nhau ${q.num(b, 1)} cm.</div>
       <div class="fill-line">Hình thứ sáu có đường kính dài ${q.num(2 * (st + 5 * b))} cm.</div>
       <div class="fill-line">Đường kính hình thứ sáu dài hơn đường kính hình thứ nhất ${q.num(10 * b)} cm.</div>`,
    `Dãy bán kính cách đều ${b} cm: ${seq.join(', ')}, ${st + 4 * b}, ${st + 5 * b}. `
    + `Đường kính hình thứ sáu: ${st + 5 * b} × 2 = ${2 * (st + 5 * b)} (cm); `
    + `${2 * (st + 5 * b)} − ${2 * st} = ${10 * b} (cm).`);
},

/* 5. Suy luận: ba hình tròn liên hệ với nhau */
() => {
  const q = Q(5, 'Đọc kĩ các điều kiện rồi trả lời.');
  const N = b17advBag(3);
  const a = 2 * R(2, 6);
  return q.done(noteBox('Ba hình tròn ' + N.join(', ') + ' có độ dài liên hệ với nhau như sau:')
    + `<div class="bullet">Hình tròn ${N[0]} có bán kính dài ${a} cm.</div>
       <div class="bullet">Đường kính của hình tròn ${N[1]} dài bằng bán kính của hình tròn ${N[0]}.</div>
       <div class="bullet">Bán kính của hình tròn ${N[2]} dài bằng đường kính của hình tròn ${N[0]}.</div>
       <div class="fill-line">Hình tròn ${N[0]} có đường kính dài ${q.num(2 * a)} cm.</div>
       <div class="fill-line">Hình tròn ${N[1]} có bán kính dài ${q.num(a / 2)} cm.</div>
       <div class="fill-line">Hình tròn ${N[2]} có đường kính dài ${q.num(4 * a)} cm.</div>
       <div class="fill-line">Hình tròn to nhất là hình tròn ${q.pick(N[2], N.slice().sort())}</div>
       <div class="fill-line">Hình tròn bé nhất là hình tròn ${q.pick(N[1], N.slice().sort())}</div>`,
    `${N[0]}: bán kính ${a} cm, đường kính ${2 * a} cm. ${N[1]}: đường kính ${a} cm, bán kính ${a / 2} cm. `
    + `${N[2]}: bán kính ${2 * a} cm, đường kính ${4 * a} cm.`);
},
];
