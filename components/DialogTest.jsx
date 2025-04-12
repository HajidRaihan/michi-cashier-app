import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import { Dialog, Portal, Text, TextInput } from "react-native-paper";

const DialogTest = () => {
  const noteRef = useRef(""); // Menggunakan useRef untuk menyimpan catatan
  const visibleRef = useRef(true); // Menggunakan useRef untuk visibilitas

  const hideDialog = () => {
    visibleRef.current = false; // Menggunakan ref untuk mengatur visibilitas
  };

  const handleNoteChange = (text) => {
    noteRef.current = text; // Simpan nilai input tanpa memicu re-render
  };

  return (
    <Portal>
      <Dialog visible={visibleRef.current} onDismiss={hideDialog}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
            <Text>This is a scrollable area</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                label="Catatan"
                value={noteRef.current} // Menggunakan useRef untuk nilai input
                onChangeText={handleNoteChange} // Mengubah nilai input tanpa render ulang
                mode="outlined"
              />
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

export default DialogTest;
