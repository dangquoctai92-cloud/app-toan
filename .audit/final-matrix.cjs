const fs=require('fs');let core=fs.readFileSync('src/core.js','utf8');const a=core.indexOf('// Five skill groups'),b=core.indexOf('function prepareQuestion(',a);core=core.slice(0,a)+`// Two focused questions per skill, then five mixed questions from the full bank.
function skillGroup(lesson){
  const classify=key=>/stats|chance/.test(key)?'data':/time|month|money|len|mass|cap|temp/.test(key)?'measure':/shape|solid|circle|mid|perim|area/.test(key)?'geometry':/place|bigger|roman|round/.test(key)?'numbers':'operations';
  const domains=spec=>spec[0]==='mix'?spec[1].flatMap(domains):[classify(spec[0])];
  const groups=[...new Set(domains(lesson.g))];return groups.length===1?groups[0]:'mixed';
}
`+core.slice(b);
const f=core.indexOf('function generateFinal(){');core=core.slice(0,f)+`function generateFinal(){
  const groups={numbers:[],operations:[],geometry:[],measure:[],data:[]},all=[];
  ALL.forEach(l=>BANKS[l.c].forEach((fn,index)=>{const item={fn,index,code:l.c};all.push(item);if(groups[skillGroup(l)])groups[skillGroup(l)].push(item);}));
  const selected=Object.entries(groups).flatMap(([section,items])=>shuffle(items).slice(0,2).map(x=>({...x,section})));
  const ids=new Set(selected.map(x=>x.code+':'+x.index));
  selected.push(...shuffle(all.filter(x=>!ids.has(x.code+':'+x.index))).slice(0,5).map(x=>({...x,section:'mixed'})));
  return shuffle(selected.map(x=>({...prepareQuestion(x.fn(),x.code,x.index),examSection:x.section})));
}
`;
fs.writeFileSync('src/core.js',core);
let test=fs.readFileSync('tests/regression.cjs','utf8');test=test.replace("counts[x.skill]=(counts[x.skill]||0)+1","counts[x.examSection]=(counts[x.examSection]||0)+1").replace("Object.values(counts).some(x=>x!==3)||Object.keys(counts).length!==5","Object.entries(counts).some(([key,value])=>value!==(key==='mixed'?5:2))||Object.keys(counts).length!==6||new Set(q.map(x=>x.id)).size!==15");test=test.replace('balance five skills and include later templates','cover five focused skills plus mixed review without duplicates');fs.writeFileSync('tests/regression.cjs',test);
let readme=fs.readFileSync('README.md','utf8');readme=readme.replace('Đề cuối năm gồm 15 câu: mỗi nhóm số học, phép tính, hình học, đo lường và dữ liệu có 3 câu. Phân nhóm hiện dựa trên kỹ năng của bài học; mẫu trong bài ôn tập hỗn hợp vẫn cần gắn nhãn chi tiết hơn sau khi đối chiếu sách.','Đề cuối năm gồm 15 câu: 2 câu từ bài chuyên biệt của mỗi nhóm số học, phép tính, hình học, đo lường và dữ liệu; thêm 5 câu tổng hợp lấy từ toàn bộ ngân hàng. Không lặp mẫu trong cùng đề. Bài ôn tập có nhiều nhóm kỹ năng được giữ ở nhóm tổng hợp, tránh tự gán mọi câu trong bài đó vào một kỹ năng. Gắn nhãn đến từng mẫu vẫn thuộc phần đối chiếu nội dung còn lại.');fs.writeFileSync('README.md',readme);
