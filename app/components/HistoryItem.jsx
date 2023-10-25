import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONT } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

const HistoryItem = ({ item, onDelete }) => {

  
  const handleDelete = () => {
    console.log("hello");
    onDelete(item.id);
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
 

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightBackground,
        marginBottom: 10,
      }}
    >
      <View style={{ flex: 2, alignItems: "center" }}>
        <Text style={{ color: COLORS.white, ...FONT.light, fontSize: 13 }}>
          {formatDate(item.startDate.toDate())}
        </Text>
        <Text style={{ color: COLORS.white, ...FONT.light, fontSize: 13 }}>
          To
        </Text>
        <Text style={{ color: COLORS.white, ...FONT.light, fontSize: 13 }}>
          {formatDate(item.endDate.toDate())}
        </Text>
      </View>
      <Text
        style={{ color: COLORS.white, ...FONT.light, fontSize: 13, flex: 1 }}
      >
        {item.amount}
      </Text>
      <Text
        style={{ color: COLORS.white, ...FONT.light, fontSize: 13, flex: 2 }}
      >
        {formatDate(item.paymentDate.toDate())}
      </Text>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => handleDelete()}>
        <MaterialCommunityIcons name="delete" size={24} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );
};

export default HistoryItem;
