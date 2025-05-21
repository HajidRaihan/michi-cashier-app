import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, Button, DataTable, useTheme } from "react-native-paper";
import { useProductListStore } from "../stores/productListStore";
import { TrashIcon, PlusIcon } from "react-native-heroicons/outline";
import { useRouter, usePathname } from "expo-router";
import { deleteProduct } from "../services/productService";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "react-native-toast-message";
import { useToastHandler } from "../hook/useToastHandler";

const MenuPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showToast } = useToastHandler();

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      await deleteProduct(selectedId);
      showToast("success", "Berhasil menghapus produk");
      setShowConfirmDialog(false);
      setDeleteLoading(false);
      fetchAllProducts();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Gagal menghapus produk",
      });
      setShowConfirmDialog(false);

      setDeleteLoading(false);
    }
  };

  const { products, loading, error, fetchAllProducts } = useProductListStore();

  useEffect(() => {
    fetchAllProducts();
    console.log("products : ", products);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const showDialogHandler = (id) => {
    setSelectedId(id);
    setShowConfirmDialog(true);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Daftar Menu</Text>
            <Button
              icon={() => <PlusIcon size={24} color={"#fff"} />}
              mode="contained"
              text="Tambah Menu"
              style={{
                backgroundColor: theme.colors.secondary,
                borderRadius: 12,
              }}
              onPress={() => router.push("/menuForm")}
            >
              Tambah Menu
            </Button>
          </View>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>Nama</DataTable.Title>
              <DataTable.Title>Kategori</DataTable.Title>
              <DataTable.Title>Deskripsi</DataTable.Title>
              <DataTable.Title>Varian</DataTable.Title>
              <DataTable.Title>Harga</DataTable.Title>
              <DataTable.Title style={{ flex: 0 }}>Aksi</DataTable.Title>
            </DataTable.Header>

            {products.map((product) => (
              <DataTable.Row key={product.id}>
                <DataTable.Cell>{product.name}</DataTable.Cell>
                <DataTable.Cell>{product.category}</DataTable.Cell>
                <DataTable.Cell>{product.description ? product.description : "-"}</DataTable.Cell>
                <DataTable.Cell>
                  {product.variants ? product.variants.map((v) => v.variantTypeName) : "-"}
                </DataTable.Cell>
                <DataTable.Cell>{product.base_price.toLocaleString("id-ID")}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 0 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <PencilSquareIcon size={20} /> */}
                    <TrashIcon
                      size={20}
                      color={"red"}
                      onPress={() => showDialogHandler(product.id)}
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
      <ConfirmDialog
        onDismiss={() => setShowConfirmDialog(false)}
        visible={showConfirmDialog}
        action={"Hapus"}
        title={"Apakah anda yakin ingin menghapus produk ini?"}
        loading={deleteLoading}
        handler={deleteHandler}
      />
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

export default MenuPage;
