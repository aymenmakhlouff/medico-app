import { View, Text, Pressable, Image, Dimensions,SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
// import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {LogBox} from 'react-native';

// import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get("window");

const Home = ( {navigation} ) => {
    LogBox.ignoreAllLogs();

    return (
        <SafeAreaView style={{flex:1,
        paddingTop:40,
        alignItems:'center'}}>
            <ScrollView style={{
                gap:20
            }}>
                <View style={{gap:20}}>
            <View style={{
                width:width*1,
                alignItems:"center",
                gap:20
            }}>
                <Text
                style={{fontSize:40,
                fontWeight:600}}>
                    Welcome, Mr. Fedi !
                    </Text>
                    <View style={{
                        backgroundColor:COLORS.grey,
                        borderRadius:20,
                        padding:10,
                        gap:10
                    }}>
                        <View style={{backgroundColor:COLORS.white,
                        width:width*0.85,
                        height:height*0.2,
                        borderRadius:20,
                        justifyContent:'center',
                        alignItems:'center'}}>
                    <Image 
                    source={require('../assets/nursing_tools-_new_grads.jpg')}
                    style={{borderRadius:20,
                    height:height*0.17,
                    width:width*0.4}}/>
                    
                    </View>
                    <Text 
                    style={{fontSize:25,
                    fontWeight:600}}>
                    Receive Appointment
                    </Text>

                    <View 
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        gap:20
                    }}>
                        <View>
                     <Text 
                    style={{fontSize:20,
                    fontWeight:600}}>
                    Stay updated
                    </Text>

                    <Text 
                    style={{fontSize:20,
                    fontWeight:400}}>
                    Never miss an appointment
                    </Text>

                    </View>
                    <Button
                    title='View Map'
                    style={{
                        color:COLORS.grey,
                        borderColor:COLORS.grey,
                        backgroundColor:COLORS.white,

                    }}/>
                    </View>

                    </View>
            </View>
            <View style={{
                width:width*1,
                 gap:20,
                backgroundColor:COLORS.grey,
                borderTopEndRadius:20,
                borderTopStartRadius:20
            }}>
                <Text
                style={{fontSize:22,
                fontWeight:600,
                padding:20,
                }}>
                    Connect with nurses and doctors
                    </Text>



                </View> 
                </View>   
            </ScrollView>
        </SafeAreaView>
    )
}



export default Home