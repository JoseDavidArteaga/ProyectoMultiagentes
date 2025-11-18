from langchain_groq import ChatGroq
from monitor.langfuse_config import monitor
import os
import logging

logger = logging.getLogger(__name__)

class Verificador:
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
                logger.info("🔍 Verificador: LangFuse callback configurado")
            
        self.llm = ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=api_key,
            temperature=0.2,
            callbacks=callbacks if callbacks else None
        )
        
    def ejecutar(self, resumen):
        logger.info(f"🔍 Verificador validando resumen de {len(resumen)} caracteres")
        
        prompt = f"""Como verificador y editor experto, revisa el siguiente resumen y mejóralo:

{resumen}

Tareas de verificación:
1. Verifica la coherencia y fluidez del texto
2. Corrige cualquier error gramatical o de sintaxis
3. Mejora la estructura si es necesario
4. Asegúrate de que la información sea precisa y bien presentada
5. Añade transiciones entre párrafos si faltan
6. Mejora la claridad y legibilidad

Devuelve el texto final mejorado, manteniendo toda la información importante pero con mejor calidad y estructura.

El resultado debe ser:
- Gramaticalmente correcto
- Bien estructurado
- Fácil de leer
- Profesional y técnicamente preciso"""
        
        try:
            resultado = self.llm.invoke(prompt).content
            logger.info(f"🔍 Verificación completada - {len(resultado)} caracteres")
            return resultado
        except Exception as e:
            logger.error(f"❌ Error en verificación: {e}")
            raise