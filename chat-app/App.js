import { StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return <AppNavigator style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    width: 300,
  },
});
