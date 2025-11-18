import { useState, useEffect } from 'react';
import { Brain, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import Form from './components/Form';
import Result from './components/Result';
import { procesarTema, checkApiHealth } from './services/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currentTema, setCurrentTema] = useState('');
  const [apiStatus, setApiStatus] = useState(null);

  // Verificar estado de la API al cargar
  useEffect(() => {
    const checkApi = async () => {
      const isHealthy = await checkApiHealth();
      setApiStatus(isHealthy);
    };
    
    checkApi();
    
    // Verificar cada 30 segundos
    const interval = setInterval(checkApi, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (tema) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentTema(tema);

    try {
      const data = await procesarTema(tema);
      setResult(data);
    } catch (err) {
      setError(err.message);
      console.error('Error procesando tema:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setCurrentTema('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Sistema Multi-Agentes Inteligentes
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Análisis avanzado con IA colaborativa
                </p>
              </div>
            </div>

            {/* Indicador de estado de la API */}
            <div className="flex items-center space-x-2">
              {apiStatus === null ? (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  <span className="text-sm">Verificando...</span>
                </div>
              ) : apiStatus ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Wifi className="h-4 w-4" />
                  <span className="text-sm">API Online</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-600">
                  <WifiOff className="h-4 w-4" />
                  <span className="text-sm">API Offline</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          {!result && !error && (
            <div className="text-center space-y-8">
              {/* Hero Section */}
              <div className="space-y-4 mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Descubre información con
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block md:inline">
                    {' '}Inteligencia Artificial
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Nuestro sistema de agentes colaborativos investiga, analiza y verifica 
                  información para brindarte respuestas precisas y confiables.
                </p>
              </div>

              {/* Proceso de trabajo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="card text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Investigación
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    El agente investigador busca y recopila información relevante sobre tu tema.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Síntesis
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    El agente escritor organiza y estructura la información de manera clara.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Verificación
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    El agente verificador revisa y mejora la calidad del contenido final.
                  </p>
                </div>
              </div>

              {/* Formulario */}
              <Form onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          )}

          {/* Mensaje de error */}
          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                      Error al procesar el tema
                    </h3>
                    <p className="text-red-700 dark:text-red-400 mb-4">
                      {error}
                    </p>
                    <button
                      onClick={handleReset}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg 
                               transition-colors duration-200 font-medium"
                    >
                      Intentar nuevamente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resultado */}
          {result && (
            <Result 
              data={result} 
              tema={currentTema} 
              onReset={handleReset} 
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Desarrollado con ❤️ usando React, FastAPI y LangGraph
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Sistema Multi-Agentes v1.0 - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
