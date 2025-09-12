'use client'; // This directive is necessary for using hooks like useState

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import lncrnas from '../../data/lncrna_data.json';

// Welcome Message Component
const WelcomeMessage = () => (
  <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to OSCClncDB</h2>
    <p className="text-gray-700 mb-4">
      Your comprehensive resource for exploring long non-coding RNAs (lncRNAs) linked to Oral Squamous Cell Carcinoma (OSCC). We built this database to serve everyone from seasoned researchers to students and clinicians, creating one central place to find reliable information on lncRNAs in oral cancer.
    </p>
    <p className="text-gray-700 mb-4">
  Inside, you&apos;ll find carefully organized data for each lncRNA, making it easy to look up key details such as:
</p>
    <ul className="list-disc list-inside text-gray-700 mb-4 pl-4">
      <li>Official Gene and Ensembl IDs</li>
      <li>Its location on the chromosome and full sequence</li>
      <li>Known connections to clinical outcomes and its biological role</li>
      <li>What it targets, its effects, and molecules it interacts with</li>
      <li>Links to the original research papers</li>
    </ul>
    <p className="text-gray-700 mb-6">
      Our goal is to support the scientific community by making complex data accessible. By providing this tool, we hope to help speed up research and ultimately contribute to new strategies in the fight against oral cancer.
    </p>
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="font-semibold text-lg text-gray-800 mb-2">How to Cite</h3>
      <p className="text-gray-600 mb-2">
        If you use OSCClncDB in your research, please cite us. This helps support the continued development and maintenance of this resource.
      </p>
      <blockquote className="text-sm text-gray-800 bg-gray-200 p-3 rounded">
        Manish Kumar Mishra, Shelly Sehgal, 2025. OSCClncDB: A comprehensive database of long non-coding RNAs in Oral Squamous Cell Carcinoma. Retrieved from www.oscclncdb.in.
      </blockquote>
    </div>
  </div>
);

export default function Home() {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => {
    const options = {
      keys: ['Name', 'Description', 'Gene ID', 'Ensembl ID'],
      includeScore: true,
      threshold: 0.4,
    };
    return new Fuse(lncrnas, options);
  }, []);

  const results = useMemo(() => {
    if (!query) {
      return lncrnas;
    }
    return fuse.search(query).map(result => result.item);
  }, [query, fuse]);

  return (
    <>
      {/* Welcome Message Card */}
      <WelcomeMessage />

      {/* Search and Table Section */}
      <div id="all-lncrna" className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Search for an lncRNA</h2>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Name, Description, Gene ID..."
              className="w-full max-w-2xl mx-auto block p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
        </div>

        <h2 className="text-2xl font-bold mb-4">All lncRNAs Associated with OSCC</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gene ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expression</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((lncrna) => (
                <tr key={lncrna.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">
                    <Link href={`/lncrna/${lncrna.id}`}>{lncrna.Name || 'N/A'}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{lncrna.Description || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lncrna['Gene ID'] || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lncrna.Expression || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{lncrna.Role || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
