import { getCookie, setCookie } from "../../src/utils/cookies";
export const BASE_URL = "https://norma.nomoreparties.space";

export const checkResponse = async (response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const request = async (endpoint, options) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
  return checkResponse(response);
} catch (error) {
  throw error;
}
};

export async function resetPassword(password, token) {
  return await request("/api/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  });
}

export async function sendPasswordResetEmail(email) {
  return await request("/api/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

export async function getUser() {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    throw new Error("No access token found"); 
  }
  return request("/api/auth/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

export async function register(email, password, name) {
  const data = await request("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  setCookie("accessToken", data.accessToken.split('Bearer ')[1], { expires: 3600 });
  setCookie("refreshToken", data.refreshToken, { expires: 7 * 24 * 3600 });
  return data.user;
}

export async function login(credentials) {
  const data = await request("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  setCookie("accessToken", data.accessToken.split('Bearer ')[1], { expires: 3600 });
  setCookie("refreshToken", data.refreshToken, { expires: 7 * 24 * 3600 });
  return data.user;
}

export async function logout() {
  const refreshToken = getCookie("refreshToken");
  const data = await request("/api/auth/logout", {
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

export async function refreshAccessToken() {
  const refreshToken = getCookie("refreshToken");
  const data = await request("/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  if (data.success) {
    setCookie("accessToken", data.accessToken, { expires: 3600 });
    setCookie("refreshToken", data.refreshToken, { expires: 7 * 24 * 3600 });
  }
  return data.accessToken;
}
