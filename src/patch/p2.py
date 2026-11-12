p='/home/claude/fortune/src.html'
s=open(p,encoding='utf8').read()
i=s.index("VIEWS.ziwei={");j=s.index("/* 塔羅 */")
new=r"""const ZW_PAL={命宮:'你的本質、性格與一生的基調',兄弟:'手足、同輩與合夥關係',夫妻:'感情與婚姻、另一半的樣子',子女:'子女、晚輩與創作',財帛:'賺錢方式與理財習慣',疾厄:'身體狀況與體質',遷移:'外出、人際與外在機運',僕役:'朋友、同事與部屬',官祿:'事業、工作與成就',田宅:'家庭、不動產與安全感',福德:'精神享受、心態與福氣',父母:'與長輩、上司的緣分'};
const ZW_MU={祿:'化祿：帶來順遂、財源與人緣',權:'化權：增加掌控力與企圖心',科:'化科：帶來名聲、貴人與助力',忌:'化忌：容易糾結、起波折，需要多留心'};
VIEWS.ziwei={t:'紫微斗數.exe',render:()=>`
<div class="center">${wa('紫微斗數','wa7','arch')}</div>
<div class="pane">
<div class="row"><label>西曆生日 <input type="date" id="dt" value="${store.get('birth','2000-01-01')}"></label>
<label>時辰 <select id="hr">${['早子時 00–01','丑時 01–03','寅時 03–05','卯時 05–07','辰時 07–09','巳時 09–11','午時 11–13','未時 13–15','申時 15–17','酉時 17–19','戌時 19–21','亥時 21–23','晚子時 23–24'].map((t,i)=>`<option value="${i}"${i===6?' selected':''}>${t}</option>`).join('')}</select></label>
<label>性別 <select id="sx"><option>女</option><option>男</option></select></label></div>
<p class="small center">使用開源的 iztro 排盤：十四主星、輔星、廟旺、四化、大限與流年；農曆由 lunar-javascript 精確換算。</p>
<div class="center"><button class="btn big" id="go">排盤</button></div></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r);
  $('#go',r).onclick=()=>{
    const dt=$('#dt',r).value;if(!dt)return;
    store.set('birth',dt);
    let a,h;
    try{
      a=IZTRO.astro.bySolar(dt,+$('#hr',r).value,$('#sx',r).value,true,'zh-TW');
      h=a.horoscope(new Date());
    }catch(e){out.innerHTML='<div class="pane center">排盤失敗，請確認日期是否正確。</div>';refresh(out);return}
    const P=a.palaces,byB={};
    P.forEach((p,i)=>byB[BR.indexOf(p.earthlyBranch)]=i);
    const mu=s=>s.mutagen?`<i class="mu">${s.mutagen}</i>`:'';
    const cell=pi=>{
      const p=P[pi],me=p.name==='命宮';
      return`<div class="zc nozy-cell${me?' me':''}">${(me||p.isBodyPalace)?`<span class="mk">${me&&p.isBodyPalace?'命身':me?'命':'身'}</span>`:''}<span class="br">${p.heavenlyStem}${p.earthlyBranch}</span><span class="pn">${p.name}</span>${p.majorStars.map(s=>`<span class="st${['紫微','天府'].includes(s.name)?' k':''}">${s.name}${s.brightness?`<small>${s.brightness}</small>`:''}${mu(s)}</span>`).join('')||'<span class="br">（空宮）</span>'}<span class="ms">${p.minorStars.map(s=>s.name+(s.mutagen?`<i class="mu">${s.mutagen}</i>`:'')).join(' ')}</span><span class="dr">${p.decadal.range[0]}–${p.decadal.range[1]}歲</span></div>`;
    };
    const order=[[5,6,7,8],[4,null,null,9],[3,null,null,10],[2,1,0,11]];
    let grid='';
    order.forEach((row,ri_)=>row.forEach((b,ci)=>{
      if(b===null){if(ri_===1&&ci===1)grid+=`<div class="zmid nozy-cell"><b>${T(a.chineseDate)}</b><span>西曆 ${a.solarDate}</span><span>農曆 ${a.lunarDate}</span><span>${a.time}（${a.timeRange}）・${a.gender}</span><span>${a.zodiac}年生・${a.sign}</span><span><b>${a.fiveElementsClass}</b>・命主${a.soul}・身主${a.body}</span></div>`}
      else grid+=cell(byB[b]);
    }));
    const pal=n=>P.find(p=>p.name===n);
    const mainOf=p=>{if(p.majorStars.length)return{s:p.majorStars,b:false};return{s:P[(P.indexOf(p)+6)%12].majorStars,b:true}};
    const para=(n,k,fmt)=>{
      const o=mainOf(pal(n));const m=o.s[0];
      if(!m||!STAR14[m.name])return'';
      const ex=o.s.length>1?`（同宮還有${o.s.slice(1).map(x=>x.name).join('、')}）`:'';
      return`<p><span class="lbl">${n}</span>${o.b?'空宮，借對宮':''}${fmt(m.name,STAR14[m.name][k])}${ex}</p>`;
    };
    const natal=[];
    P.forEach(p=>[...p.majorStars,...p.minorStars].forEach(s=>{if(s.mutagen)natal.push(`<p><span class="tag${s.mutagen==='忌'?' r':''}">化${s.mutagen}</span><b>${s.name}</b>在${p.name}：${ZW_MU[s.mutagen].split('：')[1]}。</p>`)}));
    const di=h.decadal.index,yi=h.yearly.index;
    const dp=P[di],yp=P[yi];
    out.innerHTML=`<div class="pane"><div class="wa wa2 sm" data-shape="wave">你的命盤</div><div class="zw">${grid}</div>
    ${para('命宮',0,(s,t)=>`${s}坐命，${t}。`)}
    ${para('官祿',1,(s,t)=>`見${s}：${t}。`)}
    ${para('財帛',2,(s,t)=>`見${s}：${t}。`)}
    ${para('夫妻',3,(s,t)=>`見${s}：${t}。`)}
    <div class="wa wa2 sm" data-shape="wave">生年四化</div>${natal.join('')||'<p>沒有四化星。</p>'}
    <div class="wa wa2 sm" data-shape="wave">大限與流年</div>
    <p><span class="lbl">目前大限</span>${dp.decadal.range[0]}–${dp.decadal.range[1]}歲，大限命宮落在<b>${dp.name}</b>（${dp.heavenlyStem}${dp.earthlyBranch}），這十年重心在「${ZW_PAL[dp.name]}」。</p>
    <p><span class="lbl">今年流年</span>${T(h.yearly.heavenlyStem+h.yearly.earthlyBranch)}年，流年命宮落在<b>${yp.name}</b>，今年重心在「${ZW_PAL[yp.name]}」。流年四化：${h.yearly.mutagen.map((m,i)=>'化'+'祿權科忌'[i]+m).join('、')}。</p>
    <p class="small">※ 排盤由開源的 iztro（MIT）提供，採通用派別；星曜解說為簡短白話版，僅供娛樂參考，完整論命仍需專業老師細看。</p></div>`;
    refresh(out);
    out.scrollIntoView({behavior:'smooth',block:'start'});
  };
}};

"""
s=s[:i]+new+s[j:]
# css
old=".zc.me{background:#ffeeb0}"
assert s.count(old)==1
s=s.replace(old,old+"\n.zc .mu{font-style:normal;background:#a00;color:#fff;font-size:11px;padding:0 2px;margin-left:2px}\n.zc .st small{font-size:11px;color:#666;font-weight:normal;margin-left:1px}\n.zc .ms{font-size:12px;color:#335;line-height:1.3;margin-top:2px}\n.zc .dr{font-size:11px;color:#777;margin-top:auto}")
open(p,'w',encoding='utf8').write(s);print('ok')
