import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MainLayoutScreen from './screens/MainLayoutScreen';
import OrderPlacedScreen from './screens/OrderPlacedScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CartStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppTabNavigation = () => {
  const orderStatus = useSelector(state=>state.orderTracker.status)
  console.log(orderStatus)
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#111", // Black tab bar
          height: 60, // Consistent height
          position: "absolute",
          borderTopWidth: 0,
          paddingHorizontal: 20, // Add padding for space on sides
        },
        tabBarShowLabel: false, // Hide tab labels
        headerShown: false, // Header is custom
      }}
    >
      {/* Home Screen */}
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#666",
          headerShown: false
        }}
      >
        {() => (
          <MainLayoutScreen>
            <HomeScreen />
          </MainLayoutScreen>
        )}
      </Tab.Screen>

      {/* Cart Screen */}
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.cartButtonWrapper, focused && styles.cartButtonWrapperActive]}
            >
              <Icon
                name="cart-outline"
                size={28}
                color="#fff"
                style={focused ? styles.iconGlow : {}}
              />
            </View>
          ),
        }}
      >  
        {() => {
          // Render OrderPlacedScreen or CartStack based on orderStatus
          if (orderStatus === "pending") {
            return (
              <MainLayoutScreen>
                <OrderPlacedScreen />
              </MainLayoutScreen>
            );
          }
          return (
            <MainLayoutScreen>
              <CartStack />
            </MainLayoutScreen>
          );
        }}

      </Tab.Screen>

      {/* Profile Screen */}
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#666",
        }}
      >
        {() => (
          <MainLayoutScreen>
            <ProfileScreen />
          </MainLayoutScreen>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
        <NavigationContainer>
          <AppTabNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },

  // Cart Button Styling
  cartButtonWrapper: {
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: "50%", // Center the button horizontally
    marginLeft: -30, // Offset to truly center (width/2)
    zIndex: 10,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cartButtonWrapperActive: {
    shadowColor: "#4CAF50",
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  iconGlow: {
    textShadowColor: "#4CAF50",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});


// TODO: 
// user Profile Screen
//Admin APP side left completely