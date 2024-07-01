import { getCookie } from "../../src/utils/cookies";
export const BASE_URL = "https://norma.nomoreparties.space";

export const checkResponse = async (response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw data;
  }
  return data;
};

export const request = async (endpoint, options) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  console.log("response", response);

  return checkResponse(response);
};

export async function resetPassword(data) {
  return await request("/api/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
  const accessToken = localStorage.getItem("accessToken");
  return request("/api/auth/user", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getCookie("accessToken"),
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

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
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
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
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
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
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
    localStorage.setItem("refreshToken", data.refreshToken);
  }
  return data.accessToken;
}
