const fs=require('fs'),http=require('http'),assert=require('assert/strict');
const{chromium}=require('C:/Users/dangq/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html; charset=utf-8');r.end(fs.readFileSync('index.html'))});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,channel:'msedge'}),checks=[];
 try{for(const width of [320,1366]){
  const p=await browser.newPage({viewport:{width,height:850},reducedMotion:'reduce'}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:')?r.continue():r.abort());
  await p.addInitScript(()=>localStorage.setItem('parentalPassword','ba-me-2026'));
  await p.goto('http://127.0.0.1:'+server.address().port);
  await p.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
  await p.evaluate(()=>{startQuiz('b1');while(!quizFinished)skipQuestion();});
  assert.equal(await p.locator('#summary-screen').isVisible(),true);
  assert.match(await p.locator('#summary-big').innerText(),/^0\//);
  async function locked(){assert.equal(await p.locator('#parent-results').isVisible(),false);assert.equal(await p.locator('#summary-table-body').innerHTML(),'');assert.equal(await p.locator('#retry-btn').isVisible(),false);}
  async function unlock(){await p.locator('#parent-results-btn').click();await p.locator('#parent-results-password').fill('ba-me-2026');await p.locator('#parent-results-dialog button[type=submit]').click();assert.equal(await p.locator('#parent-results').isVisible(),true);}
  await locked();await p.screenshot({path:'.audit/score-locked-'+width+'.png'});
  await p.locator('#parent-results-btn').click();
  assert.equal(await p.locator('#parent-results-password').getAttribute('type'),'password');
  await p.locator('#parent-results-password').fill('452012');await p.keyboard.press('Enter');
  assert.match(await p.locator('#parent-results-error').innerText(),/chưa đúng/);await locked();
  await p.keyboard.press('Escape');assert.equal(await p.locator('#parent-results-dialog').isVisible(),false);await locked();
  await p.locator('#parent-results-btn').click();assert.equal(await p.locator('#parent-results-password').inputValue(),'');
  await p.screenshot({path:'.audit/parent-password-'+width+'.png'});
  const bounds=await p.locator('#parent-results-dialog').boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=width+1);assert.ok(Math.abs(bounds.x-(width-bounds.width)/2)<2);assert.ok(Math.abs(bounds.y-(850-bounds.height)/2)<2);
  await p.getByRole('button',{name:'Hủy',exact:true}).click();await locked();
  await unlock();assert.equal(await p.locator('#parent-results-password').inputValue(),'');
  assert.equal(await p.locator('#summary-table-body .row').count(),await p.evaluate(()=>quizHistory.length));
  const details=p.locator('#summary-table-body details').first();
  for(let i=0;i<2;i++){await details.locator('summary').click();assert.equal(await details.evaluate(x=>x.open),true);await details.locator('summary').click();assert.equal(await details.evaluate(x=>x.open),false);}
  await p.getByRole('button',{name:'Đóng kết quả',exact:true}).click();await locked();
  await p.evaluate(()=>retryQuiz());assert.equal(await p.locator('#parent-results-dialog').isVisible(),true);await locked();await p.keyboard.press('Escape');
  await unlock();await p.getByRole('button',{name:'Về bản đồ',exact:true}).click();await p.evaluate(()=>showScreen('summary-screen'));await locked();
  await unlock();await p.locator('#retry-btn').click();assert.equal(await p.locator('#quiz-screen').isVisible(),true);
  await p.evaluate(()=>{while(reviewMode)skipQuestion();});await locked();
  await unlock();await p.evaluate(()=>{startQuiz('b2');while(!quizFinished)skipQuestion();});await locked();
  assert.deepEqual(errors,[]);checks.push({width,passed:true,cases:['finish locks details','saved password required','wrong password stays locked','Escape and cancel','password cleared','dialog fits','open/close solutions','close relocks','review gated','navigation relocks','review completion relocks','new quiz relocks']});
  await p.close();
 }}finally{await browser.close();server.close();}
 fs.writeFileSync('.audit/parent-results-tests.json',JSON.stringify(checks,null,2));console.log(JSON.stringify(checks,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
