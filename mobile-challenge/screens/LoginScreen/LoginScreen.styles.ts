import styled from "styled-components/native";
import { TextInputMask } from "react-native-masked-text";
import { theme } from "utils/theme";

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: ${theme.spacings.large};
  margin-top: 32;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: ${theme.fontSizes.xlarge};
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacings.large};
  margin-top: ${theme.spacings.huge};
`;

export const MaskedInput = styled(TextInputMask)`
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

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: ${theme.spacings.medium};
  background-color: ${theme.colors.primary};
  border-radius: 8px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.buttonText};
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  margin-bottom: ${theme.spacings.small};
`;
