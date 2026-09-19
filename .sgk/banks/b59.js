/* ==================== BÀI 59: CÁC SỐ CÓ NĂM CHỮ SỐ. SỐ 100 000
   (SGK tập 2, tr.55, 56, 57, 58, 59, 60)
   hoạt động tr.56–57 : bài 1 (Hoàn thành bảng), bài 2 (Số ? – tia số),
                        bài 3 (Viết số rồi đọc số), bài 4 (Chọn số thích hợp với cách đọc)
   hoạt động tr.57–58 : bài 1 (Chọn số thích hợp với cách đọc),
                        bài 2 (số liền trước, số liền sau), bài 3 (Số ? – các số tròn chục nghìn)
   luyện tập tr.58–59 : bài 1 (Chọn câu trả lời đúng – chữ số hàng chục nghìn),
                        bài 2 (Số ? – viết số thành tổng), bài 3 (Đ, S ? – hội chợ Tết),
                        bài 4 (số đóng trên khung xe đạp)
   luyện tập tr.59–60 : bài 1 (Chọn cách đọc thích hợp với số),
                        bài 2 (Số ? – dãy số; số tròn chục nghìn),
                        bài 3 (Chọn câu trả lời đúng – bạn An đố Mai)
========================================================================================= */

/* viết số theo kiểu sách: 12 324 */
const NSP59 = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* ----- đọc số đến 100 000 (readNum của app chỉ đúng với số ≤ 1 000) ----- */
const DV59 = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

function readTwo59(n){                       /* 0 – 99 */
  if (n < 10) return DV59[n];
  const c = Math.floor(n / 10), d = n % 10;
  const s = c === 1 ? 'mười' : DV59[c] + ' mươi';
  if (d === 0) return s;
  if (d === 1) return s + (c === 1 ? ' một' : ' mốt');
  if (d === 4) return s + (c === 1 ? ' bốn' : ' tư');
  if (d === 5) return s + ' lăm';
  return s + ' ' + DV59[d];
}

function read3_59(n, full){                  /* 0 – 999; full = đọc cả "không trăm" */
  const t = Math.floor(n / 100), r = n % 100;
  if (t === 0){
    if (!full) return readTwo59(r);
    if (r === 0) return '';
    return 'không trăm ' + (r < 10 ? 'linh ' + (r === 4 ? 'tư' : DV59[r]) : readTwo59(r));
  }
  const s = DV59[t] + ' trăm';
  if (r === 0) return s;
  if (r < 10) return s + ' linh ' + (r === 4 ? 'tư' : DV59[r]);
  return s + ' ' + readTwo59(r);
}

function readNum5(n){                        /* 0 – 100 000 */
  if (n === 100000) return 'một trăm nghìn';
  const ng = Math.floor(n / 1000), r = n % 1000;
  if (ng === 0) return read3_59(r, false);
  const s = readTwo59(ng) + ' nghìn';
  return r === 0 ? s : s + ' ' + read3_59(r, true);
}

function alts59(n){
  const swap = (arr, a, b) => arr.concat(arr.filter(s => s.includes(a)).map(s => s.split(a).join(b)));
  let out = [readNum5(n)];
  out = swap(out, ' mốt', ' một');
  out = swap(out, ' tư', ' bốn');
  out = swap(out, ' lăm', ' năm');
  out = swap(out, ' linh ', ' lẻ ');
  out = swap(out, ' không trăm ', ' ');
  return [...new Set(out)];
}

/* ô nhập chữ cho số có năm chữ số (dùng đúng cấu trúc blank của app) */
function txt59(q, n){
  q.B.push({a: readNum5(n), alts: alts59(n), text: true});
  return `<input class="qin qtxt" data-b="${q.B.length - 1}" placeholder="?">`;
}

/* làm tròn đến hàng chục / hàng trăm */
const r10_59 = n => { const u = n % 10; return n - u + (u >= 5 ? 10 : 0); };
const r100_59 = n => { const u = n % 100; return n - u + (u >= 50 ? 100 : 0); };

BANKS.b59 = [

/* ===== tr.56 – Bài 1: Hoàn thành bảng sau ===== */
() => {
  const q = Q(1, 'Hoàn thành bảng sau.');
  const ns = [];
  for (let g = 0; g < 200 && ns.length < 3; g++){
    const n = R(1, 9) * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
    if (!ns.includes(n)) ns.push(n);
  }
  while (ns.length < 3) ns.push(57465 + ns.length);
  ns[1] = R(1, 9) * 10000 + R(0, 9) * 10 + R(0, 9);          /* dạng có nhiều chữ số 0 */
  const dg = n => String(n).padStart(5, '0').split('').map(Number);
  const head = ['Hàng<br>chục nghìn', 'Hàng<br>nghìn', 'Hàng<br>trăm', 'Hàng<br>chục',
    'Hàng<br>đơn vị', 'Viết số', 'Đọc số'];
  const d0 = dg(ns[0]), d1 = dg(ns[1]), d2 = dg(ns[2]);
  const row0 = d0.map(x => `<td>${x}</td>`).join('')
    + `<td>${q.num(ns[0])}</td><td class="rd">${txt59(q, ns[0])}</td>`;
  const row1 = d1.map(x => `<td>${q.num(x, 1)}</td>`).join('')
    + `<td>${NSP59(ns[1])}</td><td class="rd">${txt59(q, ns[1])}</td>`;
  const row2 = d2.map(x => `<td>${q.num(x, 1)}</td>`).join('')
    + `<td>${q.num(ns[2])}</td><td class="rd">${readNum5(ns[2])}</td>`;
  return q.done(`<div class="tbl-wrap"><table class="tbl amber sgk1">
      <tr>${head.map(x => `<th>${x}</th>`).join('')}</tr>
      <tr>${row0}</tr><tr>${row1}</tr><tr>${row2}</tr></table></div>`,
    ns.map(n => `${NSP59(n)}: ${readNum5(n)}`).join(';  '));
},

/* ===== tr.56 – Bài 2: Số ? (tia số) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const st = R(10000, 99990);
  const items = Array.from({length: 7}, (_, i) => st + i);
  const cells = items.map((v, i) => i < 4 ? NSP59(v) : q.num(v));
  return q.done(ruler(cells, -1),
    `Đếm thêm 1: ${items.map(NSP59).join(', ')}`);
},

/* ===== tr.56–57 – Bài 3: Viết số rồi đọc số ===== */
() => {
  const q = Q(3, 'Viết số rồi đọc số, biết số đó gồm:');
  const ns = [];
  for (let g = 0; g < 200 && ns.length < 4; g++){
    const n = R(1, 9) * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
    if (!ns.includes(n)) ns.push(n);
  }
  while (ns.length < 4) ns.push(15826 + ns.length);
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = ns.map((n, i) => {
    const d = String(n).split('').map(Number);
    return `<div class="b59-line"><span class="b59-let">${L[i]}</span>
        ${d[0]} chục nghìn, ${d[1]} nghìn, ${d[2]} trăm, ${d[3]} chục và ${d[4]} đơn vị.</div>
      <div class="b59-pair"><span class="k">Viết số:</span>${q.num(n)}
        <span class="k">Đọc số:</span>${txt59(q, n)}</div>`;
  }).join('');
  return q.done(html, ns.map(n => `${NSP59(n)}: ${readNum5(n)}`).join(';  '));
},

/* ===== tr.57 – Bài 4: Chọn số thích hợp với cách đọc (số tròn chục nghìn) ===== */
() => {
  const q = Q(4, 'Chọn số thích hợp với cách đọc.');
  const ns = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 4)
    .map(x => x * 10000);
  const opts = ns.slice().sort(() => Math.random() - .5).map(NSP59);
  const html = ns.map(n =>
    `<div class="b59-ds"><span>${readNum5(n).charAt(0).toUpperCase() + readNum5(n).slice(1)}</span>
      ${q.pick(NSP59(n), opts)}</div>`).join('');
  return q.done(`<div class="hint-line">Đây là các số tròn chục nghìn.</div>${html}`,
    ns.map(n => `${readNum5(n)} viết là ${NSP59(n)}`).join(';  '));
},

/* ===== tr.57–58 – Bài 1: Chọn số thích hợp với cách đọc ===== */
() => {
  const q = Q(1, 'Chọn số thích hợp với cách đọc.');
  const ns = [100000];
  for (let g = 0; g < 200 && ns.length < 4; g++){
    const n = R(1, 9) * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
    if (!ns.includes(n)) ns.push(n);
  }
  while (ns.length < 4) ns.push(36074 + ns.length);
  const order = ns.slice().sort(() => Math.random() - .5);
  const opts = ns.slice().sort(() => Math.random() - .5).map(NSP59);
  const html = order.map(n =>
    `<div class="b59-ds"><span>${readNum5(n).charAt(0).toUpperCase() + readNum5(n).slice(1)}</span>
      ${q.pick(NSP59(n), opts)}</div>`).join('');
  return q.done(html, order.map(n => `${readNum5(n)} viết là ${NSP59(n)}`).join(';  '));
},

/* ===== tr.58 – Bài 2: số liền trước, số liền sau ===== */
() => {
  const q = Q(2, '');
  const a = R(10002, 99998);
  const b = R(1, 9) * 10000;
  const c = R(1, 9) * 10000 + 1;
  const html = `<div class="b59-line"><span class="b59-let">a)</span>
      Số liền trước của số ${NSP59(a)} là số ${q.num(a - 1)}</div>
    <div class="b59-line"><span class="b59-let">b)</span>
      Số liền sau của số ${NSP59(b)} là số ${q.num(b + 1)}</div>
    <div class="b59-line"><span class="b59-let">c)</span>
      Số liền trước của số ${NSP59(c)} là số ${q.num(c - 1)}</div>
    <div class="b59-line"><span class="b59-let">d)</span>
      Số liền sau của số 99 999 là số ${q.num(100000)}</div>`;
  return q.done(html, `Số liền trước bớt đi 1, số liền sau thêm 1; 99 999 + 1 = 100 000`);
},

/* ===== tr.58 – Bài 3: Số ? (dãy các số tròn chục nghìn) ===== */
() => {
  const q = Q(3, '<span class="tag">Số</span> ?');
  const seq = Array.from({length: 10}, (_, i) => (i + 1) * 10000);
  const hide = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).slice(0, 5);
  const cells = seq.map((v, i) => hide.includes(i) ? q.num(v) : NSP59(v));
  return q.done(chain(cells, 'round'),
    `Đếm thêm 10 000: ${seq.map(NSP59).join(', ')}`);
},

/* ===== tr.58 – Luyện tập, Bài 1: Chọn câu trả lời đúng ===== */
() => {
  const q = Q(1, 'Chọn câu trả lời đúng.');
  const d = R(1, 9);
  let e = R(1, 9);
  if (e === d) e = d % 9 + 1;
  const dung = d * 10000 + R(0, 9999);
  const sai = [d * 1000 + R(0, 999), d * 100 + R(0, 99), e * 10000 + R(0, 9999)];
  const all = [dung].concat(sai).sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D'];
  const ans = L[all.indexOf(dung)];
  const html = `<p class="wordq">Số nào dưới đây có chữ số hàng chục nghìn là ${d}?</p>
    <div class="b59-opt">${all.map((n, i) =>
      `<span style="margin-right:22px"><b style="color:#d63384">${L[i]}.</b> ${NSP59(n)}</span>`).join('')}</div>
    <div class="fill-line">Chọn: ${q.pick(ans, L)}</div>`;
  return q.done(html, `Số ${NSP59(dung)} có chữ số hàng chục nghìn là ${d}.`);
},

/* ===== tr.58–59 – Luyện tập, Bài 2: Số ? (viết số thành tổng) ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const mk = () => {
    for (let g = 0; g < 200; g++){
      const n = R(1, 9) * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
      const P = [10000, 1000, 100, 10, 1];
      const ds = String(n).split('').map(Number);
      const terms = [];
      for (let i = 0; i < 5; i++) if (ds[i]) terms.push(ds[i] * P[i]);
      if (terms.length >= 2) return {n, terms};
    }
    return {n: 54766, terms: [50000, 4000, 700, 60, 6]};
  };
  const rows = [mk(), mk(), mk(), mk()];
  const L = ['a)', 'b)', 'c)', 'd)'];
  const html = rows.map((r, i) => {
    const k = R(0, r.terms.length - 1);
    const body = r.terms.map((t, j) => j === k ? q.num(t) : NSP59(t)).join(' <span class="op">+</span> ');
    return `<div class="b59-line"><span class="b59-let">${L[i]}</span>
      ${NSP59(r.n)} <span class="op">=</span> ${body}</div>`;
  }).join('');
  return q.done(html,
    rows.map(r => `${NSP59(r.n)} = ${r.terms.map(NSP59).join(' + ')}`).join(';  '));
},

/* ===== tr.59 – Luyện tập, Bài 3: Đ, S ? (hội chợ Tết) ===== */
() => {
  const q = Q(3, '<span class="tag">Đ, S</span> ?');
  const k = R(10000, 99990);
  const dai = [k, k + 1, k + 2, k + 3, k + 4];
  const duc = dai[R(0, 4)];
  const conLai = dai.filter(x => x !== duc);
  /* a) một số nằm ngoài dải -> Đ, nằm trong dải (khác số của bác Đức) -> S */
  const za = pick([k - 1, k + 5, conLai[R(0, 3)]]);
  const aA = (za < k || za > k + 4) ? 'Đ' : 'S';
  /* b) "chắc chắn bốc được số ..." -> luôn S (còn 4 số, không thể chắc chắn) */
  const zb = conLai[R(0, 3)];
  /* c) "có thể bốc được số ..." -> Đ nếu số đó còn trong thùng */
  const zc = pick([conLai[R(0, 3)], duc, k + 5]);
  const aC = conLai.indexOf(zc) >= 0 ? 'Đ' : 'S';
  const DS = ['Đ', 'S'];
  return q.done(`<p class="wordq">Trong hội chợ Tết, bác Đức, bác Trí và chú Dũng bốc thăm
      mã số trúng thưởng. Trong thùng còn lại năm số từ ${NSP59(k)} đến ${NSP59(k + 4)}.
      Bác Đức bốc được số ${NSP59(duc)}.</p>
    <div class="b59-line">Như vậy:</div>
    <div class="bullet">a) Bác Trí không thể bốc được số ${NSP59(za)}. ${q.pick(aA, DS)}</div>
    <div class="bullet">b) Chú Dũng chắc chắn bốc được số ${NSP59(zb)}. ${q.pick('S', DS)}</div>
    <div class="bullet">c) Chú Dũng có thể bốc được số ${NSP59(zc)}. ${q.pick(aC, DS)}</div>`,
    `Trong thùng chỉ còn các số ${conLai.map(NSP59).join(', ')} sau khi bác Đức đã bốc `
      + `số ${NSP59(duc)}.`);
},

/* ===== tr.59 – Luyện tập, Bài 4: số đóng trên khung xe đạp ===== */
() => {
  const q = Q(4, '');
  const n = R(99990, 99997);
  return q.done(`<p class="wordq">Người ta đóng số lên các khung xe đạp. Các khung xe đạp đã được
      đóng số từ 1 đến ${NSP59(n)}. Hỏi ba khung xe tiếp theo sẽ được đóng số nào?</p>
    <div class="bullet">Ba khung xe tiếp theo được đóng số ${q.num(n + 1)},
      ${q.num(n + 2)} và ${q.num(n + 3)}.</div>`,
    `${NSP59(n)} + 1 = ${NSP59(n + 1)};  ${NSP59(n + 1)} + 1 = ${NSP59(n + 2)};  `
      + `${NSP59(n + 2)} + 1 = ${NSP59(n + 3)}`);
},

/* ===== tr.59 – Luyện tập (tiếp), Bài 1: Chọn cách đọc thích hợp với số ===== */
() => {
  const q = Q(1, 'Chọn cách đọc thích hợp với số.');
  const ns = [R(1, 9) * 1000 + R(0, 999)];
  for (let g = 0; g < 200 && ns.length < 4; g++){
    const n = R(1, 9) * 10000 + R(0, 9) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(0, 9);
    if (!ns.includes(n)) ns.push(n);
  }
  while (ns.length < 4) ns.push(12456 + ns.length);
  const doc = ns.slice().sort(() => Math.random() - .5);
  const L = ['A', 'B', 'C', 'D'];
  const cards = '<div class="b59-cards">' + doc.map((n, i) =>
    `<div class="b59-card"><b>${L[i]}</b>${readNum5(n)}</div>`).join('') + '</div>';
  const lines = ns.map(n =>
    `<div class="b59-ds"><span><span class="b59-oval">${NSP59(n)}</span></span>
      đọc là ${q.pick(L[doc.indexOf(n)], L)}</div>`).join('');
  return q.done(cards + lines,
    ns.map(n => `${NSP59(n)}: ${readNum5(n)}`).join(';  '));
},

/* ===== tr.59–60 – Luyện tập (tiếp), Bài 2: Số ? và số tròn chục nghìn ===== */
() => {
  const q = Q(2, '<span class="tag">Số</span> ?');
  const st = R(1, 5) * 10000;
  const seq = Array.from({length: 6}, (_, i) => st + i * 5000);
  const hide = [1, 2, 3, 4].sort(() => Math.random() - .5).slice(0, 2);
  const cells = seq.map((v, i) => hide.includes(i) ? q.num(v) : NSP59(v));
  const tron = seq.filter(v => v % 10000 === 0).map(NSP59);
  const opts = seq.map(NSP59);
  return q.done(`<div class="sub-lbl">a)</div>${chain(cells, 'pill')}
    <div class="sub-lbl">b) Trong các số trên, số nào là số tròn chục nghìn?</div>
    <div class="fill-line">${q.pick(tron.slice().sort().join(','), opts)}</div>
    <div class="hint-line">Chạm để chọn tất cả các số tròn chục nghìn.</div>`,
    `Dãy số: ${seq.map(NSP59).join(', ')}. Số tròn chục nghìn: ${tron.join(', ')}.`);
},

/* ===== tr.60 – Luyện tập (tiếp), Bài 3: Chọn câu trả lời đúng (bạn An đố Mai) ===== */
() => {
  const q = Q(3, 'Chọn câu trả lời đúng.');
  const T = R(10000, 99400);
  const d = Math.floor(T / 10000);
  const h10 = Math.floor(r10_59(T) / 10) % 10;
  const h100 = Math.floor(r100_59(T) / 100) % 10;
  const sat = n => Math.floor(n / 10000) === d
    && Math.floor(r10_59(n) / 10) % 10 === h10
    && Math.floor(r100_59(n) / 100) % 10 === h100;
  const sai = [];
  for (let g = 0; g < 400 && sai.length < 3; g++){
    const n = R(10000, 99400);
    if (n !== T && !sat(n) && !sai.includes(n)) sai.push(n);
  }
  while (sai.length < 3) sai.push(11111 + sai.length * 1111);
  const all = [T].concat(sai).sort((x, y) => x - y);
  const L = ['A', 'B', 'C', 'D'];
  const ans = L[all.indexOf(T)];
  return q.done(`<p class="wordq">Bạn An đố Mai tìm một số từ bốn số cho trước
      ${all.map(NSP59).join(', ')}, biết rằng:</p>
    <div class="bullet">Hàng chục nghìn của số cần tìm là ${d}.</div>
    <div class="bullet">Nếu làm tròn số cần tìm đến hàng chục thì chữ số hàng chục
      của số làm tròn là ${h10}.</div>
    <div class="bullet">Nếu làm tròn số cần tìm đến hàng trăm thì chữ số hàng trăm
      của số làm tròn là ${h100}.</div>
    <div class="b59-opt">${all.map((n, i) =>
      `<span style="margin-right:22px"><b style="color:#d63384">${L[i]}.</b> ${NSP59(n)}</span>`).join('')}</div>
    <div class="fill-line">Số cần tìm là: ${q.pick(ans, L)}</div>`,
    `Số cần tìm là ${NSP59(T)}: làm tròn đến hàng chục được ${NSP59(r10_59(T))}, `
      + `làm tròn đến hàng trăm được ${NSP59(r100_59(T))}.`);
},
];
