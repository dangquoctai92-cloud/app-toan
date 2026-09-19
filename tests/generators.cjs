const fs = require('fs'), vm = require('vm');
const html = fs.readFileSync('index.html','utf8');
const script = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean).join('\n').split('/* ==================== INIT ==================== */')[0];
const dummy = () => ({style:{setProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false}},querySelectorAll(){return []},appendChild(){},querySelector(){return dummy()},getBoundingClientRect(){return {width:100,height:100}},pause(){},removeAttribute(){}});
function context(storage={}) {const c={console,localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},document:{getElementById:dummy,querySelectorAll:()=>[],createElement:dummy},window:{scrollTo(){}},addEventListener(){},setTimeout(){},requestAnimationFrame(){},navigator:{},alert(){},confirm:()=>true}; vm.createContext(c);vm.runInContext(script,c);return c;}
const c=context();
const result=vm.runInContext(`(()=>{
let seed=91827;Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
const issues={}, inventory=[], types={};let runs=0, blanks=0;
const flag=(kind,bank,code,idx,q,extra)=>{const key=[kind,bank,code,idx].join('/');if(!issues[key])issues[key]={kind,bank,code,idx:idx+1,count:0,cmd:q?.cmd,sample:extra,answers:q?.a,body:q?.body};issues[key].count++};
for(const [name,bank] of [['normal',BANKS],['advanced',ADV]])for(const [code,fns] of Object.entries(bank)){
inventory.push({bank:name,code,count:fns.length});
for(let i=0;i<fns.length;i++)for(let n=0;n<200;n++){
let q;try{q=fns[i]();runs++;types[q.type]=(types[q.type]||0)+1;}catch(e){flag('exception',name,code,i,q,e.message);continue;}
if(/undefined|NaN|Infinity/.test([q.a,q.body,q.cmd,q.e].join(' ')))flag('invalid-output',name,code,i,q,'undefined/NaN/Infinity');
for(const [j,b] of (q.blanks||[]).entries()){
blanks++;
if(!b.text&&!b.sign&&!b.pickList&&!/^[0-9]+$/.test(String(b.a)))flag('numeric-untypable',name,code,i,q,{blank:j,answer:b.a});
if(b.pickList){const aa=String(b.a).split(',').filter(Boolean);if(!aa.length)flag('empty-selection',name,code,i,q,{blank:j});if(aa.some(x=>!b.pickList.includes(x)))flag('missing-option',name,code,i,q,{blank:j,answer:b.a,options:b.pickList});if(aa.slice().sort().join(',')!==b.a)flag('unsorted-answer',name,code,i,q,{blank:j,answer:b.a});}
if(!(new RegExp('data-b=["\\\']'+j+'["\\\']')).test(q.body))flag('missing-control',name,code,i,q,{blank:j,answer:b.a});
}
}
}
return {runs,blanks,types,lessons:ALL.length,inventory,issues:Object.values(issues)};
})()`,c,{timeout:60000});
fs.writeFileSync('.audit/generator-after.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({runs:result.runs,blanks:result.blanks,lessons:result.lessons,normal:result.inventory.filter(x=>x.bank==='normal').reduce((s,x)=>s+x.count,0),advanced:result.inventory.filter(x=>x.bank==='advanced').reduce((s,x)=>s+x.count,0),issues:result.issues.map(({body,...x})=>x)},null,2));
try{context({bb3_state:'{bad'});console.log('corrupt storage recovered')}catch(e){console.log('corrupt storage:',e.message)}
console.log('reset shared arrays:',vm.runInContext(`S.done.push('b1');S=Object.assign({},DEF);JSON.stringify(S.done)`,c));


if(result.issues.length)throw Error('Generator validation failed');
