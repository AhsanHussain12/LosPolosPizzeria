import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import GoBackBtn from '../components/GoBackBtn';

const AnalyticsOverviewScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <GoBackBtn />
            <Text style={styles.headerText}>Analytics Overview</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#111', // Dark background for a sleek look
  },
  header: {
    flexDirection: 'row', // Align GoBack button and text horizontally
    alignItems: 'center',
    marginBottom: 35,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white', // Add a splash of color for contrast
    marginLeft: 12, // Space between the button and the text
  },
});

export default AnalyticsOverviewScreen;