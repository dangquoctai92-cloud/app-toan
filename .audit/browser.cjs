const fs=require('fs'),http=require('http');
const {chromium}=require('C:/Users/dangq/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync('index.html'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({headless:true,channel:'msedge'});const ctx=await browser.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:')?r.continue():r.abort());
await page.goto('http://127.0.0.1:'+server.address().port);await page.screenshot({path:'.audit/map-mobile.png',fullPage:true});
const init=await page.evaluate(()=>({title:document.title,tiles:document.querySelectorAll('.tile').length,bodyWidth:document.body.scrollWidth,width:innerWidth}));
await page.evaluate(()=>startQuiz('b1'));await page.screenshot({path:'.audit/quiz-mobile.png',fullPage:true});
const review=await page.evaluate(()=>{currentQ=generateQuestions('b1',1)[0];quizQs=[currentQ];TOTALQ=1;qIndex=0;quizHistory=[{idx:1,question:currentQ.q,userAnswer:'wrong',correctAnswer:currentQ.a,isCorrect:false}];retryQuiz();subs=currentQ.blanks.map(b=>b.a);nextReviewQuestion();return {enteredAllCorrect:true,recordedCorrect:quizHistory[0].isCorrect,recordedAnswer:quizHistory[0].userAnswer};});
const xss=await page.evaluate(()=>{window.auditMarker=0;quizHistory=[{idx:1,question:'test',userAnswer:'<img src="x" onerror="window.auditMarker=1">',correctAnswer:'abc',isCorrect:false}];showSummary();return true;});await page.waitForTimeout(100);const injection=await page.evaluate(()=>window.auditMarker);
const alt=await page.evaluate(()=>{const q=Q(1,'Đọc số');q.txt(24);currentQ=q.done('');quizQs=[currentQ];TOTALQ=1;qIndex=0;quizHistory=[{isCorrect:false}];reviewMode=true;wrongIdx=[0];reviewPtr=0;subs=['hai mươi bốn'];submitAnswer();const afterSubmit=quizHistory[0].isCorrect;nextReviewQuestion();return {afterSubmit,afterNext:quizHistory[0].isCorrect};});
const flow=await page.evaluate(()=>{const q=Q(1,'');q.num(7);currentQ=q.done('');quizQs=[currentQ];TOTALQ=1;qIndex=0;quizHistory=[];reviewMode=false;subs=['7'];S={done:[],doneAdv:[],stars:0,streak:1,lastDay:'',totalQ:0,totalCorrect:0};quizCode='b1';try{submitAnswer()}catch(e){}return {stats:{total:S.totalQ,correct:S.totalCorrect},headerAccuracy:document.getElementById('r-acc').innerText,headerLessons:document.getElementById('r-lessons').innerText,done:S.done};});
await page.evaluate(()=>{window.confetti=()=>{};});
const rendering=[];
for(const width of [390,1366]){
await page.setViewportSize({width,height:844});
const out=await page.evaluate(async()=>{
let all=0;const bad=[],blank=[];
for(const [name,bank] of [['normal',BANKS],['advanced',ADV]])for(const [code,fns]of Object.entries(bank))for(let i=0;i<fns.length;i++){
try{currentQ=fns[i]();quizCode=code;subs=[];reviewMode=false;qIndex=0;TOTALQ=fns.length;showScreen('quiz-screen');paint();all++;
const body=document.getElementById('q-body');const controls=[...body.querySelectorAll('input.qin,button.qsign,button.pk')];
if(!controls.length)blank.push({name,code,index:i+1});
const btn=body.querySelector('.check-inline'),r=btn?.getBoundingClientRect();
const clipping=body.scrollHeight>body.clientHeight+4 && ['hidden','clip'].includes(getComputedStyle(body).overflowY);
if(clipping||document.documentElement.scrollWidth>innerWidth+5)bad.push({name,code,index:i+1,clipping,pageWidth:document.documentElement.scrollWidth});
}catch(e){bad.push({name,code,index:i+1,error:e.message})}
if(all%75===0)await new Promise(r=>setTimeout(r,0));
}
return {all,bad,blank};});rendering.push({width,...out});
}
await page.evaluate(()=>startQuiz('b81','adv'));await page.screenshot({path:'.audit/quiz-desktop.png',fullPage:true});
const result={init,review,injection,alt,flow,rendering,errors};fs.writeFileSync('.audit/browser-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
await browser.close();server.close();
})().catch(e=>{console.error(e);process.exit(1)});

