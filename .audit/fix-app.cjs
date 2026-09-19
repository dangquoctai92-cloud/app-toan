const fs=require('fs');let s=fs.readFileSync('src/app.js','utf8');
function one(a,b){if(!s.includes(a))throw Error('Missing '+a.slice(0,70));s=s.replace(a,b);}
function range(a,b,value){const i=s.indexOf(a),j=s.indexOf(b,i);if(i<0||j<0)throw Error('range '+a);s=s.slice(0,i)+value+'\n\n'+s.slice(j);}
one("function showScreen(id){","function showScreen(id){\n  screenVersion++; clearTimeout(victoryTimer); victoryTimer=null;\n  document.getElementById('victory-overlay').classList.remove('show');");
one("wrap.innerHTML = '';\n  let firstTodo",`wrap.innerHTML = '';
  const next=ALL.find(l=>!S.done.includes(l.c));
  if(next){const resume=document.createElement('button');resume.className='continue-card';resume.textContent='Học tiếp · Bài '+next.num+': '+next.n;resume.onclick=()=>startLesson(next.c);wrap.appendChild(resume);}
  let firstTodo`);
one("sec.innerHTML = `<div class=\"island-head\">","sec.innerHTML = `<div class=\"island-head\" role=\"button\" tabindex=\"0\" aria-expanded=\"false\" aria-controls=\"grid-${island.id}\">");
one('<div class="grid"></div>`;','<div class="grid" id="grid-${island.id}"></div>`;');
one("sec.classList.toggle('collapsed', !open);","sec.classList.toggle('collapsed', !open);\n      document.querySelectorAll('.island').forEach(x=>x.querySelector('.island-head').setAttribute('aria-expanded',String(!x.classList.contains('collapsed'))));");
one("if (!wasNow) sec.classList.add('collapsed');",`if (!wasNow) sec.classList.add('collapsed');
    const head=sec.querySelector('.island-head');head.setAttribute('aria-expanded',String(wasNow));
    head.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();head.click();}};`);
one("const tag = soon ? '<span class=\"soon-tag\">SẮP CÓ</span>'\n        : (adv ? '<span class=\"adv-tag\">NÂNG CAO</span>' : '');",`const tag = soon ? '<span class="soon-tag">SẮP CÓ</span>' : S.doneAdv.includes(l.c) ? '<span class="adv-tag">ĐÃ XONG NÂNG CAO</span>' : done ? '<span class="adv-tag">ĐÃ XONG CƠ BẢN</span>' : '';`);
s=s.replace(/innerText = S\.streak;/g,'innerText = activeStreak();');
one("const d = document.createElement('div');\n    d.className = 'badge'", "const d = document.createElement('button');\n    d.type='button';\n    d.className = 'badge'");
one("d.innerHTML = ic(b.em);\n    d.title = b.t;", "d.innerHTML = ic(b.em) + '<span class=\"badge-label\">'+escapeText(b.t)+'</span>';\n    d.title = b.t;d.setAttribute('aria-label',b.t+(b.need(S)?' · Đã đạt':' · Chưa đạt'));d.onclick=()=>alert(b.t+(b.need(S)?' · Con đã đạt huy hiệu này.':' · Tiếp tục luyện tập để mở huy hiệu này.'));");
one("Object.keys(BANKS).forEach(c => quizQs.push(...generateQuestions(c, 5)));\n    quizQs = quizQs.sort(() => Math.random() - .5).slice(0, 15);",`quizQs = generateFinal();`);
one("TOTALQ = quizQs.length;","if(!quizQs.length){alert('Chưa tạo được đề. Con thử mở bài lại nhé.');return;}\n  quizFinished=false;submissionLocked=false;\n  TOTALQ = quizQs.length;");
one("function loadQuestion(){","function loadQuestion(){\n  const screen=document.getElementById('quiz-screen');if(screen)screen.scrollTop=0;");
one("document.getElementById('q-index').innerText = qIndex + 1;",`document.getElementById('q-index').innerText = qIndex + 1;
  let status=document.getElementById('answer-status');if(!status){status=document.createElement('p');status.id='answer-status';status.className='answer-status';status.setAttribute('role','status');document.getElementById('question-box').appendChild(status);}status.textContent='';
  const lesson=document.getElementById('lesson-label');if(lesson)lesson.textContent=quizCode==='final'?'Thử thách cuối năm':('Bài '+byCode[quizCode].num+' · '+byCode[quizCode].n);`);
one("const w = bodyEl.clientWidth;", "const w = bodyEl.clientWidth;\n    bodyEl.querySelectorAll('.tbl-wrap').forEach(el=>{if(el.scrollWidth>el.clientWidth+4){el.setAttribute('tabindex','0');el.setAttribute('aria-label','Bảng có thể cuộn ngang');if(!el.previousElementSibling?.classList.contains('scroll-hint')){const hint=document.createElement('p');hint.className='scroll-hint';hint.textContent='Vuốt bảng sang ngang để xem và điền các cột còn lại';el.before(hint);}}});");
one("const len = Math.max(bl.len || 3, String(bl.a == null ? '' : bl.a).length);", "const len = Math.max(bl.len || 3, String(bl.a == null ? '' : bl.a).length);\n    inp.setAttribute('aria-label',(bl.text?'Cách đọc số':'Đáp án')+' · ô '+(i+1));inp.autocomplete='off';");
one("if (ev.key === 'Enter'){ ev.preventDefault(); submitAnswer(); }","if (ev.key === 'Enter'){ ev.preventDefault(); ev.stopPropagation(); if(!ev.isComposing)submitAnswer(); }");
one("btn.classList.toggle('on', cur.includes(v));", "btn.classList.toggle('on', cur.includes(v));\n    btn.setAttribute('aria-pressed',String(cur.includes(v)));btn.classList.toggle('word-option',String(v).length>2);");
one("const set = new Set((subs[i] || '').split(',').filter(Boolean));\n      set.has(v) ? set.delete(v) : set.add(v);", "const set = new Set((subs[i] || '').split(',').filter(Boolean));\n      if(currentQ.blanks[i].multiple === false){set.clear();set.add(v);}else{set.has(v) ? set.delete(v) : set.add(v);}");
one("btn.classList.add('filled');", "btn.classList.add('filled');btn.setAttribute('aria-label','Dấu so sánh ô '+(i+1)+': '+subs[i]);");
one("btn.innerText = subs[i] || '?';", "btn.innerText = subs[i] || '?';btn.setAttribute('aria-label','Dấu so sánh ô '+(i+1)+': '+(subs[i]||'chưa chọn'));");
one("if (first && !reviewMode) setTimeout(() => first.focus({preventScroll:true}), 60);", "// Keep touch keyboards closed until the learner taps an input.\n  if(first && !reviewMode && window.matchMedia('(pointer:fine)').matches)first.focus({preventScroll:true});");
range('const norm =','function feedback(ok){',`const norm = s => String(s ?? '').normalize('NFC').toLowerCase().trim().replace(/\\s+/g,' ');
function matchBlank(b,v){
  if(b.pickList)return [...new Set(String(v??'').split(',').filter(Boolean))].sort().join(',')===String(b.a).split(',').filter(Boolean).sort().join(',');
  if(b.text)return (b.alts||[b.a]).some(x=>norm(x)===norm(v));
  return /^[0-9]+$/.test(String(b.a)) ? /^[0-9]+$/.test(String(v).trim())&&Number(v)===Number(b.a) : String(v).trim()===String(b.a).trim();
}
function collectResponse(){
  const B=currentQ.blanks||[];
  const values=B.map((_,i)=>String(subs[i]??'').trim());
  const missing=B.map((_,i)=>i).filter(i=>!values[i]);
  if(B.length)return {complete:!missing.length,missing,values,answer:values.join('|'),marks:B.map((b,i)=>matchBlank(b,values[i]))};
  return {complete:!!answer,missing:[],values:[answer],answer,marks:[String(answer)===String(currentQ.a)]};
}
function responseNotice(text){const el=document.getElementById('answer-status');if(el)el.textContent=text;}
function validateResponse(r){
  document.querySelectorAll('#q-body [data-b]').forEach(el=>{const missing=r.missing.includes(+el.dataset.b);el.classList.toggle('answer-missing',missing);el.setAttribute('aria-invalid',String(missing));});
  if(r.complete)return true;
  responseNotice('Con còn '+(r.missing.length||1)+' ô chưa trả lời. Điền đủ rồi thử lại nhé.');
  const target=document.querySelector('#q-body .answer-missing');if(target){target.scrollIntoView({block:'center',behavior:'smooth'});target.focus({preventScroll:true});}return false;
}
function saveReviewResponse(r){
  const entry=quizHistory[qIndex];entry.reviewAnswer=r.answer;entry.reviewCorrect=r.complete&&r.marks.every(Boolean);entry.reviewMarks=r.marks;
}
function submitAnswer(){
  if(!currentQ||submissionLocked||(!reviewMode&&quizFinished))return false;
  if(!document.getElementById('quiz-screen').classList.contains('active'))return false;
  const r=collectResponse();if(!validateResponse(r))return false;
  answer=r.answer;const ok=r.marks.every(Boolean);
  if(reviewMode){saveReviewResponse(r);document.querySelectorAll('#q-body [data-b]').forEach(el=>{const i=+el.dataset.b;el.classList.toggle('answer-wrong',r.marks[i]===false);el.classList.toggle('answer-right',r.marks[i]===true);el.setAttribute('aria-invalid',String(r.marks[i]===false));});responseNotice(ok?'Đúng rồi! Con có thể sang câu tiếp theo.':'Còn '+r.marks.filter(x=>!x).length+' ô chưa đúng. Con thử lại nhé.');feedback(ok);return true;}
  submissionLocked=true;requestAnimationFrame(()=>submissionLocked=false);
  quizHistory.push({idx:qIndex+1,question:currentQ.q,userAnswer:r.answer,correctAnswer:currentQ.a,isCorrect:ok,marks:r.marks,explanation:currentQ.explanation});
  answer='';if(qIndex<TOTALQ-1){qIndex++;updateProgress();loadQuestion();}else{updateProgress(true);finishQuiz();}return true;
}`);
one("function finishQuiz(){", "function finishQuiz(){\n  if(quizFinished)return;quizFinished=true;");
one("  refreshHeader();\n  S.totalQ += quizHistory.length;", "  S.totalQ += quizHistory.length;");
one("bumpStreak(); saveState();", "bumpStreak(); saveState();refreshHeader();");
range('function bumpStreak(){','function showSummary(){',`function bumpStreak(){const today=dayLabel();if(S.lastDay===today)return;S.streak=S.lastDay===dayLabel(-1)?S.streak+1:1;S.lastDay=today;}`);
range('function showSummary(){','/* ==================== OVERLAYS / SETTINGS ==================== */',`function showSummary(){
  const total=quizHistory.length,correct=quizHistory.filter(h=>h.isCorrect).length;
  const revised=quizHistory.filter(h=>!h.isCorrect&&h.reviewCorrect).length;
  document.getElementById('summary-big').textContent=correct+'/'+total;
  document.getElementById('summary-score').textContent=correct===total?'Con đã làm đúng hết trong lần đầu!':correct>=total*.7?'Con làm tốt rồi. Mình cùng xem lại nhé!':'Mình cùng xem lại và sửa những chỗ chưa đúng nhé.';
  document.getElementById('summary-review').textContent=revised?'Sau khi ôn lại: '+(correct+revised)+'/'+total+' câu đã đúng. Điểm lần đầu được giữ nguyên.':'';
  document.getElementById('score-arc').style.strokeDashoffset=total?415-415*correct/total:415;
  const body=document.getElementById('summary-table-body');body.innerHTML='';
  quizHistory.forEach((it,i)=>{
    const fixed=!it.isCorrect&&it.reviewCorrect;
    const row=document.createElement('div');row.className='row '+(it.isCorrect||fixed?'ok':'no');
    const idx=document.createElement('div');idx.className='idx';idx.textContent=it.idx;
    const content=document.createElement('div');content.className='q';
    const heading=document.createElement('p');heading.textContent='Câu '+it.idx+' · '+(it.isCorrect?'Đúng lần đầu':fixed?'Đã sửa đúng':'Cần xem lại');content.appendChild(heading);
    const user=document.createElement('p');user.textContent='Lần đầu: '+String(it.userAnswer??'Chưa trả lời').split('|').join(' · ');content.appendChild(user);
    if(it.reviewAnswer!=null){const reviewed=document.createElement('p');reviewed.textContent='Ôn lại: '+it.reviewAnswer.split('|').join(' · ');content.appendChild(reviewed);}
    if(!it.isCorrect){const solution=document.createElement('p');solution.className='correct-answer';solution.textContent='Đáp án: '+String(it.correctAnswer??'').split('|').join(' · ');content.appendChild(solution);}
    const details=document.createElement('details');const label=document.createElement('summary');label.textContent='Xem đề và lời giải';details.appendChild(label);
    const q=quizQs[i];
    if(q){const cmd=document.createElement('p');cmd.textContent=String(q.cmd||'').replace(/<[^>]*>/g,'');details.appendChild(cmd);const visual=document.createElement('div');visual.className='summary-question';visual.innerHTML=q.body||'';
      visual.querySelectorAll('input').forEach(input=>{const j=+input.dataset.b;input.value=String((it.reviewAnswer??it.userAnswer??'').split('|')[j]??'');input.readOnly=true;input.tabIndex=-1;});
      visual.querySelectorAll('button').forEach(button=>{button.disabled=true;button.classList.toggle('word-option',(button.dataset.v||'').length>2);});details.appendChild(visual);
    }else{const prompt=document.createElement('p');prompt.textContent=it.question||'';details.appendChild(prompt);}
    if(it.explanation){const exp=document.createElement('p');exp.className='tip';exp.textContent=String(it.explanation).replace(/<[^>]*>/g,' ');details.appendChild(exp);}content.appendChild(details);
    const mark=document.createElement('div');mark.className='mark';mark.innerHTML=ic(it.isCorrect||fixed?'check':'close');row.append(idx,content,mark);body.appendChild(row);
  });
  document.getElementById('retry-btn').classList.toggle('hidden',!quizHistory.some(h=>!h.isCorrect&&!h.reviewCorrect));
  const aa=document.getElementById('adv-after');const showAdv=quizMode==='thuong'&&hasAdv(quizCode);aa.classList.toggle('hidden',!showAdv);if(showAdv)aa.onclick=()=>startQuiz(quizCode,'adv');
  showScreen('summary-screen');
  if(total&&correct===total){celebrate({particleCount:100,spread:90,origin:{y:.4}});}
}
function retryQuiz(){
  wrongIdx=quizHistory.map((it,i)=>!it.isCorrect&&!it.reviewCorrect?i:-1).filter(i=>i>=0);if(!wrongIdx.length)return;
  reviewMode=true;reviewPtr=0;submissionLocked=false;showScreen('quiz-screen');loadReview();
}
function loadReview(){
  qIndex=wrongIdx[reviewPtr];currentQ=quizQs[qIndex];answer=quizHistory[qIndex].reviewAnswer||'';subs=answer?answer.split('|'):[];act=0;links=[];selLeft=null;
  paint();updateProgress();document.getElementById('review-nav').classList.remove('hidden');document.getElementById('quiz-screen').scrollTop=0;
}
function prevReviewQuestion(){if(reviewPtr>0){quizHistory[qIndex].reviewAnswer=collectResponse().answer;reviewPtr--;loadReview();}}
function nextReviewQuestion(){
  if(!reviewMode)return;const r=collectResponse();if(!validateResponse(r))return;saveReviewResponse(r);
  if(reviewPtr<wrongIdx.length-1){reviewPtr++;loadReview();}else{reviewMode=false;showSummary();}
}
`);
s=s.replace("    document.getElementById('gemini-api-key').value = geminiApiKey;\n",'');
s=s.replace("  geminiApiKey = document.getElementById('gemini-api-key').value.trim();\n",'');
s=s.replace("  localStorage.setItem('geminiApiKey', geminiApiKey);\n",'');
s=s.replace(/localStorage\.setItem\(/g,'writeStorage(');
one("S = Object.assign({}, DEF); saveState(); closeSettings(); goMap();", "S=freshState();quizHistory=[];quizQs=[];currentQ=null;reviewMode=false;quizFinished=false;saveState();closeSettings();goMap();");
one("quizHistory = []; quizQs = []; qIndex = 0; reviewMode = false;", "quizHistory = []; quizQs = []; currentQ=null;qIndex = 0; reviewMode = false;submissionLocked=false;");
range("addEventListener('keydown', e => {","/* ==================== PARTICLES ==================== */",`addEventListener('keydown',e=>{
  if(!document.getElementById('quiz-screen').classList.contains('active')||e.defaultPrevented||e.isComposing)return;
  if(devMode&&(e.ctrlKey||e.metaKey)&&e.key==='ArrowRight'){e.preventDefault();skipQuestion();return;}
  if(e.key==='Enter'&&!e.repeat&&!e.target.closest('button,summary,textarea,[role="button"]')){e.preventDefault();submitAnswer();}
});
addEventListener('resize',()=>{if(currentQ&&document.getElementById('m-lines'))requestAnimationFrame(drawFixedLines);});
`);
one("initParticles();", "// Decoration is disabled during study to keep attention on the exercise.\nif(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)initParticles();");
s+='\nif(storageNotice){const notice=document.getElementById(\'app-notice\');notice.textContent=storageNotice;notice.hidden=false;}\n';
fs.writeFileSync('src/app.js',s);
