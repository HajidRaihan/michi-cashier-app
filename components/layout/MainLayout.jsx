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
    padding: 10,
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "#f2f2f2",
  },
});
