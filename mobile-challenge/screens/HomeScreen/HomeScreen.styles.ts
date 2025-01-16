import styled from "styled-components/native";
import { theme } from "utils/theme";
import HeaderLogoComponent from "components/HeaderLogo/Header";

export const Container = styled.View`
  flex: 1;
  padding: ${theme.spacings.medium};
  background-color: ${theme.colors.background};
`;

export const UserName = styled.Text`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacings.medium};
`;

export const BrandContainer = styled.TouchableOpacity`
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

export const BrandText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.buttonText};
`;

export const EmptyText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.secondaryText};
  text-align: center;
  margin-top: ${theme.spacings.medium};
`;
