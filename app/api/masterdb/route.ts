import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return NextResponse.json({ ok:false, error:'NEXT_PUBLIC_API_URL 없음' }, { status: 500 });
  const inUrl = new URL(req.url);
  const url = new URL(base);
  inUrl.searchParams.forEach((v,k)=>url.searchParams.set(k,v));
  if(!url.searchParams.get('action')) url.searchParams.set('action','all');
  try {
    const res = await fetch(url.toString(), { cache:'no-store', redirect:'follow' });
    const text = await res.text();
    try { return NextResponse.json(JSON.parse(text)); }
    catch { return NextResponse.json({ ok:false, error:'Apps Script JSON 아님', raw:text.slice(0,1000) }, { status: 502 }); }
  } catch(e:any) { return NextResponse.json({ ok:false, error:String(e?.message || e) }, { status: 500 }); }
}
