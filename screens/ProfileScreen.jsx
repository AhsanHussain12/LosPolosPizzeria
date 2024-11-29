import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have installed vector-icons

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Handle functions (replace with actual implementations)
  const handleEditProfilePress = () => { navigation.navigate("EditProfile"); };
  const handleMyOrdersPress = () => { navigation.navigate("MyOrders"); };
  const handleContactUsPress = () => { navigation.navigate("ContactUs"); };
  const handleLogoutPress = () => { /* Logout action */ };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Image Icon with Camera Icon */}
      <View style={styles.profileImageContainer}>
        <Icon name="user-circle" size={120} color="#FF6347" />
        {/* Pressable camera icon on profile */}
        <Pressable style={styles.cameraIconContainer}>
          <Icon name="camera" size={30} color="#fff" />
        </Pressable>
      </View>

      {/* Edit Profile */}
      <TouchableOpacity onPress={handleEditProfilePress} style={styles.button}>
        <View style={styles.buttonContent}>
          <Icon name="edit" size={24} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>

      {/* My Orders */}
      <TouchableOpacity onPress={handleMyOrdersPress} style={styles.button}>
        <View style={styles.buttonContent}>
          <Icon name="shopping-cart" size={24} color="#fff" />
          <Text style={styles.buttonText}>My Orders</Text>
        </View>
      </TouchableOpacity>

      {/* Contact Us */}
      <TouchableOpacity onPress={handleContactUsPress} style={styles.button}>
        <View style={styles.buttonContent}>
          <Icon name="phone" size={24} color="#fff" />
          <Text style={styles.buttonText}>Contact Us</Text>
        </View>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
        <View style={styles.buttonContent}>
          <Icon name="sign-out" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30, // More space at the top and bottom
    paddingHorizontal: 20,
    backgroundColor: '#141414', // Dark background for the main screen
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 40, // Added more space for profile image
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF6347', // Red background for the camera icon
    borderRadius: 50,
    padding: 12,
  },
  button: {
    backgroundColor: '#222', // Dark background for buttons
    paddingVertical: 18, // Increased padding for better spacing
    marginBottom: 25, // Added more space between buttons
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the left
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow effect
  },
  logoutButton: {
    backgroundColor: '#FF6347', // Bright red for logout button
    paddingVertical: 18,
    marginTop: 30, // Added more space for logout button
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow effect
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the left
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '600',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '600',
  },
});

export default ProfileScreen;