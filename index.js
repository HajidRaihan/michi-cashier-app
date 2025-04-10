import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";

const theme = {
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FF9800",
    lightPrimary: "#FFF3E0",
    secondary: "#3F51B5",
    lightSecondary: "#E8EAF6",
    gray: "#757575",
  },
};
const Main = () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);
