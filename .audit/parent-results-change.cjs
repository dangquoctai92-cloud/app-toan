const fs=require('fs');
function edit(file,fn){fs.writeFileSync(file,fn(fs.readFileSync(file,'utf8').replaceAll('\r\n','\n')))}
function replace(s,a,b){if(!s.includes(a))throw Error('Missing anchor: '+a.slice(0,90));return s.replace(a,b)}
edit('src/index.template.html',s=>{
s=replace(s,'        <p id="summary-review" class="summary-note"></p>','');
s=replace(s,`      <p class="summary-note">Điểm và sao tính theo lần làm đầu. Ôn lại giúp con sửa những chỗ chưa đúng.</p>
      <div id="summary-table-body"></div>
      <div class="quiz-actions">
        <button class="btn pink wide" id="retry-btn" onclick="retryQuiz()">Làm lại câu sai</button>`,`      <p class="summary-note">Điểm và sao tính theo lần làm đầu.</p>
      <div class="quiz-actions">
        <button class="btn blue wide" id="parent-results-btn" onclick="requestParentResults()">Phụ huynh xem kết quả</button>
      </div>
      <div id="parent-results" class="hidden">
        <div class="quiz-actions parent-results-heading">
          <h2 id="parent-results-title" tabindex="-1">Kết quả chi tiết</h2>
          <button class="btn ghost wide" onclick="closeParentResults()">Đóng kết quả</button>
        </div>
        <p id="summary-review" class="summary-note"></p>
        <div id="summary-table-body"></div>
        <div class="quiz-actions">
          <button class="btn pink wide" id="retry-btn" onclick="retryQuiz()">Làm lại câu sai</button>
        </div>
      </div>
      <div class="quiz-actions">`);
s=replace(s,'<script>',`<dialog id="parent-results-dialog" aria-labelledby="parent-password-title" onclose="clearParentResultsPassword()">
  <form onsubmit="unlockParentResults(event)">
    <h3 id="parent-password-title">Phụ huynh xem kết quả</h3>
    <div class="field">
      <label for="parent-results-password">Mật khẩu phụ huynh</label>
      <input type="password" id="parent-results-password" autocomplete="off" required aria-describedby="parent-results-error">
    </div>
    <p id="parent-results-error" role="alert"></p>
    <div class="parent-password-actions">
      <button class="btn wide" type="submit">Xem kết quả</button>
      <button class="btn ghost wide" type="button" onclick="document.getElementById('parent-results-dialog').close()">Hủy</button>
    </div>
  </form>
</dialog>

<script>`);
return s;});
edit('src/app.js',s=>{
s=replace(s,'function showScreen(id){','function showScreen(id){\n  if(id !== \'summary-screen\')lockParentResults();');
s=replace(s,'function showSummary(){',`let parentResultsUnlocked=false;
function clearParentResultsPassword(){
  const input=document.getElementById('parent-results-password');
  input.value='';input.removeAttribute('aria-invalid');
  document.getElementById('parent-results-error').textContent='';
}
function lockParentResults(){
  parentResultsUnlocked=false;
  document.getElementById('parent-results').classList.add('hidden');
  document.getElementById('parent-results-btn').classList.remove('hidden');
  document.getElementById('summary-table-body').replaceChildren();
  document.getElementById('summary-review').textContent='';
  const dialog=document.getElementById('parent-results-dialog');
  if(dialog.open)dialog.close();
  clearParentResultsPassword();
}
function closeParentResults(){
  lockParentResults();
  document.getElementById('parent-results-btn').focus();
}
function requestParentResults(){
  if(!document.getElementById('summary-screen').classList.contains('active'))return;
  clearParentResultsPassword();
  document.getElementById('parent-results-dialog').showModal();
  document.getElementById('parent-results-password').focus();
}
function unlockParentResults(event){
  event.preventDefault();
  const dialog=document.getElementById('parent-results-dialog');
  if(!dialog.open||!document.getElementById('summary-screen').classList.contains('active'))return;
  const input=document.getElementById('parent-results-password');
  if(input.value!==parentalPassword){
    document.getElementById('parent-results-error').textContent='Mật khẩu chưa đúng. Ba mẹ vui lòng nhập lại.';
    input.setAttribute('aria-invalid','true');input.value='';input.focus();return;
  }
  parentResultsUnlocked=true;dialog.close();clearParentResultsPassword();
  renderParentResults();
  document.getElementById('parent-results').classList.remove('hidden');
  document.getElementById('parent-results-btn').classList.add('hidden');
  document.getElementById('parent-results-title').focus();
}
function showSummary(){
  lockParentResults();`);
s=replace(s,"  const revised=quizHistory.filter(h=>!h.isCorrect&&h.reviewCorrect).length;\n",'');
s=replace(s,"  document.getElementById('summary-review').textContent=revised?'Sau khi ôn lại: '+(correct+revised)+'/'+total+' câu đã đúng. Điểm lần đầu được giữ nguyên.':'';\n",'');
const first=s.indexOf("  const body=document.getElementById('summary-table-body');body.innerHTML='';",s.indexOf('function showSummary(){'));
const last=s.indexOf("  const aa=document.getElementById('adv-after');",first);
const render=s.slice(first,last);s=s.slice(0,first)+s.slice(last);
s=replace(s,'function retryQuiz(){',`function renderParentResults(){
  if(!parentResultsUnlocked)return;
  const total=quizHistory.length,correct=quizHistory.filter(h=>h.isCorrect).length;
  const revised=quizHistory.filter(h=>!h.isCorrect&&h.reviewCorrect).length;
  document.getElementById('summary-review').textContent=revised?'Sau khi ôn lại: '+(correct+revised)+'/'+total+' câu đã đúng. Điểm lần đầu được giữ nguyên.':'';
${render}}
function retryQuiz(){
  if(!parentResultsUnlocked){requestParentResults();return;}`);
return s;});
fs.appendFileSync('src/styles.css',`\n/* Parent-only result details */
#parent-results-dialog{border:0;border-radius:24px;padding:24px;width:min(420px,calc(100vw - 32px));max-height:calc(100dvh - 32px);overflow:auto;color:var(--ink);background:#fffaf0;box-shadow:0 16px 60px #30284544}
#parent-results-dialog::backdrop{background:rgba(34,28,55,.5)}
#parent-results-dialog h3{margin:0 0 20px;font-size:22px}
#parent-results-password{width:100%;min-height:48px;font-size:18px}
#parent-results-error{color:#b42335;font-size:15px;line-height:1.5}
.parent-password-actions{display:grid;gap:18px;margin-top:16px}
.parent-results-heading h2{font-size:22px;margin:0 0 16px}
#parent-results-btn{white-space:normal}
`);
