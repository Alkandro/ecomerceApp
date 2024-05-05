import { PaperProvider } from "react-native-paper";
import { AuthProvider, SearchProvider } from "./src/contexts";
import { RootNavigation } from "./src/navigation";

export default function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <PaperProvider>
          <RootNavigation />
        </PaperProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
