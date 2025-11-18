from langchain_groq import ChatGroq
import os

class Escritor:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY no está configurada")
            
        self.llm = ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=api_key,
            temperature=0.3
        )
        
    def ejecutar(self, texto):
        prompt = f"Con base en estos datos:\n{texto}\n\nGenera un resumen claro para una persona que no sabe del tema."
        return self.llm.invoke(prompt).content