import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { Stack } from "expo-router";
import SideBar from "../components/SideBar";
import { View, StyleSheet } from "react-native";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FF9800",
    lightPrimary: "#FFF3E0",
    secondary: "#3F51B5",
    lightSecondary: "#E8EAF6",
    gray: "#757575",
  },
};

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <SideBar />
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // Sidebar kiri
  },
  content: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
});
