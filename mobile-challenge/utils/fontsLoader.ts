import * as Font from "expo-font";

export const loadFonts = () => {
  return Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });
};
