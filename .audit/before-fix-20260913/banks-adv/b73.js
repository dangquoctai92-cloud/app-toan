/*CSS
.b73adv-clue{background:#fff3e0;border:2.5px solid #e8bd72;border-radius:12px;padding:6px 12px;margin:8px 0}
.b73adv-clue .bullet{justify-content:flex-start;color:#7a4b12;line-height:1.95}
.b73adv-clue b{color:#b3541e}
.b73adv-legend{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:5px 16px;
  font-size:15px;font-weight:700;color:#37474f;margin:5px 0 2px}
.b73adv-legend span.sw{display:inline-block;width:16px;height:16px;border-radius:4px;vertical-align:-3px;margin-right:5px}
CSS*/

/* ===== NÂNG CAO — BÀI 73: THU THẬP, PHÂN LOẠI, GHI CHÉP SỐ LIỆU. BẢNG SỐ LIỆU =====
   Dùng lại các hàm của phần cơ bản trong cùng bài: ART.b73Tally, ART.b73Tbl1,
   ART.b73Tbl2 và b73Set. Hàm riêng của phần nâng cao đặt tiền tố b73adv.
   Phạm vi kiến thức: đọc bảng số liệu, cộng trừ trong phạm vi 1 000,
   nhân/chia số có hai, ba chữ số với số có một chữ số, gấp một số lên nhiều lần. */

/* trộn mảng bằng R(), không dùng Math.random trực tiếp */
const b73advMix = a => {
  const s = a.slice();
  for (let i = s.length - 1; i > 0; i--){ const j = R(0, i); const t = s[i]; s[i] = s[j]; s[j] = t; }
  return s;
};
const b73advTong = a => a.reduce((x, y) => x + y, 0);
const b73advDuyNhat = (a, v) => a.filter(x => x === v).length === 1;

/* hình có màu dùng cho bài phân loại theo hai tiêu chí */
ART.b73advShape = (kind, mau) => {
  const f = mau === 'đỏ' ? '#ef5350' : '#42a5f5';
  const s = mau === 'đỏ' ? '#a02b26' : '#12578f';
  if (kind === 'Hình tròn') return `<svg class="b73-sh" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="16" fill="${f}" stroke="${s}" stroke-width="2.4"/></svg>`;
  if (kind === 'Hình tam giác') return `<svg class="b73-sh" viewBox="0 0 40 40">
    <path d="M20 4L36 34H4z" fill="${f}" stroke="${s}" stroke-width="2.4" stroke-linejoin="round"/></svg>`;
  return `<svg class="b73-sh" viewBox="0 0 40 40">
    <rect x="5" y="5" width="30" height="30" rx="3" fill="${f}" stroke="${s}" stroke-width="2.4"/></svg>`;
};

ADV.b73 = [

/* ===== 1. Vạch kiểm: đọc số liệu rồi tính tổng, hiệu, gộp nhóm ===== */
() => {
  const q = Q(1, 'Các bạn khối lớp 3 đăng kí tham gia câu lạc bộ thể thao. Số bạn đăng kí '
    + 'mỗi câu lạc bộ được ghi lại bằng vạch kiểm như sau:');
  const POOL = ['Bóng đá', 'Cầu lông', 'Bơi lội', 'Cờ vua', 'Bóng rổ', 'Đá cầu'];
  const ten = b73advMix(POOL).slice(0, 4);
  /* bốn khoảng rời nhau nên bốn số luôn khác nhau, lớn nhất và bé nhất là duy nhất */
  const sl = b73advMix([R(6, 9), R(12, 16), R(18, 23), R(26, 32)]);
  const tong = b73advTong(sl);
  const mx = Math.max(...sl), mn = Math.min(...sl);
  const nhieu = ten[sl.indexOf(mx)], it = ten[sl.indexOf(mn)];
  const i1 = R(0, 3);
  const i2 = (i1 + 1 + R(0, 2)) % 4;
  const hon20 = ten.filter((_, i) => sl[i] > 20);

  const box = '<div class="b73-box">' + ten.map((t, i) =>
      `<div class="r"><span class="nm">${t}:</span><span>${ART.b73Tally(sl[i])}</span></div>`).join('')
    + '</div>';
  const html = box
    + '<div class="note">Mỗi vạch là một bạn. Mỗi nhóm vạch kiểm là 5 bạn.</div>'
    + '<div class="b73-ask">a) Mỗi câu lạc bộ có bao nhiêu bạn đăng kí?</div>'
    + ten.map((t, i) => `<div class="bullet">${t}: ${q.num(sl[i])} bạn.</div>`).join('')
    + '<div class="b73-ask">b) Cả bốn câu lạc bộ có tất cả bao nhiêu bạn đăng kí?</div>'
    + `<div class="bullet">Cả bốn câu lạc bộ có ${q.num(tong)} bạn.</div>`
    + '<div class="b73-ask">c) Câu lạc bộ có nhiều bạn nhất hơn câu lạc bộ có ít bạn nhất '
    + 'bao nhiêu bạn?</div>'
    + `<div class="fill-line b73-wide">Nhiều bạn nhất: ${q.pick(nhieu, ten)}</div>
       <div class="fill-line b73-wide">Ít bạn nhất: ${q.pick(it, ten)}</div>`
    + `<div class="bullet">Nhiều hơn ${q.num(mx - mn)} bạn.</div>`
    + `<div class="b73-ask">d) Hai câu lạc bộ ${ten[i1]} và ${ten[i2]} có tất cả bao nhiêu bạn?</div>`
    + `<div class="bullet">Có tất cả ${q.num(sl[i1] + sl[i2])} bạn.</div>`
    + '<div class="b73-ask">e) Những câu lạc bộ nào có nhiều hơn 20 bạn đăng kí?</div>'
    + `<div class="fill-line b73-wide">${q.pick(b73Set(hon20), ten)}</div>`;
  return q.done(html,
    ten.map((t, i) => `${t}: ${sl[i]} bạn`).join(';  ')
    + `. Tất cả: ${sl.join(' + ')} = ${tong} (bạn). `
    + `${mx} − ${mn} = ${mx - mn} (bạn). `
    + `${ten[i1]} và ${ten[i2]}: ${sl[i1]} + ${sl[i2]} = ${sl[i1] + sl[i2]} (bạn). `
    + `Các số lớn hơn 20 là ${sl.filter(v => v > 20).join(', ')}.`);
},

/* ===== 2. Hoàn thành bảng hai chiều có thêm cột tổng "Cả khối" ===== */
() => {
  const q = Q(2, 'Hoàn thành bảng số liệu về số học sinh khối lớp 3 của một trường tiểu học, '
    + 'biết số ở cột "Cả khối" là tổng số học sinh của cả ba lớp.');
  const LOP = ['3A', '3B', '3C'];
  let nam = [], nu = [], ca = [], tNam = 0, tNu = 0;
  for (let i = 0; i < 40; i++){
    nam = [R(14, 20), R(14, 20), R(14, 20)];
    nu  = [R(13, 21), R(13, 21), R(13, 21)];
    ca = LOP.map((_, j) => nam[j] + nu[j]);
    tNam = b73advTong(nam);
    tNu  = b73advTong(nu);
    if (b73advDuyNhat(ca, Math.max(...ca)) && tNam !== tNu) break;
  }
  const tong = tNam + tNu;
  const dong = LOP[ca.indexOf(Math.max(...ca))];
  const dau = tNam > tNu ? '>' : '<';
  const hieu = Math.abs(tNam - tNu);
  const k = R(0, 2);                       /* lớp bị che ô "Nam", bù lại cho sẵn ô "Cả lớp" */

  const hangNam = ['Nam', ...LOP.map((_, i) => i === k ? q.num(nam[i]) : nam[i]), q.num(tNam)];
  const hangNu  = ['Nữ', ...nu, q.num(tNu)];
  const hangCa  = ['Cả lớp', ...LOP.map((_, i) => i === k ? ca[i] : q.num(ca[i])), q.num(tong)];

  const html = ART.b73Tbl2('Lớp', 'Số học sinh', [...LOP, 'Cả khối'], [hangNam, hangNu, hangCa])
    + '<div class="b73-ask">b) Dựa vào bảng số liệu vừa hoàn thành, trả lời câu hỏi:</div>'
    + '<div class="b73-sub">&ndash; Lớp nào có nhiều học sinh nhất?</div>'
    + `<div class="fill-line b73-wide">${q.pick(dong, LOP)}</div>`
    + '<div class="b73-sub">&ndash; So sánh số học sinh nam và số học sinh nữ của cả khối lớp 3.</div>'
    + `<div class="cmp-row"><span class="side">Số học sinh nam</span>${q.sign(dau)}<span class="side">Số học sinh nữ</span></div>`
    + '<div class="b73-sub">&ndash; Số học sinh nam và số học sinh nữ của cả khối chênh lệch nhau '
    + 'bao nhiêu bạn?</div>'
    + `<div class="bullet">Chênh lệch ${q.num(hieu)} bạn.</div>`
    + `<div class="hint-line">Lớp ${LOP[k]} đã cho biết số học sinh cả lớp, em lấy số học sinh
        cả lớp trừ đi số học sinh nữ thì được số học sinh nam. Chạm vào ô dấu để đổi
        &gt; &lt; = .</div>`;
  return q.done(html,
    `Lớp ${LOP[k]}: nam = ${ca[k]} − ${nu[k]} = ${nam[k]} (bạn). `
    + `Cả lớp: ${LOP.map((l, i) => l + ' có ' + nam[i] + ' + ' + nu[i] + ' = ' + ca[i]).join('; ')} (bạn). `
    + `Cả khối: nam ${nam.join(' + ')} = ${tNam}; nữ ${nu.join(' + ')} = ${tNu}; `
    + `tất cả ${tNam} + ${tNu} = ${tong} (bạn). `
    + `${tNam} ${dau} ${tNu}, chênh lệch ${hieu} bạn.`);
},

/* ===== 3. Phân loại theo hai tiêu chí: dạng hình và màu sắc ===== */
() => {
  const q = Q(3, 'Quan sát các hình dưới đây rồi phân loại theo cả hai tiêu chí: '
    + 'dạng hình và màu sắc.');
  const KIND = ['Hình tròn', 'Hình tam giác', 'Hình vuông'];
  let d = [], x = [], cot = [], tD = 0, tX = 0;
  for (let i = 0; i < 40; i++){
    d = [R(1, 5), R(1, 5), R(1, 5)];
    x = [R(1, 5), R(1, 5), R(1, 5)];
    cot = KIND.map((_, j) => d[j] + x[j]);
    tD = b73advTong(d);
    tX = b73advTong(x);
    if (b73advDuyNhat(cot, Math.max(...cot)) && tD !== tX) break;
  }
  const tong = tD + tX;
  const nhieu = KIND[cot.indexOf(Math.max(...cot))];
  const dau = tD > tX ? '>' : '<';

  const hinh = [];
  KIND.forEach((k, j) => {
    for (let m = 0; m < d[j]; m++) hinh.push([k, 'đỏ']);
    for (let m = 0; m < x[j]; m++) hinh.push([k, 'xanh']);
  });

  const html = '<div class="b73-shapes">'
      + b73advMix(hinh).map(h => ART.b73advShape(h[0], h[1])).join('') + '</div>'
    + '<div class="b73adv-legend"><span><span class="sw" style="background:#ef5350"></span>Màu đỏ</span>'
      + '<span><span class="sw" style="background:#42a5f5"></span>Màu xanh</span></div>'
    + '<div class="b73-ask">a) Đếm rồi hoàn thành bảng số liệu sau.</div>'
    + ART.b73Tbl2('Dạng hình', 'Màu sắc', [...KIND, 'Tổng'], [
        ['Màu đỏ', ...d.map(v => q.num(v)), q.num(tD)],
        ['Màu xanh', ...x.map(v => q.num(v)), q.num(tX)]
      ])
    + '<div class="b73-ask">b) Có tất cả bao nhiêu hình?</div>'
    + `<div class="bullet">Có tất cả ${q.num(tong)} hình.</div>`
    + '<div class="b73-ask">c) Tính cả hai màu thì dạng hình nào có nhiều nhất?</div>'
    + `<div class="fill-line b73-wide">${q.pick(nhieu, KIND)}</div>`
    + '<div class="b73-ask">d) So sánh số hình màu đỏ và số hình màu xanh.</div>'
    + `<div class="cmp-row"><span class="side">Số hình màu đỏ</span>${q.sign(dau)}<span class="side">Số hình màu xanh</span></div>`
    + '<div class="hint-line">Mỗi hình vừa có một dạng hình vừa có một màu, nên mỗi hình '
    + 'chỉ được đếm vào đúng một ô của bảng. Chạm vào ô dấu để đổi &gt; &lt; = .</div>';
  return q.done(html,
    KIND.map((k, j) => `${k.toLowerCase()}: đỏ ${d[j]}, xanh ${x[j]}, cả hai màu ${cot[j]}`).join('; ')
    + `. Màu đỏ: ${d.join(' + ')} = ${tD}; màu xanh: ${x.join(' + ')} = ${tX}. `
    + `Tất cả ${tD} + ${tX} = ${tong} (hình). `
    + `Số lớn nhất ở hàng "Tổng theo dạng hình" là ${Math.max(...cot)} nên ${nhieu.toLowerCase()} nhiều nhất.`);
},

/* ===== 4. Từ bảng số liệu, dùng phép nhân và phép chia ===== */
() => {
  const k = pick([4, 5, 6, 8]);
  const q = Q(4, `Bảng dưới đây ghi số bút chì mà một xưởng đóng gói được trong bốn ngày. `
    + `Cứ ${k} chiếc bút chì thì xếp đầy một hộp.`);
  let hop = [];
  for (let i = 0; i < 40; i++){
    hop = [R(12, 25), R(12, 25), R(12, 25), R(12, 25)];
    if (b73advDuyNhat(hop, Math.max(...hop))) break;
  }
  const sl = hop.map(v => v * k);
  const tongHop = b73advTong(hop);
  const tongBut = tongHop * k;
  const NGAY = ['Ngày 1', 'Ngày 2', 'Ngày 3', 'Ngày 4'];
  const nhat = NGAY[hop.indexOf(Math.max(...hop))];

  const html = ART.b73Tbl2('Ngày', 'Số lượng', ['1', '2', '3', '4'], [
      ['Số bút chì (chiếc)', ...sl],
      ['Số hộp (hộp)', ...hop.map(v => q.num(v))]
    ])
    + '<div class="b73-ask">a) Mỗi ngày xưởng xếp được bao nhiêu hộp bút chì? '
    + '(Viết vào hàng thứ hai của bảng.)</div>'
    + '<div class="b73-ask">b) Cả bốn ngày xưởng đóng gói được bao nhiêu chiếc bút chì?</div>'
    + `<div class="bullet">Cả bốn ngày được ${q.num(tongBut)} chiếc bút chì.</div>`
    + '<div class="b73-ask">c) Cả bốn ngày xưởng xếp được bao nhiêu hộp bút chì?</div>'
    + `<div class="bullet">Cả bốn ngày xếp được ${q.num(tongHop)} hộp.</div>`
    + '<div class="b73-ask">d) Ngày nào xưởng xếp được nhiều hộp bút chì nhất?</div>'
    + `<div class="fill-line b73-wide">${q.pick(nhat, NGAY)}</div>`
    + `<div class="hint-line">Muốn tìm số hộp, em lấy số bút chì chia cho ${k}.
        Ở câu c) em có thể cộng số hộp của bốn ngày, hoặc lấy tổng số bút chì chia cho ${k}.</div>`;
  return q.done(html,
    NGAY.map((n, i) => `${n}: ${sl[i]} : ${k} = ${hop[i]} (hộp)`).join('; ')
    + `. Tổng số bút chì: ${sl.join(' + ')} = ${tongBut} (chiếc). `
    + `Tổng số hộp: ${hop.join(' + ')} = ${tongHop} (hộp). `
    + `Số hộp lớn nhất là ${Math.max(...hop)} nên ${nhat.toLowerCase()} xếp được nhiều hộp nhất.`);
},

/* ===== 5. Suy luận từ dữ kiện để lập bảng số liệu ===== */
() => {
  const ten = b73advMix(['Việt', 'Mai', 'Nam', 'Rô-bốt']);
  const q = Q(5, 'Bốn bạn cùng sưu tầm tem. Dựa vào các dữ kiện dưới đây, '
    + 'hãy lập bảng số liệu rồi trả lời câu hỏi.');
  let X = 0, them = 0, gap = 0, bot = 0, v = [];
  for (let i = 0; i < 60; i++){
    X = R(8, 15); them = R(3, 9); gap = R(2, 4); bot = R(2, 7);
    v = [X, X + them, gap * X, gap * X - bot];
    if (new Set(v).size === 4) break;
  }
  const tong = b73advTong(v);
  const mx = Math.max(...v), mn = Math.min(...v);
  const nhat = ten[v.indexOf(mx)], it = ten[v.indexOf(mn)];

  const html = `<div class="b73adv-clue">
      <div class="bullet"><b>&bull;</b>${ten[0]} sưu tầm được ${X} con tem.</div>
      <div class="bullet"><b>&bull;</b>${ten[1]} sưu tầm được nhiều hơn ${ten[0]} ${them} con tem.</div>
      <div class="bullet"><b>&bull;</b>${ten[2]} sưu tầm được gấp ${gap} lần số tem của ${ten[0]}.</div>
      <div class="bullet"><b>&bull;</b>${ten[3]} sưu tầm được ít hơn ${ten[2]} ${bot} con tem.</div>
    </div>`
    + '<div class="b73-ask">a) Hoàn thành bảng số liệu sau.</div>'
    + ART.b73Tbl1('Bạn', ten, 'Số con tem (con)', v.map(t => q.num(t)))
    + '<div class="b73-ask">b) Bạn nào sưu tầm được nhiều tem nhất? '
    + 'Bạn nào sưu tầm được ít tem nhất?</div>'
    + `<div class="fill-line b73-wide">Nhiều nhất: ${q.pick(nhat, ten)}</div>
       <div class="fill-line b73-wide">Ít nhất: ${q.pick(it, ten)}</div>`
    + '<div class="b73-ask">c) Cả bốn bạn sưu tầm được bao nhiêu con tem?</div>'
    + `<div class="bullet">Cả bốn bạn sưu tầm được ${q.num(tong)} con tem.</div>`
    + '<div class="b73-ask">d) Bạn sưu tầm được nhiều tem nhất hơn bạn sưu tầm được '
    + 'ít tem nhất bao nhiêu con tem?</div>'
    + `<div class="bullet">Nhiều hơn ${q.num(mx - mn)} con tem.</div>`
    + `<div class="hint-line">Em tính lần lượt theo thứ tự các dữ kiện: biết số tem của ${ten[0]}
        thì tìm được số tem của ${ten[1]} và ${ten[2]}, biết số tem của ${ten[2]}
        thì tìm được số tem của ${ten[3]}.</div>`;
  return q.done(html,
    `${ten[0]}: ${X} con. ${ten[1]}: ${X} + ${them} = ${X + them} (con). `
    + `${ten[2]}: ${X} × ${gap} = ${gap * X} (con). `
    + `${ten[3]}: ${gap * X} − ${bot} = ${gap * X - bot} (con). `
    + `Cả bốn bạn: ${v.join(' + ')} = ${tong} (con). `
    + `${mx} − ${mn} = ${mx - mn} (con).`);
},
];
