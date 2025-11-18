from langfuse import Langfuse

lf = Langfuse()
def trazar(nombre, metadata):
    trace = lf.trace(name=nombre)
    trace.event(nombre, metadata=metadata)
    
