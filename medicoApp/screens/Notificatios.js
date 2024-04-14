import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
// import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';
// import LottieView from 'lottie-react-native';
import {LogBox} from 'react-native';



const { width, height } = Dimensions.get("window");
const Notificatios = () => {
  LogBox.ignoreAllLogs();

  return (
    <div>Notificatios</div>
  )
}

export default Notificatios