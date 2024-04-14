import React, { useState, useEffect } from 'react';
import { View, Text,Image, StyleSheet, TouchableOpacity,  ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PharmacyCard from '../components/PharmacyCard2';
import lense from '../assets/lense.png'
import MedicineCard from '../components/MedicineCard'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { fetchPharmacies } from "../redux/pharmacySlicer";
import {LogBox} from 'react-native';


const AllPharmacies = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pharmacies = useSelector((state) => state.pharmacy?.data);
  
  LogBox.ignoreAllLogs();

  const fetch1 = () => {
    dispatch(fetchPharmacies());
  };
  

  useEffect(() => {
    fetch1();
  }, []);
  
  const [search, setSearch] = useState('');
    const [filteredPharmacies, setFilteredPharmacies] = useState([]);

    useEffect(() => {
        setFilteredPharmacies(
            pharmacies.filter((pharmacy) =>
                pharmacy.PHname.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.header}>
            <Text style={styles.pharmaciesText}>Pharmacies</Text>
            <View style={styles.icons}>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Icon name="bell-o" size={25} color="grey" style={styles.icon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('orderDetails')}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="cart-outline" size={25} color="grey" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.searchContainer}>
            <Image source={lense} style={styles.searchIcon} />
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                onChangeText={text => setSearch(text)}
                value={search}
            />
        </View>
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {filteredPharmacies.map((pharmacy, index) => (
    <PharmacyCard key={index} pharmacy={pharmacy} />
))}
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
        <NavigationBar />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 50,
    },
    pharmaciesText: {
        fontWeight: 'bold',
        fontSize: 35,
        marginLeft: 20, // Add this line
      },
    icons: {
      flexDirection: 'row',
    },
    iconContainer: {
      borderWidth: 1,
      borderRadius: 50,
      padding: 7,
      marginRight: 10,
      backgroundColor: '#E8E8E8',
      borderColor: '#D3D3D3', // Add this line
    },
  ordersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 55,
  },
  secondOrdersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40, // Adjust this value as needed
  },
  ordersText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#ddf0ee',
    borderRadius: 20,
    paddingVertical: 3.5,
    paddingHorizontal: 13,
  
    
  },
  buttonText: {
    color: '#2d958c',
    fontSize: 15,
  },
  card: {
    borderRadius: 30,
    padding: 19,
    backgroundColor: '#f8f8f8',
    marginTop: 30,
    marginHorizontal: 10,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    marginTop: 40, // Increase this value
    marginLeft: 30,
    marginRight: 30,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10, // Reduce this value
  },
});

export default AllPharmacies;