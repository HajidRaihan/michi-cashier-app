import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import OrderCard from "./OrderCard";
import { Button, useTheme } from "react-native-paper";
import { printStruk } from "../lib/print";
import { useOrderStore } from "../stores/orderStore";
import { createOrder } from "../services/orderService";
import PrintDialog from "./PrintDialog";

const OrderList = ({ product }) => {
  const theme = useTheme();
  const [total, setTotal] = useState();
  const { orders, totalOrderPrice } = useOrderStore();
  const [openPrintDialog, setOpenPrintDialog] = useState(false);

  const handleOrder = async () => {
    try {
      const order = await createOrder(orders, totalOrderPrice);
      console.log("order berhasil", order);
      console.log("lkjl");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = async () => {
    // const filteredProduct = product.filter((item) => item.quantity > 0);
    // if (filteredProduct.length === 0) {
    //   Alert.alert("Tidak bisa cetak", "Tidak ada produk dengan jumlah lebih dari 0.");
    //   return;
    // }

    try {
      await printStruk(orders);
    } catch (error) {
      console.error("Error printing:", error);
    }
  };

  useEffect(() => {
    console.log({ orders });
  }, [orders]);

  return (
    <View style={styles.orderDetails}>
      <PrintDialog
        handlePrint={handlePrint}
        visible={openPrintDialog}
        onDismiss={() => setOpenPrintDialog(false)}
      />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Order Details</Text>
      <ScrollView style={styles.orderListContainer}>
        {orders.length > 0 && orders?.map((item, index) => <OrderCard key={index} item={item} />)}
      </ScrollView>

      <View style={styles.totalContainer}>
        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Rp. {totalOrderPrice.toLocaleString("id-ID")}</Text>
        </View>

        <View style={styles.buttonRow}>
          <Button
            icon="content-save"
            style={styles.saveButton}
            mode="contained"
            onPress={handleOrder}
          >
            Simpan
          </Button>
          <Button
            icon="printer"
            style={styles.printButton}
            mode="contained"
            onPress={() => setOpenPrintDialog(true)}
          >
            Cetak
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetails: {
    width: 300,
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
    marginBottom: 150,
  },

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
