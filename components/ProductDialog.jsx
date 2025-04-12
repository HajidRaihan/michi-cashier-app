import { Dialog, Portal, Text, Button, RadioButton, Checkbox, TextInput } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useOrderStore } from "../stores/orderStore";

const ProductDialog = ({ visible, onDismiss, product }) => {
  const { addToOrder } = useOrderStore();

  const [selectedVariant, setSelectedVariant] = useState();
  const [quantity, setQuantity] = useState("1"); // disimpan dalam string karena TextInput
  const [note, setNote] = useState("");

  const [internalProduct, setInternalProduct] = useState(product);

  useEffect(() => {
    if (visible && product) {
      setInternalProduct(product);
    }
  }, [visible, product]);

  const handleAddToCart = async () => {
    const qty = parseInt(quantity) || 1;

    let variant = undefined;
    let variant_type = undefined;

    if (product?.variants?.length > 0) {
      variant = product.variants[0]?.options.find((v) => v.optionValue === selectedVariant);
      variant_type = product.variants[0]?.variantTypeName;

      if (!variant) {
        console.warn("Varian belum dipilih");
        return; // jika varian harus dipilih, batalkan
      }
    }

    await addToOrder({
      product_id: product.id,
      name: product.name,
      base_price: product.base_price,
      variant,
      variant_type,
      quantity: qty,
      total_price: calculateTotalPrice(),
      note,
    });

    onDismiss();
    // resetForm();
  };

  useEffect(() => {
    if (visible) {
      // Reset form hanya ketika dialog dibuka
      resetForm();
    }
  }, [visible]);

  const resetForm = () => {
    setSelectedVariant();
    setQuantity("1");
    setNote("");
  };

  const calculateTotalPrice = () => {
    const qty = parseInt(quantity) || 1;
    const basePrice = product?.base_price || 0;
    console.log({ selectedVariant });
    const variantPrice =
      product?.variants[0]?.options.find((v) => v.optionValue === selectedVariant)?.extraPrice || 0;
    console.log(variantPrice);
    const totalPrice = (basePrice + variantPrice) * qty;

    return totalPrice;
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>{product?.name}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <Text style={{ marginTop: 16, marginBottom: 8, fontWeight: "bold", fontSize: 16 }}>
              Harga dasar: Rp. {product?.base_price.toLocaleString("id-ID")}
            </Text>

            {/* VARIANTS */}
            {product?.variants?.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  Pilih {product.variants[0].variantTypeName} :
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => setSelectedVariant(value)}
                  value={selectedVariant}
                >
                  {product.variants[0].options?.map((variant) => (
                    <RadioButton.Item
                      key={variant.optionValue}
                      // label={`${variant.variant_type === "level" ? "Level" : "Ukuran"} ${
                      //   variant.variant_value
                      // } ${variant.extra_price > 0 ? `( +Rp. ${variant.extra_price} )` : ""}`}
                      label={`${variant.optionValue} ${
                        variant.extraPrice > 0 ? `( +Rp. ${variant.extraPrice} )` : ""
                      }`}
                      value={variant.optionValue}
                    />
                  ))}
                </RadioButton.Group>
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

            <View style={{ marginBottom: 16 }}>
              <TextInput
                label="Catatan"
                value={note}
                onChangeText={(text) => setNote(text)}
                mode="outlined"
              />
            </View>

            {/* TOTAL */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Total Harga: Rp. {calculateTotalPrice().toLocaleString("id-ID")}
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
    maxHeight: "80%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
});

export default ProductDialog;
