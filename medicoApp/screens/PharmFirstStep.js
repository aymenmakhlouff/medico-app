import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors';
import Button from '../components/Button';
const { width, height } = Dimensions.get("window");
import {LogBox} from 'react-native';

const PharmFirstStep = ( { navigation , route} ) =>{
    LogBox.ignoreAllLogs();

    console.log('hello');
    const {pharmData} = route.params
    console.log("this is pharmData with navigation",pharmData);
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
    
                    }}>To Pharmacy</Text>
                                <Text style={{  
                                    padding:20,
                                    display:'flex',
                                    textAlign:'center',
                                    fontSize: 18,
                                    fontWeight: 500,
                                    color: COLORS.black,
    
                                }}>Elevate your pharmacy's online presence. 
                                Upgrade to a pharmacy profile to connect with patients and offer a wide range of healthcare services. 
                                Stand out as a trusted healthcare provider..</Text>
                                </View>
                        
                        <Image
                            source={require("../assets/pha.png")}
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
                onPress={() => navigation.navigate("PharmSecoundStep" , {pharmData:pharmData})}
                style={{
                                width: width*0.85,
                                backgroundColor: COLORS.primary,
                                color: COLORS.white
                            }}
                        />
    
            </View>)



}

export default PharmFirstStep