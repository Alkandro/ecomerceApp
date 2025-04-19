import { View, Text, FlatList } from "react-native";
import { Product } from "./Product";
import { styles } from "./WishlistList.styles";

export function WishlistList({ title, products, onReload }) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Product
            product={item}
            onReload={onReload}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
