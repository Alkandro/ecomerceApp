import { useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { wishlistCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { fn, screensName } from "../../../../utils";
import { styles } from "./Product.styles";

export function Product(props) {
  const { product, onReload } = props;
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation();

  const goToProduct = () => {
    navigation.navigate(screensName.home.product, { slug: product.slug });
  };

  const deleteFavorite = async () => {
    if (loading) return; // Previene doble ejecución
    setLoading(true);
  
    console.log("Eliminando producto con ID:", product.id, "para el usuario:", user.id);
  
    try {
      const success = await wishlistCtrl.delete(user.id, product.id);
      if (success) {
        console.log("Producto eliminado, recargando lista...");
        onReload(); // Solo si fue exitoso
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        {console.log("URL de la imagen (Wishlist):", product?.main_image?.url)}
        {product?.main_image?.url ? (
          <Image
            source={{ uri: product.main_image.url }}
            style={styles.image}
          />
        ) : (
          <Text>No Image</Text>
        )}
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product?.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {fn.calcPrice(product?.price, product?.discount)}€
            </Text>
            {product?.discount && (
              <Text style={styles.oldPrice}>{product.price}€</Text>
            )}
          </View>
        </View>
  
        <View style={styles.actions}>
          <Button
            style={styles.btnGoToProduct}
            mode="contained"
            onPress={goToProduct}
          >
            Ver producto
          </Button>
          <IconButton
            icon="close"
            iconColor="#fff"
            style={styles.btnDelete}
            onPress={deleteFavorite}
          />
        </View>
      </View>
       
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}