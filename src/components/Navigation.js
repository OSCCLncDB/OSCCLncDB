import Link from 'next/link';

    export default function Navigation() {
      return (
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 h-12">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
              <Link href="/#all-lncrna" className="hover:bg-gray-700 px-3 py-2 rounded-md">All lncRNAs</Link>
              <Link href="/blast" className="hover:bg-gray-700 px-3 py-2 rounded-md">BLAST</Link>
            </div>
          </div>
        </nav>
      );
    }
