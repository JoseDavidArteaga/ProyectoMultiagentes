# Sistema Multi-Agentes API

API REST construida con FastAPI que implementa un flujo de procesamiento de información usando LangGraph y múltiples agentes especializados.

## Funcionalidad

El sistema procesa cualquier tema a través de tres agentes:
1. **Investigador**: Busca información actual sobre el tema
2. **Escritor**: Genera un resumen claro y comprensible
3. **Verificador**: Revisa y mejora el resultado final

## Endpoints

### `POST /procesar`
Procesa un tema a través del flujo completo de agentes.

**Request:**
```json
{
    "tema": "inteligencia artificial"
}
```

**Response:**
```json
{
    "tema": "inteligencia artificial",
    "informacion": "Información investigada...",
    "resumen": "Resumen claro...",
    "final": "Resultado final verificado...",
    "success": true
}
```

### `GET /health`
Verificar el estado del servicio.

### `GET /`
Información general de la API.

## Instalación Local

1. Clona el repositorio
2. Instala las dependencias:
```bash
pip install -r requirements.txt
```

3. Configura tu API key de Groq:
```bash
export GROQ_API_KEY=tu_clave_aqui
```

4. Ejecuta la aplicación:
```bash
uvicorn app:app --reload
```

La API estará disponible en `http://localhost:8000`

## Despliegue

### Render

1. Conecta tu repositorio de GitHub a Render
2. Crea un nuevo "Web Service"
3. Configura la variable de entorno `GROQ_API_KEY`
4. Render detectará automáticamente el `render.yaml`

### Railway

1. Conecta tu repositorio a Railway
2. Configura la variable de entorno `GROQ_API_KEY`
3. Railway detectará automáticamente el `Procfile`

## Variables de Entorno

- `GROQ_API_KEY`: **Obligatorio** - Tu clave de API de Groq
- `PORT`: Puerto del servidor (configurado automáticamente en la nube)

## Documentación Automática

Una vez desplegada, puedes acceder a la documentación interactiva en:
- `/docs` - Swagger UI
- `/redoc` - ReDoc

## Tecnologías

- **FastAPI**: Framework web moderno y rápido
- **LangGraph**: Orquestación de agentes con grafos
- **LangChain**: Integración con modelos de lenguaje
- **Groq**: Inferencia rápida de modelos LLM