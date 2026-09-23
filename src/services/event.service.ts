import apiClient from "./apiClient";
import { AppError } from "../utils/appError";
import type {
  Event,
  CreateEvent,
  UpdateEvent,
  EventQuery,
} from "../interfaces/event.interface";

/**
 * Listar Eventos
 */
export async function getAllEvents(query?: EventQuery): Promise<Event[]> {
  try {
    const response = await apiClient.get<Event[]>("/events", {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/**
 * Obtener el detalle de un Evento por ID
 */
export async function getEventById(id: string): Promise<Event> {
  try {
    const response = await apiClient.get<Event>(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/**
 * Crear un nuevo Evento (requiere JWT)
 */
export async function createEvent(data: CreateEvent): Promise<Event> {
  try {
    const response = await apiClient.post<Event>("/events", data);
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/**
 * Actualizar un Evento existente (requiere JWT)
 */
export async function updateEvent(id: string, data: UpdateEvent): Promise<Event> {
  try {
    const response = await apiClient.patch<Event>(`/events/${id}`, data);
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/**
 * Eliminar un Evento por ID (requiere JWT)
 */
export async function deleteEvent(id: string): Promise<void> {
  try {
    await apiClient.delete(`/events/${id}`);
  } catch (error) {
    throw new AppError(error);
  }
}

// ============================================================================
// VERSIÓN CON FETCH (Recomendada para Next.js Server & Client Components)
// ============================================================================
import { apiFetch } from "./fetchClient";

/**
 * Listar eventos con fetch nativo.
 * Soporta query params y opciones de caché/revalidación de Next.js.
 */
export async function getAllEventsFetch(
  query?: EventQuery,
  revalidate: number | false = 60
): Promise<Event[]> {
  return apiFetch<Event[]>("/events", {
    params: query as Record<string, string | number | boolean | undefined>,
    next: { revalidate, tags: ["events"] },
  });
}

/**
 * Obtener detalle de un evento por ID con fetch.
 */
export async function getEventByIdFetch(id: string): Promise<Event> {
  return apiFetch<Event>(`/events/${id}`, {
    next: { tags: [`event-${id}`] },
  });
}

/**
 * Crear un nuevo evento con fetch (requiere JWT).
 */
export async function createEventFetch(data: CreateEvent): Promise<Event> {
  return apiFetch<Event>("/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Actualizar un evento con fetch (requiere JWT).
 */
export async function updateEventFetch(id: string, data: UpdateEvent): Promise<Event> {
  return apiFetch<Event>(`/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * Eliminar un evento con fetch (requiere JWT).
 */
export async function deleteEventFetch(id: string): Promise<void> {
  return apiFetch<void>(`/events/${id}`, {
    method: "DELETE",
  });
}