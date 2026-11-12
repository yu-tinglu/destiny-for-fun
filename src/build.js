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
const body=src.split('/*DICT*/')[1];
const freq={};
for(const ch of body){if(ch>='㐀'&&ch<='鿿')freq[ch]=(freq[ch]||0)+1}
const missing=Object.keys(freq).filter(c=>!ZY[c]);
console.log('unique chars:',Object.keys(freq).length,' missing:',missing.length);
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
const S2T=${JSON.stringify(S2)};`;
const out=src.replace('/*LIBS*/',()=>libs).replace('/*STROKES*/','const STROKE='+JSON.stringify(ST)+';').replace('/*DICT*/',()=>'const ZY='+JSON.stringify(ZY)+';const WORDS='+JSON.stringify(WORDS)+';');
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
