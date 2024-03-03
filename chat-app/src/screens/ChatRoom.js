import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  Image,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import MessageHistory from "../components/MessageHistory";
import * as ImagePicker from "expo-image-picker";

export default function ChatRoomScreen() {
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const textRef = useRef("");
  const emptyRef = useRef("");
  const router = useRoute();
  const { currentUser, chattingWith, inChat } = router.params;
  const navigator = useNavigation();

  useEffect(() => {
    createChatRoomIfNeeded();
    let roomId = getCombinedRoomId();
    const docRef = doc(db, "chatRooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });
    return unsub;
  }, []);
  useLayoutEffect(() => {
    navigator.setOptions({
      title: chattingWith.name,
      headerStyle: {
        backgroundColor: "purple",
      },
      headerTitleStyle: {
        color: "white",
      },
      headerTintColor: "white",
      headerRight: () => (
        <TouchableOpacity>
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name="phone"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  });
  const getCombinedRoomId = () => {
    const sortedIds = [currentUser.userId, chattingWith.userId].sort();
    const combinedRoomId = sortedIds.join("-");
    return combinedRoomId;
  };
  const createChatRoomIfNeeded = async () => {
    const roomId = getCombinedRoomId();
    await setDoc(doc(db, "chatRooms", roomId), {
      roomId: roomId,
      between: [currentUser.name, chattingWith.name].join(" and "),
      createdAt: Timestamp.fromDate(new Date()),
    });
  };
  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message && !image) return; // If both message and image are empty, return
    try {
      let roomId = getCombinedRoomId();
      const docRef = doc(db, "chatRooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (emptyRef) emptyRef.current.clear();
      let messageData = {
        userId: currentUser.userId,
        text: message,
        sender: currentUser.name,
        createdAt: Timestamp.fromDate(new Date()),
      };
      if (image) {
        messageData.image = image; // Add image URI to message data
        setImage(null); // Clear the image after sending
      }
      await addDoc(messagesRef, messageData);
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const ios = Platform.OS === "ios";
  let keyConfig = {};
  let scrollConfig = {};
  if (inChat) {
    keyConfig = { keyboardVerticalOffset: 70 };
    scrollConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ios ? "padding" : "height"}
      {...keyConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollConfig}
      >
        <View style={styles.mainContainer}>
          <MessageHistory messages={messages} currentUser={currentUser} />
          <View style={styles.inputToolbarContainer}>
            <TouchableOpacity onPress={handleImagePicker}>
              <Entypo name="attachment" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              ref={emptyRef}
              placeholder="Type a message"
              style={styles.inputToolbar}
              onChangeText={(value) => (textRef.current = value)}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <MaterialCommunityIcons name="send" size={24} color="purple" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  messagesContainer: {
    margin: 10,
    display: "flex",
    flexGrow: 1,
  },
  inputToolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 33,
    width: "96%",
    backgroundColor: "white",
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginLeft: 8,
    borderWidth: 0.5,
    borderColor: "silver",
    marginBottom: 10,
  },
  inputToolbar: {
    padding: 12,
    paddingHorizontal: 10,
    width: "89%",
  },
  sendButton: {
    padding: 10,
    marginRight: 8,
  },
});
