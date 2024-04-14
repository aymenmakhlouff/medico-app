import { StyleSheet, Text, View,Dimensions, Image,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get("window");
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import {LogBox} from 'react-native';

const ProfileApp = ({route}) => {
    const navigation=useNavigation()
    // const user=route.params.userInfo
    LogBox.ignoreAllLogs();

  return (
    <ScrollView  style={{marginTop:30}}
    >
        <View style={{alignItems:'center',
    gap:40,
    height:height*1}}>
        <View style={{alignItems:'center',
        width:width*1,
        height:height*0.08,
        borderRadius:10,
        justifyContent:'center',
        gap:15,
        
    }}>
        <Text style={{fontSize:30,
        fontWeight:600}}>My Profile</Text>
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: COLORS.grey,
        opacity:0.3}} />
        </View>



        </View>
        <View style={{display:'flex',
        alignItems:'center',
        gap:20}}>
            <Image
            source={require('../assets/hero3.jpg')}
            style={{
                width:width*0.4,
                height:height*0.2,
                borderRadius:120
            }}/>
            <Text style={{fontSize:27,
        fontWeight:700}}>Hakim Ksiksi</Text>
        </View>
        <View style={{
            gap:15
        }}>
            <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'space-between',
                backgroundColor:COLORS.white,
                paddingLeft:15,
                paddingEnd:15,
                flexDirection:'row',
                height:height*0.07,
                width:width*0.8,
                borderRadius:25,
                elevation: 6,
                shadowColor: '#000',
                
            }}
            
            >
                <Text style={{
                    fontSize:20,
                    fontWeight:500
                }}>Appointments</Text>
                <AntDesign name="right" size={24} color={COLORS.primary} />
            </TouchableOpacity>


            <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'space-between',
                backgroundColor:COLORS.white,
                paddingLeft:15,
                paddingEnd:15,
                flexDirection:'row',
                height:height*0.07,
                width:width*0.8,
                borderRadius:25,
                elevation: 6,
                shadowColor: '#000',
                
            }}
            
            >
                <Text style={{
                    fontSize:20,
                    fontWeight:500
                }}>Messages</Text>
                <AntDesign name="right" size={24} color={COLORS.primary} />
            </TouchableOpacity>




            <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'space-between',
                backgroundColor:COLORS.white,
                paddingLeft:15,
                paddingEnd:15,
                flexDirection:'row',
                height:height*0.07,
                width:width*0.8,
                borderRadius:25,
                elevation: 6,
                shadowColor: '#000',
            }}
            
            >
                <Text style={{
                    fontSize:20,
                    fontWeight:500,
                }}>Notifications</Text>
                <AntDesign name="right" size={24} color={COLORS.primary} />
            </TouchableOpacity>


            <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'space-between',
                backgroundColor:COLORS.white,
                paddingLeft:15,
                paddingEnd:15,
                flexDirection:'row',
                height:height*0.07,
                width:width*0.8,
                borderRadius:25,
                elevation: 6,
                shadowColor: '#000',
                
            }}
            
            >
                <Text style={{
                    fontSize:20,
                    fontWeight:500
                }}>Payment Details</Text>
                <AntDesign name="right" size={24} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 0.8, height: 1, backgroundColor: COLORS.grey}} />
</View>
<TouchableOpacity
            onPress={()=>navigation.navigate('Settings')}
            style={{
                alignItems:'center',
                justifyContent:'space-between',
                backgroundColor:COLORS.white,
                paddingLeft:15,
                paddingEnd:15,
                flexDirection:'row',
                height:height*0.07,
                width:width*0.8,
                borderRadius:25,
                elevation: 6,
                shadowColor: '#000',
                
            }}
            
            >
                <Text style={{
                    fontSize:20,
                    fontWeight:500
                }}>Settings</Text>
                <AntDesign name="right" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            </View>
    </ScrollView >
  )
}

export default ProfileApp

