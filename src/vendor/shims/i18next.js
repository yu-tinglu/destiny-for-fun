const i18n={language:'zh-TW',resources:{},init(o){this.language=o.lng;this.resources=o.resources},changeLanguage(l){this.language=l},
t(key,opt){const r=this.resources[this.language];let v=r&&r.translation[key];if(v===undefined)return key;if(opt&&typeof v==='string')v=v.replace(/\{\{(\w+)\}\}/g,(m,k)=>opt[k]!==undefined?opt[k]:'');return v}};
module.exports=i18n;module.exports.default=i18n;
