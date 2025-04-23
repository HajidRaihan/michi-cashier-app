import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { Stack } from "expo-router";
import SideBar from "../components/SideBar";
import { View, StyleSheet } from "react-native";
import ScanPrintDialog from "../components/ScanPrintDialog";
import { enGB, registerTranslation } from "react-native-paper-dates";

registerTranslation("en-GB", enGB);

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
        {/* <ScanPrintDialog /> */}
        <SideBar />
        <View style={styles.content}>
          {/* <Stack screenOptions={{ headerShown: false, animation: "none" }} /> */}
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="orders" options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="menu" options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen
              name="menuForm"
              options={{ headerShown: true, animation: "none", title: "Tambah Produk" }}
            />
            <Stack.Screen name="expenses" options={{ headerShown: false, animation: "none" }} />
          </Stack>
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
