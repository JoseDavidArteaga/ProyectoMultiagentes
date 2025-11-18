import { useState } from 'react';
import { CheckCircle, Copy, Share2, Download, RefreshCw } from 'lucide-react';

const Result = ({ data, tema, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.final);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Análisis de: ${tema}`,
          text: data.final,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error al compartir:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    const content = `Análisis Multi-Agente: ${tema}\n\nFecha: ${new Date().toLocaleDateString()}\n\n${data.final}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analisis-${tema.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatText = (text) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {line}
      </p>
    ));
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      {/* Header de éxito */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Análisis Completado
        </h2>
      </div>

      {/* Información del tema */}
      <div className="mb-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Tema analizado:</span>{' '}
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            {tema}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Procesado por nuestro sistema multi-agente
        </p>
      </div>

      {/* Tarjeta principal con el resultado */}
      <div className="card">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed text-base">
            {formatText(data.final)}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                     dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200
                     text-gray-700 dark:text-gray-300"
          >
            <Copy className="h-4 w-4" />
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                     dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200
                     text-gray-700 dark:text-gray-300"
          >
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                     dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200
                     text-gray-700 dark:text-gray-300"
          >
            <Download className="h-4 w-4" />
            <span>Descargar</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 
                     dark:bg-blue-900 dark:hover:bg-blue-800 rounded-lg transition-colors duration-200
                     text-blue-700 dark:text-blue-300 ml-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Nuevo Análisis</span>
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="card py-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            3
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Agentes Utilizados
          </div>
        </div>
        
        <div className="card py-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            ✓
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Verificado
          </div>
        </div>
        
        <div className="card py-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            IA
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Powered by LangGraph
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;