const fs=require('fs');let s=fs.readFileSync('src/app.js','utf8');const a=s.indexOf('function playVideo(l){'),b=s.indexOf('function setSky(',a);if(a<0||b<0)throw Error('Missing player');
s=s.slice(0,a)+`let lessonPlayer=null,videoLoadToken=0,videoLoadTimer=null,youtubeApiPromise=null,currentLessonVideo=null;
function loadYoutubeApi(){
  if(window.YT?.Player)return Promise.resolve(window.YT);
  if(youtubeApiPromise)return youtubeApiPromise;
  youtubeApiPromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;
    const timeout=setTimeout(()=>fail(),18000);
    const fail=()=>{clearTimeout(timeout);script.remove();youtubeApiPromise=null;reject(new Error('Không tải được trình phát YouTube'));};
    window.onYouTubeIframeAPIReady=()=>{clearTimeout(timeout);resolve(window.YT);};script.onerror=fail;document.head.appendChild(script);
  });return youtubeApiPromise;
}
function playVideo(l){
  stopVideo();currentLessonVideo=VIDEO_CATALOG[l.c]||null;
  const meta=currentLessonVideo,cover=document.getElementById('video-cover'),button=document.getElementById('video-play-btn'),status=document.getElementById('video-status'),wrap=document.querySelector('.video-wrap');
  cover.classList.remove('hidden');button.disabled=!meta;button.textContent='▶ Phát bài giảng';status.textContent='';wrap.dataset.state='idle';wrap.setAttribute('aria-busy','false');
  document.getElementById('video-source').textContent=meta?'Bài giảng · '+meta.channel+(meta.durationSeconds?' · '+Math.ceil(meta.durationSeconds/60)+' phút':''):'';
  document.getElementById('video-caption').textContent=meta?.title||'Bài này chưa có video.';
  const poster=document.getElementById('video-poster');poster.classList.toggle('hidden',!meta);if(meta)poster.src=meta.thumbnailUrl;else poster.removeAttribute('src');
  const link=document.getElementById('yt-link');link.classList.toggle('hidden',!meta);if(meta)link.href='https://www.youtube.com/watch?v='+meta.id;else link.removeAttribute('href');
  const source=document.getElementById('video-source-link');source.classList.toggle('hidden',!meta);if(meta)source.href=meta.sourceUrl;
  document.querySelector('.video-help').textContent='Con bấm phát để học cùng thầy cô, rồi làm bài luyện tập bên dưới nhé.';
}
function videoLoadFailed(token,message){
  if(token!==videoLoadToken)return;clearTimeout(videoLoadTimer);
  document.getElementById('video-cover').classList.remove('hidden');const button=document.getElementById('video-play-btn');button.disabled=false;button.textContent='↻ Thử tải lại';
  document.getElementById('video-status').textContent=message+' Con có thể bấm “Mở video trên YouTube” bên dưới.';
  document.querySelector('.video-wrap').dataset.state='error';document.querySelector('.video-wrap').setAttribute('aria-busy','false');
}
async function startLessonVideo(){
  if(!currentLessonVideo||!document.getElementById('video-screen').classList.contains('active'))return;
  stopVideo();const token=videoLoadToken,meta=currentLessonVideo,host=document.getElementById('video-player-host');
  document.getElementById('video-play-btn').disabled=true;document.getElementById('video-status').textContent='Đang tải bài giảng…';document.querySelector('.video-wrap').dataset.state='loading';document.querySelector('.video-wrap').setAttribute('aria-busy','true');
  videoLoadTimer=setTimeout(()=>videoLoadFailed(token,'Chưa tải được video. Kiểm tra mạng hoặc thử lại nhé.'),22000);
  try{const YT=await loadYoutubeApi();if(token!==videoLoadToken)return;
    const frame=document.createElement('iframe');frame.id='ytFrame';frame.title=meta.title;frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.src='https://www.youtube-nocookie.com/embed/'+meta.id+'?enablejsapi=1&playsinline=1&rel=0&autoplay=1'+(/^https?:$/.test(location.protocol)?'&origin='+encodeURIComponent(location.origin):'');host.replaceChildren(frame);
    lessonPlayer=new YT.Player(frame,{events:{
      onReady:event=>{if(token!==videoLoadToken)return;clearTimeout(videoLoadTimer);document.getElementById('video-cover').classList.add('hidden');document.getElementById('video-status').textContent='';document.querySelector('.video-wrap').dataset.state='ready';document.querySelector('.video-wrap').setAttribute('aria-busy','false');event.target.playVideo();},
      onStateChange:event=>{if(token!==videoLoadToken)return;if(event.data===1){document.getElementById('video-status').textContent='';document.querySelector('.video-wrap').dataset.state='playing';}},
      onAutoplayBlocked:()=>{if(token===videoLoadToken)document.getElementById('video-status').textContent='Con bấm nút phát trên video để bắt đầu nhé.';},
      onError:event=>videoLoadFailed(token,[101,150,153].includes(event.data)?'YouTube chưa cho phép phát video trong app lúc này.':'Video chưa phát được. Con thử tải lại nhé.')
    }});
  }catch(error){videoLoadFailed(token,'Chưa kết nối được với YouTube. Con thử lại nhé.');}
}
function stopVideo(){
  videoLoadToken++;clearTimeout(videoLoadTimer);videoLoadTimer=null;
  if(lessonPlayer){try{lessonPlayer.destroy();}catch(error){}lessonPlayer=null;}
  const host=document.getElementById('video-player-host');if(host)host.replaceChildren();
}

`+s.slice(b);fs.writeFileSync('src/app.js',s);
const p='src/index.template.html';s=fs.readFileSync(p,'utf8');const x=s.indexOf('      <div class="video-wrap">'),y=s.indexOf('        <div style="height:20px"></div>',x);if(x<0||y<0)throw Error('Missing video layout');s=s.slice(0,x)+`      <div class="video-wrap" data-state="idle" aria-busy="false">
        <div id="video-player-host"></div>
        <div id="video-cover">
          <img id="video-poster" alt="" referrerpolicy="no-referrer" onerror="this.classList.add('hidden')">
          <button class="btn" id="video-play-btn" onclick="startLessonVideo()">▶ Phát bài giảng</button>
        </div>
      </div>
      <p id="video-status" role="status" aria-live="polite"></p>
      <p id="video-caption"></p>
      <div class="video-links"><a id="yt-link" class="yt-link hidden" target="_blank" rel="noopener">Mở video trên YouTube</a><a id="video-source-link" class="hidden" target="_blank" rel="noopener">Nguồn bài giảng</a></div>
`+s.slice(y);fs.writeFileSync(p,s);
const t='tests/edge-cases.cjs';s=fs.readFileSync(t,'utf8').replace('/Clip ôn tập ngắn/','/Bài giảng/').replace('short video labeled honestly','lesson video identifies its source');fs.writeFileSync(t,s);
