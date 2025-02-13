import React from "react";

interface DocIframeProps {
  source: string;
  className: string;
  title: string;
}

const IframeComponent: React.FC<DocIframeProps> = ({ source, className, title }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <iframe
        src={source}
        title={title}
        className={className}
      ></iframe>
    </>
  );
};

export default IframeComponent;