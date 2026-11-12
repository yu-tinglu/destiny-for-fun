const L=require('lunar-javascript');const {Solar,Lunar}=L;
const GAN='甲乙丙丁戊己庚辛壬癸',ZHI='子丑寅卯辰巳午未申酉戌亥';
const DG='〇一二三四五六七八九',MN='正二三四五六七八九十冬臘',DN=['','初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
function normalizeDateStr(d){if(d instanceof Date)return[d.getFullYear(),d.getMonth()+1,d.getDate(),d.getHours()];
 const p=String(d).trim().split(/[-\/ :T]/).map(Number);return p}
function pad(n){return(n<10?'0':'')+n}
function solar2lunar(d){const[y,m,dd]=normalizeDateStr(d);const l=Solar.fromYmd(y,m,dd).getLunar();const mo=l.getMonth();
 const o={lunarYear:l.getYear(),lunarMonth:Math.abs(mo),lunarDay:l.getDay(),isLeap:mo<0};
 o.toString=function(full){return String(o.lunarYear).split('').map(c=>DG[+c]).join('')+'年'+(o.isLeap?'閏':'')+MN[o.lunarMonth-1]+'月'+DN[o.lunarDay]};return o}
function lunar2solar(s,leap){const[y,m,d]=normalizeDateStr(s);const so=Lunar.fromYmd(y,leap?-m:m,d).getSolar();
 return{solarYear:so.getYear(),solarMonth:so.getMonth(),solarDay:so.getDay(),toString(){return so.getYear()+'-'+pad(so.getMonth())+'-'+pad(so.getDay())}}}
function gz(s){return[s[0],s[1]]}
function getHeavenlyStemAndEarthlyBranchBySolarDate(d,timeIndex,opt){opt=opt||{};const[y,m,dd]=normalizeDateStr(d);
 const l=Solar.fromYmdHms(y,m,dd,12,0,0).getLunar();
 const yearly=gz(opt.year==='exact'?l.getYearInGanZhiExact():l.getYearInGanZhi());
 let monthly;if(opt.month==='exact')monthly=gz(l.getMonthInGanZhiExact());else{
  const ys=GAN.indexOf(yearly[0]);const lm=Math.abs(l.getMonth());const zi=(lm+1)%12;const stem=((ys%5)*2+2+(lm-1))%10;monthly=[GAN[stem],ZHI[zi]]}
 const daily=gz(l.getDayInGanZhi());const h=(timeIndex||0)%12;
 const hourly=[GAN[((GAN.indexOf(daily[0])%5)*2+h)%10],ZHI[h]];
 return{yearly,monthly,daily,hourly}}
function getSign(d){const[,m,dd]=normalizeDateStr(d);const v=m*100+dd;
 const T=[[120,'capricorn'],[219,'aquarius'],[321,'pisces'],[420,'aries'],[521,'taurus'],[622,'gemini'],[723,'cancer'],[823,'leo'],[923,'virgo'],[1024,'libra'],[1123,'scorpio'],[1222,'sagittarius']];
 for(const[t,k]of T)if(v<t)return k;return'capricorn'}
const ZO=['rat','ox','tiger','rabbit','dragon','snake','horse','sheep','monkey','rooster','dog','pig'];
function getZodiac(z){return ZO[ZHI.indexOf(z)]}
module.exports={normalizeDateStr,solar2lunar,lunar2solar,getHeavenlyStemAndEarthlyBranchBySolarDate,getSign,getZodiac};
