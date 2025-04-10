import { View, Text, ScrollView, StyleSheet } from "react-native";
import MenuCard from "./components/MenuCard";
import MainLayout from "./components/layout/MainLayout";
import SideBar from "./components/SideBar";
import OrderList from "./components/OrderList";
import CardCategory from "./components/CardCategory";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { addProductItem, getProductItems } from "./services/productService";
import { Button } from "react-native-paper";

const listMenu = {
  nama: "ayam krispi",
  harga: 1000,
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Makanan");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching");
        const result = await getProductItems();
        console.log(result);
        console.log("kjhjka");
      } catch (error) {
        console.error("❌ Error while fetching product items:", error);
      }
    };
    fetchData();
  }, []);

  const tambahProduct = async () => {
    try {
      const result = await addProductItem({
        name: "ayam geprek",
        price: 10000,
        image: "",
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      {/* Sidebar */}
      <SideBar />

      {/* Menu */}
      <View style={styles.menuContainer}>
        <ScrollView>
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
            Menu {activeCategory}
          </Text>
          <Button onPress={tambahProduct}>Tambah</Button>
          <View style={styles.menuGrid}>
            {[...Array(20)].map((_, i) => (
              <MenuCard
                key={i}
                title="Click the button to watch on Jetflix app."
                price={30000}
                imageUrl="https://upload.wikimedia.org/wikipedia/en/0/0c/Spiderman_PS4_cover.jpg"
                onAdd={() => console.log("Tambah ke keranjang")}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Order Details */}
      <OrderList />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // gap: 12, // jika pakai RN 0.71+, bisa pakai gap
    padding: 2,
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
