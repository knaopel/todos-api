export async function handleResponse(response) {
  if (response.ok) {
    if (response.status === 204) {
      return {};
    } else {
      return response.json();
    }
  }
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

export function handleError(error) {
  // console.error('API call failed.', error);
  throw error;
}

export const getHeaders = auth_token => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: auth_token,
  };
};

export const handleAxiosResponse = response => {
  switch (response.status) {
    case 200:
    default:
      return response.data;
  }
};
