import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity,Image,TextInput,FlatList,Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import PharmacyCard from '../components/PharmacyCard';
// import NavigationBar from '../components/NavigationBar';
import PharmacyCardProfile from '../components/PharmacyCardProfile';
import {LogBox} from 'react-native';


const {width,height} = Dimensions.get('window')



const Promotions = () => {
  LogBox.ignoreAllLogs();

  return (
    <View>
      <Text>Promotions</Text>
    </View>
  )
}

export default Promotions

const styles = StyleSheet.create({})