const fs=require('fs'),path=require('path');
const mods={};const root=path.resolve('lib');
function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(fs.statSync(p).isDirectory())walk(p);else if(/\.(js|json)$/.test(f))mods['/'+path.relative(root,p).replace(/\\/g,'/')]=p}}
walk(root);
const ext={'lunar-lite':'shims/lunar-lite.js','lunar-typescript':'shims/lunar-typescript.js','dayjs':'shims/dayjs.js','i18next':'shims/i18next.js','lunar-javascript':'../sylarlong/../6tail-placeholder'};
let out='(function(){var __M={},__C={};function __r(from,n){if(n==="lunar-javascript")return window.__LUNAR__;if(__X[n])return __X[n]();var b=from.split("/").slice(0,-1);n.split("/").forEach(function(s){if(s==="..")b.pop();else if(s!==".")b.push(s)});var p=b.join("/")||"/";var c=[p,p+".js",p+".json",p+"/index.js"].find(function(k){return __M[k]});if(!c)throw new Error("mod "+p+" from "+from);return __L(c)}function __L(k){if(__C[k])return __C[k].exports;var m=__C[k]={exports:{}};__M[k](m,m.exports,function(n){return __r(k,n)});return m.exports}var __X={};\n';
for(const k in ext){if(k==='lunar-javascript')continue;out+=`__X[${JSON.stringify(k)}]=function(){if(!__X["_${k}"]){var m={exports:{}};(function(module,exports,require){${fs.readFileSync(ext[k],'utf8')}})(m,m.exports,function(n){return n==="lunar-javascript"?window.__LUNAR__:__r("/x",n)});__X["_${k}"]=m.exports}return __X["_${k}"]};\n`}
// fix: __X lookup of cached underscore keys
out=out.replace('if(__X[n])return __X[n]();','if(n!=="lunar-javascript"&&__X[n])return __X[n]();');
for(const k in mods){const src=fs.readFileSync(mods[k],'utf8');out+=`__M[${JSON.stringify(k)}]=function(module,exports,require){${k.endsWith('.json')?'module.exports='+src:src}\n};\n`}
out=out.replace('__M["/version.js"]','__M["package.json"]=function(m){m.exports={version:"2.6"}};\n__M["/version.js"]');out+='window.__IZTRO__=__L("/index.js");})();';
fs.writeFileSync('iztro.bundle.js',out);console.log(out.length);
