import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { idMap, idMapPharma } from "../redux/doctorSlicer";
import { LogBox } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Slider from "@react-native-community/slider";
import haversine from "haversine";
import MapViewDirections from "react-native-maps-directions";
import COLORS from "../constants/colors";
import MarkerProd from "../components/MarkerProd.js";
import SwipeableModal from "../components/SwipeableModal";
// import Config from 'react-native-config'
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
import { BarCodeScanner } from "expo-barcode-scanner";
import DoctorMap from "../components/DoctorMap.js";
import ProductMap from "../components/ProductMap.js";
import PharmacyMap from "../components/PharmacyMap.js";
import markDoctor from "../assets/markDoctor.png";
import markMe from "../assets/markMe.png";
import markMe1 from "../assets/markMe1.png";
import markNurse from "../assets/markNurse.png";
import markPharma from "../assets/markPharma.png";
import markProduct from "../assets/markProduct.png";

const UserMap = () => {
  LogBox.ignoreAllLogs();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [radiusInMeters, setRadiusInMeters] = useState(20000);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [distance, setIsDistance] = useState(null);
  const [isNavigation, setIsNavigation] = useState(false);
  const [duration, setEstimatedDuration] = useState(null);
  const [destination, setDestination] = useState({});
  const [coordinatesData, setCoordnatesData] = useState([]);
  const [mapLocation, setMapLocation] = useState(null);
  const [markerId, setMarkId] = useState(0);
  const [modalFilterSecButton, setModalFilterSecButton] = useState(false);
  const [conditionFilter, setConditionFilter] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [location, setLocation] = useState({
    latitude: 0, // You can replace these with your default values
    longitude: 0,
    latitudeDelta: 0.0922, // Initial values
    longitudeDelta: 0.0421,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 36.89228, // You can replace these with your default values
    longitude: 10.150136,
    latitudeDelta: 5.0922,
    longitudeDelta: 5.0421,
  });
  const [filtred, setFiltred] = useState({});
  //   const mapApiKey = Config.MAP_API
  const [mapFilterData, setMapFilterData] = useState("all");
  const [mapData, setMapData] = useState([]);
  const dropdownRefFilter = useRef(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC", coordinatesData);

  /////////////////////////////////////////////////////////////////////////
  const dataPharmacies = (e) => {
    setCoordnatesData(e);
  };
  const saveidDoc = (e) => {
    dispatch(idMap(e));
  };
  const saveidPharma = (e) => {
    dispatch(idMapPharma(e));
  };

  const getData = async () => {
    if (mapFilterData === "all") {
      try {
        const dataDoc = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocation/1/0`
        );
        const dataPharma = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/pharmaLocation/1/0`
        );
        setMapData([...dataDoc.data, ...dataPharma.data]);
      } catch (error) {
        throw new Error(error);
      }
    }
    if (mapFilterData === "doctor") {
      try {
        const dataDoc = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocation/1/0`
        );
        setMapData(dataDoc.data);
      } catch (error) {
        throw new Error(error);
      }
    }
    if (mapFilterData === "pharmacy") {
      try {
        const dataPharma = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/pharmaLocation/1/0`
        );
        setMapData(dataPharma.data);
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  // const updataLongLat = async (id, body) => {
  //   try {
  //     const response = await axios.put(
  //       `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/updateLongLat/${id}`,
  //       body
  //     );
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    // updataLongLat(1, {
    //   lat: currentLocation.coords.latitude,
    //   lang: currentLocation.coords.longitude,
    // });
    setMapLocation(currentLocation);
    setLocation({
      latitude: currentLocation.coords.latitude, // You can replace these with your default values
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922, // Initial values
      longitudeDelta: 0.0421,
    });
  };

  const getTime = async (desLat, desLong) => {
    if (location && destination) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${mapLocation.coords.latitude},${mapLocation.coords.longitude}&destination=${desLat},${desLong}&key=AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const duration = data.routes[0].legs[0].duration.text;
          setEstimatedDuration(duration);
        } else {
          console.error("Error calculating route: ", data.status);
        }
      } catch (error) {
        console.error("Error fetching route data: ", error);
      }
    }
  };

  const calculateDistanceMap = async (desLat, desLong) => {
    if (location) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${mapLocation.coords.latitude},${mapLocation.coords.longitude}&destinations=${desLat},${desLong}&key=AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const distance = data.rows[0].elements[0].distance.text;
          setIsDistance(distance);
        } else {
          console.error("Error calculating distance: ", data.status);
        }
      } catch (error) {
        console.error("Error fetching distance data: ", error);
      }
    }
  };

  const calculateDistance = (start, end) => {
    return haversine(start, end, { unit: "meter" });
  };
  const doctorsWithinRadius = coordinatesData.filter((doc) => {
    const distance = calculateDistance(location, {
      latitude: doc.latitude,
      longitude: doc.longitude,
    });
    console.log("===============>", distance <= radiusInMeters);
    return distance <= radiusInMeters;
  });

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const showDropdownMode = () => {
    setDropdownVisible(true);
    dropdownRefFilter.current.slideInLeft(900);
  };
  const hideDropdownMode = () => {
    dropdownRefFilter.current.fadeOutLeftBig(900).then(() => {
      setDropdownVisible(false);
    });
  };

  const showMapModal = () => {
    setMapModalVisible(true);
  };

  const hideMapModal = () => {
    setMapModalVisible(false);
  };

  const openModal = () => {
    setModalFilterSecButton(true);
  };

  const closeModal = () => {
    setModalFilterSecButton(false);
  };

  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", coordinatesData);

  console.log("doctorsWithinRadius:", doctorsWithinRadius);

  const CustomMarkerProduct = ({ imageUrl }) => {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/markProduct.png")}
          style={{ width: 60, height: 60, position: "relative" }}
        />
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 11,
            left: 14,
          }}
        />
      </View>
    );
  };
  const CustomMarkerDoctor = () => {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/markDoctor.png")}
          style={{ width: 50, height: 50 }}
        />
      </View>
    );
  };
  const CustomMarkerNurse = () => {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/markNurse.png")}
          style={{ width: 50, height: 50 }}
        />
      </View>
    );
  };
  const CustomMarkerPharma = () => {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/markPharma.png")}
          style={{ width: 50, height: 50 }}
        />
      </View>
    );
  };
  const CustomMarkerFlag = () => {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/palestineFlag.png")}
          style={{ width: 140, height: 70 }}
        />
      </View>
    );
  };
  useEffect(() => {
    getLocation();
    // getData();
    // structureData();
  }, [location]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={customMapStyle}
        followsUserLocation={true}
        showsBuildings={true}
        showsScale={true}
        loadingEnabled={true}
        pitchEnabled={true} // Enable pitch gestures
        zoomControlEnabled={true}
        showsTraffic={true}
        addressForCoordinate={true}
        initialRegion={mapRegion}
      >
        {doctorsWithinRadius.map((doct, i) => (
          <Marker
            key={i}
            title={doct.name}
            opacity={0.9}
            coordinate={doct}
            onPress={() => {
              handleMarkerPress(doct);
              setDestination({
                latitude: doct.latitude,
                longitude: doct.longitude,
                latitudeDelta: 0.0922, // Initial values
                longitudeDelta: 0.0421,
              });
              getTime(doct.latitude, doct.longitude);
              calculateDistanceMap(doct.latitude, doct.longitude);
            }}
          >
            {doct?.type === "doctor" ? (
              <CustomMarkerDoctor />
            ) : doct?.type === "nurse" ? (
              <CustomMarkerNurse />
            ) : doct?.type === "Pharmacy" ? (
              <CustomMarkerPharma />
            ) : doct?.type === "Product" ? (
              <CustomMarkerProduct imageUrl={doct.speciality} />
            ) : (
              require("../assets/markMe1.png")
            )}
          </Marker>
        ))}
        <Marker coordinate={location}>
          <CustomMarkerFlag />
        </Marker>
      </MapView>
      {isNavigation && location && (
        <MapViewDirections
          origin={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          destination={destination}
          apikey="AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y"
          strokeWidth={3}
          strokeColor="blue"
        />
      )}
      <View>
        <TouchableOpacity
          onPress={() => getLocation()}
          style={{ position: "relative", top: -630, left: 170 }}
        >
          <View>
            <MaterialIcons name="my-location" size={40} color="#0bc991" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "relative", top: -630, left: 170 }}
          onPress={() => openModal()}
        >
          <View>
            <AntDesign name="filter" size={40} color="#0bc991" />
          </View>
        </TouchableOpacity>
        {/* <View style={{ flexDirection: "row", gap: 30 }}>
          <TouchableOpacity
            onPress={() => setMapFilterData("doctor")}
            style={{ paddingBottom: 20, fontSize: 50 }}
          >
            <Text>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapFilterData("pharmacy")}
            style={{ paddingBottom: 20, fontSize: 50 }}
          >
            <Text>Pharmacy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapFilterData("nerse")}
            style={{ paddingBottom: 20, fontSize: 50 }}
          >
            <Text>Nerse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapFilterData("all")}
            style={{ paddingBottom: 20, fontSize: 50 }}
          >
            <Text>All</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {/* <Slider
        style={{ width: 300 }}
        minimumValue={1000}
        maximumValue={30000}
        step={1000}
        value={radiusInMeters}
        onValueChange={(value) => setRadiusInMeters(value)}
      /> */}
      {/* <Text>Radius: {radiusInMeters / 1000} Km</Text> */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styling.modalContainer}>
          <View style={styling.modal}>
            <View
              style={{
                height: "65%",
                width: "100%",
                alignItems: "center",
                paddingTop: 10,
                justifyContent: "space-between",
                flexDirection: "column",
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 200,
                }}
              >
                <Image
                  style={{ height: 150, width: 150, borderRadius: 200 }}
                  source={{
                    uri:
                      selectedMarker?.type === "Product"
                        ? selectedMarker?.speciality
                        : selectedMarker?.imageUrl,
                  }}
                />
              </View>
              <View
                style={{
                  height: "25%",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    height: "50%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 27,
                      fontWeight: "bold",
                    }}
                  >
                    {selectedMarker?.type === "Product"
                      ? selectedMarker?.imageUrl
                      : selectedMarker?.name}
                  </Text>
                </View>
                <View
                  style={{
                    height: "50%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 22 }}>
                    {selectedMarker?.adress}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: "20%", flexDirection: "row" }}>
              <View
                style={{
                  height: "100%",
                  width: "55%",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    height: "40%",
                    paddingLeft: 30,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ paddingRight: 13 }}>
                    <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={27}
                      color="#0bc991"
                    />
                  </View>
                  <Text style={{ paddingRight: 5, fontSize: 14 }}>
                    Distance:
                  </Text>
                  <Text fontSize={{ fontSize: 14 }}>{distance}</Text>
                </View>
                <View
                  style={{
                    height: "40%",
                    paddingLeft: 30,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ paddingRight: 13 }}>
                    <MaterialIcons name="timer" size={27} color="#0bc991" />
                  </View>
                  <Text style={{ paddingRight: 28, fontSize: 14 }}>Time:</Text>
                  <Text fontSize={{ fontSize: 14 }}>{duration}</Text>
                </View>
              </View>
              <View
                style={{
                  height: "100%",
                  width: "45%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {selectedMarker?.type === "Product" ||
                selectedMarker?.type === "Pharmacy" ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("PharProfMap");
                      saveidPharma(selectedMarker?.id);
                    }}
                    style={{
                      width: "40%",
                      height: "65%",
                      width: "80%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 80,
                      backgroundColor: COLORS.primary,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 22,
                      }}
                    >
                      Go Profile
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProfileDocStaticMap");
                      saveidDoc(selectedMarker?.id);
                    }}
                    style={{
                      width: "40%",
                      height: "65%",
                      width: "80%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 80,
                      backgroundColor: COLORS.primary,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 22,
                      }}
                    >
                      Go Profile
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                height: "15%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  width: "45%",
                  backgroundColor: "white",
                  height: 50,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#f20404",
                  borderStyle: "solid",
                }}
              >
                <Text
                  style={{
                    color: "#f20404",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalFilterSecButton}
        onRequestClose={closeModal}
      >
        <View style={filterCss.modalContainer}>
          <View style={filterCss.modalContent}>
            {/* <TouchableOpacity ><MaterialCommunityIcons name="barcode-scan" size={24} color="black" /></TouchableOpacity> */}
            <View
              style={{
                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 43,
                  color: "rgba(0, 0, 0, 0.575)",
                }}
              >
                Filter
              </Text>
            </View>
            <View style={{ height: 420, width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  width: "100",
                  justifyContent: "center",
                  height: 105,
                  alignItems: "center",
                }}
              >
                {conditionFilter === "doctor" ? (
                  <TouchableOpacity
                    onPress={() => setConditionFilter("doctor")}
                    style={{
                      backgroundColor: "#09d3a2",
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 5,
                      height: 100,
                      width: 100,
                      borderRadius: 8,
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 70,
                        width: 70,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("../assets/stethoscopeWhite.png")}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 25,
                        width: 90,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        }}
                      >
                        Doctor
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setConditionFilter("doctor")}
                    style={{
                      backgroundColor: "#F5F5F5",
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 5,
                      height: 100,
                      width: 100,
                      borderRadius: 8,
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 70,
                        width: 70,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("../assets/stethoscopeGreen.png")}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 25,
                        width: 90,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                        Doctor
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                {conditionFilter === "pharmacy" ? (
                  <TouchableOpacity
                    onPress={() => setConditionFilter("pharmacy")}
                    style={{
                      backgroundColor: "#09d3a2",
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 5,
                      height: 100,
                      width: 100,
                      borderRadius: 8,
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 70,
                        width: 70,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("../assets/caduceusWhite.png")}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 25,
                        width: 90,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        }}
                      >
                        Pharmacy
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setConditionFilter("pharmacy")}
                    style={{
                      backgroundColor: "#F5F5F5",
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 5,
                      height: 100,
                      width: 100,
                      borderRadius: 8,
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 70,
                        width: 70,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("../assets/caduceusGreen.png")}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 25,
                        width: 90,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                        Pharmacy
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                {conditionFilter === "product" ? (
                  <TouchableOpacity
                    onPress={() => setConditionFilter("product")}
                    style={{
                      backgroundColor: "#09d3a2",
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 5,
                      height: 100,
                      width: 100,
                      borderRadius: 8,
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 70,
                        width: 70,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("../assets/drugWhite.png")}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 25,
                        width: 90,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        }}
                      >
                        Medicines
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setConditionFilter("product")}
                    style={{
                      backgroundColor: "#F5F5F5",
                      shadowOffset: { width: 5, height: 0 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 5,
                      height: 100,
                      width: 100,
                      borderRadius: 8,
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 70,
                        width: 70,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={require("../assets/drugGreen.png")}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 25,
                        width: 90,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                        Medicines
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{ height: 315, width: "100%", paddingTop: 10 }}>
                <ScrollView>
                  {conditionFilter === "doctor" ? (
                    <DoctorMap dataPharmacies={dataPharmacies} />
                  ) : conditionFilter === "pharmacy" ? (
                    <PharmacyMap dataPharmacies={dataPharmacies} />
                  ) : conditionFilter === "product" ? (
                    <ProductMap
                      dataPharmacies={dataPharmacies}
                      closeModal={closeModal}
                      openModal={openModal}
                    />
                  ) : null}
                </ScrollView>
              </View>
            </View>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <Text
                  style={{
                    color: "rgba(0, 0, 0, 0.875)",
                    fontWeight: "thin",
                    fontSize: 20,
                  }}
                >
                  Distance:{" "}
                </Text>
                <Text
                  style={{ color: "#007260", fontWeight: "bold", fontSize: 20 }}
                >
                  {radiusInMeters / 1000} Km
                </Text>
              </View>
              <Slider
                style={{ width: 300 }}
                minimumValue={1000}
                maximumValue={30000}
                step={1000}
                value={radiusInMeters}
                onValueChange={(value) => setRadiusInMeters(value)}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "45%",
                  backgroundColor: "white",
                  height: 45,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#007260",
                  borderStyle: "solid",
                }}
                onPress={closeModal}
              >
                <Text
                  style={{
                    color: "#007260",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Animatable.View
        ref={dropdownRefFilter}
        style={{
          position: "absolute",
          top: 80,
          left: isDropdownVisible ? 0 : -310,
          width: "80%",
          height: "80%",
          backgroundColor: "transparent",
          padding: 10,
          borderRadius: 5,
          elevation: 5,
          justifyContent: "center",
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => hideDropdownMode()}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default UserMap;

const styling = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    height: "60%",
    width: "100%",
    backgroundColor: "#e5f6df",
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flexDirection: "column",
    // backgroundColor:"rgba(0,140,0)"

    // position: "relative",
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    paddingTop: 25,
    paddingBottom: 50,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddf0ee",
    shadowColor: "rgba(3, 3, 3, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalTextContainer: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  specialtyText: {
    fontSize: 16,
    color: "gray",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "blue",
    width: "100%",
  },
  modalButtonText: {
    color: "white",
  },
});

//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    height: 420,
    width: "100%", // Set the desired height for the modal
    backgroundColor: "white",
    padding: 20,

    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 50, // Top-left corner radius
    borderTopRightRadius: 50,
  },
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

const stylesModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    height: "60%", // Adjust the modal height as desired
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20, // Top-left corner radius
    borderTopRightRadius: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  modalHeader: {
    alignItems: "center",
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddf0ee",
    shadowColor: "rgba(3, 3, 3, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "blue", // Customize the button color
  },
  modalButtonText: {
    color: "white", // Customize the button text color
  },
});

const filterCss = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    height: "85%",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
