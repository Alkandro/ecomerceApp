import { View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { addressCtrl } from "../../../../api";
import { screensName } from "../../../../utils";
import { styles } from "./Address.styles";

export function Address({ address, addressId, onReload }) {
  const navigation = useNavigation();

  // Si address es undefined, muestra un aviso y no intenta renderizar el resto
  if (!address) {
    console.error("No se recibió el objeto address");
    return <Text style={styles.title}>Dirección no disponible</Text>;
  }

  // Usa optional chaining para obtener el título
  const title = address?.attributes?.title || address.title || "Sin título";

  const goToUpdateAddress = () => {
    navigation.navigate(screensName.account.addEditAddress, { addressId });
  };

  const deleteAddressAlert = () => {
    Alert.alert(
      "Eliminar dirección",
      `¿Estás seguro de que quieres eliminar la dirección (${title})?`,
      [
        { text: "NO" },
        { text: "SI", onPress: deleteAddress },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async () => {
    try {
      await addressCtrl.delete(addressId);
      if (onReload) {
        onReload();
      }
    } catch (error) {
      Toast.show("Error al eliminar la dirección", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{address?.attributes?.name || address.name}</Text>
      <Text>{address?.attributes?.address || address.address}</Text>
      <Text>
        {address?.attributes
          ? `${address.attributes.state}, ${address.attributes.city}, ${address.attributes.postal_code}`
          : `${address.state}, ${address.city}, ${address.postal_code}`}
      </Text>
      <Text>{address?.attributes?.country || address.country}</Text>
      <Text>Número de teléfono: {address?.attributes?.phone || address.phone}</Text>

      <View style={styles.actions}>
        <Button mode="contained" onPress={goToUpdateAddress}>
          Editar
        </Button>
        <Button mode="contained" onPress={deleteAddressAlert}>
          Eliminar
        </Button>
      </View>
    </View>
  );
}
