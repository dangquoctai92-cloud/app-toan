# Kết quả sửa app — 13/09/2026

Bản dùng hiện tại: `index.html`. Đã sửa các lỗi phần mềm xác nhận trong đợt rà soát, giữ bản dự phòng trước thay đổi và kiểm tra lại. Tiến độ học thật không bị xoá hoặc thao tác trong các phiên kiểm thử.

## Đã triển khai

- Sửa khung cuộn của bài dài: nội dung bắt đầu từ trên; nút thoát ở thanh đầu dễ tiếp cận; thông báo phục hồi dữ liệu không che phần cuối bài.
- Tăng vùng bấm/ô nhập; lựa chọn dài tự giãn và xuống dòng trong nút; bảng rộng có hướng dẫn cuộn. Cho phép phóng to trang. Giảm chuyển động ở màn làm toán.
- Thêm thông báo và đánh dấu các ô còn thiếu. Nút chọn có trạng thái trợ năng; nhóm bài dùng được bằng bàn phím. Cài đặt nhận focus và đóng bằng Escape.
- Thống nhất chấm bài và chấm ôn lại. Cách đọc số hợp lệ như “hai mươi bốn” được chấp nhận. Nút chuyển câu ôn lưu đáp án mới; Enter không nộp trùng.
- Giữ điểm/sao/thống kê lần đầu, ghi kết quả sau ôn riêng; không cộng lại sao khi xem kết quả. Màn tổng kết có thể mở đề và lời giải, giữ hình nối.
- Sửa phép trừ có thể âm ở Bài 2, thêm lựa chọn rõ ràng khi không có đáp án nào, sửa dữ kiện tiền mua vở ở Bài 81 nâng cao để tiền đưa đủ trả.
- Câu trả lời người dùng được hiển thị như văn bản, không thực thi HTML.
- Tạo trạng thái mới độc lập, sửa xoá tiến độ, kiểm tra và phục hồi dữ liệu hỏng; giữ giá trị hợp lệ của dữ liệu cũ. Sửa thứ tự cập nhật thống kê sau nộp.
- Chuỗi ngày bắt đầu từ 0; chuỗi cũ hết hiệu lực không tiếp tục hiện như đang duy trì. Huy hiệu học kì 1 kiểm tra đủ các chủ đề học kì, huy hiệu hoàn thành kiểm tra đủ 81 bài.
- Bản đồ thêm “Học tiếp”, phân biệt đã xong cơ bản/nâng cao; huy hiệu có tên đọc được.
- Đề cuối năm: 2 câu từ bài chuyên biệt của mỗi nhóm số, phép tính, hình học, đo lường, dữ liệu; thêm 5 câu tổng hợp từ toàn bộ ngân hàng. Không lặp mẫu trong cùng đề, không bỏ cố định các mẫu sau vị trí 5.
- Bỏ video mẫu không liên quan và ô cài đặt gia sư AI chưa hoạt động. Video có chú thích nguồn, clip ngắn được ghi rõ, và luôn có đường tiếp tục làm bài. Hiệu ứng chúc mừng không làm lỗi màn kết quả khi thư viện ngoài không tải.
- Khôi phục đủ 81 tệp nguồn bài thường và 81 tệp nâng cao; tách khung trang, CSS, lõi và điều khiển. Quy trình ghép chạy lại không thêm CSS hoặc đổi nội dung.

## Kết quả kiểm tra

- **227.200 lượt sinh câu, 1.136 mẫu, 898.740 ô đáp án:** không còn lỗi cấu trúc/đáp án theo bộ kiểm tra đã định nghĩa. Đây không phải chứng minh tất cả nội dung toán đều đúng.
- **7 kích thước màn hình:** 320×640, 360×800, 390×844, 390×500, 768×1024, 1366×768, 1920×1080. Mỗi kích thước dựng toàn bộ 1.136 mẫu. Không còn trường hợp đầu bài bị đẩy lên ngoài vùng cuộn. Không còn điều khiển nhỏ hơn 36 px ở một chiều trong phép đo này. Kiểm tra nút tràn chữ cũng qua ở bốn kích thước mở rộng.
- **21 kiểm tra hành vi tự động** qua: nộp bài, ôn lại, đọc số, lưu/tải/xoá dữ liệu, dữ liệu hỏng, HTML, Enter, focus bàn phím, huy hiệu, video và hình nối trong kết quả.
- **300 đề tổng hợp** kiểm tra đúng cơ cấu 10 câu chuyên biệt + 5 câu tổng hợp, không trùng mẫu và có các mẫu sau vị trí 5.
- **81/81 video** trả về metadata công khai khi kiểm tra. Điều này xác nhận liên kết tồn tại tại thời điểm đó, chưa xác nhận xem hết nội dung hoặc phát được trên mọi thiết bị.
- Tệp app từ **2.546.229 byte còn 2.156.795 byte**, giảm khoảng 15,3%. Tạo lại cho cùng mã băm; bản dự phòng trước sửa còn nguyên.

## Phạm vi chưa thể đánh dấu hoàn tất

- Chưa đối chiếu bằng mắt toàn bộ 1.136 mẫu với từng trang sách và kiểm định độc lập mọi lời giải/hình vẽ. Danh mục đã tạo để theo dõi; trạng thái đối chiếu sách vẫn là chờ kiểm tra, không được tự chuyển sang đạt từ kết quả tự động.
- Phân nhóm đề hiện dựa vào bài chuyên biệt và nhóm ôn tập hỗn hợp. Gắn nhãn đến từng mẫu câu vẫn thuộc phần thẩm định nội dung.
- Chưa thử trên thiết bị Android/iPhone thật, Safari, bàn phím điện thoại thật và hoàn cảnh hỗ trợ tiếp cận đầy đủ.
- Chưa xem toàn bộ 81 video. Bài 1 hiện là clip ngắn và đã được ghi rõ; Bài 2 là video ôn tập tham khảo. Không thay bằng video chưa kiểm chứng chỉ để đủ nhãn.
- Việc học dở giữa một lượt chưa có tính năng tiếp tục sau tải lại. Tiến độ các lượt đã hoàn thành vẫn được lưu.

Đợt sửa phần mềm và kiểm thử tự động đã hoàn thành; thẩm định nội dung toàn bộ và nghiệm thu thiết bị thật vẫn là công việc còn lại của kế hoạch.

## Tệp để xem và đối chiếu

- [App đã sửa](<G:/My Drive/App toán/index.html>).
- [Hướng dẫn nguồn và kiểm thử](<G:/My Drive/App toán/README.md>).
- [Bản app trước sửa](<G:/My Drive/App toán/.audit/before-fix-20260913/index.html>).
- [Kết quả sinh câu](<G:/My Drive/App toán/.audit/generator-after.json>).
- [Kiểm tra luồng sử dụng](<G:/My Drive/App toán/.audit/regression-results.json>) và [tình huống bổ sung](<G:/My Drive/App toán/.audit/edge-results.json>).
- [Bố cục sau sửa](<G:/My Drive/App toán/.audit/layout-after.json>) và [màn hình mở rộng](<G:/My Drive/App toán/.audit/responsive-after.json>).
- [Danh mục nội dung cần thẩm định](<G:/My Drive/App toán/.audit/content-inventory.json>).
- [Thông tin video](<G:/My Drive/App toán/.audit/video-check.json>).
- [Ảnh nút đáp án đã sửa](<G:/My Drive/App toán/.audit/fixed-options.png>).

## Bổ sung sửa hình bị cắt — 13/09/2026

- Sửa khung SVG của rùa, trâu, tê giác, hươu, hình cân và các hình học có nhãn vượt khung. Giữ nguyên nội dung và đáp án bài tập.
- Bài 34: tính chiều rộng khung và nền thước theo vạch chia cuối cùng, để thước không bị cắt trước khi hết dãy vạch.
- Quét 1.136 mẫu với ba bộ dữ liệu ngẫu nhiên (seed 813, 2026, 910), ở độ rộng 390 hoặc 1.366 px: tổng cộng 3.636 lượt hình SVG, không còn trường hợp vượt khung quá ngưỡng 2 đơn vị trong phép đo getBBox. Phép đo này không thay thế việc xem bằng mắt toàn bộ hình, nét viền, hiệu ứng và mọi biến thể.
- Đã xem trực tiếp ảnh rùa trên màn hình hẹp; đầu rùa hiển thị đầy đủ. 8 kiểm tra hành vi bổ sung đều qua, gồm hình nối trong trang kết quả.
- Giữ nguyên phần mở/đóng lời giải theo đính chính của người dùng.
- Bộ kiểm tra mới: `node tests/svg-bounds.cjs 813 1366` (hai tham số là seed và độ rộng màn hình). Kết quả lưu vào `.audit/svg-after-<seed>-<width>.json`.
- Kiểm tra lại toàn bộ 1.136 mẫu ở 320×640, 360×800, 768×1024 và 1920×1080: không phát hiện đầu bài bị khuất, nút tràn chữ hoặc điều khiển nhỏ hơn 36 px. Một số bảng/hình rộng vẫn dùng vùng cuộn ngang chủ động.
- Địa chỉ xem trước `http://127.0.0.1:8778/` đang phục vụ đúng bản `index.html` vừa tạo lại.

## Kết quả dành cho phụ huynh — 13/09/2026

- Khi hoàn thành bài hoặc lượt ôn lại, chỉ hiện điểm tổng, lời nhắn và các nút điều hướng. Chi tiết từng câu, đáp án, lời giải và nút làm lại câu sai nằm trong phần phụ huynh.
- Nút “Phụ huynh xem kết quả” yêu cầu mật khẩu phụ huynh đã lưu trong cài đặt. Nhập sai hoặc hủy không mở kết quả. Mật khẩu được che khi nhập và xóa khỏi ô sau khi đóng hộp thoại.
- Chỉ dựng nội dung chi tiết sau khi nhập đúng. Đóng kết quả, rời trang hoặc hoàn thành lượt mới sẽ xóa nội dung chi tiết khỏi trang và khóa lại.
- Kiểm thử mới `node tests/parent-results.cjs`: 12 tình huống tại 320 và 1.366 px, gồm dùng mật khẩu đã đổi, nhập sai, Escape/Hủy, mở/đóng lời giải, tự khóa lại và ôn tập. Tất cả qua; hộp nhập nằm giữa màn hình.
- 13 kiểm tra hồi quy và 8 tình huống bổ sung đều qua, gồm điểm lần đầu không đổi sau ôn tập, lưu tiến độ, nội dung nhập an toàn và bốn đường nối trong kết quả.

## Giao diện “Góc học của Bông” — 13/09/2026

- Thay nền chuyển màu rực bằng nền giấy sáng, xanh lá dịu và các điểm nhấn tím/vàng nhạt. Bỏ các hiệu ứng trang trí chuyển động lặp lại; giữ tín hiệu khi chọn và trả lời.
- Trang đầu có bạn thỏ đọc sách, lời chào và nút bắt đầu/học tiếp kèm đúng bài chưa hoàn thành. Minh họa SVG được vẽ trong mã nguồn, không cần tải ảnh bên ngoài.
- Danh sách bài chuyển thành thẻ ngang, tên bài có đủ chỗ, có trạng thái học tiếp/đã hoàn thành. Máy tính dùng hai cột, điện thoại một cột. Thu gọn các bảng thống kê bên cạnh để trang học tập trung hơn.
- Trang bài tập dùng nền nhẹ, khung giấy sáng, tiến độ đơn giản, ô nhập rõ và nút “Câu tiếp theo” / “Xem điểm của con”. Nội dung bài và quy tắc điểm được giữ nguyên.
- Trang chấm điểm có lời chúc mừng và bạn thỏ; kết quả chi tiết vẫn yêu cầu mật khẩu phụ huynh. Trang video và góc thành tích dùng cùng bộ màu, thẻ và nút mới.
- 20 trường hợp giao diện (5 màn hình × 320, 390, 768, 1.366 px) đều qua phép kiểm tra tràn ngang, chữ tràn nút và nút nhỏ. Đã xem trực tiếp ảnh trang đầu điện thoại/máy tính, trang điểm và trang làm bài.
- Kiểm tra 1.136 mẫu tại 320×640, 360×800, 768×1024 và 1920×1080: không ghi nhận đầu bài bị khuất, nút tràn chữ hoặc điều khiển nhỏ hơn 36 px. Bảng rộng tiếp tục có vùng cuộn ngang.
- Kiểm tra mật khẩu trên hai kích thước, 13 kiểm tra hồi quy và 8 tình huống bổ sung đều qua. Đã bổ sung khoảng trống cho nhãn tam giác Bài 51 sát khung.
- Các kiểm tra trình duyệt chạy bằng Edge trên máy này với hồ sơ riêng; chưa nghiệm thu trên thiết bị điện thoại thật hoặc mọi phông chữ tải qua mạng.
- Nguồn phong cách mới: `src/interface.css`. Kiểm tra màn hình: `node tests/interface.cjs`. Ảnh và kết quả nằm trong `.audit/new-ui-*`; bản nguồn trước đợt đổi giao diện nằm ở `.audit/ui-before/`.

## Nền hoạt cảnh — 13/09/2026

- Theo yêu cầu bổ sung, nền chuyển thành bầu trời xanh, mặt trời và đồi cỏ, có 4 mây, 3 bướm vỗ cánh, 3 lá lượn và 1 máy bay giấy. Trên màn hình nhỏ giảm bớt số hình hiển thị.
- Tất cả hoạt cảnh nằm sau nội dung, không nhận thao tác chạm/chuột và được ẩn khỏi trình đọc màn hình. Không tải ảnh hoặc thư viện ngoài cho hoạt cảnh.
- Có nút dừng/bật ở đầu các trang; khi làm bài có nút nhỏ cạnh thanh tiến độ. Lựa chọn được lưu trong `bb3_scenery`.
- Khi làm bài, chỉ giữ mây trôi chậm hơn. Khi trang không hiển thị thì tạm dừng hoạt cảnh. Thiết bị bật giảm chuyển động sẽ dùng nền tĩnh.
- `node tests/scenery.cjs` đã xác nhận chuyển động thực tế, dừng, lưu lựa chọn qua tải lại, bấm xuyên lớp nền, chế độ làm bài và thay đổi giảm chuyển động ở 320, 390 và 1.366 px.
- 20 trường hợp màn hình chính, kiểm tra khóa kết quả phụ huynh và 8 kiểm tra bổ sung đều qua. Bản tạo lại ổn định; ảnh kiểm tra ở `.audit/scenery-map-*.png` và `.audit/scenery-quiz-*.png`.

## So sánh bài đã nộp với đáp án — 13/09/2026

- Trong kết quả dành cho phụ huynh, mở “So sánh bài làm và đáp án” để xem hai bản xếp dọc: bài nộp lần đầu ở trên và cùng đề được điền đáp án đúng ở dưới.
- Bản đầu giữ câu trả lời lần đầu, không lấy đáp án ôn lại thay thế. Nếu đã ôn lại, có mục riêng để mở thêm bản ôn tập.
- Hiển thị số/chữ ngay trong bảng hoặc hình; dấu so sánh và lựa chọn phản ánh từng bản. Ô chưa điền hiển thị dấu —; ô điền chưa đúng được đánh dấu. Chuỗi nhập được đặt bằng textContent, không diễn giải thành HTML.
- Bảng rộng được cuộn ngang đồng bộ giữa hai bản. Bảng Bài 1 giữ cùng kích thước cột; cách đọc số dài được xuống dòng để không bị cắt trong ô.
- Từ bản này, khi dùng phím bỏ qua, các ô đã điền được lưu vào lịch sử thay vì bị thay bằng một dấu gạch. Không khôi phục được các ô chưa từng được lưu ở bản cũ.
- Kiểm tra tại 390 và 1.366 px: giữ bản nộp, đáp án đầy đủ, thứ tự trên/dưới, cuộn đồng bộ, lựa chọn, dấu, chuỗi nhập an toàn và bỏ qua một câu điền dở đều qua. Khóa phụ huynh, 13 kiểm tra hồi quy và 8 tình huống bổ sung đều qua; mỗi bản hình nối có đủ 4 đường.
- Kiểm tra: `node tests/comparison.cjs`. Kết quả ở `.audit/comparison-results.json`; ảnh đáp án ở `.audit/comparison-solution-1366.png`.
- Đã xác nhận địa chỉ xem trước đang phục vụ đúng bản app vừa sửa.

## Bổ sung đầy đủ video giảng bài — 13/09/2026

- Đối chiếu 81 bài Toán 3 Kết nối tri thức với nguồn VietJack (https://www.vietjack.com/toan-3-kn/); cập nhật 42 liên kết. Thay clip Shorts Bài 1 bằng bài giảng đầy đủ, sửa video Bài 2 lệch nội dung và Bài 22 bị lẫn vở bài tập.
- Lưu nguồn, tên kênh, ảnh xem trước, thời lượng và bằng chứng kiểm tra vào danh mục. Cả 81 trình phát nhúng đã tải thành công, trả về đúng ID; một bài tải chậm thành công khi thử lại. Bài 1 đã phát thử thực tế. Chưa xem hết toàn bộ thời lượng của 81 video.
- Thêm nút phát trên ảnh xem trước, trạng thái đang tải, thông báo lỗi và nút thử lại, liên kết mở YouTube cùng nguồn bài giảng. Khi rời trang, gỡ trình phát để dừng âm thanh.
- Sửa khung video bị tràn ở màn hình 320 px. 20 trường hợp màn hình, kiểm tra video cho đủ 81 bài, 8 tình huống bổ sung và kiểm tra tạo bản app đều qua.
- Kết quả: `.audit/video-catalog-update.json`, `.audit/video-live-all.json`, `.audit/video-live-retry.json`, `.audit/video-player-tests.json`. Ảnh phát thực tế: `.audit/video-live-b1.png`.

## Sửa nút phát bị kẹt — 13/09/2026

- Loại bỏ phụ thuộc bắt buộc vào bộ điều khiển YouTube: tạo iframe ngay trong lần bấm và gỡ ảnh phủ ngay lập tức. Bộ điều khiển chỉ bổ sung theo dõi trạng thái; nếu tải chậm hoặc bị chặn, người dùng vẫn thao tác trực tiếp trên trình phát. Cách nhúng trực tiếp được mô tả tại https://developers.google.com/youtube/iframe_api_reference.
- Sau 8 giây chưa nhận phản hồi, hiện hướng dẫn và nút tải lại bên dưới, không phủ lên video có thể đang chạy. Lỗi nhúng được YouTube xác nhận sẽ dừng/gỡ trình phát; phản hồi cũ không được mở lại trạng thái. Trường hợp chặn tự phát hướng dẫn bấm nút trong video.
- Kiểm tra danh mục và luồng video 81 bài, 20 trường hợp giao diện và bản tạo đều qua. Bộ kiểm tra mới `tests/video-independent.cjs` tái hiện bộ điều khiển chậm, bấm điều khiển bên trong iframe, quá hạn phản hồi, chặn tự phát, phản hồi cũ sau lỗi và dừng khi rời trang.
- Công cụ điều khiển trình duyệt trong app gặp lỗi khởi tạo sandbox, nên chưa xác nhận trực tiếp trong cửa sổ của người dùng. Kiểm tra phát thật và kiểm tra lỗi mô phỏng chạy trong Edge riêng.

## Xác định lỗi màn hình đen trong Codex — 14/09/2026

- Đã tái hiện trên chính trình duyệt nhúng Chrome 152 của Codex qua trang kiểm tra cục bộ. Thư viện YouTube tải xong; iframe YouTube cả hai miền không hoàn thành tải, không nhận ready/state. Iframe cùng máy tải bình thường.
- Đối chiếu mã trình duyệt đã cài, phiên bản 26.908.4834.0: hàm Yie kiểm tra subFrame từ URL cục bộ sang URL ngoài; bộ xử lý request hủy trường hợp này khi không ở chế độ agent điều khiển. Đây là giới hạn của khung xem trước, không phải bằng chứng video sai hoặc thiếu codec. Không sửa, vô hiệu hóa hoặc tìm cách vượt quy tắc này.
- Sửa app: theo dõi sự kiện iframe load riêng với trạng thái thư viện; sau 8 giây iframe chưa tải thì dừng/gỡ khung, khôi phục ảnh và nút thử lại. Nếu iframe đã tải nhưng thiếu thư viện điều khiển, tiếp tục cho bấm trực tiếp, không phủ lên video.
- Xác minh đúng môi trường bằng `.audit/in-app-fixed-video.jsonl`: tại 9 và 20 giây, trạng thái error rõ ràng, ảnh hiện, iframe đã gỡ, nút luyện tập vẫn dùng được. Điều này xác nhận sửa trạng thái treo, không khẳng định video đã phát được trong localhost của Codex.
- Kiểm tra mô phỏng 81 bài, tải chậm thư viện, chặn tự phát, iframe bị chặn, phản hồi lỗi đến muộn, 20 trường hợp giao diện và bản tạo đều qua.
- Muốn nghiệm thu video nhúng ngay trong khung Codex cần môi trường web được hỗ trợ. Bản chỉ gồm index.html đã chuẩn bị tại `.audit/web-test-dist/`; đang chờ người dùng chấp thuận đăng bản test. Chưa đăng app.
