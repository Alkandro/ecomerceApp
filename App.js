
import { PaperProvider } from 'react-native-paper';
import { RootNavigation } from "./src/navigation";
import {AuthProvider} from './src/contexts'

export default function App() {
  return (
    <AuthProvider>
    <PaperProvider >
   <RootNavigation />
    
    </PaperProvider>
    </AuthProvider>
  );
}


