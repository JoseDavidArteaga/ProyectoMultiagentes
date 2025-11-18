from pipeline.flujo import flujo

app = flujo()

tema = input("¿Sobre qué quieres información?: ")
resultado = app.invoke({"tema": tema})

print("\n📘 Resultado final:")
print(resultado["final"])
