// import { useState, useEffect, useCallback } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import Toast from "react-native-root-toast";
// import { homeBannerCtrl, productCtrl } from "../../api";
// import { Layout } from "../../layouts";
// import { ProductBanners, GridProducts } from "../../components/Shared";

// export function HomeScreen() {
//   const [banners, setBanners] = useState(null);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getBanners();
//     getProducts();
//   }, []);

//   // Refresca los productos cada vez que la pantalla gana foco
//   useFocusEffect(
//     useCallback(() => {
//       getProducts();
//     }, [])
//   );

//   const getBanners = async () => {
//     try {
//       const response = await homeBannerCtrl.getAll();
//       setBanners(response?.data?.length ? response.data : []);
//     } catch (error) {
//       Toast.show("Error al obtener los banners", { position: Toast.positions.CENTER });
//     }
//   };
  
//   const getProducts = async () => {
//     try {
//       const response = await productCtrl.getLatestPublished();
//       setProducts(response?.data?.length ? response.data : []);
//     } catch (error) {
//       Toast.show("Error al obtener los productos", { position: Toast.positions.CENTER });
//     }
//   };

//   return (
//     <Layout.Basic>
//       {/* El banner se queda fijo arriba */}
//       {banners && <ProductBanners banners={banners} />}
//       {/* El GridProducts contiene la lista con pull-to-refresh */}
//       <GridProducts 
//         title="Nuevos productos" 
//         products={products} 
//         onRefresh={getProducts} 
//       />
//     </Layout.Basic>
//   );
// }
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { homeBannerCtrl, productCtrl } from "../../api";
import { ENV } from "../../utils";
import { Layout } from "../../layouts";
import { ProductBanners, GridProducts } from "../../components/Shared";

export function HomeScreen() {
  const [banners, setBanners] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBanners();
    getProducts();
  }, []);

  // Refresca los productos cada vez que la pantalla gana foco
  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, [])
  );

  const getBanners = async () => {
    try {
      const response = await homeBannerCtrl.getAll();
      setBanners(response?.data?.length ? response.data : []);
    } catch (error) {
      Toast.show("Error al obtener los banners", {
        position: Toast.positions.CENTER,
      });
    }
  };

  const getProducts = async () => {
    try {
      const response = await productCtrl.getLatestPublished();
      setProducts(response?.data?.length ? response.data : []);
    } catch (error) {
      Toast.show("Error al obtener los productos", {
        position: Toast.positions.CENTER,
      });
    }
  };

  // Función temporal para limpiar el carrito
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem(ENV.STORAGE.CART);
      Toast.show("Carrito eliminado", { position: Toast.positions.CENTER });
    } catch (error) {
      Toast.show("Error al limpiar el carrito", { position: Toast.positions.CENTER });
    }
  };

  return (
    <Layout.Basic>
      {/* El banner se queda fijo arriba */}
      {banners && <ProductBanners banners={banners} />}
      {/* El GridProducts contiene la lista de productos con pull-to-refresh */}
      <GridProducts
        title="Nuevos productos"
        products={products}
        onRefresh={getProducts}
      />
      {/* Botón temporal para limpiar el carrito */}
      <Button
        mode="contained"
        onPress={clearCart}
        style={{ margin: 20 }}
      >
        Limpiar Carrito
      </Button>
    </Layout.Basic>
  );
}
