import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const MenuCounter = () => {
  const theme = useTheme();
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(Math.max(0, count - 1));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Text style={styles.symbol}>▲</Text>
      </TouchableOpacity>

      <Text style={styles.count}>{count}</Text>

      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Text style={styles.symbol}>▼</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
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
