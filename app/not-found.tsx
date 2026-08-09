import Link from 'next/link';
export const metadata={robots:{index:false,follow:false}};
export default function NotFound(){return <main className="shell article"><p className="label">404</p><h1>Page not found</h1><p>The page you requested is not part of the current Mistfall Hunter Tools route matrix.</p><Link className="button primary" href="/">Return home</Link></main>}
