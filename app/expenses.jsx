import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { ActivityIndicator, Button, DataTable, useTheme } from "react-native-paper";
import { PlusIcon } from "react-native-heroicons/outline";
import Toast from "react-native-toast-message";
import ExpensesDialog from "../components/ExpensesDialog";

const Expenses = () => {
  const theme = useTheme();
  const showToast = () => {
    Toast.show({
      type: "success", // success | error | info
      text1: "Berhasil",
      text2: "Pesanan telah diproses 👋",
      position: "top", // atau 'bottom'
    });
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "All Your Base Are Belong To Us",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "A wild toast appeared!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Toast />
          <ExpensesDialog />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Daftar Pengeluaran</Text>
            <Button
              icon={() => <PlusIcon size={24} color={"#fff"} />}
              mode="contained"
              text="Tambah Menu"
              style={{
                backgroundColor: theme.colors.secondary,
                borderRadius: 12,
              }}
              onPress={() => showToast()}
            >
              Tambah Pengeluaran
            </Button>
          </View>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>Nama</DataTable.Title>
              <DataTable.Title>Kategori</DataTable.Title>
              <DataTable.Title>Deskripsi</DataTable.Title>
              <DataTable.Title>Varian</DataTable.Title>
              <DataTable.Title>Harga</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>

            {/* {products.map((product) => (
          <DataTable.Row key={product.id}>
            <DataTable.Cell>{product.name}</DataTable.Cell>
            <DataTable.Cell>{product.category}</DataTable.Cell>
            <DataTable.Cell>{product.description}</DataTable.Cell>
            <DataTable.Cell>{product.variants.map((v) => v.variantTypeName)}</DataTable.Cell>
            <DataTable.Cell>{product.base_price.toLocaleString("id-ID")}</DataTable.Cell>
            <DataTable.Cell>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <PencilSquareIcon size={20} />
                <TrashIcon size={20} color={"red"} />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))} */}
          </DataTable>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 12,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Expenses;
