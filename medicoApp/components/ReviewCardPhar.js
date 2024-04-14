import { StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'
import COLORS from '../constants/colors'
const {width,height}= Dimensions.get('window')
import {LogBox} from 'react-native';

const ReviewCardPhar = ({allReviews}) => {
    LogBox.ignoreAllLogs();

  return (
    <View style={{
        width:width*0.45,
        height:height*0.15,
        backgroundColor:COLORS.white,
        borderRadius:20,
        elevation: 10,
        shadowColor: 'grey',
        display:'flex',     
        flexDirection:'row',
        alignItems:'center',
        padding:15,
        gap:15,
        marginTop:20,
        marginLeft:8,
        marginBottom:8
// justifyContent:'center'
    }}>
        <View style={{
            height:height*0.07,
            justifyContent:'center'
        }}>
        <Image
        source={allReviews.User?.imgUrl?allReviews.User.imgUrl:require('../assets/doctoura.jpg')}
        style={{
            width:width*0.15,
            height:height*0.07,
            borderRadius:100,
            position:'absolute',
            top:-50,
            left:40
        }}
        />
        </View>
        <View style={{
            display:'flex',
            flexDirection:'column',
            gap:10
        }}>
            <View style={{
                display:'flex',
                flexDirection:'row',
                gap:10,
                alignItems:'center'
            }}>
            <Text style={{
                fontSize:20,
                fontWeight:600
            }}>{allReviews.User?.username}</Text>
            
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:5
        }}>
        <Icon name="star" size={15} color="#FFD700" />
        <Text >{allReviews?.rating}</Text>
        </View>
        </View>
        <Text style={{
            fontSize:15,
            fontWeight:500
        }}>
            {allReviews?.review}
        </Text>
      </View>


    </View>
  )
}

export default ReviewCardPhar

const styles = StyleSheet.create({})