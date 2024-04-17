import { Text } from "react-native";
import { Layout } from "../../layouts";
import { UserInfo } from "../../components/Account";

export function AccountScreen() {
  return (
    <Layout.Basic>
     <UserInfo/>
    </Layout.Basic>
  );
}
