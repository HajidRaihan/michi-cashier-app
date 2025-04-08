import React from "react";
import { StyleSheet, View, Text } from "react-native";
import OrderCard from "./OrderCard";

const OrderList = () => {
  return (
    <View style={styles.orderDetails}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Order Details</Text>
      <OrderCard />
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetails: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginLeft: 8,
  },
});

export default OrderList;
