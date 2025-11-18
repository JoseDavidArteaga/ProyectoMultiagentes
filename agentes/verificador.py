from langchain_groq import ChatGroq
import os

class Verificador:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY no está configurada")
            
        self.llm = ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=api_key,
            temperature=0.2
        )
        
    def ejecutar(self, resumen):
        prompt = f"Revisa este resumen:\n{resumen}\n\nCorrige errores y mejora la claridad."
        return self.llm.invoke(prompt).content