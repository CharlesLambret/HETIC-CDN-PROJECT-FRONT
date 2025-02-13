import React from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

interface DocxViewerProps {
  fileUrl: string;
}

const DocxViewer: React.FC<DocxViewerProps> = ({ fileUrl }) => {
  const docs = [{ uri: fileUrl }];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
};

export default DocxViewer;