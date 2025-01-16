import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "contexts/AuthContext";
import LoginScreen from "screens/LoginScreen/LoginScreen";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import ModelScreen from "screens/ModelScreen/ModelScreen";
import * as Font from "expo-font";

export type AppStackParamList = {
  Login: undefined;
  Home: undefined;
  Models: { brandCode: string };
};

const Stack = createStackNavigator<AppStackParamList>();

const loadFonts = () => {
  return Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Models" component={ModelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
