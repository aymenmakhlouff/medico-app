// AllMedicines.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NavigationBar from "../components/NavigationBar";
import { useNavigation } from "@react-navigation/native";
import MedicineCard from "../components/MedicineCard";
import lense from "../assets/lense.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch } from 'react-redux';
import { fetchMedicineByCodebar } from '../redux/medecineSlicer';
import { Dimensions } from 'react-native';
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get('window');

const AllMedicines = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { medicines } = route.params;

  const [search, setSearch] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [barcodeSearch, setBarcodeSearch] = useState("");
  LogBox.ignoreAllLogs();


  useEffect(() => {
    setFilteredMedicines(
      medicines.filter((medicine) =>
        medicine.productName.toLowerCase().includes(search.toLowerCase()) ||
        medicine.codebar.toString().includes(search)
      )
    );
  }, [search]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsScannerVisible(false);
    setSearch(data); // Set the search state to the scanned data
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.medicinesText}>Medicines</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Icon name="bell-o" size={25} color="grey" style={styles.icon} />
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
      <View style={styles.searchContainer}>
        <Image source={lense} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
          defaultValue={barcodeSearch}
        />
        <MaterialIcons
  name="qr-code"
  size={25}
  color="grey"
  style={styles.qrCodeIcon}
  onPress={() => setIsScannerVisible(true)}
/>
      </View>
      {isScannerVisible && (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
      )}
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {filteredMedicines.map((medecine, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              onPress={() =>
                navigation.navigate("MedicineDetails", { medicine: medecine })
              }
            >
              <MedicineCard medecine={medecine} />
            </TouchableOpacity>
          ))}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.05,
  },
  medicinesText: {
    fontWeight: "bold",
    fontSize: width * 0.09,
    marginLeft: width * 0.05,
  },
  icons: {
    flexDirection: "row",
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    padding: width * 0.02,
    marginRight: width * 0.03,
    backgroundColor: "#E8E8E8",
    borderColor: "#D3D3D3",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    marginTop: height * 0.04,
    marginLeft: width * 0.08,
    marginRight: width * 0.08,
  },
  searchIcon: {
    width: width * 0.05,
    height: height * 0.03,
    marginLeft: width * 0.03,
  },
  searchBar: {
    flex: 1,
    padding: width * 0.03,
  },
  qrCodeIcon: {
    paddingRight: width * 0.03,
  },
});

export default AllMedicines;
