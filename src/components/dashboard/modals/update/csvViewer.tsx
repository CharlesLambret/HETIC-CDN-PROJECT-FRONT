import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface CSVViewerProps {
  csvData: string;
  rowsPerPage?: number;
}

const CSVViewer: React.FC<CSVViewerProps> = ({ csvData, rowsPerPage = 10 }) => {
  const [data, setData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    Papa.parse(csvData, {
      complete: (result: Papa.ParseResult<string[]>) => {
        setData(result.data as unknown as string[][]);
      },
      header: false,
    });
  }, [csvData]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {data[0]?.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(data.length / rowsPerPage) - 1}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CSVViewer;