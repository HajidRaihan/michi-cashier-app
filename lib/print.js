import { PermissionsAndroid, Platform } from "react-native";
import { BLEPrinter } from "react-native-thermal-receipt-printer-image-qr";
import { Alert } from "react-native";
import Logo from "../assets/logo.png";

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

export const printStruk = async ({
  orders,
  totalOrderPrice,
  outlet,
  kasir,
  payment_type,
  cash,
  kembalian,
  customer,
}) => {
  try {
    return console.log("customer", customer, orders);
    const date = new Date();
    const formattedDate = date.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    let total = 0;

    // Ganti dengan logo URL asli kamu nanti

    // Header + Logo
    await BLEPrinter.printImage(Logo, { width: 250, base64: false });
    BLEPrinter.printText("<C>==============================</C>\n");
    BLEPrinter.printText(`<C>${outlet}</C>\n`);
    BLEPrinter.printText(`<C>${formattedDate}</C>\n`);
    BLEPrinter.printText(`<C>Kasir: ${kasir}</C>\n`);
    BLEPrinter.printText(`<C>Customer: ${customer}</C>\n`);
    BLEPrinter.printText("<C>==============================</C>\n\n");

    // orders
    orders.forEach((item) => {
      const itemTotal = item.total_price;
      // total += itemTotal;

      BLEPrinter.printText(`${item.name}\n`);

      if (item.variant_type_name && item.variant_value) {
        BLEPrinter.printText(`- ${item.variant_type_name}: ${item.variant_value}\n`);
      }

      const unitPrice = item.base_price + (item.variant_extra_price || 0);
      BLEPrinter.printText(
        `${item.quantity} x Rp. ${unitPrice.toLocaleString(
          "id-ID"
        )}   Rp. ${itemTotal.toLocaleString("id-ID")}\n`
      );

      if (item.note) {
        BLEPrinter.printText(`Catatan: ${item.note}\n`);
      }

      BLEPrinter.printText("\n");
    });

    // Total
    BLEPrinter.printText("<C>------------------------------</C>\n");
    BLEPrinter.printText(`<C><B>TOTAL: Rp. ${totalOrderPrice.toLocaleString("id-ID")}</B></C>\n`);
    BLEPrinter.printText("<C>------------------------------</C>\n\n");

    // Dummy bayar & kembalian (sementara)
    // const bayar = 64000;
    // const kembalian = bayar - total;

    BLEPrinter.printText(`<L>Metode Pembayaran: ${payment_type}</L>\n`);
    BLEPrinter.printText(`<L>Bayar: Rp. ${cash.toLocaleString("id-ID")}</L>\n`);
    BLEPrinter.printText(`<L>Kembali: Rp. ${kembalian.toLocaleString("id-ID")}</L>\n\n`);

    // Footer
    BLEPrinter.printText("<C>==============================</C>\n");
    BLEPrinter.printText("<C>Michi - Mini Chicken</C>\n");

    BLEPrinter.printBill("", { beep: true, cut: true });
  } catch (error) {
    console.error("Error printing struk:", error);
    Alert.alert("Print Error", "Gagal mencetak struk.");
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
