# Sistema Multi-Agentes Inteligentes - Frontend

Una aplicación web moderna construida con React + Vite que permite a los usuarios analizar cualquier tema usando un sistema de agentes de IA colaborativa.

## ✨ Características

- 🎨 **Diseño moderno**: Estilo minimalista inspirado en Vercel y plataformas de IA
- 🤖 **IA Colaborativa**: Sistema de 3 agentes (Investigador, Escritor, Verificador)
- ⚡ **React + Vite**: Desarrollo rápido y optimizado
- 🎭 **TailwindCSS**: Estilos utilitarios con tema claro/oscuro
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- 🚀 **Optimizado**: Listo para producción

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework de CSS
- **Lucide React** - Iconos modernos
- **Fetch API** - Cliente HTTP nativo

## 🚀 Instalación y configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

Edita el archivo `.env` y configura la URL de tu API:
```env
# Para producción (Render)
VITE_API_URL=https://proyectomultiagentes.onrender.com

# Para desarrollo local
# VITE_API_URL=http://localhost:8000
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Form.jsx          # Formulario principal
│   └── Result.jsx        # Mostrar resultados
├── services/
│   └── api.js           # Cliente API
├── App.jsx              # Componente principal
├── main.jsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🔧 Comandos disponibles

```bash
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview

# Linting
npm run lint
```

## 🌐 Despliegue en Vercel

### 1. Preparar para despliegue

```bash
# Construir el proyecto
npm run build
```

### 2. Desplegar en Vercel

**Opción A: CLI de Vercel**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

**Opción B: GitHub**
1. Sube tu código a GitHub
2. Conecta tu repositorio en [vercel.com](https://vercel.com)
3. Configura las variables de entorno:
   - `VITE_API_URL`: URL de tu API backend

### 3. Configuración de Vercel

Crea un archivo `vercel.json` en la raíz del frontend:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🔗 API Backend

Este frontend consume la API de FastAPI desplegada en:
- **Producción**: https://proyectomultiagentes.onrender.com
- **Desarrollo**: http://localhost:8000

### Endpoints utilizados:

- `GET /health` - Verificar estado de la API
- `POST /procesar` - Analizar un tema

## 🎨 Personalización

### Colores y tema

Edita `tailwind.config.js` para personalizar los colores:

```js
theme: {
  extend: {
    colors: {
      'primary': {
        500: '#3b82f6',  // Azul principal
        600: '#2563eb',
      }
    }
  }
}
```

### Estilos globales

Modifica `src/index.css` para cambiar estilos base.

## 📊 Flujo de trabajo

1. **Usuario ingresa un tema** en el formulario
2. **Validación** del input en el frontend
3. **Petición POST** a `/procesar` con el tema
4. **Procesamiento** por los 3 agentes:
   - 🔍 Investigador: Busca información
   - ✍️ Escritor: Organiza y redacta
   - ✅ Verificador: Revisa y mejora
5. **Respuesta** con el análisis final
6. **Visualización** en una tarjeta elegante

## 🚨 Manejo de errores

La aplicación maneja:
- ❌ Errores de red (API offline)
- ⏱️ Timeouts (60 segundos)
- 🚫 Inputs vacíos o muy cortos
- 🔧 Errores del servidor (500)
- 📡 Estado de conexión de la API

## 🛡️ Mejores prácticas implementadas

- ✅ Validación de inputs
- ✅ Estados de carga
- ✅ Manejo de errores
- ✅ Accesibilidad básica
- ✅ Responsive design
- ✅ Optimización de performance
- ✅ SEO-friendly

## 📝 Licencia

MIT License - Siéntete libre de usar este código para tus proyectos.

## 🤝 Contribuir

1. Fork el repositorio
2. Crea tu rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
