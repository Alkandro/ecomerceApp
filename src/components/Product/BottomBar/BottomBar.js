import { View, Text } from "react-native";
import { Favorite } from "./Favorite";
import { Buy } from "./Buy";
import { styles } from "./BottomBar.styles";

export function BottomBar(props) {
  const { productId, slug } = props;

  return (
    <View style={styles.container}>
      <View style={styles.wishlist}>
        <Favorite productId={productId} slug={slug} />
      </View>
      <View style={styles.buy}>
        <Buy productId={productId} slug={slug} />
      </View>
    </View>
  );
}
