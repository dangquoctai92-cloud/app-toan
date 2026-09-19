const fs = require('fs');
const P = 'G:/My Drive/App toán/index.html';
const V = JSON.parse(fs.readFileSync('G:/My Drive/App toán/.sgk/videos.json', 'utf8'));

/* kiểm tra tiêu đề thật có đúng số bài không */
const bad = [], good = {};
for (const [code, v] of Object.entries(V)){
  const n = code.slice(1);
  const t = String(v.real || '').toLowerCase();
  const okNum = new RegExp('bài\\s*' + n + '(?!\\d)').test(t);
  const okLop = /lớp 3|toán 3/.test(t);
  if (okNum && okLop) good[code] = v.id;
  else bad.push(code + ' :: ' + v.real);
}

let h = fs.readFileSync(P, 'utf8');
const lines = h.split('\n');
let added = 0;
for (let i = 0; i < lines.length; i++){
  const m = lines[i].match(/^(\s*\[(\d+),\s*'.*)\],\s*$/);
  if (!m) continue;
  const code = 'b' + m[2];
  if (!good[code]) continue;
  const parts = m[1];
  if (/'[\w-]{11}'\s*$/.test(parts)) continue;      // đã có video
  lines[i] = parts + ",'" + good[code] + "'],";
  added++;
}
fs.writeFileSync(P, lines.join('\n'), 'utf8');
console.log('đã gắn video cho', added, 'bài | loại bỏ (tiêu đề không khớp):', bad.length);
if (bad.length) console.log(bad.join('\n'));
