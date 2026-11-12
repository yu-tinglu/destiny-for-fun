s=open('src.html',encoding='utf8').read()
def rep(a,b,c=1):
    global s
    assert a in s,a[:60]
    s=s.replace(a,b,c)
i18n=open('patch/i18n.js',encoding='utf8').read()
# 1 i18n after store
k=s.index('const store=');e=s.index('\n',k)
s=s[:e+1]+i18n+'\n'+s[e+1:]
# 2 refresh hook + wa
rep("function refresh(el){annotate(el);waveify(el)}","function refresh(el){i18nNodes(el);annotate(el);waveify(el)}")
rep("const wa=(t,cls,shape,size)=>`<div class=\"wa ${cls}\" data-shape=\"${shape}\" style=\"font-size:${size||'clamp(40px,12vw,66px)'}\">${t}</div>`;",
"const wa=(t,cls,shape,size)=>{const t2=TR(t),sz=size||'clamp(40px,12vw,66px)';return `<div class=\"wa ${cls}\" data-shape=\"${shape}\" style=\"font-size:${t2!==t?'calc('+sz+' * .62)':sz}\">${t2}</div>`};")
# 3 home
rep("${wa('東西方占卜大全','wa2','wave','clamp(24px,7vw,40px)')}\n","")
rep("LIST.map(l=>`<a class=\"ico\" data-go=\"${l[0]}\" tabindex=\"0\"><span class=\"e\">${l[1]}</span><span class=\"l\">${l[2]}</span></a>`)","LIST.map(l=>`<a class=\"ico\" data-go=\"${l[0]}\" tabindex=\"0\"><span class=\"e\">${l[1]}</span><span class=\"l\">${TR(l[2])}</span></a>`)")
# 4 HTML chrome
rep('<div id="app"></div>','''<div id="topbar" class="nozy-cell"><span id="sitename">神機妙算占卜館</span><span class="sp2"></span><button class="lbtn" id="langbtn" aria-haspopup="true">🌐 <span id="langname">繁體中文</span> ▾</button><div id="langmenu"></div></div>
<div id="app"></div>
<div id="desk" class="nozy-cell" hidden><a class="ico" data-go="home" tabindex="0"><span class="e">🔮</span><span class="l" id="deskl">神機妙算占卜館</span></a></div>
<div id="copy" class="nozy-cell">© 2026 <b id="auth">庭庭與胖胖</b> ・ All rights reserved.</div>
<div id="langmodal" class="nozy-cell" hidden><div class="lm"><div class="lmt">🌐 選擇語言 / Choose language</div><div id="lmgrid"></div></div></div>''')
rep('<div class="sp" id="cur">神機妙算占卜館</div>','<button class="sp" id="cur" title="還原視窗">神機妙算占卜館</button>')
# 5 CSS
rep('/* taskbar */','''/* topbar / lang / desk */
#topbar{position:sticky;top:0;z-index:25;height:38px;background:linear-gradient(90deg,#000080,#1084d0);color:#fff;display:flex;align-items:center;gap:8px;padding:0 8px;font-weight:bold;font-size:18px;border-bottom:2px solid #000}
#topbar .sp2{flex:1}
.lbtn{font:inherit;font-size:16px;background:var(--face);color:#000;border:2px solid;border-color:var(--hi) var(--lo) var(--lo) var(--hi);padding:1px 10px;cursor:pointer}
#langmenu{position:absolute;right:6px;top:36px;background:var(--face);border:2px solid;border-color:var(--hi) var(--lo) var(--lo) var(--hi);box-shadow:3px 3px 0 rgba(0,0,0,.4);display:none;max-height:70vh;overflow:auto;min-width:190px}
#langmenu.on{display:block}
#langmenu a,#lmgrid a{display:block;padding:7px 12px;color:#000;text-decoration:none;cursor:pointer;font-size:19px;font-family:Arial,"Noto Sans",sans-serif}
#langmenu a:hover,#lmgrid a:hover{background:#000080;color:#fff}
#langmenu a.cur::before{content:"✔ "}
#langmodal{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:60;display:flex;align-items:center;justify-content:center;padding:14px}
#langmodal[hidden]{display:none}
.lm{background:var(--face);border:2px solid;border-color:var(--hi) var(--lo) var(--lo) var(--hi);box-shadow:4px 4px 0 #000;max-width:420px;width:100%;max-height:90vh;overflow:auto}
.lmt{background:linear-gradient(90deg,#000080,#1084d0);color:#fff;font-weight:bold;padding:6px 10px;font-size:19px;font-family:Arial,"Noto Sans TC",sans-serif}
#lmgrid{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:10px}
#lmgrid a{border:2px solid;border-color:var(--hi) var(--lo) var(--lo) var(--hi);text-align:center;background:var(--face)}
#desk{max-width:780px;margin:16px auto;padding:8px;display:flex;justify-content:flex-start}
#desk[hidden]{display:none}
#desk .ico{width:120px;color:#fff;text-shadow:1px 1px 0 #000}
#copy{text-align:center;color:#fff;font-size:15px;padding:6px 8px 62px;text-shadow:1px 1px 0 #000;font-family:Arial,"Noto Sans TC",sans-serif}
.win.max{position:fixed;left:0;right:0;top:38px;bottom:46px;max-width:none;margin:0;overflow:auto;z-index:15}
.win.min{display:none}
.tbtn{cursor:pointer}
#bar .sp{font:inherit;font-size:17px;justify-content:flex-start;cursor:pointer;color:#000;background:var(--face);border:2px solid;border-color:var(--hi) var(--lo) var(--lo) var(--hi)}
#bar .sp.on{border-color:var(--lo) var(--hi) var(--hi) var(--lo);background:repeating-conic-gradient(#c0c0c0 0 25%,#fff 0 50%) 0 0/4px 4px}
#bar .sp[hidden]{display:none}
/* taskbar */''')
# 6 window buttons
rep('<span class="tbtn">_</span><span class="tbtn">□</span><a class="tbtn" data-go="home" tabindex="0" title="關閉">✕</a>','<a class="tbtn" data-act="min" tabindex="0" title="縮小">_</a><a class="tbtn" data-act="max" tabindex="0" title="放大">□</a><a class="tbtn" data-act="close" tabindex="0" title="關閉">✕</a>')
rep('<span class="ttl nozy-cell">${v.t}</span>','<span class="ttl nozy-cell">${TR(v.t.replace(".exe",""))}.exe</span>')
rep("  $('#cur').textContent=v.t.replace('.exe','');","  winState='normal';applyWin();")
open('src.html','w',encoding='utf8').write(s)
