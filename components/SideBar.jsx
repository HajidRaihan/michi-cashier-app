import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { HomeIcon, ListBulletIcon } from "react-native-heroicons/outline";
import { useTheme } from "react-native-paper";

// Warna

const SideBar = ({ activeMenu = "Home", onPress }) => {
  const theme = useTheme();
  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            activeMenu === "Home" && { backgroundColor: theme.colors.lightSecondary },
          ]}
          onPress={() => onPress("Home")}
        >
          <HomeIcon
            size={24}
            color={activeMenu === "Home" ? theme.colors.secondary : theme.colors.gray}
          />
          <Text
            style={{
              fontSize: 12,
              color: activeMenu === "Home" ? theme.colors.secondary : theme.colors.gray,
              fontWeight: activeMenu === "Home" ? "bold" : "normal",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconContainer,
            activeMenu === "Menu" && { backgroundColor: theme.colors.lightPrimary },
          ]}
          onPress={() => onPress("Menu")}
        >
          <ListBulletIcon
            size={24}
            color={activeMenu === "Menu" ? theme.colors.secondary : theme.colors.gray}
          />
          <Text
            style={{
              fontSize: 12,
              color: activeMenu === "Menu" ? theme.colors.secondary : theme.colors.gray,
              fontWeight: activeMenu === "Menu" ? "bold" : "normal",
            }}
          >
            Menu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    backgroundColor: "#fff",
  },
  sidebar: {
    width: 60,
    borderRadius: 12,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
});

export default SideBar;
