const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const order=JSON.parse(read('.sgk/bank-order.json'));let css=read('src/styles.css'),js=read('src/core.js');
for(const [mode,dir]of [['normal','banks'],['advanced','banks-adv']]){
  if(order[mode].length!==81||new Set(order[mode]).size!==81)throw Error('Expected 81 unique '+mode+' lessons');
  for(const code of order[mode]){let bank=read('.sgk/'+dir+'/'+code+'.js');bank=bank.replace(/\/\*CSS([\s\S]*?)CSS\*\//g,(_,rules)=>{css+='\n'+rules;return ''});js+='\n/* Source: .sgk/'+dir+'/'+code+'.js */\n'+bank;}
}
js+='\nconst VIDEO_CATALOG = '+read('src/video-catalog.json')+';\n'+read('src/app.js');new vm.Script(js);
const html=read('src/index.template.html').replace('<!-- APP_STYLES -->',()=>css).replace('<!-- APP_SCRIPT -->',()=>js);
if(html.includes('<!-- APP_'))throw Error('Unresolved template');fs.writeFileSync(path.join(root,'index.html'),html);console.log('Built index.html · '+Buffer.byteLength(html)+' bytes · 162 lesson banks');
