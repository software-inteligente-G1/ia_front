export default function WelcomeComponent() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-blue-500 p-8 rounded-lg text-center shadow-lg shadow-gray-500 text-white">
        <h1 className="font-bold text-xl my-2">Bienvenido a la aplicación de algoritmos de Machine Learning</h1>
        <p>Esta aplicación te permitirá explorar diferentes algoritmos de Machine Learning y sus aplicaciones.</p>
        <p>Selecciona un algoritmo del menú lateral para comenzar.</p>
      </div>
    </div>
  );
}