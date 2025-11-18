import requests
import json

# Configuración
BASE_URL = "http://localhost:8000"

def test_health():
    """Probar endpoint de salud"""
    response = requests.get(f"{BASE_URL}/health")
    print("🏥 Test Health:")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_proceso(tema):
    """Probar el procesamiento de un tema"""
    data = {"tema": tema}
    response = requests.post(f"{BASE_URL}/procesar", json=data)
    print(f"🚀 Test Procesamiento - Tema: '{tema}'")
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("✅ Éxito!")
        print(f"📝 Resultado final: {result['final'][:200]}...")
    else:
        print("❌ Error!")
        print(f"Error: {response.text}")
    print()

def main():
    print("🧪 Probando API del Sistema Multi-Agentes")
    print("=" * 50)
    
    # Probar salud del servicio
    try:
        test_health()
    except requests.exceptions.ConnectionError:
        print("❌ No se puede conectar al servidor. ¿Está corriendo la API?")
        print("💡 Ejecuta: uvicorn app:app --reload")
        return
    
    # Probar procesamiento
    temas_prueba = [
        "energía solar",
        "inteligencia artificial",
        "cambio climático"
    ]
    
    for tema in temas_prueba:
        try:
            test_proceso(tema)
        except Exception as e:
            print(f"❌ Error procesando '{tema}': {e}")

if __name__ == "__main__":
    main()