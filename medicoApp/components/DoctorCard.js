import { StyleSheet, Text, View,Image,TouchableOpacity,Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/colors'
const {width,height}= Dimensions.get('window')
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { save } from '../redux/doctorSlicer';
// import { useFocusEffect } from '@react-navigation/native';
import {LogBox} from 'react-native';



const DoctorCard = ({doctor}) => {
    LogBox.ignoreAllLogs();


    console.log('this is doctor in the card',doctor);


  const navigation = useNavigation();
const dispatch = useDispatch()


const handleID=()=>{
    dispatch(save(doctor.DoctorId))
  }

  return (

    <View style={{
        // padding:11,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        width:width*0.85,
        height:height*0.2,
        shadowColor: "rgba(3, 3, 3, 0.1)",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          backgroundColor: "white",
        //   borderWidth: 3.5,
          borderColor: "white",
          borderRadius:20,
          gap:10,
          elevation: 20,
        shadowColor: 'grey',
        }}>
            {doctor.DoctorId&&
                <View style={{
                display:"flex",
                flexDirection:'row',
                alignItems:'flex-start',
                justifyContent:'space-around',
                gap:12,

            }}>
            <Image
            source={{ uri: doctor?.Doctor?.imageUrl }}
            style={{width: width*0.2,
                height: height*0.09,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#EAEAEA",}}
            />
            <View style={{
                display:'flex',
                flexDirection:'column',
                gap:5
            }}>
            <Text style={{
                fontSize:20,
                fontWeight:600
            }}>Dr. {doctor?.Doctor.fullname}</Text>

                <Text style={{
                fontSize:12,
                fontWeight:400,
                color:'#8A96BC'
            }}>{doctor?.type}</Text>
            <View style={{display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'}}>
        <Icon name="star" size={15} color="#FFD700" />
        <Text>{(doctor?.Doctor.rating).toFixed(1)}</Text>


        
      </View>
            </View>
            <TouchableOpacity
            style={{
                // backgroundColor:COLORS.primary,
            width:width*0.1,
            height:height*0.05,
            borderRadius:200,
            alignItems:'center',
            justifyContent:'center'
            }}>
                <Image
                source={require('../assets/menu.png')}
                style={{
                    width:width*0.08,
                    height:height*0.03
                }}
                />
            </TouchableOpacity>

            </View> }

            {doctor.DoctorId&&
                <View style={{display:'flex',
        flexDirection:'row',
        // alignItems:'center',
        width:width*1,
        alignItems:'flex-end',
        transform: [
            { translateX: 0 },
            { translateY: 20 },
            
        ],
        
    }}>
                <TouchableOpacity style={{
                    width:width*0.425,
                    backgroundColor:COLORS.primary,
                    height:height*0.06,
                    justifyContent:'center',
                    alignItems:'center',
                    borderBottomLeftRadius:20,
                }}
                onPress={()=>navigation.navigate('ProfileDocStatic',{data:doctor})}>
                    <Text
                    style={{
                        color:COLORS.white,
                        fontWeight:700
                    }}
                    >Visit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width:width*0.425,
                    backgroundColor:'#F7F8F8',
                    height:height*0.06,
                    justifyContent:'center',
                    alignItems:'center',
                    display:'flex',
                    flexDirection:'row',
                    gap:10,
                    borderBottomRightRadius:20
                }}
                
                    onPress={()=>{handleID();navigation.navigate('appointmentClient')}}
                >
                <Image
                source={require('../assets/book.png')}
                style={{
                    width:width*0.045,
                    height:height*0.025
                }}
                />
                <Text  style={{
                    color:'#5F6277',
                    fontWeight:700
                }}>Book Appointment</Text>
                </TouchableOpacity>
            </View>}
           
        </View>
  )
}

export default DoctorCard
