import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
const {width,height} = Dimensions.get('window')
import {LogBox} from 'react-native';

const PharmacyCardProfile = ({ product }) => {
    LogBox.ignoreAllLogs();

  return (
    <View style={{    flexDirection: 'column',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    gap:19,
    // alignItems: 'center',
    height: height*0.43, // Default height
    width: width*0.45, // Default width
}}>
    <View style={{alignItems:'center'}}>
        <Image source={{ uri: product.imageURL }}
        style={{height:height*0.21,
        width:width*0.4}}/>
        </View>
      <Text
      style={{fontSize:20,
    fontWeight:800}}
      >{product.productName}</Text>
    <View style={{
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-around'
    }}>
        <Text style={{
            width:width*0.10,
            height:height*0.025,
            backgroundColor:'#D3E9F9',
            borderRadius:10,
            textAlign:'center'
        }}>
            20%
        </Text>

        <Text style={{
            width:width*0.2,
            height:height*0.025,
            backgroundColor:'#64CFA6',
            borderRadius:10,
            textAlign:'center'
        }}>
         {product.dosageForm}
        </Text>

    </View>

    <View style={{
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    }}>
        <View style={{display:'flex',
    flexDirection:'column',
    alignItems:'center'}}>
    <Text style={{
        // textDecorationLine: 'line-through',
         textDecorationStyle: 'solid',
         fontSize:17,
         fontWeight:500,
         color:'grey'
    }}
    > {product.strength} </Text>

<Text style={{
         fontSize:20,
         fontWeight:700
    }}
    > {product.price}$ </Text>

</View>

<TouchableOpacity style={{
    width:width*0.15,
    height:height*0.06,
    alignItems:'center',
    justifyContent:'center',
    // paddingRight:10
}}>
          <Image source={require('../assets/add.png')}
          style={{height:height*0.045,
            width:width*0.1,
            borderRadius:12
        
        }}
        />
        </TouchableOpacity>

    </View>

    </View>
    
  )
}

export default PharmacyCardProfile

