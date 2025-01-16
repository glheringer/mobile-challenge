import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { theme } from "utils/theme";

import {
  Container,
  EmptyText,
  ModelContainer,
  ModelText,
} from "./ModelScreen.styles";

import { useRoute } from "@react-navigation/native";

interface Model {
  codigo: string;
  nome: string;
}

interface RouteParams {
  brandCode: string;
}

const ModelScreen: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute();
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

export default ModelScreen;
