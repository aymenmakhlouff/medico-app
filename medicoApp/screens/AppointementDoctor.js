import React, { useEffect, useState,useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Dimensions,
  TextInput
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
// import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
const { width, height } = Dimensions.get("window");
import { auth } from "../firebase-config";
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from "react-redux";
import { saveMap } from '../redux/doctorSlicer';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import {LogBox} from 'react-native';


import axios from "axios";
import COLORS from "../constants/colors";
import { firebase } from "@react-native-firebase/database";
import AnimatedLottieView from "lottie-react-native";
const AppointementList = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isConfirmedModal, setIsConfirmedModal] = useState(false);
  const [isConfirmedModalSec, setIsConfirmedModalSec] = useState(false);
  const [isRejectedModal, setIsRejectedModal] = useState(false);
  const [isRejectedModalSec, setIsRejectedModalSec] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [idOfHour, setIdOfHour] = useState(0);
  const [idOfAppoint, setIdOfAppoint] = useState(0);
  const [btnFilterModal, setBtnFilterModal] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(null);
  const [isDistance, setIsDistance] = useState(null);
  const [text, setText] = useState('');
  const[emailData,setEmailData] = useState({})
  const navigation = useNavigation()
  
  const [oneUser,setOneUser]=useState({
    longitude:0,
    latitude:0,
    id:0
  })
  const dropdownRef = useRef(null);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  
  const [saveData, setSaveData] = useState({
    userName: "",
    day: "",
    hour: "",
    createdDate: "",
    createdHour: "",
  });
  LogBox.ignoreAllLogs();

  const dispatch = useDispatch();

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  const showMapModal = () => {
    setMapModalVisible(true);
  };

  const hideMapModal = () => {
    setMapModalVisible(false);
  };
  const userToMap=(lat,long,idUser,userName,docName)=>{
    dispatch(saveMap({longitude:long,latitude:lat,id:idUser,name:userName,dotorName:docName}))
  }

 const sendMail = async ()=>{
  try {
    const send = await axios.post(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/email/sendEmail`,{
      userEmail: emailData.userEmail,
                    doctorName: emailData.doctorName,
                    appointmentDetails: emailData.appointmentDetails,
                    patient:emailData.patient,
                    textEmail:text
    })
  } catch (error) {
    throw new Error(error)
  }
 }

  const toggleDropdown = () => {
    if (isDropdownVisible) {
      dropdownRef.current.fadeOutLeftBig(900).then(() => {
        setDropdownVisible(false);
      });
    } else {
      setDropdownVisible(true);
      dropdownRef.current.slideInLeft(900).then(() => {
        setDropdownVisible(true);
      });
    }
  };

  const getTime = async (docLat, docLong, desLat, desLong) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${docLat},${docLong}&destination=${desLat},${desLong}&key=AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y`
      );
      const data = await response.json();
  
      if (data.status === "OK" && data.routes.length > 0 && data.routes[0].legs.length > 0) {
        const duration = data.routes[0].legs[0].duration.text;
        setEstimatedDuration(duration);
      } else if (data.status === "ZERO_RESULTS") {
        console.warn("No route found between the specified points.");
        setEstimatedDuration(null); 
      } else {
        console.error("Error calculating route: ", data.status);
      }
    } catch (error) {
      console.error("Error fetching route data: ", error);
    }
  };
  
  const calculateDistanceMap = async (docLat, docLong, desLat, desLong) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${docLat},${docLong}&destinations=${desLat},${desLong}&key=AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y`
      );
      const data = await response.json();
  
      if (
        data.status === "OK" &&
        data.rows.length > 0 &&
        data.rows[0].elements.length > 0 &&
        data.rows[0].elements[0].distance
      ) {
        const distance = data.rows[0].elements[0].distance.text;
        setIsDistance(distance);
      } else if (data.status === "ZERO_RESULTS") {
        console.warn("No distance information available between the specified points.");
        setIsDistance(null); // Reset the distance
      } else {
        console.error("Error calculating distance: ", data.status);
      }
    } catch (error) {
      console.error("Error fetching distance data: ", error);
    }
  };
  


  const slideInLeft = {
    from: { left: -200 },
    to: { left: 0 },
  };

  const slideOutLeft = {
    from: { left: 0 },
    to: { left: -200 },
  };
  const fetchAllData = async () => {
    try {
      const email = auth.currentUser.email;

      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/appointement/getAllDoc/${email}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw new Error(error);
    }
  };


  const filterAppoint =async(body)=>{
    try {
      const email = auth.currentUser.email
      const x = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/appointement/filter/${body}/${email}`)
      setData(x.data)
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateStatus = async (idH) => {
    try {
      const response = await axios.put(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/update/${idH}`,
        { availability: 1 }
      );
      setRefresh(!refresh);
    } catch (error) {
      throw new Error(error);
    }
  };
  const updateStatusAppointement = async (idAppoint, body) => {
    try {
      const response = await axios.put(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/appointement/updateAppoint/${idAppoint}`,
        body
      );
      setRefresh(!refresh);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUser = async (id) => {
    try {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/getOneById/${id}`)
      setOneUser({longitude:response.longitude,latitude:response.latitude,id:response.id});
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    // fetchData();
    fetchAllData();
  }, [refresh]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 80,
      }}
    >
      <Text style={{ paddingBottom: 40, fontSize: 35, fontWeight: "bold" }}>
        Appointment List
      </Text>
      <View style={{paddingLeft:280,paddingBottom:30}}>
       {!isDropdownVisible?<TouchableOpacity onPress={toggleDropdown}>
        <Image style={{height:45,width:45}} source={require("../assets/filtreOff.png")}/>
        </TouchableOpacity>:<TouchableOpacity onPress={toggleDropdown}>
        <Image style={{height:45,width:45}} source={require("../assets/filtreOn.png")}/>
        </TouchableOpacity>}
        </View>    
        <Animatable.View
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: 150,
        left: isDropdownVisible ? 0 : -290,
        width: 290,
        height: 70,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {<TouchableOpacity onPress={() => fetchAllData()}><Text>All</Text></TouchableOpacity>}
      <TouchableOpacity onPress={() => filterAppoint("pending")}><Text>Pending</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => filterAppoint("Accepted")}><Text>Accepted</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => filterAppoint("Rejected")}><Text>Rejected</Text></TouchableOpacity>
    </Animatable.View>
      <FlatList
        data={data} 
        keyExtractor={(appointment) => String(appointment.id)}
        renderItem={({ item: appointment }) => (
          <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 15,
            paddingTop: 15,
            paddingRight: 15,
            paddingLeft: 15,
            width: 380,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.15,
            shadowRadius: 15,
            elevation: 5, // Elevation for Android
            // backgroundColor: "#dedede",
            // backgroundColor: "#edeaea",
            // borderRadius: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "colmun",
              justifyContent: "center",
              padding: 20,
              backgroundColor: "white",
              borderRadius: 20,
              width: "100%",
              height: 280,
            }}
          >
            <View style={{ width: "100%", height: "50%" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "70%",
                    flex: 1,
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <View
                    style={{
                      widh: "100%",
                      height: "60%",
                      flex: 1,
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                      {appointment.User.username}
                    </Text>
                    <Text
                      style={{
                        color: "#a5a9be",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {appointment.User.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      widh: "100%",
                      height: "30%",
                      justifyContent: "center",
                    }}
                  >
                    
                    {/* <Text
                      style={{
                        color: "#afb2c7",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Test test
                    </Text> */}
                  </View>
                </View>
                <View
                  style={{
                    height: "100%",
                    width: "30%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      // backgroundColor: "blue",
                      height: 89,
                      width: 89,
                      borderRadius: 15,
                    }}
                  >
                    <Image style={{height:89,width:89,borderRadius:15}} source={{uri:appointment.User.imgUrl}}/>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 0.5,
                backgroundColor: "#dedede",
                borderRadius: 2,
              }}
            ></View>
            <View
              style={{
                width: "100%",
                height: "20%",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  height: "90%",
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/calendar.png")}
                />
                <Text style={{ color: "#adb0c4", fontWeight: "bold" }}>
                  {appointment.Day.day}
                </Text>
              </View>
              <View
                style={{
                  height: "90%",
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/time.png")}
                />
                <Text style={{ color: "#adb0c4", fontWeight: "bold" }}>
                  {appointment.Availability.hour}
                </Text>
              </View>
              <View
                style={{
                  height: "90%",
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  flexDirection: "row",
                }}
              >
                <Badge
                  badgeStyle={{ height: 22, width: 85 }}
                  value={<Text style={{ color: "white" }}>{appointment.status==="pending"?"Pending":appointment.status==="Accepted"?"Accepted":appointment.status==="Rejected"?"Rejected":null}</Text>}
                  status={ appointment.status==="pending"?"warning":appointment.status==="Accepted"?"success":appointment.status==="Rejected"?"error":null}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                alignItems: "center",
                justifyContent: "space-around",
                flex: 1,
                flexDirection: "row",
              }}
            >
           {appointment.status==="pending"?
           <>  
           <View
                style={{
                  width: "40%",
                  height: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 80,
                  backgroundColor: COLORS.primary,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsConfirmedModal(true);
                    setSaveData({
                      userName: appointment.User.username,
                      day: appointment.Day.day,
                      hour: appointment.Availability.hour,
                      createdDate: new Date(
                        appointment.createdAt
                      ).toLocaleDateString(),
                      createdHour: new Date(
                        appointment.createdAt
                      ).toLocaleTimeString(),
                    });
                    setIdOfHour(appointment.Availability.id);
                    setIdOfAppoint(appointment.id);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 22,
                    }}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "40%",
                  height: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 80,
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "#f20404",
                  borderStyle: "solid",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsRejectedModal(true);
                    setSaveData({
                      userName: appointment.User.username,
                      day: appointment.Day.day,
                      hour: appointment.Availability.hour,
                      createdDate: new Date(
                        appointment.createdAt
                      ).toLocaleDateString(),
                      createdHour: new Date(
                        appointment.createdAt
                      ).toLocaleTimeString(),
                    });
                    setIdOfAppoint(appointment.id);
                  }}
                >
                  <Text
                    style={{
                      color: "#f20404",
                      fontWeight: "bold",
                      fontSize: 22,
                    }}
                  >
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
              </> :appointment.status==="Accepted"?
              <View
              style={{
                width: "100%",
                height: "30%",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "45%",
                  height: 50,
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                 
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Accepted At :
                </Text>
                <Text style={{ color: "#adb0c4", fontWeight: "bold" }}>
                  {new Date(appointment.updatedAt).toLocaleDateString()}{" "}
                  {new Date(appointment.updatedAt).toLocaleTimeString()}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  height: "100%",
                  gap: 5,
                }}
              >
                {/* <TouchableOpacity>
                  <Image
                    style={{ width: 48, height: 48 }}
                    source={require("../assets/chat.png")}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => {setSendEmail(true);
                  setEmailData({
                    userEmail: appointment.User.email,
                    doctorName: appointment.Doctor.fullname,
                    appointmentDetails: `On ${appointment.Day.day}, at ${appointment.Availability.hour}.`,
                    patient:appointment.User.username
                  })
                  }}>
                  <Image
                    style={{ width: 48, height: 48 }}
                    source={require("../assets/email.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{setOneUser({longitude:appointment.User.longitude,latitude:appointment.User.latitude,id:appointment.User.id,name:appointment.User.username});userToMap(appointment.User.latitude,appointment.User.longitude,appointment.User.id,appointment.User.username,appointment.Doctor.fullname);getTime(appointment.Doctor.latitude,appointment.Doctor.longitude,appointment.User.latitude,appointment.User.longitude);calculateDistanceMap(appointment.Doctor.latitude,appointment.Doctor.longitude,appointment.User.latitude,appointment.User.longitude);showMapModal();console.log("==>===>AAAAAAA===>===>====>===>",appointment.Doctor.latitude,appointment.Doctor.longitude,appointment.User.latitude,appointment.User.longitude,"thisssssssssss");}}
                >
                  <Image
                    style={{ width: 48, height: 48 }}
                    source={require("../assets/multiple.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>:appointment.status==="Rejected"?
            <View
            style={{
              width: "100%",
              height: "30%",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "45%",
                height: 50,
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Rejected At :
              </Text>
              <Text style={{ color: "#adb0c4", fontWeight: "bold" }}>
                {new Date(appointment.updatedAt).toLocaleDateString()}{" "}
                {new Date(appointment.updatedAt).toLocaleTimeString()}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
                gap: 15,
              }}
            >
              {/* <TouchableOpacity>
                <Image
                  style={{ width: 48, height: 48 }}
                  source={require("../assets/chat.png")}
                />
              </TouchableOpacity> */}
              <TouchableOpacity>
                <Image
                  style={{ width: 48, height: 48 }}
                  source={require("../assets/email.png")}
                />
              </TouchableOpacity>
            </View>
          </View>:null
              }
                <Modal
                visible={isConfirmedModal}
                animationType="fade"
                transparent={true}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#677294",
                      }}
                    >
                      Are you sure to confirme the appointement of{" "}
                      {saveData.userName}, on {saveData.day}, at {saveData.hour}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                      <View
                        style={{
                          width: "45%",
                          backgroundColor: COLORS.primary,
                          height: 45,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setIsConfirmedModal(false);
                            setIsConfirmedModalSec(true);
                            updateStatus(idOfHour);
                            updateStatusAppointement(idOfAppoint, {
                              status: "Accepted",
                            });
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Confirme
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: "45%",
                          backgroundColor: "white",
                          height: 45,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 2,
                          borderColor: "#f20404",
                          borderStyle: "solid",
                        }}
                      >
                        <TouchableOpacity
                          style={{}}
                          onPress={() => setIsConfirmedModal(false)}
                        >
                          <Text
                            style={{
                              color: "#f20404",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={isConfirmedModalSec}
                animationType="fade"
                transparent={true}
              >
                <View style={stylesModalSec.modalContainer}>
                  <View style={stylesModalSec.modalContent}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        paddingTop: 30,
                        gap: 16,
                      }}
                    >
                      <Image
                        style={{ width: 200, height: 200 }}
                        source={require("../assets/coche.png")}
                      />
                      <Text
                        style={{
                          color: "#677294",
                          fontSize: 22,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        The Appointement is Accepted
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      ></View>
                    </View>
                    <Text
                      style={{
                        color: "#677294",
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      You accepted an appointement with {saveData.userName}, on{" "}
                      {saveData.day}, at {saveData.hour}
                    </Text>

                    <View
                      style={{
                        width: "45%",
                        backgroundColor: COLORS.primary,
                        height: height * 0.08,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setIsConfirmedModalSec(false)}
                        style={{
                          width: "45%",
                          backgroundColor: COLORS.primary,
                          height: 30,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={isRejectedModal}
                animationType="fade"
                transparent={true}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        paddingTop: 20,
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#677294",
                      }}
                    >
                      Are you sure to reject an appointement with{" "}
                      {saveData.userName}, on {saveData.day}, at {saveData.hour}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                      <View
                        style={{
                          width: "45%",
                          backgroundColor: COLORS.primary,
                          height: 45,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setIsRejectedModal(false);
                            setIsRejectedModalSec(true);
                            updateStatusAppointement(idOfAppoint, {
                              status: "Rejected",
                            });
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Reject
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: "45%",
                          backgroundColor: "white",
                          height: 45,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 2,
                          borderColor: "#f20404",
                          borderStyle: "solid",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setIsRejectedModal(false)}
                        >
                          <Text
                            style={{
                              color: "#f20404",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={isRejectedModalSec}
                animationType="fade"
                transparent={true}
              >
                <View style={stylesModalSec.modalContainer}>
                  <View style={stylesModalSec.modalContent}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Image
                        style={{ width: 250, height: 250 }}
                        source={require("../assets/marqueX.png")}
                      />
                      {/* <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}> */}
                      <Text
                        style={{
                          color: "#677294",
                          fontSize: 22,
                          fontWeight: "bold",

                          textAlign: "center",
                        }}
                      >
                        The Appointement is Rejected
                      </Text>
                      {/* </View> */}
                    </View>
                    <Text
                      style={{
                        color: "#677294",
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      You rejected an appointement with {saveData.userName}, on{" "}
                      {saveData.day}, at {saveData.hour}
                    </Text>

                    <View
                      style={{
                        width: "45%",
                        backgroundColor: COLORS.primary,
                        height: height * 0.08,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setIsRejectedModalSec(false)}
                        style={{
                          width: "45%",
                          backgroundColor: COLORS.primary,
                          height: 30,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                animationType="fade"
                transparent={true}
                visible={sendEmail}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
    
                    <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1,width:"100%",height:300, marginBottom: 10, padding: 10 }}
        placeholder="Type here..."
        onChangeText={handleTextChange}
        value={text}
      />
                    <View style={{flexDirection:"row",gap:20}}>
                      <TouchableOpacity
                        onPress={() => {setSendEmail(false);setText("");sendMail()}}
                        style={styles.modalButton}
                      >
                        <Image
                          style={{ height: 45, width: 45 }}
                          source={require("../assets/envoyer.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {setSendEmail(false);setText("")}}
                        style={styles.modalButton}
                      >
                        <Image
                          style={{ height: 45, width: 45 }}
                          source={require("../assets/bouton-x.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
        visible={btnFilterModal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        transparent={true}
      >
        <View style={stylessss.modalContainer}>
            <View style={stylessss.modalContent}>
          <TouchableOpacity onPress={()=>setBtnFilterModal(false)}>
            <Text>Hide Modal</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={mapModalVisible}
        onRequestClose={hideMapModal}
      >
        <View style={stylesModalMap.modalContainer}>
          <View style={stylesModalMap.modalContent}>
            <View >
      <AnimatedLottieView
        source={require('../assets/Animation - 1700485749110.json')}
        autoPlay
        loop
        style={{ width: 220, height: 220 }}
      />
    </View>
         <View style={{justifyContent:"center",alignItems:"center"}}>
            <Text style={{
                        color: "#677294",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}>Confirm navigation to {oneUser.name}'s location? </Text>
            <Text style={{
                        color: "#677294",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}>The distance is approximately </Text>
                      <Text style={{
                        color: "#09d3a2",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}>
                      {isDistance} 
                      </Text>
                      <Text style={{
                        color: "#677294",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}> an estimated travel time of </Text>
                       <Text style={{
                        color: "#09d3a2",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}> {estimatedDuration}.</Text>
         </View>
            <View style={{flexDirection:"row",gap:20,alignItems:"center"}}>
            {/* <TouchableOpacity onPress={hideMapModal}>
              <Text>Confirme</Text>
            </TouchableOpacity> */}
         
                        <View
                        style={{
                          width: "45%",
                          backgroundColor: COLORS.primary,
                          height: 45,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={()=>{hideMapModal();navigation.navigate('mapDirection')
                        }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Navigate
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: "45%",
                          backgroundColor: "white",
                          height: 45,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 2,
                          borderColor: "#f20404",
                          borderStyle: "solid",
                        }}
                      >
                        <TouchableOpacity
                          style={{}}
                          onPress={hideMapModal}
                        >
                          <Text
                            style={{
                              color: "#f20404",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                        {/* <TouchableOpacity
                          style={{}}
                          onPress={() => onPress={hideMapModal}}
                        >
                          <Text
                            style={{
                              color: "#f20404",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Close
                          </Text>
                        </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={hideMapModal}>
              <Text>Close</Text>
            </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Modal>
            </View>
          </View>
        </View>
        )}
      />
      {/* ///////////////////////////////////MODALS//////////////////////////////////////////// */}
    </View>
  );
};
const stylesModalSec = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 50,
    width: 90,
    position:"absolute",
    top:350,
    left:150
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: 300,
    height: 520,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
});
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
    width: 300,
    height: 400,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
});
const stylesModFilter = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const stylessss = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    backgroundColor: 'black',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height:20
  },
  visible: {
flex:1  },
  hidden: {
    display: 'none',
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
});

const stylesModalMap = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    height:520,
    width:300,
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center"
  },
});


export default AppointementList;
