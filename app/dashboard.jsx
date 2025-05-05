import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { CurrencyDollarIcon } from "react-native-heroicons/outline";
import { calculateRevenue } from "../services/revenueService";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState();
  const [totalPengeluaran, setTotalPengeluaran] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { totalOrderPrice, totalExpense } = await calculateRevenue();
        console.log(totalOrderPrice, totalExpense);

        setTotalOrders(totalOrderPrice);
        setTotalPengeluaran(totalExpense);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.revenueContainer}>
        <RevenueCard
          title="Pendapatan Kotor"
          subtitle={totalOrders?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
        />
        <RevenueCard
          title="Pengeluaran"
          subtitle={totalPengeluaran?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        />
        <RevenueCard
          title="Pendapatan Bersih"
          subtitle={(totalOrders - totalPengeluaran)?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        />
      </View>
    </View>
  );
};

const RevenueCard = ({ title, subtitle }) => {
  return (
    <Card.Title
      title={title}
      subtitle={subtitle}
      left={() => (
        <View style={{ backgroundColor: "#E0F2FE", borderRadius: 24, padding: 8 }}>
          <CurrencyDollarIcon size={24} color="#0284C7" />
        </View>
      )}
      // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      style={styles.card}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  revenueContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  card: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    backgroundColor: "#fff",
    width: 280,
  },
});

export default Dashboard;
