const fs=require('fs');let s=fs.readFileSync('src/app.js','utf8');
const a=s.indexOf('    const user=document.createElement',s.indexOf('function renderParentResults'));const b=s.indexOf('    const mark=document.createElement',a);if(a<0||b<0)throw Error('Missing summary');
s=s.slice(0,a)+`    const details=document.createElement('details');const label=document.createElement('summary');label.textContent='So sánh bài làm và đáp án';details.appendChild(label);
    const q=quizQs[i],views=[];
    if(q){
      const cmd=document.createElement('p');cmd.textContent=String(q.cmd||'').replace(/<[^>]*>/g,'');details.appendChild(cmd);
      const original=it.userAnswer==='—'?'':String(it.userAnswer??'');
      const solution=(q.blanks||[]).length?q.blanks.map(blank=>String(blank.a)):String(it.correctAnswer??q.a??'').split('|');
      const createPanel=(title,values,kind)=>{
        const panel=document.createElement('section');panel.className='comparison-panel comparison-'+kind;
        const h=document.createElement('h3');h.textContent=title;panel.appendChild(h);
        const visual=renderAnswerSnapshot(q,values,kind);panel.appendChild(visual);details.appendChild(panel);views.push(visual);return panel;
      };
      const submitted=createPanel('Bài con đã nộp · Lần đầu',original.split('|'),'submitted');
      if(it.skipped||it.userAnswer==='—'){const note=document.createElement('p');note.className='comparison-note';note.textContent='Con đã bỏ qua câu này. Các ô đã điền được giữ lại.';submitted.appendChild(note);}
      createPanel('Đáp án đúng',solution,'solution');
      if(it.reviewAnswer!=null){const review=document.createElement('details');review.className='review-comparison';const toggle=document.createElement('summary');toggle.textContent='Xem thêm bài ôn lại của con';review.appendChild(toggle);const visual=renderAnswerSnapshot(q,String(it.reviewAnswer).split('|'),'review');review.appendChild(visual);review.addEventListener('toggle',()=>{if(review.open)requestAnimationFrame(()=>drawSummaryLines(visual,q));});details.appendChild(review);}
      details.addEventListener('toggle',()=>{if(details.open)requestAnimationFrame(()=>views.forEach(visual=>drawSummaryLines(visual,q)));});
      const scrolls=views.map(visual=>[visual,...visual.querySelectorAll('.tbl-wrap')]);
      scrolls.forEach((list,side)=>list.forEach((el,j)=>el.addEventListener('scroll',()=>{const other=scrolls[1-side][j];if(!other)return;const max=el.scrollWidth-el.clientWidth;const left=max>0?el.scrollLeft/max*(other.scrollWidth-other.clientWidth):0;if(Math.abs(other.scrollLeft-left)>1)other.scrollLeft=left;},{passive:true})));
    }else{
      for(const [title,value]of [['Bài con đã nộp · Lần đầu',it.userAnswer],['Đáp án đúng',it.correctAnswer]]){const panel=document.createElement('section');panel.className='comparison-panel';const h=document.createElement('h3');h.textContent=title;const answer=document.createElement('p');answer.textContent=String(value??'Chưa trả lời').split('|').join(' · ');panel.append(h,answer);details.appendChild(panel);}
    }
    if(it.explanation){const exp=document.createElement('p');exp.className='tip';exp.textContent=String(it.explanation).replace(/<[^>]*>/g,' ');details.appendChild(exp);}content.appendChild(details);
`+s.slice(b);
const helper=`function renderAnswerSnapshot(q,values,kind){
  const visual=document.createElement('div');visual.className='summary-question';visual.innerHTML=q.body||'';
  visual.querySelectorAll('[id]').forEach(el=>{if(el.id==='match2')el.classList.add('summary-match');if(el.id==='m-lines')el.classList.add('summary-lines');el.removeAttribute('id');});
  visual.querySelectorAll('input').forEach(input=>{
    const i=Number(input.dataset.b),value=String(values[i]??'');
    const answer=document.createElement('span');answer.className=input.className+' summary-answer-text';answer.dataset.b=input.dataset.b;
    answer.textContent=value||'—';answer.classList.toggle('filled',!!value);answer.classList.toggle('unanswered',!value);
    const result=!value?'Chưa điền':kind==='solution'?'Đáp án đúng':matchBlank(q.blanks[i]||{},value)?'Đúng':'Chưa đúng';
    answer.setAttribute('aria-label','Ô '+(i+1)+': '+(value||'chưa điền')+' · '+result);answer.title=result;
    if(kind==='submitted'&&value)answer.classList.add(result==='Đúng'?'snapshot-right':'snapshot-wrong');
    input.replaceWith(answer);
  });
  visual.querySelectorAll('button').forEach(button=>{
    const value=String(values[Number(button.dataset.b)]??'');button.disabled=true;button.tabIndex=-1;
    if(button.classList.contains('pk')){const selected=value.split(',').filter(Boolean).includes(button.dataset.v);button.classList.toggle('on',selected);button.setAttribute('aria-pressed',String(selected));button.classList.toggle('word-option',(button.dataset.v||'').length>2);}
    if(button.classList.contains('qsign')){button.textContent=value||'—';button.classList.toggle('filled',!!value);button.setAttribute('aria-label','Dấu so sánh: '+(value||'chưa chọn'));}
  });
  visual.querySelectorAll('[data-read]').forEach(el=>{const value=values[+el.dataset.read]||'';el.textContent=value?readNum(+value):'—';});
  if(!(q.blanks||[]).length){const response=document.createElement('p');response.className='snapshot-response';response.textContent=values.join(' · ')||'Chưa trả lời';visual.appendChild(response);}
  return visual;
}
`;
s=s.replace('function renderParentResults(){',helper+'\nfunction renderParentResults(){');
s=s.replace("quizHistory.push({idx:qIndex + 1, question:currentQ.q || '(bỏ qua)', userAnswer:'—',","const skippedResponse=collectResponse();\n  quizHistory.push({idx:qIndex + 1, question:currentQ.q || '(bỏ qua)', userAnswer:skippedResponse.answer,skipped:true,marks:skippedResponse.marks,");
fs.writeFileSync('src/app.js',s);
const p='tests/edge-cases.cjs';s=fs.readFileSync(p,'utf8');s=s.replace("p.locator('.summary-lines path').count(),4","p.locator('.summary-lines path').count(),8").replace('retain all four connections','retain all four connections in each comparison');fs.writeFileSync(p,s);
