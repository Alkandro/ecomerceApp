import { storageCrtl } from "../api/storage";
import { fn } from "../utils";

export async function authFetch(url, params) {
  const token = await storageCrtl.getToken();

  const logout = async () => {
    await storageCrtl.removeToken();
  };

  if (!token) {
    logout();
    return null; // O lanza un error, dependiendo de cómo quieras manejar la falta de token
  } else {
    if (fn.hasTokenExpired(token)) {
      logout();
      return null; // O lanza un error
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, paramsTemp);

        // Verificar si la respuesta es exitosa (código de estado 2xx)
        if (!response.ok) {
          const error = await response.json(); // Intenta parsear el cuerpo del error como JSON
          throw error; // Lanza el error para que el catch en addWishlist lo maneje
        }

        return response; // Devuelve la respuesta si fue exitosa
      } catch (error) {
        throw error; // Lanza errores de red u otros fallos
      }
    }
  }
}