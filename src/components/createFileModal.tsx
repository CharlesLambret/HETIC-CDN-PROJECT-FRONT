import { useState, useContext } from 'react';
import { AuthContext } from '@/api/AuthContext';
import { FolderWithFiles } from './itemTable';

interface CreateFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  folders: FolderWithFiles[] | null;
}

const CreateFileModal: React.FC<CreateFileModalProps> = ({ isOpen, onClose, folders }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const auth = useContext(AuthContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleParentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParentId(event.target.value || undefined);
  };

  const handleUpload = async () => {
    if (!selectedFile || !auth?.user) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('parent_id', parentId || '');
    formData.append('uploader_id', auth.user.id);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        onClose();
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white w-2/3 p-6 rounded shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Upload File</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Select File
          </label>
          <input type="file" id="file" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parentid">
            Select Parent Folder (optional)
          </label>
          <select id="parentid" onChange={handleParentChange} className="w-full px-3 py-2 border rounded">
            <option value="">None</option>
            {folders?.map((folder) => (
              <option key={folder.Folder.ID} value={folder.Folder.ID}>
                {folder.Folder.Name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default CreateFileModal;