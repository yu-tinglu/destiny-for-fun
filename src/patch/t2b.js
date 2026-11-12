/* ===== 九星氣學 ===== */
/* [名稱, 五行index(木0火1土2金3水4), 方位, 幸運色, 個性, 強項, 課題, 愛情, 工作] */
const KS=[null,
['一白水星',4,'北','白色、黑色','溫柔、適應力強、善於傾聽，像水一樣能配合環境','懂得體貼、耐心、人際細膩','容易猶豫、把心事藏著、有時過度依賴','感情細膩專一，需要安心感，容易被體貼的人吸引','適合企劃、服務、顧問、研究，需要團隊與信任'],
['二黑土星',2,'西南','黃色、褐色','踏實、勤勞、愛照顧人，像大地一樣包容','耐力強、負責、擅長打基礎','容易操心過度、委屈自己、凡事親力親為','愛得穩重顧家，重視生活的安定','適合行政、教育、農業、照顧與管理的工作'],
['三碧木星',0,'東','青色、綠色','活潑、積極、行動快，像春天的新芽','反應快、有衝勁、愛挑戰','容易急躁、三分鐘熱度、說話太直','愛得熱烈直接，喜歡快速推進關係','適合創業、業務、媒體、創意與需要速度的工作'],
['四綠木星',0,'東南','綠色','溫和、守信、重禮貌，像微風一樣親和','人緣好、善於溝通、重信用','優柔寡斷、容易被別人影響、愛面子','重視緣分與禮貌，喜歡循序漸進','適合貿易、旅遊、公關、仲介與跨地區的工作'],
['五黃土星',2,'中央','黃色、金色','存在感強、有領導力、意志堅定，像帝王星','很有魅力與毅力，能撐起大局','強勢、固執、容易走極端，不輕易低頭','愛恨分明，需要被尊重，感情起伏大','適合領導、經營、重大決策，也適合重新開始的事'],
['六白金星',3,'西北','白色、金色','正直、有威嚴、責任感強，像天空一樣高遠','公正、有原則、有領導風範','自尊心高、愛面子、不易認輸','愛得有責任，重視承諾，不太表達','適合管理、公職、金融、法律與需要威信的工作'],
['七赤金星',3,'西','金色、紅色','開朗、愛享受、口才好，像歡笑的少女','善於社交、有魅力、懂得享受生活','花錢大方、貪玩、容易三心二意','愛得浪漫，喜歡愉快的氣氛','適合餐飲、娛樂、銷售、金融與需要口才的工作'],
['八白土星',2,'東北','白色、黃色','沉穩、有定見、重視累積，像山一樣穩','能守成、善於儲蓄、有耐力','固執、轉變慢、容易鑽牛角尖','愛得慢熱、認定就長久','適合不動產、金融、傳承事業與需要長期經營的工作'],
['九紫火星',1,'南','紫色、紅色','聰明、有美感、熱情，像火焰一樣耀眼','直覺好、有才華、表達力強','情緒起伏大、愛面子、容易衝動','愛得熱烈浪漫，重視外表與感覺','適合設計、藝術、教育、媒體與需要曝光的工作']];
const KP=[
['中宮','蟄伏與整理的一年','今年回到「正中央」，是整理自己、檢視方向的一年。','事業宜守不宜攻，把基礎打穩','感情順其自然，別勉強','注意腸胃與整體疲勞，多休息'],
['西北','貴人與責任的一年','今年飛到「西北（乾宮）」，責任變重，但也容易得到長輩與上司的幫助。','事業有被提拔的機會，也要多承擔','感情偏務實，可能有穩定關係的進展','注意頭部與呼吸系統，避免過勞'],
['正西','享樂與金錢的一年','今年飛到「正西（兌宮）」，人際與社交活絡，金錢流動也多。','事業靠人脈與口碑，適合銷售與合作','桃花與聚會多，要留意花費','注意口腔與喉嚨，少熬夜'],
['東北','變動與轉機的一年','今年飛到「東北（艮宮）」，舊事結束、新機會浮現，是人生的轉折點。','事業可能轉換跑道或結構調整','感情可能有重大轉變，宜慎重','注意關節與手腳，避免受傷'],
['正南','名聲與才華的一年','今年飛到「正南（離宮）」，才華被看見，名聲與曝光增加。','事業有曝光與表現的好機會，也易有口舌','感情熱烈但情緒起伏大','注意心臟、眼睛與血壓，保持心情平和'],
['正北','辛勞與考驗的一年','今年飛到「正北（坎宮）」，需要耐心，是考驗毅力的一年。','事業進度較慢，宜專注學習與累積','感情需要多溝通，避免冷戰','注意腎臟、泌尿與睡眠，多保暖'],
['西南','踏實耕耘的一年','今年飛到「西南（坤宮）」，適合打基礎、顧家庭、做長期規劃。','事業穩紮穩打，不宜冒進','感情偏家庭化，適合談婚論嫁','注意腸胃與皮膚，規律飲食'],
['正東','新開始與活力的一年','今年飛到「正東（震宮）」，充滿朝氣，適合啟動新計畫。','事業有新專案或新機會，宜主動出擊','感情有新的相遇，節奏較快','注意肝膽與神經緊張，適度運動'],
['東南','信用與人緣的一年','今年飛到「東南（巽宮）」，旅行、洽談與拓展人脈特別順利。','事業靠信用與口碑，適合出差與談合作','感情靠緣分，順其自然最好','注意呼吸道與過敏，多喝水']];
const LUOSHU=[[4,9,2],[3,5,7],[8,1,6]]; // 西北... 洛書方位：巽離坤/震中兌/艮坎乾
const LS_POS=[['東南','正南','西南'],['正東','中宮','正西'],['東北','正北','西北']];
const FLY=['中宮','西北','正西','東北','正南','正北','西南','正東','東南'];
function ksYear(Y,M,D){const l=LUNAR.Solar.fromYmd(Y,M,D).getLunar(),g=l.getYearInGanZhiByLiChun();for(const y of[Y-1,Y,Y+1])if(STEMS[mod(y-4,10)]===g[0]&&BR[mod(y-4,12)]===g[1])return y;return Y}
const ksStar=y=>{let s=sumd(y);while(s>9)s=sumd(s);let n=11-s;if(n>9)n-=9;return n};
VIEWS.kyusei={t:'九星氣學.exe',render:()=>`
<div class="center">${wa('九星氣學','wa6','arch')}<p>日本流傳的九星氣學：每個人都有一顆「本命星」（由出生年決定）和一顆「月命星」（由出生月決定）。</p></div>
<div class="pane center"><label>西曆生日 <input type="date" id="dt" value="${store.get('birth','2000-01-01')}"></label><br><button class="btn big" id="go">算本命星</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const ds=$('#dt',r).value;if(!ds)return;store.set('birth',ds);
    const [Y,M,D]=ds.split('-').map(Number),y=ksYear(Y,M,D),star=ksStar(y);
    const l=LUNAR.Solar.fromYmd(Y,M,D).getLunar(),mb=BR.indexOf(l.getMonthInGanZhiExact()[1]),m0=mod(mb-2,12),yb=mod(y-4,12);
    const grp='子午卯酉'.includes(BR[yb])?8:'辰戌丑未'.includes(BR[yb])?5:2;
    const mstar=mod(grp-1-m0,9)+1;
    const now=new Date(),cy=ksYear(now.getFullYear(),now.getMonth()+1,now.getDate()),cs=ksStar(cy),ns=ksStar(cy+1);
    const pos=mod(star-cs,9),pos2=mod(star-ns,9);
    const K=KS[star],K2=KS[mstar];
    const rel=(a,b)=>{const x=KS[a][1],z=KS[b][1];if(x===z)return['五行相同','像照鏡子，彼此很懂，也容易一起固執'];if(z===(x+1)%5)return['你生對方','你滋養、成就對方，付出較多'];if(x===(z+1)%5)return['對方生你','對方滋養你，你比較輕鬆被照顧'];if(z===(x+2)%5)return['你剋對方','你比較強勢，要留意對方感受'];return['對方剋你','對方比較強勢，你要學會表達自己']};
    // 今年九宮格
    const cell=(n,posName)=>`<td style="${n===star?'background:#ffd45a;font-weight:bold':''}"><div style="font-size:12px;color:#555">${posName}</div><div style="font-size:24px">${n}</div><div style="font-size:12px">${KS[n][0].slice(0,3)}${n===star?'<br>★你':''}</div></td>`;
    const grid=LUOSHU.map((row,ri2)=>'<tr>'+row.map((p,ci)=>{const k=FLY.indexOf(LS_POS[ri2][ci]);return cell(mod(cs-1+k,9)+1,LS_POS[ri2][ci])}).join('')+'</tr>').join('');
    const compat=[1,2,3,4,5,6,7,8,9].filter(n=>n!==star).map(n=>{const x=rel(star,n);return`<tr><td>${KS[n][0]}</td><td>${x[0]}</td><td style="text-align:left">${x[1]}</td></tr>`}).join('');
    out.innerHTML=`<div class="paper">
    <div class="center">${wa(K[0],'wa2','wave','clamp(40px,12vw,66px)')}<p>${y} 年生（以立春為界）</p></div>
    ${note('<b>怎麼看：</b>本命星＝你的「大方向性格」，也是別人眼中的你；月命星＝你的「內心與私下的一面」。兩顆星合起來，才是完整的你。')}
    ${P_('本命星',`<b>${K[0]}</b>（${E5[K[1]]}行・方位：${K[2]}・幸運色：${K[3]}）`)}
    ${P_('個性',K[4]+'。')}${P_('強項',K[5]+'。')}${P_('課題',K[6]+'。')}${P_('感情',K[7]+'。')}${P_('工作',K[8]+'。')}
    ${sec('月命星：內在的你')}
    ${P_('月命星',`<b>${K2[0]}</b>（${E5[K2[1]]}行）：私下相處、放鬆時的你，${K2[4]}。`)}
    ${P_('兩星關係',rel(star,mstar)[0]+'：'+rel(star,mstar)[1]+'。外在（本命星）與內在（月命星）'+(star===mstar?'完全一致，表裡如一。':'有落差是正常的，這就是你的多面性。'))}
    ${sec(cy+' 年九宮盤（你在哪一宮）')}
    <table class="tbl fix nozy-cell" style="font-size:14px">${grid}</table>
    <p class="small">今年中宮是${KS[cs][0]}，金色格子是你的本命星飛到的位置。</p>
    ${P_('今年位置',`<b>${KP[pos][0]}・${KP[pos][1]}</b>。${KP[pos][2]}`)}${P_('事業',KP[pos][3]+'。')}${P_('感情',KP[pos][4]+'。')}${P_('健康',KP[pos][5]+'。')}
    ${P_((cy+1)+' 年預告',`${KP[pos2][0]}・${KP[pos2][1]}。`)}
    ${sec('你和其他本命星的相性')}
    <table class="tbl fix nozy-cell" style="font-size:14px"><tr><th>對方本命星</th><th>五行關係</th><th>說明</th></tr>${compat}</table>
    <p class="small">※ 九星氣學流派很多，這裡採常見的年盤算法並以白話簡化，月命星依出生年地支分組、以節氣月為準，僅供娛樂參考。</p></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 瑪雅神聖曆（卓爾金曆） ===== */
const MS=[['Imix','鱷魚・原初之水','滋養、直覺，像大地之母般包容，是起點與源頭的能量。','容易情緒化，需要學習界線。','像孕育萬物的母親'],['Ik','風','溝通與靈感，自由自在，思想與言語很有力量。','靜不下來，容易善變。','像捉不住的風'],['Akbal','夜・屋','夢境與內省，需要安全感，擅長在安靜中看見答案。','容易退縮，不敢面對黑暗。','像夜裡亮著燈的小屋'],['Kan','種子','潛力與成長，善於耕耘，點子會慢慢開花結果。','急著看到成果會失望，要有耐心。','像等待發芽的種子'],['Chicchan','蛇','生命力與本能，熱情旺盛，直覺敏銳。','容易被慾望牽著走。','像盤繞的靈蛇'],['Cimi','轉化・死亡','懂得放下與更新，帶著智慧面對結束與重生。','捨不得放手時會很痛苦。','像落葉歸根'],['Manik','手・鹿','療癒與實踐，善於動手把想法做出來。','容易凡事自己來，不求助。','像一雙靈巧的手'],['Lamat','星','和諧與豐盛，帶著藝術氣質與幸運感。','容易為了和諧而委屈自己。','像夜空的星星'],['Muluc','水・月','情感與淨化，願意付出，也需要學習釋放。','情緒波動大，容易受環境影響。','像流動的水與月光'],['Oc','狗','忠誠與友誼，是可靠的夥伴，也常為人引路。','太忠誠時容易被利用。','像忠心的狗'],['Chuen','猴','創意與玩心，點子多、幽默，把生活當成藝術。','太愛玩而忽略責任。','像愛玩的猴子'],['Eb','草・道路','服務與人道，腳踏實地走自己的路，有同理心。','容易把別人的事看得比自己重。','像一條長長的路'],['Ben','蘆葦','領導與探索，意志堅定，總有想去的遠方。','容易固執己見。','像挺直的蘆葦'],['Ix','美洲豹','魔力與守護，帶著神祕的氣場與敏銳的感受。','過度防衛，不輕易敞開心。','像夜行的美洲豹'],['Men','老鷹','遠見與視野，站得高看得遠，重視自由。','太抽離現實，忽略小細節。','像翱翔的老鷹'],['Cib','禿鷲・貓頭鷹','智慧與傳承，洞察力強，重視祖先與經驗。','容易活在過去。','像守夜的貓頭鷹'],['Caban','大地','與大地連結，直覺與同步性強，善於把握時機。','想太多，反而錯過行動。','像脈動的大地'],['Etznab','燧石・鏡子','真理與決斷，直接坦率，像鏡子般照見真實。','說話太直，容易傷人。','像鋒利的燧石'],['Cauac','風暴','淨化與轉變，能量強大，經歷風雨後更堅強。','容易讓周圍的人緊張。','像洗滌天地的暴風雨'],['Ahau','太陽','光明與領袖，樂觀有魅力，天生帶著溫暖的光。','太追求完美與被認同。','像照耀大地的太陽']];
const MT=[['開始與目標','像種下第一顆種子，專注一個目標'],['對立與選擇','面對兩難，學會看見兩面'],['行動與服務','把意圖化為行動，開始付出'],['形塑與定義','讓想法有形狀，找到方法'],['賦權與核心','找到力量的中心，凝聚資源'],['平衡與組織','讓一切運轉順暢，維持平衡'],['共鳴與調和','靜下來傾聽，與內在共鳴'],['和諧與整合','言行一致，整合所學'],['脈動與實現','持續行動，朝完成前進'],['顯化與完成','成果顯現，檢視成就'],['釋放與解放','放下不需要的，重新出發'],['合作與奉獻','與人合作，把成果分享出去'],['超越與圓滿','完成一個循環，準備邁向下一階段']];
const MDIR=[['東','紅色','開始與啟動'],['北','白色','淨化與智慧'],['西','藍／黑色','內省與轉化'],['南','黃色','成熟與收穫']];
function mayaKin(Y,M,D){const d=Math.floor(Date.UTC(Y,M-1,D)/86400000)+2440588-2456283;const tone=mod(3+d,13)+1,sign=mod(19+d,20);let n=0;for(let k=1;k<=260;k++)if((k-1)%13+1===tone&&(k-1)%20===sign){n=k;break}return{tone,sign,n}}
VIEWS.maya={t:'瑪雅神聖曆.exe',render:()=>`
<div class="center">${wa('瑪雅神聖曆','wa4','wave')}<p>瑪雅人使用 260 天的神聖曆（卓爾金曆）：20 個「日符號」搭配 13 個「數字」，你的生日就是其中一天。</p></div>
<div class="pane center"><label>西曆生日 <input type="date" id="dt" value="${store.get('birth','2000-01-01')}"></label><br><button class="btn big" id="go">查我的日符號</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const ds=$('#dt',r).value;if(!ds)return;store.set('birth',ds);
    const [Y,M,D]=ds.split('-').map(Number),k=mayaKin(Y,M,D),s=MS[k.sign],tn=MT[k.tone-1],dir=MDIR[k.sign%4];
    const n=new Date(),tk=mayaKin(n.getFullYear(),n.getMonth()+1,n.getDate());
    const nxt=Array.from({length:13},(_,i)=>{const d=new Date(n.getTime()+i*86400000),x=mayaKin(d.getFullYear(),d.getMonth()+1,d.getDate());return`<tr><td>${d.getMonth()+1}/${d.getDate()}</td><td>${x.tone} ${MS[x.sign][0]}</td><td style="text-align:left">${MS[x.sign][1].split('・')[0]}・${MT[x.tone-1][0]}</td></tr>`}).join('');
    out.innerHTML=`<div class="paper center">${wa(k.tone+' '+s[0],'wa7','wave','clamp(44px,13vw,72px)')}<div class="grade">${s[1]}</div>
    <div style="text-align:left">
    ${note('<b>怎麼看：</b>你的生日在 260 天循環裡是第 '+k.n+' 天，由「日符號」（你像什麼）＋「數字」（你用什麼方式展現）組成。')}
    ${P_('日符號',`<b>${s[0]}・${s[1]}</b>：${s[2]}`)}${P_('象徵',s[4]+'。')}${P_('課題',s[3])}
    ${P_('數字 '+k.tone,`<b>${tn[0]}</b>：${tn[1]}。這個數字決定你的日符號用什麼節奏展現。`)}
    ${P_('方位與顏色',`${dir[0]}方・${dir[1]}：代表「${dir[2]}」的能量。`)}
    ${P_('循環位置',`260 天中的第 ${k.n} 天，約在循環的${k.n<=65?'前段（啟動期）':k.n<=130?'中前段（成長期）':k.n<=195?'中後段（成熟期）':'後段（收成期）'}。`)}
    ${sec('今天與接下來 13 天')}
    ${P_('今天',`${tk.tone} ${MS[tk.sign][0]}（${MS[tk.sign][1]}）。日符號主題：${MS[tk.sign][2].split('，')[0]}；數字主題：${MT[tk.tone-1][0]}。${tk.sign===k.sign?'今天與你的日符號相同，是屬於你的日子！':tk.tone===k.tone?'今天與你的數字相同，能量特別有共鳴。':''}`)}
    <table class="tbl fix nozy-cell" style="font-size:14px"><tr><th>日期</th><th>日子</th><th>主題</th></tr>${nxt}</table>
    <p class="small">※ 採傳統 GMT 對照（2012/12/21 為 4 Ahau）計算卓爾金曆，與「夢境咒語曆」的 KIN 系統不同；解說為白話簡化版，僅供娛樂參考。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 吠陀占星：月宿與大運 ===== */
const NK=[['Ashwini','馬頭星宿','行動敏捷、善於開創與療癒，像新生的馬'],['Bharani','負載星宿','承擔力強、情感強烈、重視生命力與責任'],['Krittika','剪刀・火焰','銳利有批判力，具有淨化與保護的力量'],['Rohini','紅星','有魅力、重享受，富創造力，容易吸引人'],['Mrigashira','鹿頭','好奇愛探索，溫柔又愛追尋，心思細膩'],['Ardra','濕潤之星','經歷風暴後重生，聰明而敏感，情緒強烈'],['Punarvasu','回歸之光','樂觀包容，跌倒了也能東山再起'],['Pushya','滋養之星','善良可靠，擅長照顧與教導，被視為最吉祥的月宿'],['Ashlesha','擁抱之蛇','洞察力深、有策略，感受複雜細膩'],['Magha','王座','重傳承與尊榮，有領導氣質，重視家族'],['Purva Phalguni','前紅星','愛享樂與藝術，重視愛與休閒'],['Uttara Phalguni','後紅星','重承諾與友誼，穩定可靠，樂於助人'],['Hasta','手','靈巧，善於手作與解決問題，幽默機智'],['Chitra','明珠','愛美有設計感，創造力豐富，外表亮眼'],['Swati','獨立之風','自由靈活，重視獨立與平衡，善於生意'],['Vishakha','凱旋門','目標堅定，企圖心強，不達目的不罷休'],['Anuradha','友誼之星','忠誠善合作，擅長經營關係，有毅力'],['Jyeshtha','長者','保護欲強、有威信，肯承擔責任'],['Mula','根','追根究柢，勇於破舊立新，喜歡探索本質'],['Purva Ashadha','前不敗','樂觀自信，說服力強，不輕易認輸'],['Uttara Ashadha','後不敗','穩健持久，重原則與長遠的勝利'],['Shravana','聆聽之星','善於學習與傾聽，重視知識與口碑'],['Dhanishta','鼓','有節奏感，社交與財運活絡，活力充沛'],['Shatabhisha','百醫之星','獨立神祕，擅長療癒與研究，喜歡獨處'],['Purva Bhadrapada','前雙足','理想熱情，帶有靈性與激進色彩'],['Uttara Bhadrapada','後雙足','沉穩深刻，富同情心與智慧'],['Revati','富足之星','溫柔守護，善於引導，旅途平安']];
const NKL=['凱圖','金星','太陽','月亮','火星','羅睺','木星','土星','水星'],NKLY=[7,20,6,10,7,18,16,19,17];
const NKLD=['放下、斷捨離、靈性與孤獨的時期；容易感到失落，也最能看清本質','感情、享受、藝術與物質的時期；人際與財富成長，要避免過度放縱','自我、事業與權威的時期；有機會被看見，也要提防驕傲','情緒、家庭與內心的時期；感受敏銳，需要安全感與休息','行動、競爭與衝勁的時期；精力旺盛，也容易衝動與衝突','野心、突破與劇烈變動的時期；機會與混亂並存，容易想要更多','成長、智慧與貴人的時期；學習、擴張與好運增加','責任、磨練與長期成果的時期；辛苦但扎實，累積耐力','學習、溝通與生意的時期；腦筋活躍，適合學習與交易'];
const RASHI=['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrischika','Dhanu','Makara','Kumbha','Meena'];
VIEWS.vedic={t:'吠陀月宿.exe',render:()=>`
<div class="center">${wa('吠陀月宿','wa5','arch')}<p>印度吠陀占星以「月亮」為核心：看月亮落在 27 個星宿的哪一個，並推算人生每個階段的「大運」。</p></div>${birthForm(true)}<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);bindPlace(r);
  $('#go',r).onclick=()=>{
    const b=readBirth(r);if(!b)return;
    const C=chartOf(b),ay=C.ay,sid=l=>mod(l-ay,360);
    const mo=sid(C.lons[1]),su=sid(C.lons[0]),w=360/27,ni=Math.floor(mo/w),pada=Math.floor(mod(mo,w)/(w/4))+1,N=NK[ni];
    const lagna=sid(C.asc);
    const nkOf=l=>NK[Math.floor(sid(l+ay)/w)];
    const body=[[0,'太陽 Surya'],[1,'月亮 Chandra'],[4,'火星 Mangala'],[2,'水星 Budha'],[5,'木星 Guru'],[3,'金星 Shukra'],[6,'土星 Shani']];
    const rows=body.map(([i,n])=>{const l=sid(C.lons[i]);return`<tr><td>${n}</td><td>${SIGNS[sgn(l)][1]}座 ${RASHI[sgn(l)]} ${dm(l)}</td><td>${NK[Math.floor(l/w)][0]}</td></tr>`});
    const ra=sid(C.node),ke=mod(ra+180,360);
    rows.push(`<tr><td>羅睺 Rahu</td><td>${SIGNS[sgn(ra)][1]}座 ${dm(ra)}</td><td>${NK[Math.floor(ra/w)][0]}</td></tr>`,`<tr><td>計都 Ketu</td><td>${SIGNS[sgn(ke)][1]}座 ${dm(ke)}</td><td>${NK[Math.floor(ke/w)][0]}</td></tr>`);
    // 文希里大運
    const lord=ni%9,frac=mod(mo,w)/w,yr=365.25*86400000;
    let start=b.date.getTime()-frac*NKLY[lord]*yr,dasha=[];
    for(let k=0;k<9;k++){const L=(lord+k)%9,end=start+NKLY[L]*yr;dasha.push([L,start,end]);start=end}
    const nowT=Date.now();
    const cur=dasha.find(d=>nowT>=d[1]&&nowT<d[2]);
    let sub='';
    if(cur){let s=cur[1];for(let k=0;k<9;k++){const L=(cur[0]+k)%9,len=NKLY[cur[0]]*NKLY[L]/120*yr;if(nowT>=s&&nowT<s+len){sub=`<p>${P_('目前小運',`<b>${NKL[L]}小運</b>：${fdate(new Date(s))} ～ ${fdate(new Date(s+len))}。在${NKL[cur[0]]}大運之中，這段時間又帶著「${NKLD[L].split('；')[0]}」的色彩。`)}</p>`;break}s+=len}}
    const drow=dasha.map(d=>`<tr style="${d===cur?'background:#ffd45a;font-weight:bold':''}"><td>${NKL[d[0]]}</td><td>${fdate(new Date(Math.max(d[1],0)))}</td><td>${fdate(new Date(d[2]))}</td><td>${NKLY[d[0]]} 年</td></tr>`).join('');
    out.innerHTML=`<div class="paper center">${wa(N[0],'wa3','wave','clamp(30px,9vw,46px)')}<div class="grade">${N[1]}・第 ${pada} 足</div>
    <div style="text-align:left">
    ${note('<b>先看這個就好：</b>吠陀占星看的是「恆星黃道」，和西洋星座差約 24 度，所以你的吠陀星座通常比西洋星座「晚一個」。<b>月亮星座與月宿</b>是最重要的，代表你的情緒本質；下面還有每一段人生的「大運」時間表。')}
    ${P_('月宿',`<b>${N[0]}（${N[1]}）</b>・第 ${pada} 足。特質：${N[2]}。`)}
    ${P_('月宿主星',`${NKL[lord]}。人生大運從${NKL[lord]}開始，出生時這個運已走了約 ${(frac*100).toFixed(0)}%。`)}
    ${P_('月亮星座',`${SIGNS[sgn(mo)][1]}座（${RASHI[sgn(mo)]}）${dm(mo)}。這是吠陀占星最重要的星座，代表你的情緒與內心。`)}
    ${P_('太陽星座',`${SIGNS[sgn(su)][1]}座（${RASHI[sgn(su)]}）。代表你的生命力與自我方向。`)}
    ${P_('上升星座',`${SIGNS[sgn(lagna)][1]}座（${RASHI[sgn(lagna)]}）。代表你的外在與人生起點。`)}
    ${sec('各星體位置（恆星黃道）')}
    <table class="tbl fix nozy-cell" style="font-size:14px"><tr><th>星體</th><th>星座</th><th>月宿</th></tr>${rows.join('')}</table>
    ${sec('文希里大運（人生的階段）')}
    ${note('吠陀占星把人生分成 9 個「大運」，由 9 個星體輪流當主角，總共 120 年。你現在處於哪一個運，就看哪一個星體的主題。')}
    <table class="tbl fix nozy-cell" style="font-size:14px"><tr><th>大運</th><th>開始</th><th>結束</th><th>長度</th></tr>${drow}</table>
    ${cur?P_('目前大運',`<b>${NKL[cur[0]]}大運</b>（${fdate(new Date(cur[1]))} ～ ${fdate(new Date(cur[2]))}）：${NKLD[cur[0]]}。`)+sub:''}
    <p class="small">※ 採拉希里（Lahiri）近似歲差 ${ay.toFixed(2)}°；位置由 astronomy-engine（MIT）計算，若月亮在星宿邊界附近，結果可能有出入；上升星座依出生時間與地點而定。解說為白話簡化版，僅供娛樂參考。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 凱爾特樹木曆 ===== */
/* [名稱, 起始[月,日], 歐甘文字, 性格, 強項, 課題, 愛情, 事業] */
const CT=[['樺樹 Birch',[12,24],'Beth',['開始與更新。像清晨的第一道光，樂觀、有開創力'],'擅長起頭、帶動氣氛、讓人重新看見希望','容易缺乏耐心，三分鐘熱度','愛得純真，喜歡全新的關係','適合創業、教育、設計與開拓性的工作'],
['花楸 Rowan',[1,21],'Luis',['保護與洞察。敏銳、有靈感，能看穿表面'],'直覺強、有藝術天分、懂得保護自己與他人','太敏感，容易受環境影響','愛得細膩，渴望心靈相通','適合研究、創作、療癒與諮詢'],
['梣木 Ash',[2,18],'Nion',['連結與想像。思緒廣闊，善於連結不同事物'],'想像力豐富、有智慧、善於整合','容易活在想像裡，執行力要加強','愛得浪漫，重視精神層面','適合作家、規劃、科技與跨領域的工作'],
['赤楊 Alder',[3,18],'Fearn',['勇氣與引導。有堅定的信念，願意為他人站出來'],'有勇氣、善於引導、重視自主','過於固執，不易接受建議','愛得忠誠，需要被尊重','適合領導、教練、顧問與社會服務'],
['柳樹 Willow',[4,15],'Saille',['直覺與流動。感受細膩，很能適應變化'],'有同理心、直覺準、適應力強','情緒起伏大，容易受傷','愛得深情，容易付出太多','適合藝術、心理、照護與需要感受力的工作'],
['山楂 Hawthorn',[5,13],'Huath',['熱情與守護。充滿生命力，既浪漫也有保護欲'],'真誠、有魅力、充滿活力','脾氣急，愛恨分明','愛得熱烈，重視真誠','適合服務、藝術、活動企劃與團隊工作'],
['橡樹 Oak',[6,10],'Duir',['力量與可靠。堅毅穩重，是團體的支柱'],'可靠、有力量、有責任感','太倔強，不輕易示弱','愛得穩重，重視承諾','適合管理、建築、公職與需要長期經營的工作'],
['冬青 Holly',[7,8],'Tinne',['高貴與挑戰。勇敢有尊嚴，面對挑戰越挫越勇'],'勇敢、正直、有領導氣質','自尊心強，容易與人對立','愛得有原則，需要尊重','適合法律、軍警、競技與需要勇氣的工作'],
['榛樹 Hazel',[8,5],'Coll',['智慧與學習。好奇心強、聰明有條理'],'聰明、善學習、有洞察力','想太多，容易鑽牛角尖','愛得理性，重視心智交流','適合研究、寫作、教學與資訊相關工作'],
['葡萄藤 Vine',[9,2],'Muin',['豐收與享受。重視感官與品質，懂得享受生活'],'有品味、善於社交、懂得享受','容易過度放縱，情緒起伏','愛得真誠，重視氛圍與感受','適合餐飲、藝術、公關與生活品味相關工作'],
['常春藤 Ivy',[9,30],'Gort',['忠誠與韌性。執著而堅韌，不離不棄'],'韌性強、忠誠、善於陪伴','容易黏人、不放手','愛得專一，忠貞不渝','適合照護、團隊支援與需要耐心的工作'],
['蘆葦 Reed',[10,28],'Ngetal',['探究與沉潛。擅長觀察與保密，深度思考'],'觀察力強、有洞察力、懂得保守祕密','過於內向，不輕易表達','愛得深刻，慢熱','適合研究、調查、諮詢與需要專注的工作'],
['接骨木 Elder',[11,25],'Ruis',['結束與重生。有轉化的智慧，能在結束中看見新的開始'],'有智慧、懂得放下、善於轉化','容易悲觀，對過去執著','愛得深沉，經歷過轉折','適合諮商、療癒、轉型與顧問工作']];
VIEWS.celt={t:'凱爾特樹木曆.exe',render:()=>`
<div class="center">${wa('凱爾特樹木曆','wa6','wave')}<p>現代凱爾特占卜把一年分成 13 個樹木月（每個樹對應一個古老的歐甘文字），每個生日都有一棵守護樹。</p></div>
<div class="pane center"><label>生日 <select id="m">${Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1} 月</option>`).join('')}</select> <select id="d">${Array.from({length:31},(_,i)=>`<option value="${i+1}">${i+1} 日</option>`).join('')}</select></label><br><button class="btn big" id="go">找我的守護樹</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  const n0=new Date();$('#m',r).value=n0.getMonth()+1;$('#d',r).value=n0.getDate();
  $('#go',r).onclick=()=>{
    const v=+$('#m',r).value*100+ +$('#d',r).value;
    let idx=0;CT.forEach((c,i)=>{if(i>0&&v>=c[1][0]*100+c[1][1])idx=i});
    if(v>=1224)idx=0;else if(v<121)idx=0;
    const c=CT[idx],nx=CT[(idx+1)%13],pv=CT[(idx+12)%13];
    const range=(i)=>{const a=CT[i][1],b=CT[(i+1)%13][1],e=new Date(2023,b[0]-1,b[1]-1);return`${a[0]}/${a[1]}～${e.getMonth()+1}/${e.getDate()}`};
    out.innerHTML=`<div class="paper center">${wa(c[0].split(' ')[0],'wa4','wave','clamp(50px,16vw,80px)')}<div class="grade">${c[0].split(' ')[1]}・歐甘字母 ${c[2]}</div>
    <div style="text-align:left">
    ${note('<b>怎麼看：</b>這是現代凱爾特（羅伯特・格雷夫斯一派）的樹木曆，一年有 13 個月，每個月由一種樹守護；你出生在哪個月，那棵樹就是你的守護樹，代表你的性格。')}
    ${P_('守護期間',range(idx))}${P_('性格',c[3][0]+'。')}${P_('強項',c[4]+'。')}${P_('課題',c[5]+'。')}${P_('感情',c[6]+'。')}${P_('事業',c[7]+'。')}
    ${P_('前後相鄰',`前一棵是${pv[0]}（${range((idx+12)%13)}），下一棵是${nx[0]}（${range((idx+1)%13)}）。生日在月初的人更像前一棵，月底更像下一棵。`)}
    ${sec('十三棵樹的日期')}
    <table class="tbl fix nozy-cell" style="font-size:14px">${CT.map((t,i)=>`<tr style="${i===idx?'background:#ffd45a;font-weight:bold':''}"><td>${t[0]}</td><td>${range(i)}</td></tr>`).join('')}</table>
    <p class="small">※ 這是現代版樹木曆，並非古代凱爾特人的原始曆法，僅供娛樂參考。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};
