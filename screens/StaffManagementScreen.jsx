import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const StaffManagementScreen = ({ navigation }) => {
  const admins = [
    {
      id: "1",
      name: "Kalluchamar",
      email: "kalluchamar@gmail.com",
      createdAt: "December 25, 2024 at 12:26:15 AM UTC+5",
      lastLogin: "December 25, 2024 at 12:26:15 AM UTC+5",
    },
    {
      id: "2",
      name: "Admin2",
      email: "admin2@example.com",
      createdAt: "December 24, 2024 at 11:00:00 PM UTC+5",
      lastLogin: "December 24, 2024 at 11:30:00 PM UTC+5",
    },
  ];

  const handleAddAdmin = () => {
    // open modal logic
  };

  const renderAdminItem = ({ item }) => (
    <View style={styles.adminCard}>
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{item.name}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{item.email}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>{item.createdAt}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Last Login</Text>
        <Text style={styles.value}>{item.lastLogin}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Staff Management</Text>
        <TouchableOpacity onPress={handleAddAdmin}>
          <Icon name="add-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={admins}
        keyExtractor={(item) => item.id}
        renderItem={renderAdminItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  adminCard: {
    backgroundColor: "#1e1e1e",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
  },
  field: {
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    color: "#aaa",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#2a2a2a",
    padding: 6,
    borderRadius: 6,
  },
});

export default StaffManagementScreen;
