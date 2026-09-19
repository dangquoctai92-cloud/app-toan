# Rà soát app Bé Bông Học Toán Lớp 3 và kế hoạch sửa

Ngày tổng hợp: 13/09/2026. Phạm vi: mã nguồn, bộ sinh câu hỏi, chấm bài, tiến độ và giao diện. Đây là báo cáo trước sửa. Kết quả triển khai ngày 13/09/2026 nằm trong [KET-QUA-SUA-APP.md](<G:/My Drive/App toán/KET-QUA-SUA-APP.md>), gồm phần đã sửa và phần chưa nghiệm thu.

## Kết luận

Cần sửa cơ chế hiển thị, nhập và chấm bài trước khi chỉnh màu sắc hoặc thêm tính năng. Có lỗi khiến trẻ không nhìn thấy đầu bài, không nhập được đáp án đúng, hoặc sửa đúng nhưng vẫn bị ghi nhận sai. Các lỗi này có nguyên nhân chung nên có thể xử lý tập trung, sau đó rà lại từng nhóm nội dung.

Không cần viết lại toàn bộ app ngay. Giữ ngân hàng bài hiện có, ổn định phần lõi, chuẩn hoá các thành phần giao diện rồi mới tách mã và hoàn thiện nội dung.

## Đã kiểm tra đến đâu

- App có 81 bài học, đủ ngân hàng thường và nâng cao: 661 mẫu câu thường và 475 mẫu câu nâng cao, tổng cộng 1.136 mẫu.
- Chạy mỗi mẫu 200 lần: 227.200 lượt sinh câu và kiểm tra 898.740 ô đáp án. Kiểm tra lỗi thực thi, giá trị không hợp lệ, ô đáp án không có điều khiển tương ứng, lựa chọn thiếu và đáp án số không thể nhập.
- Dựng toàn bộ 1.136 mẫu trên Edge ở ba kích thước: 390 × 844, 1.366 × 768 và 390 × 500. Kích thước thấp dùng để kiểm tra áp lực chiều cao; không thay thế kiểm thử bàn phím thật trên điện thoại.
- Kiểm tra luồng làm lại câu sai, đáp án chữ có nhiều cách đọc, thống kê sau khi nộp bài, dữ liệu lưu bị hỏng, xoá tiến độ và việc đưa câu trả lời vào màn kết quả.
- Đọc cơ chế sinh đề cuối năm và chạy thử quy trình ghép ngân hàng trong bộ nhớ, không ghi đè app.
- Xem ảnh một số màn và trường hợp lỗi tiêu biểu. Không khẳng định đã xem bằng mắt từng biến thể của cả 1.136 mẫu.

**Giới hạn:** thử trong trình duyệt riêng, chặn tài nguyên ngoài để kiểm tra app độc lập và không dùng dữ liệu người dùng thật. Phông tải từ mạng, khả năng phát và tính phù hợp của 81 video YouTube chưa được xác minh. Chưa đối chiếu bằng mắt toàn bộ câu hỏi/hình vẽ với từng trang sách; chưa thử trên iPhone, Android và Safari thật. Bộ kiểm tra cấu trúc không chứng minh mọi lời giải toán đều đúng.

Các số đếm giao diện dưới đây thuộc các mẫu ngẫu nhiên của lượt kiểm tra đã lưu; không phải tỷ lệ lỗi chính xác của mọi lần sử dụng và không được cộng chúng thành số lỗi độc lập.

## A. Lỗi cần sửa trước — P1

### 1. Bài dài làm mất phần đầu và nút thoát

**Đã tái hiện.** Khung làm bài có chiều cao cố định theo màn hình nhưng căn giữa dọc. Khi nội dung quá dài, phần đầu nằm phía trên điểm cuộn nhỏ nhất nên cuộn lên vẫn không thấy đủ.

- 390 × 844: 119/1.136 mẫu có thanh đầu bài hoặc tiêu đề tràn lên phía trên.
- 1.366 × 768: 196/1.136 mẫu.
- 390 × 500: 738/1.136 mẫu.
- Ví dụ: Bài 1 thường, mẫu thứ 2 trên máy tính; Bài 14 thường, mẫu thứ 6 trên điện thoại.

**Hướng sửa:** để nội dung dài bắt đầu từ trên, chống co các phần đầu/khung câu hỏi, có một vùng cuộn rõ ràng; giữ nút thoát và thao tác chính luôn có thể tiếp cận. Không tự động cố định nút nếu nó che bài hoặc bàn phím.

**Thử hướng sửa:** áp dụng riêng trong trình duyệt kiểm thử cách căn đầu trang và chống co; không còn trường hợp thanh đầu bị đẩy lên trong cả 3 × 1.136 lượt dựng. Đây mới là xác minh nguyên nhân và hướng sửa, chưa phải bản sửa sản phẩm được nghiệm thu.

Vị trí: [index.html:218](<G:/My Drive/App toán/index.html:218>), [index.html:580](<G:/My Drive/App toán/index.html:580>). [Ảnh lỗi máy tính](<G:/My Drive/App toán/.audit/clipped-1366-768.png>).

### 2. Chữ lựa chọn tràn nút, chồng lên nhau

**Đã tái hiện.** Có 39 mẫu bị phát hiện chữ rộng hơn vùng chứa của nút ở màn hình 390 px. Ví dụ rõ nhất là Bài 18 thường, mẫu thứ 2: “góc vuông” và “góc không vuông” bị nhét trong nút nhỏ, chữ xuống dòng ra ngoài nút và đè lên nhau.

**Hướng sửa:** tách nút ký hiệu ngắn khỏi lựa chọn dạng chữ. Nút chữ tự giãn theo nội dung, được xuống dòng và tăng chiều cao; bố trí thành hàng hoặc cột theo chiều rộng màn hình. Áp dụng thành phần dùng chung thay vì sửa từng bài bằng CSS riêng.

**Đạt khi:** tất cả lựa chọn đọc được đầy đủ, không chồng nhau, vùng bấm bao trọn nội dung ở cả màn hình hẹp.

Vị trí: [index.html:290](<G:/My Drive/App toán/index.html:290>), [index.html:6038](<G:/My Drive/App toán/index.html:6038>). [Ảnh lỗi](<G:/My Drive/App toán/.audit/option-overflow.png>). Danh sách 39 mẫu nằm trong [ui-details.json](<G:/My Drive/App toán/.audit/ui-details.json>).

### 3. Làm lại câu sai bằng nút “Câu sau” không lưu đáp án vừa sửa

**Đã tái hiện.** Điền toàn bộ đáp án đúng vào câu đang ôn rồi bấm “Câu sau”: kết quả vẫn giữ câu trả lời cũ và đánh dấu sai. Các ô nhập cập nhật `subs`, nhưng nút chuyển câu đọc `answer`. Chế độ ôn lại cũng không có nút kiểm tra riêng; chỉ hiện “Câu trước” và “Câu sau”.

**Hướng sửa:** chỉ có một hàm thu thập và chấm câu trả lời; mọi cách nộp bài đều gọi hàm đó. Trong ôn tập, thêm “Kiểm tra lại”, báo đúng/sai từng ô, rồi cho chuyển câu. Phân biệt rõ kết quả lần đầu và kết quả sau khi sửa.

**Đạt khi:** ô số, ô chữ, chọn đáp án và điền dấu đều được lưu/chấm giống nhau khi bấm nút hoặc dùng bàn phím.

Vị trí: [index.html:8863](<G:/My Drive/App toán/index.html:8863>), [index.html:43780](<G:/My Drive/App toán/index.html:43780>).

### 4. Đáp án chữ hợp lệ bị đổi từ đúng thành sai khi ôn lại

**Đã tái hiện.** Nhập “hai mươi bốn” cho 24: `submitAnswer` chấp nhận, nhưng `nextReviewQuestion` chấm lại bằng so sánh chuỗi với “hai mươi tư” rồi đổi thành sai.

**Hướng sửa:** dùng cùng quy tắc chấm cho mọi đường đi; không so sánh lại chuỗi toàn câu sau khi từng ô đã được chấm. Thêm ca kiểm thử các biến thể mốt/một, tư/bốn, linh/lẻ đúng theo nội dung cho phép.

Vị trí: [index.html:43614](<G:/My Drive/App toán/index.html:43614>), [index.html:43792](<G:/My Drive/App toán/index.html:43792>).

### 5. Bộ sinh đề tạo ra câu không thể hoàn thành

**Đã tái hiện trong ba mẫu:**

- **Bài 2 thường, mẫu thứ 6 — bảng phép trừ:** số bị trừ có thể nhỏ hơn số trừ. Đã sinh đáp án −6 trong 1/200 lượt. Ô nhập loại dấu trừ, nên không thể nhập đáp án đó.
- **Bài 2 thường, mẫu thứ 8 — chọn chum:** có 11/200 lượt không có chum nào cho kết quả lớn hơn 150. Đáp án đúng là tập rỗng, nhưng hàm nộp bài buộc phải chọn ít nhất một mục.
- **Bài 81 nâng cao, mẫu thứ 6 — mua vở:** số tiền mua có thể vượt 50.000 đồng; có 20/200 lượt sinh tiền thừa âm. Ví dụ mua 54.000 đồng nhưng đưa 50.000 đồng, app yêu cầu điền tiền trả lại −4.000 đồng.

Các tần suất trên chỉ là kết quả của bộ mẫu kiểm tra, không phải xác suất được tính chính xác.

**Hướng sửa:** sinh dữ kiện từ điều kiện hợp lệ: số bị trừ ≥ số trừ, số tiền đưa ≥ tổng mua. Với câu chọn, hoặc bảo đảm có đáp án, hoặc hỗ trợ lựa chọn rõ ràng “Không có đáp án nào”. Mỗi mẫu lỗi cần một ca tái hiện cố định và nhiều lượt kiểm tra ngẫu nhiên sau sửa.

Vị trí: [index.html:9733](<G:/My Drive/App toán/index.html:9733>), [index.html:9758](<G:/My Drive/App toán/index.html:9758>), [index.html:43066](<G:/My Drive/App toán/index.html:43066>).

### 6. Xoá tiến độ có thể giữ lại bài đã hoàn thành; dữ liệu hỏng làm app dừng khởi tạo

**Đã xác nhận bằng chạy mã độc lập.** Trạng thái mặc định và trạng thái học dùng chung các mảng trong phiên mới. Khi hoàn thành bài rồi đặt lại bằng bản sao nông, danh sách bài đã học có thể còn nguyên. Ngoài ra, đọc dữ liệu lưu bằng `JSON.parse` không có xử lý lỗi; dữ liệu không hợp lệ gây lỗi ngay lúc khởi động.

**Hướng sửa:** hàm tạo trạng thái mới phải tạo mảng mới; kiểm tra kiểu và phiên bản dữ liệu khi đọc; có phục hồi dữ liệu lỗi và thông báo phù hợp. Việc xoá cần xoá đúng cả thường, nâng cao, sao, lịch sử và thành tích theo phạm vi đã ghi trên nút.

**Đạt khi:** hoàn thành bài trong phiên mới → xoá → tải lại vẫn rỗng; dữ liệu hỏng không làm app trắng màn hình; dữ liệu cũ còn hợp lệ được giữ.

Vị trí: [index.html:9170](<G:/My Drive/App toán/index.html:9170>), [index.html:43826](<G:/My Drive/App toán/index.html:43826>).

### 7. Câu trả lời có thể trở thành mã HTML thực thi ở màn kết quả

**Đã tái hiện bằng dấu kiểm thử vô hại.** Màn tổng kết ghép trực tiếp câu trả lời vào `innerHTML`. Khi câu trả lời chứa thẻ HTML có sự kiện, trình duyệt chạy sự kiện đó. Các ô trả lời dạng chữ không có bước loại bỏ khả năng này.

Đây là lỗi xử lý dữ liệu trong app cục bộ; chưa có bằng chứng về khai thác từ xa hoặc gửi dữ liệu ra ngoài. Tuy vậy, app cũng lưu mật khẩu phụ huynh/API key trong bộ nhớ trình duyệt, nên cần xử lý sớm.

**Hướng sửa:** hiển thị câu trả lời của người dùng bằng văn bản thuần; chỉ cho phép HTML từ mẫu bài do ứng dụng kiểm soát. Không dùng chuỗi HTML ghép chung cho dữ liệu người dùng.

Vị trí: [index.html:43743](<G:/My Drive/App toán/index.html:43743>).

## B. Lỗi và bất hợp lý cần sửa tiếp — P2

### 8. Bấm chuyển câu khi thiếu đáp án không có thông báo

**Đã tái hiện.** Nút bấm không phản hồi khi còn ô trống; trẻ khó biết app đang lỗi hay mình chưa làm đủ.

Sửa bằng cách đánh dấu ô còn thiếu, đưa ô đầu tiên vào vùng nhìn thấy, kèm lời nhắc ngắn. Không làm mất đáp án đã nhập. Vị trí: [index.html:43636](<G:/My Drive/App toán/index.html:43636>).

### 9. Thống kê vừa nộp bài chưa cập nhật đồng bộ

**Đã tái hiện.** Sau khi nộp một câu đúng, dữ liệu đã ghi 1/1 và hoàn thành Bài 1, nhưng bảng thành tích vẫn hiện 0% và 0 bài vì giao diện được cập nhật trước dữ liệu tổng.

Sửa thứ tự cập nhật và dùng một nguồn số liệu chung cho tổng kết, hồ sơ, bản đồ. Vị trí: [index.html:43702](<G:/My Drive/App toán/index.html:43702>).

### 10. Bảng rộng trên điện thoại che các ô cần nhập mà không chỉ dẫn cuộn

**Đã quan sát.** 85 mẫu trong lượt kiểm tra ở 390 px cần cuộn ngang. Bài 1 mẫu đầu chỉ hiện những cột bên trái; các cột số/cách đọc ở phía phải khó nhận biết. Cuộn ngang tự nó không phải lỗi, nhưng thiếu chỉ dẫn làm trẻ tưởng đã thấy toàn bộ bài.

Sửa: giữ nhãn hàng khi cuộn, thêm dấu hiệu có nội dung bên phải; với bảng đơn giản, cân nhắc trình bày từng hàng thành nhóm dọc. Không thu nhỏ cả bảng đến mức chữ khó đọc. Vị trí: [index.html:260](<G:/My Drive/App toán/index.html:260>). [Ảnh](<G:/My Drive/App toán/.audit/quiz-mobile.png>).

### 11. Kích thước điều khiển chưa nhất quán; phóng to bị khóa

**Đã đo/đọc mã.** 916 mẫu ở 390 px có ít nhất một ô nhập hoặc nút nhỏ hơn 36 px ở một chiều. Đây là dấu hiệu cần rà soát khả năng bấm, không phải 916 lỗi độc lập. Nút lựa chọn chung trên điện thoại chỉ 30 × 30 px. Thẻ viewport cũng khóa phóng to.

Sửa: đặt mục tiêu vùng chạm 44–48 px cho thao tác chính, tăng khoảng cách, cho người dùng phóng to. Kiểm tra chữ dài và thao tác khi bàn phím mở, tránh tăng kích thước đồng loạt làm bài tràn thêm.

Vị trí: [index.html:5](<G:/My Drive/App toán/index.html:5>), [index.html:6038](<G:/My Drive/App toán/index.html:6038>).

### 12. Trạng thái chọn và điều hướng bằng bàn phím còn thiếu

**Đã đọc mã.** Tiêu đề chủ đề là `div` có thao tác bấm, chưa có ngữ nghĩa nút và trạng thái mở/đóng. Các lựa chọn dùng cùng cơ chế bật/tắt nhiều mục cả khi nội dung yêu cầu chọn một. Một số nút biểu tượng/ô nhập chưa có nhãn giải thích cho công cụ hỗ trợ.

Sửa: tách chọn một/chọn nhiều; dùng phần tử nút cho mở chủ đề; bổ sung trạng thái được chọn, thứ tự Tab, nhãn ô theo ý nghĩa bài và chỉ báo focus. Kiểm tra bằng bàn phím thật; chưa tuyên bố đã đạt chuẩn tiếp cận nào.

### 13. Sự kiện Enter có thể chạy hai đường nộp bài

**Rủi ro xác định từ mã, chưa kết luận mọi trường hợp đều nộp trùng.** Ô nhập gọi nộp khi Enter, và sự kiện bàn phím toàn cục cũng gọi lại; không chặn lan truyền. Trong ôn tập còn có chuyển câu chậm bằng bộ hẹn giờ.

Sửa: một đường nộp bài, khoá thao tác trong lúc chuyển trạng thái, hủy bộ hẹn giờ khi rời bài. Thử Enter liên tiếp, nhấp đúp và thoát bài ngay sau nộp.

Vị trí: [index.html:43384](<G:/My Drive/App toán/index.html:43384>), [index.html:43862](<G:/My Drive/App toán/index.html:43862>).

### 14. Đề cuối năm bỏ qua nhiều dạng câu

**Đã xác nhận từ cơ chế chọn đề và kiểm kê ngân hàng.** Đề cuối năm lấy 5 câu bắt đầu từ đầu mỗi ngân hàng rồi chọn 15 câu từ nhóm đó. Có 264/661 mẫu thường nằm sau vị trí 5 và không được đưa vào nhóm lựa chọn theo cách hiện tại. Việc xáo trộn bằng hàm so sánh ngẫu nhiên cũng không bảo đảm phân bố đều.

Sửa: gắn chủ đề/kỹ năng/độ khó cho mẫu câu; tạo ma trận đề rồi lấy mẫu từ toàn ngân hàng. Có thể giữ 15 câu, nhưng phải phủ nhóm kỹ năng đã thống nhất. Vị trí: [index.html:9613](<G:/My Drive/App toán/index.html:9613>), [index.html:43301](<G:/My Drive/App toán/index.html:43301>).

### 15. Thành tích có điều kiện chưa khớp ý nghĩa tên gọi

**Đã đọc mã.** “Xong Học kì 1” chỉ kiểm tra nhóm chủ đề thứ 7, chưa kiểm tra toàn học kì. Trạng thái mới mặc định có chuỗi học 1 ngày dù chưa làm bài. Chuỗi ngày chỉ được tính lại khi hoàn thành bài, nên số hiển thị có thể còn cũ sau thời gian nghỉ.

Sửa: định nghĩa rõ điều kiện từng huy hiệu, bắt đầu chuỗi học từ 0, tính trạng thái ngày hiện tại khi mở app. Cần chốt chính sách lần đầu/làm lại trước khi thay đổi cách cộng sao. Vị trí: [index.html:9161](<G:/My Drive/App toán/index.html:9161>), [index.html:9170](<G:/My Drive/App toán/index.html:9170>), [index.html:43718](<G:/My Drive/App toán/index.html:43718>).

### 16. Phần video và “gia sư AI” cần làm rõ trạng thái thật

**Đã đọc mã; chưa kiểm tra dịch vụ ngoài.** API key Gemini chỉ được đọc/lưu trong cài đặt, chưa thấy luồng gọi gia sư AI trong app. Video có đường dự phòng sang một video mẫu không phải bài toán. Hiệu ứng chúc mừng gọi thư viện ngoài trực tiếp nên có thể báo lỗi nếu thư viện không tải.

Sửa: chỉ hiển thị tính năng đã hoạt động; không yêu cầu lưu API key nếu chưa dùng. Video lỗi cần thông báo và nút tiếp tục học; bỏ video mẫu không liên quan. Hiệu ứng không được chặn luồng kết quả. Rà riêng 81 liên kết, bài tương ứng, khả năng nhúng và tình huống mất mạng.

Vị trí: [index.html:8951](<G:/My Drive/App toán/index.html:8951>), [index.html:43112](<G:/My Drive/App toán/index.html:43112>), [index.html:43757](<G:/My Drive/App toán/index.html:43757>).

### 17. Khó bảo trì do nguồn bài và CSS bị dồn/lặp

**Đã đo.** Tệp chính có 43.898 dòng, 2.546.229 byte. Thư mục ngân hàng thường chỉ có 34 tệp cho 81 bài; 47 bài còn nằm ở nguồn khác trong tệp chính/mẫu và chưa có tệp riêng theo cùng quy trình. Ngân hàng nâng cao có 81 tệp.

Có 5 dấu mốc ghép CSS thường và 8 dấu mốc CSS nâng cao, nhiều khối bị lặp. Chạy quy trình ghép thường hai lần trong bộ nhớ làm lượt thứ hai tăng thêm 57.390 byte dù không đổi nguồn bài.

Sửa: thống nhất nguồn duy nhất cho từng bài, tách phần điều khiển khỏi dữ liệu và trình bày, ghép ra sản phẩm theo cách chạy lại không thay đổi kết quả. Loại CSS trùng sau khi có ảnh đối chiếu, không xoá hàng loạt theo cảm tính.

Vị trí: [integrate.js](<G:/My Drive/App toán/.sgk/integrate.js>), [integrate-adv.js](<G:/My Drive/App toán/.sgk/integrate-adv.js>). Số liệu: [structure-results.json](<G:/My Drive/App toán/.audit/structure-results.json>).

## C. Những thay đổi giao diện nên làm sau khi hết lỗi chức năng

Đây là đề xuất thiết kế, không phải kết luận tất cả đều là lỗi:

- **Màn học bài:** tiêu đề bài/kỹ năng rõ; phần tiến độ gọn; nội dung đủ rộng; một thao tác chính dễ nhận biết. Với bài nhiều ý, nhóm theo a/b/c và cho biết còn thiếu bao nhiêu ô.
- **Bản đồ học:** làm nổi bật “Học tiếp”; phân biệt thường đã xong, nâng cao đã xong và đang học. Nhãn “Nâng cao” hiện ở cả 81 bài nên ít giúp phân biệt; đưa nó vào lựa chọn chế độ hoặc trạng thái cụ thể.
- **Màn kết quả:** giữ hình/bảng của câu hỏi khi cần xem lại, chỉ ra ô sai và lời giải tương ứng. Tách kết quả lần đầu khỏi kết quả sau ôn để trẻ và phụ huynh hiểu số điểm.
- **Hồ sơ:** diễn giải sao, chuỗi ngày, độ chính xác và huy hiệu bằng chữ dễ hiểu; không dựa vào tooltip chỉ thuận tiện với chuột.
- **Phong cách:** thống nhất chữ, khoảng cách, màu trạng thái và kích thước nút. Giảm chuyển động/phát sáng quanh vùng đang làm toán; vẫn có thể giữ nét vui tươi hiện tại.

## D. Kế hoạch sửa theo thứ tự

### Đợt 1 — Ổn định thao tác và các câu gây bế tắc

Sửa mục 1–6 và 8–9: khung cuộn, nút đáp án dài, luồng ôn tập, chấm biến thể chữ, ba mẫu sinh đề lỗi, lưu/xoá tiến độ và cập nhật thống kê.

**Sản phẩm cần có:** một bản app có thể học trọn bài trên màn hình nhỏ và máy tính; sửa câu sai được ghi nhận; không gặp ba mẫu câu bất khả thi đã xác định.

**Nghiệm thu:** chạy lại bộ sinh 200 lượt/mẫu; 0 đáp án không nhập được/không có cách chọn; toàn bộ mẫu nhìn được đầu bài và thao tác; bấm nút và Enter cho cùng kết quả; tiến độ qua tải lại và đặt lại đúng.

### Đợt 2 — Thống nhất giao diện và bảo vệ dữ liệu nhập

Sửa mục 7, 10–13; chuẩn hoá nút chữ, nút ký hiệu, chọn một/chọn nhiều, ô số/ô chữ, bảng, thông báo thiếu đáp án, focus và vùng chạm. Hoàn thiện màn kết quả và ôn tập trước, rồi đến bản đồ/hồ sơ/cài đặt.

**Nghiệm thu:** không còn chữ tràn/chồng lên nút; câu trả lời chứa ký tự HTML chỉ hiện như chữ; thao tác được bằng chạm và bàn phím; phóng to không mất chức năng; bảng rộng có hướng dẫn cuộn rõ. Có ảnh trước/sau ở màn hình điện thoại và máy tính.

### Đợt 3 — Chuẩn hoá nguồn và kiểm định nội dung

Thống nhất nguồn bài và quy trình ghép theo mục 17, tránh sửa một nơi nhưng khi ghép lại bị mất. Gắn mã mẫu câu, kỹ năng, độ khó, tham chiếu trang sách và phiên bản.

Đối chiếu nội dung theo nhóm: số và phép tính → nhân chia/biểu thức → hình học → đo lường/thời gian/tiền → bảng số liệu và sự kiện. Kiểm tra độc lập đáp án, lời giải, đơn vị, số vẽ trong hình, trường hợp đồng hạng/nhiều đáp án và giới hạn số theo bài. Lưu dữ kiện đã sinh để có thể tái hiện lỗi.

**Nghiệm thu:** từng bài có trạng thái đã đối chiếu và danh sách ngoại lệ; ghép hai lần cho cùng kết quả; mỗi lỗi đã sửa có kiểm tra hồi quy phù hợp. Không gọi nội dung “đã chuẩn toàn bộ” chỉ vì kiểm tra cấu trúc chạy qua.

### Đợt 4 — Hoàn thiện đánh giá, thành tích và video

Sửa mục 14–16: đề cuối năm có ma trận kỹ năng, huy hiệu và chuỗi ngày có quy tắc rõ, video đúng bài và có trạng thái lỗi. Bỏ hoặc hoàn thiện tính năng AI đang để dở; chỉ thiết kế phần kết nối khi đã quyết định dùng.

**Nghiệm thu:** đề có thể lấy mẫu từ toàn bộ ngân hàng theo ma trận; thành tích đúng các tình huống mới học/nghỉ ngày/làm lại; video lỗi không cản học.

### Đợt 5 — Kiểm thử phát hành

Kiểm tra tất cả màn và luồng trên các bề rộng 320/360/390/768/1.366/1.920 px, màn hình thấp, phóng to và xoay màn hình. Thử ít nhất Android Chrome, iPhone Safari và máy tính; đi từ mở app → học → nộp → ôn lại → hồ sơ → thoát/mở lại.

Thêm trường hợp mất mạng, dữ liệu cũ/hỏng, bấm nhanh nhiều lần, thoát giữa bài, bàn phím mở và nội dung dài. Chỉ phát hành khi hết lỗi P1, không còn trường hợp không hoàn thành được bài, và các giới hạn còn lại được ghi rõ.

## E. Bằng chứng và cách đọc

- [Kết quả sinh câu](<G:/My Drive/App toán/.audit/generator-results.json>): kiểm kê mẫu và ba nhóm lỗi dữ liệu đã phát hiện.
- [Kết quả luồng sử dụng](<G:/My Drive/App toán/.audit/browser-results.json>): ôn tập, biến thể đáp án, thống kê và HTML từ câu trả lời.
- [Danh sách mẫu bị tràn đầu bài](<G:/My Drive/App toán/.audit/layout-results.json>): tách theo kích thước màn hình.
- [Chi tiết giao diện](<G:/My Drive/App toán/.audit/ui-details.json>): các nút tràn chữ và kết quả thử hướng sửa cuộn.
- [Cấu trúc và quy trình ghép](<G:/My Drive/App toán/.audit/structure-results.json>).

“Mẫu thứ N” là vị trí bộ sinh trong bài, không nhất thiết là số bài tập in trong sách. Các kiểm tra và ảnh được lưu trong `.audit`; tệp `index.html` và dữ liệu học thật chưa bị sửa.

