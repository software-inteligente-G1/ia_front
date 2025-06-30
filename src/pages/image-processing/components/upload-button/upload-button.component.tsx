import React from 'react';

interface UploadButtonProps {
  onFileSelect: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <label className="cursor-pointer rounded mb-4 inline-block">
      <p className="text-white btn h-full w-full"> Elegir Imagen </p>
      <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </label>
  );
};

export default UploadButton;