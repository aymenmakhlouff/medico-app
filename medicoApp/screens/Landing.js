import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PharmacyCard from "../components/PharmacyCard";
import MedicineCard from "../components/MedicineCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import NavigationBar from "../components/NavigationBar";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPharmacies } from "../redux/pharmacySlicer";
import { fetchMedicines } from "../redux/medecineSlicer";
import DoctorCard from "../components/DrCard";
import { fetchDoctors } from "../redux/doctorSlicer";
import { fetchOrdersByUserId } from "../redux/orderSlicer";
import { auth } from "../firebase-config";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get("window");

const Landing = ({ route }) => {
  LogBox.ignoreAllLogs();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pharmacies = useSelector((state) => state.pharmacy?.data);
  const medicines = useSelector((state) => state.medecine?.data);
  const doctors = useSelector((state) => state.doctor?.data);
  const verifiedDoctors = doctors.filter((doctor) => doctor?.Doctor?.isverified);
  const [clients, setClients] = useState([]);
  const [fetch,setFetch]=useState([]);
  console.log("first");
  const fetch1 = () => {
    dispatch(fetchPharmacies());
  };
  const fetch2 = () => {
    dispatch(fetchMedicines());
  };

  const fetch3 = () => {
    landingEmail=auth.currentUser.email
    dispatch(fetchDoctors(landingEmail));
  };

  const updataLongLat = async (lat,long) => {
    try {
      const email = auth.currentUser.email;
      const response = await axios.put(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/updateLongLat/${email}`,
        {
          latitude:lat,
          longitude:long
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  };



  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    updataLongLat(currentLocation.coords.latitude,currentLocation.coords.longitude);  
    console.log("==========================================",currentLocation.coords.latitude,currentLocation.coords.longitude);
  };


  const getData = async () => {
    try {
      const email = auth.currentUser.email;
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/fetchLanding/${email}`
      );
      setFetch(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
      throw new Error(error);
    }
  };


  useEffect(() => {
    getData(),
    fetch1();
    fetch2();
    fetch3();
    getLocation()
  }, []);

  let topRatedPharmacies = [];

  if (pharmacies) {
    topRatedPharmacies = pharmacies.filter(
      (pharmacy) => pharmacy.rating >= 4.5
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.userName}>{fetch.username || fetch.fullname || fetch.PHname}</Text>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("orderDetails")}
            >
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
        <View style={styles.secondOrdersContainer}>
          <Text style={styles.ordersText}>Pharmacies near you</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FlatList
            data={pharmacies}
            renderItem={({ item }) => <PharmacyCard pharmacy={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
        </View>

        <View style={styles.secondOrdersContainer}>
          <Text style={styles.ordersText}>Top Rated Pharmacies</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FlatList
            data={topRatedPharmacies}
            renderItem={({ item }) => <PharmacyCard pharmacy={item}/>}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
        </View>
        <View style={styles.secondOrdersContainer}>
          <Text style={styles.ordersText}>Medicines</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("AllMedicines", { medicines: medicines })
            }
          >
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FlatList
            data={medicines}
            renderItem={({ item }) => <MedicineCard medecine={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <View style={styles.secondOrdersContainer}>
          <Text style={styles.ordersText}>Doctors</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AllDoctors");
            }}
          >
            <Text style={styles.buttonText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FlatList
            data={verifiedDoctors}
            renderItem={({ item }) => <DoctorCard doctor={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.02,
  },
  greeting: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.06,
  },
  helloText: {
    fontSize: width * 0.05,
  },
  userName: {
    fontWeight: "bold",
    fontSize: width * 0.09,
  },
  icons: {
    flexDirection: "row",
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: width * 0.13,
    padding: width * 0.02,
    marginRight: width * 0.03,
    backgroundColor: "#E8E8E8",
    borderColor: "#D3D3D3",
  },
  ordersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.07,
  },
  secondOrdersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.05,
  },
  ordersText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ddf0ee",
    borderRadius: width * 0.05,
    paddingVertical: height * 0.004,
    paddingHorizontal: width * 0.03,
  },
  buttonText: {
    color: "#2d958c",
    fontSize: width * 0.037,
  },
});

export default Landing;
