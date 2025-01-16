import styled from "styled-components/native";
import { theme } from "utils/theme";

export const Container = styled.View`
  flex: 1;
  padding: ${theme.spacings.medium};
  background-color: ${theme.colors.background};
`;

export const ModelContainer = styled.TouchableOpacity`
  padding: ${theme.spacings.medium};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.secondaryText};
`;

export const ModelText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.text};
`;

export const EmptyText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.secondaryText};
  text-align: center;
  margin-top: ${theme.spacings.medium};
`;
