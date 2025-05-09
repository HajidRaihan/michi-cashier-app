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
          bgIconColor="#E0F2FE"
          iconColor="#0284C7"
        />
        <RevenueCard
          title="Pengeluaran"
          subtitle={totalPengeluaran?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
          bgIconColor="#FEE2E2"
          iconColor="#DC2626"
        />
        <RevenueCard
          title="Pendapatan Bersih"
          subtitle={(totalOrders - totalPengeluaran)?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
          bgIconColor="#DCFCE7"
          iconColor="#16A34A"
        />
      </View>
    </View>
  );
};

const RevenueCard = ({ title, subtitle, bgIconColor, iconColor }) => {
  return (
    <Card.Title
      title={title}
      subtitle={subtitle}
      left={() => (
        <View style={{ backgroundColor: bgIconColor, borderRadius: 24, padding: 8 }}>
          <CurrencyDollarIcon size={24} color={iconColor} />
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
