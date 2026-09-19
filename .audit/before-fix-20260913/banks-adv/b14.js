/* ===== NÂNG CAO — Bài 14: Một phần mấy ===== */

/* các số chia được của n, lấy trong khoảng từ lo đến hi */
const b14advDiv = (n, lo, hi) => {
  const r = [];
  for (let i = lo; i <= hi; i++) if (n % i === 0) r.push(i);
  return r;
};

ADV.b14 = [

/* 1. Nhận ra một phần mấy của một nhóm rồi tính phần còn lại */
() => {
  const q = Q(1, '');
  const d = R(2, 6), m = R(3, 8), N = d * m;
  return q.done(`<p class="wordq">Một rổ có ${N} quả cam. Mẹ lấy ra ${m} quả cam.</p>
    <div class="fill-line">Số quả cam mẹ lấy ra bằng một phần ${q.num(d, 1)} số quả cam trong rổ.</div>
    <div class="fill-line">Trong rổ còn lại ${q.num(N - m)} quả cam.</div>
    <div class="fill-line">Số quả cam còn lại trong rổ gồm ${q.num(d - 1, 1)} phần như thế.</div>`,
    `${N} : ${m} = ${d} nên ${m} quả là ${ART.b14Frac(1, d)} số cam;  ${N} − ${m} = ${N - m} (quả).`);
},

/* 2. Bài toán ngược: biết một phần mấy, tìm cả nhóm */
() => {
  const q = Q(2, '');
  const k = R(2, 6);
  const m = pick([3, 4, 5, 6, 7, 8, 9].filter(x => x !== k));
  const tong = k * m;
  const ds = b14advDiv(tong, 2, 9).filter(x => x !== k);
  const j = ds.length ? pick(ds) : m;
  return q.done(`<p class="wordq">Một cửa hàng có một số bao gạo. Biết rằng
      ${ART.b14Frac(1, k)} số bao gạo đó là ${m} bao.</p>
    <div class="fill-line">Cửa hàng có tất cả ${q.num(tong)} bao gạo.</div>
    <div class="fill-line">${ART.b14Frac(1, j)} số bao gạo đó là ${q.num(tong / j)} bao.</div>`,
    `${m} × ${k} = ${tong} (bao);  ${tong} : ${j} = ${tong / j} (bao)`);
},

/* 3. So sánh một phần mấy của hai số */
() => {
  const q = Q(3, 'Tính rồi điền dấu thích hợp vào ô trống.');
  const POOL = [12, 16, 18, 20, 24, 30, 36];
  const rows = [];
  for (let i = 0; i < 3; i++){
    let N1 = pick(POOL), N2 = pick(POOL);
    let a = pick(b14advDiv(N1, 2, 9)), b = pick(b14advDiv(N2, 2, 9));
    let g = 0;
    while (N1 === N2 && a === b && g++ < 40){
      N2 = pick(POOL);
      b = pick(b14advDiv(N2, 2, 9));
    }
    rows.push({N1, N2, a, b, v1:N1 / a, v2:N2 / b});
  }
  return q.done(`<div>${rows.map(r =>
      `<div class="cmp-row"><span class="side">${ART.b14Frac(1, r.a)} của ${r.N1}</span>${
        q.sign(r.v1 > r.v2 ? '>' : r.v1 < r.v2 ? '<' : '=')
      }<span class="side">${ART.b14Frac(1, r.b)} của ${r.N2}</span></div>`).join('')}</div>
    <div class="hint-line">Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(r => `${r.N1} : ${r.a} = ${r.v1} và ${r.N2} : ${r.b} = ${r.v2}`).join('  ·  '));
},

/* 4. Đọc hình rồi suy luận số phần chưa tô màu */
() => {
  const n = R(4, 9);
  const q = Q(4, 'Quan sát hình tròn dưới đây rồi trả lời.');
  const opts = [];
  let g = 0;
  while (opts.length < 4 && g++ < 60){
    const x = R(2, 9);
    if (!opts.includes(x)) opts.push(x);
  }
  if (!opts.includes(n)) opts[R(0, 3)] = n;
  const doc = opts.map(x => `Một phần ${ART.b14Doc(x)}`);
  return q.done(`<div class="b14-row"><div class="b14-item">${ART.b14Circle(n)}</div></div>
    <div class="fill-line">Hình tròn được chia thành ${q.num(n, 1)} phần bằng nhau.</div>
    <div class="fill-line">Phần đã tô màu đọc là
      <span class="wpick">${q.pick('Một phần ' + ART.b14Doc(n), doc)}</span></div>
    <div class="fill-line">Số phần chưa tô màu là ${q.num(n - 1, 1)} phần.</div>
    <div class="fill-line">Nếu tô màu thêm 1 phần nữa thì còn ${q.num(n - 2, 1)} phần chưa tô màu.</div>`,
    `Hình tròn chia ${n} phần bằng nhau, tô 1 phần nên phần đã tô là ${ART.b14Frac(1, n)}.`);
},

/* 5. Bài toán ba bước với một phần mấy */
() => {
  const q = Q(5, '');
  const a = R(2, 5), u = 2 * R(2, 6), N = a * u;
  const conlai = N - u;
  const ds = b14advDiv(conlai, 2, 5);
  const b = ds.length ? pick(ds) : 2;
  const chieu = conlai / b;
  return q.done(`<p class="wordq">Một cửa hàng có ${N} kg gạo. Buổi sáng cửa hàng bán được
      ${ART.b14Frac(1, a)} số gạo đó. Buổi chiều cửa hàng bán được ${ART.b14Frac(1, b)} số gạo còn lại
      sau buổi sáng.</p>
    <div class="fill-line">Buổi sáng cửa hàng bán được ${q.num(u)} kg gạo.</div>
    <div class="fill-line">Sau buổi sáng cửa hàng còn ${q.num(conlai)} kg gạo.</div>
    <div class="fill-line">Buổi chiều cửa hàng bán được ${q.num(chieu)} kg gạo.</div>
    <div class="fill-line">Cuối ngày cửa hàng còn ${q.num(conlai - chieu)} kg gạo.</div>`,
    `${N} : ${a} = ${u};  ${N} − ${u} = ${conlai};  ${conlai} : ${b} = ${chieu};  `
    + `${conlai} − ${chieu} = ${conlai - chieu} (kg)`);
},

/* 6. Tìm số theo điều kiện về một phần mấy */
() => {
  const q = Q(6, 'Tìm số thoả mãn điều kiện sau.');
  const b = R(2, 6), v = R(2, 9), M = b * v;
  const a = pick([2, 3, 4, 5, 6].filter(x => x !== b));
  const n = a * v;
  return q.done(`<div class="bullet">${ART.b14Frac(1, a)} của số cần tìm bằng
      ${ART.b14Frac(1, b)} của số ${M}.</div>
    <div class="fill-line">${ART.b14Frac(1, b)} của ${M} là ${q.num(v, 1)}</div>
    <div class="fill-line">Số cần tìm là ${q.num(n)}</div>`,
    `${M} : ${b} = ${v};  ${v} × ${a} = ${n}`);
},
];
