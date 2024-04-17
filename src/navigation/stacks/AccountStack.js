import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AccountScreen,
  ChangeEmailScreen,
  ChangePasswordScreen,
  ChangeNameScreen,
  ChangeUserNameScreen,
  AddressesScreen,
  AddEditAddressesScreen,
  OrderScreen,
  OrdersScreen,
} from "../../screens/Account";
import { screensName } from "../../utils";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screensName.account.account}
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screensName.account.changeName}
        component={ChangeNameScreen}
        options={{ title: "Cambiar nombre y apellido" }}
      />
      <Stack.Screen
        name={screensName.account.changeEmail}
        component={ChangeEmailScreen}
        options={{ title: "Cambiar correo electronico" }}
      />
      <Stack.Screen
        name={screensName.account.changeUsername}
        component={ChangeUserNameScreen}
        options={{ title: "Cambiar nombre de usuario" }}
      />
      <Stack.Screen
        name={screensName.account.changePassword}
        component={ChangePasswordScreen}
        options={{ title: "Cambiar contrasena" }}
      />
      <Stack.Screen
        name={screensName.account.addresses}
        component={AddressesScreen}
        options={{ title: " Mis direcciones" }}
      />
      <Stack.Screen
        name={screensName.account.addEditAddress}
        component={AddEditAddressesScreen}
      />
      <Stack.Screen
        name={screensName.account.orders}
        component={OrdersScreen}
        options={{ title: "Mis pedidos " }}
      />
      <Stack.Screen
        name={screensName.account.order}
        component={OrderScreen}
        options={{ title: "", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
