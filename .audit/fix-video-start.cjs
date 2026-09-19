const fs=require('fs');const path='src/app.js';let s=fs.readFileSync(path,'utf8');s=s.replace("if(token!==videoLoadToken)return;clearTimeout(videoLoadTimer);\n  document.getElementById('video-cover')", "if(token!==videoLoadToken)return;stopVideo();\n  document.getElementById('video-cover')");
const start=s.indexOf('async function startLessonVideo(){'),end=s.indexOf('\nfunction stopVideo(){',start);
s=s.slice(0,start)+`function videoManualPlayback(token){
  if(token!==videoLoadToken||document.querySelector('.video-wrap').dataset.state!=='loading')return;
  clearTimeout(videoLoadTimer);
  document.querySelector('.video-wrap').dataset.state='unconfirmed';document.querySelector('.video-wrap').setAttribute('aria-busy','false');
  document.getElementById('video-status').textContent='Con bấm ▶ trong khung video để phát. Nếu khung chưa hiện, bấm “Thử tải lại” hoặc “Mở video trên YouTube”.';
  document.getElementById('video-retry-btn').classList.remove('hidden');
}
async function startLessonVideo(){
  if(!currentLessonVideo||!document.getElementById('video-screen').classList.contains('active'))return;
  stopVideo();const token=videoLoadToken,meta=currentLessonVideo,host=document.getElementById('video-player-host');
  document.getElementById('video-cover').classList.add('hidden');document.getElementById('video-play-btn').disabled=true;
  document.getElementById('video-status').textContent='Đang mở video… Nếu video chưa tự chạy, con bấm ▶ trong khung nhé.';
  document.querySelector('.video-wrap').dataset.state='loading';document.querySelector('.video-wrap').setAttribute('aria-busy','true');
  // The iframe can play independently, even when the optional controller is blocked.
  const frame=document.createElement('iframe');frame.id='ytFrame';frame.title=meta.title;frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.src='https://www.youtube-nocookie.com/embed/'+meta.id+'?enablejsapi=1&playsinline=1&rel=0&autoplay=1'+(/^https?:$/.test(location.protocol)?'&origin='+encodeURIComponent(location.origin):'');host.replaceChildren(frame);
  videoLoadTimer=setTimeout(()=>videoManualPlayback(token),8000);
  try{const YT=await loadYoutubeApi();if(token!==videoLoadToken)return;
    lessonPlayer=new YT.Player(frame,{events:{
      onReady:event=>{if(token!==videoLoadToken)return;clearTimeout(videoLoadTimer);document.getElementById('video-status').textContent='Con có thể bấm ▶ trong video để bắt đầu.';document.getElementById('video-retry-btn').classList.add('hidden');document.querySelector('.video-wrap').dataset.state='ready';document.querySelector('.video-wrap').setAttribute('aria-busy','false');event.target.playVideo();},
      onStateChange:event=>{if(token!==videoLoadToken)return;if(event.data===1){clearTimeout(videoLoadTimer);document.getElementById('video-status').textContent='';document.getElementById('video-retry-btn').classList.add('hidden');document.querySelector('.video-wrap').dataset.state='playing';document.querySelector('.video-wrap').setAttribute('aria-busy','false');}},
      onAutoplayBlocked:()=>{if(token!==videoLoadToken)return;clearTimeout(videoLoadTimer);document.querySelector('.video-wrap').dataset.state='ready';document.querySelector('.video-wrap').setAttribute('aria-busy','false');document.getElementById('video-status').textContent='Con bấm nút ▶ trên video để bắt đầu nhé.';},
      onError:event=>videoLoadFailed(token,[101,150,153].includes(event.data)?'YouTube chưa cho phép phát video trong app lúc này.':'Video chưa phát được. Con thử tải lại nhé.')
    }});
  }catch(error){videoManualPlayback(token);}
}`+s.slice(end);
s=s.replace('videoLoadToken++;clearTimeout(videoLoadTimer);videoLoadTimer=null;',"videoLoadToken++;clearTimeout(videoLoadTimer);videoLoadTimer=null;\n  document.getElementById('video-retry-btn')?.classList.add('hidden');");fs.writeFileSync(path,s);
const template='src/index.template.html';s=fs.readFileSync(template,'utf8');s=s.replace('<p id="video-status" role="status" aria-live="polite"></p>','<p id="video-status" role="status" aria-live="polite"></p>\n      <button class="btn hidden" id="video-retry-btn" onclick="startLessonVideo()">↻ Thử tải lại</button>');fs.writeFileSync(template,s);
