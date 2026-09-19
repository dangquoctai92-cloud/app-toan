/* ==================== BÀI 33: NHIỆT ĐỘ. ĐƠN VỊ ĐO NHIỆT ĐỘ (SGK tr.91, 92) ====================
   hoạt động tr.91–92 : bài 1, 2
   luyện tập tr.92    : bài 1, 2, 3
============================================================================================ */

/* nhiệt kế đo nhiệt độ không khí, thang đo từ -10 đến 50 độ C */
ART.b33Nk = t => {
  const LO = -10, HI = 50, Y0 = 196, Y1 = 22;
  const yOf = v => Y0 - (v - LO) * (Y0 - Y1) / (HI - LO);
  let sc = '';
  for (let v = LO; v <= HI; v += 5){
    const y = yOf(v).toFixed(1);
    const big = v % 10 === 0;
    sc += `<path d="M28 ${y}h${big ? 9 : 5}" stroke="${v < 0 ? '#2b6f9e' : '#c0392b'}" stroke-width="1.6"/>`;
    if (big) sc += `<text x="25" y="${(+y + 4).toFixed(1)}" text-anchor="end" font-size="9"
      fill="${v < 0 ? '#2b6f9e' : '#c0392b'}">${Math.abs(v)}</text>`;
  }
  const yt = yOf(Math.max(LO, Math.min(HI, t))).toFixed(1);
  return `<svg viewBox="0 0 70 226" class="b33-nk">
    <rect x="12" y="10" width="46" height="196" rx="20" fill="#fff" stroke="#9fc4d8" stroke-width="2.4"/>
    <rect x="30" y="16" width="8" height="184" rx="4" fill="#f2f6f8" stroke="#c3d6e0" stroke-width="1.4"/>
    <rect x="31.5" y="${yt}" width="5" height="${(200 - +yt).toFixed(1)}" fill="#e03b3b"/>
    ${sc}
    <circle cx="34" cy="207" r="11" fill="#e03b3b" stroke="#b02222" stroke-width="1.6"/>
    <text x="52" y="22" text-anchor="middle" font-size="10" fill="#444">°C</text>
  </svg>`;
};

/* nhiệt kế y tế, thang đo từ 35 đến 42 độ C */
ART.b33Yte = t => {
  const X0 = 46, X1 = 268;
  const xOf = v => X0 + (v - 35) * (X1 - X0) / 7;
  let sc = '';
  for (let i = 0; i <= 14; i++){
    const v = 35 + i / 2, x = xOf(v).toFixed(1);
    sc += `<path d="M${x} 30v${i % 2 ? 5 : 9}" stroke="#333" stroke-width="1.3"/>`;
    if (i % 2 === 0 && i % 4 === 0) sc += `<text x="${x}" y="26" text-anchor="middle" font-size="10" fill="#333">${v}</text>`;
  }
  const xt = xOf(Math.max(35, Math.min(42, t))).toFixed(1);
  return `<svg viewBox="0 0 300 62" class="b33-yte">
    <rect x="18" y="16" width="266" height="30" rx="15" fill="#f7fbfd" stroke="#8fa9b8" stroke-width="2.4"/>
    <rect x="26" y="27" width="252" height="9" rx="4" fill="#fff8dc" stroke="#c9b878" stroke-width="1.2"/>
    <rect x="27" y="28.5" width="${(+xt - 27).toFixed(1)}" height="6" fill="#e03b3b"/>
    ${sc}
    <rect x="266" y="20" width="20" height="22" rx="6" fill="#5fbb46" stroke="#3a862a" stroke-width="2"/>
    <text x="292" y="40" text-anchor="middle" font-size="10" fill="#c0392b">°C</text>
  </svg>`;
};

BANKS.b33 = [

/* ===== tr.91 – Bài 1 (hoạt động): dùng nhiệt kế đo nhiệt độ không khí ===== */
() => {
  const q = Q(1, 'Sử dụng nhiệt kế đo nhiệt độ không khí.');
  const NOI = ['Hà Nội', 'Lào Cai', 'Sa Pa', 'Huế', 'Đà Lạt', 'Cần Thơ', 'Hải Phòng', 'Nha Trang']
    .sort(() => Math.random() - .5).slice(0, 3);
  const t = pick([10, 15, 20, 25, 30, 35, 40]);
  const v = [];
  let guard = 0;
  while (v.length < 3 && guard++ < 60){
    const x = R(8, 38);
    if (!v.includes(x)) v.push(x);
  }
  const cao = v[0] > v[1] ? NOI[0] : NOI[1];
  const thap = v[2] < v[1] ? NOI[2] : NOI[1];
  return q.done(`<div class="b33-side">
      <div>
        <div class="fill-line">a) Ví dụ: Đọc trên thang đo của nhiệt kế, mức thuỷ ngân ở vạch ${q.num(t, 2)}
          chỉ nhiệt độ không khí là ${q.num(t, 2)} °C.</div>
      </div>
      <div>${ART.b33Nk(t)}</div>
    </div>
    <div class="fill-line">b) Ví dụ: Bảng sau đây cho biết nhiệt độ không khí vào buổi sáng ở ba địa phương:</div>
    <div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Địa phương</th>${NOI.map(x => `<td>${x}</td>`).join('')}</tr>
      <tr><th>Nhiệt độ không khí</th>${v.map(x => `<td>${x} °C</td>`).join('')}</tr>
    </table></div>
    <div class="bullet">Nhiệt độ không khí ở ${NOI[0]} và ở ${NOI[1]}, nơi nào cao hơn?
      ${q.pick(cao, [NOI[0], NOI[1]])}</div>
    <div class="bullet">Nhiệt độ không khí ở ${NOI[2]} và ở ${NOI[1]}, nơi nào thấp hơn?
      ${q.pick(thap, [NOI[2], NOI[1]])}</div>`,
    `${NOI[0]}: ${v[0]} °C · ${NOI[1]}: ${v[1]} °C · ${NOI[2]}: ${v[2]} °C`);
},

/* ===== tr.92 – Bài 2 (hoạt động): dùng nhiệt kế đo nhiệt độ cơ thể ===== */
() => {
  const q = Q(2, 'Sử dụng nhiệt kế để đo nhiệt độ cơ thể.');
  const t1 = R(36, 38), t2 = t1 + R(1, 2);
  const B = ['Việt', 'Nam', 'Mai', 'Rô-bốt', 'Mi', 'Linh'].sort(() => Math.random() - .5);
  return q.done(`<div class="fill-line">a) Ví dụ: Đọc trên thang đo của nhiệt kế, mức thuỷ ngân
      ở vạch 37 chỉ nhiệt độ cơ thể là 37 °C.</div>
    ${ART.b33Yte(37)}
    <div class="fill-line">b) <span class="tag">Số</span> ?
      Dựa vào kết quả đo nhiệt độ của các bạn mà bác sĩ đã nêu:</div>
    ${speech('Nhiệt độ cơ thể của ' + B[0] + ' là ' + readNum(t1) + ' độ xê, của ' + B[1] + ' là ' + readNum(t2) + ' độ xê.')}
    <div class="bullet">Nhiệt độ cơ thể của ${B[0]} là ${q.num(t1, 2)} °C;</div>
    <div class="bullet">Nhiệt độ cơ thể của ${B[1]} là ${q.num(t2, 2)} °C.</div>`,
    `${B[0]}: ${t1} °C · ${B[1]}: ${t2} °C`);
},

/* ===== tr.92 – Luyện tập, Bài 1: bảng dự báo nhiệt độ các buổi trong ngày ===== */
() => {
  const q = Q(1, 'Dự báo nhiệt độ không khí vào các buổi trong ngày ở một địa phương được ghi theo bảng sau:');
  const dem = R(10, 19), sang = R(20, 29), trua = R(30, 38);
  return q.done(`<div class="tbl-wrap"><table class="tbl pink">
      <tr><th>Buổi</th><td>Sáng</td><td>Trưa</td><td>Đêm</td></tr>
      <tr><th>Nhiệt độ</th><td>${sang} °C</td><td>${trua} °C</td><td>${dem} °C</td></tr>
    </table></div>
    <div class="fill-line">Dựa vào bảng trên, hãy cho biết nhiệt độ không khí:</div>
    <div class="bullet">a) Buổi sáng là ${q.num(sang, 2)} độ, buổi trưa là ${q.num(trua, 2)} độ,
      buổi đêm là ${q.num(dem, 2)} độ.</div>
    <div class="bullet">b) Thấp nhất là ${q.num(dem, 2)} độ, cao nhất là ${q.num(trua, 2)} độ.</div>`,
    `Thấp nhất: ${dem} °C (buổi đêm); cao nhất: ${trua} °C (buổi trưa).`);
},

/* ===== tr.92 – Luyện tập, Bài 2: nhiệt độ nào cao hơn nhiệt độ người bình thường ===== */
() => {
  const q = Q(2, '');
  const k = R(1, 2);
  const his = [38, 39, 40].sort(() => Math.random() - .5).slice(0, k);
  const los = [35, 36, 37].sort(() => Math.random() - .5).slice(0, 3 - k);
  const all = his.concat(los).sort(() => Math.random() - .5);
  const lab = x => x + ' °C';
  return q.done(`<p class="wordq">Có ba người đo nhiệt độ cơ thể được kết quả lần lượt là:
      ${all.map(lab).join('; ')}. Hỏi trong ba nhiệt độ trên, nhiệt độ nào cao hơn nhiệt độ cơ thể
      của người bình thường? Biết nhiệt độ cơ thể của người bình thường là 37 °C.</p>
    <div class="fill-line">Chọn tất cả các nhiệt độ cao hơn 37 °C:
      ${q.pick(his.map(lab).sort().join(','), all.map(lab))}</div>`,
    `Cao hơn 37 °C: ${his.sort((a, b) => a - b).map(lab).join(', ')}.`);
},

/* ===== tr.92 – Luyện tập, Bài 3: hoạt động ở nhà ===== */
() => {
  const q = Q(3, 'Hoạt động ở nhà:');
  const nong = Math.random() < .5;
  const tk = nong ? R(32, 39) : R(8, 14);
  const sot = Math.random() < .5;
  const tc = sot ? R(38, 40) : 37;
  return q.done(`<div class="fill-line">a) Khi thời tiết thay đổi, em xem nhiệt kế đo nhiệt độ không khí
      để biết trời nóng hay lạnh mà mặc quần áo cho phù hợp.</div>
    <div class="b33-row">${ART.b33Nk(tk)}</div>
    <div class="bullet">Nhiệt kế chỉ ${q.num(tk, 2)} °C, vậy trời ${q.pick(nong ? 'nóng' : 'lạnh', ['nóng', 'lạnh'])}.</div>
    <div class="fill-line">b) Khi thấy người sốt nóng, khó chịu, em hãy nhờ người lớn dùng nhiệt kế
      đo nhiệt độ cơ thể để được thăm khám kịp thời.</div>
    ${ART.b33Yte(tc)}
    <div class="bullet">Nhiệt kế y tế chỉ ${q.num(tc, 2)} °C, vậy người đó
      ${q.pick(sot ? 'bị sốt' : 'bình thường', ['bình thường', 'bị sốt'])}.</div>`,
    `Trời ${nong ? 'nóng' : 'lạnh'} khi nhiệt độ không khí là ${tk} °C; cơ thể ${tc} °C ${sot ? 'là bị sốt' : 'là bình thường'}.`);
},
];
