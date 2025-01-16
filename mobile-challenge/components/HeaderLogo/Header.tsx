import React from "react";
import { View, Text, Button, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import { theme } from "utils/theme";

interface HeaderProps {
  logo: ImageSourcePropType;
  title: string;
  onSignOut: () => void;
  buttonColor: string;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  title,
  onSignOut,
  buttonColor,
}) => {
  return (
    <HeaderContainer>
      <Logo source={logo} />
      <Wrapper>
        <Title>{title}</Title>
        <SignOutButton title="Sair" onPress={onSignOut} color={buttonColor} />
      </Wrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.SafeAreaView`
  flex-direction: row;
  margin-bottom: ${theme.spacings.medium};
  padding: 0 ${theme.spacings.medium};
`;

const Logo = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 10px;
`;

const Title = styled.Text`
  font-size: ${theme.fontSizes.xlarge};
  color: ${theme.colors.primary};
`;

const SignOutButton = styled(Button)`
  margin-left: auto;
`;

export default Header;
