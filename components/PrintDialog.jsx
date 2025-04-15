import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  TextInput as RNTextInput,
} from "react-native";
import { RadioButton, TextInput, Button } from "react-native-paper";
const PrintDialog = ({ visible, onDismiss, handlePrint }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={{ width: "100%" }} contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.title}>Cetak</Text>

            {/* JUMLAH */}
            <TextInput label="Jumlah" keyboardType="numeric" mode="outlined" style={styles.input} />

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
                style={{ marginRight: 8, width: "50%", borderRadius: 12 }}
              >
                Batal
              </Button>
              <Button
                mode="contained"
                style={{ width: "50%", borderRadius: 12 }}
                onPress={handlePrint}
              >
                Cetak
              </Button>
            </View>
          </View>
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
    justifyContent: "flex-end",
  },
});

export default PrintDialog;
