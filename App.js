import { View, Text, ScrollView, StyleSheet } from "react-native";
import MenuCard from "./components/MenuCard";
import MainLayout from "./components/layout/MainLayout";
import SideBar from "./components/SideBar";
import OrderList from "./components/OrderList";
import CardCategory from "./components/CardCategory";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  addProductItem,
  getAllProductsWithVariantsAndAddons,
  getProductDetail,
  getProductItems,
} from "./services/productService";
import { Button, Dialog, Portal } from "react-native-paper";
import PrintDialog from "./components/PrintDialog";
import ProductDialog from "./components/ProductDialog";
import { useProductListStore } from "./stores/productListStore";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Makanan");
  const [product, setProduct] = useState();
  const [orderProduk, setOrderProduk] = useState([]);
  const [category, setCategory] = useState("makanan");
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);

  const { products, loading, error, fetchAddonsOnly, fetchAllProducts } = useProductListStore();

  const openProductDialogHandler = () => {
    setOpenDialog((prev) => !prev); // toggle
  };

  const handleProductClick = (product) => {
    setOpenDialog(true);
    setSelectedProduct(product);
    setSelectedVariant(""); // Reset
    setSelectedAddons([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching");
        const result = await getAllProductsWithVariantsAndAddons();

        // console.log(JSON.stringify(result, null, 2));

        setProduct(result.products);
        console.log("kjhjka");
      } catch (error) {
        console.error("❌ Error while fetching product items:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchAllProducts();
    fetchAddonsOnly();
  }, []);

  const getDetail = async (productId) => {
    try {
      console.log("fetching produk");
      const detailProduct = await getProductDetail(productId);
      console.log({ detailProduct });
      setOpenDialog(true);
      setSelectedProduct(detailProduct);
    } catch (error) {
      console.error("❌ Error while fetching product items:", error);
    }
  };

  const deleteProdukOrder = (productId) => {
    setProduct(product.map((p) => (p.id === productId ? { ...p, quantity: (p.quantity = 0) } : p)));
  };

  return (
    <MainLayout>
      {/* Sidebar */}
      <SideBar />

      <ProductDialog
        visible={openDialog}
        onDismiss={() => setOpenDialog(false)}
        product={selectedProduct}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />

      {/* Menu */}
      <View style={styles.menuContainer}>
        <ScrollView style={styles.menuScroll}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              borderColor: "black",
              // borderWidth: 1,
              padding: 2,
              gap: 16,
              marginTop: 10,
            }}
          >
            <CardCategory
              title="Makanan"
              icon={faBowlFood}
              isActive={activeCategory === "Makanan"}
              onPress={() => setActiveCategory("Makanan")}
            />

            <CardCategory
              title="Minuman"
              icon={faMugSaucer}
              isActive={activeCategory === "Minuman"}
              onPress={() => setActiveCategory("Minuman")}
            />
          </View>
          <Text style={{ fontSize: 24, fontWeight: 500, marginVertical: 10 }}>
            Menu {activeCategory.toLowerCase()}
          </Text>
          {/* <Button onPress={tambahProduct}>Tambah</Button> */}
          <View style={styles.menuGrid}>
            {products?.map((item) => (
              <MenuCard key={item.id} product={item} handleProductClick={handleProductClick} />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Order Details */}
      <OrderList
        product={product?.filter((p) => p.quantity > 0)}
        deleteProdukOrder={deleteProdukOrder}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    gap: 14, // jika pakai RN 0.71+, bisa pakai gap
    padding: 2,
  },
  menuScroll: {
    height: "100%",
  },
  menuContainer: {
    flex: 1,
    marginTop: 10,
    // borderColor: "black",
    // borderWidth: 2,
    paddingHorizontal: 16,
    // backgroundColor: "#fff",
    borderRadius: 12,
  },
});
