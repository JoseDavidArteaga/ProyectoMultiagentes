import os
from dotenv import load_dotenv
import logging

# Cargar variables de entorno
load_dotenv()

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LangFuseMonitor:
    """Monitor para observabilidad del sistema multi-agentes con LangFuse"""
    
    def __init__(self):
        self.langfuse = None
        self.callback_handler = None
        self.initialize()
    
    def initialize(self):
        """Inicializar LangFuse con configuración desde variables de entorno"""
        try:
            # Intentar importar LangFuse
            from langfuse import Langfuse
            from langfuse.langchain import CallbackHandler
            
            # Obtener credenciales desde variables de entorno
            public_key = os.getenv('LANGFUSE_PUBLIC_KEY')
            secret_key = os.getenv('LANGFUSE_SECRET_KEY')
            host = os.getenv('LANGFUSE_HOST', 'https://cloud.langfuse.com')
            
            if public_key and secret_key:
                self.langfuse = Langfuse(
                    public_key=public_key,
                    secret_key=secret_key,
                    host=host
                )
                
                # Crear callback handler para LangChain
                self.callback_handler = CallbackHandler(
                    public_key=public_key,
                    secret_key=secret_key,
                    host=host
                )
                
                logger.info("✅ LangFuse inicializado correctamente")
            else:
                logger.warning("⚠️ LangFuse no configurado - faltan credenciales")
                self.langfuse = None
                
        except ImportError:
            logger.warning("⚠️ LangFuse no instalado - funcionando sin observabilidad")
            self.langfuse = None
        except Exception as e:
            logger.error(f"❌ Error inicializando LangFuse: {e}")
            self.langfuse = None
    
    def is_enabled(self):
        """Verificar si LangFuse está habilitado"""
        return self.langfuse is not None
    
    def create_trace(self, name, input_data=None, metadata=None):
        """Crear un nuevo trace"""
        if not self.is_enabled():
            return None
            
        try:
            trace = self.langfuse.trace(
                name=name,
                input=input_data,
                metadata=metadata or {}
            )
            return trace
        except Exception as e:
            logger.error(f"Error creando trace: {e}")
            return None
    
    def log_agent_step(self, trace, agent_name, input_data, output_data, metadata=None):
        """Registrar un paso de agente"""
        if not trace:
            return None
            
        try:
            span = trace.span(
                name=f"agent_{agent_name}",
                input=input_data,
                output=output_data,
                metadata={
                    "agent": agent_name,
                    "timestamp": self._get_timestamp(),
                    **(metadata or {})
                }
            )
            return span
        except Exception as e:
            logger.error(f"Error registrando paso de agente {agent_name}: {e}")
            return None
    
    def log_error(self, trace, error, context=None):
        """Registrar un error"""
        if not trace:
            return
            
        try:
            trace.event(
                name="error",
                metadata={
                    "error": str(error),
                    "error_type": type(error).__name__,
                    "context": context or {},
                    "timestamp": self._get_timestamp()
                }
            )
        except Exception as e:
            logger.error(f"Error registrando error en LangFuse: {e}")
    
    def finalize_trace(self, trace, output_data=None, metadata=None):
        """Finalizar un trace"""
        if not trace:
            return
            
        try:
            trace.update(
                output=output_data,
                metadata={
                    "completed_at": self._get_timestamp(),
                    **(metadata or {})
                }
            )
            # Forzar envío de datos
            if self.langfuse:
                self.langfuse.flush()
        except Exception as e:
            logger.error(f"Error finalizando trace: {e}")
    
    def _get_timestamp(self):
        """Obtener timestamp actual"""
        from datetime import datetime
        return datetime.now().isoformat()
    
    def get_callback_handler(self):
        """Obtener callback handler para LangChain"""
        return self.callback_handler

# Instancia global del monitor
monitor = LangFuseMonitor()

# Funciones de conveniencia para backward compatibility
def trazar(nombre, metadata=None):
    """Función legacy para crear traces"""
    return monitor.create_trace(nombre, metadata=metadata)

def get_langfuse_callback():
    """Obtener callback handler para usar con LangChain"""
    return monitor.get_callback_handler()

