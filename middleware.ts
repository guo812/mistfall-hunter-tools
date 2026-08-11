import { NextRequest, NextResponse } from 'next/server';

function arrivedOverHttp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-proto');
  const cfVisitor = request.headers.get('cf-visitor');
  if (forwarded) return forwarded === 'http';
  if (cfVisitor) return cfVisitor.includes('"scheme":"http"');
  return request.nextUrl.protocol === 'http:';
}

export function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname.toLowerCase();
  // Public canonical is the HTTPS apex. Consolidate both www variants in one hop,
  // while keeping local preview hosts untouched.
  if (host === 'www.mistfallhunter.co') {
    const url = request.nextUrl.clone();
    url.hostname = 'mistfallhunter.co';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }
  if (host !== 'mistfallhunter.co' || !arrivedOverHttp(request)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.protocol = 'https:';
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: '/:path*' };
