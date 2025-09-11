import Image from 'next/image';
    import Link from 'next/link';

    export default function Header() {
      return (
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Link href="/">
                  <Image src="/images/CMB-logo.jpg" alt="CMB Logo" width={100} height={100} />
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">
                <Link href="/">OSCClncDB</Link>
              </h1>
              <Link href="/">
                  <Image src="/images/CUJ-Logo.jpg" alt="CUJ Logo" width={100} height={100} />
              </Link>
            </div>
          </div>
        </header>
      );
    }
