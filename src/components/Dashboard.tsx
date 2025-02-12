import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { AuthContext } from '@/api/AuthContext';
import { LoggedOutComponent } from './errors/loggedout';

interface Folder {
  ID: string;
  Name: string;
  UploaderID: string;
  ParentID: string;
  CreatedAt: string;
  UpdatedAt: string;
}

interface File {
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

interface FolderWithFiles {
  Folder: Folder;
  Files: File[] | null;
  Subfolders: FolderWithFiles[] | null;
}

interface DashboardData {
  folders: FolderWithFiles[];
  files: File[] | null;
}

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);

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

  return (
    <div className="gap-1 px-6 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#141414] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Files
          </p>
        </div>
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div
                className="text-[#3E4D5B] flex border-none bg-[#F0F2F5] items-center justify-center pl-4 rounded-l-lg border-r-0"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                placeholder="Search files"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#F0F2F5] focus:border-none h-full placeholder:text-[#3E4D5B] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                value=""
              />
            </div>
          </label>
        </div>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#F0F2F5] pl-4 pr-4">
            <p className="text-[#141414] text-sm font-medium leading-normal">All</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#F0F2F5] pl-4 pr-4">
            <p className="text-[#141414] text-sm font-medium leading-normal">Images</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#F0F2F5] pl-4 pr-4">
            <p className="text-[#141414] text-sm font-medium leading-normal">Videos</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#F0F2F5] pl-4 pr-4">
            <p className="text-[#141414] text-sm font-medium leading-normal">Audio</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#F0F2F5] pl-4 pr-4">
            <p className="text-[#141414] text-sm font-medium leading-normal">Documents</p>
          </div>
        </div>
        <div className="px-4 py-3 @container">
          <div className="flex overflow-hidden rounded-lg border border-[#DBE1E6] bg-[#FFFFFF]">
            <table className="flex-1">
              <thead>
                <tr className="bg-[#FFFFFF]">
                  <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 px-4 py-3 text-left text-[#141414] w-[400px] text-sm font-medium leading-normal">
                    Name
                  </th>
                  <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 px-4 py-3 text-left text-[#141414] w-60 text-sm font-medium leading-normal">
                    Type
                  </th>
                  <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 px-4 py-3 text-left text-[#141414] w-[400px] text-sm font-medium leading-normal">
                    Size
                  </th>
                  <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 px-4 py-3 text-left text-[#141414] w-[400px] text-sm font-medium leading-normal">
                    Date
                  </th>
                  <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 px-4 py-3 text-left text-[#141414] w-60 text-[#3E4D5B] text-sm font-medium leading-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.folders?.map((folder) => (
                  <tr key={folder.Folder.ID} className="border-t border-t-[#DBE1E6]">
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                      {folder.Folder.Name}
                    </td>
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full">
                        <span className="truncate">Folder</span>
                      </button>
                    </td>
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                      -
                    </td>
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                      {new Date(folder.Folder.CreatedAt).toLocaleDateString()}
                    </td>
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                      Button
                    </td>
                  </tr>
                ))}
                {data?.files?.map((file) => (
                  <tr key={file.ID} className="border-t border-t-[#DBE1E6]">
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                      {file.FileName}
                    </td>
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full">
                        <span className="truncate">{file.FileType}</span>
                      </button>
                    </td>
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                      {`${(file.FileSize / 1024 / 1024).toFixed(2)} MB`}
                    </td>
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                      {new Date(file.UploadedAt).toLocaleDateString()}
                    </td>
                    <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                      Button
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;