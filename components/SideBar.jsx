import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native";
import { HomeIcon, ListBulletIcon } from "react-native-heroicons/outline";
import { useTheme } from "react-native-paper";
import { useRouter, usePathname } from "expo-router";

const SideBar = ({ activeMenu = "Home", onPress }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(activeMenu);

  // Animated values
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Update active menu based on pathname
    if (pathname === "/") {
      setActive("Home");
    } else if (pathname === "/orders") {
      setActive("Menu");
    }

    // Trigger fade-in animation when menu changes
  }, [pathname]);

  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            active === "Home" && { backgroundColor: theme.colors.lightSecondary },
          ]}
          onPress={() => router.push("/")}
        >
          <HomeIcon
            size={24}
            color={active === "Home" ? theme.colors.secondary : theme.colors.gray}
          />
          <Text
            style={{
              fontSize: 12,
              color: active === "Home" ? theme.colors.secondary : theme.colors.gray,
              fontWeight: active === "Home" ? "bold" : "normal",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconContainer,
            active === "Menu" && { backgroundColor: theme.colors.lightSecondary },
          ]}
          onPress={() => router.push("/orders")}
        >
          <ListBulletIcon
            size={24}
            color={active === "Menu" ? theme.colors.secondary : theme.colors.gray}
          />
          <Text
            style={{
              fontSize: 12,
              color: active === "Menu" ? theme.colors.secondary : theme.colors.gray,
              fontWeight: active === "Menu" ? "bold" : "normal",
            }}
          >
            Orders
          </Text>
        </TouchableOpacity>
      </View>

      {/* Animated Fade-In Effect */}
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
