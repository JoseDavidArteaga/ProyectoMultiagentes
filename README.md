# 🤖 Sistema Multi-Agentes Inteligentes

> **Desarrollado por**: José David Arteaga Fernández  
> **Carrera**: Ingeniería de Sistemas  
> **Especialización**: Ingeniería de Datos, Ciencia de Datos y Machine Learning  

Un sistema completo de análisis inteligente que combina **múltiples agentes de IA** para procesar información de manera colaborativa. Incluye una API REST robusta construida con FastAPI y una interfaz web moderna desarrollada en React.

## 📋 Descripción del Proyecto

Este proyecto implementa un **flujo de trabajo multi-agente** utilizando LangGraph para orchestar tres agentes especializados que trabajan en secuencia:

1. **🔍 Agente Investigador**: Busca y recopila información actualizada sobre cualquier tema
2. **✍️ Agente Escritor**: Genera resúmenes claros y comprensibles
3. **✅ Agente Verificador**: Revisa, valida y mejora el resultado final

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   LangGraph     │
│   React + Vite  │◄──►│   FastAPI       │◄──►│   Multi-Agent   │
│   TailwindCSS   │    │   + CORS        │    │   Workflow      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        ▼
         │                        │              ┌─────────────────┐
         │                        │              │   GROQ API      │
         │                        │              │   LLaMA 3.1     │
         └────────────────────────┼──────────────┤   8B Instant    │
                                  │              └─────────────────┘
                                  ▼
                        ┌─────────────────┐
                        │   Render.com    │
                        │   Deployment    │
                        └─────────────────┘
```

## ✨ Características Principales

### Backend (FastAPI)
- ⚡ **API REST de alto rendimiento** con FastAPI
- 🔄 **Flujo de agentes** orchestado con LangGraph
- 🌐 **CORS configurado** para integración frontend
- 📝 **Documentación automática** con Swagger/OpenAPI
- 🔐 **Manejo seguro de variables de entorno**
- 🚀 **Despliegue automático en Render**

### Frontend (React)
- ⚛️ **React 18** con Vite para desarrollo rápido
- 🎨 **TailwindCSS** para diseño moderno y responsive
- 🎯 **Componentes funcionales** con hooks
- ✨ **Animaciones suaves** y efectos visuales
- 📱 **Diseño completamente responsive**
- 🌙 **Soporte para modo oscuro**
- 📋 **Funcionalidades avanzadas**: copiar, compartir, descargar resultados

## 🛠️ Tecnologías Utilizadas

### Backend
- **FastAPI** - Framework web moderno para Python
- **LangGraph** - Orchestación de flujos de agentes de IA
- **LangChain** - Integración con modelos de lenguaje
- **GROQ** - Inferencia rápida de modelos LLM (LLaMA 3.1-8B-Instant)
- **Python-dotenv** - Gestión de variables de entorno
- **Uvicorn** - Servidor ASGI de alto rendimiento

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **TailwindCSS** - Framework CSS utility-first
- **Lucide React** - Iconos modernos y consistentes
- **JavaScript ES6+** - Sintaxis moderna

### DevOps & Deployment
- **Render** - Plataforma de despliegue para backend
- **Vercel** - Plataforma de despliegue para frontend
- **Git & GitHub** - Control de versiones
- **Environment Variables** - Gestión segura de configuración

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Python 3.8+**
- **Node.js 16+**
- **npm o yarn**
- **Clave API de GROQ** ([Obtener aquí](https://console.groq.com))

### Configuración del Backend

1. **Clona el repositorio**:
```bash
git clone https://github.com/JoseDavidArteaga/ProyectoMultiagentes.git
cd ProyectoMultiagentes
```

2. **Crea y activa un entorno virtual**:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. **Instala las dependencias**:
```bash
pip install -r requirements.txt
```

4. **Configura las variables de entorno**:
```bash
# Crear archivo .env
echo "GROQ_API_KEY=tu_clave_groq_aqui" > .env
```

5. **Ejecuta el servidor**:
```bash
uvicorn app:app --reload
```

La API estará disponible en `http://localhost:8000`

### Configuración del Frontend

1. **Navega al directorio frontend**:
```bash
cd frontend
```

2. **Instala las dependencias**:
```bash
npm install
```

3. **Configura la URL de la API**:
```bash
# Crear archivo .env.local
echo "VITE_API_URL=http://localhost:8000" > .env.local
```

4. **Inicia el servidor de desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📡 Documentación de la API

### Endpoints Principales

#### `POST /procesar`
Procesa un tema a través del flujo completo de agentes.

**Request:**
```json
{
    "tema": "inteligencia artificial en medicina"
}
```

**Response:**
```json
{
    "tema": "inteligencia artificial en medicina",
    "informacion": "Información detallada investigada por el agente...",
    "resumen": "Resumen claro y estructurado...",
    "final": "Análisis final verificado y mejorado...",
    "success": true
}
```

#### `GET /health`
Verifica el estado del servicio.

**Response:**
```json
{
    "status": "healthy",
    "service": "multi-agentes-api"
}
```

#### `GET /`
Información general de la API.

### Documentación Interactiva
- **Swagger UI**: `{API_URL}/docs`
- **ReDoc**: `{API_URL}/redoc`

## 🌐 Despliegue en Producción

### Backend en Render

1. **Conecta tu repositorio** a [Render](https://render.com)
2. **Crea un nuevo Web Service**
3. **Configura las variables de entorno**:
   - `GROQ_API_KEY`: Tu clave de API de Groq
4. **Render detectará automáticamente** el archivo `render.yaml`

**URL de Producción**: `https://proyectomultiagentes.onrender.com`

### Frontend en Vercel

1. **Conecta tu repositorio** a [Vercel](https://vercel.com)
2. **Selecciona la carpeta** `frontend/` como directorio raíz
3. **Configura las variables de entorno**:
   - `VITE_API_URL`: URL de tu API en Render
4. **Despliega automáticamente**

## 💡 Casos de Uso

- **📚 Investigación Académica**: Análisis profundo de temas complejos
- **📰 Análisis de Tendencias**: Investigación de temas actuales
- **🏢 Inteligencia de Negocio**: Análisis de mercado y competencia
- **🎓 Educación**: Generación de resúmenes educativos
- **📊 Ciencia de Datos**: Investigación previa a análisis de datos

## 🔧 Configuración Avanzada

### Variables de Entorno

#### Backend
```env
GROQ_API_KEY=tu_clave_groq_aqui
PORT=8000  # Configurado automáticamente en Render
```

#### Frontend
```env
VITE_API_URL=https://proyectomultiagentes.onrender.com
```

### Personalización de Agentes

Los agentes pueden ser personalizados editando los archivos en `/agentes/`:
- `investigador.py` - Lógica de investigación
- `escritor.py` - Generación de resúmenes
- `verificador.py` - Validación y mejora

## 📊 Rendimiento y Escalabilidad

- **⚡ Tiempo de respuesta**: < 30 segundos promedio
- **🔄 Concurrencia**: Soporta múltiples solicitudes simultáneas
- **📈 Escalabilidad**: Horizontalmente escalable en Render
- **💾 Memoria**: Optimizado para uso eficiente de recursos

## 🧪 Testing y Desarrollo

### Ejecutar Tests
```bash
# Backend
python -m pytest tests/

# Frontend
npm run test
```

### Modo Desarrollo
```bash
# Backend con recarga automática
uvicorn app:app --reload

# Frontend con recarga automática
npm run dev
```

## 🤝 Contribución

Este proyecto está desarrollado como parte del portafolio profesional de **José David Arteaga Fernández**. Si deseas contribuir o tienes sugerencias:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**José David Arteaga Fernández**  
🎓 Estudiante de Ingeniería de Sistemas  
🎯 Especialización: Ingeniería de Datos, Ciencia de Datos y Machine Learning

---

*Este proyecto demuestra habilidades en desarrollo full-stack, inteligencia artificial, arquitectura de sistemas y despliegue en la nube.*