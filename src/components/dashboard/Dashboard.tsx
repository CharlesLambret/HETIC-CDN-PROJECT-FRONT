import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/api/AuthContext';
import { LoggedOutComponent } from '../errors/loggedout';
import SearchBar from './searchbar';
import ItemsTable from './table/itemTable';
import { FolderWithFiles, File } from './table/itemTable';
import FileModal from './modals/update/fileModal';
import CreateFileModal from './modals/create/createFileModal';
import BackArrowSVG from '../SVG/Documents copy';

interface DashboardData {
  folders: FolderWithFiles[];
  files: File[] | null;
}

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentFolder, setCurrentFolder] = useState<FolderWithFiles | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (auth?.user) {
      const fetchData = async () => {
        try {
          console.log('Fetching data for user:', auth.user);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/fetch-folders?uploader_id=${auth.user?.id}`
          );
          if (response.ok) {
            const result: DashboardData = await response.json();
            console.log('Fetched data:', result);
            setData(result);
          } else {
            console.error('Failed to fetch data, status:', response.status);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [auth?.user, router]);

  if (!auth?.user) {
    return <LoggedOutComponent />;
  }

  const tags = ['All', 'Images', 'Videos', 'Audio', 'Documents'];
  const tableCols = ['Nom', 'Type', 'Size', 'Date', 'Action'];

  const filteredFolders = (currentFolder ? currentFolder.Subfolders : data?.folders)?.filter((folder) =>
    folder.Folder.Name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || null;

  const filteredFiles = (currentFolder ? currentFolder.Files : data?.files)?.filter((file) =>
    file.FileName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || null;

  const handleFolderClick = (folder: FolderWithFiles) => {
    setCurrentFolder(folder);
  };

  const handleFileClick = (file: File) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleBackClick = () => {
    setCurrentFolder(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  return (
    <div className="px-6 flex justify-center w-3/5 mx-auto py-5">
      <div className="layout-content-container flex flex-col flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
            <h1 className="text-[#141414] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Fichiers {currentFolder ? `> ${currentFolder.Folder.Name}` : ''}
            </h1>
            {currentFolder && currentFolder.Subfolders && (
            <div className="flex flex-wrap gap-3">
              {currentFolder.Subfolders.map((subfolder) => (
              <div
                key={subfolder.Folder.ID}
                className="bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300"
                onClick={() => handleFolderClick(subfolder)}
              >
                {subfolder.Folder.Name}
              </div>
              ))}
            </div>
            )}
          <button onClick={handleOpenCreateModal} className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-600">
            Charger un fichier
          </button>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          {tags.map((tag) => (
            <div key={tag} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#F0F2F5] pl-4 pr-4">
              <p className="text-[#141414] text-sm font-medium leading-normal">{tag}</p>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 @container">
          {currentFolder && (
            <div className="w-1/6 py-2">
                        <BackArrowSVG className="w-1/6 text-gray-500 hover:text-blue-500 cursor-pointer" fill="currentColor" onClick={handleBackClick} />

            </div>
          )}
          <ItemsTable folders={filteredFolders} files={filteredFiles} tableCols={tableCols} onFolderClick={handleFolderClick} onFileClick={handleFileClick} />
        </div>
      </div>
      {selectedFile && (
        <FileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          fileId={selectedFile.ID}
          uploaderId={selectedFile.UploaderID}
          fileName={selectedFile.FileName}
        />
      )}
      <CreateFileModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        folders={data?.folders || null}
      />
    </div>
  );
};

export default Dashboard;