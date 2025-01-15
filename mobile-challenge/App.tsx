import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "contexts/AuthContext";
import LoginScreen from "screens/LoginScreen/LoginScreen";
import HomeScreen from "screens/HomeScreen/HomeScreen";

export type AppStackParamList = {
  Login: undefined;
  Home: undefined;
};
const Stack = createStackNavigator<AppStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
