from langchain_groq import ChatGroq
from monitor.langfuse_config import monitor
import os
import logging

logger = logging.getLogger(__name__)

class Investigador:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY no está configurada")
        
        # Configurar LLM con callback de LangFuse si está disponible
        callbacks = []
        if monitor.is_enabled():
            callback = monitor.get_callback_handler()
            if callback:
                callbacks.append(callback)
                logger.info("🔍 Investigador: LangFuse callback configurado")
        
        self.llm = ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=api_key,
            temperature=0.1,
            callbacks=callbacks if callbacks else None
        )

    def ejecutar(self, tema):
        logger.info(f"🔍 Investigador ejecutando búsqueda sobre: {tema}")
        
        prompt = f"""Como investigador experto, busca y proporciona información actual y relevante sobre: {tema}
        
        Instrucciones:
        1. Proporciona exactamente 5 datos importantes y actuales
        2. Cada dato debe ser específico y verificable
        3. Incluye información contextual relevante
        4. Organiza la información de forma clara
        
        Formato de respuesta:
        1. [Dato específico con contexto]
        2. [Dato específico con contexto]
        3. [Dato específico con contexto]
        4. [Dato específico con contexto]
        5. [Dato específico con contexto]
        
        Tema: {tema}"""
        
        try:
            resultado = self.llm.invoke(prompt).content
            logger.info(f"🔍 Investigación completada - {len(resultado)} caracteres")
            return resultado
        except Exception as e:
            logger.error(f"❌ Error en investigación: {e}")
            raise
