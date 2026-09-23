/**
 * fetchClient.ts
 * 
 * Cliente HTTP reutilizable basado en el `fetch` nativo de Next.js.
 * 
 * Características clave para Next.js:
 * 1. Soporta Server Components y Client Components ("use client").
 * 2. Permite pasar opciones de caché de Next.js (`next: { revalidate: 60, tags: ['...'] }`).
 * 3. Inyecta el token Bearer automáticamente si se llama desde el cliente (navegador).
 * 4. Maneja serialización de query parameters y respuestas JSON.
 * 5. Rechaza automáticamente ante códigos 4xx o 5xx con un error claro.
 */

// En Next.js las variables públicas usan el prefijo NEXT_PUBLIC_
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;

  // 1. Construir URL completa agregando query params si se proporcionan
  let url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // 2. Cabeceras por defecto
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // 3. Adjuntar token JWT solo si estamos en el navegador (en cliente)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      (defaultHeaders as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  // 4. Realizar la petición con el fetch de Next.js
  const response = await fetch(url, {
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customConfig,
  });

  // 5. Manejo de error si la respuesta no es 2xx
  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }

    const message =
      errorData && typeof errorData === "object" && "message" in errorData
        ? Array.isArray((errorData as { message: unknown }).message)
          ? (errorData as { message: string[] }).message.join(", ")
          : String((errorData as { message: unknown }).message)
        : `Error HTTP ${response.status}: ${response.statusText}`;

    // Si es 401 en el cliente, podemos limpiar la sesión
    if (response.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    throw new ApiError(message, response.status, errorData);
  }

  // 6. Si es un 204 No Content, no intentamos parsear JSON
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export default apiFetch;
