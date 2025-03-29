import { View, Text } from "react-native";
import { map } from "lodash";
import { Product } from "./Product";
import { styles } from "./GridProducts.styles";

export function GridProducts(props) {
  const { title, products } = props;
  console.log("Productos recibidos en el grid:", products);
  
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.gridContainer}>
        {map(products, (item) => {
          // Si viene en formato anidado, se utiliza item.attributes; de lo contrario, se usa el objeto directamente
          const product = item.attributes ? { ...item.attributes, id: item.id } : item;
          console.log("Producto grid:", product);
          if (!product) return null;
          return <Product key={product.id} product={product} />;
        })}
      </View>
    </View>
  );
}
