import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { theme } from "utils/theme";
import { logo } from "../../assets";

import {
  Container,
  UserName,
  BrandContainer,
  BrandText,
  EmptyText,
} from "./HomeScreen.styles";

import { AppStackParamList } from "App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Header from "components/HeaderLogo/Header";

type HomeScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "Models"
>;

interface Brand {
  codigo: string;
  nome: string;
}

const HomeScreen: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axios.get(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
      );
      setBrands(response.data);
    };

    fetchBrands();
  }, []);

  const handlePress = (brandCode: string) => {
    navigation.navigate("Models", { brandCode });
  };

  const handleSignOut = () => {
    authContext?.signOut();
    navigation.navigate("Login");
  };

  return (
    <Container>
      <Header
        logo={logo}
        onSignOut={handleSignOut}
        title={"App de Marcas"}
        buttonColor={theme.colors.error}
      />
      <UserName>Bem vindo, {authContext?.user?.name}</UserName>
      <FlatList
        data={brands}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <BrandContainer onPress={() => handlePress(item.codigo)}>
            <BrandText>{item.nome}</BrandText>
          </BrandContainer>
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListEmptyComponent={<EmptyText>No brands found</EmptyText>}
      />
    </Container>
  );
};

export default HomeScreen;
