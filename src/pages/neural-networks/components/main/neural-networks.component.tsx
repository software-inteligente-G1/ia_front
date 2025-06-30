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
        <div className="max-w-4xl mx-auto my-10 px-4">
            <section className="card">
                <h1 className="text-3xl font-bold mb-4 text-center">Predicción de Consumo Energético con Redes Neuronales</h1>
                <p className="text-gray-700 mb-2 text-center">
                    Las redes neuronales son modelos computacionales inspirados en el funcionamiento del cerebro humano, diseñados para reconocer patrones complejos en grandes volúmenes de datos.
                </p>
                <p className="text-gray-700 mb-4 text-center">
                    En esta aplicación, utilizamos una red neuronal para predecir el consumo energético por hora (en kWh) de un hogar, en función del tipo de electrodoméstico, la hora del día, la estación del año, la temperatura exterior y el tamaño del hogar. Esto permite estimar el consumo diario, semanal y mensual, facilitando la planificación energética y promoviendo un uso más eficiente de los recursos.
                </p>
            </section>

            <div className="card mb-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">Hora del día (0-23)</label>
                        <input
                            type="number"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
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
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Electrodoméstico</label>
                        <select
                            name="appliance_type"
                            value={formData.appliance_type}
                            onChange={handleChange}
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
                            className="btn"
                        >
                            {loading ? 'Calculando...' : 'Predecir'}
                        </button>
                    </div>
                </form>
            </div>

            {result && (
                <div className="success">
                    <h2 className="font-semibold mb-1">Resultado:</h2>
                    <p>⚡ <strong>Consumo estimado por hora:</strong> {result.predicted_kwh} kWh</p>
                    <p>📅 <strong>Consumo diario:</strong> {result.daily} kWh</p>
                    <p>🗓 <strong>Consumo semanal:</strong> {result.weekly} kWh</p>
                    <p>📆 <strong>Consumo mensual:</strong> {result.monthly} kWh</p>
                    <p>📊 <strong>Categoría:</strong> {result.category}</p>
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
