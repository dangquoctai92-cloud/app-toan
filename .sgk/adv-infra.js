const fs = require('fs');
const P = 'G:/My Drive/App toán/index.html';
let h = fs.readFileSync(P, 'utf8');
const rep = (a, b) => { if (!h.includes(a)) { console.log('MISS:', a.slice(0, 50)); return; } h = h.split(a).join(b); };

/* 1. kho bài nâng cao */
rep(`const hasBank = code =>`,
`const ADV = {};
const hasAdv = code => !!(ADV[code] && ADV[code].length);

const hasBank = code =>`);

/* 2. state */
rep(`const DEF = {done:[], stars:0, streak:1, lastDay:'', totalQ:0, totalCorrect:0};`,
    `const DEF = {done:[], doneAdv:[], stars:0, streak:1, lastDay:'', totalQ:0, totalCorrect:0};`);
rep(`let S = Object.assign({}, DEF, JSON.parse(localStorage.getItem('bb3_state') || '{}'));`,
`let S = Object.assign({}, DEF, JSON.parse(localStorage.getItem('bb3_state') || '{}'));
if (!S.doneAdv) S.doneAdv = [];
let quizMode = 'thuong';`);

/* 3. sinh đề nâng cao */
rep(`function generateQuestions(code, count = 10){
  const bank = BANKS[code];`,
`function generateAdv(code){
  const bank = ADV[code];
  if (!bank || !bank.length) return [];
  const plain = s => String(s || '').replace(/<[^>]*>/g, ' ').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
    .replace(/\\s+/g, ' ').trim();
  return bank.map(fn => {
    const item = fn();
    return {
      q:plain(item.cmd) + ' — ' + plain(item.body), a:String(item.a),
      no:item.no || 1, cmd:item.cmd || '', body:item.body || '',
      type:item.type || 'num', opts:item.opts || null, sep:item.sep || '',
      rows:item.rows || null, slots:item.slots || null, pairs:item.pairs || null,
      blanks:item.blanks || ((item.type || 'num') === 'num'
        ? [{a:String(item.a), len:String(item.a).length}] : null),
      big:!!item.big, explanation:item.e
    };
  });
}

function generateQuestions(code, count = 10){
  const bank = BANKS[code];`);

/* 4. startQuiz nhận chế độ */
rep(`async function startQuiz(code){
  quizCode = code || (activeLesson ? activeLesson.c : 'b1');`,
`async function startQuiz(code, mode){
  quizMode = mode === 'adv' ? 'nangcao' : 'thuong';
  quizCode = code || (activeLesson ? activeLesson.c : 'b1');`);
rep(`  if (!hasBank(quizCode) && quizCode !== 'final'){ alert('Bài này chưa có bài tập, đang cập nhật nhé!'); return; }`,
`  if (quizMode === 'nangcao' && !hasAdv(quizCode)){ alert('Bài này chưa có phần nâng cao!'); return; }
  if (quizMode === 'thuong' && !hasBank(quizCode) && quizCode !== 'final'){ alert('Bài này chưa có bài tập, đang cập nhật nhé!'); return; }`);
rep(`    quizQs = generateQuestions(quizCode, (BANKS[quizCode] || []).length || 10);`,
`    quizQs = quizMode === 'nangcao'
      ? generateAdv(quizCode)
      : generateQuestions(quizCode, (BANKS[quizCode] || []).length || 10);`);

/* 5. chấm điểm: nâng cao 15 sao/câu, ghi nhận riêng */
rep(`  gained = correct * 10;`,
`  gained = correct * (quizMode === 'nangcao' ? 15 : 10);`);
rep(`  if (correct >= quizHistory.length * .7 && quizCode !== 'final' && !S.done.includes(quizCode)) S.done.push(quizCode);`,
`  if (correct >= quizHistory.length * .7 && quizCode !== 'final'){
    if (quizMode === 'nangcao'){ if (!S.doneAdv.includes(quizCode)) S.doneAdv.push(quizCode); }
    else if (!S.done.includes(quizCode)) S.done.push(quizCode);
  }`);

/* 6. nút vào phần nâng cao ở màn video */
rep(`        <button class="btn wide" onclick="startQuiz()" id="video-start-btn">Cháu hiểu bài rồi, làm toán thôi!</button>`,
`        <button class="btn wide" onclick="startQuiz()" id="video-start-btn">Cháu hiểu bài rồi, làm toán thôi!</button>
        <div style="height:12px"></div>
        <button class="btn pink wide hidden" id="adv-btn">Thử thách nâng cao</button>`);
rep(`  const sb = document.getElementById('video-start-btn');`,
`  const ab = document.getElementById('adv-btn');
  ab.classList.toggle('hidden', !hasAdv(code));
  ab.onclick = () => startQuiz(code, 'adv');
  const sb = document.getElementById('video-start-btn');`);

/* 7. nút nâng cao ở màn kết quả */
rep(`        <button class="btn pink wide" id="retry-btn" onclick="retryQuiz()">Làm lại câu sai</button>`,
`        <button class="btn pink wide" id="retry-btn" onclick="retryQuiz()">Làm lại câu sai</button>
        <div style="height:12px"></div>
        <button class="btn wide hidden" id="adv-after" >Làm tiếp phần nâng cao</button>`);
rep(`  document.getElementById('retry-btn').classList.toggle('hidden', correct === total);`,
`  document.getElementById('retry-btn').classList.toggle('hidden', correct === total);
  const aa = document.getElementById('adv-after');
  const showAdv = quizMode === 'thuong' && hasAdv(quizCode);
  aa.classList.toggle('hidden', !showAdv);
  if (showAdv) aa.onclick = () => startQuiz(quizCode, 'adv');`);

/* 8. nhãn NC trên thẻ bài + tiêu đề màn làm bài */
rep(`      const soon = !hasBank(l.c);`,
`      const soon = !hasBank(l.c);
      const adv = hasAdv(l.c);`);
rep(`      const tag = soon ? '<span class="soon-tag">SẮP CÓ</span>' : '';`,
`      const tag = soon ? '<span class="soon-tag">SẮP CÓ</span>'
        : (adv ? '<span class="adv-tag">NÂNG CAO</span>' : '');`);
rep(`.soon-tag{position:absolute;`,
`.adv-tag{position:absolute;top:8px;right:10px;font-size:9.5px;letter-spacing:.5px;color:#fff;
  background:linear-gradient(140deg,var(--pink),var(--violet-d));padding:2px 8px;border-radius:999px}
.tile.done .adv-tag{background:linear-gradient(140deg,#ff9f43,var(--pink-d))}
.ribbon.adv{background:#ffe9f3;color:var(--pink-d)}
.soon-tag{position:absolute;`);
rep(`        <div class="ribbon"><span data-ic="book"></span>Luyện tập</div>`,
`        <div class="ribbon" id="q-ribbon"><span data-ic="book"></span><span id="q-ribbon-txt">Luyện tập</span></div>`);
rep(`  document.getElementById('ex-no').innerText = currentQ.no || 1;`,
`  const rb = document.getElementById('q-ribbon');
  if (rb){ rb.classList.toggle('adv', quizMode === 'nangcao');
    document.getElementById('q-ribbon-txt').innerText = quizMode === 'nangcao' ? 'Nâng cao' : 'Luyện tập'; }
  document.getElementById('ex-no').innerText = currentQ.no || 1;`);

/* 9. hồ sơ: đếm bài nâng cao */
rep(`  document.getElementById('p-lessons').innerText = S.done.length;`,
`  document.getElementById('p-lessons').innerText = S.done.length + (S.doneAdv.length ? ' + ' + S.doneAdv.length + ' NC' : '');`);

fs.writeFileSync(P, h, 'utf8');
console.log('adv-infra done');
