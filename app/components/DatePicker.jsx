import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONT } from "../constants";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DataContext from "../context/DataContext";

const DatePicker = ({ setState, state }) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setState(currentDate);
  };
  const formatDate = (date) => {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const formattedDate = new Date(date).toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const {users}=useContext(DataContext)
const [date,setDate]=useState(state)
  useEffect(()=>{
    setDate(state)
  },[state,users])

  return (
    <TouchableOpacity onPress={showDatepicker}>
      <View
        style={{
          backgroundColor: COLORS.lightBackground,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: COLORS.card,
            fontSize: 19,
            ...FONT.bold,
          }}
        >
          {formatDate(date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
