const fs=require('fs'),http=require('http');const {chromium}=require('C:/Users/dangq/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html; charset=utf-8');r.end(fs.readFileSync('index.html'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));const b=await chromium.launch({headless:true,channel:'msedge'});const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await p.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:')?r.continue():r.abort());await p.goto('http://127.0.0.1:'+server.address().port);await p.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});await p.evaluate(()=>window.confetti=()=>{});
const results=[];
for(const size of [{width:320,height:640},{width:360,height:800},{width:768,height:1024},{width:1920,height:1080}]){
await p.setViewportSize(size);
const result=await p.evaluate(async()=>{const bad=[],totals={all:0,horizontalScroll:0,smallTargets:0};
for(const [bankName,bank] of [['normal',BANKS],['advanced',ADV]])for(const [code,fns]of Object.entries(bank))for(let i=0;i<fns.length;i++){
currentQ=fns[i]();quizCode=code;subs=[];reviewMode=false;qIndex=0;TOTALQ=fns.length;showScreen('quiz-screen');paint();const sc=document.getElementById('quiz-screen');sc.scrollTop=0;await new Promise(requestAnimationFrame);sc.scrollTop=0;
const rr=sc.getBoundingClientRect(),top=document.querySelector('.quiz-top').getBoundingClientRect(),head=document.querySelector('.sgk-head').getBoundingClientRect(),card=document.getElementById('question-box').getBoundingClientRect();
const body=document.getElementById('q-body');const scrolling=[...body.querySelectorAll('*')].filter(e=>e.scrollWidth>e.clientWidth+4&&getComputedStyle(e).overflowX==='auto');if(scrolling.length)totals.horizontalScroll++;
const overflowing=[...body.querySelectorAll('.pk')].filter(e=>e.scrollWidth>e.clientWidth+3||e.scrollHeight>e.clientHeight+3); if(overflowing.length)bad.push({bank:bankName,code,index:i+1,kind:'choice-overflow',labels:overflowing.map(x=>x.textContent)}); const small=[...body.querySelectorAll('input,button')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.width<36||r.height<36)});if(small.length)totals.smallTargets++;
if(top.top<rr.top-4||head.top<rr.top-4)bad.push({bank:bankName,code,index:i+1,top:Math.round(top.top),heading:Math.round(head.top),cardHeight:Math.round(card.height),screenHeight:sc.clientHeight,scrollHeight:sc.scrollHeight});
totals.all++;
}return {totals,bad};});results.push({size,...result});console.log(JSON.stringify({size,totals:result.totals,badCount:result.bad.length,examples:result.bad.slice(0,8)}));
if(result.bad.length){const x=result.bad[0];await p.evaluate(x=>{currentQ=(x.bank==='normal'?BANKS:ADV)[x.code][x.index-1]();subs=[];paint();document.getElementById('quiz-screen').scrollTop=0},x);await p.waitForTimeout(100);await p.screenshot({path:'.audit/after-clipped-'+size.width+'-'+size.height+'.png'});}
}
await p.setViewportSize({width:390,height:844});await p.evaluate(()=>startQuiz('b1'));await p.waitForTimeout(100);await p.screenshot({path:'.audit/after-quiz-mobile.png'});
await p.evaluate(()=>goMap());await p.waitForTimeout(100);await p.screenshot({path:'.audit/after-map-mobile.png'});
await p.setViewportSize({width:1366,height:768});await p.evaluate(()=>goMap());await p.waitForTimeout(100);await p.screenshot({path:'.audit/after-map-desktop.png'});
fs.writeFileSync('.audit/responsive-after.json',JSON.stringify(results,null,2));await b.close();server.close();})().catch(e=>{console.error(e);process.exit(1)});


