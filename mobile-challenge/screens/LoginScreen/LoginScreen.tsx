import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "contexts/AuthContext";
import { theme } from "utils/theme";
import { useForm, Controller } from "react-hook-form";

import {
  Container,
  Title,
  MaskedInput,
  Button,
  ButtonText,
  ErrorText,
} from "./LoginScreen.styles";

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

export default LoginScreen;
