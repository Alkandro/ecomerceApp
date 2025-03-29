import { PaperProvider } from "react-native-paper";
import { AuthProvider, SearchProvider, CartProvider } from "./src/contexts";
import { RootNavigation } from "./src/navigation";
import { LogBox } from 'react-native';


LogBox.ignoreLogs([
  "TRenderEngineProvider: Support for defaultProps",
  "MemoizedTNodeRenderer: Support for defaultProps",
  "TNodeChildrenRenderer: Support for defaultProps",
  "MemoizedTNodeChildrenRenderer: Support for defaultProps"
]);

export default function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider> 
          <PaperProvider>
            <RootNavigation />
          </PaperProvider>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
