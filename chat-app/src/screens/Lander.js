import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Lander = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text2}>Welcome to</Text>
      <Text style={styles.text}>RoarInk chat!</Text>
      <Text style={styles.text2}>where strangers make changes</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("Login")}
        >
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("SignUp")}
        >
          <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Lander;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
  },
  text2: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonsContainer: {
    marginTop: 200,
    width: "90%",
    padding: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
