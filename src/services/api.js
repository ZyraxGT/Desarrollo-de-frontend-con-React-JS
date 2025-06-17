const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const obtenerUsuarios = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const guardarUsuario = async (usuario) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const data = await response.json();
  return data;
};
