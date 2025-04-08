// components/MenuCard.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button, Avatar } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { PlusIcon } from "react-native-heroicons/outline";
import { IconButton, MD3Colors } from "react-native-paper";

const MenuCard = ({ title, price, imageUrl, onAdd }) => {
  return (
    <Card style={styles.card} mode="elevated">
      <View style={styles.content}>
        <Avatar.Image
          size={64}
          source={{ uri: "https://i.ytimg.com/vi/j9a9EB0pGTo/sddefault.jpg?v=61236060" }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>Rp. {price.toLocaleString()}</Text>
        </View>
        {/* <Button mode="contained" style={styles.button} onPress={onAdd}>
          <PlusIcon size={10} color="#fff" />
        </Button> */}
        <IconButton
          icon="plus"
          iconColor="#2D0052"
          containerColor="#fcc800"
          size={14} // ukuran ikon
          style={styles.smallButton}
          onPress={onAdd}
        />
      </View>
    </Card>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    backgroundColor: "#fff",
    width: 280,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  button: {
    backgroundColor: "#FFD700",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 10,
  },
  smallButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
