/* ===== NÂNG CAO — Bài 74: Khả năng xảy ra của một sự kiện =====
   Dùng lại của phần cơ bản: b74Mix (trộn mảng), b74Set (xếp đáp án chọn nhiều),
   B74_HINH, ART.b74Sym, ART.b74Cube.
   Hàm riêng của phần nâng cao đặt tiền tố b74adv.
   Mọi câu hỏi đều quy về đếm hoặc Đ/S nên đáp án là duy nhất. */

const B74ADV_MAU = [
  {ten: 'xanh', c: '#3fa34d', v: '#1f6b2a'},
  {ten: 'đỏ',   c: '#e8443a', v: '#a5321a'},
  {ten: 'vàng', c: '#f2c11e', v: '#b8860b'},
  {ten: 'tím',  c: '#9b59b6', v: '#6c3483'}
];

/* chọn một chỉ số khác chỉ số đã cho */
const b74advKhac = (k, i0) => {
  let i = R(0, k - 1);
  for (let g = 0; g < 30 && i === i0; g++) i = R(0, k - 1);
  return i;
};

/* ---- hộp bóng nhiều màu: ds = [{ten, c, v, sl}, ...] ---- */
ART.b74advHop = ds => {
  const arr = [];
  ds.forEach(d => { for (let i = 0; i < d.sl; i++) arr.push(d); });
  const f = b74Mix(arr), n = f.length;
  const cot = n > 8 ? Math.ceil(n / 2) : n;
  const hang = Math.ceil(n / cot);
  const W = 40 * cot + 28, H = 46 + 40 * hang;
  return `<svg class="b74adv-art" viewBox="0 0 ${W} ${H}">
    <rect x="4" y="22" width="${W - 8}" height="12" rx="5" fill="#e0a86a" stroke="#a5764a" stroke-width="2.6"/>
    <rect x="9" y="34" width="${W - 18}" height="${40 * hang + 4}" rx="6" fill="#f7d0a4"
      stroke="#a5764a" stroke-width="2.6"/>
    ${f.map((d, i) => {
      const r = Math.floor(i / cot), c = i % cot;
      return `<circle cx="${24 + c * 40}" cy="${56 + r * 40}" r="14.5" fill="${d.c}"
          stroke="${d.v}" stroke-width="2.4"/>
        <circle cx="${19 + c * 40}" cy="${50 + r * 40}" r="4" fill="#fff" opacity=".55"/>`;
    }).join('')}
  </svg>`;
};

/* ---- hộp kín, chỉ biết tổng số bóng ---- */
ART.b74advHopKin = n => `<svg class="b74adv-art" viewBox="0 0 240 132" style="max-width:250px">
  <text x="120" y="20" text-anchor="middle" font-size="15" font-weight="800" fill="#8a5b1f">${n} quả bóng</text>
  <rect x="24" y="32" width="192" height="17" rx="7" fill="#e0a86a" stroke="#a5764a" stroke-width="2.8"/>
  <rect x="32" y="49" width="176" height="72" rx="9" fill="#f7d0a4" stroke="#a5764a" stroke-width="2.8"/>
  <text x="120" y="100" text-anchor="middle" font-size="42" font-weight="800" fill="#a5764a">?</text>
</svg>`;

/* ---- dãy thẻ số ---- */
ART.b74advThe = ns => `<div class="b74adv-the">${
  ns.map(x => `<span class="b74adv-card">${x}</span>`).join('')}</div>`;

ADV.b74 = [

/* ===== 1. Hộp ba màu — lấy 2 quả bóng, đếm các khả năng ===== */
() => {
  const q = Q(1, 'Trong hộp có các quả bóng như hình vẽ. Việt nhắm mắt và lấy ra 2 quả bóng.');
  const ms = b74Mix(B74ADV_MAU).slice(0, 3);
  const ds = ms.map(m => ({ten: m.ten, c: m.c, v: m.v, sl: R(1, 3)}));
  const tong = ds.reduce((s, d) => s + d.sl, 0);

  const kn = [];
  for (let i = 0; i < 3; i++) kn.push({t: `2 quả bóng ${ds[i].ten}`, v: ds[i].sl >= 2});
  for (let i = 0; i < 3; i++)
    for (let j = i + 1; j < 3; j++)
      kn.push({t: `1 quả bóng ${ds[i].ten} và 1 quả bóng ${ds[j].ten}`, v: true});
  const dung = kn.filter(x => x.v).map(x => x.t);
  const opts = b74Mix(kn.map(x => x.t));

  const i0 = R(0, 2), i1 = b74advKhac(3, i0);
  const cc = tong - ds[i0].sl <= 1;                 /* chắc chắn có ít nhất 1 quả màu i0 */
  const kt = ds[i1].sl <= 1;                        /* không thể lấy được 2 quả màu i1  */

  const html = `${ART.b74advHop(ds)}
    <div class="b74adv-box">${ds.map(d =>
      `<div class="b74adv-line">${d.sl} quả bóng ${d.ten}</div>`).join('')}</div>
    <div class="b74-ask">a) Trong hộp có tất cả bao nhiêu quả bóng?</div>
    <div class="bullet">Trong hộp có ${q.num(tong, 2)} quả bóng.</div>
    <div class="b74-ask">b) Khi lấy 2 quả bóng, có bao nhiêu khả năng khác nhau về màu có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(dung.length, 1)} khả năng khác nhau.</div>
    <div class="b74-ask">c) Chọn những khả năng có thể xảy ra.</div>
    <div class="fill-line b74adv-pick">Việt lấy được: ${q.pick(b74Set(dung), opts)}</div>
    <div class="b74-ask">d) <span class="tag">Đ, S</span> ?</div>
    <div class="b74-ds"><span>&ndash; Việt chắc chắn lấy được ít nhất 1 quả bóng ${ds[i0].ten}.</span>${
      q.pick(cc ? 'Đ' : 'S', ['Đ', 'S'])}</div>
    <div class="b74-ds"><span>&ndash; Việt không thể lấy được 2 quả bóng ${ds[i1].ten}.</span>${
      q.pick(kt ? 'Đ' : 'S', ['Đ', 'S'])}</div>
    <div class="hint-line">Muốn lấy được 2 quả bóng cùng một màu thì hộp phải có ít nhất
      2 quả bóng màu đó.</div>`;

  return q.done(html,
    `Trong hộp có ${ds.map(d => d.sl + ' quả ' + d.ten).join(', ')}, tất cả là ${tong} quả bóng. `
    + `Các khả năng có thể xảy ra là: ${dung.join('; ')} — có ${dung.length} khả năng. `
    + `Ngoài bóng ${ds[i0].ten} thì hộp còn ${tong - ds[i0].sl} quả bóng khác màu, `
    + `${cc ? 'không đủ 2 quả nên lấy 2 quả thì chắc chắn có bóng ' + ds[i0].ten
           : 'đủ 2 quả nên có thể lấy được 2 quả đều không phải bóng ' + ds[i0].ten}: `
    + `câu thứ nhất là ${cc ? 'Đ' : 'S'}. `
    + `Hộp chỉ có ${ds[i1].sl} quả bóng ${ds[i1].ten} nên câu thứ hai là ${kt ? 'Đ' : 'S'}.`);
},

/* ===== 2. Lấy ít nhất bao nhiêu quả để chắc chắn xảy ra sự kiện ===== */
() => {
  const q = Q(2, '');
  const ms = b74Mix(B74ADV_MAU).slice(0, 2);
  const x = R(5, 8), y = R(3, x - 1);          /* màu A luôn nhiều bóng hơn màu B */
  const ds = [{ten: ms[0].ten, c: ms[0].c, v: ms[0].v, sl: x},
              {ten: ms[1].ten, c: ms[1].c, v: ms[1].v, sl: y}];
  const A = ms[0].ten, B = ms[1].ten;

  const html = `<p class="wordq">Trong hộp có ${x + y} quả bóng: ${x} quả bóng ${A} và
      ${y} quả bóng ${B}. Nam nhắm mắt và lấy bóng ra khỏi hộp.</p>
    ${ART.b74advHop(ds)}
    <div class="b74-ask">a) Nam phải lấy ra ít nhất bao nhiêu quả bóng để chắc chắn có
      1 quả bóng ${A}?</div>
    <div class="bullet">Ít nhất ${q.num(y + 1, 1)} quả bóng.</div>
    <div class="b74-ask">b) Nam phải lấy ra ít nhất bao nhiêu quả bóng để chắc chắn có
      2 quả bóng cùng màu?</div>
    <div class="bullet">Ít nhất ${q.num(3, 1)} quả bóng.</div>
    <div class="b74-ask">c) Nam phải lấy ra ít nhất bao nhiêu quả bóng để chắc chắn có
      cả bóng ${A} và bóng ${B}?</div>
    <div class="bullet">Ít nhất ${q.num(x + 1, 1)} quả bóng.</div>
    <div class="hint-line">Hãy nghĩ đến trường hợp không may nhất: Nam lấy mãi mà vẫn chưa
      được quả bóng cần tìm.</div>`;

  return q.done(html,
    `a) Không may nhất là Nam lấy hết ${y} quả bóng ${B} trước, quả tiếp theo chắc chắn là `
    + `bóng ${A}, nên cần ${y} + 1 = ${y + 1} (quả). `
    + `b) Hộp chỉ có 2 màu: lấy 2 quả có thể mỗi màu một quả, lấy quả thứ ba thì chắc chắn `
    + `có 2 quả cùng màu, nên cần 3 quả. `
    + `c) Không may nhất là Nam lấy hết ${x} quả bóng ${A} trước, quả tiếp theo mới là bóng ${B}, `
    + `nên cần ${x} + 1 = ${x + 1} (quả).`);
},

/* ===== 3. Sửa xúc xắc để một sự kiện trở thành chắc chắn / không thể ===== */
() => {
  const q = Q(3, 'Mai có một xúc xắc tự làm. Khi quan sát từ hai hướng ta thấy 6 mặt của xúc xắc đó '
    + 'như hình vẽ dưới đây.');
  const sl = pick([[4, 2], [3, 3], [5, 1], [3, 2, 1], [2, 2, 2], [4, 1, 1], [2, 2, 1, 1], [3, 1, 1, 1]]);
  const k = sl.length;
  const loai = b74Mix(B74_HINH).slice(0, k);
  const mat = [];
  loai.forEach((h, i) => { for (let j = 0; j < sl[i]; j++) mat.push(h); });
  const f = b74Mix(mat);
  const i0 = R(0, k - 1), i1 = b74advKhac(k, i0);

  const html = `<div class="b74-row">${ART.b74Cube(f[0], f[1], f[2])}
      ${ART.b74Cube(f[3], f[4], f[5])}</div>
    <p class="wordq">Mai gieo xúc xắc đó một lần rồi quan sát mặt trên của xúc xắc.</p>
    <div class="b74-ask">a) Xúc xắc đó có bao nhiêu mặt vẽ ${loai[i0]}?</div>
    <div class="bullet">Có ${q.num(sl[i0], 1)} mặt vẽ ${loai[i0]}.</div>
    <div class="b74-ask">b) Khi gieo xúc xắc đó một lần, có bao nhiêu sự kiện khác nhau
      có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(k, 1)} sự kiện khác nhau.</div>
    <div class="b74-ask">c) Muốn sự kiện &laquo;Mặt trên có vẽ ${loai[i0]}&raquo; chắc chắn xảy ra
      thì Mai phải vẽ lại các mặt còn lại thành ${loai[i0]}. Khi đó Mai phải vẽ thêm
      ${loai[i0]} vào bao nhiêu mặt?</div>
    <div class="bullet">Phải vẽ thêm vào ${q.num(6 - sl[i0], 1)} mặt.</div>
    <div class="b74-ask">d) Muốn sự kiện &laquo;Mặt trên có vẽ ${loai[i1]}&raquo; không thể xảy ra
      thì Mai phải xoá ${loai[i1]} ở bao nhiêu mặt?</div>
    <div class="bullet">Phải xoá ở ${q.num(sl[i1], 1)} mặt.</div>
    <div class="hint-line">Xúc xắc luôn có 6 mặt. Một sự kiện chắc chắn xảy ra khi cả 6 mặt
      đều thoả mãn; một sự kiện không thể xảy ra khi không mặt nào thoả mãn.</div>`;

  return q.done(html,
    `Xúc xắc có ${loai.map((h, i) => sl[i] + ' mặt vẽ ' + h).join(', ')}. `
    + `Có ${k} hình khác nhau nên khi gieo một lần có ${k} sự kiện khác nhau có thể xảy ra. `
    + `c) Muốn chắc chắn được mặt vẽ ${loai[i0]} thì cả 6 mặt đều phải vẽ ${loai[i0]}; `
    + `mà đã có ${sl[i0]} mặt rồi nên phải vẽ thêm 6 − ${sl[i0]} = ${6 - sl[i0]} (mặt). `
    + `d) Muốn không thể được mặt vẽ ${loai[i1]} thì không mặt nào được vẽ ${loai[i1]}, `
    + `nên phải xoá ở cả ${sl[i1]} mặt.`);
},

/* ===== 4. Rút một tấm thẻ số ===== */
() => {
  const q = Q(4, 'Trên bàn có các tấm thẻ ghi số như sau. Rô-bốt úp tất cả các thẻ xuống, '
    + 'xáo trộn rồi rút ra một tấm thẻ.');
  const n = R(5, 6);
  const ns = [];
  for (let g = 0; g < 300 && ns.length < n; g++){
    const z = R(11, 99);
    if (!ns.includes(z)) ns.push(z);
  }
  for (let z = 11; ns.length < n && z < 100; z++) if (!ns.includes(z)) ns.push(z);
  ns.sort((a, b) => a - b);
  const mn = ns[0], mx = ns[ns.length - 1];
  const chan = ns.filter(z => z % 2 === 0).length;
  const T = pick([mn, mx, R(mn, mx), Math.max(2, mn - R(1, 6)), mx + R(1, 6)]);
  const lonT = ns.filter(z => z > T).length;
  const cs = pick([2, 3]);

  const st = b74Mix([
    {t: `Chắc chắn rút được thẻ ghi số lớn hơn ${T}.`, v: ns.every(z => z > T)},
    {t: `Có thể rút được thẻ ghi số bé hơn ${T}.`,     v: ns.some(z => z < T)},
    {t: `Không thể rút được thẻ ghi số chẵn.`,         v: chan === 0},
    {t: `Chắc chắn rút được thẻ ghi số có ${cs} chữ số.`, v: ns.every(z => String(z).length === cs)},
    {t: `Không thể rút được thẻ ghi số tròn chục.`,    v: ns.every(z => z % 10 !== 0)}
  ]).slice(0, 3);

  const html = `${ART.b74advThe(b74Mix(ns))}
    <div class="b74-ask">a) Khi rút một tấm thẻ, có bao nhiêu sự kiện khác nhau có thể xảy ra?</div>
    <div class="bullet">Có ${q.num(n, 1)} sự kiện khác nhau.</div>
    <div class="b74-ask">b) Trong các thẻ đó có bao nhiêu thẻ ghi số chẵn?</div>
    <div class="bullet">Có ${q.num(chan, 1)} thẻ ghi số chẵn.</div>
    <div class="b74-ask">c) Có bao nhiêu thẻ ghi số lớn hơn ${T}? Số bé nhất ghi trên các thẻ là số nào?</div>
    <div class="bullet">Có ${q.num(lonT, 1)} thẻ ghi số lớn hơn ${T}.</div>
    <div class="bullet">Số bé nhất ghi trên các thẻ là ${q.num(mn, 2)}.</div>
    <div class="b74-ask">d) <span class="tag">Đ, S</span> ?</div>`
    + st.map(s => `<div class="b74-ds"><span>&ndash; ${s.t}</span>${
      q.pick(s.v ? 'Đ' : 'S', ['Đ', 'S'])}</div>`).join('')
    + `<div class="hint-line">Sự kiện chắc chắn xảy ra khi mọi tấm thẻ đều thoả mãn; sự kiện
      không thể xảy ra khi không có tấm thẻ nào thoả mãn.</div>`;

  return q.done(html,
    `Các thẻ ghi số: ${ns.join(', ')}. Mỗi thẻ là một sự kiện nên có ${n} sự kiện khác nhau. `
    + `Số chẵn: ${chan} thẻ. Số lớn hơn ${T}: ${lonT} thẻ. Số bé nhất là ${mn}, số lớn nhất là ${mx}. `
    + `Dựa vào đó ba câu lần lượt là: ` + st.map(s => s.v ? 'Đ' : 'S').join('; ') + '.');
},

/* ===== 5. Bài toán ngược: từ loại sự kiện tìm số bóng trong hộp ===== */
() => {
  const q = Q(5, '');
  const N = R(7, 15);
  const ms = b74Mix(B74ADV_MAU).slice(0, 2);
  const A = ms[0].ten, B = ms[1].ten;

  const html = `<p class="wordq">Trong một chiếc hộp kín có tất cả ${N} quả bóng. Mỗi quả bóng
      có màu ${A} hoặc màu ${B}. Nam nhắm mắt và lấy ra 1 quả bóng.</p>
    ${ART.b74advHopKin(N)}
    <div class="b74-ask">a) Nếu sự kiện &laquo;Nam lấy được quả bóng ${A}&raquo;
      chắc chắn xảy ra thì trong hộp có bao nhiêu quả bóng mỗi màu?</div>
    <div class="bullet">Có ${q.num(N, 2)} quả bóng ${A} và ${q.num(0, 1)} quả bóng ${B}.</div>
    <div class="b74-ask">b) Nếu sự kiện &laquo;Nam lấy được quả bóng ${A}&raquo;
      không thể xảy ra thì trong hộp có bao nhiêu quả bóng ${A}?</div>
    <div class="bullet">Có ${q.num(0, 1)} quả bóng ${A}.</div>
    <div class="b74-ask">c) Nếu sự kiện &laquo;Nam lấy được quả bóng ${A}&raquo; có thể xảy ra
      nhưng không chắc chắn xảy ra thì trong hộp có ít nhất bao nhiêu quả bóng ${A}
      và nhiều nhất bao nhiêu quả bóng ${A}?</div>
    <div class="bullet">Có ít nhất ${q.num(1, 1)} quả bóng ${A}.</div>
    <div class="bullet">Có nhiều nhất ${q.num(N - 1, 2)} quả bóng ${A}.</div>
    <div class="hint-line">Sự kiện có thể xảy ra nhưng không chắc chắn xảy ra nghĩa là trong hộp
      có cả bóng ${A} và bóng ${B}.</div>`;

  return q.done(html,
    `a) Chắc chắn lấy được bóng ${A} nghĩa là mọi quả bóng đều màu ${A}, nên có ${N} quả bóng ${A} `
    + `và 0 quả bóng ${B}. `
    + `b) Không thể lấy được bóng ${A} nghĩa là trong hộp không có quả bóng ${A} nào, tức là 0 quả. `
    + `c) Vừa có thể lấy được bóng ${A} vừa có thể lấy được bóng ${B} nên mỗi màu có ít nhất 1 quả: `
    + `số bóng ${A} ít nhất là 1 và nhiều nhất là ${N} − 1 = ${N - 1} (quả).`);
},
];
