import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONT } from "../constants";

const Button = ({ onPress, title = "SAVE", color = COLORS.success }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button(color)}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: (color) => ({
    backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  }),
  buttonText: { color: COLORS.white, fontSize: 19, ...FONT.extraLight },
});
