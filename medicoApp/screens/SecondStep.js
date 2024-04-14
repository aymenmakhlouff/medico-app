import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
// import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';
// import LottieView from 'lottie-react-native';
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get("window");

const SecondStep = ( { navigation } ) =>{
    LogBox.ignoreAllLogs();

    console.log('hello');
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
    
                    }}>Select Pharmacy</Text>
                                <Text style={{  
                                    padding:20,
                                    display:'flex',
                                    textAlign:'center',
                                    fontSize: 18,
                                    fontWeight: 500,
                                    color: COLORS.black,
    
                                }}>Pick the pharmacy that suits you best.
                                We've got trusted options and reliable options
                                in our network.</Text>
                                </View>
                        
                        <Image
                            source={require("../assets/secondstep.png")}
                            style={{
                                height: height*0.35,
                            width: width*0.7,
                                // borderRadius: 10,
                            }}
                        />
    
                </View>
                <Button
                  titleStyle={{
                    color: "#FFFFFF"
                 }}
                title="Continue"
                filled
                onPress={() => navigation.navigate("ThirdStep")}
                style={{
                                width: width*0.85,
                                backgroundColor: COLORS.primary,
                                color: COLORS.white
                            }}
                        />
    
            </View>)



}

export default SecondStep