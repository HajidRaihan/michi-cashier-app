import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, Button, DataTable, useTheme } from "react-native-paper";
import { useProductListStore } from "../stores/productListStore";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "react-native-heroicons/outline";
import { useRouter, usePathname } from "expo-router";

const MenuPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const { products, loading, error, fetchAllProducts } = useProductListStore();

  useEffect(() => {
    fetchAllProducts();
    console.log("products : ", products);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Memuat data pesanan...</Text>
      </View>
    );
  }

  return (
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
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {products.map((product, index) => (
          <DataTable.Row key={product}>
            <DataTable.Cell>{product.name}</DataTable.Cell>
            <DataTable.Cell>{product.category}</DataTable.Cell>
            <DataTable.Cell>{product.description}</DataTable.Cell>
            <DataTable.Cell>{product.variants.map((v) => v.variantTypeName)}</DataTable.Cell>
            <DataTable.Cell>
              {product.base_price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <PencilSquareIcon size={20} />
                <TrashIcon size={20} color={"red"} />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
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
  button: {},
});

export default MenuPage;
