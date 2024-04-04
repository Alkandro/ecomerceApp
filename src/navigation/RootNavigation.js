import { AuthScreen } from "../screens/Auth";
import { AppNavigation } from "./AppNavigation";

export function RootNavigation() {
  const user = "a";

  return user ? <AppNavigation /> : <AuthScreen />;
}
