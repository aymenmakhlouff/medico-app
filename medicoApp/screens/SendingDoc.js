import { StyleSheet, Text, View,Image,Dimensions } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { useNavigation } from "@react-navigation/native";
import COLORS from '../constants/colors';
const {width,height}= Dimensions.get('window')
import AnimatedLottieView from "lottie-react-native";
import {LogBox} from 'react-native';

const SendingDoc = () => {
    LogBox.ignoreAllLogs();

    const navigation=useNavigation()
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
                fontSize: 42,
                fontWeight: 800,
                color: COLORS.black,

                }}>Request has been sent !</Text>
                            <Text style={{  
                                padding:20,
                                display:'flex',
                                textAlign:'center',
                                fontSize: 18,
                                fontWeight: 500,
                                color: COLORS.black,

                            }}>Your request to upgrade your account
                            has been sent to the admins successfully.
                            You'll continue as a user until we notify you.</Text>
                            </View>
                    
                    <Image
                        source={require("../assets/success.png")}
                        style={{
                            height: height*0.3,
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
            onPress={() => navigation.navigate("Landing")}
            style={{
                            width: width*0.85,
                            backgroundColor: COLORS.primary,
                            color: COLORS.white
                        }}
                    />

        </View>
  )
}

export default SendingDoc

const styles = StyleSheet.create({})