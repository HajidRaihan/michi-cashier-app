import { View, Text, ScrollView, StyleSheet } from "react-native";
import MenuCard from "../components/MenuCard";
import MainLayout from "../components/layout/MainLayout"; // Optional
import OrderList from "../components/OrderList";
import CardCategory from "../components/CardCategory";
import { faMugSaucer, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ProductDialog from "../components/ProductDialog";
import { useProductListStore } from "../stores/productListStore";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Makanan");
  const [product, setProduct] = useState();
  const [orderProduk, setOrderProduk] = useState([]);
  const [category, setCategory] = useState("makanan");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");

  const { products, fetchAllProducts } = useProductListStore();

  const handleProductClick = (product) => {
    setOpenDialog(true);
    setSelectedProduct(product);
    setSelectedVariant("");
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
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

          <Text style={styles.menuTitle}>Menu {activeCategory.toLowerCase()}</Text>

          <View style={styles.menuGrid}>
            {products?.map((item) => (
              <MenuCard key={item.id} product={item} handleProductClick={handleProductClick} />
            ))}
          </View>
        </ScrollView>
      </View>
      <OrderList product={product?.filter((p) => p.quantity > 0)} />
    </MainLayout>
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
