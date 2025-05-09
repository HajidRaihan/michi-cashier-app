import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  HomeIcon,
  ListBulletIcon,
  NewspaperIcon,
  DocumentIcon,
  ChartPieIcon,
} from "react-native-heroicons/outline";
import { useTheme } from "react-native-paper";
import { useRouter, usePathname } from "expo-router";

const SideBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("Home");

  const menuItems = [
    {
      name: "Home",
      route: "/",
      icon: HomeIcon,
    },
    {
      name: "Pesanan",
      route: "/orders",
      icon: NewspaperIcon,
    },
    {
      name: "Pengeluaran",
      route: "/expenses",
      icon: DocumentIcon,
    },
    {
      name: "Menu",
      route: "/menu",
      icon: ListBulletIcon,
    },

    // {
    //   name: "Dashboard",
    //   route: "/dashboard",
    //   icon: ChartPieIcon,
    // },
  ];

  useEffect(() => {
    const found = menuItems.find((item) => item.route === pathname);
    if (found) setActive(found.name);
  }, [pathname]);

  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.sidebar}>
        <ScrollView>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.iconContainer,
                  isActive && { backgroundColor: theme.colors.lightSecondary },
                ]}
                onPress={() => router.push(item.route)}
              >
                <Icon size={24} color={isActive ? theme.colors.secondary : theme.colors.gray} />
                <Text
                  style={{
                    fontSize: 10,
                    color: isActive ? theme.colors.secondary : theme.colors.gray,
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
