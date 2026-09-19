const fs = require('fs');
const P = 'G:/My Drive/App toán/index.html';
let h = fs.readFileSync(P, 'utf8');
const rep = (a, b) => { if (!h.includes(a)) { console.log('MISS:', a.slice(0, 45)); return; } h = h.split(a).join(b); };

/* 1. Tự bọc mọi bảng chưa có khung cuộn ngang */
rep(`  const B = currentQ.blanks || [];
  document.querySelectorAll('#q-body .qin').forEach(inp => {`,
`  document.querySelectorAll('#q-body table').forEach(t => {
    if (!t.parentElement.classList.contains('tbl-wrap')){
      const w = document.createElement('div');
      w.className = 'tbl-wrap';
      t.parentElement.insertBefore(w, t);
      w.appendChild(t);
    }
  });

  const B = currentQ.blanks || [];
  document.querySelectorAll('#q-body .qin').forEach(inp => {`);

/* 2. CSS chống tràn */
rep('@media(prefers-reduced-motion:reduce)',
`/* ==== chống tràn khung bài ==== */
#q-body{max-width:100%;overflow-x:auto}
#q-body table{max-width:none}
.tbl-wrap{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
.picker,.fill-line,.cmp-row,.calc-cell,.bullet,.eq,.given-nums,.match-row,.two-col,.two-tbl,.vrow,.art-row,.jar-row,.maze,.easel-row,.flow{flex-wrap:wrap}
#q-body svg{max-width:100%;height:auto}
#q-body img{max-width:100%}

@media(max-width:700px){
  .two-col{gap:14px}
  .match2{gap:8px}
  .mbox{font-size:13.5px;padding:8px 10px;max-width:158px;line-height:1.3}
  .slot-art{width:104px}
  .mtarget.k-basket .slot-art{width:88px}
  .mtarget.k-card .slot-art{width:98px}
  .mtarget .val{font-size:15px}
  .slot-in{max-width:58px;height:26px;font-size:15px}
  .m-art .art-sm{width:34px}
  .m-art .turtle{width:44px}
  .m-item{gap:5px}
  .tbl th,.tbl td{padding:6px 8px;font-size:14.5px}
  .tbl.sgk1 .cell-bl{min-width:150px;padding-left:6px}
  .tbl.sgk1 .cell-bl .hund{width:18px;height:18px}
  .tbl.sgk1 .cell-bl .tenbar{width:5px;height:18px}
  .tbl.sgk1 .cell-bl .unit{width:4px;height:4px}
  .tbl.sgk1 .cell-bl .bgroup.units{max-height:20px;max-width:16px}
  .tbl.sgk1 .cell-bl .blocks{gap:7px}
  .tbl.sgk1 .rd{min-width:96px;font-size:12.5px}
  .tbl.sgk1 .qin{min-width:40px;height:28px;font-size:15px}
  .calc-grid{grid-template-columns:1fr;gap:8px}
  .cmp-row{font-size:18px;gap:8px}
  .cmp-row .side{min-width:72px}
  .eq,.eq-list .eq{font-size:19px;gap:6px}
  .qin{height:34px;font-size:17px}
  .fill-line{font-size:15px;line-height:1.9}
  .wordq{font-size:14.5px}
  .bullet{font-size:15px}
  .chain.round .cnode,.chain.dia .cnode{min-width:38px;font-size:13px;padding:6px 3px}
  .chain .qin{width:46px !important;height:28px;font-size:13px}
  .cnode{min-width:44px;padding:7px 9px;font-size:15px}
  .ruler{margin:22px 4px 6px}
  .rk{font-size:13px}
  .art-pig{width:66px;height:48px}
  .art-sm{width:36px}
  .pk{width:30px;height:30px;font-size:14px}
  .q-card{padding:12px 12px 14px;margin:6px 8px}
  .vcalc{font-size:17px}
  .vrow{gap:16px}
}
@media(prefers-reduced-motion:reduce)`);

fs.writeFileSync(P, h, 'utf8');
console.log('done');
