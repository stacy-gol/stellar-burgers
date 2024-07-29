import {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  User,
} from "../services/types";
import { getCookie, setCookie } from "./cookies";

export const BASE_URL = "https://norma.nomoreparties.space";

export const checkResponse = async <T>(response: Response): Promise<T> => {
  const data: ApiResponse<T> = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Something went wrong");
  }
  return data.data ? data.data : (data as unknown as T);
};

export const request = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    return checkResponse<T>(response);
  } catch (error) {
    throw error;
  }
};

export async function resetPassword(
  password: string,
  token: string
): Promise<{ success: boolean }>  {
  return await request("/api/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  });
}

export async function sendPasswordResetEmail(
  email: string
): Promise<{ success: boolean }> {
  return await request("/api/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

export async function getUser(): Promise<User> {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    throw new Error("No access token found");
  }
  return request<User>("/api/auth/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

export async function register(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const data = await request<AuthResponse>("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  setCookie("accessToken", data.accessToken.split("Bearer ")[1], {
    expires: 3600,
  });
  setCookie("refreshToken", data.refreshToken, { expires: 7 * 24 * 3600 });
  return data.user;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse>  {
  const data = await request<AuthResponse>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  setCookie("accessToken", data.accessToken.split('Bearer ')[1], { expires: 3600 });
  setCookie("refreshToken", data.refreshToken, { expires: 7 * 24 * 3600 });
  return {
    success: data.success,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: data.user as User,
  };
}

export async function logout(): Promise<string> {
  const refreshToken = getCookie("refreshToken");
  const data = await request<{ message: string }>("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  setCookie("accessToken", "", { expires: -1 });
  setCookie("refreshToken", "", { expires: -1 });
  return data.message;
}

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = getCookie("refreshToken");
  const data = await request<AuthResponse>("/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  setCookie("accessToken", data.accessToken, { expires: 3600 });
  setCookie("refreshToken", data.refreshToken, { expires: 7 * 24 * 3600 });
  return data.accessToken;
}
