import React from 'react';
import FileSVG from './SVG/Files';
import PhotosSVG from './SVG/Photos';
import DocumentSVG from './SVG/Documents';

export interface Folder {
  ID: string;
  Name: string;
  UploaderID: string;
  ParentID: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface File {
  ID: string;
  FileName: string;
  FileSize: number;
  FileType: string;
  FilePath: string;
  UploadedAt: string;
  UpdatedAt: string;
  UploaderID: string;
  Metadata: {
    duration: number;
    height: number;
    tags: string[];
    width: number;
  };
  Status: string;
  AccessControl: {
    Public: boolean;
    Permissions: string[];
  };
  ParentID: string;
}

export interface FolderWithFiles {
  Folder: Folder;
  Files: File[] | null;
  Subfolders: FolderWithFiles[] | null;
}

export interface ItemsTableProps {
  folders: FolderWithFiles[] | null;
  files: File[] | null;
  tableCols: string[];
  onFolderClick: (folder: FolderWithFiles) => void;
}

const ItemsTable: React.FC<ItemsTableProps> = ({ folders, files, tableCols, onFolderClick }) => {
  const renderFolderRow = (folder: FolderWithFiles) => (
    <tr key={folder.Folder.ID} className="border-t border-t-[#DBE1E6] p-3" onClick={() => onFolderClick(folder)}>
      <td className="p-2 flex w-2/6 flex-row items-center cursor-pointer hover:text-blue-500 hover:underline">
        <FileSVG className="w-1/6" fill="currentColor" />
        {folder.Folder.Name}
      </td>
      <td>
        <button className="p-2 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full">
          <span className="truncate">Folder</span>
        </button>
      </td>
      <td className="p-2">-</td>
      <td className="p-2">{new Date(folder.Folder.CreatedAt).toLocaleDateString()}</td>
      <td className="p-2">Supprimer</td>
    </tr>
  );

  const renderFileRow = (file: File) => (
    <tr key={file.ID} className="border-t border-t-[#DBE1E6]">
      <td className="p-2 flex w-2/6 flex-row items-center ">
        {file.FileType === 'image/jpeg' ? (
          <PhotosSVG className="w-1/6" fill="currentColor" />
        ) : (
          <DocumentSVG className="w-1/6" fill="currentColor" />
        )}
        {file.FileName}
      </td>
      <td className="p-2">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full">
          <span className="truncate">{file.FileType}</span>
        </button>
      </td>
      <td className="p-2">{`${(file.FileSize / 1024 / 1024).toFixed(2)} MB`}</td>
      <td className="p-2">{new Date(file.UploadedAt).toLocaleDateString()}</td>
      <td className="p-2">Button</td>
    </tr>
  );

  return (
    <div className="flex overflow-hidden rounded-lg border border-[#DBE1E6] bg-[#FFFFFF]">
      <table className="table-auto">
        <thead>
          <tr className="bg-[#FFFFFF]">
            {tableCols.map((col) => (
              <th key={col} className="px-5 m-5">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {folders?.map(renderFolderRow)}
          {files?.map(renderFileRow)}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;