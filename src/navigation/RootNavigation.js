import { AuthScreen } from "../screens/Auth";
import { AppNavigation } from "./AppNavigation";
import { useAuth } from "../hooks";

export function RootNavigation() {
  const { user } = useAuth();

  return user ? <AppNavigation /> : <AuthScreen />;
}
