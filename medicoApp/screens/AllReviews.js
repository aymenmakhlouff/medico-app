import { StyleSheet, Text, View,ImageBackground,ScrollView,Dimensions,TouchableOpacity,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import COLORS from '../constants/colors'
import ReviewCardDoctor from '../components/ReviewCardDoctor'
import { useDispatch, useSelector } from 'react-redux'
import {fetchDocReviews} from '../redux/docReviewSlicer'
import {fetchUserNames} from '../redux/userSlicer'
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationBar from '../components/NavigationBar'
import {LogBox} from 'react-native';


const {width,height}=Dimensions.get('window')
const AllReviews = ({navigation,route}) => {
    const {data} = route.params

    console.log("this is the data",data);
    const dispatch=useDispatch()
    const reviews=useSelector((state)=>state.docRev?.data)
    LogBox.ignoreAllLogs();


    console.log("those are the reviews",reviews)

    const calculateAverage=()=>{
        const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0)
        const averageRating = totalRating / reviews.length | 0
      
        return averageRating.toFixed(1)
      }

    const fetchReviews= ()=>{
        dispatch(fetchDocReviews(data?.id))
    }

    useEffect(() => {
        fetchReviews()
      }, []);
  return (
    <View style={{
        backgroundColor:'white',
    }}>
        <View style={{
            height:height*0.94,
            gap:20
        }}>
    <View style={{
        paddingTop:50,
        paddingLeft:20
    }}>
        <Text style={{
            fontSize:35,
            fontWeight:'bold'
        }}>All Reviews</Text>
    </View>

        
                <View style={{
                    flexGrow:1,
                    height:height*0.47
                }}>
        <ScrollView contentContainerStyle={{
            paddingLeft:20,
            paddingRight:20,
            width:width*1,
            // height:height*2.5,
            alignItems:'center',
            gap:10,
            paddingTop:2,
            paddingBottom:2,
            flexGrow:1
            
        }}>

         {reviews.map((review, index) => (
          <ReviewCardDoctor key={review.id} review={review} />
        ))}   
        </ScrollView>
        </View>
        </View>
        <NavigationBar/>
    </View>
   
  )
}

export default AllReviews

const styles = StyleSheet.create({})