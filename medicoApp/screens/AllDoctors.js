import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity,Dimensions,Image,TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import COLORS from '../constants/colors'
import lense from '../assets/lense.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width,height} = Dimensions.get('window')
import DoctorCard from '../components/DoctorCard';
import NavigationBar from '../components/NavigationBar';
import { fetchDoctors } from "../redux/doctorSlicer"; // Import fetchDoctors
import { useDispatch, useSelector } from "react-redux";
import { save } from '../redux/doctorSlicer';
import {auth} from '../firebase-config'
import {LogBox} from 'react-native';






const AllDoctors = () => {

  LogBox.ignoreAllLogs();

  const doctors = useSelector((state) => state.doctor?.data);
  console.log("==========================",doctors,"=====");

 
  
  

  console.log(doctors);



  console.log('this is doctor id hello man',doctors);
  const dispatch = useDispatch();

  const handleID=(id)=>{
    dispatch(save(id))
  }
  const fetch3 = () => {
    const userEmail = auth.currentUser.email
    dispatch(fetchDoctors(userEmail)); // Fetch doctors data
  };

  useEffect(() => {
    fetch3(); // Call fetch3 in useEffect
  }, []);

  return (
    <View style={{flex:1,
    gap:15}}>
        <View>
              <View style={styles.header}>
            <Text style={styles.pharmaciesText}>Doctors list</Text>
            <View style={styles.icons}>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Icon name="bell-o" size={25} color="grey" style={styles.icons} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
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
                // onChangeText={text => setSearch(text)}
                // value={search}
            />
        </View>
        </View>

        <ScrollView contentContainerStyle={{
            
            display:'flex',
            alignItems:'center',
            gap:20,
            height:'auto'
            // justifyContent:'center'
            
        }}
        >
           
            {doctors && doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}


           
            
            
        </ScrollView>
                    <NavigationBar/>
    </View>
  )
}

export default AllDoctors

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
        fontSize: 30,
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