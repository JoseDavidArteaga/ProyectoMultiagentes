from langchain_groq import ChatGroq
from monitor.langfuse_config import monitor
import os
import logging

logger = logging.getLogger(__name__)

class Escritor:
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
                logger.info("✍️ Escritor: LangFuse callback configurado")
            
        self.llm = ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=api_key,
            temperature=0.3,
            callbacks=callbacks if callbacks else None
        )
        
    def ejecutar(self, texto):
        logger.info(f"✍️ Escritor procesando información de {len(texto)} caracteres")
        
        prompt = f"""Como escritor técnico experto, crea un resumen profesional basado en la siguiente información:

{texto}

Instrucciones:
1. Escribe un resumen claro y profesional para una audiencia general
2. Organiza la información en párrafos coherentes
3. Incluye los puntos más importantes
4. Usa un lenguaje accesible pero preciso
5. El resumen debe tener entre 200-400 palabras
6. Incluye una breve introducción y conclusión

Formato esperado:
- Introducción breve al tema
- Desarrollo de los puntos principales
- Conclusión con insights relevantes"""
        
        try:
            resultado = self.llm.invoke(prompt).content
            logger.info(f"✍️ Resumen completado - {len(resultado)} caracteres")
            return resultado
        except Exception as e:
            logger.error(f"❌ Error en escritura: {e}")
            raise