import React, { useEffect, useState,useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";
import * as Animatable from 'react-native-animatable';
import {LogBox} from 'react-native';

import { auth } from "../firebase-config";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import COLORS from "../constants/colors";
import NavigationBar from "../components/NavigationBar";

export default function AppointementUserList() {
  const [selectedDate, setSelectedDate] = useState({
    dateString: "",
    dayId: "",
  });
  const [hours, setHours] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const [isRejectedModal, setIsRejectedModal] = useState(false);
  const [isRejectedModalSec, setIsRejectedModalSec] = useState(false);
  const [saveData, setSaveData] = useState({
    userName: "",
    day: "",
    hour: "",
    createdDate: "",
    createdHour: "",
  });
  const [idOfAppoint, setIdOfAppoint] = useState(0);
  const dropdownRef = useRef(null);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [btnFilterModal, setBtnFilterModal] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
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
  LogBox.ignoreAllLogs();


  const fetchData = async (status) => {
    try {
      const email = auth.currentUser.email

      const response = await axios.get(
        `http://${
          process.env.EXPO_PUBLIC_SERVER_IP
        }:1128/api/appointement/getAppointementUserr/${status}/${email}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw new Error(error);
    }
  };
  const fetchDataAll = async () => {
    try {
      const email = auth.currentUser.email

      const response = await axios.get(
        `http://${
          process.env.EXPO_PUBLIC_SERVER_IP
        }:1128/api/appointement/getAppointementAllUserr/${email}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw new Error(error);
    }
  };
  const deleteAppoint = async (id) => {
    try {
      const response = await axios.delete(
        `http://${
          process.env.EXPO_PUBLIC_SERVER_IP
        }:1128/api/appointement/deleteOfAppoi/${id}`
      )
      setRefresh(!refresh)
    } catch (error) {
      throw new Error(error)
    }
  }



  // const getAvailability = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/${idDocRedux}`
  //     );
  //     setAvailability(response.data.Days);
  //     setIncludes(response.data);
  //   } catch (error) {
  //     console.error("Error fetching availability:", error);
  //     throw new Error(error);
  //   }
  // };









  useEffect(() => {
    fetchDataAll()
    }, [refresh]);

  

  return (
    <View style={styles.container}>
            <Text style={{ paddingBottom: 40, fontSize: 35, fontWeight: "bold",alignItems:"center" }}>
        Appointment List
      </Text>
      <View style={{paddingLeft:280,paddingBottom:40}}>
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
        top: 123,
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
      <TouchableOpacity onPress={() => fetchDataAll()}><Text>All</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => fetchData("pending")}><Text>Pending</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => fetchData("Accepted")}><Text>Accepted</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => fetchData("Rejected")}><Text>Rejected</Text></TouchableOpacity>
    </Animatable.View>
  <FlatList
        data={data} 
        keyExtractor={(appointment) => String(appointment.id)}
        renderItem={({ item: appointment }) => (
        <View style={{justifyContent:"center",alignItems:"center"}}>
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
            // elevation: 5, 
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
                    {appointment.Doctor.fullname}
                    </Text>
                    <Text
                      style={{
                        color: "#a5a9be",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {appointment.Doctor.type}
                    </Text>
                  </View>
                  <View
                    style={{
                      widh: "100%",
                      height: "30%",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#afb2c7",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {appointment.Doctor.speciality.name}
                    </Text>
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
                      height: 89,
                      width: 89,
                      borderRadius: 15,
                    }}
                  >
                    <Image style={{height: 89,
                      width: 89,
                      borderRadius: 15,}} source={{uri: appointment.Doctor.imageUrl}}/>
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
                      userName: appointment.Doctor.fullname,
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
                    Delete
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
                  height: 40,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems:"center",
                  gap: 40,
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
              {/* <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  height: "100%",
                  gap: 5,
                }}
              >
                <TouchableOpacity>
                  <Image
                    style={{ width: 48, height: 48 }}
                    source={require("../assets/chat.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSendEmail(true)}>
                  <Image
                    style={{ width: 48, height: 48 }}
                    source={require("../assets/email.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{ width: 48, height: 48 }}
                    source={require("../assets/multiple.png")}
                  />
                </TouchableOpacity>
              </View> */}
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
                height: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems:"center",
                gap: 40,
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
            {/* <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
                gap: 15,
              }}
            >
              <TouchableOpacity>
                <Image
                  style={{ width: 48, height: 48 }}
                  source={require("../assets/chat.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{ width: 48, height: 48 }}
                  source={require("../assets/email.png")}
                />
              </TouchableOpacity>
            </View> */}
          </View>:null
              }
            </View>
          </View>
        </View>
          
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
                        paddingBottom:30
                      }}
                    >
                      Are you sure to delete an appointement with{" "}
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
                            deleteAppoint(idOfAppoint);
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 20,
                            }}
                          >
                            Delete
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
                <View >
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
                      You Rejected an appointement with {saveData.userName}, on{" "}
                      {saveData.day}, at {saveData.hour}
                    </Text>

                    <View
                      style={{
                        width: "45%",
                        backgroundColor: COLORS.primary,
                        height: 40,
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
        
        </View>
        )}
      />
      <NavigationBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
    justifyContent:"center",
    alignItems: "center",
    // paddingHorizontal: 20,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
  },
  detailsContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: 420,
  },
  dateText: {
    fontSize: 20,
    marginBottom: 10,
  },
  carouselContainer: {
    marginTop: 10,
  },
  carouselItem: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    shadowColor: "rgba(3, 3, 3, 8)", // Increase shadow opacity
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    backgroundColor: "#ecfaf5",
    marginHorizontal: 5,
    color: "#09d09e",
  },
  selectedCarouselItem: {
    backgroundColor: "#0ebe7f",
  },
  confirmButton: {
    backgroundColor: "#0ebe7f",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
  },
  confirmButtonEdit: {
    backgroundColor: "#ecfaf5",
    borderRadius: 5,
    marginTop: 10,
    width: "15%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmTextEdit: {
    color: "#fff",
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingTop:20
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    width: "80%"
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  closeModalButton: {
    backgroundColor: "#0ebe7f",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  closeModalText: {
    color: "#fff",
  },
});

const stylesModalSec = StyleSheet.create({
    container: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: 'grey',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height: 50,
      width: 90,
      
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
      position:"absolute",
      top:150,
      left:50
    },
  });
  
 
  
