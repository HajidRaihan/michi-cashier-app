import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { ActivityIndicator, Button, DataTable, useTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

import { PlusIcon, TrashIcon } from "react-native-heroicons/outline";
import Toast from "react-native-toast-message";
import ExpenseDialog from "../components/ExpenseDialog";
import { useExpenseStore } from "../stores/expenseStore";
import { useToastHandler } from "../hook/useToastHandler";
import { deleteExpense } from "../services/expenseService";
import ConfirmDialog from "../components/ConfirmDialog";
import RevenueCard from "../components/RevenueCard";
import { calculateRevenue } from "../services/revenueService";
import { useOrderListStore } from "../stores/orderStore";

const Expenses = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [totalOrders, setTotalOrders] = useState();
  // const [totalPengeluaran, setTotalPengeluaran] = useState();

  const { expenses, totalExpense, fetchAllExpenses, loading, error } = useExpenseStore();
  const { totalIncome, fetchAllOrders } = useOrderListStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [expenseId, setExpenseId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { showToast } = useToastHandler();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, expenses.length);

  useEffect(() => {
    fetchAllExpenses();
    fetchAllOrders();
  }, []);

  const filterHandler = () => {
    const isoStartDate = startDate ? new Date(startDate).toISOString() : undefined;
    const isoEndDate = endDate ? new Date(endDate).toISOString() : undefined;

    fetchAllExpenses(isoStartDate, isoEndDate);
    fetchAllOrders(isoStartDate, isoEndDate);
  };

  const clearFilterHandler = () => {
    setStartDate(null);
    setEndDate(null);
    fetchAllExpenses();
  };

  useEffect(() => {
    if (error) {
      showToast("error", "Terjadi kesalahan");
    }
  }, [error, showToast]);

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const res = await deleteExpense(expenseId);
      fetchAllExpenses();
      setOpenConfirmDialog(false);
      showToast("success", "Berhasil menghapus pengeluaran");
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { totalOrderPrice, totalExpense } = await calculateRevenue();
  //       console.log(totalOrderPrice, totalExpense);

  //       setTotalOrders(totalOrderPrice);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.datePickerContainer}>
          <DatePickerInput
            locale="en"
            mode="outlined"
            label="Start Date"
            value={startDate}
            onChange={(d) => setStartDate(d)}
            inputMode="start"
          />
          <DatePickerInput
            style={styles.inputDate}
            locale="en"
            mode="outlined"
            label="End Date"
            value={endDate}
            onChange={(d) => setEndDate(d)}
            inputMode="start"
          />
          <Button
            mode="outlined"
            icon="magnify"
            onPress={filterHandler}
            style={{ backgroundColor: theme.colors.lightSecondary, borderRadius: 12 }}
            labelStyle={{ color: theme.colors.secondary }}
            textColor={theme.colors.secondary}
          >
            Cari
          </Button>
          <Button
            mode="outlined"
            icon="cancel"
            style={{ backgroundColor: theme.colors.errorContainer, borderRadius: 12 }}
            labelStyle={{ color: theme.colors.error }}
            textColor={theme.colors.error}
            onPress={clearFilterHandler}
          >
            Clear
          </Button>
        </View>
        <View style={styles.revenueContainer}>
          <RevenueCard
            title="Pendapatan Kotor"
            subtitle={totalIncome?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            bgIconColor="#E0F2FE"
            iconColor="#0284C7"
          />
          <RevenueCard
            title="Pendapatan Bersih"
            subtitle={(totalIncome - totalExpense)?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
            bgIconColor="#DCFCE7"
            iconColor="#16A34A"
          />
          <RevenueCard
            title="Pengeluaran"
            subtitle={totalExpense?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
            bgIconColor="#FEE2E2"
            iconColor="#DC2626"
          />
        </View>
        <ConfirmDialog
          title="Apakah kamu ingin menghapus pengeluaran ini?"
          action="Hapus"
          visible={openConfirmDialog}
          handler={deleteHandler}
          loading={deleteLoading}
          onDismiss={() => setOpenConfirmDialog(false)}
        />
        <View style={styles.container}>
          <ExpenseDialog onDismiss={() => setOpenDialog(false)} visible={openDialog} />
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>Daftar Pengeluaran</Text>
            </View>
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
          {/* <Text>
            Total Pengeluaran:{" "}
            <Text style={{ fontWeight: "bold" }}>Rp. {totalExpense.toLocaleString("id-ID")}</Text>
          </Text> */}

          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={{ flex: 3 }}>Deskripsi</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Jumlah</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Tanggal</DataTable.Title>
              <DataTable.Title style={{ flex: 0 }}>Aksi</DataTable.Title>
            </DataTable.Header>

            {loading ? (
              <View style={styles.centered}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              expenses.slice(from, to).map((expense) => (
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
                  <DataTable.Cell style={{ flex: 0 }}>
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

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(expenses.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} dari ${expenses.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Baris per halaman"}
            />
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
    // marginBottom: 12,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
  },
  revenueContainer: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 12,
    flexWrap: "wrap",
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
  datePickerContainer: {
    justifyContent: "center",
    flex: 1,
    gap: 10,
    padding: 10,
    margin: 12,
    marginBottom: 0,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
  },
});

export default Expenses;
