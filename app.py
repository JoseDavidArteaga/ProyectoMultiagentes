from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pipeline.flujo import flujo
import asyncio
from typing import Dict, Any
import uvicorn
import os
import logging
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear la aplicación FastAPI
app = FastAPI(
    title="Sistema Multi-Agentes",
    description="API para procesar información usando un flujo de investigación, escritura y verificación",
    version="1.0.0"
)

# Variable global para el flujo (se inicializa cuando se necesite)
langgraph_app = None

def get_langgraph_app():
    """Inicializar el flujo de LangGraph solo cuando se necesite"""
    global langgraph_app
    if langgraph_app is None:
        langgraph_app = flujo()
    return langgraph_app

# Modelo para la petición
class TemaRequest(BaseModel):
    tema: str
    
# Modelo para la respuesta
class TemaResponse(BaseModel):
    tema: str
    informacion: str
    resumen: str
    final: str
    success: bool

@app.get("/")
def root():
    """Endpoint de salud"""
    return {
        "message": "Sistema Multi-Agentes API",
        "status": "active",
        "endpoints": {
            "POST /procesar": "Procesa un tema a través del flujo de agentes",
            "GET /health": "Verificar estado del servicio"
        }
    }

@app.get("/health")
def health_check():
    """Verificar el estado del servicio"""
    return {"status": "healthy", "service": "multi-agentes-api"}

@app.post("/procesar", response_model=TemaResponse)
def procesar_tema(request: TemaRequest):
    """
    Procesar un tema a través del flujo de agentes:
    1. Investigar información sobre el tema
    2. Escribir un resumen claro
    3. Verificar y mejorar el resultado final
    """
    try:
        if not request.tema.strip():
            raise HTTPException(status_code=400, detail="El tema no puede estar vacío")
        
        logger.info(f"Procesando tema: {request.tema}")
        
        # Verificar que tenemos la API key
        if not os.getenv("GROQ_API_KEY"):
            logger.error("GROQ_API_KEY no configurada")
            raise HTTPException(
                status_code=500, 
                detail="GROQ_API_KEY no está configurada. Por favor configura tu clave de API de Groq."
            )
        
        # Obtener el flujo de LangGraph
        logger.info("Inicializando flujo de LangGraph")
        app_flujo = get_langgraph_app()
        
        # Ejecutar el flujo de LangGraph
        logger.info("Ejecutando flujo de LangGraph")
        resultado = app_flujo.invoke({"tema": request.tema})
        
        logger.info("Flujo ejecutado exitosamente")
        return TemaResponse(
            tema=request.tema,
            informacion=resultado.get("informacion", ""),
            resumen=resultado.get("resumen", ""),
            final=resultado.get("final", ""),
            success=True
        )
        
    except Exception as e:
        logger.error(f"Error procesando tema: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error procesando el tema: {str(e)}")

# Para desarrollo local
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("app:app", host="0.0.0.0", port=port)