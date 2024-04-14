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
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NavigationBar from "../components/NavigationBar";
import PaymentCard from "../components/PaymentCard";
import OrderDetails from "../components/OrderDetails";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId } from "../redux/orderSlicer";
import { auth } from "../firebase-config";
import axios from 'axios';
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get('window');



const Payments = () => {
  LogBox.ignoreAllLogs();

    const [payment, setPayment] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders?.userOrders);
    const paidOrders = orders?.filter(order => order.isPayed === true);
  
    useEffect(() => {
      const email = auth.currentUser.email;
      dispatch(fetchOrdersByUserId(email));
    }, [dispatch]);
  
  return (
    <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.greeting}>
              <Text style={styles.helloText}>Payments</Text>
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
            <Text style={styles.ordersText}>Payments History </Text>
            <FlatList
          data={paidOrders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PaymentCard order={item} />}
        />
          </View>
    </View>
    <NavigationBar />
  </View>
  )
}

export default Payments

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
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
    ordersText: {
      fontSize: 18,
      fontWeight: "bold",
      padding: 10,
      marginTop: 40,
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
  });