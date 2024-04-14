import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NavigationBar from "../components/NavigationBar";
import OrderDetails from "../components/OrderDetails";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId } from "../redux/orderSlicer";
import { auth } from "../firebase-config";
import {LogBox} from 'react-native';

const OrderDet = () => {
  LogBox.ignoreAllLogs();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders?.userOrders);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const retrieve = async () => {
    const email = auth.currentUser.email;
    dispatch(fetchOrdersByUserId(email));
    if (orders) {
      setPendingOrders(orders);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    retrieve().then(() => setRefreshing(false));
  }, []);

  const ordersData = pendingOrders
    .map((order) => ({
      order: order,
      email: auth.currentUser.email,
    }))
    .sort((a, b) => {
      const statusOrder = ["Accepted", "Pending", "Rejected"];
      return (
        statusOrder.indexOf(a.order.status) - statusOrder.indexOf(b.order.status)
      );
    });

  useEffect(() => {
    retrieve();
  }, [orders.length]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.order.order_id}
        renderItem={({ item }) => (
          <OrderDetails
            pharmacy={item.pharmacies}
            order={item.order}
            email={item.email}
          />
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.greeting}>
                <Text style={styles.helloText}>Orders</Text>
              </View>
              <View style={styles.icons}>
                <TouchableOpacity>
                  <View style={styles.iconContainer}>
                    <Icon
                      name="bell-o"
                      size={25}
                      color="grey"
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('orderDetails')}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name="cart-outline"
                      size={25}
                      color="grey"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ordersContainer}>
              <Text style={styles.ordersText}>Orders History </Text>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={{ height: 40 }} />
        }
      />
      <NavigationBar />
    </View>
  );;
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
      paddingLeft: 10,
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
      fontSize: 18,
      fontWeight: "bold",
      padding: 10,
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
      borderRadius: 30,
      padding: 19,
      backgroundColor: "#f8f8f8",
      marginTop: 30,
      marginHorizontal: 10,
      height: 150,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
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
  });

export default OrderDet;