const fs=require('fs');
for(const [file,page]of [['tests/regression.cjs','page'],['tests/edge-cases.cjs','p']]){
 let s=fs.readFileSync(file,'utf8');
 const helper=`async function unlockResults(){await ${page}.locator('#parent-results-btn').click();await ${page}.locator('#parent-results-password').fill('452012');await ${page}.locator('#parent-results-dialog button[type="submit"]').click();}\n`;
 const anchor=file.includes('regression')?'const checks=[];':'await p.evaluate(()=>startQuiz';
 s=s.replace(anchor,helper+anchor);
 if(file.includes('regression')){
  s=s.replace("await page.locator('#retry-btn').click();","await unlockResults();await page.locator('#retry-btn').click();");
  s=s.replaceAll("await page.evaluate(()=>{quizHistory[0].reviewCorrect=false;retryQuiz();","await unlockResults();await page.evaluate(()=>{quizHistory[0].reviewCorrect=false;retryQuiz();");
  s=s.replace("assert.equal(await page.evaluate(()=>window.auditMarker),0);","await unlockResults();assert.equal(await page.evaluate(()=>window.auditMarker),0);");
 }else{s=s.replace("await p.locator('#summary-table-body summary').click();","await unlockResults();await p.locator('#summary-table-body summary').click();");}
 fs.writeFileSync(file,s);
}
