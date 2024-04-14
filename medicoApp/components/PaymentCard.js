import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get('window');

const PaymentCard = ({ order }) => {
  LogBox.ignoreAllLogs();

    const paymentId = order?.Payment?.paymentIntentId;
    console.log(order);
    const amount = order?.total;
    const product = order?.Product?.productName;
    const quantity = order?.quantityOrdered
    const createdAt = order?.Payment?.createdAt;
    const pharmacy = order.Product.Pharmacy.PHname;
  
    return (
        <View style={styles.card}>
          <View style={styles.textCard}>
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Payment ID:</Text>
              </View>
              <Text style={styles.text}> {paymentId}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Product:</Text>
              </View>
              <Text style={styles.text}> {product}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>From:</Text>
              </View>
              <Text style={styles.text}> {pharmacy}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Quantity:</Text>
              </View>
              <Text style={styles.text}> {quantity} item(s)</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Amount:</Text>
              </View>
              <Text style={styles.text}> {amount} TND</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Date:</Text>
              </View>
              <Text style={styles.text}> {createdAt ? new Date(createdAt).toLocaleDateString() : ''}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="file-text-o" size={24} color="black" />
          </View>
        </View>
      );
  };

export default PaymentCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: width * 0.025,
        margin: width * 0.025,
        borderRadius: width * 0.05, // Increase this value to make the cards more rounded
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      textCard: {
          backgroundColor: '#f8f8f8',
          padding: width * 0.02,
          borderRadius: width * 0.02,
          shadowColor: "#000",
          justifyContent: 'space-between',
          shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        },
        text: {
            fontSize: width * 0.03,
            marginBottom: height * 0.005,
            backgroundColor: '#ddf0ee', 
            padding: width * 0.01,
            borderRadius: width * 0.01,
            color: '#2d958c',
            marginLeft: width * 0.02, 
          },
          label: {
            fontSize: width * 0.03,
            marginBottom: height * 0.005,
            fontWeight: 'bold',
            backgroundColor: '#008000', // Dark grey
            padding: width * 0.01,
            paddingRight: width * 0.02, // Add this line
            borderRadius: width * 0.01,
            color: '#fff'
          },
      iconContainer: {
          position: 'absolute',
          right: width * 0.07,
          bottom: height * 0.025,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
    marginBottom: height * 0.01,
          },
          labelContainer: {
            width: width * 0.2, // Adjust this value as needed
            alignContent: 'center',
          },
});