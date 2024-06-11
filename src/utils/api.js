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
    return checkResponse(response);
};
