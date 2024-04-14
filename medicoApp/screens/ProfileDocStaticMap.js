import { StyleSheet, Text, View,Modal,ScrollView,TextInput,TouchableOpacity,Dimensions,ImageBackground,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import COLORS from '../constants/colors'
const {width,height}= Dimensions.get('window')
import { AirbnbRating } from 'react-native-ratings';
import { createReview,fetchDocReviews } from '../redux/docReviewSlicer';
import { useDispatch, useSelector } from 'react-redux'
import ReviewCardDoctor from '../components/ReviewCardDoctor'
import NavigationBar from '../components/NavigationBar'
import { auth } from '../firebase-config'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import haversine from 'haversine';
import {LogBox} from 'react-native';




const ProfileDocStaticMap = () => {
  LogBox.ignoreAllLogs();


    const idDoc = useSelector((state) => state.doctor?.idDocMap);



    
    const navigation=useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const [rating,setRating]=useState('')
    const [comment,setComment]=useState('')
    const [isDistance,setIsDistance]=useState(0)
    const [data,setData] = useState([])
    
    

const fetchData = async ()=>{
  try {
    const res = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/getOneWithId/${idDoc}`)
    setData(res.data)
  } catch (error) {
    throw new Error (error)
  }
}


const reviews=useSelector((state)=>state.docRev.data)



  const dispatch=useDispatch()


  const fetchReviews= ()=>{
    dispatch(fetchDocReviews(data.DoctorId))
}


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const calculateDistanceMap=async()=>{
    try {
      const loggedMail=auth.currentUser.email
        
       const loggedUser = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/getOne/${loggedMail}`)
       
       const start = {
         latitude: loggedUser.data.latitude,
         longitude: loggedUser.data.longitude
        }
        
        const end = {
          latitude: data?.Doctor?.latitude,
          longitude: data?.Doctor?.longitude
        }
        console.log(start,end,'this is distance between pharmacy');

      setIsDistance((haversine(start, end)))

      
    } catch (error) {
      
    }
  }



 

  const handleReviewAdding = () => {
    console.log("this is the review",comment);
    const doctorId =data?.DoctorId
    let email = auth.currentUser.email
  
    const newReview = {
      doctorId,
      email,
    rating,
      comment

    };
  
    console.log('rev',newReview);
    dispatch(createReview(newReview));
    fetchReviews()
    
    setComment('');
    setRating('')
    setModalVisible(!isModalVisible);

  };
  const saveidDoc = (e)=>{
    dispatch(idMap(e))
  }

  useEffect(() => {
    fetchData()
    calculateDistanceMap()
    fetchReviews()
  }, []);
  
  
  

  return (
    <View style={{
        display:'flex',
        flexDirection:'column',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        gap:9
    }}>
  
  <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={{
                    fontSize:20,
                    fontWeight:600
                  }}>
                    Rate Your Doctor
                  </Text>
                  <AirbnbRating
          size={15}
          reviewSize={25}
          onFinishRating={(value)=>{
            setRating(value)
          }}
          // Additional props like selectedColor and reviewColor can be added here
        />
                        <View style={{
                          alignItems:'center',
                          gap:20
                        }}>
                          <View style={{
                            flexDirection:'row',
                            width:width*0.8,
                            alignItems:'center',
                            justifyContent:"center",
                            gap:10
                          }}>
                        <TextInput
                style={{
                  height: height*0.05,
                  width:width*0.6,
                  backgroundColor: "#fff",
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#24262e",
                  borderWidth:1
                }}
                value={comment}
                placeholder='type here...'
                onChangeText={(text)=>{
                    setComment(text)
                }}
                
              />
              <TouchableOpacity
            style={{
                backgroundColor:COLORS.primary,
            width:width*0.1,
            height:height*0.05,
            borderRadius:200,
            alignItems:'center',
            justifyContent:'center'
            }}
           
            onPress={(e)=> handleReviewAdding(e)}
            
            >
              
                <Image
                source={require('../assets/send.png')}
                style={{
                    width:width*0.05,
                    height:height*0.02
                }}
                />
            </TouchableOpacity>
            </View>
                  <TouchableOpacity
                    
                    style={{
                      backgroundColor:COLORS.primary,
                      width:width*0.2,
                      height:height*0.05,
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:20
                    }}
                    onPress={toggleModal}
                  >
                    <Text style={{
                      color:COLORS.white
                    }}>Close</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
  
  
  
  
  
        <View style={{
            width:width*1,
            height:height*0.48
        }}>
        <ImageBackground
        source={{ uri: data?.Doctor?.imageUrl }}
        resizeMode="cover"
        style={{width:width*1,
            height:height*0.37,
            flex: 1,
            justifyContent: 'flex-start',
            padding:30
        
        
        
        }}
        >
            <View style={{
                display:"flex",
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
            <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        width: width * 0.1,
        height: height * 0.05,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => navigation.goBack()}
    >
      <Image
        source={require('../assets/arrowback.png')}
        style={{
          width: width * 0.07,
          height: height * 0.02,
        }}
      />
    </TouchableOpacity>
  
            <TouchableOpacity
            style={{
                backgroundColor:COLORS.white,
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
            <View
            style={{
                width:width*0.9,
                height:height*0.15,
                backgroundColor:COLORS.white,
                position:'absolute',
                top:230,
                left:20,
                borderRadius:20,
                elevation: 10,
                justifyContent:'space-between',
    shadowColor: 'grey',
    display:'flex',
    flexDirection:'row'
            }}
            >
                <View 
                style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:20
                }}
                >
                    <View style={{
                        paddingTop:12,
                        paddingLeft:27
                    }}>
                    <Text style={{
                        fontSize:20,
                        fontWeight:600
                    }}>Dr. {data?.Doctor?.fullname}</Text>
                    {/* <Text style={{
                        fontSize:15,
                        fontWeight:400,
                        color:COLORS.grey
                    }}>Doctor Speciality</Text> */}
                    </View>
  
                    <View style={{
                        display:'flex',
                        flexDirection:'row'
                    }}>
                        <View style={{
                            paddingLeft:20,
                            display:"flex",
                            flexDirection:'row',
                            alignItems:'center',
                            gap:10
                        }}>
                            <Image 
                            source={require('../assets/approved.png')}
                            style={{width:width*0.065,
                            height:height*0.031}}
                            />
                            <Text style={{
                                fontWeight:600
                            }}>{data?.Doctor?.type}</Text>
                        </View>
                        <View style={{
                            paddingLeft:20,
                            display:"flex",
                            flexDirection:'row',
                            alignItems:'center',
                            gap:10
                        }}>
                            <Image 
                            source={require('../assets/gps.png')}
                            style={{width:width*0.062,
                            height:height*0.030}}
                            />
                            <Text style={{
                                fontWeight:600
                            }}>{isDistance.toFixed(1)} Km</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={{
                    display:'flex',
                    flexDirection:'column',
                    padding:20,
                    alignItems:'center',
                    gap:12
                }}>
                    <View style={{
                        backgroundColor:COLORS.primary,
                        width:width*0.15,
                        alignItems:'center', 
                        justifyContent:'center',
                        height:height*0.07,
                        borderRadius:20
                    }}>
                        <Text style={{
                            color:COLORS.white,
                            fontSize:20,
                            fontWeight:600
                        }}>{(data?.Doctor?.rating || 0).toFixed(1)}</Text>
                    </View>
                    <Text style={{
                        color:COLORS.grey,
                        fontWeight:600
                    }}>{reviews.length} Reviews</Text> 
                    


                </View>
  
  
            </View>
            
  
  
  
  
        </ImageBackground>
  
        </View>
  
        <ScrollView contentContainerStyle={{
            paddingLeft:20,
            paddingRight:20,
            width:width*1,
            height:height*0.5,
            // alignItems:'center',
            
        }}>
            <View style={{
                // alignItems:'center',
                gap:10
            }}>
            <View style={{ 
                gap:15
            }}>
              <View></View>
            <View style={{alignItems:"center",justifyContent:"center"}}> 
              <TouchableOpacity onPress={()=>navigation.navigate("appointFromMap",{idApp:data.DoctorId})} style={{width:170,height:40,backgroundColor:COLORS.primary,borderRadius:20,justifyContent:"center",alignItems:"center"}}><Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>Book Appointement</Text></TouchableOpacity>
              </View>
            <Text style={{ 
                fontSize:30,
                fontWeight:600
            }}>About Doctor</Text>
            <Text style={{
                color:COLORS.black,
                fontSize:18,
                // fontWeight:600
            }}>Hello, My name is Dr. {data?.Doctor?.fullname || 'Unknown'}. I'm specialized In hello whatever it says we gonna kill it </Text>
            </View>
            
            <Text style={{
              fontSize:20,
              fontWeight:600
            }}>Recent Reviews</Text>
      <View style={{
        // alignItems:'center',
        gap:15
      }}>
        <View style={{
          flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: 40,
    paddingRight:20
        }}>
  
        <TouchableOpacity style={{
          backgroundColor: "#ddf0ee",
          borderRadius: 20,
          paddingVertical: 3.5,
          paddingHorizontal: 13
        }}
        onPress={() => navigation.navigate('AllReviews', { data: data?.Doctor })}
        >
            <Text style={{
              color: "#2d958c",
              fontSize: 15,
            }}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
  
            <View style={{
              alignItems:'center',
              gap:20
            }}>
  {reviews.slice(0, 2).map((review, index) => (
  <ReviewCardDoctor key={review.id} review={review} />
  ))}
  </View>
      </View>
        </View>
        </ScrollView>
        
        <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        gap:15,
        width:width*0.15,
            height:height*0.07,
        backgroundColor:COLORS.white,
        position:'absolute',
        bottom:95,
        right:20,
        borderRadius:200,
       
      }}>
        <TouchableOpacity
            style={{
                backgroundColor:COLORS.primary,
            width:width*0.15,
            height:height*0.07,
            borderRadius:200,
            alignItems:'center',
            justifyContent:'center'
            }}
            onPress={toggleModal}
            >
                <Image
                source={require('../assets/star.png')}
                style={{
                    width:width*0.07,
                    height:height*0.03
                }}
                />
            </TouchableOpacity>

              </View>
         
        
  
     <NavigationBar/>
          
    </View>
  )
}

export default ProfileDocStaticMap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: width*0.8,
    height: height*0.35,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});