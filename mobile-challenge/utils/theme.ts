import { Fonts, FontSizes, FontWeights, Spacings, Theme } from "./types";

const commonStyles: {
  fontSizes: FontSizes;
  spacings: Spacings;
  fonts: Fonts;
  fontWeights: FontWeights;
} = {
  fontSizes: {
    xsmall: "12px",
    small: "14px",
    medium: "16px",
    large: "20px",
    xlarge: "24px",
  },
  spacings: {
    xsmall: "8px",
    small: "10px",
    medium: "16px",
    large: "20px",
    xlarge: "24px",
    huge: "32px",
  },
  fonts: {
    regular: "Roboto-Regular",
    bold: "Roboto-Bold",
  },
  fontWeights: {
    regular: "400",
    bold: "700",
  },
};

export const theme: Theme = {
  ...commonStyles,
  colors: {
    background: "#FFFFFF",
    text: "#000000",
    secondaryText: "#c4c4c4",
    primary: "#145DA0",
    primaryLight: "#B1D4E0",
    buttonText: "#FFFFFF",
    secondary: "#000000",
    error: "#EF5350",
  },
};
