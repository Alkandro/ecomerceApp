import { useState, useCallback } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { forEach, uniqBy } from "lodash";

import { wishlistCtrl } from "../../../api";
import { useAuth, useSearch } from "../../../hooks";
import { LoadingScreen } from "../../../components/Shared";
import { WishlistList } from "../../../components/Wishlist";
import { SearchInput } from "../../../components/Shared/Search/SearchInput"; // 👈 buscador animado
import { styles } from "./WishlistScreen.styles";

export function WishlistScreen() {
  const [products, setProducts] = useState(null);
  const { user } = useAuth();
  const { searchText } = useSearch();

  useFocusEffect(
    useCallback(() => {
      getProductsWishlist();
    }, [])
  );

  const getProductsWishlist = async () => {
    try {
      const response = await wishlistCtrl.getAllProducts(user.id);
      const productTemp = [];

      forEach(response.data, (item) => {
        if (item.product) {
          productTemp.push(item.product);
        }
      });

      const uniqueProducts = uniqBy(productTemp, "id");
      setProducts(uniqueProducts);
    } catch (error) {
      Toast.show("Error al obtener la lista de deseos", {
        position: Toast.positions.CENTER,
      });
    }
  };

  const filteredProducts = products?.filter((p) =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {!products ? (
        <LoadingScreen text="Cargando lista" />
      ) : (
        <View style={{ flex: 1 }}>
          <SearchInput /> {/* 👈 Usamos tu buscador animado */}
          <View style={styles.container}>
            <Text style={styles.title}>Lista de deseos</Text>
          </View>
          <WishlistList
            products={filteredProducts}
            onReload={getProductsWishlist}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
