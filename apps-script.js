const SPREADSHEET_ID = '1O-v-26uvnmj9B2n1pB98DMl1IV9mB3s-y9w0elcIMqU';
const V6 = {
  dashboard: '00_Dashboard', employees: '직원관리', newEmployee: '신규입사_입력', resign: '퇴사자_입력', leave: '휴무입력', publicHolidays: '공휴일입력', incentiveBase: '인센티브기초값', incentiveOriginal: '기존인센티브현황_원본', manualAdjust: '수기조정', incentiveLog: '인센티브로그', incentiveSummary: '인센티브요약', staffing: '근무인원', health: '보건증현황', manual: '사용방법', homepageLog: '홈페이지로그'
};
function ss(){ return SpreadsheetApp.openById(SPREADSHEET_ID); }
function sheet(name){ return ss().getSheetByName(name); }
function doGet(e){
  const p = (e && e.parameter) || {};
  return out(handle(p.action || 'all', p));
}
function doPost(e){
  try { const body = JSON.parse(e.postData && e.postData.contents || '{}'); return out(handle(body.action || 'all', body)); }
  catch(err){ return out({ok:false,error:String(err && err.message || err)}); }
}
function handle(action, body){
  try{
    if(action === 'ping') return {ok:true, spreadsheet:ss().getName(), version:'v7-real-data-20260704'};
    if(action === 'all' || action === 'summary') return all(body);
    if(action === 'sheet') return {ok:true, rows: table(body.name || V6.employees)};
    if(action === 'saveLeave') return saveLeave(body);
    return all(body);
  }catch(err){ return {ok:false,error:String(err && err.message || err), stack:String(err && err.stack || '')}; }
}
function all(body){
  const s = ss();
  const names = s.getSheets().map(x=>x.getName());
  const employees = table(V6.employees);
  const leave = table(V6.leave);
  const health = table(V6.health);
  const incentives = table(V6.incentiveSummary);
  const staffing = table(V6.staffing);
  return { ok:true, version:'v7-real-data-20260704', spreadsheet:s.getName(), sheets:Object.keys(V6).reduce((a,k)=>{a[k]=names.includes(V6[k]);return a;},{}), employees, leave, holidays:leave, health, incentives, staffing, dashboard: dashboardPairs(), sheetNames:names };
}
function table(sheetName){
  const sh = sheet(sheetName);
  if(!sh) return [];
  const values = sh.getDataRange().getDisplayValues();
  if(!values || !values.length) return [];
  const headerIndex = findHeader(values, sheetName);
  if(headerIndex < 0) return values.filter(r=>r.some(c=>String(c).trim())).map((r,i)=>rowObject(r.map((_,j)=>'col'+(j+1)), r, i+1));
  const headers = normalizeHeaders(values[headerIndex]);
  return values.slice(headerIndex+1).filter(r=>r.some(c=>String(c).trim() !== '')).map((r,i)=>rowObject(headers, r, headerIndex+2+i));
}
function findHeader(values, sheetName){
  const must = sheetName === V6.employees ? ['이름'] : sheetName === V6.leave ? ['이름','날짜'] : sheetName === V6.health ? ['이름'] : ['이름'];
  let best = -1, score = -1;
  for(let i=0;i<Math.min(values.length,15);i++){
    const row = values[i].map(x=>String(x).trim());
    const joined = row.join('|');
    let s = 0;
    ['이름','직원명','현재누적','상태','직급','부서','날짜','구분','보건증','만료','시간','잔여'].forEach(k=>{ if(joined.includes(k)) s++; });
    if(s > score){ score=s; best=i; }
  }
  return score > 0 ? best : 0;
}
function normalizeHeaders(row){
  const used = {};
  return row.map((h,i)=>{
    let key = String(h || '').trim() || ('col'+(i+1));
    if(used[key]) { used[key] += 1; key = key + '_' + used[key]; } else used[key]=1;
    return key;
  });
}
function rowObject(headers, row, rowNumber){
  const o = { _row: rowNumber };
  headers.forEach((h,i)=> o[h] = row[i] || '');
  return o;
}
function dashboardPairs(){
  const sh = sheet(V6.dashboard);
  if(!sh) return [];
  const values = sh.getDataRange().getDisplayValues();
  const out = [];
  values.forEach((r,ri)=>r.forEach((c,ci)=>{ if(String(c).trim()) out.push({row:ri+1,col:ci+1,value:c}); }));
  return out;
}
function saveLeave(body){
  const sh = sheet(V6.leave);
  if(!sh) throw new Error('휴무입력 시트를 찾지 못했습니다.');
  sh.appendRow([body.inputMonth || '', body.date || '', body.name || '', body.type || '휴무', body.memo || '', '홈페이지', new Date()]);
  return {ok:true,message:'휴무 입력 완료'};
}
function out(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
