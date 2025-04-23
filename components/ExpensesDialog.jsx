import { useState } from "react";
import { Text, View, Modal, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

const ExpensesDialog = ({ onDismiss }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();

  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.title}>Pengeluaran</Text>
            <TextInput
              label="Deskripsi"
              value={description}
              onChangeText={(text) => setDescription(text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Jumlah"
              value={amount}
              keyboardType="numeric"
              onChangeText={(text) => setAmount(text)}
              mode="outlined"
              style={styles.input}
            />

            <DatePickerInput
              locale="en"
              mode="outlined"
              label="Tanggal"
              value={date}
              onChange={(d) => setDate(d)}
              inputMode="start"
            />
            <View style={styles.actions}>
              <Button mode="outlined" onPress={onDismiss} style={styles.button}>
                Batal
              </Button>
              <Button
                mode="contained"
                // onPress={handleAddToCart}
                style={styles.button}
              >
                Tambah
              </Button>
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
    paddingVertical: 16,
    overflow: "hidden",
    padding: 20,
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
  total: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    gap: 10,
    width: "100%",
    justifyContent: "flex-end",
  },
  button: {
    borderRadius: 12,
    width: 120,
  },
});
export default ExpensesDialog;
