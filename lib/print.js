import { PermissionsAndroid, Platform } from "react-native";
import { BLEPrinter } from "react-native-thermal-receipt-printer-image-qr";

export const requestBluetoothPermissions = async () => {
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // optional tapi kadang diperlukan
  ]);

  console.log("Permission result:", result);
};

export const logPermissionStatus = async () => {
  const hasConnect = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
  );
  const hasScan = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
  const hasLocation = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  console.log("Permissions => CONNECT:", hasConnect, "SCAN:", hasScan, "LOCATION:", hasLocation);
};

export const scanForPrinters = async () => {
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

export const connectToPrinter = async (printer) => {
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

export const printStruk = async (items) => {
  //   if (!selectedPrinter) {
  //     Alert.alert("Error", "Please connect to a printer first.");
  //     return;
  //   }

  try {
    BLEPrinter.printText("<C><B>RECEIPT</B></C>\n");
    BLEPrinter.printText("<C>====================</C>\n\n");

    let total = 0;

    items.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      BLEPrinter.printText(`${item.name} x${item.quantity}   Rp ${itemTotal.toLocaleString()}\n`);
    });

    BLEPrinter.printText(`<C>--------------------</C>\n`);
    BLEPrinter.printText(`<C><B>TOTAL: Rp ${total.toLocaleString()}</B></C>\n\n`);

    BLEPrinter.printText(`<C>Terima kasih!</C>\n`);
    BLEPrinter.printText(`<C>Silakan datang kembali</C>\n`);

    BLEPrinter.printBill("", { beep: true, cut: true });
  } catch (error) {
    console.error("Error printing text:", error);
    Alert.alert("Print Error", "Failed to print text.");
  }
};

export const disconnectPrinter = async () => {
  try {
    await BLEPrinter.closeConn();
    setSelectedPrinter(null);
    Alert.alert("Disconnected", "Printer connection closed");
  } catch (error) {
    console.error("Error disconnecting:", error);
  }
};
