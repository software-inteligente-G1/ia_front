import React, { useState } from 'react';
import {predictNeuralNetwork} from '../../services/neural-networks.service.ts';
import {applianceLabels, initialState, seasonLabels} from "../../constants/general.constant.ts";
import type {EnergyInput, EnergyOutput} from "../../interfaces/energy.interface.ts";

export default function NeuralNetworksComponent() {
    const [formData, setFormData] = useState<EnergyInput>(initialState);
    const [result, setResult] = useState<EnergyOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'appliance_type' || name === 'season' || name === 'household_size' || name === 'time'
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const response = await predictNeuralNetwork(formData);
            setResult(response);
        } catch (err) {
            setError('Error al obtener la predicción. Revisa tu conexión o los datos ingresados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            {/* Introductory section about Neural Networks */}
            <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Predicción de Consumo Energético con Redes Neuronales
                </h1>
                <p className="text-gray-700 mb-4">
                    Las redes neuronales son modelos computacionales inspirados en el funcionamiento del cerebro humano, diseñados para reconocer patrones complejos en grandes volúmenes de datos.
                </p>
                <p className="text-gray-700 mb-4">
                    En esta aplicación, utilizamos una red neuronal para predecir el consumo energético por hora (en kWh) de un hogar, en función del tipo de electrodoméstico, la hora del día, la estación del año, la temperatura exterior y el tamaño del hogar. Esto permite estimar el consumo diario, semanal y mensual, facilitando la planificación energética y promoviendo un uso más eficiente de los recursos.
                </p>
            </section>

            {/* Prediction Form */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">Hora del día (0-23)</label>
                        <input
                            type="number"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                            min="0" max="23"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Temperatura Exterior (°C)</label>
                        <input
                            type="number"
                            name="temperature"
                            value={formData.temperature}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Tamaño del Hogar</label>
                        <input
                            type="number"
                            name="household_size"
                            value={formData.household_size}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Electrodoméstico</label>
                        <select
                            name="appliance_type"
                            value={formData.appliance_type}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                        >
                            {applianceLabels.map((label, idx) => (
                                <option key={idx} value={idx}>{label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Estación del Año</label>
                        <select
                            name="season"
                            value={formData.season}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                        >
                            {seasonLabels.map((label, idx) => (
                                <option key={idx} value={idx}>{label}</option>
                            ))}
                        </select>
                    </div>

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

            {/* Result */}
            {result && (
                <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800">
                    <h2 className="font-semibold mb-1">Resultado:</h2>
                    <p>⚡ <strong>Consumo estimado por hora:</strong> {result.predicted_kwh} kWh</p>
                    <p>📅 <strong>Consumo diario:</strong> {result.daily} kWh</p>
                    <p>🗓 <strong>Consumo semanal:</strong> {result.weekly} kWh</p>
                    <p>📆 <strong>Consumo mensual:</strong> {result.monthly} kWh</p>
                    <p>📊 <strong>Categoría:</strong> {result.category}</p>
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
