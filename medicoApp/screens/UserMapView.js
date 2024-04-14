import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated,Image } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from 'react-native-animatable';
import COLORS from "../constants/colors";
import {LogBox} from 'react-native';


const UserMapView = () => {
  LogBox.ignoreAllLogs();

  const appointCoords = useSelector((state) => state.doctor?.userInfo);
  console.log("appointCords",appointCoords);
  const [destination, setDestination] = useState({
    latitude: appointCoords.latitude,
    longitude: appointCoords.longitude,
  });
  
  const [userLocation, setUserLocation] = useState(null);
  const [following, setFollowing] = useState(false);
  // const [speed, setSpeed] = useState(0);
  const [estimatedDuration, setEstimatedDuration] = useState(null);
  const [isDistance, setIsDistance] = useState(null);
  const [isModeVisible, setModeVisible] = useState(true);
  const [displayBtn, setDisplayBtn] = useState(true);

  const { speed } = userLocation || {};
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownModeRef = useRef(null);
  
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  
  
    console.log(userLocation);
    const showDropdown = () => {
  setDropdownVisible(true);
  dropdownRef.current.slideInUp(900);
};
const hideDropdown = () => {
  dropdownRef.current.fadeOutDownBig(900).then(() => {
    setDropdownVisible(false);
  });
};
    const showDropdownMode = () => {
      setModeVisible(true);
  dropdownModeRef.current.slideInLeft(900);
};
const hideDropdownMode = () => {
  dropdownModeRef.current.fadeOutLeftBig(900).then(() => {
    setModeVisible(false);
  });
};
const showButton = () => {
  setTimeout(() => {
    setDisplayBtn(true);
  }, 900);
};

const CustomMarker = () => {
  return (
    <View style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
    <Image source={require('../assets/hiddenMarker.png')} style={{ width: 1, height: 1 }} />
  </View>
  );
};

 const getLocation = async () => {
   let { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== 'granted') {
     console.error('Permission to access location was denied');
     return;
   }

   let currentLocation = await Location.getCurrentPositionAsync({});
   setUserLocation(currentLocation.coords);
  //  setSpeed(currentLocation.coords.speed);

   if (following) {
     animateToRegion(currentLocation.coords);
   }
 };

 const startIteniraire = () => {
   getLocation(); 
   setFollowing(true);
 };

 const stopIteniraire = () => {
   setFollowing(false);
 };

 const animateToRegion = async (location) => {
   if (mapRef.current && markerRef.current) {
     const { latitude, longitude } = location;

     // Calculate the new camera position
     const newCamera = {
       center: {
         latitude,
         longitude,
       },
       pitch: 0, // Adjust the pitch as needed
       heading: getHeading(userLocation, location), // Adjust the heading based on user movement
       altitude: 1, // Set a low altitude to keep the camera close to the floor
       zoom: 20, // Adjust the zoom level as needed
     };

     // Animate the camera movement
     mapRef.current.animateCamera(newCamera, { duration: 1000 });

     // Move the marker smoothly
     markerRef.current.animateMarkerToCoordinate({ latitude, longitude }, 1000);
   }
 };

 const getHeading = (fromLocation, toLocation) => {
   if (!fromLocation || !toLocation) {
     return 0;
   }

   const { latitude: fromLat, longitude: fromLon } = fromLocation;
   const { latitude: toLat, longitude: toLon } = toLocation;

   const dLon = toLon - fromLon;
   const y = Math.sin(dLon) * Math.cos(toLat);
   const x = Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(dLon);

   let heading = Math.atan2(y, x);
   heading = (heading * 180) / Math.PI; // Convert radians to degrees
   heading = (heading + 360) % 360; // Ensure the result is between 0 and 360 degrees

   return heading;
 };


 const getTime = async () => {
  try {
    if (!userLocation) {
      console.warn("User location is not available");
      return;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${appointCoords.latitude},${appointCoords.longitude}&key=AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y`
    );
    const data = await response.json();

    if (data.status === "OK" && data.routes.length > 0 && data.routes[0].legs.length > 0) {
      const duration = data.routes[0].legs[0].duration.text;
      setEstimatedDuration(duration);
    } else if (data.status === "ZERO_RESULTS") {
      console.warn("No route found between the specified points.");
      setEstimatedDuration(null);
    } else {
      console.error("Error calculating route: ", data.status);
    }
  } catch (error) {
    console.error("Error fetching route data: ", error);
  }
};

const calculateDistanceMap = async () => {
  try {
    if (!userLocation) {
      console.warn("User location is not available");
      return;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation.latitude},${userLocation.longitude}&destinations=${appointCoords.latitude},${appointCoords.longitude}&key=AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y`
    );
    const data = await response.json();

    if (
      data.status === "OK" &&
      data.rows.length > 0 &&
      data.rows[0].elements.length > 0 &&
      data.rows[0].elements[0].distance
    ) {
      const distance = data.rows[0].elements[0].distance.text;
      setIsDistance(distance);
    } else if (data.status === "ZERO_RESULTS") {
      console.warn("No distance information available between the specified points.");
      setIsDistance(null); 
    } else {
      console.error("Error calculating distance: ", data.status);
    }
  } catch (error) {
    console.error("Error fetching distance data: ", error);
  }
};



 useEffect(() => {
   if (following) {
     const id = setInterval(getLocation, 500);
     return () => clearInterval(id);
    }
    getLocation()
   calculateDistanceMap()
   getTime()
 }, [following]);

 return (
   <View style={styles.container}>
     <MapView
       ref={mapRef}
       style={styles.map}
       customMapStyle={customMapStyle}
       showsUserLocation={true}
       followsUserLocation={true}
       showsBuildings={true}
       showsScale={true}
       loadingEnabled={true}
       pitchEnabled={true} // Enable pitch gestures
       zoomControlEnabled	={true}
       showsTraffic={true}
       addressForCoordinate={true}
       initialRegion={{
        latitude: 37.097689,
        longitude: 9.961015,
        latitudeDelta: 4,
        longitudeDelta: 4,
       }}
     >
       <MapViewDirections
         origin={userLocation}
         destination={destination}
         apikey="AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y"
         strokeWidth={10}
         strokeColor="grey"
         mode={'DRIVING'}
       />
       {userLocation && (
         <Marker.Animated
         ref={markerRef}
         coordinate={userLocation}
         title={String(appointCoords.dotorName)} // Ensure that the title is a string
       >
         <CustomMarker />
       </Marker.Animated>
        //  <Marker.Animated
        //    ref={markerRef}
        //    coordinate={userLocation}
        //    title={appointCoords.dotorName}
        //    // image={require('./path/to/navigate_marker.png')} // Replace with your navigate marker image
        //  /> 
       )}
       <Marker coordinate={destination} title={appointCoords.name} />
     </MapView>
     <View>
     <Animatable.View
      ref={dropdownModeRef}
      style={{
        position: 'absolute',
        top: 150,
        left: displayBtn ? 0 : -290,
        width: 290,
        height: 70,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
  
    </Animatable.View>
    
     <Animatable.View
  ref={dropdownRef}
  style={{
    position: 'absolute',
    bottom: isDropdownVisible ? -20 : -200,
    left: -195,
    width: "100%",
    height: 150,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:30
  }}
>
  <View style={{}}>
     <TouchableOpacity  onPress={() => {stopIteniraire();hideDropdown();showDropdownMode();showButton()}}>
       <Text>STOP</Text>
     </TouchableOpacity>
     </View>
    
     <View>
     <Text>{speed !== undefined ? speed.toFixed(2) : '0'}</Text>
     <Text>Km/h</Text>
     </View>
     <View>
      <Text>{isDistance  ??  '0 Km'}</Text>
     </View>
     <View>
      <Text>{estimatedDuration  ?? '0 min'}</Text>
     </View>

</Animatable.View>
     </View>
     <TouchableOpacity
  style={[styles.button, !displayBtn ? { display: 'none' } : null]}
  onPress={() => { startIteniraire(); showDropdown(); hideDropdownMode();hideDropdownMode();setDisplayBtn(false) }}
>
  <Text style={{color: "white",
                      fontWeight: "bold",
                      fontSize: 18,}}>START</Text>
</TouchableOpacity>

   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 button:{
  width: "40%",
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 80,
  backgroundColor: COLORS.primary,
  position: "absolute",
bottom:25
}
});
const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#c9f2c6", // Land color
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off", // Turn off all icons
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#aadaff", // Turquoise water color
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff", // Grey clair streets color
      },
    ],
  },
];

export default UserMapView;
