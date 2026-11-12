p='/home/claude/fortune/src.html'
s=open(p,encoding='utf8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(old[:70],s.count(old))
    s=s.replace(old,new)

# ---- 易經：helper + view hook
helper=r"""
/* 易經原典（卦辭、大象、爻辭）：Project Gutenberg 公有領域《易經》 */
const YJM={};YJ.forEach(y=>YJM[y[0]]=y);
const yname=(i,yang)=>i===0?'初'+(yang?'九':'六'):i===5?'上'+(yang?'九':'六'):(yang?'九':'六')+NUM[i+1];
function yjHTML(an,cn_,mv,bitsA,bitsC){
  const A=YJM[an];if(!A)return'';
  const C=cn_?YJM[cn_]:null,n=mv.length;
  const ln=(H,bits,i)=>`<p><b>${yname(i,bits[i])}</b>：${H[3][i]}</p>`;
  let rule='',body='';
  if(n===0){rule='沒有動爻，以本卦卦辭為準。'}
  else if(n===1){rule='一個動爻，以本卦動爻的爻辭為準。';body=ln(A,bitsA,mv[0])}
  else if(n===2){rule='兩個動爻，以本卦這兩爻的爻辭為準，以上面那爻為主。';body=ln(A,bitsA,mv[1])+ln(A,bitsA,mv[0])}
  else if(n===3){rule='三個動爻，以本卦與之卦的卦辭合看，本卦為主。';body=`<p><b>之卦「${C[0]}」卦辭</b>：${C[1]}</p>`}
  else if(n===4){const u=[0,1,2,3,4,5].filter(i=>!mv.includes(i));rule='四個動爻，以之卦兩個不變爻的爻辭為準，以下面那爻為主。';body=ln(C,bitsC,u[0])+ln(C,bitsC,u[1])}
  else if(n===5){const u=[0,1,2,3,4,5].find(i=>!mv.includes(i));rule='五個動爻，以之卦唯一不變爻的爻辭為準。';body=ln(C,bitsC,u)}
  else{
    if(an==='乾'||an==='坤'){rule=an==='乾'?'乾卦六爻皆動，看「用九」。':'坤卦六爻皆動，看「用六」。';body=`<p><b>${an==='乾'?'用九':'用六'}</b>：${A[3][6]}</p>`}
    else{rule='六爻皆動，以之卦卦辭為準。';body=`<p><b>之卦「${C[0]}」卦辭</b>：${C[1]}</p>`}
  }
  return`<div class="wa wa2 sm" data-shape="wave">《易經》原文</div>
  <p><span class="lbl">卦辭</span>${A[1]}</p><p><span class="lbl">大象</span>${A[2]}</p>
  <p><span class="lbl">取辭</span>${rule}</p>${body}`;
}
"""
rep("VIEWS.yi={t:'易經卦象.exe'",helper+"VIEWS.yi={t:'易經卦象.exe'")
rep("""      let ch='';
      if(mv.length){
        const b2=ls.map(v=>v===6?1:v===9?0:(v===7?1:0));
        const h2=HEX[trig(b2[3],b2[4],b2[5])+trig(b2[0],b2[1],b2[2])];""","""      let ch='',yj='';
      if(!mv.length)yj=yjHTML(h[0],null,[],bits,bits);
      if(mv.length){
        const b2=ls.map(v=>v===6?1:v===9?0:(v===7?1:0));
        const h2=HEX[trig(b2[3],b2[4],b2[5])+trig(b2[0],b2[1],b2[2])];
        yj=yjHTML(h[0],h2[0],mv.map(x=>x-1),bits,b2);""")
rep("""<p class="small">簡化解卦，只取卦名與大意，詳細爻辭請參閱《易經》原典。</p></div>`;""","""</div><div class="pane">${yj}<p class="small">取辭法依朱熹《易學啟蒙》，經文取自公有領域的《易經》；白話解讀為簡化大意，僅供娛樂參考。</p></div>`;""")
# meihua
rep("""    const card=(tag,x)=>`<p><span class="lbl">${tag}</span><b>${x.h[0]}卦</b>（上${x.up}下${x.lo}）：${x.h[3]}。</p>`;""","""    const card=(tag,x)=>`<p><span class="lbl">${tag}</span><b>${x.h[0]}卦</b>（上${x.up}下${x.lo}）：${x.h[3]}。</p>`;
    const YA=YJM[A.h[0]];
    const orig=YA?`<p><span class="lbl">卦辭</span>${YA[1]}</p><p><span class="lbl">動爻辭</span><b>${yname(mv-1,L[mv-1])}</b>：${YA[3][mv-1]}</p>`:'';""")
rep("""${card('本卦・現況',A)}${card('互卦・過程',Hh)}""","""${card('本卦・現況',A)}${orig}${card('互卦・過程',Hh)}""")
rep("※ 依邵雍梅花易數的起卦法簡化，只取卦名與大意，沒有細論體用生剋，僅供娛樂參考。","※ 依邵雍梅花易數的起卦法簡化，卦辭與爻辭取自公有領域的《易經》，沒有細論體用生剋，僅供娛樂參考。")

# ---- LIST
rep("['zx','🐲','生肖流年'],['match','💘','緣分配對']]","['zx','🐲','生肖流年'],['match','💘','緣分配對'],['almanac','📅','每日黃曆'],['blood','🩸','血型配對'],['palm','🖐️','手相說明']]")

# ---- 新功能
new=r"""
/* ===== 每日黃曆（lunar-javascript） ===== */
VIEWS.almanac={t:'每日黃曆.exe',render:()=>`
<div class="center">${wa('每日黃曆','wa5','arch')}</div>
<div class="pane center"><div class="row" style="justify-content:center"><button class="btn" id="pv">◀ 前一天</button><input type="date" id="dt"><button class="btn" id="nx">後一天 ▶</button></div>
<button class="btn" id="tdy">回到今天</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const dt=$('#dt',r),out=$('#out',r);
  const f2=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const tags=(a,c)=>a.length?a.map(x=>`<span class="tag${c?' r':''}">${T(x)}</span>`).join(''):'<span class="small">諸事皆宜／無特別</span>';
  const show=()=>{
    if(!dt.value)return;
    const d=parseDate(dt.value),S=LUNAR.Solar.fromYmd(d.getFullYear(),d.getMonth()+1,d.getDate()),l=S.getLunar();
    const jq=l.getJieQi(),fes=[...l.getFestivals(),...S.getFestivals(),...l.getOtherFestivals()];
    const luck=l.getDayTianShenLuck(),lc=luck==='吉'?'#0a7a2a':'#a00';
    const times=l.getTimes().slice(0,12).map(t=>{const g=t.getTianShenLuck()==='吉';return`<div style="border:2px outset #ccc;padding:2px;background:${g?'#eaffea':'#ffecec'};text-align:center"><b>${t.getZhi()}時</b><br><span style="color:${g?'#0a7a2a':'#a00'}">${T(t.getTianShen())}${g?'吉':'凶'}</span><br><span style="font-size:11px">${t.getMinHm()}–${t.getMaxHm()}</span></div>`}).join('');
    out.innerHTML=`<div class="pane"><div class="center">
      <div style="font-size:15px">${d.getFullYear()} 年 ${d.getMonth()+1} 月 ${d.getDate()} 日 星期${WEEK[d.getDay()]}</div>
      <div class="nozy-cell" style="font-size:60px;font-weight:bold;line-height:1.1;color:#a00">${d.getDate()}</div>
      <div>農曆${T(l.getMonthInChinese())}月${T(l.getDayInChinese())}　${T(l.getYearInGanZhi())}年（${T(l.getYearShengXiao())}）</div>
      <div>${T(l.getMonthInGanZhi())}月　${T(l.getDayInGanZhi())}日　納音${T(l.getDayNaYin())}</div>
      ${jq?`<p><span class="tag">${T(jq)}</span></p>`:''}${fes.length?`<p>${fes.map(x=>`<span class="tag r">${T(x)}</span>`).join('')}</p>`:''}</div>
    <div class="wa wa2 sm" data-shape="wave">今日宜忌</div>
    <p><span class="lbl">宜</span>${tags(l.getDayYi(),0)}</p>
    <p><span class="lbl">忌</span>${tags(l.getDayJi(),1)}</p>
    <div class="wa wa2 sm" data-shape="wave">日課資訊</div>
    <p><span class="lbl">值神</span>${T(l.getDayTianShen())}（${T(l.getDayTianShenType())}・<b style="color:${lc}">${luck}</b>）</p>
    <p><span class="lbl">建除</span>${T(l.getZhiXing())}日</p>
    <p><span class="lbl">沖煞</span>沖${T(l.getDayChongShengXiao())}（${T(l.getDayChongDesc())}），煞${T(l.getDaySha())}</p>
    <p><span class="lbl">二十八宿</span>${T(l.getXiu())}宿（${T(l.getXiuLuck())}）</p>
    <p><span class="lbl">吉神宜趨</span>${tags(l.getDayJiShen(),0)}</p>
    <p><span class="lbl">凶煞宜忌</span>${tags(l.getDayXiongSha(),1)}</p>
    <p><span class="lbl">物候</span>${T(l.getHou())}・${T(l.getWuHou())}</p>
    <div class="wa wa2 sm" data-shape="wave">今日方位</div>
    <p><span class="lbl">財神</span>${T(l.getPositionCaiDesc())}　<span class="lbl">喜神</span>${T(l.getPositionXiDesc())}　<span class="lbl">福神</span>${T(l.getPositionFuDesc())}</p>
    <p><span class="lbl">貴人</span>陽貴人${T(l.getPositionYangGuiDesc())}　<span class="lbl">胎神</span>${T(l.getDayPositionTai())}</p>
    <div class="wa wa2 sm" data-shape="wave">十二時辰吉凶</div>
    <div class="nozy-cell" style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px;font-size:14px">${times}</div>
    <div class="wa wa2 sm" data-shape="wave">彭祖百忌</div>
    <p>${T(l.getPengZuGan())}；${T(l.getPengZuZhi())}。</p>
    <p class="small">※ 資料由開源的 lunar-javascript（MIT）提供，簡體字已轉為繁體；宜忌為傳統黃曆參考，重要日子仍請以個人情況與專業擇日為準。</p></div>`;
    refresh(out);
  };
  const shift=n=>{const d=parseDate(dt.value);d.setDate(d.getDate()+n);dt.value=f2(d);show()};
  dt.value=f2(new Date());dt.onchange=show;
  $('#pv',r).onclick=()=>shift(-1);$('#nx',r).onclick=()=>shift(1);$('#tdy',r).onclick=()=>{dt.value=f2(new Date());show()};
  show();
}};

/* ===== 血型配對 ===== */
const BLOOD={
 A:['A 型','🅰️','細心穩重、重視規則與禮貌，責任感強，習慣先把事情想清楚再行動；容易把壓力往肚子裡吞，需要一點放鬆的出口。'],
 B:['B 型','🅱️','自由奔放、好奇心旺盛，想到就做，擅長在興趣領域鑽研；直率不拐彎，有時顯得我行我素，需要多留意他人感受。'],
 O:['O 型','🅾️','大方熱情、重感情也有行動力，喜歡帶領大家往前走；自尊心強，遇到被質疑時容易倔強，要學會適度示弱。'],
 AB:['AB 型','🆎','理性與感性並存、想法獨特，觀察力敏銳，和人保持舒服的距離；情緒切換快，讓人有點難捉摸，多溝通會更順利。']
};
const BM={AA:[82,'彼此都細心、重承諾，相處穩定踏實，只要別互相悶著不說，就能走得很長久。'],
 AB:[66,'一個謹慎、一個隨興，節奏不同；A 型多給空間、B 型多給交代，反而能互補。'],
 AO:[88,'O 型的大方帶動 A 型的細膩，A 型也能穩住 O 型的衝勁，是很有安全感的組合。'],
 AAB:[78,'A 型的踏實加上 AB 型的靈活，聊得來、也各自有空間，要記得把心裡話說出口。'],
 BB:[80,'同樣愛自由、愛玩，容易一拍即合，只要在大事上互相協調，就是最佳玩伴。'],
 BO:[85,'一起冒險、一起享受生活，O 型能包容 B 型的天馬行空，默契很好。'],
 BAB:[72,'都有點特立獨行，彼此欣賞對方的獨特，但要小心都很自我，溝通要有耐心。'],
 OO:[76,'兩個都重面子、有主見，熱情十足卻也容易硬碰硬，學會先退一步，感情會更甜。'],
 OAB:[70,'O 型直來直往，AB 型含蓄多變，剛開始需要磨合，但互相理解後，反差會變成吸引力。'],
 ABAB:[84,'兩人都有獨特的內心世界，能懂對方的奇妙想法，是很有默契的靈魂伴侶。']};
VIEWS.blood={t:'血型配對.exe',render:()=>`
<div class="center">${wa('血型配對','wa3','wave')}
<p>選擇你和對方的血型，看看血型個性與相處建議。</p>
<div class="row" style="justify-content:center"><label>你 <select id="a">${['A','B','O','AB'].map(x=>`<option>${x}</option>`).join('')}</select></label>
<label>對方 <select id="b">${['A','B','O','AB'].map(x=>`<option>${x}</option>`).join('')}</select></label></div>
<button class="btn big" id="go">看看配不配</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const a=$('#a',r).value,b=$('#b',r).value;
    const k=[a,b].sort((x,y)=>['A','B','O','AB'].indexOf(x)-['A','B','O','AB'].indexOf(y)).join('');
    const m=BM[k];
    out.innerHTML=`<div class="paper center">${wa(m[0]+'%','wa1','wave','clamp(60px,20vw,100px)')}
    <p class="nozy-cell" style="font-size:20px">${BLOOD[a][1]} ${BLOOD[a][0]} × ${BLOOD[b][1]} ${BLOOD[b][0]}</p>
    <div style="text-align:left"><p><span class="lbl">相處</span>${m[1]}</p>
    <p><span class="lbl">你</span>${BLOOD[a][2]}</p><p><span class="lbl">對方</span>${BLOOD[b][2]}</p>
    <p class="small">※ 血型與個性並沒有科學上的因果關係，這只是好玩的文化話題，感情還是要靠真心相處。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 手相說明 ===== */
const PALM={
 life:['生命線','拇指根部繞著大魚際的弧線，代表活力與生活的穩定度。',[['又長又深','精力充沛、體力好，做事有耐力，遇到困難也能撐過去。'],['短而淺','不代表壽命短，而是較容易感到疲倦，生活上多留意作息與運動。'],['中途有斷開','人生可能有一次明顯的轉換期或搬遷，斷開後若有重疊接續，表示轉換後會再度穩定。'],['末端分叉','晚年想嘗試不同的生活方式，也有可能旅居或多地發展。']]],
 head:['智慧線','從拇指與食指之間橫向延伸，代表思考方式與學習風格。',[['平直','講求邏輯、務實理性，擅長分析與規劃。'],['微微下彎','想像力豐富、有創意，直覺敏銳，適合文藝與創作。'],['短而直','做事乾脆，重效率，喜歡直接說重點。'],['末端分叉','能同時兼顧理性與感性，善於變通，多才多藝。']]],
 heart:['感情線','小指下方橫向延伸的線，代表感情表達與人際互動。',[['末端上翹','熱情外放、重視感情的表達，朋友緣佳。'],['平直','感情觀理性，注重相處的穩定與尊重。'],['向下彎','很重感情、內心細膩，付出多，也容易受傷，要學會照顧自己。'],['像鏈條般細碎','情緒豐富敏感，感情起伏較多，多一點自我肯定會更安心。']]],
 career:['事業線','從手腕往中指方向的縱線，代表工作態度與事業走向。',[['清晰筆直','目標明確、事業穩定向上，適合循序漸進累積成就。'],['斷斷續續','職涯可能多次轉換，擁有多方面的經驗，靠彈性取勝。'],['不明顯／沒有','不代表沒有事業運，而是不愛被框架，適合自由工作或斜槓發展。'],['末端分叉','中年後有機會多方發展，名聲或副業都有可能。']]]
};
VIEWS.palm={t:'手相說明.exe',render:()=>`
<div class="center">${wa('手相說明','wa6','arch')}
<p>看看自己的掌心，選出最像你的特徵，下面會為你解說。</p>
<svg viewBox="0 0 220 260" width="200" class="nozy-cell" role="img" aria-label="手掌四條主線示意圖">
<path d="M60 250 Q30 220 34 170 Q20 130 40 110 Q38 70 60 70 Q62 20 84 24 Q104 8 118 30 Q138 24 146 48 Q172 50 164 92 Q196 110 182 150 Q176 200 150 250 Z" fill="#f6d2a8" stroke="#8b5a2b" stroke-width="3"/>
<path d="M92 108 Q70 150 92 220" fill="none" stroke="#c0392b" stroke-width="4"/>
<path d="M88 112 Q120 125 150 150" fill="none" stroke="#1e5fbf" stroke-width="4"/>
<path d="M164 112 Q130 102 100 108" fill="none" stroke="#d4408c" stroke-width="4"/>
<path d="M112 250 Q114 190 112 120" fill="none" stroke="#2e8b2e" stroke-width="4"/>
<g font-size="12" fill="#333" font-family="DFKai-SB,BiauKai,serif"><text x="40" y="190" fill="#c0392b">生命</text><text x="150" y="168" fill="#1e5fbf">智慧</text><text x="130" y="100" fill="#d4408c">感情</text><text x="116" y="215" fill="#2e8b2e">事業</text></g></svg>
</div>
<div class="pane">${Object.keys(PALM).map(k=>`<p><b>${PALM[k][0]}</b>　<span class="small">${PALM[k][1]}</span><br><select data-k="${k}">${PALM[k][2].map((o,i)=>`<option value="${i}">${o[0]}</option>`).join('')}</select></p>`).join('')}
<div class="center"><button class="btn big" id="go">解說我的手相</button></div></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    out.innerHTML=`<div class="paper"><div class="center">${wa('你的掌紋','wa2','wave')}</div>${Object.keys(PALM).map(k=>{const i=+$(`select[data-k=${k}]`,r).value,o=PALM[k][2][i];return`<p><span class="lbl">${PALM[k][0]}</span><b>${o[0]}</b>：${o[1]}</p>`}).join('')}
    <p class="small">※ 手相解說為傳統民俗說法的簡化整理，掌紋會隨年齡與使用習慣改變，僅供娛樂參考。</p></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ---------- 路由與外框 ---------- */"""
rep("\n/* ---------- 路由與外框 ---------- */",new)
open(p,'w',encoding='utf8').write(s);print('ok')
