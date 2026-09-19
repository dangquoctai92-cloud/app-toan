const fs=require('fs');let core=fs.readFileSync('src/core.js','utf8');core=core.replace("function activeStreak(){return [dayLabel(),dayLabel(-1)].includes(S.lastDay)?S.streak:0;}","function activeStreak(state=S){return [dayLabel(),dayLabel(-1)].includes(state.lastDay)?state.streak:0;}").replace("need:s => s.streak >= 3","need:s => activeStreak(s) >= 3");fs.writeFileSync('src/core.js',core);
let app=fs.readFileSync('src/app.js','utf8');app=app.replace("quizHistory[qIndex].reviewAnswer=collectResponse().answer;reviewPtr--;loadReview();","saveReviewResponse(collectResponse());reviewPtr--;loadReview();");
app=app.replace("const closeSettings = () => document.getElementById('settings-modal').classList.remove('show');","const closeSettings = () => {document.getElementById('settings-modal').classList.remove('show');document.querySelector('[aria-label=\"Cài đặt phụ huynh\"]')?.focus();};");
app=app.replace("document.getElementById('settings-modal').classList.add('show');","document.getElementById('settings-modal').classList.add('show');\n    document.getElementById('input-parental-pass').focus();");
app=app.replace("  const l = byCode[code];\n  activeLesson", "  const l = byCode[code];\n  if(!l)return;\n  activeLesson");
app=app.replace("  const yt = document.getElementById('ytFrame');\n  const v = document.getElementById('mathVideo');\n  const help", "  const yt = document.getElementById('ytFrame');\n  const v = document.getElementById('mathVideo');\n  const source=document.getElementById('video-source');if(source){const meta=VIDEO_CATALOG[l.c];source.textContent=meta?(l.c==='b1'?'Clip ôn tập ngắn: ':'Video tham khảo: ')+meta.title:'';}\n  const help");
app=app.replace("'Cháu hiểu bài rồi, làm toán thôi!'","'Bắt đầu luyện tập'");
// Read-only diagrams in the summary must use their own roots and identifiers.
app=app.replace("visual.innerHTML=q.body||'';",`visual.innerHTML=q.body||'';
      visual.querySelectorAll('[id]').forEach(el=>{if(el.id==='match2')el.classList.add('summary-match');if(el.id==='m-lines')el.classList.add('summary-lines');el.removeAttribute('id');});
      details.addEventListener('toggle',()=>{if(details.open)requestAnimationFrame(()=>drawSummaryLines(visual,q));});`);
app+=`
function drawSummaryLines(root,q){
  const wrap=root.querySelector('.summary-match'),svg=root.querySelector('.summary-lines');if(!wrap||!svg)return;const W=wrap.getBoundingClientRect();if(!W.width)return;svg.setAttribute('viewBox','0 0 '+W.width+' '+W.height);svg.innerHTML='';
  (q.pairs||[]).forEach(([i,j])=>{const a=wrap.querySelector('[data-l="'+i+'"]'),b=wrap.querySelector('[data-r="'+j+'"]');if(!a||!b)return;const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect(),x1=ra.right-W.left,y1=ra.top+ra.height/2-W.top,x2=rb.left-W.left+6,y2=rb.top+rb.height/2-W.top,m=(x1+x2)/2;const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M '+x1+' '+y1+' C '+m+' '+y1+', '+m+' '+y2+', '+x2+' '+y2);path.setAttribute('fill','none');path.setAttribute('stroke',BOX_COLORS[i%4]);path.setAttribute('stroke-width','2.6');svg.appendChild(path);});
}
addEventListener('keydown',event=>{
  const modal=document.querySelector('.overlay.show');if(!modal)return;
  if(event.key==='Escape'){event.preventDefault();modal.id==='settings-modal'?closeSettings():closeVictoryModal();return;}
  if(event.key==='Tab'){const controls=[...modal.querySelectorAll('button,input,a[href]')].filter(x=>!x.disabled&&x.getBoundingClientRect().width);const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}
});
`;
fs.writeFileSync('src/app.js',app);
const checked=JSON.parse(fs.readFileSync('.audit/video-check.json','utf8'));const catalog=Object.fromEntries(checked.videos.filter(x=>x.status===200).map(x=>['b'+x.lesson,{id:x.id,title:x.title.normalize('NFC'),checkedAt:checked.date,verification:'metadata-only'}]));fs.writeFileSync('src/video-catalog.json',JSON.stringify(catalog,null,2)+'\n');
let build=fs.readFileSync('.sgk/build.cjs','utf8');build=build.replace("js+='\\n'+read('src/app.js');", "js+='\\nconst VIDEO_CATALOG = '+read('src/video-catalog.json')+';\\n'+read('src/app.js');");fs.writeFileSync('.sgk/build.cjs',build);
let template=fs.readFileSync('src/index.template.html','utf8');template=template.replace('<p class="video-help">','<p class="video-source" id="video-source"></p>\n      <p class="video-help">').replace('Cháu hiểu bài rồi, làm toán thôi!','Bắt đầu luyện tập');fs.writeFileSync('src/index.template.html',template);
