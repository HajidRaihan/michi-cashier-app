import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, RadioButton, TextInput, useTheme } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { useVariantStore } from "../stores/variantStore";
import { createProduct } from "../services/productService";
import { generateTimeBasedId } from "../lib/generateId";

const data = [
  { label: "Chicken Crispy", value: "CHicken Crispy" },
  { label: "Chicken Pop", value: "Chicken Pop" },
  { label: "Chicken Katsu", value: "Chicken Katsu" },
  { label: "Mie Cian", value: "Mie Cian" },
  { label: "Drink", value: "Drink" },
  { label: "Addon", value: "Addon" },
];
const MenuForm = () => {
  const theme = useTheme();
  const [kategori, setKategori] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState();
  const [description, setDescription] = useState();
  const [loadingCreate, setLoadingCreate] = useState(false);

  const { variants, loading, error, fetchvariants } = useVariantStore();

  useEffect(() => {
    fetchvariants();
  }, []);

  const renderLabel = () => {
    if (kategori || isFocus) {
      return <Text style={[styles.label, isFocus && { color: "blue" }]}>Dropdown label</Text>;
    }
    return null;
  };

  const createMenuHandler = async () => {
    setLoadingCreate(true);
    const data = {
      id: generateTimeBasedId(),
      name: nama,
      base_price: Number(harga),
      category: kategori,
      description: description,
      // variant_id: selectedVariant,
    };

    console.log(data);
    try {
      const res = await createProduct(data, selectedVariant);
      console.log(res);
      setLoadingCreate(false);
    } catch (err) {
      console.log(err);
      setLoadingCreate(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nama Produk"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => setNama(text)}
      />
      <TextInput
        label="Harga Produk"
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => setHarga(text)}
      />

      <TextInput
        label="Deskripsi Produk"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
      />

      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 3 }}>Kategori</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: theme.colors.primary }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Pilih Kategori" : "..."}
          searchPlaceholder="Search..."
          value={kategori}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setKategori(item.value);
            setIsFocus(false);
          }}
          //   renderLeftIcon={() => (
          //     <AntDesign
          //       style={styles.icon}
          //       color={isFocus ? 'blue' : 'black'}
          //       name="Safety"
          //       size={20}
          //     />
          //   )}
        />
      </View>
      <View>
        <Text>Pilih Variant</Text>
        <RadioButton.Group
          onValueChange={(value) => setSelectedVariant(value)}
          value={selectedVariant}
        >
          {variants.map((variant) => (
            <RadioButton.Item key={variant.id} label={variant.name} value={variant.id} />
          ))}
        </RadioButton.Group>
      </View>

      <Button
        style={styles.button}
        loading={loadingCreate}
        mode="contained"
        onPress={createMenuHandler}
      >
        Simpan
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 12,
  },
  input: {
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
});

export default MenuForm;
