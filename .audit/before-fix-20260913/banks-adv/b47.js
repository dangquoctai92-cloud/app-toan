/*CSS
.b47adv-rom{font-family:Georgia,'Times New Roman',serif;font-weight:800;letter-spacing:.7px;color:#2b3a5a}
.b47adv-chain{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;margin:9px 0}
.b47adv-cn{min-width:52px;padding:6px 9px;border:2.5px solid #e0a860;border-radius:10px;background:#fff6e6;
  text-align:center;font-size:20px;font-weight:800;color:#8a4f10;
  font-family:Georgia,'Times New Roman',serif;letter-spacing:.7px}
.b47adv-cn.q{border-style:dashed;background:#fffdf7;color:#d63384}
.b47adv-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:9px 0}
.b47adv-card{min-width:62px;padding:8px 10px;border:2.6px solid #7fc4a0;border-radius:11px;
  background:#eefaf3;text-align:center;font-size:21px;font-weight:800;color:#1f6b4a;
  font-family:Georgia,'Times New Roman',serif;letter-spacing:.7px}
.b47adv-card em{display:block;font-family:inherit;font-style:normal;font-size:12.5px;color:#d63384;
  margin-bottom:2px;letter-spacing:0}
.b47adv-side{min-width:130px;font-size:19px;font-weight:800}
CSS*/

/* ===== NÂNG CAO — Bài 47: Làm quen với chữ số La Mã ===== */

const b47advRom = n => {
  const V = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = '', r = n;
  for (let i = 0; i < V.length; i++) while (r >= V[i][0]){ s += V[i][1]; r -= V[i][0]; }
  return s;
};

/* số que tính để xếp một số La Mã: chữ số I cần 1 que, chữ số V và X mỗi chữ số cần 2 que */
const b47advQue = n => b47advRom(n).split('').reduce((t, c) => t + (c === 'I' ? 1 : 2), 0);

/* số chữ số La Mã dùng để viết số n */
const b47advDai = n => b47advRom(n).length;

const b47advTag = n => `<span class="b47adv-rom">${b47advRom(n)}</span>`;

/* n số khác nhau trong khoảng [lo, hi] */
const b47advTron = (n, lo, hi) => {
  const out = [];
  for (let g = 0; g < 400 && out.length < n; g++){
    const v = R(lo, hi);
    if (!out.includes(v)) out.push(v);
  }
  for (let v = lo; v <= hi && out.length < n; v++) if (!out.includes(v)) out.push(v);
  return out;
};

const b47advOpts = vs => vs.map(v => b47advRom(v)).sort(() => Math.random() - .5);

const b47advKep = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

ADV.b47 = [

/* 1. Xếp số La Mã bằng que tính — tìm số bé nhất, lớn nhất, đếm số */
() => {
  const q = Q(1, 'Xếp các số La Mã từ I đến XX bằng que tính.');
  const k = pick([3, 4, 5]);
  const ds = [];
  for (let v = 1; v <= 20; v++) if (b47advQue(v) === k) ds.push(v);
  const be = ds[0], lon = ds[ds.length - 1];
  const opts = b47advOpts(ds);
  const ba = b47advTron(3, 1, 20).sort((a, b) => a - b);
  const tong = ba.reduce((t, v) => t + b47advQue(v), 0);
  return q.done(`<div class="note">Chữ số I xếp bằng 1 que tính; chữ số V và chữ số X
      mỗi chữ số xếp bằng 2 que tính.</div>
    <div class="sub-lbl">a) Trong các số từ 1 đến 20, những số nào xếp được bằng đúng ${k} que tính?</div>
    <div class="fill-line">Có tất cả ${q.num(ds.length, 1)} số như vậy.</div>
    <div class="fill-line">Số bé nhất trong các số đó là ${q.num(be, 2)}, viết là
      ${q.pick(b47advRom(be), opts)}</div>
    <div class="fill-line">Số lớn nhất trong các số đó là ${q.num(lon, 2)}, viết là
      ${q.pick(b47advRom(lon), opts)}</div>
    <div class="sub-lbl">b) Xếp ba số ${ba.map(v => b47advTag(v)).join(', ')} thì cần tất cả
      bao nhiêu que tính?</div>
    <div class="fill-line">Cần ${q.num(tong, 2)} que tính.</div>`,
    `a) Các số xếp bằng ${k} que tính: `
    + ds.map(v => `${b47advRom(v)} = ${v}`).join(', ')
    + `.  b) ${ba.map(v => `${b47advRom(v)}: ${b47advQue(v)} que`).join(' · ')}; `
    + `${ba.map(v => b47advQue(v)).join(' + ')} = ${tong} (que tính).`);
},

/* 2. Tìm số La Mã theo nhiều điều kiện */
() => {
  const q = Q(2, 'Tìm số thoả mãn tất cả các điều kiện sau.');
  let A = 5, B = 12, m = 4, n = 8;
  for (let g = 0; g < 400; g++){
    const a = R(1, 13), b = Math.min(20, a + R(5, 7));
    if (b - a < 5) continue;
    const ds = [];
    for (let v = a + 1; v < b; v++) ds.push(v);
    const mm = pick([1, 2, 3, 4, 5]);
    const hit = ds.filter(v => b47advDai(v) === mm);
    if (hit.length !== 1) continue;
    A = a; B = b; m = mm; n = hit[0]; break;
  }
  const cand = [];
  for (let v = A + 1; v < B; v++) cand.push(v);
  const opts = b47advOpts(cand);
  return q.done(`<div class="bullet">Số đó lớn hơn ${b47advTag(A)}.</div>
    <div class="bullet">Số đó bé hơn ${b47advTag(B)}.</div>
    <div class="bullet">Số đó được viết bằng đúng ${m} chữ số La Mã.</div>
    <div class="fill-line">Viết bằng chữ số La Mã, số đó là ${q.pick(b47advRom(n), opts)}</div>
    <div class="fill-line">Số đó là ${q.num(n, 2)}</div>
    <div class="hint-line">Hãy viết các số lớn hơn ${b47advRom(A)} và bé hơn ${b47advRom(B)}
      rồi đếm số chữ số La Mã của mỗi số.</div>`,
    `Các số cần xét: ${cand.map(v => `${b47advRom(v)} (${b47advDai(v)} chữ số)`).join(', ')}. `
    + `Chỉ có ${b47advRom(n)} = ${n} viết bằng ${m} chữ số La Mã.`);
},

/* 3. Dãy số La Mã cách đều — viết tiếp ba số */
() => {
  const q = Q(3, 'Viết tiếp ba số của dãy số sau.');
  const d = pick([1, 2, 3]);
  const st = R(1, 20 - 6 * d);
  const seq = [0, 1, 2, 3, 4, 5, 6].map(i => st + i * d);
  const an = seq.slice(4);
  const them = b47advTron(3, 1, 20).filter(v => !seq.includes(v));
  const opts = b47advOpts(an.concat(them));
  const chain = seq.map((v, i) => `<span class="b47adv-cn${i > 3 ? ' q' : ''}">${
    i > 3 ? '?' : b47advRom(v)}</span>`).join('');
  return q.done(`<div class="b47adv-chain">${chain}</div>
    ${an.map((v, i) => `<div class="fill-line">Số thứ ${5 + i} của dãy là
      ${q.pick(b47advRom(v), opts)}</div>`).join('')}
    <div class="fill-line">Trong dãy số trên, mỗi số hơn số liền trước nó ${q.num(d, 1)} đơn vị.</div>`,
    `Đổi ra số tự nhiên: ${seq.join(', ')} — mỗi số hơn số liền trước ${d} đơn vị. `
    + `Ba số tiếp theo là ${an.map(v => b47advRom(v)).join(', ')}.`);
},

/* 4. Tính giá trị rồi so sánh hai vế */
() => {
  const q = Q(4, 'Tính rồi điền dấu thích hợp vào ô trống.');
  const a1 = R(6, 14), b1 = R(2, Math.min(6, 20 - a1)), t1 = a1 + b1;
  const r1 = b47advKep(t1 + pick([-2, -1, 0, 0, 1, 2]), 1, 20);
  const a2 = R(9, 20), b2 = R(1, 7), t2 = a2 - b2;
  const r2 = b47advKep(t2 + pick([-2, -1, 0, 0, 1, 2]), 1, 20);
  const k3 = R(2, 4), a3 = R(2, Math.floor(20 / k3)), t3 = a3 * k3;
  const r3 = b47advKep(t3 + pick([-3, -1, 0, 0, 1, 3]), 1, 20);
  const a4 = R(1, 20), r4 = b47advKep(a4 + pick([-3, -1, 0, 0, 1, 3]), 1, 20);
  const rows = [
    {t:`${b47advTag(a1)} + ${b47advTag(b1)}`, p:b47advTag(r1), l:t1, r:r1},
    {t:`${b47advTag(a2)} &minus; ${b47advTag(b2)}`, p:`${r2}`, l:t2, r:r2},
    {t:`${b47advTag(a3)} &times; ${k3}`, p:b47advTag(r3), l:t3, r:r3},
    {t:b47advTag(a4), p:`${r4}`, l:a4, r:r4}
  ];
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b47adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')
      }<span class="side b47adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Hãy đổi các số La Mã ra số tự nhiên rồi tính · Chạm vào ô để đổi dấu
      &gt; &lt; =</div>`,
    `${a1} + ${b1} = ${t1};  ${a2} &minus; ${b2} = ${t2};  ${a3} &times; ${k3} = ${t3};  `
    + `${b47advRom(a4)} = ${a4}.`);
},

/* 5. Đồng hồ mặt số La Mã — bài toán hai chiều */
() => {
  const q = Q(5, '');
  const h = R(1, 12), t = R(2, 6), k = R(2, 5);
  const sau = (h + t - 1) % 12 + 1;
  const truoc = (h - k + 11) % 12 + 1;
  const dung = [h, sau, truoc];
  const them = b47advTron(2, 1, 12).filter(v => !dung.includes(v));
  const opts = b47advOpts(dung.concat(them));
  return q.done(`<p class="wordq">Mặt một chiếc đồng hồ ghi các số bằng chữ số La Mã.
      Kim giờ đang chỉ đúng vào số ${b47advTag(h)}.</p>
    <div class="fill-line">Đồng hồ đang chỉ ${q.num(h, 2)} giờ.</div>
    <div class="fill-line">Sau ${t} giờ nữa, kim giờ chỉ đúng vào số ${q.pick(b47advRom(sau), opts)}</div>
    <div class="fill-line">Số đó là số ${q.num(sau, 2)}</div>
    <div class="fill-line">Trước đó ${k} giờ, kim giờ chỉ đúng vào số ${q.pick(b47advRom(truoc), opts)}</div>
    <div class="fill-line">Số đó là số ${q.num(truoc, 2)}</div>
    <div class="hint-line">Mặt đồng hồ có 12 số; đếm hết số XII thì quay lại số I.</div>`,
    `${h} + ${t} → kim giờ chỉ vào ${b47advRom(sau)} (${sau}); `
    + `${h} &minus; ${k} → kim giờ chỉ vào ${b47advRom(truoc)} (${truoc}).`);
},

/* 6. Suy luận: mỗi bạn cầm tấm thẻ ghi số La Mã nào? */
() => {
  const q = Q(6, '');
  const vs = b47advTron(3, 1, 20).sort((a, b) => a - b);
  const NAMES = ['Mai', 'Nam', 'Việt', 'Rô-bốt'].sort(() => Math.random() - .5).slice(0, 3);
  const cua = {};
  cua[NAMES[0]] = vs[2];
  cua[NAMES[1]] = vs[1];
  cua[NAMES[2]] = vs[0];
  const opts = b47advOpts(vs);
  const show = vs.slice().sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C'];
  const hien = NAMES.slice().sort(() => Math.random() - .5);
  return q.done(`<p class="wordq">Ba bạn ${NAMES.join(', ')} mỗi bạn cầm một tấm thẻ ghi
      một số La Mã như dưới đây. Biết rằng:</p>
    <div class="b47adv-cards">${show.map((v, i) =>
      `<div class="b47adv-card"><em>${L[i]}</em>${b47advRom(v)}</div>`).join('')}</div>
    <div class="bullet">Số của bạn ${NAMES[0]} là số lớn nhất trong ba số.</div>
    <div class="bullet">Số của bạn ${NAMES[2]} bé hơn số của bạn ${NAMES[1]}.</div>
    ${hien.map(nm => `<div class="fill-line">Thẻ của bạn ${nm} ghi số
      ${q.pick(b47advRom(cua[nm]), opts)}</div>`).join('')}
    <div class="fill-line">Số lớn nhất trong ba số đó là ${q.num(vs[2], 2)}</div>`,
    `${vs.map(v => b47advRom(v)).join(' < ')} nên `
    + NAMES.map(nm => `${nm}: ${b47advRom(cua[nm])} = ${cua[nm]}`).join(', ') + '.');
},
];
