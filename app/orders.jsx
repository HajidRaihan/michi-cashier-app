import React, { useEffect, useState } from "react";
import {
  DataTable,
  Text,
  Card,
  Chip,
  ActivityIndicator,
  IconButton,
  Badge,
  useTheme,
} from "react-native-paper";
import { useOrderListStore } from "../stores/orderStore";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { format } from "date-fns";
import { DatePickerInput } from "react-native-paper-dates";
import { TrashIcon } from "react-native-heroicons/outline";
import { deleteOrder } from "../services/orderService";
import Toast from "react-native-toast-message";
import ConfirmDialog from "../components/ConfirmDialog";

const Orders = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [orderId, setOrderId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { fetcAllOrders, orders, totalIncome, loading, error } = useOrderListStore();

  useEffect(() => {
    fetcAllOrders();
  }, []);

  const showDialogHandler = (id) => {
    setOrderId(id);
    setOpenDialog(true);
  };

  const deleteHandler = async () => {
    try {
      await deleteOrder(orderId);
      setOpenDialog(false);
      fetcAllOrders();
      setDeleteLoading(false);
      Toast.show({
        type: "success",
        text1: "Berhasil menghapus pesanan",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Gagal menghapus pesanan",
      });
      setOpenDialog(false);
      setDeleteLoading(false);
    }
  };

  const filterHandler = () => {
    const isoStartDate = startDate ? new Date(startDate).toISOString() : undefined;
    const isoEndDate = endDate ? new Date(endDate).toISOString() : undefined;

    fetcAllOrders(isoStartDate, isoEndDate);
  };

  const clearFilterHandler = () => {
    setStartDate(null);
    setEndDate(null);
    fetcAllOrders();
  };

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const toggleOrderExpanded = (orderId) => {
    setExpandedOrders({
      ...expandedOrders,
      [orderId]: !expandedOrders[orderId],
    });
  };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, orders.length);

  // if (loading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" />
  //       <Text style={styles.loadingText}>Memuat data pesanan...</Text>
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "menunggu":
        return "#FFC107";
      case "diproses":
        return "#2196F3";
      case "selesai":
        return "#4CAF50";
      case "dibatalkan":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
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
        <View style={styles.container}>
          <Text style={styles.title}>Daftar Pesanan</Text>

          <View style={styles.totalIncomeContainer}>
            <Text style={styles.totalIncomeLabel}>Total Pendapatan: </Text>
            <Text style={styles.totalIncomeValue}>Rp. {totalIncome.toLocaleString("id-ID")}</Text>
          </View>

          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>No. Pesanan</DataTable.Title>
              <DataTable.Title>Tanggal</DataTable.Title>
              <DataTable.Title>Total</DataTable.Title>
              {/* <DataTable.Title>Status</DataTable.Title> */}
              <DataTable.Title>Detail</DataTable.Title>
              <DataTable.Title>Kasir</DataTable.Title>
              <DataTable.Title>Outlet</DataTable.Title>
              <DataTable.Title style={{ flex: 0 }}>Aksi</DataTable.Title>
            </DataTable.Header>

            {loading ? (
              <View style={styles.centered}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Memuat data pesanan...</Text>
              </View>
            ) : (
              orders.slice(from, to).map((order) => (
                <View key={order.id}>
                  <DataTable.Row>
                    <DataTable.Cell>{order.order_number}</DataTable.Cell>
                    <DataTable.Cell>
                      {format(new Date(order.created_at), "dd/MM/yyyy HH:mm")}
                    </DataTable.Cell>
                    <DataTable.Cell>Rp. {order.total_price.toLocaleString("id-ID")}</DataTable.Cell>
                    <DataTable.Cell>Rp. {order.kasir}</DataTable.Cell>
                    <DataTable.Cell>Rp. {order.outlet}</DataTable.Cell>
                    {/* <DataTable.Cell>
                  <Chip
                    style={[styles.statusChip, { backgroundColor: getStatusColor(order.status) }]}
                    textStyle={{ color: "white", fontSize: 10 }}
                  >
                    {order.status || "Baru"}
                  </Chip>
                </DataTable.Cell> */}
                    <DataTable.Cell>
                      <IconButton
                        icon={expandedOrders[order.id] ? "chevron-up" : "chevron-down"}
                        size={20}
                        onPress={() => toggleOrderExpanded(order.id)}
                      />
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 0 }}>
                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <TrashIcon
                          size={20}
                          color="red"
                          onPress={() => showDialogHandler(order.id)}
                        />
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>

                  {expandedOrders[order.id] && (
                    <Card style={styles.detailCard}>
                      <Card.Content>
                        <View style={styles.detailHeader}>
                          <Text style={styles.detailTitle}>Detail Pesanan</Text>
                          <Badge style={styles.itemCountBadge}>{order.order_items.length}</Badge>
                        </View>

                        <ScrollView style={styles.itemsScrollView} nestedScrollEnabled={true}>
                          {order.order_items.map((item) => (
                            <View key={item.id} style={styles.itemContainer}>
                              <View style={styles.itemHeader}>
                                <Text style={styles.itemName}>{item.product_name}</Text>
                                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                              </View>

                              <View style={styles.itemDetails}>
                                <Text style={styles.itemVariant}>
                                  {item.variant_type}: {item.variant_name}
                                  {item.variant_price > 0 && ` (+${item.variant_price})`}
                                </Text>
                                {item.note && (
                                  <Text style={styles.itemNote}>Note: {item.note}</Text>
                                )}
                              </View>

                              <Text style={styles.itemTotalPrice}>
                                Rp {item.total_price.toLocaleString("id-ID")}
                              </Text>

                              <View style={styles.divider} />
                            </View>
                          ))}
                        </ScrollView>

                        <View style={styles.orderSummary}>
                          <Text style={styles.paymentMethod}>
                            Pembayaran: {order.payment_type?.toUpperCase()}
                          </Text>
                          <Text style={styles.orderTotalPrice}>
                            Rp {order.total_price.toLocaleString("id-ID")}
                          </Text>
                        </View>
                      </Card.Content>
                    </Card>
                  )}
                </View>
              ))
            )}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(orders.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} dari ${orders.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Baris per halaman"}
            />
          </DataTable>
        </View>
      </ScrollView>
      <ConfirmDialog
        visible={openDialog}
        onDismiss={() => openDialog(false)}
        loading={deleteLoading}
        action={"Hapus"}
        title={"Apakah anda yakin ingin menghapus pesanan ini?"}
        handler={deleteHandler}
      />
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 12,
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
  totalIncomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  totalIncomeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  totalIncomeValue: {
    fontSize: 16,
    fontWeight: "bold",
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
  // Fixed column widths to create proper spacing
  columnNo: {
    flex: 1.5,
  },
  columnDate: {
    flex: 1.8,
  },
  columnTotal: {
    flex: 1.5,
    // Removed numeric property from DataTable.Title to align better
  },
  columnDetail: {
    flex: 0.8,
    alignItems: "flex-end", // Better align the toggle button
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  detailCard: {
    marginHorizontal: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  detailHeader: {
    marginBottom: 8,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemsScrollView: {
    maxHeight: 150,
  },
  itemContainer: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 13,
  },
  itemQuantity: {
    fontWeight: "bold",
    fontSize: 12,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  itemVariant: {
    fontSize: 12,
    color: "#666",
  },
  itemNote: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
  },
  itemTotalPrice: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right",
  },
  divider: {
    marginVertical: 8,
  },
  summaryDivider: {
    marginTop: 8,
    marginBottom: 8,
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTotalPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF9800",
  },
  paymentMethod: {
    fontSize: 12,
    color: "#666",
  },
  statusChip: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Orders;
