import React from "react";
import { Card, Text, useTheme } from "react-native-paper";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, StyleSheet } from "react-native";

const CardCategory = ({ title, isActive = false, onPress, icon = faMugSaucer }) => {
  const theme = useTheme();

  return (
    <Card
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: isActive ? theme.colors.lightSecondary : "#fff",
          borderWidth: isActive ? 1.5 : 0,
          borderColor: isActive ? theme.colors.secondary : "transparent",
        },
      ]}
    >
      <View style={styles.content}>
        <FontAwesomeIcon
          icon={icon}
          color={isActive ? theme.colors.secondary : theme.colors.gray}
          size={24}
        />
        <Text
          style={[styles.text, { color: isActive ? theme.colors.secondary : theme.colors.text }]}
        >
          {title}
        </Text>
      </View>
    </Card>
  );
};

export default CardCategory;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    width: 200,
    marginVertical: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
});
