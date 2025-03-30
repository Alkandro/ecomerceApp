import { View, Text } from "react-native";
import { map } from "lodash";
import { Address } from "./Address";
import { styles } from "./AddressList.styles";

export function AddressList({ addresses, selectedAddress, setSelectedAddress }) {
  if (!addresses || addresses.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No hay direcciones disponibles.</Text>
      </View>
    );
  }

  const validAddresses = addresses.filter((address) => address);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dirección de envío:</Text>
      {map(validAddresses, (address, index) => {
  console.log(`Dirección ${index}:`, address);
  return (
    <Address
      key={address.id}
      address={address}
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
    />
  );
})}
    </View>
  );
}
