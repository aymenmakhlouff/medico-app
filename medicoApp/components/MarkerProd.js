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
import {LogBox} from 'react-native';

const MarkerProd = ({prodImg}) => {
  LogBox.ignoreAllLogs();

  return (
    <View style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
      <Image source={require('../assets/markProduct.png')} style={{ width: 50, height: 50 ,position:"relative"}} />
      <Image source={{uri : prodImg}} style={{ top:367,width: 40, height: 40 ,position:"absolute"}} />
    </View>
  )
}

export default MarkerProd