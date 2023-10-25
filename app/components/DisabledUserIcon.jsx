import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const DisabledUserIcon = ({ onPress, isActive }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container(isActive)}>
        <MaterialIcons
          name="person-add-disabled"
          size={24}
          color={COLORS.white}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DisabledUserIcon;

const styles = StyleSheet.create({
  container: (isActive) => ({
    backgroundColor: isActive ? COLORS.card : COLORS.danger,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  }),
});
