import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "contexts/AuthContext";
import styled from "styled-components/native";
import { theme } from "utils/theme";
import { TextInputMask } from "react-native-masked-text";
import { useForm, Controller } from "react-hook-form";

import { AppStackParamList } from "App";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "Login"
>;

interface FormData {
  username: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const onSubmit = async (data: FormData) => {
    if (authContext) {
      try {
        console.log("Tentando fazer login com:", data); // Adicione este log para depuração
        const isAuthenticated = await authContext.signIn(
          data.username,
          data.password
        );
        if (isAuthenticated) {
          navigation.navigate("Home");
        } else {
          alert("Usuário ou senha incorretos");
        }
      } catch (error) {
        alert("Ocorreu um erro ao tentar fazer login");
      }
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Controller
        control={control}
        name="username"
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <MaskedInput
            type={"custom"}
            options={{
              mask: "********************",
            }}
            autoCapitalize="none"
            placeholder="Usuário"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={theme.colors.secondary}
          />
        )}
      />
      {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <MaskedInput
            type={"custom"}
            options={{
              mask: "********************",
            }}
            autoCapitalize="none"
            placeholder="Senha"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={theme.colors.secondary}
            secureTextEntry
          />
        )}
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      <Button onPress={handleSubmit(onSubmit)}>
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
  margin-top: 32;
  background-color: ${theme.colors.background};
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

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  margin-bottom: ${theme.spacings.small};
`;

export default LoginScreen;
