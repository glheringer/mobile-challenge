import React from "react";
import { ImageSourcePropType } from "react-native";
import { Icon } from "react-native-elements";
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
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <Icon
        name="close"
        type="material"
        color={buttonColor}
        onPress={onSignOut}
        size={40}
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.medium};
  padding: 0 ${theme.spacings.medium};
`;

const Logo = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const TitleWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${theme.fontSizes.xlarge};
  color: ${theme.colors.primary};
`;

export default Header;
