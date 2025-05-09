import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { CurrencyDollarIcon } from "react-native-heroicons/outline";

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
  card: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    backgroundColor: "#fff",
    width: 280,
  },
});

export default RevenueCard;
