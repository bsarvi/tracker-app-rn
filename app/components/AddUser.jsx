import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const AddUser = ({onPress,icon}) => {
  

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: COLORS.card,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 5,
        }}
      >
        <Ionicons name={icon} size={24} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
};

export default AddUser;
6;

const styles = StyleSheet.create({});
