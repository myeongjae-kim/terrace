import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Workers 런타임에서만 존재하는 request.cf
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cf = (req as any).cf ?? {};
  return NextResponse.json({
    colo: cf.colo,
    country: cf.country,
    city: cf.city,
    ray: req.headers.get('cf-ray'),
  });
}
