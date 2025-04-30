import { View, Text, ScrollView, StyleSheet } from "react-native";
import MenuCard from "../components/MenuCard";
import MainLayout from "../components/layout/MainLayout"; // Optional
import OrderList from "../components/OrderList";
import CardCategory from "../components/CardCategory";
import { faMugSaucer, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ProductDialog from "../components/ProductDialog";
import PrintDialog from "../components/ScanPrintDialog";
import { useProductListStore } from "../stores/productListStore";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function Home() {
  const category = [
    "All",
    "Chicken Crispy",
    "Chicken Pop",
    "Chicken Katsu",
    "Mie Cian",
    "Drink",
    "Addon",
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProduct, setFilteredProduct] = useState();

  // const [category, setCategory] = useState("makanan");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");

  const { products, fetchAllProducts, loading } = useProductListStore();

  const handleProductClick = (product) => {
    setOpenDialog(true);
    setSelectedProduct(product);
    setSelectedVariant("");
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // i want to filter the product base on category
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProduct(products);
      return;
    }
    setFilteredProduct(products.filter((product) => product.category === activeCategory));
  }, [activeCategory, products]);

  return (
    <>
      <MainLayout>
        {/* Optional wrapper */}
        <ProductDialog
          visible={openDialog}
          onDismiss={() => setOpenDialog(false)}
          product={selectedProduct}
        />
        <View style={styles.menuContainer}>
          <ScrollView style={styles.menuScroll}>
            <View style={styles.categoryWrapper}>
              {category?.map((item) => (
                <CardCategory
                  key={item}
                  title={item}
                  isActive={activeCategory === item}
                  onPress={() => setActiveCategory(item)}
                />
              ))}
              {/* <CardCategory
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
            /> */}
            </View>

            {/* <Text style={styles.menuTitle}>Menu {activeCategory.toLowerCase()}</Text> */}

            <View style={styles.menuGrid}>
              {!loading ? (
                filteredProduct?.map((item) => (
                  <MenuCard key={item.id} product={item} handleProductClick={handleProductClick} />
                ))
              ) : (
                <View style={styles.centered}>
                  <ActivityIndicator size="large" />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <OrderList />
      </MainLayout>
    </>
  );
}

const styles = StyleSheet.create({
  categoryWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    gap: 16,
    marginTop: 10,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    padding: 2,
  },
  menuScroll: {
    height: "100%",
  },
  menuContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
});
