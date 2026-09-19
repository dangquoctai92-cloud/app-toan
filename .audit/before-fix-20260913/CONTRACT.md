# Hợp đồng viết ngân hàng bài tập — App Toán 3 (SGK Kết nối tri thức)

## Nguồn sách
Ảnh scan đã tách sẵn, mỗi **trang sách = 3 dải ảnh liên tiếp**:
- Tập 1: `G:/My Drive/App toán/.sgk/t1/pNNN.jpg` — trang sách P = dải `3P-2, 3P-1, 3P`
- Tập 2: `G:/My Drive/App toán/.sgk/t2/pNNN.jpg` — trang sách P = dải `3P-2, 3P-1, 3P`

Ví dụ: trang 10 tập 1 = `t1/p028.jpg`, `t1/p029.jpg`, `t1/p030.jpg`.

Số trang được giao có thể **lệch 1 trang** so với thực tế. Hãy dò dòng tiêu đề "Bài N" trên nền cờ tím
để xác định đúng vị trí, rồi đọc đủ mọi trang của bài.

## Việc phải làm cho mỗi bài học
Đọc hết các trang của bài, rồi viết **tất cả bài tập được đánh số** trong phần
`hoạt động` và `luyện tập` (bỏ phần lý thuyết `khám phá`), **theo đúng thứ tự sách**.

Ghi ra file: `G:/My Drive/App toán/.sgk/banks/bNN.js` (NN = số bài, ví dụ `b7.js`):

```js
BANKS.b7 = [
() => {                                   // ① bài tập số 1 trong sách
  const q = Q(1, 'Tính nhẩm.');           // Q(số hiệu bài tập, lệnh HTML)
  const a = R(2, 9), b = R(2, 9);
  return q.done(`<div class="calc-grid">
      <div class="calc-cell">${a} × ${b} = ${q.num(a*b)}</div>
    </div>`, `${a} × ${b} = ${a*b}`);      // tham số 2 = lời giải ngắn (tuỳ chọn)
},
() => { ... },                             // ② bài tập số 2
];
```

## API có sẵn (KHÔNG được định nghĩa lại)
- `Q(no, cmd)` → `{ num, txt, sign, pick, done }`
  - `q.num(dapAn, len?)` → ô nhập số
  - `q.txt(n)` → ô nhập **chữ** đọc số n (chấp nhận mốt/một, tư/bốn, lăm/năm, linh/lẻ) — chỉ đúng với n ≤ 1 000
  - `q.sign('>')` → ô dấu, chạm để đổi `>` `<` `=`
  - `q.pick('A,C', ['A','B','C','D','E'])` → chọn nhiều đáp án
  - `q.done(bodyHTML, loiGiai?)` → trả về object bài tập
- Tiện ích: `R(a,b)`, `pick(mảng)`, `nf(n)`, `readNum(n)` (≤ 1 000), `sumForm(n)`, `blocks(tram,chuc,donvi)`,
  `table(cls,[tiêu đề],[[ô,…]])`, `noteBox(html)`, `speech(text)`, `ruler([nhãn], chỉSốÔTrống)`,
  `chain([giá trị],'pill|round|dia')`, `ART.*`, `BOX_COLORS`.
- Cần hàm riêng (ví dụ đọc số 4–5 chữ số) thì tự định nghĩa **bên trong file của mình** với tên riêng
  (ví dụ `function readNum4(n){...}`), không đè tên hàm chung.

## Lớp CSS dùng lại
`tbl` + `amber|green|pink|blue`, `tbl-wrap`, `two-tbl`, `two-col`, `sub-lbl`, `eq`/`eq-list`/`op`, `note`,
`fill-line`, `wordq`, `bullet`, `chain`+`cnode`, `ruler`+`rk`, `calc-grid`+`calc-cell`,
`vrow`+`vcalc`(`vop`,`vnums`,`vbar`,`vres`), `vsample`, `jar-row`, `picker`/`pk`, `flow`/`fnode`/`farrow`,
`art-row`, `hint-line`, `given-nums`, `cmp-row`/`side`, `maze`/`maze-cell`, `easel-row`/`easel`.

CSS mới đặt ở **đầu file** trong khối:
```
/*CSS
.ten-lop{...}
CSS*/
```

## Luật bắt buộc
1. **Số liệu ngẫu nhiên mỗi lần mở**, KHÔNG chép nguyên số của sách; giữ nguyên **dạng bài, lệnh, bố cục, tranh minh hoạ**.
2. Mọi ô `?` của sách phải thành ô điền. Dòng mẫu sách cho sẵn thì giữ nguyên đã điền.
3. Đáp án **xác định và đúng tuyệt đối**: không trừ ra số âm, không chia lẻ, câu chọn nhiều chỉ một tập đáp án đúng.
4. Không `Math.random()` trực tiếp cho đáp án — dùng `R()`/`pick()` rồi TÍNH ra đáp án.
5. Không vòng `while` vô tận (luôn có số vòng tối đa).
6. Chỉ ghi file `.sgk/banks/bNN.js`, không sửa `index.html`.
7. Mỗi bài học ít nhất 4 bài tập.
8. Tiếng Việt có dấu, đúng chính tả như sách. Không dùng emoji.
9. **LÀM XONG BÀI NÀO GHI FILE BÀI ĐÓ NGAY**, không dồn tới cuối.

## Mẫu tham chiếu
`G:/My Drive/App toán/.sgk/MAU_bai1.js` (bài mẫu chuẩn) và `MAU_bai2.js` (bảng, đặt tính dọc, chọn nhiều).
