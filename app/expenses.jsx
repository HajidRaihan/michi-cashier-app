import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { ActivityIndicator, Button, DataTable, useTheme } from "react-native-paper";
import { PlusIcon, TrashIcon } from "react-native-heroicons/outline";
import Toast from "react-native-toast-message";
import ExpenseDialog from "../components/ExpenseDialog";
import { useExpenseStore } from "../stores/expenseStore";
import { useErrorToast, useSuccessToast } from "../hook/useToast";
import { deleteExpense } from "../services/expenseService";
import ConfirmDialog from "../components/ConfirmDialog";

const Expenses = () => {
  const theme = useTheme();
  const { expenses, fetchAllExpenses, loading, error } = useExpenseStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [expenseId, setExpenseId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  if (error) {
    useErrorToast("Terjadi kesalahan");
  }

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const res = await deleteExpense(expenseId);
      fetchAllExpenses();
      setOpenConfirmDialog(false);
      useSuccessToast("Berhasil menghapus pengeluaran");
      setDeleteLoading(false);
      console.log(res);
    } catch (err) {
      setDeleteLoading(false);
      console.log(err);
    }
  };

  const openConfirmDialogHandler = (id) => {
    setExpenseId(id);
    setOpenConfirmDialog(true);
  };

  return (
    <>
      <ScrollView>
        <ConfirmDialog
          title="Apakah kamu ingin menghapus pengeluaran ini?"
          action="Hapus"
          visible={openConfirmDialog}
          handler={deleteHandler}
          loading={deleteLoading}
          onDismiss={() => setOpenConfirmDialog(false)}
        />
        <View style={styles.container}>
          <Toast />
          <ExpenseDialog onDismiss={() => setOpenDialog(false)} visible={openDialog} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Daftar Pengeluaran</Text>
            <Button
              icon={() => <PlusIcon size={24} color={"#fff"} />}
              mode="contained"
              text="Tambah Menu"
              style={{
                backgroundColor: theme.colors.secondary,
                borderRadius: 12,
              }}
              onPress={() => setOpenDialog(true)}
            >
              Tambah Pengeluaran
            </Button>
          </View>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={{ flex: 3 }}>Deskripsi</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Jumlah</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Tanggal</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Aksi</DataTable.Title>
            </DataTable.Header>

            {loading ? (
              <View style={styles.centered}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              expenses?.map((expense) => (
                <DataTable.Row key={expense.id}>
                  <DataTable.Cell style={{ flex: 3 }}>
                    <Text numberOfLines={0} style={{ flexShrink: 1, marginRight: 8 }}>
                      {expense.description}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}>
                    Rp. {expense.amount.toLocaleString("id-ID")}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}>{expense.expense_date}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TrashIcon
                        size={20}
                        color="red"
                        onPress={() => openConfirmDialogHandler(expense.id)}
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            )}
          </DataTable>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 12,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Expenses;
