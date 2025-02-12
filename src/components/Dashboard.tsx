// components/Dashboard.tsx
import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { AuthContext } from '@/api/AuthContext';
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
    const auth = useContext(AuthContext);
  
    if (!auth) {
      throw new Error('You must be logged in to view this page');
    }
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
  interface MockFile {
    id: number;
    name: string;
  }
  const mockFiles: MockFile[] = [
    { id: 1, name: 'Document1.pdf' },
    { id: 2, name: 'Image1.png' },
    { id: 3, name: 'Report.docx' },
  ];
  
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] group/design-root overflow-x-hidden" >
        <div className="layout-container flex h-full grow flex-col">
          <div className="gap-1 px-6 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-80">
              <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#FFFFFF] p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-[#141414]" data-icon="House" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-[#141414] text-sm font-medium leading-normal">Home</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F0F2F5]">
                      <div className="text-[#141414]" data-icon="Folder" data-size="24px" data-weight="fill">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M216,72H131.31L104,44.69A15.88,15.88,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.41,15.41,0,0,0,39.39,216h177.5A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-[#141414] text-sm font-medium leading-normal">Files</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-[#141414]" data-icon="Image" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-[#141414] text-sm font-medium leading-normal">Photos</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-[#141414]" data-icon="Link" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M137.54,186.36a8,8,0,0,1,0,11.31l-9.94,10A56,56,0,0,1,48.38,128.4L72.5,104.28A56,56,0,0,1,149.31,102a8,8,0,1,1-10.64,12,40,40,0,0,0-54.85,1.63L59.7,139.72a40,40,0,0,0,56.58,56.58l9.94-9.94A8,8,0,0,1,137.54,186.36Zm70.08-138a56.08,56.08,0,0,0-79.22,0l-9.94,9.95a8,8,0,0,0,11.32,11.31l9.94-9.94a40,40,0,0,1,56.58,56.58L172.18,140.4A40,40,0,0,1,117.33,142,8,8,0,1,0,106.69,154a56,56,0,0,0,76.81-2.26l24.12-24.12A56.08,56.08,0,0,0,207.62,48.38Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-[#141414] text-sm font-medium leading-normal">Links</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-[#141414]" data-icon="File" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-[#141414] text-sm font-medium leading-normal">Documents</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-[#141414]" data-icon="Trash" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-[#141414] text-sm font-medium leading-normal">Trash</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-[#141414] tracking-light text-[32px] font-bold leading-tight min-w-72">Files</p></div>
              <div className="px-4 py-3">
                <label className="flex flex-col min-w-40 h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <div
                      className="text-[#3E4D5B] flex border-none bg-[#F0F2F5] items-center justify-center pl-4 rounded-l-lg border-r-0"
                      data-icon="MagnifyingGlass"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path
                          d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                        ></path>
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
                        <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 px-4 py-3 text-left text-[#141414] w-[400px] text-sm font-medium leading-normal">Name</th>
                        <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 px-4 py-3 text-left text-[#141414] w-60 text-sm font-medium leading-normal">Type</th>
                        <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 px-4 py-3 text-left text-[#141414] w-[400px] text-sm font-medium leading-normal">Size</th>
                        <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 px-4 py-3 text-left text-[#141414] w-[400px] text-sm font-medium leading-normal">Date</th>
                        <th className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 px-4 py-3 text-left text-[#141414] w-60 text-[#3E4D5B] text-sm font-medium leading-normal">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-t-[#DBE1E6]">
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                          Customer Profile
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full"
                          >
                            <span className="truncate">PDF</span>
                          </button>
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">2.3MB</td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                          Feb 12, 2022
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                          Button
                        </td>
                      </tr>
                      <tr className="border-t border-t-[#DBE1E6]">
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                          Wireframe Sketches
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full"
                          >
                            <span className="truncate">PNG</span>
                          </button>
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">1.5MB</td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                          Feb 10, 2022
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                          Button
                        </td>
                      </tr>
                      <tr className="border-t border-t-[#DBE1E6]">
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                          Invoice #1234
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full"
                          >
                            <span className="truncate">PDF</span>
                          </button>
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">1.8MB</td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                          Feb 8, 2022
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                          Button
                        </td>
                      </tr>
                      <tr className="border-t border-t-[#DBE1E6]">
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                          Project Specs
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full"
                          >
                            <span className="truncate">DOCX</span>
                          </button>
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">2.7MB</td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                          Jan 28, 2022
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                          Button
                        </td>
                      </tr>
                      <tr className="border-t border-t-[#DBE1E6]">
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                          Design Mockups
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full"
                          >
                            <span className="truncate">PDF</span>
                          </button>
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">3.1MB</td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                          Jan 20, 2022
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                          Button
                        </td>
                      </tr>
                      <tr className="border-t border-t-[#DBE1E6]">
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                          User Research
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full"
                          >
                            <span className="truncate">XLSX</span>
                          </button>
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">1.9MB</td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                          Jan 15, 2022
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                          Button
                        </td>
                      </tr>
                      <tr className="border-t border-t-[#DBE1E6]">
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-120 h-[72px] px-4 py-2 w-[400px] text-[#141414] text-sm font-normal leading-normal">
                          Presentation Slides
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-medium leading-normal w-full"
                          >
                            <span className="truncate">PPT</span>
                          </button>
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-360 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">2.5MB</td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-480 h-[72px] px-4 py-2 w-[400px] text-[#3E4D5B] text-sm font-normal leading-normal">
                          Jan 5, 2022
                        </td>
                        <td className="table-15b74db6-9bae-401e-a3b1-e95e8db3a03a-column-600 h-[72px] px-4 py-2 w-60 text-[#3E4D5B] text-sm font-bold leading-normal tracking-[0.015em]">
                          Button
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Dashboard;
