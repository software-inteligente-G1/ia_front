export default function WelcomeComponent() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card text-center max-w-xl w-full">
        <div className="flex justify-center mb-2">
          <span style={{ fontSize: '2.5rem' }} role="img" aria-label="IA">🤖</span>
        </div>
        <h1 className="font-bold text-2xl my-2 text-blue-800">Bienvenido a la aplicación de algoritmos de Machine Learning</h1>
        <p className="text-gray-600 mb-2">Esta aplicación te permitirá explorar diferentes algoritmos de Machine Learning y sus aplicaciones.</p>
        <p className="text-gray-500">Selecciona un algoritmo del menú lateral para comenzar.</p>
      </div>
    </div>
  );
}