import React, { useEffect, useState ,useRef} from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView,
  TextInput
} from "react-native";
import axios from 'axios';
import {LogBox} from 'react-native';


const Searchresult = ({searchByName,generateKey,getByName,dataPharmacies}) => {
  LogBox.ignoreAllLogs();


    const getByNames = async (query)=>{
        try {
          const getAll = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/product/getProductLike/${query}`)
            dataPharmacies(getAll.data)
          } catch (error) {
            throw new Error(error)
          }
        }

  return (
    <View>
      <View  style={{gap:5,width:300,height:10000,alignItems:"center",justifyContent:"flex-start"}}  >
         {searchByName.map((e)=>(
          <TouchableOpacity  onPress={()=>getByName(e.productName)} key={generateKey(e)} style={{backgroundColor:"#ffffff",shadowOpacity:0.5,elevation:5,width:"100%",height:60,flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingLeft:15,paddingRight:15,borderRadius:15,paddingBottom:5,paddingTop:5}} >
          <Text style={{fontWeight:"bold",fontSize:22}} >{e.productName}</Text>
          <View style={{width:50,height:50,borderRadius:100}} >
            <Image style={{width:50,height:50,borderRadius:100}} source={{uri:e.imageURL}}/>
          </View>
          </TouchableOpacity>
          
          ))} 
          </View>
    </View>
  )
}

export default Searchresult