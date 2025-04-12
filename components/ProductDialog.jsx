import { Dialog, Portal, Text, Button, RadioButton, Checkbox, TextInput } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useProductListStore } from "../stores/productListStore";
import { useOrderStore } from "../stores/orderStore";

const ProductDialog = ({ visible, onDismiss, product }) => {
  const { addons } = useProductListStore();
  const { addToOrder } = useOrderStore();

  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState("1"); // disimpan dalam string karena TextInput

  const handleSelectAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleAddToCart = () => {
    const qty = parseInt(quantity) || 1;

    const variant = product?.variants?.find((v) => v.id === selectedVariant);
    const selectedAddonObjects = addons.filter((addon) => selectedAddons.includes(addon.id));

    addToOrder({
      product_id: product.id,
      name: product.name,
      base_price: product.base_price,
      variant,
      addons: selectedAddonObjects,
      quantity: qty,
      total_price: calculateTotalPrice(), // kirim totalnya dari komponen
    });

    onDismiss(); // tutup dialog
    resetForm(); // reset setelah tambah
  };

  const resetForm = () => {
    setSelectedVariant();
    setSelectedAddons([]);
    setQuantity("1");
  };

  const calculateTotalPrice = () => {
    const qty = parseInt(quantity) || 1;
    const basePrice = product?.base_price || 0;
    const variantPrice = product?.variants?.find((v) => v.id === selectedVariant)?.extra_price || 0;
    const addonsPrice =
      addons
        ?.filter((addon) => selectedAddons.includes(addon.id))
        ?.reduce((total, addon) => total + addon.price, 0) || 0;

    const totalPrice = (basePrice + variantPrice + addonsPrice) * qty;

    return totalPrice;
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>{product?.name}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <Text style={{ marginTop: 16, marginBottom: 8 }}>
              Harga dasar: Rp. {product?.base_price}
            </Text>

            {/* VARIANTS */}
            {product?.variants?.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Pilih Variant:</Text>
                <RadioButton.Group
                  onValueChange={(value) => setSelectedVariant(value)}
                  value={selectedVariant}
                >
                  {product.variants.map((variant) => (
                    <RadioButton.Item
                      key={variant.id}
                      label={`${variant.variant_type === "level" ? "Level" : "Ukuran"} ${
                        variant.variant_value
                      } ${variant.extra_price > 0 ? `( +Rp. ${variant.extra_price} )` : ""}`}
                      value={variant.id}
                    />
                  ))}
                </RadioButton.Group>
              </View>
            )}

            {/* ADDONS */}
            {addons?.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Tambahan:</Text>
                {addons.map((addon) => (
                  <Checkbox.Item
                    key={addon.id}
                    label={`${addon.name} (+Rp. ${addon.price})`}
                    status={selectedAddons.includes(addon.id) ? "checked" : "unchecked"}
                    onPress={() => handleSelectAddon(addon.id)}
                  />
                ))}
              </View>
            )}

            {/* QUANTITY */}
            <View style={{ marginBottom: 16 }}>
              <TextInput
                label="Jumlah"
                keyboardType="numeric"
                value={quantity}
                onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
                mode="outlined"
              />
            </View>

            {/* TOTAL */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Total Harga: Rp. {calculateTotalPrice()}
              </Text>
            </View>
          </ScrollView>
        </Dialog.ScrollArea>

        <Dialog.Actions>
          <Button onPress={onDismiss}>Batal</Button>
          <Button onPress={handleAddToCart}>Tambah</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    alignSelf: "center",
    width: "90%",
    maxWidth: 600,
    height: "80%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
});

export default ProductDialog;
