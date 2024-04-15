import { SafeAreaView, Text,  } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../../hooks";

export function HomeScreen() {
  const { logout } = useAuth();
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button onPress={logout}>Cerrar session</Button>
    </SafeAreaView>
  );
}
