/* Ghép các file ngân hàng NÂNG CAO trong .sgk/banks-adv vào index.html */
const fs = require('fs');
const path = require('path');
const ROOT = 'G:/My Drive/App toán';
const P = ROOT + '/index.html';
const DIR = ROOT + '/.sgk/banks-adv';

let h = fs.readFileSync(P, 'utf8');
const S = '/* ====== NGÂN HÀNG NÂNG CAO ====== */';
const E = '/* ====== HẾT NGÂN HÀNG NÂNG CAO ====== */';
const si = h.indexOf(S), ei = h.indexOf(E);
if (si >= 0 && ei > si) h = h.slice(0, si) + h.slice(ei + E.length);

if (!fs.existsSync(DIR)) { console.log('chưa có thư mục'); process.exit(0); }
const files = fs.readdirSync(DIR).filter(f => /^b\d+\.js$/.test(f))
  .sort((a, b) => +a.slice(1) - +b.slice(1));

let css = '', code = '';
for (const f of files){
  let src = fs.readFileSync(path.join(DIR, f), 'utf8');
  const m = src.match(/\/\*CSS([\s\S]*?)CSS\*\//);
  if (m){ css += '\n' + m[1].trim() + '\n'; src = src.replace(m[0], ''); }
  code += '\n/* ---- NC ' + f + ' ---- */\n' + src.trim() + '\n';
}

const anchor = 'const hasAdv = code =>';
if (!h.includes(anchor)) { console.log('THIẾU MỐC hasAdv'); process.exit(1); }
h = h.replace(anchor, S + '\n' + code + '\n' + E + '\n\n' + anchor);

if (css.trim()) h = h.replace('@media(prefers-reduced-motion:reduce)',
  '/* ==== CSS nâng cao ==== */' + css + '@media(prefers-reduced-motion:reduce)');

fs.writeFileSync(P, h, 'utf8');
console.log('đã ghép nâng cao:', files.map(f => f.replace('.js', '')).join(' ') || '(trống)');
