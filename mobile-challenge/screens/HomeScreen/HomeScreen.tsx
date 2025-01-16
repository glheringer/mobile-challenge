import React, { useContext, useEffect, useState } from "react";
import { Button, FlatList } from "react-native";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import styled from "styled-components/native";
import { theme } from "utils/theme";
import { logo } from "../../assets";

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
        buttonColor={theme.colors.primary}
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

const Container = styled.View`
  flex: 1;
  padding: ${theme.spacings.medium};
  background-color: ${theme.colors.background};
`;

const UserName = styled.Text`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacings.medium};
`;

const BrandContainer = styled.TouchableOpacity`
  flex: 1;
  margin: ${theme.spacings.small};
  padding: ${theme.spacings.medium};
  background-color: ${theme.colors.primary};
  border-width: 1px;
  border-color: ${theme.colors.secondary};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const BrandText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.buttonText};
`;

const EmptyText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.secondaryText};
  text-align: center;
  margin-top: ${theme.spacings.medium};
`;

export default HomeScreen;
