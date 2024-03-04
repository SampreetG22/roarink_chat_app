import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import KeyBoardView from "../components/KeyBoardView";

const SignUpScreen = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    photo: "https://cdn-icons-png.flaticon.com/128/847/847969.png",
  });
  const [loading, setLoading] = useState(false); // State variable for loading
  const navigator = useNavigation();

  const handleDetails = (value, category) => {
    setDetails((prevState) => ({
      ...prevState,
      [category]: value,
    }));
  };

  const handleSignUp = async () => {
    const { name, email, phone, password, confirmPassword, photo } = details;
    if (name && email && phone && password && confirmPassword) {
      if (password === confirmPassword) {
        setLoading(true); // Start loading
        try {
          const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await setDoc(doc(db, "users", response.user.uid), {
            userId: response.user.uid,
            name: name,
            email: email,
            phone: phone,
            photoUrl: photo,
          });
          setLoading(false); // Stop loading
          Alert.alert("Success", "Sign up successful!");
        } catch (error) {
          setLoading(false); // Stop loading
          console.error(error);
          Alert.alert("Error", error.message);
        }
      } else {
        Alert.alert("Error", "Passwords don't match");
      }
    } else {
      Alert.alert("Error", "Please enter all the fields to proceed");
    }
  };

  return (
    <KeyBoardView>
      <View style={styles.container}>
        <Text style={styles.signUpText}>Create an account</Text>
        <View style={styles.inputBox}>
          <Ionicons name="person" size={22} color="black" />
          <TextInput
            style={styles.inputBoxes}
            placeholder="Full Name"
            placeholderTextColor="gray"
            value={details.name}
            onChangeText={(value) => handleDetails(value, "name")}
          />
        </View>
        {/* Other input fields */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.btnText}>SIGN UP</Text>
          )}
        </TouchableOpacity>
        <Text>
          Already have an account?{" "}
          <Text
            style={styles.navigateText}
            onPress={() => navigator.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </KeyBoardView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  signUpText: {
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
    marginVertical: 15,
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
    marginVertical: 15,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  navigateText: {
    color: "purple",
    fontWeight: "bold",
  },
});
