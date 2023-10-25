import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AddUser, Analytics, Container, FIlterList, List } from "../components";
import { COLORS, FONT } from "../constants";
import DataContext from "../context/DataContext";

const HomeScreen = ({ navigation }) => {
  const {
    setInactiveUsers,
    setActiveUsers,
    setDueIn3Days,
    setOverdueUsers,
    users,
  } = useContext(DataContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddUser onPress={handleAddPress} icon="md-person-add" />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function analytics() {
      setInactiveUsers(0);
      setActiveUsers(0);
      setDueIn3Days(0);
      setOverdueUsers(0);
      users.map((user) => {
        if (user.isActive) {
          setActiveUsers((prev) => prev + 1);
        } else {
          setInactiveUsers((prev) => prev + 1);
        }

        const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

        if (user.isActive && user.latestPayment != null) {
          if (
            user.latestPayment.endDate.toDate() <= threeDaysFromNow &&
            user.latestPayment.endDate.toDate() > new Date()
          ) {
            setDueIn3Days((prev) => prev + 1);
          }

          if (user.latestPayment.endDate.toDate() < new Date()) {
            setOverdueUsers((prev) => prev + 1);
            console.log("overdue");
          }
        }
      });
    }
    analytics();
  }, [users]);

  const handleAddPress = () => {
    navigation.navigate("Add");
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text
          style={{
            color: COLORS.lightBackground,
            ...FONT.bold,
            fontSize: 17,
            marginBottom: 10,
          }}
        >
          DETAILS
        </Text>
        <Analytics />
        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              color: COLORS.lightBackground,
              ...FONT.bold,
              fontSize: 17,
              marginBottom: 5,
            }}
          >
            USERS
          </Text>
          <FIlterList />
          <List />
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  col: {
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  desc: {
    color: COLORS.lightBackground,
    ...FONT.bold,
    fontSize: 12,
    marginBottom: 8,
  },
  title: (color) => ({
    textAlign: "center",
    color: color,
    ...FONT.light,
    fontSize: 24,
  }),
});
