const hasAdv = code => !!(ADV[code] && ADV[code].length);

const hasBank = code => !!(BANKS[code] && BANKS[code].length);

/* ==================== NAVIGATION ==================== */
function showScreen(id){
  if(id !== 'summary-screen')lockParentResults();
  screenVersion++; clearTimeout(victoryTimer); victoryTimer=null;
  document.getElementById('victory-overlay').classList.remove('show');
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const t = document.getElementById(id);
  if (t) t.classList.add('active');
  document.body.classList.toggle('focus', id === 'quiz-screen');
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('on', b.dataset.nav === id));
  if (id === 'profile-screen') renderProfile();
  if (id !== 'video-screen') stopVideo();
  window.scrollTo({top:0});
}
function goMap(){ showScreen('map-screen'); initMap(); setSky(ISLANDS[0]); }

function startLesson(code){
  const l = byCode[code];
  if(!l)return;
  activeLesson = l;
  const island = ISLANDS.find(i => i.lessons.includes(l));
  setSky(island);
  playVideo(l);
  const ab = document.getElementById('adv-btn');
  ab.classList.toggle('hidden', !hasAdv(code));
  ab.onclick = () => startQuiz(code, 'adv');
  const sb = document.getElementById('video-start-btn');
  if (hasBank(code)){ sb.disabled = false; sb.innerText = 'Bắt đầu luyện tập'; }
  else { sb.disabled = true; sb.innerText = 'Bài tập đang được cập nhật'; }
  document.getElementById('video-title').innerHTML = ic(l.icon) + ` <span>Bài ${l.num}: ${l.n}</span>`;
  showScreen('video-screen');
}

function playVideo(l){
  const yt = document.getElementById('ytFrame');
  const v = document.getElementById('mathVideo');
  const source=document.getElementById('video-source');if(source){const meta=VIDEO_CATALOG[l.c];source.textContent=meta?(l.c==='b1'?'Clip ôn tập ngắn: ':'Video tham khảo: ')+meta.title:'';}
  const help=document.querySelector('.video-help');if(help)help.textContent='Nếu video không phát, con có thể mở trên YouTube hoặc bắt đầu làm bài bên dưới.';
  if (l.v){
    const org = location.protocol.indexOf('http') === 0 ? '&origin=' + encodeURIComponent(location.origin) : '';
    yt.src = 'https://www.youtube-nocookie.com/embed/' + l.v + '?rel=0&modestbranding=1&playsinline=1' + org;
    const lk = document.getElementById('yt-link');
    if (lk){ lk.href = 'https://www.youtube.com/watch?v=' + l.v; lk.classList.remove('hidden'); }
    yt.classList.remove('hidden');
    v.classList.add('hidden'); v.pause(); v.removeAttribute('src');
  } else {
    yt.removeAttribute('src'); yt.classList.add('hidden');
    const lk0 = document.getElementById('yt-link'); if (lk0) lk0.classList.add('hidden');
    v.classList.add('hidden');v.removeAttribute('src');
    const help=document.querySelector('.video-help');if(help)help.textContent='Bài này chưa có video. Con vẫn có thể bắt đầu luyện tập bên dưới.';
  }
}

function stopVideo(){
  const yt = document.getElementById('ytFrame');
  if (yt && yt.getAttribute('src')) yt.removeAttribute('src');
  const v = document.getElementById('mathVideo');
  if (v) v.pause();
}

function setSky(island){
  if (!island) return;
  document.documentElement.style.setProperty('--sky1', island.sky[0]);
  document.documentElement.style.setProperty('--sky2', island.sky[1]);
  document.documentElement.style.setProperty('--accent', island.accent);
}

/* ==================== MAP ==================== */
function initMap(){
  const wrap = document.getElementById('map-content');
  wrap.innerHTML = '';
  const next=ALL.find(l=>!S.done.includes(l.c));
  if(next){const resume=document.createElement('button');resume.className='continue-card';resume.textContent='Học tiếp · Bài '+next.num+': '+next.n;resume.onclick=()=>startLesson(next.c);wrap.appendChild(resume);}
  let firstTodo = true;

  ISLANDS.forEach((island, ti) => {
    const items = island.lessons;
    const doneCount = items.filter(l => S.done.includes(l.c)).length;
    const pct = Math.round(doneCount / items.length * 100);

    if (ti === 0 || ti === 7){
      const lb = document.createElement('div');
      lb.className = 'book-label';
      lb.innerHTML = '<i></i><span>TOÁN 3 · ' + (ti === 0 ? 'TẬP MỘT' : 'TẬP HAI') + '</span><i></i>';
      wrap.appendChild(lb);
    }
    const sec = document.createElement('div');
    sec.className = 'island';
    sec.style.setProperty('--c1', island.c1);
    sec.style.setProperty('--c2', island.c2);
    sec.innerHTML = `<div class="island-head" role="button" tabindex="0" aria-expanded="false" aria-controls="grid-${island.id}">
      <span class="em">${ic(island.icon)}</span>
      <div style="flex:1;position:relative"><h2>${island.title}</h2>
        <div class="sub">${doneCount === items.length ? 'Đã chinh phục trọn vẹn!' : 'Chinh phục từng bài nhé!'}</div></div>
      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      <div class="ring"><svg width="52" height="52">
        <circle cx="26" cy="26" r="21" stroke="rgba(255,255,255,.35)" stroke-width="6" fill="none"/>
        <circle cx="26" cy="26" r="21" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"
          stroke-dasharray="132" stroke-dashoffset="${132 - 132 * pct / 100}"
          style="transition:stroke-dashoffset 1s ease"/></svg><b>${doneCount}/${items.length}</b></div></div>
      <div class="grid" id="grid-${island.id}"></div>`;
    const grid = sec.querySelector('.grid');
    const hasNow = island.lessons.some(l => !S.done.includes(l.c)) && firstTodo;
    sec.querySelector('.island-head').onclick = () => {
      const open = sec.classList.contains('collapsed');
      if (open) document.querySelectorAll('.island').forEach(x => x.classList.add('collapsed'));
      sec.classList.toggle('collapsed', !open);
      document.querySelectorAll('.island').forEach(x=>x.querySelector('.island-head').setAttribute('aria-expanded',String(!x.classList.contains('collapsed'))));
      if (open) sec.scrollIntoView({behavior:'smooth', block:'start'});
    };

    const wasNow = hasNow;
    items.forEach(l => {
      const done = S.done.includes(l.c);
      const isNow = !done && firstTodo;
      if (isNow) firstTodo = false;
      const soon = !hasBank(l.c);
      const adv = hasAdv(l.c);
      const t = document.createElement('button');
      t.className = (soon ? 'tile soon' : 'tile') + (l.last ? ' boss' : '') + (done ? ' done' : isNow ? ' now' : '');
      const disc = `<span class="disc">${ic(done ? 'check' : l.icon)}</span>`;
      const tag = soon ? '<span class="soon-tag">SẮP CÓ</span>' : S.doneAdv.includes(l.c) ? '<span class="adv-tag">ĐÃ XONG NÂNG CAO</span>' : done ? '<span class="adv-tag">ĐÃ XONG CƠ BẢN</span>' : '';
      t.innerHTML = tag + (l.last
        ? `${isNow ? '<span class="go">BẮT ĐẦU</span>' : ''}${disc}
           <span class="txt"><span class="no">Bài ${l.num}</span><span class="nm">${l.n}</span></span>`
        : `${isNow ? '<span class="go">BẮT ĐẦU</span>' : ''}${disc}
           <span class="no">Bài ${l.num}</span><span class="nm">${l.n}</span>`);
      t.onclick = () => startLesson(l.c);
      grid.appendChild(t);
    });

    if (!wasNow) sec.classList.add('collapsed');
    const head=sec.querySelector('.island-head');head.setAttribute('aria-expanded',String(wasNow));
    head.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();head.click();}};
    wrap.appendChild(sec);
  });

  refreshHeader();
  checkFinal();
}

function checkFinal(){
  const total = ALL.length;
  const box = document.getElementById('final-box'), btn = document.getElementById('final-exam-btn');
  if (S.done.length >= total){
    box.classList.add('on'); btn.disabled = false;
    btn.innerHTML = ic('crown') + ' Vào thi ngay';
    btn.onclick = () => startQuiz('final');
  } else {
    box.classList.remove('on'); btn.disabled = true;
    btn.innerHTML = `Còn ${total - S.done.length}/${total} bài nữa`;
  }
}

const TIPS = ['Nhân chia trước, cộng trừ sau.',
  'Tính trong ngoặc ( ) trước tiên nhé.',
  '1 m = 100 cm, 1 km = 1000 m.',
  'Chu vi hình chữ nhật = (dài + rộng) × 2.',
  'Diện tích hình vuông = cạnh × cạnh.',
  '1 giờ = 60 phút, 1 phút = 60 giây.',
  'Muốn tìm 1/4 của một số thì lấy số đó chia 4.'];

function refreshHeader(){
  document.getElementById('header-stars').innerText = S.stars;
  document.getElementById('header-streak').innerText = activeStreak();
  document.getElementById('r-stars').innerText = S.stars;
  document.getElementById('r-streak').innerText = activeStreak();
  document.getElementById('r-lessons').innerText = S.done.length;
  document.getElementById('r-acc').innerText = S.totalQ ? Math.round(S.totalCorrect / S.totalQ * 100) + '%' : '0%';
  document.getElementById('r-tip').innerText = pick(TIPS);
  const rp = document.getElementById('r-prog');
  rp.innerHTML = '';
  ISLANDS.forEach(i => {
    const tot = i.lessons.length;
    const done = i.lessons.filter(l => S.done.includes(l.c)).length;
    const el = document.createElement('div');
    el.className = 'prog';
    el.style.padding = '9px 12px';
    el.innerHTML = `<span class="em">${ic(i.icon)}</span><div class="info" style="font-size:13.5px">${i.title}
      <span> · ${done}/${tot}</span>
      <div class="track"><i style="width:${done/tot*100}%;background:linear-gradient(90deg,${i.c1},${i.c2})"></i></div></div>`;
    rp.appendChild(el);
  });
}

/* ==================== PROFILE ==================== */
function renderProfile(){
  document.getElementById('p-stars').innerText = S.stars;
  document.getElementById('p-streak').innerText = activeStreak();
  document.getElementById('p-lessons').innerText = S.done.length + (S.doneAdv.length ? ' + ' + S.doneAdv.length + ' NC' : '');
  document.getElementById('p-acc').innerText = S.totalQ ? Math.round(S.totalCorrect / S.totalQ * 100) + '%' : '0%';

  const pl = document.getElementById('prog-list');
  pl.innerHTML = '';
  ISLANDS.forEach(i => {
    const items = i.lessons.length;
    const done = i.lessons.filter(l => S.done.includes(l.c)).length;
    const el = document.createElement('div');
    el.className = 'prog';
    el.innerHTML = `<span class="em">${ic(i.icon)}</span>
      <div class="info">${i.title}<span> · ${done}/${items} bài</span>
        <div class="track"><i style="width:${done/items*100}%;background:linear-gradient(90deg,${i.c1},${i.c2})"></i></div>
      </div>`;
    pl.appendChild(el);
  });

  const box = document.getElementById('badges');
  box.innerHTML = '';
  BADGES.forEach(b => {
    const d = document.createElement('button');
    d.type='button';
    d.className = 'badge' + (b.need(S) ? ' on' : '');
    d.innerHTML = ic(b.em) + '<span class="badge-label">'+escapeText(b.t)+'</span>';
    d.title = b.t;d.setAttribute('aria-label',b.t+(b.need(S)?' · Đã đạt':' · Chưa đạt'));d.onclick=()=>alert(b.t+(b.need(S)?' · Con đã đạt huy hiệu này.':' · Tiếp tục luyện tập để mở huy hiệu này.'));
    box.appendChild(d);
  });
}

/* ==================== QUIZ ==================== */
async function startQuiz(code, mode){
  quizMode = mode === 'adv' ? 'nangcao' : 'thuong';
  quizCode = code || (activeLesson ? activeLesson.c : 'b1');
  const btn = document.getElementById('video-start-btn');
  const old = btn.innerText;
  if (quizMode === 'nangcao' && !hasAdv(quizCode)){ alert('Bài này chưa có phần nâng cao!'); return; }
  if (quizMode === 'thuong' && !hasBank(quizCode) && quizCode !== 'final'){ alert('Bài này chưa có bài tập, đang cập nhật nhé!'); return; }

  if (quizCode === 'final'){
    quizQs = [];
    quizQs = generateFinal();
  } else {
    quizQs = quizMode === 'nangcao'
      ? generateAdv(quizCode)
      : generateQuestions(quizCode, (BANKS[quizCode] || []).length || 10);
  }
  btn.innerText = old; btn.disabled = false;

  if(!quizQs.length){alert('Chưa tạo được đề. Con thử mở bài lại nhé.');return;}
  quizFinished=false;submissionLocked=false;
  TOTALQ = quizQs.length;
  quizHistory = []; qIndex = 0; gained = 0; answer = ''; reviewMode = false;
  document.getElementById('q-total').innerText = TOTALQ;
  document.getElementById('quiz-stars').innerText = 0;
  showScreen('quiz-screen');
  updateProgress();
  loadQuestion();
}

function loadQuestion(){
  const screen=document.getElementById('quiz-screen');if(screen)screen.scrollTop=0;
  answer = '';
  subs = []; act = 0; links = []; selLeft = null;
  currentQ = quizQs[qIndex];
  paint();
  document.getElementById('review-nav').classList.add('hidden');
}

function paint(){
  const rb = document.getElementById('q-ribbon');
  if (rb){ rb.classList.toggle('adv', quizMode === 'nangcao');
    document.getElementById('q-ribbon-txt').innerText = quizMode === 'nangcao' ? 'Nâng cao' : 'Luyện tập'; }
  document.getElementById('ex-no').innerText = currentQ.no || 1;
  document.getElementById('q-cmd').innerHTML = currentQ.cmd || '';
  document.getElementById('q-body').innerHTML = currentQ.body || '';
  document.getElementById('q-index').innerText = qIndex + 1;
  let status=document.getElementById('answer-status');if(!status){status=document.createElement('p');status.id='answer-status';status.className='answer-status';status.setAttribute('role','status');document.getElementById('question-box').appendChild(status);}status.textContent='';
  const lesson=document.getElementById('lesson-label');if(lesson)lesson.textContent=quizCode==='final'?'Thử thách cuối năm':('Bài '+byCode[quizCode].num+' · '+byCode[quizCode].n);

  requestAnimationFrame(() => {
    const bodyEl = document.getElementById('q-body');
    if (!bodyEl) return;
    const w = bodyEl.clientWidth;
    bodyEl.querySelectorAll('.tbl-wrap').forEach(el=>{if(el.scrollWidth>el.clientWidth+4){el.setAttribute('tabindex','0');el.setAttribute('aria-label','Bảng có thể cuộn ngang');if(!el.previousElementSibling?.classList.contains('scroll-hint')){const hint=document.createElement('p');hint.className='scroll-hint';hint.textContent='Vuốt bảng sang ngang để xem và điền các cột còn lại';el.before(hint);}}});
    [...bodyEl.children].forEach(el => {
      if (el.scrollWidth > el.clientWidth + 2 || el.getBoundingClientRect().width > w + 2) el.classList.add('xscroll');
    });
  });

  document.querySelectorAll('#q-body table').forEach(t => {
    if (!t.parentElement.classList.contains('tbl-wrap')){
      const w = document.createElement('div');
      w.className = 'tbl-wrap';
      t.parentElement.insertBefore(w, t);
      w.appendChild(t);
    }
  });

  const B = currentQ.blanks || [];
  document.querySelectorAll('#q-body .qin').forEach(inp => {
    const i = +inp.dataset.b, bl = B[i] || {};
    const len = Math.max(bl.len || 3, String(bl.a == null ? '' : bl.a).length);
    inp.setAttribute('aria-label',(bl.text?'Cách đọc số':'Đáp án')+' · ô '+(i+1));inp.autocomplete='off';
    if (bl.text){
      inp.value = subs[i] || '';
      inp.classList.toggle('filled', !!(subs[i] || '').trim());
      inp.oninput = () => {
        subs[i] = inp.value;
        inp.classList.toggle('filled', !!inp.value.trim());
      };
    } else {
    inp.maxLength = len;
    inp.style.width = (len * 15 + 30) + 'px';
    inp.value = subs[i] || '';
    inp.classList.toggle('filled', (subs[i] || '').length === len);
    inp.oninput = () => {
      inp.value = inp.value.replace(/\D/g, '').slice(0, len);
      subs[i] = inp.value;
      inp.classList.toggle('filled', inp.value.length === len);
      syncReads();
      if (inp.value.length === len){
        const next = document.querySelector('#q-body .qin[data-b="' + (i + 1) + '"]');
        if (next) next.focus();
      }
    };
    }
    inp.onkeydown = ev => {
      if (ev.key === 'Enter'){ ev.preventDefault(); ev.stopPropagation(); if(!ev.isComposing)submitAnswer(); }
      if (ev.key === 'Backspace' && !inp.value){
        const prev = document.querySelector('#q-body .qin[data-b="' + (i - 1) + '"]');
        if (prev){ prev.focus(); ev.preventDefault(); }
      }
    };
    inp.onfocus = () => { act = i; };
  });
  if (document.getElementById('m-lines')) drawFixedLines();

  document.querySelectorAll('#q-body .pk').forEach(btn => {
    const i = +btn.dataset.b, v = btn.dataset.v;
    const cur = (subs[i] || '').split(',').filter(Boolean);
    btn.classList.toggle('on', cur.includes(v));
    btn.setAttribute('aria-pressed',String(cur.includes(v)));btn.classList.toggle('word-option',String(v).length>2);
    btn.onclick = () => {
      const set = new Set((subs[i] || '').split(',').filter(Boolean));
      if(currentQ.blanks[i].multiple === false){set.clear();set.add(v);}else{set.has(v) ? set.delete(v) : set.add(v);}
      subs[i] = [...set].sort().join(',');
      document.querySelectorAll('#q-body .pk').forEach(choice=>{if(+choice.dataset.b===i){const selected=set.has(choice.dataset.v);choice.classList.toggle('on',selected);choice.setAttribute('aria-pressed',String(selected));}});
    };
  });

  const SIGNS = ['>', '<', '='];
  document.querySelectorAll('#q-body .qsign').forEach(btn => {
    const i = +btn.dataset.b;
    btn.innerText = subs[i] || '?';btn.setAttribute('aria-label','Dấu so sánh ô '+(i+1)+': '+(subs[i]||'chưa chọn'));
    btn.classList.toggle('filled', !!subs[i]);
    btn.onclick = () => {
      const cur = SIGNS.indexOf(subs[i] || '');
      subs[i] = SIGNS[(cur + 1) % SIGNS.length];
      btn.innerText = subs[i];
      btn.classList.add('filled');btn.setAttribute('aria-label','Dấu so sánh ô '+(i+1)+': '+subs[i]);
    };
  });

  syncReads();

  if (!reviewMode){
    const btn = document.createElement('button');
    btn.className = 'check-inline';
    btn.innerText = qIndex < TOTALQ - 1 ? 'Bài tiếp theo →' : 'Xem kết quả';
    btn.onclick = submitAnswer;
    btn.title = 'Ctrl + →: bỏ qua câu này';
    document.getElementById('q-body').appendChild(btn);
    if (devMode){
      const sk = document.createElement('button');
      sk.className = 'skip-btn';
      sk.innerText = 'Bỏ qua câu này →';
      sk.onclick = skipQuestion;
      document.getElementById('q-body').appendChild(sk);
    }
  }

  if (document.getElementById('m-lines')){
    requestAnimationFrame(drawFixedLines);
    setTimeout(drawFixedLines, 120);
  }

  const first = document.querySelector('#q-body .qin:not(.filled)') || document.querySelector('#q-body .qin');
  // Keep touch keyboards closed until the learner taps an input.
  

  const ch = document.getElementById('choices');
  const op = document.getElementById('orderpad');
  ch.classList.toggle('hidden', currentQ.type !== 'choice');
  op.classList.toggle('hidden', currentQ.type !== 'order');

  if (currentQ.type === 'choice'){
    ch.innerHTML = '';
    currentQ.opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'choice' + (currentQ.big ? ' big' : '') + (answer === o ? ' sel' : '');
      b.innerText = o;
      b.onclick = () => { answer = o; paint(); };
      ch.appendChild(b);
    });
  }
  if (currentQ.type === 'order'){
    const picked = answer ? answer.split(',') : [];
    op.innerHTML = '';
    currentQ.opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'ochip' + (picked.includes(String(o)) ? ' used' : '');
      b.innerText = o;
      b.onclick = () => { answer = picked.concat(String(o)).join(','); paint(); };
      op.appendChild(b);
    });
    if (picked.length){
      const r = document.createElement('button');
      r.className = 'ochip reset';
      r.innerText = 'Làm lại';
      r.onclick = () => { answer = ''; paint(); };
      op.appendChild(r);
    }
  }

  const slot = document.getElementById('order-slot');
  if (slot){
    const picked = answer ? answer.split(',') : [];
    slot.innerHTML = picked.length
      ? picked.map(x => '<span class="cnode">' + x + '</span>')
          .join('<span class="sep">' + (currentQ.sep || '·') + '</span>')
      : '<span class="hint">Chạm vào các số theo đúng thứ tự</span>';
  }
}

function paintMatch(){
  const wrap = document.getElementById('match2');
  if (!wrap) return;
  wrap.querySelectorAll('.mbox').forEach(b => {
    const i = +b.dataset.l;
    b.classList.toggle('sel', selLeft === i);
    b.classList.toggle('linked', links[i] != null);
    b.onclick = () => { selLeft = (selLeft === i ? null : i); links[i] = null; paintMatch(); };
  });
  wrap.querySelectorAll('.mtarget').forEach(t => {
    const j = +t.dataset.r;
    t.onclick = ev => {
      if (ev.target.classList.contains('slot-in')) return;
      if (selLeft == null) return;
      links.forEach((v, k) => { if (v === j) links[k] = null; });
      links[selLeft] = j;
      selLeft = null;
      paintMatch();
    };
  });
  wrap.querySelectorAll('.slot-in').forEach(inp => {
    const j = +inp.dataset.r;
    inp.value = subs['s' + j] || '';
    inp.classList.toggle('filled', !!(subs['s' + j] || '').trim());
    inp.oninput = () => {
      inp.value = inp.value.replace(/\D/g, '').slice(0, 4);
      subs['s' + j] = inp.value;
      inp.classList.toggle('filled', !!inp.value);
    };
  });
  drawLinks();
}

function drawFixedLines(){
  const wrap = document.getElementById('match2');
  const svg = document.getElementById('m-lines');
  if (!wrap || !svg) return;
  const W = wrap.getBoundingClientRect();
  if (!W.width) return;
  svg.setAttribute('viewBox', `0 0 ${W.width} ${W.height}`);
  const pairs = currentQ.pairs || [];
  let d = '';
  pairs.forEach(([i, j]) => {
    const a = wrap.querySelector('.mbox[data-l="' + i + '"]');
    const b = wrap.querySelector('.mtarget[data-r="' + j + '"]');
    if (!a || !b) return;
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    const x1 = ra.right - W.left, y1 = ra.top + ra.height/2 - W.top;
    const x2 = rb.left - W.left + 6, y2 = rb.top + rb.height/2 - W.top;
    const mx = (x1 + x2) / 2;
    d += `<path d="M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}" fill="none"
      stroke="${BOX_COLORS[i % 4]}" stroke-width="2.6" stroke-linecap="round"/>`;
  });
  svg.innerHTML = d;
}
addEventListener('resize', () => { if (document.getElementById('m-lines')) drawFixedLines(); });

function drawLinks(){
  const wrap = document.getElementById('match2');
  const svg = document.getElementById('m-lines');
  if (!wrap || !svg) return;
  const W = wrap.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${W.width} ${W.height}`);
  const COL = BOX_COLORS;
  let d = '';
  links.forEach((j, i) => {
    if (j == null) return;
    const a = wrap.querySelector('.mbox[data-l="' + i + '"]');
    const b = wrap.querySelector('.mtarget[data-r="' + j + '"]');
    if (!a || !b) return;
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    const x1 = ra.right - W.left, y1 = ra.top + ra.height/2 - W.top;
    const x2 = rb.left - W.left, y2 = rb.top + rb.height/2 - W.top;
    const mx = (x1 + x2) / 2;
    d += `<path d="M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}" fill="none"
      stroke="${COL[i % 4]}" stroke-width="2.6" stroke-linecap="round"/>`;
  });
  svg.innerHTML = d;
}
addEventListener('resize', () => { if (currentQ && currentQ.type === 'match') drawLinks(); });

function skipQuestion(){
  if(!currentQ||(!reviewMode&&quizFinished))return;
  if(reviewMode){
    saveReviewResponse(collectResponse());
    if(reviewPtr<wrongIdx.length-1){reviewPtr++;loadReview();}else{reviewMode=false;showSummary();}
    return;
  }
  if (!document.getElementById('quiz-screen').classList.contains('active')) return;
  quizHistory.push({idx:qIndex + 1, question:currentQ.q || '(bỏ qua)', userAnswer:'—',
    correctAnswer:(currentQ.blanks ? currentQ.blanks.map(b => b.a).join('|') : currentQ.a),
    isCorrect:false, explanation:'Đã bỏ qua'});
  answer = '';
  if (qIndex < TOTALQ - 1){ qIndex++; updateProgress(); loadQuestion(); }
  else { updateProgress(true); finishQuiz(); }
}

function syncReads(){
  document.querySelectorAll('#q-body [data-read]').forEach(c => {
    const v = subs[+c.dataset.read] || '';
    c.innerText = v ? readNum(+v) : '?';
    c.classList.toggle('done', !!v);
  });
}


const appendNumber = n => {
  if (!currentQ) return;
  if (currentQ.type === 'multi'){
    const max = currentQ.blanks[act].len || 3;
    const cur = subs[act] || '';
    subs[act] = (cur.length >= max ? '' : cur) + n;
    if ((subs[act] || '').length >= max && act < currentQ.blanks.length - 1) act++;
    paint(); return;
  }
  if (currentQ.type !== 'num') return;
  if (answer.length < 7){ answer += n; paint(); }
};
const clearAnswer = () => {
  if (currentQ && currentQ.type === 'multi'){ subs[act] = ''; paint(); return; }
  answer = ''; paint();
};
const backspace = () => {
  if (currentQ && currentQ.type === 'multi'){
    if (subs[act]) subs[act] = subs[act].slice(0, -1);
    else if (act > 0){ act--; subs[act] = (subs[act] || '').slice(0, -1); }
    paint(); return;
  }
  answer = answer.slice(0, -1); paint();
};

const norm = s => String(s ?? '').normalize('NFC').toLowerCase().trim().replace(/\s+/g,' ');
function matchBlank(b,v){
  if(b.pickList)return [...new Set(String(v??'').split(',').filter(Boolean))].sort().join(',')===String(b.a).split(',').filter(Boolean).sort().join(',');
  if(b.text)return (b.alts||[b.a]).some(x=>norm(x)===norm(v));
  return /^[0-9]+$/.test(String(b.a)) ? /^[0-9]+$/.test(String(v).trim())&&Number(v)===Number(b.a) : String(v).trim()===String(b.a).trim();
}
function collectResponse(){
  const B=currentQ.blanks||[];
  const values=B.map((_,i)=>String(subs[i]??'').trim());
  const missing=B.map((_,i)=>i).filter(i=>!values[i]);
  if(B.length)return {complete:!missing.length,missing,values,answer:values.join('|'),marks:B.map((b,i)=>matchBlank(b,values[i]))};
  return {complete:!!answer,missing:[],values:[answer],answer,marks:[String(answer)===String(currentQ.a)]};
}
function responseNotice(text){const el=document.getElementById('answer-status');if(el)el.textContent=text;}
function validateResponse(r){
  document.querySelectorAll('#q-body [data-b]').forEach(el=>{const missing=r.missing.includes(+el.dataset.b);el.classList.toggle('answer-missing',missing);el.setAttribute('aria-invalid',String(missing));});
  if(r.complete)return true;
  responseNotice('Con còn '+(r.missing.length||1)+' ô chưa trả lời. Điền đủ rồi thử lại nhé.');
  const target=document.querySelector('#q-body .answer-missing');if(target){target.scrollIntoView({block:'center',behavior:'smooth'});target.focus({preventScroll:true});}return false;
}
function saveReviewResponse(r){
  const entry=quizHistory[qIndex];entry.reviewAnswer=r.answer;entry.reviewCorrect=r.complete&&r.marks.every(Boolean);entry.reviewMarks=r.marks;
}
function submitAnswer(){
  if(!currentQ||submissionLocked||(!reviewMode&&quizFinished))return false;
  if(!document.getElementById('quiz-screen').classList.contains('active'))return false;
  const r=collectResponse();if(!validateResponse(r))return false;
  answer=r.answer;const ok=r.marks.every(Boolean);
  if(reviewMode){saveReviewResponse(r);document.querySelectorAll('#q-body [data-b]').forEach(el=>{const i=+el.dataset.b;el.classList.toggle('answer-wrong',r.marks[i]===false);el.classList.toggle('answer-right',r.marks[i]===true);el.setAttribute('aria-invalid',String(r.marks[i]===false));});responseNotice(ok?'Đúng rồi! Con có thể sang câu tiếp theo.':'Còn '+r.marks.filter(x=>!x).length+' ô chưa đúng. Con thử lại nhé.');feedback(ok);return true;}
  submissionLocked=true;requestAnimationFrame(()=>submissionLocked=false);
  quizHistory.push({idx:qIndex+1,question:currentQ.q,userAnswer:r.answer,correctAnswer:currentQ.a,isCorrect:ok,marks:r.marks,explanation:currentQ.explanation});
  answer='';if(qIndex<TOTALQ-1){qIndex++;updateProgress();loadQuestion();}else{updateProgress(true);finishQuiz();}return true;
}

function feedback(ok){
  const box = document.getElementById('question-box');
  box.classList.remove('ok', 'no'); void box.offsetWidth;
  box.classList.add(ok ? 'ok' : 'no');
  setTimeout(() => box.classList.remove('ok', 'no'), 700);
  if (ok) burst(['star','sparkle']);
  if (navigator.vibrate) navigator.vibrate(ok ? 30 : [40, 60, 40]);
}

function burst(set){
  const host = document.getElementById('burst');
  const b = document.getElementById('question-box').getBoundingClientRect();
  for (let i = 0; i < 12; i++){
    const s = document.createElement('span');
    s.className = 'spark';
    s.innerHTML = ic(pick(set));
    s.style.left = (b.left + b.width / 2) + 'px';
    s.style.top = (b.top + b.height / 2) + 'px';
    s.style.setProperty('--tx', R(-180, 180) + 'px');
    s.style.setProperty('--ty', R(-220, -40) + 'px');
    s.style.setProperty('--tr', R(-220, 220) + 'deg');
    host.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }
}

function addStars(n){
  gained += n; S.stars += n; saveState();
  document.getElementById('quiz-stars').innerText = gained;
  ['chip-quiz','chip-star'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
  });
  refreshHeader();
}

function updateProgress(end){
  const p = end ? 100 : 8 + (qIndex / TOTALQ) * 92;
  document.getElementById('progress-bar').style.width = p + '%';
}

/* ==================== SUMMARY ==================== */
function finishQuiz(){
  if(quizFinished)return;quizFinished=true;
  const correct = quizHistory.filter(h => h.isCorrect).length;
  gained = correct * (quizMode === 'nangcao' ? 15 : 10);
  S.stars += gained;
  document.getElementById('quiz-stars').innerText = gained;
  S.totalQ += quizHistory.length;
  S.totalCorrect += correct;
  if (correct >= quizHistory.length * .7 && quizCode !== 'final'){
    if (quizMode === 'nangcao'){ if (!S.doneAdv.includes(quizCode)) S.doneAdv.push(quizCode); }
    else if (!S.done.includes(quizCode)) S.done.push(quizCode);
  }
  bumpStreak(); saveState();refreshHeader();
  showSummary();
}

function bumpStreak(){const today=dayLabel();if(S.lastDay===today)return;S.streak=S.lastDay===dayLabel(-1)?S.streak+1:1;S.lastDay=today;}

let parentResultsUnlocked=false;
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
  lockParentResults();
  const total=quizHistory.length,correct=quizHistory.filter(h=>h.isCorrect).length;
  document.getElementById('summary-big').textContent=correct+'/'+total;
  document.getElementById('summary-score').textContent=correct===total?'Con đã làm đúng hết trong lần đầu!':correct>=total*.7?'Con làm tốt rồi. Mình cùng xem lại nhé!':'Mình cùng xem lại và sửa những chỗ chưa đúng nhé.';
  document.getElementById('score-arc').style.strokeDashoffset=total?415-415*correct/total:415;
  const aa=document.getElementById('adv-after');const showAdv=quizMode==='thuong'&&hasAdv(quizCode);aa.classList.toggle('hidden',!showAdv);if(showAdv)aa.onclick=()=>startQuiz(quizCode,'adv');
  showScreen('summary-screen');
  if(total&&correct===total){celebrate({particleCount:100,spread:90,origin:{y:.4}});}
}
function renderParentResults(){
  if(!parentResultsUnlocked)return;
  const total=quizHistory.length,correct=quizHistory.filter(h=>h.isCorrect).length;
  const revised=quizHistory.filter(h=>!h.isCorrect&&h.reviewCorrect).length;
  document.getElementById('summary-review').textContent=revised?'Sau khi ôn lại: '+(correct+revised)+'/'+total+' câu đã đúng. Điểm lần đầu được giữ nguyên.':'';
  const body=document.getElementById('summary-table-body');body.innerHTML='';
  quizHistory.forEach((it,i)=>{
    const fixed=!it.isCorrect&&it.reviewCorrect;
    const row=document.createElement('div');row.className='row '+(it.isCorrect||fixed?'ok':'no');
    const idx=document.createElement('div');idx.className='idx';idx.textContent=it.idx;
    const content=document.createElement('div');content.className='q';
    const heading=document.createElement('p');heading.textContent='Câu '+it.idx+' · '+(it.isCorrect?'Đúng lần đầu':fixed?'Đã sửa đúng':'Cần xem lại');content.appendChild(heading);
    const user=document.createElement('p');user.textContent='Lần đầu: '+String(it.userAnswer??'Chưa trả lời').split('|').join(' · ');content.appendChild(user);
    if(it.reviewAnswer!=null){const reviewed=document.createElement('p');reviewed.textContent='Ôn lại: '+it.reviewAnswer.split('|').join(' · ');content.appendChild(reviewed);}
    if(!it.isCorrect){const solution=document.createElement('p');solution.className='correct-answer';solution.textContent='Đáp án: '+String(it.correctAnswer??'').split('|').join(' · ');content.appendChild(solution);}
    const details=document.createElement('details');const label=document.createElement('summary');label.textContent='Xem đề và lời giải';details.appendChild(label);
    const q=quizQs[i];
    if(q){const cmd=document.createElement('p');cmd.textContent=String(q.cmd||'').replace(/<[^>]*>/g,'');details.appendChild(cmd);const visual=document.createElement('div');visual.className='summary-question';visual.innerHTML=q.body||'';
      visual.querySelectorAll('[id]').forEach(el=>{if(el.id==='match2')el.classList.add('summary-match');if(el.id==='m-lines')el.classList.add('summary-lines');el.removeAttribute('id');});
      details.addEventListener('toggle',()=>{if(details.open)requestAnimationFrame(()=>drawSummaryLines(visual,q));});
      visual.querySelectorAll('input').forEach(input=>{const j=+input.dataset.b;input.value=String((it.reviewAnswer??it.userAnswer??'').split('|')[j]??'');input.readOnly=true;input.tabIndex=-1;});
      visual.querySelectorAll('button').forEach(button=>{button.disabled=true;button.classList.toggle('word-option',(button.dataset.v||'').length>2);});details.appendChild(visual);
    }else{const prompt=document.createElement('p');prompt.textContent=it.question||'';details.appendChild(prompt);}
    if(it.explanation){const exp=document.createElement('p');exp.className='tip';exp.textContent=String(it.explanation).replace(/<[^>]*>/g,' ');details.appendChild(exp);}content.appendChild(details);
    const mark=document.createElement('div');mark.className='mark';mark.innerHTML=ic(it.isCorrect||fixed?'check':'close');row.append(idx,content,mark);body.appendChild(row);
  });
  document.getElementById('retry-btn').classList.toggle('hidden',!quizHistory.some(h=>!h.isCorrect&&!h.reviewCorrect));
}
function retryQuiz(){
  if(!parentResultsUnlocked){requestParentResults();return;}
  wrongIdx=quizHistory.map((it,i)=>!it.isCorrect&&!it.reviewCorrect?i:-1).filter(i=>i>=0);if(!wrongIdx.length)return;
  reviewMode=true;reviewPtr=0;submissionLocked=false;showScreen('quiz-screen');loadReview();
}
function loadReview(){
  qIndex=wrongIdx[reviewPtr];currentQ=quizQs[qIndex];answer=quizHistory[qIndex].reviewAnswer||'';subs=answer?answer.split('|'):[];act=0;links=[];selLeft=null;
  paint();updateProgress();document.getElementById('review-nav').classList.remove('hidden');document.getElementById('quiz-screen').scrollTop=0;
}
function prevReviewQuestion(){if(reviewPtr>0){saveReviewResponse(collectResponse());reviewPtr--;loadReview();}}
function nextReviewQuestion(){
  if(!reviewMode)return;const r=collectResponse();if(!validateResponse(r))return;saveReviewResponse(r);
  if(reviewPtr<wrongIdx.length-1){reviewPtr++;loadReview();}else{reviewMode=false;showSummary();}
}


/* ==================== OVERLAYS / SETTINGS ==================== */
const closeVictoryModal = () => document.getElementById('victory-overlay').classList.remove('show');
function openSettings(){
  const p = prompt('Nhập mật khẩu phụ huynh:');
  if (p === parentalPassword){
    document.getElementById('input-parental-pass').value = parentalPassword;
    document.getElementById('dev-btn').innerText = 'Chế độ kiểm tra: ' + (devMode ? 'Bật' : 'Tắt');
    document.getElementById('settings-modal').classList.add('show');
    document.getElementById('input-parental-pass').focus();
  } else if (p !== null) alert('Mật khẩu chưa đúng!');
}
function toggleDev(){
  devMode = !devMode;
  writeStorage('bb3_dev', devMode ? '1' : '0');
  document.getElementById('dev-btn').innerText = 'Chế độ kiểm tra: ' + (devMode ? 'Bật' : 'Tắt');
}

const closeSettings = () => {document.getElementById('settings-modal').classList.remove('show');document.querySelector('[aria-label="Cài đặt phụ huynh"]')?.focus();};
function saveSettings(){
  parentalPassword = document.getElementById('input-parental-pass').value.trim() || '452012';
  writeStorage('parentalPassword', parentalPassword);
  alert('Đã lưu!'); closeSettings();
}
function resetProgress(){
  if (!confirm('Xoá toàn bộ tiến độ, sao và huy hiệu?')) return;
  S=freshState();quizHistory=[];quizQs=[];currentQ=null;reviewMode=false;quizFinished=false;saveState();closeSettings();goMap();
}
function resetAndGoMap(){
  if (!confirm('Thoát bài làm hiện tại?')) return;
  quizHistory = []; quizQs = []; currentQ=null;qIndex = 0; reviewMode = false;submissionLocked=false;
  goMap();
}

/* ==================== KEYPAD ==================== */
function initKeypad(){
  pad.innerHTML = '';
  ['1','2','3','4','5','6','7','8','9','C','0','del'].forEach(k => {
    const b = document.createElement('button');
    b.className = 'key' + (k === 'C' || k === 'del' ? ' fn' : '');
    b.innerHTML = k === 'del' ? ic('del') : k;
    b.onclick = e => {
      ripple(e, b);
      k === 'C' ? clearAnswer() : k === 'del' ? backspace() : appendNumber(k);
    };
    pad.appendChild(b);
  });
}
function ripple(e, el){
  const r = el.getBoundingClientRect();
  const s = document.createElement('span');
  s.className = 'ripple';
  const d = Math.max(r.width, r.height);
  s.style.width = s.style.height = d + 'px';
  s.style.left = ((e.clientX || r.left + r.width/2) - r.left - d/2) + 'px';
  s.style.top = ((e.clientY || r.top + r.height/2) - r.top - d/2) + 'px';
  el.appendChild(s);
  setTimeout(() => s.remove(), 520);
}
addEventListener('keydown',e=>{
  if(!document.getElementById('quiz-screen').classList.contains('active')||e.defaultPrevented||e.isComposing)return;
  if(document.querySelector('.overlay.show'))return;
  if(e.ctrlKey&&!e.altKey&&!e.shiftKey&&e.key==='ArrowRight'){
    e.preventDefault();if(!e.repeat)skipQuestion();return;
  }
  if(e.key==='Enter'&&!e.repeat&&!e.target.closest('button,summary,textarea,[role="button"]')){e.preventDefault();submitAnswer();}
});
addEventListener('resize',()=>{if(currentQ&&document.getElementById('m-lines'))requestAnimationFrame(drawFixedLines);});


/* ==================== PARTICLES ==================== */
function initParticles(){
  const host = document.getElementById('particles');
  const set = ['star','sparkle','gem'];
  for (let i = 0; i < 16; i++){
    const s = document.createElement('span');
    s.className = 'pt';
    s.innerHTML = ic(pick(set));
    s.style.left = R(0, 98) + '%';
    s.style.fontSize = R(13, 30) + 'px';
    s.style.animationDuration = R(18, 40) + 's';
    s.style.animationDelay = -R(0, 30) + 's';
    s.style.setProperty('--dx', R(-90, 90) + 'px');
    s.style.setProperty('--rot', R(-320, 320) + 'deg');
    host.appendChild(s);
  }
}

/* ==================== INIT ==================== */
document.querySelectorAll('[data-ic]').forEach(el => el.innerHTML = ic(el.dataset.ic));
// Decoration is disabled during study to keep attention on the exercise.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)initParticles();
setSky(ISLANDS[0]);
initMap();
refreshHeader();

if(storageNotice){const notice=document.getElementById('app-notice');notice.textContent=storageNotice;notice.hidden=false;}

function drawSummaryLines(root,q){
  const wrap=root.querySelector('.summary-match'),svg=root.querySelector('.summary-lines');if(!wrap||!svg)return;const W=wrap.getBoundingClientRect();if(!W.width)return;svg.setAttribute('viewBox','0 0 '+W.width+' '+W.height);svg.innerHTML='';
  (q.pairs||[]).forEach(([i,j])=>{const a=wrap.querySelector('[data-l="'+i+'"]'),b=wrap.querySelector('[data-r="'+j+'"]');if(!a||!b)return;const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect(),x1=ra.right-W.left,y1=ra.top+ra.height/2-W.top,x2=rb.left-W.left+6,y2=rb.top+rb.height/2-W.top,m=(x1+x2)/2;const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M '+x1+' '+y1+' C '+m+' '+y1+', '+m+' '+y2+', '+x2+' '+y2);path.setAttribute('fill','none');path.setAttribute('stroke',BOX_COLORS[i%4]);path.setAttribute('stroke-width','2.6');svg.appendChild(path);});
}
addEventListener('keydown',event=>{
  const modal=document.querySelector('.overlay.show');if(!modal)return;
  if(event.key==='Escape'){event.preventDefault();modal.id==='settings-modal'?closeSettings():closeVictoryModal();return;}
  if(event.key==='Tab'){const controls=[...modal.querySelectorAll('button,input,a[href]')].filter(x=>!x.disabled&&x.getBoundingClientRect().width);const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}
});

const noticeElement=document.getElementById('app-notice');
if(noticeElement&&typeof ResizeObserver==='function')new ResizeObserver(()=>document.documentElement.style.setProperty('--notice-height',noticeElement.hidden?'0px':noticeElement.getBoundingClientRect().height+'px')).observe(noticeElement);
