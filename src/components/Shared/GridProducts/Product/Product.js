// import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { screensName } from "../../../../utils";
// import { styles } from "./Product.styles";

// export function Product(props) {
//   const { product } = props;
//   const navigation = useNavigation();
//   const mainImage = product.main_image.data.attributes.url;

//   const goToProduct = () => {
//     navigation.navigate(screensName.home.product, { productId: product.id });
//   };

//   return (
//     <TouchableWithoutFeedback onPress={goToProduct}>
//       <View style={styles.container}>
//         <View style={styles.product}>
//           <Image source={{ uri: mainImage }} style={styles.image} />
//           <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
//             {product.title}
//           </Text>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }
import React from "react";
import { Image, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ENV } from "../../../../utils"; // Si necesitas concatenar la URL base
import { styles } from "./Product.styles";

export function Product({ product }) {
  const navigation = useNavigation();

  // Extrae la URL de la imagen principal. Ajusta la ruta según la estructura de tu API.
  let imageUrl = product.main_image?.data?.attributes?.url;
  // Si la URL es relativa, la concatenas con la URL base
  if (imageUrl && !imageUrl.startsWith("http")) {
    imageUrl = `${ENV.API_URL}${imageUrl}`;
  }

  const goToProduct = () =>
    navigation.navigate("Product", { productId: product.id });

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
