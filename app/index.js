import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import MenuCard from "./components/MenuCard";
import MainLayout from "./components/layout/MainLayout";
import SideBar from "./components/SideBar";
import OrderList from "./components/OrderList";

export default function Home() {
  return (
    <MainLayout>
      {/* Sidebar */}
      <SideBar />

      {/* Menu */}
      <ScrollView style={styles.menuContainer}>
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

      {/* Order Details */}
      <OrderList />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 60,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12, // jika pakai RN 0.71+, bisa pakai gap
    padding: 8,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
});
