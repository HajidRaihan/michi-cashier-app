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

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Makanan");
  const [product, setProduct] = useState();
  const [orderProduk, setOrderProduk] = useState([]);
  const [category, setCategory] = useState("makanan");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);

  const openProductDialogHandler = () => {
    setOpenDialog((prev) => !prev); // toggle
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedVariant(""); // Reset
    setSelectedAddons([]);
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching");
        const result = await getAllProductsWithVariantsAndAddons();
        // console.log({ result });

        // const dataWithQuantity = result.map((item) => ({
        //   ...item,
        //   quantity: 0,
        // }));
        console.log(JSON.stringify(result, null, 2));

        setProduct(result.products);
        console.log("kjhjka");
      } catch (error) {
        console.error("❌ Error while fetching product items:", error);
      }
    };
    fetchData();
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

  const tambahProduct = async () => {
    try {
      const result = await addProductItem({
        name: "Boba Latte",
        price: 20000,
        category: "minuman",
        image: "",
      });
      // console.table(result);
    } catch (err) {
      console.log(err);
    }
  };

  const tambahProdukOrder = (productId) => {
    setProduct(product.map((p) => (p.id === productId ? { ...p, quantity: p.quantity + 1 } : p)));
    // console.log(product);
    // const existingProduct = orderProduk.find((p) => p.id === product.id);

    // if (existingProduct) {
    //   // Kalau produk sudah ada, tambah count-nya
    //   const updatedOrder = orderProduk.map((p) =>
    //     p.id === product.id ? { ...p, count: (p.count || 1) + 1 } : p
    //   );
    //   setOrderProduk(updatedOrder);
    // } else {
    //   // Kalau produk belum ada, tambahkan dengan count = 1
    //   setOrderProduk([...orderProduk, { ...product, count: 1 }]);
    // }
    // console.log(orderProduk);
  };

  const kurangiProdukOrder = (productId) => {
    setProduct(product.map((p) => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p)));
  };

  const deleteProdukOrder = (productId) => {
    setProduct(product.map((p) => (p.id === productId ? { ...p, quantity: (p.quantity = 0) } : p)));
  };

  return (
    <MainLayout>
      {/* Sidebar */}
      <SideBar />
      {/* <PrintDialog /> */}
      {/* <Portal>
        <Dialog visible={openDialog} onDismiss={openProductDialogHandler}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <Text>This is a scrollable area</Text>
              <Button onPress={openProductDialogHandler}></Button>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal> */}
      {/* <DetailProductDialog visible={openDialog} onDismiss={openProductDialogHandler} /> */}
      {/* <ProductDialog
        visible={openDialog}
        onDismiss={openProductDialogHandler}
        product={selectedProduct}
      /> */}
      <ProductDialog
        visible={openDialog}
        onDismiss={() => setOpenDialog(false)}
        product={selectedProduct}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />

      {/* <Button onPress={openProductDialogHandler}>Open Dialog</Button> */}

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
            {product?.map((item) => (
              <MenuCard
                key={item.id}
                id={item.id}
                title={item.name}
                price={item.base_price}
                imageUrl={item.image}
                product={item}
                getProductDetail={getDetail}
                tambahProdukOrder={tambahProdukOrder}
                kurangiProdukOrder={kurangiProdukOrder}
              />
            ))}
            {/* {[...Array(20)].map((_, i) => (
              <MenuCard
                key={i}
                title="Click the button to watch on Jetflix app."
                price={30000}
                imageUrl="https://upload.wikimedia.org/wikipedia/en/0/0c/Spiderman_PS4_cover.jpg"
                onAdd={() => console.log("Tambah ke keranjang")}
              />
            ))} */}
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
