import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "contexts/AuthContext";
import { AppStackParamList } from "App";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { theme } from "utils/theme";
import { TextInputMask } from "react-native-masked-text";

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
        // await authContext.signIn(username, password);
        navigation.navigate("Home");
      } catch (error) {
        alert("Login failed");
      }
    } else {
      alert("Auth context is not available");
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <MaskedInput
        type={"custom"}
        options={{
          mask: "********************",
        }}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={theme.colors.secondary}
      />
      <MaskedInput
        type={"custom"}
        options={{
          mask: "********************",
        }}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={theme.colors.secondary}
        secureTextEntry
      />
      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: ${theme.spacings.large};
  background-color: ${theme.colors.background};
  margin-top: 32;
`;

const Title = styled.Text`
  font-size: ${theme.fontSizes.xlarge};
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacings.large};
  margin-top: ${theme.spacings.huge};
`;

const MaskedInput = styled(TextInputMask)`
  width: 100%;
  padding: ${theme.spacings.medium};
  margin-bottom: ${theme.spacings.medium};
  border-width: 1px;
  border-color: ${theme.colors.secondaryText};
  border-radius: 8px;
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.text};
  background-color: ${theme.colors.primaryLight};
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: ${theme.spacings.medium};
  background-color: ${theme.colors.primary};
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.buttonText};
`;

export default LoginScreen;
