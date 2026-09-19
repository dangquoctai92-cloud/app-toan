/*CSS
.b24adv-side{min-width:170px}
CSS*/

/* ===== NÂNG CAO — Bài 24: Gấp một số lên một số lần ===== */

/* mũi tên có nhãn dùng trong sơ đồ */
const b24advArrow = txt => `<span class="farrow"><i>${txt}</i><svg viewBox="0 0 120 20">
  <path d="M2 10h104" stroke="#4a4460" stroke-width="2.4"/>
  <path d="M104 4l14 6-14 6z" fill="#4a4460"/></svg></span>`;

const b24advLen = v => String(v).length;

ADV.b24 = [

/* 1. Sơ đồ hai bước: gấp rồi thêm — thêm rồi gấp */
() => {
  const q = Q(1, '<span class="tag">Số</span> ?');
  const n = R(4, 12), k = R(2, 5), t = R(5, 20);
  const A1 = n * k, A2 = A1 + t;
  const B1 = n + t, B2 = B1 * k;
  return q.done(`<div class="flow">
      <span class="fnode circle">${n}</span>${b24advArrow('gấp ' + k + ' lần')}
      <span class="fnode sq">${q.num(A1, b24advLen(A1))}</span>${b24advArrow('thêm ' + t + ' đơn vị')}
      <span class="fnode sq">${q.num(A2, b24advLen(A2))}</span>
    </div>
    <div class="flow">
      <span class="fnode circle">${n}</span>${b24advArrow('thêm ' + t + ' đơn vị')}
      <span class="fnode sq">${q.num(B1, b24advLen(B1))}</span>${b24advArrow('gấp ' + k + ' lần')}
      <span class="fnode sq">${q.num(B2, b24advLen(B2))}</span>
    </div>
    <div class="fill-line">Kết quả của sơ đồ thứ hai hơn kết quả của sơ đồ thứ nhất
      ${q.num(B2 - A2, b24advLen(B2 - A2))} đơn vị.</div>
    <div class="hint-line">Gấp lên một số lần thì làm phép nhân, thêm một số đơn vị thì làm phép cộng.</div>`,
    `${n} × ${k} = ${A1}, ${A1} + ${t} = ${A2};  ${n} + ${t} = ${B1}, ${B1} × ${k} = ${B2};  `
    + `${B2} − ${A2} = ${B2 - A2}.`);
},

/* 2. Tìm số theo nhiều điều kiện (bài toán ngược của phép gấp) */
() => {
  const q = Q(2, 'Tìm hai số thoả mãn tất cả các điều kiện sau.');
  const a = R(3, 9), k = R(2, 9), d = R(2, 9);
  const P = a * k, b = a + d;
  return q.done(`<div class="bullet">Số thứ nhất là số có một chữ số.</div>
    <div class="bullet">Gấp số thứ nhất lên ${k} lần thì được ${P}.</div>
    <div class="bullet">Số thứ hai hơn số thứ nhất ${d} đơn vị.</div>
    <div class="fill-line">Số thứ nhất là ${q.num(a, 1)}</div>
    <div class="fill-line">Số thứ hai là ${q.num(b, b24advLen(b))}</div>
    <div class="fill-line">Tổng hai số đó là ${q.num(a + b, b24advLen(a + b))}</div>
    <div class="fill-line">Gấp số thứ hai lên ${k} lần thì được ${q.num(b * k, b24advLen(b * k))}</div>`,
    `${P} : ${k} = ${a};  ${a} + ${d} = ${b};  ${a} + ${b} = ${a + b};  ${b} × ${k} = ${b * k}.`);
},

/* 3. So sánh: gấp lên nhiều lần và thêm nhiều đơn vị */
() => {
  const q = Q(3, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = pick([1, 1, 2, 2, 3, 4, 5, 6, 7, 8]), k = R(2, 9);
    rows.push({t:`${a} gấp ${k} lần`, p:`${a} thêm ${k} đơn vị`, l:a * k, r:a + k});
  }
  {
    const a = R(3, 9), k = R(2, 9), b = R(3, 9), j = R(2, 9);
    rows.push({t:`${a} gấp ${k} lần`, p:`${b} gấp ${j} lần`, l:a * k, r:b * j});
  }
  {
    const a = R(4, 12), k = R(2, 8), dd = pick([-10, -5, 0, 0, 5, 10]);
    rows.push({t:`${a} gấp ${k} lần`, p:`${a * k + dd}`, l:a * k, r:a * k + dd});
  }
  {
    const a = R(2, 6), p = 2, r = R(2, 3);
    const s = Math.max(2, p * r + pick([-2, -1, 0, 0, 1, 2]));
    rows.push({t:`${a} gấp ${p} lần rồi gấp ${r} lần`, p:`${a} gấp ${s} lần`, l:a * p * r, r:a * s});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side b24adv-side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side b24adv-side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính giá trị của mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`);
},

/* 4. Dãy số theo quy luật gấp lên một số lần */
() => {
  const an = pick([2, 3]);
  const q = Q(4, 'Tìm quy luật rồi viết tiếp ' + (an === 2 ? 'hai' : 'ba') + ' số của dãy số sau.');
  const r = pick([2, 2, 3]);
  const st = r === 2 ? R(2, 9) : R(2, 4);
  const len = r === 2 ? 7 : 6;
  const seq = [st];
  for (let i = 1; i < len; i++) seq.push(seq[i - 1] * r);
  const hide = len - an;
  return q.done(`<div class="chain pill">${seq.map((v, i) =>
      `<span class="cnode${i >= hide ? ' q' : ''}">${i >= hide ? q.num(v, b24advLen(v)) : v}</span>`).join('')}</div>
    <div class="fill-line">Mỗi số trong dãy được gấp lên ${q.num(r, 1)} lần thì được số đứng liền sau.</div>`,
    `Quy luật: mỗi số gấp ${r} lần số đứng ngay trước nó. Dãy số: ${seq.join(', ')}.`);
},

/* 5. Bài toán ba bước với phép gấp */
() => {
  const q = Q(5, '');
  const a = R(6, 15), k = R(2, 5), t = R(4, 9);
  const h = a * k;
  return q.done(`<p class="wordq">Bạn Lan gấp được ${a} bông hoa giấy. Số bông hoa bạn Hồng gấp được
      gấp ${k} lần số bông hoa của bạn Lan.</p>
    <div class="fill-line">Bạn Hồng gấp được ${q.num(h, b24advLen(h))} bông hoa.</div>
    <div class="fill-line">Cả hai bạn gấp được ${q.num(a + h, b24advLen(a + h))} bông hoa.</div>
    <div class="fill-line">Bạn Hồng gấp được nhiều hơn bạn Lan ${q.num(h - a, b24advLen(h - a))} bông hoa.</div>
    <div class="fill-line">Nếu bạn Lan gấp thêm ${t} bông hoa nữa thì bạn Lan có
      ${q.num(a + t, b24advLen(a + t))} bông hoa.</div>`,
    `${a} × ${k} = ${h};  ${a} + ${h} = ${a + h};  ${h} − ${a} = ${h - a};  ${a} + ${t} = ${a + t}.`);
},

/* 6. Bài toán ngược nhiều bước */
() => {
  const q = Q(6, '');
  const c = R(4, 9), k = R(2, 6);
  const cam = c * k;
  return q.done(`<p class="wordq">Vườn nhà bác Hà có ${cam} cây cam. Số cây cam gấp ${k} lần số cây chanh.
      Hỏi vườn nhà bác Hà có bao nhiêu cây chanh?</p>
    <div class="fill-line">Vườn nhà bác Hà có ${q.num(c, b24advLen(c))} cây chanh.</div>
    <div class="fill-line">Cả vườn có ${q.num(cam + c, b24advLen(cam + c))} cây cam và cây chanh.</div>
    <div class="fill-line">Số cây cam nhiều hơn số cây chanh ${q.num(cam - c, b24advLen(cam - c))} cây.</div>
    <div class="hint-line">Số cây cam gấp ${k} lần số cây chanh nên số cây chanh bằng số cây cam chia cho ${k}.</div>`,
    `${cam} : ${k} = ${c};  ${cam} + ${c} = ${cam + c};  ${cam} − ${c} = ${cam - c}.`);
},
];
