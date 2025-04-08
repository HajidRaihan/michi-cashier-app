// components/MainLayout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

const MainLayout = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
});
