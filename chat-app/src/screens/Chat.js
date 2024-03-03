import { getDoc, getDocs, doc, query } from "firebase/firestore";
import { auth, db, usersReference } from "../config/firebase";
import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Platform,
  Alert,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChatScreen = () => {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const navigator = useNavigation();

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchUsers = async () => {
    const q = query(usersReference);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id !== auth.currentUser.uid) {
        data.push({ ...doc.data() });
      }
    });
  };
  const handleSignOut = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            signOut(auth)
              .then(() => {
                setData([]);
              })
              .catch((error) => console.error("Error signing out:", error));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <View style={styles.mainContainer}>
        <Text style={styles.chatsText}>Chats</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Ionicons name="exit-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigator.navigate("ChatRoom", {
                currentUser: userData,
                chattingWith: item,
                inChat: true,
              });
            }}
          >
            <View
              style={[
                styles.eachUser,
                index !== data.length - 1 && styles.borderBottomColor,
              ]}
            >
              <Image style={styles.tinyLogo} source={{ uri: item.photoUrl }} />
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "purple",
    height: 140,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    ...Platform.select({
      ios: {
        shadowColor: "#000000ad",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  chatsText: {
    fontSize: 25,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  flatList: {
    paddingVertical: 5,
  },
  eachUser: {
    padding: 10,
    paddingHorizontal: 20,
    width: "100%",
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  nameText: {
    fontSize: 15,
    fontWeight: 700,
  },
  borderBottomColor: {
    borderBottomColor: "#00000053",
    borderBottomWidth: 0.3,
  },
});
