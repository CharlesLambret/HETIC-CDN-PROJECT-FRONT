// components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface FileMetadata {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  file_path: string;
  uploaded_at: string;
  updated_at: string;
  uploader_id: string;
  metadata: Record<string, any>;
  status: string;
  access_control: {
    public: boolean;
    permissions: string[];
  };
  parent_id?: string;
}

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files`);
    const data = await response.json();
    setFiles(data);
  };

  const handleDeleteFile = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchFiles();
    } else {
      alert('Failed to delete file');
    }
  };

  const handleFileClick = (file: FileMetadata) => {
    setSelectedFile(file);
  };

  const handleUploadFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      setIsModalOpen(false);
      fetchFiles();
    } else {
      alert('Failed to upload file');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-2 mb-4"
      >
        Upload File
      </button>
      <ul>
        {files.map((file) => (
          <li key={file.id} className="flex justify-between items-center mb-2">
            <span onClick={() => handleFileClick(file)} className="cursor-pointer">
              {file.file_name}
            </span>
            <button
              onClick={() => handleDeleteFile(file.id)}
              className="bg-red-500 text-white p-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div>
          <h2>File Details</h2>
          <p>Name: {selectedFile.file_name}</p>
          <p>Size: {selectedFile.file_size}</p>
          <p>Type: {selectedFile.file_type}</p>
          {/* Add more details as needed */}
        </div>
      )}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Upload File</h2>
        <form onSubmit={handleUploadFile}>
          <input type="file" name="file" required />
          <button type="submit">Upload</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Dashboard;
