import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase-config";
import { getUser } from "../constants/userServices";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { docImage } from "../redux/doctorSlicer";
import { setSelectedImage, updateUser} from "../redux/userSlicer";
import { useDispatch , useSelector} from "react-redux";
import { imageDoc } from "../redux/doctorSlicer";
import { logOut } from "../redux/userSlicer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const {width,height}= Dimensions.get('window')
import { Feather } from '@expo/vector-icons'; 
import COLORS from '../constants/colors'

const UserProfilePage = ({ navigation }) => {
  const dispatch = useDispatch()

  const email = auth.currentUser.email;
  const uid = auth.currentUser.uid;

  const [image, setImage] = useState(null);
  const [user, setUser] = useState([]);
  const [localSelectedImage , setLocalSelectedImage] = useState("")
  const[dataUser,setDataUser]=useState([]);
  const[refresh,setRefresh]=useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  console.log("=======================Data",dataUser);


  
  // const currDoc = async()=>{
  //   try {
  //     const email = auth.currentUser.email;
  //     console.log(email);
  //    const x = await dispatch(imageDoc(email))



  //   }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

const updateImg = async(cloudImg)=>{
  try {
    const email = auth.currentUser.email;
    const response = await axios.put( `http://${
      process.env.EXPO_PUBLIC_SERVER_IP
    }:1128/api/user/updateCloud/${email}`,{imgURL:cloudImg})
    setRefresh(!refresh)
  } catch (error) {
    throw new Error(error)
  }
}

const getOne = async()=>{
  try {
    const email = auth.currentUser.email;
    const response = await axios.get( `http://${
      process.env.EXPO_PUBLIC_SERVER_IP
    }:1128/api/pharmacy/getPharmaOne/${email}`)
    setDataUser(response.data)
  } catch (error) {
    throw new Error(error)
  }
}
// const getPharma = async()=>{
//   try {
//     const email = auth.currentUser.email;

//     const response = await axios.get( `http://${
//       process.env.EXPO_PUBLIC_SERVER_IP
//     }:1128/api/pharmacy/getPharmaOne/${email}`)
//   } catch (error) {
//     throw new Error(error)
//   }
// }


const clearToken = async () => {
  try {
   const logOutType= await AsyncStorage.removeItem('type'); 
   dispatch(logOut())
   console.log('mecanique mnghir awre9',logOutType);

  } catch (error) {
    throw error
  }
}
const onDoc = useSelector((state)=> state.doctor.data)
// console.log("==================Doc",dataUser.imgUrl);

// const oldImg = onDoc[0].localSelectedImage

// console.log('this is the img' , oldImg);




  const logOutUser = async () => {
    try {
      await dispatch(logOut()); // Dispatch the logOut action
      navigation.navigate('Login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      let formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        type: "image/jpeg",
        name: 'profilePic'
      });
      formData.append("upload_preset", "ntdxso9x");
  
      fetch("https://api.cloudinary.com/v1_1/ddsp5aq1k/image/upload", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setLocalSelectedImage(data.secure_url);
      dispatch(setSelectedImage(data.secure_url));
      setModalVisible(true)
      // dispatch(updateUser(localSelectedImage));
      // updateImg(localSelectedImage)
      // setRefresh(!refresh)

    })
    .catch(error => {
      console.error("Error uploading image: ", error);
    });
  }
};
  
console.log(localSelectedImage , 'bingo');
useEffect(()=>{
  getOne()
},[refresh])
// useEffect(() => {
//   // async function fetchData() {
//   //   const userData = await getUser();
//   //   if (userData) {
//   //     setUser(userData);
//   //   }
//   // }

//   // fetchData();
//   updateImg(localSelectedImage)

// }, [refresh]);


// useEffect(() => {
//   async function fetchData() {
//     const userData = await getUser();
//     if (userData) {
//       setUser(userData);
//     }
//   }
//   // currDoc()
//   fetchData();
// }, [localSelectedImage,refresh]);
 
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 22,
        paddingTop: 55,
        paddingBottom: 40,
        flexDirection: "column",
        gap: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          //   backgroundColor: "green",
          height: 100,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>Profile</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            width: "40%",
            height: "100%",
            padding: 0,
          }}
        >
          <TouchableOpacity>
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
                backgroundColor: "#EAEAEA",
              }}
            >
              <Image
                source={require("../assets/bell.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              shadowColor: "rgba(3, 3, 3, 0.1)",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              backgroundColor: "#EAEAEA",
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
                backgroundColor: "#EAEAEA",
              }}
            >
              <Image
                source={require("../assets/basket.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          margin: 3,
          gap: 8,

        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            shadowColor: "rgba(3, 3, 3, 0.1)",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            backgroundColor: "#EAEAEA",
            position: "relative",
          }}
        >
          {/* {dataUser.imgUrl ? ( */}
  <Image 
    // source={{uri: localSelectedImage}}
    source={{uri:dataUser?.imgUrl ||dataUser?.imageUrl}}
    style={{
      width: 150,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      shadowColor: "rgba(3, 3, 3, 0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      backgroundColor: "#EAEAEA",
    }}
  />
{/* ) : null} */}
          <TouchableOpacity onPress={selectImage}
            style={{
              position: "absolute",
              width: 150,
              top: 15,
              left: 110,
              width: 35,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              shadowColor: "rgba(3, 3, 3, 0.1)",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              backgroundColor: "#1a998e",
              borderWidth: 3.5,
              borderColor: "white",
              borderStyle: "solid",
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/editPen.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{user.name}</Text>
        <View
          style={{
            width: "55%",
            height: 24,
            borderRadius: 24,
            shadowColor: "rgba(3, 3, 3, 0.1)",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            backgroundColor: "#EAEAEA",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{email}</Text>
        </View>
      </View>
      <View style={{ height: "46%" }}>
        {/* <ScrollView style={{height:"100%"}}> */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: "25%",
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
          <View>
          
            <AntDesign name="right" size={24} color="#1a998e" />
          </View>
        </TouchableOpacity>
   
        
    
      
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
            height: "25%",
            
            alignItems: "center",
          }}
          onPress={() => navigation.navigate('pay')}
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
            height: "25%",
            alignItems: "center",
          
          }}
          onPress={()=>navigation.navigate('userProfile')}
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
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Upgrade account</Text>
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
            height: "25%",
            // backgroundColor: "grey",
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
       
        {/* </ScrollView> */}
      </View>
      <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
            >
<View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={{fontWeight:"bold",fontSize:20,textAlign:"center"}}>Do you want to change your photo</Text>
<View style={{flexDirection:"row",justifyContent:"space-between",gap:20,alignItems:"center"}}>
<TouchableOpacity
                    
                    style={{
                      backgroundColor:COLORS.primary,
                      width:width*0.2,
                      height:height*0.05,
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:20
                    }}
                    onPress={()=>{toggleModal();  updateImg(localSelectedImage)
                    }}
                  >
                    <Text style={{
                      color:COLORS.white
                    }}>Confirme</Text>
                  </TouchableOpacity>
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
    </View>
  );
};

export default UserProfilePage;

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
    height: height*0.20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
});