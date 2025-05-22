import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, ScrollView } from "react-native";
import { RadioButton, TextInput, Button } from "react-native-paper";
import { useKasirStore } from "../stores/kasirStore";

const outletList = [
  { label: "Outlet 1", value: "Outlet 1" },
  { label: "Outlet 2", value: "Outlet 2" },
  { label: "Outlet 3", value: "Outlet 3" },
];

const PrintDialog = ({
  visible,
  onDismiss,
  handlePrint,
  totalOrderPrice,
  paymentList,
  paymentType,
  setPaymentType,
}) => {
  // const [cash, setCash] = useState(0);
  // const [kembalian, setKembalian] = useState(0);

  const {
    kasir,
    setKasir,
    outlet,
    setOutlet,
    cash,
    setCash,
    kembalian,
    setKembalian,
    customer,
    setCustomer,
  } = useKasirStore();

  useEffect(() => {
    setKembalian(cash - totalOrderPrice);
  }, [cash, totalOrderPrice]);

  const handlePrintAndDismiss = async () => {
    await handlePrint();
    setCash(0);
    onDismiss();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={{ width: "100%" }} contentContainerStyle={{ padding: 20 }}>
              <Text style={styles.title}>Cetak</Text>

              <Text style={styles.harga}>
                Total Harga: Rp. {totalOrderPrice?.toLocaleString("id-ID")}
              </Text>

              <View style={{ marginBottom: 16 }}>
                <Text style={styles.label}>Pilih Pembayaran:</Text>
                <RadioButton.Group
                  onValueChange={(value) => setPaymentType(value)}
                  value={paymentType}
                >
                  {paymentList.map((item) => (
                    <RadioButton.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </RadioButton.Group>
              </View>

              {/* JUMLAH */}
              <TextInput
                label="Jumlah Uang"
                keyboardType="numeric"
                mode="outlined"
                value={cash}
                onChangeText={(text) => setCash(text)}
                style={styles.input}
              />
              <TextInput
                label="Nama Kasir"
                mode="outlined"
                value={kasir}
                onChangeText={(text) => setKasir(text)}
                style={styles.input}
              />

              <TextInput
                label="Nama Customer"
                mode="outlined"
                value={customer}
                onChangeText={(text) => setCustomer(text)}
                style={styles.input}
              />

              <View style={{ marginBottom: 16 }}>
                <Text style={styles.label}>Pilih Outlet:</Text>
                <RadioButton.Group onValueChange={(value) => setOutlet(value)} value={outlet}>
                  {outletList.map((item) => (
                    <RadioButton.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </RadioButton.Group>
              </View>

              <Text style={styles.harga}>Kembalian : Rp. {kembalian?.toLocaleString("id-ID")}</Text>

              {/* CATATAN */}
              {/* <TextInput label="Catatan" mode="outlined" style={styles.input} /> */}
              {/* 
            <Text style={styles.total}>
              Total Harga: Rp. {calculateTotalPrice().toLocaleString("id-ID")}
            </Text> */}

              <View style={styles.actions}>
                <Button
                  mode="outlined"
                  onPress={onDismiss}
                  style={{ marginRight: 8, width: "48%", borderRadius: 12 }}
                >
                  Batal
                </Button>
                <Button
                  mode="contained"
                  style={{ width: "48%", borderRadius: 12 }}
                  onPress={handlePrintAndDismiss}
                >
                  Cetak
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  harga: {
    fontWeight: "bold",
    marginVertical: 8,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "50%",
    maxHeight: "85%",
    padding: 26,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PrintDialog;
