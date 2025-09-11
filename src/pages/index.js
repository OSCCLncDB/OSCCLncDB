import { useState, useMemo } from 'react';
    import Link from 'next/link';
    import fs from 'fs';
    import path from 'path';
    import Layout from '@/components/Layout';
    import Fuse from 'fuse.js';

    export default function Home({ lncrnas }) {
      const [query, setQuery] = useState('');

      const fuse = useMemo(() => {
        const options = {
          keys: ['Name', 'Description', 'Gene ID', 'Ensembl ID'],
          includeScore: true,
          threshold: 0.4,
        };
        return new Fuse(lncrnas, options);
      }, [lncrnas]);

      const results = useMemo(() => {
        if (!query) {
          return lncrnas;
        }
        return fuse.search(query).map(result => result.item);
      }, [query, fuse, lncrnas]);

      return (
        <Layout>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Search for an lncRNA</h2>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, description, Gene ID..."
              className="w-full max-w-lg p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div id="all-lncrna" className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">All lncRNAs Associated with OSCC</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((lncrna) => (
                    <tr key={lncrna.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">
                        <Link href={`/lncrna/${lncrna.id}`}>{lncrna.Name}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{lncrna.Description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      );
    }

    export async function getStaticProps() {
      const filePath = path.join(process.cwd(), 'data', 'lncrna_data.json');
      const jsonData = fs.readFileSync(filePath);
      const data = JSON.parse(jsonData);

      return {
        props: {
          lncrnas: data,
        },
      };
    }
