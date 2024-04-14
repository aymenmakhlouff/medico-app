import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get("window");


const DoctorCard = ({doctor}) => {
  LogBox.ignoreAllLogs();

    return (
      <View style={styles.card}>
        <Image source={{ uri: doctor.Doctor.imageUrl }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.nameRatingContainer}>
            <Text style={styles.name}>{doctor.Doctor.fullname}</Text>
            {doctor.Doctor.isverified && (
              <View style={styles.ratingContainer}>
                <Icon name="check-circle" size={15} color="#2d958c" />
                <Text style={styles.rating}>Verified</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    margin: width * 0.03,
    padding: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: width * 0.05,
    elevation: 3,
    alignItems: 'center',
    height: height * 0.3, 
    width: width * 0.8, 
  },
  image: {
    width: width * 0.7, 
    height: height * 0.2, 
    borderRadius: width * 0.05,
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '100%', 
    padding: width * 0.03,
  },
  nameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: width * 0.0125,
    padding: width * 0.0075,
    borderColor: '#808080', // Grey border color
    borderWidth: width * 0.0025, // Border width
  },
  rating: {
    padding: width * 0.001,
  },
});

export default DoctorCard;