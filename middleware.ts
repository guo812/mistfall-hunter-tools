import { NextRequest, NextResponse } from 'next/server';

function arrivedOverHttp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-proto');
  const cfVisitor = request.headers.get('cf-visitor');
  if (forwarded) return forwarded === 'http';
  if (cfVisitor) return cfVisitor.includes('"scheme":"http"');
  return request.nextUrl.protocol === 'http:';
}

export function middleware(request: NextRequest) {
  // Keep local previews and any non-canonical host untouched; 11R4 only owns
  // canonical HTTP → HTTPS consolidation for the public apex.
  if (request.nextUrl.hostname !== 'mistfallhunter.co' || !arrivedOverHttp(request)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.protocol = 'https:';
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: '/:path*' };
