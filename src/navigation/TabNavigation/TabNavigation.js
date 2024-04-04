import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthScreen } from "../../screens/Auth";
import { screensName } from "../../utils";
import { HomeStack } from "../stacks";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={screensName.home.root}
        component={HomeStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name={screensName.wishList.root}
        component={AuthScreen}
        options={{ title: "Lista de deseos" }}
      />
      <Tab.Screen
        name={screensName.cart.root}
        component={AuthScreen}
        options={{ title: "Carrito" }}
      />
      <Tab.Screen
        name={screensName.account.root}
        component={AuthScreen}
        options={{ title: "Mi Cuenta" }}
      />
    </Tab.Navigator>
  );
}
