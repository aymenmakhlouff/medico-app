import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {LogBox} from 'react-native';


const PharmacyCard2 = ({ pharmacy }) => {
  LogBox.ignoreAllLogs();

  return (
    <View style={styles.card}>
      <Image source={{ uri: pharmacy.imageUrl}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pharmacy.PHname}</Text>
        <Text style={styles.address}>{pharmacy.adress}</Text>
        <View style={styles.hoursContainer}>
          <View style={styles.daysContainer}>
            <Text style={styles.days}>MON-FRI</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>OPEN FROM: 9AM - 6PM</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    alignItems: 'center',
    width: 300,
  },
  image: {
    width: 280,
    height: 165,
    borderRadius: 20,
  },
  infoContainer: {
    width: '100%',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  address: {
    fontSize: 14,
    color: '#808080',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
  },
  hoursContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Change this line
    alignItems: 'center', // Add this line
  },
  daysContainer: {
    padding: 10,
    backgroundColor: '#008000',
    borderRadius: 9,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    alignSelf: 'flex-start',
  },
  timeContainer: {
    padding: 10,
    backgroundColor: '#ddf0ee',
    borderRadius: 9,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  days: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d958c',
  },
});

export default PharmacyCard2;