import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import styled from "styled-components/native";
import { useRoute } from "@react-navigation/native";
import { theme } from "utils/theme";

interface Model {
  codigo: string;
  nome: string;
}

interface RouteParams {
  brandCode: string; // Código da marca passada pela navegação
}

const ModelScreen: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute(); // Hook para acessar os parâmetros da rota
  const { brandCode } = route.params as RouteParams;

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos`
        );
        setModels(response.data.modelos);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [brandCode]);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Container>
    );
  }

  return (
    <Container>
      <Title>Modelos de Carros</Title>
      <FlatList
        data={models}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <ModelContainer>
            <ModelText>{item.nome}</ModelText>
          </ModelContainer>
        )}
        ListEmptyComponent={<EmptyText>Nenhum modelo encontrado</EmptyText>}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: ${theme.spacings.medium};
  background-color: ${theme.colors.background};
`;

const Title = styled.Text`
  font-size: ${theme.fontSizes.xlarge};
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacings.medium};
  text-align: center;
`;

const ModelContainer = styled.TouchableOpacity`
  padding: ${theme.spacings.medium};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.secondaryText};
`;

const ModelText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.text};
`;

const EmptyText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.secondaryText};
  text-align: center;
  margin-top: ${theme.spacings.medium};
`;

export default ModelScreen;
