import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, ScrollView } from "react-native";
import { RadioButton, TextInput, Button } from "react-native-paper";
import { useKasirStore } from "../stores/kasirStore";

const outletList = [
  { label: "Outlet 1", value: "Outlet 1" },
  { label: "Outlet 2", value: "Outlet 2" },
  { label: "Outlet 3", value: "Outlet 3" },
];

const OutletDialog = ({ visible, onDismiss }) => {
  const { kasir, setKasir, outlet, setOutlet } = useKasirStore();

  const saveData = () => {
    setKasir(kasir);
    setOutlet(outlet);
    onDismiss();
  };

  const cancelData = () => {
    setKasir("");
    setOutlet("");
    onDismiss();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={{ width: "100%" }} contentContainerStyle={{ padding: 20 }}>
              <Text style={styles.title}>Masukkan data kasir</Text>
              <TextInput
                label="Nama Kasir"
                mode="outlined"
                value={kasir}
                onChangeText={(text) => setKasir(text)}
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

              <View style={styles.actions}>
                <Button
                  mode="outlined"
                  onPress={cancelData}
                  style={{ marginRight: 8, width: "48%", borderRadius: 12 }}
                >
                  Batal
                </Button>
                <Button
                  mode="contained"
                  style={{ width: "48%", borderRadius: 12 }}
                  onPress={saveData}
                >
                  Simpan
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

export default OutletDialog;
