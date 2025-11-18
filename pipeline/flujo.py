from langgraph.graph import StateGraph, START, END
from agentes.investigador import Investigador
from agentes.escritor import Escritor
from agentes.verificador import Verificador
from monitor.langfuse_config import monitor
from typing import TypedDict
import logging

logger = logging.getLogger(__name__)

# Estado compartido entre pasos
class Estado(TypedDict):
    tema: str
    informacion: str
    resumen: str
    final: str
    trace: object  # Para almacenar el trace de LangFuse



def flujo():
    investigador = Investigador()
    escritor = Escritor()
    verificador = Verificador()

    graph = StateGraph(Estado)

    # Paso 1: investigar
    def paso1(state: Estado) -> Estado:
        logger.info(f"🔍 Iniciando investigación sobre: {state['tema']}")
        
        try:
            # Crear trace si no existe
            if not state.get("trace") and monitor.is_enabled():
                trace = monitor.create_trace(
                    name="multi_agent_analysis",
                    input_data={"tema": state["tema"]},
                    metadata={"session_type": "multi_agent_workflow"}
                )
                state = {**state, "trace": trace}
            
            # Ejecutar investigación
            informacion = investigador.ejecutar(state["tema"])
            
            # Log en LangFuse
            if state.get("trace") and monitor.is_enabled():
                monitor.log_agent_step(
                    trace=state["trace"],
                    agent_name="investigador",
                    input_data={"tema": state["tema"]},
                    output_data={"informacion": informacion[:500] + "..." if len(informacion) > 500 else informacion},
                    metadata={"step": 1, "agent_type": "research"}
                )
            
            logger.info("✅ Investigación completada")
            return {**state, "informacion": informacion}
            
        except Exception as e:
            logger.error(f"❌ Error en investigación: {e}")
            if state.get("trace") and monitor.is_enabled():
                monitor.log_error(state["trace"], e, {"step": "investigacion"})
            raise

    # Paso 2: escribir
    def paso2(state: Estado) -> Estado:
        logger.info("✍️ Iniciando escritura del resumen")
        
        try:
            resumen = escritor.ejecutar(state["informacion"])
            
            # Log en LangFuse
            if state.get("trace") and monitor.is_enabled():
                monitor.log_agent_step(
                    trace=state["trace"],
                    agent_name="escritor",
                    input_data={"informacion_length": len(state["informacion"])},
                    output_data={"resumen": resumen[:500] + "..." if len(resumen) > 500 else resumen},
                    metadata={"step": 2, "agent_type": "writing"}
                )
            
            logger.info("✅ Escritura completada")
            return {**state, "resumen": resumen}
            
        except Exception as e:
            logger.error(f"❌ Error en escritura: {e}")
            if state.get("trace") and monitor.is_enabled():
                monitor.log_error(state["trace"], e, {"step": "escritura"})
            raise

    # Paso 3: verificar
    def paso3(state: Estado) -> Estado:
        logger.info("🔍 Iniciando verificación final")
        
        try:
            final = verificador.ejecutar(state["resumen"])
            
            # Log en LangFuse
            if state.get("trace") and monitor.is_enabled():
                monitor.log_agent_step(
                    trace=state["trace"],
                    agent_name="verificador",
                    input_data={"resumen_length": len(state["resumen"])},
                    output_data={"final": final[:500] + "..." if len(final) > 500 else final},
                    metadata={"step": 3, "agent_type": "verification"}
                )
                
                # Finalizar trace
                monitor.finalize_trace(
                    trace=state["trace"],
                    output_data={"resultado_final": final},
                    metadata={
                        "total_steps": 3,
                        "workflow_status": "completed",
                        "tema_original": state["tema"]
                    }
                )
            
            logger.info("✅ Verificación completada - Proceso terminado")
            return {**state, "final": final}
            
        except Exception as e:
            logger.error(f"❌ Error en verificación: {e}")
            if state.get("trace") and monitor.is_enabled():
                monitor.log_error(state["trace"], e, {"step": "verificacion"})
            raise

    # Registrar nodos
    graph.add_node("investigar", paso1)
    graph.add_node("escribir", paso2)
    graph.add_node("verificar", paso3)

    # Conexiones
    graph.add_edge(START, "investigar")
    graph.add_edge("investigar", "escribir")
    graph.add_edge("escribir", "verificar")
    graph.add_edge("verificar", END)

    # Compilar grafo final
    app = graph.compile()
    return app
