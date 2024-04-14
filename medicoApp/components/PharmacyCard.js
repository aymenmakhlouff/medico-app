import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import haversine from 'haversine';
import { auth } from '../firebase-config';
import axios from 'axios';
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get('window');

const PharmacyCard = ({ pharmacy }) => {
  LogBox.ignoreAllLogs();

  const [isDistance,setIsDistance]=useState(0)

  const calculateDistanceMap=async()=>{
    try {
      const loggedMail=auth.currentUser.email
        
       const loggedUser = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/getOne/${loggedMail}`)
       
       const start = {
         latitude: loggedUser.data.latitude,
         longitude: loggedUser.data.longitude
        }
        
        const end = {
          latitude: pharmacy.latitude,
          longitude: pharmacy.longitude
        }
        console.log(start,end,'this is distance between pharmacy');

      setIsDistance((haversine(start, end)).toFixed(1))

      
    } catch (error) {
      
    }
  }

  const navigation = useNavigation();
  console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee",pharmacy);


  useEffect(()=>{
    calculateDistanceMap()
  },[])

  return (
    <TouchableOpacity
    activeOpacity={1}
    onPress={()=>navigation.navigate('PharProf',{pharmacy:pharmacy})}
    >
    <View style={styles.card}
    >
      <Image source={{ uri: pharmacy?.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.nameRatingContainer}>
          <Text style={styles.name}>{pharmacy?.PHname}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={15} color="#FFD700" />
            <Text style={styles.rating}>{pharmacy?.rating}</Text>
          </View>
        </View>
        <View style={styles.distanceContainer}>
          <Icon name="map-marker" size={15} color="#2d958c" />
          <Text >{isDistance} km</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    margin: width * 0.03,
    padding: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: width * 0.05,
    elevation: 3,
    alignItems: 'center',
    height: height * 0.32, 
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
    borderRadius: width * 0.01,
    padding: width * 0.007,
    borderColor: '#808080', 
    borderWidth: width * 0.0025, 
  },
  rating: {
    marginLeft: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: '#ddf0ee', 
    borderRadius: 5,
    padding: 3,
    alignSelf: 'flex-start', 
  },
  distance: {
    marginLeft: 5,
    color: '#2d958c', 
  },
});

export default PharmacyCard;