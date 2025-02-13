import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/api/AuthContext';
import DownloadSVG from './SVG/Download';

interface FileModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileId: string;
  uploaderId: string;
}

const FileModal: React.FC<FileModalProps> = ({ isOpen, onClose, fileId, uploaderId }) => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);
  const auth = useContext(AuthContext);

  const fetchFile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/serve-file?id=${fileId}&uploaderID=${uploaderId}`);
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType?.startsWith('image/')) {
          const blob = await response.blob();
          setFileContent(URL.createObjectURL(blob));
          setIsImage(true);
        } else {
          const content = await response.text();
          setFileContent(content);
          setIsImage(false);
        }
      } else {
        console.error('Failed to fetch file');
      }
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_API_URL}/serve-file?id=${fileId}&uploaderID=${uploaderId}`;
    link.download = fileId;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (isOpen) {
      fetchFile();
    }
  }, [isOpen, fileId, uploaderId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white w-2/3 p-6 rounded shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Fichier </h2>
        <div className="w-1/2 flex justify-start items-center">
            <DownloadSVG onClick={downloadFile} className="text-blue-500 w-1/6 cursor-pointer my-2" fill="currentColor"/>

        </div>
        {isImage ? (
          <img src={fileContent ? fileContent : ''} alt="File preview" className="w-full h-auto rounded" />
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-y">{fileContent}</pre>
        )}
      </div>
    </div>
  );
};

export default FileModal;