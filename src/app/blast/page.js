"use client"; // Required for form interactivity

import { useState } from 'react';

export default function BlastPage() {
  const [sequence, setSequence] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const blastUrl = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=MegaBlast&PROGRAM=blastn&BLAST_SPEC=&PAGE_TYPE=BlastSearch&SHOW_DEFAULTS=on&QUERY=${encodeURIComponent(sequence)}`;
    window.open(blastUrl, '_blank');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">NCBI BLASTn</h1>
      <p className="mb-6 text-gray-600">
        Paste a nucleotide sequence in the box below to search for it using the NCBI BLASTn tool.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter your sequence here..."
          className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm"
        />
        <button
          type="submit"
          className="mt-4 text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        >
          Run BLASTn
        </button>
      </form>
    </div>
  );
}
