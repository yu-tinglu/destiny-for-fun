import re
p='/home/claude/fortune/src.html'
s=open(p,encoding='utf8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(old[:60],s.count(old))
    s=s.replace(old,new)

# 1 libs marker + T helper
rep("/*DICT*/\n","/*DICT*/\n/*LIBS*/\n")
rep("const mod=(a,n)=>((a%n)+n)%n;","const mod=(a,n)=>((a%n)+n)%n;\nconst T=s=>String(s).replace(/[\\u3400-\\u9fff]/g,c=>S2T[c]||c);")

# 2 lunarOf
i=s.index("function lunarOf(date){");j=s.index("const lunarText=")
s=s[:i]+"""function lunarOf(date){
  try{
    const l=LUNAR.Solar.fromYmd(date.getFullYear(),date.getMonth()+1,date.getDate()).getLunar();
    const m=l.getMonth();
    return{ok:true,y:l.getYear(),m:Math.abs(m),d:l.getDay(),leap:m<0};
  }catch(e){return{ok:false,y:date.getFullYear(),m:date.getMonth()+1,d:date.getDate(),leap:false}}
}
"""+s[j:]

# 3 bazi()
i=s.index("function bazi(ds,hv){");j=s.index("const STEM_EL=")
s=s[:i]+"""function bazi(ds,hv){ // hv: -1 不知道, 0..11 時辰, 12 晚子時；由 lunar-javascript 精確節氣排盤
  const [Y,M,D]=ds.split('-').map(Number);
  const H=hv<0?12:hv===12?23:hv*2;
  const lunar=LUNAR.Solar.fromYmdHms(Y,M,D,H,hv<0?0:30,0).getLunar();
  const ec=lunar.getEightChar();ec.setSect(1);
  const ix=g=>[STEMS.indexOf(g[0]),BR.indexOf(g[1])];
  return{y:ix(ec.getYear()),m:ix(ec.getMonth()),d:ix(ec.getDay()),h:hv<0?null:ix(ec.getTime()),ec,lunar};
}
"""+s[j:]
rep("""<label>出生時辰 <select id="hr">${HOUR13.map((t,i)=>`<option value="${i-1}"${i===7?' selected':''}>${t}</option>`).join('')}</select></label></div>""",
"""<label>出生時辰 <select id="hr">${HOUR13.map((t,i)=>`<option value="${i-1}"${i===7?' selected':''}>${t}</option>`).join('')}</select></label>
<label>性別 <select id="sx"><option value="1">男</option><option value="0">女</option></select></label></div>""")
rep("以台灣時間計算；年柱以立春為界，月柱以節氣為界。","以台灣時間計算；年柱以立春為界，月柱以節氣（精確到分鐘）為界；性別用來排大運順逆。")
rep("""    const missing=cnt.map((c,i)=>c===0?E5[i]:'').filter(Boolean);""","""    const missing=cnt.map((c,i)=>c===0?E5[i]:'').filter(Boolean);
    const ec=b.ec,hides=[ec.getYearHideGan(),ec.getMonthHideGan(),ec.getDayHideGan(),b.h?ec.getTimeHideGan():[]];
    const male=+$('#sx',r).value===1,yun=ec.getYun(male?1:0),dys=yun.getDaYun(9).slice(1,9);
    const nowY=now.getFullYear();
    const curDy=dys.find(d=>nowY>=d.getStartYear()&&nowY<=d.getEndYear());
    const pj=b.lunar.getPrevJie(),nj=b.lunar.getNextJie();
    const jt=j=>T(j.getName())+'（'+j.getSolar().toYmdHms().slice(0,16)+'）';
    const dyHTML=`<div class="wa wa2 sm" data-shape="wave">大運（每十年一運）</div>
    <p>${male?'男命':'女命'}，約出生後 <b>${yun.getStartYear()}年${yun.getStartMonth()}個月${yun.getStartDay()}天</b>起運。</p>
    <div class="nozy-cell" style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;text-align:center">${dys.map(d=>{const g=d.getGanZhi(),si=STEMS.indexOf(g[0]),on=d===curDy;return`<div style="border:2px outset #ccc;background:${on?'#ffe9a8':'#f4f4f4'};padding:3px"><div style="font-size:12px">${d.getStartAge()}歲起</div><b style="font-size:22px;color:${ECOL[STEM_EL[si]]}">${g}</b><div style="font-size:12px">${shishen(dm,si)}</div><div style="font-size:11px;color:#666">${d.getStartYear()}</div></div>`}).join('')}</div>
    <p class="small">反白為目前所在的大運。</p>
    ${curDy?`<p><span class="lbl">目前大運</span>走「${curDy.getGanZhi()}」運（${curDy.getStartYear()}–${curDy.getEndYear()}），天干對你是「${shishen(dm,STEMS.indexOf(curDy.getGanZhi()[0]))}」：${TENTXT[shishen(dm,STEMS.indexOf(curDy.getGanZhi()[0]))]}</p>`:'<p>目前還在起運之前的童限階段。</p>'}`;""")
rep("""${NAYIN[Math.floor(idx60(p[0],p[1])/2)][0]}</span>`)}</tr></table>""","""${NAYIN[Math.floor(idx60(p[0],p[1])/2)][0]}</span>`)}</tr>
    <tr><th>藏干</th>${cell(0,(p,i)=>`<span style="font-size:16px">${hides[i].join(' ')||'—'}</span>`)}</tr></table>
    <p class="small nozy-cell">月柱依節氣：出生前最近的節是${jt(pj)}，下一個節是${jt(nj)}。</p>""")
rep("""    <div class="wa wa2 sm" data-shape="wave">今年流年</div>""","""    ${dyHTML}
    <div class="wa wa2 sm" data-shape="wave">今年流年</div>""")
rep("※ 這是簡化的八字簡批：只看四柱天干地支本氣，沒有排大運、藏干細項與神煞，旺衰判斷也很簡略。交節前後幾十分鐘內出生者，月柱可能有誤差。僅供娛樂參考。","※ 四柱、藏干與大運由開源的 lunar-javascript 依節氣精確計算；旺衰與喜用神判斷仍是簡化版，沒有細論格局與神煞，僅供娛樂參考。")
open(p,'w',encoding='utf8').write(s)
print('ok')
