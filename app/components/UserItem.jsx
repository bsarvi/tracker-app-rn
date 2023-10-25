import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONT } from "../constants";
import { useNavigation } from "@react-navigation/native";

const UserItem = ({ user }) => {
  const navigation = useNavigation();
  const [dueDate, setDueDate] = useState(null);

  const handlePress = () => {
    navigation.navigate("Details", { user });
  };

  const calDueDate = (user) => {
    if (user.latestPayment == null) {
      return null;
    }
    const endDate = user.latestPayment.endDate.toDate();
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    const dueDate = calDueDate(user);
    // console.log(dueDate);
    setDueDate(dueDate);
  }, [user.latestPayment]);

  const color =
    dueDate === null || !user.isActive
      ? COLORS.white
      : dueDate < 0
      ? COLORS.danger
      : dueDate <= 3
      ? COLORS.warning
      : COLORS.success;

  const message =
    dueDate === null || !user.isActive
      ? "NA"
      : dueDate < 0
      ? `OVERDUE BY ${dueDate * -1} DAYS`
      : dueDate <= 3
      ? `DUE IN ${dueDate} DAYS`
      : `DUE IN ${dueDate} DAYS`;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.row}>
        <Text style={styles.name}>{user.name}</Text>
        {!user.isActive && <Text style={styles.inactive}>IN-ACTIVE</Text>}
      </View>
      <Text style={styles.contact}>{user.contact}</Text>
      <Text style={styles.message(color)}>{message}</Text>
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    color: COLORS.white,
    ...FONT.regular,
    fontSize: 17,
    textTransform: "capitalize",
  },
  inactive: {
    color: COLORS.danger,
    ...FONT.bold,
    fontSize: 15,
  },
  contact: {
    color: COLORS.white,
    fontSize: 15,
    ...FONT.extraLight,
    marginBottom: 15,
  },
  message: (color) => ({
    color: color,
    textAlign: "right",
    ...FONT.light,
    fontSize: 17,
  }),
});
