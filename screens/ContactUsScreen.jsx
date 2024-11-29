import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icon use
import GoBackBtn from '../components/GoBackBtn';

const ContactUsScreen = () => {
  // Social media links
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't open URL", err));
  };

  return (
    <View style={styles.container}>
      {/* Inline GoBack button with text */}
      <View style={styles.header}>
        <GoBackBtn />
        <Text style={styles.headerText}>Contact Us</Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>Email:</Text>
        <Text style={styles.contactValue}>support@yourapp.com</Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>Phone:</Text>
        <Text style={styles.contactValue}>(+123) 456-7890</Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>Address:</Text>
        <Text style={styles.contactValue}>123 Your Street, Your City, Your Country</Text>
      </View>

      <View style={styles.socialMediaContainer}>
        <Text style={styles.socialMediaText}>Follow Us:</Text>

        <TouchableOpacity onPress={() => openLink('https://www.facebook.com/yourpage')} style={styles.socialMediaLink}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png' }} style={styles.socialIcon} />
          <Text style={styles.socialMediaText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openLink('https://www.instagram.com/yourpage')} style={styles.socialMediaLink}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png' }} style={styles.socialIcon} />
          <Text style={styles.socialMediaText}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openLink('https://twitter.com/yourpage')} style={styles.socialMediaLink}>
          <Icon name="twitter" size={30} color="#1DA1F2" style={styles.socialIcon} />
          <Text style={styles.socialMediaText}>Twitter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'black', // Set background to black
  },
  header: {
    flexDirection: 'row', // Align GoBack button and text horizontally
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // Primary text color
    marginLeft: 10, // Space between the button and the text
  },
  contactInfo: {
    marginVertical: 15,
  },
  contactLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff', // Secondary text color
  },
  contactValue: {
    fontSize: 16,
    color: '#fff', // Primary text color
  },
  socialMediaContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  socialMediaText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff', // Primary text color
    marginBottom: 10,
  },
  socialMediaLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  socialIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#4F8EF7', // Primary color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContactUsScreen;
