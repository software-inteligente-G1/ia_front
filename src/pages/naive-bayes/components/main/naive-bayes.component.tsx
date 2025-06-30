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
        <div className="max-w-4xl mx-auto my-10 px-4">
            <section className="card">
                <h1 className="text-3xl font-bold mb-4 text-center">Predicción de Diabetes con Naive Bayes</h1>
                <p className="text-gray-700 mb-2 text-center">
                    Naive Bayes es un clasificador probabilístico basado en el Teorema de Bayes, que asume independencia entre las características. Aquí lo usamos para predecir la presencia de diabetes (1) o su ausencia (0) en pacientes a partir de variables como glucosa, IMC, edad, etc.
                </p>
            </section>

            <div className="card mb-8">
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
                            className="btn"
                        >
                            {loading ? 'Calculando...' : 'Predecir'}
                        </button>
                    </div>
                </form>
            </div>

            {prediction !== null && (
                <div
                    className={`success`}
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
                <div className="error">
                    {error}
                </div>
            )}
        </div>
    );
}
