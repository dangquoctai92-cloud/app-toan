/*CSS
.b40adv-eq{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:19px;font-weight:800;
  color:#3a2b55;background:#f7f2ff;border:2.5px solid #cbb9e8;border-radius:12px;
  padding:8px 14px;margin:8px 0}
.b40adv-eq b{color:#d63384;font-weight:800;margin-right:2px}
.b40adv-side{min-width:140px}
.b40adv-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 14px;margin:10px 0}
.b40adv-cell{min-width:126px;padding:8px 12px;border:2.5px solid #f0cf9b;border-radius:12px;
  background:#fff8ec;font-size:18px;font-weight:800;color:#6a4a12;text-align:center}
.b40adv-cell em{display:block;font-style:normal;font-size:13px;color:#1f63b8;margin-bottom:2px}
CSS*/

/* ===== NÂNG CAO — Bài 40: Luyện tập chung ===== */

const b40advLen = v => String(v).length;

/* một phép nhân hoặc phép chia trong phạm vi 1 000
   loai = 'n3' tích có ba chữ số · 'n2' tích có hai chữ số
          'c3' thương có ba chữ số · 'c2' thương có hai chữ số */
const b40advTinh = loai => {
  if (loai === 'n3'){ const b = R(2, 9), a = R(101, Math.floor(999 / b)); return {t:`${a} × ${b}`, v:a * b}; }
  if (loai === 'n2'){ const b = R(2, 9), a = R(11, Math.floor(99 / b)); return {t:`${a} × ${b}`, v:a * b}; }
  if (loai === 'c3'){ const b = R(2, 9), t = R(100, Math.floor(999 / b)); return {t:`${b * t} : ${b}`, v:t}; }
  const b = R(2, 9), t = R(10, Math.min(99, Math.floor(999 / b))); return {t:`${b * t} : ${b}`, v:t};
};

ADV.b40 = [

/* 1. Tìm thành phần chưa biết của phép nhân, phép chia */
() => {
  const q = Q(1, 'Tìm số thích hợp thay cho ô trống.');
  const k1 = R(2, 4), x1 = R(101, Math.floor(999 / k1));
  const d2 = R(2, 9), t2 = R(Math.ceil(100 / d2), Math.floor(999 / d2));
  const d3 = R(2, 9), t3 = R(Math.ceil(100 / d3), 99);
  const k4 = R(2, 5), m4 = R(2, 5), x4 = R(2, 9);
  return q.done(`<div class="b40adv-eq"><b>a)</b> ${q.num(x1, 3)} × ${k1} = ${x1 * k1}</div>
    <div class="b40adv-eq"><b>b)</b> ${q.num(d2 * t2, b40advLen(d2 * t2))} : ${d2} = ${t2}</div>
    <div class="b40adv-eq"><b>c)</b> ${d3 * t3} : ${q.num(d3, 1)} = ${t3}</div>
    <div class="b40adv-eq"><b>d)</b> ${k4} × ${q.num(x4, 1)} × ${m4} = ${k4 * x4 * m4}</div>
    <div class="hint-line">Muốn tìm thừa số chưa biết ta lấy tích chia cho thừa số kia.
      Muốn tìm số bị chia ta lấy thương nhân với số chia. Muốn tìm số chia,
      hãy thử nhân thương với 2, 3, 4, … xem được số bị chia thì dừng lại.</div>`,
    `a) ${x1 * k1} : ${k1} = ${x1}.  b) ${t2} × ${d2} = ${d2 * t2}.  `
    + `c) Vì ${t3} × ${d3} = ${d3 * t3} nên số chia là ${d3}.  `
    + `d) ${k4} × ${m4} = ${k4 * m4}; ${k4 * x4 * m4} : ${k4 * m4} = ${x4}.`);
},

/* 2. Bảng gấp – giảm số lần, điền cả xuôi lẫn ngược */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const k = R(2, 5);
  let g = R(2, 5);
  if (g === k) g = k === 5 ? 2 : k + 1;
  const hi = Math.max(4, Math.min(25, Math.floor(999 / (k * g))));
  const cols = [];
  for (let t = 0; t < 120 && cols.length < 3; t++){
    const n = g * R(4, hi);
    if (cols.some(c => c.n === n)) continue;
    cols.push({n, gap:n * k, giam:n / g});
  }
  while (cols.length < 3) cols.push({n:g * (4 + cols.length), gap:g * (4 + cols.length) * k, giam:4 + cols.length});
  const modes = [0, 1, 2].sort(() => Math.random() - .5);
  cols.forEach((c, i) => c.m = modes[i]);
  const cell = (c, which) => {
    const hien = (c.m === 0 && which === 'n') || (c.m === 1 && which === 'gap')
      || (c.m === 2 && which === 'giam');
    const v = c[which];
    return `<td>${hien ? v : q.num(v, b40advLen(v))}</td>`;
  };
  return q.done(`<div class="tbl-wrap"><table class="tbl amber">
      <tr><th>Số đã cho</th>${cols.map(c => cell(c, 'n')).join('')}</tr>
      <tr><th>Gấp ${k} lần</th>${cols.map(c => cell(c, 'gap')).join('')}</tr>
      <tr><th>Giảm ${g} lần</th>${cols.map(c => cell(c, 'giam')).join('')}</tr>
    </table></div>
    <div class="hint-line">Gấp lên mấy lần thì nhân, giảm đi mấy lần thì chia.
      Nếu chỉ biết số ở dòng dưới thì hãy làm ngược lại để tìm số đã cho.</div>`,
    cols.map(c => `${c.n}: gấp ${k} lần được ${c.gap}, giảm ${g} lần được ${c.giam}`).join('  ·  '));
},

/* 3. So sánh giá trị của hai biểu thức */
() => {
  const q = Q(3, 'Tính rồi điền dấu thích hợp vào ô trống.');
  const lech = n => pick([-R(1, n), -R(1, n), 0, R(1, n), R(1, n)]);
  const a1 = R(11, 99);
  const p2 = R(20, 60), q2 = R(20, 60), k2 = R(2, 5), v2 = (p2 + q2) * k2;
  const n2 = v2 + lech(20);
  const d3 = R(2, 9), t3 = R(100, Math.floor(999 / d3));
  const e3 = R(2, 9), u3 = R(100, Math.floor(999 / e3));
  const a4 = R(11, 99), b4 = R(2, 9), c4 = R(11, 99), d4 = R(2, 9);
  const rows = [
    {t:`${a1} × 2 × 5`, p:`${a1} × 10`, l:a1 * 2 * 5, r:a1 * 10},
    {t:`(${p2} + ${q2}) × ${k2}`, p:String(n2), l:v2, r:n2},
    {t:`${d3 * t3} : ${d3}`, p:`${e3 * u3} : ${e3}`, l:t3, r:u3},
    {t:`${a4} × ${b4}`, p:`${c4} × ${d4}`, l:a4 * b4, r:c4 * d4}
  ];
  const L = ['a)', 'b)', 'c)', 'd)'];
  return q.done(`<div class="two-col"><div>${rows.map((x, i) =>
      `<div class="cmp-row"><b>${L[i]}</b><span class="side b40adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')
      }<span class="side b40adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Nhân với 2 rồi nhân với 5 cũng chính là nhân với 10 ·
      Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map((x, i) => `${L[i]} ${x.l} và ${x.r}`).join(';  '));
},

/* 4. Bài toán chia hai lần rồi so sánh gấp mấy lần */
() => {
  const q = Q(4, '');
  const moiHop = R(5, 20), m = R(2, 5), k = R(2, 5);
  const moiThung = moiHop * m, tong = moiThung * k;
  return q.done(`<p class="wordq">Có ${tong} quyển vở xếp đều vào ${k} thùng. Mỗi thùng lại được
      xếp đều vào ${m} hộp.</p>
    <div class="bullet">Mỗi thùng có ${q.num(moiThung, b40advLen(moiThung))} quyển vở.</div>
    <div class="bullet">Mỗi hộp có ${q.num(moiHop, b40advLen(moiHop))} quyển vở.</div>
    <div class="bullet">Tất cả có ${q.num(k * m, b40advLen(k * m))} hộp vở.</div>
    <div class="bullet">Số vở ở mỗi thùng gấp ${q.num(m, 1)} lần số vở ở mỗi hộp.</div>`,
    `${tong} : ${k} = ${moiThung} (quyển);  ${moiThung} : ${m} = ${moiHop} (quyển);  `
    + `${k} × ${m} = ${k * m} (hộp);  ${moiThung} : ${moiHop} = ${m} (lần).`);
},

/* 5. Chọn các phép tính có kết quả là số có ba chữ số */
() => {
  const q = Q(5, 'Quan sát các phép tính dưới đây rồi trả lời.');
  const L = ['A', 'B', 'C', 'D', 'E', 'G'];
  let list = [];
  for (let g = 0; g < 60; g++){
    const nBa = R(2, 4);
    const tmp = [];
    for (let i = 0; i < nBa; i++) tmp.push(b40advTinh(pick(['n3', 'c3'])));
    for (let i = 0; i < 6 - nBa; i++) tmp.push(b40advTinh(pick(['n2', 'c2'])));
    const vals = tmp.map(x => x.v);
    const mx = Math.max(...vals);
    if (vals.filter(v => v === mx).length !== 1) continue;
    if (new Set(tmp.map(x => x.t)).size !== 6) continue;
    list = tmp.sort(() => Math.random() - .5).map((x, i) => ({...x, L:L[i]}));
    break;
  }
  if (!list.length) list = ['n3', 'c3', 'n3', 'n2', 'c2', 'n2']
    .map((s, i) => ({...b40advTinh(s), L:L[i]}));
  const ba = list.filter(x => b40advLen(x.v) === 3).map(x => x.L).sort();
  let lonNhat = list[0];
  list.forEach(x => { if (x.v > lonNhat.v) lonNhat = x; });
  return q.done(`<div class="b40adv-grid">${list.map(x =>
      `<div class="b40adv-cell"><em>${x.L}</em>${x.t}</div>`).join('')}</div>
    <div class="fill-line">Các phép tính có kết quả là số có ba chữ số: ${q.pick(ba.join(','), L)}</div>
    <div class="fill-line">Phép tính có kết quả lớn nhất: ${q.pick(lonNhat.L, L)}</div>
    <div class="fill-line">Kết quả lớn nhất đó là ${q.num(lonNhat.v, b40advLen(lonNhat.v))}</div>`,
    list.map(x => `${x.L}: ${x.t} = ${x.v}`).join(' · '));
},

/* 6. Tìm số khi biết kết quả gấp lên, giảm đi */
() => {
  const q = Q(6, 'Tìm số thích hợp trong mỗi trường hợp sau.');
  const u1 = R(2, 20), k1 = R(2, 5);
  let g1 = R(2, 5);
  if (g1 === k1) g1 = k1 === 5 ? 2 : k1 + 1;
  const x1 = g1 * u1, V1 = u1 * k1;
  const A2 = R(11, 60), g2 = R(2, 5), k2 = R(2, 3);
  const x2 = A2 * g2;
  const x3 = R(11, 99);
  return q.done(`<div class="bullet">a) Gấp một số lên ${k1} lần rồi giảm số nhận được đi ${g1} lần
      thì được ${V1}. Số đó là ${q.num(x1, b40advLen(x1))}</div>
    <div class="bullet">b) Giảm một số đi ${g2} lần thì được ${A2}.
      Số đó là ${q.num(x2, b40advLen(x2))}, gấp số đó lên ${k2} lần thì được
      ${q.num(x2 * k2, b40advLen(x2 * k2))}</div>
    <div class="bullet">c) Lấy một số nhân với 2 rồi nhân với 5 thì được ${x3 * 10}.
      Số đó là ${q.num(x3, 2)}</div>
    <div class="hint-line">Hãy làm ngược lại: gấp lên thì chia, giảm đi thì nhân.</div>`,
    `a) ${V1} × ${g1} = ${V1 * g1}; ${V1 * g1} : ${k1} = ${x1}.  `
    + `b) ${A2} × ${g2} = ${x2}; ${x2} × ${k2} = ${x2 * k2}.  `
    + `c) 2 × 5 = 10; ${x3 * 10} : 10 = ${x3}.`);
},
];
