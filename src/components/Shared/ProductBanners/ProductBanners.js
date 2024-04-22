import { View, Image, Pressable, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { styles } from "./ProductBanners.styles";

const width = Dimensions.get("window").width;

export function ProductBanners(props) {
  const { banners } = props;

const goToProducto = (id) => {
    console.log(id);

}

const renderItem = ({ item }) => {
    const urlImage = item.attributes.banner.data.attributes.url;

    return (
      <Pressable onPress={() => goToProducto(item.id)}>
        <Image source={{ uri: urlImage }} style={styles.carousel} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        data={banners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
      />
    </View>
  );
}
