import { StyleSheet, Text, View, Dimensions,TouchableOpacity,TextInput,Image,KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard } from 'react-native'
import React,{useState,useEffect} from 'react'
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBar from '../components/NavigationBar';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createReview } from '../redux/docReviewSlicer';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {LogBox} from 'react-native';




const {width,height} = Dimensions.get('window')

const AddRatings = ({route}) => {
  const [rating,setRating]=useState('')
  const [comment,setComment]=useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [client,setClient]=useState(0)
  LogBox.ignoreAllLogs();

const {data}=route.params

const retrieve = async ()=> {
  const retrieved = await AsyncStorage.getItem("type")
  setClient(JSON.parse(retrieved))
  console.log("retrieved",JSON.parse(retrieved))
}


useEffect(()=>{
  retrieve()
},[])


  const handleReviewAdding = () => {
    const doctorId =data.doctor.id
    const userId =client.id

    const newReview = {
      doctorId,
      userId,
    rating,
      comment:comment,
    };

    console.log('rev',newReview);
    dispatch(createReview(newReview));

    setComment('');
    setRating('')
  };

  return (
    
    <View style={{
        flex:1,
        gap:20,
    }}>
      <View>
              <View style={styles.header}>
            <Text style={styles.pharmaciesText}>Create Review</Text>
            <View style={styles.icons}>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Icon name="bell-o" size={25} color="grey" style={styles.icons} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="cart-outline" size={25} color="grey" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
      
        </View>
      
        <View style={{
            alignItems:'center',
        }}>
        <View style={{
        paddingTop:20,
        display:'flex',
        flexDirection:'column',
        // justifyContent:'center',
        width:width*0.85,
        height:height*0.78,
        shadowColor: "rgba(3, 3, 3, 0.1)",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          backgroundColor: "white",
        //   borderWidth: 3.5,
          borderColor: "white",
          borderRadius:20,
          gap:20,
          elevation: 20,
    shadowColor: 'grey',

        }}>
            <View style={{
                display:"flex",
                flexDirection:'row',
                alignItems:'flex-start',
                justifyContent:'space-around',
                gap:12,

            }}>
            <Image
            source={require('../assets/hero3.jpg')}
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
            }}>{data.doctor.fullname}</Text>

                <Text style={{
                fontSize:12,
                fontWeight:400,
                color:'#8A96BC'
            }}>{data.doctor.type}</Text>
            <View style={{display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'}}>
        <Icon name="star" size={15} color="#FFD700" />
        <Text>3.5</Text>
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

            </View>
            
      <AirbnbRating 
      size={15}
      reviewSize={25}
      // selectedColor={COLORS.primary}
      // reviewColor={COLORS.primary}
      onFinishRating={(value)=>{
        setRating(value)
      }}
      />

      <View 
      style={{
        alignItems:'center',
    gap:20}}
      >

      <TextInput
                style={{
                    height: height*0.42,
                    width:width*0.8,
                    backgroundColor: "white",
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#24262e",
                    justifyContent:'flex-start',
                    borderColor:'black',
                    borderWidth:0.3,

                }}
                placeholder='Add a comment for review...'
              onChangeText={(text)=>{
                setComment(text)
              }}
              
              />
              <Button
  
    title="Create"
    filled
    style={{
      width:width*0.8}}
      onPress={handleReviewAdding}
    />
              </View>
        </View>
        </View>
       
        <NavigationBar/>
    </View>
  )
}

export default AddRatings

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 50,
    },
    pharmaciesText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 20, // Add this line
      },
    icons: {
      flexDirection: 'row',
    },
    iconContainer: {
      borderWidth: 1,
      borderRadius: 50,
      padding: 7,
      marginRight: 10,
      backgroundColor: '#E8E8E8',
      borderColor: '#D3D3D3', // Add this line
    },


});