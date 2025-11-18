# 🤖 Sistema Multi-Agentes Inteligentes

> **Desarrollado por**: José David Arteaga Fernández  
> **Carrera**: Ingeniería de Sistemas  
> **Especialización**: Ingeniería de Datos, Ciencia de Datos y Machine Learning  

Un sistema completo de análisis inteligente que combina **múltiples agentes de IA** para procesar información de manera colaborativa. Incluye una API REST robusta construida con FastAPI y una interfaz web moderna desarrollada en React.

## URL del Proyecto

https://proyecto-multiagentes.vercel.app

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
- 📊 **Observabilidad completa con LangFuse**

### Frontend (React)
- ⚛️ **React 18** con Vite para desarrollo rápido
- 🎨 **TailwindCSS** para diseño moderno y responsive
- 🎯 **Componentes funcionales** con hooks
- ✨ **Animaciones suaves** y efectos visuales
- 📱 **Diseño completamente responsive**
- 🌙 **Soporte para modo oscuro**
- 📋 **Funcionalidades avanzadas**: copiar, compartir, descargar resultados

### Observabilidad y Monitoreo
- 📈 **LangFuse** - Observabilidad completa de LLMs
- 🔍 **Trazabilidad de agentes** - Seguimiento detallado de cada paso
- 📊 **Métricas de rendimiento** - Tiempo de ejecución y tokens
- 🐛 **Manejo de errores** - Logging y debugging avanzado
- 📝 **Traces completos** - Visualización del flujo multi-agentes

## 🛠️ Tecnologías Utilizadas

### Backend
- **FastAPI** - Framework web moderno para Python
- **LangGraph** - Orchestación de flujos de agentes de IA
- **LangChain** - Integración con modelos de lenguaje
- **GROQ** - Inferencia rápida de modelos LLM (LLaMA 3.1-8B-Instant)
- **LangFuse** - Observabilidad y monitoreo de LLMs
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

**Configuración básica (requerida)**:
```bash
# Crear archivo .env con configuración mínima
echo "GROQ_API_KEY=tu_clave_groq_aqui" > .env
```

**Configuración completa con LangFuse (recomendada)**:
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env con tus credenciales:
# GROQ_API_KEY=tu_clave_groq_aqui
# LANGFUSE_PUBLIC_KEY=pk-lf-tu_public_key_aqui
# LANGFUSE_SECRET_KEY=sk-lf-tu_secret_key_aqui  
# LANGFUSE_HOST=https://cloud.langfuse.com
```

**Para configurar LangFuse**:
1. Ve a [https://cloud.langfuse.com](https://cloud.langfuse.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia las claves Public Key y Secret Key
5. Añádelas a tu archivo `.env`

> **Nota**: LangFuse es opcional. Si no lo configuras, el sistema funcionará normalmente sin observabilidad.

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

## 📊 Observabilidad con LangFuse

### ¿Qué es LangFuse?
LangFuse es una plataforma de observabilidad diseñada específicamente para aplicaciones de IA y LLM. Proporciona trazabilidad completa, métricas detalladas y debugging avanzado.

### Características Integradas

#### 🔍 **Trazabilidad Completa**
- **Traces por sesión**: Cada análisis multi-agentes se rastrea completamente
- **Spans detallados**: Cada agente (Investigador, Escritor, Verificador) genera su propio span
- **Input/Output logging**: Captura de entradas y salidas de cada paso

#### 📈 **Métricas y Analytics**
- **Tiempo de ejecución**: Duración de cada agente y del flujo completo
- **Uso de tokens**: Consumo detallado por agente y total
- **Tasa de éxito/error**: Monitoreo de la fiabilidad del sistema
- **Costo por operación**: Tracking de costos de API

#### 🐛 **Debugging Avanzado**
- **Error tracking**: Captura automática de errores con contexto
- **Log correlation**: Correlación entre logs de aplicación y traces
- **Performance profiling**: Identificación de cuellos de botella

### Visualización de Datos

#### Dashboard Principal
```
📊 Sistema Multi-Agentes Dashboard
┌─────────────────────────────────────┐
│ 📈 Métricas Generales               │
│ • Total de análisis: 1,245          │
│ • Tiempo promedio: 18.3s            │
│ • Tasa de éxito: 97.8%              │
│ • Tokens consumidos: 2.1M           │
└─────────────────────────────────────┘

🔍 Traces Recientes
┌─────────────────────────────────────┐
│ [18:45] "IA en medicina" ✅ 16.2s   │
│ [18:42] "blockchain" ✅ 22.1s       │
│ [18:38] "energía solar" ❌ 8.3s     │
│ [18:35] "machine learning" ✅ 19.7s │
└─────────────────────────────────────┘
```

#### Trace Individual
```
🔗 Trace: "inteligencia artificial en medicina"
├── 🔍 Investigador (5.2s)
│   ├── Input: {"tema": "inteligencia artificial en medicina"}
│   ├── Tokens: 1,247 (entrada) + 2,853 (salida)
│   └── Output: "La IA en medicina ha revolucionado..."
│
├── ✍️ Escritor (7.8s)  
│   ├── Input: {"informacion_length": 1,432}
│   ├── Tokens: 2,853 (entrada) + 1,967 (salida)
│   └── Output: "Introducción: La inteligencia artificial..."
│
└── 🔍 Verificador (4.7s)
    ├── Input: {"resumen_length": 987}
    ├── Tokens: 1,967 (entrada) + 2,234 (salida)  
    └── Output: "La inteligencia artificial en medicina..."
```

### Configuración Avanzada

#### Variables de Entorno
```bash
# LangFuse Configuration
LANGFUSE_PUBLIC_KEY=pk-lf-xxx...    # Clave pública del proyecto
LANGFUSE_SECRET_KEY=sk-lf-xxx...    # Clave secreta del proyecto
LANGFUSE_HOST=https://cloud.langfuse.com  # Host (cloud o self-hosted)
```

#### Personalización de Traces
El sistema permite personalizar la información capturada:

```python
# Ejemplo de configuración personalizada
monitor.create_trace(
    name="analisis_personalizado",
    input_data={"tema": tema, "usuario": user_id},
    metadata={
        "session_type": "premium_analysis",
        "version": "v1.1.0",
        "source": "web_interface"
    }
)
```

### Beneficios para Desarrollo

#### 🚀 **Optimización de Rendimiento**
- Identificación de agentes lentos
- Optimización de prompts
- Reducción de costos de API

#### 🔧 **Debugging Eficiente**
- Reproducción exacta de errores
- Análisis de fallos por agente
- Correlación temporal de eventos

#### 📊 **Insights de Negocio**
- Patrones de uso más comunes
- Temas más consultados
- Satisfacción del usuario (indirecta)

### Acceso al Dashboard

Una vez configurado, accede a tus traces en:
- **LangFuse Cloud**: [https://cloud.langfuse.com](https://cloud.langfuse.com)
- **Self-hosted**: Tu instancia privada

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