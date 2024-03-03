import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNEbbmWSfpqfDZfSV10Dnb1Xc6glxLsDk",
  authDomain: "roarink-chat-app.firebaseapp.com",
  projectId: "roarink-chat-app",
  storageBucket: "roarink-chat-app.appspot.com",
  messagingSenderId: "80558588324",
  appId: "1:80558588324:web:f8ecfa115b1ee4f9a10131",
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const usersReference = collection(db, "users");
const chatsReference = collection(db, "chats");
export { auth, db, usersReference, chatsReference };
