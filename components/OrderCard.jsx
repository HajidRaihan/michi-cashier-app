import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { TrashIcon } from "react-native-heroicons/outline";
import { useOrderStore } from "../stores/orderStore";

const OrderCard = ({ item }) => {
  const { removeFromOrder } = useOrderStore();

  const handleRemove = () => {
    removeFromOrder(item.product_id, item.variant_value);
  };

  useEffect(() => {
    console.log({ item });
  }, [item]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontWeight: "500" }}>{item.name}</Text>
        <Text style={{ fontSize: 12 }}>x{item.quantity}</Text>
        {item.variant_type_name && (
          <Text style={{ fontSize: 12 }}>
            {item.variant_type_name} : {item.variant_value}{" "}
            {item.variant_extra_price > 0 && `(+Rp. ${item.variant_extra_price?.toLocaleString()})`}
          </Text>
        )}
        <Text style={{ fontSize: 12 }}>catatan : {item.note}</Text>

        <Text style={{ fontSize: 12 }}>Rp. {item.total_price?.toLocaleString("id-ID")}</Text>
      </View>
      <IconButton
        icon={() => <TrashIcon size={14} color="#c70000" />}
        iconColor="#c70000"
        containerColor="#f5f5f5"
        size={20}
        style={styles.smallButton}
        onPress={handleRemove}
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
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderCard;
