import AsyncStorage from "@react-native-async-storage/async-storage";
import { map, forEach } from "lodash";
import { ENV } from "../utils";

// Obtiene el carrito almacenado
async function getAllProducts() {
  const response = await AsyncStorage.getItem(ENV.STORAGE.CART);
  return response ? JSON.parse(response) : [];
}

// Implementación de addCart que recibe un objeto newItem con { id, slug, quantity }
async function addCart(newItem) {
  const products = await getAllProducts();
  const objIndex = products.findIndex((product) => product.id === newItem.id);

  if (objIndex < 0) {
    products.push({ id: newItem.id, slug: newItem.slug, quantity: newItem.quantity || 1 });
  } else {
    products[objIndex].quantity += newItem.quantity || 1;
    if (!products[objIndex].slug && newItem.slug) {
      products[objIndex].slug = newItem.slug;
    }
  }
  
  try {
    await AsyncStorage.setItem(ENV.STORAGE.CART, JSON.stringify(products));
    console.log("Carrito actualizado:", products);
  } catch (error) {
    console.error("Error al guardar en AsyncStorage:", error);
    throw error;
  }
}




async function count() {
  const products = await getAllProducts();
  let count = 0;
  forEach(products, (product) => {
    count += product.quantity;
  });
  return count;
}

async function deleteProduct(productId) {
  const products = await getAllProducts();
  const updateProducts = products.filter((product) => product.id !== productId);
  await AsyncStorage.setItem(ENV.STORAGE.CART, JSON.stringify(updateProducts));
}

async function increaseProduct(productId) {
  try {
    const products = await getAllProducts();
    map(products, (product) => {
      if (product.id === productId) {
        return (product.quantity += 1);
      }
    });
    await AsyncStorage.setItem(ENV.STORAGE.CART, JSON.stringify(products));
  } catch (error) {
    throw error;
  }
}

async function decreaseProduct(productId) {
  try {
    let isDelete = false;

    const products = await getAllProducts();
    map(products, (product) => {
      if (product.id === productId) {
        if (product.quantity === 1) {
          isDelete = true;
          return null;
        } else {
          return (product.quantity -= 1);
        }
      }
    });

    if (isDelete) {
      await deleteProduct(productId);
    } else {
      await AsyncStorage.setItem(ENV.STORAGE.CART, JSON.stringify(products));
    }
  } catch (error) {
    throw error;
  }
}

async function deleteAll() {
  AsyncStorage.removeItem(ENV.STORAGE.CART);
}

export const cartCtrl = {
  getAll: getAllProducts,
  add: addCart,
  count,
  delete: deleteProduct,
  increaseProduct,
  decreaseProduct,
  deleteAll,
};
