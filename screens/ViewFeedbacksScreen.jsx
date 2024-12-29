import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fuse from 'fuse.js';
import GoBackBtn from '../components/GoBackBtn';
import { ActivityIndicator } from 'react-native-paper';
import { collection, query, where, getDocs, orderBy, getDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';

const ViewFeedbacksScreen = () => {
  // populated with dummy data as of now replace with your own and make the cards more beautiful
  const [feedbacks, setFeedBacks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayedFeedBacks, setDisplayedFeedBacks] = useState(feedbacks);

  useEffect(() => {
    const FetchAllFeedBacks = async () => {

      try {
        // Firestore query to fetch completed/cancelled orders with feedback
        const ordersQuery = query(
          collection(FIRESTORE_DB, 'orders'),
          where('feedback', '!=', ''),  // Exclude empty strings
          orderBy('date', 'desc')  // Order by 'date' field in descending order
        );
          
        const querySnapshot = await getDocs(ordersQuery);
  
        const ordersList = [];
        // Iterate through orders and fetch user name for each order
        for (const docSnap of querySnapshot.docs) {
          const orderData = docSnap.data();
          const userId = orderData.user_id;
  
          // Fetch user data for each order
          const userDoc = await getDoc(doc(FIRESTORE_DB, 'users', userId));
          const userData = userDoc.exists() ? userDoc.data() : null;
  
          if (userData) {
            ordersList.push({
              orderId: docSnap.id,
              name: userData.name,
              feedback: orderData.feedback
            });
          }
        }
        console.log(ordersList)
        setFeedBacks(ordersList);
  
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);  // Set loading to false after the fetch operation is complete
      }
    }
  
    FetchAllFeedBacks();
  }, []);  // Empty dependency array ensures the effect runs once on mount
  
  useEffect(() => {
    if (search) {
      // Fuse.js search configuration
      const fuse = new Fuse(feedbacks, {
        keys: ['name',"orderId"],
        includeScore: true,
      });

      // Perform the search and update the displayed feedbacks
      const results = fuse.search(search);
      const filteredFeedbacks = results.map(result => result.item);
      setDisplayedFeedBacks(filteredFeedbacks);
    } else {
      setDisplayedFeedBacks(feedbacks);  // Reset to all feedbacks if search is cleared
    }
  }, [search, feedbacks]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBackBtn />
        <Text style={styles.headerText}>Feedbacks</Text>
      </View>
      {loading ? 
        <ActivityIndicator style={styles.loader} size={50} color='#FF6347' />
        :
        <>
          <View style={styles.searchContainer}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search by Name or Order ID..."
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
            <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
          </View>

          <FlatList
            data={displayedFeedBacks}
            keyExtractor={(item) => item.orderId}
            renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.subText}>Order#: <Text style={styles.highlight}>{item.orderId}</Text></Text>
              <View style={styles.separator} />  {/* Line separator */}
              <Text style={styles.cardTitle}>{item.name}</Text>
              <TextInput
                style={styles.cardValue}
                value={item.feedback}
                editable={false} // Read-only feedback field
                multiline={true} // Allow multiline feedback
              />
            </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No Feedbacks Found</Text>}
          />
        </>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 6,
    color: 'white',
  },
  searchIcon: {
    marginLeft: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#333333',        // White background
    borderRadius: 10,               // Rounded corners
    padding: 15,                    // Padding inside the card
    marginVertical: 10,             // Vertical margin for spacing between cards
    shadowColor: '#000',            // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1,             // Shadow opacity
    shadowRadius: 10,               // Shadow radius for blur effect
    elevation: 5,                   // Elevation for Android shadow
  },
  subText: {
    fontSize: 14,
    color: '#fff',                  // Lighter color for sub-text
    fontWeight: '500',               // Medium weight for sub-text
    marginBottom: 5,                 // Space below the order number
  },
  highlight: {
    color: '#007bff',               // Blue color for the order ID
    fontWeight: 'bold',              // Bold for order ID
  },
  separator: {
    borderBottomWidth: 1,           // Draw a line below the Order#
    borderBottomColor: 'black',      // Light gray color for the line
    marginVertical: 5,              // Space before and after the line
  },
  cardTitle: {
    fontSize: 15,                   // Larger font for the customer's name
    color: '#fff',                  // Darker color for name
    fontWeight: '600',               // Semi-bold for the title
    marginBottom: 10,                // Space below the name
  },
  cardValue: {
    fontSize: 16,                   // Medium font size for feedback
    color: '#fff',                  // Darker color for the feedback text
    fontStyle: 'italic',            // Italic style for feedback
    lineHeight: 24,                 // Increased line height for readability
    borderColor: 'black',            // Border color for the read-only input
    borderWidth: 1,                 // Border around the feedback
    borderRadius: 5,                // Rounded corners for the input
    paddingHorizontal: 10,          // Horizontal padding inside the feedback field
    paddingVertical: 5,             // Vertical padding inside the feedback field
    backgroundColor: '#4B4B4B',
      // Light gray background for the read-only field
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ViewFeedbacksScreen;
