import React, { useState } from 'react';
import UploadButton from '../upload-button/upload-button.component';
import ImagePreview from '../image-preview/image-preview.component';
import { classifyImage } from '../../services/image-processing.service';
import type { PredictionResult } from '../../interfaces/prediction-result.interface';

const ImageProcessing: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClassification = async () => {
    if (!file) return;
    setLoading(true);
    const response = await classifyImage(file);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-6">
      <section className="card">
        <h1 className="text-3xl font-bold mb-4 text-center">Clasificación de Imágenes con Transfer Learning</h1>
        <p className="text-gray-700 mb-2 text-center">
          Sube una imagen de una fruta y nuestra red neuronal clasificará de qué tipo es.
          Utilizamos modelos preentrenados con transferencia de aprendizaje (ResNet).
        </p>
      </section>

      <UploadButton onFileSelect={(file) => {
        setFile(file);
        setResult(null);
      }} />

      {file && <ImagePreview file={file} />}

      {file && (
        <button
          onClick={handleClassification}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Clasificar Imagen
        </button>
      )}

      {loading && <p className="text-blue-600">Cargando...</p>}

      {result && (
        <div className="mt-4 bg-white p-4 rounded shadow w-full max-w-xl">
          <h2 className="text-gray-800 font-semibold">Resultado:</h2>
          <p className="text-gray-700 mt-2 whitespace-pre-wrap">{result.class_name}</p>
        </div>
      )}
    </div>
  );
};

export default ImageProcessing;