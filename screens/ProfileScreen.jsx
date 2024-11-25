import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const ProfileScreen = () => {
  const imageUrl ="https://raw.githubusercontent.com/AhsanHussain12/TEACHMATE-Web-Backend/refs/heads/main/DALL%C2%B7E%202024-11-22%2022.24.12%20-%20A%20vibrant%20and%20modern%20logo%20for%20'Los%20Polos%20Pizzeria'%2C%20featuring%20a%20stylized%20pizza%20with%20a%20playful%20and%20professional%20font.%20The%20logo%20should%20be%20bold%20and%20color.webp"
  
  return (
    <>
      <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});


export default ProfileScreen;
