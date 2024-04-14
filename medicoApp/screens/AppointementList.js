import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import {LogBox} from 'react-native';

const AppointementList = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  LogBox.ignoreAllLogs();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/appointement/getAppointement/pending/${1}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw new Error(error);
    }
  };
  
  const updateStatus = async (idH,body) => {
    try {
     const response = await axios.put(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/update/${idH}`,{ availability:1 })
     setRefresh(!refresh)
    } catch (error) {
     throw new Error(error)
    }
   }
  const updateStatusAppointement = async (idAppoint,body) => {
    try {
     const response = await axios.put(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/appointement/updateAppoint/${idAppoint}`,body)
     setRefresh(!refresh)
    } catch (error) {
     throw new Error(error)
    }
   }

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',paddingTop:80 }}>
      <Text style={{ paddingBottom: 40,fontSize: 35, fontWeight: "bold"  }}>Appointment List</Text>
      <FlatList
        data={data}
        keyExtractor={appointment => String(appointment.id)}
        renderItem={({ item: appointment }) => (
        //   <View style={{ marginBottom: 1 }}>
        //     <Text>User Name: {appointment.User.username}</Text>
        //     <Image source={{ uri: appointment.User.imgUrl }} style={{ width: 50, height: 50, marginVertical: 5 }} />
        //     <Text>Date of Create: {new Date(appointment.createdAt).toLocaleString()}</Text>
        //     <Text>Availability Hour: {appointment.Availability.hour}</Text>
        //   </View>
        <View style={{flex:1,
        flexDirection:"colmun",
        paddingTop:20
        }}>
        <View style={{flex:1,
            flexDirection:"row",
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom:15,
            paddingTop:15,
            paddingRight:15,
            paddingLeft:15,
            backgroundColor:"#dedede",
            // backgroundColor:"#edeaea",
            borderRadius:20
            }}>
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
                  source={{ uri: appointment.User.imgUrl }}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              </View>
              <Text style={{paddingLeft:10,width:80}}>{appointment.User.username}</Text>
            <Text style={{paddingRight:10}}>{new Date(appointment.Day.day).toLocaleDateString()}</Text>
              <Text style={{paddingRight:10}}>{appointment.Availability.hour}</Text>
              <TouchableOpacity
            //   style={{  width:40,height:40}}
              onPress={() => {updateStatus(appointment.Availability.id);updateStatusAppointement(appointment.id,{status:"Accepted"})}}
            >
              <Ionicons name="checkbox" size={32} color="green" />
            </TouchableOpacity>

            <TouchableOpacity
            //   style={{ width:20,height:20,paddingRight:5 }}
              onPress={() => updateStatusAppointement(appointment.id,{status:"Rejected"})}
            >
              <FontAwesome name="window-close" size={28} color="red" />
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
    </View>
  );
};

export default AppointementList;
