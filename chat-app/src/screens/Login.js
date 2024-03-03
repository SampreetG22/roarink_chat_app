import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Fontisto, Entypo } from "@expo/vector-icons";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigation();

  const handleSignIn = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Invalid email or password");
      }
    } else {
      Alert.alert("Error", "Please enter email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.inputBox}>
        <Fontisto name="email" size={24} color="black" />
        <TextInput
          style={styles.inputBoxes}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputBox}>
        <Entypo name="key" size={24} color="black" />
        <TextInput
          style={styles.inputBoxes}
          placeholderTextColor="gray"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Text style={styles.forgotPswrd}>Forgot Password?</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.btnText}>LOGIN</Text>
      </TouchableOpacity>
      <Text>
        Don't have an account?{" "}
        <Text
          style={styles.navigateText}
          onPress={() => navigator.navigate("SignUp")}
        >
          Create one
        </Text>
      </Text>
    </View>
  );
};

export default LogInScreen;
const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  loginText: {
    fontSize: 27,
    marginTop: "20%",
    marginBottom: "10%",
    fontWeight: "bold",
    color: "purple",
  },
  inputBox: {
    width: "95%",
    backgroundColor: "#0000000c",
    display: "flex",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 20,
  },
  inputBoxes: {
    marginLeft: 15,
    fontSize: 16,
    width: "90%",
  },
  button: {
    backgroundColor: "purple",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    width: 390,
    marginTop: 30,
    marginBottom: 15,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  forgotPswrd: {
    alignSelf: "flex-end",
    marginRight: 25,
    color: "purple",
    fontWeight: "bold",
  },
  navigateText: {
    color: "purple",
    fontWeight: "bold",
  },
});
