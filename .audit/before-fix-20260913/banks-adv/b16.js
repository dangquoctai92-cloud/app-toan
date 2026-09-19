/* ===== NÂNG CAO — Bài 16: Điểm ở giữa. Trung điểm của đoạn thẳng ===== */

/* lấy n chữ cái khác nhau để đặt tên các điểm */
const b16advTen = n => ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'K', 'M', 'N', 'P', 'Q', 'V']
  .sort(() => Math.random() - .5).slice(0, n);

ADV.b16 = [

/* 1. Hai lần lấy trung điểm — tính xuôi */
() => {
  const T = b16advTen(4);
  const A = T[0], B = T[1], M = T[2], N = T[3];
  const q = Q(1, 'Đọc kĩ các điều kiện rồi tìm độ dài mỗi đoạn thẳng.');
  const u = R(2, 9), AB = 4 * u;
  return q.done(`<div class="bullet">Đoạn thẳng ${A}${B} dài ${AB} cm.</div>
    <div class="bullet">${M} là trung điểm của đoạn thẳng ${A}${B}.</div>
    <div class="bullet">${N} là trung điểm của đoạn thẳng ${A}${M}.</div>
    <div class="fill-line">Đoạn thẳng ${A}${M} dài ${q.num(2 * u)} cm.</div>
    <div class="fill-line">Đoạn thẳng ${A}${N} dài ${q.num(u)} cm.</div>
    <div class="fill-line">Đoạn thẳng ${N}${B} dài ${q.num(3 * u)} cm.</div>`,
    `${AB} : 2 = ${2 * u} (cm);  ${2 * u} : 2 = ${u} (cm);  ${AB} − ${u} = ${3 * u} (cm)`);
},

/* 2. Bài toán ngược: biết đoạn nhỏ nhất, tìm đoạn thẳng ban đầu */
() => {
  const T = b16advTen(4);
  const A = T[0], B = T[1], M = T[2], N = T[3];
  const q = Q(2, 'Đọc kĩ các điều kiện rồi tìm độ dài mỗi đoạn thẳng.');
  const u = R(2, 9);
  return q.done(`<div class="bullet">${M} là trung điểm của đoạn thẳng ${A}${B}.</div>
    <div class="bullet">${N} là trung điểm của đoạn thẳng ${M}${B}.</div>
    <div class="bullet">Đoạn thẳng ${N}${B} dài ${u} cm.</div>
    <div class="fill-line">Đoạn thẳng ${M}${B} dài ${q.num(2 * u)} cm.</div>
    <div class="fill-line">Đoạn thẳng ${A}${B} dài ${q.num(4 * u)} cm.</div>
    <div class="fill-line">Đoạn thẳng ${A}${N} dài ${q.num(3 * u)} cm.</div>`,
    `${u} × 2 = ${2 * u} (cm);  ${2 * u} × 2 = ${4 * u} (cm);  ${4 * u} − ${u} = ${3 * u} (cm)`);
},

/* 3. Đọc thước kẻ có vạch xăng-ti-mét */
() => {
  const T = b16advTen(4);
  const A = T[0], M = T[1], B = T[2], C = T[3];
  const q = Q(3, 'Quan sát hình vẽ rồi trả lời.');
  const h = R(2, 3), a0 = R(0, 15 - 4 * h);
  const dung = Math.random() < .5;
  const mv = dung ? a0 + h : a0 + h + pick([-1, 1]);
  const pts = [{v:a0, t:A}, {v:mv, t:M}, {v:a0 + 2 * h, t:B}, {v:a0 + 4 * h, t:C}]
    .sort((x, y) => x.v - y.v);
  const opts = [A, M, B, C].sort();
  return q.done(ART.b16Ruler(15, pts) +
    `<div class="fill-line">a) Điểm ${M} có là trung điểm của đoạn thẳng ${A}${B} hay không?
       <span class="wpick">${q.pick(dung ? 'Có' : 'Không', ['Có', 'Không'])}</span></div>
     <div class="fill-line">b) Trung điểm của đoạn thẳng ${A}${C} là điểm
       <span class="wpick">${q.pick(B, opts)}</span></div>
     <div class="fill-line">c) Đoạn thẳng ${A}${C} dài ${q.num(4 * h)} cm.</div>`,
    `${A}${M} = ${mv - a0} cm, ${M}${B} = ${a0 + 2 * h - mv} cm; `
    + `${A}${B} = ${2 * h} cm, ${B}${C} = ${2 * h} cm nên ${B} là trung điểm của ${A}${C}.`);
},

/* 4. Trung điểm các cạnh hình chữ nhật trên lưới ô vuông */
() => {
  const T = b16advTen(6);
  const P = {A:T[0], B:T[1], C:T[2], D:T[3], M:T[4], N:T[5]};
  const q = Q(4, 'Quan sát hình chữ nhật trên lưới ô vuông rồi trả lời.');
  const CS = 34, w = R(2, 4), hh = R(1, 2);
  const cols = 2 * w + 2, rows = 2 * hh + 2;
  const x0 = 1, yT = 1, yB = 1 + 2 * hh;
  const px = c => c * CS, py = r => r * CS;
  const inner = `<g stroke="#2b2b2b" stroke-width="2.8" fill="none">
      <path d="M${px(x0)} ${py(yB)}H${px(x0 + 2 * w)}V${py(yT)}H${px(x0)}Z"/></g>
    <g fill="#2b2b2b" stroke="none">
      ${ART.b16Dot(px(x0), py(yB), P.A, -24, 26)}
      ${ART.b16Dot(px(x0 + 2 * w), py(yB), P.B, 10, 26)}
      ${ART.b16Dot(px(x0 + 2 * w), py(yT), P.C, 10, -8)}
      ${ART.b16Dot(px(x0), py(yT), P.D, -24, -8)}
      ${ART.b16Dot(px(x0 + w), py(yB), P.M, -6, 26)}
      ${ART.b16Dot(px(x0 + 2 * w), py(yT + hh), P.N, 12, 6)}</g>`;
  const opts = [P.A, P.B, P.C, P.D, P.M, P.N].sort();
  return q.done(ART.b16Grid(cols, rows, CS, inner) +
    `<div class="fill-line">a) Trung điểm của đoạn thẳng ${P.A}${P.B} là điểm
       <span class="wpick">${q.pick(P.M, opts)}</span></div>
     <div class="fill-line">b) Trung điểm của đoạn thẳng ${P.B}${P.C} là điểm
       <span class="wpick">${q.pick(P.N, opts)}</span></div>
     <div class="fill-line">c) Đoạn thẳng ${P.A}${P.B} dài ${q.num(2 * w, 1)} ô vuông,
       đoạn thẳng ${P.A}${P.M} dài ${q.num(w, 1)} ô vuông.</div>`,
    `${P.A}${P.M} = ${P.M}${P.B} = ${w} ô vuông; ${P.B}${P.N} = ${P.N}${P.C} = ${hh} ô vuông.`);
},

/* 5. Gấp đôi sợi dây hai lần */
() => {
  const q = Q(5, '');
  const L = 4 * R(4, 20);
  return q.done(`<p class="wordq">Việt có một sợi dây dài ${L} cm. Việt gấp đôi sợi dây rồi cắt ở chỗ gấp,
      được hai đoạn dây bằng nhau. Sau đó Việt lại gấp đôi mỗi đoạn dây rồi cắt ở chỗ gấp.</p>
    ${ART.b16Rope(L)}
    <div class="fill-line">Sau lần cắt thứ nhất, mỗi đoạn dây dài ${q.num(L / 2)} cm.</div>
    <div class="fill-line">Sau lần cắt thứ hai, mỗi đoạn dây dài ${q.num(L / 4)} cm.</div>
    <div class="fill-line">Cuối cùng Việt có tất cả ${q.num(4, 1)} đoạn dây bằng nhau.</div>`,
    `Chỗ gấp chính là trung điểm của sợi dây: ${L} : 2 = ${L / 2} (cm); ${L / 2} : 2 = ${L / 4} (cm).`);
},

/* 6. Điểm ở giữa có phải là trung điểm hay không */
() => {
  const T = b16advTen(4);
  const A = T[0], B = T[1], M = T[2], N = T[3];
  const q = Q(6, 'Đọc kĩ các điều kiện rồi trả lời.');
  const a = R(3, 9);
  const same = Math.random() < .4;
  const delta = pick([2, 4]);
  const b = same ? a : (a - delta >= 2 && Math.random() < .5 ? a - delta : a + delta);
  const AB = a + b;
  return q.done(`<div class="bullet">Điểm ${M} ở giữa hai điểm ${A} và ${B}.</div>
    <div class="bullet">Đoạn thẳng ${A}${M} dài ${a} cm, đoạn thẳng ${M}${B} dài ${b} cm.</div>
    <div class="fill-line">Đoạn thẳng ${A}${B} dài ${q.num(AB)} cm.</div>
    <div class="fill-line">Điểm ${M} có là trung điểm của đoạn thẳng ${A}${B} hay không?
      <span class="wpick">${q.pick(same ? 'Có' : 'Không', ['Có', 'Không'])}</span></div>
    <div class="fill-line">Gọi ${N} là trung điểm của đoạn thẳng ${A}${B} thì
      đoạn thẳng ${A}${N} dài ${q.num(AB / 2)} cm.</div>`,
    `${a} + ${b} = ${AB} (cm);  ${AB} : 2 = ${AB / 2} (cm). `
    + (same ? `Vì ${A}${M} = ${M}${B} nên ${M} là trung điểm của ${A}${B}.`
            : `Vì ${A}${M} khác ${M}${B} nên ${M} không phải là trung điểm của ${A}${B}.`));
},
];
