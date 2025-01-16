export interface FontSizes {
  xsmall: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
}

export interface Spacings {
  xsmall: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
  huge: string;
}

export interface Fonts {
  regular: string;
  bold: string;
}

export interface FontWeights {
  regular: string;
  bold: string;
}

export interface Colors {
  background: string;
  text: string;
  secondaryText: string;
  primary: string;
  primaryLight: string;
  buttonText: string;
  secondary: string;
  error: string;
}

export interface Theme {
  fontSizes: FontSizes;
  spacings: Spacings;
  fonts: Fonts;
  fontWeights: FontWeights;
  colors: Colors;
}
