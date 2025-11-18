// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://proyectomultiagentes.onrender.com';

/**
 * Procesa un tema usando la API de multi-agentes
 * @param {string} tema - El tema a procesar
 * @returns {Promise<Object>} - Respuesta de la API con el resultado
 */
export async function procesarTema(tema) {
  if (!tema || tema.trim() === '') {
    throw new Error('El tema no puede estar vacío');
  }

  try {
    const controller = new AbortController();
    
    // Timeout de 60 segundos (el backend puede tardar procesando)
    const timeoutId = setTimeout(() => controller.abort(), 60000);
    
    const response = await fetch(`${API_BASE_URL}/procesar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tema: tema.trim()
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error('Error interno del servidor. Por favor, intenta nuevamente.');
      } else if (response.status >= 400) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Error en la solicitud');
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.detail || 'Error procesando el tema');
    }

    return data;
    
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('La solicitud tardó demasiado tiempo. Por favor, intenta con un tema más específico.');
    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    } else {
      throw error;
    }
  }
}

/**
 * Verifica si la API está disponible
 * @returns {Promise<boolean>} - True si la API está disponible
 */
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}