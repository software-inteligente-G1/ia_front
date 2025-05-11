export default function NotFoundComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-400 p-16 rounded-lg text-center shadow-lg shadow-gray-500">
        <h1 className="font-bold text-5xl mt-2 mb-4">404 - Página no encontrada</h1>
        <p className="text-xl my-4">Lo sentimos, la página que estás buscando no existe.</p>
        <p className="text-lg my-2">
          Por favor, verifica la URL o vuelve a la 
          <a href="/" className="text-red-700"> página de inicio</a>.
        </p>
      </div>
    </div>
  );
}