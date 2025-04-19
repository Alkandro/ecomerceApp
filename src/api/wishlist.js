import { size } from "lodash";
import { authFetch } from "../lib";
import { ENV } from "../utils";

async function addWishlist(userId, productId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          user: userId,
          product: productId,
        },
      }),
    };

    const response = await authFetch(url, params);

    // Aceptar tanto 200 (OK) como 201 (Created) como respuestas exitosas
    if (response.status !== 200 && response.status !== 201) {
      const error = await response.json(); // Intenta parsear el cuerpo del error
      throw error;
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
async function checkWishlist(userId, productId) {
  try {
    const filterUser = `filters[user][id][$eq]=${userId}`;
    const filterProduct = `filters[product][id][$eq]=${productId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${filterUser}&${filterProduct}`;
    
    const response = await authFetch(url);

    if (response.status !== 200) throw response;

    const result = await response.json();
    if (size(result.data) === 0) {
      return false;
    }

    return result.data[0]; // Retorna el objeto con el ID para eliminar
  } catch (error) {
    throw error;
  }
}


async function deleteWishlist(userId, productId) {
  try {
    console.log("Intentando eliminar producto ID:", productId, "para usuario ID:", userId);
    const dataFound = await checkWishlist(userId, productId);
    console.log("Resultado de checkWishlist en delete:", dataFound);

    if (dataFound) {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${dataFound.id}`;
      const params = { method: "DELETE" };
      const response = await authFetch(url, params);
      console.log("Respuesta de authFetch (DELETE):", response);

      if (response.status !== 200 && response.status !== 204) throw response;

      console.log("Eliminación exitosa");
      return true;
    } else {
      console.log("No se encontró la entrada en la lista de deseos");
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar de la lista de deseos:", error);
    throw error;
  }
}


async function getAllProductWishlist(userId) {
  try {
    const userFilters = `filters[user][id][$eq]=${userId}`;
    const populate = "populate[0]=product&populate[1]=product.main_image";
    const filters = `${userFilters}&${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${filters}`;

    const response = await authFetch(url);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const wishlistCtrl = {
  add: addWishlist,
  check: checkWishlist,
  delete: deleteWishlist,
  getAllProducts: getAllProductWishlist,
};
