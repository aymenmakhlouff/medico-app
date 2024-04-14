import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity,Image,TextInput,FlatList,Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import PharmacyCard from '../components/PharmacyCard';
// import NavigationBar from '../components/NavigationBar';
import PharmacyCardProfile from '../components/PharmacyCardProfile';


const {width,height} = Dimensions.get('window')


const BestSellers = () => {
  return (
    <View>
      <Text>BestSellers</Text>
    </View>
  )
}

export default BestSellers

const styles = StyleSheet.create({})