import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import home from '../assets/home.png'
import lense from '../assets/lense.png'
import store from '../assets/store.png'
import account from '../assets/account.png'
import mapNav from '../assets/mapNav.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Storage } from 'expo-storage'
import { Dimensions } from "react-native";
import userSlicer from '../redux/userSlicer';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get("window");
import {LogBox} from 'react-native';


const NavigationBar = () => {
  LogBox.ignoreAllLogs();

  const navigation = useNavigation()
  const [selectedTab, setSelectedTab] = useState('')
  const [userType, setUserType] = useState('');
  const currentUser= useSelector(state=>state.getUser.data)

  console.log('this is the current user in nav tb',currentUser);


  const handlePress = (route, tabName) => {
    navigation.navigate(route)
    setSelectedTab(tabName)
  }

  const fetchUserType = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("type");
      // const jsonValue = await Storage.getItem({ key: type });

    //  jsonValue != null ? JsonValue) : null;
     console.log("see the type",jsonValue);

      setUserType(jsonValue);
      

    } catch (error) {
      console.error('Error fetching user type', error);
    }
  };

  useEffect(() => {
    fetchUserType();
    }, []);
  const renderIcon = (source, tabName) => (
    <Image source={source} style={[styles.ic, { tintColor: selectedTab === tabName ? '#2d958c' : '#bdbdbd' }]} />
  )

  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.item} onPress={() => handlePress("Landing", "home")}>
        {renderIcon(home, "home")}
        <Text style={selectedTab === "home" ? styles.selectedText : styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress("userMap", "discover")}>
        {renderIcon(mapNav, "discover")}
        <Text style={selectedTab === "discover" ? styles.selectedText : styles.text}  >Discover</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress("AllPharmacies", "stores")}>
        {renderIcon(store, "stores")}
        <Text style={selectedTab === "stores" ? styles.selectedText : styles.text}>Stores</Text>
      </TouchableOpacity>
      {(userType==='doctor' && currentUser?.Doctor?.isverified)&&<TouchableOpacity style={styles.item} onPress={() => handlePress("DocProfileNew", "account")}>
        {renderIcon(account, "account")}
        <Text style={selectedTab === "account" ? styles.selectedText : styles.text}>Account</Text>
      </TouchableOpacity>}
      {(userType==='doctor' && !currentUser?.Doctor?.isverified)&&<TouchableOpacity style={styles.item} onPress={() => handlePress("userProfilePage", "account")}>
        {renderIcon(account, "account")}
        <Text style={selectedTab === "account" ? styles.selectedText : styles.text}>Account</Text>
      </TouchableOpacity>}
      
      {userType!=='doctor'  && userType&& <TouchableOpacity style={styles.item} onPress={() => handlePress("userProfilePage", "account")}>
        {renderIcon(account, "account")}
        <Text style={selectedTab === "account" ? styles.selectedText : styles.text}>Account</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  bar:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:'white',
    borderRadius: width * 0.0125,
    height: height * 0.0875,
    paddingHorizontal: width * 0.0175,
    width: '100%', 
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  ic: {
    paddingLeft: width * 0.0625,
    width: width * 0.0625, 
    height: width * 0.0625, 
  },
  text: {
    fontSize: width * 0.0375,
    marginTop: height * 0.0125,
    color: '#bdbdbd' 
  },
  selectedText: {
    fontSize: width * 0.0375,
    marginTop: height * 0.0125,
    color: '#2d958c'
  }
});

export default NavigationBar;