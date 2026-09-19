
/* ==================== BỘ BIỂU TƯỢNG SVG ==================== */
const ICON = {
  plusminus:'<path d="M3.5 7h7M7 3.5v7"/><path d="M13.5 17h7"/><path d="M14.5 6.5l6 6M20.5 6.5l-6 6"/>',
  muldiv:'<path d="M4 5.5l6 6M10 5.5l-6 6"/><path d="M13.5 15h7"/><circle cx="17" cy="11" r="1.1"/><circle cx="17" cy="19" r="1.1"/>',
  times:'<path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/>',
  divide:'<path d="M4 12h16"/><circle cx="12" cy="6.5" r="1.4"/><circle cx="12" cy="17.5" r="1.4"/>',
  up:'<path d="M12 20V5M6 11l6-6 6 6"/>',
  down:'<path d="M12 4v15M6 13l6 6 6-6"/>',
  compare:'<path d="M6 5l6 7-6 7M14 5l6 7-6 7"/>',
  xvar:'<path d="M3.5 7l6 8M9.5 7l-6 8"/><path d="M13.5 9.5h7M13.5 14.5h7"/>',
  ruler:'<rect x="2" y="7.5" width="20" height="9" rx="2"/><path d="M7 7.5v3M12 7.5v4M17 7.5v3"/>',
  scale:'<path d="M12 3.5v17M6.5 20.5h11M4 8.5h16"/><path d="M7 8.5l-3 5.5h6zM17 8.5l-3 5.5h6z"/>',
  beaker:'<path d="M9.5 3h5M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 16h9"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.4 2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  coin:'<circle cx="12" cy="12" r="8.5"/><path d="M9.5 8.5h3.2a3.5 3.5 0 0 1 0 7H9.5V8.5M8 12h6"/>',
  midpoint:'<path d="M3.5 12h17"/><circle cx="3.5" cy="12" r="1.5"/><circle cx="20.5" cy="12" r="1.5"/><circle cx="12" cy="12" r="2.6"/>',
  triangle:'<path d="M12 4.5L20.5 19.5H3.5z"/>',
  rect:'<rect x="3" y="6.5" width="18" height="11" rx="1.5"/>',
  area:'<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 9.7h18M3 14.3h18M8.7 5v14M15.3 5v14"/>',
  numline:'<path d="M3 13h18"/><path d="M6.5 10v6M12 9v8M17.5 10v6"/>',
  remainder:'<path d="M3.5 12h11"/><circle cx="9" cy="6.5" r="1.3"/><circle cx="9" cy="17.5" r="1.3"/><path d="M17 8.5l4.5 4.5M21.5 8.5L17 13"/>',
  parens:'<path d="M8.5 4c-3 4.5-3 11.5 0 16M15.5 4c3 4.5 3 11.5 0 16M12 10v4"/>',
  round:'<path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1"/><path d="M20.5 4.5v4.2h-4.2"/>',
  fraction:'<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v8.5l6 6"/>',
  roman:'<path d="M5 6.5v11M10 6.5l4.5 11M14.5 6.5L10 17.5M19 6.5v11"/>',
  bars:'<path d="M4 20V13M10 20V7M16 20V10M22 20H2"/>',
  steps:'<path d="M3.5 19.5h5v-5h5v-5h5v-5"/>',
  sparkle:'<path d="M12 3l2.2 5.6L20 10.5l-5.8 2.2L12 19l-2.2-6.3L4 10.5l5.8-1.9z"/>',
  robot:'<rect x="4" y="8" width="16" height="12" rx="3.5"/><path d="M12 4v4M2.5 13v3M21.5 13v3"/><circle cx="9" cy="13.5" r="1.1"/><circle cx="15" cy="13.5" r="1.1"/><path d="M9.5 17h5"/>',
  circle:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="1.3"/><path d="M12 12h8.5"/>',
  angle:'<path d="M5 4v15h15"/><path d="M5 12h7v7"/>',
  cube:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
  temp:'<path d="M14 13.5V5a2.5 2.5 0 0 0-5 0v8.5a4.5 4.5 0 1 0 5 0z"/><path d="M11.5 16.5V9"/>',
  dice:'<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.2"/><circle cx="15.5" cy="15.5" r="1.2"/><circle cx="12" cy="12" r="1.2"/>',
  chest:'<rect x="3" y="9" width="18" height="11" rx="2.5"/><path d="M3 13.5h18M12 13.5V20M6.5 9V7a5.5 5.5 0 0 1 11 0v2"/>',
  check:'<path d="M4.5 12.5l5 5 10-10"/>',
  star:'<path d="M12 3.4l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9l6.1-.9z"/>',
  fire:'<path d="M12 3s5.5 4.2 5.5 9.2A5.5 5.5 0 0 1 12 21a5.5 5.5 0 0 1-5.5-8.8C6.5 8.5 9 7 9 7s0 2.5 1.5 3c1.6.5 1.5-4 1.5-7z"/>',
  book:'<path d="M4 4.5h6a3 3 0 0 1 2 3v12a2.5 2.5 0 0 0-2-2H4zM20 4.5h-6a3 3 0 0 0-2 3v12a2.5 2.5 0 0 1 2-2h6z"/>',
  target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  trophy:'<path d="M7 4.5h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4.5v1.5A3.5 3.5 0 0 0 7 11M17 6h2.5v1.5A3.5 3.5 0 0 1 17 11M12 14.5V18M8.5 20.5h7"/>',
  crown:'<path d="M3.5 8l3.5 4 5-6.5 5 6.5 3.5-4-1.5 11h-14z"/>',
  gem:'<path d="M6 3.5h12l3.5 5.5L12 20.5 2.5 9z"/><path d="M2.5 9h19M8.5 9L12 20.5 15.5 9 12 3.5z"/>',
  leaf:'<path d="M4.5 19.5C3 13 8 5.5 19.5 4.5c1 11.5-6.5 16.5-13 15z"/><path d="M9 15c2.5-3 5-4.5 8-5.5"/>',
  rocket:'<path d="M12 3c3.5 2.5 5 6 5 9.5l-2.5 3h-5L7 12.5C7 9 8.5 5.5 12 3z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 18.5c-1 1-1.5 2.5-1.5 2.5s1.5-.5 2.5-1.5M15 18.5c1 1 1.5 2.5 1.5 2.5s-1.5-.5-2.5-1.5"/>',
  brain:'<path d="M9.5 4.5A3 3 0 0 0 6.5 8a3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 5 1V4.5a2 2 0 0 0-2 0z"/><path d="M14.5 4.5a3 3 0 0 1 3 3.5 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-5 1V4.5a2 2 0 0 1 2 0z"/>',
  map:'<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13l-6 2.5-6-2.5-6 2.5z"/><path d="M9 4v13M15 7v13"/>',
  user:'<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.8M12 18.7v2.8M21.5 12h-2.8M5.3 12H2.5M18.7 5.3l-2 2M7.3 16.7l-2 2M18.7 18.7l-2-2M7.3 7.3l-2-2"/>',
  castle:'<path d="M3.5 20.5V8l3-2.5V8h3V4.5l2.5-2 2.5 2V8h3V5.5L20.5 8v12.5z"/><path d="M10 20.5v-4.5h4v4.5"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',
  del:'<path d="M9 6h11v12H9L3 12z"/><path d="M12.5 9.5l4 5M16.5 9.5l-4 5"/>',
  play:'<path d="M7 4.5l12 7.5-12 7.5z"/>'
};
function ic(n){
  return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">${ICON[n] || ICON.star}</svg>`;
}
/* ==================================================================
   SGK TOÁN 3 — KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
   16 chủ đề · 81 bài (đúng tên bài trong sách)
================================================================== */
const PALETTE = [
  ['#ffd97a','#ff9f6b','#ff9f43','#ff5f7e','#ff7a3d'],
  ['#b8f5c8','#7fe3a5','#42c97a','#12a05c','#22b466'],
  ['#8ef0d8','#5ec8ff','#22c1a4','#3aa7ff','#22c1a4'],
  ['#a8d5ff','#9aa8ff','#3aa7ff','#6366f1','#4f7dff'],
  ['#e0c3ff','#ffb3e6','#a06bff','#ec4899','#a06bff'],
  ['#ffc9d8','#ffb08a','#ff5fa2','#ff9600','#ff5fa2'],
  ['#ffe6a3','#ffc078','#e2a300','#ff7a3d','#e2a300'],
  ['#c6f6d5','#9ae6ff','#2fbf71','#0ea5e9','#2fbf71'],
];
const RAW = [
 ['Ôn tập và bổ sung','plusminus',[
  [1,'Ôn tập các số đến 1 000',['place',1000],'numline','-BWsoG5_C4A'],
  [2,'Ôn tập phép cộng, phép trừ trong phạm vi 1 000',['addsub',1000],'plusminus','Fn2_Z6X2c4s'],
  [3,'Tìm thành phần trong phép cộng, phép trừ',['findx','as'],'xvar','8MNw7uyVfe8'],
  [4,'Ôn tập bảng nhân 2; 5, bảng chia 2; 5',['table',[2,5]],'muldiv','I7IsbhhOlfE'],
  [5,'Bảng nhân 3, bảng chia 3',['table',[3]],'muldiv','FM8TYRtQ5lw'],
  [6,'Bảng nhân 4, bảng chia 4',['table',[4]],'muldiv','TeA_XYFuMBQ'],
  [7,'Ôn tập hình học và đo lường',['mix',[['shape'],['len'],['perim_poly']]],'ruler','wLA0CrW8DWQ'],
  [8,'Luyện tập chung',['mix',[['place',1000],['addsub',1000],['findx','as'],['table',[2,3,4,5]]]],'chest','Sm7TMqOoH9U']]],
 ['Bảng nhân, bảng chia','muldiv',[
  [9,'Bảng nhân 6, bảng chia 6',['table',[6]],'muldiv','2ReJyf5tZd0'],
  [10,'Bảng nhân 7, bảng chia 7',['table',[7]],'muldiv','acMXXXz4Mgs'],
  [11,'Bảng nhân 8, bảng chia 8',['table',[8]],'muldiv','TSWxaDvFTW0'],
  [12,'Bảng nhân 9, bảng chia 9',['table',[9]],'muldiv','H1HpwYvD1hI'],
  [13,'Tìm thành phần trong phép nhân, phép chia',['findx','md'],'xvar','o9ELq3zDEE0'],
  [14,'Một phần mấy',['frac'],'fraction','Qt_lrX-jvPs'],
  [15,'Luyện tập chung',['mix',[['table',[6,7,8,9]],['findx','md'],['frac']]],'chest','tCnNq8872SA']]],
 ['Làm quen với hình phẳng, hình khối','triangle',[
  [16,'Điểm ở giữa, trung điểm của đoạn thẳng',['mid'],'midpoint','I1lbt80dAS8'],
  [17,'Hình tròn. Tâm, bán kính, đường kính của hình tròn',['circle'],'circle','7cMNDyyLkUE'],
  [18,'Góc, góc vuông, góc không vuông',['shape'],'angle','ntzxAyFRHNI'],
  [19,'Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông',['shape'],'triangle','Bld472z5L-o'],
  [20,'Thực hành vẽ góc vuông, vẽ đường tròn, hình vuông, hình chữ nhật và vẽ trang trí',['mix',[['shape'],['circle']]],'rect','HgW0mOAWue0'],
  [21,'Khối lập phương, khối hộp chữ nhật',['solid'],'cube','h-h9KEjVp0I'],
  [22,'Luyện tập chung',['mix',[['mid'],['circle'],['shape'],['solid']]],'chest','VP-TI_gnV4Y']]],
 ['Phép nhân, phép chia trong phạm vi 100','times',[
  [23,'Nhân số có hai chữ số với số có một chữ số',['mul',2],'times','xp-5a2JI1pM'],
  [24,'Gấp một số lên một số lần',['gap'],'up','euI6oRkX1v8'],
  [25,'Phép chia hết, phép chia có dư',['divrem'],'remainder','Wo1anBelYUY'],
  [26,'Chia số có hai chữ số cho số có một chữ số',['div',2],'divide','N0AjLmV7RPc'],
  [27,'Giảm một số đi một số lần',['giam'],'down','0oo6PJO-M-k'],
  [28,'Bài toán giải bằng hai bước tính',['word2'],'steps','OvymejFzVrY'],
  [29,'Luyện tập chung',['mix',[['mul',2],['div',2],['gap'],['giam'],['divrem'],['word2']]],'chest','lPRqG9FCNXA']]],
 ['Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ','ruler',[
  [30,'Mi-li-mét',['len'],'ruler','-nQGqj5fN-E'],
  [31,'Gam',['mass'],'scale','2GbuY3iiPVI'],
  [32,'Mi-li-lít',['cap'],'beaker','_lYIF1p4s_M'],
  [33,'Nhiệt độ. Đơn vị đo nhiệt độ',['temp'],'temp','qtv6ys5QiDM'],
  [34,'Thực hành và trải nghiệm với các đơn vị mi-li-mét, gam, mi-li-lít, độ C',['mix',[['len'],['mass'],['cap'],['temp']]],'beaker','aIqwoG145I4'],
  [35,'Luyện tập chung',['mix',[['len'],['mass'],['cap'],['temp']]],'chest','YINUF_h5pH4']]],
 ['Phép nhân, phép chia trong phạm vi 1 000','divide',[
  [36,'Nhân số có ba chữ số với số có một chữ số',['mul',3],'times','Cn70U1hh53U'],
  [37,'Chia số có ba chữ số cho số có một chữ số',['div',3],'divide','MtG6ZDsr9R4'],
  [38,'Biểu thức số. Tính giá trị của biểu thức số',['expr'],'parens','_2M0RU4Za00'],
  [39,'So sánh số lớn gấp mấy lần số bé',['solan'],'compare','rTT14-aG3L4'],
  [40,'Luyện tập chung',['mix',[['mul',3],['div',3],['expr'],['solan']]],'chest','dD04ttxFJP4']]],
 ['Ôn tập học kì 1','book',[
  [41,'Ôn tập phép nhân, phép chia trong phạm vi 100, 1000',['mix',[['mul',2],['mul',3],['div',2],['div',3],['table',[6,7,8,9]]]],'muldiv','CEXJjCCh4FI'],
  [42,'Ôn tập biểu thức số',['expr'],'parens','6zdg_0DaAHc'],
  [43,'Ôn tập hình học và đo lường',['mix',[['shape'],['mid'],['len'],['mass'],['cap'],['perim_poly']]],'ruler','RicbNBX1aL8'],
  [44,'Ôn tập chung',['mix',[['addsub',1000],['mul',3],['div',3],['expr'],['frac'],['word2'],['len'],['shape']]],'chest','sGnRIzlAKmU']]],
 ['Các số đến 10 000','numline',[
  [45,'Các số có bốn chữ số. Số 10 000',['place',10000],'numline','sMhheKqD7gk'],
  [46,'So sánh các số trong phạm vi 10 000',['bigger',10000],'compare','_EsIJhk8XHw'],
  [47,'Làm quen với chữ số La Mã',['roman'],'roman','R7YMoeg0wVE'],
  [48,'Làm tròn số đến hàng chục, hàng trăm',['round',[10,100]],'round','xvfwAKlTKvs'],
  [49,'Luyện tập chung',['mix',[['place',10000],['bigger',10000],['roman'],['round',[10,100]]]],'chest','rs4VgRcra8s']]],
 ['Chu vi, diện tích một số hình phẳng','area',[
  [50,'Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông',['mix',[['perim_poly'],['perim_rect']]],'triangle','Gne4kJ52ah8'],
  [51,'Diện tích của một hình. Xăng-ti-mét vuông',['area'],'area','CJE3viwHVoE'],
  [52,'Diện tích hình chữ nhật, diện tích hình vuông',['area'],'area','23O7p72evSY'],
  [53,'Luyện tập chung',['mix',[['perim_poly'],['perim_rect'],['area']]],'chest','DpwzQZqyFYA']]],
 ['Cộng, trừ, nhân, chia trong phạm vi 10 000','plusminus',[
  [54,'Phép cộng trong phạm vi 10 000',['add',10000],'plusminus','bw2CHuwPXxo'],
  [55,'Phép trừ trong phạm vi 10 000',['sub',10000],'plusminus','DhuEhlLTlOM'],
  [56,'Nhân số có bốn chữ số với số có một chữ số',['mul',4],'times','w5dowxeyvvY'],
  [57,'Chia số có bốn chữ số cho số có một chữ số',['div',4],'divide','2zFcqWmvAoE'],
  [58,'Luyện tập chung',['mix',[['add',10000],['sub',10000],['mul',4],['div',4]]],'chest','UrqWVZ5kcGQ']]],
 ['Các số đến 100 000','numline',[
  [59,'Các số có năm chữ số. Số 100 000',['place',100000],'numline','Z2f2VBJTDmU'],
  [60,'So sánh các số trong phạm vi 100 000',['bigger',100000],'compare','rqQI3RcWO0M'],
  [61,'Làm tròn số đến hàng nghìn, hàng chục nghìn',['round',[1000,10000]],'round','i-SniS-hqOw'],
  [62,'Luyện tập chung',['mix',[['place',100000],['bigger',100000],['round',[1000,10000]]]],'chest','wDmkpg4P7mo']]],
 ['Cộng, trừ trong phạm vi 100 000','plusminus',[
  [63,'Phép cộng trong phạm vi 100 000',['add',100000],'plusminus','yxWIi_4HWYY'],
  [64,'Phép trừ trong phạm vi 100 000',['sub',100000],'plusminus','ClKWIeGd1x0'],
  [65,'Luyện tập chung',['mix',[['add',100000],['sub',100000]]],'chest','mi5yITKMtAI']]],
 ['Xem đồng hồ. Tháng – năm. Tiền Việt Nam','clock',[
  [66,'Xem đồng hồ. Tháng – năm',['mix',[['time'],['month']]],'clock','fvujtCLTEzI'],
  [67,'Thực hành xem đồng hồ, xem lịch',['mix',[['time'],['month']]],'calendar','I5SF08_nf70'],
  [68,'Tiền Việt Nam',['money'],'coin','CEBWn6TR9YM'],
  [69,'Luyện tập chung',['mix',[['time'],['month'],['money']]],'chest','bhshZf-LzUY']]],
 ['Nhân, chia trong phạm vi 100 000','muldiv',[
  [70,'Nhân số có năm chữ số với số có một chữ số',['mul',5],'times','yPWWLyNk8Rs'],
  [71,'Chia số có năm chữ số cho số có một chữ số',['div',5],'divide','yTS4Xxmrx00'],
  [72,'Luyện tập chung',['mix',[['mul',5],['div',5]]],'chest','V1ap8FBqeBQ']]],
 ['Làm quen với yếu tố thống kê, xác suất','bars',[
  [73,'Thu thập, phân loại, ghi chép số liệu. Bảng số liệu',['stats'],'bars','rCryFQJwIiw'],
  [74,'Khả năng xảy ra của một sự kiện',['chance'],'dice','S0XEKLPEQ74'],
  [75,'Thực hành và trải nghiệm thu thập, phân loại, ghi chép số liệu, đọc bảng số liệu',['stats'],'bars','JgCbsWtkscs']]],
 ['Ôn tập cuối năm','crown',[
  [76,'Ôn tập các số trong phạm vi 10 000, 100 000',['mix',[['place',10000],['place',100000],['bigger',100000],['round',[1000,10000]]]],'numline','gcdGGNeZewA'],
  [77,'Ôn tập phép cộng, phép trừ trong phạm vi 100 000',['addsub',100000],'plusminus','9vMAETf5of8'],
  [78,'Ôn tập phép nhân, phép chia trong phạm vi 100 000',['mix',[['mul',5],['div',5],['mul',4],['div',4]]],'muldiv','wVANBRTlTEY'],
  [79,'Ôn tập hình học và đo lường',['mix',[['shape'],['solid'],['perim_rect'],['area'],['len'],['mass'],['time']]],'area','wdxcNuUBKZs'],
  [80,'Ôn tập bảng số liệu, khả năng xảy ra của một sự kiện',['mix',[['stats'],['chance']]],'bars','qX7o25gneuA'],
  [81,'Ôn tập chung',['mix',[['addsub',100000],['mul',4],['div',4],['expr'],['frac'],['word2'],['area'],['time'],['money'],['stats']]],'chest','BJUdc1EGVtE']]],
];

const ISLANDS = RAW.map((t, i) => {
  const p = PALETTE[i % PALETTE.length];
  return {
    id:'cd' + (i + 1), title:'Chủ đề ' + (i + 1) + ': ' + t[0], icon:t[1],
    sky:[p[0], p[1]], c1:p[2], c2:p[3], accent:p[4],
    lessons:t[2].map(l => ({c:'b' + l[0], num:l[0], n:l[1], g:l[2], icon:l[3], v:l[4] || '', last:l[3] === 'chest'}))
  };
});

const ALL = [];
ISLANDS.forEach(i => i.lessons.forEach(l => ALL.push(l)));
const byCode = {};
ALL.forEach(l => byCode[l.c] = l);

const BADGES = [
  {em:'leaf', t:'Bài đầu tiên',  need:s => s.done.length >= 1},
  {em:'star', t:'200 sao',       need:s => s.stars >= 200},
  {em:'fire', t:'3 ngày liền',   need:s => activeStreak(s) >= 3},
  {em:'book', t:'5 bài',         need:s => s.done.length >= 5},
  {em:'target', t:'Chính xác 90%', need:s => s.totalQ >= 30 && s.totalCorrect / s.totalQ >= .9},
  {em:'triangle', t:'Xong Hình học', need:s => ISLANDS[2].lessons.every(l => s.done.includes(l.c))},
  {em:'trophy', t:'15 bài',        need:s => s.done.length >= 15},
  {em:'gem', t:'1000 sao',      need:s => s.stars >= 1000},
  {em:'brain', t:'Xong Học kì 1', need:s => ISLANDS.slice(0,7).every(i => i.lessons.every(l => s.done.includes(l.c)))},
  {em:'crown', t:'Trạng nguyên',  need:s => ALL.every(l => s.done.includes(l.c))},
  {em:'rocket', t:'Đúng 100 câu',  need:s => s.totalCorrect >= 100},
  {em:'sparkle', t:'2000 sao',      need:s => s.stars >= 2000},
];

/* ==================== STATE ==================== */
let storageNotice = '';
function readStorage(key){ try { return localStorage.getItem(key); } catch (_) { storageNotice = 'Trình duyệt chưa cho phép lưu. Tiến độ trong phiên này có thể mất khi đóng app.'; return null; } }
function writeStorage(key,value){ try { localStorage.setItem(key,value); return true; } catch (_) { storageNotice = 'Chưa lưu được tiến độ. Hãy giữ trang này mở và kiểm tra dung lượng trình duyệt.'; const el=document.getElementById('app-notice'); if(el){el.textContent=storageNotice;el.hidden=false;} return false; } }
let parentalPassword = readStorage('parentalPassword') || '452012';
const freshState = () => ({version:2,done:[],doneAdv:[],stars:0,streak:0,lastDay:'',totalQ:0,totalCorrect:0});
const DEF = freshState();
function loadState(){
  const raw=readStorage('bb3_state'); if(!raw)return freshState();
  try{
    const data=JSON.parse(raw); if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Invalid state');
    const state=freshState();
    for(const key of ['done','doneAdv'])state[key]=[...new Set(Array.isArray(data[key])?data[key].filter(c=>typeof c==='string'&&byCode[c]):[])];
    for(const key of ['stars','streak','totalQ','totalCorrect'])state[key]=Number.isSafeInteger(data[key])&&data[key]>=0?data[key]:0;
    state.totalCorrect=Math.min(state.totalCorrect,state.totalQ);
    state.lastDay=typeof data.lastDay==='string'&&!Number.isNaN(Date.parse(data.lastDay))?data.lastDay:'';
    if(!state.lastDay)state.streak=0;
    return state;
  }catch(_){writeStorage('bb3_state_recovery',raw);storageNotice='Dữ liệu tiến độ bị lỗi. App đã giữ một bản khôi phục và mở phiên học mới.';return freshState();}
}
let S = loadState();
function dayLabel(offset=0){const d=new Date();d.setDate(d.getDate()+offset);return d.toDateString();}
function activeStreak(state=S){return [dayLabel(),dayLabel(-1)].includes(state.lastDay)?state.streak:0;}
const escapeText = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let quizMode = 'thuong';
const saveState = () => writeStorage('bb3_state', JSON.stringify(S));

let quizQs = [], quizHistory = [], quizCode = 'b1';
let qIndex = 0, answer = '', gained = 0, TOTALQ = 10;
let reviewMode = false, wrongIdx = [], reviewPtr = 0, currentQ = null, activeLesson = null;
let subs = [], act = 0, links = [], selLeft = null;
let devMode = readStorage('bb3_dev') === '1';
let submissionLocked=false, quizFinished=false, victoryTimer=null, screenVersion=0;
const celebrate = options => { if(typeof window.confetti==='function')window.confetti(options); };
const shuffle = values => { const out=[...values];for(let i=out.length-1;i>0;i--){const j=R(0,i);[out[i],out[j]]=[out[j],out[i]];}return out; };

/* ==================== HELPERS ==================== */
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = a => a[Math.floor(Math.random() * a.length)];
const nf = n => n.toLocaleString('vi-VN');

/* ==================== ĐỌC SỐ TIẾNG VIỆT (đến 1 000) ==================== */
const DV = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
function readNum(n){
  if (n === 1000) return 'một nghìn';
  if (n < 10) return DV[n];
  if (n < 100){
    const c = Math.floor(n / 10), d = n % 10;
    const s = c === 1 ? 'mười' : DV[c] + ' mươi';
    if (d === 0) return s;
    if (d === 1) return s + (c === 1 ? ' một' : ' mốt');
    if (d === 4) return s + (c === 1 ? ' bốn' : ' tư');
    if (d === 5) return s + ' lăm';
    return s + ' ' + DV[d];
  }
  const t = Math.floor(n / 100), r = n % 100;
  const s = DV[t] + ' trăm';
  if (r === 0) return s;
  if (r < 10) return s + ' linh ' + DV[r];
  return s + ' ' + readNum(r);
}
function readAlts(n){
  const base = readNum(n);
  let out = [base];
  const swap = (arr, a, b) => arr.concat(arr.filter(s => s.includes(a)).map(s => s.split(a).join(b)));
  out = swap(out, ' mốt', ' một');
  out = swap(out, ' tư', ' bốn');
  out = swap(out, ' lăm', ' năm');
  out = swap(out, ' linh ', ' lẻ ');
  return [...new Set(out)];
}

function sumForm(n){
  const t = Math.floor(n/100)*100, c = Math.floor(n/10)%10*10, d = n%10;
  return [t, c, d].filter(x => x > 0).join(' + ');
}

/* ==================== KHỐI DỰNG GIAO DIỆN KIỂU SGK ==================== */
const QB = '<input class="qin" data-b="0" inputmode="numeric" pattern="[0-9]*" placeholder="?">';

/* tranh minh hoạ vẽ tay bằng SVG */
const ART = {
  pig: (fill, spot) => `<svg class="art-pig" viewBox="0 0 90 66">
    <ellipse cx="45" cy="40" rx="30" ry="19" fill="${fill}" stroke="#8a6a5e" stroke-width="2"/>
    <circle cx="72" cy="33" r="13" fill="${fill}" stroke="#8a6a5e" stroke-width="2"/>
    <ellipse cx="82" cy="35" rx="6" ry="5" fill="#ffb3c6" stroke="#8a6a5e" stroke-width="1.6"/>
    <circle cx="80" cy="34" r="1.2" fill="#7a5c52"/><circle cx="84" cy="34" r="1.2" fill="#7a5c52"/>
    <circle cx="70" cy="28" r="1.8" fill="#4a3b36"/>
    <path d="M63 22 l7 -8 4 9z" fill="${fill}" stroke="#8a6a5e" stroke-width="2"/>
    <path d="M28 52v9M42 55v8M56 54v8M20 40q-8 -4 -6 -11" stroke="#8a6a5e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    ${spot ? '<ellipse cx="40" cy="34" rx="8" ry="6" fill="#5b5b66" opacity=".75"/><ellipse cx="56" cy="45" rx="6" ry="4" fill="#5b5b66" opacity=".75"/>' : ''}
  </svg>`,
  turtleOld: `<svg class="art-sm" viewBox="0 0 60 44">
    <ellipse cx="30" cy="24" rx="19" ry="14" fill="#8ce99a" stroke="#2f9e44" stroke-width="2"/>
    <path d="M18 20h24M30 11v26" stroke="#2f9e44" stroke-width="1.6"/>
    <circle cx="52" cy="20" r="7" fill="#b2f2bb" stroke="#2f9e44" stroke-width="2"/>
    <circle cx="54" cy="18" r="1.5" fill="#2b6a35"/>
    <path d="M14 36l-3 5M44 36l3 5" stroke="#2f9e44" stroke-width="3" stroke-linecap="round"/></svg>`,
  rabbitOld: `<svg class="art-sm" viewBox="0 0 44 52">
    <ellipse cx="22" cy="36" rx="13" ry="13" fill="#fff" stroke="#9a8fb5" stroke-width="2"/>
    <ellipse cx="15" cy="12" rx="4.5" ry="11" fill="#fff" stroke="#9a8fb5" stroke-width="2"/>
    <ellipse cx="29" cy="12" rx="4.5" ry="11" fill="#fff" stroke="#9a8fb5" stroke-width="2"/>
    <ellipse cx="15" cy="13" rx="2" ry="7" fill="#ffc9d8"/><ellipse cx="29" cy="13" rx="2" ry="7" fill="#ffc9d8"/>
    <circle cx="17" cy="34" r="1.8" fill="#5b5170"/><circle cx="27" cy="34" r="1.8" fill="#5b5170"/>
    <path d="M22 39l-2 2h4z" fill="#ff8fab"/></svg>`,
  turtle: `<svg class="art-sm turtle" viewBox="0 0 78 50">
    <ellipse cx="34" cy="30" rx="24" ry="15" fill="#7cc47f" stroke="#3f7a45" stroke-width="2"/>
    <path d="M14 28h40M34 15v30M22 19l6 8M46 19l-6 8M22 41l6-8M46 41l-6-8" stroke="#3f7a45" stroke-width="1.6" fill="none"/>
    <ellipse cx="34" cy="30" rx="15" ry="9" fill="#a5d6a7" opacity=".55"/>
    <path d="M60 26q8-2 10 4t-6 6" fill="#9ede9e" stroke="#3f7a45" stroke-width="2"/>
    <circle cx="66" cy="28" r="1.6" fill="#2c5c31"/>
    <path d="M16 42l-5 5M50 42l5 5M12 34l-6 2" stroke="#3f7a45" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  rabbit: `<svg class="art-sm rabbit" viewBox="0 0 52 62">
    <ellipse cx="26" cy="44" rx="15" ry="15" fill="#fff" stroke="#8f86ad" stroke-width="2"/>
    <ellipse cx="17" cy="16" rx="5" ry="14" fill="#fff" stroke="#8f86ad" stroke-width="2"/>
    <ellipse cx="35" cy="16" rx="5" ry="14" fill="#fff" stroke="#8f86ad" stroke-width="2"/>
    <ellipse cx="17" cy="17" rx="2.2" ry="9" fill="#ffc6d6"/>
    <ellipse cx="35" cy="17" rx="2.2" ry="9" fill="#ffc6d6"/>
    <circle cx="20" cy="42" r="2" fill="#5b5170"/><circle cx="32" cy="42" r="2" fill="#5b5170"/>
    <path d="M26 47l-2.5 2.5h5z" fill="#ff9ab5"/>
    <path d="M22 52q4 3 8 0" stroke="#8f86ad" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <circle cx="14" cy="49" r="3" fill="#ffd9e4" opacity=".8"/><circle cx="38" cy="49" r="3" fill="#ffd9e4" opacity=".8"/>
  </svg>`,
  turtleV: i => {
    const shell = ['#4e7d33','#5f8d3c','#436f2c','#6d8f3c'][i % 4];
    const dark  = ['#2f4d1f','#3a5723','#26401a','#455c22'][i % 4];
    const skin  = ['#a8cf7a','#b6d888','#9cc46e','#bcdc8f'][i % 4];
    return `<svg class="art-sm turtle" viewBox="0 0 120 80">
      <ellipse cx="55" cy="70" rx="40" ry="5" fill="rgba(60,40,20,.12)"/>
      <path d="M20 46q6 16 16 14t8-14z" fill="${skin}" stroke="${dark}" stroke-width="2.2"/>
      <path d="M58 46q6 16 16 14t8-14z" fill="${skin}" stroke="${dark}" stroke-width="2.2"/>
      <path d="M14 47q3-30 42-30t40 30z" fill="${shell}" stroke="${dark}" stroke-width="2.6"/>
      <path d="M30 24l5 22M55 17v29M80 24l-4 22M20 34h72" stroke="${dark}" stroke-width="1.8" fill="none" opacity=".75"/>
      <ellipse cx="55" cy="49" rx="43" ry="7" fill="${skin}" stroke="${dark}" stroke-width="2.4"/>
      <path d="M96 40q16-4 18 6t-13 8q-8 1-10-5z" fill="${skin}" stroke="${dark}" stroke-width="2.4"/>
      <circle cx="106" cy="45" r="2" fill="#22331c"/>
      <path d="M101 51q4 1 6-1" stroke="${dark}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M13 43q-8-2-10 3t7 4" fill="${skin}" stroke="${dark}" stroke-width="2.2"/>
    </svg>`;
  },
  rabbitPart: `<ellipse cx="34" cy="12" rx="6" ry="15" fill="#fff" stroke="#8c84a6" stroke-width="2"/>
    <ellipse cx="52" cy="12" rx="6" ry="15" fill="#fff" stroke="#8c84a6" stroke-width="2"/>
    <ellipse cx="34" cy="13" rx="2.6" ry="9.5" fill="#ffc9d8"/><ellipse cx="52" cy="13" rx="2.6" ry="9.5" fill="#ffc9d8"/>
    <circle cx="43" cy="40" r="18" fill="#fff" stroke="#8c84a6" stroke-width="2"/>
    <circle cx="36" cy="37" r="2.2" fill="#4d4463"/><circle cx="50" cy="37" r="2.2" fill="#4d4463"/>
    <path d="M43 44l-3 3h6z" fill="#ff96b3"/>
    <path d="M38 50q5 4 10 0" stroke="#8c84a6" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="46" r="3.4" fill="#ffd6e2" opacity=".85"/><circle cx="56" cy="46" r="3.4" fill="#ffd6e2" opacity=".85"/>`,
  robot: `<svg class="art-sm" viewBox="0 0 46 56">
    <rect x="8" y="14" width="30" height="26" rx="9" fill="#eaf3ff" stroke="#5b7fa8" stroke-width="2"/>
    <circle cx="18" cy="27" r="5" fill="#fff" stroke="#5b7fa8" stroke-width="2"/>
    <circle cx="30" cy="27" r="5" fill="#fff" stroke="#5b7fa8" stroke-width="2"/>
    <circle cx="19" cy="27" r="2.2" fill="#2f4a66"/><circle cx="31" cy="27" r="2.2" fill="#2f4a66"/>
    <path d="M23 14V7M18 44h10M14 47h18" stroke="#5b7fa8" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="23" cy="5" r="2.6" fill="#ffb03a"/>
    <rect x="2" y="22" width="6" height="10" rx="3" fill="#cfe3f7" stroke="#5b7fa8" stroke-width="1.8"/>
    <rect x="38" y="22" width="6" height="10" rx="3" fill="#cfe3f7" stroke="#5b7fa8" stroke-width="1.8"/></svg>`
};

function blocks(t, c, d){
  let h = '<div class="blocks">';
  h += '<div class="bgroup">' + '<span class="hund"></span>'.repeat(t) + '</div>';
  h += '<div class="bgroup">' + '<span class="tenbar"></span>'.repeat(c) + '</div>';
  h += '<div class="bgroup units">' + '<span class="unit"></span>'.repeat(d) + '</div>';
  return h + '</div>';
}
function table(cls, head, rows){
  return `<div class="tbl-wrap"><table class="tbl ${cls}"><tr>${
    head.map(x => `<th>${x}</th>`).join('')}</tr>${
    rows.map(r => `<tr>${r.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
function chain(items, shape){
  return `<div class="chain ${shape || ''}">${items.map(x =>
    `<span class="cnode${x === '?' ? ' q' : ''}">${x === '?' ? QB : x}</span>`).join('')}</div>`;
}
function ruler(items, hi){
  return `<div class="ruler">${items.map((x, i) =>
    `<span class="rk${i === hi ? ' hi' : ''}"><i></i><b>${x === '?' ? QB : x}</b></span>`).join('')}</div>`;
}
function noteBox(t){ return `<div class="note">${t}</div>`; }
function speech(t){ return `<div class="speech">${t}</div>`; }

/* ==================== NGÂN HÀNG BÀI TẬP — BÀI 1 (SGK trang 6, 7, 8) ====================
   Mỗi câu là NGUYÊN một bài trong sách, nhiều ô "?" điền trực tiếp.
======================================================================================= */
function Q(no, cmd){
  const B = [];
  const inp = (i, cls, extra) =>
    `<input class="${cls}" data-b="${i}" ${cls.includes('qtxt') ? '' : 'inputmode="numeric" pattern="[0-9]*"'} ${extra || ''} placeholder="?">`;
  return {
    B,
    num(v, len){ B.push({a:String(v), len:len || String(v).length}); return inp(B.length - 1, 'qin'); },
    txt(n){ B.push({a:readNum(n), alts:readAlts(n), text:true}); return inp(B.length - 1, 'qin qtxt'); },
    pick(a, opts){
      opts=[...opts]; a=String(a).split(',').filter(Boolean).sort().join(',');
      if(!a){a='Không có đáp án nào';if(!opts.includes(a))opts.push(a);}
      B.push({a, pickList:opts, multiple:a.split(',').length>1});
      const i = B.length - 1;
      return '<span class="picker" role="group" aria-label="Lựa chọn đáp án" data-b="' + i + '">' +
        opts.map(o => '<button type="button" class="pk" data-b="' + i + '" data-v="' + o + '">' + o + '</button>').join('') + '</span>'; },
    sign(a){ B.push({a, sign:true}); return `<button type="button" class="qsign" data-b="${B.length - 1}">?</button>`; },
    done(body, e, extra){ return Object.assign({no, cmd, type:'multi', blanks:B, body, a:B.map(x => x.a).join('|'), e}, extra || {}); }
  };
}

ART.slot = kind => {
  const R = ART.rabbitPart;
  if (kind === 'basket') return `<svg viewBox="0 0 170 150" class="slot-art">
    <g transform="translate(42,4) scale(1.05)">${R}</g>
    <path d="M18 66h134l-14 74H32z" fill="#e3b378" stroke="#95602f" stroke-width="3"/>
    <path d="M18 66h134" stroke="#95602f" stroke-width="5" stroke-linecap="round"/>
    <path d="M24 90h122M28 114h114" stroke="#b07d43" stroke-width="2.4"/>
    <path d="M44 66l5 74M85 66v74M126 66l-5 74" stroke="#b07d43" stroke-width="2.2" opacity=".85"/>
  </svg>`;
  if (kind === 'carrot') return `<svg viewBox="0 0 200 150" class="slot-art">
    <g transform="translate(112,10) scale(1.05)">${R}</g>
    <path d="M16 92q-8 4-4 12t14 4l120-14 4-26-124 12z" fill="#ff9f2e" stroke="#cf6f16" stroke-width="3"/>
    <path d="M150 68l18-16 2 16 16 6-18 14z" fill="#5fbb46" stroke="#3a862a" stroke-width="2.6"/>
    <path d="M44 92l4 14M74 88l4 14M104 84l4 14" stroke="#cf6f16" stroke-width="2.4" opacity=".9"/>
  </svg>`;
  if (kind === 'board') return `<svg viewBox="0 0 200 150" class="slot-art">
    <g transform="translate(124,6) scale(1.05)">${R}</g>
    <rect x="12" y="62" width="132" height="66" rx="7" fill="#fff" stroke="#5b86bd" stroke-width="3.5"/>
    <rect x="20" y="70" width="116" height="50" rx="4" fill="#eef5ff"/>
  </svg>`;
  return `<svg viewBox="0 0 190 160" class="slot-art">
    <g transform="translate(116,2) scale(1.05)">${R}</g>
    <rect x="12" y="50" width="122" height="98" rx="5" fill="#fff" stroke="#b98a55" stroke-width="3.5"/>
    <path d="M12 64h122" stroke="#e8d6bd" stroke-width="2.4"/>
  </svg>`;
};

const BOX_COLORS = ['#2f7d32', '#1f63b8', '#2b3a8f', '#8f2f2f'];


const BANKS = {};
const ADV = {};
function generateAdv(code){return (ADV[code]||[]).map((fn,i)=>prepareQuestion(fn(),code,i,'advanced'));}
function generateQuestions(code,count=10){const bank=BANKS[code]||[];if(!bank.length)return [];return Array.from({length:count},(_,i)=>prepareQuestion(bank[i%bank.length](),code,i%bank.length));}

// Two focused questions per skill, then five mixed questions from the full bank.
function skillGroup(lesson){
  const classify=key=>/stats|chance/.test(key)?'data':/time|month|money|len|mass|cap|temp/.test(key)?'measure':/shape|solid|circle|mid|perim|area/.test(key)?'geometry':/place|bigger|roman|round/.test(key)?'numbers':'operations';
  const domains=spec=>spec[0]==='mix'?spec[1].flatMap(domains):[classify(spec[0])];
  const groups=[...new Set(domains(lesson.g))];return groups.length===1?groups[0]:'mixed';
}
function prepareQuestion(item,code,index,mode='normal'){
  const plain=t=>String(t||'').replace(/<[^>]*>/g,' ').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
  return {...item,id:code+'-'+mode+'-'+(index+1),lessonCode:code,skill:skillGroup(byCode[code]),source:'.sgk/'+(mode==='normal'?'banks':'banks-adv')+'/'+code+'.js',q:plain(item.cmd)+' — '+plain(item.body),a:String(item.a),explanation:item.e,blanks:item.blanks||[]};
}
function generateFinal(){
  const groups={numbers:[],operations:[],geometry:[],measure:[],data:[]},all=[];
  ALL.forEach(l=>BANKS[l.c].forEach((fn,index)=>{const item={fn,index,code:l.c};all.push(item);if(groups[skillGroup(l)])groups[skillGroup(l)].push(item);}));
  const selected=Object.entries(groups).flatMap(([section,items])=>shuffle(items).slice(0,2).map(x=>({...x,section})));
  const ids=new Set(selected.map(x=>x.code+':'+x.index));
  selected.push(...shuffle(all.filter(x=>!ids.has(x.code+':'+x.index))).slice(0,5).map(x=>({...x,section:'mixed'})));
  return shuffle(selected.map(x=>({...prepareQuestion(x.fn(),x.code,x.index),examSection:x.section})));
}
