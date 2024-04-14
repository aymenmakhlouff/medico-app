import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get("window");

const DocFirstStep = ( { navigation ,route} ) =>{
    LogBox.ignoreAllLogs();

    console.log('hello');
    // const {data} = route.params
    // console.log("this is data with navigation",data);
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
    
                    }}>To Doctor</Text>
                                <Text style={{  
                                    padding:20,
                                    display:'flex',
                                    textAlign:'center',
                                    fontSize: 18,
                                    fontWeight: 500,
                                    color: COLORS.black,
    
                                }}>Unlock the full potential of your profile! Elevate your status 
                                to a doctor profile and showcase your expertise to patients. 
                                Gain trust and credibility in the medical community.</Text>
                                </View>
                        
                        <Image
                            source={require("../assets/doctor.png")}
                            style={{
                                height: height*0.35,
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
                onPress={() => navigation.navigate("DocSecoundStep")}
                style={{
                                width: width*0.85,
                                backgroundColor: COLORS.primary,
                                color: COLORS.white
                            }}
                        />
    
            </View>)



}

export default DocFirstStep