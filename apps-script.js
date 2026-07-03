const V6={sheets:{dashboard:'00_Dashboard',employees:'직원관리',newEmployee:'신규입사_입력',retire:'퇴사자_입력',leave:'휴무입력',holiday:'공휴일입력',incentiveBase:'인센티브기초값',incentiveRaw:'기존인센티브현황_원본',manualAdjust:'수기조정',incentiveLog:'인센티브로그',incentiveSummary:'인센티브요약',staffing:'근무인원',health:'보건증현황',homepageLog:'홈페이지로그'}};
function doGet(e){return json(handle((e&&e.parameter&&e.parameter.action)||'all',e&&e.parameter||{}));}
function doPost(e){let b={};try{b=JSON.parse(e.postData.contents||'{}')}catch(err){}return json(handle(b.action||'all',b));}
function json(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
function ss(){return SpreadsheetApp.getActiveSpreadsheet();}
function sh(n){return ss().getSheetByName(n);}
function rows(n){const s=sh(n); if(!s)return []; const v=s.getDataRange().getValues(); if(v.length<1)return []; const h=v[0].map(x=>String(x).trim()); return v.slice(1).filter(r=>r.some(c=>c!==''&&c!==null)).map(r=>Object.fromEntries(h.map((k,i)=>[k,fmt(r[i])])));}
function fmt(v){return Object.prototype.toString.call(v)==='[object Date]'?Utilities.formatDate(v,Session.getScriptTimeZone(),'yyyy-MM-dd'):v;}
function handle(action,b){try{if(action==='all')return all(); if(action==='employees')return {employees:rows(V6.sheets.employees)}; if(action==='saveLeave')return saveLeave(b); if(action==='saveEmployee')return saveEmployee(b); return all();}catch(e){return {error:String(e.message||e)}}}
function all(){return {ok:true,employees:rows(V6.sheets.employees),holidays:rows(V6.sheets.leave).concat(rows(V6.sheets.holiday)),health:rows(V6.sheets.health),incentives:rows(V6.sheets.incentiveSummary).concat(rows(V6.sheets.incentiveLog)),staffing:rows(V6.sheets.staffing),dashboard:dashboard()};}
function dashboard(){const r=rows(V6.sheets.dashboard); const o={}; r.forEach(x=>{const k=Object.values(x)[0]; const v=Object.values(x)[1]; if(k)o[k]=v}); return o;}
function ensure(name,headers){let s=sh(name); if(!s)s=ss().insertSheet(name); if(s.getLastRow()===0)s.appendRow(headers); return s;}
function saveLeave(b){const s=ensure(V6.sheets.leave,['입력월','날짜','이름','구분','메모','입력자','입력시간']); if(!b.name)return {error:'이름을 입력하세요'}; s.appendRow(['',b.date||'',b.name||'',b.type||'휴무',b.memo||'','홈페이지',new Date()]); return {ok:true};}
function saveEmployee(b){const s=ensure(V6.sheets.newEmployee,['입력일','이름','직급','부서','상태','메모']); if(!b.name)return {error:'이름을 입력하세요'}; s.appendRow([new Date(),b.name||'',b.position||'',b.dept||'',b.status||'사용가능','홈페이지 입력']); return {ok:true};}
