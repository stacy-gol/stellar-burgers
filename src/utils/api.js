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
  console.log('response', response)

    return checkResponse(response);
    
};

export async function sendPasswordResetEmail(email) {
  return await request('/api/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
}