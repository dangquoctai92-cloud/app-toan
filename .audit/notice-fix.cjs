const fs=require('fs');let app=fs.readFileSync('src/app.js','utf8');app=app.replace("function skipQuestion(){","function skipQuestion(){\n  if(reviewMode||quizFinished||!devMode)return;");
app+=`
const noticeElement=document.getElementById('app-notice');
if(noticeElement&&typeof ResizeObserver==='function')new ResizeObserver(()=>document.documentElement.style.setProperty('--notice-height',noticeElement.hidden?'0px':noticeElement.getBoundingClientRect().height+'px')).observe(noticeElement);
`;
fs.writeFileSync('src/app.js',app);
