import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Replace with your logo file path
          style={styles.logo}
        />
      </View>

      {/* Header Title */}
      <Text style={styles.headerText}>LosPolosPizzeria</Text>

      {/* Placeholder for future icon or additional elements */}
      <View style={styles.rightIconContainer}>
        {/* Add any icon or action button if needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#FF6347', // Vibrant background color for modern look
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20, // Rounded bottom corners for a sleek look
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Adds a floating shadow effect
  },
  logoContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 15, // Rounded container for the logo
    elevation: 5, // Shadow for the logo container
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10, // Rounded logo
  },
  headerText: {
    color: '#fff', // White color for header text to stand out
    fontSize: 22,
    fontWeight: '700', // Bold weight for a stronger appearance
    textAlign: 'center',
  },
  rightIconContainer: {
    width: 40, // Space for any future icon or buttons
    height: 40,
  },
});

export default Header;
