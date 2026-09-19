/* Ghép các file ngân hàng bài tập trong .sgk/banks vào index.html
   - Bài nào đã có sẵn trong index.html (BANKS.bNN = ...) sẽ được thay bằng bản mới.
   - Khối CSS /*CSS ... CSS*​/ ở đầu file được đưa vào <style>. */
const fs = require('fs');
const path = require('path');
const ROOT = 'G:/My Drive/App toán';
const P = ROOT + '/index.html';
const BANKS_DIR = ROOT + '/.sgk/banks';

let h = fs.readFileSync(P, 'utf8');

const S = '/* ====== NGÂN HÀNG THÊM MỚI ====== */';
const E = '/* ====== HẾT NGÂN HÀNG THÊM MỚI ====== */';
const si = h.indexOf(S), ei = h.indexOf(E);
if (si >= 0 && ei > si) h = h.slice(0, si) + h.slice(ei + E.length);

const files = fs.readdirSync(BANKS_DIR).filter(f => /^b\d+\.js$/.test(f))
  .sort((a, b) => +a.slice(1) - +b.slice(1));

let css = '', code = '';
const added = [];
for (const f of files){
  let src = fs.readFileSync(path.join(BANKS_DIR, f), 'utf8');
  const m = src.match(/\/\*CSS([\s\S]*?)CSS\*\//);
  if (m){ css += '\n/* ' + f + ' */\n' + m[1].trim() + '\n'; src = src.replace(m[0], ''); }
  code += '\n/* ---- ' + f + ' ---- */\n' + src.trim() + '\n';
  added.push(f.replace('.js', ''));
}

const anchor = 'const hasBank = code =>';
if (!h.includes(anchor)) { console.log('THIẾU MỐC hasBank'); process.exit(1); }
h = h.replace(anchor, S + '\n' + code + '\n' + E + '\n\n' + anchor);

if (css.trim()){
  const cssAnchor = '@media(prefers-reduced-motion:reduce)';
  h = h.replace(cssAnchor, '/* ==== CSS ngân hàng thêm mới ==== */' + css + cssAnchor);
}

fs.writeFileSync(P, h, 'utf8');
console.log('đã ghép', added.length, 'bài:', added.join(' '));
