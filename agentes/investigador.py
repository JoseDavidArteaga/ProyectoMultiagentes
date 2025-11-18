from langchain_groq import ChatGroq
import os

class Investigador:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY no está configurada")
        
        self.llm = ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=api_key,
            temperature=0.1
        )

    def ejecutar(self, tema):
        prompt = f"Busca información actual sobre: {tema}. Devuélvela en máximo 5 datos importantes."
        return self.llm.invoke(prompt).content
