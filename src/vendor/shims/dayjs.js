function dayjs(d){const x=d instanceof Date?d:new Date(String(d).replace(/-/g,'/'));return{hour:()=>x.getHours()}}
module.exports=dayjs;module.exports.default=dayjs;
