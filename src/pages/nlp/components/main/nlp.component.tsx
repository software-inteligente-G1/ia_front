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
    <div className="max-w-4xl mx-auto my-10 px-4">
      {/* Introductory section about NLP */}
      <section className="card">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Predicción de Mental Health NLP
        </h1>
        <p className="text-gray-700 mb-4 text-center">
          El procesamiento de lenguaje natural (PLN) permite a las máquinas comprender, interpretar y generar lenguaje humano. En esta aplicación, puedes enviar un mensaje relacionado con salud mental y el modelo responderá con una interpretación o sugerencia basada en IA.
        </p>
      </section>

      {/* NLP Form */}
      <div className="card mb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium">Mensaje</label>
            <textarea
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn"
            >
              {loading ? 'Procesando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>

      {/* Response */}
      {response && (
        <div className="success">
          <h2 className="font-semibold mb-1">Respuesta del modelo:</h2>
          <p>{response}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="error">
          {error}
        </div>
      )}
    </div>
  );
} 