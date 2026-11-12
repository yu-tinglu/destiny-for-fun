/* ===== 共用：出生資料表單 ===== */
const CITY=[['台北',121.56,25.04],['新北',121.46,25.01],['桃園',121.30,24.99],['新竹',120.97,24.80],['台中',120.68,24.14],['彰化',120.54,24.07],['嘉義',120.45,23.48],['台南',120.21,23.00],['高雄',120.30,22.63],['花蓮',121.60,23.98],['台東',121.15,22.76],['香港',114.17,22.32,8],['東京',139.69,35.69,9],['北京',116.40,39.90,8],['新加坡',103.82,1.35,8],['倫敦',-0.13,51.51,0],['紐約',-74.01,40.71,-5],['洛杉磯',-118.24,34.05,-8]];
const birthForm=(needPlace)=>`<div class="pane"><div class="row"><label>西曆生日 <input type="date" id="dt" value="${store.get('birth','2000-01-01')}"></label>
<label>出生時間 <input type="time" id="tm" value="12:00"></label></div>
${needPlace?`<div class="row"><label>出生地 <select id="ct">${CITY.map((c,i)=>`<option value="${i}">${c[0]}</option>`).join('')}</select></label></div><p class="small center">以當地標準時間計算（不處理夏令時間）；不確定出生時間的話，上升星座可能不準。</p>`:''}
<div class="center"><button class="btn big" id="go">開始</button></div></div>`;
function readBirth(r){
  const ds=$('#dt',r).value;if(!ds)return null;store.set('birth',ds);
  const [Y,M,D]=ds.split('-').map(Number),[h,mi]=($('#tm',r)?$('#tm',r).value:'12:00').split(':').map(Number);
  const c=$('#ct',r)?CITY[+$('#ct',r).value]:CITY[0],tz=c[3]===undefined?8:c[3];
  return{Y,M,D,h:h||0,mi:mi||0,lon:c[1],lat:c[2],tz,city:c[0],date:new Date(Date.UTC(Y,M-1,D,h||0,mi||0)-tz*3600000)};
}
const sgn=lon=>Math.floor(mod(lon,360)/30);
const dm=lon=>Math.floor(mod(lon,30))+'°'+String(Math.floor(mod(lon,1)*60)).padStart(2,'0')+'′';

/* ===== 西洋本命星盤 ===== */
const WP=['太陽','月亮','水星','金星','火星','木星','土星','天王星','海王星','冥王星'],WPG=['☉','☽','☿','♀','♂','♃','♄','♅','♆','♇'],WPE=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const WH=['自我與外在形象','金錢與價值觀','學習與溝通','家庭與根源','創造與戀愛','工作與健康','伴侶與合作','深層情感與轉化','遠行與信念','事業與社會地位','朋友與理想','潛意識與獨處'];
const W_SUN=['直接、勇敢，有先行動再說的衝勁','踏實、有耐性，重視安全感與生活品質','好奇、反應快，思緒活潑愛交流','細膩、重感情，很會照顧身邊的人','自信、熱情，渴望被看見與被喜愛','謹慎、重細節，追求把事情做到更好','優雅、重和諧，凡事講求公平與平衡','深沉、專注，有強大的意志與洞察力','樂觀、愛自由，嚮往遠方與真理','務實、有野心，肯長期耕耘達成目標','獨立、有創見，思想前衛不愛被框住','浪漫、富同情心，想像力與感受力很強'];
const W_MOON=['情緒來得快去得也快，需要行動來釋放','需要穩定與舒適，美食與安心的環境能安撫你','需要透過說話與資訊來整理心情','情感深厚，需要家與歸屬感的安全感','需要被肯定與關愛，付出時最有光彩','用整理與幫助他人來安頓情緒，容易自我苛求','需要和諧的關係，害怕衝突與孤單','感受強烈而隱藏，信任需要時間建立','需要自由與新鮮感，樂觀能幫你走出低潮','情緒內斂、不輕易示弱，以責任感穩住自己','需要空間與獨處，習慣用理性看待感受','共感力強、容易吸收他人情緒，需要靜心獨處'];
const W_MER=['想到就說，直率而有說服力','思考慢但穩，一旦決定很難改變','腦筋靈活、學得快，點子很多','憑感覺與記憶思考，說話溫柔帶情緒','表達生動有戲劇性，說話有感染力','邏輯清楚、重細節，擅長分析與整理','講究措辭與公平，善於協調','洞察力強，善於挖掘事情背後的真相','視野寬廣，愛談理念與大方向','務實有條理，說話精簡有重點','思路獨特，常有超前的想法','直覺式思考，富想像力但偶爾不夠具體'];
const W_VEN=['愛得直接熱烈，喜歡主動追求','重感官與穩定，愛得專一長久','喜歡聊得來、有趣的對象，愛要有新鮮感','付出型的愛，重視家庭與安全感','大方浪漫，愛得戲劇化也需要被讚美','低調務實，用行動與細心表達愛','追求優雅與和諧，對美與關係很有品味','愛得深刻專一，占有慾與忠誠並存','嚮往自由與共同成長的伴侶','慢熱、重承諾，愛是長期的責任','重視友誼與心靈連結，愛要有空間','溫柔浪漫、願意犧牲，愛帶著夢幻色彩'];
const W_MAR=['行動力爆表，勇於開創與挑戰','行動慢但持久，一旦投入就不輕易放棄','同時做很多事，反應快、點子多','行動帶著情緒與保護欲，常迂迴前進','帶著自信與魄力，喜歡領導全場','細心有計畫，用效率達成目標','行動前會權衡利弊，不愛正面衝突','意志力強、專注，行動有策略也有爆發力','熱情衝勁十足，愛冒險與追求目標','有毅力與耐力，穩定朝野心前進','以創新與理想驅動，行動有時很出人意料','行動受直覺與感受影響，需要明確的目標'];
const W_ASC=['給人積極、直接的第一印象','給人沉穩、可靠、有品味的第一印象','給人機靈、親切、愛聊天的第一印象','給人溫和、親切、有保護感的第一印象','氣場明亮，給人自信有魅力的第一印象','給人乾淨、謹慎、聰明的第一印象','給人優雅、有禮、好相處的第一印象','給人神祕、有深度、眼神很有力的第一印象','給人開朗、愛自由、樂觀的第一印象','給人穩重、成熟、有責任感的第一印象','給人獨特、疏離又有個性的第一印象','給人溫柔、夢幻、親和的第一印象'];
const W_EL=['火','土','風','水'],W_MO=['開創','固定','變動'];
const W_ASP=[[0,'合相',8,'能量融合、彼此強化'],[60,'六分相',5,'順暢互助、容易發揮'],[90,'四分相',6,'帶來張力與挑戰，也是成長的動力'],[120,'三分相',6,'天賦般的順暢與好運'],[180,'對分相',8,'拉扯與平衡，需要學會兼顧兩邊']];
VIEWS.natal={t:'西洋星盤.exe',render:()=>`
<div class="center">${wa('西洋本命星盤','wa5','arch')}<p>輸入出生日期、時間與地點，算出太陽、月亮、上升與各行星位置。</p></div>${birthForm(true)}<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const b=readBirth(r);if(!b)return;
    const t=ASTRO.MakeTime(b.date);
    const lons=WPE.map(n=>n==='Sun'?ASTRO.SunPosition(t).elon:n==='Moon'?ASTRO.EclipticGeoMoon(t).lon:ASTRO.Ecliptic(ASTRO.GeoVector(n,t,true)).elon).map(x=>mod(x,360));
    const T=t.ut/36525,rad=Math.PI/180,eps=(23.439291-0.0130042*T)*rad;
    const ramc=mod(ASTRO.SiderealTime(t)*15+b.lon,360)*rad,la=b.lat*rad;
    const asc=mod(Math.atan2(Math.cos(ramc),-(Math.sin(ramc)*Math.cos(eps)+Math.tan(la)*Math.sin(eps)))/rad,360);
    const mc=mod(Math.atan2(Math.sin(ramc),Math.cos(ramc)*Math.cos(eps))/rad,360);
    const node=mod(125.04452-1934.136261*T,360);
    const A=sgn(asc),hs=l=>mod(sgn(l)-A,12)+1;
    const S=i=>SIGNS[i][0]+SIGNS[i][1]+'座';
    const rows=lons.map((l,i)=>`<tr><td>${WPG[i]} ${WP[i]}</td><td>${S(sgn(l))} ${dm(l)}</td><td>第${hs(l)}宮</td></tr>`);
    rows.unshift(`<tr><td>⬆ 上升</td><td>${S(A)} ${dm(asc)}</td><td>第1宮</td></tr>`,`<tr><td>MC 天頂</td><td>${S(sgn(mc))} ${dm(mc)}</td><td>—</td></tr>`);
    rows.push(`<tr><td>☊ 北交點</td><td>${S(sgn(node))} ${dm(node)}</td><td>第${hs(node)}宮</td></tr>`);
    // 圖
    const cx=130,cy=130,pr=(l)=>{const a=(180+(l-asc))*rad;return[cx+Math.cos(a),cy-Math.sin(a)]};
    let svg=`<svg viewBox="0 0 260 260" width="100%" style="max-width:340px" class="nozy-cell"><circle cx="130" cy="130" r="122" fill="#fff8e1" stroke="#8b5a2b" stroke-width="3"/><circle cx="130" cy="130" r="92" fill="none" stroke="#8b5a2b"/><circle cx="130" cy="130" r="40" fill="#f6ecc8" stroke="#8b5a2b"/>`;
    for(let i=0;i<12;i++){const a=(180+(i*30-asc))*rad;svg+=`<line x1="${cx+Math.cos(a)*92}" y1="${cy-Math.sin(a)*92}" x2="${cx+Math.cos(a)*122}" y2="${cy-Math.sin(a)*122}" stroke="#8b5a2b"/>`;const m=(180+(i*30+15-asc))*rad;svg+=`<text x="${cx+Math.cos(m)*107}" y="${cy-Math.sin(m)*107+5}" font-size="15" text-anchor="middle" fill="#a00">${SIGNS[i][0]}&#xFE0E;</text>`}
    const ha=(180)*rad;svg+=`<line x1="${cx-40}" y1="${cy}" x2="${cx-92}" y2="${cy}" stroke="#000080" stroke-width="3"/><text x="${cx-96}" y="${cy-4}" font-size="11" text-anchor="end" fill="#000080">ASC</text>`;
    lons.forEach((l,i)=>{const[x,y]=pr(l);const rr=72-(i%3)*10;const a=(180+(l-asc))*rad;svg+=`<text x="${cx+Math.cos(a)*rr}" y="${cy-Math.sin(a)*rr+5}" font-size="16" text-anchor="middle" fill="#000080" font-weight="bold">${WPG[i]}&#xFE0E;</text>`});
    svg+='</svg>';
    // 相位
    const asp=[];
    for(let i=0;i<7;i++)for(let j=i+1;j<7;j++){const d=Math.abs(lons[i]-lons[j]),dd=d>180?360-d:d;for(const a of W_ASP){const o=Math.abs(dd-a[0]);if(o<=a[2]){asp.push([o,`${WP[i]} ${a[1]} ${WP[j]}`,a[3]]);break}}}
    asp.sort((x,y)=>x[0]-y[0]);
    // 元素 / 模式
    const el=[0,0,0,0],mo=[0,0,0];[...lons.slice(0,7),asc].forEach(l=>{el[sgn(l)%4]++;mo[sgn(l)%3]++});
    const eT=['火象多：熱情、行動、愛表現','土象多：務實、穩定、重現實','風象多：理性、愛溝通、想法多','水象多：感性、直覺、重情感'][el.indexOf(Math.max(...el))];
    const mT=['開創多：愛起頭、有行動力','固定多：堅持、專一，也較固執','變動多：彈性、適應力強，容易分心'][mo.indexOf(Math.max(...mo))];
    const para=(i,txt)=>`<p><span class="lbl">${WP[i]}</span>在${S(sgn(lons[i]))}・第${hs(lons[i])}宮：${txt}。重心在「${WH[hs(lons[i])-1]}」。</p>`;
    out.innerHTML=`<div class="pane"><div class="center">${wa(SIGNS[sgn(lons[0])][1]+'・'+SIGNS[sgn(lons[1])][1]+'・'+SIGNS[A][1],'wa2','wave','clamp(30px,9vw,46px)')}<p class="small">太陽・月亮・上升　（${b.city}）</p>${svg}</div>
    <table class="tbl t5 fix nozy-cell" style="font-size:15px">${rows.join('')}</table>
    <div class="wa wa2 sm" data-shape="wave">星盤解讀</div>
    ${para(0,'核心自我'+W_SUN[sgn(lons[0])])}
    ${para(1,W_MOON[sgn(lons[1])])}
    <p><span class="lbl">上升</span>${S(A)}：${W_ASC[A]}，你的人生舞台從「${WH[0]}」開始。</p>
    ${para(2,'思考溝通上，'+W_MER[sgn(lons[2])])}
    ${para(3,'感情與價值觀上，'+W_VEN[sgn(lons[3])])}
    ${para(4,'行動方式上，'+W_MAR[sgn(lons[4])])}
    <p><span class="lbl">木星</span>在第${hs(lons[5])}宮：成長與好運容易出現在「${WH[hs(lons[5])-1]}」。</p>
    <p><span class="lbl">土星</span>在第${hs(lons[6])}宮：長期的功課與成熟，會出現在「${WH[hs(lons[6])-1]}」。</p>
    <p><span class="lbl">北交點</span>在第${hs(node)}宮：靈魂想往「${WH[hs(node)-1]}」的方向成長。</p>
    <div class="wa wa2 sm" data-shape="wave">元素與模式</div><p>${eT}；${mT}。</p>
    <div class="wa wa2 sm" data-shape="wave">主要相位</div>
    ${asp.slice(0,8).map(a=>`<p><b>${a[1]}</b>（誤差 ${a[0].toFixed(1)}°）：${a[2]}。</p>`).join('')||'<p>沒有明顯的相位。</p>'}
    <p class="small">※ 行星位置由開源的 astronomy-engine（MIT）計算；宮位採整宮制，北交點為平均交點；外行星為世代行星，不逐一解讀。解說為簡化白話版，僅供娛樂參考。</p></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 姓名數字學（畢達哥拉斯） ===== */
const PY_V='AEIOU';
const pyv=c=>(c.charCodeAt(0)-65)%9+1;
function pyRed(n){while(n>9&&n!==11&&n!==22&&n!==33)n=sumd(n);return n}
VIEWS.pyth={t:'姓名數字學.exe',render:()=>`
<div class="center">${wa('姓名數字學','wa3','wave')}<p>輸入英文（或護照拼音）姓名，算出天賦、內心渴望與外在形象數字。</p></div>
<div class="pane center"><input type="text" id="nm" maxlength="40" placeholder="例如：Tina Lu"><br><label>生日（選填） <input type="date" id="dt"></label><br><button class="btn big" id="go">算算看</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const nm=$('#nm',r).value.toUpperCase().replace(/[^A-Z]/g,'');
    if(nm.length<2){out.innerHTML='<div class="pane center">請輸入至少兩個英文字母的姓名。</div>';refresh(out);return}
    const all=[...nm],vow=all.filter(c=>PY_V.includes(c)),con=all.filter(c=>!PY_V.includes(c));
    const sm=a=>a.reduce((s,c)=>s+pyv(c),0);
    const ex=pyRed(sm(all)),so=pyRed(sm(vow)),pe=pyRed(sm(con));
    const row=(lbl,n,desc)=>`<p><span class="lbl">${lbl}</span><b style="font-size:24px;color:#a00">${n}</b>　${LN[n][0]}<br>${LN[n][1]}<br><span class="small">${desc}</span></p>`;
    let life='';
    const ds=$('#dt',r).value;
    if(ds){const [Y,M,D]=ds.split('-').map(Number);const lp=pyRed(sumd(Y)+sumd(M)+sumd(D));life=row('生命道路',lp,'由生日算出的人生主軸，可與生命靈數工具對照。')}
    out.innerHTML=`<div class="paper"><div class="center">${wa(nm,'wa1','wave','clamp(30px,10vw,52px)')}</div>
    ${row('天賦數',ex,'全名所有字母，代表你的天賦、才能與人生使命。')}
    ${row('心靈數',so,'全名母音，代表內心真正的渴望與動機。')}
    ${row('人格數',pe,'全名子音，代表別人眼中的你、外在形象。')}${life}
    <p class="small">※ 字母對應採畢達哥拉斯制（A=1…I=9、J=1…），11、22、33 為特殊的大師數字；僅供娛樂參考。</p></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 日本御神籤 ===== */
const OMI=[
['大吉',8,['心願必能成就，放膽去做','緣分美好，真心會被回應','努力有回報，可望突破','出行順利，處處有貴人','精神飽滿，維持作息即可','很快就會找到，也許就在身邊']],
['中吉',18,['願望可成，需要一點耐心','關係穩步加溫，主動一點更好','穩定進步，持續就會見效','平安愉快，細節先準備好','狀況良好，留意飲食','慢慢找就會出現']],
['小吉',14,['小有進展，別心急','平淡中有溫度，多聊聊','穩紮穩打，不要分心','適合近郊小旅行','小心換季與疲勞','靠記憶回推，會在熟悉的地方']],
['吉',24,['順其自然，終會實現','真誠相處，不必勉強','基礎打穩，後勢看漲','行程順遂，出發前確認交通','注意作息，多喝水','先冷靜，再找一次']],
['末吉',14,['要等待時機，莫急','暫緩腳步，先把自己顧好','先補弱項，勿鬆懈','宜保守，留意天氣','別熬夜，多休息','可能要等一陣子']],
['凶',16,['此時不宜強求，調整方向','慎防誤會，凡事說清楚','容易分心，先建立規律','行程要多留彈性','身體在提醒你放慢','不易尋回，下次多留意']],
['大凶',6,['先沉潛累積力量，反而是轉機','暫時放下，避免衝動決定','把基礎檢視一遍，別硬撐','改期為宜，安全第一','務必休息，有不適就就醫','暫時放下，之後再留意']]];
VIEWS.omikuji={t:'御神籤.exe',render:()=>`
<div class="center">${wa('御神籤','wa1','arch')}<p>日本神社的求籤方式：心中默念願望，抽一支籤。</p>
<div class="tube" id="tube">${TUBE}</div><button class="btn big" id="go">抽籤</button></div><div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r),tube=$('#tube',r),go=$('#go',r);
  go.onclick=()=>{
    go.disabled=true;out.innerHTML='';tube.classList.add('shake');
    setTimeout(()=>{
      tube.classList.remove('shake');
      let x=ri(100),lv=OMI[0];for(const o of OMI){if(x<o[1]){lv=o;break}x-=o[1]}
      const A=['願望','戀愛','學業','旅行','健康','失物'],bad=lv[0]==='凶'||lv[0]==='大凶';
      out.innerHTML=`<div class="paper center"><div style="writing-mode:horizontal-tb;font-size:12px;color:#a00">神籤</div>${wa(lv[0],bad?'wa7':'wa4','wave','clamp(70px,24vw,120px)')}
      <div style="text-align:left">${A.map((a,i)=>`<p><span class="lbl">${a}</span>${lv[2][i]}</p>`).join('')}
      <p class="small">${bad?'日本的習俗是把凶籤綁在神社的樹枝或籤架上，象徵把壞運留在那裡。':'吉籤可以帶回家收好當作護身符，或綁在籤架上與神明結緣。'}籤文為自編白話版，僅供娛樂參考。</p></div></div>`;
      refresh(out);go.disabled=false;go.textContent='再抽一支';
    },1400);
  };
}};

/* ===== 九星氣學 ===== */
const KS=[null,
['一白水星',4,'柔軟聰明、善於適應，內心深沉、重視人際，需要多一點主動。'],
['二黑土星',2,'踏實勤勞、愛照顧人，有耐心，也容易為別人操心。'],
['三碧木星',0,'活潑積極、行動力強、反應快，有時比較急躁。'],
['四綠木星',0,'溫和守信、人緣好、重視禮貌，優柔寡斷是需要克服的地方。'],
['五黃土星',2,'存在感強烈，有領導力與毅力，個性鮮明、也不輕易低頭。'],
['六白金星',3,'正直有威嚴、責任感重、重規矩，自尊心也很強。'],
['七赤金星',3,'開朗愛享受、口才好、重感情，花錢比較大方。'],
['八白土星',2,'沉穩有定見，善於累積與守成，固執是需要留意的弱點。'],
['九紫火星',1,'聰明有美感、熱情、直覺佳，情緒起伏比較大。']];
const KP=['中宮：蟄伏與整理的一年，適合沉澱、檢視方向，不宜冒進。','西北（乾宮）：貴人與責任的一年，要承擔更多，也容易得到前輩幫助。','正西（兌宮）：享樂與金錢的一年，人際與社交活絡，留意花費。','東北（艮宮）：變動與轉機的一年，舊事結束、新機會浮現。','正南（離宮）：名聲與才華被看見的一年，適合表現與學習。','正北（坎宮）：辛勞與考驗的一年，需要耐心，多留意健康。','西南（坤宮）：踏實耕耘的一年，適合打基礎、顧家庭。','正東（震宮）：新開始與活力的一年，適合啟動新計畫。','東南（巽宮）：信用與人緣的一年，旅行、洽談與拓展人脈順利。'];
function ksYear(Y,M,D){const l=LUNAR.Solar.fromYmd(Y,M,D).getLunar(),g=l.getYearInGanZhiByLiChun();for(const y of[Y-1,Y,Y+1])if(STEMS[mod(y-4,10)]===g[0]&&BR[mod(y-4,12)]===g[1])return y;return Y}
const ksStar=y=>{let s=sumd(y);while(s>9)s=sumd(s);let n=11-s;if(n>9)n-=9;return n};
VIEWS.kyusei={t:'九星氣學.exe',render:()=>`
<div class="center">${wa('九星氣學','wa6','arch')}<p>日本流傳的九星氣學：依出生年（以立春為界）與月份算出你的本命星與月命星。</p></div>
<div class="pane center"><label>西曆生日 <input type="date" id="dt" value="${store.get('birth','2000-01-01')}"></label><br><button class="btn big" id="go">算本命星</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const ds=$('#dt',r).value;if(!ds)return;store.set('birth',ds);
    const [Y,M,D]=ds.split('-').map(Number),y=ksYear(Y,M,D),star=ksStar(y);
    const l=LUNAR.Solar.fromYmd(Y,M,D).getLunar(),mb=BR.indexOf(l.getMonthInGanZhiExact()[1]),m0=mod(mb-2,12);
    const yb=mod(y-4,12),start=[8,5,2][[0,1,2,1,2,0,2,1,0,2,1,0].indexOf?0:0];
    const grp='子午卯酉'.includes(BR[yb])?8:'辰戌丑未'.includes(BR[yb])?5:2;
    const mstar=mod(grp-1-m0,9)+1;
    const now=new Date(),cy=ksYear(now.getFullYear(),now.getMonth()+1,now.getDate()),cs=ksStar(cy);
    const pos=mod(star-cs,9);
    const K=KS[star],K2=KS[mstar];
    const rel=(a,b)=>{const x=KS[a][1],z=KS[b][1];if(x===z)return'五行相同，容易有共鳴';if(z===(x+1)%5||x===(z+1)%5)return'五行相生，彼此能互相成就';return'五行相剋，需要多磨合'};
    out.innerHTML=`<div class="paper center">${wa(K[0],'wa2','wave','clamp(40px,12vw,66px)')}<p>${y} 年生（以立春為界）</p>
    <div style="text-align:left"><p><span class="lbl">本命星</span><b>${K[0]}</b>（${E5[K[1]]}）：${K[2]}</p>
    <p><span class="lbl">月命星</span><b>${K2[0]}</b>（${E5[K2[1]]}）：代表內在、私下的你。${K2[2]}</p>
    <p><span class="lbl">兩星關係</span>${rel(star,mstar)}。</p>
    <div class="wa wa2 sm" data-shape="wave">今年（${cy} 年）</div>
    <p>今年中宮是${KS[cs][0]}，你的本命星飛到<b>${KP[pos].split('：')[0]}</b>。</p><p>${KP[pos].split('：')[1]}</p>
    <p class="small">※ 九星氣學流派很多，這裡採常見的年盤算法並簡化說明，僅供娛樂參考。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 瑪雅神聖曆 ===== */
const MS=[['Imix','鱷魚・原初之水','滋養、直覺，像大地之母般包容，是起點與源頭的能量。'],['Ik','風','溝通與靈感，自由自在，思想與言語很有力量。'],['Akbal','夜・屋','夢境與內省，需要安全感，擅長在安靜中看見答案。'],['Kan','種子','潛力與成長，善於耕耘，點子會慢慢開花結果。'],['Chicchan','蛇','生命力與本能，熱情旺盛，直覺敏銳。'],['Cimi','轉化・死亡','懂得放下與更新，帶著智慧面對結束與重生。'],['Manik','手・鹿','療癒與實踐，善於動手把想法做出來。'],['Lamat','星','和諧與豐盛，帶著藝術氣質與幸運感。'],['Muluc','水・月','情感與淨化，願意付出，也需要學習釋放。'],['Oc','狗','忠誠與友誼，是可靠的夥伴，也常為人引路。'],['Chuen','猴','創意與玩心，點子多、幽默，把生活當成藝術。'],['Eb','草・道路','服務與人道，腳踏實地走自己的路，有同理心。'],['Ben','蘆葦','領導與探索，意志堅定，總有想去的遠方。'],['Ix','美洲豹','魔力與守護，帶著神祕的氣場與敏銳的感受。'],['Men','老鷹','遠見與視野，站得高看得遠，重視自由。'],['Cib','禿鷲・貓頭鷹','智慧與傳承，洞察力強，重視祖先與經驗。'],['Caban','大地','與大地連結，直覺與同步性強，善於把握時機。'],['Etznab','燧石・鏡子','真理與決斷，直接坦率，像鏡子般照見真實。'],['Cauac','風暴','淨化與轉變，能量強大，經歷風雨後更堅強。'],['Ahau','太陽','光明與領袖，樂觀有魅力，天生帶著溫暖的光。']];
const MT=['開始與目標','對立與選擇','行動與服務','形塑與定義','賦權與核心','平衡與組織','共鳴與調和','和諧與整合','脈動與實現','顯化與完成','釋放與解放','合作與奉獻','超越與圓滿'];
VIEWS.maya={t:'瑪雅神聖曆.exe',render:()=>`
<div class="center">${wa('瑪雅神聖曆','wa4','wave')}<p>瑪雅人使用 260 天的神聖曆（卓爾金曆）：20 個日符號搭配 13 個數字。</p></div>
<div class="pane center"><label>西曆生日 <input type="date" id="dt" value="${store.get('birth','2000-01-01')}"></label><br><button class="btn big" id="go">查我的日符號</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  const kin=(Y,M,D)=>{const d=Math.floor(Date.UTC(Y,M-1,D)/86400000)+2440588-2456283;return{tone:mod(3+d,13)+1,sign:mod(19+d,20)}};
  $('#go',r).onclick=()=>{
    const ds=$('#dt',r).value;if(!ds)return;store.set('birth',ds);
    const [Y,M,D]=ds.split('-').map(Number),k=kin(Y,M,D),s=MS[k.sign],n=new Date(),tk=kin(n.getFullYear(),n.getMonth()+1,n.getDate());
    out.innerHTML=`<div class="paper center">${wa(k.tone+' '+s[0],'wa7','wave','clamp(44px,13vw,72px)')}<div class="grade">${s[1]}</div>
    <div style="text-align:left"><p><span class="lbl">日符號</span>${s[2]}</p>
    <p><span class="lbl">數字 ${k.tone}</span>${MT[k.tone-1]}：這個數字給你的日符號帶來「${MT[k.tone-1].split('與')[0]}」的色彩。</p>
    <p><span class="lbl">今天</span>今天是 ${tk.tone} ${MS[tk.sign][0]}（${MS[tk.sign][1]}），日子的主題是「${MT[tk.tone-1]}」。</p>
    <p class="small">※ 採傳統 GMT 對照（2012/12/21 為 4 Ahau）計算卓爾金曆；解說為簡化白話版，與「夢境咒語曆」的 KIN 系統不同，僅供娛樂參考。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 吠陀月宿 ===== */
const NK=[['Ashwini','馬頭星宿','行動敏捷、善於開創與療癒'],['Bharani','負載星宿','承擔力強、情感強烈、重視生命力'],['Krittika','剪刀・火焰','銳利有批判力，具有淨化與保護的力量'],['Rohini','紅星','有魅力、重享受，富創造力'],['Mrigashira','鹿頭','好奇愛探索，溫柔又愛追尋'],['Ardra','濕潤之星','風暴後的重生，聰明而敏感'],['Punarvasu','回歸之光','樂觀包容，跌倒了也能東山再起'],['Pushya','滋養之星','善良可靠，擅長照顧與教導'],['Ashlesha','擁抱之蛇','洞察力深、有策略，感受複雜細膩'],['Magha','王座','重傳承與尊榮，有領導氣質'],['Purva Phalguni','前紅星','愛享樂與藝術，重視愛與休閒'],['Uttara Phalguni','後紅星','重承諾與友誼，穩定可靠'],['Hasta','手','靈巧，善於手作與解決問題'],['Chitra','明珠','愛美有設計感，創造力豐富'],['Swati','獨立之風','自由靈活，重視獨立與平衡'],['Vishakha','凱旋門','目標堅定，企圖心強'],['Anuradha','友誼之星','忠誠善合作，擅長經營關係'],['Jyeshtha','長者','保護欲強、有威信，肯承擔責任'],['Mula','根','追根究柢，勇於破舊立新'],['Purva Ashadha','前不敗','樂觀自信，說服力強'],['Uttara Ashadha','後不敗','穩健持久，重原則與長遠的勝利'],['Shravana','聆聽之星','善於學習與傾聽，重視知識'],['Dhanishta','鼓','有節奏感，社交與財運活絡，活力充沛'],['Shatabhisha','百醫之星','獨立神祕，擅長療癒與研究'],['Purva Bhadrapada','前雙足','理想熱情，帶有靈性與激進色彩'],['Uttara Bhadrapada','後雙足','沉穩深刻，富同情心與智慧'],['Revati','富足之星','溫柔守護，善於引導，旅途平安']];
VIEWS.vedic={t:'吠陀月宿.exe',render:()=>`
<div class="center">${wa('吠陀月宿','wa5','arch')}<p>印度吠陀占星以「月亮」為核心：看月亮落在 27 星宿的哪一宿（採恆星黃道）。</p></div>${birthForm(true)}<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const b=readBirth(r);if(!b)return;
    const t=ASTRO.MakeTime(b.date),yr=2000+t.ut/365.25;
    const ay=23.853+(yr-2000)*0.013972;
    const mo=mod(ASTRO.EclipticGeoMoon(t).lon-ay,360),su=mod(ASTRO.SunPosition(t).elon-ay,360);
    const w=360/27,ni=Math.floor(mo/w),pada=Math.floor(mod(mo,w)/(w/4))+1,N=NK[ni];
    out.innerHTML=`<div class="paper center">${wa(N[0],'wa3','wave','clamp(30px,9vw,46px)')}<div class="grade">${N[1]}・第 ${pada} 足</div>
    <div style="text-align:left"><p><span class="lbl">月宿特質</span>${N[2]}。</p>
    <p><span class="lbl">月亮星座</span>恆星黃道下，月亮在${SIGNS[sgn(mo)][1]}座（${dm(mo)}）。這是吠陀占星中最重要的星座，代表你的情緒本質。</p>
    <p><span class="lbl">太陽星座</span>恆星黃道下，太陽在${SIGNS[sgn(su)][1]}座，通常比西洋星座「晚一個」，代表你的生命力方向。</p>
    <p class="small">※ 採拉希里（Lahiri）近似歲差 ${ay.toFixed(2)}°，月亮位置由 astronomy-engine（MIT）計算；若月亮在星宿邊界附近，結果可能有差異。解說為簡化版，僅供娛樂參考。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 凱爾特樹木曆 ===== */
const CT=[['樺樹 Birch',[12,24],'開始與更新。你像清晨的第一道光，有開創力與樂觀，也要學習耐心。'],['花楸 Rowan',[1,21],'保護與洞察。你敏銳、有靈感，能看穿表面，適合研究與創作。'],['梣木 Ash',[2,18],'連結與想像。你的思緒廣闊，善於連結不同的事物，也有藝術氣質。'],['赤楊 Alder',[3,18],'勇氣與引導。你有堅定的信念，願意為他人站出來，重視自主。'],['柳樹 Willow',[4,15],'直覺與流動。你感受細膩、情緒豐富，很能適應變化，懂得放下。'],['山楂 Hawthorn',[5,13],'熱情與守護。你充滿生命力，既浪漫也有保護欲，重視真誠。'],['橡樹 Oak',[6,10],'力量與可靠。你堅毅穩重，像大樹般讓人安心，是團體的支柱。'],['冬青 Holly',[7,8],'高貴與挑戰。你勇敢有尊嚴，面對挑戰越挫越勇，內心也很溫暖。'],['榛樹 Hazel',[8,5],'智慧與學習。你好奇心強、聰明有條理，喜歡追求知識與真相。'],['葡萄藤 Vine',[9,2],'豐收與享受。你重視感官與品質，擅長把生活過得精緻，也重視關係。'],['常春藤 Ivy',[9,30],'忠誠與韌性。你執著而堅韌，對朋友與夢想都不離不棄。'],['蘆葦 Reed',[10,28],'探究與沉潛。你擅長觀察與保密，深度思考，對真相有強烈渴望。'],['接骨木 Elder',[11,25],'結束與重生。你有轉化的智慧，能在結束中看見新的開始。']];
VIEWS.celt={t:'凱爾特樹木曆.exe',render:()=>`
<div class="center">${wa('凱爾特樹木曆','wa6','wave')}<p>現代凱爾特占卜把一年分成 13 個樹木月，每個生日都有一棵守護樹。</p></div>
<div class="pane center"><label>生日 <select id="m">${Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1} 月</option>`).join('')}</select> <select id="d">${Array.from({length:31},(_,i)=>`<option value="${i+1}">${i+1} 日</option>`).join('')}</select></label><br><button class="btn big" id="go">找我的守護樹</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  const m0=new Date().getMonth()+1,d0=new Date().getDate();$('#m',r).value=m0;$('#d',r).value=d0;
  $('#go',r).onclick=()=>{
    const v=+$('#m',r).value*100+ +$('#d',r).value;
    let idx=0;CT.forEach((c,i)=>{if(i>0&&v>=c[1][0]*100+c[1][1])idx=i});
    if(v>=1224)idx=0;else if(v<121)idx=0;
    const c=CT[idx];
    out.innerHTML=`<div class="paper center">${wa(c[0].split(' ')[0],'wa4','wave','clamp(50px,16vw,80px)')}<div class="grade">${c[0].split(' ')[1]}</div><p style="text-align:left">${c[2]}</p><p class="small" style="text-align:left">※ 這是現代（羅伯特・格雷夫斯一派）的樹木曆，並非古代凱爾特人的原始曆法，僅供娛樂參考。</p></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};
