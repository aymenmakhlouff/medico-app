import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId, createPaymentIntent } from "../redux/orderSlicer";
import { auth } from "../firebase-config";
import NavigationBar from "../components/NavigationBar";
import { useStripe } from "@stripe/stripe-react-native";
import axios from 'axios'
import {LogBox} from 'react-native';


const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { orders } = route.params;
  const [pendingOrders, setPendingOrders] = useState([]);
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  LogBox.ignoreAllLogs();

  const onCheckout = async () => {
    const email = auth.currentUser.email;
    const orderId = orders.id; // Assuming orders object has an id property
    console.log(orders.id)
    const response = await dispatch(createPaymentIntent({amount: Math.floor(orders.total * 100), email, orderId}));
  
    if (response.error){
      Alert.alert('something went wrong');
      return;
    }
  
    console.log('response: ', response);
    
  
    const initResponse = await initPaymentSheet({
      merchantDisplayName: orders.Product.Pharmacy.PHname,
      paymentIntentClientSecret: response.payload.paymentIntent,
    });
  
    console.log('initResponse: ', initResponse)
  
    if (initResponse.error){
      console.log(initResponse.error)
      Alert.alert('something went wrong');
      return;
    }
  
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(`Error code: ${error.code}, Error message: ${error.message}`);
    } else {
      console.log('Success, the payment is confirmed!');
      // Send the email here
      await axios.post(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/email/send`, {
  userEmail: email,
  mymedecine: orders.Product.productName,
  mydescription: orders.Product.description,
  myprice: `${orders.total} TND`,
  myname: orders.User.username,
}, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then((response) => {
  console.log(`Email sent with status code: ${response.status}`);
  console.log(response.data);
})
.catch((error) => {
  console.error(error);
});
    }
    
    navigation.navigate("Landing");
  }
  

  const retrieve = async () => {
    const email = auth.currentUser.email;
    dispatch(fetchOrdersByUserId(email));
    if (orders) {
      setPendingOrders(orders);
    }
  };
  

 

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.helloText}>Checkout</Text>
          </View>
        </View>
        <View style={styles.ordersContainer}>
          <Text style={styles.ordersText}>Order Details</Text>
        </View>
        <View style={styles.card}>
  <View style={styles.billContainer}>
    <View style={styles.billRow}>
      <Text style={styles.billText}>Tracking N:</Text>
      <Text style={styles.billText}>{orders.tracking_number}</Text>
    </View>
    <View style={styles.separator} />
    <View style={styles.billRow}>
      <Text style={styles.billText}>From:</Text>
      <Text style={styles.billText}>{orders.Product.Pharmacy.PHname}</Text>
    </View>
    <View style={styles.separator} />
    <View style={styles.billRow}>
      <Text style={styles.billText}>To:</Text>
      <Text style={styles.billText}>{orders.address}</Text>
    </View>
    <View style={styles.separator} />
    <View style={styles.billRow}>
      <Text style={styles.billText}>Product:</Text>
      <Text style={styles.billText}>{orders.Product.productName}</Text>
    </View>
    <View style={styles.separator} />
    <View style={styles.billRow}>
      <Text style={styles.billText}>Quantity Ordered:</Text>
      <Text style={styles.billText}>{orders.quantityOrdered}</Text>
    </View>
    <View style={styles.separator} />
    <View style={styles.billRow}>
      <Text style={styles.billText}>Total:</Text>
      <Text style={styles.billText}>{orders.total} TND</Text>
    </View>
  </View>
  <TouchableOpacity
    style={styles.checkoutButton}
    onPress={() => {
        onCheckout()
    }}
  >
    <Text style={styles.checkoutButtonText}>Checkout</Text>
  </TouchableOpacity>
</View>
        <View style={{ height: 40 }} />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    greeting: {
      flexDirection: "column",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 50,
    },
    helloText: {
      fontSize: 40,
      fontWeight: "bold",
    },
    userName: {
      fontWeight: "bold",
      fontSize: 35,
    },
    icons: {
      flexDirection: "row",
    },
    iconContainer: {
      borderWidth: 1,
      borderRadius: 50,
      padding: 7,
      marginRight: 10,
      backgroundColor: "#E8E8E8",
      borderColor: "#D3D3D3", // Add this line
    },
    ordersContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 55,
    },
    secondOrdersContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 40, // Adjust this value as needed
    },
    ordersText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#ddf0ee",
      borderRadius: 20,
      paddingVertical: 3.5,
      paddingHorizontal: 13,
    },
    buttonText: {
      color: "#2d958c",
      fontSize: 15,
    },
    card: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 20, 
      },
      separator: {
        height: 1,
        backgroundColor: '#000',
        marginVertical: 10,
      },
    processingContainer: {
      backgroundColor: "#FFD699",
      borderRadius: 20,
      padding: 5,
      alignSelf: "flex-start",
    },
    processingText: {
      color: "#FFA500",
      fontSize: 13,
    },
    fromText: {
      fontSize: 16,
      marginTop: 10,
    },
    separator: {
      height: 1,
      backgroundColor: "#000",
      marginVertical: 15,
    },
    orderDetails: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    orderDetailItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 30,
      marginLeft: 30,
    },
    drugsText: {
      marginLeft: 10,
    },
    separatorVertical: {
      width: 1,
      height: "100%",
      backgroundColor: "#000",
    },
    totalText: {
      marginLeft: 10,
    },
    billContainer: {
        padding: 10,
      },
      billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      billText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      checkoutButton: {
        backgroundColor: '#2d958c',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
      },
      checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
      },
  });

  export default Checkout;