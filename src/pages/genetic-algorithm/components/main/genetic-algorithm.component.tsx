import { useState } from 'react';
import type { Course } from './types';

export default function GeneticAlgorithmComponent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    name: '',
    hours: 0
  });
  
  const [geneticParams, setGeneticParams] = useState({
    hours_target: 16,
    population_size: 20,
    generations: 100,
    mutation_rate: 0.1
  });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.hours > 0) {
      setCourses([...courses, newCourse]);
      setNewCourse({ name: '', hours: 0 });
    }
  };

  const handleRemoveCourse = (index: number) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  const handleGenerateSchedule = async () => {
    try {
      const requestData = {
        courses: courses.map(course => ({
          name: course.name,
          hours: course.hours
        })),
        hours_target: geneticParams.hours_target,
        population_size: geneticParams.population_size,
        generations: geneticParams.generations,
        mutation_rate: geneticParams.mutation_rate
      };

      const response = await fetch('http://localhost:8000/genetic/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.detail === 'schedule_conflict') {
          alert('Hay un cruce de horarios entre los cursos seleccionados.');
        } else {
          alert(`Error del servidor: ${data.detail || 'Error desconocido'}`);
        }
        return;
      }

      if (data.selected_courses && Array.isArray(data.selected_courses)) {
        setAvailableCourses(data.selected_courses);
      } else {
        alert('El formato de respuesta del servidor no es válido');
      }
    } catch (error) {
      console.error('Error detallado:', error);
      alert('Error de conexión con el servidor. Verifica que el servidor esté funcionando en http://localhost:8000');
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <section className="card">
        <h1 className="text-3xl font-bold mb-4 text-center">Predicción de Horarios con Algoritmo Genético</h1>
        <p className="text-gray-700 mb-2 text-center">
          Un algoritmo genético aplicado a la generación de horarios de cursos crea inicialmente varios horarios posibles de forma aleatoria. Cada uno se evalúa según qué tan cumple con restricciones como evitar traslapes entre cursos, respetar la disponibilidad de alumnos y profesores, y distribuir adecuadamente las clases durante la semana. Luego, los mejores horarios se seleccionan para cruzarse entre sí y producir nuevos horarios, mientras que algunas pequeñas mutaciones se aplican para mantener la diversidad. Este proceso se repite hasta obtener un horario de cursos óptimo o cercano al ideal.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="card flex-1">
          <h2 className="text-xl font-semibold mb-2">Agregar Nuevo Curso</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nombre del curso"
              value={newCourse.name}
              onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Horas semanales"
              value={newCourse.hours}
              onChange={(e) => setNewCourse({...newCourse, hours: parseInt(e.target.value) || 0})}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAddCourse}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Agregar Curso
            </button>
          </div>
        </div>
        <div className="card flex-1">
          <h2 className="text-xl font-semibold mb-2">Parámetros del Algoritmo</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Horas objetivo</label>
              <input
                type="number"
                value={geneticParams.hours_target}
                onChange={(e) => setGeneticParams({...geneticParams, hours_target: parseInt(e.target.value) || 0})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tamaño población</label>
              <input
                type="number"
                value={geneticParams.population_size}
                onChange={(e) => setGeneticParams({...geneticParams, population_size: parseInt(e.target.value) || 0})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Generaciones</label>
              <input
                type="number"
                value={geneticParams.generations}
                onChange={(e) => setGeneticParams({...geneticParams, generations: parseInt(e.target.value) || 0})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tasa mutación</label>
              <input
                type="number"
                step="0.1"
                value={geneticParams.mutation_rate}
                onChange={(e) => setGeneticParams({...geneticParams, mutation_rate: parseFloat(e.target.value) || 0})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            onClick={handleGenerateSchedule}
            className="w-full mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
            Generar Horario
          </button>
        </div>
      </div>

      <div className="card mt-6">
        <h2 className="text-xl font-semibold mb-2">Cursos Seleccionados</h2>
        <div className="space-y-2">
          {courses.map((course, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{course.name} - {course.hours} horas</span>
              <button
                onClick={() => handleRemoveCourse(index)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {availableCourses.length > 0 && (
        <div className="card mt-6">
          <h2 className="text-xl font-semibold mb-2">Cursos sin Conflictos</h2>
          <div className="space-y-2">
            {availableCourses.map((course, index) => (
              <div key={index} className="p-2 bg-green-100 rounded">
                {course.name} - {course.hours} horas
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}