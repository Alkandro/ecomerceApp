import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { useCart } from "../../../../hooks";
import { styles } from "./Buy.styles";

// Ejemplo en el componente Buy:
export function Buy(props) {
  const { productId, slug } = props;
  const { addCart } = useCart();

  const addProductCart = async () => {
    console.log("Agregando al carrito:", { id: productId, slug, quantity: 1 });
    try {
      // Envía el objeto con id, slug y cantidad
      await addCart({ id: productId, slug, quantity: 1 });
      Toast.show("Producto añadido al carrito", {
        position: Toast.positions.CENTER,
      });
    } catch (error) {
      Toast.show("Error al añadir el producto al carrito", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Button
      mode="contained"
      contentStyle={styles.btnBuyContent}
      labelStyle={styles.btnLabel}
      style={styles.btn}
      onPress={addProductCart}
    >
      Añadir al carrito
    </Button>
  );
}



