// components/MainLayout.tsx
import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

const MainLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {children}
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    // padding: 8,
    backgroundColor: "#f5f5f5",
  },
});
