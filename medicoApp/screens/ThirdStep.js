import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
// import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {LogBox} from 'react-native';

// import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get("window");

const ThirdStep = ( { navigation } ) =>{
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
                    fontSize: 45,
                    fontWeight: 800,
                    color: COLORS.black,
    
                    }}>Pharmacy Management</Text>
                                <Text style={{  
                                    padding:20,
                                    display:'flex',
                                    textAlign:'center',
                                    fontSize: 18,
                                    fontWeight: 500,
                                    color: COLORS.black,
    
                                }}>Easily manage orders and maintain an organized, top-notch
                                service for customers, update drug details manually or through
                                file uploads for an up-to-date catalog.</Text>
                                </View>
                        
                        <Image
                            source={require("../assets/step3.png")}
                            style={{
                                height: height*0.25,
                                width: width*0.7,
                            }}
                        />
    
                </View>
                <Button
                  titleStyle={{
                    color: "#FFFFFF"
                 }}
                title="Continue"
                filled
                onPress={() => navigation.navigate("Welcome")}
                style={{
                                width: width*0.85,
                                backgroundColor: COLORS.primary,
                                color: COLORS.white
                            }}
                        />
    
            </View>)



}

export default ThirdStep