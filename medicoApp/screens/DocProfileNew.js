import { StyleSheet, Text, View, Image,TouchableOpacity,Dimensions,ImageBackground,ScrollView,TextInput,Modal } from 'react-native'
import React,{useEffect,useState} from 'react'
const {width,height}= Dimensions.get('window')
import COLORS from '../constants/colors'
import NavigationBar from '../components/NavigationBar'
import ReviewCardDoctor from '../components/ReviewCardDoctor'
import { AntDesign } from "@expo/vector-icons";
import {fetchDocReviews} from '../redux/docReviewSlicer'
import { useDispatch, useSelector } from 'react-redux'
import { createReview } from '../redux/docReviewSlicer';
import { AirbnbRating } from 'react-native-ratings';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Storage } from 'expo-storage'
import { auth } from '../firebase-config'
import { fetchDoctorData } from '../redux/doctorSlicer'
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {LogBox} from 'react-native';


import { signOut } from 'firebase/auth';
import { logOut } from '../redux/userSlicer'




const DocProfileNew = ({navigation}) => {
  
  LogBox.ignoreAllLogs();


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [rating,setRating]=useState('')
  const [comment,setComment]=useState('')
  const [client,setClient]=useState(0)
  const dispatch=useDispatch()
  const data = useSelector((state)=>state.doctor.oneDoc)
  const reviews=useSelector((state)=>state.docRev.data)



  const fetchReviews= ()=>{
    dispatch(fetchDocReviews(data.id))
}

const clearToken = async () => {
  try {
   const logOutType= await AsyncStorage.removeItem('type');
   dispatch(logOut())
 
   console.log('mecanique mnghir awre9',logOutType);

  } catch (error) {
    console.error('Error clearing token:', error);
  }
};



  const logOutUser = async () => {
    try {
      await signOut(auth)
       clearToken()
      navigation.navigate('Login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  };

const fetchData = async()=>{
    try {
      const emailUser=auth.currentUser.email
      dispatch(fetchDoctorData(emailUser))
      console.log('this is email doctor',emailUser);
    } catch (error) {
      console.log(error); 
    }
}






useEffect(() => {
  fetchReviews()
  fetchData()
}, []);



const handleReviewAdding = () => {
  const doctorId =data.doctor.id
  const userId =client.id

  const newReview = {
    doctorId,
    userId,
  rating,
    comment:comment,
  };

  console.log('rev',newReview);
  dispatch(createReview(newReview));

  setComment('');
  setRating('')
};

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

const renderDoctorProfile = () =>{
  if (isLoggedIn === null|false) {
    
    return (
      <View style={styles.loadingContainer}>
        
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading...</Text>
      </View>
    );
  }
  if(isLoggedIn){
    return (<View style={{
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
                        <View>
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
      source={require('../assets/doctoura.jpg')}
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
              backgroundColor:COLORS.white,
          width:width*0.1,
          height:height*0.05,
          borderRadius:200,
          alignItems:'center',
          justifyContent:'center'
          }}>
              <Image
              source={require('../assets/arrowback.png')}
              style={{
                  width:width*0.07,
                  height:height*0.02
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
                  width:width*0.1,
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
                  }}>Dr. {data.fullname}</Text>
                  <Text style={{
                      fontSize:15,
                      fontWeight:400,
                      color:COLORS.grey
                  }}>Doctor Speciality</Text>
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
                          }}>{data.type}</Text>
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
                          }}>1.6 km</Text>
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
                      }}>{data.rating}</Text>
                  </View>
                  <Text style={{
                      color:COLORS.grey,
                      fontWeight:600
                  }}>150 Reviews</Text>
              </View>


          </View>
          




      </ImageBackground>

      </View>

      <ScrollView contentContainerStyle={{
          paddingLeft:20,
          paddingRight:20,
          width:width*1,
          height:height*2.5,
          // alignItems:'center',
          
      }}>
          <View style={{
              // alignItems:'center',
              gap:10
          }}>
          <View style={{
              gap:15
          }}>
          <Text style={{
              fontSize:30,
              fontWeight:600
          }}>About Doctor</Text>
          <Text style={{
              color:COLORS.black,
              fontSize:18,
              // fontWeight:600
          }}>Hello, My name is Dr. Name. I'm specialized In hello whatever it says we gonna kill it </Text>
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
      onPress={()=>navigation.navigate('AllReviews',
      {
        data : {
          doctor:data,
        }
      }

      )}
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
      gap:15
    }}>
      <TouchableOpacity
          style={{
              backgroundColor:COLORS.primary,
          width:width*0.1,
          height:height*0.05,
          borderRadius:200,
          alignItems:'center',
          justifyContent:'center'
          }}
          onPress={toggleModal}
          >
              <Image
              source={require('../assets/plus.png')}
              style={{
                  width:width*0.05,
                  height:height*0.025
              }}
              />
          </TouchableOpacity>
      <TextInput
              style={{
                height: 44,
                width:width*0.7,
                backgroundColor: "#fff",
                paddingHorizontal: 16,
                borderRadius: 12,
                fontSize: 15,
                fontWeight: "500",
                color: "#24262e",
              }}
              placeholder='type here...'
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
          onPress={handleReviewAdding}
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
       
      

   <NavigationBar/>
        
  </View>)
  }else {
    return (<View style={{
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
                        <View>
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
      source={{uri:data.imageUrl}}
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
              justifyContent:'flex-end'
          }}>
        

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
                  }}>Dr. {data.fullname}</Text>
                  <Text style={{
                      fontSize:15,
                      fontWeight:400,
                      color:COLORS.grey
                  }}>Doctor Speciality</Text>
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
                          }}>{data.type}</Text>
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
                      }}>{(data.rating)?.toFixed(1)}</Text>
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
          height:height*0.6,
          // alignItems:'center',
          
      }}>
          <View style={{ height: "46%" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: height*0.1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Image
                  source={require("../assets/personalDetails.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Personal Details
            </Text>
          </View>
          <View
            style={{}}
          >
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: height*0.1,
            alignItems: "center",
          }}
          onPress={() =>navigation.navigate('appointement')}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Feather name="calendar" size={28} color="#1a998e" />

              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Availability
            </Text>
          </View>
          <View
            style={{}}
          >
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: height*0.1,
            alignItems: "center",
          }}
          onPress={() =>navigation.navigate('appointmentDoctor')}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <MaterialCommunityIcons name="calendar-multiple-check" size={27} color="#1a998e" />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Appointements
            </Text>
          </View>
          <View
            style={{}}
          >
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: height*0.1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Image
                  source={require("../assets/payment.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Payments</Text>
          </View>
          <View>
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: height*0.1,
            
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Settings")}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Image
                  source={require("../assets/settings.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Settings</Text>
          </View>
          <View>
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: height*0.1,
            alignItems: "center",
          }}
          onPress={()=>logOutUser()}
        >
          <View
            style={{
              flexDirection: "row",
              width: "55%",
              gap: 23,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                shadowColor: "rgba(3, 3, 3, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                backgroundColor: "#ddf0ee",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  shadowColor: "rgba(3, 3, 3, 0.1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  backgroundColor: "#ddf0ee",
                }}
              >
                <Image
                  source={require("../assets/logout.png")}
                  style={{
                    width: 28,
                    height: 28,
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Log Out</Text>
          </View>
          <View>
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
        
      </View>
      </ScrollView>

   <NavigationBar/>
        
  </View>)
  }
}


  return (
    <View style={{
      display:'flex',
      flexDirection:'column',
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      gap:9}}>
      {renderDoctorProfile()}
    </View>
  )
}

export default DocProfileNew

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
    height: height*0.25,
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