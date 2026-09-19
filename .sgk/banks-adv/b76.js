/* ===== NÂNG CAO — Bài 76: Ôn tập các số trong phạm vi 10 000, 100 000 =====
   Dùng lại của phần cơ bản: SP76 (viết 35 760), b76Mix, b76Doc (đọc số),
   b76Tach (tách thành tổng), ART.robot. Hàm riêng đặt tiền tố b76adv. */

/* viết số thành tổng các hàng: 40 508 -> "40 000 + 500 + 8" */
const b76advTong = n => b76Tach(n).map(SP76).join(' + ');

/* mô tả số theo các hàng: 42 305 -> "4 chục nghìn, 2 nghìn, 3 trăm và 5 đơn vị" */
const b76advGom = n => {
  const TEN = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn'];
  const s = String(n), out = [];
  for (let i = 0; i < s.length; i++){
    const d = +s[i], p = s.length - 1 - i;
    if (d) out.push(`${d} ${TEN[p]}`);
  }
  if (out.length === 1) return out[0];
  return out.slice(0, -1).join(', ') + ' và ' + out[out.length - 1];
};

/* viết hoa chữ cái đầu của cách đọc số */
const b76advHoa = s => s.charAt(0).toUpperCase() + s.slice(1);

ADV.b76 = [

/* 1. Lập số có năm chữ số từ năm tấm thẻ */
() => {
  const q = Q(1, 'Từ năm tấm thẻ ghi các chữ số dưới đây, hãy lập các số có năm chữ số '
    + '(mỗi tấm thẻ dùng đúng một lần).');
  const ds = b76Mix([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 5);
  const lon = +[...ds].sort((a, b) => b - a).join('');
  const be = +[...ds].sort((a, b) => a - b).join('');
  const x = pick(ds.filter(d => d !== Math.max(...ds)));
  const conLai = ds.filter(d => d !== x).sort((a, b) => b - a);
  const cx = +(String(x) + conLai.join(''));

  const html = '<div class="b76adv-cards">'
    + [...ds].sort((a, b) => a - b).map(d => `<div class="b76adv-card">${d}</div>`).join('')
    + '</div>'
    + `<div class="b76-line"><span class="b76-let">a)</span>Số lớn nhất lập được là ${q.num(lon)}</div>
      <div class="b76-line"><span class="b76-let">b)</span>Số bé nhất lập được là ${q.num(be)}</div>
      <div class="b76-line"><span class="b76-let">c)</span>Trong các số lập được mà chữ số hàng chục nghìn
        là ${x}, số lớn nhất là ${q.num(cx)}</div>
      <div class="b76-line"><span class="b76-let">d)</span>Hiệu của số ở câu a) và số ở câu b)
        là ${q.num(lon - be)}</div>
      <div class="hint-line">Muốn được số lớn nhất, em xếp các chữ số từ lớn đến bé kể từ hàng
        chục nghìn. Muốn được số bé nhất thì xếp ngược lại.</div>`;
  return q.done(html,
    `a) Xếp các chữ số từ lớn đến bé: ${SP76(lon)}. `
    + `b) Xếp các chữ số từ bé đến lớn: ${SP76(be)}. `
    + `c) Giữ chữ số ${x} ở hàng chục nghìn, bốn chữ số còn lại xếp từ lớn đến bé: ${SP76(cx)}. `
    + `d) ${SP76(lon)} − ${SP76(be)} = ${SP76(lon - be)}.`);
},

/* 2. Tìm số có năm chữ số theo các điều kiện */
() => {
  const q = Q(2, 'Rô-bốt nghĩ ra một số. Em hãy tìm số của Rô-bốt.');
  const cn = R(1, 9), ng = R(0, 9), dv = R(0, 9);
  const ch = cn;
  const n = cn * 10000 + ng * 1000 + ch * 10 + dv;
  const tong = cn + ng + ch + dv;

  const html = `<div class="b76-banner">${ART.robot}
      <div class="b76-nums">Số của tớ có<br>năm chữ số!</div></div>
    <div class="b76adv-note">
      <div>Chữ số hàng chục nghìn là ${cn}.</div>
      <div>Chữ số hàng nghìn là ${ng}.</div>
      <div>Chữ số hàng trăm là 0.</div>
      <div>Chữ số hàng chục bằng chữ số hàng chục nghìn.</div>
      <div>Tổng các chữ số của số đó bằng ${tong}.</div>
    </div>
    <div class="b76-line"><span class="b76-let">a)</span>Số của Rô-bốt là ${q.num(n)}</div>
    <div class="b76-line"><span class="b76-let">b)</span>Số liền trước của số đó là ${q.num(n - 1)}</div>
    <div class="b76-line"><span class="b76-let">c)</span>Số liền sau của số đó là ${q.num(n + 1)}</div>
    <div class="hint-line">Em tìm lần lượt các chữ số ở hàng chục nghìn, hàng nghìn, hàng trăm,
      hàng chục; chữ số hàng đơn vị còn lại tìm được nhờ tổng các chữ số.</div>`;
  return q.done(html,
    `Chữ số hàng chục cũng là ${ch}. Chữ số hàng đơn vị bằng ${tong} − ${cn} − ${ng} − ${ch} = ${dv}. `
    + `Vậy số của Rô-bốt là ${SP76(n)}; số liền trước là ${SP76(n - 1)}, `
    + `số liền sau là ${SP76(n + 1)}.`);
},

/* 3. So sánh số viết dưới dạng tổng các hàng với số */
() => {
  const q = Q(3, '<span class="tag">&gt;; &lt;; =</span> ?');
  const nz = () => R(1, 9);
  const dau = (u, v) => u > v ? '>' : u < v ? '<' : '=';
  const dong = (l, p) => `<div class="cmp-row"><span class="side">${l.s}</span>
    ${q.sign(dau(l.v, p.v))}<span class="side">${p.s}</span></div>`;
  const lech = () => pick([0, 0, 1, -1, 10, -10, 100, -100, 1000, -1000]);
  const soT = n => ({v: n, s: b76advTong(n)});
  const soS = n => ({v: n, s: SP76(n)});

  const n1 = nz() * 10000 + nz() * 1000 + R(0, 9) * 100 + nz();
  const n2 = nz() * 10000 + R(0, 9) * 1000 + nz() * 100 + nz() * 10;
  const n3 = nz() * 10000 + nz() * 1000 + nz() * 10 + nz();
  const n4 = 9000 + R(0, 9) * 100 + R(0, 9) * 10 + nz();
  const m4 = R(1, 2) === 1 ? 10000 + R(0, 9) * 100 : R(9000, 9999);

  const html = `<div class="b76-cmp b76adv-cmp">
      <div><div class="sub-lbl">a)</div>
        ${dong(soT(n1), soS(n1 + lech()))}
        ${dong(soS(n2), soT(n2 + lech()))}</div>
      <div><div class="sub-lbl">b)</div>
        ${dong(soT(n3), soT(n3 + lech()))}
        ${dong(soT(n4), soS(m4))}</div>
    </div>
    <div class="hint-line">Em hãy tính giá trị của mỗi tổng rồi mới so sánh.
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`;
  return q.done(html,
    'Viết mỗi tổng thành một số rồi so sánh: số nào có ít chữ số hơn thì bé hơn; nếu có cùng '
    + 'số chữ số thì so sánh lần lượt từng cặp chữ số kể từ trái sang phải.');
},

/* 4. Dãy số: đếm thêm, đếm bớt và tìm quy luật */
() => {
  const q = Q(4, '<span class="tag">Số</span> ?');
  const day = (st, buoc, sl, an) => {
    const v = Array.from({length: sl}, (_, i) => st + i * buoc);
    return v.map((x, i) => an.includes(i) ? q.num(x) : SP76(x)).join('; ') + '.';
  };
  const a0 = R(10, 84) * 1000 + R(0, 9) * 100 + R(0, 9) * 10;
  const b0 = R(30, 95) * 1000 + R(0, 9) * 100;
  const buoc = pick([500, 2000, 5000]);
  const c0 = R(11, 40) * 1000;
  const dung = `Đếm thêm ${SP76(buoc)}`;
  const opts = b76Mix([dung, `Đếm bớt ${SP76(buoc)}`, `Đếm thêm ${SP76(buoc * 2)}`]);

  const html = `<div class="b76-line"><span class="b76-let">a)</span>${day(a0, 1000, 8, [2, 3, 5, 7])}</div>
    <div class="b76-line"><span class="b76-let">b)</span>${day(b0, -100, 8, [1, 3, 4, 6])}</div>
    <div class="b76-line"><span class="b76-let">c)</span>${day(c0, buoc, 6, [3, 4, 5])}</div>
    <div class="fill-line b76-wide">Quy luật của dãy số ở câu c) là: ${q.pick(dung, opts)}</div>
    <div class="hint-line">Ở mỗi dãy số, em hãy lấy một số trừ đi số đứng ngay trước nó để
      tìm ra quy luật.</div>`;
  return q.done(html,
    `a) Đếm thêm 1 000. b) Đếm bớt 100. c) ${dung}.`);
},

/* 5. Bốn số viết ở bốn dạng khác nhau: viết thành số rồi sắp xếp */
() => {
  const q = Q(5, 'Bốn số dưới đây được viết theo bốn cách khác nhau.');
  const cn = b76Mix([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
  const t2 = b76Mix([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2);
  const ns = [
    cn[0] * 10000 + t2[0] * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9),
    cn[0] * 10000 + t2[1] * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9),
    cn[1] * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9),
    cn[2] * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9)
  ];
  const LET = ['A', 'B', 'C', 'D'];
  const thu = b76Mix([0, 1, 2, 3]);                    /* thu[j] = số ở dòng j */
  const kieu = b76Mix(['doc', 'tong', 'gom', 'so']);   /* cách viết của dòng j */
  const vietLa = (n, k) => k === 'doc' ? b76advHoa(b76Doc(n))
    : k === 'tong' ? b76advTong(n)
    : k === 'gom' ? 'Số gồm ' + b76advGom(n)
    : SP76(n);

  const bang = '<div class="b76adv-box">' + thu.map((idx, j) =>
    `<div><i>${LET[j]}.</i>${vietLa(ns[idx], kieu[j])}</div>`).join('') + '</div>';
  const hoi = thu.map((idx, j) => kieu[j] === 'so' ? '' :
    `<div class="b76-line">${LET[j]}: ${q.num(ns[idx])}</div>`).join('');
  const sapXep = [0, 1, 2, 3].map(j => j).sort((i, j) => ns[thu[i]] - ns[thu[j]]).map(j => LET[j]);
  const BAC = ['Bé nhất', 'Thứ hai', 'Thứ ba', 'Lớn nhất'];

  const html = bang
    + '<div class="b76-ask">a) Viết mỗi số đó thành số có năm chữ số.</div>' + hoi
    + '<div class="b76-ask">b) Sắp xếp bốn số đó theo thứ tự từ bé đến lớn '
    + '(viết chữ cái đứng trước mỗi số).</div>'
    + sapXep.map((c, i) =>
      `<div class="fill-line b76-wide">${BAC[i]}: ${q.pick(c, LET)}</div>`).join('')
    + '<div class="hint-line">Em hãy viết cả bốn số thành số có năm chữ số rồi mới so sánh.</div>';
  return q.done(html,
    thu.map((idx, j) => `${LET[j]} là số ${SP76(ns[idx])}`).join('; ') + '. '
    + 'Sắp xếp từ bé đến lớn: '
    + [...ns].sort((a, b) => a - b).map(SP76).join(' < ') + '.');
},

/* 6. Bài toán ba tháng sản xuất khẩu trang */
() => {
  const q = Q(6, '');
  const t1 = R(12, 26) * 1000 + R(0, 9) * 100;
  let them = R(2, 9) * 1000 + R(0, 9) * 10;
  const bot = R(1, 5) * 1000 + R(1, 9) * 100;
  if (them === bot) them += 10;
  const t2 = t1 + them;
  const t3 = t2 - bot;
  const tong = t1 + t2 + t3;
  const TEN = ['tháng Một', 'tháng Hai', 'tháng Ba'];
  const it = t1 < t3 ? TEN[0] : TEN[2];

  const html = `<p class="wordq">Tháng Một, một nhà máy sản xuất được ${SP76(t1)} chiếc khẩu trang.
      Tháng Hai nhà máy sản xuất được nhiều hơn tháng Một ${SP76(them)} chiếc khẩu trang.
      Tháng Ba nhà máy sản xuất được ít hơn tháng Hai ${SP76(bot)} chiếc khẩu trang.</p>
    <div class="bullet">Tháng Hai nhà máy sản xuất được ${q.num(t2)} chiếc khẩu trang.</div>
    <div class="bullet">Tháng Ba nhà máy sản xuất được ${q.num(t3)} chiếc khẩu trang.</div>
    <div class="bullet">Cả ba tháng nhà máy sản xuất được ${q.num(tong)} chiếc khẩu trang.</div>
    <div class="fill-line b76-wide">Tháng sản xuất được ít khẩu trang nhất là: ${q.pick(it, TEN)}</div>
    <div class="hint-line">Em hãy tính số khẩu trang của tháng Hai trước, rồi mới tính
      số khẩu trang của tháng Ba.</div>`;
  return q.done(html,
    `Tháng Hai: ${SP76(t1)} + ${SP76(them)} = ${SP76(t2)} (chiếc). `
    + `Tháng Ba: ${SP76(t2)} − ${SP76(bot)} = ${SP76(t3)} (chiếc). `
    + `Cả ba tháng: ${SP76(t1)} + ${SP76(t2)} + ${SP76(t3)} = ${SP76(tong)} (chiếc). `
    + `So sánh ${SP76(t1)} và ${SP76(t3)} thì ${it} sản xuất được ít nhất.`);
},
];
