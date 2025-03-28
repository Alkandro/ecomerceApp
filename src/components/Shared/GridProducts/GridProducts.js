// import { View, Text } from "react-native";
// import { map } from "lodash";
// import { Product } from "./Product";
// import { styles } from "./GridProducts.styles";

// export function GridProducts(props) {
//   const { title, products } = props;

//   return (
//     <View style={styles.container}>
//       {title && <Text style={styles.title}>{title}</Text>}

     
//       <View style={styles.gridContainer}>
//         {map(products, (item) => {
//           if (!item || !item.attributes) {
//             return null; // O maneja el caso de item sin atributos de otra manera
//           }

//           const product = item.attributes;
//           product.id = item.id;

//           return <Product key={product.id} product={product} />;
//         })}
//       </View>
//     </View>
//   );
// }
import { View, Text } from "react-native";
import { map } from "lodash";
import { Product } from "./Product";
import { styles } from "./GridProducts.styles";

export function GridProducts(props) {
  const { title, products } = props;
  console.log("Productos recibidos en el grid:", products); // Debug
  
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.gridContainer}>
        {map(products, (item) => {
          if (!item || !item.attributes) {
            return null;
          }
          const product = item.attributes;
          product.id = item.id;
          console.log("Producto grid:", product);
          return <Product key={product.id} product={product} />;
        })}
      </View>
    </View>
  );
}
