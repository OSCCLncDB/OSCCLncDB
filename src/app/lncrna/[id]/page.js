"use client"; // Required for the 'useState' hook

import { useState, useEffect } from 'react';
import allLncrnas from '../../../../data/lncrna_data.json'; // Adjust path to data

const DetailRow = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">{String(value)}</dd>
        </div>
    );
};

export default function LncRNADetailPage({ params }) {
  const [showSequence, setShowSequence] = useState(false);
  const [lncrna, setLncrna] = useState(null);

  useEffect(() => {
    // Find the matching lncRNA from the imported data
    const found = allLncrnas.find(p => p.id === params.id);
    setLncrna(found);
  }, [params.id]);

  if (!lncrna) {
    return <div>Loading...</div>; // Or a more sophisticated loading state
  }
  
  const blastUrl = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=MegaBlast&PROGRAM=blastn&BLAST_SPEC=&PAGE_TYPE=BlastSearch&SHOW_DEFAULTS=on&QUERY=${encodeURIComponent(lncrna.Sequence || '')}`;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{lncrna.Name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{lncrna.Description}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <DetailRow label="Gene ID" value={lncrna['Gene ID']} />
          <DetailRow label="Ensembl ID" value={lncrna['Ensembl ID']} />
          <DetailRow label="Location" value={lncrna.Location} />
          <DetailRow label="Expression" value={lncrna.Expression} />
          <DetailRow label="Associations" value={lncrna.Associations} />
          <DetailRow label="Role" value={lncrna.Role} />
          <DetailRow label="Target/Effect" value={lncrna['Target/effect']} />
          <DetailRow label="Interactor" value={lncrna.Interactor} />
          <DetailRow label="Reference (DOI)" value={lncrna.DOI} />
          <DetailRow label="Length" value={lncrna.Length} />

          {lncrna.Sequence && (
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Sequence</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <button onClick={() => setShowSequence(!showSequence)} className="text-blue-600 hover:underline">
                  {showSequence ? 'Hide Sequence' : 'Show Sequence'}
                </button>
                {showSequence && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md font-mono text-xs break-all overflow-x-auto">
                    {lncrna.Sequence}
                    <a href={blastUrl} target="_blank" rel="noopener noreferrer" className="block mt-4 text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded w-max">
                      BLASTn this sequence on NCBI
                    </a>
                  </div>
                )}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

