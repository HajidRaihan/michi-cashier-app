// import React, { useEffect } from "react";
// import { Dialog, Portal, Text } from "react-native-paper";
// import { ScrollView, StyleSheet } from "react-native";

// const ProductDialog = ({ visible, onDismiss, product }) => {
//   return (
//     <Portal>
//       <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
//         <Dialog.Title>{product?.name}</Dialog.Title>
//         <Dialog.ScrollArea>
//           <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
//             <Text>{product?.base_price}</Text>
//             <Text>{product?.description}</Text>
//           </ScrollView>
//         </Dialog.ScrollArea>
//       </Dialog>
//     </Portal>
//   );
// };

// const styles = StyleSheet.create({
//   dialog: {
//     alignSelf: "center",
//     width: "90%",
//     maxWidth: 600,
//     borderRadius: 16,
//     backgroundColor: "#ffffff",
//   },
// });

// export default ProductDialog;

import { Dialog, Portal, Text, Button, RadioButton, Checkbox } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";

const ProductDialog = ({
  visible,
  onDismiss,
  product,
  selectedVariant,
  setSelectedVariant,
  selectedAddons,
  setSelectedAddons,
}) => {
  const handleSelectAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = product?.base_price || 0;

    const variantPrice = product?.variants?.find((v) => v.id === selectedVariant)?.extra_price || 0;

    const addonsPrice =
      product?.addons
        ?.filter((addon) => selectedAddons.includes(addon.id))
        ?.reduce((total, addon) => total + addon.price, 0) || 0;

    const totalPrice = basePrice + variantPrice + addonsPrice;

    return totalPrice;
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>{product?.name}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            {/* Harga Base */}
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
            {product?.addons?.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Tambahan:</Text>
                {product.addons.map((addon) => (
                  <Checkbox.Item
                    key={addon.id}
                    label={`${addon.name} (+Rp. ${addon.price})`}
                    status={selectedAddons.includes(addon.id) ? "checked" : "unchecked"}
                    onPress={() => handleSelectAddon(addon.id)}
                  />
                ))}
              </View>
            )}

            {/* Total Harga */}
            <View style={{ marginTop: 16, marginBottom: 8 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Total Harga: Rp. {calculateTotalPrice()}
              </Text>
            </View>
          </ScrollView>
        </Dialog.ScrollArea>

        <Dialog.Actions>
          <Button onPress={onDismiss}>Batal</Button>
          <Button onPress={() => console.log("Tambah ke keranjang")}>Tambah</Button>
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
