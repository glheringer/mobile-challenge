import React, { useState, useEffect } from "react";
import { AuthProvider } from "contexts/AuthContext";
import { theme } from "utils/theme";
import { loadFonts } from "utils/fontsLoader";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "screens/LoginScreen/LoginScreen";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import ModelScreen from "screens/ModelScreen/ModelScreen";

export type AppStackParamList = {
  Login: undefined;
  Home: undefined;
  Models: { brandCode: string };
};

const Stack = createStackNavigator<AppStackParamList>();

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
          <Stack.Screen
            name="Models"
            component={ModelScreen}
            options={{
              title: "Modelos de Carros",
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.background,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
