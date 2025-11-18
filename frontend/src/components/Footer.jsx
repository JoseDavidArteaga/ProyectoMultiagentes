import { Github, Linkedin, Mail, GraduationCap, Database, Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Información del desarrollador */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Información personal */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              José David Arteaga Fernández
            </h3>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400 mb-2">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm">Ingeniería de Sistemas</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-xs text-gray-500 dark:text-gray-500">
              <div className="flex items-center space-x-1">
                <Database className="h-3 w-3" />
                <span>Ingeniería de Datos</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>Machine Learning</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📊</span>
                <span>Ciencia de Datos</span>
              </div>
            </div>
          </div>

          {/* Enlaces y tecnologías */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-4 mb-3">
              <a
                href="https://github.com/JoseDavidArteaga"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                title="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/josedavidarteaga"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:jose.arteaga@example.com"
                className="p-2 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                title="Send Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              <p className="mb-1">Desarrollado con React + FastAPI + LangGraph</p>
              <p>Sistema Multi-Agentes para Análisis Inteligente</p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center md:text-left">
              © 2025 José David Arteaga Fernández. Proyecto de portafolio académico.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
              <span>🤖 Multi-Agent AI System</span>
              <span>•</span>
              <span>🚀 Full-Stack Development</span>
              <span>•</span>
              <span>📊 Data Engineering Focus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;