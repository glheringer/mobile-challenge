import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "contexts/AuthContext";
import { AppStackParamList } from "App";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (authContext) {
      try {
        await authContext.signIn(username, password);
        navigation.navigate("Home");
      } catch (error) {
        alert("Login failed");
      }
    } else {
      alert("Auth context is not available");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
