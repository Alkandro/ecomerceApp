import { authFetch } from "../lib";
import { ENV } from "../utils";

async function getAllAddresses(userId) {
  try {
    const filters = `filters[user][id][$eq]=${userId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}?${filters}`;

    const response = await authFetch(url);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getAddresById(addressId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    const response = await authFetch(url);

    if (response.status !== 200) throw response;

    const result = await response.json();
    console.log("Direcciones obtenidas:", result); // 👈 Agrega esto

    return { ...result.data.attributes, id: result.data.id };
  } catch (error) {
    console.error("Error obteniendo direcciones:", error); // 👈 Agrega esto
    throw error;
  }
}

async function createAddress(userId, data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...data,
          user: userId,
        },
      }),
    };

    const response = await authFetch(url, params);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function updateAddress(addressId, data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    };

    const response = await authFetch(url, params);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function deleteAddress(addressId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await authFetch(url, params);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la dirección:", error); // 👈 Agrega este log para ver qué error ocurre
    throw error;
  }
}


export const addressCtrl = {
  getAll: getAllAddresses,
  get: getAddresById,
  create: createAddress,
  update: updateAddress,
  delete: deleteAddress,
};
