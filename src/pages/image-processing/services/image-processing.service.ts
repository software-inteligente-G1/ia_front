import axios from 'axios';
import type { PredictionResult } from '../interfaces/prediction-result.interface';

export const classifyImage = async (file: File): Promise<PredictionResult> => {
  const formData = new FormData();
  formData.append('file', file);

  let data: PredictionResult | null = null;
  try {
    const response = await axios.post(`http://localhost:8000/fruit/resnet`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    data = response.data;
  } catch (error) {
    console.error('Error during image classification:', error);
  }

  if (data === null) {
    throw new Error('Fallo en la clasificación de data. Verifique el tipo de archivo o el servidor.');
  }
  return data;
};