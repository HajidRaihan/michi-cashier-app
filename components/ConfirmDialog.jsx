import { useState } from "react";
import { Text, View, Modal, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";

const ConfirmDialog = ({ loading, onDismiss, visible, title, handler, action }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.title}>{title}</Text>
            {/* <TextInput
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
          /> */}
            <View style={styles.actions}>
              <Button mode="outlined" onPress={onDismiss} style={styles.button}>
                Batal
              </Button>
              <Button mode="contained" loading={loading} onPress={handler} style={styles.button}>
                {action}
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
    // width: "50%",
    width: 300,
    maxHeight: "85%",
    paddingVertical: 16,
    overflow: "hidden",
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
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
    justifyContent: "center",
  },
  button: {
    borderRadius: 12,
    width: 120,
  },
});
export default ConfirmDialog;
