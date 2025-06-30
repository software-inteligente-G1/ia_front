import React, { useState } from 'react';
import axios from 'axios';

export default function NlpComponent() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await axios.post('http://localhost:8000/mental/respond', { message });
      setResponse(res.data.response);
    } catch (err) {
      setError('Error al obtener la respuesta. Revisa tu conexión o los datos ingresados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Introductory section about NLP */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Predicción de Mental Health NLP
        </h1>
        <p className="text-gray-700 mb-4">
          El procesamiento de lenguaje natural (PLN) permite a las máquinas comprender, interpretar y generar lenguaje humano. En esta aplicación, puedes enviar un mensaje relacionado con salud mental y el modelo responderá con una interpretación o sugerencia basada en IA.
        </p>
      </section>

      {/* NLP Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium">Mensaje</label>
            <textarea
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>

      {/* Response */}
      {response && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
          <h2 className="font-semibold mb-1">Respuesta del modelo:</h2>
          <p>{response}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-yellow-50 border-yellow-200 text-yellow-800 rounded-lg p-4">
          {error}
        </div>
      )}
    </div>
  );
} 