import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import OrderCard from "./OrderCard";
import { Button, useTheme } from "react-native-paper";
import { printStruk } from "../lib/print";
import { useOrderStore } from "../stores/orderStore";

const OrderList = ({ product, deleteProdukOrder }) => {
  const theme = useTheme();
  const [total, setTotal] = useState();
  const { orders, totalOrderPrice } = useOrderStore();

  const handlePrint = async () => {
    const filteredProduct = product.filter((item) => item.quantity > 0);
    if (filteredProduct.length === 0) {
      Alert.alert("Tidak bisa cetak", "Tidak ada produk dengan jumlah lebih dari 0.");
      return;
    }

    try {
      await printStruk(filteredProduct);
    } catch (error) {
      console.error("Error printing:", error);
    }
  };

  useEffect(() => {
    setTotal(product?.reduce((total, item) => total + item.price * item.quantity, 0));
  }, [product]);
  return (
    <View style={styles.orderDetails}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Order Details</Text>
      <ScrollView style={styles.orderListContainer}>
        {orders.length > 0 &&
          orders?.map((item, index) => (
            <OrderCard key={index} item={item} deleteProdukOrder={deleteProdukOrder} />
          ))}
        {/* <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard /> */}
      </ScrollView>
      {/* <View style={styles.totalContainer}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Total</Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Rp. 200.000</Text>
        </View>
        <View
          style={{ marginTop: 16, flexDirection: "row", justifyContent: "space-between", gap: 8 }}
        >
          <Button
            icon="content-save"
            style={{ borderRadius: 12, backgroundColor: "#FF9800" }}
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Simpan
          </Button>
          <Button
            icon="printer"
            style={{ borderRadius: 12, backgroundColor: "#3F51B5", width: 120 }}
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Cetak
          </Button>
        </View>
      </View> */}
      <View style={styles.totalContainer}>
        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Rp. {totalOrderPrice.toLocaleString()}</Text>
        </View>

        <View style={styles.buttonRow}>
          <Button
            icon="content-save"
            style={styles.saveButton}
            mode="contained"
            onPress={() => console.log("Simpan pressed")}
          >
            Simpan
          </Button>
          <Button icon="printer" style={styles.printButton} mode="contained" onPress={handlePrint}>
            Cetak
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetails: {
    width: 280,
    backgroundColor: "#fff",
    // borderRadius: 12,
    padding: 16,
    overflow: "scroll",
    marginLeft: 8,
    position: "relative",
  },
  orderListContainer: {
    gap: 10,
    padding: 1,
    marginBottom: 200,
  },
  // totalContainer: {
  //   position: "absolute",
  //   height: 200,
  //   left: 0, // supaya mulai dari kiri
  //   right: 0, // supaya sampai ke kanan
  //   bottom: 0,
  //   padding: 20,
  //   // backgroundColor: "#fff", // penting biar gak transparan
  //   // borderWidth: 1,
  //   borderTopColor: "#ccc",
  //   elevation: 1,
  //   borderTopEndRadius: 20,
  //   borderTopStartRadius: 20,
  // },
  totalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 16,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },

  totalValue: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#3F51B5",
  },

  buttonRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },

  saveButton: {
    borderRadius: 12,
    backgroundColor: "#FF9800",
    flex: 1,
  },

  printButton: {
    borderRadius: 12,
    backgroundColor: "#3F51B5",
    flex: 1,
  },
});

export default OrderList;
