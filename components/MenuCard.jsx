// components/MenuCard.tsx
import { StyleSheet, View, Image } from "react-native";
import { Card, Text, Button, Avatar } from "react-native-paper";

import { IconButton, MD3Colors } from "react-native-paper";

const MenuCard = ({ handleProductClick, product }) => {
  return (
    <Card style={styles.card} mode="elevated">
      <View style={styles.content}>
        {/* <Image
          source={{
            uri: "https://image.makewebeasy.net/makeweb/r_1920x1920/MptBqGPQV/DefaultData/menu_rice_bowl_steak_ayam_crispy_dari_ZHENGDA.jpg?v=202405291424",
          }}
          style={styles.menuImage}
        /> */}
        <View style={styles.details}>
          <Text style={styles.title}>{product?.name}</Text>
          <Text style={styles.price}>Rp. {product?.base_price.toLocaleString("id-ID")}</Text>
        </View>
        {/* <Button mode="contained" style={styles.button} onPress={tambahProdukOrder}>
          <PlusIcon size={10} color="#fff" />
        </Button> */}
        <IconButton
          icon="plus"
          iconColor="#fff"
          containerColor="#FF9800"
          size={14} // ukuran ikon
          style={styles.smallButton}
          onPress={() => handleProductClick(product)}
        />
        {/* <MenuCounter
            // menuCount={menuCount}
            id={id}
            product={product}
            tambahProdukOrder={tambahProdukOrder}
            kurangiProdukOrder={kurangiProdukOrder}
          /> */}
      </View>
    </Card>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  card: {
    // marginVertical: 8,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    backgroundColor: "#fff",
    width: 250,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  button: {
    backgroundColor: "#FFD700",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 10,
  },
  smallButton: {
    width: 30,
    height: 30,
    borderRadius: 12,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  menuImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    objectFit: "cover",
  },
});
