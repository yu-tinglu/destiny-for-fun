s=open('src.html',encoding='utf8').read()
a=s.index('/* ===== 共用：出生資料表單 ===== */')
b=s.index('/* ---------- 路由與外框 ---------- */')
code=''.join(open('patch/'+f,encoding='utf8').read()+'\n' for f in ['t2a.js','t2b.js','t2c.js'])
s=s[:a]+code+'\n'+s[b:]
s=s.replace("['celt','🌳','凱爾特樹木曆']]","['celt','🌳','凱爾特樹木曆'],['geo','🏜️','沙占卜'],['moon','🌙','月相月亮']]",1)
# remove stray garbage line
s=s.replace("      const h=(180+(i*30+15-sgn(asc)*30+sgn(asc)*30-asc))*rad}\n","}\n")
open('src.html','w',encoding='utf8').write(s)
