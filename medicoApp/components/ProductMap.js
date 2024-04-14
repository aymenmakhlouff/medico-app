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
import {LogBox} from 'react-native';

import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Serchresult from "./Searchresult.js"
import BarcodeScanne from "./BarcodeScanne.js"
import BarcodeCard from "./BarcodeCard.js"
const ProductMap = ({dataPharmacies}) => {
  LogBox.ignoreAllLogs();

  const [searchByName,setSearchByName] = useState([]) 
  const [inputVal,setInputVal] = useState("") 
  const [inputValBarcode,setInputValBarcode] = useState(0) 
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [changeView, setChangeView] = useState("")
console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN",typeof inputValBarcode);
 
const changeV = (e)=>{
  setChangeView(e)
}

const search = async (val)=>{
    try {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/product/getProductByName/${val}`)
      setSearchByName(response.data)
    } catch (error) {
      throw new Error(error)
    }
  }

  const generateKey = (item) => {
    const pharmacyName = item.Pharmacy ? item.Pharmacy.PHname : 'UnknownPharmacy';
    return `${item.id}${item.productName}${pharmacyName}`;
  };


  const getByName = async (query)=>{
    try {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/product/getProductLike/${query}`)
      dataPharmacies(response.data)
      console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR",response.data);
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(()=>{
    if(inputVal){
      setIsScannerVisible(false);
      changeV("textResult")
      search(inputVal)
    }
  },[inputVal])

  const handleBarCodeScanned = ({ type, data }) => {
    setIsScannerVisible(false);
    setInputValBarcode(data); 
    setChangeView("codeCard")
  };

  const openScanner = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
    setIsScannerVisible(true);
  };

  const earise =()=>{
    setInputVal("")
  }

  return (
    <View>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingLeft:5,paddingRight:5}}>     
                <View style={{width:"70%"}}><TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          paddingLeft: 10,
          width:"100%",
          borderRadius:10
        }}
        placeholder="Type to search..."
        onChangeText={(text) => setInputVal(text)}
        value={inputVal}
      /></View>
      <View>
        <TouchableOpacity onPress={()=>{openScanner();earise();changeV("textScanne")}} >
        <MaterialCommunityIcons name="barcode-scan" size={40} color="#09d3a2" />
        </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems:"center",paddingTop:20}}>
        {/* {searchByName.map((e)=>(
          <TouchableOpacity onPress={()=>getByName(e.productName)} key={generateKey(e)} >
          <Text>{e.productName}</Text>
          </TouchableOpacity>
          
        ))} */}
        {/* <View style={{ flex: 1 }}>
          <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ height:200,width:600 }}
          />
        </View> */}
          <View>
         {changeView === 'textResult' && <Serchresult changeV={setChangeView} searchByName={searchByName} getByName={getByName} generateKey={generateKey} dataPharmacies={dataPharmacies}/>}
         {changeView === 'textScanne' && (
           <BarcodeScanne handleBarCodeScanned={handleBarCodeScanned} isScannerVisible={isScannerVisible} hasCameraPermission={hasCameraPermission} changeV={changeV} earise={earise} dataPharmacies={dataPharmacies}/>
         )}
         {changeView === 'codeCard' && <BarcodeCard inputValBarcode={inputValBarcode} changeV={changeV} dataPharmacies={dataPharmacies}/>}
       </View>
      </View>
      
    </View>
  )
}

export default ProductMap