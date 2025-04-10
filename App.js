import { View, Text, ScrollView, StyleSheet } from "react-native";
import MenuCard from "./components/MenuCard";
import MainLayout from "./components/layout/MainLayout";
import SideBar from "./components/SideBar";
import OrderList from "./components/OrderList";
import CardCategory from "./components/CardCategory";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Makanan");
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
