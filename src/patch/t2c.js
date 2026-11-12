/* ===== 沙占卜（阿拉伯／歐洲古典占卜） ===== */
/* [拉丁名, 中文, 線條(火風水土: 1=一點 2=兩點), 關鍵字, 白話說明, 吉凶(2好 1中 0凶)] */
const GEO_F=[
['Via','道路','1111','旅程、改變、移動','事情正在流動，不會停留在原地。適合出發、改變與換環境；想求穩定的事，這張偏不利。',1],
['Populus','人群','2222','群眾、聚集、被動','像一群人聚在一起，沒有明確方向。事情取決於周圍的人與環境；好的更好、壞的更壞。',1],
['Conjunctio','相遇','2112','連結、重逢、合作','兩條線交會，適合談合作、重逢、和解；結果好壞看周圍的牌。',1],
['Puer','少年','1121','衝動、勇敢、競爭','像年輕氣盛的少年，行動快但不夠成熟。適合需要勇氣與行動的事，其他事情要小心衝動。',1],
['Puella','少女','1211','溫柔、美好、和諧','溫和美好的象徵，適合感情、藝術與和平的事；也提醒不要太被動。',2],
['Laetitia','喜悅','1222','開心、向上、快速','喜悅向上的好牌，事情會快速好轉；但來得快也可能去得快，要及時把握。',2],
['Tristitia','悲傷','2221','沉重、穩固、向下','情緒沉重、向下的牌，事情進展緩慢；但適合與土地、房子與祕密相關的事，也提醒你要穩住心情。',0],
['Acquisitio','獲得','2121','收穫、利益、增加','有所獲得的好牌，適合金錢、學業與任何想要得到的事，大多能如願。',2],
['Amissio','失去','1212','損失、放手、流失','有東西會離開你身邊。適合放下與斷捨離，不適合追求、投資與想得到的事。',0],
['Fortuna Major','大吉','2211','成功、穩定、內在力量','強而穩定的好運，靠自己的力量與長久的努力會成功，是最吉的牌之一。',2],
['Fortuna Minor','小吉','1122','幸運、短暫、外來幫助','來自外界的好運，快速但短暫；要趁熱打鐵，別拖延。',2],
['Caput Draconis','龍頭','2111','開始、入口、新機會','事情的好開頭，適合啟動新計畫、新關係、新工作；也適合與土地相關的事。',2],
['Cauda Draconis','龍尾','1112','結束、出口、離開','事情走向結束的牌。適合結束舊事、告別與放下；不適合開始新的事。',0],
['Albus','白色','2212','智慧、冷靜、純潔','平靜清明、需要智慧的牌，適合考試、談判與長期規劃；遇到事情要冷靜思考。',2],
['Rubeus','紅色','2122','激情、衝動、火爆','熱烈而危險的牌，代表強烈情緒、衝突與衝動；任何事都要先冷靜再行動。',0],
['Carcer','牢籠','1221','限制、停滯、束縛','事情被卡住、不自由的牌。適合守成、保密與堅持；不適合期待快速突破。',0]];
const GEO_IDX={};GEO_F.forEach((f,i)=>GEO_IDX[f[2]]=i);
const GEO_Q=['你自己（第一母親）','你的財產與資源（第二母親）','你的溝通與環境（第三母親）','你的家與根源（第四母親）'];
const gfig=k=>GEO_F[GEO_IDX[k]];
const gadd=(a,b)=>[...a].map((x,i)=>((+x)+(+b[i]))%2===1?'1':'2').join('');
function gdraw(k,lbl){return`<div style="display:inline-block;margin:4px;text-align:center;font-size:12px;width:62px"><div class="nozy-cell" style="font-family:monospace;font-size:20px;line-height:1.15;background:#fff8e1;border:2px solid #8b5a2b;padding:3px 0">${[...k].map(c=>c==='1'?'●':'● ●').join('<br>')}</div><div>${lbl}</div><div>${gfig(k)[1]}</div></div>`}
VIEWS.geo={t:'沙占卜.exe',render:()=>`
<div class="center">${wa('沙占卜','wa2','arch')}<p>沙占卜（Geomancy）是中世紀阿拉伯與歐洲流行的占卜：在沙上隨機畫點，得到四個「母圖」，再推出整張盤，最後得到一個「判官」做為答案。</p></div>
<div class="pane center"><input type="text" id="q" maxlength="40" placeholder="心中默念你的問題（可不寫）"><br><button class="btn big" id="go">起盤</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const mom=Array.from({length:4},()=>Array.from({length:4},()=>ri(2)?'1':'2').join(''));
    const dau=[0,1,2,3].map(i=>mom.map(m=>m[i]).join(''));
    const nie=[gadd(mom[0],mom[1]),gadd(mom[2],mom[3]),gadd(dau[0],dau[1]),gadd(dau[2],dau[3])];
    const rw=gadd(nie[0],nie[1]),lw=gadd(nie[2],nie[3]),judge=gadd(rw,lw),rec=gadd(judge,mom[0]);
    const J=gfig(judge),RW=gfig(rw),LW=gfig(lw),R=gfig(rec);
    const rate=['不利','普通','有利'],cnt=[mom,dau,nie].flat().concat([rw,lw]).map(k=>gfig(k)[5]);
    const good=cnt.filter(x=>x===2).length,bad=cnt.filter(x=>x===0).length;
    const q=$('#q',r).value.trim();
    out.innerHTML=`<div class="paper center">${q?`<p class="small">你的問題：「${esc(q)}」</p>`:''}
    <div class="wa wa2 sm" data-shape="wave">你的命盤</div>
    <div>${mom.map((k,i)=>gdraw(k,'母'+(i+1))).join('')}</div><div>${dau.map((k,i)=>gdraw(k,'女'+(i+1))).join('')}</div><div>${nie.map((k,i)=>gdraw(k,'姪'+(i+1))).join('')}</div>
    <div>${gdraw(rw,'右證人')}${gdraw(lw,'左證人')}</div><div>${gdraw(judge,'判官')}${gdraw(rec,'調停者')}</div>
    <div style="text-align:left">
    ${note('<b>怎麼看：</b>最上面 4 個是「母圖」（隨機得到，代表你、你的資源、你的環境、你的根源）；中間是推演出來的「女」與「姪」圖；最後是「判官」，就是這次占卜的總答案。')}
    ${P_('判官（答案）',`<b>${J[1]}（${J[0]}）</b>・${J[3]}。${J[4]}`)}
    ${P_('判官吉凶',`${rate[J[5]]}。${J[5]===2?'是個好兆頭，大方向對你有利。':J[5]===0?'需要多留心，不必悲觀，把它當作提醒。':'結果要看整張盤的氣氛，沒有明顯的好壞。'}`)}
    ${P_('右證人',`<b>${RW[1]}</b>：代表你目前的處境與起因。${RW[3]}。`)}
    ${P_('左證人',`<b>${LW[1]}</b>：代表事情的走向與對方的狀況。${LW[3]}。`)}
    ${P_('調停者',`<b>${R[1]}</b>：${R[3]}，可作為判官的補充看法。`)}
    ${P_('整張盤氣氛',`16 張圖中，有利的有 ${good} 張、不利的有 ${bad} 張：${good>bad+1?'整體偏向順利，可以放心行動':bad>good+1?'整體偏阻礙，建議放慢腳步':'好壞參半，結果取決於你的選擇'}。`)}
    ${P_('母圖提示',mom.map((k,i)=>GEO_Q[i].split('（')[0]+'：'+gfig(k)[1]).join('；')+'。')}
    <p class="small">※ 以隨機方式模擬傳統「擲點」；各圖解說為白話簡化版，僅供娛樂參考。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

/* ===== 月相與月亮星座 ===== */
const MPH=[['新月','🌑','月亮完全看不見。這是「許願與重新開始」的時候，適合訂目標、種下新的想法。'],['眉月','🌒','月亮慢慢變大。適合開始行動，把新月的願望踏出第一步。'],['上弦月','🌓','月亮半圓。會遇到挑戰與選擇，適合克服阻力、做決定。'],['盈凸月','🌔','月亮接近圓滿。適合調整、修正與堅持，成果快出現了。'],['滿月','🌕','月亮最圓最亮。情緒高漲，是「收穫與釋放」的時候，容易激動，也適合慶祝與感謝。'],['虧凸月','🌖','月亮開始變小。適合分享、感恩，把學到的東西傳出去。'],['下弦月','🌗','月亮半圓。適合放下、整理，結束不再需要的事。'],['殘月','🌘','月亮快消失。適合休息、靜心與準備，等下一個新月。']];
const MPB=['天生是開創者，直覺強、有新鮮感，常有新點子','像尚未盛開的花苞，充滿潛力，需要時間發揮','內心常有拉扯，但因此培養出決斷力與行動力','追求完美，重視細節與修正，努力型','情感強烈外放，有魅力，容易成為焦點','樂於分享與教導，重視感恩與回饋','內省、務實，善於整理與放下','溫柔安靜，感受力強，有靈性與直覺'];
const MSG=['月亮在牡羊座：情緒直接、衝動，適合行動與運動，容易沒耐心','月亮在金牛座：情緒穩定，適合享受美食、理財與放鬆','月亮在雙子座：思緒活躍，適合溝通、學習與社交','月亮在巨蟹座：情感敏感，適合待在家、照顧家人','月亮在獅子座：想被看見，適合表現、創作與玩樂','月亮在處女座：注重細節，適合整理、健康管理與工作','月亮在天秤座：重視和諧，適合社交、約會與藝術','月亮在天蠍座：情緒深沉，適合獨處、深度對話與研究','月亮在射手座：想要自由，適合旅行、運動與學習新事物','月亮在魔羯座：務實嚴肅，適合工作、規劃與長期目標','月亮在水瓶座：想法特別，適合團體活動、科技與創新','月亮在雙魚座：直覺與情感豐富，適合冥想、藝術與休息'];
VIEWS.moon={t:'月相月亮.exe',render:()=>`
<div class="center">${wa('月相與月亮','wa3','wave')}<p>查看今天（或任何一天）的月相、月亮所在星座，以及下一次新月與滿月的日期。</p></div>
<div class="pane center"><label>日期 <input type="date" id="dt"></label> <label>你的生日（選填，看出生月相） <input type="date" id="bd" value="${store.get('birth','')}"></label><br><button class="btn big" id="go">看月相</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  const tod=new Date(),pd=n=>String(n).padStart(2,'0');
  $('#dt',r).value=tod.getFullYear()+'-'+pd(tod.getMonth()+1)+'-'+pd(tod.getDate());
  $('#go',r).onclick=()=>{
    const ds=$('#dt',r).value;if(!ds)return;
    const [Y,M,D]=ds.split('-').map(Number),d=new Date(Y,M-1,D,12,0,0);
    const ph=ASTRO.MoonPhase(d),idx=Math.floor(mod(ph+22.5,360)/45),ill=ASTRO.Illumination('Moon',d).phase_fraction,sign=sgn(ASTRO.EclipticGeoMoon(d).lon),age=ph/360*29.53;
    const nm=ASTRO.SearchMoonPhase(0,d,40).date,fm=ASTRO.SearchMoonPhase(180,d,40).date,fq=ASTRO.SearchMoonPhase(90,d,40).date,lq=ASTRO.SearchMoonPhase(270,d,40).date;
    const L=LUNAR.Solar.fromYmd(Y,M,D).getLunar();
    const days=x=>Math.max(0,Math.round((x-d)/86400000));
    let birth='';
    const bd=$('#bd',r).value;
    if(bd){const [y,m,dd]=bd.split('-').map(Number),bp=ASTRO.MoonPhase(new Date(y,m-1,dd,12)),bi=Math.floor(mod(bp+22.5,360)/45);birth=sec('你的出生月相')+P_('出生月相',`${MPH[bi][1]} <b>${MPH[bi][0]}</b>：${MPB[bi]}。`)+P_('出生月亮',`月亮在${SIGNS[sgn(ASTRO.EclipticGeoMoon(new Date(y,m-1,dd,12)).lon)][1]}座（以正午估算，精確結果請用「西洋星盤」）`)}
    out.innerHTML=`<div class="paper center"><div style="font-size:72px" class="nozy-cell">${MPH[idx][1]}</div>${wa(MPH[idx][0],'wa3','wave','clamp(44px,13vw,72px)')}<p>${Y}/${M}/${D}（農曆 ${L.getMonthInChinese()}月${L.getDayInChinese()}）</p>
    <div style="text-align:left">
    ${note('<b>怎麼看：</b>月亮每個月從「新月」到「滿月」再回到「新月」。月相告訴你現在適合「開始、行動」還是「收成、放下」；月亮星座告訴你今天的情緒氛圍。')}
    ${P_('月相',`<b>${MPH[idx][0]}</b>，月亮被照亮 ${(ill*100).toFixed(0)}%，月齡約 ${age.toFixed(1)} 天。`)}
    ${P_('適合做的事',MPH[idx][2])}
    ${P_('月亮星座',MSG[sign])}
    ${sec('接下來的月相')}
    <table class="tbl fix nozy-cell" style="font-size:14px"><tr><th>月相</th><th>日期</th><th>還有</th></tr>
    <tr><td>🌑 新月</td><td>${fdate(nm)}</td><td>${days(nm)} 天</td></tr><tr><td>🌓 上弦月</td><td>${fdate(fq)}</td><td>${days(fq)} 天</td></tr>
    <tr><td>🌕 滿月</td><td>${fdate(fm)}</td><td>${days(fm)} 天</td></tr><tr><td>🌗 下弦月</td><td>${fdate(lq)}</td><td>${days(lq)} 天</td></tr></table>
    ${birth}
    <p class="small">※ 月相與月亮位置由 astronomy-engine（MIT）計算；日期採你裝置的時區；僅供娛樂參考。</p></div></div>`;
    refresh(out);out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};
