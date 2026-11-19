// usage: node build.js  -> writes index.html, prints chars missing from dict.txt
const fs=require('fs');
const src=fs.readFileSync('src.html','utf8');
const dictTxt=fs.existsSync('dict.txt')?fs.readFileSync('dict.txt','utf8'):'';
const ZY={},WORDS={};
dictTxt.split('\n').forEach(line=>{
  line=line.trim();
  if(!line||line.startsWith('#'))return;
  if(line.startsWith('=')){const t=line.slice(1).split(/\s+/);WORDS[t[0]]=t.slice(1);return}
  line.split(/\s+/).forEach(tok=>{
    const c=[...tok][0];
    const z=tok.slice(c.length);
    if(!z){console.error('NO ZY for',tok);return}
    if(ZY[c]&&ZY[c]!==z)console.error('DUP',c,ZY[c],z);
    ZY[c]=z;
  });
});
for(const [w,z] of Object.entries(WORDS)){if([...w].length!==z.length)console.error('WORD LEN MISMATCH',w)}
// check chars
const sticksTxt=JSON.stringify([...JSON.parse(fs.readFileSync('data/sticks.json','utf8')),...JSON.parse(fs.readFileSync('data/sticks2.json','utf8'))]);
const taroTxt=fs.readFileSync('data/tarot.txt','utf8');
const body=src.split('/*DICT*/')[1]+sticksTxt+taroTxt+fs.readFileSync('data/tarot_health.txt','utf8');
const freq={};
for(const ch of body){if(ch>='㐀'&&ch<='鿿')freq[ch]=(freq[ch]||0)+1}
const missing=Object.keys(freq).filter(c=>!ZY[c]);
console.log('unique chars:',Object.keys(freq).length,' missing:',missing.length);
// ---- 自動注音：用 pinyin-data (MIT) 的 kMandarin 第一讀音轉成注音；手寫的 dict.txt 優先 ----
function py2zy(py){
  const T={'ā':['a',1],'á':['a',2],'ǎ':['a',3],'à':['a',4],'ē':['e',1],'é':['e',2],'ě':['e',3],'è':['e',4],'ī':['i',1],'í':['i',2],'ǐ':['i',3],'ì':['i',4],'ō':['o',1],'ó':['o',2],'ǒ':['o',3],'ò':['o',4],'ū':['u',1],'ú':['u',2],'ǔ':['u',3],'ù':['u',4],'ǖ':['ü',1],'ǘ':['ü',2],'ǚ':['ü',3],'ǜ':['ü',4],'ń':['n',2],'ň':['n',3],'ǹ':['n',4],'ḿ':['m',2],'ế':['ê',2],'ề':['ê',4]};
  let tone=0,syl='';
  for(const ch of py.normalize('NFC')){if(T[ch]){syl+=T[ch][0];tone=T[ch][1]}else syl+=ch}
  if(!tone)tone=5;
  const I={b:'ㄅ',p:'ㄆ',m:'ㄇ',f:'ㄈ',d:'ㄉ',t:'ㄊ',n:'ㄋ',l:'ㄌ',g:'ㄍ',k:'ㄎ',h:'ㄏ',j:'ㄐ',q:'ㄑ',x:'ㄒ',zh:'ㄓ',ch:'ㄔ',sh:'ㄕ',r:'ㄖ',z:'ㄗ',c:'ㄘ',s:'ㄙ'};
  const F={a:'ㄚ',o:'ㄛ',e:'ㄜ','ê':'ㄝ',ai:'ㄞ',ei:'ㄟ',ao:'ㄠ',ou:'ㄡ',an:'ㄢ',en:'ㄣ',ang:'ㄤ',eng:'ㄥ',er:'ㄦ',i:'ㄧ',ia:'ㄧㄚ',io:'ㄧㄛ',ie:'ㄧㄝ',iao:'ㄧㄠ',iu:'ㄧㄡ',iou:'ㄧㄡ',ian:'ㄧㄢ',in:'ㄧㄣ',iang:'ㄧㄤ',ing:'ㄧㄥ',iong:'ㄩㄥ',u:'ㄨ',ua:'ㄨㄚ',uo:'ㄨㄛ',uai:'ㄨㄞ',ui:'ㄨㄟ',uei:'ㄨㄟ',uan:'ㄨㄢ',un:'ㄨㄣ',uen:'ㄨㄣ',uang:'ㄨㄤ',ong:'ㄨㄥ',ueng:'ㄨㄥ','ü':'ㄩ','üe':'ㄩㄝ','üan':'ㄩㄢ','ün':'ㄩㄣ'};
  const Y={yi:'i',ya:'ia',yo:'io',ye:'ie',yao:'iao',you:'iou',yan:'ian',yin:'in',yang:'iang',ying:'ing',yong:'iong',wu:'u',wa:'ua',wo:'uo',wai:'uai',wei:'uei',wan:'uan',wen:'uen',wang:'uang',weng:'ueng',yu:'ü',yue:'üe',yuan:'üan',yun:'ün'};
  let ini='',fin;
  if(Y[syl])fin=Y[syl];
  else{
    const m=syl.match(/^(zh|ch|sh|[bpmfdtnlgkhjqxrzcs])?(.*)$/);ini=m[1]||'';fin=m[2];
    if('jqx'.includes(ini)&&fin[0]==='u')fin='ü'+fin.slice(1);
  }
  let out='';
  if(ini)out+=I[ini];
  if(fin==='i'&&['zh','ch','sh','r','z','c','s'].includes(ini)){}
  else if(syl==='ng')out='ㄫ';
  else{if(F[fin]===undefined)return null;out+=F[fin]}
  return out+(['','','ˊ','ˇ','ˋ','˙'][tone]||'');
}
const KM={};
if(fs.existsSync('vendor/kMandarin.txt'))fs.readFileSync('vendor/kMandarin.txt','utf8').split('\n').forEach(l=>{const m=l.match(/^U\+([0-9A-F]+):\s*([^\s#,]+)/);if(m)KM[String.fromCodePoint(parseInt(m[1],16))]=m[2]});
let autoN=0;
for(let i=missing.length-1;i>=0;i--){const c=missing[i];if(KM[c]){const z=py2zy(KM[c]);if(z){ZY[c]=z;missing.splice(i,1);autoN++}}}
console.log('auto zhuyin:',autoN,' still missing:',missing.length);
if(missing.length)console.log(missing.join(''));
// poem length check
const m=src.match(/const QIAN=\[([\s\S]*?)\n\];/);
if(m){const rows=m[1].split('\n').filter(x=>x.trim().startsWith('['));
  rows.forEach((r,i)=>{const a=eval(r.trim().replace(/,$/,''));for(let k=1;k<=4;k++)if([...a[k]].length!==7)console.log('poem len',i+1,k,a[k],[...a[k]].length)});
  console.log('qian count',rows.length)}
const ST={};
(fs.existsSync('strokes.txt')?fs.readFileSync('strokes.txt','utf8'):'').split('\n').forEach(line=>{
  if(!line.trim()||line.startsWith('#'))return;
  line.trim().split(/\s+/).forEach(tok=>{const m=tok.match(/^(.)(\d+)$/u);if(!m){console.error('BAD STROKE',tok);return}
    if(ST[m[1]]&&ST[m[1]]!==+m[2])console.error('DUP STROKE',tok);ST[m[1]]=+m[2]});
});
console.log('stroke chars:',Object.keys(ST).length);
// ---- 內嵌開源函式庫（MIT / Apache-2.0 / 公有領域）----
const lunarLib=fs.readFileSync('vendor/lunar.js','utf8');
let izb=fs.readFileSync('vendor/iztro.bundle.js','utf8');
izb=izb.replace(/^\(function\(\)\{/,'(function(__LUNAR__){').replace(/window\.__LUNAR__/g,'__LUNAR__').replace('window.__IZTRO__=__L("/index.js");})();','return __L("/index.js");})');
if(izb.includes('window.'))console.error('iztro bundle still references window');
const S2={};
fs.readFileSync('vendor/STCharacters.txt','utf8').split('\n').forEach(l=>{if(!l||l[0]==='#')return;const [k,v]=l.split('\t');if(!v)return;const t=v.split(' ')[0];if(k!==t&&[...k].length===1&&[...t].length===1)S2[k]=t});
const yj=fs.readFileSync('yijing.json','utf8');
for(const t of [lunarLib,izb,yj])if(/<\/script/i.test(t))console.error('script end tag in vendor!');
const libs=`/* 內嵌開源資料與函式庫：lunar-javascript (MIT, 6tail)、iztro (MIT, SylarLong)、OpenCC 簡繁字表 (Apache-2.0, BYVoid)、Project Gutenberg 《易經》(公有領域) */
const LUNAR=(function(){var module={exports:{}},exports=module.exports,define=undefined;${lunarLib}
return module.exports})();
const IZTRO=(${izb})(LUNAR);
const YJ=${yj};
const S2T=${JSON.stringify(S2)};
const KXG=${fs.readFileSync('data/kangxi.json','utf8')};
const STICKS=${sticksTxt};
const ASTRO=(function(){var exports={};${fs.readFileSync('vendor/astronomy.min.js','utf8')}
return exports})();`;
const out=src.replace('/*LIBS*/',()=>libs).replace('/*ENX*/',()=>'const ENX='+fs.readFileSync('data/enx.json','utf8')+';').replace('/*TAROTDATA*/',()=>'const TX='+JSON.stringify((H=>taroTxt.trim().split('\n').map((l,i)=>l.split('｜').concat(H[i])))(fs.readFileSync('data/tarot_health.txt','utf8').trim().split('\n')))+';const TIMG='+fs.readFileSync('tarotimg/b64.json','utf8')+';').replace('/*STROKES*/','const STROKE='+JSON.stringify(ST)+';').replace('/*DICT*/',()=>'const ZY='+JSON.stringify(ZY)+';const WORDS='+JSON.stringify(WORDS)+';');
function scopeCSS(css){
  const kf=[];
  css=css.replace(/@keyframes\s+[\w-]+\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g,m=>{kf.push(m);return '/*KF'+(kf.length-1)+'*/'});
  css=css.replace(/\/\*(?!KF)[\s\S]*?\*\//g,'');
  css=css.replace(/([^{}]+)\{([^{}]*)\}/g,(m,sel,body)=>{
    const lead=(sel.match(/^(\s*\/\*KF\d+\*\/\s*)+/)||[''])[0];sel=sel.slice(lead.length);
    const parts=sel.split(',').map(x=>x.trim()).filter(Boolean).map(x=>{
      if(x==='html')return null;
      if(x===':root'||x==='body')return '#shenji';
      if(x==='*')return '#shenji,#shenji *';
      if(x.startsWith('body'))return '#shenji'+x.slice(4);
      return '#shenji '+x;
    }).filter(Boolean);
    if(!parts.length)return lead;
    return lead+parts.join(',')+'{'+body+'}';
  });
  return css.replace(/\/\*KF(\d+)\*\//g,(m,i)=>kf[+i]);
}
const finalOut=out.replace(/<style>([\s\S]*?)<\/style>/,(m,css)=>'<style>'+scopeCSS(css)+'</style>');
fs.writeFileSync('index.html',finalOut);
const js=finalOut.match(/<script>([\s\S]*)<\/script>/)[1];
fs.writeFileSync('/tmp/check.js',js);
