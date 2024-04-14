import React, { useEffect, useState ,useRef} from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView
} from "react-native";
import axios from "axios";
import {LogBox} from 'react-native';

const PharmacyMap = ({dataPharmacies}) => {
  LogBox.ignoreAllLogs();

    const[data,setData] = useState([])
    const getPharmacys = async ()=>{
      try {
        const dataPharma = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/pharmaLocationMapped/0/1`)
        setData(dataPharma.data)
          dataPharmacies(dataPharma.data)
        } catch (error) {
          throw new Error(error)
        }
      }
    
    const getPharmacysDN = async (type)=>{
        try {
          const dataPharma = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/getAllDNMapped/0/1/${type}`)
          setData(dataPharma.data)
      
          dataPharmacies(dataPharma.data)

        } catch (error) {
          throw new Error(error)
        }
      }

    

  return (
    <View style={{flexDirection:"column",gap:20,height:300,justifyContent:"center",alignItems:"center"}}>
<View style={{flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
<View style={{width:130,height:60,justifyContent:"center",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5}}>
    <TouchableOpacity onPress={()=>getPharmacys()}>
      <Text style={{fontWeight:"bold",fontSize:16}} >All Pharmacies</Text>  
    </TouchableOpacity>
</View>
<View style={{marginTop:20,width:130,height:60,justifyContent:"space-between",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5,flexDirection:"row",padding:10}}>
    <TouchableOpacity style={{flex:1,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}} onPress={()=>getPharmacysDN("day")}>
      <Text style={{fontWeight:"bold",fontSize:16}}>Day</Text> 
      <View style={{width:40,height:40,borderRadius:100
        // ,shadowOffset:{width:5,height:0},shadowOpacity:0.1,shadowColor:"yellow",shadowRadius:100,elevation:10
        }}>
      <Image style={{width:40,height:40,borderRadius:100}} source={require("../assets/sunC.png")} />  
      </View> 
    </TouchableOpacity>
</View>
<View style={{marginTop:20,width:130,height:60,justifyContent:"space-between",alignItems:"center",borderRadius:15,borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5,flexDirection:"row",padding:10}}>
    <TouchableOpacity  style={{flex:1,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}} onPress={()=>getPharmacysDN("night")}>
      <Text style={{fontWeight:"bold",fontSize:16}} >Night</Text>
    <View style={{width:40,height:40,borderRadius:100}}>
      <Image style={{width:40,height:40,borderRadius:100}} source={require("../assets/moonC.png")}/>  
      </View>
    </TouchableOpacity>
</View>
</View>
    </View>
  )
}

export default PharmacyMap