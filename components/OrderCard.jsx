import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { TrashIcon } from "react-native-heroicons/outline";

const OrderCard = ({ item, deleteProdukOrder }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontWeight: "500" }}>{item?.name}</Text>
        <Text style={{ fontSize: 12 }}>x{item?.quantity}</Text>
        <Text style={{ fontSize: 12 }}>Rp. {(item.price * item.quantity).toLocaleString()}</Text>
      </View>
      <IconButton
        icon={() => <TrashIcon size={14} color="#c70000" />}
        iconColor="#c70000"
        containerColor="#f5f5f5"
        size={20} // ukuran ikon
        style={styles.smallButton}
        onPress={() => deleteProdukOrder(item?.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    // opacity: 0.5,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderCard;
