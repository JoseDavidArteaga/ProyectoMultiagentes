import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

const Form = ({ onSubmit, isLoading }) => {
  const [tema, setTema] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!tema.trim()) {
      setError('Por favor, ingresa un tema para analizar');
      return;
    }
    
    if (tema.trim().length < 3) {
      setError('El tema debe tener al menos 3 caracteres');
      return;
    }

    onSubmit(tema.trim());
  };

  const ejemplos = [
    'Inteligencia artificial',
    'Energía solar',
    'Cambio climático',
    'Blockchain',
    'Computación cuántica'
  ];

  const handleEjemploClick = (ejemplo) => {
    setTema(ejemplo);
    setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de entrada principal */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={tema}
            onChange={(e) => {
              setTema(e.target.value);
              setError('');
            }}
            placeholder="Escribe un tema para analizar..."
            className="input-field pl-12 text-lg"
            disabled={isLoading}
            maxLength={100}
          />
          
          {/* Contador de caracteres */}
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <span className="text-sm text-gray-400">
              {tema.length}/100
            </span>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3 animate-fade-in">
            {error}
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isLoading || !tema.trim()}
          className="btn-primary w-full text-lg flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="spinner" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span>Analizar con IA</span>
            </>
          )}
        </button>

        {/* Estado de carga adicional */}
        {isLoading && (
          <div className="text-center text-gray-600 animate-fade-in">
            <p className="text-sm">
              Nuestros agentes están trabajando en tu consulta...
            </p>
            <p className="text-xs mt-1 text-gray-500">
              Esto puede tomar hasta 30 segundos
            </p>
          </div>
        )}
      </form>

      {/* Ejemplos de temas */}
      {!isLoading && tema.length === 0 && (
        <div className="mt-8 animate-fade-in">
          <p className="text-sm text-gray-600 mb-3 text-center">
            O prueba con uno de estos ejemplos:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {ejemplos.map((ejemplo, index) => (
              <button
                key={index}
                onClick={() => handleEjemploClick(ejemplo)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
                         text-gray-700 dark:text-gray-300 text-sm rounded-full transition-colors duration-200
                         border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              >
                {ejemplo}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;