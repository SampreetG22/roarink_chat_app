import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import KeyBoardView from "../components/KeyBoardView";
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SignUpScreen = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    photo: "https://cdn-icons-png.flaticon.com/128/847/847969.png",
  });
  const navigator = useNavigation();

  const handleDetails = (e, category) => {
    setDetails((prevState) => ({
      ...prevState,
      [category]: e,
    }));
  };

  const handleSignUp = async () => {
    const { name, email, phone, password, confirmPassword, photo } = details;
    if (name && email && phone && password && confirmPassword) {
      if (password === confirmPassword) {
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
          Alert.alert("Success", "Sign up successful!");
        } catch (error) {
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
            onChangeText={(event) => handleDetails(event, "name")}
          />
        </View>
        <View style={styles.inputBox}>
          <Fontisto name="email" size={24} color="black" />
          <TextInput
            style={styles.inputBoxes}
            placeholder="Email"
            placeholderTextColor="gray"
            value={details.email}
            onChangeText={(event) => handleDetails(event, "email")}
          />
        </View>
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="phone" size={24} color="black" />
          <TextInput
            style={styles.inputBoxes}
            placeholder="Phone"
            placeholderTextColor="gray"
            keyboardType="number-pad"
            value={details.phone}
            onChangeText={(event) => handleDetails(event, "phone")}
          />
        </View>
        <View style={styles.inputBox}>
          <Ionicons name="key" size={22} color="black" />
          <TextInput
            style={styles.inputBoxes}
            placeholder="Password"
            placeholderTextColor="gray"
            value={details.password}
            onChangeText={(event) => handleDetails(event, "password")}
            secureTextEntry
          />
        </View>
        <View style={styles.inputBox}>
          <Ionicons name="key" size={22} color="black" />
          <TextInput
            style={styles.inputBoxes}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            value={details.confirmPassword}
            onChangeText={(event) => handleDetails(event, "confirmPassword")}
            secureTextEntry
          />
        </View>
        <View style={styles.inputBox}>
          <FontAwesome
            name="file-photo-o"
            size={22}
            style={{ marginRight: 5 }}
            color="black"
          />
          <TextInput
            style={styles.inputBoxes}
            placeholder="Photo"
            placeholderTextColor="gray"
            value={details.photo}
            onChangeText={(value) => handleDetails(value, "photo")}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.btnText}>SIGN UP</Text>
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
  dropdown: {
    height: 24,
    backgroundColor: "transparent",
    borderRadius: 10,
    width: "90%",
    marginLeft: 15,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "gray",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: "purple",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    width: 390,
    marginVertical: 15,
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
