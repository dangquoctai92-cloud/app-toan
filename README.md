# Phát triển và kiểm tra app

Dùng máy chủ cục bộ và mở app trong trình duyệt đầy đủ để xem video YouTube; mở trực tiếp `index.html` có thể bị YouTube từ chối do thiếu nguồn giới thiệu. Đây là tệp sản phẩm được tạo tự động; sửa nguồn rồi tạo lại, không sửa tay tệp này.

## Nguồn chính

- `src/index.template.html`: các màn hình.
- `src/styles.css`: giao diện dùng chung, đã loại các khối CSS trùng hoàn toàn và giữ bản cuối để bảo toàn thứ tự ưu tiên.
- `src/interface.css`: phong cách góc học của Bông, nạp sau các kiểu bài tập để thống nhất giao diện.
- `src/core.js`: trạng thái, tiện ích, tạo câu hỏi và ma trận đề cuối năm.
- `src/app.js`: điều hướng, nhập/chấm bài, ôn lại và thống kê.
- `.sgk/banks/b1.js` đến `b81.js`: ngân hàng thường.
- `.sgk/banks-adv/b1.js` đến `b81.js`: ngân hàng nâng cao.
- `.sgk/bank-order.json`: thứ tự nạp được bảo toàn từ bản app gốc để các hàm minh hoạ dùng chung vẫn hoạt động.
- `src/video-catalog.json`: thông tin công khai của video, thời điểm kiểm tra và giới hạn xác minh.

Tất cả 81 bài thường và 81 bài nâng cao đã có nguồn riêng. CSS riêng của ngân hàng có thể đặt trong khối `/*CSS ... CSS*/`; bộ tạo app đưa mỗi khối vào sản phẩm đúng một lần. Những mã ghép cũ `integrate.js` và `integrate-adv.js` nay gọi cùng bộ tạo app.

## Tạo app

```powershell
node .sgk/build.cjs
```

Không tải thư viện ngoài khi tạo app. Chạy lại không thay đổi nội dung nếu nguồn không đổi. Các script vá tạm cũ trong `.sgk` là công cụ lịch sử; không dùng chúng để sửa tệp sản phẩm mới.

## Kiểm thử

```powershell
node tests/generators.cjs
node tests/regression.cjs
node tests/layout.cjs
node tests/responsive.cjs
```

Kiểm tra sinh câu dùng Node có sẵn. Kiểm tra trình duyệt dùng Playwright trong runtime Codex trên máy này và Microsoft Edge. Mỗi lần kiểm tra tạo một hồ sơ trình duyệt riêng, không đọc hoặc xoá tiến độ học thật. Các kết quả được lưu ở `.audit`.

- Bộ sinh: 200 lượt/mẫu; chỉ phát hiện các bất biến cấu trúc/đáp án đã định nghĩa, không thay thế thẩm định toán học và sách.
- Hồi quy: thao tác nộp bài, ôn lại, dữ liệu bị hỏng, xoá tiến độ, ký tự HTML, lựa chọn và đề tổng hợp.
- Bố cục: toàn bộ mẫu trên các kích thước khác nhau, đầu bài/vùng điều khiển/nút dài.
- Video: `node tests/videos.cjs` kiểm tra metadata công khai; không chứng minh đã xem nội dung hoặc phát thành công trên mọi thiết bị.

## Quy tắc điểm và tiến độ

Lần nộp đầu quyết định điểm, sao và điều kiện hoàn thành bài. Ôn lại lưu đáp án và kết quả riêng, không cộng sao hoặc thay đổi thống kê lần đầu. Muốn lấy kết quả mới cho cả bài, mở lại bài và làm một lượt mới như trước.

Tiến độ cũ được đọc và kiểm tra kiểu. Dữ liệu lỗi được giữ trong khóa phục hồi rồi app dùng trạng thái mới. Không có thao tác tự động xoá tiến độ thật trong quá trình nâng cấp này.

Đề cuối năm gồm 15 câu: 2 câu từ bài chuyên biệt của mỗi nhóm số học, phép tính, hình học, đo lường và dữ liệu; thêm 5 câu tổng hợp lấy từ toàn bộ ngân hàng. Không lặp mẫu trong cùng đề. Bài ôn tập có nhiều nhóm kỹ năng được giữ ở nhóm tổng hợp, tránh tự gán mọi câu trong bài đó vào một kỹ năng. Gắn nhãn đến từng mẫu vẫn thuộc phần đối chiếu nội dung còn lại.

## Dự phòng và hoàn tác

Bản trước sửa nằm trong `.audit/before-fix-20260913/`, gồm `index.html`, các nguồn ngân hàng cũ và script tích hợp. Có thể mở trực tiếp bản HTML dự phòng để đối chiếu. Khi hoàn tác mã nguồn, cần phục hồi cả nguồn lẫn quy trình ghép tương ứng; không ghi đè tiến độ của người học.

## Phần chưa nghiệm thu

Chưa đối chiếu bằng mắt tất cả bài tập với toàn bộ trang sách. Chưa kiểm thử trên iPhone/Android thật và Safari. Đã xác minh trình phát nhúng tải được cho 81 video tại thời điểm kiểm tra trên Edge; chưa xem hết toàn bộ thời lượng và chưa nghiệm thu trên mọi thiết bị. Không gắn nhãn đã hoàn tất các phần này chỉ dựa vào kiểm thử tự động.

Kiểm tra phần hình và chữ vượt khung SVG: `node tests/svg-bounds.cjs 813 1366`. Có thể thay seed và độ rộng, ví dụ `node tests/svg-bounds.cjs 2026 390`. Bộ kiểm tra dựng toàn bộ mẫu, đo getBBox với dung sai 2 đơn vị, bỏ qua lớp đường nối phủ toàn khung; không kiểm định mọi nét viền, hiệu ứng hoặc nội dung toán học.

## Xem kết quả chi tiết

Sau khi bé hoàn thành bài, trang chấm điểm chỉ hiển thị điểm tổng. Phụ huynh bấm “Phụ huynh xem kết quả” và nhập mật khẩu đang dùng trong cài đặt để xem từng câu, đáp án, lời giải hoặc mở lượt ôn lại. Đóng kết quả hay rời trang sẽ khóa lại. Kiểm tra luồng này bằng `node tests/parent-results.cjs`.

## Hoạt cảnh nền

Nút “Dừng hoạt cảnh” / “Bật hoạt cảnh” điều khiển mây, bướm, lá và máy bay giấy; lựa chọn được nhớ qua tải lại. Khi làm bài chỉ còn mây trôi chậm. Chế độ giảm chuyển động của thiết bị dùng nền tĩnh. Kiểm tra bằng `node tests/scenery.cjs`.

## Video bài giảng — 13/09/2026

81 bài có video Toán 3 Kết nối tri thức từ VietJack, đối chiếu theo bài; đã thay 42 liên kết cũ, gồm clip ngắn và video vở bài tập bị lẫn. Danh mục lưu tiêu đề, kênh, nguồn, thời lượng và thời điểm kiểm tra. Nguồn tra cứu: https://www.vietjack.com/toan-3-kn/.

Trang bài giảng có ảnh xem trước và nút phát; chỉ tải YouTube khi người dùng bấm. Có thông báo tải, nút thử lại khi lỗi, liên kết mở YouTube và nguồn bài giảng. Rời trang sẽ dừng và gỡ trình phát. Bài thường và nâng cao dùng chung bài giảng tương ứng.

Kiểm tra `node tests/video-player.cjs` xác nhận danh mục đủ 81 bài, khởi tạo/dừng video, lỗi nhúng, thử lại, phản hồi đến muộn và mạng lỗi. Kiểm tra trực tiếp `.audit/video-live-all.json` cùng `.audit/video-live-retry.json` ghi nhận cả 81 trình phát tải thành công, đúng ID và có thời lượng; Bài 1 đã phát thử. Việc tải được trình phát không thay thế xem hết nội dung và không bảo đảm YouTube luôn khả dụng trong tương lai.

Bản sửa nút phát: khung YouTube được mở ngay khi bấm, không chờ thư viện điều khiển. Khi thiếu phản hồi, hướng dẫn và nút thử lại nằm ngoài khung để người dùng vẫn bấm được nút YouTube. Kiểm tra tình huống này bằng `node tests/video-independent.cjs`.

## Giới hạn khung xem trước Codex

Ở phiên bản đã kiểm tra (26.908.4834.0), chế độ xem localhost chặn iframe từ Internet. Vì vậy kiểm tra phát thành công trên Edge không đủ để kết luận sẽ phát ngay trong khung xem trước. App xử lý khung bị chặn bằng ảnh bài giảng, thông báo và nút thử lại sau 8 giây, thay cho khung đen vô hạn. Không thay đổi cơ chế bảo vệ của Codex. Bản web test cần được đăng và kiểm chứng riêng nếu người dùng muốn test video ngay trong khung này.
