const fs=require('fs');
function edit(file,pairs){let s=fs.readFileSync(file,'utf8');for(const[a,b]of pairs){if(!s.includes(a))throw Error(file+': '+a);s=s.split(a).join(b)}fs.writeFileSync(file,s)}
edit('src/core.js',[['viewBox="0 0 110 76"','viewBox="0 0 120 80"']]);
edit('.sgk/banks/b2.js',[['viewBox="0 0 190 130"','viewBox="0 0 206 132"']]);
edit('.sgk/banks/b15.js',[['viewBox="0 0 150 108"','viewBox="-4 0 164 108"']]);
edit('.sgk/banks/b19.js',[['viewBox="-20 -20 ${W + 40} ${H + 40}"','viewBox="-30 -30 ${W + 60} ${H + 60}"'],['viewBox="-30 -26 380 220"','viewBox="-34 -32 430 236"']]);
edit('.sgk/banks/b21.js',[['viewBox="0 0 264 200"','viewBox="-12 -4 280 212"']]);
edit('.sgk/banks/b22.js',[['viewBox="0 0 300 250"','viewBox="-8 -16 316 278"'],['viewBox="0 0 240 240"','viewBox="-12 -16 268 272"']]);
edit('.sgk/banks/b34.js',[['x1 = x0 + w, W = x1 + 30, H = 152','x1 = x0 + w, H = 152'],['const cm = Math.ceil(mm / 10) + 1;','const cm = Math.ceil(mm / 10) + 1;\n  const rulerWidth = cm * 10 * S, W = x0 + rulerWidth + 30;'],['width="${w + 24}" height="28"','width="${rulerWidth + 20}" height="28"']]);
edit('.sgk/banks/b44.js',[['viewBox="-12 30 520 180"','viewBox="-12 24 520 208"']]);
edit('.sgk/banks/b49.js',[['viewBox="0 0 130 96"','viewBox="-4 -12 138 112"']]);
edit('.sgk/banks/b50.js',[['viewBox="-26 -24 ${W + 52} ${H + 56}"','viewBox="-34 -32 ${W + 96} ${H + 76}"'],['viewBox="-26 -24 352 190"','viewBox="-34 -32 414 206"']]);
edit('.sgk/banks/b53.js',[['viewBox="-24 -28 ${W + 104} ${u + 62}"','viewBox="-32 -36 ${W + 120} ${u + 86}"'],['viewBox="-34 -30 ${LL + 130} ${Ht + WW + 78}"','viewBox="-42 -38 ${LL + 146} ${Ht + WW + 102}"']]);
edit('.sgk/banks/b60.js',[['viewBox="0 0 620 400"','viewBox="0 0 620 424"']]);
edit('.sgk/banks-adv/b21.js',[['viewBox="2 4 256 214"','viewBox="-8 -8 276 234"']]);
edit('.sgk/banks-adv/b53.js',[['viewBox="-34 -34 ${Wp + 120} ${Hp + 74}"','viewBox="-60 -42 ${Wp + 154} ${Hp + 90}"']]);
console.log('Updated SVG bounds and ruler backing.');
