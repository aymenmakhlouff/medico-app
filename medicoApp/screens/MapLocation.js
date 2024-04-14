import React, { useEffect, useState , useContext} from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View, Button } from "react-native";
import * as Location from "expo-location";
import { updateLocation } from "../redux/doctorSlicer";
import {useSelector , useDispatch} from'react-redux'
import { auth } from "../firebase-config";
import { pharmacyLocation } from "../redux/pharmacySlicer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get("window");
export default function MapLocation({navigation}) {
  const [latitude , setLatitude] = useState(0)
  const [longtitude , setLongtitude] = useState(0)

  LogBox.ignoreAllLogs();


 
  const dispatch = useDispatch()


  const locationss = useSelector((state)=>{
    state.doctor.data
  })

  // useEffect(()=>{
  //   userLocation()
  //   console.log("gggggggggggggggg",latitude , longtitude);
  // },[])


  const [mapRegin, setMapRegin] = useState({
    latitude: 36.8065,
    longitude: 10.1815,
    latitudeDelta: 0.05459,
    longitudeDelta: 0.0532,
  });
  
  const locationSet = async()=>{
    
    const typeLOgger = await AsyncStorage.getItem("type");

    const email = auth.currentUser.email
    const obj = {
      longitude:longtitude,
      latitude:latitude,
      email
    }
    dispatch(pharmacyLocation(obj))

    if (typeLOgger === 'pharmacy') {
      dispatch(pharmacyLocation(obj))
    }
  

  //  navigation.navigate("UpgradeDocSecoundForm")
  //  await AsyncStorage.setItem('type', 'doctor');
  }
  const userLocation = async () => {
    const typeLOgger = await AsyncStorage.getItem("type");

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    setMapRegin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.004599539499977823,
      longitudeDelta: 0.0032310560345631956,
    });
    console.log("gggggggggggggggg",location.coords.latitude );

    setLatitude(location.coords.latitude)
    setLongtitude(location.coords.longitude)
    // if(location.coords.latitude){

      const email = auth.currentUser.email
  
      const obj = {
        longitude:location.coords.longitude,
        latitude:location.coords.latitude,
        email
      }
      console.log('this is the logger' , typeLOgger);
      if (typeLOgger === 'pharmacy') {
        console.log('hiii');
        dispatch(pharmacyLocation(obj))
      }
      if (typeLOgger === 'doctor') {
        dispatch(updateLocation(obj))
       
      }
    // }
    

  };
  // useEffect(() => {
  //   userLocation();
  //   console.log(latitude, longtitude);
  // }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegin}>
        <Marker coordinate={mapRegin} title="Your Location" />
      </MapView>
      <Button title="Get Location" style={styles.butt} onPress={()=>{userLocation()}} />
      <Button title="Next" onPress={()=>{ navigation.navigate("DoctorPdf")}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  map: {
    width: width * 1,
    height: height * 1,
  },
  butt: {
    alignContent: "center",
    marginBottom: 2,
  },
});
