import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import useCurrentLocation from '../customHooks/useCurrentLocation';
import GoBackBtn from '../components/GoBackBtn';

const CheckoutScreen = ({navigation}) => {

  const {location,region,locationDetails,errorMsg} = useCurrentLocation()
  
  const userCurrentLocation= ()=>{
    
    // Function to render user current location map
    if (!location || !region || !locationDetails) {
      return <Text>Loading...</Text>;  // Show loading text while fetching location
    }

    return (
      <MapView style={styles.map} region={region}> 
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Current Location"
          description="Delivery Address"
        />
      </MapView>
    )

  }
  const defaultLocation=()=>(
    <MapView
    style={styles.map}
    initialRegion={{
      latitude: 24.8607,
      longitude: 67.0011,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    <Marker
      coordinate={{ latitude: 24.8607, longitude: 67.0011 }}
      title="Karachi"
      description="Sahil Farm House Karachi"
    />
  </MapView>
  )

  return (
    <View style={styles.container}>
      
      <GoBackBtn text ={"CheckOut"}/>

      {/* Delivery Address */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Icon name="location-outline" size={20} color="#4CAF50" />
          <Text style={styles.cardTitle}>Delivery Address</Text>
          <TouchableOpacity>
            <Icon name="pencil" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        {location ? userCurrentLocation() : defaultLocation() }

        <Text style={styles.addressText}>
          {locationDetails}
        </Text>
      </View>
     </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  map: {
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#555',
    marginLeft: 30,
    marginTop: 5,
  },
  addPaymentButton: {
    marginTop: 10,
  },
  addPaymentText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 10,
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  placeOrderText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;
