import apiClient from "./apiClient";
import { AppError } from "../utils/appError";
import type {
  Category,
  CreateCategory,
  UpdateCategory,
} from "../interfaces/category.interface";

/**
 * Listar todas las categorías (público)
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get<Category[]>("/categories");
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/**
 * Obtener una categoría por ID (público)
 */
export async function getCategoryById(id: string): Promise<Category> {
  try {
    const response = await apiClient.get<Category>(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/**
 * Crear una categoría (requiere JWT y rol admin)
 */
export async function createCategory(data: CreateCategory): Promise<Category> {
  try {
    const response = await apiClient.post<Category>("/categories", data);
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/**
 * Actualizar una categoría (requiere JWT y rol admin)
 */
export async function updateCategory(id: string, data: UpdateCategory): Promise<Category> {
  try {
    const response = await apiClient.patch<Category>(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/**
 * Eliminar una categoría (requiere JWT y rol admin)
 */
export async function deleteCategory(id: string): Promise<void> {
  try {
    await apiClient.delete(`/categories/${id}`);
  } catch (error) {
    throw new AppError(error);
  }
}

// ============================================================================
// VERSIÓN CON FETCH (Recomendada para Next.js Server & Client Components)
// ============================================================================
import { apiFetch } from "./fetchClient";

/**
 * Listar todas las categorías con fetch nativo.
 * Soporta opciones de caché de Next.js (ej: revalidar cada 60 segundos o bajo demanda con tags).
 */
export async function getAllCategoriesFetch(revalidate: number | false = 60): Promise<Category[]> {
  return apiFetch<Category[]>("/categories", {
    next: { revalidate, tags: ["categories"] },
  });
}

/**
 * Obtener una categoría por ID con fetch.
 */
export async function getCategoryByIdFetch(id: string): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`, {
    next: { tags: [`category-${id}`] },
  });
}

/**
 * Crear una categoría con fetch (requiere JWT).
 */
export async function createCategoryFetch(data: CreateCategory): Promise<Category> {
  return apiFetch<Category>("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Actualizar una categoría con fetch (requiere JWT).
 */
export async function updateCategoryFetch(id: string, data: UpdateCategory): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * Eliminar una categoría con fetch (requiere JWT).
 */
export async function deleteCategoryFetch(id: string): Promise<void> {
  return apiFetch<void>(`/categories/${id}`, {
    method: "DELETE",
  });
}