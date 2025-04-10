import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const MenuCounter = ({ tambahMenu, kurangMenu, menuCount }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <TouchableOpacity onPress={tambahMenu} style={styles.button}>
        <Text style={styles.symbol}>▲</Text>
      </TouchableOpacity>

      <Text style={styles.count}>{menuCount}</Text>

      <TouchableOpacity onPress={kurangMenu} style={styles.button}>
        <Text style={styles.symbol}>▼</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#F5F3FF",
    elevation: 3,
    width: 40,
  },
  button: {
    padding: 0,
    color: "#fff",
  },
  symbol: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  count: {
    fontSize: 12,
    fontWeight: "600",
    marginVertical: 2,
    color: "#fff",
  },
});

export default MenuCounter;
