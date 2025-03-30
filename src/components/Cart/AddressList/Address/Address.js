import { View, Text, Pressable } from "react-native";
import { styles } from "./Address.styles";

export function Address(props) {
  const { address, selectedAddress, setSelectedAddress } = props;

  // Verifica si address existe; de lo contrario, retorna un mensaje de aviso
  if (!address) {
    return <Text style={styles.title}>Dirección no disponible</Text>;
  }

  // Si address tiene attributes, usalo; de lo contrario, usa address directamente
  const data = address.attributes ? address.attributes : address;

  const stylesSelected = address.id === selectedAddress?.id && styles.checked;

  return (
    <Pressable onPress={() => setSelectedAddress(address)}>
      <View style={[styles.container, stylesSelected]}>
        <Text style={styles.title}>{data.title || "Sin título"}</Text>
        <Text>{data.name || ""}</Text>
        <Text>{data.address || ""}</Text>
        <Text>
          {data.state || ""}, {data.city || ""}, {data.postal_code || ""}
        </Text>
        <Text>{data.country || ""}</Text>
        <Text>Número de teléfono: {data.phone || ""}</Text>
      </View>
    </Pressable>
  );
}
