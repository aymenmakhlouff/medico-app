import React, { useState }from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get('window');



const MedicineCard = ({ medecine }) => {
  LogBox.ignoreAllLogs();

  const [isAvailable, setIsAvailable] = useState(true); 
  return (
    <View style={styles.card}>
      <Image source={{ uri: medecine.imageURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{medecine.productName}</Text>
        <View style={[styles.statusContainer, isAvailable ? {} : { backgroundColor: 'red' }]}>
          <Text style={styles.statusText}>{isAvailable ? 'Available' : 'Out of Stock'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    margin: width * 0.03,
    padding: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    alignItems: 'center',
    height: height * 0.3, 
    width: width * 0.8, 
  },
  image: {
    width: width * 0.7,
    height: height * 0.2,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  infoContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    padding: width * 0.03,
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    flex: 1, 
  },
  statusContainer: {
    backgroundColor: '#ddf0ee',
    borderRadius: 5,
    padding: width * 0.01,
    width: width * 0.3,
    alignItems: 'center',
    flexShrink: 1, 
  },
  statusText: {
    color: '#2d958c',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});

export default MedicineCard;