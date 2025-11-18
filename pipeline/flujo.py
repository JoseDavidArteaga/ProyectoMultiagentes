from langgraph.graph import StateGraph, START, END
from agentes.investigador import Investigador
from agentes.escritor import Escritor
from agentes.verificador import Verificador
from typing import TypedDict


# Estado compartido entre pasos
class Estado(TypedDict):
    tema: str
    informacion: str
    resumen: str
    final: str



def flujo():
    investigador = Investigador()
    escritor = Escritor()
    verificador = Verificador()

    graph = StateGraph(Estado)

    # Paso 1: investigar
    def paso1(state: Estado) -> Estado:
        return {
            **state,
            "informacion": investigador.ejecutar(state["tema"])
        }

    # Paso 2: escribir
    def paso2(state: Estado) -> Estado:
        return {
            **state,
            "resumen": escritor.ejecutar(state["informacion"])
        }

    # Paso 3: verificar
    def paso3(state: Estado) -> Estado:
        return {
            **state,
            "final": verificador.ejecutar(state["resumen"])
        }

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
