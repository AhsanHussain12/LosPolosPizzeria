import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import React, { useEffect,useState } from 'react';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import OrderStatusModal from '../components/OrderStatusModal';

// background fetch for when app minimized
const BACKGROUND_FETCH_TASK = 'background-fetch-task';



const OrderPlacedScreen = () => {
    const dispatch = useDispatch();
    const orderId = useSelector(state=> state.orderTracker.orderId)
    const [orderStatus,setOrderStatus]= useState(null)
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      console.log("Modal"+modalVisible);
      setModalVisible(prev => !prev);
    };

    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      try {
        const docRef = doc(FIRESTORE_DB, 'orders', orderId);
        const docSnap = await getDoc(docRef);
        console.log("AsyncBackgroundFetch Happened")
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(`Tracking OrderId inFetch:${orderId} OrderStatusinRedux: ${orderStatus} OrderStatusinDB:${data.status}`);
          // logic here to render modal and dispatch status
          if (data.status === 'completed' ) {
            if(orderStatus === null){
              setOrderStatus(data.status)
              toggleModal()
            }
          }
          else if (data.status === 'cancelled') {
            if(orderStatus === null){
              setOrderStatus(data.status)
              toggleModal()
            }
          }
        } else {
          console.error('No such order!');
        }
        return BackgroundFetch.Result.NewData;
      }
       catch (error) {
        console.error('Error in background fetch:', error);
        return BackgroundFetch.Result.Failed;
      }
    });

    const fetchOrderStatus = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, 'orders', orderId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(`Tracking OrderId inFetch:${orderId} OrderStatusinRedux: ${orderStatus} OrderStatusinDB:${data.status}`);
          // logic here to render modal and dispatch status
          if (data.status === 'completed' ) {
            if(orderStatus === null){
              setOrderStatus(data.status)
              toggleModal()
            }
          }
          else if (data.status === 'cancelled') {
            if(orderStatus === null){
              setOrderStatus(data.status)
              toggleModal()
            }
          }
        } else {
          console.error('No such order!');
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };
  
    useEffect(() => {
      const initializeBackgroundFetch = async () => {
        try {
          await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 15, // 10 minutes interval for background fetch
            stopOnTerminate: false,  // Continue fetching after app termination
            startOnBoot: true,       // Start on device reboot
          });
          console.log('Background fetch task registered!');
        } catch (error) {
          console.error('Error registering background fetch task:', error);
        }
      };
  
      // Initialize background fetch on app mount
      initializeBackgroundFetch();


  
      // Polling interval when the app is active (can be removed if relying entirely on background fetch)
      const intervalId = setInterval(() => {
        fetchOrderStatus();
      }, 3000); // 5 seconds polling for active state (can be adjusted)
      
      // Cleanup on component unmount and stop polling interval when order status is not null (completed or cancelled)
      if(orderStatus !== null ){
        console.log('Clearing Interval for Fetch');
        clearInterval(intervalId);
      }
      // Cleanup on component unmount
      return () => {
        clearInterval(intervalId);
        BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
      };
    }, [orderId, orderStatus, dispatch]);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Preparing you Order 🍴</Text>
      </View>

      {/* Lottie Animation of Chef Cooking */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/chefAnimation.json')} // Replace with your Lottie JSON file
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>

      {/* Order Status Text */}
      <Text style={styles.thanksText}>Thanks for your order!</Text>
      <Text style={styles.subText}>We have received your order for processing.</Text>

      {/* Arrival Time Section */}
      <View style={styles.arrivalTimeContainer}>
        <Text style={styles.arrivalTimeText}>Expected To Arrive in:</Text>
        <Text style={styles.timeRange}>40 minutes</Text>
        {/* <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>GOGO</Text>
        </TouchableOpacity> */}
      </View>

      {orderStatus && 
      <OrderStatusModal 
      visible={modalVisible}
      onClose={toggleModal}
      orderStatus={orderStatus}
      />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white', // White background for the button
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8, // Rounded corners for the button
        borderWidth: 1,
        borderColor: '#000', // Border color to give it definition
      },
      buttonText: {
        color: '#000', // Text color for contrast
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#000', // Dark background for consistency
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white', // Golden yellow for the title (matching the pizza theme)
    letterSpacing: 1.2, // Added some letter spacing for a more polished look
    marginBottom: 10,
  },
  animationContainer: {
    width: 250, // Adjusted size of animation container for better visual balance
    height: 250,
    marginBottom: 30,
    borderRadius: 15, // Rounded corners to give the container a soft look
    overflow: 'hidden', // Keeps animation within the container bounds
    backgroundColor: '#FFDAB9', // Light peach color to complement the animation background
    shadowColor: '#4CAF50', // Greenish shadow color to match your theme
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow effect
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
  thanksText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'orange', // Golden yellow for the thanks message
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666', // Lighter gray for subtext for better contrast
    marginBottom: 25,
    textAlign: 'center', // Centers the subtext
    lineHeight: 22, // Adds space between lines for better readability
  },
  arrivalTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the arrival time section
    marginBottom: 35,
  },
  arrivalTimeText: {
    fontSize: 18,
    color: '#666', // Lighter gray for the "Arrive at" label
    marginRight: 10,
  },
  timeRange: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Golden yellow for the time range to match the theme
  },
});

export default OrderPlacedScreen;


// TODO: 
// add the functionality to dynamically update Order status using fetching form database