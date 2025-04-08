import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { HomeIcon, ListBulletIcon } from "react-native-heroicons/outline";

const SideBar = () => {
  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.sidebar}>
        <View style={styles.iconContainer}>
          <HomeIcon size={24} color={"#000"} />
          <Text style={{ fontSize: 12 }}>Home</Text>
        </View>
        <View style={styles.iconContainer}>
          <ListBulletIcon size={24} color={"#000"} />
          <Text style={{ fontSize: 12 }}>Menu</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sidebar: {
    width: 60,
    height: "fit-content",

    borderRadius: 12,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
});

export default SideBar;
