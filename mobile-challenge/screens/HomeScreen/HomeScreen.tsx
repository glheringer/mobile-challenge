import React, { useEffect, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native";
import { AppStackParamList } from "App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { theme } from "utils/theme";
import { logo } from "../../assets";

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

  return (
    <Container>
      <Header>
        <Logo source={logo} />
        <Wrapper>
          <Title>App de Marcas</Title>
        </Wrapper>
      </Header>
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

const Header = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.medium};
  padding: 0 ${theme.spacings.medium};
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${theme.fontSizes.xlarge};
  font-family: ${theme.fonts.bold};
  text-align: center;
  color: ${theme.colors.primary};
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
