/* ===== 塔羅 78 張 + 多種牌陣 ===== */
(function(){
  const SU=[['權杖','🪄','Wands','行動、熱情與事業'],['聖杯','🏆','Cups','情感與人際'],['寶劍','🗡️','Swords','思考、溝通與衝突'],['錢幣','🪙','Pentacles','金錢、工作與現實']];
  const RK=['王牌','二','三','四','五','六','七','八','九','十','侍者','騎士','王后','國王'];
  const RE=['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Page','Knight','Queen','King'];
  const RN=['A','2','3','4','5','6','7','8','9','10','P','Kn','Q','K'];
  const UP=['新的開始與契機','抉擇、平衡與合作','成長、擴展與初步成果','穩定、基礎與適度休整','衝突、挑戰與變動','和諧、分享與逐步好轉','評估、堅持與策略','行動、進展與專注','接近完成、堅韌與獨立','圓滿，或承擔過多的終點','好奇、學習與新的消息','積極追求、行動力十足','成熟內斂、滋養與直覺','掌控、責任與領導力'];
  const RV=['機會延遲或被錯過','猶豫不決、失衡','進展受阻、缺乏配合','停滯、過度保守','衝突緩解或陷入僵持','不平衡、被過去牽絆','疑慮重重、半途而廢','分心、動力不足','焦慮、擔心功虧一簣','負擔沉重、結束被拖延','不成熟、消息延遲','衝動躁進或原地踏步','情緒化、過度控制','專斷、濫用權力'];
  SU.forEach(su=>RK.forEach((rk,i)=>{
    TAROT.push([RN[i],su[0]+rk,RE[i]+(i>=10?' of ':' of ')+su[2],su[1],UP[i]+'，主題落在'+su[3],RV[i]+'，'+su[3]+'方面要多留意']);
  }));
})();
const TSP={
  1:['單張牌（今日指引）',['今日指引']],
  3:['三張牌（過去・現在・未來）',['過去','現在','未來']],
  5:['愛情牌陣（五張）',['你的狀態','對方的狀態','兩人關係現況','需要面對的課題','建議與走向']],
  10:['凱爾特十字（十張）',['現況','挑戰或阻礙','根源','過去','可能的目標','近期未來','你的態度','外在環境','希望與恐懼','最終結果']]
};
VIEWS.tarot={t:'塔羅牌.exe',render:()=>`
<div class="center">${wa('塔羅占卜','wa6','arch')}
<p>專心想著你的問題，選擇牌陣後按下「洗牌抽牌」。全副 78 張牌，包含大阿爾克那與小阿爾克那。</p>
<div class="row" style="flex-direction:column;align-items:flex-start;display:inline-flex;text-align:left">${Object.keys(TSP).map((k,i)=>`<label><input type="radio" name="m" value="${k}"${i===0?' checked':''}> ${TSP[k][0]}</label>`).join('')}</div><br>
<button class="btn big" id="go">洗牌抽牌</button></div>
<div id="out"></div>${backBtn}`,
mount(r){
  const out=$('#out',r),go=$('#go',r);
  go.onclick=()=>{
    const n=+$('input[name=m]:checked',r).value,names=TSP[n][1];
    const deck=TAROT.map((c,i)=>i);
    for(let i=deck.length-1;i>0;i--){const j=ri(i+1);[deck[i],deck[j]]=[deck[j],deck[i]]}
    const hand=deck.slice(0,n).map(i=>({c:TAROT[i],i,rev:Math.random()<.3}));
    const major=hand.filter(h=>h.i<22).length;
    const sc=[0,0,0,0];hand.forEach(h=>{if(h.i>=22)sc[Math.floor((h.i-22)/14)]++});
    const top=sc.indexOf(Math.max(...sc));
    const SUM=['權杖：這件事的重點在「行動與事業」','聖杯：這件事的重點在「情感與人際」','寶劍：這件事的重點在「思考與溝通」','錢幣：這件事的重點在「金錢與現實」'];
    const overall=n<3?'':`<p><span class="lbl">整體</span>${major>=Math.ceil(n/2)?`大阿爾克那有 ${major} 張，表示這是影響較深遠的人生課題。`:`大阿爾克那只有 ${major} 張，多半是日常層面、可以靠行動調整的事。`}${Math.max(...sc)>=2?SUM[top]+'。':''}${hand.filter(h=>h.rev).length>n/2?'逆位偏多，提醒你先整理內心與步調再行動。':''}</p>`;
    out.innerHTML=`<div class="cards">${hand.map(h=>`<div class="card"><div class="in"><div class="b nozy-cell">✦</div><div class="f nozy-cell${h.rev?' rev':''}"><div class="c"><div class="no">${h.c[0]}</div><div class="sy">${h.c[3]}</div><div class="nm">${h.c[1]}</div><div class="en">${h.c[2]}</div></div></div></div></div>`).join('')}</div>
    <div class="pane" id="rd" style="visibility:hidden">${hand.map((h,i)=>`<p><span class="pos">【${names[i]}】${h.c[1]}・${h.rev?'逆位':'正位'}</span><br>${h.rev?h.c[5]:h.c[4]}。</p>`).join('')}${overall}<p class="small">牌義僅為象徵性的提示，小阿爾克那的牌義為依牌序與花色整理的簡要版，真正的答案還是在你自己心裡。</p></div>`;
    refresh(out);
    go.disabled=true;
    $$('.card',out).forEach((el,i)=>setTimeout(()=>el.classList.add('flip'),500+i*450));
    setTimeout(()=>{$('#rd',out).style.visibility='visible';go.disabled=false;go.textContent='重新抽牌'},500+n*450+700);
  };
}};
