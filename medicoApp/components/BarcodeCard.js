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

const BarcodeCard = ({dataPharmacies,inputValBarcode}) => {
  LogBox.ignoreAllLogs();

const [dataFetch,setDataFetch] = useState([])

    const getByCodeBarNoDup = async ()=>{
        try {
          const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/product/getCodeBarNoDup/${inputValBarcode}`)
          setDataFetch(response.data)
          console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR",response.data);
        } catch (error) {
          throw new Error(error)
        }
      }

      const getAll = async (code)=>{
        try {
            const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/product/getAllCodeBarNoDup/${code}`)
            dataPharmacies(response.data)
            console.log("=====>====>======>====>",response.data);
        } catch (error) {
            throw new Error(error)
        }
      }

      useEffect(()=>{
        getByCodeBarNoDup()
      },[])

  return (
    <View >
       {dataFetch.map((e)=>(
            <View key={e.codebar} style={{justifyContent:"center",width:220,height:220,alignItems:"center",justifyContent:"center",gap:5,flexDirection:"column"}}>
            <TouchableOpacity onPress={()=>getAll(Number(e.codebar))} style={{height:210,width:250,flexDirection:"column",justifyContent:"ceter",gap:20,alignItems:"center",borderRadius:8,backgroundColor:"#ffffff",shadowOffset:{width:5,height:0},shadowOpacity:0.5,shadowRadius:5,elevation:5}} >
                <View style={{width:100,height:100,borderRadius:100}}>
                    <Image source={{uri:e.imageURL}}  style={{width:100,height:100,borderRadius:100}}/>
                </View>
                <View style={{justifyContent:"center", alignItems:"center",gap:3}}>
                    <Text style={{fontWeight:"bold",fontSize:20,textAlign:"center"}}>{e.productName}</Text>
                    <Text style={{fontWeight:400,fontSize:18,textAlign:"center"}} >{e.codebar}</Text>
                </View>
            </TouchableOpacity>
        </View>
       )) }
    </View>
  )
}

export default BarcodeCard