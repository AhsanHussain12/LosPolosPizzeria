import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import Cart from './components/Cart';
import Icon from "react-native-vector-icons/Ionicons";
import Profile from './components/Profile';
import MainLayout from './components/MainLayout';
import { createStackNavigator } from '@react-navigation/stack';
import Checkout from './components/Checkout';
import { Provider } from 'react-redux';
import { store } from './store';


const Stack=createStackNavigator();
const Tab = createBottomTabNavigator();
const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={Cart} options={{headerShown:false}} />
      <Stack.Screen name="Checkout" component={Checkout} options={{headerShown:false}} />
    </Stack.Navigator>
  );}

const AppTabNavigation= ()=> {

  return (
 
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#111", // Black tab bar
          height: 60, // Consistent height
          position: "absolute",
          borderTopWidth: 0,
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
        {()=>(
          <MainLayout>
            <Home/>
          </MainLayout>
        )}
      </Tab.Screen>

      {/* Cart Screen */}
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.cartButton,
                focused && styles.cartButtonActive,
              ]}
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
        {()=>(
          <MainLayout>
            <CartStack />
          </MainLayout>
        )
        }
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
        { ()=>(
          <MainLayout>
          <Profile />
          </MainLayout>
        )
        }
      </Tab.Screen>
    </Tab.Navigator>
 
  );
}
export default function App(){
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppTabNavigation />
      </NavigationContainer>
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
  cartButton: {
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    zIndex: 10,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cartButtonActive: {
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
