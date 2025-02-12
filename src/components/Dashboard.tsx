// components/Dashboard.tsx
import React from 'react';

interface File {
  id: number;
  name: string;
}

const files: File[] = [
  { id: 1, name: 'Document1.pdf' },
  { id: 2, name: 'Image1.png' },
  { id: 3, name: 'Report.docx' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Créer un nouveau fichier
        </button>
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.id} className="flex justify-between items-center border-b py-2">
            <span>{file.name}</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
