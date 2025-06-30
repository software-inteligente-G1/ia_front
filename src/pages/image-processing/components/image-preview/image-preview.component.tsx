import React from 'react';

interface ImagePreviewProps {
  file: File;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  const imageUrl = URL.createObjectURL(file);
  return <img src={imageUrl} alt="Preview" className="w-48 h-48 object-contain rounded mb-4" />;
};

export default ImagePreview;