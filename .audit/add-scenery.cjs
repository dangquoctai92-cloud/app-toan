const fs=require('fs');function edit(p,fn){fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')))}
edit('src/index.template.html',s=>s.replace('<div id="particles"></div>','<div id="particles" aria-hidden="true"></div>').replace('  <main>','  <main>\n    <div class="scene-toolbar"><button class="scene-toggle" data-scene-toggle onclick="toggleScenery()"></button></div>').replace('<div class="chip" id="chip-quiz"><span data-ic="star"></span><span id="quiz-stars">0</span></div>','<div class="chip" id="chip-quiz"><span data-ic="star"></span><span id="quiz-stars">0</span></div>\n        <button class="scene-toggle scene-toggle-compact" data-scene-toggle onclick="toggleScenery()"></button>'));
edit('src/app.js',s=>{const a=s.indexOf('function initParticles(){'),b=s.indexOf('/* ==================== INIT',a);if(a<0||b<0)throw Error('Missing scenery anchor');return s.slice(0,a)+`const sceneryMedia=window.matchMedia('(prefers-reduced-motion: reduce)');
let sceneryPaused=readStorage('bb3_scenery')==='off';
function updateScenery(){
  const paused=sceneryPaused||sceneryMedia.matches;
  document.body.classList.toggle('scenery-paused',paused);
  document.querySelectorAll('[data-scene-toggle]').forEach(button=>{
    const label=sceneryMedia.matches?'Nền tĩnh':paused?'Bật hoạt cảnh':'Dừng hoạt cảnh';
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+(paused?'<path d="m9 5 10 7-10 7z"/>':'<path d="M7 5h4v14H7zM15 5h4v14h-4z"/>')+'</svg><span>'+label+'</span>';
    button.setAttribute('aria-label',label);button.setAttribute('aria-pressed',String(!paused));button.disabled=sceneryMedia.matches;
  });
}
function toggleScenery(){
  sceneryPaused=!sceneryPaused;writeStorage('bb3_scenery',sceneryPaused?'off':'on');updateScenery();
}
function initParticles(){
  const art={
    cloud:'<svg viewBox="0 0 180 88"><path d="M24 71C-3 69 5 32 33 36 36 5 79-2 92 27c20-18 53-3 52 18 32-2 40 29 8 29H24z" fill="#fffef8" stroke="#d7e8e9" stroke-width="2"/><path d="M33 58q14 4 29 0m48 5q13 3 25-1" stroke="#e8f0ed" stroke-width="3" stroke-linecap="round" fill="none"/></svg>',
    butterfly:'<svg viewBox="0 0 80 70"><g class="scene-wings"><path d="M40 35C8-13-9 23 24 41 0 67 32 73 40 42" fill="var(--wing,#d1b5e9)" stroke="#8f79a1" stroke-width="2"/><path d="M40 35C72-13 89 23 56 41 80 67 48 73 40 42" fill="var(--wing,#d1b5e9)" stroke="#8f79a1" stroke-width="2"/><circle cx="21" cy="29" r="5" fill="#fff7e1"/><circle cx="59" cy="29" r="5" fill="#fff7e1"/></g><path d="M40 28v22m-1-23-6-9m8 9 6-9" fill="none" stroke="#6b6774" stroke-width="3" stroke-linecap="round"/></svg>',
    leaf:'<svg viewBox="0 0 64 64"><path d="M12 48Q3 15 54 8q4 46-34 43" fill="#adcfa0" stroke="#6d9d76" stroke-width="2"/><path d="m10 56 34-36m-20 21-3-16m12 7 14 1" fill="none" stroke="#6d9d76" stroke-width="2" stroke-linecap="round"/></svg>',
    plane:'<svg viewBox="0 0 120 88"><path d="m8 37 103-27-32 63-25-23-20 15 2-25z" fill="#fff9e8" stroke="#9aabb4" stroke-width="2.5" stroke-linejoin="round"/><path d="m36 40 75-30-57 40-20 15 6-20" fill="#d4e9ee" stroke="#9aabb4" stroke-width="2" stroke-linejoin="round"/></svg>'
  };
  const sprites=[['cloud',6,170,88,-21,14],['cloud',28,112,72,-45,76],['cloud',63,148,96,-10,38],['cloud',84,130,82,-66,86],['butterfly',18,44,34,-9,24],['butterfly',51,34,42,-28,82],['butterfly',77,40,38,-18,9],['leaf',37,30,48,-31,62],['leaf',68,24,54,-9,16],['leaf',91,34,62,-42,71],['plane',42,74,64,-34,46]];
  const host=document.getElementById('particles');host.replaceChildren();
  sprites.forEach(([kind,y,size,duration,delay,x],i)=>{const sprite=document.createElement('span');sprite.className='scene-sprite scene-'+kind;sprite.style.cssText='--y:'+y+'%;--size:'+size+'px;--duration:'+duration+'s;--delay:'+delay+'s;--still-x:'+x+'%;--wing:'+(i%2?'#efc692':'#d1b5e9');sprite.innerHTML='<span class="scene-sway">'+art[kind]+'</span>';host.appendChild(sprite);});
  updateScenery();
  sceneryMedia.addEventListener('change',updateScenery);
  const syncVisibility=()=>document.body.classList.toggle('scenery-hidden',document.hidden);
  document.addEventListener('visibilitychange',syncVisibility);syncVisibility();
}

`+s.slice(b).replace("// Decoration is disabled during study to keep attention on the exercise.\nif(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)initParticles();","// Decorative scenery stays behind the lesson and can be paused.\ninitParticles();");});
