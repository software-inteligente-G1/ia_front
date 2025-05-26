import React, { useState } from 'react';
import {predictNaiveBayes} from "../../services/naive-bayes.service.ts";
import {FieldInput} from "../input/field-input.component.tsx";
import {fields} from "../../constants/fields.constant.ts";
import type {NaiveBayesRequest} from "../../interfaces/field-config.interface.ts";

export default function NaiveBayesComponent() {
    const [formData, setFormData] = useState<NaiveBayesRequest>({
        pregnancies: 0,
        glucose: 0,
        bloodPressure: 0,
        skinThickness: 0,
        insulin: 0,
        bmi: 0,
        diabetesPedigreeFunction: 0,
        age: 0,
    });
    const [prediction, setPrediction] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPrediction(null);
        try {
            const res = await predictNaiveBayes(formData);
            setPrediction(res.prediction);
        } catch {
            setError('Error al obtener la predicción. Revisa tu conexión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Predicción de Diabetes con Naive Bayes
                </h1>
                <p className="text-gray-700 mb-4">
                    Naive Bayes es un clasificador probabilístico basado en el Teorema de Bayes, que asume independencia entre las características. Aquí lo usamos para predecir la presencia de diabetes (1) o su ausencia (0) en pacientes a partir de variables como glucosa, IMC, edad, etc.
                </p>
            </section>

            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                    {fields.map(field => (
                        <FieldInput
                            key={field.name}
                            field={field}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    ))}

                    <div className="sm:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Calculando...' : 'Predecir'}
                        </button>
                    </div>
                </form>
            </div>

            {prediction !== null && (
                <div
                    className={`mb-6 p-4 rounded-lg ${
                        prediction === 1
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-green-50 border-green-200 text-green-800'
                    } border`}
                >
                    <h2 className="font-semibold mb-1">Resultado:</h2>
                    <p>
                        {prediction === 1
                            ? 'Positivo: Diabetes detectada'
                            : 'Negativo: Sin diabetes detectada'}
                    </p>
                </div>
            )}

            {error && (
                <div className="bg-yellow-50 border-yellow-200 text-yellow-800 rounded-lg p-4">
                    {error}
                </div>
            )}
        </div>
    );
}
