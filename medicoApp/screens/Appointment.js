import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { auth } from "../firebase-config";
import {LogBox} from 'react-native';


export default function DateSelection() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [docDate, setDocDate] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];
  LogBox.ignoreAllLogs();

  const addAppointment = async () => {
    const newDates = selectedDates.filter(
      (date) => !docDate.map((day) => day.day).includes(date)
    );

    if (newDates.length > 0) {
      const data = newDates.map((date) => ({ day: date }));
      try {
        const email = auth.currentUser.email;
        await axios.post(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/day/${email}`,
          data
        );
        const updatedData = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/${email}`
        );
        setDocDate(updatedData.data.Days);
        setSelectedDates([]);
      } catch (error) {
        console.error("Error adding appointments:", error);
        throw new Error(error);
      }
    }
  };

  const deleteDay = async (DayId) => {
    try {
      const delFromAppoint = await axios.delete(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/appointement/delete/${DayId}`
      );
      const delFromAvailabilyty = await axios.delete(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/delete/${DayId}`
      );
      const del = await axios.delete(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/day/delete/${DayId}`
      );
      setRefresh(!refresh);
      setModalVisible(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDateChange = (date) => {
    const dateString = date.dateString;
    if (dateString >= currentDate) {
      const dayId = docDate.find((day) => day.day === dateString)?.id;
      if (dayId) {
        setSelectedDayId(dayId);
        setModalVisible(true);
      } else {
        if (!selectedDates.includes(dateString)) {
          setSelectedDates((prevSelectedDates) => [
            ...prevSelectedDates,
            dateString,
          ]);
        } else {
          setSelectedDates((prevSelectedDates) =>
            prevSelectedDates.filter((d) => d !== dateString)
          );
        }
      }
    }
  };

  useEffect(() => {
    const getAllDates = async () => {
      try {
        const email = auth.currentUser.email;
        const data = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/aivability/${email}`
        );
        setDocDate(data.data.Days);
        console.log(data.data.Days);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error(error);
      }
    };

    getAllDates();
  }, [selectedDates, refresh]);

  return (
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 10 }}>
      {/* <ScrollView> */}
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 20 }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>
          Appointment Managment
        </Text>
      </View>
      <Calendar
        onDayPress={handleDateChange}
        markedDates={{
          ...docDate.reduce(
            (acc, date) => ({
              ...acc,
              [date.day]: { selected: true, marked: true,selectedColor: "#09d2a2" },
            }),
            {}
          ),
          ...selectedDates.reduce(
            (acc, date) => ({
              ...acc,
              [date]: { selected: true, marked: true },
            }),
            {}
          ),
        }}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 5,
            fontSize: 23,
            fontWeight: "bold",
            padding: 15,
          }}
        >
          Selected Dates
        </Text>
      </View>
      <ScrollView style={{ maxHeight: 230, marginBottom: 10 }}>
        {selectedDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: "#09d2a2",
              padding: 10,
              borderRadius: 5,
              marginBottom: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 ,color:"white"}}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* </ScrollView> */}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              elevation: 5,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Are you sure to delete the availability for this day?
            </Text>
            <TouchableOpacity
              onPress={() => {
                deleteDay(selectedDayId);
              }}
              style={{
                backgroundColor: "red",
                padding: 15,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                backgroundColor: "gray",
                padding: 15,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedDates([])}
          style={{
            backgroundColor: "#ecfaf5",
            padding: 15,
            borderRadius: 10,
            flex: 1,
            marginRight: 5,
          }}
        >
          <Text style={{ color: "#09d2a2", textAlign: "center", fontSize: 16 }}>
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addAppointment}
          style={{
            backgroundColor: "#0ebe7f",
            padding: 15,
            borderRadius: 10,
            flex: 1,
            marginLeft: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
