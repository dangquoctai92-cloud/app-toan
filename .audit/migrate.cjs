const fs=require('fs'),path=require('path'),crypto=require('crypto');
const backup='.audit/before-fix-20260913';if(fs.existsSync(backup))throw Error('Backup already exists');fs.mkdirSync(backup,{recursive:true});
for(const f of ['index.html','.sgk/integrate.js','.sgk/integrate-adv.js','.sgk/CONTRACT.md'])fs.copyFileSync(f,path.join(backup,path.basename(f)));
for(const dir of ['banks','banks-adv']){fs.mkdirSync(path.join(backup,dir));for(const f of fs.readdirSync('.sgk/'+dir))if(f.endsWith('.js'))fs.copyFileSync('.sgk/'+dir+'/'+f,path.join(backup,dir,f));}
const html=fs.readFileSync('index.html','utf8').replace(/\r\n/g,'\n');const style=html.match(/<style>([\s\S]*?)<\/style>/)[1],script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
fs.mkdirSync('src',{recursive:true});
const b1Start=script.indexOf('const B1 = ['),defs=script.indexOf('const BANKS = { b1: B1 };'),funcs=script.indexOf('function generateAdv('),b2Start=script.indexOf('/* ==================== BÀI 2:'),auto=script.indexOf('/* ====== NGÂN HÀNG TỰ ĐỘNG (banks) ====== */'),extra=script.indexOf('/* ====== NGÂN HÀNG THÊM MỚI ====== */'),adv=script.indexOf('/* ====== NGÂN HÀNG NÂNG CAO ====== */'),app=script.indexOf('const hasAdv = code =>');
if([b1Start,defs,funcs,b2Start,auto,extra,adv,app].some(x=>x<0))throw Error('Missing anchors');
fs.writeFileSync('src/core.js',script.slice(0,b1Start)+'\nconst BANKS = {};\nconst ADV = {};\n'+script.slice(funcs,b2Start));
fs.writeFileSync('.sgk/banks/b1.js',script.slice(b1Start,defs).replace('const B1 = [','BANKS.b1 = [').replace(/\/\* ==================== NGÂN HÀNG BÀI TẬP THEO SGK[\s\S]*$/,''));
fs.writeFileSync('.sgk/banks/b2.js',script.slice(b2Start,auto));
const order={normal:['b1','b2'],advanced:[]};
function extract(text,mode){const marks=[...text.matchAll(/\/\* ---- (?:NC )?(b[0-9]+)\.js ---- \*\//g)];for(let i=0;i<marks.length;i++){const m=marks[i];let src=text.slice(m.index+m[0].length,i+1<marks.length?marks[i+1].index:text.length);src=src.replace(/\/\* ====== HẾT NGÂN HÀNG[^]*$/,'').replace(/\nconst ADV = \{\};[^]*$/,'').trim();fs.writeFileSync('.sgk/'+(mode==='normal'?'banks':'banks-adv')+'/'+m[1]+'.js',src+'\n');order[mode].push(m[1]);}}
extract(script.slice(auto,extra),'normal');extract(script.slice(extra,adv),'normal');extract(script.slice(adv,app),'advanced');
if(order.normal.length!==81||order.advanced.length!==81||new Set(order.normal).size!==81)throw Error('Wrong inventory');
fs.writeFileSync('.sgk/bank-order.json',JSON.stringify(order,null,2)+'\n');fs.writeFileSync('src/app.js',script.slice(app));
// Remove only exactly equivalent top-level CSS rules, keeping the final occurrence.
let depth=0,quote='',comment=false,start=0;const chunks=[];
for(let i=0;i<style.length;i++){const ch=style[i],nx=style[i+1];if(comment){if(ch==='*'&&nx==='/'){comment=false;i++;}continue;}if(quote){if(ch==='\\'){i++;continue;}if(ch===quote)quote='';continue;}if(ch==='/'&&nx==='*'){comment=true;i++;continue;}if(ch==='"'||ch==="'"){quote=ch;continue;}if(ch==='{')depth++;if(ch==='}'&&--depth===0){chunks.push(style.slice(start,i+1));start=i+1;}}
chunks.push(style.slice(start));const seen=new Set();let removed=0;for(let i=chunks.length-1;i>=0;i--){const key=chunks[i].replace(/\/\*[\s\S]*?\*\//g,'').trim();if(!key)continue;if(seen.has(key)){removed+=chunks[i].length;chunks[i]='';}else seen.add(key);}
fs.writeFileSync('src/styles.css',chunks.join(''));fs.writeFileSync('src/index.template.html',html.replace(/<style>[\s\S]*?<\/style>/,'<style>\n<!-- APP_STYLES -->\n</style>').replace(/<script>[\s\S]*?<\/script>/,'<script>\n<!-- APP_SCRIPT -->\n</script>'));
fs.writeFileSync('.audit/migration.json',JSON.stringify({normal:81,advanced:81,removedCssCharacters:removed,originalSha256:crypto.createHash('sha256').update(fs.readFileSync('index.html')).digest('hex')},null,2));console.log({normal:order.normal.length,advanced:order.advanced.length,removedCssCharacters:removed});
