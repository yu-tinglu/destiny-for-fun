/* ===== 其他語言：內文機器翻譯層（連網；結果會快取在本機） ===== */
D['📖 關於這個占卜']=[null,'📖 About this oracle','📖 この占いについて','📖 이 점에 대해','📖 इस भविष्यवाणी के बारे में','📖 Tentang ramalan ini','📖 เกี่ยวกับการทำนายนี้','📖 Về phép bói này','📖 Sobre este oráculo','📖 À propos de cet oracle','📖 Об этом гадании'];
D['文化背景']=[null,'Background','文化的背景','문화적 배경','सांस्कृतिक पृष्ठभूमि','Latar belakang budaya','ที่มาทางวัฒนธรรม','Bối cảnh văn hóa','Contexto cultural','Contexte culturel','Культурный контекст'];
D['怎麼玩']=['點玩','How to use','遊び方','이용 방법','कैसे करें','Cara memakai','วิธีใช้','Cách dùng','Cómo usar','Comment faire','Как пользоваться'];
D['需要連網才能把占卜內文翻譯成你選的語言；目前連不上，暫時顯示原文。']=[null,'An internet connection is needed to translate the reading into your language; it could not connect, so the original text is shown for now.','占いの本文を翻訳するにはインターネット接続が必要です。現在つながらないため、原文を表示しています。','점괘 본문을 번역하려면 인터넷 연결이 필요합니다. 연결할 수 없어 원문을 표시합니다.','पाठ का अनुवाद करने के लिए इंटरनेट चाहिए; अभी कनेक्ट नहीं हुआ, इसलिए मूल पाठ दिख रहा है।','Butuh koneksi internet untuk menerjemahkan isi ramalan; saat ini gagal tersambung, jadi teks asli ditampilkan.','ต้องใช้อินเทอร์เน็ตเพื่อแปลเนื้อหา ตอนนี้เชื่อมต่อไม่ได้ จึงแสดงข้อความต้นฉบับ','Cần có Internet để dịch nội dung; hiện chưa kết nối được nên hiển thị bản gốc.','Se necesita internet para traducir el texto; no se pudo conectar, así que se muestra el original.','Une connexion Internet est nécessaire pour traduire le texte ; connexion impossible, le texte original est affiché.','Для перевода текста нужен интернет; подключиться не удалось, поэтому показан оригинал.'];
const MTL={en:'en',ja:'ja',ko:'ko',hi:'hi',id:'id',th:'th',vi:'vi',es:'es',fr:'fr',ru:'ru'};
const mtOn=()=>!!MTL[LANG];
const CJK=/[㐀-鿿]/;
let MTC={};try{MTC=JSON.parse(localStorage.getItem('sj_mt')||'{}')}catch(e){}
let mtTimer=0,mtDown=0,mtQ=0,mtWait=[];const mtFly={};
function mtSave(){clearTimeout(mtTimer);mtTimer=setTimeout(()=>{try{const k=Object.keys(MTC);if(k.length>2500)k.slice(0,800).forEach(x=>delete MTC[x]);localStorage.setItem('sj_mt',JSON.stringify(MTC))}catch(e){}},800)}
function mtSlot(){return new Promise(r=>{if(mtQ<6){mtQ++;r()}else mtWait.push(r)})}
function mtFree(){mtQ--;const n=mtWait.shift();if(n){mtQ++;n()}}
async function mtOne(text,sl){
  const key=LANG+'|'+sl+'|'+text;
  if(MTC[key])return MTC[key];
  if(mtFly[key])return mtFly[key];
  if(Date.now()<mtDown)return null;
  return mtFly[key]=(async()=>{
    await mtSlot();
    try{
      let out=null;
      if(!out){
        const r=await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl='+sl+'&tl='+MTL[LANG]+'&dt=t&q='+encodeURIComponent(text));
        if(!r.ok)throw new Error('http');
        const j=await r.json();out=j[0].map(x=>x[0]).join('');
      }
      if(!out)throw new Error('empty');
      MTC[key]=out;mtSave();return out;
    }catch(e){mtDown=Date.now()+20000;return null}
    finally{mtFree();delete mtFly[key]}
  })();
}
function mtBanner(show){
  let b=document.getElementById('mtbar');
  if(!b){b=document.createElement('div');b.id='mtbar';ROOT.insertBefore(b,ROOT.children[1])}
  b.textContent=show?TR('需要連網才能把占卜內文翻譯成你選的語言；目前連不上，暫時顯示原文。'):'';b.style.display=show?'block':'none';
}
let mtBusy=false,mtAgain=false;
async function mtPass(root){
  if(!mtOn())return;
  if(mtBusy){mtAgain=true;return}
  mtBusy=true;
  try{
    const items=[];
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(w.nextNode()){const n=w.currentNode,p=n.parentNode;if(!p||p.tagName==='SCRIPT'||p.tagName==='STYLE')continue;if(p.closest&&p.closest('[data-mt]'))continue;if(CJK.test(n.nodeValue))items.push(['t',n,'zh-TW'])}
    root.querySelectorAll('[data-mt]:not([data-mtd])').forEach(e=>items.push(['m',e,'en']));
    root.querySelectorAll('[placeholder],[title]').forEach(e=>['placeholder','title'].forEach(a=>{const v=e.getAttribute(a);if(v&&CJK.test(v))items.push(['a',e,'zh-TW',a])}));
    if(items.length){
      root.classList&&root.classList.add('mtp');
      let failed=false;
      await Promise.all(items.map(async it=>{
        const [k,n,sl,a]=it;
        const raw=k==='t'?n.nodeValue:k==='m'?n.textContent:n.getAttribute(a),t=raw.trim();
        if(!t)return;
        const o=await mtOne(t,sl);
        if(o===null){failed=true;return}
        if(k==='t'){const m=raw.match(/^(\s*)[\s\S]*?(\s*)$/);n.nodeValue=m[1]+o+m[2]}
        else if(k==='m'){n.textContent=o;n.dataset.mtd='1'}
        else n.setAttribute(a,o);
      }));
      root.classList&&root.classList.remove('mtp');
      mtBanner(failed);
    }
  }finally{mtBusy=false}
  waveify(root,true);
  if(mtAgain){mtAgain=false;mtPass(root)}
}
let mtObsT=0;
new MutationObserver(()=>{if(!mtOn())return;clearTimeout(mtObsT);mtObsT=setTimeout(()=>mtPass(app),60)}).observe(app,{childList:true,subtree:true,characterData:true});
