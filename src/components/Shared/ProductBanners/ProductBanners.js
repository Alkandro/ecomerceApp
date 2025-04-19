import { useState } from "react";
import { View, Image, Pressable, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { screensName } from "../../../utils";
import { styles } from "./ProductBanners.styles";

const width = Dimensions.get("window").width;

export function ProductBanners(props) {
  const { banners } = props;
  const [bannerActive, setBannerActive] = useState(0);
  const navigation = useNavigation();

  // Mapea los banners usando la estructura correcta según tus logs
  const mappedBanners = banners
    .map((item) => ({
      productId: item?.product?.id, // Extrae el id del producto directamente
      url: item?.banner?.url,       // Extrae la URL directamente
    }))
    .filter((banner) => !!banner.url && !!banner.productId);

  const goToProducto = (productId) => {
    console.log("Navegando al producto con id:", productId);
    navigation.navigate(screensName.home.product, { productId });
  };

  const renderItem = ({ item }) => {
    if (!item.url) {
      console.log("No hay imagen disponible para este banner.");
      return null;
    }
    return (
      <Pressable onPress={() => goToProducto(item.productId)}>
        <Image source={{ uri: item.url }} style={styles.carousel} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        data={mappedBanners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setBannerActive(index)}
      />
      <Pagination
        dotsLength={mappedBanners.length}
        activeDotIndex={bannerActive}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.dot}
      />
    </View>
  );
}
