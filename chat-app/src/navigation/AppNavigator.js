import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUp";
import LogInScreen from "../screens/Login";
import ChatScreen from "../screens/Chat";
import Lander from "../screens/Lander";
import useAuth from "../hooks/useAuth";
import ChatRoom from "../screens/ChatRoom";

const Stack = createStackNavigator();
const AppNavigator = () => {
  const { user } = useAuth();
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Chat">
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Lander} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
