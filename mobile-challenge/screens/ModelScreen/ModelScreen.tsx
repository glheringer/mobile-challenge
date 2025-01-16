// filepath: /Users/guilherme.heringer/Projetos/mobile-challenge/mobile-challenge/screens/ModelScreen/ModelScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import styled from "styled-components/native";
import { useRoute } from "@react-navigation/native";

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
        <ActivityIndicator size="large" color="#000" />
      </Container>
    );
  }

  return (
    <Container>
      <Title>Car Models</Title>
      <FlatList
        data={models}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <ModelContainer>
            <ModelText>{item.nome}</ModelText>
          </ModelContainer>
        )}
        ListEmptyComponent={<EmptyText>No models found</EmptyText>}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const ModelContainer = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const ModelText = styled.Text`
  font-size: 16px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 16px;
`;

export default ModelScreen;
