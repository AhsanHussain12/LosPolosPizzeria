import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import GoBackBtn from '../components/GoBackBtn'

const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Inline GoBack button with text */}
      <View style={styles.header}>
        <GoBackBtn />
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Dark background for the screen
    padding: 20,
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
})
export default EditProfileScreen