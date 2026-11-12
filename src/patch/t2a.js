/* ===== 共用：出生資料與地點（可輸入世界各地） ===== */
const CITY=[['台北 Taipei',121.56,25.04,'Asia/Taipei'],['新北 New Taipei',121.46,25.01,'Asia/Taipei'],['桃園 Taoyuan',121.30,24.99,'Asia/Taipei'],['新竹 Hsinchu',120.97,24.80,'Asia/Taipei'],['台中 Taichung',120.68,24.14,'Asia/Taipei'],['彰化 Changhua',120.54,24.07,'Asia/Taipei'],['嘉義 Chiayi',120.45,23.48,'Asia/Taipei'],['台南 Tainan',120.21,23.00,'Asia/Taipei'],['高雄 Kaohsiung',120.30,22.63,'Asia/Taipei'],['屏東 Pingtung',120.49,22.67,'Asia/Taipei'],['宜蘭 Yilan',121.75,24.75,'Asia/Taipei'],['基隆 Keelung',121.74,25.13,'Asia/Taipei'],['花蓮 Hualien',121.60,23.98,'Asia/Taipei'],['台東 Taitung',121.15,22.76,'Asia/Taipei'],['澎湖 Penghu',119.57,23.57,'Asia/Taipei'],['金門 Kinmen',118.32,24.43,'Asia/Taipei'],
['香港 Hong Kong',114.17,22.32,'Asia/Hong_Kong'],['澳門 Macau',113.54,22.20,'Asia/Macau'],['北京 Beijing',116.40,39.90,'Asia/Shanghai'],['上海 Shanghai',121.47,31.23,'Asia/Shanghai'],['廣州 Guangzhou',113.26,23.13,'Asia/Shanghai'],['深圳 Shenzhen',114.06,22.54,'Asia/Shanghai'],['成都 Chengdu',104.07,30.57,'Asia/Shanghai'],['重慶 Chongqing',106.55,29.56,'Asia/Shanghai'],['武漢 Wuhan',114.30,30.59,'Asia/Shanghai'],['西安 Xi\'an',108.94,34.34,'Asia/Shanghai'],
['東京 Tokyo',139.69,35.69,'Asia/Tokyo'],['大阪 Osaka',135.50,34.69,'Asia/Tokyo'],['首爾 Seoul',126.98,37.57,'Asia/Seoul'],['釜山 Busan',129.08,35.18,'Asia/Seoul'],['曼谷 Bangkok',100.50,13.76,'Asia/Bangkok'],['新加坡 Singapore',103.82,1.35,'Asia/Singapore'],['吉隆坡 Kuala Lumpur',101.69,3.14,'Asia/Kuala_Lumpur'],['雅加達 Jakarta',106.85,-6.21,'Asia/Jakarta'],['馬尼拉 Manila',120.98,14.60,'Asia/Manila'],['河內 Hanoi',105.85,21.03,'Asia/Ho_Chi_Minh'],['胡志明市 Ho Chi Minh',106.63,10.82,'Asia/Ho_Chi_Minh'],
['新德里 Delhi',77.21,28.61,'Asia/Kolkata'],['孟買 Mumbai',72.88,19.08,'Asia/Kolkata'],['加爾各答 Kolkata',88.36,22.57,'Asia/Kolkata'],['班加羅爾 Bengaluru',77.59,12.97,'Asia/Kolkata'],['杜拜 Dubai',55.27,25.20,'Asia/Dubai'],['伊斯坦堡 Istanbul',28.98,41.01,'Europe/Istanbul'],['開羅 Cairo',31.24,30.04,'Africa/Cairo'],['約翰尼斯堡 Johannesburg',28.05,-26.20,'Africa/Johannesburg'],
['倫敦 London',-0.13,51.51,'Europe/London'],['巴黎 Paris',2.35,48.86,'Europe/Paris'],['柏林 Berlin',13.40,52.52,'Europe/Berlin'],['馬德里 Madrid',-3.70,40.42,'Europe/Madrid'],['羅馬 Rome',12.50,41.90,'Europe/Rome'],['阿姆斯特丹 Amsterdam',4.90,52.37,'Europe/Amsterdam'],['莫斯科 Moscow',37.62,55.76,'Europe/Moscow'],
['紐約 New York',-74.01,40.71,'America/New_York'],['芝加哥 Chicago',-87.63,41.88,'America/Chicago'],['洛杉磯 Los Angeles',-118.24,34.05,'America/Los_Angeles'],['舊金山 San Francisco',-122.42,37.77,'America/Los_Angeles'],['多倫多 Toronto',-79.38,43.65,'America/Toronto'],['溫哥華 Vancouver',-123.12,49.28,'America/Vancouver'],['墨西哥城 Mexico City',-99.13,19.43,'America/Mexico_City'],['聖保羅 São Paulo',-46.63,-23.55,'America/Sao_Paulo'],['布宜諾斯艾利斯 Buenos Aires',-58.38,-34.60,'America/Argentina/Buenos_Aires'],
['雪梨 Sydney',151.21,-33.87,'Australia/Sydney'],['墨爾本 Melbourne',144.96,-37.81,'Australia/Melbourne'],['奧克蘭 Auckland',174.76,-36.85,'Pacific/Auckland']];
let GEO=[];
function tzOff(tz,ms){
  try{const f=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'}),p={};
    f.formatToParts(new Date(ms)).forEach(x=>p[x.type]=+x.value);
    return (Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-Math.floor(ms/1000)*1000)/60000}catch(e){return null}
}
function localToUtc(Y,M,D,h,mi,tz){
  const g=Date.UTC(Y,M-1,D,h,mi);let o=tzOff(tz,g);if(o===null)return null;
  const u=g-o*60000;o=tzOff(tz,u);return g-o*60000;
}
const birthForm=(needPlace)=>`<div class="pane"><div class="row"><label>西曆生日 <input type="date" id="dt" value="${store.get('birth','2000-01-01')}"></label>
<label>出生時間 <input type="time" id="tm" value="12:00"></label></div>
${needPlace?`<div class="row"><label>出生地（可輸入任何城市）</label></div>
<div class="row"><input type="text" id="cq" placeholder="Taipei / 東京 / Mumbai / São Paulo …" style="width:62%"> <button class="btn" id="cs" type="button">搜尋</button></div>
<div class="row"><select id="ct">${CITY.map((c,i)=>`<option value="c${i}">${c[0]}</option>`).join('')}</select></div>
<p class="small center" id="cmsg">可直接從清單選城市，或輸入城市名稱按「搜尋」（需要網路）；也可以展開下面自己填經緯度。</p>
<details class="small"><summary>自訂座標（找不到城市時使用）</summary><div class="row"><label>經度（東正西負）<input type="number" id="clon" step="0.01" placeholder="121.56"></label><label>緯度（北正南負）<input type="number" id="clat" step="0.01" placeholder="25.04"></label><label>時區（UTC＋幾小時）<input type="number" id="ctz" step="0.25" placeholder="8"></label></div></details>
<p class="small center">時區與夏令時間會依出生當年的實際規則自動換算；不確定出生時間時，上升星座與宮位可能不準，太陽與月亮通常仍可參考。</p>`:''}
<div class="center"><button class="btn big" id="go">開始</button></div></div>`;
function bindPlace(r){
  const q=$('#cq',r);if(!q)return;
  const sel=$('#ct',r),msg=$('#cmsg',r);
  $('#cs',r).onclick=async()=>{
    const v=q.value.trim();if(!v)return;
    msg.textContent='搜尋中…';
    try{
      const res=await fetch('https://geocoding-api.open-meteo.com/v1/search?count=8&format=json&language='+(LANG==='zh-TW'||LANG==='zh-HK'?'zh':'en')+'&name='+encodeURIComponent(v));
      const j=await res.json();
      if(!j.results||!j.results.length){msg.textContent='找不到這個城市，請換個拼法，或使用自訂座標。';return}
      GEO=j.results;
      sel.innerHTML=GEO.map((g,i)=>`<option value="g${i}">${[g.name,g.admin1,g.country].filter(Boolean).join('，')}</option>`).join('')+CITY.map((c,i)=>`<option value="c${i}">${c[0]}</option>`).join('');
      sel.value='g0';msg.textContent='已找到 '+GEO.length+' 個結果，請在下拉選單確認是哪一個。';
    }catch(e){msg.textContent='目前無法連線搜尋，請從清單選城市，或展開「自訂座標」手動輸入。'}
  };
}
function readBirth(r){
  const ds=$('#dt',r).value;if(!ds)return null;store.set('birth',ds);
  const [Y,M,D]=ds.split('-').map(Number),[h,mi]=($('#tm',r)?$('#tm',r).value||'12:00':'12:00').split(':').map(Number);
  let lon=121.56,lat=25.04,tz='Asia/Taipei',name='台北 Taipei',off=null;
  if($('#ct',r)){
    const clon=$('#clon',r).value,clat=$('#clat',r).value;
    if(clon!==''&&clat!==''){lon=+clon;lat=+clat;name='自訂座標 ('+lat+', '+lon+')';tz=null;off=$('#ctz',r).value!==''?+$('#ctz',r).value:Math.round(lon/15)}
    else{const v=$('#ct',r).value;
      if(v[0]==='g'){const g=GEO[+v.slice(1)];lon=g.longitude;lat=g.latitude;tz=g.timezone||null;name=[g.name,g.country].filter(Boolean).join('，');if(!tz)off=Math.round(lon/15)}
      else{const c=CITY[+v.slice(1)];lon=c[1];lat=c[2];tz=c[3];name=c[0]}}
  }
  let ms=tz?localToUtc(Y,M,D,h||0,mi||0,tz):null;
  if(ms===null){if(off===null)off=Math.round(lon/15);ms=Date.UTC(Y,M-1,D,h||0,mi||0)-off*3600000}
  const offUsed=Math.round((Date.UTC(Y,M-1,D,h||0,mi||0)-ms)/60000)/60;
  return{Y,M,D,h:h||0,mi:mi||0,lon,lat,city:name,date:new Date(ms),tzTxt:'UTC'+(offUsed>=0?'+':'')+offUsed};
}
const sgn=lon=>Math.floor(mod(lon,360)/30);
const dm=lon=>Math.floor(mod(lon,30))+'°'+String(Math.floor(mod(lon,1)*60)).padStart(2,'0')+'′';
const fdate=d=>d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
const sec=t=>`<div class="wa wa2 sm" data-shape="wave">${t}</div>`;
const P_=(lbl,txt)=>`<p><span class="lbl">${lbl}</span>${txt}</p>`;
const note=t=>`<p class="small" style="background:#fff3c4;border:1px dashed #a0522d;padding:6px 8px">${t}</p>`;

/* ===== 西洋本命星盤 ===== */
const WP=['太陽','月亮','水星','金星','火星','木星','土星','天王星','海王星','冥王星'],WPG=['☉','☽','☿','♀','♂','♃','♄','♅','♆','♇'],WPE=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const WPK=['核心自我、人生方向','內心感受、安全感','思考與說話方式','愛情、金錢與喜好','行動力與衝勁','幸運、成長與機會','責任、限制與成熟','突破與變革','夢想與靈感','深層轉化與權力'];
const WH=['自我與外在形象','金錢與價值觀','學習與溝通','家庭與根源','創造與戀愛','工作與健康','伴侶與合作','深層情感與轉化','遠行與信念','事業與社會地位','朋友與理想','潛意識與獨處'];
const WHD=['你給人的第一印象、個性與身體','賺錢的方式、擁有的東西與自我價值','兄弟姊妹、學習、日常溝通與短途移動','家人、住所、童年與內心的根','戀愛、玩樂、創作與子女','日常工作、生活習慣與健康','婚姻、合夥與重要的一對一關係','共同資源、親密關係的深度與心理蛻變','出國、高等教育、信仰與人生哲學','事業、名聲與你想成為的樣子','朋友、社群與對未來的理想','潛意識、獨處、療癒與看不見的壓力'];
const KW=['行動與開創','物質與安全感','溝通與資訊','家庭與情感','自我表現與創造','服務與細節','關係與公平','深層轉化與資源','信念與探索','結構與權威','群體與科技','靈性與想像'];
const W_SUN=['直接、勇敢，有先行動再說的衝勁','踏實、有耐性，重視安全感與生活品質','好奇、反應快，思緒活潑愛交流','細膩、重感情，很會照顧身邊的人','自信、熱情，渴望被看見與被喜愛','謹慎、重細節，追求把事情做到更好','優雅、重和諧，凡事講求公平與平衡','深沉、專注，有強大的意志與洞察力','樂觀、愛自由，嚮往遠方與真理','務實、有野心，肯長期耕耘達成目標','獨立、有創見，思想前衛不愛被框住','浪漫、富同情心，想像力與感受力很強'];
const W_MOON=['情緒來得快去得也快，需要透過行動來釋放','需要穩定與舒適，美食與安心的環境能安撫你','需要透過說話與資訊來整理心情','情感深厚，需要家與歸屬感才有安全感','需要被肯定與關愛，付出時最有光彩','用整理與幫助他人來安頓情緒，容易自我苛求','需要和諧的關係，害怕衝突與孤單','感受強烈而隱藏，信任需要時間建立','需要自由與新鮮感，樂觀能幫你走出低潮','情緒內斂、不輕易示弱，以責任感穩住自己','需要空間與獨處，習慣用理性看待感受','共感力強、容易吸收他人情緒，需要靜心獨處'];
const W_MER=['想到就說，直率而有說服力','思考慢但穩，一旦決定很難改變','腦筋靈活、學得快，點子很多','憑感覺與記憶思考，說話溫柔帶情緒','表達生動有戲劇性，說話有感染力','邏輯清楚、重細節，擅長分析與整理','講究措辭與公平，善於協調','洞察力強，善於挖掘事情背後的真相','視野寬廣，愛談理念與大方向','務實有條理，說話精簡有重點','思路獨特，常有超前的想法','直覺式思考，富想像力但偶爾不夠具體'];
const W_VEN=['愛得直接熱烈，喜歡主動追求','重感官與穩定，愛得專一長久','喜歡聊得來、有趣的對象，愛要有新鮮感','付出型的愛，重視家庭與安全感','大方浪漫，愛得戲劇化也需要被讚美','低調務實，用行動與細心表達愛','追求優雅與和諧，對美與關係很有品味','愛得深刻專一，占有慾與忠誠並存','嚮往自由與共同成長的伴侶','慢熱、重承諾，愛是長期的責任','重視友誼與心靈連結，愛要有空間','溫柔浪漫、願意犧牲，愛帶著夢幻色彩'];
const W_MAR=['行動力爆表，勇於開創與挑戰','行動慢但持久，一旦投入就不輕易放棄','同時做很多事，反應快、點子多','行動帶著情緒與保護欲，常迂迴前進','帶著自信與魄力，喜歡領導全場','細心有計畫，用效率達成目標','行動前會權衡利弊，不愛正面衝突','意志力強、專注，行動有策略也有爆發力','熱情衝勁十足，愛冒險與追求目標','有毅力與耐力，穩定朝野心前進','以創新與理想驅動，行動有時很出人意料','行動受直覺與感受影響，需要明確的目標'];
const W_JUP=['好運來自主動出擊與勇氣','好運來自穩定累積，財運與享受','好運來自學習、人脈與資訊','好運來自家庭與情感的支持','好運來自創作、表現與被看見','好運來自勤奮與專業','好運來自合作與公平的關係','好運來自深度投資與轉化','好運來自旅行、進修與信念','好運來自長期努力，事業有成','好運來自朋友、群體與創新','好運來自直覺、靈性與助人'];
const W_SAT=['學習獨立與勇敢，不要事事急躁','學習面對金錢與安全感的焦慮','學習專注與有條理的表達','學習與家人和童年和解','學習自信表現，不怕被評價','學習對自己溫柔，別過度挑剔','學習在關係中負責並維持平衡','學習面對信任與掌控的課題','學習建立自己的信念與視野','學習承擔責任，事業需要耐心累積','學習在群體中找到自己的位置','學習面對不安與放下過度的擔心'];
const W_ASC=['給人積極、直接、有行動力的第一印象','給人沉穩、可靠、有品味的第一印象','給人機靈、親切、愛聊天的第一印象','給人溫和、親切、有保護感的第一印象','氣場明亮，給人自信有魅力的第一印象','給人乾淨、謹慎、聰明的第一印象','給人優雅、有禮、好相處的第一印象','給人神祕、有深度、眼神很有力的第一印象','給人開朗、愛自由、樂觀的第一印象','給人穩重、成熟、有責任感的第一印象','給人獨特、疏離又有個性的第一印象','給人溫柔、夢幻、親和的第一印象'];
const W_ASP=[[0,'合相',8,'兩股能量融在一起，彼此放大'],[60,'六分相',5,'順暢互助，稍微努力就能發揮'],[90,'四分相',6,'互相拉扯，帶來壓力，也是進步的動力'],[120,'三分相',6,'自然流暢，像天賦般的好搭配'],[180,'對分相',8,'兩邊拉鋸，需要學會兩者兼顧']];
const W_EL_T=['火象（牡羊・獅子・射手）','土象（金牛・處女・魔羯）','風象（雙子・天秤・水瓶）','水象（巨蟹・天蠍・雙魚）'];
const W_EL_D=['熱情、行動、愛表現。這類星多的人像一團火，有衝勁也容易急躁','務實、穩定、重現實。這類星多的人腳踏實地，也容易固執保守','理性、愛溝通、想法多。這類星多的人腦筋靈活，也容易想太多','感性、直覺、重情感。這類星多的人體貼敏感，也容易情緒化'];
const W_EL_L=['缺少火：行動力與自信需要刻意培養','缺少土：要留意現實面，如金錢與規律','缺少風：要多練習表達與理性分析','缺少水：要多傾聽內心與照顧情感'];
const W_MO_D=['開創多：喜歡起頭、有行動力，但可能虎頭蛇尾','固定多：堅持、專一，但也比較固執，不易改變','變動多：彈性、適應力強，但容易分心、難以定下來'];
function chartOf(b){
  const t=ASTRO.MakeTime(b.date),t2=ASTRO.MakeTime(new Date(b.date.getTime()+86400000));
  const g=(n,tt)=>n==='Sun'?ASTRO.SunPosition(tt).elon:n==='Moon'?ASTRO.EclipticGeoMoon(tt).lon:ASTRO.Ecliptic(ASTRO.GeoVector(n,tt,true)).elon;
  const lons=WPE.map(n=>mod(g(n,t),360)),l2=WPE.map(n=>mod(g(n,t2),360));
  const retro=lons.map((l,i)=>i>1&&mod(l2[i]-l+180,360)-180<0);
  const T=t.ut/36525,rad=Math.PI/180,eps=(23.439291-0.0130042*T)*rad;
  const ramc=mod(ASTRO.SiderealTime(t)*15+b.lon,360)*rad,la=b.lat*rad;
  const asc=mod(Math.atan2(Math.cos(ramc),-(Math.sin(ramc)*Math.cos(eps)+Math.tan(la)*Math.sin(eps)))/rad,360);
  const mc=mod(Math.atan2(Math.sin(ramc),Math.cos(ramc)*Math.cos(eps))/rad,360);
  const node=mod(125.04452-1934.136261*T,360);
  const yr=2000+t.ut/365.25,ay=23.853+(yr-2000)*0.013972;
  return{t,lons,retro,asc,mc,node,ay};
}
VIEWS.natal={t:'西洋星盤.exe',render:()=>`
<div class="center">${wa('西洋本命星盤','wa5','arch')}<p>輸入出生日期、時間與地點，算出你出生那一刻天上的太陽、月亮與各行星位置。</p></div>${birthForm(true)}<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);bindPlace(r);
  $('#go',r).onclick=()=>{
    const b=readBirth(r);if(!b)return;
    const C=chartOf(b),lons=C.lons,asc=C.asc,mc=C.mc,node=C.node,A=sgn(asc),rad=Math.PI/180;
    const hs=l=>mod(sgn(l)-A,12)+1;
    const S=i=>SIGNS[i][0]+'︎'+SIGNS[i][1]+'座';
    const rows=lons.map((l,i)=>`<tr><td>${WPG[i]} ${WP[i]}</td><td>${S(sgn(l))} ${dm(l)}</td><td>第${hs(l)}宮</td><td>${C.retro[i]?'℞ 逆行':''}</td></tr>`);
    rows.unshift(`<tr><td>⬆ 上升</td><td>${S(A)} ${dm(asc)}</td><td>第1宮</td><td></td></tr>`,`<tr><td>MC 天頂</td><td>${S(sgn(mc))} ${dm(mc)}</td><td>第${hs(mc)}宮</td><td></td></tr>`);
    rows.push(`<tr><td>☊ 北交點</td><td>${S(sgn(node))} ${dm(node)}</td><td>第${hs(node)}宮</td><td>（平均）</td></tr>`);
    const cx=130,cy=130;
    let svg=`<svg viewBox="0 0 260 260" width="100%" style="max-width:340px" class="nozy-cell"><circle cx="130" cy="130" r="122" fill="#fff8e1" stroke="#8b5a2b" stroke-width="3"/><circle cx="130" cy="130" r="92" fill="none" stroke="#8b5a2b"/><circle cx="130" cy="130" r="40" fill="#f6ecc8" stroke="#8b5a2b"/>`;
    for(let i=0;i<12;i++){const a=(180+(i*30-asc))*rad;svg+=`<line x1="${cx+Math.cos(a)*92}" y1="${cy-Math.sin(a)*92}" x2="${cx+Math.cos(a)*122}" y2="${cy-Math.sin(a)*122}" stroke="#8b5a2b"/>`;const m=(180+(i*30+15-asc))*rad;svg+=`<text x="${cx+Math.cos(m)*107}" y="${cy-Math.sin(m)*107+5}" font-size="15" text-anchor="middle" fill="#a00">${SIGNS[i][0]}&#xFE0E;</text>`;
      const h=(180+(i*30+15-sgn(asc)*30+sgn(asc)*30-asc))*rad}
    svg+=`<line x1="${cx-40}" y1="${cy}" x2="${cx-92}" y2="${cy}" stroke="#000080" stroke-width="3"/><text x="${cx-96}" y="${cy-4}" font-size="11" text-anchor="end" fill="#000080">ASC</text>`;
    lons.forEach((l,i)=>{const rr=76-(i%3)*11,a=(180+(l-asc))*rad;svg+=`<text x="${cx+Math.cos(a)*rr}" y="${cy-Math.sin(a)*rr+5}" font-size="16" text-anchor="middle" fill="#000080" font-weight="bold">${WPG[i]}&#xFE0E;</text>`});
    svg+='</svg>';
    /* 相位 */
    const asp=[];
    for(let i=0;i<8;i++)for(let j=i+1;j<8;j++){const d=Math.abs(lons[i]-lons[j]),dd=d>180?360-d:d;for(const a of W_ASP){const o=Math.abs(dd-a[0]);if(o<=a[2]-(i>=5||j>=5?2:0)){asp.push([o,i,j,a]);break}}}
    asp.sort((x,y)=>x[0]-y[0]);
    const el=[0,0,0,0],mo=[0,0,0];[...lons.slice(0,7),asc].forEach(l=>{el[sgn(l)%4]++;mo[sgn(l)%3]++});
    const bar=(n,tot)=>'█'.repeat(n)+'░'.repeat(Math.max(0,tot-n));
    const mx=el.indexOf(Math.max(...el)),mn=el.indexOf(Math.min(...el)),mmx=mo.indexOf(Math.max(...mo));
    const retroTxt=i=>C.retro[i]?'目前處於逆行：這個行星的能量比較往內走，讓你更常回頭檢視、反覆思考，外在表現可能慢半拍。':'';
    const bodies=(h)=>lons.map((l,i)=>hs(l)===h?WP[i]:'').filter(Boolean).concat(hs(node)===h?['北交點']:[]);
    const houseRows=Array.from({length:12},(_,h)=>`<tr><td>第${h+1}宮</td><td>${SIGNS[(A+h)%12][1]}座</td><td style="text-align:left">${WH[h]}${bodies(h+1).length?'<br><b>有：'+bodies(h+1).join('、')+'</b>':''}</td></tr>`).join('');
    const outer=[7,8,9].map(i=>`<p><span class="lbl">${WP[i]}</span>在${S(sgn(lons[i]))}・第${hs(lons[i])}宮：這是世代行星，同年代的人都在${SIGNS[sgn(lons[i])][1]}座；落在你的第${hs(lons[i])}宮，代表這個世代的${WPK[i]}，會特別影響你的「${WH[hs(lons[i])-1]}」。</p>`).join('');
    const astroNote=asp.length?asp.slice(0,10).map(a=>`<p><b>${WP[a[1]]} ${a[3][1]} ${WP[a[2]]}</b>（誤差 ${a[0].toFixed(1)}°）<br>${WP[a[1]]}管「${WPK[a[1]]}」，${WP[a[2]]}管「${WPK[a[2]]}」。${a[3][3]}。</p>`).join(''):'<p>沒有明顯的相位。</p>';
    out.innerHTML=`<div class="pane"><div class="center">${wa(SIGNS[sgn(lons[0])][1]+'・'+SIGNS[sgn(lons[1])][1]+'・'+SIGNS[A][1],'wa2','wave','clamp(30px,9vw,46px)')}<p class="small">太陽星座・月亮星座・上升星座（${b.city}，${b.tzTxt}）</p>${svg}</div>
    ${note('<b>先看這三個就好：</b>太陽星座＝你的核心個性；月亮星座＝你的內心與情緒；上升星座＝別人第一眼看到的你。三個合起來，就是你的「性格組合」。')}
    ${P_('太陽',`${S(sgn(lons[0]))}・第${hs(lons[0])}宮。核心個性：${W_SUN[sgn(lons[0])]}。你的人生舞台集中在「${WH[hs(lons[0])-1]}」（${WHD[hs(lons[0])-1]}）。`)}
    ${P_('月亮',`${S(sgn(lons[1]))}・第${hs(lons[1])}宮。你的內心：${W_MOON[sgn(lons[1])]}。你的安全感容易來自「${WH[hs(lons[1])-1]}」。`)}
    ${P_('上升',`${S(A)}。${W_ASC[A]}。你面對世界的方式，是從「${WH[0]}」出發。`)}
    ${sec('十顆行星詳細解讀')}
    ${P_('水星',`${S(sgn(lons[2]))}・第${hs(lons[2])}宮。思考與說話：${W_MER[sgn(lons[2])]}。這些特質多半展現在「${WH[hs(lons[2])-1]}」。${retroTxt(2)}`)}
    ${P_('金星',`${S(sgn(lons[3]))}・第${hs(lons[3])}宮。愛情與喜好：${W_VEN[sgn(lons[3])]}。你最容易在「${WH[hs(lons[3])-1]}」遇到心動的事。${retroTxt(3)}`)}
    ${P_('火星',`${S(sgn(lons[4]))}・第${hs(lons[4])}宮。行動方式：${W_MAR[sgn(lons[4])]}。你的衝勁常用在「${WH[hs(lons[4])-1]}」。${retroTxt(4)}`)}
    ${P_('木星',`${S(sgn(lons[5]))}・第${hs(lons[5])}宮。幸運與成長：${W_JUP[sgn(lons[5])]}。第${hs(lons[5])}宮的「${WH[hs(lons[5])-1]}」是你最容易得到機會的地方。${retroTxt(5)}`)}
    ${P_('土星',`${S(sgn(lons[6]))}・第${hs(lons[6])}宮。人生功課：${W_SAT[sgn(lons[6])]}。「${WH[hs(lons[6])-1]}」會讓你比較辛苦，但長期努力後也最扎實。${retroTxt(6)}`)}
    ${outer}
    ${P_('北交點',`${S(sgn(node))}・第${hs(node)}宮。靈魂想成長的方向，是「${KW[sgn(node)]}」，並朝「${WH[hs(node)-1]}」發展。`)}
    ${sec('十二宮：人生的十二個領域')}
    <table class="tbl fix nozy-cell" style="font-size:14px"><tr><th>宮位</th><th>星座</th><th>代表／有哪些星</th></tr>${houseRows}</table>
    ${sec('星盤數據')}<table class="tbl fix nozy-cell" style="font-size:14px"><tr><th>星體</th><th>星座・度數</th><th>宮位</th><th>備註</th></tr>${rows.join('')}</table>
    ${sec('元素與模式（性格的配方）')}
    <p class="nozy-cell" style="font-family:monospace">${W_EL_T.map((n,i)=>n.slice(0,2)+' '+bar(el[i],8)+' '+el[i]).join('<br>')}</p>
    <p>${W_EL_D[mx]}。${el[mn]===0?W_EL_L[mn]+'。':''}</p>
    <p>${W_MO_D[mmx]}。</p>
    ${sec('行星之間的互動（相位）')}${astroNote}
    ${note('怎麼讀相位：「合相、三分相、六分相」像兩個行星在合作；「四分相、對分相」像拉扯，會帶來壓力，但也是成長的來源。誤差越小，影響越強。')}
    <p class="small">※ 行星位置由開源的 astronomy-engine（MIT）計算；宮位採整宮制（以上升星座整個星座為第 1 宮）；北交點為平均交點；逆行以出生當天與隔天的位置變化判定。解說為白話簡化版，僅供娛樂參考。</p></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 姓名數字學（畢達哥拉斯） ===== */
const PY_V='AEIOU';
const pyv=c=>(c.charCodeAt(0)-65)%9+1;
function pyRed(n){while(n>9&&n!==11&&n!==22&&n!==33)n=sumd(n);return n}
const lnx=n=>LN[n]||[LN[sumd(n)][0],LN[sumd(n)][1],LN[sumd(n)][2]];
VIEWS.pyth={t:'姓名數字學.exe',render:()=>`
<div class="center">${wa('姓名數字學','wa3','wave')}<p>輸入英文（或護照拼音）姓名，算出天賦、內心渴望與外在形象數字。</p></div>
<div class="pane center"><input type="text" id="nm" maxlength="40" placeholder="例如：Tina Lu"><br><label>生日（選填） <input type="date" id="dt"></label><br><button class="btn big" id="go">算算看</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const raw=$('#nm',r).value.trim(),nm=raw.toUpperCase().replace(/[^A-Z]/g,'');
    if(nm.length<2){out.innerHTML='<div class="pane center">請輸入至少兩個英文字母的姓名。</div>';refresh(out);return}
    const all=[...nm],sm=a=>a.reduce((s,c)=>s+pyv(c),0);
    const vow=all.filter(c=>PY_V.includes(c)),con=all.filter(c=>!PY_V.includes(c));
    const ex=pyRed(sm(all)),so=pyRed(sm(vow)),pe=pyRed(sm(con));
    const words=raw.toUpperCase().split(/\s+/).map(w=>w.replace(/[^A-Z]/g,'')).filter(Boolean);
    const steps=words.map(w=>`<b>${w}</b>：${[...w].map(c=>c+'<sub>'+pyv(c)+'</sub>').join(' + ')} = ${sm([...w])}`).join('<br>');
    const row=(lbl,n,what,how)=>{const L=lnx(n);return`<div style="border-top:1px dashed #a0522d;margin-top:8px;padding-top:6px"><p><span class="lbl">${lbl}</span><b style="font-size:26px;color:#a00">${n}</b>　${n>9&&![11,22,33].includes(n)?'':'（'+L[0]+'）'}</p><p>${what}</p><p>你的特質：${L[1]}</p><p>要留意：${L[2]}</p><p class="small">${how}</p></div>`};
    let life='',lp=0;
    const ds=$('#dt',r).value;
    if(ds){const [Y,M,D]=ds.split('-').map(Number);const m=pyRed(M),d=pyRed(D),y=pyRed(sumd(Y));lp=pyRed(m+d+y);const bn=pyRed(D),cy=new Date().getFullYear(),py=pyRed(pyRed(M)+pyRed(D)+pyRed(sumd(cy)));
      life=row('生命道路',lp,'由生日算出的「人生主軸」，代表你這一生要學習的課題與走的路。',`月 ${M}→${m}、日 ${D}→${d}、年 ${Y}→${y}，相加 ${m+d+y} → ${lp}`)+row('生日數',bn,'你出生的「日」帶來的天賦，是一份隨身的小禮物。',`${D} → ${bn}`)+`<div style="border-top:1px dashed #a0522d;margin-top:8px;padding-top:6px"><p><span class="lbl">${cy} 流年</span><b style="font-size:26px;color:#a00">${py}</b></p><p>${PYT[py>9?sumd(py):py]}</p></div>`}
    const cnt=Array(10).fill(0);all.forEach(c=>cnt[pyv(c)]++);
    const miss=[1,2,3,4,5,6,7,8,9].filter(n=>!cnt[n]),strong=[1,2,3,4,5,6,7,8,9].filter(n=>cnt[n]>=3);
    out.innerHTML=`<div class="paper"><div class="center">${wa(raw.toUpperCase(),'wa1','wave','clamp(26px,8vw,46px)')}</div>
    ${note('<b>怎麼算：</b>A=1、B=2 … I=9，J 再從 1 開始（J=1…R=9、S=1…Z=8）。把全名的字母數字加起來，一直縮成 1～9（11、22、33 是特殊的「大師數字」，不再縮）。')}
    <p class="small nozy-cell">${steps}</p>
    ${row('天賦數',ex,'全名所有字母相加，代表你的天賦、才能與要發揮的方向，也是別人最常看到你的「人生使命」。',`全名總和 ${sm(all)} → ${ex}`)}
    ${row('心靈數',so,'只算母音（A E I O U），代表你內心真正的渴望與動機，自己最清楚、別人未必看得出來。',`母音 ${vow.join('')||'—'} = ${sm(vow)} → ${so}`)}
    ${row('人格數',pe,'只算子音，代表別人眼中的你，也是你給人的第一印象與外在形象。',`子音 ${con.join('')||'—'} = ${sm(con)} → ${pe}`)}
    ${life}
    <div style="border-top:1px dashed #a0522d;margin-top:8px;padding-top:6px"><p><span class="lbl">缺少的數字</span>${miss.length?miss.map(n=>n+'（'+LN[n][0]+'）').join('、')+'：這些是名字裡沒有的能量，也是人生比較需要刻意練習的功課。':'1～9 都有，能量相當完整。'}</p>
    ${strong.length?`<p><span class="lbl">特別強的數字</span>${strong.map(n=>n+'（'+LN[n][0]+'）').join('、')}：出現 3 次以上，這項特質非常突出。</p>`:''}</div>
    <p class="small">※ 字母對應採畢達哥拉斯制；11、22、33 為特殊的大師數字；僅供娛樂參考。</p></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 日本御神籤 ===== */
const OMI=[
['大吉',8,'最好的籤。現在運勢很旺，做什麼都比較順，要把握機會，也別驕傲。',['心願必能成就，放膽去做','緣分美好，真心會被回應','努力有回報，可望突破','出行順利，處處有貴人','精神飽滿，維持作息即可','很快就會找到，也許就在身邊'],['事業有升遷或突破的機會，主動爭取','財運旺，適合投資自己，但別大手大腳','人緣極佳，有貴人相助','今天宜表白、面試、簽約']],
['中吉',18,'很好的籤。大致順利，再加一點努力就會有好結果。',['願望可成，需要一點耐心','關係穩步加溫，主動一點更好','穩定進步，持續就會見效','平安愉快，細節先準備好','狀況良好，留意飲食','慢慢找就會出現'],['工作穩定向上，按步調走','收入穩定，適合存錢','人際融洽，主動聯絡舊友','適合開始新的學習或計畫']],
['小吉',14,'小小的好運。不必期待太大，把握眼前的小幸福。',['小有進展，別心急','平淡中有溫度，多聊聊','穩紮穩打，不要分心','適合近郊小旅行','小心換季與疲勞','靠記憶回推，會在熟悉的地方'],['按部就班，小成績會累積','小有收入，不宜大筆花費','人際平順，多一句關心就加分','做好手邊的事就是最好的運氣']],
['吉',24,'平穩的好運，凡事順著來，不必勉強。',['順其自然，終會實現','真誠相處，不必勉強','基礎打穩，後勢看漲','行程順遂，出發前確認交通','注意作息，多喝水','先冷靜，再找一次'],['沒有大風大浪，把基本功做好','收支平衡，避免衝動消費','遇到小摩擦也能順利化解','適合整理環境與計畫']],
['末吉',14,'運氣還在後面。現在要耐心等待，好事會慢慢來。',['要等待時機，莫急','暫緩腳步，先把自己顧好','先補弱項，勿鬆懈','宜保守，留意天氣','別熬夜，多休息','可能要等一陣子'],['先準備，不要急著出手','守住既有，避免投機','少說多聽，避免口舌','適合休息、充電、等待時機']],
['凶',16,'提醒你要小心的籤。不是壞事，而是要你放慢腳步、多留心。',['此時不宜強求，調整方向','慎防誤會，凡事說清楚','容易分心，先建立規律','行程要多留彈性','身體在提醒你放慢','不易尋回，下次多留意'],['避免大改變，先把現況穩住','注意支出與合約細節','說話前先想三秒，避免誤會','今天宜低調，不宜硬碰硬']],
['大凶',6,'最需要謹慎的籤。但日本人說「凶籤綁起來，壞運就留在神社」，把它當作提醒就好。',['先沉潛累積力量，反而是轉機','暫時放下，避免衝動決定','把基礎檢視一遍，別硬撐','改期為宜，安全第一','務必休息，有不適就就醫','暫時放下，之後再留意'],['暫時不要做重大決定','不借錢、不做高風險投資','遇到衝突先離開現場冷靜','好好休息，等風頭過去']]];
const OCOL=['紅色','橘色','黃色','綠色','藍色','紫色','白色','粉紅色','金色'],ODIR=['東','東南','南','西南','西','西北','北','東北'];
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
      const A=['願望','戀愛','學業','旅行','健康','失物'],A2=['事業','財運','人際','今日提醒'],bad=lv[0]==='凶'||lv[0]==='大凶';
      out.innerHTML=`<div class="paper center"><div style="font-size:12px;color:#a00">神籤</div>${wa(lv[0],bad?'wa7':'wa4','wave','clamp(70px,24vw,120px)')}
      <div style="text-align:left"><p>${lv[2]}</p>${A.map((a,i)=>P_(a,lv[3][i])).join('')}${A2.map((a,i)=>P_(a,lv[4][i])).join('')}
      ${P_('幸運色',pick(OCOL))}${P_('幸運方位',pick(ODIR))}${P_('幸運數字',String(1+ri(9)))}
      ${note(bad?'日本的習俗是把凶籤綁在神社的樹枝或籤架上，象徵把壞運留在那裡，不用帶回家。':'吉籤可以帶回家收好當作護身符，也可以綁在籤架上與神明結緣。')}
      <p class="small">籤文為自編白話版，運勢機率比照神社常見比例（大吉較少、吉與中吉較多），僅供娛樂參考。</p></div></div>`;
      refresh(out);go.disabled=false;go.textContent='再抽一支';
    },1400);
  };
}};
