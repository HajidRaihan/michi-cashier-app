import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import OrderCard from "./OrderCard";
import { Button, useTheme } from "react-native-paper";
import { printStruk } from "../lib/print";
import { useOrderStore } from "../stores/orderStore";
import { createOrder } from "../services/orderService";
import PrintDialog from "./PrintDialog";
import { useKasirStore } from "../stores/kasirStore";
import OutletDialog from "./OutletDialog";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "react-native-toast-message";
import { useToastHandler } from "../hook/useToastHandler";

const OrderList = () => {
  const theme = useTheme();
  const { orders, totalOrderPrice, clearOrders } = useOrderStore();
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const [openOutletDialog, setOpenOutletDialog] = useState(false);
  const [paymentType, setPaymentType] = useState("Cash");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastHandler();

  const { kasir, outlet } = useKasirStore();

  const paymentList = [
    { label: "Cash", value: "Cash" },
    { label: "QRIS", value: "QRIS" },
  ];

  const openConfirmDialogHandler = () => {
    if (!kasir && !outlet) {
      setOpenOutletDialog(true);
      return;
    }
    setOpenConfirmDialog(true);
  };

  const handleOrder = async () => {
    if (!kasir && !outlet) {
      setOpenOutletDialog(true);
      return;
    }
    setLoading(true);
    const data = {
      orders,
      totalOrderPrice,
      outlet,
      kasir,
      payment_type: paymentType,
    };
    try {
      const order = await createOrder(data);
      console.log("order berhasil", order);
      setLoading(false);
      clearOrders();
      showToast("success", "Berhasil menyimpan pesanan");
    } catch (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      showToast("error", "Gagal menyimpan pesanan");
    } finally {
      setOpenConfirmDialog(false);
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
    <>
      <Toast />
      <View style={styles.orderDetails}>
        <PrintDialog
          handlePrint={handlePrint}
          visible={openPrintDialog}
          totalOrderPrice={totalOrderPrice}
          onDismiss={() => setOpenPrintDialog(false)}
          paymentList={paymentList}
          setPaymentType={setPaymentType}
          paymentType={paymentType}
        />
        <OutletDialog visible={openOutletDialog} onDismiss={() => setOpenOutletDialog(false)} />
        <ConfirmDialog
          visible={openConfirmDialog}
          onDismiss={() => setOpenConfirmDialog(false)}
          action={"Simpan"}
          title={"Apakah anda yakin ingin menyimpan order ini?"}
          loading={loading}
          handler={handleOrder}
        />
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Detail Pesanan</Text>
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
              onPress={openConfirmDialogHandler}
              disabled={orders.length === 0}
            >
              Simpan
            </Button>
            <Button
              icon="printer"
              style={styles.printButton}
              mode="contained"
              disabled={orders.length === 0}
              onPress={() => setOpenPrintDialog(true)}
            >
              Cetak
            </Button>
          </View>
        </View>
      </View>
    </>
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
