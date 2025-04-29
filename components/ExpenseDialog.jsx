import { useState } from "react";
import { Text, View, Modal, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { createExpenses } from "../services/expenseService";
import { generateTimeBasedId } from "../lib/generateId";
import Toast from "react-native-toast-message";
import { useErrorToast, useSuccessToast } from "../hook/useToastHandler";

const ExpenseDialog = ({ onDismiss, visible }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();

  const createExpensesHandler = async () => {
    const data = {
      id: generateTimeBasedId(),
      amount,
      description,
      expense_date: date,
    };
    console.log("ini ada", data);
    const res = await createExpenses(data);

    onDismiss();
    if (res.error) {
      return useErrorToast("Gagal menambahkan pengeluaran");
    }
    console.log(res);
    useSuccessToast("Berhasil menambahkan pengeluaran");
  };

  const showToast = () => {
    Toast.show({
      type: "error", // success | error | info
      text1: "Berhasil",
      text2: "Pengeluaran berhasil ditambahkan 👋",
      position: "bottom", // atau 'bottom'
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
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
              <Button mode="contained" onPress={createExpensesHandler} style={styles.button}>
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

export default ExpenseDialog;
