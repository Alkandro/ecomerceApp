import React from "react";
import { Image, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ENV } from "../../../../utils";
import { styles } from "./Product.styles";

export function Product({ product }) {
  const navigation = useNavigation();

  // Obtén la URL de la imagen (similar a como lo hacías)
  let imageUrl = product.main_image?.url || product.main_image?.data?.attributes?.url;
  if (imageUrl && typeof imageUrl === "string" && !imageUrl.startsWith("http")) {
    imageUrl = `${ENV.API_URL}${imageUrl}`;
  }

  const goToProduct = () =>
    // Aquí en lugar de pasar productId, pasamos el slug
    navigation.navigate("product", { slug: product.slug });

  return (
    <Pressable style={styles.container} onPress={goToProduct}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text>Sin imagen</Text>
        </View>
      )}
      <Text style={styles.title}>{product.title}</Text>
    </Pressable>
  );
}
