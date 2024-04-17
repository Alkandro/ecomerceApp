import { Alert } from "react-native";
import { styles } from "./Menu.styles";
import { List } from "react-native-paper";
import { map } from "lodash";
import { useAuth } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { accountMenu, appMenu } from "./Menu.data";

export function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const alertLogout = () => {
    Alert.alert(
      "Cerrar sesion",
      "¿Estas seguro que quieres salir de tu cuenta?",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Confirmar",
          onPress: logout,
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <>
      <List.Section>
        <List.Subheader>Mi cuenta</List.Subheader>
        {map(accountMenu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            description={item.description}
            left={(props) => <List.Icon {...props} icon={item.leftIcon} />}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>

      <List.Section>
        <List.Subheader>App</List.Subheader>
        {map(appMenu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            description={item.description}
            left={(props) => <List.Icon {...props} icon={item.leftIcon} />}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>

      <List.Section>
        <List.Item
          title="Cerrar session"
          titleStyle={styles.titleLogoutItem}
          description="Cerrar esta sesion e iniciar con otra"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={alertLogout}
        />
      </List.Section>
    </>
  );
}
