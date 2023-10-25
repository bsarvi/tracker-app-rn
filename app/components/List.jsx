import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONT } from "../constants";
import DataContext from "../context/DataContext";
import UserItem from "./UserItem";
import { filterUsers } from "../lib";

const List = () => {
  const { users, activeFilter } = useContext(DataContext);
  const [fileteredUsers, setFileteredUsers] = useState([]);

  useEffect(() => {
    const fileteredUsers = filterUsers(users, activeFilter);
    setFileteredUsers(fileteredUsers);
    
  }, [users, activeFilter]);

  return (
    <View style={styles.container}>
      {fileteredUsers.length > 0 ? (
        fileteredUsers.map((user) => <UserItem key={user.id} user={user} />)
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>No users found</Text>
        </View>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.card,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  message: {
    color: COLORS.lightBackground,
    fontSize: 22,
    ...FONT.extraLight,
  },
});
