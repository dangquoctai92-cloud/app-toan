const fs=require('fs');
function edit(file,fn){let s=fs.readFileSync(file,'utf8');fs.writeFileSync(file,fn(s));}
function one(s,a,b){if(!s.includes(a))throw Error('Missing: '+a.slice(0,90));return s.replace(a,b);}
edit('src/core.js',s=>{
s=one(s,"need:s => ISLANDS[6].lessons.every(l => s.done.includes(l.c))","need:s => ISLANDS.slice(0,7).every(i => i.lessons.every(l => s.done.includes(l.c)))");
s=one(s,"need:s => s.done.length >= ALL.length - 5","need:s => ALL.every(l => s.done.includes(l.c))");
const a=s.indexOf("let parentalPassword ="),b=s.indexOf('let quizMode =',a);
s=s.slice(0,a)+`let storageNotice = '';
function readStorage(key){ try { return localStorage.getItem(key); } catch (_) { storageNotice = 'Trình duyệt chưa cho phép lưu. Tiến độ trong phiên này có thể mất khi đóng app.'; return null; } }
function writeStorage(key,value){ try { localStorage.setItem(key,value); return true; } catch (_) { storageNotice = 'Chưa lưu được tiến độ. Hãy giữ trang này mở và kiểm tra dung lượng trình duyệt.'; const el=document.getElementById('app-notice'); if(el){el.textContent=storageNotice;el.hidden=false;} return false; } }
let parentalPassword = readStorage('parentalPassword') || '452012';
const freshState = () => ({version:2,done:[],doneAdv:[],stars:0,streak:0,lastDay:'',totalQ:0,totalCorrect:0});
const DEF = freshState();
function loadState(){
  const raw=readStorage('bb3_state'); if(!raw)return freshState();
  try{
    const data=JSON.parse(raw); if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Invalid state');
    const state=freshState();
    for(const key of ['done','doneAdv'])state[key]=[...new Set(Array.isArray(data[key])?data[key].filter(c=>typeof c==='string'&&byCode[c]):[])];
    for(const key of ['stars','streak','totalQ','totalCorrect'])state[key]=Number.isSafeInteger(data[key])&&data[key]>=0?data[key]:0;
    state.totalCorrect=Math.min(state.totalCorrect,state.totalQ);
    state.lastDay=typeof data.lastDay==='string'&&!Number.isNaN(Date.parse(data.lastDay))?data.lastDay:'';
    if(!state.lastDay)state.streak=0;
    return state;
  }catch(_){writeStorage('bb3_state_recovery',raw);storageNotice='Dữ liệu tiến độ bị lỗi. App đã giữ một bản khôi phục và mở phiên học mới.';return freshState();}
}
let S = loadState();
function dayLabel(offset=0){const d=new Date();d.setDate(d.getDate()+offset);return d.toDateString();}
function activeStreak(){return [dayLabel(),dayLabel(-1)].includes(S.lastDay)?S.streak:0;}
const escapeText = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
`+s.slice(b);
s=one(s,"const saveState = () => localStorage.setItem('bb3_state', JSON.stringify(S));","const saveState = () => writeStorage('bb3_state', JSON.stringify(S));");
s=one(s,"let devMode = localStorage.getItem('bb3_dev') === '1';","let devMode = readStorage('bb3_dev') === '1';\nlet submissionLocked=false, quizFinished=false, victoryTimer=null, screenVersion=0;\nconst celebrate = options => { if(typeof window.confetti==='function')window.confetti(options); };\nconst shuffle = values => { const out=[...values];for(let i=out.length-1;i>0;i--){const j=R(0,i);[out[i],out[j]]=[out[j],out[i]];}return out; };");
s=one(s,'pick(a, opts){ B.push({a, pickList:opts});',`pick(a, opts){
      opts=[...opts]; a=String(a).split(',').filter(Boolean).sort().join(',');
      if(!a){a='Không có đáp án nào';if(!opts.includes(a))opts.push(a);}
      B.push({a, pickList:opts, multiple:a.split(',').length>1});`);
s=one(s,"'<span class=\"picker\" data-b=\"' + i + '\">'","'<span class=\"picker\" role=\"group\" aria-label=\"Lựa chọn đáp án\" data-b=\"' + i + '\">'");
return s;});
edit('.sgk/banks/b2.js',s=>one(s,'b = i === 0 ? 200 : R(20, 140);','b = i === 0 ? 200 : R(20, Math.min(140, a));'));
edit('.sgk/banks-adv/b81.js',s=>one(s,'const dua = 50000;','const dua = Math.max(50000, Math.ceil(gia * sl / 10000) * 10000);'));
edit('src/index.template.html',s=>{
s=one(s,'initial-scale=1.0, maximum-scale=1.0, user-scalable=no,','initial-scale=1.0,');
s=s.replace(/<div class="field"><label>Gemini API Key[\s\S]*?<\/div>/,'');
s=s.replace('<label>Mật khẩu phụ huynh</label>','<label for="input-parental-pass">Mật khẩu phụ huynh</label>');
s=s.replace('onclick="resetAndGoMap()" data-ic="close"','onclick="resetAndGoMap()" aria-label="Thoát bài làm" data-ic="close"');
s=s.replace('<div class="review-nav hidden" id="review-nav">','<div class="review-nav hidden" id="review-nav">\n          <button class="btn" onclick="submitAnswer()">Kiểm tra lại</button>');
s=s.replace('<p id="summary-score">Kết quả bài làm</p>','<p id="summary-score">Kết quả bài làm</p>\n        <p id="summary-review" class="summary-note"></p>');
s=s.replace('<div id="summary-table-body"></div>','<p class="summary-note">Điểm và sao tính theo lần làm đầu. Ôn lại giúp con sửa những chỗ chưa đúng.</p>\n      <div id="summary-table-body"></div>');
s=s.replace('<body>','<body>\n<div id="app-notice" class="app-notice" role="status" hidden></div>');
s=s.replace(/onclick="showScreen\('map-screen'\)"/g,'onclick="goMap()"');
s=s.replace('<div class="video-wrap">','<p class="video-help">Nếu video không phát, con có thể mở trên YouTube hoặc bắt đầu làm bài bên dưới.</p>\n      <div class="video-wrap">');
s=s.replace(/<div class="overlay" id="(victory-overlay|settings-modal)">/g,'<div class="overlay" id="$1" role="dialog" aria-modal="true" aria-label="Thông báo và cài đặt">');
return s;});
