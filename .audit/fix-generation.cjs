const fs=require('fs');
fs.appendFileSync('src/core.js',`
// Five skill groups, three questions per group. Every regular template remains eligible.
function skillGroup(lesson){
  const keys=JSON.stringify(lesson.g);
  if(/stats|chance/.test(keys))return 'data';
  if(/time|month|money|len|mass|cap|temp/.test(keys))return 'measure';
  if(/shape|solid|circle|mid|perim|area/.test(keys))return 'geometry';
  if(/place|bigger|roman|round/.test(keys))return 'numbers';
  return 'operations';
}
function prepareQuestion(item,code,index,mode='normal'){
  const plain=t=>String(t||'').replace(/<[^>]*>/g,' ').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&nbsp;/g,' ').replace(/\\s+/g,' ').trim();
  return {...item,id:code+'-'+mode+'-'+(index+1),lessonCode:code,skill:skillGroup(byCode[code]),source:'.sgk/'+(mode==='normal'?'banks':'banks-adv')+'/'+code+'.js',q:plain(item.cmd)+' — '+plain(item.body),a:String(item.a),explanation:item.e,blanks:item.blanks||[]};
}
function generateFinal(){
  const groups={numbers:[],operations:[],geometry:[],measure:[],data:[]};
  ALL.forEach(l=>BANKS[l.c].forEach((fn,index)=>groups[skillGroup(l)].push({fn,index,code:l.c})));
  return shuffle(Object.values(groups).flatMap(group=>shuffle(group).slice(0,3).map(x=>prepareQuestion(x.fn(),x.code,x.index))));
}
`);
let core=fs.readFileSync('src/core.js','utf8');
const ga=core.indexOf('function generateAdv('),gq=core.indexOf('function generateQuestions(',ga),end=core.indexOf('// Five skill groups',gq);
core=core.slice(0,ga)+`function generateAdv(code){return (ADV[code]||[]).map((fn,i)=>prepareQuestion(fn(),code,i,'advanced'));}
function generateQuestions(code,count=10){const bank=BANKS[code]||[];if(!bank.length)return [];return Array.from({length:count},(_,i)=>prepareQuestion(bank[i%bank.length](),code,i%bank.length));}
\n`+core.slice(end);fs.writeFileSync('src/core.js',core);
let app=fs.readFileSync('src/app.js','utf8');app=app.replace("      paint();\n    };\n  });\n\n  const SIGNS",`      document.querySelectorAll('#q-body .pk').forEach(choice=>{if(+choice.dataset.b===i){const selected=set.has(choice.dataset.v);choice.classList.toggle('on',selected);choice.setAttribute('aria-pressed',String(selected));}});
    };
  });

  const SIGNS`);
app=app.replace("if(first && !reviewMode && window.matchMedia('(pointer:fine)').matches)first.focus({preventScroll:true});",'');
app=app.replace("v.classList.remove('hidden');\n    v.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';\n    v.load();","v.classList.add('hidden');v.removeAttribute('src');\n    const help=document.querySelector('.video-help');if(help)help.textContent='Bài này chưa có video. Con vẫn có thể bắt đầu luyện tập bên dưới.';");
app=app.replace("  if (l.v){","  const help=document.querySelector('.video-help');if(help)help.textContent='Nếu video không phát, con có thể mở trên YouTube hoặc bắt đầu làm bài bên dưới.';\n  if (l.v){");
app=app.replace("d.title = b.t;d.setAttribute", "d.title = b.t;d.setAttribute");
fs.writeFileSync('src/app.js',app);
let template=fs.readFileSync('src/index.template.html','utf8');template=template.replace('<div class="quiz-top">','<p class="lesson-label" id="lesson-label"></p>\n      <div class="quiz-top">').replace('onclick="openSettings()" data-ic="gear"','onclick="openSettings()" aria-label="Cài đặt phụ huynh" data-ic="gear"');fs.writeFileSync('src/index.template.html',template);
