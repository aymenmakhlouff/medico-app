import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
// import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {LogBox} from 'react-native';

// import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get("window");

const FirstStep = ( { navigation } ) =>{
    LogBox.ignoreAllLogs();

        return (
        <View style={{ flex : 1,
        height:height*0.5,
        width:width*1,
        justifyContent:"center",
        alignItems:"center",
        gap:80
        }}>
        <View style={{alignItems:'center',
        display:"flex",
        justifyContent:"center",
        gap:30
        }}>
        
            <View>
            <Text style={{

                display:'flex',
                textAlign:'center',
                fontSize: 40,
                fontWeight: 800,
                color: COLORS.black,

                }}>Find Medicines</Text>
                            <Text style={{  
                                padding:20,
                                display:'flex',
                                textAlign:'center',
                                fontSize: 18,
                                fontWeight: 500,
                                color: COLORS.black,

                            }}>Easily find your prescribed medicines
                            from a variety of registered pharmacies, no matter
                            where you are. </Text>
                            </View>
                    
                    <Image
                        source={require("../assets/firststep.png")}
                        style={{
                            height: height*0.35,
                            width: width*0.7,
                            borderRadius: 10,
                        }}
                    />

            </View>
            <Button
              titleStyle={{
                color: "#FFFFFF"
             }}
            title="Continue"
            filled
            onPress={() => navigation.navigate("SecondStep")}
            style={{
                            width: width*0.85,
                            backgroundColor: COLORS.primary,
                            color: COLORS.white
                        }}
                    />

        </View>)



}

export default FirstStep