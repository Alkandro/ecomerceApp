import { View } from "react-native";
import { Badge } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useCart } from "../../hooks";
import { screensName } from "../../utils";
import { HomeStack, WishlistStack, CartStack, AccountStack } from "../stacks";
import { styles } from "./TabNavigation.styles";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  const { totalProducts } = useCart(); // 💡 Mueve useCart() aquí

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (routeStatus) => setIcon(route, routeStatus, totalProducts),
        tabBarActiveTintColor: "#000",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={screensName.home.root}
        component={HomeStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name={screensName.wishlist.root}
        component={WishlistStack}
        options={{ title: "Lista de deseos" }}
      />
      <Tab.Screen
        name={screensName.cart.root}
        component={CartStack}
        options={{ title: "Carrito" }}
      />
      <Tab.Screen
        name={screensName.account.root}
        component={AccountStack}
        options={{ title: "Mi cuenta" }}
      />
    </Tab.Navigator>
  );
}

// 🔄 Ahora pasamos totalProducts como argumento a setIcon()
function setIcon(route, routeStatus) {
  const cart = useCart() || {}; // Asegurar que no sea undefined
  const totalProducts = cart.totalProducts || 0; // Si es undefined, usar 0

  let iconName = "";
  let color = routeStatus.focused ? "#0098d3" : "#fff";

  if (route.name === screensName.home.root) iconName = "home";
  if (route.name === screensName.wishlist.root) iconName = "heart";
  if (route.name === screensName.account.root) iconName = "user";

  if (route.name === screensName.cart.root) {
    return (
      <View>
        <AwesomeIcon name="shopping-cart" color={color} style={styles.icon} />
        {totalProducts > 0 && (
          <Badge style={styles.totalCart}>{totalProducts}</Badge>
        )}
      </View>
    );
  }

  return <AwesomeIcon name={iconName} color={color} style={styles.icon} />;
}

