import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import Carousel from "react-native-snap-carousel";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../firebase-config";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {LogBox} from 'react-native';


export default function AppointFromMap({route}) {
    const idForapp = route.params.idApp
//   const idDocRedux = useSelector((state) => state.doctor.idDoc)
//   console.log("this is the doctor id in appointment clinet ", idDocRedux);
  
  const [selectedDate, setSelectedDate] = useState({
    dateString: "",
    dayId: "",
  });
  const [availability, setAvailability] = useState([]);
  const [hours, setHours] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [hourId, setHourId] = useState(0);
  const [dayId, setDayId] = useState(0);
  const [includes, setIncludes] = useState(0);
  const [data, setData] = useState([]);
  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userEditModalVisible, setUserEditModalVisible] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();

  const fetchData = async () => {
    try {
      const email = auth.currentUser.email

      const response = await axios.get(
        `http://${
          process.env.EXPO_PUBLIC_SERVER_IP
        }:1128/api/appointement/getAppointementUserr/pending/${email}`
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

  const getHours = async (idDay) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/hours/0/${idDay}`
      );
      setHours(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw new Error(error);
    }
  };

  const getAvailability = async () => {
    try {
//   console.log("this is the doctor id in appointment clinet ", idDocRedux);

      console.log();
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/get/${idForapp}`
      );
      setAvailability(response.data.Days);
      setIncludes(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw new Error(error);
    }
  };

  const updateStatus = async (idH, body) => {
    try {
      await axios.put(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/update/${idH}`,
        body
      );
      setRefresh(!refresh);
    } catch (error) {
      throw new Error(error);
    }
  };

  const postAppointment = async () => {
    try {
      const email = auth.currentUser.email

      await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/appointement/add/${email}`,
        {
          docId: includes.id,
          availabId: hourId,
          dayID: dayId,
        }
      );
      setSuccessMessage("You have successfully booked an appointment!");
      setAppointmentModalVisible(true);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error posting appointment:", error);
      throw new Error(error);
    }
  };

  const customStyles = {
    selected: {
      selectedColor: "blue",
      borderRadius: 5,
    },
    today: {
      color: "green",
    },
    custom: {
      selected: true,
      selectedColor: "#09d2a2",
      dotColor: "white",
    },
  };

  const handleDateChange = (date) => {
    const selectedDayObj = availability.find(
      (dayObj) => dayObj.day === date.dateString
    );
    if (selectedDayObj) {
      setSelectedDate({
        dateString: date.dateString,
        dayId: selectedDayObj.id,
      });
      getHours(selectedDayObj.id);
      setDayId(selectedDayObj.id);
    }
  };

  const extractMarkedDates = () => {
    const markedDates = {};
    availability.forEach((dayObj) => {
      markedDates[dayObj.day] = { ...customStyles.custom };
    });
    return markedDates;
  };

  useEffect(() => {
    getAvailability();
    fetchData();
  }, [refresh]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => setHourId(item.id)} key={index}>
      <View
        style={[
          styles.carouselItem,
          item.id === hourId ? styles.selectedCarouselItem : null,
        ]}
      >
        <Text
          style={{
            color: item.id === hourId ? "#fff" : "#0ebe7f",
            fontSize: item.id === hourId ? 18 : 16,
            transform: [{ scale: item.id === hourId ? 1.7 : 1.5 }],
          }}
        >
          {item.hour}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Appointment</Text>
      </View>

      <Calendar
        current={currentDate}
        minDate={currentDate}
        onDayPress={handleDateChange}
        markingType={"custom"}
        markedDates={{
          ...extractMarkedDates(),
          [selectedDate.dateString]: { ...customStyles.selected },
        }}
        customStyles={{
          today: customStyles.today,
          selected: customStyles.selected,
          custom: customStyles.custom,
        }}
      />
      <View style={styles.detailsContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 120,
            paddingTop: 20,
            paddingBottom: 30,
          }}
        >
          <View>
            <Text style={styles.dateText}>Available Time</Text>
          </View>
          <View>
            <Text style={styles.dateText}>{selectedDate.dateString}</Text>
          </View>
        </View>
        <Carousel
          data={hours}
          renderItem={renderItem}
          sliderWidth={350}
          itemWidth={130} // Increase item width for a larger item
          layout={"default"}
          loop={true}
          containerCustomStyle={styles.carouselContainer}
        />
        <View
          style={{
            paddingBottom: 60,
            width: "85%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 30,
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.confirmButtonEdit} onPress={() =>navigation.navigate('appointUserList')}>
            <View>
              <FontAwesome5 name="user-edit" size={30} color="#09d3a2" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={postAppointment}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={appointmentModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setAppointmentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {/* <Image
                source={require("../assets/succesAppoint.png")}
              /> */}
            <Text style={styles.modalText}>{successMessage}</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => {setAppointmentModalVisible(false);navigation.navigate("appointUserList")}}
            >
              <Text style={styles.closeModalText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={userEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUserEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(appointment) => String(appointment.id)}
              renderItem={({ item: appointment }) => (
                //   <View style={{ marginBottom: 1 }}>
                //     <Text>User Name: {appointment.User.username}</Text>
                //     <Image source={{ uri: appointment.User.imgUrl }} style={{ width: 50, height: 50, marginVertical: 5 }} />
                //     <Text>Date of Create: {new Date(appointment.createdAt).toLocaleString()}</Text>
                //     <Text>Availability Hour: {appointment.Availability.hour}</Text>
                //   </View>
                <View
                  style={{ flex: 1, flexDirection: "colmun", paddingTop: 20 }}
                >
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
                      backgroundColor: "#0cc68b",
                      // backgroundColor:"#edeaea",
                      borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
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
                        source={{ uri: appointment.User.imgUrl }}
                        style={{
                          width: 40,
                          height: 40,
                        }}
                      />
                    </View>
                    <Text style={{ paddingLeft: 10, width: 60 ,color:"white"}}>
                      {appointment.Doctor.fullname}
                    </Text>
                    <Text style={{ paddingRight: 5 ,color:"white"}}>
                      {new Date(appointment.Day.day).toLocaleDateString()}
                    </Text>
                    <Text style={{ paddingRight: 12 ,color:"white"}}>
                      {appointment.Availability.hour}
                    </Text>
                   

                    <TouchableOpacity
                      //   style={{ width:20,height:20,paddingRight:5 }}
                      onPress={() =>
                        deleteAppoint(appointment.id)
                      }
                    >
                      <FontAwesome name="window-close" size={28} color="#f0f0f0" />
                    </TouchableOpacity>
                  </View>
                  {/* <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
          }}
        ></View> */}
                </View>
              )}
            />
           <View style={{paddingTop:20,paddingBottom:40}}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setUserEditModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Done</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop:40
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
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
