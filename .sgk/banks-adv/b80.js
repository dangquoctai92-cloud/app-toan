/* ===== NÂNG CAO — Bài 80: Ôn tập bảng số liệu, khả năng xảy ra của một sự kiện =====
   Dùng lại của phần cơ bản: b80Mix, b80Set, b80Tbl2, b80KQ, b80MoiSK, b80DS.
   Hàm phụ trợ riêng của phần nâng cao đặt tiền tố b80adv.
   Bốn dạng nâng lên so với phần cơ bản:
     - bảng số liệu có ô bị che, phải dùng tổng của hàng để tìm ra;
     - bảng số liệu hai chiều: tính tổng theo hàng, tìm ngày nhiều nhất, tìm hiệu;
     - lập bảng từ các manh mối "nhiều hơn", "ít hơn";
     - khả năng xảy ra: đếm sự kiện và tìm số vật ÍT NHẤT phải lấy để một sự kiện
       trở thành chắc chắn (xét trường hợp không may nhất).
   Mọi đáp án đều là số hoặc Đ/S nên xác định duy nhất. */

/* bảng số liệu có cột cuối là cột tổng (tô màu) và có thể có một hàng tổng ở dưới */
const b80advBang = (goc1, goc2, cot, hang, cuoi) =>
  `<div class="b80-wrap"><table class="b80-tbl b80adv-tbl">
    <tr><td class="b80-diag"><span class="t1">${goc1}</span><span class="t2">${goc2}</span></td>
      ${cot.map((c, j) => `<td class="tp${j === cot.length - 1 ? ' tot' : ''}">${c}</td>`).join('')}</tr>
    ${hang.map(h => `<tr><td class="hd">${h[0]}</td>
      ${h.slice(1).map((v, j) => `<td class="${j === cot.length - 1 ? 'tot' : ''}">${v}</td>`).join('')}
      </tr>`).join('')}
    ${cuoi ? `<tr><td class="hd tot">${cuoi[0]}</td>
      ${cuoi.slice(1).map(v => `<td class="tot">${v}</td>`).join('')}</tr>` : ''}
  </table></div>`;

/* các phần tử của mảng có đôi một khác nhau hay không */
const b80advKhac = a => new Set(a).size === a.length;

/* ---- chiếc túi vải đựng bi ---- */
ART.b80advTui = () => `<svg class="b80adv-tui" viewBox="0 0 110 122">
  <ellipse cx="55" cy="114" rx="40" ry="5" fill="rgba(60,40,20,.12)"/>
  <path d="M28 46h54l11 56q-38 11-76 0z" fill="#e8b7d0" stroke="#a55a86" stroke-width="3"
    stroke-linejoin="round"/>
  <path d="M34 24q8 12 21 12t21-12" fill="none" stroke="#a55a86" stroke-width="3"
    stroke-linecap="round"/>
  <rect x="22" y="38" width="66" height="15" rx="7" fill="#f6d8e6" stroke="#a55a86" stroke-width="3"/>
  <path d="M40 68q15 8 30 0" fill="none" stroke="#c98cae" stroke-width="2.4" stroke-linecap="round"/>
</svg>`;

/* ---- viên bi ---- */
ART.b80advBi = mau => `<svg class="b80adv-bi" viewBox="0 0 40 40">
  <circle cx="20" cy="20" r="16" fill="${mau}" stroke="#6b6480" stroke-width="2.6"/>
  <ellipse cx="14" cy="13" rx="6" ry="4" fill="#fff" opacity=".55"
    transform="rotate(-28 14 13)"/>
</svg>`;

/* ---- quả bóng ---- */
ART.b80advBong = mau => `<svg class="b80adv-bong" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" fill="${mau}" stroke="#6b6480" stroke-width="2.8"/>
  <path d="M6 20q18 8 36 0" fill="none" stroke="#fff" stroke-width="2.6" opacity=".8"/>
  <path d="M6 30q18 8 36 0" fill="none" stroke="#fff" stroke-width="2.6" opacity=".55"/>
  <ellipse cx="16" cy="14" rx="6" ry="4" fill="#fff" opacity=".5" transform="rotate(-28 16 14)"/>
</svg>`;

/* ---- chiếc thẻ ghi số ---- */
ART.b80advThe = n => `<svg class="b80adv-the" viewBox="0 0 44 60">
  <rect x="3" y="3" width="38" height="54" rx="7" fill="#fff" stroke="#5b86bd" stroke-width="3"/>
  <rect x="8" y="8" width="28" height="44" rx="4" fill="#eef5ff"/>
  <text x="22" y="39" text-anchor="middle" font-size="24" font-weight="800"
    fill="#2b3a5a">${n}</text>
</svg>`;

ADV.b80 = [

/* ===== 1. Bảng số liệu có ô bị che — dùng tổng của hàng để tìm ra ===== */
() => {
  const VIEC = pick([
    {v: 'cây xanh', d: 'trồng được', dv: 'cây'},
    {v: 'bức tranh', d: 'vẽ được', dv: 'bức tranh'},
    {v: 'lá cờ nhỏ', d: 'làm được', dv: 'lá cờ'}
  ]);
  const q = Q(1, `Bảng sau cho biết số ${VIEC.v} mà mỗi lớp ${VIEC.d} trong ba ngày. `
    + 'Tìm số thích hợp cho mỗi ô có dấu "?".');
  const LOP = ['Lớp 3A', 'Lớp 3B', 'Lớp 3C'];
  const NGAY = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư'];

  const mk = () => LOP.map(() => NGAY.map(() => R(6, 25)));
  const sHang = d => d.map(r => r.reduce((s, v) => s + v, 0));
  const sCot = d => NGAY.map((x, j) => d.reduce((s, r) => s + r[j], 0));
  let dat = mk(), g = 0;
  while (g++ < 60 && !(b80advKhac(sHang(dat)) && b80advKhac(sCot(dat)))) dat = mk();
  if (!(b80advKhac(sHang(dat)) && b80advKhac(sCot(dat))))
    dat = [[10, 12, 15], [14, 20, 9], [18, 8, 22]];

  const hangT = sHang(dat), cotT = sCot(dat);
  const tong = hangT.reduce((s, v) => s + v, 0);
  const che = [R(0, 2), R(0, 2), R(0, 2)];
  const iNgay = cotT.indexOf(Math.max(...cotT));
  const iLop = hangT.indexOf(Math.max(...hangT));

  const hang = LOP.map((t, i) => [t].concat(
    NGAY.map((x, j) => j === che[i] ? q.num(dat[i][j], 2) : dat[i][j]), [hangT[i]]));
  const cuoi = ['Cả ba lớp'].concat(cotT.map(v => q.num(v, 3)), [q.num(tong, 3)]);

  const html = b80advBang('Ngày', 'Lớp', NGAY.concat(['Cả ba ngày']), hang, cuoi)
    + `<div class="b80-note">Cột cuối cho biết số ${VIEC.dv} của mỗi lớp trong cả ba ngày.</div>`
    + `<div class="b80-ask">a) Ngày nào cả ba lớp ${VIEC.d} nhiều ${VIEC.dv} nhất?</div>`
    + `<div class="fill-line b80-wide">${q.pick(NGAY[iNgay], NGAY)}</div>`
    + `<div class="b80-ask">b) Lớp nào ${VIEC.d} nhiều ${VIEC.dv} nhất?</div>`
    + `<div class="fill-line b80-wide">${q.pick(LOP[iLop], LOP)}</div>`
    + '<div class="hint-line">Ô bị che ở mỗi hàng bằng số của cột cuối trừ đi hai số còn lại '
    + 'của hàng đó. Điền xong các ô bị che em mới cộng được theo từng cột.</div>';

  return q.done(html,
    LOP.map((t, i) => `${t}: ${hangT[i]} − `
      + NGAY.map((x, j) => j === che[i] ? null : dat[i][j]).filter(v => v !== null).join(' − ')
      + ` = ${dat[i][che[i]]}`).join('; ') + '. '
    + 'Cộng theo từng cột: '
    + NGAY.map((d, j) => `${d} ${dat.map(r => r[j]).join(' + ')} = ${cotT[j]}`).join('; ')
    + `. Cả ba lớp trong ba ngày: ${cotT.join(' + ')} = ${tong} (${VIEC.dv}). `
    + `Vậy ${NGAY[iNgay].toLowerCase()} cả ba lớp ${VIEC.d} nhiều nhất và ${LOP[iLop]} `
    + `${VIEC.d} nhiều nhất.`);
},

/* ===== 2. Bảng hai chiều: tổng theo hàng, ngày nhiều nhất, hiệu ===== */
() => {
  const NOI = pick(['thư viện', 'phòng đọc sách', 'phòng máy tính']);
  const q = Q(2, `Bảng sau cho biết số học sinh đến ${NOI} vào mỗi buổi sáng và mỗi buổi `
    + 'chiều trong một tuần học.');
  const NGAY = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];

  const mk = () => NGAY.map(() => R(6, 15) * 5);
  let sang = mk(), chieu = mk(), g = 0;
  const cong = () => NGAY.map((x, i) => sang[i] + chieu[i]);
  while (g++ < 60 && !b80advKhac(cong())){ sang = mk(); chieu = mk(); }
  if (!b80advKhac(cong())){ sang = [30, 40, 50, 60, 70]; chieu = [35, 45, 55, 65, 75]; }

  const ngay = cong();
  const tS = sang.reduce((s, v) => s + v, 0);
  const tC = chieu.reduce((s, v) => s + v, 0);
  const iMax = ngay.indexOf(Math.max(...ngay));
  const iMin = ngay.indexOf(Math.min(...ngay));
  const dau = tS > tC ? '>' : tS < tC ? '<' : '=';

  const html = b80Tbl2('Thứ', 'Buổi', NGAY,
      [['Sáng'].concat(sang), ['Chiều'].concat(chieu)])
    + `<div class="b80-ask">a) Trong cả tuần, có bao nhiêu học sinh đến ${NOI} vào các buổi
        sáng, vào các buổi chiều?</div>`
    + `<div class="bullet">Các buổi sáng có tất cả ${q.num(tS, 4)} học sinh.</div>`
    + `<div class="bullet">Các buổi chiều có tất cả ${q.num(tC, 4)} học sinh.</div>`
    + '<div class="b80-ask">b) So sánh số học sinh của các buổi sáng với số học sinh '
    + 'của các buổi chiều trong cả tuần.</div>'
    + `<div class="b80adv-row"><div class="cmp-row"><span class="side">Các buổi sáng</span>
        ${q.sign(dau)}<span class="side">Các buổi chiều</span></div></div>`
    + `<div class="b80-ask">c) Ngày nào có nhiều học sinh đến ${NOI} nhất (tính cả hai buổi
        của ngày đó)?</div>`
    + `<div class="fill-line b80-wide">${q.pick(NGAY[iMax], NGAY)}</div>`
    + `<div class="bullet">Ngày đó có ${q.num(ngay[iMax], 3)} học sinh.</div>`
    + '<div class="b80-ask">d) Ngày có nhiều học sinh nhất hơn ngày có ít học sinh nhất '
    + 'bao nhiêu học sinh?</div>'
    + `<div class="bullet">Nhiều hơn ${q.num(ngay[iMax] - ngay[iMin], 3)} học sinh.</div>`
    + '<div class="hint-line">Muốn biết cả một ngày có bao nhiêu học sinh, em cộng số học sinh '
    + 'của buổi sáng với số học sinh của buổi chiều trong cùng một cột.</div>';

  return q.done(html,
    `Các buổi sáng: ${sang.join(' + ')} = ${tS} (học sinh). `
    + `Các buổi chiều: ${chieu.join(' + ')} = ${tC} (học sinh), nên ${tS} ${dau} ${tC}. `
    + 'Số học sinh của cả từng ngày lần lượt là '
    + NGAY.map((d, i) => `${d} ${ngay[i]}`).join('; ')
    + `. Nhiều nhất là ${NGAY[iMax].toLowerCase()} với ${ngay[iMax]} học sinh, ít nhất là `
    + `${NGAY[iMin].toLowerCase()} với ${ngay[iMin]} học sinh; `
    + `${ngay[iMax]} − ${ngay[iMin]} = ${ngay[iMax] - ngay[iMin]} (học sinh).`);
},

/* ===== 3. Lập bảng số liệu từ các manh mối "nhiều hơn", "ít hơn" ===== */
() => {
  const TEN = b80Mix(['Mai', 'Việt', 'Nam', 'Mi', 'Rô-bốt']).slice(0, 3);
  const DO = pick([
    {v: 'bông hoa', d: 'hái được'},
    {v: 'ngôi sao giấy', d: 'gấp được'},
    {v: 'chiếc thuyền giấy', d: 'gấp được'}
  ]);
  const a = R(12, 40), b = R(5, 20);
  const hi = Math.min(25, a + b - 5);
  let c = R(3, hi), g = 0;
  while (g++ < 40 && c === b) c = R(3, hi);
  if (c === b) c = c === 3 ? 4 : 3;

  const v = [a, a + b, a + b - c];
  const tong = v[0] + v[1] + v[2];
  const iIt = v.indexOf(Math.min(...v));
  const q = Q(3, `Ba bạn ${TEN[0]}, ${TEN[1]} và ${TEN[2]} cùng ${DO.d} ${DO.v}. `
    + 'Đọc các dòng dưới đây rồi hoàn thành bảng số liệu.');

  const html = `<div class="b80adv-clue">&ndash; ${TEN[0]} ${DO.d} <b>${a}</b> ${DO.v}.</div>
    <div class="b80adv-clue">&ndash; ${TEN[1]} ${DO.d} nhiều hơn ${TEN[0]} <b>${b}</b> ${DO.v}.</div>
    <div class="b80adv-clue">&ndash; ${TEN[2]} ${DO.d} ít hơn ${TEN[1]} <b>${c}</b> ${DO.v}.</div>
    <div class="b80-wrap"><table class="b80-tbl">
      <tr><td class="tp">Bạn</td>${TEN.map(t => `<td class="tp">${t}</td>`).join('')}</tr>
      <tr><td class="hd">Số ${DO.v}</td><td>${v[0]}</td>
        <td>${q.num(v[1], 3)}</td><td>${q.num(v[2], 3)}</td></tr>
    </table></div>
    <div class="b80-ask">a) Cả ba bạn ${DO.d} tất cả bao nhiêu ${DO.v}?</div>
    <div class="bullet">Cả ba bạn ${DO.d} ${q.num(tong, 3)} ${DO.v}.</div>
    <div class="b80-ask">b) Bạn nào ${DO.d} ít ${DO.v} nhất?</div>
    <div class="fill-line b80-wide">${q.pick(TEN[iIt], TEN)}</div>
    <div class="b80-ask">c) Bạn ${TEN[1]} ${DO.d} nhiều hơn bạn ${TEN[2]} bao nhiêu ${DO.v}?</div>
    <div class="bullet">Nhiều hơn ${q.num(c, 2)} ${DO.v}.</div>
    <div class="hint-line">"Nhiều hơn" thì làm tính cộng, "ít hơn" thì làm tính trừ.
      Em tìm số của ${TEN[1]} trước rồi mới tìm được số của ${TEN[2]}.</div>`;

  return q.done(html,
    `${TEN[1]}: ${a} + ${b} = ${v[1]} (${DO.v}). ${TEN[2]}: ${v[1]} − ${c} = ${v[2]} (${DO.v}). `
    + `Cả ba bạn: ${v[0]} + ${v[1]} + ${v[2]} = ${tong} (${DO.v}). `
    + `Số bé nhất trong ba số ${v.join(', ')} là ${v[iIt]} nên ${TEN[iIt]} ${DO.d} ít nhất. `
    + `${TEN[1]} nhiều hơn ${TEN[2]} đúng bằng ${c} ${DO.v}.`);
},

/* ===== 4. Túi bi: sự kiện khi lấy 1 viên và số bi ít nhất phải lấy ===== */
() => {
  const MAU = b80Mix([
    {ten: 'bi đỏ', m: '#e8443a'}, {ten: 'bi xanh', m: '#3f7ad6'},
    {ten: 'bi vàng', m: '#f6c94a'}, {ten: 'bi tím', m: '#9b6bd6'},
    {ten: 'bi xanh lá', m: '#4caf50'}
  ]).slice(0, 3);
  const sl = MAU.map(() => R(2, 6));
  const tong = sl.reduce((s, v) => s + v, 0);
  const k = R(0, 2);
  const j = (k + R(1, 2)) % 3;
  const q = Q(4, 'Trong một chiếc túi có '
    + MAU.map((c, i) => `${sl[i]} viên ${c.ten}`).join(', ')
    + '. Lấy bi ra khỏi túi mà không nhìn vào túi.');

  const st = b80Mix([
    {t: `Lấy một viên bi thì chắc chắn lấy được viên ${MAU[k].ten}.`, v: 'S'},
    {t: `Lấy một viên bi thì có thể lấy được viên ${MAU[j].ten}.`, v: 'Đ'},
    {t: 'Lấy một viên bi thì không thể lấy được viên bi nâu.', v: 'Đ'},
    {t: 'Lấy một viên bi thì có thể lấy được viên bi nâu.', v: 'S'}
  ]).slice(0, 3);

  const html = `<div class="b80adv-row">${ART.b80advTui()}
      ${MAU.map((c, i) => Array.from({length: sl[i]},
        () => ART.b80advBi(c.m)).join('')).join('')}</div>
    <div class="b80-note">Trong túi có ${MAU.map((c, i) => `${sl[i]} viên ${c.ten}`).join(', ')}
      &ndash; tất cả ${tong} viên bi</div>
    <div class="b80-ask">a) Lấy ra một viên bi thì có bao nhiêu sự kiện có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(MAU.length, 1)} sự kiện có thể xảy ra.</div>
    <div class="b80-ask">b) <span class="tag">Đ, S</span> ?</div>`
    + st.map(s => `<div class="b80-ds"><span>&ndash; ${s.t}</span>${q.pick(s.v, ['Đ', 'S'])}</div>`).join('')
    + `<div class="b80-ask">c) Phải lấy ra ít nhất bao nhiêu viên bi để chắc chắn có
        một viên ${MAU[k].ten}?</div>
      <div class="bullet">Phải lấy ra ít nhất ${q.num(tong - sl[k] + 1, 2)} viên bi.</div>
      <div class="b80-ask">d) Phải lấy ra ít nhất bao nhiêu viên bi để chắc chắn có
        hai viên bi cùng màu?</div>
      <div class="bullet">Phải lấy ra ít nhất ${q.num(MAU.length + 1, 2)} viên bi.</div>
      <div class="hint-line">Ở câu c) và câu d) em hãy nghĩ đến trường hợp không may nhất:
        những viên bi lấy ra lúc đầu đều chưa phải viên bi mà ta mong muốn.</div>`;

  return q.done(html,
    `Trong túi có ${MAU.length} loại bi nên lấy một viên bi thì có ${MAU.length} sự kiện có thể `
    + `xảy ra; không sự kiện nào chắc chắn xảy ra. Trong túi không có viên bi nâu nào nên `
    + `sự kiện lấy được viên bi nâu không thể xảy ra. `
    + `c) Không may nhất là lấy phải tất cả ${tong - sl[k]} viên bi khác màu trước `
    + `(${tong} − ${sl[k]} = ${tong - sl[k]}), viên tiếp theo chắc chắn là ${MAU[k].ten}: `
    + `${tong - sl[k]} + 1 = ${tong - sl[k] + 1} (viên). `
    + `d) Lấy ${MAU.length} viên thì có thể mỗi màu một viên, lấy thêm 1 viên nữa thì viên đó `
    + `phải trùng màu với một viên đã lấy: ${MAU.length} + 1 = ${MAU.length + 1} (viên).`);
},

/* ===== 5. Lấy cùng một lúc 2 quả bóng từ ba loại ===== */
() => {
  const LOAI = b80Mix([
    {ten: 'quả bóng đỏ', m: '#e8443a'}, {ten: 'quả bóng xanh', m: '#3f7ad6'},
    {ten: 'quả bóng vàng', m: '#f6c94a'}, {ten: 'quả bóng xanh lá', m: '#4caf50'}
  ]).slice(0, 3);
  const BAN = pick(['Mai', 'Việt', 'Nam', 'Mi']);
  const mk = () => [R(1, 3), R(1, 3), R(1, 3)];
  const ok = s => {
    const t = s.reduce((a, b) => a + b, 0);
    return t >= 4 && t <= 6 && s.includes(1) && Math.max(...s) >= 2;
  };
  let sl = mk(), g = 0;
  while (g++ < 60 && !ok(sl)) sl = mk();
  if (!ok(sl)) sl = b80Mix([1, 2, 2]);

  const ds = LOAI.map((c, i) => ({ten: c.ten, n: sl[i]}));
  const tong = sl.reduce((s, v) => s + v, 0);
  const kq = b80KQ(ds);
  const moi = b80MoiSK(ds);
  const opts = b80Mix(moi);
  const st = b80DS(kq, moi, BAN, 3);
  const q = Q(5, 'Trong một chiếc hộp có '
    + ds.map(c => `${c.n} ${c.ten}`).join(', ')
    + `. Bạn ${BAN} lấy cùng một lúc 2 quả bóng ra khỏi hộp mà không nhìn vào hộp.`);

  const html = `<div class="b80adv-row">
      ${LOAI.map((c, i) => Array.from({length: sl[i]},
        () => ART.b80advBong(c.m)).join('')).join('')}</div>
    <div class="b80-note">Trong hộp có ${ds.map(c => `${c.n} ${c.ten}`).join(', ')}
      &ndash; tất cả ${tong} quả bóng</div>
    <div class="b80-ask">a) Có bao nhiêu sự kiện có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(kq.length, 2)} sự kiện có thể xảy ra.</div>
    <div class="b80-ask">b) Chọn những sự kiện có thể xảy ra.</div>
    <div class="fill-line b80-wide">${BAN} lấy được: ${q.pick(b80Set(kq), opts)}</div>
    <div class="b80-ask">c) <span class="tag">Đ, S</span> ?</div>`
    + st.map(s => `<div class="b80-ds"><span>&ndash; ${s.t}</span>${q.pick(s.v, ['Đ', 'S'])}</div>`).join('')
    + `<div class="b80-ask">d) Phải lấy ra ít nhất bao nhiêu quả bóng để chắc chắn có
        hai quả bóng cùng màu?</div>
      <div class="bullet">Phải lấy ra ít nhất ${q.num(LOAI.length + 1, 2)} quả bóng.</div>
      <div class="hint-line">Loại bóng nào chỉ có 1 quả thì không thể lấy được 2 quả cùng
        loại đó. Ở câu d) em hãy nghĩ đến trường hợp mỗi lần lấy được một quả khác màu nhau.</div>`;

  return q.done(html,
    `Trong hộp có ${ds.map(c => `${c.n} ${c.ten}`).join(', ')}. Lấy cùng một lúc 2 quả bóng thì `
    + `các sự kiện có thể xảy ra là: ${kq.join('; ')} — tất cả có ${kq.length} sự kiện. `
    + ds.filter(c => c.n < 2).map(c => `Chỉ có 1 ${c.ten} nên không thể lấy được 2 ${c.ten}.`).join(' ')
    + ` d) Lấy ${LOAI.length} quả thì có thể mỗi màu một quả, lấy thêm 1 quả nữa thì chắc chắn `
    + `có hai quả cùng màu: ${LOAI.length} + 1 = ${LOAI.length + 1} (quả).`);
},

/* ===== 6. Rút thẻ ghi số: đếm thẻ, Đ/S và số thẻ ít nhất phải rút ===== */
() => {
  const n = R(9, 15);
  const k = R(4, n - 3);
  const chan = Math.floor(n / 2), le = n - chan;
  const q = Q(6, `Trong một chiếc hộp có ${n} chiếc thẻ, trên mỗi thẻ ghi một số trong các số `
    + `từ 1 đến ${n} (mỗi số chỉ được ghi trên một chiếc thẻ). Rút thẻ ra khỏi hộp mà không `
    + 'nhìn vào hộp.');
  const chanVal = 2 * R(1, chan);
  const ngoai = n + R(1, 4);
  const be = R(2, 4);
  const st = b80Mix([
    {t: `Rút một chiếc thẻ thì chắc chắn rút được thẻ ghi số bé hơn ${n + 1}.`, v: 'Đ'},
    {t: `Rút một chiếc thẻ thì không thể rút được thẻ ghi số ${ngoai}.`, v: 'Đ'},
    {t: 'Rút một chiếc thẻ thì chắc chắn rút được thẻ ghi số chẵn.', v: 'S'},
    {t: `Rút một chiếc thẻ thì có thể rút được thẻ ghi số ${chanVal}.`, v: 'Đ'},
    {t: `Rút một chiếc thẻ thì không thể rút được thẻ ghi số bé hơn ${be}.`, v: 'S'}
  ]).slice(0, 3);

  const html = `<div class="b80adv-cards">
      ${Array.from({length: n}, (x, i) => ART.b80advThe(i + 1)).join('')}</div>
    <div class="b80-note">${n} chiếc thẻ ghi các số từ 1 đến ${n}</div>
    <div class="b80-ask">a) Trong hộp có bao nhiêu thẻ ghi số chẵn, bao nhiêu thẻ ghi số lẻ?</div>
    <div class="bullet">Có ${q.num(chan, 2)} thẻ ghi số chẵn và ${q.num(le, 2)} thẻ ghi số lẻ.</div>
    <div class="b80-ask">b) Trong hộp có bao nhiêu thẻ ghi số lớn hơn ${k}?</div>
    <div class="bullet">Có ${q.num(n - k, 2)} thẻ ghi số lớn hơn ${k}.</div>
    <div class="b80-ask">c) <span class="tag">Đ, S</span> ?</div>`
    + st.map(s => `<div class="b80-ds"><span>&ndash; ${s.t}</span>${q.pick(s.v, ['Đ', 'S'])}</div>`).join('')
    + `<div class="b80-ask">d) Phải rút ra ít nhất bao nhiêu chiếc thẻ để chắc chắn có
        một thẻ ghi số chẵn?</div>
      <div class="bullet">Phải rút ra ít nhất ${q.num(le + 1, 2)} chiếc thẻ.</div>
      <div class="b80-ask">e) Phải rút ra ít nhất bao nhiêu chiếc thẻ để chắc chắn có
        một thẻ ghi số lớn hơn ${k}?</div>
      <div class="bullet">Phải rút ra ít nhất ${q.num(k + 1, 2)} chiếc thẻ.</div>
      <div class="hint-line">Trường hợp không may nhất là em rút phải tất cả những thẻ
        không mong muốn trước, thẻ rút thêm sau đó mới là thẻ cần tìm.</div>`;

  return q.done(html,
    `Từ 1 đến ${n} có ${chan} số chẵn và ${le} số lẻ; các số lớn hơn ${k} là các số từ `
    + `${k + 1} đến ${n}, gồm ${n} − ${k} = ${n - k} số. `
    + `Số ${ngoai} không được ghi trên thẻ nào nên không thể rút được. `
    + `d) Không may nhất là rút phải cả ${le} thẻ ghi số lẻ trước, thẻ tiếp theo chắc chắn ghi `
    + `số chẵn: ${le} + 1 = ${le + 1} (thẻ). `
    + `e) Không may nhất là rút phải cả ${k} thẻ ghi các số từ 1 đến ${k} trước: `
    + `${k} + 1 = ${k + 1} (thẻ).`);
},
];
