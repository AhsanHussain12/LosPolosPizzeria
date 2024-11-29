import { View, Text, FlatList, StyleSheet, Pressable, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlacedOrderItemCard from '../components/PlacedOrderItemCard'
import FeedbackModal from '../components/FeedbackModal'
import { useOrderFeedbackContext } from '../context/OrderFeedbackContext'
import GoBackBtn from '../components/GoBackBtn'

const MyOrdersScreen = () => {
  const [displayedOrdersType, setDisplayedOrdersType] = useState("active");
  const { isModal } = useOrderFeedbackContext();
  const slideAnim = useState(new Animated.Value(0))[0];
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [Orders, setOrders] = useState([
    {
      order_id: "64d1f2a2a0b7b99e1a1c5678",
      user_id: "64d1f25b6f21e2a345bc1234",
      items: [
        {
          name: "BBQ Pizza",
          quantity: 2,
          size: "Large",
          crusts: "Stuffed Crust",
          stuffed: "Cheese",
        },
        {
          name: "Garlic Bread",
          quantity: 1,
          size: null,
          crusts: null,
          stuffed: null,
          pieces: 4
        }
      ],
      totalAmount: 25.99,
      status: "pending",
      payment_method: "Credit Card",
      delivery_address: {
        area: "Downtown",
        house_no: "123",
        apartment_no: "45B",
        latitude: 40.712776,
        longitude: -74.005974
      },
      date: "2024-11-29T12:00:00.000Z"
    },
    {
      order_id: "64d1f2a2a0b7b99e1a1c5679",
      user_id: "64d1f25b6f21e2a345bc1235",
      items: [
        {
          name: "Veggie Supreme Pizza",
          quantity: 1,
          size: "Medium",
          crusts: "Thin Crust",
          stuffed: null,
          pieces: 6
        },
        {
          name: "Chocolate Lava Cake",
          quantity: 2,
          size: null,
          crusts: null,
          stuffed: null,
          pieces: 2
        }
      ],
      totalAmount: 18.75,
      status: "completed",
      payment_method: "Cash",
      delivery_address: {
        area: "Midtown",
        house_no: "456",
        apartment_no: "23A",
        latitude: 40.713776,
        longitude: -74.006974
      },
      date: "2024-11-28T15:30:00.000Z"
    }
  ]);

  
  useEffect(()=>{
    // for api order fetching
  },[])
  useEffect(() => {
    console.log(displayedOrdersType);
    if (displayedOrdersType === "active") {
      setDisplayedOrders(Orders.filter(order => order.status === "pending"));
    } else {
      setDisplayedOrders(Orders.filter(order => order.status === "completed" || order.status === "cancelled"));
    }
  }, [displayedOrdersType, Orders]);

  // Handle tab click with slide animation
  const handleTabPress = (tabType) => {
    setDisplayedOrdersType(tabType);
    Animated.spring(slideAnim, {
      toValue: tabType === "active" ? 0 : 100,
      useNativeDriver: true
    }).start();
  };

  const renderOrders = () => {
    return (
      <FlatList
        data={displayedOrders}
        renderItem={({ item }) => <PlacedOrderItemCard data={item} />}
        keyExtractor={(item) => item.order_id}
      />
    );
  };

  return (

    <View style={styles.container}>
     <View style={styles.header}>
        <GoBackBtn />
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => handleTabPress("active")}
          style={[styles.tab, displayedOrdersType === "active" && styles.activeTab]}
        >
          <Text style={[styles.tabText, displayedOrdersType === "active" && styles.activeTabText]}>Active Orders</Text>
        </Pressable>

        <Pressable
          onPress={() => handleTabPress("past")}
          style={[styles.tab, displayedOrdersType === "past" && styles.activeTab]}
        >
          <Text style={[styles.tabText, displayedOrdersType === "past" && styles.activeTabText]}>Past Orders</Text>
        </Pressable>

        {/* Slide effect for the active tab */}
        <Animated.View
          style={[
            styles.activeTabIndicator,
            {
              transform: [{ translateX: slideAnim }]
            }
          ]}
        />
      </View>

      {renderOrders()}

      {isModal && <FeedbackModal />}
    </View>
  );
};

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White title text
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#aaa', // Light gray text for the inactive tabs
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6347', // Red border for the active tab
  },
  activeTabText: {
    color: '#FF6347', // Bright red text for the active tab
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    width: '50%',
    backgroundColor: '#FF6347', // Red background for the active tab indicator
  },
});

export default MyOrdersScreen;
