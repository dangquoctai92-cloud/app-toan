const fs=require('fs');
function edit(p,fn){fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')))}
function rep(s,a,b){if(!s.includes(a))throw Error('Missing '+a.slice(0,70));return s.replace(a,b)}
edit('.sgk/build.cjs',s=>rep(s,"const html=read('src/index.template.html')","css+='\\n'+read('src/interface.css');\nconst html=read('src/index.template.html')"));
const buddy=`function buddyArt(){return \`<svg viewBox="0 0 220 220" aria-hidden="true" focusable="false">
<circle cx="111" cy="117" r="86" fill="#d8ece1"/><path d="M29 180q81-18 162 0" fill="none" stroke="#bed7ca" stroke-width="3" stroke-linecap="round"/>
<g stroke="#405b52" stroke-width="3" stroke-linejoin="round">
<path d="M79 99C59 58 57 17 76 15c19-2 26 45 24 74M119 89c-1-47 12-76 29-68s8 50-11 80" fill="#fffdf8"/>
<path d="M81 75C71 43 70 29 77 29s13 26 13 48M129 75c2-24 8-39 14-36s0 28-6 40" fill="#edbab5" stroke="none"/>
<path d="M70 146q-16 9-17 40h111q-2-32-24-40" fill="#f8d780"/>
<path d="M64 104q2-28 42-28t47 28q18 47-41 53-63-1-48-53z" fill="#fffdf8"/>
<path d="M87 113v5m40-5v5" stroke-linecap="round" stroke-width="5"/>
<ellipse cx="78" cy="127" rx="9" ry="5" fill="#f3c9be" stroke="none"/><ellipse cx="137" cy="127" rx="9" ry="5" fill="#f3c9be" stroke="none"/>
<path d="m104 126 5 3 5-3m-5 3v5m-7-1q7 9 14 0" fill="none" stroke-width="2.5" stroke-linecap="round"/>
<path d="M50 155q30-8 59 5 29-13 59-5v40q-30-8-59 4-29-12-59-4z" fill="#82b6a3"/><path d="M109 160v39" fill="none"/>
<path d="M62 168q17-2 34 4m-34 7q17-2 34 4m24-11q17-6 34-4m-34 15q17-6 34-4" stroke="#dff1e8" stroke-width="3" fill="none" stroke-linecap="round"/>
<ellipse cx="52" cy="174" rx="10" ry="13" fill="#fffdf8"/><ellipse cx="168" cy="174" rx="10" ry="13" fill="#fffdf8"/>
</g><path d="m177 44 3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="#d4b556"/><circle cx="33" cy="103" r="4" fill="#bcaed4"/>
</svg>\`;}
`;
edit('src/app.js',s=>{
s=rep(s,'/* ==================== MAP ==================== */',buddy+'\n/* ==================== MAP ==================== */');
const a=s.indexOf('  if(next){const resume=');const b=s.indexOf('  let firstTodo',a);if(a<0||b<0)throw Error('hero anchor');
s=s.slice(0,a)+`  const welcome=document.createElement('div');welcome.className='welcome-card';
  welcome.innerHTML=\`<div class="welcome-copy"><span class="eyebrow">Góc học toán · Lớp 3</span><h1>Chào Bông!<br>Mình cùng học nhé.</h1><p>Mỗi bài học là một khám phá nhỏ.</p><div id="welcome-action"></div></div><div class="welcome-buddy">\${buddyArt()}<span>Bạn thỏ học cùng con</span></div>\`;
  if(next){const resume=document.createElement('button');resume.className='continue-card';resume.innerHTML=ic('book')+'<span>'+(S.done.length?'Học tiếp cùng thỏ':'Bắt đầu học')+'</span><span aria-hidden="true">→</span>';resume.onclick=()=>startLesson(next.c);welcome.querySelector('#welcome-action').appendChild(resume);const caption=document.createElement('p');caption.className='next-lesson';caption.textContent='Bài '+next.num+' · '+next.n;welcome.querySelector('#welcome-action').appendChild(caption);}
  else{welcome.querySelector('#welcome-action').innerHTML='<p class="all-done">Con đã học xong 81 bài! Chọn một bài bên dưới để ôn lại nhé.</p>';}
  wrap.appendChild(welcome);
  const heading=document.createElement('div');heading.className='journey-heading';heading.innerHTML='<div><span class="eyebrow">Từng bước nhỏ</span><h2>Hành trình của con</h2></div><span class="journey-count">'+S.done.length+' / '+ALL.length+' bài đã xong</span>';wrap.appendChild(heading);
`+s.slice(b);
s=rep(s,"'Chinh phục từng bài nhé!'","doneCount+' / '+items.length+' bài đã hoàn thành'");
const x=s.indexOf('      const disc =');const y=s.indexOf('      t.onclick',x);if(x<0||y<0)throw Error('tile anchor');
s=s.slice(0,x)+`      const status=soon?'Sắp có':S.doneAdv.includes(l.c)?'Đã xong nâng cao':done?'Đã hoàn thành':isNow?'Học tiếp':l.last?'Cùng ôn lại':'Khám phá';
      t.innerHTML=\`<span class="disc">\${ic(done?'check':l.icon)}</span><span class="tile-copy"><span class="no">Bài \${l.num}</span><span class="nm">\${l.n}</span><span class="tile-status">\${status}</span></span><span class="tile-arrow" aria-hidden="true">→</span>\`;
`+s.slice(y);
s=rep(s,"? 'Bài tiếp theo →' : 'Xem kết quả'","? 'Câu tiếp theo →' : 'Xem điểm của con'");
s=rep(s,'// Decoration is disabled during study',"document.querySelectorAll('[data-buddy]').forEach(el=>el.innerHTML=buddyArt());\n// Decoration is disabled during study");
return s;});
edit('src/index.template.html',s=>{
s=s.replaceAll('<span>Bé Bông</span>','<span>Bông học toán<small>Mỗi ngày một khám phá</small></span>').replaceAll('data-ic="crown"></span><span>Bông','data-ic="book"></span><span>Bông');
s=s.replaceAll('>Hồ sơ</button>','>Góc của con</button>').replace('>Cài đặt</button>','>Dành cho ba mẹ</button>');
s=s.replace('Kỳ Thi Trạng Nguyên Toán 3','Thử thách cuối hành trình');
s=rep(s,'<div class="score-hero">','<div class="score-hero"><div class="score-buddy" data-buddy aria-hidden="true"></div><span class="eyebrow">Thêm một bước tiến nhỏ</span><h1>Con đã hoàn thành!</h1>');
s=rep(s,'<b id="summary-big">0/10</b>','<b id="summary-big">0/10</b>');
s=rep(s,'<p id="summary-score">','<p class="score-caption">Số câu con làm đúng</p><p id="summary-score">');
s=s.replace('stroke="rgba(255,255,255,.35)" stroke-width="13"','stroke="#e8eee8" stroke-width="13"');
s=s.replace('onclick="goMap()">Về bản đồ</button>','onclick="goMap()">Về bản đồ</button>');
s=s.replace('<h2>Bé Bông</h2>','<h2>Góc nhỏ của Bông</h2>').replace('Học sinh lớp 3 · Nhà thám hiểm Toán học','Mỗi điều con học được đều đáng tự hào.');
s=s.replace('class="back" onclick="goMap()" data-ic="back"','class="back" onclick="goMap()" aria-label="Về danh sách bài học" data-ic="back"');
return s;});
