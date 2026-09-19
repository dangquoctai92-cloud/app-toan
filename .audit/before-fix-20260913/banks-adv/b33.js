/* ===== NÂNG CAO — Bài 33: Nhiệt độ. Đơn vị đo nhiệt độ ===== */

const b33advNoi = ['Hà Nội', 'Lào Cai', 'Sa Pa', 'Huế', 'Đà Lạt', 'Cần Thơ', 'Hải Phòng', 'Nha Trang'];
const b33advTen = ['Việt', 'Nam', 'Mai', 'Mi', 'Linh', 'Rô-bốt'];

/* n số nguyên khác nhau trong khoảng [lo; hi] */
const b33advKhac = (n, lo, hi) => {
  const v = [];
  let g = 0;
  while (v.length < n && g++ < 300){
    const x = R(lo, hi);
    if (!v.includes(x)) v.push(x);
  }
  for (let x = lo; x <= hi && v.length < n; x++) if (!v.includes(x)) v.push(x);
  return v;
};

ADV.b33 = [

/* 1. Bảng nhiệt độ bốn địa phương — cao nhất, thấp nhất, chênh lệch */
() => {
  const q = Q(1, 'Bảng sau cho biết nhiệt độ không khí lúc 7 giờ sáng ở bốn địa phương.');
  const noi = [...b33advNoi].sort(() => Math.random() - .5).slice(0, 4);
  const v = b33advKhac(4, 8, 36);
  const max = Math.max.apply(null, v), min = Math.min.apply(null, v);
  const nCao = noi[v.indexOf(max)], nThap = noi[v.indexOf(min)];
  const sap = [...v].sort((x, y) => x - y);
  const moc = sap[R(0, 2)];                       // luôn có nơi cao hơn và nơi không cao hơn mốc
  const tren = noi.filter((_, i) => v[i] > moc);
  return q.done(`<div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Địa phương</th>${noi.map(x => `<td>${x}</td>`).join('')}</tr>
      <tr><th>Nhiệt độ</th>${v.map(x => `<td>${x} °C</td>`).join('')}</tr>
    </table></div>
    <div class="bullet">Nơi có nhiệt độ cao nhất là ${q.pick(nCao, noi)}</div>
    <div class="bullet">Nơi có nhiệt độ thấp nhất là ${q.pick(nThap, noi)}</div>
    <div class="bullet">Nơi nóng nhất cao hơn nơi lạnh nhất ${q.num(max - min, 2)} °C.</div>
    <div class="bullet">Những nơi có nhiệt độ cao hơn ${moc} °C là:
      ${q.pick([...tren].sort().join(','), noi)}</div>`,
    noi.map((x, i) => x + ': ' + v[i] + ' °C').join(' · ')
    + `;  ${max} − ${min} = ${max - min} (°C)`);
},

/* 2. Nhiệt độ thay đổi trong ngày — bài toán ba bước */
() => {
  const q = Q(2, '');
  const sang = R(14, 22), tang = R(6, 12), giam = R(2, tang - 2);
  const trua = sang + tang, toi = trua - giam;
  const hieu = toi - sang;
  return q.done(`<p class="wordq">Lúc 7 giờ sáng, nhiệt độ không khí ở một địa phương là ${sang} °C.
      Đến buổi trưa, nhiệt độ tăng thêm ${tang} °C. Đến buổi tối, nhiệt độ lại giảm đi ${giam} °C
      so với buổi trưa.</p>
    <div class="fill-line">Nhiệt độ buổi trưa là ${q.num(trua, 2)} °C.</div>
    <div class="fill-line">Nhiệt độ buổi tối là ${q.num(toi, 2)} °C.</div>
    <div class="fill-line">Nhiệt độ buổi tối cao hơn nhiệt độ lúc 7 giờ sáng ${q.num(hieu, 2)} °C.</div>
    <div class="fill-line">Buổi nóng nhất trong ngày là ${q.pick('buổi trưa', ['buổi sáng', 'buổi trưa', 'buổi tối'])}</div>`,
    `${sang} + ${tang} = ${trua} (°C);  ${trua} − ${giam} = ${toi} (°C);  ${toi} − ${sang} = ${hieu} (°C)`);
},

/* 3. Dãy nhiệt độ theo quy luật */
() => {
  const q = Q(3, 'Nhiệt độ không khí lúc 12 giờ trưa của các ngày trong tuần được ghi theo một quy luật.');
  const st = R(8, 15), b = R(2, 3);
  const hide = [1, 3, 5];
  const seq = Array.from({length:6}, (_, i) => st + i * b);
  const NG = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return q.done(`<div class="tbl-wrap"><table class="tbl blue">
      <tr><th>Ngày</th>${NG.map(d => `<td>${d}</td>`).join('')}</tr>
      <tr><th>Nhiệt độ</th>${seq.map((x, i) =>
        `<td>${hide.includes(i) ? q.num(x, 2) : x} °C</td>`).join('')}</tr>
    </table></div>
    <div class="fill-line">Nhiệt độ mỗi ngày tăng thêm ${q.num(b, 1)} °C so với ngày hôm trước.</div>
    <div class="fill-line">Nếu tiếp tục như vậy thì Chủ nhật có nhiệt độ ${q.num(st + 6 * b, 2)} °C.</div>
    <div class="fill-line">Nhiệt độ Chủ nhật cao hơn nhiệt độ Thứ Hai ${q.num(6 * b, 2)} °C.</div>`,
    `Dãy nhiệt độ cách đều ${b} °C. Chủ nhật = ${st} + ${b} × 6 = ${st + 6 * b} (°C)`);
},

/* 4. So sánh nhiệt độ */
() => {
  const q = Q(4, 'So sánh rồi điền dấu thích hợp vào ô trống.');
  const rows = [];
  {
    const a = R(15, 28), t = R(3, 9);
    const b = pick([a + t, a + t, a + t + R(1, 4), a + t - R(1, 4)]);
    rows.push({t:`${a} °C tăng thêm ${t} °C`, p:`${b} °C`, l:a + t, r:b});
  }
  {
    const a = R(24, 38), g = R(3, 10);
    const b = pick([a - g, a - g, a - g + R(1, 4), a - g - R(1, 4)]);
    rows.push({t:`${a} °C giảm đi ${g} °C`, p:`${b} °C`, l:a - g, r:b});
  }
  {
    const a = R(30, 40), b = R(30, 40);
    rows.push({t:`${a} °C`, p:`${b} °C`, l:a, r:b});
  }
  {
    const a = R(30, 39), b = R(30, 39), c = R(2, 6);
    rows.push({t:`${a} °C`, p:`${b} °C giảm đi ${c} °C`, l:a, r:b - c});
  }
  return q.done(`<div class="two-col"><div>${rows.map(x =>
      `<div class="cmp-row"><span class="side">${x.t}</span>${
        q.sign(x.l > x.r ? '>' : x.l < x.r ? '<' : '=')}<span class="side">${x.p}</span></div>`).join('')}</div></div>
    <div class="hint-line">Tính nhiệt độ ở mỗi vế rồi so sánh · Chạm vào ô để đổi dấu &gt; &lt; =</div>`,
    rows.map(x => `${x.l} và ${x.r}`).join(' · '));
},

/* 5. Suy luận ngược theo chuỗi so sánh */
() => {
  const q = Q(5, 'Tìm nhiệt độ không khí ở mỗi nơi, biết:');
  const noi = [...b33advNoi].sort(() => Math.random() - .5).slice(0, 3);
  const t3 = R(26, 36), m = R(4, 9), n = R(3, 8);
  const t2 = t3 - n, t1 = t2 - m;
  return q.done(`<div class="bullet">Nhiệt độ ở ${noi[2]} là ${t3} °C.</div>
    <div class="bullet">Nhiệt độ ở ${noi[1]} thấp hơn ở ${noi[2]} là ${n} °C.</div>
    <div class="bullet">Nhiệt độ ở ${noi[0]} thấp hơn ở ${noi[1]} là ${m} °C.</div>
    <div class="fill-line">Nhiệt độ ở ${noi[1]} là ${q.num(t2, 2)} °C.</div>
    <div class="fill-line">Nhiệt độ ở ${noi[0]} là ${q.num(t1, 2)} °C.</div>
    <div class="fill-line">Nhiệt độ ở ${noi[2]} cao hơn ở ${noi[0]} là ${q.num(t3 - t1, 2)} °C.</div>
    <div class="fill-line">Nơi lạnh nhất trong ba nơi là ${q.pick(noi[0], noi)}</div>`,
    `${t3} − ${n} = ${t2} (°C);  ${t2} − ${m} = ${t1} (°C);  ${t3} − ${t1} = ${t3 - t1} (°C)`);
},

/* 6. Nhiệt độ cơ thể — ai bị sốt */
() => {
  const q = Q(6, '');
  const ten = [...b33advTen].sort(() => Math.random() - .5).slice(0, 4);
  const v = b33advKhac(4, 36, 40);
  const sot = ten.filter((_, i) => v[i] > 37);
  const cao = Math.max.apply(null, v);
  const nCao = ten[v.indexOf(cao)];
  return q.done(`<p class="wordq">Bác sĩ đo nhiệt độ cơ thể của bốn bạn và ghi lại kết quả như bảng sau.
      Biết nhiệt độ cơ thể của người bình thường là 37 °C.</p>
    <div class="tbl-wrap"><table class="tbl green">
      <tr><th>Bạn</th>${ten.map(x => `<td>${x}</td>`).join('')}</tr>
      <tr><th>Nhiệt độ cơ thể</th>${v.map(x => `<td>${x} °C</td>`).join('')}</tr>
    </table></div>
    <div class="bullet">Những bạn bị sốt (nhiệt độ cơ thể cao hơn 37 °C) là:
      ${q.pick([...sot].sort().join(','), ten)}</div>
    <div class="bullet">Có ${q.num(sot.length, 1)} bạn bị sốt.</div>
    <div class="bullet">Bạn có nhiệt độ cơ thể cao nhất là ${q.pick(nCao, ten)}</div>
    <div class="bullet">Nhiệt độ cơ thể của bạn ${nCao} cao hơn 37 °C là ${q.num(cao - 37, 1)} °C.</div>`,
    ten.map((x, i) => x + ': ' + v[i] + ' °C').join(' · '));
},
];
