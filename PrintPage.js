import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Image } from "react-native";
import { BLEPrinter } from "react-native-thermal-receipt-printer-image-qr";
import { PermissionsAndroid, Platform } from "react-native";

const PrintPage = () => {
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 31) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // optional tapi kadang diperlukan
      ]);

      console.log("Permission result:", result);
    }
  };

  const logPermissionStatus = async () => {
    const hasConnect = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    );
    const hasScan = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
    const hasLocation = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    console.log("Permissions => CONNECT:", hasConnect, "SCAN:", hasScan, "LOCATION:", hasLocation);
  };

  useEffect(() => {
    requestBluetoothPermissions();
    logPermissionStatus();
  }, []);

  // Initialize and get available Bluetooth printers
  const scanForPrinters = async () => {
    setLoading(true);
    await requestBluetoothPermissions();
    try {
      await BLEPrinter.init();
      const availablePrinters = await BLEPrinter.getDeviceList();
      setPrinters(availablePrinters || []);
      console.log("Available printers:", availablePrinters);
    } catch (error) {
      console.error("Error scanning for printers:", error);
      Alert.alert("Error", "Failed to scan for printers. Make sure Bluetooth is enabled.");
    } finally {
      setLoading(false);
    }
  };

  // Connect to selected printer
  const connectToPrinter = async (printer) => {
    setLoading(true);
    try {
      // Connect using the device's Bluetooth MAC address
      await BLEPrinter.connectPrinter(printer.inner_mac_address);
      setSelectedPrinter(printer);
      Alert.alert("Success", `Connected to ${printer.device_name}`);
    } catch (error) {
      console.error("Error connecting to printer:", error);
      Alert.alert("Connection Failed", "Could not connect to the selected printer.");
    } finally {
      setLoading(false);
    }
  };

  // Print sample text
  const printText = async () => {
    if (!selectedPrinter) {
      Alert.alert("Error", "Please connect to a printer first.");
      return;
    }

    try {
      // Print centered text with bold formatting
      BLEPrinter.printText("<C><B>RECEIPT</B></C>\n");
      BLEPrinter.printText("<C>====================</C>\n\n");

      BLEPrinter.printText("Item 1           $10.00\n");
      BLEPrinter.printText("Item 2            $5.50\n");
      BLEPrinter.printText("Item 3           $12.99\n\n");

      BLEPrinter.printText("<C>--------------------</C>\n");
      BLEPrinter.printText("TOTAL:           $28.49\n\n");

      BLEPrinter.printText("<C>Thank you for your purchase!</C>\n");
      BLEPrinter.printText("<C>Please come again</C>\n\n");

      // Cut the paper
      BLEPrinter.printBill("", { beep: true, cut: true });
    } catch (error) {
      console.error("Error printing text:", error);
      Alert.alert("Print Error", "Failed to print text.");
    }
  };

  // Print sample image
  const printImage = async () => {
    if (!selectedPrinter) {
      Alert.alert("Error", "Please connect to a printer first.");
      return;
    }

    try {
      // Print a sample image from a URL
      // Note: Some printers may only support certain image sizes and formats
      BLEPrinter.printText("<C><B>HELLO MICHIII!!</B></C>\n\n");

      BLEPrinter.printImage("https://reactnative.dev/img/tiny_logo.png", {
        imageWidth: 300,
        imageHeight: 300,
      });

      BLEPrinter.printBill("\n<C>End of demo</C>", { beep: false, cut: true });
    } catch (error) {
      console.error("Error printing image:", error);
      Alert.alert("Print Error", "Failed to print image.");
    }
  };

  // Disconnect from printer
  const disconnectPrinter = async () => {
    try {
      await BLEPrinter.closeConn();
      setSelectedPrinter(null);
      Alert.alert("Disconnected", "Printer connection closed");
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  // Component to render each printer item
  const PrinterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.printerItem,
        selectedPrinter?.inner_mac_address === item.inner_mac_address && styles.selectedPrinter,
      ]}
      onPress={() => connectToPrinter(item)}
    >
      <Text style={styles.printerName}>{item.device_name}</Text>
      <Text style={styles.printerAddress}>{item.inner_mac_address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Thermal Printer</Text>

      {/* Scan for printers button */}
      <TouchableOpacity style={styles.scanButton} onPress={scanForPrinters} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Scanning..." : "Scan for Printers"}</Text>
      </TouchableOpacity>

      {/* List of available printers */}
      <View style={styles.printersContainer}>
        <Text style={styles.sectionTitle}>Available Printers:</Text>
        {printers.length > 0 ? (
          <FlatList
            data={printers}
            renderItem={({ item }) => <PrinterItem item={item} />}
            keyExtractor={(item) => item.inner_mac_address}
          />
        ) : (
          <Text style={styles.noPrinters}>
            {loading ? "Searching for printers..." : "No printers found"}
          </Text>
        )}
      </View>

      {/* Currently connected printer */}
      {selectedPrinter && (
        <View style={styles.connectedPrinter}>
          <Text style={styles.sectionTitle}>Connected Printer:</Text>
          <Text style={styles.printerName}>{selectedPrinter.device_name}</Text>

          <TouchableOpacity style={styles.disconnectButton} onPress={disconnectPrinter}>
            <Text style={styles.buttonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Print buttons */}
      <View style={styles.printActionsContainer}>
        <TouchableOpacity
          style={[styles.printButton, !selectedPrinter && styles.disabledButton]}
          onPress={printText}
          disabled={!selectedPrinter}
        >
          <Text style={styles.buttonText}>Print Sample Text</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.printButton, !selectedPrinter && styles.disabledButton]}
          onPress={printImage}
          disabled={!selectedPrinter}
        >
          <Text style={styles.buttonText}>Print Sample Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  scanButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  printersContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 1,
    maxHeight: 200,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  printerItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedPrinter: {
    backgroundColor: "#e1f5fe",
    borderColor: "#2196F3",
  },
  printerName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  printerAddress: {
    fontSize: 14,
    color: "#666",
  },
  noPrinters: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
    padding: 20,
  },
  connectedPrinter: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  disconnectButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  printActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  printButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PrintPage;
