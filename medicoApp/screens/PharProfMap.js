import { StyleSheet, Text, View,Image,TouchableOpacity,Dimensions,ImageBackground,ScrollView,TextInput,Modal,FlatList,KeyboardAvoidingView} from 'react-native'
import React,{ useState , useEffect} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../components/Button'
const {width,height}= Dimensions.get('window')
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AirbnbRating } from 'react-native-ratings';
import NavigationBar from '../components/NavigationBar'
import PharmacyCardProfile from '../components/PharmacyCardProfile'
import axios from 'axios'
import {auth} from '../firebase-config'
import { useNavigation } from '@react-navigation/native';
import ReviewCardPhar from '../components/ReviewCardPhar'
import haversine from 'haversine'
import { useSelector } from "react-redux";
import {LogBox} from 'react-native';

 



const PharProfMap = ({route}) => {
  LogBox.ignoreAllLogs();

  const navigation=useNavigation()
  const idPharma = useSelector((state) => state.doctor?.idPharmaMap);


  // const data= route.params.pharmacy

  // console.log('pharmacy jeeet',data);

  const [comment,setComment]=useState('')
  const [rating,setRating]=useState('')
  const [allReviews,setAllReviews]=useState([])
  const [isDistance,setIsDistance]=useState(0)
  const [loggedIn,setLoggedIn]=useState({})
  const [productData,setProductData]=useState([])
const [data,setData]=useState({})
console.log("dddddaaaaataaaa",data);
  // console.log('this is the logged in user',loggedIn);

  // console.log(isDistance,'this is distance between you and pharmacy');


const getOne = async()=>{
  try {
    const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/getOnePharmId/${idPharma}`)
  setData(response.data)
  } catch (error) {
    throw new Error(error)
  }
}




  const getLoggedIn=async()=>{
    const loggedMail=auth.currentUser.email
    try {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/getOne/${loggedMail}`)
        setLoggedIn(response.data)
    } catch (error) {
      error
    }
  }

  const fetchProduct = async () => {
    // const pharmacyId=data.id
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/Product/getById/${idPharma}`
      );
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
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
          latitude: data.PHname.latitude,
          longitude: data.PHname.longitude
        }
        console.log("======================================",start,end,'this is distance between pharmacy');

      setIsDistance((haversine(start, end)).toFixed(1))

      
    } catch (error) {
      
    }
  }
  
  
  
  
  
  
  
  
  const fetchReviewsForPhar=async()=>{
    try {
      const get= await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/reviews/pharmaProfile/${idPharma}`)
      const reviews=get.data
      setAllReviews(reviews)
    } catch (error) {
      throw error
    }
  }
  // console.log('these are all reviews from the phar prof',allReviews.Reviews);
  
  // console.log(allReviews,'where is user in allReviews');
  

  const handleReviewsCreation=async(e)=>{
    e.preventDefault()

      try {
        const pharmacyId =idPharma
        let email = auth.currentUser.email
      
        const newReview = {
          pharmacyId,
          email,
          rating,
          comment
      }
      // console.log('this is the pharmacy new Review',newReview);
      const create = await axios.post(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/reviews/createRevPh`,newReview)
      fetchReviewsForPhar()
      setComment('');
      setRating('')
    setModalVisible(!isModalVisible);

      // console.log('this is the creation data',create.data); 
      } catch (error) {
        console.log(error);
      }

}

  useEffect(()=>{
    getOne()
    // calculateDistanceMap()
    // getLoggedIn()
    fetchReviewsForPhar()
    fetchProduct()

  },[])



  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    
    <View style={{
      display:'flex',
      flexDirection:'column',
      // flex:1,
      alignItems:'center',
      justifyContent:'center',
      gap:3
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
                    Rate Your Pharmacy
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
           
            onPress={(e)=> handleReviewsCreation(e)}
            
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
              height:height*0.94
            }}>
        <View style={{
          width:width*1,
          height:height*0.3,
      }}>
      <ImageBackground
       source={{ uri: data?.imageUrl  }}
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
      </ImageBackground>
      </View>
      <View
          style={{
              width:width*1,
              height:height*0.2,
              backgroundColor:COLORS.white,
              borderEndEndRadius:20,
              elevation: 10,
              justifyContent:'center',
              alignItems:'center',
              shadowColor: 'grey',
              display:'flex',
              flexDirection:'column',
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
                      gap:10
                  }}>
                  <Text style={{
                      fontSize:20,
                      fontWeight:600,
                      textAlign:'center'
                  }}>{data.PHname}'s Pharmacy</Text>
                  <Text style={{
                      fontSize:15,
                      fontWeight:400,
                      textAlign:'center',

                      color:COLORS.grey
                  }}>{data.adress}</Text>
                  </View>

                  <View style={{
                      display:'flex',
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'center',
                      gap:20
                  }}>
                    <TouchableOpacity>
                      <View style={{
                          display:"flex",
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'center',
                          gap:10,
                          borderWidth:1,
                          borderColor:'#E8E8E8',
                          borderRadius:10,
                          height:height*0.06,
                          width:width*0.3
                      }}>
                          
            <Icon name="star" size={19} color="#FFD700" />
                          <Text style={{
                              fontWeight:600
                          }}>{(data.rating?(data.rating).toFixed(1):"No rating yet")}</Text>
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                      <View style={{
                           display:"flex",
                           flexDirection:'row',
                           alignItems:'center',
                           justifyContent:'center',
                           gap:10,
                           borderWidth:1,
                           borderColor:'#E8E8E8',
                           borderRadius:10,
                           height:height*0.06,
                           width:width*0.3
                      }}>
                          <Image 
                          source={require('../assets/gps.png')}
                          style={{width:width*0.062,
                          height:height*0.030}}
                          />
                          <Text style={{
                              fontWeight:600
                          }}>{isDistance} Km</Text>
                      </View>
                      </TouchableOpacity>
                      
                  </View> 
              </View>
            
          </View>
          <ScrollView style={{
                height:height*1}}>
                    
        <View style={styles.secondOrdersContainer}>
        <Text style={styles.ordersText}>Recent Ratings</Text>
        <TouchableOpacity style={styles.button}
        onPress={()=>navigation.navigate('AllMissingProducts')}>
          <Text style={styles.buttonText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
        <FlatList
        data={allReviews.Reviews}
        renderItem={({ item }) => <ReviewCardPhar allReviews={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} // Make the list horizontal
        />
        <View style={styles.secondOrdersContainer}>
        <Text style={styles.ordersText}>Products List</Text>
      </View>
        <View style={{
          flexDirection: 'row', // Arrange items in a row
          flexWrap: 'wrap', // Allow items to wrap to the next line if needed
          justifyContent: 'flex-start', // Add space around the items
          alignItems: 'flex-start', // Align items to the start of the cross-axis (top)
          rowGap:10,
          columnGap:-10
        }}>
         {productData.map((product) => (
        <PharmacyCardProfile
          key={product.id} 
          product={product}
          
        />
      ))}
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
        bottom:12,
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
</View>
      
   <NavigationBar/>
    </View>
    
  )
}

export default PharProfMap

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    // flex:1,
    alignItems:'center',
    justifyContent:'center',
    gap:9
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
  secondOrdersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingLeft:7,
    paddingRight:7
  },
  button: {
    backgroundColor: '#ddf0ee',
    borderRadius: 20,
    paddingVertical: 3.5,
    paddingHorizontal: 13,  
  },
  buttonText: {
    color: '#2d958c',
    fontSize: 15,
  },
  ordersText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  
});