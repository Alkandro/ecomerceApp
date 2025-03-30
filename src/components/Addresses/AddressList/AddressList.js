import { View } from "react-native";
import { map } from "lodash";
import { Address } from "./Address";
import { styles } from "./AddressList.styles";



  export function AddressList(props) {
    const { addresses, onReload } = props;
  
    return (
      <View style={styles.container}>
        {map(addresses, (address) => (
          <Address
            key={address.id}
            address={address}  // 👈 Pasamos el objeto address completo
            onReload={onReload}
          />
        ))}
      </View>
    );
  }
  
