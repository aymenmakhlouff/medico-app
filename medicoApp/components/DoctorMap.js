import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView,
} from "react-native";
import axios from "axios";
import {LogBox} from 'react-native';

const DoctorMap = ({dataPharmacies}) => {
  LogBox.ignoreAllLogs();

  const[data,setData] = useState([])
  const[categorys,setCategorys] = useState([])
  const allDocs = async ()=>{
      try {
        const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocationMappedAll/1/0`)
        setData(response.data)
          dataPharmacies(response.data)
        } catch (error) {
          throw new Error(error)
        }
      }

        const filtredDocs = async (type)=>{
          try {
            const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocationMapped/1/0/${type}`)
            setData(response.data)
              dataPharmacies(response.data)
            } catch (error) {
              throw new Error(error)
            }
          }
          const category = async ()=>{
            try {
              const res = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/category/getAll`)
              setCategorys(res.data)
              console.log("===<====>===<====>",res.data);
            } catch (error) {
              throw new Error(error)
            }
          }
          const getByCategory = async (id)=>{
            try {
              const res = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/docLocationMappedAllCategory/1/0/${id}`)
              dataPharmacies(res.data)
            } catch (error) {
              throw new Error(error)
            }
          }
          console.log("===========================>",categorys);
useEffect(()=>{
  category()
},[])

  return (
    <View style={{flexDirection:"column",height:530,width:"100%"}}>
    <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",height:50,paddingTop:20}}>
      <View>
        <TouchableOpacity style={{width:80,height:60,justifyContent:"center",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5}} onPress={() => allDocs()}>
          <Text style={{fontWeight:"bold",fontSize:16}}>All</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{width:80,height:60,justifyContent:"center",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5}} onPress={() => filtredDocs("doctor")}>
          <Text style={{fontWeight:"bold",fontSize:16}}>Doctors</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{width:80,height:60,justifyContent:"center",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5}} onPress={() => filtredDocs("nurse")}>
          <Text style={{fontWeight:"bold",fontSize:16}}>Nurses</Text>
        </TouchableOpacity>
      </View>
    </View>
   <View style={{flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:30,height:850,gap:20,width:"100%"}}>
    <Text style={{fontWeight:"bold",fontSize:20}}>Doctor's Categories</Text>
    {categorys?.map((e)=>(
      <TouchableOpacity onPress={()=>getByCategory(e.id)} style={{width:"80%",height:60,justifyContent:"center",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5}} >
      <Text style={{fontWeight:"bold",fontSize:16}}>{e.name}</Text>
      </TouchableOpacity>
    ))}
      </View>
    </View>
  );
};

export default DoctorMap;
