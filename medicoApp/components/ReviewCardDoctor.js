import { StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
const {width,height}= Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import {LogBox} from 'react-native';

const ReviewCardDoctor = ({review}) => {
    LogBox.ignoreAllLogs();

  return (
    <View style={{
        width:width*0.8,
        height:height*0.12,
        backgroundColor:COLORS.white,
        borderRadius:20,
        elevation: 10,
shadowColor: 'grey',
display:'flex',
flexDirection:'row',
alignItems:'center',
padding:15,
gap:15,
// justifyContent:'center'
    }}>
        <View style={{
            height:height*0.07,
            justifyContent:'center'
        }}>
        <Image
        source={review.User?.imgUrl?review.User.imgUrl:require('../assets/doctoura.jpg')}
        style={{
            width:width*0.19,
            height:height*0.09,
            borderRadius:50,
            // position:'absolute',
            // top:-50,
            // left:95
        }}
        />
        </View>
        {/* <Text>hello</Text> */}
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
            }}>{review.User?.username}</Text>
            
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:5
        }}>
        <Icon name="star" size={15} color="#FFD700" />
        <Text >{review?.rating}</Text>
        </View>
        </View>
        <Text style={{
            fontSize:15,
            fontWeight:500
        }}>
            {review?.review}
        </Text>
      </View>


    </View>
  )
}

export default ReviewCardDoctor

const styles = StyleSheet.create({})