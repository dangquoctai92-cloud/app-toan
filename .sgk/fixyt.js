const fs = require('fs');
const P = 'G:/My Drive/App toán/index.html';
let h = fs.readFileSync(P, 'utf8');
const rep = (a, b) => { if (!h.includes(a)) { console.log('MISS:', a.slice(0, 45)); return; } h = h.split(a).join(b); };

rep(`            referrerpolicy="strict-origin-when-cross-origin"></iframe>`, `></iframe>`);

rep(`    yt.src = 'https://www.youtube.com/embed/' + l.v + '?rel=0&modestbranding=1&playsinline=1';`,
`    const org = location.protocol.indexOf('http') === 0 ? '&origin=' + encodeURIComponent(location.origin) : '';
    yt.src = 'https://www.youtube-nocookie.com/embed/' + l.v + '?rel=0&modestbranding=1&playsinline=1' + org;
    const lk = document.getElementById('yt-link');
    if (lk){ lk.href = 'https://www.youtube.com/watch?v=' + l.v; lk.classList.remove('hidden'); }`);

rep(`    yt.removeAttribute('src'); yt.classList.add('hidden');`,
`    yt.removeAttribute('src'); yt.classList.add('hidden');
    const lk0 = document.getElementById('yt-link'); if (lk0) lk0.classList.add('hidden');`);

rep(`        <div style="height:20px"></div>`,
`        <a id="yt-link" class="yt-link hidden" target="_blank" rel="noopener">Không xem được? Mở video trên YouTube</a>
        <div style="height:20px"></div>`);

rep(`.video-wrap{`,
`.yt-link{display:block;text-align:center;margin-top:10px;font-size:14px;font-weight:700;color:var(--blue-d);text-decoration:underline}
.video-wrap{`);

fs.writeFileSync(P, h, 'utf8');
console.log('done');
