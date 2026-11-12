import re
s=open('src.html',encoding='utf8').read()
a=s.index('/* 塔羅 */'); b=s.index('/* 星座 */')
tarot=open('patch/tarot.js',encoding='utf8').read()
tools=open('patch/tools.js',encoding='utf8').read()
tools=re.sub(r"const yb=mod\(y-4,12\),start=\[.*?\];","const yb=mod(y-4,12);",tools)
s=s[:a]+tarot+'\n\n'+s[b:]
m=s.index('/* ---------- 路由與外框 ---------- */')
s=s[:m]+tools+'\n\n'+s[m:]
new=[('natal','🪐','西洋星盤'),('pyth','🔤','姓名數字學'),('omikuji','⛩️','日本御神籤'),('kyusei','🧭','九星氣學'),('maya','🗿','瑪雅神聖曆'),('vedic','🪔','吠陀月宿'),('celt','🌳','凱爾特樹木曆')]
add=''.join(",['%s','%s','%s']"%x for x in new)
s=s.replace("['palm','🖐️','手相說明']]","['palm','🖐️','手相說明']"+add+"]",1)
open('src.html','w',encoding='utf8').write(s)
