import apiClient from "./apiClient";
import { AppError } from "../utils/appError";
import type {
  Login,
  Register,
  Auth,
  User,
  ChangePassword,
} from "../interfaces/user.interface";

/*
 * Registrar un nuevo usuario y obtener el token de acceso
 */
export async function register(data: Register): Promise<Auth> {
  try {
    const response = await apiClient.post<Auth>("/auth/register", data);
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/*
 * Iniciar sesión y obtener el token de acceso
 */
export async function login(data: Login): Promise<Auth> {
  try {
    const response = await apiClient.post<Auth>("/auth/login", data);
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/*
 * Cerrar sesión (notifica al servidor y limpia el token local)
 */
export async function logout(): Promise<{ message: string }> {
  try {
    const response = await apiClient.post<{ message: string }>("/auth/logout");
    return response.data;
  } catch (error) {
    throw new AppError(error);
  } finally {
    localStorage.removeItem("token");
  }
}

/*
 * Obtener el perfil del usuario autenticado
 */
export async function getProfile(): Promise<User> {
  try {
    const response = await apiClient.get<User>("/users/me");
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

/*
 * Cambiar la contraseña del usuario autenticado
 */
export async function changePassword(data: ChangePassword): Promise<{ message: string }> {
  try {
    const response = await apiClient.patch<{ message: string }>("/users/me/password", data);
    return response.data;
  } catch (error) {
    throw new AppError(error);
  }
}

// ============================================================================
// VERSIÓN CON FETCH (Recomendada para Next.js)
// ============================================================================
import { apiFetch } from "./fetchClient";

/*
 * Registrar un nuevo usuario con fetch
 */
export async function registerFetch(data: Register): Promise<Auth> {
  const result = await apiFetch<Auth>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (result.accessToken && typeof window !== "undefined") {
    localStorage.setItem("token", result.accessToken);
  }
  return result;
}

/*
 * Iniciar sesión con fetch
 */
export async function loginFetch(data: Login): Promise<Auth> {
  const result = await apiFetch<Auth>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (result.accessToken && typeof window !== "undefined") {
    localStorage.setItem("token", result.accessToken);
  }
  return result;
}

/*
 * Cerrar sesión con fetch
 */
export async function logoutFetch(): Promise<{ message: string }> {
  try {
    return await apiFetch<{ message: string }>("/auth/logout", {
      method: "POST",
    });
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }
}

/*
 * Obtener perfil con fetch
 */
export async function getProfileFetch(): Promise<User> {
  return apiFetch<User>("/users/me", {
    cache: "no-store",
  });
}

/*
 * Cambiar contraseña con fetch
 */
export async function changePasswordFetch(data: ChangePassword): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/users/me/password", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}