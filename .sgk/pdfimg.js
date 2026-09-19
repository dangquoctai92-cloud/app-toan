/* Rút ảnh JPEG nhúng trong PDF scan (không cần thư viện ngoài) */
const fs = require('fs');
const src = process.argv[2];
const outDir = process.argv[3];

const buf = fs.readFileSync(src);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true});

const SOI = Buffer.from([0xFF, 0xD8, 0xFF]);
const EOI = Buffer.from([0xFF, 0xD9]);
let i = 0, n = 0;
while (i < buf.length){
  const s = buf.indexOf(SOI, i);
  if (s < 0) break;
  let e = buf.indexOf(EOI, s + 3);
  if (e < 0) break;
  e += 2;
  const len = e - s;
  i = e;
  if (len < 40000) continue;
  n++;
  fs.writeFileSync(`${outDir}/p${String(n).padStart(3, '0')}.jpg`, buf.slice(s, e));
}
console.log('đã tách', n, 'dải ->', outDir);
