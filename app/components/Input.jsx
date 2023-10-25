import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { COLORS, FONT } from "../constants";

const Input = ({
  value,
  handleChange,
  placeholder,
  handleBlur,
  autoFocus = false,
  error,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  input: {
    backgroundColor: COLORS.lightBackground,
    color: COLORS.black,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    ...FONT.bold,
    marginBottom: 3,
    fontSize: 17,
  },
  error: { color: COLORS.danger, ...FONT.light },
});
